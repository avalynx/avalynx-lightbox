/**
 * AvalynxLightbox
 *
 * AvalynxLightbox is a simple, lightweight, and easy-to-use lightbox library. Based on Bootstrap >=5.3 without any framework dependencies.
 *
 * @version 0.0.2
 * @license MIT
 * @author https://github.com/avalynx/avalynx-lightbox/graphs/contributors
 * @website https://github.com/avalynx/
 * @repository https://github.com/avalynx/avalynx-lightbox.git
 * @bugs https://github.com/avalynx/avalynx-lightbox/issues
 *
 * @param {string} selector - The CSS selector for the image to display in the lightbox (default: '.avalynx-select').
 * @param {object} options - An object containing the following keys:
 * @param {boolean} options.closeable - Whether the lightbox can be closed by the user (default: true).
 * @param {boolean} options.closeOnClickOutside - Whether the lightbox will close when the user clicks outside the image (default: true).
 * @param {function} options.onClose - A callback function to execute when the lightbox is closed (default: null).
 * @param {number} options.opacity - The background opacity as an integer between 0 and 100 (default: 80).
 * @param {number} options.zIndex - The z-index of the lightbox (default: 1500).
 *
 * @param {object} language - An object containing the following keys:
 * @param {string} language.closeButtonLabel - The aria-label for the close button (default: 'Close').
 */

class AvalynxLightbox {
	constructor(selector, options = {}, language = {}) {
		if (!selector) {
			selector = '.avalynx-lightbox';
		}
		if (!selector.startsWith('.') && !selector.startsWith('#')) {
			selector = '.' + selector;
		}

		this.selector = selector;
		this.options = {
			closeable: options.closeable !== undefined ? options.closeable : true,
			closeOnClickOutside: options.closeOnClickOutside !== undefined ? options.closeOnClickOutside : true,
			onClose: options.onClose || null,
			opacity: options.opacity || 80,
			zIndex: options.zIndex || 1500,
			...options
		};

		this.language = {
			closeButtonLabel: language.closeButtonLabel || 'Close',
			...language
		};

		this.setupClickListener();
	}

	setupClickListener() {
		const imgElements = document.querySelectorAll(this.selector);
		if (!imgElements.length) {
			console.error(`Elements with selector ${this.selector} not found.`);
			return;
		}

		imgElements.forEach(imgElement => {
			imgElement.addEventListener('click', () => {
				this.openLightbox(imgElement);
			});
		});
	}

	openLightbox(imgElement) {
		const src = imgElement.src;
		if (!src) {
			console.error('No source found for the selected element.');
			return;
		}

		this.modal = document.createElement('div');
		this.modal.style.position = 'fixed';
		this.modal.style.top = '0';
		this.modal.style.left = '0';
		this.modal.style.width = '100vw';
		this.modal.style.height = '100vh';
		this.modal.style.backgroundColor = `rgba(0, 0, 0, ${this.options.opacity / 100})`;
		this.modal.style.display = 'flex';
		this.modal.style.justifyContent = 'center';
		this.modal.style.alignItems = 'center';
		this.modal.style.zIndex = this.options.zIndex;
		this.modal.classList.add('avalynx-lightbox-modal');

		this.img = document.createElement('img');
		this.img.src = src;
		this.img.style.maxWidth = '90%';
		this.img.style.maxHeight = '90%';
		this.img.style.position = 'relative';

		this.modal.appendChild(this.img);

		if (this.options.closeable) {
			this.addCloseButton();
		}

		if (this.options.closeOnClickOutside) {
			this.modal.addEventListener('click', (e) => {
				if (e.target === this.modal) {
					this.closeLightbox();
				}
			});
		}

		document.body.appendChild(this.modal);
	}

	addCloseButton() {
		this.closeButton = document.createElement('button');
		this.closeButton.classList.add('btn-close', 'btn-close-white');
		this.closeButton.setAttribute('aria-label', this.language.closeButtonLabel);
		this.closeButton.style.position = 'fixed';
		this.closeButton.style.top = '10px';
		this.closeButton.style.right = 'calc(10px + var(--bs-gutter-x, 0px))';

		this.closeButton.addEventListener('click', () => {
			this.closeLightbox();
		});

		this.modal.appendChild(this.closeButton);
	}

	closeLightbox() {
		this.modal.remove();
		if (typeof this.options.onClose === 'function') {
			this.options.onClose();
		}
	}
}
