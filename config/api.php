<?php

use Kirby\Cms\App;

return [
  'routes' => fn (App $kirby) => [
    [
      'pattern' => 'typo-and-paste/characters',
      'method' => 'GET',
      'action' => function () use ($kirby) {
        return $kirby->option('philippoehrlein.typo-and-paste.characters');
      }
    ],
    [
      'pattern' => 'typo-and-paste/enable-search',
      'method' => 'GET',
      'action' => function () use ($kirby) {
        return [
          'status' => 'success',
          'value' => $kirby->option('philippoehrlein.typo-and-paste.search')
        ];
      }
    ]
  ]
];
