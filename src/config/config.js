import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDsNRj5VL7V4V0jvmTFnw4XuqPHgBsw6nQ",
  authDomain: "hanernlee-f2fb5.firebaseapp.com",
  databaseURL: "https://hanernlee-f2fb5.firebaseio.com",
  storageBucket: "hanernlee-f2fb5.appspot.com"
};

firebase.initializeApp(config);

export const database = firebase.database();
export const storage = firebase.storage();
export const firebaseAuth = firebase.auth;

export const isAuthenticated = () => {
  if (!firebaseAuth().currentUser) {
    let hasLocalStorageUser = false;
    for (let key in localStorage) {
      if (key.startsWith("firebase:authUser:")) {
        hasLocalStorageUser = true;
      }
    }
    return hasLocalStorageUser;
  }
  return true;
};
