exports.createHash = (num) => {
    let allChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

    let hash = []

    while(num > 0) {
        hash.push(allChars[num%62])
        num = Math.floor(num/62)
    }

    return hash.reverse().join("")

}

exports.decodeHash = function (hash) {
    const map = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let id = 0;
    for(let i=0; i<hash.length; i++) {
        id = id * 62 + map.indexOf(hash[i])
    }
    return id
}