import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import CheckBoxes from './Checkboxes';
import AddNewLabel from './AddNewLabel';

interface PropTypes {
  tags: string[];
  setTags: Function;
  setLabels: Function;
  labels: string[];
}
export default function SimpleMenu({
  tags,
  setTags,
  setLabels,
  labels,
}: PropTypes) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ padding: '5px' }}>
      <ButtonBase
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <LocalOfferOutlinedIcon />
      </ButtonBase>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <AddNewLabel
          tags={tags}
          setTags={setTags}
          setLabels={setLabels}
          labels={labels}
        />
      </Menu>
    </div>
  );
}
