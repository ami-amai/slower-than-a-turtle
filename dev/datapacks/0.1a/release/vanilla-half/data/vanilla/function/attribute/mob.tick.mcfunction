execute as @e[type=!player] if entity @s[tag=!stt.mob] run attribute @s minecraft:generic.movement_speed modifier add mob.move 0.175 add_multiplied_total
execute as @e[type=!player] if entity @s[tag=!stt.mob] run attribute @s minecraft:generic.follow_range modifier add mob.follow 2.5 add_multiplied_total

execute as @e[type=!player] if entity @s[tag=!stt.mob] run tag @s add stt.mob