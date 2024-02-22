const listaClientes=[];

const cargarClientes=()=>{   
    for(let i=0;i<=10;i++){
        const nuevoCliente={
            id:i,
            nombre:faker.name.findName(),
            edad: Math.floor(Math.random*30)+18,
            email: faker.internet.email()
        };
        listaClientes.push(nuevoCliente);
    }    
}
cargarClientes();
console.log(listaClientes);