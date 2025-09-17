const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const config = require('../config.json');

const generatedPath = './datapack/data/generated';
const tagsPath = path.join(generatedPath, 'tags', 'entity_types');

async function generate() {
    console.log('Generating and optimizing mob attributes...');
    await fs.ensureDir(tagsPath);

    const { mobs, creeper, debug } = config.game_mechanics;
    const healthModifierUUID = crypto.randomUUID();

    // Create the entity type tag for all mobs that need attributes applied
    const mobsToModifyTag = {
        replace: false,
        values: mobs.list.map(mob => `minecraft:${mob}`)
    };
    await fs.writeJson(path.join(tagsPath, 'mobs_to_modify.json'), mobsToModifyTag, { spaces: 4 });

    // Define the selector once
    const mobSelector = `@e[type=#generated:mobs_to_modify,tag=!attributes_applied]`;

    // Prepare the commands to be run on a tick
    const tickCommands = [
        '# Apply attributes to all new mobs of specified types'
    ];

    if (debug) {
        // This debug message is less useful now, as it will fire for each command,
        // but it's kept to confirm the selector is finding entities.
        tickCommands.push(`execute as ${mobSelector} run tellraw @a [{"text": "Applying attributes to mob: ", "color": "gray"}, {"selector": "@s"}]`);
    }

    // Add the full commands directly, eliminating the need for a helper function and @s
    tickCommands.push(
        `attribute ${mobSelector} minecraft:generic.max_health modifier add ${healthModifierUUID} "Double Health" 1.0 multiply_base`,
        `attribute ${mobSelector} minecraft:generic.movement_speed base set ${mobs.speed}`,
        `effect give ${mobSelector} minecraft:instant_health 1 255 true`,
        `tag ${mobSelector} add attributes_applied`
    );

    // Add command for creeper fuse time
    tickCommands.push(
        '# Set creeper fuse time',
        `execute as @e[type=creeper] run data merge entity @s {Fuse:${creeper.fuse_time}}`
    );

    console.log('Mob attribute generation complete.');

    // Return the commands to be added to the main tick function
    return { tickCommands };
}

module.exports = { generate };
