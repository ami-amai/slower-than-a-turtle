# Old clear
function vanilla:clear_old/clear_old

# Cleaning tags
tag @a remove stt.mob
tag @a remove stt.player.dead

# Cleaning attributes modifiers
execute as @e[type=player] run attribute @s generic.max_health modifier remove player.health
execute as @e[type=player] run attribute @s generic.movement_speed modifier remove player.move
execute as @e[type=player] run attribute @s minecraft:player.block_break_speed modifier remove player.break

execute as @e run attribute @s generic.follow_range modifier remove mob.follow
execute as @e run attribute @s generic.movement_speed modifier remove mob.move

# Cleaning scoreboard
scoreboard players reset @a Death
scoreboard objectives remove Death

# Scoreboard
scoreboard objectives add Death deathCount
scoreboard players enable @e[type=player] Death

# Attribute
schedule function vanilla:attribute/player 2t append
schedule function vanilla:gamerule/gamerule 2t append

# Message
schedule function vanilla:tellraw/message 2t append