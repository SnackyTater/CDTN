import {fetcher} from '../api';

export default mediaAPI = {
    addImage: ({body}) => {
        return fetcher.post({
            url: 'media',
            body: body
        })
    },
    deleteImage: ({id}) => {
        return fetcher.delete({
            url: `media/${id}`
        })
    }
}