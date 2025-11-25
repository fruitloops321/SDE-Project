import axios from 'axios';

const api = axios.create({
    baseurl: 'http://localhost:8081/api',
    headers:{ 'Content-Type': 'application/json'},
});