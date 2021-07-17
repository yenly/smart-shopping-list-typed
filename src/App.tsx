import React from 'react';
import './App.less';
import { BoopFirebase } from './components/BoopFirebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from './lib/firebase';

const App: React.FC = () => {
  const [value, loading, error] = useCollection(db.collection('boops'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  let list;
  if (value) {
    list = value.docs.map(doc => {
      return doc.data();
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Click button to send boops to Firestore</p>
        <BoopFirebase />
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Messages: Loading...</span>}
        {list && (
          <ul>
            {list.map((boop, index) => (
              <li key={index}>{boop.boop}</li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
};

export default App;
