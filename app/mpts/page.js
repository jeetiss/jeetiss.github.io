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
              scripts: { dev: "node index.js" },
            })}
          />
          <Suspense fallback="executing...">
            <Command run="npm run dev" />
          </Suspense>
        </Folder>

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
        </Folder>
      </Webcontainer>
    </ClientSuspense>
  );
}
