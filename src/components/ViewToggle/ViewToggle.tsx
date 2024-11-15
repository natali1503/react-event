import { FC, useState } from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { VIEW_TOGGLE_OPTIONS } from '../../const/const';

type ViewToggleProps = {
  onOptionChange: (option: VIEW_TOGGLE_OPTIONS) => void;
};

const ViewToggle: FC<ViewToggleProps> = ({ onOptionChange }) => {
  const [viewMode, setViewMode] = useState<VIEW_TOGGLE_OPTIONS>(VIEW_TOGGLE_OPTIONS.Grid);

  const handleViewClick = (event: React.MouseEvent<HTMLElement>, newViewMode: VIEW_TOGGLE_OPTIONS | null) => {
    if (newViewMode) {
      setViewMode(newViewMode);
      onOptionChange(newViewMode);
    }
  };

  return (
    <ToggleButtonGroup
      size="small"
      value={viewMode}
      exclusive
      onChange={handleViewClick}
      aria-label="View mode"
    >
      <ToggleButton value="grid" aria-label="Grid view">
        <GridOnIcon />
      </ToggleButton>
      <ToggleButton value="list" aria-label="List view">
        <ListAltRoundedIcon />
      </ToggleButton>
      <ToggleButton value="map" aria-label="Map view">
        <LocationOnIcon /> 
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ViewToggle;
