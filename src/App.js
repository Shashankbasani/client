import logo from './logo.svg';
import './App.css';
import Login from './pages/login/login';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Register from './pages/regiester/register';
import HomePage from './Homepage/home';
import ProtectedRoute from './components/protectedRoute';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={ 
      <ProtectedRoute>
      <HomePage />
      </ProtectedRoute>
      }/>
      <Route path="/login" element={ <Login />}/>
      <Route path="/register" element={ <Register />}/>
    </Routes>
   
    </BrowserRouter>
    
  );
}

export default App;
