const express = require("express")
const app = express()
const upload = require("./multer/multer")
const fs = require("fs")
const path = require("path")
const cors = require("cors")

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('uploads'));

// routes
// upload File
app.post("/upload", upload.single("file"), async (req, res,) => {
    try {
        res.status(200).json({
            message: "file upload successfully",
            status: true,
            ...req.file
        })
    } catch (error) {
        res.status(404).json({
            message: error.message,
            status: false
        })
    }
})

// update fle
app.put("/upload/:oldFileName", upload.single("file"), async (req, res,) => {
    try {
        const oldPhotoWithPath = path.join(__dirname, "uploads", req.params.oldFileName);

        if (!fs.existsSync(oldPhotoWithPath)) {
            return res.status(404).json({
                message: "file does not exist",
                status: false
            })
        };

        fs.unlink(oldPhotoWithPath, (err) => {
            if (err) {
                console.log("Culd not delete photos")
                return res.status(404).json({
                    message: "file could not deleted",
                    status: false
                })
            }
        });

        console.log("deleted");
        res.status(200).json({
            message: "file upload successfully",
            status: true,
            ...req.file
        })

    } catch (error) {
        res.status(404).json({
            message: error.message,
            status: false
        })
    }
})
// delete file
app.delete("/upload/:oldFileName", async (req, res,) => {
    try {
        const oldPhotoWithPath = path.join(__dirname, "uploads", req.params.oldFileName);

        if (!fs.existsSync(oldPhotoWithPath)) {
            return res.status(404).json({
                message: "file does not exist",
                status: false
            })
        };

        fs.unlink(oldPhotoWithPath, (err) => {
            if (err) {
                console.log("Culd not delete photos")
                throw new Error("Culd not delete file")
            } else {

            }
        });

        res.status(200).json({
            message: "file deleted successfully",
            status: true
        })

    } catch (error) {
        res.status(404).json({
            message: error.message,
            status: false
        })
    }
})

// errors handler
// no route exist error
app.use((req, res, next) => {
    res.status(404).json({
        status: false,
        error: "Route not found",
    })
})
// global error handler
app.use((req, res, next, err) => {
    res.status(404).json({
        status: false,
        error: err.message
    })
});

// port number
const PORT = process.env.PORT || 5000;
// app host port
app.listen(PORT, () => { console.log("server is running at port : " + PORT) });