import React from 'react';
import Auxiliary from './Auxiliary'
import Layout from './Layout';

console.log(process.env.REACT_APP_API_KEY)

function App() {
  return (
    <Auxiliary>
      <Layout />
    </Auxiliary>
  );
}

export default App;
