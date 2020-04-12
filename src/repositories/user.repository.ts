import { UserModel } from '../models';
import { IUserModel, IRegisterData } from '../interfaces';

export const findUserByResource = async (resource: object): Promise<IUserModel | null> => {
  try {
    return await UserModel.findOne(resource);
  } catch (error) {
    throw error;
  }
};

export const saveUser = async (user: IRegisterData): Promise<IUserModel> => {
  try {
    return await new UserModel(user).save();
  } catch (error) {
    throw error;
  }
};
