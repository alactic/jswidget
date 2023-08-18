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
    document.getElementById("transaction-counter").style.display="flex";
    
    const counterInterval = setInterval(()=> {
        let counter = document.getElementById("transaction-counter-second").innerHTML;
        document.getElementById("transaction-counter-second").innerHTML = Number(counter) - 1;
        if(Number(counter) === 1) {
            document.getElementById("transaction-counter-second").innerHTML =  59
            let counterMin = document.getElementById("transaction-counter-digit").innerHTML;
            if(Number(counterMin) === 0) {
                document.getElementById("transaction-message").style.display="flex";
                document.getElementById("transaction-feedback-close-btn-div").style.display="flex";
                document.getElementById("transaction-counter").style.display="none";
                document.getElementById("loader-content").style.display="none";
            }else {
                document.getElementById("transaction-counter-digit").innerHTML = Number(counterMin) - 1;
            }
        }
    }, 1000)
   
    let makeValidationInterval
    const makeValidation = async() =>{
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
                const status = res.responseData && res.responseData.transactionStatus;
                if(res.responseData && status !=="Pending" && status !== "Processing" && status !== "Success"){
                        document.getElementById("transaction-message-fgti594").style.display="flex"
                        document.getElementById("transaction-items").style.display="none"
                        document.getElementById("transaction-failed-items").style.display="flex"
                        document.getElementsByClassName("message-desc")[0].innerHTML=res.message==="Successful"?"Failed":res.message;
                        const url = new URL(window.location.href);
                        document.getElementById("transaction-loading-container-fgti594").style.display="none"
                        clearInterval(counterInterval)
                        clearInterval(makeValidationInterval)
                        
                    }else if((status !== "Processing" &&  status !=="Pending") || (type === "card" && status === "Processing")){
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
                    makeValidationInterval = setTimeout(() => makeValidation(), 15000)
                }
            
           }).catch(error => {
               console.log({error});
           })
    }
    makeValidation()
       
}
