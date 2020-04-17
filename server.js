const app = require('./src/config/custom-express');
const rotas = require('./src/app/routes/routes');

rotas(app);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});