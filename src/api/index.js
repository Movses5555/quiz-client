import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;
const apiUrl = `${baseURL}/api`;
const apiAdminUrl = `${baseURL}/api/admin`;

const client = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json"
    },
});

client.interceptors.request.use((config) => {
   const result = Object.assign({}, config);
   result.headers.Authorization = `Bearer ${ localStorage.getItem('token') }`;
   return config;
}, (error) => {
   return Promise.reject(error);
});

client.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if(error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.replace('/sign-in');
        }
        throw error;
    }
);

export default client;


export const SignIn = (data) => {
    return client.post(`${ baseURL }/auth/login`, data)
}

export const SignUp = (data) => {
    return client.post(`${ baseURL }/auth/register`, data)
}

export const Logout = () => {
    return client.get(`${ baseURL }/auth/logout`)
}

export const fetchUserData = () => {
    return client.get(`${ apiAdminUrl }/user`);
}

export const fetchQuestionData = () => {
    return client.get(`${ apiAdminUrl }/question`);
}

export const fetchSubQuestionsByIDData = (id) => {
    return client.get(`${ apiAdminUrl }/question/child/${id}`);
}













export const fetchProductData = () => {
    return client.get(`${ apiUrl }/product`);
}

export const fetchProduct = (id) => {
    return client.get(`${ apiUrl }/product/${id}`);
}

export const fetchBasketData = () => {
    return client.get(`${ apiUrl }/basket`);
}

export const fetchBadgeCount = () => {
    return client.get(`${ apiUrl }/basket/badge-count`);
}

export const addToBasketData = (data) => {
    return client.post(`${ apiUrl }/basket`, data);
}

export const removeToBasket = (id) => {
    return client.post(`${ apiUrl }/basket/remove`, id);
}

export const buyProduct = (data) => {
    return client.post(`${ apiUrl }/payment`, data);
}

