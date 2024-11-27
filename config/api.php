<?php

use Kirby\Cms\App;

return [
  [
    'routes' => fn (App $kirby) => [
      [
        'pattern' => 'typo-and-paste/characters',
        'method' => 'GET',
        'action' => function () use ($kirby) {
          return $kirby->option('philippoehrlein.typo-and-paste.characters');
        }
      ]
    ]
  ]
];
