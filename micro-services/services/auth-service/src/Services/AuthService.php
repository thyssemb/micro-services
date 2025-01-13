<?php
declare(strict_types=1);

namespace App\Services;

use App\Domain\User\UserRepository;
use App\Infrastructure\DatabaseConnection;
use App\Domain\User\User;

class AuthService
{
    private UserRepository $userRepository;

    public function __construct()
    {
        $databaseConnection = new DatabaseConnection();
        $this->userRepository = new UserRepository($databaseConnection);
    }

    public function register(string $pseudo, string $email, string $password): bool
    {
        $user = new User(null, $pseudo, $email, $password);
        return $this->userRepository->registerUser($user);
    }

    public function login(string $pseudo, string $password): ?User
    {
        return $this->userRepository->loginUser($pseudo, $password);
    }
}
