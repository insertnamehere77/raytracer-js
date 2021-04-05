
export class Ray {
    constructor(origin, point) {
        this.origin = origin;
        this.direction = point.subtract(origin).normalize();
    }

    pointAt(t) {
        return this.origin.add(this.direction.multiplyScalar(t));
    }
}