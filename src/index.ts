import app from './app/app';

// Porta do servidor 
const PORT = process.env.PORT || 4000;
// Host do servidor
const HOSTNAME = process.env.HOSTNAME || 'http://localhost';
// Inicia o servidor
app.listen(PORT, () => {
    console.log(`⚡️[server]: Servidor rodando em ${HOSTNAME}:${PORT}`);
});