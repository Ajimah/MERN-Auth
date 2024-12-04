const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();
const {mongoose} = require('mongoose');
const cookieParser = require('cookie-parser');


//database configuration
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('database connected'))
.catch ((err) => console.log('database error',err))

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
    origin: 'http://localhost:5173', // specify the allowed origin
    credentials: true, // allow credentials (cookies, authorization headers, etc.)
    methods: 'GET,HEAD,OPTIONS,POST,PUT', // allowed methods
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization' // allowed headers
  };
  
app.use(cors(corsOptions));

app.options('*', cors(corsOptions)); 


app.use('/', require('./routes/authRoutes'))

const port = 8000
app.listen(port,() => console.log(`Server is running at ${port}`));