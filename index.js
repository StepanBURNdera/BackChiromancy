const express = require('express');
const firebase = require('firebase');
const cors = require('cors');

const router = express();
const port = process.env.PORT;

router.use(cors());


const firebaseConfig = {
    apiKey: "AIzaSyDjbTP_gBKvb23HMTLBUqtFYljzB1Hr68c",
    authDomain: "oriontranslated.firebaseapp.com",
    databaseURL: "https://oriontranslated.firebaseio.com",
    projectId: "oriontranslated",
    storageBucket: "oriontranslated.appspot.com",
    messagingSenderId: "984171853857",
    appId: "1:984171853857:web:3e9f683437feb2f1624b60"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

try {
    db.ref('compatibility/ru64/Aries/Aries').once('value')
        .then(snapshot => {
            let res = snapshot.val();

            console.log({
                ...res,
                body: Buffer.from(res.body, 'base64').toString(),
                unionName: Buffer.from(res.unionName, 'base64').toString(),
            })
        })
        .catch(err => console.log(err))
}
catch (e) {
    console.log(e)
}

router.get('/daily', async (req, res) => {
    let zodiac = req.query.zodiac;
    let snapshot = await db.ref(`zodiac/ru64/${zodiac}/europe_london/daily/`).once('value');

    let {commonHoroscope, loveHoroscope, healthHoroscope, personalHoroscope} = snapshot.val();
    let horoscopeArray = [commonHoroscope, loveHoroscope, healthHoroscope, personalHoroscope];

    res.send(horoscopeArray.map(h => {
        let processVar = Buffer.from(h, 'base64');
        return processVar.toString('utf-8')
    }))
});
router.get('/week', async (req,res) => {
    let zodiac = req.query.zodiac;
    let snapshot = await db.ref(`zodiac/ru64/${zodiac}/europe_london/week`).once('value');

    let {commonHoroscope, loveHoroscope, healthHoroscope, personalHoroscope} = snapshot.val();
    let horoscopeArray = [commonHoroscope, loveHoroscope, healthHoroscope, personalHoroscope];

    res.send(horoscopeArray.map(h => {
        let processVar = Buffer.from(h, 'base64');
        return processVar.toString('utf-8')
    }))
});
router.get('/month', async (req, res) => {
    let zodiac = req.query.zodiac;
    let month = req.query.month;
    let snapshot = await db.ref(`zodiac/ru64/${zodiac}/europe_london/May`).once('value');

    let {commonHoroscope, loveHoroscope, healthHoroscope, personalHoroscope} = snapshot.val();
    let horoscopeArray = [commonHoroscope, loveHoroscope, healthHoroscope, personalHoroscope];

    res.send(horoscopeArray.map(h => {
        let processVar = Buffer.from(h, 'base64');
        return processVar.toString('utf-8')
    }));
});
router.get('/palmistry', async (req, res) => {
    let snapshot = await db.ref('chiromancer/text/ru64').once('value');
    res.send(snapshot.val())
});
router.get('/compatibility', async (req, res) => {
    let zodiac_first = req.query.zodiac_first;
    let zodiac_second = req.query.zodiac_second;
    let snapshot = await db.ref(`compatibility/ru64/${zodiac_first}/${zodiac_second}`);

    res.send({
        ...snapshot.val(),
        body: Buffer.from(snapshot.val().body, 'base64').toString(),
        unionName: Buffer.from(snapshot.val().unionName, 'base64').toString(),
    })
});

router.listen(port, () => {
    console.log('app ready on port: ' + port)
});
