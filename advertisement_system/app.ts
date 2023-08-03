import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { authRouter } from './src/routes/auth.route';
import { dashboardRouter } from './src/routes/user-dashboard.route';
import { productRouter } from './src/routes/product.route';
import * as dotenv from 'dotenv';
import { serverConfig } from './envConfig';


const app:Express = express();
app.use(express.json());
app.use(bodyParser.urlencoded( {extended: true} ));
dotenv.config();

const port = serverConfig.PORT ;
const hostname = serverConfig.HOST;
console.log(`host`,serverConfig.HOST);
console.log('////',serverConfig.PORT);


app.use("/auth", authRouter);
app.use("/dashboard", dashboardRouter);
app.use("/product", productRouter);

app.listen(port, hostname, () => {
  console.log(`Server started on port ${port}`);
});
