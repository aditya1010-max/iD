// this file would contain code for keyboard events and input handeling


// import { select as d3_select } from 'd3-selection';
// import { filterActions } from './filter';
// import { renderResults } from './render';

// export function installEvents({ input, list, actions, close }) {
//     const d3_input = d3_select(input);
//     const d3_window = d3_select(window);

//     // 1. Handle Search Input
//     d3_input.on('input.kbar', function() {
//         const query = this.value;
//         const filtered = filterActions(actions, query);
//         renderResults(list, filtered, close);

//         // Auto-select the first result after filtering
//         list.selectAll('.kbar-item').classed('active', (d, i) => i === 0);
//     });

//     // 2. Handle Keyboard Navigation & Actions
//     d3_window.on('keydown.kbar', (e) => {
//         const items = list.selectAll('.kbar-item');
//         const activeItem = list.select('.kbar-item.active');

//         // Find index of active item
//         let activeIdx = -1;
//         items.each(function(d, i) {
//             if (d3_select(this).classed('active')) activeIdx = i;
//         });

//         if (e.key === 'Escape') {
//             e.preventDefault();
//             close();
//         }

//         if (e.key === 'ArrowDown') {
//             e.preventDefault();
//             const nextIdx = Math.min(activeIdx + 1, items.size() - 1);
//             items.classed('active', (d, i) => i === nextIdx);
//         }

//         if (e.key === 'ArrowUp') {
//             e.preventDefault();
//             const prevIdx = Math.max(activeIdx - 1, 0);
//             items.classed('active', (d, i) => i === prevIdx);
//         }

//         if (e.key === 'Enter') {
//             e.preventDefault();
//             const selectedData = activeItem.datum();
//             if (selectedData && selectedData.onSelect) {
//                 selectedData.onSelect();
//                 close();
//             }
//         }
//     });
// }

// export function uninstallEvents() {
//     // Explicitly nullify the namespaced listeners
//     d3_select(window).on('keydown.kbar', null);
//     // If you want to be thorough, ensure the input listener is cleared too
//     // although usually the input is destroyed with the UI.
// }






//v2
// modules/ui/kbar/events.js
// Handles keyboard events and input handling for kbar

// import { select as d3_select } from 'd3-selection';
// import { filterActions } from './filter';
// import { renderResults } from './render';

// export function installEvents({ input, list, actions, close }) {
//   const d3_input = d3_select(input);

//   // Single source of truth for selection
//   let activeIndex = 0;
//   let currentActions = actions;

//   function updateActiveItem() {
//     list.selectAll('.kbar-item')
//       .classed('active', (d, i) => i === activeIndex);
//   }

//   // 1. Handle search input
//   d3_input.on('input.kbar', function () {
//     const query = this.value;
//     currentActions = filterActions(actions, query);

//     activeIndex = 0; // reset selection on new search
//     renderResults(list, currentActions, close);
//     updateActiveItem();
//   });

//   // 2. Handle keyboard navigation (only when input is focused)
//   d3_input.on('keydown.kbar', function (e) {
//     const maxIndex = currentActions.length - 1;

//     if (e.key === 'Escape') {
//       e.preventDefault();
//       close();
//       return;
//     }

//     if (e.key === 'ArrowDown') {
//       e.preventDefault();
//       activeIndex = Math.min(activeIndex + 1, maxIndex);
//       updateActiveItem();
//       return;
//     }

//     if (e.key === 'ArrowUp') {
//       e.preventDefault();
//       activeIndex = Math.max(activeIndex - 1, 0);
//       updateActiveItem();
//       return;
//     }

//     if (e.key === 'Enter') {
//       e.preventDefault();
//       const action = currentActions[activeIndex];
//       if (action && action.onSelect) {
//         action.onSelect();
//         close();
//       }
//     }
//   });
// }

// export function uninstallEvents() {
//   d3_select(window).on('.kbar', null);
// }



//v3


import { select as d3_select } from 'd3-selection';
import { filterActions } from './filter';
import { renderResults } from './render';

export function installEvents({ input, list, actions, close }) {
    // FIX: Unwrap and re-wrap to ensure we have a clean selection
    // If 'input' is a D3 selection, input.node() gets the DOM element.
    // If 'input' is a raw element, input.node() is undefined, so we use 'input' directly.
    const rawNode = input.node ? input.node() : input;
    const d3_input = d3_select(rawNode);

    let activeIndex = 0;   //index of currently active item
    let currentActions = actions;   //actions currently displayed (after filtering)

    function scrollIntoView(index) {
        const nodes = list.selectAll('.kbar-item').nodes();
        const itemNode = nodes[index];
        if (itemNode) {
            itemNode.scrollIntoView({ block: 'nearest' });
        }
    }

    function updateActiveItem() {
        list.selectAll('.kbar-item')
            .classed('active', (d, i) => i === activeIndex);

        scrollIntoView(activeIndex);
    }

    function reset(actionsToUse = actions) {
        currentActions = actionsToUse;
        activeIndex = 0;
        renderResults(list, currentActions, close);
        updateActiveItem();
    }

    // Initial render
    reset(actions);

    // 1. INPUT EVENT (For Filtering)
    d3_input.on('input.kbar', function () {
        const query = this.value.trim();
        const filtered = filterActions(actions, query);
        reset(filtered);
    });

    // 2. KEYDOWN EVENT (For Navigation)
    d3_input.on('keydown.kbar', function (e) {
        // Stop the map from moving when you press arrows
        e.stopPropagation();

        if (!currentActions.length) {
            // Allow closing even if empty
            if (e.key === 'Escape') {
                e.preventDefault();
                close('escape');
            }
            return;
        }

        const maxIndex = currentActions.length - 1;

        switch (e.key) {
            case 'Escape':
                e.preventDefault();
                close('escape');
                break;

            case 'ArrowDown':
                e.preventDefault();
                activeIndex = (activeIndex >= maxIndex) ? 0 : activeIndex + 1;
                updateActiveItem();
                break;

            case 'ArrowUp':
                e.preventDefault();
                activeIndex = (activeIndex <= 0) ? maxIndex : activeIndex - 1;
                updateActiveItem();
                break;

            case 'Enter':
                { e.preventDefault();
                const action = currentActions[activeIndex];
                if (action && action.onSelect) {
                    action.onSelect();
                    close('select');
                }
                break; }
        }
    });
}

export function uninstallEvents() {
    // no-op
}
