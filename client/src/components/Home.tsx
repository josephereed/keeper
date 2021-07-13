import { useState } from 'react';
import Drawer from './Drawer';
import NestedGrid from './NestedGrid';
import { NoteType } from '../types/notes';
// Below is mockdata, need to remove
import { notesArray } from './mockData';
import { tagsArray } from './mockData';

interface PropTypes {
  setUser: Function;
  image: string;
}

const Home = ({ setUser, image }: PropTypes) => {
  const [notes, setNotes] = useState<NoteType[]>([...notesArray].reverse());
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const [filter, setFilter] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');
  const [tags, setTags] = useState(tagsArray);

  return (
    <div>
      <Drawer
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        notes={notes}
        setFilteredNotes={setFilteredNotes}
        setFilter={setFilter}
        tags={tags}
        setUser={setUser}
        image={image}
      >
        <NestedGrid
          notes={(filteredNotes && filteredNotes) || notes}
          setNotes={setNotes}
          tags={tags}
          setTags={setTags}
        />
      </Drawer>
    </div>
  );
};

export default Home;
