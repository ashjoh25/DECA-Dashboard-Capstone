const express = require('express');
const cors = require('cors');
const mysql = require('mysql'); // For raw SQL queries
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Enable CORS for requests from the frontend (React app)
app.use(cors({
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://deca-dashboard-3a2db.web.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});


// Set up raw MySQL database connection
const db = mysql.createConnection({
  //host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  socket_path: process.env.SOCKET_PATH,
  ssl: {
    rejectUnauthorized: false,
  },
});


// Test MySQL connection
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database.');
  }
});



// Import routes
const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

const resourcesRouter = require('./routes/resourceRoutes');
app.use('/resources', resourcesRouter);

const eventsRouter = require('./routes/eventsRoute');
app.use('/events', eventsRouter);

const participantRoutes = require('./routes/participantRoutes');
app.use('/participantdetails', participantRoutes);

const fundraisersRoutes = require('./routes/fundraisersRoutes');
app.use('/fundraisers', fundraisersRoutes);

const announcementsRoutes = require('./routes/announcementsRoutes');
app.use('/home', announcementsRoutes); 

const todolistRoutes = require('./routes/todoListRoutes')
app.use('/todolist', todolistRoutes)



// Define test routes
app.get('/', (req, res) => {
  res.json("From backend");
});

app.get('/users', (req, res) => {
  const sql = "SELECT * FROM user";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});


// Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}/`);
});
