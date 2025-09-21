const tag = "stat"

function getLoadTag() {
    
    const output = {
        "values": `[${tag}:load]`
    }

    return JSON.stringify(output, null, 2)
}

function getTickTag() {

    const output = {
        "values": `[${tag}:tick]`
    }

    return JSON.stringify(output, null, 2)

}