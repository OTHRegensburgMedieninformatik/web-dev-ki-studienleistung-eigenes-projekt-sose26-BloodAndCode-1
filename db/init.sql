Create Table IF NOT Exists destinations (
    id serial primary key,
    name Varchar (100) not null,
    country Varchar (100) not null,
    lat decimal (9,6) not null,
    lon decimal (9,6) not null,
    distance_km integer not null,
    description text
);

insert Into destinations (name, country, lat, lon, distance_km, description) VALUES
  ('München', 'Deutschland', 48.1351, 11.5820, 107, 'Bayerische Landeshauptstadt mit viel Kultur'),
  ('Nürnberg', 'Deutschland', 49.4521, 11.0767, 100, 'Historische Altstadt und Kaiserburg'),
  ('Salzburg', 'Österreich', 47.8095, 13.0550, 130, 'Mozarts Geburtsstadt'),
  ('Augsburg', 'Deutschland', 48.3705, 10.8978, 120, 'Älteste Stadt Bayerns'),
  ('Passau', 'Deutschland', 48.5748, 13.4647, 100, 'Dreiflüssestadt an Donau, Inn und Ilz'),
  ('Landshut', 'Deutschland', 48.5369, 12.1525, 65, 'Mittelalterliche Stadt mit Burg Trausnitz'),
  ('Ingolstadt', 'Deutschland', 48.7665, 11.4257, 60, 'Audi-Stadt an der Donau'),
  ('Straubing', 'Deutschland', 48.8817, 12.5768, 40, 'Gemütliche Niederbayerische Stadt');

  CREATE TABLE IF NOT EXISTS friday_users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);