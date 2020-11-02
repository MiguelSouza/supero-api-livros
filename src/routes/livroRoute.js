const express = require('express');
const router = express.Router();
const controller = require('../controllers/livroController')

router.post('/livros', controller.salvarLivro);

router.get('/livros/:id', controller.listLivros);

router.get('/livros', controller.listLivros);

router.put('/livros/:id', controller.editarLivro);

router.delete('/livros/:id', controller.deletarLivro);

module.exports = router;