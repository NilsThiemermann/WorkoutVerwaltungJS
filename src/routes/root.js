const express = require('express');
const router = express.Router();
const path = require('path');

/*
^ = begin with /
$ = end with /
| = or smth else
(...)? = means optional 
*/
router.get('^/$|/index(.html)?', (req, res) =>{
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})