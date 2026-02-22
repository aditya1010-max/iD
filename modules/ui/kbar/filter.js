// this file would contain code for search logic


// export function filterActions(actions, query) {
//   const q = query.toLowerCase();
//   return actions.filter(action =>
//     action.title.toLowerCase().includes(q)
//   );
// }


//v2



export function filterActions(actions, query) {
    if (!query) return actions;

    // 1. Prepare terms: "Add Line" -> ["add", "line"]
    const terms = query.toLowerCase().trim().split(/\s+/);

    return actions.filter(action => {
        const text = action.title().toLowerCase();

        // 2. The Match Logic:
        // Every word typed must appear SOMEWHERE in the title.
        // This allows "point add" to match "Add Point"
        return terms.every(term => text.includes(term));
    });
}
