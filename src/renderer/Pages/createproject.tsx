import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import path from 'path';
import { open } from '@tauri-apps/api/dialog';
import { isHtmlUiFolderSuitable, isInstrumentsFolderSuitable, isProjectFolderSuitable } from '../../utils/project';
import { useProjects } from '../../main';

export const CreateProject = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [instrumentsLocation, setInstrumentsLocation] = useState('');
    const [htmlUiLocation, setHtmlUiLocation] = useState('');
    const [bundlesLocation, setBundlesLocation] = useState('');

    const { createProject } = useProjects();
    const history = useHistory();

    return (
        <div>
            <h3>Project Name: </h3>
            <input
                value={name}
                className="mb-2 pl-1 rounded-md text-white"
                onChange={(e) => setName(e.target.value)}
            />

            <h3>
                Project Location:
                {' '}
                {location}
            </h3>
            <button
                type="button"
                className="mb-2"
                onClick={() => {
                    open({ directory: true, title: 'Select the root directory of your project' })
                        .then((result) => {
                            if (!result) return;
                            if (!isProjectFolderSuitable(result as string)) return;

                            setLocation(result as string);
                        })
                        .catch((e) => console.error(e));
                }}
            >
                Select Folder
            </button>
            <h3>
                Instruments Location:
                {' '}
                {instrumentsLocation}
            </h3>
            <button
                type="button"
                className="mb-2"
                onClick={() => {
                    open({ directory: true, title: 'Select the Instruments folder of your project', defaultPath: path.join(location, 'src/instruments/src') })
                        .then((result) => {
                            if (!result) return;
                            if (!isProjectFolderSuitable(result as string)) return;

                            setInstrumentsLocation(result as string);
                        })
                        .catch((e) => console.error(e));
                }}
            >
                Select Instruments Folder
            </button>
            <h3>
                Bundles Location:
                {' '}
                {bundlesLocation}
            </h3>
            <button
                type="button"
                className="mb-2"
                onClick={() => {
                    open({ directory: true, title: 'Select the Bundles folder of your project', defaultPath: path.join(location, '.') })
                        .then((result) => {
                            if (!result) return;
                            if (!isInstrumentsFolderSuitable(result as string, location)) return;

                            setBundlesLocation(result as string);
                        })
                        .catch((e) => console.error(e));
                }}
            >
                Select Bundles Folder
            </button>

            <h3>
                html_ui Location:
                {' '}
                {htmlUiLocation}
            </h3>
            <button
                type="button"
                className="mb-2"
                onClick={() => {
                    open({ directory: true, title: 'Select the Bundles folder of your project', defaultPath: path.join(location, '.') })
                        .then((result) => {
                            if (!result) return;
                            if (!isHtmlUiFolderSuitable(result as string, location)) return;

                            setHtmlUiLocation(result as string);
                        })
                        .catch((e) => console.error(e));
                }}
            >
                Select html_ui Folder
            </button>

            <br />
            <br />

            <div className="space-x-2">
                <button
                    type="button"
                    onClick={async () => {
                        createProject(name.replace(/\s/g, '-'), location, instrumentsLocation, bundlesLocation, htmlUiLocation);
                        history.push('/');
                    }}
                >
                    Create Project
                </button>
                <button type="button" onClick={() => history.push('/')}>Cancel</button>
            </div>
        </div>
    );
};
