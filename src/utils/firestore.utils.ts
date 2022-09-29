/**
 * How to use Typescript with Firestore
 * 
 * 1. https://medium.com/swlh/using-firestore-with-typescript-65bd2a602945
 * 2. https://javascript.plainenglish.io/using-firestore-with-more-typescript-8058b6a88674
 * 3. https://javascript.plainenglish.io/using-firestore-with-typescript-in-the-v9-sdk-cf36851bb099
 */

import { CollectionReference } from 'firebase-admin/firestore';

import { firestoreDb } from '../firestore';
import { User } from 'src/types/user.type';

/**
 * Generic converter function that will take a type argument and create 
 * a typed FirestoreDataConverter object
 * 
 */
export const converter = <T>() => ({
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
export const dataPoint = <T>(collectionPath: string): CollectionReference<T> =>
  firestoreDb.collection(collectionPath)
    .withConverter(
      converter<T>()
    );

/**
 * Now I can use the dataPoint function to create a typed database object
 *  
 */
export const database = {
  users: dataPoint<User>('users')
}