import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from simulateur import df as df_sim
from decision import decision, chaleur_reutilisee
from kpi import PUE_liste, CUE_liste, WUE_liste

# ============================================================
# CHARGEMENT DES DONNÉES RÉELLES ELECTRICITY MAPS FRANCE 2024
# ============================================================
df_reel = pd.read_csv("snapshots_2026-02-10_FR-2024-hourly.csv")

df_reel = df_reel.rename(columns={
    "Carbon intensity gCO₂eq/kWh (direct)": "carbone",
    "Datetime (UTC)": "heure"
})
df_reel["heure"] = pd.to_datetime(df_reel["heure"])

print("Données réelles chargées :")
print(f"  Carbone min   : {df_reel['carbone'].min():.1f} gCO2/kWh")
print(f"  Carbone max   : {df_reel['carbone'].max():.1f} gCO2/kWh")
print(f"  Carbone moyen : {df_reel['carbone'].mean():.1f} gCO2/kWh")
print()

# ============================================================
# FONCTION DE TEST : on réutilise la charge et chaleur
# du simulateur, on remplace juste le carbone par les données réelles
# ============================================================

def tester_journee(date, temp_min, temp_max, label):

    # récupération des données réelles de carbone pour cette journée
    masque = df_reel["heure"].dt.date == pd.to_datetime(date).date()
    df_jour = df_reel[masque].reset_index(drop=True)

    # données horaires → répétées 4 fois pour avoir des mesures toutes les 15min
    carbone_reel = np.repeat(df_jour["carbone"].to_numpy(), 4)[:96]

    # on réutilise la charge et la chaleur du simulateur
    puissance_IT = df_sim["puissance_IT_kW"].to_numpy()
    chaleur_produite = df_sim["chaleur_produite_kW"].to_numpy()

    # température simulée pour cette journée
    np.random.seed(42)
    temp = np.linspace(temp_min, temp_max, 96) + np.random.normal(0, 0.5, 96)
    temp = np.clip(temp, temp_min - 2, temp_max + 2)

    # paramètres
    SEUIL_TEMP = 18.0
    SEUIL_CARBONE = 30.0  # adapté aux vraies valeurs françaises (10-50 gCO2/kWh)
    CAPACITE_RESERVOIR = 5000.0
    reservoir = 0.0

    # listes de résultats
    decisions = []
    ch_reutilisee = []
    PUE_avec = []
    CUE_avec = []
    WUE_avec = []
    PUE_sans = []
    CUE_sans = []
    WUE_sans = []

    for i in range(96):
        chaleur = chaleur_produite[i]
        t = temp[i]
        co2 = carbone_reel[i]
        p_IT = puissance_IT[i]
        energie_IT_kWh = p_IT * 0.25

        # DÉCISION HEAT2VALUE
        if t < SEUIL_TEMP:
            reutilisee = chaleur * 0.80
            rejetee = chaleur * 0.20
            dec = "Réutilisation"
        elif co2 > SEUIL_CARBONE and reservoir < CAPACITE_RESERVOIR * 0.90:
            stockee = chaleur * 0.70
            reservoir += stockee * 0.25
            reservoir = min(reservoir, CAPACITE_RESERVOIR)
            reutilisee = 0
            dec = "Stockage"
        else:
            reutilisee = 0
            dec = "Rejet"

        decisions.append(dec)
        ch_reutilisee.append(reutilisee)

        # KPI AVEC HEAT2VALUE
        if "Réutilisation" in dec:
            refroid = p_IT * 0.05
        elif "Stockage" in dec:
            refroid = p_IT * 0.10
        else:
            refroid = p_IT * 0.30

        energie_totale = p_IT + refroid
        PUE_avec.append(round(energie_totale / p_IT, 3))

        emissions_totales = (energie_totale * 0.25) * co2
        emissions_evitees = (reutilisee * 0.25) * 200
        emissions_nettes = max(0, emissions_totales - emissions_evitees)
        CUE_avec.append(round(emissions_nettes / energie_IT_kWh, 3))

        if "Réutilisation" in dec:
            WUE_avec.append(0.5)
        elif "Stockage" in dec:
            WUE_avec.append(0.8)
        else:
            WUE_avec.append(1.8)

        # KPI SANS HEAT2VALUE
        energie_totale_sans = p_IT + (p_IT * 0.30)
        PUE_sans.append(round(energie_totale_sans / p_IT, 3))
        emissions_sans = (energie_totale_sans * 0.25) * co2
        CUE_sans.append(round(emissions_sans / energie_IT_kWh, 3))
        WUE_sans.append(1.8)

    # HRR
    total_kWh = sum(chaleur_produite) * 0.25
    reutilisee_kWh = sum(ch_reutilisee) * 0.25
    HRR = round(reutilisee_kWh / total_kWh, 2)

    # affichage
    print(f"{'='*50}")
    print(f"SCÉNARIO : {label} ({date})")
    print(f"{'='*50}")
    print(f"Température      : {temp_min}°C → {temp_max}°C")
    print(f"Carbone réel moyen : {carbone_reel.mean():.1f} gCO2/kWh")
    print()
    print(f"Décisions prises :")
    for opt in ["Réutilisation", "Stockage", "Rejet"]:
        count = decisions.count(opt)
        print(f"  {opt} : {count} fois ({count/96*100:.0f}%)")
    print()
    print(f"{'KPI':<8} {'Sans':>10} {'Avec':>10} {'Gain':>10}")
    print("-" * 40)
    print(f"{'PUE':<8} {np.mean(PUE_sans):>10.3f} {np.mean(PUE_avec):>10.3f} {np.mean(PUE_sans)-np.mean(PUE_avec):>10.3f}")
    print(f"{'CUE':<8} {np.mean(CUE_sans):>10.3f} {np.mean(CUE_avec):>10.3f} {np.mean(CUE_sans)-np.mean(CUE_avec):>10.3f}")
    print(f"{'WUE':<8} {np.mean(WUE_sans):>10.2f} {np.mean(WUE_avec):>10.2f} {np.mean(WUE_sans)-np.mean(WUE_avec):>10.2f}")
    print(f"{'HRR':<8} {'0.00':>10} {HRR:>10}")
    print()

# ============================================================
# LES 3 SCÉNARIOS DE TEST
# ============================================================

# Scénario 1 : jour d'hiver → réutilisation maximale
tester_journee("2024-01-15", temp_min=2,  temp_max=10,  label="Hiver")

# Scénario 2 : jour d'été → stockage et rejet
tester_journee("2024-07-15", temp_min=20, temp_max=35,  label="Été")

# Scénario 3 : pic de carbone décembre → cas extrême
tester_journee("2024-12-30", temp_min=5,  temp_max=12,  label="Pic carbone décembre")