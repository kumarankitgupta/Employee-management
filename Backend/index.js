const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwtSecret = 'er66374746jwtsecret';

app.use(express.json());
app.use(cors({
    origin: '*',
}));

app.get('/', (req,res)=>{
    return res.status(200).send('Welcome to the Employee Management System');
})

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
    const registered_by_role = req.user.role;

    const { username, email, password, role } = req.body;

    if(registered_by_role === 'emp'){
        return res.status(400).json({ message: 'You are not authorized to register a user' });
    }

    if(registered_by_role === 'admin' &&( role === 'superadmin' || role === 'admin')){
        return res.status(400).json({ message: `You are not authorized to register a ${role}` });
    }

    const user = users.find((user) => (user.email === email && user.username === username));
    if (user) {
        return res.status(400).json({ message: 'User already exists' });
    }
    users.push({ username, email, password, role, id: users.length + 1 , registered_by : req.user.id , is_active : true });
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

    if(!user.is_active){
        return res.status(401).json({ message: 'User is deactivated' });
    }

    const token = jwt.sign((
        { id: user.id, username: user.username, role: user.role }
    ), jwtSecret, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful' , token , username : user.username, role : user.role , id : user.id  , email : user.email});
});


app.get('/users', verifyToken , (req, res) => {
    const  user_id = req.user.id;
    const user_role = req.user.role;
    let response = null;

    if(user_role === 'superadmin'){
        response = users.map((user) =>{
            return {
                id: user.id,
                username : user.username,
                email : user.email,
                role : user.role,
                registered_by: users.find((u) => u.id === user.registered_by).username,
                is_active: user.is_active
            }
        })
    }

    if(user_role === 'admin'){
        response = users.filter((user) => user.registered_by === user_id).
        map((user) =>{
            return {
                id: user.id,
                username : user.username,
                email : user.email,
                role : user.role,
                registered_by: users.find((u) => u.id === user.registered_by).username,
                is_active: user.is_active
            }
        });
    }

    return res.status(200).json({ data : response || [] });
})


app.put('/deactivate-employee', verifyToken , (req,res)=>{
    const { user_id } = req.body;
    const current_user_role = req.user.role;
    const user_to_deactivate = users.find((user) => user.id === user_id);
    
    if(current_user_role === 'admin' && user_to_deactivate.role == "superadmin"){
        return res.status(400).json({ message: 'You are not authorized to deactivate a superadmin' });
    }

    if(current_user_role === 'admin' && user_to_deactivate.role == "admin"){
        return res.status(400).json({ message: 'You are not authorized to deactivate an admin' });
    }

    user_to_deactivate.is_active = false;
    fs.writeFileSync('./users.json', JSON.stringify({ users: users }, null, 2));
    return res.status(200).json({ message: 'Employee deactivated successfully' });
})

app.get('/get-employee-details', verifyToken , (req,res)=>{
    const user_id = parseInt(req.query.user_id);

    const user_details = users.find((user) => user.id === user_id);

    if(!user_details.is_active){
        return res.status(400).json({ message: 'Employee is deactivated' , is_active : false });
    }

    return res.status(200).json({ message: 'Employee details' , data : {
        id: user_details.id,
        username: user_details.username,
        email: user_details.email,
        role: user_details.role,
        registered_by: users.find((u) => u.id === user_details.registered_by).username,
        is_active: user_details.is_active
    } });

    
})

app.put('/update-user-details', verifyToken , (req,res)=>{
    const { user_id, username, email, role } = req.body;
    // find the user in the users array
    const user_details = users.find((user) => user.id === parseInt(user_id));

    // check if the user is deactivated
    if(!user_details.is_active){
        return res.status(400).json({ message: 'Employee is deactivated' , is_active : false });
    }

    user_details.username = username;
    user_details.email = email;
    user_details.role = role;
    fs.writeFileSync('./users.json', JSON.stringify({ users: users }, null, 2));

    return res.status(200).json({ message: 'User details updated successfully' });
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});