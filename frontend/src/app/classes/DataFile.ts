export class DataFile  {
    name: string;
    size: number;
    ext: string;
    type: string;

    constructor(name, size, ext, type) {
        this.name = name;
        this.size = size;
        this.ext = ext;
        this.type = type;
    }
}
