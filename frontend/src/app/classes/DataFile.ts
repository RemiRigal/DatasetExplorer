export class DataFile {

  public static TYPE_MISC = 'misc';
  public static TYPE_AUDIO = 'audio';
  public static TYPE_IMAGE = 'image';
  public static TYPE_VIDEO = 'video';

  id: string;
  name: string;
  size: number;
  ext: string;
  type: string;
  url: string;
  loadPreview = false;
  previewRenderer: any = null;

  constructor(id, name, size, ext, type, url) {
    this.id = id;
    this.name = name;
    this.size = size;
    this.ext = ext;
    this.type = type;
    this.url = url;
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

  public static isVideo(file) {
    return file.type === DataFile.TYPE_VIDEO;
  }
}
