import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { TextField } from '@mui/material';

import './datePicker.scss'

export default function datePicker({label, value, onChange, name, error}) {
    return (
        <div style={{margin: '15px 0px'}}>
            <LocalizationProvider dateAdapter={DateAdapter}>
                <DesktopDatePicker
                    name={name}
                    className='date-picker'
                    label={label}
                    inputFormat="dd/MM/yyyy"
                    value={value}
                    onChange={(e) => {
                        onChange({target: {
                            value: e,
                            name: name,
                        }})
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    sx={{
                        '.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
                            width: '400px'
                        }
                    }}
                />
            </LocalizationProvider>
            {!error?.status && <p className='date-picker-error'>{error.message}</p>}
        </div>
    )
}
