import { ProjectData } from '../../main';
import { GenericConfigHandler } from './GenericConfigHandler';

export abstract class GenericProjectConfigHandler<T> extends GenericConfigHandler<T> {
    constructor(
        private project: ProjectData,
    ) {
        super(project.location);
    }
}
