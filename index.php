<?php

use Kirby\Cms\App as Kirby;

Kirby::plugin('philippoehrlein/typo-and-paste', [
    'translations' => include __DIR__ . '/config/translations.php',
    'options' => [
        'characters' => include __DIR__ . '/config/characters.php'
    ],
    'routes' => include __DIR__ . '/config/routes.php',
    'version' => '1.1.0'
]);