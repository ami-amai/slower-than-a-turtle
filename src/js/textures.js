const config = require("../json/textures.json")

function getOreTexture (ore, type) {

    let type_name
    let name = `${ore}_ore`

    switch (type) {
        case 0:
            type_name = "stone"
            name = `${name}`
            break;
        case 1:
            type_name = "deepslate"
            name = `${type_name}_${name}`
            break;
        case 2:
            type_name = "nether"
            name = `${type_name}_${name}`
            break;
    }

    const path = `assets/minecraft/textures/block/`

    return {
        "name": `${name}`,
        "asset_path": `./${path}${type_name}_ore.png`,
        "resourcepack_path": `${path}${name}.png`
    }

}  

module.exports = {
    getOreTexture: getOreTexture,
    textureConfig: config
}