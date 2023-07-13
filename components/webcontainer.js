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
import { parse } from "ansicolor";

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
      {name} — <pre style={{ display: "inline" }}>{value}</pre>
    </div>
  );
};

async function createExecutor(container) {
  const process = await container.spawn("jsh");

  let output = "";
  let currentSymbol = null;
  let currentResolve = null;
  let timeout = null;

  process.output.pipeTo(
    new WritableStream({
      write(data) {
        output += data;

        if (currentSymbol === "timeout") {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            currentResolve(output);
            timeout = null;
            currentSymbol = null;
            currentResolve = null;
            output = "";
          }, 5000);
        } else if (data.includes(currentSymbol)) {
          currentResolve(output);
          currentSymbol = null;
          currentResolve = null;
          output = "";
        }
      },
    })
  );

  const waitFor = async (symbol) =>
    new Promise((resolve) => {
      currentSymbol = symbol;
      currentResolve = resolve;
    });

  await waitFor("❯");

  const executables = [
    "❯",
    "\r",
    /\u001b\[\d*G/g,
    "\u001b[?25h",
    "\u001b[?25l",
    "\u001b[?2004h",
    /\u001b\[\d*J/g,
    "\u001b[?2004l",
  ];

  // public API
  return {
    async run(command, symbol = "❯") {
      const input = process.input.getWriter();
      input.write(`${command}\r\n`);
      const output = await waitFor(symbol);
      await input.releaseLock();

      console.log(output);

      return executables
        .reduce((str, next) => str.replaceAll(next, ""), output)
        .split("\n");
    },
  };
}

const commandCache = createCache({
  getKey: ([, currentPath, run]) => `${currentPath} -> ${run}`,
  load: async ([container, currentPath, run]) => {
    const exec = await createExecutor(container);

    await exec.run(`cd ${currentPath}`);
    return (await exec.run(`${run}`))
      .map((part) =>
        part.replace(`~/root/${currentPath}`, "").replaceAll(run, "")
      )
      .filter((part) => !!part)
      .map((part) => parse(part).spans);
  },
});

const Command = ({ run }) => {
  const container = useContainer();
  const currentPath = usePath();

  const result = commandCache.read(container, currentPath, run);

  return (
    <code>
      <pre>{run}</pre>
      <pre>
        {result.map((line, index) => (
          <div key={index}>
            {line.map(({ text, color }, index) => (
              <span key={index} style={{ color: color?.name }}>
                {text}
              </span>
            ))}
          </div>
        ))}
      </pre>
    </code>
  );
};

export { Webcontainer, Folder, File, Command };
