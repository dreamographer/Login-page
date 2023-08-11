const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('views'));

// Initialize session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Simulated user data (for demo purposes)
const users = [
    { username: 'user', password: 'pass' },
    { username: 'user2', password: 'password2' }
];

app.get('/',(req, res) => {
    if (req.session.user) {
        res.render('home');
    } else {
        res.render('login', { errorMessage: '' });
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Simulated login logic (for demo purposes)
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        req.session.user = user;
        res.redirect('/home');
    } else {
        // Pass an error message to the login view
        res.render('login', { errorMessage: 'Incorrect username or password' });
    }
});



app.get('/home', (req, res) => {
    if (req.session.user) {
        res.render('home');
    } else {
        res.redirect('/');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(); // Destroy session on logout
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
