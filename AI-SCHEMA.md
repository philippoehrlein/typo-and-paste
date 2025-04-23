# Character Configuration Schema

Schema for configuring special characters in the Typo & Paste plugin.

## Basic Structure

```php
return [
    'philippoehrlein.typo-and-paste' => [
        'characters' => [
            // Character groups here
        ]
    ]
];
```

## Character Group Schema

```php
[
    'label' => [
        'en' => 'Group Name in English',
        'de' => 'Gruppenname auf Deutsch',
        // Additional language codes as needed
    ],
    'lang' => 'optional-language-code',
    'characters' => ['char1', 'char2', 'char3']
]
```

## Properties

### label (required)

- Type: Array
- Description: Multi-language labels for the character group
- Format: Array of language codes with corresponding labels

### lang (optional)

- Type: String
- Description: Language code to show this character group only when editing content in that specific language. This refers to the page language being edited, not the Kirby Panel interface language of the editor
- Note: If omitted, the group will be shown for all content languages
- Example usage:
  - `de` shows German quotation marks („") only when editing German content
  - `en` shows English quotation marks ("") only when editing English content
  - Not related to the editor's interface language preference

### characters (required)

- Type: Array
- Description: List of special characters. Each character can be either:
  - A string containing a single character or symbol
  - An object containing:
    - `value`: the character or symbol as a string
    - `label`: an optional object with language codes as keys and human-readable names as values

- Format:
  ```php
  // Simple character
  'characters' => ['±']

  // Or character with labels
  'characters' => [
      ['value' => '±', 'label' => ['en' => 'Plus-minus sign', 'de' => 'Plusminuszeichen']],
      ['value' => '×', 'label' => ['en' => 'Multiplication sign']]
  ]
  ```

- Notes:
  - `label` values are useful for accessibility and will be used as tooltips or `aria-label` values.
  - You can mix simple strings and full objects within the same array.

## Configuration Guidelines

When creating character groups, consider the following:

1. Think in terms of the website's content needs rather than specific symbols
2. Focus on characters that are:
   - Frequently needed but not easily accessible via keyboard
   - Relevant to the website's content theme
   - Flexible enough to serve multiple purposes
3. Group characters by their general function rather than specific use cases

## Example Configuration

```php
[
    'label' => [
        'en' => 'Mathematical Symbols',
        'de' => 'Mathematische Zeichen',
        'fr' => 'Symboles Mathématiques'
    ],
    'characters' => ['±', '×', '÷', '≠', '≤', '≥']
]
```

```php
[
    'label' => [
        'en' => 'Legal Symbols',
        'de' => 'Rechtliche Zeichen'
    ],
    'characters' => [
        ['value' => '©', 'label' => ['en' => 'Copyright sign', 'de' => 'Copyrightzeichen']],
        ['value' => '®', 'label' => ['en' => 'Registered trademark']]
    ]
]
```
