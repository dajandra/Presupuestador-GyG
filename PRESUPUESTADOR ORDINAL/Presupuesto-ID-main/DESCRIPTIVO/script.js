document.getElementById('agregarDatos').addEventListener('click', function () {

    var afiliado = document.getElementById("afiliado").value;
    var nroAfiliado = document.getElementById("nroAfiliado").value;
    var domicilio = document.getElementById("domicilio").value;
    var fecha = document.getElementById("fecha-renovacion").value;



    document.getElementById("vista-fecha-renovacion").textContent = fecha;
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
    document.getElementById("vista-observaciones").textContent = observaciones;


    var montototal = document.getElementById("monto-total").value;

    var sum = parseFloat(montototal);

    var valor = document.getElementById('porcIVA');
    var porcentaje = sum * valor.value / 100; // Ajusta este valor al porcentaje que deseas sumar
    var stotal = sum.toLocaleString('es-ES');
    var total = (sum + porcentaje).toLocaleString('es-ES'); // Agregar el formato de puntos para separar grupos

    var totaliva = porcentaje.toLocaleString('es-ES');

    document.getElementById('stotal').textContent = stotal;

    document.getElementById('totalIVA').textContent = totaliva;



    document.getElementById('total').textContent = total;
    document.getElementById('total1').textContent = document.getElementById('total').textContent;
    document.getElementById('stotal1').textContent = document.getElementById('stotal').textContent;
    document.getElementById('totalIVA1').textContent = document.getElementById('totalIVA').textContent;

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
    document.getElementById("stotal").id = "stotal1";
    document.getElementById("totalIVA").id = "totalIVA1";

    while (tabla.rows.length > 1) { // Empezamos desde la segunda fila (índice 1)
        tabla.deleteRow(1);
    }

    contadorTablas++; // Incrementar el contador de tablas
    calcularTotal();
}




let contador = 0;

function agregarItems() {
    contador++;

    if (contador < 6) {
        agregar1();
    } else if (contador == 6) {
        agregarHoja();
    } else if (contador > 6 && contador < 12) {
        agregar2();
    }

    calcularTotal();
    // Mostrar alerta si se ha alcanzado el límite de tablas
    if (contador > 12) {
        alert('No se pueden agregar más tablas.');
    }

}

document.getElementById('agregarItems').addEventListener('click', agregarItems);


function agregar1() {
    let descripcion = document.getElementById('descripcion').value;

    let fila = document.createElement('tr');
    fila.innerHTML = `
    <tbody>
            <td><p>${descripcion}</p></td>
    </tbody>
    <button onclick="eliminar(this)" class="btnel"></button>
    `;

    document.getElementById('mostrarDatos').appendChild(fila);

}

function agregar2() {
    let descripcion = document.getElementById('descripcion').value;

    let fila = document.createElement('tr');
    fila.innerHTML = `
    <tbody>
            <td><p>${descripcion}</p></td>
    </tbody>
    <button onclick="eliminar(this)" class="btnel"></button>
    `;

    document.getElementById('mostrarDatos1').appendChild(fila);

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
}



document.getElementById('savePdf').addEventListener('click', function () {
    var countForPDF = localStorage.getItem('incrementNumber');

    var elements = window.document.querySelectorAll('#todo');
    var opt = {
        margin: 0,
        filename: 'PRESUPUESTO ID ' + countForPDF + '.pdf',
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



function incrementAndSave() {
    var count = localStorage.getItem('incrementNumber');
    if (!count) {
        count = '001-346';
    }

    var parts = count.split('-');
    var leftPart = parseInt(parts[0]);
    var rightPart = parseInt(parts[1]);

    if (rightPart < 999) {
        rightPart++;
    } else {
        rightPart = 0;
        leftPart++;
    }

    var newCount = ("000" + leftPart).slice(-3) + '-' + ("000" + rightPart).slice(-3);
    localStorage.setItem('incrementNumber', newCount);

    // Agregar esta línea para guardar el número de incremento actual en el archivo PDF
    localStorage.setItem('countForPDF', count);

    return newCount;
};

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

