import { Vector } from './vector';
import { Ray } from './ray';

const ALPHA = 255;

export class Camera {
    constructor(width, height, eye, look, up, fov) {

        this.eye = eye;
        this.lookAt = look;
        this.up = up;
        this.fovY = fov;

        this.width = width;
        this.height = height;
        this.renderedImage = new Uint8ClampedArray(width * height * 4);

        this.focal = 1;
        this.ambient = new Vector(255 * 0.1, 255 * 0.1, 255 * 0.1);

        this.epsilon = 0.001;
        this.omega = 3.0;

        this.createCameraFrame();
    }

    createCameraFrame() {

        const w = this.eye.subtract(this.lookAt).normalize();

        const bXw = this.up.cross(w);
        this.u = bXw.normalize();
        //TODO: Figure out why v needs to be negative or image is flipped
        this.v = w.cross(this.u).multiplyScalar(-1);

        const lenY = 2 * this.focal * Math.tan(this.fovY / 2);
        this.pixelW = lenY / this.height;

        const lenX = lenY * (this.width / this.height);


        const imageCenter = this.eye.add(w.multiplyScalar(-this.focal));

        const uComponent = this.u.multiplyScalar(lenX / 2);
        const vComponent = this.v.multiplyScalar(lenY / 2)
        this.imageOrigin = imageCenter.subtract(uComponent).subtract(vComponent);
    }

    primaryRay(x, y) {
        const pixelX = (x + 0.5) * this.pixelW;
        const pixelY = (y + 0.5) * this.pixelW;

        const uComponent = this.u.multiplyScalar(pixelX);
        const vComponent = this.v.multiplyScalar(pixelY);

        const pixelCenter =
            this.imageOrigin
                .add(uComponent)
                .add(vComponent);

        return new Ray(this.eye, pixelCenter);
    }

    rayColor(ray, t0, t1, scene, count) {

        let color = new Vector();

        if (count === 0) {
            return color;
        }

        const { t, shape } = scene.shapeHit(ray, t0, t1);

        if (t < Infinity) {
            const hitPoint = ray.pointAt(t);
            color = color.add(this.ambient);
            color = color.add(this.hardShadow(ray, hitPoint, shape, scene));
            color = color.add(this.reflection(ray, hitPoint, shape, scene, count));
        }

        return color;
    }

    hardShadow(eyeRay, hitPoint, hitShape, scene) {
        const normal = hitShape.normal(hitPoint);

        return scene.lights
            .filter(light => {
                const { t } = scene.shapeHit(
                    new Ray(hitPoint, light.position),
                    this.epsilon,
                    this.omega)
                return t === Infinity
            })
            .reduce((totalColor, currLight) => {
                const l = currLight.position.subtract(hitPoint).normalize();
                const diff = hitShape.diffuse(l, normal);
                const spec = hitShape.specular(l, normal, hitPoint, eyeRay.origin);
                return totalColor.add(currLight.color.multiply(diff.add(spec)));
            }, new Vector());
    }

    reflectRay(origin, n, l) {
        const r = n.multiplyScalar(l.dot(n) * 2).subtract(l);
        const reflectRay = new Ray(origin, origin);
        reflectRay.direction = r.normalize();

        return reflectRay;
    }

    reflection(eyeRay, hitPoint, hitShape, scene, count) {
        let color = new Vector();

        if (hitShape.isReflective()) {
            const n = hitShape.normal(hitPoint);
            const l = eyeRay.origin.subtract(eyeRay.direction).normalize();
            const reflectRay = this.reflectRay(hitPoint, n, l);
            const rColor = this.rayColor(reflectRay, this.epsilon, Infinity, scene, count - 1);

            color = color.add(hitShape.km.multiply(rColor));
        }

        return color;

    }

    takePicture(scene) {
        for (let i = 0; i < this.renderedImage.length; i += 4) {
            const pixelNum = Math.floor(i / 4);
            const x = Math.floor(pixelNum % this.width);
            const y = Math.floor(pixelNum / this.width);

            const eyeRay = this.primaryRay(x, y);
            const color = this.rayColor(eyeRay, 0, Infinity, scene, 6);

            this.renderedImage[i] = color.x;
            this.renderedImage[i + 1] = color.y;
            this.renderedImage[i + 2] = color.z;
            this.renderedImage[i + 3] = ALPHA;
        }

        return this.renderedImage;
    }
}