const fs = require("fs")
const archiver = require("archiver")
const config = require("./config.json")

const meta = require("./js/meta")
const textures = require("./js/textures")

const resourcepackPath = "./resourcepacks/"
const datapackPath = "./datapacks/"

/*
# Resourcepack
* Meta +
* Language
* Archive

# Datapack
* Meta +
* Datapack files
* Functions
* Archive





Build Resourepack Resources


*/


// RESOURCEPACK
Object.values(textures.textureConfig.ores.nether).forEach(ore => {

    const texture = textures.getOreTexture(ore, 2)
/*
    console.log(texture.name)
    console.log(texture.asset_path)
    console.log(texture.resourcepack_path, "\n")

    const resourcepackZip = `${resourcepackPath}resourcepack.zip`
    const resourcepackZipOutput = fs.createWriteStream(resourcepackZip)
    const resourcepackZipArchive = new archiver("zip", {
        zlib: { level: 9 },
    })
    resourcepackZipArchive.pipe(resourcepackZipOutput);
*/
    // Add first layer files
    console.log(texture.asset_path,`{ name: ${texture.resourcepack_path} }`)
//    resourcepackZipArchive.append(resourcepackMcmeta, { name: resourcepackStructure.mcmeta });
//    resourcepackZipArchive.file(resourcepackTexture, { name: resourcepackStructure.texture });
    //console.log(resourcepackMcmeta)

    //resourcepackZipArchive.finalize();
})



// DATAPACK