import { Vector } from './vector';
import { Sphere, Plane } from './shapes';
import { Camera } from './camera';
import { Scene } from './scene';
import { Light } from './light';

const initSpheres = () => {
    // Sphere 1
    const pos1 = new Vector(-1.0, -0.7, 3.0);
    const radius1 = 0.3;

    const ka1 = new Vector(0.1, 0.1, 0.1);
    const kd1 = new Vector(0.2, 1.0, 0.2);
    const ks1 = new Vector(1.0, 1.0, 1.0);
    const km1 = new Vector(0.0, 0.0, 0.0);

    const s1 = 100.0;
    const sphere1 = new Sphere(pos1, ka1, kd1, ks1, km1, s1, radius1);

    // Sphere 2
    const pos2 = new Vector(1.0, -0.5, 3.0);
    const radius2 = 0.5;

    const ka2 = new Vector(0.1, 0.1, 0.1);
    const kd2 = new Vector(0.0, 0.0, 1.0);
    const ks2 = new Vector(1.0, 1.0, 1.0);
    const km2 = new Vector(0.0, 0.0, 0.0);

    const s2 = 10.0;
    const sphere2 = new Sphere(pos2, ka2, kd2, ks2, km2, s2, radius2);


    // Sphere 3 (Reflective)
    const pos3 = new Vector(-1.0, 0.0, -0.0);
    const radius3 = 1.0;

    const ka3 = new Vector(0.0, 0.0, 0.0);
    const kd3 = new Vector(0.0, 0.0, 0.0);
    const ks3 = new Vector(0.0, 0.0, 0.0);
    const km3 = new Vector(1.0, 1.0, 1.0);

    const s3 = 0.0;
    const sphere3 = new Sphere(pos3, ka3, kd3, ks3, km3, s3, radius3);

    // Sphere 4 (Reflective)
    const pos4 = new Vector(1.0, 0.0, -1.0);
    const radius4 = 1.0;

    const ka4 = new Vector(0.0, 0.0, 0.0);
    const kd4 = new Vector(0.0, 0.0, 0.0);
    const ks4 = new Vector(0.0, 0.0, 0.0);
    const km4 = new Vector(0.8, 0.8, 0.8);

    const s4 = 0.0;
    const sphere4 = new Sphere(pos4, ka4, kd4, ks4, km4, s4, radius4);

    return [sphere1, sphere2, sphere3, sphere4];
}

const initPlanes = () => {
    // Plane 1
    const pos1 = new Vector(0.0, -1.0, 0.0);
    const norm1 = new Vector(0.0, 1.0, 0.0);

    const ka1 = new Vector(0.1, 0.1, 0.1);
    const kd1 = new Vector(1.0, 1.0, 1.0);
    const ks1 = new Vector(0.0, 0.0, 0.0);
    const km1 = new Vector(0.0, 0.0, 0.0);

    const s1 = 0.0;
    const plane1 = new Plane(pos1, ka1, kd1, ks1, km1, s1, norm1);

    // Plane 2
    const pos2 = new Vector(0.0, 0.0, -3.0);
    const norm2 = new Vector(0.0, 0.0, 1.0);

    const ka2 = new Vector(0.1, 0.1, 0.1);
    const kd2 = new Vector(1.0, 1.0, 1.0);
    const ks2 = new Vector(0.0, 0.0, 0.0);
    const km2 = new Vector(0.0, 0.0, 0.0);

    const s2 = 0.0;
    const plane2 = new Plane(pos2, ka2, kd2, ks2, km2, s2, norm2);

    return [plane1, plane2];
}


const randomNumber = (min = 0, max = 1) => {
    const spread = max - min;
    const diffFromMin = Math.random() * spread;
    return min + diffFromMin;
}


const randomVector = (min = new Vector(0), max = new Vector(1)) => {
    const x = randomNumber(min.x, max.x);
    const y = randomNumber(min.y, max.y);
    const z = randomNumber(min.z, max.z);
    return new Vector(x, y, z);
}


const initRandomSpheres = (numSpheres = 4) => {
    const minRadius = 0.3;
    const maxRadius = 1.0;

    const minPos = new Vector(-5, -0.7, -3);
    const maxPos = new Vector(5, 0.7, 3);

    const minKa = new Vector(0);
    const maxKa = new Vector(0.1);

    const minKd = new Vector(0);
    const maxKd = new Vector(1);

    const minKs = new Vector(0);
    const maxKs = new Vector(1);

    const minKm = new Vector(0);
    const maxKm = new Vector(1);

    const minS = 0;
    const maxS = 100;

    const spheres = [];
    for (let i = 0; i < numSpheres; i++) {
        const pos = randomVector(minPos, maxPos);
        const radius = randomNumber(minRadius, maxRadius);

        const ka = randomVector(minKa, maxKa);
        const kd = randomVector(minKd, maxKd);
        const ks = randomVector(minKs, maxKs);
        const km = randomVector(minKm, maxKm);

        const s = randomNumber(minS, maxS);
        spheres.push(new Sphere(pos, ka, kd, ks, km, s, radius));
    }

    return spheres;
}

const initRandomPlanes = () => {

    const minKa = new Vector(0);
    const maxKa = new Vector(0.1);

    const minKd = new Vector(0);
    const maxKd = new Vector(1);

    const minKs = new Vector(0);
    const maxKs = new Vector(1);

    const minKm = new Vector(0);
    const maxKm = new Vector(1);

    const minS = 0;
    const maxS = 100;


    // Plane 1
    const pos1 = new Vector(0.0, -1.0, 0.0);
    const norm1 = new Vector(0.0, 1.0, 0.0);

    const ka1 = randomVector(minKa, maxKa);
    const kd1 = randomVector(minKd, maxKd);
    const ks1 = randomVector(minKs, maxKs);
    const km1 = randomVector(minKm, maxKm);

    const s1 = randomNumber(minS, maxS);
    const plane1 = new Plane(pos1, ka1, kd1, ks1, km1, s1, norm1);

    // Plane 2
    const pos2 = new Vector(0.0, 0.0, -3.0);
    const norm2 = new Vector(0.0, 0.0, 1.0);

    const ka2 = randomVector(minKa, maxKa);
    const kd2 = randomVector(minKd, maxKd);
    const ks2 = randomVector(minKs, maxKs);
    const km2 = randomVector(minKm, maxKm);

    const s2 = randomNumber(minS, maxS);
    const plane2 = new Plane(pos2, ka2, kd2, ks2, km2, s2, norm2);

    return [plane1, plane2];
}


const initShapes = (random = false, numSpheres = 4) =>
    random ?
        [...initRandomSpheres(numSpheres), ...initRandomPlanes()] :
        [...initSpheres(), ...initPlanes()];


const initLights = () => {
    const pos1 = new Vector(0.0, 3.0, -2.0);
    const color1 = new Vector(255 * 0.2, 255 * 0.2, 255 * 0.2);
    const light1 = new Light(pos1, color1);

    const pos2 = new Vector(-2.0, 1.0, 4.0);
    const color2 = new Vector(255 * 0.5, 255 * 0.5, 255 * 0.5);
    const light2 = new Light(pos2, color2);

    return [light1, light2];
}

const initCamera = (width, height) => {
    const eye = new Vector(0.0, 0.0, 7.0);
    const lookAt = new Vector(0.0, 0.0, 0.0);
    const up = new Vector(0, 1, 0);
    const fov = 45;

    return new Camera(width, height, eye, lookAt, up, fov);
}

const takePicture = (width, height, randomMode, numSpheres) => {
    const camera = initCamera(width, height);
    const scene = new Scene(initShapes(randomMode, numSpheres), initLights());
    return camera.takePicture(scene);
}

const copyPictureToCanvas = (canvasId, width, height, picture) => {
    const canvas = document.getElementById(canvasId);
    canvas.height = height;
    canvas.width = width;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(canvas.width, canvas.height);

    for (let i = 0; i < imageData.data.length; i++) {
        imageData.data[i] = picture[i];
    }

    ctx.putImageData(imageData, 0, 0);
}


const getUrlParam = (param) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 400;
const DEFAULT_NUM_SPHERES = 4;


const main = () => {

    const height = parseInt(getUrlParam('height')) || DEFAULT_HEIGHT;
    const width = parseInt(getUrlParam('width')) || DEFAULT_WIDTH;

    const randomMode = getUrlParam('random') === 'true';
    const numSpheres = parseInt(getUrlParam('numSpheres')) || DEFAULT_NUM_SPHERES;

    const canvasId = 'canvas';
    const picture = takePicture(width, height, randomMode, numSpheres);
    copyPictureToCanvas(canvasId, width, height, picture);
};

main();