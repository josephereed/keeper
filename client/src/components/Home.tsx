import { useState } from 'react';
import Drawer from './Drawer';
import NestedGrid from './NestedGrid';
import { NoteType } from '../types/notes';

const Home = () => {
  const [notes, setNotes] = useState<NoteType[]>([
    {
      title: 'Notes 1',
      text: 'a;knwrekjlnferklnjfwklnjknjwerkjwferjnfwekrfnwekrfnwkernfwkerflnwkerfnwkernfwkernfkwenrf',
      color: 'red',
    },
    {
      title: 'Notes 2',
      text: 'iefnienfiwerkljwnasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfqerfwergwregwergwergwergwergwergwergwergwergwrtghyjyrthersearthrgerthreyhrwtegafwrewrtjwrtherfkjwenrfewjhbflberhfjlwehrbfwebrfwejrfkwjernfwlekrjfnwelrfwlerfnlwkerfwnlerkfjnwerfwerf',
      color: 'orange',
    },
    { title: 'Notes 3', text: 'lklkrmflemrflmelrmfl', color: 'yellow' },
    {
      title: 'Notes 4',
      text: 'asdfadsfakdfnakjndfkankjnasdfkndfkjndfkjnasdfknlsdflkjndslfkjnad',
      color: 'green',
    },
    { title: 'Notes 5', text: 'fnklwr', color: 'teal' },
    {
      title: 'Notes 6',
      text: 'frjknnfkjwerfkjwnrfnfjwkelrkjnfwerfw',
      color: 'blue',
    },
    { title: 'Notes 7', text: 'fdmkmkfmkdlfk', color: 'darkblue' },
    {
      title: 'Notes 8',
      text: 'mkmkfmrkmmkmkmkfrmfkrmkmkfmrkfmkrmfkrmfkrmfkrmfkrmf',
      color: 'purple',
    },
    { title: 'Notes 9', text: 'asdfknalsdnfaklsdfkasdflkjn', color: 'pink' },
    {
      title: 'Notes 10',
      text: 'asdfakjslndfakjnskdlfnkjasndfkjalnsdfjklansdf',
      color: 'brown',
    },
    { title: 'Notes 11', text: 'asdfasdfasdfasdfasdf', color: 'gray' },
    { title: 'Notes 12', text: 'asdkfmaksdflamfklmeajksnfklnsadfalksdf' },
    {
      title: 'How to answer "what do you do"',
      text: 'I make sure the phone works when soldiers call in airstrikes.',
      tags: ['Charisma', 'Comedy'],
    },
    {
      title: 'How to answer "where are you from"',
      text: "California. I've lived in Fresno, before going to college at UC Davis, I loved it there because the people there were so intelligent. Everyone was doing something entrepreneurial and it inspires me! It makes me really confident that one day I can start my own company.",
      tags: ['Charisma'],
    },
    {
      title: 'Stand Up',
      text: 'A man once said “be the change you want to see the world” So I started beating up homeless people. My point is WE could be the fulcrum point. They’re still people Will. They have feelings, just not in any of their mucosal membranes.',
      tags: ['Comedy'],
    },
    {
      title: 'Debugger',
      text: '1) add debugger statement to function\n2) Call function manually\n3) node inspect file{name\n4) to continue execution past debugger "c"\n5) to launch repl session "repl"\n6) to exit repl "ctrl + c" ',
      tags: ['Dev'],
    },
    {
      title: 'Parcel',
      text: '// set port for hot module reload\n--hmr-port <port>',
      tags: ['Dev'],
    },
    {
      title: 'Docker',
      text: 'how to access docker container from outside\nhttps://www.youtube.com/watch?v=mPEM557bMR4',
      tags: ['Dev'],
    },
    {
      title: 'code-server',
      text: 'how to access docker container from outside\nhttps://www.youtube.com/watch?v=mPEM557bMR4',
      tags: ['Dev'],
    },
  ]);
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const [filter, setFilter] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');
  const [tags, setTags] = useState([
    'BuildPCSite',
    'Charisma',
    'Comedy',
    'Dev',
    'game',
    'Inspiration',
    'Mixtape',
    'MyBank',
    'Personal',
    'Song Lyrics',
    'Songs To DL',
    'Video Ideas',
    'Work',
  ]);

  return (
    <div>
      <Drawer
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        notes={notes}
        setFilteredNotes={setFilteredNotes}
        setFilter={setFilter}
        tags={tags}
      >
        <NestedGrid
          notes={(filteredNotes && filteredNotes.reverse()) || notes.reverse()}
          setNotes={setNotes}
          tags={tags}
          setTags={setTags}
        />
      </Drawer>
    </div>
  );
};

export default Home;
