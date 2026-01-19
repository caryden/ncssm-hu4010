/**
 * NCSSM Entrepreneurship - Shared Presentation JavaScript
 *
 * Handles navigation, TOC overlay, appendix overlay, and keyboard bindings.
 * Each presentation includes this and provides slide content and configuration.
 */

(function() {
    'use strict';

    // ===== State =====
    const state = {
        currentSlide: 1,
        totalSlides: 0,
        totalAppendixSlides: 0,
        appendixMode: false,
        currentAppendixSlide: 1,
        tocVisible: false,
        appendixVisible: false,
        sections: [],  // Populated from slide data
        syllabusUrl: '../index.html'
    };

    // ===== DOM Elements =====
    let elements = {};

    // ===== Initialization =====
    function init() {
        // Cache DOM elements
        // Note: slides includes ALL slides (main + appendix) for unified navigation
        elements = {
            presentation: document.querySelector('.presentation'),
            slides: document.querySelectorAll('.slide'),
            mainSlides: document.querySelectorAll('.slide:not([data-appendix="true"])'),
            appendixSlides: document.querySelectorAll('.slide[data-appendix="true"]'),
            progressBar: document.querySelector('.progress-bar'),
            slideCounter: document.querySelector('.slide-counter'),
            currentCounter: document.querySelector('.slide-counter .current'),
            totalCounter: document.querySelector('.slide-counter .total'),
            tocOverlay: document.getElementById('toc-overlay'),
            tocContent: document.getElementById('toc-content'),
            tocClose: document.getElementById('toc-close'),
            appendixOverlay: document.getElementById('appendix-overlay'),
            appendixContent: document.getElementById('appendix-content'),
            appendixClose: document.getElementById('appendix-close'),
            backdrop: document.getElementById('overlay-backdrop')
        };

        // Count slides - main slides for progress, but all slides are navigable
        state.totalSlides = elements.slides.length;
        state.mainSlideCount = elements.mainSlides.length;
        state.totalAppendixSlides = elements.appendixSlides ? elements.appendixSlides.length : 0;
        state.appendixStartIndex = state.mainSlideCount + 1;  // First appendix slide number

        // Update counter display (show main slide count, not including appendix)
        if (elements.totalCounter) {
            elements.totalCounter.textContent = state.mainSlideCount;
        }

        // Build sections from slide data
        buildSections();

        // Build TOC
        buildTOC();

        // Build appendix panel
        buildAppendixPanel();

        // Set up event listeners
        setupEventListeners();

        // Go to first slide (or hash)
        // Use setTimeout to allow custom scripts to override goToSlide first
        setTimeout(() => {
            handleHashNavigation();

            // Mark first slide as active if no hash navigation happened
            if (state.currentSlide === 1) {
                window.Presentation.goToSlide(1);
            }
        }, 0);
    }

    // ===== Build Sections from Slides =====
    function buildSections() {
        const sections = [];
        let currentSection = null;

        // Build sections from main slides only (not appendix)
        elements.mainSlides.forEach((slide, index) => {
            const slideNum = index + 1;
            const sectionName = slide.dataset.section;
            const title = slide.dataset.title || getSlideTitle(slide);

            if (sectionName && sectionName !== (currentSection ? currentSection.name : null)) {
                currentSection = {
                    name: sectionName,
                    start: slideNum,
                    slides: []
                };
                sections.push(currentSection);
            }

            if (currentSection) {
                currentSection.slides.push({
                    num: slideNum,
                    title: title
                });
            } else {
                // Slides before any section
                if (sections.length === 0 || sections[0].name !== 'Opening') {
                    sections.unshift({
                        name: 'Opening',
                        start: 1,
                        slides: []
                    });
                    currentSection = sections[0];
                }
                currentSection.slides.push({
                    num: slideNum,
                    title: title
                });
            }
        });

        state.sections = sections;
    }

    // ===== Get Slide Title =====
    function getSlideTitle(slide) {
        // Try to find a title in the slide
        const h1 = slide.querySelector('h1');
        const h2 = slide.querySelector('h2');
        const primary = slide.querySelector('.primary');
        const statement = slide.querySelector('.statement');

        if (h1) return truncate(h1.textContent, 40);
        if (h2) return truncate(h2.textContent, 40);
        if (primary) return truncate(primary.textContent, 40);
        if (statement) return truncate(statement.textContent, 40);

        return 'Slide ' + (Array.from(elements.mainSlides).indexOf(slide) + 1);
    }

    function truncate(text, maxLength) {
        text = text.trim();
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength - 3) + '...';
    }

    // ===== Build TOC =====
    function buildTOC() {
        if (!elements.tocContent) return;

        let html = '';

        state.sections.forEach(section => {
            html += `<div class="toc-section">`;
            html += `<div class="toc-section-title">${section.name}</div>`;

            section.slides.forEach(slide => {
                html += `<div class="toc-item" data-slide="${slide.num}">
                    <span class="slide-num">${slide.num}.</span> ${slide.title}
                </div>`;
            });

            html += `</div>`;
        });

        elements.tocContent.innerHTML = html;

        // Add click handlers
        elements.tocContent.querySelectorAll('.toc-item').forEach(item => {
            item.addEventListener('click', () => {
                const slideNum = parseInt(item.dataset.slide);
                window.Presentation.goToSlide(slideNum);
                hideTOC();
            });
        });
    }

    // ===== Build Appendix Panel =====
    // Shows a TOC-style list of appendix slides; clicking navigates to that slide
    function buildAppendixPanel() {
        if (!elements.appendixContent || state.totalAppendixSlides === 0) return;

        let html = '<div class="appendix-toc">';

        // Convert to array to find actual indices
        const allSlides = Array.from(elements.slides);

        elements.appendixSlides.forEach((slide, index) => {
            // Find the actual index of this slide in the full slides array
            const slideIndex = allSlides.indexOf(slide);
            const slideNum = slideIndex + 1;  // Convert to 1-based
            const title = slide.dataset.title || `Appendix ${index + 1}`;

            html += `<div class="appendix-item" data-slide="${slideNum}">
                <span class="appendix-num">${index + 1}.</span> ${title}
            </div>`;
        });

        html += '</div>';
        elements.appendixContent.innerHTML = html;

        // Add click handlers to navigate to appendix slides
        elements.appendixContent.querySelectorAll('.appendix-item').forEach(item => {
            item.addEventListener('click', () => {
                const slideNum = parseInt(item.dataset.slide);
                window.Presentation.goToSlide(slideNum);
                hideAppendix();
            });
        });
    }

    // ===== Navigation =====
    function goToSlide(n) {
        if (n < 1 || n > state.totalSlides) return;

        // Remove active from all slides
        elements.slides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev');
            if (i + 1 < n) {
                slide.classList.add('prev');
            }
        });

        // Mark new slide as active
        const targetSlide = elements.slides[n - 1];
        if (targetSlide) {
            targetSlide.classList.add('active');
        }

        state.currentSlide = n;

        // Check if we're in appendix territory (slide has data-appendix attribute)
        const isAppendix = targetSlide && targetSlide.dataset.appendix === 'true';

        // Update progress bar (max out at 100% for main content)
        if (elements.progressBar) {
            if (isAppendix) {
                elements.progressBar.style.width = '100%';
            } else {
                const progress = state.mainSlideCount > 1
                    ? ((n - 1) / (state.mainSlideCount - 1)) * 100
                    : 100;
                elements.progressBar.style.width = `${progress}%`;
            }
        }

        // Update counter (show "A1", "A2" etc. for appendix slides)
        if (elements.currentCounter) {
            if (isAppendix) {
                // Find the index within appendix slides
                const appendixArray = Array.from(elements.appendixSlides);
                const appendixIndex = appendixArray.indexOf(targetSlide);
                const appendixNum = appendixIndex + 1;
                elements.currentCounter.textContent = `A${appendixNum}`;
            } else {
                elements.currentCounter.textContent = n;
            }
        }

        // Update TOC highlighting
        updateTOCHighlight();

        // Update appendix highlighting
        updateAppendixHighlight();

        // Update URL hash
        history.replaceState(null, null, `#${n}`);

        // Trigger slide-specific animations
        animateSlide(targetSlide);
    }

    function nextSlide() {
        // Use window.Presentation.goToSlide so custom overrides work
        window.Presentation.goToSlide(state.currentSlide + 1);
    }

    function prevSlide() {
        // Use window.Presentation.goToSlide so custom overrides work
        window.Presentation.goToSlide(state.currentSlide - 1);
    }

    // ===== TOC Overlay =====
    function showTOC() {
        if (elements.tocOverlay) {
            elements.tocOverlay.classList.add('visible');
            state.tocVisible = true;
        }
        if (elements.backdrop) {
            elements.backdrop.classList.add('visible');
        }
        updateTOCHighlight();
    }

    function hideTOC() {
        if (elements.tocOverlay) {
            elements.tocOverlay.classList.remove('visible');
            state.tocVisible = false;
        }
        if (elements.backdrop && !state.appendixVisible) {
            elements.backdrop.classList.remove('visible');
        }
    }

    function toggleTOC() {
        if (state.tocVisible) {
            hideTOC();
        } else {
            hideAppendix();
            showTOC();
        }
    }

    function updateTOCHighlight() {
        if (!elements.tocContent) return;

        elements.tocContent.querySelectorAll('.toc-item').forEach(item => {
            const slideNum = parseInt(item.dataset.slide);
            item.classList.toggle('active', slideNum === state.currentSlide);
        });
    }

    function updateAppendixHighlight() {
        if (!elements.appendixContent) return;

        elements.appendixContent.querySelectorAll('.appendix-item').forEach(item => {
            const slideNum = parseInt(item.dataset.slide);
            item.classList.toggle('active', slideNum === state.currentSlide);
        });
    }

    // ===== Appendix Overlay =====
    function showAppendix() {
        if (state.totalAppendixSlides === 0) return;

        if (elements.appendixOverlay) {
            elements.appendixOverlay.classList.add('visible');
            state.appendixVisible = true;
        }
        if (elements.backdrop) {
            elements.backdrop.classList.add('visible');
        }
        updateAppendixHighlight();
    }

    function hideAppendix() {
        if (elements.appendixOverlay) {
            elements.appendixOverlay.classList.remove('visible');
            state.appendixVisible = false;
        }
        if (elements.backdrop && !state.tocVisible) {
            elements.backdrop.classList.remove('visible');
        }
    }

    function toggleAppendix() {
        if (state.appendixVisible) {
            hideAppendix();
        } else {
            hideTOC();
            showAppendix();
        }
    }

    // ===== Go to Syllabus =====
    function goToSyllabus() {
        window.location.href = state.syllabusUrl;
    }

    // ===== Fullscreen =====
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    // ===== Hash Navigation =====
    function handleHashNavigation() {
        if (window.location.hash) {
            const hash = window.location.hash.slice(1);
            const slideNum = parseInt(hash);
            if (slideNum >= 1 && slideNum <= state.totalSlides) {
                window.Presentation.goToSlide(slideNum);
            }
        }
    }

    // ===== Slide Animations =====
    function animateSlide(slide) {
        if (!slide) return;

        // Helper to animate elements with stagger
        function animateElements(selector, delay = 150) {
            const elements = slide.querySelectorAll(selector);
            elements.forEach((el, i) => {
                el.classList.remove('visible');
                setTimeout(() => {
                    el.classList.add('visible');
                }, delay * (i + 1));
            });
        }

        // Content list items (slower stagger)
        animateElements('.content-list li', 200);

        // Cards (various types across presentations)
        animateElements('.card, .metric-card, .category-card, .technique-card', 150);
        animateElements('.myth-card', 200);
        animateElements('.question-card', 150);
        animateElements('.dual-card', 300);
        animateElements('.homework-item', 200);

        // Timeline elements
        animateElements('.timeline-item', 200);
        animateElements('.timeline-node', 200);
        animateElements('.timeline-arrow', 200);

        // Grid items
        animateElements('.icon-item', 100);
        animateElements('.criteria-card', 200);

        // Class-specific elements
        animateElements('.journey-step', 150);
        animateElements('.value-card', 150);
        animateElements('.pro-tip', 200);
        animateElements('.checklist-item', 150);
        animateElements('.qa-item', 200);
        animateElements('.pitch-section', 100);
        animateElements('.slack-step', 200);
        animateElements('.roadmap-phase', 200);
        animateElements('.criteria-item', 150);
        animateElements('.stone', 300);
        animateElements('.model-card', 150);
        animateElements('.pricing-option', 200);
        animateElements('.threshold-item', 150);
        animateElements('.test-card', 150);
        animateElements('.mvbp-component', 200);

        // Trigger custom visualization if present
        const vizId = slide.dataset.visualization;
        if (vizId && typeof window[vizId] === 'function') {
            window[vizId]();
        }
    }

    // ===== Event Listeners =====
    function setupEventListeners() {
        // Keyboard navigation
        document.addEventListener('keydown', handleKeydown);

        // Click navigation
        document.addEventListener('click', handleClick);

        // TOC close button
        if (elements.tocClose) {
            elements.tocClose.addEventListener('click', hideTOC);
        }

        // Appendix close button
        if (elements.appendixClose) {
            elements.appendixClose.addEventListener('click', hideAppendix);
        }

        // Backdrop click
        if (elements.backdrop) {
            elements.backdrop.addEventListener('click', () => {
                hideTOC();
                hideAppendix();
            });
        }

        // Hash change
        window.addEventListener('hashchange', handleHashNavigation);
    }

    function handleKeydown(e) {
        // Ignore if user is typing
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        switch (e.key) {
            // Slide Navigation
            case 'ArrowRight':
            case ' ':
                e.preventDefault();
                nextSlide();
                break;

            case 'ArrowLeft':
                e.preventDefault();
                prevSlide();
                break;

            case 'ArrowDown':
                e.preventDefault();
                nextSlide();
                break;

            case 'ArrowUp':
                e.preventDefault();
                prevSlide();
                break;

            // Jump to start/end
            case 'Home':
                e.preventDefault();
                window.Presentation.goToSlide(1);
                break;

            case 'End':
                e.preventDefault();
                window.Presentation.goToSlide(state.totalSlides);
                break;

            // TOC toggle (T key)
            case 't':
            case 'T':
                e.preventDefault();
                toggleTOC();
                break;

            // Syllabus (S key)
            case 's':
            case 'S':
                e.preventDefault();
                goToSyllabus();
                break;

            // Appendix toggle (A key)
            case 'a':
            case 'A':
                e.preventDefault();
                toggleAppendix();
                break;

            // Fullscreen (F key)
            case 'f':
            case 'F':
                e.preventDefault();
                toggleFullscreen();
                break;

            // Close overlays (Escape)
            case 'Escape':
                e.preventDefault();
                if (state.tocVisible) {
                    hideTOC();
                } else if (state.appendixVisible) {
                    hideAppendix();
                }
                break;

            // Enter to close appendix (alternative to Escape)
            case 'Enter':
                if (state.appendixVisible) {
                    e.preventDefault();
                    hideAppendix();
                }
                break;
        }
    }

    function handleClick(e) {
        // Don't handle clicks if an overlay is visible
        if (state.tocVisible || state.appendixVisible) return;

        // Don't handle clicks on interactive elements
        if (e.target.closest('a, button, input, .toc-overlay, .appendix-overlay')) return;

        // Click on right half to advance, left half to go back
        if (e.clientX > window.innerWidth / 2) {
            nextSlide();
        } else {
            prevSlide();
        }
    }

    // ===== Public API =====
    window.Presentation = {
        init: init,
        goToSlide: goToSlide,
        nextSlide: nextSlide,
        prevSlide: prevSlide,
        showTOC: showTOC,
        hideTOC: hideTOC,
        toggleTOC: toggleTOC,
        showAppendix: showAppendix,
        hideAppendix: hideAppendix,
        toggleAppendix: toggleAppendix,
        goToSyllabus: goToSyllabus,
        getState: () => ({ ...state })
    };

    // =========================================================================
    // D3 VISUALIZATION UTILITIES
    // =========================================================================
    // Shared utilities to create consistent, responsive D3 visualizations
    // that properly fill their containers and don't break when CSS changes.
    // =========================================================================

    /**
     * Create a responsive SVG visualization
     * @param {string} containerId - The ID of the container element
     * @param {object} options - Configuration options
     * @param {number} options.padding - Padding percentage (0-1), default 0.05 (5%)
     * @param {string} options.aspectRatio - 'container' (match container) or 'square'
     * @returns {object|null} - { svg, width, height, bounds, scale } or null if already exists
     */
    function createVisualization(containerId, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Visualization container '${containerId}' not found`);
            return null;
        }

        // Prevent duplicate SVGs
        if (container.querySelector('svg')) {
            return null;
        }

        // Get actual container dimensions
        const rect = container.getBoundingClientRect();
        const containerWidth = rect.width || 800;
        const containerHeight = rect.height || 400;

        // Use container dimensions for viewBox (1:1 mapping)
        const width = containerWidth;
        const height = containerHeight;

        // Calculate padding and bounds
        const paddingPercent = options.padding !== undefined ? options.padding : 0.05;
        const paddingX = width * paddingPercent;
        const paddingY = height * paddingPercent;

        const bounds = {
            left: paddingX,
            right: width - paddingX,
            top: paddingY,
            bottom: height - paddingY,
            width: width - 2 * paddingX,
            height: height - 2 * paddingY,
            centerX: width / 2,
            centerY: height / 2
        };

        // Create SVG
        const svg = d3.select(container)
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', `0 0 ${width} ${height}`)
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .style('display', 'block');  // Prevent inline spacing issues

        // Useful scale value (smaller of width/height for circular layouts)
        const scale = Math.min(bounds.width, bounds.height);

        return {
            svg,
            width,
            height,
            bounds,
            scale,
            container
        };
    }

    /**
     * Calculate radial layout positions for nodes around a center
     * @param {object} center - { x, y } center point
     * @param {number} radius - Distance from center
     * @param {number} count - Number of nodes
     * @param {number} startAngle - Starting angle in degrees (default -90, top)
     * @returns {Array} - Array of { x, y, angle } positions
     */
    function radialLayout(center, radius, count, startAngle = -90) {
        const positions = [];
        const angleStep = 360 / count;

        for (let i = 0; i < count; i++) {
            const angleDeg = startAngle + i * angleStep;
            const angleRad = (angleDeg * Math.PI) / 180;
            positions.push({
                x: center.x + Math.cos(angleRad) * radius,
                y: center.y + Math.sin(angleRad) * radius,
                angle: angleDeg
            });
        }

        return positions;
    }

    /**
     * Standard node sizes based on visualization scale
     * @param {number} scale - The visualization scale (min of width/height)
     * @returns {object} - Recommended sizes for different elements
     */
    function getNodeSizes(scale) {
        return {
            // Primary/central node
            primaryRadius: scale * 0.12,
            // Secondary nodes (connected to primary)
            secondaryRadius: scale * 0.08,
            // Tertiary/outer nodes
            tertiaryRadius: scale * 0.06,
            // Ring distances
            innerRing: scale * 0.25,
            outerRing: scale * 0.4,
            // Font sizes (in pixels, will be converted to rem)
            labelSize: Math.max(14, scale * 0.04),
            smallLabelSize: Math.max(12, scale * 0.03)
        };
    }

    /**
     * Validate that a point is within bounds
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {number} radius - Radius of element (for circular elements)
     * @param {object} bounds - Bounds object from createVisualization
     * @param {string} label - Label for warning message
     * @returns {boolean} - True if within bounds
     */
    function validateBounds(x, y, radius, bounds, label = 'Element') {
        const inBounds = (
            x - radius >= bounds.left &&
            x + radius <= bounds.right &&
            y - radius >= bounds.top &&
            y + radius <= bounds.bottom
        );

        if (!inBounds) {
            console.warn(`${label} may be clipped: (${x.toFixed(1)}, ${y.toFixed(1)}) r=${radius.toFixed(1)}, bounds: [${bounds.left.toFixed(1)}-${bounds.right.toFixed(1)}, ${bounds.top.toFixed(1)}-${bounds.bottom.toFixed(1)}]`);
        }

        return inBounds;
    }

    // Export visualization utilities
    window.Visualization = {
        create: createVisualization,
        radialLayout: radialLayout,
        getNodeSizes: getNodeSizes,
        validateBounds: validateBounds
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
