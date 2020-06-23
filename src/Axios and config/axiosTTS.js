import axios from 'axios';
import config from './config';

export default axios.create({
    baseURL: config.TTS.rootPath,
    headers: config.TTS.headers
  })