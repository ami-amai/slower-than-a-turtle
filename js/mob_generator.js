const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const config = require('../config.json');

const generatedPath = './datapack/data/generated';
const functionsPath = path.join(generatedPath, 'functions');
const tagsPath = path.join(generatedPath, 'tags', 'entity_types');

async function generate() {
    console.log('Generating and optimizing mob attributes...');
    const mobFunctionsPath = path.join(functionsPath, 'mobs');
    await fs.ensureDir(mobFunctionsPath);
    await fs.ensureDir(tagsPath);

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

    // Create the entity type tag for all mobs that need attributes applied
    const mobsToModifyTag = {
        replace: false,
        values: mobs.list.map(mob => `minecraft:${mob}`)
    };
    await fs.writeJson(path.join(tagsPath, 'mobs_to_modify.json'), mobsToModifyTag, { spaces: 4 });

    // Prepare the commands to be run on a tick
    const tickCommands = [
        // Use the new entity type tag for a massive performance improvement
        '# Apply attributes to all new mobs of specified types',
        `execute as @e[type=#generated:mobs_to_modify,tag=!attributes_applied] run function generated:mobs/apply_attributes_to_one`,
        '# Set creeper fuse time',
        `execute as @e[type=creeper] run data merge entity @s {Fuse:${creeper.fuse_time}}`
    ];

    console.log('Mob attribute generation complete.');

    // Return the commands to be added to the main tick function
    return { tickCommands };
}

module.exports = { generate };
