import { Navigate, Route,Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Auth from './components/Auth';
import { useContext } from 'react';
import { tokenAuthorisationContext } from './Context/TokenAuth';

function App() {

  const {isAuthorized, setIsAuthorized} = useContext(tokenAuthorisationContext)
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register />} />
        <Route path='/dashboard' element={isAuthorized ? <Dashboard /> : <Home />} />
        <Route path='/projects' element={isAuthorized ? <Projects /> : <Home />} />
        <Route path='/*' element={<Navigate to={'/'} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
