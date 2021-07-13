import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Auth from './components/Auth';

function App() {
  const [user, setUser] = useState<any>();
  const getUser = async () => {
    return axios
      .get('http://localhost:5000/getuser', { withCredentials: true })
      .then((res: AxiosResponse) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    try {
      const foundUser = getUser();
      console.log(foundUser);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <Router>
      <Route exact path="/">
        {user ? (
          <Home setUser={setUser} image={user.photo} />
        ) : (
          <Auth />
        )}
      </Route>
    </Router>
  );
}

export default App;
