function initializatonWidget(){
    document.getElementById( 'widget-payment-container' ).style.display = 'none';
    document.getElementById( 'transfer-container-495gjjhg-gkhkhjg' ).style.display = 'flex';
}

function initializeMobileMoney(){
    document.getElementById( 'kenya-option-container-495gjjhg-gkhkhjg' ).style.display = 'none';
    document.getElementById( 'kenya-container-495gjjhg-gkhkhjg' ).style.display = 'flex';
    document.getElementById("kes_pay").innerHTML = `Pay ${mobileMoneyAmount} ${currency}`;
    document.getElementById("kes-transaction-title").innerHTML = `How would you like to pay ${currency} ${mobileMoneyAmount}?` 
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