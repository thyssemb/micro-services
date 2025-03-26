<center><h1>🌐 Microservices Project</h1></center> <p>This project implements an architecture based on microservices to manage authentication, chat messages, and a centralized API gateway. The services include an authentication API with PHP, a chat management API with Node.js, and an API gateway to connect the two. The databases use both SQL and NoSQL to store user and message data.</p>
<h2>🚀 Installation</h2> <p align="left"> git clone <br> <code>cd microservices-project</code> <br> <code>composer install</code> (for auth-service) <br> <code>npm install</code> (for chat-service and api-gateway) <br> </p>
<h2>▶️ Launch</h2> <h3>🔒 Auth Service</h3> <p align="left"> Installation: <code>composer require firebase/php-jwt slim/slim vlucas/phpdotenv</code><br> Start locally: <code>php -S localhost:8081 -t public</code> </p> <h3>💬 Chat Service</h3> <p align="left"> Installation: <code>npm install</code><br> Start MongoDB: <br> <code>brew services start mongodb/brew/mongodb-community</code><br> <code>mongosh --port 27017</code><br> Start the service: <code>node server.js</code> on port 8082 </p> <h3>🚪 API Gateway</h3> <p align="left"> Installation: <code>npm install express axios dotenv nodemon</code><br> Install additional libraries: <code>npm install redis rate-limiter-flexible express-rate-limit ioredis</code><br> Start locally: <code>nodemon server.js</code> on port 8080 </p> <h3>💻 Frontend</h3> <p align="left"> Installation: <code>npm install</code><br> Start locally: <code>npm run dev</code> on port 3000 </p>
<h2>🛠 Features</h2> - Secure authentication with tokens (access and refresh). - Message management with discussions stored in NoSQL. - Token validation and request redirection via the API Gateway. - Modular architecture for easy project evolution.
<h2>📦 Docker</h2> <p> Place the `docker-compose.yml` file at the root of the repository.<br> Start all services: <code>docker-compose up --build</code> </p>
<h2>⚙️ Ports Used</h2> - Auth Service: 8081 - Chat Service: 8082 - API Gateway: 8080 - Frontend: 3000 - MySQL: 3306 - MongoDB: 27017







