/**
 * NCSSM Entrepreneurship — Narration System
 * Plays pre-generated audio files from audio/ directory
 * Press 'V' to toggle narration mode with auto-advance
 */

(function() {
  'use strict';

  // State
  let isNarrating = false;
  let currentAudio = null;
  let slideBeingPlayed = null;
  let syncCheckInterval = null;

  // Debug logging
  function log(...args) {
    console.log('[Narration]', ...args);
  }

  // ============================================
  // Helpers
  // ============================================

  function getState() {
    if (typeof window.Presentation !== 'undefined' && window.Presentation.getState) {
      return window.Presentation.getState();
    }
    return null;
  }

  function getCurrentSlide() {
    const state = getState();
    return state ? state.currentSlide : null;
  }

  function isAppendixMode() {
    const state = getState();
    return state ? state.appendixMode : false;
  }

  function getSlideElement(slideNumber) {
    return document.querySelector(`[data-slide="${slideNumber}"]`);
  }

  function getNarrationKey(slideNumber) {
    const slideEl = getSlideElement(slideNumber);
    if (slideEl) {
      const key = slideEl.getAttribute('data-narration-key');
      if (key) return key;
    }
    // Fallback to slide number if no narrationKey specified
    return String(slideNumber);
  }

  function getAudioPath(narrationKey) {
    const classNumber = window.NARRATION_CLASS ?? 0;
    const base = window.__SYLLABUS_URL__ || '/';
    return `${base}audio/class-${classNumber}/slide-${narrationKey}.mp3`;
  }

  // ============================================
  // Audio Playback
  // ============================================

  function stopAudio() {
    if (syncCheckInterval) {
      clearInterval(syncCheckInterval);
      syncCheckInterval = null;
    }

    if (currentAudio) {
      log(`Stopping audio for slide ${slideBeingPlayed}`);
      currentAudio.pause();
      currentAudio.src = ''; // Clear the source
      currentAudio.onended = null;
      currentAudio.onerror = null;
      currentAudio.oncanplay = null;
      currentAudio = null;
    }
    slideBeingPlayed = null;
  }

  function playSlideAudio(onComplete) {
    // Always get the CURRENT slide right now
    const slideToPlay = getCurrentSlide();

    if (!slideToPlay) {
      log('No current slide available');
      return;
    }

    if (isAppendixMode()) {
      log('In appendix mode, not playing');
      return;
    }

    // Stop any existing audio first
    stopAudio();

    const narrationKey = getNarrationKey(slideToPlay);
    log(`>>> Starting audio for slide ${slideToPlay} (narrationKey: ${narrationKey}, current slide: ${getCurrentSlide()})`);

    slideBeingPlayed = slideToPlay;
    const audioPath = getAudioPath(narrationKey);

    const audio = new Audio();
    currentAudio = audio;

    // Start sync checking BEFORE loading audio
    syncCheckInterval = setInterval(() => {
      const nowSlide = getCurrentSlide();
      if (slideBeingPlayed !== null && nowSlide !== slideBeingPlayed) {
        log(`!!! SYNC VIOLATION: Playing ${slideBeingPlayed} but current is ${nowSlide}. Stopping.`);
        stopAudio();
        // Restart narration for correct slide
        if (isNarrating && !isAppendixMode()) {
          setTimeout(() => playSlideAudio(onComplete), 50);
        }
      }
    }, 50); // Check every 50ms

    audio.oncanplay = () => {
      // Double-check we should still play this
      const nowSlide = getCurrentSlide();
      if (nowSlide !== slideBeingPlayed) {
        log(`Slide changed before playback started. Was ${slideBeingPlayed}, now ${nowSlide}. Aborting.`);
        stopAudio();
        if (isNarrating) {
          setTimeout(() => playSlideAudio(onComplete), 50);
        }
        return;
      }
      log(`Audio ready, playing slide ${slideBeingPlayed}`);
    };

    audio.onended = () => {
      const finishedSlide = slideBeingPlayed;
      log(`Audio ended for slide ${finishedSlide}`);
      stopAudio();
      if (onComplete) onComplete(finishedSlide);
    };

    audio.onerror = (e) => {
      const failedSlide = slideBeingPlayed;
      log(`Audio error for slide ${failedSlide}:`, e);
      stopAudio();
      if (onComplete) onComplete(failedSlide);
    };

    // Set source and load
    audio.src = audioPath;
    audio.load();

    audio.play().catch(err => {
      log(`Play error for slide ${slideBeingPlayed}:`, err.message);
      stopAudio();
      if (onComplete) onComplete(slideToPlay);
    });
  }

  // ============================================
  // Narration Flow
  // ============================================

  function narrateCurrentSlide() {
    if (!isNarrating) {
      log('narrateCurrentSlide called but not narrating');
      return;
    }

    const slide = getCurrentSlide();
    log(`narrateCurrentSlide() - current slide is ${slide}`);

    if (!slide || isAppendixMode()) {
      log('Cannot narrate - no slide or in appendix mode');
      return;
    }

    playSlideAudio((finishedSlide) => {
      if (!isNarrating) {
        log('Narration was stopped during playback');
        return;
      }

      const nowSlide = getCurrentSlide();
      log(`Playback complete. Finished: ${finishedSlide}, Now on: ${nowSlide}`);

      // If we're not on the slide that finished, just narrate current
      if (nowSlide !== finishedSlide) {
        log('Slide changed during playback, narrating current');
        setTimeout(narrateCurrentSlide, 100);
        return;
      }

      const state = getState();
      if (!state || state.appendixMode) return;

      if (state.currentSlide < state.totalSlides) {
        log(`Waiting 500ms then advancing from ${state.currentSlide} to ${state.currentSlide + 1}`);
        setTimeout(() => {
          if (!isNarrating) return;

          const checkSlide = getCurrentSlide();
          if (checkSlide !== finishedSlide) {
            log(`User navigated during wait. Now on ${checkSlide}, starting narration there.`);
            narrateCurrentSlide();
            return;
          }

          log(`Advancing to slide ${finishedSlide + 1}`);
          if (window.Presentation && window.Presentation.goToSlide) {
            window.Presentation.goToSlide(finishedSlide + 1);
          }

          setTimeout(() => {
            if (isNarrating) {
              narrateCurrentSlide();
            }
          }, 300);
        }, 500);
      } else {
        log('End of presentation');
        stopNarration();
      }
    });
  }

  // ============================================
  // Start/Stop/Toggle
  // ============================================

  function startNarration() {
    if (isNarrating) return;

    const state = getState();
    if (!state) {
      log('No presentation state');
      return;
    }

    if (state.appendixMode) {
      log('Cannot start in appendix mode');
      return;
    }

    log('=== NARRATION STARTED ===');
    isNarrating = true;
    showNarrationIndicator(true);
    narrateCurrentSlide();
  }

  function stopNarration() {
    log('=== NARRATION STOPPED ===');
    stopAudio();
    isNarrating = false;
    showNarrationIndicator(false);
  }

  function toggleNarration() {
    if (isNarrating) {
      stopNarration();
      return false;
    } else {
      startNarration();
      return true;
    }
  }

  // ============================================
  // Slide Change Handler
  // ============================================

  function onSlideChange(newSlide) {
    log(`onSlideChange called with ${newSlide}, current state slide: ${getCurrentSlide()}`);

    if (!isNarrating) return;

    if (isAppendixMode()) {
      log('Entered appendix - stopping');
      stopNarration();
      return;
    }

    // Stop current audio
    log('Stopping current audio due to slide change');
    stopAudio();

    // Wait for DOM to settle, then narrate
    setTimeout(() => {
      if (isNarrating) {
        log(`After slide change, narrating slide ${getCurrentSlide()}`);
        narrateCurrentSlide();
      }
    }, 150);
  }

  // ============================================
  // UI
  // ============================================

  function showNarrationIndicator(show) {
    let indicator = document.getElementById('narration-indicator');
    if (show) {
      if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'narration-indicator';
        indicator.textContent = 'Narration Active';
        indicator.style.cssText = `
          position: fixed; top: 20px; right: 20px;
          background: rgba(0,0,0,0.85); color: #4ade80;
          padding: 10px 18px; border-radius: 24px;
          font-size: 1rem; font-weight: 500; z-index: 10000;
          pointer-events: none; border: 1px solid rgba(74,222,128,0.3);
        `;
        document.body.appendChild(indicator);
      }
      indicator.style.opacity = '1';
    } else if (indicator) {
      indicator.style.opacity = '0';
      setTimeout(() => indicator.remove(), 300);
    }
  }

  // ============================================
  // Public API
  // ============================================

  window.Narration = {
    toggle: toggleNarration,
    stop: stopNarration,
    isActive: () => isNarrating,
    onSlideChange: onSlideChange,
    getStatus: () => ({
      isNarrating,
      slideBeingPlayed,
      currentSlide: getCurrentSlide(),
      hasAudio: !!currentAudio,
      hasSyncCheck: !!syncCheckInterval
    })
  };

  log('System ready. Press V to toggle.');

})();
