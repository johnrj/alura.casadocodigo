const db = require('../../config/database');
const LivroDao = require('../data/LivroDao');

module.exports = (app) => {
    app.get('/livros', (req, res) => {
        let livroDao = new LivroDao(db);
        livroDao.lista()
            .then(result => res.marko(require('../views/livros/lista/lista.marko'), {
                livros: result
            }))
            .catch(error => res.send(error));
    });
    app.get('/livros/form', function(req, res) {
        res.marko(require('../views/livros/form/form.marko'), { livro: {} });
    });
    app.get('/livros/forms/:id', (req, res) => {
        let livroDao = new LivroDao(db);
        livroDao.buscaporId(req.params.id)
            .then(livro => res.marko(require('../views/livros/lista/lista.marko'), {
                livros: [livro]
            }))
            .catch(error => res.send(error));
    });
    app.post('/livros', function(req, res) {
        let livroDao = new LivroDao(db);
        livroDao.adiciona(req.body)
            .then(res.redirect('/livros'))
            .catch(error => res.send(error));
    });
    app.put('/livros', function(req, res) {
        let livroDao = new LivroDao(db);
        console.log(JSON.stringify(req.body));
        livroDao.atualiza(req.body)
            .then(res.redirect('/livros'))
            .catch(error => res.send(error));
    });
    app.delete('/livros/:id', (req, res) => {
        let livroDao = new LivroDao(db);
        livroDao.remove(req.params.id)
            .then(res.redirect('/livros'))
            .catch(error => res.send(error));
    });
};