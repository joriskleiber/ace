import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { openProjectsAtom } from '@atoms/projects';
import { Route, useHistory } from 'react-router-dom';
import { AceConfigHandler } from 'src/renderer/Project/fs/AceConfigHandler';
import path from 'path';
import { ProjectData } from 'src/main';
import { ApplicationFrame } from 'src/renderer/ApplicationFrame';
import { AceConfigurationPanel } from 'src/renderer/Pages/AceConfigurationPanel';
import { CreateProject } from 'src/renderer/Pages/createproject';
import { Home } from 'src/renderer/Pages/Home';
import { ProjectWorkspaceContainer } from 'src/renderer/Pages/ProjectHome/ProjectWorkspaceContainer';
import { RecentlyOpenedProjects } from 'src/renderer/Project/recently-opened';
import { Project } from 'src/renderer/types/Project';
import { invoke } from '@tauri-apps/api';

type ProjectContextType = {
  projects: ProjectData[],
  closeProject: (location: string) => void,
  loadProject: (path: string) => void;
  createProject: (name: string, path: string, instrumentsSrc: string, bundlesSrc: string, htmlUiSrc: string) => void;
}

export const ProjectContext = createContext<ProjectContextType>(undefined as any);
export const useProjects = () => useContext(ProjectContext);

const ACE_PROJECT_GITIGNORE_CONTENT = 'data/*\n';

export const App: React.FC = () => {
  const [projects, setProjects] = useAtom(openProjectsAtom);

  const [, setStartTime] = useState<Date>(new Date());
  const history = useHistory();

  function closeProject(location: string) {
    invoke<string[]>('close_project', { location }).then((v) => console.log(v)).catch((e) => console.error(e));
  }

  const loadProject = (location: string) => {
    const projectStartTime = new Date();
    setStartTime(projectStartTime);
    const aceConfig = new AceConfigHandler().loadConfig();

    if (!fs.existsSync(`${location}/.ace/project.json`)) {
      window.alert(`Project Doesn't exist in: ${location}`);
      return;
    }

    const project = JSON.parse(fs.readFileSync(path.join(location, '.ace/project.json'), { encoding: 'utf8' })) as Project;

    // Create .ace gitignore if it doesn't exist
    if (!fs.existsSync(path.join(location, '.ace/.gitignore'))) {
      fs.writeFileSync(path.join(location, '.ace/.gitignore'), ACE_PROJECT_GITIGNORE_CONTENT);
    }

    if (projects.find((p) => p.name === project.name)) {
      history.push(`/project/${project.name}`);
      return;
    }

    project.paths.instrumentSrc = path.join(location, project.paths.instrumentSrc);
    project.paths.bundlesSrc = path.join(location, project.paths.bundlesSrc);
    project.paths.htmlUiSrc = path.join(location, project.paths.htmlUiSrc);

    // Save project to recently opened projects
    let recentlyOpenedProjects = RecentlyOpenedProjects.load();

    recentlyOpenedProjects = recentlyOpenedProjects.filter(({ name }) => name !== project.name);
    recentlyOpenedProjects.push({ name: project.name, location });

    RecentlyOpenedProjects.save(recentlyOpenedProjects);

    // ipcRenderer.send('load-project', project.paths.htmlUiSrc);
    console.error('TODO: Implement load-project');

    if (aceConfig.richPresenceEnabled) {
      // ipcRenderer.send('set-rpc-state-with-time', `Working on ${project.name}`, projectStartTime);
      console.error('TODO: Implement set-rpc-state-with-time');
    }

    history.push(`/project/${project.name}`);
    setProjects((p) => [...p, { ...project, location }]);
  };

  const createProject = async (name: string, location: string, instrumentsSrc: string, bundlesSrc: string, htmlUiSrc: string) => {
    if (fs.existsSync(`${location}/.ace/project.json`)) return;

    const project: Project = {
      name,
      paths: {
        instrumentSrc: path.relative(location, instrumentsSrc),
        bundlesSrc: path.relative(location, bundlesSrc),
        htmlUiSrc: path.relative(location, htmlUiSrc),
      },
    };

    // Create .ace directory
    if (!fs.existsSync(path.join(location, '.ace'))) {
      fs.mkdirSync(path.join(location, '.ace'));
    }

    // Create project.json
    fs.writeFileSync(path.join(location, '.ace/project.json'), JSON.stringify(project, null, '\t'));

    // Create .ace gitignore
    fs.writeFileSync(path.join(location, '.ace/.gitignore'), ACE_PROJECT_GITIGNORE_CONTENT);

    loadProject(location);
  };

  useEffect(() => {
    if (!projects.length) history.push('/');
  }, [history, projects]);

  return (
    <ProjectContext.Provider value={{
      loadProject, createProject, closeProject, projects,
    }}
    >
      <ApplicationFrame>
        <Route exact path="/" component={Home} />
        {projects.map((it) => (
          <Route key={it.name} path={`/project/${it.name}`}>
            <ProjectWorkspaceContainer key={it.name} project={it} />
          </Route>
        ))}
        <Route exact path="/create-project" component={CreateProject} />
        <Route exact path="/ace-config" component={AceConfigurationPanel} />
      </ApplicationFrame>
    </ProjectContext.Provider>
  );
};

export default App;
