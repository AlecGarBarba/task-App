const multer = require('multer');

const upload = multer({
    //dest: 'avatars', //if uncommented, it goes straight into folder. if not, we can access it at the route that  handles this middleware
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true) //si funcionó, con False significa que no se guarda.
    }
})

module.exports=upload;