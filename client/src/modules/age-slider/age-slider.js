import { useState , useEffect} from 'react';

import { Slider } from '@mui/material';

export default function Setting({age, setAge}) {
    const [value, setValue] = useState([20, 40]);

    const minDistance = 3;

    const mark = [{value: 18, label: '18'}, {value: 50, label: '50'}]

    const valuetext = (value) => {
        return `${value}°C`;
    }

    useEffect(() => {
        setValue(age);
    }, [age])

    const handleChange = (event, newValue, activeThumb) => {
      if (!Array.isArray(newValue)) {
        return;
      }

      if (activeThumb === 0) {
        setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
      } else {
        setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
      }
      setAge(value);
    };

    return (
        <div style={{"width": '100%'}}>
            <Slider
                min={18}
                max={50}
                getAriaLabel={() => 'Minimum distance'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
                marks={mark}
                sx={{
                    "color": "#fd267a"
                }}
            />
        </div>
    )
}
