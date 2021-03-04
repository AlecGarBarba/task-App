const bcrypt =require('bcryptjs');

const myFunction = async ()=>{
    const password = 'Red12345!'

    const hashedPassword = await bcrypt.hash(password, 2); //number of rounds the hash algorithm runs
    const hashedPassword8 = await bcrypt.hash(password, 8);
    const hashedPassword12 = await bcrypt.hash(password, 12);
    console.log(password);
    console.log(hashedPassword);
    console.log(hashedPassword8);
    console.log(hashedPassword12);

    const isMatch = await bcrypt.compare('Red12345!', hashedPassword8);

    console.log(isMatch);

}

myFunction();