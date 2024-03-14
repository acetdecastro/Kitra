import express from 'express';
import bodyParser from 'body-parser';
import { envConfig } from './config';
import { AppDataSource } from './database/data-source';
import { treasureRouter } from './treasures/treasure.route';

const app = express();

app.use(bodyParser.json());

AppDataSource.initialize()
  .then(() => {
    console.log(`Successfully connected with MySQL`);
  })
  .catch((error) => console.log(error));

app.use('/treasures', treasureRouter);

app.listen(envConfig.PORT, () => {
  console.log(`Server is listening on port: ${envConfig.PORT}`);
});
