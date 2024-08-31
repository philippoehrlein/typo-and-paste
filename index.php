<?php

Kirby::plugin('philippoehrlein/typo-and-paste', [
    'options' => [
        'characters' => [
            [
                'label' => [
                    'en' => 'Quotation Marks',
                    'de' => 'Anführungszeichen',
                    'fr' => 'Guillemets'
                ],
                'lang' => 'fr',
                'characters' => ['«', '»', '‹', '›']
            ],
            [
                'label' => [
                    'en' => 'Quotation Marks',
                    'de' => 'Anführungszeichen',
                    'fr' => 'Guillemets'
                ],
                'lang' => 'de',
                'characters' => ['„', '“', '‚', '‘']
            ],
            [
                'label' => [
                    'en' => 'Quotation Marks',
                    'de' => 'Anführungszeichen',
                    'fr' => 'Guillemets'
                ],
                'lang' => 'en',
                'characters' => ['“', '”', '‘', '’']
            ],
            [
                'label' => [
                    'en' => 'Dashes',
                    'de' => 'Bindestriche und Gedankenstriche',
                    'fr' => 'Tirets'
                ],
                'characters' => ['–', '—', '‐']
            ],
            [
                'label' => [
                    'en' => 'Mathematical Symbols',
                    'de' => 'Mathematische Zeichen',
                    'fr' => 'Symboles Mathématiques'
                ],
                'characters' => ['±', '×', '÷', '≠', '≤', '≥', '½', '¼', '¾']
            ],
            [
                'label' => [
                    'en' => 'Miscellaneous Symbols',
                    'de' => 'Sonstige Zeichen',
                    'fr' => 'Symboles Divers'
                ],
                'characters' => ['©', '®', '™', '§', '¶', '°', '†', '‡', '…']
            ]
        ]
    ],
    'routes' => [
        [
            'pattern' => 'typo-and-paste/characters',
            'method' => 'GET',
            'action' => function () {
                return option('philippoehrlein.typo-and-paste.characters');
            }
        ]
    ],
    'panel' => [
        'js' => 'index.js',
    ],
    'version' => '1.0.0',
]);