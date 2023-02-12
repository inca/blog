import { dep } from 'mesh-ioc';

import { Hex } from '../../commons/Hex.js';
import { init } from '../../commons/init.js';
import { provide } from '../../commons/provide.js';
import { GameField } from '../model/GameField.js';
import { EventManager } from './EventManager.js';
import { NodeTypesManager } from './NodeTypesManager.js';
import { StateManager } from './StateManager.js';

@provide('gameField')
export class GameFieldManager {

    @dep() private state!: StateManager;
    @dep() private events!: EventManager;
    @dep() private nodeTypes!: NodeTypesManager;

    field = new GameField(this.state.settings);

    @init()
    init() {
        this.events.stateLoaded.on(() => this.initField());
    }

    private initField() {
        this.field = new GameField(this.state.settings);
        console.info('Field initialized');
    }

    addCell(cell: Hex) {
        const nodeType = this.nodeTypes.selected;
        if (!nodeType) {
            return;
        }
        const type = this.nodeTypes.selectedIndex;
        this.field.addNode(cell, type, true);
    }

    removeCell(cell: Hex) {
        const nodeType = this.nodeTypes.selected;
        if (!nodeType) {
            return;
        }
        this.field.removeByLayer(cell, nodeType.layer);
    }

}
