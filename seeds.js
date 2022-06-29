const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log("Mongo connection open!!!")
    })
    .catch((err) => {
      console.log("Oh No Error!!!")
      console.log(err)
    });

const seedProducts =[
    {
        name:'Fairy Eggplant',
        price: 1.00,
        catagory:'vegetable'
    },
    {
        name:'Organic Goddess Melon',
        price: 4.99,
        catagory:'fruit'
    },
    {
        name:'Organic Mini Seedless Watermelon',
        price: 3.99,
        catagory:'fruit'
    },
    {
        name:'Organic Celery',
        price: 1.50,
        catagory:'vegetable'
    },
    {
        name:'Choclate Whole Milk',
        price: 2.69,
        catagory:'dairy'
    },


]
Product.insertMany(seedProducts)
.then((res) => {
    console.log(res)
}).catch((e) => {
    console.log(e)
});