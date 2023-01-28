function makeTransaction(type){
    const payload =  {...dataPayload};
    let totalAmount = 0;
    payload["transactionMeta"] = {};
    delete payload['imageUrl']
    delete payload['publicKey']
    delete payload['url'];

    if(type === "card"){
        const chargeParameter = {
        "cardNumber": document.getElementById("c_number").value,
        "cardPin": document.getElementById("c_pin").value,
        "cardCvv": document.getElementById("c_cvv").value,
        "cardExpiredYear": "20"+ document.getElementById("c_expiry").value.split('/')[1],
        "cardExpiredMonth": document.getElementById("c_expiry").value.split('/')[0]
       }
        totalAmount = cardAmount
        payload["chargeParameter"] = chargeParameter;  
         document.getElementById("atm-card-container-iitg33405-fgti594").style.display="none";
        }else {
            totalAmount = transferAmount
            payload["chargeParameter"] = {};    
        }
        

        document.getElementById("widget-payment-container").style.display="flex";
        document.getElementById("transaction-loading-container-fgti594").style.display="flex";
        document.getElementById( 'transfer-container-495gjjhg-gkhkhjg' ).style.display = 'none';
        fetch(`https://afcollectionaggregatortest.azurewebsites.net/api/v1/widget/charge`, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Api-Key": publicKey
        },
        body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(res => {
        const {BankName, AccountNumber, ProviderMessage, ExpiryTime} = res.responseData
        if(!res.requestSuccessful){
            document.getElementsByClassName("transaction-feedback-container-iitg33405-fgti594")[0].style.display="flex"
            document.getElementsByClassName("transaction-message-items")[0].style.display="none"
            document.getElementsByClassName("transaction-failed-message-items")[0].style.display="flex"
            document.getElementsByClassName("message-desc")[0].innerHTML=res.message
        }else{
            reference = res.responseData.TransactionRefernce;
            if(type === "card"){
              document.getElementById( 'otp-container-iitg33405-fgti594' ).style.display = 'flex';
            }else{
                document.getElementsByClassName( 'bank-transfer-container-iitg33405-fgti594' )[0].style.display = 'flex';
                document.getElementsByClassName("amount")[0].innerHTML=totalAmount
            document.getElementsByClassName("currency")[0].innerHTML=currency
            document.getElementsByClassName("amount")[1].innerHTML=totalAmount
            document.getElementsByClassName("currency")[1].innerHTML=currency
            document.getElementById("bank-name").innerHTML=BankName
            document.getElementById("account-number").innerHTML=AccountNumber
            document.getElementById("expiryTime").innerHTML=ExpiryTime
            document.getElementsByClassName("message-desc")[0].innerHTML=res.message;
            }                    
        }
    document.getElementById("transaction-loading-container-fgti594").style.display="none"
   }).catch(error => {
       console.log({error});
   })
    // document.getElementById( 'transfer-container-495gjjhg-gkhkhjg' ).style.display = 'none';
    // document.getElementById( 'bank-transfer-iitg33405-fgti594' ).style.display = 'flex';
}
