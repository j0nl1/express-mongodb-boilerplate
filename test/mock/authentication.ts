import { IUserModel } from '../../src/interfaces/models';
import { UserModel } from '../../src/models';

export const fakeEmail = 'fake@email.com';
export const fakeUsername = 'j0nl1';
export const fakeUserId = '3dsf7sd7f734fg34';
export const fakePassword = 'fake-password';
export const fakeToken = 'F4K3-T0K3N';
export const fakeRole = 'user';

export const fakeUser = {
  username: fakeUsername,
  role: fakeRole,
  email: fakeEmail,
  password: fakePassword
};

export const fakeUserModel: IUserModel = new UserModel(fakeUser);
