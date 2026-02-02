import { AbstractPlayer } from '../types';

export class HLSPlayer extends AbstractPlayer {
  static readonly fileExtensions = ['m3u8'];
  private hls: any;
  private rejectFn: ((reason: Error) => void) | undefined;

  private hasErrors = () => {
    if (!window.Hls) {
      this.logger.log('hls instance is not loaded');
      return true;
    }
    return false;
  };

  private initHls = async (url: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      this.rejectFn = reject;
      this.hls = new window.Hls({
        autoStartLoad: true,
      });
      this.hls.loadSource(url);
      this.hls.attachMedia(this.videoElement);
      let wasStarted = false;
      this.hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
        wasStarted = true;
        resolve(true);
      });
      this.hls.on(window.Hls.Events.ERROR, (event: any, data: any) => {
        this.logger.log(`${JSON.stringify(event)} | ${JSON.stringify(data)}`);
        if (!wasStarted) {
          reject(false);
        }
      });
    });
  };

  init = async (url: string): Promise<boolean> => {
    if (this.hasErrors()) return false;
    return await this.initHls(url);
  };

  play = async (): Promise<void> => {
    return this.videoElement.play();
  };

  clear(): void {
    this.hls?.destroy();
    this.rejectFn?.(new Error('Cancelled'));
    this.rejectFn = undefined;
    this.hls = undefined;
    this.videoElement.src = '';
  }
}
