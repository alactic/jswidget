function initializatonWidget(){
    console.log({windowEnv3: window})
    document.getElementById( 'widget-payment-container' ).style.display = 'none';
    document.getElementById( 'transfer-container-495gjjhg-gkhkhjg' ).style.display = 'flex';
}

function initializeBankPayment(){
    console.log({windowEnv3: window})
    document.getElementById( 'transfer-container-495gjjhg-gkhkhjg' ).style.display = 'none';
    document.getElementById( 'atm-card-container-iitg33405-fgti594' ).style.display = 'flex';
    document.getElementById( 'widget-payment-container' ).style.display = 'flex';
    document.getElementById("card_pay").innerHTML = `Pay ${cardAmount} ${currency}`  
}

function closeModal(){       
    closePaymentWidget();
}