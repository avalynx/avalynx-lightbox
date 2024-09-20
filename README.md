# AvalynxLightbox

AvalynxLightbox is a simple, lightweight, and easy-to-use lightbox library, built on Bootstrap 5.3+ without any framework dependencies. It allows you to display images in a lightbox format with customizable options, perfect for integrating into modern web applications.

## Features

- **Bootstrap-Based**: Integrates seamlessly with Bootstrap (version 5.3 or higher).
- **Customizable Options**: Configure lightbox behavior, including close functionality, opacity, z-index, and more.
- **Closeable Lightbox**: Optionally allow users to close the lightbox with a button or by clicking outside the image.
- **Callback Support**: Set custom actions when the lightbox is closed.
- **Lightweight**: No additional dependencies besides Bootstrap 5.3+.

## Example

Here's a simple example of how to use AvalynxLightbox in your project:

* [Overview](https://avalynx-lightbox.jbs-newmedia.de/examples/index.html)
* [Show lightbox](https://avalynx-lightbox.jbs-newmedia.de/examples/show-lightbox.html)

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
<script src="path/to/avalynx-lightbox.js"></script>
```

Replace `path/to/avalynx-lightbox.js` with the actual path to the files in your project.

## Installation via jsDelivr ([Link](https://cdn.jsdelivr.net/npm/avalynx-lightbox/))

AvalynxLightbox is also available via [jsDelivr](https://www.jsdelivr.com/). You can include it in your project like this:

```html
<script src="https://cdn.jsdelivr.net/npm/avalynx-lightbox@0.0.2/dist/js/avalynx-lightbox.js"></script>
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
```

Make sure to also include Bootstrap's JS/CSS in your project to ensure AvalynxLightbox displays correctly.

## Installation via Symfony AssetMapper

```bash
php bin/console importmap:require avalynx-lightbox
```

After installing, you can import AvalynxLightbox into your JavaScript file like this:

```javascript
import { AvalynxLightbox } from 'avalynx-lightbox';
```

Make sure to also include Bootstrap's JS/CSS in your project to ensure AvalynxLightbox displays correctly.

## Installation via Composer ([Link](https://packagist.org/packages/avalynx/avalynx-lightbox))

AvalynxLightbox is also available as a Composer package. You can add it to your project with the following command:

```bash
composer require avalynx/avalynx-lightbox
```

After installing, you can import AvalynxLightbox into your HTML file like this:

```html
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

AvalynxLightbox supports the following options for customization:

- `selector`: (string) CSS selector for the images to display in the lightbox (default: `'.avalynx-lightbox'`).
- `options`:
    - `closeable`: (boolean) Allow users to close the lightbox (default: `true`).
    - `closeOnClickOutside`: (boolean) Close the lightbox when the user clicks outside the image (default: `true`).
    - `onClose`: (function) A callback function to execute when the lightbox is closed (default: `null`).
    - `opacity`: (number) Background opacity (0-100) (default: `80`).
    - `zIndex`: (number) The z-index for the lightbox (default: `1500`).
- `language`:
    - `closeButtonLabel`: (string) The aria-label for the close button (default: `'Close'`).

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
