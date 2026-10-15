const abrir = document.getElementById("abrir");
const cerrar = document.getElementById("cerrar");
const modal = document.getElementById("modal");
const mensaje = document.getElementById(
 "mensaje-modal"
);
/*
abrir.addEventListener("click", () => {
 modal.showModal();
});

*/
cerrar.addEventListener("click", () => {
 modal.close();
});


function abrirModal(texto) {
 mensaje.textContent = texto;
 modal.showModal();
}

abrir.addEventListener("click", () => {
 abrirModal("Hola, alumnos");
});

const despedida = document.getElementById(
 "abrir-despedida"
);
despedida.addEventListener("click", () => {
 abrirModal("Hasta la próxima clase");
});
const curso = document.getElementById("curso");
curso.addEventListener("click", () => {
 abrirModal("Programación web");
});

