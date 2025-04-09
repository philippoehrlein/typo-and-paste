import { getCurrentScope, onScopeDispose, unref, watch } from "kirbyuse";

export function useEventListener(target, event, listener, options) {
  let cleanupFn;
  const cleanup = () => {
    cleanupFn?.();
    cleanupFn = undefined;
  };

  const register = (el, event, listener, options) => {
    el.addEventListener(event, listener, options);
    return () => el.removeEventListener(event, listener, options);
  };

  const stopWatch = watch(
    () => unrefElement(target),
    (el) => {
      cleanup();
      if (!el) return;

      cleanupFn = register(el, event, listener, options);
    },
    { immediate: true, flush: "post" },
  );

  const stop = () => {
    stopWatch();
    cleanup();
  };

  if (getCurrentScope()) {
    onScopeDispose(stop);
  }

  return stop;
}

export function unrefElement(elRef) {
  const plain = unref(elRef);
  return plain?.$el ?? plain;
}
