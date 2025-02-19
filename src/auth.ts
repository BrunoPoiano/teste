import { expressjwt } from 'express-jwt';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User, UserModel } from './models';
import databaseInit from './database';

const jwtConfig = {
  secret: String(
    process.env.JWT_SECRET ||
      'WA3B9jrGrcJV0CWWjNPXSSYnKyNszdrYNKcRJC1QpjW7w8G8pwv7q97WBc9'
  ),
  expiresIn: 86400,
};

export const authMiddleware = expressjwt({
  secret: jwtConfig.secret,
  algorithms: ['HS256'],
  requestProperty: 'user',
}).unless({
  path: [
    '/api/auth/login',
    '/api/auth/register',
    { url: /\/public\/.*/, methods: ['GET'] },
  ],
});

export const userMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }
    const decoded: any = jwt.verify(token, jwtConfig.secret);
    const userId = decoded.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error('Error in userMiddleware', error);
    return res
      .status(500)
      .json({ message: 'Failed to authenticate user', error });
  }
};

export const passwordCompare = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const generateToken = (user: User) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    jwtConfig.secret as string,
    { expiresIn: jwtConfig.expiresIn }
  );
};
