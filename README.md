<center><h1>🌐 Microservices Project</h1></center>
<p>Ce projet met en œuvre une architecture basée sur des microservices pour gérer l'authentification, les messages de chat et une passerelle API centralisée. Les services incluent une API d'authentification avec PHP, une API de gestion des discussions avec Node.js, et une API gateway pour connecter les deux. Les bases de données utilisent à la fois SQL et NoSQL pour stocker les données des utilisateurs et des messages.</p>

---

<h2>🚀 Installation</h2>
<p align="left">
    git clone <br>
    <code>cd microservices-project</code> <br>
    <code>composer install</code> (pour auth-service) <br>
    <code>npm install</code> (pour tchat-service et api-gateway) <br>
</p>

---

<h2>▶️ Lancement</h2>

<h3>🔒 Auth Service</h3>
<p align="left">
    Installation : <code>composer require firebase/php-jwt slim/slim vlucas/phpdotenv</code><br>
    Démarrage en local : <code>php -S localhost:8081 -t public</code>
</p>

<h3>💬 Tchat Service</h3>
<p align="left">
    Installation : <code>npm install</code><br>
    Lancement de MongoDB : <br>
    <code>brew services start mongodb/brew/mongodb-community</code><br>
    <code>mongosh --port 27017</code><br>
    Démarrage du service : <code>node server.js</code> sur le port 8082
</p>

<h3>🚪 API Gateway</h3>
<p align="left">
    Installation : <code>npm install express axios dotenv nodemon</code><br>
    Installation de bibliothèques supplémentaires : <code>npm install redis rate-limiter-flexible express-rate-limit ioredis</code><br>
    Démarrage en local : <code>nodemon server.js</code> sur le port 8080
</p>

<h3>💻 Frontend</h3>
<p align="left">
    Installation : <code>npm install</code><br>
    Démarrage en local : <code>npm run dev</code> sur le port 3000
</p>

---

<h2>🛠 Fonctionnalités</h2>
- Authentification sécurisée avec tokens (access et refresh).
- Gestion des messages avec discussions stockées en NoSQL.
- Validation des tokens et redirection des requêtes via l'API Gateway.
- Architecture modulaire pour faciliter l'évolution du projet.

---

<h2>📦 Docker</h2>
<p>
    Placez le fichier `docker-compose.yml` à la racine du dépôt.<br>
    Démarrez tous les services : <code>docker-compose up --build</code>
</p>

---

<h2>⚙️ Ports Utilisés</h2>
- Auth Service : 8081  
- Tchat Service : 8082  
- API Gateway : 8080  
- Frontend : 3000  
- MySQL : 3306  
- MongoDB : 27017  
