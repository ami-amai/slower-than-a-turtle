const config = require('../config.json');

function getResourcepackMeta() {

    const output = {
        "pack": {
            "pack_format": config.resourcepack.pack_format,
            "description": [
                { "text": `${config.name}`, "color": "yellow" },
                { "text": "\nby Ami Amai", "color": "gray" }
            ],
        }
    }

    return JSON.stringify(output, null, 2)
}

function getDatapackMeta() {

    const output = {
        "pack": {
            "pack_format": config.datapack.pack_format,
            "description": [
                { "text": `${config.name}`, "color": "yellow" },
                { "text": "\nby Ami Amai", "color": "gray" }
            ],
        }
    }

    return JSON.stringify(output, null, 2)
}

module.exports = {
    getDatapackMeta: getDatapackMeta,
    getResourcepackMeta: getResourcepackMeta
}