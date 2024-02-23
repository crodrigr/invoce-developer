const listaFacturas=[];

const actulizarClientesEnFacturas=()=>{
    const clienteSelect=document.getElementById('clienteFactura');
    clienteSelect.innerHTML='';
    const opcionesClientes=generarOptionsClientes();
    clienteSelect.innerHTML=opcionesClientes;
}

const actulizarProductosEnFacturas=()=>{
    const productosSelect=document.getElementById('productosFactura');
    productosSelect.innerHTML='';
    const opcionesProductos=generarOptionsProductos();
    productosSelect.innerHTML=opcionesProductos;
}

const cargarFormularioFacturas=()=>{
    const facturasForm=document.getElementById('facturas-form');
    facturasForm.innerHTML = `
        <form>
            <label for="fechaFactura">Fecha de la Factura:</label>
            <input type="date" id="fechaFactura" required>
            
            <label for="clienteFactura">Cliente:</label>
            <select id="clienteFactura" required>
                ${generarOptionsClientes()}
            </select>

            <label for="productosFactura">Productos:</label>
            <select id="productosFactura" multiple required>
                ${generarOptionsProductos()}
            </select>

            <label for="cantidadProducto">Cantidad:</label>
            <input type="number" id="cantidadProducto" required>

            <button type="button" onclick="agregarItemFactura()">Agregar Item</button>

            <h3>Items de la Factura:</h3>
            <ul id="listado-items"></ul>

            <button type="button" onclick="crearFactura()">Crear Factura</button>
            <button type="button" onclick="mostrarListadoFacturas()">Ver Listado de Facturas</button>
        </form>
    `;

    const listaFacturas=document.getElementById('listado-facturas');
    listaFacturas.style.display='none';

}

const generarOptionsClientes=()=>{
    let options='';
    for(const cliente of listaClientes){
        options+=`<option value="${cliente.id}">${cliente.nombre}</option>`;
    }
    return options;

}

const generarOptionsProductos=()=>{
    let options='';
    for(const producto of listaProductos){
        options+=`<option value="${producto.codigo}">${producto.descripcion}</option>`;
    }
    return options;

}

const agregarItemFactura=()=>{
     const productoSelect=document.getElementById('productosFactura');
     const cantidadInput=document.getElementById('cantidadProducto');
     const listadoItems=document.getElementById('listado-items');

     const selectedProductoIndex=productoSelect.selectedIndex;
     const cantidad=cantidadInput.value;
     
     if (selectedProductoIndex === -1 || !cantidad) {
        alert('Por favor, selecciona un producto y especifica la cantidad.');
        return;
     }

     const selectProducto=listaProductos[selectedProductoIndex];
     const subtotal=selectProducto.precio*cantidad;

     const li=document.createElement('li');
     li.textContent= `${selectProducto.descripcion} - Cantidad: ${cantidad} - Subtotal: ${subtotal} `;
     listadoItems.appendChild(li);

     productoSelect.selectedIndex=-1;
     cantidadInput.value='';

}

const crearFactura=()=>{
    const fechaInput=document.getElementById('fechaFactura');
    const clienteSelect=document.getElementById('clienteFactura');
    const listadoItems=document.getElementById('listado-items');

    const fecha=fechaInput.value;
    const clienteId=clienteSelect.value;
    const itemsFactura=[];
    let totalFactura=0;

    for(const li of listadoItems.getElementsByTagName('li')){
        itemsFactura.push(li.textContent);
        const cantidadMatch=li.textContent.match(/Cantidad: (\d+)/);
        const subtotalMatch=li.textContent.match(/Subtotal: (\d+)/);
      
        if(cantidadMatch && subtotalMatch){
            const cantidad=parseInt(cantidadMatch[1]);
            const subtotal=parseInt(subtotalMatch[1]);
            totalFactura+=subtotal;
        }

    }

    if(!fecha || !clienteId || itemsFactura.length===0){
        alert('Por favor, completa todos los campos y agrega al menos un item de la factura.');
        return;
    }

    const cliente=listaClientes.find(c=>c.id===parseInt(clienteId));

     
      const nuevaFactura = {
        fecha: fecha,
        cliente: cliente,
        items: itemsFactura,
        total: totalFactura 
    };


    listaFacturas.push(nuevaFactura);

    console.log("Factura creada ", nuevaFactura);
    console.log("Listado de facturas:", listaFacturas);

    fechaInput.value='';
    clienteSelect.selectedIndex=0;
    listadoItems.innerHTML='';

    alert(`Factura creada con éxito! Total: ${totalFactura}`);

}



