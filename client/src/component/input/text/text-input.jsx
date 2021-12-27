import {TextField} from '@mui/material';

export default function Input({name, label, disableStatus, onChange, error, type, placeholder, InputProps}) {

    return (
        <TextField 
            InputLabelProps={{ shrink: true }}
            InputProps={InputProps}
            error={error && !error.status}
            helperText={error ? error.message : ' '}
            label={label}
            name={name}
            disabled={disableStatus}
            onChange={onChange}
            type={type}
            fullWidth
            value={placeholder}
            sx={{
                "maxWidth": '400px',
                "alignSelf": 'center',
                "padding": '15px 0px'
            }}
        />
    )
}