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

tellraw @a {"text": "--------------------", "color": "dark_gray"}
tellraw @a [{"translate":"stt.name", "bold": true, "color": "green", "hoverEvent": {"action":"show_text","contents": {"translate": "stt.author", "color": "yellow"}}},{"text": " | ", "color": "dark_gray"},{"translate": "stt.version", "color": "gray", "bold": false}]
tellraw @a ""
tellraw @a {"translate": "stt.description.title", "color": "yellow","bold": true, "hoverEvent": {"action": "show_text", "contents": {"translate": "stt.description", "color": "gray", "bold": false}}}
tellraw @a ""
tellraw @a [{"translate": "stt.github.title", "color": "white", "bold": true, "hoverEvent": {"action": "show_text", "contents": {"translate": "stt.github", "color": "yellow"}},"clickEvent": {"action": "copy_to_clipboard", "value": "https://github.com/ami-amai/slower-than-a-turtle/"}}]
tellraw @a [{"translate": "stt.github.readme.title", "color": "white", "bold": true, "hoverEvent": {"action": "show_text", "contents": {"translate": "stt.github.readme", "color": "yellow"}},"clickEvent": {"action": "copy_to_clipboard", "value": "https://github.com/ami-amai/slower-than-a-turtle/blob/main/README.md"}}]
tellraw @a [{"translate": "stt.github.features.title", "color": "white", "bold": true, "hoverEvent": {"action": "show_text", "contents": {"translate": "stt.github.features", "color": "yellow"}},"clickEvent": {"action": "copy_to_clipboard", "value": "https://github.com/ami-amai/slower-than-a-turtle/blob/main/md/en/features_list.md"}}]
tellraw @a {"text": "--------------------", "color": "dark_gray"}