///<reference path="global.d.ts"/>

import express from "express";
import morgan from "morgan";
import Keycloak from "keycloak-connect";
import session from "express-session";
import proxy from "express-http-proxy";
import { config } from "./config";

const app = express();
const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({
  store: memoryStore,
});

app.use(morgan("tiny"));
app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);
app.use(keycloak.middleware());
app.use(keycloak.protect());
app.use(proxy(config.clientUrl));

const server = app.listen(config.port, () => {
  console.log(`App listening on port ${config.port}`);
});

function listenToExit(cleanUp: () => void) {
  process.on("exit", cleanUp);
  process.on("SIGINT", cleanUp);
  process.on("SIGUSR1", cleanUp);
  process.on("SIGUSR2", cleanUp);
  process.on("uncaughtException", cleanUp);
}

listenToExit(server.close);
