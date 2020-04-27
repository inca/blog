import { LeafGenerator } from './leafgen';

const canvas = document.querySelector('#leafgen') as HTMLCanvasElement;
const gen = new LeafGenerator(canvas);

gen.draw();
