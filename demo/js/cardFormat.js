function c_format(event) {
    var code = (event.which) ? event.which : event.keyCode;
    if ((code < 48 || code > 57) && (code > 31)) {
        return false;
    }

    const value = document.getElementById("c_number").value;
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{4,16}/g);
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
    const value = document.getElementById("c_expiry").value;
    const cardExpiry = value.replace(
        /[^0-9]/g, '' // To allow only numbers
    ).replace(
        /^([2-9])$/g, '0$1' // To handle 3 > 03
    ).replace(
        /^(1{1})([3-9]{1})$/g, '0$1/$2' // 13 > 01/3
    ).replace(
        /^0{1,}/g, '0' // To handle 00 > 0
    ).replace(
        /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, '$1/$2' // To handle 113 > 11/3
    );
}

function c_cvv_format(){
    const value = document.getElementById("c_cvv").value;
    var v = value.replace(
        /[^0-9]/g, '' // To allow only numbers
    )
    document.getElementById("c_cvv").value = v;    
}

function c_pin_format(){
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
