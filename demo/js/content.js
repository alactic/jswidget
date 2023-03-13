function initializatonWidget(){
    document.getElementById( 'widget-payment-container' ).style.display = 'none';
    document.getElementById( 'transfer-container-495gjjhg-gkhkhjg' ).style.display = 'flex';
}

function initializeBankPayment(){
    document.getElementById( 'transfer-container-495gjjhg-gkhkhjg' ).style.display = 'none';
    document.getElementById( 'atm-card-container-iitg33405-fgti594' ).style.display = 'flex';
    document.getElementById( 'widget-payment-container' ).style.display = 'flex';
    document.getElementById("card_pay").innerHTML = `Pay ${cardAmount.toFixed(2)} ${currency}`  
}

function closeModal(){       
    closePaymentWidget();
}