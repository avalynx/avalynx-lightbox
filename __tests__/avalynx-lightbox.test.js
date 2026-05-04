/**
 * AvalynxLightbox Jest Tests
 * Comprehensive test suite for all important functionality
 */

const AvalynxLightbox = require('../src/js/avalynx-lightbox.js');

describe('AvalynxLightbox', () => {
    let consoleErrorSpy;

    beforeEach(() => {
        // Clear document body
        document.body.innerHTML = '';
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';

        // Mock console.error
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        // Restore console.error
        consoleErrorSpy.mockRestore();

        // Clean up any remaining modals
        const modals = document.querySelectorAll('.avalynx-lightbox-modal');
        modals.forEach(modal => modal.remove());
    });

    describe('Constructor', () => {
        test('should initialize with default selector when none provided', () => {
            const lightbox = new AvalynxLightbox();
            expect(lightbox.selector).toBe('.avalynx-lightbox');
        });

        test('should initialize with custom selector', () => {
            const lightbox = new AvalynxLightbox('.my-lightbox');
            expect(lightbox.selector).toBe('.my-lightbox');
        });

        test('should add dot prefix if selector does not start with . or #', () => {
            const lightbox = new AvalynxLightbox('my-lightbox');
            expect(lightbox.selector).toBe('.my-lightbox');
        });

        test('should keep # prefix for id selectors', () => {
            const lightbox = new AvalynxLightbox('#my-lightbox');
            expect(lightbox.selector).toBe('#my-lightbox');
        });

        test('should initialize with default options', () => {
            const lightbox = new AvalynxLightbox('.test');

            expect(lightbox.options.closeable).toBe(true);
            expect(lightbox.options.closeOnClickOutside).toBe(true);
            expect(lightbox.options.onClose).toBe(null);
            expect(lightbox.options.opacity).toBe(80);
            expect(lightbox.options.zIndex).toBe(1500);
            expect(lightbox.options.allowBackgroundScrolling).toBe(false);
        });

        test('should merge custom options with defaults', () => {
            const onCloseMock = jest.fn();
            const lightbox = new AvalynxLightbox('.test', {
                closeable: false,
                closeOnClickOutside: false,
                onClose: onCloseMock,
                opacity: 90,
                zIndex: 2000,
                allowBackgroundScrolling: true
            });

            expect(lightbox.options.closeable).toBe(false);
            expect(lightbox.options.closeOnClickOutside).toBe(false);
            expect(lightbox.options.onClose).toBe(onCloseMock);
            expect(lightbox.options.opacity).toBe(90);
            expect(lightbox.options.zIndex).toBe(2000);
            expect(lightbox.options.allowBackgroundScrolling).toBe(true);
        });

        test('should initialize with default language settings', () => {
            const lightbox = new AvalynxLightbox('.test');
            expect(lightbox.language.closeButtonLabel).toBe('Close');
        });

        test('should merge custom language settings', () => {
            const lightbox = new AvalynxLightbox('.test', {}, {
                closeButtonLabel: 'Schließen'
            });
            expect(lightbox.language.closeButtonLabel).toBe('Schließen');
        });

        test('should call setupClickListener on initialization', () => {
            const img = document.createElement('img');
            img.className = 'test-lightbox';
            img.src = 'test.jpg';
            document.body.appendChild(img);

            const lightbox = new AvalynxLightbox('.test-lightbox');

            // The setupClickListener should have been called and attached event listeners
            expect(lightbox.selector).toBe('.test-lightbox');
        });
    });

    describe('setupClickListener', () => {
        test('should attach click listeners to matching elements and add target class', () => {
            const img1 = document.createElement('img');
            img1.className = 'test-lightbox';
            img1.src = 'test1.jpg';
            document.body.appendChild(img1);

            const img2 = document.createElement('img');
            img2.className = 'test-lightbox';
            img2.src = 'test2.jpg';
            document.body.appendChild(img2);

            const lightbox = new AvalynxLightbox('.test-lightbox');
            expect(img1.classList.contains('avalynx-lightbox-target')).toBe(true);
            expect(img2.classList.contains('avalynx-lightbox-target')).toBe(true);

            // Mock openLightbox to verify it's called
            lightbox.openLightbox = jest.fn();

            img1.click();
            expect(lightbox.openLightbox).toHaveBeenCalledWith(img1);
        });

        test('should log error if no elements found with selector', () => {
            const lightbox = new AvalynxLightbox('.non-existent');

            expect(consoleErrorSpy).toHaveBeenCalledWith(
                'Elements with selector .non-existent not found.'
            );
        });

        test('should prevent default behavior on click', () => {
            const link = document.createElement('a');
            link.className = 'test-lightbox';
            link.href = 'test.jpg';
            document.body.appendChild(link);

            const lightbox = new AvalynxLightbox('.test-lightbox');

            const event = new Event('click', { bubbles: true, cancelable: true });
            const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

            link.dispatchEvent(event);

            expect(preventDefaultSpy).toHaveBeenCalled();
        });
    });

    describe('openLightbox', () => {
        test('should open lightbox for img element', () => {
            const img = document.createElement('img');
            img.src = 'test.jpg';
            document.body.appendChild(img);

            const lightbox = new AvalynxLightbox('.test');
            lightbox.openLightbox(img);

            const modal = document.querySelector('.avalynx-lightbox-modal');
            expect(modal).toBeTruthy();
            expect(modal.querySelector('img').src).toContain('test.jpg');
        });

        test('should open lightbox for anchor element', () => {
            const link = document.createElement('a');
            link.href = 'test.jpg';
            document.body.appendChild(link);

            const lightbox = new AvalynxLightbox('.test');
            lightbox.openLightbox(link);

            const modal = document.querySelector('.avalynx-lightbox-modal');
            expect(modal).toBeTruthy();
            expect(modal.querySelector('img').src).toContain('test.jpg');
        });

        test('should log error if no source found', () => {
            const div = document.createElement('div');
            document.body.appendChild(div);

            const lightbox = new AvalynxLightbox('.test');
            lightbox.openLightbox(div);

            expect(consoleErrorSpy).toHaveBeenCalledWith(
                'No source found for the selected element.'
            );
        });

        test('should create modal with correct styles', () => {
            const img = document.createElement('img');
            img.src = 'test.jpg';
            document.body.appendChild(img);

            const lightbox = new AvalynxLightbox('.test', {
                opacity: 90,
                zIndex: 2000
            });
            lightbox.openLightbox(img);

            const modal = document.querySelector('.avalynx-lightbox-modal');
            expect(modal.style.backgroundColor).toBe('rgba(0, 0, 0, 0.9)');
            expect(modal.style.zIndex).toBe('2000');
            expect(modal.classList.contains('avalynx-lightbox-modal')).toBe(true);
        });

        test('should create image with correct source', () => {
            const img = document.createElement('img');
            img.src = 'test.jpg';
            document.body.appendChild(img);

            const lightbox = new AvalynxLightbox('.test');
            lightbox.openLightbox(img);

            const modalImg = document.querySelector('.avalynx-lightbox-modal img');
            expect(modalImg.src).toContain('test.jpg');
        });

        test('should add close button when closeable is true', () => {
            const img = document.createElement('img');
            img.src = 'test.jpg';
            document.body.appendChild(img);

            const lightbox = new AvalynxLightbox('.test', { closeable: true });
            lightbox.openLightbox(img);

            const closeButton = document.querySelector('[aria-label="Close"]');
            expect(closeButton).toBeTruthy();
            expect(closeButton.classList.contains('text-white')).toBe(true);
        });

        test('should not add close button when closeable is false', () => {
            const img = document.createElement('img');
            img.src = 'test.jpg';
            document.body.appendChild(img);

            const lightbox = new AvalynxLightbox('.test', { closeable: false });
            lightbox.openLightbox(img);

            const closeButton = document.querySelector('[aria-label="Close"]');
            expect(closeButton).toBeFalsy();
        });

        test('should close on click outside when closeOnClickOutside is true', () => {
            const img = document.createElement('img');
            img.src = 'test.jpg';
            document.body.appendChild(img);

            const lightbox = new AvalynxLightbox('.test', { closeOnClickOutside: true });
            lightbox.openLightbox(img);

            const modal = document.querySelector('.avalynx-lightbox-modal');
            expect(modal).toBeTruthy();

            // Click on modal background
            modal.click();

            // Modal should be removed
            expect(document.querySelector('.avalynx-lightbox-modal')).toBeFalsy();
        });

        test('should not close on click outside when closeOnClickOutside is false', () => {
            const img = document.createElement('img');
            img.src = 'test.jpg';
            document.body.appendChild(img);

            const lightbox = new AvalynxLightbox('.test', { closeOnClickOutside: false });
            lightbox.openLightbox(img);

            const modal = document.querySelector('.avalynx-lightbox-modal');
            expect(modal).toBeTruthy();

            // Click on modal background
            modal.click();

            // Modal should still exist
            expect(document.querySelector('.avalynx-lightbox-modal')).toBeTruthy();
        });

        test('should not close when clicking on image', () => {
            const img = document.createElement('img');
            img.src = 'test.jpg';
            document.body.appendChild(img);

            const lightbox = new AvalynxLightbox('.test', { closeOnClickOutside: true });
            lightbox.openLightbox(img);

            const modalImg = document.querySelector('.avalynx-lightbox-modal img');
            modalImg.click();

            // Modal should still exist because we clicked on the image, not the background
            expect(document.querySelector('.avalynx-lightbox-modal')).toBeTruthy();
        });

        test('should replace an existing modal when opening another image', () => {
            const img1 = document.createElement('img');
            img1.className = 'gallery-reopen';
            img1.src = 'test1.jpg';
            document.body.appendChild(img1);

            const img2 = document.createElement('img');
            img2.className = 'gallery-reopen';
            img2.src = 'test2.jpg';
            document.body.appendChild(img2);

            const lightbox = new AvalynxLightbox('.gallery-reopen');
            lightbox.openLightbox(img1);
            lightbox.openLightbox(img2);

            expect(document.querySelectorAll('.avalynx-lightbox-modal')).toHaveLength(1);
            expect(document.querySelector('.avalynx-lightbox-modal img').src).toContain('test2.jpg');
        });
    });

    describe('addCloseButton', () => {
        test('should add close button with correct classes', () => {
            const img = document.createElement('img');
            img.src = 'test.jpg';
            document.body.appendChild(img);

            const lightbox = new AvalynxLightbox('.test');
            lightbox.openLightbox(img);

            const closeButton = document.querySelector('[aria-label="Close"]');
            expect(closeButton).toBeTruthy();
            expect(closeButton.classList.contains('btn')).toBe(true);
            expect(closeButton.classList.contains('btn-link')).toBe(true);
            expect(closeButton.classList.contains('text-white')).toBe(true);
            expect(closeButton.classList.contains('avalynx-lightbox-btn-close')).toBe(true);
        });

        test('should set aria-label from language settings', () => {
            const img = document.createElement('img');
            img.src = 'test.jpg';
            document.body.appendChild(img);

            const lightbox = new AvalynxLightbox('.test', {}, {
                closeButtonLabel: 'Schließen'
            });
            lightbox.openLightbox(img);

            const closeButton = document.querySelector('[aria-label="Schließen"]');
            expect(closeButton.getAttribute('aria-label')).toBe('Schließen');
        });

        test('should position close button correctly', () => {
            const img = document.createElement('img');
            img.src = 'test.jpg';
            document.body.appendChild(img);

            const lightbox = new AvalynxLightbox('.test');
            lightbox.openLightbox(img);

            const closeButton = document.querySelector('[aria-label="Close"]');
            expect(closeButton.classList.contains('avalynx-lightbox-btn-close')).toBe(true);
        });

        test('should close lightbox when close button clicked', () => {
            const img = document.createElement('img');
            img.src = 'test.jpg';
            document.body.appendChild(img);

            const lightbox = new AvalynxLightbox('.test');
            lightbox.openLightbox(img);

            const closeButton = document.querySelector('[aria-label="Close"]');
            closeButton.click();

            // Modal should be removed
            expect(document.querySelector('.avalynx-lightbox-modal')).toBeFalsy();
        });
    });

    describe('closeLightbox', () => {
        test('should remove modal from DOM', () => {
            const img = document.createElement('img');
            img.src = 'test.jpg';
            document.body.appendChild(img);

            const lightbox = new AvalynxLightbox('.test');
            lightbox.openLightbox(img);

            expect(document.querySelector('.avalynx-lightbox-modal')).toBeTruthy();

            lightbox.closeLightbox();

            expect(document.querySelector('.avalynx-lightbox-modal')).toBeFalsy();
        });

        test('should call onClose callback if provided', () => {
            const onCloseMock = jest.fn();
            const img = document.createElement('img');
            img.src = 'test.jpg';
            document.body.appendChild(img);

            const lightbox = new AvalynxLightbox('.test', {
                onClose: onCloseMock
            });
            lightbox.openLightbox(img);
            lightbox.closeLightbox();

            expect(onCloseMock).toHaveBeenCalledTimes(1);
        });

        test('should not throw error if onClose is not a function', () => {
            const img = document.createElement('img');
            img.src = 'test.jpg';
            document.body.appendChild(img);

            const lightbox = new AvalynxLightbox('.test', {
                onClose: 'not a function'
            });
            lightbox.openLightbox(img);

            expect(() => lightbox.closeLightbox()).not.toThrow();
        });

        test('should not call onClose if not provided', () => {
            const img = document.createElement('img');
            img.src = 'test.jpg';
            document.body.appendChild(img);

            const lightbox = new AvalynxLightbox('.test');
            lightbox.openLightbox(img);

            // Should not throw error
            expect(() => lightbox.closeLightbox()).not.toThrow();
        });

        test('should call onClose even when no modal is open', () => {
            const onCloseMock = jest.fn();
            const lightbox = new AvalynxLightbox('.test', {
                onClose: onCloseMock
            });

            lightbox.closeLightbox();

            expect(onCloseMock).toHaveBeenCalledTimes(1);
        });
    });

    describe('Integration Tests', () => {
        test('should handle multiple lightbox instances', () => {
            const img1 = document.createElement('img');
            img1.className = 'lightbox1';
            img1.src = 'test1.jpg';
            document.body.appendChild(img1);

            const img2 = document.createElement('img');
            img2.className = 'lightbox2';
            img2.src = 'test2.jpg';
            document.body.appendChild(img2);

            const lightbox1 = new AvalynxLightbox('.lightbox1');
            const lightbox2 = new AvalynxLightbox('.lightbox2');

            lightbox1.openLightbox(img1);
            expect(document.querySelectorAll('.avalynx-lightbox-modal').length).toBe(1);
            expect(document.querySelector('.avalynx-lightbox-modal img').src).toContain('test1.jpg');

            lightbox1.closeLightbox();
            expect(document.querySelectorAll('.avalynx-lightbox-modal').length).toBe(0);

            lightbox2.openLightbox(img2);
            expect(document.querySelectorAll('.avalynx-lightbox-modal').length).toBe(1);
            expect(document.querySelector('.avalynx-lightbox-modal img').src).toContain('test2.jpg');
        });

        test('should work with multiple images using same selector', () => {
            const img1 = document.createElement('img');
            img1.className = 'gallery';
            img1.src = 'test1.jpg';
            document.body.appendChild(img1);

            const img2 = document.createElement('img');
            img2.className = 'gallery';
            img2.src = 'test2.jpg';
            document.body.appendChild(img2);

            const lightbox = new AvalynxLightbox('.gallery');

            img1.click();
            expect(document.querySelector('.avalynx-lightbox-modal img').src).toContain('test1.jpg');
            lightbox.closeLightbox();

            img2.click();
            expect(document.querySelector('.avalynx-lightbox-modal img').src).toContain('test2.jpg');
        });

        test('should handle mixed anchor and img elements', () => {
            const link = document.createElement('a');
            link.className = 'lightbox-item';
            link.href = 'test1.jpg';
            document.body.appendChild(link);

            const img = document.createElement('img');
            img.className = 'lightbox-item';
            img.src = 'test2.jpg';
            document.body.appendChild(img);

            const lightbox = new AvalynxLightbox('.lightbox-item');

            link.click();
            expect(document.querySelector('.avalynx-lightbox-modal img').src).toContain('test1.jpg');
            lightbox.closeLightbox();

            img.click();
            expect(document.querySelector('.avalynx-lightbox-modal img').src).toContain('test2.jpg');
        });

        test('should handle opacity value correctly', () => {
            const img = document.createElement('img');
            img.src = 'test.jpg';
            document.body.appendChild(img);

            const lightbox = new AvalynxLightbox('.test', { opacity: 50 });
            lightbox.openLightbox(img);

            const modal = document.querySelector('.avalynx-lightbox-modal');
            expect(modal.style.backgroundColor).toBe('rgba(0, 0, 0, 0.5)');
        });

        test('should handle edge case opacity values', () => {
            const img = document.createElement('img');
            img.src = 'test.jpg';
            document.body.appendChild(img);

            // Test with 0 opacity
            const lightbox1 = new AvalynxLightbox('.test', { opacity: 0 });
            lightbox1.openLightbox(img);
            let modal = document.querySelector('.avalynx-lightbox-modal');
            expect(modal.style.backgroundColor).toBe('rgba(0, 0, 0, 0)');
            lightbox1.closeLightbox();

            // Test with 100 opacity - jsdom may render as rgb(0,0,0) instead of rgba(0,0,0,1)
            const lightbox2 = new AvalynxLightbox('.test', { opacity: 100 });
            lightbox2.openLightbox(img);
            modal = document.querySelector('.avalynx-lightbox-modal');
            expect(['rgba(0, 0, 0, 1)', 'rgb(0, 0, 0)']).toContain(modal.style.backgroundColor);
        });

        test('should maintain state across multiple open/close cycles', () => {
            const img = document.createElement('img');
            img.className = 'test-img';
            img.src = 'test.jpg';
            document.body.appendChild(img);

            const onCloseMock = jest.fn();
            const lightbox = new AvalynxLightbox('.test-img', {
                onClose: onCloseMock
            });

            // First cycle
            img.click();
            expect(document.querySelector('.avalynx-lightbox-modal')).toBeTruthy();
            lightbox.closeLightbox();
            expect(document.querySelector('.avalynx-lightbox-modal')).toBeFalsy();
            expect(onCloseMock).toHaveBeenCalledTimes(1);

            // Second cycle
            img.click();
            expect(document.querySelector('.avalynx-lightbox-modal')).toBeTruthy();
            lightbox.closeLightbox();
            expect(document.querySelector('.avalynx-lightbox-modal')).toBeFalsy();
            expect(onCloseMock).toHaveBeenCalledTimes(2);
        });
    });

    describe('Edge Cases', () => {
        test('should handle empty string selector gracefully', () => {
            const lightbox = new AvalynxLightbox('');
            expect(lightbox.selector).toBe('.avalynx-lightbox');
        });

        test('should handle null options', () => {
            const lightbox = new AvalynxLightbox('.test', null);
            expect(lightbox.options.closeable).toBe(true);
            expect(lightbox.options.opacity).toBe(80);
        });

        test('should handle undefined options', () => {
            const lightbox = new AvalynxLightbox('.test', undefined);
            expect(lightbox.options.closeable).toBe(true);
            expect(lightbox.options.opacity).toBe(80);
        });

        test('should handle null language', () => {
            const lightbox = new AvalynxLightbox('.test', {}, null);
            expect(lightbox.language.closeButtonLabel).toBe('Close');
        });

        test('should handle undefined language', () => {
            const lightbox = new AvalynxLightbox('.test', {}, undefined);
            expect(lightbox.language.closeButtonLabel).toBe('Close');
        });

        test('should handle closeable option explicitly set to false', () => {
            const img = document.createElement('img');
            img.src = 'test.jpg';
            document.body.appendChild(img);

            const lightbox = new AvalynxLightbox('.test', { closeable: false });
            lightbox.openLightbox(img);

            expect(document.querySelector('[aria-label="Close"]')).toBeFalsy();
        });

        test('should handle closeOnClickOutside option explicitly set to false', () => {
            const img = document.createElement('img');
            img.src = 'test.jpg';
            document.body.appendChild(img);

            const lightbox = new AvalynxLightbox('.test', { closeOnClickOutside: false });
            lightbox.openLightbox(img);

            const modal = document.querySelector('.avalynx-lightbox-modal');
            modal.click();

            // Modal should still exist
            expect(document.querySelector('.avalynx-lightbox-modal')).toBeTruthy();
        });

        test('should handle elements without src or href', () => {
            const div = document.createElement('div');
            div.className = 'test-element';
            document.body.appendChild(div);

            const lightbox = new AvalynxLightbox('.test-element');
            lightbox.openLightbox(div);

            expect(consoleErrorSpy).toHaveBeenCalledWith(
                'No source found for the selected element.'
            );
            expect(document.querySelector('.avalynx-lightbox-modal')).toBeFalsy();
        });
    });

    describe('Gallery Mode', () => {
        let galleryImg1, galleryImg2, galleryLightbox;

        beforeEach(() => {
            galleryImg1 = document.createElement('img');
            galleryImg1.className = 'gallery-item';
            galleryImg1.src = 'test1.jpg';
            document.body.appendChild(galleryImg1);

            galleryImg2 = document.createElement('img');
            galleryImg2.className = 'gallery-item';
            galleryImg2.src = 'test2.jpg';
            document.body.appendChild(galleryImg2);

            galleryLightbox = new AvalynxLightbox('.gallery-item', { gallery: true });
        });

        test('should initialize with gallery option true', () => {
            expect(galleryLightbox.options.gallery).toBe(true);
        });

        test('should show navigation buttons in gallery mode', () => {
            galleryImg1.click();
            expect(document.querySelector('[aria-label="Previous"]')).toBeTruthy();
            expect(document.querySelector('[aria-label="Next"]')).toBeTruthy();
        });

        test('should not show navigation buttons if gallery mode is false', () => {
            document.body.innerHTML = '';
            const img = document.createElement('img');
            img.className = 'single';
            img.src = 'test.jpg';
            document.body.appendChild(img);

            new AvalynxLightbox('.single', { gallery: false });
            img.click();
            expect(document.querySelector('[aria-label="Previous"]')).toBeFalsy();
            expect(document.querySelector('[aria-label="Next"]')).toBeFalsy();
        });

        test('should navigate to next image on next button click', () => {
            galleryImg1.click();
            const nextButton = document.querySelector('[aria-label="Next"]');
            nextButton.click();
            expect(document.querySelector('.avalynx-lightbox-modal img').src).toContain('test2.jpg');
        });

        test('should navigate to previous image on prev button click', () => {
            galleryImg1.click();
            const prevButton = document.querySelector('[aria-label="Previous"]');
            prevButton.click();
            expect(document.querySelector('.avalynx-lightbox-modal img').src).toContain('test2.jpg'); // wraps around
        });

        test('should navigate on arrow keys', () => {
            galleryImg1.click();
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
            expect(document.querySelector('.avalynx-lightbox-modal img').src).toContain('test2.jpg');

            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
            expect(document.querySelector('.avalynx-lightbox-modal img').src).toContain('test1.jpg');
        });

        test('should ignore unrelated keys while gallery modal is open', () => {
            galleryImg1.click();
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

            expect(document.querySelector('.avalynx-lightbox-modal img').src).toContain('test1.jpg');
        });

        test('should close on Escape key', () => {
            galleryImg1.click();
            expect(document.querySelector('.avalynx-lightbox-modal')).toBeTruthy();
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
            expect(document.querySelector('.avalynx-lightbox-modal')).toBeFalsy();
        });

        test('should navigate gallery anchors using href values', () => {
            document.body.innerHTML = '';

            const link1 = document.createElement('a');
            link1.className = 'gallery-link';
            link1.href = 'anchor1.jpg';
            document.body.appendChild(link1);

            const link2 = document.createElement('a');
            link2.className = 'gallery-link';
            link2.href = 'anchor2.jpg';
            document.body.appendChild(link2);

            const linkLightbox = new AvalynxLightbox('.gallery-link', { gallery: true });

            link1.click();
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

            expect(document.querySelector('.avalynx-lightbox-modal img').src).toContain('anchor2.jpg');
            expect(linkLightbox.currentIndex).toBe(1);
        });
    });

    describe('Background Scrolling', () => {
        test('should disable background scrolling by default when lightbox is opened and handle scrollbar', () => {
            document.body.style.paddingRight = '10px';
            document.body.style.overflow = 'scroll';
            const img = document.createElement('img');
            img.className = 'scroll-test';
            img.src = 'test.jpg';
            document.body.appendChild(img);

            // Mock scrollbar presence
            const originalInnerWidth = window.innerWidth;
            const originalClientWidth = document.documentElement.clientWidth;

            Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });
            Object.defineProperty(document.documentElement, 'clientWidth', { writable: true, configurable: true, value: 1000 });

            // Mock getComputedStyle for body padding
            const originalGetComputedStyle = window.getComputedStyle;
            window.getComputedStyle = jest.fn().mockReturnValue({ paddingRight: '10px' });

            const lightbox = new AvalynxLightbox('.scroll-test');
            img.click();

            expect(document.body.style.overflow).toBe('hidden');
            // scrollbarWidth = 1024 - 1000 = 24
            // 10px + 24px = 34px
            expect(document.body.style.paddingRight).toBe('34px');

            lightbox.closeLightbox();
            expect(document.body.style.overflow).toBe('scroll');
            expect(document.body.style.paddingRight).toBe('10px');

            // Clean up mock
            Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth });
            Object.defineProperty(document.documentElement, 'clientWidth', { value: originalClientWidth });
            window.getComputedStyle = originalGetComputedStyle;
        });

        test('should disable background scrolling but not set paddingRight when no scrollbar is present', () => {
            const img = document.createElement('img');
            img.className = 'scroll-test-no-bar';
            img.src = 'test.jpg';
            document.body.appendChild(img);

            // Mock no scrollbar
            const originalInnerWidth = window.innerWidth;
            const originalClientWidth = document.documentElement.clientWidth;

            Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1000 });
            Object.defineProperty(document.documentElement, 'clientWidth', { writable: true, configurable: true, value: 1000 });

            const lightbox = new AvalynxLightbox('.scroll-test-no-bar');
            img.click();

            expect(document.body.style.overflow).toBe('hidden');
            expect(document.body.style.paddingRight).toBe('');

            lightbox.closeLightbox();
            expect(document.body.style.overflow).toBe('');

            // Clean up mock
            Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth });
            Object.defineProperty(document.documentElement, 'clientWidth', { value: originalClientWidth });
        });

        test('should not disable background scrolling when allowBackgroundScrolling is true', () => {
            const img = document.createElement('img');
            img.className = 'scroll-test-allow';
            img.src = 'test.jpg';
            document.body.appendChild(img);

            const lightbox = new AvalynxLightbox('.scroll-test-allow', {
                allowBackgroundScrolling: true
            });
            img.click();

            expect(document.body.style.overflow).toBe('');
            lightbox.closeLightbox();
            expect(document.body.style.overflow).toBe('');
        });

        test('should not restore overflow or padding if they were never saved', () => {
            const lightbox = new AvalynxLightbox('.test');
            document.body.style.overflow = 'scroll';
            document.body.style.paddingRight = '50px';

            lightbox.closeLightbox();

            expect(document.body.style.overflow).toBe('scroll');
            expect(document.body.style.paddingRight).toBe('50px');
        });

        test('should not restore overflow when original overflow becomes undefined before closing', () => {
            const img = document.createElement('img');
            img.className = 'scroll-test-missing-overflow';
            img.src = 'test.jpg';
            document.body.appendChild(img);
            document.body.style.overflow = 'hidden';

            const lightbox = new AvalynxLightbox('.scroll-test-missing-overflow');
            img.click();

            lightbox.originalOverflow = undefined;
            lightbox.closeLightbox();

            expect(document.body.style.overflow).toBe('hidden');
        });
    });
});
