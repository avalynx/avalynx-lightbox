/**
 * AvalynxLightbox
 *
 * AvalynxLightbox is a simple, lightweight, and easy-to-use lightbox library. Based on Bootstrap >=5.3 without any framework dependencies.
 *
 * @version 1.0.6
 * @license MIT
 * @author https://github.com/avalynx/avalynx-lightbox/graphs/contributors
 * @website https://github.com/avalynx/
 * @repository https://github.com/avalynx/avalynx-lightbox.git
 * @bugs https://github.com/avalynx/avalynx-lightbox/issues
 *
 * @param {string} selector - The CSS selector for the image to display in the lightbox (default: '.avalynx-lightbox').
 * @param {object} options - An object containing the following keys:
 * @param {boolean} options.closeable - Whether the lightbox can be closed by the user (default: true).
 * @param {boolean} options.closeOnClickOutside - Whether the lightbox will close when the user clicks outside the image (default: true).
 * @param {function} options.onClose - A callback function to execute when the lightbox is closed (default: null).
 * @param {number} options.opacity - The background opacity as an integer between 0 and 100 (default: 80).
 * @param {number} options.zIndex - The z-index of the lightbox (default: 1500).
 * @param {boolean} options.gallery - Whether the images should be displayed as a gallery (default: false).
 * @param {boolean} options.allowBackgroundScrolling - Whether to allow background scrolling when the lightbox is open (default: false).
 *
 * @param {object} language - An object containing the following keys:
 * @param {string} language.closeButtonLabel - The aria-label for the close button (default: 'Close').
 * @param {string} language.prevButtonLabel - The aria-label for the previous button (default: 'Previous').
 * @param {string} language.nextButtonLabel - The aria-label for the next button (default: 'Next').
 */

import * as bootstrap from 'bootstrap';

export class AvalynxLightbox {
    constructor(selector, options = {}, language = {}) {
        if (!selector) {
            selector = '.avalynx-lightbox';
        }
        if (!selector.startsWith('.') && !selector.startsWith('#')) {
            selector = '.' + selector;
        }
        this.selector = selector;
        if (options === null || typeof options !== 'object') {
            options = {};
        }
        this.options = {
            closeable: options.closeable !== undefined ? options.closeable : true,
            closeOnClickOutside: options.closeOnClickOutside !== undefined ? options.closeOnClickOutside : true,
            onClose: options.onClose || null,
            opacity: options.opacity || 80,
            zIndex: options.zIndex || 1500,
            gallery: options.gallery !== undefined ? options.gallery : false,
            allowBackgroundScrolling: options.allowBackgroundScrolling !== undefined ? options.allowBackgroundScrolling : false,
            ...options
        };
        if (language === null || typeof language !== 'object') {
            language = {};
        }
        this.language = {
            closeButtonLabel: language.closeButtonLabel || 'Close',
            prevButtonLabel: language.prevButtonLabel || 'Previous',
            nextButtonLabel: language.nextButtonLabel || 'Next',
            ...language
        };
        this.elements = [];
        this.currentIndex = 0;
        this.originalPaddingRight = undefined;
        this.originalOverflow = undefined;
        this.setupClickListener();
        this.setupKeyboardListener();
    }

    setupClickListener() {
        this.elements = Array.from(document.querySelectorAll(this.selector));
        if (!this.elements.length) {
            console.error(`Elements with selector ${this.selector} not found.`);
            return;
        }

        this.elements.forEach((element, index) => {
            element.classList.add('avalynx-lightbox-target');
            element.addEventListener('click', (e) => {
                e.preventDefault();
                this.currentIndex = index;
                this.openLightbox(element);
            });
        });
    }

    setupKeyboardListener() {
        document.addEventListener('keydown', (e) => {
            if (!this.modal) return;
            if (e.key === 'Escape') {
                this.closeLightbox();
            } else if (this.options.gallery) {
                if (e.key === 'ArrowRight') {
                    this.nextImage();
                } else if (e.key === 'ArrowLeft') {
                    this.prevImage();
                }
            }
        });
    }

    openLightbox(element) {
        const src = element.tagName === 'A' ? element.href : element.src;
        if (!src) {
            console.error('No source found for the selected element.');
            return;
        }

        if (this.modal) {
            this.modal.remove();
        }

        this.modal = document.createElement('div');
        this.modal.style.backgroundColor = `rgba(0, 0, 0, ${this.options.opacity / 100})`;
        this.modal.style.zIndex = this.options.zIndex;
        this.modal.classList.add('avalynx-lightbox-modal');

        if (!this.options.allowBackgroundScrolling) {
            const hasScrollbar = window.innerWidth > document.documentElement.clientWidth;
            if (hasScrollbar) {
                const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
                this.originalPaddingRight = document.body.style.paddingRight;
                const currentPadding = window.getComputedStyle(document.body).paddingRight;
                document.body.style.paddingRight = `${parseFloat(currentPadding) + scrollbarWidth}px`;
            }
            this.originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
        }

        this.img = document.createElement('img');
        this.img.src = src;

        this.modal.appendChild(this.img);

        if (this.options.closeable) {
            this.addCloseButton();
        }

        if (this.options.gallery && this.elements.length > 1) {
            this.addNavigationButtons();
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

    addNavigationButtons() {
        this.prevButton = document.createElement('button');
        this.prevButton.classList.add('btn', 'btn-link', 'text-white', 'avalynx-lightbox-btn-prev');
        this.prevButton.setAttribute('aria-label', this.language.prevButtonLabel);
        this.prevButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.prevImage();
        });

        this.nextButton = document.createElement('button');
        this.nextButton.classList.add('btn', 'btn-link', 'text-white', 'avalynx-lightbox-btn-next');
        this.nextButton.setAttribute('aria-label', this.language.nextButtonLabel);
        this.nextButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.nextImage();
        });

        this.modal.appendChild(this.prevButton);
        this.modal.appendChild(this.nextButton);
    }

    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.elements.length;
        this.updateImage();
    }

    prevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.elements.length) % this.elements.length;
        this.updateImage();
    }

    updateImage() {
        const element = this.elements[this.currentIndex];
        const src = element.tagName === 'A' ? element.href : element.src;
        this.img.src = src;
    }

    addCloseButton() {
        this.closeButton = document.createElement('button');
        this.closeButton.classList.add('btn', 'btn-link', 'text-white', 'avalynx-lightbox-btn-close');
        this.closeButton.setAttribute('aria-label', this.language.closeButtonLabel);

        this.closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeLightbox();
        });

        this.modal.appendChild(this.closeButton);
    }

    closeLightbox() {
        if (this.modal) {
            this.modal.remove();
            this.modal = null;
            if (!this.options.allowBackgroundScrolling) {
                if (this.originalPaddingRight !== undefined) {
                    document.body.style.paddingRight = this.originalPaddingRight;
                    this.originalPaddingRight = undefined;
                }
                if (this.originalOverflow !== undefined) {
                    document.body.style.overflow = this.originalOverflow;
                    this.originalOverflow = undefined;
                }
            }
        }
        if (typeof this.options.onClose === 'function') {
            this.options.onClose();
        }
    }
}

/* istanbul ignore next */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AvalynxLightbox;
}
