const express = require('express');
const TronWeb = require('tronweb');
const bodyParser = require('body-parser')

const fullNode = "https://api.trongrid.io"
const testfullNode = "https://api.shasta.trongrid.io"

const app = express();
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.status(200)
        .json({message: 'This is trx send api'});
})

app.post('/send', async (req, res) => {
    try {
        const {receiver, amount} = req.body;
        const tronWeb = new TronWeb({fullHost: fullNode, privateKey: '04ba8a1a03789f09cb57249bb28f2fe7698f1ba018b31655eec3724688a717bf'});
        const unSignedTxn = await tronWeb.transactionBuilder.sendTrx(receiver, amount);
        const signedTxn = await tronWeb.trx.sign(unSignedTxn);
        const ret = await tronWeb.trx.sendRawTransaction(signedTxn);
        res.status(200).json({response: ret});
    } catch (e) {
        res.status(400).json({error: e});
        console.log(e)
    }
})

app.listen(process.env.PORT || 3000)
