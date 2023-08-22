import axios from 'axios';

const { REACT_APP_DATABASE_URL } = process.env;

axios.defaults.baseURL = REACT_APP_DATABASE_URL;

const normalizeBrends = items => {
  const itemsNormalize = items.map(({ itemTitle = '', imgUrl, brends, id }) => {
    const brendsNormalize = brends
      ? Object.entries(brends).map(([id, brend = []]) => {
          if (typeof brend === 'string') {
            return { id, brend };
          }
          return { id, ...brend };
        })
      : [];

    return { itemTitle, imgUrl, brends: [...brendsNormalize], id };
  });
  return itemsNormalize;
};

const getData = endpoint => {
  return axios
    .get(`${endpoint}.json`)
    .then(({ data = [] }) =>
      data ? Object.entries(data).map(([id, data]) => ({ id, ...data })) : [],
    )
    .then(items => normalizeBrends(items));
};

const addItemApi = (endpoint, item, token) => {
  return axios
    .post(`${endpoint}.json`, item, {
      params: {
        auth: token,
      },
    })
    .then(response => ({ ...item, id: response.data.name }));
};

const editItemApi = ({ endpoint, item, id, token }) => {
  return axios
    .patch(`${endpoint}/${id}.json`, item, {
      params: {
        auth: token,
      },
    })
    .then(response => ({ ...response.data, id }));
};

const deleteItemApi = ({ endpoint, id, token }) => {
  return axios
    .delete(`${endpoint}/${id}.json`, {
      params: {
        auth: token,
      },
    })
    .then(response => ({ ...response.data, id }));
};

// BREND =======

const addBrendApi = ({ endpoint, brend, token }) => {
  return axios
    .post(`${endpoint}/brends.json`, brend, {
      params: {
        auth: token,
      },
    })
    .then(({ data }) => ({ id: data.name, ...brend }));
};

const editBrendApi = ({ endpoint, item, id, token }) => {
  return axios
    .patch(`${endpoint}/brends/${id}.json`, item, {
      params: {
        auth: token,
      },
    })
    .then(response => ({ ...response.data, id }));
};

const deleteBrendApi = ({ endpoint, id, token }) => {
  return axios
    .delete(`${endpoint}/brends/${id}.json`, {
      params: {
        auth: token,
      },
    })
    .then(response => ({ ...response.data, id }));
};

// BROCHURE LINK =======

const getBrochureApi = () => {
  return axios.get('/brochure.json').then(({ data }) => {
    try {
      return data
        ? Object.entries(data).map(([id, refs]) => ({ id, ...refs }))[0]
        : { ru: '', en: '', id: null };
    } catch (error) {
      return { ru: '', en: '', id: null };
    }
  });
};

const addBrochureApi = (refs = { en: '', ru: '' }, token) => {
  return axios
    .post('/brochure.json', refs, {
      params: {
        auth: token,
      },
    })
    .then(({ data }) => ({ ...refs, id: data.name }));
};

const editBrochureApi = ({ refs, id, token }) => {
  return axios
    .patch(`/brochure/${id}.json`, refs, {
      params: {
        auth: token,
      },
    })
    .then(response => response.data);
};

// TTERMS LINK =======

const getTermsApi = () => {
  return axios.get('/terms.json').then(({ data }) => {
    try {
      return data
        ? Object.entries(data).map(([id, termRefs]) => ({ id, ...termRefs }))[0]
        : { ru: '', en: '', id: null };
    } catch (error) {
      return { ru: '', en: '', id: null };
    }
  });
};

const addTermsApi = (refs = { en: '', ru: '' }, token) => {
  return axios
    .post('/terms.json', refs, {
      params: {
        auth: token,
      },
    })
    .then(({ data }) => ({ ...refs, id: data.name }));
};

const editTermsApi = ({ termRefs, id, token }) => {
  return axios
    .patch(`/terms/${id}.json`, termRefs, {
      params: {
        auth: token,
      },
    })
    .then(response => response.data);
};

export {
  getData,
  addItemApi,
  editItemApi,
  deleteItemApi,
  addBrendApi,
  editBrendApi,
  deleteBrendApi,
  getBrochureApi,
  addBrochureApi,
  editBrochureApi,
  addTermsApi,
  getTermsApi,
  editTermsApi,
};
