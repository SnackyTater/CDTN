import React from 'react'
import './button.css';

export default function button(text, onClick) {
    return (
        <button onClick={onClick}>{text}</button>
    )
}
