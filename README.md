# Typo & Paste

![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-2.0.0-blue)

**Typo & Paste** is a Kirby plugin that allows users to easily manage and insert special characters with multi-language support.

![Cover Typo & Paste](.github/typo-and-paste-cover.png)

## Features

- **Multi-Language Support**: Supports various languages for characters and the user interface.
- **Custom Characters**: Users can define and add their own characters.
- **Clipboard Copy**: Easily copy characters to the clipboard.

## Compatibility

This plugin is compatible with Kirby 4 and 5.

## Installation

### Composer

Install the plugin via Composer:

```bash
composer require philippoehrlein/typo-and-paste
```

### Manual Installation

1. Download and extract the plugin.
2. Copy the `typo-and-paste` folder into the `/site/plugins/` directory of your Kirby installation.

## Configuration

### Adding the Button

In Kirby 5, the **Typo & Paste** button can be customized to appear in specific views of the Panel toolbar by configuring view buttons. In Kirby 4, the button is automatically visible in all Panel views without any additional configuration.

To enable the **Typo & Paste** button in the Kirby Panel, you can configure it in two ways:

1. **Blueprint Configuration**: Add the button directly to the blueprint:

   ```yaml
   buttons:
     - typo-and-paste
     - preview
     - settings
     - languages
     - status
   ```

2. **Config File Configuration**: Add the button configuration globally in your `site/config/config.php`:

   ```php
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

### Options

You can configure the plugin in the `site/config/config.php` file. The following options are available:

#### `characters`

Define the characters to be displayed by the plugin. The plugin provides [default characters](./config/characters.php), which you can customize or extend.

Additonaly you can use `lang` to display a group of characters depending on the page language.

The following example shows how to add a group of French quotation marks:

```php
// site/config/config.php
return [
  'philippoehrlein.typo-and-paste' => [
    'characters' => [
      [
        'label' => [
          'en' => 'Quotation Marks',
          'de' => 'Anführungszeichen',
          // Additional translations can be added here...
        ],
        'lang' => 'fr',
        'characters' => ['«', '»', '‹', '›']
      ],
      // Additional characters and categories can be added here...
    ]
  ]
];
```

## Translations

You can customize the plugin's translations for different languages by using Kirby's multi-language support. To add or override translations, create a language file in the `site/languages` directory and define the translations for the plugin:

```php
// site/languages/en.php
return [
  'code' => 'en',
  'default' => true,
  // Other language configuration...

  'translations' => [
    'philippoehrlein.typo-and-paste.buttonTitle' => 'Special Characters',
    'philippoehrlein.typo-and-paste.copiedMessage' => '{character} copied to clipboard',
  ]
];
```

## AI Support

This plugin includes an AI-friendly schema definition (`AI-SCHEMA.md`) to help generate configurations using AI language models. The schema provides:

- Structured format for character group definitions
- Clear property descriptions and requirements
- Guidelines for creating meaningful character groups
- Examples of proper configuration

### Using AI for Configuration

1. Share the content of `AI-SCHEMA.md` with your AI assistant
2. Describe your specific use case and requirements
3. The AI will generate a configuration following the schema
4. Review and adjust the generated configuration as needed

**Example prompt**:

> Using the schema, create a configuration for a blog about [your topic]. The content will be in [languages] and editors work in [languages].

## Usage

After installation and configuration, the plugin adds a button to the Kirby Panel, allowing users to easily insert special characters into their content.

### Insert Characters

1. Open the Kirby Panel.
2. Use the "Special Characters" button to select and insert characters.
3. Click on a character to copy it to your clipboard.

## Development

If you want to contribute to the development of this plugin, follow these steps:

1. Clone the repository.
2. Install dependencies using Composer.
3. Run the playground by executing `composer dev`.
4. Open the playground in your browser: [http://localhost:8000](http://localhost:8000).

## License

This plugin is open-source and available under the [MIT License](LICENSE).
