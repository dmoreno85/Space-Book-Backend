const mongoose = require('mongoose');
const mongo_URI = process.env.mongo_URI || 'mongodb://localhost:27017/space-book';
mongoose.connect(mongo_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log('Conectado satisfactoriamente a MongoDB'))
    .catch(console.error)