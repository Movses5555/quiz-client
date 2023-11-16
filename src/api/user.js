import client from './index'

const baseURL = process.env.REACT_APP_BASE_URL;
const apiUrl = `${baseURL}/api`;


export const fetchUserData = () => {
    return client.get(`${ apiUrl }/user`);
}

export const fetchQuestionData = () => {
    return client.get(`${ apiUrl }/question`);
}

export const fetchSubQuestionsByIDData = (id) => {
    return client.get(`${ apiUrl }/question/child/${id}`);
}

export const saveAnswer = (data) => {
    return client.post(`${ apiUrl }/question/answer`, data);
}



