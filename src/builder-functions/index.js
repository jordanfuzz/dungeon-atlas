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

//areas: [{ shape: "poly", coords: [25, 33, 27, 300, 128, 240, 128, 94] }]