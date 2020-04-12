import { Request, Response, NextFunction } from 'express';
import { login, signup } from '../services';

export const SignupAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await signup(req.body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const LoginAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await login(email, password);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
