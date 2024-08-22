"use strict";
const gotas = 500;
const copos = 200;
const lluvia = document.querySelector('.lluvia');
const nieve = document.querySelector('.nieve');
function crearLluvia(metodo) {
    if (metodo == 1) {
        lluvia.innerHTML = '';
    }
    else {
        for (let i = 0; i <= gotas; i++) {
            let svg = '<svg  width="18" height="18" fill="#ffffff"> <path stroke="none" d="M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"></path></svg>';
            let gota = document.createElement('div');
            gota.style.height = '10px';
            gota.style.width = '0.5px';
            gota.setAttribute('class', 'gota');
            gota.style.position = 'absolute';
            gota.style.left = Math.floor(Math.random() * body.clientWidth) + 'px';
            gota.style.top = '-50px';
            // gota.style.top=Math.floor(Math.random()*body.clientHeight)+'px'
            gota.style.animationDelay = (Math.random() * 2.1) + 's';
            gota.innerHTML = svg;
            console.log(gota.style.animationDelay);
            lluvia.appendChild(gota);
        }
    }
}
function crearNieve(metodo) {
    if (metodo == 1) {
        nieve.innerHTML = '';
    }
    else {
        for (let i = 0; i <= copos; i++) {
            let copo = document.createElement('div');
            copo.setAttribute('class', 'rounded-circle bg-white copos');
            copo.style.height = `${Math.floor(Math.random() * (18 - 11 + 1) + 11)}px`;
            copo.style.width = copo.style.height;
            copo.style.position = 'absolute';
            copo.style.left = Math.floor(Math.random() * body.clientWidth) + 'px';
            copo.style.top = '-60px';
            copo.style.opacity = `${Math.random()}`;
            copo.style.animationDelay = (Math.random() * 2.1) + 's';
            nieve.appendChild(copo);
        }
    }
}
// crearNieve()
