import { Webcontainer, Folder, File, Command } from "@/components/webcontainer";
import { ClientSuspense } from "@/components/client-only";
import { Suspense } from "react";

export default function Page() {
  return (
    <ClientSuspense fallback="loading...">
      <Webcontainer>
        <Folder name="library">
          <File name="index.js" value="console.log('hello world')" />
          <File
            name="package.json"
            value={JSON.stringify({
              name: "library",
              scripts: { build: "webpack" },
              devDependencies: {
                webpack: "^5.38.1",
                "webpack-cli": "^4.7.2",
              },
            })}
          />
          <File
            name="webpack.config.js"
            value={`const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    main: './index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
`}
          />
          <Suspense fallback="executing...">
            <Command run="npm install">
              <Command run="npm run build"></Command>
            </Command>
          </Suspense>
        </Folder>
      </Webcontainer>
    </ClientSuspense>
  );
}

/* 
<Folder name="answer">
  <File name="index.js" value="console.log(42 + 42 + 42)" />
  <File
    name="package.json"
    value={JSON.stringify({
      name: "answer",
      scripts: { dev: "node index.js" },
    })}
  />
  <Suspense fallback="executing...">
    <Command run="npm run dev" />
  </Suspense>
</Folder>

<Folder name="promise">
  <File
    name="index.js"
    value="new Promise(resolve => setTimeout(() => {console.log('💩💩💩'); resolve();}, 200));"
  />
  <Suspense fallback="executing...">
    <Command run="node index.js" />
  </Suspense>
</Folder> */
