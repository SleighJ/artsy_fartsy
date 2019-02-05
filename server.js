require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

const pusher = new Pusher({
	appId: process.env.PUSHER_APP_ID,
	key: process.env.PUSHER_KEY,
	secret: process.env.PUSHER_SECRET,
	cluster: 'eu',
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});

app.get('/paint', (req, res) => {
	res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.post('/paint', (req, res) => {
	pusher.trigger('painting', 'draw', req.body);
	res.send(req.body);
});

app.get('/paint/background', (req, res) => {
	res.send({ express: 'you have connected to background route' });
});

app.post('/paint/background', (req, res) => {
	console.log('sending background to backend')
	res.send(req.body)
});