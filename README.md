# Roulette Pattern Lab v6.0

## What changed
- Uses physical wheel positions.
- Calculates signed pocket jumps.
- Classifies each result transition as CW, CCW, or SAME using the shorter circular path.
- Displays recent jump and direction history.
- Learns conditional next-jump distributions.
- Learns conditional direction distributions.
- Learns combined jump+direction patterns.
- Learns pocket-pair transitions.
- Scores all 37 pockets instead of forcing a small fixed set.
- Shows empirical target probability and expected jump.
- Tracks Exact, ±1, ±2, ±3, ±4, ±5 and direction accuracy.
- Stores predictions before the next result.
- Persists spins/predictions in IndexedDB.
- Exports TXT and full JSON backups.

## Data compatibility
The database name remains `RoulettePatternLabV4` so the existing v4/v5 data store can be read by this version.

## Note
This is an experimental statistical research tool. It does not prove that roulette outcomes are predictable and does not automate betting.


## v6.1 hotfix
Fixed a runtime error in the UI that stopped rendering after spins were saved. Added a visible saved timestamp and a neutral prior so the 37-pocket distribution is always available once the minimum history is reached.
