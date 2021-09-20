const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      usuariosPath: "/api/usuarios",
      categories: "/api/categories",
      products: "/api/products",
      authPath: "/api/auth",
    };

    //connectar base de datos
    this.connectDb();
    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  async connectDb() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio Público
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.authPath, require("../routes/auth"));
    this.app.use(this.paths.categories, require("../routes/categories"));
    this.app.use(this.paths.products, require("../routes/products"));

    this.app.use(this.paths.usuariosPath, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
