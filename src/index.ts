import crypto from 'node:crypto';
import firestore from 'firebase-admin/firestore';

import { User } from './types/user.type';

import { usersCollection } from './utils/firestore/collections';

const getUser = async (docId: string): Promise<User> => {
  const userSnapshot: firestore.DocumentSnapshot<User> = await usersCollection.doc(docId).get();
  const user: User = userSnapshot.exists && userSnapshot.data();

  return user;
}

const createUser = async (props: User): Promise<User> => {
  const uuid: string = crypto.randomUUID();

  await usersCollection.doc(uuid).set(props);

  const user: User = await getUser(uuid);

  return user;
}

(async (): Promise<void> => {
  const johnDoeUser: User = {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    password: 'youshallnotpass'
  }

  const user: User = await createUser(johnDoeUser);

  console.log(user);
})();