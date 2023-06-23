// const HLMVP = () => (
//   <webcontainer>
//     <folder name="example">
//       <folder name="kek">
//         <file name="index.js" value="..." />
//       </folder>

//       <file name="index.js" value="..." />
//       <file name="webpack.config.js" value="..." hidden />

//       <watch>
//         <command run="npm run build"/>
//         <preview path="./dist/main.js" />
//       </watch>
//     </folder>
//   </webcontainer>
// );
"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { WebContainer } from "@webcontainer/api";
import { createSingleEntryCache, createCache } from "suspense";

const workdirName = "root";

const Code = ({ value }) => {
  const [code, update] = useState(() => value);

  useEffect(() => console.log(code), [code]);

  return (
    <code>
      <pre contentEditable onInput={(e) => update(e.target.textContent)}>
        {value}
      </pre>
    </code>
  );
};

const Container = createContext();
const containerCache = createSingleEntryCache({
  load: async () => {
    const container = await WebContainer.boot({ workdirName });
    await container.mount({});

    return container;
  },
});

const useContainer = () => useContext(Container);

const Webcontainer = ({ children }) => {
  const container = containerCache.read();
  useEffect(() => {
    console.log(container);
    window.container = container;
  }, []);
  return <Container.Provider value={container}>{children}</Container.Provider>;
};

const Path = createContext(workdirName);
const usePath = () => useContext(Path);

const Folder = ({ name, children }) => {
  const currentPath = usePath();
  return (
    <Path.Provider value={`${currentPath}/${name}`}>{children}</Path.Provider>
  );
};

const fileCache = createCache({
  getKey: ([, currentPath, name]) => `${currentPath}/${name}`,
  load: async ([container, currentPath, name, content]) => {
    await container.fs.mkdir(currentPath, { recursive: true });
    await container.fs.writeFile(`${currentPath}/${name}`, content);
  },
});

const File = ({ name, value }) => {
  const container = useContainer();
  const currentPath = usePath();

  fileCache.read(container, currentPath, name, value);

  return (
    <div>
      {name} — {value}
    </div>
  );
};

const commandCache = createCache({
  getKey: ([, currentPath, run]) => `${currentPath} -> ${run}`,
  load: async ([container, currentPath, run]) => {
    const spawn = async (command, options) => {
      const process = await container.spawn(command, options);
      let chunks = [];
      process.output.pipeTo(
        new WritableStream({
          write(data) {
            console.log(data);
            chunks.push(data);
          },
        })
      );

      await process.exit;

      new ReadableStream({
        read() {},
      }).pipeTo(process.input);

      await process.exit;

      return chunks.join("\n");
    };

    const [command, ...options] = run.split(" ");

    const pathOutput = await spawn("cd", [currentPath]);
    const result = await spawn(command, options);

    return [pathOutput, result].join("\n");
  },
});

const Command = ({ run }) => {
  const container = useContainer();
  const currentPath = usePath();

  const result = commandCache.read(container, currentPath, run);

  return <div>{result}</div>;
};

export { Webcontainer, Folder, File, Command };
