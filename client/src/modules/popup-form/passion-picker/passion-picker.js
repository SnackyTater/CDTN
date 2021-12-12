import Overlay from '../../../common/component/overlay/overlay';
import Tag from '../../../common/component/tag/tag';

import './passion-picker.css';

export default function PassionPickerForm({isOpen, closeForm, passions, selectPassion, selectedPassion}) {

    const clickHandler = (passion) => {
        selectPassion(passion._id);
    }

    if(!isOpen) return null;
    return (
        <>
            <Overlay />
            <div className="form">
                <p className='form__title'>select your passions</p>
                <button className="form__close-button" onClick={closeForm}>x</button>
                <div className='form__content'>
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
