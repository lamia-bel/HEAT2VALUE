import numpy as np  #pour faire des calcules mathématiques
import pandas as pd #pour organiser les données 

#on veut mesurer toutes les 15 min pendant 24h donc on aura 96 points (24 *4)
#donc on crée un index de temps

heures=pd.date_range(start="2024-01-15 00:00", periods=96, freq="15min")

#charge des serveurs en % 
np.random.seed(42) 
charge = np.linspace(30,90,96)
charge = charge + np.random.normal(0, 3, 96)
charge = np.clip(charge, 20, 100) #apres l'ajout de bruit on force les valeurs a rester entre 20 et 100

#puissance consommée par les serveurs en Kw
puissance_IT = (charge/100) * 1000

#la chaleur produite par les serveurs en Kw
#comme 95% d'éléctricité consommée evient une chaleur 
chaleur_produite = puissance_IT * 0.95

#on rajoute la température et l'intensité carbone pour que l'algorithmedécide quoi faire avec la chaleur produite
#température en jour d'hiver en france 2-3°C la nuit et monte a 10° la journée 
temp=np.linspace(2,10,96)
temp = temp + np.random.normal(0, 0.5, 96)
temp = np.clip(temp, 0, 15) 

#dans les réseaux éléctriques francais , intensité carbone  est 60 gCO2/kWh en moyenne la nuit et 280 gCO2/kWh le soir 
carbone=np.linspace(60,280,96)
carbone = carbone + np.random.normal(0, 10, 96)
carbone = np.clip(carbone, 40, 300) 

#un dataframe pour organiser les données
df = pd.DataFrame({
    "heure": heures,
    "charge_%": charge.round(1),
    "puissance_IT_kW": puissance_IT.round(1),
    "chaleur_produite_kW": chaleur_produite.round(1),
    "temp_exterieure_C": temp.round(1),
    "intensite_carbone_gCO2/kWh": carbone.round(1),
})

print(df.head(10).to_string(index=False))
print(f"\nChaleur moyenne produite : {chaleur_produite.mean():.0f} kW")
print(f"\nTempérature moyenne extérieure : {temp.mean():.1f} °C")
print(f"\nIntensité carbone moyenne : {carbone.mean():.0f} gCO2/kWh")