<?php

namespace App\Controller;

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Services\AuthService;
use App\Services\Token\GenerateTokenService;
use App\Services\Token\RefreshTokenService;
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;


class UserInfoController
{
    private AuthService $authService;
    private GenerateTokenService $tokenService;
    private RefreshTokenService $refreshTokenService;

    public function __construct()
    {
        $this->authService = new AuthService();
        $this->tokenService = new GenerateTokenService();
        $this->refreshTokenService = new RefreshTokenService();

    }

    public function register(Request $request, Response $response, array $args): Response
    {
        $data = $request->getParsedBody();

        error_log('Request received at auth service /register');

        try {
            if (empty($data['pseudo']) || empty($data['email']) || empty($data['password'])) {
                error_log('Missing required fields in request: pseudo, email, or password');
                $response->getBody()->write(json_encode(['message' => 'All fields are required']));
                return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
            }

            // call to the auth service to handle registration logic
            $registrationSuccess = $this->authService->register($data['pseudo'], $data['email'], $data['password']);

            if ($registrationSuccess) {
                error_log('User successfully registered in database');
                $response->getBody()->write(json_encode(['message' => 'User successfully registered']));
                return $response->withHeader('Content-Type', 'application/json');
            } else {
                error_log('Error registering user in database');
                $response->getBody()->write(json_encode(['message' => 'Error during registration']));
                return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
            }

        } catch (\Exception $e) {
            error_log('Error during registration: ' . $e->getMessage());
            $response->getBody()->write(json_encode(['message' => 'Error during registration', 'error' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
        }
    }

    public function login(Request $request, Response $response, array $args): Response
    {
        $data = $request->getParsedBody();

        error_log('Request received at auth service /login');

        if (empty($data['pseudo']) || empty($data['password'])) {
            $response->getBody()->write(json_encode(['message' => 'Username and password required']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }

        try {
            // call to auth service to authenticate the user
            $user = $this->authService->login($data['pseudo'], $data['password']);

            if ($user) {
                // generate accessToken and refreshToken

                // we decide which user data to include in the token to validate the request.
                $accessToken = $this->tokenService->generate([
                    'id' => $user->getId(),
                    'pseudo' => $user->getPseudo(),
                    'email' => $user->getEmail(),
                ]);

                $refreshToken = $this->tokenService->generate([
                    'id' => $user->getId(),
                ], true); // pass true to indicate it's a refresh token

                $response->getBody()->write(json_encode([
                    'accessToken' => $accessToken,
                    'refreshToken' => $refreshToken,
                    'message' => 'User connected successfully',
                ]));

                return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
            }

            // handle error with login
            $response->getBody()->write(json_encode(['message' => 'Invalid username or password']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(401);
        } catch (\Exception $e) {
            $response->getBody()->write(json_encode(['message' => 'Error with user connection', 'error' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
        }
    }

    public function refresh(Request $request, Response $response, array $args): Response
    {
        $data = $request->getParsedBody();
        $refreshToken = $data['refreshToken'] ?? null;

        if (!$refreshToken) {
            $response->getBody()->write(json_encode(['message' => 'Refresh token is required']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }

        try {
            // refresh the tokens using the refresh token service
            $tokens = $this->refreshTokenService->refreshTokens($refreshToken);

            $response->getBody()->write(json_encode([
                'accessToken' => $tokens['accessToken'],
                'refreshToken' => $tokens['refreshToken'],
                'message' => 'Tokens refreshed successfully',
            ]));

            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);

        } catch (\Exception $e) {
            $response->getBody()->write(json_encode([
                'message' => 'Error refreshing tokens',
                'error' => $e->getMessage()
            ]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
        }
    }


// crud user
public function hocUpdateProfile(Request $request, Response $response, array $args): Response
{
    $data = $request->getParsedBody();

    try {
        $accessToken = $request->getHeader('Authorization')[0] ?? '';

        if (empty($accessToken)) {
            $response->getBody()->write(json_encode(['message' => 'Missing access token']));
            return $response->withStatus(400);
        }

        $secretKey = $this->tokenService->secret;
        error_log("Secret key for decoding token: " . $secretKey);

        $decoded = JWT::decode($accessToken, new Key($secretKey, 'HS256'));

        if (!$decoded) {
            $response->getBody()->write(json_encode(['message' => 'Invalid or missing token']));
            return $response->withStatus(401);
        }

        if (empty($data['pseudo']) && empty($data['email']) && empty($data['password'])) {
            $response->getBody()->write(json_encode(['message' => 'No user data for updating the profile']));
            return $response->withStatus(400);
        }

        $user = $this->authService->getUserById($decoded->id);
        if ($user) {
            if (!empty($data['password'])) {
                $data['password'] = password_hash($data['password'], PASSWORD_BCRYPT);
            }

            $user->setPseudo($data['pseudo'] ?? $user->getPseudo());
            $user->setEmail($data['email'] ?? $user->getEmail());
            $user->setPassword($data['password'] ?? $user->getPassword());

            $updated = $this->authService->updateUser($user);

            if ($updated) {
                $response->getBody()->write(json_encode(['message' => 'Profil mis à jour avec succès']));
                return $response->withStatus(200);
            } else {
                $response->getBody()->write(json_encode(['message' => 'Erreur lors de la mise à jour du profil']));
                return $response->withStatus(500);
            }
        } else {
            $response->getBody()->write(json_encode(['message' => 'Utilisateur non trouvé']));
            return $response->withStatus(404);
        }
    } catch (\Exception $e) {
        $response->getBody()->write(json_encode(['message' => 'Erreur lors de la mise à jour du profil', 'error' => $e->getMessage()]));
        return $response->withStatus(500);
    }
}
}
