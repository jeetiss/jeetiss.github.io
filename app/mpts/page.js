import { Webcontainer, Folder, File, Command } from "@/components/webcontainer";
import { ClientSuspense } from "@/components/client-only";

export default function Page() {
  return (
    <ClientSuspense fallback="loading...">
      <Webcontainer>
        <Folder name="library">
          <File name="index.js" value="console.log(42)" />
          <File
            name="package.json"
            value={JSON.stringify({
              name: "library",
              scripts: { dev: "node index.js" },
            })}
          />
          <Command run="npm run dev" />
        </Folder>
      </Webcontainer>
    </ClientSuspense>
  );
}
