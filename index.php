<?php

use Kirby\Cms\App as Kirby;

Kirby::plugin('philippoehrlein/typo-and-paste', [
    'translations' => require __DIR__ . '/config/translations.php',
    'options' => [
        'characters' => require __DIR__ . '/config/characters.php'
    ],
    'api' => require __DIR__ . '/config/api.php',
    'version' => '1.1.0'
]);
