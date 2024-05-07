import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import anime from 'animejs'
import { Object3D, TriangleFanDrawMode } from 'three'
import ButtonsAnimations from './ButtonsAnimations.js'
import { particules, plane } from './ProjectPage.js'
import { isMobile } from './is_mobile.js'


const lerpWeight = 0.02
let victory
let experienceStarted = false
let insideProjectUniverse = false
let timeoutArray = []
let sceneProjectScrollToZero = false
const grid = document.getElementById('grid');
const loadingBarWhite = document.querySelector('.loading-bar-white')
const loadingBarBlue = document.querySelector('.loading-bar-blue')
const loadingBarPink = document.querySelector('.loading-bar-pink')
const bar = document.querySelector('.bar')
const loadingText = document.querySelector('.loading-text')
const flamingoLogoIntro = document.querySelector('.flamingo-logo-intro')
const flamingoLogo = document.querySelector('.flamingo-logo')
const scrollHint = document.querySelector('.scroll-hint')
const contactButton = document.querySelector('.contact-button')
const projectButton = document.querySelector('.project-button')
const projectButtonFloating = document.querySelector('.point-1')
const enterButton = document.querySelector('.enter-button')
const html = document.querySelector('html')
const body = document.querySelector('body')
let scrollYMax = 3015
if(window.matchMedia("(max-aspect-ratio: 1/1)").matches) scrollYMax = 3876
// const projectPage = document.querySelector('.project-page')
// const pageBackground = document.querySelector('.page-bg')




let focus0 = false
let focus1 = false
let isOnMobile = false

var init = function () {
    // if (focus1) {
    //     setTimeout(init, 500)
    //     return
    // }
    ButtonsAnimations()
    // ProjectPage()
}

init()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

var columnNbr = Math.trunc(sizes.width / 57)
var rowNbr = Math.trunc(sizes.height / 57)

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

function instanciateGrid() {

    var column;
    var row;
    for(column = 0; column < columnNbr; column++) {
        for(row = 0; row < rowNbr; row++) {
            grid.innerHTML += `<img class="diamond-img" src="./assets/diamond.png">`;
        }
    }
}

  function animeGrid(loaded) {

    var diamond = document.getElementsByClassName("diamond-img");

    if(!loaded) {
        var loadingGrid = anime({
            targets: diamond,
            opacity: [
              {value: .9, easing: 'easeOutSine', duration: 300},
              {value: .2, easing: 'easeInOutQuad', duration: 400},
            ],
            delay: anime.stagger(100, {grid: [columnNbr, rowNbr], from: 'center'}),
        });
    }else {
        var reveal = anime({
            targets: diamond,
            opacity: [
              {value: .9, easing: 'easeOutSine', duration: 300},
              {value: .2, easing: 'easeInOutQuad', duration: 400},
              {value: 0, easing: 'easeInOutQuad', duration: 500}
            ],
            delay: anime.stagger(100, {grid: [columnNbr, rowNbr], from: 'center'}),
            complete: function(reveal) {
                grid.remove()
              }
        });
    }
  }

/**
 * Button
 */

enterButton.addEventListener('click', () => {
    experienceStarted = true

    flamingoLogoIntro.classList.add('loaded')
    flamingoLogo.classList.add('entered')
    scrollHint.classList.add('entered')
    projectButton.classList.add('entered')
    contactButton.classList.add('entered')
    enterButton.classList.remove('loaded')

    setTimeout(() => {
        enterButton.remove()
        flamingoLogoIntro.remove()
        loadingBarWhite.remove()
        loadingBarBlue.remove()
        loadingBarPink.remove()
        bar.remove()
        loadingText.remove()
    }, 2000);
    animeGrid(true)
})
// const button0 = document.querySelector('.point-0')
// button0.addEventListener('click', () => {
// })
const button1 = document.querySelector('.point-1')
button1.addEventListener('click', () => {
    focus1 = focus1 == false ? true : false;
    scrollY = 1000
})

projectButton.addEventListener('click', () => {
    focus1 = focus1 == false ? true : false;
    scrollY = 1000

    // projectPage.style.display = 'block'
    // pageBackground.style.display = 'block'
    // html.style.overflowY = 'hidden'
})

// pageBackground.addEventListener('click', () => {
//     focus1 = focus1 == false ? true : false;
// })

flamingoLogo.addEventListener('click', () => {
    focus1 = 0
    scrollY = 0
})

window.addEventListener('click', () => {
    console.log('CLICK')
    if (!insideProjectUniverse) return
    scrollY = 1000
    focus1 = focus1 == false ? true : false;
    insideProjectUniverse = false
})

//   instanciateGrid()

// /**
//  * Spector JS
//  */
// const SPECTOR = require('spectorjs')
// const spector = new SPECTOR.Spector()
// spector.displayUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
export const sceneProject = new THREE.Scene()



/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()





// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('./draco/')





// GLTF loader
const loadingManager = new THREE.LoadingManager(
    // Loaded
    () =>
    {
        setTimeout(() => {
            loadingBarBlue.classList.add('loaded')
            loadingBarPink.classList.add('loaded')
            loadingBarWhite.classList.add('loaded')
            loadingText.classList.add('loaded')
            enterButton.classList.add('loaded')
            bar.classList.add('loaded')
            loadingBarBlue.style.transform = ''
            loadingBarPink.style.transform = ''
            loadingBarWhite.style.transform = ''
            bar.style.transform = ''

        }, 2000);

    },
    // Progress
    (itemUrl, itemLoaded, itemsTotal) =>
    {
        let progressRatio = itemLoaded / itemsTotal
        loadingBarBlue.style.transform = `scaleX(${progressRatio})`
        setTimeout(() => {
            loadingBarPink.style.transform = `scaleX(${progressRatio})`
            setTimeout(() => {
                loadingBarWhite.style.transform = `scaleX(${progressRatio})`
            }, 100);
        }, 100);
        loadingText.innerHTML = `${Math.round(progressRatio * 100)}%`
    }
)

const gltfLoader = new GLTFLoader(loadingManager)
gltfLoader.setDRACOLoader(dracoLoader)



/**
 * Textures
 */

let wallTexture
if (isMobile()) {
    wallTexture = textureLoader.load('./assets/RESIZE/BAKE_WALLS_HDR_4K.jpg')
} else {
    wallTexture = textureLoader.load('./assets/BAKE_WALLS_HDR.jpg')
}

wallTexture.flipY = false
wallTexture.encoding = THREE.sRGBEncoding

const socleTexture = textureLoader.load(`./assets/${isMobile() ? 'RESIZE/' : ''}BAKE_SOCLE_FLAMO_HDR.jpg`)
socleTexture.flipY = false
socleTexture.encoding = THREE.sRGBEncoding

const groundTexture = textureLoader.load(`./assets/${isMobile() ? 'RESIZE/' : ''}BAKE_GROUND.jpg`)
groundTexture.flipY = false
groundTexture.encoding = THREE.sRGBEncoding

const flamothraceTexture = textureLoader.load(`./assets/${isMobile() ? 'RESIZE/' : ''}FLAMOTHRACE_HDR.jpg`)
flamothraceTexture.flipY = false
flamothraceTexture.encoding = THREE.sRGBEncoding

const pedestalTexture = textureLoader.load(`./assets/${isMobile() ? 'RESIZE/' : ''}BAKE_PEDESTALS_HDR.jpg`)
pedestalTexture.flipY = false
pedestalTexture.encoding = THREE.sRGBEncoding

const art3Texture = textureLoader.load(`./assets/${isMobile() ? 'RESIZE/' : ''}ART_03_HDR.jpg`)
art3Texture.flipY = false
art3Texture.encoding = THREE.sRGBEncoding

const reliefTexture = textureLoader.load(`./assets/${isMobile() ? 'RESIZE/' : ''}RELIEF_HDR.jpg`)
reliefTexture.flipY = false
reliefTexture.encoding = THREE.sRGBEncoding

const stairsTexture = textureLoader.load(`./assets/${isMobile() ? 'RESIZE/' : ''}STAIRS_HDR.jpg`)
stairsTexture.flipY = false
stairsTexture.encoding = THREE.sRGBEncoding

const vaseTexture = textureLoader.load(`./assets/${isMobile() ? 'RESIZE/' : ''}ANTIQUE_VASE.jpg`)
vaseTexture.flipY = false
vaseTexture.encoding = THREE.sRGBEncoding

const borderTexture = textureLoader.load(`./assets/${isMobile() ? 'RESIZE/' : ''}BORDER_HDR.jpg`)
borderTexture.flipY = false
borderTexture.encoding = THREE.sRGBEncoding



/**
 * Materials
 */
// Baked material
const wallMaterial = new THREE.MeshBasicMaterial({ map: wallTexture })
const socleMaterial = new THREE.MeshBasicMaterial({ map: socleTexture })
const groundMaterial = new THREE.MeshBasicMaterial({ map: groundTexture })
const flamothraceMaterial = new THREE.MeshBasicMaterial({ map: flamothraceTexture })
const pedestalMaterial = new THREE.MeshBasicMaterial({ map: pedestalTexture })
const art3Material = new THREE.MeshBasicMaterial({ map: art3Texture })
const reliefMaterial = new THREE.MeshBasicMaterial({ map: reliefTexture })
const stairsMaterial = new THREE.MeshBasicMaterial({ map: stairsTexture })
const vaseMaterial = new THREE.MeshBasicMaterial({ map: vaseTexture })
const borderMaterial = new THREE.MeshBasicMaterial({ map: borderTexture })


/**
 * Model
 */
var mixer
var clips 
var clip
var action

gltfLoader.load(
    './assets/FULL_SCENE_THREEJS_V2.glb',
    (gltf) =>
    {
        victory = gltf
        victory.scene.traverse(function(obj) { 
            obj.frustumCulled = false;

            if(obj.name.includes("LEAF")){
                obj.renderOrder = 10
                if(obj.material){
                    obj.material.blending = THREE.CustomBlending
                    obj.material.transparent = false
                }
            }
        });

        const wallMesh = victory.scene.children[0].children.find((child) =>
        {
            return child.name === 'WALLS'
        })

        const groundMesh = victory.scene.children[0].children.find((child) =>
        {
            return child.name === 'GROUND'
        })

        const flamothraceMesh = victory.scene.children[1].children.find((child) =>
        {
            return child.name === 'FLAMOTHRACE'
        })

        const pedestalMesh = victory.scene.children[0].children.find((child) =>
        {
            return child.name === 'PEDESTALS'
        })

        const socleMarbleMesh = victory.scene.children[0].children.find((child) =>
        {
            return child.name === 'SOCLE_MARBLE'
        })

        const art3Mesh = victory.scene.children[0].children.find((child) =>
        {
            return child.name === 'ART_03'
        })

        const reliefMesh = victory.scene.children[0].children.find((child) =>
        {
            return child.name === 'BAS_RELIEF'
        })

        const stairsMesh = victory.scene.children[0].children.find((child) =>
        {
            return child.name === 'STAIRS'
        })

        const vaseMesh = victory.scene.children[0].children.find((child) =>
        {
            return child.name === 'VASE'
        })

        const leafMesh = victory.scene.children[0].children.find((child) =>
        {
            return child.name === 'LEAFS'
        })

        const borderMesh = victory.scene.children[0].children.find((child) =>
        {
            return child.name === 'BORDER'
        })

        
        wallMesh.material = wallMaterial
        socleMarbleMesh.material = socleMaterial
        groundMesh.material = groundMaterial
        flamothraceMesh.material = flamothraceMaterial
        pedestalMesh.material = pedestalMaterial
        art3Mesh.material = art3Material
        reliefMesh.material = reliefMaterial
        stairsMesh.material = stairsMaterial
        vaseMesh.material = vaseMaterial
        borderMesh.material = borderMaterial
        // leafMesh.visible = false
        
        setRotationPoint(1)
        victoryGroup.add(victory.scene)
        // Create an AnimationMixer, and get the list of AnimationClip instances
        // mixer = new THREE.AnimationMixer( victory.scene );
        // clips = victory.animations;


        // Play a specific animation
        // clip = THREE.AnimationClip.findByName( clips, 'Animation' );
        // action = mixer.clipAction( clip );
        // action.play();

        // Play all animations
        // clips.forEach( function ( clip ) {
        //     mixer.clipAction( clip ).play();
        // } );
    }
)


// function update (deltaTime) {
// 	if(mixer) mixer.update( deltaTime );
// }

const cameraPositions = [
    {
        p1: { x: 0, y: 9.97799015045166, z: -5.275780200958252 },
        p2: { x: 3.95, y: 2.50, z: -2.28 },
        p3: { x: 9.962949752807617, y: 2.505270004272461, z: -1.3539799451828003 },
        p4: { x: 3.9529199600219727, y: 2.505270004272461, z: 10.009499549865723 }
    }
]

const cameraTargetPositions = [
    {
        p1: { x: 0, y: 10.657699584960938, z: -26.692899703979492 },
        p2: { x: 16.279300689697266, y: 3.0524001121520996, z: -2.298110008239746 },
        p3: { x: 16.279300689697266, y: 1.9890899658203125, z: -2.298110008239746 },
        p4: { x: 16.279300689697266, y: 3.0524001121520996, z: 9.94379997253418 },
        p5: { x: 15.202199935913086, y: 1.1763499975204468, z: -2.2788500785827637 }
    }
]

const cameraDirectorPositions = [
    {
        p1: { x: 12.788399696350098, y: 10.105500221252441, z: -2.2788500785827637 },
        p2: { x: 14.689399719238281, y: 3.290450096130371, z: -2.2788500785827637 }
    }
]

const cameraDirector = new Object3D()

cameraDirector.position.x = cameraDirectorPositions[0].p1.x
cameraDirector.position.y = cameraDirectorPositions[0].p1.y
cameraDirector.position.z = cameraDirectorPositions[0].p1.z


const raycaster = new THREE.Raycaster();
const floatingButtonsPositions = [
    // {
    //     position: new THREE.Vector3(0.8106679916381836, 8.841730308532715, -23.660199737548828),
    //     element: document.querySelector('.point-0')
    // },
    {
        position: new THREE.Vector3(14.581999778747559, 1.6557199478149414, -1.9247000217437744),
        element: document.querySelector('.point-1')
    }
]




// Group
const victoryGroup = new THREE.Group()
victoryGroup.position.x = cameraTargetPositions[0].p1.x
victoryGroup.position.y = cameraTargetPositions[0].p1.y
victoryGroup.position.z = cameraTargetPositions[0].p1.z

const projectGroup = new THREE.Group()

scene.add(victoryGroup)
sceneProject.add(projectGroup)
plane.forEach(el => {
    sceneProject.add(el)
})

projectGroup.add(particules)
console.log(plane)

function setRotationPoint(mode) {
    if (!victory) return
    if (mode === 1) {
        victory.scene.position.x = - cameraTargetPositions[0].p1.x
        victory.scene.position.y = - cameraTargetPositions[0].p1.y
        victory.scene.position.z = - cameraTargetPositions[0].p1.z

        victoryGroup.position.x = cameraTargetPositions[0].p1.x
        victoryGroup.position.y = cameraTargetPositions[0].p1.y
        victoryGroup.position.z = cameraTargetPositions[0].p1.z
    } else if (mode === 2) {
        victory.scene.position.x = - cameraTarget.position.x
        victory.scene.position.y = - cameraTarget.position.y
        victory.scene.position.z = - cameraTarget.position.z

        victoryGroup.position.x = cameraTarget.position.x
        victoryGroup.position.y = cameraTarget.position.y
        victoryGroup.position.z = cameraTarget.position.z
    }
}

function parallaxEffect(mode)
{
    parallaxX = cursor.x / sizes.height * 100
    parallaxY = cursor.y / sizes.height * 100
    if (mode === 1) {
        victoryGroup.rotation.x = lerp(victoryGroup.rotation.x, parallaxY, lerpWeight * deltaTime * 100)
        victoryGroup.rotation.y = lerp(victoryGroup.rotation.y, parallaxX, lerpWeight * deltaTime * 100)
        victoryGroup.rotation.z = lerp(victoryGroup.rotation.y, 0, lerpWeight * deltaTime * 100)
    } else if (mode === 2) {
        victoryGroup.rotation.x = lerp(victoryGroup.rotation.x, 0, lerpWeight * deltaTime * 100)
        victoryGroup.rotation.y = lerp(victoryGroup.rotation.y, parallaxX, lerpWeight * deltaTime * 100)
        victoryGroup.rotation.z = lerp(victoryGroup.rotation.z, parallaxY, lerpWeight * deltaTime * 100)
    }

    projectGroup.position.x = lerp(projectGroup.position.x, - parallaxX * 2, lerpWeight * deltaTime * 100)
    projectGroup.position.y = lerp(projectGroup.position.y, parallaxY * 2, lerpWeight * deltaTime * 100)
}



/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.y = 9.97799015045166
camera.position.z = -5.275780200958252
camera.rotation.x = 0

const cameraProject = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
cameraProject.position.z = 3


sceneProject.add(cameraProject)




/**
 * Camera Target
 */

const cameraTarget = new Object3D()

cameraTarget.position.x = cameraTargetPositions[0].p1.x
cameraTarget.position.y = cameraTargetPositions[0].p1.y
cameraTarget.position.z = cameraTargetPositions[0].p1.z

camera.lookAt(cameraTarget)

scene.add(camera, cameraTarget, cameraDirector)




/**
 * Overlay
 */
const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
var overlayMaterial = new THREE.ShaderMaterial({
    transparent: true,
    uniforms:
    {
        uAlpha: { value: 1 }
    },
    vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uAlpha;

        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `
})

const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
const overlayProject = new THREE.Mesh(overlayGeometry, overlayMaterial)

overlay.position.y = camera.position.y
overlay.position.z = camera.position.z
overlay.rotation.x = camera.rotation.x
scene.add(overlay)
sceneProject.add(overlayProject)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding

/**
 * Scroll
 */


let scrollY = 0

function mapOneRangeToAnother(sourceNumber, fromA, fromB, toA, toB, decimalPrecision ) {
    var deltaA = fromB - fromA;
    var deltaB = toB - toA;
    var scale  = deltaB / deltaA;
    var negA   = -1 * fromA;
    var offset = (negA * scale) + toA;
    var finalNumber = (sourceNumber * scale) + offset;
    var calcScale = Math.pow(10, decimalPrecision);
    return Math.round(finalNumber * calcScale) / calcScale;
}

let wheelEvent = document.body.onscroll = (e) =>
{
    if (!experienceStarted) return
    scrollY = window.scrollY
    scrollY = scrollY < 0 ? 0 : scrollY
    scrollY = scrollY > scrollYMax ? scrollYMax : scrollY
}

/**
 * Cursor
 */

const cursor = {}
cursor.x = 0
cursor.y = 0
let parallaxX = cursor.x
let parallaxY = cursor.y

window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
})

function lerp( a, b, alpha ) {
    return a + alpha * ( b - a )
}


function getDistance(x1, x2, y1, y2) {
    let vectorX = x2 - x1
    let vectorY = y2 - y1

    return Math.sqrt(vectorX * vectorX + vectorY * vectorY)
}




/**
 * Animate
 */

const clock = new THREE.Clock()
let previousTime = 0
var myValue = 1
var myValue2 = 1
let deltaTime
const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()
    deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    deltaTime = deltaTime > 1 ? 0.1 : deltaTime;

    if (scrollY < 100 && !insideProjectUniverse) goToStep1()
    

    if (scrollY > 100 && scrollY <= 1400) {
        if (focus1) {
            directInside()
            cameraFollowInside()
        } else if (!focus1) {
            goToStep2()
            directOutside()
        }
    }

    if (scrollY < 100) {
        setRotationPoint(1)
        parallaxEffect(1)
    } else {
        setRotationPoint(2)
        parallaxEffect(2)
    }
    
    if (scrollY > 1300 && !insideProjectUniverse) navigate()

    if(insideProjectUniverse) browseProjects()

    function directInside() {
        let timeoutID = setInterval(() => {
            cameraDirector.position.x = lerp(cameraDirector.position.x, cameraDirectorPositions[0].p2.x, lerpWeight * deltaTime * 100)
            cameraDirector.position.y = lerp(cameraDirector.position.y, cameraDirectorPositions[0].p2.y, lerpWeight * deltaTime * 100)
            cameraDirector.position.z = lerp(cameraDirector.position.z, cameraDirectorPositions[0].p2.z, lerpWeight * deltaTime * 100)
        }, 400);
        timeoutArray.push(timeoutID)
    }

    function directOutside() {

        timeoutArray.forEach(element => {
            clearTimeout(element)
        })

        timeoutArray = []

        cameraDirector.position.x = cameraDirectorPositions[0].p1.x
        cameraDirector.position.y = cameraDirectorPositions[0].p1.y
        cameraDirector.position.z = cameraDirectorPositions[0].p1.z
    }

    function cameraFollowInside() {
        camera.position.x = lerp(camera.position.x, cameraDirector.position.x, lerpWeight * deltaTime * 100)
        camera.position.y = lerp(camera.position.y, cameraDirector.position.y, lerpWeight * deltaTime * 100)
        camera.position.z = lerp(camera.position.z, cameraDirector.position.z, lerpWeight * deltaTime * 100)
        cameraLookAt(5)

        let cameraVaseDistance = getDistance(camera.position.x, 
                                             cameraDirectorPositions[0].p2.x, 
                                             camera.position.y, 
                                             cameraDirectorPositions[0].p2.y)
                                         
        if (cameraVaseDistance < 2) insideProjectUniverse = true
    }
    

    function navigate() {
        focus0 = false
        focus1 = false


        let factor = ((scrollY - 1300) / 3058) / 0.6

        camera.position.x = lerp(camera.position.x, cameraPositions[0].p2.x, lerpWeight * deltaTime * 100)
        camera.position.y = lerp(camera.position.y, cameraPositions[0].p2.y, lerpWeight * deltaTime * 100)
        camera.position.z = lerp(camera.position.z, cameraPositions[0].p4.z * factor, lerpWeight * deltaTime * 100)

        cameraTarget.position.x = lerp(cameraTarget.position.x, cameraTargetPositions[0].p2.x, lerpWeight * deltaTime * 100)
        cameraTarget.position.y = lerp(cameraTarget.position.y, cameraTargetPositions[0].p2.y, lerpWeight * deltaTime * 100)
        cameraTarget.position.z = lerp(cameraTarget.position.z, cameraPositions[0].p4.z * factor, (lerpWeight * 2) * deltaTime * 100)
        camera.lookAt(cameraTarget.position.x, cameraTarget.position.y, cameraTarget.position.z)
    }

    function browseProjects() {
        let factor = ((scrollY - 1300) / 3058) / 0.6

        cameraProject.position.x = lerp(cameraProject.position.x, 5 * factor, lerpWeight * deltaTime * 100)
    }

    function goToStep1() {
        camera.position.x = lerp(camera.position.x, cameraPositions[0].p1.x, lerpWeight * deltaTime * 100)
        camera.position.y = lerp(camera.position.y, cameraPositions[0].p1.y, lerpWeight * deltaTime * 100)
        camera.position.z = lerp(camera.position.z, cameraPositions[0].p1.z, lerpWeight * deltaTime * 100)
        cameraLookAt(1)
        focus0 = false
        focus1 = false
    }

    function goToStep2() {
        camera.position.x = lerp(camera.position.x, cameraPositions[0].p2.x, lerpWeight * deltaTime * 100)
        camera.position.y = lerp(camera.position.y, cameraPositions[0].p2.y, lerpWeight * deltaTime * 100)
        camera.position.z = lerp(camera.position.z, cameraPositions[0].p2.z, lerpWeight * deltaTime * 100)
        cameraLookAt(2)
    }

    function goToStep3() {
        camera.position.x = lerp(camera.position.x, cameraPositions[0].p3.x, lerpWeight * deltaTime * 100)
        camera.position.y = lerp(camera.position.y, cameraPositions[0].p3.y, lerpWeight * deltaTime * 100)
        camera.position.z = lerp(camera.position.z, cameraPositions[0].p3.z, lerpWeight * deltaTime * 100)
        cameraLookAt(5)
    }


    function cameraLookAt(n) {
        if (n === 1) {
            cameraTarget.position.x = lerp(cameraTarget.position.x, cameraTargetPositions[0].p1.x, lerpWeight * deltaTime * 100)
            cameraTarget.position.y = lerp(cameraTarget.position.y, cameraTargetPositions[0].p1.y, lerpWeight * deltaTime * 100)
            cameraTarget.position.z = lerp(cameraTarget.position.z, cameraTargetPositions[0].p1.z, lerpWeight * deltaTime * 100)
            camera.lookAt(cameraTarget.position.x, cameraTarget.position.y, cameraTarget.position.z)
        } else if (n === 2) {
            cameraTarget.position.x = lerp(cameraTarget.position.x, cameraTargetPositions[0].p2.x, lerpWeight * deltaTime * 100)
            cameraTarget.position.y = lerp(cameraTarget.position.y, cameraTargetPositions[0].p2.y, lerpWeight * deltaTime * 100)
            cameraTarget.position.z = lerp(cameraTarget.position.z, cameraTargetPositions[0].p2.z, lerpWeight * deltaTime * 100)
            camera.lookAt(cameraTarget.position.x, cameraTarget.position.y, cameraTarget.position.z)
        } else if (n === 3) {
            cameraTarget.position.x = lerp(cameraTarget.position.x, cameraTargetPositions[0].p3.x, lerpWeight * deltaTime * 100)
            cameraTarget.position.y = lerp(cameraTarget.position.y, cameraTargetPositions[0].p3.y, lerpWeight * deltaTime * 100)
            cameraTarget.position.z = lerp(cameraTarget.position.z, cameraTargetPositions[0].p3.z, lerpWeight * deltaTime * 100)
            camera.lookAt(cameraTarget.position.x, cameraTarget.position.y, cameraTarget.position.z)
        } else if (n === 4) {
            cameraTarget.position.x = lerp(cameraTarget.position.x, cameraTargetPositions[0].p4.x, lerpWeight * deltaTime * 100)
            cameraTarget.position.y = lerp(cameraTarget.position.y, cameraTargetPositions[0].p4.y, lerpWeight * deltaTime * 100)
            cameraTarget.position.z = lerp(cameraTarget.position.z, cameraTargetPositions[0].p4.z, lerpWeight * deltaTime * 100)
            camera.lookAt(cameraTarget.position.x, cameraTarget.position.y, cameraTarget.position.z)
        } else if (n === 5) {
            cameraTarget.position.x = lerp(cameraTarget.position.x, cameraTargetPositions[0].p5.x, lerpWeight * deltaTime * 100)
            cameraTarget.position.y = lerp(cameraTarget.position.y, cameraTargetPositions[0].p5.y, lerpWeight * deltaTime * 100)
            cameraTarget.position.z = lerp(cameraTarget.position.z, cameraTargetPositions[0].p5.z, lerpWeight * deltaTime * 200)
            camera.lookAt(cameraTarget.position.x, cameraTarget.position.y, cameraTarget.position.z)
        }
    }

    // Update controls
    // controls.update()
    
    if (experienceStarted && !insideProjectUniverse) {
        myValue2 = 1
        myValue = lerp(myValue, 0, lerpWeight * deltaTime * 60)
        overlayMaterial.uniforms.uAlpha = { value: myValue }
        // update(deltaTime)
        for (const button of floatingButtonsPositions) {
            const screenPosition = button.position.clone()
            screenPosition.project(camera)
    
            const translateX = screenPosition.x * sizes.width * 0.5
            const translateY = - screenPosition.y * sizes.height * 0.5
    
            button.element.style.transform = `translate(${translateX}px, ${translateY}px)`
    
            if (Math.abs(screenPosition.x * sizes.width * 0.5) > sizes.width * 0.5) {
                button.element.style.display = 'none'
            } else {
                button.element.classList.add('visible')
                button.element.style.display = 'block'
            }
        }
    }

    // Shows black screen when close to Vase
    if (insideProjectUniverse && myValue <= 0.98) {
        myValue = lerp(myValue, 1, lerpWeight * deltaTime * 100)
        overlayMaterial.uniforms.uAlpha = { value: myValue }
        projectButtonFloating.classList.remove('visible')
        // removeEventListener('mouse', wheelEvent)
        scrollY = 1000
    }

    // Render
    if (insideProjectUniverse && myValue > 0.98) {
        if (!sceneProjectScrollToZero) scrollY = 0
        sceneProjectScrollToZero = true
        console.log(scrollY)
        myValue2 = lerp(myValue2, 0, lerpWeight * deltaTime * 100)
        overlayMaterial.uniforms.uAlpha = { value: myValue2 }

        renderer.render(sceneProject, cameraProject)

        console.log("entered Project universe")

    } else {
        renderer.render(scene, camera)
    }

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()