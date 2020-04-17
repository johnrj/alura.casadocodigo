class LivroDao {
    constructor(db) {
        this._db = db;
    }

    lista() {
        return new Promise((res, rej) => {
            this._db.all('select * from livros',
                (error, result) => {
                    if (error) {
                        return rej('Erro ao aobter livros.');
                    }
                    return res(result);
                });
        });
    }

    adiciona(livro) {
        return new Promise((res, rej) => {
            this._db.run(`INSERT INTO LIVROS (titulo,preco,descricao) values (?, ?, ?)`, [
                livro.titulo,
                livro.preco,
                livro.descricao
            ], error => {
                if (error) {
                    console.log(error);
                    return rej('Erro ao inserir livro.');
                }
                return res();
            })
        });
    }

    buscaporId(id) {
        return new Promise((res, rej) => {
            this._db.get(`select * from livros where id = ?`, [id],
                (error, livro) => {
                    if (error) {
                        console.log(error);
                        return rej('Erro ao buscar o livro.');
                    }
                    return res(livro);
                });
        });
    }

    atualiza(livro) {
        return new Promise((res, rej) => {
            console.log(livro);
            this._db.run(`update livros set titulo = ?, preco = ?, descricao = ? where id = ?`, [
                    livro.titulo,
                    livro.preco,
                    livro.descricao,
                    livro.id
                ],
                error => {
                    if (error) {
                        console.log(error);
                        return rej('Erro ao atualizar o livro.');
                    }
                    console.log('atualizou');
                    return res();
                });
        });
    }

    remove(id) {
        return new Promise((res, rej) => {
            this._db.run(`delete from livros where id = ?`, [id],
                error => {
                    if (error) {
                        console.log(error);
                        return rej('Erro ao apagar o livro.');
                    }
                    return res();
                });
        });
    }
}

module.exports = LivroDao;