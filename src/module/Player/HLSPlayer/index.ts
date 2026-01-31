import { AbstractPlayer } from '../types';

export class HLSPlayer extends AbstractPlayer {
  readonly fileExtensions = ['m3u8'];
  private hls: any;
  private isLoading = false;

  private initErrorListener(): void {
    this.hls.on(window.Hls.Events.ERROR, (event: any, data: any) => {
      this.logger.log(`${JSON.stringify(event)} | ${JSON.stringify(data)}`);
    });
  }

  play(url: string): void {
    if (this.isLoading) return;
    this.isLoading = true;
    this.hls = new window.Hls({
      autoStartLoad: true,
    });
    this.hls.loadSource(url);
    this.hls.attachMedia(this.videoElement);
    this.initErrorListener();
    this.hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
      this.videoElement.play().catch((error) => {
        this.logger.log(`Play error: ${JSON.stringify(error)}`);
      });
      this.isLoading = false;
    });
  }

  clear(): void {
    this.hls?.destroy();
    this.hls = undefined;
    this.videoElement.src = '';
    this.isLoading = false;
  }
}
