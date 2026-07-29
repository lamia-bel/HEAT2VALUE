import numpy as np
import pandas as pd


from simulateur import generer_simulation
from decision import heat2value
from kpi import calcul_kpi

#chargement des données réelles prise dans electricity maps
df_reel = pd.read_csv("snapshots_2026-02-10_FR-2024-hourly.csv")

#on renomme les colonnes pour correspondre à celles utilisées dans le simulateur
df_reel = df_reel.rename(columns={
    "Carbon intensity gCO₂eq/kWh (direct)": "carbone",
    "Datetime (UTC)": "heure"
})
df_reel["heure"] = pd.to_datetime(df_reel["heure"])

print("Données réelles chargées :")
print(df_reel.head())
print()

#fonction de test pour une journée donnée

def tester_journee(date, temp_min, temp_max):

    print("="*60)
    print("Test de la journée :", date)
    print("="*60)

    # génération des données simulées
    df_sim = generer_simulation()

    # récupération des données réelles de carbone pour cette journée
    masque = df_reel["heure"].dt.date == pd.to_datetime(date).date()
    df_jour = df_reel.loc[masque]

    if len(df_jour) != 24:
        print("Impossible de tester cette journée.")
        return

    carbone = np.repeat(df_jour["carbone"].to_numpy(),4)

    # remplacement des données simulées
    df_sim["intensite_carbone_gCO2/kWh"] = carbone

    # température du scénario
    np.random.seed(42)

    temperature = np.linspace(temp_min,temp_max,96)

    temperature += np.random.normal(0,0.5,96)

    df_sim["temp_exterieure_C"] = temperature
    
    # Création des 96 instants de la journée testée (toutes les 15 min)
    heures = pd.date_range(
        start=f"{date} 00:00",
        periods=96,
        freq="15min"
    )

    # Remplacement des heures dans le DataFrame
    df_sim["heure"] = heures

    # exécution de l'algorithme
    df_decision, HRR, reutilisee, stockee, rejetee = heat2value(df_sim)
    # calcul des KPI
    df_kpi = calcul_kpi(df_sim,df_decision)

    # affichage
    print()

    print("Décisions prises :")

    print(df_decision["decision"].value_counts())

    print()

    print(f"PUE moyen : {df_kpi['PUE'].mean():.3f}")

    print(f"CUE moyen : {df_kpi['CUE_gCO2/kWh'].mean():.2f}")

    print(f"WUE moyen : {df_kpi['WUE_L/kWh'].mean():.2f}")

    print(f"HRR : {HRR:.2f}%")

    print()

#tests

tester_journee(
    date="2024-01-15",
    temp_min=2,
    temp_max=10
)

tester_journee(
    date="2024-07-15",
    temp_min=22,
    temp_max=35
)

tester_journee(
    date="2024-12-30",
    temp_min=5,
    temp_max=12
)