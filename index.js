const express = require('express');

const app = express();

const port = 3000;

const students = [];
const mentors = [];

app.use(express.json());

// students routes

app.get('/', (req, res) => {
	res.send('<h1>Hello NodeJS</h1>');
});

app.get('/students', (req, res) => {
	res.json(students);
});

app.post('/students', (req, res) => {
	students.push({
		name: req.body.name,
		mentor_id: req.body.mentor_id,
		id: students.length + 1,
	});
	mentors.forEach((obj) => obj.students.push(req.body.name));
	res.json({ message: 'Record Created' });
});

app.get('/student/:id', (req, res) => {
	if (students[req.params.id - 1]) {
		res.json(students[req.params.id - 1]);
	} else {
		res.json({ message: 'No such record found' });
	}
});

app.put('/student/:id', (req, res) => {
	if (students[req.params.id - 1]) {
		students[req.params.id - 1].name = req.body.name;
		res.json({ message: 'Record updated' });
	} else {
		res.json({ message: 'No such record found' });
	}
});

app.delete('/student/:id', (req, res) => {
	let studentData = students.find((student) => student.id === req.params.id);
	let index = students.indexOf(studentData);
	students.splice(index, 1);
	res.json({ message: 'Record deleted' });
});

// mentors routs

app.get('/mentors', (req, res) => {
	res.json(mentors);
});

app.post('/mentors', (req, res) => {
	mentors.push({
		name: req.body.name,
		students: ['student-1'],
		id: mentors.length + 1,
	});
	res.json({ message: 'Record Created' });
});

app.get('/mentor/:id', (req, res) => {
	if (mentors[req.params.id - 1]) {
		res.json(mentors[req.params.id - 1]);
	} else {
		res.json({ message: 'No such record found' });
	}
});

app.put('/mentor/:id', (req, res) => {
	if (mentors[req.params.id - 1]) {
		mentors[req.params.id - 1].name = req.body.name;
		res.json({ message: 'Record updated' });
	} else {
		res.json({ message: 'No such record found' });
	}
});

app.delete('/mentor/:id', (req, res) => {
	let studentData = mentors.find((mentor) => mentor.id === req.params.id);
	let index = mentors.indexOf(studentData);
	mentors.splice(index, 1);
	res.json({ message: 'Record deleted' });
});

// student-mentor

app.listen(port, () => console.log(`server started on port : ${port}`));
