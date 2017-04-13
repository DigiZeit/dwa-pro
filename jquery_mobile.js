
/*
* jQuery Mobile Git Build: SHA1: caa77b258660731d663844fe7867aa2c3a107ab1 <> Date: Wed Feb 20 15:03:27 2013 -0500
* http://jquerymobile.com
*
* Copyright 2010, 2013 jQuery Foundation, Inc. and other contributors
* Released under the MIT license.
* http://jquery.org/license
*
*/


(function ( root, doc, factory ) {
	if ( typeof define === "function" && define.amd ) {
		// AMD. Register as an anonymous module.
		define( [ "jquery" ], function ( $ ) {
			factory( $, root, doc );
			return $.mobile;
		});
	} else {
		// Browser globals
		factory( root.jQuery, root, doc );
	}
}( this, document, function ( jQuery, window, document, undefined ) {
(function( $ ) {
	$.mobile = {};
}( jQuery ));
(function( $, window, undefined ) {

	var nsNormalizeDict = {};

	// jQuery.mobile configurable options
	$.mobile = $.extend($.mobile, {

		// Version of the jQuery Mobile Framework
		version: "1.3.0",

		// Namespace used framework-wide for data-attrs. Default is no namespace
		ns: "",

		// Define the url parameter used for referencing widget-generated sub-pages.
		// Translates to to example.html&ui-page=subpageIdentifier
		// hash segment before &ui-page= is used to make Ajax request
		subPageUrlKey: "ui-page",

		// Class assigned to page currently in view, and during transitions
		activePageClass: "ui-page-active",

		// Class used for "active" button state, from CSS framework
		activeBtnClass: "ui-btn-active",

		// Class used for "focus" form element state, from CSS framework
		focusClass: "ui-focus",

		// Automatically handle clicks and form submissions through Ajax, when same-domain
		ajaxEnabled: true,

		// Automatically load and show pages based on location.hash
		hashListeningEnabled: true,

		// disable to prevent jquery from bothering with links
		linkBindingEnabled: true,

		// Set default page transition - 'none' for no transitions
		defaultPageTransition: "fade",

		// Set maximum window width for transitions to apply - 'false' for no limit
		maxTransitionWidth: false,

		// Minimum scroll distance that will be remembered when returning to a page
		minScrollBack: 250,

		// DEPRECATED: the following property is no longer in use, but defined until 2.0 to prevent conflicts
		touchOverflowEnabled: false,

		// Set default dialog transition - 'none' for no transitions
		defaultDialogTransition: "pop",

		// Error response message - appears when an Ajax page request fails
		pageLoadErrorMessage: "Error Loading Page",

		// For error messages, which theme does the box uses?
		pageLoadErrorMessageTheme: "e",

		// replace calls to window.history.back with phonegaps navigation helper
		// where it is provided on the window object
		phonegapNavigationEnabled: false,

		//automatically initialize the DOM when it's ready
		autoInitializePage: true,

		pushStateEnabled: true,

		// allows users to opt in to ignoring content by marking a parent element as
		// data-ignored
		ignoreContentEnabled: false,

		// turn of binding to the native orientationchange due to android orientation behavior
		orientationChangeEnabled: true,

		buttonMarkup: {
			hoverDelay: 200
		},

		// define the window and the document objects
		window: $( window ),
		document: $( document ),

		// TODO might be useful upstream in jquery itself ?
		keyCode: {
			ALT: 18,
			BACKSPACE: 8,
			CAPS_LOCK: 20,
			COMMA: 188,
			COMMAND: 91,
			COMMAND_LEFT: 91, // COMMAND
			COMMAND_RIGHT: 93,
			CONTROL: 17,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			INSERT: 45,
			LEFT: 37,
			MENU: 93, // COMMAND_RIGHT
			NUMPAD_ADD: 107,
			NUMPAD_DECIMAL: 110,
			NUMPAD_DIVIDE: 111,
			NUMPAD_ENTER: 108,
			NUMPAD_MULTIPLY: 106,
			NUMPAD_SUBTRACT: 109,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SHIFT: 16,
			SPACE: 32,
			TAB: 9,
			UP: 38,
			WINDOWS: 91 // COMMAND
		},

		// Place to store various widget extensions
		behaviors: {},

		// Scroll page vertically: scroll to 0 to hide iOS address bar, or pass a Y value
		silentScroll: function( ypos ) {
			if ( $.type( ypos ) !== "number" ) {
				ypos = $.mobile.defaultHomeScroll;
			}

			// prevent scrollstart and scrollstop events
			$.event.special.scrollstart.enabled = false;

			setTimeout( function() {
				window.scrollTo( 0, ypos );
				$.mobile.document.trigger( "silentscroll", { x: 0, y: ypos });
			}, 20 );

			setTimeout( function() {
				$.event.special.scrollstart.enabled = true;
			}, 150 );
		},

		// Expose our cache for testing purposes.
		nsNormalizeDict: nsNormalizeDict,

		// Take a data attribute property, prepend the namespace
		// and then camel case the attribute string. Add the result
		// to our nsNormalizeDict so we don't have to do this again.
		nsNormalize: function( prop ) {
			if ( !prop ) {
				return;
			}

			return nsNormalizeDict[ prop ] || ( nsNormalizeDict[ prop ] = $.camelCase( $.mobile.ns + prop ) );
		},

		// Find the closest parent with a theme class on it. Note that
		// we are not using $.fn.closest() on purpose here because this
		// method gets called quite a bit and we need it to be as fast
		// as possible.
		getInheritedTheme: function( el, defaultTheme ) {
			var e = el[ 0 ],
				ltr = "",
				re = /ui-(bar|body|overlay)-([a-z])\b/,
				c, m;

			while ( e ) {
				c = e.className || "";
				if ( c && ( m = re.exec( c ) ) && ( ltr = m[ 2 ] ) ) {
					// We found a parent with a theme class
					// on it so bail from this loop.
					break;
				}

				e = e.parentNode;
			}

			// Return the theme letter we found, if none, return the
			// specified default.

			return ltr || defaultTheme || "a";
		},

		// TODO the following $ and $.fn extensions can/probably should be moved into jquery.mobile.core.helpers
		//
		// Find the closest javascript page element to gather settings data jsperf test
		// http://jsperf.com/single-complex-selector-vs-many-complex-selectors/edit
		// possibly naive, but it shows that the parsing overhead for *just* the page selector vs
		// the page and dialog selector is negligable. This could probably be speed up by
		// doing a similar parent node traversal to the one found in the inherited theme code above
		closestPageData: function( $target ) {
			return $target
				.closest( ':jqmData(role="page"), :jqmData(role="dialog")' )
				.data( "mobile-page" );
		},

		enhanceable: function( $set ) {
			return this.haveParents( $set, "enhance" );
		},

		hijackable: function( $set ) {
			return this.haveParents( $set, "ajax" );
		},

		haveParents: function( $set, attr ) {
			if ( !$.mobile.ignoreContentEnabled ) {
				return $set;
			}

			var count = $set.length,
				$newSet = $(),
				e, $element, excluded;

			for ( var i = 0; i < count; i++ ) {
				$element = $set.eq( i );
				excluded = false;
				e = $set[ i ];

				while ( e ) {
					var c = e.getAttribute ? e.getAttribute( "data-" + $.mobile.ns + attr ) : "";

					if ( c === "false" ) {
						excluded = true;
						break;
					}

					e = e.parentNode;
				}

				if ( !excluded ) {
					$newSet = $newSet.add( $element );
				}
			}

			return $newSet;
		},

		getScreenHeight: function() {
			// Native innerHeight returns more accurate value for this across platforms,
			// jQuery version is here as a normalized fallback for platforms like Symbian
			return window.innerHeight || $.mobile.window.height();
		}
	}, $.mobile );

	// Mobile version of data and removeData and hasData methods
	// ensures all data is set and retrieved using jQuery Mobile's data namespace
	$.fn.jqmData = function( prop, value ) {
		var result;
		if ( typeof prop !== "undefined" ) {
			if ( prop ) {
				prop = $.mobile.nsNormalize( prop );
			}

			// undefined is permitted as an explicit input for the second param
			// in this case it returns the value and does not set it to undefined
			if( arguments.length < 2 || value === undefined ){
				result = this.data( prop );
			} else {
				result = this.data( prop, value );
			}
		}
		return result;
	};

	$.jqmData = function( elem, prop, value ) {
		var result;
		if ( typeof prop !== "undefined" ) {
			result = $.data( elem, prop ? $.mobile.nsNormalize( prop ) : prop, value );
		}
		return result;
	};

	$.fn.jqmRemoveData = function( prop ) {
		return this.removeData( $.mobile.nsNormalize( prop ) );
	};

	$.jqmRemoveData = function( elem, prop ) {
		return $.removeData( elem, $.mobile.nsNormalize( prop ) );
	};

	$.fn.removeWithDependents = function() {
		$.removeWithDependents( this );
	};

	$.removeWithDependents = function( elem ) {
		var $elem = $( elem );

		( $elem.jqmData( 'dependents' ) || $() ).remove();
		$elem.remove();
	};

	$.fn.addDependents = function( newDependents ) {
		$.addDependents( $( this ), newDependents );
	};

	$.addDependents = function( elem, newDependents ) {
		var dependents = $( elem ).jqmData( 'dependents' ) || $();

		$( elem ).jqmData( 'dependents', $.merge( dependents, newDependents ) );
	};

	// note that this helper doesn't attempt to handle the callback
	// or setting of an html elements text, its only purpose is
	// to return the html encoded version of the text in all cases. (thus the name)
	$.fn.getEncodedText = function() {
		return $( "<div/>" ).text( $( this ).text() ).html();
	};

	// fluent helper function for the mobile namespaced equivalent
	$.fn.jqmEnhanceable = function() {
		return $.mobile.enhanceable( this );
	};

	$.fn.jqmHijackable = function() {
		return $.mobile.hijackable( this );
	};

	// Monkey-patching Sizzle to filter the :jqmData selector
	var oldFind = $.find,
		jqmDataRE = /:jqmData\(([^)]*)\)/g;

	$.find = function( selector, context, ret, extra ) {
		selector = selector.replace( jqmDataRE, "[data-" + ( $.mobile.ns || "" ) + "$1]" );

		return oldFind.call( this, selector, context, ret, extra );
	};

	$.extend( $.find, oldFind );

	$.find.matches = function( expr, set ) {
		return $.find( expr, null, null, set );
	};

	$.find.matchesSelector = function( node, expr ) {
		return $.find( expr, null, null, [ node ] ).length > 0;
	};
})( jQuery, this );


/*!
 * jQuery UI Widget v1.10.0pre - 2012-11-13 (ff055a0c353c3c8ce6e5bfa07ad7cb03e8885bc5)
 * http://jqueryui.com
 *
 * Copyright 2010, 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */
(function( $, undefined ) {

var uuid = 0,
	slice = Array.prototype.slice,
	_cleanData = $.cleanData;
$.cleanData = function( elems ) {
	for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
		try {
			$( elem ).triggerHandler( "remove" );
		// http://bugs.jquery.com/ticket/8235
		} catch( e ) {}
	}
	_cleanData( elems );
};

$.widget = function( name, base, prototype ) {
	var fullName, existingConstructor, constructor, basePrototype,
		namespace = name.split( "." )[ 0 ];

	name = name.split( "." )[ 1 ];
	fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	// create selector for plugin
	$.expr[ ":" ][ fullName.toLowerCase() ] = function( elem ) {
		return !!$.data( elem, fullName );
	};

	$[ namespace ] = $[ namespace ] || {};
	existingConstructor = $[ namespace ][ name ];
	constructor = $[ namespace ][ name ] = function( options, element ) {
		// allow instantiation without "new" keyword
		if ( !this._createWidget ) {
			return new constructor( options, element );
		}

		// allow instantiation without initializing for simple inheritance
		// must use "new" keyword (the code above always passes args)
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};
	// extend with the existing constructor to carry over any static properties
	$.extend( constructor, existingConstructor, {
		version: prototype.version,
		// copy the object used to create the prototype in case we need to
		// redefine the widget later
		_proto: $.extend( {}, prototype ),
		// track widgets that inherit from this widget in case this widget is
		// redefined after a widget inherits from it
		_childConstructors: []
	});

	basePrototype = new base();
	// we need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
	basePrototype.options = $.widget.extend( {}, basePrototype.options );
	$.each( prototype, function( prop, value ) {
		if ( $.isFunction( value ) ) {
			prototype[ prop ] = (function() {
				var _super = function() {
						return base.prototype[ prop ].apply( this, arguments );
					},
					_superApply = function( args ) {
						return base.prototype[ prop ].apply( this, args );
					};
				return function() {
					var __super = this._super,
						__superApply = this._superApply,
						returnValue;

					this._super = _super;
					this._superApply = _superApply;

					returnValue = value.apply( this, arguments );

					this._super = __super;
					this._superApply = __superApply;

					return returnValue;
				};
			})();
		}
	});
	constructor.prototype = $.widget.extend( basePrototype, {
		// TODO: remove support for widgetEventPrefix
		// always use the name + a colon as the prefix, e.g., draggable:start
		// don't prefix for widgets that aren't DOM-based
		widgetEventPrefix: existingConstructor ? basePrototype.widgetEventPrefix : name
	}, prototype, {
		constructor: constructor,
		namespace: namespace,
		widgetName: name,
		widgetFullName: fullName
	});

	// If this widget is being redefined then we need to find all widgets that
	// are inheriting from it and redefine all of them so that they inherit from
	// the new version of this widget. We're essentially trying to replace one
	// level in the prototype chain.
	if ( existingConstructor ) {
		$.each( existingConstructor._childConstructors, function( i, child ) {
			var childPrototype = child.prototype;

			// redefine the child widget using the same prototype that was
			// originally used, but inherit from the new version of the base
			$.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto );
		});
		// remove the list of existing child constructors from the old constructor
		// so the old child constructors can be garbage collected
		delete existingConstructor._childConstructors;
	} else {
		base._childConstructors.push( constructor );
	}

	$.widget.bridge( name, constructor );
};

$.widget.extend = function( target ) {
	var input = slice.call( arguments, 1 ),
		inputIndex = 0,
		inputLength = input.length,
		key,
		value;
	for ( ; inputIndex < inputLength; inputIndex++ ) {
		for ( key in input[ inputIndex ] ) {
			value = input[ inputIndex ][ key ];
			if ( input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {
				// Clone objects
				if ( $.isPlainObject( value ) ) {
					target[ key ] = $.isPlainObject( target[ key ] ) ?
						$.widget.extend( {}, target[ key ], value ) :
						// Don't extend strings, arrays, etc. with objects
						$.widget.extend( {}, value );
				// Copy everything else by reference
				} else {
					target[ key ] = value;
				}
			}
		}
	}
	return target;
};

$.widget.bridge = function( name, object ) {
	var fullName = object.prototype.widgetFullName || name;
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string",
			args = slice.call( arguments, 1 ),
			returnValue = this;

		// allow multiple hashes to be passed on init
		options = !isMethodCall && args.length ?
			$.widget.extend.apply( null, [ options ].concat(args) ) :
			options;

		if ( isMethodCall ) {
			this.each(function() {
				var methodValue,
					instance = $.data( this, fullName );
				if ( !instance ) {
					return $.error( "cannot call methods on " + name + " prior to initialization; " +
						"attempted to call method '" + options + "'" );
				}
				if ( !$.isFunction( instance[options] ) || options.charAt( 0 ) === "_" ) {
					return $.error( "no such method '" + options + "' for " + name + " widget instance" );
				}
				methodValue = instance[ options ].apply( instance, args );
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue && methodValue.jquery ?
						returnValue.pushStack( methodValue.get() ) :
						methodValue;
					return false;
				}
			});
		} else {
			this.each(function() {
				var instance = $.data( this, fullName );
				if ( instance ) {
					instance.option( options || {} )._init();
				} else {
					$.data( this, fullName, new object( options, this ) );
				}
			});
		}

		return returnValue;
	};
};

$.Widget = function( /* options, element */ ) {};
$.Widget._childConstructors = [];

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	defaultElement: "<div>",
	options: {
		disabled: false,

		// callbacks
		create: null
	},
	_createWidget: function( options, element ) {
		element = $( element || this.defaultElement || this )[ 0 ];
		this.element = $( element );
		this.uuid = uuid++;
		this.eventNamespace = "." + this.widgetName + this.uuid;
		this.options = $.widget.extend( {},
			this.options,
			this._getCreateOptions(),
			options );

		this.bindings = $();
		this.hoverable = $();
		this.focusable = $();

		if ( element !== this ) {
			$.data( element, this.widgetFullName, this );
			this._on( true, this.element, {
				remove: function( event ) {
					if ( event.target === element ) {
						this.destroy();
					}
				}
			});
			this.document = $( element.style ?
				// element within the document
				element.ownerDocument :
				// element is window or document
				element.document || element );
			this.window = $( this.document[0].defaultView || this.document[0].parentWindow );
		}

		this._create();
		this._trigger( "create", null, this._getCreateEventData() );
		this._init();
	},
	_getCreateOptions: $.noop,
	_getCreateEventData: $.noop,
	_create: $.noop,
	_init: $.noop,

	destroy: function() {
		this._destroy();
		// we can probably remove the unbind calls in 2.0
		// all event bindings should go through this._on()
		this.element
			.unbind( this.eventNamespace )
			// 1.9 BC for #7810
			// TODO remove dual storage
			.removeData( this.widgetName )
			.removeData( this.widgetFullName )
			// support: jquery <1.6.3
			// http://bugs.jquery.com/ticket/9413
			.removeData( $.camelCase( this.widgetFullName ) );
		this.widget()
			.unbind( this.eventNamespace )
			.removeAttr( "aria-disabled" )
			.removeClass(
				this.widgetFullName + "-disabled " +
				"ui-state-disabled" );

		// clean up events and states
		this.bindings.unbind( this.eventNamespace );
		this.hoverable.removeClass( "ui-state-hover" );
		this.focusable.removeClass( "ui-state-focus" );
	},
	_destroy: $.noop,

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key,
			parts,
			curOption,
			i;

		if ( arguments.length === 0 ) {
			// don't return a reference to the internal hash
			return $.widget.extend( {}, this.options );
		}

		if ( typeof key === "string" ) {
			// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
			options = {};
			parts = key.split( "." );
			key = parts.shift();
			if ( parts.length ) {
				curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
				for ( i = 0; i < parts.length - 1; i++ ) {
					curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
					curOption = curOption[ parts[ i ] ];
				}
				key = parts.pop();
				if ( value === undefined ) {
					return curOption[ key ] === undefined ? null : curOption[ key ];
				}
				curOption[ key ] = value;
			} else {
				if ( value === undefined ) {
					return this.options[ key ] === undefined ? null : this.options[ key ];
				}
				options[ key ] = value;
			}
		}

		this._setOptions( options );

		return this;
	},
	_setOptions: function( options ) {
		var key;

		for ( key in options ) {
			this._setOption( key, options[ key ] );
		}

		return this;
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this.widget()
				.toggleClass( this.widgetFullName + "-disabled ui-state-disabled", !!value )
				.attr( "aria-disabled", value );
			this.hoverable.removeClass( "ui-state-hover" );
			this.focusable.removeClass( "ui-state-focus" );
		}

		return this;
	},

	enable: function() {
		return this._setOption( "disabled", false );
	},
	disable: function() {
		return this._setOption( "disabled", true );
	},

	_on: function( suppressDisabledCheck, element, handlers ) {
		var delegateElement,
			instance = this;

		// no suppressDisabledCheck flag, shuffle arguments
		if ( typeof suppressDisabledCheck !== "boolean" ) {
			handlers = element;
			element = suppressDisabledCheck;
			suppressDisabledCheck = false;
		}

		// no element argument, shuffle and use this.element
		if ( !handlers ) {
			handlers = element;
			element = this.element;
			delegateElement = this.widget();
		} else {
			// accept selectors, DOM elements
			element = delegateElement = $( element );
			this.bindings = this.bindings.add( element );
		}

		$.each( handlers, function( event, handler ) {
			function handlerProxy() {
				// allow widgets to customize the disabled handling
				// - disabled as an array instead of boolean
				// - disabled class as method for disabling individual parts
				if ( !suppressDisabledCheck &&
						( instance.options.disabled === true ||
							$( this ).hasClass( "ui-state-disabled" ) ) ) {
					return;
				}
				return ( typeof handler === "string" ? instance[ handler ] : handler )
					.apply( instance, arguments );
			}

			// copy the guid so direct unbinding works
			if ( typeof handler !== "string" ) {
				handlerProxy.guid = handler.guid =
					handler.guid || handlerProxy.guid || $.guid++;
			}

			var match = event.match( /^(\w+)\s*(.*)$/ ),
				eventName = match[1] + instance.eventNamespace,
				selector = match[2];
			if ( selector ) {
				delegateElement.delegate( selector, eventName, handlerProxy );
			} else {
				element.bind( eventName, handlerProxy );
			}
		});
	},

	_off: function( element, eventName ) {
		eventName = (eventName || "").split( " " ).join( this.eventNamespace + " " ) + this.eventNamespace;
		element.unbind( eventName ).undelegate( eventName );
	},

	_delay: function( handler, delay ) {
		function handlerProxy() {
			return ( typeof handler === "string" ? instance[ handler ] : handler )
				.apply( instance, arguments );
		}
		var instance = this;
		return setTimeout( handlerProxy, delay || 0 );
	},

	_hoverable: function( element ) {
		this.hoverable = this.hoverable.add( element );
		this._on( element, {
			mouseenter: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-hover" );
			},
			mouseleave: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-hover" );
			}
		});
	},

	_focusable: function( element ) {
		this.focusable = this.focusable.add( element );
		this._on( element, {
			focusin: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-focus" );
			},
			focusout: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-focus" );
			}
		});
	},

	_trigger: function( type, event, data ) {
		var prop, orig,
			callback = this.options[ type ];

		data = data || {};
		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();
		// the original event may come from any element
		// so we need to reset the target on the new event
		event.target = this.element[ 0 ];

		// copy original event properties over to the new event
		orig = event.originalEvent;
		if ( orig ) {
			for ( prop in orig ) {
				if ( !( prop in event ) ) {
					event[ prop ] = orig[ prop ];
				}
			}
		}

		this.element.trigger( event, data );
		return !( $.isFunction( callback ) &&
			callback.apply( this.element[0], [ event ].concat( data ) ) === false ||
			event.isDefaultPrevented() );
	}
};

$.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {
	$.Widget.prototype[ "_" + method ] = function( element, options, callback ) {
		if ( typeof options === "string" ) {
			options = { effect: options };
		}
		var hasOptions,
			effectName = !options ?
				method :
				options === true || typeof options === "number" ?
					defaultEffect :
					options.effect || defaultEffect;
		options = options || {};
		if ( typeof options === "number" ) {
			options = { duration: options };
		}
		hasOptions = !$.isEmptyObject( options );
		options.complete = callback;
		if ( options.delay ) {
			element.delay( options.delay );
		}
		if ( hasOptions && $.effects && $.effects.effect[ effectName ] ) {
			element[ method ]( options );
		} else if ( effectName !== method && element[ effectName ] ) {
			element[ effectName ]( options.duration, options.easing, callback );
		} else {
			element.queue(function( next ) {
				$( this )[ method ]();
				if ( callback ) {
					callback.call( element[ 0 ] );
				}
				next();
			});
		}
	};
});

})( jQuery );

(function( $, undefined ) {

$.widget( "mobile.widget", {
	// decorate the parent _createWidget to trigger `widgetinit` for users
	// who wish to do post post `widgetcreate` alterations/additions
	//
	// TODO create a pull request for jquery ui to trigger this event
	// in the original _createWidget
	_createWidget: function() {
		$.Widget.prototype._createWidget.apply( this, arguments );
		this._trigger( 'init' );
	},

	_getCreateOptions: function() {

		var elem = this.element,
			options = {};

		$.each( this.options, function( option ) {

			var value = elem.jqmData( option.replace( /[A-Z]/g, function( c ) {
							return "-" + c.toLowerCase();
						})
					);

			if ( value !== undefined ) {
				options[ option ] = value;
			}
		});

		return options;
	},

	enhanceWithin: function( target, useKeepNative ) {
		this.enhance( $( this.options.initSelector, $( target )), useKeepNative );
	},

	enhance: function( targets, useKeepNative ) {
		var page, keepNative, $widgetElements = $( targets ), self = this;

		// if ignoreContentEnabled is set to true the framework should
		// only enhance the selected elements when they do NOT have a
		// parent with the data-namespace-ignore attribute
		$widgetElements = $.mobile.enhanceable( $widgetElements );

		if ( useKeepNative && $widgetElements.length ) {
			// TODO remove dependency on the page widget for the keepNative.
			// Currently the keepNative value is defined on the page prototype so
			// the method is as well
			page = $.mobile.closestPageData( $widgetElements );
			keepNative = ( page && page.keepNativeSelector()) || "";

			$widgetElements = $widgetElements.not( keepNative );
		}

		$widgetElements[ this.widgetName ]();
	},

	raise: function( msg ) {
		throw "Widget [" + this.widgetName + "]: " + msg;
	}
});

})( jQuery );


(function( $, window ) {
	// DEPRECATED
	// NOTE global mobile object settings
	$.extend( $.mobile, {
		// DEPRECATED Should the text be visble in the loading message?
		loadingMessageTextVisible: undefined,

		// DEPRECATED When the text is visible, what theme does the loading box use?
		loadingMessageTheme: undefined,

		// DEPRECATED default message setting
		loadingMessage: undefined,

		// DEPRECATED
		// Turn on/off page loading message. Theme doubles as an object argument
		// with the following shape: { theme: '', text: '', html: '', textVisible: '' }
		// NOTE that the $.mobile.loading* settings and params past the first are deprecated
		showPageLoadingMsg: function( theme, msgText, textonly ) {
			$.mobile.loading( 'show', theme, msgText, textonly );
		},

		// DEPRECATED
		hidePageLoadingMsg: function() {
			$.mobile.loading( 'hide' );
		},

		loading: function() {
			this.loaderWidget.loader.apply( this.loaderWidget, arguments );
		}
	});

	// TODO move loader class down into the widget settings
	var loaderClass = "ui-loader", $html = $( "html" ), $window = $.mobile.window;

	$.widget( "mobile.loader", {
		// NOTE if the global config settings are defined they will override these
		//      options
		options: {
			// the theme for the loading message
			theme: "a",

			// whether the text in the loading message is shown
			textVisible: false,

			// custom html for the inner content of the loading message
			html: "",

			// the text to be displayed when the popup is shown
			text: "loading"
		},

		defaultHtml: "<div class='" + loaderClass + "'>" +
			"<span class='ui-icon ui-icon-loading'></span>" +
			"<h1></h1>" +
			"</div>",

		// For non-fixed supportin browsers. Position at y center (if scrollTop supported), above the activeBtn (if defined), or just 100px from top
		fakeFixLoader: function() {
			var activeBtn = $( "." + $.mobile.activeBtnClass ).first();

			this.element
				.css({
					top: $.support.scrollTop && $window.scrollTop() + $window.height() / 2 ||
						activeBtn.length && activeBtn.offset().top || 100
				});
		},

		// check position of loader to see if it appears to be "fixed" to center
		// if not, use abs positioning
		checkLoaderPosition: function() {
			var offset = this.element.offset(),
				scrollTop = $window.scrollTop(),
				screenHeight = $.mobile.getScreenHeight();

			if ( offset.top < scrollTop || ( offset.top - scrollTop ) > screenHeight ) {
				this.element.addClass( "ui-loader-fakefix" );
				this.fakeFixLoader();
				$window
					.unbind( "scroll", this.checkLoaderPosition )
					.bind( "scroll", $.proxy( this.fakeFixLoader, this ) );
			}
		},

		resetHtml: function() {
			this.element.html( $( this.defaultHtml ).html() );
		},

		// Turn on/off page loading message. Theme doubles as an object argument
		// with the following shape: { theme: '', text: '', html: '', textVisible: '' }
		// NOTE that the $.mobile.loading* settings and params past the first are deprecated
		// TODO sweet jesus we need to break some of this out
		show: function( theme, msgText, textonly ) {
			var textVisible, message, $header, loadSettings;

			this.resetHtml();

			// use the prototype options so that people can set them globally at
			// mobile init. Consistency, it's what's for dinner
			if ( $.type(theme) === "object" ) {
				loadSettings = $.extend( {}, this.options, theme );

				// prefer object property from the param then the old theme setting
				theme = loadSettings.theme || $.mobile.loadingMessageTheme;
			} else {
				loadSettings = this.options;

				// here we prefer the them value passed as a string argument, then
				// we prefer the global option because we can't use undefined default
				// prototype options, then the prototype option
				theme = theme || $.mobile.loadingMessageTheme || loadSettings.theme;
			}

			// set the message text, prefer the param, then the settings object
			// then loading message
			message = msgText || $.mobile.loadingMessage || loadSettings.text;

			// prepare the dom
			$html.addClass( "ui-loading" );

			if ( $.mobile.loadingMessage !== false || loadSettings.html ) {
				// boolean values require a bit more work :P, supports object properties
				// and old settings
				if ( $.mobile.loadingMessageTextVisible !== undefined ) {
					textVisible = $.mobile.loadingMessageTextVisible;
				} else {
					textVisible = loadSettings.textVisible;
				}

				// add the proper css given the options (theme, text, etc)
				// Force text visibility if the second argument was supplied, or
				// if the text was explicitly set in the object args
				this.element.attr("class", loaderClass +
					" ui-corner-all ui-body-" + theme +
					" ui-loader-" + ( textVisible || msgText || theme.text ? "verbose" : "default" ) +
					( loadSettings.textonly || textonly ? " ui-loader-textonly" : "" ) );

				// TODO verify that jquery.fn.html is ok to use in both cases here
				//      this might be overly defensive in preventing unknowing xss
				// if the html attribute is defined on the loading settings, use that
				// otherwise use the fallbacks from above
				if ( loadSettings.html ) {
					this.element.html( loadSettings.html );
				} else {
					this.element.find( "h1" ).text( message );
				}

				// attach the loader to the DOM
				this.element.appendTo( $.mobile.pageContainer );

				// check that the loader is visible
				this.checkLoaderPosition();

				// on scroll check the loader position
				$window.bind( "scroll", $.proxy( this.checkLoaderPosition, this ) );
			}
		},

		hide: function() {
			$html.removeClass( "ui-loading" );

			if ( $.mobile.loadingMessage ) {
				this.element.removeClass( "ui-loader-fakefix" );
			}

			$.mobile.window.unbind( "scroll", this.fakeFixLoader );
			$.mobile.window.unbind( "scroll", this.checkLoaderPosition );
		}
	});

	$window.bind( 'pagecontainercreate', function() {
		$.mobile.loaderWidget = $.mobile.loaderWidget || $( $.mobile.loader.prototype.defaultHtml ).loader();
	});
})(jQuery, this);


// Script: jQuery hashchange event
// 
// *Version: 1.3, Last updated: 7/21/2010*
// 
// Project Home - http://benalman.com/projects/jquery-hashchange-plugin/
// GitHub       - http://github.com/cowboy/jquery-hashchange/
// Source       - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.js
// (Minified)   - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.min.js (0.8kb gzipped)
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Examples
// 
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
// 
// hashchange event - http://benalman.com/code/projects/jquery-hashchange/examples/hashchange/
// document.domain - http://benalman.com/code/projects/jquery-hashchange/examples/document_domain/
// 
// About: Support and Testing
// 
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
// 
// jQuery Versions - 1.2.6, 1.3.2, 1.4.1, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-4, Chrome 5-6, Safari 3.2-5,
//                   Opera 9.6-10.60, iPhone 3.1, Android 1.6-2.2, BlackBerry 4.6-5.
// Unit Tests      - http://benalman.com/code/projects/jquery-hashchange/unit/
// 
// About: Known issues
// 
// While this jQuery hashchange event implementation is quite stable and
// robust, there are a few unfortunate browser bugs surrounding expected
// hashchange event-based behaviors, independent of any JavaScript
// window.onhashchange abstraction. See the following examples for more
// information:
// 
// Chrome: Back Button - http://benalman.com/code/projects/jquery-hashchange/examples/bug-chrome-back-button/
// Firefox: Remote XMLHttpRequest - http://benalman.com/code/projects/jquery-hashchange/examples/bug-firefox-remote-xhr/
// WebKit: Back Button in an Iframe - http://benalman.com/code/projects/jquery-hashchange/examples/bug-webkit-hash-iframe/
// Safari: Back Button from a different domain - http://benalman.com/code/projects/jquery-hashchange/examples/bug-safari-back-from-diff-domain/
// 
// Also note that should a browser natively support the window.onhashchange 
// event, but not report that it does, the fallback polling loop will be used.
// 
// About: Release History
// 
// 1.3   - (7/21/2010) Reorganized IE6/7 Iframe code to make it more
//         "removable" for mobile-only development. Added IE6/7 document.title
//         support. Attempted to make Iframe as hidden as possible by using
//         techniques from http://www.paciellogroup.com/blog/?p=604. Added 
//         support for the "shortcut" format $(window).hashchange( fn ) and
//         $(window).hashchange() like jQuery provides for built-in events.
//         Renamed jQuery.hashchangeDelay to <jQuery.fn.hashchange.delay> and
//         lowered its default value to 50. Added <jQuery.fn.hashchange.domain>
//         and <jQuery.fn.hashchange.src> properties plus document-domain.html
//         file to address access denied issues when setting document.domain in
//         IE6/7.
// 1.2   - (2/11/2010) Fixed a bug where coming back to a page using this plugin
//         from a page on another domain would cause an error in Safari 4. Also,
//         IE6/7 Iframe is now inserted after the body (this actually works),
//         which prevents the page from scrolling when the event is first bound.
//         Event can also now be bound before DOM ready, but it won't be usable
//         before then in IE6/7.
// 1.1   - (1/21/2010) Incorporated document.documentMode test to fix IE8 bug
//         where browser version is incorrectly reported as 8.0, despite
//         inclusion of the X-UA-Compatible IE=EmulateIE7 meta tag.
// 1.0   - (1/9/2010) Initial Release. Broke out the jQuery BBQ event.special
//         window.onhashchange functionality into a separate plugin for users
//         who want just the basic event & back button support, without all the
//         extra awesomeness that BBQ provides. This plugin will be included as
//         part of jQuery BBQ, but also be available separately.

(function( $, window, undefined ) {
  // Reused string.
  var str_hashchange = 'hashchange',
    
    // Method / object references.
    doc = document,
    fake_onhashchange,
    special = $.event.special,
    
    // Does the browser support window.onhashchange? Note that IE8 running in
    // IE7 compatibility mode reports true for 'onhashchange' in window, even
    // though the event isn't supported, so also test document.documentMode.
    doc_mode = doc.documentMode,
    supports_onhashchange = 'on' + str_hashchange in window && ( doc_mode === undefined || doc_mode > 7 );
  
  // Get location.hash (or what you'd expect location.hash to be) sans any
  // leading #. Thanks for making this necessary, Firefox!
  function get_fragment( url ) {
    url = url || location.href;
    return '#' + url.replace( /^[^#]*#?(.*)$/, '$1' );
  };
  
  // Method: jQuery.fn.hashchange
  // 
  // Bind a handler to the window.onhashchange event or trigger all bound
  // window.onhashchange event handlers. This behavior is consistent with
  // jQuery's built-in event handlers.
  // 
  // Usage:
  // 
  // > jQuery(window).hashchange( [ handler ] );
  // 
  // Arguments:
  // 
  //  handler - (Function) Optional handler to be bound to the hashchange
  //    event. This is a "shortcut" for the more verbose form:
  //    jQuery(window).bind( 'hashchange', handler ). If handler is omitted,
  //    all bound window.onhashchange event handlers will be triggered. This
  //    is a shortcut for the more verbose
  //    jQuery(window).trigger( 'hashchange' ). These forms are described in
  //    the <hashchange event> section.
  // 
  // Returns:
  // 
  //  (jQuery) The initial jQuery collection of elements.
  
  // Allow the "shortcut" format $(elem).hashchange( fn ) for binding and
  // $(elem).hashchange() for triggering, like jQuery does for built-in events.
  $.fn[ str_hashchange ] = function( fn ) {
    return fn ? this.bind( str_hashchange, fn ) : this.trigger( str_hashchange );
  };
  
  // Property: jQuery.fn.hashchange.delay
  // 
  // The numeric interval (in milliseconds) at which the <hashchange event>
  // polling loop executes. Defaults to 50.
  
  // Property: jQuery.fn.hashchange.domain
  // 
  // If you're setting document.domain in your JavaScript, and you want hash
  // history to work in IE6/7, not only must this property be set, but you must
  // also set document.domain BEFORE jQuery is loaded into the page. This
  // property is only applicable if you are supporting IE6/7 (or IE8 operating
  // in "IE7 compatibility" mode).
  // 
  // In addition, the <jQuery.fn.hashchange.src> property must be set to the
  // path of the included "document-domain.html" file, which can be renamed or
  // modified if necessary (note that the document.domain specified must be the
  // same in both your main JavaScript as well as in this file).
  // 
  // Usage:
  // 
  // jQuery.fn.hashchange.domain = document.domain;
  
  // Property: jQuery.fn.hashchange.src
  // 
  // If, for some reason, you need to specify an Iframe src file (for example,
  // when setting document.domain as in <jQuery.fn.hashchange.domain>), you can
  // do so using this property. Note that when using this property, history
  // won't be recorded in IE6/7 until the Iframe src file loads. This property
  // is only applicable if you are supporting IE6/7 (or IE8 operating in "IE7
  // compatibility" mode).
  // 
  // Usage:
  // 
  // jQuery.fn.hashchange.src = 'path/to/file.html';
  
  $.fn[ str_hashchange ].delay = 50;
  /*
  $.fn[ str_hashchange ].domain = null;
  $.fn[ str_hashchange ].src = null;
  */
  
  // Event: hashchange event
  // 
  // Fired when location.hash changes. In browsers that support it, the native
  // HTML5 window.onhashchange event is used, otherwise a polling loop is
  // initialized, running every <jQuery.fn.hashchange.delay> milliseconds to
  // see if the hash has changed. In IE6/7 (and IE8 operating in "IE7
  // compatibility" mode), a hidden Iframe is created to allow the back button
  // and hash-based history to work.
  // 
  // Usage as described in <jQuery.fn.hashchange>:
  // 
  // > // Bind an event handler.
  // > jQuery(window).hashchange( function(e) {
  // >   var hash = location.hash;
  // >   ...
  // > });
  // > 
  // > // Manually trigger the event handler.
  // > jQuery(window).hashchange();
  // 
  // A more verbose usage that allows for event namespacing:
  // 
  // > // Bind an event handler.
  // > jQuery(window).bind( 'hashchange', function(e) {
  // >   var hash = location.hash;
  // >   ...
  // > });
  // > 
  // > // Manually trigger the event handler.
  // > jQuery(window).trigger( 'hashchange' );
  // 
  // Additional Notes:
  // 
  // * The polling loop and Iframe are not created until at least one handler
  //   is actually bound to the 'hashchange' event.
  // * If you need the bound handler(s) to execute immediately, in cases where
  //   a location.hash exists on page load, via bookmark or page refresh for
  //   example, use jQuery(window).hashchange() or the more verbose 
  //   jQuery(window).trigger( 'hashchange' ).
  // * The event can be bound before DOM ready, but since it won't be usable
  //   before then in IE6/7 (due to the necessary Iframe), recommended usage is
  //   to bind it inside a DOM ready handler.
  
  // Override existing $.event.special.hashchange methods (allowing this plugin
  // to be defined after jQuery BBQ in BBQ's source code).
  special[ str_hashchange ] = $.extend( special[ str_hashchange ], {
    
    // Called only when the first 'hashchange' event is bound to window.
    setup: function() {
      // If window.onhashchange is supported natively, there's nothing to do..
      if ( supports_onhashchange ) { return false; }
      
      // Otherwise, we need to create our own. And we don't want to call this
      // until the user binds to the event, just in case they never do, since it
      // will create a polling loop and possibly even a hidden Iframe.
      $( fake_onhashchange.start );
    },
    
    // Called only when the last 'hashchange' event is unbound from window.
    teardown: function() {
      // If window.onhashchange is supported natively, there's nothing to do..
      if ( supports_onhashchange ) { return false; }
      
      // Otherwise, we need to stop ours (if possible).
      $( fake_onhashchange.stop );
    }
    
  });
  
  // fake_onhashchange does all the work of triggering the window.onhashchange
  // event for browsers that don't natively support it, including creating a
  // polling loop to watch for hash changes and in IE 6/7 creating a hidden
  // Iframe to enable back and forward.
  fake_onhashchange = (function() {
    var self = {},
      timeout_id,
      
      // Remember the initial hash so it doesn't get triggered immediately.
      last_hash = get_fragment(),
      
      fn_retval = function( val ) { return val; },
      history_set = fn_retval,
      history_get = fn_retval;
    
    // Start the polling loop.
    self.start = function() {
      timeout_id || poll();
    };
    
    // Stop the polling loop.
    self.stop = function() {
      timeout_id && clearTimeout( timeout_id );
      timeout_id = undefined;
    };
    
    // This polling loop checks every $.fn.hashchange.delay milliseconds to see
    // if location.hash has changed, and triggers the 'hashchange' event on
    // window when necessary.
    function poll() {
      var hash = get_fragment(),
        history_hash = history_get( last_hash );
      
      if ( hash !== last_hash ) {
        history_set( last_hash = hash, history_hash );
        
        $(window).trigger( str_hashchange );
        
      } else if ( history_hash !== last_hash ) {
        location.href = location.href.replace( /#.*/, '' ) + history_hash;
      }
      
      timeout_id = setTimeout( poll, $.fn[ str_hashchange ].delay );
    };
    
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // vvvvvvvvvvvvvvvvvvv REMOVE IF NOT SUPPORTING IE6/7/8 vvvvvvvvvvvvvvvvvvv
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    window.attachEvent && !window.addEventListener && !supports_onhashchange && (function() {
      // Not only do IE6/7 need the "magical" Iframe treatment, but so does IE8
      // when running in "IE7 compatibility" mode.
      
      var iframe,
        iframe_src;
      
      // When the event is bound and polling starts in IE 6/7, create a hidden
      // Iframe for history handling.
      self.start = function() {
        if ( !iframe ) {
          iframe_src = $.fn[ str_hashchange ].src;
          iframe_src = iframe_src && iframe_src + get_fragment();
          
          // Create hidden Iframe. Attempt to make Iframe as hidden as possible
          // by using techniques from http://www.paciellogroup.com/blog/?p=604.
          iframe = $('<iframe tabindex="-1" title="empty"/>').hide()
            
            // When Iframe has completely loaded, initialize the history and
            // start polling.
            .one( 'load', function() {
              iframe_src || history_set( get_fragment() );
              poll();
            })
            
            // Load Iframe src if specified, otherwise nothing.
            .attr( 'src', iframe_src || 'javascript:0' )
            
            // Append Iframe after the end of the body to prevent unnecessary
            // initial page scrolling (yes, this works).
            .insertAfter( 'body' )[0].contentWindow;
          
          // Whenever `document.title` changes, update the Iframe's title to
          // prettify the back/next history menu entries. Since IE sometimes
          // errors with "Unspecified error" the very first time this is set
          // (yes, very useful) wrap this with a try/catch block.
          doc.onpropertychange = function() {
            try {
              if ( event.propertyName === 'title' ) {
                iframe.document.title = doc.title;
              }
            } catch(e) {}
          };
          
        }
      };
      
      // Override the "stop" method since an IE6/7 Iframe was created. Even
      // if there are no longer any bound event handlers, the polling loop
      // is still necessary for back/next to work at all!
      self.stop = fn_retval;
      
      // Get history by looking at the hidden Iframe's location.hash.
      history_get = function() {
        return get_fragment( iframe.location.href );
      };
      
      // Set a new history item by opening and then closing the Iframe
      // document, *then* setting its location.hash. If document.domain has
      // been set, update that as well.
      history_set = function( hash, history_hash ) {
        var iframe_doc = iframe.document,
          domain = $.fn[ str_hashchange ].domain;
        
        if ( hash !== history_hash ) {
          // Update Iframe with any initial `document.title` that might be set.
          iframe_doc.title = doc.title;
          
          // Opening the Iframe's document after it has been closed is what
          // actually adds a history entry.
          iframe_doc.open();
          
          // Set document.domain for the Iframe document as well, if necessary.
          domain && iframe_doc.write( '<script>document.domain="' + domain + '"</script>' );
          
          iframe_doc.close();
          
          // Update the Iframe's hash, for great justice.
          iframe.location.hash = hash;
        }
      };
      
    })();
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // ^^^^^^^^^^^^^^^^^^^ REMOVE IF NOT SUPPORTING IE6/7/8 ^^^^^^^^^^^^^^^^^^^
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    
    return self;
  })();
  
})(jQuery,this);

(function( $, undefined ) {

	/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
	window.matchMedia = window.matchMedia || (function( doc, undefined ) {

		

		var bool,
			docElem = doc.documentElement,
			refNode = docElem.firstElementChild || docElem.firstChild,
			// fakeBody required for <FF4 when executed in <head>
			fakeBody = doc.createElement( "body" ),
			div = doc.createElement( "div" );

		div.id = "mq-test-1";
		div.style.cssText = "position:absolute;top:-100em";
		fakeBody.style.background = "none";
		fakeBody.appendChild(div);

		return function(q){

			div.innerHTML = "&shy;<style media=\"" + q + "\"> #mq-test-1 { width: 42px; }</style>";

			docElem.insertBefore( fakeBody, refNode );
			bool = div.offsetWidth === 42;
			docElem.removeChild( fakeBody );

			return {
				matches: bool,
				media: q
			};

		};

	}( document ));

	// $.mobile.media uses matchMedia to return a boolean.
	$.mobile.media = function( q ) {
		return window.matchMedia( q ).matches;
	};

})(jQuery);

	(function( $, undefined ) {
		var support = {
			touch: "ontouchend" in document
		};

		$.mobile.support = $.mobile.support || {};
		$.extend( $.support, support );
		$.extend( $.mobile.support, support );
	}( jQuery ));

	(function( $, undefined ) {
		$.extend( $.support, {
			orientation: "orientation" in window && "onorientationchange" in window
		});
	}( jQuery ));

(function( $, undefined ) {

// thx Modernizr
function propExists( prop ) {
	var uc_prop = prop.charAt( 0 ).toUpperCase() + prop.substr( 1 ),
		props = ( prop + " " + vendors.join( uc_prop + " " ) + uc_prop ).split( " " );

	for ( var v in props ) {
		if ( fbCSS[ props[ v ] ] !== undefined ) {
			return true;
		}
	}
}

var fakeBody = $( "<body>" ).prependTo( "html" ),
	fbCSS = fakeBody[ 0 ].style,
	vendors = [ "Webkit", "Moz", "O" ],
	webos = "palmGetResource" in window, //only used to rule out scrollTop
	opera = window.opera,
	operamini = window.operamini && ({}).toString.call( window.operamini ) === "[object OperaMini]",
	bb = window.blackberry && !propExists( "-webkit-transform" ); //only used to rule out box shadow, as it's filled opaque on BB 5 and lower


function validStyle( prop, value, check_vend ) {
	var div = document.createElement( 'div' ),
		uc = function( txt ) {
			return txt.charAt( 0 ).toUpperCase() + txt.substr( 1 );
		},
		vend_pref = function( vend ) {
			if( vend === "" ) {
				return "";
			} else {
				return  "-" + vend.charAt( 0 ).toLowerCase() + vend.substr( 1 ) + "-";
			}
		},
		check_style = function( vend ) {
			var vend_prop = vend_pref( vend ) + prop + ": " + value + ";",
				uc_vend = uc( vend ),
				propStyle = uc_vend + ( uc_vend === "" ? prop : uc( prop ) );

			div.setAttribute( "style", vend_prop );

			if ( !!div.style[ propStyle ] ) {
				ret = true;
			}
		},
		check_vends = check_vend ? check_vend : vendors,
		ret;

	for( var i = 0; i < check_vends.length; i++ ) {
		check_style( check_vends[i] );
	}
	return !!ret;
}

function transform3dTest() {
	var mqProp = "transform-3d",
		// Because the `translate3d` test below throws false positives in Android:
		ret = $.mobile.media( "(-" + vendors.join( "-" + mqProp + "),(-" ) + "-" + mqProp + "),(" + mqProp + ")" );

	if( ret ) {
		return !!ret;
	}

	var el = document.createElement( "div" ),
		transforms = {
			// We’re omitting Opera for the time being; MS uses unprefixed.
			'MozTransform':'-moz-transform',
			'transform':'transform'
		};

	fakeBody.append( el );

	for ( var t in transforms ) {
		if( el.style[ t ] !== undefined ){
			el.style[ t ] = 'translate3d( 100px, 1px, 1px )';
			ret = window.getComputedStyle( el ).getPropertyValue( transforms[ t ] );
		}
	}
	return ( !!ret && ret !== "none" );
}

// Test for dynamic-updating base tag support ( allows us to avoid href,src attr rewriting )
function baseTagTest() {
	var fauxBase = location.protocol + "//" + location.host + location.pathname + "ui-dir/",
		base = $( "head base" ),
		fauxEle = null,
		href = "",
		link, rebase;

	if ( !base.length ) {
		base = fauxEle = $( "<base>", { "href": fauxBase }).appendTo( "head" );
	} else {
		href = base.attr( "href" );
	}

	link = $( "<a href='testurl' />" ).prependTo( fakeBody );
	rebase = link[ 0 ].href;
	base[ 0 ].href = href || location.pathname;

	if ( fauxEle ) {
		fauxEle.remove();
	}
	return rebase.indexOf( fauxBase ) === 0;
}

// Thanks Modernizr
function cssPointerEventsTest() {
	var element = document.createElement( 'x' ),
		documentElement = document.documentElement,
		getComputedStyle = window.getComputedStyle,
		supports;

	if ( !( 'pointerEvents' in element.style ) ) {
		return false;
	}

	element.style.pointerEvents = 'auto';
	element.style.pointerEvents = 'x';
	documentElement.appendChild( element );
	supports = getComputedStyle &&
	getComputedStyle( element, '' ).pointerEvents === 'auto';
	documentElement.removeChild( element );
	return !!supports;
}

function boundingRect() {
	var div = document.createElement( "div" );
	return typeof div.getBoundingClientRect !== "undefined";
}

// non-UA-based IE version check by James Padolsey, modified by jdalton - from http://gist.github.com/527683
// allows for inclusion of IE 6+, including Windows Mobile 7
$.extend( $.mobile, { browser: {} } );
$.mobile.browser.oldIE = (function() {
	var v = 3,
		div = document.createElement( "div" ),
		a = div.all || [];

	do {
		div.innerHTML = "<!--[if gt IE " + ( ++v ) + "]><br><![endif]-->";
	} while( a[0] );

	return v > 4 ? v : !v;
})();

function fixedPosition() {
	var w = window,
		ua = navigator.userAgent,
		platform = navigator.platform,
		// Rendering engine is Webkit, and capture major version
		wkmatch = ua.match( /AppleWebKit\/([0-9]+)/ ),
		wkversion = !!wkmatch && wkmatch[ 1 ],
		ffmatch = ua.match( /Fennec\/([0-9]+)/ ),
		ffversion = !!ffmatch && ffmatch[ 1 ],
		operammobilematch = ua.match( /Opera Mobi\/([0-9]+)/ ),
		omversion = !!operammobilematch && operammobilematch[ 1 ];

	if(
		// iOS 4.3 and older : Platform is iPhone/Pad/Touch and Webkit version is less than 534 (ios5)
		( ( platform.indexOf( "iPhone" ) > -1 || platform.indexOf( "iPad" ) > -1  || platform.indexOf( "iPod" ) > -1 ) && wkversion && wkversion < 534 ) ||
		// Opera Mini
		( w.operamini && ({}).toString.call( w.operamini ) === "[object OperaMini]" ) ||
		( operammobilematch && omversion < 7458 )	||
		//Android lte 2.1: Platform is Android and Webkit version is less than 533 (Android 2.2)
		( ua.indexOf( "Android" ) > -1 && wkversion && wkversion < 533 ) ||
		// Firefox Mobile before 6.0 -
		( ffversion && ffversion < 6 ) ||
		// WebOS less than 3
		( "palmGetResource" in window && wkversion && wkversion < 534 )	||
		// MeeGo
		( ua.indexOf( "MeeGo" ) > -1 && ua.indexOf( "NokiaBrowser/8.5.0" ) > -1 ) ) {
		return false;
	}

	return true;
}

$.extend( $.support, {
	cssTransitions: "WebKitTransitionEvent" in window ||
		validStyle( 'transition', 'height 100ms linear', [ "Webkit", "Moz", "" ] ) &&
		!$.mobile.browser.oldIE && !opera,

	// Note, Chrome for iOS has an extremely quirky implementation of popstate.
	// We've chosen to take the shortest path to a bug fix here for issue #5426
	// See the following link for information about the regex chosen
	// https://developers.google.com/chrome/mobile/docs/user-agent#chrome_for_ios_user-agent
	pushState: "pushState" in history &&
		"replaceState" in history &&
		( window.navigator.userAgent.search(/CriOS/) === -1 ),

	mediaquery: $.mobile.media( "only all" ),
	cssPseudoElement: !!propExists( "content" ),
	touchOverflow: !!propExists( "overflowScrolling" ),
	cssTransform3d: transform3dTest(),
	boxShadow: !!propExists( "boxShadow" ) && !bb,
	fixedPosition: fixedPosition(),
	scrollTop: ("pageXOffset" in window ||
		"scrollTop" in document.documentElement ||
		"scrollTop" in fakeBody[ 0 ]) && !webos && !operamini,

	dynamicBaseTag: baseTagTest(),
	cssPointerEvents: cssPointerEventsTest(),
	boundingRect: boundingRect()
});

fakeBody.remove();


// $.mobile.ajaxBlacklist is used to override ajaxEnabled on platforms that have known conflicts with hash history updates (BB5, Symbian)
// or that generally work better browsing in regular http for full page refreshes (Opera Mini)
// Note: This detection below is used as a last resort.
// We recommend only using these detection methods when all other more reliable/forward-looking approaches are not possible
var nokiaLTE7_3 = (function() {

	var ua = window.navigator.userAgent;

	//The following is an attempt to match Nokia browsers that are running Symbian/s60, with webkit, version 7.3 or older
	return ua.indexOf( "Nokia" ) > -1 &&
			( ua.indexOf( "Symbian/3" ) > -1 || ua.indexOf( "Series60/5" ) > -1 ) &&
			ua.indexOf( "AppleWebKit" ) > -1 &&
			ua.match( /(BrowserNG|NokiaBrowser)\/7\.[0-3]/ );
})();

// Support conditions that must be met in order to proceed
// default enhanced qualifications are media query support OR IE 7+

$.mobile.gradeA = function() {
	return ( $.support.mediaquery || $.mobile.browser.oldIE && $.mobile.browser.oldIE >= 7 ) && ( $.support.boundingRect || $.fn.jquery.match(/1\.[0-7+]\.[0-9+]?/) !== null );
};

$.mobile.ajaxBlacklist =
			// BlackBerry browsers, pre-webkit
			window.blackberry && !window.WebKitPoint ||
			// Opera Mini
			operamini ||
			// Symbian webkits pre 7.3
			nokiaLTE7_3;

// Lastly, this workaround is the only way we've found so far to get pre 7.3 Symbian webkit devices
// to render the stylesheets when they're referenced before this script, as we'd recommend doing.
// This simply reappends the CSS in place, which for some reason makes it apply
if ( nokiaLTE7_3 ) {
	$(function() {
		$( "head link[rel='stylesheet']" ).attr( "rel", "alternate stylesheet" ).attr( "rel", "stylesheet" );
	});
}

// For ruling out shadows via css
if ( !$.support.boxShadow ) {
	$( "html" ).addClass( "ui-mobile-nosupport-boxshadow" );
}

})( jQuery );


(function( $, undefined ) {
	var $win = $.mobile.window, self, history;

	$.event.special.navigate = self = {
		bound: false,

		pushStateEnabled: true,

		originalEventName: undefined,

		// If pushstate support is present and push state support is defined to
		// be true on the mobile namespace.
		isPushStateEnabled: function() {
			return $.support.pushState &&
				$.mobile.pushStateEnabled === true &&
				this.isHashChangeEnabled();
		},

		// !! assumes mobile namespace is present
		isHashChangeEnabled: function() {
			return $.mobile.hashListeningEnabled === true;
		},

		// TODO a lot of duplication between popstate and hashchange
		popstate: function( event ) {
			var newEvent = new $.Event( "navigate" ),
				beforeNavigate = new $.Event( "beforenavigate" ),
				state = event.originalEvent.state || {},
				href = location.href;

			$win.trigger( beforeNavigate );

			if( beforeNavigate.isDefaultPrevented() ){
				return;
			}

			if( event.historyState ){
				$.extend(state, event.historyState);
			}

			// Make sure the original event is tracked for the end
			// user to inspect incase they want to do something special
			newEvent.originalEvent = event;

			// NOTE we let the current stack unwind because any assignment to
			//      location.hash will stop the world and run this event handler. By
			//      doing this we create a similar behavior to hashchange on hash
			//      assignment
			setTimeout(function() {
				$win.trigger( newEvent, {
					state: state
				});
			}, 0);
		},

		hashchange: function( event, data ) {
			var newEvent = new $.Event( "navigate" ),
				beforeNavigate = new $.Event( "beforenavigate" );

			$win.trigger( beforeNavigate );

			if( beforeNavigate.isDefaultPrevented() ){
				return;
			}

			// Make sure the original event is tracked for the end
			// user to inspect incase they want to do something special
			newEvent.originalEvent = event;

			// Trigger the hashchange with state provided by the user
			// that altered the hash
			$win.trigger( newEvent, {
				// Users that want to fully normalize the two events
				// will need to do history management down the stack and
				// add the state to the event before this binding is fired
				// TODO consider allowing for the explicit addition of callbacks
				//      to be fired before this value is set to avoid event timing issues
				state: event.hashchangeState || {}
			});
		},

		// TODO We really only want to set this up once
		//      but I'm not clear if there's a beter way to achieve
		//      this with the jQuery special event structure
		setup: function( data, namespaces ) {
			if( self.bound ) {
				return;
			}

			self.bound = true;

			if( self.isPushStateEnabled() ) {
				self.originalEventName = "popstate";
				$win.bind( "popstate.navigate", self.popstate );
			} else if ( self.isHashChangeEnabled() ){
				self.originalEventName = "hashchange";
				$win.bind( "hashchange.navigate", self.hashchange );
			}
		}
	};
})( jQuery );



(function( $, undefined ) {
		var path, documentBase, $base, dialogHashKey = "&ui-state=dialog";

		$.mobile.path = path = {
			uiStateKey: "&ui-state",

			// This scary looking regular expression parses an absolute URL or its relative
			// variants (protocol, site, document, query, and hash), into the various
			// components (protocol, host, path, query, fragment, etc that make up the
			// URL as well as some other commonly used sub-parts. When used with RegExp.exec()
			// or String.match, it parses the URL into a results array that looks like this:
			//
			//     [0]: http://jblas:password@mycompany.com:8080/mail/inbox?msg=1234&type=unread#msg-content
			//     [1]: http://jblas:password@mycompany.com:8080/mail/inbox?msg=1234&type=unread
			//     [2]: http://jblas:password@mycompany.com:8080/mail/inbox
			//     [3]: http://jblas:password@mycompany.com:8080
			//     [4]: http:
			//     [5]: //
			//     [6]: jblas:password@mycompany.com:8080
			//     [7]: jblas:password
			//     [8]: jblas
			//     [9]: password
			//    [10]: mycompany.com:8080
			//    [11]: mycompany.com
			//    [12]: 8080
			//    [13]: /mail/inbox
			//    [14]: /mail/
			//    [15]: inbox
			//    [16]: ?msg=1234&type=unread
			//    [17]: #msg-content
			//
			urlParseRE: /^\s*(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,

			// Abstraction to address xss (Issue #4787) by removing the authority in
			// browsers that auto	decode it. All references to location.href should be
			// replaced with a call to this method so that it can be dealt with properly here
			getLocation: function( url ) {
				var uri = url ? this.parseUrl( url ) : location,
					hash = this.parseUrl( url || location.href ).hash;

				// mimic the browser with an empty string when the hash is empty
				hash = hash === "#" ? "" : hash;

				// Make sure to parse the url or the location object for the hash because using location.hash
				// is autodecoded in firefox, the rest of the url should be from the object (location unless
				// we're testing) to avoid the inclusion of the authority
				return uri.protocol + "//" + uri.host + uri.pathname + uri.search + hash;
			},

			parseLocation: function() {
				return this.parseUrl( this.getLocation() );
			},

			//Parse a URL into a structure that allows easy access to
			//all of the URL components by name.
			parseUrl: function( url ) {
				// If we're passed an object, we'll assume that it is
				// a parsed url object and just return it back to the caller.
				if ( $.type( url ) === "object" ) {
					return url;
				}

				var matches = path.urlParseRE.exec( url || "" ) || [];

					// Create an object that allows the caller to access the sub-matches
					// by name. Note that IE returns an empty string instead of undefined,
					// like all other browsers do, so we normalize everything so its consistent
					// no matter what browser we're running on.
					return {
						href:         matches[  0 ] || "",
						hrefNoHash:   matches[  1 ] || "",
						hrefNoSearch: matches[  2 ] || "",
						domain:       matches[  3 ] || "",
						protocol:     matches[  4 ] || "",
						doubleSlash:  matches[  5 ] || "",
						authority:    matches[  6 ] || "",
						username:     matches[  8 ] || "",
						password:     matches[  9 ] || "",
						host:         matches[ 10 ] || "",
						hostname:     matches[ 11 ] || "",
						port:         matches[ 12 ] || "",
						pathname:     matches[ 13 ] || "",
						directory:    matches[ 14 ] || "",
						filename:     matches[ 15 ] || "",
						search:       matches[ 16 ] || "",
						hash:         matches[ 17 ] || ""
					};
			},

			//Turn relPath into an asbolute path. absPath is
			//an optional absolute path which describes what
			//relPath is relative to.
			makePathAbsolute: function( relPath, absPath ) {
				if ( relPath && relPath.charAt( 0 ) === "/" ) {
					return relPath;
				}

				relPath = relPath || "";
				absPath = absPath ? absPath.replace( /^\/|(\/[^\/]*|[^\/]+)$/g, "" ) : "";

				var absStack = absPath ? absPath.split( "/" ) : [],
					relStack = relPath.split( "/" );
				for ( var i = 0; i < relStack.length; i++ ) {
					var d = relStack[ i ];
					switch ( d ) {
						case ".":
							break;
						case "..":
							if ( absStack.length ) {
								absStack.pop();
							}
							break;
						default:
							absStack.push( d );
							break;
					}
				}
				return "/" + absStack.join( "/" );
			},

			//Returns true if both urls have the same domain.
			isSameDomain: function( absUrl1, absUrl2 ) {
				return path.parseUrl( absUrl1 ).domain === path.parseUrl( absUrl2 ).domain;
			},

			//Returns true for any relative variant.
			isRelativeUrl: function( url ) {
				// All relative Url variants have one thing in common, no protocol.
				return path.parseUrl( url ).protocol === "";
			},

			//Returns true for an absolute url.
			isAbsoluteUrl: function( url ) {
				return path.parseUrl( url ).protocol !== "";
			},

			//Turn the specified realtive URL into an absolute one. This function
			//can handle all relative variants (protocol, site, document, query, fragment).
			makeUrlAbsolute: function( relUrl, absUrl ) {
				if ( !path.isRelativeUrl( relUrl ) ) {
					return relUrl;
				}

				if ( absUrl === undefined ) {
					absUrl = this.documentBase;
				}

				var relObj = path.parseUrl( relUrl ),
					absObj = path.parseUrl( absUrl ),
					protocol = relObj.protocol || absObj.protocol,
					doubleSlash = relObj.protocol ? relObj.doubleSlash : ( relObj.doubleSlash || absObj.doubleSlash ),
					authority = relObj.authority || absObj.authority,
					hasPath = relObj.pathname !== "",
					pathname = path.makePathAbsolute( relObj.pathname || absObj.filename, absObj.pathname ),
					search = relObj.search || ( !hasPath && absObj.search ) || "",
					hash = relObj.hash;

				return protocol + doubleSlash + authority + pathname + search + hash;
			},

			//Add search (aka query) params to the specified url.
			addSearchParams: function( url, params ) {
				var u = path.parseUrl( url ),
					p = ( typeof params === "object" ) ? $.param( params ) : params,
					s = u.search || "?";
				return u.hrefNoSearch + s + ( s.charAt( s.length - 1 ) !== "?" ? "&" : "" ) + p + ( u.hash || "" );
			},

			convertUrlToDataUrl: function( absUrl ) {
				var u = path.parseUrl( absUrl );
				if ( path.isEmbeddedPage( u ) ) {
					// For embedded pages, remove the dialog hash key as in getFilePath(),
					// and remove otherwise the Data Url won't match the id of the embedded Page.
					return u.hash
						.split( dialogHashKey )[0]
						.replace( /^#/, "" )
						.replace( /\?.*$/, "" );
				} else if ( path.isSameDomain( u, this.documentBase ) ) {
					return u.hrefNoHash.replace( this.documentBase.domain, "" ).split( dialogHashKey )[0];
				}

				return window.decodeURIComponent(absUrl);
			},

			//get path from current hash, or from a file path
			get: function( newPath ) {
				if ( newPath === undefined ) {
					newPath = path.parseLocation().hash;
				}
				return path.stripHash( newPath ).replace( /[^\/]*\.[^\/*]+$/, '' );
			},

			//set location hash to path
			set: function( path ) {
				location.hash = path;
			},

			//test if a given url (string) is a path
			//NOTE might be exceptionally naive
			isPath: function( url ) {
				return ( /\// ).test( url );
			},

			//return a url path with the window's location protocol/hostname/pathname removed
			clean: function( url ) {
				return url.replace( this.documentBase.domain, "" );
			},

			//just return the url without an initial #
			stripHash: function( url ) {
				return url.replace( /^#/, "" );
			},

			stripQueryParams: function( url ) {
				return url.replace( /\?.*$/, "" );
			},

			//remove the preceding hash, any query params, and dialog notations
			cleanHash: function( hash ) {
				return path.stripHash( hash.replace( /\?.*$/, "" ).replace( dialogHashKey, "" ) );
			},

			isHashValid: function( hash ) {
				return ( /^#[^#]+$/ ).test( hash );
			},

			//check whether a url is referencing the same domain, or an external domain or different protocol
			//could be mailto, etc
			isExternal: function( url ) {
				var u = path.parseUrl( url );
				return u.protocol && u.domain !== this.documentUrl.domain ? true : false;
			},

			hasProtocol: function( url ) {
				return ( /^(:?\w+:)/ ).test( url );
			},

			isEmbeddedPage: function( url ) {
				var u = path.parseUrl( url );

				//if the path is absolute, then we need to compare the url against
				//both the this.documentUrl and the documentBase. The main reason for this
				//is that links embedded within external documents will refer to the
				//application document, whereas links embedded within the application
				//document will be resolved against the document base.
				if ( u.protocol !== "" ) {
					return ( !this.isPath(u.hash) && u.hash && ( u.hrefNoHash === this.documentUrl.hrefNoHash || ( this.documentBaseDiffers && u.hrefNoHash === this.documentBase.hrefNoHash ) ) );
				}
				return ( /^#/ ).test( u.href );
			},

			squash: function( url, resolutionUrl ) {
				var state, href, cleanedUrl, search, stateIndex,
					isPath = this.isPath( url ),
					uri = this.parseUrl( url ),
					preservedHash = uri.hash,
					uiState = "";

				// produce a url against which we can resole the provided path
				resolutionUrl = resolutionUrl || (path.isPath(url) ? path.getLocation() : path.getDocumentUrl());

				// If the url is anything but a simple string, remove any preceding hash
				// eg #foo/bar -> foo/bar
				//    #foo -> #foo
				cleanedUrl = isPath ? path.stripHash( url ) : url;

				// If the url is a full url with a hash check if the parsed hash is a path
				// if it is, strip the #, and use it otherwise continue without change
				cleanedUrl = path.isPath( uri.hash ) ? path.stripHash( uri.hash ) : cleanedUrl;

				// Split the UI State keys off the href
				stateIndex = cleanedUrl.indexOf( this.uiStateKey );

				// store the ui state keys for use
				if( stateIndex > -1 ){
					uiState = cleanedUrl.slice( stateIndex );
					cleanedUrl = cleanedUrl.slice( 0, stateIndex );
				}

				// make the cleanedUrl absolute relative to the resolution url
				href = path.makeUrlAbsolute( cleanedUrl, resolutionUrl );

				// grab the search from the resolved url since parsing from
				// the passed url may not yield the correct result
				search = this.parseUrl( href ).search;

				// TODO all this crap is terrible, clean it up
				if ( isPath ) {
					// reject the hash if it's a path or it's just a dialog key
					if( path.isPath( preservedHash ) || preservedHash.replace("#", "").indexOf( this.uiStateKey ) === 0) {
						preservedHash = "";
					}

					// Append the UI State keys where it exists and it's been removed
					// from the url
					if( uiState && preservedHash.indexOf( this.uiStateKey ) === -1){
						preservedHash += uiState;
					}

					// make sure that pound is on the front of the hash
					if( preservedHash.indexOf( "#" ) === -1 && preservedHash !== "" ){
						preservedHash = "#" + preservedHash;
					}

					// reconstruct each of the pieces with the new search string and hash
					href = path.parseUrl( href );
					href = href.protocol + "//" + href.host + href.pathname + search + preservedHash;
				} else {
					href += href.indexOf( "#" ) > -1 ? uiState : "#" + uiState;
				}

				return href;
			},

			isPreservableHash: function( hash ) {
				return hash.replace( "#", "" ).indexOf( this.uiStateKey ) === 0;
			}
		};

		path.documentUrl = path.parseLocation();

		$base = $( "head" ).find( "base" );

		path.documentBase = $base.length ?
			path.parseUrl( path.makeUrlAbsolute( $base.attr( "href" ), path.documentUrl.href ) ) :
			path.documentUrl;

		path.documentBaseDiffers = (path.documentUrl.hrefNoHash !== path.documentBase.hrefNoHash);

		//return the original document url
		path.getDocumentUrl = function( asParsedObject ) {
			return asParsedObject ? $.extend( {}, path.documentUrl ) : path.documentUrl.href;
		};

		//return the original document base url
		path.getDocumentBase = function( asParsedObject ) {
			return asParsedObject ? $.extend( {}, path.documentBase ) : path.documentBase.href;
		};
})( jQuery );



(function( $, undefined ) {
	var path = $.mobile.path;

	$.mobile.History = function( stack, index ) {
		this.stack = stack || [];
		this.activeIndex = index || 0;
	};

	$.extend($.mobile.History.prototype, {
		getActive: function() {
			return this.stack[ this.activeIndex ];
		},

		getLast: function() {
			return this.stack[ this.previousIndex ];
		},

		getNext: function() {
			return this.stack[ this.activeIndex + 1 ];
		},

		getPrev: function() {
			return this.stack[ this.activeIndex - 1 ];
		},

		// addNew is used whenever a new page is added
		add: function( url, data ){
			data = data || {};

			//if there's forward history, wipe it
			if ( this.getNext() ) {
				this.clearForward();
			}

			// if the hash is included in the data make sure the shape
			// is consistent for comparison
			if( data.hash && data.hash.indexOf( "#" ) === -1) {
				data.hash = "#" + data.hash;
			}

			data.url = url;
			this.stack.push( data );
			this.activeIndex = this.stack.length - 1;
		},

		//wipe urls ahead of active index
		clearForward: function() {
			this.stack = this.stack.slice( 0, this.activeIndex + 1 );
		},

		find: function( url, stack, earlyReturn ) {
			stack = stack || this.stack;

			var entry, i, length = stack.length, index;

			for ( i = 0; i < length; i++ ) {
				entry = stack[i];

				if ( decodeURIComponent(url) === decodeURIComponent(entry.url) ||
					decodeURIComponent(url) === decodeURIComponent(entry.hash) ) {
					index = i;

					if( earlyReturn ) {
						return index;
					}
				}
			}

			return index;
		},

		closest: function( url ) {
			var closest, a = this.activeIndex;

			// First, take the slice of the history stack before the current index and search
			// for a url match. If one is found, we'll avoid avoid looking through forward history
			// NOTE the preference for backward history movement is driven by the fact that
			//      most mobile browsers only have a dedicated back button, and users rarely use
			//      the forward button in desktop browser anyhow
			closest = this.find( url, this.stack.slice(0, a) );

			// If nothing was found in backward history check forward. The `true`
			// value passed as the third parameter causes the find method to break
			// on the first match in the forward history slice. The starting index
			// of the slice must then be added to the result to get the element index
			// in the original history stack :( :(
			//
			// TODO this is hyper confusing and should be cleaned up (ugh so bad)
			if( closest === undefined ) {
				closest = this.find( url, this.stack.slice(a), true );
				closest = closest === undefined ? closest : closest + a;
			}

			return closest;
		},

		direct: function( opts ) {
			var newActiveIndex = this.closest( opts.url ), a = this.activeIndex;

			// save new page index, null check to prevent falsey 0 result
			// record the previous index for reference
			if( newActiveIndex !== undefined ) {
				this.activeIndex = newActiveIndex;
				this.previousIndex = a;
			}

			// invoke callbacks where appropriate
			//
			// TODO this is also convoluted and confusing
			if ( newActiveIndex < a ) {
				( opts.present || opts.back || $.noop )( this.getActive(), 'back' );
			} else if ( newActiveIndex > a ) {
				( opts.present || opts.forward || $.noop )( this.getActive(), 'forward' );
			} else if ( newActiveIndex === undefined && opts.missing ){
				opts.missing( this.getActive() );
			}
		}
	});
})( jQuery );


(function( $, undefined ) {
	var path = $.mobile.path;

	$.mobile.Navigator = function( history ) {
		this.history = history;
		this.ignoreInitialHashChange = true;

		// This ensures that browsers which don't fire the initial popstate
		// like opera don't have further hash assignment popstates blocked
		setTimeout($.proxy(function() {
			this.ignoreInitialHashChange = false;
		}, this), 200);

		$.mobile.window.bind({
			"popstate.history": $.proxy( this.popstate, this ),
			"hashchange.history": $.proxy( this.hashchange, this )
		});
	};

	$.extend($.mobile.Navigator.prototype, {
		squash: function( url, data ) {
			var state, href, hash = path.isPath(url) ? path.stripHash(url) : url;

			href = path.squash( url );

			// make sure to provide this information when it isn't explicitly set in the
			// data object that was passed to the squash method
			state = $.extend({
				hash: hash,
				url: href
			}, data);

			// replace the current url with the new href and store the state
			// Note that in some cases we might be replacing an url with the
			// same url. We do this anyways because we need to make sure that
			// all of our history entries have a state object associated with
			// them. This allows us to work around the case where $.mobile.back()
			// is called to transition from an external page to an embedded page.
			// In that particular case, a hashchange event is *NOT* generated by the browser.
			// Ensuring each history entry has a state object means that onPopState()
			// will always trigger our hashchange callback even when a hashchange event
			// is not fired.
			window.history.replaceState( state, state.title || document.title, href );

			return state;
		},

		hash: function( url, href ) {
			var parsed, loc, hash;

			// Grab the hash for recording. If the passed url is a path
			// we used the parsed version of the squashed url to reconstruct,
			// otherwise we assume it's a hash and store it directly
			parsed = path.parseUrl( url );
			loc = path.parseLocation();

			if( loc.pathname + loc.search === parsed.pathname + parsed.search ) {
				// If the pathname and search of the passed url is identical to the current loc
				// then we must use the hash. Otherwise there will be no event
				// eg, url = "/foo/bar?baz#bang", location.href = "http://example.com/foo/bar?baz"
				hash = parsed.hash ? parsed.hash : parsed.pathname + parsed.search;
			} else if ( path.isPath(url) ) {
				var resolved = path.parseUrl( href );
				// If the passed url is a path, make it domain relative and remove any trailing hash
				hash = resolved.pathname + resolved.search + (path.isPreservableHash( resolved.hash )? resolved.hash.replace( "#", "" ) : "");
			} else {
				hash = url;
			}

			return hash;
		},

		// TODO reconsider name
		go: function( url, data, noEvents ) {
			var state, href, hash, popstateEvent,
				isPopStateEvent = $.event.special.navigate.isPushStateEnabled();

			// Get the url as it would look squashed on to the current resolution url
			href = path.squash( url );

			// sort out what the hash sould be from the url
			hash = this.hash( url, href );

			// Here we prevent the next hash change or popstate event from doing any
			// history management. In the case of hashchange we don't swallow it
			// if there will be no hashchange fired (since that won't reset the value)
			// and will swallow the following hashchange
			if( noEvents && hash !== path.stripHash(path.parseLocation().hash) ) {
				this.preventNextHashChange = noEvents;
			}

			// IMPORTANT in the case where popstate is supported the event will be triggered
			//      directly, stopping further execution - ie, interupting the flow of this
			//      method call to fire bindings at this expression. Below the navigate method
			//      there is a binding to catch this event and stop its propagation.
			//
			//      We then trigger a new popstate event on the window with a null state
			//      so that the navigate events can conclude their work properly
			//
			// if the url is a path we want to preserve the query params that are available on
			// the current url.
			this.preventHashAssignPopState = true;
			window.location.hash = hash;

			// If popstate is enabled and the browser triggers `popstate` events when the hash
			// is set (this often happens immediately in browsers like Chrome), then the
			// this flag will be set to false already. If it's a browser that does not trigger
			// a `popstate` on hash assignement or `replaceState` then we need avoid the branch
			// that swallows the event created by the popstate generated by the hash assignment
			// At the time of this writing this happens with Opera 12 and some version of IE
			this.preventHashAssignPopState = false;

			state = $.extend({
				url: href,
				hash: hash,
				title: document.title
			}, data);

			if( isPopStateEvent ) {
				popstateEvent = new $.Event( "popstate" );
				popstateEvent.originalEvent = {
					type: "popstate",
					state: null
				};

				this.squash( url, state );

				// Trigger a new faux popstate event to replace the one that we
				// caught that was triggered by the hash setting above.
				if( !noEvents ) {
					this.ignorePopState = true;
					$.mobile.window.trigger( popstateEvent );
				}
			}

			// record the history entry so that the information can be included
			// in hashchange event driven navigate events in a similar fashion to
			// the state that's provided by popstate
			this.history.add( state.url, state );
		},


		// This binding is intended to catch the popstate events that are fired
		// when execution of the `$.navigate` method stops at window.location.hash = url;
		// and completely prevent them from propagating. The popstate event will then be
		// retriggered after execution resumes
		//
		// TODO grab the original event here and use it for the synthetic event in the
		//      second half of the navigate execution that will follow this binding
		popstate: function( event ) {
			var active, hash, state, closestIndex;

			// Partly to support our test suite which manually alters the support
			// value to test hashchange. Partly to prevent all around weirdness
			if( !$.event.special.navigate.isPushStateEnabled() ){
				return;
			}

			// If this is the popstate triggered by the actual alteration of the hash
			// prevent it completely. History is tracked manually
			if( this.preventHashAssignPopState ) {
				this.preventHashAssignPopState = false;
				event.stopImmediatePropagation();
				return;
			}

			// if this is the popstate triggered after the `replaceState` call in the go
			// method, then simply ignore it. The history entry has already been captured
			if( this.ignorePopState ) {
				this.ignorePopState = false;
				return;
			}

			// If there is no state, and the history stack length is one were
			// probably getting the page load popstate fired by browsers like chrome
			// avoid it and set the one time flag to false
			if( !event.originalEvent.state &&
				this.history.stack.length === 1 &&
				this.ignoreInitialHashChange ) {
				this.ignoreInitialHashChange = false;

				return;
			}

			// account for direct manipulation of the hash. That is, we will receive a popstate
			// when the hash is changed by assignment, and it won't have a state associated. We
			// then need to squash the hash. See below for handling of hash assignment that
			// matches an existing history entry
			// TODO it might be better to only add to the history stack
			//      when the hash is adjacent to the active history entry
			hash = path.parseLocation().hash;
			if( !event.originalEvent.state && hash ) {
				// squash the hash that's been assigned on the URL with replaceState
				// also grab the resulting state object for storage
				state = this.squash( hash );

				// record the new hash as an additional history entry
				// to match the browser's treatment of hash assignment
				this.history.add( state.url, state );

				// pass the newly created state information
				// along with the event
				event.historyState = state;

				// do not alter history, we've added a new history entry
				// so we know where we are
				return;
			}

			// If all else fails this is a popstate that comes from the back or forward buttons
			// make sure to set the state of our history stack properly, and record the directionality
			this.history.direct({
				url: (event.originalEvent.state || {}).url || hash,

				// When the url is either forward or backward in history include the entry
				// as data on the event object for merging as data in the navigate event
				present: function( historyEntry, direction ) {
					// make sure to create a new object to pass down as the navigate event data
					event.historyState = $.extend({}, historyEntry);
					event.historyState.direction = direction;
				}
			});
		},

		// NOTE must bind before `navigate` special event hashchange binding otherwise the
		//      navigation data won't be attached to the hashchange event in time for those
		//      bindings to attach it to the `navigate` special event
		// TODO add a check here that `hashchange.navigate` is bound already otherwise it's
		//      broken (exception?)
		hashchange: function( event ) {
			var history, hash;

			// If hashchange listening is explicitly disabled or pushstate is supported
			// avoid making use of the hashchange handler.
			if(!$.event.special.navigate.isHashChangeEnabled() ||
				$.event.special.navigate.isPushStateEnabled() ) {
				return;
			}

			// On occasion explicitly want to prevent the next hash from propogating because we only
			// with to alter the url to represent the new state do so here
			if( this.preventNextHashChange ){
				this.preventNextHashChange = false;
				event.stopImmediatePropagation();
				return;
			}

			history = this.history;
			hash = path.parseLocation().hash;

			// If this is a hashchange caused by the back or forward button
			// make sure to set the state of our history stack properly
			this.history.direct({
				url: hash,

				// When the url is either forward or backward in history include the entry
				// as data on the event object for merging as data in the navigate event
				present: function( historyEntry, direction ) {
					// make sure to create a new object to pass down as the navigate event data
					event.hashchangeState = $.extend({}, historyEntry);
					event.hashchangeState.direction = direction;
				},

				// When we don't find a hash in our history clearly we're aiming to go there
				// record the entry as new for future traversal
				//
				// NOTE it's not entirely clear that this is the right thing to do given that we
				//      can't know the users intention. It might be better to explicitly _not_
				//      support location.hash assignment in preference to $.navigate calls
				// TODO first arg to add should be the href, but it causes issues in identifying
				//      embeded pages
				missing: function() {
					history.add( hash, {
						hash: hash,
						title: document.title
					});
				}
			});
		}
	});
})( jQuery );



(function( $, undefined ) {
	// TODO consider queueing navigation activity until previous activities have completed
	//      so that end users don't have to think about it. Punting for now
	// TODO !! move the event bindings into callbacks on the navigate event
	$.mobile.navigate = function( url, data, noEvents ) {
		$.mobile.navigate.navigator.go( url, data, noEvents );
	};

	// expose the history on the navigate method in anticipation of full integration with
	// existing navigation functionalty that is tightly coupled to the history information
	$.mobile.navigate.history = new $.mobile.History();

	// instantiate an instance of the navigator for use within the $.navigate method
	$.mobile.navigate.navigator = new $.mobile.Navigator( $.mobile.navigate.history );

	var loc = $.mobile.path.parseLocation();
	$.mobile.navigate.history.add( loc.href, {hash: loc.hash} );
})( jQuery );


// This plugin is an experiment for abstracting away the touch and mouse
// events so that developers don't have to worry about which method of input
// the device their document is loaded on supports.
//
// The idea here is to allow the developer to register listeners for the
// basic mouse events, such as mousedown, mousemove, mouseup, and click,
// and the plugin will take care of registering the correct listeners
// behind the scenes to invoke the listener at the fastest possible time
// for that device, while still retaining the order of event firing in
// the traditional mouse environment, should multiple handlers be registered
// on the same element for different events.
//
// The current version exposes the following virtual events to jQuery bind methods:
// "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel"

(function( $, window, document, undefined ) {

var dataPropertyName = "virtualMouseBindings",
	touchTargetPropertyName = "virtualTouchID",
	virtualEventNames = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split( " " ),
	touchEventProps = "clientX clientY pageX pageY screenX screenY".split( " " ),
	mouseHookProps = $.event.mouseHooks ? $.event.mouseHooks.props : [],
	mouseEventProps = $.event.props.concat( mouseHookProps ),
	activeDocHandlers = {},
	resetTimerID = 0,
	startX = 0,
	startY = 0,
	didScroll = false,
	clickBlockList = [],
	blockMouseTriggers = false,
	blockTouchTriggers = false,
	eventCaptureSupported = "addEventListener" in document,
	$document = $( document ),
	nextTouchID = 1,
	lastTouchID = 0, threshold;

$.vmouse = {
	moveDistanceThreshold: 10,
	clickDistanceThreshold: 10,
	resetTimerDuration: 1500
};

function getNativeEvent( event ) {

	while ( event && typeof event.originalEvent !== "undefined" ) {
		event = event.originalEvent;
	}
	return event;
}

function createVirtualEvent( event, eventType ) {

	var t = event.type,
		oe, props, ne, prop, ct, touch, i, j, len;

	event = $.Event( event );
	event.type = eventType;

	oe = event.originalEvent;
	props = $.event.props;

	// addresses separation of $.event.props in to $.event.mouseHook.props and Issue 3280
	// https://github.com/jquery/jquery-mobile/issues/3280
	if ( t.search( /^(mouse|click)/ ) > -1 ) {
		props = mouseEventProps;
	}

	// copy original event properties over to the new event
	// this would happen if we could call $.event.fix instead of $.Event
	// but we don't have a way to force an event to be fixed multiple times
	if ( oe ) {
		for ( i = props.length, prop; i; ) {
			prop = props[ --i ];
			event[ prop ] = oe[ prop ];
		}
	}

	// make sure that if the mouse and click virtual events are generated
	// without a .which one is defined
	if ( t.search(/mouse(down|up)|click/) > -1 && !event.which ) {
		event.which = 1;
	}

	if ( t.search(/^touch/) !== -1 ) {
		ne = getNativeEvent( oe );
		t = ne.touches;
		ct = ne.changedTouches;
		touch = ( t && t.length ) ? t[0] : ( ( ct && ct.length ) ? ct[ 0 ] : undefined );

		if ( touch ) {
			for ( j = 0, len = touchEventProps.length; j < len; j++) {
				prop = touchEventProps[ j ];
				event[ prop ] = touch[ prop ];
			}
		}
	}

	return event;
}

function getVirtualBindingFlags( element ) {

	var flags = {},
		b, k;

	while ( element ) {

		b = $.data( element, dataPropertyName );

		for (  k in b ) {
			if ( b[ k ] ) {
				flags[ k ] = flags.hasVirtualBinding = true;
			}
		}
		element = element.parentNode;
	}
	return flags;
}

function getClosestElementWithVirtualBinding( element, eventType ) {
	var b;
	while ( element ) {

		b = $.data( element, dataPropertyName );

		if ( b && ( !eventType || b[ eventType ] ) ) {
			return element;
		}
		element = element.parentNode;
	}
	return null;
}

function enableTouchBindings() {
	blockTouchTriggers = false;
}

function disableTouchBindings() {
	blockTouchTriggers = true;
}

function enableMouseBindings() {
	lastTouchID = 0;
	clickBlockList.length = 0;
	blockMouseTriggers = false;

	// When mouse bindings are enabled, our
	// touch bindings are disabled.
	disableTouchBindings();
}

function disableMouseBindings() {
	// When mouse bindings are disabled, our
	// touch bindings are enabled.
	enableTouchBindings();
}

function startResetTimer() {
	clearResetTimer();
	resetTimerID = setTimeout( function() {
		resetTimerID = 0;
		enableMouseBindings();
	}, $.vmouse.resetTimerDuration );
}

function clearResetTimer() {
	if ( resetTimerID ) {
		clearTimeout( resetTimerID );
		resetTimerID = 0;
	}
}

function triggerVirtualEvent( eventType, event, flags ) {
	var ve;

	if ( ( flags && flags[ eventType ] ) ||
				( !flags && getClosestElementWithVirtualBinding( event.target, eventType ) ) ) {

		ve = createVirtualEvent( event, eventType );

		$( event.target).trigger( ve );
	}

	return ve;
}

function mouseEventCallback( event ) {
	var touchID = $.data( event.target, touchTargetPropertyName );

	if ( !blockMouseTriggers && ( !lastTouchID || lastTouchID !== touchID ) ) {
		var ve = triggerVirtualEvent( "v" + event.type, event );
		if ( ve ) {
			if ( ve.isDefaultPrevented() ) {
				event.preventDefault();
			}
			if ( ve.isPropagationStopped() ) {
				event.stopPropagation();
			}
			if ( ve.isImmediatePropagationStopped() ) {
				event.stopImmediatePropagation();
			}
		}
	}
}

function handleTouchStart( event ) {

	var touches = getNativeEvent( event ).touches,
		target, flags;

	if ( touches && touches.length === 1 ) {

		target = event.target;
		flags = getVirtualBindingFlags( target );

		if ( flags.hasVirtualBinding ) {

			lastTouchID = nextTouchID++;
			$.data( target, touchTargetPropertyName, lastTouchID );

			clearResetTimer();

			disableMouseBindings();
			didScroll = false;

			var t = getNativeEvent( event ).touches[ 0 ];
			startX = t.pageX;
			startY = t.pageY;

			triggerVirtualEvent( "vmouseover", event, flags );
			triggerVirtualEvent( "vmousedown", event, flags );
		}
	}
}

function handleScroll( event ) {
	if ( blockTouchTriggers ) {
		return;
	}

	if ( !didScroll ) {
		triggerVirtualEvent( "vmousecancel", event, getVirtualBindingFlags( event.target ) );
	}

	didScroll = true;
	startResetTimer();
}

function handleTouchMove( event ) {
	if ( blockTouchTriggers ) {
		return;
	}

	var t = getNativeEvent( event ).touches[ 0 ],
		didCancel = didScroll,
		moveThreshold = $.vmouse.moveDistanceThreshold,
		flags = getVirtualBindingFlags( event.target );

		didScroll = didScroll ||
			( Math.abs( t.pageX - startX ) > moveThreshold ||
				Math.abs( t.pageY - startY ) > moveThreshold );


	if ( didScroll && !didCancel ) {
		triggerVirtualEvent( "vmousecancel", event, flags );
	}

	triggerVirtualEvent( "vmousemove", event, flags );
	startResetTimer();
}

function handleTouchEnd( event ) {
	if ( blockTouchTriggers ) {
		return;
	}

	disableTouchBindings();

	var flags = getVirtualBindingFlags( event.target ),
		t;
	triggerVirtualEvent( "vmouseup", event, flags );

	if ( !didScroll ) {
		var ve = triggerVirtualEvent( "vclick", event, flags );
		if ( ve && ve.isDefaultPrevented() ) {
			// The target of the mouse events that follow the touchend
			// event don't necessarily match the target used during the
			// touch. This means we need to rely on coordinates for blocking
			// any click that is generated.
			t = getNativeEvent( event ).changedTouches[ 0 ];
			clickBlockList.push({
				touchID: lastTouchID,
				x: t.clientX,
				y: t.clientY
			});

			// Prevent any mouse events that follow from triggering
			// virtual event notifications.
			blockMouseTriggers = true;
		}
	}
	triggerVirtualEvent( "vmouseout", event, flags);
	didScroll = false;

	startResetTimer();
}

function hasVirtualBindings( ele ) {
	var bindings = $.data( ele, dataPropertyName ),
		k;

	if ( bindings ) {
		for ( k in bindings ) {
			if ( bindings[ k ] ) {
				return true;
			}
		}
	}
	return false;
}

function dummyMouseHandler() {}

function getSpecialEventObject( eventType ) {
	var realType = eventType.substr( 1 );

	return {
		setup: function( data, namespace ) {
			// If this is the first virtual mouse binding for this element,
			// add a bindings object to its data.

			if ( !hasVirtualBindings( this ) ) {
				$.data( this, dataPropertyName, {} );
			}

			// If setup is called, we know it is the first binding for this
			// eventType, so initialize the count for the eventType to zero.
			var bindings = $.data( this, dataPropertyName );
			bindings[ eventType ] = true;

			// If this is the first virtual mouse event for this type,
			// register a global handler on the document.

			activeDocHandlers[ eventType ] = ( activeDocHandlers[ eventType ] || 0 ) + 1;

			if ( activeDocHandlers[ eventType ] === 1 ) {
				$document.bind( realType, mouseEventCallback );
			}

			// Some browsers, like Opera Mini, won't dispatch mouse/click events
			// for elements unless they actually have handlers registered on them.
			// To get around this, we register dummy handlers on the elements.

			$( this ).bind( realType, dummyMouseHandler );

			// For now, if event capture is not supported, we rely on mouse handlers.
			if ( eventCaptureSupported ) {
				// If this is the first virtual mouse binding for the document,
				// register our touchstart handler on the document.

				activeDocHandlers[ "touchstart" ] = ( activeDocHandlers[ "touchstart" ] || 0) + 1;

				if ( activeDocHandlers[ "touchstart" ] === 1 ) {
					$document.bind( "touchstart", handleTouchStart )
						.bind( "touchend", handleTouchEnd )

						// On touch platforms, touching the screen and then dragging your finger
						// causes the window content to scroll after some distance threshold is
						// exceeded. On these platforms, a scroll prevents a click event from being
						// dispatched, and on some platforms, even the touchend is suppressed. To
						// mimic the suppression of the click event, we need to watch for a scroll
						// event. Unfortunately, some platforms like iOS don't dispatch scroll
						// events until *AFTER* the user lifts their finger (touchend). This means
						// we need to watch both scroll and touchmove events to figure out whether
						// or not a scroll happenens before the touchend event is fired.

						.bind( "touchmove", handleTouchMove )
						.bind( "scroll", handleScroll );
				}
			}
		},

		teardown: function( data, namespace ) {
			// If this is the last virtual binding for this eventType,
			// remove its global handler from the document.

			--activeDocHandlers[ eventType ];

			if ( !activeDocHandlers[ eventType ] ) {
				$document.unbind( realType, mouseEventCallback );
			}

			if ( eventCaptureSupported ) {
				// If this is the last virtual mouse binding in existence,
				// remove our document touchstart listener.

				--activeDocHandlers[ "touchstart" ];

				if ( !activeDocHandlers[ "touchstart" ] ) {
					$document.unbind( "touchstart", handleTouchStart )
						.unbind( "touchmove", handleTouchMove )
						.unbind( "touchend", handleTouchEnd )
						.unbind( "scroll", handleScroll );
				}
			}

			var $this = $( this ),
				bindings = $.data( this, dataPropertyName );

			// teardown may be called when an element was
			// removed from the DOM. If this is the case,
			// jQuery core may have already stripped the element
			// of any data bindings so we need to check it before
			// using it.
			if ( bindings ) {
				bindings[ eventType ] = false;
			}

			// Unregister the dummy event handler.

			$this.unbind( realType, dummyMouseHandler );

			// If this is the last virtual mouse binding on the
			// element, remove the binding data from the element.

			if ( !hasVirtualBindings( this ) ) {
				$this.removeData( dataPropertyName );
			}
		}
	};
}

// Expose our custom events to the jQuery bind/unbind mechanism.

for ( var i = 0; i < virtualEventNames.length; i++ ) {
	$.event.special[ virtualEventNames[ i ] ] = getSpecialEventObject( virtualEventNames[ i ] );
}

// Add a capture click handler to block clicks.
// Note that we require event capture support for this so if the device
// doesn't support it, we punt for now and rely solely on mouse events.
if ( eventCaptureSupported ) {
	document.addEventListener( "click", function( e ) {
		var cnt = clickBlockList.length,
			target = e.target,
			x, y, ele, i, o, touchID;

		if ( cnt ) {
			x = e.clientX;
			y = e.clientY;
			threshold = $.vmouse.clickDistanceThreshold;

			// The idea here is to run through the clickBlockList to see if
			// the current click event is in the proximity of one of our
			// vclick events that had preventDefault() called on it. If we find
			// one, then we block the click.
			//
			// Why do we have to rely on proximity?
			//
			// Because the target of the touch event that triggered the vclick
			// can be different from the target of the click event synthesized
			// by the browser. The target of a mouse/click event that is syntehsized
			// from a touch event seems to be implementation specific. For example,
			// some browsers will fire mouse/click events for a link that is near
			// a touch event, even though the target of the touchstart/touchend event
			// says the user touched outside the link. Also, it seems that with most
			// browsers, the target of the mouse/click event is not calculated until the
			// time it is dispatched, so if you replace an element that you touched
			// with another element, the target of the mouse/click will be the new
			// element underneath that point.
			//
			// Aside from proximity, we also check to see if the target and any
			// of its ancestors were the ones that blocked a click. This is necessary
			// because of the strange mouse/click target calculation done in the
			// Android 2.1 browser, where if you click on an element, and there is a
			// mouse/click handler on one of its ancestors, the target will be the
			// innermost child of the touched element, even if that child is no where
			// near the point of touch.

			ele = target;

			while ( ele ) {
				for ( i = 0; i < cnt; i++ ) {
					o = clickBlockList[ i ];
					touchID = 0;

					if ( ( ele === target && Math.abs( o.x - x ) < threshold && Math.abs( o.y - y ) < threshold ) ||
								$.data( ele, touchTargetPropertyName ) === o.touchID ) {
						// XXX: We may want to consider removing matches from the block list
						//      instead of waiting for the reset timer to fire.
						e.preventDefault();
						e.stopPropagation();
						return;
					}
				}
				ele = ele.parentNode;
			}
		}
	}, true);
}
})( jQuery, window, document );


(function( $, window, undefined ) {
	var $document = $( document );

	// add new event shortcuts
	$.each( ( "touchstart touchmove touchend " +
		"tap taphold " +
		"swipe swipeleft swiperight " +
		"scrollstart scrollstop" ).split( " " ), function( i, name ) {

		$.fn[ name ] = function( fn ) {
			return fn ? this.bind( name, fn ) : this.trigger( name );
		};

		// jQuery < 1.8
		if ( $.attrFn ) {
			$.attrFn[ name ] = true;
		}
	});

	var supportTouch = $.mobile.support.touch,
		scrollEvent = "touchmove scroll",
		touchStartEvent = supportTouch ? "touchstart" : "mousedown",
		touchStopEvent = supportTouch ? "touchend" : "mouseup",
		touchMoveEvent = supportTouch ? "touchmove" : "mousemove";

	function triggerCustomEvent( obj, eventType, event ) {
		var originalType = event.type;
		event.type = eventType;
		$.event.dispatch.call( obj, event );
		event.type = originalType;
	}

	// also handles scrollstop
	$.event.special.scrollstart = {

		enabled: true,

		setup: function() {

			var thisObject = this,
				$this = $( thisObject ),
				scrolling,
				timer;

			function trigger( event, state ) {
				scrolling = state;
				triggerCustomEvent( thisObject, scrolling ? "scrollstart" : "scrollstop", event );
			}

			// iPhone triggers scroll after a small delay; use touchmove instead
			$this.bind( scrollEvent, function( event ) {

				if ( !$.event.special.scrollstart.enabled ) {
					return;
				}

				if ( !scrolling ) {
					trigger( event, true );
				}

				clearTimeout( timer );
				timer = setTimeout( function() {
					trigger( event, false );
				}, 50 );
			});
		}
	};

	// also handles taphold
	$.event.special.tap = {
		tapholdThreshold: 750,

		setup: function() {
			var thisObject = this,
				$this = $( thisObject );

			$this.bind( "vmousedown", function( event ) {

				if ( event.which && event.which !== 1 ) {
					return false;
				}

				var origTarget = event.target,
					origEvent = event.originalEvent,
					timer;

				function clearTapTimer() {
					clearTimeout( timer );
				}

				function clearTapHandlers() {
					clearTapTimer();

					$this.unbind( "vclick", clickHandler )
						.unbind( "vmouseup", clearTapTimer );
					$document.unbind( "vmousecancel", clearTapHandlers );
				}

				function clickHandler( event ) {
					clearTapHandlers();

					// ONLY trigger a 'tap' event if the start target is
					// the same as the stop target.
					if ( origTarget === event.target ) {
						triggerCustomEvent( thisObject, "tap", event );
					}
				}

				$this.bind( "vmouseup", clearTapTimer )
					.bind( "vclick", clickHandler );
				$document.bind( "vmousecancel", clearTapHandlers );

				timer = setTimeout( function() {
					triggerCustomEvent( thisObject, "taphold", $.Event( "taphold", { target: origTarget } ) );
				}, $.event.special.tap.tapholdThreshold );
			});
		}
	};

	// also handles swipeleft, swiperight
	$.event.special.swipe = {
		scrollSupressionThreshold: 30, // More than this horizontal displacement, and we will suppress scrolling.

		durationThreshold: 1000, // More time than this, and it isn't a swipe.

		horizontalDistanceThreshold: 30,  // Swipe horizontal displacement must be more than this.

		verticalDistanceThreshold: 75,  // Swipe vertical displacement must be less than this.

		start: function( event ) {
			var data = event.originalEvent.touches ?
					event.originalEvent.touches[ 0 ] : event;
			return {
						time: ( new Date() ).getTime(),
						coords: [ data.pageX, data.pageY ],
						origin: $( event.target )
					};
		},

		stop: function( event ) {
			var data = event.originalEvent.touches ?
					event.originalEvent.touches[ 0 ] : event;
			return {
						time: ( new Date() ).getTime(),
						coords: [ data.pageX, data.pageY ]
					};
		},

		handleSwipe: function( start, stop ) {
			if ( stop.time - start.time < $.event.special.swipe.durationThreshold &&
				Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.horizontalDistanceThreshold &&
				Math.abs( start.coords[ 1 ] - stop.coords[ 1 ] ) < $.event.special.swipe.verticalDistanceThreshold ) {

				start.origin.trigger( "swipe" )
					.trigger( start.coords[0] > stop.coords[ 0 ] ? "swipeleft" : "swiperight" );
			}
		},

		setup: function() {
			var thisObject = this,
				$this = $( thisObject );

			$this.bind( touchStartEvent, function( event ) {
				var start = $.event.special.swipe.start( event ),
					stop;

				function moveHandler( event ) {
					if ( !start ) {
						return;
					}

					stop = $.event.special.swipe.stop( event );

					// prevent scrolling
					if ( Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.scrollSupressionThreshold ) {
						event.preventDefault();
					}
				}

				$this.bind( touchMoveEvent, moveHandler )
					.one( touchStopEvent, function() {
						$this.unbind( touchMoveEvent, moveHandler );

						if ( start && stop ) {
							$.event.special.swipe.handleSwipe( start, stop );
						}
						start = stop = undefined;
					});
			});
		}
	};
	$.each({
		scrollstop: "scrollstart",
		taphold: "tap",
		swipeleft: "swipe",
		swiperight: "swipe"
	}, function( event, sourceEvent ) {

		$.event.special[ event ] = {
			setup: function() {
				$( this ).bind( sourceEvent, $.noop );
			}
		};
	});

})( jQuery, this );


	// throttled resize event
	(function( $ ) {
		$.event.special.throttledresize = {
			setup: function() {
				$( this ).bind( "resize", handler );
			},
			teardown: function() {
				$( this ).unbind( "resize", handler );
			}
		};

		var throttle = 250,
			handler = function() {
				curr = ( new Date() ).getTime();
				diff = curr - lastCall;

				if ( diff >= throttle ) {

					lastCall = curr;
					$( this ).trigger( "throttledresize" );

				} else {

					if ( heldCall ) {
						clearTimeout( heldCall );
					}

					// Promise a held call will still execute
					heldCall = setTimeout( handler, throttle - diff );
				}
			},
			lastCall = 0,
			heldCall,
			curr,
			diff;
	})( jQuery );

(function( $, window ) {
	var win = $( window ),
		event_name = "orientationchange",
		special_event,
		get_orientation,
		last_orientation,
		initial_orientation_is_landscape,
		initial_orientation_is_default,
		portrait_map = { "0": true, "180": true };

	// It seems that some device/browser vendors use window.orientation values 0 and 180 to
	// denote the "default" orientation. For iOS devices, and most other smart-phones tested,
	// the default orientation is always "portrait", but in some Android and RIM based tablets,
	// the default orientation is "landscape". The following code attempts to use the window
	// dimensions to figure out what the current orientation is, and then makes adjustments
	// to the to the portrait_map if necessary, so that we can properly decode the
	// window.orientation value whenever get_orientation() is called.
	//
	// Note that we used to use a media query to figure out what the orientation the browser
	// thinks it is in:
	//
	//     initial_orientation_is_landscape = $.mobile.media("all and (orientation: landscape)");
	//
	// but there was an iPhone/iPod Touch bug beginning with iOS 4.2, up through iOS 5.1,
	// where the browser *ALWAYS* applied the landscape media query. This bug does not
	// happen on iPad.

	if ( $.support.orientation ) {

		// Check the window width and height to figure out what the current orientation
		// of the device is at this moment. Note that we've initialized the portrait map
		// values to 0 and 180, *AND* we purposely check for landscape so that if we guess
		// wrong, , we default to the assumption that portrait is the default orientation.
		// We use a threshold check below because on some platforms like iOS, the iPhone
		// form-factor can report a larger width than height if the user turns on the
		// developer console. The actual threshold value is somewhat arbitrary, we just
		// need to make sure it is large enough to exclude the developer console case.

		var ww = window.innerWidth || win.width(),
			wh = window.innerHeight || win.height(),
			landscape_threshold = 50;

		initial_orientation_is_landscape = ww > wh && ( ww - wh ) > landscape_threshold;


		// Now check to see if the current window.orientation is 0 or 180.
		initial_orientation_is_default = portrait_map[ window.orientation ];

		// If the initial orientation is landscape, but window.orientation reports 0 or 180, *OR*
		// if the initial orientation is portrait, but window.orientation reports 90 or -90, we
		// need to flip our portrait_map values because landscape is the default orientation for
		// this device/browser.
		if ( ( initial_orientation_is_landscape && initial_orientation_is_default ) || ( !initial_orientation_is_landscape && !initial_orientation_is_default ) ) {
			portrait_map = { "-90": true, "90": true };
		}
	}

	$.event.special.orientationchange = $.extend( {}, $.event.special.orientationchange, {
		setup: function() {
			// If the event is supported natively, return false so that jQuery
			// will bind to the event using DOM methods.
			if ( $.support.orientation && !$.event.special.orientationchange.disabled ) {
				return false;
			}

			// Get the current orientation to avoid initial double-triggering.
			last_orientation = get_orientation();

			// Because the orientationchange event doesn't exist, simulate the
			// event by testing window dimensions on resize.
			win.bind( "throttledresize", handler );
		},
		teardown: function() {
			// If the event is not supported natively, return false so that
			// jQuery will unbind the event using DOM methods.
			if ( $.support.orientation && !$.event.special.orientationchange.disabled ) {
				return false;
			}

			// Because the orientationchange event doesn't exist, unbind the
			// resize event handler.
			win.unbind( "throttledresize", handler );
		},
		add: function( handleObj ) {
			// Save a reference to the bound event handler.
			var old_handler = handleObj.handler;


			handleObj.handler = function( event ) {
				// Modify event object, adding the .orientation property.
				event.orientation = get_orientation();

				// Call the originally-bound event handler and return its result.
				return old_handler.apply( this, arguments );
			};
		}
	});

	// If the event is not supported natively, this handler will be bound to
	// the window resize event to simulate the orientationchange event.
	function handler() {
		// Get the current orientation.
		var orientation = get_orientation();

		if ( orientation !== last_orientation ) {
			// The orientation has changed, so trigger the orientationchange event.
			last_orientation = orientation;
			win.trigger( event_name );
		}
	}

	// Get the current page orientation. This method is exposed publicly, should it
	// be needed, as jQuery.event.special.orientationchange.orientation()
	$.event.special.orientationchange.orientation = get_orientation = function() {
		var isPortrait = true, elem = document.documentElement;

		// prefer window orientation to the calculation based on screensize as
		// the actual screen resize takes place before or after the orientation change event
		// has been fired depending on implementation (eg android 2.3 is before, iphone after).
		// More testing is required to determine if a more reliable method of determining the new screensize
		// is possible when orientationchange is fired. (eg, use media queries + element + opacity)
		if ( $.support.orientation ) {
			// if the window orientation registers as 0 or 180 degrees report
			// portrait, otherwise landscape
			isPortrait = portrait_map[ window.orientation ];
		} else {
			isPortrait = elem && elem.clientWidth / elem.clientHeight < 1.1;
		}

		return isPortrait ? "portrait" : "landscape";
	};

	$.fn[ event_name ] = function( fn ) {
		return fn ? this.bind( event_name, fn ) : this.trigger( event_name );
	};

	// jQuery < 1.8
	if ( $.attrFn ) {
		$.attrFn[ event_name ] = true;
	}

}( jQuery, this ));



(function( $, undefined ) {

$.widget( "mobile.page", $.mobile.widget, {
	options: {
		theme: "c",
		domCache: false,
		keepNativeDefault: ":jqmData(role='none'), :jqmData(role='nojs')"
	},

	_create: function() {
		// if false is returned by the callbacks do not create the page
		if ( this._trigger( "beforecreate" ) === false ) {
			return false;
		}

		this.element
			.attr( "tabindex", "0" )
			.addClass( "ui-page ui-body-" + this.options.theme );

		this._on( this.element, {
			pagebeforehide: "removeContainerBackground",
			pagebeforeshow: "_handlePageBeforeShow"
		});
	},

	_handlePageBeforeShow: function( e ) {
		this.setContainerBackground();
	},

	removeContainerBackground: function() {
		$.mobile.pageContainer.removeClass( "ui-overlay-" + $.mobile.getInheritedTheme( this.element.parent() ) );
	},

	// set the page container background to the page theme
	setContainerBackground: function( theme ) {
		if ( this.options.theme ) {
			$.mobile.pageContainer.addClass( "ui-overlay-" + ( theme || this.options.theme ) );
		}
	},

	keepNativeSelector: function() {
		var options = this.options,
			keepNativeDefined = options.keepNative && $.trim( options.keepNative );

		if ( keepNativeDefined && options.keepNative !== options.keepNativeDefault ) {
			return [options.keepNative, options.keepNativeDefault].join( ", " );
		}

		return options.keepNativeDefault;
	}
});
})( jQuery );

(function( $, window, undefined ) {

var createHandler = function( sequential ) {

	// Default to sequential
	if ( sequential === undefined ) {
		sequential = true;
	}

	return function( name, reverse, $to, $from ) {

		var deferred = new $.Deferred(),
			reverseClass = reverse ? " reverse" : "",
			active	= $.mobile.urlHistory.getActive(),
			toScroll = active.lastScroll || $.mobile.defaultHomeScroll,
			screenHeight = $.mobile.getScreenHeight(),
			maxTransitionOverride = $.mobile.maxTransitionWidth !== false && $.mobile.window.width() > $.mobile.maxTransitionWidth,
			none = !$.support.cssTransitions || maxTransitionOverride || !name || name === "none" || Math.max( $.mobile.window.scrollTop(), toScroll ) > $.mobile.getMaxScrollForTransition(),
			toPreClass = " ui-page-pre-in",
			toggleViewportClass = function() {
				$.mobile.pageContainer.toggleClass( "ui-mobile-viewport-transitioning viewport-" + name );
			},
			scrollPage = function() {
				// By using scrollTo instead of silentScroll, we can keep things better in order
				// Just to be precautios, disable scrollstart listening like silentScroll would
				$.event.special.scrollstart.enabled = false;

				window.scrollTo( 0, toScroll );

				// reenable scrollstart listening like silentScroll would
				setTimeout( function() {
					$.event.special.scrollstart.enabled = true;
				}, 150 );
			},
			cleanFrom = function() {
				$from
					.removeClass( $.mobile.activePageClass + " out in reverse " + name )
					.height( "" );
			},
			startOut = function() {
				// if it's not sequential, call the doneOut transition to start the TO page animating in simultaneously
				if ( !sequential ) {
					doneOut();
				}
				else {
					$from.animationComplete( doneOut );
				}

				// Set the from page's height and start it transitioning out
				// Note: setting an explicit height helps eliminate tiling in the transitions
				$from
					.height( screenHeight + $.mobile.window.scrollTop() )
					.addClass( name + " out" + reverseClass );
			},

			doneOut = function() {

				if ( $from && sequential ) {
					cleanFrom();
				}

				startIn();
			},

			startIn = function() {

				// Prevent flickering in phonegap container: see comments at #4024 regarding iOS
				$to.css( "z-index", -10 );

				$to.addClass( $.mobile.activePageClass + toPreClass );

				// Send focus to page as it is now display: block
				$.mobile.focusPage( $to );

				// Set to page height
				$to.height( screenHeight + toScroll );

				scrollPage();

				// Restores visibility of the new page: added together with $to.css( "z-index", -10 );
				$to.css( "z-index", "" );

				if ( !none ) {
					$to.animationComplete( doneIn );
				}

				$to
					.removeClass( toPreClass )
					.addClass( name + " in" + reverseClass );

				if ( none ) {
					doneIn();
				}

			},

			doneIn = function() {

				if ( !sequential ) {

					if ( $from ) {
						cleanFrom();
					}
				}

				$to
					.removeClass( "out in reverse " + name )
					.height( "" );

				toggleViewportClass();

				// In some browsers (iOS5), 3D transitions block the ability to scroll to the desired location during transition
				// This ensures we jump to that spot after the fact, if we aren't there already.
				if ( $.mobile.window.scrollTop() !== toScroll ) {
					scrollPage();
				}

				deferred.resolve( name, reverse, $to, $from, true );
			};

		toggleViewportClass();

		if ( $from && !none ) {
			startOut();
		}
		else {
			doneOut();
		}

		return deferred.promise();
	};
};

// generate the handlers from the above
var sequentialHandler = createHandler(),
	simultaneousHandler = createHandler( false ),
	defaultGetMaxScrollForTransition = function() {
		return $.mobile.getScreenHeight() * 3;
	};

// Make our transition handler the public default.
$.mobile.defaultTransitionHandler = sequentialHandler;

//transition handler dictionary for 3rd party transitions
$.mobile.transitionHandlers = {
	"default": $.mobile.defaultTransitionHandler,
	"sequential": sequentialHandler,
	"simultaneous": simultaneousHandler
};

$.mobile.transitionFallbacks = {};

// If transition is defined, check if css 3D transforms are supported, and if not, if a fallback is specified
$.mobile._maybeDegradeTransition = function( transition ) {
		if ( transition && !$.support.cssTransform3d && $.mobile.transitionFallbacks[ transition ] ) {
			transition = $.mobile.transitionFallbacks[ transition ];
		}

		return transition;
};

// Set the getMaxScrollForTransition to default if no implementation was set by user
$.mobile.getMaxScrollForTransition = $.mobile.getMaxScrollForTransition || defaultGetMaxScrollForTransition;
})( jQuery, this );

(function( $, undefined ) {

	//define vars for interal use
	var $window = $.mobile.window,
		$html = $( 'html' ),
		$head = $( 'head' ),

		// NOTE: path extensions dependent on core attributes. Moved here to remove deps from
		//       $.mobile.path definition
		path = $.extend($.mobile.path, {

			//return the substring of a filepath before the sub-page key, for making a server request
			getFilePath: function( path ) {
				var splitkey = '&' + $.mobile.subPageUrlKey;
				return path && path.split( splitkey )[0].split( dialogHashKey )[0];
			},

			//check if the specified url refers to the first page in the main application document.
			isFirstPageUrl: function( url ) {
				// We only deal with absolute paths.
				var u = path.parseUrl( path.makeUrlAbsolute( url, this.documentBase ) ),

					// Does the url have the same path as the document?
					samePath = u.hrefNoHash === this.documentUrl.hrefNoHash || ( this.documentBaseDiffers && u.hrefNoHash === this.documentBase.hrefNoHash ),

					// Get the first page element.
					fp = $.mobile.firstPage,

					// Get the id of the first page element if it has one.
					fpId = fp && fp[0] ? fp[0].id : undefined;

				// The url refers to the first page if the path matches the document and
				// it either has no hash value, or the hash is exactly equal to the id of the
				// first page element.
				return samePath && ( !u.hash || u.hash === "#" || ( fpId && u.hash.replace( /^#/, "" ) === fpId ) );
			},

			// Some embedded browsers, like the web view in Phone Gap, allow cross-domain XHR
			// requests if the document doing the request was loaded via the file:// protocol.
			// This is usually to allow the application to "phone home" and fetch app specific
			// data. We normally let the browser handle external/cross-domain urls, but if the
			// allowCrossDomainPages option is true, we will allow cross-domain http/https
			// requests to go through our page loading logic.
			isPermittedCrossDomainRequest: function( docUrl, reqUrl ) {
				return $.mobile.allowCrossDomainPages &&
					docUrl.protocol === "file:" &&
					reqUrl.search( /^https?:/ ) !== -1;
			}
		}),

		// used to track last vclicked element to make sure its value is added to form data
		$lastVClicked = null,

		//will be defined when a link is clicked and given an active class
		$activeClickedLink = null,

		// resolved on domready
		domreadyDeferred = $.Deferred(),

		//urlHistory is purely here to make guesses at whether the back or forward button was clicked
		//and provide an appropriate transition
		urlHistory = $.mobile.navigate.history,

		//define first selector to receive focus when a page is shown
		focusable = "[tabindex],a,button:visible,select:visible,input",

		//queue to hold simultanious page transitions
		pageTransitionQueue = [],

		//indicates whether or not page is in process of transitioning
		isPageTransitioning = false,

		//nonsense hash change key for dialogs, so they create a history entry
		dialogHashKey = "&ui-state=dialog",

		//existing base tag?
		$base = $head.children( "base" ),

		//tuck away the original document URL minus any fragment.
		documentUrl = path.documentUrl,

		//if the document has an embedded base tag, documentBase is set to its
		//initial value. If a base tag does not exist, then we default to the documentUrl.
		documentBase = path.documentBase,

		//cache the comparison once.
		documentBaseDiffers = path.documentBaseDiffers,

		getScreenHeight = $.mobile.getScreenHeight;

		//base element management, defined depending on dynamic base tag support
		var base = $.support.dynamicBaseTag ? {

			//define base element, for use in routing asset urls that are referenced in Ajax-requested markup
			element: ( $base.length ? $base : $( "<base>", { href: documentBase.hrefNoHash } ).prependTo( $head ) ),

			//set the generated BASE element's href attribute to a new page's base path
			set: function( href ) {
				href = path.parseUrl(href).hrefNoHash;
				base.element.attr( "href", path.makeUrlAbsolute( href, documentBase ) );
			},

			//set the generated BASE element's href attribute to a new page's base path
			reset: function() {
				base.element.attr( "href", documentBase.hrefNoSearch );
			}

		} : undefined;


	//return the original document url
	$.mobile.getDocumentUrl = path.getDocumentUrl;

	//return the original document base url
	$.mobile.getDocumentBase = path.getDocumentBase;

	/* internal utility functions */

	// NOTE Issue #4950 Android phonegap doesn't navigate back properly
	//      when a full page refresh has taken place. It appears that hashchange
	//      and replacestate history alterations work fine but we need to support
	//      both forms of history traversal in our code that uses backward history
	//      movement
	$.mobile.back = function() {
		var nav = window.navigator;

		// if the setting is on and the navigator object is
		// available use the phonegap navigation capability
		if( this.phonegapNavigationEnabled &&
			nav &&
			nav.app &&
			nav.app.backHistory ){
			nav.app.backHistory();
		} else {
			window.history.back();
		}
	};

	//direct focus to the page title, or otherwise first focusable element
	$.mobile.focusPage = function ( page ) {
		var autofocus = page.find( "[autofocus]" ),
			pageTitle = page.find( ".ui-title:eq(0)" );

		if ( autofocus.length ) {
			autofocus.focus();
			return;
		}

		if ( pageTitle.length ) {
			pageTitle.focus();
		} else{
			page.focus();
		}
	};

	//remove active classes after page transition or error
	function removeActiveLinkClass( forceRemoval ) {
		if ( !!$activeClickedLink && ( !$activeClickedLink.closest( "." + $.mobile.activePageClass ).length || forceRemoval ) ) {
			$activeClickedLink.removeClass( $.mobile.activeBtnClass );
		}
		$activeClickedLink = null;
	}

	function releasePageTransitionLock() {
		isPageTransitioning = false;
		if ( pageTransitionQueue.length > 0 ) {
			$.mobile.changePage.apply( null, pageTransitionQueue.pop() );
		}
	}

	// Save the last scroll distance per page, before it is hidden
	var setLastScrollEnabled = true,
		setLastScroll, delayedSetLastScroll;

	setLastScroll = function() {
		// this barrier prevents setting the scroll value based on the browser
		// scrolling the window based on a hashchange
		if ( !setLastScrollEnabled ) {
			return;
		}

		var active = $.mobile.urlHistory.getActive();

		if ( active ) {
			var lastScroll = $window.scrollTop();

			// Set active page's lastScroll prop.
			// If the location we're scrolling to is less than minScrollBack, let it go.
			active.lastScroll = lastScroll < $.mobile.minScrollBack ? $.mobile.defaultHomeScroll : lastScroll;
		}
	};

	// bind to scrollstop to gather scroll position. The delay allows for the hashchange
	// event to fire and disable scroll recording in the case where the browser scrolls
	// to the hash targets location (sometimes the top of the page). once pagechange fires
	// getLastScroll is again permitted to operate
	delayedSetLastScroll = function() {
		setTimeout( setLastScroll, 100 );
	};

	// disable an scroll setting when a hashchange has been fired, this only works
	// because the recording of the scroll position is delayed for 100ms after
	// the browser might have changed the position because of the hashchange
	$window.bind( $.support.pushState ? "popstate" : "hashchange", function() {
		setLastScrollEnabled = false;
	});

	// handle initial hashchange from chrome :(
	$window.one( $.support.pushState ? "popstate" : "hashchange", function() {
		setLastScrollEnabled = true;
	});

	// wait until the mobile page container has been determined to bind to pagechange
	$window.one( "pagecontainercreate", function() {
		// once the page has changed, re-enable the scroll recording
		$.mobile.pageContainer.bind( "pagechange", function() {

			setLastScrollEnabled = true;

			// remove any binding that previously existed on the get scroll
			// which may or may not be different than the scroll element determined for
			// this page previously
			$window.unbind( "scrollstop", delayedSetLastScroll );

			// determine and bind to the current scoll element which may be the window
			// or in the case of touch overflow the element with touch overflow
			$window.bind( "scrollstop", delayedSetLastScroll );
		});
	});

	// bind to scrollstop for the first page as "pagechange" won't be fired in that case
	$window.bind( "scrollstop", delayedSetLastScroll );

	// No-op implementation of transition degradation
	$.mobile._maybeDegradeTransition = $.mobile._maybeDegradeTransition || function( transition ) {
		return transition;
	};

	//function for transitioning between two existing pages
	function transitionPages( toPage, fromPage, transition, reverse ) {
		if ( fromPage ) {
			//trigger before show/hide events
			fromPage.data( "mobile-page" )._trigger( "beforehide", null, { nextPage: toPage } );
		}

		toPage.data( "mobile-page" )._trigger( "beforeshow", null, { prevPage: fromPage || $( "" ) } );

		//clear page loader
		$.mobile.hidePageLoadingMsg();

		transition = $.mobile._maybeDegradeTransition( transition );

		//find the transition handler for the specified transition. If there
		//isn't one in our transitionHandlers dictionary, use the default one.
		//call the handler immediately to kick-off the transition.
		var th = $.mobile.transitionHandlers[ transition || "default" ] || $.mobile.defaultTransitionHandler,
			promise = th( transition, reverse, toPage, fromPage );

		promise.done(function() {
			//trigger show/hide events
			if ( fromPage ) {
				fromPage.data( "mobile-page" )._trigger( "hide", null, { nextPage: toPage } );
			}

			//trigger pageshow, define prevPage as either fromPage or empty jQuery obj
			toPage.data( "mobile-page" )._trigger( "show", null, { prevPage: fromPage || $( "" ) } );
		});

		return promise;
	}

	//simply set the active page's minimum height to screen height, depending on orientation
	$.mobile.resetActivePageHeight = function resetActivePageHeight( height ) {
		var aPage = $( "." + $.mobile.activePageClass ),
			aPagePadT = parseFloat( aPage.css( "padding-top" ) ),
			aPagePadB = parseFloat( aPage.css( "padding-bottom" ) ),
			aPageBorderT = parseFloat( aPage.css( "border-top-width" ) ),
			aPageBorderB = parseFloat( aPage.css( "border-bottom-width" ) );

		height = ( typeof height === "number" )? height : getScreenHeight();
		
		aPage.css( "min-height", height - aPagePadT - aPagePadB - aPageBorderT - aPageBorderB );
	};

	//shared page enhancements
	function enhancePage( $page, role ) {
		// If a role was specified, make sure the data-role attribute
		// on the page element is in sync.
		if ( role ) {
			$page.attr( "data-" + $.mobile.ns + "role", role );
		}

		//run page plugin
		$page.page();
	}

	// determine the current base url
	function findBaseWithDefault() {
		var closestBase = ( $.mobile.activePage && getClosestBaseUrl( $.mobile.activePage ) );
		return closestBase || documentBase.hrefNoHash;
	}

	/* exposed $.mobile methods */

	//animation complete callback
	$.fn.animationComplete = function( callback ) {
		if ( $.support.cssTransitions ) {
			return $( this ).one( 'webkitAnimationEnd animationend', callback );
		}
		else{
			// defer execution for consistency between webkit/non webkit
			setTimeout( callback, 0 );
			return $( this );
		}
	};

	//expose path object on $.mobile
	$.mobile.path = path;

	//expose base object on $.mobile
	$.mobile.base = base;

	//history stack
	$.mobile.urlHistory = urlHistory;

	$.mobile.dialogHashKey = dialogHashKey;

	//enable cross-domain page support
	$.mobile.allowCrossDomainPages = false;

	$.mobile._bindPageRemove = function() {
		var page = $( this );

		// when dom caching is not enabled or the page is embedded bind to remove the page on hide
		if ( !page.data( "mobile-page" ).options.domCache &&
			page.is( ":jqmData(external-page='true')" ) ) {

			page.bind( 'pagehide.remove', function( e ) {
				var $this = $( this ),
					prEvent = new $.Event( "pageremove" );

				$this.trigger( prEvent );

				if ( !prEvent.isDefaultPrevented() ) {
					$this.removeWithDependents();
				}
			});
		}
	};

	// Load a page into the DOM.
	$.mobile.loadPage = function( url, options ) {
		// This function uses deferred notifications to let callers
		// know when the page is done loading, or if an error has occurred.
		var deferred = $.Deferred(),

			// The default loadPage options with overrides specified by
			// the caller.
			settings = $.extend( {}, $.mobile.loadPage.defaults, options ),

			// The DOM element for the page after it has been loaded.
			page = null,

			// If the reloadPage option is true, and the page is already
			// in the DOM, dupCachedPage will be set to the page element
			// so that it can be removed after the new version of the
			// page is loaded off the network.
			dupCachedPage = null,

			// The absolute version of the URL passed into the function. This
			// version of the URL may contain dialog/subpage params in it.
			absUrl = path.makeUrlAbsolute( url, findBaseWithDefault() );

		// If the caller provided data, and we're using "get" request,
		// append the data to the URL.
		if ( settings.data && settings.type === "get" ) {
			absUrl = path.addSearchParams( absUrl, settings.data );
			settings.data = undefined;
		}

		// If the caller is using a "post" request, reloadPage must be true
		if ( settings.data && settings.type === "post" ) {
			settings.reloadPage = true;
		}

		// The absolute version of the URL minus any dialog/subpage params.
		// In otherwords the real URL of the page to be loaded.
		var fileUrl = path.getFilePath( absUrl ),

			// The version of the Url actually stored in the data-url attribute of
			// the page. For embedded pages, it is just the id of the page. For pages
			// within the same domain as the document base, it is the site relative
			// path. For cross-domain pages (Phone Gap only) the entire absolute Url
			// used to load the page.
			dataUrl = path.convertUrlToDataUrl( absUrl );

		// Make sure we have a pageContainer to work with.
		settings.pageContainer = settings.pageContainer || $.mobile.pageContainer;

		// Check to see if the page already exists in the DOM.
		// NOTE do _not_ use the :jqmData psuedo selector because parenthesis
		//      are a valid url char and it breaks on the first occurence
		page = settings.pageContainer.children( "[data-" + $.mobile.ns +"url='" + dataUrl + "']" );

		// If we failed to find the page, check to see if the url is a
		// reference to an embedded page. If so, it may have been dynamically
		// injected by a developer, in which case it would be lacking a data-url
		// attribute and in need of enhancement.
		if ( page.length === 0 && dataUrl && !path.isPath( dataUrl ) ) {
			page = settings.pageContainer.children( "#" + dataUrl )
				.attr( "data-" + $.mobile.ns + "url", dataUrl )
				.jqmData( "url", dataUrl );
		}

		// If we failed to find a page in the DOM, check the URL to see if it
		// refers to the first page in the application. If it isn't a reference
		// to the first page and refers to non-existent embedded page, error out.
		if ( page.length === 0 ) {
			if ( $.mobile.firstPage && path.isFirstPageUrl( fileUrl ) ) {
				// Check to make sure our cached-first-page is actually
				// in the DOM. Some user deployed apps are pruning the first
				// page from the DOM for various reasons, we check for this
				// case here because we don't want a first-page with an id
				// falling through to the non-existent embedded page error
				// case. If the first-page is not in the DOM, then we let
				// things fall through to the ajax loading code below so
				// that it gets reloaded.
				if ( $.mobile.firstPage.parent().length ) {
					page = $( $.mobile.firstPage );
				}
			} else if ( path.isEmbeddedPage( fileUrl )  ) {
				deferred.reject( absUrl, options );
				return deferred.promise();
			}
		}

		// If the page we are interested in is already in the DOM,
		// and the caller did not indicate that we should force a
		// reload of the file, we are done. Otherwise, track the
		// existing page as a duplicated.
		if ( page.length ) {
			if ( !settings.reloadPage ) {
				enhancePage( page, settings.role );
				deferred.resolve( absUrl, options, page );
				return deferred.promise();
			}
			dupCachedPage = page;
		}

		var mpc = settings.pageContainer,
			pblEvent = new $.Event( "pagebeforeload" ),
			triggerData = { url: url, absUrl: absUrl, dataUrl: dataUrl, deferred: deferred, options: settings };

		// Let listeners know we're about to load a page.
		mpc.trigger( pblEvent, triggerData );

		// If the default behavior is prevented, stop here!
		if ( pblEvent.isDefaultPrevented() ) {
			return deferred.promise();
		}

		if ( settings.showLoadMsg ) {

			// This configurable timeout allows cached pages a brief delay to load without showing a message
			var loadMsgDelay = setTimeout(function() {
					$.mobile.showPageLoadingMsg();
				}, settings.loadMsgDelay ),

				// Shared logic for clearing timeout and removing message.
				hideMsg = function() {

					// Stop message show timer
					clearTimeout( loadMsgDelay );

					// Hide loading message
					$.mobile.hidePageLoadingMsg();
				};
		}

		// Reset base to the default document base.
		if ( base ) {
			base.reset();
		}

		if ( !( $.mobile.allowCrossDomainPages || path.isSameDomain( documentUrl, absUrl ) ) ) {
			deferred.reject( absUrl, options );
		} else {
			// Load the new page.
			$.ajax({
				url: fileUrl,
				type: settings.type,
				data: settings.data,
				dataType: "html",
				success: function( html, textStatus, xhr ) {
					//pre-parse html to check for a data-url,
					//use it as the new fileUrl, base path, etc
					var all = $( "<div></div>" ),

						//page title regexp
						newPageTitle = html.match( /<title[^>]*>([^<]*)/ ) && RegExp.$1,

						// TODO handle dialogs again
						pageElemRegex = new RegExp( "(<[^>]+\\bdata-" + $.mobile.ns + "role=[\"']?page[\"']?[^>]*>)" ),
						dataUrlRegex = new RegExp( "\\bdata-" + $.mobile.ns + "url=[\"']?([^\"'>]*)[\"']?" );


					// data-url must be provided for the base tag so resource requests can be directed to the
					// correct url. loading into a temprorary element makes these requests immediately
					if ( pageElemRegex.test( html ) &&
							RegExp.$1 &&
							dataUrlRegex.test( RegExp.$1 ) &&
							RegExp.$1 ) {
						url = fileUrl = path.getFilePath( $( "<div>" + RegExp.$1 + "</div>" ).text() );
					}

					if ( base ) {
						base.set( fileUrl );
					}

					//workaround to allow scripts to execute when included in page divs
					all.get( 0 ).innerHTML = html;
					page = all.find( ":jqmData(role='page'), :jqmData(role='dialog')" ).first();

					//if page elem couldn't be found, create one and insert the body element's contents
					if ( !page.length ) {
						page = $( "<div data-" + $.mobile.ns + "role='page'>" + ( html.split( /<\/?body[^>]*>/gmi )[1] || "" ) + "</div>" );
					}

					if ( newPageTitle && !page.jqmData( "title" ) ) {
						if ( ~newPageTitle.indexOf( "&" ) ) {
							newPageTitle = $( "<div>" + newPageTitle + "</div>" ).text();
						}
						page.jqmData( "title", newPageTitle );
					}

					//rewrite src and href attrs to use a base url
					if ( !$.support.dynamicBaseTag ) {
						var newPath = path.get( fileUrl );
						page.find( "[src], link[href], a[rel='external'], :jqmData(ajax='false'), a[target]" ).each(function() {
							var thisAttr = $( this ).is( '[href]' ) ? 'href' :
									$( this ).is( '[src]' ) ? 'src' : 'action',
								thisUrl = $( this ).attr( thisAttr );

							// XXX_jblas: We need to fix this so that it removes the document
							//            base URL, and then prepends with the new page URL.
							//if full path exists and is same, chop it - helps IE out
							thisUrl = thisUrl.replace( location.protocol + '//' + location.host + location.pathname, '' );

							if ( !/^(\w+:|#|\/)/.test( thisUrl ) ) {
								$( this ).attr( thisAttr, newPath + thisUrl );
							}
						});
					}

					//append to page and enhance
					// TODO taging a page with external to make sure that embedded pages aren't removed
					//      by the various page handling code is bad. Having page handling code in many
					//      places is bad. Solutions post 1.0
					page
						.attr( "data-" + $.mobile.ns + "url", path.convertUrlToDataUrl( fileUrl ) )
						.attr( "data-" + $.mobile.ns + "external-page", true )
						.appendTo( settings.pageContainer );

					// wait for page creation to leverage options defined on widget
					page.one( 'pagecreate', $.mobile._bindPageRemove );

					enhancePage( page, settings.role );

					// Enhancing the page may result in new dialogs/sub pages being inserted
					// into the DOM. If the original absUrl refers to a sub-page, that is the
					// real page we are interested in.
					if ( absUrl.indexOf( "&" + $.mobile.subPageUrlKey ) > -1 ) {
						page = settings.pageContainer.children( "[data-" + $.mobile.ns +"url='" + dataUrl + "']" );
					}

					// Remove loading message.
					if ( settings.showLoadMsg ) {
						hideMsg();
					}

					// Add the page reference and xhr to our triggerData.
					triggerData.xhr = xhr;
					triggerData.textStatus = textStatus;
					triggerData.page = page;

					// Let listeners know the page loaded successfully.
					settings.pageContainer.trigger( "pageload", triggerData );

					deferred.resolve( absUrl, options, page, dupCachedPage );
				},
				error: function( xhr, textStatus, errorThrown ) {
					//set base back to current path
					if ( base ) {
						base.set( path.get() );
					}

					// Add error info to our triggerData.
					triggerData.xhr = xhr;
					triggerData.textStatus = textStatus;
					triggerData.errorThrown = errorThrown;

					var plfEvent = new $.Event( "pageloadfailed" );

					// Let listeners know the page load failed.
					settings.pageContainer.trigger( plfEvent, triggerData );

					// If the default behavior is prevented, stop here!
					// Note that it is the responsibility of the listener/handler
					// that called preventDefault(), to resolve/reject the
					// deferred object within the triggerData.
					if ( plfEvent.isDefaultPrevented() ) {
						return;
					}

					// Remove loading message.
					if ( settings.showLoadMsg ) {

						// Remove loading message.
						hideMsg();

						// show error message
						$.mobile.showPageLoadingMsg( $.mobile.pageLoadErrorMessageTheme, $.mobile.pageLoadErrorMessage, true );

						// hide after delay
						setTimeout( $.mobile.hidePageLoadingMsg, 1500 );
					}

					deferred.reject( absUrl, options );
				}
			});
		}

		return deferred.promise();
	};

	$.mobile.loadPage.defaults = {
		type: "get",
		data: undefined,
		reloadPage: false,
		role: undefined, // By default we rely on the role defined by the @data-role attribute.
		showLoadMsg: false,
		pageContainer: undefined,
		loadMsgDelay: 50 // This delay allows loads that pull from browser cache to occur without showing the loading message.
	};

	// Show a specific page in the page container.
	$.mobile.changePage = function( toPage, options ) {
		// If we are in the midst of a transition, queue the current request.
		// We'll call changePage() once we're done with the current transition to
		// service the request.
		if ( isPageTransitioning ) {
			pageTransitionQueue.unshift( arguments );
			return;
		}

		var settings = $.extend( {}, $.mobile.changePage.defaults, options ), isToPageString;

		// Make sure we have a pageContainer to work with.
		settings.pageContainer = settings.pageContainer || $.mobile.pageContainer;

		// Make sure we have a fromPage.
		settings.fromPage = settings.fromPage || $.mobile.activePage;

		isToPageString = (typeof toPage === "string");

		var mpc = settings.pageContainer,
			pbcEvent = new $.Event( "pagebeforechange" ),
			triggerData = { toPage: toPage, options: settings };

		// NOTE: preserve the original target as the dataUrl value will be simplified
		//       eg, removing ui-state, and removing query params from the hash
		//       this is so that users who want to use query params have access to them
		//       in the event bindings for the page life cycle See issue #5085
		if ( isToPageString ) {
			// if the toPage is a string simply convert it
			triggerData.absUrl = path.makeUrlAbsolute( toPage, findBaseWithDefault() );
		} else {
			// if the toPage is a jQuery object grab the absolute url stored
			// in the loadPage callback where it exists
			triggerData.absUrl = toPage.data( 'absUrl' );
		}

		// Let listeners know we're about to change the current page.
		mpc.trigger( pbcEvent, triggerData );

		// If the default behavior is prevented, stop here!
		if ( pbcEvent.isDefaultPrevented() ) {
			return;
		}

		// We allow "pagebeforechange" observers to modify the toPage in the trigger
		// data to allow for redirects. Make sure our toPage is updated.
		//
		// We also need to re-evaluate whether it is a string, because an object can
		// also be replaced by a string

		toPage = triggerData.toPage;
		isToPageString = (typeof toPage === "string");

		// Set the isPageTransitioning flag to prevent any requests from
		// entering this method while we are in the midst of loading a page
		// or transitioning.
		isPageTransitioning = true;

		// If the caller passed us a url, call loadPage()
		// to make sure it is loaded into the DOM. We'll listen
		// to the promise object it returns so we know when
		// it is done loading or if an error ocurred.
		if ( isToPageString ) {
			// preserve the original target as the dataUrl value will be simplified
			// eg, removing ui-state, and removing query params from the hash
			// this is so that users who want to use query params have access to them
			// in the event bindings for the page life cycle See issue #5085
			settings.target = toPage;

			$.mobile.loadPage( toPage, settings )
				.done(function( url, options, newPage, dupCachedPage ) {
					isPageTransitioning = false;
					options.duplicateCachedPage = dupCachedPage;

					// store the original absolute url so that it can be provided
					// to events in the triggerData of the subsequent changePage call
					newPage.data( 'absUrl', triggerData.absUrl );
					$.mobile.changePage( newPage, options );
				})
				.fail(function( url, options ) {
					isPageTransitioning = false;

					//clear out the active button state
					removeActiveLinkClass( true );

					//release transition lock so navigation is free again
					releasePageTransitionLock();
					settings.pageContainer.trigger( "pagechangefailed", triggerData );
				});
			return;
		}

		// If we are going to the first-page of the application, we need to make
		// sure settings.dataUrl is set to the application document url. This allows
		// us to avoid generating a document url with an id hash in the case where the
		// first-page of the document has an id attribute specified.
		if ( toPage[ 0 ] === $.mobile.firstPage[ 0 ] && !settings.dataUrl ) {
			settings.dataUrl = documentUrl.hrefNoHash;
		}

		// The caller passed us a real page DOM element. Update our
		// internal state and then trigger a transition to the page.
		var fromPage = settings.fromPage,
			url = ( settings.dataUrl && path.convertUrlToDataUrl( settings.dataUrl ) ) || toPage.jqmData( "url" ),
			// The pageUrl var is usually the same as url, except when url is obscured as a dialog url. pageUrl always contains the file path
			pageUrl = url,
			fileUrl = path.getFilePath( url ),
			active = urlHistory.getActive(),
			activeIsInitialPage = urlHistory.activeIndex === 0,
			historyDir = 0,
			pageTitle = document.title,
			isDialog = settings.role === "dialog" || toPage.jqmData( "role" ) === "dialog";


		// By default, we prevent changePage requests when the fromPage and toPage
		// are the same element, but folks that generate content manually/dynamically
		// and reuse pages want to be able to transition to the same page. To allow
		// this, they will need to change the default value of allowSamePageTransition
		// to true, *OR*, pass it in as an option when they manually call changePage().
		// It should be noted that our default transition animations assume that the
		// formPage and toPage are different elements, so they may behave unexpectedly.
		// It is up to the developer that turns on the allowSamePageTransitiona option
		// to either turn off transition animations, or make sure that an appropriate
		// animation transition is used.
		if ( fromPage && fromPage[0] === toPage[0] && !settings.allowSamePageTransition ) {
			isPageTransitioning = false;
			mpc.trigger( "pagechange", triggerData );

			// Even if there is no page change to be done, we should keep the urlHistory in sync with the hash changes
			if ( settings.fromHashChange ) {
				urlHistory.direct({ url: url });
			}

			return;
		}

		// We need to make sure the page we are given has already been enhanced.
		enhancePage( toPage, settings.role );

		// If the changePage request was sent from a hashChange event, check to see if the
		// page is already within the urlHistory stack. If so, we'll assume the user hit
		// the forward/back button and will try to match the transition accordingly.
		if ( settings.fromHashChange ) {
			historyDir = options.direction === "back" ? -1 : 1;
		}

		// Kill the keyboard.
		// XXX_jblas: We need to stop crawling the entire document to kill focus. Instead,
		//            we should be tracking focus with a delegate() handler so we already have
		//            the element in hand at this point.
		// Wrap this in a try/catch block since IE9 throw "Unspecified error" if document.activeElement
		// is undefined when we are in an IFrame.
		try {
			if ( document.activeElement && document.activeElement.nodeName.toLowerCase() !== 'body' ) {
				$( document.activeElement ).blur();
			} else {
				$( "input:focus, textarea:focus, select:focus" ).blur();
			}
		} catch( e ) {}

		// Record whether we are at a place in history where a dialog used to be - if so, do not add a new history entry and do not change the hash either
		var alreadyThere = false;

		// If we're displaying the page as a dialog, we don't want the url
		// for the dialog content to be used in the hash. Instead, we want
		// to append the dialogHashKey to the url of the current page.
		if ( isDialog && active ) {
			// on the initial page load active.url is undefined and in that case should
			// be an empty string. Moving the undefined -> empty string back into
			// urlHistory.addNew seemed imprudent given undefined better represents
			// the url state

			// If we are at a place in history that once belonged to a dialog, reuse
			// this state without adding to urlHistory and without modifying the hash.
			// However, if a dialog is already displayed at this point, and we're
			// about to display another dialog, then we must add another hash and
			// history entry on top so that one may navigate back to the original dialog
			if ( active.url &&
				active.url.indexOf( dialogHashKey ) > -1 &&
				$.mobile.activePage &&
				!$.mobile.activePage.is( ".ui-dialog" ) &&
				urlHistory.activeIndex > 0 ) {
				settings.changeHash = false;
				alreadyThere = true;
			}

			// Normally, we tack on a dialog hash key, but if this is the location of a stale dialog,
			// we reuse the URL from the entry
			url = ( active.url || "" );

			// account for absolute urls instead of just relative urls use as hashes
			if( !alreadyThere && url.indexOf("#") > -1 ) {
				url += dialogHashKey;
			} else {
				url += "#" + dialogHashKey;
			}

			// tack on another dialogHashKey if this is the same as the initial hash
			// this makes sure that a history entry is created for this dialog
			if ( urlHistory.activeIndex === 0 && url === urlHistory.initialDst ) {
				url += dialogHashKey;
			}
		}

		// if title element wasn't found, try the page div data attr too
		// If this is a deep-link or a reload ( active === undefined ) then just use pageTitle
		var newPageTitle = ( !active )? pageTitle : toPage.jqmData( "title" ) || toPage.children( ":jqmData(role='header')" ).find( ".ui-title" ).getEncodedText();
		if ( !!newPageTitle && pageTitle === document.title ) {
			pageTitle = newPageTitle;
		}
		if ( !toPage.jqmData( "title" ) ) {
			toPage.jqmData( "title", pageTitle );
		}

		// Make sure we have a transition defined.
		settings.transition = settings.transition ||
			( ( historyDir && !activeIsInitialPage ) ? active.transition : undefined ) ||
			( isDialog ? $.mobile.defaultDialogTransition : $.mobile.defaultPageTransition );

		//add page to history stack if it's not back or forward
		if ( !historyDir && alreadyThere ) {
			urlHistory.getActive().pageUrl = pageUrl;
		}

		// Set the location hash.
		if ( url && !settings.fromHashChange ) {
			var params;

			// rebuilding the hash here since we loose it earlier on
			// TODO preserve the originally passed in path
			if( !path.isPath( url ) && url.indexOf( "#" ) < 0 ) {
				url = "#" + url;
			}

			// TODO the property names here are just silly
			params = {
				transition: settings.transition,
				title: pageTitle,
				pageUrl: pageUrl,
				role: settings.role
			};

			if ( settings.changeHash !== false && $.mobile.hashListeningEnabled ) {
				$.mobile.navigate( url, params, true);
			} else if ( toPage[ 0 ] !== $.mobile.firstPage[ 0 ] ) {
				$.mobile.navigate.history.add( url, params );
			}
		}

		//set page title
		document.title = pageTitle;

		//set "toPage" as activePage
		$.mobile.activePage = toPage;

		// If we're navigating back in the URL history, set reverse accordingly.
		settings.reverse = settings.reverse || historyDir < 0;

		transitionPages( toPage, fromPage, settings.transition, settings.reverse )
			.done(function( name, reverse, $to, $from, alreadyFocused ) {
				removeActiveLinkClass();

				//if there's a duplicateCachedPage, remove it from the DOM now that it's hidden
				if ( settings.duplicateCachedPage ) {
					settings.duplicateCachedPage.remove();
				}

				// Send focus to the newly shown page. Moved from promise .done binding in transitionPages
				// itself to avoid ie bug that reports offsetWidth as > 0 (core check for visibility)
				// despite visibility: hidden addresses issue #2965
				// https://github.com/jquery/jquery-mobile/issues/2965
				if ( !alreadyFocused ) {
					$.mobile.focusPage( toPage );
				}

				releasePageTransitionLock();
				mpc.trigger( "pagechange", triggerData );
			});
	};

	$.mobile.changePage.defaults = {
		transition: undefined,
		reverse: false,
		changeHash: true,
		fromHashChange: false,
		role: undefined, // By default we rely on the role defined by the @data-role attribute.
		duplicateCachedPage: undefined,
		pageContainer: undefined,
		showLoadMsg: true, //loading message shows by default when pages are being fetched during changePage
		dataUrl: undefined,
		fromPage: undefined,
		allowSamePageTransition: false
	};

/* Event Bindings - hashchange, submit, and click */
	function findClosestLink( ele )
	{
		while ( ele ) {
			// Look for the closest element with a nodeName of "a".
			// Note that we are checking if we have a valid nodeName
			// before attempting to access it. This is because the
			// node we get called with could have originated from within
			// an embedded SVG document where some symbol instance elements
			// don't have nodeName defined on them, or strings are of type
			// SVGAnimatedString.
			if ( ( typeof ele.nodeName === "string" ) && ele.nodeName.toLowerCase() === "a" ) {
				break;
			}
			ele = ele.parentNode;
		}
		return ele;
	}

	// The base URL for any given element depends on the page it resides in.
	function getClosestBaseUrl( ele )
	{
		// Find the closest page and extract out its url.
		var url = $( ele ).closest( ".ui-page" ).jqmData( "url" ),
			base = documentBase.hrefNoHash;

		if ( !url || !path.isPath( url ) ) {
			url = base;
		}

		return path.makeUrlAbsolute( url, base);
	}

	//The following event bindings should be bound after mobileinit has been triggered
	//the following deferred is resolved in the init file
	$.mobile.navreadyDeferred = $.Deferred();
	$.mobile._registerInternalEvents = function() {
		var getAjaxFormData = function( $form, calculateOnly ) {
			var type, target, url, ret = true, formData, vclickedName;
			if ( !$.mobile.ajaxEnabled ||
					// test that the form is, itself, ajax false
					$form.is( ":jqmData(ajax='false')" ) ||
					// test that $.mobile.ignoreContentEnabled is set and
					// the form or one of it's parents is ajax=false
					!$form.jqmHijackable().length ) {
				return false;
			}

			target = $form.attr( "target" );
			url = $form.attr( "action" );

			// If no action is specified, browsers default to using the
			// URL of the document containing the form. Since we dynamically
			// pull in pages from external documents, the form should submit
			// to the URL for the source document of the page containing
			// the form.
			if ( !url ) {
				// Get the @data-url for the page containing the form.
				url = getClosestBaseUrl( $form );
				if ( url === documentBase.hrefNoHash ) {
					// The url we got back matches the document base,
					// which means the page must be an internal/embedded page,
					// so default to using the actual document url as a browser
					// would.
					url = documentUrl.hrefNoSearch;
				}
			}

			url = path.makeUrlAbsolute(  url, getClosestBaseUrl( $form ) );

			if ( ( path.isExternal( url ) && !path.isPermittedCrossDomainRequest( documentUrl, url ) ) || target ) {
				return false;
			}

			if ( !calculateOnly ) {
				type = $form.attr( "method" );
				formData = $form.serializeArray();

				if ( $lastVClicked && $lastVClicked[ 0 ].form === $form[ 0 ] ) {
					vclickedName = $lastVClicked.attr( "name" );
					if ( vclickedName ) {
						// Make sure the last clicked element is included in the form
						$.each( formData, function( key, value ) {
							if ( value.name === vclickedName ) {
								// Unset vclickedName - we've found it in the serialized data already
								vclickedName = "";
								return false;
							}
						});
						if ( vclickedName ) {
							formData.push( { name: vclickedName, value: $lastVClicked.attr( "value" ) } );
						}
					}
				}

				ret = {
					url: url,
					options: {
						type:		type && type.length && type.toLowerCase() || "get",
						data:		$.param( formData ),
						transition:	$form.jqmData( "transition" ),
						reverse:	$form.jqmData( "direction" ) === "reverse",
						reloadPage:	true
					}
				};
			}

			return ret;
		};

		//bind to form submit events, handle with Ajax
		$.mobile.document.delegate( "form", "submit", function( event ) {
			var formData = getAjaxFormData( $( this ) );

			if ( formData ) {
				$.mobile.changePage( formData.url, formData.options );
				event.preventDefault();
			}
		});

		//add active state on vclick
		$.mobile.document.bind( "vclick", function( event ) {
			var $btn, btnEls, target = event.target, needClosest = false;
			// if this isn't a left click we don't care. Its important to note
			// that when the virtual event is generated it will create the which attr
			if ( event.which > 1 || !$.mobile.linkBindingEnabled ) {
				return;
			}

			// Record that this element was clicked, in case we need it for correct
			// form submission during the "submit" handler above
			$lastVClicked = $( target );

			// Try to find a target element to which the active class will be applied
			if ( $.data( target, "mobile-button" ) ) {
				// If the form will not be submitted via AJAX, do not add active class
				if ( !getAjaxFormData( $( target ).closest( "form" ), true ) ) {
					return;
				}
				// We will apply the active state to this button widget - the parent
				// of the input that was clicked will have the associated data
				if ( target.parentNode ) {
					target = target.parentNode;
				}
			} else {
				target = findClosestLink( target );
				if ( !( target && path.parseUrl( target.getAttribute( "href" ) || "#" ).hash !== "#" ) ) {
					return;
				}

				// TODO teach $.mobile.hijackable to operate on raw dom elements so the
				// link wrapping can be avoided
				if ( !$( target ).jqmHijackable().length ) {
					return;
				}
			}

			// Avoid calling .closest by using the data set during .buttonMarkup()
			// List items have the button data in the parent of the element clicked
			if ( !!~target.className.indexOf( "ui-link-inherit" ) ) {
				if ( target.parentNode ) {
					btnEls = $.data( target.parentNode, "buttonElements" );
				}
			// Otherwise, look for the data on the target itself
			} else {
				btnEls = $.data( target, "buttonElements" );
			}
			// If found, grab the button's outer element
			if ( btnEls ) {
				target = btnEls.outer;
			} else {
				needClosest = true;
			}

			$btn = $( target );
			// If the outer element wasn't found by the our heuristics, use .closest()
			if ( needClosest ) {
				$btn = $btn.closest( ".ui-btn" );
			}

			if ( $btn.length > 0 && !$btn.hasClass( "ui-disabled" ) ) {
				removeActiveLinkClass( true );
				$activeClickedLink = $btn;
				$activeClickedLink.addClass( $.mobile.activeBtnClass );
			}
		});

		// click routing - direct to HTTP or Ajax, accordingly
		$.mobile.document.bind( "click", function( event ) {
			if ( !$.mobile.linkBindingEnabled || event.isDefaultPrevented() ) {
				return;
			}

			var link = findClosestLink( event.target ), $link = $( link ), httpCleanup;

			// If there is no link associated with the click or its not a left
			// click we want to ignore the click
			// TODO teach $.mobile.hijackable to operate on raw dom elements so the link wrapping
			// can be avoided
			if ( !link || event.which > 1 || !$link.jqmHijackable().length ) {
				return;
			}

			//remove active link class if external (then it won't be there if you come back)
			httpCleanup = function() {
				window.setTimeout(function() { removeActiveLinkClass( true ); }, 200 );
			};

			//if there's a data-rel=back attr, go back in history
			if ( $link.is( ":jqmData(rel='back')" ) ) {
				$.mobile.back();
				return false;
			}

			var baseUrl = getClosestBaseUrl( $link ),

				//get href, if defined, otherwise default to empty hash
				href = path.makeUrlAbsolute( $link.attr( "href" ) || "#", baseUrl );

			//if ajax is disabled, exit early
			if ( !$.mobile.ajaxEnabled && !path.isEmbeddedPage( href ) ) {
				httpCleanup();
				//use default click handling
				return;
			}

			// XXX_jblas: Ideally links to application pages should be specified as
			//            an url to the application document with a hash that is either
			//            the site relative path or id to the page. But some of the
			//            internal code that dynamically generates sub-pages for nested
			//            lists and select dialogs, just write a hash in the link they
			//            create. This means the actual URL path is based on whatever
			//            the current value of the base tag is at the time this code
			//            is called. For now we are just assuming that any url with a
			//            hash in it is an application page reference.
			if ( href.search( "#" ) !== -1 ) {
				href = href.replace( /[^#]*#/, "" );
				if ( !href ) {
					//link was an empty hash meant purely
					//for interaction, so we ignore it.
					event.preventDefault();
					return;
				} else if ( path.isPath( href ) ) {
					//we have apath so make it the href we want to load.
					href = path.makeUrlAbsolute( href, baseUrl );
				} else {
					//we have a simple id so use the documentUrl as its base.
					href = path.makeUrlAbsolute( "#" + href, documentUrl.hrefNoHash );
				}
			}

				// Should we handle this link, or let the browser deal with it?
			var useDefaultUrlHandling = $link.is( "[rel='external']" ) || $link.is( ":jqmData(ajax='false')" ) || $link.is( "[target]" ),

				// Some embedded browsers, like the web view in Phone Gap, allow cross-domain XHR
				// requests if the document doing the request was loaded via the file:// protocol.
				// This is usually to allow the application to "phone home" and fetch app specific
				// data. We normally let the browser handle external/cross-domain urls, but if the
				// allowCrossDomainPages option is true, we will allow cross-domain http/https
				// requests to go through our page loading logic.

				//check for protocol or rel and its not an embedded page
				//TODO overlap in logic from isExternal, rel=external check should be
				//     moved into more comprehensive isExternalLink
				isExternal = useDefaultUrlHandling || ( path.isExternal( href ) && !path.isPermittedCrossDomainRequest( documentUrl, href ) );

			if ( isExternal ) {
				httpCleanup();
				//use default click handling
				return;
			}

			//use ajax
			var transition = $link.jqmData( "transition" ),
				reverse = $link.jqmData( "direction" ) === "reverse" ||
							// deprecated - remove by 1.0
							$link.jqmData( "back" ),

				//this may need to be more specific as we use data-rel more
				role = $link.attr( "data-" + $.mobile.ns + "rel" ) || undefined;

			$.mobile.changePage( href, { transition: transition, reverse: reverse, role: role, link: $link } );
			event.preventDefault();
		});

		//prefetch pages when anchors with data-prefetch are encountered
		$.mobile.document.delegate( ".ui-page", "pageshow.prefetch", function() {
			var urls = [];
			$( this ).find( "a:jqmData(prefetch)" ).each(function() {
				var $link = $( this ),
					url = $link.attr( "href" );

				if ( url && $.inArray( url, urls ) === -1 ) {
					urls.push( url );

					$.mobile.loadPage( url, { role: $link.attr( "data-" + $.mobile.ns + "rel" ) } );
				}
			});
		});

		$.mobile._handleHashChange = function( url, data ) {
			//find first page via hash
			var to = path.stripHash(url),
				//transition is false if it's the first page, undefined otherwise (and may be overridden by default)
				transition = $.mobile.urlHistory.stack.length === 0 ? "none" : undefined,

				// default options for the changPage calls made after examining the current state
				// of the page and the hash, NOTE that the transition is derived from the previous
				// history entry
				changePageOptions = {
					changeHash: false,
					fromHashChange: true,
					reverse: data.direction === "back"
				};

			$.extend( changePageOptions, data, {
				transition: (urlHistory.getLast() || {}).transition || transition
			});

			// special case for dialogs
			if ( urlHistory.activeIndex > 0 && to.indexOf( dialogHashKey ) > -1 && urlHistory.initialDst !== to ) {

				// If current active page is not a dialog skip the dialog and continue
				// in the same direction
				if ( $.mobile.activePage && !$.mobile.activePage.is( ".ui-dialog" ) ) {
					//determine if we're heading forward or backward and continue accordingly past
					//the current dialog
					if( data.direction === "back" ) {
						$.mobile.back();
					} else {
						window.history.forward();
					}

					// prevent changePage call
					return;
				} else {
					// if the current active page is a dialog and we're navigating
					// to a dialog use the dialog objected saved in the stack
					to = data.pageUrl;
					var active = $.mobile.urlHistory.getActive();

					// make sure to set the role, transition and reversal
					// as most of this is lost by the domCache cleaning
					$.extend( changePageOptions, {
						role: active.role,
						transition: active.transition,
						reverse: data.direction === "back"
					});
				}
			}

			//if to is defined, load it
			if ( to ) {
				// At this point, 'to' can be one of 3 things, a cached page element from
				// a history stack entry, an id, or site-relative/absolute URL. If 'to' is
				// an id, we need to resolve it against the documentBase, not the location.href,
				// since the hashchange could've been the result of a forward/backward navigation
				// that crosses from an external page/dialog to an internal page/dialog.
				to = !path.isPath( to ) ? ( path.makeUrlAbsolute( '#' + to, documentBase ) ) : to;

				// If we're about to go to an initial URL that contains a reference to a non-existent
				// internal page, go to the first page instead. We know that the initial hash refers to a
				// non-existent page, because the initial hash did not end up in the initial urlHistory entry
				if ( to === path.makeUrlAbsolute( '#' + urlHistory.initialDst, documentBase ) &&
					urlHistory.stack.length && urlHistory.stack[0].url !== urlHistory.initialDst.replace( dialogHashKey, "" ) ) {
					to = $.mobile.firstPage;
				}

				$.mobile.changePage( to, changePageOptions );
			}	else {

				//there's no hash, go to the first page in the dom
				$.mobile.changePage( $.mobile.firstPage, changePageOptions );
			}
		};

		// TODO roll the logic here into the handleHashChange method
		$window.bind( "navigate", function( e, data ) {
			var url = $.event.special.navigate.originalEventName.indexOf( "hashchange" ) > -1 ? data.state.hash : data.state.url;

			if( !url ) {
				url = $.mobile.path.parseLocation().hash;
			}

			if( !url || url === "#" || url.indexOf( "#" + $.mobile.path.uiStateKey ) === 0 ){
				url = location.href;
			}

			$.mobile._handleHashChange( url, data.state );
		});

		//set page min-heights to be device specific
		$.mobile.document.bind( "pageshow", $.mobile.resetActivePageHeight );
		$.mobile.window.bind( "throttledresize", $.mobile.resetActivePageHeight );

	};//navreadyDeferred done callback

	$( function() { domreadyDeferred.resolve(); } );

	$.when( domreadyDeferred, $.mobile.navreadyDeferred ).done( function() { $.mobile._registerInternalEvents(); } );
})( jQuery );

/*
* fallback transition for flip in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/

(function( $, window, undefined ) {

$.mobile.transitionFallbacks.flip = "fade";

})( jQuery, this );
/*
* fallback transition for flow in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/

(function( $, window, undefined ) {

$.mobile.transitionFallbacks.flow = "fade";

})( jQuery, this );
/*
* fallback transition for pop in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/

(function( $, window, undefined ) {

$.mobile.transitionFallbacks.pop = "fade";

})( jQuery, this );
/*
* fallback transition for slide in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/

(function( $, window, undefined ) {

// Use the simultaneous transitions handler for slide transitions
$.mobile.transitionHandlers.slide = $.mobile.transitionHandlers.simultaneous;

// Set the slide transitions's fallback to "fade"
$.mobile.transitionFallbacks.slide = "fade";

})( jQuery, this );
/*
* fallback transition for slidedown in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/

(function( $, window, undefined ) {

$.mobile.transitionFallbacks.slidedown = "fade";

})( jQuery, this );
/*
* fallback transition for slidefade in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/

(function( $, window, undefined ) {

// Set the slide transitions's fallback to "fade"
$.mobile.transitionFallbacks.slidefade = "fade";

})( jQuery, this );
/*
* fallback transition for slideup in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/

(function( $, window, undefined ) {

$.mobile.transitionFallbacks.slideup = "fade";

})( jQuery, this );
/*
* fallback transition for turn in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/

(function( $, window, undefined ) {

$.mobile.transitionFallbacks.turn = "fade";

})( jQuery, this );

(function( $, undefined ) {

$.mobile.page.prototype.options.degradeInputs = {
	color: false,
	date: false,
	datetime: false,
	"datetime-local": false,
	email: false,
	month: false,
	number: false,
	range: "number",
	search: "text",
	tel: false,
	time: false,
	url: false,
	week: false
};


//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {

	var page = $.mobile.closestPageData( $( e.target ) ), options;

	if ( !page ) {
		return;
	}

	options = page.options;

	// degrade inputs to avoid poorly implemented native functionality
	$( e.target ).find( "input" ).not( page.keepNativeSelector() ).each(function() {
		var $this = $( this ),
			type = this.getAttribute( "type" ),
			optType = options.degradeInputs[ type ] || "text";

		if ( options.degradeInputs[ type ] ) {
			var html = $( "<div>" ).html( $this.clone() ).html(),
				// In IE browsers, the type sometimes doesn't exist in the cloned markup, so we replace the closing tag instead
				hasType = html.indexOf( " type=" ) > -1,
				findstr = hasType ? /\s+type=["']?\w+['"]?/ : /\/?>/,
				repstr = " type=\"" + optType + "\" data-" + $.mobile.ns + "type=\"" + type + "\"" + ( hasType ? "" : ">" );

			$this.replaceWith( html.replace( findstr, repstr ) );
		}
	});

});

})( jQuery );

(function( $, window, undefined ) {

$.widget( "mobile.dialog", $.mobile.widget, {
	options: {
		closeBtn: "left",
		closeBtnText: "Close",
		overlayTheme: "a",
		corners: true,
		initSelector: ":jqmData(role='dialog')"
	},

	// Override the theme set by the page plugin on pageshow
	_handlePageBeforeShow: function() {
		this._isCloseable = true;
		if ( this.options.overlayTheme ) {
			this.element
				.page( "removeContainerBackground" )
				.page( "setContainerBackground", this.options.overlayTheme );
		}
	},

	_create: function() {
		var self = this,
			$el = this.element,
			cornerClass = !!this.options.corners ? " ui-corner-all" : "",
			dialogWrap = $( "<div/>", {
					"role" : "dialog",
					"class" : "ui-dialog-contain ui-overlay-shadow" + cornerClass
				});

		$el.addClass( "ui-dialog ui-overlay-" + this.options.overlayTheme );

		// Class the markup for dialog styling
		// Set aria role
		$el.wrapInner( dialogWrap );

		/* bind events
			- clicks and submits should use the closing transition that the dialog opened with
				unless a data-transition is specified on the link/form
			- if the click was on the close button, or the link has a data-rel="back" it'll go back in history naturally
		*/
		$el.bind( "vclick submit", function( event ) {
			var $target = $( event.target ).closest( event.type === "vclick" ? "a" : "form" ),
				active;

			if ( $target.length && !$target.jqmData( "transition" ) ) {

				active = $.mobile.urlHistory.getActive() || {};

				$target.attr( "data-" + $.mobile.ns + "transition", ( active.transition || $.mobile.defaultDialogTransition ) )
					.attr( "data-" + $.mobile.ns + "direction", "reverse" );
			}
		});

		this._on( $el, {
			pagebeforeshow: "_handlePageBeforeShow"
		});

		$.extend( this, {
			_createComplete: false
		});

		this._setCloseBtn( this.options.closeBtn );
	},

	_setCloseBtn: function( value ) {
		var self = this, btn, location;

		if ( this._headerCloseButton ) {
			this._headerCloseButton.remove();
			this._headerCloseButton = null;
		}
		if ( value !== "none" ) {
			// Sanitize value
			location = ( value === "left" ? "left" : "right" );
			btn = $( "<a href='#' class='ui-btn-" + location + "' data-" + $.mobile.ns + "icon='delete' data-" + $.mobile.ns + "iconpos='notext'>"+ this.options.closeBtnText + "</a>" );
			this.element.children().find( ":jqmData(role='header')" ).first().prepend( btn );
			if ( this._createComplete && $.fn.buttonMarkup ) {
				btn.buttonMarkup();
			}
			this._createComplete = true;

			// this must be an anonymous function so that select menu dialogs can replace
			// the close method. This is a change from previously just defining data-rel=back
			// on the button and letting nav handle it
			//
			// Use click rather than vclick in order to prevent the possibility of unintentionally
			// reopening the dialog if the dialog opening item was directly under the close button.
			btn.bind( "click", function() {
				self.close();
			});

			this._headerCloseButton = btn;
		}
	},

	_setOption: function( key, value ) {
		if ( key === "closeBtn" ) {
			this._setCloseBtn( value );
			this._super( key, value );
			this.element.attr( "data-" + ( $.mobile.ns || "" ) + "close-btn", value );
		}
	},

	// Close method goes back in history
	close: function() {
		var idx, dst, hist = $.mobile.navigate.history;

		if ( this._isCloseable ) {
			this._isCloseable = false;
			// If the hash listening is enabled and there is at least one preceding history
			// entry it's ok to go back. Initial pages with the dialog hash state are an example
			// where the stack check is necessary
			if ( $.mobile.hashListeningEnabled && hist.activeIndex > 0 ) {
				$.mobile.back();
			} else {
				idx = Math.max( 0, hist.activeIndex - 1 );
				dst = hist.stack[ idx ].pageUrl || hist.stack[ idx ].url;
				hist.previousIndex = hist.activeIndex;
				hist.activeIndex = idx;
				if ( !$.mobile.path.isPath( dst ) ) {
					dst = $.mobile.path.makeUrlAbsolute( "#" + dst );
				}

				$.mobile.changePage( dst, { direction: "back", changeHash: false, fromHashChange: true } );
			}
		}
	}
});

//auto self-init widgets
$.mobile.document.delegate( $.mobile.dialog.prototype.options.initSelector, "pagecreate", function() {
	$.mobile.dialog.prototype.enhance( this );
});

})( jQuery, this );

(function( $, undefined ) {

$.mobile.page.prototype.options.backBtnText  = "Back";
$.mobile.page.prototype.options.addBackBtn   = false;
$.mobile.page.prototype.options.backBtnTheme = null;
$.mobile.page.prototype.options.headerTheme  = "a";
$.mobile.page.prototype.options.footerTheme  = "a";
$.mobile.page.prototype.options.contentTheme = null;

// NOTE bind used to force this binding to run before the buttonMarkup binding
//      which expects .ui-footer top be applied in its gigantic selector
// TODO remove the buttonMarkup giant selector and move it to the various modules
//      on which it depends
$.mobile.document.bind( "pagecreate", function( e ) {
	var $page = $( e.target ),
		o = $page.data( "mobile-page" ).options,
		pageRole = $page.jqmData( "role" ),
		pageTheme = o.theme;

	$( ":jqmData(role='header'), :jqmData(role='footer'), :jqmData(role='content')", $page )
		.jqmEnhanceable()
		.each(function() {

		var $this = $( this ),
			role = $this.jqmData( "role" ),
			theme = $this.jqmData( "theme" ),
			contentTheme = theme || o.contentTheme || ( pageRole === "dialog" && pageTheme ),
			$headeranchors,
			leftbtn,
			rightbtn,
			backBtn;

		$this.addClass( "ui-" + role );

		//apply theming and markup modifications to page,header,content,footer
		if ( role === "header" || role === "footer" ) {

			var thisTheme = theme || ( role === "header" ? o.headerTheme : o.footerTheme ) || pageTheme;

			$this
				//add theme class
				.addClass( "ui-bar-" + thisTheme )
				// Add ARIA role
				.attr( "role", role === "header" ? "banner" : "contentinfo" );

			if ( role === "header") {
				// Right,left buttons
				$headeranchors	= $this.children( "a, button" );
				leftbtn	= $headeranchors.hasClass( "ui-btn-left" );
				rightbtn = $headeranchors.hasClass( "ui-btn-right" );

				leftbtn = leftbtn || $headeranchors.eq( 0 ).not( ".ui-btn-right" ).addClass( "ui-btn-left" ).length;

				rightbtn = rightbtn || $headeranchors.eq( 1 ).addClass( "ui-btn-right" ).length;
			}

			// Auto-add back btn on pages beyond first view
			if ( o.addBackBtn &&
				role === "header" &&
				$( ".ui-page" ).length > 1 &&
				$page.jqmData( "url" ) !== $.mobile.path.stripHash( location.hash ) &&
				!leftbtn ) {

				backBtn = $( "<a href='javascript:void(0);' class='ui-btn-left' data-"+ $.mobile.ns +"rel='back' data-"+ $.mobile.ns +"icon='arrow-l'>"+ o.backBtnText +"</a>" )
					// If theme is provided, override default inheritance
					.attr( "data-"+ $.mobile.ns +"theme", o.backBtnTheme || thisTheme )
					.prependTo( $this );
			}

			// Page title
			$this.children( "h1, h2, h3, h4, h5, h6" )
				.addClass( "ui-title" )
				// Regardless of h element number in src, it becomes h1 for the enhanced page
				.attr({
					"role": "heading",
					"aria-level": "1"
				});

		} else if ( role === "content" ) {
			if ( contentTheme ) {
				$this.addClass( "ui-body-" + ( contentTheme ) );
			}

			// Add ARIA role
			$this.attr( "role", "main" );
		}
	});
});

})( jQuery );

(function( $, undefined ) {

$.mobile.behaviors.addFirstLastClasses = {
	_getVisibles: function( $els, create ) {
		var visibles;

		if ( create ) {
			visibles = $els.not( ".ui-screen-hidden" );
		} else {
			visibles = $els.filter( ":visible" );
			if ( visibles.length === 0 ) {
				visibles = $els.not( ".ui-screen-hidden" );
			}
		}

		return visibles;
	},

	_addFirstLastClasses: function( $els, $visibles, create ) {
		$els.removeClass( "ui-first-child ui-last-child" );
		$visibles.eq( 0 ).addClass( "ui-first-child" ).end().last().addClass( "ui-last-child" );
		if ( !create ) {
			this.element.trigger( "updatelayout" );
		}
	}
};

})( jQuery );

(function( $, undefined ) {

// filter function removes whitespace between label and form element so we can use inline-block (nodeType 3 = text)
$.fn.fieldcontain = function( options ) {
	return this
		.addClass( "ui-field-contain ui-body ui-br" )
		.contents().filter( function() {
			return ( this.nodeType === 3 && !/\S/.test( this.nodeValue ) );
		}).remove();
};

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ) {
	$( ":jqmData(role='fieldcontain')", e.target ).jqmEnhanceable().fieldcontain();
});

})( jQuery );

(function( $, undefined ) {

$.fn.grid = function( options ) {
	return this.each(function() {

		var $this = $( this ),
			o = $.extend({
				grid: null
			}, options ),
			$kids = $this.children(),
			gridCols = { solo:1, a:2, b:3, c:4, d:5 },
			grid = o.grid,
			iterator;

			if ( !grid ) {
				if ( $kids.length <= 5 ) {
					for ( var letter in gridCols ) {
						if ( gridCols[ letter ] === $kids.length ) {
							grid = letter;
						}
					}
				} else {
					grid = "a";
					$this.addClass( "ui-grid-duo" );
				}
			}
			iterator = gridCols[grid];

		$this.addClass( "ui-grid-" + grid );

		$kids.filter( ":nth-child(" + iterator + "n+1)" ).addClass( "ui-block-a" );

		if ( iterator > 1 ) {
			$kids.filter( ":nth-child(" + iterator + "n+2)" ).addClass( "ui-block-b" );
		}
		if ( iterator > 2 ) {
			$kids.filter( ":nth-child(" + iterator + "n+3)" ).addClass( "ui-block-c" );
		}
		if ( iterator > 3 ) {
			$kids.filter( ":nth-child(" + iterator + "n+4)" ).addClass( "ui-block-d" );
		}
		if ( iterator > 4 ) {
			$kids.filter( ":nth-child(" + iterator + "n+5)" ).addClass( "ui-block-e" );
		}
	});
};
})( jQuery );

(function( $, undefined ) {

$( document ).bind( "pagecreate create", function( e ) {
	$( ":jqmData(role='nojs')", e.target ).addClass( "ui-nojs" );
	
});

})( jQuery );

(function( $, undefined ) {

$.mobile.behaviors.formReset = {
	_handleFormReset: function() {
		this._on( this.element.closest( "form" ), {
			reset: function() {
				this._delay( "_reset" );
			}
		});
	}
};

})( jQuery );

(function( $, undefined ) {

// This function calls getAttribute, which should be safe for data-* attributes
var getAttrFixed = function( e, key ) {
	var value = e.getAttribute( key );

	return value === "true" ? true :
		value === "false" ? false :
		value === null ? undefined : value;
};

$.fn.buttonMarkup = function( options ) {
	var $workingSet = this,
		nsKey = "data-" + $.mobile.ns,
		key;

	// Enforce options to be of type string
	options = ( options && ( $.type( options ) === "object" ) )? options : {};
	for ( var i = 0; i < $workingSet.length; i++ ) {
		var el = $workingSet.eq( i ),
			e = el[ 0 ],
			o = $.extend( {}, $.fn.buttonMarkup.defaults, {
				icon:       options.icon       !== undefined ? options.icon       : getAttrFixed( e, nsKey + "icon" ),
				iconpos:    options.iconpos    !== undefined ? options.iconpos    : getAttrFixed( e, nsKey + "iconpos" ),
				theme:      options.theme      !== undefined ? options.theme      : getAttrFixed( e, nsKey + "theme" ) || $.mobile.getInheritedTheme( el, "c" ),
				inline:     options.inline     !== undefined ? options.inline     : getAttrFixed( e, nsKey + "inline" ),
				shadow:     options.shadow     !== undefined ? options.shadow     : getAttrFixed( e, nsKey + "shadow" ),
				corners:    options.corners    !== undefined ? options.corners    : getAttrFixed( e, nsKey + "corners" ),
				iconshadow: options.iconshadow !== undefined ? options.iconshadow : getAttrFixed( e, nsKey + "iconshadow" ),
				mini:       options.mini       !== undefined ? options.mini       : getAttrFixed( e, nsKey + "mini" )
			}, options ),

			// Classes Defined
			innerClass = "ui-btn-inner",
			textClass = "ui-btn-text",
			buttonClass, iconClass,
			hover = false,
			state = "up",
			// Button inner markup
			buttonInner,
			buttonText,
			buttonIcon,
			buttonElements;

		for ( key in o ) {
			e.setAttribute( nsKey + key, o[ key ] );
		}

		if ( getAttrFixed( e, nsKey + "rel" ) === "popup" && el.attr( "href" ) ) {
			e.setAttribute( "aria-haspopup", true );
			e.setAttribute( "aria-owns", el.attr( "href" ) );
		}

		// Check if this element is already enhanced
		buttonElements = $.data( ( ( e.tagName === "INPUT" || e.tagName === "BUTTON" ) ? e.parentNode : e ), "buttonElements" );

		if ( buttonElements ) {
			e = buttonElements.outer;
			el = $( e );
			buttonInner = buttonElements.inner;
			buttonText = buttonElements.text;
			// We will recreate this icon below
			$( buttonElements.icon ).remove();
			buttonElements.icon = null;
			hover = buttonElements.hover;
			state = buttonElements.state;
		}
		else {
			buttonInner = document.createElement( o.wrapperEls );
			buttonText = document.createElement( o.wrapperEls );
		}
		buttonIcon = o.icon ? document.createElement( "span" ) : null;

		if ( attachEvents && !buttonElements ) {
			attachEvents();
		}

		// if not, try to find closest theme container
		if ( !o.theme ) {
			o.theme = $.mobile.getInheritedTheme( el, "c" );
		}

		buttonClass = "ui-btn ";
		buttonClass += ( hover ? "ui-btn-hover-" + o.theme : "" );
		buttonClass += ( state ? " ui-btn-" + state + "-" + o.theme : "" );
		buttonClass += o.shadow ? " ui-shadow" : "";
		buttonClass += o.corners ? " ui-btn-corner-all" : "";

		if ( o.mini !== undefined ) {
			// Used to control styling in headers/footers, where buttons default to `mini` style.
			buttonClass += o.mini === true ? " ui-mini" : " ui-fullsize";
		}

		if ( o.inline !== undefined ) {
			// Used to control styling in headers/footers, where buttons default to `inline` style.
			buttonClass += o.inline === true ? " ui-btn-inline" : " ui-btn-block";
		}

		if ( o.icon ) {
			o.icon = "ui-icon-" + o.icon;
			o.iconpos = o.iconpos || "left";

			iconClass = "ui-icon " + o.icon;

			if ( o.iconshadow ) {
				iconClass += " ui-icon-shadow";
			}
		}

		if ( o.iconpos ) {
			buttonClass += " ui-btn-icon-" + o.iconpos;

			if ( o.iconpos === "notext" && !el.attr( "title" ) ) {
				el.attr( "title", el.getEncodedText() );
			}
		}

		if ( o.iconpos && o.iconpos === "notext" && !el.attr( "title" ) ) {
			el.attr( "title", el.getEncodedText() );
		}

		if ( buttonElements ) {
			el.removeClass( buttonElements.bcls || "" );
		}
		el.removeClass( "ui-link" ).addClass( buttonClass );

		buttonInner.className = innerClass;
		buttonText.className = textClass;
		if ( !buttonElements ) {
			buttonInner.appendChild( buttonText );
		}
		if ( buttonIcon ) {
			buttonIcon.className = iconClass;
			if ( !( buttonElements && buttonElements.icon ) ) {
				buttonIcon.innerHTML = "&#160;";
				buttonInner.appendChild( buttonIcon );
			}
		}

		while ( e.firstChild && !buttonElements ) {
			buttonText.appendChild( e.firstChild );
		}

		if ( !buttonElements ) {
			e.appendChild( buttonInner );
		}

		// Assign a structure containing the elements of this button to the elements of this button. This
		// will allow us to recognize this as an already-enhanced button in future calls to buttonMarkup().
		buttonElements = {
			hover : hover,
			state : state,
			bcls  : buttonClass,
			outer : e,
			inner : buttonInner,
			text  : buttonText,
			icon  : buttonIcon
		};

		$.data( e,           'buttonElements', buttonElements );
		$.data( buttonInner, 'buttonElements', buttonElements );
		$.data( buttonText,  'buttonElements', buttonElements );
		if ( buttonIcon ) {
			$.data( buttonIcon, 'buttonElements', buttonElements );
		}
	}

	return this;
};

$.fn.buttonMarkup.defaults = {
	corners: true,
	shadow: true,
	iconshadow: true,
	wrapperEls: "span"
};

function closestEnabledButton( element ) {
    var cname;

    while ( element ) {
		// Note that we check for typeof className below because the element we
		// handed could be in an SVG DOM where className on SVG elements is defined to
		// be of a different type (SVGAnimatedString). We only operate on HTML DOM
		// elements, so we look for plain "string".
        cname = ( typeof element.className === 'string' ) && ( element.className + ' ' );
        if ( cname && cname.indexOf( "ui-btn " ) > -1 && cname.indexOf( "ui-disabled " ) < 0 ) {
            break;
        }

        element = element.parentNode;
    }

    return element;
}

function updateButtonClass( $btn, classToRemove, classToAdd, hover, state ) {
	var buttonElements = $.data( $btn[ 0 ], "buttonElements" );
	$btn.removeClass( classToRemove ).addClass( classToAdd );
	if ( buttonElements ) {
		buttonElements.bcls = $( document.createElement( "div" ) )
			.addClass( buttonElements.bcls + " " + classToAdd )
			.removeClass( classToRemove )
			.attr( "class" );
		if ( hover !== undefined ) {
			buttonElements.hover = hover;
		}
		buttonElements.state = state;
	}
}

var attachEvents = function() {
	var hoverDelay = $.mobile.buttonMarkup.hoverDelay, hov, foc;

	$.mobile.document.bind( {
		"vmousedown vmousecancel vmouseup vmouseover vmouseout focus blur scrollstart": function( event ) {
			var theme,
				$btn = $( closestEnabledButton( event.target ) ),
				isTouchEvent = event.originalEvent && /^touch/.test( event.originalEvent.type ),
				evt = event.type;

			if ( $btn.length ) {
				theme = $btn.attr( "data-" + $.mobile.ns + "theme" );

				if ( evt === "vmousedown" ) {
					if ( isTouchEvent ) {
						// Use a short delay to determine if the user is scrolling before highlighting
						hov = setTimeout( function() {
							updateButtonClass( $btn, "ui-btn-up-" + theme, "ui-btn-down-" + theme, undefined, "down" );
						}, hoverDelay );
					} else {
						updateButtonClass( $btn, "ui-btn-up-" + theme, "ui-btn-down-" + theme, undefined, "down" );
					}
				} else if ( evt === "vmousecancel" || evt === "vmouseup" ) {
					updateButtonClass( $btn, "ui-btn-down-" + theme, "ui-btn-up-" + theme, undefined, "up" );
				} else if ( evt === "vmouseover" || evt === "focus" ) {
					if ( isTouchEvent ) {
						// Use a short delay to determine if the user is scrolling before highlighting
						foc = setTimeout( function() {
							updateButtonClass( $btn, "ui-btn-up-" + theme, "ui-btn-hover-" + theme, true, "" );
						}, hoverDelay );
					} else {
						updateButtonClass( $btn, "ui-btn-up-" + theme, "ui-btn-hover-" + theme, true, "" );
					}
				} else if ( evt === "vmouseout" || evt === "blur" || evt === "scrollstart" ) {
					updateButtonClass( $btn, "ui-btn-hover-" + theme  + " ui-btn-down-" + theme, "ui-btn-up-" + theme, false, "up" );
					if ( hov ) {
						clearTimeout( hov );
					}
					if ( foc ) {
						clearTimeout( foc );
					}
				}
			}
		},
		"focusin focus": function( event ) {
			$( closestEnabledButton( event.target ) ).addClass( $.mobile.focusClass );
		},
		"focusout blur": function( event ) {
			$( closestEnabledButton( event.target ) ).removeClass( $.mobile.focusClass );
		}
	});

	attachEvents = null;
};

//links in bars, or those with  data-role become buttons
//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {

	$( ":jqmData(role='button'), .ui-bar > a, .ui-header > a, .ui-footer > a, .ui-bar > :jqmData(role='controlgroup') > a", e.target )
		.jqmEnhanceable()
		.not( "button, input, .ui-btn, :jqmData(role='none'), :jqmData(role='nojs')" )
		.buttonMarkup();
});

})( jQuery );


(function( $, undefined ) {

$.widget( "mobile.collapsible", $.mobile.widget, {
	options: {
		expandCueText: " click to expand contents",
		collapseCueText: " click to collapse contents",
		collapsed: true,
		heading: "h1,h2,h3,h4,h5,h6,legend",
		collapsedIcon: "plus",
		expandedIcon: "minus",
		iconpos: "left",
		theme: null,
		contentTheme: null,
		inset: true,
		corners: true,
		mini: false,
		initSelector: ":jqmData(role='collapsible')"
	},
	_create: function() {

		var $el = this.element,
			o = this.options,
			collapsible = $el.addClass( "ui-collapsible" ),
			collapsibleHeading = $el.children( o.heading ).first(),
			collapsibleContent = collapsible.wrapInner( "<div class='ui-collapsible-content'></div>" ).children( ".ui-collapsible-content" ),
			collapsibleSet = $el.closest( ":jqmData(role='collapsible-set')" ).addClass( "ui-collapsible-set" ),
			collapsibleClasses = "";

		// Replace collapsibleHeading if it's a legend
		if ( collapsibleHeading.is( "legend" ) ) {
			collapsibleHeading = $( "<div role='heading'>"+ collapsibleHeading.html() +"</div>" ).insertBefore( collapsibleHeading );
			collapsibleHeading.next().remove();
		}

		// If we are in a collapsible set
		if ( collapsibleSet.length ) {
			// Inherit the theme from collapsible-set
			if ( !o.theme ) {
				o.theme = collapsibleSet.jqmData( "theme" ) || $.mobile.getInheritedTheme( collapsibleSet, "c" );
			}
			// Inherit the content-theme from collapsible-set
			if ( !o.contentTheme ) {
				o.contentTheme = collapsibleSet.jqmData( "content-theme" );
			}

			// Get the preference for collapsed icon in the set, but override with data- attribute on the individual collapsible
			o.collapsedIcon = $el.jqmData( "collapsed-icon" ) || collapsibleSet.jqmData( "collapsed-icon" ) || o.collapsedIcon;

			// Get the preference for expanded icon in the set, but override with data- attribute on the individual collapsible
			o.expandedIcon = $el.jqmData( "expanded-icon" ) || collapsibleSet.jqmData( "expanded-icon" ) || o.expandedIcon;

			// Gets the preference icon position in the set, but override with data- attribute on the individual collapsible
			o.iconpos = $el.jqmData( "iconpos" ) || collapsibleSet.jqmData( "iconpos" ) || o.iconpos;

			// Inherit the preference for inset from collapsible-set or set the default value to ensure equalty within a set
			if ( collapsibleSet.jqmData( "inset" ) !== undefined ) {
				o.inset = collapsibleSet.jqmData( "inset" );
			} else {
				o.inset = true;
			}
			// Set corners for individual collapsibles to false when in a collapsible-set
			o.corners = false;
			// Gets the preference for mini in the set
			if ( !o.mini ) {
				o.mini = collapsibleSet.jqmData( "mini" );
			}
		} else {
			// get inherited theme if not a set and no theme has been set
			if ( !o.theme ) {
				o.theme = $.mobile.getInheritedTheme( $el, "c" );
			}
		}

		if ( !!o.inset ) {
			collapsibleClasses += " ui-collapsible-inset";
			if ( !!o.corners ) {
				collapsibleClasses += " ui-corner-all" ;
			}
		}
		if ( o.contentTheme ) {
			collapsibleClasses += " ui-collapsible-themed-content";
			collapsibleContent.addClass( "ui-body-" + o.contentTheme );
		}
		if ( collapsibleClasses !== "" ) {
			collapsible.addClass( collapsibleClasses );
		}
		
		collapsibleHeading
			//drop heading in before content
			.insertBefore( collapsibleContent )
			//modify markup & attributes
			.addClass( "ui-collapsible-heading" )
			.append( "<span class='ui-collapsible-heading-status'></span>" )
			.wrapInner( "<a href='#' class='ui-collapsible-heading-toggle'></a>" )
			.find( "a" )
				.first()
				.buttonMarkup({
					shadow: false,
					corners: false,
					iconpos: o.iconpos,
					icon: o.collapsedIcon,
					mini: o.mini,
					theme: o.theme
				});

		//events
		collapsible
			.bind( "expand collapse", function( event ) {
				if ( !event.isDefaultPrevented() ) {
					var $this = $( this ),
						isCollapse = ( event.type === "collapse" );

					event.preventDefault();

					collapsibleHeading
						.toggleClass( "ui-collapsible-heading-collapsed", isCollapse )
						.find( ".ui-collapsible-heading-status" )
							.text( isCollapse ? o.expandCueText : o.collapseCueText )
						.end()
						.find( ".ui-icon" )
							.toggleClass( "ui-icon-" + o.expandedIcon, !isCollapse )
							// logic or cause same icon for expanded/collapsed state would remove the ui-icon-class
							.toggleClass( "ui-icon-" + o.collapsedIcon, ( isCollapse || o.expandedIcon === o.collapsedIcon ) )
						.end()
						.find( "a" ).first().removeClass( $.mobile.activeBtnClass );

					$this.toggleClass( "ui-collapsible-collapsed", isCollapse );
					collapsibleContent.toggleClass( "ui-collapsible-content-collapsed", isCollapse ).attr( "aria-hidden", isCollapse );

					collapsibleContent.trigger( "updatelayout" );
				}
			})
			.trigger( o.collapsed ? "collapse" : "expand" );

		collapsibleHeading
			.bind( "tap", function( event ) {
				collapsibleHeading.find( "a" ).first().addClass( $.mobile.activeBtnClass );
			})
			.bind( "click", function( event ) {

				var type = collapsibleHeading.is( ".ui-collapsible-heading-collapsed" ) ? "expand" : "collapse";

				collapsible.trigger( type );

				event.preventDefault();
				event.stopPropagation();
			});
	}
});

//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {
	$.mobile.collapsible.prototype.enhanceWithin( e.target );
});

})( jQuery );

(function( $, undefined ) {

$.widget( "mobile.collapsibleset", $.mobile.widget, {
	options: {
		initSelector: ":jqmData(role='collapsible-set')"
	},
	_create: function() {
		var $el = this.element.addClass( "ui-collapsible-set" ),
			o = this.options;

		// Inherit the theme from collapsible-set
		if ( !o.theme ) {
			o.theme = $.mobile.getInheritedTheme( $el, "c" );
		}
		// Inherit the content-theme from collapsible-set
		if ( !o.contentTheme ) {
			o.contentTheme = $el.jqmData( "content-theme" );
		}
		// Inherit the corner styling from collapsible-set
		if ( !o.corners ) {
			o.corners = $el.jqmData( "corners" );
		}
		
		if ( $el.jqmData( "inset" ) !== undefined ) {
			o.inset = $el.jqmData( "inset" );
		}
		o.inset = o.inset !== undefined ? o.inset : true;
		o.corners = o.corners !== undefined ? o.corners : true;
		
		if ( !!o.corners && !!o.inset ) {
			$el.addClass( "ui-corner-all" );
		}

		// Initialize the collapsible set if it's not already initialized
		if ( !$el.jqmData( "collapsiblebound" ) ) {
			$el
				.jqmData( "collapsiblebound", true )
				.bind( "expand", function( event ) {
					var closestCollapsible = $( event.target )
						.closest( ".ui-collapsible" );
					if ( closestCollapsible.parent().is( ":jqmData(role='collapsible-set')" ) ) {
						closestCollapsible
							.siblings( ".ui-collapsible" )
							.trigger( "collapse" );
					}
				});
		}
	},

	_init: function() {
		var $el = this.element,
			collapsiblesInSet = $el.children( ":jqmData(role='collapsible')" ),
			expanded = collapsiblesInSet.filter( ":jqmData(collapsed='false')" );
		this._refresh( "true" );

		// Because the corners are handled by the collapsible itself and the default state is collapsed
		// That was causing https://github.com/jquery/jquery-mobile/issues/4116
		expanded.trigger( "expand" );
	},

	_refresh: function( create ) {
		var collapsiblesInSet = this.element.children( ":jqmData(role='collapsible')" );

		$.mobile.collapsible.prototype.enhance( collapsiblesInSet.not( ".ui-collapsible" ) );

		this._addFirstLastClasses( collapsiblesInSet, this._getVisibles( collapsiblesInSet, create ), create );
	},

	refresh: function() {
		this._refresh( false );
	}
});

$.widget( "mobile.collapsibleset", $.mobile.collapsibleset, $.mobile.behaviors.addFirstLastClasses );

//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {
	$.mobile.collapsibleset.prototype.enhanceWithin( e.target );
});

})( jQuery );

(function( $, undefined ) {

$.widget( "mobile.navbar", $.mobile.widget, {
	options: {
		iconpos: "top",
		grid: null,
		initSelector: ":jqmData(role='navbar')"
	},

	_create: function() {

		var $navbar = this.element,
			$navbtns = $navbar.find( "a" ),
			iconpos = $navbtns.filter( ":jqmData(icon)" ).length ?
									this.options.iconpos : undefined;

		$navbar.addClass( "ui-navbar ui-mini" )
			.attr( "role", "navigation" )
			.find( "ul" )
			.jqmEnhanceable()
			.grid({ grid: this.options.grid });

		$navbtns.buttonMarkup({
			corners:	false,
			shadow:		false,
			inline:     true,
			iconpos:	iconpos
		});

		$navbar.delegate( "a", "vclick", function( event ) {
			if ( !$(event.target).hasClass( "ui-disabled" ) ) {
				$navbtns.removeClass( $.mobile.activeBtnClass );
				$( this ).addClass( $.mobile.activeBtnClass );
				// The code below is a workaround to fix #1181. We have to see why removeActiveLinkClass() doesn't take care of it.
				var activeNavbtn = $( this );
				$( document ).one( "pagechange", function( event ) {
					activeNavbtn.removeClass( $.mobile.activeBtnClass );
				});
			}
		});

		// Buttons in the navbar with ui-state-persist class should regain their active state before page show
		$navbar.closest( ".ui-page" ).bind( "pagebeforeshow", function() {
			$navbtns.filter( ".ui-state-persist" ).addClass( $.mobile.activeBtnClass );
		});
	}
});

//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {
	$.mobile.navbar.prototype.enhanceWithin( e.target );
});

})( jQuery );

(function( $, undefined ) {

//Keeps track of the number of lists per page UID
//This allows support for multiple nested list in the same page
//https://github.com/jquery/jquery-mobile/issues/1617
var listCountPerPage = {};

$.widget( "mobile.listview", $.mobile.widget, {

	options: {
		theme: null,
		countTheme: "c",
		headerTheme: "b",
		dividerTheme: "b",
		icon: "arrow-r",
		splitIcon: "arrow-r",
		splitTheme: "b",
		corners: true,
		shadow: true,
		inset: false,
		initSelector: ":jqmData(role='listview')"
	},

	_create: function() {
		var t = this,
			listviewClasses = "";

		listviewClasses += t.options.inset ? " ui-listview-inset" : "";

		if ( !!t.options.inset ) {
			listviewClasses += t.options.corners ? " ui-corner-all" : "";
			listviewClasses += t.options.shadow ? " ui-shadow" : "";
		}

		// create listview markup
		t.element.addClass(function( i, orig ) {
			return orig + " ui-listview" + listviewClasses;
		});

		t.refresh( true );
	},

	// This is a generic utility method for finding the first
	// node with a given nodeName. It uses basic DOM traversal
	// to be fast and is meant to be a substitute for simple
	// $.fn.closest() and $.fn.children() calls on a single
	// element. Note that callers must pass both the lowerCase
	// and upperCase version of the nodeName they are looking for.
	// The main reason for this is that this function will be
	// called many times and we want to avoid having to lowercase
	// the nodeName from the element every time to ensure we have
	// a match. Note that this function lives here for now, but may
	// be moved into $.mobile if other components need a similar method.
	_findFirstElementByTagName: function( ele, nextProp, lcName, ucName ) {
		var dict = {};
		dict[ lcName ] = dict[ ucName ] = true;
		while ( ele ) {
			if ( dict[ ele.nodeName ] ) {
				return ele;
			}
			ele = ele[ nextProp ];
		}
		return null;
	},
	_getChildrenByTagName: function( ele, lcName, ucName ) {
		var results = [],
			dict = {};
		dict[ lcName ] = dict[ ucName ] = true;
		ele = ele.firstChild;
		while ( ele ) {
			if ( dict[ ele.nodeName ] ) {
				results.push( ele );
			}
			ele = ele.nextSibling;
		}
		return $( results );
	},

	_addThumbClasses: function( containers ) {
		var i, img, len = containers.length;
		for ( i = 0; i < len; i++ ) {
			img = $( this._findFirstElementByTagName( containers[ i ].firstChild, "nextSibling", "img", "IMG" ) );
			if ( img.length ) {
				img.addClass( "ui-li-thumb" );
				$( this._findFirstElementByTagName( img[ 0 ].parentNode, "parentNode", "li", "LI" ) ).addClass( img.is( ".ui-li-icon" ) ? "ui-li-has-icon" : "ui-li-has-thumb" );
			}
		}
	},

	refresh: function( create ) {
		this.parentPage = this.element.closest( ".ui-page" );
		this._createSubPages();

		var o = this.options,
			$list = this.element,
			self = this,
			dividertheme = $list.jqmData( "dividertheme" ) || o.dividerTheme,
			listsplittheme = $list.jqmData( "splittheme" ),
			listspliticon = $list.jqmData( "spliticon" ),
			listicon = $list.jqmData( "icon" ),
			li = this._getChildrenByTagName( $list[ 0 ], "li", "LI" ),
			ol = !!$.nodeName( $list[ 0 ], "ol" ),
			jsCount = !$.support.cssPseudoElement,
			start = $list.attr( "start" ),
			itemClassDict = {},
			item, itemClass, itemTheme,
			a, last, splittheme, counter, startCount, newStartCount, countParent, icon, imgParents, img, linkIcon;

		if ( ol && jsCount ) {
			$list.find( ".ui-li-dec" ).remove();
		}

		if ( ol ) {
			// Check if a start attribute has been set while taking a value of 0 into account
			if ( start || start === 0 ) {
				if ( !jsCount ) {
					startCount = parseInt( start , 10 ) - 1;
					$list.css( "counter-reset", "listnumbering " + startCount );
				} else {
					counter = parseInt( start , 10 );
				}
			} else if ( jsCount ) {
					counter = 1;
			}
		}

		if ( !o.theme ) {
			o.theme = $.mobile.getInheritedTheme( this.element, "c" );
		}

		for ( var pos = 0, numli = li.length; pos < numli; pos++ ) {
			item = li.eq( pos );
			itemClass = "ui-li";

			// If we're creating the element, we update it regardless
			if ( create || !item.hasClass( "ui-li" ) ) {
				itemTheme = item.jqmData( "theme" ) || o.theme;
				a = this._getChildrenByTagName( item[ 0 ], "a", "A" );
				var isDivider = ( item.jqmData( "role" ) === "list-divider" );

				if ( a.length && !isDivider ) {
					icon = item.jqmData( "icon" );

					item.buttonMarkup({
						wrapperEls: "div",
						shadow: false,
						corners: false,
						iconpos: "right",
						icon: a.length > 1 || icon === false ? false : icon || listicon || o.icon,
						theme: itemTheme
					});

					if ( ( icon !== false ) && ( a.length === 1 ) ) {
						item.addClass( "ui-li-has-arrow" );
					}

					a.first().removeClass( "ui-link" ).addClass( "ui-link-inherit" );

					if ( a.length > 1 ) {
						itemClass += " ui-li-has-alt";

						last = a.last();
						splittheme = listsplittheme || last.jqmData( "theme" ) || o.splitTheme;
						linkIcon = last.jqmData( "icon" );

						last.appendTo( item )
							.attr( "title", $.trim(last.getEncodedText()) )
							.addClass( "ui-li-link-alt" )
							.empty()
							.buttonMarkup({
								shadow: false,
								corners: false,
								theme: itemTheme,
								icon: false,
								iconpos: "notext"
							})
							.find( ".ui-btn-inner" )
								.append(
									$( document.createElement( "span" ) ).buttonMarkup({
										shadow: true,
										corners: true,
										theme: splittheme,
										iconpos: "notext",
										// link icon overrides list item icon overrides ul element overrides options
										icon: linkIcon || icon || listspliticon || o.splitIcon
									})
								);
					}
				} else if ( isDivider ) {

					itemClass += " ui-li-divider ui-bar-" + ( item.jqmData( "theme" ) || dividertheme );
					item.attr( "role", "heading" );

					if ( ol ) {
						//reset counter when a divider heading is encountered
						if ( start || start === 0 ) {
							if ( !jsCount ) {
								newStartCount = parseInt( start , 10 ) - 1;
								item.css( "counter-reset", "listnumbering " + newStartCount );
							} else {
								counter = parseInt( start , 10 );
							}
						} else if ( jsCount ) {
								counter = 1;
						}
					}

				} else {
					itemClass += " ui-li-static ui-btn-up-" + itemTheme;
				}
			}

			if ( ol && jsCount && itemClass.indexOf( "ui-li-divider" ) < 0 ) {
				countParent = itemClass.indexOf( "ui-li-static" ) > 0 ? item : item.find( ".ui-link-inherit" );

				countParent.addClass( "ui-li-jsnumbering" )
					.prepend( "<span class='ui-li-dec'>" + ( counter++ ) + ". </span>" );
			}

			// Instead of setting item class directly on the list item and its
			// btn-inner at this point in time, push the item into a dictionary
			// that tells us what class to set on it so we can do this after this
			// processing loop is finished.

			if ( !itemClassDict[ itemClass ] ) {
				itemClassDict[ itemClass ] = [];
			}

			itemClassDict[ itemClass ].push( item[ 0 ] );
		}

		// Set the appropriate listview item classes on each list item
		// and their btn-inner elements. The main reason we didn't do this
		// in the for-loop above is because we can eliminate per-item function overhead
		// by calling addClass() and children() once or twice afterwards. This
		// can give us a significant boost on platforms like WP7.5.

		for ( itemClass in itemClassDict ) {
			$( itemClassDict[ itemClass ] ).addClass( itemClass ).children( ".ui-btn-inner" ).addClass( itemClass );
		}

		$list.find( "h1, h2, h3, h4, h5, h6" ).addClass( "ui-li-heading" )
			.end()

			.find( "p, dl" ).addClass( "ui-li-desc" )
			.end()

			.find( ".ui-li-aside" ).each(function() {
					var $this = $( this );
					$this.prependTo( $this.parent() ); //shift aside to front for css float
				})
			.end()

			.find( ".ui-li-count" ).each(function() {
					$( this ).closest( "li" ).addClass( "ui-li-has-count" );
				}).addClass( "ui-btn-up-" + ( $list.jqmData( "counttheme" ) || this.options.countTheme) + " ui-btn-corner-all" );

		// The idea here is to look at the first image in the list item
		// itself, and any .ui-link-inherit element it may contain, so we
		// can place the appropriate classes on the image and list item.
		// Note that we used to use something like:
		//
		//    li.find(">img:eq(0), .ui-link-inherit>img:eq(0)").each( ... );
		//
		// But executing a find() like that on Windows Phone 7.5 took a
		// really long time. Walking things manually with the code below
		// allows the 400 listview item page to load in about 3 seconds as
		// opposed to 30 seconds.

		this._addThumbClasses( li );
		this._addThumbClasses( $list.find( ".ui-link-inherit" ) );

		this._addFirstLastClasses( li, this._getVisibles( li, create ), create );
		// autodividers binds to this to redraw dividers after the listview refresh
		this._trigger( "afterrefresh" );
	},

	//create a string for ID/subpage url creation
	_idStringEscape: function( str ) {
		return str.replace(/[^a-zA-Z0-9]/g, '-');
	},

	_createSubPages: function() {
		var parentList = this.element,
			parentPage = parentList.closest( ".ui-page" ),
			parentUrl = parentPage.jqmData( "url" ),
			parentId = parentUrl || parentPage[ 0 ][ $.expando ],
			parentListId = parentList.attr( "id" ),
			o = this.options,
			dns = "data-" + $.mobile.ns,
			self = this,
			persistentFooterID = parentPage.find( ":jqmData(role='footer')" ).jqmData( "id" ),
			hasSubPages;

		if ( typeof listCountPerPage[ parentId ] === "undefined" ) {
			listCountPerPage[ parentId ] = -1;
		}

		parentListId = parentListId || ++listCountPerPage[ parentId ];

		$( parentList.find( "li>ul, li>ol" ).toArray().reverse() ).each(function( i ) {
			var self = this,
				list = $( this ),
				listId = list.attr( "id" ) || parentListId + "-" + i,
				parent = list.parent(),
				nodeElsFull = $( list.prevAll().toArray().reverse() ),
				nodeEls = nodeElsFull.length ? nodeElsFull : $( "<span>" + $.trim(parent.contents()[ 0 ].nodeValue) + "</span>" ),
				title = nodeEls.first().getEncodedText(),//url limits to first 30 chars of text
				id = ( parentUrl || "" ) + "&" + $.mobile.subPageUrlKey + "=" + listId,
				theme = list.jqmData( "theme" ) || o.theme,
				countTheme = list.jqmData( "counttheme" ) || parentList.jqmData( "counttheme" ) || o.countTheme,
				newPage, anchor;

			//define hasSubPages for use in later removal
			hasSubPages = true;

			newPage = list.detach()
						.wrap( "<div " + dns + "role='page' " + dns + "url='" + id + "' " + dns + "theme='" + theme + "' " + dns + "count-theme='" + countTheme + "'><div " + dns + "role='content'></div></div>" )
						.parent()
							.before( "<div " + dns + "role='header' " + dns + "theme='" + o.headerTheme + "'><div class='ui-title'>" + title + "</div></div>" )
							.after( persistentFooterID ? $( "<div " + dns + "role='footer' " + dns + "id='"+ persistentFooterID +"'>" ) : "" )
							.parent()
								.appendTo( $.mobile.pageContainer );

			newPage.page();

			anchor = parent.find( 'a:first' );

			if ( !anchor.length ) {
				anchor = $( "<a/>" ).html( nodeEls || title ).prependTo( parent.empty() );
			}

			anchor.attr( "href", "#" + id );

		}).listview();

		// on pagehide, remove any nested pages along with the parent page, as long as they aren't active
		// and aren't embedded
		if ( hasSubPages &&
			parentPage.is( ":jqmData(external-page='true')" ) &&
			parentPage.data( "mobile-page" ).options.domCache === false ) {

			var newRemove = function( e, ui ) {
				var nextPage = ui.nextPage, npURL,
					prEvent = new $.Event( "pageremove" );

				if ( ui.nextPage ) {
					npURL = nextPage.jqmData( "url" );
					if ( npURL.indexOf( parentUrl + "&" + $.mobile.subPageUrlKey ) !== 0 ) {
						self.childPages().remove();
						parentPage.trigger( prEvent );
						if ( !prEvent.isDefaultPrevented() ) {
							parentPage.removeWithDependents();
						}
					}
				}
			};

			// unbind the original page remove and replace with our specialized version
			parentPage
				.unbind( "pagehide.remove" )
				.bind( "pagehide.remove", newRemove);
		}
	},

	// TODO sort out a better way to track sub pages of the listview this is brittle
	childPages: function() {
		var parentUrl = this.parentPage.jqmData( "url" );

		return $( ":jqmData(url^='"+  parentUrl + "&" + $.mobile.subPageUrlKey + "')" );
	}
});

$.widget( "mobile.listview", $.mobile.listview, $.mobile.behaviors.addFirstLastClasses );

//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {
	$.mobile.listview.prototype.enhanceWithin( e.target );
});

})( jQuery );

(function( $, undefined ) {

$.mobile.listview.prototype.options.autodividers = false;
$.mobile.listview.prototype.options.autodividersSelector = function( elt ) {
	// look for the text in the given element
	var text = $.trim( elt.text() ) || null;

	if ( !text ) {
		return null;
	}

	// create the text for the divider (first uppercased letter)
	text = text.slice( 0, 1 ).toUpperCase();

	return text;
};

$.mobile.document.delegate( "ul,ol", "listviewcreate", function() {

	var list = $( this ),
			listview = list.data( "mobile-listview" );

	if ( !listview || !listview.options.autodividers ) {
		return;
	}

	var replaceDividers = function () {
		list.find( "li:jqmData(role='list-divider')" ).remove();

		var lis = list.find( 'li' ),
			lastDividerText = null, li, dividerText;

		for ( var i = 0; i < lis.length ; i++ ) {
			li = lis[i];
			dividerText = listview.options.autodividersSelector( $( li ) );

			if ( dividerText && lastDividerText !== dividerText ) {
				var divider = document.createElement( 'li' );
				divider.appendChild( document.createTextNode( dividerText ) );
				divider.setAttribute( 'data-' + $.mobile.ns + 'role', 'list-divider' );
				li.parentNode.insertBefore( divider, li );
			}

			lastDividerText = dividerText;
		}
	};

	var afterListviewRefresh = function () {
		list.unbind( 'listviewafterrefresh', afterListviewRefresh );
		replaceDividers();
		listview.refresh();
		list.bind( 'listviewafterrefresh', afterListviewRefresh );
	};

	afterListviewRefresh();
});

})( jQuery );

/*
* "checkboxradio" plugin
*/

(function( $, undefined ) {

$.widget( "mobile.checkboxradio", $.mobile.widget, {
	options: {
		theme: null,
		mini: false,
		initSelector: "input[type='checkbox'],input[type='radio']"
	},
	_create: function() {
		var self = this,
			input = this.element,
			o = this.options,
			inheritAttr = function( input, dataAttr ) {
				return input.jqmData( dataAttr ) || input.closest( "form, fieldset" ).jqmData( dataAttr );
			},
			// NOTE: Windows Phone could not find the label through a selector
			// filter works though.
			parentLabel = $( input ).closest( "label" ),
			label = parentLabel.length ? parentLabel : $( input ).closest( "form, fieldset, :jqmData(role='page'), :jqmData(role='dialog')" ).find( "label" ).filter( "[for='" + input[0].id + "']" ).first(),
			inputtype = input[0].type,
			mini = inheritAttr( input, "mini" ) || o.mini,
			checkedState = inputtype + "-on",
			uncheckedState = inputtype + "-off",
			iconpos = inheritAttr( input, "iconpos" ),
			checkedClass = "ui-" + checkedState,
			uncheckedClass = "ui-" + uncheckedState;

		if ( inputtype !== "checkbox" && inputtype !== "radio" ) {
			return;
		}

		// Expose for other methods
		$.extend( this, {
			label: label,
			inputtype: inputtype,
			checkedClass: checkedClass,
			uncheckedClass: uncheckedClass,
			checkedicon: checkedState,
			uncheckedicon: uncheckedState
		});

		// If there's no selected theme check the data attr
		if ( !o.theme ) {
			o.theme = $.mobile.getInheritedTheme( this.element, "c" );
		}

		label.buttonMarkup({
			theme: o.theme,
			icon: uncheckedState,
			shadow: false,
			mini: mini,
			iconpos: iconpos
		});

		// Wrap the input + label in a div
		var wrapper = document.createElement('div');
		wrapper.className = 'ui-' + inputtype;

		input.add( label ).wrapAll( wrapper );

		label.bind({
			vmouseover: function( event ) {
				if ( $( this ).parent().is( ".ui-disabled" ) ) {
					event.stopPropagation();
				}
			},

			vclick: function( event ) {
				if ( input.is( ":disabled" ) ) {
					event.preventDefault();
					return;
				}

				self._cacheVals();

				input.prop( "checked", inputtype === "radio" && true || !input.prop( "checked" ) );

				// trigger click handler's bound directly to the input as a substitute for
				// how label clicks behave normally in the browsers
				// TODO: it would be nice to let the browser's handle the clicks and pass them
				//       through to the associate input. we can swallow that click at the parent
				//       wrapper element level
				input.triggerHandler( 'click' );

				// Input set for common radio buttons will contain all the radio
				// buttons, but will not for checkboxes. clearing the checked status
				// of other radios ensures the active button state is applied properly
				self._getInputSet().not( input ).prop( "checked", false );

				self._updateAll();
				return false;
			}
		});

		input
			.bind({
				vmousedown: function() {
					self._cacheVals();
				},

				vclick: function() {
					var $this = $( this );

					// Adds checked attribute to checked input when keyboard is used
					if ( $this.is( ":checked" ) ) {

						$this.prop( "checked", true);
						self._getInputSet().not( $this ).prop( "checked", false );
					} else {

						$this.prop( "checked", false );
					}

					self._updateAll();
				},

				focus: function() {
					label.addClass( $.mobile.focusClass );
				},

				blur: function() {
					label.removeClass( $.mobile.focusClass );
				}
			});

		if ( this._handleFormReset ) {
			this._handleFormReset();
		}
		this.refresh();
	},

	_cacheVals: function() {
		this._getInputSet().each(function() {
			$( this ).jqmData( "cacheVal", this.checked );
		});
	},

	//returns either a set of radios with the same name attribute, or a single checkbox
	_getInputSet: function() {
		if ( this.inputtype === "checkbox" ) {
			return this.element;
		}

		return this.element.closest( "form, :jqmData(role='page'), :jqmData(role='dialog')" )
			.find( "input[name='" + this.element[0].name + "'][type='" + this.inputtype + "']" );
	},

	_updateAll: function() {
		var self = this;

		this._getInputSet().each(function() {
			var $this = $( this );

			if ( this.checked || self.inputtype === "checkbox" ) {
				$this.trigger( "change" );
			}
		})
		.checkboxradio( "refresh" );
	},

	_reset: function() {
		this.refresh();
	},

	refresh: function() {
		var input = this.element[ 0 ],
			active = " " + $.mobile.activeBtnClass,
			checkedClass = this.checkedClass + ( this.element.parents( ".ui-controlgroup-horizontal" ).length ? active : "" ),
			label = this.label;

		if ( input.checked ) {
			label.removeClass( this.uncheckedClass + active ).addClass( checkedClass ).buttonMarkup( { icon: this.checkedicon } );
		} else {
			label.removeClass( checkedClass ).addClass( this.uncheckedClass ).buttonMarkup( { icon: this.uncheckedicon } );
		}

		if ( input.disabled ) {
			this.disable();
		} else {
			this.enable();
		}
	},

	disable: function() {
		this.element.prop( "disabled", true ).parent().addClass( "ui-disabled" );
	},

	enable: function() {
		this.element.prop( "disabled", false ).parent().removeClass( "ui-disabled" );
	}
});

$.widget( "mobile.checkboxradio", $.mobile.checkboxradio, $.mobile.behaviors.formReset );

//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {
	$.mobile.checkboxradio.prototype.enhanceWithin( e.target, true );
});

})( jQuery );

(function( $, undefined ) {

$.widget( "mobile.button", $.mobile.widget, {
	options: {
		theme: null,
		icon: null,
		iconpos: null,
		corners: true,
		shadow: true,
		iconshadow: true,
		inline: null,
		mini: null,
		initSelector: "button, [type='button'], [type='submit'], [type='reset']"
	},
	_create: function() {
		var $el = this.element,
			$button,
			// create a copy of this.options we can pass to buttonMarkup
			o = ( function( tdo ) {
				var key, ret = {};

				for ( key in tdo ) {
					if ( tdo[ key ] !== null && key !== "initSelector" ) {
						ret[ key ] = tdo[ key ];
					}
				}

				return ret;
			} )( this.options ),
			classes = "",
			$buttonPlaceholder;

		// if this is a link, check if it's been enhanced and, if not, use the right function
		if ( $el[ 0 ].tagName === "A" ) {
			if ( !$el.hasClass( "ui-btn" ) ) {
				$el.buttonMarkup();
			}
			return;
		}

		// get the inherited theme
		// TODO centralize for all widgets
		if ( !this.options.theme ) {
			this.options.theme = $.mobile.getInheritedTheme( this.element, "c" );
		}

		// TODO: Post 1.1--once we have time to test thoroughly--any classes manually applied to the original element should be carried over to the enhanced element, with an `-enhanced` suffix. See https://github.com/jquery/jquery-mobile/issues/3577
		/* if ( $el[0].className.length ) {
			classes = $el[0].className;
		} */
		if ( !!~$el[0].className.indexOf( "ui-btn-left" ) ) {
			classes = "ui-btn-left";
		}

		if (  !!~$el[0].className.indexOf( "ui-btn-right" ) ) {
			classes = "ui-btn-right";
		}

		if (  $el.attr( "type" ) === "submit" || $el.attr( "type" ) === "reset" ) {
			classes ? classes += " ui-submit" :  classes = "ui-submit";
		}
		$( "label[for='" + $el.attr( "id" ) + "']" ).addClass( "ui-submit" );

		// Add ARIA role
		this.button = $( "<div></div>" )
			[ $el.html() ? "html" : "text" ]( $el.html() || $el.val() )
			.insertBefore( $el )
			.buttonMarkup( o )
			.addClass( classes )
			.append( $el.addClass( "ui-btn-hidden" ) );

        $button = this.button;

		$el.bind({
			focus: function() {
				$button.addClass( $.mobile.focusClass );
			},

			blur: function() {
				$button.removeClass( $.mobile.focusClass );
			}
		});

		this.refresh();
	},

	_setOption: function( key, value ) {
		var op = {};

		op[ key ] = value;
		if ( key !== "initSelector" ) {
			this.button.buttonMarkup( op );
			// Record the option change in the options and in the DOM data-* attributes
			this.element.attr( "data-" + ( $.mobile.ns || "" ) + ( key.replace( /([A-Z])/, "-$1" ).toLowerCase() ), value );
		}
		this._super( "_setOption", key, value );
	},

	enable: function() {
		this.element.attr( "disabled", false );
		this.button.removeClass( "ui-disabled" ).attr( "aria-disabled", false );
		return this._setOption( "disabled", false );
	},

	disable: function() {
		this.element.attr( "disabled", true );
		this.button.addClass( "ui-disabled" ).attr( "aria-disabled", true );
		return this._setOption( "disabled", true );
	},

	refresh: function() {
		var $el = this.element;

		if ( $el.prop("disabled") ) {
			this.disable();
		} else {
			this.enable();
		}

		// Grab the button's text element from its implementation-independent data item
		$( this.button.data( 'buttonElements' ).text )[ $el.html() ? "html" : "text" ]( $el.html() || $el.val() );
	}
});

//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {
	$.mobile.button.prototype.enhanceWithin( e.target, true );
});

})( jQuery );

(function( $, undefined ) {

	$.widget( "mobile.controlgroup", $.mobile.widget, {
		options: {
			shadow: false,
			corners: true,
			excludeInvisible: true,
			type: "vertical",
			mini: false,
			initSelector: ":jqmData(role='controlgroup')"
		},

		_create: function() {
			var $el = this.element,
				ui = {
					inner: $( "<div class='ui-controlgroup-controls'></div>" ),
					legend: $( "<div role='heading' class='ui-controlgroup-label'></div>" )
				},
				grouplegend = $el.children( "legend" ),
				self = this;

			// Apply the proto
			$el.wrapInner( ui.inner );
			if ( grouplegend.length ) {
				ui.legend.append( grouplegend ).insertBefore( $el.children( 0 ) );
			}
			$el.addClass( "ui-corner-all ui-controlgroup" );

			$.extend( this, {
				_initialRefresh: true
			});

			$.each( this.options, function( key, value ) {
				// Cause initial options to be applied by their handler by temporarily setting the option to undefined
				// - the handler then sets it to the initial value
				self.options[ key ] = undefined;
				self._setOption( key, value, true );
			});
		},

		_init: function() {
			this.refresh();
		},

		_setOption: function( key, value ) {
			var setter = "_set" + key.charAt( 0 ).toUpperCase() + key.slice( 1 );

			if ( this[ setter ] !== undefined ) {
				this[ setter ]( value );
			}

			this._super( key, value );
			this.element.attr( "data-" + ( $.mobile.ns || "" ) + ( key.replace( /([A-Z])/, "-$1" ).toLowerCase() ), value );
		},

		_setType: function( value ) {
			this.element
				.removeClass( "ui-controlgroup-horizontal ui-controlgroup-vertical" )
				.addClass( "ui-controlgroup-" + value );
			this.refresh();
		},

		_setCorners: function( value ) {
			this.element.toggleClass( "ui-corner-all", value );
		},

		_setShadow: function( value ) {
			this.element.toggleClass( "ui-shadow", value );
		},

		_setMini: function( value ) {
			this.element.toggleClass( "ui-mini", value );
		},

		container: function() {
			return this.element.children( ".ui-controlgroup-controls" );
		},

		refresh: function() {
			var els = this.element.find( ".ui-btn" ).not( ".ui-slider-handle" ),
				create = this._initialRefresh;
			if ( $.mobile.checkboxradio ) {
				this.element.find( ":mobile-checkboxradio" ).checkboxradio( "refresh" );
			}
			this._addFirstLastClasses( els, this.options.excludeInvisible ? this._getVisibles( els, create ) : els, create );
			this._initialRefresh = false;
		}
	});

	$.widget( "mobile.controlgroup", $.mobile.controlgroup, $.mobile.behaviors.addFirstLastClasses );

	// TODO: Implement a mechanism to allow widgets to become enhanced in the
	// correct order when their correct enhancement depends on other widgets in
	// the page being correctly enhanced already.
	//
	// For now, we wait until dom-ready to attach the controlgroup's enhancement
	// hook, because by that time, all the other widgets' enhancement hooks should
	// already be in place, ensuring that all widgets that need to be grouped will
	// already have been enhanced by the time the controlgroup is created.
	$( function() {
		$.mobile.document.bind( "pagecreate create", function( e )  {
			$.mobile.controlgroup.prototype.enhanceWithin( e.target, true );
		});
	});
})(jQuery);

(function( $, undefined ) {

$( document ).bind( "pagecreate create", function( e ) {

	//links within content areas, tests included with page
	$( e.target )
		.find( "a" )
		.jqmEnhanceable()
		.not( ".ui-btn, .ui-link-inherit, :jqmData(role='none'), :jqmData(role='nojs')" )
		.addClass( "ui-link" );

});

})( jQuery );


(function( $, undefined ) {

	function fitSegmentInsideSegment( winSize, segSize, offset, desired ) {
		var ret = desired;

		if ( winSize < segSize ) {
			// Center segment if it's bigger than the window
			ret = offset + ( winSize - segSize ) / 2;
		} else {
			// Otherwise center it at the desired coordinate while keeping it completely inside the window
			ret = Math.min( Math.max( offset, desired - segSize / 2 ), offset + winSize - segSize );
		}

		return ret;
	}

	function windowCoords() {
		var $win = $.mobile.window;

		return {
			x: $win.scrollLeft(),
			y: $win.scrollTop(),
			cx: ( window.innerWidth || $win.width() ),
			cy: ( window.innerHeight || $win.height() )
		};
	}

	$.widget( "mobile.popup", $.mobile.widget, {
		options: {
			theme: null,
			overlayTheme: null,
			shadow: true,
			corners: true,
			transition: "none",
			positionTo: "origin",
			tolerance: null,
			initSelector: ":jqmData(role='popup')",
			closeLinkSelector: "a:jqmData(rel='back')",
			closeLinkEvents: "click.popup",
			navigateEvents: "navigate.popup",
			closeEvents: "navigate.popup pagebeforechange.popup",
			dismissible: true,

			// NOTE Windows Phone 7 has a scroll position caching issue that
			//      requires us to disable popup history management by default
			//      https://github.com/jquery/jquery-mobile/issues/4784
			//
			// NOTE this option is modified in _create!
			history: !$.mobile.browser.oldIE
		},

		_eatEventAndClose: function( e ) {
			e.preventDefault();
			e.stopImmediatePropagation();
			if ( this.options.dismissible ) {
				this.close();
			}
			return false;
		},

		// Make sure the screen size is increased beyond the page height if the popup's causes the document to increase in height
		_resizeScreen: function() {
			var popupHeight = this._ui.container.outerHeight( true );

			this._ui.screen.removeAttr( "style" );
			if ( popupHeight > this._ui.screen.height() ) {
				this._ui.screen.height( popupHeight );
			}
		},

		_handleWindowKeyUp: function( e ) {
			if ( this._isOpen && e.keyCode === $.mobile.keyCode.ESCAPE ) {
				return this._eatEventAndClose( e );
			}
		},

		_expectResizeEvent: function() {
			var winCoords = windowCoords();

			if ( this._resizeData ) {
				if ( winCoords.x === this._resizeData.winCoords.x &&
					winCoords.y === this._resizeData.winCoords.y &&
					winCoords.cx === this._resizeData.winCoords.cx &&
					winCoords.cy === this._resizeData.winCoords.cy ) {
					// timeout not refreshed
					return false;
				} else {
					// clear existing timeout - it will be refreshed below
					clearTimeout( this._resizeData.timeoutId );
				}
			}

			this._resizeData = {
				timeoutId: setTimeout( $.proxy( this, "_resizeTimeout" ), 200 ),
				winCoords: winCoords
			};

			return true;
		},

		_resizeTimeout: function() {
			if ( this._isOpen ) {
				if ( !this._expectResizeEvent() ) {
					if ( this._ui.container.hasClass( "ui-popup-hidden" ) ) {
						// effectively rapid-open the popup while leaving the screen intact
						this._ui.container.removeClass( "ui-popup-hidden" );
						this.reposition( { positionTo: "window" } );
						this._ignoreResizeEvents();
					}

					this._resizeScreen();
					this._resizeData = null;
					this._orientationchangeInProgress = false;
				}
			} else {
				this._resizeData = null;
				this._orientationchangeInProgress = false;
			}
		},

		_ignoreResizeEvents: function() {
			var self = this;

			if ( this._ignoreResizeTo ) {
				clearTimeout( this._ignoreResizeTo );
			}
			this._ignoreResizeTo = setTimeout( function() { self._ignoreResizeTo = 0; }, 1000 );
		},

		_handleWindowResize: function( e ) {
			if ( this._isOpen && this._ignoreResizeTo === 0 ) {
				if ( ( this._expectResizeEvent() || this._orientationchangeInProgress ) &&
					!this._ui.container.hasClass( "ui-popup-hidden" ) ) {
					// effectively rapid-close the popup while leaving the screen intact
					this._ui.container
						.addClass( "ui-popup-hidden" )
						.removeAttr( "style" );
				}
			}
		},

		_handleWindowOrientationchange: function( e ) {
			if ( !this._orientationchangeInProgress && this._isOpen && this._ignoreResizeTo === 0 ) {
				this._expectResizeEvent();
				this._orientationchangeInProgress = true;
			}
		},

		// When the popup is open, attempting to focus on an element that is not a
		// child of the popup will redirect focus to the popup
		_handleDocumentFocusIn: function( e ) {
			var tgt = e.target, $tgt, ui = this._ui;

			if ( !this._isOpen ) {
				return;
			}

			if ( tgt !== ui.container[ 0 ] ) {
				$tgt = $( e.target );
				if ( 0 === $tgt.parents().filter( ui.container[ 0 ] ).length ) {
					$( document.activeElement ).one( "focus", function( e ) {
						$tgt.blur();
					});
					ui.focusElement.focus();
					e.preventDefault();
					e.stopImmediatePropagation();
					return false;
				} else if ( ui.focusElement[ 0 ] === ui.container[ 0 ] ) {
					ui.focusElement = $tgt;
				}
			} else if ( ui.focusElement && ui.focusElement[ 0 ] !== ui.container[ 0 ] ) {
				ui.container.blur();
				ui.focusElement.focus();
			}

			this._ignoreResizeEvents();
		},

		_create: function() {
			var ui = {
					screen: $( "<div class='ui-screen-hidden ui-popup-screen'></div>" ),
					placeholder: $( "<div style='display: none;'><!-- placeholder --></div>" ),
					container: $( "<div class='ui-popup-container ui-popup-hidden'></div>" )
				},
				thisPage = this.element.closest( ".ui-page" ),
				myId = this.element.attr( "id" ),
				self = this;

			// We need to adjust the history option to be false if there's no AJAX nav.
			// We can't do it in the option declarations because those are run before
			// it is determined whether there shall be AJAX nav.
			this.options.history = this.options.history && $.mobile.ajaxEnabled && $.mobile.hashListeningEnabled;

			if ( thisPage.length === 0 ) {
				thisPage = $( "body" );
			}

			// define the container for navigation event bindings
			// TODO this would be nice at the the mobile widget level
			this.options.container = this.options.container || $.mobile.pageContainer;

			// Apply the proto
			thisPage.append( ui.screen );
			ui.container.insertAfter( ui.screen );
			// Leave a placeholder where the element used to be
			ui.placeholder.insertAfter( this.element );
			if ( myId ) {
				ui.screen.attr( "id", myId + "-screen" );
				ui.container.attr( "id", myId + "-popup" );
				ui.placeholder.html( "<!-- placeholder for " + myId + " -->" );
			}
			ui.container.append( this.element );
			ui.focusElement = ui.container;

			// Add class to popup element
			this.element.addClass( "ui-popup" );

			// Define instance variables
			$.extend( this, {
				_scrollTop: 0,
				_page: thisPage,
				_ui: ui,
				_fallbackTransition: "",
				_currentTransition: false,
				_prereqs: null,
				_isOpen: false,
				_tolerance: null,
				_resizeData: null,
				_ignoreResizeTo: 0,
				_orientationchangeInProgress: false
			});

			$.each( this.options, function( key, value ) {
				// Cause initial options to be applied by their handler by temporarily setting the option to undefined
				// - the handler then sets it to the initial value
				self.options[ key ] = undefined;
				self._setOption( key, value, true );
			});

			ui.screen.bind( "vclick", $.proxy( this, "_eatEventAndClose" ) );

			this._on( $.mobile.window, {
				orientationchange: $.proxy( this, "_handleWindowOrientationchange" ),
				resize: $.proxy( this, "_handleWindowResize" ),
				keyup: $.proxy( this, "_handleWindowKeyUp" )
			});
			this._on( $.mobile.document, {
				focusin: $.proxy( this, "_handleDocumentFocusIn" )
			});
		},

		_applyTheme: function( dst, theme, prefix ) {
			var classes = ( dst.attr( "class" ) || "").split( " " ),
				alreadyAdded = true,
				currentTheme = null,
				matches,
				themeStr = String( theme );

			while ( classes.length > 0 ) {
				currentTheme = classes.pop();
				matches = ( new RegExp( "^ui-" + prefix + "-([a-z])$" ) ).exec( currentTheme );
				if ( matches && matches.length > 1 ) {
					currentTheme = matches[ 1 ];
					break;
				} else {
					currentTheme = null;
				}
			}

			if ( theme !== currentTheme ) {
				dst.removeClass( "ui-" + prefix + "-" + currentTheme );
				if ( ! ( theme === null || theme === "none" ) ) {
					dst.addClass( "ui-" + prefix + "-" + themeStr );
				}
			}
		},

		_setTheme: function( value ) {
			this._applyTheme( this.element, value, "body" );
		},

		_setOverlayTheme: function( value ) {
			this._applyTheme( this._ui.screen, value, "overlay" );

			if ( this._isOpen ) {
				this._ui.screen.addClass( "in" );
			}
		},

		_setShadow: function( value ) {
			this.element.toggleClass( "ui-overlay-shadow", value );
		},

		_setCorners: function( value ) {
			this.element.toggleClass( "ui-corner-all", value );
		},

		_applyTransition: function( value ) {
			this._ui.container.removeClass( this._fallbackTransition );
			if ( value && value !== "none" ) {
				this._fallbackTransition = $.mobile._maybeDegradeTransition( value );
				if ( this._fallbackTransition === "none" ) {
					this._fallbackTransition = "";
				}
				this._ui.container.addClass( this._fallbackTransition );
			}
		},

		_setTransition: function( value ) {
			if ( !this._currentTransition ) {
				this._applyTransition( value );
			}
		},

		_setTolerance: function( value ) {
			var tol = { t: 30, r: 15, b: 30, l: 15 };

			if ( value !== undefined ) {
				var ar = String( value ).split( "," );

				$.each( ar, function( idx, val ) { ar[ idx ] = parseInt( val, 10 ); } );

				switch( ar.length ) {
					// All values are to be the same
					case 1:
						if ( !isNaN( ar[ 0 ] ) ) {
							tol.t = tol.r = tol.b = tol.l = ar[ 0 ];
						}
						break;

					// The first value denotes top/bottom tolerance, and the second value denotes left/right tolerance
					case 2:
						if ( !isNaN( ar[ 0 ] ) ) {
							tol.t = tol.b = ar[ 0 ];
						}
						if ( !isNaN( ar[ 1 ] ) ) {
							tol.l = tol.r = ar[ 1 ];
						}
						break;

					// The array contains values in the order top, right, bottom, left
					case 4:
						if ( !isNaN( ar[ 0 ] ) ) {
							tol.t = ar[ 0 ];
						}
						if ( !isNaN( ar[ 1 ] ) ) {
							tol.r = ar[ 1 ];
						}
						if ( !isNaN( ar[ 2 ] ) ) {
							tol.b = ar[ 2 ];
						}
						if ( !isNaN( ar[ 3 ] ) ) {
							tol.l = ar[ 3 ];
						}
						break;

					default:
						break;
				}
			}

			this._tolerance = tol;
		},

		_setOption: function( key, value ) {
			var exclusions, setter = "_set" + key.charAt( 0 ).toUpperCase() + key.slice( 1 );

			if ( this[ setter ] !== undefined ) {
				this[ setter ]( value );
			}

			// TODO REMOVE FOR 1.2.1 by moving them out to a default options object
			exclusions = [
				"initSelector",
				"closeLinkSelector",
				"closeLinkEvents",
				"navigateEvents",
				"closeEvents",
				"history",
				"container"
			];

			$.mobile.widget.prototype._setOption.apply( this, arguments );
			if ( $.inArray( key, exclusions ) === -1 ) {
				// Record the option change in the options and in the DOM data-* attributes
				this.element.attr( "data-" + ( $.mobile.ns || "" ) + ( key.replace( /([A-Z])/, "-$1" ).toLowerCase() ), value );
			}
		},

		// Try and center the overlay over the given coordinates
		_placementCoords: function( desired ) {
			// rectangle within which the popup must fit
			var
				winCoords = windowCoords(),
				rc = {
					x: this._tolerance.l,
					y: winCoords.y + this._tolerance.t,
					cx: winCoords.cx - this._tolerance.l - this._tolerance.r,
					cy: winCoords.cy - this._tolerance.t - this._tolerance.b
				},
				menuSize, ret;

			// Clamp the width of the menu before grabbing its size
			this._ui.container.css( "max-width", rc.cx );
			menuSize = {
				cx: this._ui.container.outerWidth( true ),
				cy: this._ui.container.outerHeight( true )
			};

			// Center the menu over the desired coordinates, while not going outside
			// the window tolerances. This will center wrt. the window if the popup is too large.
			ret = {
				x: fitSegmentInsideSegment( rc.cx, menuSize.cx, rc.x, desired.x ),
				y: fitSegmentInsideSegment( rc.cy, menuSize.cy, rc.y, desired.y )
			};

			// Make sure the top of the menu is visible
			ret.y = Math.max( 0, ret.y );

			// If the height of the menu is smaller than the height of the document
			// align the bottom with the bottom of the document

			// fix for $.mobile.document.height() bug in core 1.7.2.
			var docEl = document.documentElement, docBody = document.body,
				docHeight = Math.max( docEl.clientHeight, docBody.scrollHeight, docBody.offsetHeight, docEl.scrollHeight, docEl.offsetHeight );

			ret.y -= Math.min( ret.y, Math.max( 0, ret.y + menuSize.cy - docHeight ) );

			return { left: ret.x, top: ret.y };
		},

		_createPrereqs: function( screenPrereq, containerPrereq, whenDone ) {
			var self = this, prereqs;

			// It is important to maintain both the local variable prereqs and self._prereqs. The local variable remains in
			// the closure of the functions which call the callbacks passed in. The comparison between the local variable and
			// self._prereqs is necessary, because once a function has been passed to .animationComplete() it will be called
			// next time an animation completes, even if that's not the animation whose end the function was supposed to catch
			// (for example, if an abort happens during the opening animation, the .animationComplete handler is not called for
			// that animation anymore, but the handler remains attached, so it is called the next time the popup is opened
			// - making it stale. Comparing the local variable prereqs to the widget-level variable self._prereqs ensures that
			// callbacks triggered by a stale .animationComplete will be ignored.

			prereqs = {
				screen: $.Deferred(),
				container: $.Deferred()
			};

			prereqs.screen.then( function() {
				if ( prereqs === self._prereqs ) {
					screenPrereq();
				}
			});

			prereqs.container.then( function() {
				if ( prereqs === self._prereqs ) {
					containerPrereq();
				}
			});

			$.when( prereqs.screen, prereqs.container ).done( function() {
				if ( prereqs === self._prereqs ) {
					self._prereqs = null;
					whenDone();
				}
			});

			self._prereqs = prereqs;
		},

		_animate: function( args ) {
			// NOTE before removing the default animation of the screen
			//      this had an animate callback that would resolve the deferred
			//      now the deferred is resolved immediately
			// TODO remove the dependency on the screen deferred
			this._ui.screen
				.removeClass( args.classToRemove )
				.addClass( args.screenClassToAdd );

			args.prereqs.screen.resolve();

			if ( args.transition && args.transition !== "none" ) {
				if ( args.applyTransition ) {
					this._applyTransition( args.transition );
				}
				if ( this._fallbackTransition ) {
					this._ui.container
						.animationComplete( $.proxy( args.prereqs.container, "resolve" ) )
						.addClass( args.containerClassToAdd )
						.removeClass( args.classToRemove );
					return;
				}
			}
			this._ui.container.removeClass( args.classToRemove );
			args.prereqs.container.resolve();
		},

		// The desired coordinates passed in will be returned untouched if no reference element can be identified via
		// desiredPosition.positionTo. Nevertheless, this function ensures that its return value always contains valid
		// x and y coordinates by specifying the center middle of the window if the coordinates are absent.
		// options: { x: coordinate, y: coordinate, positionTo: string: "origin", "window", or jQuery selector
		_desiredCoords: function( o ) {
			var dst = null, offset, winCoords = windowCoords(), x = o.x, y = o.y, pTo = o.positionTo;

			// Establish which element will serve as the reference
			if ( pTo && pTo !== "origin" ) {
				if ( pTo === "window" ) {
					x = winCoords.cx / 2 + winCoords.x;
					y = winCoords.cy / 2 + winCoords.y;
				} else {
					try {
						dst = $( pTo );
					} catch( e ) {
						dst = null;
					}
					if ( dst ) {
						dst.filter( ":visible" );
						if ( dst.length === 0 ) {
							dst = null;
						}
					}
				}
			}

			// If an element was found, center over it
			if ( dst ) {
				offset = dst.offset();
				x = offset.left + dst.outerWidth() / 2;
				y = offset.top + dst.outerHeight() / 2;
			}

			// Make sure x and y are valid numbers - center over the window
			if ( $.type( x ) !== "number" || isNaN( x ) ) {
				x = winCoords.cx / 2 + winCoords.x;
			}
			if ( $.type( y ) !== "number" || isNaN( y ) ) {
				y = winCoords.cy / 2 + winCoords.y;
			}

			return { x: x, y: y };
		},

		_reposition: function( o ) {
			// We only care about position-related parameters for repositioning
			o = { x: o.x, y: o.y, positionTo: o.positionTo };
			this._trigger( "beforeposition", o );
			this._ui.container.offset( this._placementCoords( this._desiredCoords( o ) ) );
		},

		reposition: function( o ) {
			if ( this._isOpen ) {
				this._reposition( o );
			}
		},

		_openPrereqsComplete: function() {
			this._ui.container.addClass( "ui-popup-active" );
			this._isOpen = true;
			this._resizeScreen();
			this._ui.container.attr( "tabindex", "0" ).focus();
			this._ignoreResizeEvents();
			this._trigger( "afteropen" );
		},

		_open: function( options ) {
			var o = $.extend( {}, this.options, options ),
				// TODO move blacklist to private method
				androidBlacklist = ( function() {
					var w = window,
						ua = navigator.userAgent,
						// Rendering engine is Webkit, and capture major version
						wkmatch = ua.match( /AppleWebKit\/([0-9\.]+)/ ),
						wkversion = !!wkmatch && wkmatch[ 1 ],
						androidmatch = ua.match( /Android (\d+(?:\.\d+))/ ),
						andversion = !!androidmatch && androidmatch[ 1 ],
						chromematch = ua.indexOf( "Chrome" ) > -1;

					// Platform is Android, WebKit version is greater than 534.13 ( Android 3.2.1 ) and not Chrome.
					if( androidmatch !== null && andversion === "4.0" && wkversion && wkversion > 534.13 && !chromematch ) {
						return true;
					}
					return false;
				}());

			// Count down to triggering "popupafteropen" - we have two prerequisites:
			// 1. The popup window animation completes (container())
			// 2. The screen opacity animation completes (screen())
			this._createPrereqs(
				$.noop,
				$.noop,
				$.proxy( this, "_openPrereqsComplete" ) );

			this._currentTransition = o.transition;
			this._applyTransition( o.transition );

			if ( !this.options.theme ) {
				this._setTheme( this._page.jqmData( "theme" ) || $.mobile.getInheritedTheme( this._page, "c" ) );
			}

			this._ui.screen.removeClass( "ui-screen-hidden" );
			this._ui.container.removeClass( "ui-popup-hidden" );

			// Give applications a chance to modify the contents of the container before it appears
			this._reposition( o );

			if ( this.options.overlayTheme && androidBlacklist ) {
				/* TODO:
				The native browser on Android 4.0.X ("Ice Cream Sandwich") suffers from an issue where the popup overlay appears to be z-indexed
				above the popup itself when certain other styles exist on the same page -- namely, any element set to `position: fixed` and certain
				types of input. These issues are reminiscent of previously uncovered bugs in older versions of Android's native browser:
				https://github.com/scottjehl/Device-Bugs/issues/3

				This fix closes the following bugs ( I use "closes" with reluctance, and stress that this issue should be revisited as soon as possible ):

				https://github.com/jquery/jquery-mobile/issues/4816
				https://github.com/jquery/jquery-mobile/issues/4844
				https://github.com/jquery/jquery-mobile/issues/4874
				*/

				// TODO sort out why this._page isn't working
				this.element.closest( ".ui-page" ).addClass( "ui-popup-open" );
			}
			this._animate({
				additionalCondition: true,
				transition: o.transition,
				classToRemove: "",
				screenClassToAdd: "in",
				containerClassToAdd: "in",
				applyTransition: false,
				prereqs: this._prereqs
			});
		},

		_closePrereqScreen: function() {
			this._ui.screen
				.removeClass( "out" )
				.addClass( "ui-screen-hidden" );
		},

		_closePrereqContainer: function() {
			this._ui.container
				.removeClass( "reverse out" )
				.addClass( "ui-popup-hidden" )
				.removeAttr( "style" );
		},

		_closePrereqsDone: function() {
			var opts = this.options;

			this._ui.container.removeAttr( "tabindex" );

			// remove the global mutex for popups
			$.mobile.popup.active = undefined;

			// alert users that the popup is closed
			this._trigger( "afterclose" );
		},

		_close: function( immediate ) {
			this._ui.container.removeClass( "ui-popup-active" );
			this._page.removeClass( "ui-popup-open" );

			this._isOpen = false;

			// Count down to triggering "popupafterclose" - we have two prerequisites:
			// 1. The popup window reverse animation completes (container())
			// 2. The screen opacity animation completes (screen())
			this._createPrereqs(
				$.proxy( this, "_closePrereqScreen" ),
				$.proxy( this, "_closePrereqContainer" ),
				$.proxy( this, "_closePrereqsDone" ) );

			this._animate( {
				additionalCondition: this._ui.screen.hasClass( "in" ),
				transition: ( immediate ? "none" : ( this._currentTransition ) ),
				classToRemove: "in",
				screenClassToAdd: "out",
				containerClassToAdd: "reverse out",
				applyTransition: true,
				prereqs: this._prereqs
			});
		},

		_unenhance: function() {
			// Put the element back to where the placeholder was and remove the "ui-popup" class
			this._setTheme( "none" );
			this.element
				// Cannot directly insertAfter() - we need to detach() first, because
				// insertAfter() will do nothing if the payload div was not attached
				// to the DOM at the time the widget was created, and so the payload
				// will remain inside the container even after we call insertAfter().
				// If that happens and we remove the container a few lines below, we
				// will cause an infinite recursion - #5244
				.detach()
				.insertAfter( this._ui.placeholder )
				.removeClass( "ui-popup ui-overlay-shadow ui-corner-all" );
			this._ui.screen.remove();
			this._ui.container.remove();
			this._ui.placeholder.remove();
		},

		_destroy: function() {
			if ( $.mobile.popup.active === this ) {
				this.element.one( "popupafterclose", $.proxy( this, "_unenhance" ) );
				this.close();
			} else {
				this._unenhance();
			}
		},

		_closePopup: function( e, data ) {
			var parsedDst, toUrl, o = this.options, immediate = false;

			// restore location on screen
			window.scrollTo( 0, this._scrollTop );

			if ( e && e.type === "pagebeforechange" && data ) {
				// Determine whether we need to rapid-close the popup, or whether we can
				// take the time to run the closing transition
				if ( typeof data.toPage === "string" ) {
					parsedDst = data.toPage;
				} else {
					parsedDst = data.toPage.jqmData( "url" );
				}
				parsedDst = $.mobile.path.parseUrl( parsedDst );
				toUrl = parsedDst.pathname + parsedDst.search + parsedDst.hash;

				if ( this._myUrl !== $.mobile.path.makeUrlAbsolute( toUrl ) ) {
					// Going to a different page - close immediately
					immediate = true;
				} else {
					e.preventDefault();
				}
			}

			// remove nav bindings
			o.container.unbind( o.closeEvents );
			// unbind click handlers added when history is disabled
			this.element.undelegate( o.closeLinkSelector, o.closeLinkEvents );

			this._close( immediate );
		},

		// any navigation event after a popup is opened should close the popup
		// NOTE the pagebeforechange is bound to catch navigation events that don't
		//      alter the url (eg, dialogs from popups)
		_bindContainerClose: function() {
			this.options.container
				.one( this.options.closeEvents, $.proxy( this, "_closePopup" ) );
		},

		// TODO no clear deliniation of what should be here and
		// what should be in _open. Seems to be "visual" vs "history" for now
		open: function( options ) {
			var self = this, opts = this.options, url, hashkey, activePage, currentIsDialog, hasHash, urlHistory;

			// make sure open is idempotent
			if( $.mobile.popup.active ) {
				return;
			}

			// set the global popup mutex
			$.mobile.popup.active = this;
			this._scrollTop = $.mobile.window.scrollTop();

			// if history alteration is disabled close on navigate events
			// and leave the url as is
			if( !( opts.history ) ) {
				self._open( options );
				self._bindContainerClose();

				// When histoy is disabled we have to grab the data-rel
				// back link clicks so we can close the popup instead of
				// relying on history to do it for us
				self.element
					.delegate( opts.closeLinkSelector, opts.closeLinkEvents, function( e ) {
						self.close();
						e.preventDefault();
					});

				return;
			}

			// cache some values for min/readability
			urlHistory = $.mobile.urlHistory;
			hashkey = $.mobile.dialogHashKey;
			activePage = $.mobile.activePage;
			currentIsDialog = activePage.is( ".ui-dialog" );
			this._myUrl = url = urlHistory.getActive().url;
			hasHash = ( url.indexOf( hashkey ) > -1 ) && !currentIsDialog && ( urlHistory.activeIndex > 0 );

			if ( hasHash ) {
				self._open( options );
				self._bindContainerClose();
				return;
			}

			// if the current url has no dialog hash key proceed as normal
			// otherwise, if the page is a dialog simply tack on the hash key
			if ( url.indexOf( hashkey ) === -1 && !currentIsDialog ){
				url = url + (url.indexOf( "#" ) > -1 ? hashkey : "#" + hashkey);
			} else {
				url = $.mobile.path.parseLocation().hash + hashkey;
			}

			// Tack on an extra hashkey if this is the first page and we've just reconstructed the initial hash
			if ( urlHistory.activeIndex === 0 && url === urlHistory.initialDst ) {
				url += hashkey;
			}

			// swallow the the initial navigation event, and bind for the next
			$(window).one( "beforenavigate", function( e ) {
				e.preventDefault();
				self._open( options );
				self._bindContainerClose();
			});

			this.urlAltered = true;
			$.mobile.navigate( url, {role: "dialog"} );
		},

		close: function() {
			// make sure close is idempotent
			if( $.mobile.popup.active !== this ) {
				return;
			}

			this._scrollTop = $.mobile.window.scrollTop();

			if( this.options.history && this.urlAltered ) {
				$.mobile.back();
				this.urlAltered = false;
			} else {
				// simulate the nav bindings having fired
				this._closePopup();
			}
		}
	});


	// TODO this can be moved inside the widget
	$.mobile.popup.handleLink = function( $link ) {
		var closestPage = $link.closest( ":jqmData(role='page')" ),
			scope = ( ( closestPage.length === 0 ) ? $( "body" ) : closestPage ),
			// NOTE make sure to get only the hash, ie7 (wp7) return the absolute href
			//      in this case ruining the element selection
			popup = $( $.mobile.path.parseUrl($link.attr( "href" )).hash, scope[0] ),
			offset;

		if ( popup.data( "mobile-popup" ) ) {
			offset = $link.offset();
			popup.popup( "open", {
				x: offset.left + $link.outerWidth() / 2,
				y: offset.top + $link.outerHeight() / 2,
				transition: $link.jqmData( "transition" ),
				positionTo: $link.jqmData( "position-to" )
			});
		}

		//remove after delay
		setTimeout( function() {
			// Check if we are in a listview
			var $parent = $link.parent().parent();
			if ($parent.hasClass("ui-li")) {
				$link = $parent.parent();
			}
			$link.removeClass( $.mobile.activeBtnClass );
		}, 300 );
	};

	// TODO move inside _create
	$.mobile.document.bind( "pagebeforechange", function( e, data ) {
		if ( data.options.role === "popup" ) {
			$.mobile.popup.handleLink( data.options.link );
			e.preventDefault();
		}
	});

	$.mobile.document.bind( "pagecreate create", function( e )  {
		$.mobile.popup.prototype.enhanceWithin( e.target, true );
	});

})( jQuery );

(function( $, undefined ) {

$.widget( "mobile.panel", $.mobile.widget, {
	options: {
		classes: {
			panel: "ui-panel",
			panelOpen: "ui-panel-open",
			panelClosed: "ui-panel-closed",
			panelFixed: "ui-panel-fixed",
			panelInner: "ui-panel-inner",
			modal: "ui-panel-dismiss",
			modalOpen: "ui-panel-dismiss-open",
			pagePanel: "ui-page-panel",
			pagePanelOpen: "ui-page-panel-open",
			contentWrap: "ui-panel-content-wrap",
			contentWrapOpen: "ui-panel-content-wrap-open",
			contentWrapClosed: "ui-panel-content-wrap-closed",
			contentFixedToolbar: "ui-panel-content-fixed-toolbar",
			contentFixedToolbarOpen: "ui-panel-content-fixed-toolbar-open",
			contentFixedToolbarClosed: "ui-panel-content-fixed-toolbar-closed",
			animate: "ui-panel-animate"
		},
		animate: true,
		theme: "c",
		position: "left",
		dismissible: true,
		display: "reveal", //accepts reveal, push, overlay
		initSelector: ":jqmData(role='panel')",
		swipeClose: true,
		positionFixed: false
	},

	_panelID: null,
	_closeLink: null,
	_page: null,
	_modal: null,
	_pannelInner: null,
	_wrapper: null,
	_fixedToolbar: null,

	_create: function() {
		var self = this,
			$el = self.element,
			page = $el.closest( ":jqmData(role='page')" ),
			_getPageTheme = function() {
				var $theme = $.data( page[0], "mobilePage" ).options.theme,
				$pageThemeClass = "ui-body-" + $theme;
				return $pageThemeClass;
			},
			_getPanelInner = function() {
				var $pannelInner = $el.find( "." + self.options.classes.panelInner );
				if ( $pannelInner.length === 0 ) {
					$pannelInner = $el.children().wrapAll( '<div class="' + self.options.classes.panelInner + '" />' ).parent();
				}
				return $pannelInner;
			},
			_getWrapper = function() {
				var $wrapper = page.find( "." + self.options.classes.contentWrap );
				if ( $wrapper.length === 0 ) {
					$wrapper = page.children( ".ui-header:not(:jqmData(position='fixed')), .ui-content:not(:jqmData(role='popup')), .ui-footer:not(:jqmData(position='fixed'))" ).wrapAll( '<div class="' + self.options.classes.contentWrap + ' ' + _getPageTheme() + '" />' ).parent();
					if ( $.support.cssTransform3d && !!self.options.animate ) {
						$wrapper.addClass( self.options.classes.animate );
					}
				}
				return $wrapper;
			},
			_getFixedToolbar = function() {
				var $fixedToolbar = page.find( "." + self.options.classes.contentFixedToolbar );
				if ( $fixedToolbar.length === 0 ) {
					$fixedToolbar = page.find( ".ui-header:jqmData(position='fixed'), .ui-footer:jqmData(position='fixed')" ).addClass( self.options.classes.contentFixedToolbar );
					if ( $.support.cssTransform3d && !!self.options.animate ) {
						$fixedToolbar.addClass( self.options.classes.animate );
					}
				}
				return $fixedToolbar;
			};

		// expose some private props to other methods
		$.extend( this, {
			_panelID: $el.attr( "id" ),
			_closeLink: $el.find( ":jqmData(rel='close')" ),
			_page: $el.closest( ":jqmData(role='page')" ),
			_pageTheme: _getPageTheme(),
			_pannelInner: _getPanelInner(),
			_wrapper: _getWrapper(),
			_fixedToolbar: _getFixedToolbar()
		});
		
		self._addPanelClasses();
		self._wrapper.addClass( this.options.classes.contentWrapClosed );
		self._fixedToolbar.addClass( this.options.classes.contentFixedToolbarClosed );
		// add class to page so we can set "overflow-x: hidden;" for it to fix Android zoom issue
		self._page.addClass( self.options.classes.pagePanel );
		
		// if animating, add the class to do so
		if ( $.support.cssTransform3d && !!self.options.animate ) {
			this.element.addClass( self.options.classes.animate );
		}
		
		self._bindUpdateLayout();
		self._bindCloseEvents();
		self._bindLinkListeners();
		self._bindPageEvents();

		if ( !!self.options.dismissible ) {
			self._createModal();
		}

		self._bindSwipeEvents();
	},

	_createModal: function( options ) {
		var self = this;
		
		self._modal = $( "<div class='" + self.options.classes.modal + "' data-panelid='" + self._panelID + "'></div>" )
			.on( "mousedown", function() {
				self.close();
			})
			.appendTo( this._page );
	},

	_getPosDisplayClasses: function( prefix ) {
		return prefix + "-position-" + this.options.position + " " + prefix + "-display-" + this.options.display;
	},

	_getPanelClasses: function() {
		var panelClasses = this.options.classes.panel +
			" " + this._getPosDisplayClasses( this.options.classes.panel ) +
			" " + this.options.classes.panelClosed;

		if ( this.options.theme ) {
			panelClasses += " ui-body-" + this.options.theme;
		}
		if ( !!this.options.positionFixed ) {
			panelClasses += " " + this.options.classes.panelFixed;
		}
		return panelClasses;
	},

	_addPanelClasses: function() {
		this.element.addClass( this._getPanelClasses() );
	},

	_bindCloseEvents: function() {
		var self = this;
		
		self._closeLink.on( "click.panel" , function( e ) {
			e.preventDefault();
			self.close();
			return false;
		});
		self.element.on( "click.panel" , "a:jqmData(ajax='false')", function( e ) {
			self.close();
		});		
	},

	_positionPanel: function() {
		var self = this,
			pannelInnerHeight = self._pannelInner.outerHeight(),
			expand = pannelInnerHeight > $.mobile.getScreenHeight();

		if ( expand || !self.options.positionFixed ) {
			if ( expand ) {
				self._unfixPanel();
				$.mobile.resetActivePageHeight( pannelInnerHeight );
			}
			self._scrollIntoView( pannelInnerHeight );
		} else {
			self._fixPanel();
		}
	},

	_scrollIntoView: function( pannelInnerHeight ) {
		if ( pannelInnerHeight < $( window ).scrollTop() ) {
			window.scrollTo( 0, 0 );
		}	
	},

	_bindFixListener: function() {
		this._on( $( window ), { "throttledresize": "_positionPanel" });
	},

	_unbindFixListener: function() {
		this._off( $( window ), "throttledresize" );
	},

	_unfixPanel: function() {
		if ( !!this.options.positionFixed && $.support.fixedPosition ) {
			this.element.removeClass( this.options.classes.panelFixed );
		}
	},

	_fixPanel: function() {
		if ( !!this.options.positionFixed && $.support.fixedPosition ) {
			this.element.addClass( this.options.classes.panelFixed );
		}
	},
	
	_bindUpdateLayout: function() {
		var self = this;
		
		self.element.on( "updatelayout", function( e ) {
			if ( self._open ) {
				self._positionPanel();
			}
		});
	},

	_bindLinkListeners: function() {
		var self = this;

		self._page.on( "click.panel" , "a", function( e ) {
			if ( this.href.split( "#" )[ 1 ] === self._panelID && self._panelID !== undefined ) {
				e.preventDefault();
				var $link = $( this );
				if ( ! $link.hasClass( "ui-link" ) ) {
					$link.addClass( $.mobile.activeBtnClass );
					self.element.one( "panelopen panelclose", function() {
						$link.removeClass( $.mobile.activeBtnClass );
					});
				}
				self.toggle();
				return false;
			}
		});
	},
	
	_bindSwipeEvents: function() {
		var self = this,
			area = self._modal ? self.element.add( self._modal ) : self.element;
		
		// on swipe, close the panel
		if( !!self.options.swipeClose ) {
			if ( self.options.position === "left" ) {
				area.on( "swipeleft.panel", function( e ) {
					self.close();
				});
			} else {
				area.on( "swiperight.panel", function( e ) {
					self.close();
				});
			}
		}
	},

	_bindPageEvents: function() {
		var self = this;
			
		self._page
			// Close the panel if another panel on the page opens
			.on( "panelbeforeopen", function( e ) {
				if ( self._open && e.target !== self.element[ 0 ] ) {
					self.close();
				}
			})
			// clean up open panels after page hide
			.on( "pagehide", function( e ) {
				if ( self._open ) {
					self.close( true );
				}
			})
			// on escape, close? might need to have a target check too...
			.on( "keyup.panel", function( e ) {
				if ( e.keyCode === 27 && self._open ) {
					self.close();
				}
			});
	},

	// state storage of open or closed
	_open: false,

	_contentWrapOpenClasses: null,
	_fixedToolbarOpenClasses: null,
	_modalOpenClasses: null,

	open: function( immediate ) {
		if ( !this._open ) {
			var self = this,
				o = self.options,
				_openPanel = function() {
					self._page.off( "panelclose" );
					self._page.jqmData( "panel", "open" );
					
					if ( !immediate && $.support.cssTransform3d && !!o.animate ) {
						self.element.add( self._wrapper ).on( self._transitionEndEvents, complete );
					} else {
						setTimeout( complete, 0 );
					}
					
					if ( self.options.theme && self.options.display !== "overlay" ) {
						self._page
							.removeClass( self._pageTheme )
							.addClass( "ui-body-" + self.options.theme );
					}
					
					self.element.removeClass( o.classes.panelClosed ).addClass( o.classes.panelOpen );
					
					self._contentWrapOpenClasses = self._getPosDisplayClasses( o.classes.contentWrap );
					self._wrapper
						.removeClass( o.classes.contentWrapClosed )
						.addClass( self._contentWrapOpenClasses + " " + o.classes.contentWrapOpen );
						
					self._fixedToolbarOpenClasses = self._getPosDisplayClasses( o.classes.contentFixedToolbar );
					self._fixedToolbar
						.removeClass( o.classes.contentFixedToolbarClosed )
						.addClass( self._fixedToolbarOpenClasses + " " + o.classes.contentFixedToolbarOpen );
						
					self._modalOpenClasses = self._getPosDisplayClasses( o.classes.modal ) + " " + o.classes.modalOpen;
					if ( self._modal ) {
						self._modal.addClass( self._modalOpenClasses );
					}
				},
				complete = function() {
					self.element.add( self._wrapper ).off( self._transitionEndEvents, complete );

					self._page.addClass( o.classes.pagePanelOpen );
					
					self._positionPanel();
					self._bindFixListener();
					
					self._trigger( "open" );
				};

			if ( this.element.closest( ".ui-page-active" ).length < 0 ) {
				immediate = true;
			}
			
			self._trigger( "beforeopen" );
			
			if ( self._page.jqmData('panel') === "open" ) {
				self._page.on( "panelclose", function() {
					_openPanel();
				});
			} else {
				_openPanel();
			}
			
			self._open = true;
		}
	},

	close: function( immediate ) {
		if ( this._open ) {
			var o = this.options,
				self = this,
				_closePanel = function() {
					if ( !immediate && $.support.cssTransform3d && !!o.animate ) {
						self.element.add( self._wrapper ).on( self._transitionEndEvents, complete );
					} else {
						setTimeout( complete, 0 );
					}
					
					self._page.removeClass( o.classes.pagePanelOpen );
					self.element.removeClass( o.classes.panelOpen );
					self._wrapper.removeClass( o.classes.contentWrapOpen );
					self._fixedToolbar.removeClass( o.classes.contentFixedToolbarOpen );
					
					if ( self._modal ) {
						self._modal.removeClass( self._modalOpenClasses );
					}
				},
				complete = function() {
					if ( self.options.theme && self.options.display !== "overlay" ) {
						self._page.removeClass( "ui-body-" + self.options.theme ).addClass( self._pageTheme );
					}
					self.element.add( self._wrapper ).off( self._transitionEndEvents, complete );
					self.element.addClass( o.classes.panelClosed );
					
					self._wrapper
						.removeClass( self._contentWrapOpenClasses )
						.addClass( o.classes.contentWrapClosed );
						
					self._fixedToolbar
						.removeClass( self._fixedToolbarOpenClasses )
						.addClass( o.classes.contentFixedToolbarClosed );
						
					self._fixPanel();
					self._unbindFixListener();
					$.mobile.resetActivePageHeight();
					
					self._page.jqmRemoveData( "panel" );
					self._trigger( "close" );
				};
				
			if ( this.element.closest( ".ui-page-active" ).length < 0 ) {
				immediate = true;
			}
			self._trigger( "beforeclose" );

			_closePanel();

			self._open = false;
		}
	},

	toggle: function( options ) {
		this[ this._open ? "close" : "open" ]();
	},

	_transitionEndEvents: "webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd",

	_destroy: function() {
		var classes = this.options.classes,
			theme = this.options.theme,
			hasOtherSiblingPanels = this.element.siblings( "." + classes.panel ).length;

		// create
		if ( !hasOtherSiblingPanels ) {
			this._wrapper.children().unwrap();
			this._page.find( "a" ).unbind( "panelopen panelclose" );
			this._page.removeClass( classes.pagePanel );
			if ( this._open ) {
				this._page.jqmRemoveData( "panel" );
				this._page.removeClass( classes.pagePanelOpen );
				if ( theme ) {
					this._page.removeClass( "ui-body-" + theme ).addClass( this._pageTheme );
				}
				$.mobile.resetActivePageHeight();
			}
		} else if ( this._open ) {
			this._wrapper.removeClass( classes.contentWrapOpen );
			this._fixedToolbar.removeClass( classes.contentFixedToolbarOpen );
			this._page.jqmRemoveData( "panel" );
			this._page.removeClass( classes.pagePanelOpen );
			if ( theme ) {
				this._page.removeClass( "ui-body-" + theme ).addClass( this._pageTheme );
			}
		}
		
		this._pannelInner.children().unwrap();

		this.element.removeClass( [ this._getPanelClasses(), classes.panelAnimate ].join( " " ) )
			.off( "swipeleft.panel swiperight.panel" )
			.off( "panelbeforeopen" )
			.off( "panelhide" )
			.off( "keyup.panel" )
			.off( "updatelayout" );

		this._closeLink.off( "click.panel" );

		if ( this._modal ) {
			this._modal.remove();
		}

		// open and close
		this.element.off( this._transitionEndEvents )
			.removeClass( [ classes.panelUnfixed, classes.panelClosed, classes.panelOpen ].join( " " ) );
	}
});

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ) {
	$.mobile.panel.prototype.enhanceWithin( e.target );
});

})( jQuery );

(function( $, undefined ) {

$.widget( "mobile.table", $.mobile.widget, {

		options: {
			classes: {
				table: "ui-table"
			},
			initSelector: ":jqmData(role='table')"
		},

		_create: function() {

			var self = this,
				trs = this.element.find( "thead tr" );

			this.element.addClass( this.options.classes.table );

			// Expose headers and allHeaders properties on the widget
			// headers references the THs within the first TR in the table
			self.headers = this.element.find( "tr:eq(0)" ).children();

			// allHeaders references headers, plus all THs in the thead, which may include several rows, or not
			self.allHeaders = self.headers.add( trs.children() );

			trs.each(function(){

				var coltally = 0;

				$( this ).children().each(function( i ){

					var span = parseInt( $( this ).attr( "colspan" ), 10 ),
						sel = ":nth-child(" + ( coltally + 1 ) + ")";
					
					$( this )
						.jqmData( "colstart", coltally + 1 );

					if( span ){
						for( var j = 0; j < span - 1; j++ ){
							coltally++;
							sel += ", :nth-child(" + ( coltally + 1 ) + ")";
						}
					}

					// Store "cells" data on header as a reference to all cells in the same column as this TH
					$( this )
						.jqmData( "cells", self.element.find( "tr" ).not( trs.eq(0) ).not( this ).children( sel ) );

					coltally++;

				});

			});

	}

});

//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {
	$.mobile.table.prototype.enhanceWithin( e.target );
});

})( jQuery );


(function( $, undefined ) {

$.mobile.table.prototype.options.mode = "columntoggle";

$.mobile.table.prototype.options.columnBtnTheme = null;

$.mobile.table.prototype.options.columnPopupTheme = null;

$.mobile.table.prototype.options.columnBtnText = "Columns...";

$.mobile.table.prototype.options.classes = $.extend(
	$.mobile.table.prototype.options.classes,
	{
		popup: "ui-table-columntoggle-popup",
		columnBtn: "ui-table-columntoggle-btn",
		priorityPrefix: "ui-table-priority-",
		columnToggleTable: "ui-table-columntoggle"
	}
);

$.mobile.document.delegate( ":jqmData(role='table')", "tablecreate", function() {

	var $table = $( this ),
		self = $table.data( "mobile-table" ),
		o = self.options,
		ns = $.mobile.ns;

	if( o.mode !== "columntoggle" ){
		return;
	}

	self.element.addClass( o.classes.columnToggleTable );

	var id = ( $table.attr( "id" ) || o.classes.popup ) + "-popup", //TODO BETTER FALLBACK ID HERE
		$menuButton = $( "<a href='#" + id + "' class='" + o.classes.columnBtn + "' data-" + ns + "rel='popup' data-" + ns + "mini='true'>" + o.columnBtnText + "</a>" ),
		$popup = $( "<div data-" + ns + "role='popup' data-" + ns + "role='fieldcontain' class='" + o.classes.popup + "' id='" + id + "'></div>"),
		$menu = $("<fieldset data-" + ns + "role='controlgroup'></fieldset>");

	// create the hide/show toggles
	self.headers.not( "td" ).each(function(){

		var priority = $( this ).jqmData( "priority" ),
			$cells = $( this ).add( $( this ).jqmData( "cells" ) );

		if( priority ){

			$cells.addClass( o.classes.priorityPrefix + priority );

			$("<label><input type='checkbox' checked />" + $( this ).text() + "</label>" )
				.appendTo( $menu )
				.children( 0 )
				.jqmData( "cells", $cells )
				.checkboxradio({
					theme: o.columnPopupTheme
				});
		}
	});
		$menu.appendTo( $popup );

	// bind change event listeners to inputs - TODO: move to a private method?
	$menu.on( "change", "input", function( e ){
		if( this.checked ){
			$( this ).jqmData( "cells" ).removeClass( "ui-table-cell-hidden" ).addClass( "ui-table-cell-visible" );
		}
		else {
			$( this ).jqmData( "cells" ).removeClass( "ui-table-cell-visible" ).addClass( "ui-table-cell-hidden" );
		}
	});

	$menuButton
		.insertBefore( $table )
		.buttonMarkup({
			theme: o.columnBtnTheme
		});

	$popup
		.insertBefore( $table )
		.popup();

	// refresh method
	self.refresh = function(){
		$menu.find( "input" ).each( function(){
			this.checked = $( this ).jqmData( "cells" ).eq(0).css( "display" ) === "table-cell";
			$( this ).checkboxradio( "refresh" );
		});
	};

	$.mobile.window.on( "throttledresize", self.refresh );

	self.refresh();

});

})( jQuery );

(function( $, undefined ) {

$.mobile.table.prototype.options.mode = "reflow";

$.mobile.table.prototype.options.classes = $.extend(
	$.mobile.table.prototype.options.classes,
	{
		reflowTable: "ui-table-reflow",
		cellLabels: "ui-table-cell-label"
	}
);

$.mobile.document.delegate( ":jqmData(role='table')", "tablecreate", function() {

	var $table = $( this ),
		self = $table.data( "mobile-table" ),
		o = self.options;

	// If it's not reflow mode, return here.
	if( o.mode !== "reflow" ){
		return;
	}

	self.element.addClass( o.classes.reflowTable );

	// get headers in reverse order so that top-level headers are appended last
	var reverseHeaders =  $( self.allHeaders.get().reverse() );

	// create the hide/show toggles
	reverseHeaders.each(function(i){
		var $cells = $( this ).jqmData( "cells" ),
			colstart = $( this ).jqmData( "colstart" ),
			hierarchyClass = $cells.not( this ).filter( "thead th" ).length && " ui-table-cell-label-top",
			text = $(this).text();

			if( text !== ""  ){

				if( hierarchyClass ){
					var iteration = parseInt( $( this ).attr( "colspan" ), 10 ),
						filter = "";

					if( iteration ){
						filter = "td:nth-child("+ iteration +"n + " + ( colstart ) +")";
					}
					$cells.filter( filter ).prepend( "<b class='" + o.classes.cellLabels + hierarchyClass + "'>" + text + "</b>"  );
				}
				else {
					$cells.prepend( "<b class='" + o.classes.cellLabels + "'>" + text + "</b>"  );
				}

			}
	});

});

})( jQuery );

(function( $ ) {
	var	meta = $( "meta[name=viewport]" ),
		initialContent = meta.attr( "content" ),
		disabledZoom = initialContent + ",maximum-scale=1, user-scalable=no",
		enabledZoom = initialContent + ",maximum-scale=10, user-scalable=yes",
		disabledInitially = /(user-scalable[\s]*=[\s]*no)|(maximum-scale[\s]*=[\s]*1)[$,\s]/.test( initialContent );

	$.mobile.zoom = $.extend( {}, {
		enabled: !disabledInitially,
		locked: false,
		disable: function( lock ) {
			if ( !disabledInitially && !$.mobile.zoom.locked ) {
				meta.attr( "content", disabledZoom );
				$.mobile.zoom.enabled = false;
				$.mobile.zoom.locked = lock || false;
			}
		},
		enable: function( unlock ) {
			if ( !disabledInitially && ( !$.mobile.zoom.locked || unlock === true ) ) {
				meta.attr( "content", enabledZoom );
				$.mobile.zoom.enabled = true;
				$.mobile.zoom.locked = false;
			}
		},
		restore: function() {
			if ( !disabledInitially ) {
				meta.attr( "content", initialContent );
				$.mobile.zoom.enabled = true;
			}
		}
	});

}( jQuery ));

(function( $, undefined ) {

$.widget( "mobile.textinput", $.mobile.widget, {
	options: {
		theme: null,
		mini: false,
		// This option defaults to true on iOS devices.
		preventFocusZoom: /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1,
		initSelector: "input[type='text'], input[type='search'], :jqmData(type='search'), input[type='number'], :jqmData(type='number'), input[type='password'], input[type='email'], input[type='url'], input[type='tel'], textarea, input[type='time'], input[type='date'], input[type='month'], input[type='week'], input[type='datetime'], input[type='datetime-local'], input[type='color'], input:not([type]), input[type='file']",
		clearBtn: false,
		clearSearchButtonText: null, //deprecating for 1.3...
		clearBtnText: "clear text",
		disabled: false
	},

	_create: function() {

		var self = this,
			input = this.element,
			o = this.options,
			theme = o.theme || $.mobile.getInheritedTheme( this.element, "c" ),
			themeclass  = " ui-body-" + theme,
			miniclass = o.mini ? " ui-mini" : "",
			isSearch = input.is( "[type='search'], :jqmData(type='search')" ),
			focusedEl,
			clearbtn,
			clearBtnText = o.clearSearchButtonText || o.clearBtnText,
			clearBtnBlacklist = input.is( "textarea, :jqmData(type='range')" ),
			inputNeedsClearBtn = !!o.clearBtn && !clearBtnBlacklist,
			inputNeedsWrap = input.is( "input" ) && !input.is( ":jqmData(type='range')" );

		function toggleClear() {
			setTimeout( function() {
				clearbtn.toggleClass( "ui-input-clear-hidden", !input.val() );
			}, 0 );
		}

		$( "label[for='" + input.attr( "id" ) + "']" ).addClass( "ui-input-text" );

		focusedEl = input.addClass( "ui-input-text ui-body-"+ theme );

		// XXX: Temporary workaround for issue 785 (Apple bug 8910589).
		//      Turn off autocorrect and autocomplete on non-iOS 5 devices
		//      since the popup they use can't be dismissed by the user. Note
		//      that we test for the presence of the feature by looking for
		//      the autocorrect property on the input element. We currently
		//      have no test for iOS 5 or newer so we're temporarily using
		//      the touchOverflow support flag for jQM 1.0. Yes, I feel dirty. - jblas
		if ( typeof input[0].autocorrect !== "undefined" && !$.support.touchOverflow ) {
			// Set the attribute instead of the property just in case there
			// is code that attempts to make modifications via HTML.
			input[0].setAttribute( "autocorrect", "off" );
			input[0].setAttribute( "autocomplete", "off" );
		}

		//"search" and "text" input widgets
		if ( isSearch ) {
			focusedEl = input.wrap( "<div class='ui-input-search ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-icon-searchfield" + themeclass + miniclass + "'></div>" ).parent();
		} else if ( inputNeedsWrap ) {
			focusedEl = input.wrap( "<div class='ui-input-text ui-shadow-inset ui-corner-all ui-btn-shadow" + themeclass + miniclass + "'></div>" ).parent();
		}

		if( inputNeedsClearBtn || isSearch ) {
			clearbtn = $( "<a href='#' class='ui-input-clear' title='" + clearBtnText + "'>" + clearBtnText + "</a>" )
				.bind( "click", function( event ) {
					input
						.val( "" )
						.focus()
						.trigger( "change" );
					clearbtn.addClass( "ui-input-clear-hidden" );
					event.preventDefault();
				})
				.appendTo( focusedEl )
				.buttonMarkup({
					icon: "delete",
					iconpos: "notext",
					corners: true,
					shadow: true,
					mini: o.mini
				});
				
			if ( !isSearch ) {
				focusedEl.addClass( "ui-input-has-clear" );
			}

			toggleClear();

			input.bind( "paste cut keyup input focus change blur", toggleClear );
		}
		else if ( !inputNeedsWrap && !isSearch ) {
			input.addClass( "ui-corner-all ui-shadow-inset" + themeclass + miniclass );
		}

		input.focus(function() {
				// In many situations, iOS will zoom into the input upon tap, this prevents that from happening
				if ( o.preventFocusZoom ) {
					$.mobile.zoom.disable( true );
				}			
				focusedEl.addClass( $.mobile.focusClass );
			})
			.blur(function() {
				focusedEl.removeClass( $.mobile.focusClass );
				if ( o.preventFocusZoom ) {
					$.mobile.zoom.enable( true );
				}				
			})

		// Autogrow
        // Code entfernt

		if ( input.attr( "disabled" ) ) {
			this.disable();
		}
	},

	disable: function() {
		var $el,
			isSearch = this.element.is( "[type='search'], :jqmData(type='search')" ),
			inputNeedsWrap = this.element.is( "input" ) && !this.element.is( ":jqmData(type='range')" ),
			parentNeedsDisabled = this.element.attr( "disabled", true )	&& ( inputNeedsWrap || isSearch );
			
		if ( parentNeedsDisabled ) {
			$el = this.element.parent();
		} else {
			$el = this.element;
		}
		$el.addClass( "ui-disabled" );
		return this._setOption( "disabled", true );
	},

	enable: function() {
		var $el,
			isSearch = this.element.is( "[type='search'], :jqmData(type='search')" ),
			inputNeedsWrap = this.element.is( "input" ) && !this.element.is( ":jqmData(type='range')" ),
			parentNeedsEnabled = this.element.attr( "disabled", false )	&& ( inputNeedsWrap || isSearch );

		if ( parentNeedsEnabled ) {
			$el = this.element.parent();
		} else {
			$el = this.element;
		}
		$el.removeClass( "ui-disabled" );
		return this._setOption( "disabled", false );
	}
});

//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {
	$.mobile.textinput.prototype.enhanceWithin( e.target, true );
});

})( jQuery );

(function( $, undefined ) {

$.mobile.listview.prototype.options.filter = false;
$.mobile.listview.prototype.options.filterPlaceholder = "Filter items...";
$.mobile.listview.prototype.options.filterTheme = "c";
$.mobile.listview.prototype.options.filterReveal = false;
// TODO rename callback/deprecate and default to the item itself as the first argument
var defaultFilterCallback = function( text, searchValue, item ) {
		return text.toString().toLowerCase().indexOf( searchValue ) === -1;
	};

$.mobile.listview.prototype.options.filterCallback = defaultFilterCallback;

$.mobile.document.delegate( "ul, ol", "listviewcreate", function() {

	var list = $( this ),
		listview = list.data( "mobile-listview" );

	if ( !listview.options.filter ) {
		return;
	}

	if ( listview.options.filterReveal ) {
		list.children().addClass( "ui-screen-hidden" );
	}

	var wrapper = $( "<form>", {
			"class": "ui-listview-filter ui-bar-" + listview.options.filterTheme,
			"role": "search"
		}).submit( function( e ) {
			e.preventDefault();
			search.blur();
		}),
		onKeyUp = function( e ) {
			var $this = $( this ),
				val = this.value.toLowerCase(),
				listItems = null,
				li = list.children(),
				lastval = $this.jqmData( "lastval" ) + "",
				childItems = false,
				itemtext = "",
				item,
				// Check if a custom filter callback applies
				isCustomFilterCallback = listview.options.filterCallback !== defaultFilterCallback;

			if ( lastval && lastval === val ) {
				// Execute the handler only once per value change
				return;
			}

			listview._trigger( "beforefilter", "beforefilter", { input: this } );

			// Change val as lastval for next execution
			$this.jqmData( "lastval" , val );
			if ( isCustomFilterCallback || val.length < lastval.length || val.indexOf( lastval ) !== 0 ) {

				// Custom filter callback applies or removed chars or pasted something totally different, check all items
				listItems = list.children();
			} else {

				// Only chars added, not removed, only use visible subset
				listItems = list.children( ":not(.ui-screen-hidden)" );

				if ( !listItems.length && listview.options.filterReveal ) {
					listItems = list.children( ".ui-screen-hidden" );
				}
			}

			if ( val ) {

				// This handles hiding regular rows without the text we search for
				// and any list dividers without regular rows shown under it

				for ( var i = listItems.length - 1; i >= 0; i-- ) {
					item = $( listItems[ i ] );
					itemtext = item.jqmData( "filtertext" ) || item.text();

					if ( item.is( "li:jqmData(role=list-divider)" ) ) {

						item.toggleClass( "ui-filter-hidequeue" , !childItems );

						// New bucket!
						childItems = false;

					} else if ( listview.options.filterCallback( itemtext, val, item ) ) {

						//mark to be hidden
						item.toggleClass( "ui-filter-hidequeue" , true );
					} else {

						// There's a shown item in the bucket
						childItems = true;
					}
				}

				// Show items, not marked to be hidden
				listItems
					.filter( ":not(.ui-filter-hidequeue)" )
					.toggleClass( "ui-screen-hidden", false );

				// Hide items, marked to be hidden
				listItems
					.filter( ".ui-filter-hidequeue" )
					.toggleClass( "ui-screen-hidden", true )
					.toggleClass( "ui-filter-hidequeue", false );

			} else {

				//filtervalue is empty => show all
				listItems.toggleClass( "ui-screen-hidden", !!listview.options.filterReveal );
			}
			listview._addFirstLastClasses( li, listview._getVisibles( li, false ), false );
		},
		search = $( "<input>", {
			placeholder: listview.options.filterPlaceholder
		})
		.attr( "data-" + $.mobile.ns + "type", "search" )
		.jqmData( "lastval", "" )
		.bind( "keyup change input", onKeyUp )
		.appendTo( wrapper )
		.textinput();

	if ( listview.options.inset ) {
		wrapper.addClass( "ui-listview-filter-inset" );
	}

	wrapper.bind( "submit", function() {
		return false;
	})
	.insertBefore( list );
});

})( jQuery );

(function( $, undefined ) {

$.widget( "mobile.slider", $.mobile.widget, {
	widgetEventPrefix: "slide",

	options: {
		theme: null,
		trackTheme: null,
		disabled: false,
		initSelector: "input[type='range'], :jqmData(type='range'), :jqmData(role='slider')",
		mini: false,
		highlight: false
	},

	_create: function() {

		// TODO: Each of these should have comments explain what they're for
		var self = this,
			control = this.element,
			parentTheme = $.mobile.getInheritedTheme( control, "c" ),
			theme = this.options.theme || parentTheme,
			trackTheme = this.options.trackTheme || parentTheme,
			cType = control[ 0 ].nodeName.toLowerCase(),
			isSelect = this.isToggleSwitch = cType === "select",
			isRangeslider = control.parent().is( ":jqmData(role='rangeslider')" ),
			selectClass = ( this.isToggleSwitch ) ? "ui-slider-switch" : "",
			controlID = control.attr( "id" ),
			$label = $( "[for='" + controlID + "']" ),
			labelID = $label.attr( "id" ) || controlID + "-label",
			label = $label.attr( "id", labelID ),
			min = !this.isToggleSwitch ? parseFloat( control.attr( "min" ) ) : 0,
			max =  !this.isToggleSwitch ? parseFloat( control.attr( "max" ) ) : control.find( "option" ).length-1,
			step = window.parseFloat( control.attr( "step" ) || 1 ),
			miniClass = ( this.options.mini || control.jqmData( "mini" ) ) ? " ui-mini" : "",
			domHandle = document.createElement( "a" ),
			handle = $( domHandle ),
			domSlider = document.createElement( "div" ),
			slider = $( domSlider ),
			valuebg = this.options.highlight && !this.isToggleSwitch ? (function() {
				var bg = document.createElement( "div" );
				bg.className = "ui-slider-bg " + $.mobile.activeBtnClass + " ui-btn-corner-all";
				return $( bg ).prependTo( slider );
			})() : false,
			options;
			
		domHandle.setAttribute( "href", "#" );
		domSlider.setAttribute( "role", "application" );
		domSlider.className = [this.isToggleSwitch ? "ui-slider " : "ui-slider-track ",selectClass," ui-btn-down-",trackTheme," ui-btn-corner-all", miniClass].join( "" );
		domHandle.className = "ui-slider-handle";
		domSlider.appendChild( domHandle );

		handle.buttonMarkup({ corners: true, theme: theme, shadow: true })
				.attr({
					"role": "slider",
					"aria-valuemin": min,
					"aria-valuemax": max,
					"aria-valuenow": this._value(),
					"aria-valuetext": this._value(),
					"title": this._value(),
					"aria-labelledby": labelID
				});

		$.extend( this, {
			slider: slider,
			handle: handle,
			type: cType,
			step: step,
			max: max,
			min: min,
			valuebg: valuebg,
			isRangeslider: isRangeslider,
			dragging: false,
			beforeStart: null,
			userModified: false,
			mouseMoved: false
		});

		if ( this.isToggleSwitch ) {
			var wrapper = document.createElement( "div" );
			wrapper.className = "ui-slider-inneroffset";

			for ( var j = 0, length = domSlider.childNodes.length; j < length; j++ ) {
				wrapper.appendChild( domSlider.childNodes[j] );
			}

			domSlider.appendChild( wrapper );

			// slider.wrapInner( "<div class='ui-slider-inneroffset'></div>" );

			// make the handle move with a smooth transition
			handle.addClass( "ui-slider-handle-snapping" );

			options = control.find( "option" );

			for ( var i = 0, optionsCount = options.length; i < optionsCount; i++ ) {
				var side = !i ? "b" : "a",
					sliderTheme = !i ? " ui-btn-down-" + trackTheme : ( " " + $.mobile.activeBtnClass ),
					sliderLabel = document.createElement( "div" ),
					sliderImg = document.createElement( "span" );

				sliderImg.className = ["ui-slider-label ui-slider-label-", side, sliderTheme, " ui-btn-corner-all"].join( "" );
				sliderImg.setAttribute( "role", "img" );
				sliderImg.appendChild( document.createTextNode( options[i].innerHTML ) );
				$( sliderImg ).prependTo( slider );
			}

			self._labels = $( ".ui-slider-label", slider );

		}

		label.addClass( "ui-slider" );
		
		// monitor the input for updated values
		control.addClass( this.isToggleSwitch ? "ui-slider-switch" : "ui-slider-input" );

		this._on( control, {
			"change": "_controlChange",
			"keyup": "_controlKeyup",
			"blur": "_controlBlur",
			"vmouseup": "_controlVMouseUp"
		});

		slider.bind( "vmousedown", $.proxy( this._sliderVMouseDown, this ) )
			.bind( "vclick", false );

		// We have to instantiate a new function object for the unbind to work properly
		// since the method itself is defined in the prototype (causing it to unbind everything)
		this._on( document, { "vmousemove": "_preventDocumentDrag" });
		this._on( slider.add( document ), { "vmouseup": "_sliderVMouseUp" });

		slider.insertAfter( control );

		// wrap in a div for styling purposes
		if ( !this.isToggleSwitch && !isRangeslider ) {
			var wrapper = this.options.mini ? "<div class='ui-slider ui-mini'>" : "<div class='ui-slider'>";
			
			control.add( slider ).wrapAll( wrapper );
		}

		// Only add focus class to toggle switch, sliders get it automatically from ui-btn
		if ( this.isToggleSwitch ) {
			this.handle.bind({
				focus: function() {
					slider.addClass( $.mobile.focusClass );
				},

				blur: function() {
					slider.removeClass( $.mobile.focusClass );
				}
			});
		}

		// bind the handle event callbacks and set the context to the widget instance
		this._on( this.handle, {
			"vmousedown": "_handleVMouseDown",
			"keydown": "_handleKeydown",
			"keyup": "_handleKeyup"
		});

		this.handle.bind( "vclick", false );

		if ( this._handleFormReset ) {
			this._handleFormReset();
		}

		this.refresh( undefined, undefined, true );
	},

	_controlChange: function( event ) {
		// if the user dragged the handle, the "change" event was triggered from inside refresh(); don't call refresh() again
		if ( this._trigger( "controlchange", event ) === false ) {
			return false;
		}
		if ( !this.mouseMoved ) {
			this.refresh( this._value(), true );
		}
	},

	_controlKeyup: function( event ) { // necessary?
		this.refresh( this._value(), true, true );
	},

	_controlBlur: function( event ) {
		this.refresh( this._value(), true );
	},

	// it appears the clicking the up and down buttons in chrome on
	// range/number inputs doesn't trigger a change until the field is
	// blurred. Here we check thif the value has changed and refresh
	_controlVMouseUp: function( event ) {
		this._checkedRefresh();
	},

	// NOTE force focus on handle
	_handleVMouseDown: function( event ) {
		this.handle.focus();
	},

	_handleKeydown: function( event ) {
		var index = this._value();
		if ( this.options.disabled ) {
			return;
		}

		// In all cases prevent the default and mark the handle as active
		switch ( event.keyCode ) {
		 case $.mobile.keyCode.HOME:
		 case $.mobile.keyCode.END:
		 case $.mobile.keyCode.PAGE_UP:
		 case $.mobile.keyCode.PAGE_DOWN:
		 case $.mobile.keyCode.UP:
		 case $.mobile.keyCode.RIGHT:
		 case $.mobile.keyCode.DOWN:
		 case $.mobile.keyCode.LEFT:
			event.preventDefault();

			if ( !this._keySliding ) {
				this._keySliding = true;
				this.handle.addClass( "ui-state-active" );
			}

			break;
		}

		// move the slider according to the keypress
		switch ( event.keyCode ) {
		 case $.mobile.keyCode.HOME:
			this.refresh( this.min );
			break;
		 case $.mobile.keyCode.END:
			this.refresh( this.max );
			break;
		 case $.mobile.keyCode.PAGE_UP:
		 case $.mobile.keyCode.UP:
		 case $.mobile.keyCode.RIGHT:
			this.refresh( index + this.step );
			break;
		 case $.mobile.keyCode.PAGE_DOWN:
		 case $.mobile.keyCode.DOWN:
		 case $.mobile.keyCode.LEFT:
			this.refresh( index - this.step );
			break;
		}
	}, // remove active mark

	_handleKeyup: function( event ) {
		if ( this._keySliding ) {
			this._keySliding = false;
			this.handle.removeClass( "ui-state-active" );
		}
	},

	_sliderVMouseDown: function( event ) {
		// NOTE: we don't do this in refresh because we still want to
		//       support programmatic alteration of disabled inputs
		if ( this.options.disabled ) {
			return false;
		}
		if ( this._trigger( "beforestart", event ) === false ) {
			return false;
		}
		this.dragging = true;
		this.userModified = false;
		this.mouseMoved = false;

		if ( this.isToggleSwitch ) {
			this.beforeStart = this.element[0].selectedIndex;
		}

		
		this.refresh( event );
 		this._trigger( "start" );
		return false;
	},

	_sliderVMouseUp: function() {
		if ( this.dragging ) {
			this.dragging = false;

			if ( this.isToggleSwitch ) {
				// make the handle move with a smooth transition
				this.handle.addClass( "ui-slider-handle-snapping" );

				if ( this.mouseMoved ) {
					// this is a drag, change the value only if user dragged enough
					if ( this.userModified ) {
						this.refresh( this.beforeStart === 0 ? 1 : 0 );
					} else {
						this.refresh( this.beforeStart );
					}
				} else {
					// this is just a click, change the value
					this.refresh( this.beforeStart === 0 ? 1 : 0 );
				}
			}

			this.mouseMoved = false;
			this._trigger( "stop" );
			return false;
		}
	},

	_preventDocumentDrag: function( event ) {
			// NOTE: we don't do this in refresh because we still want to
			//       support programmatic alteration of disabled inputs
			if ( this._trigger( "drag", event ) === false) {
				return false;
			}
			if ( this.dragging && !this.options.disabled ) {
				
				// this.mouseMoved must be updated before refresh() because it will be used in the control "change" event
				this.mouseMoved = true;

				if ( this.isToggleSwitch ) {
					// make the handle move in sync with the mouse
					this.handle.removeClass( "ui-slider-handle-snapping" );
				}
				
				this.refresh( event );

				// only after refresh() you can calculate this.userModified
				this.userModified = this.beforeStart !== this.element[0].selectedIndex;
				return false;
			}
		},

	_checkedRefresh: function() {
		if ( this.value != this._value() ) {
			this.refresh( this._value() );
		}
	},

	_value: function() {
		return  this.isToggleSwitch ? this.element[0].selectedIndex : parseFloat( this.element.val() ) ;
	},


	_reset: function() {
		this.refresh( undefined, false, true );
	},

	refresh: function( val, isfromControl, preventInputUpdate ) {
		// NOTE: we don't return here because we want to support programmatic
		//       alteration of the input value, which should still update the slider
		
		var self = this,
			parentTheme = $.mobile.getInheritedTheme( this.element, "c" ),
			theme = this.options.theme || parentTheme,
			trackTheme = this.options.trackTheme || parentTheme;

		self.slider[0].className = [ this.isToggleSwitch ? "ui-slider ui-slider-switch" : "ui-slider-track"," ui-btn-down-" + trackTheme,' ui-btn-corner-all', ( this.options.mini ) ? " ui-mini":""].join( "" );
		if ( this.options.disabled || this.element.attr( "disabled" ) ) {
			this.disable();
		}

		// set the stored value for comparison later
		this.value = this._value();
		if ( this.options.highlight && !this.isToggleSwitch && this.slider.find( ".ui-slider-bg" ).length === 0 ) {
			this.valuebg = (function() {
				var bg = document.createElement( "div" );
				bg.className = "ui-slider-bg " + $.mobile.activeBtnClass + " ui-btn-corner-all";
				return $( bg ).prependTo( self.slider );
			})();
		}
		this.handle.buttonMarkup({ corners: true, theme: theme, shadow: true });

		var pxStep, percent,
			control = this.element,
			isInput = !this.isToggleSwitch,
			optionElements = isInput ? [] : control.find( "option" ),
			min =  isInput ? parseFloat( control.attr( "min" ) ) : 0,
			max = isInput ? parseFloat( control.attr( "max" ) ) : optionElements.length - 1,
			step = ( isInput && parseFloat( control.attr( "step" ) ) > 0 ) ? parseFloat( control.attr( "step" ) ) : 1;
			
		if ( typeof val === "object" ) {
			var left, width, data = val,
				// a slight tolerance helped get to the ends of the slider
				tol = 8;

			left = this.slider.offset().left;
			width = this.slider.width();
			pxStep = width/((max-min)/step);
			if ( !this.dragging ||
					data.pageX < left - tol ||
					data.pageX > left + width + tol ) {
				return;
			}
			if ( pxStep > 1 ) {
				percent = ( ( data.pageX - left ) / width ) * 100;
			} else {
				percent = Math.round( ( ( data.pageX - left ) / width ) * 100 );
			}
		} else {
			if ( val == null ) {
				val = isInput ? parseFloat( control.val() || 0 ) : control[0].selectedIndex;
			}
			percent = ( parseFloat( val ) - min ) / ( max - min ) * 100;
		}

		if ( isNaN( percent ) ) {
			return;
		}

		var newval = ( percent / 100 ) * ( max - min ) + min;

		//from jQuery UI slider, the following source will round to the nearest step
		var valModStep = ( newval - min ) % step;
		var alignValue = newval - valModStep;

		if ( Math.abs( valModStep ) * 2 >= step ) {
			alignValue += ( valModStep > 0 ) ? step : ( -step );
		}

		var percentPerStep = 100/((max-min)/step);
		// Since JavaScript has problems with large floats, round
		// the final value to 5 digits after the decimal point (see jQueryUI: #4124)
		newval = parseFloat( alignValue.toFixed(5) );

		if ( typeof pxStep === "undefined" ) {
			pxStep = width / ( (max-min) / step );
		}
		if ( pxStep > 1 && isInput ) {
			percent = ( newval - min ) * percentPerStep * ( 1 / step );
		}
		if ( percent < 0 ) {
			percent = 0;
		}

		if ( percent > 100 ) {
			percent = 100;
		}

		if ( newval < min ) {
			newval = min;
		}

		if ( newval > max ) {
			newval = max;
		}

		this.handle.css( "left", percent + "%" );

		this.handle[0].setAttribute( "aria-valuenow", isInput ? newval : optionElements.eq( newval ).attr( "value" ) );

		this.handle[0].setAttribute( "aria-valuetext", isInput ? newval : optionElements.eq( newval ).getEncodedText() );

		this.handle[0].setAttribute( "title", isInput ? newval : optionElements.eq( newval ).getEncodedText() );

		if ( this.valuebg ) {
			this.valuebg.css( "width", percent + "%" );
		}

		// drag the label widths
		if ( this._labels ) {
			var handlePercent = this.handle.width() / this.slider.width() * 100,
				aPercent = percent && handlePercent + ( 100 - handlePercent ) * percent / 100,
				bPercent = percent === 100 ? 0 : Math.min( handlePercent + 100 - aPercent, 100 );

			this._labels.each(function() {
				var ab = $( this ).is( ".ui-slider-label-a" );
				$( this ).width( ( ab ? aPercent : bPercent  ) + "%" );
			});
		}

		if ( !preventInputUpdate ) {
			var valueChanged = false;

			// update control"s value
			if ( isInput ) {
				valueChanged = control.val() !== newval;
				control.val( newval );
			} else {
				valueChanged = control[ 0 ].selectedIndex !== newval;
				control[ 0 ].selectedIndex = newval;
			}
			if ( this._trigger( "beforechange", val ) === false) {
					return false;
			}
			if ( !isfromControl && valueChanged ) {
				control.trigger( "change" );
			}
		}
	},

	enable: function() {
		this.element.attr( "disabled", false );
		this.slider.removeClass( "ui-disabled" ).attr( "aria-disabled", false );
		return this._setOption( "disabled", false );
	},

	disable: function() {
		this.element.attr( "disabled", true );
		this.slider.addClass( "ui-disabled" ).attr( "aria-disabled", true );
		return this._setOption( "disabled", true );
	}

});

$.widget( "mobile.slider", $.mobile.slider, $.mobile.behaviors.formReset );

//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {
	$.mobile.slider.prototype.enhanceWithin( e.target, true );
});

})( jQuery );

(function( $, undefined ) {
	$.widget( "mobile.rangeslider", $.mobile.widget, {

		options: {
			theme: null,
			trackTheme: null,
			disabled: false,
			initSelector: ":jqmData(role='rangeslider')",
			mini: false,
			highlight: true
		},

		_create: function() {
			var secondLabel,
			$el = this.element,
			elClass = this.options.mini ? "ui-rangeslider ui-mini" : "ui-rangeslider",
			_inputFirst = $el.find( "input" ).first(),
			_inputLast = $el.find( "input" ).last(),
			label = $el.find( "label" ).first(),
			_sliderFirst = $.data( _inputFirst.get(0), "mobileSlider" ).slider,
			_sliderLast = $.data( _inputLast.get(0), "mobileSlider" ).slider,
			firstHandle = $.data( _inputFirst.get(0), "mobileSlider" ).handle,
			_sliders = $( "<div class=\"ui-rangeslider-sliders\" />" ).appendTo( $el );
			
			if ( $el.find( "label" ).length > 1 ) {
				secondLabel = $el.find( "label" ).last().hide();
			}

			_inputFirst.addClass( "ui-rangeslider-first" );
			_inputLast.addClass( "ui-rangeslider-last" );
			$el.addClass( elClass );
			
			_sliderFirst.appendTo( _sliders );
			_sliderLast.appendTo( _sliders );
			label.prependTo( $el );
			firstHandle.prependTo( _sliderLast );

			$.extend( this, {
				_inputFirst: _inputFirst,
				_inputLast: _inputLast,
				_sliderFirst: _sliderFirst,
				_sliderLast: _sliderLast,
				_targetVal: null,
				_sliderTarget: false,
				_sliders: _sliders,
				_proxy: false
			});
			
			this.refresh();
			this._on( this.element.find( "input.ui-slider-input" ), {
				"slidebeforestart": "_slidebeforestart",
				"slidestop": "_slidestop",
				"slidedrag": "_slidedrag",
				"slidebeforechange": "_change",
				"blur": "_change",
				"keyup": "_change"
			});
			this._on( firstHandle, {
				"vmousedown": "_dragFirstHandle"
			});
		},

		_dragFirstHandle: function( event ) {
			//if the first handle is dragged send the event to the first slider
			$.data( this._inputFirst.get(0), "mobileSlider" ).dragging = true;
			$.data( this._inputFirst.get(0), "mobileSlider" ).refresh( event );
			return false;
		},

		_slidedrag: function( event ) {
			var first = $( event.target ).is( this._inputFirst ),
				otherSlider = ( first ) ? this._inputLast : this._inputFirst;

			this._sliderTarget = false;
			//if the drag was initaed on an extream and the other handle is focused send the events to
			//the closest handle
			if ( ( this._proxy === "first" && first ) || ( this._proxy === "last" && !first ) ) {
				$.data( otherSlider.get(0), "mobileSlider" ).dragging = true;
				$.data( otherSlider.get(0), "mobileSlider" ).refresh( event );
				return false;
			}
		},

		_slidestop: function( event ) {
			var first = $( event.target ).is( this._inputFirst );
			
			this._proxy = false;
			//this stops dragging of the handle and brings the active track to the front 
			//this makes clicks on the track go the the last handle used
			this.element.find( "input" ).trigger( "vmouseup" );
			this._sliderFirst.css( "z-index", first ? 1 : "" );
		},

		_slidebeforestart: function( event ) {
			this._sliderTarget = false;
			//if the track is the target remember this and the original value
			if ( $( event.originalEvent.target ).hasClass( "ui-slider-track" ) ) {
				this._sliderTarget = true;
				this._targetVal = $( event.target ).val();
			}
		},

		_setOption: function( options ) {
			this._superApply( options );
			this.refresh();
		},

		refresh: function() {
			var $el = this.element,
				o = this.options;

			$el.find( "input" ).slider({
				theme: o.theme,
				trackTheme: o.trackTheme,
				disabled: o.disabled,
				mini: o.mini,
				highlight: o.highlight
			}).slider( "refresh" );
			this._updateHighlight();
		},

		_change: function( event ) {
			if ( event.type == "keyup" ) {
				this._updateHighlight();
				return false;
			}

			var min = parseFloat( this._inputFirst.val(), 10 ),
				max = parseFloat( this._inputLast.val(), 10 ),
				first = $( event.target ).hasClass( "ui-rangeslider-first" ),
				thisSlider = first ? this._inputFirst : this._inputLast,
				otherSlider = first ? this._inputLast : this._inputFirst;
				
			if ( min > max && !this._sliderTarget ) {
				//this prevents min from being greater then max
				thisSlider.val( first ? max: min ).slider( "refresh" );
				this._trigger( "normalize" );
			} else if ( min > max ) {
				//this makes it so clicks on the target on either extream go to the closest handle
				thisSlider.val( this._targetVal ).slider( "refresh" );
				
				var self = this;
				//You must wait for the stack to unwind so first slider is updated before updating second
				setTimeout( function() {
					otherSlider.val( first ? min: max ).slider( "refresh" );
					$.data( otherSlider.get(0), "mobileSlider" ).handle.focus();
					self._sliderFirst.css( "z-index", first ? "" : 1 );
					self._trigger( "normalize" );
				}, 0 );
				this._proxy = ( first ) ? "first" : "last";
			}
			//fixes issue where when both _sliders are at min they cannot be adjusted
			if ( min === max ) {
				$.data( thisSlider.get(0), "mobileSlider" ).handle.css( "z-index", 1 );
				$.data( otherSlider.get(0), "mobileSlider" ).handle.css( "z-index", 0 );
			} else {
				$.data( otherSlider.get(0), "mobileSlider" ).handle.css( "z-index", "" );
				$.data( thisSlider.get(0), "mobileSlider" ).handle.css( "z-index", "" );
			}
			
			this._updateHighlight();
			
			if ( min >= max ) {
				return false;
			}
		},

		_updateHighlight: function() {
			var min = parseInt( $.data( this._inputFirst.get(0), "mobileSlider" ).handle.get(0).style.left, 10 ),
				max = parseInt( $.data( this._inputLast.get(0), "mobileSlider" ).handle.get(0).style.left, 10 ),
				width = (max - min);

			this.element.find( ".ui-slider-bg" ).css({
				"margin-left": min + "%",
				"width": width + "%"
			});
		},

		_destroy: function() {
			this.element.removeClass( "ui-rangeslider ui-mini" ).find( "label" ).show();
			this._inputFirst.after( this._sliderFirst );
			this._inputLast.after( this._sliderLast );
			this._sliders.remove();
			this.element.find( "input" ).removeClass( "ui-rangeslider-first ui-rangeslider-last" ).slider( "destroy" );
		}

	});

$.widget( "mobile.rangeslider", $.mobile.rangeslider, $.mobile.behaviors.formReset );

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ) {
	$.mobile.rangeslider.prototype.enhanceWithin( e.target, true );
});

})( jQuery );
(function( $, undefined ) {

$.widget( "mobile.selectmenu", $.mobile.widget, {
	options: {
		theme: null,
		disabled: false,
		icon: "arrow-d",
		iconpos: "right",
		inline: false,
		corners: true,
		shadow: true,
		iconshadow: true,
		overlayTheme: "a",
		dividerTheme: "b",
		hidePlaceholderMenuItems: true,
		closeText: "Close",
		nativeMenu: true,
		// This option defaults to true on iOS devices.
		preventFocusZoom: /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1,
		initSelector: "select:not( :jqmData(role='slider') )",
		mini: false
	},

	_button: function() {
		return $( "<div/>" );
	},

	_setDisabled: function( value ) {
		this.element.attr( "disabled", value );
		this.button.attr( "aria-disabled", value );
		return this._setOption( "disabled", value );
	},

	_focusButton : function() {
		var self = this;

		setTimeout( function() {
			self.button.focus();
		}, 40);
	},

	_selectOptions: function() {
		return this.select.find( "option" );
	},

	// setup items that are generally necessary for select menu extension
	_preExtension: function() {
		var classes = "";
		// TODO: Post 1.1--once we have time to test thoroughly--any classes manually applied to the original element should be carried over to the enhanced element, with an `-enhanced` suffix. See https://github.com/jquery/jquery-mobile/issues/3577
		/* if ( $el[0].className.length ) {
			classes = $el[0].className;
		} */
		if ( !!~this.element[0].className.indexOf( "ui-btn-left" ) ) {
			classes = " ui-btn-left";
		}

		if (  !!~this.element[0].className.indexOf( "ui-btn-right" ) ) {
			classes = " ui-btn-right";
		}

		this.select = this.element.removeClass( "ui-btn-left ui-btn-right" ).wrap( "<div class='ui-select" + classes + "'>" );
		this.selectID  = this.select.attr( "id" );
		this.label = $( "label[for='"+ this.selectID +"']" ).addClass( "ui-select" );
		this.isMultiple = this.select[ 0 ].multiple;
		if ( !this.options.theme ) {
			this.options.theme = $.mobile.getInheritedTheme( this.select, "c" );
		}
	},

	_destroy: function() {
		var wrapper = this.element.parents( ".ui-select" );
		if ( wrapper.length > 0 ) {
			if ( wrapper.is( ".ui-btn-left, .ui-btn-right" ) ) {
				this.element.addClass( wrapper.is( ".ui-btn-left" ) ? "ui-btn-left" : "ui-btn-right" );
			}
			this.element.insertAfter( wrapper );
			wrapper.remove();
		}
	},

	_create: function() {
		this._preExtension();

		// Allows for extension of the native select for custom selects and other plugins
		// see select.custom for example extension
		// TODO explore plugin registration
		this._trigger( "beforeCreate" );

		this.button = this._button();

		var self = this,

			options = this.options,

			inline = options.inline || this.select.jqmData( "inline" ),
			mini = options.mini || this.select.jqmData( "mini" ),
			iconpos = options.icon ? ( options.iconpos || this.select.jqmData( "iconpos" ) ) : false,

			// IE throws an exception at options.item() function when
			// there is no selected item
			// select first in this case
			selectedIndex = this.select[ 0 ].selectedIndex === -1 ? 0 : this.select[ 0 ].selectedIndex,

			// TODO values buttonId and menuId are undefined here
			button = this.button
				.insertBefore( this.select )
				.buttonMarkup( {
					theme: options.theme,
					icon: options.icon,
					iconpos: iconpos,
					inline: inline,
					corners: options.corners,
					shadow: options.shadow,
					iconshadow: options.iconshadow,
					mini: mini
				});

		this.setButtonText();

		// Opera does not properly support opacity on select elements
		// In Mini, it hides the element, but not its text
		// On the desktop,it seems to do the opposite
		// for these reasons, using the nativeMenu option results in a full native select in Opera
		if ( options.nativeMenu && window.opera && window.opera.version ) {
			button.addClass( "ui-select-nativeonly" );
		}

		// Add counter for multi selects
		if ( this.isMultiple ) {
			this.buttonCount = $( "<span>" )
				.addClass( "ui-li-count ui-btn-up-c ui-btn-corner-all" )
				.hide()
				.appendTo( button.addClass('ui-li-has-count') );
		}

		// Disable if specified
		if ( options.disabled || this.element.attr('disabled')) {
			this.disable();
		}

		// Events on native select
		this.select.change(function() {
			self.refresh();
		});

		if ( this._handleFormReset ) {
			this._handleFormReset();
		}
		this.build();
	},

	build: function() {
		var self = this;

		this.select
			.appendTo( self.button )
			.bind( "vmousedown", function() {
				// Add active class to button
				self.button.addClass( $.mobile.activeBtnClass );
			})
			.bind( "focus", function() {
				self.button.addClass( $.mobile.focusClass );
			})
			.bind( "blur", function() {
				self.button.removeClass( $.mobile.focusClass );
			})
			.bind( "focus vmouseover", function() {
				self.button.trigger( "vmouseover" );
			})
			.bind( "vmousemove", function() {
				// Remove active class on scroll/touchmove
				self.button.removeClass( $.mobile.activeBtnClass );
			})
			.bind( "change blur vmouseout", function() {
				self.button.trigger( "vmouseout" )
					.removeClass( $.mobile.activeBtnClass );
			})
			.bind( "change blur", function() {
				self.button.removeClass( "ui-btn-down-" + self.options.theme );
			});

		// In many situations, iOS will zoom into the select upon tap, this prevents that from happening
		self.button.bind( "vmousedown", function() {
			if ( self.options.preventFocusZoom ) {
					$.mobile.zoom.disable( true );
			}
		});
		self.label.bind( "click focus", function() {
			if ( self.options.preventFocusZoom ) {
					$.mobile.zoom.disable( true );
			}
		});
		self.select.bind( "focus", function() {
			if ( self.options.preventFocusZoom ) {
					$.mobile.zoom.disable( true );
			}
		});
		self.button.bind( "mouseup", function() {
			if ( self.options.preventFocusZoom ) {				
				setTimeout(function() {
					$.mobile.zoom.enable( true );
				}, 0 );
			}
		});
		self.select.bind( "blur", function() {
			if ( self.options.preventFocusZoom ) {				
				$.mobile.zoom.enable( true );
			}
		});

	},

	selected: function() {
		return this._selectOptions().filter( ":selected" );
	},

	selectedIndices: function() {
		var self = this;

		return this.selected().map(function() {
			return self._selectOptions().index( this );
		}).get();
	},

	setButtonText: function() {
		var self = this,
			selected = this.selected(),
			text = this.placeholder,
			span = $( document.createElement( "span" ) );

		this.button.find( ".ui-btn-text" ).html(function() {
			if ( selected.length ) {
				text = selected.map(function() {
					return $( this ).text();
				}).get().join( ", " );
			} else {
				text = self.placeholder;
			}

			// TODO possibly aggregate multiple select option classes
			return span.text( text )
				.addClass( self.select.attr( "class" ) )
				.addClass( selected.attr( "class" ) );
		});
	},

	setButtonCount: function() {
		var selected = this.selected();

		// multiple count inside button
		if ( this.isMultiple ) {
			this.buttonCount[ selected.length > 1 ? "show" : "hide" ]().text( selected.length );
		}
	},

	_reset: function() {
		this.refresh();
	},

	refresh: function() {
		this.setButtonText();
		this.setButtonCount();
	},

	// open and close preserved in native selects
	// to simplify users code when looping over selects
	open: $.noop,
	close: $.noop,

	disable: function() {
		this._setDisabled( true );
		this.button.addClass( "ui-disabled" );
	},

	enable: function() {
		this._setDisabled( false );
		this.button.removeClass( "ui-disabled" );
	}
});

$.widget( "mobile.selectmenu", $.mobile.selectmenu, $.mobile.behaviors.formReset );

//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {
	$.mobile.selectmenu.prototype.enhanceWithin( e.target, true );
});
})( jQuery );

/*
* custom "selectmenu" plugin
*/

(function( $, undefined ) {
	var extendSelect = function( widget ) {

		var select = widget.select,
			origDestroy = widget._destroy,
			selectID  = widget.selectID,
			prefix = ( selectID ? selectID : ( ( $.mobile.ns || "" ) + "uuid-" + widget.uuid ) ),
			popupID = prefix + "-listbox",
			dialogID = prefix + "-dialog",
			label = widget.label,
			thisPage = widget.select.closest( ".ui-page" ),
			selectOptions = widget._selectOptions(),
			isMultiple = widget.isMultiple = widget.select[ 0 ].multiple,
			buttonId = selectID + "-button",
			menuId = selectID + "-menu",
			menuPage = $( "<div data-" + $.mobile.ns + "role='dialog' id='" + dialogID + "' data-" +$.mobile.ns + "theme='"+ widget.options.theme +"' data-" +$.mobile.ns + "overlay-theme='"+ widget.options.overlayTheme +"'>" +
				"<div data-" + $.mobile.ns + "role='header'>" +
				"<div class='ui-title'>" + label.getEncodedText() + "</div>"+
				"</div>"+
				"<div data-" + $.mobile.ns + "role='content'></div>"+
				"</div>" ),

			listbox =  $( "<div id='" + popupID + "' class='ui-selectmenu'>" ).insertAfter( widget.select ).popup( { theme: widget.options.overlayTheme } ),

			list = $( "<ul>", {
				"class": "ui-selectmenu-list",
				"id": menuId,
				"role": "listbox",
				"aria-labelledby": buttonId
				}).attr( "data-" + $.mobile.ns + "theme", widget.options.theme )
					.attr( "data-" + $.mobile.ns + "divider-theme", widget.options.dividerTheme )
					.appendTo( listbox ),


			header = $( "<div>", {
				"class": "ui-header ui-bar-" + widget.options.theme
			}).prependTo( listbox ),

			headerTitle = $( "<h1>", {
				"class": "ui-title"
			}).appendTo( header ),

			menuPageContent,
			menuPageClose,
			headerClose;

		if ( widget.isMultiple ) {
			headerClose = $( "<a>", {
				"text": widget.options.closeText,
				"href": "#",
				"class": "ui-btn-left"
			}).attr( "data-" + $.mobile.ns + "iconpos", "notext" ).attr( "data-" + $.mobile.ns + "icon", "delete" ).appendTo( header ).buttonMarkup();
		}

		$.extend( widget, {
			select: widget.select,
			selectID: selectID,
			buttonId: buttonId,
			menuId: menuId,
			popupID: popupID,
			dialogID: dialogID,
			thisPage: thisPage,
			menuPage: menuPage,
			label: label,
			selectOptions: selectOptions,
			isMultiple: isMultiple,
			theme: widget.options.theme,
			listbox: listbox,
			list: list,
			header: header,
			headerTitle: headerTitle,
			headerClose: headerClose,
			menuPageContent: menuPageContent,
			menuPageClose: menuPageClose,
			placeholder: "",

			build: function() {
				var self = this;

				// Create list from select, update state
				self.refresh();

				if ( self._origTabIndex === undefined ) {
					// Map undefined to false, because self._origTabIndex === undefined
					// indicates that we have not yet checked whether the select has
					// originally had a tabindex attribute, whereas false indicates that
					// we have checked the select for such an attribute, and have found
					// none present.
					self._origTabIndex = ( self.select[ 0 ].getAttribute( "tabindex" ) === null ) ? false : self.select.attr( "tabindex" );
				}
				self.select.attr( "tabindex", "-1" ).focus(function() {
					$( this ).blur();
					self.button.focus();
				});

				// Button events
				self.button.bind( "vclick keydown" , function( event ) {
					if ( self.options.disabled || self.isOpen ) {
						return;
					}

					if (event.type === "vclick" ||
							event.keyCode && (event.keyCode === $.mobile.keyCode.ENTER ||
																event.keyCode === $.mobile.keyCode.SPACE)) {

						self._decideFormat();
						if ( self.menuType === "overlay" ) {
							self.button.attr( "href", "#" + self.popupID ).attr( "data-" + ( $.mobile.ns || "" ) + "rel", "popup" );
						} else {
							self.button.attr( "href", "#" + self.dialogID ).attr( "data-" + ( $.mobile.ns || "" ) + "rel", "dialog" );
						}
						self.isOpen = true;
						// Do not prevent default, so the navigation may have a chance to actually open the chosen format
					}
				});

				// Events for list items
				self.list.attr( "role", "listbox" )
					.bind( "focusin", function( e ) {
						$( e.target )
							.attr( "tabindex", "0" )
							.trigger( "vmouseover" );

					})
					.bind( "focusout", function( e ) {
						$( e.target )
							.attr( "tabindex", "-1" )
							.trigger( "vmouseout" );
					})
					.delegate( "li:not(.ui-disabled, .ui-li-divider)", "click", function( event ) {

						// index of option tag to be selected
						var oldIndex = self.select[ 0 ].selectedIndex,
							newIndex = self.list.find( "li:not(.ui-li-divider)" ).index( this ),
							option = self._selectOptions().eq( newIndex )[ 0 ];

						// toggle selected status on the tag for multi selects
						option.selected = self.isMultiple ? !option.selected : true;

						// toggle checkbox class for multiple selects
						if ( self.isMultiple ) {
							$( this ).find( ".ui-icon" )
								.toggleClass( "ui-icon-checkbox-on", option.selected )
								.toggleClass( "ui-icon-checkbox-off", !option.selected );
						}

						// trigger change if value changed
						if ( self.isMultiple || oldIndex !== newIndex ) {
							self.select.trigger( "change" );
						}

						// hide custom select for single selects only - otherwise focus clicked item
						// We need to grab the clicked item the hard way, because the list may have been rebuilt
						if ( self.isMultiple ) {
							self.list.find( "li:not(.ui-li-divider)" ).eq( newIndex )
								.addClass( "ui-btn-down-" + widget.options.theme ).find( "a" ).first().focus();
						}
						else {
							self.close();
						}

						event.preventDefault();
					})
					.keydown(function( event ) {  //keyboard events for menu items
						var target = $( event.target ),
							li = target.closest( "li" ),
							prev, next;

						// switch logic based on which key was pressed
						switch ( event.keyCode ) {
							// up or left arrow keys
						case 38:
							prev = li.prev().not( ".ui-selectmenu-placeholder" );

							if ( prev.is( ".ui-li-divider" ) ) {
								prev = prev.prev();
							}

							// if there's a previous option, focus it
							if ( prev.length ) {
								target
									.blur()
									.attr( "tabindex", "-1" );

								prev.addClass( "ui-btn-down-" + widget.options.theme ).find( "a" ).first().focus();
							}

							return false;
							// down or right arrow keys
						case 40:
							next = li.next();

							if ( next.is( ".ui-li-divider" ) ) {
								next = next.next();
							}

							// if there's a next option, focus it
							if ( next.length ) {
								target
									.blur()
									.attr( "tabindex", "-1" );

								next.addClass( "ui-btn-down-" + widget.options.theme ).find( "a" ).first().focus();
							}

							return false;
							// If enter or space is pressed, trigger click
						case 13:
						case 32:
							target.trigger( "click" );

							return false;
						}
					});

				// button refocus ensures proper height calculation
				// by removing the inline style and ensuring page inclusion
				self.menuPage.bind( "pagehide", function() {
					// TODO centralize page removal binding / handling in the page plugin.
					// Suggestion from @jblas to do refcounting
					//
					// TODO extremely confusing dependency on the open method where the pagehide.remove
					// bindings are stripped to prevent the parent page from disappearing. The way
					// we're keeping pages in the DOM right now sucks
					//
					// rebind the page remove that was unbound in the open function
					// to allow for the parent page removal from actions other than the use
					// of a dialog sized custom select
					//
					// doing this here provides for the back button on the custom select dialog
					$.mobile._bindPageRemove.call( self.thisPage );
				});

				// Events on the popup
				self.listbox.bind( "popupafterclose", function( event ) {
					self.close();
				});

				// Close button on small overlays
				if ( self.isMultiple ) {
					self.headerClose.click(function() {
						if ( self.menuType === "overlay" ) {
							self.close();
							return false;
						}
					});
				}

				// track this dependency so that when the parent page
				// is removed on pagehide it will also remove the menupage
				self.thisPage.addDependents( this.menuPage );
			},

			_isRebuildRequired: function() {
				var list = this.list.find( "li" ),
					options = this._selectOptions();

				// TODO exceedingly naive method to determine difference
				// ignores value changes etc in favor of a forcedRebuild
				// from the user in the refresh method
				return options.text() !== list.text();
			},

			selected: function() {
				return this._selectOptions().filter( ":selected:not( :jqmData(placeholder='true') )" );
			},

			refresh: function( forceRebuild , foo ) {
				var self = this,
				select = this.element,
				isMultiple = this.isMultiple,
				indicies;

				if (  forceRebuild || this._isRebuildRequired() ) {
					self._buildList();
				}

				indicies = this.selectedIndices();

				self.setButtonText();
				self.setButtonCount();

				self.list.find( "li:not(.ui-li-divider)" )
					.removeClass( $.mobile.activeBtnClass )
					.attr( "aria-selected", false )
					.each(function( i ) {

						if ( $.inArray( i, indicies ) > -1 ) {
							var item = $( this );

							// Aria selected attr
							item.attr( "aria-selected", true );

							// Multiple selects: add the "on" checkbox state to the icon
							if ( self.isMultiple ) {
								item.find( ".ui-icon" ).removeClass( "ui-icon-checkbox-off" ).addClass( "ui-icon-checkbox-on" );
							} else {
								if ( item.is( ".ui-selectmenu-placeholder" ) ) {
									item.next().addClass( $.mobile.activeBtnClass );
								} else {
									item.addClass( $.mobile.activeBtnClass );
								}
							}
						}
					});
			},

			close: function() {
				if ( this.options.disabled || !this.isOpen ) {
					return;
				}

				var self = this;

				if ( self.menuType === "page" ) {
					self.menuPage.dialog( "close" );
					self.list.appendTo( self.listbox );
				} else {
					self.listbox.popup( "close" );
				}

				self._focusButton();
				// allow the dialog to be closed again
				self.isOpen = false;
			},

			open: function() {
				this.button.click();
			},

			_decideFormat: function() {
				var self = this,
					$window = $.mobile.window,
					selfListParent = self.list.parent(),
					menuHeight = selfListParent.outerHeight(),
					menuWidth = selfListParent.outerWidth(),
					activePage = $( "." + $.mobile.activePageClass ),
					scrollTop = $window.scrollTop(),
					btnOffset = self.button.offset().top,
					screenHeight = $window.height(),
					screenWidth = $window.width();

				function focusMenuItem() {
					var selector = self.list.find( "." + $.mobile.activeBtnClass + " a" );
					if ( selector.length === 0 ) {
						selector = self.list.find( "li.ui-btn:not( :jqmData(placeholder='true') ) a" );
					}
					selector.first().focus().closest( "li" ).addClass( "ui-btn-down-" + widget.options.theme );
				}

				if ( menuHeight > screenHeight - 80 || !$.support.scrollTop ) {

					self.menuPage.appendTo( $.mobile.pageContainer ).page();
					self.menuPageContent = menuPage.find( ".ui-content" );
					self.menuPageClose = menuPage.find( ".ui-header a" );

					// prevent the parent page from being removed from the DOM,
					// otherwise the results of selecting a list item in the dialog
					// fall into a black hole
					self.thisPage.unbind( "pagehide.remove" );

					//for WebOS/Opera Mini (set lastscroll using button offset)
					if ( scrollTop === 0 && btnOffset > screenHeight ) {
						self.thisPage.one( "pagehide", function() {
							$( this ).jqmData( "lastScroll", btnOffset );
						});
					}

					self.menuPage
						.one( "pageshow", function() {
							focusMenuItem();
						})
						.one( "pagehide", function() {
							self.close();
						});

					self.menuType = "page";
					self.menuPageContent.append( self.list );
					self.menuPage.find("div .ui-title").text(self.label.text());
				} else {
					self.menuType = "overlay";

					self.listbox.one( "popupafteropen", focusMenuItem );
				}
			},

			_buildList: function() {
				var self = this,
					o = this.options,
					placeholder = this.placeholder,
					needPlaceholder = true,
					optgroups = [],
					lis = [],
					dataIcon = self.isMultiple ? "checkbox-off" : "false";

				self.list.empty().filter( ".ui-listview" ).listview( "destroy" );

				var $options = self.select.find( "option" ),
					numOptions = $options.length,
					select = this.select[ 0 ],
					dataPrefix = 'data-' + $.mobile.ns,
					dataIndexAttr = dataPrefix + 'option-index',
					dataIconAttr = dataPrefix + 'icon',
					dataRoleAttr = dataPrefix + 'role',
					dataPlaceholderAttr = dataPrefix + 'placeholder',
					fragment = document.createDocumentFragment(),
					isPlaceholderItem = false,
					optGroup;

				for (var i = 0; i < numOptions;i++, isPlaceholderItem = false) {
					var option = $options[i],
						$option = $( option ),
						parent = option.parentNode,
						text = $option.text(),
						anchor  = document.createElement( 'a' ),
						classes = [];

					anchor.setAttribute( 'href', '#' );
					anchor.appendChild( document.createTextNode( text ) );

					// Are we inside an optgroup?
					if ( parent !== select && parent.nodeName.toLowerCase() === "optgroup" ) {
						var optLabel = parent.getAttribute( 'label' );
						if ( optLabel !== optGroup ) {
							var divider = document.createElement( 'li' );
							divider.setAttribute( dataRoleAttr, 'list-divider' );
							divider.setAttribute( 'role', 'option' );
							divider.setAttribute( 'tabindex', '-1' );
							divider.appendChild( document.createTextNode( optLabel ) );
							fragment.appendChild( divider );
							optGroup = optLabel;
						}
					}

					if ( needPlaceholder && ( !option.getAttribute( "value" ) || text.length === 0 || $option.jqmData( "placeholder" ) ) ) {
						needPlaceholder = false;
						isPlaceholderItem = true;

						// If we have identified a placeholder, record the fact that it was
						// us who have added the placeholder to the option and mark it
						// retroactively in the select as well
						if ( null === option.getAttribute( dataPlaceholderAttr ) ) {
							this._removePlaceholderAttr = true;
						}
						option.setAttribute( dataPlaceholderAttr, true );
						if ( o.hidePlaceholderMenuItems ) {
							classes.push( "ui-selectmenu-placeholder" );
						}
						if ( placeholder !== text ) {
							placeholder = self.placeholder = text;
						}
					}

					var item = document.createElement('li');
					if ( option.disabled ) {
						classes.push( "ui-disabled" );
						item.setAttribute('aria-disabled',true);
					}
					item.setAttribute( dataIndexAttr,i );
					item.setAttribute( dataIconAttr, dataIcon );
					if ( isPlaceholderItem ) {
						item.setAttribute( dataPlaceholderAttr, true );
					}
					item.className = classes.join( " " );
					item.setAttribute( 'role', 'option' );
					anchor.setAttribute( 'tabindex', '-1' );
					item.appendChild( anchor );
					fragment.appendChild( item );
				}

				self.list[0].appendChild( fragment );

				// Hide header if it's not a multiselect and there's no placeholder
				if ( !this.isMultiple && !placeholder.length ) {
					this.header.hide();
				} else {
					this.headerTitle.text( this.placeholder );
				}

				// Now populated, create listview
				self.list.listview();
			},

			_button: function() {
				return $( "<a>", {
					"href": "#",
					"role": "button",
					// TODO value is undefined at creation
					"id": this.buttonId,
					"aria-haspopup": "true",

					// TODO value is undefined at creation
					"aria-owns": this.menuId
				});
			},

			_destroy: function() {
				this.close();

				// Restore the tabindex attribute to its original value
				if ( this._origTabIndex !== undefined ) {
					if ( this._origTabIndex !== false ) {
						this.select.attr( "tabindex", this._origTabIndex );
					} else {
						this.select.removeAttr( "tabindex" );
					}
				}

				// Remove the placeholder attribute if we were the ones to add it
				if ( this._removePlaceholderAttr ) {
					this._selectOptions().removeAttr( "data-" + $.mobile.ns + "placeholder" );
				}

				// Remove the popup
				this.listbox.remove();

				// Chain up
				origDestroy.apply( this, arguments );
			}
		});
	};

	// issue #3894 - core doesn't trigger events on disabled delegates
	$.mobile.document.bind( "selectmenubeforecreate", function( event ) {
		var selectmenuWidget = $( event.target ).data( "mobile-selectmenu" );

		if ( !selectmenuWidget.options.nativeMenu &&
				selectmenuWidget.element.parents( ":jqmData(role='popup')" ).length === 0 ) {
			extendSelect( selectmenuWidget );
		}
	});
})( jQuery );

(function( $, undefined ) {


	$.widget( "mobile.fixedtoolbar", $.mobile.widget, {
		options: {
			visibleOnPageShow: true,
			disablePageZoom: true,
			transition: "slide", //can be none, fade, slide (slide maps to slideup or slidedown)
			fullscreen: false,
			tapToggle: true,
			tapToggleBlacklist: "a, button, input, select, textarea, .ui-header-fixed, .ui-footer-fixed, .ui-popup, .ui-panel, .ui-panel-dismiss-open",
			hideDuringFocus: "input, textarea, select",
			updatePagePadding: true,
			trackPersistentToolbars: true,

			// Browser detection! Weeee, here we go...
			// Unfortunately, position:fixed is costly, not to mention probably impossible, to feature-detect accurately.
			// Some tests exist, but they currently return false results in critical devices and browsers, which could lead to a broken experience.
			// Testing fixed positioning is also pretty obtrusive to page load, requiring injected elements and scrolling the window
			// The following function serves to rule out some popular browsers with known fixed-positioning issues
			// This is a plugin option like any other, so feel free to improve or overwrite it
			supportBlacklist: function() {
				return !$.support.fixedPosition;
			},
			initSelector: ":jqmData(position='fixed')"
		},

		_create: function() {

			var self = this,
				o = self.options,
				$el = self.element,
				tbtype = $el.is( ":jqmData(role='header')" ) ? "header" : "footer",
				$page = $el.closest( ".ui-page" );

			// Feature detecting support for
			if ( o.supportBlacklist() ) {
				self.destroy();
				return;
			}

			$el.addClass( "ui-"+ tbtype +"-fixed" );

			// "fullscreen" overlay positioning
			if ( o.fullscreen ) {
				$el.addClass( "ui-"+ tbtype +"-fullscreen" );
				$page.addClass( "ui-page-" + tbtype + "-fullscreen" );
			}
			// If not fullscreen, add class to page to set top or bottom padding
			else{
				$page.addClass( "ui-page-" + tbtype + "-fixed" );
			}

			$.extend( this, {
				_thisPage: null
			});

			self._addTransitionClass();
			self._bindPageEvents();
			self._bindToggleHandlers();
		},

		_addTransitionClass: function() {
			var tclass = this.options.transition;

			if ( tclass && tclass !== "none" ) {
				// use appropriate slide for header or footer
				if ( tclass === "slide" ) {
					tclass = this.element.is( ".ui-header" ) ? "slidedown" : "slideup";
				}

				this.element.addClass( tclass );
			}
		},

		_bindPageEvents: function() {
			this._thisPage = this.element.closest( ".ui-page" );
			//page event bindings
			// Fixed toolbars require page zoom to be disabled, otherwise usability issues crop up
			// This method is meant to disable zoom while a fixed-positioned toolbar page is visible
			this._on( this._thisPage, {
				"pagebeforeshow": "_handlePageBeforeShow",
				"webkitAnimationStart":"_handleAnimationStart",
				"animationstart":"_handleAnimationStart",
				"updatelayout": "_handleAnimationStart",
				"pageshow": "_handlePageShow",
				"pagebeforehide": "_handlePageBeforeHide"
			});
		},

		_handlePageBeforeShow: function() {
			var o = this.options;
			if ( o.disablePageZoom ) {
				$.mobile.zoom.disable( true );
			}
			if ( !o.visibleOnPageShow ) {
				this.hide( true );
			}
		},

		_handleAnimationStart: function() {
			if ( this.options.updatePagePadding ) {
				this.updatePagePadding( this._thisPage );
			}
		},

		_handlePageShow: function() {
			this.updatePagePadding( this._thisPage );
			if ( this.options.updatePagePadding ) {
				this._on( $.mobile.window, { "throttledresize": "updatePagePadding" } );
			}
		},

		_handlePageBeforeHide: function( e, ui ) {
			var o = this.options;

			if ( o.disablePageZoom ) {
				$.mobile.zoom.enable( true );
			}
			if ( o.updatePagePadding ) {
				this._off( $.mobile.window, "throttledresize" );
			}

			if ( o.trackPersistentToolbars ) {
				var thisFooter = $( ".ui-footer-fixed:jqmData(id)", this._thisPage ),
					thisHeader = $( ".ui-header-fixed:jqmData(id)", this._thisPage ),
					nextFooter = thisFooter.length && ui.nextPage && $( ".ui-footer-fixed:jqmData(id='" + thisFooter.jqmData( "id" ) + "')", ui.nextPage ) || $(),
					nextHeader = thisHeader.length && ui.nextPage && $( ".ui-header-fixed:jqmData(id='" + thisHeader.jqmData( "id" ) + "')", ui.nextPage ) || $();

				if ( nextFooter.length || nextHeader.length ) {

					nextFooter.add( nextHeader ).appendTo( $.mobile.pageContainer );

					ui.nextPage.one( "pageshow", function() {
						nextHeader.prependTo( this );
						nextFooter.appendTo( this );
					});
				}
			}
		},

		_visible: true,

		// This will set the content element's top or bottom padding equal to the toolbar's height
		updatePagePadding: function( tbPage ) {
			var $el = this.element,
				header = $el.is( ".ui-header" ),
				pos = parseFloat( $el.css( header ? "top" : "bottom" ) );

			// This behavior only applies to "fixed", not "fullscreen"
			if ( this.options.fullscreen ) { return; }

			tbPage = tbPage || this._thisPage || $el.closest( ".ui-page" );
			$( tbPage ).css( "padding-" + ( header ? "top" : "bottom" ), $el.outerHeight() + pos );
		},

		_useTransition: function( notransition ) {
			var $win = $.mobile.window,
				$el = this.element,
				scroll = $win.scrollTop(),
				elHeight = $el.height(),
				pHeight = $el.closest( ".ui-page" ).height(),
				viewportHeight = $.mobile.getScreenHeight(),
				tbtype = $el.is( ":jqmData(role='header')" ) ? "header" : "footer";

			return !notransition &&
				( this.options.transition && this.options.transition !== "none" &&
				(
					( tbtype === "header" && !this.options.fullscreen && scroll > elHeight ) ||
					( tbtype === "footer" && !this.options.fullscreen && scroll + viewportHeight < pHeight - elHeight )
				) || this.options.fullscreen
				);
		},

		show: function( notransition ) {
			var hideClass = "ui-fixed-hidden",
				$el = this.element;

			if ( this._useTransition( notransition ) ) {
				$el
					.removeClass( "out " + hideClass )
					.addClass( "in" )
					.animationComplete(function () {
						$el.removeClass('in');
					});
			}
			else {
				$el.removeClass( hideClass );
			}
			this._visible = true;
		},

		hide: function( notransition ) {
			var hideClass = "ui-fixed-hidden",
				$el = this.element,
				// if it's a slide transition, our new transitions need the reverse class as well to slide outward
				outclass = "out" + ( this.options.transition === "slide" ? " reverse" : "" );

			if( this._useTransition( notransition ) ) {
				$el
					.addClass( outclass )
					.removeClass( "in" )
					.animationComplete(function() {
						$el.addClass( hideClass ).removeClass( outclass );
					});
			}
			else {
				$el.addClass( hideClass ).removeClass( outclass );
			}
			this._visible = false;
		},

		toggle: function() {
			this[ this._visible ? "hide" : "show" ]();
		},

		_bindToggleHandlers: function() {
			var self = this, delay,
				o = self.options,
				$el = self.element;

			// tap toggle
			$el.closest( ".ui-page" )
				.bind( "vclick", function( e ) {
					if ( o.tapToggle && !$( e.target ).closest( o.tapToggleBlacklist ).length ) {
						self.toggle();
					}
				})
				.bind( "focusin focusout", function( e ) {
					//this hides the toolbars on a keyboard pop to give more screen room and prevent ios bug which 
					//positions fixed toolbars in the middle of the screen on pop if the input is near the top or
					//bottom of the screen addresses issues #4410 Footer navbar moves up when clicking on a textbox in an Android environment
					//and issue #4113 Header and footer change their position after keyboard popup - iOS
					//and issue #4410 Footer navbar moves up when clicking on a textbox in an Android environment
					if ( screen.width < 1025 && $( e.target ).is( o.hideDuringFocus ) && !$( e.target ).closest( ".ui-header-fixed, .ui-footer-fixed" ).length ) {
						//Fix for issue #4724 Moving through form in Mobile Safari with "Next" and "Previous" system 
						//controls causes fixed position, tap-toggle false Header to reveal itself 
						if ( e.type === "focusout" && !self._visible ) {
							//wait for the stack to unwind and see if we have jumped to another input
							delay = setTimeout( function() {
								self.show();
							}, 0 ); 
						} else if ( e.type === "focusin" && self._visible ) {
							//if we have jumped to another input clear the time out to cancel the show.
							clearTimeout( delay );
							self.hide();
						}
					}
				});
		},

		_destroy: function() {
			var $el = this.element,
				header = $el.is( ".ui-header" );

			$el.closest( ".ui-page" ).css( "padding-" + ( header ? "top" : "bottom" ), "" );
			$el.removeClass( "ui-header-fixed ui-footer-fixed ui-header-fullscreen ui-footer-fullscreen in out fade slidedown slideup ui-fixed-hidden" );
			$el.closest( ".ui-page" ).removeClass( "ui-page-header-fixed ui-page-footer-fixed ui-page-header-fullscreen ui-page-footer-fullscreen" );
		}

	});

	//auto self-init widgets
	$.mobile.document
		.bind( "pagecreate create", function( e ) {

			// DEPRECATED in 1.1: support for data-fullscreen=true|false on the page element.
			// This line ensures it still works, but we recommend moving the attribute to the toolbars themselves.
			if ( $( e.target ).jqmData( "fullscreen" ) ) {
				$( $.mobile.fixedtoolbar.prototype.options.initSelector, e.target ).not( ":jqmData(fullscreen)" ).jqmData( "fullscreen", true );
			}

			$.mobile.fixedtoolbar.prototype.enhanceWithin( e.target );
		});

})( jQuery );

(function( $, undefined ) {
	$.widget( "mobile.fixedtoolbar", $.mobile.fixedtoolbar, {

			_create: function() {
				this._super();
				this._workarounds();
			},

			//check the browser and version and run needed workarounds
			_workarounds: function() {
				var ua = navigator.userAgent,
				platform = navigator.platform,
				// Rendering engine is Webkit, and capture major version
				wkmatch = ua.match( /AppleWebKit\/([0-9]+)/ ),
				wkversion = !!wkmatch && wkmatch[ 1 ],
				os = null,
				self = this;
				//set the os we are working in if it dosent match one with workarounds return
				if( platform.indexOf( "iPhone" ) > -1 || platform.indexOf( "iPad" ) > -1  || platform.indexOf( "iPod" ) > -1 ){
					os = "ios";
				} else if( ua.indexOf( "Android" ) > -1 ){
					os = "android";
				} else {
					return;
				}
				//check os version if it dosent match one with workarounds return
				if( os === "ios" ) {
					//iOS  workarounds
					self._bindScrollWorkaround();
				} else if( os === "android" && wkversion && wkversion < 534 ) {
					//Android 2.3 run all Android 2.3 workaround
					self._bindScrollWorkaround();
					self._bindListThumbWorkaround();
				} else {
					return;
				}
			},

			//Utility class for checking header and footer positions relative to viewport
			_viewportOffset: function() {
				var $el = this.element,
					header = $el.is( ".ui-header" ),
					offset = Math.abs($el.offset().top - $.mobile.window.scrollTop());
				if( !header ) {
					offset = Math.round(offset - $.mobile.window.height() + $el.outerHeight())-60;
				}
				return offset;
			},

			//bind events for _triggerRedraw() function 
			_bindScrollWorkaround: function() {
				var self = this;
				//bind to scrollstop and check if the toolbars are correctly positioned
				this._on( $.mobile.window, { scrollstop: function() {
					var viewportOffset = self._viewportOffset();
					//check if the header is visible and if its in the right place
					if( viewportOffset > 2 && self._visible) {
						self._triggerRedraw();
					}
				}});
			},

			//this addresses issue #4250 Persistent footer instability in v1.1 with long select lists in Android 2.3.3
			//and issue #3748 Android 2.x: Page transitions broken when fixed toolbars used
			//the absolutely positioned thumbnail in a list view causes problems with fixed position buttons above in a nav bar
			//setting the li's to -webkit-transform:translate3d(0,0,0); solves this problem to avoide potential issues in other
			//platforms we scope this with the class ui-android-2x-fix
			_bindListThumbWorkaround: function() {
				this.element.closest(".ui-page").addClass( "ui-android-2x-fixed" );
			},
			//this addresses issues #4337 Fixed header problem after scrolling content on iOS and Android
			//and device bugs project issue #1 Form elements can lose click hit area in position: fixed containers.
			//this also addresses not on fixed toolbars page in docs
			//adding 1px of padding to the bottom then removing it causes a "redraw"
			//which positions the toolbars correctly (they will always be visually correct) 
			_triggerRedraw: function() {
				var paddingBottom = parseFloat( $( ".ui-page-active" ).css( "padding-bottom" ) );
				//trigger page redraw to fix incorrectly positioned fixed elements
				$( ".ui-page-active" ).css( "padding-bottom", ( paddingBottom + 1 ) +"px" );
				//if the padding is reset with out a timeout the reposition will not occure.
				//this is independant of JQM the browser seems to need the time to react.
				setTimeout( function() {
					$( ".ui-page-active" ).css( "padding-bottom", paddingBottom + "px" );
				}, 0 );
			},

			destroy: function() {
				this._super();
				//Remove the class we added to the page previously in android 2.x 
				this.element.closest(".ui-page-active").removeClass( "ui-android-2x-fix" );
			}
	});

	})( jQuery );

(function( $, window ) {

	$.mobile.iosorientationfixEnabled = true;

	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	var ua = navigator.userAgent;
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && /OS [1-5]_[0-9_]* like Mac OS X/i.test( ua ) && ua.indexOf( "AppleWebKit" ) > -1 ) ){
		$.mobile.iosorientationfixEnabled = false;
		return;
	}

	var zoom = $.mobile.zoom,
		evt, x, y, z, aig;

	function checkTilt( e ) {
		evt = e.originalEvent;
		aig = evt.accelerationIncludingGravity;

		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );

		// If portrait orientation and in one of the danger zones
		if ( !window.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ) {
				if ( zoom.enabled ) {
					zoom.disable();
				}
		}	else if ( !zoom.enabled ) {
				zoom.enable();
		}
	}

	$.mobile.document.on( "mobileinit", function(){
		if( $.mobile.iosorientationfixEnabled ){
			$.mobile.window
				.bind( "orientationchange.iosorientationfix", zoom.enable )
				.bind( "devicemotion.iosorientationfix", checkTilt );
		}
	});

}( jQuery, this ));

(function( $, window, undefined ) {
	var	$html = $( "html" ),
			$head = $( "head" ),
			$window = $.mobile.window;

	//remove initial build class (only present on first pageshow)
	function hideRenderingClass() {
		$html.removeClass( "ui-mobile-rendering" );
	}

	// trigger mobileinit event - useful hook for configuring $.mobile settings before they're used
	$( window.document ).trigger( "mobileinit" );

	// support conditions
	// if device support condition(s) aren't met, leave things as they are -> a basic, usable experience,
	// otherwise, proceed with the enhancements
	if ( !$.mobile.gradeA() ) {
		return;
	}

	// override ajaxEnabled on platforms that have known conflicts with hash history updates
	// or generally work better browsing in regular http for full page refreshes (BB5, Opera Mini)
	if ( $.mobile.ajaxBlacklist ) {
		$.mobile.ajaxEnabled = false;
	}

	// Add mobile, initial load "rendering" classes to docEl
	$html.addClass( "ui-mobile ui-mobile-rendering" );

	// This is a fallback. If anything goes wrong (JS errors, etc), or events don't fire,
	// this ensures the rendering class is removed after 5 seconds, so content is visible and accessible
	setTimeout( hideRenderingClass, 5000 );

	$.extend( $.mobile, {
		// find and enhance the pages in the dom and transition to the first page.
		initializePage: function() {
			// find present pages
			var path = $.mobile.path,
				$pages = $( ":jqmData(role='page'), :jqmData(role='dialog')" ),
				hash = path.stripHash( path.stripQueryParams(path.parseLocation().hash) ),
				hashPage = document.getElementById( hash );

			// if no pages are found, create one with body's inner html
			if ( !$pages.length ) {
				$pages = $( "body" ).wrapInner( "<div data-" + $.mobile.ns + "role='page'></div>" ).children( 0 );
			}

			// add dialogs, set data-url attrs
			$pages.each(function() {
				var $this = $( this );

				// unless the data url is already set set it to the pathname
				if ( !$this.jqmData( "url" ) ) {
					$this.attr( "data-" + $.mobile.ns + "url", $this.attr( "id" ) || location.pathname + location.search );
				}
			});

			// define first page in dom case one backs out to the directory root (not always the first page visited, but defined as fallback)
			$.mobile.firstPage = $pages.first();

			// define page container
			$.mobile.pageContainer = $.mobile.firstPage.parent().addClass( "ui-mobile-viewport" );

			// alert listeners that the pagecontainer has been determined for binding
			// to events triggered on it
			$window.trigger( "pagecontainercreate" );

			// cue page loading message
			$.mobile.showPageLoadingMsg();

			//remove initial build class (only present on first pageshow)
			hideRenderingClass();

			// if hashchange listening is disabled, there's no hash deeplink,
			// the hash is not valid (contains more than one # or does not start with #)
			// or there is no page with that hash, change to the first page in the DOM
			// Remember, however, that the hash can also be a path!
			if ( ! ( $.mobile.hashListeningEnabled &&
				$.mobile.path.isHashValid( location.hash ) &&
				( $( hashPage ).is( ':jqmData(role="page")' ) ||
					$.mobile.path.isPath( hash ) ||
					hash === $.mobile.dialogHashKey ) ) ) {

				// Store the initial destination
				if ( $.mobile.path.isHashValid( location.hash ) ) {
					$.mobile.urlHistory.initialDst = hash.replace( "#", "" );
				}

				// make sure to set initial popstate state if it exists
				// so that navigation back to the initial page works properly
				if( $.event.special.navigate.isPushStateEnabled() ) {
					$.mobile.navigate.navigator.squash( path.parseLocation().href );
				}

				$.mobile.changePage( $.mobile.firstPage, {
					transition: "none",
					reverse: true,
					changeHash: false,
					fromHashChange: true
				});
			} else {
				// trigger hashchange or navigate to squash and record the correct
				// history entry for an initial hash path
				if( !$.event.special.navigate.isPushStateEnabled() ) {
					$window.trigger( "hashchange", [true] );
				} else {
					// TODO figure out how to simplify this interaction with the initial history entry
					// at the bottom js/navigate/navigate.js
					$.mobile.navigate.history.stack = [];
					$.mobile.navigate( $.mobile.path.isPath( location.hash ) ? location.hash : location.href );
				}
			}
		}
	});

	// initialize events now, after mobileinit has occurred
	$.mobile.navreadyDeferred.resolve();

	// check which scrollTop value should be used by scrolling to 1 immediately at domready
	// then check what the scroll top is. Android will report 0... others 1
	// note that this initial scroll won't hide the address bar. It's just for the check.
	$(function() {
		window.scrollTo( 0, 1 );

		// if defaultHomeScroll hasn't been set yet, see if scrollTop is 1
		// it should be 1 in most browsers, but android treats 1 as 0 (for hiding addr bar)
		// so if it's 1, use 0 from now on
		$.mobile.defaultHomeScroll = ( !$.support.scrollTop || $.mobile.window.scrollTop() === 1 ) ? 0 : 1;

		//dom-ready inits
		if ( $.mobile.autoInitializePage ) {
			$.mobile.initializePage();
		}

		// window load event
		// hide iOS browser chrome on load
		$window.load( $.mobile.silentScroll );

		if ( !$.support.cssPointerEvents ) {
			// IE and Opera don't support CSS pointer-events: none that we use to disable link-based buttons
			// by adding the 'ui-disabled' class to them. Using a JavaScript workaround for those browser.
			// https://github.com/jquery/jquery-mobile/issues/3558

			$.mobile.document.delegate( ".ui-disabled", "vclick",
				function( e ) {
					e.preventDefault();
					e.stopImmediatePropagation();
				}
			);
		}
	});
}( jQuery, this ));


}));

/*! jQuery Mobile vGit Build: SHA1: 3d48d6517f808550ee402a2859feedec13b0a3fe <> Date: Tue Feb 19 15:25:22 2013 -0800 jquerymobile.com | jquery.org/license !*/
(function(a,b,c){typeof define=="function"&&define.amd?define(["jquery"],function(d){return c(d,a,b),d.mobile}):c(a.jQuery,a,b)})(this,document,function(a,b,c,d){(function(a){a.mobile={}})(a),function(a,b,d){var e={};a.mobile=a.extend(a.mobile,{version:"1.3.0",ns:"",subPageUrlKey:"ui-page",activePageClass:"ui-page-active",activeBtnClass:"ui-btn-active",focusClass:"ui-focus",ajaxEnabled:!0,hashListeningEnabled:!0,linkBindingEnabled:!0,defaultPageTransition:"fade",maxTransitionWidth:!1,minScrollBack:250,touchOverflowEnabled:!1,defaultDialogTransition:"pop",pageLoadErrorMessage:"Error Loading Page",pageLoadErrorMessageTheme:"e",phonegapNavigationEnabled:!1,autoInitializePage:!0,pushStateEnabled:!0,ignoreContentEnabled:!1,orientationChangeEnabled:!0,buttonMarkup:{hoverDelay:200},window:a(b),document:a(c),keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91},behaviors:{},silentScroll:function(c){a.type(c)!=="number"&&(c=a.mobile.defaultHomeScroll),a.event.special.scrollstart.enabled=!1,setTimeout(function(){b.scrollTo(0,c),a.mobile.document.trigger("silentscroll",{x:0,y:c})},20),setTimeout(function(){a.event.special.scrollstart.enabled=!0},150)},nsNormalizeDict:e,nsNormalize:function(b){if(!b)return;return e[b]||(e[b]=a.camelCase(a.mobile.ns+b))},getInheritedTheme:function(a,b){var c=a[0],d="",e=/ui-(bar|body|overlay)-([a-z])\b/,f,g;while(c){f=c.className||"";if(f&&(g=e.exec(f))&&(d=g[2]))break;c=c.parentNode}return d||b||"a"},closestPageData:function(a){return a.closest(':jqmData(role="page"), :jqmData(role="dialog")').data("mobile-page")},enhanceable:function(a){return this.haveParents(a,"enhance")},hijackable:function(a){return this.haveParents(a,"ajax")},haveParents:function(b,c){if(!a.mobile.ignoreContentEnabled)return b;var d=b.length,e=a(),f,g,h;for(var i=0;i<d;i++){g=b.eq(i),h=!1,f=b[i];while(f){var j=f.getAttribute?f.getAttribute("data-"+a.mobile.ns+c):"";if(j==="false"){h=!0;break}f=f.parentNode}h||(e=e.add(g))}return e},getScreenHeight:function(){return b.innerHeight||a.mobile.window.height()}},a.mobile),a.fn.jqmData=function(b,c){var e;return typeof b!="undefined"&&(b&&(b=a.mobile.nsNormalize(b)),arguments.length<2||c===d?e=this.data(b):e=this.data(b,c)),e},a.jqmData=function(b,c,d){var e;return typeof c!="undefined"&&(e=a.data(b,c?a.mobile.nsNormalize(c):c,d)),e},a.fn.jqmRemoveData=function(b){return this.removeData(a.mobile.nsNormalize(b))},a.jqmRemoveData=function(b,c){return a.removeData(b,a.mobile.nsNormalize(c))},a.fn.removeWithDependents=function(){a.removeWithDependents(this)},a.removeWithDependents=function(b){var c=a(b);(c.jqmData("dependents")||a()).remove(),c.remove()},a.fn.addDependents=function(b){a.addDependents(a(this),b)},a.addDependents=function(b,c){var d=a(b).jqmData("dependents")||a();a(b).jqmData("dependents",a.merge(d,c))},a.fn.getEncodedText=function(){return a("<div/>").text(a(this).text()).html()},a.fn.jqmEnhanceable=function(){return a.mobile.enhanceable(this)},a.fn.jqmHijackable=function(){return a.mobile.hijackable(this)};var f=a.find,g=/:jqmData\(([^)]*)\)/g;a.find=function(b,c,d,e){return b=b.replace(g,"[data-"+(a.mobile.ns||"")+"$1]"),f.call(this,b,c,d,e)},a.extend(a.find,f),a.find.matches=function(b,c){return a.find(b,null,null,c)},a.find.matchesSelector=function(b,c){return a.find(c,null,null,[b]).length>0}}(a,this),function(a,b){var c=0,d=Array.prototype.slice,e=a.cleanData;a.cleanData=function(b){for(var c=0,d;(d=b[c])!=null;c++)try{a(d).triggerHandler("remove")}catch(f){}e(b)},a.widget=function(b,c,d){var e,f,g,h,i=b.split(".")[0];b=b.split(".")[1],e=i+"-"+b,d||(d=c,c=a.Widget),a.expr[":"][e.toLowerCase()]=function(b){return!!a.data(b,e)},a[i]=a[i]||{},f=a[i][b],g=a[i][b]=function(a,b){if(!this._createWidget)return new g(a,b);arguments.length&&this._createWidget(a,b)},a.extend(g,f,{version:d.version,_proto:a.extend({},d),_childConstructors:[]}),h=new c,h.options=a.widget.extend({},h.options),a.each(d,function(b,e){a.isFunction(e)&&(d[b]=function(){var a=function(){return c.prototype[b].apply(this,arguments)},d=function(a){return c.prototype[b].apply(this,a)};return function(){var b=this._super,c=this._superApply,f;return this._super=a,this._superApply=d,f=e.apply(this,arguments),this._super=b,this._superApply=c,f}}())}),g.prototype=a.widget.extend(h,{widgetEventPrefix:f?h.widgetEventPrefix:b},d,{constructor:g,namespace:i,widgetName:b,widgetFullName:e}),f?(a.each(f._childConstructors,function(b,c){var d=c.prototype;a.widget(d.namespace+"."+d.widgetName,g,c._proto)}),delete f._childConstructors):c._childConstructors.push(g),a.widget.bridge(b,g)},a.widget.extend=function(c){var e=d.call(arguments,1),f=0,g=e.length,h,i;for(;f<g;f++)for(h in e[f])i=e[f][h],e[f].hasOwnProperty(h)&&i!==b&&(a.isPlainObject(i)?c[h]=a.isPlainObject(c[h])?a.widget.extend({},c[h],i):a.widget.extend({},i):c[h]=i);return c},a.widget.bridge=function(c,e){var f=e.prototype.widgetFullName||c;a.fn[c]=function(g){var h=typeof g=="string",i=d.call(arguments,1),j=this;return g=!h&&i.length?a.widget.extend.apply(null,[g].concat(i)):g,h?this.each(function(){var d,e=a.data(this,f);if(!e)return a.error("cannot call methods on "+c+" prior to initialization; "+"attempted to call method '"+g+"'");if(!a.isFunction(e[g])||g.charAt(0)==="_")return a.error("no such method '"+g+"' for "+c+" widget instance");d=e[g].apply(e,i);if(d!==e&&d!==b)return j=d&&d.jquery?j.pushStack(d.get()):d,!1}):this.each(function(){var b=a.data(this,f);b?b.option(g||{})._init():a.data(this,f,new e(g,this))}),j}},a.Widget=function(){},a.Widget._childConstructors=[],a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(b,d){d=a(d||this.defaultElement||this)[0],this.element=a(d),this.uuid=c++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=a.widget.extend({},this.options,this._getCreateOptions(),b),this.bindings=a(),this.hoverable=a(),this.focusable=a(),d!==this&&(a.data(d,this.widgetFullName,this),this._on(!0,this.element,{remove:function(a){a.target===d&&this.destroy()}}),this.document=a(d.style?d.ownerDocument:d.document||d),this.window=a(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:a.noop,_getCreateEventData:a.noop,_create:a.noop,_init:a.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:a.noop,widget:function(){return this.element},option:function(c,d){var e=c,f,g,h;if(arguments.length===0)return a.widget.extend({},this.options);if(typeof c=="string"){e={},f=c.split("."),c=f.shift();if(f.length){g=e[c]=a.widget.extend({},this.options[c]);for(h=0;h<f.length-1;h++)g[f[h]]=g[f[h]]||{},g=g[f[h]];c=f.pop();if(d===b)return g[c]===b?null:g[c];g[c]=d}else{if(d===b)return this.options[c]===b?null:this.options[c];e[c]=d}}return this._setOptions(e),this},_setOptions:function(a){var b;for(b in a)this._setOption(b,a[b]);return this},_setOption:function(a,b){return this.options[a]=b,a==="disabled"&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!b).attr("aria-disabled",b),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(b,c,d){var e,f=this;typeof b!="boolean"&&(d=c,c=b,b=!1),d?(c=e=a(c),this.bindings=this.bindings.add(c)):(d=c,c=this.element,e=this.widget()),a.each(d,function(d,g){function h(){if(!b&&(f.options.disabled===!0||a(this).hasClass("ui-state-disabled")))return;return(typeof g=="string"?f[g]:g).apply(f,arguments)}typeof g!="string"&&(h.guid=g.guid=g.guid||h.guid||a.guid++);var i=d.match(/^(\w+)\s*(.*)$/),j=i[1]+f.eventNamespace,k=i[2];k?e.delegate(k,j,h):c.bind(j,h)})},_off:function(a,b){b=(b||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,a.unbind(b).undelegate(b)},_delay:function(a,b){function c(){return(typeof a=="string"?d[a]:a).apply(d,arguments)}var d=this;return setTimeout(c,b||0)},_hoverable:function(b){this.hoverable=this.hoverable.add(b),this._on(b,{mouseenter:function(b){a(b.currentTarget).addClass("ui-state-hover")},mouseleave:function(b){a(b.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(b){this.focusable=this.focusable.add(b),this._on(b,{focusin:function(b){a(b.currentTarget).addClass("ui-state-focus")},focusout:function(b){a(b.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(b,c,d){var e,f,g=this.options[b];d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent;if(f)for(e in f)e in c||(c[e]=f[e]);return this.element.trigger(c,d),!(a.isFunction(g)&&g.apply(this.element[0],[c].concat(d))===!1||c.isDefaultPrevented())}},a.each({show:"fadeIn",hide:"fadeOut"},function(b,c){a.Widget.prototype["_"+b]=function(d,e,f){typeof e=="string"&&(e={effect:e});var g,h=e?e===!0||typeof e=="number"?c:e.effect||c:b;e=e||{},typeof e=="number"&&(e={duration:e}),g=!a.isEmptyObject(e),e.complete=f,e.delay&&d.delay(e.delay),g&&a.effects&&a.effects.effect[h]?d[b](e):h!==b&&d[h]?d[h](e.duration,e.easing,f):d.queue(function(c){a(this)[b](),f&&f.call(d[0]),c()})}})}(a),function(a,b){a.widget("mobile.widget",{_createWidget:function(){a.Widget.prototype._createWidget.apply(this,arguments),this._trigger("init")},_getCreateOptions:function(){var c=this.element,d={};return a.each(this.options,function(a){var e=c.jqmData(a.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()}));e!==b&&(d[a]=e)}),d},enhanceWithin:function(b,c){this.enhance(a(this.options.initSelector,a(b)),c)},enhance:function(b,c){var d,e,f=a(b),g=this;f=a.mobile.enhanceable(f),c&&f.length&&(d=a.mobile.closestPageData(f),e=d&&d.keepNativeSelector()||"",f=f.not(e)),f[this.widgetName]()},raise:function(a){throw"Widget ["+this.widgetName+"]: "+a}})}(a),function(a,b){a.extend(a.mobile,{loadingMessageTextVisible:d,loadingMessageTheme:d,loadingMessage:d,showPageLoadingMsg:function(b,c,d){a.mobile.loading("show",b,c,d)},hidePageLoadingMsg:function(){a.mobile.loading("hide")},loading:function(){this.loaderWidget.loader.apply(this.loaderWidget,arguments)}});var c="ui-loader",e=a("html"),f=a.mobile.window;a.widget("mobile.loader",{options:{theme:"a",textVisible:!1,html:"",text:"loading"},defaultHtml:"<div class='"+c+"'>"+"<span class='ui-icon ui-icon-loading'></span>"+"<h1></h1>"+"</div>",fakeFixLoader:function(){var b=a("."+a.mobile.activeBtnClass).first();this.element.css({top:a.support.scrollTop&&f.scrollTop()+f.height()/2||b.length&&b.offset().top||100})},checkLoaderPosition:function(){var b=this.element.offset(),c=f.scrollTop(),d=a.mobile.getScreenHeight();if(b.top<c||b.top-c>d)this.element.addClass("ui-loader-fakefix"),this.fakeFixLoader(),f.unbind("scroll",this.checkLoaderPosition).bind("scroll",a.proxy(this.fakeFixLoader,this))},resetHtml:function(){this.element.html(a(this.defaultHtml).html())},show:function(b,g,h){var i,j,k,l;this.resetHtml(),a.type(b)==="object"?(l=a.extend({},this.options,b),b=l.theme||a.mobile.loadingMessageTheme):(l=this.options,b=b||a.mobile.loadingMessageTheme||l.theme),j=g||a.mobile.loadingMessage||l.text,e.addClass("ui-loading");if(a.mobile.loadingMessage!==!1||l.html)a.mobile.loadingMessageTextVisible!==d?i=a.mobile.loadingMessageTextVisible:i=l.textVisible,this.element.attr("class",c+" ui-corner-all ui-body-"+b+" ui-loader-"+(i||g||b.text?"verbose":"default")+(l.textonly||h?" ui-loader-textonly":"")),l.html?this.element.html(l.html):this.element.find("h1").text(j),this.element.appendTo(a.mobile.pageContainer),this.checkLoaderPosition(),f.bind("scroll",a.proxy(this.checkLoaderPosition,this))},hide:function(){e.removeClass("ui-loading"),a.mobile.loadingMessage&&this.element.removeClass("ui-loader-fakefix"),a.mobile.window.unbind("scroll",this.fakeFixLoader),a.mobile.window.unbind("scroll",this.checkLoaderPosition)}}),f.bind("pagecontainercreate",function(){a.mobile.loaderWidget=a.mobile.loaderWidget||a(a.mobile.loader.prototype.defaultHtml).loader()})}(a,this),function(a,b,d){function k(a){return a=a||location.href,"#"+a.replace(/^[^#]*#?(.*)$/,"$1")}var e="hashchange",f=c,g,h=a.event.special,i=f.documentMode,j="on"+e in b&&(i===d||i>7);a.fn[e]=function(a){return a?this.bind(e,a):this.trigger(e)},a.fn[e].delay=50,h[e]=a.extend(h[e],{setup:function(){if(j)return!1;a(g.start)},teardown:function(){if(j)return!1;a(g.stop)}}),g=function(){function n(){var c=k(),d=m(h);c!==h?(l(h=c,d),a(b).trigger(e)):d!==h&&(location.href=location.href.replace(/#.*/,"")+d),g=setTimeout(n,a.fn[e].delay)}var c={},g,h=k(),i=function(a){return a},l=i,m=i;return c.start=function(){g||n()},c.stop=function(){g&&clearTimeout(g),g=d},b.attachEvent&&!b.addEventListener&&!j&&function(){var b,d;c.start=function(){b||(d=a.fn[e].src,d=d&&d+k(),b=a('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){d||l(k()),n()}).attr("src",d||"javascript:0").insertAfter("body")[0].contentWindow,f.onpropertychange=function(){try{event.propertyName==="title"&&(b.document.title=f.title)}catch(a){}})},c.stop=i,m=function(){return k(b.location.href)},l=function(c,d){var g=b.document,h=a.fn[e].domain;c!==d&&(g.title=f.title,g.open(),h&&g.write('<script>document.domain="'+h+'"</script>'),g.close(),b.location.hash=c)}}(),c}()}(a,this),function(a,d){b.matchMedia=b.matchMedia||function(a,b){var c,d=a.documentElement,e=d.firstElementChild||d.firstChild,f=a.createElement("body"),g=a.createElement("div");return g.id="mq-test-1",g.style.cssText="position:absolute;top:-100em",f.style.background="none",f.appendChild(g),function(a){return g.innerHTML='&shy;<style media="'+a+'"> #mq-test-1 { width: 42px; }</style>',d.insertBefore(f,e),c=g.offsetWidth===42,d.removeChild(f),{matches:c,media:a}}}(c),a.mobile.media=function(a){return b.matchMedia(a).matches}}(a),function(a,b){var d={touch:"ontouchend"in c};a.mobile.support=a.mobile.support||{},a.extend(a.support,d),a.extend(a.mobile.support,d)}(a),function(a,c){a.extend(a.support,{orientation:"orientation"in b&&"onorientationchange"in b})}(a),function(a,d){function e(a){var b=a.charAt(0).toUpperCase()+a.substr(1),c=(a+" "+h.join(b+" ")+b).split(" ");for(var e in c)if(g[c[e]]!==d)return!0}function m(a,b,d){var e=c.createElement("div"),f=function(a){return a.charAt(0).toUpperCase()+a.substr(1)},g=function(a){return a===""?"":"-"+a.charAt(0).toLowerCase()+a.substr(1)+"-"},i=function(c){var d=g(c)+a+": "+b+";",h=f(c),i=h+(h===""?a:f(a));e.setAttribute("style",d),!e.style[i]||(k=!0)},j=d?d:h,k;for(var l=0;l<j.length;l++)i(j[l]);return!!k}function n(){var e="transform-3d",g=a.mobile.media("(-"+h.join("-"+e+"),(-")+"-"+e+"),("+e+")");if(g)return!!g;var i=c.createElement("div"),j={MozTransform:"-moz-transform",transform:"transform"};f.append(i);for(var k in j)i.style[k]!==d&&(i.style[k]="translate3d( 100px, 1px, 1px )",g=b.getComputedStyle(i).getPropertyValue(j[k]));return!!g&&g!=="none"}function o(){var b=location.protocol+"//"+location.host+location.pathname+"ui-dir/",c=a("head base"),d=null,e="",g,h;return c.length?e=c.attr("href"):c=d=a("<base>",{href:b}).appendTo("head"),g=a("<a href='testurl' />").prependTo(f),h=g[0].href,c[0].href=e||location.pathname,d&&d.remove(),h.indexOf(b)===0}function p(){var a=c.createElement("x"),d=c.documentElement,e=b.getComputedStyle,f;return"pointerEvents"in a.style?(a.style.pointerEvents="auto",a.style.pointerEvents="x",d.appendChild(a),f=e&&e(a,"").pointerEvents==="auto",d.removeChild(a),!!f):!1}function q(){var a=c.createElement("div");return typeof a.getBoundingClientRect!="undefined"}function r(){var a=b,c=navigator.userAgent,d=navigator.platform,e=c.match(/AppleWebKit\/([0-9]+)/),f=!!e&&e[1],g=c.match(/Fennec\/([0-9]+)/),h=!!g&&g[1],i=c.match(/Opera Mobi\/([0-9]+)/),j=!!i&&i[1];return(d.indexOf("iPhone")>-1||d.indexOf("iPad")>-1||d.indexOf("iPod")>-1)&&f&&f<534||a.operamini&&{}.toString.call(a.operamini)==="[object OperaMini]"||i&&j<7458||c.indexOf("Android")>-1&&f&&f<533||h&&h<6||"palmGetResource"in b&&f&&f<534||c.indexOf("MeeGo")>-1&&c.indexOf("NokiaBrowser/8.5.0")>-1?!1:!0}var f=a("<body>").prependTo("html"),g=f[0].style,h=["Webkit","Moz","O"],i="palmGetResource"in b,j=b.opera,k=b.operamini&&{}.toString.call(b.operamini)==="[object OperaMini]",l=b.blackberry&&!e("-webkit-transform");a.extend(a.mobile,{browser:{}}),a.mobile.browser.oldIE=function(){var a=3,b=c.createElement("div"),d=b.all||[];do b.innerHTML="<!--[if gt IE "+ ++a+"]><br><![endif]-->";while(d[0]);return a>4?a:!a}(),a.extend(a.support,{cssTransitions:"WebKitTransitionEvent"in b||m("transition","height 100ms linear",["Webkit","Moz",""])&&!a.mobile.browser.oldIE&&!j,pushState:"pushState"in history&&"replaceState"in history&&b.navigator.userAgent.search(/CriOS/)===-1,mediaquery:a.mobile.media("only all"),cssPseudoElement:!!e("content"),touchOverflow:!!e("overflowScrolling"),cssTransform3d:n(),boxShadow:!!e("boxShadow")&&!l,fixedPosition:r(),scrollTop:("pageXOffset"in b||"scrollTop"in c.documentElement||"scrollTop"in f[0])&&!i&&!k,dynamicBaseTag:o(),cssPointerEvents:p(),boundingRect:q()}),f.remove();var s=function(){var a=b.navigator.userAgent;return a.indexOf("Nokia")>-1&&(a.indexOf("Symbian/3")>-1||a.indexOf("Series60/5")>-1)&&a.indexOf("AppleWebKit")>-1&&a.match(/(BrowserNG|NokiaBrowser)\/7\.[0-3]/)}();a.mobile.gradeA=function(){return(a.support.mediaquery||a.mobile.browser.oldIE&&a.mobile.browser.oldIE>=7)&&(a.support.boundingRect||a.fn.jquery.match(/1\.[0-7+]\.[0-9+]?/)!==null)},a.mobile.ajaxBlacklist=b.blackberry&&!b.WebKitPoint||k||s,s&&a(function(){a("head link[rel='stylesheet']").attr("rel","alternate stylesheet").attr("rel","stylesheet")}),a.support.boxShadow||a("html").addClass("ui-mobile-nosupport-boxshadow")}(a),function(a,b){var c=a.mobile.window,d,e;a.event.special.navigate=d={bound:!1,pushStateEnabled:!0,originalEventName:b,isPushStateEnabled:function(){return a.support.pushState&&a.mobile.pushStateEnabled===!0&&this.isHashChangeEnabled()},isHashChangeEnabled:function(){return a.mobile.hashListeningEnabled===!0},popstate:function(b){var d=new a.Event("navigate"),e=new a.Event("beforenavigate"),f=b.originalEvent.state||{},g=location.href;c.trigger(e);if(e.isDefaultPrevented())return;b.historyState&&a.extend(f,b.historyState),d.originalEvent=b,setTimeout(function(){c.trigger(d,{state:f})},0)},hashchange:function(b,d){var e=new a.Event("navigate"),f=new a.Event("beforenavigate");c.trigger(f);if(f.isDefaultPrevented())return;e.originalEvent=b,c.trigger(e,{state:b.hashchangeState||{}})},setup:function(a,b){if(d.bound)return;d.bound=!0,d.isPushStateEnabled()?(d.originalEventName="popstate",c.bind("popstate.navigate",d.popstate)):d.isHashChangeEnabled()&&(d.originalEventName="hashchange",c.bind("hashchange.navigate",d.hashchange))}}}(a),function(a,c){var d,e,f,g="&ui-state=dialog";a.mobile.path=d={uiStateKey:"&ui-state",urlParseRE:/^\s*(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,getLocation:function(a){var b=a?this.parseUrl(a):location,c=this.parseUrl(a||location.href).hash;return c=c==="#"?"":c,b.protocol+"//"+b.host+b.pathname+b.search+c},parseLocation:function(){return this.parseUrl(this.getLocation())},parseUrl:function(b){if(a.type(b)==="object")return b;var c=d.urlParseRE.exec(b||"")||[];return{href:c[0]||"",hrefNoHash:c[1]||"",hrefNoSearch:c[2]||"",domain:c[3]||"",protocol:c[4]||"",doubleSlash:c[5]||"",authority:c[6]||"",username:c[8]||"",password:c[9]||"",host:c[10]||"",hostname:c[11]||"",port:c[12]||"",pathname:c[13]||"",directory:c[14]||"",filename:c[15]||"",search:c[16]||"",hash:c[17]||""}},makePathAbsolute:function(a,b){if(a&&a.charAt(0)==="/")return a;a=a||"",b=b?b.replace(/^\/|(\/[^\/]*|[^\/]+)$/g,""):"";var c=b?b.split("/"):[],d=a.split("/");for(var e=0;e<d.length;e++){var f=d[e];switch(f){case".":break;case"..":c.length&&c.pop();break;default:c.push(f)}}return"/"+c.join("/")},isSameDomain:function(a,b){return d.parseUrl(a).domain===d.parseUrl(b).domain},isRelativeUrl:function(a){return d.parseUrl(a).protocol===""},isAbsoluteUrl:function(a){return d.parseUrl(a).protocol!==""},makeUrlAbsolute:function(a,b){if(!d.isRelativeUrl(a))return a;b===c&&(b=this.documentBase);var e=d.parseUrl(a),f=d.parseUrl(b),g=e.protocol||f.protocol,h=e.protocol?e.doubleSlash:e.doubleSlash||f.doubleSlash,i=e.authority||f.authority,j=e.pathname!=="",k=d.makePathAbsolute(e.pathname||f.filename,f.pathname),l=e.search||!j&&f.search||"",m=e.hash;return g+h+i+k+l+m},addSearchParams:function(b,c){var e=d.parseUrl(b),f=typeof c=="object"?a.param(c):c,g=e.search||"?";return e.hrefNoSearch+g+(g.charAt(g.length-1)!=="?"?"&":"")+f+(e.hash||"")},convertUrlToDataUrl:function(a){var c=d.parseUrl(a);return d.isEmbeddedPage(c)?c.hash.split(g)[0].replace(/^#/,"").replace(/\?.*$/,""):d.isSameDomain(c,this.documentBase)?c.hrefNoHash.replace(this.documentBase.domain,"").split(g)[0]:b.decodeURIComponent(a)},get:function(a){return a===c&&(a=d.parseLocation().hash),d.stripHash(a).replace(/[^\/]*\.[^\/*]+$/,"")},set:function(a){location.hash=a},isPath:function(a){return/\//.test(a)},clean:function(a){return a.replace(this.documentBase.domain,"")},stripHash:function(a){return a.replace(/^#/,"")},stripQueryParams:function(a){return a.replace(/\?.*$/,"")},cleanHash:function(a){return d.stripHash(a.replace(/\?.*$/,"").replace(g,""))},isHashValid:function(a){return/^#[^#]+$/.test(a)},isExternal:function(a){var b=d.parseUrl(a);return b.protocol&&b.domain!==this.documentUrl.domain?!0:!1},hasProtocol:function(a){return/^(:?\w+:)/.test(a)},isEmbeddedPage:function(a){var b=d.parseUrl(a);return b.protocol!==""?!this.isPath(b.hash)&&b.hash&&(b.hrefNoHash===this.documentUrl.hrefNoHash||this.documentBaseDiffers&&b.hrefNoHash===this.documentBase.hrefNoHash):/^#/.test(b.href)},squash:function(a,b){var c,e,f,g,h,i=this.isPath(a),j=this.parseUrl(a),k=j.hash,l="";b=b||(d.isPath(a)?d.getLocation():d.getDocumentUrl()),f=i?d.stripHash(a):a,f=d.isPath(j.hash)?d.stripHash(j.hash):f,h=f.indexOf(this.uiStateKey),h>-1&&(l=f.slice(h),f=f.slice(0,h)),e=d.makeUrlAbsolute(f,b),g=this.parseUrl(e).search;if(i){if(d.isPath(k)||k.replace("#","").indexOf(this.uiStateKey)===0)k="";l&&k.indexOf(this.uiStateKey)===-1&&(k+=l),k.indexOf("#")===-1&&k!==""&&(k="#"+k),e=d.parseUrl(e),e=e.protocol+"//"+e.host+e.pathname+g+k}else e+=e.indexOf("#")>-1?l:"#"+l;return e},isPreservableHash:function(a){return a.replace("#","").indexOf(this.uiStateKey)===0}},d.documentUrl=d.parseLocation(),f=a("head").find("base"),d.documentBase=f.length?d.parseUrl(d.makeUrlAbsolute(f.attr("href"),d.documentUrl.href)):d.documentUrl,d.documentBaseDiffers=d.documentUrl.hrefNoHash!==d.documentBase.hrefNoHash,d.getDocumentUrl=function(b){return b?a.extend({},d.documentUrl):d.documentUrl.href},d.getDocumentBase=function(b){return b?a.extend({},d.documentBase):d.documentBase.href}}(a),function(a,b){var c=a.mobile.path;a.mobile.History=function(a,b){this.stack=a||[],this.activeIndex=b||0},a.extend(a.mobile.History.prototype,{getActive:function(){return this.stack[this.activeIndex]},getLast:function(){return this.stack[this.previousIndex]},getNext:function(){return this.stack[this.activeIndex+1]},getPrev:function(){return this.stack[this.activeIndex-1]},add:function(a,b){b=b||{},this.getNext()&&this.clearForward(),b.hash&&b.hash.indexOf("#")===-1&&(b.hash="#"+b.hash),b.url=a,this.stack.push(b),this.activeIndex=this.stack.length-1},clearForward:function(){this.stack=this.stack.slice(0,this.activeIndex+1)},find:function(a,b,c){b=b||this.stack;var d,e,f=b.length,g;for(e=0;e<f;e++){d=b[e];if(decodeURIComponent(a)===decodeURIComponent(d.url)||decodeURIComponent(a)===decodeURIComponent(d.hash)){g=e;if(c)return g}}return g},closest:function(a){var c,d=this.activeIndex;return c=this.find(a,this.stack.slice(0,d)),c===b&&(c=this.find(a,this.stack.slice(d),!0),c=c===b?c:c+d),c},direct:function(c){var d=this.closest(c.url),e=this.activeIndex;d!==b&&(this.activeIndex=d,this.previousIndex=e),d<e?(c.present||c.back||a.noop)(this.getActive(),"back"):d>e?(c.present||c.forward||a.noop)(this.getActive(),"forward"):d===b&&c.missing&&c.missing(this.getActive())}})}(a),function(a,d){var e=a.mobile.path;a.mobile.Navigator=function(b){this.history=b,this.ignoreInitialHashChange=!0,setTimeout(a.proxy(function(){this.ignoreInitialHashChange=!1},this),200),a.mobile.window.bind({"popstate.history":a.proxy(this.popstate,this),"hashchange.history":a.proxy(this.hashchange,this)})},a.extend(a.mobile.Navigator.prototype,{squash:function(d,f){var g,h,i=e.isPath(d)?e.stripHash(d):d;return h=e.squash(d),g=a.extend({hash:i,url:h},f),b.history.replaceState(g,g.title||c.title,h),g},hash:function(a,b){var c,d,f;c=e.parseUrl(a),d=e.parseLocation();if(d.pathname+d.search===c.pathname+c.search)f=c.hash?c.hash:c.pathname+c.search;else if(e.isPath(a)){var g=e.parseUrl(b);f=g.pathname+g.search+(e.isPreservableHash(g.hash)?g.hash.replace("#",""):"")}else f=a;return f},go:function(d,f,g){var h,i,j,k,l=a.event.special.navigate.isPushStateEnabled();i=e.squash(d),j=this.hash(d,i),g&&j!==e.stripHash(e.parseLocation().hash)&&(this.preventNextHashChange=g),this.preventHashAssignPopState=!0,b.location.hash=j,this.preventHashAssignPopState=!1,h=a.extend({url:i,hash:j,title:c.title},f),l&&(k=new a.Event("popstate"),k.originalEvent={type:"popstate",state:null},this.squash(d,h),g||(this.ignorePopState=!0,a.mobile.window.trigger(k))),this.history.add(h.url,h)},popstate:function(b){var c,d,f,g;if(!a.event.special.navigate.isPushStateEnabled())return;if(this.preventHashAssignPopState){this.preventHashAssignPopState=!1,b.stopImmediatePropagation();return}if(this.ignorePopState){this.ignorePopState=!1;return}if(!b.originalEvent.state&&this.history.stack.length===1&&this.ignoreInitialHashChange){this.ignoreInitialHashChange=!1;return}d=e.parseLocation().hash;if(!b.originalEvent.state&&d){f=this.squash(d),this.history.add(f.url,f),b.historyState=f;return}this.history.direct({url:(b.originalEvent.state||{}).url||d,present:function(c,d){b.historyState=a.extend({},c),b.historyState.direction=d}})},hashchange:function(b){var d,f;if(!a.event.special.navigate.isHashChangeEnabled()||a.event.special.navigate.isPushStateEnabled())return;if(this.preventNextHashChange){this.preventNextHashChange=!1,b.stopImmediatePropagation();return}d=this.history,f=e.parseLocation().hash,this.history.direct({url:f,present:function(c,d){b.hashchangeState=a.extend({},c),b.hashchangeState.direction=d},missing:function(){d.add(f,{hash:f,title:c.title})}})}})}(a),function(a,b){a.mobile.navigate=function(b,c,d){a.mobile.navigate.navigator.go(b,c,d)},a.mobile.navigate.history=new a.mobile.History,a.mobile.navigate.navigator=new a.mobile.Navigator(a.mobile.navigate.history);var c=a.mobile.path.parseLocation();a.mobile.navigate.history.add(c.href,{hash:c.hash})}(a),function(a,b,c,d){function x(a){while(a&&typeof a.originalEvent!="undefined")a=a.originalEvent;return a}function y(b,c){var e=b.type,f,g,i,k,l,m,n,o,p;b=a.Event(b),b.type=c,f=b.originalEvent,g=a.event.props,e.search(/^(mouse|click)/)>-1&&(g=j);if(f)for(n=g.length,k;n;)k=g[--n],b[k]=f[k];e.search(/mouse(down|up)|click/)>-1&&!b.which&&(b.which=1);if(e.search(/^touch/)!==-1){i=x(f),e=i.touches,l=i.changedTouches,m=e&&e.length?e[0]:l&&l.length?l[0]:d;if(m)for(o=0,p=h.length;o<p;o++)k=h[o],b[k]=m[k]}return b}function z(b){var c={},d,f;while(b){d=a.data(b,e);for(f in d)d[f]&&(c[f]=c.hasVirtualBinding=!0);b=b.parentNode}return c}function A(b,c){var d;while(b){d=a.data(b,e);if(d&&(!c||d[c]))return b;b=b.parentNode}return null}function B(){r=!1}function C(){r=!0}function D(){v=0,p.length=0,q=!1,C()}function E(){B()}function F(){G(),l=setTimeout(function(){l=0,D()},a.vmouse.resetTimerDuration)}function G(){l&&(clearTimeout(l),l=0)}function H(b,c,d){var e;if(d&&d[b]||!d&&A(c.target,b))e=y(c,b),a(c.target).trigger(e);return e}function I(b){var c=a.data(b.target,f);if(!q&&(!v||v!==c)){var d=H("v"+b.type,b);d&&(d.isDefaultPrevented()&&b.preventDefault(),d.isPropagationStopped()&&b.stopPropagation(),d.isImmediatePropagationStopped()&&b.stopImmediatePropagation())}}function J(b){var c=x(b).touches,d,e;if(c&&c.length===1){d=b.target,e=z(d);if(e.hasVirtualBinding){v=u++,a.data(d,f,v),G(),E(),o=!1;var g=x(b).touches[0];m=g.pageX,n=g.pageY,H("vmouseover",b,e),H("vmousedown",b,e)}}}function K(a){if(r)return;o||H("vmousecancel",a,z(a.target)),o=!0,F()}function L(b){if(r)return;var c=x(b).touches[0],d=o,e=a.vmouse.moveDistanceThreshold,f=z(b.target);o=o||Math.abs(c.pageX-m)>e||Math.abs(c.pageY-n)>e,o&&!d&&H("vmousecancel",b,f),H("vmousemove",b,f),F()}function M(a){if(r)return;C();var b=z(a.target),c;H("vmouseup",a,b);if(!o){var d=H("vclick",a,b);d&&d.isDefaultPrevented()&&(c=x(a).changedTouches[0],p.push({touchID:v,x:c.clientX,y:c.clientY}),q=!0)}H("vmouseout",a,b),o=!1,F()}function N(b){var c=a.data(b,e),d;if(c)for(d in c)if(c[d])return!0;return!1}function O(){}function P(b){var c=b.substr(1);return{setup:function(d,f){N(this)||a.data(this,e,{});var g=a.data(this,e);g[b]=!0,k[b]=(k[b]||0)+1,k[b]===1&&t.bind(c,I),a(this).bind(c,O),s&&(k.touchstart=(k.touchstart||0)+1,k.touchstart===1&&t.bind("touchstart",J).bind("touchend",M).bind("touchmove",L).bind("scroll",K))},teardown:function(d,f){--k[b],k[b]||t.unbind(c,I),s&&(--k.touchstart,k.touchstart||t.unbind("touchstart",J).unbind("touchmove",L).unbind("touchend",M).unbind("scroll",K));var g=a(this),h=a.data(this,e);h&&(h[b]=!1),g.unbind(c,O),N(this)||g.removeData(e)}}}var e="virtualMouseBindings",f="virtualTouchID",g="vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),h="clientX clientY pageX pageY screenX screenY".split(" "),i=a.event.mouseHooks?a.event.mouseHooks.props:[],j=a.event.props.concat(i),k={},l=0,m=0,n=0,o=!1,p=[],q=!1,r=!1,s="addEventListener"in c,t=a(c),u=1,v=0,w;a.vmouse={moveDistanceThreshold:10,clickDistanceThreshold:10,resetTimerDuration:1500};for(var Q=0;Q<g.length;Q++)a.event.special[g[Q]]=P(g[Q]);s&&c.addEventListener("click",function(b){var c=p.length,d=b.target,e,g,h,i,j,k;if(c){e=b.clientX,g=b.clientY,w=a.vmouse.clickDistanceThreshold,h=d;while(h){for(i=0;i<c;i++){j=p[i],k=0;if(h===d&&Math.abs(j.x-e)<w&&Math.abs(j.y-g)<w||a.data(h,f)===j.touchID){b.preventDefault(),b.stopPropagation();return}}h=h.parentNode}}},!0)}(a,b,c),function(a,b,d){function k(b,c,d){var e=d.type;d.type=c,a.event.dispatch.call(b,d),d.type=e}var e=a(c);a.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "),function(b,c){a.fn[c]=function(a){return a?this.bind(c,a):this.trigger(c)},a.attrFn&&(a.attrFn[c]=!0)});var f=a.mobile.support.touch,g="touchmove scroll",h=f?"touchstart":"mousedown",i=f?"touchend":"mouseup",j=f?"touchmove":"mousemove";a.event.special.scrollstart={enabled:!0,setup:function(){function f(a,c){d=c,k(b,d?"scrollstart":"scrollstop",a)}var b=this,c=a(b),d,e;c.bind(g,function(b){if(!a.event.special.scrollstart.enabled)return;d||f(b,!0),clearTimeout(e),e=setTimeout(function(){f(b,!1)},50)})}},a.event.special.tap={tapholdThreshold:750,setup:function(){var b=this,c=a(b);c.bind("vmousedown",function(d){function i(){clearTimeout(h)}function j(){i(),c.unbind("vclick",l).unbind("vmouseup",i),e.unbind("vmousecancel",j)}function l(a){j(),f===a.target&&k(b,"tap",a)}if(d.which&&d.which!==1)return!1;var f=d.target,g=d.originalEvent,h;c.bind("vmouseup",i).bind("vclick",l),e.bind("vmousecancel",j),h=setTimeout(function(){k(b,"taphold",a.Event("taphold",{target:f}))},a.event.special.tap.tapholdThreshold)})}},a.event.special.swipe={scrollSupressionThreshold:30,durationThreshold:1e3,horizontalDistanceThreshold:30,verticalDistanceThreshold:75,start:function(b){var c=b.originalEvent.touches?b.originalEvent.touches[0]:b;return{time:(new Date).getTime(),coords:[c.pageX,c.pageY],origin:a(b.target)}},stop:function(a){var b=a.originalEvent.touches?a.originalEvent.touches[0]:a;return{time:(new Date).getTime(),coords:[b.pageX,b.pageY]}},handleSwipe:function(b,c){c.time-b.time<a.event.special.swipe.durationThreshold&&Math.abs(b.coords[0]-c.coords[0])>a.event.special.swipe.horizontalDistanceThreshold&&Math.abs(b.coords[1]-c.coords[1])<a.event.special.swipe.verticalDistanceThreshold&&b.origin.trigger("swipe").trigger(b.coords[0]>c.coords[0]?"swipeleft":"swiperight")},setup:function(){var b=this,c=a(b);c.bind(h,function(b){function g(b){if(!e)return;f=a.event.special.swipe.stop(b),Math.abs(e.coords[0]-f.coords[0])>a.event.special.swipe.scrollSupressionThreshold&&b.preventDefault()}var e=a.event.special.swipe.start(b),f;c.bind(j,g).one(i,function(){c.unbind(j,g),e&&f&&a.event.special.swipe.handleSwipe(e,f),e=f=d})})}},a.each({scrollstop:"scrollstart",taphold:"tap",swipeleft:"swipe",swiperight:"swipe"},function(b,c){a.event.special[b]={setup:function(){a(this).bind(c,a.noop)}}})}(a,this),function(a){a.event.special.throttledresize={setup:function(){a(this).bind("resize",c)},teardown:function(){a(this).unbind("resize",c)}};var b=250,c=function(){f=(new Date).getTime(),g=f-d,g>=b?(d=f,a(this).trigger("throttledresize")):(e&&clearTimeout(e),e=setTimeout(c,b-g))},d=0,e,f,g}(a),function(a,b){function o(){var a=g();a!==h&&(h=a,d.trigger(e))}var d=a(b),e="orientationchange",f,g,h,i,j,k={0:!0,180:!0};if(a.support.orientation){var l=b.innerWidth||d.width(),m=b.innerHeight||d.height(),n=50;i=l>m&&l-m>n,j=k[b.orientation];if(i&&j||!i&&!j)k={"-90":!0,90:!0}}a.event.special.orientationchange=a.extend({},a.event.special.orientationchange,{setup:function(){if(a.support.orientation&&!a.event.special.orientationchange.disabled)return!1;h=g(),d.bind("throttledresize",o)},teardown:function(){if(a.support.orientation&&!a.event.special.orientationchange.disabled)return!1;d.unbind("throttledresize",o)},add:function(a){var b=a.handler;a.handler=function(a){return a.orientation=g(),b.apply(this,arguments)}}}),a.event.special.orientationchange.orientation=g=function(){var d=!0,e=c.documentElement;return a.support.orientation?d=k[b.orientation]:d=e&&e.clientWidth/e.clientHeight<1.1,d?"portrait":"landscape"},a.fn[e]=function(a){return a?this.bind(e,a):this.trigger(e)},a.attrFn&&(a.attrFn[e]=!0)}(a,this),function(a,b){a.widget("mobile.page",a.mobile.widget,{options:{theme:"c",domCache:!1,keepNativeDefault:":jqmData(role='none'), :jqmData(role='nojs')"},_create:function(){if(this._trigger("beforecreate")===!1)return!1;this.element.attr("tabindex","0").addClass("ui-page ui-body-"+this.options.theme),this._on(this.element,{pagebeforehide:"removeContainerBackground",pagebeforeshow:"_handlePageBeforeShow"})},_handlePageBeforeShow:function(a){this.setContainerBackground()},removeContainerBackground:function(){a.mobile.pageContainer.removeClass("ui-overlay-"+a.mobile.getInheritedTheme(this.element.parent()))},setContainerBackground:function(b){this.options.theme&&a.mobile.pageContainer.addClass("ui-overlay-"+(b||this.options.theme))},keepNativeSelector:function(){var b=this.options,c=b.keepNative&&a.trim(b.keepNative);return c&&b.keepNative!==b.keepNativeDefault?[b.keepNative,b.keepNativeDefault].join(", "):b.keepNativeDefault}})}(a),function(a,b,c){var d=function(d){return d===c&&(d=!0),function(c,e,f,g){var h=new a.Deferred,i=e?" reverse":"",j=a.mobile.urlHistory.getActive(),k=j.lastScroll||a.mobile.defaultHomeScroll,l=a.mobile.getScreenHeight(),m=a.mobile.maxTransitionWidth!==!1&&a.mobile.window.width()>a.mobile.maxTransitionWidth,n=!a.support.cssTransitions||m||!c||c==="none"||Math.max(a.mobile.window.scrollTop(),k)>a.mobile.getMaxScrollForTransition(),o=" ui-page-pre-in",p=function(){a.mobile.pageContainer.toggleClass("ui-mobile-viewport-transitioning viewport-"+c)},q=function(){a.event.special.scrollstart.enabled=!1,b.scrollTo(0,k),setTimeout(function(){a.event.special.scrollstart.enabled=!0},150)},r=function(){g.removeClass(a.mobile.activePageClass+" out in reverse "+c).height("")},s=function(){d?g.animationComplete(t):t(),g.height(l+a.mobile.window.scrollTop()).addClass(c+" out"+i)},t=function(){g&&d&&r(),u()},u=function(){f.css("z-index",-10),f.addClass(a.mobile.activePageClass+o),a.mobile.focusPage(f),f.height(l+k),q(),f.css("z-index",""),n||f.animationComplete(v),f.removeClass(o).addClass(c+" in"+i),n&&v()},v=function(){d||g&&r(),f.removeClass("out in reverse "+c).height(""),p(),a.mobile.window.scrollTop()!==k&&q(),h.resolve(c,e,f,g,!0)};return p(),g&&!n?s():t(),h.promise()}},e=d(),f=d(!1),g=function(){return a.mobile.getScreenHeight()*3};a.mobile.defaultTransitionHandler=e,a.mobile.transitionHandlers={"default":a.mobile.defaultTransitionHandler,sequential:e,simultaneous:f},a.mobile.transitionFallbacks={},a.mobile._maybeDegradeTransition=function(b){return b&&!a.support.cssTransform3d&&a.mobile.transitionFallbacks[b]&&(b=a.mobile.transitionFallbacks[b]),b},a.mobile.getMaxScrollForTransition=a.mobile.getMaxScrollForTransition||g}(a,this),function(a,d){function w(b){!!j&&(!j.closest("."+a.mobile.activePageClass).length||b)&&j.removeClass(a.mobile.activeBtnClass),j=null}function x(){o=!1,n.length>0&&a.mobile.changePage.apply(null,n.pop())}function B(b,c,d,e){c&&c.data("mobile-page")._trigger("beforehide",null,{nextPage:b}),b.data("mobile-page")._trigger("beforeshow",null,{prevPage:c||a("")}),a.mobile.hidePageLoadingMsg(),d=a.mobile._maybeDegradeTransition(d);var f=a.mobile.transitionHandlers[d||"default"]||a.mobile.defaultTransitionHandler,g=f(d,e,b,c);return g.done(function(){c&&c.data("mobile-page")._trigger("hide",null,{nextPage:b}),b.data("mobile-page")._trigger("show",null,{prevPage:c||a("")})}),g}function C(b,c){c&&b.attr("data-"+a.mobile.ns+"role",c),b.page()}function D(){var b=a.mobile.activePage&&F(a.mobile.activePage);return b||s.hrefNoHash}function E(a){while(a){if(typeof a.nodeName=="string"&&a.nodeName.toLowerCase()==="a")break;a=a.parentNode}return a}function F(b){var c=a(b).closest(".ui-page").jqmData("url"),d=s.hrefNoHash;if(!c||!h.isPath(c))c=d;return h.makeUrlAbsolute(c,d)}var e=a.mobile.window,f=a("html"),g=a("head"),h=a.extend(a.mobile.path,{getFilePath:function(b){var c="&"+a.mobile.subPageUrlKey;return b&&b.split(c)[0].split(p)[0]},isFirstPageUrl:function(b){var c=h.parseUrl(h.makeUrlAbsolute(b,this.documentBase)),e=c.hrefNoHash===this.documentUrl.hrefNoHash||this.documentBaseDiffers&&c.hrefNoHash===this.documentBase.hrefNoHash,f=a.mobile.firstPage,g=f&&f[0]?f[0].id:d;return e&&(!c.hash||c.hash==="#"||g&&c.hash.replace(/^#/,"")===g)},isPermittedCrossDomainRequest:function(b,c){return a.mobile.allowCrossDomainPages&&b.protocol==="file:"&&c.search(/^https?:/)!==-1}}),i=null,j=null,k=a.Deferred(),l=a.mobile.navigate.history,m="[tabindex],a,button:visible,select:visible,input",n=[],o=!1,p="&ui-state=dialog",q=g.children("base"),r=h.documentUrl,s=h.documentBase,t=h.documentBaseDiffers,u=a.mobile.getScreenHeight,v=a.support.dynamicBaseTag?{element:q.length?q:a("<base>",{href:s.hrefNoHash}).prependTo(g),set:function(a){a=h.parseUrl(a).hrefNoHash,v.element.attr("href",h.makeUrlAbsolute(a,s))},reset:function(){v.element.attr("href",s.hrefNoSearch)}}:d;a.mobile.getDocumentUrl=h.getDocumentUrl,a.mobile.getDocumentBase=h.getDocumentBase,a.mobile.back=function(){var a=b.navigator;this.phonegapNavigationEnabled&&a&&a.app&&a.app.backHistory?a.app.backHistory():b.history.back()},a.mobile.focusPage=function(a){var b=a.find("[autofocus]"),c=a.find(".ui-title:eq(0)");if(b.length){b.focus();return}c.length?c.focus():a.focus()};var y=!0,z,A;z=function(){if(!y)return;var b=a.mobile.urlHistory.getActive();if(b){var c=e.scrollTop();b.lastScroll=c<a.mobile.minScrollBack?a.mobile.defaultHomeScroll:c}},A=function(){setTimeout(z,100)},e.bind(a.support.pushState?"popstate":"hashchange",function(){y=!1}),e.one(a.support.pushState?"popstate":"hashchange",function(){y=!0}),e.one("pagecontainercreate",function(){a.mobile.pageContainer.bind("pagechange",function(){y=!0,e.unbind("scrollstop",A),e.bind("scrollstop",A)})}),e.bind("scrollstop",A),a.mobile._maybeDegradeTransition=a.mobile._maybeDegradeTransition||function(a){return a},a.mobile.resetActivePageHeight=function(b){var c=a("."+a.mobile.activePageClass),d=parseFloat(c.css("padding-top")),e=parseFloat(c.css("padding-bottom")),f=parseFloat(c.css("border-top-width")),g=parseFloat(c.css("border-bottom-width"));b=typeof b=="number"?b:u(),c.css("min-height",b-d-e-f-g)},a.fn.animationComplete=function(b){return a.support.cssTransitions?a(this).one("webkitAnimationEnd animationend",b):(setTimeout(b,0),a(this))},a.mobile.path=h,a.mobile.base=v,a.mobile.urlHistory=l,a.mobile.dialogHashKey=p,a.mobile.allowCrossDomainPages=!1,a.mobile._bindPageRemove=function(){var b=a(this);!b.data("mobile-page").options.domCache&&b.is(":jqmData(external-page='true')")&&b.bind("pagehide.remove",function(b){var c=a(this),d=new a.Event("pageremove");c.trigger(d),d.isDefaultPrevented()||c.removeWithDependents()})},a.mobile.loadPage=function(b,c){var e=a.Deferred(),f=a.extend({},a.mobile.loadPage.defaults,c),g=null,i=null,j=h.makeUrlAbsolute(b,D());f.data&&f.type==="get"&&(j=h.addSearchParams(j,f.data),f.data=d),f.data&&f.type==="post"&&(f.reloadPage=!0);var k=h.getFilePath(j),l=h.convertUrlToDataUrl(j);f.pageContainer=f.pageContainer||a.mobile.pageContainer,g=f.pageContainer.children("[data-"+a.mobile.ns+"url='"+l+"']"),g.length===0&&l&&!h.isPath(l)&&(g=f.pageContainer.children("#"+l).attr("data-"+a.mobile.ns+"url",l).jqmData("url",l));if(g.length===0)if(a.mobile.firstPage&&h.isFirstPageUrl(k))a.mobile.firstPage.parent().length&&(g=a(a.mobile.firstPage));else if(h.isEmbeddedPage(k))return e.reject(j,c),e.promise();if(g.length){if(!f.reloadPage)return C(g,f.role),e.resolve(j,c,g),e.promise();i=g}var m=f.pageContainer,n=new a.Event("pagebeforeload"),o={url:b,absUrl:j,dataUrl:l,deferred:e,options:f};m.trigger(n,o);if(n.isDefaultPrevented())return e.promise();if(f.showLoadMsg)var p=setTimeout(function(){a.mobile.showPageLoadingMsg()},f.loadMsgDelay),q=function(){clearTimeout(p),a.mobile.hidePageLoadingMsg()};return v&&v.reset(),!a.mobile.allowCrossDomainPages&&!h.isSameDomain(r,j)?e.reject(j,c):a.ajax({url:k,type:f.type,data:f.data,dataType:"html",success:function(d,m,n){var p=a("<div></div>"),r=d.match(/<title[^>]*>([^<]*)/)&&RegExp.$1,s=new RegExp("(<[^>]+\\bdata-"+a.mobile.ns+"role=[\"']?page[\"']?[^>]*>)"),t=new RegExp("\\bdata-"+a.mobile.ns+"url=[\"']?([^\"'>]*)[\"']?");s.test(d)&&RegExp.$1&&t.test(RegExp.$1)&&RegExp.$1&&(b=k=h.getFilePath(a("<div>"+RegExp.$1+"</div>").text())),v&&v.set(k),p.get(0).innerHTML=d,g=p.find(":jqmData(role='page'), :jqmData(role='dialog')").first(),g.length||(g=a("<div data-"+a.mobile.ns+"role='page'>"+(d.split(/<\/?body[^>]*>/gmi)[1]||"")+"</div>")),r&&!g.jqmData("title")&&(~r.indexOf("&")&&(r=a("<div>"+r+"</div>").text()),g.jqmData("title",r));if(!a.support.dynamicBaseTag){var u=h.get(k);g.find("[src], link[href], a[rel='external'], :jqmData(ajax='false'), a[target]").each(function(){var b=a(this).is("[href]")?"href":a(this).is("[src]")?"src":"action",c=a(this).attr(b);c=c.replace(location.protocol+"//"+location.host+location.pathname,""),/^(\w+:|#|\/)/.test(c)||a(this).attr(b,u+c)})}g.attr("data-"+a.mobile.ns+"url",h.convertUrlToDataUrl(k)).attr("data-"+a.mobile.ns+"external-page",!0).appendTo(f.pageContainer),g.one("pagecreate",a.mobile._bindPageRemove),C(g,f.role),j.indexOf("&"+a.mobile.subPageUrlKey)>-1&&(g=f.pageContainer.children("[data-"+a.mobile.ns+"url='"+l+"']")),f.showLoadMsg&&q(),o.xhr=n,o.textStatus=m,o.page=g,f.pageContainer.trigger("pageload",o),e.resolve(j,c,g,i)},error:function(b,d,g){v&&v.set(h.get()),o.xhr=b,o.textStatus=d,o.errorThrown=g;var i=new a.Event("pageloadfailed");f.pageContainer.trigger(i,o);if(i.isDefaultPrevented())return;f.showLoadMsg&&(q(),a.mobile.showPageLoadingMsg(a.mobile.pageLoadErrorMessageTheme,a.mobile.pageLoadErrorMessage,!0),setTimeout(a.mobile.hidePageLoadingMsg,1500)),e.reject(j,c)}}),e.promise()},a.mobile.loadPage.defaults={type:"get",data:d,reloadPage:!1,role:d,showLoadMsg:!1,pageContainer:d,loadMsgDelay:50},a.mobile.changePage=function(b,e){if(o){n.unshift(arguments);return}var f=a.extend({},a.mobile.changePage.defaults,e),g;f.pageContainer=f.pageContainer||a.mobile.pageContainer,f.fromPage=f.fromPage||a.mobile.activePage,g=typeof b=="string";var i=f.pageContainer,j=new a.Event("pagebeforechange"),k={toPage:b,options:f};g?k.absUrl=h.makeUrlAbsolute(b,D()):k.absUrl=b.data("absUrl"),i.trigger(j,k);if(j.isDefaultPrevented())return;b=k.toPage,g=typeof b=="string",o=!0;if(g){f.target=b,a.mobile.loadPage(b,f).done(function(b,c,d,e){o=!1,c.duplicateCachedPage=e,d.data("absUrl",k.absUrl),a.mobile.changePage(d,c)}).fail(function(a,b){o=!1,w(!0),x(),f.pageContainer.trigger("pagechangefailed",k)});return}b[0]===a.mobile.firstPage[0]&&!f.dataUrl&&(f.dataUrl=r.hrefNoHash);var m=f.fromPage,q=f.dataUrl&&h.convertUrlToDataUrl(f.dataUrl)||b.jqmData("url"),s=q,t=h.getFilePath(q),u=l.getActive(),v=l.activeIndex===0,y=0,z=c.title,A=f.role==="dialog"||b.jqmData("role")==="dialog";if(m&&m[0]===b[0]&&!f.allowSamePageTransition){o=!1,i.trigger("pagechange",k),f.fromHashChange&&l.direct({url:q});return}C(b,f.role),f.fromHashChange&&(y=e.direction==="back"?-1:1);try{c.activeElement&&c.activeElement.nodeName.toLowerCase()!=="body"?a(c.activeElement).blur():a("input:focus, textarea:focus, select:focus").blur()}catch(E){}var F=!1;A&&u&&(u.url&&u.url.indexOf(p)>-1&&a.mobile.activePage&&!a.mobile.activePage.is(".ui-dialog")&&l.activeIndex>0&&(f.changeHash=!1,F=!0),q=u.url||"",!F&&q.indexOf("#")>-1?q+=p:q+="#"+p,l.activeIndex===0&&q===l.initialDst&&(q+=p));var G=u?b.jqmData("title")||b.children(":jqmData(role='header')").find(".ui-title").getEncodedText():z;!!G&&z===c.title&&(z=G),b.jqmData("title")||b.jqmData("title",z),f.transition=f.transition||(y&&!v?u.transition:d)||(A?a.mobile.defaultDialogTransition:a.mobile.defaultPageTransition),!y&&F&&(l.getActive().pageUrl=s);if(q&&!f.fromHashChange){var H;!h.isPath(q)&&q.indexOf("#")<0&&(q="#"+q),H={transition:f.transition,title:z,pageUrl:s,role:f.role},f.changeHash!==!1&&a.mobile.hashListeningEnabled?a.mobile.navigate(q,H,!0):b[0]!==a.mobile.firstPage[0]&&a.mobile.navigate.history.add(q,H)}c.title=z,a.mobile.activePage=b,f.reverse=f.reverse||y<0,B(b,m,f.transition,f.reverse).done(function(c,d,e,g,h){w(),f.duplicateCachedPage&&f.duplicateCachedPage.remove(),h||a.mobile.focusPage(b),x(),i.trigger("pagechange",k)})},a.mobile.changePage.defaults={transition:d,reverse:!1,changeHash:!0,fromHashChange:!1,role:d,duplicateCachedPage:d,pageContainer:d,showLoadMsg:!0,dataUrl:d,fromPage:d,allowSamePageTransition:!1},a.mobile.navreadyDeferred=a.Deferred(),a.mobile._registerInternalEvents=function(){var c=function(b,c){var d,e,f,g=!0,j,k;return!a.mobile.ajaxEnabled||b.is(":jqmData(ajax='false')")||!b.jqmHijackable().length?!1:(e=b.attr("target"),f=b.attr("action"),f||(f=F(b),f===s.hrefNoHash&&(f=r.hrefNoSearch)),f=h.makeUrlAbsolute(f,F(b)),h.isExternal(f)&&!h.isPermittedCrossDomainRequest(r,f)||e?!1:(c||(d=b.attr("method"),j=b.serializeArray(),i&&i[0].form===b[0]&&(k=i.attr("name"),k&&(a.each(j,function(a,b){if(b.name===k)return k="",!1}),k&&j.push({name:k,value:i.attr("value")}))),g={url:f,options:{type:d&&d.length&&d.toLowerCase()||"get",data:a.param(j),transition:b.jqmData("transition"),reverse:b.jqmData("direction")==="reverse",reloadPage:!0}}),g))};a.mobile.document.delegate("form","submit",function(b){var d=c(a(this));d&&(a.mobile.changePage(d.url,d.options),b.preventDefault())}),a.mobile.document.bind("vclick",function(b){var d,e,f=b.target,g=!1;if(b.which>1||!a.mobile.linkBindingEnabled)return;i=a(f);if(a.data(f,"mobile-button")){if(!c(a(f).closest("form"),!0))return;f.parentNode&&(f=f.parentNode)}else{f=E(f);if(!f||h.parseUrl(f.getAttribute("href")||"#").hash==="#")return;if(!a(f).jqmHijackable().length)return}~f.className.indexOf("ui-link-inherit")?f.parentNode&&(e=a.data(f.parentNode,"buttonElements")):e=a.data(f,"buttonElements"),e?f=e.outer:g=!0,d=a(f),g&&(d=d.closest(".ui-btn")),d.length>0&&!d.hasClass("ui-disabled")&&(w(!0),j=d,j.addClass(a.mobile.activeBtnClass))}),a.mobile.document.bind("click",function(c){if(!a.mobile.linkBindingEnabled||c.isDefaultPrevented())return;var e=E(c.target),f=a(e),g;if(!e||c.which>1||!f.jqmHijackable().length)return;g=function(){b.setTimeout(function(){w(!0)},200)};if(f.is(":jqmData(rel='back')"))return a.mobile.back(),!1;var i=F(f),j=h.makeUrlAbsolute(f.attr("href")||"#",i);if(!a.mobile.ajaxEnabled&&!h.isEmbeddedPage(j)){g();return}if(j.search("#")!==-1){j=j.replace(/[^#]*#/,"");if(!j){c.preventDefault();return}h.isPath(j)?j=h.makeUrlAbsolute(j,i):j=h.makeUrlAbsolute("#"+j,r.hrefNoHash)}var k=f.is("[rel='external']")||f.is(":jqmData(ajax='false')")||f.is("[target]"),l=k||h.isExternal(j)&&!h.isPermittedCrossDomainRequest(r,j);if(l){g();return}var m=f.jqmData("transition"),n=f.jqmData("direction")==="reverse"||f.jqmData("back"),o=f.attr("data-"+a.mobile.ns+"rel")||d;a.mobile.changePage(j,{transition:m,reverse:n,role:o,link:f}),c.preventDefault()}),a.mobile.document.delegate(".ui-page","pageshow.prefetch",function(){var b=[];a(this).find("a:jqmData(prefetch)").each(function(){var c=a(this),d=c.attr("href");d&&a.inArray(d,b)===-1&&(b.push(d),a.mobile.loadPage(d,{role:c.attr("data-"+a.mobile.ns+"rel")}))})}),a.mobile._handleHashChange=function(c,e){var f=h.stripHash(c),g=a.mobile.urlHistory.stack.length===0?"none":d,i={changeHash:!1,fromHashChange:!0,reverse:e.direction==="back"};a.extend(i,e,{transition:(l.getLast()||{}).transition||g});if(l.activeIndex>0&&f.indexOf(p)>-1&&l.initialDst!==f){if(a.mobile.activePage&&!a.mobile.activePage.is(".ui-dialog")){e.direction==="back"?a.mobile.back():b.history.forward();return}f=e.pageUrl;var j=a.mobile.urlHistory.getActive();a.extend(i,{role:j.role,transition:j.transition,reverse:e.direction==="back"})}f?(f=h.isPath(f)?f:h.makeUrlAbsolute("#"+f,s),f===h.makeUrlAbsolute("#"+l.initialDst,s)&&l.stack.length&&l.stack[0].url!==l.initialDst.replace(p,"")&&(f=a.mobile.firstPage),a.mobile.changePage(f,i)):a.mobile.changePage(a.mobile.firstPage,i)},e.bind("navigate",function(b,c){var d=a.event.special.navigate.originalEventName.indexOf("hashchange")>-1?c.state.hash:c.state.url;d||(d=a.mobile.path.parseLocation().hash);if(!d||d==="#"||d.indexOf("#"+a.mobile.path.uiStateKey)===0)d=location.href;a.mobile._handleHashChange(d,c.state)}),a.mobile.document.bind("pageshow",a.mobile.resetActivePageHeight),a.mobile.window.bind("throttledresize",a.mobile.resetActivePageHeight)},a(function(){k.resolve()}),a.when(k,a.mobile.navreadyDeferred).done(function(){a.mobile._registerInternalEvents()})}(a),function(a,b,c){a.mobile.transitionFallbacks.flip="fade"}(a,this),function(a,b,c){a.mobile.transitionFallbacks.flow="fade"}(a,this),function(a,b,c){a.mobile.transitionFallbacks.pop="fade"}(a,this),function(a,b,c){a.mobile.transitionHandlers.slide=a.mobile.transitionHandlers.simultaneous,a.mobile.transitionFallbacks.slide="fade"}(a,this),function(a,b,c){a.mobile.transitionFallbacks.slidedown="fade"}(a,this),function(a,b,c){a.mobile.transitionFallbacks.slidefade="fade"}(a,this),function(a,b,c){a.mobile.transitionFallbacks.slideup="fade"}(a,this),function(a,b,c){a.mobile.transitionFallbacks.turn="fade"}(a,this),function(a,b){a.mobile.page.prototype.options.degradeInputs={color:!1,date:!1,datetime:!1,"datetime-local":!1,email:!1,month:!1,number:!1,range:"number",search:"text",tel:!1,time:!1,url:!1,week:!1},a.mobile.document.bind("pagecreate create",function(b){var c=a.mobile.closestPageData(a(b.target)),d;if(!c)return;d=c.options,a(b.target).find("input").not(c.keepNativeSelector()).each(function(){var b=a(this),c=this.getAttribute("type"),e=d.degradeInputs[c]||"text";if(d.degradeInputs[c]){var f=a("<div>").html(b.clone()).html(),g=f.indexOf(" type=")>-1,h=g?/\s+type=["']?\w+['"]?/:/\/?>/,i=' type="'+e+'" data-'+a.mobile.ns+'type="'+c+'"'+(g?"":">");b.replaceWith(f.replace(h,i))}})})}(a),function(a,b,c){a.widget("mobile.dialog",a.mobile.widget,{options:{closeBtn:"left",closeBtnText:"Close",overlayTheme:"a",corners:!0,initSelector:":jqmData(role='dialog')"},_handlePageBeforeShow:function(){this._isCloseable=!0,this.options.overlayTheme&&this.element.page("removeContainerBackground").page("setContainerBackground",this.options.overlayTheme)},_create:function(){var b=this,c=this.element,d=this.options.corners?" ui-corner-all":"",e=a("<div/>",{role:"dialog","class":"ui-dialog-contain ui-overlay-shadow"+d});c.addClass("ui-dialog ui-overlay-"+this.options.overlayTheme),c.wrapInner(e),c.bind("vclick submit",function(b){var c=a(b.target).closest(b.type==="vclick"?"a":"form"),d;c.length&&!c.jqmData("transition")&&(d=a.mobile.urlHistory.getActive()||{},c.attr("data-"+a.mobile.ns+"transition",d.transition||a.mobile.defaultDialogTransition).attr("data-"+a.mobile.ns+"direction","reverse"))}),this._on(c,{pagebeforeshow:"_handlePageBeforeShow"}),a.extend(this,{_createComplete:!1}),this._setCloseBtn(this.options.closeBtn)},_setCloseBtn:function(b){var c=this,d,e;this._headerCloseButton&&(this._headerCloseButton.remove(),this._headerCloseButton=null),b!=="none"&&(e=b==="left"?"left":"right",d=a("<a href='#' class='ui-btn-"+e+"' data-"+a.mobile.ns+"icon='delete' data-"+a.mobile.ns+"iconpos='notext'>"+this.options.closeBtnText+"</a>"),this.element.children().find(":jqmData(role='header')").first().prepend(d),this._createComplete&&a.fn.buttonMarkup&&d.buttonMarkup(),this._createComplete=!0,d.bind("click",function(){c.close()}),this._headerCloseButton=d)},_setOption:function(b,c){b==="closeBtn"&&(this._setCloseBtn(c),this._super(b,c),this.element.attr("data-"+(a.mobile.ns||"")+"close-btn",c))},close:function(){var b,c,d=a.mobile.navigate.history;this._isCloseable&&(this._isCloseable=!1,a.mobile.hashListeningEnabled&&d.activeIndex>0?a.mobile.back():(b=Math.max(0,d.activeIndex-1),c=d.stack[b].pageUrl||d.stack[b].url,d.previousIndex=d.activeIndex,d.activeIndex=b,a.mobile.path.isPath(c)||(c=a.mobile.path.makeUrlAbsolute("#"+c)),a.mobile.changePage(c,{direction:"back",changeHash:!1,fromHashChange:!0})))}}),a.mobile.document.delegate(a.mobile.dialog.prototype.options.initSelector,"pagecreate",function(){a.mobile.dialog.prototype.enhance(this)})}(a,this),function(a,b){a.mobile.page.prototype.options.backBtnText="Back",a.mobile.page.prototype.options.addBackBtn=!1,a.mobile.page.prototype.options.backBtnTheme=null,a.mobile.page.prototype.options.headerTheme="a",a.mobile.page.prototype.options.footerTheme="a",a.mobile.page.prototype.options.contentTheme=null,a.mobile.document.bind("pagecreate",function(b){var c=a(b.target),d=c.data("mobile-page").options,e=c.jqmData("role"),f=d.theme;a(":jqmData(role='header'), :jqmData(role='footer'), :jqmData(role='content')",c).jqmEnhanceable().each(function(){var b=a(this),g=b.jqmData("role"),h=b.jqmData("theme"),i=h||d.contentTheme||e==="dialog"&&f,j,k,l,m;b.addClass("ui-"+g);if(g==="header"||g==="footer"){var n=h||(g==="header"?d.headerTheme:d.footerTheme)||f;b.addClass("ui-bar-"+n).attr("role",g==="header"?"banner":"contentinfo"),g==="header"&&(j=b.children("a, button"),k=j.hasClass("ui-btn-left"),l=j.hasClass("ui-btn-right"),k=k||j.eq(0).not(".ui-btn-right").addClass("ui-btn-left").length,l=l||j.eq(1).addClass("ui-btn-right").length),d.addBackBtn&&g==="header"&&a(".ui-page").length>1&&c.jqmData("url")!==a.mobile.path.stripHash(location.hash)&&!k&&(m=a("<a href='javascript:void(0);' class='ui-btn-left' data-"+a.mobile.ns+"rel='back' data-"+a.mobile.ns+"icon='arrow-l'>"+d.backBtnText+"</a>").attr("data-"+a.mobile.ns+"theme",d.backBtnTheme||n).prependTo(b)),b.children("h1, h2, h3, h4, h5, h6").addClass("ui-title").attr({role:"heading","aria-level":"1"})}else g==="content"&&(i&&b.addClass("ui-body-"+i),b.attr("role","main"))})})}(a),function(a,b){a.mobile.behaviors.addFirstLastClasses={_getVisibles:function(a,b){var c;return b?c=a.not(".ui-screen-hidden"):(c=a.filter(":visible"),c.length===0&&(c=a.not(".ui-screen-hidden"))),c},_addFirstLastClasses:function(a,b,c){a.removeClass("ui-first-child ui-last-child"),b.eq(0).addClass("ui-first-child").end().last().addClass("ui-last-child"),c||this.element.trigger("updatelayout")}}}(a),function(a,b){a.fn.fieldcontain=function(a){return this.addClass("ui-field-contain ui-body ui-br").contents().filter(function(){return this.nodeType===3&&!/\S/.test(this.nodeValue)}).remove()},a(c).bind("pagecreate create",function(b){a(":jqmData(role='fieldcontain')",b.target).jqmEnhanceable().fieldcontain()})}(a),function(a,b){a.fn.grid=function(b){return this.each(function(){var c=a(this),d=a.extend({grid:null},b),e=c.children(),f={solo:1,a:2,b:3,c:4,d:5},g=d.grid,h;if(!g)if(e.length<=5)for(var i in f)f[i]===e.length&&(g=i);else g="a",c.addClass("ui-grid-duo");h=f[g],c.addClass("ui-grid-"+g),e.filter(":nth-child("+h+"n+1)").addClass("ui-block-a"),h>1&&e.filter(":nth-child("+h+"n+2)").addClass("ui-block-b"),h>2&&e.filter(":nth-child("+h+"n+3)").addClass("ui-block-c"),h>3&&e.filter(":nth-child("+h+"n+4)").addClass("ui-block-d"),h>4&&e.filter(":nth-child("+h+"n+5)").addClass("ui-block-e")})}}(a),function(a,b){a(c).bind("pagecreate create",function(b){a(":jqmData(role='nojs')",b.target).addClass("ui-nojs")})}(a),function(a,b){a.mobile.behaviors.formReset={_handleFormReset:function(){this._on(this.element.closest("form"),{reset:function(){this._delay("_reset")}})}}}(a),function(a,b){function e(a){var b;while(a){b=typeof a.className=="string"&&a.className+" ";if(b&&b.indexOf("ui-btn ")>-1&&b.indexOf("ui-disabled ")<0)break;a=a.parentNode}return a}function f(d,e,f,g,h){var i=a.data(d[0],"buttonElements");d.removeClass(e).addClass(f),i&&(i.bcls=a(c.createElement("div")).addClass(i.bcls+" "+f).removeClass(e).attr("class"),g!==b&&(i.hover=g),i.state=h)}var d=function(a,c){var d=a.getAttribute(c);return d==="true"?!0:d==="false"?!1:d===null?b:d};a.fn.buttonMarkup=function(e){var f=this,h="data-"+a.mobile.ns,i;e=e&&a.type(e)==="object"?e:{};for(var j=0;j<f.length;j++){var k=f.eq(j),l=k[0],m=a.extend({},a.fn.buttonMarkup.defaults,{icon:e.icon!==b?e.icon:d(l,h+"icon"),iconpos:e.iconpos!==b?e.iconpos:d(l,h+"iconpos"),theme:e.theme!==b?e.theme:d(l,h+"theme")||a.mobile.getInheritedTheme(k,"c"),inline:e.inline!==b?e.inline:d(l,h+"inline"),shadow:e.shadow!==b?e.shadow:d(l,h+"shadow"),corners:e.corners!==b?e.corners:d(l,h+"corners"),iconshadow:e.iconshadow!==b?e.iconshadow:d(l,h+"iconshadow"),mini:e.mini!==b?e.mini:d(l,h+"mini")},e),n="ui-btn-inner",o="ui-btn-text",p,q,r=!1,s="up",t,u,v,w;for(i in m)l.setAttribute(h+i,m[i]);d(l,h+"rel")==="popup"&&k.attr("href")&&(l.setAttribute("aria-haspopup",!0),l.setAttribute("aria-owns",k.attr("href"))),w=a.data(l.tagName==="INPUT"||l.tagName==="BUTTON"?l.parentNode:l,"buttonElements"),w?(l=w.outer,k=a(l),t=w.inner,u=w.text,a(w.icon).remove(),w.icon=null,r=w.hover,s=w.state):(t=c.createElement(m.wrapperEls),u=c.createElement(m.wrapperEls)),v=m.icon?c.createElement("span"):null,g&&!w&&g(),m.theme||(m.theme=a.mobile.getInheritedTheme(k,"c")),p="ui-btn ",p+=r?"ui-btn-hover-"+m.theme:"",p+=s?" ui-btn-"+s+"-"+m.theme:"",p+=m.shadow?" ui-shadow":"",p+=m.corners?" ui-btn-corner-all":"",m.mini!==b&&(p+=m.mini===!0?" ui-mini":" ui-fullsize"),m.inline!==b&&(p+=m.inline===!0?" ui-btn-inline":" ui-btn-block"),m.icon&&(m.icon="ui-icon-"+m.icon,m.iconpos=m.iconpos||"left",q="ui-icon "+m.icon,m.iconshadow&&(q+=" ui-icon-shadow")),m.iconpos&&(p+=" ui-btn-icon-"+m.iconpos,m.iconpos==="notext"&&!k.attr("title")&&k.attr("title",k.getEncodedText())),m.iconpos&&m.iconpos==="notext"&&!k.attr("title")&&k.attr("title",k.getEncodedText()),w&&k.removeClass(w.bcls||""),k.removeClass("ui-link").addClass(p),t.className=n,u.className=o,w||t.appendChild(u);if(v){v.className=q;if(!w||!w.icon)v.innerHTML="&#160;",t.appendChild(v)}while(l.firstChild&&!w)u.appendChild(l.firstChild);w||l.appendChild(t),w={hover:r,state:s,bcls:p,outer:l,inner:t,text:u,icon:v},a.data(l,"buttonElements",w),a.data(t,"buttonElements",w),a.data(u,"buttonElements",w),v&&a.data(v,"buttonElements",w)}return this},a.fn.buttonMarkup.defaults={corners:!0,shadow:!0,iconshadow:!0,wrapperEls:"span"};var g=function(){var c=a.mobile.buttonMarkup.hoverDelay,d,h;a.mobile.document.bind({"vmousedown vmousecancel vmouseup vmouseover vmouseout focus blur scrollstart":function(g){var i,j=a(e(g.target)),k=g.originalEvent&&/^touch/.test(g.originalEvent.type),l=g.type;if(j.length){i=j.attr("data-"+a.mobile.ns+"theme");if(l==="vmousedown")k?d=setTimeout(function(){f(j,"ui-btn-up-"+i,"ui-btn-down-"+i,b,"down")},c):f(j,"ui-btn-up-"+i,"ui-btn-down-"+i,b,"down");else if(l==="vmousecancel"||l==="vmouseup")f(j,"ui-btn-down-"+i,"ui-btn-up-"+i,b,"up");else if(l==="vmouseover"||l==="focus")k?h=setTimeout(function(){f(j,"ui-btn-up-"+i,"ui-btn-hover-"+i,!0,"")},c):f(j,"ui-btn-up-"+i,"ui-btn-hover-"+i,!0,"");else if(l==="vmouseout"||l==="blur"||l==="scrollstart")f(j,"ui-btn-hover-"+i+" ui-btn-down-"+i,"ui-btn-up-"+i,!1,"up"),d&&clearTimeout(d),h&&clearTimeout(h)}},"focusin focus":function(b){a(e(b.target)).addClass(a.mobile.focusClass)},"focusout blur":function(b){a(e(b.target)).removeClass(a.mobile.focusClass)}}),g=null};a.mobile.document.bind("pagecreate create",function(b){a(":jqmData(role='button'), .ui-bar > a, .ui-header > a, .ui-footer > a, .ui-bar > :jqmData(role='controlgroup') > a",b.target).jqmEnhanceable().not("button, input, .ui-btn, :jqmData(role='none'), :jqmData(role='nojs')").buttonMarkup()})}(a),function(a,b){a.widget("mobile.collapsible",a.mobile.widget,{options:{expandCueText:" click to expand contents",collapseCueText:" click to collapse contents",collapsed:!0,heading:"h1,h2,h3,h4,h5,h6,legend",collapsedIcon:"plus",expandedIcon:"minus",iconpos:"left",theme:null,contentTheme:null,inset:!0,corners:!0,mini:!1,initSelector:":jqmData(role='collapsible')"},_create:function(){var c=this.element,d=this.options,e=c.addClass("ui-collapsible"),f=c.children(d.heading).first(),g=e.wrapInner("<div class='ui-collapsible-content'></div>").children(".ui-collapsible-content"),h=c.closest(":jqmData(role='collapsible-set')").addClass("ui-collapsible-set"),i="";f.is("legend")&&(f=a("<div role='heading'>"+f.html()+"</div>").insertBefore(f),f.next().remove()),h.length?(d.theme||(d.theme=h.jqmData("theme")||a.mobile.getInheritedTheme(h,"c")),d.contentTheme||(d.contentTheme=h.jqmData("content-theme")),d.collapsedIcon=c.jqmData("collapsed-icon")||h.jqmData("collapsed-icon")||d.collapsedIcon,d.expandedIcon=c.jqmData("expanded-icon")||h.jqmData("expanded-icon")||d.expandedIcon,d.iconpos=c.jqmData("iconpos")||h.jqmData("iconpos")||d.iconpos,h.jqmData("inset")!==b?d.inset=h.jqmData("inset"):d.inset=!0,d.corners=!1,d.mini||(d.mini=h.jqmData("mini"))):d.theme||(d.theme=a.mobile.getInheritedTheme(c,"c")),!d.inset||(i+=" ui-collapsible-inset",!d.corners||(i+=" ui-corner-all")),d.contentTheme&&(i+=" ui-collapsible-themed-content",g.addClass("ui-body-"+d.contentTheme)),i!==""&&e.addClass(i),f.insertBefore(g).addClass("ui-collapsible-heading").append("<span class='ui-collapsible-heading-status'></span>").wrapInner("<a href='#' class='ui-collapsible-heading-toggle'></a>").find("a").first().buttonMarkup({shadow:!1,corners:!1,iconpos:d.iconpos,icon:d.collapsedIcon,mini:d.mini,theme:d.theme}),e.bind("expand collapse",function(b){if(!b.isDefaultPrevented()){var c=a(this),e=b.type==="collapse";b.preventDefault(),f.toggleClass("ui-collapsible-heading-collapsed",e).find(".ui-collapsible-heading-status").text(e?d.expandCueText:d.collapseCueText).end().find(".ui-icon").toggleClass("ui-icon-"+d.expandedIcon,!e).toggleClass("ui-icon-"+d.collapsedIcon,e||d.expandedIcon===d.collapsedIcon).end().find("a").first().removeClass(a.mobile.activeBtnClass),c.toggleClass("ui-collapsible-collapsed",e),g.toggleClass("ui-collapsible-content-collapsed",e).attr("aria-hidden",e),g.trigger("updatelayout")}}).trigger(d.collapsed?"collapse":"expand"),f.bind("tap",function(b){f.find("a").first().addClass(a.mobile.activeBtnClass)}).bind("click",function(a){var b=f.is(".ui-collapsible-heading-collapsed")?"expand":"collapse";e.trigger(b),a.preventDefault(),a.stopPropagation()})}}),a.mobile.document.bind("pagecreate create",function(b){a.mobile.collapsible.prototype.enhanceWithin(b.target)})}(a),function(a,b){a.widget("mobile.collapsibleset",a.mobile.widget,{options:{initSelector:":jqmData(role='collapsible-set')"},_create:function(){var c=this.element.addClass("ui-collapsible-set"),d=this.options;d.theme||(d.theme=a.mobile.getInheritedTheme(c,"c")),d.contentTheme||(d.contentTheme=c.jqmData("content-theme")),d.corners||(d.corners=c.jqmData("corners")),c.jqmData("inset")!==b&&(d.inset=c.jqmData("inset")),d.inset=d.inset!==b?d.inset:!0,d.corners=d.corners!==b?d.corners:!0,!!d.corners&&!!d.inset&&c.addClass("ui-corner-all"),c.jqmData("collapsiblebound")||c.jqmData("collapsiblebound",!0).bind("expand",function(b){var c=a(b.target).closest(".ui-collapsible");c.parent().is(":jqmData(role='collapsible-set')")&&c.siblings(".ui-collapsible").trigger("collapse")})},_init:function(){var a=this.element,b=a.children(":jqmData(role='collapsible')"),c=b.filter(":jqmData(collapsed='false')");this._refresh("true"),c.trigger("expand")},_refresh:function(b){var c=this.element.children(":jqmData(role='collapsible')");a.mobile.collapsible.prototype.enhance(c.not(".ui-collapsible")),this._addFirstLastClasses(c,this._getVisibles(c,b),b)},refresh:function(){this._refresh(!1)}}),a.widget("mobile.collapsibleset",a.mobile.collapsibleset,a.mobile.behaviors.addFirstLastClasses),a.mobile.document.bind("pagecreate create",function(b){a.mobile.collapsibleset.prototype.enhanceWithin(b.target)})}(a),function(a,b){a.widget("mobile.navbar",a.mobile.widget,{options:{iconpos:"top",grid:null,initSelector:":jqmData(role='navbar')"},_create:function(){var d=this.element,e=d.find("a"),f=e.filter(":jqmData(icon)").length?this.options.iconpos:b;d.addClass("ui-navbar ui-mini").attr("role","navigation").find("ul").jqmEnhanceable().grid({grid:this.options.grid}),e.buttonMarkup({corners:!1,shadow:!1,inline:!0,iconpos:f}),d.delegate("a","vclick",function(b){if(!a(b.target).hasClass("ui-disabled")){e.removeClass(a.mobile.activeBtnClass),a(this).addClass(a.mobile.activeBtnClass);var d=a(this);a(c).one("pagechange",function(b){d.removeClass(a.mobile.activeBtnClass)})}}),d.closest(".ui-page").bind("pagebeforeshow",function(){e.filter(".ui-state-persist").addClass(a.mobile.activeBtnClass)})}}),a.mobile.document.bind("pagecreate create",function(b){a.mobile.navbar.prototype.enhanceWithin(b.target)})}(a),function(a,b){var d={};a.widget("mobile.listview",a.mobile.widget,{options:{theme:null,countTheme:"c",headerTheme:"b",dividerTheme:"b",icon:"arrow-r",splitIcon:"arrow-r",splitTheme:"b",corners:!0,shadow:!0,inset:!1,initSelector:":jqmData(role='listview')"},_create:function(){var a=this,b="";b+=a.options.inset?" ui-listview-inset":"",!a.options.inset||(b+=a.options.corners?" ui-corner-all":"",b+=a.options.shadow?" ui-shadow":""),a.element.addClass(function(a,c){return c+" ui-listview"+b}),a.refresh(!0)},_findFirstElementByTagName:function(a,b,c,d){var e={};e[c]=e[d]=!0;while(a){if(e[a.nodeName])return a;a=a[b]}return null},_getChildrenByTagName:function(b,c,d){var e=[],f={};f[c]=f[d]=!0,b=b.firstChild;while(b)f[b.nodeName]&&e.push(b),b=b.nextSibling;return a(e)},_addThumbClasses:function(b){var c,d,e=b.length;for(c=0;c<e;c++)d=a(this._findFirstElementByTagName(b[c].firstChild,"nextSibling","img","IMG")),d.length&&(d.addClass("ui-li-thumb"),a(this._findFirstElementByTagName(d[0].parentNode,"parentNode","li","LI")).addClass(d.is(".ui-li-icon")?"ui-li-has-icon":"ui-li-has-thumb"))},refresh:function(b){this.parentPage=this.element.closest(".ui-page"),this._createSubPages();var d=this.options,e=this.element,f=this,g=e.jqmData("dividertheme")||d.dividerTheme,h=e.jqmData("splittheme"),i=e.jqmData("spliticon"),j=e.jqmData("icon"),k=this._getChildrenByTagName(e[0],"li","LI"),l=!!a.nodeName(e[0],"ol"),m=!a.support.cssPseudoElement,n=e.attr("start"),o={},p,q,r,s,t,u,v,w,x,y,z,A,B,C;l&&m&&e.find(".ui-li-dec").remove(),l&&(n||n===0?m?v=parseIntRadixTen(n,10):(w=parseIntRadixTen(n,10)-1,e.css("counter-reset","listnumbering "+w)):m&&(v=1)),d.theme||(d.theme=a.mobile.getInheritedTheme(this.element,"c"));for(var D=0,E=k.length;D<E;D++){p=k.eq(D),q="ui-li";if(b||!p.hasClass("ui-li")){r=p.jqmData("theme")||d.theme,s=this._getChildrenByTagName(p[0],"a","A");var F=p.jqmData("role")==="list-divider";s.length&&!F?(z=p.jqmData("icon"),p.buttonMarkup({wrapperEls:"div",shadow:!1,corners:!1,iconpos:"right",icon:s.length>1||z===!1?!1:z||j||d.icon,theme:r}),z!==!1&&s.length===1&&p.addClass("ui-li-has-arrow"),s.first().removeClass("ui-link").addClass("ui-link-inherit"),s.length>1&&(q+=" ui-li-has-alt",t=s.last(),u=h||t.jqmData("theme")||d.splitTheme,C=t.jqmData("icon"),t.appendTo(p).attr("title",a.trim(t.getEncodedText())).addClass("ui-li-link-alt").empty().buttonMarkup({shadow:!1,corners:!1,theme:r,icon:!1,iconpos:"notext"}).find(".ui-btn-inner").append(a(c.createElement("span")).buttonMarkup({shadow:!0,corners:!0,theme:u,iconpos:"notext",icon:C||z||i||d.splitIcon})))):F?(q+=" ui-li-divider ui-bar-"+(p.jqmData("theme")||g),p.attr("role","heading"),l&&(n||n===0?m?v=parseIntRadixTen(n,10):(x=parseIntRadixTen(n,10)-1,p.css("counter-reset","listnumbering "+x)):m&&(v=1))):q+=" ui-li-static ui-btn-up-"+r}l&&m&&q.indexOf("ui-li-divider")<0&&(y=q.indexOf("ui-li-static")>0?p:p.find(".ui-link-inherit"),y.addClass("ui-li-jsnumbering").prepend("<span class='ui-li-dec'>"+v++ +". </span>")),o[q]||(o[q]=[]),o[q].push(p[0])}for(q in o)a(o[q]).addClass(q).children(".ui-btn-inner").addClass(q);e.find("h1, h2, h3, h4, h5, h6").addClass("ui-li-heading").end().find("p, dl").addClass("ui-li-desc").end().find(".ui-li-aside").each(function(){var b=a(this);b.prependTo(b.parent())}).end().find(".ui-li-count").each(function(){a(this).closest("li").addClass("ui-li-has-count")}).addClass("ui-btn-up-"+(e.jqmData("counttheme")||this.options.countTheme)+" ui-btn-corner-all"),this._addThumbClasses(k),this._addThumbClasses(e.find(".ui-link-inherit")),this._addFirstLastClasses(k,this._getVisibles(k,b),b),this._trigger("afterrefresh")},_idStringEscape:function(a){return a.replace(/[^a-zA-Z0-9]/g,"-")},_createSubPages:function(){var b=this.element,c=b.closest(".ui-page"),e=c.jqmData("url"),f=e||c[0][a.expando],g=b.attr("id"),h=this.options,i="data-"+a.mobile.ns,j=this,k=c.find(":jqmData(role='footer')").jqmData("id"),l;typeof d[f]=="undefined"&&(d[f]=-1),g=g||++d[f],a(b.find("li>ul, li>ol").toArray().reverse()).each(function(c){var d=this,f=a(this),j=f.attr("id")||g+"-"+c,m=f.parent(),n=a(f.prevAll().toArray().reverse()),p=n.length?n:a("<span>"+a.trim(m.contents()[0].nodeValue)+"</span>"),q=p.first().getEncodedText(),r=(e||"")+"&"+a.mobile.subPageUrlKey+"="+j,s=f.jqmData("theme")||h.theme,t=f.jqmData("counttheme")||b.jqmData("counttheme")||h.countTheme,u,v;l=!0,u=f.detach().wrap("<div "+i+"role='page' "+i+"url='"+r+"' "+i+"theme='"+s+"' "+i+"count-theme='"+t+"'><div "+i+"role='content'></div></div>").parent().before("<div "+i+"role='header' "+i+"theme='"+h.headerTheme+"'><div class='ui-title'>"+q+"</div></div>").after(k?a("<div "+i+"role='footer' "+i+"id='"+k+"'>"):"").parent().appendTo(a.mobile.pageContainer),u.page(),v=m.find("a:first"),v.length||(v=a("<a/>").html(p||q).prependTo(m.empty())),v.attr("href","#"+r)}).listview();if(l&&c.is(":jqmData(external-page='true')")&&c.data("mobile-page").options.domCache===!1){var m=function(b,d){var f=d.nextPage,g,h=new a.Event("pageremove");d.nextPage&&(g=f.jqmData("url"),g.indexOf(e+"&"+a.mobile.subPageUrlKey)!==0&&(j.childPages().remove(),c.trigger(h),h.isDefaultPrevented()||c.removeWithDependents()))};c.unbind("pagehide.remove").bind("pagehide.remove",m)}},childPages:function(){var b=this.parentPage.jqmData("url");return a(":jqmData(url^='"+b+"&"+a.mobile.subPageUrlKey+"')")}}),a.widget("mobile.listview",a.mobile.listview,a.mobile.behaviors.addFirstLastClasses),a.mobile.document.bind("pagecreate create",function(b){a.mobile.listview.prototype.enhanceWithin(b.target)})}(a),function(a,b){a.mobile.listview.prototype.options.autodividers=!1,a.mobile.listview.prototype.options.autodividersSelector=function(b){var c=a.trim(b.text())||null;return c?(c=c.slice(0,1).toUpperCase(),c):null},a.mobile.document.delegate("ul,ol","listviewcreate",function(){var b=a(this),d=b.data("mobile-listview");if(!d||!d.options.autodividers)return;var e=function(){b.find("li:jqmData(role='list-divider')").remove();var e=b.find("li"),f=null,g,h;for(var i=0;i<e.length;i++){g=e[i],h=d.options.autodividersSelector(a(g));if(h&&f!==h){var j=c.createElement("li");j.appendChild(c.createTextNode(h)),j.setAttribute("data-"+a.mobile.ns+"role","list-divider"),g.parentNode.insertBefore(j,g)}f=h}},f=function(){b.unbind("listviewafterrefresh",f),e(),d.refresh(),b.bind("listviewafterrefresh",f)};f()})}(a),function(a,b){a.widget("mobile.checkboxradio",a.mobile.widget,{options:{theme:null,mini:!1,initSelector:"input[type='checkbox'],input[type='radio']"},_create:function(){var b=this,d=this.element,e=this.options,f=function(a,b){return a.jqmData(b)||a.closest("form, fieldset").jqmData(b)},g=a(d).closest("label"),h=g.length?g:a(d).closest("form, fieldset, :jqmData(role='page'), :jqmData(role='dialog')").find("label").filter("[for='"+d[0].id+"']").first(),i=d[0].type,j=f(d,"mini")||e.mini,k=i+"-on",l=i+"-off",m=f(d,"iconpos"),n="ui-"+k,o="ui-"+l;if(i!=="checkbox"&&i!=="radio")return;a.extend(this,{label:h,inputtype:i,checkedClass:n,uncheckedClass:o,checkedicon:k,uncheckedicon:l}),e.theme||(e.theme=a.mobile.getInheritedTheme(this.element,"c")),h.buttonMarkup({theme:e.theme,icon:l,shadow:!1,mini:j,iconpos:m});var p=c.createElement("div");p.className="ui-"+i,d.add(h).wrapAll(p),h.bind({vmouseover:function(b){a(this).parent().is(".ui-disabled")&&b.stopPropagation()},vclick:function(a){if(d.is(":disabled")){a.preventDefault();return}return b._cacheVals(),d.prop("checked",i==="radio"&&!0||!d.prop("checked")),d.triggerHandler("click"),b._getInputSet().not(d).prop("checked",!1),b._updateAll(),!1}}),d.bind({vmousedown:function(){b._cacheVals()},vclick:function(){var c=a(this);c.is(":checked")?(c.prop("checked",!0),b._getInputSet().not(c).prop("checked",!1)):c.prop("checked",!1),b._updateAll()},focus:function(){h.addClass(a.mobile.focusClass)},blur:function(){h.removeClass(a.mobile.focusClass)}}),this._handleFormReset&&this._handleFormReset(),this.refresh()},_cacheVals:function(){this._getInputSet().each(function(){a(this).jqmData("cacheVal",this.checked)})},_getInputSet:function(){return this.inputtype==="checkbox"?this.element:this.element.closest("form, :jqmData(role='page'), :jqmData(role='dialog')").find("input[name='"+this.element[0].name+"'][type='"+this.inputtype+"']")},_updateAll:function(){var b=this;this._getInputSet().each(function(){var c=a(this);(this.checked||b.inputtype==="checkbox")&&c.trigger("change")}).checkboxradio("refresh")},_reset:function(){this.refresh()},refresh:function(){var b=this.element[0],c=" "+a.mobile.activeBtnClass,d=this.checkedClass+(this.element.parents(".ui-controlgroup-horizontal").length?c:""),e=this.label;b.checked?e.removeClass(this.uncheckedClass+c).addClass(d).buttonMarkup({icon:this.checkedicon}):e.removeClass(d).addClass(this.uncheckedClass).buttonMarkup({icon:this.uncheckedicon}),b.disabled?this.disable():this.enable()},disable:function(){this.element.prop("disabled",!0).parent().addClass("ui-disabled")},enable:function(){this.element.prop("disabled",!1).parent().removeClass("ui-disabled")}}),a.widget("mobile.checkboxradio",a.mobile.checkboxradio,a.mobile.behaviors.formReset),a.mobile.document.bind("pagecreate create",function(b){a.mobile.checkboxradio.prototype.enhanceWithin(b.target,!0)})}(a),function(a,b){a.widget("mobile.button",a.mobile.widget,{options:{theme:null,icon:null,iconpos:null,corners:!0,shadow:!0,iconshadow:!0,inline:null,mini:null,initSelector:"button, [type='button'], [type='submit'], [type='reset']"},_create:function(){var b=this.element,c,d=function(a){var b,c={};for(b in a)a[b]!==null&&b!=="initSelector"&&(c[b]=a[b]);return c}(this.options),e="",f;if(b[0].tagName==="A"){b.hasClass("ui-btn")||b.buttonMarkup();return}this.options.theme||(this.options.theme=a.mobile.getInheritedTheme(this.element,"c")),!~b[0].className.indexOf("ui-btn-left")||(e="ui-btn-left"),!~b[0].className.indexOf("ui-btn-right")||(e="ui-btn-right");if(b.attr("type")==="submit"||b.attr("type")==="reset")e?e+=" ui-submit":e="ui-submit";a("label[for='"+b.attr("id")+"']").addClass("ui-submit"),this.button=a("<div></div>")[b.html()?"html":"text"](b.html()||b.val()).insertBefore(b).buttonMarkup(d).addClass(e).append(b.addClass("ui-btn-hidden")),c=this.button,b.bind({focus:function(){c.addClass(a.mobile.focusClass)},blur:function(){c.removeClass(a.mobile.focusClass)}}),this.refresh()},_setOption:function(b,c){var d={};d[b]=c,b!=="initSelector"&&(this.button.buttonMarkup(d),this.element.attr("data-"+(a.mobile.ns||"")+b.replace(/([A-Z])/,"-$1").toLowerCase(),c)),this._super("_setOption",b,c)},enable:function(){return this.element.attr("disabled",!1),this.button.removeClass("ui-disabled").attr("aria-disabled",!1),this._setOption("disabled",!1)},disable:function(){return this.element.attr("disabled",!0),this.button.addClass("ui-disabled").attr("aria-disabled",!0),this._setOption("disabled",!0)},refresh:function(){var b=this.element;b.prop("disabled")?this.disable():this.enable(),a(this.button.data("buttonElements").text)[b.html()?"html":"text"](b.html()||b.val())}}),a.mobile.document.bind("pagecreate create",function(b){a.mobile.button.prototype.enhanceWithin(b.target,!0)})}(a),function(a,b){a.widget("mobile.controlgroup",a.mobile.widget,{options:{shadow:!1,corners:!0,excludeInvisible:!0,type:"vertical",mini:!1,initSelector:":jqmData(role='controlgroup')"},_create:function(){var c=this.element,d={inner:a("<div class='ui-controlgroup-controls'></div>"),legend:a("<div role='heading' class='ui-controlgroup-label'></div>")},e=c.children("legend"),f=this;c.wrapInner(d.inner),e.length&&d.legend.append(e).insertBefore(c.children(0)),c.addClass("ui-corner-all ui-controlgroup"),a.extend(this,{_initialRefresh:!0}),a.each(this.options,function(a,c){f.options[a]=b,f._setOption(a,c,!0)})},_init:function(){this.refresh()},_setOption:function(c,d){var e="_set"+c.charAt(0).toUpperCase()+c.slice(1);this[e]!==b&&this[e](d),this._super(c,d),this.element.attr("data-"+(a.mobile.ns||"")+c.replace(/([A-Z])/,"-$1").toLowerCase(),d)},_setType:function(a){this.element.removeClass("ui-controlgroup-horizontal ui-controlgroup-vertical").addClass("ui-controlgroup-"+a),this.refresh()},_setCorners:function(a){this.element.toggleClass("ui-corner-all",a)},_setShadow:function(a){this.element.toggleClass("ui-shadow",a)},_setMini:function(a){this.element.toggleClass("ui-mini",a)},container:function(){return this.element.children(".ui-controlgroup-controls")},refresh:function(){var b=this.element.find(".ui-btn").not(".ui-slider-handle"),c=this._initialRefresh;a.mobile.checkboxradio&&this.element.find(":mobile-checkboxradio").checkboxradio("refresh"),this._addFirstLastClasses(b,this.options.excludeInvisible?this._getVisibles(b,c):b,c),this._initialRefresh=!1}}),a.widget("mobile.controlgroup",a.mobile.controlgroup,a.mobile.behaviors.addFirstLastClasses),a(function(){a.mobile.document.bind("pagecreate create",function(b){a.mobile.controlgroup.prototype.enhanceWithin(b.target,!0)})})}(a),function(a,b){a(c).bind("pagecreate create",function(b){a(b.target).find("a").jqmEnhanceable().not(".ui-btn, .ui-link-inherit, :jqmData(role='none'), :jqmData(role='nojs')").addClass("ui-link")})}(a),function(a,d){function e(a,b,c,d){var e=d;return a<b?e=c+(a-b)/2:e=Math.min(Math.max(c,d-b/2),c+a-b),e}function f(){var c=a.mobile.window;return{x:c.scrollLeft(),y:c.scrollTop(),cx:b.innerWidth||c.width(),cy:b.innerHeight||c.height()}}a.widget("mobile.popup",a.mobile.widget,{options:{theme:null,overlayTheme:null,shadow:!0,corners:!0,transition:"none",positionTo:"origin",tolerance:null,initSelector:":jqmData(role='popup')",closeLinkSelector:"a:jqmData(rel='back')",closeLinkEvents:"click.popup",navigateEvents:"navigate.popup",closeEvents:"navigate.popup pagebeforechange.popup",dismissible:!0,history:!a.mobile.browser.oldIE},_eatEventAndClose:function(a){return a.preventDefault(),a.stopImmediatePropagation(),this.options.dismissible&&this.close(),!1},_resizeScreen:function(){var a=this._ui.container.outerHeight(!0);this._ui.screen.removeAttr("style"),a>this._ui.screen.height()&&this._ui.screen.height(a)},_handleWindowKeyUp:function(b){if(this._isOpen&&b.keyCode===a.mobile.keyCode.ESCAPE)return this._eatEventAndClose(b)},_expectResizeEvent:function(){var b=f();if(this._resizeData){if(b.x===this._resizeData.winCoords.x&&b.y===this._resizeData.winCoords.y&&b.cx===this._resizeData.winCoords.cx&&b.cy===this._resizeData.winCoords.cy)return!1;clearTimeout(this._resizeData.timeoutId)}return this._resizeData={timeoutId:setTimeout(a.proxy(this,"_resizeTimeout"),200),winCoords:b},!0},_resizeTimeout:function(){this._isOpen?this._expectResizeEvent()||(this._ui.container.hasClass("ui-popup-hidden")&&(this._ui.container.removeClass("ui-popup-hidden"),this.reposition({positionTo:"window"}),this._ignoreResizeEvents()),this._resizeScreen(),this._resizeData=null,this._orientationchangeInProgress=!1):(this._resizeData=null,this._orientationchangeInProgress=!1)},_ignoreResizeEvents:function(){var a=this;this._ignoreResizeTo&&clearTimeout(this._ignoreResizeTo),this._ignoreResizeTo=setTimeout(function(){a._ignoreResizeTo=0},1e3)},_handleWindowResize:function(a){this._isOpen&&this._ignoreResizeTo===0&&(this._expectResizeEvent()||this._orientationchangeInProgress)&&!this._ui.container.hasClass("ui-popup-hidden")&&this._ui.container.addClass("ui-popup-hidden").removeAttr("style")},_handleWindowOrientationchange:function(a){!this._orientationchangeInProgress&&this._isOpen&&this._ignoreResizeTo===0&&(this._expectResizeEvent(),this._orientationchangeInProgress=!0)},_handleDocumentFocusIn:function(b){var d=b.target,e,f=this._ui;if(!this._isOpen)return;if(d!==f.container[0]){e=a(b.target);if(0===e.parents().filter(f.container[0]).length)return a(c.activeElement).one("focus",function(a){e.blur()}),f.focusElement.focus(),b.preventDefault(),b.stopImmediatePropagation(),!1;f.focusElement[0]===f.container[0]&&(f.focusElement=e)}else f.focusElement&&f.focusElement[0]!==f.container[0]&&(f.container.blur(),f.focusElement.focus());this._ignoreResizeEvents()},_create:function(){var b={screen:a("<div class='ui-screen-hidden ui-popup-screen'></div>"),placeholder:a("<div style='display: none;'><!-- placeholder --></div>"),container:a("<div class='ui-popup-container ui-popup-hidden'></div>")},c=this.element.closest(".ui-page"),e=this.element.attr("id"),f=this;this.options.history=this.options.history&&a.mobile.ajaxEnabled&&a.mobile.hashListeningEnabled,c.length===0&&(c=a("body")),this.options.container=this.options.container||a.mobile.pageContainer,c.append(b.screen),b.container.insertAfter(b.screen),b.placeholder.insertAfter(this.element),e&&(b.screen.attr("id",e+"-screen"),b.container.attr("id",e+"-popup"),b.placeholder.html("<!-- placeholder for "+e+" -->")),b.container.append(this.element),b.focusElement=b.container,this.element.addClass("ui-popup"),a.extend(this,{_scrollTop:0,_page:c,_ui:b,_fallbackTransition:"",_currentTransition:!1,_prereqs:null,_isOpen:!1,_tolerance:null,_resizeData:null,_ignoreResizeTo:0,_orientationchangeInProgress:!1}),a.each(this.options,function(a,b){f.options[a]=d,f._setOption(a,b,!0)}),b.screen.bind("vclick",a.proxy(this,"_eatEventAndClose")),this._on(a.mobile.window,{orientationchange:a.proxy(this,"_handleWindowOrientationchange"),resize:a.proxy(this,"_handleWindowResize"),keyup:a.proxy(this,"_handleWindowKeyUp")}),this._on(a.mobile.document,{focusin:a.proxy(this,"_handleDocumentFocusIn")})},_applyTheme:function(a,b,c){var d=(a.attr("class")||"").split(" "),e=!0,f=null,g,h=String(b);while(d.length>0){f=d.pop(),g=(new RegExp("^ui-"+c+"-([a-z])$")).exec(f);if(g&&g.length>1){f=g[1];break}f=null}b!==f&&(a.removeClass("ui-"+c+"-"+f),b!==null&&b!=="none"&&a.addClass("ui-"+c+"-"+h))},_setTheme:function(a){this._applyTheme(this.element,a,"body")},_setOverlayTheme:function(a){this._applyTheme(this._ui.screen,a,"overlay"),this._isOpen&&this._ui.screen.addClass("in")},_setShadow:function(a){this.element.toggleClass("ui-overlay-shadow",a)},_setCorners:function(a){this.element.toggleClass("ui-corner-all",a)},_applyTransition:function(b){this._ui.container.removeClass(this._fallbackTransition),b&&b!=="none"&&(this._fallbackTransition=a.mobile._maybeDegradeTransition(b),this._fallbackTransition==="none"&&(this._fallbackTransition=""),this._ui.container.addClass(this._fallbackTransition))},_setTransition:function(a){this._currentTransition||this._applyTransition(a)},_setTolerance:function(b){var c={t:30,r:15,b:30,l:15};if(b!==d){var e=String(b).split(",");a.each(e,function(a,b){e[a]=parseIntRadixTen(b,10)});switch(e.length){case 1:isNaN(e[0])||(c.t=c.r=c.b=c.l=e[0]);break;case 2:isNaN(e[0])||(c.t=c.b=e[0]),isNaN(e[1])||(c.l=c.r=e[1]);break;case 4:isNaN(e[0])||(c.t=e[0]),isNaN(e[1])||(c.r=e[1]),isNaN(e[2])||(c.b=e[2]),isNaN(e[3])||(c.l=e[3]);break;default:}}this._tolerance=c},_setOption:function(b,c){var e,f="_set"+b.charAt(0).toUpperCase()+b.slice(1);this[f]!==d&&this[f](c),e=["initSelector","closeLinkSelector","closeLinkEvents","navigateEvents","closeEvents","history","container"],a.mobile.widget.prototype._setOption.apply(this,arguments),a.inArray(b,e)===-1&&this.element.attr("data-"+(a.mobile.ns||"")+b.replace(/([A-Z])/,"-$1").toLowerCase(),c)},_placementCoords:function(a){var b=f(),d={x:this._tolerance.l,y:b.y+this._tolerance.t,cx:b.cx-this._tolerance.l-this._tolerance.r,cy:b.cy-this._tolerance.t-this._tolerance.b},g,h;this._ui.container.css("max-width",d.cx),g={cx:this._ui.container.outerWidth(!0),cy:this._ui.container.outerHeight(!0)},h={x:e(d.cx,g.cx,d.x,a.x),y:e(d.cy,g.cy,d.y,a.y)},h.y=Math.max(0,h.y);var i=c.documentElement,j=c.body,k=Math.max(i.clientHeight,j.scrollHeight,j.offsetHeight,i.scrollHeight,i.offsetHeight);return h.y-=Math.min(h.y,Math.max(0,h.y+g.cy-k)),{left:h.x,top:h.y}},_createPrereqs:function(b,c,d){var e=this,f;f={screen:a.Deferred(),container:a.Deferred()},f.screen.then(function(){f===e._prereqs&&b()}),f.container.then(function(){f===e._prereqs&&c()}),a.when(f.screen,f.container).done(function(){f===e._prereqs&&(e._prereqs=null,d())}),e._prereqs=f},_animate:function(b){this._ui.screen.removeClass(b.classToRemove).addClass(b.screenClassToAdd),b.prereqs.screen.resolve();if(b.transition&&b.transition!=="none"){b.applyTransition&&this._applyTransition(b.transition);if(this._fallbackTransition){this._ui.container.animationComplete(a.proxy(b.prereqs.container,"resolve")).addClass(b.containerClassToAdd).removeClass(b.classToRemove);return}}this._ui.container.removeClass(b.classToRemove),b.prereqs.container.resolve()},_desiredCoords:function(b){var c=null,d,e=f(),g=b.x,h=b.y,i=b.positionTo;if(i&&i!=="origin")if(i==="window")g=e.cx/2+e.x,h=e.cy/2+e.y;else{try{c=a(i)}catch(j){c=null}c&&(c.filter(":visible"),c.length===0&&(c=null))}c&&(d=c.offset(),g=d.left+c.outerWidth()/2,h=d.top+c.outerHeight()/2);if(a.type(g)!=="number"||isNaN(g))g=e.cx/2+e.x;if(a.type(h)!=="number"||isNaN(h))h=e.cy/2+e.y;return{x:g,y:h}},_reposition:function(a){a={x:a.x,y:a.y,positionTo:a.positionTo},this._trigger("beforeposition",a),this._ui.container.offset(this._placementCoords(this._desiredCoords(a)))},reposition:function(a){this._isOpen&&this._reposition(a)},_openPrereqsComplete:function(){this._ui.container.addClass("ui-popup-active"),this._isOpen=!0,this._resizeScreen(),this._ui.container.attr("tabindex","0").focus(),this._ignoreResizeEvents(),this._trigger("afteropen")},_open:function(c){var d=a.extend({},this.options,c),e=function(){var a=b,c=navigator.userAgent,d=c.match(/AppleWebKit\/([0-9\.]+)/),e=!!d&&d[1],f=c.match(/Android (\d+(?:\.\d+))/),g=!!f&&f[1],h=c.indexOf("Chrome")>-1;return f!==null&&g==="4.0"&&e&&e>534.13&&!h?!0:!1}();this._createPrereqs(a.noop,a.noop,a.proxy(this,"_openPrereqsComplete")),this._currentTransition=d.transition,this._applyTransition(d.transition),this.options.theme||this._setTheme(this._page.jqmData("theme")||a.mobile.getInheritedTheme(this._page,"c")),this._ui.screen.removeClass("ui-screen-hidden"),this._ui.container.removeClass("ui-popup-hidden"),this._reposition(d),this.options.overlayTheme&&e&&this.element.closest(".ui-page").addClass("ui-popup-open"),this._animate({additionalCondition:!0,transition:d.transition,classToRemove:"",screenClassToAdd:"in",containerClassToAdd:"in",applyTransition:!1,prereqs:this._prereqs})},_closePrereqScreen:function(){this._ui.screen.removeClass("out").addClass("ui-screen-hidden")},_closePrereqContainer:function(){this._ui.container.removeClass("reverse out").addClass("ui-popup-hidden").removeAttr("style")},_closePrereqsDone:function(){var b=this.options;this._ui.container.removeAttr("tabindex"),a.mobile.popup.active=d,this._trigger("afterclose")},_close:function(b){this._ui.container.removeClass("ui-popup-active"),this._page.removeClass("ui-popup-open"),this._isOpen=!1,this._createPrereqs(a.proxy(this,"_closePrereqScreen"),a.proxy(this,"_closePrereqContainer"),a.proxy(this,"_closePrereqsDone")),this._animate({additionalCondition:this._ui.screen.hasClass("in"),transition:b?"none":this._currentTransition,classToRemove:"in",screenClassToAdd:"out",containerClassToAdd:"reverse out",applyTransition:!0,prereqs:this._prereqs})},_unenhance:function(){this._setTheme("none"),this.element.detach().insertAfter(this._ui.placeholder).removeClass("ui-popup ui-overlay-shadow ui-corner-all"),this._ui.screen.remove(),this._ui.container.remove(),this._ui.placeholder.remove()},_destroy:function(){a.mobile.popup.active===this?(this.element.one("popupafterclose",a.proxy(this,"_unenhance")),this.close()):this._unenhance()},_closePopup:function(c,d){var e,f,g=this.options,h=!1;b.scrollTo(0,this._scrollTop),c&&c.type==="pagebeforechange"&&d&&(typeof d.toPage=="string"?e=d.toPage:e=d.toPage.jqmData("url"),e=a.mobile.path.parseUrl(e),f=e.pathname+e.search+e.hash,this._myUrl!==a.mobile.path.makeUrlAbsolute(f)?h=!0:c.preventDefault()),g.container.unbind(g.closeEvents),this.element.undelegate(g.closeLinkSelector,g.closeLinkEvents),this._close(h)},_bindContainerClose:function(){this.options.container.one(this.options.closeEvents,a.proxy(this,"_closePopup"))},open:function(c){var d=this,e=this.options,f,g,h,i,j,k;if(a.mobile.popup.active)return;a.mobile.popup.active=this,this._scrollTop=a.mobile.window.scrollTop();if(!e.history){d._open(c),d._bindContainerClose(),d.element.delegate(e.closeLinkSelector,e.closeLinkEvents,function(a){d.close(),a.preventDefault()});return}k=a.mobile.urlHistory,g=a.mobile.dialogHashKey,h=a.mobile.activePage,i=h.is(".ui-dialog"),this._myUrl=f=k.getActive().url,j=f.indexOf(g)>-1&&!i&&k.activeIndex>0;if(j){d._open(c),d._bindContainerClose();return}f.indexOf(g)===-1&&!i?f=f+(f.indexOf("#")>-1?g:"#"+g):f=a.mobile.path.parseLocation().hash+g,k.activeIndex===0&&f===k.initialDst&&(f+=g),a(b).one("beforenavigate",function(a){a.preventDefault(),d._open(c),d._bindContainerClose()}),this.urlAltered=!0,a.mobile.navigate(f,{role:"dialog"})},close:function(){if(a.mobile.popup.active!==this)return;this._scrollTop=a.mobile.window.scrollTop(),this.options.history&&this.urlAltered?(a.mobile.back(),this.urlAltered=!1):this._closePopup()}}),a.mobile.popup.handleLink=function(b){var c=b.closest(":jqmData(role='page')"),d=c.length===0?a("body"):c,e=a(a.mobile.path.parseUrl(b.attr("href")).hash,d[0]),f;e.data("mobile-popup")&&(f=b.offset(),e.popup("open",{x:f.left+b.outerWidth()/2,y:f.top+b.outerHeight()/2,transition:b.jqmData("transition"),positionTo:b.jqmData("position-to")})),setTimeout(function(){var c=b.parent().parent();c.hasClass("ui-li")&&(b=c.parent()),b.removeClass(a.mobile.activeBtnClass)},300)},a.mobile.document.bind("pagebeforechange",function(b,c){c.options.role==="popup"&&(a.mobile.popup.handleLink(c.options.link),b.preventDefault())}),a.mobile.document.bind("pagecreate create",function(b){a.mobile.popup.prototype.enhanceWithin(b.target,!0)})}(a),function(a,d){a.widget("mobile.panel",a.mobile.widget,{options:{classes:{panel:"ui-panel",panelOpen:"ui-panel-open",panelClosed:"ui-panel-closed",panelFixed:"ui-panel-fixed",panelInner:"ui-panel-inner",modal:"ui-panel-dismiss",modalOpen:"ui-panel-dismiss-open",pagePanel:"ui-page-panel",pagePanelOpen:"ui-page-panel-open",contentWrap:"ui-panel-content-wrap",contentWrapOpen:"ui-panel-content-wrap-open",contentWrapClosed:"ui-panel-content-wrap-closed",contentFixedToolbar:"ui-panel-content-fixed-toolbar",contentFixedToolbarOpen:"ui-panel-content-fixed-toolbar-open",contentFixedToolbarClosed:"ui-panel-content-fixed-toolbar-closed",animate:"ui-panel-animate"},animate:!0,theme:"c",position:"left",dismissible:!0,display:"reveal",initSelector:":jqmData(role='panel')",swipeClose:!0,positionFixed:!1},_panelID:null,_closeLink:null,_page:null,_modal:null,_pannelInner:null,_wrapper:null,_fixedToolbar:null,_create:function(){var b=this,c=b.element,d=c.closest(":jqmData(role='page')"),e=function(){var b=a.data(d[0],"mobilePage").options.theme,c="ui-body-"+b;return c},f=function(){var a=c.find("."+b.options.classes.panelInner);return a.length===0&&(a=c.children().wrapAll('<div class="'+b.options.classes.panelInner+'" />').parent()),a},g=function(){var c=d.find("."+b.options.classes.contentWrap);return c.length===0&&(c=d.children(".ui-header:not(:jqmData(position='fixed')), .ui-content:not(:jqmData(role='popup')), .ui-footer:not(:jqmData(position='fixed'))").wrapAll('<div class="'+b.options.classes.contentWrap+" "+e()+'" />').parent(),a.support.cssTransform3d&&!!b.options.animate&&c.addClass(b.options.classes.animate)),c},h=function(){var c=d.find("."+b.options.classes.contentFixedToolbar);return c.length===0&&(c=d.find(".ui-header:jqmData(position='fixed'), .ui-footer:jqmData(position='fixed')").addClass(b.options.classes.contentFixedToolbar),a.support.cssTransform3d&&!!b.options.animate&&c.addClass(b.options.classes.animate)),c};a.extend(this,{_panelID:c.attr("id"),_closeLink:c.find(":jqmData(rel='close')"),_page:c.closest(":jqmData(role='page')"),_pageTheme:e(),_pannelInner:f(),_wrapper:g(),_fixedToolbar:h()}),b._addPanelClasses(),b._wrapper.addClass(this.options.classes.contentWrapClosed),b._fixedToolbar.addClass(this.options.classes.contentFixedToolbarClosed),b._page.addClass(b.options.classes.pagePanel),a.support.cssTransform3d&&!!b.options.animate&&this.element.addClass(b.options.classes.animate),b._bindUpdateLayout(),b._bindCloseEvents(),b._bindLinkListeners(),b._bindPageEvents(),!b.options.dismissible||b._createModal(),b._bindSwipeEvents()},_createModal:function(b){var c=this;c._modal=a("<div class='"+c.options.classes.modal+"' data-panelid='"+c._panelID+"'></div>").on("mousedown",function(){c.close()}).appendTo(this._page)},_getPosDisplayClasses:function(a){return a+"-position-"+this.options.position+" "+a+"-display-"+this.options.display},_getPanelClasses:function(){var a=this.options.classes.panel+" "+this._getPosDisplayClasses(this.options.classes.panel)+" "+this.options.classes.panelClosed;return this.options.theme&&(a+=" ui-body-"+this.options.theme),!this.options.positionFixed||(a+=" "+this.options.classes.panelFixed),a},_addPanelClasses:function(){this.element.addClass(this._getPanelClasses())},_bindCloseEvents:function(){var a=this;a._closeLink.on("click.panel",function(b){return b.preventDefault(),a.close(),!1}),a.element.on("click.panel","a:jqmData(ajax='false')",function(b){a.close()})},_positionPanel:function(){var b=this,c=b._pannelInner.outerHeight(),d=c>a.mobile.getScreenHeight();d||!b.options.positionFixed?(d&&(b._unfixPanel(),a.mobile.resetActivePageHeight(c)),b._scrollIntoView(c)):b._fixPanel()},_scrollIntoView:function(c){c<a(b).scrollTop()&&b.scrollTo(0,0)},_bindFixListener:function(){this._on(a(b),{throttledresize:"_positionPanel"})},_unbindFixListener:function(){this._off(a(b),"throttledresize")},_unfixPanel:function(){!!this.options.positionFixed&&a.support.fixedPosition&&this.element.removeClass(this.options.classes.panelFixed)},_fixPanel:function(){!!this.options.positionFixed&&a.support.fixedPosition&&this.element.addClass(this.options.classes.panelFixed)},_bindUpdateLayout:function(){var a=this;a.element.on("updatelayout",function(b){a._open&&a._positionPanel()})},_bindLinkListeners:function(){var b=this;b._page.on("click.panel","a",function(c){if(this.href.split("#")[1]===b._panelID&&b._panelID!==d){c.preventDefault();var e=a(this);return e.hasClass("ui-link")||(e.addClass(a.mobile.activeBtnClass),b.element.one("panelopen panelclose",function(){e.removeClass(a.mobile.activeBtnClass)})),b.toggle(),!1}})},_bindSwipeEvents:function(){var a=this,b=a._modal?a.element.add(a._modal):a.element;!a.options.swipeClose||(a.options.position==="left"?b.on("swipeleft.panel",function(b){a.close()}):b.on("swiperight.panel",function(b){a.close()}))},_bindPageEvents:function(){var a=this;a._page.on("panelbeforeopen",function(b){a._open&&b.target!==a.element[0]&&a.close()}).on("pagehide",function(b){a._open&&a.close(!0)}).on("keyup.panel",function(b){b.keyCode===27&&a._open&&a.close()})},_open:!1,_contentWrapOpenClasses:null,_fixedToolbarOpenClasses:null,_modalOpenClasses:null,open:function(b){if(!this._open){var c=this,d=c.options,e=function(){c._page.off("panelclose"),c._page.jqmData("panel","open"),!b&&a.support.cssTransform3d&&!!d.animate?c.element.add(c._wrapper).on(c._transitionEndEvents,f):setTimeout(f,0),c.options.theme&&c.options.display!=="overlay"&&c._page.removeClass(c._pageTheme).addClass("ui-body-"+c.options.theme),c.element.removeClass(d.classes.panelClosed).addClass(d.classes.panelOpen),c._contentWrapOpenClasses=c._getPosDisplayClasses(d.classes.contentWrap),c._wrapper.removeClass(d.classes.contentWrapClosed).addClass(c._contentWrapOpenClasses+" "+d.classes.contentWrapOpen),c._fixedToolbarOpenClasses=c._getPosDisplayClasses(d.classes.contentFixedToolbar),c._fixedToolbar.removeClass(d.classes.contentFixedToolbarClosed).addClass(c._fixedToolbarOpenClasses+" "+d.classes.contentFixedToolbarOpen),c._modalOpenClasses=c._getPosDisplayClasses(d.classes.modal)+" "+d.classes.modalOpen,c._modal&&c._modal.addClass(c._modalOpenClasses)},f=function(){c.element.add(c._wrapper).off(c._transitionEndEvents,f),c._page.addClass(d.classes.pagePanelOpen),c._positionPanel(),c._bindFixListener(),c._trigger("open")};this.element.closest(".ui-page-active").length<0&&(b=!0),c._trigger("beforeopen"),c._page.jqmData("panel")==="open"?c._page.on("panelclose",function(){e()}):e(),c._open=!0}},close:function(b){if(this._open){var c=this.options,d=this,e=function(){!b&&a.support.cssTransform3d&&!!c.animate?d.element.add(d._wrapper).on(d._transitionEndEvents,f):setTimeout(f,0),d._page.removeClass(c.classes.pagePanelOpen),d.element.removeClass(c.classes.panelOpen),d._wrapper.removeClass(c.classes.contentWrapOpen),d._fixedToolbar.removeClass(c.classes.contentFixedToolbarOpen),d._modal&&d._modal.removeClass(d._modalOpenClasses)},f=function(){d.options.theme&&d.options.display!=="overlay"&&d._page.removeClass("ui-body-"+d.options.theme).addClass(d._pageTheme),d.element.add(d._wrapper).off(d._transitionEndEvents,f),d.element.addClass(c.classes.panelClosed),d._wrapper.removeClass(d._contentWrapOpenClasses).addClass(c.classes.contentWrapClosed),d._fixedToolbar.removeClass(d._fixedToolbarOpenClasses).addClass(c.classes.contentFixedToolbarClosed),d._fixPanel(),d._unbindFixListener(),a.mobile.resetActivePageHeight(),d._page.jqmRemoveData("panel"),d._trigger("close")};this.element.closest(".ui-page-active").length<0&&(b=!0),d._trigger("beforeclose"),e(),d._open=!1}},toggle:function(a){this[this._open?"close":"open"]()},_transitionEndEvents:"webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd",_destroy:function(){var b=this.options.classes,c=this.options.theme,d=this.element.siblings("."+b.panel).length;d?this._open&&(this._wrapper.removeClass(b.contentWrapOpen),this._fixedToolbar.removeClass(b.contentFixedToolbarOpen),this._page.jqmRemoveData("panel"),this._page.removeClass(b.pagePanelOpen),c&&this._page.removeClass("ui-body-"+c).addClass(this._pageTheme)):(this._wrapper.children().unwrap(),this._page.find("a").unbind("panelopen panelclose"),this._page.removeClass(b.pagePanel),this._open&&(this._page.jqmRemoveData("panel"),this._page.removeClass(b.pagePanelOpen),c&&this._page.removeClass("ui-body-"+c).addClass(this._pageTheme),a.mobile.resetActivePageHeight())),this._pannelInner.children().unwrap(),this.element.removeClass([this._getPanelClasses(),b.panelAnimate].join(" ")).off("swipeleft.panel swiperight.panel").off("panelbeforeopen").off("panelhide").off("keyup.panel").off("updatelayout"),this._closeLink.off("click.panel"),this._modal&&this._modal.remove(),this.element.off(this._transitionEndEvents).removeClass([b.panelUnfixed,b.panelClosed,b.panelOpen].join(" "))}}),a(c).bind("pagecreate create",function(b){a.mobile.panel.prototype.enhanceWithin(b.target)})}(a),function(a,b){a.widget("mobile.table",a.mobile.widget,{options:{classes:{table:"ui-table"},initSelector:":jqmData(role='table')"},_create:function(){var b=this,c=this.element.find("thead tr");this.element.addClass(this.options.classes.table),b.headers=this.element.find("tr:eq(0)").children(),b.allHeaders=b.headers.add(c.children()),c.each(function(){var d=0;a(this).children().each(function(e){var f=parseIntRadixTen(a(this).attr("colspan"),10),g=":nth-child("+(d+1)+")";a(this).jqmData("colstart",d+1);if(f)for(var h=0;h<f-1;h++)d++,g+=", :nth-child("+(d+1)+")";a(this).jqmData("cells",b.element.find("tr").not(c.eq(0)).not(this).children(g)),d++})})}}),a.mobile.document.bind("pagecreate create",function(b){a.mobile.table.prototype.enhanceWithin(b.target)})}(a),function(a,b){a.mobile.table.prototype.options.mode="columntoggle",a.mobile.table.prototype.options.columnBtnTheme=null,a.mobile.table.prototype.options.columnPopupTheme=null,a.mobile.table.prototype.options.columnBtnText="Columns...",a.mobile.table.prototype.options.classes=a.extend(a.mobile.table.prototype.options.classes,{popup:"ui-table-columntoggle-popup",columnBtn:"ui-table-columntoggle-btn",priorityPrefix:"ui-table-priority-",columnToggleTable:"ui-table-columntoggle"}),a.mobile.document.delegate(":jqmData(role='table')","tablecreate",function(){var b=a(this),c=b.data("mobile-table"),d=c.options,e=a.mobile.ns;if(d.mode!=="columntoggle")return;c.element.addClass(d.classes.columnToggleTable);var f=(b.attr("id")||d.classes.popup)+"-popup",g=a("<a href='#"+f+"' class='"+d.classes.columnBtn+"' data-"+e+"rel='popup' data-"+e+"mini='true'>"+d.columnBtnText+"</a>"),h=a("<div data-"+e+"role='popup' data-"+e+"role='fieldcontain' class='"+d.classes.popup+"' id='"+f+"'></div>"),i=a("<fieldset data-"+e+"role='controlgroup'></fieldset>");c.headers.not("td").each(function(){var b=a(this).jqmData("priority"),c=a(this).add(a(this).jqmData("cells"));b&&(c.addClass(d.classes.priorityPrefix+b),a("<label><input type='checkbox' checked />"+a(this).text()+"</label>").appendTo(i).children(0).jqmData("cells",c).checkboxradio({theme:d.columnPopupTheme}))}),i.appendTo(h),i.on("change","input",function(b){this.checked?a(this).jqmData("cells").removeClass("ui-table-cell-hidden").addClass("ui-table-cell-visible"):a(this).jqmData("cells").removeClass("ui-table-cell-visible").addClass("ui-table-cell-hidden")}),g.insertBefore(b).buttonMarkup({theme:d.columnBtnTheme}),h.insertBefore(b).popup(),c.refresh=function(){i.find("input").each(function(){this.checked=a(this).jqmData("cells").eq(0).css("display")==="table-cell",a(this).checkboxradio("refresh")})},a.mobile.window.on("throttledresize",c.refresh),c.refresh()})}(a),function(a,b){a.mobile.table.prototype.options.mode="reflow",a.mobile.table.prototype.options.classes=a.extend(a.mobile.table.prototype.options.classes,{reflowTable:"ui-table-reflow",cellLabels:"ui-table-cell-label"}),a.mobile.document.delegate(":jqmData(role='table')","tablecreate",function(){var b=a(this),c=b.data("mobile-table"),d=c.options;if(d.mode!=="reflow")return;c.element.addClass(d.classes.reflowTable);var e=a(c.allHeaders.get().reverse());e.each(function(b){var c=a(this).jqmData("cells"),e=a(this).jqmData("colstart"),f=c.not(this).filter("thead th").length&&" ui-table-cell-label-top",g=a(this).text();if(g!=="")if(f){var h=parseIntRadixTen(a(this).attr("colspan"),10),i="";h&&(i="td:nth-child("+h+"n + "+e+")"),c.filter(i).prepend("<b class='"+d.classes.cellLabels+f+"'>"+g+"</b>")}else c.prepend("<b class='"+d.classes.cellLabels+"'>"+g+"</b>")})})}(a),function(a){var b=a("meta[name=viewport]"),c=b.attr("content"),d=c+",maximum-scale=1, user-scalable=no",e=c+",maximum-scale=10, user-scalable=yes",f=/(user-scalable[\s]*=[\s]*no)|(maximum-scale[\s]*=[\s]*1)[$,\s]/.test(c);a.mobile.zoom=a.extend({},{enabled:!f,locked:!1,disable:function(c){!f&&!a.mobile.zoom.locked&&(b.attr("content",d),a.mobile.zoom.enabled=!1,a.mobile.zoom.locked=c||!1)},enable:function(c){!f&&(!a.mobile.zoom.locked||c===!0)&&(b.attr("content",e),a.mobile.zoom.enabled=!0,a.mobile.zoom.locked=!1)},restore:function(){f||(b.attr("content",c),a.mobile.zoom.enabled=!0)}})}(a),function(a,b){a.widget("mobile.textinput",a.mobile.widget,{options:{theme:null,mini:!1,preventFocusZoom:/iPhone|iPad|iPod/.test(navigator.platform)&&navigator.userAgent.indexOf("AppleWebKit")>-1,initSelector:"input[type='text'], input[type='search'], :jqmData(type='search'), input[type='number'], :jqmData(type='number'), input[type='password'], input[type='email'], input[type='url'], input[type='tel'], textarea, input[type='time'], input[type='date'], input[type='month'], input[type='week'], input[type='datetime'], input[type='datetime-local'], input[type='color'], input:not([type]), input[type='file']",clearBtn:!1,clearSearchButtonText:null,clearBtnText:"clear text",disabled:!1},_create:function(){function o(){setTimeout(function(){j.toggleClass("ui-input-clear-hidden",!c.val())},0)}var b=this,c=this.element,d=this.options,e=d.theme||a.mobile.getInheritedTheme(this.element,"c"),f=" ui-body-"+e,g=d.mini?" ui-mini":"",h=c.is("[type='search'], :jqmData(type='search')"),i,j,k=d.clearSearchButtonText||d.clearBtnText,l=c.is("textarea, :jqmData(type='range')"),m=!!d.clearBtn&&!l,n=c.is("input")&&!c.is(":jqmData(type='range')");a("label[for='"+c.attr("id")+"']").addClass("ui-input-text"),i=c.addClass("ui-input-text ui-body-"+e),typeof c[0].autocorrect!="undefined"&&!a.support.touchOverflow&&(c[0].setAttribute("autocorrect","off"),c[0].setAttribute("autocomplete","off")),h?i=c.wrap("<div class='ui-input-search ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-icon-searchfield"+f+g+"'></div>").parent():n&&(i=c.wrap("<div class='ui-input-text ui-shadow-inset ui-corner-all ui-btn-shadow"+f+g+"'></div>").parent()),m||h?(j=a("<a href='#' class='ui-input-clear' title='"+k+"'>"+k+"</a>").bind("click",function(a){c.val("").focus().trigger("change"),j.addClass("ui-input-clear-hidden"),a.preventDefault()}).appendTo(i).buttonMarkup({icon:"delete",iconpos:"notext",corners:!0,shadow:!0,mini:d.mini}),h||i.addClass("ui-input-has-clear"),o(),c.bind("paste cut keyup input focus change blur",o)):!n&&!h&&c.addClass("ui-corner-all ui-shadow-inset"+f+g),c.focus(function(){d.preventFocusZoom&&a.mobile.zoom.disable(!0),i.addClass(a.mobile.focusClass)}).blur(function(){i.removeClass(a.mobile.focusClass),d.preventFocusZoom&&a.mobile.zoom.enable(!0)});if(c.is("textarea")){var p=15,q=100,r;this._keyup=function(){var a=c[0].scrollHeight,b=c[0].clientHeight;b<a&&c.height(a+p)},c.on("keyup change input paste",function(){clearTimeout(r),r=setTimeout(b._keyup,q)}),this._on(a.mobile.document,{pagechange:"_keyup"}),a.trim(c.val())&&this._on(a.mobile.window,{load:"_keyup"})}c.attr("disabled")&&this.disable()},disable:function(){var a,b=this.element.is("[type='search'], :jqmData(type='search')"),c=this.element.is("input")&&!this.element.is(":jqmData(type='range')"),d=this.element.attr("disabled",!0)&&(c||b);return d?a=this.element.parent():a=this.element,a.addClass("ui-disabled"),this._setOption("disabled",!0)},enable:function(){var a,b=this.element.is("[type='search'], :jqmData(type='search')"),c=this.element.is("input")&&!this.element.is(":jqmData(type='range')"),d=this.element.attr("disabled",!1)&&(c||b);return d?a=this.element.parent():a=this.element,a.removeClass("ui-disabled"),this._setOption("disabled",!1)}}),a.mobile.document.bind("pagecreate create",function(b){a.mobile.textinput.prototype.enhanceWithin(b.target,!0)})}(a),function(a,b){a.mobile.listview.prototype.options.filter=!1,a.mobile.listview.prototype.options.filterPlaceholder="Filter items...",a.mobile.listview.prototype.options.filterTheme="c",a.mobile.listview.prototype.options.filterReveal=!1;var c=function(a,b,c){return a.toString().toLowerCase().indexOf(b)===-1};a.mobile.listview.prototype.options.filterCallback=c,a.mobile.document.delegate("ul, ol","listviewcreate",function(){var b=a(this),d=b.data("mobile-listview");if(!d.options.filter)return;d.options.filterReveal&&b.children().addClass("ui-screen-hidden");var e=a("<form>",{"class":"ui-listview-filter ui-bar-"+d.options.filterTheme,role:"search"}).submit(function(a){a.preventDefault(),g.blur()}),f=function(e){var f=a(this),g=this.value.toLowerCase(),h=null,i=b.children(),j=f.jqmData("lastval")+"",k=!1,l="",m,n=d.options.filterCallback!==c;if(j&&j===g)return;d._trigger("beforefilter","beforefilter",{input:this}),f.jqmData("lastval",g),n||g.length<j.length||g.indexOf(j)!==0?h=b.children():(h=b.children(":not(.ui-screen-hidden)"),!h.length&&d.options.filterReveal&&(h=b.children(".ui-screen-hidden")));if(g){for(var o=h.length-1;o>=0;o--)m=a(h[o]),l=m.jqmData("filtertext")||m.text(),m.is("li:jqmData(role=list-divider)")?(m.toggleClass("ui-filter-hidequeue",!k),k=!1):d.options.filterCallback(l,g,m)?m.toggleClass("ui-filter-hidequeue",!0):k=!0;h.filter(":not(.ui-filter-hidequeue)").toggleClass("ui-screen-hidden",!1),h.filter(".ui-filter-hidequeue").toggleClass("ui-screen-hidden",!0).toggleClass("ui-filter-hidequeue",!1)}else h.toggleClass("ui-screen-hidden",!!d.options.filterReveal);d._addFirstLastClasses(i,d._getVisibles(i,!1),!1)},g=a("<input>",{placeholder:d.options.filterPlaceholder}).attr("data-"+a.mobile.ns+"type","search").jqmData("lastval","").bind("keyup change input",f).appendTo(e).textinput();d.options.inset&&e.addClass("ui-listview-filter-inset"),e.bind("submit",function(){return!1}).insertBefore(b)})}(a),function(a,d){a.widget("mobile.slider",a.mobile.widget,{widgetEventPrefix:"slide",options:{theme:null,trackTheme:null,disabled:!1,initSelector:"input[type='range'], :jqmData(type='range'), :jqmData(role='slider')",mini:!1,highlight:!1},_create:function(){var e=this,f=this.element,g=a.mobile.getInheritedTheme(f,"c"),h=this.options.theme||g,i=this.options.trackTheme||g,j=f[0].nodeName.toLowerCase(),k=this.isToggleSwitch=j==="select",l=f.parent().is(":jqmData(role='rangeslider')"),m=this.isToggleSwitch?"ui-slider-switch":"",n=f.attr("id"),o=a("[for='"+n+"']"),p=o.attr("id")||n+"-label",q=o.attr("id",p),r=this.isToggleSwitch?0:parseFloat(f.attr("min")),s=this.isToggleSwitch?f.find("option").length-1:parseFloat(f.attr("max")),t=b.parseFloat(f.attr("step")||1),u=this.options.mini||f.jqmData("mini")?" ui-mini":"",v=c.createElement("a"),w=a(v),x=c.createElement("div"),y=a(x),z=this.options.highlight&&!this.isToggleSwitch?function(){var b=c.createElement("div");return b.className="ui-slider-bg "+a.mobile.activeBtnClass+" ui-btn-corner-all",a(b).prependTo(y)}():!1,A;v.setAttribute("href","#"),x.setAttribute("role","application"),x.className=[this.isToggleSwitch?"ui-slider ":"ui-slider-track ",m," ui-btn-down-",i," ui-btn-corner-all",u].join(""),v.className="ui-slider-handle",x.appendChild(v),w.buttonMarkup({corners:!0,theme:h,shadow:!0}).attr({role:"slider","aria-valuemin":r,"aria-valuemax":s,"aria-valuenow":this._value(),"aria-valuetext":this._value(),title:this._value(),"aria-labelledby":p}),a.extend(this,{slider:y,handle:w,type:j,step:t,max:s,min:r,valuebg:z,isRangeslider:l,dragging:!1,beforeStart:null,userModified:!1,mouseMoved:!1});if(this.isToggleSwitch){var B=c.createElement("div");B.className="ui-slider-inneroffset";for(var C=0,D=x.childNodes.length;C<D;C++)B.appendChild(x.childNodes[C]);x.appendChild(B),w.addClass("ui-slider-handle-snapping"),A=f.find("option");for(var E=0,F=A.length;E<F;E++){var G=E?"a":"b",H=E?" "+a.mobile.activeBtnClass:" ui-btn-down-"+i,I=c.createElement("div"),J=c.createElement("span");J.className=["ui-slider-label ui-slider-label-",G,H," ui-btn-corner-all"].join(""),J.setAttribute("role","img"),J.appendChild(c.createTextNode(A[E].innerHTML)),a(J).prependTo(y)}e._labels=a(".ui-slider-label",y)}q.addClass("ui-slider"),f.addClass(this.isToggleSwitch?"ui-slider-switch":"ui-slider-input"),this._on(f,{change:"_controlChange",keyup:"_controlKeyup",blur:"_controlBlur",vmouseup:"_controlVMouseUp"}),y.bind("vmousedown",a.proxy(this._sliderVMouseDown,this)).bind("vclick",!1),this._on(c,{vmousemove:"_preventDocumentDrag"}),this._on(y.add(c),{vmouseup:"_sliderVMouseUp"}),y.insertAfter(f);if(!this.isToggleSwitch&&!l){var B=this.options.mini?"<div class='ui-slider ui-mini'>":"<div class='ui-slider'>";f.add(y).wrapAll(B)}this.isToggleSwitch&&this.handle.bind({focus:function(){y.addClass(a.mobile.focusClass)},blur:function(){y.removeClass(a.mobile.focusClass)}}),this._on(this.handle,{vmousedown:"_handleVMouseDown",keydown:"_handleKeydown",keyup:"_handleKeyup"}),this.handle.bind("vclick",!1),this._handleFormReset&&this._handleFormReset(),this.refresh(d,d,!0)},_controlChange:function(a){if(this._trigger("controlchange",a)===!1)return!1;this.mouseMoved||this.refresh(this._value(),!0)},_controlKeyup:function(a){this.refresh(this._value(),!0,!0)},_controlBlur:function(a){this.refresh(this._value(),!0)},_controlVMouseUp:function(a){this._checkedRefresh()},_handleVMouseDown:function(a){this.handle.focus()},_handleKeydown:function(b){var c=this._value();if(this.options.disabled)return;switch(b.keyCode){case a.mobile.keyCode.HOME:case a.mobile.keyCode.END:case a.mobile.keyCode.PAGE_UP:case a.mobile.keyCode.PAGE_DOWN:case a.mobile.keyCode.UP:case a.mobile.keyCode.RIGHT:case a.mobile.keyCode.DOWN:case a.mobile.keyCode.LEFT:b.preventDefault(),this._keySliding||(this._keySliding=!0,this.handle.addClass("ui-state-active"))}switch(b.keyCode){case a.mobile.keyCode.HOME:this.refresh(this.min);break;case a.mobile.keyCode.END:this.refresh(this.max);break;case a.mobile.keyCode.PAGE_UP:case a.mobile.keyCode.UP:case a.mobile.keyCode.RIGHT:this.refresh(c+this.step);break;case a.mobile.keyCode.PAGE_DOWN:case a.mobile.keyCode.DOWN:case a.mobile.keyCode.LEFT:this.refresh(c-this.step)}},_handleKeyup:function(a){this._keySliding&&(this._keySliding=!1,this.handle.removeClass("ui-state-active"))},_sliderVMouseDown:function(a){return this.options.disabled?!1:this._trigger("beforestart",a)===!1?!1:(this.dragging=!0,this.userModified=!1,this.mouseMoved=!1,this.isToggleSwitch&&(this.beforeStart=this.element[0].selectedIndex),this.refresh(a),this._trigger("start"),!1)},_sliderVMouseUp:function(){if(this.dragging)return this.dragging=!1,this.isToggleSwitch&&(this.handle.addClass("ui-slider-handle-snapping"),this.mouseMoved?this.userModified?this.refresh(this.beforeStart===0?1:0):this.refresh(this.beforeStart):this.refresh(this.beforeStart===0?1:0)),this.mouseMoved=!1,this._trigger("stop"),!1},_preventDocumentDrag:function(a){if(this._trigger("drag",a)===!1)return!1;if(this.dragging&&!this.options.disabled)return this.mouseMoved=!0,this.isToggleSwitch&&this.handle.removeClass("ui-slider-handle-snapping"),this.refresh(a),this.userModified=this.beforeStart!==this.element[0].selectedIndex,!1},_checkedRefresh:function(){this.value!=this._value()&&this.refresh(this._value())},_value:function(){return this.isToggleSwitch?this.element[0].selectedIndex:parseFloat(this.element.val())},_reset:function(){this.refresh(d,!1,!0)},refresh:function(b,d,e){var f=this,g=a.mobile.getInheritedTheme(this.element,"c"),h=this.options.theme||g,i=this.options.trackTheme||g;f.slider[0].className=[this.isToggleSwitch?"ui-slider ui-slider-switch":"ui-slider-track"," ui-btn-down-"+i," ui-btn-corner-all",this.options.mini?" ui-mini":""].join(""),(this.options.disabled||this.element.attr("disabled"))&&this.disable(),this.value=this._value(),this.options.highlight&&!this.isToggleSwitch&&this.slider.find(".ui-slider-bg").length===0&&(this.valuebg=function(){var b=c.createElement("div");return b.className="ui-slider-bg "+a.mobile.activeBtnClass+" ui-btn-corner-all",a(b).prependTo(f.slider)}()),this.handle.buttonMarkup({corners:!0,theme:h,shadow:!0});var j,k,l=this.element,m=!this.isToggleSwitch,n=m?[]:l.find("option"),o=m?parseFloat(l.attr("min")):0,p=m?parseFloat(l.attr("max")):n.length-1,q=m&&parseFloat(l.attr("step"))>0?parseFloat(l.attr("step")):1;if(typeof b=="object"){var r,s,t=b,u=8;r=this.slider.offset().left,s=this.slider.width(),j=s/((p-o)/q);if(!this.dragging||t.pageX<r-u||t.pageX>r+s+u)return;j>1?k=(t.pageX-r)/s*100:k=Math.round((t.pageX-r)/s*100)}else b==null&&(b=m?parseFloat(l.val()||0):l[0].selectedIndex),k=(parseFloat(b)-o)/(p-o)*100;if(isNaN(k))return;var v=k/100*(p-o)+o,w=(v-o)%q,x=v-w;Math.abs(w)*2>=q&&(x+=w>0?q:-q);var y=100/((p-o)/q);v=parseFloat(x.toFixed(5)),typeof j=="undefined"&&(j=s/((p-o)/q)),j>1&&m&&(k=(v-o)*y*(1/q)),k<0&&(k=0),k>100&&(k=100),v<o&&(v=o),v>p&&(v=p),this.handle.css("left",k+"%"),this.handle[0].setAttribute("aria-valuenow",m?v:n.eq(v).attr("value")),this.handle[0].setAttribute("aria-valuetext",m?v:n.eq(v).getEncodedText()),this.handle[0].setAttribute("title",m?v:n.eq(v).getEncodedText()),this.valuebg&&this.valuebg.css("width",k+"%");if(this._labels){var z=this.handle.width()/this.slider.width()*100,A=k&&z+(100-z)*k/100,B=k===100?0:Math.min(z+100-A,100);this._labels.each(function(){var b=a(this).is(".ui-slider-label-a");a(this).width((b?A:B)+"%")})}if(!e){var C=!1;m?(C=l.val()!==v,l.val(v)):(C=l[0].selectedIndex!==v,l[0].selectedIndex=v);if(this._trigger("beforechange",b)===!1)return!1;!d&&C&&l.trigger("change")}},enable:function(){return this.element.attr("disabled",!1),this.slider.removeClass("ui-disabled").attr("aria-disabled",!1),this._setOption("disabled",!1)},disable:function(){return this.element.attr("disabled",!0),this.slider.addClass("ui-disabled").attr("aria-disabled",!0),this._setOption("disabled",!0)}}),a.widget("mobile.slider",a.mobile.slider,a.mobile.behaviors.formReset),a.mobile.document.bind("pagecreate create",function(b){a.mobile.slider.prototype.enhanceWithin(b.target,!0)})}(a),function(a,b){a.widget("mobile.rangeslider",a.mobile.widget,{options:{theme:null,trackTheme:null,disabled:!1,initSelector:":jqmData(role='rangeslider')",mini:!1,highlight:!0},_create:function(){var b,c=this.element,d=this.options.mini?"ui-rangeslider ui-mini":"ui-rangeslider",e=c.find("input").first(),f=c.find("input").last(),g=c.find("label").first(),h=a.data(e.get(0),"mobileSlider").slider,i=a.data(f.get(0),"mobileSlider").slider,j=a.data(e.get(0),"mobileSlider").handle,k=a('<div class="ui-rangeslider-sliders" />').appendTo(c);c.find("label").length>1&&(b=c.find("label").last().hide()),e.addClass("ui-rangeslider-first"),f.addClass("ui-rangeslider-last"),c.addClass(d),h.appendTo(k),i.appendTo(k),g.prependTo(c),j.prependTo(i),a.extend(this,{_inputFirst:e,_inputLast:f,_sliderFirst:h,_sliderLast:i,_targetVal:null,_sliderTarget:!1,_sliders:k,_proxy:!1}),this.refresh(),this._on(this.element.find("input.ui-slider-input"),{slidebeforestart:"_slidebeforestart",slidestop:"_slidestop",slidedrag:"_slidedrag",slidebeforechange:"_change",blur:"_change",keyup:"_change"}),this._on(j,{vmousedown:"_dragFirstHandle"})},_dragFirstHandle:function(b){return a.data(this._inputFirst.get(0),"mobileSlider").dragging=!0,a.data(this._inputFirst.get(0),"mobileSlider").refresh(b),!1},_slidedrag:function(b){var c=a(b.target).is(this._inputFirst),d=c?this._inputLast:this._inputFirst;this._sliderTarget=!1;if(this._proxy==="first"&&c||this._proxy==="last"&&!c)return a.data(d.get(0),"mobileSlider").dragging=!0,a.data(d.get(0),"mobileSlider").refresh(b),!1},_slidestop:function(b){var c=a(b.target).is(this._inputFirst);this._proxy=!1,this.element.find("input").trigger("vmouseup"),this._sliderFirst.css("z-index",c?1:"")},_slidebeforestart:function(b){this._sliderTarget=!1,a(b.originalEvent.target).hasClass("ui-slider-track")&&(this._sliderTarget=!0,this._targetVal=a(b.target).val())},_setOption:function(a){this._superApply(a),this.refresh()},refresh:function(){var a=this.element,b=this.options;a.find("input").slider({theme:b.theme,trackTheme:b.trackTheme,disabled:b.disabled,mini:b.mini,highlight:b.highlight}).slider("refresh"),this._updateHighlight()},_change:function(b){if(b.type=="keyup")return this._updateHighlight(),!1;var c=parseFloat(this._inputFirst.val(),10),d=parseFloat(this._inputLast.val(),10),e=a(b.target).hasClass("ui-rangeslider-first"),f=e?this._inputFirst:this._inputLast,g=e?this._inputLast:this._inputFirst;if(c>d&&!this._sliderTarget)f.val(e?d:c).slider("refresh"),this._trigger("normalize");else if(c>d){f.val(this._targetVal).slider("refresh");var h=this;setTimeout(function(){g.val(e?c:d).slider("refresh"),a.data(g.get(0),"mobileSlider").handle.focus(),h._sliderFirst.css("z-index",e?"":1),h._trigger("normalize")},0),this._proxy=e?"first":"last"}c===d?(a.data(f.get(0),"mobileSlider").handle.css("z-index",1),a.data(g.get(0),"mobileSlider").handle.css("z-index",0)):(a.data(g.get(0),"mobileSlider").handle.css("z-index",""),a.data(f.get(0),"mobileSlider").handle.css("z-index","")),this._updateHighlight();if(c>=d)return!1},_updateHighlight:function(){var b=parseIntRadixTen(a.data(this._inputFirst.get(0),"mobileSlider").handle.get(0).style.left,10),c=parseIntRadixTen(a.data(this._inputLast.get(0),"mobileSlider").handle.get(0).style.left,10),d=c-b;this.element.find(".ui-slider-bg").css({"margin-left":b+"%",width:d+"%"})},_destroy:function(){this.element.removeClass("ui-rangeslider ui-mini").find("label").show(),this._inputFirst.after(this._sliderFirst),this._inputLast.after(this._sliderLast),this._sliders.remove(),this.element.find("input").removeClass("ui-rangeslider-first ui-rangeslider-last").slider("destroy")}}),a.widget("mobile.rangeslider",a.mobile.rangeslider,a.mobile.behaviors.formReset),a(c).bind("pagecreate create",function(b){a.mobile.rangeslider.prototype.enhanceWithin(b.target,!0)})}(a),function(a,d){a.widget("mobile.selectmenu",a.mobile.widget,{options:{theme:null,disabled:!1,icon:"arrow-d",iconpos:"right",inline:!1,corners:!0,shadow:!0,iconshadow:!0,overlayTheme:"a",dividerTheme:"b",hidePlaceholderMenuItems:!0,closeText:"Close",nativeMenu:!0,preventFocusZoom:/iPhone|iPad|iPod/.test(navigator.platform)&&navigator.userAgent.indexOf("AppleWebKit")>-1,initSelector:"select:not( :jqmData(role='slider') )",mini:!1},_button:function(){return a("<div/>")},_setDisabled:function(a){return this.element.attr("disabled",a),this.button.attr("aria-disabled",a),this._setOption("disabled",a)},_focusButton:function(){var a=this;setTimeout(function(){a.button.focus()},40)},_selectOptions:function(){return this.select.find("option")},_preExtension:function(){var b="";!~this.element[0].className.indexOf("ui-btn-left")||(b=" ui-btn-left"),!~this.element[0].className.indexOf("ui-btn-right")||(b=" ui-btn-right"),this.select=this.element.removeClass("ui-btn-left ui-btn-right").wrap("<div class='ui-select"+b+"'>"),this.selectID=this.select.attr("id"),this.label=a("label[for='"+this.selectID+"']").addClass("ui-select"),this.isMultiple=this.select[0].multiple,this.options.theme||(this.options.theme=a.mobile.getInheritedTheme(this.select,"c"))},_destroy:function(){var a=this.element.parents(".ui-select");a.length>0&&(a.is(".ui-btn-left, .ui-btn-right")&&this.element.addClass(a.is(".ui-btn-left")?"ui-btn-left":"ui-btn-right"),this.element.insertAfter(a),a.remove())},_create:function(){this._preExtension(),this._trigger("beforeCreate"),this.button=this._button();var c=this,d=this.options,e=d.inline||this.select.jqmData("inline"),f=d.mini||this.select.jqmData("mini"),g=d.icon?d.iconpos||this.select.jqmData("iconpos"):!1,h=this.select[0].selectedIndex===-1?0:this.select[0].selectedIndex,i=this.button.insertBefore(this.select).buttonMarkup({theme:d.theme,icon:d.icon,iconpos:g,inline:e,corners:d.corners,shadow:d.shadow,iconshadow:d.iconshadow,mini:f});this.setButtonText(),d.nativeMenu&&b.opera&&b.opera.version&&i.addClass("ui-select-nativeonly"),this.isMultiple&&(this.buttonCount=a("<span>").addClass("ui-li-count ui-btn-up-c ui-btn-corner-all").hide().appendTo(i.addClass("ui-li-has-count"))),(d.disabled||this.element.attr("disabled"))&&this.disable(),this.select.change(function(){c.refresh()}),this._handleFormReset&&this._handleFormReset(),this.build()},build:function(){var b=this;this.select.appendTo(b.button).bind("vmousedown",function(){b.button.addClass(a.mobile.activeBtnClass)}).bind("focus",function(){b.button.addClass(a.mobile.focusClass)}).bind("blur",function(){b.button.removeClass(a.mobile.focusClass)}).bind("focus vmouseover",function(){b.button.trigger("vmouseover")}).bind("vmousemove",function(){b.button.removeClass(a.mobile.activeBtnClass)}).bind("change blur vmouseout",function(){b.button.trigger("vmouseout").removeClass(a.mobile.activeBtnClass)}).bind("change blur",function(){b.button.removeClass("ui-btn-down-"+b.options.theme)}),b.button.bind("vmousedown",function(){b.options.preventFocusZoom&&a.mobile.zoom.disable(!0)}),b.label.bind("click focus",function(){b.options.preventFocusZoom&&a.mobile.zoom.disable(!0)}),b.select.bind("focus",function(){b.options.preventFocusZoom&&a.mobile.zoom.disable(!0)}),b.button.bind("mouseup",function(){b.options.preventFocusZoom&&setTimeout(function(){a.mobile.zoom.enable(!0)},0)}),b.select.bind("blur",function(){b.options.preventFocusZoom&&a.mobile.zoom.enable(!0)})},selected:function(){return this._selectOptions().filter(":selected")},selectedIndices:function(){var a=this;return this.selected().map(function(){return a._selectOptions().index(this)}).get()},setButtonText:function(){var b=this,d=this.selected(),e=this.placeholder,f=a(c.createElement("span"));this.button.find(".ui-btn-text").html(function(){return d.length?e=d.map(function(){return a(this).text()}).get().join(", "):e=b.placeholder,f.text(e).addClass(b.select.attr("class")).addClass(d.attr("class"))})},setButtonCount:function(){var a=this.selected();this.isMultiple&&this.buttonCount[a.length>1?"show":"hide"]().text(a.length)},_reset:function(){this.refresh()},refresh:function(){this.setButtonText(),this.setButtonCount()},open:a.noop,close:a.noop,disable:function(){this._setDisabled(!0),this.button.addClass("ui-disabled")},enable:function(){this._setDisabled(!1),this.button.removeClass("ui-disabled")}}),a.widget("mobile.selectmenu",a.mobile.selectmenu,a.mobile.behaviors.formReset),a.mobile.document.bind("pagecreate create",function(b){a.mobile.selectmenu.prototype.enhanceWithin(b.target,!0)})}(a),function(a,b){var d=function(d){var e=d.select,f=d._destroy,g=d.selectID,h=g?g:(a.mobile.ns||"")+"uuid-"+d.uuid,i=h+"-listbox",j=h+"-dialog",k=d.label,l=d.select.closest(".ui-page"),m=d._selectOptions(),n=d.isMultiple=d.select[0].multiple,o=g+"-button",p=g+"-menu",q=a("<div data-"+a.mobile.ns+"role='dialog' id='"+j+"' data-"+a.mobile.ns+"theme='"+d.options.theme+"' data-"+a.mobile.ns+"overlay-theme='"+d.options.overlayTheme+"'>"+"<div data-"+a.mobile.ns+"role='header'>"+"<div class='ui-title'>"+k.getEncodedText()+"</div>"+"</div>"+"<div data-"+a.mobile.ns+"role='content'></div>"+"</div>"),r=a("<div id='"+i+"' class='ui-selectmenu'>").insertAfter(d.select).popup({theme:d.options.overlayTheme}),s=a("<ul>",{"class":"ui-selectmenu-list",id:p,role:"listbox","aria-labelledby":o}).attr("data-"+a.mobile.ns+"theme",d.options.theme).attr("data-"+a.mobile.ns+"divider-theme",d.options.dividerTheme).appendTo(r),t=a("<div>",{"class":"ui-header ui-bar-"+d.options.theme}).prependTo(r),u=a("<h1>",{"class":"ui-title"}).appendTo(t),v,w,x;d.isMultiple&&(x=a("<a>",{text:d.options.closeText,href:"#","class":"ui-btn-left"}).attr("data-"+a.mobile.ns+"iconpos","notext").attr("data-"+a.mobile.ns+"icon","delete").appendTo(t).buttonMarkup()),a.extend(d,{select:d.select,selectID:g,buttonId:o,menuId:p,popupID:i,dialogID:j,thisPage:l,menuPage:q,label:k,selectOptions:m,isMultiple:n,theme:d.options.theme,listbox:r,list:s,header:t,headerTitle:u,headerClose:x,menuPageContent:v,menuPageClose:w,placeholder:"",build:function(){var c=this;c.refresh(),c._origTabIndex===b&&(c._origTabIndex=c.select[0].getAttribute("tabindex")===null?!1:c.select.attr("tabindex")),c.select.attr("tabindex","-1").focus(function(){a(this).blur(),c.button.focus()}),c.button.bind("vclick keydown",function(b){if(c.options.disabled||c.isOpen)return;if(b.type==="vclick"||b.keyCode&&(b.keyCode===a.mobile.keyCode.ENTER||b.keyCode===a.mobile.keyCode.SPACE))c._decideFormat(),c.menuType==="overlay"?c.button.attr("href","#"+c.popupID).attr("data-"+(a.mobile.ns||"")+"rel","popup"):c.button.attr("href","#"+c.dialogID).attr("data-"+(a.mobile.ns||"")+"rel","dialog"),c.isOpen=!0}),c.list.attr("role","listbox").bind("focusin",function(b){a(b.target).attr("tabindex","0").trigger("vmouseover")}).bind("focusout",function(b){a(b.target).attr("tabindex","-1").trigger("vmouseout")}).delegate("li:not(.ui-disabled, .ui-li-divider)","click",function(b){var e=c.select[0].selectedIndex,f=c.list.find("li:not(.ui-li-divider)").index(this),g=c._selectOptions().eq(f)[0];g.selected=c.isMultiple?!g.selected:!0,c.isMultiple&&a(this).find(".ui-icon").toggleClass("ui-icon-checkbox-on",g.selected).toggleClass("ui-icon-checkbox-off",!g.selected),(c.isMultiple||e!==f)&&c.select.trigger("change"),c.isMultiple?c.list.find("li:not(.ui-li-divider)").eq(f).addClass("ui-btn-down-"+d.options.theme).find("a").first().focus():c.close(),b.preventDefault()}).keydown(function(b){var c=a(b.target),e=c.closest("li"),f,g;switch(b.keyCode){case 38:return f=e.prev().not(".ui-selectmenu-placeholder"),f.is(".ui-li-divider")&&(f=f.prev()),f.length&&(c.blur().attr("tabindex","-1"),f.addClass("ui-btn-down-"+d.options.theme).find("a").first().focus()),!1;case 40:return g=e.next(),g.is(".ui-li-divider")&&(g=g.next()),g.length&&(c.blur().attr("tabindex","-1"),g.addClass("ui-btn-down-"+d.options.theme).find("a").first().focus()),!1;case 13:case 32:return c.trigger("click"),!1}}),c.menuPage.bind("pagehide",function(){a.mobile._bindPageRemove.call(c.thisPage)}),c.listbox.bind("popupafterclose",function(a){c.close()}),c.isMultiple&&c.headerClose.click(function(){if(c.menuType==="overlay")return c.close(),!1}),c.thisPage.addDependents(this.menuPage)},_isRebuildRequired:function(){var a=this.list.find("li"),b=this._selectOptions();return b.text()!==a.text()},selected:function(){return this._selectOptions().filter(":selected:not( :jqmData(placeholder='true') )")},refresh:function(b,c){var d=this,e=this.element,f=this.isMultiple,g;(b||this._isRebuildRequired())&&d._buildList(),g=this.selectedIndices(),d.setButtonText(),d.setButtonCount(),d.list.find("li:not(.ui-li-divider)").removeClass(a.mobile.activeBtnClass).attr("aria-selected",!1).each(function(b){if(a.inArray(b,g)>-1){var c=a(this);c.attr("aria-selected",!0),d.isMultiple?c.find(".ui-icon").removeClass("ui-icon-checkbox-off").addClass("ui-icon-checkbox-on"):c.is(".ui-selectmenu-placeholder")?c.next().addClass(a.mobile.activeBtnClass):c.addClass(a.mobile.activeBtnClass)}})},close:function(){if(this.options.disabled||!this.isOpen)return;var a=this;a.menuType==="page"?(a.menuPage.dialog("close"),a.list.appendTo(a.listbox)):a.listbox.popup("close"),a._focusButton(),a.isOpen=!1},open:function(){this.button.click()},_decideFormat:function(){function m(){var c=b.list.find("."+a.mobile.activeBtnClass+" a");c.length===0&&(c=b.list.find("li.ui-btn:not( :jqmData(placeholder='true') ) a")),c.first().focus().closest("li").addClass("ui-btn-down-"+d.options.theme)}var b=this,c=a.mobile.window,e=b.list.parent(),f=e.outerHeight(),g=e.outerWidth(),h=a("."+a.mobile.activePageClass),i=c.scrollTop(),j=b.button.offset().top,k=c.height(),l=c.width();f>k-80||!a.support.scrollTop?(b.menuPage.appendTo(a.mobile.pageContainer).page(),b.menuPageContent=q.find(".ui-content"),b.menuPageClose=q.find(".ui-header a"),b.thisPage.unbind("pagehide.remove"),i===0&&j>k&&b.thisPage.one("pagehide",function(){a(this).jqmData("lastScroll",j)}),b.menuPage.one("pageshow",function(){m()}).one("pagehide",function(){b.close()}),b.menuType="page",b.menuPageContent.append(b.list),b.menuPage.find("div .ui-title").text(b.label.text())):(b.menuType="overlay",b.listbox.one("popupafteropen",m))},_buildList:function(){var b=this,d=this.options,e=this.placeholder,f=!0,g=[],h=[],i=b.isMultiple?"checkbox-off":"false";b.list.empty().filter(".ui-listview").listview("destroy");var j=b.select.find("option"),k=j.length,l=this.select[0],m="data-"+a.mobile.ns,n=m+"option-index",o=m+"icon",p=m+"role",q=m+"placeholder",r=c.createDocumentFragment(),s=!1,t;for(var u=0;u<k;u++,s=!1){var v=j[u],w=a(v),x=v.parentNode,y=w.text(),z=c.createElement("a"),A=[];z.setAttribute("href","#"),z.appendChild(c.createTextNode(y));if(x!==l&&x.nodeName.toLowerCase()==="optgroup"){var B=x.getAttribute("label");if(B!==t){var C=c.createElement("li");C.setAttribute(p,"list-divider"),C.setAttribute("role","option"),C.setAttribute("tabindex","-1"),C.appendChild(c.createTextNode(B)),r.appendChild(C),t=B}}f&&(!v.getAttribute("value")||y.length===0||w.jqmData("placeholder"))&&(f=!1,s=!0,null===v.getAttribute(q)&&(this._removePlaceholderAttr=!0),v.setAttribute(q,!0),d.hidePlaceholderMenuItems&&A.push("ui-selectmenu-placeholder"),e!==y&&(e=b.placeholder=y));var D=c.createElement("li");v.disabled&&(A.push("ui-disabled"),D.setAttribute("aria-disabled",!0)),D.setAttribute(n,u),D.setAttribute(o,i),s&&D.setAttribute(q,!0),D.className=A.join(" "),D.setAttribute("role","option"),z.setAttribute("tabindex","-1"),D.appendChild(z),r.appendChild(D)}b.list[0].appendChild(r),!this.isMultiple&&!e.length?this.header.hide():this.headerTitle.text(this.placeholder),b.list.listview()},_button:function(){return a("<a>",{href:"#",role:"button",id:this.buttonId,"aria-haspopup":"true","aria-owns":this.menuId})},_destroy:function(){this.close(),this._origTabIndex!==b&&(this._origTabIndex!==!1?this.select.attr("tabindex",this._origTabIndex):this.select.removeAttr("tabindex")),this._removePlaceholderAttr&&this._selectOptions().removeAttr("data-"+a.mobile.ns+"placeholder"),this.listbox.remove(),f.apply(this,arguments)}})};a.mobile.document.bind("selectmenubeforecreate",function(b){var c=a(b.target).data("mobile-selectmenu");!c.options.nativeMenu&&c.element.parents(":jqmData(role='popup')").length===0&&d(c)})}(a),function(a,b){a.widget("mobile.fixedtoolbar",a.mobile.widget,{options:{visibleOnPageShow:!0,disablePageZoom:!0,transition:"slide",fullscreen:!1,tapToggle:!0,tapToggleBlacklist:"a, button, input, select, textarea, .ui-header-fixed, .ui-footer-fixed, .ui-popup, .ui-panel, .ui-panel-dismiss-open",hideDuringFocus:"input, textarea, select",updatePagePadding:!0,trackPersistentToolbars:!0,supportBlacklist:function(){return!a.support.fixedPosition},initSelector:":jqmData(position='fixed')"},_create:function(){var b=this,c=b.options,d=b.element,e=d.is(":jqmData(role='header')")?"header":"footer",f=d.closest(".ui-page");if(c.supportBlacklist()){b.destroy();return}d.addClass("ui-"+e+"-fixed"),c.fullscreen?(d.addClass("ui-"+e+"-fullscreen"),f.addClass("ui-page-"+e+"-fullscreen")):f.addClass("ui-page-"+e+"-fixed"),a.extend(this,{_thisPage:null}),b._addTransitionClass(),b._bindPageEvents(),b._bindToggleHandlers()},_addTransitionClass:function(){var a=this.options.transition;a&&a!=="none"&&(a==="slide"&&(a=this.element.is(".ui-header")?"slidedown":"slideup"),this.element.addClass(a))},_bindPageEvents:function(){this._thisPage=this.element.closest(".ui-page"),this._on(this._thisPage,{pagebeforeshow:"_handlePageBeforeShow",webkitAnimationStart:"_handleAnimationStart",animationstart:"_handleAnimationStart",updatelayout:"_handleAnimationStart",pageshow:"_handlePageShow",pagebeforehide:"_handlePageBeforeHide"})},_handlePageBeforeShow:function(){var b=this.options;b.disablePageZoom&&a.mobile.zoom.disable(!0),b.visibleOnPageShow||this.hide(!0)},_handleAnimationStart:function(){this.options.updatePagePadding&&this.updatePagePadding(this._thisPage)},_handlePageShow:function(){this.updatePagePadding(this._thisPage),this.options.updatePagePadding&&this._on(a.mobile.window,{throttledresize:"updatePagePadding"})},_handlePageBeforeHide:function(b,c){var d=this.options;d.disablePageZoom&&a.mobile.zoom.enable(!0),d.updatePagePadding&&this._off(a.mobile.window,"throttledresize");if(d.trackPersistentToolbars){var e=a(".ui-footer-fixed:jqmData(id)",this._thisPage),f=a(".ui-header-fixed:jqmData(id)",this._thisPage),g=e.length&&c.nextPage&&a(".ui-footer-fixed:jqmData(id='"+e.jqmData("id")+"')",c.nextPage)||a(),h=f.length&&c.nextPage&&a(".ui-header-fixed:jqmData(id='"+f.jqmData("id")+"')",c.nextPage)||a();if(g.length||h.length)g.add(h).appendTo(a.mobile.pageContainer),c.nextPage.one("pageshow",function(){h.prependTo(this),g.appendTo(this)})}},_visible:!0,updatePagePadding:function(b){var c=this.element,d=c.is(".ui-header"),e=parseFloat(c.css(d?"top":"bottom"));if(this.options.fullscreen)return;b=b||this._thisPage||c.closest(".ui-page"),a(b).css("padding-"+(d?"top":"bottom"),c.outerHeight()+e)},_useTransition:function(b){var c=a.mobile.window,d=this.element,e=c.scrollTop(),f=d.height(),g=d.closest(".ui-page").height(),h=a.mobile.getScreenHeight(),i=d.is(":jqmData(role='header')")?"header":"footer";return!b&&(this.options.transition&&this.options.transition!=="none"&&(i==="header"&&!this.options.fullscreen&&e>f||i==="footer"&&!this.options.fullscreen&&e+h<g-f)||this.options.fullscreen)},show:function(a){var b="ui-fixed-hidden",c=this.element;this._useTransition(a)?c.removeClass("out "+b).addClass("in").animationComplete(function(){c.removeClass("in")}):c.removeClass(b),this._visible=!0},hide:function(a){var b="ui-fixed-hidden",c=this.element,d="out"+(this.options.transition==="slide"?" reverse":"");this._useTransition(a)?c.addClass(d).removeClass("in").animationComplete(function(){c.addClass(b).removeClass(d)}):c.addClass(b).removeClass(d),this._visible=!1},toggle:function(){this[this._visible?"hide":"show"]()},_bindToggleHandlers:function(){var b=this,c,d=b.options,e=b.element;e.closest(".ui-page").bind("vclick",function(c){d.tapToggle&&!a(c.target).closest(d.tapToggleBlacklist).length&&b.toggle()}).bind("focusin focusout",function(e){screen.width<1025&&a(e.target).is(d.hideDuringFocus)&&!a(e.target).closest(".ui-header-fixed, .ui-footer-fixed").length&&(e.type==="focusout"&&!b._visible?c=setTimeout(function(){b.show()},0):e.type==="focusin"&&b._visible&&(clearTimeout(c),b.hide()))})},_destroy:function(){var a=this.element,b=a.is(".ui-header");a.closest(".ui-page").css("padding-"+(b?"top":"bottom"),""),a.removeClass("ui-header-fixed ui-footer-fixed ui-header-fullscreen ui-footer-fullscreen in out fade slidedown slideup ui-fixed-hidden"),a.closest(".ui-page").removeClass("ui-page-header-fixed ui-page-footer-fixed ui-page-header-fullscreen ui-page-footer-fullscreen")}}),a.mobile.document.bind("pagecreate create",function(b){a(b.target).jqmData("fullscreen")&&a(a.mobile.fixedtoolbar.prototype.options.initSelector,b.target).not(":jqmData(fullscreen)").jqmData("fullscreen",!0),a.mobile.fixedtoolbar.prototype.enhanceWithin(b.target)})}(a),function(a,b){a.widget("mobile.fixedtoolbar",a.mobile.fixedtoolbar,{_create:function(){this._super(),this._workarounds()},_workarounds:function(){var a=navigator.userAgent,b=navigator.platform,c=a.match(/AppleWebKit\/([0-9]+)/),d=!!c&&c[1],e=null,f=this;if(b.indexOf("iPhone")>-1||b.indexOf("iPad")>-1||b.indexOf("iPod")>-1)e="ios";else if(a.indexOf("Android")>-1)e="android";else return;if(e==="ios")f._bindScrollWorkaround();else if(e==="android"&&d&&d<534)f._bindScrollWorkaround(),f._bindListThumbWorkaround();else return},_viewportOffset:function(){var b=this.element,c=b.is(".ui-header"),d=Math.abs(b.offset().top-a.mobile.window.scrollTop());return c||(d=Math.round(d-a.mobile.window.height()+b.outerHeight())-60),d},_bindScrollWorkaround:function(){var b=this;this._on(a.mobile.window,{scrollstop:function(){var a=b._viewportOffset();a>2&&b._visible&&b._triggerRedraw()}})},_bindListThumbWorkaround:function(){this.element.closest(".ui-page").addClass("ui-android-2x-fixed")},_triggerRedraw:function(){var b=parseFloat(a(".ui-page-active").css("padding-bottom"));a(".ui-page-active").css("padding-bottom",b+1+"px"),setTimeout(function(){a(".ui-page-active").css("padding-bottom",b+"px")},0)},destroy:function(){this._super(),this.element.closest(".ui-page-active").removeClass("ui-android-2x-fix")}})}(a),function(a,b){function j(a){e=a.originalEvent,i=e.accelerationIncludingGravity,f=Math.abs(i.x),g=Math.abs(i.y),h=Math.abs(i.z),!b.orientation&&(f>7||(h>6&&g<8||h<8&&g>6)&&f>5)?d.enabled&&d.disable():d.enabled||d.enable()}a.mobile.iosorientationfixEnabled=!0;var c=navigator.userAgent;if(!(/iPhone|iPad|iPod/.test(navigator.platform)&&/OS [1-5]_[0-9_]* like Mac OS X/i.test(c)&&c.indexOf("AppleWebKit")>-1)){a.mobile.iosorientationfixEnabled=!1;return}var d=a.mobile.zoom,e,f,g,h,i;a.mobile.document.on("mobileinit",function(){a.mobile.iosorientationfixEnabled&&a.mobile.window.bind("orientationchange.iosorientationfix",d.enable).bind("devicemotion.iosorientationfix",j)})}(a,this),function(a,b,d){function h(){e.removeClass("ui-mobile-rendering")}var e=a("html"),f=a("head"),g=a.mobile.window;a(b.document).trigger("mobileinit");if(!a.mobile.gradeA())return;a.mobile.ajaxBlacklist&&(a.mobile.ajaxEnabled=!1),e.addClass("ui-mobile ui-mobile-rendering"),setTimeout(h,5e3),a.extend(a.mobile,{initializePage:function(){var b=a.mobile.path,d=a(":jqmData(role='page'), :jqmData(role='dialog')"),e=b.stripHash(b.stripQueryParams(b.parseLocation().hash)),f=c.getElementById(e);d.length||(d=a("body").wrapInner("<div data-"+a.mobile.ns+"role='page'></div>").children(0)),d.each(function(){var b=a(this);b.jqmData("url")||b.attr("data-"+a.mobile.ns+"url",b.attr("id")||location.pathname+location.search)}),a.mobile.firstPage=d.first(),a.mobile.pageContainer=a.mobile.firstPage.parent().addClass("ui-mobile-viewport"),g.trigger("pagecontainercreate"),a.mobile.showPageLoadingMsg(),h(),!a.mobile.hashListeningEnabled||!a.mobile.path.isHashValid(location.hash)||!a(f).is(':jqmData(role="page")')&&!a.mobile.path.isPath(e)&&e!==a.mobile.dialogHashKey?(a.mobile.path.isHashValid(location.hash)&&(a.mobile.urlHistory.initialDst=e.replace("#","")),a.event.special.navigate.isPushStateEnabled()&&a.mobile.navigate.navigator.squash(b.parseLocation().href),a.mobile.changePage(a.mobile.firstPage,{transition:"none",reverse:!0,changeHash:!1,fromHashChange:!0})):a.event.special.navigate.isPushStateEnabled()?(a.mobile.navigate.history.stack=[],a.mobile.navigate(a.mobile.path.isPath(location.hash)?location.hash:location.href)):g.trigger("hashchange",[!0])}}),a.mobile.navreadyDeferred.resolve(),a(function(){b.scrollTo(0,1),a.mobile.defaultHomeScroll=!a.support.scrollTop||a.mobile.window.scrollTop()===1?0:1,a.mobile.autoInitializePage&&a.mobile.initializePage(),g.load(a.mobile.silentScroll),a.support.cssPointerEvents||a.mobile.document.delegate(".ui-disabled","vclick",function(a){a.preventDefault(),a.stopImmediatePropagation()})})}(a,this)});