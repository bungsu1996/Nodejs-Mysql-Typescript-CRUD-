import express, { Application } from "express";
import http from "http";
import Config from "./configs/config";
import logging from "./configs/logging";
import userRouter from "./routes/user.routes";

const NAMESPACE = "Server";

class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.plugin();
    this.route();
    this.errHandler();
  };
  protected plugin = () => {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
      );
      next();
    });
  };
  protected route = () => {
    this.app.use(userRouter);
    this.app.use((req, res, next) => {
      logging.Info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
      res.on("finish", () => {
        logging.Info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
      });
      next();
    });
  };
  protected errHandler = () => {

  };
};

const app = new App().app;
const port = Config.Server.port;
const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  console.log(`[ 👻 ] : Connected!!`);
  logging.Info(NAMESPACE, `Server running at http://${Config.Server.hostname}:${Config.Server.port}`);
})