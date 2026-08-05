# AvalynxLightbox

[![npm version](https://jbs-newmedia.de/badge/npm/avalynx-lightbox/version.svg)](https://www.npmjs.com/package/avalynx-lightbox)
[![npm downloads](https://jbs-newmedia.de/badge/npm/avalynx-lightbox/download.svg)](https://www.npmjs.com/package/avalynx-lightbox)
[![Composer version](https://jbs-newmedia.de/badge/composer/avalynx/avalynx-lightbox/version.svg)](https://packagist.org/packages/avalynx/avalynx-lightbox)
[![Composer downloads](https://jbs-newmedia.de/badge/composer/avalynx/avalynx-lightbox/download.svg)](https://packagist.org/packages/avalynx/avalynx-lightbox)
[![jsDelivr](https://jbs-newmedia.de/badge/jsdelivr/avalynx-lightbox/hits.svg)](https://www.jsdelivr.com/package/npm/avalynx-lightbox)
[![License](https://jbs-newmedia.de/badge/npm/avalynx-lightbox/license.svg)](LICENSE)
[![Tests](https://jbs-newmedia.de/badge/github/avalynx/avalynx-lightbox/tests.svg)](https://github.com/avalynx/avalynx-lightbox/actions/workflows/tests.yml)
[![codecov](https://jbs-newmedia.de/badge/codecov/avalynx/avalynx-lightbox/coverage.svg)](https://codecov.io/gh/avalynx/avalynx-lightbox)
[![GitHub stars](https://jbs-newmedia.de/badge/github/avalynx/avalynx-lightbox/stars.svg)](https://github.com/avalynx/avalynx-lightbox)

AvalynxLightbox is a simple, lightweight, and easy-to-use lightbox library, built on Bootstrap 5.3+ without any framework dependencies. It allows you to display images in a lightbox format with customizable options, perfect for integrating into modern web applications.

## Features

- **Bootstrap Integration**: Designed for seamless integration with Bootstrap >= 5.3.
- **Customizable Options**: Configure lightbox behavior, including close functionality, opacity, z-index, and more.
- **Gallery Mode**: Navigate through multiple images with navigation buttons or arrow keys.
- **Prevent Background Scrolling**: Optionally disable background scrolling when the lightbox is open, with no content jump.
- **Closeable Lightbox**: Optionally allow users to close the lightbox with a button or by clicking outside the image.
- **Callback Support**: Set custom actions when the lightbox is closed.
- **Lightweight**: No additional dependencies besides Bootstrap 5.3+.

## Examples

Here's a simple example of how to use AvalynxLightbox in your project:

* [Overview](https://avalynx-lightbox.jbs-newmedia.de/examples/index.html)
* [Show lightbox](https://avalynx-lightbox.jbs-newmedia.de/examples/show-lightbox.html)
* [Gallery mode](https://avalynx-lightbox.jbs-newmedia.de/examples/gallery.html)
* [No background scroll](https://avalynx-lightbox.jbs-newmedia.de/examples/no-scroll.html)

## Installation

To use AvalynxLightbox in your project, you can directly include it in your HTML file. Ensure you have Bootstrap 5.3 or higher included in your project for AvalynxLightbox to work correctly.

First, include Bootstrap:

```html
<!-- Bootstrap -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3/dist/js/bootstrap.bundle.min.js"></script>
```

Then, include AvalynxLightbox:

```html
<link rel="stylesheet" href="path/to/avalynx-lightbox.css">
<script src="path/to/avalynx-lightbox.js"></script>
```

Replace `path/to/avalynx-lightbox.*` with the actual path to the files in your project.

## Installation via jsDelivr ([Link](https://cdn.jsdelivr.net/npm/avalynx-lightbox/))

AvalynxLightbox is also available via [jsDelivr](https://www.jsdelivr.com/). You can include it in your project like this:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/avalynx-lightbox@1.0.6/dist/css/avalynx-lightbox.css">
<script src="https://cdn.jsdelivr.net/npm/avalynx-lightbox@1.0.6/dist/js/avalynx-lightbox.js"></script>
```

Make sure to also include Bootstrap's JS/CSS in your project to ensure AvalynxLightbox displays correctly.


## Installation via NPM ([Link](https://www.npmjs.com/package/avalynx-lightbox))

AvalynxLightbox is also available as a npm package. You can add it to your project with the following command:

```bash
npm install avalynx-lightbox
```

After installing, you can import AvalynxLightbox into your JavaScript file like this:

```javascript
import { AvalynxLightbox } from 'avalynx-lightbox';
import 'avalynx-lightbox/dist/css/avalynx-lightbox.css';
```

Make sure to also include Bootstrap's JS/CSS in your project to ensure AvalynxLightbox displays correctly.

## Installation via Symfony AssetMapper

```bash
php bin/console importmap:require avalynx-lightbox
```

After installing, you can import AvalynxLightbox into your JavaScript file like this:

```javascript
import { AvalynxLightbox } from 'avalynx-lightbox';
import 'avalynx-lightbox/dist/css/avalynx-lightbox.css';
```

Make sure to also include Bootstrap's JS/CSS in your project to ensure AvalynxLightbox displays correctly.

## Installation via Symfony AssetComposer

More information about the Symfony AssetComposer Bundle can be found [here](https://github.com/jbsnewmedia/asset-composer-bundle).

```twig
{% do addAssetComposer('avalynx/avalynx-lightbox/dist/css/avalynx-lightbox.css') %}
{% do addAssetComposer('avalynx/avalynx-lightbox/dist/js/avalynx-lightbox.js') %}
```

Make sure to also include Bootstrap's JS/CSS in your project to ensure AvalynxLightbox displays correctly.

## Installation via Composer ([Link](https://packagist.org/packages/avalynx/avalynx-lightbox))

AvalynxLightbox is also available as a Composer package. You can add it to your project with the following command:

```bash
composer require avalynx/avalynx-lightbox
```

After installing, you can import AvalynxLightbox into your HTML file like this:

```html
<link rel="stylesheet" href="vendor/avalynx/avalynx-lightbox/dist/css/avalynx-lightbox.css">
<script src="vendor/avalynx/avalynx-lightbox/dist/js/avalynx-lightbox.js"></script>
```

Make sure to also include Bootstrap's JS/CSS in your project to ensure AvalynxLightbox displays correctly.

## Usage

To create an alert, simply instantiate a new `AvalynxLightbox` object with the desired options:

```javascript
new AvalynxLightbox('.avalynx-lightbox', {
    closeable: true,
    closeOnClickOutside: true,
    opacity: 80,
    zIndex: 1500,
    onClose: () => console.log('Lightbox closed')
}, {
    closeButtonLabel: 'Close'
});

```

## Options

AvalynxLightbox allows the following options for customization:

- `selector`: (string) CSS selector for the images to display in the lightbox (default: `'.avalynx-lightbox'`).
- `options`:
    - `closeable`: (boolean) Allow users to close the lightbox (default: `true`).
    - `closeOnClickOutside`: (boolean) Close the lightbox when the user clicks outside the image (default: `true`).
    - `onClose`: (function) A callback function to execute when the lightbox is closed (default: `null`).
    - `opacity`: (number) Background opacity (0-100) (default: `80`).
    - `zIndex`: (number) The z-index for the lightbox (default: `1500`).
    - `gallery`: (boolean) Enable gallery mode for the selected images (default: `false`).
    - `allowBackgroundScrolling`: (boolean) Whether to allow background scrolling when the lightbox is open (default: `false`).
- `language`:
    - `closeButtonLabel`: (string) The aria-label for the close button (default: `'Close'`).
    - `prevButtonLabel`: (string) The aria-label for the previous button (default: `'Previous'`).
    - `nextButtonLabel`: (string) The aria-label for the next button (default: `'Next'`).

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request with your changes or improvements. We're looking for contributions in the following areas:

- Bug fixes
- Feature enhancements
- Documentation improvements

Before submitting your pull request, please ensure your changes are well-documented and follow the existing coding style of the project.

## License

AvalynxLightbox is open-sourced software licensed under the [MIT license](LICENSE).

## Contact

If you have any questions, feature requests, or issues, please open an issue on our [GitHub repository](https://github.com/avalynx/avalynx-lightbox/issues) or submit a pull request.

Thank you for considering AvalynxLightbox for your project!
