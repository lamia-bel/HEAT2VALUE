import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from simulateur import df as df_sim
from decision import chaleur_reutilisee, decision
from kpi import PUE_liste, CUE_liste, WUE_liste

#On récupere les données nécessaires 

puissance_IT = df_sim["puissance_IT_kW"].to_numpy()
carbone = df_sim["intensite_carbone_gCO2/kWh"].to_numpy()
heures = df_sim["heure"]

#1-Scénario sans l'algorithme de décision
#Ici un data center classique qui rejette toute la chaleur produite par les serveurs
#donc le refroidissement est maximal (30%) et la chaleur réutilisée est nulle et eau consommée est maximale (1.8 L/kWh)
PUE_sans_algo = []
CUE_sans_algo = []
WUE_sans_algo = []

for i in range(96):
    p_IT = puissance_IT[i]      #puissance des serveurs en kW
    co2 = carbone[i]            #intensité carbone en gCO2/kWh
    energie_IT_kWh = p_IT * 0.25

    #1-On calcule le PUE (Power Usage Effectiveness) --> refroidissement classique = 30% de la puissance IT
    refroidissement = p_IT * 0.30
    energie_totale = p_IT + refroidissement
    PUE_sans_algo.append(round(energie_totale / p_IT, 3))

    #2-On calcule le CUE (Carbon Usage Effectiveness) --> pas de chaleur réutilisée donc émissions évitées = 0
    emissions=(energie_totale * 0.25) * co2
    CUE_sans_algo.append(round(emissions / energie_IT_kWh, 3))

    #3-On calcule le WUE (Water Usage Effectiveness) --> climatisation classique = 1.8 L/kWh
    WUE_sans_algo.append(round(1.8))

#2-Scénario avec l'algorithme de décision
#on a déjà calculé les KPI dans le fichier kpi.py donc on peut juste les afficher
#HRR: uniquement pour Heat2Value, on peut calculer le Heat Reuse Ratio (HRR) = chaleur réutilisée / chaleur produite
total_kWh=sum(puissance_IT * 0.95) * 0.25
reutilisee_kWh=sum(chaleur_reutilisee) * 0.25
HRR=round(reutilisee_kWh/total_kWh, 2)

#Le tableau comparatif 

print("=" * 52)
print("   COMPARAISON : SANS vs AVEC HEAT2VALUE")
print("=" * 52)
print(f"{'KPI':<8} {'Sans':>10} {'Avec':>10} {'Gain':>10}")
print("-" * 52)
print(f"{'PUE':<8} {np.mean(PUE_sans_algo):>10.3f} {np.mean(PUE_liste):>10.3f} {np.mean(PUE_sans_algo)-np.mean(PUE_liste):>10.3f}")
print(f"{'CUE':<8} {np.mean(CUE_sans_algo):>10.2f} {np.mean(CUE_liste):>10.2f} {np.mean(CUE_sans_algo)-np.mean(CUE_liste):>10.2f}")
print(f"{'WUE':<8} {np.mean(WUE_sans_algo):>10.2f} {np.mean(WUE_liste):>10.2f} {np.mean(WUE_sans_algo)-np.mean(WUE_liste):>10.2f}")
print(f"{'HRR':<8} {'0.00':>10} {HRR:>10} {HRR:>10}")

#Les graphiques pour visualiser les résultats
fig, axes = plt.subplots(3, 1, figsize=(14, 10))
fig.suptitle("HEAT2VALUE — Comparaison sur 24h", fontsize=14)

axes[0].plot(heures, PUE_sans_algo, color="tomato", linewidth=2, label="Sans HEAT2VALUE")
axes[0].plot(heures, PUE_liste, color="green", linewidth=2, label="Avec HEAT2VALUE")
axes[0].set_ylabel("PUE")
axes[0].set_title("PUE — Plus proche de 1.0 = meilleur")
axes[0].legend()
axes[0].grid(True, alpha=0.3)

axes[1].plot(heures, CUE_sans_algo, color="tomato", linewidth=2, label="Sans HEAT2VALUE")
axes[1].plot(heures, CUE_liste, color="green", linewidth=2, label="Avec HEAT2VALUE")
axes[1].set_ylabel("CUE (gCO2/kWh)")
axes[1].set_title("CUE — Plus bas = moins de carbone")
axes[1].legend()
axes[1].grid(True, alpha=0.3)

axes[2].plot(heures, WUE_sans_algo, color="tomato", linewidth=2, label="Sans HEAT2VALUE")
axes[2].plot(heures, WUE_liste, color="green", linewidth=2, label="Avec HEAT2VALUE")
axes[2].set_ylabel("WUE (L/kWh)")
axes[2].set_title("WUE — Plus bas = moins d'eau")
axes[2].legend()
axes[2].grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig("comparaison_kpi.png", dpi=150)
plt.show()
print("\nGraphique sauvegardé : comparaison_kpi.png")