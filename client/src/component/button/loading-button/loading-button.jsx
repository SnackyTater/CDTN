import { LoadingButton } from '@mui/lab';
import './loading-button.scss';

export default function loadingButton({isLoading, onClick, placeholder, width}) {
    return (
        <LoadingButton
            onClick={onClick}
            loading={isLoading}
            className='MuiButtonBase-root-MuiButton-root-MuiLoadingButton-root'
            variant="contained"
            sx={{
                "backgroundImage": "linear-gradient(45deg,#fd267a,#ff7854)",
                "borderRadius": '36px',
                "color": 'white',
                "width": width
            }}
        >
            {placeholder}
        </LoadingButton>
    )
}
