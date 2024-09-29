import React, { useState } from 'react'
import { open } from '@tauri-apps/plugin-dialog';

const CreateProject: React.FC = () => {
    const [projectLocation, setProjectLocation] = useState("");

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>, setValue: React.Dispatch<React.SetStateAction<string>>) => {
        setValue(event.currentTarget.value);
    }

    const handleOpenFileDialog = (setValue: React.Dispatch<React.SetStateAction<string>>) => {
        open({ directory: true }).then((result) => {
            if (!result) return;

            setValue(result);
        });
    }

    return (
        <form className='flex flex-col h-full'>
            <input placeholder='Project Name' />
            <div>
                <input placeholder='Project Location' value={projectLocation} onChange={(e) => handleInput(e, setProjectLocation)} />
                <button onClick={() => handleOpenFileDialog(setProjectLocation)}>
                    icon
                </button>
            </div>
            <input placeholder='Instruments Location' />
            <input placeholder='Bundles Location' />
            <input placeholder='html_ui Location' />
            <button>
                Create Project
            </button>
            <button>
                Cancel
            </button>
        </form>
    );
}

export default CreateProject;