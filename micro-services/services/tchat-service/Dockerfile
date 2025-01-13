# Utiliser une image de Node.js officielle comme base
FROM node:16

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json (si présents) dans le conteneur
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install

# Copier tout le code source dans le conteneur
COPY . .

# Exposer le port 80 pour le service
EXPOSE 8082

CMD ["node", "server.js"]
