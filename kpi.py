import numpy as np
import pandas as pd
from simulateur import df as df_sim
from decision import df as df_dec, chaleur_reutilisee, chaleur_stockee, chaleur_rejetee, decision

#On récupere les données nécessaires pour le calcul des KPI
puissance_IT = df_sim["puissance_IT_kW"].to_numpy()
carbone = df_sim["intensite_carbone_gCO2/kWh"].to_numpy()

#les listes pour stocker les KPI calculés à chaque pas de temps
PUE_liste= []
CUE_liste= []
WUE_liste= []

#on fait une boucle sur chaque pas de temps pour calculer les KPI
for i in range(96):

    p_IT = puissance_IT[i]      #puissance des serveurs en kW
    co2 = carbone[i]            #intensité carbone en gCO2/kWh
    dec = decision[i]           #décision prise par l'algorithme
    ch_reutilisee = chaleur_reutilisee[i]   #chaleur réutilisée en kW

    #1-On calcule le PUE (Power Usage Effectiveness)
    #PUE= énergie totale du batiùment / énergie IT
    #la consommation de refroidissement dépend de l'option choisie
    #réutilisation --> 5% : refroidissement minimal
    #stockage --> 10% : refroidissement moyen(pompes de stockage)
    #rejet --> 30% : refroidissement maximal (climatisation classique)

    if "Réutilisation" in dec:
        refroidissement = p_IT * 0.05
    elif "Stockage" in dec:
        refroidissement = p_IT * 0.10
    else:
        refroidissement = p_IT * 0.30

    energie_totale = p_IT + refroidissement
    PUE = energie_totale / p_IT
    PUE_liste.append(round(PUE, 3))

    #2-On calcule le CUE (Carbon Usage Effectiveness)
    #CUE= émissions nettes / énergie IT
    #émissions évitées = chaleur réutilisée * intensité carbone(0.20 kgCO2/kWh)
    #émissions nettes = émissions totales - émissions évitées
    #le 0.25 est pour convertir les kW en kWh sur 15 min (0.25h)

    emissions_totales = (energie_totale * 0.25) * co2
    emissions_evitees = (ch_reutilisee * 0.25) * 200
    emissions_nettes = max(0, emissions_totales - emissions_evitees)
    energie_IT_kWh = p_IT * 0.25
    CUE = emissions_nettes / energie_IT_kWh
    CUE_liste.append(round(CUE, 3))

    #3-On calcule le WUE (Water Usage Effectiveness)
    #WUE= consommation d'eau / énergie IT
    #la consommation d'eau dépend de l'option choisie
    #réutilisation --> 0.5 L/kWh : refroidissement minimal
    #stockage --> 0.8  L/kWh : refroidissement moyen(pompes de stockage)
    #rejet --> 1.8 L/kWh : refroidissement maximal (climatisation classique)

    if "Réutilisation" in dec:
        eau = energie_IT_kWh * 0.5
    elif "Stockage" in dec:
        eau = energie_IT_kWh * 0.8
    else:
        eau = energie_IT_kWh * 1.8

    WUE = eau / energie_IT_kWh
    WUE_liste.append(round(WUE, 3))

    #Creation d'un dataframe pour stocker les KPI calculés
df_KPI = pd.DataFrame({
    "heure": df_sim["heure"],
    "decision": decision,
    "PUE": PUE_liste,
    "CUE_gCO2/kWh": CUE_liste,
    "WUE_L/kWh": WUE_liste,
})

print(df_KPI.head(10).to_string(index=False))
print()

#les moyennes sur 24h 
print(f"PUE moyen : {np.mean(PUE_liste):.3f}")
print(f"CUE moyen : {np.mean(CUE_liste):.3f} gCO2/kWh")
print(f"WUE moyen : {np.mean(WUE_liste):.3f} L/kWh")  