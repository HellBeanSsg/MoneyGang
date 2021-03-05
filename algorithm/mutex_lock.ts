function sleep(delay: number): Promise<any> {
    return new Promise<any>((res) => setTimeout(res, delay));
}

export class Mutex {
    lock: boolean;

    constructor() {
        this.lock = false;
    }

    async acquire() {
        for (;;) {
            if (this.lock === false) {
                break;
            }
            await sleep(100);
        }
        this.lock = true;
    }

    release(): void {
        this.lock = false;
    }
}
