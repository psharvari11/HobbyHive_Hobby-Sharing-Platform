const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db.js');
const hobbyRoutes = require('./routes/hobbyRoutes');
const groupRoutes = require('./routes/groupss.js');
dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send(' HobbyHive Backend is live! ');
});
app.use('/api/users', require('./routes/userRoutes'));

app.use('/api/hobbies', hobbyRoutes);
app.use("/api/groups",groupRoutes )

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
