import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyADGr3LzOb-3RW-B-ou8OZEoLwd3SxnGpg",
  authDomain: "my-portfolio-e2e2a.firebaseapp.com",
  databaseURL: "https://my-portfolio-e2e2a.firebaseio.com",
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
