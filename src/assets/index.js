import config from '../config';
import assetsConfig from './assetsConfig';

const files = {};

assetsConfig.forEach(asset => {
  files[asset.name] = config.USE_CDN ? `${config.STORAGE_BASE_URL}/${asset.file}` : require(`./${asset.file}`);
});

export default files;
