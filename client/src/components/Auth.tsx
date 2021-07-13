import googleImage from '../assets/google-logo.png';
import { Button, Paper, Typography } from '@material-ui/core';
import light from '../assets/darklight.png';

const Auth = () => {
  const login = () => {
    window.open('http://localhost:5000/auth/google', '_self');
  };

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        backgroundColor: '#fafafa',
      }}
    >
      <Paper
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: '220px',
          padding: '20px',
        }}
      >
        <div
          style={{
            justifyContent: 'space-between',
            display: 'flex',
            flexDirection: 'column',
            color: '#5f6368',
            height: '100%',
            margin: '0px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              transform: 'translate(-10px)',
            }}
          >
            <img src={light} alt="light" height="55px" />
            <Typography variant="h3">Keeper</Typography>
          </div>
          <div>
            <Typography variant="body1">Keep your notes organized</Typography>
          </div>
          <div style={{ margin: '0px auto 0px' }}>
            <Button
              variant="contained"
              onClick={login}
              style={{
                backgroundColor: '#4C8BF5',
                padding: '2px',
                textTransform: 'none',
              }}
            >
              <img
                src={googleImage}
                alt="google"
                height="40px"
                style={{
                  backgroundColor: 'white',
                  borderRadius: '2px',
                  marginRight: '0px',
                }}
              />
              <div
                style={{
                  padding: '8px',
                  margin: '0px 10px 0px',
                }}
              >
                <a
                  href={`${process.env.REACT_APP_PROXY_HOST}/auth/google`}
                  style={{
                    textDecoration: 'none',
                    color: 'white',
                    margin: 'auto',
                  }}
                >
                  Sign in with Google
                </a>
              </div>
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Auth;
