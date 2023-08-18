const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;

const data = [{img:"https://www.havahart.com/media/wysiwyg/hh/cms/lc/mice/hh-animals-mouse-1.png",title:'mouse',des:'this mouse is very usefull you can use this to hover through the browser'},
    {img:"https://www.havahart.com/media/wysiwyg/hh/cms/lc/mice/hh-animals-mouse-1.png",title:'mouse',des:'this mouse is very usefull you can use this to hover through the browser'},
    {img:"https://www.havahart.com/media/wysiwyg/hh/cms/lc/mice/hh-animals-mouse-1.png",title:'mouse',des:'this mouse is very usefull you can use this to hover through the browser'},
    {img:"https://www.havahart.com/media/wysiwyg/hh/cms/lc/mice/hh-animals-mouse-1.png",title:'mouse',des:'this mouse is very usefull you can use this to hover through the browser'},
    {img:"https://www.havahart.com/media/wysiwyg/hh/cms/lc/mice/hh-animals-mouse-1.png",title:'mouse',des:'this mouse is very usefull you can use this to hover through the browser'},
    {img:"https://www.havahart.com/media/wysiwyg/hh/cms/lc/mice/hh-animals-mouse-1.png",title:'mouse',des:'this mouse is very usefull you can use this to hover through the browser'},
    {img:"https://www.havahart.com/media/wysiwyg/hh/cms/lc/mice/hh-animals-mouse-1.png",title:'mouse',des:'this mouse is very usefull you can use this to hover through the browser'}];

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('views'));

// Initialize session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 60 * 1000 // Set the cookie to expire in 1 hour
    }
}));


// Simulated user data 
const users = [
    { username: 'user', password: 'pass' },
    { username: 'user2', password: 'pass2' }
];


function authenticate(req, res, next) {
    if (req.session.user) {
        next(); // User is authenticated, continue to the next middleware or route
    } else {
        res.render('login', { errorMessage: '' });
    }
}

//Disable caching
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        req.session.user = user;
        console.log(req);
        console.log(username+" logged in");
        res.redirect('/home');
    } else {
        res.redirect('/wrong')
        // Pass an error message to the login view
    }
});
app.get('/wrong',(req,res)=>{
    if (req.session.user) {
        res.redirect('/home'); 
    } else {
        res.render('login', { errorMessage: 'Incorrect username or password' });
    }

})
app.get('/',authenticate,(req, res) => {
    
    res.render('home',{ data });
});

app.get('/home', authenticate,(req, res) => {
        res.render('home',{ data });
});

app.get('/logout',authenticate, (req, res) => {
    console.log(`${req.session.user.username} logged out`);
    req.session.destroy(); // Destroy session on logout
    res.redirect('/');
});
app.get('*', (req, res) => {
    res.status(404).send('404');
});
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

