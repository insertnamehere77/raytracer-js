export class Vector {
    constructor(x = 0, y = x, z = x) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    subtract(other) {
        return new Vector(
            this.x - other.x,
            this.y - other.y,
            this.z - other.z);
    }

    magnitude() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
    }

    normalize() {
        const len = this.magnitude();
        return new Vector(this.x / len, this.y / len, this.z / len);
    }

    cross(other) {
        return new Vector(
            (this.y * other.z) - (this.z * other.y),
            (this.z * other.x) - (this.x * other.z),
            (this.x * other.y) - (this.y * other.x),
        )
    }


    multiplyScalar(scalar) {
        return new Vector(
            this.x * scalar,
            this.y * scalar,
            this.z * scalar
        )
    }

    multiply(other) {
        return new Vector(
            this.x * other.x,
            this.y * other.y,
            this.z * other.z,
        )
    }

    add(other) {
        return new Vector(
            this.x + other.x,
            this.y + other.y,
            this.z + other.z,
        )
    }

    dot(other) {
        return (this.x * other.x) + (this.y * other.y) + (this.z * other.z);
    }
}