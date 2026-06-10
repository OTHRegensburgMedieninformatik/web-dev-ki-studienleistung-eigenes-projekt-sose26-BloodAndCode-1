Create Table IF NOT Exists destinations (
    id serial primary key,
    name Varchar (100) not null,
    country Varchar (100) not null,
    lat decimal (9,6) not null,
    lon decimal (9,6) not null,
    distance_km integer not null,
    description text
);

INSERT INTO destinations (name, country, lat, lon, distance_km, description) 
SELECT * FROM (VALUES
  ('München', 'Deutschland', 48.1351, 11.5820, 107, 'Bayerische Landeshauptstadt mit viel Kultur'),
  ('Nürnberg', 'Deutschland', 49.4521, 11.0767, 100, 'Historische Altstadt und Kaiserburg'),
  ('Salzburg', 'Österreich', 47.8095, 13.0550, 130, 'Mozarts Geburtsstadt'),
  ('Augsburg', 'Deutschland', 48.3705, 10.8978, 120, 'Älteste Stadt Bayerns'),
  ('Passau', 'Deutschland', 48.5748, 13.4647, 100, 'Dreiflüssestadt an Donau, Inn und Ilz'),
  ('Landshut', 'Deutschland', 48.5369, 12.1525, 65, 'Mittelalterliche Stadt mit Burg Trausnitz'),
  ('Ingolstadt', 'Deutschland', 48.7665, 11.4257, 60, 'Audi-Stadt an der Donau'),
  ('Straubing', 'Deutschland', 48.8817, 12.5768, 40, 'Gemütliche Niederbayerische Stadt'),
  ('Regensburg', 'Deutschland', 49.0195, 12.0974, 0, 'UNESCO-Welterbe mit mittelalterlicher Altstadt'),
  ('Landsberg am Lech', 'Deutschland', 48.0502, 10.8730, 90, 'Historische Stadt am Lech'),
  ('Freising', 'Deutschland', 48.4028, 11.7489, 90, 'Älteste Stadt Bayerns mit Domberg'),
  ('Burghausen', 'Deutschland', 48.1686, 12.8310, 120, 'Längste Burganlage der Welt'),
  ('Berchtesgaden', 'Deutschland', 47.6307, 13.0020, 170, 'Alpenstadt mit Königssee'),
  ('Linz', 'Österreich', 48.3069, 14.2858, 160, 'Kulturhauptstadt an der Donau'),
  ('Rosenheim', 'Deutschland', 47.8561, 12.1289, 110, 'Tor zu den Alpen'),
  ('Weiden', 'Deutschland', 49.6764, 12.1616, 55, 'Einkaufsstadt in der Oberpfalz'),
  ('Amberg', 'Deutschland', 49.4432, 11.8616, 55, 'Mittelalterliche Stadt mit Stadtbrille'),
  ('Cham', 'Deutschland', 49.2232, 12.6615, 55, 'Tor zum Bayerischen Wald')
) AS v(name, country, lat, lon, distance_km, description)
WHERE NOT EXISTS (SELECT 1 FROM destinations);

  CREATE TABLE IF NOT EXISTS friday_users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS saved_trips (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES friday_users(id),
  destination_id INTEGER REFERENCES destinations(id),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);