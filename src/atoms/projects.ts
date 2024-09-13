import { atom } from 'jotai';

import { ProjectData } from '../main';

export const openProjectsAtom = atom<ProjectData[]>([]);
