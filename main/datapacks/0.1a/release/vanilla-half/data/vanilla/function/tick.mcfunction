execute as @e[type=player] if entity @s[scores={Death=1}] run schedule function vanilla:attribute/player.tick 2t append

function vanilla:clear_old/clear_old.tick

function vanilla:attribute/mob.tick
function vanilla:data/creeper.tick