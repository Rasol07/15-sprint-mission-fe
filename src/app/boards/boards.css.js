import { style } from "@vanilla-extract/css";

export const container = style({
  maxWidth: 1200,
  width: "calc(100% - 48px)",
  margin: "0 auto",
  paddingTop: 24,
  display: "flex",
  flexDirection: "column",
  gap: 40,
});
