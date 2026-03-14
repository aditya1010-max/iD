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
