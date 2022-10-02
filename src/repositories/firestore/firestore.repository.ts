import crypto from 'node:crypto';
import firestore, { 
  CollectionReference, 
  DocumentData, 
  QueryDocumentSnapshot, 
  QuerySnapshot, 
  WhereFilterOp 
} from 'firebase-admin/firestore';

import { MainRepository } from '../main.repository';
import { WithDocId } from '../base.repository';

import { createCollection } from '../../firestore/helpers/create-collection';

export abstract class FirestoreRepository<T extends DocumentData> extends MainRepository<T> {
  private collection: CollectionReference<T>;

  constructor(collectionPath: string) {
    super();

    this.collection = createCollection<T>(collectionPath);
  }

  public async create(data: T): Promise<void> {
    try {
      const id: string = crypto.randomUUID();

      await this.collection.doc().create({
        id,
        ...data
      });
    } catch (error) {
      console.error('Error while trying to create data: ', error);
    }
  }

  public async find(path: string, filter: WhereFilterOp, value: any): Promise<WithDocId<T>> {
    const snapshot: QuerySnapshot<T> = await this.collection
      .where(
        path,
        filter,
        value
      )
      .get();
    const data: WithDocId<T>[] = this.extractData(snapshot.docs);

    return data[0];
  }

  public async list(): Promise<WithDocId<T>[]> {
    const snapshot: QuerySnapshot<T> = await this.collection.get();
    const data: WithDocId<T>[] = this.extractData(snapshot.docs);

    return data;
  }

  public async update(userId: string, data: Partial<T>): Promise<void> {
    try {  
      await this.collection.doc(userId).set(data, {
        merge: true
      });
    } catch (error) {
      console.error('Error while trying to update data: ', error);
    }
  }

  /**
   * @param {Array<QueryDocumentSnapshot>} docs - The docs from a QuerySnapshot
   * @returns {Array<WithDocId<T>>} - Collections array with its document ID 
   */
  private extractData<T>(docs: QueryDocumentSnapshot<T>[]): WithDocId<T>[] {
    return docs.map(
      (doc: QueryDocumentSnapshot<T>): WithDocId<T> => ({
        ...doc.exists && doc.data(),
        docId: doc.id
      })
    );
  }
}