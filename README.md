# Roulette Pattern Lab v12.1

Changes from v12.0:
- Latest item is displayed first in Últimos resultados, Saltos recientes and Direcciones recientes.
- Prediction ranking now applies a mild anti-repeat regularizer to pockets repeatedly appearing in the last spins or repeatedly selected by the model.
- Repetition is penalized, not forbidden: strong historical pattern evidence can still overcome the regularizer.
- Existing persistence key and all other v12.0 features are retained.
