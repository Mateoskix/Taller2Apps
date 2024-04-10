let carrito = [];

// Agregar un producto al carrito
function agregarAlCarrito(producto) {
    carrito.push(producto);
    mostrarCarrito();
}

// Función para mostrar los productos disponibles en la página
function mostrarProductos() {
    const contenedorProductos = document.querySelector('.productos');

    // Limpiar el contenedor de productos antes de agregar los nuevos
    contenedorProductos.innerHTML = '';

    // Recorrer la lista de productos y crear elementos HTML para cada uno
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
                        <input type="number" min="0" value="0" id="cantidad-${index}">
                        <button class="sumar" onclick="sumarCantidad(${index})">
                            <div class="add">
                                <img src="https://icons.iconarchive.com/icons/colebemis/feather/24/plus-circle-icon.png" width="128" height="128">
                            </div>
                        </button>
                    </div>
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

    carrito.forEach(producto => {
        const item = document.createElement('div');
        item.classList.add('producto-carrito');
        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="info">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <p>Cantidad: ${producto.cantidad}</p>
            </div>
        `;
        listaProductos.appendChild(item);
    });

    calcularTotal();
}

// Calcular el total en el carrito
function calcularTotal() {
    const totalPrecio = carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
    document.getElementById('total-precio').textContent = `$${totalPrecio.toFixed(2)}`;
}

//Agregar productos al carrito
document.addEventListener('click', event => {
    if (event.target.classList.contains('agregar')) {
        const productoIndex = event.target.dataset.index;
        const producto = productos[productoIndex];
        agregarAlCarrito(producto);
    }
});

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
    }
    // Puedes agregar más productos aquí según necesites
];