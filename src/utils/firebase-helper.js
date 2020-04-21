/* eslint-disable no-undef */

let firebase = window.firebase;

if (window.location.hostname === 'localhost') {
  firebase = {
    auth: () => ({
      onAuthStateChanged: () => {},
      signInWithEmailAndPassword: () => {},
    }),
  };
}

export const onAuthStateChanged = (cb) => {
  firebase.auth().onAuthStateChanged(cb);
};


export const auth = (email, password) => (
  firebase.auth().signInWithEmailAndPassword(email, password)
);
