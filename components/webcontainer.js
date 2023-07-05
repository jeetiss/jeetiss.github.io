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

const createCommands = (commands, onExit) => {
  let index = 0;
  return new ReadableStream({
    pull(controller) {
      const command = commands[index++];
      if (command) {
        console.log(command);
        controller.enqueue(command);
      } else {
        controller.close();
        // onExit();
      }
    },
  });
};

const commandCache = createCache({
  getKey: ([, currentPath, run]) => `${currentPath} -> ${run}`,
  load: async ([container, currentPath, run]) => {
    const spawn = async (command) => {
      const process = await container.spawn("jsh");
      let chunks = [];

      process.output.pipeTo(
        new WritableStream({
          write(data) {
            console.log(data);
            chunks.push(data);
          },
        })
      );

      // createCommands(
      //   [
      //     `cd ${currentPath}\n`,
      //     "ls -l\n",
      //     `${command}\n`,
      //     "cd ../\n",
      //     "ls -l\n",
      //   ],
      //   () => process.kill()
      // ).pipeTo();

      await new Promise((resolve) => setTimeout(() => resolve(), 2000));

      console.log("wtf");

      const input = process.input.getWriter();

      await input.write(`cd ${currentPath};\n echo "_1_2_3_4_5_6_"`);

      console.log("hehe");

      // await process.exit;

      // console.log("- 1 hehe 1 -");

      return chunks.join("\n");
    };

    const result = await spawn(run);

    return result;
  },
});

const Command = ({ run }) => {
  const container = useContainer();
  const currentPath = usePath();

  const result = commandCache.read(container, currentPath, run);

  return <div>{result}</div>;
};

export { Webcontainer, Folder, File, Command };
