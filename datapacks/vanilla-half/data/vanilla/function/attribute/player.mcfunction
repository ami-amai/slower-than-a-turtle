execute as @e[type=player] run attribute @s generic.max_health modifier add player.health -0.3 add_multiplied_total
execute as @e[type=player] run attribute @s generic.movement_speed modifier add player.move -0.1 add_multiplied_total
execute as @e[type=player] run attribute @s minecraft:player.block_break_speed modifier add player.break -0.8 add_multiplied_total