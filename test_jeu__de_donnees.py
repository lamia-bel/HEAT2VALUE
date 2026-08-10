import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from simulateur import generer_simulation
from decision import heat2value
from kpi import calcul_kpi

# chargement du jeu de données test
df_test = pd.read_csv("jeu_de_donnees_test.csv")

resultats = []

# test de chaque scénario
for _, row in df_test.iterrows():

    df_sim = generer_simulation()

    # on remplace le carbone et la température par les valeurs du scénario
    df_sim["intensite_carbone_gCO2/kWh"] = np.full(96, row["carbone_moyen"])
    np.random.seed(42)
    temp = np.linspace(row["temp_min"], row["temp_max"], 96)
    df_sim["temp_exterieure_C"] = temp

    # algorithme et KPI
    df_decision, HRR, _, _, _ = heat2value(df_sim)
    df_kpi = calcul_kpi(df_sim, df_decision)

    resultats.append({
        "scenario": row["description"],
        "PUE": round(df_kpi["PUE"].mean(), 3),
        "CUE": round(df_kpi["CUE_gCO2/kWh"].mean(), 2),
        "WUE": round(df_kpi["WUE_L/kWh"].mean(), 2),
        "HRR": round(HRR, 2),
    })

# affichage du tableau
df_resultats = pd.DataFrame(resultats)
print(df_resultats.to_string(index=False))
df_resultats.to_csv("resultats_tests.csv", index=False)