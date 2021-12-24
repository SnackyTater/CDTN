import './tag.scss';

export default function Tag({value, content, onClick, isActive}) {
    return (
        <button 
            className={`tag${isActive ? '--active' : '' }`} 
            onClick={onClick}
            value={value}
        >
            {content}
        </button>
    )
}
