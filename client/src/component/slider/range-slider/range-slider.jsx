import React from 'react';

import { Slider } from '@mui/material';

export default function RangeSlider({onChange, inputRange, name}) {

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
            onChange={(e) => {onChange({target: {name, value: e.target.value *10000}})}}
            value={inputRange || 8}
            getAriaValueText={valuetext}
            step={1}
            valueLabelDisplay="auto"
            marks={marks}
            name={name}
            sx={{
                "color": "#fd267a"
            }}
        />
    )
}
