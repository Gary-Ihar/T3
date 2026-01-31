import { ILogger } from '../../types';

interface IPlayer {
  readonly fileExtensions: string[];
  play(url: string): void;
  clear(): void;
}

export abstract class AbstractPlayer implements IPlayer {
  constructor(
    protected readonly videoElement: HTMLVideoElement,
    protected readonly logger: ILogger
  ) {}
  abstract readonly fileExtensions: string[];
  abstract play(url: string): void;
  abstract clear(): void;
}
