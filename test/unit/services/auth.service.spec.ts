import * as repositories from '../../../src/repositories';
import * as authService from '../../../src/services/auth.service';
import { fakeUserModel, fakeEmail, fakePassword } from '../../mock/authentication';
import { IRegisterData } from '../../../src/interfaces';
import { MissingDataError } from '../../../src/errors';
import { USER_EXIST_ERROR } from '../../../src/utils/constants';
import { UserModel } from '../../../src/models';

describe('Auth Service', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('Signup', () => {
    it('should save the user and return it after to be saved', async () => {
      const spyfindUserByResource = jest.spyOn(repositories, 'findUserByResource').mockResolvedValueOnce(null);
      const spySaveUser = jest.spyOn(repositories, 'saveUser').mockResolvedValueOnce(fakeUserModel);

      const result = await authService.signup(fakeUserModel);

      expect(spyfindUserByResource).toHaveBeenCalledWith({ email: fakeUserModel.email });
      expect(spySaveUser).toHaveBeenCalled();
      expect(result).toStrictEqual(fakeUserModel);
    });

    it('should throw an error when password, email or username are falsy', async () => {
      try {
        await authService.signup({} as IRegisterData);
      } catch (error) {
        expect(error).toBeInstanceOf(MissingDataError);
      }
    });

    it('should throw an error when email already exist', async () => {
      jest.spyOn(repositories, 'findUserByResource').mockResolvedValueOnce(fakeUserModel);

      try {
        await authService.signup(fakeUserModel);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe(USER_EXIST_ERROR);
      }
    });
  });
  describe('Login', () => {
    it('should return the user is pass the validations', async () => {
      const spyfindUserByEmail = jest.spyOn(repositories, 'findUserByResource').mockResolvedValueOnce(fakeUserModel);
      const spyValidatePassword = jest.spyOn(UserModel.prototype, 'validatePassword').mockReturnValueOnce(true);

      const result = await authService.login(fakeEmail, fakePassword);

      expect(spyfindUserByEmail).toHaveBeenCalledWith({ email: fakeEmail });
      expect(spyValidatePassword).toHaveBeenCalledWith(fakePassword);

      expect(result).toStrictEqual(fakeUserModel);
    });

    it("should throw an error when user doesn't exist", async () => {
      jest.spyOn(repositories, 'findUserByResource').mockResolvedValueOnce(null);

      try {
        await authService.login(fakeEmail, fakePassword);
      } catch (error) {
        expect(error).toBeInstanceOf(MissingDataError);
      }
    });
    it('should throw an error when email or password are empty', async () => {
      try {
        await authService.login('', '');
      } catch (error) {
        expect(error).toBeInstanceOf(MissingDataError);
      }
    });
  });
});
