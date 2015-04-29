;(function(window, exports, undefined) { "use strict";

var
	goQueue = [],
	document = typeof window.document !== "undefined" ? window.document : {},
$$;

/**
 * Called when DOMContentLoaded event fires, calling each function in the
 * goQueue array. This callback may be attached multiple times, so in order to
 * ensure only firing each callback once, callbacks are removed as soon as they
 * execute.
 */
function goCallback() {
	if(typeof document.readyState !== "undefined"
	&& document.readyState !== "complete"
	&& document.readyState !== "interactive") {
		return;
	}


	while(goQueue.length > 0) {
		// Shift the element from the start of the array, and call it.
		goQueue.shift().call(window);
	}
}

/**
 * Define a module of JavaScript using dot-separated namespaces, initialising
 * nested namespaces automatically with the provided attachment function.
 *
 * @param {String} namespace A dot-separated namespace to house the attachment
 * @param {Function|Object} attachment The object to attach to the namespace
 * @param {Object} [base] Optional base object to attach to. Leave undefined to
 * use window
 *
 * @return {Object} Returns the base object
 */
function ns(namespace, attachment, base) {
	var
		partArray = namespace.split("."),
		base = base || window,
		current = base,
		i, len,
	$$;

	console.log(partArray, base, current);

	// Loop through the provided namespace, initialising undefined elements.
	for(i = 0, len = partArray.length; i < len; i++) {
		if(current[partArray[i]] === undefined) {
			if(i === len - 1) {
				current[partArray[i]] = attachment;
			}
			else {
				current[partArray[i]] = {};
			}
		}

		current = current[partArray[i]];
	}

	return base;
}

/**
 * Helper function that calls a function or set of functions when the DOM
 * content completely loads A.K.A. the DOM "Ready" event.
 *
 * @param {function|array} callback Single function or array of functions to
 * execute when DOM has loaded
 *
 * @return {function} The goCallback function that will be called when
 * DOMContentLoaded fires
 */
function go(callback) {
	var
		callbackArray,
		i,
	$$;

	// Enforce callbackArray is an Array.
	if(callback instanceof Array) {
		callbackArray = callback;
	}
	else {
		callbackArray = [callback];
	}

	for(i in callbackArray) {
		if(!callbackArray.hasOwnProperty(i)) {
			continue;
		}

		goQueue.push(callbackArray[i]);
	}

	if(document.addEventListener) {
		document.addEventListener("DOMContentLoaded", goCallback);
	}

	return goCallback;
}

// Attach the two main functions to exports object.
// Read http://wiki.commonjs.org/wiki/Modules/1.1.1 for information on the use
// of `exports` object.
exports.ns = ns;
exports.go = go;

// Attach all exported variables to the global scope, if in the context of
// a browser.
(function(w) {
	var
		e
	$$;

	for(e in exports) {
		if(!exports.hasOwnProperty(e)) {
			continue;
		}

		w[e] = exports[e];
	}
})(window);

})(typeof window   !== "undefined" ? window   : {},
   typeof exports  !== "undefined" ? exports  : {});
