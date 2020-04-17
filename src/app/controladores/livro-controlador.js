const { validationResult } = require('express-validator/check');
const templates = require('../views/templates');

const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

class LivroControlador {
    static rotas() {
        return {
            autenticadas: '/livros*',
            lista: '/livros',
            cadastro: '/livros/form',
            edicao: '/livros/form/:id',
            delecao: '/livros/:id'
        }
    }

    lista() {
        return (req, res) => {
            const livroDao = new LivroDao(db);
            livroDao.lista()
                .then(livros => res.marko(
                    templates.livros.lista, {
                        livros: livros
                    }
                ))
                .catch(erro => console.log(erro));
        }
    }

    cadastro() {
        return (req, res) => {
            res.marko(templates.livros.form, { livro: {} });
        }
    }

    edicao() {
        return (req, res) => {
            const id = req.params.id;
            const livroDao = new LivroDao(db);

            livroDao.buscaPorId(id)
                .then(livro =>
                    res.marko(
                        templates.livros.form, { livro: livro }
                    )
                )
                .catch(erro => console.log(erro));
        }
    }

    post() {
        return (req, res) => {
            return this._validaForm(req, res, () => {
                const livroDao = new LivroDao(db);

                livroDao.adiciona(req.body)
                    .then(res.redirect(templates.livros.lista))
                    .catch(erro => console.log(erro));
            });
        }
    }

    put() {
        return (req, res) => {
            return this._validaForm(req, res, () => {
                const livroDao = new LivroDao(db);

                livroDao.atualiza(req.body)
                    .then(res.redirect(templates.livros.lista))
                    .catch(erro => console.log(erro));
            });
        }
    }

    delete() {
        return (req, resp) => {
            const id = req.params.id;

            const livroDao = new LivroDao(db);
            livroDao.remove(id)
                .then(() => resp.status(200).end())
                .catch(erro => console.log(erro));
        }
    }

    _validaForm(req, res, cb) {
        let erros = validationResult(req);

        if (!erros.isEmpty()) {
            return res.marko(
                templates.livros.form, {
                    livro: req.body,
                    errosValidacao: erros.array()
                }
            );
        }
        return cb();
    }
}

module.exports = LivroControlador;