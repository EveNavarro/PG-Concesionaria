let autos = require('./autos');

/*  ETAPA 1
    En esta primera etapa, necesitamos requerir tu módulo autos que se encuentra en la misma carpeta del archivo donde estás trabajando.

    Además, necesitarás crear un objeto literal llamado concesionaria que contendrá todas las funcionalidades que el cliente solicita.

    Por último, nuestro objeto literal debe tener un atributo llamado autos que contenga la lista de automóviles importada anteriormente.
*/

let concesionaria = {

/*  ETAPA 2
    Ahora que la concesionaria tiene los autos, es posible crear la funcionalidad buscarAuto que reciba por parámetro la patente y devuelva el auto al cual le corresponde. En caso de no encontrar el mismo, deberá retornar null.
*/
    buscarAuto: (patente) => {
        let autoEncontrado = autos.find(auto => auto.patente == patente)
            return autoEncontrado ? autoEncontrado : null;
    },
/*  ETAPA 3
    Ahora, María les pide que agreguen la funcionalidad de venderAuto que recibe la patente y, en caso de encontrar al automóvil, le asigna el estado de vendido.
*/
    venderAuto: (patente) => {
        let auto = this.buscarAuto(patente);

        if (auto.vendido == false){
            auto.vendido = true;
        }
        return auto;
    },
/*  FUNCIONALIDAD EXTRA
    La primera es poder contar, como concesionaria, con la habilidad de poder tener la lista de autos para la venta. A lo cual, María, cree que es una tarea sencilla que Juan y vos pueden encarar solos, usando la función autosParaLaVenta, aunque por las dudas ella les recuerda que no deberían de aparecer los autos que ya fueron vendidos.
*/
    autosParaLaVenta: () => {
        return autos.filter(autos => autos.vendido === false);
    },
/*  UNA NUEVA FUNCIONALIDAD EXTRA
    María, contenta con el trabajo que realizaron, les pide otra funcionalidad extra. Resulta que a la concesionaria le suelen preguntar muy seguido cuáles de los autos para la venta son 0 km. Tené en cuenta que María considera que un auto 0 km es aquel que tenga un kilometraje menor a 100. Vas a tener que desarrollar la funcionalidad autosNuevos.
*/
    autosNuevos: () => {
        return this.autosParaLaVenta().filter(autos => autos.km > 100);
    },
/*  MÁS FUNCIONALIDADES
    María te pide que completes la función listaDeVentas que devuelve una lista que contiene el precio de venta de cada auto vendido. A esto, Juan, que está al lado tuyo, se le escapa la frase "mmm.....estoy seguro que alguna función de arrays nos va a servir, pero no me acuerdo".
*/
    listaDeVentas: () => {
        let autosVendidos = autos.filter(auto => auto.vendido === true);
        return autosVendidos.map(auto => auto.precio)
    },
/*  TOTAL DE VENTAS
    Terminada esta función, María te pide que resuelvas la funcionalidad de totalDeVentas, que justamente nos devuelva la sumatoria del valor de todas las ventas realizadas. Acá el único requerimiento técnico explícito es que utilices la función reduce, ¡a codear!
*/
    totalDeVentas: () => {
        let ventas = this.autosVendidos;
        let total = ventas.length != 0 ? ventas.reduce((acumulador, ventas) => acumulador + ventas) : 0;
        return total;
    },
/*  AGREGANDO FUNCIONALIDADES 1
    María te pide que desarrolles la función puedeComprar que reciba por parámetro un auto y una persona y devuelva true si la misma puede comprar el auto.
    Una persona va a ser representada mediante un objeto literal de la siguiente forma:
        {
        nombre: “Juan”,
        capacidadDePagoEnCuotas: 20000,
        capacidadDePagoTotal: 100000
        }
*/
    puedeComprar: (auto, persona) => {
        let montoCuota = auto.precio / auto.cuotas;
        return auto.precio <= persona.capacidadPagoTotal && persona.capacidadPagoEnCuotas >= montoCuota;
    },
/*  AGREGANDO FUNCIONALIDADES 2
    Ahora, te comprometiste a realizarla. Así que manos a la obra. Hay que escribir la función autosQuePuedeComprar, que recibe una persona y devuelve la lista de autos que puede comprar.

    La función debe de realizar los siguientes pasos:

        1) Obtener los autos para la venta
        2) Por cada uno de los autos debe de probar si la persona puede comprarlo, ¿ya hay alguna funcionalidad que me permita hacer esto?.
        3) Luego debemos retornar los que pueda comprar, ¿hay alguna manera de poder filtrar la lista de autos para la venta del punto 1 con el paso 2?
*/
    autosQuePuedeComprar : (persona) => {
        let autosDisponibles = concesionaria.autosParaLaVenta();
        let autosQuePuedeComprar = [];
        autosDisponibles.forEach(auto => {
            if(concesionaria.puedeComprar(auto, persona)) {
                autosQuePuedeComprar.push(auto);
            }
        })
        return autosQuePuedeComprar;
    }
}