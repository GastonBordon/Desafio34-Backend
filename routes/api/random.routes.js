
const { fork } = require("child_process");
const express = require("express");
const { Router } = express;

const router = Router();


router.get("/", (req, res) => {
    const { url, method } = req;
    logger.info("Ruta %s  Metodo: %s", url, method);
    
//     let cant = 100000000
    
//     if (url != '/'){
//         cant = Number(req.query.cant)
//     }
    
//     const random = fork('./utils/randomNumbers.js')

//     random.send(cant)
//     random.on('message', randomNumbers =>{
//         res.send(randomNumbers)
//     }
// );
})



module.exports = router;
