import React from 'react';
import './styles/index.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/landing/Landing';
import Dashboard from './components/dashboard/Dashboard';
import User from './components/user/User';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Path from './components/path/Path';
import CreatePath from './components/path/Create';
import EditPath from './components/path/Edit';
import Concept from './components/concept/Concept';
import CreateConcept from './components/concept/Create';
import EditConcept from './components/concept/Edit';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/path/:id" element={<Path />} />
        <Route path="/path/create" element={<CreatePath />} />
        <Route path="/path/edit/:id" element={<EditPath />} />
        <Route path="/concept/:id" element={<Concept />} />
        <Route path="/concept/create" element={<CreateConcept />} />
        <Route path="/concept/edit/:id" element={<EditConcept />} />
      </Routes>
    </Router>
  );
}

export default App;
