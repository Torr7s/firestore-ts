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
