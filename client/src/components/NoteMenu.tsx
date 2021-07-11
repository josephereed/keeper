import { ButtonBase, Typography } from '@material-ui/core';
import LabelMenu from './LabelMenu';
import ColorMenu from './ColorMenu';

interface PropTypes {
  setOpen: Function;
  setColor: Function;
  tags: string[];
  setTags: Function;
}
const NoteMenu = ({ setOpen, setColor, tags, setTags }: PropTypes) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <ColorMenu setColor={setColor} />
          <LabelMenu tags={tags} setTags={setTags} />
        </div>
        <ButtonBase
          onClickCapture={() => {
            setOpen(true);
          }}
        >
          <Typography variant="subtitle2">Close</Typography>
        </ButtonBase>
      </div>
    </>
  );
};

export default NoteMenu;
