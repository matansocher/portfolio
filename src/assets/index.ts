import config from '../config';
import assetsConfig from './assetsConfig';
import type { Assets } from '../types';

const query_param = `a=${__BUILD_TIME__}`;

const files: Assets = {};

assetsConfig.forEach((asset) => {
  files[asset.name] = `${config.STORAGE_BASE_URL}/new/${asset.file}?${query_param}`;
});

export default files;
