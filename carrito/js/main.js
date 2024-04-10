let carrito = [];

// Verificar si hay datos de carrito en el localStorage al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const carritoLocalStorage = JSON.parse(localStorage.getItem('carrito'));
    if (carritoLocalStorage) {
        carrito = carritoLocalStorage;
        mostrarCarrito();
    }
});

// Agregar un producto al carrito
function agregarAlCarrito(index) {
    const producto = productos[index];
    const cantidad = parseInt(document.getElementById(`cantidad-${index}`).value);
    const productoEnCarrito = {
        nombre: producto.nombre,
        imagen: producto.imagen,
        cantidad: cantidad,
        costo: producto.costo
    };

    carrito.push(productoEnCarrito);
    actualizarCarritoEnLocalStorage();
    mostrarCarrito();

    document.getElementById(`cantidad-${index}`).value = 0;
}

// Función para actualizar el carrito en el localStorage
function actualizarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para mostrar los productos disponibles en la página
function mostrarProductos() {
    const contenedorProductos = document.querySelector('.productos');
    contenedorProductos.innerHTML = '';

    productos.forEach((producto, index) => {
        const productoItem = document.createElement('div');
        productoItem.classList.add('producto');
        productoItem.innerHTML = `
            <div class="producto-info">
                <h3>${producto.nombre}</h3>
                <div class="producto-img">
                    <img src="${producto.imagen}">
                </div>
                <p>${producto.etiqueta}</p>
                <p>${producto.descripcion}</p>
                <p>Precio: $${producto.costo}</p>

                <div class="producto-agregar">
                    <div class="cantidad">
                        <button class="restar" onclick="restarCantidad(${index})">
                            <div class="minus">
                                <img src="https://icons.iconarchive.com/icons/colebemis/feather/24/minus-circle-icon.png" width="128" height="128">
                            </div>
                        </button>
                        <input type="number" min="0" value="0" id="cantidad-${index}" readonly disabled>
                        <button class="sumar" onclick="sumarCantidad(${index})">
                            <div class="add">
                                <img src="https://icons.iconarchive.com/icons/colebemis/feather/24/plus-circle-icon.png" width="128" height="128">
                            </div>
                        </button>
                    </div>
                    <div id="mensaje-${index}" style="display: none; color: red; margin-bottom: 6px;"></div>
                <button class="agregar" onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
            </div>
            </div>
        `;
        contenedorProductos.appendChild(productoItem);
    });
}

// Mostrar los productos al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    mostrarProductos();
});

// Mostrar los productos en el carrito
function mostrarCarrito() {
    const listaProductos = document.querySelector('.lista-productos');
    listaProductos.innerHTML = '';

    carrito.forEach((producto, index) => {
        if (producto && typeof producto === 'object' && producto.imagen) {
            const item = document.createElement('div');
            item.classList.add('producto-carrito');
            item.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="info">
                    <h3>${producto.nombre}</h3>
                    <p>Precio: $${producto.costo}</p>
                    <p>Cantidad: ${producto.cantidad}</p>
                    <button class="eliminar" onclick="eliminarDelCarrito(${index})">Eliminar</button>
                </div>
            `;
            listaProductos.appendChild(item);
        }
    });

    calcularTotal();
}


// Calcular el total en el carrito
function calcularTotal() {
    const totalPrecio = carrito.reduce((total, producto) => total + (producto.costo * producto.cantidad), 0);
    document.getElementById('total-precio').textContent = `$${totalPrecio.toFixed(2)}`;
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarritoEnLocalStorage();
    mostrarCarrito();
}


// Función para sumar la cantidad
function sumarCantidad(index) {
    const inputCantidad = document.getElementById(`cantidad-${index}`);
    
    if (parseInt(inputCantidad.value) < 6) {
        inputCantidad.value = parseInt(inputCantidad.value) + 1; // Restamos 1 a la cantidad actual
    } else {
        mostrarMensaje("¡La cantidad máxima es 6!", index);
    }
}

function mostrarMensaje(mensaje, index) {
    const divMensaje = document.getElementById(`mensaje-${index}`);
    divMensaje.textContent = mensaje;
    divMensaje.style.display = "block";

    // Ocultar el mensaje después de unos segundos
    setTimeout(() => {
        divMensaje.style.display = "none";
    }, 3000); // El mensaje se ocultará después de 3 segundos (3000 milisegundos)
}

// Función para restar la cantidad
function restarCantidad(index) {
    const inputCantidad = document.getElementById(`cantidad-${index}`);
    if (parseInt(inputCantidad.value) > 0) { // Verificamos que la cantidad sea mayor que 0 antes de restar
        inputCantidad.value = parseInt(inputCantidad.value) - 1; // Restamos 1 a la cantidad actual
    }
}

// Lista de productos
const productos = [
    {
        nombre: 'THE TORTURED POETS DEPARTMENT (Vynil)',
        imagen: 'https://store.taylorswift.com/cdn/shop/files/oIrR9qXXeQRc3OuzsMq1YAqie8MY8mhq-2_700x745.png?v=1707185863',
        etiqueta: 'Vinilo',
        descripcion: '11° álbum de estudio de Taylor Swift. Cuenta con 16 canciones + 1 bonus track.',
        costo: 34.99
    }, 
    {
        nombre: 'THE TORTURED POETS DEPARTMENT (CD)',
        imagen: 'https://store.taylorswift.com/cdn/shop/files/oIrR9qXXeQRc3OuzsMq1YAqie8MY8mhq-2_700x745.png?v=1707185863',
        etiqueta: 'Vinilo',
        descripcion: '11° álbum de estudio de Taylor Swift. Cuenta con 16 canciones + 1 bonus track.',
        costo: 34.99
    }, 
    {
        nombre: 'THE TORTURED POETS DEPARTMENT (CD)',
        imagen: 'https://store.taylorswift.com/cdn/shop/files/oIrR9qXXeQRc3OuzsMq1YAqie8MY8mhq-2_700x745.png?v=1707185863',
        etiqueta: 'Vinilo',
        descripcion: '11° álbum de estudio de Taylor Swift. Cuenta con 16 canciones + 1 bonus track.',
        costo: 34.99
    }
    // Puedes agregar más productos aquí según necesites
];