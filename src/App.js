import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Layout from './Layouts/Layout';
import Help from './pages/Help';
import Home from './pages/Home';
import User from './pages/User';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route path="/" element={<Home/>} />
          <Route path="/user" element={<User/>} />
          <Route path="/help" element={<Help/>} />
        </Route>
      
      </Routes>
        
    </BrowserRouter>
  );
}

export default App;
