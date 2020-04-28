export class DataFile {

  public static TYPE_MISC = 'misc';
  public static TYPE_AUDIO = 'audio';
  public static TYPE_IMAGE = 'image';
  public static TYPE_VIDEO = 'video';
  public static TYPE_TEXT = 'text';

  id: string;
  name: string;
  size: number;
  ext: string;
  type: string;
  url: string;
  loadPreview = false;
  previewRenderer: any = null;
  icon: string;

  constructor(id, name, size, ext, type, url) {
    this.id = id;
    this.name = name;
    this.size = size;
    this.ext = ext;
    this.type = type;
    this.url = url;
    this.icon = DataFile.getTypeIcon(type);
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

  public static getTypeIcon(type) {
    switch (type) {
      case DataFile.TYPE_AUDIO:
        return 'audiotrack';
      case DataFile.TYPE_IMAGE:
        return 'image';
      case DataFile.TYPE_VIDEO:
        return 'videocam';
      case DataFile.TYPE_TEXT:
        return 'view_headline';
      case DataFile.TYPE_MISC:
        return 'insert_drive_file';
    }
    return 'insert_drive_file';
  }
}
