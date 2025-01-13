<?php

namespace App\Infrastructure;

use PDO;
use PDOException;
use Dotenv\Dotenv;

class DatabaseConnection
{
    private PDO $pdo;

    public function __construct()
    {
        // load connexion to mysql db
        $dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
        $dotenv->load();

        $this->pdo = $this->connect();
    }

    private function connect(): PDO
    {
        $host = $_ENV['DB_HOST'];
        $db = $_ENV['DB_NAME'];
        $user = $_ENV['DB_USER'];
        $password = $_ENV['DB_PASSWORD'];

        if (!$host || !$db || !$user || !$password) {
            throw new PDOException('Missing required environment variables for database connection.');
        }

        try {
            $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            return $pdo;
        } catch (PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
    }

    public function getConnection(): PDO
    {
        return $this->pdo;
    }
}
