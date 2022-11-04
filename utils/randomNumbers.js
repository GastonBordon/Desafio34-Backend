const getRandomNumbers =(qNumbers) =>{
    const randoms = {}
    for (let index = 0; index < qNumbers; index++) {
        const randomNumber = Math.floor(Math.random()*1000)
        if(randoms[randomNumber]){
            randoms[randomNumber] = randoms[randomNumber] + 1
        }else{
            randoms[randomNumber] = 1
        }
    }
    return randoms
}

process.on('message', cant => {
    
    process.send(getRandomNumbers(cant))
})

