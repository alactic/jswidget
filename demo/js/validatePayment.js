function validatePayment(type){
    let validateUrl = `${BaseApiUrl}/payment/validate?transactionReference=${reference}`
    if(type === "card") {
        let cardPin = "";
        [1,2,3,4, 5,6].forEach(val=>{
            cardPin = cardPin + document.getElementById(`c_otp${val}`).value
        });
        if(cardPin.length !== 6) {
            return
        }
        validateUrl = validateUrl+ `&otp=${cardPin}`
        document.getElementById( 'otp-container-iitg33405-fgti594' ).style.display = 'none';
    }
    document.getElementById("transaction-loading-container-fgti594").style.display="flex";
    document.getElementById( 'bank-transfer-iitg33405-fgti594' ).style.display = 'none';

    fetch(validateUrl, {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    "Public-Key": publicKey
    },
    body: null
    })
    .then(response => response.json())
    .then(res => {
        const status = res.responseData && res.responseData.transactionStatus
        if(!res.requestSuccessful || (status !== "Processing" && status !== "Success")){
                document.getElementById("transaction-message-fgti594").style.display="flex"
                document.getElementById("transaction-items").style.display="none"
                document.getElementById("transaction-failed-items").style.display="flex"
                document.getElementsByClassName("message-desc")[0].innerHTML=res.message==="Successful"?"Failed":res.message;
                const url = new URL(window.location.href);
                document.getElementById("transaction-loading-container-fgti594").style.display="none"

            }else if(status !== "Processing" || (type === "card" && status === "Processing")){
                document.getElementById("transaction-message-fgti594").style.display="flex"
                document.getElementById("transaction-items").style.display="flex"
                document.getElementById("transaction-failed-items").style.display="none"
                document.getElementsByClassName("amount")[0].innerHTML=res.message
                document.getElementsByClassName("currency")[0].innerHTML=res.message
                document.getElementById("bank-name").innerHTML=res.message
                document.getElementById("account-number").innerHTML=res.message
                document.getElementsByClassName("message-desc")[0].innerHTML=res.message;
                const url = new URL(window.location.href);
                // const successRes = url.searchParams.get("success");
                // const onSuccess = eval("(" + successRes + ")");
                // onSuccess()
            document.getElementById("transaction-loading-container-fgti594").style.display="none"
        }else{
           setTimeout(() => validatePayment(), 15000)
        }
    
   }).catch(error => {
       console.log({error});
   })
       
}
