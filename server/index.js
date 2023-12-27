require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');
require('express/lib/response');
const PORT = process.env.PORT || 5000;
const app = express();
const sequelize = require('./db-connection');
require('./db-models/models');
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(process.env.API_PATH, router);
app.use(errorMiddleware);

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: false });
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
    } catch (e) {
        console.log(e);
    }
})();
