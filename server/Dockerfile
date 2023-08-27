# Use uma imagem base do Node.js 14
FROM node:14

# Diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiar o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o resto dos arquivos do projeto
COPY . .

# Porta que o aplicativo vai expor
EXPOSE 8000

# Comando para iniciar o aplicativo
CMD ["node", "index.js"]
