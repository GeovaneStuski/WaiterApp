import { RepositoriesInterface } from '../../interfaces/RepositorysInterface';
import { UpdateType } from '../../types/UpdateType';
import { UserType } from '../../types/UserType';
import { User } from '../models/User';

class UsersRepository implements RepositoriesInterface {
  async listAll(): Promise<UserType[]> {
    const users = await User.find();

    return users;
  }

  async findUserByEmail(email: string): Promise<UserType | null> {
    const user = await User.findOne({ email });

    return user;
  }

  async create(body: object): Promise<UserType> {
    const user = await User.create(body);

    return user;
  }

  async update({id, body}: UpdateType): Promise<UserType | null> {
    const user = await User.findByIdAndUpdate(id, body);

    return user;
  }

  async delete(itemId: string): Promise<UserType | null> {
    const user = await User.findByIdAndDelete(itemId);

    return user;
  }
}

export default new UsersRepository();
