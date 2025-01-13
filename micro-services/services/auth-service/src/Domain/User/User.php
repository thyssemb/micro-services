<?php

declare(strict_types=1);

namespace App\Domain\User;

use JsonSerializable;

class User implements JsonSerializable
{
    private ?int $id;
    private string $pseudo;
    private string $email;
    private string $password;

    public function __construct(?int $id, string $pseudo, string $email, string $password)
    {
        $this->id = $id;
        $this->pseudo = strtolower($pseudo);
        $this->email = $email;
        $this->password = $password;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPseudo(): string
    {
        return $this->pseudo;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    #[\ReturnTypeWillChange]
    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'pseudo' => $this->pseudo,
            'email' => $this->email,
        ];
    }
}
