import config from '../config';
import assetsConfig from './assetsConfig';

const query_param = `a=${new Date().getTime()}`

const files = {};

assetsConfig.forEach(asset => {
  files[asset.name] = config.USE_CDN ? `${config.STORAGE_BASE_URL}/${asset.file}?${query_param}` : require(`./${asset.file}`);
});

export default files;
