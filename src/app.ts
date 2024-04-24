import web from './application/web';
require('dotenv').config();

const port: number = parseInt(process.env.PORT || '9000', 10);
const app = web(port);