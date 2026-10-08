//console.log("Hola, JavaScript")
let cantidad = 3;
cantidad+=1;
console.log("Resultado:", cantidad);
alert("Bienvenido");
                        //Inspecciona los elementos que hay en el html
const salida = document.querySelector("#salida");
salida.textContent = "Hola";
const notas = [10, 2, 30];
console.log(notas[0]);
notas.push(5); // válido
console.log(notas);
const ultima = notas.pop();//5 Se comporta como una pila fifo
console.log(ultima);
console.log(notas);//[10,2,30]
notas.splice(1,2,6,8);
console.log(notas)//[10,6,8]
notas.push(12); //[10,2,30,12]
notas.sort();
console.log(notas);//[10,6,8]
notas.sort((a,b)=>a-b);
console.log(notas);//[2,10,30]
//notas.forEach(n => console.log(n));

const grupos = new Set(["A", "A", "B"]);
grupos.add("C");
grupos.has("A"); // true
console.log("Despues de agregar");
console.log(grupos)
console.log(grupos.has("A"));//true
console.log(grupos.has("B"))//false
grupos.size; // 3
const cupos = new Map();
cupos.set("A", 30);
cupos.get("A"); // 30
cupos.delete("A");

const alumno = {
nombre: "Ana",
nota: 8,
aprobo() {
return this.nota >= 7;
}
};
console.log(alumno["nombre"]); // Ana
console.log(alumno.aprobo()); // true

class Alumno {
    constructor(nombre) {
    this.nombre = nombre;
    }
    saludar() { return `Hola, ${this.nombre}`; }
}
const ana = new Alumno("Ana");
console.log(ana);
function Grupo(nombre) { this.nombre = nombre;
}
const grupo = new Grupo("A");
console.log(grupo);


const texto = '{"nombre":"Ana","nota":8}';
const alumno1 = JSON.parse(texto);
console.log(alumno1.nota); // 8
const salida1 = JSON.stringify(alumno1);
console.log(salida1);
// {"nombre":"Ana","nota":8}
