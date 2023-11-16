import client from './index'

const baseURL = process.env.REACT_APP_BASE_URL;
const apiAdminUrl = `${baseURL}/api/admin`;


export const fetchUserData = () => {
    return client.get(`${ apiAdminUrl }/user`);
}

export const fetchQuestionData = () => {
    return client.get(`${ apiAdminUrl }/question`);
}

export const createNewQuestion = (data) => {
    return client.post(`${ apiAdminUrl }/question`, data);
}

export const updateQuestion = (data) => {
    return client.put(`${ apiAdminUrl }/question`, data);
}

export const deleteQuestion = (id) => {
    return client.delete(`${ apiAdminUrl }/question/${id}`);
}

export const fetchSubQuestionsByIDData = (id) => {
    return client.get(`${ apiAdminUrl }/question/child/${id}`);
}



