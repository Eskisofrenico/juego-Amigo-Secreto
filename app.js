// Selección de elementos del DOM
const inputNombre = document.querySelector("#amigo"); // Campo de entrada con ID "amigo"
const listaNombres = [];
let resultadoSorteo = {};

// Función para añadir nombres a la lista
function agregarAmigo() {
    const nombre = inputNombre.value.trim();

    // Validación: Campo vacío
    if (nombre === "") {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }

    // Validación: Solo letras y espacios
    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!soloLetras.test(nombre)) {
        alert("El nombre solo puede contener letras y espacios.");
        inputNombre.value = ""; // Limpiar el campo de entrada
        return;
    }

    // Validación: Nombre repetido
    if (listaNombres.includes(nombre)) {
        alert("Este nombre ya ha sido añadido.");
        inputNombre.value = "";
        return;
    }

    // Añadir nombre a la lista
    listaNombres.push(nombre);
    inputNombre.value = ""; // Limpiar el campo de entrada
    actualizarListaVisual();
}

// Función para actualizar visualmente los nombres en la lista
function actualizarListaVisual() {
    const contenedor = document.querySelector("#listaAmigos"); // Contenedor para mostrar la lista de nombres
    contenedor.innerHTML = ""; // Limpiar contenido previo

    listaNombres.forEach((nombre, index) => {
        const nombreItem = document.createElement("li");
        nombreItem.textContent = `${index + 1}. ${nombre}`;
        contenedor.appendChild(nombreItem);
    });
}

// Función para sortear los amigos secretos
function sortearAmigo() {
    if (listaNombres.length < 2) {
        alert("Debes añadir al menos 2 nombres para hacer un sorteo.");
        return;
    }

    const nombresCopia = [...listaNombres];
    resultadoSorteo = {};

    listaNombres.forEach(nombre => {
        let amigoSecreto;
        do {
            amigoSecreto = nombresCopia[Math.floor(Math.random() * nombresCopia.length)];
        } while (amigoSecreto === nombre || Object.values(resultadoSorteo).includes(amigoSecreto));

        resultadoSorteo[nombre] = amigoSecreto;
    });

    mostrarResultados();
}

// Función para mostrar resultados del sorteo
function mostrarResultados() {
    const contenedorResultados = document.querySelector("#resultado"); // Contenedor para los resultados
    contenedorResultados.innerHTML = ""; // Limpiar resultados previos

    for (const [nombre, amigo] of Object.entries(resultadoSorteo)) {
        const resultado = document.createElement("li");
        resultado.textContent = `${nombre} tiene como amigo secreto a ${amigo}`;
        contenedorResultados.appendChild(resultado);
    }
}

// Vinculación de funciones a botones usando sus clases
document.querySelector(".button-draw").addEventListener("click", sortearAmigo);
