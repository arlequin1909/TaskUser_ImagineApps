const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectToMongo = require('./infrastructure/config/mongo');
const taskRoutes = require('./interface/routes/taskRoutes');
const authRouter = require('./interface/routes/authRouter');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
connectToMongo();

app.use('/api/auth', authRouter);
app.use('/api/task', taskRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
