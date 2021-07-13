import { Box, ButtonBase, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Color } from '../types/notes';
// const Note = ({ title, text }: PropTypes) => {
//   const classes = useStyles();
//   const [open, setOpen] = useState(false);
//   return (

//   );
// };

const colorValues = {
  white: '#fff',
  red: '#f28b82',
  orange: '#fbbc04',
  yellow: '#fff475',
  green: '#ccff90',
  teal: '#a7ffeb',
  blue: '#cbf0f8',
  darkblue: '#aecbfa',
  purple: '#d7aefb',
  pink: '#fdcfe8',
  brown: '#e6c9a8',
  gray: '#e8eaed',
};

interface PropTypes {
  title: string;
  text: string;
  tags?: string[];
  color?: Color;
  Last?: boolean;
}

function Note({ title, text, tags, color, Last }: PropTypes) {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        //flexGrow: 1,
      },
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        // backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
        textAlign: 'left',
        // padding: theme.spacing(1),
        overflowWrap: 'anywhere',
        backgroundColor: color ? colorValues[color] : '',
      },
      close: {
        float: 'right',
      },
    })
  );
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* <button type="button">react-transition-group</button> */}
      <Box
        marginTop={Last ? 0 : 0}
        marginBottom={Last ? 0 : 2}
        marginRight={1}
        marginLeft={1}
      >
        <Paper
          className={classes.paper}
          onClick={handleOpen}
          style={{ visibility: open ? 'hidden' : 'visible' }}
        >
          <Typography variant="h6">{title}</Typography>
          <span>{text}</span>
          <br />
          <br />
          {tags
            ? tags.map((tag: string) => {
                return (
                  <span
                    style={{
                      backgroundColor: 'lightgray',
                      borderRadius: '5px',
                      padding: '5px',
                      marginTop: '20px',
                      marginRight: '5px',
                    }}
                  >
                    {tag}
                  </span>
                );
              })
            : ''}
        </Paper>
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open} style={{ outline: 'none' }}>
          <Grid item xs={12} md={3}>
            <Paper className={classes.paper}>
              <Typography variant="h6">{title}</Typography>
              {text}
              <br />
              <br />
              {tags
                ? tags.map((tag: string) => {
                    return (
                      <span
                        style={{
                          backgroundColor: 'lightgray',
                          borderRadius: '5px',
                          padding: '5px',
                          marginTop: '20px',
                          marginRight: '5px',
                        }}
                      >
                        {tag}
                      </span>
                    );
                  })
                : ''}
              <Box paddingBottom={1}>
                <ButtonBase
                  className={classes.close}
                  onClick={() => setOpen(false)}
                >
                  <Typography variant="subtitle2">Close</Typography>
                </ButtonBase>
              </Box>
            </Paper>
          </Grid>
          {/* <div className={classes.paper}>
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">
              react-transition-group animates me.
            </p>
          </div> */}
        </Fade>
      </Modal>
    </>
  );
}

export default Note;
