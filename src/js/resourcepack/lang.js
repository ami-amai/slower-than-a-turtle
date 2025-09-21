
function getLanguage(languagePack) {

    const output = {
        "block.minecraft.deepslate_coal_ore": languagePack.deepslate_ore,
        "block.minecraft.deepslate_copper_ore": languagePack.deepslate_ore,
        "block.minecraft.deepslate_diamond_ore": languagePack.deepslate_ore,
        "block.minecraft.deepslate_emerald_ore": languagePack.deepslate_ore,
        "block.minecraft.deepslate_gold_ore": languagePack.deepslate_ore,
        "block.minecraft.deepslate_iron_ore": languagePack.deepslate_ore,
        "block.minecraft.deepslate_lapis_ore": languagePack.deepslate_ore,
        "block.minecraft.deepslate_redstone_ore": languagePack.deepslate_ore,

        "block.minecraft.coal_ore": languagePack.stone_ore,
        "block.minecraft.copper_ore": languagePack.stone_ore,
        "block.minecraft.diamond_ore": languagePack.stone_ore,
        "block.minecraft.emerald_ore": languagePack.stone_ore,
        "block.minecraft.gold_ore": languagePack.stone_ore,
        "block.minecraft.iron_ore": languagePack.stone_ore,
        "block.minecraft.lapis_ore": languagePack.stone_ore,
        "block.minecraft.redstone_ore": languagePack.stone_ore,

        "block.minecraft.nether_gold_ore": languagePack.nether_ore,
        "block.minecraft.nether_quartz_ore": languagePack.nether_ore,

        "item.minecraft.raw_copper": languagePack.raw_ore,
        "item.minecraft.raw_iron": languagePack.raw_ore,
        "item.minecraft.raw_gold": languagePack.raw_ore,

        "block.minecraft.raw_copper_block": languagePack.raw_ore_block,
        "block.minecraft.raw_iron_block": languagePack.raw_ore_block,
        "block.minecraft.raw_gold_block": languagePack.raw_ore_block,

    }

    return JSON.stringify(output, null, 2)
}

module.exports = {
    getLanguage: getLanguage
}