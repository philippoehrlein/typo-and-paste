import { unref } from "kirbyuse";

export function toValue(r) {
  return typeof r === "function" ? r() : unref(r);
}
