import "dotenv/config";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";

import routes from "./routes";
import { logErrors, clientErrorHandler, errorHandler } from "./errorHandler";
import connectDb from "./db/connection";
import sendMailMorningTask from "./cronjobs/sendMails";

const PORT = process.env.PORT || 4000;
// const NODE_ENV = process.env.NODE_ENV || "development";

const app = express();

/* Application-Level Middleware */

app.use(cors());
app.use(logger("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// * Routes * //

app.use("/", routes);

/* Middleware Error */

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// * Start App after Db Connection * //
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server listening on port ${PORT}`);
      sendMailMorningTask.start();
    });
  })
  .catch(() => {
    // eslint-disable-next-line no-console
    console.log("Db connection failed!");
    sendMailMorningTask.stop();
  });

process.on("unhandledRejection", (reason) => {
  // eslint-disable-next-line no-console
  console.log("Unhandled Rejection at:", reason.stack || reason);
});
