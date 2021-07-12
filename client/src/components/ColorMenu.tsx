import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import Menu from '@material-ui/core/Menu';
// import div from '@material-ui/core/MenuItem';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    color: {
      height: '20px',
      width: '20px',
      margin: '2px',
      borderRadius: '25px',
      '&:hover': {
        outline: 0,
        boxShadow: '0 0 0 3px rgba(0, 123, 255, .5)',
      },
    },
  })
);

interface PropTypes {
  setColor: Function;
}

export default function SimpleMenu({ setColor }: PropTypes) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ padding: '5px' }}>
      <ButtonBase
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <ColorLensOutlinedIcon />
      </ButtonBase>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginLeft: '5px',
            marginRight: '5px',
          }}
        >
          <div
            onClick={() => setColor('white')}
            className={classes.color}
            style={{ margin: '2px' }}
          >
            <div>&nbsp;</div>
          </div>
          <div
            // Red
            onClick={() => setColor('red')}
            className={classes.color}
            style={{
              backgroundColor: '#f28b82',
              borderRadius: '25px',
              margin: '2px',
            }}
          >
            <div>&nbsp;</div>
          </div>
          <div
            // Orange
            onClick={() => setColor('orange')}
            className={classes.color}
            style={{
              backgroundColor: '#fbbc04',
              borderRadius: '25px',
              margin: '2px',
            }}
          >
            <div>&nbsp;</div>
          </div>
          <div
            // Yellow
            onClick={() => setColor('yellow')}
            className={classes.color}
            style={{
              backgroundColor: '#fff475',
              borderRadius: '25px',
              margin: '2px',
            }}
          >
            <div>&nbsp;</div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginLeft: '5px',
            marginRight: '5px',
          }}
        >
          <div
            // Green
            onClick={() => setColor('green')}
            className={classes.color}
            style={{
              backgroundColor: '#ccff90',
              borderRadius: '25px',
              margin: '2px',
            }}
          >
            <div>&nbsp;</div>
          </div>
          <div
            // Teal
            onClick={() => setColor('teal')}
            className={classes.color}
            style={{
              backgroundColor: '#a7ffeb',
              borderRadius: '25px',
              margin: '2px',
            }}
          >
            <div>&nbsp;</div>
          </div>
          <div
            // Blue
            onClick={() => setColor('blue')}
            className={classes.color}
            style={{
              backgroundColor: '#cbf0f8',
              borderRadius: '25px',
              margin: '2px',
            }}
          >
            <div>&nbsp;</div>
          </div>
          <div
            // Darkblue
            onClick={() => setColor('darkblue')}
            className={classes.color}
            style={{
              backgroundColor: '#aecbfa',
              borderRadius: '25px',
              margin: '2px',
            }}
          >
            <div>&nbsp;</div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginLeft: '5px',
            marginRight: '5px',
          }}
        >
          <div
            // Purple
            onClick={() => setColor('purple')}
            className={classes.color}
            style={{
              backgroundColor: '#d7aefb',
              borderRadius: '25px',
              margin: '2px',
            }}
          >
            <div>&nbsp;</div>
          </div>
          <div
            // Pink
            onClick={() => setColor('pink')}
            className={classes.color}
            style={{
              backgroundColor: '#fdcfe8',
              borderRadius: '25px',
              margin: '2px',
            }}
          >
            <div>&nbsp;</div>
          </div>
          <div
            // Brown
            onClick={() => setColor('brown')}
            className={classes.color}
            style={{
              backgroundColor: '#e6c9a8',
              borderRadius: '25px',
              margin: '2px',
            }}
          >
            <div>&nbsp;</div>
          </div>
          <div
            // Gray
            onClick={() => setColor('gray')}
            className={classes.color}
            style={{
              backgroundColor: '#e8eaed',
              borderRadius: '25px',
              margin: '2px',
            }}
          >
            <div>&nbsp;</div>
          </div>
        </div>
      </Menu>
    </div>
  );
}
