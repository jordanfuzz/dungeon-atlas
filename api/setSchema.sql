drop table if exists maps;
drop table if exists areas;
drop table if exists users;
drop table if exists encounter_sets;
drop table if exists encounters;
drop table if exists map_encounter_sets;
drop table if exists npcs;
drop table if exists map_npcs;

create table users (
  user_id integer primary key,
  email varchar(128) not null
);

create table maps (
  map_id serial primary key,
  user_id integer not null,
  map_name varchar(128) not null,
  image_url text not null,
  is_master boolean not null default 'true'
);

create table areas (
  area_id serial primary key,
  map_id integer not null,
  sub_map integer not null,
  area text not null
);

create table encounter_sets (
  encounter_set_id serial primary key,
  user_id integer not null,
  title text not null
);

create table encounters (
  encounter_id serial primary key,
  encounter_set_id integer not null,
  title text not null,
  encounter_weight integer default 1,
  details text
);

create table map_encounter_sets (
  map_encounter_set_id serial primary key,
  map_id integer not null,
  encounter_set_id integer not null
);

create table npcs (
  npc_id serial primary key,
  user_id integer not null,
  npc_name text not null,
  npc_stat_block text,
  npc_description text not null,
  npc_race varchar(128),
  npc_inventory text
);

create table map_npcs (
  map_npc_id serial primary key,
  map_id integer not null,
  npc_id integer not null
);

insert into users (user_id, email)
values (1, 'matt@damon.com');

insert into maps (user_id, map_name, image_url, is_master)  
values  (1, 'Gondor', 'http.com', 'true'),
        (1, 'Mordor', 'http.net', 'true'),
        (1, 'Ireland', 'http.org', 'false');

insert into areas (map_id, sub_map, area)
values  (1, 2, '{path: numbers}'),
        (1, 3, '{path: other numbers}');

insert into encounter_sets (user_id, title)
values  (1, 'Weeping waters'),
        (1, 'Overworld'),
        (1, 'Pikachu Land');

insert into encounters (encounter_set_id, title, encounter_weight, details)
values  (1, 'Fish attack', 1, 'A fish attacks you'),
        (1, 'Mega fish attack', 2, 'A really big fish attacks you'),
        (1, 'Nice fish', 1, 'Nothing really happens'),
        (2, 'dummy data', 1, 'You get real sad'),
        (2, 'really dummy data', 1, 'Everything hurts'),
        (3, 'Lightning Bult!', 1, 'You get mega zapped');

insert into map_encounter_sets (map_id, encounter_set_id)
values  (1, 1),
        (1, 2),
        (2, 3);

insert into npcs (user_id, npc_name, npc_stat_block, npc_description, npc_race, npc_inventory)
values  (1, 'Dr. Fish', 'fish stats here', 'A really nice fish who is good at science', 'Fish', 'crowbar, milk'),
        (1, 'Smitty Werbenjagermanjensen', 'jagermanstats', 'He was number one.', '#1', 'soda drink hat, army of the living dead, killer personality'),
        (1, 'Gertrude', 'boss stats!', 'A kind old lady with a secret to hide', 'Human', 'Ring of Silence, nutmeg ginger apple snap');

insert into map_npcs (map_id, npc_id)
values  (1, 1),
        (1, 2),
        (2, 3);