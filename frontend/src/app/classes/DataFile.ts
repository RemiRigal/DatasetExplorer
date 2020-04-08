export class DataFile {

  public static TYPE_MISC = 'misc';
  public static TYPE_AUDIO = 'audio';
  public static TYPE_IMAGE = 'image';

  name: string;
  size: number;
  ext: string;
  type: string;
  loadPreview = false;
  previewRenderer: any = null;

  constructor(name, size, ext, type) {
    this.name = name;
    this.size = size;
    this.ext = ext;
    this.type = type;
  }

  public static isAudio(file) {
    return file.type === DataFile.TYPE_AUDIO;
  }

  public static isImage(file) {
    return file.type === DataFile.TYPE_IMAGE;
  }

  public static isMisc(file) {
    return file.type === DataFile.TYPE_MISC;
  }
}
