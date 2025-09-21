const fs = require("fs")
const archiver = require("archiver")

const config = require("./datapack/config.json")
const structure = require("../json/datapack/structure.json")

const mcfunctions = require("./datapack/mcfunctions")
const meta = require("./meta")

function generateDatapack() {

    const name = "Slower-than-a-turtle-language"

    const packFormat = 64
    const buildDir = "./build/"

    fs.rmSync(`${buildDir}${name}-dp.zip`, { recursive: true, force: true })
    fs.mkdirSync(buildDir, { recursive: true, force: true })

    // Init Datapack
    const zip = `${buildDir}${name}-dp.zip`
    const zipOut = fs.createWriteStream(zip)
    const zipArchive = new archiver("zip", {
        zlib: { level: 9 },
    })
    zipArchive.pipe(zipOut);

    // Add Files
    // Meta
    zipArchive.append(meta.getMeta(packFormat), { name: config.structure.meta });

    console.log(mcfunctions.tickFunction())
    

    zipArchive.finalize();
}

generateDatapack()