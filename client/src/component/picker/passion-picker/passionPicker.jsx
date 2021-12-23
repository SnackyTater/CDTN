import {useState} from 'react';
import _ from 'lodash';

import { SimpleButton, Tag, DefaultBackdrop } from '../../index';

export default function PassionPicker({passions, selectPassion, selectedPassion}) {
    const [isOpen, setOpen] = useState(false);

    const closeForm = () => setOpen(false);
    const openForm = () => setOpen(true);
    
    const getPassionName = (id) => {
        let name = '';
        passions.forEach((passion) => {
            if(passion._id === id) name = passion.name;
        })
        return name;
    }

    return (
        <div>
            <div>
                {
                    (selectedPassion.length === 0)
                    ?   <SimpleButton 
                            content={'select passions'}
                            onClick={openForm}
                        />
                    :   selectedPassion.map((passionID, index) =>
                            <Tag
                                key={index}
                                name={'passions'}
                                value={passionID || 'value'}
                                content={getPassionName(passionID || passionID._id)}
                                onClick={openForm}
                            />
                        )
                }
                
            </div>
            <DefaultBackdrop
                isOpen={isOpen}
                closeForm={closeForm}
                title={'select your passions'}
            > 
                {passions.map((passion, index) => <Tag 
                    key={index}
                    name={'passions'}
                    value={passion._id}
                    content={passion.name}
                    isActive={
                        selectedPassion && _.includes(selectedPassion, passion._id)
                    }
                    onClick={selectPassion}
                />)}
            </DefaultBackdrop>
        </div>
    )
}
