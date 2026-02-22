import { select as d3_select } from 'd3-selection';
import { svgIcon } from '../../svg/icon';

export function renderResults(list, actions, close) {
    // 1. Clean slate: remove old results efficiently
    list.html('');

    if (actions.length === 0) {
        list.append('li')
            .attr('class', 'kbar-empty')
            .text('No results found');
        return;
    }

    // 2. Create List Items
    const items = list.selectAll('li')
        .data(actions)
        .enter()
        .append('li')
        .attr('class', 'kbar-item');

    // 3. Create Interactive Buttons
    const buttons = items.append('button')
        .attr('class', 'kbar-button')
        .on('click', (e, d) => {
            e.stopPropagation(); // Prevent clicks from closing the modal immediately
            d.onSelect();
            close();
        });

    // 4. Append Icon (Left)
    // We use .each so we can check if each specific action has an icon
    buttons.each(function(d) {
        const btn = d3_select(this);
        if (d.icon) {
            // standard iD helper: (selection, '#icon-id', 'css-class')
            btn.call(svgIcon, `#${d.icon}`, 'kbar-icon');
        }
    });

    // 5. Append Title (Center)
    buttons.append('span')
        .attr('class', 'kbar-title')
        .text(d => typeof d.title === 'function' ? d.title() : d.title);

    // 6. Append Shortcut Hint (Right) - Optional
    // If your registry objects ever have a 'key' property (e.g. "Shift+S"), it will show here.
    buttons.filter(d => d.key)
        .append('span')
        .attr('class', 'kbar-key')
        .text(d => d.key);
}
