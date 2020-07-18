import axios from 'axios';

export default axios.create({
    baseURL:'https://api.unsplash.com',
    headers:{
        Authorization:'Client-ID RfA-a6sTK68eZdYRvpRkEN26quQN0A5d-KhUy63XbBc'
    }
});