const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const fs = require('fs')

chai.use(chaiHttp);

describe('API ENDPOINT TESTING', () => {
    it('GET Landing Page', (done) => {
        chai.request(app).get('/api/v1/member/landing-page').end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('hero')
            expect(res.body.hero).to.have.all.keys('travelers', 'treasures', 'cities')
            expect(res.body).to.have.property('mostPicked')
            expect(res.body.mostPicked).to.have.an('array')
            expect(res.body).to.have.property('category')
            expect(res.body.category).to.have.an('array')
            expect(res.body).to.have.property('testimonial')
            expect(res.body.testimonial).to.have.an('object')
            done();
        })
    })
    it('GET Detail Page', (done) => {
        chai.request(app).get('/api/v1/member/detail-page/5e96cbe292b97300fc902223').end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.property('country')
            expect(res.body).to.property('isPopular')
            expect(res.body).to.property('unit')
            expect(res.body).to.property('sumBooking')
            expect(res.body).to.property('imageId')
            expect(res.body.imageId).to.an('array')
            expect(res.body).to.property('featureId')
            expect(res.body.featureId).to.an('array')
            expect(res.body).to.property('activityId')
            expect(res.body.activityId).to.an('array')
            expect(res.body).to.property('_id')
            expect(res.body).to.property('title')
            expect(res.body).to.property('price')
            expect(res.body).to.property('city')
            expect(res.body).to.property('description')
            expect(res.body).to.property('__v')
            expect(res.body).to.property('bank')
            expect(res.body.bank).to.an('array')
            expect(res.body).to.have.property('testimonial')
            expect(res.body.testimonial).to.have.an('object')
            done();
        })
    })
it('POST Booking Page', (done) => {
    const image = __dirname + '/buktibayar.jpeg';
    const dataSample = {
      image,
      idItem: '5e96cbe292b97300fc902223',
      duration: 5,
      bookingStartDate: '1-7-2023',
      bookingEndDate: '6-7-2023',
      firstName: 'Amalia Yuli',
      lastName: 'Nur Intan',
      email: 'amalia@gmail.com',
      phoneNumber: '083897933916',
      accountHolder: 'Amalia',
      bankFrom: 'BCA',
    }
    chai.request(app).post('/api/v1/member/booking-page')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field('idItem', dataSample.idItem)
      .field('duration', dataSample.duration)
      .field('bookingStartDate', dataSample.bookingStartDate)
      .field('bookingEndDate', dataSample.bookingEndDate)
      .field('firstName', dataSample.firstName)
      .field('lastName', dataSample.lastName)
      .field('email', dataSample.email)
      .field('phoneNumber', dataSample.phoneNumber)
      .field('accountHolder', dataSample.accountHolder)
      .field('bankFrom', dataSample.bankFrom)
      .attach('image', fs.readFileSync(dataSample.image), 'buktibayar.jpeg')
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(201)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.equal('Success Booking')
        expect(res.body).to.have.property('booking')
        expect(res.body.booking).to.have.all.keys('payments', '_id', 'invoice', 'bookingStartDate', 'bookingEndDate', 'total', 'itemId', 'memberId', '__v')
        expect(res.body.booking.payments).to.have.all.keys('status', 'proofPayment', 'bankFrom', 'accountHolder')
        expect(res.body.booking.itemId).to.have.all.keys('_id', 'title', 'price', 'duration')
        done();
      })
  })
})