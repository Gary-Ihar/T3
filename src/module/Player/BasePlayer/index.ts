import { AbstractPlayer } from '../types';

export class BasePlayer extends AbstractPlayer {
  static readonly fileExtensions = ['mp4'];
  private rejectFn: ((reason: Error) => void) | undefined;
  private abortController: AbortController | undefined;

  init = async (url: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      this.rejectFn = reject;
      this.abortController = new AbortController();
      this.videoElement.addEventListener(
        'canplay',
        () => {
          this.abortController?.abort();
          resolve(true);
        },
        { signal: this.abortController?.signal }
      );
      this.videoElement.addEventListener(
        'error',
        () => {
          this.abortController?.abort();
          reject(false);
        },
        { signal: this.abortController?.signal }
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
    this.rejectFn?.(new Error('Cancelled'));
    this.rejectFn = undefined;
    this.abortController?.abort();
    this.abortController = undefined;
  }
}
