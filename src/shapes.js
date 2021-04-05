class Shape {
    constructor(position, ka, kd, ks, km, s) {
        this.position = position;

        this.ka = ka;
        this.kd = kd;
        this.ks = ks;
        this.km = km;
        this.s = s;
    }

    diffuse(l, n) {
        return this.kd.multiplyScalar(Math.max(l.dot(n), 0));
    }

    specular(l, n, position, eye) {
        const e = eye.subtract(position).normalize();
        const r = n.multiplyScalar(l.dot(n) * 2).subtract(l);

        let coeff = Math.max(r.dot(e), 0.0);
        coeff = Math.pow(coeff, this.s);

        return this.ks.multiplyScalar(coeff);
    }

    isReflective() {
        return ((this.km.x + this.km.y + this.km.z) > 0.0);
    }
}


export class Sphere extends Shape {
    constructor(position, ka, kd, ks, km, s, radius) {
        super(position, ka, kd, ks, km, s);
        this.radius = radius;
    }

    intersect(ray) {
        const a = ray.direction.dot(ray.direction);
        const originToCenter = ray.origin.subtract(this.position);
        const b = 2 * originToCenter.dot(ray.direction);
        const c = originToCenter.dot(originToCenter) - (this.radius * this.radius);

        const insideSqrt = (b * b) - (4 * a * c);
        const t = (-b - Math.sqrt(insideSqrt)) / (2.0 * a);

        return isNaN(t) ? Infinity : t;
    }

    normal(position) {
        return position.subtract(this.position).normalize();
    }

}


export class Plane extends Shape {
    constructor(position, ka, kd, ks, km, s, normal) {
        super(position, ka, kd, ks, km, s);
        this.norm = normal;
    }

    intersect(ray) {

        const numerator = this.position.subtract(ray.origin).dot(this.norm);
        const denominator = ray.direction.dot(this.norm);
        const t = numerator / denominator;

        return t >= 0 ? t : Infinity;
    }

    normal() {
        return this.norm;
    }
}