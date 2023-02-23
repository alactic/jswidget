var reference;
var currency;
var publicKey;
var dataPayload;
var clientAmount;
var cardAmount;
var transferAmount;
var BaseApiUrl = "";

    if(window.location.origin.indexOf('localhost') > -1 || window.location.origin.indexOf('baseonecollectwidgettest') > -1){
        BaseApiUrl = "https://afcollectionaggregatortest.azurewebsites.net/api/v1";
    }else if(
     window.location.origin.indexOf('baseonecollectwidgetstaging') > -1){
        BaseApiUrl = "https://collectioncardservice-stag.azurewebsites.net/api/v1";
     } else if(window.location.origin.indexOf('cdn.baseone.co') > -1){
        BaseApiUrl = "https://collectioncardservice-prod.azurewebsites.net/api/v1";
     }

    console.log({windowEnv7: window, BaseApiUrl})
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
        console.log({response: res.requestSuccessful})
    if(!res.requestSuccessful){
        errorMessage(res.message)
     }else{
        const {Cards, Transfer} = res.responseData.priceingConfigs
        cardAmount = configAmount(Cards);
        transferAmount = configAmount(Transfer);
        dataPayload['initReference'] = res.responseData.reference;
        if(currency.toLowerCase === "kes"){
            document.getElementById( 'kenya-container-495gjjhg-gkhkhjg' ).style.display = 'flex';
            document.getElementById("kes_pay").innerHTML = `Pay ${cardAmount} ${currency}`;
            document.getElementById("kes-transaction-title").innerHTML = `How would you like to pay ${currency} ${clientAmount}?`
        }else {
            document.getElementById( 'transfer-container-495gjjhg-gkhkhjg' ).style.display = 'flex';
        }
        document.getElementById("widget-payment-container").style.display="none"
    }
    document.getElementById("transaction-loading-container-fgti594").style.display="none"
    }).catch(error => {
        console.log({error})
        document.getElementById( 'kenya-container-495gjjhg-gkhkhjg' ).style.display = 'flex';
    document.getElementById("transaction-loading-container-fgti594").style.display="none"
    document.getElementById("kes_pay").innerHTML = `Pay ${clientAmount} ${currency}`
    document.getElementById("kes-transaction-title").innerHTML = `How would you like to pay ${currency} ${clientAmount}?`

        
        // errorMessage("Transaction failed")
    })            
                
}
