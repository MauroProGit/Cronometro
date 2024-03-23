import React, { useRef } from 'react';
import '../hoja_de_estilo/cronometro.css';

function Cronometro() {
    let cronometro = 0;
    let ejecutando = false;
    let totalTiempo = 0;
    const horasSpan = useRef(null);
    const minutosSpan = useRef(null);
    const segundosSpan = useRef(null);
    const botonPausado = useRef(null);
    const ejecutandoSpan = useRef(null);
    const pausaSpan = useRef(null);

    const HandleIniciarCronometro = () => {
        // Accediendo a los elementos del DOM mediante las referencias
        const horasSpanElement = horasSpan.current;
        const minutosSpanElement = minutosSpan.current;
        const segundosSpanElement = segundosSpan.current;
        const botonPausadoElement = botonPausado.current;
        const ejecutandoSpanElement = ejecutandoSpan.current;
        const pausaSpanElement = pausaSpan.current;

        if (!ejecutando) {
            ejecutando = true;
            ejecutandoSpanElement.style.display = 'inline';
            pausaSpanElement.style.display = 'none';
            botonPausadoElement.innerHTML = '<i class="bi bi-pause-fill"></i>';

            cronometro = setInterval(function () {
                let horasActuales = Math.floor(totalTiempo / 3600);
                let minutosActuales = Math.floor((totalTiempo % 3600) / 60);
                let segundosActuales = totalTiempo % 60;

                horasSpanElement.innerText = horasActuales < 10 ? '0' + horasActuales : horasActuales;
                minutosSpanElement.innerText = minutosActuales < 10 ? '0' + minutosActuales : minutosActuales;
                segundosSpanElement.innerText = segundosActuales < 10 ? '0' + segundosActuales : segundosActuales;

                totalTiempo++;
            }, 1000);
        } else {
            ejecutando = false;
            clearInterval(cronometro);
            ejecutandoSpanElement.style.display = 'none';
            pausaSpanElement.style.display = 'inline';
            botonPausadoElement.innerHTML = '<i class="bi bi-play-fill"></i>';
        }
    };

    const handleReiniciarCronometro = () => {
        clearInterval(cronometro);
        totalTiempo = 0;
        horasSpan.current.innerText = '00';
        minutosSpan.current.innerText = '00';
        segundosSpan.current.innerText = '00';
        botonPausado.current.innerHTML = '<i class="bi bi-play-fill"></i>';
        ejecutandoSpan.current.style.display = 'none';
        pausaSpan.current.style.display = 'inline';
    };

    return (
        <div>
            <header>
                <h1>Proyecto Cronometro</h1>
            </header>
            <main>
                {/* SECCION CRONOMETRO */}
                <section className="section">
                    <div className="container">
                        <div className="cronometro">
                            <span ref={horasSpan} id="horas">00</span>
                            <span className="separador">:</span>
                            <span ref={minutosSpan} id="minutos">00</span>
                            <span className="separador">:</span>
                            <span ref={segundosSpan} id="segundos">00</span>
                        </div>
                        <div className="estado">
                            <span ref={pausaSpan} id="pausa">En pausa</span>
                            <span ref={ejecutandoSpan} id="ejecutando" style={{ display: 'none' }}>Ejecutando...</span>
                        </div>
                    </div>
                </section>
                {/* BOTON PARA INICIAR SECCION */}
                <section className="contenedor-botones">
                    {/* BOTON PARA INICIAR Y PAUSAR */}
                    <button ref={botonPausado} id="iniciar-cronometro" className="boton iniciar" onClick={HandleIniciarCronometro}>
                        <i className="bi bi-play-fill"></i>
                    </button>
                    {/* < BOTON PARA REINICIAR */}
                    <button id="reiniciar-cronometro" className="boton" onClick={handleReiniciarCronometro}>
                        <strong><i className="bi bi-arrow-counterclockwise"></i></strong>
                    </button>
                </section>
            </main>
        </div>
    );
}

export default Cronometro;