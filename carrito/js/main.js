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
        nombre: "Fearless",
        imagen: 'https://i.scdn.co/image/ab67616d00001e02a48964b5d9a3d6968ae3e0de',
        etiqueta: 'CD',
        descripcion: 'Segundo álbum de estudio de Taylor Swift, lanzado en 2008. Contiene éxitos como "Love Story" y "You Belong with Me".',
        costo: 34.99
    },
    {
        nombre: 'Speak Now',
        imagen: 'https://i.scdn.co/image/ab67616d0000b2730b04da4f224b51ff86e0a481',
        etiqueta: 'Vinilo',
        descripcion: 'Tercer álbum de estudio de Taylor Swift, lanzado en 2010. Destacan canciones como "Mine" y "Back to December".',
        costo: 38.99
    },
    {
        nombre: 'Red',
        imagen: 'https://i.scdn.co/image/ab67616d0000b273318443aab3531a0558e79a4d',
        etiqueta: 'CD',
        descripcion: 'Cuarto álbum de estudio de Taylor Swift, lanzado en 2012. Incluye sencillos como "We Are Never Ever Getting Back Together" y "I Knew You Were Trouble".',
        costo: 56.99
    },
    {
        nombre: '1989',
        imagen: 'https://i.scdn.co/image/ab67616d0000b273904445d70d04eb24d6bb79ac',
        etiqueta: 'vinilo',
        descripcion: 'Quinto álbum de estudio de Taylor Swift, lanzado en 2014. Destaca por su cambio al pop, con canciones como "Shake It Off" y "Blank Space".',
        costo: 48.99
    },
    {
        nombre: 'Reputation',
        imagen: 'https://i.scdn.co/image/ab67616d0000b273da5d5aeeabacacc1263c0f4b',
        etiqueta: 'CD',
        descripcion: 'Sexto álbum de estudio de Taylor Swift, lanzado en 2017. Incluye sencillos como "Look What You Made Me Do" y "Delicate".',
        costo: 49.99
    },
    {
        nombre: 'Lover',
        imagen: 'https://i.scdn.co/image/ab67616d0000b273e787cffec20aa2a396a61647',
        etiqueta: 'CD',
        descripcion: 'Séptimo álbum de estudio de Taylor Swift, lanzado en 2019. Contiene canciones como "ME!" y "You Need to Calm Down".',
        costo: 36.77
    },
    {
        nombre: 'Folklore',
        imagen: 'https://i.scdn.co/image/ab67616d0000b27395f754318336a07e85ec59bc',
        etiqueta: 'CD',
        descripcion: 'Octavo álbum de estudio de Taylor Swift, lanzado en 2020. Presenta un sonido indie folk con canciones como "Cardigan" y "Exile".',
        costo: 38.99
    },
    {
        nombre: 'Evermore',
        imagen: 'https://i.scdn.co/image/ab67616d0000b27333b8541201f1ef38941024be',
        etiqueta: 'CD',
        descripcion: 'Noveno álbum de estudio de Taylor Swift, lanzado en 2020. Continúa la estética de Folklore con canciones como "Willow" y "Champagne Problems".',
        costo: 38.99
    },
    {
        nombre: 'Midnights',
        imagen: 'https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5',
        etiqueta: 'CD',
        descripcion: 'Décimo álbum de estudio de Taylor Swift, lanzado en 2022. Incluye canciones como "Anti-hero" y "Bejeweled".',
        costo: 41.99
    },
    {
        nombre: 'THE TORTURED POETS DEPARTMENT',
        imagen: 'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8466b67d96a2721d9318322e04',
        etiqueta: 'CD',
        descripcion: 'Undécimo álbum de estudio de Taylor Swift, lanzado en 2024. Incluye canciones como "I Can Do It With A Broken Heart".',
        costo: 50.99
    }
];
