<?php

use Kirby\Cms\App as Kirby;

Kirby::plugin('philippoehrlein/typo-and-paste', [
  'api' => require __DIR__ . '/config/api.php',
  'translations' => require __DIR__ . '/config/translations.php',
  'options' => [
    'characters' => require __DIR__ . '/config/characters.php'
  ],
  'version' => '2.2.6'
]);
