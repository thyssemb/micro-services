<?php

declare(strict_types=1);

namespace App\Domain\User;

use PDO;
use PDOException;
use App\Infrastructure\DatabaseConnection;

class UserRepository
{
    private PDO $pdo;

    public function __construct(DatabaseConnection $databaseConnection)
    {
        $this->pdo = $databaseConnection->getConnection();
    }

    public function registerUser(User $user): bool
    {
        try {
            $stmt = $this->pdo->prepare('INSERT INTO users (pseudo, email, password) VALUES (:pseudo, :email, :password)');
            $stmt->bindValue(':pseudo', $user->getPseudo());
            $stmt->bindValue(':email', $user->getEmail());
            $stmt->bindValue(':password', password_hash($user->getPassword(), PASSWORD_BCRYPT));
            return $stmt->execute();
        } catch (PDOException $e) {
            throw new \Exception('Error with sign in : ' . $e->getMessage());
        }
    }

    public function loginUser(string $pseudo, string $password): ?User
    {
        try {
            $stmt = $this->pdo->prepare('SELECT * FROM users WHERE pseudo = :pseudo');
            $stmt->bindValue(':pseudo', $pseudo);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify($password, $user['password'])) {
                return new User($user['id'], $user['pseudo'], $user['email'], $user['password']);
            }

            return null;
        } catch (PDOException $e) {
            throw new \Exception('Error with log in : ' . $e->getMessage());
        }
    }

    public function updateUser(User $user): bool
{
    try {
        $stmt = $this->pdo->prepare('UPDATE users SET pseudo = :pseudo, email = :email, password = :password WHERE id = :id');
        $stmt->bindValue(':pseudo', $user->getPseudo());
        $stmt->bindValue(':email', $user->getEmail());
        $stmt->bindValue(':password', password_hash($user->getPassword(), PASSWORD_BCRYPT));
        $stmt->bindValue(':id', $user->getId());

        return $stmt->execute();
    } catch (PDOException $e) {
        throw new \Exception('Error updating user: ' . $e->getMessage());
    }
}

}
