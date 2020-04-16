import Axios from 'axios';

export const toElasticSearch = (data: any) => {
  return Axios.post(
    process.env.REACT_APP_ELASTIC_SEARCH_URL + 'hilbert/_doc' || ' ',
    data
  );
};
