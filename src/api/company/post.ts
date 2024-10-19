export const getIndexPostApi = (params: Object): Promise<any> => {  
  // return axios
  //   .post(`${API_URL}/model/predict`, { text: text })
  //   .then((result) => {
  //     return result.data
  //   });

  return fetch("/data/company/posts.json").then((res) => res.json())
}

export const getDetailPostApi = (id: string): Promise<any> => {  
  // return axios
  //   .post(`${API_URL}/model/predict`, { text: text })
  //   .then((result) => {
  //     return result.data
  //   });

  return fetch("/data/company/post.json").then((res) => res.json()).then((d) => d.data);
}