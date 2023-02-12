import { dep } from 'mesh-ioc';

import { provide } from '../../commons/provide.js';
import { StateManager } from './StateManager.js';

@provide('gameField')
export class GameFieldManager {

    @dep() private state!: StateManager;

}
