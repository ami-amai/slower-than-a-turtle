const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const config = require('../config.json');

const generatedPath = './datapack/data/generated';
const functionsPath = path.join(generatedPath, 'functions');

async function generate() {
    console.log('Generating player mechanics...');
    const playerFunctionsPath = path.join(functionsPath, 'player');
    await fs.ensureDir(playerFunctionsPath);
    await fs.ensureDir(path.join(generatedPath, 'advancements', 'player'));

    const { player, passive_mobs, raw_food } = config.game_mechanics;
    const breakSpeedModifierUUID = crypto.randomUUID();

    // 1. Player Attributes (Health and Mining Speed)
    const applyAttributesFunc = [
        `attribute @s minecraft:generic.max_health base set ${player.max_health}`,
        `attribute @s minecraft:player.block_break_speed modifier add ${breakSpeedModifierUUID} "Slow Mining" ${player.block_break_speed_multiplier - 1} multiply`,
        `tag @s add player_attrs_applied`
    ];
    await fs.writeFile(path.join(playerFunctionsPath, 'apply_attributes_to_one.mcfunction'), applyAttributesFunc.join('\n'));

    const checkAttributesFunc = `execute as @a[tag=!player_attrs_applied] run function generated:player/apply_attributes_to_one`;
    await fs.writeFile(path.join(playerFunctionsPath, 'attributes.mcfunction'), checkAttributesFunc);


    // 2. Damage from Passive Mobs
    const passiveMobAdvancement = {
        criteria: {},
        rewards: {
            function: "generated:player/attacked_passive_mob_reward"
        }
    };
    passive_mobs.forEach(mob => {
        passiveMobAdvancement.criteria[`attacked_${mob}`] = {
            trigger: "minecraft:player_hurt_entity",
            conditions: {
                entity: {
                    type: `minecraft:${mob}`
                }
            }
        };
    });
    await fs.writeJson(path.join(generatedPath, 'advancements/player/attacked_passive_mob.json'), passiveMobAdvancement, { spaces: 4 });

    const passiveMobRewardFunction = [
        `damage @s ${player.passive_mob_attack_damage} minecraft:generic`,
        `advancement revoke @s from generated:player/attacked_passive_mob`
    ];
    await fs.writeFile(path.join(playerFunctionsPath, 'attacked_passive_mob_reward.mcfunction'), passiveMobRewardFunction.join('\n'));

    // 3. Hunger from Raw Food
    const rawFoodItems = raw_food.list.map(item => `minecraft:${item}`);
    const rawFoodAdvancement = {
        criteria: {
            ate_raw_food: {
                trigger: "minecraft:consume_item",
                conditions: {
                    item: {
                        items: rawFoodItems
                    }
                }
            }
        },
        rewards: {
            function: "generated:player/ate_raw_food_reward"
        }
    };
    await fs.writeJson(path.join(generatedPath, 'advancements/player/ate_raw_food.json'), rawFoodAdvancement, { spaces: 4 });

    const rawFoodRewardFunction = [
        `effect give @s minecraft:hunger ${Math.floor(raw_food.hunger_duration / 20)} ${1} true`, // duration is in seconds for the command
        `advancement revoke @s only generated:player/ate_raw_food`
    ];
    await fs.writeFile(path.join(playerFunctionsPath, 'ate_raw_food_reward.mcfunction'), rawFoodRewardFunction.join('\n'));


    // Add player attribute check to the main tick function
    const mainTickFunctionPath = path.join(functionsPath, 'tick.mcfunction');
    let tickCommands = (await fs.readFile(mainTickFunctionPath)).toString().split('\n').filter(line => line.trim() !== '');

    // Remove old mining fatigue function if it exists
    tickCommands = tickCommands.filter(line => !line.includes('mining_fatigue'));

    // Add new attributes function if it doesn't exist
    if (!tickCommands.includes('function generated:player/attributes')) {
        tickCommands.push('function generated:player/attributes');
    }
    await fs.writeFile(mainTickFunctionPath, tickCommands.join('\n'));

    console.log('Player mechanics generation complete.');
}

module.exports = { generate };
