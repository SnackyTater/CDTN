import React from 'react';
import MuiCarousel from 'react-material-ui-carousel';

export default function Carousel({children}) {
    return (
        <MuiCarousel
            animation='slide'
            interval={5000}
            duration={0}
            indicators={false}
        >
            {children}
        </MuiCarousel>
    )
}
