// variables globales
var users = [];
var intervalCount;
var count = 0;
var numeros = [1, 2, 1, 3, 5, 8, 2, 3, 7, 6, 5, 4, 4, 7, 6, 8];
var aciertos = 0
var tarjetasDestapadas = 0;
var tarjeta1;
var tarjeta2;
var cardsBack = []
var tiempoRecord;
var isNewUser = false;
var auxIsNewUser = false;
var corre;
var usuariosGuardados;
var nuevoUser;
var usuariologuedo;


// clase usuario
class Usuario {
    constructor(addr, recordTime, tiempoLastJugada) {
        this.correo = addr;
        this.tiempoRecord = recordTime;
        this.tiempoUltimaJugada = tiempoLastJugada;
    }


    setRecordTime(nuevoRecordTime) {
        this.tiempoRecord = nuevoRecordTime;
    }

    setTiempoLastJugada(nuevoTiempoLastTime) {
        this.tiempoUltimaJugada = nuevoTiempoLastTime;
    }
}



// funciones


// funcion para desordenar el arreglo (hacerlo aleatorio)
function desordenar(ar) {
    ar.sort(() => Math.random() - 0.5);

}


//  funcion para destapar
function destapar(id) {
    tarjetasDestapadas++
    // console.log("tarjets destapads :" + tarjetasDestapadas)
    if (tarjetasDestapadas == 1) {
        let auxtarjeta1 = document.getElementById(id);
        auxtarjeta1.disabled = true
        tarjeta1 = auxtarjeta1;
        console.log(" en la carta" + id)
        tarjeta1.childNodes[1].style.transform = "rotateY(180deg)";
    } else {
        if (tarjetasDestapadas == 2) {
            let auxtarjeta2 = document.getElementById(id);
            auxtarjeta2.disabled = true;
            tarjeta2 = auxtarjeta2;
            tarjeta2.childNodes[1].style.transform = "rotatey(180deg)";


            setTimeout(() => {
                if (tarjeta1.childNodes[1].childNodes[3].childNodes[1].className == tarjeta2.childNodes[1].childNodes[3].childNodes[1].className) {
                    tarjetasDestapadas = 0
                    aciertos++
                    document.getElementById("aciertos").innerHTML = `Aciertos: ${aciertos} `
                } else {
                    tarjetasDestapadas = 0
                    tarjeta1.disabled = false;
                    tarjeta2.disabled = false
                    tarjeta1.childNodes[1].style.transform = "rotateY(0deg)";
                    tarjeta2.childNodes[1].style.transform = "rotateY(0deg)";
                }
            }, 500);




        }
    }



    // console.log(tarjeta1.childNodes)
    // tarjeta1.style.transform = "rotateY(180deg)";

}


function colocarImagenes(img, n) {
    let q = n + 1

    let elemen = cardsBack[n];

    elemen.id = `b-${q}`

    $(`#b-${q}`).append(img);

}


function colocar(arr) {
    for (let i = 1; i < 17; i++) {
        let button = document.getElementById(`${i}`)
        let auxcardBack = button.childNodes[1].childNodes[3];
        cardsBack.push(auxcardBack)
    }

    console.log(cardsBack)
    console.log(arr)
    arr.forEach((valor, posicion) => {
        var img = `<img src="./img/${valor}.jpg" class="${valor}">`;


        colocarImagenes(img, posicion)

    });





}



// funcion para inicializar contador y estar mostrandolo y si gana el juego y guardar todo en el localStorage
function iniciarCount() {

    intervalCount = setInterval(() => {
        count++
        document.getElementById("tiempo").innerHTML = `Tiempo: ${count}`

        if (aciertos == 8) {
            clearInterval(intervalCount);

            Swal.fire({
                title: "ganaste",
                icon: "success",
            });

            setTimeout(() => {
                location.reload()
            }, 5000);
        }


        if (aciertos == 8) {
            if (!auxIsNewUser) {
                console.log("es un nuevo usuario")
                tiempoRecord = count
                tiempoUltimaJugada = count

                nuevoUser.setRecordTime(tiempoRecord);
                nuevoUser.setTiempoLastJugada(tiempoUltimaJugada);



                if (usuariosGuardados != null) {
                    for (let i = 0; i < usuariosGuardados.length; i++) {
                        users.push(usuariosGuardados[i])
                    }
                }
                users.push(nuevoUser);

                localStorage.setItem("usuarios", JSON.stringify(users));
                document.getElementById("record").innerHTML = `tiempo record: ${tiempoRecord}`

            } else {
                console.log("el usuario ya estaba registrado")
                if (aciertos == 8) {
                    tiempoRecord = count
                    tiempoUltimaJugada = count

                    if (usuariologuedo != null) {
                        if (tiempoRecord < usuariologuedo.tiempoRecord) {
                            usuariologuedo.tiempoRecord = tiempoRecord;
                            console.log("es nuevo record es" + usuariologuedo.tiempoRecord);
                            document.getElementById("record").innerHTML = `Nuevo tiempo record: ${usuariologuedo.tiempoRecord}`;

                        }
                    }


                    if (usuariosGuardados != null) {
                        for (let i = 0; i < usuariosGuardados.length; i++) {
                            users.push(usuariosGuardados[i])
                        }
                    }


                    console.log(users)
                    localStorage.setItem("usuarios", JSON.stringify(users))

                }
            }
        }
    }, 1000);

}





// funcion para verificar al user
function verificarUser() {

    let targets = document.getElementsByClassName("box");

    setTimeout(() => {
        for (let i = 0; i < targets.length; i++) {
            targets[i].childNodes[1].style.transform = "rotateY(180deg)";
            targets[i].disabled= true;
        }    
    }, 100);
    
    setTimeout(() => {
        for (let i = 0; i < targets.length; i++) {
            targets[i].childNodes[1].style.transform = "rotateY(0deg)";
            targets[i].disabled= false;
        }  
    }, 1000);


    // obtener el valor del input de correo
    corre = document.getElementById("correo").value

    if (corre == "") {
        Swal.fire({
            title: "Valor incorrecto",
            text: "Por favor ingrese un valor valido para el correo",
            icon: "warning"
        });
    } else {

        usuariosGuardados = JSON.parse(localStorage.getItem("usuarios"));

        console.log(usuariosGuardados)



        document.getElementById("table").style.display = "block"
        desordenar(numeros)
        colocar(numeros)
        document.getElementById("iniciar").disabled = true;
        document.getElementById("user").innerHTML = `Bienvenido ${corre}`

        iniciarCount();


        if (usuariosGuardados != null) {

            console.log("entro")

            for (let i = 0; i < usuariosGuardados.length; i++) {

                if (usuariosGuardados[i].correo != corre) {
                    isNewUser = false
                    nuevoUser = new Usuario(corre, 86400, 0);
                } else {
                    console.log("ya estab guardado")
                    usuariologuedo = usuariosGuardados[i]
                    console.log(usuariologuedo)
                    isNewUser = true

                }

                if (isNewUser) {
                    if (usuariologuedo != null) {
                        document.getElementById("record").innerHTML = `Tiempo Record: ${usuariologuedo.tiempoRecord}`
                        isNewUser = true
                        auxIsNewUser = true

                        // console.log("colocando tiempo record")     
                    }
                }
            }

        } else {
            console.log("por el otro lado")
            nuevoUser = new Usuario(corre, 86400, 0);
        }


    }
}

// si el correo es igual ya estaba registrado