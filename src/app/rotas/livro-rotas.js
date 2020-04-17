const LivroControlador = require('../controladores/livro-controlador');
const Livro = require('../modelos/livro');
const livroControlador = new LivroControlador();

module.exports = (app) => {
    app.get(LivroControlador.rotas().lista, livroControlador.lista());

    app.route(LivroControlador.rotas().cadastro)
        .get(livroControlador.cadastro())
        .post(Livro.validacoes(), livroControlador.post())
        .put(Livro.validacoes(), livroControlador.put());

    app.get(LivroControlador.rotas().edicao, livroControlador.edicao());

    app.delete(LivroControlador.rotas().delecao, livroControlador.delete());
};