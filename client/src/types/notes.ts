export type NoteType = {
  title: string;
  text: string;
  tags?: string[];
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
