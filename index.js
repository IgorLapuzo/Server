const express = require('express');
const app = express();
const PORT = 3003;


app.get('/', (req, res) => {
	res.send('server is working')
})
1
app.get('/text', (req, res) => {
	res.send('Text')
})

app.post('/user', (req, res) => {
	res.send('User has been created')
})

app.listen(PORT, () => {
	console.log(`Server has been started on port ${PORT}`)
})

