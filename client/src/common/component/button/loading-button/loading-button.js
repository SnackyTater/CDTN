import React from 'react';

import LoadingButton from '@mui/lab/LoadingButton';

export default function loadingButton({isLoading, onClick, placeholder, width}) {
    return (
        // <LoadingButton
        //     loading={true}
        //     loadingPosition="start"
        //     onClick={onClick}
        //     variant="contained"
        // >
        //     {placeholder}
        // </LoadingButton>
        <LoadingButton
            onClick={onClick}
            loading={isLoading}
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
