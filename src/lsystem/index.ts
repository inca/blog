import { LSystemGenerator } from './lsystem';
import { clamp } from '../util';

const canvas = document.querySelector('#lsystem') as HTMLCanvasElement;
const gen = new LSystemGenerator(canvas);

gen.draw();

document.querySelector('#iterations')!.addEventListener('input', ev => {
    const val = (ev.target as HTMLInputElement).value;
    gen.iterations = clamp(parseInt(val), 1, 7);
    gen.initPath();
    gen.redraw();
});

document.querySelector('#angle')!.addEventListener('input', ev => {
    const val = (ev.target as HTMLInputElement).value;
    gen.angle = parseFloat(val);
    gen.redraw();
});

document.querySelector('#variance')!.addEventListener('input', ev => {
    const val = (ev.target as HTMLInputElement).value;
    gen.variance = parseFloat(val);
    gen.redraw();
});

document.querySelector('#noiseScale')!.addEventListener('input', ev => {
    const val = (ev.target as HTMLInputElement).value;
    gen.noiseScale = parseFloat(val);
    gen.redraw();
});;
