# Roulette Pattern Lab v8.0

Major upgrade focused on pattern intelligence.

- Historical repeated sequences, length 2–10.
- Alerts when a sequence currently being formed has appeared before.
- Historical next-result distribution for activated sequences.
- Jump patterns.
- Joint jump + direction patterns.
- Current-pocket transition matrix.
- CW/CCW conditioning.
- All 37 pockets ranked.
- Empirical target probability.
- Integer most-probable jump plus expected jump as secondary statistic.
- Configurable ±1 through ±9.
- WIN/LOSS per prediction.
- European roulette colors.
- Day/night mode.
- Dashboard and walk-forward backtest.
- TXT and JSON backups.
- Existing IndexedDB name retained: RoulettePatternLabV4.

Pattern recognition is experimental and does not establish future predictability.


## v8.1
- Spanish-only interface.
- Manual day/night switch with persistent local preference.
- Button press animation.
- More robust chronological rendering of saved spins.
- Full-history deletion button with confirmation.
- Existing IndexedDB name preserved.


## v8.2
- Fixed persistent manual day/night mode restoration after page refresh.
- Number buttons are created before IndexedDB initialization, so a database problem cannot hide the input controls.
- Added cache-busting script version to ensure GitHub Pages loads the new JavaScript.
