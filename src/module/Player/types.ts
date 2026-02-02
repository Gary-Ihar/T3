import { ILogger } from '../../types';

interface IPlayer {
  readonly fileExtensions: string[];
  init(url: string): Promise<boolean>;
  play(): Promise<void>;
  clear(): void;
}

export abstract class AbstractPlayer implements IPlayer {
  constructor(
    protected readonly videoElement: HTMLVideoElement,
    protected readonly logger: ILogger
  ) {}
  abstract readonly fileExtensions: string[];
  abstract play(): Promise<void>;
  abstract init(url: string): Promise<boolean>;
  abstract clear(): void;
}
