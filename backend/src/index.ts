import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { connection } from './database/connection';
import routes from './routes';
import 'dotenv/config';

const app = express();
connection();
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

app.listen(process.env.PORT, () => console.log('🔥 Server is running in port ' + process.env.PORT ));