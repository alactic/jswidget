var reference;
var currency;
var publicKey;
var dataPayload;
var clientAmount;
var cardAmount;
var transferAmount;
var mobileMoneyAmount;
var BaseApiUrl = "";

    if(window.location.origin.indexOf('localhost') > -1 || window.location.origin.indexOf('baseonecollectwidgettest') > -1){
        // BaseApiUrl = "https://afcollectionaggregatorprod.azurewebsites.net/v1";
        BaseApiUrl = "https://afcollectionaggregatortest.azurewebsites.net/v1";
    }else if(
     window.location.origin.indexOf('baseonecollectwidgetstaging') > -1){
        BaseApiUrl = "https://afcollectionaggregatorstag.azurewebsites.net/v1";
     } else if(window.location.origin.indexOf('baseonecollectwidgetprod') > -1){
        BaseApiUrl = "https://afcollectionaggregatorprod.azurewebsites.net/v1";
     }
  
    function errorMessage(message){
        document.getElementById( 'payment-header' ).style.display = 'none';
    document.getElementById("transaction-message-fgti594").style.display="flex"
    document.getElementById("transaction-items").style.display="none"
    document.getElementById("transaction-failed-items").style.display="flex"
    document.getElementsByClassName("message-desc")[0].innerHTML=message;
    document.getElementById("transaction-loading-container-fgti594").style.display="none"
}
window.initialise = async function() {
    var url = new URL(window.location.href);
    var urlData = url.searchParams.get("data");
    dataPayload = JSON.parse(urlData);
    const {imageUrl, country} = dataPayload;
    publicKey = dataPayload.publicKey;
    clientAmount = dataPayload.amount;
    currency = dataPayload.currency;
    channel = dataPayload.channel;
    document.getElementById("logo1").src= imageUrl;
    document.getElementById("logo2").src= imageUrl;
    document.getElementById("logo3").src= imageUrl;
    document.getElementById("logo4").src= imageUrl;
    document.getElementById("card-pin").style.display = "none";
    document.getElementsByClassName("logo-icon")[0].src= imageUrl;
    if(channel && channel.toLowerCase() === "transfer") {
        document.getElementById("card").style.display = "none"
    }else if(channel && channel.toLowerCase() === "cards") {
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
        errorMessage(res.message||res.title||"")
     }else{
        const {Cards, Transfer, MobileMoney} = res.responseData.priceingConfigs
        cardAmount = Cards?configAmount(Cards):'';
        transferAmount = Transfer?configAmount(Transfer):"";
        mobileMoneyAmount = MobileMoney?configAmount(MobileMoney):"";
        dataPayload['initReference'] = res.responseData.reference;
        if(currency.toLowerCase() === "kes"){
            document.getElementById( 'kenya-option-container-495gjjhg-gkhkhjg' ).style.display = 'flex';
        }else {
            document.getElementById( 'transfer-container-495gjjhg-gkhkhjg' ).style.display = 'flex';
        }
        document.getElementById("widget-payment-container").style.display="none"
    }
    document.getElementById("transaction-loading-container-fgti594").style.display="none"
    }).catch(error => {
        console.log({error})
    
        
        // errorMessage("Transaction failed")
    })            
                
}
