import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/user.model';
import { ApiError } from '../utils/apiError';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, phoneno } = req.body;
      const user = await UserModel.create({ email, phoneno });
      res.status(201).json({ user });
    } catch (error) { 
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new ApiError(401, 'Invalid credentials');
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '1d' }
      );

      res.json({ token });
    } catch (error) {
      next(error);
    }
  }
}