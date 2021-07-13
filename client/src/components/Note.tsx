import {
  Box,
  ButtonBase,
  Grid,
  InputBase,
  Paper,
  Typography,
} from '@material-ui/core';
import { Clear as ClearIcon } from '@material-ui/icons';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import NoteMenu from './NoteMenu';
import { Color, NoteType } from '../types/notes';
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
  globalTags: string[];
  setGlobalTags: Function;
  notes: NoteType[];
  setNotes: Function;
}

function Note({
  notes,
  title,
  text,
  tags,
  color,
  globalTags,
  setGlobalTags,
  Last,
  setNotes,
}: PropTypes) {
  const [modified, setModified] = useState(false);
  const [thisTitle, setThisTitle] = useState(title);
  const [thisText, setThisText] = useState(text);
  const [theseLabels, setTheseLabels] = useState(tags || []);
  const [thisColor, setThisColor] = useState(color);
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
        backgroundColor: color ? colorValues[color || 'white'] : '',
      },
      paperOpen: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        //backgroundColor: colorValues[color],
        // height: '100px',
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

  const handleClose = (e: any) => {
    setOpen(false);
    if (modified) {
      // save to state/db
      console.log('save note', {
        title: thisTitle,
        text: thisText,
        tags: theseLabels,
        color: thisColor || 'white',
      });
      //setModified(false);
    }
    console.log('closed');
  };

  // useEffect(() => {
  //   // if ((open && text !== '') || title !== '') {
  //   //   const newNotes = [...notes];
  //   //   if (theseLabels) {
  //   //     setNotes([
  //   //       {
  //   //         title: thisTitle,
  //   //         text: thisText,
  //   //         color: thisColor,
  //   //         tags: theseLabels,
  //   //       },
  //   //       ...notes,
  //   //     ]);
  //   //   } else {
  //   //     setNotes([{ title, text, color }, ...notes]);
  //   //   }
  //   // Clear Create Note
  //   // setThisTitle('');
  //   // setThisText('');
  //   // setTheseLabels([]);
  //   // setThisColor('white');
  //   if (modified) {
  //     // if closed save
  //   }
  //   // clear note
  //   // setModified false

  // }, [open]);

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
                      backgroundColor: 'rgba(0,0,0,0.08)',
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
            <Paper
              className={classes.paperOpen}
              elevation={4}
              style={{
                textAlign: 'left',
                backgroundColor: colorValues[thisColor || 'white'],
              }}
            >
              <Box
                onClick={(e) => {
                  // setOpen(false);
                  e.stopPropagation();
                }}
              >
                <InputBase
                  onChange={(e) => {
                    setModified(true);
                    setThisTitle(e.target.value);
                  }}
                  value={thisTitle}
                  placeholder="Title"
                  style={{
                    letterSpacing: '.00625em',
                    fontSize: '1.35rem',
                    fontWeight: 500,
                    lineHeight: '1.5rem',
                    color: 'black',
                  }}
                />

                <br />
                <Box marginBottom={1}>
                  <InputBase
                    onChange={(e) => {
                      setModified(true);
                      setThisText(e.target.value);
                    }}
                    placeholder="Take a note..."
                    autoFocus
                    fullWidth
                    multiline
                    style={{ outline: 'none' }}
                    value={thisText}
                  />
                  <Box marginTop={1}>
                    {theseLabels
                      ? theseLabels.map((tag: string) => {
                          return (
                            <span
                              style={{
                                backgroundColor: 'rgba(0,0,0,0.08)',
                                borderRadius: '5px',
                                padding: '5px',
                                marginTop: '20px',
                                marginRight: '5px',
                              }}
                            >
                              {tag}{' '}
                              <ClearIcon
                                onClick={() => {
                                  setModified(true);
                                  setTheseLabels(
                                    theseLabels.filter((label) => label !== tag)
                                  );
                                }}
                                style={{
                                  fontSize: '.65rem',
                                  cursor: 'pointer',
                                }}
                              />
                            </span>
                          );
                        })
                      : ''}
                  </Box>
                </Box>
              </Box>
            </Paper>
            {/* <Paper className={classes.paper}>
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
            </Paper> */}
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
