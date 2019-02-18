CREATE TABLE "person" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE characters (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(30),
	"user_id" INT NOT NULL REFERENCES "person"
);

CREATE TABLE campaigns (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(40),
	"user_id" INT NOT NULL REFERENCES "person"
);

CREATE TABLE encounters (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(40),
	"user_id" INT NOT NULL REFERENCES "person"
);

CREATE TABLE monsters (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(30),
	"user_id" INT NOT NULL REFERENCES "person"
);


CREATE TABLE users_campaigns (
	"user_id" INT NOT NULL REFERENCES "person",
    "campaign_id" INT NOT NULL REFERENCES "campaigns"
);

CREATE TABLE campaigns_encounters (
	"campaign_id" INT NOT NULL REFERENCES "campaigns",
	"encounter_id" INT NOT NULL REFERENCES "encounters",
	"notes" TEXT
);

CREATE TABLE encounters_monsters (
	"monster_id" INT NOT NULL REFERENCES "monsters",
	"encounter_id" INT NOT NULL REFERENCES "encounters",
	"quantity" INT NOT NULL
);
