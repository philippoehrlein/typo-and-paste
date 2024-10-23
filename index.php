<?php

Kirby::plugin('philippoehrlein/typo-and-paste', [
    'translations' => [
        'en' => [
            'button_title' => 'Special Characters',
            'copied_message' => '${character} copied to clipboard',
        ],
        'de' => [
            'button_title' => 'Sonderzeichen',
            'copied_message' => '${character} in die Zwischenablage kopiert',
        ],
        'fr' => [
            'button_title' => 'Caractères Spéciaux',
            'copied_message' => '${character} copié dans le presse-papiers',
        ],
        'es' => [
            'button_title' => 'Caracteres Especiales',
            'copied_message' => '${character} copiado al portapapeles',
        ],
        'nl' => [
            'button_title' => 'Speciale Tekens',
            'copied_message' => '${character} gekopieerd naar klembord',
        ],
        'it' => [
            'button_title' => 'Caratteri Speciali',
            'copied_message' => '${character} copiato negli appunti',
        ]
    ],
    'options' => [
        'characters' => [
            [
                'label' => [
                    'en' => 'Quotation Marks',
                    'de' => 'Anführungszeichen',
                    'fr' => 'Guillemets',
                    'es' => 'Comillas',
                    'nl' => 'Aanhalingstekens',
                    'it' => 'Virgolette'
                ],
                'lang' => 'fr',
                'characters' => ['«', '»', '‹', '›']
            ],
            [
                'label' => [
                    'en' => 'Quotation Marks',
                    'de' => 'Anführungszeichen',
                    'fr' => 'Guillemets',
                    'es' => 'Comillas',
                    'nl' => 'Aanhalingstekens',
                    'it' => 'Virgolette'
                ],
                'lang' => 'it',
                'characters' => ['«', '»']
            ],
            [
                'label' => [
                    'en' => 'Quotation Marks',
                    'de' => 'Anführungszeichen',
                    'fr' => 'Guillemets',
                    'es' => 'Comillas',
                    'nl' => 'Aanhalingstekens',
                    'it' => 'Virgolette'
                ],
                'lang' => 'es',
                'characters' => ['«', '»', '“', '”⁠']
            ],
            [
                'label' => [
                    'en' => 'Quotation Marks',
                    'de' => 'Anführungszeichen',
                    'fr' => 'Guillemets',
                    'es' => 'Comillas',
                    'nl' => 'Aanhalingstekens',
                    'it' => 'Virgolette'
                ],
                'lang' => 'nl',
                'characters' => ['“', '”', '‘', '’']
            ],
            [
                'label' => [
                    'en' => 'Quotation Marks',
                    'de' => 'Anführungszeichen',
                    'fr' => 'Guillemets',
                    'es' => 'Comillas',
                    'nl' => 'Aanhalingstekens',
                    'it' => 'Virgolette'
                ],
                'lang' => 'de',
                'characters' => ['„', '“', '‚', '‘']
            ],
            [
                'label' => [
                    'en' => 'Quotation Marks',
                    'de' => 'Anführungszeichen',
                    'fr' => 'Guillemets',
                    'es' => 'Comillas',
                    'nl' => 'Aanhalingstekens',
                    'it' => 'Virgolette'
                ],
                'lang' => 'en',
                'characters' => ['“', '”', '‘', '’']
            ],
            [
                'label' => [
                    'en' => 'Dashes',
                    'de' => 'Bindestriche und Gedankenstriche',
                    'fr' => 'Tirets',
                    'es' => 'Guiones',
                    'nl' => 'Koppeltekens',
                    'it' => 'Trattini'
                ],
                'characters' => ['–', '—', '‐']
            ],
            [
                'label' => [
                    'en' => 'Mathematical Symbols',
                    'de' => 'Mathematische Zeichen',
                    'fr' => 'Symboles Mathématiques',
                    'es' => 'Símbolos Matemáticos',
                    'nl' => 'Wiskundige Symbolen',
                    'it' => 'Simboli Matematici'
                ],
                'characters' => ['±', '×', '÷', '≠', '≤', '≥', '½', '¼', '¾']
            ],
            [
                'label' => [
                    'en' => 'Arrows',
                    'de' => 'Pfeile',
                    'fr' => 'Flèches',
                    'es' => 'Flechas',
                    'nl' => 'Pijlen',
                    'it' => 'Frecce'
                ],
                'characters' => [
                    '←', '→', '↑', '↓', '↔', '↕', '↖', '↗', '↘', '↙', '↩', '↪', '↺', '↻'
                ]
            ],
            [
                'label' => [
                    'en' => 'Miscellaneous Symbols',
                    'de' => 'Sonstige Zeichen',
                    'fr' => 'Symboles Divers',
                    'es' => 'Símbolos Varios',
                    'nl' => 'Diverse Symbolen',
                    'it' => 'Simboli Vari'
                ],
                'characters' => ['…', '°', '‰', '©', '®', '™', '§', '¶']
            ]
        ]
    ],
    'routes' => [
        [
            'pattern' => '/typo-and-paste/characters',
            'method' => 'GET',
            'action' => function () {
                return option('philippoehrlein.typo-and-paste.characters');
            }
        ]
    ],
    'version' => '1.0.3',
]);