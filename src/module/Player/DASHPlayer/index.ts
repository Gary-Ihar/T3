import { AbstractPlayer } from '../types';

export class DASHPlayer extends AbstractPlayer {
  static readonly fileExtensions = ['mpd'];
  private dash: any;
  private rejectFn: ((reason: Error) => void) | undefined;

  private hasErrors = () => {
    if (!window.dashjs) {
      this.logger.log('dash instance is not loaded');
      return true;
    }
    return false;
  };

  private initDash = async (url: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      this.rejectFn = reject;
      this.dash = window.dashjs.MediaPlayer().create();
      this.dash.initialize(this.videoElement, url, true);

      let wasStarted = false;

      this.dash.on(window.dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
        wasStarted = true;
        resolve(true);
      });
      this.dash.on(window.dashjs.MediaPlayer.events.ERROR, (e: any) => {
        this.logger.log(JSON.stringify(e));
        if (!wasStarted) {
          reject(false);
        }
      });
    });
  };

  init = async (url: string): Promise<boolean> => {
    if (this.hasErrors()) return false;
    return await this.initDash(url);
  };

  play = async (): Promise<void> => {
    return this.videoElement.play();
  };

  clear(): void {
    this.dash?.destroy();
    this.rejectFn?.(new Error('Cancelled'));
    this.rejectFn = undefined;
    this.dash = undefined;
    this.videoElement.src = '';
  }
}
