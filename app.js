//modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const Blog = require('./models/blogs');
const blogRoutes = require('./routes/blogRoutes');

// connect to mongodb
const dbURI = 'mongodb+srv://harriet_atis:SpongeBob101@cluster1.xxjcct2.mongodb.net/blogs-start';
mongoose.connect(dbURI)
    .then((result) => {
        app.listen(3000);
    })
    .catch((err) => console.log(err));
   
// view engine
app.set('view engine', 'ejs');

//middleware
app.use(express.static('public'));
app.use(express.urlencoded( { extended:true }));
app.use(morgan('dev'));

//routes
app.get('/',(req,res) => {
    res.redirect('/blogs');
})

app.get('/about',(req,res) => {
    res.render('about',{ title: 'about' });
})

// blog routes
app.use('/blogs',blogRoutes);


// use middleware more the 404
app.use('/404',(req,res) => {
    res.status(404).render('404',{ title: 'error'} );
})


