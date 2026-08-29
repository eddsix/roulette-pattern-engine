# Roulette Pattern Lab v10.0

Self-contained mobile-first web app.

- No IndexedDB dependency.
- Persistent localStorage dataset.
- Automatic v9 localStorage migration when available.
- Real-time spin entry.
- Dedicated spin counter.
- Pocket jumps and CW/CCW history.
- Repeated historical sequence detection (2–10 pockets when enough data exists).
- Jump and joint jump+direction pattern detection.
- 37-pocket ranking and empirical target probability.
- Integer most-probable next jump.
- Configurable ±1 to ±9.
- WIN/LOSS tracking.
- Walk-forward backtest.
- Built-in canvas performance chart.
- Manual day/night mode.
- European roulette colors.
- TXT and JSON backup/restore.

This is an experimental statistical research tool and does not demonstrate future predictability.


## v10.1
- Fixed the render crash that occurred after adding a spin: the UI referenced missing `predCount` and `baseline` elements.
- Prediction/statistics rendering now continues after every spin.
- Baseline percentage is displayed.
- Added a defensive render error indicator instead of silently failing.
- All referenced DOM IDs were validated automatically.


## v10.2
- Fixed horizontal scrolling of recent results and jump/direction strips on mobile.
- Added native horizontal touch scrolling plus a drag fallback.
- Added mobile overscroll/touch behavior so the strip can be swiped without requiring a scrollbar.


## v10.3
- Recent results, recent jumps and recent directions are now bounded horizontal swipe boxes.
- Prediction history is now a bounded vertical swipe box.
- Removed the custom pointer-drag implementation that interfered with normal mobile scrolling.
- Added native touch scrolling, momentum scrolling and scroll snapping.


## v10.4
- Rebuilt the three problematic sections as bounded carousel viewports.
- Latest results, recent jumps and recent directions each have an isolated viewport, native touch/pointer drag and previous/next controls.
- Prediction history remains a bounded vertical scroll container.
- Removed dependence on free-flowing horizontal flex overflow for those three areas.


## v10.5
- Hard-disabled horizontal overflow at document and app level.
- Added `min-width:0` / `minmax(0,...)` to responsive grids.
- Cards and grid children are now width-contained.
- Long pattern text wraps instead of expanding the page.
- Carousel viewports use layout/paint containment.
- Added a runtime viewport-width check during render and resize.
- Horizontal movement is restricted to the dedicated carousel viewports.


## v10.6
- Removed carousel arrows and page indicators from the three horizontal histories.
- Removed the custom carousel transform/drag logic.
- Latest results, recent jumps and recent directions now use native horizontal touch scrolling directly in their own bounded boxes.
- Prediction history remains a bounded vertical native scroll area.
- The page itself remains horizontally locked.


## v10.7
- Removed the faulty `checkLayout()` call and function completely.
- Verified JavaScript syntax.
- Verified that every `$()` DOM reference has a corresponding element.
- Preserved native horizontal touch scrolling for the three history boxes.
- Added a non-blocking global JavaScript error indicator for future diagnostics.


## v11.0 Adaptive Learning
- Signal-family backtesting for sequence, joint jump+direction, jump, pair and transition families.
- Automatic adaptive weights with shrinkage toward neutral for small samples.
- Pattern memory library with repeated-pattern occurrences and next-result distribution.
- Adaptive predictor uses learned family weights and all 37 pockets.
- Existing walk-forward evaluation retained.
