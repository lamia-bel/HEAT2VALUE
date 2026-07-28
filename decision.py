import numpy as np
import pandas as pd

from simulateur import df

#récuperation des colonnes du dataframe
heures = df["heure"]
charge = df["charge_%"].to_numpy()
puissance_IT = df["puissance_IT_kW"].to_numpy()
chaleur_produite = df["chaleur_produite_kW"].to_numpy()
temp = df["temp_exterieure_C"].to_numpy()
carbone = df["intensite_carbone_gCO2/kWh"].to_numpy()

#l'algorithme de décision HEAT2VALUE
# les paramètres fixes de l'algorithme 
SEUIL_TEMP = 18.0        # En dessous de 18°C → besoin de chauffage
SEUIL_CARBONE = 150.0    # Au dessus de 150 gCO2/kWh → carbone élevé
CAPACITE_RESERVOIR = 5000.0  # Réservoir thermique max en kWh
reservoir = 0.0          # Réservoir commence vide

#les listes pour stocker les résultats de l'algorithme à chaque pas de temps
decision = []          
chaleur_reutilisee = []    
chaleur_stockee = []
chaleur_rejetee = []


#on fait une boucle sur chaque pas de temps pour prendre une décision
for i in range(96):
    chaleur=chaleur_produite[i]
    t=temp[i]
    co2=carbone[i]

    #option 1: si la température est basse on utilise la chaleur pour chauffer le bâtiment
    if t < SEUIL_TEMP:
        #on valorise 80% et 20% perte 
        reutilisee = chaleur * 0.8
        stockee = 0
        rejetee = chaleur * 0.2
        decision.append("Réutilisation de la chaleur pour chauffage")

    #option 2: si le carbone est élevé et le réservoir n'est pas plein on stocke la chaleur
    elif co2 > SEUIL_CARBONE and reservoir < CAPACITE_RESERVOIR * 0.90:
        stockee = chaleur * 0.70
        reservoir += stockee * 0.25
        reservoir = min(reservoir, CAPACITE_RESERVOIR)
        reutilisee = 0
        rejetee = chaleur * 0.30
        decision.append("Stockage de la chaleur dans le réservoir thermique")

    #option 3 : on fait rien et on rejette la chaleur
    else:
        reutilisee = 0
        stockee = 0
        rejetee = chaleur
        decision.append("Rejet de la chaleur produite")

    chaleur_reutilisee.append(round(reutilisee, 1))
    chaleur_stockee.append(round(stockee, 1))
    chaleur_rejetee.append(round(rejetee, 1))

    #resultats de l'algorithme pour chaque pas de temps
df=pd.DataFrame({
    "heure": heures,
    "chaleur_produite_kW": chaleur_produite.round(1),
    "decision": decision,
    "chaleur_reutilisee_kW": chaleur_reutilisee,
    "chaleur_stockee_kW": chaleur_stockee,
    "chaleur_rejetee_kW": chaleur_rejetee
})

print(df.head(20).to_string(index=False))
print()


    # Bilan sur 24h
total = sum(chaleur_produite) * 0.25
reutilisee_total = sum(chaleur_reutilisee) * 0.25
stockee_total = sum(chaleur_stockee) * 0.25
rejetee_total = sum(chaleur_rejetee) * 0.25

    # Formule correcte du HRR
HRR = (reutilisee_total / total)*100

print()
print(f"Chaleur totale produite  : {total:.0f} kWh")
print(f"Chaleur réutilisée       : {reutilisee_total:.0f} kWh")
print(f"Chaleur stockée          : {stockee_total:.0f} kWh")
print(f"Chaleur rejetée          : {rejetee_total:.0f} kWh")
print(f"HRR                      : {HRR:.2f}%")