/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "8446b128ccad3ff054ed"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) me.children.push(request);
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle")
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			{
/******/ 				// eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {any} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack:///./node_modules/process/browser.js?");

/***/ }),

/***/ "./src/client/index.js":
/*!*****************************!*\
  !*** ./src/client/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(process) {\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(/*! react-dom */ \"react-dom\");\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _history = __webpack_require__(/*! history */ \"history\");\n\nvar _App = __webpack_require__(/*! Containers/App */ \"./src/shared/containers/App/index.js\");\n\nvar _App2 = _interopRequireDefault(_App);\n\nvar _AppSwitcher = __webpack_require__(/*! Containers/AppSwitcher */ \"./src/shared/containers/AppSwitcher.js\");\n\nvar _AppSwitcher2 = _interopRequireDefault(_AppSwitcher);\n\nvar _store = __webpack_require__(/*! Stores/store */ \"./src/shared/stores/store.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n__webpack_require__(/*! dotenv */ \"dotenv\").load();\n\n\nvar history = (0, _history.createBrowserHistory)({\n\tbasename: process.env.BROWSER_HISTORY_BASENAME\n});\n\n(0, _reactDom.hydrate)(_react2.default.createElement(\n\t_reactRedux.Provider,\n\t{ store: _store.store },\n\t_react2.default.createElement(\n\t\t_reactRouterDom.Router,\n\t\t{ history: history },\n\t\t_react2.default.createElement(_AppSwitcher2.default, null)\n\t)\n), document.querySelector(\".root\"));\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./src/client/index.js?");

/***/ }),

/***/ "./src/shared/auth/checkAuth.js":
/*!**************************************!*\
  !*** ./src/shared/auth/checkAuth.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.default = checkAuth;\n\nvar _lunesLib = __webpack_require__(/*! lunes-lib */ \"lunes-lib\");\n\nfunction checkAuth(id, token) {\n\treturn true;\n\t// let accessToken = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZGYzNTZlZjI2Mjk0MGRhMDY0N2M0NSIsInBob25lVmVyaWZpZWQiOm51bGwsInBpbiI6bnVsbCwidHdvZmFFbmFibGVkIjpudWxsLCJpYXQiOjE1MjQ1OTM4OTAsImV4cCI6MTUyNDYwMTA5MH0.hqeyB3dHqJWpvhyP6UwXWLTcsnD_FJfRyd9UAAdOC9E\";\n\t// id    = \"5adf356ef262940da0647c45\";\n\t// let result = users.obtain({ id, accessToken });\n\t// console.log(result);\n\t// return result;\n}\n\n//# sourceURL=webpack:///./src/shared/auth/checkAuth.js?");

/***/ }),

/***/ "./src/shared/auth/index.js":
/*!**********************************!*\
  !*** ./src/shared/auth/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.checkAuth = undefined;\n\nvar _checkAuth = __webpack_require__(/*! ./checkAuth */ \"./src/shared/auth/checkAuth.js\");\n\nvar _checkAuth2 = _interopRequireDefault(_checkAuth);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.checkAuth = _checkAuth2.default;\n\n//# sourceURL=webpack:///./src/shared/auth/index.js?");

/***/ }),

/***/ "./src/shared/classes/Cookie.js":
/*!**************************************!*\
  !*** ./src/shared/classes/Cookie.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar CookieClass = function CookieClass() {\n\tvar _this = this;\n\n\t_classCallCheck(this, CookieClass);\n\n\tthis.getCookie = function (name) {\n\t\tif (_this.cookies) return _this.cookies;\n\n\t\tif (!window) return null;\n\n\t\tvar cookies = document.cookie;\n\t\tif (!cookies) return null;\n\n\t\tvar rawCookies = cookies.split('/');\n\t\tvar readyCookies = {};\n\t\trawCookies.map(function (nameValue) {\n\t\t\tvar arrCookie = nameValue.split('=');\n\t\t\treadyCookies[arrCookie[0]] = arrCookie[1];\n\t\t});\n\t\t_this.cookies = readyCookies;\n\t\treturn _this.cookies;\n\t};\n\n\tthis.setCookie = function (_ref) {\n\t\tvar name = _ref.name,\n\t\t    value = _ref.value,\n\t\t    expires = _ref.expires;\n\n\t\tif (!window) {\n\t\t\treturn null;\n\t\t}\n\t\tdocument.cookie = name + '=' + value + '; expires=' + expires;\n\t};\n};\n\nexports.default = CookieClass;\n\n//# sourceURL=webpack:///./src/shared/classes/Cookie.js?");

/***/ }),

/***/ "./src/shared/classes/User.js":
/*!************************************!*\
  !*** ./src/shared/classes/User.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _lunesLib = __webpack_require__(/*! lunes-lib */ \"lunes-lib\");\n\nvar _Cookie = __webpack_require__(/*! Classes/Cookie */ \"./src/shared/classes/Cookie.js\");\n\nvar _Cookie2 = _interopRequireDefault(_Cookie);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar UserClass = function UserClass() {\n\tvar _this = this;\n\n\t_classCallCheck(this, UserClass);\n\n\tthis.login = function () {\n\t\tvar _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {\n\t\t\tvar email = _ref2.email,\n\t\t\t    password = _ref2.password;\n\t\t\tvar user, cookie;\n\t\t\treturn regeneratorRuntime.wrap(function _callee$(_context) {\n\t\t\t\twhile (1) {\n\t\t\t\t\tswitch (_context.prev = _context.next) {\n\t\t\t\t\t\tcase 0:\n\t\t\t\t\t\t\t_context.next = 2;\n\t\t\t\t\t\t\treturn _lunesLib.users.login({\n\t\t\t\t\t\t\t\temail: 'marcelosmtp@gmail.com',\n\t\t\t\t\t\t\t\tpassword: '123123123'\n\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\tcase 2:\n\t\t\t\t\t\t\tuser = _context.sent;\n\n\t\t\t\t\t\t\tif (window && document) {\n\t\t\t\t\t\t\t\tcookie = new _Cookie2.default();\n\n\t\t\t\t\t\t\t\tcookie.setCookie({\n\t\t\t\t\t\t\t\t\tname: 'user',\n\t\t\t\t\t\t\t\t\tvalue: JSON.stringify(user),\n\t\t\t\t\t\t\t\t\texpires: new Date().setHours(new Date().getHours + 1)\n\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\treturn _context.abrupt('return', user);\n\n\t\t\t\t\t\tcase 5:\n\t\t\t\t\t\tcase 'end':\n\t\t\t\t\t\t\treturn _context.stop();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}, _callee, _this);\n\t\t}));\n\n\t\treturn function (_x) {\n\t\t\treturn _ref.apply(this, arguments);\n\t\t};\n\t}();\n};\n\nexports.default = UserClass;\n\n//# sourceURL=webpack:///./src/shared/classes/User.js?");

/***/ }),

/***/ "./src/shared/classes/Wallet.js":
/*!**************************************!*\
  !*** ./src/shared/classes/Wallet.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.WalletClass = undefined;\n\nvar _functions = __webpack_require__(/*! Utils/functions */ \"./src/shared/utils/functions.js\");\n\nvar _lunesLib = __webpack_require__(/*! lunes-lib */ \"lunes-lib\");\n\nvar _satoshiBitcoin = __webpack_require__(/*! satoshi-bitcoin */ \"satoshi-bitcoin\");\n\nvar _satoshiBitcoin2 = _interopRequireDefault(_satoshiBitcoin);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar WalletClass = exports.WalletClass = function WalletClass() {\n\tvar _this = this;\n\n\t_classCallCheck(this, WalletClass);\n\n\tthis.getCoinsPrice = function () {\n\t\tvar _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {\n\t\t\tvar coinsPrice, coinKey;\n\t\t\treturn regeneratorRuntime.wrap(function _callee$(_context) {\n\t\t\t\twhile (1) {\n\t\t\t\t\tswitch (_context.prev = _context.next) {\n\t\t\t\t\t\tcase 0:\n\t\t\t\t\t\t\t_context.prev = 0;\n\t\t\t\t\t\t\tcoinsPrice = {};\n\t\t\t\t\t\t\t_context.t0 = regeneratorRuntime.keys(data);\n\n\t\t\t\t\t\tcase 3:\n\t\t\t\t\t\t\tif ((_context.t1 = _context.t0()).done) {\n\t\t\t\t\t\t\t\t_context.next = 10;\n\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\tcoinKey = _context.t1.value;\n\t\t\t\t\t\t\t_context.next = 7;\n\t\t\t\t\t\t\treturn _lunesLib.coins.getPrice(data[coinKey]);\n\n\t\t\t\t\t\tcase 7:\n\t\t\t\t\t\t\tcoinsPrice[data[coinKey].fromSymbol.toLowerCase()] = _context.sent;\n\t\t\t\t\t\t\t_context.next = 3;\n\t\t\t\t\t\t\tbreak;\n\n\t\t\t\t\t\tcase 10:\n\t\t\t\t\t\t\treturn _context.abrupt('return', coinsPrice);\n\n\t\t\t\t\t\tcase 13:\n\t\t\t\t\t\t\t_context.prev = 13;\n\t\t\t\t\t\t\t_context.t2 = _context['catch'](0);\n\t\t\t\t\t\t\treturn _context.abrupt('return', (0, _functions.errorPattern)('Error on trying to get price', 500, 'COINGETPRICE_ERROR', _context.t2));\n\n\t\t\t\t\t\tcase 16:\n\t\t\t\t\t\tcase 'end':\n\t\t\t\t\t\t\treturn _context.stop();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}, _callee, _this, [[0, 13]]);\n\t\t}));\n\n\t\treturn function (_x) {\n\t\t\treturn _ref.apply(this, arguments);\n\t\t};\n\t}();\n\n\tthis.getUserAddresses = function (user) {\n\t\ttry {\n\t\t\tvar addresses = {};\n\t\t\t//(example): @param coin = {symbol: 'btc', createdAt: [timestamp], etc..} \n\t\t\tuser.wallet.coins.map(function (coin) {\n\t\t\t\t//if addresses does not have {addresses['btc'] (example)} as attribute, so:\n\t\t\t\tif (!addresses[coin.symbol]) {\n\t\t\t\t\taddresses[coin.symbol] = [];\n\t\t\t\t}\n\t\t\t\t//we get the ${addresses[coin.symbol]} array, and we push an address to it\n\t\t\t\tcoin.addresses.map(function (obj) {\n\t\t\t\t\taddresses[coin.symbol].push(obj.address);\n\t\t\t\t});\n\t\t\t});\n\t\t\treturn addresses;\n\t\t} catch (err) {\n\t\t\treturn (0, _functions.errorPattern)('Was not possible get user addresses', 500, 'WALLET_GETUSERADDRESS_ERROR', err);\n\t\t}\n\t};\n\n\tthis.getBalance = function () {\n\t\tvar _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(user) {\n\t\t\tvar coinsPrice, addresses, balance, token, coin, i, addressKey, address, response;\n\t\t\treturn regeneratorRuntime.wrap(function _callee2$(_context2) {\n\t\t\t\twhile (1) {\n\t\t\t\t\tswitch (_context2.prev = _context2.next) {\n\t\t\t\t\t\tcase 0:\n\t\t\t\t\t\t\tif (typeof user === 'string') {\n\t\t\t\t\t\t\t\tuser = JSON.parse(user);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t_context2.prev = 1;\n\t\t\t\t\t\t\t_context2.next = 4;\n\t\t\t\t\t\t\treturn _this.getCoinsPrice([{ fromSymbol: 'BTC', toSymbol: 'BRL,USD' }, { fromSymbol: 'LTC', toSymbol: 'BRL,USD' }, { fromSymbol: 'ETH', toSymbol: 'BRL,USD' }]);\n\n\t\t\t\t\t\tcase 4:\n\t\t\t\t\t\t\tcoinsPrice = _context2.sent;\n\n\t\t\t\t\t\t\t_this.coinsPrice = coinsPrice;\n\t\t\t\t\t\t\taddresses = _this.getUserAddresses(user);\n\t\t\t\t\t\t\tbalance = {};\n\t\t\t\t\t\t\ttoken = user.accessToken;\n\t\t\t\t\t\t\t//coin = 'btc' (example)\n\n\t\t\t\t\t\t\t_context2.t0 = regeneratorRuntime.keys(addresses);\n\n\t\t\t\t\t\tcase 10:\n\t\t\t\t\t\t\tif ((_context2.t1 = _context2.t0()).done) {\n\t\t\t\t\t\t\t\t_context2.next = 25;\n\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\tcoin = _context2.t1.value;\n\n\t\t\t\t\t\t\t//addressKey = 1 (example)\n\t\t\t\t\t\t\ti = 0;\n\t\t\t\t\t\t\t_context2.t2 = regeneratorRuntime.keys(addresses[coin]);\n\n\t\t\t\t\t\tcase 14:\n\t\t\t\t\t\t\tif ((_context2.t3 = _context2.t2()).done) {\n\t\t\t\t\t\t\t\t_context2.next = 23;\n\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\taddressKey = _context2.t3.value;\n\n\t\t\t\t\t\t\t//it gets the current addres of the iteration\n\t\t\t\t\t\t\taddress = addresses[coin][addressKey];\n\t\t\t\t\t\t\t//it returns a response object\n\n\t\t\t\t\t\t\t_context2.next = 19;\n\t\t\t\t\t\t\treturn _lunesLib.coins.bitcoin.getBalance({ address: address }, token);\n\n\t\t\t\t\t\tcase 19:\n\t\t\t\t\t\t\tresponse = _context2.sent;\n\n\t\t\t\t\t\t\tif (response.status === 'success') {\n\t\t\t\t\t\t\t\tif (!balance[coin]) {\n\t\t\t\t\t\t\t\t\tbalance[coin] = {};\n\t\t\t\t\t\t\t\t\tbalance[coin]['total_confirmed'] = _satoshiBitcoin2.default.toSatoshi(0);\n\t\t\t\t\t\t\t\t\tbalance[coin]['total_unconfirmed'] = _satoshiBitcoin2.default.toSatoshi(0);\n\t\t\t\t\t\t\t\t\tbalance[coin]['total_amount'] = 0;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t//it sums the old total_confirmed with the new\n\t\t\t\t\t\t\t\tbalance[coin]['total_confirmed'] += _satoshiBitcoin2.default.toSatoshi(response.data.confirmed_balance);\n\t\t\t\t\t\t\t\tbalance[coin]['total_unconfirmed'] += _satoshiBitcoin2.default.toSatoshi(response.data.unconfirmed_balance);\n\t\t\t\t\t\t\t\t//it converts total_confirmed to bitcoin\n\t\t\t\t\t\t\t\tbalance[coin]['total_unconfirmed'] = _satoshiBitcoin2.default.toBitcoin(balance[coin]['total_unconfirmed']);\n\t\t\t\t\t\t\t\tbalance[coin]['total_confirmed'] = _satoshiBitcoin2.default.toBitcoin(balance[coin]['total_confirmed']);\n\t\t\t\t\t\t\t\tbalance[coin]['total_amount'] = balance[coin]['total_confirmed'] * coinsPrice[coin]['USD'];\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t_context2.next = 14;\n\t\t\t\t\t\t\tbreak;\n\n\t\t\t\t\t\tcase 23:\n\t\t\t\t\t\t\t_context2.next = 10;\n\t\t\t\t\t\t\tbreak;\n\n\t\t\t\t\t\tcase 25:\n\t\t\t\t\t\t\treturn _context2.abrupt('return', balance);\n\n\t\t\t\t\t\tcase 28:\n\t\t\t\t\t\t\t_context2.prev = 28;\n\t\t\t\t\t\t\t_context2.t4 = _context2['catch'](1);\n\t\t\t\t\t\t\tthrow (0, _functions.errorPattern)('Error on get balance', 500, 'WALLET_GETBALANCE_ERROR', _context2.t4);\n\n\t\t\t\t\t\tcase 31:\n\t\t\t\t\t\tcase 'end':\n\t\t\t\t\t\t\treturn _context2.stop();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}, _callee2, _this, [[1, 28]]);\n\t\t}));\n\n\t\treturn function (_x2) {\n\t\t\treturn _ref2.apply(this, arguments);\n\t\t};\n\t}();\n\n\tthis.getHistory = function () {\n\t\tvar _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref4) {\n\t\t\tvar _ref4$address = _ref4.address,\n\t\t\t    address = _ref4$address === undefined ? '1Q7Jmho4FixWBiTVcZ5aKXv4rTMMp6CjiD' : _ref4$address,\n\t\t\t    _ref4$accessToken = _ref4.accessToken,\n\t\t\t    accessToken = _ref4$accessToken === undefined ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZGYzNTZlZjI2Mjk0MGRhMDY0N2M0NSIsInBob25lVmVyaWZpZWQiOm51bGwsInBpbiI6bnVsbCwidHdvZmFFbmFibGVkIjpudWxsLCJpYXQiOjE1MjQ3NTAwNTEsImV4cCI6MTUyNDc1NzI1MX0.ONXUF-aaaO17xCf1L3EXwzZ1oWZ_2EMdQw-0uPvJyHo' : _ref4$accessToken;\n\t\t\treturn regeneratorRuntime.wrap(function _callee3$(_context3) {\n\t\t\t\twhile (1) {\n\t\t\t\t\tswitch (_context3.prev = _context3.next) {\n\t\t\t\t\t\tcase 0:\n\t\t\t\t\t\t\t_context3.prev = 0;\n\t\t\t\t\t\t\treturn _context3.abrupt('return', _lunesLib.coins.bitcoin.getHistory({ address: address }, accessToken));\n\n\t\t\t\t\t\tcase 4:\n\t\t\t\t\t\t\t_context3.prev = 4;\n\t\t\t\t\t\t\t_context3.t0 = _context3['catch'](0);\n\t\t\t\t\t\t\treturn _context3.abrupt('return', (0, _functions.errorPattern)('Error on get history', 500, 'WALLET_GETHISTORY_ERROR', _context3.t0));\n\n\t\t\t\t\t\tcase 7:\n\t\t\t\t\t\tcase 'end':\n\t\t\t\t\t\t\treturn _context3.stop();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}, _callee3, _this, [[0, 4]]);\n\t\t}));\n\n\t\treturn function (_x3) {\n\t\t\treturn _ref3.apply(this, arguments);\n\t\t};\n\t}();\n}\n/*\n\t@param user: typically it comes from cookies\n\treturns: {btc: ['address','address', ...]}\n*/\n\n/*\n\t@param user: typically comes from cookies\n\treturn ex:\n\t\t{ \n\t\t\tbtc: { \n\t\t\t\ttotal_confirmed: 0, \n\t\t\t\ttotal_unconfirmed: 0, \n\t\t\t\ttotal_amount: 0 \n\t\t\t} \n\t\t}\n*/\n;\n\n;\n\n//# sourceURL=webpack:///./src/shared/classes/Wallet.js?");

/***/ }),

/***/ "./src/shared/components/AuthRoute.js":
/*!********************************************!*\
  !*** ./src/shared/components/AuthRoute.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.AuthRoute = undefined;\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _index = __webpack_require__(/*! Auth/index */ \"./src/shared/auth/index.js\");\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }\n\nvar AuthRoute = function AuthRoute(_ref) {\n\tvar Component = _ref.component,\n\t    rest = _objectWithoutProperties(_ref, ['component']);\n\n\treturn _react2.default.createElement(_reactRouterDom.Route, _extends({}, rest, { render: function render(props) {\n\t\t\tif ((0, _index.checkAuth)()) {\n\t\t\t\treturn _react2.default.createElement(Component, props);\n\t\t\t} else {\n\t\t\t\tif (typeof window !== 'undefined') {\n\t\t\t\t\twindow.location.href = '/login';\n\t\t\t\t}\n\t\t\t\treturn _react2.default.createElement(_reactRouterDom.Redirect, { to: '/login' });\n\t\t\t}\n\t\t} }));\n};\nexports.AuthRoute = AuthRoute;\n\n//# sourceURL=webpack:///./src/shared/components/AuthRoute.js?");

/***/ }),

/***/ "./src/shared/components/BlockBase.js":
/*!********************************************!*\
  !*** ./src/shared/components/BlockBase.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.BlockBase = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\tdisplay: block;\\n\\tmargin: 0 auto;\\n\\twidth: 100%;\\t\\n'], ['\\n\\tdisplay: block;\\n\\tmargin: 0 auto;\\n\\twidth: 100%;\\t\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar BlockBase = exports.BlockBase = (0, _styledComponents.css)(_templateObject);\n\n//# sourceURL=webpack:///./src/shared/components/BlockBase.js?");

/***/ }),

/***/ "./src/shared/components/ButtonBase.js":
/*!*********************************************!*\
  !*** ./src/shared/components/ButtonBase.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.ButtonBase = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\t', '\\n\\tbackground: ', ';\\t\\n\\tcolor: white;\\n\\tpadding: 10px 20px 10px 20px;\\n\\tfont-size: 16px;\\n\\ttext-align: center;\\n\\tborder-radius: 4px;\\n\\tborder: none;\\n\\tcursor: pointer;\\n\\t&:focus {\\n\\t\\toutline: none;\\n\\t}\\n'], ['\\n\\t', '\\n\\tbackground: ', ';\\t\\n\\tcolor: white;\\n\\tpadding: 10px 20px 10px 20px;\\n\\tfont-size: 16px;\\n\\ttext-align: center;\\n\\tborder-radius: 4px;\\n\\tborder: none;\\n\\tcursor: pointer;\\n\\t&:focus {\\n\\t\\toutline: none;\\n\\t}\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _BlockBase = __webpack_require__(/*! ./BlockBase */ \"./src/shared/components/BlockBase.js\");\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar ButtonBase = exports.ButtonBase = (0, _styledComponents.css)(_templateObject, _BlockBase.BlockBase, _styleVariables2.default.normalGreen);\n\n//# sourceURL=webpack:///./src/shared/components/ButtonBase.js?");

/***/ }),

/***/ "./src/shared/components/Buttons.js":
/*!******************************************!*\
  !*** ./src/shared/components/Buttons.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.ButtonSecondary = exports.Button = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\t', '\\n'], ['\\n\\t', '\\n']),\n    _templateObject2 = _taggedTemplateLiteral(['\\n\\tbackground: transparent;\\n\\tborder: 2px solid ', ';\\n\\n\\ttransition: background 0.2s;\\n\\t&:hover {\\n\\t\\tbackground: ', ';\\n\\t}\\n'], ['\\n\\tbackground: transparent;\\n\\tborder: 2px solid ', ';\\n\\n\\ttransition: background 0.2s;\\n\\t&:hover {\\n\\t\\tbackground: ', ';\\n\\t}\\n']);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _ButtonBase = __webpack_require__(/*! ./ButtonBase */ \"./src/shared/components/ButtonBase.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar Button = exports.Button = _styledComponents2.default.button(_templateObject, _ButtonBase.ButtonBase);\nvar ButtonSecondary = exports.ButtonSecondary = Button.extend(_templateObject2, _styleVariables2.default.normalGreen, _styleVariables2.default.normalGreen);\n\n//# sourceURL=webpack:///./src/shared/components/Buttons.js?");

/***/ }),

/***/ "./src/shared/components/Form.js":
/*!***************************************!*\
  !*** ./src/shared/components/Form.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.Form = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\t', '\\n\\t', '\\n'], ['\\n\\t', '\\n\\t', '\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar Form = exports.Form = _styledComponents2.default.form(_templateObject, function (props) {\n\treturn props.margin ? 'margin: ' + props.margin : '';\n}, function (props) {\n\treturn props.width ? 'width: ' + props.width : '';\n});\n\n//# sourceURL=webpack:///./src/shared/components/Form.js?");

/***/ }),

/***/ "./src/shared/components/FormBuilder.js":
/*!**********************************************!*\
  !*** ./src/shared/components/FormBuilder.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.FormBuilder = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\ttext-align: center;\\n\\tdisplay: block;\\n\\tmargin: 10px auto 0 auto;\\n'], ['\\n\\ttext-align: center;\\n\\tdisplay: block;\\n\\tmargin: 10px auto 0 auto;\\n']);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _functions = __webpack_require__(/*! Utils/functions */ \"./src/shared/utils/functions.js\");\n\nvar _FormGroup = __webpack_require__(/*! ./FormGroup */ \"./src/shared/components/FormGroup.js\");\n\nvar _Form = __webpack_require__(/*! ./Form */ \"./src/shared/components/Form.js\");\n\nvar _Input = __webpack_require__(/*! ./Input */ \"./src/shared/components/Input.js\");\n\nvar _Buttons = __webpack_require__(/*! ./Buttons */ \"./src/shared/components/Buttons.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\n// import { Checkbox } from 'react-materialize';\n\nvar FormGroupCheck = _FormGroup.FormGroup.extend(_templateObject);\n\nvar FormBuilder = exports.FormBuilder = function (_React$Component) {\n\t_inherits(FormBuilder, _React$Component);\n\n\tfunction FormBuilder() {\n\t\t_classCallCheck(this, FormBuilder);\n\n\t\treturn _possibleConstructorReturn(this, (FormBuilder.__proto__ || Object.getPrototypeOf(FormBuilder)).apply(this, arguments));\n\t}\n\n\t_createClass(FormBuilder, [{\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\tvar inputs = this.props.inputs;\n\n\t\t\tif (!Array.isArray(inputs)) {\n\t\t\t\tconsole.log((0, _functions.errorPattern)('FormBuilder: input prop is not an array.', 500, 'FORM_BUILDER_ERROR'));\n\t\t\t\treturn null;\n\t\t\t}\n\t\t\treturn inputs.map(function (input, index) {\n\t\t\t\tif (input.type == 'checkbox') {\n\t\t\t\t\treturn _react2.default.createElement(\n\t\t\t\t\t\tFormGroupCheck,\n\t\t\t\t\t\t{ key: index },\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t'label',\n\t\t\t\t\t\t\t{ style: { color: 'white', fontSize: '1.4em' } },\n\t\t\t\t\t\t\t_react2.default.createElement('input', input),\n\t\t\t\t\t\t\tinput.value\n\t\t\t\t\t\t)\n\t\t\t\t\t);\n\t\t\t\t}\n\t\t\t\treturn _react2.default.createElement(\n\t\t\t\t\t_FormGroup.FormGroup,\n\t\t\t\t\t{ key: index },\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t_Input.Input,\n\t\t\t\t\t\tinput,\n\t\t\t\t\t\tinput.value\n\t\t\t\t\t)\n\t\t\t\t);\n\t\t\t});\n\t\t}\n\t}]);\n\n\treturn FormBuilder;\n}(_react2.default.Component);\n\n//# sourceURL=webpack:///./src/shared/components/FormBuilder.js?");

/***/ }),

/***/ "./src/shared/components/FormGroup.js":
/*!********************************************!*\
  !*** ./src/shared/components/FormGroup.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.FormGroup = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\twidth: 100%;\\n\\tpadding: 0 0 30px 0;\\n'], ['\\n\\twidth: 100%;\\n\\tpadding: 0 0 30px 0;\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar FormGroup = exports.FormGroup = _styledComponents2.default.div(_templateObject);\n\n//# sourceURL=webpack:///./src/shared/components/FormGroup.js?");

/***/ }),

/***/ "./src/shared/components/H1.js":
/*!*************************************!*\
  !*** ./src/shared/components/H1.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.H1 = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\t', '\\n'], ['\\n\\t', '\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _TextBase = __webpack_require__(/*! ./TextBase */ \"./src/shared/components/TextBase.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar H1 = exports.H1 = _styledComponents2.default.h1(_templateObject, _TextBase.TextBase);\n\n//# sourceURL=webpack:///./src/shared/components/H1.js?");

/***/ }),

/***/ "./src/shared/components/H2.js":
/*!*************************************!*\
  !*** ./src/shared/components/H2.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.H2 = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\t', '\\n'], ['\\n\\t', '\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _TextBase = __webpack_require__(/*! ./TextBase */ \"./src/shared/components/TextBase.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar H2 = exports.H2 = _styledComponents2.default.h2(_templateObject, _TextBase.TextBase);\n\n//# sourceURL=webpack:///./src/shared/components/H2.js?");

/***/ }),

/***/ "./src/shared/components/H3.js":
/*!*************************************!*\
  !*** ./src/shared/components/H3.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.H3 = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\t', '\\n'], ['\\n\\t', '\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _TextBase = __webpack_require__(/*! ./TextBase */ \"./src/shared/components/TextBase.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar H3 = exports.H3 = _styledComponents2.default.h3(_templateObject, _TextBase.TextBase);\n\n//# sourceURL=webpack:///./src/shared/components/H3.js?");

/***/ }),

/***/ "./src/shared/components/Input.js":
/*!****************************************!*\
  !*** ./src/shared/components/Input.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.Input = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\tpadding: 15px;\\n\\twidth: 100%;\\n\\theight: 45px;\\n\\tbackground: ', ';\\n\\tborder: none;\\n\\tborder-radius: 4px;\\n\\tcolor: white;\\n\\tfont-size: 18px;\\n\\t&:focus {\\n\\t\\toutline: none;\\n\\t}\\n\\t&::-webkit-input-placeholder {\\n\\t\\tcolor: #ccc;\\n\\t}\\n\\t&::-moz-placeholder {\\n\\t\\tcolor: #ccc;\\n\\t}\\n\\t&:-ms-placeholder {\\n\\t\\tcolor: #ccc;\\n\\t}\\n'], ['\\n\\tpadding: 15px;\\n\\twidth: 100%;\\n\\theight: 45px;\\n\\tbackground: ', ';\\n\\tborder: none;\\n\\tborder-radius: 4px;\\n\\tcolor: white;\\n\\tfont-size: 18px;\\n\\t&:focus {\\n\\t\\toutline: none;\\n\\t}\\n\\t&::-webkit-input-placeholder {\\n\\t\\tcolor: #ccc;\\n\\t}\\n\\t&::-moz-placeholder {\\n\\t\\tcolor: #ccc;\\n\\t}\\n\\t&:-ms-placeholder {\\n\\t\\tcolor: #ccc;\\n\\t}\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar Input = exports.Input = _styledComponents2.default.input(_templateObject, _styleVariables2.default.normalLilac);\n\n//# sourceURL=webpack:///./src/shared/components/Input.js?");

/***/ }),

/***/ "./src/shared/components/Link.js":
/*!***************************************!*\
  !*** ./src/shared/components/Link.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.Link = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\t', '\\n'], ['\\n\\t', '\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _LinkBase = __webpack_require__(/*! ./LinkBase */ \"./src/shared/components/LinkBase.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\n// import { BlockBase } from './BlockBase';\n\nvar Link = exports.Link = (0, _styledComponents2.default)(_reactRouterDom.Link)(_templateObject, _LinkBase.LinkBase);\n\n//# sourceURL=webpack:///./src/shared/components/Link.js?");

/***/ }),

/***/ "./src/shared/components/LinkBase.js":
/*!*******************************************!*\
  !*** ./src/shared/components/LinkBase.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.LinkBase = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\t', '\\n\\t', '\\n\\ttext-decoration: none;\\n\\tcolor: white;\\n'], ['\\n\\t', '\\n\\t', '\\n\\ttext-decoration: none;\\n\\tcolor: white;\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _TextBase = __webpack_require__(/*! ./TextBase */ \"./src/shared/components/TextBase.js\");\n\nvar _BlockBase = __webpack_require__(/*! ./BlockBase */ \"./src/shared/components/BlockBase.js\");\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar LinkBase = exports.LinkBase = (0, _styledComponents.css)(_templateObject, _TextBase.TextBase, _BlockBase.BlockBase);\n\n//# sourceURL=webpack:///./src/shared/components/LinkBase.js?");

/***/ }),

/***/ "./src/shared/components/Loading.js":
/*!******************************************!*\
  !*** ./src/shared/components/Loading.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.Loading = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\tfrom { transform: rotate(0deg);\\t}\\n\\tto { transform: rotate(360deg);\\t}\\n'], ['\\n\\tfrom { transform: rotate(0deg);\\t}\\n\\tto { transform: rotate(360deg);\\t}\\n']),\n    _templateObject2 = _taggedTemplateLiteral(['\\n\\tborder: 10px solid ', ';\\n\\tborder-left-color: transparent;\\n\\tborder-radius: 100%;\\n\\tanimation: ', ' 1s linear infinite;\\n\\twidth: 75px;\\n\\theight: 75px;\\n\\tmargin: 0 auto;\\n'], ['\\n\\tborder: 10px solid ', ';\\n\\tborder-left-color: transparent;\\n\\tborder-radius: 100%;\\n\\tanimation: ', ' 1s linear infinite;\\n\\twidth: 75px;\\n\\theight: 75px;\\n\\tmargin: 0 auto;\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar rotationLoading = (0, _styledComponents.keyframes)(_templateObject);\nvar Loading = exports.Loading = _styledComponents2.default.div(_templateObject2, _styleVariables2.default.normalGreen, rotationLoading);\n\n//# sourceURL=webpack:///./src/shared/components/Loading.js?");

/***/ }),

/***/ "./src/shared/components/Logo.js":
/*!***************************************!*\
  !*** ./src/shared/components/Logo.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.Logo = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\twidth: 150px;\\n\\tdisplay: block;\\n'], ['\\n\\twidth: 150px;\\n\\tdisplay: block;\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar Logo = exports.Logo = _styledComponents2.default.img.attrs({\n\tsrc: 'img/logo.svg'\n})(_templateObject);\n\n//# sourceURL=webpack:///./src/shared/components/Logo.js?");

/***/ }),

/***/ "./src/shared/components/Text.js":
/*!***************************************!*\
  !*** ./src/shared/components/Text.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.Text = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\t', '\\n'], ['\\n\\t', '\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _TextBase = __webpack_require__(/*! ./TextBase */ \"./src/shared/components/TextBase.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar Text = exports.Text = _styledComponents2.default.div(_templateObject, _TextBase.TextBase);\n\n//# sourceURL=webpack:///./src/shared/components/Text.js?");

/***/ }),

/***/ "./src/shared/components/TextBase.js":
/*!*******************************************!*\
  !*** ./src/shared/components/TextBase.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.TextBase = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\tfont-size: 1.8rem;\\n\\tdisplay: block;\\n\\t', '\\n\\t', '\\n\\t', '\\n\\t', '\\n\\t', '\\n\\t', '\\n'], ['\\n\\tfont-size: 1.8rem;\\n\\tdisplay: block;\\n\\t', '\\n\\t', '\\n\\t', '\\n\\t', '\\n\\t', '\\n\\t', '\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar TextBase = exports.TextBase = (0, _styledComponents.css)(_templateObject, function (props) {\n\tif (props.clNormalGreen) {\n\t\treturn 'color: ' + _styleVariables2.default.normalGreen;\n\t} else if (props.clWhite) {\n\t\treturn 'color: white';\n\t} else if (props.clNormalLilac) {\n\t\treturn 'color: ' + _styleVariables2.default.normalLilac;\n\t}\n}, function (props) {\n\tif (props.txCenter) {\n\t\treturn 'text-align: center';\n\t} else if (props.txRight) {\n\t\treturn 'text-align: right';\n\t}\n}, function (props) {\n\tif (props.margin) {\n\t\treturn 'margin: ' + props.margin + ';';\n\t}\n}, function (props) {\n\tif (props.size && props.size.indexOf('rem') !== -1) {\n\t\treturn 'font-size: ' + props.size;\n\t}\n}, function (props) {\n\tif (props.txBold) {\n\t\treturn 'font-weight: bold;';\n\t} else if (props.txLight) {\n\t\treturn 'font-weight: 100;';\n\t} else if (props.txNormal) {\n\t\treturn 'font-weight: 300;';\n\t}\n}, function (props) {\n\tif (props.txInline) {\n\t\treturn 'display: inline;';\n\t} else if (props.txInlineBlock) {\n\t\treturn 'display: inline-block;';\n\t}\n});\n\n//# sourceURL=webpack:///./src/shared/components/TextBase.js?");

/***/ }),

/***/ "./src/shared/containers/App/Header.js":
/*!*********************************************!*\
  !*** ./src/shared/containers/App/Header.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\tbackground: ', ';\\n\\twidth: 100%;\\n\\theight: 85px;\\n\\tbox-shadow: 0px 30px 30px black;\\n\\tdisplay: flex;\\n\\tjustify-content: flex-start;\\n\\talign-items: center;\\n'], ['\\n\\tbackground: ', ';\\n\\twidth: 100%;\\n\\theight: 85px;\\n\\tbox-shadow: 0px 30px 30px black;\\n\\tdisplay: flex;\\n\\tjustify-content: flex-start;\\n\\talign-items: center;\\n']);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar Header = _styledComponents2.default.header(_templateObject, _styleVariables2.default.darkLilac);\nexports.default = Header;\n\n//# sourceURL=webpack:///./src/shared/containers/App/Header.js?");

/***/ }),

/***/ "./src/shared/containers/App/PanelLeft.js":
/*!************************************************!*\
  !*** ./src/shared/containers/App/PanelLeft.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\t', '\\n'], ['\\n\\t', '\\n']),\n    _templateObject2 = _taggedTemplateLiteral(['\\n\\twidth: 160px;\\n\\tmin-width: 160px;\\n\\theight: 100%;\\n\\tdisplay: block;\\n\\tbackground: ', ';\\n\\tz-index: 3;\\n'], ['\\n\\twidth: 160px;\\n\\tmin-width: 160px;\\n\\theight: 100%;\\n\\tdisplay: block;\\n\\tbackground: ', ';\\n\\tz-index: 3;\\n']);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _TextBase = __webpack_require__(/*! Components/TextBase */ \"./src/shared/components/TextBase.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar CustomLink = _styledComponents2.default.a(_templateObject, _TextBase.TextBase);\n\nvar PanelLeft = function PanelLeft(_ref) {\n\tvar className = _ref.className,\n\t    children = _ref.children;\n\n\treturn _react2.default.createElement(\n\t\t'div',\n\t\t{ className: className },\n\t\t_react2.default.createElement(\n\t\t\tCustomLink,\n\t\t\t{ to: \"/app/home\" },\n\t\t\t'Home'\n\t\t),\n\t\t_react2.default.createElement(\n\t\t\tCustomLink,\n\t\t\t{ to: \"/app/wallet\" },\n\t\t\t'Wallet'\n\t\t)\n\t);\n};\nexports.default = (0, _styledComponents2.default)(PanelLeft)(_templateObject2, _styleVariables2.default.normalLilac2);\n// export default PanelLeft;\n\n//# sourceURL=webpack:///./src/shared/containers/App/PanelLeft.js?");

/***/ }),

/***/ "./src/shared/containers/App/PanelRight.js":
/*!*************************************************!*\
  !*** ./src/shared/containers/App/PanelRight.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\tbackground: ', ';\\n\\twidth: 100%;\\n\\theight: 100%;\\n'], ['\\n\\tbackground: ', ';\\n\\twidth: 100%;\\n\\theight: 100%;\\n']);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar PanelRight = _styledComponents2.default.div(_templateObject, _styleVariables2.default.normalLilac);\n\nexports.default = PanelRight;\n\n//# sourceURL=webpack:///./src/shared/containers/App/PanelRight.js?");

/***/ }),

/***/ "./src/shared/containers/App/index.js":
/*!********************************************!*\
  !*** ./src/shared/containers/App/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\twidth: 100%;\\n\\theight: 100%;\\n\\tdisplay: flex;\\n\\tflex-flow: wrap;\\n\\n\\t@media (min-width: 768px) {\\n\\t\\tflex-flow: nowrap;\\n\\t}\\n'], ['\\n\\twidth: 100%;\\n\\theight: 100%;\\n\\tdisplay: flex;\\n\\tflex-flow: wrap;\\n\\n\\t@media (min-width: 768px) {\\n\\t\\tflex-flow: nowrap;\\n\\t}\\n']),\n    _templateObject2 = _taggedTemplateLiteral(['\\n\\twidth: 100%;\\n\\theight: 100vh;\\n\\tmax-height: 100vh;\\n\\tmax-width: 100vw;\\n\\toverflow-x: hidden;\\n\\toverflow-y: auto;\\n\\tposition: relative;\\n\\n\\t& > * {\\n\\t\\toverflow-y: auto;\\n\\t}\\n'], ['\\n\\twidth: 100%;\\n\\theight: 100vh;\\n\\tmax-height: 100vh;\\n\\tmax-width: 100vw;\\n\\toverflow-x: hidden;\\n\\toverflow-y: auto;\\n\\tposition: relative;\\n\\n\\t& > * {\\n\\t\\toverflow-y: auto;\\n\\t}\\n']),\n    _templateObject3 = _taggedTemplateLiteral(['\\n\\tpadding: 0 50px 0 50px;\\n'], ['\\n\\tpadding: 0 50px 0 50px;\\n']),\n    _templateObject4 = _taggedTemplateLiteral(['\\n\\twidth: 100px;\\n'], ['\\n\\twidth: 100px;\\n']),\n    _templateObject5 = _taggedTemplateLiteral(['\\n\\tmargin-left: auto;\\n\\tpadding: 0 50px 0 50px;\\n'], ['\\n\\tmargin-left: auto;\\n\\tpadding: 0 50px 0 50px;\\n']),\n    _templateObject6 = _taggedTemplateLiteral(['\\n\\t', '\\n'], ['\\n\\t', '\\n']);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _functions = __webpack_require__(/*! Utils/functions */ \"./src/shared/utils/functions.js\");\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _lunesLib = __webpack_require__(/*! lunes-lib */ \"lunes-lib\");\n\nvar _history = __webpack_require__(/*! history */ \"history\");\n\nvar _index = __webpack_require__(/*! Containers/User/Login/index */ \"./src/shared/containers/User/Login/index.js\");\n\nvar _index2 = _interopRequireDefault(_index);\n\nvar _index3 = __webpack_require__(/*! Containers/Portfolio/index */ \"./src/shared/containers/Portfolio/index.js\");\n\nvar _index4 = _interopRequireDefault(_index3);\n\nvar _index5 = __webpack_require__(/*! Containers/Wallet/index */ \"./src/shared/containers/Wallet/index.js\");\n\nvar _index6 = _interopRequireDefault(_index5);\n\nvar _Link = __webpack_require__(/*! Components/Link */ \"./src/shared/components/Link.js\");\n\nvar _TextBase = __webpack_require__(/*! Components/TextBase */ \"./src/shared/components/TextBase.js\");\n\nvar _Text = __webpack_require__(/*! Components/Text */ \"./src/shared/components/Text.js\");\n\nvar _Header = __webpack_require__(/*! ./Header */ \"./src/shared/containers/App/Header.js\");\n\nvar _Header2 = _interopRequireDefault(_Header);\n\nvar _PanelLeft = __webpack_require__(/*! ./PanelLeft */ \"./src/shared/containers/App/PanelLeft.js\");\n\nvar _PanelLeft2 = _interopRequireDefault(_PanelLeft);\n\nvar _PanelRight = __webpack_require__(/*! ./PanelRight */ \"./src/shared/containers/App/PanelRight.js\");\n\nvar _PanelRight2 = _interopRequireDefault(_PanelRight);\n\nvar _AuthRoute = __webpack_require__(/*! Components/AuthRoute */ \"./src/shared/components/AuthRoute.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\n__webpack_require__(/*! dotenv */ \"dotenv\").load();\n\n//COMPONENTS\n\n//SUB-COMPONENTS\n\n// import { checkAuth }    from 'Auth/index';\n\nvar Panels = _styledComponents2.default.div(_templateObject);\nvar WrapApp = _styledComponents2.default.div(_templateObject2);\nvar WrapLogo = _styledComponents2.default.div(_templateObject3);\nvar Logo = _styledComponents2.default.img(_templateObject4);\nvar WrapBalance = _styledComponents2.default.div(_templateObject5);\nvar Balance = _styledComponents2.default.div(_templateObject6, _TextBase.TextBase);\n\nvar App = function (_React$Component) {\n\t_inherits(App, _React$Component);\n\n\tfunction App() {\n\t\t_classCallCheck(this, App);\n\n\t\treturn _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));\n\t}\n\n\t_createClass(App, [{\n\t\tkey: 'componentDidMount',\n\t\tvalue: function componentDidMount() {}\n\t}, {\n\t\tkey: 'componentDidUpdate',\n\t\tvalue: function componentDidUpdate() {}\n\t}, {\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\treturn _react2.default.createElement(\n\t\t\t\tWrapApp,\n\t\t\t\tnull,\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t_Header2.default,\n\t\t\t\t\tnull,\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\tWrapLogo,\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\t_react2.default.createElement(Logo, { src: '/img/logo.svg' })\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\tWrapBalance,\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\tBalance,\n\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t_Text.Text,\n\t\t\t\t\t\t\t\t{ clWhite: true, txLight: true, txInline: true },\n\t\t\t\t\t\t\t\t'Balance: '\n\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t_Text.Text,\n\t\t\t\t\t\t\t\t{ clNormalGreen: true, txBold: true, txInline: true },\n\t\t\t\t\t\t\t\t'LNS '\n\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t_Text.Text,\n\t\t\t\t\t\t\t\t{ clWhite: true, txBold: true, txInline: true },\n\t\t\t\t\t\t\t\t'1,300.00'\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t),\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t_Text.Text,\n\t\t\t\t\t\t\t{ clNormalGreen: true, txBold: true, txRight: true, size: '1.6rem' },\n\t\t\t\t\t\t\t'$ 130.00'\n\t\t\t\t\t\t)\n\t\t\t\t\t)\n\t\t\t\t),\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\tPanels,\n\t\t\t\t\tnull,\n\t\t\t\t\t_react2.default.createElement(_PanelLeft2.default, null),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t_PanelRight2.default,\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t_reactRouterDom.Switch,\n\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: \"/app/\", component: _index4.default }),\n\t\t\t\t\t\t\t_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: \"/app/home\", component: _index4.default }),\n\t\t\t\t\t\t\t_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: \"/app/wallet\", component: _index6.default })\n\t\t\t\t\t\t)\n\t\t\t\t\t)\n\t\t\t\t)\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn App;\n}(_react2.default.Component);\n\nvar mapStateToProps = function mapStateToProps(state) {\n\treturn {\n\t\tuser: state.user\n\t};\n};\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n\treturn {\n\t\tuserLogin: function userLogin(email, password) {\n\t\t\tdispatch({\n\t\t\t\ttype: 'USER_LOGIN',\n\t\t\t\tpayload: _userLogin(email, password)\n\t\t\t});\n\t\t}\n\t};\n};\nvar _userLogin = function _userLogin(email, password) {\n\treturn _lunesLib.users.login({ email: email, password: password });\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App);\n\n//# sourceURL=webpack:///./src/shared/containers/App/index.js?");

/***/ }),

/***/ "./src/shared/containers/AppSwitcher.js":
/*!**********************************************!*\
  !*** ./src/shared/containers/AppSwitcher.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _history = __webpack_require__(/*! history */ \"history\");\n\nvar _index = __webpack_require__(/*! Containers/App/index */ \"./src/shared/containers/App/index.js\");\n\nvar _index2 = _interopRequireDefault(_index);\n\nvar _index3 = __webpack_require__(/*! Containers/User/Login/index */ \"./src/shared/containers/User/Login/index.js\");\n\nvar _index4 = _interopRequireDefault(_index3);\n\nvar _index5 = __webpack_require__(/*! Containers/User/Registry/index */ \"./src/shared/containers/User/Registry/index.js\");\n\nvar _index6 = _interopRequireDefault(_index5);\n\nvar _index7 = __webpack_require__(/*! Containers/User/Reset/index */ \"./src/shared/containers/User/Reset/index.js\");\n\nvar _index8 = _interopRequireDefault(_index7);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar AppSwitcher = function (_React$Component) {\n\t_inherits(AppSwitcher, _React$Component);\n\n\tfunction AppSwitcher() {\n\t\t_classCallCheck(this, AppSwitcher);\n\n\t\treturn _possibleConstructorReturn(this, (AppSwitcher.__proto__ || Object.getPrototypeOf(AppSwitcher)).apply(this, arguments));\n\t}\n\n\t_createClass(AppSwitcher, [{\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\treturn _react2.default.createElement(\n\t\t\t\t_reactRouterDom.Switch,\n\t\t\t\tnull,\n\t\t\t\t_react2.default.createElement(_reactRouterDom.Route, { strict: true, path: '/app', component: _index2.default }),\n\t\t\t\t_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/login', component: _index4.default }),\n\t\t\t\t_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/registry', component: _index6.default }),\n\t\t\t\t_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/reset', component: _index8.default })\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn AppSwitcher;\n}(_react2.default.Component);\n\nexports.default = AppSwitcher;\n\n//# sourceURL=webpack:///./src/shared/containers/AppSwitcher.js?");

/***/ }),

/***/ "./src/shared/containers/Portfolio/index.js":
/*!**************************************************!*\
  !*** ./src/shared/containers/Portfolio/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Portfolio = function (_React$Component) {\n\t_inherits(Portfolio, _React$Component);\n\n\tfunction Portfolio() {\n\t\t_classCallCheck(this, Portfolio);\n\n\t\treturn _possibleConstructorReturn(this, (Portfolio.__proto__ || Object.getPrototypeOf(Portfolio)).apply(this, arguments));\n\t}\n\n\t_createClass(Portfolio, [{\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\treturn _react2.default.createElement(\n\t\t\t\t'h1',\n\t\t\t\tnull,\n\t\t\t\t'Portfolio'\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn Portfolio;\n}(_react2.default.Component);\n\nexports.default = Portfolio;\n\n//# sourceURL=webpack:///./src/shared/containers/Portfolio/index.js?");

/***/ }),

/***/ "./src/shared/containers/User/Login/PanelLeft.js":
/*!*******************************************************!*\
  !*** ./src/shared/containers/User/Login/PanelLeft.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\tbackground: ', ';\\n\\tfloat: left;\\n\\twidth: 40%;\\n\\theight: 100vh;\\n\\toverflow: auto;\\n\\tpadding: 0 0 50px 0;\\n'], ['\\n\\tbackground: ', ';\\n\\tfloat: left;\\n\\twidth: 40%;\\n\\theight: 100vh;\\n\\toverflow: auto;\\n\\tpadding: 0 0 50px 0;\\n']);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar PanelLeft = _styledComponents2.default.aside(_templateObject, _styleVariables2.default.darkLilac);\n\nexports.default = PanelLeft;\n\n//# sourceURL=webpack:///./src/shared/containers/User/Login/PanelLeft.js?");

/***/ }),

/***/ "./src/shared/containers/User/Login/PanelRight.js":
/*!********************************************************!*\
  !*** ./src/shared/containers/User/Login/PanelRight.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.PanelRight = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\tfloat: left;\\n\\twidth: 60%;\\n\\theight: 100vh;\\n\\tbackground: ', ';\\n'], ['\\n\\tfloat: left;\\n\\twidth: 60%;\\n\\theight: 100vh;\\n\\tbackground: ', ';\\n']);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar PanelRight = exports.PanelRight = _styledComponents2.default.main(_templateObject, _styleVariables2.default.normalLilac);\n\nexports.default = PanelRight;\n\n//# sourceURL=webpack:///./src/shared/containers/User/Login/PanelRight.js?");

/***/ }),

/***/ "./src/shared/containers/User/Login/index.js":
/*!***************************************************!*\
  !*** ./src/shared/containers/User/Login/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\twidth: 100%;\\n\\tmargin-top: 140px;\\n'], ['\\n\\twidth: 100%;\\n\\tmargin-top: 140px;\\n']),\n    _templateObject2 = _taggedTemplateLiteral(['\\n\\tmargin: 70px auto 0 auto;\\n'], ['\\n\\tmargin: 70px auto 0 auto;\\n']),\n    _templateObject3 = _taggedTemplateLiteral(['\\n\\tcolor: white;\\n\\ttext-decoration: none;\\n\\ttext-align: center;\\n\\tdisplay: block;\\n\\tmargin: 10px auto 0 auto;\\n\\t', '\\n'], ['\\n\\tcolor: white;\\n\\ttext-decoration: none;\\n\\ttext-align: center;\\n\\tdisplay: block;\\n\\tmargin: 10px auto 0 auto;\\n\\t', '\\n']);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _lunesLib = __webpack_require__(/*! lunes-lib */ \"lunes-lib\");\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _User = __webpack_require__(/*! Classes/User */ \"./src/shared/classes/User.js\");\n\nvar _Form = __webpack_require__(/*! Components/Form */ \"./src/shared/components/Form.js\");\n\nvar _FormGroup = __webpack_require__(/*! Components/FormGroup */ \"./src/shared/components/FormGroup.js\");\n\nvar _Input = __webpack_require__(/*! Components/Input */ \"./src/shared/components/Input.js\");\n\nvar _Buttons = __webpack_require__(/*! Components/Buttons */ \"./src/shared/components/Buttons.js\");\n\nvar _H = __webpack_require__(/*! Components/H1 */ \"./src/shared/components/H1.js\");\n\nvar _H2 = __webpack_require__(/*! Components/H2 */ \"./src/shared/components/H2.js\");\n\nvar _H3 = __webpack_require__(/*! Components/H3 */ \"./src/shared/components/H3.js\");\n\nvar _Logo = __webpack_require__(/*! Components/Logo */ \"./src/shared/components/Logo.js\");\n\nvar _PanelLeft = __webpack_require__(/*! ./PanelLeft */ \"./src/shared/containers/User/Login/PanelLeft.js\");\n\nvar _PanelLeft2 = _interopRequireDefault(_PanelLeft);\n\nvar _PanelRight = __webpack_require__(/*! ./PanelRight */ \"./src/shared/containers/User/Login/PanelRight.js\");\n\nvar _PanelRight2 = _interopRequireDefault(_PanelRight);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n//COMPONENTS\n\n//PRIVATE COMPONENTS\n\n\nvar WrapPhrases = _styledComponents2.default.div(_templateObject);\nvar CustomLogo = _Logo.Logo.extend(_templateObject2);\nvar CustomLink = (0, _styledComponents2.default)(_reactRouterDom.Link)(_templateObject3, function (props) {\n\treturn props.margin ? 'margin: ' + props.margin + ';' : '';\n});\n\nvar Login = function (_React$Component) {\n\t_inherits(Login, _React$Component);\n\n\tfunction Login() {\n\t\tvar _ref;\n\n\t\tvar _temp, _this, _ret;\n\n\t\t_classCallCheck(this, Login);\n\n\t\tfor (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n\t\t\targs[_key] = arguments[_key];\n\t\t}\n\n\t\treturn _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Login.__proto__ || Object.getPrototypeOf(Login)).call.apply(_ref, [this].concat(args))), _this), _this.handleLogin = function (event) {\n\t\t\tevent.preventDefault();\n\t\t\tvar emailEl = document.querySelector('.login-email');\n\t\t\tvar passEl = document.querySelector('.login-password');\n\n\t\t\tvar email = emailEl.value;\n\t\t\tvar password = passEl.value;\n\t\t\t_this.props.userLogin(email, password);\n\t\t}, _temp), _possibleConstructorReturn(_this, _ret);\n\t}\n\n\t_createClass(Login, [{\n\t\tkey: 'componentDidUpdate',\n\t\tvalue: function componentDidUpdate() {\n\t\t\tthis.handleStatus();\n\t\t}\n\t}, {\n\t\tkey: 'handleStatus',\n\t\tvalue: function handleStatus() {\n\t\t\tvar statusEl = document.querySelector('.js-status');\n\n\t\t\tvar status = this.props.user.status;\n\n\n\t\t\tif (status === 'pending') {\n\t\t\t\tstatusEl.textContent = 'Aguarde...';\n\t\t\t} else if (status === 'fulfilled') {\n\t\t\t\tstatusEl.textContent = 'Sucesso';\n\t\t\t} else if (status === 'rejected') {\n\t\t\t\tstatusEl.textContent = 'Tente novamente';\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\tvar _props$user = this.props.user,\n\t\t\t    status = _props$user.status,\n\t\t\t    logged = _props$user.logged;\n\n\t\t\treturn _react2.default.createElement(\n\t\t\t\t'div',\n\t\t\t\tnull,\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t_PanelLeft2.default,\n\t\t\t\t\tnull,\n\t\t\t\t\t_react2.default.createElement(CustomLogo, null),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\tWrapPhrases,\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t_H.H1,\n\t\t\t\t\t\t\t{ clNormalGreen: true, txCenter: true },\n\t\t\t\t\t\t\t'R\\xE1pida segura e inteligente'\n\t\t\t\t\t\t),\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t_H3.H3,\n\t\t\t\t\t\t\t{ clWhite: true, txCenter: true, margin: '25px 0 0 0' },\n\t\t\t\t\t\t\t'Entre com seus dados'\n\t\t\t\t\t\t)\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t_Form.Form,\n\t\t\t\t\t\t{ margin: \"50px auto 0 auto\", width: '70%' },\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t_FormGroup.FormGroup,\n\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t_react2.default.createElement(_Input.Input, { placeholder: \"nome@email.com\", className: \"login-email\" })\n\t\t\t\t\t\t),\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t_FormGroup.FormGroup,\n\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t_react2.default.createElement(_Input.Input, { placeholder: \"Senha\", className: \"login-password\" })\n\t\t\t\t\t\t),\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t_Buttons.ButtonSecondary,\n\t\t\t\t\t\t\t{ secondary: true, onClick: this.handleLogin },\n\t\t\t\t\t\t\tlogged ? 'Logado' : 'Fazer login'\n\t\t\t\t\t\t)\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(_H.H1, { txCenter: true, clWhite: true, className: \"js-status\" }),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\tCustomLink,\n\t\t\t\t\t\t{ to: \"/registry\" },\n\t\t\t\t\t\t'Criar conta'\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\tCustomLink,\n\t\t\t\t\t\t{ to: \"/reset\" },\n\t\t\t\t\t\t'Perdi minha senha'\n\t\t\t\t\t)\n\t\t\t\t),\n\t\t\t\t_react2.default.createElement(_PanelRight2.default, null)\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn Login;\n}(_react2.default.Component);\n\nvar mapStateToProps = function mapStateToProps(state) {\n\treturn {\n\t\tuser: state.user\n\t};\n};\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n\treturn {\n\t\tuserLogin: function userLogin(email, password) {\n\t\t\tvar user = new _User.UserClass();\n\t\t\tdispatch({\n\t\t\t\ttype: 'USER_LOGIN',\n\t\t\t\tpayload: user.login({ email: email, password: password })\n\t\t\t});\n\t\t}\n\t};\n};\nexports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Login);\n\n//# sourceURL=webpack:///./src/shared/containers/User/Login/index.js?");

/***/ }),

/***/ "./src/shared/containers/User/Registry/PanelLeft.js":
/*!**********************************************************!*\
  !*** ./src/shared/containers/User/Registry/PanelLeft.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.PanelLeft = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\tbackground: ', ';\\n\\tfloat: left;\\n\\twidth: 100%;\\n\\theight: 100vh;\\n\\toverflow: auto;\\n\\tpadding-bottom: 50px;\\n\\n\\t@media only screen and (min-width: 768px) {\\n\\t\\twidth: 40%;\\n\\t}\\n\\n'], ['\\n\\tbackground: ', ';\\n\\tfloat: left;\\n\\twidth: 100%;\\n\\theight: 100vh;\\n\\toverflow: auto;\\n\\tpadding-bottom: 50px;\\n\\n\\t@media only screen and (min-width: 768px) {\\n\\t\\twidth: 40%;\\n\\t}\\n\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar PanelLeft = exports.PanelLeft = _styledComponents2.default.aside(_templateObject, _styleVariables2.default.darkLilac);\n\n//# sourceURL=webpack:///./src/shared/containers/User/Registry/PanelLeft.js?");

/***/ }),

/***/ "./src/shared/containers/User/Registry/PanelRight.js":
/*!***********************************************************!*\
  !*** ./src/shared/containers/User/Registry/PanelRight.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.PanelRight = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\tbackground: ', ';\\n\\tdisplay: none;\\n\\tfloat: left;\\n\\theight: 100vh;\\n\\twidth: 60%;\\n\\n\\t@media only screen and (min-width: 768px) {\\n\\t\\tdisplay: block;\\n\\t}\\n\\n'], ['\\n\\tbackground: ', ';\\n\\tdisplay: none;\\n\\tfloat: left;\\n\\theight: 100vh;\\n\\twidth: 60%;\\n\\n\\t@media only screen and (min-width: 768px) {\\n\\t\\tdisplay: block;\\n\\t}\\n\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar PanelRight = exports.PanelRight = _styledComponents2.default.aside(_templateObject, _styleVariables2.default.normalLilac);\n\n//# sourceURL=webpack:///./src/shared/containers/User/Registry/PanelRight.js?");

/***/ }),

/***/ "./src/shared/containers/User/Registry/index.js":
/*!******************************************************!*\
  !*** ./src/shared/containers/User/Registry/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\tmargin: 70px auto 0 auto;\\n'], ['\\n\\tmargin: 70px auto 0 auto;\\n']),\n    _templateObject2 = _taggedTemplateLiteral(['\\n\\tmargin: 25px 0 0 0;\\n\\ttext-align: center;\\n\\tcolor: white;\\n\\tfont-size:1.2em;\\n'], ['\\n\\tmargin: 25px 0 0 0;\\n\\ttext-align: center;\\n\\tcolor: white;\\n\\tfont-size:1.2em;\\n']),\n    _templateObject3 = _taggedTemplateLiteral(['\\n\\twidth: 70%;\\n\\tdisplay: block;\\n\\tmargin: 25px auto 0 auto;\\n'], ['\\n\\twidth: 70%;\\n\\tdisplay: block;\\n\\tmargin: 25px auto 0 auto;\\n']),\n    _templateObject4 = _taggedTemplateLiteral(['\\n\\tcolor: white;\\n\\ttext-decoration: none;\\n\\ttext-align: center;\\n\\tdisplay: block;\\n\\tmargin: 10px auto 0 auto;\\n\\t', '\\n'], ['\\n\\tcolor: white;\\n\\ttext-decoration: none;\\n\\ttext-align: center;\\n\\tdisplay: block;\\n\\tmargin: 10px auto 0 auto;\\n\\t', '\\n']),\n    _templateObject5 = _taggedTemplateLiteral(['\\n\\tcolor: ', ';\\n\\tfont-size: 1.4em;\\n\\ttext-decoration: none;\\n\\ttext-align:center;\\n\\tdisplay:block;\\n\\tmargin: 140px auto 0px auto;\\n'], ['\\n\\tcolor: ', ';\\n\\tfont-size: 1.4em;\\n\\ttext-decoration: none;\\n\\ttext-align:center;\\n\\tdisplay:block;\\n\\tmargin: 140px auto 0px auto;\\n']);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _lunesLib = __webpack_require__(/*! lunes-lib */ \"lunes-lib\");\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _PanelLeft = __webpack_require__(/*! ./PanelLeft */ \"./src/shared/containers/User/Registry/PanelLeft.js\");\n\nvar _PanelRight = __webpack_require__(/*! ./PanelRight */ \"./src/shared/containers/User/Registry/PanelRight.js\");\n\nvar _Logo = __webpack_require__(/*! Components/Logo */ \"./src/shared/components/Logo.js\");\n\nvar _H = __webpack_require__(/*! Components/H3 */ \"./src/shared/components/H3.js\");\n\nvar _H2 = __webpack_require__(/*! Components/H1 */ \"./src/shared/components/H1.js\");\n\nvar _FormBuilder = __webpack_require__(/*! Components/FormBuilder */ \"./src/shared/components/FormBuilder.js\");\n\nvar _Buttons = __webpack_require__(/*! Components/Buttons */ \"./src/shared/components/Buttons.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar CustomLogo = _Logo.Logo.extend(_templateObject);\nvar CustomH3 = _H.H3.extend(_templateObject2);\nvar CustomForm = _styledComponents2.default.form(_templateObject3);\nvar CustomLink = (0, _styledComponents2.default)(_reactRouterDom.Link)(_templateObject4, function (props) {\n\treturn props.margin ? 'margin: ' + props.margin + ';' : '';\n});\n\nvar CustomLinkGreen = (0, _styledComponents2.default)(_reactRouterDom.Link)(_templateObject5, _styleVariables2.default.normalGreen);\nvar inputs = [{ className: 'registry-fname', placeholder: 'Nome' }, { className: 'registry-lname', placeholder: 'Sobrenome' }, { className: 'registry-email', placeholder: 'E-mail', type: 'email' }, { className: 'registry-pass', placeholder: 'Senha', type: 'password' }, { className: 'registry-cpass', placeholder: 'Confirmar senha', type: 'password' }, { className: 'registry-terms', value: ' Eu aceito os Termos de Serviços', type: 'checkbox' }];\n\nvar Registry = function (_React$Component) {\n\t_inherits(Registry, _React$Component);\n\n\tfunction Registry() {\n\t\tvar _ref;\n\n\t\tvar _temp, _this, _ret;\n\n\t\t_classCallCheck(this, Registry);\n\n\t\tfor (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n\t\t\targs[_key] = arguments[_key];\n\t\t}\n\n\t\treturn _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Registry.__proto__ || Object.getPrototypeOf(Registry)).call.apply(_ref, [this].concat(args))), _this), _this.handleSubmit = function (event) {\n\t\t\tevent.preventDefault();\n\t\t\tvar termsEl = document.querySelector('.registry-terms');\n\t\t\tvar emailEl = document.querySelector('.registry-email');\n\t\t\tvar fnameEl = document.querySelector('.registry-fname');\n\t\t\tvar lnameEl = document.querySelector('.registry-lname');\n\t\t\tvar passEl = document.querySelector('.registry-pass');\n\t\t\tvar cpassEl = document.querySelector('.registry-cpass');\n\t\t\tif (!termsEl.checked) {\n\t\t\t\talert('You havent agreed with our terms');\n\t\t\t\treturn null;\n\t\t\t}\n\t\t\tif (passEl.value !== cpassEl.value) {\n\t\t\t\talert('Passwords dint match');\n\t\t\t\treturn null;\n\t\t\t}\n\t\t\tif (passEl.value < 8) {\n\t\t\t\talert('Password is less than 8 characters');\n\t\t\t\treturn null;\n\t\t\t}\n\t\t\tvar fullname = fnameEl.value + ' ' + lnameEl.value;\n\t\t\t_this.props.userCreate({\n\t\t\t\temail: emailEl.value,\n\t\t\t\tpassword: passEl.value,\n\t\t\t\tfullname: fullname.replace('  ', ' ')\n\t\t\t});\n\t\t}, _temp), _possibleConstructorReturn(_this, _ret);\n\t}\n\n\t_createClass(Registry, [{\n\t\tkey: 'handleStatus',\n\t\tvalue: function handleStatus() {\n\t\t\tvar firstPanelEl = document.querySelector('.js-first-panel-left');\n\t\t\tvar secondPanelEl = document.querySelector('.js-second-panel-left');\n\t\t\tvar statusEl = document.querySelector('.js-status');\n\n\t\t\tvar status = this.props.user.status;\n\n\n\t\t\tif (status === 'pending') {\n\t\t\t\tstatusEl.textContent = 'Aguarde...';\n\t\t\t} else if (status === 'fulfilled') {\n\t\t\t\tfirstPanelEl.style.display = 'none';\n\t\t\t\tsecondPanelEl.style.display = 'block';\n\t\t\t\tstatusEl.textContent = 'Sucesso';\n\t\t\t} else if (status === 'rejected') {\n\t\t\t\tstatusEl.textContent = 'Tente novamente';\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'componentDidUpdate',\n\t\tvalue: function componentDidUpdate() {\n\t\t\tthis.handleStatus();\n\t\t}\n\t}, {\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\tvar _props$user = this.props.user,\n\t\t\t    status = _props$user.status,\n\t\t\t    logged = _props$user.logged;\n\n\n\t\t\treturn _react2.default.createElement(\n\t\t\t\t'div',\n\t\t\t\tnull,\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t_PanelLeft.PanelLeft,\n\t\t\t\t\tnull,\n\t\t\t\t\t_react2.default.createElement(CustomLogo, null),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\tCustomH3,\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\t'Insira os dados necess\\xE1rios para efetuar o seu cadastro'\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\tCustomForm,\n\t\t\t\t\t\t{ onSubmit: this.handleSubmit },\n\t\t\t\t\t\t_react2.default.createElement(_FormBuilder.FormBuilder, { inputs: inputs }),\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t_Buttons.ButtonSecondary,\n\t\t\t\t\t\t\t{ type: \"submit\" },\n\t\t\t\t\t\t\t'ENTRAR'\n\t\t\t\t\t\t)\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(_H2.H1, { className: \"js-status\", txCenter: true, clWhite: true, margin: \"50px 0 0 0\" }),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\tCustomLinkGreen,\n\t\t\t\t\t\t{ to: \"/login\" },\n\t\t\t\t\t\t'J\\xE1 tem uma conta? Entrar'\n\t\t\t\t\t)\n\t\t\t\t),\n\t\t\t\t_react2.default.createElement(_PanelRight.PanelRight, null)\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn Registry;\n}(_react2.default.Component);\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n\treturn {\n\t\tuserCreate: function userCreate(data) {\n\t\t\tdispatch({\n\t\t\t\ttype: 'USER_CREATE',\n\t\t\t\tpayload: _lunesLib.users.create({\n\t\t\t\t\temail: data.email,\n\t\t\t\t\tpassword: data.password,\n\t\t\t\t\tfullname: data.fullname\n\t\t\t\t})\n\t\t\t});\n\t\t}\n\t};\n};\nvar mapStateToProps = function mapStateToProps(state) {\n\treturn {\n\t\tuser: state.user\n\t};\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Registry);\n\n//# sourceURL=webpack:///./src/shared/containers/User/Registry/index.js?");

/***/ }),

/***/ "./src/shared/containers/User/Reset/PanelLeft.js":
/*!*******************************************************!*\
  !*** ./src/shared/containers/User/Reset/PanelLeft.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\tbackground: ', ';\\n\\tfloat: left;\\n\\twidth: 40%;\\n\\theight: 100vh;\\n'], ['\\n\\tbackground: ', ';\\n\\tfloat: left;\\n\\twidth: 40%;\\n\\theight: 100vh;\\n']);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar PanelLeft = _styledComponents2.default.aside(_templateObject, _styleVariables2.default.darkLilac);\n\nexports.default = PanelLeft;\n\n//# sourceURL=webpack:///./src/shared/containers/User/Reset/PanelLeft.js?");

/***/ }),

/***/ "./src/shared/containers/User/Reset/PanelRight.js":
/*!********************************************************!*\
  !*** ./src/shared/containers/User/Reset/PanelRight.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\tfloat: left;\\n\\twidth: 60%;\\n\\theight: 100vh;\\n\\tbackground: ', ';\\n'], ['\\n\\tfloat: left;\\n\\twidth: 60%;\\n\\theight: 100vh;\\n\\tbackground: ', ';\\n']);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar PanelRight = _styledComponents2.default.main(_templateObject, _styleVariables2.default.normalLilac);\n\nexports.default = PanelRight;\n\n//# sourceURL=webpack:///./src/shared/containers/User/Reset/PanelRight.js?");

/***/ }),

/***/ "./src/shared/containers/User/Reset/index.js":
/*!***************************************************!*\
  !*** ./src/shared/containers/User/Reset/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\tmargin: 70px auto 0 auto;\\n'], ['\\n\\tmargin: 70px auto 0 auto;\\n']),\n    _templateObject2 = _taggedTemplateLiteral(['\\n\\tmargin: 25px 0 0 0;\\n\\ttext-align: center;\\n\\tcolor: white;\\n'], ['\\n\\tmargin: 25px 0 0 0;\\n\\ttext-align: center;\\n\\tcolor: white;\\n']),\n    _templateObject3 = _taggedTemplateLiteral(['\\n\\twidth: 70%;\\n\\tdisplay: block;\\n\\tmargin: 25px auto 0 auto;\\n'], ['\\n\\twidth: 70%;\\n\\tdisplay: block;\\n\\tmargin: 25px auto 0 auto;\\n']),\n    _templateObject4 = _taggedTemplateLiteral(['\\n\\tdisplay: none;\\n'], ['\\n\\tdisplay: none;\\n']),\n    _templateObject5 = _taggedTemplateLiteral(['\\n\\tcolor: white;\\n\\ttext-decoration: none;\\n\\ttext-align: center;\\n\\tdisplay: block;\\n\\tmargin: 25px auto 0 auto;\\n\\t', '\\n'], ['\\n\\tcolor: white;\\n\\ttext-decoration: none;\\n\\ttext-align: center;\\n\\tdisplay: block;\\n\\tmargin: 25px auto 0 auto;\\n\\t', '\\n']);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _lunesLib = __webpack_require__(/*! lunes-lib */ \"lunes-lib\");\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _PanelLeft = __webpack_require__(/*! ./PanelLeft */ \"./src/shared/containers/User/Reset/PanelLeft.js\");\n\nvar _PanelLeft2 = _interopRequireDefault(_PanelLeft);\n\nvar _PanelRight = __webpack_require__(/*! ./PanelRight */ \"./src/shared/containers/User/Reset/PanelRight.js\");\n\nvar _PanelRight2 = _interopRequireDefault(_PanelRight);\n\nvar _Logo = __webpack_require__(/*! Components/Logo */ \"./src/shared/components/Logo.js\");\n\nvar _H = __webpack_require__(/*! Components/H3 */ \"./src/shared/components/H3.js\");\n\nvar _H2 = __webpack_require__(/*! Components/H1 */ \"./src/shared/components/H1.js\");\n\nvar _FormBuilder = __webpack_require__(/*! Components/FormBuilder */ \"./src/shared/components/FormBuilder.js\");\n\nvar _Buttons = __webpack_require__(/*! Components/Buttons */ \"./src/shared/components/Buttons.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar CustomLogo = _Logo.Logo.extend(_templateObject);\nvar CustomH3 = _H.H3.extend(_templateObject2);\nvar CustomForm = _styledComponents2.default.form(_templateObject3);\nvar SecondPanelLeft = _PanelLeft2.default.extend(_templateObject4);\nvar CustomLink = (0, _styledComponents2.default)(_reactRouterDom.Link)(_templateObject5, function (props) {\n\treturn props.margin ? 'margin: ' + props.margin + ';' : '';\n});\nvar inputs = [{\n\tclassName: 'reset-email',\n\tplaceholder: 'E-mail',\n\ttype: 'email'\n}];\n\nvar Reset = function (_React$Component) {\n\t_inherits(Reset, _React$Component);\n\n\tfunction Reset() {\n\t\tvar _ref;\n\n\t\tvar _temp, _this, _ret;\n\n\t\t_classCallCheck(this, Reset);\n\n\t\tfor (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n\t\t\targs[_key] = arguments[_key];\n\t\t}\n\n\t\treturn _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Reset.__proto__ || Object.getPrototypeOf(Reset)).call.apply(_ref, [this].concat(args))), _this), _this.handleSubmit = function (event) {\n\t\t\tevent.preventDefault();\n\t\t\tvar emailEl = document.querySelector('.reset-email');\n\t\t\t_this.props.userReset(emailEl.value);\n\t\t}, _temp), _possibleConstructorReturn(_this, _ret);\n\t}\n\n\t_createClass(Reset, [{\n\t\tkey: 'componentDidMount',\n\t\tvalue: function componentDidMount() {}\n\t}, {\n\t\tkey: 'componentDidUpdate',\n\t\tvalue: function componentDidUpdate() {\n\t\t\tthis.handleStatus();\n\t\t}\n\t}, {\n\t\tkey: 'handleStatus',\n\t\tvalue: function handleStatus() {\n\t\t\tvar firstPanelEl = document.querySelector('.js-first-panel-left');\n\t\t\tvar secondPanelEl = document.querySelector('.js-second-panel-left');\n\t\t\tvar statusEl = document.querySelector('.js-status');\n\n\t\t\tvar status = this.props.user.status;\n\n\n\t\t\tif (status === 'pending') {\n\t\t\t\tstatusEl.textContent = 'Aguarde...';\n\t\t\t} else if (status === 'fulfilled') {\n\t\t\t\tfirstPanelEl.style.display = 'none';\n\t\t\t\tsecondPanelEl.style.display = 'block';\n\t\t\t\tstatusEl.textContent = 'Sucesso';\n\t\t\t} else if (status === 'rejected') {\n\t\t\t\tstatusEl.textContent = 'Tente novamente';\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\tvar _props$user = this.props.user,\n\t\t\t    status = _props$user.status,\n\t\t\t    logged = _props$user.logged;\n\n\n\t\t\treturn _react2.default.createElement(\n\t\t\t\t'div',\n\t\t\t\tnull,\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t_PanelLeft2.default,\n\t\t\t\t\t{ className: \"js-first-panel-left\" },\n\t\t\t\t\t_react2.default.createElement(CustomLogo, null),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\tCustomH3,\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\t'Preencha seus dados abaixo'\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\tCustomForm,\n\t\t\t\t\t\t{ onSubmit: this.handleSubmit },\n\t\t\t\t\t\t_react2.default.createElement(_FormBuilder.FormBuilder, { inputs: inputs }),\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t_Buttons.ButtonSecondary,\n\t\t\t\t\t\t\t{ type: \"submit\" },\n\t\t\t\t\t\t\t'Resgatar'\n\t\t\t\t\t\t)\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(_H2.H1, { txCenter: true, clWhite: true, margin: \"20px 0 0 0\", className: \"js-status\" }),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\tCustomLink,\n\t\t\t\t\t\t{ to: '/login' },\n\t\t\t\t\t\t'Fazer login'\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\tCustomLink,\n\t\t\t\t\t\t{ to: '/registry' },\n\t\t\t\t\t\t'Criar conta'\n\t\t\t\t\t)\n\t\t\t\t),\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\tSecondPanelLeft,\n\t\t\t\t\t{ className: \"js-second-panel-left\" },\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t_H2.H1,\n\t\t\t\t\t\t{ txCenter: true, clWhite: true, margin: \"20px 0 0 0\" },\n\t\t\t\t\t\t'Voce conseguiu'\n\t\t\t\t\t)\n\t\t\t\t),\n\t\t\t\t_react2.default.createElement(_PanelRight2.default, null)\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn Reset;\n}(_react2.default.Component);\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n\treturn {\n\t\tuserReset: function userReset(email) {\n\t\t\tdispatch({\n\t\t\t\ttype: 'USER_RESET',\n\t\t\t\tpayload: _lunesLib.users.resetPassword({\n\t\t\t\t\temail: email\n\t\t\t\t})\n\t\t\t});\n\t\t}\n\t};\n};\nvar mapStateToProps = function mapStateToProps(state) {\n\treturn {\n\t\tuser: state.user\n\t};\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Reset);\n\n//# sourceURL=webpack:///./src/shared/containers/User/Reset/index.js?");

/***/ }),

/***/ "./src/shared/containers/Wallet/Coins.js":
/*!***********************************************!*\
  !*** ./src/shared/containers/Wallet/Coins.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\twidth: auto;\\n\\tmin-width: 100%;\\n\\theight: 100px;\\n\\tdisplay: flex;\\n\\tflex-flow: nowrap;\\n\\tbackground: ', ';\\n\\tcursor: pointer;\\n\\n\\tbox-shadow: 30px 0px 20px rgba(0,0,0,.0);\\n\\ttransform: translateX(0);\\n\\ttransition: transform 0.3s, box-shadow 0.4s;\\n\\n\\t&:hover {\\n\\t\\tbox-shadow: 20px 0px 40px rgba(0,0,0,.1);\\n\\t\\ttransform: translateX(20px);\\n\\t}\\n\\n\\t@media (min-width: 320px) {\\n\\t\\tpadding: 0 3rem 0 3rem;\\n\\t}\\n\\t@media (min-width: 768px) {\\n\\t\\tpadding: 0 5rem 0 5rem;\\n\\t}\\n'], ['\\n\\twidth: auto;\\n\\tmin-width: 100%;\\n\\theight: 100px;\\n\\tdisplay: flex;\\n\\tflex-flow: nowrap;\\n\\tbackground: ', ';\\n\\tcursor: pointer;\\n\\n\\tbox-shadow: 30px 0px 20px rgba(0,0,0,.0);\\n\\ttransform: translateX(0);\\n\\ttransition: transform 0.3s, box-shadow 0.4s;\\n\\n\\t&:hover {\\n\\t\\tbox-shadow: 20px 0px 40px rgba(0,0,0,.1);\\n\\t\\ttransform: translateX(20px);\\n\\t}\\n\\n\\t@media (min-width: 320px) {\\n\\t\\tpadding: 0 3rem 0 3rem;\\n\\t}\\n\\t@media (min-width: 768px) {\\n\\t\\tpadding: 0 5rem 0 5rem;\\n\\t}\\n']),\n    _templateObject2 = _taggedTemplateLiteral(['\\n\\t', '\\n\\theight: 75px;\\n\\twidth: 100%;\\n\\tbackground: #654FA4;\\n\\tcolor: white;\\n\\tdisplay: flex;\\n\\talign-items: center;\\n\\tjustify-content: flex-start;\\n\\tpadding: 0 0 0 40px;\\n'], ['\\n\\t', '\\n\\theight: 75px;\\n\\twidth: 100%;\\n\\tbackground: #654FA4;\\n\\tcolor: white;\\n\\tdisplay: flex;\\n\\talign-items: center;\\n\\tjustify-content: flex-start;\\n\\tpadding: 0 0 0 40px;\\n']),\n    _templateObject3 = _taggedTemplateLiteral(['\\n\\twidth: 50%;\\n\\theight: 100px;\\n\\tdisplay: flex;\\n\\tjustify-content: flex-start;\\n\\talign-items: center;\\n'], ['\\n\\twidth: 50%;\\n\\theight: 100px;\\n\\tdisplay: flex;\\n\\tjustify-content: flex-start;\\n\\talign-items: center;\\n']),\n    _templateObject4 = _taggedTemplateLiteral(['\\n\\twidth: 50px;\\n\\theight: 50px;\\n\\tmin-width: 50px;\\n'], ['\\n\\twidth: 50px;\\n\\theight: 50px;\\n\\tmin-width: 50px;\\n']),\n    _templateObject5 = _taggedTemplateLiteral(['\\n\\theight: 100px;\\n\\twidth: auto;\\n\\tdisplay: flex;\\n\\tflex-flow: wrap;\\n\\tjustify-content: flex-end;\\n\\talign-items: center;\\n\\talign-content: center;\\n'], ['\\n\\theight: 100px;\\n\\twidth: auto;\\n\\tdisplay: flex;\\n\\tflex-flow: wrap;\\n\\tjustify-content: flex-end;\\n\\talign-items: center;\\n\\talign-content: center;\\n']),\n    _templateObject6 = _taggedTemplateLiteral(['\\n\\twidth: auto;\\n\\t// height: 50px;\\n\\ttext-align: right;\\n\\t', '\\n'], ['\\n\\twidth: auto;\\n\\t// height: 50px;\\n\\ttext-align: right;\\n\\t', '\\n']),\n    _templateObject7 = _taggedTemplateLiteral(['\\n\\twidth: 100%;\\n\\t// height: 50px;\\n\\ttext-align: right;\\n\\t', '\\n'], ['\\n\\twidth: 100%;\\n\\t// height: 50px;\\n\\ttext-align: right;\\n\\t', '\\n']),\n    _templateObject8 = _taggedTemplateLiteral(['\\n\\twidth: auto;\\n\\tmin-width: 100%;\\n'], ['\\n\\twidth: auto;\\n\\tmin-width: 100%;\\n']);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _TextBase = __webpack_require__(/*! Components/TextBase */ \"./src/shared/components/TextBase.js\");\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _Loading = __webpack_require__(/*! Components/Loading */ \"./src/shared/components/Loading.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar Coin = _styledComponents2.default.div(_templateObject, _styleVariables2.default.normalLilac);\nvar CoinsHeader = _styledComponents2.default.div(_templateObject2, _TextBase.TextBase);\nvar WrapCoinImg = _styledComponents2.default.div(_templateObject3);\nvar CoinImg = _styledComponents2.default.img(_templateObject4);\nvar WrapCoinData = _styledComponents2.default.div(_templateObject5);\nvar CoinValue = _styledComponents2.default.div(_templateObject6, _TextBase.TextBase);\nvar CoinAmount = _styledComponents2.default.div(_templateObject7, _TextBase.TextBase);\n\nvar Coins = function (_React$Component) {\n\t_inherits(Coins, _React$Component);\n\n\tfunction Coins(props) {\n\t\t_classCallCheck(this, Coins);\n\n\t\tvar _this = _possibleConstructorReturn(this, (Coins.__proto__ || Object.getPrototypeOf(Coins)).call(this, props));\n\n\t\t_this.state = {\n\t\t\tbalance: undefined,\n\t\t\tcoinsPrice: undefined\n\t\t};\n\t\treturn _this;\n\t}\n\n\t_createClass(Coins, [{\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\tvar _this2 = this;\n\n\t\t\tvar _props = this.props,\n\t\t\t    balance = _props.balance,\n\t\t\t    coinsPrice = _props.coinsPrice;\n\n\t\t\treturn _react2.default.createElement(\n\t\t\t\t'div',\n\t\t\t\tnull,\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\tCoinsHeader,\n\t\t\t\t\tnull,\n\t\t\t\t\t'MINHAS CARTEIRAS'\n\t\t\t\t),\n\t\t\t\t_react2.default.createElement('img', { src: \"/img/wave-my-wallets.png\", style: { width: '100%' } }),\n\t\t\t\tfunction () {\n\t\t\t\t\tif (!coinsPrice || !balance) {\n\t\t\t\t\t\treturn _react2.default.createElement(_Loading.Loading, null);\n\t\t\t\t\t} else if (!balance.btc) {\n\t\t\t\t\t\treturn _react2.default.createElement(\n\t\t\t\t\t\t\tH1,\n\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t'Moeda(BTC) n\\xE3o encontrada'\n\t\t\t\t\t\t);\n\t\t\t\t\t}\n\t\t\t\t\tvar components = [];\n\t\t\t\t\t//EX: coinKey = 'btc';\n\n\t\t\t\t\tvar _loop = function _loop(coinKey) {\n\t\t\t\t\t\tcomponents.push(_react2.default.createElement(\n\t\t\t\t\t\t\tCoin,\n\t\t\t\t\t\t\t{ key: coinKey, onClick: function onClick() {\n\t\t\t\t\t\t\t\t\t_this2.props.openPanelRight({ coinPrice: coinsPrice[coinKey], coinName: coinKey });\n\t\t\t\t\t\t\t\t} },\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\tWrapCoinImg,\n\t\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t\t_react2.default.createElement(CoinImg, { src: '/img/bitcoin.svg' })\n\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\tWrapCoinData,\n\t\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\tCoinAmount,\n\t\t\t\t\t\t\t\t\t{ clWhite: true, size: '2.5rem' },\n\t\t\t\t\t\t\t\t\tbalance[coinKey].total_confirmed\n\t\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\tCoinValue,\n\t\t\t\t\t\t\t\t\t{ clWhite: true, size: '2rem' },\n\t\t\t\t\t\t\t\t\t'USD ' + balance[coinKey].total_amount\n\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t));\n\t\t\t\t\t};\n\n\t\t\t\t\tfor (var coinKey in balance) {\n\t\t\t\t\t\t_loop(coinKey);\n\t\t\t\t\t}\n\t\t\t\t\treturn components;\n\t\t\t\t}()\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn Coins;\n}(_react2.default.Component);\n\nvar styledCoins = (0, _styledComponents2.default)(Coins)(_templateObject8);\nvar mapStateToProps = function mapStateToProps(state) {\n\treturn {\n\t\twallet: state.wallet\n\t};\n};\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n\treturn {\n\t\topenPanelRight: function openPanelRight(_ref) {\n\t\t\tvar coinPrice = _ref.coinPrice,\n\t\t\t    coinName = _ref.coinName;\n\n\t\t\tdispatch({\n\t\t\t\ttype: 'WALLET_OPEN_PANELRIGHT',\n\t\t\t\tpayload: { coinPrice: coinPrice, coinName: coinName }\n\t\t\t});\n\t\t}\n\t};\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(styledCoins);\n\n//# sourceURL=webpack:///./src/shared/containers/Wallet/Coins.js?");

/***/ }),

/***/ "./src/shared/containers/Wallet/PanelRight.js":
/*!****************************************************!*\
  !*** ./src/shared/containers/Wallet/PanelRight.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\twidth: 100%;\\n\\tpadding: 50px 25px 50px 25px;\\n\\tdisplay: flex;\\n\\tjustify-content: flex-end;\\n\\talign-items: center;\\n\\tbox-shadow: 0 3px 5px rgba(0,0,0,.2);\\n'], ['\\n\\twidth: 100%;\\n\\tpadding: 50px 25px 50px 25px;\\n\\tdisplay: flex;\\n\\tjustify-content: flex-end;\\n\\talign-items: center;\\n\\tbox-shadow: 0 3px 5px rgba(0,0,0,.2);\\n']),\n    _templateObject2 = _taggedTemplateLiteral(['\\n\\t\\n'], ['\\n\\t\\n']),\n    _templateObject3 = _taggedTemplateLiteral(['\\n\\t', '\\n\\tfont-size: 5rem;\\n\\tcolor: white;\\n'], ['\\n\\t', '\\n\\tfont-size: 5rem;\\n\\tcolor: white;\\n']),\n    _templateObject4 = _taggedTemplateLiteral(['\\n\\t', '\\n\\tfont-size: 2.7rem;\\n\\tcolor: white;\\n\\tdisplay: inline-block;\\n\\tline-height: 50px;\\n'], ['\\n\\t', '\\n\\tfont-size: 2.7rem;\\n\\tcolor: white;\\n\\tdisplay: inline-block;\\n\\tline-height: 50px;\\n']),\n    _templateObject5 = _taggedTemplateLiteral(['\\n\\t', '\\n\\tfont-size: 2.7rem;\\n\\tcolor: white;\\n\\tdisplay: inline-block;\\n\\tline-height: 50px;\\n\\tmargin: 0 0 0 20px;\\n\\tpadding: 0 0 0 20px;\\n\\tborder-left: 2px solid ', ';\\n'], ['\\n\\t', '\\n\\tfont-size: 2.7rem;\\n\\tcolor: white;\\n\\tdisplay: inline-block;\\n\\tline-height: 50px;\\n\\tmargin: 0 0 0 20px;\\n\\tpadding: 0 0 0 20px;\\n\\tborder-left: 2px solid ', ';\\n']),\n    _templateObject6 = _taggedTemplateLiteral(['\\n\\tdisplay: flex;\\n\\tflex-flow: wrap;\\n'], ['\\n\\tdisplay: flex;\\n\\tflex-flow: wrap;\\n']),\n    _templateObject7 = _taggedTemplateLiteral(['\\n\\t', '\\n\\twidth: 125px;\\n\\t// height: 125px;\\n\\tpadding: 53px 0 53px 0;\\n\\ttext-align: center;\\n\\tmargin: 0 0 0 25px;\\n\\tbackground: ', ';\\n\\tcursor: pointer;\\n\\tcolor: white;\\n\\tborder-radius: 20px;\\n'], ['\\n\\t', '\\n\\twidth: 125px;\\n\\t// height: 125px;\\n\\tpadding: 53px 0 53px 0;\\n\\ttext-align: center;\\n\\tmargin: 0 0 0 25px;\\n\\tbackground: ', ';\\n\\tcursor: pointer;\\n\\tcolor: white;\\n\\tborder-radius: 20px;\\n']),\n    _templateObject8 = _taggedTemplateLiteral(['\\n\\t', '\\n\\twidth: 125px;\\n\\t// height: 125px;\\n\\tpadding: 53px 0 53px 0;\\n\\tmargin: 0 0 0 25px;\\n\\ttext-align: center;\\n\\tbackground: ', ';\\n\\tcursor: pointer;\\n\\tcolor: white;\\n\\tborder-radius: 20px;\\n'], ['\\n\\t', '\\n\\twidth: 125px;\\n\\t// height: 125px;\\n\\tpadding: 53px 0 53px 0;\\n\\tmargin: 0 0 0 25px;\\n\\ttext-align: center;\\n\\tbackground: ', ';\\n\\tcursor: pointer;\\n\\tcolor: white;\\n\\tborder-radius: 20px;\\n']),\n    _templateObject9 = _taggedTemplateLiteral(['\\n\\twidth: 100%;\\n\\tdisplay: flex;\\n\\tjustify-content: center;\\n\\talign-items: center;\\n\\tbackground: ', ';\\n\\tpadding: 25px 0 25px 0;\\n'], ['\\n\\twidth: 100%;\\n\\tdisplay: flex;\\n\\tjustify-content: center;\\n\\talign-items: center;\\n\\tbackground: ', ';\\n\\tpadding: 25px 0 25px 0;\\n']),\n    _templateObject10 = _taggedTemplateLiteral(['\\n\\t', '\\n\\twidth: 100%;\\n\\tfont-size: 2.5rem;\\n\\tcolor: white;\\n'], ['\\n\\t', '\\n\\twidth: 100%;\\n\\tfont-size: 2.5rem;\\n\\tcolor: white;\\n']),\n    _templateObject11 = _taggedTemplateLiteral(['\\n\\twidth: 33.333%;\\n\\tpadding: 0 0 0 50px;\\n'], ['\\n\\twidth: 33.333%;\\n\\tpadding: 0 0 0 50px;\\n']),\n    _templateObject12 = _taggedTemplateLiteral(['\\n\\twidth: 33.333%;\\n'], ['\\n\\twidth: 33.333%;\\n']),\n    _templateObject13 = _taggedTemplateLiteral(['\\n\\twidth: 33.333%;\\n\\tdisplay: flex;\\n\\tjustify-content: center;\\n\\talign-items: center;\\n'], ['\\n\\twidth: 33.333%;\\n\\tdisplay: flex;\\n\\tjustify-content: center;\\n\\talign-items: center;\\n']),\n    _templateObject14 = _taggedTemplateLiteral(['\\n\\t', '\\n\\tfont-size: 3rem;\\n\\tletter-space: 0.85px;\\n\\tcolor: white;\\n\\twidth: auto;\\n\\theight: 75%;\\n\\tbackground: ', ';\\n\\tborder-radius: 10px;\\n\\ttext-align: center;\\n\\tpadding: 17px 20px 17px 20px;\\n'], ['\\n\\t', '\\n\\tfont-size: 3rem;\\n\\tletter-space: 0.85px;\\n\\tcolor: white;\\n\\twidth: auto;\\n\\theight: 75%;\\n\\tbackground: ', ';\\n\\tborder-radius: 10px;\\n\\ttext-align: center;\\n\\tpadding: 17px 20px 17px 20px;\\n']),\n    _templateObject15 = _taggedTemplateLiteral(['\\n\\twidth: 100%;\\n\\theight: 100%;\\n\\tpadding: 50px 0 0 0;\\n\\toverflow-x: auto;\\n'], ['\\n\\twidth: 100%;\\n\\theight: 100%;\\n\\tpadding: 50px 0 0 0;\\n\\toverflow-x: auto;\\n']),\n    _templateObject16 = _taggedTemplateLiteral(['\\n\\twidth: 100%;\\n\\tborder-bottom: 1px solid black;\\n\\tposition: relative;\\n'], ['\\n\\twidth: 100%;\\n\\tborder-bottom: 1px solid black;\\n\\tposition: relative;\\n']),\n    _templateObject17 = _taggedTemplateLiteral(['\\n\\twidth: 100%;\\n\\tdisplay: flex;\\n\\tpadding: 10px 0 10px 0;\\n'], ['\\n\\twidth: 100%;\\n\\tdisplay: flex;\\n\\tpadding: 10px 0 10px 0;\\n']),\n    _templateObject18 = _taggedTemplateLiteral(['\\n\\tpadding: 0 50px 0 50px;\\n'], ['\\n\\tpadding: 0 50px 0 50px;\\n']),\n    _templateObject19 = _taggedTemplateLiteral(['\\n\\twidth: 20px;\\n\\theight: 20px;\\n\\tbackground: ', ';\\n\\tdisplay: block;\\n\\tmargin: 0 auto;\\n'], ['\\n\\twidth: 20px;\\n\\theight: 20px;\\n\\tbackground: ', ';\\n\\tdisplay: block;\\n\\tmargin: 0 auto;\\n']),\n    _templateObject20 = _taggedTemplateLiteral(['\\n\\t', '\\n\\tcolor: white;\\n\\ttext-align: center;\\n\\tfont-size: 1.5rem;\\n'], ['\\n\\t', '\\n\\tcolor: white;\\n\\ttext-align: center;\\n\\tfont-size: 1.5rem;\\n']),\n    _templateObject21 = _taggedTemplateLiteral(['\\n\\t', '\\n\\tcolor: white;\\n\\tdisplay: flex;\\n\\talign-items: center;\\n'], ['\\n\\t', '\\n\\tcolor: white;\\n\\tdisplay: flex;\\n\\talign-items: center;\\n']),\n    _templateObject22 = _taggedTemplateLiteral(['\\n\\t', '\\n\\tcolor: white;\\n\\tmargin-left: auto;\\n\\tdisplay: flex;\\n\\talign-items: center;\\n\\tflex-flow: nowrap;\\n\\tpadding: 0 20px 0 0;\\n'], ['\\n\\t', '\\n\\tcolor: white;\\n\\tmargin-left: auto;\\n\\tdisplay: flex;\\n\\talign-items: center;\\n\\tflex-flow: nowrap;\\n\\tpadding: 0 20px 0 0;\\n']),\n    _templateObject23 = _taggedTemplateLiteral(['\\n\\t', '\\n\\tcolor: white;\\n\\tpadding: 0 20px 0 0;\\n'], ['\\n\\t', '\\n\\tcolor: white;\\n\\tpadding: 0 20px 0 0;\\n']),\n    _templateObject24 = _taggedTemplateLiteral(['\\n\\t', '\\n\\tcolor: white;\\n'], ['\\n\\t', '\\n\\tcolor: white;\\n']),\n    _templateObject25 = _taggedTemplateLiteral(['\\n\\tposition: absolute;\\n\\ttop: 100%;\\n\\tleft: 0px;\\n\\twidth: 100%;\\n\\tdisplay: flex;\\n\\tflex-flow: nowrap;\\n\\tpadding: 0 20px 0 20px;\\n\\tbackground: dodgerblue;\\n\\n\\ttransform: scaleY(0);\\n\\n\\ttransition: transform 0.3s;\\n'], ['\\n\\tposition: absolute;\\n\\ttop: 100%;\\n\\tleft: 0px;\\n\\twidth: 100%;\\n\\tdisplay: flex;\\n\\tflex-flow: nowrap;\\n\\tpadding: 0 20px 0 20px;\\n\\tbackground: dodgerblue;\\n\\n\\ttransform: scaleY(0);\\n\\n\\ttransition: transform 0.3s;\\n']),\n    _templateObject26 = _taggedTemplateLiteral(['\\n\\twidth: 50%;\\n\\tmin-width: 320px;\\n'], ['\\n\\twidth: 50%;\\n\\tmin-width: 320px;\\n']),\n    _templateObject27 = _taggedTemplateLiteral(['\\n\\t', '\\n\\twidth: 100%;\\n\\tpadding: 0 0 5px 0;\\n'], ['\\n\\t', '\\n\\twidth: 100%;\\n\\tpadding: 0 0 5px 0;\\n']),\n    _templateObject28 = _taggedTemplateLiteral(['\\n\\t', '\\n\\tfont-weight: bold;\\n\\tdisplay: inline-block;\\n'], ['\\n\\t', '\\n\\tfont-weight: bold;\\n\\tdisplay: inline-block;\\n']),\n    _templateObject29 = _taggedTemplateLiteral(['\\n\\tposition: relative;\\n\\tbackground: ', ';\\n\\twidth: 100%;\\n\\theight: 100%;\\n'], ['\\n\\tposition: relative;\\n\\tbackground: ', ';\\n\\twidth: 100%;\\n\\theight: 100%;\\n']);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _TextBase = __webpack_require__(/*! Components/TextBase */ \"./src/shared/components/TextBase.js\");\n\nvar _Text = __webpack_require__(/*! Components/Text */ \"./src/shared/components/Text.js\");\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _H = __webpack_require__(/*! Components/H1 */ \"./src/shared/components/H1.js\");\n\nvar _Wallet = __webpack_require__(/*! Classes/Wallet */ \"./src/shared/classes/Wallet.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\n//COIN CONTROLS\n\nvar CoinControl = _styledComponents2.default.div(_templateObject);\nvar WrapAmount = _styledComponents2.default.div(_templateObject2);\nvar Amount = _styledComponents2.default.div(_templateObject3, _TextBase.TextBase);\nvar Usd = _styledComponents2.default.div(_templateObject4, _TextBase.TextBase);\nvar Brl = _styledComponents2.default.div(_templateObject5, _TextBase.TextBase, _styleVariables2.default.normalGreen);\n\nvar WrapButtons = _styledComponents2.default.div(_templateObject6);\nvar SendCoin = _styledComponents2.default.div(_templateObject7, _TextBase.TextBase, _styleVariables2.default.normalRed);\nvar ReceiveCoin = _styledComponents2.default.div(_templateObject8, _TextBase.TextBase, _styleVariables2.default.normalGreen);\nvar CoinStatus = _styledComponents2.default.div(_templateObject9, _styleVariables2.default.normalLilac3);\nvar CoinDetailsName = _styledComponents2.default.div(_templateObject10, _TextBase.TextBase);\nvar CoinDetailsPrice = _styledComponents2.default.div(_templateObject10, _TextBase.TextBase);\nvar CoinDetails = _styledComponents2.default.div(_templateObject11);\nvar CoinGraph = _styledComponents2.default.div(_templateObject12);\nvar WrapCoinPercent = _styledComponents2.default.div(_templateObject13);\nvar CoinPercent = _styledComponents2.default.div(_templateObject14, _TextBase.TextBase, _styleVariables2.default.normalGreen);\nvar Histories = _styledComponents2.default.div(_templateObject15);\nvar History = _styledComponents2.default.div(_templateObject16);\nvar HistoryHead = _styledComponents2.default.div(_templateObject17);\nvar HistoryHeadStatus = _styledComponents2.default.div(_templateObject18);\nvar HeadStatusIcon = _styledComponents2.default.div(_templateObject19, _styleVariables2.default.normalRed);\nvar HeadStatusDate = _styledComponents2.default.div(_templateObject20, _TextBase.TextBase);\nvar HistoryHeadText = _styledComponents2.default.div(_templateObject21, _TextBase.TextBase);\nvar HistoryHeadAmount = _styledComponents2.default.div(_templateObject22, _TextBase.TextBase);\nvar HeadAmountCoin = _styledComponents2.default.div(_templateObject23, _TextBase.TextBase);\nvar HeadAmountMoney = _styledComponents2.default.div(_templateObject24, _TextBase.TextBase);\nvar HistoryContent = _styledComponents2.default.div(_templateObject25);\nvar HistoryContentCol = _styledComponents2.default.div(_templateObject26);\nvar HistoryContentItem = _styledComponents2.default.div(_templateObject27, _TextBase.TextBase);\nvar TextBold = _Text.Text.extend(_templateObject28, _TextBase.TextBase);\nvar StyledPanelRight = _styledComponents2.default.div(_templateObject29, _styleVariables2.default.normalLilac);\n\nvar PanelRight = function (_React$Component) {\n\t_inherits(PanelRight, _React$Component);\n\n\tfunction PanelRight(props) {\n\t\tvar _this2 = this;\n\n\t\t_classCallCheck(this, PanelRight);\n\n\t\t// this.props = {\n\t\t// \tcoinPrice: undefined,\n\t\t// \tcoinName: undefined\n\t\t// }\n\t\tvar _this = _possibleConstructorReturn(this, (PanelRight.__proto__ || Object.getPrototypeOf(PanelRight)).call(this, props));\n\n\t\t_this.handleToggleHistory = function (event) {\n\t\t\tvar historyEl = event.currentTarget.parentElement,\n\t\t\t    historyContentEl = historyEl.querySelector(':nth-child(2)');\n\t\t\ttoggleScaleY({\n\t\t\t\telement: historyContentEl,\n\t\t\t\tvisible: '1',\n\t\t\t\thidden: '0'\n\t\t\t});\n\t\t};\n\n\t\t_this.componentDidMount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n\t\t\tvar wallet, result;\n\t\t\treturn regeneratorRuntime.wrap(function _callee$(_context) {\n\t\t\t\twhile (1) {\n\t\t\t\t\tswitch (_context.prev = _context.next) {\n\t\t\t\t\t\tcase 0:\n\t\t\t\t\t\t\twallet = new _Wallet.WalletClass();\n\t\t\t\t\t\t\t_context.next = 3;\n\t\t\t\t\t\t\treturn wallet.getHistory({ address: undefined, accessToken: undefined });\n\n\t\t\t\t\t\tcase 3:\n\t\t\t\t\t\t\tresult = _context.sent;\n\n\t\t\t\t\t\t\tconsole.log(result, \"WALLET_PANELRIGHT_HISTORY\");\n\n\t\t\t\t\t\tcase 5:\n\t\t\t\t\t\tcase 'end':\n\t\t\t\t\t\t\treturn _context.stop();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}, _callee, _this2);\n\t\t}));\n\t\treturn _this;\n\t}\n\n\t_createClass(PanelRight, [{\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\tvar coinPrice = void 0;\n\t\t\tvar coinName = void 0;\n\t\t\tvar status = void 0;\n\t\t\tif (this.props && this.props.wallet && this.props.wallet.panelRight) {\n\t\t\t\tcoinPrice = this.props.wallet.panelRight.coinPrice;\n\t\t\t\tcoinName = this.props.wallet.panelRight.coinName;\n\t\t\t\tstatus = this.props.wallet.panelRight.status;\n\t\t\t} else {\n\t\t\t\treturn _react2.default.createElement(\n\t\t\t\t\t_H.H1,\n\t\t\t\t\tnull,\n\t\t\t\t\t'THIS STATE NULLO ?'\n\t\t\t\t);\n\t\t\t}\n\t\t\tif (!coinPrice || !coinName || status !== 'open') {\n\t\t\t\treturn _react2.default.createElement(\n\t\t\t\t\t_H.H1,\n\t\t\t\t\tnull,\n\t\t\t\t\t'PROBLEMA NO SEGUNDO IF'\n\t\t\t\t);\n\t\t\t}\n\t\t\treturn _react2.default.createElement(\n\t\t\t\tStyledPanelRight,\n\t\t\t\tnull,\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\tCoinStatus,\n\t\t\t\t\tnull,\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\tCoinDetails,\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\tCoinDetailsName,\n\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t'Bitcoin'\n\t\t\t\t\t\t),\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\tCoinDetailsPrice,\n\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t'1 ' + coinName.toUpperCase() + ' ' + coinPrice.BRL\n\t\t\t\t\t\t)\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\tCoinGraph,\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\t_react2.default.createElement('img', { src: '/img/fake-coin-graph.png' })\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\tWrapCoinPercent,\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\tCoinPercent,\n\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t'-350%'\n\t\t\t\t\t\t)\n\t\t\t\t\t)\n\t\t\t\t),\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\tCoinControl,\n\t\t\t\t\tnull,\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\tWrapAmount,\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\tAmount,\n\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t'0.00000001'\n\t\t\t\t\t\t),\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\tUsd,\n\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t'USD 2.00'\n\t\t\t\t\t\t),\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\tBrl,\n\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t'BRL 6,30'\n\t\t\t\t\t\t)\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\tWrapButtons,\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\tSendCoin,\n\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t'Enviar'\n\t\t\t\t\t\t),\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\tReceiveCoin,\n\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t'Receber'\n\t\t\t\t\t\t)\n\t\t\t\t\t)\n\t\t\t\t),\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\tHistories,\n\t\t\t\t\tnull,\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\tHistory,\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\tHistoryHead,\n\t\t\t\t\t\t\t{ onClick: this.handleToggleHistory },\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\tHistoryHeadStatus,\n\t\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t\t_react2.default.createElement(HeadStatusIcon, null),\n\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\tHeadStatusDate,\n\t\t\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t\t\t'25/05/2018'\n\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\tHistoryHeadText,\n\t\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t\t'Enviado 2 horas atr\\xE1s'\n\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\tHistoryHeadAmount,\n\t\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\tHeadAmountCoin,\n\t\t\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t\t\t'-0.00000002'\n\t\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\tHeadAmountMoney,\n\t\t\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t\t\t'(R$ 1,00)'\n\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t),\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\tHistoryContent,\n\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\tHistoryContentCol,\n\t\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\tHistoryContentItem,\n\t\t\t\t\t\t\t\t\t{ clWhite: true },\n\t\t\t\t\t\t\t\t\t'Enviado: ',\n\t\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\t\tTextBold,\n\t\t\t\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t\t\t\t'0.00000002 BTC ($ 2.00)'\n\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\tHistoryContentItem,\n\t\t\t\t\t\t\t\t\t{ clWhite: true },\n\t\t\t\t\t\t\t\t\t'Data: Segunda-feira, ',\n\t\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\t\tTextBold,\n\t\t\t\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t\t\t\t'25/04/2018'\n\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\tHistoryContentCol,\n\t\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\tHistoryContentItem,\n\t\t\t\t\t\t\t\t\t{ clWhite: true },\n\t\t\t\t\t\t\t\t\t'Transaction ID: ',\n\t\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\t\tTextBold,\n\t\t\t\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t\t\t\t'a123ae456d54f564c654b4a564e'\n\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t)\n\t\t\t\t\t)\n\t\t\t\t)\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn PanelRight;\n}(_react2.default.Component);\n\nvar mapStateToProps = function mapStateToProps(state) {\n\treturn {\n\t\twallet: state.wallet\n\t};\n};\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n\treturn {};\n};\nexports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PanelRight);\n;\n\n//# sourceURL=webpack:///./src/shared/containers/Wallet/PanelRight.js?");

/***/ }),

/***/ "./src/shared/containers/Wallet/index.js":
/*!***********************************************!*\
  !*** ./src/shared/containers/Wallet/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\twidth: 100%;\\n\\theight: 100%;\\n\\tdisplay: flex;\\n'], ['\\n\\twidth: 100%;\\n\\theight: 100%;\\n\\tdisplay: flex;\\n']),\n    _templateObject2 = _taggedTemplateLiteral(['\\n\\tbackground: ', ';\\n\\tmax-width: 90%;\\n\\theight: 100%;\\n\\tbox-shadow: 30px 0 40px rgba(0,0,0,.2);\\n\\tz-index: 2;\\n\\tposition: relative;\\n\\twidth: 31.66666%;\\n\\n\\ttransform-origin: left;\\n\\ttransform: scaleX(1);\\n\\topacity: 1;\\n\\n\\t// transition: transform 0.3s, opacity 0.5s;\\n\\ttransition: width .3s, max-width .5s;\\n'], ['\\n\\tbackground: ', ';\\n\\tmax-width: 90%;\\n\\theight: 100%;\\n\\tbox-shadow: 30px 0 40px rgba(0,0,0,.2);\\n\\tz-index: 2;\\n\\tposition: relative;\\n\\twidth: 31.66666%;\\n\\n\\ttransform-origin: left;\\n\\ttransform: scaleX(1);\\n\\topacity: 1;\\n\\n\\t// transition: transform 0.3s, opacity 0.5s;\\n\\ttransition: width .3s, max-width .5s;\\n']),\n    _templateObject3 = _taggedTemplateLiteral(['\\n\\tposition: absolute;\\n\\tright: -25px;\\n\\tbottom: 50%;\\n\\twidth: 25px;\\n\\theight: 25px;\\n\\tbackground: white;\\n\\tcursor: pointer;\\n\\tvisibility: visible!important;\\n'], ['\\n\\tposition: absolute;\\n\\tright: -25px;\\n\\tbottom: 50%;\\n\\twidth: 25px;\\n\\theight: 25px;\\n\\tbackground: white;\\n\\tcursor: pointer;\\n\\tvisibility: visible!important;\\n']);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(/*! react-dom */ \"react-dom\");\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _satoshiBitcoin = __webpack_require__(/*! satoshi-bitcoin */ \"satoshi-bitcoin\");\n\nvar _satoshiBitcoin2 = _interopRequireDefault(_satoshiBitcoin);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _lunesLib = __webpack_require__(/*! lunes-lib */ \"lunes-lib\");\n\nvar _Cookie = __webpack_require__(/*! Classes/Cookie */ \"./src/shared/classes/Cookie.js\");\n\nvar _Cookie2 = _interopRequireDefault(_Cookie);\n\nvar _ui = __webpack_require__(/*! Utils/ui */ \"./src/shared/utils/ui.js\");\n\nvar _Wallet = __webpack_require__(/*! Classes/Wallet */ \"./src/shared/classes/Wallet.js\");\n\nvar _User = __webpack_require__(/*! Classes/User */ \"./src/shared/classes/User.js\");\n\nvar _User2 = _interopRequireDefault(_User);\n\nvar _TextBase = __webpack_require__(/*! Components/TextBase */ \"./src/shared/components/TextBase.js\");\n\nvar _Text = __webpack_require__(/*! Components/Text */ \"./src/shared/components/Text.js\");\n\nvar _Loading = __webpack_require__(/*! Components/Loading */ \"./src/shared/components/Loading.js\");\n\nvar _PanelRight = __webpack_require__(/*! ./PanelRight */ \"./src/shared/containers/Wallet/PanelRight.js\");\n\nvar _PanelRight2 = _interopRequireDefault(_PanelRight);\n\nvar _Coins = __webpack_require__(/*! ./Coins */ \"./src/shared/containers/Wallet/Coins.js\");\n\nvar _Coins2 = _interopRequireDefault(_Coins);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\n//COMPONENTS\n\n\n//______INDEX\nvar Panels = _styledComponents2.default.div(_templateObject);\nvar PanelLeft = _styledComponents2.default.div.attrs({\n\tstate: 'visible'\n})(_templateObject2, _styleVariables2.default.normalLilac);\nvar TogglePanelLeft = _styledComponents2.default.div(_templateObject3);\n\nvar Wallet = function (_React$Component) {\n\t_inherits(Wallet, _React$Component);\n\n\tfunction Wallet(props) {\n\t\tvar _this2 = this;\n\n\t\t_classCallCheck(this, Wallet);\n\n\t\tvar _this = _possibleConstructorReturn(this, (Wallet.__proto__ || Object.getPrototypeOf(Wallet)).call(this, props));\n\n\t\t_this.setBalance = function () {};\n\n\t\t_this.componentDidMount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n\t\t\tvar cookies, user, wallet, balance, coinsPrice;\n\t\t\treturn regeneratorRuntime.wrap(function _callee$(_context) {\n\t\t\t\twhile (1) {\n\t\t\t\t\tswitch (_context.prev = _context.next) {\n\t\t\t\t\t\tcase 0:\n\t\t\t\t\t\t\tcookies = new _Cookie2.default();\n\t\t\t\t\t\t\tuser = cookies.getCookie('user').user;\n\t\t\t\t\t\t\t// let userObj = new UserClass;\n\t\t\t\t\t\t\t// let user    = await userObj.login({email: '', password: ''});\n\n\t\t\t\t\t\t\tif (user) {\n\t\t\t\t\t\t\t\t_context.next = 4;\n\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\treturn _context.abrupt('return');\n\n\t\t\t\t\t\tcase 4:\n\t\t\t\t\t\t\twallet = new _Wallet.WalletClass();\n\t\t\t\t\t\t\tbalance = void 0;\n\t\t\t\t\t\t\t_context.prev = 6;\n\t\t\t\t\t\t\t_context.next = 9;\n\t\t\t\t\t\t\treturn wallet.getBalance(user);\n\n\t\t\t\t\t\tcase 9:\n\t\t\t\t\t\t\tbalance = _context.sent;\n\t\t\t\t\t\t\t_context.next = 16;\n\t\t\t\t\t\t\tbreak;\n\n\t\t\t\t\t\tcase 12:\n\t\t\t\t\t\t\t_context.prev = 12;\n\t\t\t\t\t\t\t_context.t0 = _context['catch'](6);\n\n\t\t\t\t\t\t\tconsole.log(_context.t0);\n\t\t\t\t\t\t\treturn _context.abrupt('return');\n\n\t\t\t\t\t\tcase 16:\n\t\t\t\t\t\t\tcoinsPrice = wallet.coinsPrice;\n\n\n\t\t\t\t\t\t\t_this.props.setBalance({ balance: balance, coinsPrice: coinsPrice });\n\n\t\t\t\t\t\tcase 18:\n\t\t\t\t\t\tcase 'end':\n\t\t\t\t\t\t\treturn _context.stop();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}, _callee, _this2, [[6, 12]]);\n\t\t}));\n\n\t\t_this.handleTogglePanelLeft = function (event) {\n\t\t\tvar panelLeftEl = event.currentTarget.parentElement;\n\t\t\t(0, _ui.toggleWidth)({\n\t\t\t\telement: panelLeftEl,\n\t\t\t\tvisible: '31.6666%',\n\t\t\t\thidden: '0px'\n\t\t\t});\n\t\t};\n\n\t\t_this.state = {\n\t\t\tbalance: undefined,\n\t\t\tmyCoins: undefined,\n\t\t\tcoinsPrice: undefined\n\t\t};\n\t\treturn _this;\n\t}\n\n\t_createClass(Wallet, [{\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\tvar _props$wallet$panelLe = this.props.wallet.panelLeft,\n\t\t\t    coinsPrice = _props$wallet$panelLe.coinsPrice,\n\t\t\t    balance = _props$wallet$panelLe.balance,\n\t\t\t    status = _props$wallet$panelLe.status;\n\n\t\t\treturn _react2.default.createElement(\n\t\t\t\tPanels,\n\t\t\t\tnull,\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\tPanelLeft,\n\t\t\t\t\tnull,\n\t\t\t\t\t_react2.default.createElement(TogglePanelLeft, { onClick: this.handleTogglePanelLeft }),\n\t\t\t\t\t_react2.default.createElement(_Coins2.default, { balance: balance, coinsPrice: coinsPrice })\n\t\t\t\t),\n\t\t\t\t_react2.default.createElement(_PanelRight2.default, null)\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn Wallet;\n}(_react2.default.Component);\n\nvar mapStateToProps = function mapStateToProps(state) {\n\treturn {\n\t\twallet: state.wallet\n\t};\n};\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n\treturn {\n\t\tsetBalance: function setBalance(_ref2) {\n\t\t\tvar balance = _ref2.balance,\n\t\t\t    coinsPrice = _ref2.coinsPrice;\n\n\t\t\tdispatch({\n\t\t\t\ttype: 'WALLET_SET_BALANCE',\n\t\t\t\tpayload: { balance: balance, coinsPrice: coinsPrice }\n\t\t\t});\n\t\t},\n\t\ttogglePanelLeft: function togglePanelLeft(_ref3) {\n\t\t\tvar status = _ref3.status;\n\n\t\t\tdispatch({\n\t\t\t\ttype: 'WALLET_TOGGLE_PANEL_LEFT',\n\t\t\t\tpayload: status\n\t\t\t});\n\t\t}\n\t};\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Wallet);\n\n//# sourceURL=webpack:///./src/shared/containers/Wallet/index.js?");

/***/ }),

/***/ "./src/shared/reducers/userReducer.js":
/*!********************************************!*\
  !*** ./src/shared/reducers/userReducer.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nvar initialState = {\n\tstatus: 'initial',\n\tlogged: false\n};\nvar userReducer = function userReducer() {\n\tvar state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n\tvar action = arguments[1];\n\n\tif (action.type === 'USER_LOGIN_PENDING') {\n\t\treturn {\n\t\t\tstatus: 'pending',\n\t\t\tlogged: false\n\t\t};\n\t} else if (action.type === 'USER_LOGIN_FULFILLED') {\n\t\t// EX: action.payload {\n\t\t// \tdata: {_id:'id',accessToken:'accTok', ...}\n\t\t// }\n\t\treturn {\n\t\t\tstatus: 'fulfilled',\n\t\t\tdata: action.payload,\n\t\t\tlogged: true\n\t\t};\n\t} else if (action.type === 'USER_LOGIN_REJECTED') {\n\t\treturn {\n\t\t\tstatus: 'rejected',\n\t\t\terror: action.payload,\n\t\t\tlogged: false\n\t\t};\n\t} else if (action.type === 'USER_CREATE_PENDING') {\n\t\treturn {\n\t\t\tstatus: 'pending',\n\t\t\tlogged: false\n\t\t};\n\t} else if (action.type === 'USER_CREATE_FULFILLED') {\n\t\treturn {\n\t\t\tstatus: 'fulfilled',\n\t\t\tdata: action.payload,\n\t\t\tlogged: true\n\t\t};\n\t} else if (action.type === 'USER_CREATE_REJECTED') {\n\t\treturn {\n\t\t\tstatus: 'rejected',\n\t\t\tlogged: false\n\t\t};\n\t} else if (action.type === 'USER_RESET_PENDING') {\n\t\treturn {\n\t\t\tstatus: 'pending'\n\t\t};\n\t} else if (action.type === 'USER_RESET_FULFILLED') {\n\t\treturn {\n\t\t\tstatus: 'fulfilled',\n\t\t\tresult: action.payload\n\t\t};\n\t} else if (action.type === 'USER_RESET_REJECTED') {\n\t\treturn {\n\t\t\tstatus: 'rejected'\n\t\t};\n\t}\n\treturn state;\n};\n\nexports.default = userReducer;\n\n//# sourceURL=webpack:///./src/shared/reducers/userReducer.js?");

/***/ }),

/***/ "./src/shared/reducers/walletReducer.js":
/*!**********************************************!*\
  !*** ./src/shared/reducers/walletReducer.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar initialState = {\n\tpanelRight: {\n\t\tstatus: 'closed'\n\t},\n\tpanelLeft: {\n\t\tstatus: 'open'\n\t}\n};\n\nvar walletReducer = function walletReducer() {\n\tvar state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n\tvar action = arguments[1];\n\n\tif (action.type === 'WALLET_OPEN_PANELRIGHT') {\n\t\t//action.payload: { \n\t\t// \tcoinPrice: \n\t\t// \t\t{\n\t\t// \t\t\tUSD: 1, \n\t\t// \t\t\tBRL: 2\n\t\t// \t\t}, \n\t\t// \tcoinName: String() \n\t\t//}\n\t\treturn _extends({}, state, {\n\t\t\tpanelRight: _extends({}, state.panelRight, action.payload, {\n\t\t\t\tstatus: 'open'\n\t\t\t})\n\t\t});\n\t} else if (action.type === 'WALLET_SET_BALANCE') {\n\t\t// EX: action.payload: { \n\t\t// \tbalance, \n\t\t// \tcoinsPrice \n\t\t// }\n\t\treturn _extends({}, state, {\n\t\t\tpanelLeft: _extends({}, state.panelLeft, action.payload)\n\t\t});\n\t} else if (action.type === 'WALLET_TOGGLE_PANEL_LEFT') {\n\t\t// EX: action.payload = 'closed' || 'open'\n\t\tvar status = state.panelLeft.status === 'open' ? 'closed' : 'open';\n\t\treturn _extends({}, state, {\n\t\t\tpanelLeft: _extends({}, state.panelLeft, {\n\t\t\t\tstatus: status\n\t\t\t})\n\t\t});\n\t}\n\treturn state;\n};\n\nexports.default = walletReducer;\n\n//# sourceURL=webpack:///./src/shared/reducers/walletReducer.js?");

/***/ }),

/***/ "./src/shared/stores/store.js":
/*!************************************!*\
  !*** ./src/shared/stores/store.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.store = undefined;\n\nvar _userReducer = __webpack_require__(/*! Reducers/userReducer */ \"./src/shared/reducers/userReducer.js\");\n\nvar _userReducer2 = _interopRequireDefault(_userReducer);\n\nvar _walletReducer = __webpack_require__(/*! Reducers/walletReducer */ \"./src/shared/reducers/walletReducer.js\");\n\nvar _walletReducer2 = _interopRequireDefault(_walletReducer);\n\nvar _redux = __webpack_require__(/*! redux */ \"redux\");\n\nvar _reduxLogger = __webpack_require__(/*! redux-logger */ \"redux-logger\");\n\nvar _reduxPromiseMiddleware = __webpack_require__(/*! redux-promise-middleware */ \"redux-promise-middleware\");\n\nvar _reduxPromiseMiddleware2 = _interopRequireDefault(_reduxPromiseMiddleware);\n\nvar _reduxThunk = __webpack_require__(/*! redux-thunk */ \"redux-thunk\");\n\nvar _reduxThunk2 = _interopRequireDefault(_reduxThunk);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar store = (0, _redux.createStore)((0, _redux.combineReducers)({\n\tuser: _userReducer2.default,\n\twallet: _walletReducer2.default\n}), {}, (0, _redux.applyMiddleware)((0, _reduxLogger.createLogger)(), _reduxThunk2.default, (0, _reduxPromiseMiddleware2.default)()));\n\nexports.store = store;\n\n//# sourceURL=webpack:///./src/shared/stores/store.js?");

/***/ }),

/***/ "./src/shared/style-variables.js":
/*!***************************************!*\
  !*** ./src/shared/style-variables.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n\tdarkLilac: '#3B1878',\n\tnormalLilac: '#4B2C82',\n\tnormalLilac2: '#3F1C7B',\n\tnormalLilac3: '#432678',\n\tlightLilac: '#725C98',\n\tnormalGreen: '#4CD566',\n\tnormalRed: '#FF1C38',\n\tmarginTopSmall: '10px',\n\tmarginTopNormal: '15px',\n\tmarginTopRegular: '20px',\n\tmarginTopBig: '30px',\n\tmarginTopHuge: '50px'\n};\n\n//# sourceURL=webpack:///./src/shared/style-variables.js?");

/***/ }),

/***/ "./src/shared/utils/functions.js":
/*!***************************************!*\
  !*** ./src/shared/utils/functions.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nvar errorPattern = function errorPattern(message, code, text, log) {\n\treturn { message: message, code: code, text: text, log: log };\n};\n\nexports.errorPattern = errorPattern;\n\n//# sourceURL=webpack:///./src/shared/utils/functions.js?");

/***/ }),

/***/ "./src/shared/utils/ui.js":
/*!********************************!*\
  !*** ./src/shared/utils/ui.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nvar toggleTranslateX = exports.toggleTranslateX = function toggleTranslateX(_ref) {\n\tvar element = _ref.element,\n\t    from = _ref.from,\n\t    to = _ref.to;\n\n\tvar state = element.getAttribute('state');\n\tif (state === 'visible') {\n\t\telement.style.transform = 'translateX(-100%)';\n\t\telement.style.maxWidth = '0px';\n\t\telement.setAttribute('state', 'hidden');\n\t\tvisibilityAllChildren({ element: element, value: 'hidden' });\n\t} else {\n\t\telement.style.transform = 'translateX(0px)';\n\t\telement.style.maxWidth = '1000px';\n\t\telement.setAttribute('state', 'visible');\n\t\tvisibilityAllChildren({ element: element, value: 'visible' });\n\t}\n};\nvar toggleWidth = exports.toggleWidth = function toggleWidth(_ref2) {\n\tvar element = _ref2.element,\n\t    visible = _ref2.visible,\n\t    hidden = _ref2.hidden;\n\n\tvar state = element.getAttribute('state');\n\tif (state === 'visible') {\n\t\telement.style.width = hidden;\n\t\telement.style.maxWidth = '0px';\n\t\telement.setAttribute('state', 'hidden');\n\t\tvisibilityAllChildren({ element: element, value: 'hidden' });\n\t} else {\n\t\telement.style.width = visible;\n\t\telement.style.maxWidth = '500px';\n\t\telement.setAttribute('state', 'visible');\n\t\tsetTimeout(function () {\n\t\t\tvisibilityAllChildren({ element: element, value: 'visible' });\n\t\t}, 300);\n\t}\n};\nvar toggleScaleX = exports.toggleScaleX = function toggleScaleX(_ref3) {\n\tvar element = _ref3.element,\n\t    visible = _ref3.visible,\n\t    hidden = _ref3.hidden;\n\n\tvar state = element.getAttribute('state');\n\tif (state === 'visible') {\n\t\telement.style.transform = 'scaleX(' + hidden + ')';\n\t\telement.style.opacity = '0';\n\t\telement.setAttribute('state', 'hidden');\n\t} else {\n\t\telement.style.transform = 'scaleX(' + visible + ')';\n\t\telement.style.opacity = '1';\n\t\telement.setAttribute('state', 'visible');\n\t}\n};\nvar toggleScaleY = exports.toggleScaleY = function toggleScaleY(_ref4) {\n\tvar element = _ref4.element,\n\t    visible = _ref4.visible,\n\t    hidden = _ref4.hidden;\n\n\tvar state = element.getAttribute('state');\n\tif (state === 'visible') {\n\t\telement.style.transform = 'scaleY(' + hidden + ')';\n\t\telement.setAttribute('state', 'hidden');\n\t} else {\n\t\telement.style.transform = 'scaleY(' + visible + ')';\n\t\telement.setAttribute('state', 'visible');\n\t}\n};\nvar visibilityAllChildren = exports.visibilityAllChildren = function visibilityAllChildren(_ref5) {\n\tvar element = _ref5.element,\n\t    value = _ref5.value;\n\n\tvar children = element.children;\n\tArray.from(children).map(function (child) {\n\t\tchild.style.visibility = value;\n\t});\n};\n\n//# sourceURL=webpack:///./src/shared/utils/ui.js?");

/***/ }),

/***/ 0:
/*!**************************************************!*\
  !*** multi babel-polyfill ./src/client/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! babel-polyfill */\"babel-polyfill\");\nmodule.exports = __webpack_require__(/*! /Users/thiagopereira/Desktop/lunes-develop/lunes-wallet-web/src/client/index.js */\"./src/client/index.js\");\n\n\n//# sourceURL=webpack:///multi_babel-polyfill_./src/client/index.js?");

/***/ }),

/***/ "babel-polyfill":
/*!*********************************!*\
  !*** external "babel-polyfill" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-polyfill\");\n\n//# sourceURL=webpack:///external_%22babel-polyfill%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "history":
/*!**************************!*\
  !*** external "history" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"history\");\n\n//# sourceURL=webpack:///external_%22history%22?");

/***/ }),

/***/ "lunes-lib":
/*!****************************!*\
  !*** external "lunes-lib" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"lunes-lib\");\n\n//# sourceURL=webpack:///external_%22lunes-lib%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom\");\n\n//# sourceURL=webpack:///external_%22react-dom%22?");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-redux\");\n\n//# sourceURL=webpack:///external_%22react-redux%22?");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-dom\");\n\n//# sourceURL=webpack:///external_%22react-router-dom%22?");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux\");\n\n//# sourceURL=webpack:///external_%22redux%22?");

/***/ }),

/***/ "redux-logger":
/*!*******************************!*\
  !*** external "redux-logger" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux-logger\");\n\n//# sourceURL=webpack:///external_%22redux-logger%22?");

/***/ }),

/***/ "redux-promise-middleware":
/*!*******************************************!*\
  !*** external "redux-promise-middleware" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux-promise-middleware\");\n\n//# sourceURL=webpack:///external_%22redux-promise-middleware%22?");

/***/ }),

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux-thunk\");\n\n//# sourceURL=webpack:///external_%22redux-thunk%22?");

/***/ }),

/***/ "satoshi-bitcoin":
/*!**********************************!*\
  !*** external "satoshi-bitcoin" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"satoshi-bitcoin\");\n\n//# sourceURL=webpack:///external_%22satoshi-bitcoin%22?");

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"styled-components\");\n\n//# sourceURL=webpack:///external_%22styled-components%22?");

/***/ })

/******/ });