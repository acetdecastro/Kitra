import express from "express";
import bodyParser from "body-parser";
import { envConfig } from "./config";

const app = express();

app.use(bodyParser.json());

app.listen(envConfig.PORT, () => {
  console.log(`Server listening on port: ${envConfig.PORT}`);
});
