import React from 'react';
import Home from './components/Home';
import Register from './auth/Register';
import Login from './auth/Login';
import  {BrowserRouter, Switch, Route} from 'react-router-dom';
import TopNav from './components/TopNav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <BrowserRouter>
    <TopNav />
    <ToastContainer />
      <Switch>
          <Route path="/" exact>
              <Home />
          </Route>
          <Route path="/register" exact>
              <Register />
          </Route>
          <Route path="/login" exact>
              <Login />
          </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
