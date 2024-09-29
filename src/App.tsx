import { useState } from "react";
import { commands } from "@/types/bindings";
import CreateProject from "@/components/CreateProject";
import { Link, Route, Switch, useLocation } from "wouter";

const TestComponent: React.FC = () => {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    commands.createProject(name).then((msg) => setGreetMsg(msg));
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">Welcome to Tauri!</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>

      <p>{greetMsg}</p>
    </>
  )
}

const App: React.FC = () => {
  const [location, setLocation] = useLocation();

  return (
    <>
      <div className="absolute text-white right-0 bg-red-700 p-1">
        <button onClick={() => setLocation("/")}>
          {location}
        </button>
      </div>

      <Link href="/create-project">Create Project</Link >

      <Switch>
        <Route path="/" component={() => "Home"} />
        <Route path="/create-project" component={CreateProject} />

        <Route>??</Route>
      </Switch>
    </>
  );
}

export default App;
