import React from 'react';

import Content from './components/children/Content';

// import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App({children}) {
  return (
    <Content body={children} />
  );
}

export default App;
