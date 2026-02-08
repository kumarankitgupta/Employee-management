const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwtSecret = 'er66374746jwtsecret';

app.use(express.json());
app.use(cors({
    origin: '*',
}));

const users = require('./users.json').users;
const fs = require('fs');

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const splitToken = token.split(' ')[1];
    try{
    jwt.verify(splitToken, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = decoded;
        next();
    });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Unauthorized' });x
    }

}

app.post('/register', verifyToken , (req, res) => {
    const { username, email, password, role } = req.body;
    const user = users.find((user) => (user.email === email && user.username === username));
    if (user) {
        return res.status(400).json({ message: 'User already exists' });
    }
    users.push({ username, email, password, role, id: users.length + 1 , registered_by : req.user.id });
    fs.writeFileSync('./users.json', JSON.stringify({ users: users }, null, 2));
    console.log(users);
    res.status(201).json({ message: 'User registered successfully' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // find the user in the users array
    const user = users.find((user) => (user.username === username && user.password === password));

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign((
        { id: user.id, username: user.username, role: user.role }
    ), jwtSecret, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful' , token , username : user.username, role : user.role , id : user.id  , email : user.email});
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});