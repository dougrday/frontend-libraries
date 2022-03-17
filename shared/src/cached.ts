export class Cached<T> {
    private expires: Date | undefined = undefined;
    private value: T | undefined;

    clear() {
        this.expires = undefined;
        this.value = undefined;
    }

    get(): T | undefined {
        if (this.expires && this.expires.getTime() < new Date().getTime()) {
            this.value = undefined;
        }
        return this.value;
    }

    set(value: T, expires?: Date): void {
        this.value = value;
        if (expires) {
            this.expires = expires;
        }
    }
}
