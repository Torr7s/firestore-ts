import { DocumentSnapshot } from 'firebase-admin/firestore'

import { User } from './types/user.type';

import { database } from './utils/firestore.utils';

(async (): Promise<void> => {
  await database
    .users
    .doc('JD')
    .set({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'youshallnotpass'
    }) /* It receives the types ! */

  const userDoc: DocumentSnapshot<User> = await database.users.doc('JD').get();
  const user: User = userDoc.data(); /* It's typed ! */

  console.log(user)
})();

