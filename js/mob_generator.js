const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const config = require('../config.json');

const generatedPath = './datapack/data/generated/functions';
const minecraftTagsPath = './datapack/data/minecraft/tags/functions';

async function generate() {
    console.log('Generating mob attributes...');
    await fs.ensureDir(path.join(generatedPath, 'mobs'));

    const { mobs, creeper } = config.game_mechanics;
    const healthModifierUUID = crypto.randomUUID();

    // Create a function that applies attributes to a single entity (@s)
    const singleMobAttributeFunc = [
        `attribute @s minecraft:generic.max_health modifier add ${healthModifierUUID} "Double Health" 1.0 multiply_base`,
        `attribute @s minecraft:generic.movement_speed base set ${mobs.speed}`,
        `effect give @s minecraft:instant_health 1 255 true`,
        `tag @s add attributes_applied`
    ];
    await fs.writeFile(path.join(generatedPath, 'mobs/apply_attributes_to_one.mcfunction'), singleMobAttributeFunc.join('\n'));

    // Create a function that executes the single-entity function for all relevant mob types
    const attributesCommands = mobs.list.map(mobType =>
        `execute as @e[type=minecraft:${mobType},tag=!attributes_applied] run function generated:mobs/apply_attributes_to_one`
    );
    await fs.writeFile(path.join(generatedPath, 'mobs/attributes.mcfunction'), attributesCommands.join('\n'));

    // Create the creeper fuse function
    const creeperFuseCommand = `execute as @e[type=creeper] run data merge entity @s {Fuse:${creeper.fuse_time}}`;
    await fs.writeFile(path.join(generatedPath, 'mobs/creeper_fuse.mcfunction'), creeperFuseCommand);

    // Create the main tick function for the generated module
    const tickCommands = [
        '# Mob Attribute and Creeper Fuse modifications',
        'function generated:mobs/attributes',
        'function generated:mobs/creeper_fuse',
    ];
    await fs.writeFile(path.join(generatedPath, 'tick.mcfunction'), tickCommands.join('\n'));

    // Ensure the main tick function is added to the minecraft:tick tag
    await fs.ensureDir(minecraftTagsPath);
    const tickJsonPath = path.join(minecraftTagsPath, 'tick.json');
    let tickJson = { values: [] };
    if (await fs.pathExists(tickJsonPath)) {
        try {
            tickJson = await fs.readJson(tickJsonPath);
        } catch (e) {
            console.error(`Error reading tick.json: ${e.message}. Overwriting with new file.`);
            tickJson = { values: [] };
        }
    }

    // Ensure 'values' property exists
    if (!tickJson.values) {
        tickJson.values = [];
    }

    if (!tickJson.values.includes('generated:tick')) {
        tickJson.values.push('generated:tick');
    }
    await fs.writeJson(tickJsonPath, tickJson, { spaces: 4 });
    console.log('Mob attribute generation complete.');
}

module.exports = { generate };
