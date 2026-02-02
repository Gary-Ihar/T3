import { Player } from './module/Player';
import { Logger } from './module/Logger';

const URLS: { url: string; name: string }[] = [
  {
    url: '',
    name: 'Unselected',
  },
  {
    url: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    name: 'MP4',
  },
  {
    url: 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd',
    name: 'DASH',
  },
  {
    url: 'https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths-hls/hls.m3u8',
    name: 'HLS',
  },
];

const video = document.querySelector('#videoPlayer') as HTMLVideoElement;

const select = document.createElement('select');
select.id = `${video.id}_select`;

URLS.forEach((url) => {
  const option = document.createElement('option');
  option.value = url.url;
  option.textContent = url.name;
  select.appendChild(option);
});

video.after(select);

const player = new Player(video, Logger);

select.addEventListener('change', (event) => {
  const target = event.target as HTMLSelectElement;
  player.load(target.value).then((play) => play());
});
