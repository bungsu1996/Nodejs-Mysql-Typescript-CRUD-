import { NextFunction, Request, Response } from "express";
import logging from "../configs/logging";
import { Connect, Query } from "../configs/mysql";

const NAMESPACE = "Users Clients";

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  logging.Info(NAMESPACE, "Getting All Users Clients");
  const query = `SELECT * FROM users`;
  Connect().then((connection) => {
    Query(connection, query).then((result) => {
      return res.status(200).json({ message: result });
    }).catch((error) => {
      logging.error(NAMESPACE, error.message, error);
      return res.status(500).json({ message: error.message, error });
    }).finally(() => {
      connection.end();
    });
  }).catch((error) => {
    logging.error(NAMESPACE, error.message, error);
    return res.status(500).json({ message: error.message, error });
  });
}; 

export default { getAllUsers };