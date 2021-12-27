import { Backdrop, CircularProgress } from '@mui/material'

export default function loading({config, isLoading}) {
    return (
        <Backdrop
            sx={{color: '#fff', zIndex: 2, ...config}}
            open={true}
        >
            <CircularProgress color='inherit'/>
        </Backdrop>
    )
}
