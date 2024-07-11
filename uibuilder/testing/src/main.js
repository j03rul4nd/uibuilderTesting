'use strict'
// Importar Three.js y OrbitControls desde la ruta correcta
import * as THREE from '../uibuilder/vendor/three/build/three.module.js';
import { OrbitControls } from '../uibuilder/vendor/three/examples/jsm/controls/OrbitControls.js';

// Crear la escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Crear la cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Crear el renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Crear los controles de órbita
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Habilitar amortiguación (inercia)
controls.dampingFactor = 0.25; // Factor de amortiguación
controls.screenSpacePanning = false; // Habilitar/deshabilitar el paneo en el espacio de pantalla
controls.maxPolarAngle = Math.PI / 2; // Restringir el ángulo polar máximo

// Crear la geometría y el material del cubo
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Función de animación
function animate() {
    requestAnimationFrame(animate);

    // Actualizar los controles
    controls.update();

    // Rotar el cubo
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

// Ajustar el tamaño del renderer al tamaño de la ventana
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Iniciar la animación
animate();





// Start up uibuilder - see the docs for the optional parameters
uibuilder.start()


function envio_de_datos(payload) {
    //envio de datos de usuario a nodered uutilizando el nodo uibuilder
    uibuilder.send({
        'topic': 'msg-web-user',
        'payload': payload,// primera carga que nos de la info inicial
    })
}

envio_de_datos('onload');


// escucha en loop a Node-RED >>> "uibuilder.onchange"
const msg = await uibuilder.onChange('msg', function (msg) {
    console.log('msg:', msg)

    return msg;
})

// Ejemplo de envío de mensaje a Node-RED
document.getElementById('sendButton').addEventListener('click', () => {
    const message = {
        topic: 'test',
        payload: 'Hello from uibuilder'
    }
    uibuilder.send(message)
    console.log(message);
})