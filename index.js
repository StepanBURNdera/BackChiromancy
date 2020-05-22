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
    db.ref('zodiac/ru64/Sagittarius/europe_london/May').once('value')
        .then(snapshot => {
            let {commonHoroscope, loveHoroscope, healthHoroscope, personalHoroscope} = snapshot.val();
            let horoscopeArray = [commonHoroscope, loveHoroscope, healthHoroscope, personalHoroscope];
                let decodedArray = horoscopeArray.map(h => {
                    let processVar = Buffer.from(h, 'base64');
                    return processVar.toString('utf-8')
                });
            console.log(snapshot.val())
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
    let snapshot = await db.ref(`zodiac/ru64/${zodiac}/europe_london/${month}`).once('value');

    let {commonHoroscope, loveHoroscope, healthHoroscope, personalHoroscope} = snapshot.val();
    let horoscopeArray = [commonHoroscope, loveHoroscope, healthHoroscope, personalHoroscope];

    res.send(horoscopeArray.map(h => {
        let processVar = Buffer.from(h, 'base64');
        return processVar.toString('utf-8')
    }));
});

router.listen(port, () => {
    console.log('app ready on port: ' + port)
});
