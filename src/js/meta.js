/*
resourcepack 64
datapack 81

*/

const packName = "Slower Than a Turtle" 

function getMeta(packFormat) {

    const output = {
        "pack": {
            "pack_format": packFormat,
            "description": [
                { "text": packName, "color": "yellow" },
                { "text": "\nby Ami Amai", "color": "gray" }
            ],
        }
    }

    return JSON.stringify(output, null, 2)

}

module.exports = {
    getMeta: getMeta
}