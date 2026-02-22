// import { kbarRegistry } from './registry';
// import { createPalette } from './palette';
// import { renderResults } from './render';
// import { installEvents } from './events';
// import { createCloser } from './lifecycle';

// export function kbar(context) {
//   return function(selection) {
//     const actions = kbarRegistry(context)();

//     const { overlay, input, list } = createPalette(selection);

//     const close = createCloser({ overlay, context });

//     renderResults(list, actions, close);
//     installEvents({ input, list, actions, close });

//     input.focus();
//   };
// }



//v2



// import { kbarRegistry } from './registry';
// import { createPalette } from './palette';
// import { renderResults } from './render';
// import { installEvents } from './events';
// import { createCloser } from './lifecycle';

// export function kbar(context) {
//   let palette;
//   let close;

//   return function(selection) {
//     // Create once
//     if (!palette) {
//       const actions = kbarRegistry(context)();

//       palette = createPalette(selection);
//       close = createCloser({ overlay: palette.overlay, context });

//       renderResults(palette.list, actions, close);
//       installEvents({
//         input: palette.input,
//         list: palette.list,
//         actions,
//         close
//       });
//     }

//     // Open behavior
//     palette.overlay.classed('hidden', false);
//     palette.input.value = '';
//     palette.input.focus();
//   };
// }





//v3





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
