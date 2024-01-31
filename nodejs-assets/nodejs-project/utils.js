const bitcoin = require("bitcoinjs-lib");
const { toXOnly } = require("bitcoinjs-lib/src/psbt/bip371");

const getTapRootAddressFromPublicKey = ({
    publicKey,
    network
})=> {
    try {
        const internalPubkey = toXOnly(publicKey);
        const { address, output } = bitcoin.payments.p2tr({
            internalPubkey,
            network
        });
        if (!address) return { error: true, value: 'Unable to get address from key pair.' };
        if (!output) return { error: true, value: 'Unable to get output from key pair.' };
        return { error: false, address, output };
    } catch (e) {
        console.log(e);
        return { error: true, value: e };
    }
};


module.exports = {
    getTapRootAddressFromPublicKey,
}
