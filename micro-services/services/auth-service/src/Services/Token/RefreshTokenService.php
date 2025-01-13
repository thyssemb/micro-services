<?php

namespace App\Services\Token;

use App\Services\Token\GenerateTokenService;
use Exception;

class RefreshTokenService
{
    private GenerateTokenService $tokenService;

    public function __construct()
    {
        $this->tokenService = new GenerateTokenService(); // using generate token service to help generate token to the refresh token
    }

    // refresh tokens by dalidating the refreshToken and generating news
    public function refreshTokens(string $refreshToken): array
    {
        try {
            // validate existing refresh token
            $decodedToken = $this->tokenService->validate($refreshToken);

            // verify that the existing token is really a refreshToken
            if (!isset($decodedToken->isRefreshToken) || !$decodedToken->isRefreshToken) {
                throw new Exception('Invalid refresh token');
            }

            // generate a new accessToken
            $newAccessToken = $this->tokenService->generate([
                'id' => $decodedToken->id, // Utilisation de l'ID utilisateur contenu dans le refreshToken
            ]);

            // Générer un nouveau refreshToken
            $newRefreshToken = $this->tokenService->generate([
                'id' => $decodedToken->id, // Utilisation de l'ID utilisateur pour le nouveau refresh token
            ], true); // Le paramètre true indique que c'est un refresh token

            return [
                'accessToken' => $newAccessToken,
                'refreshToken' => $newRefreshToken,
            ];

        } catch (Exception $e) {
            throw new Exception('Error refreshing tokens: ' . $e->getMessage());
        }
    }
}
