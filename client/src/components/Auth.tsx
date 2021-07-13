import googleImage from '../assets/google-logo.png';
import { Button, Paper } from '@material-ui/core';

const Auth = () => {
  const login = () => {
    window.open('http://localhost:5000/auth/google', '_self');
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Button variant="contained" color="primary" onClick={login}>
          <img
            src={googleImage}
            alt="google"
            height="40px"
            style={{ backgroundColor: 'white' }}
          />
          <a
            href={`${process.env.REACT_APP_PROXY_HOST}/auth/google`}
            style={{ textDecoration: 'none', color: 'white' }}
          >
            Sign In With Google
          </a>
        </Button>
      </div>
    </div>
  );
};

export default Auth;
