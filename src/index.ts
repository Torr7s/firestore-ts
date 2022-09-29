import { DocumentSnapshot } from 'firebase-admin/firestore';

import { User } from './types/user.type';

import { database } from './utils/database';

(async (): Promise<void> => {
  await database
    .users
    .doc('JD')
    .set({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'youshallnotpass'
    });

  /**
   * The update method is working fine as well, it will not overwrite the entire document
   */
  await database
    .users
    .doc('JD')
    .update({
      'address.timeAtAddress.days': '1'
    });

  const userDoc: DocumentSnapshot<User> = await database.users.doc('JD').get();
  const user: User = userDoc.data();

  console.log(user);
})();

