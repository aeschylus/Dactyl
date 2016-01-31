import { createStore } from 'redux';
import { manifestor } from './manifestor';
import './gamepad';

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your project.
 */
function counter(state = 0, action) {
    switch (action.type) {
    case 'INCREMENT':
        return state + 1
    case 'DECREMENT':
        return state - 1
    default:
        return state
    }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(counter)

// You can subscribe to the updates manually, or use bindings to your view layer.
store.subscribe(() =>
                console.log(store.getState())
               );

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: 'INCREMENT' })
// 1
store.dispatch({ type: 'INCREMENT' })
// 2
store.dispatch({ type: 'DECREMENT' })
// 1

var manifestUrl = 'https://iiif.archivelab.org/iiif/L146NAeschylusIIOresteiaAgamemnonEumenides/manifest.json';
    window.fetch(manifestUrl, {method: 'get'})
        .then((res) => {return res.json();})
        .then((manifest) => {
            console.log(manifest);
            var dactyl = manifestor({
                manifest: manifest,
                container: document.getElementById('#example-container'),
                perspective:  'overview',
                canvasClass: 'canvas', //default set to 'canvas'
                frameClass: 'frame', //default set to 'frame'
                labelClass: 'label', //default set to 'label'
                viewportPadding: {  // in detail view, make sure this area is clear
                    top: 0,
                    left: 10,
                    right: 10,
                    bottom: 10 // units in % of pixel height of viewport
                },
                stateUpdateCallback: function() {
                }
                // selectedCanvas: manifest.sequences[0].canvases[50]['@id']
            });
        });

