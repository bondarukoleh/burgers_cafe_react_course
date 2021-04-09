// Please rename this file without dist and add an Firebase API Token.
const {FIREBASE_API_TOKEN} = process.env;
if(!FIREBASE_API_TOKEN) {
  throw new Error('FIREBASE_API_TOKEN should be provided!')
}
const firebaseAPIToken = FIREBASE_API_TOKEN;

export {firebaseAPIToken}
