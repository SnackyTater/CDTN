import {fetcher} from '../api';

const addImage = ({image}) => {
    const fd = new FormData();
    fd.append('image', image);

    return fetcher.post({
        url: 'media',
        body: fd,
        type: 'multipart/form-data'
    })
}

const deleteImage = ({id}) => {
    return fetcher.delete({
        url: `media/${id}`,
    })
}

export {addImage, deleteImage}