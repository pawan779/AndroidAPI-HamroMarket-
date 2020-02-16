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





// /*
//     it('Fail, sending empty name and password', (done) => {
//         request(app).post('/signup').send({
//             email:'raju@gmail.com',
//             fullname:'',
//             password:'',
//             phone:'1212121212',
//             address:'',
//             image:'',
//             dob:''
//             })
//             .then((res) => {
//                 expect(res.statusCode).to.equal(500)
//                 expect(res.body).to.contain.property('status', 'User validation failed: fullName: Path fullName is required.')
//                 done();
//             })
//             .catch((err) => done(err));
//     })*/

//     //-----------user-----------------------------------
//      it('Pass, Get user details', (done) => {
//             request(app).get('/users/')
//                 // .set('Authorization', token)
//                 .then((res) => {
//                     const body = res.body;
//                     // expect(body).to.contain.property('_id');
//                     expect(body).to.not.be.empty;
//                     done();
//                 })
//                 .catch((err) => done(err));
//         })

//      //-------------------------------feedback-----------------------
//          it('Pass', (done) => {
//         request(app).post('/feedback/addFeedback')
//         .send({
//             user:'sharmila@gmail.com',
//             comment:'nice service'           

//         })
//         .then((res) => {
//                  expect(res.statusCode).to.equal(200);
//                 feedbackId = res.body.id
//                 done();
//             })
//             .catch((err) => done(err));
//     })
//     //--------------------doctor-------------------------------
//     it('Pass', (done) => {
//         request(app).post('/doctor/addDoctor')
//         .send({
//             Drname:'sharmila@gmail.com',
//             Qualification:'sharmila',
//             DrType:'8765435678',
//             University:'Bardiya',
//             NMCNo:'9/9/2020',
//             DrImage:''            

//         })
//         .then((res) => {
//                  expect(res.statusCode).to.equal(200);
//                 doctorId = res.body.id
//                 done();
//             })
//             .catch((err) => done(err));
//     })

//        it('Pass, Get doctor details', (done) => {
//             request(app).get('/doctor/')
//                 // .set('Authorization', token)
//                 .then((res) => {
//                     const body = res.body;
//                     // expect(body).to.contain.property('_id');
//                     expect(body).to.not.be.empty;
//                     done();
//                 })
//                 .catch((err) => done(err));
//         })

//         it('Fail, get empty values', (done) => {
//             request(app).get('/doctor/')
//                 // .set('Authorization', 'dummytoken')
//                 .then((res) => {
//                     const body = res.body;
//                     expect(body).to.not.be.empty;
//                     done();
//                 })
//                 .catch((err) => done(err));
//         })

// //----------------contact-------------------------
// // it('Pass, fetch data to server', (done) => {
// //         request(app).post('/contact/addContact')
// //             .send({
// //                 Cemail: "p@gmail.com",
// //                 message: "contact me",
// //                 fullName:"Prachi"
// //             })
// //             .then((res) => {
// //                 expect(res.statusCode).to.equal(200);
// //                 contactId=res.body.id
// //                 done();
// //             })
// //             .catch((err) => done(err));
// //     })




//        it('Pass, Get contact details', (done) => {
//             request(app).get('/contact/')
//                 // .set('Authorization', token)
//                 .then((res) => {
//                     const body = res.body;
//                     // expect(body).to.contain.property('_id');
//                     expect(body).to.not.be.empty;
//                     done();
//                 })
//                 .catch((err) => done(err));
//         })    





//     // it('Fail, sending empty email and fullname', (done) => {
//     //     request(app).post('/contact/addContact').send({
//     //         Cemail:'',
//     //         message:'contactt', 
//     //         fullName:''
//     //         })
//     //         .then((res) => {
//     //             expect(res.statusCode)
//     //             done();
//     //         })
//     //         .catch((err) => done(err));
//     // })

// //-------------------treatment-------------------------------
  
//   it('Pass', (done) => {
//         request(app).post('/treatment/addTreatment')
//         .send({
//             treatmentName:'Braces',
//             treatmentImage:'hhg',
                       

//         })
//         .then((res) => {
//                  expect(res.statusCode);
//                 treatmentId = res.body.id
//                 done();
//             })
//             .catch((err) => done(err));
//     })

//        it('Pass, Get treatment details', (done) => {
//             request(app).get('/treatment/')
//                 // .set('Authorization', token)
//                 .then((res) => {
//                     const body = res.body;
//                     // expect(body).to.contain.property('_id');
//                     expect(body).to.not.be.empty;
//                     done();
//                 })
//                 .catch((err) => done(err));
//         })
//        //------------------------appointment-------------------------
//  it('Pass', (done) => {
//         request(app).post('/appointment/addAppointment')
//         .send({
//             name:'prachi',
//             date:'09/09/2020',
//              time:'12:00 PM',          
//             doctor:'Preethuja',
//             problem:'Cavity'
//         })
//         .then((res) => {
//                  expect(res.statusCode).to.equal(200);
//                 appointmentId = res.body.id
//                 done();
//             })
//             .catch((err) => done(err));
//     })

//        it('Pass, Get appointment details', (done) => {
//             request(app).get('/appointment/')
//                 // .set('Authorization', token)
//                 .then((res) => {
//                     const body = res.body;
//                     // expect(body).to.contain.property('_id');
//                     expect(body).to.not.be.empty;
//                     done();
//                 })
//                 .catch((err) => done(err));
//         })


  

//         /*it('OK, create new treatment and delete the same treatment', (done) => {
//             request(app).post('/treatment')
//                 .set('Authorization', token)
//                 .send({
//                     treatmentNamet: "treatment name about to delete",
                   
//                     treatmentImage: " image about to delete",
//                 })
//                 .then((res) => {
//                     let id = res.body._id
//                     request(app).delete('/treatment/' + id)
//                         .set('Authorization', token)
//                         .then((res) => {
//                             expect(res.statusCode).to.equal(500);
//                             //expect(res.body).to.contain.property('status', 'Location deleted successfully');
//                             done();
//                         })
//                         .catch((err) => done(err));
//                 })
//                 .catch((err) => done(err));
//         })*/