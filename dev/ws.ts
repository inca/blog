import ws from 'ws';
import { Server } from 'http';
import { events } from './events';
// import chalk from 'chalk';

export function createWebSocketServer(server: Server) {
    const wss = new ws.Server({ server });
    wss.on('connection', ws => {
        // console.log(chalk.yellow('ws'), 'new connection');
        events.addListener('event', onEvent);
        ws.on('close', () => {
            // console.log(chalk.yellow('ws'), 'connection closed');
            events.removeListener('event', onEvent);
        });
        function onEvent(data: any) {
            ws.send(JSON.stringify(data));
        }
    });
    return wss;
}
