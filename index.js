const express = require ('express');
const cors = require('cors');
const app = express();
const PORT = 3003;
const HTTP_STATUSES = {
	OK_200: 200,
	CREATED_201: 201,
	NO_CONTENT_204: 204,

	BAD_REQUEST_400: 400,
	NOT_FOUND_404: 404
}
const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);
app.use(cors());

const db = {
	text: [
		'Hi from backEnd',
		'Another text from backEnd'
	],
	users: [
		{id: 1, name: 'Valera', time: '15'},
		{id: 2, name: 'Katia', time: '20'},
	]
}

app.get('/', (req, res) => {
	res.json({message: 'server is working'})
});

app.get('/text/', (req, res) => {
	res.json(db.text)
});

app.get('/users/', (req, res) => {
	res.json(db.users)
});

app.get('/users/:id', (req, res) => {
	const foundUser = db.users.find(c => c.id === +req.params.id)
	if (!foundUser) {
		res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
		return;
	}
	res.json(foundUser)
});

app.post('/users', (req, res) => {
	if (!req.body.name) {
		res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
		return;
	}
	const createdUser = {
		id: +(new Date()),
		name: req.body.name
	}
	db.users.push(createdUser)
	res
		.status(HTTP_STATUSES.CREATED_201)
		.json(createdUser)
})

app.put('/users/:id', (req, res) => {
	if (!req.body.time) {
		res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
		return;
	}
	const foundUser = db.users.find(c => c.id === +req.params.id)
	if (!foundUser) {
		res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
		return;
	}
	foundUser.time = req.body.time;
	res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
});

app.listen(PORT, () => {
	console.log(`Server has been started on port ${PORT}`)
})



