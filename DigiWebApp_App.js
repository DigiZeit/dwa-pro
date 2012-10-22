
// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: Features
// ==========================================================================

DigiWebApp.Features = M.Model.create({

    /* Define the name of your model. Do not delete this property! */
    __name__: 'Features',

    id: M.Model.attr('String', {
        isRequired: NO
    }),

    name: M.Model.attr('String', {
        isRequired: NO
    }),
    
    isAvailable: M.Model.attr('Boolean', {
        isRequired: NO
    }),
    
    deleteAll: function() {
        _.each(this.find(), function(el) {
            el.del();
        });
    }

}, M.DataProviderLocalStorage);

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: WorkPlan
// ==========================================================================

DigiWebApp.WorkPlan = M.Model.create({

    __name__: 'WorkPlan',

    id: M.Model.attr('String', {
        isRequired: NO
    }),

    workplanType: M.Model.attr('String', {
        isRequired: NO          // 0: alle, 1: normal (gefiltert)
    }),

    activityIds: M.Model.attr('String', {
        isRequired: NO          // saved as string comma-separated
    }),

    activityPositions: M.Model.attr('String', {
        isRequired: NO          // saved as string comma-separated
    }),

    deleteAll: function() {
        _.each(this.find(), function(el) {
            el.del();
        });
    }

}, M.DataProviderLocalStorage);

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: Employee
// ==========================================================================

DigiWebApp.Employee = M.Model.create({
    
    /* Define the name of your model. Do not delete this property! */
    __name__: 'Employee',

    id: M.Model.attr('String', {
        isRequired: NO
    }),

    name: M.Model.attr('String', {
        isRequired: NO
    }),

    kolonnenId: M.Model.attr('String', {
        isRequired: NO
    }),

    isSelected: M.Model.attr('Boolean', {
        isRequired: NO
    }),

    deleteAll: function() {
        _.each(this.find(), function(el) {
            el.del();
        });
    },

    // to be extracted!
    findSorted: function() {
        var that = this;
        var keys = [];
        try {
            keys = JSON.parse(localStorage.getItem(DigiWebApp.ApplicationController.storagePrefix + '_' + this.name.toLowerCase() + 'Keys'));
        } catch(e) {
        	console.log("ERROR in " + this.name + ".findSorted: " + e);
        }

        var records = [];

        if(keys){
            _.each(keys, function(k) {
                records.push(that.find({key:M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + that.name + '_' + k}));
            });
        }
        return records;
    }

}, M.DataProviderLocalStorage);

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: Order
// ==========================================================================

DigiWebApp.Order = M.Model.create({

    /* Define the name of your model. Do not delete this property! */
    __name__: 'Order',

    id: M.Model.attr('String', {
        isRequired: NO
    }),

    name: M.Model.attr('String', {
        isRequired: NO
    }),

    deleteAll: function() {
        _.each(this.find(), function(el) {
            el.del();
        });
    },

    // to be extracted!
    findSorted: function() {
        var that = this;
        var keys = [];
        try {
            keys = JSON.parse(localStorage.getItem(DigiWebApp.ApplicationController.storagePrefix + '_' + this.name.toLowerCase() + 'Keys'));
        } catch(e) {
        	console.log("ERROR in " + this.name + ".findSorted: " + e);
        }

        var records = [];

        if(keys){
            _.each(keys, function(k) {
                records.push(that.find({key:M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + that.name + '_' + k}));
            });
        }
        return records;
    }

}, M.DataProviderLocalStorage);

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: Position
// ==========================================================================

DigiWebApp.Position = M.Model.create({

    /* Define the name of your model. Do not delete this property! */
    __name__: 'Position'

    , id: M.Model.attr('String',{
    	isRequired: NO
    })

    , name: M.Model.attr('String', {
        isRequired: NO
    })

    , strasse: M.Model.attr('String', {
        isRequired: NO
    })

    , hausnummer: M.Model.attr('String', {
        isRequired: NO
    })

    , plz: M.Model.attr('String', {
        isRequired: NO
    })

    , ort: M.Model.attr('String', {
        isRequired: NO
    })

    , land: M.Model.attr('String', {
        isRequired: NO
    })

    , countrycode: M.Model.attr('String', {
        isRequired: NO
    })

    , telefon: M.Model.attr('String', {
        isRequired: NO
    })

    , fax: M.Model.attr('String', {
        isRequired: NO
    })

    , email: M.Model.attr('String', {
        isRequired: NO
    })

    , ansprechpartner: M.Model.attr('String', {
        isRequired: NO
    })

    , kundenname: M.Model.attr('String', {
        isRequired: NO
    })

    , longitude: M.Model.attr('String', {
        isRequired: NO
    })

    , latitude: M.Model.attr('String', {
        isRequired: NO
    })

    , description: M.Model.attr('String', {
        isRequired: NO
    })

    , orderId: M.Model.attr('String', {
        isRequired: NO
    })

    , deleteAll: function() {
        _.each(this.find(), function(el) {
            el.del();
        });
    }

    , findSorted: function() {
        var that = this;
        var keys = [];
        try {
            keys = JSON.parse(localStorage.getItem(DigiWebApp.ApplicationController.storagePrefix + '_' + this.name.toLowerCase() + 'Keys'));
        } catch(e) {
        	console.log("ERROR in " + this.name + ".findSorted: " + e);
        }

        var records = [];

        if(keys){
            _.each(keys, function(k) {
                records.push(that.find({key:M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + that.name + '_' + k}));
            });
        }
        return records;
    }

}, M.DataProviderLocalStorage);
// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: Activity
// ==========================================================================

DigiWebApp.Activity = M.Model.create({

    /* Define the name of your model. Do not delete this property! */
    __name__: 'Activity',

    id: M.Model.attr('String', {
        isRequired: NO
    }),

    name: M.Model.attr('String', {
        isRequired: NO
    }),
    
    positionId: M.Model.attr('String',{
            isRequired: NO // 0: nicht MA-zugeordnet, 1: MA-zugeordnet
    }),

    deleteAll: function() {
        _.each(this.find(), function(el) {
            el.del();
        });
    },

    findSorted: function() {
        var that = this;
        var keys = [];
        try {
            keys = JSON.parse(localStorage.getItem(DigiWebApp.ApplicationController.storagePrefix + '_' + this.name.toLowerCase() + 'Keys'));
        } catch(e) {
        	console.log("ERROR in " + this.name + ".findSorted: " + e);
        }

        var records = [];

        if(keys){
            _.each(keys, function(k) {
                records.push(that.find({key:M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + that.name + '_' + k}));
            });
        }
        return records;
    }

}, M.DataProviderLocalStorage);

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: Booking
// ==========================================================================

DigiWebApp.Booking = M.Model.create({

    /* Define the name of your model. Do not delete this property! */
    __name__: 'Booking',

    fileName: M.Model.attr('String', {
        isRequired: NO
    }),

    fileType: M.Model.attr('String', {
        isRequired: NO
    }),

    orderId: M.Model.attr('String',{
        isRequired: NO
    }),

    timeStampStart: M.Model.attr('String', {
        isRequired: NO
    }),

    timeStampEnd: M.Model.attr('String', {
        isRequired: NO
    }),

    date: M.Model.attr('String', { // is aggregated by the two timestamp values above

    }),

    latitude: M.Model.attr('String', {
        isRequired:NO
    }),

    longitude: M.Model.attr('String', {
        isRequired: NO
    }),

    latitude_bis: M.Model.attr('String', {
        isRequired:NO
    }),

    longitude_bis: M.Model.attr('String', {
        isRequired: NO
    }),

    handOrderName: M.Model.attr('String', {
        isRequired: NO
    }),

    handOrderId: M.Model.attr('String', {
        isRequired: NO
    }),

    positionId: M.Model.attr('String', {
        isRequired: NO
    }),

    activityId: M.Model.attr('String', {
        isRequired: NO
    }),

    isCurrent: M.Model.attr('Boolean', {
        isRequired: NO
    }),

    employees: M.Model.attr('String', {
        isRequired: NO
    }),

    remark: M.Model.attr('String', {
        isRequired: NO
    }),

    closeBooking: function(location) {
        this.set('timeStampEnd', +new Date());
        if (location) {
        	this.set('latitude_bis',  location.latitude);
        	this.set('longitude_bis', location.longitude);
        };
    },

    setRemark: function(v) {
        this.set('remark', v);
    },

    setAsCurrent: function() {
        this.set('isCurrent', YES);
    },

    removeAsCurrent: function() {
        this.set('isCurrent', NO);
    },

    deleteAll: function() {
		var that = this;
	    _.each(that.find(), function(el) {
			if (el.hasFileName()) {
		    	// delete signature from device
		    	el.deleteFile(function(n){
			    	// delete record from localStorage only if file
		    		// was deleted successfully from device
			        el.del();	    		
		    	});
	    	} else {
	    		// there is no file to delete, so delete the record
	    		el.del();
	    	}
	    });
    },
	
	hasFileName: function() {
    	var that = this;
		if ((!(that.get('fileName'))) || (that.get('fileName') && (that.get('fileName').length === 0))) {
			return NO;
		} else {
			return YES;
		}
    	
    },
    
    saveToFile: function(myWriteContent, successCallback, errorCallback) {		
		var that = this;
		var writeContent = new String(myWriteContent);
		
		// check if fileName is set
		//if ((!(that.get('fileName'))) || (that.get('fileName') && (that.get('fileName').length === 0))) {
		if (!that.hasFileName()) {
			that.set('fileName', 'Signature_' + D8.now().getTimestamp());
			that.save();
	    }
	
		// check for successCallback is a function
		if (typeof successCallback !== "function") {
			console.log("saveToFileError: successCallback is not a function");
	        return;
	    }
	
		// check for errorCallback is a function (optional)
	    if (errorCallback && (typeof errorCallback !== "function")) {
			console.log("saveToFileError: errorCallback is not a function");
	        return;
	    } else {
	    	errorCallback = function(evt) {
	            //console.log("saveToFileError: " + evt.target.error.code);
	    		console.log("saveToFileError");
	            console.log(evt);
	    	}
	    }
		
		// check if LocalFileSystem is defined
		if ((typeof LocalFileSystem === "undefined") || (typeof window.requestFileSystem === "undefined")) {
			console.log("saveToFileError: no LocalFileSystem available");
			successCallback("");
	        return;
	    }

	    // open filesystem
	    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
	    	
	    	// get dataDirectory from filesystem (create if not exists)
	    	fileSystem.root.getDirectory("DIGIWebAppData", {create: true, exclusive: false}, function(dataDirectory) {
	
		    	// get fileEntry from filesystem (create if not exists)
		    	dataDirectory.getFile(that.get("fileName"), {create: true, exclusive: false}, function(fileEntry) {
	
		    		fileEntry.createWriter(function(writer) {
		    				
		    			writer.onerror = function(evt) {
		    				console.log("writeError");
		    				console.log(evt);
		    				errorCallback(evt);
		    			};
		    			
		    			writer.onwriteend = function(evt) {
			    			writer.onwriteend = function(ev) {
		    					successCallback(ev);
			    			};
		    				writer.truncate(writeContent.length);
		    	        };
		    	        
	    	        	writer.write(writeContent.toString());
	
		    		}, errorCallback); // fileEntry.createWriter
		   		}, errorCallback);     // dataDirectory.getFile
		   	}, errorCallback);         // fileSystem.root.getDirectory
	    }, errorCallback);             // window.requestFileSystem
	},
	
	readFromFile: function(successCallback, errorCallback) {
		var that = this;
		
		// check if fileName is set
		//if ((!(that.get('fileName'))) || (that.get('fileName') && (that.get('fileName').length === 0))) {
		if (!that.hasFileName()) {
			console.log("readFromFileError: no fileName given");
	        return;
	    };
	
		// check for successCallback is a function
		if (typeof successCallback !== "function") {
			console.log("readFromFileError: successCallback is not a function");
	        return;
	    };
		
		// check for errorCallback is a function (optional)
	    if (errorCallback && (typeof errorCallback !== "function")) {
			console.log("readFromFileError: errorCallback is not a function");
	        return;
	    } else {
	    	var errorCallback = function(evt) {
	            //console.log("readFromFileError: " + evt.target.error.code);
	    		console.log("readFromFileError");
	            console.log(evt);
	    	};
	    };
	    
		// check if LocalFileSystem is defined
		if ((typeof LocalFileSystem === "undefined") || (typeof window.requestFileSystem === "undefined")) {
			console.log("readFromFileError: no LocalFileSystem available");
			successCallback("");
	        return;
	    }

	    // open filesystem
	    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
	
	    	// get dataDirectory from filesystem (create if not exists)
	    	fileSystem.root.getDirectory("DIGIWebAppData", {create: true, exclusive: false}, function(dataDirectory) {
		    			
		    	// get fileEntry from filesystem
		    	dataDirectory.getFile(that.get("fileName"), null, function(fileEntry) {
		    		
		    		// get file from fileEntry
		    		fileEntry.file(function(file) {
		    			
		    			// read from file
		    			var reader = new FileReader();
		    			reader.onloadend = function(evt) {
		    		    	
		    		    	// return content via successCallback
		    				successCallback(evt.target.result);
		    				
		    	        };
		    			reader.readAsText(file);
		    	        
		        	}, errorCallback); // fileEntry.file
		    	}, errorCallback);     // dataDirectory.getFile
		    }, errorCallback);         // fileSystem.root.getDirectory
	    }, errorCallback);             // window.requestFileSystem
	},
	
	deleteFile: function(successCallback, errorCallback) {
		var that = this;
		
		// check if fileName is set
		//if ((!(that.get('fileName'))) || (that.get('fileName') && (that.get('fileName').length === 0))) {
		if (!that.hasFileName()) {
			console.log("deleteFileError: no fileName given");
	        return;
	    };
	
		// check for successCallback is a function
		if (typeof successCallback !== "function") {
			console.log("deleteFileError: successCallback is not a function");
	        return;
	    };
		
		// check for errorCallback is a function (optional)
	    if (errorCallback && (typeof errorCallback !== "function")) {
			console.log("deleteFileError: errorCallback is not a function");
	        return;
	    } else {
	    	var errorCallback = function(evt) {
	            //console.log("deleteFileError: " + evt.target.error.code);
	    		console.log("deleteFileError");
	    		console.log(evt);
	    	};
	    };
	    
		// check if LocalFileSystem is defined
		if ((typeof LocalFileSystem === "undefined") || (typeof window.requestFileSystem === "undefined")) {
			console.log("deleteFileError: no LocalFileSystem available");
			successCallback("");
	        return;
	    }

	    // open filesystem
	    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
	
	    	// get dataDirectory from filesystem (create if not exists)
	    	fileSystem.root.getDirectory("DIGIWebAppData", {create: true, exclusive: false}, function(dataDirectory) {
		    			
		    	// get fileEntry from filesystem
		    	dataDirectory.getFile(that.get("fileName"), null, function(fileEntry) {
		    		
		    		// remove fileEntry
		    		fileEntry.remove(successCallback, errorCallback);
		    		
		    	}, errorCallback);     // dataDirectory.getFile
		    }, errorCallback);         // fileSystem.root.getDirectory
	    }, errorCallback);             // window.requestFileSystem
	}

}, M.DataProviderLocalStorage);

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: Settings
// ==========================================================================

DigiWebApp.Settings = M.Model.create({

    __name__: 'Settings',

    debug: M.Model.attr('Boolean'),
    
    settingsPassword: M.Model.attr('String'),

    treatAllAsTablet: M.Model.attr('Boolean'),

    treatAllAsPhone: M.Model.attr('Boolean'),

    company: M.Model.attr('String'),

    password: M.Model.attr('String'),

    connectionCode: M.Model.attr('String'),

    workerId: M.Model.attr('String'),

    timeouthappened: M.Model.attr('String'),

    skipEvents: M.Model.attr('String'),

    platform: M.Model.attr('String'),

    userAgent: M.Model.attr('String'),

    mapType: M.Model.attr('String'),

    autoTransferAfterBookTime: M.Model.attr('Boolean'),

    autoTransferAfterClosingDay: M.Model.attr('Boolean'),

    autoSyncAfterBookTime: M.Model.attr('Boolean'),

    autoSaveGPSData: M.Model.attr('Boolean'),

    GPSDataIsMandatory: M.Model.attr('Boolean'),
    
    remarkIsMandatory: M.Model.attr('Boolean'),

    useTransitionsSetting: M.Model.attr('Boolean')

}, M.DataProviderLocalStorage);

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: HandOrder
// ==========================================================================

DigiWebApp.HandOrder = M.Model.create({

    /* Define the name of your model. Do not delete this property! */
    __name__: 'HandOrder',

    id: M.Model.attr('String', {
        isRequired: NO
    }),

    name: M.Model.attr('String', {
        isRequired: NO
    }),

    isLocalOnly: M.Model.attr('Boolean', {
        isRequired: NO
    }),

    deleteAll: function() {
        var bookings = DigiWebApp.Booking.find();
        var openBooking = _.detect(bookings, function(b) {
            return b.get('isCurrent') === true;
        });

        _.each(this.find(), function(el) {
            if(openBooking) {
                if(!(el.get('id') === openBooking.get('handOrderId') || el.get('name') === openBooking.get('handOrderName'))) {
                    el.del();
                }
            } else {
                el.del();
            }
        });
    },
    
    findSorted: function() {
        var that = this;
        var keys = [];
        try {
            keys = JSON.parse(localStorage.getItem(DigiWebApp.ApplicationController.storagePrefix + '_' + this.name.toLowerCase() + 'Keys'));
        } catch(e) {
        	console.log("ERROR in " + this.name + ".findSorted: " + e);
        }

        var records = [];

        if(keys){
            _.each(keys, function(k) {
                records.push(that.find({key:M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + that.name + '_' + k}));
            });
        }
        return records;
    }

}, M.DataProviderLocalStorage);

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: MediaFile
// ==========================================================================

DigiWebApp.MediaFile = M.Model.create({

    /* Define the name of your model. Do not delete this property! */
    __name__: 'MediaFile',

    /* Sample model properties: */

    name: M.Model.attr('String',{
    	isRequired: NO
    }),

    fileName: M.Model.attr('String', {
        isRequired: NO
    }),

    fileType: M.Model.attr('String', {
        isRequired: YES
    }),

    timeStamp: M.Model.attr('String', {
        isRequired: NO
    }),

    date: M.Model.attr('String', { // is aggregated by the two timestamp values above

    }),

    icon: M.Model.attr('String',{
        isRequired: NO
    }),

    orderId: M.Model.attr('String',{
        isRequired: NO
    }),

    positionId: M.Model.attr('String', {
        isRequired: NO
    }),

    activityId: M.Model.attr('String', {
        isRequired: NO
    }),

    handOrderName: M.Model.attr('String', {
        isRequired: NO
    }),

    handOrderId: M.Model.attr('String', {
        isRequired: NO
    }),
    
    latitude: M.Model.attr('String', {
        isRequired:NO
    }),

    longitude: M.Model.attr('String', {
        isRequired: NO
    }),

    remark: M.Model.attr('String', {
        isRequired: NO
    }),

    setRemark: function(v) {
        this.set('remark', v);
    },

    writeError: M.Model.attr('Boolean', {
        isRequired: NO
    }),
    
    deleteAll: function() {
		var that = this;
	    _.each(that.find(), function(el) {
			if (el.hasFileName()) {
		    	// delete mediafile from device
		    	el.deleteFile(function(n){
			    	// delete record from localStorage only if file
		    		// was deleted successfully from device
			        el.del();	    		
		    	});
	    	} else {
	    		// there is no file to delete, so delete the record
	    		el.del();
	    	}
	    });
	},
		
	hasFileName: function() {
    	var that = this;
		if ((!(that.get('fileName'))) || (that.get('fileName') && (that.get('fileName').length === 0))) {
			return NO;
		} else {
			return YES;
		}
    	
    },
    
	saveToFile: function(myWriteContent, successCallback, errorCallback) {
		
		var that = this;
		var writeContent = new String(myWriteContent);
		
		// check if fileName is already set
		//if ((!(that.get('fileName'))) || (that.get('fileName') && (that.get('fileName').length === 0))) {
		if (!that.hasFileName()) {
			that.set('fileName', 'MediaFile_' + D8.now().getTimestamp());
			that.save();
	    }

		// check for successCallback is a function
		if (typeof successCallback !== "function") {
			console.log("saveToFileError: successCallback is not a function");
	        return;
	    }

		// check for errorCallback is a function (optional)
	    if (errorCallback && (typeof errorCallback !== "function")) {
			console.log("saveToFileError: errorCallback is not a function");
	        return;
	    } else {
	    	errorCallback = function(evt) {
	            //console.log("saveToFileError: " + evt.target.error.code);
	    		console.log("saveToFileError");
	            console.log(evt);
	    	}
	    }
		
		// check if LocalFileSystem is defined
		if ((typeof LocalFileSystem === "undefined") || (typeof window.requestFileSystem === "undefined")) {
			console.log("saveToFileError: no LocalFileSystem available");
			successCallback("");
	        return;
	    }

	    // open filesystem
	    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
	    	
	    	// get dataDirectory from filesystem (create if not exists)
	    	fileSystem.root.getDirectory("DIGIWebAppData", {create: true, exclusive: false}, function(dataDirectory) {

		    	// get fileEntry from filesystem (create if not exists)
		    	dataDirectory.getFile(that.get("fileName"), {create: true, exclusive: false}, function(fileEntry) {
	
		    		fileEntry.createWriter(function(writer) {
		    				
		    			writer.onerror = function(evt) {
		    				console.log("writeError");
		    				console.log(evt);
		    				errorCallback(evt);
		    			};
		    			
		    			writer.onwriteend = function(evt) {
			    			writer.onwriteend = function(ev) {
		    					successCallback(ev);
			    			};
		    				writer.truncate(writeContent.length);
		    	        };
		    	        
	    	        	writer.write(writeContent.toString());

		    		}, errorCallback); // fileEntry.createWriter
		   		}, errorCallback);     // dataDirectory.getFile
		   	}, errorCallback);         // fileSystem.root.getDirectory
	    }, errorCallback);             // window.requestFileSystem
	},
	
	readFromFile: function(successCallback, errorCallback) {
		var that = this;
		
		// check if fileName is set
		//if ((!(that.get('fileName'))) || (that.get('fileName') && (that.get('fileName').length === 0))) {
		if (!that.hasFileName()) {
			console.log("readFromFileError: no fileName given");
	        return;
	    };

		// check for successCallback is a function
		if (typeof successCallback !== "function") {
			console.log("readFromFileError: successCallback is not a function");
	        return;
	    };
		
		// check for errorCallback is a function (optional)
	    if (errorCallback && (typeof errorCallback !== "function")) {
			console.log("readFromFileError: errorCallback is not a function");
	        return;
	    } else {
	    	var errorCallback = function(evt) {
	            //console.log("readFromFileError: " + evt.target.error.code);
	    		console.log("readFromFileError");
	            console.log(evt);
	    	};
	    };
	    
		// check if LocalFileSystem is defined
		if ((typeof LocalFileSystem === "undefined") || (typeof window.requestFileSystem === "undefined")) {
			console.log("readFromFileError: no LocalFileSystem available");
			successCallback("");
	        return;
	    }

	    // open filesystem
	    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {

	    	// get dataDirectory from filesystem (create if not exists)
	    	fileSystem.root.getDirectory("DIGIWebAppData", {create: true, exclusive: false}, function(dataDirectory) {
		    			
		    	// get fileEntry from filesystem
		    	dataDirectory.getFile(that.get("fileName"), null, function(fileEntry) {
		    		
		    		// get file from fileEntry
		    		fileEntry.file(function(file) {
		    			
		    			// read from file
		    			var reader = new FileReader();
		    			reader.onloadend = function(evt) {
		    		    	
		    		    	// return content via successCallback
		    				successCallback(evt.target.result);
		    				
		    	        };
		    			reader.readAsText(file);
		    	        
		        	}, errorCallback); // fileEntry.file
		    	}, errorCallback);     // dataDirectory.getFile
		    }, errorCallback);         // fileSystem.root.getDirectory
	    }, errorCallback);             // window.requestFileSystem
	},
	
	deleteFile: function(successCallback, errorCallback) {
		var that = this;

		// check if fileName is set
		//if ((!(that.get('fileName'))) || (that.get('fileName') && (that.get('fileName').length === 0))) {
		if (!that.hasFileName()) {
			console.log("deleteFileError: no fileName given");
	        return;
	    };

		// check for successCallback is a function
		if (typeof successCallback !== "function") {
			console.log("deleteFileError: successCallback is not a function");
	        return;
	    };
		
		// check for errorCallback is a function (optional)
	    if (errorCallback && (typeof errorCallback !== "function")) {
			console.log("deleteFileError: errorCallback is not a function");
	    	errorCallback = function(evt) {
	            //console.log("deleteFileError: " + evt.target.error.code);
	    		console.log("deleteFileError");
	    		console.log(evt);
	    	}
	    };
	    
		// check if LocalFileSystem is defined
		if ((typeof LocalFileSystem === "undefined") || (typeof window.requestFileSystem === "undefined")) {
			console.log("deleteFileError: no LocalFileSystem available");
			successCallback("");
	        return;
	    }

	    // open filesystem
	    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {

	    	// get dataDirectory from filesystem (create if not exists)
	    	fileSystem.root.getDirectory("DIGIWebAppData", {create: true, exclusive: false}, function(dataDirectory) {
		    			
		    	// get fileEntry from filesystem
		    	dataDirectory.getFile(that.get("fileName"), null, function(fileEntry) {
		    		
		    		// remove fileEntry
					try {
						fileEntry.remove(successCallback, errorCallback);
					} catch(e) {
						errorCallback();
					}
		    		
		    	}, errorCallback);     // dataDirectory.getFile
		    }, errorCallback);         // fileSystem.root.getDirectory
	    }, errorCallback);             // window.requestFileSystem
	}

}, M.DataProviderLocalStorage);

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso
//
// Project: DigiWebApp
// Model: Anwesenheitsliste
// ==========================================================================

DigiWebApp.Anwesenheitsliste = M.Model.create({
    
      __name__: 'Anwesenheitsliste'

      	//"auftragsBezeichnung": "27.08.2012",
    	  	, auftragsBezeichnung: M.Model.attr('String', {})
    	//"auftragsId": "27.08.2012",
    	    , auftragsId: M.Model.attr('String', {})
    	//"datum": "27.08.2012",
    	    , datum: M.Model.attr('String', {})
    	//"farbeAmpel": "",
    	    , farbeAmpel: M.Model.attr('String', {})
    	//"farbeAnwesenheit": "#00FF00",
    	    , farbeAnwesenheit: M.Model.attr('String', {})
    	//"fehlzeitBezeichnung": "",
    	    , fehlzeitBezeichnung: M.Model.attr('String', {})
    	//"fehlzeitFarbe": "",
    	    , fehlzeitFarbe: M.Model.attr('String', {})
    	//"gpsBreite": "0.0",
    	    , gpsBreite: M.Model.attr('String', {})
    	//"gpsBreitePosition": "0.0",
    	    , gpsBreitePosition: M.Model.attr('String', {})
    	//"gpsLaenge": "0.0",
    	    , gpsLaenge: M.Model.attr('String', {})
    	//"gpsLaengePosition": "0.0",
    	    , gpsLaengePosition: M.Model.attr('String', {})
    	//"handauftragsBezeichnung": "",
    	    , handauftragsBezeichnung: M.Model.attr('String', {})
    	//"handauftragsId": "",
    	    , handauftragsId: M.Model.attr('String', {})
    	//"mitarbeiterId": "29",
    	    , mitarbeiterId: M.Model.attr('String', {})
    	//"name": "Maier",
    	    , name: M.Model.attr('String', {})
    	//"nameVorname": "Maier, Peter",
    	    , nameVorname: M.Model.attr('String', {})
    	//"positionsBezeichnung": "1446DEKRA",
    	    , positionsBezeichnung: M.Model.attr('String', {})
    	//"positionsId": "1929",
    	    , positionsId: M.Model.attr('String', {})
    	//"taetigkeit": "05Stromversorger",
    	    , taetigkeit: M.Model.attr('String', {})
    	//"taetigkeitsId": "89",
    	    , taetigkeitsId: M.Model.attr('String', {})
    	//"taetigkeitsart": "0",
    	    , taetigkeitsart: M.Model.attr('String', {})
    	//"uhrzeit": "27-08-2012 11:50:52",
    	    , uhrzeit: M.Model.attr('String', {})
    	//"vorname": "Peter"
    	    , vorname: M.Model.attr('String', {})

}, M.DataConsumer.configure({

    appendRecords: NO,

    responsePath: 'anwesenheitsliste',

    url: function() {
		var myURL = 'http://' + DigiWebApp.RequestController.DatabaseServer + '/WebAppServices/anwesenheitsliste?modus=0&firmenId=' + DigiWebApp.SettingsController.getSetting('company') + '&kennwort=' + DigiWebApp.SettingsController.getSetting('password') + '&geraeteId=' + DigiWebApp.SettingsController.getSetting('workerId') + '&geraeteTyp=2&softwareVersion=' + DigiWebApp.RequestController.softwareVersion + '&requestTimestamp=' + M.Date.now().date.valueOf();
		console.log('Anwesenheitsliste: using ' + myURL);
		return myURL;
    },

    /* map needs to return record obj which can be handled by createRecord */
    map: function(obj) {
    	//console.log(obj);
        return {
        	//"auftragsBezeichnung":"1234Hermann"
        	  auftragsBezeichnung: obj.auftragsBezeichnung
        	//"auftragsId":"947"
			, auftragsId: obj.auftragsId
			//"datum": "27.08.2012",
			, datum: obj.datum
			//"farbeAmpel": "",
			, farbeAmpel: obj.farbeAmpel
			//"farbeAnwesenheit": "#00FF00",
			, farbeAnwesenheit: obj.farbeAnwesenheit
			//"fehlzeitBezeichnung": "",
			, fehlzeitBezeichnung: obj.fehlzeitBezeichnung // fehlt neuerdings
			//"fehlzeitFarbe": "",
			, fehlzeitFarbe: obj.fehlzeitFarbe // fehlt neuerdings
			//"gpsBreite": "0.0",
			, gpsBreite: obj.gpsBreite
			//"gpsBreitePosition": "0.0",
			, gpsBreitePosition: obj.gpsBreitePosition
			//"gpsLaenge": "0.0",
			, gpsLaenge: obj.gpsLaenge
			//"gpsLaengePosition": "0.0",
			, gpsLaengePosition: obj.gpsLaengePosition
			//"handauftragsBezeichnung": "",
			, handauftragsBezeichnung: obj.handauftragsBezeichnung
			//"handauftragsId": "",
			, handauftragsId: obj.handauftragsId
			//"mitarbeiterId": "29",
			, mitarbeiterId: obj.mitarbeiterId
			//"name": "Maier",
			, name: obj.name
			//"nameVorname": "Maier, Peter",
			, nameVorname: obj.nameVorname
			//"positionsBezeichnung": "1446DEKRA",
			, positionsBezeichnung: obj.positionsBezeichnung
			//"positionsId": "1929",
			, positionsId: obj.positionsId
			//"taetigkeit": "05Stromversorger",
			, taetigkeit: obj.taetigkeit
			//"taetigkeitsId": "89",
			, taetigkeitsId: obj.taetigkeitsId
			//"taetigkeitsart": "0",
			, taetigkeitsart: obj.taetigkeitsart
			//"uhrzeit": "27-08-2012 11:50:52",
			, uhrzeit: obj.uhrzeit
			//"vorname": "Peter"
			, vorname: obj.vorname
        };
    }

}));
// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: SentBooking
// ==========================================================================

DigiWebApp.SentBooking = M.Model.create({

    /* Define the name of your model. Do not delete this property! */
    __name__: 'SentBooking',

    fileName: M.Model.attr('String', {
        isRequired: NO
    }),

    fileType: M.Model.attr('String', {
        isRequired: NO
    }),

    orderId: M.Model.attr('String',{
        isRequired: NO
    }),

    timeStampStart: M.Model.attr('String', {
        isRequired: NO
    }),

    timeStampEnd: M.Model.attr('String', {
        isRequired: NO
    }),

    date: M.Model.attr('String', { // is aggregated by the two timestamp values above

    }),

    latitude: M.Model.attr('String', {
        isRequired:NO
    }),

    longitude: M.Model.attr('String', {
        isRequired: NO
    }),

    handOrderName: M.Model.attr('String', {
        isRequired: NO
    }),

    handOrderId: M.Model.attr('String', {
        isRequired: NO
    }),

    positionId: M.Model.attr('String', {
        isRequired: NO
    }),

    activityId: M.Model.attr('String', {
        isRequired: NO
    }),

    isCurrent: M.Model.attr('Boolean', {
        isRequired: NO
    }),

    employees: M.Model.attr('String', {
        isRequired: NO
    }),

    remark: M.Model.attr('String', {
        isRequired: NO
    }),

    closeBooking: function() {
        this.set('timeStampEnd', +new Date());
    },

    setRemark: function(v) {
        this.set('remark', v);
    },

    setAsCurrent: function() {
        this.set('isCurrent', YES);
    },

    removeAsCurrent: function() {
        this.set('isCurrent', NO);
    },

    deleteAll: function() {
        _.each(this.find(), function(el) {
            el.del();
        });
    }

}, M.DataProviderLocalStorage);

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso
//
// Project: DigiWebApp
// Model: Zeitbuchungen
// ==========================================================================

DigiWebApp.Zeitbuchungen = M.Model.create({
    
      __name__: 'Zeitbuchungen'

//    	  	  auftragsBezeichnung: "6657Heim"
    	  , auftragsBezeichnung: M.Model.attr('String', {})
//    		  auftragsId: "950"
    	  , auftragsId: M.Model.attr('String', {})
//    		  bis: "10:37:08"
    	  , bis: M.Model.attr('String', {})
//    		  datum: "14.06.2012"
    	  , datum: M.Model.attr('String', {})
//    		  dauer: "00:00"
    	  , dauer: M.Model.attr('String', {})
//    		  farbeAmpel: ""
    	  , farbeAmpel: M.Model.attr('String', {})
//    		  gpsBreite: "0.0"
    	  , gpsBreite: M.Model.attr('String', {})
//    		  gpsBreitePosition: "0.0"
    	  , gpsBreitePosition: M.Model.attr('String', {})
//    		  gpsLaenge: "0.0"
    	  , gpsLaenge: M.Model.attr('String', {})
//    		  gpsLaengePosition: "0.0"
    	  , gpsLaengePosition: M.Model.attr('String', {})
//			  handauftragsBezeichnung: "",
    	  , handauftragsBezeichnung: M.Model.attr('String', {})
//			  handauftragsId: "",
    	  , handauftragsId: M.Model.attr('String', {})
//    		  mitarbeiterId: "12"
    	  , mitarbeiterId: M.Model.attr('String', {})
//    		  name: "Alber"
    	  , name: M.Model.attr('String', {})
//    		  nameVorname: "Alber, Michael"
    	  , nameVorname: M.Model.attr('String', {})
//    		  positionsBezeichnung: "6657Heim"
    	  , positionsBezeichnung: M.Model.attr('String', {})
//    		  positionsId: "1874"
    	  , positionsId: M.Model.attr('String', {})
//    		  taetigkeit: "HolzLackraum"
    	  , taetigkeit: M.Model.attr('String', {})
//    		  taetigkeitsId: "21"
    	  , taetigkeitsId: M.Model.attr('String', {})
//    		  taetigkeitsart: "0"
    	  , taetigkeitsart: M.Model.attr('String', {})
//    		  von: "10:36:45"
    	  , von: M.Model.attr('String', {})
//    		  vorname: "Michael"
    	  , vorname: M.Model.attr('String', {})

}, M.DataConsumer.configure({

    appendRecords: NO,

    responsePath: 'zeitbuchungen',

    url: function(datum, mitarbeiterID) {
		var myURL = 'http://' + DigiWebApp.RequestController.DatabaseServer + '/WebAppServices/zeitdatenliste?modus=0&firmenId=' + DigiWebApp.SettingsController.getSetting('company') + '&kennwort=' + DigiWebApp.SettingsController.getSetting('password') + '&geraeteId=' + DigiWebApp.SettingsController.getSetting('workerId') + '&geraeteTyp=2&softwareVersion=' + DigiWebApp.RequestController.softwareVersion + '&mitarbeiterId=' + mitarbeiterID + '&datum=' + datum + '&requestTimestamp=' + M.Date.now().date.valueOf();
		console.log('Zeitbuchungen: using ' + myURL);
		return myURL;
    },

    /* map needs to return record obj which can be handled by createRecord */
    map: function(obj) {
    	//console.log(obj);
        return {
//    	  	  auftragsBezeichnung: "6657Heim"
    	    auftragsBezeichnung: obj.vorname
//    		  auftragsId: "950"
    	  , auftragsId: obj.vorname
//    		  bis: "10:37:08"
    	  , bis: obj.bis
//    		  datum: "14.06.2012"
    	  , datum: obj.datum
//    		  dauer: "00:00"
    	  , dauer: obj.dauer
//    		  farbeAmpel: ""
    	  , farbeAmpel: obj.farbeAmpel
//    		  gpsBreite: "0.0"
    	  , gpsBreite: obj.gpsBreite
//    		  gpsBreitePosition: "0.0"
    	  , gpsBreitePosition: obj.gpsBreitePosition
//    		  gpsLaenge: "0.0"
    	  , gpsLaenge: obj.gpsLaenge
//    		  gpsLaengePosition: "0.0"
    	  , gpsLaengePosition: obj.gpsLaengePosition
//            handauftragsBezeichnung: "",
  	      , handauftragsBezeichnung: obj.handauftragsBezeichnung
//			  handauftragsId: "",
  	      , handauftragsId: obj.handauftragsId
//    		  mitarbeiterId: "12"
    	  , mitarbeiterId: obj.mitarbeiterId
//    		  name: "Alber"
    	  , name: obj.name
//    		  nameVorname: "Alber, Michael"
    	  , nameVorname: obj.nameVorname
//    		  positionsBezeichnung: "6657Heim"
    	  , positionsBezeichnung: obj.positionsBezeichnung
//    		  positionsId: "1874"
    	  , positionsId: obj.positionsId
//    		  taetigkeit: "HolzLackraum"
    	  , taetigkeit: obj.taetigkeit
//    		  taetigkeitsId: "21"
    	  , taetigkeitsId: obj.taetigkeitsId
//    		  taetigkeitsart: "0"
    	  , taetigkeitsart: obj.taetigkeitsart
//    		  von: "10:36:45"
    	  , von: obj.von
//    		  vorname: "Michael"
    	  , vorname: obj.vorname
        };
    }

}));
// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: CameraController
// ==========================================================================

DigiWebApp.CameraController = M.Controller.extend({

    // arrays for selection lists
      orders: null
    , positions: null
    , activities: null

    , selections: {
        order: null,
        position: null,
        activity: null
    }

    , init: function(isFirstLoad) {
		
        if(isFirstLoad) {
            /* do something here, when page is loaded the first time. */
        }

        var image = document.getElementById(DigiWebApp.CameraPage.content.image.id);
        image.src = '';
        DigiWebApp.CameraController.myImageObj = new Image();

        /* do something, for any other load. */
        if (       typeof navigator.device !== 'undefined' 
        		&& typeof navigator.device.capture !== 'undefined' 
        		&& typeof navigator.device.capture.captureImage !== 'undefined'
        	) {
        	// camera probably available
        	$('#' + DigiWebApp.CameraPage.content.savePictureGrid.id).show();
        	DigiWebApp.CameraController.takePicture();
            if(DigiWebApp.BookingController.currentBooking) {
                DigiWebApp.CameraController.setSelectionByCurrentBooking();
            } else {
                DigiWebApp.CameraController.initSelection();
            }
            this.saveSelection();
        } else {
        	$('#' + DigiWebApp.CameraPage.content.savePictureGrid.id).hide();
        }
    }

    , setSelectionByCurrentBooking: function() {
        var booking = DigiWebApp.BookingController.currentBooking;
        
        // get all items from local storage
        var orders = DigiWebApp.HandOrder.findSorted().concat(DigiWebApp.Order.findSorted()); // we need to check handOrders also
        var positions = DigiWebApp.Position.findSorted();
        var activities = DigiWebApp.CameraController.getActivities();

        // get the ids from the current booking
        var orderId = (booking.get('orderId') == "0" ? 0 : booking.get('orderId')) || booking.get('handOrderId'); // we need to check handOrders also
        var positionId = booking.get('positionId');
        var activityId = booking.get('activityId');

        
        /**
         * ORDERS
         */
        var orderArray = _.map(orders, function(order) {
            if(order.get('id') == orderId) {
                return { label: order.get('name'), value: order.get('id'), isSelected: YES };
            } else {
                return { label: order.get('name'), value: order.get('id') };
            }
        });
        orderArray = _.compact(orderArray);
        // push "Bitte wählen Option"
        orderArray.push({label: M.I18N.l('selectSomething'), value: '0'});

        
        /**
         * POSITIONS
         */
        var positionArray = _.map(positions, function(pos) {
            if(pos.get('orderId') === orderId) {
            	var obj = null;
                if(pos.get('id') === positionId) {
                    obj = { label: pos.get('name'), value: pos.get('id'), isSelected: YES };
                } else {
                    obj = { label: pos.get('name'), value: pos.get('id') };
                }
                return obj;
            }
            return null;
        });
        positionArray = _.compact(positionArray);
        // push "Bitte wählen Option"
        positionArray.push({label: M.I18N.l('selectSomething'), value: '0'});


        /**
         * ACTIVITIES
         */
        var workPlans = _.select(DigiWebApp.WorkPlan.find(), function(wp) {
            return wp.get('id') == positionId;
        });

        var itemSelected = NO;

        /* if a workplan exists, only use those activities that are in the workplan */
        if(workPlans.length > 0) {
            activities = this.getActivitiesFromWorkplan(workPlans[0]);
        } else {
            activities = DigiWebApp.CameraController.getActivities();
        }

        var activityArray = _.map(activities, function(act) {
        	if ( typeof(act) === "undefined" ) {
        		console.log("UNDEFINED ACTIVITY");
        		return null;
        	} else {
        		var obj = null;
        		if(act.get('id') == activityId) {
        			obj = { label: act.get('name'), value: act.get('id'), isSelected: YES };
        			//console.log("ACTIVITY " + i + " = " + act.get('name') + " in setSelectionByCurrentBooking isSelected");
        			itemSelected = YES;
        		} else {
        			obj = { label: act.get('name'), value: act.get('id') };
        			//console.log("ACTIVITY " + i + " = " + act.get('name') + " in setSelectionByCurrentBooking");
        		}
        		return obj;
        	}
        });
        activityArray = _.compact(activityArray);
        activityArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:!itemSelected});

        this.resetSelection();
        // set selection arrays to start content binding process
        this.set('orders', orderArray);
        this.set('positions', positionArray);
        this.set('activities', activityArray);
    }

    , setPositions: function() {
        var orderId = M.ViewManager.getView('cameraPage', 'order').getSelection(YES).value;
        if(!orderId) {
            return;
        }
//        M.ViewManager.getView('cameraPage', 'position').removeSelection(); /* to avoid bug of not setting selected... */
        var positions = DigiWebApp.Position.findSorted();

        var i = 0;
        positions = _.map(positions, function(pos) {
            if(pos.get('orderId') === orderId) {
                var obj = { label: pos.get('name'), value: pos.get('id') };
                if(i === 0) {
                    obj.isSelected = YES;
                }
                i += 1;
                return obj;
            }
            return null;
        });
        positions = _.compact(positions);/* remove falsy values from positions with _.compact() */

        if(positions.length < 1) {
            positions.push({label: M.I18N.l('noData'), value: '0'});
        }


        M.ViewManager.getView('cameraPage', 'position').resetSelection();
        this.set('positions', positions);
        this.setActivities(YES);

        this.saveSelection();
    }

    /* only set those activities that are related to the chosen position */
    , setActivities: function(checkForWorkPlan) {
        var posId = null;

        if(checkForWorkPlan) {
            var posObj = M.ViewManager.getView('cameraPage', 'position').getSelection(YES);
            if(posObj) {
                posId = posObj.value;
            }
        }

        var activities = [];
        //var workPlans = DigiWebApp.WorkPlan.find({query: 'id=' + posId}); // pre TMP-1.0
		//console.log("posId " + posId);
        var workPlans = DigiWebApp.WorkPlan.find({ query: { 
            identifier: 'id', 
            operator: '=', 
            value: posId 
        }});
        var i = 0;

        /* if a workplan exists, only use those activities that are in the workplan */
		//console.log("posId " + posId + ", workPlans.length " + workPlans.length);
        if (workPlans.length === 1) {
            activities = this.getActivitiesFromWorkplan(workPlans[0]);
        } else {
            activities = DigiWebApp.CameraController.getActivities();
        }

        var currentBookingActivityId = -1;
        if ( typeof(DigiWebApp.BookingController.currentBooking) !== "undefined" && DigiWebApp.BookingController.currentBooking !== null ) { 
        	currentBookingActivityId = DigiWebApp.BookingController.currentBooking.get('activityId');
        }
		var currentBookingActivitySelectable = false;
		_.each(activities, function(act) {
        	if ( typeof(act) === "undefined" ) {
        		console.log("UNDEFINED ACTIVITY");
        		return null;
        	} else {
				if ( act.get('id') === currentBookingActivityId ) { currentBookingActivitySelectable = true; }
			}
		});
		
        activities = _.map(activities, function(act) {
        	if ( typeof(act) === "undefined" ) {
        		console.log("UNDEFINED ACTIVITY");
        		return null;
        	} else {
        		var obj = null;
        		if (currentBookingActivitySelectable) {
        			obj = { label: act.get('name'), value: act.get('id'), isSelected: act.get('id') === currentBookingActivityId ? YES : NO };
        		} else {
        			obj = { label: act.get('name'), value: act.get('id'), isSelected: i === 0 ? YES : NO };
        		}
        		//console.log("ACTIVITY " + i + " = " + act.get('name') + " in setActivities");
                i += 1;
                return obj;
        	}
        });

        activities = _.compact(activities);

        // new to show this when closing day is pressed (corresponds to a reset)
        if(activities.length > 0) {
            activities.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:NO});
        } else {
            activities.push({label: M.I18N.l('noData'), value: '0'});
        }


        M.ViewManager.getView('cameraPage', 'activity').resetSelection();
        this.set('activities', activities);

        this.saveSelection();
    }

    , initSelection: function() {
       var orders = DigiWebApp.HandOrder.findSorted().concat(DigiWebApp.Order.findSorted()); // we need to check handOrders also
       var positions = DigiWebApp.Position.findSorted();
       var activities = DigiWebApp.CameraController.getActivities();

       /**
        * ORDERS
        */

       // create order selection
       var orderArray = [];
       if(orders){
           orderArray = _.map(orders, function(order) {
               return { label: order.get('name'), value: order.get('id') };
           });
       }
       // push "Bitte wählen Option"
       orderArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:YES});

       /**
        * POSITIONS
        */

       // create position selection
       var positionArray = [];
       if(positions){
           positionArray = _.map(positions, function(pos) {
               return { label: pos.get('name'), value: pos.get('id') };
           });
       }
       // push "Bitte wählen Option"
       positionArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:YES});

       /**
        * ACTIVITIES
        */
       var activityArray = [];
       if(activities){
            activityArray = _.map(activities, function(act) {
            	if ( typeof(act) === "undefined" ) {
            		console.log("UNDEFINED ACTIVITY");
            		return null;
            	} else {
            		return obj = { label: act.get('name'), value: act.get('id') };
            	}
           });
       }
       // push "Bitte wählen Option"
       activityArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected: YES});


        this.resetSelection();
        // set selection arrays to start content binding process
        this.set('orders', orderArray);
        this.set('positions', positionArray);
        this.set('activities', activityArray);
        M.ViewManager.getView('cameraPage', 'order').setSelection('0');
        M.ViewManager.getView('cameraPage', 'position').setSelection('0');
        M.ViewManager.getView('cameraPage', 'activity').setSelection('0');
    }
    
    , resetSelection: function() {
        M.ViewManager.getView('cameraPage', 'order').resetSelection();
        M.ViewManager.getView('cameraPage', 'position').resetSelection();
        M.ViewManager.getView('cameraPage', 'activity').resetSelection();
    }

    , isPositionSelected: function() {
        // implemented adjustment to M.SeletionListView to return null if no item is available
        var posObj = M.ViewManager.getView('cameraPage', 'position').getSelection(YES);
        if(posObj && posObj.value != "0") { // 'Bitte wählen' is not allowed to be chosen
            return YES;
        } else {
            return NO;
        }
    }

    , isActivitySelected: function() {
        var actObj = M.ViewManager.getView('cameraPage', 'activity').getSelection(YES);
        if(actObj && actObj.value != "0") { // 'Bitte wählen' is not allowed to be chosen
            return YES;
        } else {
            return NO;
        }
    }

    , saveSelection: function() {
        var orderValue = M.ViewManager.getView('cameraPage', 'order').getSelection();
        var positionValue = M.ViewManager.getView('cameraPage', 'position').getSelection();
        var activityValue = M.ViewManager.getView('cameraPage', 'activity').getSelection();

        this.selections.order = orderValue;
        this.selections.position = positionValue;
        this.selections.activity = activityValue;

        this.useSelections = YES;
    }
    
    , getActivities: function(queryobj) {
    	var activities;
    	if (queryobj) {
    		activities = DigiWebApp.Activity.find(queryobj);
    	} else {
    		activities = DigiWebApp.Activity.findSorted();
    	}
    	activities = _.map(activities, function(acti) {
	    	if(acti.get("positionId") === "1") {
	            // normale Tätigkeit
	            return acti;
	         } else {
	            // Tätigkeit nur bei Arbeitsplan
	            return null;
	         }
    	});
    	activities = _.compact(activities);
    	return activities;
    }

    , getActivitiesFromWorkplan: function(workplan) {
        var actIds = workplan.get('activityIds').split(',');
        var activities = [];
        if(actIds && actIds.length > 0) {
            for(var i = 0; i < actIds.length; i++) {
                activities.push(_.first(DigiWebApp.Activity.find({ query: {
                    identifier: 'id', 
                    operator: '=', 
                    value: actIds[i] 
                }})));
            }

        }
        if (workplan.get("workplanType") === "1") {
        	// only those activities which are bound to employee
            activities = _.map(activities, function(act) {
            	if ( typeof(act) === "undefined" ) {
            		console.log("UNDEFINED ACTIVITY");
            		return null;
            	} else {
        			var zugeordnet = NO;
            		var allActivities = DigiWebApp.Activity.findSorted();
            		_.each(allActivities, function(acti) {
            			// herausfinden, ob diese Tätigkeit dem Mitarbeiter zugeordnet ist.
            			if (acti.get("positionId") === "1") {
            				zugeordnet = YES;
            			}
            		});
        			if (zugeordnet) {
        				return act;
        			} else {
        				return null;	
        			}
            	}
            });
        };
        activities = _.compact(activities);
        return activities;
    }

    , takePicture: function() {
    			navigator.camera.getPicture(
    			DigiWebApp.CameraController.cameraSuccessBase64,
    			DigiWebApp.CameraController.cameraError,{ 
    				quality: 40
    				//, allowEdit: true
    				, destinationType : navigator.camera.DestinationType.DATA_URL
    				//, destinationType: navigator.camera.DestinationType.FILE_URI
    				//, sourceType: navigator.camera.PictureSourceType.CAMERA 
    	        });    	
    }
    
    , savePicture: function() {
    	var that = this;
    	that.savePictureWithLocation(null);
    }
    
   
    , savePictureWithLocation: function(location) {
    	var that = this;
    	
    	that.saveSelection();
    	
		var orderId = M.ViewManager.getView('cameraPage', 'order').getSelection();
		
		var posObj = M.ViewManager.getView('cameraPage', 'position').getSelection(YES);
		var posId = posObj ? posObj.value : null;
	
		var actObj = M.ViewManager.getView('cameraPage', 'activity').getSelection(YES);
		var actId = actObj ? actObj.value : null;

	    var handOrderId = null;
	    var handOrderName = null;
	    if(DigiWebApp.BookingController.isHandOrder(orderId)) {
			handOrderId = orderId;
			handOrderName = _.select(DigiWebApp.HandOrder.find(), function(ord) {
			    return ord.get('id') === orderId || ord.get('name') === orderId;
			})[0].get('name');
			orderId = null;
	
			// a hand order has no position
			posId = null;
	    }

	    var lat = '0';
	    var lon = '0';
	    if(location) {
			if (location.latitude) {
			    lat = location.latitude;
			}
			if(location.longitude) {
			    lon = location.longitude;
			}
	    }

	    var myMediaFile = that.newMediaFile({
			oId: orderId,
			hoId: handOrderId,
			hoName: handOrderName,
			lat: lat,
			lon: lon,
			pId: posId,
			aId: actId
    	});
	    
	    myMediaFile.setRemark(M.ViewManager.getView('cameraPage', 'remarkInput').value);
	    
	    var image = document.getElementById(DigiWebApp.CameraPage.content.image.id);

	    myMediaFile.set('fileType', 'image/jpeg;base64');
	    myMediaFile.save();
	    myMediaFile.saveToFile(image.src, DigiWebApp.NavigationController.backToMediaListPageTransition);

    }

    , newMediaFile: function(obj) {
        return DigiWebApp.MediaFile.createRecord({
            orderId: obj.oId ? obj.oId : '0',
            handOrderId: obj.hoId ? obj.hoId : '0',
            handOrderName: obj.hoName ? obj.hoName : '0',
            latitude: obj.lat ? obj.lat : '0',
            longitude: obj.lon ? obj.lon : '0',
            positionId: obj.pId ? obj.pId : '0',
            activityId: obj.aId ? obj.aId : '0',
            icon: 'icon_takePicture.png',
            timeStamp: +new Date()
        });
    }
    
    , myImageData: null
    , myImageObj: null
    , cameraSuccessBase64: function(imageData) {
    	DigiWebApp.CameraController.myImageData = imageData;
        var image = document.getElementById(DigiWebApp.CameraPage.content.image.id);
        image.src = 'data:image/jpeg;base64,' + imageData;

        DigiWebApp.CameraController.myImageObj = new Image();
        DigiWebApp.CameraController.myImageObj.src = 'data:image/jpeg;base64,' + imageData;

    }

    , myImageURI: null
    , cameraSuccessURI: function(imageURI) {
    	DigiWebApp.CameraController.myImageURI = imageURI;
        var image = document.getElementById(DigiWebApp.CameraPage.content.image.id);
        image.src = imageURI;
    }
    
    , cameraError: function(mymessage) {
        DigiWebApp.ApplicationController.nativeAlertDialogView({
            title: 'ERROR',
            message: mymessage,
            callbacks: {
            confirm: {
                target: this,
                action: function () {
    				DigiWebApp.NavigationController.backToMediaListPageTransition();
	                }
	            }
	        }
        });
    }

});

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: RequestController
// ==========================================================================

DigiWebApp.RequestController = M.Controller.extend({

	  GatewayServer: 'www.digi-gps.de'
	, DatabaseServer: null
	, handy2WebServicesUrl: '/Handy2WebServices/services/DatenTransfer'
	
    /**
     * Object containing the success callback for the several calls
     */
    , successCallback: {}

    /**
     * Object containing the success callback for the several calls
     */
    , errorCallback: {}
    
    , softwareVersion: 2470


    /**
     * Method that performs the GET requests to the server.
     *
     * Shows a loader if flag is set in parameter object.
     *
     * Success callback:
     * 1) Hiding the loader
     * 2) Passing to handleSuccessCallback() with the return data of the request and flag for isWorkplan, isKolonne and the source (function that triggered the request) as string
     *
     * Error callback
     * 1) Hiding the loader
     * 2) Passing to handleErrorCallback with return data of the request and the source (function that triggered the request) as string
     *
     * @param {Object} obj The parameter object
     */
    , makeRequest: function(obj) {
    
        var that = this;
        var req = M.Request.init({

            url: 'http://' + DigiWebApp.RequestController.DatabaseServer + DigiWebApp.RequestController.handy2WebServicesUrl + '/' + obj.url + (obj.urlParams ? '?' + obj.urlParams : ''),

            /* alternative way by asking if in native container or not => in getUrl() */
            //url: this.getUrl() + obj.url + (obj.urlParams ? '?' + obj.urlParams : ''),

            method: 'GET',
            beforeSend: function(xhr) {
                if(obj.loaderText) {
                    DigiWebApp.ApplicationController.DigiLoaderView.show(obj.loaderText);
                } else {
                    DigiWebApp.ApplicationController.DigiLoaderView.show('Lade Daten');
                }

                xhr.setRequestHeader('Cache-Control', 'no-cache');
            },
            onSuccess: function(data, msg, xhr) {
            	var leaveLoaderOpen = NO;
            	if (typeof(obj.leaveLoaderOpen) !== "undefined") leaveLoaderOpen = obj.leaveLoaderOpen;
                if (!leaveLoaderOpen) DigiWebApp.ApplicationController.DigiLoaderView.hide();
                var source = obj.source;
                var workPlan = obj.isWorkPlanRequest;
                var kolonne = obj.isKolonnenRequest;
                this.bindToCaller(that, that.handleSuccessCallback, [data, msg, xhr, workPlan, kolonne, source])();
            },
            onError: function(xhr, err) {
            	console.log("Error in makeRequest: " + err);
                DigiWebApp.ApplicationController.DigiLoaderView.hide();
                this.bindToCaller(that, that.handleErrorCallback, [xhr, err, obj.source])();
            }
        });

        req.send();
    }

    , getUrl: function() {
        try {
            if(device && device.uuid) {
            	if (DigiWebApp.SettingsController.getSetting('debug')) console.log(device.uuid);
                return 'http://' + DigiWebApp.RequestController.DatabaseServer + DigiWebApp.RequestController.handy2WebServicesUrl + '/' ;
            }
        } catch(e) {
            return '/Handy2WebServices/services/DatenTransfer/';
        }

    }

    , getDatabaseServer: function(myFunc, obj) {
    
    	DigiWebApp.RequestController.DatabaseServer = "";
    	
        var firmenId = DigiWebApp.SettingsController.getSetting('company');

    	var myGatewayServer = DigiWebApp.RequestController.GatewayServer;
    	
    	if (typeof(device) === "undefined") {
    		myGatewayServer = location.host;
    	}

		console.log('using: http://' + myGatewayServer + DigiWebApp.RequestController.handy2WebServicesUrl + '/empfangeUrl?firmenId=' + firmenId + '&modus=0&requestTimestamp=' + M.Date.now().date.valueOf());
		
        var req = M.Request.init({
        
            url: 'http://' + myGatewayServer + DigiWebApp.RequestController.handy2WebServicesUrl + '/empfangeUrl?firmenId=' + firmenId + '&modus=0&requestTimestamp=' + M.Date.now().date.valueOf(),

            method: 'GET',
            beforeSend: function(xhr) {
                DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('empfangeUrlLoader'));
                xhr.setRequestHeader('Cache-Control', 'no-cache');
            },
            onSuccess: function(xmldata, msg, xhr) {
				DigiWebApp.ApplicationController.DigiLoaderView.hide();
            	var data = DigiWebApp.RequestController.transformResultToJson(xmldata);
		    	if ( typeof(data['return']) === "undefined" && typeof(data['ns:return']) !== "undefined" ) data['return'] = data['ns:return'];
		    	if (data['return'] !== "") {
		    		DigiWebApp.RequestController.DatabaseServer = data['return'];
		    	} else {
		    		console.log("FALLBACK: empty DatabaseServer --> falling back to GatewayServer"); 
		    		DigiWebApp.RequestController.DatabaseServer = DigiWebApp.RequestController.GatewayServer
		    	}
		    	if (typeof(device) === "undefined") {
		    		if ((location.host !== DigiWebApp.RequestController.DatabaseServer)) {
	        		        DigiWebApp.ApplicationController.nativeAlertDialogView({
	        		            title: M.I18N.l('wrongServer'),
	        		            message: M.I18N.l('wrongServerMessage'),
	        		            callbacks: {
	        		                confirm: {
	        		                    target: this,
	        		                    action: function () {
	        		                    	//alert(location.host);
	        		                    	//alert('http://' + DigiWebApp.RequestController.DatabaseServer + location.pathname);
							    			location.href = 'http://' + DigiWebApp.RequestController.DatabaseServer + location.pathname;
	        		                    }
	        		                }
	        		            }
	        		        });
		    		} else {
		    			//console.log(myFunc);
						myFunc(obj);
		    		}
		    	} else {
	    			//console.log(myFunc);
					myFunc(obj);
				}
            },
            onError: function(xhr, err) {
            	console.log("Error in getDatabaseServer: " + err);
                DigiWebApp.ApplicationController.DigiLoaderView.hide();
        		DigiWebApp.ApplicationController.nativeAlertDialogView({
        			title: M.I18N.l('empfangeUrlError'),
        			message: M.I18N.l('empfangeUrlErrorMessage')
        		});
            }
        });

        req.send();
    }
    
    /**
     * Prepares the authenticate call and calls makeRequest with the corresponding params.
     *
     * Saves callbacks first.
     *
     * @param obj
     */
    , authenticate: function(obj) {
    
    	DigiWebApp.RequestController.getDatabaseServer(DigiWebApp.RequestController.authenticateWithDatabaseServer, obj);

    }

    , authenticateWithDatabaseServer: function(obj) {

        DigiWebApp.RequestController.saveCallbacks(obj.success, obj.error, 'authenticate');

        var firmenId = DigiWebApp.SettingsController.getSetting('company');
        var kennwort = DigiWebApp.SettingsController.getSetting('password');
        var geraeteId = DigiWebApp.SettingsController.getSetting('workerId'); //1; // 1: ein einzelner mitarbeiter, 2: kolonne
        var geraeteTyp = 2; // fixed => 2 stands for app
        //var softwareVersion = M.Application.getConfig('version');

        var params = {
            url: 'authentifizieren',
            urlParams: 'firmenId=' + firmenId + '&kennwort=' + kennwort + '&geraeteId=' + geraeteId + '' +
                '&geraeteTyp=' + geraeteTyp + '&softwareVersion=' + DigiWebApp.RequestController.softwareVersion + '&requestTimestamp=' + M.Date.now().date.valueOf(),
            loaderText: M.I18N.l('authenticateLoader'),
            source: 'authenticate'
        };

        DigiWebApp.RequestController.makeRequest(_.extend(obj, params));
    }

    /**
     * Prepares the endSession call and calls makeRequest with the corresponding params.
     *
     * Saves callbacks first.
     *
     * @param {Object} obj The parameter object
     */
    , endSession: function(obj) {
        this.saveCallbacks(obj.success, obj.error, 'endSession');

        var modus = '0';

        this.makeRequest(_.extend(obj, {
            url: 'beendeSession',
            urlParams: 'modus=' + modus + '&requestTimestamp=' + M.Date.now().date.valueOf(),
            loaderText: M.I18N.l('logout'),
            source: 'endSession'
        }));
    }

    /**
     * Prepares the getActivities call and calls makeRequest with the corresponding params.
     *
     * Saves callbacks first.
     *
     * @param {Object} obj The parameter object
     */
    , getActivities: function(obj) {
        this.saveCallbacks(obj.success, obj.error, 'getActivities');

        var modus = '1';

        this.makeRequest(_.extend(obj, {
            url: 'empfangeTaetigkeiten',
            urlParams: 'modus=' + modus + '&requestTimestamp=' + M.Date.now().date.valueOf(),
            loaderText: M.I18N.l('getActivitiesLoader'),
            source: 'getActivities',
            leaveLoaderOpen: YES
        }));
    }

    /**
     * Prepares the getOrders call and calls makeRequest with the corresponding params.
     *
     * Saves callbacks first.
     *
     * @param {Object} obj The parameter object
     */
    , getOrders: function(obj) {

        this.saveCallbacks(obj.success, obj.error, 'getOrders');

        var modus = '0';

        this.makeRequest(_.extend(obj, {
            url: 'empfangeAuftraege',
            urlParams: 'modus=' + modus + '&requestTimestamp=' + M.Date.now().date.valueOf(),
            loaderText: M.I18N.l('getOrdersLoader'),
            source: 'getOrders',
            leaveLoaderOpen: YES
        }));
    }

    /**
     * Prepares the getFeatures call and calls makeRequest with the corresponding params.
     *
     * Saves callbacks first.
     *
     * @param {Object} obj The parameter object
     */
    , getFeatures: function(obj) {

        this.saveCallbacks(obj.success, obj.error, 'getFeatures');

        var modus = '0';

        this.makeRequest(_.extend(obj, {
            url: 'empfangeKonfiguration',
            urlParams: 'modus=' + modus + '&requestTimestamp=' + M.Date.now().date.valueOf(),
            loaderText: M.I18N.l('getFeaturesLoader'),
            source: 'getFeatures',
            leaveLoaderOpen: YES
        }));
    }

    /**
     * Prepares the getPositions call and calls makeRequest with the corresponding params.
     *
     * Saves callbacks first.
     *
     * @param {Object} obj The parameter object
     */
    , getPositions: function(obj) {

        this.saveCallbacks(obj.success, obj.error, 'getPositions');

        var modus = '0';

        this.makeRequest(_.extend(obj, {
            url: 'empfangePositionenInfo',
            urlParams: 'modus=' + modus + '&requestTimestamp=' + M.Date.now().date.valueOf(),
            loaderText: M.I18N.l('getPositionsLoader'),
            source: 'getPositions',
            leaveLoaderOpen: YES
        }));
    }


    /**
     * Prepares the getWorkPlans call and calls makeRequest with the corresponding params.
     *
     * Saves callbacks first.
     *
     * @param {Object} obj The parameter object
     */
    , getWorkPlans: function(obj) {
        this.saveCallbacks(obj.success, obj.error, 'getWorkPlans');

        var modus = '0';

        this.makeRequest(_.extend(obj, {
            isWorkPlanRequest: YES,
            url: 'empfangeArbeitsplanNeu',
            urlParams: 'modus=' + modus + '&requestTimestamp=' + M.Date.now().date.valueOf(),
            loaderText: M.I18N.l('getWorkPlansLoader'),
            source: 'getWorkPlans',
            leaveLoaderOpen: YES
        }));
    }

    /**
     * Prepares the getHandOrders call and calls makeRequest with the corresponding params.
     *
     * Saves callbacks first.
     *
     * @param {Object} obj The parameter object
     */
    , getHandOrders: function(obj) {
        this.saveCallbacks(obj.success, obj.error, 'getHandOrders');

        var modus = '0';

        this.makeRequest(_.extend(obj, {
            url: 'empfangeHandauftraege',
            urlParams: 'modus=' + modus + '&requestTimestamp=' + M.Date.now().date.valueOf(),
            loaderText: M.I18N.l('getHandOrdersLoader'),
            source: 'getHandOrders',
            leaveLoaderOpen: YES
        }));
    }

    /**
     * Prepares the getKolonne call and calls makeRequest with the corresponding params.
     *
     * Saves callbacks first.
     *
     * @param {Object} obj The parameter object
     */
    , getKolonne: function(obj) {
        this.saveCallbacks(obj.success, obj.error, 'getKolonne');

        var modus = '0';

        this.makeRequest(_.extend(obj, {
            isKolonnenRequest: YES,
            url: 'empfangeKolonne',
            urlParams: 'modus=' + modus + '&requestTimestamp=' + M.Date.now().date.valueOf(),
            loaderText: M.I18N.l('getKolonne'),
            source: 'getKolonne',
            leaveLoaderOpen: YES
        }));
    }

    , sendConfiguration: function(obj) {
    	// all callbacks lead to DigiWebApp.ApplicationController.authenticate()
    	
        // call authenticate
        this.authenticate({
            success: {  // send configuration in success callback
                target: this,
                action: function() {
                    var that = this;
                    this.saveCallbacks(obj.success, obj.error, 'sendConfiguration');

                    var soapHeader= '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' +
                        'xmlns:tran="http://transfer.webservice.handy2.digi.de" xmlns:xsd="http://transferClasses.data.handy2.digi.de/xsd">' +
                        '<soapenv:Header/>' +
                        '<soapenv:Body>' +
                        '<tran:sendeKonfiguration>';
                    var soapFooter = '   <tran:modus>0</tran:modus>' +
                        '</tran:sendeKonfiguration>' +
                        '</soapenv:Body>' +
                        '</soapenv:Envelope>';

                    var data = soapHeader;
                    data += this.buildDataBodyConfiguration(obj.settings);
                    data += soapFooter;

                    // send configuration has its own request functionality, not by calling makeRequest()
                    M.Request.init({
                        url: 'http://' + DigiWebApp.RequestController.DatabaseServer + DigiWebApp.RequestController.handy2WebServicesUrl + '.DatenTransferHttpSoap11Endpoint/',
                        method: 'POST',
                        data: data,
                        timeout: 15000,
                        contentType: 'text/xml; charset=UTF-8',
                        dataType: 'xml',
                        beforeSend: function(xhr) {
                            if(obj.loaderText) {
                                DigiWebApp.ApplicationController.DigiLoaderView.show(obj.loaderText);
                            } else {
                                DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('sendConfigurationMsg'));
                            }
                            xhr.setRequestHeader(
                                "SOAPAction",
                                "urn:sendeKonfiguration"
                            );
                            xhr.setRequestHeader(
                                "Content-Type",
                                "text/xml;charset=UTF-8"
                            );
                        },
                        onSuccess: function(data, msg, xhr) { // success callback of sendConfiguration
                        	//if (DigiWebApp.SettingsController.getSetting('debug')) console.log("@@@ onSuccess of sendConfiguration");
                            that.endSession({
                                success: {// success callback of endSession
                                    target: that,
                                    action: function() {
			                        	//if (DigiWebApp.SettingsController.getSetting('debug')) console.log("@@@ onSuccess of endSession");
                                        DigiWebApp.ApplicationController.DigiLoaderView.hide();
                                        this.bindToCaller(this, this.handleSuccessCallback, [data, msg, xhr, null, null, 'sendConfiguration'])();
                                        DigiWebApp.ApplicationController.authenticate();
                                    }
                                },
                                error: { // error callback of endSession
                                    target: that,
                                    action: function() {
			                        	//if (DigiWebApp.SettingsController.getSetting('debug')) console.log("@@@ onError of endSession " + err);
                                        DigiWebApp.ApplicationController.DigiLoaderView.hide();
                                        this.bindToCaller(this, this.handleSuccessCallback, [data, msg, xhr, null, null, 'sendConfiguration'])();
                                        DigiWebApp.ApplicationController.authenticate();
                                    }
                                }
                            });
                        },
                        onError: function(xhr, err) {// error callback of sendConfiguration
                        	//if (DigiWebApp.SettingsController.getSetting('debug')) console.log("@@@ onError of sendConfiguration " + err);
                            that.endSession({
                                success: {// success callback of endSession
                                    target: that,
                                    action: function() { // call errorcallback of sendConfiguration
			                        	//if (DigiWebApp.SettingsController.getSetting('debug')) console.log("@@@ onSuccess of endSession");
                                        DigiWebApp.ApplicationController.DigiLoaderView.hide();
                                        that.bindToCaller(that, that.handleErrorCallback, [xhr, err, 'sendConfiguration'])();
                                        DigiWebApp.ApplicationController.authenticate();
                                    }
                                },
                                error: { // error callback of endSession
                                    target: that,
                                    action: function() {
			                        	//if (DigiWebApp.SettingsController.getSetting('debug')) console.log("@@@ onError of endSession " + err);
                                        DigiWebApp.ApplicationController.DigiLoaderView.hide();
                                        that.bindToCaller(that, that.handleErrorCallback, [xhr, err, 'sendConfiguration'])();
                                        DigiWebApp.ApplicationController.authenticate();
                                    }
                                }
                            });

                        }
                    }).send();
                }
            },
            error: {
                target: this,
                action: function() {
                    //this.connectionError();
                    DigiWebApp.ApplicationController.authenticate();
                    console.log("ConnectionError while sendConfiguration");
                }
            }
        });
    }

    /**
     * Sends the data.
     *
     * Process:
     * -----------------------------------------------------
     * (1) Authenticate => (2) Send Data => (3) End Session 
     * -----------------------------------------------------
     * (1) Calls authenticate
     *
     * Success Callback of (1):
     * 1) saves callbacks for sendData
     * 2) prepares SOAP XML (Envelope, Header, Data, Footer)
     * 3) Makes SOAP POST Request to SOAP 1.1 Endpoint with data (SOAP XML) in POST body => (2) Send Data
     * Error Callback of (2):
     * 1) If it is called in closingDay context, reset employee selection
     *
     * Success Callback of (2):
     * 1) Calls endSession() of this controller
     * Error Callback of (2):
     * 1) calls endSession => (3) End Session
     *
     * Success Callback of (3)
     * 1.1) if endSession after sendData success: the success callback passed at the very beginning to sendData (in BookingController.sendData) is called because the call chain completes
     * 1.2) call DigiWebApp.ApplicationController.init() with parameter true to load all data again
     *
     * 2.1) if endSession after sendData error: the error callback passed at the very beginning to sendData (in BookingController.sendData)
     * is called because the sendData call didn't succeed, even though endSession did
     *
     * Error Callback of (3)
     * 1.1) if endSession after sendData success: the success callback passed at the very beginning to sendData (in BookingController.sendData) is called because the call chain completes
     * 1.2) call DigiWebApp.ApplicationController.init() with parameter true to load all data again
     *
     * 2.1) if endSession after sendData error: the error callback passed at the very beginning to sendData (in BookingController.sendData)
     * is called because the sendData call didn't succeed, as well as the endSession did not
     *
     *
     * @param obj
     * @param isClosingDay
     */
    , sendData: function(obj, isClosingDay, doSync) {
        // call authenticate
        this.authenticate({
            success: {  // send data in success callback
                target: this,
                action: function() {
                    var that = this;
                    this.saveCallbacks(obj.success, obj.error, 'sendData');

                    var soapHeader= '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' +
                        'xmlns:tran="http://transfer.webservice.handy2.digi.de" xmlns:xsd="http://transferClasses.data.handy2.digi.de/xsd">' +
                        '<soapenv:Header/>' +
                        '<soapenv:Body>' +
                        '<tran:sendeDaten>';
                    var soapFooter = '   <tran:modus>0</tran:modus>' +
                        '</tran:sendeDaten>' +
                        '</soapenv:Body>' +
                        '</soapenv:Envelope>';

                    var data = soapHeader;
                    data += this.buildDataBodyBookings(obj.bookings);
                    var eb = this.buildEmployeeBody();
                    data += eb;
                    data += soapFooter;

                    // send data has its own request functionality, not by calling makeRequest()
                    M.Request.init({
                        url: 'http://' + DigiWebApp.RequestController.DatabaseServer + DigiWebApp.RequestController.handy2WebServicesUrl + '.DatenTransferHttpSoap11Endpoint/',
                        method: 'POST',
                        data: data,
                        timeout: 15000,
                        contentType: 'text/xml; charset=UTF-8',
                        dataType: 'xml',
                        beforeSend: function(xhr) {
                            if(obj.loaderText) {
                                DigiWebApp.ApplicationController.DigiLoaderView.show(obj.loaderText);
                            } else {
                                DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('sendDataMsg'));
                            }
                            xhr.setRequestHeader(
                                "SOAPAction",
                                "urn:sendeDaten"
                            );
                            xhr.setRequestHeader(
                                "Content-Type",
                                "text/xml;charset=UTF-8"
                            );
                        },
                        onSuccess: function(data, msg, xhr) { // success callback of sendData
                            that.endSession({
                                success: {// success callback of endSession
                                    target: that,
                                    action: function() {
                                        DigiWebApp.ApplicationController.DigiLoaderView.hide();
                                        this.bindToCaller(this, this.handleSuccessCallback, [data, msg, xhr, null, null, 'sendData'])();

                                        // now call startsync again
                                        if (DigiWebApp.SettingsController.getSetting('autoSyncAfterBookTime') || doSync === true) {
                                        	DigiWebApp.ApplicationController.startsync(YES);
                                        }
                                    }
                                },
                                error: { // error callback of endSession
                                    target: that,
                                    action: function() {
                                        DigiWebApp.ApplicationController.DigiLoaderView.hide();
                                        this.bindToCaller(this, this.handleSuccessCallback, [data, msg, xhr, null, null, 'sendData'])();

                                        // now call init again
                                        DigiWebApp.ApplicationController.init(YES);
                                    }
                                }
                            });
                        },
                        onError: function(xhr, err) {// error callback of sendData
                            that.endSession({
                                success: {// success callback of endSession
                                    target: that,
                                    action: function() { // call errorcallback of sendData
                                        DigiWebApp.ApplicationController.DigiLoaderView.hide();
                                        that.bindToCaller(that, that.handleErrorCallback, [xhr, err, 'sendData'])();
                                    }
                                },
                                error: { // error callback of endSession
                                    target: that,
                                    action: function() {
                                        DigiWebApp.ApplicationController.DigiLoaderView.hide();
                                        that.bindToCaller(that, that.handleErrorCallback, [xhr, err, 'sendData'])();
                                    }
                                }
                            });

                        }
                    }).send();
                }
            },
            error: {
                target: this,
                action: function() {
                    if(isClosingDay) {
                        if(DigiWebApp.EmployeeController.getEmployeeState() == 2) {
                            DigiWebApp.EmployeeController.setEmployeeState(1);
                        }
                        // clear employee selection
                        localStorage.removeItem(DigiWebApp.EmployeeController.empSelectionKey);
                        localStorage.removeItem(DigiWebApp.EmployeeController.empSelectionKeyTmp);
                    }
                    this.connectionError();
                }
            }
        });


    }


    /**
     * Constructs the SOAP data body for the bookings.
     *
     * Replaces the placeholder with their values of the actual booking
     *
     * @param {Array|Object} bookings The booking object(s) to be sent
     */
    , buildDataBodyBookings: function(bookings) {
        var dataStr = '';
        var soapDataBooking = '';
        soapDataBooking = soapDataBooking + '   <tran:zeitdatenHandy>\n';
		soapDataBooking = soapDataBooking + '       <xsd:auftragsId><orderId></xsd:auftragsId>\n';
        soapDataBooking = soapDataBooking + '       <xsd:von><timeStampStart></xsd:von>\n';
        soapDataBooking = soapDataBooking + '       <xsd:bis><timeStampEnd></xsd:bis>\n';
        soapDataBooking = soapDataBooking + '       <xsd:gpsBreite><latitude></xsd:gpsBreite>\n';
        soapDataBooking = soapDataBooking + '       <xsd:gpsLaenge><longitude></xsd:gpsLaenge>\n';
        //soapDataBooking = soapDataBooking + '       <xsd:gpsBreite_bis><latitude_bis></xsd:gpsBreite_bis>\n';
        //soapDataBooking = soapDataBooking + '       <xsd:gpsLaenge_bis><longitude_bis></xsd:gpsLaenge_bis>\n';
        //soapDataBooking = soapDataBooking + '       <xsd:signature><signature></xsd:signature>\n';
        soapDataBooking = soapDataBooking + '       <xsd:handauftrag><handOrderName></xsd:handauftrag>\n';
        soapDataBooking = soapDataBooking + '       <xsd:handauftragsId><handOrderId></xsd:handauftragsId>\n';
        soapDataBooking = soapDataBooking + '       <xsd:positonsId><positionId></xsd:positonsId>\n';
        soapDataBooking = soapDataBooking + '       <xsd:taetigkeitsId><activityId></xsd:taetigkeitsId>\n';
        soapDataBooking = soapDataBooking + '       <xsd:bemerkungsfeld><remark></xsd:bemerkungsfeld>\n';
        soapDataBooking = soapDataBooking + '   </tran:zeitdatenHandy>\n';

        if(typeof(bookings) === 'object' && !_.isArray(bookings)) {
            bookings = [bookings];  // if an object was passed, push it into an array, to have one behaviour
        }

        if(_.isArray(bookings)) {
        
            for(var i in bookings) {
                var booking = bookings[i];
                var s = soapDataBooking;
                for(var prop in booking.record) {
                    if(prop === '_createdAt' || prop === '_updatedAt') { continue; }
                    if(prop === 'handOrderName') {
                        s = s.replace(new RegExp('<' + prop + '>'), booking.get(prop) === '0' ? '' : booking.get(prop));
                    } else if(prop === 'orderId') {
                        s = s.replace(new RegExp('<' + prop + '>'), (booking.get(prop) === booking.get('handOrderName') || booking.get('handOrderName') !== '') ? '0' : booking.get(prop));
                    } else if(prop === 'handOrderId') {
                        s = s.replace(new RegExp('<' + prop + '>'), (booking.get(prop) === booking.get('handOrderName')) ? '' : booking.get(prop));
                    } else if(prop === 'fileName') {
                        s = s.replace(new RegExp('<signature>'), typeof(booking.signature) === 'undefined' ? '' : booking.signature);
                    } else {
                        s = s.replace(new RegExp('<' + prop + '>'), booking.get(prop));
                    }
                }
                
                dataStr += s;
                
            }
        }

        // handle left-over properties (maybe the webapp has been updated while there were old bookings in localstorage?)
        while (dataStr.match(new RegExp('><.*</xsd:')) !== null ) {
                dataStr = dataStr.replace(new RegExp('><.*</xsd:'), '></xsd:');
        }
        
        //dataStr += '\n';
        //if (DigiWebApp.SettingsController.getSetting('debug')) console.log('soapDataBooking: ' + dataStr);
        return dataStr;
    }

    /**
     * Constructs the SOAP data body for the settings.
     * 
     * as of 12.03.2012 --> working
     *
     * Replaces the placeholder with their values of the actual settings
     *
     * @param {Array|Object} settings: The settings to be sent
     */
    , buildDataBodyConfiguration: function(settings) {
        var dataStr = '';
        var soapData = '   <tran:konfigurationHandy>\n' +
            '       <xsd:keyId><keyId></xsd:keyId>\n' +
            '       <xsd:value><value></xsd:value>\n' +
            '       <xsd:valueType><valueType></xsd:valueType>\n' +
            '       <xsd:mitarbeiter><mitarbeiter></xsd:mitarbeiter>\n' +
            '       <xsd:timestamp><timestamp></xsd:timestamp>\n' +
            '   </tran:konfigurationHandy>\n';
    
        if(typeof(settings) === 'object' && !_.isArray(settings)) {
            settings = [settings];  // if an object was passed, push it into an array, to have one behaviour
        }

        var now_as_timestamp = +new Date();
        if(_.isArray(settings)) {
            for(var i in settings) {
                var setting = settings[i];
                for(var prop in setting.record) {
	                var s = soapData;
                    if(prop === '_createdAt' || prop === '_updatedAt') { continue; }
                    s = s.replace(new RegExp('<keyId>'), prop);
                    s = s.replace(new RegExp('<value>'), setting.get(prop));
                    s = s.replace(new RegExp('<valueType>'), 'SettingRemote_WebApp');
                    s = s.replace(new RegExp('<mitarbeiter>'), DigiWebApp.SettingsController.getSetting('workerId'));
                    s = s.replace(new RegExp('<timestamp>'), now_as_timestamp);
	                dataStr += s;
                }
            }
        }

        // handle left-over properties (just in case)
        while (dataStr.match(new RegExp('><.*</xsd:')) !== null ) {
                dataStr = dataStr.replace(new RegExp('><.*</xsd:'), '></xsd:');
        }
        
        //dataStr += '\n';
        //if (DigiWebApp.SettingsController.getSetting('debug')) console.log('soapDataBooking: ' + dataStr);
        return dataStr;
    }

    /**
     * Constructs the SOAP data body for the employees.
     *
     * Replaces the placeholder with the values of the employee selection.
     */
    , buildEmployeeBody: function() {
        var empStr = '';
        var soapDataEmployees = '   <tran:mitarbeiterIds><mitarbeiterIds></tran:mitarbeiterIds>\n';
        var employeeIds = localStorage.getItem(DigiWebApp.EmployeeController.empSelectionKey) || localStorage.getItem(DigiWebApp.EmployeeController.empSelectionKeyTmp);
        if(employeeIds) {
            employeeIds = employeeIds.split(',');
        }
        if(employeeIds && employeeIds != 'null' && _.isArray(employeeIds) && employeeIds.length > 0) {
            _.each(employeeIds, function(em) {
                empStr += soapDataEmployees.replace(/<mitarbeiterIds>/, em);
            });
            return empStr;
        } else {
            return '<tran:mitarbeiterIds>0</tran:mitarbeiterIds>\n';
        }
    }

    /**
     *
     * Is a proxy for the success callback and prepares the data returned from the server.
     *
     * Transforms it from XML to JSON, either through transformResultToJson() or special functions
     * for work plans and kolonne, because they cannot be transformed automatically.
     *
     * Calls the success callback of the source call afterwards.
     *
     * @param {Document|Object} data The returned data of the server as a jQuery Document
     * @param {Object} msg
     * @param {Object} xhr The XMLHTTPRequest object.
     * @param {Boolean} workPlanTransform F
     * @param {Boolean} kolonneTransform
     * @param {String} source The name of the method to identify the source of the call
     */
    , handleSuccessCallback: function(data, msg, xhr, workPlanTransform, kolonneTransform, source) {
        var d = null;
        if(!workPlanTransform && !kolonneTransform) {
            d = this.transformResultToJson(data);
        } else {
            if(workPlanTransform) {
                d = this.transformWorkPlanXmlToJson(data);
            } else if(kolonneTransform) {
                d = this.transformKolonneXmlToJson(data);
            }
        }
        M.EventDispatcher.checkHandler(this.successCallback[source]);
        this.successCallback[source].target = this.successCallback[source].target || this;
        this.bindToCaller(this.successCallback[source].target, this.successCallback[source].action, [d, msg, xhr])();
    }


    /**
     *
     * Calls the error callback of the source call
     *
     * @param {Object} xhr The XMLHTTPRequest object.
     * @param {String} err The text status, e.g. "parseerror" or "timeout"
     * @param {String} source The name of the method to identify the source of the call
     */
    , handleErrorCallback: function(xhr, err, source) {
        M.EventDispatcher.checkHandler(this.errorCallback[source]);
        this.errorCallback[source].target = this.errorCallback[source].target || this;
        this.bindToCaller(this.errorCallback[source].target, this.errorCallback[source].action, [xhr, err])();
    }

    /**
     * Saves the callback objects in the corresponding controller properties:
     * - successCallback
     * - errorCallback
     * with their source as key.
     *
     * @param {Object} success The success callback object.
     * @param {Object} error The error callback object.
     * @param source
     */
    , saveCallbacks: function(success, error, source) {
        if(success) {
            this.successCallback[source] = success;
        }
        if(error) {
            this.errorCallback[source] = error;
        }
    }

    /**
     * Automatically transforms the returned XML to JSON.
     * Uses Xml2Json lib/plugin for jQuery.
     *
     * @param {Document|Object} data The returned data of the server, prepared by jQuery
     * @return {Object} The data in JSON format (=> JavaScript object).
     */
    , transformResultToJson: function(data) {
    	//if (DigiWebApp.SettingsController.getSetting('debug')) console.log("transformResultToJson: " + data);
        return $.xml2json(data);
    }


    /**
     *
     * Transforms the work plan xml manually to a JavaScript object.
     *
     * Traverses the documented with jQuery function find.
     *
     * @param {Document|Object} data The returned data of the server, prepared by jQuery
     * @return {Object} The data as a JavaScript object underneath a "return" property as an array.
     */
    , transformWorkPlanXmlToJson: function(data) {
    	//if (DigiWebApp.SettingsController.getSetting('debug')) console.log("transformWorkPlanXmlToJson: " + data);

        var response = {}; 
        response['return'] = [];        
        var xmlDoc = $.parseXML(data);
        //if (DigiWebApp.SettingsController.getSetting('debug')) console.log(xmlDoc);
        
        if ((YES) || ( $(xmlDoc).find('return').length !== xmlDoc.documentElement.childNodes.length )) {

        	_.forEach(xmlDoc.documentElement.childNodes,function(el, i){
        	
				var obj = {};
        		obj.positionen = [];
        		obj.taetigkeitsIds = [];

        		var anzahlPositionen = (el.childNodes.length - 2) / 2;
        		var arbeitsplanId = el.childNodes[0].childNodes[0].nodeValue;
        		var arbeitsplanTyp = el.childNodes[1].childNodes[0].nodeValue;

        		for (j=2;j<anzahlPositionen + 2;j++) {
        			console.log(el.childNodes[j].childNodes[0].nodeValue + " = " + el.childNodes[j+anzahlPositionen].childNodes[0].nodeValue);	
        			var positionTaetigkeit = el.childNodes[j].childNodes[0].nodeValue;
        			var tateigkeitId = el.childNodes[j+anzahlPositionen].childNodes[0].nodeValue;
        			obj.arbeitsplanId = arbeitsplanId;
                    obj.arbeitsplanTyp = arbeitsplanTyp;
        			obj.positionen.push(positionTaetigkeit);
        			obj.taetigkeitsIds.push(tateigkeitId);
        		}

        		response['return'].push(obj);

        	});

		} else {
		// old variant (pre TMP-1.1)
	        $(xmlDoc).find('return').each( // for every result
	            function(i, el) {
	                var obj = {};
	                $(el).find('[localName$="arbeitsplanId"]').each(
	                    function(i, el) {
	                        obj.arbeitsplanId = $(el).text();
	                    }
	                );
	                $(el).find('[localName$="arbeitsplanTyp"]').each(
	                    function(i, el) {
	                        obj.arbeitsplanTyp = $(el).text();
	                    }
	                );
	                obj.positionen = [];
	                $(el).find('[localName$="positionTaetigkeit"]').each(
	                    function(i, el) {
	                        obj.positionen.push($(el).text());
	                    }
	                );
	                obj.taetigkeitsIds = [];
	                $(el).find('[localName$="tateigkeitId"]').each(
	                    function(i, el) {
	                        obj.taetigkeitsIds.push($(el).text());
	                    }
	                );
	                response['return'].push(obj);
	            }
	        );
	    }

        return response;
    }

    /**
     * Transforms the work plan xml manually to a JavaScript object.
     *
     * Traverses the documented with jQuery function find.
     *
     * @param {Document|Object} data The returned data of the server, prepared by jQuery.
     * @return {Object|Null} The data (employees) as a JavaScript object underneath a "return" property as an array or null if no employees where sent.
     */
    , transformKolonneXmlToJson: function(data) {
    	//if (DigiWebApp.SettingsController.getSetting('debug')) console.log("transformKolonneXmlToJson: " + data);
        
        var response = {};
        response['return'] = [];        
        var xmlDoc = $.parseXML(data);
        //if (DigiWebApp.SettingsController.getSetting('debug')) console.log(xmlDoc);
        
        if ((YES) || ( $(xmlDoc).find('return').length !== xmlDoc.documentElement.childNodes.length )) {

        	_.forEach(xmlDoc.documentElement.childNodes,function(el, i){
        	
				var obj = {};
        		obj.mitarbeiterIds = [];
        		obj.mitarbeiterName = [];

        		var anzahlMitarbeiter = (el.childNodes.length -1) / 2;
        		var kolonnenId = el.childNodes[0].childNodes[0].nodeValue;

        		for (j=1;j<=anzahlMitarbeiter;j++) {
        			console.log(el.childNodes[j].childNodes[0].nodeValue + " = " + el.childNodes[j+anzahlMitarbeiter].childNodes[0].nodeValue);	
        			var mitarbeiterId = el.childNodes[j].childNodes[0].nodeValue;
        			var mitarbeiterName = el.childNodes[j+anzahlMitarbeiter].childNodes[0].nodeValue;
        			obj.kolonnenId = kolonnenId;
        			obj.mitarbeiterIds.push(mitarbeiterId);
        			obj.mitarbeiterName.push(mitarbeiterName);
        		}

        		response['return'] = obj;

        	});

		} else {
		// old variant (pre TMP-1.1)
	        $(xmlDoc).find('return').each( // for every result
	            function(i, el) {
	                var obj = {};
	                $(el).find('[nodeName$="kolonnenId"]').each(
	                    function(i, el) {
	                        obj.kolonnenId = $(el).text();
	                    }
	                );
	                obj.mitarbeiterIds = [];
	                $(el).find('[nodeName$="mitarbeiterId"]').each(
	                    function(i, el) {
	                        obj.mitarbeiterIds.push($(el).text());
	                    }
	                );
	                obj.mitarbeiterName = [];
	                $(el).find('[nodeName$="mitarbeiterName"]').each(
	                    function(i, el) {
	                        obj.mitarbeiterName.push($(el).text());
	                    }
	                );
	                response['return'] = obj;
	            }
	        );
	    }  

        if(response['return'] && response['return'].mitarbeiterIds) {
            var employees = [];

            for(var i in response['return'].mitarbeiterIds) {
                var id = response['return'].mitarbeiterIds[i];
                employees.push({
                    kolonnenId: response['return'].kolonnenId,
                    id: id,
                    name: response['return'].mitarbeiterName[i]
                })
            }

            response['return'] = employees;
            return response;
        } else {
            return null;
        }
    }

    /**
     * Displays a connection error alert.
     */
    , connectionError: function() {
        //M.DialogView.alert({
        DigiWebApp.ApplicationController.nativeAlertDialogView({
            title: M.I18N.l('connectionError'),
            message: M.I18N.l('connectionErrorMsg')
        });
    }
});
// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: HandOrderController
// ==========================================================================

DigiWebApp.HandOrderController = M.Controller.extend({

    currentHandOrderName: '',

    save: function() {
        var orderName = M.ViewManager.getView('handOrderPage', 'orderName').value;
        orderName = $.trim(orderName);

        if(orderName) {
            var sameHandOrders = _.select(DigiWebApp.HandOrder.find(), function(ho) {
                return ho.get('name') === orderName;
            });


            //if(/[^a-zA-Z0-9_-]+/.test(orderName)) {
            //if (/[[^a-zA-Z0-9_-äöüÄÖÜ,. !?;:/\\@€=]]+/.test(orderName)) {
            if (DigiWebApp.ApplicationController.sonderzeichenCheck(orderName)) {
                //M.DialogView.alert({
                DigiWebApp.ApplicationController.nativeAlertDialogView({
                    title: M.I18N.l('specialCharProblem'),
                    message: M.I18N.l('specialCharProblemMsg')
                });
                return;
            } else if(sameHandOrders.length > 0) {
                //M.DialogView.alert({
                DigiWebApp.ApplicationController.nativeAlertDialogView({
                    title: M.I18N.l('handOrderExists'),
                    message: M.I18N.l('handOrderExistsMsg')
                });
                return;
            } else if(orderName.length > 16) {
                //M.DialogView.alert({
                DigiWebApp.ApplicationController.nativeAlertDialogView({
                    title: M.I18N.l('handOrderTooLong'),
                    message: M.I18N.l('handOrderTooLongMsg')
                });
                return;
            } else {
                var op = DigiWebApp.HandOrder.createRecord({
                    name: orderName,
                    id: orderName,
                    isLocalOnly: YES
                });
                
                /* add hand order mid to the previously saved ids in localstorage */
                var k = DigiWebApp.ApplicationController.storagePrefix + '_handorderKeys';

                var myLocalStorageString = localStorage.getItem(k);
                
                var hIds = [];
                if (typeof(myLocalStorageString) === "string") {
                	try {
                		hIds = JSON.parse(myLocalStorageString);
                	} catch(e) {}
                } else {
                    // no handorderKeys in localstorage
                }
                
                try {
                    hIds.push(op.m_id);
                } catch(e) {
                	console.log("ERROR in " + this.name + ".save: " + e);
                }

                localStorage.setItem(k, JSON.stringify(hIds));
                
                /* now save it */
                op.save();
                
                if(op) {
                    M.ViewManager.getView('handOrderPage', 'orderName').setValue('');
                    DigiWebApp.SelectionController.useSelections = NO;
                    DigiWebApp.SelectionController.showHandOrderFirst = YES;
                    this.currentHandOrderName = orderName;

                    DigiWebApp.NavigationController.toBookTimePage(YES);
                } else {
                    //M.DialogView.alert({
                    DigiWebApp.ApplicationController.nativeAlertDialogView({
                        title: M.I18N.l('handOrderSaveError'),
                        message: M.I18N.l('handOrderSaveErrorMsg')
                    });
                }
            }

        } else {
            //M.DialogView.alert({
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('noHandOrderNameEntered'),
                message: M.I18N.l('noHandOrderNameEnteredMsg')
            });
        }
        
    }
});

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: DashboardController
// ==========================================================================

DigiWebApp.DashboardController = M.Controller.extend({

      items: null
    
    , itemsWithoutUpdate: null

    , latestId: null
    
    , appCacheUpdateReady: function() {
		if (window.applicationCache) {
			if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
				return true;
			} else if (DigiWebApp.ApplicationController.timeouthappened && window.applicationCache.status !== window.applicationCache.UNCACHED) {
				window.applicationCache.update();
				return (window.applicationCache.status == window.applicationCache.UPDATEREADY);
			} else {
				return (window.applicationCache.status == window.applicationCache.UPDATEREADY);
			}
		} else {
			return false;
		}
	}
    
    , init: function(isFirstLoad) {
    	if(DigiWebApp.DashboardPage.needsUpdate || isFirstLoad || this.appCacheUpdateReady()) {
        	var ChefToolOnly = (DigiWebApp.SettingsController.featureAvailable('409'));
        	if (ChefToolOnly) {
	            var items = [
	                          {
	     	                    label: M.I18N.l('dataTransfer'),
	     	                    icon: 'icon_dataTransfer.png',
	     	                    id: 'dataTransfer'
	     	                }
	            ];
        	} else {
	        	// Standard-Einträge
	            var items = [
	                  {
	                    label: M.I18N.l('closingTime'),
	                    icon: 'icon_closingTime.png',
	                    id: 'closingTime'
	                }
	                , {
	                    label: M.I18N.l('dataTransfer'),
	                    icon: 'icon_dataTransfer.png',
	                    id: 'dataTransfer'
	                }
	                , {
	                    label: M.I18N.l('handApplications'),
	                    icon: 'icon_handApplication.png',
	                    id: 'handOrder'
	                }
	                , {
	                    label: M.I18N.l('timeData'),
	                    icon: 'icon_timeData.png',
	                    id: 'timeData'
	                }
	            ];
        	}
            
            // spezielle Features, wenn freigeschaltet:

            // Start::AuftragsInfo
        	var AuftragsInfoAvailable = (DigiWebApp.SettingsController.featureAvailable('406'));

        	if ( ( AuftragsInfoAvailable ) && !ChefToolOnly ) {
            	if (DigiWebApp.SettingsController.getSetting('debug')) console.log("enabling Feature 406 (AuftragsInfo)");
                items.push({
                    label: M.I18N.l('orderInfo'),
                    icon: 'icon_info.png',
                    id: 'orderInfo'
                });
            }
            // End::AuftragsInfo
            
            // Start::MediaMenu
        	var TakePictureAvailable = (DigiWebApp.SettingsController.featureAvailable('400'));
            var RecordAudioAvailable = (DigiWebApp.SettingsController.featureAvailable('401'));

            if ( ( TakePictureAvailable || RecordAudioAvailable ) && !ChefToolOnly ) {
            	if (DigiWebApp.SettingsController.getSetting('debug')) console.log("enabling Feature MediaMenu");
                items.push({
                    label: M.I18N.l('media') + " (DEMO)",
                    icon: 'icon_media.png',
                    id: 'demomedia'
                });
            }
            if (( TakePictureAvailable || RecordAudioAvailable ) && DigiWebApp.SettingsController.getSetting('debug')) {
            	if (DigiWebApp.SettingsController.getSetting('debug')) console.log("enabling Feature MediaMenu");
                items.push({
                    label: M.I18N.l('media'),
                    icon: 'icon_media.png',
                    id: 'media'
                });
            }
            // End::MediaMenu
            
            // Start::Materialerfassung (402)
			var MaterialerfassungAvailable = DigiWebApp.SettingsController.featureAvailable('402');
            
	            // disable this Feature on small devices (except if override active)
	            if ( ($(window).width()<=480) && (DigiWebApp.SettingsController.getSetting('treatAllAsTablet') === false) ) {
	            	MaterialerfassungAvailable = false;
	            }
            
            if ( (MaterialerfassungAvailable) && !ChefToolOnly ) {
            	if (DigiWebApp.SettingsController.getSetting('debug')) console.log("enabling Feature 402 (Materialerfassung)");
                items.push({
                    label: M.I18N.l('materialPickUp'),
                    icon: 'icon_info.png',
                    id: 'materialerfassung'
                });
            }
            // End::Materialerfassung
            
            // Start::Tagescheckliste (407)
			var TageschecklisteAvailable = DigiWebApp.SettingsController.featureAvailable('407');
            
            if ( (TageschecklisteAvailable) && !ChefToolOnly ) {
            	if (DigiWebApp.SettingsController.getSetting('debug')) console.log("enabling Feature 407 (Tagescheckliste)");
                items.push({
                    label: M.I18N.l('dailyChecklist'),
                    icon: 'icon_info.png',
                    id: 'tagescheckliste'
                });
            }
            // End::Tagescheckliste
            
            // Start::Anwesenheitsliste (408)
            var AnwesenheitslisteAvailable = DigiWebApp.SettingsController.featureAvailable('408');
            
            if (AnwesenheitslisteAvailable) {
            	if (DigiWebApp.SettingsController.getSetting('debug')) console.log("enabling Feature 408 (Anwesenheitsliste)");
                items.push({
                    label: M.I18N.l('Anwesenheitsliste'),
                    icon: 'icon_info.png',
                    id: 'anwesenheitsliste'
                });	
            }
            // End::Anwesenheitsliste
            
            // finish the Dashboard with the Settings-, Update- and the Info-Page
            items.push({
                label: M.I18N.l('settings'),
                icon: 'icon_settings.png',
                id: 'settings'
            });
            
            items.push({
                label: M.I18N.l('info'),
                icon: 'icon_info.png',
                id: 'info'
            });
            
            this.set('items', items);
            this.set('itemsWithoutUpdate', items);
            DigiWebApp.DashboardPage.needsUpdate = false;
            //DigiWebApp.DashboardPage.content.list.renderUpdate();
        }
    	
    	if (window.newAppVersionAvailable) {
    		var itemsWithUpdate = this.itemsWithoutUpdate;
            // add update-button if timeouthappened (not on a mobile device) and applicationCache-available
    		itemsWithUpdate.push({
                label: M.I18N.l('updateApplication'),
                icon: 'icon_info.png',
                id: 'updateApplication'
            });
            this.set('items', itemsWithUpdate);
    	} else {
            this.set('items', this.itemsWithoutUpdate);
    	}

        var list = M.ViewManager.getView('dashboard', 'list');
        if(list) {
            $('#' + list.id).find('li').each(function() {
                $(this).removeClass('selected');
            });
        }
    }

    , itemSelected: function(id, m_id) {
        if(this.latestId) {
            $('#' + this.latestId).removeClass('selected');
        }
        $('#' + id).addClass('selected');

        this.latestId = id;

        if(m_id && typeof(this[m_id]) === 'function') {
            this[m_id]();
        }
    }
    
    , bookTime: function() {
        DigiWebApp.NavigationController.toBookTimePageTransition(YES);
    }

    , closingTime: function() {
        DigiWebApp.BookingController.closeDay();
    }

    , dataTransfer: function(isClosingDay) {
        var bookings = DigiWebApp.Booking.find();
        if(bookings.length > 0) {
            DigiWebApp.BookingController.sendBookings(isClosingDay, true);
         } else {
            // calling startsync here
            DigiWebApp.ApplicationController.startsync(YES);
        }
    }

    , settings: function() {
        DigiWebApp.NavigationController.toSettingsPasswordPageTransition();
    }

    , timeData: function() {
        DigiWebApp.NavigationController.toTimeDataPageTransition();
    }

    , handOrder: function() {
        DigiWebApp.NavigationController.toHandOrderPageTransition();
    }

    , info: function() {
        DigiWebApp.NavigationController.toInfoPageTransition();
    }
        
    , demomedia: function() {
        DigiWebApp.NavigationController.toDemoMediaPageTransition();
    }
    
    , media: function() {
        DigiWebApp.NavigationController.toMediaListPageTransition();
    }
    
    , orderInfo: function() {
	    DigiWebApp.NavigationController.toOrderInfoPageTransition();
	}
	
	, updateApplication: function() {
		if (this.appCacheUpdateReady()) {
			window.applicationCache.swapCache();
			window.location.reload();
		} else {
			DigiWebApp.ApplicationController.nativeAlertDialogView({
    			title: M.I18N.l('noApplicationUpdateAvailable'),
    			message: M.I18N.l('noApplicationUpdateAvailableMsg')
    		});
		}
	}
	
	, materialerfassung: function() {
	    //DigiWebApp.NavigationController.toOrderInfoPageTransition();
	}
	
	, tagescheckliste: function() {
	    //DigiWebApp.NavigationController.toOrderInfoPageTransition();
	}
        
	, anwesenheitsliste: function() {
	    DigiWebApp.NavigationController.toAnwesenheitslistePageTransition();
	}
        
});

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: NavigationController
// ==========================================================================

DigiWebApp.NavigationController = M.Controller.extend({

      toSplashViewPage: function() {
		DigiWebApp.NavigationController.switchToPage('splashView', M.TRANSITION.NONE, NO);
  	}

	, toSplashViewPageTransition: function() {
		DigiWebApp.NavigationController.switchToPage('splashView', M.TRANSITION.FADE, NO);
	}

    , backToDashboardPage: function() {
    	DigiWebApp.NavigationController.switchToPage('dashboard', M.TRANSITION.SLIDEUP, YES);
    }

    , backToDashboardPagePOP: function() {
    	DigiWebApp.NavigationController.switchToPage('dashboard', M.TRANSITION.POP, YES);
    }

    , backToDashboardPageFlipTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('dashboard', M.TRANSITION.FLIP, YES);
    }

    , toDashboardPageFlipTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('dashboard', M.TRANSITION.FLIP, NO);
    }

    , toInfoPage: function() {
    	DigiWebApp.NavigationController.switchToPage('infoPage', M.TRANSITION.NONE, NO);
    }

    , toInfoPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('infoPage', M.TRANSITION.SLIDEUP, NO);
    }

    , backToBookTimePage: function() {
    	var ChefToolOnly = (DigiWebApp.SettingsController.featureAvailable('409'));
    	if (ChefToolOnly) {
    		DigiWebApp.NavigationController.backToDashboardPage();
    	} else {
    		DigiWebApp.NavigationController.switchToPage('bookingPage', M.TRANSITION.SLIDEUP, YES);
    	}
    }

    , backToBookTimePagePOP: function() {
    	var ChefToolOnly = (DigiWebApp.SettingsController.featureAvailable('409'));
    	if (ChefToolOnly) {
    		DigiWebApp.NavigationController.backToDashboardPagePOP();
    	} else {
    		DigiWebApp.NavigationController.switchToPage('bookingPage', M.TRANSITION.POP, YES);
    	}
    }

    , toBookTimePage: function() {
    	var ChefToolOnly = (DigiWebApp.SettingsController.featureAvailable('409'));
    	if (ChefToolOnly) {
    		DigiWebApp.NavigationController.toDashboardPage();
    	} else {
    		DigiWebApp.NavigationController.switchToPage('bookingPage', M.TRANSITION.NONE, NO);
    	}
    }

    , toBookTimePageTransition: function() {
    	var ChefToolOnly = (DigiWebApp.SettingsController.featureAvailable('409'));
    	if (ChefToolOnly) {
    		DigiWebApp.NavigationController.toDashboardPageTransition();
    	} else {
    		DigiWebApp.NavigationController.switchToPage('bookingPage', M.TRANSITION.SLIDEUP, NO);
    	}
    }

    , toBookTimePageFlipTransition: function() {
    	var ChefToolOnly = (DigiWebApp.SettingsController.featureAvailable('409'));
    	if (ChefToolOnly) {
    		DigiWebApp.NavigationController.toDashboardPageFlipTransition();
    	} else {
    		DigiWebApp.NavigationController.switchToPage('bookingPage', M.TRANSITION.FLIP, YES);
    	}
    }

    , backToBookTimePageFlipTransition: function() {
    	var ChefToolOnly = (DigiWebApp.SettingsController.featureAvailable('409'));
    	if (ChefToolOnly) {
    		DigiWebApp.NavigationController.backToDashboardPageFlipTransition();
    	} else {
    		DigiWebApp.NavigationController.switchToPage('bookingPage', M.TRANSITION.FLIP, NO);
    	}
    }

    , toHandOrderPage: function() {
    	DigiWebApp.NavigationController.switchToPage('handOrderPage', M.TRANSITION.NONE, NO);
    }

    , toHandOrderPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('handOrderPage', M.TRANSITION.SLIDEUP, NO);
    }

    , toSettingsPage: function() {
    	DigiWebApp.NavigationController.switchToPage('settingsPage', M.TRANSITION.NONE, NO);
    }

    , backToSettingsPage: function() {
    	DigiWebApp.NavigationController.switchToPage('settingsPage', M.TRANSITION.POP, YES);
    }

    , toNoSettingsiOSPage: function() {
    	DigiWebApp.NavigationController.switchToPage('noSettingsiOSPage', M.TRANSITION.POP, NO);
    }

    , toSettingsPasswordPage: function() {
    	DigiWebApp.NavigationController.switchToPage('settingsPasswordPage', M.TRANSITION.NONE, NO);
    }

    , toSettingsPasswordPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('settingsPasswordPage', M.TRANSITION.POP, NO);
    }

    , toTimeDataPage: function() {
    	DigiWebApp.NavigationController.switchToPage('timeDataPage', M.TRANSITION.NONE, NO);
    }

    , toTimeDataPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('timeDataPage', M.TRANSITION.SLIDEUP, NO);
    }

    , backToTimeDataPage: function() {
    	DigiWebApp.NavigationController.switchToPage('timeDataPage', M.TRANSITION.SLIDEUP, YES);
    }

    , toEmployeePage: function() {
    	DigiWebApp.NavigationController.switchToPage('employeePage', M.TRANSITION.POP, NO);
    }

    , toDashboardPage: function() {
    	DigiWebApp.NavigationController.switchToPage('dashboard', M.TRANSITION.NONE, NO);
    }

    , toDashboardPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('dashboard', M.TRANSITION.SLIDEUP, NO);
    }

    , toOrderInfoPage: function() {
    	DigiWebApp.NavigationController.switchToPage('orderInfoPage', M.TRANSITION.NONE, NO);
    }

    , toOrderInfoPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('orderInfoPage', M.TRANSITION.SLIDEUP, NO);
    }

    , toEditPicturePage: function() {
    	DigiWebApp.NavigationController.switchToPage('editPicturePage', M.TRANSITION.NONE, NO);
    }

    , toEditPicturePageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('editPicturePage', M.TRANSITION.SLIDEUP, NO);
    }

    , backToEditPicturePage: function() {
    	DigiWebApp.NavigationController.switchToPage('editPicturePage', M.TRANSITION.SLIDEUP, YES);
    }

    , toDemoMediaPage: function() { /* DEMO */
    	DigiWebApp.NavigationController.switchToPage('demomediaPage', M.TRANSITION.NONE, NO);
    }

    , toDemoMediaPageTransition: function() { /* DEMO */
    	DigiWebApp.NavigationController.switchToPage('demomediaPage', M.TRANSITION.SLIDEUP, NO);
    }

    , backToDemoMediaPage: function() { /* DEMO */
    	DigiWebApp.NavigationController.switchToPage('demomediaPage', M.TRANSITION.SLIDEUP, YES);
    }

    , toMediaListPage: function() {
    	DigiWebApp.NavigationController.switchToPage('mediaListPage', M.TRANSITION.NONE, NO);
    }

    , toMediaListPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('mediaListPage', M.TRANSITION.SLIDEUP, NO);
    }

    , backToMediaListPage: function() {
    	DigiWebApp.NavigationController.switchToPage('mediaListPage', M.TRANSITION.NONE, YES);
    }

    , backToMediaListPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('mediaListPage', M.TRANSITION.SLIDEUP, YES);
    }

    , toAudioPage: function() {
    	DigiWebApp.NavigationController.switchToPage('audioPage', M.TRANSITION.NONE, NO);
    }

    , toAudioPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('audioPage', M.TRANSITION.SLIDEUP, NO);
    }

    , toDemoAudioPage: function() { /* DEMO */
    	DigiWebApp.NavigationController.switchToPage('demoaudioPage', M.TRANSITION.NONE, NO);
    }

    , toDemoAudioPageTransition: function() { /* DEMO */
    	DigiWebApp.NavigationController.switchToPage('demoaudioPage', M.TRANSITION.SLIDEUP, NO);
    }

    , toCameraPage: function() {
    	DigiWebApp.NavigationController.switchToPage('cameraPage', M.TRANSITION.NONE, NO);
    }
    
    , toCameraPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('cameraPage', M.TRANSITION.SLIDEUP, NO);
    }
    
    , toDemoCameraPage: function() { /* DEMO */
    	DigiWebApp.NavigationController.switchToPage('democameraPage', M.TRANSITION.NONE, NO);
    }
    
    , toDemoCameraPageTransition: function() { /* DEMO */
    	DigiWebApp.NavigationController.switchToPage('democameraPage', M.TRANSITION.SLIDEUP, NO);
    }
    
    , toRemarkPage: function(mycallback) {
    	if (typeof(mycallback) === "function") {
    		DigiWebApp.RemarkPage.myCallback = mycallback;
    	} else {
    		//console.log("mycallback is not a function!");
    		// reset to default behaviour
    		DigiWebApp.RemarkPage.myCallback = function() {
    			DigiWebApp.NavigationController.toBookTimePage();
        		DigiWebApp.BookingController.bookWithRemark();
        	};
    	}
    	DigiWebApp.NavigationController.switchToPage('remarkPage', M.TRANSITION.POP, NO);
    }
    
    , toEditTimeDataPage: function(mycallback) {
    	if (typeof(mycallback) === "function") {
    		DigiWebApp.EditTimeDataPage.myCallback = mycallback;
    	} else {
    		//console.log("mycallback is not a function!");
    		// reset to default behaviour
    		DigiWebApp.EditTimeDataPage.myCallback = function() {
    			DigiWebApp.NavigationController.backToTimeDataPage();
        	};
    	}
    	DigiWebApp.NavigationController.switchToPage('editTimeDataPage', M.TRANSITION.SLIDEUP, NO);
    }    

    , toAnwesenheitslistePage: function() { 
		DigiWebApp.AnwesenheitslisteController.set('items', {});
		DigiWebApp.AnwesenheitslisteController.items = null;
    	DigiWebApp.NavigationController.switchToPage('anwesenheitslistePage', M.TRANSITION.NONE, NO);
    }
    
    , toAnwesenheitslistePageTransition: function() { 
		DigiWebApp.AnwesenheitslisteController.set('items', {});
		DigiWebApp.AnwesenheitslisteController.items = null;
    	DigiWebApp.NavigationController.switchToPage('anwesenheitslistePage', M.TRANSITION.SLIDEUP, NO);
    }
    
    , backToAnwesenheitslistePage: function() { 
    	DigiWebApp.NavigationController.switchToPage('anwesenheitslistePage', M.TRANSITION.NONE, NO);
    }
    
    , backToAnwesenheitslistePageTransition: function() { 
    	DigiWebApp.NavigationController.switchToPage('anwesenheitslistePage', M.TRANSITION.SLIDEUP, NO);
    }
    
    , toZeitbuchungenPage: function() { 
		DigiWebApp.ZeitbuchungenController.set('items', {});
		DigiWebApp.ZeitbuchungenController.items = null;
    	DigiWebApp.NavigationController.switchToPage('zeitbuchungenPage', M.TRANSITION.NONE, NO);
    }
    
    , toZeitbuchungenPageTransition: function() { 
		DigiWebApp.ZeitbuchungenController.set('items', {});
		DigiWebApp.ZeitbuchungenController.items = null;
    	DigiWebApp.NavigationController.switchToPage('zeitbuchungenPage', M.TRANSITION.SLIDEUP, NO);
    }
    
});

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: EmployeeController
// ==========================================================================

DigiWebApp.EmployeeController = M.Controller.extend({

    /**
     * Employee Selection Keys for storage.
     *
     * the tmp key is for still having the selection after closing day for sending the data even though another selection is possible then
     */
    empSelectionKey: M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'employeeSelection',
    empSelectionKeyTmp: M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'employeeSelectionTmp',

    /**
     * Value determing the state of the employee selection
     *
     * 0: no kolonne
     * 1: kolonne, but employees not selected yet
     * 2: employees selected
     * 
     */
    employeeState: 0,

    /**
     * Array containing objects with the particular id and name as properties representing the employees.
     *
     * employeeSelection on EmployeePage has contentBinding on it to fill the list.
     */
    employees: null,


    /**
     * Passes to setEmployeesForList.
     *
     * Is called when the page show event for EmployeePage is triggered.
     */
    init: function() {
        this.setEmployeesForList();
    },

    /**
     * Prepares the selection list on the EmployeePage with the id and values of the employees returned by the server.
     *
     * Triggers content binding for employeeSelection by using set on employees.
     */
    setEmployeesForList: function() {
        if(this.getEmployeeState() == 1) {
            var employees = DigiWebApp.Employee.findSorted();
            if(employees.length > 0) {
                employees = _.map(employees, function(em) {
                    return { label: em.get('name'), value: em.get('id') };
                });
                this.set('employees', employees);
            }
        }
    },

    /**
     * Saves the employee selection ny setting the isSelected property of the selected employee records to YES.
     *
     * Triggered by the tap event on the button on EmployeePage.
     */
    saveEmployeeSelection: function() {
        // first clear old selection in records in local storage
        var employees = DigiWebApp.Employee.find();
        _.each(employees, function(em) {
            em.set('isSelected', NO);
            em.save();
        });

        var selection = M.ViewManager.getView('employeePage', 'employeeSelection').getSelection();
        if(selection.length > 0) {
            _.each(selection, function(sel) { // sel is employee id
                var employee = _.select(DigiWebApp.Employee.find(), function(e) {
                    return e.get('id') === sel;
                });
                employee = _.isArray(employee) ? employee[0] : employee;
                if(employee) {
                    employee.set('isSelected', YES);
                    employee.save();
                }
            });
            //DialogView.alert with action
            //M.DialogView.alert({
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('employeeSelectionSuccess'),
                message: M.I18N.l('employeeSelectionSuccessMsg'),
                callbacks: {
                    confirm: {
                        target: this,
                        action: 'callbackEmployeesSave'
                        //action: this.callbackEmployeesSave
                    }
                }
            });

        } else { // no employee selected
            //M.DialogView.alert({
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('employeeSelection'),
                message: M.I18N.l('employeeSelectionMsg')
            });
        }
    },

    /**
     * Saves the selection of the employees in localStorage and moves back to the booking screen.
     *
     * Called via callback of the employee selection success alert (to avoid rendering bugs with the alert)
     */
    callbackEmployeesSave: function() {
    
        that = DigiWebApp.EmployeeController;
        
        DigiWebApp.BookingController.set('isBackFromEmployeePage', YES);
        DigiWebApp.NavigationController.backToBookTimePagePOP();

        // save Selection in local storage to have it accessible after application restart
        localStorage.setItem(DigiWebApp.EmployeeController.empSelectionKey, that.getSelectedEmployeesAsString());
        that.setEmployeeState(2);
        DigiWebApp.BookingController.book();
    },

    /**
     * Returns an array of all employee records that are selected.
     */
    getSelectedEmployees: function() {
    	//alert("in getSelectedEmployees");
        var employees = DigiWebApp.Employee.find();
        if(employees.length > 0) {
            var selectedEmployees = _.select(employees, function(e) {
                return e.get('isSelected') === true;
            });
            return selectedEmployees;
        }
        return [];
    },

    /**
     * Returns the selected employee ids as a string:
     *
     * Format: "<id1>,<id2>,...,<idN>"
     */
    getSelectedEmployeesAsString: function() {
        if(this.getEmployeeState === 0) {
            return '0';
        }

        if(this.getEmployeeState === 1) {
            return '';
        }

        var empIds = [];
        var employees = this.getSelectedEmployees();
        _.each(employees, function(emp) {
            empIds.push(emp.get('id'));
        });

        return empIds.join(',');
    },

    /**
     * Sets the employee state in controller and localStorage.
     * 
     * @param state
     */
    setEmployeeState: function(state) {
        if(state == 0) {
            this.saveUniversalEmployeeToLocalStorage();
        }
        this.set('employeeState', state);
        localStorage.setItem(M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'employeeState', this.employeeState);
    },

    /**
     * Saves the universal employee (ID=0) in localStorage
     */
    saveUniversalEmployeeToLocalStorage: function() {
        localStorage.setItem(this.empSelectionKey, '0');
    },

    /**
     * Returns the employee state from localStorage. Also sets the controller property employeeState.
     */
    getEmployeeState: function() {
        this.set('employeeState', localStorage.getItem(M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'employeeState'));
        return this.employeeState;
    }

});

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: AudioController
// ==========================================================================

DigiWebApp.AudioController = M.Controller.extend({

	/*
	 * http://docs.phonegap.com/en/1.0.0/phonegap_media_media.md.html
	 */
	
    myAudioObject: {},
    myTimeStamp: null,
    myFilename: null,
    myState: null,

    /*
    * Sample function
    * To handle the first load of a page.
    */
    init: function(isFirstLoad) {
    	if (DigiWebApp.SettingsController.getSetting('debug')) console.log('init');
    	if (DigiWebApp.SettingsController.getSetting('debug')) console.log('this.myState = ' + this.myState);
		if(isFirstLoad) {
            /* do something here, when page is loaded the first time. */
        }
        /* do something, for any other load. */

		// rewire audioIcon for record
    	DigiWebApp.AudioPage.content.grid.button.events = { tap: { action: DigiWebApp.AudioController.recordAudio } };
    	DigiWebApp.AudioPage.content.grid.button.registerEvents();
    	DigiWebApp.AudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.AudioController.recordAudio } };
		//DigiWebApp.AudioPage.content.audioIcon.events = { tap: { target: DigiWebApp.AudioController, action: 'recordAudio' } };
    	DigiWebApp.AudioPage.content.audioIcon.registerEvents();
    	//DigiWebApp.AudioPage.content.audioIcon.value = 'file:///android_asset/www/theme/images/icon_record.png';
    	//DigiWebApp.AudioPage.content.audioIcon.renderUpdate();
    	document.getElementById(DigiWebApp.AudioPage.content.audioIcon.id).src = 'theme/images/icon_record.png';

    	
        this.myTimeStamp = M.Date.create(new Date()).format('yymmddHHMMss');
        this.myFilename = 'DIGI-WebApp-recording-' + this.myTimeStamp + '.wav';
        this.myState = null;
    	
        DigiWebApp.AudioController.myAudioObject = new Media(this.myFilename, this.onSuccess, this.onError, this.mediaStatus, this.mediaPosition);
        if (DigiWebApp.SettingsController.getSetting('debug')) console.log(this.myFilename);
        if (DigiWebApp.SettingsController.getSetting('debug')) console.log(DigiWebApp.AudioController.myAudioObject);
    	
    },

    mediaStatus: function(status) {
    	if (DigiWebApp.SettingsController.getSetting('debug')) console.log('mediaStatus: ' + status);
    },
    
    mediaPosition: function(position) {
    	if (DigiWebApp.SettingsController.getSetting('debug')) console.log('mediaPosition: ' + position);
    },
    
    onSuccess: function() {
    	if (DigiWebApp.SettingsController.getSetting('debug')) console.log('onSuccess');
    	if (DigiWebApp.SettingsController.getSetting('debug')) console.log('this.myState = ' + this.myState);
		switch(this.myState) {
			case 'play':
				
				// rewire audioIcon for stopPlayback
				DigiWebApp.AudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.AudioController.stopPlayback } };
				DigiWebApp.AudioPage.content.audioIcon.registerEvents();
				document.getElementById(DigiWebApp.AudioPage.content.audioIcon.id).src = 'theme/images/icon_stop.png';
				
				break;
				
			case 'record':
				
				// rewire audioIcon for stopRecord
		    	DigiWebApp.AudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.AudioController.stopRecord } };
		    	DigiWebApp.AudioPage.content.audioIcon.registerEvents();
		    	document.getElementById(DigiWebApp.AudioPage.content.audioIcon.id).src = 'theme/images/icon_stop.png';

		    	// rewire digi-button to setup a new recording
		    	DigiWebApp.AudioPage.content.grid.button.events = { tap: { action: DigiWebApp.AudioController.init } };
		    	DigiWebApp.AudioPage.content.grid.button.registerEvents();

		    	break;
		    	
			case 'stop':
				
				// rewire audioIcon for playbackAudio
				DigiWebApp.AudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.AudioController.playbackAudio } };
				DigiWebApp.AudioPage.content.audioIcon.registerEvents();
				document.getElementById(DigiWebApp.AudioPage.content.audioIcon.id).src = 'theme/images/icon_playbackAudio.png';
				
				break;
				
			default:

				// rewire audioIcon for playbackAudio
				DigiWebApp.AudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.AudioController.playbackAudio } };
				DigiWebApp.AudioPage.content.audioIcon.registerEvents();
				document.getElementById(DigiWebApp.AudioPage.content.audioIcon.id).src = 'theme/images/icon_playbackAudio.png';

				break;
		}
    },
    
    onError: function(error) {
    	if (DigiWebApp.SettingsController.getSetting('debug')) console.log('onError');
    	console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    	console.log('Filename: ' + this.myFilename);
    	
    	// rewire audioIcon for playbackAudio
    	DigiWebApp.AudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.AudioController.playbackAudio } };
    	DigiWebApp.AudioPage.content.audioIcon.registerEvents();
    	document.getElementById(DigiWebApp.AudioPage.content.audioIcon.id).src = 'theme/images/icon_playbackAudio.png';

    	// rewire digi-button to setup a new recording
    	DigiWebApp.AudioPage.content.grid.button.events = { tap: { action: DigiWebApp.AudioController.init } };
    	DigiWebApp.AudioPage.content.grid.button.registerEvents();
    },
    
    recordAudio: function() {
    	this.myState = 'record';
    	DigiWebApp.AudioController.myAudioObject.startRecord();

		// rewire audioIcon for stopRecord
    	DigiWebApp.AudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.AudioController.stopRecord } };
    	DigiWebApp.AudioPage.content.audioIcon.registerEvents();
    	document.getElementById(DigiWebApp.AudioPage.content.audioIcon.id).src = 'theme/images/icon_stop.png';

    	// rewire digi-button to setup a new recording
    	DigiWebApp.AudioPage.content.grid.button.events = { tap: { action: DigiWebApp.AudioController.init } };
    	DigiWebApp.AudioPage.content.grid.button.registerEvents();

		if (DigiWebApp.SettingsController.getSetting('debug')) console.log('recordAudio');
    	if (DigiWebApp.SettingsController.getSetting('debug')) console.log('this.myState = ' + this.myState);
    },
   
    stopRecord: function() {
    	this.myState = 'stop';
    	DigiWebApp.AudioController.myAudioObject.stopRecord();

    	// rewire audioIcon for playbackAudio
    	DigiWebApp.AudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.AudioController.playbackAudio } };
    	DigiWebApp.AudioPage.content.audioIcon.registerEvents();
    	document.getElementById(DigiWebApp.AudioPage.content.audioIcon.id).src = 'theme/images/icon_playbackAudio.png';

    	if (DigiWebApp.SettingsController.getSetting('debug')) console.log('stopRecord');
    	if (DigiWebApp.SettingsController.getSetting('debug')) console.log('this.myState = ' + this.myState);
    },
        
    playbackAudio: function() {
    	this.myState = 'play';
    	DigiWebApp.AudioController.myAudioObject.play();

		// rewire audioIcon for stopPlayback
		DigiWebApp.AudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.AudioController.stopPlayback } };
		DigiWebApp.AudioPage.content.audioIcon.registerEvents();
		document.getElementById(DigiWebApp.AudioPage.content.audioIcon.id).src = 'theme/images/icon_stop.png';

		if (DigiWebApp.SettingsController.getSetting('debug')) console.log('playbackAudio');
    	if (DigiWebApp.SettingsController.getSetting('debug')) console.log('this.myState = ' + this.myState);
    },
    
    stopPlayback: function() {
    	this.myState = 'stop';
    	DigiWebApp.AudioController.myAudioObject.stop();
    	
		// rewire audioIcon for playbackAudio
    	DigiWebApp.AudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.AudioController.playbackAudio } };
    	DigiWebApp.AudioPage.content.audioIcon.registerEvents();
    	document.getElementById(DigiWebApp.AudioPage.content.audioIcon.id).src = 'theme/images/icon_playbackAudio.png';

    	if (DigiWebApp.SettingsController.getSetting('debug')) console.log('stopPlayback');
    	if (DigiWebApp.SettingsController.getSetting('debug')) console.log('this.myState = ' + this.myState);
    }
});

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: SelectionController
// ==========================================================================

DigiWebApp.SelectionController = M.Controller.extend({

    // arrays for selection lists
      orders: null
    , positions: null
    , activities: null

    , selections: {
        order: null,
        position: null,
        activity: null
    }

    // use selection that has been made by hand
    , useSelections: NO

    , showHandOrderFirst: NO

    /*
    , setSelection: function() {
        var orders = DigiWebApp.HandOrder.findSorted().concat(DigiWebApp.Order.findSorted()); // we need to check handOrders also
        var positions = DigiWebApp.Position.findSorted();
        var activities = DigiWebApp.SelectionController.getActivities();
    }
    */

    , setSelectionByPreviousSelection: function() {
        var that = this;
        
        var orders = DigiWebApp.HandOrder.findSorted().concat(DigiWebApp.Order.findSorted()); // we need to check handOrders also
        var positions = DigiWebApp.Position.findSorted();
        var activities = DigiWebApp.SelectionController.getActivities();

        /**
         * ORDERS
         */
        var itemSelected = NO;
        var orderArray = _.map(orders, function(order) {
            var obj =  { label: order.get('name'), value: order.get('id') };
            if(obj.value === that.selections.order) {
                obj.isSelected = YES;
                itemSelected = YES;
            }
            return obj;
        });
        orderArray = _.compact(orderArray);
        // push "Bitte wählen Option"
        orderArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:!itemSelected});

        /**
         * POSITIONS
         */
        itemSelected = NO;
        var positionArray = _.map(positions, function(pos) {
            var obj = { label: pos.get('name'), value: pos.get('id') };
            if(obj.value === that.selections.position) {
                obj.isSelected = YES;
                itemSelected = YES;
            }
            return obj;
        });
        positionArray = _.compact(positionArray);
        // push "Bitte wählen Option"
        positionArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:!itemSelected});

        /**
         * ACTIVITIES
         */
        itemSelected = NO;
        var activityArray = _.map(activities, function(act) {
        	if ( typeof(act) === "undefined" ) {
        		console.log("UNDEFINED ACTIVITY");
        	} else {        	
        		var obj = { label: act.get('name'), value: act.get('id') };
        		if(obj.value === that.selections.activity) {
        			obj.isSelected = YES;
        			itemSelected = YES;
        		}
                return obj;
        	}
        });
        activityArray = _.compact(activityArray);
        // push "Bitte wählen Option"
        activityArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:!itemSelected});


        this.resetSelection();
        
        // set selection arrays to start content binding process
        this.set('orders', orderArray);
        this.set('positions', positionArray);
        this.set('activities', activityArray);
    }

    , setSelectionWithCurrentHandOrderFirst: function() {
        //var that = this;

        var orders = DigiWebApp.HandOrder.findSorted().concat(DigiWebApp.Order.findSorted()); // we need to check handOrders also
        //var positions = DigiWebApp.Position.findSorted();
        var activities = DigiWebApp.SelectionController.getActivities();

        
        /**
         * ORDERS
         */
        var itemSelected = NO;
        var orderArray = _.map(orders, function(order) {
            var obj =  { label: order.get('name'), value: order.get('id') };
            if(obj.label === DigiWebApp.HandOrderController.currentHandOrderName) {
                obj.isSelected = YES;
                itemSelected = YES;
            } else {
                obj.isSelected = NO;
            }
            return obj;
        });
        
        orderArray = _.compact(orderArray);
        // push "Bitte wählen Option"
        orderArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:!itemSelected});

        /**
         * POSITIONS (none for HandOrder)
         */
        var positionArray = [];
        // push "Bitte wählen Option"
        positionArray.push({label: M.I18N.l('noData'), value: '0', isSelected:YES});

        /**
         * ACTIVITIES
         */
        var i = 0;
        var activityArray = _.map(activities, function(act) {
        	if ( typeof(act) === "undefined" ) {
        		console.log("UNDEFINED ACTIVITY");
        		return null;
        	} else {
        		var obj = null;
        		if(i === 0 ) {
        			itemSelected = YES;
        			obj = { label: act.get('name'), value: act.get('id'), isSelected:YES };
        		} else {
        			obj = { label: act.get('name'), value: act.get('id') };
        		}
                i++;
                return obj;
            }
        });
        activityArray = _.compact(activityArray);
        activityArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:!itemSelected});
        
        this.resetSelection();
        // set selection arrays to start content binding process
        this.set('orders', orderArray);
        this.set('positions', positionArray);
        this.set('activities', activityArray);
        M.ViewManager.getView('bookingPage', 'position').setSelection('0');
    }

    , setSelectionByCurrentBooking: function() {
        var booking = DigiWebApp.BookingController.currentBooking;
        
        // get all items from local storage
        var orders = DigiWebApp.HandOrder.findSorted().concat(DigiWebApp.Order.findSorted()); // we need to check handOrders also
        var positions = DigiWebApp.Position.findSorted();
        var activities = DigiWebApp.SelectionController.getActivities();

        // get the ids from the current booking
        var orderId = (booking.get('orderId') == "0" ? 0 : booking.get('orderId')) || booking.get('handOrderId'); // we need to check handOrders also
        var positionId = booking.get('positionId');
        var activityId = booking.get('activityId');

        
        /**
         * ORDERS
         */
        var orderArray = _.map(orders, function(order) {
            if(order.get('id') == orderId) {
                return { label: order.get('name'), value: order.get('id'), isSelected: YES };
            } else {
                return { label: order.get('name'), value: order.get('id') };
            }
        });
        orderArray = _.compact(orderArray);
        // push "Bitte wählen Option"
        orderArray.push({label: M.I18N.l('selectSomething'), value: '0'});

        
        /**
         * POSITIONS
         */
        var positionArray = _.map(positions, function(pos) {
            if(pos.get('orderId') === orderId) {
            	var obj = null;
                if(pos.get('id') === positionId) {
                    obj = { label: pos.get('name'), value: pos.get('id'), isSelected: YES };
                } else {
                    obj = { label: pos.get('name'), value: pos.get('id') };
                }
                return obj;
            }
            return null;
        });
        positionArray = _.compact(positionArray);
        // push "Bitte wählen Option"
        positionArray.push({label: M.I18N.l('selectSomething'), value: '0'});


        /**
         * ACTIVITIES
         */
        var workPlans = _.select(DigiWebApp.WorkPlan.find(), function(wp) {
            return wp.get('id') == positionId;
        });

        var itemSelected = NO;

        /* if a workplan exists, only use those activities that are in the workplan */
        if(workPlans.length > 0) {
            activities = this.getActivitiesFromWorkplan(workPlans[0]);
        } else {
            activities = DigiWebApp.SelectionController.getActivities();
        }

        var activityArray = _.map(activities, function(act) {
        	if ( typeof(act) === "undefined" ) {
        		console.log("UNDEFINED ACTIVITY");
        		return null;
        	} else {
        		var obj = null;
        		if(act.get('id') == activityId) {
        			obj = { label: act.get('name'), value: act.get('id'), isSelected: YES };
        			//console.log("ACTIVITY " + i + " = " + act.get('name') + " in setSelectionByCurrentBooking isSelected");
        			itemSelected = YES;
        		} else {
        			obj = { label: act.get('name'), value: act.get('id') };
        			//console.log("ACTIVITY " + i + " = " + act.get('name') + " in setSelectionByCurrentBooking");
        		}
        		return obj;
        	}
        });
        activityArray = _.compact(activityArray);
        activityArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:!itemSelected});


        this.resetSelection();
        // set selection arrays to start content binding process
        this.set('orders', orderArray);
        this.set('positions', positionArray);
        this.set('activities', activityArray);
    }

    , setPositions: function() {
        var orderId = M.ViewManager.getView('bookingPage', 'order').getSelection(YES).value;
        if(!orderId) {
            return;
        }
//        M.ViewManager.getView('bookingPage', 'position').removeSelection(); /* to avoid bug of not setting selected... */
        var positions = DigiWebApp.Position.findSorted();

        var i = 0;
        positions = _.map(positions, function(pos) {
            if(pos.get('orderId') === orderId) {
                var obj = { label: pos.get('name'), value: pos.get('id') };
                if(i === 0) {
                    obj.isSelected = YES;
                }
                i += 1;
                return obj;
            }
            return null;
        });
        positions = _.compact(positions);/* remove falsy values from positions with _.compact() */

        if(positions.length < 1) {
            positions.push({label: M.I18N.l('noData'), value: '0'});
        }


        M.ViewManager.getView('bookingPage', 'position').resetSelection();
        this.set('positions', positions);
        this.setActivities(YES);

        this.saveSelection();
    }

    /* only set those activities that are related to the chosen position */
    , setActivities: function(checkForWorkPlan) {
        var posId = null;

        if(checkForWorkPlan) {
            var posObj = M.ViewManager.getView('bookingPage', 'position').getSelection(YES);
            if(posObj) {
                posId = posObj.value;
            }
        }

        var activities = [];
        //var workPlans = DigiWebApp.WorkPlan.find({query: 'id=' + posId}); // pre TMP-1.0
		//console.log("posId " + posId);
        var workPlans = DigiWebApp.WorkPlan.find({ query: { 
            identifier: 'id', 
            operator: '=', 
            value: posId 
        }});
        var i = 0;

        /* if a workplan exists, only use those activities that are in the workplan */
		//console.log("posId " + posId + ", workPlans.length " + workPlans.length);
        if (workPlans.length === 1) {
            activities = this.getActivitiesFromWorkplan(workPlans[0]);
        } else {
            activities = DigiWebApp.SelectionController.getActivities();
        }

        var currentBookingActivityId = -1;
        if ( typeof(DigiWebApp.BookingController.currentBooking) !== "undefined" && DigiWebApp.BookingController.currentBooking !== null ) { 
        	currentBookingActivityId = DigiWebApp.BookingController.currentBooking.get('activityId');
        }
		var currentBookingActivitySelectable = false;
		_.each(activities, function(act) {
        	if ( typeof(act) === "undefined" ) {
        		console.log("UNDEFINED ACTIVITY");
        		return null;
        	} else {
				if ( act.get('id') === currentBookingActivityId ) { currentBookingActivitySelectable = true; }
			}
		});
		
        activities = _.map(activities, function(act) {
        	if ( typeof(act) === "undefined" ) {
        		console.log("UNDEFINED ACTIVITY");
        		return null;
        	} else {
        		var obj = null;
        		if (currentBookingActivitySelectable) {
        			obj = { label: act.get('name'), value: act.get('id'), isSelected: act.get('id') === currentBookingActivityId ? YES : NO };
        		} else {
        			obj = { label: act.get('name'), value: act.get('id'), isSelected: i === 0 ? YES : NO };
        		}
        		//console.log("ACTIVITY " + i + " = " + act.get('name') + " in setActivities");
                i += 1;
                return obj;
        	}
        });

        activities = _.compact(activities);

        // new to show this when closing day is pressed (corresponds to a reset)
        if(activities.length > 0) {
            activities.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:NO});
        } else {
            activities.push({label: M.I18N.l('noData'), value: '0'});
        }


        M.ViewManager.getView('bookingPage', 'activity').resetSelection();
        this.set('activities', activities);

        this.saveSelection();
    }

    , initSelection: function() {
       var orders = DigiWebApp.HandOrder.findSorted().concat(DigiWebApp.Order.findSorted()); // we need to check handOrders also
       var positions = DigiWebApp.Position.findSorted();
       var activities = DigiWebApp.SelectionController.getActivities();

       /**
        * ORDERS
        */

       // create order selection
       var orderArray = [];
       if(orders){
           orderArray = _.map(orders, function(order) {
               return { label: order.get('name'), value: order.get('id') };
           });
       }
       // push "Bitte wählen Option"
       orderArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:YES});

       /**
        * POSITIONS
        */

       // create position selection
       var positionArray = [];
       if(positions){
           positionArray = _.map(positions, function(pos) {
               return { label: pos.get('name'), value: pos.get('id') };
           });
       }
       // push "Bitte wählen Option"
       positionArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:YES});

       /**
        * ACTIVITIES
        */
       var activityArray = [];
       if(activities){
            activityArray = _.map(activities, function(act) {
            	if ( typeof(act) === "undefined" ) {
            		console.log("UNDEFINED ACTIVITY");
            		return null;
            	} else {
            		return obj = { label: act.get('name'), value: act.get('id') };
            	}
           });
       }
       // push "Bitte wählen Option"
       activityArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected: YES});


        this.resetSelection();
        // set selection arrays to start content binding process
        this.set('orders', orderArray);
        this.set('positions', positionArray);
        this.set('activities', activityArray);
        M.ViewManager.getView('bookingPage', 'order').setSelection('0');
        M.ViewManager.getView('bookingPage', 'position').setSelection('0');
        M.ViewManager.getView('bookingPage', 'activity').setSelection('0');
    }

    , resetSelection: function() {
        M.ViewManager.getView('bookingPage', 'order').resetSelection();
        M.ViewManager.getView('bookingPage', 'position').resetSelection();
        M.ViewManager.getView('bookingPage', 'activity').resetSelection();
    }

    , isPositionSelected: function() {
        // implemented adjustment to M.SeletionListView to return null if no item is available
        var posObj = M.ViewManager.getView('bookingPage', 'position').getSelection(YES);
        if(posObj && posObj.value != "0") { // 'Bitte wählen' is not allowed to be chosen
            return YES;
        } else {
            return NO;
        }
    }

    , isActivitySelected: function() {
        var actObj = M.ViewManager.getView('bookingPage', 'activity').getSelection(YES);
        if(actObj && actObj.value != "0") { // 'Bitte wählen' is not allowed to be chosen
            return YES;
        } else {
            return NO;
        }
    }

    , saveSelection: function() {
        var orderValue = M.ViewManager.getView('bookingPage', 'order').getSelection();
        var positionValue = M.ViewManager.getView('bookingPage', 'position').getSelection();
        var activityValue = M.ViewManager.getView('bookingPage', 'activity').getSelection();

        this.selections.order = orderValue;
        this.selections.position = positionValue;
        this.selections.activity = activityValue;

        this.useSelections = YES;
    }
    
    , getActivities: function(queryobj) {
    	var activities;
    	if (queryobj) {
    		activities = DigiWebApp.Activity.find(queryobj);
    	} else {
    		activities = DigiWebApp.Activity.findSorted();
    	}
    	activities = _.map(activities, function(acti) {
	    	if(acti.get("positionId") === "1") {
	            // normale Tätigkeit
	            return acti;
	         } else {
	            // Tätigkeit nur bei Arbeitsplan
	            return null;
	         }
    	});
    	activities = _.compact(activities);
    	return activities;
    }

    , getActivitiesFromWorkplan: function(workplan) {
        var actIds = workplan.get('activityIds').split(',');
        var activities = [];
        if(actIds && actIds.length > 0) {
            for(var i = 0; i < actIds.length; i++) {
                activities.push(_.first(DigiWebApp.Activity.find({ query: {
                    identifier: 'id', 
                    operator: '=', 
                    value: actIds[i] 
                }})));
            }

        }
        if (workplan.get("workplanType") === "1") {
        	// only those activities which are bound to employee
            activities = _.map(activities, function(act) {
            	if ( typeof(act) === "undefined" ) {
            		console.log("UNDEFINED ACTIVITY");
            		return null;
            	} else {
        			var zugeordnet = NO;
            		var allActivities = DigiWebApp.Activity.findSorted();
            		_.each(allActivities, function(acti) {
            			// herausfinden, ob diese Tätigkeit dem Mitarbeiter zugeordnet ist.
            			if (acti.get("positionId") === "1") {
            				zugeordnet = YES;
            			}
            		});
        			if (zugeordnet) {
        				return act;
        			} else {
        				return null;	
        			}
            	}
            });
        };
        activities = _.compact(activities);
        return activities;
    }

});

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: SettingsController
// ==========================================================================

DigiWebApp.SettingsController = M.Controller.extend({

    showCredentialsAlert: NO,
    credentialsAlertShown: false,
    showIOSMessage: true,

    settings: null,
    
    defaultsettings_object: {
    	debug: false,
    	treatAllAsTablet: false,
    	treatAllAsPhone: false,
        company: '',
        password: '',
        connectionCode: '',
        settingsPassword: 'digi$',
        workerId: '',
        platform: '',
        userAgent: '',
        skipEvents: '',
        timeouthappened: '',
        mapType: 'Google', // or OSM for OpenStreetMap
        autoSyncAfterBookTime: true,
        autoTransferAfterBookTime: false,
        autoTransferAfterClosingDay: false,
        autoSaveGPSData: false,
        GPSDataIsMandatory: false,
        remarkIsMandatory: false,
        useTransitionsSetting: true
    },

    defaultsettings: null,

    init: function() {
    	
    	//M.I18N.defaultLanguage = "de_de";
    	
    	DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem2);
    	
        if(this.showCredentialsAlert && !this.credentialsAlertShown) {
            if (
            	  (    ( M.Environment.getPlatform().substr(0,4) === "iPad"   )
            	    || ( M.Environment.getPlatform().substr(0,6) === "iPhone" )
                  )
                  && ( typeof(device) !== "undefined" ) 
            ) {
            	// we are on iOS inside a native container
            	if ((device.version >= "5.1" && DigiWebApp.SettingsController.showIOSMessage) && (false)) {
            		DigiWebApp.NavigationController.toNoSettingsiOSPage();
            	} else {
            		DigiWebApp.ApplicationController.enforceChefToolOnly();
            		console.log("device.version: " + device.version);
    	        	DigiWebApp.ApplicationController.nativeAlertDialogView({
    	                title: M.I18N.l('noCredentials'),
    	                message: M.I18N.l('noCredentialsMsg')
    	            });
            	}
            } else {
	            // any other platform
        		DigiWebApp.ApplicationController.enforceChefToolOnly();
	        	DigiWebApp.ApplicationController.nativeAlertDialogView({
	                title: M.I18N.l('noCredentials'),
	                message: M.I18N.l('noCredentialsMsg')
	            });
            }
            this.credentialsAlertShown = true;
        }
    	
    	this.defaultsettings = DigiWebApp.Settings.createRecord(DigiWebApp.SettingsController.defaultsettings_object);

        DigiWebApp.Settings.find();        
        
        //console.log("after Settings.find()");
        
        // Start::Bemerkungsfeld (403)
        if (DigiWebApp.SettingsController.featureAvailable('403')) {
        	$('#' + DigiWebApp.SettingsPage.content.remarkIsMandatory.id).show();
        } else {
        	$('#' + DigiWebApp.SettingsPage.content.remarkIsMandatory.id).hide();
        }
        // End::Bemerkungsfeld
        
        DigiWebApp.ApplicationController.enforceChefToolOnly();
        
        $('#' + DigiWebApp.SettingsPage.content.useTransitionsSetting.id).hide();
        // Start::TransitionsAvailable
        /*var p = M.Environment.getPlatform();
        if (   (p.substr(0,10) !== "BlackBerry") 
            && (navigator.userAgent.toLowerCase().indexOf("android") === -1)
        ) {
        	$('#' + DigiWebApp.SettingsPage.content.useTransitionsSetting.id).show();
        } else {
        	console.log("hiding useTransitionsSetting");
        	$('#' + DigiWebApp.SettingsPage.content.useTransitionsSetting.id).hide();
        }*/
        // End::TransitionsAvailable
        
        var settings = null;

        /* values from local storage */
        if(DigiWebApp.Settings.records().length > 0) {
        	        	
        	//console.log("loading settings from local storage");
            var record = DigiWebApp.Settings.records()[0];
        	
        	settings = {
            	debug: [{
                    value: record.get('debug'),
                    label: 'debug',
                    isSelected: record.get('debug')
                }],
                treatAllAsTablet: [{
                    value: record.get('treatAllAsTablet'),
                    label: 'treatAllAsTablet',
                    isSelected: record.get('treatAllAsTablet')
                }],
                treatAllAsPhone: [{
                    value: record.get('treatAllAsPhone'),
                    label: 'treatAllAsPhone',
                    isSelected: record.get('treatAllAsPhone')
                }],
                company: record.get('company'),
                password: record.get('password'),
                connectionCode: record.get('connectionCode'),
                settingsPassword: record.get('settingsPassword'),
                workerId: record.get('workerId'),
                timeouthappened: DigiWebApp.ApplicationController.timeouthappened,
        		skipEvents: DigiWebApp.ApplicationController.skipEvents,
                platform: M.Environment.getPlatform(),
                userAgent: navigator.userAgent,
                mapType: record.get('mapType'),
                autoSyncAfterBookTime: [{
                    value: record.get('autoSyncAfterBookTime'),
                    label: M.I18N.l('autoSyncAfterBookTimeCheck'),
                    isSelected: record.get('autoSyncAfterBookTime')
                }], 
                autoTransferAfterBookTime: [{
                    value: record.get('autoTransferAfterBookTime'),
                    label: M.I18N.l('autoTransferAfterBookTimeCheck'),
                    isSelected: record.get('autoTransferAfterBookTime')
                }],
                autoTransferAfterClosingDay: [{
                    value: record.get('autoTransferAfterClosingDay'),
                    label: M.I18N.l('autoTransferAfterClosingDayCheck'),
                    isSelected: record.get('autoTransferAfterClosingDay')
                }],
                autoSaveGPSData: [{
                    value: record.get('autoSaveGPSData'),
                    label: M.I18N.l('autoSaveGPSData'),
                    isSelected: record.get('autoSaveGPSData')
                }],
                GPSDataIsMandatory: [{
                    value: record.get('GPSDataIsMandatory'),
                    label: M.I18N.l('GPSDataIsMandatory'),
                    isSelected: record.get('GPSDataIsMandatory')
                }],
                remarkIsMandatory: [{
                    value: record.get('remarkIsMandatory'),
                    label: M.I18N.l('remarkIsMandatory'),
                    isSelected: record.get('remarkIsMandatory')
                }],
                useTransitionsSetting: [{
                    value: record.get('useTransitionsSetting'),
                    label: M.I18N.l('useTransitionsSetting'),
                    isSelected: record.get('useTransitionsSetting')
                }]
            };
        /* default values */
        } else {
        	console.log("using default settings");
            settings = {
                debug: [{
                        value: DigiWebApp.SettingsController.defaultsettings.get("debug"),
                        label: 'debug'
                }],
                treatAllAsTablet: [{
                    value: DigiWebApp.SettingsController.defaultsettings.get("treatAllAsTablet"),
                    label: 'treatAllAsTablet'
                }],
                treatAllAsPhone: [{
                    value: DigiWebApp.SettingsController.defaultsettings.get("treatAllAsPhone"),
                    label: 'treatAllAsPhone'
                }],
                company: DigiWebApp.SettingsController.defaultsettings.get("company"),
                password: DigiWebApp.SettingsController.defaultsettings.get("password"),
                connectionCode: DigiWebApp.SettingsController.defaultsettings.get("connectionCode"),
                settingsPassword: DigiWebApp.SettingsController.defaultsettings.get("settingsPassword"),
                workerId: DigiWebApp.SettingsController.defaultsettings.get("workerId"),
                timeouthappened: DigiWebApp.ApplicationController.timeouthappened,
            	skipEvents: DigiWebApp.ApplicationController.skipEvents,
                platform: M.Environment.getPlatform(),
                userAgent: navigator.userAgent,
                mapType: DigiWebApp.SettingsController.defaultsettings.get("mapType"),
                autoSyncAfterBookTime: [{
                    value: DigiWebApp.SettingsController.defaultsettings.get("autoSyncAfterBookTime"),
                    label: M.I18N.l('autoSyncAfterBookTimeCheck')
                }],
                autoTransferAfterBookTime: [{
                    value: DigiWebApp.SettingsController.defaultsettings.get("autoTransferAfterBookTime"),
                    label: M.I18N.l('autoTransferAfterBookTimeCheck')
                }],
                autoTransferAfterClosingDay: [{
                    value: DigiWebApp.SettingsController.defaultsettings.get("autoTransferAfterClosingDay"),
                    label: M.I18N.l('autoTransferAfterClosingDayCheck')
                }],
                autoSaveGPSData: [{
                    value: DigiWebApp.SettingsController.defaultsettings.get("autoSaveGPSData"),
                    label: M.I18N.l('autoSaveGPSData')
                }],
                GPSDataIsMandatory: [{
                    value: DigiWebApp.SettingsController.defaultsettings.get("GPSDataIsMandatory"),
                    label: M.I18N.l('GPSDataIsMandatory')
                }],
                remarkIsMandatory: [{
                    value: DigiWebApp.SettingsController.defaultsettings.get("remarkIsMandatory"),
                    label: M.I18N.l('remarkIsMandatory')
                }],
                useTransitionsSetting: [{
                    value: DigiWebApp.SettingsController.defaultsettings.get("useTransitionsSetting"),
                    label: M.I18N.l('useTransitionsSetting')
                }]
            };
            
            record = DigiWebApp.Settings.createRecord(DigiWebApp.SettingsController.defaultsettings_object).save();
        }
        
        this.set('settings', settings);

	},
	
	saveDone: YES, 

    save: function() {
		
		if (DigiWebApp.SettingsController.saveDone !== YES) {
			return;
		}
		
		DigiWebApp.SettingsController.saveDone = NO;
		
    	var debug = DigiWebApp.SettingsController.getSetting('debug');
    	var treatAllAsTablet = DigiWebApp.SettingsController.getSetting('treatAllAsTablet');
    	var treatAllAsPhone = DigiWebApp.SettingsController.getSetting('treatAllAsPhone');
    	var settingsPassword = DigiWebApp.SettingsController.getSetting('settingsPassword');

    	//var company = M.ViewManager.getView('settingsPage', 'companyInput').value;
        //var password = M.ViewManager.getView('settingsPage', 'passwordInput').value;
        //var connectionCode = M.ViewManager.getView('settingsPage', 'connectionCodeInput').value;
        //var workerId = M.ViewManager.getView('settingsPage', 'workerIdInput').value;

        var company = $('#' + M.ViewManager.getView('settingsPage', 'companyInput').id).val();
        var password = $('#' + M.ViewManager.getView('settingsPage', 'passwordInput').id).val();
        var connectionCode = $('#' + M.ViewManager.getView('settingsPage', 'connectionCodeInput').id).val();
        var workerId = $('#' + M.ViewManager.getView('settingsPage', 'workerIdInput').id).val();

        var timeouthappened = DigiWebApp.ApplicationController.timeouthappened;
        var skipEvents = DigiWebApp.ApplicationController.skipEvents;
        var platform = M.Environment.getPlatform();
        var userAgent = navigator.userAgent;
    	var mapType = DigiWebApp.SettingsController.getSetting('mapType');
        var autoSyncAfterBookTime       = $('#' + M.ViewManager.getView('settingsPage', 'autoSyncAfterBookTimeCheck').id       + ' label.ui-checkbox-on').length > 0 ? YES : NO;
        var autoTransferAfterBookTime   = $('#' + M.ViewManager.getView('settingsPage', 'autoTransferAfterBookTimeCheck').id   + ' label.ui-checkbox-on').length > 0 ? YES : NO;
        var autoTransferAfterClosingDay = $('#' + M.ViewManager.getView('settingsPage', 'autoTransferAfterClosingDayCheck').id + ' label.ui-checkbox-on').length > 0 ? YES : NO;
        var autoSaveGPSData             = $('#' + M.ViewManager.getView('settingsPage', 'autoSaveGPSData').id                  + ' label.ui-checkbox-on').length > 0 ? YES : NO;
        var remarkIsMandatory = NO;
        if (M.ViewManager.getView('settingsPage', 'remarkIsMandatory') !== null) {
        	remarkIsMandatory       = $('#' + M.ViewManager.getView('settingsPage', 'remarkIsMandatory').id                + ' label.ui-checkbox-on').length > 0 ? YES : NO;
        }
        var GPSDataIsMandatory = NO;
        if (M.ViewManager.getView('settingsPage', 'GPSDataIsMandatory') !== null) {
        	remarkIsMandatory       = $('#' + M.ViewManager.getView('settingsPage', 'GPSDataIsMandatory').id                + ' label.ui-checkbox-on').length > 0 ? YES : NO;
        }
        var useTransitionsSetting = $('#' + M.ViewManager.getView('settingsPage', 'useTransitionsSetting').id                  + ' label.ui-checkbox-on').length > 0 ? YES : NO;

        var numberRegex = /^[0-9]+$/;
        if(company) {
            if(!numberRegex.test(company)) {
                //M.DialogView.alert({
                DigiWebApp.ApplicationController.nativeAlertDialogView({
                    title: 'inputError',
                    message: 'inputErrorOnlyNumbers'
                });
                return;
            }
        }
        if(workerId) {
            if(!numberRegex.test(workerId)) {
                //M.DialogView.alert({
                DigiWebApp.ApplicationController.nativeAlertDialogView({
                    title: 'inputError',
                    message: 'inputErrorOnlyNumbers'
                });
                return;
            }
        }


        //M.DialogView.confirm({
        DigiWebApp.ApplicationController.nativeConfirmDialogView({
            title: M.I18N.l('hint'),
            message: M.I18N.l('confirmSaveOfSettings'),
            callbacks: {
                confirm: {
                    action: function() {
                        var record = DigiWebApp.Settings.find()[0];
                        /* if there already is a record, update it */
                        if(record) {

                            /* if some of the hard stuff changed, check for open and not-transfered bookings */
                            var isNew = record.get('company') == '' && record.get('password') == '' && record.get('connectionCode') == '' && record.get('workerId') == '';
                            if (!isNew && (    record.get('company')        != company
                            				|| record.get('password')       != password
                            				|| record.get('connectionCode') != connectionCode
                            				|| record.get('workerId')       != workerId
                            				)
                            	) {

                                /* check for open bookings */
                                var bookings = DigiWebApp.Booking.find();
                                if(bookings.length > 0) {
                                    //M.DialogView.confirm({
                                    DigiWebApp.ApplicationController.nativeConfirmDialogView({
                                        title: M.I18N.l('hint'),
                                        message: M.I18N.l('openBookingsOverwriteBySettingsUpdate'),
                                        callbacks: {
                                            confirm: {
                                                action: function() {
                                                    /* reset the app */
                            						record.set('debug', debug);
                            						record.set('treatAllAsTablet', treatAllAsTablet);
                                                	record.set('treatAllAsPhone', treatAllAsPhone);
                                        			record.set('company', company);
                                                    record.set('password', password);
                                                    record.set('connectionCode', connectionCode);
                                                    record.set('settingsPassword', settingsPassword);
                                                    record.set('workerId', workerId);
                                                    record.set('timeouthappened', timeouthappened);
                                                    record.set('skipEvents', skipEvents);
                                                    record.set('platform', platform);
                                                    record.set('userAgent', userAgent);
                                                    record.set('mapType', mapType);
                                                    record.set('autoSyncAfterBookTime', autoSyncAfterBookTime);
                                                    record.set('autoTransferAfterBookTime', autoTransferAfterBookTime);
                                                    record.set('autoTransferAfterClosingDay', autoTransferAfterClosingDay);
                                                    record.set('autoSaveGPSData', autoSaveGPSData);
                                                    record.set('GPSDataIsMandatory', GPSDataIsMandatory);
                                                    record.set('remarkIsMandatory', remarkIsMandatory);
                                                    record.set('useTransitionsSetting', useTransitionsSetting);
                
                                                    /* now save */
                                                    //alert("saveSettings (if(record) == true)");
                                                    DigiWebApp.SettingsController.saveSettings(record, YES);
                                            		DigiWebApp.SettingsController.saveDone = YES;
                                                }
                                            },
                                            cancel: {
                                                action: function() {
                                                	//DialogView.alert with action
                                                	//M.DialogView.alert({
													DigiWebApp.ApplicationController.nativeAlertDialogView({
                                                        title: M.I18N.l('hint'),
                                                        message: M.I18N.l('settingsUpdateCanceled'),
                                                        callbacks: {
                                                            confirm: {
                                                                action: function() {
                                                                    DigiWebApp.NavigationController.backToDashboardPage();
                                                            		DigiWebApp.SettingsController.saveDone = YES;
                                                                }
                                                            }
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                    });
                                } else {
                                	record.set('debug', debug);
                                	record.set('treatAllAsTablet', treatAllAsTablet);
                                	record.set('treatAllAsPhone', treatAllAsPhone);
                                	record.set('company', company);
                                    record.set('password', password);
                                    record.set('connectionCode', connectionCode);
                                    record.set('settingsPassword', settingsPassword);
                                    record.set('workerId', workerId);
                                    record.set('timeouthappened', timeouthappened);
                                    record.set('skipEvents', skipEvents);
                                    record.set('platform', platform);
                                    record.set('userAgent', userAgent);
                                    record.set('mapType', mapType);
                                    record.set('autoSyncAfterBookTime', autoSyncAfterBookTime);
                                    record.set('autoTransferAfterBookTime', autoTransferAfterBookTime);
                                    record.set('autoTransferAfterClosingDay', autoTransferAfterClosingDay);
                                    record.set('autoSaveGPSData', autoSaveGPSData);
                                    record.set('GPSDataIsMandatory', GPSDataIsMandatory);
                                    record.set('remarkIsMandatory', remarkIsMandatory);
                                    record.set('useTransitionsSetting', useTransitionsSetting);

                                    /* now save */
                                    //alert("saveSettings (if(record) == false)");
                                    DigiWebApp.SettingsController.saveSettings(record, YES);
                            		DigiWebApp.SettingsController.saveDone = YES;
                                }
                            } else if(isNew) {
                            	record.set('debug', debug);
                            	record.set('treatAllAsTablet', treatAllAsTablet);
                            	record.set('treatAllAsPhone', treatAllAsPhone);
                            	record.set('company', company);
                                record.set('password', password);
                                record.set('connectionCode', connectionCode);
                                record.set('settingsPassword', settingsPassword);
                                record.set('workerId', workerId);
                                record.set('timeouthappened', timeouthappened);
                                record.set('skipEvents', skipEvents);
                                record.set('platform', platform);
                                record.set('userAgent', userAgent);
                                record.set('mapType', mapType);
                                record.set('autoSyncAfterBookTime', autoSyncAfterBookTime);
                                record.set('autoTransferAfterBookTime', autoTransferAfterBookTime);
                                record.set('autoTransferAfterClosingDay', autoTransferAfterClosingDay);
                                record.set('autoSaveGPSData', autoSaveGPSData);
                                record.set('GPSDataIsMandatory', GPSDataIsMandatory);
                                record.set('remarkIsMandatory', remarkIsMandatory);
                                record.set('useTransitionsSetting', useTransitionsSetting);
                                
                                /* now save */
                                //alert("saveSettings (isNew)");
                                //console.log(record)
                                DigiWebApp.SettingsController.saveSettings(record, YES);
                        		DigiWebApp.SettingsController.saveDone = YES;
                            } else {
                            	record.set('debug', debug);
                            	record.set('treatAllAsTablet', treatAllAsTablet);
                            	record.set('treatAllAsPhone', treatAllAsPhone);
                            	record.set('company', company);
                                record.set('password', password);
                                record.set('connectionCode', connectionCode);
                                record.set('settingsPassword', settingsPassword);
                                record.set('workerId', workerId);
                                record.set('timeouthappened', timeouthappened);
                                record.set('skipEvents', skipEvents);
                                record.set('platform', platform);
                                record.set('userAgent', userAgent);
                                record.set('mapType', mapType);
                                record.set('autoSyncAfterBookTime', autoSyncAfterBookTime);
                                record.set('autoTransferAfterBookTime', autoTransferAfterBookTime);
                                record.set('autoTransferAfterClosingDay', autoTransferAfterClosingDay);
                                record.set('autoSaveGPSData', autoSaveGPSData);
                                record.set('GPSDataIsMandatory', GPSDataIsMandatory);
                                record.set('remarkIsMandatory', remarkIsMandatory);
                                record.set('useTransitionsSetting', useTransitionsSetting);

                                /* now save */
                                //alert("saveSettings (not isNew)");
                                DigiWebApp.SettingsController.saveSettings(record);
                        		DigiWebApp.SettingsController.saveDone = YES;
                            }
                        /* otherwise create a new one */
                        } else {
                            record = DigiWebApp.Settings.createRecord({
                            	debug: debug,
                            	treatAllAsTablet: treatAllAsTablet,
                            	treatAllAsPhone: treatAllAsPhone,
                                company: company,
                                password: password,
                                connectionCode: connectionCode,
                                settingsPassword: settingsPassword,
                                workerId: workerId,
                                timeouthappened: timeouthappened,
                            	skipEvents: skipEvents,
                                platform: platform,
                                userAgent: userAgent,
                                mapType: mapType,
                                autoSyncAfterBookTime: autoSyncAfterBookTime,
                                autoTransferAfterBookTime: autoTransferAfterBookTime,
                                autoTransferAfterClosingDay: autoTransferAfterClosingDay,
                                autoSaveGPSData: autoSaveGPSData,
                                GPSDataIsMandatory: GPSDataIsMandatory,
                                remarkIsMandatory: remarkIsMandatory,
                                useTransitionsSetting: useTransitionsSetting
                            });

                            /* now save */
                            //alert("saveSettings (createNewOne)");
                            DigiWebApp.SettingsController.saveSettings(record);
                    		DigiWebApp.SettingsController.saveDone = YES;
                        }
                    }
                },
                cancel: {
                    action: function() {
            			DigiWebApp.SettingsController.saveDone = YES;
                        return;
                    }
                }
            }
        });
    },

    saveSettings: function(record, reloadApplication, silent) {

        /* clear the LS if its a reload */
        if(reloadApplication) {
            DigiWebApp.Booking.deleteAll();
            DigiWebApp.MediaFile.deleteAll();
        	localStorage.clear('f');
        	DigiWebApp.BookingController.currentBooking = null;
        	$('#' + DigiWebApp.BookingPage.content.currentBookingLabel.id).html("");
        }

        if(record.save()) {
        	//console.log("record saved");
        	//console.log(record);
            if(!reloadApplication) {
                // switch back to dashboard
            	if (silent) {
            		DigiWebApp.NavigationController.backToDashboardPage();
            	} else {
	                //DialogView.alert with action
	                //M.DialogView.alert({
	                DigiWebApp.ApplicationController.nativeAlertDialogView({
	                    title: M.I18N.l('hint'),
	                    message: M.I18N.l('settingsSaveDone'),
	                    callbacks: {
	                        confirm: {
	                            action: function() {
	                                DigiWebApp.NavigationController.backToDashboardPage();
	                            }
	                        }
	                    }
	                });
            	}
            } else {
            	//DialogView.alert with action
                //M.DialogView.alert({
                DigiWebApp.ApplicationController.nativeAlertDialogView({
                    title: M.I18N.l('hint'),
                    message: M.I18N.l('settingsSaveDoneReloadApp'),
                    callbacks: {
                        confirm: {
                            action: function() {
                                //location.href = location.protocol + '//' + location.host + location.pathname;
                				DigiWebApp.SettingsController.showCredentialsAlert = NO;
                				DigiWebApp.ApplicationController.init(true);
                			}
                        }
                    }
                });
            }
        } else {
            //M.DialogView.alert({
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('error'),
                message: M.I18N.l('settingsSaveError')
            });
        }
    },

    getSetting: function(prop) {
        var setting = DigiWebApp.Settings.find()[0];
        if ( typeof(setting) !== "undefined" ) {
        	if ( typeof(setting.get(prop)) === "undefined" ) { 
        		try {
        			setting.set(prop, DigiWebApp.SettingsController.defaultsettings.get(prop));
        		} catch(e) { console.log("ERROR: setting.set for prop=" + prop); }
        	}
            return setting.get(prop);
        }
    },

    setSetting: function(prop, value) {
        var setting = DigiWebApp.Settings.find()[0];
        if ( typeof(setting) !== "undefined" ) {
        	try {
        		setting.set(prop, value);
    		} catch(e) { console.log("ERROR: setting.get for prop=" + prop); }
        	DigiWebApp.SettingsController.saveSettings(setting, NO, YES);
        }
    },
      
	featureAvailable: function(featureId) {
			
		if ( typeof(featureId) !== "string" ) {
			return false;
		}
	
		if ( featureId.length === 0) {
			return false;
		}
	
		var FeatureSetting = _.select(DigiWebApp.Features.find(), function(f) {
		    return f.get('id') === featureId;
		})[0];
	
		if (typeof(FeatureSetting) === "undefined") {
			return false;
		} else {
			return (FeatureSetting.get('isAvailable') === "true");
		}
	
	},

    sendConfiguration: function() {
        var settings = DigiWebApp.Settings.find();
        DigiWebApp.RequestController.sendConfiguration({
            settings: settings,
            success: {
                target: this,
                action: function() {
        			// Konfiguration erfolgreich übertragen
        			//console.log("sendConfiguration worked");
        			//ApplicationController.authenticate();
                }
            },
            error: {
                target: this,
                action: function() {
            		// Konfiguration nicht übertragen
            		//console.log("sendConfiguration failed");
                    //DigiWebApp.ApplicationController.nativeAlertDialogView({
                    //    title: M.I18N.l('sendConfigurationFail'),
                    //    message: M.I18N.l('sendConfigurationFailMsg')
                    //});
                }
            }
        });
    }

});

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: BookingController
// ==========================================================================


/*
* The controller that handles everything booking related.
* Is also the endpoint for action triggered on the BookingPage
* */
DigiWebApp.BookingController = M.Controller.extend({

    /* FOR BOOKING: */
    /*timeStampStart: null
    , timeStampEnd: null*/


    /**
     * The current open booking
     */
    currentBooking: null

    /**
     * The before opened booking closed and saved temporarily for 
     */
    , currentBookingClosed: null


    /**
     * The string representing the data of the current open booking.
     *
     * The currentBookingLabel of the BookingPage has a content binding on it, that means
     * setting a new value to this property will change the label's value
     */
    , currentBookingStr: ''

    /*, orders: null
    , positions: null
    , activities: null*/

    /**
     * Flag indicating whether a switch to the bookingPage is back from employee selection page
     *
     * Important for determing whether to re-set selection lists or not
     */
    , isBackFromEmployeePage: NO

    , isBackFromRemarkPage: NO

    /**
     * Array of booking objects (model records).
     * Data for listview on time data page (open bookings)
     *
     * => list on timeDataPage has content binding on it
     */
    , timeData: null
    , timeDataSent: null
    , timeDataForEdit: null

    /**
     *
     * On first load does:
     *
     * 1) searches for an open booking and sets it if available
     * 2) Builds the current booking string and sets it to property currentBookingStr
     * 3) Presets the selection lists to show the data of the current open booking
     *
     * On first and every other load:
     * If back from employee selection apge
     * 1) sets isBackFromEmployeePage to NO and nothing more
     *
     * Else
     * Sets the selection list according to different flags in SelectionController:
     * showHandOrders or useSelection (selection made before)
     * if they are false, set selection to current open booking
     * if no open booking reset selection
     *
     * @param {Boolean} isFirstLoad is passed if this function is used in a page event like pageshow => determines that the page is loaded for the very
     * first time during this application life cycle
     */
    , init: function(isFirstLoad) {

		var p = M.Environment.getPlatform();
        if (    (p.substr(0,10) !== "BlackBerry")
        	 && (p.substr(0,12) !== "Linux armv7l")
    		//&& (navigator.userAgent.toLowerCase().indexOf("android") === -1)
    	) {
        	// enable Transitions on iOS and Android
            DigiWebApp.ApplicationController.setTransitionsSetting();
		}
	
		if (this.isBackFromRemarkPage || this.isBackFromEmployeePage) {
			this.refreshCurrentBooking(false);
		} else {
			this.refreshCurrentBooking(true);
		}

        if(this.isBackFromEmployeePage) {
            DigiWebApp.BookingController.set('isBackFromEmployeePage', NO);
        } else if(this.isBackFromRemarkPage) {
            DigiWebApp.BookingController.set('isBackFromRemarkPage', NO);
            console.log("isBackFromRemarkPage");
        } else {
			//this.refreshCurrentBooking(true);
            if(DigiWebApp.SelectionController.useSelections) {
            	if (DigiWebApp.SettingsController.getSetting('debug')) console.log('useSelections');
                DigiWebApp.SelectionController.setSelectionByPreviousSelection();
            } else if(DigiWebApp.SelectionController.showHandOrderFirst) {
                if (DigiWebApp.SettingsController.getSetting('debug')) console.log('showHandOrderFirst');
                DigiWebApp.SelectionController.showHandOrderFirst = NO;
                DigiWebApp.SelectionController.setSelectionWithCurrentHandOrderFirst();
            } else {
                if(this.currentBooking) {
                    if (DigiWebApp.SettingsController.getSetting('debug')) console.log('useCurrentBooking');
                    DigiWebApp.SelectionController.setSelectionByCurrentBooking();
                } else {
                    DigiWebApp.SelectionController.initSelection();
                }

            }
        }
    }

    /**
     * Called by init and book to handle changes in localStorage
     * 
     * @param {Boolean} reset Selection?
     */
    , refreshCurrentBooking: function (setSelection) {
    	
        var bookings = DigiWebApp.Booking.find();
        var openBookings = null;

        if(bookings.length > 0) {
            openBookings = _.select(bookings, function(b) {
                return b.get('isCurrent') === true;
            });
        }

        if(openBookings && openBookings.length > 0) {

            if (DigiWebApp.SettingsController.getSetting('debug')) console.log('currentBookingStr was ' + this.get('currentBookingStr'));

            this.set('currentBooking', openBookings[0]);
            this.set('currentBookingStr', this.buildBookingStr(this.currentBooking));

            if (DigiWebApp.SettingsController.getSetting('debug')) console.log('currentBookingStr is now ' + this.get('currentBookingStr'));

            if (setSelection) {
            	DigiWebApp.SelectionController.setSelectionByCurrentBooking();
            }
        }
    }

    , book: function() {
		if (this.checkBooking()) { // checkBooking checks for all booking-problems
			if (this.currentBooking) {
				// Start::Bemerkungsfeld (403)
				if (DigiWebApp.SettingsController.featureAvailable('403')) {
						// if remark-feature active: go to remarkpage
						this.refreshCurrentBooking(false);
						DigiWebApp.NavigationController.toRemarkPage(function() {
		    				DigiWebApp.ApplicationController.DigiLoaderView.hide();
		    				DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('Save'));
		    		        DigiWebApp.BookingController.set('isBackFromRemarkPage', YES);
		    		        DigiWebApp.NavigationController.backToBookTimePagePOP();
		    				DigiWebApp.ApplicationController.DigiLoaderView.hide();
		    				DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('Save'));
						DigiWebApp.BookingController.bookWithRemark();            					
				    });
				} else {
						// else: bookWithRemark
					DigiWebApp.BookingController.bookWithRemark();
				}
				// End::Bemerkungsfeld
			} else {
				DigiWebApp.BookingController.bookWithRemark();
			}
		} // if (checkBooking())
    }

    /**
     * Called by clicking the button on bookingPage.
     *
     * Does the "preprocessing of a booking"
     *
     * 1) If kolonne is available and no employee selected yet, show employees page
     * 2) If autoSaveGPSData is active, fetch position first and then proceed booking, otherwise proceed booking immediately
     */
    , bookWithRemark: function() {

        // refresh bookings from localStorage
    	this.setNotBookedBookings(); // this also calls this.setBookedBookings();
    	
    	// refresh currentBooking from localStorage
    	if (DigiWebApp.SettingsController.getSetting('debug')) console.log('refresh currentBooking');
		this.refreshCurrentBooking(false);
    	
    	// EmployeeSelection (Kolonne)
		if(DigiWebApp.EmployeeController.getEmployeeState() == 1) {
            var employeeString = localStorage.getItem(DigiWebApp.EmployeeController.empSelectionKey);
            if(!employeeString) {
                DigiWebApp.NavigationController.toEmployeePage();
                return;
            }
        }
        
		this.getBookingLocation(this.proceedBooking);
		
    }
    
    , getBookingLocation: function(successCallback) {

    	var that = DigiWebApp.BookingController;
    	
    	// Get GPS-Position if set in Settings
    	if(DigiWebApp.SettingsController.getSetting('autoSaveGPSData')) {
            DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('getGPSPositionMsg'));

            var getLocationOptions =  { 
            		enableHighAccuracy: YES, 
            		maximumAge: 0, 
            		timeout: 240000 
            	};

            M.LocationManager.getLocation(that, successCallback, function(error) {
            	if (DigiWebApp.SettingsController.getSetting('debug')) console.log("error=" + error + ", error.code="+error.code + ", error.message=" + error.message);

            	M.LocationManager.getLocation(that, successCallback, function(error) {
                	if (DigiWebApp.SettingsController.getSetting('debug')) console.log("error=" + error + ", error.code="+error.code + ", error.message=" + error.message);
                	/*
                	 * error = "PERMISSION_DENIED" || "POSITION_UNAVAILABLE" || "TIMEOUT"
                    */
                	if ( error === "POSITION_UNAVAILABLE" ) {
                		DigiWebApp.ApplicationController.nativeAlertDialogView({
                			title: M.I18N.l('GPSError'),
                			message: M.I18N.l('GPSunavailable')
                		});
                	} else if ( error === "TIMEOUT" ) {
                		DigiWebApp.ApplicationController.nativeAlertDialogView({
                			title: M.I18N.l('GPSError'),
                			message: M.I18N.l('GPStimeout')
                		});
                	} else if ( error === "PERMISSION_DENIED" ) {
                		DigiWebApp.ApplicationController.nativeAlertDialogView({
                			title: M.I18N.l('GPSError'),
                			message: M.I18N.l('GPSmissingPermission')
                		});
                	} else {
                		DigiWebApp.ApplicationController.nativeAlertDialogView({
                			title: M.I18N.l('GPSError'),
                			message: M.I18N.l('GPSunknownError') + error
                		});
                		
                	}
                    M.LocationManager.getLocation(that, successCallback, successCallback);
                }, getLocationOptions);
        	});
        } else {
        	successCallback();
        }
   	}
    
    , checkBooking: function() {
        //var booking = null;

        // check if order chosen
        var orderId = M.ViewManager.getView('bookingPage', 'order').getSelection();
        if(!orderId || (orderId && orderId === "0")) {
            //M.DialogView.alert({
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('noOrderSelected'),
                message: M.I18N.l('noOrderSelectedMsg')
            });
            return false;
        } else {
            // check if hand order
            if(!this.isHandOrder(orderId)) {// if it is not a hand order position and activity must be selected
                // check if position is set
                if (!DigiWebApp.SelectionController.isPositionSelected()) {
                    //M.DialogView.alert({
                    DigiWebApp.ApplicationController.nativeAlertDialogView({
                        title: M.I18N.l('noPosSelected'),
                        message: M.I18N.l('noPosSelectedMsg')
                    });
                    return false;
                } else {
                    // check if activity is set
                    if(!DigiWebApp.SelectionController.isActivitySelected()) {
                        //M.DialogView.alert({
                        DigiWebApp.ApplicationController.nativeAlertDialogView({
                            title: M.I18N.l('noActSelected'),
                            message: M.I18N.l('noActSelectedMsg')
                        });
                        return false;
                    }
                }
            } else {
                // check if activity is set
                if(!DigiWebApp.SelectionController.isActivitySelected()) {
                    //M.DialogView.alert({
                    DigiWebApp.ApplicationController.nativeAlertDialogView({
                        title: M.I18N.l('noActSelected'),
                        message: M.I18N.l('noActSelectedMsg')
                    });
                    return false;
                }
            } // else of: if(!this.isHandOrder(orderId))
                        
            var posObj = M.ViewManager.getView('bookingPage', 'position').getSelection(YES);
            var posId = posObj ? posObj.value : null;

            var actObj = M.ViewManager.getView('bookingPage', 'activity').getSelection(YES);
            var actId = actObj ? actObj.value : null;

            // check if open booking
            if(this.currentBooking) {
                var curBookingOrderId = this.currentBooking.get('orderId');
                var curBookingHandOrderId = this.currentBooking.get('handOrderId');
                var curBookingPosId = this.currentBooking.get('positionId');
                var curBookingActId = this.currentBooking.get('activityId');

                if(curBookingOrderId === orderId || curBookingHandOrderId === orderId) {

                    if((!this.isHandOrder(orderId)) && (curBookingPosId === posId) && (curBookingActId === actId)) {
                        //M.DialogView.alert({
                        DigiWebApp.ApplicationController.nativeAlertDialogView({
                            title: M.I18N.l('doubleBooking'),
                            message: M.I18N.l('doubleBookingMsg')
                        });
                        return false;
                    }

                    if(this.isHandOrder(orderId) && (curBookingActId === actId)) {
                        //M.DialogView.alert({
                        DigiWebApp.ApplicationController.nativeAlertDialogView({
                            title: M.I18N.l('doubleBooking'),
                            message: M.I18N.l('doubleBookingMsg')
                        });
                        return false;
                    }

                } // if(curBookingOrderId === orderId || curBookingHandOrderId === orderId)

                return true;

            } // if(this.currentBooking)

	    return true;
		
        } // end of else of: if(!orderId || (orderId && orderId === "0"))
    }

    
    /**
     * Callback of location retrival
     *
     * Checks if a selection is set.
     * Distinguishes between an open booking is available or not
     * and distinguishes also, whether a hand order or a regular order is selected
     *
     * Triggers a send operation if autoTransferAfterBookTime is activated in the settings, otherwise just saves the booking.
     *
     * @param {Object} location The location object with the coordinates (latitude, longitude) if a location could be retrieved
     */
    , proceedBooking: function(location) {
    	
    	var that = DigiWebApp.BookingController;
    	
        DigiWebApp.ApplicationController.DigiLoaderView.hide();
        //var booking = null;

		var orderId = M.ViewManager.getView('bookingPage', 'order').getSelection();
	
		var posObj = M.ViewManager.getView('bookingPage', 'position').getSelection(YES);
		var posId = posObj ? posObj.value : null;
	
		var actObj = M.ViewManager.getView('bookingPage', 'activity').getSelection(YES);
		var actId = actObj ? actObj.value : null;

	    // close open booking 
	    if(that.currentBooking) {
			var curBookingOrderId = that.currentBooking.get('orderId');
			//var curBookingHandOrderId = this.currentBooking.get('handOrderId');
			//var curBookingPosId = this.currentBooking.get('positionId');
			//var curBookingActId = this.currentBooking.get('activityId');
			if (DigiWebApp.SettingsController.getSetting('debug')) console.log('close currentBooking with orderId=' + curBookingOrderId);
	
			// now setting states on record
			if (DigiWebApp.SettingsController.getSetting('debug')) console.log("currentBooking.remark before closeBooking: " + that.currentBooking.get('remark'));
			that.currentBooking.closeBooking(location);
			that.currentBooking.removeAsCurrent();
			that.currentBooking.save();
			if (DigiWebApp.SettingsController.getSetting('debug')) console.log('saving open ' + that.currentBooking.get('orderId'));
			that.currentBookingClosed = that.currentBooking;
	    }

	    // setup new booking
	    var handOrderId = null;
	    var handOrderName = null;
	    if(that.isHandOrder(orderId)) {
			handOrderId = orderId;
			handOrderName = _.select(DigiWebApp.HandOrder.find(), function(ord) {
			    return ord.get('id') === orderId || ord.get('name') === orderId;
			})[0].get('name');
			orderId = null;
	
			// a hand order has no position
			posId = null;
	    }
	    
	    var lat = '0';
	    var lon = '0';
	    if(location) {
			if (location.latitude) {
			    lat = location.latitude;
			}
			if(location.longitude) {
			    lon = location.longitude;
			}
	    }
	    
	    // reset remark
	    M.ViewManager.getView('remarkPage', 'remarkInput').value = '';
	    remarkStr = '';

	    that.set('currentBooking', that.openBooking({
			oId: orderId,
			hoId: handOrderId,
			hoName: handOrderName,
			lat: lat,
			lon: lon,
			pId: posId,
			aId: actId,
			remark: remarkStr
	    }));

	    that.currentBooking.setAsCurrent();
	    if (DigiWebApp.SettingsController.getSetting('debug')) console.log('saving new ' + that.currentBooking.get('orderId'));
	    that.currentBooking.save();

	    that.set('currentBookingStr', that.buildBookingStr(that.currentBooking));

	    // don't use selections anymore, use the current booking (till selection is changed again)
	    DigiWebApp.SelectionController.useSelections = NO;

	    if(that.autoSend()) {
	    	that.sendCurrentBookings();
	    } else {
			//M.DialogView.alert({
			DigiWebApp.ApplicationController.nativeAlertDialogView({
			    title: M.I18N.l('bookingSaved'),
			    message: M.I18N.l('bookingSavedMsg'),
			    callbacks: {
	                confirm: {
	                    target: DigiWebApp.NavigationController,
	                    action: 'backToBookTimePagePOP'
	                }
	            }
			});
			try { $.mobile.fixedToolbars.show(); } catch(e) {}; // this line is for pre TMP 1.1
	    }
    }

    /**
     * called when automatic send after booking is activated in settings
     */
    , sendCurrentBookings: function() {
    	// was: DigiWebApp.DashboardController.dataTransfer();
    	DigiWebApp.BookingController.sendBookings();
    }

    /**
     * Determines whether a passed ID represents a hand order or not.
     *
     * @param orderId The id of the order or hand order on which the check should be performed
     */
    , isHandOrder: function(orderId) {
        var handOrder = _.select(DigiWebApp.HandOrder.find(), function(ho) {
            return ho.get('id') == orderId || ho.get('name') == orderId;
        });
        return handOrder.length > 0 ? YES : NO;
    }

    /**
     * Returns the state of the autoTransferAfterBookTime flag in settings
     */
    , autoSend: function() {
        return DigiWebApp.SettingsController.getSetting('autoTransferAfterBookTime');
    }

    /**
     * Returns a new open booking record with the data passed in a parameter object
     * @param obj The parameter object with the data for the booking
     */
    , openBooking: function(obj) {
        return DigiWebApp.Booking.createRecord({
            orderId: obj.oId ? obj.oId : '0',
            handOrderId: obj.hoId ? obj.hoId : '0',
            handOrderName: obj.hoName ? obj.hoName : '0',
            latitude: obj.lat ? obj.lat : '0',
            longitude: obj.lon ? obj.lon : '0',
            positionId: obj.pId ? obj.pId : '0',
            activityId: obj.aId ? obj.aId : '0',
            remark: obj.remark ? obj.remark : '',
            timeStampStart: +new Date(),
            timeStampEnd: '0'
        });
    }

    /**
     * Returns a new open booking record with the data passed in a parameter object
     * @param obj The parameter object with the data for the booking
     */
    , sentBooking: function(obj) {
    	//console.log(obj);
        return DigiWebApp.SentBooking.createRecord({
            orderId: obj.get('orderId'),
            handOrderId: obj.get('handOrderId'),
            handOrderName: obj.get('handOrderName'),
            latitude: obj.get('latitude'),
            longitude: obj.get('longitude'),
            positionId: obj.get('positionId'),
            activityId: obj.get('activityId'),
            remark: obj.get('remark'),
            timeStampStart: obj.get('timeStampStart'),
            timeStampEnd: obj.get('timeStampEnd'),
            isCurrent: false
        });
    }

    /*
    * Prepares an array of not booked bookings for the list view (showing the not send bookings)
    * 
    * Sets the timeData property of this controller, where the list has a content binding on
    *
    */
    , setNotBookedBookings: function() {
        var bookings = DigiWebApp.Booking.find();
        if(bookings.length > 0) {
            _.each(bookings, function(booking) {
                booking.set('date', booking.get('timeStampStart') + ',' + booking.get('timeStampEnd'));

                // set the handOrderId as orderId for correct display in list item view
                if(booking.get('orderId') === "0" && booking.get('handOrderId') !== "0") {
                    booking.set('orderId', booking.get('handOrderId'));
                }

            });
            // newest booking at the top => first sort than reverse order
            bookings = _.sortBy(bookings, function(booking) {
                return parseInt(booking.get('timeStampStart'));
            });
            this.set('timeData', bookings.reverse());
        } else {
            this.set('timeData', []);
        }
        //this.setTimeDataForRemark();	
        DigiWebApp.BookingController.setBookedBookings();
    }

    /*
    * Prepares an array of booked bookings for the list view (showing the sent bookings)
    * 
    * Sets the timeDataSent property of this controller, where the list has a content binding on
    *
    */
    , setBookedBookings: function() {
        var bookings = DigiWebApp.SentBooking.find();
        if(bookings.length > 0) {
            _.each(bookings, function(booking) {
                booking.set('date', booking.get('timeStampStart') + ',' + booking.get('timeStampEnd'));

                // set the handOrderId as orderId for correct display in list item view
                if(booking.get('orderId') === "0" && booking.get('handOrderId') !== "0") {
                    booking.set('orderId', booking.get('handOrderId'));
                }

            });
            // newest booking at the top => first sort than reverse order
            bookings = _.sortBy(bookings, function(booking) {
                return parseInt(booking.get('timeStampStart'));
            });
            this.set('timeDataSent', bookings.reverse());
        } else {
            this.set('timeDataSent', []);
        }
        //this.setTimeDataForRemark();	
    }

    , setTimeDataForRemark: function() {
    	if ( DigiWebApp.BookingController.currentBooking === null ) { return; }
        var bookings = [DigiWebApp.BookingController.currentBooking];
        if(bookings.length > 0) {
            _.each(bookings, function(booking) {
                booking.set('date', booking.get('timeStampStart') + ',' + booking.get('timeStampEnd'));
                
                // set the handOrderId as orderId for correct display in list item view
                if(booking.get('orderId') === "0" && booking.get('handOrderId') !== "0") {
                    booking.set('orderId', booking.get('handOrderId'));
                }

            });
            // newest booking at the top => first sort than reverse order
            bookings = _.sortBy(bookings, function(booking) {
                return parseInt(booking.get('timeStampStart'));
            });
            this.set('timeDataForEdit', bookings.reverse());
        } else {
            this.set('timeDataForEdit', []);
        }

    }

    , setTimeDataForEdit: function() {
    	if ( DigiWebApp.EditTimeDataPage.bookingToEdit === null ) { return; }
        var bookings = [DigiWebApp.EditTimeDataPage.bookingToEdit];
        if(bookings.length > 0) {
            _.each(bookings, function(booking) {
                booking.set('date', booking.get('timeStampStart') + ',' + booking.get('timeStampEnd'));
                
                // set the handOrderId as orderId for correct display in list item view
                if(booking.get('orderId') === "0" && booking.get('handOrderId') !== "0") {
                    booking.set('orderId', booking.get('handOrderId'));
                }

            });
            // newest booking at the top => first sort than reverse order
            bookings = _.sortBy(bookings, function(booking) {
                return parseInt(booking.get('timeStampStart'));
            });
            this.set('timeDataForEdit', bookings.reverse());
        } else {
            this.set('timeDataForEdit', []);
        }

    }

    /**
     *  Closes a day ("Feierabend")
     *
     *  1) If an open Booking exists it is closed and not set as current anymore.
     *  2) if no open booking exists, an alert is shown and nothing more is done.
     *
     *  3) The string showing the data of the currentBooking is cleared
     *  4) The selection lists are reset.
     *
     *  5) If autoTransferAfterClosingDay is selected, a data transfer is triggered
     *  6) If not, the employee selection is cleared
     */
    , closeDay: function() {
        if(this.currentBooking) {
	        // Start::Bemerkungsfeld (403)
			if (DigiWebApp.SettingsController.featureAvailable('403')) {
				// if remark-feature active: go to remarkpage
	        	this.refreshCurrentBooking(false);
	        	DigiWebApp.NavigationController.toRemarkPage(function() {
	        		DigiWebApp.NavigationController.backToDashboardPagePOP();
	        		DigiWebApp.BookingController.closeDayWithRemark();           					
	            });
	        } else {
				// else: bookWithRemark
        		DigiWebApp.BookingController.closeDayWithRemark();           					
	        }
	        // End::Bemerkungsfeld
        } else {
    		DigiWebApp.BookingController.closeDayWithRemark();           					
        }
    }
    
    , closeDayWithRemark: function() {
    	var that = DigiWebApp.BookingController;
    	that.getBookingLocation(that.closeDayWithRemarkWithPosition);
    }
            
    , closeDayWithRemarkWithPosition: function(location) {
    	var that = DigiWebApp.BookingController;
        // close current booking
        if(that.currentBooking) {
        	that.currentBooking.closeBooking(location);
        	that.currentBooking.removeAsCurrent();
        	that.currentBooking.save();
        	that.currentBookingClosed = that.currentBooking;
        	that.currentBooking = null;
        } else {
            //M.DialogView.alert({
    		DigiWebApp.ApplicationController.DigiLoaderView.hide();
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('error'),
                message: M.I18N.l('noOpenBookings')
            });
            return;
        }

        that.set('currentBookingStr', '');

        // reset selections to show "Bitte wählen: "
        DigiWebApp.SelectionController.resetSelection();
        DigiWebApp.SelectionController.initSelection();
        DigiWebApp.SelectionController.useSelections = NO;

        if(DigiWebApp.SettingsController.getSetting('autoTransferAfterClosingDay')) {
            DigiWebApp.DashboardController.dataTransfer(YES); // yes means: is closing day
        } else {
            // clear employee selection, but only if not auto data transfer and save it before to have it while sending the data
            localStorage.setItem(DigiWebApp.EmployeeController.empSelectionKeyTmp, localStorage.getItem(DigiWebApp.EmployeeController.empSelectionKey));
            localStorage.removeItem(DigiWebApp.EmployeeController.empSelectionKey);
            // set employee state back
            if(DigiWebApp.EmployeeController.getEmployeeState() == 2) {
                DigiWebApp.EmployeeController.setEmployeeState(1);
            }
            //M.DialogView.alert({
    		DigiWebApp.ApplicationController.DigiLoaderView.hide();
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('closingDaySuccess'),
                message: M.I18N.l('closingDaySuccessWithoutMsg')
            });
        }

    }
    
    , loadSignatures: function(bookings, successCallback) {
    	
		// check for successCallback is a function
		if (typeof successCallback !== "function") {
			console.log("loadSignaturesError: successCallback is not a function");
	        return;
	    };
		
		DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('loadSignatures'));

		var bookingsLength = bookings.length;
    	var bookingsIndex = 0;
    	
    	if (bookingsLength !== 0) { 
	    	_.each(bookings, function(el) {
	    		bookingsIndex = bookingsIndex + 1;
    			console.log('loading signature for booking No. ' + bookingsIndex);
    			if (el.hasFileName()) {
	    			console.log(el.get('fileName'));
					// load signature into el
					el.readFromFile(function(fileContent){
						//console.log("fileContent: " + fileContent);
						if (fileContent && (fileContent !== "")) {
							DigiWebApp.BookingController.propagateBookingWithSignature(bookings, el.m_id, fileContent);
						}
						if ( bookingsIndex === bookingsLength ) {
							// last signature loaded
				    		console.log('last booking done (with file)');
		    				DigiWebApp.ApplicationController.DigiLoaderView.hide();
							successCallback();
						}
					});
    			} else {
	    			// this booking has no signature
					if ( bookingsIndex === bookingsLength ) {
						// last signature loaded
			    		console.log('last booking done (no file)');
	    				DigiWebApp.ApplicationController.DigiLoaderView.hide();
						successCallback();
					}
	    		}
	        });
    	} else {
    		console.log('no bookings');
			DigiWebApp.ApplicationController.DigiLoaderView.hide();
			successCallback();
    	}
    }
    
    , propagateBookingWithSignature: function(bookings, id, signature) {
    	_.each(bookings, function(el) {
            if (el.m_id === id) {
            	el.signature = signature;
            }
        });
    }

    /**
     * Calls sendData of DigiWebApp.RequestController.
     * Passes all local available bookings.
     *
     * Success Callback:
     * 1) deletes all bookings, except the current
     * 2) resets the selection lists and sets them to show the current booking data
     * 3) If the method is called in closingDay context, the currentBookingStr is cleared and the employeeSelection cleared
     *
     * Error Callback
     * 1) If it is called in closingDay context, the employeeSelection is cleared.
     * 2) Shows an error alert.
     *
     * @param {Boolean} isClosingDay Flag that determines whether this function is called directly after closing day
     */
    , sendBookings: function(isClosingDay, doSync) {
    	var bookings = DigiWebApp.Booking.find();
    	DigiWebApp.BookingController.loadSignatures(bookings, function() {
    		DigiWebApp.BookingController.sendBookingsWithSignatures(bookings, isClosingDay, doSync);
    	});
    }
    
    , sendBookingsWithSignatures: function(bookings, isClosingDay, doSync) {

        if (typeof(doSync) === "undefined") doSync = false;

        if(bookings.length > 0) {
            DigiWebApp.RequestController.sendData({
                bookings: bookings,
                success: {
                    target: this,
                    action: function() {
            			var CurrentAvailable = false
                        _.each(DigiWebApp.Booking.find(), function(el) {
                            if(el.get('isCurrent')) {
                            	CurrentAvailable = true;
                            }
                        });
            			
            			// no current booking: after closing-time
            			if (!CurrentAvailable) DigiWebApp.SentBooking.deleteAll();
            			
                        _.each(DigiWebApp.Booking.find(), function(el) {
//                          if (DigiWebApp.SettingsController.getSetting('debug')) console.log(el.get('orderId'), 'ist offen?: ', el.get('isCurrent'));
                          if(!el.get('isCurrent')) {
                        	  if (CurrentAvailable) {
                        		  // save booking as sentBooking for later view in sentBookingsListView
                        		  var sentBookingEl = DigiWebApp.BookingController.sentBooking(el);
                            	  sentBookingEl.save();
                        	  }
                              el.del();
                          }
                      });
                        DigiWebApp.SelectionController.resetSelection();
                        if(this.currentBooking) {
                            DigiWebApp.SelectionController.setSelectionByCurrentBooking();
                        } else {
                            DigiWebApp.SelectionController.initSelection();
                        }

                        if(isClosingDay) {
                            this.set('currentBookingStr', '');

                            if(DigiWebApp.EmployeeController.getEmployeeState() == 2) {
                                DigiWebApp.EmployeeController.setEmployeeState(1);
                            }
                            // clear employee selection
                            localStorage.removeItem(DigiWebApp.EmployeeController.empSelectionKey);
                            localStorage.removeItem(DigiWebApp.EmployeeController.empSelectionKeyTmp);
                        }
                        
                    }
                },
                error: {
                    target: this,
                    action: function() {
                		// die Konfiguration konnte nicht gesendet werden
                        /*DigiWebApp.ApplicationController.nativeAlertDialogView({
                            title: M.I18N.l('sendDataFail'),
                            message: M.I18N.l('sendDataFailMsg')
                        });*/
                    }
                }
            }, isClosingDay, doSync); // is closingDay is passed to request controller.sendData to check whether local Storage remove of emp selection tmp shall be proceed
        }
    }

    /**
     * Constructs a string containing the data according to the passed booking object
     * @param {Object} booking The booking for which the string should be created
     */
    , buildBookingStr: function(booking) {
        var bookingStr = '';
/*
        var orderName = '';

        var hoid = booking.get('handOrderId');
        var honame = booking.get('handOrderName');

        if((hoid !== '0' && honame !== '0') && (honame === hoid)) {
            orderName = booking.get('handOrderName');
        } else {
            var orders = _.select(DigiWebApp.Order.find().concat(DigiWebApp.HandOrder.find()), function(o) {
                return (o.get('id') == booking.get('orderId') || o.get('id') == booking.get('handOrderId'));
            });
            if(orders.length > 0) {
                orderName += orders[0].get('name');
            }
        }


        var positions = _.select(DigiWebApp.Position.find(), function(p) {
            return p.get('id') == booking.get('positionId');
        });
        var positionName = '';
        if(positions.length > 0) {
            positionName += positions[0].get('name');
        }

        var activities = _.select(DigiWebApp.Activity.find(), function(a) {
            return a.get('id') == booking.get('activityId');
        });
        var activityName = '';
        if(activities.length > 0) {
            activityName += activities[0].get('name');
        }
*/
        
        bookingStr = M.Date.create(this.currentBooking.get('timeStampStart')).format('dd.mm.yy HH:MM');
        return bookingStr;
        
    }

});
// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: ApplicationController
// ==========================================================================

DigiWebApp.ApplicationController = M.Controller.extend({

	// Namespace for XML-Results in IE
	// gets reset in getOrdersFromRemoteSuccess
	myns: "ax21"
	
	, savedUseTransitions: NO

	, triggerUpdate: NO
	
	, useSplashJustForFade: NO
	
	, makeUnselectable: function(node) {
		return;
	    if (node.nodeType == 1) {
	        node.unselectable = true;
	    }
	    var child = node.firstChild;
	    while (child) {
	    	DigiWebApp.ApplicationController.makeUnselectable(child);
	        child = child.nextSibling;
	    }
	}

	, blackBerryRestart_var: null
	
	, blackBerryRestart: function() {
		//console.log("blackBerryRestart");
		//alert("blackBerryRestart");
		if (DigiWebApp.ApplicationController.blackBerryRestart_var !== null) clearTimeout(DigiWebApp.ApplicationController.blackBerryRestart_var);
		DigiWebApp.app = M.Application.design(DigiWebAppOrdinaryDesign);
		/* now lets render all other pages 
        _.each(M.ViewManager.pageList, function(page) {
        	console.log(page);
        	if (page.html === '') {
        		//page.render();
        	}
        });*/
        
		DigiWebApp.app.main();
		DigiWebApp.ApplicationController.regSecEv(YES);
	}
	
	, nativeAlertDialogView: function (obj) {
		if (M.Environment.getPlatform().substr(0,10) === "BlackBerry") {
			//console.log("falling back to non-native-dialog");
			//return M.DialogView.alert(obj);
		}
		//console.log("using a native-dialog");
		if (typeof(obj.confirmButtonValue) === "undefined") obj.confirmButtonValue = "Ok";
		if (typeof(obj.title) === "undefined") obj.title = "Alert";
		if (typeof(obj.message) === "undefined") obj.message = "";
		var mycallback = function() { return; };
		if (typeof(obj.callbacks) !== "undefined") {
			// we have callbacks
			if(typeof(obj.callbacks.confirm.target) === undefined) {
				// without target
				if (typeof(obj.callbacks.confirm.action) === "function") {
					mycallback = obj.callbacks.confirm.action;
				} else {
					console.error("ERROR: callback without target given but action is not a function!");
				}
			} else if (typeof(obj.callbacks.confirm.target) === "function") {
				// with function-target
				mycallback = obj.callbacks.confirm.target;
			} else {
				// with other target
				if (typeof(obj.callbacks.confirm.action) === "string") {
					mycallback = obj.callbacks.confirm.target[obj.callbacks.confirm.action];
				} else if (typeof(obj.callbacks.confirm.action) === "function") {
					mycallback = obj.callbacks.confirm.action;
				} else {
					console.error("ERROR: action is neither a string nor a function!");
				}
			}
		};
		if (typeof(navigator.notification) === "undefined") {
			M.DialogView.alert(obj);
		} else {
			navigator.notification.alert(
				obj.message,					// message
				function (button) {
					switch(button) {
					case 0:
						mycallback();
						break;
					case '0':
						mycallback();
						break;
					case 1:
						mycallback();
						break;
					case '1':
						mycallback();
						break;
					case obj.confirmButtonValue:
						mycallback();
						break;
					case 'OK':
						mycallback();
						break;
					default:
						alert("ERROR: yet unknown button \"" + button + "\" pressed.");
						return;
					}
					try { $.mobile.fixedToolbars.show(); } catch(e) {}; // this line is for pre TMP 1.1
				}, // callback
				obj.title,						// title
				obj.confirmButtonValue			// buttonLabel
				);
		}
	}    

	, nativeConfirmDialogView: function (obj) {
		if (M.Environment.getPlatform().substr(0,10) === "BlackBerry") {
			//console.log("falling back to non-native-dialog");
			//return M.DialogView.confirm(obj);
		}
		//console.log("using a native-dialog");
		if (typeof(obj.confirmButtonValue) === "undefined") obj.confirmButtonValue = "Ok";
		if (typeof(obj.cancelButtonValue) === "undefined") obj.cancelButtonValue = "Cancel";
		if (typeof(obj.title) === "undefined") obj.title = "Confirm";
		if (typeof(obj.message) === "undefined") obj.message = "";
		if (typeof(navigator.notification) === "undefined") {
			M.DialogView.confirm(obj);
		} else {
			navigator.notification.confirm(
				obj.message,  // message
				function (button) {
					switch(button) {
						case 0:
							obj.callbacks.confirm.action();
							break;
						case 1:
							obj.callbacks.confirm.action();
							break;
						case 2:
							obj.callbacks.cancel.action();
							break;
						case '0':
							obj.callbacks.confirm.action();
							break;
						case '1':
							obj.callbacks.confirm.action();
							break;
						case '2':
							obj.callbacks.cancel.action();
							break;
						case obj.confirmButtonValue:
							obj.callbacks.confirm.action();
							break;
						case obj.cancelButtonValue:
							obj.callbacks.cancel.action();
							break;
						case 'OK':
							obj.callbacks.confirm.action();
							break;
						case 'CANCEL':
							obj.callbacks.cancel.action();
							break;
						default:
							alert("ERROR: yet unknown button \"" + button + "\" pressed.");
							return;
					}
					try { $.mobile.fixedToolbars.show(); } catch(e) {}; // this line is for pre TMP 1.1
				},  // callback to invoke with index of button pressed
				obj.title, // title
				obj.confirmButtonValue + ',' + obj.cancelButtonValue          // buttonLabels
				);
		}
	}
	
	/*
	 * part of ApplicationController
	 */
	, DigiLoaderView: { 
		
		/*
		 *  DigiLoaderView wrapps M.LoaderView to allow only one Loader at a time.
		 *
		 *  It also allows to query if it is visible.
		 *
		 */

		loaderMessage: "loading",

		isVisible: function() { 
			return M.LoaderView.refCount !== 0;
		}, 

		hide: function() {
			this.loaderMessage = "loading"; 
			return M.LoaderView.hide(true);
		},

		show: function(title) {

			if (this.isVisible()) { 
				this.hide(); 
			}
		
			this.loaderMessage = title;

			return M.LoaderView.show(this.loaderMessage);
		}, 
		
		getTitle: function() {
			return this.loaderMessage;
		},

		setTitle: function(title) {
			return this.show(title);
		},
		
		changeTitle: function(title) {
			return this.setTitle(title);

		}

	} // End of DigiLoaderView


    , infoMsg: ''
    
	//, shallTransferBookings: NO

    /*
     * callbackStatus object contains the state of the model
     * useful for checking if application is able to run,
     * used in isReadyToProceed() in this controller.
    */
    , callbackStatus: null

    , storagePrefix: M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX
    
    , clickCounter: 0
    , clickLimit: 9
    
    , skipEvents: false
    
	, regSecEv: function(isFirstLoad) {

		DigiWebApp.ApplicationController.setImageClass();
        
		//$('#' + DigiWebApp.CameraPage.content.imageContainer.imageCanvas.id).bind('mousedown', DigiWebApp.CameraController.paintOnCanvasStartPaint);
		//$('#' + DigiWebApp.CameraPage.content.imageContainer.imageCanvas.id).bind('touchstart', DigiWebApp.CameraController.paintOnCanvasStartPaint);
		//$('#' + DigiWebApp.CameraPage.content.imageContainer.imageCanvas.id).bind('mousedown', DigiWebApp.CameraController.paintOnCanvasStartMove);
		//$('#' + DigiWebApp.CameraPage.content.imageContainer.imageCanvas.id).bind('touchstart', DigiWebApp.CameraController.paintOnCanvasStartMove);

        M.I18N.defaultLanguage = "de_de";

		if(isFirstLoad) {
			
			var that = this;

            var img2 = M.ViewManager.getView('infoPage', 'logo');    // info page logo

            $('#'+ img2.id).bind('touchstart', function(ev) {
//            	ev.preventDefault();
//            	var that = DigiWebApp.ApplicationController;
//                that.clickCounter += 1;
//                if (DigiWebApp.SettingsController.getSetting('debug')) console.log('img2 touchstart clickCounter = ' + that.clickCounter);
//                if(that.clickCounter > that.clickLimit) {
//                    that.showConfirmDialog();
//                }
                that.showConfirmDialog();
                //return false;
            });

            $('#'+ img2.id).bind('mousedown', function(ev) {
//            	ev.preventDefault();
//            	var that = DigiWebApp.ApplicationController;
//                that.clickCounter += 1;
//                if (DigiWebApp.SettingsController.getSetting('debug')) console.log('img2 mousedown clickCounter = ' + that.clickCounter);
//                if(that.clickCounter > that.clickLimit) {
//                    that.showConfirmDialog();
//                }
                that.showConfirmDialog();
                //return false;
            });

//            _.each(DigiWebApp.app.pages, function(myPage) {
//    			try { $('#' + myPage.id).bind('touchstart', function(ev) {
//                	console.log("resetting clickCounter");
//                    that.clickCounter = 0;
//                    //console.log("not starting wipecontroller");
//                    //DigiWebApp.WipeController.regTouchStart(myPage.id, ev);
//                    //return false;
//                    //return true;
//                }); } catch (e) { console.log("error while bind touchstart for " + myPage.id);}
//                try { $('#' + myPage.id).bind('mousedown', function(ev) {
//                	console.log("resetting clickCounter");
//                    that.clickCounter = 0;
//                    //console.log("not starting wipecontroller");
//                    //DigiWebApp.WipeController.regTouchStart(myPage.id, ev);
//                    //return false;
//                    //return true;
//                }); } catch (e) { console.log("error while bind mousedown for " + myPage.id);}
//    			if (typeof(myPage.header) !== "undefined") {
//    				try { $('#'+ myPage.header.id).bind('touchstart', function(ev) {
//    	                that.clickCounter += 1;
//    	                if(that.clickCounter > that.clickLimit) {
//    	                    that.showConfirmDialog();
//    	                }
//    	                //return false;
//    	            }); } catch (e) { console.log("error while bind touchstart for " + myPage.header.id);} 				
//    				try { $('#'+ myPage.header.id).bind('mousedown', function(ev) {
//    	                that.clickCounter += 1;
//    	                if(that.clickCounter > that.clickLimit) {
//    	                    that.showConfirmDialog();
//    	                }
//    	                //return false;
//    	            }); } catch (e) { console.log("error while bind mousedown for " + myPage.header.id);}
//    			}
//    		});

        	if ( M.Environment.getPlatform().substr(0,10) === "BlackBerry" ) {
        		console.log("registering emergencyhandler");
        		$(document).bind('keydown', DigiWebApp.ApplicationController.keydownHandler);
        	}

        }
				
		// no fade-effects on header
		_.each(DigiWebApp.app.pages, function(myPage) {
			if ( typeof(myPage.header) !== "undefined" ) {
				$('#' + myPage.header.id ).removeClass("fade");
			}
		});
		// no fade-effects on footer
		$('[id=' + DigiWebApp.TabBar.id  + ']').each(function() {
			$(this).removeClass("fade");
		});
		
		this.setSkipEvents();

		if (this.skipEvents) {
        	// i guess we are not on a mobile device --> no deviceready-event
        	this.devicereadyhandler();
        } else {
        	if (typeof(device) === "undefined") { 
	        	// register device-events and wait for those events to fire
        		DigiWebApp.ApplicationController.timeoutdeviceready_var = setTimeout("DigiWebApp.ApplicationController.timeoutdevicereadyhandler()",8000);
        		//document.addEventListener("deviceready", DigiWebApp.ApplicationController.devicereadyhandler, false);
        		$(document).bind('deviceready', DigiWebApp.ApplicationController.devicereadyhandler);
        	} else {
        		DigiWebApp.ApplicationController.devicereadyhandler();
        	}
        }

    }

    , setSkipEvents: function() {
        /*
         * Platfroms in the wild:
         * 		"BlackBerry"
         * 		"iPad"
         * 		"Linux armv5tejl" (Android 2.3.3 Emulator)
         * 		"Linux armv7l" (Samsung Galaxy Xcover, Probleme mit GPS (POSITION_UNAVAILABLE trotz aktiviertem GPS-Sensor))
         * 		"Linux armv7l" (Samsung Galaxy S2)
         * 		"Linux armv7l" (HTC Desire)
         */
		//alert("Platform: \"" + M.Environment.getPlatform() + "\"");
    	var myPlattform = M.Environment.getPlatform();
        if (       ( myPlattform.substr(-2)  === "86" )
        		|| ( myPlattform.substr(-5)  === "Win32" )
        		|| ( myPlattform.substr(-5)  === "Win64" )
        		|| ( myPlattform.substr(0,3) === "Mac" )
        		|| ( myPlattform.substr(0,10) === "BlackBerry")
        	) {
        	this.skipEvents = true;
        } else {
        	this.skipEvents = false;
        }

        // using timeout-detection
        this.skipEvents = false;
    }
	
    , sizeMode: null
    
    , checkSizeModeChange: function() {
    	//console.log("checkSizeModeChange");
    	//console.log("this.sizeMode: " + this.sizeMode);
    	//console.log("this.timeouthappened:" + this.timeouthappened);
    	if (this.sizeMode === null || this.timeouthappened) {
        	//console.log("do checkSizeModeChange");
			switch(true) {
				case(                          $(window).width()<=320):
					if (this.sizeMode !== "w320") {
						this.sizeMode = "w320";
						return true;
					} else {
						return false;
					}
					break;
				case($(window).width()>320  && $(window).width()<=480):
					if (this.sizeMode !== "w480") {
						this.sizeMode = "w480";
						return true;
					} else {
						return false;
					}
					break;
				case($(window).width()>480  && $(window).width()<=640):
					if (this.sizeMode !== "w640") {
						this.sizeMode = "w640";
						return true;
					} else {
						return false;
					}
					break;
				case($(window).width()>640  && $(window).width()<=1024):
					if (this.sizeMode !== "w1024") {
						this.sizeMode = "w1024";
						return true;
					} else {
						return false;
					}
					break;
				case($(window).width()>1024 && $(window).width()<=1536):
					if (this.sizeMode !== "w1536") {
						this.sizeMode = "w1536";
						return true;
					} else {
						return false;
					}
					break;
				default:
					if (this.sizeMode !== "w1536") {
						this.sizeMode = "w1536";
						return true;
					} else {
						return false;
					}
					break;
			}
    	} else {
    		return false;
    	}
    }
    
    , setImageClass: function () {
    	var disableOnBlackBerry = true;
    	if ((M.Environment.getPlatform().substr(0,10) === "BlackBerry") && (disableOnBlackBerry)) {
    		console.log("We are on BlackBerry, so we skip dynamic Background!");
    	} else {
    		if (this.checkSizeModeChange()) {
    	    	//console.log("setting new imageClass");
		    	//console.log("window.width: " + $(window).width());
		        _.each(DigiWebApp.app.pages, function(myPage) {
		        	if ($('#' + myPage.id).get("0").classList) {
	    				if (!$('#' + myPage.id).get("0").classList.contains(DigiWebApp.ApplicationController.sizeMode)) {
	    					$('#' + myPage.id).removeClass("w320").removeClass("w480").removeClass("w640").removeClass("w1024").removeClass("w1536");
	        				$('#' + myPage.id).addClass(DigiWebApp.ApplicationController.sizeMode);	        					
	    				}
		        	}
		        });
    		}
    	}
	}

	, timeoutdeviceready_var: null
	, timeouthappened: false
	
	, timeoutdevicereadyhandler: function() {
		if (DigiWebApp.ApplicationController.timeoutdeviceready_var !== null) clearTimeout(DigiWebApp.ApplicationController.timeoutdeviceready_var);
		DigiWebApp.ApplicationController.timeouthappened = true;
        /*DigiWebApp.ApplicationController.nativeAlertDialogView({
            title: 'DIGI-WebApp hat Plattform<br/>"' + M.Environment.getPlatform() + ' ohne Eventhandler" erkannt.',
            message: navigator.userAgent
        });*/
        console.log("DIGI-WebApp hat Plattform \"" + M.Environment.getPlatform() + "\" (" + navigator.userAgent + ") erkannt. Es werden keine Eventhandler registriert! (Version " + M.Application.getConfig('version') + ")");
        this.skipEvents = true;
		this.devicereadyhandler();
	}
	
	, emergencyCode: "007RESET007"
	, emergencyStartedTimestamp: null
	, emergencyStringEntered: ''
	
	, keydownHandler: function(event) {
		/*if ( event.which == 13 ) {
		     event.preventDefault();
		}*/
		//console.log(event.which);
		if (event.timeStamp - DigiWebApp.ApplicationController.emergencyStartedTimestamp > 20000) {
			console.log("timeout: reset emergency-mechanism");
			DigiWebApp.ApplicationController.emergencyStartedTimestamp = event.timeStamp;
			DigiWebApp.ApplicationController.emergencyStringEntered = "";
		}
		var pos = DigiWebApp.ApplicationController.emergencyStringEntered.length;
		var whichKey = String.fromCharCode(event.which).toUpperCase();
		if (whichKey === DigiWebApp.ApplicationController.emergencyCode.substr(pos,1)) {
			DigiWebApp.ApplicationController.emergencyStringEntered = DigiWebApp.ApplicationController.emergencyStringEntered + whichKey;
		} else {
			//console.log("wrong key pressed: reset emergency-mechanism");
			DigiWebApp.ApplicationController.emergencyStartedTimestamp = event.timeStamp;
			DigiWebApp.ApplicationController.emergencyStringEntered = "";
			return true;
		}
		if (DigiWebApp.ApplicationController.emergencyStringEntered === DigiWebApp.ApplicationController.emergencyCode) {
			DigiWebApp.ApplicationController.emergencyStartedTimestamp = event.timeStamp;
			DigiWebApp.ApplicationController.emergencyStringEntered = "";
			DigiWebApp.ApplicationController.showConfirmDialog();
		}
		return true;
	}
	
	, devicereadyhandler: function() {
		
		try {
		
			DigiWebApp.ApplicationController.DigiLoaderView.hide();
			
			if ( M.Environment.getPlatform().substr(0,10) === "BlackBerry" ) {
	    		// unfix header
				_.each(DigiWebApp.app.pages, function(myPage) {
					if ( typeof(myPage.header) !== "undefined" ) {
						$('#' + myPage.header.id ).removeClass("ui-header-fixed");
					}
				});
	    		// unfix footer
	    		$('[id=' + DigiWebApp.TabBar.id  + ']').each(function() {
					$(this).removeClass("ui-footer-fixed");
				});
	    		//$(document).keydown(DigiWebApp.ApplicationController.keypressedHandler);
			}
	    	
	    	if (DigiWebApp.ApplicationController.timeoutdeviceready_var !== null) clearTimeout(DigiWebApp.ApplicationController.timeoutdeviceready_var);
			
	    	DigiWebApp.ApplicationController.setImageClass();
	
	    	$(window).resize(function() {
	    		DigiWebApp.ApplicationController.setImageClass();
	    	});
	
	    	console.log("DIGI-WebApp running on platform: " + M.Environment.getPlatform());
	        
	    	DigiWebApp.ApplicationController.init(true);
		
	        if ((this.skipEvents !== true) || (( M.Environment.getPlatform().substr(0,10) === "BlackBerry") && (DigiWebApp.ApplicationController.timeouthappened !== true))) {
	        	//document.addEventListener("backbutton", DigiWebApp.ApplicationController.backbuttonhandler, false);
	        	$(document).bind('backbutton', DigiWebApp.ApplicationController.backbuttonhandler);
	        	//document.addEventListener("menubutton", DigiWebApp.ApplicationController.menubuttonhandler, false);
	        	$(document).bind('menubutton', DigiWebApp.ApplicationController.menubuttonhandler);
	        	// just in case again in 10 seconds via timeout (just for BlackBerry)
	        	//DigiWebApp.ApplicationController.registerButtonHandlerByTimeoutVar = setTimeout("DigiWebApp.ApplicationController.registerButtonHandlerByTimeout()",10000);
	        } else {
	        	console.log("skipping eventhandlerregistration for back- and menubutton (" + this.skipEvents + ")");
	        }
	        
			document.addEventListener("pause", DigiWebApp.ApplicationController.closeChildbrowser, false);

		} catch(e) {
			trackError(e);
		}
	}
	
	, closeChildbrowser: function() {
		//alert("pause");
		try {
			plugins.childBrowser.close();
		} catch(e) {
			console.log(e);
		}
	}
       
    , backButtonTimeoutVar: null
    
    , backbuttonhandler: function() {
    	var ChefToolOnly = (DigiWebApp.SettingsController.featureAvailable('409'));
		if ((!DigiWebApp.SettingsController.showCredentialsAlert) && !ChefToolOnly) {
	    	if (DigiWebApp.TabBar.tabItem1.isActive) {
	   
	    		if ( typeof(navigator.app) !== "undefined" ) {
	        		DigiWebApp.ApplicationController.nativeConfirmDialogView({
		            	title: M.I18N.l('quitQuestion'),
	    		        message: M.I18N.l('quitQuestionMsg'),
			            confirmButtonValue: M.I18N.l('yes'),
	            		cancelButtonValue: M.I18N.l('no'),
	            		callbacks: {
	                		confirm: {
	                    		target: this,
	                    		action: function() {
				                        	navigator.app.exitApp();
	                    				}
	                			},
	                		cancel: {
	                    		target: this,
	                    		action: function() {
	                        				return;
	                    				}
	                		}
	            		}
	        		});
	
	    		}
	    		
	    	} else {
	    		// catch double-fire of backbutton-event via timeout
	    		DigiWebApp.ApplicationController.backButtonTimeoutVar = setTimeout("DigiWebApp.ApplicationController.backButtonToBookTimePage()",500);
	    		//DigiWebApp.NavigationController.toBookTimePage();
			}
		}
    }
    
    , registerButtonHandlerByTimeoutVar: null
    
    , registerButtonHandlerByTimeout: function() {
    	if (( M.Environment.getPlatform().substr(0,10) === "BlackBerry") && (DigiWebApp.ApplicationController.timeouthappened !== true)) {
    		console.log("registering buttonhandler again on blackberry");
        	$(document).bind('backbutton', DigiWebApp.ApplicationController.backbuttonhandler);
        	$(document).bind('menubutton', DigiWebApp.ApplicationController.menubuttonhandler);
    	}
    	clearTimeout(DigiWebApp.ApplicationController.registerButtonHandlerByTimeoutVar);
    }
    
    , backButtonToBookTimePage: function() {
    	clearTimeout(DigiWebApp.ApplicationController.backButtonTimeoutVar);
    	DigiWebApp.NavigationController.toBookTimePageFlipTransition();
    }

    , menubuttonhandler: function() {
		if (!DigiWebApp.SettingsController.showCredentialsAlert) {
			DigiWebApp.NavigationController.backToDashboardPageFlipTransition();
		}
    }
    
    , showConfirmDialog: function() {
    	var that = this;
        //M.DialogView.confirm({
        DigiWebApp.ApplicationController.nativeConfirmDialogView({
            title: M.I18N.l('secretQuestion'),
            message: M.I18N.l('secretQuestionMsg'),
            confirmButtonValue: M.I18N.l('yes'),
            cancelButtonValue: M.I18N.l('no'),
            callbacks: {
                confirm: {
                    target: this,
                    action: function() {
                        // only clears entries of the app
                        // (with prefix: M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX)
        				DigiWebApp.SettingsController.credentialsAlertShown = false;
                        DigiWebApp.Booking.deleteAll();
                        DigiWebApp.MediaFile.deleteAll();
                        localStorage.clear('f');
                    	DigiWebApp.BookingController.currentBooking = null;
                    	$('#' + DigiWebApp.BookingPage.content.currentBookingLabel.id).html("");
                        // reset app by setting location new => like web page reload
                        //location.href = location.protocol + '//' + location.host + location.pathname;
                    	DigiWebApp.SettingsController.showIOSMessage = false;
                        DigiWebApp.ApplicationController.init(true);
                    }
                },
                cancel: {
                    target: this,
                    action: function() {
                    	that.clickCounter = 0;
                    }
                }
            }
        });
    }

    , setTransitionsSetting: function() {
        /*
         * Platfroms in the wild:
         * 		"BlackBerry"
         * 		"iPad"
         * 		"Linux armv5tejl" (Android 2.3.3 Emulator)
         * 		"Linux armv7l" (Samsung Galaxy Xcover, Probleme mit GPS (POSITION_UNAVAILABLE trotz aktiviertem GPS-Sensor))
         * 		"Linux armv7l" (Samsung Galaxy S2)
         * 		"Linux armv7l" (HTC Desire)
         */
    	var deviceversion = "0";
    	if (typeof(device) !== "undefined") deviceversion = new String(device.version);

    	var deviceplatform = "";
    	if (typeof(device) !== "undefined") deviceplatform = new String(device.platform);

    	var myPlatform = M.Environment.getPlatform();
        if (       ( myPlatform.substr(-2)  === "86" )
        		|| ( myPlatform.substr(-5)  === "Win32" )
        		|| ( myPlatform.substr(-5)  === "Win64" )
        		|| ( myPlatform.substr(0,3) === "Mac" )
        		|| ( myPlatform.substr(0,6) === "iPhone")
        		|| ( myPlatform.substr(0,4) === "iPad")
        		|| ( ( deviceversion.substr(0,1) >= 4 ) && ( deviceplatform.substr(0,7) >= "Android" ) )
        	) {
            M.Application.config.useTransitions = DigiWebApp.SettingsController.getSetting('useTransitionsSetting');
            //M.Application.config.useTransitions = NO; // transitions are ugly in jquery 1.1.0
        } else {
            M.Application.config.useTransitions = NO;
        }
    }
    
    /**
     * init is called by the pageshow event defined in DigiWebApp.SplashViewPage.
     * It initializes the callbackStatus object and the application's settings.
     * After that it reads the company and password setting. If they are not defined, an alert appears, indicating that
     * no credentials are entered and the app redirects to the settings page.
     * If credentials are entered, the data receiving process is started by calling
     * authenticate of this controller.
     *
     *
     * @param isFirstLoad is passed if this function is used in a page event like pageshow => determines that the page is loaded for the very
     * first time during this application life cycle
     */
    , init: function(isFirstLoad) {
    	DigiWebApp.TabBar.tabItem1.internalEvents.tap.action = function () {
    		//console.log("tabItem1");
            if(this.page) {
                M.Controller.switchToTab(this,YES);
            } else {
                this.parentView.setActiveTab(this);
            }
        };
    	DigiWebApp.TabBar.tabItem2.internalEvents.tap.action = function () {
    		//console.log("tabItem2");
            if(this.page) {
                M.Controller.switchToTab(this,NO);
            } else {
                this.parentView.setActiveTab(this);
            }
        };
        /*
        $('#' + DigiWebApp.app.pages.bookingPage.id).touchwipe({
            wipeLeft: function() { alert("bookingPageleft"); },
            wipeRight: function() { alert("bookingPageright"); },
            wipeUp: function() { alert("bookingPageup"); },
            wipeDown: function() { alert("bookingPagedown"); },
            min_move_x: 100,
            min_move_y: 100,
            preventDefaultEvents: true
       });
        $('#' + DigiWebApp.app.pages.dashboard.id).touchwipe({
            wipeLeft: function() { alert("dashboardleft"); },
            wipeRight: function() { alert("dashboardright"); },
            wipeUp: function() { alert("dashboardup"); },
            wipeDown: function() { alert("dashboarddown"); },
            min_move_x: 100,
            min_move_y: 100,
            preventDefaultEvents: true
       });
       */
       //console.log("ApplicationController.init at timestamp " + M.Date.now().date.valueOf());
        this.callbackStatus = {
            position: {
                remote: NO,
                local: NO
            },
            activity: {
                remote: NO,
                local: NO
            },
            order: {
                remote: NO,
                local: NO
            },
            workPlan: {
                remote: NO,
                local: NO
            },
            handOrder: {
                remote: NO,
                local: NO
            },
            kolonne: {
                remote: NO,
                local: NO
            },
            features: {
                remote: NO,
                local: NO
            }
        };

/*
        DigiWebApp.ApplicationController.nativeAlertDialogView({
            title: 'Info',
            message: 'init Settings',
            callbacks: {
                confirm: {
                    target: this,
                    action: function () {
                    	return;
                    }
                }
            }
        });*/
        		
        // set settings
        DigiWebApp.SettingsController.init();
        
        //if (DigiWebApp.SettingsController.getSetting('debug')) { alert("DIGI-WebApp is in DebugMode!"); }
        
        DigiWebApp.ApplicationController.setTransitionsSetting();
        
        //if (DigiWebApp.SettingsController.getSetting('debug')) console.log("nach init settings");
        
        // gibt es eine offene Buchung?
        /* 
        */

        var bookings = DigiWebApp.Booking.find();
        if(bookings.length > 0) {
            var isCurrentBookingAvailable = NO;
            for(var i = 0; i < bookings.length; i++) {
            	if (DigiWebApp.SettingsController.getSetting('debug')) console.log('booking[' + i + '].isCurrent = ' + bookings[i].get('isCurrent'));
                if(bookings[i].get('isCurrent') === YES) {
                	if (DigiWebApp.SettingsController.getSetting('debug')) console.log('isCurrentBookingAvailable --> YES');
                	isCurrentBookingAvailable = YES;
                    break;
                }
            }
            if (DigiWebApp.SettingsController.getSetting('debug')) console.log('isCurrentBookingAvailable = ' + isCurrentBookingAvailable);
            if(isCurrentBookingAvailable === YES) {
            	DigiWebApp.NavigationController.toBookTimePage();
                return;
            }
        }

		this.startsync();
        
    }
    
    , enforceChefToolOnly: function() {
    	var hideOverride = (DigiWebApp.SettingsController.showCredentialsAlert);
    	console.log("enforcing ChefToolOnly, hideOverride=" + hideOverride);
    	var ChefToolOnly = (DigiWebApp.SettingsController.featureAvailable('409'));
		if (ChefToolOnly || hideOverride) {
	    	console.log("enforcing ChefToolOnly, HIDE");
	    	// hide tabbar
			$('[id=' + DigiWebApp.TabBar.id  + ']').each(function() { $(this).hide(); });
			// hide checkboxes in settings
			$('[id=' + DigiWebApp.SettingsPage.content.autoTransferAfterBookTimeCheck.id  + ']').each(function() { $(this).hide(); });
			$('[id=' + DigiWebApp.SettingsPage.content.autoTransferAfterClosingDayCheck.id  + ']').each(function() { $(this).hide(); });
			$('[id=' + DigiWebApp.SettingsPage.content.autoSyncAfterBookTimeCheck.id  + ']').each(function() { $(this).hide(); });
			$('[id=' + DigiWebApp.SettingsPage.content.remarkIsMandatory.id  + ']').each(function() { $(this).hide(); });
			$('[id=' + DigiWebApp.SettingsPage.content.autoSaveGPSData.id  + ']').each(function() { $(this).hide(); });
		} else {
	    	console.log("enforcing ChefToolOnly, SHOW");
	    	// show tabbar
			$('[id=' + DigiWebApp.TabBar.id  + ']').each(function() { $(this).show(); });
			// show checkboxes in settings
			$('[id=' + DigiWebApp.SettingsPage.content.autoTransferAfterBookTimeCheck.id  + ']').each(function() { $(this).show(); });
			$('[id=' + DigiWebApp.SettingsPage.content.autoTransferAfterClosingDayCheck.id  + ']').each(function() { $(this).show(); });
			$('[id=' + DigiWebApp.SettingsPage.content.autoSyncAfterBookTimeCheck.id  + ']').each(function() { $(this).show(); });
			$('[id=' + DigiWebApp.SettingsPage.content.remarkIsMandatory.id  + ']').each(function() { $(this).show(); });
			$('[id=' + DigiWebApp.SettingsPage.content.autoSaveGPSData.id  + ']').each(function() { $(this).show(); });
		}
		

    }
    
    , startsync: function(isFirstLoad) {

    	// authentication data
        var company = DigiWebApp.SettingsController.getSetting('company');
        var password = DigiWebApp.SettingsController.getSetting('password');

		if(!company || !password) {
            DigiWebApp.NavigationController.toBookTimePage(YES);
            DigiWebApp.SettingsController.showCredentialsAlert = YES;
            DigiWebApp.NavigationController.toSettingsPage(YES);
            return;
        }

        M.Application.config.useTransitions = NO;
        DigiWebApp.NavigationController.toDashboardPageFlipTransition(YES);
        // sendConfiguration => authenticate => getOrders => getPositions => getActivities => proceed to next page.
        DigiWebApp.SettingsController.sendConfiguration();
        
        // authenticate => getOrders => getPositions => getActivities => proceed to next page.
        //this.authenticate(); // --> moved to DigiWebApp.RequestController.sendConfiguration()
    	
    }
    
    /**
     * Simply displays an alert dialog indicating an connection error.
     * The button of the dialog is linked to the proceedWithLocalData function of this controller.
     * That means, when a connection error during data retrieval appears, the app proceeds with local data (if possible).
     */
    , connectionError: function() {
    	//DialogView.alert with action
        //M.DialogView.alert({
        DigiWebApp.ApplicationController.nativeAlertDialogView({
            title: M.I18N.l('connectionError'),
            message: M.I18N.l('connectionErrorMsg'),
            callbacks: {
                confirm: {
                    target: this,
                    action: 'proceedWithLocalData'
                }
            }
        });
    }

    /**
     * Checks whether it is possible to work with local data.
     * Possible if Orders, Positions and Activities are available locally.
     *
     * Navigates to booking page if it is possible and displays an alert dialog showing the user
     * that the app is working with offline data.
     *
     * Otherwise it displays an alert dialog showing that offline work is not possible
     */
    , proceedWithLocalData: function(fromwhere) {

		var that = DigiWebApp.ApplicationController;

		that.enforceChefToolOnly();
    	var ChefToolOnly = (DigiWebApp.SettingsController.featureAvailable('409'));    	
    	if (!ChefToolOnly) {

	        // check order
	        if(DigiWebApp.Order.find().length > 0) {
	            that.setCallbackStatus('order', 'local', YES);
	        }
	        
	        // check positions
	        if(DigiWebApp.Position.find().length > 0) {
	            that.setCallbackStatus('position', 'local', YES);
	        }
	        
	        // check activities
	        if(DigiWebApp.Activity.find().length > 0) {
	            that.setCallbackStatus('activity', 'local', YES);
	        }
	        
	        // check features
	        if(DigiWebApp.Features.find().length > 0) {
	            that.setCallbackStatus('features', 'local', YES);
	        }
	
	        if (DigiWebApp.SettingsController.getSetting('debug')) {
	            DigiWebApp.ApplicationController.nativeAlertDialogView({
	                title: M.I18N.l('offlineWork'),
	                message: fromwhere
	            });
	        }
	        
	        if(that.isReadyToProceed()) {
	            DigiWebApp.NavigationController.toBookTimePage(YES);
	
	            //M.DialogView.alert({
	            DigiWebApp.ApplicationController.nativeAlertDialogView({
	                title: M.I18N.l('offlineWork'),
	                message: M.I18N.l('offlineWorkMsg')
	            });
	        } else {
	            DigiWebApp.NavigationController.toDashboardPage();
	            
	            //M.DialogView.alert({
	            DigiWebApp.ApplicationController.nativeAlertDialogView({
	                title: M.I18N.l('offlineWorkNotPossible'),
	                message: M.I18N.l('offlineWorkNotPossibleMsg')
	            });
	        }
    	} else {
            DigiWebApp.NavigationController.toDashboardPage();
    	}
    }


    /**
     * Routes to authenticate function of the DigiWebApp.RequestController.
     * Success callback calls authenticateSuccess of this controller.
     * Error callback calls proceedWithLocalData to check whether offline work is possible.
     */
    , authenticate: function() {
		
    	DigiWebApp.RequestController.authenticate({
            success: {
                target: this,
                action: 'authenticateSuccess'
            },
            error: {
                target: this,
                action: function(e) {
            		console.log("authenticate-error: " + e);
        			this.proceedWithLocalData("authenticate");
                }
            }
        });

    }
    
    /**
     *
     * The success callback for authenticate.
     * Dispatches between different return codes inside the server response.
     * 1: successful login
     * 2: invalid device id
     * 3: company id or password invalid
     *
     * when 1 is returned by the server, the order request is started
     * otherwise alert according to the kind of authentication error are shown and the view is switched
     * to the settings page to let the user adjust the credentials.
     *
     * @param data The returned data of the server in JSON, means JS object.
     * @param msg 
     * @param xhr The XMLHTTPRequest object.
     */
    , authenticateSuccess: function(data, msg, xhr) {

    	if ( typeof(data['return']) === "undefined" && typeof(data['ns:return']) !== "undefined" ) data['return'] = data['ns:return'];
        
    	switch(data['return']) {
            case '1':
                // Clear features from storage
                DigiWebApp.Features.deleteAll();
                this.setCallbackStatus('features', 'local', NO);
                DigiWebApp.ApplicationController.triggerUpdate = YES;
                DigiWebApp.DashboardController.init(YES);
                DigiWebApp.MediaListController.init(YES);
        		this.getFeaturesFromRemote();        		
                DigiWebApp.ApplicationController.enforceChefToolOnly();
        		break;
            
            case '2':
                //M.DialogView.alert({
                DigiWebApp.ApplicationController.nativeAlertDialogView({
                    title: M.I18N.l('authenticationError2'),
                    message: M.I18N.l('authenticationErrorMsg2')
                });
                DigiWebApp.NavigationController.toSettingsPage(YES);
                break;

            case '3':
                //M.DialogView.alert({
                DigiWebApp.ApplicationController.nativeAlertDialogView({
                    title: M.I18N.l('authenticationError3'),
                    message: M.I18N.l('authenticationErrorMsg3')
                });
                DigiWebApp.NavigationController.toSettingsPage(YES);
                break;

            default:
                //M.DialogView.alert({
                DigiWebApp.ApplicationController.nativeAlertDialogView({
                    title: M.I18N.l('authenticationError'),
                    message: M.I18N.l('authenticationErrorMsg')
                });
                DigiWebApp.NavigationController.toSettingsPage(YES);
                break;
        }
    }

    /**
     * Calls getOrders on DigiWebApp.RequestController.
     * Success callback calls proceeds received orders and afterwards starts retrieving positions.
     * Error callback calls proceedWithLocalData to check whether offline work is possible.
     */
    , getOrdersFromRemote: function() {

        DigiWebApp.RequestController.getOrders({
            success: {
                target: this,
                action: function(data, msg, xhr) {
                    if (this.getOrdersFromRemoteSuccess(data, msg, xhr) === true) {
                    	// get data sequentially
                    	this.getPositionsFromRemote();
                    } else {
                		//M.DialogView.alert({
                		DigiWebApp.ApplicationController.nativeAlertDialogView({
                			title: M.I18N.l('noOrdersAvailable'),
                			message: M.I18N.l('noOrdersAvailableMsg')
                		});
                		//DigiWebApp.NavigationController.toSettingsPage(YES);
                    }
                }
            },
            error: {
                target: this,
                action: function() {
        		console.log("getOrdersFromRemote-error");
                    this.proceedWithLocalData("getOrdersFromRemote");
                }
            }
        });
    }

    /**
     * The success callback for getOrdersFromRemote.
     * If correct data is in response the following is done:
     * 1) the callback status for 'order' and 'remote' is set (means orders are correctly returned by server)
     * 2) the local available orders are deleted, the corresponding callback status is set
     * 3) orders, received from remote service, are saved in localstorage again and the corresponding status is set to YES
     *
     * @param data The returned data of the server in JSON, means JS object.
     * @param msg
     * @param xhr The XMLHTTPRequest object.
     */
    , getOrdersFromRemoteSuccess: function(data, msg, xhr) {
            	
   		if ( typeof(data['return']) === "undefined" && typeof(data['ns:return']) !== "undefined" ) {
    		data['return'] = data['ns:return'];
    		try {
    			this.myns = data['return'][0]['xsi:type'].split(":")[0];
    			var myns = this.myns;
    			 _.each(data['return'], function(el) {
    				 el.auftragsId = el[myns + ':auftragsId'];
    				 el.auftragsBezeichnung = el[myns + ':auftragsBezeichnung'];
    			 });
    		} catch(e) {
    		}
    	}

    	if(data['return']) {
            this.setCallbackStatus('order', 'remote', YES);

            // Clear orders from storages
            DigiWebApp.Order.deleteAll();
            this.setCallbackStatus('order', 'local', NO);
            var mIdArray = [];
            var rec = null;

            if(_.isObject(data['return']) && !_.isArray(data['return'])) {
                data['return'] = [data['return']];
            }

            // create a record for each order returned from the server and save it
            _.each(data['return'], function(el) {
                rec = DigiWebApp.Order.createRecord({
                    id: el.auftragsId,
                    name: el.auftragsBezeichnung
                });
                try {
                    rec.save();
                    mIdArray.push(rec.m_id);
                } catch(e) {
                    // maybe do something here
                	console.log("ERROR in " + this.name + ".getOrdersFromRemoteSuccess: " + e);
                }
            });

            localStorage.setItem(this.storagePrefix + '_orderKeys', JSON.stringify(mIdArray));

            this.setCallbackStatus('order', 'local', YES);

            return true;

        } else {

    		return false;
        }


    }

    /**
     * Calls getPositions on DigiWebApp.RequestController.
     * Success callback calls proceeds received positions and afterwards starts retrieving activities.
     * Error callback calls proceedWithLocalData to check whether offline work is possible.
     */
    , getPositionsFromRemote: function() {
        DigiWebApp.RequestController.getPositions({
            success: {
                target: this,
                action: function(data, msg, xhr) {
                    this.getPositionsFromRemoteSuccess(data, msg, xhr);
                    this.getActivitiesFromRemote();
                }
            },
            error: {
                target: this,
                action: function() {
            		console.log("getPositionsFromRemote-error");
            		this.proceedWithLocalData("getPositionsFromRemote");
                }
            }
        });
    }

    /**
     * The success callback for getPositionsFromRemote.
     * If correct data is in response the following is done:
     * 1) the callback status for 'position' and 'remote' is set (means positions are correctly returned by server)
     * 2) the local available positions are deleted, the corresponding callback status is set
     * 3) positions, received from remote service, are saved in localstorage again and the corresponding status is set to YES
     *
     * @param data The returned data of the server in JSON, means JS object.
     * @param msg
     * @param xhr The XMLHTTPRequest object.
     */
    , getPositionsFromRemoteSuccess: function(data, msg, xhr) {

   		if ( typeof(data['return']) === "undefined" && typeof(data['ns:return']) !== "undefined" ) {
    		data['return'] = data['ns:return'];
    		try {
    			//myns = data['return'][0]['xsi:type'].split(":")[0];
    			var myns = this.myns;
    			 _.each(data['return'], function(el) {

    				 el.positionsId = el[myns + ':positionsId'];
    				 el.positionsBezeichnung = el[myns + ':positionsBezeichnung'];
    				 el.auftragsId = el[myns + ':auftragsId'];

    				 el.positionHausnummer = el[myns + ':positionHausnummer'];
    				 el.positionPlz = el[myns + ':positionPlz'];
    				 el.positionOrt = el[myns + ':positionOrt'];
    				 el.positionLand = el[myns + ':positionZusatz'];
    				 el.positionLongitude = el[myns + ':positionLongitude'];
    				 el.positionLatitude = el[myns + ':positionLatitude'];
    				 el.positionBeschreibung = el[myns + ':positionBeschreibung'];
    				 el.positionTelefon = el[myns + ':positionTelefon'];

    			 });
    		} catch(e) {
    		}
    	}
   		 
    	if(data['return']) {
            this.setCallbackStatus('position', 'remote', YES);

            // Clear positions from storage
            DigiWebApp.Position.deleteAll();
            this.setCallbackStatus('position', 'local', NO);

            var mIdArray = [];
            var rec = null;


            if(_.isObject(data['return']) && !_.isArray(data['return'])) {
                data['return'] = [data['return']];
            }

            // create a record for each position returned from the server and save it
            _.each(data['return'], function(el) {
            	            	
            	var posid = el.positionsId;
                var posname = el.positionsBezeichnung;
                var posstrasse = el.positionStrasse;
                var poshausnummer = el.positionHausnummer;
                var posplz = el.positionPlz;
                var posort = el.positionOrt;
                var posland = el.positionZusatz;
                var poscountrycode = el.positionLand;
                var posphone = el.positionTelefon;
                var posfax = el.positionFax;
                var posemail = el.positionEmail;
                var posansprechpartner = el.positionAnsprechpartner;
                var poskundenname = el.positionKundenname;
                var poslongitude = el.positionLongitude;
                var poslatitude = el.positionLatitude;
                var posdescription = el.positionBeschreibung;
                var posorderId = el.auftragsId;
                
            	if (typeof(posid) === "object") { posid = ""; } 
            	if (typeof(posname) === "object") { posname = ""; } 
            	if (typeof(posstrasse) === "object") { posstrasse = ""; } 
            	if (typeof(poshausnummer) === "object") { poshausnummer = ""; } 
            	if (typeof(posplz) === "object") { posplz = ""; } 
            	if (typeof(posort) === "object") { posort = ""; } 
            	if (typeof(posland) === "object") { posland = ""; } 
            	if (typeof(poscountrycode) === "object") { poscountrycode = ""; } 
            	if (typeof(posphone) === "object") { posphone = ""; } 
            	if (typeof(posfax) === "object") { posfax = ""; } 
            	if (typeof(posemail) === "object") { posemail = ""; } 
            	if (typeof(posansprechpartner) === "object") { posansprechpartner = ""; } 
            	if (typeof(poskundenname) === "object") { poskundenname = ""; } 
            	if (typeof(poslongitude) === "object") { poslongitude = ""; } 
            	if (typeof(poslatitude) === "object") { poslatitude = ""; } 
            	if (typeof(posdescription) === "object") { posdescription = ""; } 
            	if (typeof(posorderId) === "object") { posorderId = ""; } 

        		rec = DigiWebApp.Position.createRecord({
                    id: posid,
                    name: posname,
                    strasse: posstrasse,
                    hausnummer: poshausnummer,
                    plz: posplz,
                    ort: posort,
                    land: posland,
                    countrycode: poscountrycode,
                    telefon: posphone,
                    fax: posfax,
                    email: posemail,
                    ansprechpartner: posansprechpartner,
                    kundenname: poskundenname,
                    longitude: poslongitude,
                    latitude: poslatitude,
                    description: posdescription,
                    orderId: posorderId
                });
        		
                try {
                    rec.save();
                    mIdArray.push(rec.m_id);
                } catch(e) {
                	console.log("ERROR in " + this.name + ".getPositionsFromRemoteSuccess: " + e);
                }
                
            });

            localStorage.setItem(this.storagePrefix + '_positionKeys', JSON.stringify(mIdArray));

            this.setCallbackStatus('position', 'local', YES);
        }
    }


    /**
     * Calls getActivities on DigiWebApp.RequestController.
     * Success callback proceeds received activities and afterwards starts retrieving workplans.
     * Error callback calls proceedWithLocalData to check whether offline work is possible.
     */
    , getActivitiesFromRemote: function() {

        DigiWebApp.RequestController.getActivities({
            success: {
                target: this,
                action: function(data, msg, xhr, getActivities) {
                    this.getActivitiesFromRemoteSuccess(data, msg, xhr);
                    this.getWorkPlansFromRemote();
                }
            },
            error: {
                target: this,
                action: function() {
        			console.log("getActivitiesFromRemote-error");
                    this.proceedWithLocalData("getActivitiesFromRemote");
                }
            }
        });
    }

    /**
     * The success callback for getActivitiesFromRemote.
     * If correct data is in response the following is done:
     * 1) the callback status for 'activity' and 'remote' is set (means activities are correctly returned by server)
     * 2) the local available activities are deleted, the corresponding callback status is set
     * 3) activities, received from remote service, are saved in localstorage again and the corresponding status is set to YES
     *
     * @param data The returned data of the server in JSON, means JS object.
     * @param msg
     * @param xhr The XMLHTTPRequest object.
     */
    , getActivitiesFromRemoteSuccess: function(data, msg, xhr) {
    	
   		if ( typeof(data['return']) === "undefined" && typeof(data['ns:return']) !== "undefined" ) {
    		data['return'] = data['ns:return'];
    		try {
    			//myns = data['return'][0]['xsi:type'].split(":")[0];
    			var myns = this.myns;
    			 _.each(data['return'], function(el) {
    				 el.taetigkeitsId = el[myns + ':taetigkeitsId'];
    				 el.taetigkeitsBezeichnung = el[myns + ':taetigkeitsBezeichnung'];
    				 el.positionsId = el[myns + ':positionsId'];
    			 });
    		} catch(e) {
    		}
    	}
   		
    	if(data['return']) {
    		
            this.setCallbackStatus('activity', 'remote', YES);

            // Clear activities from storage
            DigiWebApp.Activity.deleteAll();
            this.setCallbackStatus('activity', 'local', NO);

            var mIdArray = [];
            var rec = null;

            if(_.isObject(data['return']) && !_.isArray(data['return'])) {
                data['return'] = [data['return']];
            }

            // create a record for each order returned from the server and save it
            _.each(data['return'], function(el) {
                rec = DigiWebApp.Activity.createRecord({
                    id: el.taetigkeitsId,
                    name: el.taetigkeitsBezeichnung,
                    positionId: el.positionsId
                });

                try {
                    rec.save();
                    mIdArray.push(rec.m_id);
                } catch(e) {
                	console.log("ERROR in " + this.name + ".getActivitiesFromRemoteSuccess: " + e);
                }

            });

            localStorage.setItem(this.storagePrefix + '_activityKeys', JSON.stringify(mIdArray));

            this.setCallbackStatus('activity', 'local', YES);
        }
    }

    /**
     * Calls getWorkPlans on DigiWebApp.RequestController.
     * Success callback proceeds received work plans and afterwards starts retrieving hand orders.
     * Error callback calls proceedWithLocalData to check whether offline work is possible.
     */
    , getWorkPlansFromRemote: function() {
        DigiWebApp.RequestController.getWorkPlans({
            success: {
                target: this,
                action: function(data, msg, xhr, getWorkplan) {
                    this.getWorkPlansFromRemoteSuccess(data, msg, xhr);
                    this.getHandOrdersFromRemote();
                }
            },
            error: {
                target: this,
                action: function() {
            		console.log("getWorkPlansFromRemote-error");
                    this.proceedWithLocalData("getWorkPlansFromRemote");
                }
            }
        });
    }


    /**
     * The success callback for getWorkPlansFromRemote.
     * If correct data is in response the following is done:
     * 1) the callback status for 'workplan' and 'remote' is set (means work plans are correctly returned by server)
     * 2) the local available work plans are deleted, the corresponding callback status is set
     * 3) work plans, received from remote service, are saved in localstorage again and the corresponding status is set to YES
     *
     * @param data The returned data of the server in JSON, means JS object.
     * @param msg
     * @param xhr The XMLHTTPRequest object.
     */
    , getWorkPlansFromRemoteSuccess: function(data, msg, xhr) {

   		if ( typeof(data['return']) === "undefined" && typeof(data['ns:return']) !== "undefined" ) {
    		data['return'] = data['ns:return'];
    		try {
    			//myns = data['return'][0]['xsi:type'].split(":")[0];
    			var myns = this.myns;
    			 _.each(data['return'], function(el) {
    				 el.arbeitsplanId = el[myns + ':arbeitsplanId'];
    				 el.positionen = el[myns + ':positionen'];
    				 el.taetigkeitsIds = el[myns + ':taetigkeitsIds'];
    				 el.arbeitsplanTyp = el[myns + ':arbeitsplanTyp'];
    			 });
    		} catch(e) {
    		}
    	}

    	if(data['return']) {
            
            this.setCallbackStatus('workPlan', 'remote', YES);
            
            // Clear activities from storage
            DigiWebApp.WorkPlan.deleteAll();
            this.setCallbackStatus('workPlan', 'local', NO);
            // create a record for each order returned from the server and save it
            _.each(data['return'], function(el) {
                DigiWebApp.WorkPlan.createRecord({
                    id: el.arbeitsplanId,
                    workplanType: el.arbeitsplanTyp,
                    activityPositions: el.positionen.join(','), // join collects references to positionen in a string
                    activityIds: el.taetigkeitsIds.join(',')    // join collects references to taetigkeitsIds in a string
                }).save();
            });

            this.setCallbackStatus('workPlan', 'local', YES);
        }
    }


    /**
     * Calls getHandOrders on DigiWebApp.RequestController.
     * Success callback proceeds received hand orders and afterwards starts retrieving features.
     * Error callback calls proceedWithLocalData to check whether offline work is possible.
     */
    , getHandOrdersFromRemote: function() {
        
        DigiWebApp.RequestController.getHandOrders({
            success: {
                target: this,
                action: function(data, msg, xhr) {
                    this.getHandOrdersFromRemoteSuccess(data, msg, xhr);
                    this.getKolonneFromRemote();
                }
            },
            error: {
                target: this,
                action: function() {
            		console.log("getHandOrdersFromRemote-error");
                    this.proceedWithLocalData("getHandOrdersFromRemote");
                }
            }
        });
    }

    /**
     * The success callback for getHandOrdersFromRemote.
     * If correct data is in response the following is done:
     * 1) the callback status for 'handOrder' and 'remote' is set (means hand orders are correctly returned by server)
     * 2) the local available hand orders are deleted, the corresponding callback status is set
     * 3) hand orders, received from remote service, are saved in localstorage again and the corresponding status is set to YES
     *
     * @param data The returned data of the server in JSON, means JS object.
     * @param msg
     * @param xhr The XMLHTTPRequest object.
     */
    , getHandOrdersFromRemoteSuccess: function(data, msg, xhr) {
        
   		if ( typeof(data['return']) === "undefined" && typeof(data['ns:return']) !== "undefined" ) {
    		data['return'] = data['ns:return'];
    		try {
    			//myns = data['return'][0]['xsi:type'].split(":")[0];
    			var myns = this.myns;
    			 _.each(data['return'], function(el) {
    				 el.handauftragsId = el[myns + ':handauftragsId'];
    				 el.handauftragsBezeichnung = el[myns + ':handauftragsBezeichnung'];
    			 });
    		} catch(e) {
    		}
    	}

    	if(data['return']) {
            this.setCallbackStatus('handOrder', 'remote', YES);

            // Clear activities from storage
            DigiWebApp.HandOrder.deleteAll();
            this.setCallbackStatus('handOrder', 'local', NO);

            if(typeof(data['return']) === 'object' && !_.isArray(data['return'])) {
                data['return'] = [data['return']];
            }

            var mIdArray = [];
            var rec = null;

            if(_.isObject(data['return']) && !_.isArray(data['return'])) {
                data['return'] = [data['return']];
            }

            // create a record for each order returned from the server and save it
            _.each(data['return'], function(el) {
                rec = DigiWebApp.HandOrder.createRecord({
                    id: el.handauftragsId,
                    name: el.handauftragsBezeichnung,
                    isLocalOnly: NO
                });

                try {
                    rec.save();
                    mIdArray.push(rec.m_id);
                } catch(e) {
                	console.log("ERROR in " + this.name + ".getHandOrdersFromRemoteSuccess: " + e);
                }
            });

            // get locally saved hand orders and push them into mId array
            var locals = _.select(DigiWebApp.HandOrder.find(), function(ho) {
                return ho.get('isLocalOnly') === YES;
            });
            
            _.each(locals, function(el) {
                mIdArray.push(el.m_id);
            });
            
            localStorage.setItem(this.storagePrefix + '_handorderKeys', JSON.stringify(mIdArray));

            this.setCallbackStatus('handOrder', 'local', YES);
        }
    }

    /**
     * Calls getFeatures on DigiWebApp.RequestController.
     * Success callback proceeds received features data.
     * Error callback calls proceedWithLocalData to check whether offline work is possible.
     */
    , getFeaturesFromRemote: function() {
        
        DigiWebApp.RequestController.getFeatures({
            success: {
                target: this,
                action: function(data, msg, xhr) {
                    this.getFeaturesFromRemoteSuccess(data, msg, xhr);
                	var ChefToolOnly = (DigiWebApp.SettingsController.featureAvailable('409'));
                	if (ChefToolOnly) {
                		this.endSession();
                	} else {
                		this.getOrdersFromRemote();
                	}
                }
            },
            error: {
                target: this,
                action: function() {
        			console.log("getFeaturesFromRemote-error");
                    this.getOrdersFromRemote();
        			//this.proceedWithLocalData("getFeaturesFromRemote");
                }
            }
        });
    }


    /**
     * The success callback for getFeaturesFromRemote.
     *
     * @param data The returned data of the server in JSON, means JS object.
     * @param msg
     * @param xhr The XMLHTTPRequest object.
     */
    , getFeaturesFromRemoteSuccess: function(data, msg, xhr) {
    	        
        if (data) {
	   		if ( typeof(data['return']) === "undefined" && typeof(data['ns:return']) !== "undefined" ) {
	    		data['return'] = data['ns:return'];
	    		try {
	    			//myns = data['return'][0]['xsi:type'].split(":")[0];
	    			var myns = this.myns;
	    			 _.each(data['return'], function(el) {
	    				 el.keyId = el[myns + ':keyId'];
	    				 el.value = el[myns + ':value'];
	    			 });
	    		} catch(e) {
	    		}
	    	}
    	}

    	if(data && data['return']) {
        	
        	if (DigiWebApp.SettingsController.getSetting('debug')) console.log("Features empfangen");
        	
            this.setCallbackStatus('features', 'remote', YES);

            var k = null;

            if(_.isObject(data['return']) && !_.isArray(data['return'])) {
            	console.log("data['return'] = [data['return']];");
                data['return'] = [data['return']];
            }

            // reset settings without gui-elements
            //DigiWebApp.SettingsController.setSetting('debug', false);
            DigiWebApp.SettingsController.setSetting('treatAllAsTablet', false);
            DigiWebApp.SettingsController.setSetting('treatAllAsPhone', false);
            DigiWebApp.SettingsController.setSetting('settingsPassword', 'digi$');

            DigiWebApp.ApplicationController.triggerUpdate = NO;
            
            // create a record for each feature returned from the server and save it
            _.each(data['return'], function(el, i) {
            	/*_.each(el,function(v,k){
        			console.log(k + "=" + v);
        		});*/
            	var prefix = "";
            	if ( typeof(el.valueType) === "undefined" ) {
            		// we are probably in InternetExplorer
            		prefix = DigiWebApp.ApplicationController.myns + ":";
            	}
            	//console.log("el['" + prefix + "valueType'] = " + el[prefix + 'valueType']);
            	if (el[prefix + 'valueType'] === "Setting_WebApp") {
            		if (DigiWebApp.SettingsController.getSetting('debug')) console.log("Setting: " + el[prefix + 'keyId'] + "=" + el[prefix + 'value']);
            		var prop_setting = el[prefix + 'value'];
            		if (prop_setting === "false" || prop_setting === "true" ) { prop_setting = ( prop_setting === "true" ); }
            		DigiWebApp.SettingsController.setSetting(el[prefix + 'keyId'], prop_setting);
            	} else if (el[prefix + 'valueType'] === "Feature") {
            		if (DigiWebApp.SettingsController.getSetting('debug')) console.log("Feature: " + el[prefix + 'keyId'] + "=" + el[prefix + 'value']);
	                k = DigiWebApp.Features.createRecord({
	                    id: el[prefix + 'keyId'],
	                    name: el[prefix + 'keyId'],
	                    isAvailable: el[prefix + 'value']
	                }).save();
	            }
                DigiWebApp.ApplicationController.triggerUpdate = YES;
            });
            if (DigiWebApp.ApplicationController.triggerUpdate) {
            	DigiWebApp.DashboardPage.needsUpdate = true;
                DigiWebApp.MediaListPage.needsUpdate = true;
                DigiWebApp.DashboardController.init(YES);
                DigiWebApp.MediaListController.init(YES);
            }
            DigiWebApp.ApplicationController.triggerUpdate = NO;
            this.setCallbackStatus('features', 'local', YES);
            
        } else {

        	console.log("keine Features empfangen");

        	// keine Features empfangen
            this.setCallbackStatus('features', 'remote', YES);

            // Clear Features from storage
            DigiWebApp.Features.deleteAll();
            this.setCallbackStatus('features', 'local', NO);
            /*DigiWebApp.Employee.createRecord({
                id: '0',
                name: 'Standardmitarbeiter',
                kolonnenId: '',
                isSelected: YES
            }).save();*/
            this.setCallbackStatus('features', 'local', YES);
        }

        //if (DigiWebApp.SettingsController.getSetting('debug')) { alert("DIGI-WebApp is in DebugMode!"); }

        // go to next page
    	/*
        if(this.isReadyToProceed()) {
            DigiWebApp.NavigationController.toBookTimePage(YES);
        } else {
            //M.DialogView.alert({
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('offlineWorkNotPossible'),
                message: M.I18N.l('offlineWorkNotPossibleMsg')
            });
        }
		*/
    }

    /**
     * Calls getKolonne on DigiWebApp.RequestController.
     * Success callback proceeds received kolonnen data.
     * Error callback calls proceedWithLocalData to check whether offline work is possible.
     */
    , getKolonneFromRemote: function() {
        
        DigiWebApp.RequestController.getKolonne({
            success: {
                target: this,
                action: function(data, msg, xhr) {
                    this.getKolonneFromRemoteSuccess(data, msg, xhr);
                }
            },
            error: {
                target: this,
                action: function() {
        			console.log("getKolonneFromRemote-error");
        			this.proceedWithLocalData("getKolonneFromRemote");
                }
            }
        });
    }


    /**
     * The success callback for getKolonneFromRemote.
     *
     * Distinguishes between two scenarios:
     * 1) A Kolonne is returned
     * 2) No Kolonne is returned
     *
     * Case 1:
     * 1) the callback status for 'kolonne' and 'remote' is set (means a kolonne is correctly returned by server)
     * 2) the local available employees are deleted, the corresponding callback status is set
     * 3) employees, received from remote service, are saved in localstorage again and the corresponding status is set to YES
     *
     * 4) If a switch from a "No Kolonne" state of the app occured, the employee selection LS is cleared
     * 5) If the employee state of the app is different from "Emp Selection done" set to 1 (kolonne loaded but no selection yet)
     *
     *
     * Case 2:
     * 1) the callback status for 'kolonne' and 'remote' is set (means a kolonne is correctly returned by server, even though it's not a kolonnes)
     * 2) the local available employees are deleted, the corresponding callback status is set
     * 3) a standard employee with id=0 and name=Standardmitarbeiter is created and preselected and the corresponding local state set
     *
     *
     * In both cases:
     * 
     * 1) By calling isReadyToProceed() it is checked, whether the app is available to move to the next screen. otherwise an alert is shown.
     *    If the app is ready to proceed toBookTimePage() is called on DigiWebApp.NavigationController
     *
     * 2) endSession is called to close the session on the remote server
     *
     * 
     *
     * @param data The returned data of the server in JSON, means JS object.
     * @param msg
     * @param xhr The XMLHTTPRequest object.
     */
    , getKolonneFromRemoteSuccess: function(data, msg, xhr) {
    	
    	if (data) {
    		if ( typeof(data['return']) === "undefined" ) data['return'] = data['ns:return'];
    	}

    	if(data && data['return']) {
            this.setCallbackStatus('kolonne', 'remote', YES);

            // Clear employees from storage
            DigiWebApp.Employee.deleteAll();
            this.setCallbackStatus('kolonne', 'local', NO);

            var mIdArray = [];
            var k = null;

            if ( _.isObject(data['return']) && !_.isArray(data['return']) ) {
                data['return'] = [data['return']];
            }

            // create a record for each order returned from the server and save it
            _.each(data['return'], function(el) {
                k = DigiWebApp.Employee.createRecord({
                    id: el.id,
                    name: el.name,
                    kolonnenId: el.kolonnenId,
                    isSelected: NO
                });

                try {
                	k.save();
                    mIdArray.push(k.m_id);
                } catch(e) {
                	console.log("ERROR in " + this.name + ".getKolonneFromRemoteSuccess: " + e);
                }

            });
            
            localStorage.setItem(this.storagePrefix + '_employeeKeys', JSON.stringify(mIdArray));
            
            this.setCallbackStatus('kolonne', 'local', YES);

            // clear local storage when switch from no kolonne
            if(localStorage.getItem(DigiWebApp.EmployeeController.empSelectionKey) == 0) {
                localStorage.removeItem(DigiWebApp.EmployeeController.empSelectionKey);
            }
            if(DigiWebApp.EmployeeController.getEmployeeState() != 2) {
                DigiWebApp.EmployeeController.setEmployeeState(1); // set it to "kolonne loaded but no selection yet"
            }
            
        } else {
            // no kolonne => mitarbeiterId = 0
            this.setCallbackStatus('kolonne', 'remote', YES);

            // Clear employees from storage
            DigiWebApp.Employee.deleteAll();
            this.setCallbackStatus('kolonne', 'local', NO);
            var mIdArray = [];
            k = DigiWebApp.Employee.createRecord({
                id: '0',
                name: 'Standardmitarbeiter',
                kolonnenId: '',
                isSelected: YES
            }).save();
            mIdArray.push(k.m_id);
            localStorage.setItem(this.storagePrefix + '_employeeKeys', JSON.stringify(mIdArray));
            this.setCallbackStatus('kolonne', 'local', YES);
            DigiWebApp.EmployeeController.setEmployeeState(0);
        }

        // end session on server
        this.endSession();

        // go to next page
        if(this.isReadyToProceed()) {
            DigiWebApp.NavigationController.toBookTimePage(YES);
            DigiWebApp.ApplicationController.setTransitionsSetting();
        } else {
            DigiWebApp.ApplicationController.setTransitionsSetting();
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('offlineWorkNotPossible'),
                message: M.I18N.l('offlineWorkNotPossibleMsg')
            });
        }

    }

    /**
     * Calls endSession on DigiWebApp.RequestController.
     * Both callbacks do nothing.
     */
    , endSession: function() {
		DigiWebApp.ApplicationController.enforceChefToolOnly();
        DigiWebApp.RequestController.endSession({
            success: {
                target: this,
                action: function(data, msg, xhr) {
        		}
            },
            error: {
                target: this,
                action: function() {
    				console.log("endSession-error");
            	}
            }
        });
    }

    /**
     * Sets the callback status of the callback status object (that is a controller property),,,,,,,,,,,,,,,,,,,,,,
     * @param {String} modelName The name of the model
     * @param {String} type Either 'local' or 'remote'
     * @param {Boolean} isSuccess Boolean determing the state
     */
    , setCallbackStatus: function(modelName, type, isSuccess) {
        this.callbackStatus[modelName][type] = isSuccess;
    }

    /**
     * by disjunction of local and remote value conjuncted with each other
     * it is calculated, whether the state of the app allows a proceed step
     */
    , isReadyToProceed: function() {

        var pos = this.callbackStatus['position'];
        var act = this.callbackStatus['activity'];
        var ord = this.callbackStatus['order'];
        var wpl = this.callbackStatus['workPlan'];

        return (pos.remote || pos.local) && (act.remote || act.local) && (ord.remote || ord.local); // && (wpl.remote || wpl.local);
    }
    
    , sonderzeichenCheck: function(str) {
        return ( /[^\w\säöüÄÖÜß \x40"(){}*%\$§€=/\\!?.,;:+-]+/.test(str) );
    }

});

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: MediaListController
// ==========================================================================

DigiWebApp.MediaListController = M.Controller.extend({

    /* mediafiles */
      items: null

    /* Aktionen um neue MediaFiles zu erzeugen */
    , actions: null

    , latestId: null

    /*
    * Which files do we have to display?
    */
    , init: function(isFirstLoad) {
		var items = [];
        if(isFirstLoad) {
            /* do something here, when page is loaded the first time. */
        }
        /* do something, for any other load. */
        items = _.sortBy(DigiWebApp.MediaFile.find(), function(mediafile) {
            return parseInt(mediafile.get('timeStamp'));
        });
        this.set('items', items.reverse());


        if(DigiWebApp.MediaListPage.needsUpdate) {
            var actions = [];
                        
            // Start::TakePicture (400)
            if (DigiWebApp.SettingsController.featureAvailable('400')) {
            	if (DigiWebApp.SettingsController.getSetting('debug')) console.log("enabling Feature 400 (TakePicture)");
            	actions.push({
                    label: M.I18N.l('takePicture'),
                    icon: 'icon_takePicture.png',
                    id: 'camera'
                });
            }
            // End::TakePicture

            // Start::RecordAudio (401)
            if (DigiWebApp.SettingsController.featureAvailable('401')) {
            	if (DigiWebApp.SettingsController.getSetting('debug')) console.log("enabling Feature 401 (RecordAudio)");
            	actions.push({
                    label: M.I18N.l('recordAudio'),
                    icon: 'icon_recordAudio.png',
                    id: 'audio'
                });
            }
            // End::RecordAudio

        	actions.push({
                label: M.I18N.l('uploadMediaFiles'),
                icon: 'icon_dataTransfer.png',
                id: 'uploadMediaFiles'
            });

        	this.set('actions', actions);
            DigiWebApp.MediaListPage.needsUpdate = false;
        }

        var list;

        list = M.ViewManager.getView('mediaListPage', 'mediafileslist');
        if(list) {
            $('#' + list.id).find('li').each(function() {
                $(this).removeClass('selected');
            });
        }

        list = M.ViewManager.getView('mediaListPage', 'actionslist');
        if(list) {
            $('#' + list.id).find('li').each(function() {
                $(this).removeClass('selected');
            });
        }
	}

	, itemSelected: function(id, m_id) {
        if(this.latestId) {
            $('#' + this.latestId).removeClass('selected');
        }
        $('#' + id).addClass('selected');

        this.latestId = id;

        if(m_id && typeof(this[m_id]) === 'function') {
            this[m_id]();
        }
    }

    , camera: function() {
        DigiWebApp.NavigationController.toCameraPageTransition();
    }

    , audio: function() {
        DigiWebApp.NavigationController.toAudioPageTransition();
    }
    
    , uploadMediaFiles: function() {
        //TODO: MediaFiles zu WebService übertragen (tbd)
    }

});

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: OrderInfoController
// ==========================================================================

DigiWebApp.OrderInfoController = M.Controller.extend({

	// arrays for selection lists
      orders: null
    , positions: null
    
    , activeOrder: null
    , activePosition: null
    , items: []
    //, debugitems: []

    /*
    * Sample function
    * To handle the first load of a page.
    */
    , init: function(isFirstLoad) {
        if(isFirstLoad) {
            /* do something here, when page is loaded the first time. */
        }

		DigiWebApp.OrderInfoController.set('activeOrder', null);
		DigiWebApp.OrderInfoController.set('activePosition', null);
		DigiWebApp.OrderInfoController.set('items', []);

		var orders = DigiWebApp.HandOrder.findSorted().concat(DigiWebApp.Order.findSorted()); // we need to check handOrders also
        var positions = DigiWebApp.Position.findSorted();
        
        var itemSelected = NO;

        var orderArray = _.map(orders, function(order) {
            var obj =  { label: order.get('name'), value: order.get('id') };
            if ( DigiWebApp.BookingController.currentBooking !== null ) {
            	if (    (obj.value === DigiWebApp.BookingController.currentBooking.get('orderId'))
            		 || (obj.value === DigiWebApp.BookingController.currentBooking.get('handOrderId'))
            	   )
            	{
            		obj.isSelected = YES;
            		itemSelected = YES;
            		DigiWebApp.OrderInfoController.set('activeOrder', [order]);
            	}
            }
            return obj;
        });
        orderArray = _.compact(orderArray);
        // push "Bitte wählen Option"
        if (itemSelected === NO) orderArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:!itemSelected});
        
        itemSelected = NO;
        var positionArray = _.map(positions, function(pos) {
        	if (DigiWebApp.OrderInfoController.activeOrder !== null) {
        		if (pos.get('orderId') !== DigiWebApp.OrderInfoController.activeOrder[0].get('id')) {
        			return null;
        		}
        	} else {
        		return null;
        	}
            var obj = { label: pos.get('name'), value: pos.get('id') };
           	if ( DigiWebApp.BookingController.currentBooking !== null ) {
            	if (obj.value === DigiWebApp.BookingController.currentBooking.get('positionId')) {
            		obj.isSelected = YES;
            		itemSelected = YES;
            		DigiWebApp.OrderInfoController.set('activePosition', [pos]);
            	}
            }
        	return obj;
        });
        positionArray = _.compact(positionArray);
        // push "Bitte wählen Option"
        if (itemSelected === NO) positionArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:!itemSelected});

        // set selection arrays to start content binding process
        this.set('orders', orderArray);
        this.set('positions', positionArray);
        
        this.setItem();
    }

    , setItem: function() {
        var item_empty = { 
        		orderName: '',
        		positionName: '',
            	positionStrasse: '',
            	positionHausnummer: '',
            	positionPLZ: '',
            	positionOrt: '',
                positionLand: '',
            	positionStrasseUndHausnummer: '', 
            	positionPLZundOrt: '',
        		positionCountryCode: '',
        		positionTelefon: '',
        		positionFax: '',
        		positionEmail: '',
        		positionAnsprechpartner: '',
        		positionKundenname: '',
        		positionLongitude: '',
        		positionLatitude: '',
        		positionBeschreibung: ''
        	};
        var item = item_empty;
		if (DigiWebApp.OrderInfoController.activeOrder !== null) item.orderName = DigiWebApp.OrderInfoController.activeOrder[0].get('name');
		if (DigiWebApp.OrderInfoController.activePosition !== null) {
			item.positionName = DigiWebApp.OrderInfoController.activePosition[0].get('name');
			item.positionStrasse = DigiWebApp.OrderInfoController.activePosition[0].get('strasse');
			item.positionHausnummer = DigiWebApp.OrderInfoController.activePosition[0].get('hausnummer');
			item.positionPLZ = DigiWebApp.OrderInfoController.activePosition[0].get('plz');
			item.positionOrt = DigiWebApp.OrderInfoController.activePosition[0].get('ort');
			item.positionLand = DigiWebApp.OrderInfoController.activePosition[0].get('land');
			item.positionTelefon = DigiWebApp.OrderInfoController.activePosition[0].get('telefon');
			item.positionFax = DigiWebApp.OrderInfoController.activePosition[0].get('fax');
			item.positionEmail = DigiWebApp.OrderInfoController.activePosition[0].get('email');
			item.positionAnsprechpartner = DigiWebApp.OrderInfoController.activePosition[0].get('ansprechpartner');
			item.positionKundenname = DigiWebApp.OrderInfoController.activePosition[0].get('kundenname');
			item.positionLongitude = DigiWebApp.OrderInfoController.activePosition[0].get('longitude');
			item.positionLatitude = DigiWebApp.OrderInfoController.activePosition[0].get('latitude');
			item.positionBeschreibung = DigiWebApp.OrderInfoController.activePosition[0].get('description');
			item.positionCountryCode = DigiWebApp.OrderInfoController.activePosition[0].get('countrycode');
			item.positionPLZundOrt = item.positionPLZ + " " + item.positionOrt;
			item.positionStrasseUndHausnummer = item.positionStrasse + " " + item.positionHausnummer;
		}

		if (item.orderName === '' && item.positionName === '') {
			DigiWebApp.OrderInfoController.set('items', []);
		} else {
			DigiWebApp.OrderInfoController.set('items', [item]);
		}
    }
    
    , setPositions: function() {
        var orderId = M.ViewManager.getView('orderInfoPage', 'order').getSelection(YES).value;
        if(!orderId) {
            return;
        }
        var positions = DigiWebApp.Position.findSorted();

        var i = 0;
        positions = _.map(positions, function(pos) {
            if(pos.get('orderId') === orderId) {
                var obj = { label: pos.get('name'), value: pos.get('id') };
                if(i === 0) {
                    obj.isSelected = YES;
            		DigiWebApp.OrderInfoController.set('activePosition', [pos]);
                }
                i += 1;
                return obj;
            }
            return null;
        });
        positions = _.compact(positions);/* remove falsy values from positions with _.compact() */

        if(positions.length < 1) {
            positions.push({label: M.I18N.l('noData'), value: '0'});
            DigiWebApp.OrderInfoController.set('activePosition', null);
        }

        M.ViewManager.getView('orderInfoPage', 'position').resetSelection();
        this.set('positions', positions);
        this.setItem();
    }

    , saveAsContact: function() {
    	// are we on a mobile device with navigator.contacts?
    	if (typeof(navigator.contacts) === "undefined") {
    		DigiWebApp.ApplicationController.nativeAlertDialogView({
    			title: M.I18N.l('saveAsContact'),
    			message: M.I18N.l('noContactsAvailable')
    		});
    		return;
    	}
    	var item = DigiWebApp.OrderInfoController.items[0];
    	if (DigiWebApp.SettingsController.getSetting('debug')) console.log("searching contact for orderName=" + item.orderName + ", positionName=" + item.positionName);
    	// try to load the contact to prevent duplicates
    	var options = new ContactFindOptions();
    	options.filter = item.orderName + ", " + item.positionName; 
    	var fields = ["displayName", "name", "givenName", "familyName"];
		DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('saveAsContact'));
    	navigator.contacts.find(fields, DigiWebApp.OrderInfoController.saveAsContactFound, DigiWebApp.OrderInfoController.saveAsContactFoundError, options);
    	return;
    }

    , saveAsContactFound: function(contacts) {
    	var item = DigiWebApp.OrderInfoController.items[0];
    	DigiWebApp.ApplicationController.DigiLoaderView.hide();
    	if (typeof(contacts) === "undefined") {
    		
        	// create new contact
        	if (DigiWebApp.SettingsController.getSetting('debug')) console.log("creating new contact for orderName=" + item.orderName + ", positionName=" + item.positionName);
        	var myContact = navigator.contacts.create({
        		//displayName: The name of this Contact, suitable for display to end-users. (DOMString)
        		"displayName": M.I18N.l('orderInfo') + " " + item.orderName
        	});
    		return DigiWebApp.OrderInfoController.saveAsContactSave(myContact);
    		
    	} else {

    		if (contacts.length === 0) {
            	// create new contact
            	if (DigiWebApp.SettingsController.getSetting('debug')) console.log("creating new contact for orderName=" + item.orderName + ", positionName=" + item.positionName);
            	var myContact = navigator.contacts.create({
            		//displayName: The name of this Contact, suitable for display to end-users. (DOMString)
            		"displayName": M.I18N.l('orderInfo') + " " + item.orderName + ", " + item.positionName
            	});
        		return DigiWebApp.OrderInfoController.saveAsContactSave(myContact);
    		} else if (contacts.length > 1) {
				DigiWebApp.ApplicationController.nativeAlertDialogView({
					title: M.I18N.l('saveAsContact'),
					message: M.I18N.l('contactExistsMultiple')
				});
				return;
	    	} else {
	    		var changeMsg = M.I18N.l('saveAsContactChangeQuestionMsg');
	    		DigiWebApp.ApplicationController.nativeConfirmDialogView({
	            	title: M.I18N.l('saveAsContactChangeQuestionTitle'),
    		        message: changeMsg,
		            confirmButtonValue: M.I18N.l('yes'),
            		cancelButtonValue: M.I18N.l('no'),
            		callbacks: {
                		confirm: {
                    		target: this,
                    		action: function() {
					    	    		//console.log(contacts[0]);
					    	    		//if (DigiWebApp.SettingsController.getSetting('debug')) console.log("using contact[0] for orderName=" + item.orderName + ", positionName=" + item.positionName);
					    	    		//return DigiWebApp.OrderInfoController.saveAsContactSave(contacts[0]);
	    								var myContactFound = contacts[0];
	    								myContactFound.remove(DigiWebApp.OrderInfoController.contactRemoveSuccess, DigiWebApp.OrderInfoController.contactRemoveError);
	    							}
                		},
                		cancel: {
                    		target: this,
                    		action: function() {
                        				return;
                    				}
                		}
            		}
        		});
	    	}
    	}
    }
    
    , contactRemoveSuccess: function() {
    	var item = DigiWebApp.OrderInfoController.items[0];
		// create new contact
    	if (DigiWebApp.SettingsController.getSetting('debug')) console.log("creating new contact for orderName=" + item.orderName + ", positionName=" + item.positionName);
    	var myContact = navigator.contacts.create({
    		//displayName: The name of this Contact, suitable for display to end-users. (DOMString)
    		"displayName": M.I18N.l('orderInfo') + " " + item.orderName
    	});
		return DigiWebApp.OrderInfoController.saveAsContactSave(myContact);
    }
    
    , contactRemoveError: function() {
		DigiWebApp.ApplicationController.nativeAlertDialogView({
			title: M.I18N.l('saveAsContact'),
			message: M.I18N.l('saveAsContactChangeErrorMsg')
		});
    }
    
    , saveAsContactFoundError: function() {
		DigiWebApp.ApplicationController.nativeAlertDialogView({
			title: M.I18N.l('saveAsContact'),
			message: M.I18N.l('error')
		});
		return;
    }
    
    , saveAsContactSave: function(myContact) {
    	console.log("saving contact");
    	console.log(myContact);
    	var item = DigiWebApp.OrderInfoController.items[0];
        
		//id: A globally unique identifier. (DOMString)
        //myContact.id = "DIGI-WebApp_" + order.get('id');
        
		//name: An object containing all components of a persons name. (ContactName)
    	var myContactName = new ContactName();
	    	//formatted: The complete name of the contact. (DOMString)
	    	//familyName: The contacts family name. (DOMString)
	    	//givenName: The contacts given name. (DOMString)
	    	//middleName: The contacts middle name. (DOMString)
	    	//honorificPrefix: The contacts prefix (example Mr. or Dr.) (DOMString)
	    	//honorificSuffix: The contacts suffix (example Esq.). (DOMString)
		myContactName.givenName = M.I18N.l('orderInfo');
		myContactName.familyName = item.orderName + ", " + item.positionName;
		myContactName.honorificPrefix = 'DIGI-WebApp'
	   	myContact.name = myContactName;
    	
    	//nickname: A casual name to address the contact by. (DOMString)
		//phoneNumbers: An array of all the contact's phone numbers. (ContactField[])
	   	var phoneNumbers = [];
	   	var myTel = '';
	   	var myFax = '';
	   	try { myTel = item.positionTelefon } catch(e) {}
	   	try { myFax = item.positionFax } catch(e) {}
	   	phoneNumbers[0] = new ContactField('work', myTel, true);
	   	phoneNumbers[1] = new ContactField('fax', myFax, false);
	   	myContact.phoneNumbers = phoneNumbers;
	   	
		//emails: An array of all the contact's email addresses. (ContactField[])
	   	var eMail = [];
	   	var myemail = '';
	   	try { myemail = item.positionEmail } catch(e) {}
	   	eMail[0] = new ContactField('work', myemail, true);
	   	myContact.emails = eMail;

        //addresses: An array of all the contact's addresses. (ContactAddresses[])
        var myContactAdress = new ContactAddress();
			//pref: Set to true if this ContactAddress contains the user's preferred value. (boolean)
    		//myContactAdress.pref = true; //mostly unsupported
			//type: A string that tells you what type of field this is (example: 'home'). _(DOMString)
        	myContactAdress.type = "Work";
			//formatted: The full address formatted for display. (DOMString)
			//streetAddress: The full street address. (DOMString)
        	myContactAdress.streetAddress = item.positionStrasseUndHausnummer;
			//locality: The city or locality. (DOMString)
        	myContactAdress.locality = item.positionOrt;
			//region: The state or region. (DOMString)
			//postalCode: The zip code or postal code. (DOMString)
        	myContactAdress.postalCode = item.positionPLZ;
			//country: The country name. (DOMString)
        	myContactAdress.country = item.positionLand;

           	if (myContact.addresses === null)	{
           		var addresses = [myContactAdress];
            	myContact.addresses = addresses;
           	} else {
           		myContact.addresses[0] = myContactAdress;
           	}
        	
        //ims: An array of all the contact's IM addresses. (ContactField[])
		//organizations: An array of all the contact's organizations. (ContactOrganization[])
		//birthday: The birthday of the contact. (Date)
		//note: A note about the contact. (DOMString)
        var dateNow = new Date();
        myContact.note = item.positionBeschreibung + " (" + M.I18N.l('contactLastChange') + ": " + dateNow.toString() + ")";
        //photos: An array of the contact's photos. (ContactField[])
		//categories: An array of all the contacts user defined categories. (ContactField[])
		//urls: An array of web pages associated to the contact. (ContactField[])

        // save contact
   		if (DigiWebApp.SettingsController.getSetting('debug')) console.log("saving contact for orderName=" + item.orderName + ", positionName=" + item.positionName);
		DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('saveAsContact'));
        myContact.save(DigiWebApp.OrderInfoController.saveAsContactSuccess, DigiWebApp.OrderInfoController.saveAsContactError);
    }
        
    , saveAsContactSuccess: function() {
    	DigiWebApp.ApplicationController.DigiLoaderView.hide();
		//DigiWebApp.ApplicationController.nativeAlertDialogView({
		//	title: M.I18N.l('saveAsContact'),
		//	message: M.I18N.l('saveAsContactSuccess')
		//});
    }

    , saveAsContactError: function(error) {
    	console.log('savingContactError');
    	console.log(error);
    	DigiWebApp.ApplicationController.DigiLoaderView.hide();
		//DigiWebApp.ApplicationController.nativeAlertDialogView({
		//	title: M.I18N.l('saveAsContact'),
		//	message: M.I18N.l('saveAsContactError')
		//});
    }
});

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: WipeController
// ==========================================================================

DigiWebApp.WipeController = M.Controller.extend({

    wipeStartX: 0,
    wipeStartY: 0,
    wipeStopX: 0,
    wipeStopY: 0,
    wipeIsMoving: false,
    wipeIsPressed: false,
    wipeIsPressedStart: 0,
    wipeIsPressedStop: 0,
    wipeDecideX: 150,
    wipeDecideY: 300,
    wipeDecideTimeout: 200,
	
	wipeActionUp: function() {
	},
	
	wipeActionDown: function() {
		if (
				( M.ViewManager.currentPage.id !== DigiWebApp.TimeDataPage.id )
			 && ( M.ViewManager.currentPage.id !== DigiWebApp.EditTimeDataPage.id )
			 &&	( M.ViewManager.currentPage.id !== DigiWebApp.SettingsPage.id )
			 &&	( M.ViewManager.currentPage.id !== DigiWebApp.CameraPage.id )
			 &&	( M.ViewManager.currentPage.id !== DigiWebApp.EditPicturePage.id )
			 &&	( M.ViewManager.currentPage.id !== DigiWebApp.MediaListPage.id )
		){
			try {
				if ( (typeof(M.ViewManager.currentPage.header) !== "undefined") && (M.ViewManager.currentPage.header !== null) ) { 
	  				if ( (typeof(M.ViewManager.currentPage.header.backButton) !== "undefined") && (M.ViewManager.currentPage.header.backButton !== null)) { 
	  					if ( (typeof(M.ViewManager.currentPage.header.backButton.events) !== "undefined") && (M.ViewManager.currentPage.header.backButton.events !== null)) { 
	  						if ( (typeof(M.ViewManager.currentPage.header.backButton.events.tap) !== "undefined") && (M.ViewManager.currentPage.header.backButton.events.tap !== null) ) {
								if (typeof(M.ViewManager.currentPage.header.backButton.events.tap.action) === "function") {
									M.ViewManager.currentPage.header.backButton.events.tap.action();					
								} else {
									M.ViewManager.currentPage.header.backButton.events.tap.target.get(M.ViewManager.currentPage.header.backButton.events.tap.action)();
								}
				}}}}
			} catch(e) { console.log(e); }
		}
    },
    
	wipeActionLeft: function() {
			if ( M.ViewManager.currentPage.id === DigiWebApp.BookingPage.id ) {
  				DigiWebApp.NavigationController.toDashboardPageFlipTransition();
  			} else if ( M.ViewManager.currentPage.id === DigiWebApp.DashboardPage.id ){
	  			DigiWebApp.NavigationController.backToBookTimePageFlipTransition();		  				
  			} else {
  				//console.log("else left");
  			}
    },
    
	wipeActionRight: function() {
		if ( M.ViewManager.currentPage.id === DigiWebApp.DashboardPage.id ) {
			DigiWebApp.NavigationController.toBookTimePageFlipTransition();
		} else if ( M.ViewManager.currentPage.id === DigiWebApp.BookingPage.id ){
			DigiWebApp.NavigationController.backToDashboardPageFlipTransition();
		} else {
			//console.log("else right");
			if (
					( M.ViewManager.currentPage.id !== DigiWebApp.EditTimeDataPage.id )
				 &&	( M.ViewManager.currentPage.id !== DigiWebApp.CameraPage.id )
			){
				try {
					if ( (typeof(M.ViewManager.currentPage.header) !== "undefined") && (M.ViewManager.currentPage.header !== null) ) { 
		  				if ( (typeof(M.ViewManager.currentPage.header.backButton) !== "undefined") && (M.ViewManager.currentPage.header.backButton !== null)) { 
		  					if ( (typeof(M.ViewManager.currentPage.header.backButton.events) !== "undefined") && (M.ViewManager.currentPage.header.backButton.events !== null)) { 
		  						if ( (typeof(M.ViewManager.currentPage.header.backButton.events.tap) !== "undefined") && (M.ViewManager.currentPage.header.backButton.events.tap !== null) ) {
									if (typeof(M.ViewManager.currentPage.header.backButton.events.tap.action) === "function") {
										M.ViewManager.currentPage.header.backButton.events.tap.action();					
									} else {
										M.ViewManager.currentPage.header.backButton.events.tap.target.get(M.ViewManager.currentPage.header.backButton.events.tap.action)();
									}
		  			}}}}
				} catch(e) { console.log(e); }
			}
		}
	},

	stopDefault: function(evt) {
	    if ( navigator.userAgent.match(/Android/i) ) {
	    	//evt.originalEvent.preventDefault();
	    } else {
		    if (evt && evt.preventDefault) {
		        evt.preventDefault();
		    }
		    if (window.event && window.event.returnValue) {
		        window.event.returnValue = false;
		    }
	    }
	},
	
	wipeDoStop: function(ev) {
		var dx = DigiWebApp.WipeController.wipeStartX - DigiWebApp.WipeController.wipeStopX;
		var dy = DigiWebApp.WipeController.wipeStartY - DigiWebApp.WipeController.wipeStopY;
		var timeStart = DigiWebApp.WipeController.wipeIsPressedStart;
		var timeStop  = DigiWebApp.WipeController.wipeIsPressedStop;
		var dTime = timeStart - timeStop;
		try { /*console.log("unbinding " + ev.type);*/ $(this).unbind(ev); } catch (e) { console.log("error while unbind"); }
		_.each(DigiWebApp.app.pages, function(myPage) {
			try { $('#' + myPage.id).unbind('touchmove', DigiWebApp.WipeController.wipeOnTouchMove); } catch (e) { console.log("error while unbind touchmove"); };
			try { $('#' + myPage.id).unbind('mousemove', DigiWebApp.WipeController.wipeOnTouchMove); } catch (e) { console.log("error while unbind mousemove"); };
			try { $('#' + myPage.id).unbind('touchmove'); } catch (e) { console.log("error while unbind touchmove"); };
			try { $('#' + myPage.id).unbind('mousemove'); } catch (e) { console.log("error while unbind mousemove"); };
			try { $('#' + myPage.id).unbind('touchstop', DigiWebApp.WipeController.wipeOnMoveStop); } catch (e) { console.log("error while unbind touchstop"); };
			try { $('#' + myPage.id).unbind('mouseup',   DigiWebApp.WipeController.wipeOnMoveStop); } catch (e) { console.log("error while unbind mouseup"); };
			try { $('#' + myPage.id).unbind('touchstop'); } catch (e) { console.log("error while unbind touchstop"); };
			try { $('#' + myPage.id).unbind('mouseup');   } catch (e) { console.log("error while unbind mouseup"); };
		});
		var dxIsLongEnough = (Math.abs(dx) >= DigiWebApp.WipeController.wipeDecideX);
		var dyIsLongEnough = (Math.abs(dy) >= DigiWebApp.WipeController.wipeDecideY);
		var wipeBelowTimeout = (dTime < DigiWebApp.WipeController.wipeDecideTimeout);
		var noInitialStopX = (DigiWebApp.WipeController.wipeStopX > 0);
		var noInitialStopY = (DigiWebApp.WipeController.wipeStopY > 0);
		//console.log("dxIsLongEnough: " + dxIsLongEnough);
		//console.log("dyIsLongEnough: " + dyIsLongEnough);
		//console.log("wipeBelowTimeout: " + wipeBelowTimeout);
		//console.log("noInitialStopX: " + noInitialStopX);
		//console.log("noInitialStopY: " + noInitialStopY);
		if (DigiWebApp.WipeController.wipeIsMoving) {
			if (wipeBelowTimeout) {
				if ((dxIsLongEnough || dyIsLongEnough) 
				&& (noInitialStopX && noInitialStopY)
				){
					if (dxIsLongEnough) {
						if(dx > 0) {
							console.log("wipe left");
							//console.log(((DigiWebApp.WipeController.wipeStopX > 0) && (DigiWebApp.WipeController.wipeStopY > 0)));
							//console.log("dx=" + dx + ", dy=" + dy + ", " + DigiWebApp.WipeController.wipeStopX + ", " + DigiWebApp.WipeController.wipeStopY);
				  			DigiWebApp.WipeController.wipeActionLeft();
						} else {
							console.log("wipe right");
				  			DigiWebApp.WipeController.wipeActionRight();
						}
					}
					if (dyIsLongEnough) {
						if(dy > 0) {
				  			console.log("wipe up");
		    				DigiWebApp.WipeController.wipeActionUp();
		    			} else {
				  			console.log("wipe down");
		    				DigiWebApp.WipeController.wipeActionDown();
		    			}
					}
					DigiWebApp.WipeController.stopDefault(ev);
					return false;
				} else {
					//console.log("wipe too short");				
				}
			} else {
				//console.log("scroll");
			}
		}
		//console.log("reset touchstats");
		DigiWebApp.WipeController.wipeIsPressed = false;
		DigiWebApp.WipeController.wipeIsPressedStop = 0;
		DigiWebApp.WipeController.wipeIsPressedStart = 0;
		DigiWebApp.WipeController.wipeStartX = 0;
		DigiWebApp.WipeController.wipeStartY = 0;
		DigiWebApp.WipeController.wipeStopX = 0;
		DigiWebApp.WipeController.wipeStopY = 0;
		DigiWebApp.WipeController.wipeIsMoving = false;
    },
    
    wipeOnMoveStop: function(ev) {
		/*
    	var dx = DigiWebApp.WipeController.wipeStartX - DigiWebApp.WipeController.wipeStopX;
		var dy = DigiWebApp.WipeController.wipeStartY - DigiWebApp.WipeController.wipeStopY;
		var timeStart = DigiWebApp.WipeController.wipeIsPressedStart;
		var timeStop  = DigiWebApp.WipeController.wipeIsPressedStop;
		var dTime = timeStart - timeStop;
    	console.log("wipeOnMoveStop: " + DigiWebApp.WipeController.wipeIsMoving + " (" + dx + ", " + dy + ") " + dTime);
    	*/
		try { /*console.log("unbinding " + ev.type);*/ $(this).unbind(ev); } catch (e) { console.log("error while unbind"); }
		DigiWebApp.WipeController.wipeDoStop(ev);
	},
	
	wipeOnTouchStart: function(ev) {
		
	},
	
	touchMoveEventSaved: null,
	touchStartEventSaved: null,
	
	wipeOnTouchMove: function(ev) {
		DigiWebApp.WipeController.touchMoveEventSaved = ev;
		//try {
			var x = 0;
			var y = 0;
	        if (typeof(ev.touches) !== "undefined") {
	        	//console.log("touchmove: using ev.touches[0].page...");
			  	x = ev.touches[0].pageX;
			  	y = ev.touches[0].pageY;
	        } else if ( typeof(ev.originalEvent.touches) !== "undefined" ) {
	        	//console.log("touchmove: using ev.originalEvent.touches[0].page...");
			  	x = ev.originalEvent.touches[0].pageX;
			  	y = ev.originalEvent.touches[0].pageY;
	        } else if ( typeof(ev.originalEvent) !== "undefined" ) {
	        	//console.log("touchmove: using ev.originalEvent.page...");
			  	x = ev.originalEvent.pageX;
			  	y = ev.originalEvent.pageY;
	        } else {
	        	//console.log("touchmove: using ev.page...");
	        	x = ev.pageX;
	        	y = ev.pageY;
	        }
	        var xMoveSinceLastEvent = Math.abs(Math.abs(DigiWebApp.WipeController.wipeStopX) - x); 
	        var yMoveSinceLastEvent = Math.abs(Math.abs(DigiWebApp.WipeController.wipeStopY) - y);
	        var enoughMovement = ((xMoveSinceLastEvent < 200) && (yMoveSinceLastEvent < 200));
	        /*
	        console.log("xMoveSinceLastEvent=" + xMoveSinceLastEvent);
	        console.log("yMoveSinceLastEvent=" + yMoveSinceLastEvent);
	        console.log("DigiWebApp.WipeController.wipeStartX: " + DigiWebApp.WipeController.wipeStartX);
	        console.log("DigiWebApp.WipeController.wipeStartY: " + DigiWebApp.WipeController.wipeStartY);
	        console.log("DigiWebApp.WipeController.wipeStopX: " + DigiWebApp.WipeController.wipeStopX);
	        console.log("DigiWebApp.WipeController.wipeStopY: " + DigiWebApp.WipeController.wipeStopY);
	        console.log("enoughMovement=" + enoughMovement);
	        */
	        if ((enoughMovement && (x > 0) && (y > 0)) 
	        || ((DigiWebApp.WipeController.wipeStopX === 0) && (DigiWebApp.WipeController.wipeStopY === 0))
	        ) {
		        DigiWebApp.WipeController.wipeStopX = x;
		        DigiWebApp.WipeController.wipeStopY = y;
		        DigiWebApp.WipeController.wipeIsPressedStop = (+new Date()).toString();
				var dx = DigiWebApp.WipeController.wipeStartX - x;
			  	var dy = DigiWebApp.WipeController.wipeStartY - y;
		        var timeStart = DigiWebApp.WipeController.wipeIsPressedStart;
				var timeStop  = DigiWebApp.WipeController.wipeIsPressedStop;
				var dTime = timeStart - timeStop;
			  	if ( (Math.abs(dx) > 10) || (Math.abs(dy) > 10)) {
			  		DigiWebApp.WipeController.wipeIsMoving = true;
			  	} else {
			  		DigiWebApp.WipeController.wipeIsMoving = false;
			  	}
				var dxIsLongEnough = (Math.abs(dx) >= DigiWebApp.WipeController.wipeDecideX);
				var dyIsLongEnough = (Math.abs(dy) >= DigiWebApp.WipeController.wipeDecideY);
				var wipeTimeout = (dTime >= DigiWebApp.WipeController.wipeDecideTimeout);
				//console.log("dx: " + dx);
				//console.log("dy: " + dy);
				//console.log("dxIsLongEnough: " + dxIsLongEnough);
				//console.log("dyIsLongEnough: " + dyIsLongEnough);
				//console.log("wipeTimeout: " + wipeTimeout);
				if (( dxIsLongEnough || dyIsLongEnough || wipeTimeout) && (DigiWebApp.WipeController.wipeIsMoving)) {
			    	//console.log("stopping wipe: " + DigiWebApp.WipeController.wipeIsMoving + " (" + dx + ", " + dy + ") " + dTime);
					try { /*console.log("unbinding " + ev.type);*/ $(this).unbind(ev); } catch (e) { console.log("error while unbind"); }
			  		if (typeof(device) !== "undefined") {
			  			if ( 
			  					( device.version.substr(0,1) >= 4 ) && ( device.platform.substr(0,7) >= "Android" ) && (DigiWebApp.SettingsController.getSetting('debug')) )
			  			{
			  				DigiWebApp.WipeController.stopDefault(ev);
			  			}
			  		}
					DigiWebApp.WipeController.wipeDoStop(ev);
				};
				//return false;
	        } else {
	        	console.log("blocked wipe");
	        	//console.log("x=" + x + ", y=" + y + " " + DigiWebApp.WipeController.wipeStartX + ", " + DigiWebApp.WipeController.wipeStartY + " " + DigiWebApp.WipeController.wipeStopX + ", " + DigiWebApp.WipeController.wipeStopY);
	    		DigiWebApp.WipeController.wipeIsPressed = false;
	    		DigiWebApp.WipeController.wipeIsPressedStop = 0;
	    		DigiWebApp.WipeController.wipeIsPressedStart = 0;
	    		DigiWebApp.WipeController.wipeStartX = 0;
	    		DigiWebApp.WipeController.wipeStartY = 0;
	    		DigiWebApp.WipeController.wipeStopX = 0;
	    		DigiWebApp.WipeController.wipeStopY = 0;
	    		DigiWebApp.WipeController.wipeIsMoving = false;
	        	try { /*console.log("unbinding " + ev.type);*/ $(this).unbind(ev); } catch (e) { console.log("error while unbind"); }
	        	DigiWebApp.WipeController.wipeDoStop(ev);
	        }
		//} catch (e) { console.log(e); }
	},
	
	regTouchStart: function(pageid,ev) {
		DigiWebApp.WipeController.wipeIsPressed = false;
		DigiWebApp.WipeController.wipeIsPressedStop = 0;
		DigiWebApp.WipeController.wipeIsPressedStart = 0;
		DigiWebApp.WipeController.wipeStartX = 0;
		DigiWebApp.WipeController.wipeStartY = 0;
		DigiWebApp.WipeController.wipeStopX = 0;
		DigiWebApp.WipeController.wipeStopY = 0;
		DigiWebApp.WipeController.wipeIsMoving = false;
		DigiWebApp.WipeController.touchStartEventSaved = ev;
		if( navigator.userAgent.match(/Android/i) ) {
			//console.log("preventing touchstarts default");
			//ev.preventDefault();
		}
        if (typeof(ev.touches) !== "undefined") {
        	//console.log("touchstart: using ev.touches[0]");
    		DigiWebApp.WipeController.wipeStartX = ev.touches[0].pageX;
    		DigiWebApp.WipeController.wipeStartY = ev.touches[0].pageY;
        } else if ( typeof(ev.originalEvent.touches) !== "undefined" ) {
        	//console.log("touchstart: using ev.originalEvent.touches[0].page...");
        	DigiWebApp.WipeController.wipeStartX = ev.originalEvent.touches[0].pageX;
        	DigiWebApp.WipeController.wipeStartY = ev.originalEvent.touches[0].pageY;
        } else {
        	//console.log("touchstart: using ev.page...");
        	DigiWebApp.WipeController.wipeStartX = ev.pageX;
        	DigiWebApp.WipeController.wipeStartY = ev.pageY;
        }
        //console.log("DigiWebApp.WipeController.wipeStartX: " + DigiWebApp.WipeController.wipeStartX);
        //console.log("DigiWebApp.WipeController.wipeStartY: " + DigiWebApp.WipeController.wipeStartY);
		DigiWebApp.WipeController.wipeIsMoving = false;
		DigiWebApp.WipeController.wipeIsPressed = true;
		DigiWebApp.WipeController.wipeIsPressedStart = (+new Date()).toString();
		DigiWebApp.WipeController.wipeIsPressedStop = null;
		var eventType = ev.type.substr(0,5);
		//alert(eventType);
		//console.log("binding " + eventType + "move for pageid " + pageid);
    	var myPlatform = M.Environment.getPlatform();

    	var deviceversion = "0";
    	if (typeof(device) !== "undefined") deviceversion = new String(device.version);

    	var deviceplatform = "";
    	if (typeof(device) !== "undefined") deviceplatform = new String(device.platform);
    	

        if (       ( myPlatform.substr(-2)  === "86" )
        		|| ( myPlatform.substr(-5)  === "Win32" )
        		|| ( myPlatform.substr(-5)  === "Win64" )
        		|| ( myPlatform.substr(0,3) === "Mac" )
        		|| ( myPlatform.substr(0,2) === "iP")
        		|| (DigiWebApp.SettingsController.getSetting('debug'))
        		|| ( ( deviceversion.substr(0,1) >= 4 ) && ( deviceplatform.substr(0,7) >= "Android" ) && (DigiWebApp.SettingsController.getSetting('debug')) )
        	) {
    		try { $('#' + pageid).bind(eventType + 'move', DigiWebApp.WipeController.wipeOnTouchMove); } catch (e) { console.log("error while binding " + eventType + "move for " + pageid);}
    		if (eventType === "touch") {
    			//console.log("binding touchstop for pageid " + pageid);
    			try { $('#' + pageid).bind('touchstop', DigiWebApp.WipeController.wipeOnMoveStop); } catch (e) { console.log("error while binding touchstop for " + pageid);};
    		} else if (eventType === "mouse") {
    			//console.log("binding mouseup for pageid " + pageid);
    			try { $('#' + pageid).bind('mouseup', DigiWebApp.WipeController.wipeOnMoveStop); } catch (e) { console.log("error while binding mouseup for " + pageid);};
    		} else {
    			console.log("unknown eventtype: " + ev.type);
    		}
        } else {
        	if (DigiWebApp.SettingsController.getSetting('debug')) console.log("skipping touchmove");
        }
	}
	
});

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: MediaPageController
// ==========================================================================

DigiWebApp.DemoMediaPageController = M.Controller.extend({

    events: {
		pagebeforeshow: {
    		target: this,
    		action: 'init'
		}
	},

    items: null,

    latestId: null,

    init: function(isFirstLoad) {
        if(DigiWebApp.DemoMediaPage.needsUpdate) {
            var items = [];
                        
            // Start::TakePicture (400)
            if (DigiWebApp.SettingsController.featureAvailable('400')) {
            	if (DigiWebApp.SettingsController.getSetting('debug')) console.log("enabling Feature 400 (TakePicture)");
                items.push({
                    label: M.I18N.l('takePicture'),
                    icon: 'icon_takePicture.png',
                    id: 'camera'
                });
            }
            // End::TakePicture

            // Start::RecordAudio (401)
            if (DigiWebApp.SettingsController.featureAvailable('401')) {
            	if (DigiWebApp.SettingsController.getSetting('debug')) console.log("enabling Feature 401 (RecordAudio)");
                items.push({
                    label: M.I18N.l('recordAudio'),
                    icon: 'icon_recordAudio.png',
                    id: 'audio'
                });
            }
            // End::RecordAudio

            this.set('items', items);
            DigiWebApp.DemoMediaPage.needsUpdate = false;
        }

        var list = M.ViewManager.getView('mediaPage', 'list');
        if(list) {
            $('#' + list.id).find('li').each(function() {
                $(this).removeClass('selected');
            });
        }
    },

    itemSelected: function(id, m_id) {
        if(this.latestId) {
            $('#' + this.latestId).removeClass('selected');
        }
        $('#' + id).addClass('selected');

        this.latestId = id;

        if(m_id && typeof(this[m_id]) === 'function') {
            this[m_id]();
        }
    },

    camera: function() {
        DigiWebApp.NavigationController.toDemoCameraPageTransition();
    },

    audio: function() {
        DigiWebApp.NavigationController.toDemoAudioPageTransition();
    }
    
});

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: AudioController
// ==========================================================================

DigiWebApp.DemoAudioController = M.Controller.extend({

	/*
	 * http://docs.phonegap.com/en/1.0.0/phonegap_media_media.md.html
	 */
	
    myAudioObject: {},
    myTimeStamp: null,
    myFilename: null,
    myState: null,

    /*
    * Sample function
    * To handle the first load of a page.
    */
    init: function(isFirstLoad) {
    	if (DigiWebApp.SettingsController.getSetting('debug')) console.log('init');
    	if (DigiWebApp.SettingsController.getSetting('debug')) console.log('this.myState = ' + this.myState);
		if(isFirstLoad) {
            /* do something here, when page is loaded the first time. */
        }
        /* do something, for any other load. */

		// rewire audioIcon for record
    	DigiWebApp.DemoAudioPage.content.grid.button.events = { tap: { action: DigiWebApp.DemoAudioController.recordAudio } };
    	DigiWebApp.DemoAudioPage.content.grid.button.registerEvents();
    	DigiWebApp.DemoAudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.DemoAudioController.recordAudio } };
		//DigiWebApp.DemoAudioPage.content.audioIcon.events = { tap: { target: DigiWebApp.DemoAudioController, action: 'recordAudio' } };
    	DigiWebApp.DemoAudioPage.content.audioIcon.registerEvents();
    	//DigiWebApp.DemoAudioPage.content.audioIcon.value = 'file:///android_asset/www/theme/images/icon_record.png';
    	//DigiWebApp.DemoAudioPage.content.audioIcon.renderUpdate();
    	document.getElementById(DigiWebApp.DemoAudioPage.content.audioIcon.id).src = 'theme/images/icon_record.png';

    	
        this.myTimeStamp = M.Date.create(new Date()).format('yymmddHHMMss');
        this.myFilename = 'DIGI-WebApp-recording-' + this.myTimeStamp + '.wav';
        this.myState = null;
    	
        DigiWebApp.DemoAudioController.myAudioObject = new Media(this.myFilename, this.onSuccess, this.onError, this.mediaStatus, this.mediaPosition);
        if (DigiWebApp.SettingsController.getSetting('debug')) console.log(this.myFilename);
        if (DigiWebApp.SettingsController.getSetting('debug')) console.log(DigiWebApp.DemoAudioController.myAudioObject);
    	
    },

    mediaStatus: function(status) {
    	if (DigiWebApp.SettingsController.getSetting('debug')) console.log('mediaStatus: ' + status);
    },
    
    mediaPosition: function(position) {
    	if (DigiWebApp.SettingsController.getSetting('debug')) console.log('mediaPosition: ' + position);
    },
    
    onSuccess: function() {
    	if (DigiWebApp.SettingsController.getSetting('debug')) console.log('onSuccess');
    	if (DigiWebApp.SettingsController.getSetting('debug')) console.log('this.myState = ' + this.myState);
		switch(this.myState) {
			case 'play':
				
				// rewire audioIcon for stopPlayback
				DigiWebApp.DemoAudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.DemoAudioController.stopPlayback } };
				DigiWebApp.DemoAudioPage.content.audioIcon.registerEvents();
				document.getElementById(DigiWebApp.DemoAudioPage.content.audioIcon.id).src = 'theme/images/icon_stop.png';
				
				break;
				
			case 'record':
				
				// rewire audioIcon for stopRecord
		    	DigiWebApp.DemoAudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.DemoAudioController.stopRecord } };
		    	DigiWebApp.DemoAudioPage.content.audioIcon.registerEvents();
		    	document.getElementById(DigiWebApp.DemoAudioPage.content.audioIcon.id).src = 'theme/images/icon_stop.png';

		    	// rewire digi-button to setup a new recording
		    	DigiWebApp.DemoAudioPage.content.grid.button.events = { tap: { action: DigiWebApp.DemoAudioController.init } };
		    	DigiWebApp.DemoAudioPage.content.grid.button.registerEvents();

		    	break;
		    	
			case 'stop':
				
				// rewire audioIcon for playbackAudio
				DigiWebApp.DemoAudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.DemoAudioController.playbackAudio } };
				DigiWebApp.DemoAudioPage.content.audioIcon.registerEvents();
				document.getElementById(DigiWebApp.DemoAudioPage.content.audioIcon.id).src = 'theme/images/icon_playbackAudio.png';
				
				break;
				
			default:

				// rewire audioIcon for playbackAudio
				DigiWebApp.DemoAudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.DemoAudioController.playbackAudio } };
				DigiWebApp.DemoAudioPage.content.audioIcon.registerEvents();
				document.getElementById(DigiWebApp.DemoAudioPage.content.audioIcon.id).src = 'theme/images/icon_playbackAudio.png';

				break;
		}
    },
    
    onError: function(error) {
    	if (DigiWebApp.SettingsController.getSetting('debug')) console.log('onError');
    	console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    	console.log('Filename: ' + this.myFilename);
    	
    	// rewire audioIcon for playbackAudio
    	DigiWebApp.DemoAudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.DemoAudioController.playbackAudio } };
    	DigiWebApp.DemoAudioPage.content.audioIcon.registerEvents();
    	document.getElementById(DigiWebApp.DemoAudioPage.content.audioIcon.id).src = 'theme/images/icon_playbackAudio.png';

    	// rewire digi-button to setup a new recording
    	DigiWebApp.DemoAudioPage.content.grid.button.events = { tap: { action: DigiWebApp.DemoAudioController.init } };
    	DigiWebApp.DemoAudioPage.content.grid.button.registerEvents();
    },
    
    recordAudio: function() {
    	this.myState = 'record';
    	DigiWebApp.DemoAudioController.myAudioObject.startRecord();

		// rewire audioIcon for stopRecord
    	DigiWebApp.DemoAudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.DemoAudioController.stopRecord } };
    	DigiWebApp.DemoAudioPage.content.audioIcon.registerEvents();
    	document.getElementById(DigiWebApp.DemoAudioPage.content.audioIcon.id).src = 'theme/images/icon_stop.png';

    	// rewire digi-button to setup a new recording
    	DigiWebApp.DemoAudioPage.content.grid.button.events = { tap: { action: DigiWebApp.DemoAudioController.init } };
    	DigiWebApp.DemoAudioPage.content.grid.button.registerEvents();

		if (DigiWebApp.SettingsController.getSetting('debug')) console.log('recordAudio');
    	if (DigiWebApp.SettingsController.getSetting('debug')) console.log('this.myState = ' + this.myState);
    },
   
    stopRecord: function() {
    	this.myState = 'stop';
    	DigiWebApp.DemoAudioController.myAudioObject.stopRecord();

    	// rewire audioIcon for playbackAudio
    	DigiWebApp.DemoAudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.DemoAudioController.playbackAudio } };
    	DigiWebApp.DemoAudioPage.content.audioIcon.registerEvents();
    	document.getElementById(DigiWebApp.DemoAudioPage.content.audioIcon.id).src = 'theme/images/icon_playbackAudio.png';

    	if (DigiWebApp.SettingsController.getSetting('debug')) console.log('stopRecord');
    	if (DigiWebApp.SettingsController.getSetting('debug')) console.log('this.myState = ' + this.myState);
    },
        
    playbackAudio: function() {
    	this.myState = 'play';
    	DigiWebApp.DemoAudioController.myAudioObject.play();

		// rewire audioIcon for stopPlayback
		DigiWebApp.DemoAudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.DemoAudioController.stopPlayback } };
		DigiWebApp.DemoAudioPage.content.audioIcon.registerEvents();
		document.getElementById(DigiWebApp.DemoAudioPage.content.audioIcon.id).src = 'theme/images/icon_stop.png';

		if (DigiWebApp.SettingsController.getSetting('debug')) console.log('playbackAudio');
    	if (DigiWebApp.SettingsController.getSetting('debug')) console.log('this.myState = ' + this.myState);
    },
    
    stopPlayback: function() {
    	this.myState = 'stop';
    	DigiWebApp.DemoAudioController.myAudioObject.stop();
    	
		// rewire audioIcon for playbackAudio
    	DigiWebApp.DemoAudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.DemoAudioController.playbackAudio } };
    	DigiWebApp.DemoAudioPage.content.audioIcon.registerEvents();
    	document.getElementById(DigiWebApp.DemoAudioPage.content.audioIcon.id).src = 'theme/images/icon_playbackAudio.png';

    	if (DigiWebApp.SettingsController.getSetting('debug')) console.log('stopPlayback');
    	if (DigiWebApp.SettingsController.getSetting('debug')) console.log('this.myState = ' + this.myState);
    }
});

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: CameraController
// ==========================================================================

DigiWebApp.DemoCameraController = M.Controller.extend({

    init: function(isFirstLoad) {
		
        if(isFirstLoad) {
            /* do something here, when page is loaded the first time. */
        }
        /* do something, for any other load. */
        if (       typeof navigator.device !== 'undefined' 
        		&& typeof navigator.device.capture !== 'undefined' 
        		&& typeof navigator.device.capture.captureImage !== 'undefined'
        	) {
        	// camera probably available
        	$('#' + DigiWebApp.DemoCameraPage.content.takePictureGrid.id).show();
        } else {
        	$('#' + DigiWebApp.DemoCameraPage.content.takePictureGrid.id).hide();
        }
    },
      
    takePicture: function() {
    		navigator.camera.getPicture(
    			  DigiWebApp.DemoCameraController.cameraSuccessBase64
    			, DigiWebApp.DemoCameraController.cameraError
    			, { 
    				  quality: 40
    			//	, allowEdit: true
    				, destinationType: navigator.camera.DestinationType.DATA_URL
    			//	, destinationType: navigator.camera.DestinationType.FILE_URI
    			//	, sourceType: navigator.camera.PictureSourceType.CAMERA 
    			  }
    		);    	
    },
        	
    myImageData: null,
    myImageObj: null,
    cameraSuccessBase64: function(imageData) {
        //alert("success");
    	//DigiWebApp.DemoCameraController.myImageData = imageData;
        var image = document.getElementById(DigiWebApp.DemoCameraPage.content.image.id);
        image.src = 'data:image/jpeg;base64,' + imageData;

        //DigiWebApp.DemoCameraController.myImageObj = new Image();
        //DigiWebApp.DemoCameraController.myImageObj.src = 'data:image/jpeg;base64,' + imageData;
    },

    myImageURI: null,
    cameraSuccessURI: function(imageURI) {
        //alert("success");
    	//DigiWebApp.DemoCameraController.myImageURI = imageURI;
        var image = document.getElementById(DigiWebApp.DemoCameraPage.content.image.id);
        image.src = imageURI;
    },
    
    cameraError: function(mymessage) {
        DigiWebApp.ApplicationController.nativeAlertDialogView({
            title: 'ERROR',
            message: mymessage
        });
    }
    
});

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: AnwesenheitslisteController
// ==========================================================================

DigiWebApp.AnwesenheitslisteController = M.Controller.extend({

	  items: null
	
	, init: function(isFirstLoad) {
		DigiWebApp.RequestController.getDatabaseServer(DigiWebApp.AnwesenheitslisteController.initWithServer, isFirstLoad);
	}

    , initWithServer: function(isFirstLoad) {
    	var that = DigiWebApp.AnwesenheitslisteController;
		//console.log("Anwesenheitsliste: that is ");		
		//console.log(that);		
		//console.log("Anwesenheitsliste: items is ");		
		//console.log(that.items);		
		if(that.items === null) {
			console.log("Anwesenheitsliste: showing Loader");		
			DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('AnwesenheitslisteLaden'));

			console.log("Anwesenheitsliste: find --> request");		
			DigiWebApp.Anwesenheitsliste.find({
	            urlParams: {},
	            callbacks: {
	                success: {
	                    action: function(records) {
	            			DigiWebApp.ApplicationController.DigiLoaderView.hide();
	                        if(records && records.length === 0) {
	                    		console.log("Anwesenheitsliste: error length==0");		
	            		        DigiWebApp.ApplicationController.nativeAlertDialogView({
	            		            title: M.I18N.l('error'),
	            		            message: M.I18N.l('AnwesenheitslisteKonnteNichtGeladenWerden'),
	            		            callbacks: {
	            		                confirm: {
	            		                    target: that,
	            		                    action: function () {
	            		        				DigiWebApp.NavigationController.backToDashboardPageFlipTransition();
	            		                    }
	            		                }
	            		            }
	            		        });
	                        } else {
	                    		console.log("Anwesenheitsliste: success");		
	                        	DigiWebApp.AnwesenheitslisteController.set('items', records);
	                            //M.Controller.switchToPage(M.ViewManager.getPage('page2'));
	                        }
	                    }
	                },
	                error: {
	                    action: function(request, error) {
	        				DigiWebApp.ApplicationController.DigiLoaderView.hide();
	                		console.log("Anwesenheitsliste: error request failed");		
	        		        DigiWebApp.ApplicationController.nativeAlertDialogView({
	        		            title: M.I18N.l('error'),
	        		            message: M.I18N.l('AnwesenheitslisteKonnteNichtGeladenWerden'),
	        		            callbacks: {
	        		                confirm: {
	        		                    target: that,
	        		                    action: function () {
		        							DigiWebApp.NavigationController.backToDashboardPageFlipTransition();
	        		                    }
	        		                }
	        		            }
	        		        });
	                    }
	                }
	            }
	        });    	
        }
		
    }

});

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: ZeitbuchungenController
// ==========================================================================

DigiWebApp.ZeitbuchungenController = M.Controller.extend({

	  items: null
	
	, datum: null
	
	, mitarbeiterID: null
	
	, mitarbeiterNameVorname: null
	
	, init: function(isFirstLoad) {
		DigiWebApp.RequestController.getDatabaseServer(DigiWebApp.ZeitbuchungenController.initWithServer, isFirstLoad);
	}

    , initWithServer: function(isFirstLoad) {
		if(isFirstLoad) {
            /* do something here, when page is loaded the first time. */
        }

		if (DigiWebApp.ZeitbuchungenController.mitarbeiterNameVorname !== null) { 
			//DigiWebApp.ZeitbuchungenPage.header.title.set("value", M.I18N.l('Zeitbuchungen') + ": " + DigiWebApp.ZeitbuchungenController.mitarbeiterNameVorname);
			DigiWebApp.ZeitbuchungenPage.header.title.set("value", DigiWebApp.ZeitbuchungenController.mitarbeiterNameVorname);
			DigiWebApp.ZeitbuchungenPage.header.title.renderUpdate();
		}
		
		console.log("Zeitbuchungen: showing Loader");		
		DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('ZeitbuchungenLaden'));

		console.log("Zeitbuchungen: find --> request");		
		DigiWebApp.Zeitbuchungen.find({
            urlParams: {
				  datum: DigiWebApp.ZeitbuchungenController.datum
				, mitarbeiterID: DigiWebApp.ZeitbuchungenController.mitarbeiterID
			},
            callbacks: {
                success: {
                    action: function(records) {
						console.log(records);
            			DigiWebApp.ApplicationController.DigiLoaderView.hide();
            			try {
	                        if ((!records) || (records && records.length === 0) || (records && records.length === 1 && typeof(records[0].get('mitarbeiterId')) === "undefined")) {
	                    		console.log("Zeitbuchungen: error");		
	            		        DigiWebApp.ApplicationController.nativeAlertDialogView({
	            		            title: M.I18N.l('error'),
	            		            message: M.I18N.l('ZeitbuchungenKonntenNichtGeladenWerden'),
	            		            callbacks: {
	            		                confirm: {
	            		                    target: this,
	            		                    action: function () {
	            		        				DigiWebApp.NavigationController.backToAnwesenheitslistePageTransition();
	            		                    }
	            		                }
	            		            }
	            		        });
	                        } else {
	                    		console.log("Zeitbuchungen: success");		
	                        	DigiWebApp.ZeitbuchungenController.set('items', records);
	                            //M.Controller.switchToPage(M.ViewManager.getPage('page2'));
	                        }
            			} catch(e) {
            		        DigiWebApp.ApplicationController.nativeAlertDialogView({
            		            title: M.I18N.l('error'),
            		            message: M.I18N.l('ZeitbuchungenKonntenNichtGeladenWerden'),
            		            callbacks: {
            		                confirm: {
            		                    target: this,
            		                    action: function () {
            		        				DigiWebApp.NavigationController.backToAnwesenheitslistePageTransition();
            		                    }
            		                }
            		            }
            		        });
            			}
                    }
                },
                error: {
                    action: function(request, error) {
        				DigiWebApp.ApplicationController.DigiLoaderView.hide();
                		console.log("Zeitbuchungen: error request failed");		
        		        DigiWebApp.ApplicationController.nativeAlertDialogView({
        		            title: M.I18N.l('error'),
        		            message: M.I18N.l('ZeitbuchungenKonntenNichtGeladenWerden'),
        		            callbacks: {
        		                confirm: {
        		                    target: this,
        		                    action: function () {
	        							DigiWebApp.NavigationController.backToAnwesenheitslistePageTransition();
        		                    }
        		                }
        		            }
        		        });
                    }
                }
            }
        });    	
    }

});

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: EditPicturePageController
// ==========================================================================

DigiWebApp.EditPicturePageController = M.Controller.extend({

  // MediaFile das bearbeitet werden soll
	myMediaFile: null 
	
  // arrays for selection lists
  , orders: null
  , positions: null
  , activities: null

  , selections: {
        order: null
      , position: null
      , activity: null
  }

  , deleteMediaFileFromLocalStorage: function() {
	  var that = this;
	  var myMediaFile = DigiWebApp.EditPicturePageController.myMediaFile;
	  console.log(myMediaFile);
	  try {
		  myMediaFile.del();
	  } catch(e) {}
	  DigiWebApp.ApplicationController.DigiLoaderView.hide();
	  DigiWebApp.NavigationController.backToMediaListPageTransition();
  }

  , init: function(isFirstLoad) {
	  var that = this;
		
      if(isFirstLoad) {
          /* do something here, when page is loaded the first time. */
      }

	  $('#' + DigiWebApp.EditPicturePage.content.remarkInput.id).val("");
	  M.ViewManager.getView('editPicturePage', 'remarkInput').value = "";
	  $('#' + DigiWebApp.EditPicturePage.content.remarkInput.id).val(that.myMediaFile.get('remark'));
	  M.ViewManager.getView('editPicturePage', 'remarkInput').value = that.myMediaFile.get('remark');

      var image = document.getElementById(DigiWebApp.EditPicturePage.content.image.id);
      image.src = '';
      DigiWebApp.EditPicturePageController.myImageObj = new Image();
      that.myMediaFile.readFromFile(function(fileContent){
			if (fileContent && (fileContent !== "")) {
			      var image = document.getElementById(DigiWebApp.EditPicturePage.content.image.id);
			      image.src = fileContent;
			}
	  });

      /* do something, for any other load. */
      
      $('#' + DigiWebApp.EditPicturePage.content.savePictureGrid.id).show();
      DigiWebApp.EditPicturePageController.setSelectionByMediaFile();
	  DigiWebApp.ApplicationController.DigiLoaderView.hide();
}

  , setSelectionByMediaFile: function() {
	  var that = this;
      
      // get all items from local storage
      var orders = DigiWebApp.HandOrder.findSorted().concat(DigiWebApp.Order.findSorted()); // we need to check handOrders also
      var positions = DigiWebApp.Position.findSorted();
      var activities = DigiWebApp.EditPicturePageController.getActivities();

      // get the ids from the current MediaFile
      var orderId    = that.myMediaFile.get('orderId');
      var positionId = that.myMediaFile.get('positionId');
      var activityId = that.myMediaFile.get('activityId');

      
      /**
       * ORDERS
       */
      var orderFound = NO;
      var orderArray = null;
      var orderTempArray = _.map(orders, function(order) {
       	  var obj = null;
          if(order.get('id') == orderId) {
              obj = { label: order.get('name'), value: order.get('id'), isSelected: YES };
              orderFound = YES;
          } else {
        	  obj = { label: order.get('name'), value: order.get('id') };
          }
          return obj;
      });
      orderTempArray = _.compact(orderTempArray);
      // push "Bitte wählen Option"
      orderTempArray.push({label: M.I18N.l('selectSomething'), value: '0'});

      if (orderFound === NO) {
	      var orderTemp2Array = _.map(orderTempArray, function(order) {
	       	  var obj = null;
	          if(order.value == orderId) {
	              obj = { label: order.label, value: order.value, isSelected: YES };
	          } else {
	        	  obj = { label: order.label, value: order.value };
	          }
	          return obj;
	      });
	      orderArray = orderTemp2Array;
      } else {
    	  orderArray = orderTempArray;
      }
      orderArray = _.compact(orderArray);

      
      /**
       * POSITIONS
       */
      var positionArray = _.map(positions, function(pos) {
          if(pos.get('orderId') === orderId) {
          	var obj = null;
              if(pos.get('id') === positionId) {
                  obj = { label: pos.get('name'), value: pos.get('id'), isSelected: YES };
              } else {
                  obj = { label: pos.get('name'), value: pos.get('id') };
              }
              return obj;
          }
          return null;
      });
      positionArray = _.compact(positionArray);
      // push "Bitte wählen Option"
      positionArray.push({label: M.I18N.l('selectSomething'), value: '0'});


      /**
       * ACTIVITIES
       */
      var workPlans = _.select(DigiWebApp.WorkPlan.find(), function(wp) {
          return wp.get('id') == positionId;
      });

      var itemSelected = NO;

      /* if a workplan exists, only use those activities that are in the workplan */
      if(workPlans.length > 0) {
          activities = this.getActivitiesFromWorkplan(workPlans[0]);
      } else {
          activities = DigiWebApp.EditPicturePageController.getActivities();
      }

      var activityArray = _.map(activities, function(act) {
      	if ( typeof(act) === "undefined" ) {
      		console.log("UNDEFINED ACTIVITY");
      		return null;
      	} else {
      		var obj = null;
      		if(act.get('id') == activityId) {
      			obj = { label: act.get('name'), value: act.get('id'), isSelected: YES };
      			//console.log("ACTIVITY " + i + " = " + act.get('name') + " in setSelectionByMediaFile isSelected");
      			itemSelected = YES;
      		} else {
      			obj = { label: act.get('name'), value: act.get('id') };
      			//console.log("ACTIVITY " + i + " = " + act.get('name') + " in setSelectionByMediaFile");
      		}
      		return obj;
      	}
      });
      activityArray = _.compact(activityArray);
      activityArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:!itemSelected});

      this.resetSelection();
      // set selection arrays to start content binding process
      this.set('orders', orderArray);
      this.set('positions', positionArray);
      this.set('activities', activityArray);
  }

  , setPositions: function() {
      var orderId = M.ViewManager.getView('editPicturePage', 'order').getSelection(YES).value;
      if(!orderId) {
          return;
      }
//      M.ViewManager.getView('editPicturePage', 'position').removeSelection(); /* to avoid bug of not setting selected... */
      var positions = DigiWebApp.Position.findSorted();

      var i = 0;
      positions = _.map(positions, function(pos) {
          if(pos.get('orderId') === orderId) {
              var obj = { label: pos.get('name'), value: pos.get('id') };
              if(i === 0) {
                  obj.isSelected = YES;
              }
              i += 1;
              return obj;
          }
          return null;
      });
      positions = _.compact(positions);/* remove falsy values from positions with _.compact() */

      if(positions.length < 1) {
          positions.push({label: M.I18N.l('noData'), value: '0'});
      }


      M.ViewManager.getView('editPicturePage', 'position').resetSelection();
      this.set('positions', positions);
      this.setActivities(YES);

      this.saveSelection();
  }

  /* only set those activities that are related to the chosen position */
  , setActivities: function(checkForWorkPlan) {
      var posId = null;

      if(checkForWorkPlan) {
          var posObj = M.ViewManager.getView('editPicturePage', 'position').getSelection(YES);
          if(posObj) {
              posId = posObj.value;
          }
      }

      var activities = [];
      //var workPlans = DigiWebApp.WorkPlan.find({query: 'id=' + posId}); // pre TMP-1.0
		//console.log("posId " + posId);
      var workPlans = DigiWebApp.WorkPlan.find({ query: { 
          identifier: 'id', 
          operator: '=', 
          value: posId 
      }});
      var i = 0;

      /* if a workplan exists, only use those activities that are in the workplan */
		//console.log("posId " + posId + ", workPlans.length " + workPlans.length);
      if (workPlans.length === 1) {
          activities = this.getActivitiesFromWorkplan(workPlans[0]);
      } else {
          activities = DigiWebApp.EditPicturePageController.getActivities();
      }

      var currentBookingActivityId = -1;
//      if ( typeof(DigiWebApp.BookingController.currentBooking) !== "undefined" && DigiWebApp.BookingController.currentBooking !== null ) { 
//      	currentBookingActivityId = DigiWebApp.BookingController.currentBooking.get('activityId');
//      }
		var currentBookingActivitySelectable = false;
		_.each(activities, function(act) {
      	if ( typeof(act) === "undefined" ) {
      		console.log("UNDEFINED ACTIVITY");
      		return null;
      	} else {
				if ( act.get('id') === currentBookingActivityId ) { currentBookingActivitySelectable = true; }
			}
		});
		
      activities = _.map(activities, function(act) {
      	if ( typeof(act) === "undefined" ) {
      		console.log("UNDEFINED ACTIVITY");
      		return null;
      	} else {
      		var obj = null;
      		if (currentBookingActivitySelectable) {
      			obj = { label: act.get('name'), value: act.get('id'), isSelected: act.get('id') === currentBookingActivityId ? YES : NO };
      		} else {
      			obj = { label: act.get('name'), value: act.get('id'), isSelected: i === 0 ? YES : NO };
      		}
      		//console.log("ACTIVITY " + i + " = " + act.get('name') + " in setActivities");
              i += 1;
              return obj;
      	}
      });

      activities = _.compact(activities);

      // new to show this when closing day is pressed (corresponds to a reset)
      if(activities.length > 0) {
          activities.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:NO});
      } else {
          activities.push({label: M.I18N.l('noData'), value: '0'});
      }


      M.ViewManager.getView('editPicturePage', 'activity').resetSelection();
      this.set('activities', activities);

      this.saveSelection();
  }

  , initSelection: function() {
     var orders = DigiWebApp.HandOrder.findSorted().concat(DigiWebApp.Order.findSorted()); // we need to check handOrders also
     var positions = DigiWebApp.Position.findSorted();
     var activities = DigiWebApp.EditPicturePageController.getActivities();

     /**
      * ORDERS
      */

     // create order selection
     var orderArray = [];
     if(orders){
         orderArray = _.map(orders, function(order) {
             return { label: order.get('name'), value: order.get('id') };
         });
     }
     // push "Bitte wählen Option"
     orderArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:YES});

     /**
      * POSITIONS
      */

     // create position selection
     var positionArray = [];
     if(positions){
         positionArray = _.map(positions, function(pos) {
             return { label: pos.get('name'), value: pos.get('id') };
         });
     }
     // push "Bitte wählen Option"
     positionArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:YES});

     /**
      * ACTIVITIES
      */
     var activityArray = [];
     if(activities){
          activityArray = _.map(activities, function(act) {
          	if ( typeof(act) === "undefined" ) {
          		console.log("UNDEFINED ACTIVITY");
          		return null;
          	} else {
          		return obj = { label: act.get('name'), value: act.get('id') };
          	}
         });
     }
     // push "Bitte wählen Option"
     activityArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected: YES});


      this.resetSelection();
      // set selection arrays to start content binding process
      this.set('orders', orderArray);
      this.set('positions', positionArray);
      this.set('activities', activityArray);
      M.ViewManager.getView('editPicturePage', 'order').setSelection('0');
      M.ViewManager.getView('editPicturePage', 'position').setSelection('0');
      M.ViewManager.getView('editPicturePage', 'activity').setSelection('0');
  }
  
  , resetSelection: function() {
      M.ViewManager.getView('editPicturePage', 'order').resetSelection();
      M.ViewManager.getView('editPicturePage', 'position').resetSelection();
      M.ViewManager.getView('editPicturePage', 'activity').resetSelection();
  }

  , isPositionSelected: function() {
      // implemented adjustment to M.SeletionListView to return null if no item is available
      var posObj = M.ViewManager.getView('editPicturePage', 'position').getSelection(YES);
      if(posObj && posObj.value != "0") { // 'Bitte wählen' is not allowed to be chosen
          return YES;
      } else {
          return NO;
      }
  }

  , isActivitySelected: function() {
      var actObj = M.ViewManager.getView('editPicturePage', 'activity').getSelection(YES);
      if(actObj && actObj.value != "0") { // 'Bitte wählen' is not allowed to be chosen
          return YES;
      } else {
          return NO;
      }
  }

  , saveSelection: function() {
      var orderValue = M.ViewManager.getView('editPicturePage', 'order').getSelection();
      var positionValue = M.ViewManager.getView('editPicturePage', 'position').getSelection();
      var activityValue = M.ViewManager.getView('editPicturePage', 'activity').getSelection();

      this.selections.order = orderValue;
      this.selections.position = positionValue;
      this.selections.activity = activityValue;

      this.useSelections = YES;
  }
  
  , getActivities: function(queryobj) {
  	var activities;
  	if (queryobj) {
  		activities = DigiWebApp.Activity.find(queryobj);
  	} else {
  		activities = DigiWebApp.Activity.findSorted();
  	}
  	activities = _.map(activities, function(acti) {
	    	if(acti.get("positionId") === "1") {
	            // normale Tätigkeit
	            return acti;
	         } else {
	            // Tätigkeit nur bei Arbeitsplan
	            return null;
	         }
  	});
  	activities = _.compact(activities);
  	return activities;
  }

  , getActivitiesFromWorkplan: function(workplan) {
      var actIds = workplan.get('activityIds').split(',');
      var activities = [];
      if(actIds && actIds.length > 0) {
          for(var i = 0; i < actIds.length; i++) {
              activities.push(_.first(DigiWebApp.Activity.find({ query: {
                  identifier: 'id', 
                  operator: '=', 
                  value: actIds[i] 
              }})));
          }

      }
      if (workplan.get("workplanType") === "1") {
      	// only those activities which are bound to employee
          activities = _.map(activities, function(act) {
          	if ( typeof(act) === "undefined" ) {
          		console.log("UNDEFINED ACTIVITY");
          		return null;
          	} else {
      			var zugeordnet = NO;
          		var allActivities = DigiWebApp.Activity.findSorted();
          		_.each(allActivities, function(acti) {
          			// herausfinden, ob diese Tätigkeit dem Mitarbeiter zugeordnet ist.
          			if (acti.get("positionId") === "1") {
          				zugeordnet = YES;
          			}
          		});
      			if (zugeordnet) {
      				return act;
      			} else {
      				return null;	
      			}
          	}
          });
      };
      activities = _.compact(activities);
      return activities;
  }

  , savePicture: function() {
  	var that = this;
  	
  	that.saveSelection();
  	
		var orderId = M.ViewManager.getView('editPicturePage', 'order').getSelection();
		
		var posObj = M.ViewManager.getView('editPicturePage', 'position').getSelection(YES);
		var posId = posObj ? posObj.value : null;
	
		var actObj = M.ViewManager.getView('editPicturePage', 'activity').getSelection(YES);
		var actId = actObj ? actObj.value : null;

	    var handOrderId = null;
	    var handOrderName = null;
	    if(DigiWebApp.BookingController.isHandOrder(orderId)) {
			handOrderId = orderId;
			handOrderName = _.select(DigiWebApp.HandOrder.find(), function(ord) {
			    return ord.get('id') === orderId || ord.get('name') === orderId;
			})[0].get('name');
			orderId = null;
	
			// a hand order has no position
			posId = null;
	    }

	    var myMediaFile = that.myMediaFile;
		myMediaFile.set('orderId', orderId);
		myMediaFile.set('handOrderId', handOrderId);
		myMediaFile.set('handOrderName', handOrderName);
		myMediaFile.set('positionId', posId);
		myMediaFile.set('activityId', actId);
		myMediaFile.set('remark', M.ViewManager.getView('editPicturePage', 'remarkInput').value);
	    
	    var image = document.getElementById(DigiWebApp.EditPicturePage.content.image.id);

	    myMediaFile.set('fileType', 'image/jpeg;base64');
	    myMediaFile.save();
	    myMediaFile.saveToFile(image.src, function() {
		      DigiWebApp.ApplicationController.DigiLoaderView.hide();
		      DigiWebApp.NavigationController.backToMediaListPageTransition();
	    });

  }

//  , paintMoveEvent: null
//  
//  , paintOnCanvasStopPaint: function(ev) {
//  	//console.log("paintOnCanvasStopPaint");    	
//  	ev.preventDefault();
//  	
//  	//context = document.getElementById(DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).getContext("2d");
//  	//context.stroke();
//
//		$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('touchmove', DigiWebApp.EditPicturePageController.paintOnCanvasPaint);    	
//		$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('mousemove', DigiWebApp.EditPicturePageController.paintOnCanvasPaint);    	
//		$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('touchstop', DigiWebApp.EditPicturePageController.paintOnCanvasStopPaint);
//		$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('mouseup',   DigiWebApp.EditPicturePageController.paintOnCanvasStopPaint);
//  }
//  
//  , paintOnCanvasStartMove: function(ev) {
//  	console.log("paintOnCanvasStartMove");
//  	ev.preventDefault();
//  	//ev.stopPropagation();
//  	
//  	var canvas = document.getElementById(DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id);
//
//  	if (canvas.getContext) {
//  		DigiWebApp.EditPicturePageController.myImageTouchPos = DigiWebApp.EditPicturePageController.getCoordinates(ev);
//	
//  		$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('touchmove', DigiWebApp.EditPicturePageController.paintOnCanvasMove);    	
//  		$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('mousemove', DigiWebApp.EditPicturePageController.paintOnCanvasMove);    	
//  		$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('touchstop', DigiWebApp.EditPicturePageController.paintOnCanvasStopMove);
//  		$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('mouseup',   DigiWebApp.EditPicturePageController.paintOnCanvasStopMove);
//	    	$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).bind('touchmove', DigiWebApp.EditPicturePageController.paintOnCanvasMove);
//			$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).bind('mousemove', DigiWebApp.EditPicturePageController.paintOnCanvasMove);
//			$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).bind('touchstop', DigiWebApp.EditPicturePageController.paintOnCanvasStopMove);
//			$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).bind('mouseup',   DigiWebApp.EditPicturePageController.paintOnCanvasStopMove);
//  	}
//  }
//  
//  , paintOnCanvasStopMove: function(ev) {
//  	console.log("paintOnCanvasStopMove");    	
//  	ev.preventDefault();
//  	//ev.stopPropagation();
//		DigiWebApp.EditPicturePageController.myImageTouchPos = [0, 0];
//		$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('touchmove', DigiWebApp.EditPicturePageController.paintOnCanvasMove);    	
//		$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('mousemove', DigiWebApp.EditPicturePageController.paintOnCanvasMove);    	
//		$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('touchstop', DigiWebApp.EditPicturePageController.paintOnCanvasStopMove);
//		$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('mouseup',   DigiWebApp.EditPicturePageController.paintOnCanvasStopMove);
//  }
//  
//  , myImageTouchPos: [0, 0]
//  , myImageTopLeft: [0, 0]
//  , myImageBottomRight: [0, 0]
//  , myImageScaleFactor: 2
//  , paintOnCanvasMove: function(ev) {
//  	console.log("paintOnCanvasMove");    	
//  	ev.preventDefault();
//  	//ev.stopPropagation();
//
//  	var image = document.getElementById(DigiWebApp.EditPicturePage.content.image.id);
//      var canvas = document.getElementById(DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id);
//
//  	if (canvas.getContext) {
//  		var coord = DigiWebApp.EditPicturePageController.getCoordinates(ev);
//			var x = coord[0];
//			var y = coord[1];
//			var dx = DigiWebApp.EditPicturePageController.myImageTouchPos[0] - coord[0];
//			var dy = DigiWebApp.EditPicturePageController.myImageTouchPos[1] - coord[1];
//			//console.log(dx + ", " + dy);
//			DigiWebApp.EditPicturePageController.myImageTouchPos[0] = coord[0];
//			DigiWebApp.EditPicturePageController.myImageTouchPos[1] = coord[1];
//			//console.log("DigiWebApp.EditPicturePageController.myImageTouchPos " + DigiWebApp.EditPicturePageController.myImageTouchPos[0] + ", " + DigiWebApp.EditPicturePageController.myImageTouchPos[1]);
//			var context = canvas.getContext("2d");
//			if ((DigiWebApp.EditPicturePageController.myImageTopLeft[0] + dx) > 0 && (DigiWebApp.EditPicturePageController.myImageTopLeft[0] + dx) < image.width) {
//	    		DigiWebApp.EditPicturePageController.myImageTopLeft[0] = DigiWebApp.EditPicturePageController.myImageTopLeft[0] + dx;
//	    		//DigiWebApp.EditPicturePageController.myImageBottomRight[0] = DigiWebApp.EditPicturePageController.myImageBottomRight[0] + dx;
//			}
//			if ((DigiWebApp.EditPicturePageController.myImageTopLeft[1] + dy) > 0 && (DigiWebApp.EditPicturePageController.myImageTopLeft[1] + dy) < image.height) {
//	    		DigiWebApp.EditPicturePageController.myImageTopLeft[1] = DigiWebApp.EditPicturePageController.myImageTopLeft[1] + dy;
//	    		//DigiWebApp.EditPicturePageController.myImageBottomRight[1] = DigiWebApp.EditPicturePageController.myImageBottomRight[1] + dy;
//			}
//  				
//  		context.drawImage(image,DigiWebApp.EditPicturePageController.myImageTopLeft[0],DigiWebApp.EditPicturePageController.myImageTopLeft[1],canvas.width * DigiWebApp.EditPicturePageController.myImageScaleFactor,canvas.height * DigiWebApp.EditPicturePageController.myImageScaleFactor,0,0,canvas.width,canvas.height);
//  	}
//  }
//  
//  , paintOnCanvasStartPaint: function(ev) {
//  	//console.log("paintOnCanvasStartPaint");    	
//  	ev.preventDefault();
//  	//ev.stopPropagation();
//  	
//  	var canvas = document.getElementById(DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id);
//
//  	if (canvas.getContext) {
//  		var coord = DigiWebApp.EditPicturePageController.getCoordinates(ev);
//			var x = coord[0];
//			var y = coord[1];
//	
//	    	var context = canvas.getContext("2d");
//			context.beginPath();
//			context.strokeStyle = "#f00";
//			context.lineWidth = 5;
//			context.lineCap = "round";
//			context.lineJoin = "round";
//			context.moveTo(x, y);
//	
//	    	$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('touchmove', DigiWebApp.EditPicturePageController.paintOnCanvasPaint);
//			$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('mousemove', DigiWebApp.EditPicturePageController.paintOnCanvasPaint);
//			$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('touchstop', DigiWebApp.EditPicturePageController.paintOnCanvasStopPaint);
//			$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('mouseup',   DigiWebApp.EditPicturePageController.paintOnCanvasStopPaint);
//	    	$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).bind('touchmove', DigiWebApp.EditPicturePageController.paintOnCanvasPaint);
//			$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).bind('mousemove', DigiWebApp.EditPicturePageController.paintOnCanvasPaint);
//			$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).bind('touchstop', DigiWebApp.EditPicturePageController.paintOnCanvasStopPaint);
//			$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).bind('mouseup',   DigiWebApp.EditPicturePageController.paintOnCanvasStopPaint);
//  	}
//  }
//  
//  , getCoordinates: function(ev) {
//  	var x = 0;
//  	var y = 0;
//		// Get the mouse position relative to the canvas element.
//      if (typeof(ev.touches) !== "undefined") {
//      	//console.log("touchstart: using ev.touches[0]");
//      	x = ev.touches[0].pageX - ev.touches[0].target.offsetLeft;
//      	y = ev.touches[0].pageY - ev.touches[0].target.offsetTop;
//      } else if (typeof(ev.originalEvent) !== "undefined") {
//  		if (typeof(ev.originalEvent.touches) !== "undefined") {
//      		x = ev.originalEvent.touches[0].pageX - ev.originalEvent.touches[0].target.offsetLeft;
//      		y = ev.originalEvent.touches[0].pageY - ev.originalEvent.touches[0].target.offsetTop;
//      		//console.log(x + ", " + y);
//  		}
//  	} else {
//  		x = ev.offsetX;
//  		y = ev.offsetY;
//  	}
//      return [x, y];
//  }
//  
//  , paintOnCanvasPaint: function(ev) {
//  	//console.log("paintOnCanvasPaint");
//  	ev.preventDefault();
//  	//ev.stopPropagation();
//  	
//  	// save event for easier debugging
//  	DigiWebApp.EditPicturePageController.paintMoveEvent = ev;
//
//  	var coord = DigiWebApp.EditPicturePageController.getCoordinates(ev);
//		var x = coord[0];
//		var y = coord[1];
//
//  	var context = document.getElementById(DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).getContext("2d");
//		
//		// The event handler works like a drawing pencil which tracks the mouse 
//		// movements. We start drawing a path made up of lines.
//		context.lineTo(x, y);
//		//context.stroke();
//  }
//  
//  , paintOnCanvasTouchMove: function(ev) {
//  	//console.log("paintOnCanvasTouchMove");
//  }
//  
//  , fillCanvasFromImage_var: null
//  , fillCanvasFromImage: function() {
//  	console.log("fillCanvasFromImage");
//		if (DigiWebApp.EditPicturePageController.fillCanvasFromImage_var !== null) clearTimeout(DigiWebApp.EditPicturePageController.fillCanvasFromImage_var);
//		$('#' + DigiWebApp.EditPicturePage.content.image.id).hide();
//      var canvas = document.getElementById(DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id);
//      var image = document.getElementById(DigiWebApp.EditPicturePage.content.image.id);
//      DigiWebApp.EditPicturePageController.myImageScaleFactor = image.width / canvas.width;
//		var context = canvas.getContext("2d");
//		console.log("drawing image to canvas with file");
//		context.drawImage(image,0,0,canvas.width * DigiWebApp.EditPicturePageController.myImageScaleFactor,canvas.height * DigiWebApp.EditPicturePageController.myImageScaleFactor,0,0,canvas.width,canvas.height);
//		DigiWebApp.EditPicturePageController.myImageTopLeft = [0, 0];
//  }

});

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: DashboardTemplateView
// ==========================================================================

DigiWebApp.DashboardTemplateView = M.ListItemView.design({

    isSelectable: NO

    , childViews: 'icon label'

    , events: {
        tap: {
            target: DigiWebApp.DashboardController,
            action: 'itemSelected'
        }
    }

    , icon: M.ImageView.design({
    	cssClass: 'unselectable'
        , computedValue: {
            valuePattern: '<%= icon %>'
            , operation: function(v) {
                return 'theme/images/' + v;
            }
        }
    })

    , label: M.LabelView.design({
    	cssClass: 'unselectable'
        , valuePattern: '<%= label %>'
    })

});

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: SplashViewPage
// ==========================================================================

DigiWebApp.SplashViewPage = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
    events: {
		pagebeforeshow: {
            /*target: DigiWebApp.ApplicationController,
            action: 'regSecEv'*/
            action: function() {
				if (!(window.newAppVersionAvailable || DigiWebApp.ApplicationController.useSplashJustForFade)) {
					if (navigator.platform === "BlackBerry" && restartOnBlackBerry) {
						DigiWebApp.ApplicationController.blackBerryRestart_var = setTimeout("DigiWebApp.ApplicationController.blackBerryRestart()", 3000);
					} else {
						DigiWebApp.ApplicationController.regSecEv(YES);	
					};
				}
			}
        },
		pageshow: {
            /*target: DigiWebApp.ApplicationController,
            action: 'regSecEv'*/
            action: function() {
				if (!(window.newAppVersionAvailable || DigiWebApp.ApplicationController.useSplashJustForFade)) {
						DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('waitingForDevice'));
				}
			}
        }

    },

    childViews: 'content',

    cssClass: 'splashViewPage',

    logo: M.ImageView.design({
        value:'theme/images/logo.png',
        cssClass: 'logoSplashPage'
    }),

    content: M.ScrollView.design({

        cssClass: 'infoBox',

        childViews: 'title info',

        title: M.LabelView.design({
            //value: 'DIGI-WebApp',
            value: '',
            cssClass: 'appTitle'
        }),

        info: M.LabelView.design({
            value: '',
            cssClass: 'infoMsg',
            contentBinding: {
                target: DigiWebApp.ApplicationController,
                property: 'infoMsg'
            }
        })

    })

});


// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: CameraPage
// ==========================================================================

DigiWebApp.CameraPage = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
      events: {
		pagebeforeshow: {
            target: DigiWebApp.CameraController,
            action: 'init'
        }
    }

    , cssClass: 'cameraPage'

    , childViews: 'header content'

    , savePicture: function() {
    	
    	var myRemark = '';
    	if ((M.ViewManager.getView('cameraPage', 'remarkInput').value !== null) && (typeof(M.ViewManager.getView('cameraPage', 'remarkInput').value) !== "undefined")) {
    		myRemark = M.ViewManager.getView('cameraPage', 'remarkInput').value;
    	}
    			
		if (myRemark.length > 255) {
	        DigiWebApp.ApplicationController.DigiLoaderView.hide();
    		DigiWebApp.ApplicationController.nativeAlertDialogView({
    			title: M.I18N.l('remarkTooLong'),
    			message: M.I18N.l('remarkTooLongMessage')
    		});
		} else {
			
            //if (/[[^a-zA-Z0-9_-äöüÄÖÜ,. !?;:/\\@€=]]+/.test(M.ViewManager.getView('cameraPage', 'remarkInput').value)) {
            if (DigiWebApp.ApplicationController.sonderzeichenCheck(myRemark)) {
    	        DigiWebApp.ApplicationController.DigiLoaderView.hide();
                DigiWebApp.ApplicationController.nativeAlertDialogView({
                    title: M.I18N.l('specialCharProblem'),
                    message: M.I18N.l('specialCharProblemMsg')
                });
            } else {
            	DigiWebApp.CameraController.savePicture();
            }

		}
    }

    , header: M.ToolbarView.design({
        childViews: 'backButton title',
        cssClass: 'header',
        isFixed: YES,
        backButton: M.ButtonView.design({
            value: M.I18N.l('back'),
            icon: 'arrow-l',
            anchorLocation: M.LEFT,
            events: {
                tap: {
                    target: DigiWebApp.NavigationController,
                    action: 'backToMediaListPageTransition'
                }
            }
        }),
        title: M.LabelView.design({
            value: M.I18N.l('takePicture'),
            anchorLocation: M.CENTER
        }),
        anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({
    	
          childViews: 'image spacer order position activity remarkInput savePictureGrid'

        , image: M.ImageView.design({
        		value: '',
        		cssClass: 'photo'
        })
        
        , spacer: M.LabelView.design({
        		value: ' '
        })

        , order: M.SelectionListView.design({
            selectionMode: M.SINGLE_SELECTION_DIALOG,
            initialText: M.I18N.l('noData'),
            label: M.I18N.l('order'),
            //cssClass: 'unselectable',
            applyTheme: NO,
            contentBinding: {
                target: DigiWebApp.CameraController,
                property: 'orders'
            },
            events: {
                change: {
                    target: DigiWebApp.CameraController,
                    action: function() {
                        this.setPositions();
                    }
                }
            }
        })
        
	    , position: M.SelectionListView.design({
	        selectionMode: M.SINGLE_SELECTION_DIALOG,
	        label: M.I18N.l('position'),
	        initialText: M.I18N.l('noData'),
	        //cssClass: 'unselectable',
	        applyTheme: NO,
	        contentBinding: {
	            target: DigiWebApp.CameraController,
	            property: 'positions'
	        },
	        events: {
	            change: {
	                target: DigiWebApp.CameraController,
	                action: function() {
	                    this.setActivities(YES);
	                }
	            }
	        }
	    })
	
	    , activity: M.SelectionListView.design({
	        selectionMode: M.SINGLE_SELECTION_DIALOG,
	        label: M.I18N.l('activity'),
	        initialText: M.I18N.l('noData'),
	        //cssClass: 'unselectable',
	        applyTheme: NO,
	        contentBinding: {
	            target: DigiWebApp.CameraController,
	            property: 'activities'
	        },
	        events: {
	            change: {
	                target: DigiWebApp.CameraController,
	                action: function() {
	                    //this.saveSelection();
	                }
	            }
	        }
	    })
        	        
        , remarkInput: M.TextFieldView.design({
            label: M.I18N.l('remark'),
            cssClass: 'remarkInput',
            hasMultipleLines: YES,
            numberOfChars: 255
        })

//        , imageContainer: M.ContainerView.design({
//        	childViews: 'imageCanvas',
//            cssClass: 'imageContainer marginTop20 marginBottom20',
//
//        	imageCanvas: M.CanvasView.design({
//                cssClass: 'imageCanvas',
//                canvasWidth: 300,
//                canvasHeight: 450,
//                render: function() {
//					this.html += '<canvas id="' + this.id + '" width="' + this.canvasWidth + 'px" height="' + this.canvasHeight + 'px" class="' + this.cssClass + '"></canvas>';
//	            	return this.html;
//        		}
//	        })
//	        
//        })

        , savePictureGrid: M.GridView.design({

        	  childViews: 'button icon'

        	, layout: {
            	cssClass: 'marginTop40 digiButton',
            	columns: {
                	0: 'button',
                	1: 'icon'
            	}
        	}
        
        	, button: M.ButtonView.design({
        		value: M.I18N.l('assume'),
        		cssClass: 'digiButton',
        		anchorLocation: M.RIGHT,
        		events: {
                	tap: {
        				//target: DigiWebApp.CameraPage,
        				//action: 'savePicture'
        				action: function() {
        					DigiWebApp.CameraPage.savePicture();
        				}
                	}
            	}
        	})
        
        	, icon: M.ImageView.design({
        		value: 'theme/images/icon_bookTime.png'
        	})
        })
        
    })
});


// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: SignatureView
// ==========================================================================

DigiWebApp.SignatureView = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
    events: {
		pagebeforeshow: {
            target: DigiWebApp.MyController,
            action: 'init'
        }
    },

    childViews: 'header content footer',

    cssClass: 'signatureView',

    header: M.ToolbarView.design({
        value: 'HEADER',
        anchorLocation: M.TOP
    }),

    content: M.ScrollView.design({
        childViews: 'label',
        label: M.LabelView.design({
            value: 'SignatureView'
        })
    }),

    footer: M.ToolbarView.design({
        value: 'FOOTER',
        anchorLocation: M.BOTTOM
    })

});


// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: EmployeePage
// ==========================================================================

DigiWebApp.EmployeePage = M.PageView.design({

    childViews: 'header content',

    events: {
		pagebeforeshow: {
            target: DigiWebApp.EmployeeController,
            action: 'init'
        }
    },

    cssClass: 'employeePage',

    header: M.ToolbarView.design({
        cssClass: 'header',
        isFixed: YES,
        value: M.I18N.l('selectEmployee'),
        anchorLocation: M.TOP
    }),

    content: M.ScrollView.design({
        childViews: 'employeeSelection buttonGrid',

        employeeSelection: M.SelectionListView.design({
            selectionMode: M.MULTIPLE_SELECTION,
            label: M.I18N.l('employees'),
            cssClass: 'infoLabel',
            contentBinding: {
                target: DigiWebApp.EmployeeController,
                property: 'employees'
            }
        }),

        buttonGrid: M.GridView.design({
            childViews: 'button icon',
            layout: {
                cssClass: 'digiButton',
                columns: {
                    0: 'button',
                    1: 'icon'
                }
            },
            button: M.ButtonView.design({
                value: M.I18N.l('apply'),
                cssClass: 'digiButton',
                anchorLocation: M.RIGHT,
                events: {
                    tap: {
                        target: DigiWebApp.EmployeeController,
                        action: 'saveEmployeeSelection'
                    }
                }
            }),
            icon: M.ImageView.design({
                value: 'theme/images/icon_bookTime.png'
            })
        })
    })

});


// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: TabBar
// ==========================================================================

DigiWebApp.TabBar = M.TabBarView.design({

    childViews: 'tabItem1 tabItem2',

    anchorLocation: M.BOTTOM,

    isFixed: YES, // useless as TMP set position fixed hard in code... :-(

    transition: M.TRANSITION.FADE,

    name: 'tabbar1',

    tabItem1: M.TabBarItemView.design({
        value: M.I18N.l('book'),
        page: 'bookingPage',
        icon: 'book'
    }),

    tabItem2: M.TabBarItemView.design({
        value: M.I18N.l('menu'),
        page: 'dashboard',
        icon: 'menu'
    })

});


// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: InfoPage
// ==========================================================================

m_require('app/views/TabBar.js');

DigiWebApp.InfoPage = M.PageView.design({

    lastTimePageWasLoaded: null,

    events: {
		pagebeforeshow: {
            action: function() {
                // reset click counter to reset settings
                DigiWebApp.ApplicationController.clickCounter = 0;
                
                DigiWebApp.InfoPage.lastTimePageWasLoaded = +new Date();
				DigiWebApp.InfoPage.content.cordovaVersionLabel.renderUpdate();
				DigiWebApp.InfoPage.content.deviceinfo.renderUpdate();
				DigiWebApp.InfoPage.content.connectioninfo.renderUpdate();
            }
        },
        pagehide: {
            action: function() {
                // reset click counter to reset settings
                DigiWebApp.ApplicationController.clickCounter = 0;
            }
        }
    },

    cssClass: 'infoPage',

    //childViews: 'header content tabBar',
    childViews: 'header content',

    header: M.ToolbarView.design({
        childViews: 'backButton title',
        cssClass: 'header unselectable',
        isFixed: YES,
        backButton: M.ButtonView.design({
            value: M.I18N.l('back'),
            icon: 'arrow-l',
            anchorLocation: M.LEFT,
            events: {
                tap: {
                    target: DigiWebApp.NavigationController,
                    action: 'backToDashboardPage'
                }
            }
        }),
        title: M.LabelView.design({
            value: M.I18N.l('info'),
            anchorLocation: M.CENTER
        }),
        anchorLocation: M.TOP
    }),

    content: M.ScrollView.design({

        childViews: 'logo versionLabel cordovaVersionLabel companyLabel streetLabel cityLabel emailLabel1 spacer1 emailLabel2 spacer2 spacer3 TMPVersionLabel spacer4 deviceinfo spacer5 connectioninfo spacer6 environmentinfo',

        logo: M.ImageView.design({
            value: 'theme/images/logo.png',
            cssClass: 'logoInfoPage marginBottom25 unselectable'
        }),

        versionLabel: M.LabelView.design({
            computedValue: {
                value: '',
                operation: function(v) {
                    return 'Version: ' + M.Application.getConfig('version');
                }
            },
            cssClass: 'infoLabel unselectable'
        }),

        cordovaVersionLabel: M.LabelView.design({
            computedValue: {
                value: '',
                operation: function(v) {
                	var output = '';
                	if (typeof(device) !== "undefined") {
                		if (typeof(device.cordova) !== "undefined") output = output + 'Cordova: ' + device.cordova;
                		if (typeof(device.phonegap) !== "undefined") {
                			if (output !== "") output = output + "<br/>"; 
                			output = output + 'PhoneGap: ' + device.phonegap;
                		}
                    }
                    //console.log("cordovaVersionLabel: " + output);
                    return output;
                }
            },
            cssClass: 'infoLabel marginBottom25 unselectable'
        }),

        TMPVersionLabel: M.LabelView.design({
            computedValue: {
                value: '',
                operation: function(v) {
                	return 'The-M-Project: ' + M.Version;
                }
            },
            cssClass: 'infoLabel marginBottom25 unselectable'
        }),

        buildLabel: M.LabelView.design({
            value: 'Build: 2470',
            cssClass: 'infoLabel marginBottom25 unselectable'
        }),

        companyLabel: M.LabelView.design({
            value: 'Digi-Zeiterfassung GmbH',
            cssClass: 'infoLabel unselectable'
        }),

        streetLabel: M.LabelView.design({
            value: 'Raiffeisenstr. 30',
            cssClass: 'infoLabel unselectable'
        }),

        cityLabel: M.LabelView.design({
            value: 'D-70794 Filderstadt',
            cssClass: 'infoLabel marginBottom25 unselectable'
        }),

        emailLabel1: M.LabelView.design({
            value: 'eMail: ',
            cssClass: 'infoLabel unselectable',
            isInline: YES
        }),

        emailLabel2: M.LabelView.design({
            value: 'support@digi-zeiterfassung.de',
            hyperlinkTarget: 'support@digi-zeiterfassung.de" onclick="return DigiWebApp.InfoPage.lastTimePageWasLoaded < (+new Date() - 1000);"',
            hyperlinkType: M.HYPERLINK_EMAIL,
            cssClass: 'infoLabel unselectable',
            isInline: YES
        }),

        spacer1: M.LabelView.design({
            value: ' '
        }),

        spacer2: M.LabelView.design({
            value: ' '
        }),

        spacer3: M.LabelView.design({
            value: '&nbsp;'
        }),

        spacer4: M.LabelView.design({
            value: ' '
        }),

        spacer5: M.LabelView.design({
            value: ' '
        }),

        spacer6: M.LabelView.design({
            value: ' '
        }),

        webLabel1: M.LabelView.design({
            value: 'Web: ',
            cssClass: 'infoLabel unselectable',
            isInline: YES
        }),

        webLabel2: M.LabelView.design({
            value: 'www.digi-zeiterfassung.de',
            hyperlinkTarget: 'http://www.digi-zeiterfassung.de" onclick="return DigiWebApp.InfoPage.lastTimePageWasLoaded < (+new Date() - 1000);"',
            hyperlinkType: M.HYPERLINK_WEBSITE,
            cssClass: 'infoLabel unselectable',
            isInline: YES
        }),

        environmentinfo: M.LabelView.design({
            computedValue: {
                value: '',
                operation: function(v) {
                	var output = "";
                	if (typeof(M.Environment) !== "undefined") {
                    	output = 'Environment Platform: '     + M.Environment.getPlatform()     + '<br />';;
                    }
                    //console.log("environmentinfo: " + output);
                    return output;
                }
            },
            cssClass: 'infoLabel marginTop25 unselectable'
        }),

        deviceinfo: M.LabelView.design({
            computedValue: {
                value: '',
                operation: function(v) {
                	var output = "";
                	if (typeof(device) !== "undefined") {
                    	output = 'Device Name: '     + device.name     + '<br />' + 
                                 'Device Platform: ' + device.platform + '<br />' + 
                                 'Device UUID: '     + device.uuid     + '<br />' + 
                                 'Device Version: '  + device.version  + '<br />';
                    }
                    //console.log("deviceinfo: " + output);
                    return output;
                }
            },
            cssClass: 'infoLabel marginTop25 unselectable'
        }),

        connectioninfo: M.LabelView.design({
            computedValue: {
                value: '',
                operation: function(v) {
                	if (typeof(navigator.network) !== "undefined") {
						if (typeof(navigator.network.connection) !== "undefined") {
						
							var networkState = navigator.network.connection.type;
					
					        var states = {};
					        states[Connection.UNKNOWN]  = 'Unknown connection';
					        states[Connection.ETHERNET] = 'Ethernet connection';
					        states[Connection.WIFI]     = 'WiFi connection';
					        states[Connection.CELL_2G]  = 'Cell 2G connection';
					        states[Connection.CELL_3G]  = 'Cell 3G connection';
					        states[Connection.CELL_4G]  = 'Cell 4G connection';
					        states[Connection.NONE]     = 'No network connection';
					
					        return 'Connection type: ' + states[networkState];
					        
					    } else {
	                    	return '';
					    }
                    } else {
                    	return '';
                    }
                }
            },
            cssClass: 'infoLabel marginBottom25 unselectable'
        })

    }),

    tabBar: DigiWebApp.TabBar

});


// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: DashboardPage
// ==========================================================================

m_require('app/views/TabBar.js');
m_require('app/views/DashboardTemplateView.js');

DigiWebApp.DashboardPage = M.PageView.design({

    childViews: 'header content tabBar'

    , cssClass: 'dashboardPage unselectable'

    , events: {
		pagebeforeshow: {
            target: DigiWebApp.DashboardController,
            action: 'init'
        },
        pageshow: {
        	action: function() {
        		DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem2);
        	}
        }
    }
    
    , needsUpdate: true

    , header: M.ToolbarView.design({
        value: M.I18N.l('menu')
        , cssClass: 'header unselectable'
        , isFixed: YES
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({

        childViews: 'list'

        , list: M.ListView.design({
            contentBinding: {
                target: DigiWebApp.DashboardController,
                property: 'items'
            }
            , listItemTemplateView: DigiWebApp.DashboardTemplateView
        })
    })

    , tabBar: DigiWebApp.TabBar

});


// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: HandOrderPage
// ==========================================================================

m_require('app/views/TabBar.js');

DigiWebApp.HandOrderPage = M.PageView.design({

    //childViews: 'header content tabBar',
    childViews: 'header content',

    cssClass: 'handApplicationPage',

    header: M.ToolbarView.design({
        childViews: 'backButton title',
        cssClass: 'header',
        isFixed: YES,
        backButton: M.ButtonView.design({
            value: M.I18N.l('back'),
            icon: 'arrow-l',
            anchorLocation: M.LEFT,
            events: {
                tap: {
                    target: DigiWebApp.NavigationController,
                    action: 'backToDashboardPage'
                }
            }
        }),
        title: M.LabelView.design({
            value: M.I18N.l('handApplications'),
            anchorLocation: M.CENTER
        }),
        anchorLocation: M.TOP
    }),

    content: M.ScrollView.design({
        childViews: 'orderName grid',
        orderName: M.TextFieldView.design({
            label: M.I18N.l('orderName')
        }),
        grid: M.GridView.design({
            childViews: 'button icon',
            layout: {
                cssClass: 'digiButton hack',
                columns: {
                    0: 'button',
                    1: 'icon'
                }
            },
            button: M.ButtonView.design({
                value: M.I18N.l('assume'),
                cssClass: 'digiButton',
                anchorLocation: M.RIGHT,
                events: {
                    tap: {
                        target: DigiWebApp.HandOrderController,
                        action: 'save'
                    }
                }
            }),
            icon: M.ImageView.design({
                value: 'theme/images/icon_bookTime.png'
            })
        })

    }),

    tabBar: DigiWebApp.TabBar

});


// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: BookingPage
// ==========================================================================

m_require('app/views/TabBar.js');

DigiWebApp.BookingPage = M.PageView.design({

    childViews: 'header content tabBar',

    events: {
		pagebeforeshow: {
            target: DigiWebApp.BookingController,
            action: 'init'
        },
        pageshow: {
        	action: function() {
        		DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem1);
        	}
        }
    },

    cssClass: 'bookTimePage',

    header: M.ToolbarView.design({
        cssClass: 'header unselectable',
        isFixed: YES,
        value: M.I18N.l('timeRegistration'),
        anchorLocation: M.TOP
    }),

	 content: M.ScrollView.design({
        childViews: 'order position activity grid currentBookingLabel',//'gridOrder gridPosition gridActivity grid',
        cssClass: 'unselectable',

        order: M.SelectionListView.design({
                selectionMode: M.SINGLE_SELECTION_DIALOG,
                initialText: M.I18N.l('noData'),
                label: M.I18N.l('order'),
                //cssClass: 'unselectable',
                applyTheme: NO,
                contentBinding: {
                    target: DigiWebApp.SelectionController,
                    property: 'orders'
                },
                events: {
                    change: {
                        target: DigiWebApp.SelectionController,
                        action: function() {
                            this.setPositions();
                        }
                    }
                }
            }),
            
        position: M.SelectionListView.design({
            selectionMode: M.SINGLE_SELECTION_DIALOG,
            label: M.I18N.l('position'),
            initialText: M.I18N.l('noData'),
            //cssClass: 'unselectable',
            applyTheme: NO,
            contentBinding: {
                target: DigiWebApp.SelectionController,
                property: 'positions'
            },
            events: {
                change: {
                    target: DigiWebApp.SelectionController,
                    action: function() {
                        this.setActivities(YES);
                    }
                }
            }
        }),

        activity: M.SelectionListView.design({
            selectionMode: M.SINGLE_SELECTION_DIALOG,
            label: M.I18N.l('activity'),
            initialText: M.I18N.l('noData'),
            //cssClass: 'unselectable',
            applyTheme: NO,
            contentBinding: {
                target: DigiWebApp.SelectionController,
                property: 'activities'
            },
            events: {
                change: {
                    target: DigiWebApp.SelectionController,
                    action: function() {
                        this.saveSelection();
                    }
                }
            }
        }),

        grid: M.GridView.design({
            childViews: 'button icon',
            layout: {
                cssClass: 'marginTop40 digiButton',
                columns: {
                    0: 'button',
                    1: 'icon'
                }
            },
            button: M.ButtonView.design({
                value: M.I18N.l('book2'),
                cssClass: 'digiButton',
                anchorLocation: M.RIGHT,
                events: {
                    tap: {
                        target: DigiWebApp.BookingController,
                        action: 'book'
            			    					
 						/*action: function() {
				                DigiWebApp.BookingController.book();
						}*/
                    }
                }
            }),
            icon: M.ImageView.design({
                value: 'theme/images/icon_bookTime.png'
            })
        }),

        currentBookingLabel: M.LabelView.design({
            cssClass: 'marginTop25 whiteLabel unselectable',
            computedValue: {
                contentBinding: {
                    target: DigiWebApp.BookingController,
                    property: 'currentBookingStr'
                },
                value: '',
                operation: function(v) {
                	if (v !== "") {
                    	return 'Diese Buchung läuft seit &nbsp;' + v;
                    } else {
                    	return '';
                    }
                }
            }
        })
    }),

    tabBar: DigiWebApp.TabBar

});


// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: SettingsPage
// ==========================================================================

m_require('app/views/TabBar.js');

DigiWebApp.SettingsPage = M.PageView.design({

    //childViews: 'header content tabBar',
    childViews: 'header content',

    events: {
		pagebeforeshow: {
            target: DigiWebApp.SettingsController,
            action: 'init'
        }
    },

    cssClass: 'settingsPage',

    header: M.ToolbarView.design({
        childViews: 'backButton title',
        cssClass: 'header unselectable',
        isFixed: YES,
        backButton: M.ButtonView.design({
            value: M.I18N.l('back'),
            icon: 'arrow-l',
            anchorLocation: M.LEFT,
            events: {
                tap: {
                    //target: DigiWebApp.NavigationController,
                    //action: 'backToDashboardPage'
        			action: function() {
        				if (!DigiWebApp.SettingsController.showCredentialsAlert) {
        					DigiWebApp.NavigationController.backToDashboardPage();
        				}
        			}
                }
            }
        }),
        title: M.LabelView.design({
            value: M.I18N.l('settings'),
            anchorLocation: M.CENTER
        }),
        anchorLocation: M.TOP
    }),

    content: M.ScrollView.design({
        //childViews: 'companyGrid passwordGrid connectionCodeGrid workerIdGrid autoTransferAfterBookTimeCheck autoTransferAfterClosingDayCheck autoSyncAfterBookTimeCheck remarkIsMandatory autoSaveGPSData GPSDataIsMandatory useTransitionsSetting grid',
        childViews: 'companyGrid passwordGrid connectionCodeGrid workerIdGrid autoTransferAfterBookTimeCheck autoTransferAfterClosingDayCheck autoSyncAfterBookTimeCheck remarkIsMandatory autoSaveGPSData useTransitionsSetting grid',
        companyGrid: M.GridView.design({
            childViews: 'companyLabel companyInput',
            layout: M.TWO_COLUMNS,
            companyLabel: M.LabelView.design({
                value: M.I18N.l('company')
            }),
            companyInput: M.TextFieldView.design({
                contentBinding: {
                    target: DigiWebApp.SettingsController,
                    property: 'settings.company'
                }
            })
        }),
        passwordGrid: M.GridView.design({
            childViews: 'passwordLabel passwordInput',
            layout: M.TWO_COLUMNS,
            passwordLabel: M.LabelView.design({
                value: M.I18N.l('password')
            }),
            passwordInput: M.TextFieldView.design({
                inputType: M.INPUT_PASSWORD,
                contentBinding: {
                    target: DigiWebApp.SettingsController,
                    property: 'settings.password'
                }
            })
        }),
        connectionCodeGrid: M.GridView.design({
            childViews: 'connectionCodeLabel connectionCodeInput',
            layout: M.TWO_COLUMNS,
            connectionCodeLabel: M.LabelView.design({
                value: M.I18N.l('connectionCode')
            }),
            connectionCodeInput: M.TextFieldView.design({
                inputType: M.INPUT_PASSWORD,
                contentBinding: {
                    target: DigiWebApp.SettingsController,
                    property: 'settings.connectionCode'
                }
            })
        }),
        workerIdGrid: M.GridView.design({
            childViews: 'workerIdLabel workerIdInput',
            layout: M.TWO_COLUMNS,
            workerIdLabel: M.LabelView.design({
                value: M.I18N.l('workerId')
            }),
            workerIdInput: M.TextFieldView.design({
                contentBinding: {
                    target: DigiWebApp.SettingsController,
                    property: 'settings.workerId'
                }
            })
        }),
        autoSyncAfterBookTimeCheck: M.SelectionListView.design({
            selectionMode: M.MULTIPLE_SELECTION,
            contentBinding: {
                target: DigiWebApp.SettingsController,
                property: 'settings.autoSyncAfterBookTime'
            }
        }),
        autoTransferAfterBookTimeCheck: M.SelectionListView.design({
            selectionMode: M.MULTIPLE_SELECTION,
            contentBinding: {
                target: DigiWebApp.SettingsController,
                property: 'settings.autoTransferAfterBookTime'
            }
        }),
        autoTransferAfterClosingDayCheck: M.SelectionListView.design({
            selectionMode: M.MULTIPLE_SELECTION,
            contentBinding: {
                target: DigiWebApp.SettingsController,
                property: 'settings.autoTransferAfterClosingDay'
            }
        }),
        remarkIsMandatory: M.SelectionListView.design({
            selectionMode: M.MULTIPLE_SELECTION,
            //cssClass: 'invisibleSetting',
            contentBinding: {
                target: DigiWebApp.SettingsController,
                property: 'settings.remarkIsMandatory'
            }
        }),
        useTransitionsSetting: M.SelectionListView.design({
            selectionMode: M.MULTIPLE_SELECTION,
            contentBinding: {
                target: DigiWebApp.SettingsController,
                property: 'settings.useTransitionsSetting'
            }
        }),
        autoSaveGPSData: M.SelectionListView.design({
            selectionMode: M.MULTIPLE_SELECTION,
            contentBinding: {
                target: DigiWebApp.SettingsController,
                property: 'settings.autoSaveGPSData'
            }
        }),
        GPSDataIsMandatory: M.SelectionListView.design({
            selectionMode: M.MULTIPLE_SELECTION,
            cssClass: 'lastSelectBox',
            contentBinding: {
                target: DigiWebApp.SettingsController,
                property: 'settings.GPSDataIsMandatory'
            }
        }),
        grid: M.GridView.design({
            childViews: 'button icon',
            layout: {
                cssClass: 'digiButton',
                columns: {
                    0: 'button',
                    1: 'icon'
                }
            },
            button: M.ButtonView.design({
                value: M.I18N.l('assume'),
                cssClass: 'digiButton',
                anchorLocation: M.RIGHT,
                events: {
                    tap: {
                        target: DigiWebApp.SettingsController,
                        action: 'save'
                    }
                }
            }),
            icon: M.ImageView.design({
                value: 'theme/images/icon_bookTime.png'
            })
        })
    }),

    tabBar: DigiWebApp.TabBar

});


// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: SettingsPasswordPage
// ==========================================================================

DigiWebApp.SettingsPasswordPage = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
    events: {
		pagebeforeshow: {
            //target: DigiWebApp.MyController,
            //action: 'init'
			action: function() {
				$('#' + DigiWebApp.SettingsPasswordPage.content.passwordGrid.passwordInput.id).val('');
			}
        }
    },

    childViews: 'header content',

    cssClass: 'settingsPasswordPage',

    header: M.ToolbarView.design({
        childViews: 'backButton title',
        cssClass: 'header',
        isFixed: YES,
        backButton: M.ButtonView.design({
            value: M.I18N.l('back'),
            icon: 'arrow-l',
            anchorLocation: M.LEFT,
            events: {
                tap: {
                    target: DigiWebApp.NavigationController,
                    action: 'backToDashboardPagePOP'
                }
            }
        }),
        title: M.LabelView.design({
            value: M.I18N.l('password'),
            anchorLocation: M.CENTER
        }),
        anchorLocation: M.TOP
    }),

    content: M.ScrollView.design({
        childViews: 'passwordGrid grid',
        passwordGrid: M.GridView.design({
            childViews: 'passwordLabel passwordInput',
            layout: M.TWO_COLUMNS,
            passwordLabel: M.LabelView.design({
                value: M.I18N.l('password')
            }),
            passwordInput: M.TextFieldView.design({
                inputType: M.INPUT_PASSWORD
            })
        }),
        grid: M.GridView.design({
            childViews: 'button icon',
            layout: {
                cssClass: 'digiButton',
                columns: {
                    0: 'button',
                    1: 'icon'
                }
            },
            button: M.ButtonView.design({
                value: M.I18N.l('assume'),
                cssClass: 'digiButton',
                anchorLocation: M.RIGHT,
                events: {
                    tap: {
                        //target: DigiWebApp.NavigationController,
                        //action: 'toSettingsPage'
            			action: function() {
            				if (DigiWebApp.SettingsController.getSetting('debug')) {
            					console.log("\"" + $('#' + DigiWebApp.SettingsPasswordPage.content.passwordGrid.passwordInput.id).val() + "\"");
            					console.log("\"" + DigiWebApp.SettingsController.getSetting('settingsPassword') + "\"");
            				}
            				if ($('#' + DigiWebApp.SettingsPasswordPage.content.passwordGrid.passwordInput.id).val() === DigiWebApp.SettingsController.getSetting('settingsPassword')) {
            					DigiWebApp.NavigationController.toSettingsPage();
            				} else {
            		        	DigiWebApp.ApplicationController.nativeAlertDialogView({
            		                title: M.I18N.l('wrongPasswordTitle'),
            		                message: M.I18N.l('wrongPasswordMsg')
            		            });            					
            				}
            			}
                    }
                }
            }),
            icon: M.ImageView.design({
                value: 'theme/images/icon_bookTime.png'
            })
        })
    })
});


// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: AudioPage
// ==========================================================================

DigiWebApp.AudioPage = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
    events: {
		pagebeforeshow: {
            target: DigiWebApp.AudioController,
            action: 'init'
        }
    },

    childViews: 'header content',

    cssClass: 'audioPage',

    header: M.ToolbarView.design({
        childViews: 'backButton title',
        cssClass: 'header',
        isFixed: YES,
        backButton: M.ButtonView.design({
            value: M.I18N.l('back'),
            icon: 'arrow-l',
            anchorLocation: M.LEFT,
            events: {
                tap: {
                    target: DigiWebApp.NavigationController,
                    action: 'backToMediaListPageTransition'
                }
            }
        }),
        title: M.LabelView.design({
            value: M.I18N.l('settings'),
            anchorLocation: M.CENTER
        }),
        anchorLocation: M.TOP
    }),

    content: M.ScrollView.design({
        //childViews: 'audioIcon recordIcon stopRecordIcon playIcon stopIcon grid',
        childViews: 'audioIcon grid',
        
        audioIcon: M.ImageView.design({
    		value: 'theme/images/icon_record.png',
    		cssClass: 'audioIcon',
        	events: {
        		tap: {
        			target: DigiWebApp.AudioController,
					action: 'recordAudio'
        		}
    		}
        }),

        recordIcon: M.ImageView.design({
    		value: 'theme/images/icon_record.png',
    		cssClass: 'mediaIcon',
        	events: {
        		tap: {
        			action: DigiWebApp.AudioController.recordAudio
        		}
    		}
        }),

        recordIcon: M.ImageView.design({
    		value: 'theme/images/icon_record.png',
    		cssClass: 'mediaIcon',
        	events: {
        		tap: {
        			action: DigiWebApp.AudioController.recordAudio
        		}
    		}
        }),

        stopRecordIcon: M.ImageView.design({
    		value: 'theme/images/icon_stop.png',
    		cssClass: 'mediaIcon',
        	events: {
        		tap: {
					action: DigiWebApp.AudioController.stopRecord
        		}
    		}
        }),

        playIcon: M.ImageView.design({
    		value: 'theme/images/icon_playbackAudio.png',
    		cssClass: 'mediaIcon',
        	events: {
        		tap: {
					action: DigiWebApp.AudioController.playbackAudio
        		}
    		}
        }),

        stopIcon: M.ImageView.design({
    		value: 'theme/images/icon_stop.png',
    		cssClass: 'mediaIcon',
        	events: {
        		tap: {
					action: DigiWebApp.AudioController.stopPlayback
        		}
    		}
        }),

        grid: M.GridView.design({
        	childViews: 'button icon',
        	layout: {
            	cssClass: 'marginTop40 digiButton',
            	columns: {
                	0: 'button',
                	1: 'icon'
            	}
        	},
        
        	button: M.ButtonView.design({
        		value: M.I18N.l('recordAudio'),
        		cssClass: 'digiButton',
        		anchorLocation: M.RIGHT,
        		events: {
                	tap: {
        				target: DigiWebApp.AudioController,
        				action: 'recordAudio'
                	}
            	}
        	}),
        
        	icon: M.ImageView.design({
        		value: 'theme/images/icon_bookTime.png'
        	})
        })
    })


});


// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: TimeDataForEditTemplateView
// ==========================================================================

DigiWebApp.TimeDataForEditTemplateView = M.ListItemView.design({

    isSelectable: NO,

    childViews: 'date order position activity latitude longitude',

    events: {
        tap: {
			action: function(id, m_id) {
			}
        }
    },

	date: M.LabelView.design({
        cssClass: 'date',
        computedValue: {
            valuePattern: '<%= date %>',
            //value: '01.01.2011, 08:00 - 08:20 Uhr, 0:20 h',
            operation: function(v) {
                v = v.split(',');
                var date1 = M.Date.create(Number(v[0]));
                var date2 = v[1] !== "0" ? M.Date.create(Number(v[1])) : null;
                if(date2) {
                    // cut minutes down => 12:05:59 is going to be 12:05:00
                    date1 = M.Date.create(date1.format('mm/dd/yyyy HH:MM'));
                    date2 = M.Date.create(date2.format('mm/dd/yyyy HH:MM'));

                    if(date1.format('mm/dd/yyyy HH:MM') === date2.format('mm/dd/yyyy HH:MM')) { // if booking is closed in the same minute
                        return date1.format('dd.mm.yyyy') + ', ' + date1.format('HH:MM') + ' - ' + date2.format('HH:MM') + ' ' + M.I18N.l('oclock') + ', 00:01 h';
                    } else {
                        var timeBetween = date1.timeBetween(date2, M.MINUTES);
                        if(timeBetween < 1) {
                            timeBetween = M.Math.round(timeBetween, M.CEIL);
                        } else {
                            timeBetween = M.Math.round(date1.timeBetween(date2, M.MINUTES), M.FLOOR);
                        }
                        if(timeBetween > 59) {
                            var hours = M.Math.round(timeBetween / 60, M.FLOOR);
                            hours = hours < 10 ? '0' + hours : hours;
                            var minutes = timeBetween % 60;
                            minutes = minutes < 10 ? '0' + minutes : minutes;
                            timeBetween = hours + ':' + minutes;
                        } else {
                            timeBetween = '00:' + (timeBetween < 10 ? '0' : '') + timeBetween;
                        }
                        return date1.format('dd.mm.yyyy') + ', ' + date1.format('HH:MM') + ' - ' + date2.format('HH:MM') + ' ' + M.I18N.l('oclock') + ', ' + timeBetween + ' h';
                    }


                } else {
                    return date1.format('dd.mm.yyyy') + ', ' + date1.format('HH:MM') + ' - ' + M.I18N.l('now') + ' (' + M.Date.create().format('HH:MM') + ')';
                }

            }
        }
    }),

    order: M.LabelView.design({
        cssClass: 'application',
        computedValue: {
            valuePattern: '<%= orderId %>',
            operation: function(v) {
                var order = _.select(DigiWebApp.Order.find().concat(DigiWebApp.HandOrder.find()), function(o) {
                    return v == o.get('id') || v == o.get('name'); // || get('name') is for checking handOrders also
                });
                if(order && order.length > 0) {
                    order = order[0];
                    if (DigiWebApp.SettingsController.getSetting('debug')) {
                    	return M.I18N.l('order') + ': ' + order.get('name') + ' (' + order.get('id') + ')';
                    } else {
                    	return M.I18N.l('order') + ': ' + order.get('name');
                    }
                } else {
                    return M.I18N.l('order') + ': ' + M.I18N.l('notDefined');
                }
            }
        }
    }),

    position: M.LabelView.design({
        cssClass: 'position',
        computedValue: {
            valuePattern: '<%= positionId %>',
            operation: function(v) {
                if(v) {
                    var position = _.select(DigiWebApp.Position.find(), function(p) {
                        return v == p.get('id');
                    });
                    if(position && position.length > 0) {
                        position = position[0];
                        return M.I18N.l('position') + ': ' + position.get('name');
                    } else {
                        return M.I18N.l('position') + ': ' + M.I18N.l('notDefined');
                    }
                } else {
                    return M.I18N.l('position') + ': ' + M.I18N.l('unknown');
                }

            }
        }
    }),

    activity: M.LabelView.design({
        cssClass: 'activity',
        computedValue: {
            valuePattern: '<%= activityId %>',
            operation: function(v) {
                if(v) {
                    var activity = _.select(DigiWebApp.Activity.find(), function(a) {
                        return v == a.get('id');
                    });
                    if(activity && activity.length > 0) {
                        activity = activity[0];
                        return M.I18N.l('activity') + ': ' + activity.get('name');
                    } else {
                        return M.I18N.l('activity') + ': ' + M.I18N.l('notDefined');
                    }

                } else {
                    return M.I18N.l('activity') + ': ' + M.I18N.l('unknown');
                }
            }
        }
    }),
    
    latitude: M.LabelView.design({
        cssClass: 'location',
        computedValue: {
            valuePattern: '<%= latitude %>',
            operation: function(v) {
                if(v > 0) {
                	var str = new Number(v);
               		return M.I18N.l('latitude') + ': ' + str.toFixed(6);
                } else {
                    //return M.I18N.l('latitude') + ': ' + M.I18N.l('GPSnotactive');
                	return '';
                }
            }
        }
    }),

    longitude: M.LabelView.design({
        cssClass: 'location',
        computedValue: {
            valuePattern: '<%= longitude %>',
            operation: function(v) {
                if (v > 0) { 
                	var str = new Number(v);
               		return M.I18N.l('longitude') + ': ' + str.toFixed(6);
                } else {
                    //return M.I18N.l('longitude') + ': ' + M.I18N.l('GPSnotactive');
                    return '';
                }
            }
        }
    }),

    remark: M.LabelView.design({
        cssClass: 'remark',
        computedValue: {
            valuePattern: '<%= remark %>',
            operation: function(v) {
                if (v) { 
               		return M.I18N.l('remark') + ': ' + v;
                } else {
                    return '';
                }
            }
        }
    })


});



// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: RemarkPage
// ==========================================================================

m_require('app/views/TimeDataForEditTemplateView');

DigiWebApp.RemarkPage = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
    events: {
		pagebeforeshow: {
            //target: DigiWebApp.MyController,
            //action: 'init'
			action: function() {

				// load data
				DigiWebApp.BookingController.setTimeDataForRemark();
				//DigiWebApp.BookingController.setNotBookedBookings();
								
				// load remark
				if (typeof(DigiWebApp.BookingController.currentBooking) !== "undefined" && DigiWebApp.BookingController.currentBooking !== null) {
					if (typeof(DigiWebApp.BookingController.currentBooking.get('remark')) !== "undefined" && DigiWebApp.BookingController.currentBooking.get('remark') !== null) {
						$('#' + DigiWebApp.RemarkPage.content.remarkInput.id).val(DigiWebApp.BookingController.currentBooking.get('remark'));
						M.ViewManager.getView('remarkPage', 'remarkInput').value = DigiWebApp.BookingController.currentBooking.get('remark');
					} else {
						$('#' + DigiWebApp.RemarkPage.content.remarkInput.id).val("");
						M.ViewManager.getView('remarkPage', 'remarkInput').value = "";
					}
				} else {
					$('#' + DigiWebApp.RemarkPage.content.remarkInput.id).val("");
					M.ViewManager.getView('remarkPage', 'remarkInput').value = "";
				}
			}
        }
    },

    myCallback: function() {

    },
    
    tab_action_timeoutvar: null,    
    
    tab_action: function() {
    	clearTimeout(DigiWebApp.RemarkPage.tab_action_timeoutvar);
    	
		if (M.ViewManager.getView('remarkPage', 'remarkInput').value.length > 255) {
	        DigiWebApp.ApplicationController.DigiLoaderView.hide();
    		DigiWebApp.ApplicationController.nativeAlertDialogView({
    			title: M.I18N.l('remarkTooLong'),
    			message: M.I18N.l('remarkTooLongMessage')
    		});
		} else {
			
			if ( (DigiWebApp.SettingsController.getSetting('remarkIsMandatory')) && (M.ViewManager.getView('remarkPage', 'remarkInput').value === '') ) {
		        DigiWebApp.ApplicationController.DigiLoaderView.hide();
	    		DigiWebApp.ApplicationController.nativeAlertDialogView({
	    			title: M.I18N.l('remarkIsMandatory'),
	    			message: M.I18N.l('remarkIsMandatoryMessage')
	    		});
			} else {
	            //if (/[[^a-zA-Z0-9_-äöüÄÖÜ,. !?;:/\\@€=]]+/.test(M.ViewManager.getView('remarkPage', 'remarkInput').value)) {
	            if (DigiWebApp.ApplicationController.sonderzeichenCheck(M.ViewManager.getView('remarkPage', 'remarkInput').value)) {
	    	        DigiWebApp.ApplicationController.DigiLoaderView.hide();
	                DigiWebApp.ApplicationController.nativeAlertDialogView({
	                    title: M.I18N.l('specialCharProblem'),
	                    message: M.I18N.l('specialCharProblemMsg')
	                });
	            } else {
	            	
	    			// save booking
	    			DigiWebApp.BookingController.currentBooking.set('remark', M.ViewManager.getView('remarkPage', 'remarkInput').value);
	    			DigiWebApp.BookingController.currentBooking.save();
	    			
	    			DigiWebApp.RemarkPage.myCallback();
	            }
			}
		}
    },
    
    childViews: 'header content',

    cssClass: 'remarkPage',

    header: M.ToolbarView.design({
        childViews: 'backButton title',
        cssClass: 'header',
        isFixed: YES,
        backButton: M.ButtonView.design({
            value: M.I18N.l('back'),
            icon: 'arrow-l',
            anchorLocation: M.LEFT,
            events: {
                tap: {
                    target: DigiWebApp.NavigationController,
                    action: 'backToBookTimePagePOP'
                }
            }
        }),
        title: M.LabelView.design({
            value: M.I18N.l('remark'),
            anchorLocation: M.CENTER
        }),
        anchorLocation: M.TOP
    }),

    content: M.ScrollView.design({
        childViews: 'orderbox remarkInput grid',
        
        orderbox: M.ListView.design({
        	
            contentBinding: {
            	target: DigiWebApp.BookingController,
            	property: 'timeDataForEdit'
        	},

        	listItemTemplateView: DigiWebApp.TimeDataForEditTemplateView
        	
        }),

        remarkInput: M.TextFieldView.design({
                label: M.I18N.l('remark'),
                cssClass: 'remarkInput',
                hasMultipleLines: YES,
                numberOfChars: 255
            }),
            
        grid: M.GridView.design({
        	
            childViews: 'button icon',
            layout: {
                cssClass: 'digiButton',
                columns: {
                    0: 'button',
                    1: 'icon'
                }
            },
            
            button: M.ButtonView.design({
                value: M.I18N.l('closeBooking'),
                cssClass: 'digiButton',
                anchorLocation: M.RIGHT,
                events: {
                    tap: {
                        //target: DigiWebApp.NavigationController,
                        //action: 'toSettingsPage'
            			action: function() {
        					DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('Save'));
        					DigiWebApp.RemarkPage.tab_action_timeoutvar = setTimeout("DigiWebApp.RemarkPage.tab_action();", 50);
            			}
                    }
                }
            }),
            
            icon: M.ImageView.design({
                value: 'theme/images/icon_bookTime.png'
            })
            
        })
    })
});


// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: EditTimeDataPage
// ==========================================================================

m_require('app/views/TimeDataForEditTemplateView');

DigiWebApp.EditTimeDataPage = M.PageView.design({

    bookingToEdit: null,
    
    signaturePadAPI: null,
	
	/* Use the 'events' property to bind events like 'pageshow' */
    events: {
		pagebeforeshow: {
			action: function() {
	
				// load data
				DigiWebApp.BookingController.setTimeDataForEdit();
				//DigiWebApp.BookingController.setNotBookedBookings();
				
        		// Feature 405 (Unterschrift)
        		if ((DigiWebApp.SettingsController.featureAvailable('405')) && (typeof LocalFileSystem !== "undefined") && (typeof window.requestFileSystem !== "undefined")) {
        			$('#' + DigiWebApp.EditTimeDataPage.content.signature.id).show();
					// init canvas
					var sigPadOptions = {
							  bgColour : '#fff',
							  lineTop: 110,
							  drawOnly : true
							};
					DigiWebApp.EditTimeDataPage.signaturePadAPI = $('.sigPad').signaturePad(sigPadOptions);
        		} else {
        			$('#' + DigiWebApp.EditTimeDataPage.content.signature.id).hide();
        		}
						
        		// load remark
        		if (typeof(DigiWebApp.EditTimeDataPage.bookingToEdit) !== "undefined" && DigiWebApp.EditTimeDataPage.bookingToEdit !== null) {
					if (typeof(DigiWebApp.EditTimeDataPage.bookingToEdit.get('remark')) !== "undefined" && DigiWebApp.EditTimeDataPage.bookingToEdit.get('remark') !== null) {
						$('#' + DigiWebApp.EditTimeDataPage.content.remarkInput.id).val(DigiWebApp.EditTimeDataPage.bookingToEdit.get('remark'));
						M.ViewManager.getView('editTimeDataPage', 'remarkInput').value = DigiWebApp.EditTimeDataPage.bookingToEdit.get('remark');
					} else {
						$('#' + DigiWebApp.EditTimeDataPage.content.remarkInput.id).val("");
						M.ViewManager.getView('editTimeDataPage', 'remarkInput').value = "";
					}
				} else {
					$('#' + DigiWebApp.EditTimeDataPage.content.remarkInput.id).val("");
					M.ViewManager.getView('editTimeDataPage', 'remarkInput').value = "";
				}

        		// enable feature 403
        		if (DigiWebApp.SettingsController.featureAvailable('403')) {
	        		// show label
					$('[for=' + DigiWebApp.EditTimeDataPage.content.remarkInput.id  + ']').each(function() {
	    					$(this).show();
	    			});
					// show textarea
	        		$('[id=' + DigiWebApp.EditTimeDataPage.content.remarkInput.id  + ']').each(function() {
	    					$(this).show();
	    			});
				} else {
					// hide label
	        		$('[for=' + DigiWebApp.EditTimeDataPage.content.remarkInput.id  + ']').each(function() {
	    					$(this).hide();
	    			});
					// hide textarea
					$('[id=' + DigiWebApp.EditTimeDataPage.content.remarkInput.id  + ']').each(function() {
	    					$(this).hide();
	    			});
				}
        		
        		// Feature 405 (Unterschrift)
        		if ((DigiWebApp.SettingsController.featureAvailable('405')) && (typeof LocalFileSystem !== "undefined") && (typeof window.requestFileSystem !== "undefined")) {
        			// load signature
        			DigiWebApp.EditTimeDataPage.bookingToEdit.readFromFile(function(fileContent){
        				if (fileContent && (fileContent !== "")) {
       						DigiWebApp.EditTimeDataPage.signaturePadAPI.regenerate(fileContent);
        				}
        			});
        		}
				
			}
        }
    },

    myCallback: function() {

    },
    
    tab_action_timeoutvar: null,    
    
    tab_action: function() {
    	clearTimeout(DigiWebApp.EditTimeDataPage.tab_action_timeoutvar);
    	
    	var unterschriftString = "";
    	// Feature 405 (Unterschrift)
		if ((DigiWebApp.SettingsController.featureAvailable('405')) && (typeof LocalFileSystem !== "undefined") && (typeof window.requestFileSystem !== "undefined")) {
			//unterschriftImageString = DigiWebApp.EditTimeDataPage.signaturePadAPI.getSignatureImage();
    		unterschriftString = DigiWebApp.EditTimeDataPage.signaturePadAPI.getSignatureString();
			//var unterschriftRawValue = $('#' + DigiWebApp.EditTimeDataPage.content.signature.signatureform.signaturecanvas.id).val();
    	
			//console.log(DigiWebApp.EditTimeDataPage.signaturePadAPI);
			//console.log(unterschriftImageString);
			
		}
    	
    	if (M.ViewManager.getView('editTimeDataPage', 'remarkInput').value.length > 255) {
	        DigiWebApp.ApplicationController.DigiLoaderView.hide();
    		DigiWebApp.ApplicationController.nativeAlertDialogView({
    			title: M.I18N.l('remarkTooLong'),
    			message: M.I18N.l('remarkTooLongMessage')
    		});
		} else {
			
			if ( (DigiWebApp.SettingsController.getSetting('remarkIsMandatory')) && (M.ViewManager.getView('editTimeDataPage', 'remarkInput').value === '') ) {
		        DigiWebApp.ApplicationController.DigiLoaderView.hide();
	    		DigiWebApp.ApplicationController.nativeAlertDialogView({
	    			title: M.I18N.l('remarkIsMandatory'),
	    			message: M.I18N.l('remarkIsMandatoryMessage')
	    		});
			} else {
	            //if (/[[^a-zA-Z0-9_-äöüÄÖÜ,. !?;:/\\@€=]]+/.test(M.ViewManager.getView('editTimeDataPage', 'remarkInput').value)) {
	            if (DigiWebApp.ApplicationController.sonderzeichenCheck(M.ViewManager.getView('editTimeDataPage', 'remarkInput').value)) {
	    	        DigiWebApp.ApplicationController.DigiLoaderView.hide();
	                DigiWebApp.ApplicationController.nativeAlertDialogView({
	                    title: M.I18N.l('specialCharProblem'),
	                    message: M.I18N.l('specialCharProblemMsg')
	                });
	            } else {
    				// save remark in bookingToEdit
    				DigiWebApp.EditTimeDataPage.bookingToEdit.set('remark', M.ViewManager.getView('editTimeDataPage', 'remarkInput').value);
    				DigiWebApp.EditTimeDataPage.bookingToEdit.save();

    				if (unterschriftString !== "") {
    					// save signature
    					DigiWebApp.EditTimeDataPage.bookingToEdit.set('fileType', 'text/plain');
    					DigiWebApp.EditTimeDataPage.bookingToEdit.save();
    					DigiWebApp.EditTimeDataPage.bookingToEdit.saveToFile(unterschriftString, DigiWebApp.EditTimeDataPage.myCallback);
    				} else {
    					DigiWebApp.EditTimeDataPage.myCallback();
    				}
	            }
			}
		}
    },

    childViews: 'header content',

    cssClass: 'remarkPage',

    header: M.ToolbarView.design({
        childViews: 'backButton title',
        cssClass: 'header',
        isFixed: YES,
        backButton: M.ButtonView.design({
            value: M.I18N.l('back'),
            icon: 'arrow-l',
            anchorLocation: M.LEFT,
            events: {
                tap: {
                    target: DigiWebApp.NavigationController,
                    action: 'backToTimeDataPage'
                }
            }
        }),
        title: M.LabelView.design({
            value: M.I18N.l('EditTimeDataPageTitle'),
            anchorLocation: M.CENTER
        }),
        anchorLocation: M.TOP
    }),

    content: M.ScrollView.design({
        childViews: 'orderbox remarkInput signature saveGrid',
        
        orderbox: M.ListView.design({
        	
            contentBinding: {
            	target: DigiWebApp.BookingController,
            	property: 'timeDataForEdit'
        	},

        	listItemTemplateView: DigiWebApp.TimeDataForEditTemplateView
        	
        }),
        
        remarkInput: M.TextFieldView.design({
                label: M.I18N.l('remark'),
                hasMultipleLines: YES,
                numberOfChars: 255
        }),
            
        signature: M.ContainerView.design({
        	childViews: 'signatureform',
            cssClass: 'signaturecanvas marginTop20 marginBottom20',

        	signatureform: M.FormView.design({
            	
            	childViews: 'signaturecanvas',
            	
            	signaturecanvas: M.CanvasView.design({

            		label: M.I18N.l('signature'),

            		canvasWidth: 290,
                    canvasHeight: 120,
                	
                    render: function() {
                    	if (this.label) {
                    		this.html += '<label for="' + this.id + '" class="signaturecanvaslabel">' + this.label + '</label>';
                    	}
    					this.html += '  <div id="' + this.id + '_container" class="sig sigWrapper">';
        				this.html += '    <canvas id="' + this.id + '_canvas" class="pad" width="' + this.canvasWidth + 'px" height="' + this.canvasHeight + 'px"></canvas>';
        				this.html += '    <input id="' + this.id + '" type="hidden" name="output" class="output">';
        				this.html += '  </div>';
                    	return this.html;
                	}
    	        }),
                	
                render: function() {
            		this.html += '<form method="post" action="" class="sigPad">';
                	this.renderChildViews();
    				this.html += '</form>';
                	return this.html;
            	}
            })
        }),
        	        
        saveGrid: M.GridView.design({
            childViews: 'saveButton icon',
            layout: {
                cssClass: 'digiButton',
                columns: {
                    0: 'saveRemarkButton',
                    1: 'icon'
                }
            },
            
            saveButton: M.ButtonView.design({
                value: M.I18N.l('assume'),
                cssClass: 'digiButton',
                anchorLocation: M.RIGHT,
                events: {
                    tap: {
            			action: function() {
            				DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('Save'));
            				DigiWebApp.EditTimeDataPage.tab_action_timeoutvar = setTimeout("DigiWebApp.EditTimeDataPage.tab_action();", 50);
            			}
                    }
                }
            }),
            icon: M.ImageView.design({
                value: 'theme/images/icon_bookTime.png'
            })
        })
    })
});


// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: TimeDataTemplateView
// ==========================================================================

DigiWebApp.TimeDataTemplateView = M.ListItemView.design({

    isSelectable: YES,

    childViews: 'date order position activity latitude longitude remark',

    events: {
        tap: {
			action: function(id, m_id) {
			    // Start::Bemerkungsfeld (403) oder Unterschrift (405)
			    if (DigiWebApp.SettingsController.featureAvailable('403') || ((DigiWebApp.SettingsController.featureAvailable('405')) && (typeof LocalFileSystem !== "undefined") && (typeof window.requestFileSystem !== "undefined"))) {
					// if remark-feature active: go to remarkpage
					// load booking in EditTimeData.bookingToEdit
			    	//console.log('remark is active');
					_.each(DigiWebApp.Booking.find(), function(booking) {
						if (booking.m_id === m_id) {
							DigiWebApp.EditTimeDataPage.bookingToEdit = booking;
						}
					});
					DigiWebApp.NavigationController.toEditTimeDataPage();
			    } else {
					// else: nothing
			    	//if (DigiWebApp.SettingsController.getSetting('debug')) console.log(id);
			    }
			    // End::Bemerkungsfeld oder Unterschrift
			}
        }
    },

	date: M.LabelView.design({
        cssClass: 'date unselectable',
        computedValue: {
            valuePattern: '<%= date %>',
            //value: '01.01.2011, 08:00 - 08:20 Uhr, 0:20 h',
            operation: function(v) {
                v = v.split(',');
                var date1 = M.Date.create(Number(v[0]));
                var date2 = v[1] !== "0" ? M.Date.create(Number(v[1])) : null;
                if(date2) {
                    // cut minutes down => 12:05:59 is going to be 12:05:00
                    date1 = M.Date.create(date1.format('mm/dd/yyyy HH:MM'));
                    date2 = M.Date.create(date2.format('mm/dd/yyyy HH:MM'));

                    if(date1.format('mm/dd/yyyy HH:MM') === date2.format('mm/dd/yyyy HH:MM')) { // if booking is closed in the same minute
                        return date1.format('dd.mm.yyyy') + ', ' + date1.format('HH:MM') + ' - ' + date2.format('HH:MM') + ' ' + M.I18N.l('oclock') + ', 00:01 h';
                    } else {
                        var timeBetween = date1.timeBetween(date2, M.MINUTES);
                        if(timeBetween < 1) {
                            timeBetween = M.Math.round(timeBetween, M.CEIL);
                        } else {
                            timeBetween = M.Math.round(date1.timeBetween(date2, M.MINUTES), M.FLOOR);
                        }
                        if(timeBetween > 59) {
                            var hours = M.Math.round(timeBetween / 60, M.FLOOR);
                            hours = hours < 10 ? '0' + hours : hours;
                            var minutes = timeBetween % 60;
                            minutes = minutes < 10 ? '0' + minutes : minutes;
                            timeBetween = hours + ':' + minutes;
                        } else {
                            timeBetween = '00:' + (timeBetween < 10 ? '0' : '') + timeBetween;
                        }
                        return date1.format('dd.mm.yyyy') + ', ' + date1.format('HH:MM') + ' - ' + date2.format('HH:MM') + ' ' + M.I18N.l('oclock') + ', ' + timeBetween + ' h';
                    }


                } else {
                    return date1.format('dd.mm.yyyy') + ', ' + date1.format('HH:MM') + ' - ' + M.I18N.l('open');
                }

            }
        }
    }),

    order: M.LabelView.design({
        cssClass: 'application unselectable',
        computedValue: {
            valuePattern: '<%= orderId %>',
            operation: function(v) {
                var order = _.select(DigiWebApp.Order.find().concat(DigiWebApp.HandOrder.find()), function(o) {
                    return v == o.get('id') || v == o.get('name'); // || get('name') is for checking handOrders also
                });
                if(order && order.length > 0) {
                    order = order[0];
                    if (DigiWebApp.SettingsController.getSetting('debug')) {
                    	return M.I18N.l('order') + ': ' + order.get('name') + ' (' + order.get('id') + ')';
                    } else {
                    	return M.I18N.l('order') + ': ' + order.get('name');
                    }
                } else {
                    return M.I18N.l('order') + ': ' + M.I18N.l('notDefined');
                }
            }
        }
    }),

    position: M.LabelView.design({
        cssClass: 'position unselectable',
        computedValue: {
            valuePattern: '<%= positionId %>',
            operation: function(v) {
                if(v) {
                    var position = _.select(DigiWebApp.Position.find(), function(p) {
                        return v == p.get('id');
                    });
                    if(position && position.length > 0) {
                        position = position[0];
                        return M.I18N.l('position') + ': ' + position.get('name');
                    } else {
                        return M.I18N.l('position') + ': ' + M.I18N.l('notDefined');
                    }
                } else {
                    return M.I18N.l('position') + ': ' + M.I18N.l('unknown');
                }

            }
        }
    }),

    activity: M.LabelView.design({
        cssClass: 'activity unselectable',
        computedValue: {
            valuePattern: '<%= activityId %>',
            operation: function(v) {
                if(v) {
                    var activity = _.select(DigiWebApp.Activity.find(), function(a) {
                        return v == a.get('id');
                    });
                    if(activity && activity.length > 0) {
                        activity = activity[0];
                        return M.I18N.l('activity') + ': ' + activity.get('name');
                    } else {
                        return M.I18N.l('activity') + ': ' + M.I18N.l('notDefined');
                    }

                } else {
                    return M.I18N.l('activity') + ': ' + M.I18N.l('unknown');
                }
            }
        }
    }),
    
    latitude: M.LabelView.design({
        cssClass: 'location unselectable',
        computedValue: {
            valuePattern: '<%= latitude %>',
            operation: function(v) {
                if(v > 0) {
                	var str = new Number(v);
               		return M.I18N.l('latitude') + ': ' + str.toFixed(6);
                } else {
                    //return M.I18N.l('latitude') + ': ' + M.I18N.l('GPSnotactive');
                	return '';
                }
            }
        }
    }),

    longitude: M.LabelView.design({
        cssClass: 'location unselectable',
        computedValue: {
            valuePattern: '<%= longitude %>',
            operation: function(v) {
                if (v > 0) { 
                	var str = new Number(v);
               		return M.I18N.l('longitude') + ': ' + str.toFixed(6);
                } else {
                    //return M.I18N.l('longitude') + ': ' + M.I18N.l('GPSnotactive');
                    return '';
                }
            }
        }
    }),

    remark: M.LabelView.design({
        cssClass: 'remark unselectable',
        computedValue: {
            valuePattern: '<%= remark %>',
            operation: function(v) {
                if (v) { 
               		return M.I18N.l('remark') + ': ' + v;
                } else {
                    return '';
                }
            }
        }
    })


});



// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: noSettingsiOS
// ==========================================================================

DigiWebApp.noSettingsiOSPage = M.PageView.design({

    childViews: 'header content',

    cssClass: 'noSettingsiOSPage',

    header: M.ToolbarView.design({
        value: M.I18N.l('noSettingsiOSHeader'),
        anchorLocation: M.TOP
    }),

    content: M.ScrollView.design({
        childViews: 'label exitText spacer spacer continueinstallText continueinstallgrid spacer disclaimer',
        spacer: M.LabelView.design({
            value: '',
            cssClass: 'marginBottom25'
        }),
        label: M.LabelView.design({
            value: M.I18N.l('noSettingsiOSLabel'),
            cssClass: 'infoLabel marginBottom25'
        }),
        exitText: M.LabelView.design({
            value: M.I18N.l('noSettingsiOSMessage'),
            cssClass: 'whiteLabel marginBottom25'
        }),
        continueinstallText: M.LabelView.design({
            value: M.I18N.l('continueInstallMessage'),
            cssClass: 'whiteLabel marginBottom25'
        }),
        exitgrid: M.GridView.design({
            childViews: 'exitbutton icon',
            cssClass: 'marginBottom25',
            layout: {
                cssClass: 'digiButton',
                columns: {
                    0: 'button',
                    1: 'icon'
                }
            },
            exitbutton: M.ButtonView.design({
                value: M.I18N.l('exitWebApp'),
                cssClass: 'digiButton',
                anchorLocation: M.RIGHT,
                events: {
                    tap: {
		                action: function() {
            				//navigator.app.exitApp();
		    			}
                    }
                }
            }),
            icon: M.ImageView.design({
                value: 'theme/images/icon_bookTime.png'
            })
        }),
        continueinstallgrid: M.GridView.design({
            childViews: 'continueinstallbutton icon',
            cssClass: 'marginBottom25',
            layout: {
                cssClass: 'digiButton',
                columns: {
                    0: 'button',
                    1: 'icon'
                }
            },
            continueinstallbutton: M.ButtonView.design({
                value: M.I18N.l('continueInstall'),
                cssClass: 'digiButton',
                anchorLocation: M.RIGHT,
                events: {
                    tap: {
                        action: function() {
            				DigiWebApp.SettingsController.showCredentialsAlert = NO;
            				DigiWebApp.NavigationController.backToSettingsPage();
            				DigiWebApp.SettingsController.init();
            			}
                    }
                }
            }),
            icon: M.ImageView.design({
                value: 'theme/images/icon_bookTime.png'
            })
        }),
        disclaimer: M.LabelView.design({
            value: M.I18N.l('noSettingsiOSDisclamier'),
            cssClass: 'whiteLabel'
        })        
    })

});


// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: MediaListTemplateView
// ==========================================================================

DigiWebApp.MediaListTemplateView = M.ListItemView.design({

      isSelectable: YES

    , childViews: 'icon timeStamp order position activity latitude longitude remark'

    , events: {
        tap: {
			action: function(id, m_id) {
					DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('loadMediaFile'));
					var doShow = NO;
				    var view = M.ViewManager.getViewById(id);
				    var mediaFile_modelId = view.modelId;
				    _.each(DigiWebApp.MediaListController.items, function(MediaListItem) {
						if (MediaListItem.m_id === mediaFile_modelId) {
							//if (MediaListItem.get("datum") !== "-") {
								DigiWebApp.EditPicturePageController.set('myMediaFile', MediaListItem);
								doShow = YES;
							//}
						}
					});
					if (doShow === YES) {
						DigiWebApp.NavigationController.toEditPicturePageTransition();
					} else {
						DigiWebApp.ApplicationController.DigiLoaderView.hide();
					}
			}
        }
    }

    , icon: M.ImageView.design({
        cssClass: 'icon',
        computedValue: {
            valuePattern: '<%= icon %>',
            operation: function(v) {
			        if (v) {
			        	return 'theme/images/' + v;
			        } else {
			        	return '';
			        }
            }
        }
    })

	, timeStamp: M.LabelView.design({
        cssClass: 'date',
        computedValue: {
            valuePattern: '<%= timeStamp %>',
            //value: '01.01.2011, 08:01:02
            operation: function(v) {
                var date1 = M.Date.create(Number(v));
                return date1.format('dd.mm.yyyy') + ', ' + date1.format('HH:MM:ss');

            }
        }
    })

    , order: M.LabelView.design({
        cssClass: 'application',
        computedValue: {
            valuePattern: '<%= orderId %>',
            operation: function(v) {
                var order = _.select(DigiWebApp.Order.find().concat(DigiWebApp.HandOrder.find()), function(o) {
                    return v == o.get('id') || v == o.get('name'); // || get('name') is for checking handOrders also
                });
                if(order && order.length > 0) {
                    order = order[0];
                    if (DigiWebApp.SettingsController.getSetting('debug')) {
                    	return M.I18N.l('order') + ': ' + order.get('name') + ' (' + order.get('id') + ')';
                    } else {
                    	return M.I18N.l('order') + ': ' + order.get('name');
                    }
                } else {
                    return M.I18N.l('order') + ': ' + M.I18N.l('notDefined');
                }
            }
        }
    })

    , position: M.LabelView.design({
        cssClass: 'position',
        computedValue: {
            valuePattern: '<%= positionId %>',
            operation: function(v) {
                if(v) {
                    var position = _.select(DigiWebApp.Position.find(), function(p) {
                        return v == p.get('id');
                    });
                    if(position && position.length > 0) {
                        position = position[0];
                        return M.I18N.l('position') + ': ' + position.get('name');
                    } else {
                        return M.I18N.l('position') + ': ' + M.I18N.l('notDefined');
                    }
                } else {
                    return M.I18N.l('position') + ': ' + M.I18N.l('unknown');
                }

            }
        }
    })

    , activity: M.LabelView.design({
        cssClass: 'activity',
        computedValue: {
            valuePattern: '<%= activityId %>',
            operation: function(v) {
                if(v) {
                    var activity = _.select(DigiWebApp.Activity.find(), function(a) {
                        return v == a.get('id');
                    });
                    if(activity && activity.length > 0) {
                        activity = activity[0];
                        return M.I18N.l('activity') + ': ' + activity.get('name');
                    } else {
                        return M.I18N.l('activity') + ': ' + M.I18N.l('notDefined');
                    }

                } else {
                    return M.I18N.l('activity') + ': ' + M.I18N.l('unknown');
                }
            }
        }
    })
    
    , latitude: M.LabelView.design({
        cssClass: 'location',
        computedValue: {
            valuePattern: '<%= latitude %>',
            operation: function(v) {
                if(v > 0) {
                	var str = v;
               		return M.I18N.l('latitude') + ': ' + str.toFixed(6);
                } else {
                    //return M.I18N.l('latitude') + ': ' + M.I18N.l('GPSnotactive');
                	return '';
                }
            }
        }
    })

    , longitude: M.LabelView.design({
        cssClass: 'location',
        computedValue: {
            valuePattern: '<%= longitude %>',
            operation: function(v) {
                if (v > 0) { 
                	var str = v;
               		return M.I18N.l('longitude') + ': ' + str.toFixed(6);
                } else {
                    //return M.I18N.l('longitude') + ': ' + M.I18N.l('GPSnotactive');
                    return '';
                }
            }
        }
    })
    
    , remark: M.LabelView.design({
        cssClass: 'remark unselectable',
        computedValue: {
            valuePattern: '<%= remark %>',
            operation: function(v) {
                if (v) { 
               		return M.I18N.l('remark') + ': ' + v;
                } else {
                    return '';
                }
            }
        }
    })

});



// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: OrderInfoTemplateView
// ==========================================================================

DigiWebApp.OrderInfoTemplateView = M.ListItemView.design({

      isSelectable: NO
    
    , hasSingleAction: NO

    //, childViews: 'container'
    	
    //, container: M.ContainerView.design({
    	
	    , childViews: 'orderName positionName spacer1 positionStrasseUndHausnummer positionPLZundORT positionLand positionTelefon positionFax emailLabel positionEmail spacer2 positionAnsprechpartner positionKundenname spacer3 positionBeschreibung spacer4 positionLongitude positionLatitude spacer5 showCoordinatesInMapButton saveAsContactButton showAddressInMapButton'

	    , orderName: M.LabelView.design({
	          cssClass: 'orderName'
	        , computedValue: {
	              valuePattern: '<%= orderName %>'
	            , operation: function(v) {
	    			return v;
	              }
	          }
	    })
	
	    , positionName: M.LabelView.design({
	          cssClass: 'positionName'
	        , computedValue: {
	              valuePattern: '<%= positionName %>'
	            , operation: function(v) {
					if (v === '') {
						return M.I18N.l('position') + ": " + M.I18N.l('noData');
					} else {
						return M.I18N.l('position') + ": " + v;
					}
				  }
	          }
	    })
	    
	    , positionStrasseUndHausnummer: M.LabelView.design({
	          cssClass: 'positionName'
	        , computedValue: {
	        	  valuePattern: '<%= positionStrasseUndHausnummer %>'
	        	, operation: function(v) {
	    			return v;
	        	  }
	    	  }
	    })
	    
	    , positionPLZundORT: M.LabelView.design({
	          cssClass: 'positionName' 
	        , computedValue: {
	        	  valuePattern: '<%= positionPLZundOrt %>'
	        	, operation: function(v) {
	    			return v;
	        	  }
	    	  }
	    })
	    
	    , positionLand: M.LabelView.design({
	          cssClass: 'positionName' 
	        , computedValue: {
	        	  valuePattern: '<%= positionLand %>'
	        	, operation: function(v) {
					return v;
	        	  }
	    	  }
	    })
	    
	    , positionTelefon: M.LabelView.design({
	          cssClass: 'positionName' 
	        , computedValue: {
	        	  valuePattern: '<%= positionTelefon %>'
	        	, operation: function(v) {
					return M.I18N.l('phone') + ": " + v;
	        	  }
	    	  }
	    })
	    
	    , positionTelefon_static: M.LabelView.design({
	          cssClass: 'positionName' 
	        , value: M.I18N.l('phone') + ": +49(7071)1384130"
	        , hyperlinkType: M.HYPERLINK_WEBSITE
	        , hyperlinkTarget: 'tel:+4970711384130'
	    })
	    
	    , positionTelefon_dyn: M.LabelView.design({
	          cssClass: 'positionName' 
	        , hyperlinkType: M.HYPERLINK_PHONE
	        , hyperlinkTarget: null
	        , computedValue: {
	        	  valuePattern: '<%= positionTelefon %>'
	        	, operation: function(v) {
	    			if (v === '') {
	    				return v;
	    			} else {
	    				alert(this.hyperlinkTarget);
	    				this.hyperlinkTarget = v;
	    				alert(this.hyperlinkTarget);
						return M.I18N.l('phone') + ": <a rel=\"external\" href=\"tel:"+v+"\" class=\"ui-link\">"+v+"</a>";
	    			}
	        	  }
	    	  }
	    })
	    
	    , positionFax: M.LabelView.design({
	          cssClass: 'positionName' 
	        , computedValue: {
	        	  valuePattern: '<%= positionFax %>'
	        	, operation: function(v) {
					if (v === '') {
						return v;
					} else {
						return M.I18N.l('fax') + ": " + v;
					}
				  } 
	    	  }
	    })
	    
        , emailLabel: M.LabelView.design({
              value: M.I18N.l('email') + ": "
            , cssClass: 'positionName'
            , isInline: YES
        })

        , positionEmail: M.LabelView.design({
	          cssClass: 'positionEmail' 
	        , isInline: YES
	        , hyperlinkType: M.HYPERLINK_EMAIL
	        , computedValue: {
	        	  valuePattern: '<%= positionEmail %>'
	        	, operation: function(v) {
        				//console.log(this);
        				//var that = this;
        				//that.hyperlinkTarget = v;
        				//DigiWebApp.OrderInfoTemplateView.container.positionEmail.hyperlinkTarget = v;
        				return v;
						//return "<a rel=\"external\" href=\"mailto:"+v+"\" class=\"ui-link\">"+v+"</a>";
				  } 
	    	  }
	    })
	    
        , positionEmail_static: M.LabelView.design({
              value: 'support@digi-zeiterfassung.de'
            , hyperlinkTarget: 'support@digi-zeiterfassung.de" onclick="alert(\"abc\"");" class="ui-link"'
            , hyperlinkType: M.HYPERLINK_EMAIL
            , cssClass: 'positionName'
            , isInline: YES
        })

        , positionEmail_2: M.LabelView.design({
	          cssClass: 'positionName' 
	        , value: M.I18N.l('email') + ": support@digi-zeiterfassung.de"
	        , hyperlinkType: M.HYPERLINK_EMAIL
	        , hyperlinkTarget: 'support@digi-zeiterfassung.de'
	    })
	    
	    , positionEmail_dyn: M.LabelView.design({
	          cssClass: 'positionName' 
	        , hyperlinkType: M.HYPERLINK_EMAIL
	        , computedValue: {
	        	  valuePattern: '<%= positionEmail %>'
	        	, operation: function(v) {
					if (v === '') {
						return v;
					} else {
						return M.I18N.l('email') + ": <a rel=\"external\" href=\"mailto:"+v+"\" class=\"ui-link\">"+v+"</a>";
					}
	        	  }
	    	  }
	    })
	    
	    , positionAnsprechpartner: M.LabelView.design({
	          cssClass: 'positionName' 
	        , computedValue: {
	        	  valuePattern: '<%= positionAnsprechpartner %>'
	        	, operation: function(v) {
					if (v === '') {
						return v;
					} else {
						return M.I18N.l('ansprechpartner') + ": " + v;
					}
	        	  }
	    	  }
	    })
	    
	    , positionKundenname: M.LabelView.design({
	          cssClass: 'positionName' 
	        , computedValue: {
	        	  valuePattern: '<%= positionKundenname %>'
	        	, operation: function(v) {
					if (v === '') {
						return v;
					} else {
						return M.I18N.l('kundenname') + ": " + v;
					}
	        	  }
	    	  }
	    })
	    
	    , positionLongitude: M.LabelView.design({
	          cssClass: 'positionName' 
	        , computedValue: {
	    		  valuePattern: '<%= positionLongitude %>'
	        	, operation: function(v) {
    				if (v === '') {
    					return v;
    				} else {
    					return M.I18N.l('longitude') + ": " + v;
    				}
	        	  }
	    	  }
	    })
	    
	    , positionLatitude: M.LabelView.design({
	          cssClass: 'positionName' 
	        , computedValue: {
		          valuePattern: '<%= positionLatitude %>'
	        	, operation: function(v) {
					if (v === '') {
						return v;
					} else {
						return M.I18N.l('latitude') + ": " + v;
					}
	        	  }
	    	  }
	    })
	    
	    , positionBeschreibung: M.LabelView.design({
	          cssClass: 'positionName' 
	        , computedValue: {
	        	  valuePattern: '<%= positionBeschreibung %>'
	        	, operation: function(v) {
						/*if (v === '') {
							return v;
						} else {
							return M.I18N.l('positionDescription') + ":<br />" + v;
						}*/
						return v;
	        	  }
	    	  }
	    })
	    
	    , spacer1: M.LabelView.design({
	          value: ' '
	        , cssClass: 'marginBottom12'
	    })
	
	    , spacer2: M.LabelView.design({
	          value: ' '
	        , cssClass: 'marginBottom12'
	    })
	
	    , spacer3: M.LabelView.design({
	          value: ' '
	        , cssClass: 'marginBottom12'
	    })
	
	    , spacer4: M.LabelView.design({
	          value: ' '
	        , cssClass: 'marginBottom12'
	    })
	
	    , spacer5: M.LabelView.design({
	          value: ' '
	        , cssClass: 'marginBottom12'
	    })
		
	    , saveAsContactButton: M.ButtonView.design({
	          value: M.I18N.l('saveAsContact')
	        //, cssClass: 'digiButton'
	        //, anchorLocation: M.CENTER
	        , events: {
	            tap: {
	                target: DigiWebApp.OrderInfoController,
	                action: 'saveAsContact'
	            }
	          }
	    })
	
	    , showAddressInMapButton: M.ButtonView.design({
	          value: M.I18N.l('showAddressInMap')
	        //, cssClass: 'digiButton'
	        //, anchorLocation: M.CENTER
	        , events: {
	            tap: {
	                action: function(buttonid, ev) {
	    				try { ev.preventDefault(); } catch(e) {};
						var country = DigiWebApp.OrderInfoController.items[0].positionCountryCode;
						var zip = DigiWebApp.OrderInfoController.items[0].positionPLZ;
						var city = DigiWebApp.OrderInfoController.items[0].positionOrt;
						var street = DigiWebApp.OrderInfoController.items[0].positionStrasse;
						var housenumber = DigiWebApp.OrderInfoController.items[0].positionHausnummer;
						var addressdetails = '0';
						var url_byAddress = '';
						switch ( DigiWebApp.SettingsController.getSetting('mapType') ) {
						case "OSM":
							alert(M.I18N.l('showInMapOSMAlert'));
							url_byAddress = "http://nominatim.openstreetmap.org/search/" + country + "/" + city + "/" + street + "/" + housenumber + "?format=html&polygon=1&addressdetails=" + addressdetails;
							break;
						case "Bing":
							alert(M.I18N.l('showInMapBingAlert'));
							url_byAddress = "http://www.bing.com/maps/default.aspx?rtp=~adr." + street + " " + housenumber + " " + zip + " " + city + " " + country;
							break;
						case "Google":
							alert(M.I18N.l('showInMapGoogleAlert'));
							url_byAddress = "http://maps.google.com/maps?q=" + street + " " + housenumber + " " + zip + " " + city + " " + country + "&hl=de";
							break;
						default:
							url_byAddress = "disabled";
							break;
						}
						if (url_byAddress !== "disabled") {
							if (typeof(plugins) !== "undefined") {
			    				if (typeof(plugins.childBrowser) !== "undefined") {
			    					try { plugins.childBrowser.close(); } catch(e) { alert("Error: " + e.message); };
			    					try { 
			    						plugins.childBrowser.showWebPage(encodeURI(url_byAddress), { showNavigationBar: true });
			    					} catch(e) { alert("Error: " + e.message); };
			    				} else {
			    					window.open(url_byAddress,'childBrowser','width=800,height=600,menubar=no,status=no,location=no,copyhistory=no,directories=no');
			    				}
		    				} else {
		    					window.open(url_byAddress,'childBrowser','width=800,height=600,menubar=no,status=no,location=no,copyhistory=no,directories=no');
		    				}
						} else {
							// TODO: Error-Message for disabled Map-Services
						}
						return false;
	    			}
	            }
	        }
	    })
	
	    , showCoordinatesInMapButton: M.ButtonView.design({
	          value: M.I18N.l('showCoordinatesInMap')
	        //, cssClass: 'digiButton'
	        //, anchorLocation: M.CENTER
	        , events: {
	            tap: {
	                action: function() {
						var longitude = DigiWebApp.OrderInfoController.items[0].positionLongitude;
						var latitude = DigiWebApp.OrderInfoController.items[0].positionLatitude;
						var zoom = '15';
						var url_byCoordinates = "";
						switch ( DigiWebApp.SettingsController.getSetting('mapType') ) {
							case "OSM":
								alert(M.I18N.l('showInMapOSMAlert'));
								url_byCoordinates = "http://www.openstreetmap.org/index.html?mlat=" + latitude + "&mlon=" + longitude + "&zoom=" + zoom + "&layers=M";
								break;
							case "Bing":
								alert(M.I18N.l('showInMapBingAlert'));
								url_byCoordinates = "http://www.bing.com/maps/default.aspx?rtp=adr.~pos." + latitude + "_" + longitude + "_&lvl=" + (zoom + 1);
								break;
							case "Google":
								alert(M.I18N.l('showInMapGoogleAlert'));
								url_byCoordinates = "http://maps.google.com/maps?q=" + latitude + "+" + longitude + "&hl=de";
								break;
							default:
								url_byCoordinates = "disabled";
								break;
						}
						if (url_byCoordinates !== "disabled") {
		    				if (typeof(plugins) !== "undefined") {
			    				if (typeof(plugins.childBrowser) !== "undefined") {
			    					try { plugins.childBrowser.close(); } catch(e) { alert("Error: " + e.message); };
			    					try { 
				    					plugins.childBrowser.showWebPage(encodeURI(url_byCoordinates), { showNavigationBar: true });
			    					} catch(e) { alert("Error: " + e.message); };
			    				} else {
			    					window.open(url_byCoordinates,'childBrowser','width=800,height=600,menubar=no,status=no,location=no,copyhistory=no,directories=no');
			    				}
		    				} else {
		    					window.open(url_byCoordinates,'childBrowser','width=800,height=600,menubar=no,status=no,location=no,copyhistory=no,directories=no');
		    				}
						} else {
							// TODO: Error-Message for disabled Map-Services
						}
	    			}
	            }
	        }
	    })

    //})
});



// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: OrderInfoPage
// ==========================================================================

m_require('app/views/OrderInfoTemplateView');

DigiWebApp.OrderInfoPage = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
    events: {
		pagebeforeshow: {
            target: DigiWebApp.OrderInfoController,
            action: 'init'
        }
    }

    , childViews: 'header selectionContent list'

    , cssClass: 'orderInfoPage'

    , header: M.ToolbarView.design({
        childViews: 'backButton title'
        , cssClass: 'header'
        , isFixed: YES
        , backButton: M.ButtonView.design({
            value: M.I18N.l('back')
            , icon: 'arrow-l'
            , anchorLocation: M.LEFT
            , events: {
                tap: {
                    target: DigiWebApp.NavigationController,
                    action: 'backToDashboardPage'
                }
            }
        })
        , title: M.LabelView.design({
            value: M.I18N.l('orderInfo')
            , anchorLocation: M.CENTER
        })
        , anchorLocation: M.TOP
    })

    , selectionContent: M.ScrollView.design({
        childViews: 'order position'
	    , order: M.SelectionListView.design({
	        selectionMode: M.SINGLE_SELECTION_DIALOG
	        , initialText: M.I18N.l('noData')
	        , label: M.I18N.l('order')
	        //, cssClass: 'marginBottom25'
	        , applyTheme: NO
	        , contentBinding: {
	            target: DigiWebApp.OrderInfoController,
	            property: 'orders'
	        }
	        , events: {
	            change: {
	                target: DigiWebApp.OrderInfoController,
	                action: function() {
		                var orderId = M.ViewManager.getView('orderInfoPage', 'order').getSelection(YES).value;
		                if (orderId) {
			                var orders = DigiWebApp.HandOrder.findSorted().concat(DigiWebApp.Order.findSorted()); // we need to check handOrders also
			                _.each(orders, function(order) {
		                    	if (order.get('id') === orderId) {
		                    		DigiWebApp.OrderInfoController.set('activeOrder', [order]);
		                    	}
			                });
			                DigiWebApp.OrderInfoController.setPositions();
		                }
		                DigiWebApp.OrderInfoController.setItem();
	                }
	            }
	        }
	    })
	    
	    , position: M.SelectionListView.design({
	        selectionMode: M.SINGLE_SELECTION_DIALOG
	        , initialText: M.I18N.l('noData')
	        , label: M.I18N.l('position')
	        //, cssClass: 'marginBottom25'
	        , applyTheme: NO
	        , contentBinding: {
	            target: DigiWebApp.OrderInfoController,
	            property: 'positions'
	        }
	        , events: {
	            change: {
	                target: DigiWebApp.OrderInfoController,
	                action: function() {
		                var positionId = M.ViewManager.getView('orderInfoPage', 'position').getSelection(YES).value;
		                if (positionId) {
			                var positions = DigiWebApp.Position.findSorted();
			                _.each(positions, function(position) {
		                    	if (position.get('id') === positionId) {
		                    		DigiWebApp.OrderInfoController.set('activePosition', [position]);
		                    	}
			                });
		                }
                		DigiWebApp.OrderInfoController.setItem();
	                }
	            }
	        }
	    })
    })

    , list: M.ListView.design({
        contentBinding: {
            target: DigiWebApp.OrderInfoController,
            property: 'items'
        },
        listItemTemplateView: DigiWebApp.OrderInfoTemplateView
    })
    
});


// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: TimeDataSentTemplateView
// ==========================================================================

DigiWebApp.TimeDataSentTemplateView = M.ListItemView.design({

    isSelectable: NO

    , childViews: 'date order position activity latitude longitude remark'

    , events: {
        tap: {
			action: function(id, m_id) {
			}
        }
    }

	, date: M.LabelView.design({
        cssClass: 'date unselectable',
        computedValue: {
            valuePattern: '<%= date %>',
            //value: '01.01.2011, 08:00 - 08:20 Uhr, 0:20 h',
            operation: function(v) {
                v = v.split(',');
                var date1 = M.Date.create(Number(v[0]));
                var date2 = v[1] !== "0" ? M.Date.create(Number(v[1])) : null;
                if(date2) {
                    // cut minutes down => 12:05:59 is going to be 12:05:00
                    date1 = M.Date.create(date1.format('mm/dd/yyyy HH:MM'));
                    date2 = M.Date.create(date2.format('mm/dd/yyyy HH:MM'));

                    if(date1.format('mm/dd/yyyy HH:MM') === date2.format('mm/dd/yyyy HH:MM')) { // if booking is closed in the same minute
                        return date1.format('dd.mm.yyyy') + ', ' + date1.format('HH:MM') + ' - ' + date2.format('HH:MM') + ' ' + M.I18N.l('oclock') + ', 00:01 h';
                    } else {
                        var timeBetween = date1.timeBetween(date2, M.MINUTES);
                        if(timeBetween < 1) {
                            timeBetween = M.Math.round(timeBetween, M.CEIL);
                        } else {
                            timeBetween = M.Math.round(date1.timeBetween(date2, M.MINUTES), M.FLOOR);
                        }
                        if(timeBetween > 59) {
                            var hours = M.Math.round(timeBetween / 60, M.FLOOR);
                            hours = hours < 10 ? '0' + hours : hours;
                            var minutes = timeBetween % 60;
                            minutes = minutes < 10 ? '0' + minutes : minutes;
                            timeBetween = hours + ':' + minutes;
                        } else {
                            timeBetween = '00:' + (timeBetween < 10 ? '0' : '') + timeBetween;
                        }
                        return date1.format('dd.mm.yyyy') + ', ' + date1.format('HH:MM') + ' - ' + date2.format('HH:MM') + ' ' + M.I18N.l('oclock') + ', ' + timeBetween + ' h';
                    }


                } else {
                    return date1.format('dd.mm.yyyy') + ', ' + date1.format('HH:MM') + ' - ' + M.I18N.l('open');
                }

            }
        }
    })

    , order: M.LabelView.design({
        cssClass: 'application unselectable',
        computedValue: {
            valuePattern: '<%= orderId %>',
            operation: function(v) {
                var order = _.select(DigiWebApp.Order.find().concat(DigiWebApp.HandOrder.find()), function(o) {
                    return v == o.get('id') || v == o.get('name'); // || get('name') is for checking handOrders also
                });
                if(order && order.length > 0) {
                    order = order[0];
                    if (DigiWebApp.SettingsController.getSetting('debug')) {
                    	return M.I18N.l('order') + ': ' + order.get('name') + ' (' + order.get('id') + ')';
                    } else {
                    	return M.I18N.l('order') + ': ' + order.get('name');
                    }
                } else {
                    return M.I18N.l('order') + ': ' + M.I18N.l('notDefined');
                }
            }
        }
    })

    , position: M.LabelView.design({
        cssClass: 'position unselectable',
        computedValue: {
            valuePattern: '<%= positionId %>',
            operation: function(v) {
                if(v) {
                    var position = _.select(DigiWebApp.Position.find(), function(p) {
                        return v == p.get('id');
                    });
                    if(position && position.length > 0) {
                        position = position[0];
                        return M.I18N.l('position') + ': ' + position.get('name');
                    } else {
                        return M.I18N.l('position') + ': ' + M.I18N.l('notDefined');
                    }
                } else {
                    return M.I18N.l('position') + ': ' + M.I18N.l('unknown');
                }

            }
        }
    })

    , activity: M.LabelView.design({
        cssClass: 'activity unselectable',
        computedValue: {
            valuePattern: '<%= activityId %>',
            operation: function(v) {
                if(v) {
                    var activity = _.select(DigiWebApp.Activity.find(), function(a) {
                        return v == a.get('id');
                    });
                    if(activity && activity.length > 0) {
                        activity = activity[0];
                        return M.I18N.l('activity') + ': ' + activity.get('name');
                    } else {
                        return M.I18N.l('activity') + ': ' + M.I18N.l('notDefined');
                    }

                } else {
                    return M.I18N.l('activity') + ': ' + M.I18N.l('unknown');
                }
            }
        }
    })
    
    , latitude: M.LabelView.design({
        cssClass: 'location unselectable',
        computedValue: {
            valuePattern: '<%= latitude %>',
            operation: function(v) {
                if(v > 0) {
                	var str = new Number(v);
               		return M.I18N.l('latitude') + ': ' + str.toFixed(6);
                } else {
                    //return M.I18N.l('latitude') + ': ' + M.I18N.l('GPSnotactive');
                	return '';
                }
            }
        }
    })

    , longitude: M.LabelView.design({
        cssClass: 'location unselectable',
        computedValue: {
            valuePattern: '<%= longitude %>',
            operation: function(v) {
                if (v > 0) { 
                	var str = new Number(v);
               		return M.I18N.l('longitude') + ': ' + str.toFixed(6);
                } else {
                    //return M.I18N.l('longitude') + ': ' + M.I18N.l('GPSnotactive');
                    return '';
                }
            }
        }
    })

    , remark: M.LabelView.design({
        cssClass: 'remark unselectable',
        computedValue: {
            valuePattern: '<%= remark %>',
            operation: function(v) {
                if (v) { 
               		return M.I18N.l('remark') + ': ' + v;
                } else {
                    return '';
                }
            }
        }
    })

});



// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: TimeDataPage
// ==========================================================================

m_require('app/views/TimeDataTemplateView');
m_require('app/views/TimeDataSentTemplateView');

DigiWebApp.TimeDataPage = M.PageView.design({

    events: {
		pagebeforeshow: {
            target: DigiWebApp.BookingController,
            action: 'setNotBookedBookings'
        }
    }

    , childViews: 'header contentNotSent contentSent'

    , cssClass: 'timeDataPage unselectable'

    , header: M.ToolbarView.design({
        childViews: 'backButton title'
        , cssClass: 'header unselectable'
        , isFixed: YES
        , backButton: M.ButtonView.design({
            value: M.I18N.l('back'),
            icon: 'arrow-l',
            anchorLocation: M.LEFT,
            events: {
                tap: {
                    target: DigiWebApp.NavigationController,
                    action: 'backToDashboardPage'
                }
            }
        })
        , title: M.LabelView.design({
            value: M.I18N.l('timeData'),
            anchorLocation: M.CENTER
        })
        , anchorLocation: M.TOP
    })

    , contentNotSent: M.ScrollView.design({
        childViews: 'list',
        list: M.ListView.design({
            contentBinding: {
                target: DigiWebApp.BookingController,
                property: 'timeData'
            },
            listItemTemplateView: DigiWebApp.TimeDataTemplateView
        })
    })

    , contentSent: M.ScrollView.design({
        childViews: 'list',
        cssClass: 'sentBookings',
        list: M.ListView.design({
            contentBinding: {
                target: DigiWebApp.BookingController,
                property: 'timeDataSent'
            },
            listItemTemplateView: DigiWebApp.TimeDataSentTemplateView
        })
    })

});


// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: DemoCameraPage
// ==========================================================================

DigiWebApp.DemoCameraPage = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
    events: {
		pagebeforeshow: {
            target: DigiWebApp.DemoCameraController,
            action: 'init'
        }
    },

    cssClass: 'demoCameraPage',

    childViews: 'header content',

    header: M.ToolbarView.design({
        childViews: 'backButton title',
        cssClass: 'header',
        isFixed: YES,
        backButton: M.ButtonView.design({
            value: M.I18N.l('back'),
            icon: 'arrow-l',
            anchorLocation: M.LEFT,
            events: {
                tap: {
                    target: DigiWebApp.NavigationController,
                    action: 'backToDemoMediaPage'
                }
            }
        }),
        title: M.LabelView.design({
            value: M.I18N.l('takePictureDemo'),
            anchorLocation: M.CENTER
        }),
        anchorLocation: M.TOP
    }),

    content: M.ScrollView.design({
        childViews: 'image takePictureGrid',

        image: M.ImageView.design({
        		  value: ''
        		, cssClass: 'demophoto'
        }),

        takePictureGrid: M.GridView.design({
        	childViews: 'button icon',
        	layout: {
            	cssClass: 'marginTop40 digiButton',
            	columns: {
                	0: 'button',
                	1: 'icon'
            	}
        	},
        
        	button: M.ButtonView.design({
        		value: M.I18N.l('takePicture'),
        		cssClass: 'digiButton',
        		anchorLocation: M.RIGHT,
        		events: {
                	tap: {
        				target: DigiWebApp.DemoCameraController,
        				action: 'takePicture'
                	}
            	}
        	}),
        
        	icon: M.ImageView.design({
        		value: 'theme/images/icon_bookTime.png'
        	})
        })
    })
});


// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: AudioPage
// ==========================================================================

DigiWebApp.DemoAudioPage = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
    events: {
		pagebeforeshow: {
            target: DigiWebApp.DemoAudioController,
            action: 'init'
        }
    },

    childViews: 'header content',

    cssClass: 'demoAudioPage',

    header: M.ToolbarView.design({
        childViews: 'backButton title',
        cssClass: 'header',
        isFixed: YES,
        backButton: M.ButtonView.design({
            value: M.I18N.l('back'),
            icon: 'arrow-l',
            anchorLocation: M.LEFT,
            events: {
                tap: {
                    target: DigiWebApp.NavigationController,
                    action: 'backToDemoMediaPage'
                }
            }
        }),
        title: M.LabelView.design({
            value: M.I18N.l('settings'),
            anchorLocation: M.CENTER
        }),
        anchorLocation: M.TOP
    }),

    content: M.ScrollView.design({
        //childViews: 'audioIcon recordIcon stopRecordIcon playIcon stopIcon grid',
        childViews: 'audioIcon grid',
        
        audioIcon: M.ImageView.design({
    		value: 'theme/images/icon_record.png',
    		cssClass: 'audioIcon',
        	events: {
        		tap: {
        			target: DigiWebApp.DemoAudioController,
					action: 'recordAudio'
        		}
    		}
        }),

        recordIcon: M.ImageView.design({
    		value: 'theme/images/icon_record.png',
    		cssClass: 'mediaIcon',
        	events: {
        		tap: {
        			action: DigiWebApp.DemoAudioController.recordAudio
        		}
    		}
        }),

        recordIcon: M.ImageView.design({
    		value: 'theme/images/icon_record.png',
    		cssClass: 'mediaIcon',
        	events: {
        		tap: {
        			action: DigiWebApp.DemoAudioController.recordAudio
        		}
    		}
        }),

        stopRecordIcon: M.ImageView.design({
    		value: 'theme/images/icon_stop.png',
    		cssClass: 'mediaIcon',
        	events: {
        		tap: {
					action: DigiWebApp.DemoAudioController.stopRecord
        		}
    		}
        }),

        playIcon: M.ImageView.design({
    		value: 'theme/images/icon_playbackAudio.png',
    		cssClass: 'mediaIcon',
        	events: {
        		tap: {
					action: DigiWebApp.DemoAudioController.playbackAudio
        		}
    		}
        }),

        stopIcon: M.ImageView.design({
    		value: 'theme/images/icon_stop.png',
    		cssClass: 'mediaIcon',
        	events: {
        		tap: {
					action: DigiWebApp.DemoAudioController.stopPlayback
        		}
    		}
        }),

        grid: M.GridView.design({
        	childViews: 'button icon',
        	layout: {
            	cssClass: 'marginTop40 digiButton',
            	columns: {
                	0: 'button',
                	1: 'icon'
            	}
        	},
        
        	button: M.ButtonView.design({
        		value: M.I18N.l('recordAudio'),
        		cssClass: 'digiButton',
        		anchorLocation: M.RIGHT,
        		events: {
                	tap: {
        				target: DigiWebApp.DemoAudioController,
        				action: 'recordAudio'
                	}
            	}
        	}),
        
        	icon: M.ImageView.design({
        		value: 'theme/images/icon_bookTime.png'
        	})
        })
    })


});


// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: DemoMediaPageTemplateView
// ==========================================================================

DigiWebApp.DemoMediaPageTemplateView = M.ListItemView.design({

    isSelectable: NO,

    childViews: 'icon label',

    events: {
        tap: {
            target: DigiWebApp.DemoMediaPageController,
            action: 'itemSelected'
        }
    },

    icon: M.ImageView.design({
        computedValue: {
            valuePattern: '<%= icon %>',
            operation: function(v) {
                return 'theme/images/' + v;
            }
        }
    }),

    label: M.LabelView.design({
        valuePattern: '<%= label %>'
    })

});

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: DemoMediaPage
// ==========================================================================

m_require('app/views/DemoMediaPageTemplateView.js');

DigiWebApp.DemoMediaPage = M.PageView.design({

    childViews: 'header content',

    cssClass: 'demoMediaPage',

    events: {
		pagebeforeshow: {
            target: DigiWebApp.DemoMediaPageController,
            action: 'init'
        }
    },
    
    needsUpdate: true,
    
    header: M.ToolbarView.design({
        childViews: 'backButton title',
        cssClass: 'header',
        isFixed: YES,
        backButton: M.ButtonView.design({
            value: M.I18N.l('back'),
            icon: 'arrow-l',
            anchorLocation: M.LEFT,
            events: {
                tap: {
                    target: DigiWebApp.NavigationController,
                    action: 'backToDashboardPage'
                }
            }
        }),
        title: M.LabelView.design({
            value: M.I18N.l('info'),
            anchorLocation: M.CENTER
        }),
        anchorLocation: M.TOP
    }),

    content: M.ScrollView.design({

        childViews: 'list',

        list: M.ListView.design({
            contentBinding: {
                target: DigiWebApp.DemoMediaPageController,
                property: 'items'
            },
            listItemTemplateView: DigiWebApp.DemoMediaPageTemplateView
        })
    })

});


// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: AnwesenheitslisteTemplateView
// ==========================================================================

DigiWebApp.AnwesenheitslisteTemplateView = M.ListItemView.design({

      isSelectable: YES

    , childViews: 'farbeAnwesenheit nameVorname spacer1 datum uhrzeit spacer2 positionsBezeichnung handauftragsBezeichnung taetigkeit gpsBreite gpsLaenge gpsBreitePosition gpsLaengePosition'

    , events: {
        tap: {
			action: function(id, m_id) {
				//console.log("id is");
				//console.log(id);
				//console.log("m_id is");
				//console.log(m_id);
				var doShow = NO;
			    var view = M.ViewManager.getViewById(id);
				//console.log("view is");
				//console.log(view);
			    //var mitarbeiter_modelId = M.ViewManager.getView(view, 'nameVorname').modelId;
			    var mitarbeiter_modelId = view.modelId;
				//console.log("mitarbeiter_modelId is");
				//console.log(mitarbeiter_modelId);
			    _.each(DigiWebApp.AnwesenheitslisteController.items, function(AnwesenheitslisteItem) {
					if (AnwesenheitslisteItem.m_id === mitarbeiter_modelId) {
						if (AnwesenheitslisteItem.get("datum") !== "-") {
							//console.log("AnwesenheitslisteItem found");
							//console.log(AnwesenheitslisteItem);
							DigiWebApp.ZeitbuchungenController.set('datum', AnwesenheitslisteItem.get("datum"));
							DigiWebApp.ZeitbuchungenController.set('mitarbeiterID', AnwesenheitslisteItem.get("mitarbeiterId"));
							DigiWebApp.ZeitbuchungenController.set('mitarbeiterNameVorname', AnwesenheitslisteItem.get("nameVorname"));
							doShow = YES;
						}
					}
				});
				if (doShow === YES) DigiWebApp.NavigationController.toZeitbuchungenPageTransition();
			}
        }
    }

	, spacer1: M.LabelView.design({
	      cssClass: 'unselectable marginBottom12'
	    , value: ' '
	})
	
	, spacer2: M.LabelView.design({
	      cssClass: 'unselectable marginBottom12'
	    , value: ' '
	})


//"datum": "27.08.2012",
, datum: M.LabelView.design({
    cssClass: 'normal unselectable'
  , isInline: YES
  , computedValue: {
        valuePattern: '<%= datum %>'
      , operation: function(v) {
			if (v !== "-") {
		        return M.I18N.l('since') + ' ' + v;
			} else {
				return "";
			}
          }
  }
})
//"farbeAmpel": "",
, farbeAmpel: M.LabelView.design({
    cssClass: 'unselectable'
  , computedValue: {
        valuePattern: '<%= farbeAmpel %>'
      , operation: function(v) {
              return v;
          }
  }
})
//"farbeAnwesenheit": "#00FF00",
, farbeAnwesenheit: M.LabelView.design({
    cssClass: 'unselectable'
  , isInline: YES
  , computedValue: {
        valuePattern: '<%= farbeAnwesenheit %>'
      , operation: function(v) {
    			//return '<span style="-moz-border-radius: 3em 0em;-webkit-border-radius: 24px 0;border-radius: 24px 0;box-shadow: 2px 2px 6px rgba(0,0,0,0.6);background:' + v + ';color:' + v + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;';
    			return '<span style="box-shadow: 2px 2px 6px rgba(0,0,0,0.6);background:' + v + ';color:' + v + ';margin-right: 5px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;';
          }
  }
})
//"fehlzeitBezeichnung": "",
, fehlzeitBezeichnung: M.LabelView.design({
    cssClass: 'unselectable'
  , computedValue: {
        valuePattern: '<%= fehlzeitBezeichnung %>'
      , operation: function(v) {
              return v;
          }
  }
})
//"fehlzeitFarbe": "",
, fehlzeitFarbe: M.LabelView.design({
    cssClass: 'unselectable'
  , computedValue: {
        valuePattern: '<%= fehlzeitFarbe %>'
      , operation: function(v) {
              return v;
          }
  }
})
//	  gpsBreite: "0.0"
, gpsBreite: M.LabelView.design({
    cssClass: 'normal unselectable'
  , computedValue: {
        valuePattern: '<%= gpsBreite %>'
      , operation: function(v) {
		        if (v != "0.0") { 
		        	var str = new Number(v);
		       		return M.I18N.l('latitude') + ': ' + str.toFixed(6);
		        } else {
		            //return M.I18N.l('latitude') + ': ' + M.I18N.l('GPSnotactive');
		            return '';
		        }
          }
  }
})
//	  gpsBreitePosition: "0.0"
, gpsBreitePosition: M.LabelView.design({
    cssClass: 'normal unselectable'
  , computedValue: {
        valuePattern: '<%= gpsBreitePosition %>'
      , operation: function(v) {
	        if (v != "0.0") { 
	        	var str = new Number(v);
	       		return M.I18N.l('position') + '-' + M.I18N.l('latitude') + ': ' + str.toFixed(6);
	        } else {
	            //return M.I18N.l('position') + '-' + M.I18N.l('latitude') + ': ' + M.I18N.l('GPSnotactive');
	            return '';
	        }
          }
  }
})
//	  gpsLaenge: "0.0"
, gpsLaenge: M.LabelView.design({
    cssClass: 'normal unselectable'
  , computedValue: {
        valuePattern: '<%= gpsLaenge %>'
      , operation: function(v) {
	        if (v != "0.0") { 
	        	var str = new Number(v);
	       		return M.I18N.l('longitude') + ': ' + str.toFixed(6);
	        } else {
	            //return M.I18N.l('longitude') + ': ' + M.I18N.l('GPSnotactive');
	            return '';
	        }
          }
  }
})
//	  gpsLaengePosition: "0.0"
, gpsLaengePosition: M.LabelView.design({
    cssClass: 'normal unselectable'
  , computedValue: {
        valuePattern: '<%= gpsLaengePosition %>'
      , operation: function(v) {
		        if (v != "0.0") { 
		        	var str = new Number(v);
		       		return M.I18N.l('position') + '-' + M.I18N.l('longitude') + ': ' + str.toFixed(6);
		        } else {
		            //return M.I18N.l('position') + '-' + M.I18N.l('longitude') + ': ' + M.I18N.l('GPSnotactive');
		            return '';
		        }
          }
  }
})
//"handauftragsBezeichnung": "",
, handauftragsBezeichnung: M.LabelView.design({
    cssClass: 'normal unselectable'
  , computedValue: {
        valuePattern: '<%= handauftragsBezeichnung %>'
      , operation: function(v) {
			if (v !== "" && typeof(v) !== "undefined" && v !== "undefined") {
				return M.I18N.l('handApplications') + ': ' + v;
			} else {
				return '';
			}
          }
  }
})
//"handauftragsId": "",
, handauftragsId: M.LabelView.design({
    cssClass: 'unselectable'
  , computedValue: {
        valuePattern: '<%= handauftragsId %>'
      , operation: function(v) {
              return v;
          }
  }
})
//"mitarbeiterId": "29",
, mitarbeiterId: M.LabelView.design({
    cssClass: 'unselectable'
  , computedValue: {
        valuePattern: '<%= mitarbeiterId %>'
      , operation: function(v) {
              return v;
          }
  }
})
//"name": "Maier",
, name: M.LabelView.design({
    cssClass: 'bold unselectable'
  , computedValue: {
        valuePattern: '<%= name %>'
      , operation: function(v) {
              return v;
          }
  }
})
//"nameVorname": "Maier, Peter",
, nameVorname: M.LabelView.design({
    cssClass: 'bold unselectable'
  , isInline: YES
  , computedValue: {
        valuePattern: '<%= nameVorname %>'
      , operation: function(v) {
              return v;
          }
  }
})
//"positionsBezeichnung": "1446DEKRA",
, positionsBezeichnung: M.LabelView.design({
    cssClass: 'normal unselectable'
  , computedValue: {
        valuePattern: '<%= positionsBezeichnung %>'
      , operation: function(v) {
			if (v !== "" && typeof(v) !== "undefined" && v !== "undefined") {
				return M.I18N.l('position') + ': ' + v;
			} else {
				return '';
			}
          }
  }
})
//"positionsId": "1929",
, positionsId: M.LabelView.design({
    cssClass: 'unselectable'
  , computedValue: {
        valuePattern: '<%= positionsId %>'
      , operation: function(v) {
              return v;
          }
  }
})
//"taetigkeit": "05Stromversorger",
, taetigkeit: M.LabelView.design({
    cssClass: 'normal unselectable'
  , computedValue: {
        valuePattern: '<%= taetigkeit %>'
      , operation: function(v) {
			if (v !== "" && typeof(v) !== "undefined" && v !== "undefined") {
				return M.I18N.l('activity') + ': ' + v;
			} else {
				return '';
			}
          }
  }
})
//"taetigkeitsId": "89",
, taetigkeitsId: M.LabelView.design({
    cssClass: 'unselectable'
  , computedValue: {
        valuePattern: '<%= taetigkeitsId %>'
      , operation: function(v) {
              return v;
          }
  }
})
//"taetigkeitsart": "0",
, taetigkeitsart: M.LabelView.design({
    cssClass: 'unselectable'
  , computedValue: {
        valuePattern: '<%= taetigkeitsart %>'
      , operation: function(v) {
              return v;
          }
  }
})
//"uhrzeit": "27-08-2012 11:50:52",
, uhrzeit: M.LabelView.design({
    cssClass: 'normal unselectable'
  , isInline: YES
  , computedValue: {
        valuePattern: '<%= uhrzeit %>'
      , operation: function(v) {
			if (v !== "-") {
		        return ' ' + v;
			} else {
				return "";
			}
          }
  }
})
//"vorname": "Peter"
, vorname: M.LabelView.design({
    cssClass: 'bold unselectable'
  , computedValue: {
        valuePattern: '<%= vorname %>'
      , operation: function(v) {
              return v;
          }
  }
})
    
});



// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: ZeitbuchungenPage
// ==========================================================================

m_require('app/views/AnwesenheitslisteTemplateView');

DigiWebApp.AnwesenheitslistePage = M.PageView.design({

    events: {
		pageshow: {
            target: DigiWebApp.AnwesenheitslisteController,
            action: 'init'
        }
    }

    , childViews: 'header content'

    , cssClass: 'anwesenheitslistePage unselectable'

    , header: M.ToolbarView.design({
        childViews: 'backButton title'
        , cssClass: 'header unselectable'
        , isFixed: YES
        , backButton: M.ButtonView.design({
            value: M.I18N.l('back'),
            icon: 'arrow-l',
            anchorLocation: M.LEFT,
            events: {
                tap: {
                    target: DigiWebApp.NavigationController,
                    action: 'backToDashboardPage'
                }
            }
        })
        , title: M.LabelView.design({
            value: M.I18N.l('Anwesenheitsliste'),
            anchorLocation: M.CENTER
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({
        childViews: 'list',
        list: M.ListView.design({
            contentBinding: {
                target: DigiWebApp.AnwesenheitslisteController,
                property: 'items'
            },
            listItemTemplateView: DigiWebApp.AnwesenheitslisteTemplateView
        })
    })

});


// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: ZeitbuchungenTemplateView
// ==========================================================================

DigiWebApp.ZeitbuchungenTemplateView = M.ListItemView.design({

      isSelectable: YES

    , childViews: 'datum von bis dauer spacer2 positionsBezeichnung handauftragsBezeichnung taetigkeit gpsBreite gpsLaenge gpsBreitePosition gpsLaengePosition'

    , events: {
        tap: {
			action: function(id, m_id) {
						var doShow = NO;
					    var view = M.ViewManager.getViewById(id);
					    //var mitarbeiter_m_id = M.ViewManager.getView(view, 'nameVorname').item.m_id;
					    var mitarbeiter_modelId = view.modelId;
						var longitude = '0.0';
						var latitude = '0.0';
						_.each(DigiWebApp.ZeitbuchungenController.items, function(ZeitbuchungenItem) {
							if (ZeitbuchungenItem.m_id === mitarbeiter_modelId) {
								if (ZeitbuchungenItem.get("gpsLaenge") !== "0.0" && ZeitbuchungenItem.get("gpsBreite") !== "0.0") {
									longitude = ZeitbuchungenItem.get("gpsLaenge");
									latitude = ZeitbuchungenItem.get("gpsBreite");
									doShow = YES;
								}
							}
						});
						
						if (doShow === YES) {

							var zoom = '15';
							var url_byCoordinates = "";
							switch ( DigiWebApp.SettingsController.getSetting('mapType') ) {
								case "OSM":
									alert(M.I18N.l('showInMapOSMAlert'));
									url_byCoordinates = "http://www.openstreetmap.org/index.html?mlat=" + latitude + "&mlon=" + longitude + "&zoom=" + zoom + "&layers=M";
									break;
								case "Bing":
									alert(M.I18N.l('showInMapBingAlert'));
									url_byCoordinates = "http://www.bing.com/maps/default.aspx?rtp=adr.~pos." + latitude + "_" + longitude + "_&lvl=" + (zoom + 1);
									break;
								case "Google":
									alert(M.I18N.l('showInMapGoogleAlert'));
									url_byCoordinates = "http://maps.google.com/maps?q=" + latitude + "+" + longitude + "&hl=de";
									break;
								default:
									url_byCoordinates = "disabled";
									break;
							}
							if (url_byCoordinates !== "disabled") {
								if (typeof(plugins) !== "undefined") {
									if (typeof(plugins.childBrowser) !== "undefined") {
										plugins.childBrowser.showWebPage(encodeURI(url_byCoordinates), { showLocationBar: false });
									} else {
										window.open(url_byCoordinates,'childBrowser','width=800,height=600,menubar=no,status=no,location=no,copyhistory=no,directories=no');
									}
								} else {
									window.open(url_byCoordinates,'childBrowser','width=800,height=600,menubar=no,status=no,location=no,copyhistory=no,directories=no');
								}
							} else {
								// TODO: Error-Message for disabled Map-Services
							}
						}
			}
		}
	}

	, spacer1: M.LabelView.design({
	    value: ' '
	})

	, spacer2: M.LabelView.design({
	    value: ' '
	})

	//	  auftragsBezeichnung: "6657Heim"
	, auftragsBezeichnung: M.LabelView.design({
        cssClass: 'bold unselectable'
      , computedValue: {
            valuePattern: '<%= auftragsBezeichnung %>'
          , operation: function(v) {
				if (v !== "" && typeof(v) !== "undefined" && v !== "undefined") {
					return M.I18N.l('order') + ': ' + v;
				} else {
					return '';
				}
              }
      }
	})
	//	  auftragsId: "950"
	, auftragsId: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= auftragsId %>'
          , operation: function(v) {
                  return v;
              }
      }
	})
	//	  bis: "10:37:08"
	, bis: M.LabelView.design({
        cssClass: 'bold unselectable'
      , isInline: YES
      , computedValue: {
            valuePattern: '<%= bis %>'
          , operation: function(v) {
                  return ' - ' + v;
              }
      }
	})
	//	  datum: "14.06.2012"
	, datum: M.LabelView.design({
        cssClass: 'bold unselectable'
      , isInline: YES
      , computedValue: {
            valuePattern: '<%= datum %>'
          , operation: function(v) {
				if (v !== "-") {
			        return v;
				} else {
					return "";
				}
              }
      }
	})
	//	  dauer: "00:00"
	, dauer: M.LabelView.design({
        cssClass: 'normal unselectable'
      , isInline: YES
      , computedValue: {
            valuePattern: '<%= dauer %>'
          , operation: function(v) {
					if (v!== "00:00") {
						return ' (' + v + ')';
					} else {
						return '';
					}
              }
      }
	})
	//	  farbeAmpel: ""
	, farbeAmpel: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= farbeAmpel %>'
          , operation: function(v) {
                  return v;
              }
      }
	})
	//	  gpsBreite: "0.0"
	, gpsBreite: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= gpsBreite %>'
          , operation: function(v) {
			        if (v != "0.0") { 
			        	var str = new Number(v);
			       		return M.I18N.l('latitude') + ': ' + str.toFixed(6);
			        } else {
			            //return M.I18N.l('latitude') + ': ' + M.I18N.l('GPSnotactive');
			            return '';
			        }
              }
      }
	})
	//	  gpsBreitePosition: "0.0"
	, gpsBreitePosition: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= gpsBreitePosition %>'
          , operation: function(v) {
		        if (v != "0.0") { 
		        	var str = new Number(v);
		       		return M.I18N.l('position') + '-' + M.I18N.l('latitude') + ': ' + str.toFixed(6);
		        } else {
		            //return M.I18N.l('position') + '-' + M.I18N.l('latitude') + ': ' + M.I18N.l('GPSnotactive');
		            return '';
		        }
              }
      }
	})
	//	  gpsLaenge: "0.0"
	, gpsLaenge: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= gpsLaenge %>'
          , operation: function(v) {
		        if (v != "0.0") { 
		        	var str = new Number(v);
		       		return M.I18N.l('longitude') + ': ' + str.toFixed(6);
		        } else {
		            //return M.I18N.l('longitude') + ': ' + M.I18N.l('GPSnotactive');
		            return '';
		        }
              }
      }
	})
	//	  gpsLaengePosition: "0.0"
	, gpsLaengePosition: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= gpsLaengePosition %>'
          , operation: function(v) {
			        if (v != "0.0") { 
			        	var str = new Number(v);
			       		return M.I18N.l('position') + '-' + M.I18N.l('longitude') + ': ' + str.toFixed(6);
			        } else {
			            //return M.I18N.l('position') + '-' + M.I18N.l('longitude') + ': ' + M.I18N.l('GPSnotactive');
			            return '';
			        }
              }
      }
	})
	//	  handauftragsBezeichnung: "6657Heim"
	, handauftragsBezeichnung: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= handauftragsBezeichnung %>'
          , operation: function(v) {
				if (v !== "" && typeof(v) !== "undefined" && v !== "undefined") {
					return M.I18N.l('handApplications') + ': ' + v;
				} else {
					return '';
				}
              }
      }
	})
	//	  handauftragsId: "950"
	, handauftragsId: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= handauftragsId %>'
          , operation: function(v) {
                  return v;
              }
      }
	})
	//	  mitarbeiterId: "12"
	, mitarbeiterId: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= mitarbeiterId %>'
          , operation: function(v) {
                  return v;
              }
      }
	})
	//	  name: "Alber"
	, name: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= name %>'
          , operation: function(v) {
                  return v;
              }
      }
	})
	//	  nameVorname: "Alber, Michael"
	, nameVorname: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= nameVorname %>'
          , operation: function(v) {
                  return v;
              }
      }
	})
	//	  positionsBezeichnung: "6657Heim"
	, positionsBezeichnung: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= positionsBezeichnung %>'
          , operation: function(v) {
				if (v !== "" && typeof(v) !== "undefined" && v !== "undefined") {
					return M.I18N.l('position') + ': ' + v;
				} else {
					return '';
				}
              }
      }
	})
	//	  positionsId: "1874"
	, positionsId: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= positionsId %>'
          , operation: function(v) {
                  return v;
              }
      }
	})
	//	  taetigkeit: "HolzLackraum"
	, taetigkeit: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= taetigkeit %>'
          , operation: function(v) {
				if (v !== "" && typeof(v) !== "undefined" && v !== "undefined") {
					return M.I18N.l('activity') + ': ' + v;
				} else {
					return '';
				}
              }
      }
	})
	//	  taetigkeitsId: "21"
	, taetigkeitsId: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= taetigkeitsId %>'
          , operation: function(v) {
                  return v;
              }
      }
	})
	//	  taetigkeitsart: "0"
	, taetigkeitsart: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= taetigkeitsart %>'
          , operation: function(v) {
                  return v;
              }
      }
	})
	//	  von: "10:36:45"
	, von: M.LabelView.design({
        cssClass: 'bold unselectable'
      , isInline: YES
      , computedValue: {
            valuePattern: '<%= von %>'
          , operation: function(v) {
                  return ' ' + v;
              }
      }
	})
	//	  vorname: "Michael"
	, vorname: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= vorname %>'
          , operation: function(v) {
                  return v;
              }
      }
	})
      
});



// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: ZeitbuchungenPage
// ==========================================================================

m_require('app/views/ZeitbuchungenTemplateView');

DigiWebApp.ZeitbuchungenPage = M.PageView.design({

    events: {
		pageshow: {
            target: DigiWebApp.ZeitbuchungenController,
            action: 'init'
        }
    }

    , childViews: 'header content'

    , cssClass: 'zeitbuchungenPage unselectable'

    , header: M.ToolbarView.design({
        childViews: 'backButton title'
        , cssClass: 'header unselectable'
        , isFixed: YES
        , backButton: M.ButtonView.design({
            value: M.I18N.l('back'),
            icon: 'arrow-l',
            anchorLocation: M.LEFT,
            events: {
                tap: {
                    target: DigiWebApp.NavigationController,
                    action: 'backToAnwesenheitslistePageTransition'
                }
            }
        })
        , title: M.LabelView.design({
            value: M.I18N.l('Zeitbuchungen'),
            anchorLocation: M.CENTER
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({
        childViews: 'list',
        list: M.ListView.design({
            contentBinding: {
                target: DigiWebApp.ZeitbuchungenController,
                property: 'items'
            },
            listItemTemplateView: DigiWebApp.ZeitbuchungenTemplateView
        })
    })

});


// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: MediaActionTemplateView
// ==========================================================================

DigiWebApp.MediaActionTemplateView = M.ListItemView.design({

    isSelectable: NO,

    childViews: 'icon label',

    events: {
        tap: {
            target: DigiWebApp.MediaListController,
            action: 'itemSelected'
        }
    },

    icon: M.ImageView.design({
        computedValue: {
            valuePattern: '<%= icon %>',
            operation: function(v) {
                	return 'theme/images/' + v;
            }
        }
    }),

    label: M.LabelView.design({
        valuePattern: '<%= label %>'
    })

});

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: MediaListPage
// ==========================================================================

m_require('app/views/MediaListTemplateView.js');
m_require('app/views/MediaActionTemplateView.js');

DigiWebApp.MediaListPage = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
      events: {
		pagebeforeshow: {
              target: DigiWebApp.MediaListController
            , action: 'init'
        }
    }

    , needsUpdate: true

    , childViews: 'header actions mediafiles'

    , cssClass: 'mediaListPage unselectable'

    , header: M.ToolbarView.design({
          childViews: 'backButton title'
        , cssClass: 'header'
        , isFixed: YES
        , backButton: M.ButtonView.design({
              value: M.I18N.l('back')
            , icon: 'arrow-l'
            , anchorLocation: M.LEFT
            , events: {
                tap: {
                      target: DigiWebApp.NavigationController
                    , action: 'backToDashboardPage'
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('mediaList')
            , anchorLocation: M.CENTER
        })
        , anchorLocation: M.TOP
    })

    , mediafiles: M.ScrollView.design({

          childViews: 'mediafileslist'

        , cssClass: 'mediafilesList'
        	
        , mediafileslist: M.ListView.design({
              contentBinding: {
                  target: DigiWebApp.MediaListController
                , property: 'items'
              }
            , listItemTemplateView: DigiWebApp.MediaListTemplateView
        })
    })
    
    , actions: M.ScrollView.design({

          childViews: 'actionslist'
        	  
        , cssClass: 'actionsList'

        , actionslist: M.ListView.design({
              contentBinding: {
                  target: DigiWebApp.MediaListController
                , property: 'actions'
              }
            , listItemTemplateView: DigiWebApp.MediaActionTemplateView
        })
    })
    
});


// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: EditPicturePage
// ==========================================================================

DigiWebApp.EditPicturePage = M.PageView.design({

	  childViews: 'header content'
	
	, cssClass: 'editPicturePage'
	
	, events: {
		pagebeforeshow: {
	        target: DigiWebApp.EditPicturePageController,
	        action: 'init'
	    }
 	}

    , savePicture: function() {
    	var myRemark = '';
    	if ((M.ViewManager.getView('editPicturePage', 'remarkInput').value !== null) && (typeof(M.ViewManager.getView('editPicturePage', 'remarkInput').value) !== "undefined")) {
    		myRemark = M.ViewManager.getView('editPicturePage', 'remarkInput').value;
    	}

    	if (myRemark.length > 255) {
		      DigiWebApp.ApplicationController.DigiLoaderView.hide();
			  DigiWebApp.ApplicationController.nativeAlertDialogView({
					title: M.I18N.l('remarkTooLong'),
					message: M.I18N.l('remarkTooLongMessage')
			  });
		} else {
		      //if (/[[^a-zA-Z0-9_-äöüÄÖÜ,. !?;:/\\@€=]]+/.test(M.ViewManager.getView('editPicturePage', 'remarkInput').value)) {
		      if (DigiWebApp.ApplicationController.sonderzeichenCheck(myRemark)) {
		          DigiWebApp.ApplicationController.DigiLoaderView.hide();
		          DigiWebApp.ApplicationController.nativeAlertDialogView({
		              	  title: M.I18N.l('specialCharProblem')
		              	, message: M.I18N.l('specialCharProblemMsg')
		              });
	          } else {
		          	DigiWebApp.EditPicturePageController.savePicture();
	          }
		}
	}
	
	, header: M.ToolbarView.design({
	      childViews: 'backButton title deleteButton'
	    , cssClass: 'header'
	    , isFixed: YES
	    , backButton: M.ButtonView.design({
	    	  value: M.I18N.l('back')
	    	, icon: 'arrow-l'
	    	, anchorLocation: M.LEFT
	    	, events: {
	          	tap: {
	              	target: DigiWebApp.NavigationController,
	              	action: 'backToMediaListPageTransition'
	          	}
	      	  }
	    })
	    , deleteButton: M.ButtonView.design({
	    	  value: M.I18N.l('delete')
	    	, icon: 'delete'
	    	, anchorLocation: M.RIGHT
	    	, events: {
	          	tap: {
	              	//target: DigiWebApp.NavigationController,
	              	//action: 'backToMediaListPageTransition'
	    			action: function() {
	    				DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('deleteMediaFile'));
	    				DigiWebApp.EditPicturePageController.myMediaFile.deleteFile(
	    						  DigiWebApp.EditPicturePageController.deleteMediaFileFromLocalStorage
	    						, function() {
//	    							  DigiWebApp.ApplicationController.nativeAlertDialogView({
//	    									  title: M.I18N.l('error')
//	    									, message: M.I18N.l('errorWhileDeletingMediaFile')
//	    							  });
		    						  DigiWebApp.EditPicturePageController.deleteMediaFileFromLocalStorage();
	    						  }
	    				);
	    			}
	          	}
	      	  }
	    })

	  , title: M.LabelView.design({
	            value: M.I18N.l('editPicture')
	          , anchorLocation: M.CENTER
	        })
	      , anchorLocation: M.TOP
	  })
	
	  , content: M.ScrollView.design({
	  	
	        	childViews: 'image spacer order position activity remarkInput savePictureGrid'
	
			  , image: M.ImageView.design({
			  		value: '',
			  		cssClass: 'photo'
			  })
			  
			  , spacer: M.LabelView.design({
			  		value: ' '
			  })
			
			  , order: M.SelectionListView.design({
			      selectionMode: M.SINGLE_SELECTION_DIALOG,
			      initialText: M.I18N.l('noData'),
			      label: M.I18N.l('order'),
			      //cssClass: 'unselectable',
			      applyTheme: NO,
			      contentBinding: {
			          target: DigiWebApp.EditPicturePageController,
			          property: 'orders'
			      },
			      events: {
			          change: {
			              target: DigiWebApp.EditPicturePageController,
			              action: function() {
			                  this.setPositions();
			              }
			          }
			      }
			  })
	  
		    , position: M.SelectionListView.design({
		        selectionMode: M.SINGLE_SELECTION_DIALOG,
		        label: M.I18N.l('position'),
		        initialText: M.I18N.l('noData'),
		        //cssClass: 'unselectable',
		        applyTheme: NO,
		        contentBinding: {
		            target: DigiWebApp.EditPicturePageController,
		            property: 'positions'
		        },
		        events: {
		            change: {
		                target: DigiWebApp.EditPicturePageController,
		                action: function() {
		                    this.setActivities(YES);
		                }
		            }
		        }
		    })
		
		    , activity: M.SelectionListView.design({
		        selectionMode: M.SINGLE_SELECTION_DIALOG,
		        label: M.I18N.l('activity'),
		        initialText: M.I18N.l('noData'),
		        //cssClass: 'unselectable',
		        applyTheme: NO,
		        contentBinding: {
		            target: DigiWebApp.EditPicturePageController,
		            property: 'activities'
		        },
		        events: {
		            change: {
		                target: DigiWebApp.EditPicturePageController,
		                action: function() {
		                    //this.saveSelection();
		                }
		            }
		        }
		    })
		  	        
		  , remarkInput: M.TextFieldView.design({
		      label: M.I18N.l('remark'),
		      cssClass: 'remarkInput',
		      hasMultipleLines: YES,
		      numberOfChars: 255
		  })
	
	//      , imageContainer: M.ContainerView.design({
	//      	childViews: 'imageCanvas',
	//          cssClass: 'imageContainer marginTop20 marginBottom20',
	//
	//      	imageCanvas: M.CanvasView.design({
	//              cssClass: 'imageCanvas',
	//              canvasWidth: 300,
	//              canvasHeight: 450,
	//              render: function() {
	//					this.html += '<canvas id="' + this.id + '" width="' + this.canvasWidth + 'px" height="' + this.canvasHeight + 'px" class="' + this.cssClass + '"></canvas>';
	//	            	return this.html;
	//      		}
	//	        })
	//	        
	//      })
	
		  , savePictureGrid: M.GridView.design({
		
			  	  childViews: 'button icon'
			
			  	, layout: {
			      	cssClass: 'marginTop40 digiButton',
			      	columns: {
			          	0: 'button',
			          	1: 'icon'
			      	}
			  	}
			  
			  	, button: M.ButtonView.design({
			  		value: M.I18N.l('assume'),
			  		cssClass: 'digiButton',
			  		anchorLocation: M.RIGHT,
			  		events: {
			          	tap: {
			  				//target: DigiWebApp.CameraPage,
			  				//action: 'savePicture'
			  				action: function() {
			  					DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('saveMediaFile'));
			  					DigiWebApp.EditPicturePage.savePicture();
			  				}
			          	}
			      	}
			  	})
			  
			  	, icon: M.ImageView.design({
			  		value: 'theme/images/icon_bookTime.png'
			      	})
			      })
		      
		  })
	  
});


// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp 
// ==========================================================================


if (!window.console) {
	window.console = {
		log: function(a) {}
	};
} else {
	if (window.console.logLevel) {
		window.console.logLevel = 3;
	}
}


window.newAppVersionAvailable = NO;

M.Application.useTransitions = NO;

var DigiWebApp  = DigiWebApp || {};

function trackError(ex) {
	var exceptionAlert = "";
	//exceptionAlert = "Es trat leider eine unbehandelte Ausnahme auf:" + "\n\n";
	if (typeof(ex.message === "undefined")) {
		exceptionAlert = exceptionAlert + "'" + ex + "'";
	} else {
		exceptionAlert = exceptionAlert + "'" + ex.message + "'";
	}
	if (typeof(ex.stack) !== "undefined") {
		exceptionAlert = exceptionAlert + "\n" + ex.stack.split("\n")[1];
	} else if (typeof(ex.lineNumber) !== "undefined") {
		exceptionAlert = exceptionAlert + " at " + ex.lineNumber;
	} else if (typeof(ex.line) !== "undefined") {
		exceptionAlert = exceptionAlert + " at " + ex.line;
	}
	exceptionAlert = exceptionAlert + "\n\n" + "Bitte melden Sie dies bei DIGI-Zeiterfassung GmbH, damit dieser Fehler behoben werden kann." + "\n\n" + "Herzlichen Dank!";
	alert(exceptionAlert);
	console.log(ex);
	if (typeof(ex.stack) !== "undefined") {
		console.log(ex.stack);
	}
	return true;
}

window.onerror = function (msg, url, line) {
	trackError('Error: ' + msg + '\nURL: ' + url + '\nLine Number: ' + line);
	return true;
}

////override jQuery.fn.bind to wrap every provided function in try/catch
//var jQueryBind = jQuery.fn.bind;
//jQuery.fn.bind = function( type, data, fn ) {
//	if ( !fn && data && typeof data == 'function' ) {
//		fn = data;
//		data = null;
//	}
//	if ( fn ) {
//		var origFn = fn;
//		var wrappedFn = function() { 
//			try {
//				//console.log("jQuery.fn.bind: applying function for type '" + type + "'");
//				origFn.apply( this, arguments );
//			} catch ( ex ) {
//				trackError( ex );
//				// re-throw ex iff error should propogate
//				//throw ex;
//			}
//		};
//		fn = wrappedFn;
//	}
//	return jQueryBind.call( this, type, data, fn );
//};


// Check if a new cache is available on page load.
//console.log("checking for update and swapCache()");
/* 
window.addEventListener('load', function(e) {
	//console.log("window onload event");
	if (window.applicationCache) {
		window.applicationCache.addEventListener('updateready', function(e) {
			//console.log("window updateready event");
			if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
				console.log("Browser downloaded a new app cache");
				window.newAppVersionAvailable = YES;
				if (confirm(M.I18N.l('applicationUpdateAvailableMsg'))) { 
					// Swap it in and reload the page to get the new hotness.
					window.applicationCache.swapCache();
					window.location.reload();
				} else {
					DigiWebApp.NavigationController.toSplashViewPageTransition();
					DigiWebApp.NavigationController.toDashboardPage();
				}
			} else {
				// Manifest didn't changed. Nothing new to server.
			}
		}, false);
	} else {
		//console.log("!!!!!! no window.applicationCache !!!!!!")
	}
}, false);
*/

$(window).bind('load', function(e) {
	//console.log("window onload event");
	if (window.applicationCache) {
		/*window.applicationCache.addEventListener('updateready', function(e) {
			//console.log("window updateready event");
			if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
				console.log("Browser downloaded a new app cache");
				window.newAppVersionAvailable = YES;
				if (confirm(M.I18N.l('applicationUpdateAvailableMsg'))) { 
					// Swap it in and reload the page to get the new hotness.
					window.applicationCache.swapCache();
					window.location.reload();
				} else {
					DigiWebApp.NavigationController.toSplashViewPageTransition();
					DigiWebApp.NavigationController.toDashboardPage();
				}
			} else {
				// Manifest didn't changed. Nothing new to server.
			}
		}, false);*/
		$(window.applicationCache).bind('updateready', function(e) {
			//console.log("window updateready event");
			if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
				console.log("Browser downloaded a new app cache");
				window.newAppVersionAvailable = YES;
				if (confirm(M.I18N.l('applicationUpdateAvailableMsg'))) { 
					// Swap it in and reload the page to get the new hotness.
					window.applicationCache.swapCache();
					window.location.reload();
				} else {
					DigiWebApp.NavigationController.toSplashViewPageTransition();
					DigiWebApp.NavigationController.toDashboardPage();
				}
			} else {
				// Manifest didn't changed. Nothing new to server.
			}
		});
	} else {
		//console.log("!!!!!! no window.applicationCache !!!!!!")
	}
});

// reduce pre-rendering on BlackBerry to reduce time spent on native-splash
DigiWebAppBlackBerryDesign = {

    entryPage : 'splashView',

    splashView: DigiWebApp.SplashViewPage

};

DigiWebAppOrdinaryDesign = {

      entryPage : 'splashView'

    , splashView: DigiWebApp.SplashViewPage

    , dashboard: DigiWebApp.DashboardPage

    , bookingPage: DigiWebApp.BookingPage

    , settingsPage: DigiWebApp.SettingsPage

    , settingsPasswordPage: DigiWebApp.SettingsPasswordPage

    , timeDataPage: DigiWebApp.TimeDataPage

    , handOrderPage: DigiWebApp.HandOrderPage

    , employeePage: DigiWebApp.EmployeePage

    , infoPage: DigiWebApp.InfoPage

    , editPicturePage: DigiWebApp.EditPicturePage

    , demomediaPage: DigiWebApp.DemoMediaPage 

    , mediaListPage: DigiWebApp.MediaListPage

    , cameraPage: DigiWebApp.CameraPage

    , democameraPage: DigiWebApp.DemoCameraPage

    , audioPage: DigiWebApp.AudioPage

    , demoaudioPage: DigiWebApp.DemoAudioPage

    , remarkPage: DigiWebApp.RemarkPage
    
    , editTimeDataPage: DigiWebApp.EditTimeDataPage
    
    , noSettingsiOSPage: DigiWebApp.noSettingsiOSPage
    
    , orderInfoPage: DigiWebApp.OrderInfoPage
    
    , anwesenheitslistePage: DigiWebApp.AnwesenheitslistePage
    
    , zeitbuchungenPage: DigiWebApp.ZeitbuchungenPage
    
};

var restartOnBlackBerry = true; // didn't help anyway... :-(

if (navigator.platform === "BlackBerry" && restartOnBlackBerry) {
	if (navigator.appVersion.indexOf("Version/") !== -1) {
		// disable restartOnBlackBerry if version > 6
		var bb_version = Number(navigator.appVersion.substr(navigator.appVersion.indexOf("Version/") + 8,1));
		if (bb_version > 6) restartOnBlackBerry = false;
	}
}

if (navigator.platform === "BlackBerry" && restartOnBlackBerry) {
	// we will reset the design to DigiWebAppOrdinaryDesign later on in SplashViewPage.onPageshow
	DigiWebApp.app = M.Application.design(DigiWebAppBlackBerryDesign);
} else {
	DigiWebApp.app = M.Application.design(DigiWebAppOrdinaryDesign);	
};