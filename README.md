# Roulette Pattern Lab v13.1

Built from the supplied v12.1 source.

The live prediction engine remains the stable baseline: adaptive learning does
not alter its live ranking in this version.

Incremental learning is independent for Sequence, Joint, Jump, Pair and
Transition. Each family accumulates tests, exact hits, ±1..±9 hits, mean error,
variance and an adaptive learned weight. The expensive recursive historical
backtest is replaced by accumulated statistics.

The dashboard includes a model-performance panel so the learning can be
observed without changing the proven prediction behavior.
