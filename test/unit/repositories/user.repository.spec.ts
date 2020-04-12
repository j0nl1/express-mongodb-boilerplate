import { UserModel } from '../../../src/models';
import * as userRepository from '../../../src/repositories/user.repository';
import { fakeUserModel, fakeEmail } from '../../mock/authentication';

jest.mock('../../../src/models');

describe('User Repository', () => {
  describe('saveUser', () => {
    it('should return the user after to be saved', async () => {
      const spySave = jest.spyOn(fakeUserModel, 'save').mockResolvedValueOnce(fakeUserModel);

      const result = await userRepository.saveUser(fakeUserModel);

      expect(result).toBe(fakeUserModel);
      expect(spySave).toHaveBeenCalled();
    });

    it('should throw an error if something wrong happened', async () => {
      const spySave = jest.spyOn(fakeUserModel, 'save').mockRejectedValueOnce(new Error());

      try {
        await userRepository.saveUser(fakeUserModel);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(spySave).toHaveBeenCalled();
      }
    });
  });
  describe('findUserByResource', () => {
    it('should return an user when is founded', async () => {
      UserModel.findOne = jest.fn().mockResolvedValue(fakeUserModel);
      const result = await userRepository.findUserByResource({ email: fakeEmail });

      expect(result).toStrictEqual(fakeUserModel);
    });
    it('should return an error if operation is rejected', async () => {
      UserModel.findOne = jest.fn().mockRejectedValueOnce(new Error());

      try {
        await userRepository.findUserByResource({ email: fakeEmail });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
