import express from 'express';
import { UserModel } from './models';

const server = express();
const router = express.Router();

const STATUS = {
  OK: 200,
  CREATED: 201,
  UPDATED: 201,
  NOT_FOUND: 400,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
  DEFAULT_ERROR: 418,
};

router.get('/user', async (req, res) => {
  const { page, limit } = req.query;

  const [users, total] = await Promise.all([
    UserModel.find().lean(),
    UserModel.count(),
  ]);

  return res.json({
    rows: users,
    page,
    limit,
    total,
  });
});

router.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  const user = await UserModel.findOne({ _id: id }).lean();

  if (!user) {
    res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: 'Region not found' });
  }

  return user;
});

server.use(router);

export default server.listen(3003);
