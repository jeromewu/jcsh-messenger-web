import React, { useEffect } from 'react';
import {
  signOut,
} from '../utils/firebase-helper';

export default () => {
  useEffect(() => {
    signOut();
    setTimeout(() => {
      window.location.href = '/';
    }, 3000);
  }, []);
  return (
    <h1>Signed Out</h1>
  );
};
