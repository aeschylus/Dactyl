/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _redux = __webpack_require__(1);

	var _manifestor = __webpack_require__(11);

	__webpack_require__(12);

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
	function counter() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	        case 'INCREMENT':
	            return state + 1;
	        case 'DECREMENT':
	            return state - 1;
	        default:
	            return state;
	    }
	}

	// Create a Redux store holding the state of your app.
	// Its API is { subscribe, dispatch, getState }.
	var store = (0, _redux.createStore)(counter);

	// You can subscribe to the updates manually, or use bindings to your view layer.
	store.subscribe(function () {
	    return console.log(store.getState());
	});

	// The only way to mutate the internal state is to dispatch an action.
	// The actions can be serialized, logged or stored and later replayed.
	store.dispatch({ type: 'INCREMENT' });
	// 1
	store.dispatch({ type: 'INCREMENT' });
	// 2
	store.dispatch({ type: 'DECREMENT' });
	// 1

	var manifestUrl = 'https://iiif.archivelab.org/iiif/L146NAeschylusIIOresteiaAgamemnonEumenides/manifest.json';
	window.fetch(manifestUrl, { method: 'get' }).then(function (res) {
	    return res.json();
	}).then(function (manifest) {
	    console.log(manifest);
	    var dactyl = (0, _manifestor.manifestor)({
	        manifest: manifest,
	        container: document.getElementById('#example-container'),
	        perspective: 'overview',
	        canvasClass: 'canvas', //default set to 'canvas'
	        frameClass: 'frame', //default set to 'frame'
	        labelClass: 'label', //default set to 'label'
	        viewportPadding: { // in detail view, make sure this area is clear
	            top: 0,
	            left: 10,
	            right: 10,
	            bottom: 10 // units in % of pixel height of viewport
	        },
	        stateUpdateCallback: function stateUpdateCallback() {}
	        // selectedCanvas: manifest.sequences[0].canvases[50]['@id']
	    });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createStore = __webpack_require__(2);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _utilsCombineReducers = __webpack_require__(4);

	var _utilsCombineReducers2 = _interopRequireDefault(_utilsCombineReducers);

	var _utilsBindActionCreators = __webpack_require__(8);

	var _utilsBindActionCreators2 = _interopRequireDefault(_utilsBindActionCreators);

	var _utilsApplyMiddleware = __webpack_require__(9);

	var _utilsApplyMiddleware2 = _interopRequireDefault(_utilsApplyMiddleware);

	var _utilsCompose = __webpack_require__(10);

	var _utilsCompose2 = _interopRequireDefault(_utilsCompose);

	exports.createStore = _createStore2['default'];
	exports.combineReducers = _utilsCombineReducers2['default'];
	exports.bindActionCreators = _utilsBindActionCreators2['default'];
	exports.applyMiddleware = _utilsApplyMiddleware2['default'];
	exports.compose = _utilsCompose2['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = createStore;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsIsPlainObject = __webpack_require__(3);

	var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = {
	  INIT: '@@redux/INIT'
	};

	exports.ActionTypes = ActionTypes;
	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [initialState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */

	function createStore(reducer, initialState) {
	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }

	  var currentReducer = reducer;
	  var currentState = initialState;
	  var listeners = [];
	  var isDispatching = false;

	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
	  function getState() {
	    return currentState;
	  }

	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    listeners.push(listener);
	    var isSubscribed = true;

	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }

	      isSubscribed = false;
	      var index = listeners.indexOf(listener);
	      listeners.splice(index, 1);
	    };
	  }

	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
	  function dispatch(action) {
	    if (!_utilsIsPlainObject2['default'](action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }

	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }

	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }

	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }

	    listeners.slice().forEach(function (listener) {
	      return listener();
	    });
	    return action;
	  }

	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
	  function replaceReducer(nextReducer) {
	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.INIT });
	  }

	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });

	  return {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  };
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = isPlainObject;
	var fnToString = function fnToString(fn) {
	  return Function.prototype.toString.call(fn);
	};
	var objStringValue = fnToString(Object);

	/**
	 * @param {any} obj The object to inspect.
	 * @returns {boolean} True if the argument appears to be a plain object.
	 */

	function isPlainObject(obj) {
	  if (!obj || typeof obj !== 'object') {
	    return false;
	  }

	  var proto = typeof obj.constructor === 'function' ? Object.getPrototypeOf(obj) : Object.prototype;

	  if (proto === null) {
	    return true;
	  }

	  var constructor = proto.constructor;

	  return typeof constructor === 'function' && constructor instanceof constructor && fnToString(constructor) === objStringValue;
	}

	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports['default'] = combineReducers;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createStore = __webpack_require__(2);

	var _isPlainObject = __webpack_require__(3);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _mapValues = __webpack_require__(6);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	var _pick = __webpack_require__(7);

	var _pick2 = _interopRequireDefault(_pick);

	/* eslint-disable no-console */

	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

	  return 'Reducer "' + key + '" returned undefined handling ' + actionName + '. ' + 'To ignore an action, you must explicitly return the previous state.';
	}

	function getUnexpectedStateKeyWarningMessage(inputState, outputState, action) {
	  var reducerKeys = Object.keys(outputState);
	  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';

	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }

	  if (!_isPlainObject2['default'](inputState)) {
	    return 'The ' + argumentName + ' has unexpected type of "' + ({}).toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
	  }

	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return reducerKeys.indexOf(key) < 0;
	  });

	  if (unexpectedKeys.length > 0) {
	    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
	  }
	}

	function assertReducerSanity(reducers) {
	  Object.keys(reducers).forEach(function (key) {
	    var reducer = reducers[key];
	    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

	    if (typeof initialState === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
	    }

	    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
	    if (typeof reducer(undefined, { type: type }) === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
	    }
	  });
	}

	/**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */

	function combineReducers(reducers) {
	  var finalReducers = _pick2['default'](reducers, function (val) {
	    return typeof val === 'function';
	  });
	  var sanityError;

	  try {
	    assertReducerSanity(finalReducers);
	  } catch (e) {
	    sanityError = e;
	  }

	  var defaultState = _mapValues2['default'](finalReducers, function () {
	    return undefined;
	  });

	  return function combination(state, action) {
	    if (state === undefined) state = defaultState;

	    if (sanityError) {
	      throw sanityError;
	    }

	    var hasChanged = false;
	    var finalState = _mapValues2['default'](finalReducers, function (reducer, key) {
	      var previousStateForKey = state[key];
	      var nextStateForKey = reducer(previousStateForKey, action);
	      if (typeof nextStateForKey === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(key, action);
	        throw new Error(errorMessage);
	      }
	      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	      return nextStateForKey;
	    });

	    if (process.env.NODE_ENV !== 'production') {
	      var warningMessage = getUnexpectedStateKeyWarningMessage(state, finalState, action);
	      if (warningMessage) {
	        console.error(warningMessage);
	      }
	    }

	    return hasChanged ? finalState : state;
	  };
	}

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },
/* 5 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * Applies a function to every key-value pair inside an object.
	 *
	 * @param {Object} obj The source object.
	 * @param {Function} fn The mapper function that receives the value and the key.
	 * @returns {Object} A new object that contains the mapped values for the keys.
	 */
	"use strict";

	exports.__esModule = true;
	exports["default"] = mapValues;

	function mapValues(obj, fn) {
	  return Object.keys(obj).reduce(function (result, key) {
	    result[key] = fn(obj[key], key);
	    return result;
	  }, {});
	}

	module.exports = exports["default"];

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Picks key-value pairs from an object where values satisfy a predicate.
	 *
	 * @param {Object} obj The object to pick from.
	 * @param {Function} fn The predicate the values must satisfy to be copied.
	 * @returns {Object} The object with the values that satisfied the predicate.
	 */
	"use strict";

	exports.__esModule = true;
	exports["default"] = pick;

	function pick(obj, fn) {
	  return Object.keys(obj).reduce(function (result, key) {
	    if (fn(obj[key])) {
	      result[key] = obj[key];
	    }
	    return result;
	  }, {});
	}

	module.exports = exports["default"];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = bindActionCreators;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mapValues = __webpack_require__(6);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}

	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */

	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }

	  if (typeof actionCreators !== 'object' || actionCreators === null || actionCreators === undefined) {
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }

	  return _mapValues2['default'](actionCreators, function (actionCreator) {
	    return bindActionCreator(actionCreator, dispatch);
	  });
	}

	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = applyMiddleware;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _compose = __webpack_require__(10);

	var _compose2 = _interopRequireDefault(_compose);

	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */

	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  return function (next) {
	    return function (reducer, initialState) {
	      var store = next(reducer, initialState);
	      var _dispatch = store.dispatch;
	      var chain = [];

	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch(action) {
	          return _dispatch(action);
	        }
	      };
	      chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);

	      return _extends({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Composes single-argument functions from right to left.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing functions from right to
	 * left. For example, compose(f, g, h) is identical to arg => f(g(h(arg))).
	 */
	"use strict";

	exports.__esModule = true;
	exports["default"] = compose;

	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  return function (arg) {
	    return funcs.reduceRight(function (composed, f) {
	      return f(composed);
	    }, arg);
	  };
	}

	module.exports = exports["default"];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/*
	 iiifManifestLayout
	 version: 0.0.10
	 https://github.com/sul-dlss/iiifManifestLayouts
	 Browserified module compilation
	*/

	!function (a) {
	  if ("object" == ( false ? "undefined" : _typeof(exports)) && "undefined" != typeof module) module.exports = a();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (a), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {
	    var b;b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, b.manifestor = a();
	  }
	}(function () {
	  var a;return function b(a, c, d) {
	    function e(g, h) {
	      if (!c[g]) {
	        if (!a[g]) {
	          var i = "function" == typeof require && require;if (!h && i) return require(g, !0);if (f) return f(g, !0);var j = new Error("Cannot find module '" + g + "'");throw j.code = "MODULE_NOT_FOUND", j;
	        }var k = c[g] = { exports: {} };a[g][0].call(k.exports, function (b) {
	          var c = a[g][1][b];return e(c ? c : b);
	        }, k, k.exports, b, a, c, d);
	      }return c[g].exports;
	    }for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) {
	      e(d[g]);
	    }return e;
	  }({ 1: [function (a, b, c) {
	      "use strict";
	      var d = function d(a) {
	        return a;
	      };b.exports = d;
	    }, {}], 2: [function (a, b, c) {
	      "use strict";
	      var d = { getFirst: function getFirst(a) {
	          return a[0]["@id"];
	        }, getImageUrl: function getImageUrl(a) {
	          if (!a.images[0].resource.service) return b = a.images[0].resource["default"].service["@id"], b = b.replace(/\/$/, "");var b = a.images[0].resource.service["@id"];return b = b.replace(/\/$/, "");
	        }, getVersionFromContext: function getVersionFromContext(a) {
	          return "http://iiif.io/api/image/2/context.json" == a ? "2.0" : "1.1";
	        }, makeUriWithWidth: function makeUriWithWidth(a, b, c) {
	          return a = a.replace(/\/$/, ""), "1" == c[0] ? a + "/full/" + b + ",/0/native.jpg" : a + "/full/" + b + ",/0/default.jpg";
	        }, getThumbnailForCanvas: function getThumbnailForCanvas(a, b) {
	          var c,
	              d,
	              e = "1.1";if (b.forEach(function (a) {
	            parseInt(a, 10);
	          }), a.hasOwnProperty("thumbnail")) "string" == typeof a.thumbnail ? d = a.thumbnail : a.thumbnail.hasOwnProperty("service") ? (c = a.thumbnail.service, c.hasOwnProperty("@context") && (e = this.getVersionFromContext(c["@context"])), d = this.makeUriWithWidth(c["@id"], width, e)) : d = a.thumbnail["@id"];else {
	            var f = a.images[0].resource;c = f["default"] ? f["default"].service : f.service, c.hasOwnProperty("@context") && (e = this.iiif.getVersionFromContext(c["@context"])), d = this.iiif.makeUriWithWidth(c["@id"], width, e);
	          }return d;
	        } };b.exports = d;
	    }, {}], 3: [function (b, c, d) {
	      !function () {
	        function b(a) {
	          return a && (a.ownerDocument || a.document || a).documentElement;
	        }function d(a) {
	          return a && (a.ownerDocument && a.ownerDocument.defaultView || a.document && a || a.defaultView);
	        }function e(a, b) {
	          if (b in a) return b;b = b.charAt(0).toUpperCase() + b.slice(1);for (var c = 0, d = Ua.length; d > c; ++c) {
	            var e = Ua[c] + b;if (e in a) return e;
	          }
	        }function f(a) {
	          return Ta(a, Ya), a;
	        }function g(a) {
	          return "function" == typeof a ? a : function () {
	            return Va(a, this);
	          };
	        }function h(a) {
	          return "function" == typeof a ? a : function () {
	            return Wa(a, this);
	          };
	        }function i(a, b) {
	          function c() {
	            this.removeAttribute(a);
	          }function d() {
	            this.removeAttributeNS(a.space, a.local);
	          }function e() {
	            this.setAttribute(a, b);
	          }function f() {
	            this.setAttributeNS(a.space, a.local, b);
	          }function g() {
	            var c = b.apply(this, arguments);null == c ? this.removeAttribute(a) : this.setAttribute(a, c);
	          }function h() {
	            var c = b.apply(this, arguments);null == c ? this.removeAttributeNS(a.space, a.local) : this.setAttributeNS(a.space, a.local, c);
	          }return a = Pa.ns.qualify(a), null == b ? a.local ? d : c : "function" == typeof b ? a.local ? h : g : a.local ? f : e;
	        }function j(a) {
	          return a.trim().replace(/\s+/g, " ");
	        }function k(a) {
	          return new RegExp("(?:^|\\s+)" + Pa.requote(a) + "(?:\\s+|$)", "g");
	        }function l(a) {
	          return (a + "").trim().split(/^|\s+/);
	        }function m(a, b) {
	          function c() {
	            for (var c = -1; ++c < e;) {
	              a[c](this, b);
	            }
	          }function d() {
	            for (var c = -1, d = b.apply(this, arguments); ++c < e;) {
	              a[c](this, d);
	            }
	          }a = l(a).map(n);var e = a.length;return "function" == typeof b ? d : c;
	        }function n(a) {
	          var b = k(a);return function (c, d) {
	            if (e = c.classList) return d ? e.add(a) : e.remove(a);var e = c.getAttribute("class") || "";d ? (b.lastIndex = 0, b.test(e) || c.setAttribute("class", j(e + " " + a))) : c.setAttribute("class", j(e.replace(b, " ")));
	          };
	        }function o(a, b, c) {
	          function d() {
	            this.style.removeProperty(a);
	          }function e() {
	            this.style.setProperty(a, b, c);
	          }function f() {
	            var d = b.apply(this, arguments);null == d ? this.style.removeProperty(a) : this.style.setProperty(a, d, c);
	          }return null == b ? d : "function" == typeof b ? f : e;
	        }function p(a, b) {
	          function c() {
	            delete this[a];
	          }function d() {
	            this[a] = b;
	          }function e() {
	            var c = b.apply(this, arguments);null == c ? delete this[a] : this[a] = c;
	          }return null == b ? c : "function" == typeof b ? e : d;
	        }function q(a) {
	          function b() {
	            var b = this.ownerDocument,
	                c = this.namespaceURI;return c ? b.createElementNS(c, a) : b.createElement(a);
	          }function c() {
	            return this.ownerDocument.createElementNS(a.space, a.local);
	          }return "function" == typeof a ? a : (a = Pa.ns.qualify(a)).local ? c : b;
	        }function r() {
	          var a = this.parentNode;a && a.removeChild(this);
	        }function s(a, b) {
	          for (var c in b) {
	            Object.defineProperty(a.prototype, c, { value: b[c], enumerable: !1 });
	          }
	        }function t() {
	          this._ = Object.create(null);
	        }function u(a) {
	          return (a += "") === _a || a[0] === ab ? ab + a : a;
	        }function v(a) {
	          return (a += "")[0] === ab ? a.slice(1) : a;
	        }function w(a) {
	          return u(a) in this._;
	        }function x(a) {
	          return (a = u(a)) in this._ && delete this._[a];
	        }function y() {
	          var a = [];for (var b in this._) {
	            a.push(v(b));
	          }return a;
	        }function z() {
	          var a = 0;for (var b in this._) {
	            ++a;
	          }return a;
	        }function A() {
	          for (var a in this._) {
	            return !1;
	          }return !0;
	        }function B() {
	          this._ = Object.create(null);
	        }function C(a) {
	          return { __data__: a };
	        }function D(a) {
	          return function () {
	            return _Xa(this, a);
	          };
	        }function E(a, b) {
	          return b > a ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
	        }function F(a) {
	          return arguments.length || (a = E), function (b, c) {
	            return b && c ? a(b.__data__, c.__data__) : !b - !c;
	          };
	        }function G() {}function H() {}function I(a) {
	          function b() {
	            for (var b, d = c, e = -1, f = d.length; ++e < f;) {
	              (b = d[e].on) && b.apply(this, arguments);
	            }return a;
	          }var c = [],
	              d = new t();return b.on = function (b, e) {
	            var f,
	                g = d.get(b);return arguments.length < 2 ? g && g.on : (g && (g.on = null, c = c.slice(0, f = c.indexOf(g)).concat(c.slice(f + 1)), d.remove(b)), e && c.push(d.set(b, { on: e })), a);
	          }, b;
	        }function J(a, b, c) {
	          function d() {
	            var b = this[g];b && (this.removeEventListener(a, b, b.$), delete this[g]);
	          }function e() {
	            var e = i(b, Ra(arguments));d.call(this), this.addEventListener(a, this[g] = e, e.$ = c), e._ = b;
	          }function f() {
	            var b,
	                c = new RegExp("^__on([^.]+)" + Pa.requote(a) + "$");for (var d in this) {
	              if (b = d.match(c)) {
	                var e = this[d];this.removeEventListener(b[1], e, e.$), delete this[d];
	              }
	            }
	          }var g = "__on" + a,
	              h = a.indexOf("."),
	              i = K;h > 0 && (a = a.slice(0, h));var j = bb.get(a);return j && (a = j, i = L), h ? b ? e : d : b ? G : f;
	        }function K(a, b) {
	          return function (c) {
	            var d = Pa.event;Pa.event = c, b[0] = this.__data__;try {
	              a.apply(this, b);
	            } finally {
	              Pa.event = d;
	            }
	          };
	        }function L(a, b) {
	          var c = K(a, b);return function (a) {
	            var b = this,
	                d = a.relatedTarget;d && (d === b || 8 & d.compareDocumentPosition(b)) || c.call(b, a);
	          };
	        }function M(a, b) {
	          for (var c = 0, d = a.length; d > c; c++) {
	            for (var e, f = a[c], g = 0, h = f.length; h > g; g++) {
	              (e = f[g]) && b(e, g, c);
	            }
	          }return a;
	        }function N(a) {
	          return Ta(a, cb), a;
	        }function O(a) {
	          var b, c;return function (d, e, f) {
	            var g,
	                h = a[f].update,
	                i = h.length;for (f != c && (c = f, b = 0), e >= b && (b = e + 1); !(g = h[b]) && ++b < i;) {}return g;
	          };
	        }function P() {
	          return !0;
	        }function Q() {
	          var a = R(),
	              b = S() - a;b > 24 ? (isFinite(b) && (clearTimeout(gb), gb = setTimeout(Q, b)), fb = 0) : (fb = 1, ib(Q));
	        }function R() {
	          var a = Date.now();for (hb = db; hb;) {
	            a >= hb.t && (hb.f = hb.c(a - hb.t)), hb = hb.n;
	          }return a;
	        }function S() {
	          for (var a, b = db, c = 1 / 0; b;) {
	            b.f ? b = a ? a.n = b.n : db = b.n : (b.t < c && (c = b.t), b = (a = b).n);
	          }return eb = a, c;
	        }function T(a) {
	          return function () {
	            var b, c;(b = this[a]) && (c = b[b.active]) && (--b.count ? delete b[b.active] : delete this[a], b.active += .5, c.event && c.event.interrupt.call(this, this.__data__, c.index));
	          };
	        }function U(a, b, c) {
	          return Ta(a, mb), a.namespace = b, a.id = c, a;
	        }function V() {}function W(a, b, c) {
	          return this instanceof W ? (this.h = +a, this.s = +b, void (this.l = +c)) : arguments.length < 2 ? a instanceof W ? new W(a.h, a.s, a.l) : ha("" + a, ia, W) : new W(a, b, c);
	        }function X(a, b, c) {
	          function d(a) {
	            return a > 360 ? a -= 360 : 0 > a && (a += 360), 60 > a ? f + (g - f) * a / 60 : 180 > a ? g : 240 > a ? f + (g - f) * (240 - a) / 60 : f;
	          }function e(a) {
	            return Math.round(255 * d(a));
	          }var f, g;return a = isNaN(a) ? 0 : (a %= 360) < 0 ? a + 360 : a, b = isNaN(b) ? 0 : 0 > b ? 0 : b > 1 ? 1 : b, c = 0 > c ? 0 : c > 1 ? 1 : c, g = .5 >= c ? c * (1 + b) : c + b - c * b, f = 2 * c - g, new ea(e(a + 120), e(a), e(a - 120));
	        }function Y(a, b, c) {
	          return this instanceof Y ? (this.h = +a, this.c = +b, void (this.l = +c)) : arguments.length < 2 ? a instanceof Y ? new Y(a.h, a.c, a.l) : a instanceof $ ? aa(a.l, a.a, a.b) : aa((a = ja((a = Pa.rgb(a)).r, a.g, a.b)).l, a.a, a.b) : new Y(a, b, c);
	        }function Z(a, b, c) {
	          return isNaN(a) && (a = 0), isNaN(b) && (b = 0), new $(c, Math.cos(a *= sb) * b, Math.sin(a) * b);
	        }function $(a, b, c) {
	          return this instanceof $ ? (this.l = +a, this.a = +b, void (this.b = +c)) : arguments.length < 2 ? a instanceof $ ? new $(a.l, a.a, a.b) : a instanceof Y ? Z(a.h, a.c, a.l) : ja((a = ea(a)).r, a.g, a.b) : new $(a, b, c);
	        }function _(a, b, c) {
	          var d = (a + 16) / 116,
	              e = d + b / 500,
	              f = d - c / 200;return e = ba(e) * wb, d = ba(d) * xb, f = ba(f) * yb, new ea(da(3.2404542 * e - 1.5371385 * d - .4985314 * f), da(-.969266 * e + 1.8760108 * d + .041556 * f), da(.0556434 * e - .2040259 * d + 1.0572252 * f));
	        }function aa(a, b, c) {
	          return a > 0 ? new Y(Math.atan2(c, b) * tb, Math.sqrt(b * b + c * c), a) : new Y(NaN, NaN, a);
	        }function ba(a) {
	          return a > .206893034 ? a * a * a : (a - 4 / 29) / 7.787037;
	        }function ca(a) {
	          return a > .008856 ? Math.pow(a, 1 / 3) : 7.787037 * a + 4 / 29;
	        }function da(a) {
	          return Math.round(255 * (.00304 >= a ? 12.92 * a : 1.055 * Math.pow(a, 1 / 2.4) - .055));
	        }function ea(a, b, c) {
	          return this instanceof ea ? (this.r = ~ ~a, this.g = ~ ~b, void (this.b = ~ ~c)) : arguments.length < 2 ? a instanceof ea ? new ea(a.r, a.g, a.b) : ha("" + a, ea, X) : new ea(a, b, c);
	        }function fa(a) {
	          return new ea(a >> 16, a >> 8 & 255, 255 & a);
	        }function ga(a) {
	          return 16 > a ? "0" + Math.max(0, a).toString(16) : Math.min(255, a).toString(16);
	        }function ha(a, b, c) {
	          var d,
	              e,
	              f,
	              g = 0,
	              h = 0,
	              i = 0;if (d = /([a-z]+)\((.*)\)/.exec(a = a.toLowerCase())) switch (e = d[2].split(","), d[1]) {case "hsl":
	              return c(parseFloat(e[0]), parseFloat(e[1]) / 100, parseFloat(e[2]) / 100);case "rgb":
	              return b(la(e[0]), la(e[1]), la(e[2]));}return (f = Bb.get(a)) ? b(f.r, f.g, f.b) : (null == a || "#" !== a.charAt(0) || isNaN(f = parseInt(a.slice(1), 16)) || (4 === a.length ? (g = (3840 & f) >> 4, g = g >> 4 | g, h = 240 & f, h = h >> 4 | h, i = 15 & f, i = i << 4 | i) : 7 === a.length && (g = (16711680 & f) >> 16, h = (65280 & f) >> 8, i = 255 & f)), b(g, h, i));
	        }function ia(a, b, c) {
	          var d,
	              e,
	              f = Math.min(a /= 255, b /= 255, c /= 255),
	              g = Math.max(a, b, c),
	              h = g - f,
	              i = (g + f) / 2;return h ? (e = .5 > i ? h / (g + f) : h / (2 - g - f), d = a == g ? (b - c) / h + (c > b ? 6 : 0) : b == g ? (c - a) / h + 2 : (a - b) / h + 4, d *= 60) : (d = NaN, e = i > 0 && 1 > i ? 0 : d), new W(d, e, i);
	        }function ja(a, b, c) {
	          a = ka(a), b = ka(b), c = ka(c);var d = ca((.4124564 * a + .3575761 * b + .1804375 * c) / wb),
	              e = ca((.2126729 * a + .7151522 * b + .072175 * c) / xb),
	              f = ca((.0193339 * a + .119192 * b + .9503041 * c) / yb);return $(116 * e - 16, 500 * (d - e), 200 * (e - f));
	        }function ka(a) {
	          return (a /= 255) <= .04045 ? a / 12.92 : Math.pow((a + .055) / 1.055, 2.4);
	        }function la(a) {
	          var b = parseFloat(a);return "%" === a.charAt(a.length - 1) ? Math.round(2.55 * b) : b;
	        }function ma(a, b) {
	          a = Pa.rgb(a), b = Pa.rgb(b);var c = a.r,
	              d = a.g,
	              e = a.b,
	              f = b.r - c,
	              g = b.g - d,
	              h = b.b - e;return function (a) {
	            return "#" + ga(Math.round(c + f * a)) + ga(Math.round(d + g * a)) + ga(Math.round(e + h * a));
	          };
	        }function na(a, b) {
	          var c,
	              d = {},
	              e = {};for (c in a) {
	            c in b ? d[c] = ra(a[c], b[c]) : e[c] = a[c];
	          }for (c in b) {
	            c in a || (e[c] = b[c]);
	          }return function (a) {
	            for (c in d) {
	              e[c] = d[c](a);
	            }return e;
	          };
	        }function oa(a, b) {
	          var c,
	              d = [],
	              e = [],
	              f = a.length,
	              g = b.length,
	              h = Math.min(a.length, b.length);for (c = 0; h > c; ++c) {
	            d.push(ra(a[c], b[c]));
	          }for (; f > c; ++c) {
	            e[c] = a[c];
	          }for (; g > c; ++c) {
	            e[c] = b[c];
	          }return function (a) {
	            for (c = 0; h > c; ++c) {
	              e[c] = d[c](a);
	            }return e;
	          };
	        }function pa(a, b) {
	          return a = +a, b = +b, function (c) {
	            return a * (1 - c) + b * c;
	          };
	        }function qa(a, b) {
	          var c,
	              d,
	              e,
	              f = Cb.lastIndex = Db.lastIndex = 0,
	              g = -1,
	              h = [],
	              i = [];for (a += "", b += ""; (c = Cb.exec(a)) && (d = Db.exec(b));) {
	            (e = d.index) > f && (e = b.slice(f, e), h[g] ? h[g] += e : h[++g] = e), (c = c[0]) === (d = d[0]) ? h[g] ? h[g] += d : h[++g] = d : (h[++g] = null, i.push({ i: g, x: pa(c, d) })), f = Db.lastIndex;
	          }return f < b.length && (e = b.slice(f), h[g] ? h[g] += e : h[++g] = e), h.length < 2 ? i[0] ? (b = i[0].x, function (a) {
	            return b(a) + "";
	          }) : function () {
	            return b;
	          } : (b = i.length, function (a) {
	            for (var c, d = 0; b > d; ++d) {
	              h[(c = i[d]).i] = c.x(a);
	            }return h.join("");
	          });
	        }function ra(a, b) {
	          for (var c, d = Pa.interpolators.length; --d >= 0 && !(c = Pa.interpolators[d](a, b));) {}return c;
	        }function sa(a) {
	          var b = [a.a, a.b],
	              c = [a.c, a.d],
	              d = ua(b),
	              e = ta(b, c),
	              f = ua(va(c, b, -e)) || 0;b[0] * c[1] < c[0] * b[1] && (b[0] *= -1, b[1] *= -1, d *= -1, e *= -1), this.rotate = (d ? Math.atan2(b[1], b[0]) : Math.atan2(-c[0], c[1])) * tb, this.translate = [a.e, a.f], this.scale = [d, f], this.skew = f ? Math.atan2(e, f) * tb : 0;
	        }function ta(a, b) {
	          return a[0] * b[0] + a[1] * b[1];
	        }function ua(a) {
	          var b = Math.sqrt(ta(a, a));return b && (a[0] /= b, a[1] /= b), b;
	        }function va(a, b, c) {
	          return a[0] += c * b[0], a[1] += c * b[1], a;
	        }function wa(a, b) {
	          var c,
	              d = [],
	              e = [],
	              f = Pa.transform(a),
	              g = Pa.transform(b),
	              h = f.translate,
	              i = g.translate,
	              j = f.rotate,
	              k = g.rotate,
	              l = f.skew,
	              m = g.skew,
	              n = f.scale,
	              o = g.scale;return h[0] != i[0] || h[1] != i[1] ? (d.push("translate(", null, ",", null, ")"), e.push({ i: 1, x: pa(h[0], i[0]) }, { i: 3, x: pa(h[1], i[1]) })) : i[0] || i[1] ? d.push("translate(" + i + ")") : d.push(""), j != k ? (j - k > 180 ? k += 360 : k - j > 180 && (j += 360), e.push({ i: d.push(d.pop() + "rotate(", null, ")") - 2, x: pa(j, k) })) : k && d.push(d.pop() + "rotate(" + k + ")"), l != m ? e.push({ i: d.push(d.pop() + "skewX(", null, ")") - 2, x: pa(l, m) }) : m && d.push(d.pop() + "skewX(" + m + ")"), n[0] != o[0] || n[1] != o[1] ? (c = d.push(d.pop() + "scale(", null, ",", null, ")"), e.push({ i: c - 4, x: pa(n[0], o[0]) }, { i: c - 2, x: pa(n[1], o[1]) })) : (1 != o[0] || 1 != o[1]) && d.push(d.pop() + "scale(" + o + ")"), c = e.length, function (a) {
	            for (var b, f = -1; ++f < c;) {
	              d[(b = e[f]).i] = b.x(a);
	            }return d.join("");
	          };
	        }function xa(a, b, c, d) {
	          var e = a.id,
	              f = a.namespace;return M(a, "function" == typeof c ? function (a, g, h) {
	            a[f][e].tween.set(b, d(c.call(a, a.__data__, g, h)));
	          } : (c = d(c), function (a) {
	            a[f][e].tween.set(b, c);
	          }));
	        }function ya(a) {
	          return null == a && (a = ""), function () {
	            this.textContent = a;
	          };
	        }function za(a) {
	          return a;
	        }function Aa(a) {
	          return function (b) {
	            return 0 >= b ? 0 : b >= 1 ? 1 : a(b);
	          };
	        }function Ba(a) {
	          return function (b) {
	            return 1 - a(1 - b);
	          };
	        }function Ca(a) {
	          return function (b) {
	            return .5 * (.5 > b ? a(2 * b) : 2 - a(2 - 2 * b));
	          };
	        }function Da(a) {
	          return a * a;
	        }function Ea(a) {
	          return a * a * a;
	        }function Fa(a) {
	          if (0 >= a) return 0;if (a >= 1) return 1;var b = a * a,
	              c = b * a;return 4 * (.5 > a ? c : 3 * (a - b) + c - .75);
	        }function Ga(a) {
	          return function (b) {
	            return Math.pow(b, a);
	          };
	        }function Ha(a) {
	          return 1 - Math.cos(a * rb);
	        }function Ia(a) {
	          return Math.pow(2, 10 * (a - 1));
	        }function Ja(a) {
	          return 1 - Math.sqrt(1 - a * a);
	        }function Ka(a, b) {
	          var c;return arguments.length < 2 && (b = .45), arguments.length ? c = b / qb * Math.asin(1 / a) : (a = 1, c = b / 4), function (d) {
	            return 1 + a * Math.pow(2, -10 * d) * Math.sin((d - c) * qb / b);
	          };
	        }function La(a) {
	          return a || (a = 1.70158), function (b) {
	            return b * b * ((a + 1) * b - a);
	          };
	        }function Ma(a) {
	          return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375;
	        }function Na(a) {
	          return null == a ? "__transition__" : "__transition_" + a + "__";
	        }function Oa(a, b, c, d, e) {
	          var f = a[c] || (a[c] = { active: 0, count: 0 }),
	              g = f[d];if (!g) {
	            var h = e.time;g = f[d] = { tween: new t(), time: h, delay: e.delay, duration: e.duration, ease: e.ease, index: b }, e = null, ++f.count, Pa.timer(function (e) {
	              function i(c) {
	                if (f.active > d) return k();var e = f[f.active];e && (--f.count, delete f[f.active], e.event && e.event.interrupt.call(a, a.__data__, e.index)), f.active = d, g.event && g.event.start.call(a, a.__data__, b), g.tween.forEach(function (c, d) {
	                  (d = d.call(a, a.__data__, b)) && p.push(d);
	                }), m = g.ease, l = g.duration, Pa.timer(function () {
	                  return o.c = j(c || 1) ? P : j, 1;
	                }, 0, h);
	              }function j(c) {
	                if (f.active !== d) return 1;for (var e = c / l, h = m(e), i = p.length; i > 0;) {
	                  p[--i].call(a, h);
	                }return e >= 1 ? (g.event && g.event.end.call(a, a.__data__, b), k()) : void 0;
	              }function k() {
	                return --f.count ? delete f[d] : delete a[c], 1;
	              }var l,
	                  m,
	                  n = g.delay,
	                  o = hb,
	                  p = [];return o.t = n + h, e >= n ? i(e - n) : void (o.c = i);
	            }, 0, h);
	          }
	        }var Pa = { version: "3.5.6" },
	            Qa = [].slice,
	            Ra = function Ra(a) {
	          return Qa.call(a);
	        },
	            Sa = this.document,
	            Ta = {}.__proto__ ? function (a, b) {
	          a.__proto__ = b;
	        } : function (a, b) {
	          for (var c in b) {
	            a[c] = b[c];
	          }
	        },
	            Ua = ["webkit", "ms", "moz", "Moz", "o", "O"],
	            Va = function Va(a, b) {
	          return b.querySelector(a);
	        },
	            Wa = function Wa(a, b) {
	          return b.querySelectorAll(a);
	        },
	            _Xa = function Xa(a, b) {
	          var c = a.matches || a[e(a, "matchesSelector")];return (_Xa = function Xa(a, b) {
	            return c.call(a, b);
	          })(a, b);
	        };"function" == typeof Sizzle && (Va = function Va(a, b) {
	          return Sizzle(a, b)[0] || null;
	        }, Wa = Sizzle, _Xa = Sizzle.matchesSelector), Pa.selection = function () {
	          return Pa.select(Sa.documentElement);
	        };var Ya = Pa.selection.prototype = [];Ya.select = function (a) {
	          var b,
	              c,
	              d,
	              e,
	              h = [];a = g(a);for (var i = -1, j = this.length; ++i < j;) {
	            h.push(b = []), b.parentNode = (d = this[i]).parentNode;for (var k = -1, l = d.length; ++k < l;) {
	              (e = d[k]) ? (b.push(c = a.call(e, e.__data__, k, i)), c && "__data__" in e && (c.__data__ = e.__data__)) : b.push(null);
	            }
	          }return f(h);
	        }, Ya.selectAll = function (a) {
	          var b,
	              c,
	              d = [];a = h(a);for (var e = -1, g = this.length; ++e < g;) {
	            for (var i = this[e], j = -1, k = i.length; ++j < k;) {
	              (c = i[j]) && (d.push(b = Ra(a.call(c, c.__data__, j, e))), b.parentNode = c);
	            }
	          }return f(d);
	        };var Za = { svg: "http://www.w3.org/2000/svg", xhtml: "http://www.w3.org/1999/xhtml", xlink: "http://www.w3.org/1999/xlink", xml: "http://www.w3.org/XML/1998/namespace", xmlns: "http://www.w3.org/2000/xmlns/" };Pa.ns = { prefix: Za, qualify: function qualify(a) {
	            var b = a.indexOf(":"),
	                c = a;return b >= 0 && (c = a.slice(0, b), a = a.slice(b + 1)), Za.hasOwnProperty(c) ? { space: Za[c], local: a } : a;
	          } }, Ya.attr = function (a, b) {
	          if (arguments.length < 2) {
	            if ("string" == typeof a) {
	              var c = this.node();return a = Pa.ns.qualify(a), a.local ? c.getAttributeNS(a.space, a.local) : c.getAttribute(a);
	            }for (b in a) {
	              this.each(i(b, a[b]));
	            }return this;
	          }return this.each(i(a, b));
	        }, Pa.requote = function (a) {
	          return a.replace($a, "\\$&");
	        };var $a = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;Ya.classed = function (a, b) {
	          if (arguments.length < 2) {
	            if ("string" == typeof a) {
	              var c = this.node(),
	                  d = (a = l(a)).length,
	                  e = -1;if (b = c.classList) {
	                for (; ++e < d;) {
	                  if (!b.contains(a[e])) return !1;
	                }
	              } else for (b = c.getAttribute("class"); ++e < d;) {
	                if (!k(a[e]).test(b)) return !1;
	              }return !0;
	            }for (b in a) {
	              this.each(m(b, a[b]));
	            }return this;
	          }return this.each(m(a, b));
	        }, Ya.style = function (a, b, c) {
	          var e = arguments.length;if (3 > e) {
	            if ("string" != typeof a) {
	              2 > e && (b = "");for (c in a) {
	                this.each(o(c, a[c], b));
	              }return this;
	            }if (2 > e) {
	              var f = this.node();return d(f).getComputedStyle(f, null).getPropertyValue(a);
	            }c = "";
	          }return this.each(o(a, b, c));
	        }, Ya.property = function (a, b) {
	          if (arguments.length < 2) {
	            if ("string" == typeof a) return this.node()[a];for (b in a) {
	              this.each(p(b, a[b]));
	            }return this;
	          }return this.each(p(a, b));
	        }, Ya.text = function (a) {
	          return arguments.length ? this.each("function" == typeof a ? function () {
	            var b = a.apply(this, arguments);this.textContent = null == b ? "" : b;
	          } : null == a ? function () {
	            this.textContent = "";
	          } : function () {
	            this.textContent = a;
	          }) : this.node().textContent;
	        }, Ya.html = function (a) {
	          return arguments.length ? this.each("function" == typeof a ? function () {
	            var b = a.apply(this, arguments);this.innerHTML = null == b ? "" : b;
	          } : null == a ? function () {
	            this.innerHTML = "";
	          } : function () {
	            this.innerHTML = a;
	          }) : this.node().innerHTML;
	        }, Ya.append = function (a) {
	          return a = q(a), this.select(function () {
	            return this.appendChild(a.apply(this, arguments));
	          });
	        }, Ya.insert = function (a, b) {
	          return a = q(a), b = g(b), this.select(function () {
	            return this.insertBefore(a.apply(this, arguments), b.apply(this, arguments) || null);
	          });
	        }, Ya.remove = function () {
	          return this.each(r);
	        }, Pa.map = function (a, b) {
	          var c = new t();if (a instanceof t) a.forEach(function (a, b) {
	            c.set(a, b);
	          });else if (Array.isArray(a)) {
	            var d,
	                e = -1,
	                f = a.length;if (1 === arguments.length) for (; ++e < f;) {
	              c.set(e, a[e]);
	            } else for (; ++e < f;) {
	              c.set(b.call(a, d = a[e], e), d);
	            }
	          } else for (var g in a) {
	            c.set(g, a[g]);
	          }return c;
	        };var _a = "__proto__",
	            ab = "\x00";s(t, { has: w, get: function get(a) {
	            return this._[u(a)];
	          }, set: function set(a, b) {
	            return this._[u(a)] = b;
	          }, remove: x, keys: y, values: function values() {
	            var a = [];for (var b in this._) {
	              a.push(this._[b]);
	            }return a;
	          }, entries: function entries() {
	            var a = [];for (var b in this._) {
	              a.push({ key: v(b), value: this._[b] });
	            }return a;
	          }, size: z, empty: A, forEach: function forEach(a) {
	            for (var b in this._) {
	              a.call(this, v(b), this._[b]);
	            }
	          } }), Pa.set = function (a) {
	          var b = new B();if (a) for (var c = 0, d = a.length; d > c; ++c) {
	            b.add(a[c]);
	          }return b;
	        }, s(B, { has: w, add: function add(a) {
	            return this._[u(a += "")] = !0, a;
	          }, remove: x, values: y, size: z, empty: A, forEach: function forEach(a) {
	            for (var b in this._) {
	              a.call(this, v(b));
	            }
	          } }), Ya.data = function (a, b) {
	          function c(a, c) {
	            var d,
	                e,
	                f,
	                g = a.length,
	                h = c.length,
	                l = Math.min(g, h),
	                m = new Array(h),
	                n = new Array(h),
	                o = new Array(g);if (b) {
	              var p,
	                  q = new t(),
	                  r = new Array(g);for (d = -1; ++d < g;) {
	                q.has(p = b.call(e = a[d], e.__data__, d)) ? o[d] = e : q.set(p, e), r[d] = p;
	              }for (d = -1; ++d < h;) {
	                (e = q.get(p = b.call(c, f = c[d], d))) ? e !== !0 && (m[d] = e, e.__data__ = f) : n[d] = C(f), q.set(p, !0);
	              }for (d = -1; ++d < g;) {
	                q.get(r[d]) !== !0 && (o[d] = a[d]);
	              }
	            } else {
	              for (d = -1; ++d < l;) {
	                e = a[d], f = c[d], e ? (e.__data__ = f, m[d] = e) : n[d] = C(f);
	              }for (; h > d; ++d) {
	                n[d] = C(c[d]);
	              }for (; g > d; ++d) {
	                o[d] = a[d];
	              }
	            }n.update = m, n.parentNode = m.parentNode = o.parentNode = a.parentNode, i.push(n), j.push(m), k.push(o);
	          }var d,
	              e,
	              g = -1,
	              h = this.length;if (!arguments.length) {
	            for (a = new Array(h = (d = this[0]).length); ++g < h;) {
	              (e = d[g]) && (a[g] = e.__data__);
	            }return a;
	          }var i = N([]),
	              j = f([]),
	              k = f([]);if ("function" == typeof a) for (; ++g < h;) {
	            c(d = this[g], a.call(d, d.parentNode.__data__, g));
	          } else for (; ++g < h;) {
	            c(d = this[g], a);
	          }return j.enter = function () {
	            return i;
	          }, j.exit = function () {
	            return k;
	          }, j;
	        }, Ya.datum = function (a) {
	          return arguments.length ? this.property("__data__", a) : this.property("__data__");
	        }, Ya.filter = function (a) {
	          var b,
	              c,
	              d,
	              e = [];"function" != typeof a && (a = D(a));for (var g = 0, h = this.length; h > g; g++) {
	            e.push(b = []), b.parentNode = (c = this[g]).parentNode;for (var i = 0, j = c.length; j > i; i++) {
	              (d = c[i]) && a.call(d, d.__data__, i, g) && b.push(d);
	            }
	          }return f(e);
	        }, Ya.order = function () {
	          for (var a = -1, b = this.length; ++a < b;) {
	            for (var c, d = this[a], e = d.length - 1, f = d[e]; --e >= 0;) {
	              (c = d[e]) && (f && f !== c.nextSibling && f.parentNode.insertBefore(c, f), f = c);
	            }
	          }return this;
	        }, Pa.ascending = E, Ya.sort = function (a) {
	          a = F.apply(this, arguments);for (var b = -1, c = this.length; ++b < c;) {
	            this[b].sort(a);
	          }return this.order();
	        }, Pa.dispatch = function () {
	          for (var a = new H(), b = -1, c = arguments.length; ++b < c;) {
	            a[arguments[b]] = I(a);
	          }return a;
	        }, H.prototype.on = function (a, b) {
	          var c = a.indexOf("."),
	              d = "";if (c >= 0 && (d = a.slice(c + 1), a = a.slice(0, c)), a) return arguments.length < 2 ? this[a].on(d) : this[a].on(d, b);if (2 === arguments.length) {
	            if (null == b) for (a in this) {
	              this.hasOwnProperty(a) && this[a].on(d, null);
	            }return this;
	          }
	        }, Pa.event = null, Ya.on = function (a, b, c) {
	          var d = arguments.length;if (3 > d) {
	            if ("string" != typeof a) {
	              2 > d && (b = !1);for (c in a) {
	                this.each(J(c, a[c], b));
	              }return this;
	            }if (2 > d) return (d = this.node()["__on" + a]) && d._;c = !1;
	          }return this.each(J(a, b, c));
	        };var bb = Pa.map({ mouseenter: "mouseover", mouseleave: "mouseout" });Sa && bb.forEach(function (a) {
	          "on" + a in Sa && bb.remove(a);
	        }), Ya.each = function (a) {
	          return M(this, function (b, c, d) {
	            a.call(b, b.__data__, c, d);
	          });
	        }, Ya.call = function (a) {
	          var b = Ra(arguments);return a.apply(b[0] = this, b), this;
	        }, Ya.empty = function () {
	          return !this.node();
	        }, Ya.node = function () {
	          for (var a = 0, b = this.length; b > a; a++) {
	            for (var c = this[a], d = 0, e = c.length; e > d; d++) {
	              var f = c[d];if (f) return f;
	            }
	          }return null;
	        }, Ya.size = function () {
	          var a = 0;return M(this, function () {
	            ++a;
	          }), a;
	        };var cb = [];Pa.selection.enter = N, Pa.selection.enter.prototype = cb, cb.append = Ya.append, cb.empty = Ya.empty, cb.node = Ya.node, cb.call = Ya.call, cb.size = Ya.size, cb.select = function (a) {
	          for (var b, c, d, e, g, h = [], i = -1, j = this.length; ++i < j;) {
	            d = (e = this[i]).update, h.push(b = []), b.parentNode = e.parentNode;for (var k = -1, l = e.length; ++k < l;) {
	              (g = e[k]) ? (b.push(d[k] = c = a.call(e.parentNode, g.__data__, k, i)), c.__data__ = g.__data__) : b.push(null);
	            }
	          }return f(h);
	        }, cb.insert = function (a, b) {
	          return arguments.length < 2 && (b = O(this)), Ya.insert.call(this, a, b);
	        }, Pa.select = function (a) {
	          var c;return "string" == typeof a ? (c = [Va(a, Sa)], c.parentNode = Sa.documentElement) : (c = [a], c.parentNode = b(a)), f([c]);
	        }, Pa.selectAll = function (a) {
	          var b;return "string" == typeof a ? (b = Ra(Wa(a, Sa)), b.parentNode = Sa.documentElement) : (b = a, b.parentNode = null), f([b]);
	        };var db,
	            eb,
	            fb,
	            gb,
	            hb,
	            ib = this[e(this, "requestAnimationFrame")] || function (a) {
	          setTimeout(a, 17);
	        };Pa.timer = function (a, b, c) {
	          var d = arguments.length;2 > d && (b = 0), 3 > d && (c = Date.now());var e = c + b,
	              f = { c: a, t: e, f: !1, n: null };eb ? eb.n = f : db = f, eb = f, fb || (gb = clearTimeout(gb), fb = 1, ib(Q));
	        }, Pa.timer.flush = function () {
	          R(), S();
	        }, Ya.transition = function (a) {
	          for (var b, c, d = jb || ++nb, e = Na(a), f = [], g = kb || { time: Date.now(), ease: Fa, delay: 0, duration: 250 }, h = -1, i = this.length; ++h < i;) {
	            f.push(b = []);for (var j = this[h], k = -1, l = j.length; ++k < l;) {
	              (c = j[k]) && Oa(c, k, e, d, g), b.push(c);
	            }
	          }return U(f, e, d);
	        }, Ya.interrupt = function (a) {
	          return this.each(null == a ? lb : T(Na(a)));
	        };var jb,
	            kb,
	            lb = T(Na()),
	            mb = [],
	            nb = 0;mb.call = Ya.call, mb.empty = Ya.empty, mb.node = Ya.node, mb.size = Ya.size, Pa.transition = function (a, b) {
	          return a && a.transition ? jb ? a.transition(b) : a : Pa.selection().transition(a);
	        }, Pa.transition.prototype = mb, mb.select = function (a) {
	          var b,
	              c,
	              d,
	              e = this.id,
	              f = this.namespace,
	              h = [];a = g(a);for (var i = -1, j = this.length; ++i < j;) {
	            h.push(b = []);for (var k = this[i], l = -1, m = k.length; ++l < m;) {
	              (d = k[l]) && (c = a.call(d, d.__data__, l, i)) ? ("__data__" in d && (c.__data__ = d.__data__), Oa(c, l, f, e, d[f][e]), b.push(c)) : b.push(null);
	            }
	          }return U(h, f, e);
	        }, mb.selectAll = function (a) {
	          var b,
	              c,
	              d,
	              e,
	              f,
	              g = this.id,
	              i = this.namespace,
	              j = [];a = h(a);for (var k = -1, l = this.length; ++k < l;) {
	            for (var m = this[k], n = -1, o = m.length; ++n < o;) {
	              if (d = m[n]) {
	                f = d[i][g], c = a.call(d, d.__data__, n, k), j.push(b = []);for (var p = -1, q = c.length; ++p < q;) {
	                  (e = c[p]) && Oa(e, p, i, g, f), b.push(e);
	                }
	              }
	            }
	          }return U(j, i, g);
	        }, mb.filter = function (a) {
	          var b,
	              c,
	              d,
	              e = [];"function" != typeof a && (a = D(a));for (var f = 0, g = this.length; g > f; f++) {
	            e.push(b = []);for (var c = this[f], h = 0, i = c.length; i > h; h++) {
	              (d = c[h]) && a.call(d, d.__data__, h, f) && b.push(d);
	            }
	          }return U(e, this.namespace, this.id);
	        }, Pa.color = V, V.prototype.toString = function () {
	          return this.rgb() + "";
	        }, Pa.hsl = W;var ob = W.prototype = new V();ob.brighter = function (a) {
	          return a = Math.pow(.7, arguments.length ? a : 1), new W(this.h, this.s, this.l / a);
	        }, ob.darker = function (a) {
	          return a = Math.pow(.7, arguments.length ? a : 1), new W(this.h, this.s, a * this.l);
	        }, ob.rgb = function () {
	          return X(this.h, this.s, this.l);
	        };var pb = Math.PI,
	            qb = 2 * pb,
	            rb = pb / 2,
	            sb = pb / 180,
	            tb = 180 / pb;Pa.hcl = Y;var ub = Y.prototype = new V();ub.brighter = function (a) {
	          return new Y(this.h, this.c, Math.min(100, this.l + vb * (arguments.length ? a : 1)));
	        }, ub.darker = function (a) {
	          return new Y(this.h, this.c, Math.max(0, this.l - vb * (arguments.length ? a : 1)));
	        }, ub.rgb = function () {
	          return Z(this.h, this.c, this.l).rgb();
	        }, Pa.lab = $;var vb = 18,
	            wb = .95047,
	            xb = 1,
	            yb = 1.08883,
	            zb = $.prototype = new V();zb.brighter = function (a) {
	          return new $(Math.min(100, this.l + vb * (arguments.length ? a : 1)), this.a, this.b);
	        }, zb.darker = function (a) {
	          return new $(Math.max(0, this.l - vb * (arguments.length ? a : 1)), this.a, this.b);
	        }, zb.rgb = function () {
	          return _(this.l, this.a, this.b);
	        }, Pa.rgb = ea;var Ab = ea.prototype = new V();Ab.brighter = function (a) {
	          a = Math.pow(.7, arguments.length ? a : 1);var b = this.r,
	              c = this.g,
	              d = this.b,
	              e = 30;return b || c || d ? (b && e > b && (b = e), c && e > c && (c = e), d && e > d && (d = e), new ea(Math.min(255, b / a), Math.min(255, c / a), Math.min(255, d / a))) : new ea(e, e, e);
	        }, Ab.darker = function (a) {
	          return a = Math.pow(.7, arguments.length ? a : 1), new ea(a * this.r, a * this.g, a * this.b);
	        }, Ab.hsl = function () {
	          return ia(this.r, this.g, this.b);
	        }, Ab.toString = function () {
	          return "#" + ga(this.r) + ga(this.g) + ga(this.b);
	        };var Bb = Pa.map({ aliceblue: 15792383, antiquewhite: 16444375, aqua: 65535, aquamarine: 8388564, azure: 15794175, beige: 16119260, bisque: 16770244, black: 0, blanchedalmond: 16772045, blue: 255, blueviolet: 9055202, brown: 10824234, burlywood: 14596231, cadetblue: 6266528, chartreuse: 8388352, chocolate: 13789470, coral: 16744272, cornflowerblue: 6591981, cornsilk: 16775388, crimson: 14423100, cyan: 65535, darkblue: 139, darkcyan: 35723, darkgoldenrod: 12092939, darkgray: 11119017, darkgreen: 25600, darkgrey: 11119017, darkkhaki: 12433259, darkmagenta: 9109643, darkolivegreen: 5597999, darkorange: 16747520, darkorchid: 10040012, darkred: 9109504, darksalmon: 15308410, darkseagreen: 9419919, darkslateblue: 4734347, darkslategray: 3100495, darkslategrey: 3100495, darkturquoise: 52945, darkviolet: 9699539, deeppink: 16716947, deepskyblue: 49151, dimgray: 6908265, dimgrey: 6908265, dodgerblue: 2003199, firebrick: 11674146, floralwhite: 16775920, forestgreen: 2263842, fuchsia: 16711935, gainsboro: 14474460, ghostwhite: 16316671, gold: 16766720, goldenrod: 14329120, gray: 8421504, green: 32768, greenyellow: 11403055, grey: 8421504, honeydew: 15794160, hotpink: 16738740, indianred: 13458524, indigo: 4915330, ivory: 16777200, khaki: 15787660, lavender: 15132410, lavenderblush: 16773365, lawngreen: 8190976, lemonchiffon: 16775885, lightblue: 11393254, lightcoral: 15761536, lightcyan: 14745599, lightgoldenrodyellow: 16448210, lightgray: 13882323, lightgreen: 9498256, lightgrey: 13882323, lightpink: 16758465, lightsalmon: 16752762, lightseagreen: 2142890, lightskyblue: 8900346, lightslategray: 7833753, lightslategrey: 7833753, lightsteelblue: 11584734, lightyellow: 16777184, lime: 65280, limegreen: 3329330, linen: 16445670, magenta: 16711935, maroon: 8388608, mediumaquamarine: 6737322, mediumblue: 205, mediumorchid: 12211667, mediumpurple: 9662683, mediumseagreen: 3978097, mediumslateblue: 8087790, mediumspringgreen: 64154, mediumturquoise: 4772300, mediumvioletred: 13047173, midnightblue: 1644912, mintcream: 16121850, mistyrose: 16770273, moccasin: 16770229, navajowhite: 16768685, navy: 128, oldlace: 16643558, olive: 8421376, olivedrab: 7048739, orange: 16753920, orangered: 16729344, orchid: 14315734, palegoldenrod: 15657130, palegreen: 10025880, paleturquoise: 11529966, palevioletred: 14381203, papayawhip: 16773077, peachpuff: 16767673, peru: 13468991, pink: 16761035, plum: 14524637, powderblue: 11591910, purple: 8388736, rebeccapurple: 6697881, red: 16711680, rosybrown: 12357519, royalblue: 4286945, saddlebrown: 9127187, salmon: 16416882, sandybrown: 16032864, seagreen: 3050327, seashell: 16774638, sienna: 10506797, silver: 12632256, skyblue: 8900331, slateblue: 6970061, slategray: 7372944, slategrey: 7372944, snow: 16775930, springgreen: 65407, steelblue: 4620980, tan: 13808780, teal: 32896, thistle: 14204888, tomato: 16737095, turquoise: 4251856, violet: 15631086, wheat: 16113331, white: 16777215, whitesmoke: 16119285, yellow: 16776960, yellowgreen: 10145074 });Bb.forEach(function (a, b) {
	          Bb.set(a, fa(b));
	        }), Pa.interpolateRgb = ma, Pa.interpolateObject = na, Pa.interpolateArray = oa, Pa.interpolateNumber = pa, Pa.interpolateString = qa;var Cb = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
	            Db = new RegExp(Cb.source, "g");Pa.interpolate = ra, Pa.interpolators = [function (a, b) {
	          var c = typeof b === "undefined" ? "undefined" : _typeof(b);return ("string" === c ? Bb.has(b.toLowerCase()) || /^(#|rgb\(|hsl\()/i.test(b) ? ma : qa : b instanceof V ? ma : Array.isArray(b) ? oa : "object" === c && isNaN(b) ? na : pa)(a, b);
	        }], Pa.transform = function (a) {
	          var b = Sa.createElementNS(Pa.ns.prefix.svg, "g");return (Pa.transform = function (a) {
	            if (null != a) {
	              b.setAttribute("transform", a);var c = b.transform.baseVal.consolidate();
	            }return new sa(c ? c.matrix : Eb);
	          })(a);
	        }, sa.prototype.toString = function () {
	          return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")";
	        };var Eb = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };Pa.interpolateTransform = wa, mb.tween = function (a, b) {
	          var c = this.id,
	              d = this.namespace;return arguments.length < 2 ? this.node()[d][c].tween.get(a) : M(this, null == b ? function (b) {
	            b[d][c].tween.remove(a);
	          } : function (e) {
	            e[d][c].tween.set(a, b);
	          });
	        }, mb.attr = function (a, b) {
	          function c() {
	            this.removeAttribute(h);
	          }function d() {
	            this.removeAttributeNS(h.space, h.local);
	          }function e(a) {
	            return null == a ? c : (a += "", function () {
	              var b,
	                  c = this.getAttribute(h);return c !== a && (b = g(c, a), function (a) {
	                this.setAttribute(h, b(a));
	              });
	            });
	          }function f(a) {
	            return null == a ? d : (a += "", function () {
	              var b,
	                  c = this.getAttributeNS(h.space, h.local);return c !== a && (b = g(c, a), function (a) {
	                this.setAttributeNS(h.space, h.local, b(a));
	              });
	            });
	          }if (arguments.length < 2) {
	            for (b in a) {
	              this.attr(b, a[b]);
	            }return this;
	          }var g = "transform" == a ? wa : ra,
	              h = Pa.ns.qualify(a);return xa(this, "attr." + a, b, h.local ? f : e);
	        }, mb.attrTween = function (a, b) {
	          function c(a, c) {
	            var d = b.call(this, a, c, this.getAttribute(e));return d && function (a) {
	              this.setAttribute(e, d(a));
	            };
	          }function d(a, c) {
	            var d = b.call(this, a, c, this.getAttributeNS(e.space, e.local));return d && function (a) {
	              this.setAttributeNS(e.space, e.local, d(a));
	            };
	          }var e = Pa.ns.qualify(a);return this.tween("attr." + a, e.local ? d : c);
	        }, mb.style = function (a, b, c) {
	          function e() {
	            this.style.removeProperty(a);
	          }function f(b) {
	            return null == b ? e : (b += "", function () {
	              var e,
	                  f = d(this).getComputedStyle(this, null).getPropertyValue(a);return f !== b && (e = ra(f, b), function (b) {
	                this.style.setProperty(a, e(b), c);
	              });
	            });
	          }var g = arguments.length;if (3 > g) {
	            if ("string" != typeof a) {
	              2 > g && (b = "");for (c in a) {
	                this.style(c, a[c], b);
	              }return this;
	            }c = "";
	          }return xa(this, "style." + a, b, f);
	        }, mb.styleTween = function (a, b, c) {
	          function e(e, f) {
	            var g = b.call(this, e, f, d(this).getComputedStyle(this, null).getPropertyValue(a));return g && function (b) {
	              this.style.setProperty(a, g(b), c);
	            };
	          }return arguments.length < 3 && (c = ""), this.tween("style." + a, e);
	        }, mb.text = function (a) {
	          return xa(this, "text", a, ya);
	        }, mb.remove = function () {
	          var a = this.namespace;return this.each("end.transition", function () {
	            var b;this[a].count < 2 && (b = this.parentNode) && b.removeChild(this);
	          });
	        };var Fb = function Fb() {
	          return za;
	        },
	            Gb = Pa.map({ linear: Fb, poly: Ga, quad: function quad() {
	            return Da;
	          }, cubic: function cubic() {
	            return Ea;
	          }, sin: function sin() {
	            return Ha;
	          }, exp: function exp() {
	            return Ia;
	          }, circle: function circle() {
	            return Ja;
	          }, elastic: Ka, back: La, bounce: function bounce() {
	            return Ma;
	          } }),
	            Hb = Pa.map({ "in": za, out: Ba, "in-out": Ca, "out-in": function outIn(a) {
	            return Ca(Ba(a));
	          } });Pa.ease = function (a) {
	          var b = a.indexOf("-"),
	              c = b >= 0 ? a.slice(0, b) : a,
	              d = b >= 0 ? a.slice(b + 1) : "in";return c = Gb.get(c) || Fb, d = Hb.get(d) || za, Aa(d(c.apply(null, Qa.call(arguments, 1))));
	        }, mb.ease = function (a) {
	          var b = this.id,
	              c = this.namespace;return arguments.length < 1 ? this.node()[c][b].ease : ("function" != typeof a && (a = Pa.ease.apply(Pa, arguments)), M(this, function (d) {
	            d[c][b].ease = a;
	          }));
	        }, mb.delay = function (a) {
	          var b = this.id,
	              c = this.namespace;return arguments.length < 1 ? this.node()[c][b].delay : M(this, "function" == typeof a ? function (d, e, f) {
	            d[c][b].delay = +a.call(d, d.__data__, e, f);
	          } : (a = +a, function (d) {
	            d[c][b].delay = a;
	          }));
	        }, mb.duration = function (a) {
	          var b = this.id,
	              c = this.namespace;return arguments.length < 1 ? this.node()[c][b].duration : M(this, "function" == typeof a ? function (d, e, f) {
	            d[c][b].duration = Math.max(1, a.call(d, d.__data__, e, f));
	          } : (a = Math.max(1, a), function (d) {
	            d[c][b].duration = a;
	          }));
	        }, mb.each = function (a, b) {
	          var c = this.id,
	              d = this.namespace;if (arguments.length < 2) {
	            var e = kb,
	                f = jb;try {
	              jb = c, M(this, function (b, e, f) {
	                kb = b[d][c], a.call(b, b.__data__, e, f);
	              });
	            } finally {
	              kb = e, jb = f;
	            }
	          } else M(this, function (e) {
	            var f = e[d][c];(f.event || (f.event = Pa.dispatch("start", "end", "interrupt"))).on(a, b);
	          });return this;
	        }, mb.transition = function () {
	          for (var a, b, c, d, e = this.id, f = ++nb, g = this.namespace, h = [], i = 0, j = this.length; j > i; i++) {
	            h.push(a = []);for (var b = this[i], k = 0, l = b.length; l > k; k++) {
	              (c = b[k]) && (d = c[g][e], Oa(c, k, g, f, { time: d.time, ease: d.ease, delay: d.delay + d.duration, duration: d.duration })), a.push(c);
	            }
	          }return U(h, g, f);
	        }, "function" == typeof a && a.amd ? a(Pa) : "object" == (typeof c === "undefined" ? "undefined" : _typeof(c)) && c.exports && (c.exports = Pa), this.d3 = Pa;
	      }();
	    }, {}], 4: [function (a, b, c) {
	      "use strict";
	      var d = a("./lib/d3-slim-dist"),
	          e = a("./manifestLayout"),
	          f = (a("./canvasLayout"), a("./iiifUtils")),
	          g = function g(a) {
	        function b() {
	          return O && O.viewingDirection ? O.viewingDirection : N.viewingDirection ? N.viewingDirection : "left-to-right";
	        }function c() {
	          return O && O.viewingHint ? O.viewingHint : N.viewingHint ? N.viewingHint : "individuals";
	        }function g(a, b) {
	          return arguments.length ? (K = a, Z && !b && Z(), h(), K) : K;
	        }function h() {
	          var a = g(),
	              b = e({ canvases: P, width: a.width, height: a.height, scaleFactor: a.scaleFactor, viewingDirection: a.viewingd, viewingMode: a.viewingMode, canvasHeight: 100, canvasWidth: 100, selectedCanvas: a.selectedCanvas, framePadding: { top: 10, bottom: 40, left: 10, right: 10 }, viewportPadding: Y, minimumImageGap: 5, facingCanvasPadding: .1 });if ("detail" === a.perspective && "overview" === a.previousPerspective) {
	            var c = function c() {
	              m(b.detail(), !1);
	            };m(b.intermediate(), !0, c);
	          } else "overview" === a.perspective && "detail" === a.previousPerspective ? (c = function c() {
	            m(b.overview(), !0);
	          }, m(b.intermediate(), !1, c)) : "detail" === a.perspective && "detail" === a.previousPerspective ? m(b.detail(), !0) : "overview" === a.perspective && "overview" === a.previousPerspective ? m(b.overview(), !0) : "overview" !== a.perspective || a.previousPerspective ? "detail" !== a.perspective || a.previousPerspective || m(b.intermediate(), !1) : m(b.overview(), !1);if ("detail" === a.perspective) {
	            var d = b.intermediate().filter(function (a) {
	              return a.canvas.selected;
	            })[0].vantage;D(d);var f = new OpenSeadragon.Rect(d.x, d.y, d.width, d.height);j(), a.previousPerspective ? J.viewport.fitBounds(f, !1) : J.viewport.fitBounds(f, !0), l();
	          } else d = new OpenSeadragon.Rect(0, ba, g().width, g().height), _ = !0, k(), j(), a.previousPerspective ? J.viewport.fitBounds(d, !1) : J.viewport.fitBounds(d, !0), setTimeout(function () {
	            _ = !1, j();
	          }, 1200);
	        }function i(a) {
	          return arguments.length ? L = a : L;
	        }function j() {
	          var a = 1200,
	              b = d.select(ca[0]);"detail" === g().perspective ? (b.style("opacity", 0).style("pointer-events", "none"), d.select(ea[0]).style("pointer-events", "none").style("overflow-y", "hidden")) : _ || (b.style("pointer-events", "all").transition().duration(a / 2).style("opacity", 1), d.select(ea[0]).style("pointer-events", "all").style("overflow-y", "scroll"));
	        }function k() {
	          J.zoomPerClick = 1, J.zoomPerScroll = 1, J.panHorizontal = !1, J.panVertical = !1;
	        }function l() {
	          J.zoomPerClick = 2, J.zoomPerScroll = 1.2, J.panHorizontal = !0, J.panVertical = !0;
	        }function m(a, b, c) {
	          var e = d.select(ca[0]),
	              f = b ? 1e3 : 0,
	              g = e.selectAll("." + W).data(a);g.style("width", function (a) {
	            return a.width + "px";
	          }).style("height", function (a) {
	            return a.height + "px";
	          }).transition().duration(f).ease("cubic-out").styleTween("transform", function (a) {
	            return d.interpolateString(this.style.transform, "translate(" + a.x + "px," + a.y + "px)");
	          }).styleTween("-webkit-transform", function (a) {
	            return d.interpolateString(this.style.transform, "translate(" + a.x + "px," + a.y + "px)");
	          }).tween("translateTilesources", o).call(n, function () {
	            c && c();
	          });g.select("." + V).style("width", function (a) {
	            return a.canvas.width + "px";
	          }).style("height", function (a) {
	            return a.canvas.height + "px";
	          }).attr("class", function (a) {
	            var b = a.canvas.selected;return b ? V + " selected" : V;
	          }).transition().duration(f).ease("cubic-out").styleTween("transform", function (a) {
	            return d.interpolateString(this.style.transform, "translate(" + a.canvas.localX + "px," + a.canvas.localY + "px)");
	          }).styleTween("-webkit-transform", function (a) {
	            return d.interpolateString(this.style.transform, "translate(" + a.canvas.localX + "px," + a.canvas.localY + "px)");
	          });var h = g.enter().append("div").attr("class", W).style("width", function (a) {
	            return a.width + "px";
	          }).style("height", function (a) {
	            return a.height + "px";
	          }).style("transform", function (a) {
	            return "translate(" + a.x + "px," + a.y + "px)";
	          }).style("-webkit-transform", function (a) {
	            return "translate(" + a.x + "px," + a.y + "px)";
	          });h.append("div").attr("class", function (a) {
	            var b = a.canvas.selected;return b ? V + " selected" : V;
	          }).attr("data-id", function (a) {
	            return a.canvas.id;
	          }).style("width", function (a) {
	            return a.canvas.width + "px";
	          }).style("height", function (a) {
	            return a.canvas.height + "px";
	          }).style("transform", function (a) {
	            return "translateX(" + a.canvas.localX + "px) translateY(" + a.canvas.localY + "px)";
	          }).style("-webkit-transform", function (a) {
	            return "translateX(" + a.canvas.localX + "px) translateY(" + a.canvas.localY + "px)";
	          }).each(p), h.append("div").attr("class", X).text(function (a) {
	            return a.canvas.label;
	          });
	        }function n(a, b) {
	          var c = 0;a.empty() ? b() : a.each(function () {
	            ++c;
	          }).each("end", function () {
	            --c || b.apply(this, arguments);
	          });
	        }function o(a, b) {
	          var c = a.canvas.id,
	              e = i()[c].mainImageObj,
	              f = e ? e.getBounds(!0) : null;if (null === f) return function () {};var g = d.interpolate(f.x, a.canvas.x),
	              h = d.interpolate(f.y, a.canvas.y);return function (b) {
	            e.setPosition(new OpenSeadragon.Point(g(b), h(b)), !0), e.setWidth(a.canvas.width, !0), e.setHeight(a.canvas.height, !0);
	          };
	        }function p(a) {
	          var b = a.canvas,
	              c = i()[b.id];J.addTiledImage({ x: b.x, y: b.y, width: b.width, tileSource: c.tileSourceUrl, index: 0, success: function success(a) {
	              z(b.id, a.item);var c = a.item,
	                  d = function d(a) {
	                J.removeHandler("tile-drawn", d), c.setOpacity(0, !0), q(c, 1);
	              };J.addHandler("tile-drawn", d);
	            } });
	        }function q(a, b, c) {
	          var d = a.getOpacity(),
	              e = (b - d) / 30;if (0 === e) return void c();var f = function f() {
	            return d += e, e > 0 && d >= b || 0 > e && b >= d ? (a.setOpacity(b), void (c && c())) : (a.setOpacity(d), void OpenSeadragon.requestAnimationFrame(f));
	          };OpenSeadragon.requestAnimationFrame(f);
	        }function r() {
	          J = OpenSeadragon({ element: da[0], showNavigationControl: !1, preserveViewport: !0 }), J.addHandler("animation", function (a) {
	            s();
	          }), J.addHandler("zoom", function (a) {
	            "detail" === g().perspective && u(aa);
	          }), J.addHandler("pan", function (a) {
	            "detail" === g().perspective && u(aa);
	          });
	        }function s() {
	          var a = J.container.clientWidth,
	              b = J.container.clientHeight,
	              c = J.viewport.getCenter(!0),
	              e = c.minus(new OpenSeadragon.Point(a / 2, b / 2)).minus(new OpenSeadragon.Point(0, ba)),
	              f = J.viewport.getZoom(!0),
	              g = a * f,
	              h = "scale(" + g + ") translate(" + -e.x + "px," + -e.y + "px)";d.select(ca[0]).style("transform", h).style("-webkit-transform", h);
	        }function t(a, b, c) {
	          var d = b / 2,
	              e = a + c / 2;J.viewport.panTo(new OpenSeadragon.Point(d, e), !0);
	        }function u(a) {
	          if (a = new OpenSeadragon.Rect(a.x, a.y, a.width, a.height), a && !M) {
	            var b = !1,
	                c = J.viewport.getBounds();c.x < a.x - 1e-5 && (c.x = a.x, b = !0), c.y < a.y - 1e-5 && (c.y = a.y, b = !0), c.width > a.width + 1e-5 && (c.width = a.width, b = !0), c.height > a.height + 1e-5 && (c.height = a.height, b = !0), c.x + c.width > a.x + a.width + 1e-5 && (c.x = a.x + a.width - c.width, b = !0), c.y + c.height > a.y + a.height + 1e-5 && (c.y = a.y + a.height - c.height, b = !0), b && (M = !0, J.viewport.fitBounds(c), M = !1);
	          }
	        }function v(a) {
	          var b = g();b.selectedCanvas = a, b.previousPerspective = b.perspective, b.perspective = "detail", g(b);
	        }function w(a) {
	          var b = g();b.previousPerspective = b.perspective, b.perspective = a, g(b);
	        }function x(a) {
	          var b = g();b.previousPerspective = b.perspective, b.viewingMode = a, g(b);
	        }function y(a) {
	          var b = g();g(b);
	        }function z(a, b) {
	          var c = i();c[a].mainImageObj = b, i(c);
	        }function A(a) {
	          var b = {};a.forEach(function (a) {
	            b[a["@id"]] = { tileSourceUrl: a.images[0].resource.service["@id"] + "/info.json" };
	          }), i(b);
	        }function B() {
	          var a = g();a.width = Q.width(), a.height = Q.height(), g(a);
	        }function C(a) {
	          var b = g();b.scaleFactor = a, g(b);
	        }function D(a) {
	          g();aa = a;
	        }function E() {
	          var a,
	              b,
	              c = g();return "paged" === c.viewingMode ? (a = H(c.selectedCanvas), b = a % 2 === 0 ? a + 1 : a + 2) : (a = I(c.selectedCanvas), b = a + 1), b >= G().length ? !1 : void v(P[b]["@id"]);
	        }function F() {
	          var a,
	              b,
	              c = g();return "paged" === c.viewingMode ? (a = H(c.selectedCanvas), b = a % 2 === 0 ? a - 2 : a - 1) : (a = I(c.selectedCanvas), b = a - 1), 0 > b ? !1 : void v(P[b]["@id"]);
	        }function G() {
	          var a = P.filter(function (a) {
	            return "non-paged" === a.viewingHint ? !1 : !0;
	          });return a;
	        }function H(a) {
	          return I(a, G());
	        }function I(a, b) {
	          var c;return void 0 === b && (b = P), P.forEach(function (b, d) {
	            return a === b["@id"] ? void (c = d) : void 0;
	          }), c;
	        }var J,
	            K,
	            L,
	            M,
	            N = a.manifest,
	            O = a.sequence,
	            P = a.sequence ? a.sequence.canvases : N.sequences[0].canvases,
	            Q = a.container,
	            R = a.viewingDirection ? a.viewingDirection : b(),
	            S = a.viewingMode ? a.viewingHint : c(),
	            T = a.perspective ? a.perspective : "overview",
	            U = a.selectedCanvas || f.getFirst(P),
	            V = a.canvasClass ? a.canvasClass : "canvas",
	            W = a.frameClass ? a.frameClass : "frame",
	            X = a.labelClass ? a.labelClass : "label",
	            Y = a.viewportPadding,
	            Z = a.stateUpdateCallback,
	            _ = !1,
	            aa = { x: 0, y: 0, width: Q.width(), height: Q.height() },
	            ba = 0;A(P);var ca = $('<div class="overlaysContainer">').css({ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }),
	            da = $('<div class="osd-container">').css({ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }),
	            ea = $('<div class="scroll-container">').css({ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, overflow: "hidden", "overflow-x": "hidden" });return Q.append(da), Q.append(ea), ea.append(ca), r(), g({ selectedCanvas: U, perspective: T, viewingMode: S, viewingDirection: R, width: Q.width(), height: Q.height() }, !0), d.timer(function () {
	          J.forceRedraw();
	        }), Q.on("click", "." + V, function (a) {
	          v($(this).data("id"));
	        }), ea.on("scroll", function (a) {
	          if ("overview" === g().perspective && _ === !1) {
	            var b = g().width,
	                c = g().height;ba = $(this).scrollTop(), t(ba, b, c);
	          }
	        }), { next: E, previous: F, resize: B, selectCanvas: v, selectPerspective: w, selectViewingMode: x, updateThumbSize: C, refreshState: y, getState: g, setState: g, osd: J };
	      };b.exports = g;
	    }, { "./canvasLayout": 1, "./iiifUtils": 2, "./lib/d3-slim-dist": 3, "./manifestLayout": 5 }], 5: [function (a, b, c) {
	      "use strict";
	      var d = function d(a) {
	        function b(a, b, c) {
	          var d,
	              e,
	              f = { padding: c || { top: 0, left: 0, right: 0, bottom: 0 }, width: a, height: b, aspectRatio: a / b };return d = f.padding.left + f.padding.right, e = f.padding.top + f.padding.bottom, f.paddedWidth = a - a * (d / 100), f.paddedHeight = b - b * (e / 100), f.paddedAspectRatio = f.paddedWidth / f.paddedHeight, f;
	        }function c(a, b) {
	          var c = { id: a["@id"], label: a.label, height: a.height, width: a.width, aspectRatio: a.width / a.height, thumbService: a.images[0].resource.service["@id"], selected: a["@id"] === x ? !0 : !1, sequencePosition: b };return c;
	        }function d(a, b) {
	          var c = (a.aspectRatio <= 1 ? !0 : !1, b / a.height);return a.height = b, a.width = a.width * c, a;
	        }function e(a, b) {
	          return a.localX = b.left, a.localY = b.top, { width: a.width + b.left + b.right, height: a.height + b.top + b.bottom, canvas: a };
	        }function f(a, b, c, d, f) {
	          if ("paged" === b) return a.filter(function (a) {
	            return "non-paged" === a.viewingHint ? !1 : !0;
	          }).map(function (a, b) {
	            var c;return 0 === b ? (c = { top: d.top, bottom: d.bottom, left: d.left, right: a.width * f / 100 / 2 }, c.left = a.width + f / 100 * a.width, e(a, c)) : (b + 1) % 2 === 0 ? (c = { top: d.top, bottom: d.bottom, left: d.left, right: a.width * f / 100 / 2 }, e(a, c)) : (c = { top: d.top, bottom: d.bottom, left: a.width * f / 100 / 2, right: d.right }, e(a, c));
	          });if ("continuous" === b) {
	            var g = { top: d.top, bottom: d.bottom, left: 0, right: 0 };return a.map(function (a) {
	              return e(a, g);
	            });
	          }return a.map(function (a) {
	            return e(a, d);
	          });
	        }function g(a, b, c, d) {
	          var e = [];return e.currentLine = 0, e.addLine = function () {
	            var a = e[e.currentLine] = [];return a.remaining = b, a;
	          }, e.addItem = function (f) {
	            var g,
	                i,
	                j = this[this.currentLine];if ("paged" === d) {
	              var k = f.canvas.sequencePosition,
	                  l = a.filter(function (a) {
	                var b;switch (h(k)) {case "rightPage":
	                    b = -1;break;case "leftPage":
	                    b = 1;}return a.canvas.sequencePosition + b === k;
	              })[0];g = l ? f.width + l.width : f.width;
	            } else g = f.width;return j || (j = this.addLine()), j.remaining >= g ? (i = b - j.remaining, "right-to-left" === c && (i = j.remaining - f.x), j.remaining -= f.width, [i, e.currentLine]) : j.remaining >= f.width && "rightPage" === h(f.canvas.sequencePosition) ? (i = b - j.remaining, [i, e.currentLine]) : (this.currentLine += 1, j = e.addLine(), i = "right-to-left" === c ? f.width : j.remaining, j.remaining -= f.width, [b - i, this.currentLine]);
	          }, a.map(function (a) {
	            var b = e.addItem(a);return a.x = b[0], a.y = b[1] * a.height, a.canvas.x = a.x + a.canvas.localX, a.canvas.y = a.y + a.canvas.localY, a;
	          });
	        }function h(a) {
	          return 0 === a ? "firstPage" : a % 2 === 0 ? "rightPage" : "leftPage";
	        }function i() {
	          var a = f(w.map(c).map(function (a) {
	            return d(a, r);
	          }), z, y, s, t);return g(a, b.paddedWidth, y, z).map(function (a) {
	            return a.x += b.width * b.padding.left / 100, a.y += b.height * b.padding.top / 100, a.canvas.x = a.x + a.canvas.localX, a.canvas.y = a.y + a.canvas.localY, a;
	          });
	        }function j() {
	          return p(i(), x, b);
	        }function k() {
	          return o(j());
	        }function l(a, b, c) {
	          var d,
	              e,
	              f,
	              g = {};if ("paged" === z) {
	            var h = a.sequencePosition;0 === h ? (d = 2 * a.width, e = a.x - a.width, f = a.height) : h % 2 === 0 ? (d = a.width + b.width, d += t / 100 * d, e = b.x, f = Math.max(a.height, b.height)) : (d = a.width + b.width, d += t / 100 * d, e = a.x, f = Math.max(a.height, b.height)), g = { x: e, y: a.y, width: d, height: f };
	          } else e = a.x, g = { x: a.x, y: a.y, width: a.width, height: a.height };return m(g, c);
	        }function m(a, b) {
	          var c,
	              d,
	              e,
	              f,
	              g = a.width / a.height,
	              h = 5;b.paddedAspectRatio >= g ? (d = 100 * a.height / (100 - 2 * h), c = d * b.paddedAspectRatio) : (c = 100 * a.width / (100 - 2 * h), d = c / b.paddedAspectRatio), e = (c - a.width) / 2, f = (d - a.height) / 2;var i = { x: a.x - e, y: a.y - f, width: c, height: d, topMargin: f, bottomMargin: f, leftMargin: e, rightMargin: e };return n(i, b);
	        }function n(a, b) {
	          var c = b.padding.left + b.padding.right,
	              d = b.padding.top + b.padding.bottom,
	              e = 100 * a.width / (100 - c),
	              f = 100 * a.height / (100 - d),
	              g = { x: a.x - e * (b.padding.left / 100), y: a.y - f * (b.padding.top / 100), width: e, height: f, topMargin: a.topMargin + f * b.padding.top / 100, bottomMargin: a.bottomMargin + f * b.padding.bottom / 100, leftMargin: a.leftMargin + e * (b.padding.left / 100), rightMargin: a.rightMargin + e * (b.padding.right / 100) };return g;
	        }function o(a) {
	          return a.forEach(function (a) {}), a;
	        }function p(a, b, c) {
	          var d = a.filter(function (a) {
	            return a.canvas.selected;
	          })[0],
	              e = q(d.canvas, a),
	              f = d.canvas.sequencePosition;return d.vantage = l(d.canvas, e, c), "continuous" !== z && a.forEach(function (a, b, c) {
	            if (a.y === d.y && a.canvas.id !== d.canvas.id) {
	              if ("paged" === z && a.canvas.id === e.id) return;f > b ? a.x = a.x - (d.vantage.leftMargin + 2 * s.right) : a.x = a.x + (d.vantage.rightMargin + 2 * s.left);
	            } else a.y > d.y ? a.y = a.y + (d.vantage.topMargin + 2 * s.bottom) : a.y < d.y && (a.y = a.y - (d.vantage.bottomMargin + 2 * s.top));a.canvas.x = a.x + a.canvas.localX, a.canvas.y = a.y + a.canvas.localY;
	          }), a;
	        }function q(a, b) {
	          var c;return b.forEach(function (b, d) {
	            b.canvas.id === a.id && (c = d);
	          }), 0 === c ? a.id : c === b.length - 1 ? b[c].canvas : (c + 1) % 2 === 0 ? b[c + 1].canvas : b[c - 1].canvas;
	        }var r = (a.maxCanvasHeight || 130, a.maxCanvasWidth || 30, a.minCanvasWidth || 30, a.minCanvasHeight || 30, a.canvasHeight * a.scaleFactor || 100),
	            s = (a.canvasWidth * a.scaleFactor || 30, a.scaleFactor || 1, a.columns || 8, { top: a.framePadding.top || 0, bottom: a.framePadding.bottom || 0, left: a.framePadding.left || 0, right: a.framePadding.right || 0 }),
	            t = a.facingCanvasPadding,
	            u = (a.minimumImageGap, a.height),
	            v = a.width,
	            w = a.canvases,
	            x = a.selectedCanvas,
	            y = (a.framingStrategy || "contain", a.viewingDirection || "left-to-right"),
	            z = a.viewingMode || "individuals",
	            b = (a.viewingMode || "grid", b(v, u, a.viewportPadding));return { overview: i, intermediate: j, detail: k };
	      };b.exports = d;
	    }, {}] }, {}, [4])(4);
	});

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var haveEvents = 'GamepadEvent' in window;
	var controllers = {};
	var rAF = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.requestAnimationFrame;

	function connecthandler(e) {
	    addgamepad(e.gamepad);
	}
	function addgamepad(gamepad) {
	    controllers[gamepad.index] = gamepad;var d = document.createElement("div");
	    d.setAttribute("id", "controller" + gamepad.index);
	    var t = document.createElement("h1");
	    t.appendChild(document.createTextNode("gamepad: " + gamepad.id));
	    d.appendChild(t);
	    var b = document.createElement("div");
	    b.className = "buttons";
	    for (var i = 0; i < gamepad.buttons.length; i++) {
	        var e = document.createElement("span");
	        e.className = "button";
	        //e.id = "b" + i;
	        e.innerHTML = i;
	        b.appendChild(e);
	    }
	    d.appendChild(b);
	    var a = document.createElement("div");
	    a.className = "axes";
	    for (i = 0; i < gamepad.axes.length; i++) {
	        e = document.createElement("progress");
	        e.className = "axis";
	        //e.id = "a" + i;
	        e.setAttribute("max", "2");
	        e.setAttribute("value", "1");
	        e.innerHTML = i;
	        a.appendChild(e);
	    }
	    d.appendChild(a);
	    document.getElementById("start").style.display = "none";
	    document.body.appendChild(d);
	    rAF(updateStatus);
	}

	function disconnecthandler(e) {
	    removegamepad(e.gamepad);
	}

	function removegamepad(gamepad) {
	    var d = document.getElementById("controller" + gamepad.index);
	    document.body.removeChild(d);
	    delete controllers[gamepad.index];
	}

	function updateStatus() {
	    scangamepads();
	    for (var j in controllers) {
	        var controller = controllers[j];
	        var d = document.getElementById("controller" + j);
	        var buttons = d.getElementsByClassName("button");
	        for (var i = 0; i < controller.buttons.length; i++) {
	            var b = buttons[i];
	            var val = controller.buttons[i];
	            var pressed = val == 1.0;
	            if ((typeof val === "undefined" ? "undefined" : _typeof(val)) == "object") {
	                pressed = val.pressed;
	                val = val.value;
	            }
	            var pct = Math.round(val * 100) + "%";
	            if (pressed) {
	                b.className = "button pressed";
	            } else {
	                b.className = "button";
	            }
	        }

	        var axes = d.getElementsByClassName("axis");
	        for (var i = 0; i < controller.axes.length; i++) {
	            var a = axes[i];
	            a.innerHTML = i + ": " + controller.axes[i].toFixed(4);
	            a.setAttribute("value", controller.axes[i] + 1);
	        }
	    }
	    rAF(updateStatus);
	}

	function scangamepads() {
	    var gamepads = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : [];
	    for (var i = 0; i < gamepads.length; i++) {
	        if (gamepads[i]) {
	            if (!(gamepads[i].index in controllers)) {
	                addgamepad(gamepads[i]);
	            } else {
	                controllers[gamepads[i].index] = gamepads[i];
	            }
	        }
	    }
	}

	if (haveEvents) {
	    window.addEventListener("gamepadconnected", connecthandler);
	    window.addEventListener("gamepaddisconnected", disconnecthandler);
	} else {
	    setInterval(scangamepads, 500);
	}

	console.log('loaded');

/***/ }
/******/ ]);