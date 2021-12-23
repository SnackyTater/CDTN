import { IconButton as MuiIconButton } from '@mui/material';

export default function IconButton({ripple, onClick, icon, hoverConfig}) {
    return (
        <MuiIconButton
            disableRipple={ripple}
            sx={{
                "&.MuiButtonBase-root:hover": hoverConfig || {
                    border: 'none',
                    bgcolor: 'transparent'
                }
            }}
            onClick={() => {onClick && onClick()}}
        >
            {icon}
        </MuiIconButton>
    )
}
