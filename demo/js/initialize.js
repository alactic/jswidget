var reference;
var currency;
var publicKey;
var dataPayload;
var clientAmount;
var cardAmount;
var transferAmount;
var BaseApiUrl = "";

console.log({baseurl: window.location.origin})
switch(window.location.origin) {
    case window.location.origin.indexOf('localhost') >0 || window.location.origin.indexOf('test') >0:
        BaseApiUrl = "https://afcollectionaggregatortest.azurewebsites.net/api/v1";
        break;
    case window.location.origin.indexOf('staging') >0:
        BaseApiUrl = "https://collectioncardservice-stag.azurewebsites.net/api/v1";
        break;
    case window.location.origin.indexOf('baseonewidgetpayment') >0:
        BaseApiUrl = "https://collectioncardservice-prod.azurewebsites.net/api/v1";
        break;
    default:
        console.log("url")
}
    console.log({windowEnv4: window})
    function errorMessage(message){
    document.getElementById("transaction-message-fgti594").style.display="flex"
    document.getElementById("transaction-items").style.display="none"
    document.getElementById("transaction-failed-items").style.display="flex"
    document.getElementsByClassName("message-desc")[0].innerHTML=message;
    document.getElementById("transaction-loading-container-fgti594").style.display="none"
}
async function initialise() {
    var url = new URL(window.location.href);
    var urlData = url.searchParams.get("data");
    dataPayload = JSON.parse(urlData);
    const {imageUrl, country} = dataPayload;
    publicKey = dataPayload.publicKey;
    clientAmount = dataPayload.amount;
    currency = dataPayload.currency;
    channel = dataPayload.channel;
    document.getElementById("logo").src= imageUrl;
    document.getElementById("logo6").src= imageUrl;
    document.getElementsByClassName("logo-icon")[0].src= imageUrl;

    if(channel.toLowerCase() === "transfer") {
        document.getElementById("card").style.display = "none"
    }else if(channel.toLowerCase() === "card") {
        document.getElementById("transfer").style.display = "none"
    }
    fetch(`${BaseApiUrl}/payment/config`, {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    "Public-Key": publicKey
    },
    body: JSON.stringify({currency, country})
    })
    .then(response => response.json())
    .then(res => {
    if(!res.requestSuccessful){
        errorMessage(res.message)
     }else{
        const {Cards, Transfer} = res.responseData.priceingConfigs
        cardAmount = configAmount(Cards);
        transferAmount = configAmount(Transfer);
        dataPayload['initReference'] = res.responseData.reference;
        document.getElementById( 'transfer-container-495gjjhg-gkhkhjg' ).style.display = 'flex';
        document.getElementById("widget-payment-container").style.display="none"
    }
    document.getElementById("transaction-loading-container-fgti594").style.display="none"
    }).catch(error => {
        errorMessage("Transaction failed")
    })            
                
}
