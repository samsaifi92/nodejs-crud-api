const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models/index');
const bodyParser = require('body-parser');
const corsOptions = {
    origin: 'https://localhost:8081'
}

app.use(cors(corsOptions));

// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

db.sequelize.sync().then(() => {
    console.info('sync finished');
}).catch((err) => {
    console.error('failed to sync db', err.message);
})

// drop the table if already exists

// db.sequelize.sync({ force: true }).then(() => {
//     logger.info('Drop db and resync database');
// })

app.get('/', (req, res) => {
    res.json({ message: 'welcome to Sam node mysql! crud api example ' });
})

require('./routes/posts')(app);
require('./routes/fake')(app);


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`listening on port localhost:${PORT}`);
});