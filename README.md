# Typo & Paste

![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-2.3.0-blue)

**Typo & Paste** is a Kirby plugin that allows users to easily manage and insert special characters with multi-language support.

![Cover Typo & Paste](.github/typo-and-paste-cover.png)

## Table of Contents

- [Features](#features)
- [Compatibility](#compatibility)
- [Installation](#installation)
  - [Composer](#composer)
  - [Manual Installation](#manual-installation)
- [Configuration](#configuration)
  - [Access Points](#access-points)
    - [Panel Toolbar Button](#1-panel-toolbar-button)
    - [Writer Mark Button](#2-writer-mark-button)
    - [Textarea Button](#3-textarea-button)
    - [Keyboard Shortcuts](#4-keyboard-shortcuts)
  - [Character Configuration](#character-configuration)
  - [AI Support](#ai-support)
    - [Using AI for Configuration](#using-ai-for-configuration)
- [Translations](#translations)
- [Development](#development)
- [License](#license)

## Features

- **Multi-Language Support**: Supports various languages for characters and the user interface.
- **Custom Characters**: Users can define and add their own characters.
- **Multiple Access Points**:
  - Panel toolbar button
  - Writer mark button
  - Textarea button
  - Keyboard shortcuts (`Option+T` / `Alt+T`)
- **Clipboard Copy**: Easily copy characters to the clipboard.

## Compatibility

This plugin is compatible with Kirby 4 and 5.

## Installation

### Composer

```bash
composer require philippoehrlein/typo-and-paste
```

### Manual Installation

1. Download and extract the plugin
2. Copy the `typo-and-paste` folder into `/site/plugins/`

## Configuration

### Access Points

The plugin provides four ways to access special characters:

#### 1. Panel Toolbar Button

In Kirby 5, configure the Panel toolbar button in your page, site, or file blueprint:

```yaml
buttons:
  - typo-and-paste
  - preview
  - settings
  - languages
  - status
```

Or globally in your config:

```php
// site/config/config.php
return [
  'panel' => [
    'viewButtons' => [
      // Page view
      'page' => ['typo-and-paste', 'preview', 'settings', 'languages', 'status'],
      // Site view
      'site' => ['typo-and-paste', 'preview', 'languages']
    ]
  ]
];
```

#### 2. Writer Mark Button

![Writer Mark Button](.github/typo-and-paste-mark-button.png)

To add the **Typo & Paste** button to the Writer toolbar, include `typo-and-paste` in your field's marks configuration:

```yaml
fields:
  article:
    label: Article
    type: writer
    toolbar:
      inline: true
      marks:
        - bold
        - italic
        - underline
        - strike
        - code
        - "|"
        - link
        - email
        - "|"
        - clear
        - "|"
        - typo-and-paste
```

#### 3. Textarea Button

To add the **Typo & Paste** button to a textarea, add `typo-and-paste` in your field's buttons configuration:

```yaml
fields:
  article:
    label: Article
    type: textarea
    buttons:
      - typo-and-paste
```

#### 4. Keyboard Shortcuts

![Keyboard Shortcuts](.github/typo-and-paste-dialog.png)

- Use `Option+T` (Mac) or `Alt+T` (Windows/Linux) to open the character dialog from anywhere
- Navigate characters using arrow keys
- Press `Enter` to add the selected character to your clipboard

### Character Configuration

Define custom characters in your config:
Each character can either be defined as a simple string or as an object with value and a multilingual label. Labels are used for accessibility and shown as tooltips in the UI.

```php
// site/config/config.php
return [
  'philippoehrlein.typo-and-paste' => [
    'characters' => [
      [
        'label' => [
          'en' => 'Quotation Marks',
          'de' => 'Anführungszeichen',
        ],
        'lang' => 'fr', // Optional: Show only for French content
        'characters' => [
          ['value' => '«', 'label' => ['en' => 'Left guillemet', 'de' => 'Linkes Guillemets']],
          ['value' => '»', 'label' => ['en' => 'Right guillemet', 'de' => 'Rechtes Guillemets']],
          '‹', // also allowed: plain characters
          '›'
        ]
      ],
    ]
  ]
];
```

### AI Support

This plugin includes an AI-friendly schema definition (AI-SCHEMA.md) to help generate configurations using AI language models. The schema provides:

- Structured format for character group definitions
- Clear property descriptions and requirements
- Guidelines for creating meaningful character groups
- Examples of proper configuration

#### Using AI for Configuration

1. Share the content of <a href="https://raw.githubusercontent.com/philippoehrlein/typo-and-paste/main/AI-SCHEMA.md" target="_blank">AI-SCHEMA.md</a> with your AI assistant
2. Describe your specific use case and requirements
3. The AI will generate a configuration following the schema
4. Review and adjust the generated configuration as needed

#### Example prompt:

> Using the schema, create a configuration for a blog about [your topic]. The content will be in [languages] and editors work in [languages].

## Translations

The plugin includes a default set of translations for `en`, `de`, `fr`, `es`, `nl`, and `it`.
Add custom translations:

```php
// site/languages/en.php
return [
  'translations' => [
    'philippoehrlein.typo-and-paste.buttonTitle' => 'Special Characters',
    'philippoehrlein.typo-and-paste.copiedMessage' => '{character} copied to clipboard',
  ]
];
```

## Development

1. Clone the repository
2. Install dependencies: `composer install`
3. Run playground: `composer dev`
4. Open: [localhost:8000](http://localhost:8000)

## License

MIT License
