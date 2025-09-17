const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const config = require('../config.json');

const functionsPath = './datapack/data/generated/functions';

async function generate() {
    console.log('Generating mob attributes...');
    const mobFunctionsPath = path.join(functionsPath, 'mobs');
    await fs.ensureDir(mobFunctionsPath);

    const { mobs, creeper } = config.game_mechanics;
    const healthModifierUUID = crypto.randomUUID();

    // Create the helper function that applies attributes to a single entity (@s)
    const singleMobAttributeFunc = [
        `attribute @s minecraft:generic.max_health modifier add ${healthModifierUUID} "Double Health" 1.0 multiply_base`,
        `attribute @s minecraft:generic.movement_speed base set ${mobs.speed}`,
        `effect give @s minecraft:instant_health 1 255 true`,
        `tag @s add attributes_applied`
    ];
    await fs.writeFile(path.join(mobFunctionsPath, 'apply_attributes_to_one.mcfunction'), singleMobAttributeFunc.join('\n'));

    // Prepare the commands to be run on a tick
    const tickCommands = [];

    // Add commands to check for new mobs and apply attributes
    mobs.list.forEach(mobType => {
        tickCommands.push(`execute as @e[type=minecraft:${mobType},tag=!attributes_applied] run function generated:mobs/apply_attributes_to_one`);
    });

    // Add command for creeper fuse time
    tickCommands.push(`execute as @e[type=creeper] run data merge entity @s {Fuse:${creeper.fuse_time}}`);

    console.log('Mob attribute generation complete.');

    // Return the commands to be added to the main tick function
    return { tickCommands };
}

module.exports = { generate };
