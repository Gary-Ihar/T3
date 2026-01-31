import { ILogger } from '../../types';

// расширяемо/дополняемо
export class Logger implements ILogger {
  constructor(private readonly key: string) {}

  log = (message: string) => {
    const timeStamp = new Date().toISOString();
    console.log(`[${this.key} - ${timeStamp}] ${message}`);
  };
}
