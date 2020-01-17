const bip39 = require("bip39")
const fs = require("fs-extra")
const path = require('path')

const PATH = process.argv[2] || 'output/factom_wallet.txt'
console.log(`Generating to ${PATH}`)

if (!fs.existsSync(PATH)) {
    fs.ensureFileSync(PATH)
    const mnemonic = bip39.generateMnemonic(32 * 8)
    fs.writeFileSync(PATH, mnemonic)
    console.log(fs.readFileSync(PATH).toString())
}
else {
    console.log('File already exists')
}
