// server.js - exemplo de servidor Node.js para teste do PR Analyzer

const http = require('http');
const PORT = 3000;

// Simulação de banco de dados em memória
let users = [{ id: 1, name: "Alice" }];

function requestHandler(req, res) {
    if(req.url == "/" && req.method === "GET") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("<h1>Olá, este é um teste de PR Analyzer!</h1>");
        res.end();

    } else if(req.url == "/error" && req.method === "GET") {
        // Exemplo de potencial bug
        let a;
        try {
            res.end(a.toString()); // Isto pode gerar erro
        } catch (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end("Erro interno: " + err.message);
        }

    } else if(req.url == "/users" && req.method === "GET") {
        // Retorna lista de usuários
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(users));

    } else if(req.url.startsWith("/users") && req.method === "POST") {
        // Exemplo de rota que altera dados
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            try {
                const user = JSON.parse(body);
                users.push(user);
                res.writeHead(201, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(user));
            } catch (err) {
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.end("Erro no request: " + err.message);
            }
        });

    } else if(req.url == "/slow" && req.method === "GET") {
        // Exemplo de rota com possível problema de performance
        setTimeout(() => {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end("Resposta lenta simulada");
        }, 5000);

    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end("Página não encontrada");
    }
}

// Criação do servidor
const server = http.createServer(requestHandler);

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
