const express = require('express');
const router = express.Router();

const {
    createTodo,
    getTodo,
    getTodoId,
    updateTodo,
    deleteTodo,
    findByIdTodo,
    updateManyTodo,
    Udbfindupdate,
    UdbFindIdAndUpd
} = require('../Controller/todoContl');

router.post('/createTodo', createTodo);
router.get('/getTodo', getTodo);
router.get('/getTodoId', getTodoId);
router.get('/findByIdTodo', findByIdTodo);
router.put('/updateTodo', updateTodo);
router.put('/updateManyTodo', updateManyTodo);
router.put('/Udbfindupdate', Udbfindupdate);
router.put('/UdbFindIdAndUpd', UdbFindIdAndUpd);
router.delete('/deleteTodo', deleteTodo);

module.exports = router;
