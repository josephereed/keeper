import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { NoteType } from '../types/notes';
import NoteMenu from './NoteMenu';
import { Color } from '../types/notes';

interface PropTypes {
  open: boolean;
  setOpen: (value: boolean) => void;
  setNotes: Function;
  notes: NoteType[];
  tags: string[];
  setTags: Function;
}

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

const CreateNote = ({
  open,
  setOpen,
  notes,
  setNotes,
  tags,
  setTags,
}: PropTypes) => {
  const [color, setColor] = useState<Color>('white');
  const [labels, setLabels] = useState(null);
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        margin: 'auto',
        color: theme.palette.text.secondary,
        width: '100%',
      },
      paperOpen: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        //backgroundColor: colorValues[color],
        // height: '100px',
      },
    })
  );
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    if ((open && text !== '') || title !== '') {
      const newNotes = [...notes];
      if (labels) {
        setNotes([{ title, text, color, labels }, ...notes]);
      } else {
        setNotes([{ title, text, color }, ...notes]);
      }
      setTitle('');
      setText('');
    }
  }, [open, notes]);

  return open ? (
    // BIG
    <React.Fragment>
      <Grid item xs={12} md={3}>
        <Box marginRight={1}>
          <Paper
            className={open ? classes.paper : classes.paperOpen}
            elevation={4}
            onClickCapture={(e) => {
              setOpen(false);
              e.stopPropagation();
            }}
            style={{ textAlign: 'left' }}
          >
            <Box>
              <Typography variant="h6">Take a note...</Typography>
            </Box>
          </Paper>
        </Box>
      </Grid>
    </React.Fragment>
  ) : (
    // SMALL
    <React.Fragment>
      <Grid item xs={12} md={3}>
        <Box marginRight={1}>
          <Paper
            className={classes.paperOpen}
            elevation={4}
            style={{ textAlign: 'left', backgroundColor: colorValues[color] }}
          >
            <Box
              onClick={(e) => {
                setOpen(false);
                e.stopPropagation();
              }}
            >
              <InputBase
                onChange={(e) => setTitle(e.target.value)}
                value={title}
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
              <Box>
                <InputBase
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Take a note..."
                  autoFocus
                  fullWidth
                  multiline
                  style={{ outline: 'none' }}
                  value={text}
                />
              </Box>
              <NoteMenu
                setOpen={setOpen}
                setColor={setColor}
                tags={tags}
                setTags={setTags}
              />
            </Box>
          </Paper>
        </Box>
      </Grid>
    </React.Fragment>
  );
};

export default CreateNote;
