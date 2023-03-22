 

function makeTransaction(type){
    const payload =  {...dataPayload, channel: type, redirectUrl:dataPayload['url'] };
    let totalAmount = 0;
    payload["transactionMeta"] = {};
    delete payload['imageUrl']
    delete payload['publicKey']
    delete payload['url'];

    if(type === "cards"){
            let validInput = false
            const chargeParameter = {
            "cardNumber": document.getElementById("c_number").value.split(" ").join(''),
            "cardPin": document.getElementById("c_pin").value,
            "cardCvv": document.getElementById("c_cvv").value,
            "cardExpiredYear": document.getElementById("c_expiry").value === ""? "":"20"+ document.getElementById("c_expiry").value.split('/')[1],
            "cardExpiredMonth": document.getElementById("c_expiry").value.split('/')[0]
        }
            const {cardCvv, cardNumber, cardPin, cardExpiredMonth} = chargeParameter; 
            if(cardNumber ==="") {
                validInput = true;
                document.getElementById("c_number_error").style.display = "block";
            }
            if(cardPin === "" && cardType !=="visa") {
                validInput = true;
                document.getElementById("c_pin_error").style.display = "block";
            }
            if(cardExpiredMonth === "") {
                validInput = true;
                document.getElementById("c_expiry_error").style.display = "block";
            }
            if(cardCvv.length !== 3) {
                validInput = true;
                document.getElementById("c_cvv_error").style.display = "block";
            }
            if(validInput) {
                return
            }
            totalAmount = cardAmount
            payload["chargeParameter"] = chargeParameter;  
            document.getElementById("atm-card-container-iitg33405-fgti594").style.display="none";
        }else if(type === "kes"){
            let validInput = false
            const chargeParameter = {
            //   "amount": document.getElementById("c_acct").value,
              "amount": cardAmount,
             }
            const {amount} = chargeParameter; 
            if(amount ==="") {
                validInput = true;
                document.getElementById("c_acct_error").style.display = "block";
            }
            if(validInput) {
                return
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
        document.getElementById( 'kenya-container-495gjjhg-gkhkhjg' ).style.display = 'none';
        fetch(`${BaseApiUrl}/payment/charge`, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Public-Key": publicKey
        },
        body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(res => {
        const {BankName, AccountNumber, ProviderMessage, ExpiryTime} = res.responseData||{}
        if(!res.requestSuccessful){
            document.getElementById("transaction-message-fgti594").style.display="flex"
            document.getElementById("transaction-items").style.display="none"
            document.getElementById("transaction-failed-items").style.display="flex"
            document.getElementsByClassName("message-desc")[0].innerHTML=res.message
        }else{
            reference = res.responseData.TransactionRefernce;
            if(type === "cards" && cardType ==="visa"){
              console.log({res: res.responseData})
            document.getElementById("transaction-items").style.display="none"

              const {MD, PostUrl, jwt} = res.responseData.FormData
              document.getElementById( 'visa-md' ).value = MD;
              document.getElementById( 'visa-jwt' ).value = jwt;
              document.getElementById( 'visa-form' ).action = PostUrl;
              const form = document.getElementById("visa-form");
              form.submit()
            }else if(type === "cards"){
              document.getElementById( 'otp-container-iitg33405-fgti594' ).style.display = 'flex';
              document.getElementById("transaction-loading-container-fgti594").style.display="none"
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
            document.getElementById("transaction-loading-container-fgti594").style.display="none"
            }                    
        }
   }).catch(error => {
       console.log({error});
   })
    // document.getElementById( 'transfer-container-495gjjhg-gkhkhjg' ).style.display = 'none';
    // document.getElementById( 'bank-transfer-iitg33405-fgti594' ).style.display = 'flex';
}
