/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions();

interface PropTypes {
  tags: string[];
  setTags: Function;
  setLabels: Function;
  labels: string[];
}
export default function FreeSoloCreateOption({
  tags,
  setTags,
  setLabels,
  labels,
}: PropTypes) {
  const [value, setValue] = React.useState<TagType | null>(null);

  const format = (tags: string[]) => {
    const object: {}[] = [];
    tags.map((tag) => {
      object.push({ title: tag });
    });
    return object;
  };
  const formattedLabels = format(tags);

  return (
    <Autocomplete
      value={value}
      // Save tag on enter keypress
      onKeyDown={(event) => {
        if (event.key === 'Enter' && value) {
          setTags([...tags, value.title]);
          setLabels([...labels, value.title]);
          setValue({ title: '' });
        }
      }}
      onChange={(event: React.ChangeEvent<{}>, newValue: any) => {
        if (newValue && newValue.inputValue) {
          setValue({
            title: newValue.inputValue,
          });
          // Create new label
          setTags([...tags, newValue.inputValue]);
          setLabels([...labels, newValue.inputValue]);
          setValue({ title: '' });
          return;
        }
        // pick existing label
        if (newValue && newValue.title) {
          setLabels([...labels, newValue.title]);
        }
        setValue({ title: '' });
      }}
      filterOptions={(options, params: any) => {
        const filtered = filter(options, params) as TagType[];

        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            title: `Add "${params.inputValue}"`,
          });
        }

        return filtered;
      }}
      id="free-solo-with-text-demo"
      options={formattedLabels as TagType[]}
      getOptionLabel={(option) => {
        // e.g value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.title;
      }}
      renderOption={(option) => option.title}
      style={{ width: 250, padding: '5px' }}
      freeSolo
      renderInput={(params) => (
        <TextField
          onChange={(e) => {
            setValue({ title: e.target.value });
            console.log(value);
          }}
          {...params}
          label="Label Note"
          InputLabelProps={{ shrink: true }}
          placeholder="Enter label name"
          variant="standard"
          fullWidth
          aria-label="none"
        />
      )}
    />
  );
}

interface TagType {
  inputValue?: string;
  title: string;
}
