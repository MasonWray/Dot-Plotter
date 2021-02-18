import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'

import './App.css';

import Navbar from './components/Navbar';
import Body from './components/Body';

function App() {
  return (
    <div>
      <Navbar />
      <Body />
    </div>
  );
}

export default App;