require('./config/mongoose.js');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const morgan = require('morgan');
const userRouter = require('./routes/user.js');
const postRouter = require('./routes/post.js')
// const cors = require('cors');
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST,GET,PUT,OPTIONS,DELETE");
    next();
});
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.listen(PORT, () => console.log('Servidor levantado en el puerto ' + PORT));