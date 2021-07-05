import React from 'react';
import './App.less';
import { BoopFirebase } from './components/BoopFirebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { fb } from './lib/firebase';

const App: React.FC = () => {
  const db = fb.firestore();
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
        <p>This button is not wired up yet.</p>
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
