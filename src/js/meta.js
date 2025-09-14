const name = "Slower Than a Turtle"

function getResourcepackMeta() {

    const output = {
        "pack": {
            "pack_format": 64,
            "description": [
                { "text": `${this.name}`, "color": "yellow" },
                { "text": "\nby Ami Amai", "color": "gray" }
            ],
        }
    }

    return JSON.stringify(output, null, 2)
}

function getDatapackMeta() {

    const output = {
        "pack": {
            "pack_format": 81,
            "description": [
                { "text": `${this.name}`, "color": "yellow" },
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