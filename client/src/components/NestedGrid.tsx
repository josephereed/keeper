import { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import CreateNote from './CreateNote';
import Note from './Note';
import { NoteType } from '../types/notes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 2,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

interface PropTypes {
  notes: NoteType[];
  setNotes: Function;
  tags: string[];
  setTags: Function;
}
export default function NestedGrid({
  notes,
  setNotes,
  tags,
  setTags,
}: PropTypes) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  interface StackState {
    firstStack: NoteType[];
    secondStack: NoteType[];
    thirdStack: NoteType[];
    fourthStack: NoteType[];
  }
  const [stacks, setStacks] = useState<StackState>({
    firstStack: [],
    secondStack: [],
    thirdStack: [],
    fourthStack: [],
  });
  const stack1: NoteType[] = [];
  const stack2: NoteType[] = [];
  const stack3: NoteType[] = [];
  const stack4: NoteType[] = [];
  useEffect(() => {
    notes.map((note, i) => {
      if ((i + 1) % 4 === 1) {
        stack1.push(note);
      } else if ((i + 1) % 4 === 2) {
        stack2.push(note);
      } else if ((i + 1) % 4 === 3) {
        stack3.push(note);
      } else {
        stack4.push(note);
      }
    });
    setStacks({
      firstStack: stack1,
      secondStack: stack2,
      thirdStack: stack3,
      fourthStack: stack4,
    });
  }, [notes]);
  interface FormRowProps {
    stack: NoteType[];
  }

  const FormRow = ({ stack }: FormRowProps) => {
    const renderNotes = () => {
      return stack.map((note, i) => {
        const isLast = () => {
          return i === stack.length;
        };
        return (
          <Note
            title={note.title}
            text={note.text}
            tag={note.tag}
            color={note.color}
            key={i}
            Last={isLast()}
          />
        );
      });
    };
    return (
      <Grid xs={12} item>
        {renderNotes()}
      </Grid>
    );
  };

  return (
    <Box
      className={classes.root}
      justifyContent="flex-end"
      onClick={() => {
        open ? setOpen(true) : setOpen(true);
      }}
    >
      <Grid
        item
        container
        xs={12}
        justify="center"
        style={{ marginBottom: 10 }}
        direction="row"
        // spacing 1 keeps search bar same size as notes in phone view
        spacing={1}
      >
        <CreateNote
          open={open}
          setOpen={setOpen}
          notes={notes}
          setNotes={setNotes}
          tags={tags}
          setTags={setTags}
        />
      </Grid>
      <br />
      <Grid item container justify="center" direction="row" xs={12} spacing={0}>
        <Grid item md={3} xs={12} sm={6}>
          <FormRow stack={stacks.firstStack} />
        </Grid>
        <Grid item md={3} xs={12} sm={6}>
          <FormRow stack={stacks.secondStack} />
        </Grid>
        <Grid item md={3} xs={12} sm={6}>
          <FormRow stack={stacks.thirdStack} />
        </Grid>
        <Grid item md={3} xs={12} sm={6}>
          <FormRow stack={stacks.fourthStack} />
        </Grid>
      </Grid>
    </Box>
  );
}
