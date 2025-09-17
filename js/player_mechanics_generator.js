const fs = require('fs-extra');
const path = require('path');
const config = require('../config.json');

const generatedPath = './datapack/data/generated';
const functionsPath = path.join(generatedPath, 'functions');
const advancementsPath = path.join(generatedPath, 'advancements', 'player');

async function generate() {
    console.log('Generating and fixing player mechanics...');
    const playerFunctionsPath = path.join(functionsPath, 'player');
    await fs.ensureDir(playerFunctionsPath);
    await fs.ensureDir(advancementsPath);

    const { player, passive_mobs, raw_food } = config.game_mechanics;

    // 1. Player Attributes (Health and Mining Speed)
    const applyAttributesFunc = [
        `attribute @s minecraft:generic.max_health base set ${player.max_health}`,
        `attribute @s minecraft:player.block_break_speed base set ${player.block_break_speed_multiplier}`,
        `tag @s add player_attrs_applied`
    ];
    await fs.writeFile(path.join(playerFunctionsPath, 'apply_attributes_to_one.mcfunction'), applyAttributesFunc.join('\n'));

    // 2. Damage from Passive Mobs (REFACTORED FOR RELIABILITY)
    // Create a separate, simple advancement for each passive mob.
    passive_mobs.forEach(async (mob) => {
        const advancement = {
            criteria: {
                [`attacked_${mob}`]: {
                    trigger: "minecraft:player_hurt_entity",
                    conditions: {
                        entity: {
                            type: `minecraft:${mob}`
                        }
                    }
                }
            },
            rewards: {
                function: "generated:player/attacked_passive_mob_reward"
            }
        };
        await fs.writeJson(path.join(advancementsPath, `attacked_${mob}.json`), advancement, { spaces: 4 });
    });

    // Create a single reward function that revokes ALL passive mob advancements.
    // This is robust and ensures the triggers can always fire again.
    const passiveMobRewardFunction = [
        `damage @s ${player.passive_mob_attack_damage} minecraft:generic`
    ];
    passive_mobs.forEach(mob => {
        passiveMobRewardFunction.push(`advancement revoke @s only generated:player/attacked_${mob}`);
    });
    await fs.writeFile(path.join(playerFunctionsPath, 'attacked_passive_mob_reward.mcfunction'), passiveMobRewardFunction.join('\n'));

    // 3. Hunger from Raw Food (VERIFIED)
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
    await fs.writeJson(path.join(advancementsPath, 'ate_raw_food.json'), rawFoodAdvancement, { spaces: 4 });

    const rawFoodRewardFunction = [
        `effect give @s minecraft:hunger ${Math.floor(raw_food.hunger_duration / 20)} 0 true`, // Amplifier 0 for standard hunger
        `advancement revoke @s only generated:player/ate_raw_food`
    ];
    await fs.writeFile(path.join(playerFunctionsPath, 'ate_raw_food_reward.mcfunction'), rawFoodRewardFunction.join('\n'));

    // Prepare the commands to be run on a tick
    const tickCommands = [
        `execute as @a[tag=!player_attrs_applied] run function generated:player/apply_attributes_to_one`
    ];

    console.log('Player mechanics generation complete.');

    // Return the commands to be added to the main tick function
    return { tickCommands };
}

module.exports = { generate };
