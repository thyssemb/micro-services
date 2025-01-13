<?php
namespace App\Services\Token;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class GenerateTokenService
{
    public string $secret;

    public function __construct()
    {
        $this->secret = $_ENV['TOKEN'];

        if (!$this->secret) {
            throw new \Exception("Token is not defined in the environment");
        }
    }

    public function generate(array $payload, bool $isRefreshToken = false): string
    {
        $issuedAt = time();
        $expire = $isRefreshToken ? $issuedAt + (7 * 24 * 3600) : $issuedAt + (30 * 24 * 3600);


        $payload = array_merge($payload, [
            'iat' => $issuedAt,
            'exp' => $expire,
            'isRefreshToken' => $isRefreshToken
        ]);

        $token = JWT::encode($payload, $this->secret, 'HS256');

        // Log the secret key (Remove this after validation in production)
        $logFile = __DIR__ . '/../../../logs/TokenLog/token.txt';
        error_log("JWT Secret: " . $this->secret . "\n", 3, $logFile);

        return $token;
    }

    public function validate(string $token): object
    {
        try {
            return JWT::decode($token, new Key($this->secret, 'HS256'));
        } catch (\Exception $e) {
            // Log the error or handle it
            error_log("Token validation error: " . $e->getMessage());
            throw new \Exception("Invalid token");
        }
    }
}
