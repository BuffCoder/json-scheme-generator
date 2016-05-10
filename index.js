// let sampleObject = { number: 5, string: 'hello', array: ['test', 6], object: { number: 3 } }


function router(obj) {
    if (typeof obj === 'object') {
        if (Array.isArray(obj)) {
            return jsonArray(obj)
        } else {
            return jsonObject(obj)
        }
    } else {
        return jsonPrimitive(obj)
    }
}

function jsonArray(arr) {
    let items = []

    arr.forEach(obj => {
        items.push(router(obj))
    })

    return {
        type: "array",
        items: items
    }
}

function jsonObject(obj) {
    let output = {
        type: 'object',
        properties: {
            
        },
        required: []
    }
    
    Object.keys(obj).forEach(function (key) {
        output.required.push(key)
        output.properties[key] = router(obj[key])
    })
    
    return output
}

function jsonPrimitive(obj) {
    return {
        type: typeof obj
    }
}

module.exports = router;
