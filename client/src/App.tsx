import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Redirect,
  Switch,
} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Auth from './components/Auth';

function App() {
  const [user, setUser] = useState(true);
  return (
    <Router>
      <Route path="/" component={Auth} />
      <Route exact path="/">
        {user ? <Home /> : <Redirect to="/auth" />}
      </Route>
      {/* <ProtectedRoute Component={Home} user={user} /> */}
    </Router>
  );
}

export default App;
