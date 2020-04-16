import Axios from 'axios';
import config from './elasticsearch.config';

export const toElasticSearch = (data: any) => {
  return Axios.post(config.url, data);
};
