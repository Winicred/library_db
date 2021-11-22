const express = require("express")
const cors = require("cors")

const app = express()

const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")


app.use(cors())

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to library RESTful API" });
})


require("./routes/categoryRoutes")(app);
app.use('/api/auth', require('./routes/authRouter'))


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library Example Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000/",
        description: 'Development server',
      },
    ],
  },
  apis: ["./routes/*"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
})