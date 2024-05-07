import * as THREE from 'three'
import { VideoTexture } from 'three'
import { sceneProject } from './main'

    // Geometry
    const particulesGeometry = new THREE.BufferGeometry()
    const count = 3000

    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
        positions[i] = (Math.random() - 0.5) * 10
    }

    particulesGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
    )

    // Material
    const particulesMaterial = new THREE.PointsMaterial()
    particulesMaterial.size = 0.02
    particulesMaterial.sizeAttenuation = true

    // points
export const particules = new THREE.Points(particulesGeometry, particulesMaterial)


// Takes all video
const videoArray = []

for(var i = 0; i <= 7; i++) {
    videoArray.push(document.getElementById('video' + i))
}

console.log(videoArray)

const texture = {}
const planeGeometry = {}
const material = {}
export const plane = []
videoArray.forEach((video, index) => {
    texture[index] = new VideoTexture(video)
    planeGeometry[index] = new THREE.PlaneGeometry( 1, 1.48 );
    material[index] = new THREE.MeshBasicMaterial( {map: texture[index]} );
    plane[index] = new THREE.Mesh( planeGeometry[index], material[index] );
    plane[index].position.x = index
})