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
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <p>${producto.etiqueta}</p>
                <p>${producto.descripcion}</p>
                <p>Precio: $${producto.costo}</p>
            </div>
            <div class="producto-agregar">
                <div class="cantidad">
                    <button class="restar" onclick="restarCantidad(${index})">-</button>
                    <input type="number" min="0" value="0" id="cantidad-${index}">
                    <button class="sumar" onclick="sumarCantidad(${index})">+</button>
                </div>
                <button class="agregar" onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
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
        imagen: 'img/ttpd1.jpg',
        etiqueta: 'Vinilo',
        descripcion: '11° álbum de estudio de Taylor Swift. Cuenta con 16 canciones + 1 bonus track.',
        costo: 34.99
    }, 
    {
        nombre: 'THE TORTURED POETS DEPARTMENT (CD)',
        imagen: 'img/ttpd1.jpg',
        etiqueta: 'Vinilo',
        descripcion: '11° álbum de estudio de Taylor Swift. Cuenta con 16 canciones + 1 bonus track.',
        costo: 34.99
    }
    // Puedes agregar más productos aquí según necesites
];