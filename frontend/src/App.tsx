import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MyContext from './Context';

function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorRegister, setErrorRegister] = React.useState([false, true, '', '']);
  const [balance, setBalance] = React.useState();
  const [table, setTable] = React.useState('all');

  return (
    <MyContext.Provider value={{
      isLoading, setIsLoading,
      username, setUsername,
      password, setPassword,
      errorRegister, setErrorRegister,
      balance, setBalance,
      table, setTable
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={ <Dashboard /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/" element={ <Navigate to="/login" /> } />
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
};

export default App;
