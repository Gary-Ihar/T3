import { AbstractPlayer } from '../types';

export class BasePlayer extends AbstractPlayer {
  readonly fileExtensions = ['mp4'];

  init = async (url: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const ac = new AbortController();
      this.videoElement.addEventListener(
        'canplay',
        () => {
          ac.abort();
          resolve(true);
        },
        { signal: ac.signal }
      );
      this.videoElement.addEventListener(
        'error',
        () => {
          ac.abort();
          reject(false);
        },
        { signal: ac.signal }
      );
      this.videoElement.src = url;
      this.videoElement.autoplay = true;
    });
  };

  play = async (): Promise<void> => {
    return this.videoElement.play();
  };

  clear(): void {
    this.videoElement.src = '';
    this.videoElement.autoplay = false;
  }
}
