import { LeafGenerator } from './leafgen';
import { LSystemGenerator } from './lsystem';

const canvas = document.querySelector('#leafgen') as HTMLCanvasElement;
const gen = new LSystemGenerator(canvas);

gen.generate();
