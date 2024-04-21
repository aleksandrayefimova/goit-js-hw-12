import axios from 'axios';

export const requestServer = {
    url: 'https://pixabay.com/api/',
    params: {
        key: '35337679-b7947e609f482c58d47f4cd5a',
        q: '',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: 1,
        per_page: 20
    },
    
    onRequestServer(query = this.params.q) {
        this.params.q = query;
        this.params.page += 1;
        return axios.get(this.url, { params: this.params })
    }  
}

