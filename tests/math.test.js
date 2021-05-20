const {calculateTip  ,fahrenheitToCelsius, celsiusToFahrenheit,Asyncadd} = require('../src/math.js')

test('Calculate the total with the tip',()=>{
    const total = calculateTip(10,0.3);
    
    expect(total).toBe(13);
});

test('Calculate total with default tip',()=>{
    const total=calculateTip(10);
    expect(total).toBe(12);
});

test("Should convert 32 F to 0 C",()=>{
    const celcius = fahrenheitToCelsius(32);
    expect(celcius).toBe(0);
});

test("Should convert 0 C to 32 F",()=>{
    const farenheit = celsiusToFahrenheit(0);
    expect(farenheit).toBe(32);
});

test('Async test demo', async (done)=>{
    Asyncadd(4,5).then(sum=>{
        expect(sum).toBe(9);
        done();
    });
});

test('Async and await',async()=>{
    const sum = await Asyncadd(4,10);
    expect(sum).toBe(14)
});