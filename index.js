const express = require('express');

const app = express();

const multer = require('multer')
const { v4: uuidv4 } = require('uuid');

const cloudinary = require('cloudinary')
const fs = require('fs');


          
cloudinary.config({ 
  cloud_name: 'ds5n37mpn', 
  api_key: '787741183575772', 
  api_secret: 'D4EtSZ31Gc_RIl4V4bt2CRi5X1s' 
});




require('dotenv').config()
let PORT = process.env.PORT


require('./db/db.js')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload')
    },
    filename: function (req, file, cb) {
     
      cb(null, uuidv4()+' '+file.originalname )
    }
  })
  
  const upload = multer({ storage})

  // send the request

app.post('/filesend',upload.single('img'),(req,res)=>{

    console.log(req.file.path)

    // now upload the file in cloudinary
    cloudinary.v2.uploader.upload(req.file.path,
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result);

    // now unlink the file and deleted the file 
    fs.unlink(req.file.path,(err)=>{
        if(err) console.log(err)
        else console.log("File Deleted Successfully")
    })


});

    res.status(200).json({
        msg:"The File is Uploaded Successfully"
    })

})




app.listen(PORT,()=>{
    console.log(`This server is running on PORT ${PORT}`)
})