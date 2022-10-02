import { WhereFilterOp } from 'firebase-admin/firestore';

import { UserModel } from '../firestore/models/user.model';

export type WithDocId<T> = { docId: string } & T;

export interface BaseRepository<T> {
  create(data: T): Promise<void>;
  find(path: keyof T, filter: WhereFilterOp, value: any): Promise<WithDocId<T>>;
  list(): Promise<WithDocId<T>[]>;
  update(userId: string, data: Partial<T>): Promise<void>;
}

export interface UsersRepository extends BaseRepository<UserModel> {
  findByEmail(email: string): Promise<WithDocId<UserModel>>;
  findById(userId: string): Promise<WithDocId<UserModel>>;
}