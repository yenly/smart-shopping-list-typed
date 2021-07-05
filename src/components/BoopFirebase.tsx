import React from 'react';
import { Button } from 'antd';
import { fb } from '../lib/firebase';

export default function BoopFirebase() {
  const db = fb.firestore();
  const sendBoop = () => {
    db.collection('boops')
      .add({
        boop: 'Boop!',
      })
      .then(docRef => {
        console.log(`Boop sent with ID: ${docRef.id}`);
      })
      .catch(error => console.error(`Error adding boop: ${error}`));
  };

  return (
    <>
      <Button type="primary" onClick={sendBoop}>
        Boop! booP! BOOP!
      </Button>
    </>
  );
}
