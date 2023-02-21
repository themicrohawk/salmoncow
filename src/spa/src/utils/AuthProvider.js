import React from 'react';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { UserPool } from '../utils/UserPool';

export const AuthContext = React.createContext(null);

export function AuthProvider({ children }) {

  // const [idToken, setIdToken] = React.useState(localStorage.getItem(process.env.REACT_APP_COGNITO_ID_TOKEN));
  // const [accessToken, setAccessToken] = React.useState(localStorage.getItem(process.env.REACT_APP_COGNITO_ACCESS_TOKEN));

  const onLogin = (loginDetails, callback) => {
    loginCognitoUser({
      'Username' : loginDetails.email,
      'Password' : loginDetails.password,
    })
      // .then(tokenSet => {
      //   // accessToken, idToken, refreshToken
      //   localStorage.setItem(process.env.REACT_APP_COGNITO_ID_TOKEN, tokenSet.getIdToken().getJwtToken());
      //   setIdToken(tokenSet.getIdToken().getJwtToken())

      //   localStorage.setItem(process.env.REACT_APP_COGNITO_ACCESS_TOKEN, tokenSet.getAccessToken().getJwtToken());
      //   setAccessToken(tokenSet.getAccessToken().getJwtToken())

      //   callback();
      // })
      // .catch(err => {
      //   callback(err)
      // });
      .then(() => {
        callback();
      })
      .catch(err => {
        callback(err)
      });
  };

  const onLogout = (callback) => {
    const user = UserPool.getCurrentUser();
    user.signOut();

    // localStorage.removeItem(process.env.REACT_APP_COGNITO_ID_TOKEN)
    // localStorage.removeItem(process.env.REACT_APP_COGNITO_ACCESS_TOKEN)
    // localStorage.removeItem(process.env.REACT_APP_COGNITO_REFRESH_TOKEN)
    
    // setIdToken(null);

    callback();
  };

  const onSignup = (signupDetails, callback) => {
    signupCognitoUser(signupDetails)
      .then(() => {
        callback();
      })
      .catch(err => {
        callback(err)
      });
  };

  const getSession = (callback) => {
    getCognitoSession()
      .then(session => {
        callback(session)
        // if (session === undefined) {
        //   callback(false)
        // } else {
        //   callback(session)
        // }
      })
      .catch(err => {
        callback(err)
      });
  };

  // const fakeSigninA = (loginDetails, callback) => {
  //   console.log(loginDetails)
  //   return fakeAuthProvider.signin(() => {
  //     setIdToken("abc123");
  //     callback();
  //   });
  // };

  // const fakeSigninB = async () => {
  //   const token = await fakeAuthToken();

  //   setIdToken(idToken);
  //   navigate('/dashboard');
  // };

  const value = {
    // idToken,
    // accessToken,
    onLogin,
    onLogout,
    onSignup,
    getSession,

    // fakeSigninA, // a very simple version to test with
    // fakeSigninB,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

function loginCognitoUser(loginDetails) {  
  const cognitoUser = new CognitoUser({
    Username: loginDetails.Username,
    Pool: UserPool,
  });
  
  const authenticationDetails = new AuthenticationDetails(loginDetails);
  
  return new Promise((resolve, reject) =>
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        resolve(result);
      },
      onFailure: (err) => {
        reject(err);
      }
    })
  );
}

function signupCognitoUser(signupDetails) {
  const attributes = [
      // { Name: 'name', Value: p.name }
  ]

  return new Promise((resolve, reject) => (
      UserPool.signUp(signupDetails.email, signupDetails.password, attributes, signupDetails.validationData, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      })
  ));
}

function getCognitoSession() {
  return new Promise((resolve, reject) => {
    const user = UserPool.getCurrentUser();
    if (user) {
      // NOTE: getSession must be called to authenticate user before calling getUserAttributes
      user.getSession((err, session) => {
        if (err) {
          reject(err);
        }
        resolve(session);
      });
    } else {
      reject(false);
    }
  })
}


// This represents some generic auth provider API, like Firebase.
// const fakeAuthProvider = {
//   isAuthenticated: false,
//   signin(callback) {
//     fakeAuthProvider.isAuthenticated = true;
//     setTimeout(callback, 250); // fake async
//   },
//   signout(callback) {
//     fakeAuthProvider.isAuthenticated = false;
//     setTimeout(callback, 250);
//   },
// };

// const fakeAuthToken = () =>
//   new Promise((resolve) => {
//     setTimeout(() => resolve('abc123'), 250);
// });
