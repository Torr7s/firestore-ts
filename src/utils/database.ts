import { dataPoint } from './firestore/helpers/data-point';

import { User } from 'src/types/user.type';

/**
 * Now a typed database object can be created
 *  
 */
export const database = {
  users: dataPoint<User>('users')
}