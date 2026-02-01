import { AbstractPlayer } from '../types';

export class DASHPlayer extends AbstractPlayer {
  readonly fileExtensions = ['mpd'];
  private dash: any;
  private isLoading = false;

  private initErrorListener(): void {
    this.dash.on(window.dashjs.MediaPlayer.events.ERROR, (e: any) => {
      this.logger.log(JSON.stringify(e));
    });
  }

  play(url: string): void {
    if (this.isLoading) return;
    if (!window.dashjs) {
      this.logger.log('dash instance is not loaded');
      return;
    }
    this.isLoading = true;
    this.dash = window.dashjs.MediaPlayer().create();
    this.dash.initialize(this.videoElement, url, true);
    this.initErrorListener();

    this.dash.on(window.dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
      this.videoElement.play().catch((error) => {
        this.logger.log(`Play error: ${JSON.stringify(error)}`);
      });
      this.isLoading = false;
    });
  }

  clear(): void {
    this.dash?.destroy();
    this.dash = undefined;
    this.videoElement.src = '';
    this.isLoading = false;
  }
}
