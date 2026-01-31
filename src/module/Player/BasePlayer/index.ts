import { AbstractPlayer } from '../types';

export class BasePlayer extends AbstractPlayer {
  readonly fileExtensions = ['mp4'];
  private ac: AbortController | undefined;
  private isLoading = false;

  private initErrorListener(): void {
    this.ac = new AbortController();
    this.videoElement.addEventListener('error', (ev) => this.logger.log(JSON.stringify(ev)), {
      signal: this.ac?.signal,
    });
  }

  play(url: string): void {
    if (this.isLoading) return;
    this.isLoading = true;
    this.initErrorListener();
    this.videoElement.src = url;
    this.videoElement.autoplay = true;
    this.videoElement
      .play()
      .catch((error) => {
        this.logger.log(`Play error: ${JSON.stringify(error)}`);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  clear(): void {
    this.ac?.abort();
    this.ac = undefined;
    this.videoElement.src = '';
    this.videoElement.autoplay = false;
    this.isLoading = false;
  }
}
