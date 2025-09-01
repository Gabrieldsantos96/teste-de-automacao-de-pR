// server.js - exemplo simples de servidor Node.js para teste do PR Analyzer

const http = require('http');

// Porta do servidor
const PORT = 3000;

// Função para lidar com requisições
function requestHandler(req, res) {
    if(req.url == "/") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("<h1>Olá, este é um teste de PR Analyzer!</h1>");
        res.end();
    } else if(req.url == "/error") {
        // Exemplo de potencial bug
        let a;
        res.end(a.toString()); // Isto pode gerar erro
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end("Página não encontrada");
    }
}

// Criação do servidor
const server = http.createServer(requestHandler);

// Iniciando o servidor
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
