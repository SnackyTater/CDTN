import { config } from 'dotenv'
import React from 'react'

export default function Checkbox() {
    return (
        <label>
            <input type="checkbox"/>
            <span>{config.name}</span>
        </label>
    )
}
