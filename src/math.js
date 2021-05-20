const calculateTip = (total,tipPercentage=0.2)=> total+total*tipPercentage;
const fahrenheitToCelsius = (temp) => {
    return (temp - 32) / 1.8
}

const celsiusToFahrenheit = (temp) => {
    return (temp * 1.8) + 32
}

const Asyncadd = (a,b)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(a< 0 || b <0){
                return reject('Numbers must be non-negative')
            }

            resolve(a+b);
        },100)
    })
}



module.exports= {
    calculateTip,
    fahrenheitToCelsius,
    celsiusToFahrenheit,
    Asyncadd

}