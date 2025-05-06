<?php

use Kirby\Cms\App as Kirby;

Kirby::plugin('philippoehrlein/typo-and-paste', [
  'api' => require __DIR__ . '/config/api.php',
  'translations' => require __DIR__ . '/config/translations.php',
  'options' => [
    'characters' => require __DIR__ . '/config/characters.php',
    'search' => true,
  ],
  'version' => '2.4.0'
]);
