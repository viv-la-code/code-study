/* 
An input line looks like this: {"type":"playlist","uri":"ajd;fajs;lkfjas","url":"https://someurl","name":"THE NAME!","popularity":100}
Output should be the item name followed by a newline.
*/

const PLAYLIST_MAX  =      5000
const ARTIST_MAX    =     10000
const ALBUM_MAX     =     20000
const TRACK_MAX     =     39900

const fs = require('fs')
const readline = require('readline')
const stream = require('stream')

const BASE_PATH = './'
const INPUT_SUFFIX = '.txt'
const OUTPUT_NAME = 'Classifier'
const OUTPUT_SUFFIX = '.vocab.6t'
const catalogData = [
  {
    name: 'playlists',
    maxCount: PLAYLIST_MAX,
  },
  {
    name: 'artists',
    maxCount: ARTIST_MAX,
  },
  {
    name: 'albums', 
    maxCount: ALBUM_MAX,
  },
  {
    name: 'tracks',
    maxCount: TRACK_MAX,
  },
]

function formatName (str) {
  return str.replace(/^\w/, (chr) => chr.toUpperCase()).slice(0, - 1)
}

function prepareCatalogData () {
  try {
    const recursiveCatalog = (catalogIndex = 0) => {
      if(catalogIndex > catalogData.length - 1) return

      const COPY_BASE_PATH = BASE_PATH + 'vocab/'
      const INPUT_PATH = [BASE_PATH, catalogData[catalogIndex].name, INPUT_SUFFIX].join('')
      const OUTPUT_PATH = [COPY_BASE_PATH, formatName(catalogData[catalogIndex].name), OUTPUT_NAME, OUTPUT_SUFFIX].join('')
      if(!fs.existsSync(COPY_BASE_PATH)){
        fs.mkdirSync(COPY_BASE_PATH)
      }

      let instream = fs.createReadStream(INPUT_PATH)
      const uniqueHash = {}
      let rl = readline.createInterface({
        input: instream,
        terminal: false
      })

      rl.on('line', function (line) {
        const {name, popularity} = JSON.parse(line)
        if(!/[^\x00-\x7F]+/.test(name)) {
          let key = name.replace(/[\(\)\{\}\[\]\<\>\.\"]/g, '').replace(/(-+\s+)+/g, ' ').replace('\\', '\\\\').replace(/(&+\s+)+/g, ' and ')
          if(typeof uniqueHash[key] !== 'number' || uniqueHash[key] < popularity) {
            uniqueHash[key] = popularity
          }
        }
      })

      rl.on('close', () => {
        //sort, trim, and write here
        const data = []
        for(let name in uniqueHash) {
          data.push({
            name: name,
            popularity: uniqueHash[name],
          })
        }
        const vocabList = data.sort((a,b) => b.popularity - a.popularity).slice(0, catalogData[catalogIndex].maxCount).map((x) => `  "${x.name}"`)
        vocabList.unshift(`vocab(${formatName(catalogData[catalogIndex].name)}Classifier) {`)
        vocabList.push('}')
        const output = vocabList.join('\n')
        try {
          fs.writeFile(OUTPUT_PATH, output, (err) => {
            if(err) {
              throw err
            }
            console.log(`===${catalogData[catalogIndex].name} vocab saved===\nlocation: ${OUTPUT_PATH}`)
          })
        } catch(e) {
          console.warn(`Whoops, there was a problem with writing ${catalogData[catalogIndex].name} vocab`)
        }
        recursiveCatalog(catalogIndex + 1)
      })
    }

    recursiveCatalog()
  } catch (e) {
    console.error("ERR: ", e)
  }
}

prepareCatalogData()
