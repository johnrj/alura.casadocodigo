const LivroControlador = require('../controladores/livro-controlador');
const Livro = require('../modelos/livro');
const livroControlador = new LivroControlador();
const BaseControlador = require('../controladores/base-controlador');

module.exports = (app) => {
    const rotasLivro = LivroControlador.rotas();

    app.use(rotasLivro.autenticadas, function(req, resp, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            resp.redirect(BaseControlador.rotas().login);
        }
    });

    app.get(rotasLivro.lista, livroControlador.lista());

    app.route(rotasLivro.cadastro)
        .get(livroControlador.cadastro())
        .post(Livro.validacoes(), livroControlador.post())
        .put(Livro.validacoes(), livroControlador.put());

    app.get(rotasLivro.edicao, livroControlador.edicao());

    app.delete(rotasLivro.delecao, livroControlador.delete());
};