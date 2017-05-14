import firebase from 'firebase';

const storageKey = 'KEY_FOR_LOCAL_STORAGE';

const config = {
  apiKey: "AIzaSyADGr3LzOb-3RW-B-ou8OZEoLwd3SxnGpg",
  authDomain: "my-portfolio-e2e2a.firebaseapp.com",
  databaseURL: "https://my-portfolio-e2e2a.firebaseio.com",
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
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
