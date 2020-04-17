const { check } = require('express-validator/check');

class Livro {
    static validacoes() {
        return [
            check('titulo').isLength({ min: 5 }).withMessage('O Título precisa ter no mínimo 5 caracteres.'),
            check('preco').isCurrency().withMessage('O Preço precisa ser um valor monetário válido.')
        ];
    }
}

module.exports = Livro;