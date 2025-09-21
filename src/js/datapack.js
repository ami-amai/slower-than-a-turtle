const fs = require("fs")
const archiver = require("archiver")

const config = require("./datapack/config.json")
const structure = require("../json/datapack/structure.json")

const mcfunctions = require("./datapack/mcfunctions")
const meta = require("./meta")

function generateDatapack() {

    const name = "Slower-than-a-turtle-language"

    const packFormat = 81
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
    zipArchive.append(meta.getMeta(packFormat), { name: structure.file.meta });

    const joinJsonString = {
        "criteria": {
            "granted": {
                "trigger": "minecraft:tick"
            }
        },
        "rewards": {
            "function": "datapack:join"
        }
    }

    const joinJson = JSON.stringify(joinJsonString, null, 2)

    //zipArchive.append(joinJson, `${structure.path.data.datapack.advancements}${structure.file.data.datapack.advancements.join}`)

    const joinFuncString = `
        # This function is triggered by the 'player_join' advancement.
        # It only runs for the player who triggered it (the one who just joined).

        # Apply the same attributes as the load function.
        attribute @s minecraft:generic.movement_speed base set 0.15
        attribute @s minecraft:generic.attack_damage base set 3.0

        # Revoke the advancement so it can be triggered again when the player rejoins the server.
        advancement revoke @s only my_datapack:player_join
        
        `

    //zipArchive.append(joinFuncString, `${structure.path.data.datapack.function}${structure.file.data.datapack.function.join}`)

    console.log(mcfunctions.tickFunction())

        const loadString = `
       # This function runs when the datapack is reloaded.
        # It applies attributes to all currently online players.

        # The 'my_datapack' namespace is a placeholder. You can change it if you want.
        # This command applies a speed attribute to all players.
        # Replace the UUID with a new one for each unique attribute you add.
        attribute @a[nbt=!{abilities:{flying:1b}}] minecraft:generic.movement_speed base set 0.15

        # This command applies an attack damage attribute to all players.
        attribute @a minecraft:generic.attack_damage base set 3.0

        # This command gives the hidden 'player_join' advancement to all players.
        # This advancement triggers the reward function, applying the attributes to new players on their first join.
        # The advancement is revoked by the reward function.
        advancement grant @a only my_datapack:player_join
        
        `

    //zipArchive.append(loadString, `${structure.path.data.datapack.function}${structure.file.data.datapack.function.load}`)

    console.log(mcfunctions.tickFunction())


    zipArchive.finalize();
}

generateDatapack()