import { kbarRegistry } from './registry';
import { createPalette } from './palette';
import { renderResults } from './render';
import { installEvents } from './events';
import { createCloser } from './lifecycle';


export function kbar(context) {
  let palette;
  let close;
  let actions;

  function init() {
    if (palette) return;

    actions = kbarRegistry(context)();

    const selection = context.container();
    palette = createPalette(selection);
    close = createCloser({ overlay: palette.overlay, context });

    renderResults(palette.list, actions, close);
    installEvents({
      input: palette.input,
      list: palette.list,
      actions,
      close
    });

    palette.overlay.classed('hidden', true);
  }

  function open() {
    init();

    palette.overlay.classed('hidden', false);
    palette.input.value = '';
    palette.input.focus();
  }

  function installGlobalShortcut() {
    function onKeydown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        open();
      }
    }
    document.addEventListener('keydown', onKeydown);
  }

  installGlobalShortcut();

  return { open };
}
