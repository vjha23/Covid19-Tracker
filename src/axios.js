import axios from 'axios'

const axioxInstance = axios.create({
    baseURL: 'https://api.covid19api.com/'
})
export default axioxInstance;