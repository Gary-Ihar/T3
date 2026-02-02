import { ILogger } from '../../types';
import { BasePlayer } from './BasePlayer';
import { HLSPlayer } from './HLSPlayer';
import { DASHPlayer } from './DASHPlayer';
import { VideoStateObserver } from './VideoStateObserver';
import { AbstractPlayer } from './types';

type Extension = string;
type PlayerMap = Record<Extension, () => AbstractPlayer>;
type LoggerConstructor = new (key: string) => ILogger;

const PLAYERS = [
  {
    getPlayer: (video: HTMLVideoElement, Logger: LoggerConstructor) => new BasePlayer(video, new Logger('BasePlayer')),
    class: BasePlayer,
  },
  {
    getPlayer: (video: HTMLVideoElement, Logger: LoggerConstructor) => new HLSPlayer(video, new Logger('HLSPlayer')),
    class: HLSPlayer,
  },
  {
    getPlayer: (video: HTMLVideoElement, Logger: LoggerConstructor) => new DASHPlayer(video, new Logger('DASHPlayer')),
    class: DASHPlayer,
  },
];

export class Player {
  private playerMapByExtension: PlayerMap = {};
  private currentPlayer: AbstractPlayer | undefined;
  private logger: ILogger;
  private videoStateObserver: VideoStateObserver;

  constructor(videoElement: HTMLVideoElement, Logger: LoggerConstructor) {
    this.logger = new Logger('Player');

    this.videoStateObserver = new VideoStateObserver(
      videoElement,
      (state) => this.logger.log(`Player state: ${state}`),
      (data) => this.logger.log(`Buffering data: ${data.end - data.start} Ms`)
    );

    this.playerMapByExtension = PLAYERS.reduce<PlayerMap>((acc, player) => {
      player.class.fileExtensions.forEach((extension) => {
        acc[extension] = () => player.getPlayer(videoElement, Logger);
      });
      return acc;
    }, {});
  }

  private getSpecificPlayerByUrl(url: string): (() => AbstractPlayer) | undefined {
    try {
      const urlObject = new URL(url);
      const extension = urlObject.pathname.split('.').pop();

      if (!extension) return undefined;

      return this.playerMapByExtension[extension];
    } catch (error) {
      this.logger.log(`Parse url: ${url} error: ${error}`);
      return undefined;
    }
  }

  private setCurrentPlayer(player: AbstractPlayer): void {
    this.currentPlayer = player;
  }

  private simpleClear(): void {
    this.currentPlayer?.clear();
    this.currentPlayer = undefined;
  }

  async load(url: string): Promise<() => Promise<void>> {
    this.simpleClear();
    if (!url) return Promise.reject(new Error('URL is required'));

    const player = this.getSpecificPlayerByUrl(url);
    if (!player) return Promise.reject(new Error('Player not found'));

    const playerInstance = player();

    this.setCurrentPlayer(playerInstance);

    const canPlay = await playerInstance.init(url);
    if (!canPlay) return Promise.reject(new Error('Player not initialized'));

    return () =>
      playerInstance.play().catch((error) => {
        const errorMessage = `Play error: ${JSON.stringify(error)}`;
        this.logger.log(errorMessage);
        throw new Error(errorMessage);
      });
  }

  destroy(): void {
    this.simpleClear();
    this.playerMapByExtension = {};
    this.videoStateObserver?.destroy();
  }
}
