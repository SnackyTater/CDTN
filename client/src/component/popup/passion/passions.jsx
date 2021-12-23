import Backdrop from '../../backdrop/default-backdrop/default-backdrop';
import Tag from '../../tag/tag';

import './passion.scss';

export default function PassionPickerForm({isOpen, closeForm, passions, selectPassion, selectedPassion}) {

    const clickHandler = (passion) => {
        selectPassion(passion._id);
    }

    if(!isOpen) return null;
    return (
        <>
            <Backdrop />
            <div className="passion__form">
                <p className='form__title'>select your passions</p>
                <button className="form__close-button" onClick={closeForm}>x</button>
                <div>
                    {passions.map((passion) => 
                        <Tag 
                            className={
                                (selectedPassion.includes(passion._id)) ? `tag active` : 'tag'
                            } 
                            key={passion._id} 
                            content={passion.name} 
                            onClick={() => {clickHandler(passion)}}
                        />
                    )}
                </div>
            </div>
            
        </>
    )
}
