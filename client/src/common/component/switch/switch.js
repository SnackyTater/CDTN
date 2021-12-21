import React from 'react';

import { Switch } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

const CustomSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: "#fd267a",
      '&:hover': {
        backgroundColor: alpha("#fd267a", theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: "#fd267a",
    },
  }));

export default function SwitchCustom({inputCheck, onChange}) {
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
      setChecked(event.target.checked);
      onChange(event);
    };

    return <CustomSwitch 
        checked={inputCheck ? inputCheck : checked}
        onChange={handleChange}
    />
}
