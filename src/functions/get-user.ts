import { UserModel } from '../firestore/models/user.model';
import { WithDocId } from '../repositories/base.repository';

import { FirestoreUsersRepository } from '../repositories/firestore/users/users.repository';

const repository = new FirestoreUsersRepository();
 
const getUserByEmail = async (email: string): Promise<WithDocId<UserModel>> => {
  const user: WithDocId<UserModel> = await repository.findByEmail(email);

  if (!user) {
    throw new Error(
      'User does not exists'
    );
  }

  return user
}

export default getUserByEmail;