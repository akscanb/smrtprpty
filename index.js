var Colu = require('colu')
//initializing with testnet settings
//to initialize with mainnet attain api key
//var apiKey = 'ENTER API KEY'
/*var settings = {
  network:'mainnet',
  apiKey: apiKey,
  privateSeed: null
}*/
var settings = {
  network:'testnet',
  privateSeed: null,
  coloredCoinsHost: 'https://testnet.api.coloredcoins.org',
  coluHost: 'https://testnet.engine.colu.co'
}
var colu = new Colu(settings)

//initializing asset amount key in json object
//We can embed arbitrary amounts of metadata into our assets
//We can make assets reissuable by including the reissuable key
//However when reissuing assets be aware that we need to add an issuance address.
var asset = {
  amount: 10000,
  reissuable: true,
  metadata: {
    'assetName': 'SmartProperty',
    'issuer': 'smrtprpty',
    'description': 'smart property share'
  }
}

issueAddress = 'muy2QnyzQDTpZuJrmhU8FiMKeB8i3sHtRC'

//we can use the asset in our asset parameter of issueAsset
colu.on('connect', function(){
  colu.issueAsset(asset,function(err,body){
    if(err) return console.error(err)
    console.log("Body: ", body)
  })

  //privateSeed = colu.hdwallet.getPrivateSeed()
  //console.log("privateSeed: ", privateSeed)
})

colu.init(function(err, coluInstance){
  if (err) throw err
  //privateSeed = coluInstance.hdwallet.getPrivateSeed()
  //console.log("privateSeed: ", privateSeed)
})
