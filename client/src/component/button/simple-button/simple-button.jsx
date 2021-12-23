import './simple-button.scss'

export default function SimpleButton({name, content, onClick, className}) {
    return (
        <button
            name={name || 'button'}
            className={className || `simple-button`} 
            onClick={onClick}
            value={content}
        >
            {content}
        </button>
    )
}