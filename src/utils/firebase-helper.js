/* eslint-disable no-undef */

export const onAuthStateChanged = (cb) => {
  firebase.auth().onAuthStateChanged(cb);
};


export const auth = (email, password) => (
  firebase.auth().signInWithEmailAndPassword(email, password)
);
