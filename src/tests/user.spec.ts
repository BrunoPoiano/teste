import { after, before, describe, it } from "node:test";
import supertest from "supertest";
import server from "../server";
import mongoose, { mongo } from "mongoose";
import { UserModel } from "../models";
import { expect } from "chai";


describe("User Api", () => {
  let request = supertest(server)
  let userId: string

  before(async () => {
    await mongoose.connect(process.env.MONGO_URI || "", {dbName: "tests"})
    const user = await UserModel.create({
      name: "Bruno",
      email: "bruno@email.com",
      address:"Ribeirao Preto SP Brasil",
      coordinates: [-122.084, 37.422],
    })
    userId = user._id
  })

  after(async () => {
    await UserModel.deleteMany()
    await mongoose.disconnect()
  })

  it("Should hetch user details", async() => {
    const response = await request.get("/api/user")
    expect(response.status).to.equal(200)
    expect(response.body.email).to.equal("bruno@email.com")
  })

})
