import { useState } from "react";
import { commands } from "./bindings";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    commands.createProject(name).then((msg) => setGreetMsg(msg));
  }

  return (
    <div>
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
    </div>
  );
}

export default App;
