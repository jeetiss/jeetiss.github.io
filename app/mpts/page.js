import { Webcontainer, Folder, File } from "@/components/webcontainer";
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
              scripts: { run: "node index.js" },
            })}
          />
        </Folder>
      </Webcontainer>
    </ClientSuspense>
  );
}
