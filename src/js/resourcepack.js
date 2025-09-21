const fs = require("fs")
const archiver = require("archiver")

const config = require("./resourcepack/config.json")

const languagePack = require("../json/resourcepack/lang.json")
const structure = require("../json/resourcepack/structure.json")

const meta = require("./meta")
const lang = require("./resourcepack/lang")

function generateResourcepack() {

    const resourcepackName = "Slower-than-a-turtle-language"

    const packFormat = 64
    const buildDir = "./build/"

    fs.rmSync(`${buildDir}${resourcepackName}-rp.zip`, { recursive: true, force: true })
    fs.mkdirSync(buildDir, { recursive: true, force: true })

    // Init Resourcepack
    const zip = `${buildDir}${resourcepackName}-rp.zip`
    const zipOut = fs.createWriteStream(zip)
    const zipArchive = new archiver("zip", {
        zlib: { level: 9 },
    })
    zipArchive.pipe(zipOut);

    // Add Files
    // Meta
    zipArchive.append(meta.getMeta(packFormat), { name: structure.file.meta });

    // Language

    Object.keys(languagePack).forEach(language => {   

        zipArchive.append(lang.getLanguage(languagePack[language]), { name: `${structure.path.assets.minecraft.lang}${language}.json` })
        
    })

    //zipArchive.append(lang.getLanguage(), { name: `${config.structure.lang}en_us.json` })

    // Stone+Deepslate ore block texture
    Object.values(config.items.ore.overworld).forEach(ore => {

        zipArchive.file(`./${structure.path.assets.minecraft.textures.block}ore.png`, { name: `${structure.path.assets.minecraft.textures.block}${ore}_ore.png` });
        zipArchive.file(`./${structure.path.assets.minecraft.textures.block}deepslate_ore.png`, { name: `${structure.path.assets.minecraft.textures.block}deepslate_${ore}_ore.png` });
    })

    // Nether ore block texture
    Object.values(config.items.ore.nether).forEach(ore => {
        zipArchive.file(`./${structure.path.assets.minecraft.textures.block}nether_ore.png`, { name: `${structure.path.assets.minecraft.textures.block}nether_${ore}_ore.png` });
    })

    // Ore texture
    Object.values(config.items.ore.ore).forEach(ore => {
        //zipArchive.append(meta.getMeta(packFormat), { name: structure.meta });
        zipArchive.file(`./${structure.path.assets.minecraft.textures.item}raw.png`, { name: `${structure.path.assets.minecraft.textures.item}raw_${ore}.png` });
    })

    // Ore block texture
    Object.values(config.items.ore.ore).forEach(ore => {
        //zipArchive.append(meta.getMeta(packFormat), { name: structure.meta });
        zipArchive.file(`./${structure.path.assets.minecraft.textures.block}raw_ore_block.png`, { name: `${structure.path.assets.minecraft.textures.block}raw_${ore}_block.png` });
    })


    // Hidden armor textures
    Object.values(["empty", "full", "half"]).forEach(armor => {
        zipArchive.file(`./${structure.path.assets.minecraft.textures.gui.sprites.hud}armor_${armor}.png`, { name: `${structure.path.assets.minecraft.textures.gui.sprites.hud}armor_${armor}.png` });
    })

    zipArchive.finalize();

}

generateResourcepack()