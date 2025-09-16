const fs = require('fs-extra');
const path = require('path');
const config = require('../config.json');
const textureConfig = require('../json/textures.json');

const rpPath = './resourcepack/assets/minecraft';

async function generate() {
    console.log('Generating resourcepack modifications...');
    const { unify_ores, unify_raw_ores } = config.game_mechanics.resourcepack_generation;

    if (unify_ores) {
        await unifyOreBlocks();
        await unifyOreNames();
    }

    if (unify_raw_ores) {
        await unifyRawOreItems();
    }

    console.log('Resourcepack modification generation complete.');
}

async function unifyOreBlocks() {
    console.log('Unifying ore block models...');
    const modelPath = path.join(rpPath, 'models/block');
    const blockstatePath = path.join(rpPath, 'blockstates');
    await fs.ensureDir(modelPath);
    await fs.ensureDir(blockstatePath);

    const allOres = [...textureConfig.ores.overworld, ...textureConfig.ores.nether];
    const deepslateOres = allOres.map(ore => `deepslate_${ore}_ore`);
    const netherOres = textureConfig.ores.nether.map(ore => `nether_${ore}_ore`);
    const oreBlocks = [...allOres.map(ore => `${ore}_ore`), ...deepslateOres, ...netherOres];

    // Add base blocks that look like ores now
    oreBlocks.push('deepslate', 'stone', 'netherrack');


    const genericOreModel = {
        parent: "minecraft:block/cube_all",
        textures: {
            all: "minecraft:block/stone" // Using stone as the base, can be changed to a custom texture
        }
    };

    for (const ore of oreBlocks) {
        // Generate model file
        await fs.writeJson(path.join(modelPath, `${ore}.json`), genericOreModel, { spaces: 4 });

        // Generate blockstate file
        const blockstate = {
            variants: {
                "": { model: `minecraft:block/${ore}` }
            }
        };
        await fs.writeJson(path.join(blockstatePath, `${ore}.json`), blockstate, { spaces: 4 });
    }
}

async function unifyOreNames() {
    console.log('Unifying ore names...');
    const langPath = path.join(rpPath, 'lang');
    const allOres = [...textureConfig.ores.overworld, ...textureConfig.ores.nether];
    const deepslateOres = allOres.map(ore => `deepslate_${ore}_ore`);
     const netherOres = textureConfig.ores.nether.map(ore => `nether_${ore}_ore`);
    const oreBlocks = [...allOres.map(ore => `${ore}_ore`), ...deepslateOres, ...netherOres];

    const langFiles = ['en_us.json', 'ru_ru.json'];
    for (const langFile of langFiles) {
        const filePath = path.join(langPath, langFile);
        let langJson = await fs.readJson(filePath);
        for (const ore of oreBlocks) {
            langJson[`block.minecraft.${ore}`] = langFile === 'ru_ru.json' ? 'Руда' : 'Ore';
        }
        await fs.writeJson(filePath, langJson, { spaces: 4 });
    }
}

async function unifyRawOreItems() {
    console.log('Unifying raw ore item models...');
    const modelPath = path.join(rpPath, 'models/item');
    await fs.ensureDir(modelPath);

    const rawOresToUnify = ['raw_iron', 'raw_gold', 'raw_copper'];
    const genericRawModel = {
        parent: "minecraft:item/generated",
        textures: {
            "layer0": "minecraft:item/raw_iron" // Using raw iron as the base, can be changed
        }
    };

    for (const ore of rawOresToUnify) {
        await fs.writeJson(path.join(modelPath, `${ore}.json`), genericRawModel, { spaces: 4 });
    }
}


module.exports = { generate };
