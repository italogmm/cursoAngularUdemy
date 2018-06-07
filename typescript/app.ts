let message: string = "Help me, Obi-Wan Kenobi. You're my only hope!";
console.log(message);

let episode: number = 4
console.log("This is episode " + 4)
episode  = episode + 1
console.log("Next episode is " + episode)

let favoriteDroid: string
favoriteDroid  = 'BB-8'
console.log("My favorite droid is " + favoriteDroid)

let minhaFuncao = function(param1:number, param2?:number, param3?:number): void{
  console.log("Param 1: " + param1)
  console.log("Param 2: " + param2)
  console.log("Param 3: " + param3)
}

minhaFuncao(11, 12, 13);

let isEnoughToBeatMF = function(parsecs: number): boolean {
  return parsecs < 12
}

let distance = 14
console.log(`Is ${distance} parsecs enough to beat Millenium Falcon? ${isEnoughToBeatMF(distance) ? 'YES' : 'NO'}`)

let call = (name: string) => console.log(`Do you copy, ${name}`)
call('R2')

function inc(speed:number, int: number = 1) : number{
  return speed + int;
}

console.log(`inc (5,1) = ${inc(5,1)}`)
console.log(`inc (5) = ${inc(5)}`)
