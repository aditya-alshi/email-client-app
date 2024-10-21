const express = require('express');
const app = express();
const cors = require('cors')
const { emailList, emailBodies } = require('./data')

app.use(cors());

app.get('/', (req, res) => {
    const page = parseInt(req.query.page);
    const id = parseInt(req.query.id)
    if(id) {
        const emailBody = emailBodies.find(eb => eb.id === id)
        res.status(200).json(emailBody)
    }
    if(page === 1) {
        res.status(200).json({
            list: emailList.slice(0, 10)
        })
    } else if(page === 2) {
        res.status(200).json({
            list: emailList.slice(10)
        })
    }

})

app.listen(5000 , () => {
    console.log("listening at port : ", 5000);
})