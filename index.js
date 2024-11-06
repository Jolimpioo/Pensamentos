import express from "express";
import exphbs from "express-handlebars";
import session from "express-session";
import sessionFileStore from "session-file-store";
import flash from "express-flash";
import sequelize from "./db/dbConnect.js";
import path from "path";
import os from "os";
import Tought from "./models/Tought.js";
import User from "./models/User.js";

const FileStore = sessionFileStore(session);

const app = express();

//Middleware template engine Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

//Middleware para arquivos estáticos da pasta "public"
app.use(express.static("public"));

//Middlewares para receber resposta do body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Middleware Session
app.use(
  session({
    name: "session",
    secret: "nosso_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: path.join(os.tmpdir(), "sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  })
);

//Flash messages
app.use(flash());

//Set session to res
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }
  next();
});

const startServer = async () => {
  try {
    await sequelize.sync();
    // Recria todas as tabelas, apagando os dados; útil para desenvolvimento inicial
    //.sync({ force: true });
    app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000");
    });
  } catch (error) {
    console.error(`Erro ao iniciar o servidor: ${error}`);
  }
};

startServer();
