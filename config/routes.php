<?php

return [
  [
    'pattern' => '/typo-and-paste/characters',
    'method' => 'GET',
    'action' => function () {
        return option('philippoehrlein.typo-and-paste.characters');
    }
  ]
];