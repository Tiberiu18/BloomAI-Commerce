import pickle
import sys
import json
import pandas as pd
# Calea către fișierul modelului exportat
model_file = sys.argv[1] 

# Datele primite din Node.js ca JSON
new_data = sys.argv[2]

set_date = sys.argv[3]



# Încărcarea modelului exportat
with open(model_file, 'rb') as file:
    model = pickle.load(file)



# Transformarea datelor primite din JSON într-un dicționar
new_data = json.loads(new_data)



data = pd.read_csv(set_date)
features = data[['Sex', 'AgeGroup', 'Color1', 'Color2', 'Color3', 'Flower1', 'Flower2', 'Flower3']]
features_encoded = pd.get_dummies(features)



new_user_data = pd.DataFrame(new_data, index=[0])



# Encodarea datelor utilizatorului nou cu toate categoriile posibile
new_user_encoded = pd.get_dummies(new_user_data)



# Verificarea și completarea coloanelor lipsă în noua encodare
missing_cols = set(features_encoded.columns) - set(new_user_encoded.columns)
for col in missing_cols:
    new_user_encoded[col] = 0


# Rearanjarea coloanelor în aceeași ordine ca în setul de antrenare
new_user_encoded = new_user_encoded[features_encoded.columns]


# Efectuarea predicției utilizând modelul antrenat
predicted_label = model.predict(new_user_encoded)


print(predicted_label[0])
sys.stdout.flush()


