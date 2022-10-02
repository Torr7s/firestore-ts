import { CollectionReference, DocumentData } from 'firebase-admin/firestore';

import { firestoreDb } from '../../firestore';

/**
 * Generic converter function that will take a type argument and create 
 * a typed FirestoreDataConverter object
 * 
 */
const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot) =>
    snapshot.data() as T
});

/**
 * Function that abstracts out the lengthy path to a collection reference 
 * with a data converter.
 * 
 * The withConvert method applies a custom data converter to a firestore Query and 
 * takes a single argument which is a FirestoreDataConverter object, which should have 
 * two keys: toFirestore and fromFirestore
 * 
 * @param {String} collectionPath - The collection name string 
 * @returns {CollectionReference<T>}
 */
export const createCollection = <T = DocumentData>(collectionPath: string): CollectionReference<T> =>
  firestoreDb.collection(collectionPath)
    .withConverter(
      converter<T>()
    );
