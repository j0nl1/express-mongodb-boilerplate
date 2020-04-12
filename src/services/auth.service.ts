import { findUserByResource, saveUser } from '../repositories';
import { IRegisterData, IUserModel } from '../interfaces';
import { USER_EXIST_ERROR } from '../utils/constants';
import { MissingDataError } from '../errors';

export const signup = async ({ email, password, username }: IRegisterData): Promise<IUserModel> => {
  try {
    if (!email || !password || !username) throw new MissingDataError();

    const user = await findUserByResource({ email });

    if (user) throw new Error(USER_EXIST_ERROR);
    return await saveUser({ username, password, email });
  } catch (error) {
    throw error;
  }
};

export const login = async (email: string, password: string): Promise<IUserModel> => {
  try {
    if (!email || !password) throw new MissingDataError();

    const user = await findUserByResource({ email });
    if (!user || !user.validatePassword(password)) throw new MissingDataError();

    return user;
  } catch (error) {
    throw error;
  }
};
