<script>
  import { uploadFile } from "@uploadcare/upload-client";

  let files = [];
  let text = "empty";

  $: if (files.length !== 0) {
    console.log(files)
    text = files[0].name;
  } else {
    text = "empty";
  }

  $: files.length !== 0 && uploadFile(files[0], {
    publicKey: "9dec0cff51a9ddd2da2c",
    onProgress: ({ value }) => console.log("progress: ", value)
  });
</script>

<style>
  input {
    position: absolute !important;

    top: -9999px;
    height: 1px;
    width: 1px;
    overflow: hidden;
    white-space: nowrap;
  }

  button {
    pointer-events: none;
  }
</style>

<label>
  <input type="file" bind:files={files} />
  {text}
  <br />

  <button>upload</button>
</label>
