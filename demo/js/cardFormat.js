
function c_format(event) {
    var code = (event.which) ? event.which : event.keyCode;
    if ((code < 48 || code > 57) && (code > 31)) {
        return false;
    }
    document.getElementById("c_number_error").style.display = "none";
    const value = document.getElementById("c_number").value;
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{4,19}/g);
    var match = matches && matches[0] || ''
    var parts = []

    for (i=0, len=match.length; i<len; i+=4) {
        parts.push(match.substring(i, i+4))
    }

    if (parts.length) {
        document.getElementById("c_number").value = parts.join(' ');
        return
    } else {
        return value
    }
}

function c_expires_format(event) {
    var inputChar = String.fromCharCode(event.keyCode);
    var code = event.keyCode;
    var allowedKeys = [8];
    if (allowedKeys.indexOf(code) !== -1) {
        return;
    }
    document.getElementById("c_expiry_error").style.display = "none";

    // const value = document.getElementById("c_expiry").value;
    const cardExpiry = event.target.value.replace(
        /^([1-9]\/|[2-9])$/g, '0$1/' // To handle 3/ > 03/
    ).replace(
        /^(0[1-9]{1}|1[0-2]{1})$/g, '$1/' // 11 > 11/
    ).replace(
        /^([0-1]{1})([3-9]{1})$/g, '0$1/$2' // 13 > 01/3
    ).replace(
        /^(\d)\/(\d\d)$/g, '0$1/$2' // To handle 1/11 > 01/11
    ).replace(
        /^(0?[1-9]{1}|1[0-2]{1})([0-9]{2})$/g, '$1/$2' // 141 > 01/41
    ).replace(
        /^([0]{1,})\/|[0]{1,}$/g, '0' // To handle 0/ > 0 and 00 > 0
    ).replace(
        /[^\d\/]|^[\/]{0,}$/g, '' // To allow only numbers and /
    ).replace(
        /\/\//g, '/' // Prevent entering more than 1 /
    );
    document.getElementById('c_expiry').value = cardExpiry
}

function c_cvv_format(){
    document.getElementById("c_cvv_error").style.display = "none";
    const value = document.getElementById("c_cvv").value;
    var v = value.replace(
        /[^0-9]/g, '' // To allow only numbers
    )
    document.getElementById("c_cvv").value = v;    
}
function c_kes_acct_format(){
    document.getElementById("c_acct_error").style.display = "none";
    const value = document.getElementById("c_acct").value;
    var v = value.replace(
        /[^0-9]/g, '' // To allow only numbers
    )
    document.getElementById("c_acct").value = v;    
}

function c_pin_format(){
    document.getElementById("c_pin_error").style.display = "none";
    const value = document.getElementById("c_pin").value;
    var v = value.replace(
        /[^0-9]/g, '' // To allow only numbers
    )
    document.getElementById("c_pin").value = v;    
}

function c_otp_format(type) {
    if(type < 4 && document.getElementById(`c_otp${type}`).value !=="") {
        document.getElementById(`c_otp${type+1}`).focus();
    }
}
