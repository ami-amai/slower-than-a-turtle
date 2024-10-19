tellraw @a {"text": "--------------------", "color": "dark_gray"}

tellraw @a [{"translate":"stt.name", "bold": true, "color": "green", "hoverEvent": {"action":"show_text","contents": {"translate": "stt.author", "color": "yellow"}}}]

tellraw @a {"translate": "stt.description.title", "color": "dark_gray","bold": false, "hoverEvent": {"action": "show_text", "contents": {"translate": "stt.description", "color": "gray", "bold": false}}}
tellraw @a ""

tellraw @a [{"translate": "stt.github.title", "color": "white", "bold": false, "hoverEvent": {"action": "show_text", "contents": {"translate": "stt.github", "color": "yellow"}},"clickEvent": {"action": "copy_to_clipboard", "value": "https://github.com/ami-amai/slower-than-a-turtle/"}}]
tellraw @a [{"translate": "stt.github.features.title", "color": "white", "bold": false, "hoverEvent": {"action": "show_text", "contents": {"translate": "stt.github.features", "color": "yellow"}},"clickEvent": {"action": "copy_to_clipboard", "value": "https://github.com/ami-amai/slower-than-a-turtle/blob/main/md/en/features_list.md"}}]

tellraw @a {"text": "--------------------", "color": "dark_gray"}