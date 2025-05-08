
const multer=require('multer');
const path=require("path");
//Configure Images Storage

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../upload/images'),
    filename: function(req, file, cb) {
      cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
  });

const upload = multer({
    storage: storage,
  });

module.exports=upload;
