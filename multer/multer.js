const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    // fileFilter: (req, file, cb) => {
    //     if (
    //         file.mimetype === "image/jpg" ||
    //         file.mimetype === "image/jpeg" ||
    //         file.mimetype === "image/png"
    //     ) {
    //         cb(null, true);
    //     } else {
    //         cb(new Error("only jpg,jpeg and png are alowed."))
    //     }
    // }
    fileFilter: (req, file, cb) => {
        cb(null, true)
    }
})

// export upload
module.exports = upload