import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://nphc-hr.free.beeceptor.com'
});

instance.defaults.headers.post['Content-Type'] = 'application/json';

export default instance;
