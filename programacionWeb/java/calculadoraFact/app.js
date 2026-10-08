const campoNombre = document.querySelector("#nombre");
const campoNumero = document.querySelector("#numero");
const salida = document.querySelector("#resultado");

function obtenerNumero() {
    const nombre = campoNombre.value.trim();
    const textoNumero = campoNumero.value;
    const numero = Number(textoNumero);

    if (nombre === "") {
        salida.textContent = "Escribe tu nombre.";
        return;
    }

    if (textoNumero.trim() === "" || !Number.isInteger(numero) || numero < 0) {
        salida.textContent = "Escribe un número entero igual o mayor que 0.";
        return;
    }

    return { nombre, numero };
}

document.querySelector("#factorial").addEventListener("click", () => {
    const datos = obtenerNumero();
    if (!datos) return;

    let resultado = 1;
    for (let i = 1; i <= datos.numero; i++) {
        resultado *= i;
    }
    salida.textContent = `${datos.nombre}, el factorial de ${datos.numero} es ${resultado}.`;
});

document.querySelector("#cuadrado").addEventListener("click", () => {
    const datos = obtenerNumero();
    if (!datos) return;

    salida.textContent = `${datos.nombre}, el cuadrado de ${datos.numero} es ${datos.numero * datos.numero}.`;
});

document.querySelector("#suma").addEventListener("click", () => {
    const datos = obtenerNumero();
    if (!datos) return;

    let resultado = 0;
    for (let i = 1; i <= datos.numero; i++) {
        resultado += i;
    }
    salida.textContent = `${datos.nombre}, la suma de 1 a ${datos.numero} es ${resultado}.`;
});
