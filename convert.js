const shapefile = require('shapefile')
const config = [
  //{file: 'gadm28-1', minzoom: 0, maxzoom: 9},
  {file: 'gadm28', minzoom: 9, maxzoom: 9}
]

config.forEach(q => {
  shapefile.open(`src/${q.file}.shp`, undefined,
    {encoding: 'utf-8'})
    .then(s => s.read().then(function task(r) {
      if(r.done) {
        return
      }
      for(let key in r.value.properties) {
        if(key.substring(0, 4) === 'NAME') {
        } else {
          delete r.value.properties[key]
        }
      }
      r.value.tippecanoe = {
        minzoom: q.minzoom,
        maxzoom: q.maxzoom
      }
      console.log(JSON.stringify(r.value))
      return s.read().then(task)
    }))
    .catch(e => console.error(e.stack))
})
