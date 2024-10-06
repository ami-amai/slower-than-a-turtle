# tellraw @a ""
# tellraw @a [{"translate": "s2t.datapack.name", "color": "green", "bold": true},{"text": " HARDCORE Datapack","color": "red"}]
# tellraw @a {"translate": "s2t.datapack.version", "color": "gray"}


# execute as @p if entity @s[tag=!s2t.uhc] run tellraw @s [{"translate": "s2t.datapack.difficulty"},{"translate": "s2t.datapack.difficulty.basic","color": "yellow","bold": true}]
# execute as @p if entity @s[tag=s2t.uhc] run tellraw @s [{"translate": "s2t.datapack.difficulty"},{"translate": "s2t.datapack.difficulty.uhc","color": "yellow","bold": true}]

# tellraw @a ""
# tellraw @a {"translate": "s2t.datapack.resourcepack.features", "bold": true}
# tellraw @a [{"translate": "s2t.datapack.resourcepack.features.ore","color": "gray"}]
# tellraw @a [{"translate": "s2t.datapack.resourcepack.features.indicator","color": "gray"}]

# tellraw @a ""
# tellraw @a {"translate": "s2t.datapack.difficulty.uhc", "bold": true, "color": "red", "clickEvent": {"action": "run_command","value":"/function pack:basic/uhc"},"hoverEvent": {"action": "show_text","contents": {"translate": "s2t.datapack.difficulty.uhc.hover", "color": "red"}}}

tellraw @a {"text": "-----", "color": "dark_gray"}
tellraw @a {"translate":"stt.name", "bold": true, "color": "green", "hoverEvent": {"action":"show_text","contents": {"translate": "stt.author", "color": "dark_green"}}}
tellraw @a {"translate": "stt.version", "color": "dark_gray"}
tellraw @a ""
tellraw @a {"translate": "stt.world.features.title", "color": "yellow", "hoverEvent": {"action": "show_text", "contents": {"translate": "stt.world.features", "color": "gray"}}}
tellraw @a {"translate": "stt.player.features.title", "color": "yellow", "hoverEvent": {"action": "show_text", "contents": {"translate": "stt.player.features", "color": "gray"}}}
tellraw @a {"translate": "stt.mob.features.title", "color": "yellow", "hoverEvent": {"action": "show_text", "contents": {"translate": "stt.mob.features", "color": "gray"}}}
tellraw @a {"translate": "stt.resourcepack.features.title", "color": "yellow", "hoverEvent": {"action": "show_text", "contents": {"translate": "stt.resourcepack.features", "color": "gray"}}}
tellraw @a {"text": "-----", "color": "dark_gray"}