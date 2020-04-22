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


export const signIn = (email, password) => (
  firebase.auth().signInWithEmailAndPassword(email, password)
);

export const signOut = () => (
  firebase.auth().signOut()
);

export const getUser = () => (
  firebase.auth().currentUser
);

export const getDBOnce = (path) => (
  firebase.database().ref(path).once('value')
);

export const getDBRef = (path) => (
  firebase.database().ref(path)
);
