//? Event Loop

// node espera a que la cola esté vacia para ejecutar un callback

console.log('Inicio de programa'); //sincrono se ejecuta primero

setTimeout( () => {
    console.log('Primer Timeout'); //asincrono con libuv (trabaja con colas FIFO)
}, 3000 );


setTimeout( () => {
    console.log('Segundo Timeout'); //2
}, 0 );


setTimeout( () => {
    console.log('Tercer Timeout'); //3
}, 0 );


console.log('Fin de programa'); //4

