import axios from "axios";

export const getIndexUserApi = (params: Object): Promise<any> => {
  // return apiClient.get('/users/user', params);

  return axios.get('https://api.jsonbin.io/v3/qs/671aa0aaad19ca34f8bdf8c3')
};