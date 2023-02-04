import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import Dashboard from './components/dashboard/Dashboard';
import BillsTable from './components/BillsTable';
import ReservesTable from './components/ReservesTable';


function App() {
  return (
      <Routes>
        <Route path='/dashboard' element={ <Dashboard /> } />
        <Route path='/contas' element={ <BillsTable /> } />
        <Route path='/reservas' element={ <ReservesTable /> } />
        <Route path='/relatorios' element={ <Navigate to='/contas' /> } />
        <Route exact path='/' element={ <Navigate to='/dashboard' /> } />
        
      </Routes>
  );
}

export default App;
