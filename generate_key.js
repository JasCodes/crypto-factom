const bip44 = require("factombip44")
const factom = require("factom")
const fs = require("fs-extra")
const clipboardy = require("clipboardy")


const PATH = process.argv[2] || 'output/factom_wallet.txt'
const WALLET_ID = parseInt(process.argv[3]) || 0

if (fs.pathExistsSync(PATH)) {
    const mnemonic = fs.readFileSync(PATH).toString()
    const wallet = new bip44.FactomHDWallet({ mnemonic })
    const privKey = wallet.generateFactoidPrivateKey(0, 0, WALLET_ID)
    const privAdd = factom.seedToPrivateFctAddress(privKey)
    const pubKey = factom.getPublicAddress(privAdd)

    console.log(mnemonic)
    console.log(`Private Key [${WALLET_ID}]: ${privAdd}`)
    console.log(`Public Key [${WALLET_ID}]: ${pubKey}`)
    console.log(`Public Key [${WALLET_ID}] copied to clipboard!!`)
    clipboardy.writeSync(pubKey)
    const PATH_PUB = `${PATH}.[${WALLET_ID}].pub`
    console.log(`Public Key [${WALLET_ID}] written to clipboard and ${PATH_PUB}`)
    fs.writeFileSync(PATH_PUB, pubKey)
}
else {
    console.log('Input/Check Mnemoic file path')
}

