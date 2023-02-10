import axios from 'axios';

const http = axios.create({
    timeout: 10000
})
let csrf = document.head.querySelector('meta[name="csrf-token"]');

if (csrf && csrf instanceof HTMLMetaElement) {
    http.defaults.headers.common['X-CSRF-TOKEN'] = csrf.content;
}

export default http;
