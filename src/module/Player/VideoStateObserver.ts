// Процесс воспроизведения контента имеет разные состояния:
// контента нет, видеотэг пуст (IDLE)
// контент загружается, воспроизведение не начали (LOADING)
// контент загрузился, готовы к воспроизведению (READY)
// воспроизводим (PLAYING)
// пауза (PAUSED)
// перемотка (SEEKING)
// буфферизация (BUFFERING)
// воспроизведение окончено (ENDED)
// Необходимо написать класс, который в качестве аргумента принимает ссылку на
// видеотэг, и в любой момент времени может определить, в каком из перечисленных
// выше состояний находится процесс воспроизведения.
// Этот класс, обнаружив изменения состояния воспроизведения(например,
// пользователь нажал паузу), должен сообщить об этом в консоль браузера. Для
// состояния BUFFERING необходимо определить длительность буфферизации.

enum PlayerState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  READY = 'READY',
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  SEEKING = 'SEEKING',
  BUFFERING = 'BUFFERING',
  ENDED = 'ENDED',
}

export class VideoStateObserver {
  private state: PlayerState = PlayerState.IDLE;
  private abortController: AbortController;
  private bufferingData = {
    start: 0,
    end: 0,
  };

  constructor(
    private readonly videoElement: HTMLVideoElement,
    private readonly onStateChange: (state: VideoStateObserver['state']) => void,
    private readonly onBufferingEnd: (data: VideoStateObserver['bufferingData']) => void
  ) {
    this.abortController = new AbortController();
    this.start();
  }

  getState() {
    return this.state;
  }

  destroy() {
    this.abortController.abort();
  }

  private start = () => {
    const signal = this.abortController.signal;

    // LOADING - контент загружается, воспроизведение не начали
    this.videoElement.addEventListener('loadstart', () => this.changeState(PlayerState.LOADING), { signal });

    // READY - контент загрузился, готовы к воспроизведению
    this.videoElement.addEventListener(
      'canplay',
      () => {
        if (this.state === PlayerState.LOADING) {
          this.changeState(PlayerState.READY);
        }
      },
      { signal }
    );

    // PLAYING - воспроизводим
    this.videoElement.addEventListener(
      'playing',
      () => {
        if (this.bufferingData.end === 0) {
          this.bufferingData.end = performance.now();
          this.onBufferingEnd(this.bufferingData);
        }
        this.changeState(PlayerState.PLAYING);
      },
      { signal }
    );

    // PAUSED - пауза
    this.videoElement.addEventListener(
      'pause',
      () => {
        if (!this.videoElement.ended && !this.videoElement.seeking) {
          this.changeState(PlayerState.PAUSED);
        }
      },
      { signal }
    );

    // SEEKING - перемотка
    this.videoElement.addEventListener('seeking', () => this.changeState(PlayerState.SEEKING), { signal });

    this.videoElement.addEventListener(
      'seeked',
      () => {
        if (this.videoElement.paused && !this.videoElement.ended) {
          this.changeState(PlayerState.PAUSED);
        } else if (!this.videoElement.paused) {
          this.changeState(PlayerState.PLAYING);
        } else if (this.videoElement.ended) {
          this.changeState(PlayerState.ENDED);
        }
      },
      { signal }
    );

    // BUFFERING - буфферизация
    this.videoElement.addEventListener(
      'waiting',
      () => {
        if (this.state !== PlayerState.SEEKING && this.state !== PlayerState.LOADING) {
          this.bufferingData.start = performance.now();
          this.bufferingData.end = 0;
          this.changeState(PlayerState.BUFFERING);
        }
      },
      { signal }
    );

    // ENDED - воспроизведение окончено
    this.videoElement.addEventListener('ended', () => this.changeState(PlayerState.ENDED), { signal });

    // IDLE - контента нет, видеотэг пуст
    this.videoElement.addEventListener(
      'emptied',
      () => {
        this.bufferingData = { start: 0, end: 0 };
        this.changeState(PlayerState.IDLE);
      },
      { signal }
    );
  };

  private changeState = (state: PlayerState) => {
    if (state !== this.state) {
      this.onStateChange(state);
    }
    this.state = state;
  };
}
