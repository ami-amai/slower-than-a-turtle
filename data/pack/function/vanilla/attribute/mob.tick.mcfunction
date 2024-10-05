execute as @e[type=!player] if entity @s[tag=!stt.vanilla.mob] run attribute @s minecraft:generic.movement_speed modifier add mob.move_speed 0.35 add_multiplied_total
execute as @e[type=!player] if entity @s[tag=!stt.vanilla.mob] run attribute @s minecraft:generic.follow_range modifier add mob.follow_range 5.0 add_multiplied_total

execute as @e[type=!player] if entity @s[tag=!stt.vanilla.mob] run tag @s add stt.vanilla.mob