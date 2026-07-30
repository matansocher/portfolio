import config from '../config';
import assetsConfig from './assetsConfig';

const query_param = `a=${new Date().getTime()}`;

const files = {};

assetsConfig.forEach((asset) => {
  files[asset.name] = `${config.STORAGE_BASE_URL}/new/${asset.file}?${query_param}`;
});

export default files;
