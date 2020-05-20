const express = require('express');
const firebase = require('firebase');

const router = express();

//router.use(bodyParser.json());

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
    db.ref('zodiac/ru64/Sagittarius/europe_london/daily').once('value')
        .then(snapshot => {
            let buff = Buffer.from(snapshot.val().commonHoroscope, 'base64');
            console.log(buff.toString('utf-8'))
        })
        .catch(err => console.log(err))
}
catch (e) {
    console.log(e)
}

router.get('/daily', async (req, res) => {
    let zodiac = req.params.zodiac;
    let snapshot = await db.ref(`zodiac/ru64/${zodiac}/europe_london/daily/`).once('value');
    res.send(snapshot)
});
router.get('/month', async (req, res) => {
    let month = req.query.month;
    let snapshot = await db.ref('zodiac/ru64/Saggittarius/europe_london/August')
});

router.listen(8000, () => {
    console.log('app ready')
});
