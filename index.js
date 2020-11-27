const express = require('express');
const bp = require('body-parser');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bp.urlencoded({ extended: true }))

app.use(bp.json())

const patients = [{
    name: 'Brandon Rodgers',
    email: 'brandon@lfc.com',
    time: '20:59',
    phone: '9654675689',
    doctors: 'Dr.Naveen',
    problems: 'Body Checkup'
}]


const doctors = [{
        name: 'Dr.Patnayak',
        specality: 'Heart specialist',
        avaiHour: '10AM-3PM',
        fee: '5000'
    },
    {
        name: 'Dr.Naveen',
        specality: 'Childcare specialist',
        avaiHour: '6PM-12AM',
        fee: '3000'
    },
    {
        name: 'Dr.Kamala',
        specality: 'General practisioner',
        avaiHour: '9AM-6PM',
        fee: '2000'
    }
]


let logged = false;
let invalid = false;
let user = '';


app.get('/book', (req, res) => {
    res.render('book', {
        user,
        logged
    })
})


app.get('/doctorlist', (req, res) => {
    res.render('doctorList', {
        doctors,
        user,
        logged
    })
})

app.get('/patientsList', (req, res) => {
    res.render('patientsList', {
        patients,
        user,
        logged
    })
})


app.post('/logout', (req, res) => {
    logged = false;
    invalid = false;
    res.redirect('/');
})

app.post('/book', (req, res) => {
    console.log(req.body);
    const { name, email, time, phone, doctors, problems } = req.body;
    const patient = { name, email, time, phone, doctors, problems }
    patients.push(patient);
    res.redirect('/patientsList');
})

app.post('/', (req, res) => {
    user = req.body.name;
    if (req.body.password == '12345') {
        logged = true
    } else {
        invalid = true

    }


    res.redirect('/');
})



app.get('/', (req, res) => {
    res.render('home', {
        logged,
        invalid
    });
})

app.listen(8080, (console.log('server started')))