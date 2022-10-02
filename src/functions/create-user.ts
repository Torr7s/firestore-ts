import { UserModel } from '../firestore/models/user.model';
import { WithDocId } from '../repositories/base.repository';

import { FirestoreUsersRepository } from '../repositories/firestore/users/users.repository';

const repository = new FirestoreUsersRepository();

const createUser = async(data: UserModel): Promise<void> => {
  const userExists: WithDocId<UserModel> = await repository.findByEmail(data.email);

  if (userExists) {
    throw new Error(
      'Email already taken'
    );
  }

  return repository.create(data);
}

export default createUser;