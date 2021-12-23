import './tag.scss';

export default function Tag({name, content, onClick, isActive}) {
    return (
        <button 
            className={`tag${isActive ? '--active' : '' }`} 
            onClick={onClick}
            value={content}
            name={name}
        >
            {content}
        </button>
    )
}
