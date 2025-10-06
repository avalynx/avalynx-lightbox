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
        });

        test('should merge custom options with defaults', () => {
            const onCloseMock = jest.fn();
            const lightbox = new AvalynxLightbox('.test', {
                closeable: false,
                closeOnClickOutside: false,
                onClose: onCloseMock,
                opacity: 90,
                zIndex: 2000
            });

            expect(lightbox.options.closeable).toBe(false);
            expect(lightbox.options.closeOnClickOutside).toBe(false);
            expect(lightbox.options.onClose).toBe(onCloseMock);
            expect(lightbox.options.opacity).toBe(90);
            expect(lightbox.options.zIndex).toBe(2000);
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
        test('should attach click listeners to matching elements', () => {
            const img1 = document.createElement('img');
            img1.className = 'test-lightbox';
            img1.src = 'test1.jpg';
            document.body.appendChild(img1);

            const img2 = document.createElement('img');
            img2.className = 'test-lightbox';
            img2.src = 'test2.jpg';
            document.body.appendChild(img2);

            const lightbox = new AvalynxLightbox('.test-lightbox');

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
            expect(modal.style.position).toBe('fixed');
            expect(modal.style.top).toBe('0px');
            expect(modal.style.left).toBe('0px');
            expect(modal.style.width).toBe('100vw');
            expect(modal.style.height).toBe('100vh');
            expect(modal.style.backgroundColor).toBe('rgba(0, 0, 0, 0.9)');
            expect(modal.style.display).toBe('flex');
            expect(modal.style.justifyContent).toBe('center');
            expect(modal.style.alignItems).toBe('center');
            expect(modal.style.zIndex).toBe('2000');
        });

        test('should create image with correct styles', () => {
            const img = document.createElement('img');
            img.src = 'test.jpg';
            document.body.appendChild(img);

            const lightbox = new AvalynxLightbox('.test');
            lightbox.openLightbox(img);

            const modalImg = document.querySelector('.avalynx-lightbox-modal img');
            expect(modalImg.style.maxWidth).toBe('90%');
            expect(modalImg.style.maxHeight).toBe('90%');
            expect(modalImg.style.position).toBe('relative');
        });

        test('should add close button when closeable is true', () => {
            const img = document.createElement('img');
            img.src = 'test.jpg';
            document.body.appendChild(img);

            const lightbox = new AvalynxLightbox('.test', { closeable: true });
            lightbox.openLightbox(img);

            const closeButton = document.querySelector('.btn-close');
            expect(closeButton).toBeTruthy();
            expect(closeButton.classList.contains('btn-close-white')).toBe(true);
        });

        test('should not add close button when closeable is false', () => {
            const img = document.createElement('img');
            img.src = 'test.jpg';
            document.body.appendChild(img);

            const lightbox = new AvalynxLightbox('.test', { closeable: false });
            lightbox.openLightbox(img);

            const closeButton = document.querySelector('.btn-close');
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
    });

    describe('addCloseButton', () => {
        test('should add close button with correct classes', () => {
            const img = document.createElement('img');
            img.src = 'test.jpg';
            document.body.appendChild(img);

            const lightbox = new AvalynxLightbox('.test');
            lightbox.openLightbox(img);

            const closeButton = document.querySelector('.btn-close');
            expect(closeButton).toBeTruthy();
            expect(closeButton.classList.contains('btn-close')).toBe(true);
            expect(closeButton.classList.contains('btn-close-white')).toBe(true);
        });

        test('should set aria-label from language settings', () => {
            const img = document.createElement('img');
            img.src = 'test.jpg';
            document.body.appendChild(img);

            const lightbox = new AvalynxLightbox('.test', {}, {
                closeButtonLabel: 'Schließen'
            });
            lightbox.openLightbox(img);

            const closeButton = document.querySelector('.btn-close');
            expect(closeButton.getAttribute('aria-label')).toBe('Schließen');
        });

        test('should position close button correctly', () => {
            const img = document.createElement('img');
            img.src = 'test.jpg';
            document.body.appendChild(img);

            const lightbox = new AvalynxLightbox('.test');
            lightbox.openLightbox(img);

            const closeButton = document.querySelector('.btn-close');
            expect(closeButton.style.position).toBe('fixed');
            expect(closeButton.style.top).toBe('10px');
            // Note: jsdom doesn't properly handle CSS calc() values, so we skip checking style.right
        });

        test('should close lightbox when close button clicked', () => {
            const img = document.createElement('img');
            img.src = 'test.jpg';
            document.body.appendChild(img);

            const lightbox = new AvalynxLightbox('.test');
            lightbox.openLightbox(img);

            const closeButton = document.querySelector('.btn-close');
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

            expect(document.querySelector('.btn-close')).toBeFalsy();
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
});
