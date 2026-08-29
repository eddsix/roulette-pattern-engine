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
