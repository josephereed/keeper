import { useEffect } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { LabelOutlined } from '@material-ui/icons';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import { NoteType } from '../types/notes';

interface PropTypes {
  selectedTag: string;
  setSelectedTag: Function;
  notes: NoteType[];
  setFilter: Function;
  setFilteredNotes: Function;
  tags: string[];
}

const TagsList = ({
  selectedTag,
  setSelectedTag,
  setFilteredNotes,
  setFilter,
  notes,
  tags,
}: PropTypes) => {
  const filter = (tag: string) => {
    if (tag !== '') {
      setFilter(true);
      return notes.filter((note) => {
        return note.tag === tag;
      });
    } else {
      return setFilter(false);
    }
  };

  useEffect(() => {
    setFilteredNotes(filter(selectedTag));
  }, [selectedTag]);

  return (
    <List>
      <ListItem
        button
        key="notes"
        onClick={() => {
          setSelectedTag('');
        }}
        style={{
          backgroundColor: selectedTag === '' ? '#feefc3' : 'white',
        }}
      >
        <ListItemIcon>
          <EmojiObjectsOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={'Notes'} />
      </ListItem>
      {tags.map((tag) => (
        <ListItem
          button
          key={tag}
          onClick={() => {
            setSelectedTag(tag);
          }}
          style={{
            backgroundColor: selectedTag === tag ? '#feefc3' : 'white',
          }}
        >
          <ListItemIcon>
            <LabelOutlined />
          </ListItemIcon>
          <ListItemText primary={tag} />
        </ListItem>
      ))}
    </List>
  );
};

export default TagsList;
