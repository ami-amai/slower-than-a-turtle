execute as @e[type=player] if entity @s[scores={Death=1}] run schedule function pack:vanilla/attribute/player.tick 2t append

function pack:vanilla/attribute/mob.tick
function pack:vanilla/data/creeper.tick
