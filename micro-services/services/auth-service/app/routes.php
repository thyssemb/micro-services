<?php
use Slim\App;
use App\Controller\UserInfoController;

return function (App $app) {
    $app->post('/register', UserInfoController::class . ':register');
    $app->post('/login', UserInfoController::class . ':login');
    $app->post('/refresh', UserInfoController::class . ':refresh');

    $app->put('/update-profile', UserInfoController::class . ':hocUpdateProfile');
};
