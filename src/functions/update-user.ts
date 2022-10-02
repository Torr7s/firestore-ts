import { UserModel } from '../firestore/models/user.model';
import { WithDocId } from '../repositories/base.repository';

import { FirestoreUsersRepository } from '../repositories/firestore/users/users.repository';

const repository = new FirestoreUsersRepository();
 
const updateUser = async (userId: string, data: Partial<UserModel>): Promise<void> => {
  const user: WithDocId<UserModel> = await repository.findById(userId);

  if (!user) {
    throw new Error(
      'User does not exists'
    );
  }

  return repository.update(user.docId, data);
}

export default updateUser;