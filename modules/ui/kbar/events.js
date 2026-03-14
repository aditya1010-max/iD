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
