/* eslint-disable no-undef */

let firebase = window.firebase;

if (typeof firebase === 'undefined') {
  firebase = {
    auth: () => ({
      onAuthStateChanged: cb => setTimeout(() => cb(false), 100),
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
