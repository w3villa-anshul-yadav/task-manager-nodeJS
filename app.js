require("dotenv").config();

//DataBase connection
const connectDB = require("./config/DBConfig");
connectDB();

//express app
const express = require("express");
const app = express();

// swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger/swagger.json");

//routes
const routes = require("./routes/index");

//middlewares

const noRoutesMiddleWare = require("./middlewares/noRoutesMiddleWare");
const logger = require("./logger");

app.use(express.json());

app.use("/api/v1", routes);


// Swagger
app.use(
  "/api-documents",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs)
);


app.use(noRoutesMiddleWare);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    logger.info(`Server started at http://localhost:${PORT}`);
});
