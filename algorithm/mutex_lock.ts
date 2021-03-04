export class Mutex {
  lock: boolean;
  sleeptime: number;

  constructor() {
    this.lock = false;
    this.sleeptime = 100;
  }

  async acquire() {
    for (;;) {
      if (this.lock === false) {
        break;
      }
      await sleep(this.sleeptime);
    }
    this.lock = true;
  }

  release(): void {
    this.lock = false;
  }
}

function sleep(delay: number): Promise<any> {
  return new Promise<any>((res) => setTimeout(res, delay));
}
