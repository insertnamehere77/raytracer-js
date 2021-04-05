export class Scene {
    constructor(shapes = [], lights = []) {
        this.shapes = shapes;
        this.lights = lights;
    }

    shapeHit(ray, min, max) {
        return this.shapes
            .map(shape => ({ shape, t: shape.intersect(ray) }))
            .filter(result => min <= result.t && result.t < max)
            .reduce((closest, curr) => (curr.t < closest.t) ? curr : closest, { t: Infinity });
    }
}