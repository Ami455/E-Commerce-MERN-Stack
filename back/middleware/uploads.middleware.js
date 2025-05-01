const fs = require('fs');
const path = require('path');

const uploadsDirectory = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadsDirectory)) {
    fs.mkdirSync(uploadsDirectory);
}


const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

const upload = multer({ storage });

module.exports = upload;







// const multer =require ('multer')

// const storage=multer.diskStorage({
//  destination:(req,file,cb)=>cb(null,"uploads"),
//  filename:(req,file,cb)=>cb(null,`${Date.now()}-${file.originalname}`)
//  }

// )

// module.exports=multer({storage})