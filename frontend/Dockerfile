# Use a imagem Node.js como base
FROM node:latest

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos do projeto para o diretório de trabalho
COPY . .

# Instale as dependências
RUN npm install

# Exponha a porta onde o aplicativo estará em execução
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "run", "dev"]