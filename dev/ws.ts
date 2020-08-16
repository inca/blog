import ws from 'ws';
import { Server } from 'http';
import { events } from './events';

export function createWebSocketServer(server: Server) {
    const wss = new ws.Server({ server });
    wss.on('connection', ws => {
        events.addListener('event', onEvent);
        ws.on('close', () => {
            events.removeListener('event', onEvent);
        });
        function onEvent(data: any) {
            ws.send(JSON.stringify(data));
        }
    });
    return wss;
}
