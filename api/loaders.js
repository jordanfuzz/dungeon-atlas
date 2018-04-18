const DataLoader = require('dataloader')  
const npcRepository = require('./repositories/npc-repository')
const mapRepository = require('./repositories/map-repository')
const areaRepository = require('./repositories/area-repository')
const encounterSetRepository = require('./repositories/encounter-set-repository')
const encounterRepository = require('./repositories/encounter-repository')

module.exports = pgPool =>  {
  
  return {
    getMapForArea: new DataLoader(mapRepository(pgPool).getMapForArea),
    getAreas: new DataLoader(areaRepository(pgPool).getAreas),
    getMapsForUser: new DataLoader(mapRepository(pgPool).getMapsForUser),
    getEncounterSetsForUser: new DataLoader(encounterSetRepository(pgPool).getEncounterSetsForUser),
    getEncounterSetsForMap: new DataLoader(encounterSetRepository(pgPool).getEncounterSetsForMap),
    getEncounters: new DataLoader(encounterRepository(pgPool).getEncounters),
    getNpcsForUser: new DataLoader(npcRepository(pgPool).getNpcsForUser),
    getNpcsForMap: new DataLoader(npcRepository(pgPool).getNpcsForMap)
  } 
}