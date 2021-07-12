import { ButtonBase, Typography } from '@material-ui/core';
import LabelMenu from './LabelMenu';
import ColorMenu from './ColorMenu';

interface PropTypes {
  setOpen: Function;
  setColor: Function;
  tags: string[];
  setTags: Function;
  setLabels: Function;
  labels: string[];
}
const NoteMenu = ({
  setOpen,
  setColor,
  tags,
  setTags,
  setLabels,
  labels,
}: PropTypes) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <ColorMenu setColor={setColor} />
          <LabelMenu
            tags={tags}
            setTags={setTags}
            setLabels={setLabels}
            labels={labels}
          />
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
