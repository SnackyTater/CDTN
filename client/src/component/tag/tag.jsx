import './tag.scss';

export default function Tag({name, content, onClick, isActive}) {
    return (
        <div 
            className={`tag${isActive ? '--active' : '' }`} 
            onClick={onClick}
            value={content}
            name={name}
        >
            {content}
        </div>
    )
}
