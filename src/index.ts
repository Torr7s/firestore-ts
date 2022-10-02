import { UserModel } from './firestore/models/user.model';
import { WithDocId } from './repositories/base.repository';

import createUser from './functions/create-user';
import getUser from './functions/get-user';
import updateUser from './functions/update-user';

async function main(): Promise<void> {
  /**
   * First, create a random user
   */
  await createUser({
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    password: 'youshallnotpass',
    address: {
      city: 'London',
      street: 'Oxford Street'
    }
  });

  /**
   * Second, fetch a user by his email and update some data
   */
  let user: WithDocId<UserModel>;

  user = await getUser('johndoe@gmail.com');

  console.log('Old User: ', user);

  await updateUser(user.id, {
    email: 'newjohndoe@gmail.com',
    address: {
      city: 'Hong Kong',
      street: 'Nathan Road'
    }
  });

  user = await getUser('newjohndoe@gmail.com');

  console.log('New User: ', user);
}

main();