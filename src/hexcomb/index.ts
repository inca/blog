import { mul, sqrt3, Vector2 } from '../math';
import * as d3 from 'd3';
import { Hex } from '../hex';
import { State } from './state';
import { HexInput } from './hex-input';

const state = new State().load();

const container = d3.select('#hexcomb');

const field = new HexInput({
    rings: 4,
    radius: 16,
}).appendTo(container.node()!)
