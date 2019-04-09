const express = require('express');
const vehiclesHandler = require('../controllers/vehicles/vehiclesHandler');

const router = express.Router();
const handler = vehiclesHandler.createHandler();

// // GET handler
// router.get('/vehicles', (req, res) => {
//
//     res.send('Hello, world');
// });

//POST handler
router.post('/vehicles', (req, res) => {
    if(!req.body) return res.sendStatus(400);
    handler.handlePost(req.body)
        .then(result => res.status(201).send({"status": "created", "document": result}))
        .catch(err => {
            console.log(err);
            console.error(err.stack);
            res.status(500).send('oops something went wrong on the server!')
        });
    // let result = .then(res =>  res.ops).catch(err => err);
    // let resultPromise = async function (reqBody) {return await handler.handlePost(reqBody)};
    //
    // result = resultPromise(req.body)
    //     .then(res => res.ops)
    //     .catch(err => console.error(err));
    // console.log(result)
});

module.exports = router;