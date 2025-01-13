# utilise une image de Node.js
FROM node:16

# copie les fichiers nécessaires pour installer les dépendances
COPY package*.json ./

# installe les dépendances
RUN npm install

# copie tout le code source dans le conteneur
COPY . .

RUN npm run build

# expose le port sur lequel l'application sera servie
EXPOSE 3000

# serveur HTTP (comme nginx ou serve) pour servir les fichiers statiques
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "3000"]
