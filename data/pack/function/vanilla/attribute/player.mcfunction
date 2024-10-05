execute as @e[type=player] run attribute @s generic.max_health modifier add player.max_health -0.7 add_multiplied_total
execute as @e[type=player] run attribute @s generic.movement_speed modifier add player.move_speed -0.2 add_multiplied_total
execute as @e[type=player] run attribute @s minecraft:player.block_break_speed modifier add player.break_speed -0.9 add_multiplied_total