Como executar:
1- Abra um terminal na raiz do diretório 
2- Para iniciar o backend, execute o seguinte comando:
    docker-compose up backend

3- Para iniciar o frontend, execute o seguinte comando:
    docker-compose up frontend


Instruções de Execução
Este projeto consiste em uma aplicação com frontend e backend separados. Siga as instruções abaixo para executar cada parte da aplicação.
Backend
1- Navegue até o diretório backend:
    cd backend
2- Execute o seguinte comando no terminal para iniciar o servidor backend em modo de desenvolvimento:
    npm run dev
O servidor backend estará disponível em http://localhost:3333.

Frontend
1- Navegue até o diretório frontend:
    cd frontend
2- Execute o seguinte comando no terminal para iniciar o servidor de desenvolvimento para o frontend:
    npm run dev
O servidor frontend estará disponível em http://localhost:3000.


Agora você pode acessar a aplicação frontend em seu navegador através do endereço:
`http://localhost:3000` e interagir com o servidor backend que está sendo executado em `http://localhost:3333`.