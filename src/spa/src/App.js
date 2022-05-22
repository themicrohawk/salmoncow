// Used some of this guide: https://medium.com/technoetics/create-basic-login-forms-using-react-js-hooks-and-bootstrap-2ae36c15e551
// AWS Cognito guide: https://github.com/aws-amplify/amplify-js/tree/master/packages/amazon-cognito-identity-js#setup

import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

import './App.css';
import logo from './images/salmoncow.png';

import Home from './components/Home/Home';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import PrivateRoute from './utils/PrivateRoute';

import Grid from '@mui/material/Grid';

export default function App() {
  return (
    <Router>
      <Header />
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        style={{ minHeight: '100vh' }}
      >
        <img src={logo} className='logo' alt='logo' />
          <Routes>
            {/* <Route element={<Header />}> */}
              <Route path='/register' element={<RegistrationForm />} />
              <Route path='/login' element={<LoginForm />} />
              {/* <PrivateRoute path='/' element={<Home />} /> */}
            {/* </Route> */}
          </Routes>
        <p className='footer'>
          This is a dev site. It's simply a fun <a href='https://github.com/tdeknecht/salmoncow' target='_blank' rel='noopener noreferrer'>side project</a>.
        </p>
      </Grid>
    </Router>
  );
}

// function App() {
//   return (
//     <div>
//       <img src={logo} className='App-logo' alt='logo' />
//       <Welcome name='Tyler D' />
//     </div>
//   );
// }
// export default App;

// (A) function approach to Welcome
// function Welcome(props) {
//   return <h1>Hello, {props.name}</h1>;
// }

// (B) alternative syntax to above. Useful for defining functions within a function...?
// const Welcome = (props) => {
//   return <h1>Hello, {props.name}</h1>;
// }

// (C) class approach to Welcome
// class Welcome extends React.Component {
//   render() {
//     return <h1>Hello, {this.props.name}</h1>;
//   }
// }
