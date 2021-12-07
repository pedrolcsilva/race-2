document.getElementById('start-race').disabled = true
document.getElementById('add-pedro').disabled = true
document.getElementById('add-juca').disabled = true
document.getElementById('add-edna').disabled = true

let pedroEsc = 0
let jucaEsc = 0
let ednaEsc = 0


let result = document.getElementById('result');

let car = {
    rarity: ['Popular', 'Sport', 'Super Sport'],
    vMaxMin: [180.0, 195.0, 210.0],
    vMaxMax: [200.0, 215.0, 230.0],
    vMinMin: [110.0, 125.0, 140.0],
    vMinMax: [130.0, 140.0, 160.0],
    derMin: [3.0, 2.0, 1.0],
    derMax: [4.0, 3.0, 1.75]
}

let pedroCars = []
let jucaCars = []
let ednaCars = []


let contP = 0
let contJ = 0
let contE = 0

function createCar(){
    this.number = carType();
    this.rarity = car.rarity[this.number];
    this.vMax = randomNumber(car.vMaxMin[this.number], car.vMaxMax[this.number]);
    this.vMin = randomNumber(car.vMinMin[this.number], car.vMinMax[this.number]);
    this.der = randomNumber(car.derMin[this.number], car.derMax[this.number]);
}

function showCars(num){
    if(num == 1){
        document.querySelectorAll("div.pedro-unit")[pedroCars.length-1].innerHTML = pedroCars[pedroCars.length-1].rarity
        console.log(pedroCars.length)
    }
    else if(num == 2){
        document.querySelectorAll("div.juca-unit")[jucaCars.length-1].innerHTML = jucaCars[jucaCars.length-1].rarity
    }
    else{
        document.querySelectorAll("div.edna-unit")[ednaCars.length-1].innerHTML = ednaCars[ednaCars.length-1].rarity
    }
}

function randomNumber(min, max){
    return Math.random() * (max - min) + min;
}

function carType(){
    let tipo = randomNumber(1, 100);
    if(tipo > 40){
        return 0
    }
    else if(tipo > 5){
        return 1
    }
    else{
        return 2
    }
}

function raceLap(min, max, der){
    let v = randomNumber(min, max);
    v = v - (v * der / 100);
    return v;
}



function race(laps){
    result.innerHTML = ""
    console.log(pedroCars.length)

    contP = 0
    contJ = 0
    contE = 0
    console.log(contP)
    
    while(pedroCars.length > 0){
        document.querySelectorAll("div.pedro-unit")[pedroCars.length - 1].innerHTML = ""
        pedroCars.pop()
    }
    while(jucaCars.length > 0){
        document.querySelectorAll("div.juca-unit")[jucaCars.length - 1].innerHTML = ""
        jucaCars.pop()
    }
    while(ednaCars.length > 0){
        document.querySelectorAll("div.edna-unit")[ednaCars.length - 1].innerHTML = ""
        ednaCars.pop()
    }
    
    console.log(pedroCars.length)

    function raceResult(result){
        let pointsP = 0;
        let pointsJ = 0;
        let pointsE = 0;
        for(let i = 0; i < laps; i++){
            let vP = raceLap(pedroCars[pedroEsc].vMin, pedroCars[pedroEsc].vMax, pedroCars[pedroEsc].der);
            let vJ = raceLap(jucaCars[jucaEsc].vMin, jucaCars[jucaEsc].vMax, jucaCars[jucaEsc].der);
            let vE = raceLap(ednaCars[ednaEsc].vMin, ednaCars[ednaEsc].vMax, ednaCars[ednaEsc].der);
            if(vP > vJ && vP > vE){
                pointsP++;
            }
            if(vJ > vP && vJ > vE){
                pointsJ++;
            }
            if(vE > vP && vE > vJ){
                pointsE++;
            }
        }
        if(pointsP > pointsJ && pointsP > pointsE){
            result.innerHTML = "O Vencedor é Pedro!!"
        }
        else if(pointsJ > pointsP && pointsJ > pointsE){
            result.innerHTML = "O Vencedor é Juca!!"
        }
        else if(pointsE > pointsJ && pointsE > pointsP){
            result.innerHTML = "O Vencedor é Edna!!"
        }
        else if(pointsP == pointsJ && pointsP == pointsE){
            result.innerHTML = "Os Três Empataram";
        }
        else if(pointsP == pointsE){
            result.innerHTML = "Pedro e Edna Empataram!!";
        }
        else if(pointsE == pointsJ){
            result.innerHTML = "Edna e Juca Empataram!!";
        }
        else if(pointsP == pointsJ){
            result.innerHTML = "Pedro e Juca Empataram!!";
        }
    }
    

    pedroCars[0] = new createCar;
    jucaCars[0] = new createCar;
    ednaCars[0] = new createCar;

    showCars(1)
    showCars(2)
    showCars(3)
    
    document.getElementById('start-race').disabled = false
    document.getElementById('start-race').style.opacity = 1
    document.getElementById('add-pedro').disabled = false
    document.getElementById('add-pedro').style.opacity = 1
    document.getElementById('add-juca').disabled = false
    document.getElementById('add-juca').style.opacity = 1
    document.getElementById('add-edna').disabled = false
    document.getElementById('add-edna').style.opacity = 1

    

    document.getElementById('start-race').addEventListener('click', function(){
        raceResult(result)
    })
}

document.getElementById('add-pedro').addEventListener('click', function(){  
    if(pedroCars.length < 5){
        contP++
        pedroCars.push(new createCar()) 
        showCars(1)
    }
})

document.getElementById('add-juca').addEventListener('click', function(){
    if(jucaCars.length < 5){
        contJ++
        jucaCars[contJ] = new createCar()
        showCars(2)
    }
})
document.getElementById('add-edna').addEventListener('click', function(){
    if(ednaCars.length < 5){
        contE++
        ednaCars[contE] = new createCar(contE)
        showCars(3)
    }
})

document.getElementById('choise-1').addEventListener('click', function(){
    document.getElementById('pedro-choise').innerHTML = "Raridade: " + pedroCars[0].rarity
    document.getElementById('pedro-choise').innerHTML += '<br>' + "Velocidade Min.: " + pedroCars[0].vMin + "km/h"
    document.getElementById('pedro-choise').innerHTML += '<br>' + "Velocidade Max.: " + pedroCars[0].vMax + "km/h"
    document.getElementById('pedro-choise').innerHTML += '<br>' + "Derrapagem: " + pedroCars[0].der + "%"
    pedroEsc = 0
})

document.getElementById('choise-2').addEventListener('click', function(){
    document.getElementById('pedro-choise').innerHTML = "Raridade: " + pedroCars[1].rarity
    document.getElementById('pedro-choise').innerHTML += '<br>' + "Velocidade Min.: " + pedroCars[1].vMin + "km/h"
    document.getElementById('pedro-choise').innerHTML += '<br>' + "Velocidade Max.: " + pedroCars[1].vMax + "km/h"
    document.getElementById('pedro-choise').innerHTML += '<br>' + "Derrapagem: " + pedroCars[1].der + "%"
    pedroEsc = 1
})

document.getElementById('choise-3').addEventListener('click', function(){
    document.getElementById('pedro-choise').innerHTML = "Raridade: " + pedroCars[2].rarity
    document.getElementById('pedro-choise').innerHTML += '<br>' + "Velocidade Min.: " + pedroCars[2].vMin + "km/h"
    document.getElementById('pedro-choise').innerHTML += '<br>' + "Velocidade Max.: " + pedroCars[2].vMax + "km/h"
    document.getElementById('pedro-choise').innerHTML += '<br>' + "Derrapagem: " + pedroCars[2].der + "%"
    pedroEsc = 2

})

document.getElementById('choise-4').addEventListener('click', function(){
    document.getElementById('pedro-choise').innerHTML = "Raridade: " + pedroCars[3].rarity
    document.getElementById('pedro-choise').innerHTML += '<br>' + "Velocidade Min.: " + pedroCars[3].vMin + "km/h"
    document.getElementById('pedro-choise').innerHTML += '<br>' + "Velocidade Max.: " + pedroCars[3].vMax + "km/h"
    document.getElementById('pedro-choise').innerHTML += '<br>' + "Derrapagem: " + pedroCars[3].der + "%"
    pedroEsc = 3
})

document.getElementById('choise-5').addEventListener('click', function(){
    document.getElementById('pedro-choise').innerHTML = "Raridade: " + pedroCars[4].rarity
    document.getElementById('pedro-choise').innerHTML += '<br>' + "Velocidade Min.: " + pedroCars[4].vMin + "km/h"
    document.getElementById('pedro-choise').innerHTML += '<br>' + "Velocidade Max.: " + pedroCars[4].vMax + "km/h"
    document.getElementById('pedro-choise').innerHTML += '<br>' + "Derrapagem: " + pedroCars[4].der + "%"
    pedroEsc = 4
})

document.getElementById('choise-6').addEventListener('click', function(){
    document.getElementById('juca-choise').innerHTML = "Raridade: " + jucaCars[0].rarity
    document.getElementById('juca-choise').innerHTML += '<br>' + "Velocidade Min.: " + jucaCars[0].vMin + "km/h"
    document.getElementById('juca-choise').innerHTML += '<br>' + "Velocidade Max.: " + jucaCars[0].vMax + "km/h"
    document.getElementById('juca-choise').innerHTML += '<br>' + "Derrapagem: " + jucaCars[0].der + "%"
    jucaEsc = 0
})

document.getElementById('choise-7').addEventListener('click', function(){
    document.getElementById('juca-choise').innerHTML = "Raridade: " + jucaCars[1].rarity
    document.getElementById('juca-choise').innerHTML += '<br>' + "Velocidade Min.: " + jucaCars[1].vMin + "km/h"
    document.getElementById('juca-choise').innerHTML += '<br>' + "Velocidade Max.: " + jucaCars[1].vMax + "km/h"
    document.getElementById('juca-choise').innerHTML += '<br>' + "Derrapagem: " + jucaCars[1].der + "%"
    jucaEsc = 1
})

document.getElementById('choise-8').addEventListener('click', function(){
    document.getElementById('juca-choise').innerHTML = "Raridade: " + jucaCars[2].rarity
    document.getElementById('juca-choise').innerHTML += '<br>' + "Velocidade Min.: " + jucaCars[2].vMin + "km/h"
    document.getElementById('juca-choise').innerHTML += '<br>' + "Velocidade Max.: " + jucaCars[2].vMax + "km/h"
    document.getElementById('juca-choise').innerHTML += '<br>' + "Derrapagem: " + jucaCars[2].der + "%"
    jucaEsc = 2
})

document.getElementById('choise-9').addEventListener('click', function(){
    document.getElementById('juca-choise').innerHTML = "Raridade: " + jucaCars[3].rarity
    document.getElementById('juca-choise').innerHTML += '<br>' + "Velocidade Min.: " + jucaCars[3].vMin + "km/h"
    document.getElementById('juca-choise').innerHTML += '<br>' + "Velocidade Max.: " + jucaCars[3].vMax + "km/h"
    document.getElementById('juca-choise').innerHTML += '<br>' + "Derrapagem: " + jucaCars[3].der + "%"
    jucaEsc = 3
})

document.getElementById('choise-10').addEventListener('click', function(){
    document.getElementById('juca-choise').innerHTML = "Raridade: " + jucaCars[4].rarity
    document.getElementById('juca-choise').innerHTML += '<br>' + "Velocidade Min.: " + jucaCars[4].vMin + "km/h"
    document.getElementById('juca-choise').innerHTML += '<br>' + "Velocidade Max.: " + jucaCars[4].vMax + "km/h"
    document.getElementById('juca-choise').innerHTML += '<br>' + "Derrapagem: " + jucaCars[4].der + "%"
    jucaEsc = 4
})

document.getElementById('choise-11').addEventListener('click', function(){
    document.getElementById('edna-choise').innerHTML = "Raridade: " + ednaCars[0].rarity
    document.getElementById('edna-choise').innerHTML += '<br>' + "Velocidade Min.: " + ednaCars[0].vMin + "km/h"
    document.getElementById('edna-choise').innerHTML += '<br>' + "Velocidade Max.: " + ednaCars[0].vMax + "km/h"
    document.getElementById('edna-choise').innerHTML += '<br>' + "Derrapagem: " + ednaCars[0].der + "%"
    ednaEsc = 0
})

document.getElementById('choise-12').addEventListener('click', function(){
    document.getElementById('edna-choise').innerHTML = "Raridade: " + ednaCars[1].rarity
    document.getElementById('edna-choise').innerHTML += '<br>' + "Velocidade Min.: " + ednaCars[1].vMin + "km/h"
    document.getElementById('edna-choise').innerHTML += '<br>' + "Velocidade Max.: " + ednaCars[1].vMax + "km/h"
    document.getElementById('edna-choise').innerHTML += '<br>' + "Derrapagem: " + ednaCars[1].der + "%"
    ednaEsc = 1
})

document.getElementById('choise-13').addEventListener('click', function(){
    document.getElementById('edna-choise').innerHTML = "Raridade: " + ednaCars[2].rarity
    document.getElementById('edna-choise').innerHTML += '<br>' + "Velocidade Min.: " + ednaCars[2].vMin + "km/h"
    document.getElementById('edna-choise').innerHTML += '<br>' + "Velocidade Max.: " + ednaCars[2].vMax + "km/h"
    document.getElementById('edna-choise').innerHTML += '<br>' + "Derrapagem: " + ednaCars[2].der + "%"
    ednaEsc = 2
})

document.getElementById('choise-14').addEventListener('click', function(){
    document.getElementById('edna-choise').innerHTML = "Raridade: " + ednaCars[3].rarity
    document.getElementById('edna-choise').innerHTML += '<br>' + "Velocidade Min.: " + ednaCars[3].vMin + "km/h"
    document.getElementById('edna-choise').innerHTML += '<br>' + "Velocidade Max.: " + ednaCars[3].vMax + "km/h"
    document.getElementById('edna-choise').innerHTML += '<br>' + "Derrapagem: " + ednaCars[3].der + "%"
    ednaEsc = 3
})

document.getElementById('choise-15').addEventListener('click', function(){
    document.getElementById('edna-choise').innerHTML = "Raridade: " + ednaCars[4].rarity
    document.getElementById('edna-choise').innerHTML += '<br>' + "Velocidade Min.: " + ednaCars[4].vMin + "km/h"
    document.getElementById('edna-choise').innerHTML += '<br>' + "Velocidade Max.: " + ednaCars[4].vMax + "km/h"
    document.getElementById('edna-choise').innerHTML += '<br>' + "Derrapagem: " + ednaCars[4].der + "%"
    ednaEsc = 4
})



document.getElementById('btn-start-rap').addEventListener('click', function() {
    race(10)
})

document.getElementById('btn-start-pre').addEventListener('click', function() {
    race(70)
})

document.getElementById('btn-start-end').addEventListener('click', function() {
    race(160)
})

document.getElementById('btn-start-pers').addEventListener('click', function() {
    race(document.getElementById('pers').value)
})