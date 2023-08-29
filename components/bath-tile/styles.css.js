import { style, createContainer, styleVariants } from "@vanilla-extract/css";

const containerName = createContainer();

export const container = style({
  containerName: containerName,
  containerType: "inline-size",
});

export const block = style({
  display: "flex",
  flexWrap: "wrap",
  gap: 1,

  "@container": {
    [`${containerName} (min-width: 500px)`]: {
      gap: 2,
    },
  },
});

const baseMaze = style({
  width: 10,
  height: 10,

  borderRadius: 1,
  boxShadow: "inset 0px 0px 0 1px rgba(1 1 1 / 0.2)",
});

export const maze = styleVariants({
  default: [baseMaze, { backgroundColor: "#f1f1f1" }],
  done: [baseMaze, { backgroundColor: "#ef877f" }],
});
