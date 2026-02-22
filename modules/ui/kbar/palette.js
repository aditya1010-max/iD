// export function createPalette(selection) {
//   const overlay = selection
//     .append('div')
//     .attr('class', 'kbar-overlay');

//   const modal = overlay
//     .append('div')
//     .attr('class', 'kbar-modal')
//     .attr('role', 'dialog')
//     .attr('aria-modal', 'true');

//   const input = modal
//     .append('input')
//     .attr('class', 'kbar-input')
//     .attr('type', 'text')
//     .attr('placeholder', 'Type a command...')
//     .node();

//   const list = modal
//     .append('ul')
//     .attr('class', 'kbar-results');

//   function destroy() {
//     overlay.remove();
//   }

//   return { overlay, modal, input, list, destroy };
// }

// this file wold contain the code for DOM creation





//v2
//below is stable code with a destroy method





// let paletteInstance = null;

// export function createPalette(selection) {
//   if (paletteInstance) return paletteInstance;

//   const overlay = selection
//     .append('div')
//     .attr('class', 'kbar-overlay hidden');

//   const modal = overlay
//     .append('div')
//     .attr('class', 'kbar-modal')
//     .attr('role', 'dialog')
//     .attr('aria-modal', 'true');

//   const input = modal
//     .append('input')
//     .attr('class', 'kbar-input')
//     .attr('type', 'text')
//     .attr('placeholder', 'Type a command...')
//     .node();

//   const list = modal
//     .append('ul')
//     .attr('class', 'kbar-results');

//   function destroy() {
//     overlay.remove();
//     paletteInstance = null;
//   }

//   paletteInstance = { overlay, modal, input, list, destroy };
//   return paletteInstance;
// }




//v3



// modules/ui/kbar/palette.js

let paletteInstance = null;

export function createPalette(selection) {
  if (paletteInstance) return paletteInstance;

  const overlay = selection
    .append('div')
    .attr('class', 'kbar-overlay hidden')
    .attr('tabindex', '-1');

  const modal = overlay
    .append('div')
    .attr('class', 'kbar-modal')
    .attr('role', 'dialog')
    .attr('aria-modal', 'true');

  const input = modal
    .append('input')
    .attr('class', 'kbar-input')
    .attr('type', 'text')
    .attr('placeholder', 'Type a command...')
    .attr('autocomplete', 'off')
    .node();

  const list = modal
    .append('ul')
    .attr('class', 'kbar-results');

  function destroy() {
    overlay.remove();
    paletteInstance = null;
  }

  paletteInstance = { overlay, modal, input, list, destroy };
  return paletteInstance;
}
