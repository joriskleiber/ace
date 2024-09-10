import path from 'path';
import { GenericConfigHandler } from './GenericConfigHandler';

export interface AceConfig {
    richPresenceEnabled: boolean;
}

export class AceConfigHandler extends GenericConfigHandler<AceConfig> {
    constructor() {
        super('');
    }

    get fileName(): string {
        return 'ace-config.json';
    }

    get filePath(): string {
        // TODO: replace ConfigHandler with tauri plugin
        return path.join('{FOLDERID_RoamingAppData}', this.fileName);
    }

    createConfig(): AceConfig {
        return {
            richPresenceEnabled: false,
        };
    }
}
