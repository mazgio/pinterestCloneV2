import axios from 'axios';


export default axios.create({
    baseUrl: "https://api.unsplash.com/",
    headers: {
        Authorization: "Client-ID khN4pAnu059ysJRn0N1HhslihqN6N4dvXtCSylECXFI"
    }
});