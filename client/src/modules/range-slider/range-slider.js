import React from 'react';

import { Slider } from '@mui/material';

export default function RangeSlider({onChange, inputRange}) {

    function valuetext(value) {
        return `${value} km`;
    }

    const marks = [
        {value: 1, label: '1km'},
        {value: 20, label: '20km'},
    ]

    return (
        <Slider
            aria-label="Custom marks"
            min={1}
            max={20}
            onChange={onChange}
            value={inputRange || 8}
            getAriaValueText={valuetext}
            step={1}
            valueLabelDisplay="auto"
            marks={marks}
            sx={{
                "color": "#fd267a"
            }}
        />
    )
}
