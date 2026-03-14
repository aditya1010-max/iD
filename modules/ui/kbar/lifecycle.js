// this file would contain the code for OPEN / CLOSE / CLEANUP of kbar

export function createCloser({ overlay, context, onClose }) {
  return function close(reason) {
    // Hide instead of destroy
    overlay.classed('hidden', true);

    // Return focus to the map
    context.surface().node().focus();

    if (onClose) onClose(reason);
  };
}

// This is a factory function that creates a closer function for the kbar. The closer function hides the overlay and returns focus to the map. It also accepts an optional onClose callback that can be executed with a reason for closing.


// the parameters { overlay, context, onClose }
// this is called object destructuring in JavaScript. It allows you to extract specific properties from an object and assign them to variables. In this case, the function createCloser expects an object with properties overlay, context, and onClose, and it directly extracts those properties for use within the function.

//callers can pass objects like this:

// createCloser({
//   overlay: d3.select('#kbar-overlay'),
//   context: kbarContext,
//   onClose: (reason) => console.log('Kbar closed due to:', reason),
// });

// what each one represents
// Overlay-
// The overlay is the DOM element that represents the kbar interface. It is typically a div or similar element that contains the kbar UI components. In this context, it is likely a D3 selection of the overlay element.

// Context-
// The context is an object that provides access to the map's surface and other relevant information. It allows the closer function to interact with the map, such as returning focus to the map after closing the kbar.

// onClose-
// The onClose is an optional callback function that can be executed when the kbar is closed. It can be used to perform additional actions or cleanup when the kbar is closed, and it receives a reason for closing as an argument.


// The returned function- close(reason) is the actual function that will be called to close the kbar. It takes a reason parameter that can be used to specify why the kbar is being closed, which can be useful for logging or conditional behavior in the onClose callback.
// it can be called from anywhere(button, keybonding, esc key)
// example:
// close('escape');
// close('click');
// close('submit');


//"hide instead of destroy"
// overlay.classed('hidden', true);
// This line adds a 'hidden' class to the overlay element
//vidually hides the overlay
// does not remove it from the DOM.

// for faster reopenning, keeps internal state, avoid rerendering
// This is performance + UX decison.


//returning focus to the map
// context.surface().node().focus();
// context.surface() gets the map surface selection
// .node() gets the actual DOM element
// .focus() gives keyboard focus back to the map


// optional callback execution
// if (onClose) onClose(reason);
// this says: if the caller provided an onClose function -> call it and pass the reason
// Why this is nice design:
//-> createCloser dosent care what happens nect
//-> parent code can: log analytics, reset state and branch behaviour based on reason
