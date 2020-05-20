import {Input, Output, Socket} from 'rete';
import {DataFile} from '../classes/DataFile';

export const audioSocket = new Socket('audio');
export const imageSocket = new Socket('image');
export const videoSocket = new Socket('video');
export const textSocket = new Socket('text');
export const miscSocket = new Socket('misc');

videoSocket.combineWith(imageSocket);

export class SocketFactory {

  public static inputFromType(key, type) {
    return SocketFactory.socketFromType(key, type, true);
  }

  public static outputFromType(key, type) {
    return SocketFactory.socketFromType(key, type, false);
  }

  private static socketFromType(key, type, input) {
    const socketClass = input ? Input : Output;
    switch (type) {
      case DataFile.TYPE_AUDIO:
        return new socketClass(key, 'Audio', audioSocket);
      case DataFile.TYPE_IMAGE:
        return new socketClass(key, 'Image', imageSocket);
      case DataFile.TYPE_VIDEO:
        return new socketClass(key, 'Video', videoSocket);
      case DataFile.TYPE_TEXT:
        return new socketClass(key, 'Text', textSocket);
      case DataFile.TYPE_MISC:
        return new socketClass(key, 'Misc', miscSocket);
    }
    return null;
  }
}
