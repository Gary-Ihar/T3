import { ILogger } from '../../types';

interface IPlayer {
  init(url: string): Promise<boolean>;
  play(): Promise<void>;
  clear(): void;
}

export abstract class AbstractPlayer implements IPlayer {
  static readonly fileExtensions: string[] = [];
  constructor(
    protected readonly videoElement: HTMLVideoElement,
    protected readonly logger: ILogger
  ) {}
  abstract play(): Promise<void>;
  abstract init(url: string): Promise<boolean>;
  abstract clear(): void;
}
