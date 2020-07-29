require('./config/mongoose.js');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const userRouter = require('./routes/user.js');

app.use('/users', userRouter);
app.listen(PORT, () => console.log('Servidor levantado en el puerto ' + PORT));