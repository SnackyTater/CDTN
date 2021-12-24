import './text-area.scss';

export default function textArea({name, onChange, value}) {
    return (
        <textarea 
            className='text-area'
            name={name}
            onChange={onChange}
            value={value}
        >

        </textarea>
    )
}
