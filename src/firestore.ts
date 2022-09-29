import config from 'config';
import admin from 'firebase-admin'

const firestoreConfig: config.IConfig = config.get('app.firestore');

const firebaseApp: admin.app.App = admin.initializeApp({
  credential: admin.credential.cert(
    config.util.toObject(firestoreConfig) as admin.ServiceAccount
  )
});
const firestoreDb: admin.firestore.Firestore = admin.firestore(firebaseApp);

export {
  firebaseApp,
  firestoreDb
}