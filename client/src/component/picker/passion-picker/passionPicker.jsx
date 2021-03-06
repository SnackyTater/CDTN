import React, {useState} from 'react';
import _ from 'lodash';

import { SimpleButton, Tag, DefaultBackdrop } from '../../index';
import './passionPicker.scss'

export default function PassionPicker({passions, selectPassion, selectedPassion, error}) {
    const [isOpen, setOpen] = useState(false);
    const [activePassion, setActivePassion] = useState([]);

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
        <div className='passion-picker'>
            <div>
                {
                    (selectedPassion?.length === 0)
                    ?   <SimpleButton 
                            content={'select passions'}
                            onClick={openForm}
                        />
                    :   selectedPassion?.map((passionID, index) =>
                            <Tag
                                key={index}
                                name={'passions'}
                                isActive={true}
                                value={passionID || 'value'}
                                content={getPassionName(passionID || passionID._id)}
                                onClick={openForm}
                            />
                        )
                }
                {!error?.status && <h3 className='passion-picker-error'>{error.message}</h3>}
            </div>
            <DefaultBackdrop
                isOpen={isOpen}
                closeForm={closeForm}
                title={'select your passions'}
            > 
                {passions?.map((passion, index) => <Tag 
                    key={index}
                    value={passion._id}
                    content={passion.name}
                    isActive={
                        selectedPassion && _.includes([...selectedPassion], passion._id)
                    }
                    onClick={(e) => {selectPassion(e)}}
                />)}
            </DefaultBackdrop>
        </div>
    )
}
