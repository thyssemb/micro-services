# Dockerfile pour le service auth-service
FROM php:8.1-apache

# Installer les dépendances et l'extension PDO MySQL
RUN apt-get update && apt-get install -y \
    libzip-dev \
    && docker-php-ext-install zip \
    && docker-php-ext-install pdo pdo_mysql

# Définir le répertoire de travail
WORKDIR /var/www/html

# Copier le code source dans le conteneur
COPY . /var/www/html

# Exposer le port nécessaire
EXPOSE 8081

# Lancer Apache
CMD ["apache2-foreground"]
