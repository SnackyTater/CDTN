import {useState} from 'react';

import Button from '../../common/component/button/button';
import PassionPickerForm from '../popup-form/passion-picker/passion-picker';
import Tag from '../../common/component/tag/tag';

export default function PassionPicker({passions, selectPassion, selectedPassion}) {
    const [isOpen, setOpen] = useState(false);

    const closeForm = () => setOpen(false);
    
    const getPassionName = (id) => {
        let name = '';
        passions.forEach((passion) => {
            if(passion._id === id) name = passion.name;
        })
        return name;
    }

    return (
        <div>
            <div onClick={() => {setOpen(true)}}>
                {(selectedPassion.length != 0) 
                    ? selectedPassion.map((passionID) => <Tag className={`tag active`} content={getPassionName(passionID)} key={passionID}/>) 
                    : <Button content={'select passions'} onClick={() => {}}/>
                }
            </div>
            <PassionPickerForm 
                isOpen={isOpen} 
                closeForm={closeForm} 
                passions={passions} 
                selectPassion={selectPassion} 
                selectedPassion={selectedPassion}
            />
        </div>
    )
}
