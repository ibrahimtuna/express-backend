const express = require('express');
const router = express.Router();
const db = require('../database');

// POST Parametre alma
router.post('/urunEkle',function (req,res) {
    const kullanici = req.decode.id;
    const {urun_kodu,urun_adi,urun_resim,urun_aciklama,urun_fiyat,stok} = req.body;
    const sql = `INSERT INTO (urun_kodu,urun_adi,urun_resim,urun_aciklama,urun_fiyat,stok,kullanici) VALUES ("${urun_kodu}", "${urun_adi}", "${urun_resim}", "${urun_aciklama}", "${urun_fiyat}", "${stok}", "${kullanici}" );`
    db.query(sql,(error, results, fields) => {
        if (error) {
            res.json({status:false,message:error})
        } else {
            res.json({status:true,message:'Yeni ürün eklendi'})
        }
    })
})


module.exports = router;
