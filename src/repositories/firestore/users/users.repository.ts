import { FirestoreRepository } from '../firestore.repository';
import { UsersRepository, WithDocId } from '../../base.repository';

import { UserModel } from '../../../firestore/models/user.model';

export class FirestoreUsersRepository extends FirestoreRepository<UserModel> implements UsersRepository {
  constructor() {
    super('users');
  }

  public async findByEmail(email: string): Promise<WithDocId<UserModel>> {
    return this.find('email', '==', email);
  }

  public async findById(userId: string): Promise<WithDocId<UserModel>> {
    return this.find('id', '==', userId);
  }
}