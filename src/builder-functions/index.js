export function buildMapObject(maps) {
  return maps.map(map => {
    return {
      mapName: map.mapName,
      imageUrl: map.imageUrl,
      areas: map.areas.map(area => {
        return {
          shape: "poly",
          coords: area.area
        }
      })
    }
  })
}