import { createAction } from '@reduxjs/toolkit';
import { ProjectData } from '../../../../main';

export const setProjectData = createAction<ProjectData>('SET_PROJECT_DATA');
