# Cleaning tags
tag @a remove stt.vanilla.mob
tag @a remove stt.vanilla.player.dead

# Cleaning attributes modifiers
execute as @e[type=player] run attribute @s generic.max_health modifier remove player.max_health
execute as @e[type=player] run attribute @s generic.movement_speed modifier remove player.move_speed
execute as @e[type=player] run attribute @s player.block_break_speed modifier remove player.break_speed

execute as @e run attribute @s generic.follow_range modifier remove mob.follow_range
execute as @e run attribute @s generic.movement_speed modifier remove mob.move_speed

# Cleaning scoreboard
scoreboard players reset @a Death
scoreboard objectives remove Death

# Scoreboard
scoreboard objectives add Death deathCount
scoreboard players enable @e[type=player] Death

# Attribute
schedule function pack:vanilla/attribute/player 2t append
schedule function pack:vanilla/gamerule/gamerule 2t append

# Message
schedule function pack:vanilla/tellraw/message 2t append