document.getElementById('agregarDatos').addEventListener('click', function () {

    var afiliado = document.getElementById("afiliado").value;
    var nroAfiliado = document.getElementById("nroAfiliado").value;
    var domicilio = document.getElementById("domicilio").value;
    var medico = document.getElementById("medico").value;
    var numpdf = document.getElementById("numpdf").value;


    document.getElementById("vista-medico").textContent = medico;
    document.getElementById("vista-numpdf").textContent = numpdf;

    document.getElementById("vista-afiliado").textContent = afiliado;
    document.getElementById("vista-nroAfiliado").textContent = nroAfiliado;
    document.getElementById("vista-domicilio").textContent = domicilio;



    let listaOpciones = document.getElementById("lista");
    opcionSeleccionada = listaOpciones.options[listaOpciones.selectedIndex].text;
    document.getElementById("vista-iva").innerHTML = opcionSeleccionada;


    var clientName = document.getElementById("nombre-cliente").value;
    var cuitCliente = document.getElementById("cuit-cliente").value;
    var observaciones = document.getElementById("Observaciones").value;


    
    document.getElementById("vista-nombre-cliente").textContent = clientName;
    document.getElementById("vista-cuit-cliente").textContent = cuitCliente;
    document.getElementById("vista-observaciones").innerHTML = observaciones.replace(/\n/g, '<br>');


    calcularTotal();
});

let contadorTablas = 1;


function agregarHoja() {
    let todoPrepOriginal = document.getElementById("todoPrep");
    let todoPrepDuplicado = todoPrepOriginal.cloneNode(true);
    todoPrepDuplicado.id = 'todoPrep' + contadorTablas; // Cambiar el id del div duplicado

    let contenedor = document.getElementById('todo');
    contenedor.appendChild(todoPrepDuplicado); // Agregar el div duplicado al contenedor

    // Obtener la tabla dentro de 'todoPrepDuplicado'
    let tabla = todoPrepDuplicado.getElementsByTagName('table')[0];

    // Cambiar el id de la tabla
    tabla.id = 'mostrarDatos' + contadorTablas;

    document.getElementById("total").id = "total1";

    while (tabla.rows.length > 1) { // Empezamos desde la segunda fila (índice 1)
        tabla.deleteRow(1);
    }

    contadorTablas++; // Incrementar el contador de tablas
    calcularTotal();
}




let contador = 0;

function agregarItems() {
    contador++;

    if (contador > 0 && contador < 6) {
        agregar1();
    } else if (contador == 6) {
        agregarHoja();
    } else if (contador > 6 && contador < 12) {
        agregar2();
    }

    calcularTotal();
    // Mostrar alerta si se ha alcanzado el límite de tablas
    if (contador > 11) {
        alert('No se pueden agregar más tablas.');
    }

}
//CAMBIAR EL 12
document.getElementById('agregarItems').addEventListener('click', agregarItems);


function agregar1() {
    let descripcion = document.getElementById('descripcion').value;

    let fila = document.createElement('tr');
    fila.innerHTML = `
    <tbody>
            <td><p>${descripcion.replace(/\n/g, '<br>')}</p></td>
    </tbody>
    <button onclick="eliminar(this)" class="btnel"></button>
    `;

    document.getElementById('mostrarDatos').appendChild(fila);

    calcularTotal();


}

function agregar2() {
    let descripcion = document.getElementById('descripcion').value;

    let fila = document.createElement('tr');
    fila.innerHTML = `
    <tbody>
            <td><p>${descripcion.replace(/\n/g, '<br>')}</p></td>
    </tbody>
    <button onclick="eliminar(this)" class="btnel"></button>
    `;

    document.getElementById('mostrarDatos1').appendChild(fila);

    calcularTotal();


}

window.onload = function () {
    var fecha = new Date();
    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1;
    var anio = fecha.getFullYear();

    document.getElementById("fecha-actual").innerHTML = "FECHA: " + dia + "/" + mes + "/" + anio;
}


function eliminarCeldasDeTabla(tabla) {
    for (let i = tabla.rows.length - 1; i > 0; i--) {
        tabla.deleteRow(i);
    }
}

function eliminar(elemento) {
    elemento.parentElement.remove();
    contador--; // Restar 1 al contador de celdas
    calcularTotal();
}



document.getElementById('savePdf').addEventListener('click', function () {
    var countForPDF = document.getElementById("numpdf").value;

    var elements = window.document.querySelectorAll('#todo');
    var opt = {
        margin: 0,
        filename: 'PRESUPUESTO IMPLANTECH ' + countForPDF + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    elements.forEach(function (element) {
        html2pdf().from(element).set(opt).save();
    });


});

document.getElementById('nuevoPrep').addEventListener('click', function () {
    incrementAndSave();
    location.reload();
});





function calcularTotal() {
    var sum = parseFloat(document.getElementById("montoTotal").value);
    var valor = document.getElementById('porcIVA').value;
    var porcentaje = sum * valor / 100; // Ajusta este valor al porcentaje que deseas sumar
    var stotal = sum;
    var total = (sum + porcentaje); // Agregar el formato de puntos para separar grupos

    var totaliva = porcentaje.toLocaleString('es-ES');
    var stotalFormatted = stotal.toLocaleString('es-ES');
    var totalFormatted = total.toLocaleString('es-ES');

    document.getElementById('stotal').textContent = stotalFormatted;
    document.getElementById('totalIVA').textContent = totaliva;
    document.getElementById('total').textContent = totalFormatted;
    document.getElementById('total1').textContent = totalFormatted;
}


// Asegúrate de que este código se ejecute después de que la tabla esté creada
var table = document.getElementById('mostrarDatos');

table.addEventListener('DOMNodeInserted', function (event) {
    if (event.target.tagName === 'TR') {
        calcularTotal();
    }
});

table.addEventListener('DOMNodeRemoved', function (event) {
    if (event.target.tagName === 'TR') {
        calcularTotal();
    }
});



document.addEventListener('DOMContentLoaded', function () {
    let incrementNumber = localStorage.getItem('incrementNumber') || '001-346';
    let numberDiv = document.getElementById('count');
    numberDiv.textContent = incrementNumber;

    // eliminar el item 'incrementNumber' de localStorage
    //localStorage.removeItem('incrementNumber');

    // llamar a la función incrementAndSave para comenzar a contar desde 001-346
    //incrementAndSave();
});

document.getElementById('nuevo').addEventListener('click', function () {
    location.reload()

});


