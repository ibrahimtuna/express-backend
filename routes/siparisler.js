const express = require('express');
const router = express.Router();
const db = require('../database');

/* GET home page. */
router.post('/', function(req, res) {
  const {urun_kodu} = req.body;
  const sql = `UPDATE urunler SET stok = stok-1 WHERE urun_kodu = "${urun_kodu}"`;
  db.query(sql, function (error, results, fields) {
    if (error) {
      res.json({status:false,message:error})
    };
    res.json({status:true,message: 'Sipariş Geçildi.'});
  });
});

module.exports = router;
