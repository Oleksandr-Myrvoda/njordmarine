import axios from 'axios';

axios.defaults.baseURL =
  'https://njordmarineapp-default-rtdb.europe-west1.firebasedatabase.app';

const getData = endpoint => {
  return axios
    .get(`${endpoint}.json`)
    .then(({ data }) =>
      data ? Object.entries(data).map(([id, data]) => ({ id, ...data })) : [],
    );
};

const addItemApi = (endpoint, item) => {
  return axios
    .post(`${endpoint}.json`, item)
    .then(response => ({ ...item, id: response.data.name }));
};

const editItemApi = ({ endpoint, item, id }) => {
  return axios
    .patch(`${endpoint}/${id}.json`, item)
    .then(response => ({ ...response.data, id }));
};

const deleteItemApi = ({ endpoint, item, id }) => {
  return axios
    .delete(`${endpoint}/${id}.json`, item)
    .then(response => ({ ...response.data, id }));
};

// BREND =======

const addBrendApi = ({ endpoint, brend }) => {
  return axios
    .post(`${endpoint}/brends.json`, { brend })
    .then(({ data }) => ({ id: data.name, brend }));
};

const editBrendApi = ({ endpoint, item, id }) => {
  // return axios
  //   .patch(`${endpoint}/${id}.json`, item)
  //   .then(response => ({ ...response.data, id }));
};

const deleteBrendApi = ({ endpoint, brend, id }) => {
  // return axios
  // .delete(`${endpoint}/${id}.json`, { brend })
  // .then(response => console.log(response));
  // .then(response => ({ ...response.data, id }));
};

export {
  getData,
  addItemApi,
  editItemApi,
  deleteItemApi,
  // , editItem, deleteItem
  addBrendApi,
  editBrendApi,
  deleteBrendApi,
};
