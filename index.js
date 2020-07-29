require('./config/mongoose.js');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const userRouter = require('./routes/user.js');
const morgan = require('morgan');

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST","GET","PUT","OPTIONS","DELETE");
    next();
});
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/users', userRouter);
app.listen(PORT, () => console.log('Servidor levantado en el puerto ' + PORT));