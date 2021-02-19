import * as express from 'express';
import * as bodyParser from 'body-parser';
import { connection } from './connection';
import routes from './routes';
import 'dotenv/config';

const app = express();
connection();
app.use(bodyParser.json());
app.use(routes)

app.listen(process.env.PORT, () => console.log('🔥 Server is running in port ' + process.env.PORT ));