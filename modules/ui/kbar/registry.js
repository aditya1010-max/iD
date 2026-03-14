import {
  modeAddPoint,
  modeAddLine,
  modeAddArea,
  modeBrowse
} from '../../modes';

import { presetManager } from '../../presets';
import { t } from '../../core/localizer';

export function kbarRegistry(context) {
    return function() {
        const actions = [];
        // const l10n = context.systems.l10n;

        // console.log('modeAddPoint:', modeAddPoint);
        // 1. EDITING MODES
        actions.push(
        {
            id: 'add-point',
            title: () => {
            const l10n = context.systems && context.systems.l10n;
            return l10n ? l10n.t('modes.add_point.title') : 'add pointttt';
            },
            onSelect: () => context.enter(
            modeAddPoint(context, { preset: presetManager.item('point') })
            )
        },
        {
            id: 'add-line',
            title: () => {
                const l10n = context.systems && context.systems.l10n;
                return l10n ? l10n.t('modes.add_line.title') : 'add line';
            },
            onSelect: () => context.enter(
            modeAddLine(context, { preset: presetManager.item('line') })
            )
        },
        {
            id: 'add-area',
            title: () => {
                const l10n = context.systems && context.systems.l10n;
                return l10n ? l10n.t('modes.add_area.title') : 'add area';
            },
            onSelect: () => context.enter(
            modeAddArea(context, { preset: presetManager.item('area') })
            )
        }
        );

        // 2. CORE OPERATIONS (Undo/Redo/Save)
        actions.push(
            {
                id: 'undo',
                title: () => {
                    const l10n = context.systems && context.systems.l10n;
                    return l10n ? l10n.t('undo.title') : 'Undo';
                },

                icon: 'iD-icon-undo',
                onSelect: () => context.undo()
            },
            {
                id: 'redo',
                title: () => {
                    const l10n = context.systems && context.systems.l10n;
                    return l10n ? l10n.t('redo.title') : 'Redo';
                },
                icon: 'iD-icon-redo',
                onSelect: () => context.redo()
            },
            {
                id: 'save',
                title: () => {
                    const l10n = context.systems && context.systems.l10n;
                    return l10n ? l10n.t('save.title') : 'Save';
                },
                icon: 'iD-icon-save',
                onSelect: () => context.save()
            }
        );

        // 3. CONTEXTUAL ACTIONS (Only show when something is selected)
        const selectedIDs = context.selectedIDs();
        if (selectedIDs.length > 0) {
            // Deselect
            actions.push({
                id: 'clear-selection',
                title: t('inspector.selection'),
                icon: 'iD-icon-close',
                onSelect: () => context.enter(modeBrowse(context))
            });

            // Delete (Check validity)
            if (context.mode().id === 'select') {
                 // You can add delete logic here if needed later
            }
        }

        return actions;
    };
}


//import {
//   modeAddPoint,
//   modeAddLine,
//   modeAddArea,
//   modeBrowse
// } from '../../modes';

//this file imports mode factory functions in iD.
//modeAddPoint(context, options) → returns a mode object - Same for line, area, browse
// You don’t “switch modes directly”.
// You create a mode, then context.enter(mode). This allows modes to have setup and teardown logic, and also allows you to pass options (like presets) when creating the mode.


//import { presetManager } from '../../presets';
//presetManager.item('point') → returns the preset definition for a point. Same for line and area. This is used when creating the mode to ensure the correct preset is active when you start drawing.

