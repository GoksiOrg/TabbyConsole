import axios from "axios";

const http = axios.create({
    timeout: 10000,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});
const csrf = document.head.querySelector('meta[name="csrf-token"]');

if (csrf != null && csrf instanceof HTMLMetaElement) {
    http.defaults.headers.common["X-CSRF-TOKEN"] = csrf.content;
}

export default http;
