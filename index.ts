
import databaseInit from "./src/database";
const express = require("express");
import routes from "./src/routes/index"

const app = express();
const PORT = process.env.PORT || 3000;

databaseInit()
  .then(() => {
    app.use(express.json());
    app.use("/api", routes);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to the database:', err);
    process.exit(1);
  });
