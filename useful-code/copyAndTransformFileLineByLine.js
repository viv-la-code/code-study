
/* 
An input line looks like this: {"type":"playlist","uri":"ajd;fajs;lkfjas","url":"https://someurl","name":"THE NAME!","popularity":100}

Output should be the item name followed by a newline.
*/

const fs = require('fs')
const readline = require('readline')
const stream = require('stream')

const BASE_PATH = './musicCatalogData/'
const NAME = '-us-2018-02-21'
const SUFFIX = '.txt'
const catalogData = [
  'playlists',
  'tracks',
  'artists',
  'albums', 
  
]

function prepareCatalogData () {
  try {
    const recursiveCatalog = (catalogIndex = 0) => {
      if(catalogIndex > catalogData.length - 1) return

      const COPY_BASE_PATH = BASE_PATH + 'copy/'
      const INPUT_PATH = BASE_PATH + catalogData[catalogIndex] + NAME + SUFFIX
      const OUTPUT_PATH = COPY_BASE_PATH + catalogData[catalogIndex] + NAME + SUFFIX
      if(!fs.existsSync(COPY_BASE_PATH)){
        fs.mkdirSync(COPY_BASE_PATH);
      }

      let instream = fs.createReadStream(INPUT_PATH)
      let outstream = fs.createWriteStream(OUTPUT_PATH)

      let rl = readline.createInterface({
        input: instream,
        output: outstream,
        terminal: false
      })

      rl.on('line', function (line) {
        rl.pause()
        const input = JSON.parse(line)
        const output = String(input.name) + '\n'
        try {
          this.output.write(output)
        } catch(e) {
          console.warn("Whoops, this didn't write: ", output)
        }
        rl.resume()
      })

      rl.on('close', () => {
        recursiveCatalog(catalogIndex + 1)
      })
    }
    recursiveCatalog()
  } catch (e) {
    console.error("ERR: ", e)
  }
}

prepareCatalogData()
