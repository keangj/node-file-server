const express = require('express')
const multer = require('multer')
const cors = require('cors')
const path = require('path')
const upload = multer({dest: 'uploads/'})

const app = express()

app.get('/', cors(), (req, res, next) => {
    res.send('home')
})

app.options('/upload', cors())
app.post('/upload', cors(), upload.single('file'), (req, res, next) => {
    console.log(req.file)
    const { path, filename } = req.file
    let data = {
        path,
        filename
    }
    res.send(JSON.stringify(data))
})
app.get('/preview/:id', cors(), (req, res, next) => {
    res.sendFile(`uploads/${req.params.id}`, {
        root: __dirname,
        headers: {
            'Content-Type': 'image/jpeg'
        }
    }, (error) => {
        console.log(error);
    })
})
let port = process.env.PORT || 3000
app.listen(port)
