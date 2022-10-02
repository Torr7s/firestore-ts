import { WhereFilterOp } from 'firebase-admin/firestore';

import { BaseRepository, WithDocId } from './base.repository';

export abstract class MainRepository<T> implements BaseRepository<T> {
  public abstract create(data: T): Promise<void>;
  public abstract find(path: string, filter: WhereFilterOp, value: any): Promise<WithDocId<T>>;
  public abstract list(): Promise<WithDocId<T>[]>;
  public abstract update(userId: string, data: Partial<T>): Promise<void>;
}