import React from 'react';
import { Route, Link } from 'react-router-dom'

import ToDo from './components/todo/todo.js';
import Header from './components/header.js';
import Login from './components/auth/login.js';
import Auth from './components/auth/auth.js';
import LoginContext from './components/auth/context.js';
import SettingsContext from './context/settings.js';


function App() {

    return (
      <>
      <SettingsContext>
        <LoginContext>
          <nav>
            <Header />
            <Login />
          </nav>
          <Auth>
            <ToDo />
          </Auth>
        </LoginContext>
      </SettingsContext>
      </>
    );
  
}

export default App;