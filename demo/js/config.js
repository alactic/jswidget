function configAmount(option) {
    let fee = 0;
    const value = option["flatRate"] + ((option["percentage"]*clientAmount)/100);
    if(value > option["pricingCap"]) {
        fee = option["pricingCap"]
    }else{
        fee = value
    }
    const totalAmount = clientAmount + fee;
    return totalAmount
}
