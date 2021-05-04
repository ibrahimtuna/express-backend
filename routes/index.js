const express = require('express');
const router = express.Router();
const db = require('../database');
const jwt = require('jsonwebtoken');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/urunler',(req,res) => {
  const sql = "SELECT * FROM urunler";
  db.query(sql, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
})


//Token oluşturma
router.post('/tokenOlustur',(req,res)=> {
  const {username,password} = req.body;
  if(username === "ibrahimtuna" && password === "123456") {
    const payload = {
      username,
      id : "1234"
    }
    const token = jwt.sign(payload,req.app.get('api_key'),{
      expiresIn: '365d'
    })
    res.json({
      status:true,
      token
    })
  } else {
    res.send({status:false,message:'Kullanıcı bilgileri hatalı'})
  }

})


module.exports = router;
