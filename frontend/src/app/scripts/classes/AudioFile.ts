export class AudioFile  {
    name: string;
    wave: number[];
    sr: number;

    constructor(name, wave, sr) {
        this.name = name;
        this.wave = wave;
        this.sr = sr;
    }

    // getBlob() {
    //   return new window.Blob([new Uint8Array(this.wave)]);
    // }

}
