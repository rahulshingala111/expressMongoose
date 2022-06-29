const express = require('express');
const app = express();
const path = require('path');
const Product = require('./models/product');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(express.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log("Mongo connection open!!!")
    })
    .catch((err) => {
        console.log("Oh No Error!!!")
        console.log(err)
    });

app.get('/products/new', (req, res) => {
    res.render('products/new')
})
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body)
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})


app.get('/products', async (req, res) => {
    const products = await Product.find({})
    res.render('products/index', {
        products
    })
})
app.get('/products/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const product = await Product.findById(id)
    res.render('products/show', {
        product
    })
})


app.get('/products/:id/edit', async (req, res) => {
    const {
        id
    } = req.params;
    const product = await Product.findById(id)
    res.render('products/edit', {
        product
    })
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body,{runValidators: true,new : true})
    res.redirect(`/products/${product._id}`)
})

app.listen(8080, () => {
    console.log("App is listening on PORT 3000");
})