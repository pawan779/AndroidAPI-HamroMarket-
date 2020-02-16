const dotenv = require('dotenv');
dotenv.config;
const path = require("path");
const app = require('../index.js')
const request = require('supertest');
const expect = require('chai').expect;
const conn = require('../TestFolder/dbtest');
process.env.SECONDHANDSHOP = 'test';

let token ='';
let admin="";
 let id ='';
 let productId="";
 

describe('Testing API all routes', () => {
    before(function(done) {
        this.timeout(150000)
        conn.connect()
            .then(() => done())
            .catch((err) => done(err));
    });
    after((done) => {
        conn.close()
            .then(() => done())
            .catch((err) => done(err));
    });

});


it('Pass, register user', (done) => {
    request(app).post('/users/register')
    .send({
        fullName:"pawan",
        email:'pa1@gmail.com',
        phone:"1234567890",
        mobilePhone:"9087654321",
        address1:"ktm1",
        address2:"ktm2",
        address3:"ktm3",
        password:'pawan123',
        image: "imageFile-1581604966138.jpg"          

    })
        .then((res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.contain.property('token');
            console.log(token);
            done();

        })
        .catch((err) => done(err));
})


    it('Pass, user login and get token', (done) => {
        request(app).post('/users/login')
        .send({
            email:'pawan@gmail.com',
            password:'pawan123'           

        })
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.contain.property('token');
                token=`Bearer ${res.body.token}`;
                console.log(token);
        
              
                done();

            })
            .catch((err) => done(err));
    })


    it('Pass, admin login and get token', (done) => {
        request(app).post('/users/login')
        .send({
            email:'admin@admin.com',
            password:'pawan123'           

        })
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.contain.property('token');
                admin=`Bearer ${res.body.token}`;
                console.log(token);
                done();

            })
            .catch((err) => done(err));
    })


    it('Pass, get loggedin users details',(done)=>{
        request(app).get('/users/me')
        .set('Authorization',token)
        .then((res)=>{
            expect(res.statusCode).to.equal(200);
            done();
        })
    })
    
    
    it('Pass, get loggedin users  product',(done)=>{
        request(app).get('/products/my')
        .set('Authorization',token)
        .then((res)=>{
            expect(res.statusCode).to.equal(200);
            done();
        })
    })


it('Pass, sending product details',(done)=>{
    request(app).post('/products')
    .set('Authorization',token)
    .send({
        productName:"apple",
        productPrice:"2000",
        productCondition:"new",
        productDescription:"this is an apple",
        image:"imageFile-1581604966138.jpg",
        quantity:1,
        category:"5e4137bebe230b29b7cfefce"
    })
    .then((res)=>{
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.contain.property('_id');
        productId=res.body._id
        done();
    })
})


it("Pass, update product details",(done)=>{
    request(app).put('/products/'+productId)
    .set('Authorization',token)
    .send({
        productName:"pinaple",
        productPrice:"3000",
        productCondition:"old",
        productDescription:"this is a pinnaple",
        image:"imageFile-1581604966138.jpg",
        quantity:5,
        category:"5e4137bebe230b29b7cfefce"
    })
    .then((res)=>{
        expect(res.statusCode).to.equal(200);
        done();
    })
    .catch((err)=>done(err))
});

it("Pass, delete product",(done)=>{
    request(app).delete('/products/'+productId)
    .set('Authorization',token)
    
    .then((res)=>{
        expect(res.statusCode).to.equal(200);
        done();
    })
    .catch((err)=>done(err))
});




it('Fail, unauthorized user canot post product details',(done)=>{
    request(app).post('/products')
    .send({
        productName:"apple",
        productPrice:"2000",
        productCondition:"new",
        productDescription:"this is an apple",
        image:"imageFile-1581604966138.jpg",
        quantity:1,
        category:"5e4137bebe230b29b7cfefce"
    })
    .then((res)=>{
        expect(res.statusCode).to.equal(500);
        done();
    })
})



it('Fail, loggedin user cannot add category name',(done)=>{
    request(app).post('/category')
    .set('Authorization',token)
    .send({
        name:"apple"
    })
    .then((res)=>{
        expect(res.statusCode).to.equal(500);
        done();
    })
})


it('Pass, admin can add category name',(done)=>{
    request(app).post('/category')
    .set('Authorization',admin)
    .send({
        name:"testing"
    })
    .then((res)=>{
        expect(res.statusCode).to.equal(200);
        done();
    })
})

it("Pass, admin can verify the product",(done)=>{
    request(app).put('/admin/product/'+productId)
    .set('Authorization',admin)
    .send({
        isVerified:true
    })
    .then((res)=>{
        expect(res.statusCode).to.equal(200);
        done();
    })
})



