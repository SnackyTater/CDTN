import { IconButton as MuiIconButton } from '@mui/material';

export default function IconButton({ripple, onClick, icon, hoverConfig, config, children}) {
    return (
        <MuiIconButton
            disableRipple={ripple}
            sx={{
                "&.MuiButtonBase-root": {...config},
                "&.MuiButtonBase-root:hover": { boder: 'none', bgcolor: 'transparent', ...hoverConfig }
            }}
            onClick={() => {onClick && onClick()}}
        >
            {icon || children}
        </MuiIconButton>
    )
}
