import { CollectionReference } from 'firebase-admin/firestore';

import { firestoreDb } from '../../../firestore';
import { converter } from './converter';

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
