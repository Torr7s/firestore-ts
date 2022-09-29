import { CollectionReference } from 'firebase-admin/firestore';

import { createCollection } from './helpers/create-collection';
import { User } from 'src/types/user.type';

export const usersCollection: CollectionReference<User> = createCollection<User>('users');