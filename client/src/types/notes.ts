export type NoteType = {
  title: string;
  text: string;
  tag?: string;
  color?: Color;
};

export type Color =
  | 'white'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'blue'
  | 'darkblue'
  | 'purple'
  | 'pink'
  | 'brown'
  | 'gray';
