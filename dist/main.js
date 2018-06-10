/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "dac808da5c5bca1d2975"; // eslint-disable-line no-unused-vars
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
/******/ 				/** @type {TODO} */
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

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__dirname) {\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _redux = __webpack_require__(/*! redux */ \"redux\");\n\nvar _server = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _reactRouter = __webpack_require__(/*! react-router */ \"react-router\");\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _Cookie = __webpack_require__(/*! Classes/Cookie */ \"./src/shared/classes/Cookie.js\");\n\nvar _Cookie2 = _interopRequireDefault(_Cookie);\n\nvar _lunesLib = __webpack_require__(/*! lunes-lib */ \"lunes-lib\");\n\nvar _functions = __webpack_require__(/*! Utils/functions */ \"./src/shared/utils/functions.js\");\n\nvar _stores = __webpack_require__(/*! Redux/stores */ \"./src/shared/redux/stores/index.js\");\n\nvar _index = __webpack_require__(/*! Containers/App/index */ \"./src/shared/containers/App/index.js\");\n\nvar _index2 = _interopRequireDefault(_index);\n\nvar _AppSwitcher = __webpack_require__(/*! Containers/AppSwitcher */ \"./src/shared/containers/AppSwitcher.js\");\n\nvar _AppSwitcher2 = _interopRequireDefault(_AppSwitcher);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\n__webpack_require__(/*! dotenv */ \"dotenv\").config({ path: __dirname + '/.env' });\n\n\nvar app = (0, _express2.default)();\n\napp.use(_express2.default.static('public'));\n\napp.use(function () {\n\tvar _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {\n\t\tvar checkCookies;\n\t\treturn regeneratorRuntime.wrap(function _callee$(_context) {\n\t\t\twhile (1) {\n\t\t\t\tswitch (_context.prev = _context.next) {\n\t\t\t\t\tcase 0:\n\t\t\t\t\t\t//preciso aplicar apenas na rota /app\n\t\t\t\t\t\t//preciso verificar se tem token, se nao redireciona\n\t\t\t\t\t\t//preciso verificar se o token é valido, se nao redirect,\n\t\t\t\t\t\t// let u = await users.login({email:'wandyer1@lunes.io', password:'Lunes123#@!'});\n\t\t\t\t\t\t// console.log(u, \"UUU\"); return;\n\t\t\t\t\t\tnext();\n\t\t\t\t\t\treturn _context.abrupt('return');\n\n\t\t\t\t\tcase 9:\n\t\t\t\t\t\tcheckCookies();\n\n\t\t\t\t\tcase 10:\n\t\t\t\t\tcase 'end':\n\t\t\t\t\t\treturn _context.stop();\n\t\t\t\t}\n\t\t\t}\n\t\t}, _callee, undefined);\n\t}));\n\n\treturn function (_x, _x2, _x3) {\n\t\treturn _ref.apply(this, arguments);\n\t};\n}());\n\napp.use(function (req, res, next) {\n\tconsole.log('\\x1B[32m%s\\x1B[0m', '-Method: ' + req.method + ', URL: ' + req.url);\n\tnext();\n});\nglobal.window = {};\napp.get('*', function (req, res) {\n\tvar sheet = new _styledComponents.ServerStyleSheet();\n\ttry {\n\t\tvar html = (0, _server.renderToString)(sheet.collectStyles(_react2.default.createElement(\n\t\t\t_reactRedux.Provider,\n\t\t\t{ store: _stores.store },\n\t\t\t_react2.default.createElement(\n\t\t\t\t_reactRouter.StaticRouter,\n\t\t\t\t{ location: req.url, context: {} },\n\t\t\t\t_react2.default.createElement(_AppSwitcher2.default, null)\n\t\t\t)\n\t\t)));\n\t\tvar styleTags = sheet.getStyleTags();\n\t\tres.send(render(html, styleTags));\n\t} catch (err) {\n\t\tconsole.log((0, _functions.errorPattern)(err));\n\t}\n});\napp.listen(3002, function () {\n\tconsole.log('Server is running on port 3002');\n});\n\nvar render = function render(html, styleTags) {\n\treturn '\\n\\t\\t<!DOCTYPE html>\\n\\t\\t<html>\\n\\t\\t\\t<head>\\n\\t\\t\\t\\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\\n\\t\\t\\t\\t<link rel=\"stylesheet\" type=\"text/css\" href=\"/css/style.css\"/>\\n\\t\\t\\t\\t' + styleTags + '\\n\\t\\t\\t</head>\\n\\t\\t\\t<body>\\n\\t\\t\\t\\t<div class=\"root\">' + html + '</div>\\n\\n\\t\\t\\t\\t<script src=\"https://code.jquery.com/jquery-2.1.1.min.js\"></script>\\n\\t\\t\\t\\t<script src=\"/js/bundle.js\" refer></script>\\n\\t\\t\\t</body>\\n\\t\\t</html>\\n\\t';\n};\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./src/server/index.js?");

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar CookieClass = function CookieClass() {\n\tvar _this = this;\n\n\t_classCallCheck(this, CookieClass);\n\n\tthis.get = function (name) {\n\t\tif (_this.cookies) return _this.cookies;\n\n\t\tif (!window) return null;\n\n\t\tvar cookies = document.cookie;\n\t\tif (!cookies) return null;\n\n\t\tvar rawCookies = cookies.split('/');\n\t\tvar readyCookies = {};\n\t\trawCookies.map(function (nameValue) {\n\t\t\tvar arrCookie = nameValue.split('=');\n\t\t\treadyCookies[arrCookie[0]] = arrCookie[1];\n\t\t});\n\t\t_this.cookies = readyCookies;\n\t\treturn _this.cookies;\n\t};\n\n\tthis.set = function (_ref) {\n\t\tvar name = _ref.name,\n\t\t    value = _ref.value,\n\t\t    expires = _ref.expires;\n\n\t\tif (!window) {\n\t\t\treturn null;\n\t\t}\n\t\tdocument.cookie = name + '=' + value + '; expires=' + expires + '; path=/';\n\t};\n};\n\nexports.default = CookieClass;\n\n//# sourceURL=webpack:///./src/shared/classes/Cookie.js?");

/***/ }),

/***/ "./src/shared/classes/User.js":
/*!************************************!*\
  !*** ./src/shared/classes/User.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _Cookie = __webpack_require__(/*! Classes/Cookie */ \"./src/shared/classes/Cookie.js\");\n\nvar _Cookie2 = _interopRequireDefault(_Cookie);\n\nvar _lunesLib = __webpack_require__(/*! lunes-lib */ \"lunes-lib\");\n\nvar _constants = __webpack_require__(/*! Config/constants */ \"./src/shared/config/constants.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar defaultEmail = 'wandyer1@lunes.io';\nvar defaultPassword = 'Lunes123#@!';\n// if (LUNES_LIB_ENV === 'production') {\n// \tdefaultEmail    = 'marcelosmtp@gmail.com';\n// \tdefaultPassword = '123123123';\n// } else if (LUNES_LIB_ENV === 'staging') {\n// \tdefaultEmail    = 'wandyer1@lunes.io';\n// \tdefaultPassword = 'Lunes123#@!';\n// }\n\nvar UserClass = function UserClass() {\n\tvar _this = this;\n\n\t_classCallCheck(this, UserClass);\n\n\tthis.login = function () {\n\t\tvar _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {\n\t\t\tvar email = _ref2.email,\n\t\t\t    password = _ref2.password;\n\t\t\tvar user, cookie;\n\t\t\treturn regeneratorRuntime.wrap(function _callee$(_context) {\n\t\t\t\twhile (1) {\n\t\t\t\t\tswitch (_context.prev = _context.next) {\n\t\t\t\t\t\tcase 0:\n\t\t\t\t\t\t\tuser = void 0;\n\n\t\t\t\t\t\t\tif (!(_constants.LUNES_LIB_LOGIN !== 'auto')) {\n\t\t\t\t\t\t\t\t_context.next = 7;\n\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t_context.next = 4;\n\t\t\t\t\t\t\treturn _lunesLib.users.login({ email: email, password: password });\n\n\t\t\t\t\t\tcase 4:\n\t\t\t\t\t\t\tuser = _context.sent;\n\t\t\t\t\t\t\t_context.next = 10;\n\t\t\t\t\t\t\tbreak;\n\n\t\t\t\t\t\tcase 7:\n\t\t\t\t\t\t\t_context.next = 9;\n\t\t\t\t\t\t\treturn _lunesLib.users.login({ email: defaultEmail, password: defaultPassword });\n\n\t\t\t\t\t\tcase 9:\n\t\t\t\t\t\t\tuser = _context.sent;\n\n\t\t\t\t\t\tcase 10:\n\t\t\t\t\t\t\tif (window && document) {\n\t\t\t\t\t\t\t\tcookie = new _Cookie2.default();\n\n\t\t\t\t\t\t\t\tcookie.set({\n\t\t\t\t\t\t\t\t\tname: 'user',\n\t\t\t\t\t\t\t\t\tvalue: JSON.stringify(user),\n\t\t\t\t\t\t\t\t\texpires: new Date().setHours(new Date().getHours + 1)\n\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\treturn _context.abrupt('return', user);\n\n\t\t\t\t\t\tcase 12:\n\t\t\t\t\t\tcase 'end':\n\t\t\t\t\t\t\treturn _context.stop();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}, _callee, _this);\n\t\t}));\n\n\t\treturn function (_x) {\n\t\t\treturn _ref.apply(this, arguments);\n\t\t};\n\t}();\n};\n\nexports.default = UserClass;\n\n//# sourceURL=webpack:///./src/shared/classes/User.js?");

/***/ }),

/***/ "./src/shared/classes/Wallet.js":
/*!**************************************!*\
  !*** ./src/shared/classes/Wallet.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.WalletClass = undefined;\n\nvar _functions = __webpack_require__(/*! Utils/functions */ \"./src/shared/utils/functions.js\");\n\nvar _lunesLib = __webpack_require__(/*! lunes-lib */ \"lunes-lib\");\n\nvar _satoshiBitcoin = __webpack_require__(/*! satoshi-bitcoin */ \"satoshi-bitcoin\");\n\nvar _satoshiBitcoin2 = _interopRequireDefault(_satoshiBitcoin);\n\nvar _constants = __webpack_require__(/*! Config/constants */ \"./src/shared/config/constants.js\");\n\nvar _isCoinAvaliable = __webpack_require__(/*! Config/isCoinAvaliable */ \"./src/shared/config/isCoinAvaliable.js\");\n\nvar _isCoinAvaliable2 = _interopRequireDefault(_isCoinAvaliable);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar WalletClass = exports.WalletClass = function WalletClass() {\n  var _this = this;\n\n  _classCallCheck(this, WalletClass);\n\n  this.getCoinsPrice = function () {\n    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {\n      var coinsPrice, coinKey;\n      return regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              if (!data || Object.keys(data).length < 1) {\n                data = {\n                  BTC: { fromSymbol: 'BTC', toSymbol: 'USD' },\n                  ETH: { fromSymbol: 'ETH', toSymbol: 'USD' }\n                };\n              }\n\n              _context.prev = 1;\n              coinsPrice = {};\n              _context.t0 = regeneratorRuntime.keys(data);\n\n            case 4:\n              if ((_context.t1 = _context.t0()).done) {\n                _context.next = 11;\n                break;\n              }\n\n              coinKey = _context.t1.value;\n              _context.next = 8;\n              return _lunesLib.coins.getPrice(data[coinKey]);\n\n            case 8:\n              coinsPrice[data[coinKey].fromSymbol] = _context.sent;\n              _context.next = 4;\n              break;\n\n            case 11:\n              return _context.abrupt(\"return\", coinsPrice);\n\n            case 14:\n              _context.prev = 14;\n              _context.t2 = _context[\"catch\"](1);\n              return _context.abrupt(\"return\", (0, _functions.errorPattern)(\"Error on trying to get price\", 500, \"COINGETPRICE_ERROR\", _context.t2));\n\n            case 17:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee, _this, [[1, 14]]);\n    }));\n\n    return function (_x) {\n      return _ref.apply(this, arguments);\n    };\n  }();\n\n  this.getUserAddresses = function (user) {\n    try {\n      var addresses = {};\n      //(example): @param coin = {symbol: 'btc', createdAt: [timestamp], etc..}\n      user.wallet.coins.map(function (coin) {\n        //if addresses does not have {addresses['btc'] (example)} as attribute, so:\n        if (!addresses[coin.symbol]) {\n          addresses[coin.symbol] = [];\n        }\n        //we get the ${addresses[coin.symbol]} array, and we push an address to it\n        coin.addresses.map(function (obj) {\n          addresses[coin.symbol].push(obj.address);\n        });\n      });\n      return addresses;\n    } catch (err) {\n      return (0, _functions.errorPattern)(\"Was not possible get user addresses\", 500, \"WALLET_GETUSERADDRESS_ERROR\", err);\n    }\n  };\n\n  this.getBalance = function () {\n    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(user) {\n      var addresses, balance, coin, i, addressKey, ucCoin, address, response, confirmed, unconfirmed;\n      return regeneratorRuntime.wrap(function _callee2$(_context2) {\n        while (1) {\n          switch (_context2.prev = _context2.next) {\n            case 0:\n              _context2.prev = 0;\n\n              if (typeof user === \"string\") {\n                user = JSON.parse(user);\n              }\n              // let coinsPrice = await this.getCoinsPrice([\n              //   { fromSymbol: \"BTC\", toSymbol: \"BRL,USD\" },\n              //   { fromSymbol: \"LTC\", toSymbol: \"BRL,USD\" },\n              //   { fromSymbol: \"ETH\", toSymbol: \"BRL,USD\" }\n              // ]);\n              // this.coinsPrice = coinsPrice;\n              addresses = _this.getUserAddresses(user);\n              balance = {};\n              //coin = 'btc' (example)\n\n              _context2.t0 = regeneratorRuntime.keys(addresses);\n\n            case 5:\n              if ((_context2.t1 = _context2.t0()).done) {\n                _context2.next = 24;\n                break;\n              }\n\n              coin = _context2.t1.value;\n\n              coin = coin.toUpperCase();\n              //addressKey = 1 (example)\n              i = 0;\n              _context2.t2 = regeneratorRuntime.keys(addresses[coin]);\n\n            case 10:\n              if ((_context2.t3 = _context2.t2()).done) {\n                _context2.next = 22;\n                break;\n              }\n\n              addressKey = _context2.t3.value;\n\n              //we need to upper case it because of our pattern on redux\n              ucCoin = coin.toUpperCase();\n\n              if (!((0, _isCoinAvaliable2.default)(coin) === false)) {\n                _context2.next = 15;\n                break;\n              }\n\n              return _context2.abrupt(\"continue\", 10);\n\n            case 15:\n              //it gets the current addres of the iteration\n              address = addresses[coin][addressKey];\n              //it returns a response object\n\n              _context2.next = 18;\n              return _lunesLib.coins.services.balance({ network: coin, address: address, testnet: _constants.TESTNET });\n\n            case 18:\n              response = _context2.sent;\n\n              if (response.data) {\n                //se não temos nada no objeto\n                //então colocamos valores iniciais\n                if (!balance[ucCoin]) {\n                  balance[ucCoin] = {};\n                  balance[ucCoin][\"total_confirmed\"] = _satoshiBitcoin2.default.toSatoshi(0);\n                  balance[ucCoin][\"total_unconfirmed\"] = _satoshiBitcoin2.default.toSatoshi(0);\n                  balance[ucCoin][\"total_amount\"] = 0;\n                }\n                //new total_(un)confirmed\n                confirmed = response.data.confirmed ? response.data.confirmed : 0;\n                unconfirmed = response.data.unconfirmed ? response.data.unconfirmed : 0;\n                //it sums the old total_confirmed with the new\n\n                balance[ucCoin][\"total_confirmed\"] += confirmed;\n                balance[ucCoin][\"total_unconfirmed\"] += unconfirmed;\n                //it converts total_(un)confirmed to bitcoin\n                balance[ucCoin][\"total_unconfirmed\"] = _satoshiBitcoin2.default.toBitcoin(balance[ucCoin][\"total_unconfirmed\"]);\n                balance[ucCoin][\"total_confirmed\"] = _satoshiBitcoin2.default.toBitcoin(balance[ucCoin][\"total_confirmed\"]);\n\n                balance[ucCoin][\"total_amount\"] = balance[ucCoin][\"total_confirmed\"] + balance[ucCoin][\"total_unconfirmed\"];\n              }\n              _context2.next = 10;\n              break;\n\n            case 22:\n              _context2.next = 5;\n              break;\n\n            case 24:\n              return _context2.abrupt(\"return\", balance);\n\n            case 27:\n              _context2.prev = 27;\n              _context2.t4 = _context2[\"catch\"](0);\n              throw (0, _functions.errorPattern)(\"Error on get balance\", 500, \"WALLET_GETBALANCE_ERROR\", _context2.t4);\n\n            case 30:\n            case \"end\":\n              return _context2.stop();\n          }\n        }\n      }, _callee2, _this, [[0, 27]]);\n    }));\n\n    return function (_x2) {\n      return _ref2.apply(this, arguments);\n    };\n  }();\n\n  this.getTxHistory = function () {\n    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref4) {\n      var _ref4$network = _ref4.network,\n          network = _ref4$network === undefined ? undefined : _ref4$network,\n          _ref4$address = _ref4.address,\n          address = _ref4$address === undefined ? undefined : _ref4$address;\n      return regeneratorRuntime.wrap(function _callee3$(_context3) {\n        while (1) {\n          switch (_context3.prev = _context3.next) {\n            case 0:\n              console.warn(network, address, \"NETWORK | ADDRESS\");\n\n              if (network) {\n                _context3.next = 3;\n                break;\n              }\n\n              throw (0, _functions.errorPattern)(\"getHistory error, you should pass through a network name\", 500, \"WALLET_GETHISTORY_ERROR\");\n\n            case 3:\n              _context3.prev = 3;\n              return _context3.abrupt(\"return\", _lunesLib.coins.services.history({ network: network, address: address, testnet: _constants.TESTNET }));\n\n            case 7:\n              _context3.prev = 7;\n              _context3.t0 = _context3[\"catch\"](3);\n              throw console.error((0, _functions.errorPattern)(\"Error on get history\", 500, \"WALLET_GETHISTORY_ERROR\", _context3.t0));\n\n            case 10:\n            case \"end\":\n              return _context3.stop();\n          }\n        }\n      }, _callee3, _this, [[3, 7]]);\n    }));\n\n    return function (_x3) {\n      return _ref3.apply(this, arguments);\n    };\n  }();\n\n  this.getCoinHistory = function () {\n    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(object) {\n      return regeneratorRuntime.wrap(function _callee4$(_context4) {\n        while (1) {\n          switch (_context4.prev = _context4.next) {\n            case 0:\n              _context4.next = 2;\n              return _lunesLib.coins.getHistory(object);\n\n            case 2:\n              return _context4.abrupt(\"return\", _context4.sent);\n\n            case 3:\n            case \"end\":\n              return _context4.stop();\n          }\n        }\n      }, _callee4, _this);\n    }));\n\n    return function (_x4) {\n      return _ref5.apply(this, arguments);\n    };\n  }();\n}\n\n//for now, we arent using this\n\n/*\n@param user: typically it comes from cookies\nreturns: {btc: ['address','address', ...]}\n*/\n\n/*\n@param user: typically comes from cookies\nreturn ex:\n\t{ \n\t\tbtc: { \n\t\t\ttotal_confirmed: 0, \n\t\t\ttotal_unconfirmed: 0, \n\t\t\ttotal_amount: 0 \n\t\t} \n\t}\n*/\n\n//\"1Q7Jmho4FixWBiTVcZ5aKXv4rTMMp6CjiD\"\n;\n\n//# sourceURL=webpack:///./src/shared/classes/Wallet.js?");

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.BlockBase = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\tdisplay: block;\\n\\tmargin: 0 auto;\\n\\twidth: 100%;\\n\\t', '\\n'], ['\\n\\tdisplay: block;\\n\\tmargin: 0 auto;\\n\\twidth: 100%;\\n\\t', '\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar BlockBase = exports.BlockBase = (0, _styledComponents.css)(_templateObject, function (props) {\n\tif (props.bdColor) {\n\t\treturn 'border-color: ' + props.bdColor + ';';\n\t}\n\tif (props.bdWidth && props.bdWidth.indexOf('rem') !== -1) {\n\t\treturn 'border-width: ' + props.bdWidth + ';';\n\t}\n});\n\n//# sourceURL=webpack:///./src/shared/components/BlockBase.js?");

/***/ }),

/***/ "./src/shared/components/ButtonBase.js":
/*!*********************************************!*\
  !*** ./src/shared/components/ButtonBase.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.ButtonBase = undefined;\n\nvar _templateObject = _taggedTemplateLiteral([\"\\n\\t\", \"\\n\\tbackground: \", \";\\t\\n\\tcolor: white;\\n\\n\\tfont-size: 16px;\\n\\ttext-align: center;\\n\\tborder-radius: 4px;\\n\\tborder: none;\\n\\tcursor: pointer;\\n\\t&:focus {\\n\\t\\toutline: none;\\n\\t}\\n\"], [\"\\n\\t\", \"\\n\\tbackground: \", \";\\t\\n\\tcolor: white;\\n\\n\\tfont-size: 16px;\\n\\ttext-align: center;\\n\\tborder-radius: 4px;\\n\\tborder: none;\\n\\tcursor: pointer;\\n\\t&:focus {\\n\\t\\toutline: none;\\n\\t}\\n\"]);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _BlockBase = __webpack_require__(/*! ./BlockBase */ \"./src/shared/components/BlockBase.js\");\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar ButtonBase = exports.ButtonBase = (0, _styledComponents.css)(_templateObject, _BlockBase.BlockBase, _styleVariables2.default.normalGreen);\n\n//# sourceURL=webpack:///./src/shared/components/ButtonBase.js?");

/***/ }),

/***/ "./src/shared/components/Buttons.js":
/*!******************************************!*\
  !*** ./src/shared/components/Buttons.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\t\tvalue: true\n});\nexports.ButtonGreen = exports.ButtonSecondary = exports.Button = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\t', '\\n'], ['\\n\\t', '\\n']),\n    _templateObject2 = _taggedTemplateLiteral(['\\n\\tbackground: transparent;\\n\\tborder: 1.5px solid ', ';\\n\\n\\ttransition: background 0.2s;\\n\\t&:hover {\\n\\t\\tbackground: ', ';\\n\\t}\\n\\tpadding: 10px 20px 10px 20px;\\n'], ['\\n\\tbackground: transparent;\\n\\tborder: 1.5px solid ', ';\\n\\n\\ttransition: background 0.2s;\\n\\t&:hover {\\n\\t\\tbackground: ', ';\\n\\t}\\n\\tpadding: 10px 20px 10px 20px;\\n']),\n    _templateObject3 = _taggedTemplateLiteral(['\\n\\tbackground: ', ';\\n\\tborder: 1.5px solid ', ';\\n\\t', '\\n\\t', '\\n\\t', '\\n'], ['\\n\\tbackground: ', ';\\n\\tborder: 1.5px solid ', ';\\n\\t', '\\n\\t', '\\n\\t', '\\n']);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _ButtonBase = __webpack_require__(/*! ./ButtonBase */ \"./src/shared/components/ButtonBase.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar Button = exports.Button = _styledComponents2.default.button(_templateObject, _ButtonBase.ButtonBase);\nvar ButtonSecondary = exports.ButtonSecondary = Button.extend(_templateObject2, _styleVariables2.default.normalGreen, _styleVariables2.default.normalGreen);\n\nvar ButtonGreen = exports.ButtonGreen = Button.extend(_templateObject3, _styleVariables2.default.normalGreen, _styleVariables2.default.normalGreen, function (props) {\n\t\tif (props.width) {\n\t\t\t\treturn 'width: ' + props.width + ';';\n\t\t}\n\t\treturn \"width: 100%;\";\n}, function (props) {\n\t\tif (props.height) {\n\t\t\t\treturn 'height: ' + props.height + ';';\n\t\t}\n\t\treturn \"height: 38px;\";\n}, function (props) {\n\t\tif (props.margin && props.margin.indexOf('rem') !== -1) {\n\t\t\t\treturn 'margin: ' + props.margin + ';';\n\t\t}\n});\n\n//# sourceURL=webpack:///./src/shared/components/Buttons.js?");

/***/ }),

/***/ "./src/shared/components/Col.js":
/*!**************************************!*\
  !*** ./src/shared/components/Col.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.Col = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\twidth: 100%;\\n\\t', ';\\n\\t', ';\\n'], ['\\n\\twidth: 100%;\\n\\t', ';\\n\\t', ';\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _bases = __webpack_require__(/*! Components/bases */ \"./src/shared/components/bases/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar Col = exports.Col = _styledComponents2.default.div(_templateObject, _bases.ColBase, function (props) {\n\treturn props.css ? props.css : '';\n});\n\n//# sourceURL=webpack:///./src/shared/components/Col.js?");

/***/ }),

/***/ "./src/shared/components/FooterUser.js":
/*!*********************************************!*\
  !*** ./src/shared/components/FooterUser.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _templateObject = _taggedTemplateLiteral(['\\n  display: block;\\n  margin-top: 10rem;\\n  margin-bottom: 35px;\\n  text-align: center;\\n\\n  @media (min-width: 768px) {\\n    bottom: 0;\\n  }\\n'], ['\\n  display: block;\\n  margin-top: 10rem;\\n  margin-bottom: 35px;\\n  text-align: center;\\n\\n  @media (min-width: 768px) {\\n    bottom: 0;\\n  }\\n']);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _Link = __webpack_require__(/*! Components/Link */ \"./src/shared/components/Link.js\");\n\nvar _P = __webpack_require__(/*! Components/P */ \"./src/shared/components/P.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar CustomP = _P.P.extend(_templateObject);\n\nvar FooterUser = function (_React$Component) {\n  _inherits(FooterUser, _React$Component);\n\n  function FooterUser(props) {\n    _classCallCheck(this, FooterUser);\n\n    var _this = _possibleConstructorReturn(this, (FooterUser.__proto__ || Object.getPrototypeOf(FooterUser)).call(this, props));\n\n    _this.state = {\n      content: _this.props.content,\n      to: _this.props.to,\n      label: _this.props.label\n    };\n    return _this;\n  }\n\n  _createClass(FooterUser, [{\n    key: 'render',\n    value: function render() {\n      return _react2.default.createElement(\n        'div',\n        null,\n        _react2.default.createElement(\n          CustomP,\n          { clWhite: true, fontSize: \"1.4rem\" },\n          this.state.content,\n          ' ',\n          \" \",\n          _react2.default.createElement(\n            _Link.CustomLink,\n            { to: this.state.to, color: '' + _styleVariables2.default.normalGreen, display: 'inline' },\n            this.state.label\n          )\n        )\n      );\n    }\n  }]);\n\n  return FooterUser;\n}(_react2.default.Component);\n\nexports.default = FooterUser;\n\n//# sourceURL=webpack:///./src/shared/components/FooterUser.js?");

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

/***/ "./src/shared/components/Image.js":
/*!****************************************!*\
  !*** ./src/shared/components/Image.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _templateObject = _taggedTemplateLiteral([\"\\n  width: 100%;\\n  height: auto;\\n\"], [\"\\n  width: 100%;\\n  height: auto;\\n\"]),\n    _templateObject2 = _taggedTemplateLiteral([\"\\n  margin-top: 4%;\\n  width: 75% !important;\\n\\n  \\n  & .slider-list {\\n    height: 80vh !important;\\n  }\\n\\n  & .slider-control-bottomcenter ul {\\n    top: 10rem !important;\\n  }\\n\\n  & .slider-control-bottomcenter ul li button {\\n    font-size: 40px !important;\\n    color: white !important;    \\n  }\\n\\n  & .slider-control-centerright button {\\n    display: none !important;\\n  }\\n\\n  & .slider-control-centerleft button {\\n    display: none !important;\\n  }\\n\"], [\"\\n  margin-top: 4%;\\n  width: 75% !important;\\n\\n  \\n  & .slider-list {\\n    height: 80vh !important;\\n  }\\n\\n  & .slider-control-bottomcenter ul {\\n    top: 10rem !important;\\n  }\\n\\n  & .slider-control-bottomcenter ul li button {\\n    font-size: 40px !important;\\n    color: white !important;    \\n  }\\n\\n  & .slider-control-centerright button {\\n    display: none !important;\\n  }\\n\\n  & .slider-control-centerleft button {\\n    display: none !important;\\n  }\\n\"]),\n    _templateObject3 = _taggedTemplateLiteral([\"\\n  color: white;\\n  font-size: 10pt;\\n  padding-left:auto;\\n  padding-right:auto;\\n  margin-top: 4%;\\n  margin-bottom: 4%;\\n  text-align: center;\\n\"], [\"\\n  color: white;\\n  font-size: 10pt;\\n  padding-left:auto;\\n  padding-right:auto;\\n  margin-top: 4%;\\n  margin-bottom: 4%;\\n  text-align: center;\\n\"]),\n    _templateObject4 = _taggedTemplateLiteral([\"\\n  margin: auto;\\n  width: 100%;\\n  padding: 10px;\\n\"], [\"\\n  margin: auto;\\n  width: 100%;\\n  padding: 10px;\\n\"]);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _nukaCarousel = __webpack_require__(/*! nuka-carousel */ \"nuka-carousel\");\n\nvar _nukaCarousel2 = _interopRequireDefault(_nukaCarousel);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar Img = _styledComponents2.default.img(_templateObject);\n\nvar DivCarrousel = _styledComponents2.default.div(_templateObject2);\n\nvar P = _styledComponents2.default.div(_templateObject3);\nvar DivParagraph = _styledComponents2.default.div(_templateObject4);\n\nvar Image = function (_React$Component) {\n  _inherits(Image, _React$Component);\n\n  function Image() {\n    var _ref;\n\n    var _temp, _this, _ret;\n\n    _classCallCheck(this, Image);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Image.__proto__ || Object.getPrototypeOf(Image)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (index) {\n      if (index == _this.props.imageList.length) _this.renderImage(_this.props.imageList);\n    }, _this.renderImage = function (images) {\n      return images.map(function (photo, index) {\n        return _react2.default.createElement(\n          \"div\",\n          { key: index },\n          _react2.default.createElement(Img, { src: photo.link }),\n          _react2.default.createElement(\n            DivParagraph,\n            null,\n            _react2.default.createElement(\n              P,\n              null,\n              photo.text\n            )\n          )\n        );\n      });\n    }, _temp), _possibleConstructorReturn(_this, _ret);\n  }\n\n  _createClass(Image, [{\n    key: \"render\",\n    value: function render() {\n      return _react2.default.createElement(\n        DivCarrousel,\n        null,\n        _react2.default.createElement(\n          _nukaCarousel2.default,\n          { wrapAround: true, autoplay: true },\n          this.renderImage(this.props.imageList)\n        )\n      );\n    }\n  }]);\n\n  return Image;\n}(_react2.default.Component);\n\nexports.default = Image;\n\n//# sourceURL=webpack:///./src/shared/components/Image.js?");

/***/ }),

/***/ "./src/shared/components/Img.js":
/*!**************************************!*\
  !*** ./src/shared/components/Img.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.Img = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\t', '\\n\\t', '\\n\\t', '\\n\\tuser-select: none;\\n\\tdisplay: block;\\n'], ['\\n\\t', '\\n\\t', '\\n\\t', '\\n\\tuser-select: none;\\n\\tdisplay: block;\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar Img = exports.Img = _styledComponents2.default.img(_templateObject, function (props) {\n\tif (props.width) return 'width: ' + props.width;\n}, function (props) {\n\tif (props.margin) return 'margin: ' + props.margin;\n}, function (props) {\n\tif (props.center) return 'margin: 0 auto';\n});\n\n//# sourceURL=webpack:///./src/shared/components/Img.js?");

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.CircleLink = exports.CustomLink = exports.Link = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\t', '\\n'], ['\\n\\t', '\\n']),\n    _templateObject2 = _taggedTemplateLiteral(['\\n\\tfont-size: 1.4rem;\\n\\ttext-decoration: none;\\n\\ttext-align: center;\\n\\tdisplay: ', ';\\n\\tcolor: ', ';\\n\\tmargin: ', ';\\n'], ['\\n\\tfont-size: 1.4rem;\\n\\ttext-decoration: none;\\n\\ttext-align: center;\\n\\tdisplay: ', ';\\n\\tcolor: ', ';\\n\\tmargin: ', ';\\n']),\n    _templateObject3 = _taggedTemplateLiteral(['\\n  background-color: white;\\n  border: 0;\\n  border-radius: 100%;\\n  height: ', ';\\n  width: ', ';\\n'], ['\\n  background-color: white;\\n  border: 0;\\n  border-radius: 100%;\\n  height: ', ';\\n  width: ', ';\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _LinkBase = __webpack_require__(/*! ./LinkBase */ \"./src/shared/components/LinkBase.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\n// import { BlockBase } from './BlockBase';\n\nvar Link = exports.Link = (0, _styledComponents2.default)(_reactRouterDom.Link)(_templateObject, _LinkBase.LinkBase);\n\nvar CustomLink = exports.CustomLink = (0, _styledComponents2.default)(_reactRouterDom.Link)(_templateObject2, function (props) {\n\treturn props.display ? props.display : 'block';\n}, function (props) {\n\treturn props.color ? props.color : 'white';\n}, function (props) {\n\treturn props.margin ? props.margin : '10px auto 0 auto';\n});\n\nvar CircleLink = exports.CircleLink = CustomLink.extend(_templateObject3, function (props) {\n\treturn props.height ? props.height : '40px';\n}, function (props) {\n\treturn props.width ? props.width : '40px';\n});\n\n//# sourceURL=webpack:///./src/shared/components/Link.js?");

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.Loading = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\tfrom { transform: rotate(0deg);\\t}\\n\\tto { transform: rotate(360deg);\\t}\\n'], ['\\n\\tfrom { transform: rotate(0deg);\\t}\\n\\tto { transform: rotate(360deg);\\t}\\n']),\n    _templateObject2 = _taggedTemplateLiteral(['\\n\\tborder: ', ' solid ', ';\\n\\tborder-left-color: transparent;\\n\\tborder-radius: 100%;\\n\\tanimation: ', ' 1s linear infinite;\\n\\twidth: ', ';\\n\\theight: ', ';\\n  margin: 0 auto;\\n'], ['\\n\\tborder: ', ' solid ', ';\\n\\tborder-left-color: transparent;\\n\\tborder-radius: 100%;\\n\\tanimation: ', ' 1s linear infinite;\\n\\twidth: ', ';\\n\\theight: ', ';\\n  margin: 0 auto;\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar rotationLoading = (0, _styledComponents.keyframes)(_templateObject);\nvar Loading = exports.Loading = _styledComponents2.default.div(_templateObject2, function (props) {\n\treturn props.bWidth ? props.bWidth : '10px';\n}, _styleVariables2.default.normalGreen, rotationLoading, function (props) {\n\treturn props.size ? props.size : '75px';\n}, function (props) {\n\treturn props.size ? props.size : '75px';\n});\n\n//# sourceURL=webpack:///./src/shared/components/Loading.js?");

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

/***/ "./src/shared/components/P.js":
/*!************************************!*\
  !*** ./src/shared/components/P.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.P = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\t', '\\n'], ['\\n\\t', '\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _TextBase = __webpack_require__(/*! ./TextBase */ \"./src/shared/components/TextBase.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar P = exports.P = _styledComponents2.default.p(_templateObject, _TextBase.TextBase);\n\n//# sourceURL=webpack:///./src/shared/components/P.js?");

/***/ }),

/***/ "./src/shared/components/Row.js":
/*!**************************************!*\
  !*** ./src/shared/components/Row.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.Row = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\twidth: 100%;\\n\\theight: auto;\\n\\toverflow: auto;\\n\\t&:before {\\n\\t\\tcontent: \\'\\';\\n\\t}\\n\\t&:after {\\n\\t\\tcontent: \\'\\';\\n\\t}\\n\\tdisplay: flex;\\n\\tjustify-content: center;\\n\\talign-items: flex-start;\\n\\tflex-flow: wrap;\\n\\t', ';\\n\\t', ';\\n\\t', ';\\n'], ['\\n\\twidth: 100%;\\n\\theight: auto;\\n\\toverflow: auto;\\n\\t&:before {\\n\\t\\tcontent: \\'\\';\\n\\t}\\n\\t&:after {\\n\\t\\tcontent: \\'\\';\\n\\t}\\n\\tdisplay: flex;\\n\\tjustify-content: center;\\n\\talign-items: flex-start;\\n\\tflex-flow: wrap;\\n\\t', ';\\n\\t', ';\\n\\t', ';\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _bases = __webpack_require__(/*! Components/bases */ \"./src/shared/components/bases/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar Row = exports.Row = _styledComponents2.default.div(_templateObject, _bases.RowBase, function (props) {\n\treturn props.css ? props.css : '';\n}, function (props) {\n\treturn props.overflowHidden ? 'overflow: hidden' : 'overflow: auto';\n});\n\n//# sourceURL=webpack:///./src/shared/components/Row.js?");

/***/ }),

/***/ "./src/shared/components/Text.js":
/*!***************************************!*\
  !*** ./src/shared/components/Text.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.Text = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\t', ';\\n\\t', ';\\n'], ['\\n\\t', ';\\n\\t', ';\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _TextBase = __webpack_require__(/*! ./TextBase */ \"./src/shared/components/TextBase.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar Text = exports.Text = _styledComponents2.default.div(_templateObject, _TextBase.TextBase, function (props) {\n\treturn props.css ? props.css : '';\n});\n\n//# sourceURL=webpack:///./src/shared/components/Text.js?");

/***/ }),

/***/ "./src/shared/components/TextBase.js":
/*!*******************************************!*\
  !*** ./src/shared/components/TextBase.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.TextBase = undefined;\n\nvar _templateObject = _taggedTemplateLiteral([\"\\n\\t\", \"\\n\\t\", \"\\n\\t\", \"\\n\\t\", \"\\n\\t\", \"\\n\\t\", \"\\n\\t\", \"\\n\\t\", \"\\n  \", \"\\n  \", \"\\n\"], [\"\\n\\t\", \"\\n\\t\", \"\\n\\t\", \"\\n\\t\", \"\\n\\t\", \"\\n\\t\", \"\\n\\t\", \"\\n\\t\", \"\\n  \", \"\\n  \", \"\\n\"]);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar TextBase = exports.TextBase = (0, _styledComponents.css)(_templateObject, function (props) {\n  if (props.fontSize) {\n    return \"font-size: \" + props.fontSize + \";\";\n  }\n  return \"font-size: 1.8rem;\";\n}, function (props) {\n  if (props.clNormalGreen) {\n    return \"color: \" + _styleVariables2.default.normalGreen;\n  } else if (props.clWhite) {\n    return \"color: white\";\n  } else if (props.clNormalLilac) {\n    return \"color: \" + _styleVariables2.default.normalLilac;\n  } else if (props.clLightLilac) {\n    return \"color: \" + _styleVariables2.default.lightLilac;\n  }\n}, function (props) {\n  if (props.txCenter) {\n    return \"text-align: center\";\n  } else if (props.txRight) {\n    return \"text-align: right\";\n  }\n}, function (props) {\n  if (props.margin && props.margin.indexOf('rem') !== -1) {\n    return \"margin: \" + props.margin + \";\";\n  }\n}, function (props) {\n  if (props.padding) {\n    return \"padding: \" + props.padding + \";\";\n  }\n}, function (props) {\n  if (props.size && props.size.indexOf(\"rem\") !== -1) {\n    return \"font-size: \" + props.size;\n  }\n}, function (props) {\n  if (props.txBold) {\n    return \"font-weight: bold;\";\n  } else if (props.txLight) {\n    return \"font-weight: 100;\";\n  } else if (props.txNormal) {\n    return \"font-weight: 300;\";\n  }\n\n  if (props.txItalic) {\n    return \"font-style: italic;\";\n  } else if (props.txOblique) {\n    return \"font-style: oblique;\";\n  }\n}, function (props) {\n  if (props.txInline) {\n    return \"display: inline;\";\n  } else if (props.txInlineBlock) {\n    return \"display: inline-block;\";\n  }\n}, function (props) {\n  if (props.offSide) {\n    return \"font-family: OffSide\";\n  }\n}, function (props) {\n  if (props.backGroundRed) {\n    return \"background-color:\" + _styleVariables2.default.normalRed;\n  } else if (props.backGroundGreen) {\n    return \"background-color:\" + _styleVariables2.default.normalGreen;\n  }\n});\n\n//# sourceURL=webpack:///./src/shared/components/TextBase.js?");

/***/ }),

/***/ "./src/shared/components/bases/BackgroundBase.js":
/*!*******************************************************!*\
  !*** ./src/shared/components/bases/BackgroundBase.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\t', '\\n\\tbackground-position: center;\\n\\tbackground-size: 100% 100%;\\n\\tbackground-repeat: no-repeat;\\n'], ['\\n\\t', '\\n\\tbackground-position: center;\\n\\tbackground-size: 100% 100%;\\n\\tbackground-repeat: no-repeat;\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar BackgroundBase = (0, _styledComponents.css)(_templateObject, function (props) {\n\tif (props.bgNormalGreen) return 'background: ' + _styleVariables2.default.normalGreen + ';';\n\tif (props.bgNormalLilac) return 'background: ' + _styleVariables2.default.normalLilac + ';';\n\tif (props.bgNormalRed) return 'background: ' + _styleVariables2.default.normalRed + ';';\n\tif (props.bgNormalYellow) return 'background: ' + _styleVariables2.default.normalYellow + ';';\n\tif (props.bgWhite) return 'background: white; color: black;';\n});\n\nexports.default = BackgroundBase;\n\n//# sourceURL=webpack:///./src/shared/components/bases/BackgroundBase.js?");

/***/ }),

/***/ "./src/shared/components/bases/ColBase.js":
/*!************************************************!*\
  !*** ./src/shared/components/bases/ColBase.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _templateObject = _taggedTemplateLiteral([\"\\n\\t\", \"\\n\"], [\"\\n\\t\", \"\\n\"]);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar ColBase = (0, _styledComponents.css)(_templateObject, function (props) {\n\tif (!props.s) props.s = 12;\n\tif (!props.m) props.m = 12;\n\tif (!props.l) props.l = 12;\n\n\t//regra de 3, onde 12 é o numero total de colunas\n\tvar sWidth = 100 / 12 * props.s;\n\tvar mWidth = 100 / 12 * props.m;\n\tvar lWidth = 100 / 12 * props.l;\n\n\treturn \"\\n\\t\\t\\t@media (\" + _styleVariables2.default.media.mobile + \") {\\n\\t\\t\\t\\twidth: \" + sWidth + \"%;\\n\\t\\t\\t}\\n\\t\\t\\t@media (\" + _styleVariables2.default.media.tablet2 + \") {\\n\\t\\t\\t\\twidth: \" + mWidth + \"%;\\n      }\\n      @media (\" + _styleVariables2.default.media.laptop + \") {\\n\\t\\t\\t\\twidth: \" + lWidth + \"%;\\n\\t\\t\\t}\\n\\t\\t\";\n});\n\nexports.default = ColBase;\n\n//# sourceURL=webpack:///./src/shared/components/bases/ColBase.js?");

/***/ }),

/***/ "./src/shared/components/bases/MarginBase.js":
/*!***************************************************!*\
  !*** ./src/shared/components/bases/MarginBase.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.MarginBase = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\t', '\\n'], ['\\n\\t', '\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar MarginBase = exports.MarginBase = (0, _styledComponents.css)(_templateObject, function (props) {\n\tif (props.noMargin) {\n\t\treturn 'margin: none';\n\t}\n});\n\n//# sourceURL=webpack:///./src/shared/components/bases/MarginBase.js?");

/***/ }),

/***/ "./src/shared/components/bases/RowBase.js":
/*!************************************************!*\
  !*** ./src/shared/components/bases/RowBase.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\t', '\\n'], ['\\n\\t', '\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _ColBase = __webpack_require__(/*! ./ColBase */ \"./src/shared/components/bases/ColBase.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar RowBase = (0, _styledComponents.css)(_templateObject, function (props) {\n\tvar local = [];\n\tif (!props.defaultAlign) {\n\t\t!props.sAlign ? local['sAlign'] = 'center' : local['sAlign'] = props.sAlign;\n\t\t!props.mAlign ? local['mAlign'] = 'center' : local['mAlign'] = props.mAlign;\n\t\t!props.lAlign ? local['lAlign'] = 'center' : local['lAlign'] = props.lAlign;\n\t} else {\n\t\tlocal['sAlign'] = props.defaultAlign;\n\t\tlocal['mAlign'] = props.defaultAlign;\n\t\tlocal['lAlign'] = props.defaultAlign;\n\t}\n\tfor (var key in local) {\n\t\tif (local[key] === 'left') local[key] = 'flex-start';\n\t\tif (local[key] === 'right') local[key] = 'flex-end';\n\t}\n\n\treturn '\\n\\t\\t\\t@media (' + _styleVariables2.default.media.mobile + ') {\\n\\t\\t\\t\\tjustify-content: ' + local.sAlign + ';\\n\\t\\t\\t}\\n\\t\\t\\t@media (' + _styleVariables2.default.media.tablet2 + ') {\\n\\t\\t\\t\\tjustify-content: ' + local.mAlign + ';\\n\\t\\t\\t}\\n\\t\\t\\t@media (' + _styleVariables2.default.media.desktop2 + ') {\\n\\t\\t\\t\\tjustify-content: ' + local.lAlign + ';\\n\\t\\t\\t}\\n\\t\\t';\n});\n\nexports.default = RowBase;\n\n//# sourceURL=webpack:///./src/shared/components/bases/RowBase.js?");

/***/ }),

/***/ "./src/shared/components/bases/index.js":
/*!**********************************************!*\
  !*** ./src/shared/components/bases/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.BackgroundBase = exports.RowBase = exports.ColBase = exports.MarginBase = undefined;\n\nvar _MarginBase = __webpack_require__(/*! ./MarginBase */ \"./src/shared/components/bases/MarginBase.js\");\n\nvar _ColBase = __webpack_require__(/*! ./ColBase */ \"./src/shared/components/bases/ColBase.js\");\n\nvar _ColBase2 = _interopRequireDefault(_ColBase);\n\nvar _RowBase = __webpack_require__(/*! ./RowBase */ \"./src/shared/components/bases/RowBase.js\");\n\nvar _RowBase2 = _interopRequireDefault(_RowBase);\n\nvar _BackgroundBase = __webpack_require__(/*! ./BackgroundBase */ \"./src/shared/components/bases/BackgroundBase.js\");\n\nvar _BackgroundBase2 = _interopRequireDefault(_BackgroundBase);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.MarginBase = _MarginBase.MarginBase;\nexports.ColBase = _ColBase2.default;\nexports.RowBase = _RowBase2.default;\nexports.BackgroundBase = _BackgroundBase2.default;\n\n//# sourceURL=webpack:///./src/shared/components/bases/index.js?");

/***/ }),

/***/ "./src/shared/components/forms/Button.js":
/*!***********************************************!*\
  !*** ./src/shared/components/forms/Button.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\tdisplay: block;\\n\\theight: 13rem;\\n\\twidth: 13rem;\\n\\tborder-radius: 10px;\\n\\tdisplay: flex;\\n\\tjustify-content: center;\\n\\talign-items: center;\\n\\tcursor: pointer;\\n\\tuser-select: none;\\n\\t', ';\\n\\t', ';\\n\\t', '\\n\\t', ';\\n'], ['\\n\\tdisplay: block;\\n\\theight: 13rem;\\n\\twidth: 13rem;\\n\\tborder-radius: 10px;\\n\\tdisplay: flex;\\n\\tjustify-content: center;\\n\\talign-items: center;\\n\\tcursor: pointer;\\n\\tuser-select: none;\\n\\t', ';\\n\\t', ';\\n\\t', '\\n\\t', ';\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _TextBase = __webpack_require__(/*! Components/TextBase.js */ \"./src/shared/components/TextBase.js\");\n\nvar _BackgroundBase = __webpack_require__(/*! Components/bases/BackgroundBase.js */ \"./src/shared/components/bases/BackgroundBase.js\");\n\nvar _BackgroundBase2 = _interopRequireDefault(_BackgroundBase);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar Button = _styledComponents2.default.div(_templateObject, _TextBase.TextBase, _BackgroundBase2.default, function (props) {\n\tif (props.blockCenter) return 'margin: 0 auto;';\n}, function (props) {\n\treturn props.css ? props.css : '';\n});\n\nexports.default = Button;\n\n//# sourceURL=webpack:///./src/shared/components/forms/Button.js?");

/***/ }),

/***/ "./src/shared/components/forms/Input.js":
/*!**********************************************!*\
  !*** ./src/shared/components/forms/Input.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\n// import Select   from './select';\n// import Text     from './text';\n// import Radio    from './radio';\n// import Checkbox from './checkbox';\n\n// import Select   from './select';\n\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _TextBase = __webpack_require__(/*! Components/TextBase */ \"./src/shared/components/TextBase.js\");\n\nvar _reactDom = __webpack_require__(/*! react-dom */ \"react-dom\");\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nvar _server = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n\nvar _inputText = __webpack_require__(/*! ./input-text */ \"./src/shared/components/forms/input-text/index.js\");\n\nvar _inputText2 = _interopRequireDefault(_inputText);\n\nvar _inputRadio = __webpack_require__(/*! ./input-radio */ \"./src/shared/components/forms/input-radio/index.js\");\n\nvar _inputRadio2 = _interopRequireDefault(_inputRadio);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// import Checkbox from './checkbox';\n\n\nvar Input = function Input(props) {\n\tswitch (props.type) {\n\t\tcase 'text':\n\t\t\treturn _react2.default.createElement(_inputText2.default, props);break;\n\t\t// case 'number':   return <Text {...props}/>;   break;\n\t\tcase 'radio':\n\t\t\treturn _react2.default.createElement(_inputRadio2.default, props);break;\n\t\t// case 'select':   return <Select {...props}/>; break;\n\t\t// case 'checkbox': return <Checkbox {...props}/>; break;\n\t}\n\treturn _react2.default.createElement('input', _extends({ type: 'text' }, props));\n};\nexports.default = Input;\n\n//# sourceURL=webpack:///./src/shared/components/forms/Input.js?");

/***/ }),

/***/ "./src/shared/components/forms/bases/GridBase.js":
/*!*******************************************************!*\
  !*** ./src/shared/components/forms/bases/GridBase.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _templateObject = _taggedTemplateLiteral([\"\\n\\t\", \"\\n\"], [\"\\n\\t\", \"\\n\"]);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar GridBase = (0, _styledComponents.css)(_templateObject, function (props) {\n\tif (!props.s) props.s = 12;\n\tif (!props.m) props.m = 12;\n\tif (!props.l) props.l = 12;\n\t//regra de 3, onde 12 é o numero total de colunas\n\tvar sWidth = 100 / 12 * props.s;\n\tvar mWidth = 100 / 12 * props.m;\n\tvar lWidth = 100 / 12 * props.l;\n\treturn \"\\n\\t\\t\\t@media (\" + _styleVariables2.default.media.mobile + \") {\\n\\t\\t\\t\\twidth: \" + sWidth + \"%;\\n\\t\\t\\t}\\n\\t\\t\\t@media (\" + _styleVariables2.default.media.tablet2 + \") {\\n\\t\\t\\t\\twidth: \" + mWidth + \"%;\\n\\t\\t\\t}\\n\\t\\t\\t@media (\" + _styleVariables2.default.media.desktop2 + \") {\\n\\t\\t\\t\\twidth: \" + lWidth + \"%;\\n\\t\\t\\t}\\n\\t\\t\";\n});\n\nexports.default = GridBase;\n\n//# sourceURL=webpack:///./src/shared/components/forms/bases/GridBase.js?");

/***/ }),

/***/ "./src/shared/components/forms/bases/InputBase.js":
/*!********************************************************!*\
  !*** ./src/shared/components/forms/bases/InputBase.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\tbackground: transparent;\\n\\twidth: 100%;\\n\\theight: 3rem;\\n\\tborder: none;\\n\\tborder-bottom: 0.1rem solid white;\\n\\tz-index: 1;\\n\\t', ';\\n\\t', ';\\n\\t', '\\n'], ['\\n\\tbackground: transparent;\\n\\twidth: 100%;\\n\\theight: 3rem;\\n\\tborder: none;\\n\\tborder-bottom: 0.1rem solid white;\\n\\tz-index: 1;\\n\\t', ';\\n\\t', ';\\n\\t', '\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _TextBase = __webpack_require__(/*! Components/TextBase */ \"./src/shared/components/TextBase.js\");\n\nvar _InputSizeBase = __webpack_require__(/*! ./InputSizeBase */ \"./src/shared/components/forms/bases/InputSizeBase.js\");\n\nvar _InputSizeBase2 = _interopRequireDefault(_InputSizeBase);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar InputBase = (0, _styledComponents.css)(_templateObject, _TextBase.TextBase, _InputSizeBase2.default, function (props) {\n\tif (props.noBorder) {\n\t\treturn 'border: none';\n\t}\n});\n\nexports.default = InputBase;\n\n//# sourceURL=webpack:///./src/shared/components/forms/bases/InputBase.js?");

/***/ }),

/***/ "./src/shared/components/forms/bases/InputSizeBase.js":
/*!************************************************************!*\
  !*** ./src/shared/components/forms/bases/InputSizeBase.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\t', '\\n'], ['\\n\\t', '\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar InputSizeBase = (0, _styledComponents.css)(_templateObject, function (props) {\n\tif (props.small) {\n\t\treturn 'height: 2.5rem; font-size: calc(2.5rem - 1rem)';\n\t} else if (props.normal) {\n\t\treturn 'height: 3rem; font-size: calc(3rem - 1rem)';\n\t} else if (props.regular) {\n\t\treturn 'height: 4.5rem; font-size: calc(4.5rem - 1rem)';\n\t} else if (props.big) {\n\t\treturn 'height: 5rem; font-size: calc(5rem - 1rem)';\n\t} else if (props.huge) {\n\t\treturn 'height: 5.5rem; font-size: calc(5.5rem - 1rem)';\n\t}\n});\n\nexports.default = InputSizeBase;\n\n//# sourceURL=webpack:///./src/shared/components/forms/bases/InputSizeBase.js?");

/***/ }),

/***/ "./src/shared/components/forms/bases/index.js":
/*!****************************************************!*\
  !*** ./src/shared/components/forms/bases/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.InputBase = exports.InputSizeBase = exports.GridBase = undefined;\n\nvar _GridBase = __webpack_require__(/*! ./GridBase */ \"./src/shared/components/forms/bases/GridBase.js\");\n\nvar _GridBase2 = _interopRequireDefault(_GridBase);\n\nvar _InputBase = __webpack_require__(/*! ./InputBase */ \"./src/shared/components/forms/bases/InputBase.js\");\n\nvar _InputBase2 = _interopRequireDefault(_InputBase);\n\nvar _InputSizeBase = __webpack_require__(/*! ./InputSizeBase */ \"./src/shared/components/forms/bases/InputSizeBase.js\");\n\nvar _InputSizeBase2 = _interopRequireDefault(_InputSizeBase);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.GridBase = _GridBase2.default;\nexports.InputSizeBase = _InputSizeBase2.default;\nexports.InputBase = _InputBase2.default;\n\n//# sourceURL=webpack:///./src/shared/components/forms/bases/index.js?");

/***/ }),

/***/ "./src/shared/components/forms/input-radio/InputRadio.js":
/*!***************************************************************!*\
  !*** ./src/shared/components/forms/input-radio/InputRadio.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\topacity: 0;\\n\\tcursor: pointer;\\n\\tdisplay: inline;\\n\\tz-index: 2;\\n\\twidth: 2rem;\\n\\theight: 2rem;\\n\\tmargin: 0 0.25rem 0 0.25rem;\\n\\t&:checked ~ .checkmark {\\n\\t\\ttop: 0.25rem;\\n\\t\\topacity: 1;\\n\\t\\tvisibility: visible;\\n\\t}\\n'], ['\\n\\topacity: 0;\\n\\tcursor: pointer;\\n\\tdisplay: inline;\\n\\tz-index: 2;\\n\\twidth: 2rem;\\n\\theight: 2rem;\\n\\tmargin: 0 0.25rem 0 0.25rem;\\n\\t&:checked ~ .checkmark {\\n\\t\\ttop: 0.25rem;\\n\\t\\topacity: 1;\\n\\t\\tvisibility: visible;\\n\\t}\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar InputRadio = _styledComponents2.default.input.attrs({\n\ttype: 'radio'\n})(_templateObject);\n\nexports.default = InputRadio;\n\n//# sourceURL=webpack:///./src/shared/components/forms/input-radio/InputRadio.js?");

/***/ }),

/***/ "./src/shared/components/forms/input-radio/LabelRadio.js":
/*!***************************************************************!*\
  !*** ./src/shared/components/forms/input-radio/LabelRadio.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\t', '\\n\\tdisplay: inline;\\n'], ['\\n\\t', '\\n\\tdisplay: inline;\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _Components = __webpack_require__(/*! Components */ \"./src/shared/components/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar LabelRadio = _styledComponents2.default.label(_templateObject, _Components.TextBase);\n\nexports.default = LabelRadio;\n\n//# sourceURL=webpack:///./src/shared/components/forms/input-radio/LabelRadio.js?");

/***/ }),

/***/ "./src/shared/components/forms/input-radio/RadioCheckmark.js":
/*!*******************************************************************!*\
  !*** ./src/shared/components/forms/input-radio/RadioCheckmark.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\twidth: 1.5rem;\\n\\theight: 1.5rem;\\n\\tborder-radius: 100%;\\n\\tbackground: ', ';\\n\\ttop: -5rem;\\n\\tleft: 0.25rem;\\n\\topacity: 0;\\n\\tposition: absolute;\\n\\tz-index: 100;\\n\\tvisibility: hidden;\\n\\ttransition: all 0.3s;\\n'], ['\\n\\twidth: 1.5rem;\\n\\theight: 1.5rem;\\n\\tborder-radius: 100%;\\n\\tbackground: ', ';\\n\\ttop: -5rem;\\n\\tleft: 0.25rem;\\n\\topacity: 0;\\n\\tposition: absolute;\\n\\tz-index: 100;\\n\\tvisibility: hidden;\\n\\ttransition: all 0.3s;\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar RadioCheckmark = _styledComponents2.default.div.attrs({\n\tclassName: 'checkmark'\n})(_templateObject, _styleVariables2.default.normalGreen);\n\nexports.default = RadioCheckmark;\n\n//# sourceURL=webpack:///./src/shared/components/forms/input-radio/RadioCheckmark.js?");

/***/ }),

/***/ "./src/shared/components/forms/input-radio/WrapRadio.js":
/*!**************************************************************!*\
  !*** ./src/shared/components/forms/input-radio/WrapRadio.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\twidth: auto;\\n\\theight: auto;\\n\\tposition: relative;\\n\\tcursor: pointer;\\n\\tdisplay: flex;\\n\\talign-items: center;\\n\\tmargin-right: 1rem;\\n\\toverflow: visible;\\n\\t&::before {\\n\\t\\tcontent: \\'\\';\\n\\t\\twidth: 2rem;\\n\\t\\theight: 2rem;\\n\\t\\tborder-radius: 100%;\\n\\t\\tbackground: ', ';\\n\\t\\ttop: 0px;\\n\\t\\tleft: 0px;\\n\\t\\tposition: absolute;\\n\\t}\\n\\t', ';\\n'], ['\\n\\twidth: auto;\\n\\theight: auto;\\n\\tposition: relative;\\n\\tcursor: pointer;\\n\\tdisplay: flex;\\n\\talign-items: center;\\n\\tmargin-right: 1rem;\\n\\toverflow: visible;\\n\\t&::before {\\n\\t\\tcontent: \\'\\';\\n\\t\\twidth: 2rem;\\n\\t\\theight: 2rem;\\n\\t\\tborder-radius: 100%;\\n\\t\\tbackground: ', ';\\n\\t\\ttop: 0px;\\n\\t\\tleft: 0px;\\n\\t\\tposition: absolute;\\n\\t}\\n\\t', ';\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar WrapRadio = _styledComponents2.default.div(_templateObject, _styleVariables2.default.lightLilac, function (props) {\n\treturn props.css ? props.css : '';\n});\n\nexports.default = WrapRadio;\n\n//# sourceURL=webpack:///./src/shared/components/forms/input-radio/WrapRadio.js?");

/***/ }),

/***/ "./src/shared/components/forms/input-radio/index.js":
/*!**********************************************************!*\
  !*** ./src/shared/components/forms/input-radio/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.RadioCheckmark = exports.WrapRadio = exports.LabelRadio = exports.InputRadio = undefined;\n\nvar _InputRadio = __webpack_require__(/*! ./InputRadio */ \"./src/shared/components/forms/input-radio/InputRadio.js\");\n\nvar _InputRadio2 = _interopRequireDefault(_InputRadio);\n\nvar _LabelRadio = __webpack_require__(/*! ./LabelRadio */ \"./src/shared/components/forms/input-radio/LabelRadio.js\");\n\nvar _LabelRadio2 = _interopRequireDefault(_LabelRadio);\n\nvar _WrapRadio = __webpack_require__(/*! ./WrapRadio */ \"./src/shared/components/forms/input-radio/WrapRadio.js\");\n\nvar _WrapRadio2 = _interopRequireDefault(_WrapRadio);\n\nvar _RadioCheckmark = __webpack_require__(/*! ./RadioCheckmark */ \"./src/shared/components/forms/input-radio/RadioCheckmark.js\");\n\nvar _RadioCheckmark2 = _interopRequireDefault(_RadioCheckmark);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.InputRadio = _InputRadio2.default;\nexports.LabelRadio = _LabelRadio2.default;\nexports.WrapRadio = _WrapRadio2.default;\nexports.RadioCheckmark = _RadioCheckmark2.default;\n\n//# sourceURL=webpack:///./src/shared/components/forms/input-radio/index.js?");

/***/ }),

/***/ "./src/shared/components/forms/input-text/InputText.js":
/*!*************************************************************!*\
  !*** ./src/shared/components/forms/input-text/InputText.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\tappearence: textfield;\\n\\tpadding: 0.5rem;\\n\\tz-index: 2;\\n\\toverflow-x: auto;\\n\\t&:focus {\\n\\t\\toutline: none;\\n\\t}\\n\\t&:disabled {\\n\\t\\tcolor: #ccc;\\n\\t\\tfont-style: italic;\\n\\t\\tuser-select: none;\\n\\t\\t&::placeholder {\\n\\t\\t\\tcolor: #ccc;\\n\\t\\t\\tfont-style: italic;\\n\\t\\t\\tuser-select: none;\\n\\t\\t}\\n\\t}\\n\\t&::placeholder {\\n\\t\\tcolor: white;\\n\\t\\t', '\\n\\t\\t', '\\n\\t\\t', '\\n\\t}\\n\\t', ';\\n\\t', '\\n\\t', '\\n\\t', ';\\n'], ['\\n\\tappearence: textfield;\\n\\tpadding: 0.5rem;\\n\\tz-index: 2;\\n\\toverflow-x: auto;\\n\\t&:focus {\\n\\t\\toutline: none;\\n\\t}\\n\\t&:disabled {\\n\\t\\tcolor: #ccc;\\n\\t\\tfont-style: italic;\\n\\t\\tuser-select: none;\\n\\t\\t&::placeholder {\\n\\t\\t\\tcolor: #ccc;\\n\\t\\t\\tfont-style: italic;\\n\\t\\t\\tuser-select: none;\\n\\t\\t}\\n\\t}\\n\\t&::placeholder {\\n\\t\\tcolor: white;\\n\\t\\t', '\\n\\t\\t', '\\n\\t\\t', '\\n\\t}\\n\\t', ';\\n\\t', '\\n\\t', '\\n\\t', ';\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _bases = __webpack_require__(/*! Components/forms/bases */ \"./src/shared/components/forms/bases/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar InputText = _styledComponents2.default.input.attrs({\n\ttype: 'text'\n})(_templateObject, function (props) {\n\tif (props.phRight) {\n\t\treturn 'text-align: right;';\n\t} else if (props.phCenter) {\n\t\treturn 'text-align: center;';\n\t}\n}, function (props) {\n\tif (props.phWeightBold) {\n\t\treturn 'font-weight: bold;';\n\t} else if (props.phWeightLight) {\n\t\treturn 'font-weight: 100;';\n\t}\n}, function (props) {\n\tif (props.phStyleItalic) return 'font-style: italic;';\n}, _bases.InputBase, _bases.InputSizeBase, function (props) {\n\tif (props.whiteTheme) {\n\t\treturn '\\n\\t\\t\\t\\tborder-color: white;\\n\\t\\t\\t\\tcolor: white;\\n\\t\\t\\t\\t& + label {\\n\\t\\t\\t\\t\\tcolor: white;\\n\\t\\t\\t\\t\\tborder-color: white;\\n\\t\\t\\t\\t\\ttext-shadow: 0px 0px 0px white;\\n\\t\\t\\t\\t}';\n\t} else if (props.darkLilacTheme) {\n\t\treturn '\\n\\t\\t\\t\\tborder-color: ' + _styleVariables2.default.darkLilac + ';\\n\\t\\t\\t\\tcolor: ' + _styleVariables2.default.lightLilac + ';\\n\\t\\t\\t\\t& + label {\\n\\t\\t\\t\\t\\tcolor: ' + _styleVariables2.default.darkLilac + ';\\n\\t\\t\\t\\t\\tborder-color: ' + _styleVariables2.default.darkLilac + ';\\n\\t\\t\\t\\t\\ttext-shadow: 0px 0px 0px ' + _styleVariables2.default.darkLilac + ';\\n\\t\\t\\t\\t}';\n\t} else if (props.lightLilacTheme) {\n\t\treturn '\\n\\t\\t\\t\\tborder-color: ' + _styleVariables2.default.lightLilac + ';\\n\\t\\t\\t\\tcolor: white;\\n\\t\\t\\t\\t& + label {\\n\\t\\t\\t\\t\\tcolor: ' + _styleVariables2.default.lightLilac + ';\\n\\t\\t\\t\\t\\tborder-color: ' + _styleVariables2.default.lightLilac + ';\\n\\t\\t\\t\\t\\ttext-shadow: 0px 0px 0px ' + _styleVariables2.default.lightLilac + ';\\n\\t\\t\\t\\t}';\n\t}\n}, function (props) {\n\treturn props.css ? props.css : '';\n});\n\nexports.default = InputText;\n\n//# sourceURL=webpack:///./src/shared/components/forms/input-text/InputText.js?");

/***/ }),

/***/ "./src/shared/components/forms/input-text/index.js":
/*!*********************************************************!*\
  !*** ./src/shared/components/forms/input-text/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.InputText = undefined;\n\nvar _InputText = __webpack_require__(/*! ./InputText */ \"./src/shared/components/forms/input-text/InputText.js\");\n\nvar _InputText2 = _interopRequireDefault(_InputText);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.InputText = _InputText2.default;\n\n//# sourceURL=webpack:///./src/shared/components/forms/input-text/index.js?");

/***/ }),

/***/ "./src/shared/components/index.js":
/*!****************************************!*\
  !*** ./src/shared/components/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.Loading = exports.Img = exports.Text = exports.H3 = exports.H2 = exports.H1 = exports.BackgroundBase = exports.TextBase = exports.Button = exports.Input = exports.Row = exports.Col = undefined;\n\nvar _Col = __webpack_require__(/*! ./Col */ \"./src/shared/components/Col.js\");\n\nvar _Row = __webpack_require__(/*! ./Row */ \"./src/shared/components/Row.js\");\n\nvar _Input = __webpack_require__(/*! ./forms/Input */ \"./src/shared/components/forms/Input.js\");\n\nvar _Input2 = _interopRequireDefault(_Input);\n\nvar _Button = __webpack_require__(/*! ./forms/Button */ \"./src/shared/components/forms/Button.js\");\n\nvar _Button2 = _interopRequireDefault(_Button);\n\nvar _TextBase = __webpack_require__(/*! ./TextBase */ \"./src/shared/components/TextBase.js\");\n\nvar _bases = __webpack_require__(/*! ./bases */ \"./src/shared/components/bases/index.js\");\n\nvar _H = __webpack_require__(/*! ./H1 */ \"./src/shared/components/H1.js\");\n\nvar _H2 = __webpack_require__(/*! ./H2 */ \"./src/shared/components/H2.js\");\n\nvar _H3 = __webpack_require__(/*! ./H3 */ \"./src/shared/components/H3.js\");\n\nvar _Text = __webpack_require__(/*! ./Text */ \"./src/shared/components/Text.js\");\n\nvar _Img = __webpack_require__(/*! ./Img */ \"./src/shared/components/Img.js\");\n\nvar _Loading = __webpack_require__(/*! ./Loading */ \"./src/shared/components/Loading.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.Col = _Col.Col;\nexports.Row = _Row.Row;\nexports.Input = _Input2.default;\nexports.Button = _Button2.default;\nexports.TextBase = _TextBase.TextBase;\nexports.BackgroundBase = _bases.BackgroundBase;\nexports.H1 = _H.H1;\nexports.H2 = _H2.H2;\nexports.H3 = _H3.H3;\nexports.Text = _Text.Text;\nexports.Img = _Img.Img;\nexports.Loading = _Loading.Loading;\n\n//# sourceURL=webpack:///./src/shared/components/index.js?");

/***/ }),

/***/ "./src/shared/config/constants.js":
/*!****************************************!*\
  !*** ./src/shared/config/constants.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nvar testnet = 'TRUE'; //it should comes from .env, well... maybe\nvar ENV = 'development'; //|| 'production'\nvar TESTNET = testnet === 'TRUE' ? true : false;\nvar LUNES_LIB_ENV = 'staging'; //'staging' || 'development' || 'production'\nvar LUNES_LIB_LOGIN = 'auto'; //| 'auto' || 'manual', isso serve para fazer login automático para nao ficar apertando o botão de login sempre\nexports.TESTNET = TESTNET;\nexports.LUNES_LIB_ENV = LUNES_LIB_ENV;\nexports.LUNES_LIB_LOGIN = LUNES_LIB_LOGIN;\nexports.ENV = ENV;\n\n//# sourceURL=webpack:///./src/shared/config/constants.js?");

/***/ }),

/***/ "./src/shared/config/isCoinAvaliable.js":
/*!**********************************************!*\
  !*** ./src/shared/config/isCoinAvaliable.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nexports.default = function (coin) {\n\tvar coins = ['btc', 'eth'];\n\n\tif (coins.indexOf(coin) !== -1) return true;else return false;\n};\n\n//# sourceURL=webpack:///./src/shared/config/isCoinAvaliable.js?");

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _templateObject = _taggedTemplateLiteral(['\\n  width: 65px;\\n  min-width: 65px;\\n\\theight: 100%;\\n\\tdisplay: block;\\n\\tbackground: ', ';\\n\\tz-index: 3;\\n  transition: .2s ease-in;\\n\\n  @media (', ') {\\n    width: 160px;\\n  }\\n'], ['\\n  width: 65px;\\n  min-width: 65px;\\n\\theight: 100%;\\n\\tdisplay: block;\\n\\tbackground: ', ';\\n\\tz-index: 3;\\n  transition: .2s ease-in;\\n\\n  @media (', ') {\\n    width: 160px;\\n  }\\n']),\n    _templateObject2 = _taggedTemplateLiteral(['\\n  display: flex;\\n  flex-wrap: nowrap;\\n\\tjustify-content: flex-start;\\n  margin: 1rem 0;\\n  padding: 1rem 0;\\n  width: 100%;\\n  display: 0;\\n'], ['\\n  display: flex;\\n  flex-wrap: nowrap;\\n\\tjustify-content: flex-start;\\n  margin: 1rem 0;\\n  padding: 1rem 0;\\n  width: 100%;\\n  display: 0;\\n']),\n    _templateObject3 = _taggedTemplateLiteral(['\\n\\twidth: 25px;\\n\\theight: 25px;\\n  transition: .2s;\\n'], ['\\n\\twidth: 25px;\\n\\theight: 25px;\\n  transition: .2s;\\n']),\n    _templateObject4 = _taggedTemplateLiteral(['\\n  ', ';\\n  margin-left: 1rem;\\n  display: none;\\n  font-weight: 700;\\n  transition: .2s;\\n\\n  @media (', ') {\\n    display: inline-block;\\n  }\\n'], ['\\n  ', ';\\n  margin-left: 1rem;\\n  display: none;\\n  font-weight: 700;\\n  transition: .2s;\\n\\n  @media (', ') {\\n    display: inline-block;\\n  }\\n']),\n    _templateObject5 = _taggedTemplateLiteral(['\\n  width: 8px;\\n  height: 56px;\\n  margin-right: 8px;\\n  background-color: #4cd566;\\n  border: solid 1px #4cd566;\\n  opacity: 0;\\n  \\n  &.active {\\n    opacity: 1;\\n  } \\n'], ['\\n  width: 8px;\\n  height: 56px;\\n  margin-right: 8px;\\n  background-color: #4cd566;\\n  border: solid 1px #4cd566;\\n  opacity: 0;\\n  \\n  &.active {\\n    opacity: 1;\\n  } \\n']),\n    _templateObject6 = _taggedTemplateLiteral(['\\n\\t', ';\\n  color: white;\\n\\tline-height: 25px;\\n  text-decoration: none;\\n  transition-delay: .2s;\\n  display: flex;\\n  align-items: center;\\n  transition: .2s;\\n  opacity: 0.3;\\n  \\n  &:hover {\\n    opacity: 1;\\n  }\\n\\n  &.active {\\n    opacity: 1;\\n\\n    opacity: 1;\\n    width: 8px;\\n    height: 56px;\\n    border-left: solid 8px #4cd566;\\n    padding-left: 10px;\\n  } \\n'], ['\\n\\t', ';\\n  color: white;\\n\\tline-height: 25px;\\n  text-decoration: none;\\n  transition-delay: .2s;\\n  display: flex;\\n  align-items: center;\\n  transition: .2s;\\n  opacity: 0.3;\\n  \\n  &:hover {\\n    opacity: 1;\\n  }\\n\\n  &.active {\\n    opacity: 1;\\n\\n    opacity: 1;\\n    width: 8px;\\n    height: 56px;\\n    border-left: solid 8px #4cd566;\\n    padding-left: 10px;\\n  } \\n']);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _TextBase = __webpack_require__(/*! Components/TextBase */ \"./src/shared/components/TextBase.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar StyledPanelLeft = _styledComponents2.default.div(_templateObject, _styleVariables2.default.normalLilac2, _styleVariables2.default.media.tablet2);\n\nvar WrapLink = _styledComponents2.default.div(_templateObject2);\n\nvar Icon = _styledComponents2.default.img(_templateObject3);\n\nvar CustomText = _styledComponents2.default.div(_templateObject4, _TextBase.TextBase, _styleVariables2.default.media.tablet2);\n\nvar Rectangle = _styledComponents2.default.div(_templateObject5);\n\nvar CustomLink = (0, _styledComponents2.default)(_reactRouterDom.NavLink)(_templateObject6, _TextBase.TextBase);\n\nvar ItemMenuApp = function (_React$Component) {\n  _inherits(ItemMenuApp, _React$Component);\n\n  function ItemMenuApp() {\n    _classCallCheck(this, ItemMenuApp);\n\n    return _possibleConstructorReturn(this, (ItemMenuApp.__proto__ || Object.getPrototypeOf(ItemMenuApp)).apply(this, arguments));\n  }\n\n  _createClass(ItemMenuApp, [{\n    key: 'render',\n    value: function render() {\n      return _react2.default.createElement(\n        'div',\n        null,\n        _react2.default.createElement(\n          WrapLink,\n          null,\n          _react2.default.createElement(\n            CustomLink,\n            this.props,\n            _react2.default.createElement(Icon, { src: '/img/app_panel_left/' + this.props.icon, alt: this.props.label }),\n            _react2.default.createElement(\n              CustomText,\n              { size: '1.4rem' },\n              this.props.label\n            )\n          )\n        )\n      );\n    }\n  }]);\n\n  return ItemMenuApp;\n}(_react2.default.Component);\n\nvar PanelLeft = function (_React$Component2) {\n  _inherits(PanelLeft, _React$Component2);\n\n  function PanelLeft() {\n    _classCallCheck(this, PanelLeft);\n\n    return _possibleConstructorReturn(this, (PanelLeft.__proto__ || Object.getPrototypeOf(PanelLeft)).apply(this, arguments));\n  }\n\n  _createClass(PanelLeft, [{\n    key: 'render',\n    value: function render() {\n      return _react2.default.createElement(\n        StyledPanelLeft,\n        null,\n        _react2.default.createElement(ItemMenuApp, {\n          label: 'Home',\n          to: '/app/home',\n          icon: 'ic_home.svg',\n          activeClassName: 'active' }),\n        _react2.default.createElement(ItemMenuApp, {\n          label: 'Portf\\xF3lio',\n          to: '/app/portfolio',\n          icon: 'ic_portfolio.svg',\n          activeClassName: 'active' }),\n        _react2.default.createElement(ItemMenuApp, {\n          label: 'Wallet',\n          to: '/app/wallet',\n          icon: 'ic_wallet.svg',\n          activeClassName: 'active' }),\n        _react2.default.createElement(ItemMenuApp, {\n          label: 'Recargas',\n          to: '/app/recharge',\n          icon: 'ic_recharge.svg',\n          activeClassName: 'active' }),\n        _react2.default.createElement(ItemMenuApp, {\n          label: 'Boleto',\n          to: '/app/ticket',\n          icon: 'ic_barcode.svg',\n          activeClassName: 'active' }),\n        _react2.default.createElement(ItemMenuApp, {\n          label: 'Compras',\n          to: '/app/buy',\n          icon: 'ic_buy.svg',\n          activeClassName: 'active' }),\n        _react2.default.createElement(ItemMenuApp, {\n          label: 'Configura\\xE7\\xE3o',\n          to: '/app/configuration',\n          icon: 'ic_config.svg',\n          activeClassName: 'active' }),\n        _react2.default.createElement(ItemMenuApp, {\n          label: 'Privacidade',\n          to: '/app/privacy',\n          icon: 'ic_privacy.svg',\n          activeClassName: 'active' })\n      );\n    }\n  }]);\n\n  return PanelLeft;\n}(_react2.default.Component);\n\nexports.default = PanelLeft;\n\n//# sourceURL=webpack:///./src/shared/containers/App/PanelLeft.js?");

/***/ }),

/***/ "./src/shared/containers/App/PanelRight.js":
/*!*************************************************!*\
  !*** ./src/shared/containers/App/PanelRight.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\toverflow: auto;\\n\\tbackground: ', ';\\n\\twidth: 100%;\\n\\theight: 100%;\\n'], ['\\n\\toverflow: auto;\\n\\tbackground: ', ';\\n\\twidth: 100%;\\n\\theight: 100%;\\n']);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar PanelRight = _styledComponents2.default.div(_templateObject, _styleVariables2.default.normalLilac);\n\nexports.default = PanelRight;\n\n//# sourceURL=webpack:///./src/shared/containers/App/PanelRight.js?");

/***/ }),

/***/ "./src/shared/containers/App/index.js":
/*!********************************************!*\
  !*** ./src/shared/containers/App/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\twidth: 100%;\\n\\theight: 100%;\\n\\tdisplay: flex;\\n'], ['\\n\\twidth: 100%;\\n\\theight: 100%;\\n\\tdisplay: flex;\\n']),\n    _templateObject2 = _taggedTemplateLiteral(['\\n\\twidth: 100%;\\n\\theight: 100vh;\\n\\tmax-height: 100vh;\\n\\tmax-width: 100vw;\\n\\toverflow: hidden;\\n\\tposition: relative;\\n\\n\\t// & > * {\\n\\t// \\toverflow-y: auto;\\n\\t// }\\n'], ['\\n\\twidth: 100%;\\n\\theight: 100vh;\\n\\tmax-height: 100vh;\\n\\tmax-width: 100vw;\\n\\toverflow: hidden;\\n\\tposition: relative;\\n\\n\\t// & > * {\\n\\t// \\toverflow-y: auto;\\n\\t// }\\n']),\n    _templateObject3 = _taggedTemplateLiteral(['\\n\\tpadding: 0 50px 0 50px;\\n'], ['\\n\\tpadding: 0 50px 0 50px;\\n']),\n    _templateObject4 = _taggedTemplateLiteral(['\\n\\twidth: 100px;\\n'], ['\\n\\twidth: 100px;\\n']),\n    _templateObject5 = _taggedTemplateLiteral(['\\n\\tmargin-left: auto;\\n\\tpadding: 0 50px 0 50px;\\n'], ['\\n\\tmargin-left: auto;\\n\\tpadding: 0 50px 0 50px;\\n']),\n    _templateObject6 = _taggedTemplateLiteral(['\\n\\t', '\\n'], ['\\n\\t', '\\n']);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _functions = __webpack_require__(/*! Utils/functions */ \"./src/shared/utils/functions.js\");\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _lunesLib = __webpack_require__(/*! lunes-lib */ \"lunes-lib\");\n\nvar _history = __webpack_require__(/*! history */ \"history\");\n\nvar _index = __webpack_require__(/*! Containers/User/Login/index */ \"./src/shared/containers/User/Login/index.js\");\n\nvar _index2 = _interopRequireDefault(_index);\n\nvar _index3 = __webpack_require__(/*! Containers/Home/index */ \"./src/shared/containers/Home/index.js\");\n\nvar _index4 = _interopRequireDefault(_index3);\n\nvar _index5 = __webpack_require__(/*! Containers/Portfolio/index */ \"./src/shared/containers/Portfolio/index.js\");\n\nvar _index6 = _interopRequireDefault(_index5);\n\nvar _index7 = __webpack_require__(/*! Containers/Wallet/index */ \"./src/shared/containers/Wallet/index.js\");\n\nvar _index8 = _interopRequireDefault(_index7);\n\nvar _index9 = __webpack_require__(/*! Containers/Recharge/index */ \"./src/shared/containers/Recharge/index.js\");\n\nvar _index10 = _interopRequireDefault(_index9);\n\nvar _index11 = __webpack_require__(/*! Containers/Ticket/index */ \"./src/shared/containers/Ticket/index.js\");\n\nvar _index12 = _interopRequireDefault(_index11);\n\nvar _index13 = __webpack_require__(/*! Containers/Buy/index */ \"./src/shared/containers/Buy/index.js\");\n\nvar _index14 = _interopRequireDefault(_index13);\n\nvar _index15 = __webpack_require__(/*! Containers/Configuration/index */ \"./src/shared/containers/Configuration/index.js\");\n\nvar _index16 = _interopRequireDefault(_index15);\n\nvar _index17 = __webpack_require__(/*! Containers/Privacy/index */ \"./src/shared/containers/Privacy/index.js\");\n\nvar _index18 = _interopRequireDefault(_index17);\n\nvar _Link = __webpack_require__(/*! Components/Link */ \"./src/shared/components/Link.js\");\n\nvar _TextBase = __webpack_require__(/*! Components/TextBase */ \"./src/shared/components/TextBase.js\");\n\nvar _Text = __webpack_require__(/*! Components/Text */ \"./src/shared/components/Text.js\");\n\nvar _Header = __webpack_require__(/*! ./Header */ \"./src/shared/containers/App/Header.js\");\n\nvar _Header2 = _interopRequireDefault(_Header);\n\nvar _PanelLeft = __webpack_require__(/*! ./PanelLeft */ \"./src/shared/containers/App/PanelLeft.js\");\n\nvar _PanelLeft2 = _interopRequireDefault(_PanelLeft);\n\nvar _PanelRight = __webpack_require__(/*! ./PanelRight */ \"./src/shared/containers/App/PanelRight.js\");\n\nvar _PanelRight2 = _interopRequireDefault(_PanelRight);\n\nvar _AuthRoute = __webpack_require__(/*! Components/AuthRoute */ \"./src/shared/components/AuthRoute.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\n__webpack_require__(/*! dotenv */ \"dotenv\").load();\n\n//COMPONENTS\n\n\n//SUB-COMPONENTS\n\n// import { checkAuth }    from 'Auth/index';\n\nvar Panels = _styledComponents2.default.div(_templateObject);\nvar WrapApp = _styledComponents2.default.div(_templateObject2);\nvar WrapLogo = _styledComponents2.default.div(_templateObject3);\nvar Logo = _styledComponents2.default.img(_templateObject4);\nvar WrapBalance = _styledComponents2.default.div(_templateObject5);\nvar Balance = _styledComponents2.default.div(_templateObject6, _TextBase.TextBase);\n\nvar App = function (_React$Component) {\n\t_inherits(App, _React$Component);\n\n\tfunction App() {\n\t\t_classCallCheck(this, App);\n\n\t\treturn _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));\n\t}\n\n\t_createClass(App, [{\n\t\tkey: 'componentDidMount',\n\t\tvalue: function componentDidMount() {}\n\t}, {\n\t\tkey: 'componentDidUpdate',\n\t\tvalue: function componentDidUpdate() {}\n\t}, {\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\treturn _react2.default.createElement(\n\t\t\t\tWrapApp,\n\t\t\t\tnull,\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t_Header2.default,\n\t\t\t\t\tnull,\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\tWrapLogo,\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\t_react2.default.createElement(Logo, { src: '/img/logo.svg' })\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\tWrapBalance,\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\tBalance,\n\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t_Text.Text,\n\t\t\t\t\t\t\t\t{ clWhite: true, txLight: true, txInline: true, offSide: true },\n\t\t\t\t\t\t\t\t'Balance: '\n\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t_Text.Text,\n\t\t\t\t\t\t\t\t{ clNormalGreen: true, txNormal: true, txInline: true, offSide: true },\n\t\t\t\t\t\t\t\t'LNS '\n\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t_Text.Text,\n\t\t\t\t\t\t\t\t{ clWhite: true, txNormal: true, txInline: true, offSide: true },\n\t\t\t\t\t\t\t\t'1,300.00'\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t),\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t_Text.Text,\n\t\t\t\t\t\t\t{ clNormalGreen: true, txBold: true, txRight: true, size: '1.6rem' },\n\t\t\t\t\t\t\t'$ 130.00'\n\t\t\t\t\t\t)\n\t\t\t\t\t)\n\t\t\t\t),\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\tPanels,\n\t\t\t\t\tnull,\n\t\t\t\t\t_react2.default.createElement(_PanelLeft2.default, null),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t_PanelRight2.default,\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t_reactRouterDom.Switch,\n\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: \"/app/\", component: _index4.default }),\n\t\t\t\t\t\t\t_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: \"/app/home/\", component: _index4.default }),\n\t\t\t\t\t\t\t_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: \"/app/portfolio/\", component: _index6.default }),\n\t\t\t\t\t\t\t_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: \"/app/wallet/\", component: _index8.default }),\n\t\t\t\t\t\t\t_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: \"/app/recharge/\", component: _index10.default }),\n\t\t\t\t\t\t\t_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: \"/app/ticket/\", component: _index12.default }),\n\t\t\t\t\t\t\t_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: \"/app/buy\", component: _index14.default }),\n\t\t\t\t\t\t\t_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: \"/app/configuration\", component: _index16.default }),\n\t\t\t\t\t\t\t_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: \"/app/privacy\", component: _index18.default })\n\t\t\t\t\t\t)\n\t\t\t\t\t)\n\t\t\t\t)\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn App;\n}(_react2.default.Component);\n\nvar mapStateToProps = function mapStateToProps(state) {\n\treturn {\n\t\tuser: state.user\n\t};\n};\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n\treturn {\n\t\tuserLogin: function userLogin(email, password) {\n\t\t\tdispatch({\n\t\t\t\ttype: 'USER_LOGIN',\n\t\t\t\tpayload: _userLogin(email, password)\n\t\t\t});\n\t\t}\n\t};\n};\nvar _userLogin = function _userLogin(email, password) {\n\treturn _lunesLib.users.login({ email: email, password: password });\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App);\n\n//# sourceURL=webpack:///./src/shared/containers/App/index.js?");

/***/ }),

/***/ "./src/shared/containers/AppSwitcher.js":
/*!**********************************************!*\
  !*** ./src/shared/containers/AppSwitcher.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _history = __webpack_require__(/*! history */ \"history\");\n\nvar _index = __webpack_require__(/*! Containers/App/index */ \"./src/shared/containers/App/index.js\");\n\nvar _index2 = _interopRequireDefault(_index);\n\nvar _index3 = __webpack_require__(/*! Containers/User/Login/index */ \"./src/shared/containers/User/Login/index.js\");\n\nvar _index4 = _interopRequireDefault(_index3);\n\nvar _index5 = __webpack_require__(/*! Containers/User/Registry/index */ \"./src/shared/containers/User/Registry/index.js\");\n\nvar _index6 = _interopRequireDefault(_index5);\n\nvar _index7 = __webpack_require__(/*! Containers/User/Reset/index */ \"./src/shared/containers/User/Reset/index.js\");\n\nvar _index8 = _interopRequireDefault(_index7);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar AppSwitcher = function (_React$Component) {\n  _inherits(AppSwitcher, _React$Component);\n\n  function AppSwitcher() {\n    _classCallCheck(this, AppSwitcher);\n\n    return _possibleConstructorReturn(this, (AppSwitcher.__proto__ || Object.getPrototypeOf(AppSwitcher)).apply(this, arguments));\n  }\n\n  _createClass(AppSwitcher, [{\n    key: \"render\",\n    value: function render() {\n      return _react2.default.createElement(\n        _reactRouterDom.Switch,\n        null,\n        _react2.default.createElement(_reactRouterDom.Route, { strict: true, path: \"/app\", component: _index2.default }),\n        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: \"/login\", component: _index4.default }),\n        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: \"/\", component: _index4.default }),\n        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: \"/registry\", component: _index6.default }),\n        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: \"/reset\", component: _index8.default })\n      );\n    }\n  }]);\n\n  return AppSwitcher;\n}(_react2.default.Component);\n\nexports.default = AppSwitcher;\n\n//# sourceURL=webpack:///./src/shared/containers/AppSwitcher.js?");

/***/ }),

/***/ "./src/shared/containers/Buy/index.js":
/*!********************************************!*\
  !*** ./src/shared/containers/Buy/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Buy = function (_React$Component) {\n\t_inherits(Buy, _React$Component);\n\n\tfunction Buy() {\n\t\t_classCallCheck(this, Buy);\n\n\t\treturn _possibleConstructorReturn(this, (Buy.__proto__ || Object.getPrototypeOf(Buy)).apply(this, arguments));\n\t}\n\n\t_createClass(Buy, [{\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\treturn _react2.default.createElement(\n\t\t\t\t'h1',\n\t\t\t\tnull,\n\t\t\t\t'Buy'\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn Buy;\n}(_react2.default.Component);\n\nexports.default = Buy;\n\n//# sourceURL=webpack:///./src/shared/containers/Buy/index.js?");

/***/ }),

/***/ "./src/shared/containers/Configuration/index.js":
/*!******************************************************!*\
  !*** ./src/shared/containers/Configuration/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Configuration = function (_React$Component) {\n\t_inherits(Configuration, _React$Component);\n\n\tfunction Configuration() {\n\t\t_classCallCheck(this, Configuration);\n\n\t\treturn _possibleConstructorReturn(this, (Configuration.__proto__ || Object.getPrototypeOf(Configuration)).apply(this, arguments));\n\t}\n\n\t_createClass(Configuration, [{\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\treturn _react2.default.createElement(\n\t\t\t\t'h1',\n\t\t\t\tnull,\n\t\t\t\t'Configuration'\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn Configuration;\n}(_react2.default.Component);\n\nexports.default = Configuration;\n\n//# sourceURL=webpack:///./src/shared/containers/Configuration/index.js?");

/***/ }),

/***/ "./src/shared/containers/Home/index.js":
/*!*********************************************!*\
  !*** ./src/shared/containers/Home/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _templateObject = _taggedTemplateLiteral([\"\\n  text-align: center;\\n  padding: 50px 50px;\\n\\twidth: 100%;\\n\\tmargin-bottom: 100px;\\n\"], [\"\\n  text-align: center;\\n  padding: 50px 50px;\\n\\twidth: 100%;\\n\\tmargin-bottom: 100px;\\n\"]),\n    _templateObject2 = _taggedTemplateLiteral([\"\\n  display: inline-block;\\n  margin: 20px;\\n  padding: 20px 0;\\n  width: 299px;\\n  border-radius: 10px;\\n  background-color: #442181;\\n\"], [\"\\n  display: inline-block;\\n  margin: 20px;\\n  padding: 20px 0;\\n  width: 299px;\\n  border-radius: 10px;\\n  background-color: #442181;\\n\"]),\n    _templateObject3 = _taggedTemplateLiteral([\"\\n  margin-top: 10px;\\n  height: 50px;\\n\"], [\"\\n  margin-top: 10px;\\n  height: 50px;\\n\"]),\n    _templateObject4 = _taggedTemplateLiteral([\"\\n  padding: 0 25px;\\n  width: 100%;\\n  height: 96px;\\n  text-align: center;\\n\"], [\"\\n  padding: 0 25px;\\n  width: 100%;\\n  height: 96px;\\n  text-align: center;\\n\"]);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _H = __webpack_require__(/*! Components/H1 */ \"./src/shared/components/H1.js\");\n\nvar _P = __webpack_require__(/*! Components/P */ \"./src/shared/components/P.js\");\n\nvar _Buttons = __webpack_require__(/*! Components/Buttons */ \"./src/shared/components/Buttons.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\n//COMPONENTS\n\n\nvar Container = _styledComponents2.default.div(_templateObject);\n\nvar MainRectangle = _styledComponents2.default.div(_templateObject2);\n\nvar Icon = _styledComponents2.default.img(_templateObject3);\n\nvar TextRectangle = _styledComponents2.default.div(_templateObject4);\n\nvar Home = function (_React$Component) {\n  _inherits(Home, _React$Component);\n\n  function Home() {\n    _classCallCheck(this, Home);\n\n    return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));\n  }\n\n  _createClass(Home, [{\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      return _react2.default.createElement(\n        Container,\n        null,\n        _react2.default.createElement(_reactRouterDom.Redirect, { to: \"/app/home\" }),\n        _react2.default.createElement(\n          MainRectangle,\n          null,\n          _react2.default.createElement(Icon, { src: \"/img/app_panel_left/ic_portfolio.svg\" }),\n          _react2.default.createElement(\n            _H.H1,\n            { fontSize: \"2rem\", margin: \"1.5rem 0 1.5rem 0\", txBold: true, txCenter: true, clWhite: true },\n            \"Portf\\xF3lio\"\n          ),\n          _react2.default.createElement(\n            TextRectangle,\n            null,\n            _react2.default.createElement(\n              _P.P,\n              { fontSize: \"1.4rem\", txCenter: true, clWhite: true },\n              \"Muito obrigado por escolher a Wallet Lunes como sua carteira multicoin. Aproveite da usabilidade e tecnologia desta incr\\xEDvel carteira e armazene suas criptomoedas com um alto n\\xEDvel de seguran\\xE7a..\"\n            )\n          ),\n          _react2.default.createElement(\n            _Buttons.ButtonGreen,\n            { width: \"97px\", margin: \"3rem auto 0.8rem auto\", onClick: function onClick() {\n                return _this2.props.history.push('/app/portfolio');\n              } },\n            \"Entrar\"\n          )\n        ),\n        _react2.default.createElement(\n          MainRectangle,\n          null,\n          _react2.default.createElement(Icon, { src: \"/img/app_panel_left/ic_wallet.svg\" }),\n          _react2.default.createElement(\n            _H.H1,\n            { fontSize: \"2rem\", margin: \"1.5rem 0 1.5rem 0\", txBold: true, txCenter: true, clWhite: true },\n            \"Wallet\"\n          ),\n          _react2.default.createElement(\n            TextRectangle,\n            null,\n            _react2.default.createElement(\n              _P.P,\n              { fontSize: \"1.4rem\", txCenter: true, clWhite: true },\n              \"Muito obrigado por escolher a Wallet Lunes como sua carteira multicoin. Aproveite da usabilidade e tecnologia desta incr\\xEDvel carteira e armazene suas criptomoedas com um alto n\\xEDvel de seguran\\xE7a..\"\n            )\n          ),\n          _react2.default.createElement(\n            _Buttons.ButtonGreen,\n            { width: \"97px\", margin: \"3rem auto 0.8rem auto\", onClick: function onClick() {\n                return _this2.props.history.push('/app/wallet');\n              } },\n            \"Entrar\"\n          )\n        ),\n        _react2.default.createElement(\n          MainRectangle,\n          null,\n          _react2.default.createElement(Icon, { src: \"/img/app_panel_left/ic_recharge.svg\" }),\n          _react2.default.createElement(\n            _H.H1,\n            { fontSize: \"2rem\", margin: \"1.5rem 0 1.5rem 0\", txBold: true, txCenter: true, clWhite: true },\n            \"Recarga\"\n          ),\n          _react2.default.createElement(\n            TextRectangle,\n            null,\n            _react2.default.createElement(\n              _P.P,\n              { fontSize: \"1.4rem\", txCenter: true, clWhite: true },\n              \"Muito obrigado por escolher a Wallet Lunes como sua carteira multicoin. Aproveite da usabilidade e tecnologia desta incr\\xEDvel carteira e armazene suas criptomoedas com um alto n\\xEDvel de seguran\\xE7a..\"\n            )\n          ),\n          _react2.default.createElement(\n            _Buttons.ButtonGreen,\n            { width: \"97px\", margin: \"3rem auto 0.8rem auto\", onClick: function onClick() {\n                return _this2.props.history.push('/app/recharge');\n              } },\n            \"Entrar\"\n          )\n        ),\n        _react2.default.createElement(\n          MainRectangle,\n          null,\n          _react2.default.createElement(Icon, { src: \"/img/app_panel_left/ic_barcode.svg\" }),\n          _react2.default.createElement(\n            _H.H1,\n            { fontSize: \"2rem\", margin: \"1.5rem 0 1.5rem 0\", txBold: true, txCenter: true, clWhite: true },\n            \"Boleto\"\n          ),\n          _react2.default.createElement(\n            TextRectangle,\n            null,\n            _react2.default.createElement(\n              _P.P,\n              { fontSize: \"1.4rem\", txCenter: true, clWhite: true },\n              \"Muito obrigado por escolher a Wallet Lunes como sua carteira multicoin. Aproveite da usabilidade e tecnologia desta incr\\xEDvel carteira e armazene suas criptomoedas com um alto n\\xEDvel de seguran\\xE7a..\"\n            )\n          ),\n          _react2.default.createElement(\n            _Buttons.ButtonGreen,\n            { width: \"97px\", margin: \"3rem auto 0.8rem auto\", onClick: function onClick() {\n                return _this2.props.history.push('/app/ticket');\n              } },\n            \"Entrar\"\n          )\n        ),\n        _react2.default.createElement(\n          MainRectangle,\n          null,\n          _react2.default.createElement(Icon, { src: \"/img/app_panel_left/ic_buy.svg\" }),\n          _react2.default.createElement(\n            _H.H1,\n            { fontSize: \"2rem\", margin: \"1.5rem 0 1.5rem 0\", txBold: true, txCenter: true, clWhite: true },\n            \"Compras\"\n          ),\n          _react2.default.createElement(\n            TextRectangle,\n            null,\n            _react2.default.createElement(\n              _P.P,\n              { fontSize: \"1.4rem\", txCenter: true, clWhite: true },\n              \"Muito obrigado por escolher a Wallet Lunes como sua carteira multicoin. Aproveite da usabilidade e tecnologia desta incr\\xEDvel carteira e armazene suas criptomoedas com um alto n\\xEDvel de seguran\\xE7a..\"\n            )\n          ),\n          _react2.default.createElement(\n            _Buttons.ButtonGreen,\n            { width: \"97px\", margin: \"3rem auto 0.8rem auto\", onClick: function onClick() {\n                return _this2.props.history.push('/app/buy');\n              } },\n            \"Entrar\"\n          )\n        ),\n        _react2.default.createElement(\n          MainRectangle,\n          null,\n          _react2.default.createElement(Icon, { src: \"/img/app_panel_left/ic_privacy.svg\" }),\n          _react2.default.createElement(\n            _H.H1,\n            { fontSize: \"2rem\", margin: \"1.5rem 0 1.5rem 0\", txBold: true, txCenter: true, clWhite: true },\n            \"Privacidade\"\n          ),\n          _react2.default.createElement(\n            TextRectangle,\n            null,\n            _react2.default.createElement(\n              _P.P,\n              { fontSize: \"1.4rem\", txCenter: true, clWhite: true },\n              \"Muito obrigado por escolher a Wallet Lunes como sua carteira multicoin. Aproveite da usabilidade e tecnologia desta incr\\xEDvel carteira e armazene suas criptomoedas com um alto n\\xEDvel de seguran\\xE7a..\"\n            )\n          ),\n          _react2.default.createElement(\n            _Buttons.ButtonGreen,\n            { width: \"97px\", margin: \"3rem auto 0.8rem auto\", onClick: function onClick() {\n                return _this2.props.history.push('/app/privacy');\n              } },\n            \"Entrar\"\n          )\n        )\n      );\n    }\n  }]);\n\n  return Home;\n}(_react2.default.Component);\n\nexports.default = Home;\n\n//# sourceURL=webpack:///./src/shared/containers/Home/index.js?");

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

/***/ "./src/shared/containers/Privacy/index.js":
/*!************************************************!*\
  !*** ./src/shared/containers/Privacy/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Privacy = function (_React$Component) {\n\t_inherits(Privacy, _React$Component);\n\n\tfunction Privacy() {\n\t\t_classCallCheck(this, Privacy);\n\n\t\treturn _possibleConstructorReturn(this, (Privacy.__proto__ || Object.getPrototypeOf(Privacy)).apply(this, arguments));\n\t}\n\n\t_createClass(Privacy, [{\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\treturn _react2.default.createElement(\n\t\t\t\t'h1',\n\t\t\t\tnull,\n\t\t\t\t'Privacy'\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn Privacy;\n}(_react2.default.Component);\n\nexports.default = Privacy;\n\n//# sourceURL=webpack:///./src/shared/containers/Privacy/index.js?");

/***/ }),

/***/ "./src/shared/containers/Recharge/index.js":
/*!*************************************************!*\
  !*** ./src/shared/containers/Recharge/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _H = __webpack_require__(/*! Components/H1 */ \"./src/shared/components/H1.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Recharge = function (_React$Component) {\n\t_inherits(Recharge, _React$Component);\n\n\tfunction Recharge() {\n\t\t_classCallCheck(this, Recharge);\n\n\t\treturn _possibleConstructorReturn(this, (Recharge.__proto__ || Object.getPrototypeOf(Recharge)).apply(this, arguments));\n\t}\n\n\t_createClass(Recharge, [{\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\treturn _react2.default.createElement(\n\t\t\t\t_H.H1,\n\t\t\t\t{ clWhite: true },\n\t\t\t\t'Recharge'\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn Recharge;\n}(_react2.default.Component);\n\nexports.default = Recharge;\n\n//# sourceURL=webpack:///./src/shared/containers/Recharge/index.js?");

/***/ }),

/***/ "./src/shared/containers/Ticket/index.js":
/*!***********************************************!*\
  !*** ./src/shared/containers/Ticket/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _H = __webpack_require__(/*! Components/H1 */ \"./src/shared/components/H1.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Ticket = function (_React$Component) {\n\t_inherits(Ticket, _React$Component);\n\n\tfunction Ticket() {\n\t\t_classCallCheck(this, Ticket);\n\n\t\treturn _possibleConstructorReturn(this, (Ticket.__proto__ || Object.getPrototypeOf(Ticket)).apply(this, arguments));\n\t}\n\n\t_createClass(Ticket, [{\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\treturn _react2.default.createElement(\n\t\t\t\t_H.H1,\n\t\t\t\t{ clWhite: true },\n\t\t\t\t'Ticket'\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn Ticket;\n}(_react2.default.Component);\n\nexports.default = Ticket;\n\n//# sourceURL=webpack:///./src/shared/containers/Ticket/index.js?");

/***/ }),

/***/ "./src/shared/containers/User/Login/PanelLeft.js":
/*!*******************************************************!*\
  !*** ./src/shared/containers/User/Login/PanelLeft.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _templateObject = _taggedTemplateLiteral([\"\\n\\tbackground: \", \";\\n\\tfloat: left;\\n\\twidth: 100%;\\n\\theight: 100vh;\\n\\tpadding-bottom: 50px;\\n\\n\\t@media only screen and (min-width: 768px) {\\n\\t\\twidth: 40%;\\n\\t}\\n\"], [\"\\n\\tbackground: \", \";\\n\\tfloat: left;\\n\\twidth: 100%;\\n\\theight: 100vh;\\n\\tpadding-bottom: 50px;\\n\\n\\t@media only screen and (min-width: 768px) {\\n\\t\\twidth: 40%;\\n\\t}\\n\"]);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar PanelLeft = _styledComponents2.default.aside(_templateObject, _styleVariables2.default.darkLilac);\n\nexports.default = PanelLeft;\n\n//# sourceURL=webpack:///./src/shared/containers/User/Login/PanelLeft.js?");

/***/ }),

/***/ "./src/shared/containers/User/Login/PanelRight.js":
/*!********************************************************!*\
  !*** ./src/shared/containers/User/Login/PanelRight.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.PanelRight = undefined;\n\nvar _templateObject = _taggedTemplateLiteral([\"\\n\\tbackground: \", \";\\n\\tdisplay: none;\\n\\tfloat: left;\\n\\theight: 100vh;\\n\\twidth: 60%;\\n\\t\\n\\t@media only screen and (min-width: 768px) {\\n\\t\\tdisplay: block;\\n\\t}\\n\"], [\"\\n\\tbackground: \", \";\\n\\tdisplay: none;\\n\\tfloat: left;\\n\\theight: 100vh;\\n\\twidth: 60%;\\n\\t\\n\\t@media only screen and (min-width: 768px) {\\n\\t\\tdisplay: block;\\n\\t}\\n\"]);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar PanelRight = exports.PanelRight = _styledComponents2.default.main(_templateObject, _styleVariables2.default.normalLilac);\n\nexports.default = PanelRight;\n\n//# sourceURL=webpack:///./src/shared/containers/User/Login/PanelRight.js?");

/***/ }),

/***/ "./src/shared/containers/User/Login/Slide.js":
/*!***************************************************!*\
  !*** ./src/shared/containers/User/Login/Slide.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _templateObject = _taggedTemplateLiteral([\"\\n    display: block;\\n    margin-left: auto;\\n    margin-right: auto;\\n\\n    @media screen {\\n      margin-left: 20% \\n    }\\n\"], [\"\\n    display: block;\\n    margin-left: auto;\\n    margin-right: auto;\\n\\n    @media screen {\\n      margin-left: 20% \\n    }\\n\"]);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _Image = __webpack_require__(/*! ../../../components/Image */ \"./src/shared/components/Image.js\");\n\nvar _Image2 = _interopRequireDefault(_Image);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar Container = _styledComponents2.default.div(_templateObject);\n\nvar images = [{\n  link: \"/img/user_panel_right/img-slide1.png\",\n  text: \"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. \\n    Cum sociis natoque penatibus et magnis dis parturient montes.\"\n}, {\n  link: \"/img/user_panel_right/img-slide2.png\",\n  text: \"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. \\n    Cum sociis natoque penatibus et magnis dis parturient montes.\"\n}, {\n  link: \"/img/user_panel_right/img-slide3.png\",\n  text: \"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. \\n    Cum sociis natoque penatibus et magnis dis parturient montes.\"\n}];\n\nvar Slide = function (_React$Component) {\n  _inherits(Slide, _React$Component);\n\n  function Slide() {\n    _classCallCheck(this, Slide);\n\n    return _possibleConstructorReturn(this, (Slide.__proto__ || Object.getPrototypeOf(Slide)).apply(this, arguments));\n  }\n\n  _createClass(Slide, [{\n    key: \"render\",\n    value: function render() {\n      return _react2.default.createElement(\n        Container,\n        null,\n        _react2.default.createElement(_Image2.default, { imageList: images })\n      );\n    }\n  }]);\n\n  return Slide;\n}(_react2.default.Component);\n\nexports.default = Slide;\n\n//# sourceURL=webpack:///./src/shared/containers/User/Login/Slide.js?");

/***/ }),

/***/ "./src/shared/containers/User/Login/index.js":
/*!***************************************************!*\
  !*** ./src/shared/containers/User/Login/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _templateObject = _taggedTemplateLiteral([\"\\n  width: 100%;\\n\"], [\"\\n  width: 100%;\\n\"]),\n    _templateObject2 = _taggedTemplateLiteral([\"\\n  margin: 70px auto 20px auto;\\n\"], [\"\\n  margin: 70px auto 20px auto;\\n\"]),\n    _templateObject3 = _taggedTemplateLiteral([\"\\n  text-align: right;\\n\\n\"], [\"\\n  text-align: right;\\n\\n\"]);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _lunesLib = __webpack_require__(/*! lunes-lib */ \"lunes-lib\");\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _actions = __webpack_require__(/*! Redux/actions */ \"./src/shared/redux/actions/index.js\");\n\nvar _Form = __webpack_require__(/*! Components/Form */ \"./src/shared/components/Form.js\");\n\nvar _FormGroup = __webpack_require__(/*! Components/FormGroup */ \"./src/shared/components/FormGroup.js\");\n\nvar _Input = __webpack_require__(/*! Components/Input */ \"./src/shared/components/Input.js\");\n\nvar _Buttons = __webpack_require__(/*! Components/Buttons */ \"./src/shared/components/Buttons.js\");\n\nvar _Link = __webpack_require__(/*! Components/Link */ \"./src/shared/components/Link.js\");\n\nvar _H = __webpack_require__(/*! Components/H1 */ \"./src/shared/components/H1.js\");\n\nvar _H2 = __webpack_require__(/*! Components/H2 */ \"./src/shared/components/H2.js\");\n\nvar _H3 = __webpack_require__(/*! Components/H3 */ \"./src/shared/components/H3.js\");\n\nvar _P = __webpack_require__(/*! Components/P */ \"./src/shared/components/P.js\");\n\nvar _Logo = __webpack_require__(/*! Components/Logo */ \"./src/shared/components/Logo.js\");\n\nvar _PanelLeft = __webpack_require__(/*! ./PanelLeft */ \"./src/shared/containers/User/Login/PanelLeft.js\");\n\nvar _PanelLeft2 = _interopRequireDefault(_PanelLeft);\n\nvar _PanelRight = __webpack_require__(/*! ./PanelRight */ \"./src/shared/containers/User/Login/PanelRight.js\");\n\nvar _PanelRight2 = _interopRequireDefault(_PanelRight);\n\nvar _Slide = __webpack_require__(/*! ../../../containers/User/Login/Slide */ \"./src/shared/containers/User/Login/Slide.js\");\n\nvar _Slide2 = _interopRequireDefault(_Slide);\n\nvar _FooterUser = __webpack_require__(/*! Components/FooterUser */ \"./src/shared/components/FooterUser.js\");\n\nvar _FooterUser2 = _interopRequireDefault(_FooterUser);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n//REDUX\n\n\n//COMPONENTS\n\n\n//PRIVATE COMPONENTS\n\n\nvar WrapPhrases = _styledComponents2.default.div(_templateObject);\n\nvar CustomLogo = _Logo.Logo.extend(_templateObject2);\n\nvar CustomLinkRight = _Link.CustomLink.extend(_templateObject3);\n\nvar Login = function (_React$Component) {\n  _inherits(Login, _React$Component);\n\n  function Login() {\n    var _ref;\n\n    var _temp, _this, _ret;\n\n    _classCallCheck(this, Login);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Login.__proto__ || Object.getPrototypeOf(Login)).call.apply(_ref, [this].concat(args))), _this), _this.handleLogin = function (event) {\n      event.preventDefault();\n      var emailEl = document.querySelector(\".login-email\");\n      var passEl = document.querySelector(\".login-password\");\n\n      var email = emailEl.value;\n      var password = passEl.value;\n      _this.props.userLogin({\n        email: email,\n        password: password\n      });\n    }, _temp), _possibleConstructorReturn(_this, _ret);\n  }\n\n  _createClass(Login, [{\n    key: \"componentDidUpdate\",\n    value: function componentDidUpdate() {\n      this.handleStatus();\n    }\n  }, {\n    key: \"handleStatus\",\n    value: function handleStatus() {\n      var statusEl = document.querySelector(\".js-status\");\n\n      var status = this.props.user.status;\n\n\n      if (status === \"pending\") {\n        statusEl.textContent = \"Aguarde...\";\n      } else if (status === \"fulfilled\") {\n        statusEl.textContent = \"Sucesso\";\n      } else if (status === \"rejected\") {\n        statusEl.textContent = \"Tente novamente\";\n      }\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _props$user = this.props.user,\n          status = _props$user.status,\n          logged = _props$user.logged;\n\n      return _react2.default.createElement(\n        \"div\",\n        null,\n        _react2.default.createElement(\n          _PanelLeft2.default,\n          null,\n          _react2.default.createElement(CustomLogo, null),\n          _react2.default.createElement(\n            WrapPhrases,\n            null,\n            _react2.default.createElement(\n              _H.H1,\n              { clNormalGreen: true, txCenter: true },\n              \"R\\xE1pida, segura e inteligente!\"\n            ),\n            _react2.default.createElement(\n              _P.P,\n              { clWhite: true, txCenter: true, margin: \"20px 0 70px 0\", fontSize: \"1.4rem\" },\n              \"Entre com seus dados\"\n            )\n          ),\n          _react2.default.createElement(\n            _Form.Form,\n            { margin: \"80px auto\", width: \"80%\" },\n            _react2.default.createElement(\n              _FormGroup.FormGroup,\n              null,\n              _react2.default.createElement(_Input.Input, { placeholder: \"nome@email.com\", className: \"login-email\" })\n            ),\n            _react2.default.createElement(\n              _FormGroup.FormGroup,\n              null,\n              _react2.default.createElement(_Input.Input, { type: \"password\", placeholder: \"Senha\", className: \"login-password\" })\n            ),\n            _react2.default.createElement(\n              CustomLinkRight,\n              { to: \"/reset\", margin: \"0 auto 20px auto\" },\n              \"Esqueceu a senha?\"\n            ),\n            _react2.default.createElement(\n              _Buttons.ButtonSecondary,\n              { secondary: true, onClick: this.handleLogin },\n              logged ? \"Logado\" : \"Fazer login\"\n            )\n          ),\n          _react2.default.createElement(_H.H1, { txCenter: true, clWhite: true, className: \"js-status\" }),\n          _react2.default.createElement(_FooterUser2.default, { content: \"N\\xE3o tem uma conta?\", to: \"/registry\", label: \"Inscrever-se\" })\n        ),\n        _react2.default.createElement(\n          _PanelRight2.default,\n          null,\n          _react2.default.createElement(_Slide2.default, null)\n        )\n      );\n    }\n  }]);\n\n  return Login;\n}(_react2.default.Component);\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    user: state.user\n  };\n};\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return {\n    userLogin: function userLogin(email, password) {\n      dispatch((0, _actions.userLogin)(email, password));\n    }\n  };\n};\nexports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Login);\n\n//# sourceURL=webpack:///./src/shared/containers/User/Login/index.js?");

/***/ }),

/***/ "./src/shared/containers/User/Registry/PanelLeft.js":
/*!**********************************************************!*\
  !*** ./src/shared/containers/User/Registry/PanelLeft.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.PanelLeft = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\tbackground: ', ';\\n\\tfloat: left;\\n\\twidth: 100%;\\n\\theight: 100vh;\\n\\tpadding-bottom: 50px;\\n\\n\\t@media only screen and (min-width: 768px) {\\n\\t\\twidth: 40%;\\n\\t}\\n\\n'], ['\\n\\tbackground: ', ';\\n\\tfloat: left;\\n\\twidth: 100%;\\n\\theight: 100vh;\\n\\tpadding-bottom: 50px;\\n\\n\\t@media only screen and (min-width: 768px) {\\n\\t\\twidth: 40%;\\n\\t}\\n\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar PanelLeft = exports.PanelLeft = _styledComponents2.default.aside(_templateObject, _styleVariables2.default.darkLilac);\n\n//# sourceURL=webpack:///./src/shared/containers/User/Registry/PanelLeft.js?");

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _templateObject = _taggedTemplateLiteral([\"\\n  margin: 70px auto 0 auto;\\n\"], [\"\\n  margin: 70px auto 0 auto;\\n\"]),\n    _templateObject2 = _taggedTemplateLiteral([\"\\n  font-weight: 500;\\n  margin: 2.5rem 5rem 0 5rem;\\n  line-height: 25px;\\n\"], [\"\\n  font-weight: 500;\\n  margin: 2.5rem 5rem 0 5rem;\\n  line-height: 25px;\\n\"]),\n    _templateObject3 = _taggedTemplateLiteral([\"\\n  margin: 2rem;\\n  text-align: center;\\n  color: white;\\n  font-size: 1.2em;\\n\"], [\"\\n  margin: 2rem;\\n  text-align: center;\\n  color: white;\\n  font-size: 1.2em;\\n\"]),\n    _templateObject4 = _taggedTemplateLiteral([\"\\n  width: 70%;\\n  display: block;\\n  margin: 25px auto 0 auto;\\n\"], [\"\\n  width: 70%;\\n  display: block;\\n  margin: 25px auto 0 auto;\\n\"]),\n    _templateObject5 = _taggedTemplateLiteral([\"\\n  display: none;\\n\"], [\"\\n  display: none;\\n\"]),\n    _templateObject6 = _taggedTemplateLiteral([\"\\n  border-style: none;\\n  padding-top: 14px;\\n\"], [\"\\n  border-style: none;\\n  padding-top: 14px;\\n\"]),\n    _templateObject7 = _taggedTemplateLiteral([\"\\n  color: #4cd566;\\n  text-decoration: none;\\n\"], [\"\\n  color: #4cd566;\\n  text-decoration: none;\\n\"]);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _validator = __webpack_require__(/*! validator */ \"validator\");\n\nvar _validator2 = _interopRequireDefault(_validator);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _actions = __webpack_require__(/*! Redux/actions */ \"./src/shared/redux/actions/index.js\");\n\nvar _PanelLeft = __webpack_require__(/*! ./PanelLeft */ \"./src/shared/containers/User/Registry/PanelLeft.js\");\n\nvar _PanelRight = __webpack_require__(/*! ./PanelRight */ \"./src/shared/containers/User/Registry/PanelRight.js\");\n\nvar _Logo = __webpack_require__(/*! Components/Logo */ \"./src/shared/components/Logo.js\");\n\nvar _Link = __webpack_require__(/*! Components/Link */ \"./src/shared/components/Link.js\");\n\nvar _Img = __webpack_require__(/*! Components/Img */ \"./src/shared/components/Img.js\");\n\nvar _H = __webpack_require__(/*! Components/H3 */ \"./src/shared/components/H3.js\");\n\nvar _H2 = __webpack_require__(/*! Components/H1 */ \"./src/shared/components/H1.js\");\n\nvar _FormBuilder = __webpack_require__(/*! Components/FormBuilder */ \"./src/shared/components/FormBuilder.js\");\n\nvar _Buttons = __webpack_require__(/*! Components/Buttons */ \"./src/shared/components/Buttons.js\");\n\nvar _Slide = __webpack_require__(/*! ../../../containers/User/Login/Slide */ \"./src/shared/containers/User/Login/Slide.js\");\n\nvar _Slide2 = _interopRequireDefault(_Slide);\n\nvar _FooterUser = __webpack_require__(/*! Components/FooterUser */ \"./src/shared/components/FooterUser.js\");\n\nvar _FooterUser2 = _interopRequireDefault(_FooterUser);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n//REDUX\n\n//PRIVATE COMPONENTS\n\n\nvar CustomLogo = _Logo.Logo.extend(_templateObject);\n\nvar CustomH1 = _H2.H1.extend(_templateObject2);\n\nvar CustomH3 = _H.H3.extend(_templateObject3);\n\nvar CustomForm = _styledComponents2.default.form(_templateObject4);\n\nvar SuccessMessage = _styledComponents2.default.div(_templateObject5);\n\nvar ArrowImg = _Img.Img.extend(_templateObject6);\n\nvar Anchor = _styledComponents2.default.a(_templateObject7);\n\nvar inputs = [{ className: \"registry-fname\", placeholder: \"Nome\" }, { className: \"registry-lname\", placeholder: \"Sobrenome\" }, { className: \"registry-email\", placeholder: \"E-mail\", type: \"email\" }, { className: \"registry-pass\", placeholder: \"Senha\", type: \"password\" }, { className: \"registry-cpass\", placeholder: \"Confirmar senha\", type: \"password\" }, { className: \"registry-terms\", value: _react2.default.createElement(\n    \"span\",\n    null,\n    \" Eu aceito os \",\n    _react2.default.createElement(\n      Anchor,\n      { href: \"/\", target: \"blank_\" },\n      \"Termos de Servi\\xE7os\"\n    ),\n    \" \"\n  ), type: \"checkbox\" }];\n\nvar Registry = function (_React$Component) {\n  _inherits(Registry, _React$Component);\n\n  function Registry() {\n    var _ref;\n\n    var _temp, _this, _ret;\n\n    _classCallCheck(this, Registry);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Registry.__proto__ || Object.getPrototypeOf(Registry)).call.apply(_ref, [this].concat(args))), _this), _this.handleSubmit = function (event) {\n      event.preventDefault();\n      var termsEl = document.querySelector(\".registry-terms\");\n      var emailEl = document.querySelector(\".registry-email\");\n      var firstNameEl = document.querySelector(\".registry-fname\");\n      var lastNameEl = document.querySelector(\".registry-lname\");\n      var passEl = document.querySelector(\".registry-pass\");\n      var confirmPassEl = document.querySelector(\".registry-cpass\");\n\n      var errors = [];\n\n      if (!_validator2.default.isLength(firstNameEl.value, { min: 3, max: undefined })) {\n        errors.push('O nome deve ter no mínimo 3 caracteres');\n      }\n\n      if (!_validator2.default.isLength(lastNameEl.value, { min: 3, max: undefined })) {\n        errors.push('O sobrenome deve ter no mínimo 3 caracteres');\n      }\n\n      if (!_validator2.default.isEmail(emailEl.value) || _validator2.default.isEmpty(emailEl.value)) {\n        errors.push('Um email válido deve ser informado');\n      }\n\n      var passRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_+=@#-$%^&*])(?=.{8,})/g;\n      if (!_validator2.default.matches(passEl.value, passRules)) {\n        errors.push('A senha deve ter mais que 8 caracteres entre letras maíusuculas e minúsculas, \\n\\tnúmeros e pelo menos um caracter especial');\n      }\n\n      if (passEl.value !== confirmPassEl.value) {\n        errors.push('A confirmação de senha não confere');\n      }\n\n      if (!termsEl.checked) {\n        errors.push('Você deve aceitar os termos para continuar');\n      }\n\n      if (errors.length > 0) {\n        alert('- ' + errors.join('\\n- '));\n        return;\n      }\n\n      var fullname = firstNameEl.value + \" \" + lastNameEl.value;\n\n      alert('SUCESSO!');\n      // this.props.userCreate({\n      //   email: emailEl.value,\n      //   password: passEl.value,\n      //   fullname: fullname.replace(\"  \", \" \")\n      // });\n    }, _temp), _possibleConstructorReturn(_this, _ret);\n  }\n\n  _createClass(Registry, [{\n    key: \"handleStatus\",\n    value: function handleStatus() {\n      try {\n        var firstPanelEl = document.querySelector(\".js-first-panel-left\");\n        var secondPanelEl = document.querySelector(\".js-second-panel-left\");\n        var statusEl = document.querySelector(\".js-status\");\n\n        var status = this.props.user.status;\n\n\n        if (status === \"pending\") {\n          statusEl.textContent = \"Aguarde...\";\n        } else if (status === \"fulfilled\") {\n          firstPanelEl.style.display = \"none\";\n          secondPanelEl.style.display = \"block\";\n          // statusEl.textContent = \"Sucesso\";\n        } else if (status === \"rejected\") {\n          statusEl.textContent = \"Tente novamente\";\n        }\n      } catch (err) {\n        console.warn(\"There's an error on handleStatus\", 500, 'HANDLE_STATUS_ERROR', err);\n      }\n    }\n  }, {\n    key: \"componentDidUpdate\",\n    value: function componentDidUpdate() {\n      var _this2 = this;\n\n      setTimeout(function () {\n        _this2.handleStatus();\n      }, 300);\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _props$user = this.props.user,\n          status = _props$user.status,\n          logged = _props$user.logged;\n\n\n      return _react2.default.createElement(\n        \"div\",\n        null,\n        _react2.default.createElement(\n          _PanelLeft.PanelLeft,\n          null,\n          _react2.default.createElement(CustomLogo, null),\n          _react2.default.createElement(\n            CustomForm,\n            { onSubmit: this.handleSubmit, className: \"js-first-panel-left\" },\n            _react2.default.createElement(\n              CustomH3,\n              null,\n              \"Insira os dados necess\\xE1rios para efetuar o seu cadastro\"\n            ),\n            _react2.default.createElement(_FormBuilder.FormBuilder, { inputs: inputs }),\n            _react2.default.createElement(\n              _Buttons.ButtonSecondary,\n              { type: \"submit\" },\n              \"Registrar\"\n            )\n          ),\n          _react2.default.createElement(\n            SuccessMessage,\n            { className: \"js-second-panel-left\" },\n            _react2.default.createElement(_Img.Img, { src: \"img/user_panel_left/ic_email.svg\", margin: \"10.5rem auto 0 auto\", width: \"80px\" }),\n            _react2.default.createElement(\n              CustomH1,\n              { txCenter: true, clWhite: true },\n              \"Uma mensagem com link de ativa\\xE7\\xE3o foi enviada para o seu endere\\xE7o de e-mail.\"\n            ),\n            _react2.default.createElement(\n              _Link.CircleLink,\n              { to: \"/login\", margin: \"50px auto 10px auto\" },\n              _react2.default.createElement(ArrowImg, { src: \"img/user_panel_left/right-arrow.svg\", margin: \"auto\", width: \"20px\" })\n            )\n          ),\n          _react2.default.createElement(_H2.H1, { className: \"js-status\", txCenter: true, clWhite: true, margin: \"50px 0 0 0\" }),\n          _react2.default.createElement(_FooterUser2.default, { content: \"J\\xE1 tem uma conta?\", to: \"/login\", label: \"Entrar\" })\n        ),\n        _react2.default.createElement(\n          _PanelRight.PanelRight,\n          null,\n          _react2.default.createElement(_Slide2.default, null)\n        )\n      );\n    }\n  }]);\n\n  return Registry;\n}(_react2.default.Component);\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return {\n    userCreate: function userCreate(data) {\n      dispatch((0, _actions.userCreate)(data));\n    }\n  };\n};\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    user: state.user\n  };\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Registry);\n\n//# sourceURL=webpack:///./src/shared/containers/User/Registry/index.js?");

/***/ }),

/***/ "./src/shared/containers/User/Reset/PanelLeft.js":
/*!*******************************************************!*\
  !*** ./src/shared/containers/User/Reset/PanelLeft.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\tbackground: ', ';\\n\\tfloat: left;\\n\\twidth: 100%;\\n\\theight: 100vh;\\n\\toverflow: auto;\\n\\tpadding-bottom: 50px;\\n\\n\\t@media only screen and (min-width: 768px) {\\n\\t\\twidth: 40%;\\n\\t}\\n'], ['\\n\\tbackground: ', ';\\n\\tfloat: left;\\n\\twidth: 100%;\\n\\theight: 100vh;\\n\\toverflow: auto;\\n\\tpadding-bottom: 50px;\\n\\n\\t@media only screen and (min-width: 768px) {\\n\\t\\twidth: 40%;\\n\\t}\\n']);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar PanelLeft = _styledComponents2.default.aside(_templateObject, _styleVariables2.default.darkLilac);\n\nexports.default = PanelLeft;\n\n//# sourceURL=webpack:///./src/shared/containers/User/Reset/PanelLeft.js?");

/***/ }),

/***/ "./src/shared/containers/User/Reset/PanelRight.js":
/*!********************************************************!*\
  !*** ./src/shared/containers/User/Reset/PanelRight.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.PanelRight = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\tbackground: ', ';\\n\\tdisplay: none;\\n\\tfloat: left;\\n\\theight: 100vh;\\n\\twidth: 60%;\\n\\n\\t@media only screen and (min-width: 768px) {\\n\\t\\tdisplay: block;\\n\\t}\\n'], ['\\n\\tbackground: ', ';\\n\\tdisplay: none;\\n\\tfloat: left;\\n\\theight: 100vh;\\n\\twidth: 60%;\\n\\n\\t@media only screen and (min-width: 768px) {\\n\\t\\tdisplay: block;\\n\\t}\\n']);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar PanelRight = exports.PanelRight = _styledComponents2.default.main(_templateObject, _styleVariables2.default.normalLilac);\n\nexports.default = PanelRight;\n\n//# sourceURL=webpack:///./src/shared/containers/User/Reset/PanelRight.js?");

/***/ }),

/***/ "./src/shared/containers/User/Reset/index.js":
/*!***************************************************!*\
  !*** ./src/shared/containers/User/Reset/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _templateObject = _taggedTemplateLiteral([\"\\n  margin: 70px auto 0 auto;\\n\"], [\"\\n  margin: 70px auto 0 auto;\\n\"]),\n    _templateObject2 = _taggedTemplateLiteral([\"\\n  margin-top:30%;\\n\"], [\"\\n  margin-top:30%;\\n\"]),\n    _templateObject3 = _taggedTemplateLiteral([\"\\n  padding-right: 22%;\\n  padding-left: 22%;\\n\"], [\"\\n  padding-right: 22%;\\n  padding-left: 22%;\\n\"]),\n    _templateObject4 = _taggedTemplateLiteral([\"\\n  text-align: right;\\n\"], [\"\\n  text-align: right;\\n\"]),\n    _templateObject5 = _taggedTemplateLiteral([\"\\n  background-color: white;\\n  border: 0;\\n  border-radius: 100%;\\n  height: 40px;\\n  width: 40px;\\n\"], [\"\\n  background-color: white;\\n  border: 0;\\n  border-radius: 100%;\\n  height: 40px;\\n  width: 40px;\\n\"]),\n    _templateObject6 = _taggedTemplateLiteral([\"\\n  border-style: none;\\n  padding-top: 14px;\\n\"], [\"\\n  border-style: none;\\n  padding-top: 14px;\\n\"]),\n    _templateObject7 = _taggedTemplateLiteral([\"\\n  display: block;\\n  margin: 50px auto 10px auto;\\n  text-align: center;\\n\\n  @media only screen and (min-width: 768px) {\\n    position: absolute;\\n    bottom: 0;\\n    width: 40%;\\n  }\\n\"], [\"\\n  display: block;\\n  margin: 50px auto 10px auto;\\n  text-align: center;\\n\\n  @media only screen and (min-width: 768px) {\\n    position: absolute;\\n    bottom: 0;\\n    width: 40%;\\n  }\\n\"]),\n    _templateObject8 = _taggedTemplateLiteral([\"\\n  width: 80%;\\n  display: block;\\n  margin: 25px auto 0 auto;\\n\"], [\"\\n  width: 80%;\\n  display: block;\\n  margin: 25px auto 0 auto;\\n\"]),\n    _templateObject9 = _taggedTemplateLiteral([\"\\n  display: none;\\n\"], [\"\\n  display: none;\\n\"]);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _lunesLib = __webpack_require__(/*! lunes-lib */ \"lunes-lib\");\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _PanelLeft = __webpack_require__(/*! ./PanelLeft */ \"./src/shared/containers/User/Reset/PanelLeft.js\");\n\nvar _PanelLeft2 = _interopRequireDefault(_PanelLeft);\n\nvar _PanelRight = __webpack_require__(/*! ./PanelRight */ \"./src/shared/containers/User/Reset/PanelRight.js\");\n\nvar _PanelRight2 = _interopRequireDefault(_PanelRight);\n\nvar _Logo = __webpack_require__(/*! Components/Logo */ \"./src/shared/components/Logo.js\");\n\nvar _Link = __webpack_require__(/*! Components/Link */ \"./src/shared/components/Link.js\");\n\nvar _Img = __webpack_require__(/*! Components/Img */ \"./src/shared/components/Img.js\");\n\nvar _H = __webpack_require__(/*! Components/H3 */ \"./src/shared/components/H3.js\");\n\nvar _H2 = __webpack_require__(/*! Components/H1 */ \"./src/shared/components/H1.js\");\n\nvar _P = __webpack_require__(/*! Components/P */ \"./src/shared/components/P.js\");\n\nvar _FormBuilder = __webpack_require__(/*! Components/FormBuilder */ \"./src/shared/components/FormBuilder.js\");\n\nvar _Buttons = __webpack_require__(/*! Components/Buttons */ \"./src/shared/components/Buttons.js\");\n\nvar _Slide = __webpack_require__(/*! ../../../containers/User/Login/Slide */ \"./src/shared/containers/User/Login/Slide.js\");\n\nvar _Slide2 = _interopRequireDefault(_Slide);\n\nvar _Buttons2 = __webpack_require__(/*! ../../../components/Buttons */ \"./src/shared/components/Buttons.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\n// Components\n\n\nvar CustomLogo = _Logo.Logo.extend(_templateObject);\n\nvar MarginH1 = _styledComponents2.default.div(_templateObject2);\n\nvar PaddingH1 = _styledComponents2.default.div(_templateObject3);\n\nvar CustomLinkRight = _Link.CustomLink.extend(_templateObject4);\n\nvar CircleLink = _Link.CustomLink.extend(_templateObject5);\n\nvar ArrowImg = _Img.Img.extend(_templateObject6);\n\nvar CustomP = _P.P.extend(_templateObject7);\n\nvar CustomForm = _styledComponents2.default.form(_templateObject8);\n\nvar SecondPanelLeft = _PanelLeft2.default.extend(_templateObject9);\n\nvar inputs = [{\n  className: \"reset-email\",\n  placeholder: \"E-mail\",\n  type: \"email\"\n}];\n\nvar Reset = function (_React$Component) {\n  _inherits(Reset, _React$Component);\n\n  function Reset() {\n    var _ref;\n\n    var _temp, _this, _ret;\n\n    _classCallCheck(this, Reset);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Reset.__proto__ || Object.getPrototypeOf(Reset)).call.apply(_ref, [this].concat(args))), _this), _this.handleSubmit = function (event) {\n      event.preventDefault();\n      var emailEl = document.querySelector(\".reset-email\");\n      _this.props.userReset(emailEl.value);\n    }, _temp), _possibleConstructorReturn(_this, _ret);\n  }\n\n  _createClass(Reset, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {}\n  }, {\n    key: \"componentDidUpdate\",\n    value: function componentDidUpdate() {\n      this.handleStatus();\n    }\n  }, {\n    key: \"handleStatus\",\n    value: function handleStatus() {\n      var firstPanelEl = document.querySelector(\".js-first-panel-left\");\n      var secondPanelEl = document.querySelector(\".js-second-panel-left\");\n      var statusEl = document.querySelector(\".js-status\");\n\n      var status = this.props.user.status;\n\n\n      if (status === \"pending\") {\n        statusEl.textContent = \"Aguarde...\";\n      } else if (status === \"fulfilled\") {\n        firstPanelEl.style.display = \"none\";\n        secondPanelEl.style.display = \"block\";\n        statusEl.textContent = \"Sucesso\";\n      } else if (status === \"rejected\") {\n        statusEl.textContent = \"Ops, tente novamente!\";\n        window.setTimeout(function () {\n          statusEl.textContent = \"\";\n        }, 2000);\n      }\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _props$user = this.props.user,\n          status = _props$user.status,\n          logged = _props$user.logged;\n\n\n      return _react2.default.createElement(\n        \"div\",\n        null,\n        _react2.default.createElement(\n          _PanelLeft2.default,\n          { className: \"js-first-panel-left\" },\n          _react2.default.createElement(CustomLogo, null),\n          _react2.default.createElement(\n            MarginH1,\n            null,\n            _react2.default.createElement(\n              _H2.H1,\n              { clNormalGreen: true, txCenter: true, margin: \"100px auto 0 auto\", fontSize: \"2.5rem\" },\n              _react2.default.createElement(\n                \"strong\",\n                null,\n                \"Esqueceu sua senha?\"\n              )\n            )\n          ),\n          _react2.default.createElement(\n            _P.P,\n            { clWhite: true, txCenter: true, margin: \"20px\", fontSize: \"1.4rem\" },\n            \"N\\xF3s enviaremos suas instru\\xE7\\xF5es sobre como redefini-la.\"\n          ),\n          _react2.default.createElement(\n            CustomForm,\n            { onSubmit: this.handleSubmit },\n            _react2.default.createElement(_FormBuilder.FormBuilder, { inputs: inputs }),\n            _react2.default.createElement(\n              CustomLinkRight,\n              { to: \"/login\", margin: \"0 auto 25px auto\" },\n              \"Fazer login?\"\n            ),\n            _react2.default.createElement(\n              _Buttons.ButtonSecondary,\n              { type: \"submit\" },\n              \"Redefinir senha\"\n            )\n          ),\n          _react2.default.createElement(_P.P, { txCenter: true, clWhite: true, margin: \"20px 0 0 0\", fontSize: \"1.4rem\", className: \"js-status\" }),\n          _react2.default.createElement(\n            CustomP,\n            { clWhite: true, fontSize: \"1.4rem\" },\n            \"N\\xE3o tem uma conta?\",\n            \" \",\n            _react2.default.createElement(\n              _Link.CustomLink,\n              { to: \"/registry\", color: \"\" + _styleVariables2.default.normalGreen },\n              \"Inscrever-se.\"\n            )\n          )\n        ),\n        _react2.default.createElement(\n          SecondPanelLeft,\n          { className: \"js-second-panel-left\" },\n          _react2.default.createElement(CustomLogo, null),\n          _react2.default.createElement(_Img.Img, { src: \"img/user_panel_left/ic_email.svg\", margin: \"22rem auto 0 auto\", width: \"80px\" }),\n          _react2.default.createElement(\n            PaddingH1,\n            null,\n            _react2.default.createElement(\n              _H2.H1,\n              { txCenter: true, clWhite: true, margin: \"20px\", fontSize: \"2rem\" },\n              _react2.default.createElement(\n                \"strong\",\n                null,\n                \"Uma mensagem com link de defini\\xE7\\xE3o de senha foi enviado para o seu endere\\xE7o de e-mail.\"\n              )\n            )\n          ),\n          _react2.default.createElement(\n            CircleLink,\n            { to: \"/login\", margin: \"50px auto 10px auto\" },\n            _react2.default.createElement(ArrowImg, { src: \"img/user_panel_left/right-arrow.svg\", margin: \"auto\", width: \"20px\" })\n          )\n        ),\n        _react2.default.createElement(\n          _PanelRight2.default,\n          null,\n          _react2.default.createElement(_Slide2.default, null)\n        )\n      );\n    }\n  }]);\n\n  return Reset;\n}(_react2.default.Component);\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return {\n    userReset: function userReset(email) {\n      dispatch({\n        type: \"USER_RESET\",\n        payload: _lunesLib.users.resetPassword({\n          email: email\n        })\n      });\n    }\n  };\n};\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    user: state.user\n  };\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Reset);\n\n//# sourceURL=webpack:///./src/shared/containers/User/Reset/index.js?");

/***/ }),

/***/ "./src/shared/containers/Wallet/PanelLeft/Coins/index.js":
/*!***************************************************************!*\
  !*** ./src/shared/containers/Wallet/PanelLeft/Coins/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _templateObject = _taggedTemplateLiteral([\"\\n  width: auto;\\n  min-width: 100%;\\n  height: 100%;\\n  max-height: 100%;\\n\\n\"], [\"\\n  width: auto;\\n  min-width: 100%;\\n  height: 100%;\\n  max-height: 100%;\\n\\n\"]),\n    _templateObject2 = _taggedTemplateLiteral([\"\\n  margin-top: 115%;\\n  display: flex;\\n  align-items: center;\\n\"], [\"\\n  margin-top: 115%;\\n  display: flex;\\n  align-items: center;\\n\"]),\n    _templateObject3 = _taggedTemplateLiteral([\"\\n  background: \", \";\\n  border-radius: 5px;\\n  cursor: pointer;\\n  display: flex;\\n  flex-flow: nowrap;\\n  height: 70px;\\n  min-width: 100%;\\n  padding: 0 1rem;\\n  width: auto;\\n\\n  margin-right:0px;\\n  box-shadow: none;\\n  transition: .3s;\\n\\n  &:hover {\\n    box-shadow: 5px 0px 10px 5px rgba(51, 51, 51, 0.25);\\n    z-index: 3;\\n    margin-right: -20px;\\n  }\\n\\n  @media (\", \") {\\n    padding: 0 2rem;\\n    height: 85px;\\n  }\\n\\n  @media (\", \") {\\n    padding: 0 3rem;\\n    height: 100px;\\n  }\\n\"], [\"\\n  background: \", \";\\n  border-radius: 5px;\\n  cursor: pointer;\\n  display: flex;\\n  flex-flow: nowrap;\\n  height: 70px;\\n  min-width: 100%;\\n  padding: 0 1rem;\\n  width: auto;\\n\\n  margin-right:0px;\\n  box-shadow: none;\\n  transition: .3s;\\n\\n  &:hover {\\n    box-shadow: 5px 0px 10px 5px rgba(51, 51, 51, 0.25);\\n    z-index: 3;\\n    margin-right: -20px;\\n  }\\n\\n  @media (\", \") {\\n    padding: 0 2rem;\\n    height: 85px;\\n  }\\n\\n  @media (\", \") {\\n    padding: 0 3rem;\\n    height: 100px;\\n  }\\n\"]),\n    _templateObject4 = _taggedTemplateLiteral([\"\\n  \", \"\\n  display: flex;\\n  align-items: center;\\n  background-image: url(/img/app_wallet/rectangle-wallet.svg);\\n  background-size: 100% 100%;\\n  font-size: 1rem;\\n  height: 75px;\\n  justify-content: center;\\n  padding-bottom: 2rem;\\n  width: 100%;\\n\\n  @media (\", \") {\\n    font-size: 1.4rem;\\n    height: 95px;\\n  }\\n\"], [\"\\n  \", \"\\n  display: flex;\\n  align-items: center;\\n  background-image: url(/img/app_wallet/rectangle-wallet.svg);\\n  background-size: 100% 100%;\\n  font-size: 1rem;\\n  height: 75px;\\n  justify-content: center;\\n  padding-bottom: 2rem;\\n  width: 100%;\\n\\n  @media (\", \") {\\n    font-size: 1.4rem;\\n    height: 95px;\\n  }\\n\"]),\n    _templateObject5 = _taggedTemplateLiteral([\"\\n  display: flex;\\n  justify-content: flex-start;\\n  align-items: center;\\n\"], [\"\\n  display: flex;\\n  justify-content: flex-start;\\n  align-items: center;\\n\"]),\n    _templateObject6 = _taggedTemplateLiteral([\"\\n  width: 25px;\\n  height: 25px;\\n  min-width: 25px;\\n\\n  @media (\", \") {\\n    width: 32px;\\n    height: 32px;\\n  }\\n\\n  @media (\", \") {\\n    width: 40px;\\n    height: 40px;\\n  }\\n\"], [\"\\n  width: 25px;\\n  height: 25px;\\n  min-width: 25px;\\n\\n  @media (\", \") {\\n    width: 32px;\\n    height: 32px;\\n  }\\n\\n  @media (\", \") {\\n    width: 40px;\\n    height: 40px;\\n  }\\n\"]),\n    _templateObject7 = _taggedTemplateLiteral([\"\\n  display: flex;\\n  flex-flow: wrap;\\n  justify-content: center;\\n  align-items: center;\\n  align-content: center;\\n  width:100%;\\n\"], [\"\\n  display: flex;\\n  flex-flow: wrap;\\n  justify-content: center;\\n  align-items: center;\\n  align-content: center;\\n  width:100%;\\n\"]),\n    _templateObject8 = _taggedTemplateLiteral([\"\\n  \", \"\\n  width: 100%;\\n  text-align: right;\\n  font-size: 1.2rem;\\n\\n  @media (\", \") {\\n    font-size: 1.4rem;\\n  }\\n\"], [\"\\n  \", \"\\n  width: 100%;\\n  text-align: right;\\n  font-size: 1.2rem;\\n\\n  @media (\", \") {\\n    font-size: 1.4rem;\\n  }\\n\"]),\n    _templateObject9 = _taggedTemplateLiteral([\"\"], [\"\"]);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _Components = __webpack_require__(/*! Components */ \"./src/shared/components/index.js\");\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _actions = __webpack_require__(/*! Redux/actions */ \"./src/shared/redux/actions/index.js\");\n\nvar _Loading = __webpack_require__(/*! Components/Loading */ \"./src/shared/components/Loading.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n//REDUX\n\n\nvar StyledCoins = _styledComponents2.default.div(_templateObject);\nvar StyledLoading = _styledComponents2.default.div(_templateObject2);\n\nvar Coin = _styledComponents2.default.div(_templateObject3, _styleVariables2.default.normalLilac, _styleVariables2.default.media.tablet2, _styleVariables2.default.media.laptop);\n\nvar CoinsHeader = _styledComponents2.default.div(_templateObject4, _Components.TextBase, _styleVariables2.default.media.tablet2);\n\nvar WrapCoinImg = _styledComponents2.default.div(_templateObject5);\n\nvar CoinImg = _styledComponents2.default.img(_templateObject6, _styleVariables2.default.media.tablet2, _styleVariables2.default.media.laptop);\n\nvar WrapCoinData = _styledComponents2.default.div(_templateObject7);\n\nvar CoinValue = _styledComponents2.default.div(_templateObject8, _Components.TextBase, _styleVariables2.default.media.tablet2);\n\nvar CoinAmount = CoinValue.extend(_templateObject9);\n\nvar Coins = function (_React$Component) {\n  _inherits(Coins, _React$Component);\n\n  function Coins(props) {\n    _classCallCheck(this, Coins);\n\n    var _this = _possibleConstructorReturn(this, (Coins.__proto__ || Object.getPrototypeOf(Coins)).call(this, props));\n\n    _this._renderCoins = function () {\n      var currentNetwork = _this.props.component.wallet.currentNetwork;\n      var price = _this.props.currencies.price;\n      var balance = _this.props.balance;\n\n      if (!balance || !price) {\n        return _react2.default.createElement(_Loading.Loading, null);\n      }\n      var components = [];\n      // EX: coinKey = 'btc';\n      for (var coinKey in balance) {\n        var currentBalance = balance[coinKey];\n        var tmp = _react2.default.createElement(\n          Coin,\n          {\n            key: coinKey,\n            onClick: function onClick() {\n              _this.props.openPanelRight();\n            }\n          },\n          _react2.default.createElement(\n            WrapCoinImg,\n            null,\n            _react2.default.createElement(CoinImg, { src: \"/img/coins/\" + coinKey.toLowerCase() + \".svg\" })\n          ),\n          _react2.default.createElement(\n            WrapCoinData,\n            null,\n            _react2.default.createElement(\n              CoinAmount,\n              { clWhite: true, offSide: true, size: \"2.5rem\" },\n              currentBalance.total_confirmed\n            ),\n            _react2.default.createElement(\n              CoinValue,\n              { clWhite: true, offSide: true, size: \"2rem\" },\n              \"USD \" + currentBalance.total_amount\n            )\n          )\n        );\n        components.push(tmp);\n      }\n      return components;\n    };\n\n    _this.state = {\n      balance: undefined,\n      price: undefined\n    };\n    return _this;\n  }\n\n  //metodo chamado sempre que o componente é renderizado ou um\n  //estado é atualizado\n\n\n  _createClass(Coins, [{\n    key: \"render\",\n    value: function render() {\n      return _react2.default.createElement(\n        StyledCoins,\n        null,\n        _react2.default.createElement(\n          CoinsHeader,\n          null,\n          \"MINHAS CARTEIRAS\"\n        ),\n        this._renderCoins()\n      );\n    }\n  }]);\n\n  return Coins;\n}(_react2.default.Component);\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    component: state.component,\n    currencies: state.currencies,\n    balance: state.balance\n  };\n};\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return {\n    openPanelRight: function openPanelRight() {\n      dispatch((0, _actions.openPanelRight)());\n    }\n  };\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Coins);\n\n//# sourceURL=webpack:///./src/shared/containers/Wallet/PanelLeft/Coins/index.js?");

/***/ }),

/***/ "./src/shared/containers/Wallet/PanelLeft/index.js":
/*!*********************************************************!*\
  !*** ./src/shared/containers/Wallet/PanelLeft/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\tbackground: ', ';\\n  box-shadow: 30px 0 40px rgba(0,0,0,.2);\\n  color: #fff;\\n\\theight: 100%;\\n\\tmax-width: 280px;\\n  min-width: 130px;\\n\\tposition: relative;\\n  width: 30%;\\n\\tz-index: 2;\\n\\tposition: relative;\\n\\twidth: 31.66666%;\\n\\n\\ttransform-origin: left;\\n\\ttransform: scaleX(1);\\n\\topacity: 1;\\n\\n\\t// transition: transform 0.3s, opacity 0.5s;\\n\\ttransition: width .3s, max-width .5s;\\n'], ['\\n\\tbackground: ', ';\\n  box-shadow: 30px 0 40px rgba(0,0,0,.2);\\n  color: #fff;\\n\\theight: 100%;\\n\\tmax-width: 280px;\\n  min-width: 130px;\\n\\tposition: relative;\\n  width: 30%;\\n\\tz-index: 2;\\n\\tposition: relative;\\n\\twidth: 31.66666%;\\n\\n\\ttransform-origin: left;\\n\\ttransform: scaleX(1);\\n\\topacity: 1;\\n\\n\\t// transition: transform 0.3s, opacity 0.5s;\\n\\ttransition: width .3s, max-width .5s;\\n']),\n    _templateObject2 = _taggedTemplateLiteral(['\\n\\tposition: absolute;\\n\\tright: -25px;\\n\\tbottom: 50%;\\n\\twidth: 25px;\\n\\theight: 25px;\\n\\tbackground: white;\\n\\tcursor: pointer;\\n\\tvisibility: visible !important;\\n'], ['\\n\\tposition: absolute;\\n\\tright: -25px;\\n\\tbottom: 50%;\\n\\twidth: 25px;\\n\\theight: 25px;\\n\\tbackground: white;\\n\\tcursor: pointer;\\n\\tvisibility: visible !important;\\n']);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _ui = __webpack_require__(/*! Utils/ui */ \"./src/shared/utils/ui.js\");\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _Coins = __webpack_require__(/*! ./Coins */ \"./src/shared/containers/Wallet/PanelLeft/Coins/index.js\");\n\nvar _Coins2 = _interopRequireDefault(_Coins);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\n//PRIVATE COMPONENTS\n\n\nvar StyledPanelLeft = _styledComponents2.default.div.attrs({\n\tstate: 'visible'\n})(_templateObject, _styleVariables2.default.normalLilac);\nvar TogglePanelLeft = _styledComponents2.default.div(_templateObject2);\n\nvar PanelLeft = function (_React$Component) {\n\t_inherits(PanelLeft, _React$Component);\n\n\tfunction PanelLeft() {\n\t\tvar _ref;\n\n\t\tvar _temp, _this, _ret;\n\n\t\t_classCallCheck(this, PanelLeft);\n\n\t\tfor (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n\t\t\targs[_key] = arguments[_key];\n\t\t}\n\n\t\treturn _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PanelLeft.__proto__ || Object.getPrototypeOf(PanelLeft)).call.apply(_ref, [this].concat(args))), _this), _this.handleTogglePanelLeft = function (event) {\n\t\t\tvar panelLeftEl = event.currentTarget.parentElement;\n\t\t\t(0, _ui.toggleWidth)({\n\t\t\t\telement: panelLeftEl,\n\t\t\t\tvisible: '30%',\n\t\t\t\thidden: '0px'\n\t\t\t});\n\t\t}, _temp), _possibleConstructorReturn(_this, _ret);\n\t}\n\n\t_createClass(PanelLeft, [{\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\treturn _react2.default.createElement(\n\t\t\t\tStyledPanelLeft,\n\t\t\t\tnull,\n\t\t\t\t_react2.default.createElement(TogglePanelLeft, { onClick: this.handleTogglePanelLeft }),\n\t\t\t\t_react2.default.createElement(_Coins2.default, null)\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn PanelLeft;\n}(_react2.default.Component);\n\nexports.default = PanelLeft;\n\n//# sourceURL=webpack:///./src/shared/containers/Wallet/PanelLeft/index.js?");

/***/ }),

/***/ "./src/shared/containers/Wallet/PanelRight/CoinControl.js":
/*!****************************************************************!*\
  !*** ./src/shared/containers/Wallet/PanelRight/CoinControl.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _templateObject = _taggedTemplateLiteral([\"\\n  width: 100%;\\n  padding: 30px 25px;\\n  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);\\n\"], [\"\\n  width: 100%;\\n  padding: 30px 25px;\\n  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);\\n\"]),\n    _templateObject2 = _taggedTemplateLiteral([\"\\n  text-align: center;\\n  margin-bottom: 2rem;\\n  margin-top: 5px;\\n\\n  @media (\", \") {\\n    text-align: right;\\n    margin-bottom: 0;\\n    margin-right: 2rem;\\n  }\\n\\n  @media (min-width: 900px) {\\n    margin-right: 1rem;\\n  }\\n\"], [\"\\n  text-align: center;\\n  margin-bottom: 2rem;\\n  margin-top: 5px;\\n\\n  @media (\", \") {\\n    text-align: right;\\n    margin-bottom: 0;\\n    margin-right: 2rem;\\n  }\\n\\n  @media (min-width: 900px) {\\n    margin-right: 1rem;\\n  }\\n\"]),\n    _templateObject3 = _taggedTemplateLiteral([\"\\n  \", \"\\n  font-size: 2rem;\\n  color: white;\\n\\n  @media (\", \") {\\n    font-size: 4rem;\\n    margin-top: 1rem;\\n  }\\n\"], [\"\\n  \", \"\\n  font-size: 2rem;\\n  color: white;\\n\\n  @media (\", \") {\\n    font-size: 4rem;\\n    margin-top: 1rem;\\n  }\\n\"]),\n    _templateObject4 = _taggedTemplateLiteral([\"\\n  \", \"\\n  color: white;\\n  display: inline-block;\\n  font-size: 1.5rem;\\n  line-height: 50px;\\n  margin-top: 1rem;\\n\\n  @media (\", \") {\\n    font-size: 1.7rem;\\n    margin-top: 1rem;\\n  }\\n\"], [\"\\n  \", \"\\n  color: white;\\n  display: inline-block;\\n  font-size: 1.5rem;\\n  line-height: 50px;\\n  margin-top: 1rem;\\n\\n  @media (\", \") {\\n    font-size: 1.7rem;\\n    margin-top: 1rem;\\n  }\\n\"]),\n    _templateObject5 = _taggedTemplateLiteral([\"\"], [\"\"]),\n    _templateObject6 = _taggedTemplateLiteral([\"\\n  border-left: 1px solid \", \";\\n  display: inline-block;\\n  margin: 0 20px -10px 20px;\\n  min-height: 3rem;\\n\"], [\"\\n  border-left: 1px solid \", \";\\n  display: inline-block;\\n  margin: 0 20px -10px 20px;\\n  min-height: 3rem;\\n\"]),\n    _templateObject7 = _taggedTemplateLiteral([\"\\n  \", \"\\n  border-radius: 10px;\\n  color: white;\\n  cursor: pointer;\\n  font-size: 1.2rem;\\n  margin: 0 1rem 0 1.5rem;\\n  padding: 5px 0;\\n  text-align: center;\\n  width: 70px;\\n\\n  @media (\", \") {\\n    border-radius: 24px;\\n    font-size: 1.5rem;\\n    padding: 20px 0;\\n    width: 100px;\\n    height: 100px;\\n  }\\n\\n  @media (\", \") {\\n    margin: 0 1rem;\\n  }\\n\"], [\"\\n  \", \"\\n  border-radius: 10px;\\n  color: white;\\n  cursor: pointer;\\n  font-size: 1.2rem;\\n  margin: 0 1rem 0 1.5rem;\\n  padding: 5px 0;\\n  text-align: center;\\n  width: 70px;\\n\\n  @media (\", \") {\\n    border-radius: 24px;\\n    font-size: 1.5rem;\\n    padding: 20px 0;\\n    width: 100px;\\n    height: 100px;\\n  }\\n\\n  @media (\", \") {\\n    margin: 0 1rem;\\n  }\\n\"]),\n    _templateObject8 = _taggedTemplateLiteral([\"\\n  float: right;\\n  background: \", \";\\n\"], [\"\\n  float: right;\\n  background: \", \";\\n\"]),\n    _templateObject9 = _taggedTemplateLiteral([\"\\n  background: \", \";\\n\"], [\"\\n  background: \", \";\\n\"]),\n    _templateObject10 = _taggedTemplateLiteral([\"\\n  width: 32px;\\n  height: 32px;\\n  margin-top: 5px;\\n  margin-bottom: 3px;\\n\"], [\"\\n  width: 32px;\\n  height: 32px;\\n  margin-top: 5px;\\n  margin-bottom: 3px;\\n\"]);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _TextBase = __webpack_require__(/*! Components/TextBase */ \"./src/shared/components/TextBase.js\");\n\nvar _Text = __webpack_require__(/*! Components/Text */ \"./src/shared/components/Text.js\");\n\nvar _index = __webpack_require__(/*! Components/index */ \"./src/shared/components/index.js\");\n\nvar _index2 = __webpack_require__(/*! ./Modal/Send/index */ \"./src/shared/containers/Wallet/PanelRight/Modal/Send/index.js\");\n\nvar _index3 = _interopRequireDefault(_index2);\n\nvar _index4 = __webpack_require__(/*! ./Modal/Receive/index */ \"./src/shared/containers/Wallet/PanelRight/Modal/Receive/index.js\");\n\nvar _index5 = _interopRequireDefault(_index4);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar StyledCoinControl = _styledComponents2.default.div(_templateObject);\n\nvar WrapAmount = _styledComponents2.default.div(_templateObject2, _styleVariables2.default.media.tablet2);\n\nvar Amount = _styledComponents2.default.div(_templateObject3, _TextBase.TextBase, _styleVariables2.default.media.mobile2);\n\nvar MonetaryValue = _styledComponents2.default.div(_templateObject4, _TextBase.TextBase, _styleVariables2.default.media.mobile2);\n\nvar Usd = MonetaryValue.extend(_templateObject5);\n\nvar Brl = MonetaryValue.extend(_templateObject5);\n\nvar Divisor = _styledComponents2.default.div(_templateObject6, _styleVariables2.default.normalGreen);\n\nvar CoinAction = _styledComponents2.default.div(_templateObject7, _TextBase.TextBase, _styleVariables2.default.media.mobile2, _styleVariables2.default.media.tablet2);\n\nvar SendCoin = CoinAction.extend(_templateObject8, _styleVariables2.default.normalRed);\n\nvar ReceiveCoin = CoinAction.extend(_templateObject9, _styleVariables2.default.normalGreen);\n\nvar SendCoinImage = _styledComponents2.default.img(_templateObject10);\n\nvar CoinControl = function (_React$Component) {\n  _inherits(CoinControl, _React$Component);\n\n  function CoinControl() {\n    _classCallCheck(this, CoinControl);\n\n    var _this = _possibleConstructorReturn(this, (CoinControl.__proto__ || Object.getPrototypeOf(CoinControl)).call(this));\n\n    _this.handleToggleSendModal = function () {};\n\n    _this.showModalReceived = function () {\n      _this.setState({\n        isOpenModalReceived: !_this.state.isOpenModalReceived\n      });\n    };\n\n    _this.state = { isOpenModalReceived: false };\n    return _this;\n  }\n\n  _createClass(CoinControl, [{\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      return _react2.default.createElement(\n        StyledCoinControl,\n        null,\n        _react2.default.createElement(\n          _index.Row,\n          { overflowHidden: true },\n          _react2.default.createElement(\n            _index.Col,\n            { s: 12, m: 6, l: 8 },\n            _react2.default.createElement(\n              WrapAmount,\n              null,\n              _react2.default.createElement(\n                Amount,\n                { offSide: true },\n                \"0.00000001\"\n              ),\n              _react2.default.createElement(\n                Usd,\n                null,\n                \"USD 2.00\"\n              ),\n              _react2.default.createElement(Divisor, null),\n              _react2.default.createElement(\n                Brl,\n                null,\n                \"BRL 6,30\"\n              )\n            )\n          ),\n          _react2.default.createElement(\n            _index.Col,\n            { s: 6, m: 3, l: 2 },\n            _react2.default.createElement(\n              SendCoin,\n              null,\n              _react2.default.createElement(SendCoinImage, { src: \"/img/app_wallet/ic_enviar.svg\" }),\n              _react2.default.createElement(\"br\", null),\n              \"Enviar\"\n            )\n          ),\n          _react2.default.createElement(\n            _index.Col,\n            { s: 6, m: 3, l: 2 },\n            _react2.default.createElement(\n              ReceiveCoin,\n              { onClick: function onClick() {\n                  return _this2.showModalReceived();\n                } },\n              _react2.default.createElement(SendCoinImage, { src: \"/img/app_wallet/ic_receber.svg\" }),\n              _react2.default.createElement(\"br\", null),\n              \"Receber\"\n            ),\n            this.state.isOpenModalReceived && _react2.default.createElement(_index5.default, { isShow: this.state.isOpenModalReceived })\n          )\n        )\n      );\n    }\n  }]);\n\n  return CoinControl;\n}(_react2.default.Component);\n\nexports.default = CoinControl;\n\n//# sourceURL=webpack:///./src/shared/containers/Wallet/PanelRight/CoinControl.js?");

/***/ }),

/***/ "./src/shared/containers/Wallet/PanelRight/CoinGraph.js":
/*!**************************************************************!*\
  !*** ./src/shared/containers/Wallet/PanelRight/CoinGraph.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _recharts = __webpack_require__(/*! recharts */ \"recharts\");\n\nvar _Wallet = __webpack_require__(/*! Classes/Wallet */ \"./src/shared/classes/Wallet.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar CoinGraph = function (_React$Component) {\n  _inherits(CoinGraph, _React$Component);\n\n  function CoinGraph() {\n    var _this2 = this;\n\n    _classCallCheck(this, CoinGraph);\n\n    var _this = _possibleConstructorReturn(this, (CoinGraph.__proto__ || Object.getPrototypeOf(CoinGraph)).call(this));\n\n    _this.coinHistory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n      var obj, wallet, walletFormatted;\n      return regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              obj = { fromSymbol: _this.props.currentNetwork, toSymbol: \"USD\", range: \"RANGE_1D\" };\n              _context.next = 3;\n              return new _Wallet.WalletClass().getCoinHistory(obj);\n\n            case 3:\n              wallet = _context.sent;\n              _context.next = 6;\n              return _this.convertTimestampToDate(wallet.data);\n\n            case 6:\n              walletFormatted = _context.sent;\n\n\n              _this.setState(function () {\n                return {\n                  history_time_price: walletFormatted\n                };\n              });\n\n            case 8:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee, _this2);\n    }));\n\n    _this.convertTimestampToDate = function () {\n      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(data) {\n        return regeneratorRuntime.wrap(function _callee2$(_context2) {\n          while (1) {\n            switch (_context2.prev = _context2.next) {\n              case 0:\n                data.map(function (timeStamp) {\n                  var date = new Date(timeStamp.time * 1000);\n\n                  var months = [\"Jan\", \"Fev\", \"Mar\", \"Abr\", \"Mai\", \"Jun\", \"Jul\", \"Ago\", \"Set\", \"Out\", \"Nov\", \"Dez\"];\n\n                  timeStamp.time = date.getDate() + \" / \" + months[date.getMonth()] + \" / \" + date.getFullYear() + \"  \\n      \" + ((date.getHours() < 10 ? \"0\" : \"\") + date.getHours()) + \":\" + ((date.getMinutes() < 10 ? \"0\" : \"\") + date.getMinutes());\n                });\n\n                _context2.next = 3;\n                return data;\n\n              case 3:\n                return _context2.abrupt(\"return\", _context2.sent);\n\n              case 4:\n              case \"end\":\n                return _context2.stop();\n            }\n          }\n        }, _callee2, _this2);\n      }));\n\n      return function (_x) {\n        return _ref2.apply(this, arguments);\n      };\n    }();\n\n    _this.state = {\n      history_time_price: []\n    };\n    return _this;\n  }\n\n  _createClass(CoinGraph, [{\n    key: \"componentWillMount\",\n    value: function componentWillMount() {\n      this.coinHistory();\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var fontStyle = {\n        fontSize: \"10pt\",\n        color: \"#4cd566\",\n        fontWeight: \"bold\"\n      };\n\n      var styleWrapper = {\n        backgroundColor: \"#3B1878\"\n      };\n\n      return _react2.default.createElement(\n        \"div\",\n        null,\n        _react2.default.createElement(\n          _recharts.ResponsiveContainer,\n          { width: this.props.width, height: this.props.height },\n          _react2.default.createElement(\n            _recharts.LineChart,\n            { data: this.state.history_time_price },\n            _react2.default.createElement(_recharts.XAxis, { hide: true, dataKey: \"time\" }),\n            _react2.default.createElement(_recharts.YAxis, { hide: true, domain: [\"dataMin\", \"dataMax\"] }),\n            _react2.default.createElement(_recharts.Tooltip, { wrapperStyle: styleWrapper, labelStyle: fontStyle, itemStyle: fontStyle, separator: \": $\" }),\n            _react2.default.createElement(_recharts.Line, { dataKey: \"close\", dot: false, stroke: \"#4cd566\" })\n          )\n        )\n      );\n    }\n  }]);\n\n  return CoinGraph;\n}(_react2.default.Component);\n\nexports.default = CoinGraph;\n\n//# sourceURL=webpack:///./src/shared/containers/Wallet/PanelRight/CoinGraph.js?");

/***/ }),

/***/ "./src/shared/containers/Wallet/PanelRight/CoinStatus.js":
/*!***************************************************************!*\
  !*** ./src/shared/containers/Wallet/PanelRight/CoinStatus.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _templateObject = _taggedTemplateLiteral([\"\\n  width: 100%;\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  background: \", \";\\n  padding: 1.5rem 1rem;\\n\"], [\"\\n  width: 100%;\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  background: \", \";\\n  padding: 1.5rem 1rem;\\n\"]),\n    _templateObject2 = _taggedTemplateLiteral([\"\\n  \", \"\\n  width: 100%;\\n  font-size: 1.5rem;\\n  color: white;\\n  text-align: left;\\n\\n  @media (\", \") {\\n    font-size: \\t3.0rem;\\n  }\\n\"], [\"\\n  \", \"\\n  width: 100%;\\n  font-size: 1.5rem;\\n  color: white;\\n  text-align: left;\\n\\n  @media (\", \") {\\n    font-size: \\t3.0rem;\\n  }\\n\"]),\n    _templateObject3 = _taggedTemplateLiteral([\"\\n  margin-top: 3rem;\\n  padding-left: 1rem;\\n\\n  @media (\", \") {\\n    margin-top: 2rem;\\n    padding-left: 2rem;\\n  }\\n\\n  @media (\", \") {\\n    padding-left: 3rem;\\n  }\\n\\n  @media (\", \") {\\n    text-align: center;\\n  }\\n\"], [\"\\n  margin-top: 3rem;\\n  padding-left: 1rem;\\n\\n  @media (\", \") {\\n    margin-top: 2rem;\\n    padding-left: 2rem;\\n  }\\n\\n  @media (\", \") {\\n    padding-left: 3rem;\\n  }\\n\\n  @media (\", \") {\\n    text-align: center;\\n  }\\n\"]),\n    _templateObject4 = _taggedTemplateLiteral([\"\\n  padding: 1rem;\\n\\n  @media (\", \") {\\n    padding: 1rem 2rem;\\n  }\\n\\n  @media (\", \") {\\n    padding: 1rem 3rem;\\n  }\\n\\n  @media (\", \") {\\n    padding: 1rem 20%;\\n  }\\n\"], [\"\\n  padding: 1rem;\\n\\n  @media (\", \") {\\n    padding: 1rem 2rem;\\n  }\\n\\n  @media (\", \") {\\n    padding: 1rem 3rem;\\n  }\\n\\n  @media (\", \") {\\n    padding: 1rem 20%;\\n  }\\n\"]),\n    _templateObject5 = _taggedTemplateLiteral([\"\\n  margin-left: 33%;\\n  display: flex;\\n  align-items: center;\\n  background: \", \";\\n  border-radius: 10px;\\n  height: 45px; // Mesma altura da div do gr\\xE1fico\\n  justify-content: center;\\n  margin-top: 3rem !important;\\n  width: 4rem !important;\\n\\n  @media (\", \") {\\n    margin-top: 40px !important;\\n    width: 7rem !important;\\n  }\\n\\n  @media (\", \") {\\n    width: 9rem !important;\\n  }\\n\"], [\"\\n  margin-left: 33%;\\n  display: flex;\\n  align-items: center;\\n  background: \", \";\\n  border-radius: 10px;\\n  height: 45px; // Mesma altura da div do gr\\xE1fico\\n  justify-content: center;\\n  margin-top: 3rem !important;\\n  width: 4rem !important;\\n\\n  @media (\", \") {\\n    margin-top: 40px !important;\\n    width: 7rem !important;\\n  }\\n\\n  @media (\", \") {\\n    width: 9rem !important;\\n  }\\n\"]),\n    _templateObject6 = _taggedTemplateLiteral([\"\\n  \", \"\\n  \\n  width: 130px;\\n  height: 52px;\\n  border-radius: 10px;\\n  background-color: #ff1c38;  \\n  color: white;\\n  text-align: center;\\n  padding: 15px 25px 25px 25px;\\n  \\n\\n \\n  @media (\", \") {\\n    font-size: 2rem;\\n  }\\n\"], [\"\\n  \", \"\\n  \\n  width: 130px;\\n  height: 52px;\\n  border-radius: 10px;\\n  background-color: #ff1c38;  \\n  color: white;\\n  text-align: center;\\n  padding: 15px 25px 25px 25px;\\n  \\n\\n \\n  @media (\", \") {\\n    font-size: 2rem;\\n  }\\n\"]);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _CoinGraph = __webpack_require__(/*! ./CoinGraph */ \"./src/shared/containers/Wallet/PanelRight/CoinGraph.js\");\n\nvar _CoinGraph2 = _interopRequireDefault(_CoinGraph);\n\nvar _Wallet = __webpack_require__(/*! Classes/Wallet */ \"./src/shared/classes/Wallet.js\");\n\nvar _TextBase = __webpack_require__(/*! Components/TextBase */ \"./src/shared/components/TextBase.js\");\n\nvar _Text = __webpack_require__(/*! Components/Text */ \"./src/shared/components/Text.js\");\n\nvar _Loading = __webpack_require__(/*! Components/Loading */ \"./src/shared/components/Loading.js\");\n\nvar _index = __webpack_require__(/*! Components/index */ \"./src/shared/components/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n//COMPONENTS\n\n\nvar StyledCoinStatus = _styledComponents2.default.div(_templateObject, _styleVariables2.default.normalLilac3);\n\nvar CoinDetailsText = _styledComponents2.default.div(_templateObject2, _TextBase.TextBase, _styleVariables2.default.media.laptop);\n\nvar CoinDetails = _styledComponents2.default.div(_templateObject3, _styleVariables2.default.media.mobile2, _styleVariables2.default.media.tablet2, _styleVariables2.default.media.laptop);\n\nvar GraphContainer = _styledComponents2.default.div(_templateObject4, _styleVariables2.default.media.mobile2, _styleVariables2.default.media.tablet2, _styleVariables2.default.media.laptop);\n\nvar WrapCoinPercent = _styledComponents2.default.div(_templateObject5, _styleVariables2.default.normalGreen, _styleVariables2.default.media.mobile2, _styleVariables2.default.media.tablet2);\n\nvar CoinPercent = _styledComponents2.default.div(_templateObject6, _TextBase.TextBase, _styleVariables2.default.media.tablet2);\n\nvar CoinStatus = function (_React$Component) {\n  _inherits(CoinStatus, _React$Component);\n\n  function CoinStatus() {\n    var _this2 = this;\n\n    _classCallCheck(this, CoinStatus);\n\n    var _this = _possibleConstructorReturn(this, (CoinStatus.__proto__ || Object.getPrototypeOf(CoinStatus)).call(this));\n\n    _this.calcCoinPorcent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n      var obj, wallet, coinPrices, coinPriceLength, lastValueCoin, currentValueCoin;\n      return regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              obj = { fromSymbol: _this.props.wallet.currentNetwork.toUpperCase(), toSymbol: \"USD\", range: \"RANGE_1D\" };\n              _context.next = 3;\n              return new _Wallet.WalletClass().getCoinHistory(obj);\n\n            case 3:\n              wallet = _context.sent;\n              coinPrices = wallet.data;\n              coinPriceLength = coinPrices.length;\n              lastValueCoin = coinPrices[0].close;\n              currentValueCoin = coinPrices[coinPriceLength - 1].close;\n\n\n              _this.setState(function () {\n                return {\n                  coin_porcentage_price: (currentValueCoin * 100 / lastValueCoin - 100).toFixed(2)\n                };\n              });\n\n            case 9:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee, _this2);\n    }));\n\n\n    _this.state = {\n      coin_porcentage_price: []\n    };\n    return _this;\n  }\n\n  _createClass(CoinStatus, [{\n    key: \"componentWillMount\",\n    value: function componentWillMount() {\n      this.calcCoinPorcent();\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var currentNetwork = this.props.wallet.currentNetwork;\n      var price = this.props.cryptocurrencies.price;\n\n      if (!price) {\n        return null;\n      }\n\n      return _react2.default.createElement(\n        StyledCoinStatus,\n        null,\n        _react2.default.createElement(\n          _index.Row,\n          null,\n          _react2.default.createElement(\n            _index.Col,\n            { s: 12, m: 3, l: 3 },\n            _react2.default.createElement(\n              CoinDetails,\n              null,\n              _react2.default.createElement(\n                CoinDetailsText,\n                { offSide: true },\n                \"BitCoin\"\n              ),\n              _react2.default.createElement(\n                CoinDetailsText,\n                { offSide: true },\n                \"1 BTC \" + currentNetwork.toUpperCase() + \" R$\" + '31.000,00'\n              )\n            )\n          ),\n          _react2.default.createElement(\n            _index.Col,\n            { s: 8, m: 6, l: 6 },\n            _react2.default.createElement(\n              GraphContainer,\n              null,\n              _react2.default.createElement(_CoinGraph2.default, { width: \"95%\", height: 75, currentNetwork: currentNetwork.toUpperCase() })\n            )\n          ),\n          _react2.default.createElement(\n            _index.Col,\n            { s: 4, m: 3, l: 3 },\n            _react2.default.createElement(\n              WrapCoinPercent,\n              { style: this.state.coin_porcentage_price < 0 ? { background: 'indianred' } : { background: 'lightgreen' } },\n              _react2.default.createElement(\n                CoinPercent,\n                null,\n                this.state.coin_porcentage_price,\n                \"%\"\n              )\n            )\n          )\n        )\n      );\n    }\n  }]);\n\n  return CoinStatus;\n}(_react2.default.Component);\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    wallet: state.component.wallet,\n    cryptocurrencies: state.cryptocurrencies\n  };\n};\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return {};\n};\nexports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CoinStatus);\n\n//# sourceURL=webpack:///./src/shared/containers/Wallet/PanelRight/CoinStatus.js?");

/***/ }),

/***/ "./src/shared/containers/Wallet/PanelRight/Default.js":
/*!************************************************************!*\
  !*** ./src/shared/containers/Wallet/PanelRight/Default.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\twidth: 100%;\\n\\theight: 100%:\\n\\tdisplay: flex;\\n\\tjustify-content: center;\\n\\talign-items: center;\\n'], ['\\n\\twidth: 100%;\\n\\theight: 100%:\\n\\tdisplay: flex;\\n\\tjustify-content: center;\\n\\talign-items: center;\\n']),\n    _templateObject2 = _taggedTemplateLiteral(['\\n  margin: 40% auto 2rem auto;\\n  width: 5rem;\\n\\n  @media(', ') {\\n    margin: 30% auto 2rem auto;\\n    width: 6rem;\\n  }\\n\\n  @media(', ') {\\n    width: 7rem;\\n  }\\n'], ['\\n  margin: 40% auto 2rem auto;\\n  width: 5rem;\\n\\n  @media(', ') {\\n    margin: 30% auto 2rem auto;\\n    width: 6rem;\\n  }\\n\\n  @media(', ') {\\n    width: 7rem;\\n  }\\n']),\n    _templateObject3 = _taggedTemplateLiteral(['\\n  color: #fff;\\n  font-weight: 500;\\n  margin: 1rem;\\n  text-align: center;\\n'], ['\\n  color: #fff;\\n  font-weight: 500;\\n  margin: 1rem;\\n  text-align: center;\\n']);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _Components = __webpack_require__(/*! Components */ \"./src/shared/components/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar StyledDefault = _styledComponents2.default.div(_templateObject);\n\nvar Icon = _Components.Img.extend(_templateObject2, _styleVariables2.default.media.tablet2, _styleVariables2.default.media.laptop);\n\nvar CustomH3 = _Components.H3.extend(_templateObject3);\n\nvar Default = function (_React$Component) {\n  _inherits(Default, _React$Component);\n\n  function Default() {\n    _classCallCheck(this, Default);\n\n    return _possibleConstructorReturn(this, (Default.__proto__ || Object.getPrototypeOf(Default)).apply(this, arguments));\n  }\n\n  _createClass(Default, [{\n    key: 'render',\n    value: function render() {\n      return _react2.default.createElement(\n        StyledDefault,\n        null,\n        _react2.default.createElement(Icon, { src: \"/img/app_wallet/ic_default.svg\" }),\n        _react2.default.createElement(\n          CustomH3,\n          null,\n          'Selecione uma carteira ',\n          _react2.default.createElement('br', null),\n          'em seu portf\\xF3lio.'\n        )\n      );\n    }\n  }]);\n\n  return Default;\n}(_react2.default.Component);\n\nexports.default = Default;\n\n//# sourceURL=webpack:///./src/shared/containers/Wallet/PanelRight/Default.js?");

/***/ }),

/***/ "./src/shared/containers/Wallet/PanelRight/Histories.js":
/*!**************************************************************!*\
  !*** ./src/shared/containers/Wallet/PanelRight/Histories.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _templateObject = _taggedTemplateLiteral([\"\\n  padding-top: 20px;\\n\"], [\"\\n  padding-top: 20px;\\n\"]),\n    _templateObject2 = _taggedTemplateLiteral([\"\\n  width: 100%;\\n  border-bottom: 1px solid #432678;\\n  position: relative;\\n\"], [\"\\n  width: 100%;\\n  border-bottom: 1px solid #432678;\\n  position: relative;\\n\"]),\n    _templateObject3 = _taggedTemplateLiteral([\"\\n  display: flex;\\n  cursor: pointer;\\n  padding: 10px 0;\\n  &:hover + .js-history-content {\\n    max-height: 300px;\\n    height: 100%;\\n    box-shadow: 0 5px 7px inset rgba(0,0,0,.2);\\n  }\\n  width: 100%;\\n\"], [\"\\n  display: flex;\\n  cursor: pointer;\\n  padding: 10px 0;\\n  &:hover + .js-history-content {\\n    max-height: 300px;\\n    height: 100%;\\n    box-shadow: 0 5px 7px inset rgba(0,0,0,.2);\\n  }\\n  width: 100%;\\n\"]),\n    _templateObject4 = _taggedTemplateLiteral([\"\\n  float: right;\\n  margin-right: 1rem;\\n\\n  @media (\", \") {\\n    float: center;\\n  }\\n\"], [\"\\n  float: right;\\n  margin-right: 1rem;\\n\\n  @media (\", \") {\\n    float: center;\\n  }\\n\"]),\n    _templateObject5 = _taggedTemplateLiteral([\"\\n  width: 20px;\\n  height: 20px;\\n  display: block;\\n  margin: 2px auto;\\n\"], [\"\\n  width: 20px;\\n  height: 20px;\\n  display: block;\\n  margin: 2px auto;\\n\"]),\n    _templateObject6 = _taggedTemplateLiteral([\"\\n  \", \"\\n  color: white;\\n  font-size: 1.2rem;\\n  font-weight: bold;\\n  text-align: center;\\n\\n  @media (\", \") {\\n    font-size: 1.4rem;\\n  }\\n\"], [\"\\n  \", \"\\n  color: white;\\n  font-size: 1.2rem;\\n  font-weight: bold;\\n  text-align: center;\\n\\n  @media (\", \") {\\n    font-size: 1.4rem;\\n  }\\n\"]),\n    _templateObject7 = _taggedTemplateLiteral([\"\\n  \", \"\\n  display: flex;\\n  align-items: center;\\n  color: white;\\n  font-size: 1.2rem;\\n  margin: 1.5rem 0 0 1rem;\\n\\n  @media (\", \") {\\n    margin: 2.4rem 0 0 1rem;\\n  }\\n\\n  @media (\", \") {\\n    font-size: 1.4rem;\\n    margin: 1rem 0 0 1rem;\\n  }\\n\"], [\"\\n  \", \"\\n  display: flex;\\n  align-items: center;\\n  color: white;\\n  font-size: 1.2rem;\\n  margin: 1.5rem 0 0 1rem;\\n\\n  @media (\", \") {\\n    margin: 2.4rem 0 0 1rem;\\n  }\\n\\n  @media (\", \") {\\n    font-size: 1.4rem;\\n    margin: 1rem 0 0 1rem;\\n  }\\n\"]),\n    _templateObject8 = _taggedTemplateLiteral([\"\\n  \", \"\\n  display: flex;\\n  color: white;\\n  flex-flow: nowrap;\\n  margin: 1rem;\\n  justify-content: center;\\n\\n  @media (\", \") {\\n    justify-content: flex-end;\\n  }\\n\"], [\"\\n  \", \"\\n  display: flex;\\n  color: white;\\n  flex-flow: nowrap;\\n  margin: 1rem;\\n  justify-content: center;\\n\\n  @media (\", \") {\\n    justify-content: flex-end;\\n  }\\n\"]),\n    _templateObject9 = _taggedTemplateLiteral([\"\\n  \", \"\\n  color: white;\\n  padding-right: 1rem;\\n  font-weight: bold;\\n  font-size: 1.2rem;\\n  \", \";\\n\\n  @media (\", \") {\\n    font-size: 1.4rem;\\n  }\\n\"], [\"\\n  \", \"\\n  color: white;\\n  padding-right: 1rem;\\n  font-weight: bold;\\n  font-size: 1.2rem;\\n  \", \";\\n\\n  @media (\", \") {\\n    font-size: 1.4rem;\\n  }\\n\"]),\n    _templateObject10 = _taggedTemplateLiteral([\"\\n  \", \"\\n  font-size: 1.2rem;\\n  color: white;\\n  padding-left: 1rem;\\n\\n  @media (\", \") {\\n    font-size: 1.4rem;\\n    margin-right: 1rem;\\n  }\\n\"], [\"\\n  \", \"\\n  font-size: 1.2rem;\\n  color: white;\\n  padding-left: 1rem;\\n\\n  @media (\", \") {\\n    font-size: 1.4rem;\\n    margin-right: 1rem;\\n  }\\n\"]),\n    _templateObject11 = _taggedTemplateLiteral([\"\\n  display: flex;\\n  background: \", \";\\n  flex-flow: nowrap;\\n  left: 0px;\\n  padding: 1rem 30% 1rem 3rem;\\n  top: 100%;\\n  width: 100%;\\n  word-wrap: break-word;\\n\\n  height: 0;\\n  max-height: 0;\\n\\n  transition: all 1s;\\n\\n  @media (\", \") {\\n    padding: 1rem 2rem;\\n  }\\n\\n  &:hover {\\n    height: 100%;\\n    max-height: 300px;\\n    box-shadow: 0 5px 7px inset rgba(0,0,0,.2);\\n  }\\n\"], [\"\\n  display: flex;\\n  background: \", \";\\n  flex-flow: nowrap;\\n  left: 0px;\\n  padding: 1rem 30% 1rem 3rem;\\n  top: 100%;\\n  width: 100%;\\n  word-wrap: break-word;\\n\\n  height: 0;\\n  max-height: 0;\\n\\n  transition: all 1s;\\n\\n  @media (\", \") {\\n    padding: 1rem 2rem;\\n  }\\n\\n  &:hover {\\n    height: 100%;\\n    max-height: 300px;\\n    box-shadow: 0 5px 7px inset rgba(0,0,0,.2);\\n  }\\n\"]),\n    _templateObject12 = _taggedTemplateLiteral([\"\\n  \", \"\\n  width: 100%;\\n  padding-bottom: 5px;\\n\"], [\"\\n  \", \"\\n  width: 100%;\\n  padding-bottom: 5px;\\n\"]),\n    _templateObject13 = _taggedTemplateLiteral([\"\\n  color: white;\\n  text-align: center;\\n  font-size: 1.2rem;\\n  font-weight: bold;\\n  margin-right: 5px;\\n  \", \";\\n\\n  @media (\", \") {\\n    font-size: 1.4rem;\\n  }\\n\"], [\"\\n  color: white;\\n  text-align: center;\\n  font-size: 1.2rem;\\n  font-weight: bold;\\n  margin-right: 5px;\\n  \", \";\\n\\n  @media (\", \") {\\n    font-size: 1.4rem;\\n  }\\n\"]);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _functions = __webpack_require__(/*! Utils/functions */ \"./src/shared/utils/functions.js\");\n\nvar _index = __webpack_require__(/*! Components/index */ \"./src/shared/components/index.js\");\n\nvar _Wallet = __webpack_require__(/*! Classes/Wallet */ \"./src/shared/classes/Wallet.js\");\n\nvar _satoshiBitcoin = __webpack_require__(/*! satoshi-bitcoin */ \"satoshi-bitcoin\");\n\nvar _satoshiBitcoin2 = _interopRequireDefault(_satoshiBitcoin);\n\nvar _actions = __webpack_require__(/*! Redux/actions */ \"./src/shared/redux/actions/index.js\");\n\nvar _TextBase = __webpack_require__(/*! Components/TextBase */ \"./src/shared/components/TextBase.js\");\n\nvar _Text = __webpack_require__(/*! Components/Text */ \"./src/shared/components/Text.js\");\n\nvar _Loading = __webpack_require__(/*! Components/Loading */ \"./src/shared/components/Loading.js\");\n\nvar _Cookie = __webpack_require__(/*! Classes/Cookie */ \"./src/shared/classes/Cookie.js\");\n\nvar _Cookie2 = _interopRequireDefault(_Cookie);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n//REDUX\n\n\nvar StyledHistories = _styledComponents2.default.div(_templateObject);\n\nvar History = _styledComponents2.default.div(_templateObject2);\n\nvar HistoryHead = _styledComponents2.default.div(_templateObject3);\n\nvar HistoryHeadStatus = _styledComponents2.default.div(_templateObject4, _styleVariables2.default.media.tablet2);\n\nvar HeadStatusIcon = _styledComponents2.default.img(_templateObject5);\n\nvar HeadStatusDate = _styledComponents2.default.div(_templateObject6, _TextBase.TextBase, _styleVariables2.default.media.tablet2);\n\nvar HistoryHeadText = _styledComponents2.default.div(_templateObject7, _TextBase.TextBase, _styleVariables2.default.media.mobile2, _styleVariables2.default.media.tablet2);\n\nvar HistoryHeadAmount = _styledComponents2.default.div(_templateObject8, _TextBase.TextBase, _styleVariables2.default.media.tablet2);\n\nvar HeadAmountCoin = _styledComponents2.default.div(_templateObject9, _TextBase.TextBase, function (props) {\n  if (props.type === \"SPENT\") {\n    return \"color: #ff1c38;\";\n  } else if (props.type === \"RECEIVED\") {\n    return \"color: #4cd566;\";\n  } else {\n    return \"background: \" + _styleVariables2.default.normalLilac + \";\";\n  }\n}, _styleVariables2.default.media.tablet2);\n\nvar HeadAmountMoney = _styledComponents2.default.div(_templateObject10, _TextBase.TextBase, _styleVariables2.default.media.tablet2);\n\nvar HistoryContent = _styledComponents2.default.div.attrs({\n  className: \"js-history-content\"\n})(_templateObject11, _styleVariables2.default.normalLilac, _styleVariables2.default.media.tablet2);\n\nvar HistoryContentItem = _styledComponents2.default.div(_templateObject12, _TextBase.TextBase);\n\nvar StatusStyle = _styledComponents2.default.div(_templateObject13, function (props) {\n  if (props.type === \"SPENT\") {\n    return \"color: #ff1c38;\";\n  } else if (props.type === \"RECEIVED\") {\n    return \"color: #4cd566;\";\n  } else {\n    return \"background: \" + _styleVariables2.default.normalLilac + \";\";\n  }\n}, _styleVariables2.default.media.tablet2);\n\nvar Histories = function (_React$Component) {\n  _inherits(Histories, _React$Component);\n\n  function Histories(props) {\n    var _this2 = this;\n\n    _classCallCheck(this, Histories);\n\n    props = _extends({}, props, {\n      txHistory: []\n    });\n\n    var _this = _possibleConstructorReturn(this, (Histories.__proto__ || Object.getPrototypeOf(Histories)).call(this, props));\n\n    _this.timeToText = function (txTime, type) {\n      var hoursDiff = (0, _functions.timestampDiff)({ first: txTime });\n      if (hoursDiff < 48) {\n        return hoursDiff + \" horas atr\\xE1s\";\n      } else {\n        return Math.round(hoursDiff / 24) + \" dias atr\\xE1s\";\n      }\n    };\n\n    _this.icoStatusToText = function (type) {\n      if (type === \"RECEIVED\") return \"Recebido \";\n\n      return \"Enviado \";\n    };\n\n    _this.SignalControl = function (type) {\n      return type == \"RECEIVED\" ? \"+\" : \"-\";\n    };\n\n    _this.parseTimestampToDate = function (timestamp) {\n      if (!timestamp) return null;\n      var date = new Date(timestamp);\n      var weekDay = date.getDay();\n      switch (weekDay) {\n        case 0:\n          weekDay = \"Segunda-feira\";\n          break;\n        case 1:\n          weekDay = \"Terça-feira\";\n          break;\n        case 2:\n          weekDay = \"Quarta-feira\";\n          break;\n        case 3:\n          weekDay = \"Quinta-feira\";\n          break;\n        case 4:\n          weekDay = \"Sexta-feira\";\n          break;\n        case 5:\n          weekDay = \"Sabado\";\n          break;\n        case 6:\n          weekDay = \"Domingo\";\n          break;\n      }\n      var day = date.getDate();\n      var month = date.getMonth() + 1;\n      var year = date.getYear();\n      return weekDay + \" \" + day + \"/\" + month + \"/\" + year;\n    };\n\n    _this.renderIcon = function (type) {\n      if (type === \"SPENT\") return \"/img/app_wallet/ic_enviado_.svg\";\n      if (type === \"RECEIVED\") return \"/img/app_wallet/ic_receber_.svg\";\n\n      return;\n    };\n\n    _this.componentDidMount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n      var _this$props$component, currentNetwork, price, Cookie, user, address;\n\n      return regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              // 'n4VQ5YdHf7hLQ2gWQYYrcxoE5B7nWuDFNF';\n              // txHistory = await new WalletClass().getTxHistory({coin: currentNetwork, address: 'moNjrdaiwked7d8jYoNxpCTZC4CyheckQH'});\n              // txHistory = await new WalletClass().getTxHistory({network: currentNetwork});\n              _this$props$component = _this.props.component_wallet, currentNetwork = _this$props$component.currentNetwork, price = _this$props$component.price;\n              Cookie = new _Cookie2.default();\n              user = JSON.parse(Cookie.get('user').user.toString());\n              address = user.wallet.coins[0].addresses[0].address;\n\n              _this.props.setTxHistory({ network: 'BTCTESTNET', address: address });\n\n            case 5:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee, _this2);\n    }));\n\n    _this._renderHistories = function () {\n      var _this$props$component2 = _this.props.component_wallet,\n          currentNetwork = _this$props$component2.currentNetwork,\n          currentTxHistory = _this$props$component2.currentTxHistory;\n      var price = _this.props.cryptocurrencies.price;\n\n      console.warn(currentTxHistory.length, \"__PRICE__\");\n      if (currentTxHistory.length < 1) {\n        return _react2.default.createElement(_Loading.Loading, { className: \"js-loading\", size: '35px', bWidth: '7px' });\n      }\n      return currentTxHistory.map(function (tx, key) {\n        return _react2.default.createElement(\n          History,\n          { key: key },\n          _react2.default.createElement(\n            HistoryHead,\n            { onClick: _this.handleToggleHistory },\n            _react2.default.createElement(\n              _index.Row,\n              null,\n              _react2.default.createElement(\n                _index.Col,\n                { s: 6, m: 2, l: 2 },\n                _react2.default.createElement(\n                  HistoryHeadStatus,\n                  null,\n                  _react2.default.createElement(HeadStatusIcon, { type: tx.type, src: _this.renderIcon(tx.type) }),\n                  _react2.default.createElement(\n                    HeadStatusDate,\n                    null,\n                    \"25/05/2018\"\n                  )\n                )\n              ),\n              _react2.default.createElement(\n                _index.Col,\n                { s: 6, m: 4, l: 5 },\n                _react2.default.createElement(\n                  HistoryHeadText,\n                  null,\n                  _react2.default.createElement(\n                    StatusStyle,\n                    { type: tx.type },\n                    _this.icoStatusToText(tx.type)\n                  ),\n                  \"90 dias atr\\xE1s\"\n                )\n              ),\n              _react2.default.createElement(\n                _index.Col,\n                { s: 12, m: 6, l: 5 },\n                _react2.default.createElement(\n                  HistoryHeadAmount,\n                  null,\n                  _react2.default.createElement(\n                    HeadAmountCoin,\n                    { type: tx.type },\n                    _this.SignalControl(tx.type),\n                    tx.value\n                  ),\n                  _react2.default.createElement(\n                    HeadAmountMoney,\n                    null,\n                    monetaryValue(price.USD * parseFloat(tx.value), { style: 'currency', currency: 'USD' })\n                  )\n                )\n              )\n            )\n          ),\n          _react2.default.createElement(\n            HistoryContent,\n            null,\n            _react2.default.createElement(\n              _index.Row,\n              null,\n              _react2.default.createElement(\n                _index.Col,\n                { m: 6, l: 6 },\n                _react2.default.createElement(\n                  HistoryContentItem,\n                  { clWhite: true },\n                  _react2.default.createElement(\n                    _Text.Text,\n                    { size: \"1.4rem\" },\n                    \"Enviado: \"\n                  ),\n                  _react2.default.createElement(\n                    _Text.Text,\n                    { size: \"1.4rem\", txBold: true },\n                    tx.value + \" \" + currentNetwork.toUpperCase(),\n                    \" ($ \",\n                    monetaryValue(price.USD * parseFloat(tx.value), { style: 'decimal' }),\n                    \")\"\n                  )\n                )\n              ),\n              _react2.default.createElement(\n                _index.Col,\n                { m: 6, l: 6 },\n                _react2.default.createElement(\n                  HistoryContentItem,\n                  { clWhite: true },\n                  _react2.default.createElement(\n                    _Text.Text,\n                    { size: \"1.4rem\" },\n                    \"Transaction ID:\"\n                  ),\n                  _react2.default.createElement(\n                    _Text.Text,\n                    { size: \"1.4rem\", txBold: true },\n                    tx.txid\n                  )\n                )\n              ),\n              _react2.default.createElement(\n                _index.Col,\n                null,\n                _react2.default.createElement(\n                  HistoryContentItem,\n                  { clWhite: true },\n                  _react2.default.createElement(\n                    _Text.Text,\n                    { size: \"1.4rem\" },\n                    \"Data: \"\n                  ),\n                  _react2.default.createElement(\n                    _Text.Text,\n                    { size: \"1.4rem\", txBold: true },\n                    \"Quarta-feira 23/05/2018\"\n                  )\n                )\n              )\n            )\n          )\n        ); //return\n      });\n    };\n\n    _this._shouldRender = function () {\n      var _this$props$component3 = _this.props.component_wallet,\n          currentNetwork = _this$props$component3.currentNetwork,\n          currentTxHistory = _this$props$component3.currentTxHistory;\n\n      if (!currentTxHistory || currentTxHistory.length < 1) return false;\n      // if (!price || !currentNetwork) \n      //   return false;\n\n      return true;\n    };\n\n    return _this;\n  }\n\n  _createClass(Histories, [{\n    key: \"render\",\n    value: function render() {\n      // if (!this._shouldRender()) return null;\n      try {\n        return _react2.default.createElement(\n          StyledHistories,\n          null,\n          this._renderHistories()\n        );\n      } catch (e) {\n        console.error(e);\n        return _react2.default.createElement(\n          \"h1\",\n          null,\n          \"Aconteceu um erro\"\n        );\n      }\n    }\n  }]);\n\n  return Histories;\n}(_react2.default.Component);\n\nvar monetaryValue = function monetaryValue(value, options) {\n  return parseFloat(value.toFixed(2)).toLocaleString('pt-BR', options);\n};\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    component_wallet: state.component.wallet,\n    cryptocurrencies: state.cryptocurrencies\n  };\n};\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return {\n    setTxHistory: function setTxHistory(data) {\n      dispatch((0, _actions.setTxHistory)(data));\n    }\n  };\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Histories);\n\n//# sourceURL=webpack:///./src/shared/containers/Wallet/PanelRight/Histories.js?");

/***/ }),

/***/ "./src/shared/containers/Wallet/PanelRight/Modal/Background.js":
/*!*********************************************************************!*\
  !*** ./src/shared/containers/Wallet/PanelRight/Modal/Background.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\tposition: fixed;\\n\\ttop: 10px;\\n\\tleft: 0px;\\n\\twidth: 100%;\\n\\theight: 100%;\\n\\tdisplay: flex;\\n\\tjustify-content: center;\\n\\talign-items: flex-end;\\n\\tbackground: ', ';\\n\\tz-index: 1000;\\n\\t@media (min-width: 601px) {\\n\\t\\talign-items: center;\\n\\t}\\n\\t& * {\\n\\t\\toverflow: visible;\\n\\t}\\n'], ['\\n\\tposition: fixed;\\n\\ttop: 10px;\\n\\tleft: 0px;\\n\\twidth: 100%;\\n\\theight: 100%;\\n\\tdisplay: flex;\\n\\tjustify-content: center;\\n\\talign-items: flex-end;\\n\\tbackground: ', ';\\n\\tz-index: 1000;\\n\\t@media (min-width: 601px) {\\n\\t\\talign-items: center;\\n\\t}\\n\\t& * {\\n\\t\\toverflow: visible;\\n\\t}\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar Background = _styledComponents2.default.div(_templateObject, _styleVariables2.default.rgba(_styleVariables2.default.darkLilac, 0.8));\nexports.default = Background;\n\n//# sourceURL=webpack:///./src/shared/containers/Wallet/PanelRight/Modal/Background.js?");

/***/ }),

/***/ "./src/shared/containers/Wallet/PanelRight/Modal/Close.js":
/*!****************************************************************!*\
  !*** ./src/shared/containers/Wallet/PanelRight/Modal/Close.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\tposition: absolute;\\n\\tright: 10px;\\n\\ttop: 10px;\\n\\tfont-size: 2rem;\\n\\tcolor: white;\\n\\tcursor: pointer;\\n'], ['\\n\\tposition: absolute;\\n\\tright: 10px;\\n\\ttop: 10px;\\n\\tfont-size: 2rem;\\n\\tcolor: white;\\n\\tcursor: pointer;\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar Close = _styledComponents2.default.div(_templateObject);\nexports.default = Close;\n\n//# sourceURL=webpack:///./src/shared/containers/Wallet/PanelRight/Modal/Close.js?");

/***/ }),

/***/ "./src/shared/containers/Wallet/PanelRight/Modal/Content.js":
/*!******************************************************************!*\
  !*** ./src/shared/containers/Wallet/PanelRight/Modal/Content.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\toverflow: auto;\\n\\tmargin: 75px 0 0 0;\\n\\tmax-height: calc(100% - 75px);\\n\\toverflow: auto;\\n'], ['\\n\\toverflow: auto;\\n\\tmargin: 75px 0 0 0;\\n\\tmax-height: calc(100% - 75px);\\n\\toverflow: auto;\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar Content = _styledComponents2.default.div(_templateObject);\n\nexports.default = Content;\n\n//# sourceURL=webpack:///./src/shared/containers/Wallet/PanelRight/Modal/Content.js?");

/***/ }),

/***/ "./src/shared/containers/Wallet/PanelRight/Modal/Foot.js":
/*!***************************************************************!*\
  !*** ./src/shared/containers/Wallet/PanelRight/Modal/Foot.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _templateObject = _taggedTemplateLiteral([''], ['']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar Foot = _styledComponents2.default.div(_templateObject);\n\nexports.default = Foot;\n\n//# sourceURL=webpack:///./src/shared/containers/Wallet/PanelRight/Modal/Foot.js?");

/***/ }),

/***/ "./src/shared/containers/Wallet/PanelRight/Modal/Head.js":
/*!***************************************************************!*\
  !*** ./src/shared/containers/Wallet/PanelRight/Modal/Head.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\twidth: 150px;\\n\\theight: 150px;\\n\\tborder-radius: 100%;\\n\\tbackground: ', ';\\n\\tposition: absolute;\\n\\ttop: -75px;\\n\\tleft: calc(50% - 75px);\\n\\tdisplay: flex;\\n\\tjustify-content: center;\\n\\talign-items: center;\\n\\tz-index: 100;\\n\\toverflow: visible;\\n'], ['\\n\\twidth: 150px;\\n\\theight: 150px;\\n\\tborder-radius: 100%;\\n\\tbackground: ', ';\\n\\tposition: absolute;\\n\\ttop: -75px;\\n\\tleft: calc(50% - 75px);\\n\\tdisplay: flex;\\n\\tjustify-content: center;\\n\\talign-items: center;\\n\\tz-index: 100;\\n\\toverflow: visible;\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar Head = _styledComponents2.default.div(_templateObject, _styleVariables2.default.normalLilac);\nexports.default = Head;\n\n//# sourceURL=webpack:///./src/shared/containers/Wallet/PanelRight/Modal/Head.js?");

/***/ }),

/***/ "./src/shared/containers/Wallet/PanelRight/Modal/Hr.js":
/*!*************************************************************!*\
  !*** ./src/shared/containers/Wallet/PanelRight/Modal/Hr.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\tborder: 0.7px solid ', ';\\n'], ['\\n\\tborder: 0.7px solid ', ';\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar Hr = _styledComponents2.default.hr(_templateObject, _styleVariables2.default.darkLilac);\n\nexports.default = Hr;\n\n//# sourceURL=webpack:///./src/shared/containers/Wallet/PanelRight/Modal/Hr.js?");

/***/ }),

/***/ "./src/shared/containers/Wallet/PanelRight/Modal/IconCoin.js":
/*!*******************************************************************!*\
  !*** ./src/shared/containers/Wallet/PanelRight/Modal/IconCoin.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\twidth: 60%;\\n\\theight: 60%;\\n'], ['\\n\\twidth: 60%;\\n\\theight: 60%;\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar IconCoin = _styledComponents2.default.img(_templateObject);\n\nexports.default = IconCoin;\n\n//# sourceURL=webpack:///./src/shared/containers/Wallet/PanelRight/Modal/IconCoin.js?");

/***/ }),

/***/ "./src/shared/containers/Wallet/PanelRight/Modal/Receive/css/index.js":
/*!****************************************************************************!*\
  !*** ./src/shared/containers/Wallet/PanelRight/Modal/Receive/css/index.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.IconAction = exports.ReceiveButtonModalCss = exports.ReceiveLabelTextCss = exports.ReceiveLabelCss = exports.ThirdRowCss = exports.FirstRowCss = exports.ReceiveContentCss = exports.ReceiveButtonQrCodeCss = exports.ReceiveStyleModalCss = undefined;\n\nvar _templateObject = _taggedTemplateLiteral([\"\\n  width: 100%;\\n  height: calc(100% - 75px);\\n  min-width: 320px;\\n  min-height: 414px;\\n  position: relative;\\n  background: #3a1777;\\n  border-radius: 10px;\\n  padding: 3rem;\\n  @media (min-width: 601px) {\\n    width: 25%;\\n    height: 40%;\\n    margin-top: 75px;\\n  }\\n\"], [\"\\n  width: 100%;\\n  height: calc(100% - 75px);\\n  min-width: 320px;\\n  min-height: 414px;\\n  position: relative;\\n  background: #3a1777;\\n  border-radius: 10px;\\n  padding: 3rem;\\n  @media (min-width: 601px) {\\n    width: 25%;\\n    height: 40%;\\n    margin-top: 75px;\\n  }\\n\"]),\n    _templateObject2 = _taggedTemplateLiteral([\"\\n  height: 20rem;\\n  width: 20rem;\\n  border-radius: 20px;\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  cursor: pointer;\\n  user-select: none;\\n\\n  \", \";\\n  \", \";\\n  \", \" \", \";\\n\"], [\"\\n  height: 20rem;\\n  width: 20rem;\\n  border-radius: 20px;\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  cursor: pointer;\\n  user-select: none;\\n\\n  \", \";\\n  \", \";\\n  \", \" \", \";\\n\"]),\n    _templateObject3 = _taggedTemplateLiteral([\"\\n  overflow: auto;\\n  margin: 12px 0 0 0;\\n  max-height: calc(100% - 75px);\\n  overflow: auto;\\n\"], [\"\\n  overflow: auto;\\n  margin: 12px 0 0 0;\\n  max-height: calc(100% - 75px);\\n  overflow: auto;\\n\"]),\n    _templateObject4 = _taggedTemplateLiteral([\"\\n  margin-top: 3rem;\\n  margin-bottom: 3rem;\\n\"], [\"\\n  margin-top: 3rem;\\n  margin-bottom: 3rem;\\n\"]),\n    _templateObject5 = _taggedTemplateLiteral([\"\\n  padding: 25px 0 25px 0;\\n\"], [\"\\n  padding: 25px 0 25px 0;\\n\"]),\n    _templateObject6 = _taggedTemplateLiteral([\"\\n  position: relative;\\n  top: 10px;\\n  color: #fff;\\n  font-size: 12pt;\\n  position: center;\\n\"], [\"\\n  position: relative;\\n  top: 10px;\\n  color: #fff;\\n  font-size: 12pt;\\n  position: center;\\n\"]),\n    _templateObject7 = _taggedTemplateLiteral([\"\\n  position: relative;\\n  top: 10px;\\n  font-weight: bold;\\n  color: #4cd566;\\n  font-size: 14pt;\\n  position: center;\\n\"], [\"\\n  position: relative;\\n  top: 10px;\\n  font-weight: bold;\\n  color: #4cd566;\\n  font-size: 14pt;\\n  position: center;\\n\"]),\n    _templateObject8 = _taggedTemplateLiteral([\"\\n  width: 80px;\\n  height: 80px;\\n  background-color: #f7931a;\\n  border-radius: 60%;\\n  align-items: center;\\n  margin-top: 19%;\\n  margin-right: 10px;\\n  padding: 14px;\\n\"], [\"\\n  width: 80px;\\n  height: 80px;\\n  background-color: #f7931a;\\n  border-radius: 60%;\\n  align-items: center;\\n  margin-top: 19%;\\n  margin-right: 10px;\\n  padding: 14px;\\n\"]),\n    _templateObject9 = _taggedTemplateLiteral([\"\\n  margin-top: 6px;\\n  width: 40px;\\n  height: 40px;\\n  min-width: 50px;\\n  position: center;\\n\"], [\"\\n  margin-top: 6px;\\n  width: 40px;\\n  height: 40px;\\n  min-width: 50px;\\n  position: center;\\n\"]);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _TextBase = __webpack_require__(/*! Components/TextBase.js */ \"./src/shared/components/TextBase.js\");\n\nvar _BackgroundBase = __webpack_require__(/*! Components/bases/BackgroundBase.js */ \"./src/shared/components/bases/BackgroundBase.js\");\n\nvar _BackgroundBase2 = _interopRequireDefault(_BackgroundBase);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar ReceiveStyleModalCss = exports.ReceiveStyleModalCss = _styledComponents2.default.div(_templateObject);\n\nvar ReceiveButtonQrCodeCss = exports.ReceiveButtonQrCodeCss = _styledComponents2.default.div(_templateObject2, _TextBase.TextBase, _BackgroundBase2.default, function (props) {\n  if (props.blockCenter) return \"margin: 0 auto;\";\n}, function (props) {\n  return props.css ? props.css : \"\";\n});\n\nvar ReceiveContentCss = exports.ReceiveContentCss = _styledComponents2.default.div(_templateObject3);\n\nvar FirstRowCss = exports.FirstRowCss = (0, _styledComponents.css)(_templateObject4);\nvar ThirdRowCss = exports.ThirdRowCss = (0, _styledComponents.css)(_templateObject5);\n\nvar ReceiveLabelCss = exports.ReceiveLabelCss = _styledComponents2.default.label(_templateObject6);\n\nvar ReceiveLabelTextCss = exports.ReceiveLabelTextCss = _styledComponents2.default.label(_templateObject7);\n\nvar ReceiveButtonModalCss = exports.ReceiveButtonModalCss = _styledComponents2.default.div(_templateObject8);\n\nvar IconAction = exports.IconAction = _styledComponents2.default.img(_templateObject9);\n\n//# sourceURL=webpack:///./src/shared/containers/Wallet/PanelRight/Modal/Receive/css/index.js?");

/***/ }),

/***/ "./src/shared/containers/Wallet/PanelRight/Modal/Receive/index.js":
/*!************************************************************************!*\
  !*** ./src/shared/containers/Wallet/PanelRight/Modal/Receive/index.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(/*! react-dom */ \"react-dom\");\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _qrcodeGenerator = __webpack_require__(/*! qrcode-generator */ \"qrcode-generator\");\n\nvar _qrcodeGenerator2 = _interopRequireDefault(_qrcodeGenerator);\n\nvar _index = __webpack_require__(/*! Components/index */ \"./src/shared/components/index.js\");\n\nvar _Background = __webpack_require__(/*! ../Background */ \"./src/shared/containers/Wallet/PanelRight/Modal/Background.js\");\n\nvar _Background2 = _interopRequireDefault(_Background);\n\nvar _Close = __webpack_require__(/*! ../Close */ \"./src/shared/containers/Wallet/PanelRight/Modal/Close.js\");\n\nvar _Close2 = _interopRequireDefault(_Close);\n\nvar _Content = __webpack_require__(/*! ../Content */ \"./src/shared/containers/Wallet/PanelRight/Modal/Content.js\");\n\nvar _Content2 = _interopRequireDefault(_Content);\n\nvar _Foot = __webpack_require__(/*! ../Foot */ \"./src/shared/containers/Wallet/PanelRight/Modal/Foot.js\");\n\nvar _Foot2 = _interopRequireDefault(_Foot);\n\nvar _Head = __webpack_require__(/*! ../Head */ \"./src/shared/containers/Wallet/PanelRight/Modal/Head.js\");\n\nvar _Head2 = _interopRequireDefault(_Head);\n\nvar _Hr = __webpack_require__(/*! ../Hr */ \"./src/shared/containers/Wallet/PanelRight/Modal/Hr.js\");\n\nvar _Hr2 = _interopRequireDefault(_Hr);\n\nvar _StyledModal = __webpack_require__(/*! ../StyledModal */ \"./src/shared/containers/Wallet/PanelRight/Modal/StyledModal.js\");\n\nvar _StyledModal2 = _interopRequireDefault(_StyledModal);\n\nvar _css = __webpack_require__(/*! ./css */ \"./src/shared/containers/Wallet/PanelRight/Modal/Receive/css/index.js\");\n\nvar _Cookie = __webpack_require__(/*! ../../../../../classes/Cookie */ \"./src/shared/classes/Cookie.js\");\n\nvar _Cookie2 = _interopRequireDefault(_Cookie);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n//PRIVATE COMPONENTS\n\n\nvar ModalReceive = function (_React$Component) {\n  _inherits(ModalReceive, _React$Component);\n\n  function ModalReceive(props) {\n    _classCallCheck(this, ModalReceive);\n\n    var _this = _possibleConstructorReturn(this, (ModalReceive.__proto__ || Object.getPrototypeOf(ModalReceive)).call(this, props));\n\n    _this.getPayAddress = function () {\n      // let data = new CookieClass().get(\"user\").user.replace(\"; _ga\", \"\");\n      var data = '{\"_id\":\"5afc4dd1eb40bcbca23f92ad\",\"accessToken\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZmM0ZGQxZWI0MGJjYmNhMjNmOTJhZCIsInBob25lVmVyaWZpZWQiOm51bGwsInBpbiI6bnVsbCwidHdvZmFFbmFibGVkIjpudWxsLCJpYXQiOjE1MjcwMDAwNTAsImV4cCI6MTUyNzAwNzI1MH0.uDQQ-pdKDhg0ebagDFVUjwiFei_QyVhlygc7uubsKyo\",\"email\":\"wandyer1@lunes.io\",\"fullname\":\"Wandyer Silva\",\"avatar\":{\"small\":\"\"},\"homeAddress\":\"\",\"phoneNumber\":\"\",\"city\":\"\",\"state\":\"\",\"country\":\"\",\"birthDate\":\"\",\"confirmIcoTerm\":false,\"ownCoupon\":\"5SLBR768\",\"coupon\":\"\",\"whitelist\":false,\"pinIsValidated\":false,\"phoneIsValidated\":false,\"twofaEnabled\":false,\"wallet\":{\"hash\":\"skull ticket hidden split couch orient season tooth valley learn edge truck\",\"coins\":[{\"symbol\":\"btc\",\"currentIndex\":0,\"addresses\":[{\"index\":0,\"address\":\"moNjrdaiwked7d8jYoNxpCTZC4CyheckQH\",\"createdAt\":\"2018-05-16T15:27:12.896Z\"}],\"createdAt\":\"2018-05-16T15:27:12.896Z\"},{\"symbol\":\"ltc\",\"currentIndex\":0,\"addresses\":[{\"index\":0,\"address\":\"moNjrdaiwked7d8jYoNxpCTZC4CyheckQH\",\"createdAt\":\"2018-05-16T15:27:12.896Z\"}],\"createdAt\":\"2018-05-16T15:27:12.896Z\"},{\"symbol\":\"dash\",\"currentIndex\":0,\"addresses\":[{\"index\":0,\"address\":\"yUBEQnE5Xz62qCBFFy3CsqMNSggLL2VJGQ\",\"createdAt\":\"2018-05-16T15:27:12.896Z\"}],\"createdAt\":\"2018-05-16T15:27:12.896Z\"},{\"symbol\":\"eth\",\"currentIndex\":0,\"addresses\":[{\"index\":0,\"address\":\"0x4E3f5C5DEBf6cF3B6468407fD2D8379EB6725197\",\"createdAt\":\"2018-05-16T15:27:12.896Z\"}],\"createdAt\":\"2018-05-16T15:27:12.896Z\"}]},\"depositWallet\":{}}';\n      var address = JSON.parse(data);\n      return address.wallet.coins[0].addresses[0].address;\n    };\n\n    _this.makeQrCode = function () {\n      var address = _this.getPayAddress();\n      var qr = (0, _qrcodeGenerator2.default)(4, \"L\");\n      qr.addData(address);\n      qr.make();\n      var img = qr.createSvgTag();\n      if (!_this.wrapperQr) return; //precisa tirar\n      _this.wrapperQr.innerHTML = img;\n      var imgEl = _this.wrapperQr.children[0];\n      imgEl.style.width = \"90%\";\n      imgEl.style.height = \"auto\";\n    };\n\n    _this.copyPaymentAddress = function () {\n      var element = document.createElement(\"textarea\");\n      element.value = _this.getPayAddress();\n      document.body.appendChild(element);\n      element.select();\n      document.execCommand(\"copy\");\n      document.body.removeChild(element);\n      alert(\"Copiado com sucesso!\");\n    };\n\n    _this.toggleModalReceived = function (isShow) {\n      _this.setState({ isOpenModalReceived: !isShow });\n    };\n\n    _this.ref = {};\n    _this.ref.wrapperQr = _react2.default.createRef();\n    _this.ref.address = _react2.default.createRef();\n    _this.state = { isOpenModalReceived: _this.props.isShow };\n    return _this;\n  }\n\n  _createClass(ModalReceive, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      this.wrapperQr = _reactDom2.default.findDOMNode(this.ref.wrapperQr.current);\n\n      this.makeQrCode();\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      if (!this.state.isOpenModalReceived) return null;\n\n      return _react2.default.createElement(\n        _Background2.default,\n        null,\n        _react2.default.createElement(\n          _css.ReceiveStyleModalCss,\n          null,\n          _react2.default.createElement(\n            _Close2.default,\n            { onClick: function onClick() {\n                return _this2.toggleModalReceived(_this2.props.isShow);\n              } },\n            _react2.default.createElement(\n              \"strong\",\n              null,\n              \"X\"\n            )\n          ),\n          _react2.default.createElement(\n            _css.ReceiveContentCss,\n            null,\n            _react2.default.createElement(\n              _index.Col,\n              { defaultAlign: \"center\", s: 12, m: 12, l: 12 },\n              _react2.default.createElement(\n                _index.Row,\n                null,\n                _react2.default.createElement(\n                  _css.ReceiveButtonQrCodeCss,\n                  { innerRef: this.ref.wrapperQr, blockCenter: true, clWhite: true, bgWhite: true },\n                  \"QR Code\"\n                )\n              )\n            )\n          ),\n          _react2.default.createElement(\n            _Foot2.default,\n            null,\n            _react2.default.createElement(\n              _index.Row,\n              null,\n              _react2.default.createElement(\n                _css.ReceiveLabelCss,\n                null,\n                \" \",\n                this.getPayAddress()\n              )\n            ),\n            _react2.default.createElement(\n              _index.Row,\n              null,\n              _react2.default.createElement(\n                _css.ReceiveLabelTextCss,\n                null,\n                \"COPY THIS ADDRESS\"\n              )\n            ),\n            _react2.default.createElement(\n              _index.Row,\n              null,\n              _react2.default.createElement(\n                _css.ReceiveButtonModalCss,\n                { onClick: function onClick() {\n                    return _this2.copyPaymentAddress();\n                  } },\n                _react2.default.createElement(_css.IconAction, { src: \"/img/app_wallet/modal_receive/ic_copy.svg\" })\n              ),\n              _react2.default.createElement(\n                _css.ReceiveButtonModalCss,\n                null,\n                _react2.default.createElement(_css.IconAction, { src: \"/img/app_wallet/modal_receive/ic_print.svg\" })\n              ),\n              _react2.default.createElement(\n                _css.ReceiveButtonModalCss,\n                null,\n                _react2.default.createElement(_css.IconAction, { src: \"/img/app_wallet/modal_receive/ic_email.svg\" })\n              ),\n              _react2.default.createElement(\n                _css.ReceiveButtonModalCss,\n                null,\n                _react2.default.createElement(_css.IconAction, { src: \"/img/app_wallet/modal_receive/ic_link.svg\" })\n              )\n            )\n          )\n        )\n      );\n    }\n  }]);\n\n  return ModalReceive;\n}(_react2.default.Component);\n\nexports.default = ModalReceive;\n\n//# sourceURL=webpack:///./src/shared/containers/Wallet/PanelRight/Modal/Receive/index.js?");

/***/ }),

/***/ "./src/shared/containers/Wallet/PanelRight/Modal/Send/Final.js":
/*!*********************************************************************!*\
  !*** ./src/shared/containers/Wallet/PanelRight/Modal/Send/Final.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _Components = __webpack_require__(/*! Components */ \"./src/shared/components/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Final = function (_React$Component) {\n\t_inherits(Final, _React$Component);\n\n\tfunction Final() {\n\t\t_classCallCheck(this, Final);\n\n\t\treturn _possibleConstructorReturn(this, (Final.__proto__ || Object.getPrototypeOf(Final)).apply(this, arguments));\n\t}\n\n\t_createClass(Final, [{\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\treturn _react2.default.createElement(\n\t\t\t\t_Components.Row,\n\t\t\t\t{ defaultAlign: 'center' },\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t_Components.Col,\n\t\t\t\t\t{ s: 6, m: 6, l: 6 },\n\t\t\t\t\t_react2.default.createElement(_Components.Img, { center: true, width: '70%', src: '/img/app_wallet/ic_send_final.png' })\n\t\t\t\t)\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn Final;\n}(_react2.default.Component);\n\nexports.default = Final;\n\n//# sourceURL=webpack:///./src/shared/containers/Wallet/PanelRight/Modal/Send/Final.js?");

/***/ }),

/***/ "./src/shared/containers/Wallet/PanelRight/Modal/Send/Loading.js":
/*!***********************************************************************!*\
  !*** ./src/shared/containers/Wallet/PanelRight/Modal/Send/Loading.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\ttransform: translateY(-100%);\\n\\ttransform-origin: top;\\n\\ttransition: all 0.3s;\\n'], ['\\n\\ttransform: translateY(-100%);\\n\\ttransform-origin: top;\\n\\ttransition: all 0.3s;\\n']);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(/*! react-dom */ \"react-dom\");\n\nvar _functions = __webpack_require__(/*! Utils/functions */ \"./src/shared/utils/functions.js\");\n\nvar _Components = __webpack_require__(/*! Components */ \"./src/shared/components/index.js\");\n\nvar _lunesLib = __webpack_require__(/*! lunes-lib */ \"lunes-lib\");\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n//COMPONENTS\n\n\nvar CssWrapper = (0, _styledComponents.css)(_templateObject);\n\nvar Loading = function (_React$Component) {\n\t_inherits(Loading, _React$Component);\n\n\tfunction Loading(props) {\n\t\tvar _this2 = this;\n\n\t\t_classCallCheck(this, Loading);\n\n\t\tvar _this = _possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).call(this, props));\n\n\t\t_this.animThisComponentIn = function () {\n\t\t\t_this.wrapper.style.transform = 'translateY(0px)';\n\t\t};\n\n\t\t_this.animThisComponentOut = function () {\n\t\t\t_this.wrapper.style.transform = 'translateY(-100%)';\n\t\t};\n\n\t\t_this.animCoinComponent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n\t\t\tvar targetAmount, currAmount, prevAmount, increaser;\n\t\t\treturn regeneratorRuntime.wrap(function _callee$(_context) {\n\t\t\t\twhile (1) {\n\t\t\t\t\tswitch (_context.prev = _context.next) {\n\t\t\t\t\t\tcase 0:\n\t\t\t\t\t\t\ttargetAmount = parseFloat(_this.props.coinAmount);\n\t\t\t\t\t\t\tcurrAmount = 0;\n\t\t\t\t\t\t\tprevAmount = 0;\n\t\t\t\t\t\t\t//incremetador é de 10% sobre o valor total\n\n\t\t\t\t\t\t\tincreaser = targetAmount * 0.01;\n\n\t\t\t\t\t\tcase 4:\n\t\t\t\t\t\t\tif (false) {}\n\n\t\t\t\t\t\t\tcurrAmount = currAmount + increaser;\n\n\t\t\t\t\t\t\tif (!(prevAmount >= targetAmount)) {\n\t\t\t\t\t\t\t\t_context.next = 10;\n\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t_this.coinAmount.textContent = targetAmount.toFixed(8);\n\t\t\t\t\t\t\t_this.setState({ blocked: false });\n\t\t\t\t\t\t\treturn _context.abrupt('break', 16);\n\n\t\t\t\t\t\tcase 10:\n\t\t\t\t\t\t\t_context.next = 12;\n\t\t\t\t\t\t\treturn (0, _functions.timer)(20);\n\n\t\t\t\t\t\tcase 12:\n\t\t\t\t\t\t\t_this.coinAmount.textContent = parseFloat(currAmount).toFixed(8);\n\t\t\t\t\t\t\tprevAmount = currAmount;\n\t\t\t\t\t\t\t_context.next = 4;\n\t\t\t\t\t\t\tbreak;\n\n\t\t\t\t\t\tcase 16:\n\t\t\t\t\t\tcase 'end':\n\t\t\t\t\t\t\treturn _context.stop();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}, _callee, _this2);\n\t\t}));\n\t\t_this.send = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {\n\t\t\tvar interval, user, coinAmount, address, network, testnet, userAddress, accessToken, fees, amountBTC, amountSTH, dataHighEstimate, highResult, txData, result;\n\t\t\treturn regeneratorRuntime.wrap(function _callee3$(_context3) {\n\t\t\t\twhile (1) {\n\t\t\t\t\tswitch (_context3.prev = _context3.next) {\n\t\t\t\t\t\tcase 0:\n\t\t\t\t\t\t\tinterval = setInterval(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {\n\t\t\t\t\t\t\t\treturn regeneratorRuntime.wrap(function _callee2$(_context2) {\n\t\t\t\t\t\t\t\t\twhile (1) {\n\t\t\t\t\t\t\t\t\t\tswitch (_context2.prev = _context2.next) {\n\t\t\t\t\t\t\t\t\t\t\tcase 0:\n\t\t\t\t\t\t\t\t\t\t\t\tif (!_this.state.blocked) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t_context2.next = 2;\n\t\t\t\t\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\treturn _context2.abrupt('return');\n\n\t\t\t\t\t\t\t\t\t\t\tcase 2:\n\t\t\t\t\t\t\t\t\t\t\t\tclearInterval(interval);\n\t\t\t\t\t\t\t\t\t\t\t\t_context2.next = 5;\n\t\t\t\t\t\t\t\t\t\t\t\treturn (0, _functions.timer)(1000);\n\n\t\t\t\t\t\t\t\t\t\t\tcase 5:\n\t\t\t\t\t\t\t\t\t\t\t\t_this.animThisComponentOut();\n\t\t\t\t\t\t\t\t\t\t\t\t_this.props.nextStep();\n\n\t\t\t\t\t\t\t\t\t\t\tcase 7:\n\t\t\t\t\t\t\t\t\t\t\tcase 'end':\n\t\t\t\t\t\t\t\t\t\t\t\treturn _context2.stop();\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}, _callee2, _this2);\n\t\t\t\t\t\t\t})), 500);\n\t\t\t\t\t\t\treturn _context3.abrupt('return');\n\n\t\t\t\t\t\tcase 11:\n\t\t\t\t\t\t\tfees = _context3.sent;\n\n\t\t\t\t\t\t\tconsole.log('%c' + JSON.stringify(fees, null, 2) + ' fees', 'background: lightyellow; color: black;');\n\t\t\t\t\t\t\tamountBTC = coinAmount;\n\t\t\t\t\t\t\tamountSTH = _lunesLib.coins.util.unitConverter.toSatoshi(coinAmount);\n\t\t\t\t\t\t\tdataHighEstimate = {\n\t\t\t\t\t\t\t\tnetwork: network,\n\t\t\t\t\t\t\t\ttestnet: testnet,\n\t\t\t\t\t\t\t\ttoAddress: address,\n\t\t\t\t\t\t\t\tfromAddress: userAddress,\n\t\t\t\t\t\t\t\tamount: amountSTH,\n\t\t\t\t\t\t\t\tfeePerByte: fees.data.high\n\t\t\t\t\t\t\t};\n\t\t\t\t\t\t\t_context3.next = 18;\n\t\t\t\t\t\t\treturn _lunesLib.coins.services.estimateFee(dataHighEstimate, accessToken);\n\n\t\t\t\t\t\tcase 18:\n\t\t\t\t\t\t\thighResult = _context3.sent;\n\n\t\t\t\t\t\t\tconsole.log('%c' + JSON.stringify(highResult), 'background: lightblue; color: black;');\n\t\t\t\t\t\t\ttxData = {\n\t\t\t\t\t\t\t\tnetwork: network,\n\t\t\t\t\t\t\t\ttestnet: testnet,\n\t\t\t\t\t\t\t\ttoAddress: address,\n\t\t\t\t\t\t\t\tamount: amountSTH.toString(),\n\t\t\t\t\t\t\t\tfeePerByte: dataHighEstimate.feePerByte.toString()\n\t\t\t\t\t\t\t};\n\t\t\t\t\t\t\t_context3.next = 23;\n\t\t\t\t\t\t\treturn _lunesLib.coins.services.transaction(txData, accessToken);\n\n\t\t\t\t\t\tcase 23:\n\t\t\t\t\t\t\tresult = _context3.sent;\n\n\t\t\t\t\t\t\tconsole.log('%c' + JSON.stringify(result), 'font-size: 20px; color: lightgreen; background: indianred;');\n\t\t\t\t\t\t\t// this.props.nextStep(this.props);\n\n\t\t\t\t\t\tcase 25:\n\t\t\t\t\t\tcase 'end':\n\t\t\t\t\t\t\treturn _context3.stop();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}, _callee3, _this2);\n\t\t}));\n\n\n\t\t_this.state = {\n\t\t\tcoinAmount: 0,\n\t\t\tblocked: true\n\t\t};\n\n\t\t_this.ref = {};\n\t\t_this.ref.wrapper = _react2.default.createRef();\n\t\t_this.ref.coinAmount = _react2.default.createRef();\n\t\treturn _this;\n\t}\n\n\t_createClass(Loading, [{\n\t\tkey: 'componentDidMount',\n\t\tvalue: function componentDidMount() {\n\t\t\tvar _this3 = this;\n\n\t\t\tthis.wrapper = (0, _reactDom.findDOMNode)(this.ref.wrapper.current);\n\t\t\tthis.coinAmount = (0, _reactDom.findDOMNode)(this.ref.coinAmount.current);\n\n\t\t\tsetTimeout(function () {\n\t\t\t\t_this3.animThisComponentIn();\n\t\t\t\tsetTimeout(function () {\n\t\t\t\t\t_this3.animCoinComponent();\n\t\t\t\t}, 300);\n\t\t\t}, 100);\n\t\t\tconsole.log(this.props, \"LOADING PROPS\");\n\t\t\tthis.send();\n\t\t}\n\t}, {\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\treturn _react2.default.createElement(\n\t\t\t\t_Components.Row,\n\t\t\t\t{ css: CssWrapper, ref: this.ref.wrapper, defaultAlign: 'center' },\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t_Components.Col,\n\t\t\t\t\t{ s: 12, m: 6, l: 6 },\n\t\t\t\t\t_react2.default.createElement(_Components.Img, { center: true, width: '10rem', src: '/img/app_wallet/ic_enviado_.svg' }),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t_Components.Text,\n\t\t\t\t\t\t{ margin: '1rem 0 1rem 0', txCenter: true, clWhite: true, size: '3rem' },\n\t\t\t\t\t\t'Enviando'\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(_Components.Text, { ref: this.ref.coinAmount, margin: '0 0 1rem 0', txCenter: true, clNormalGreen: true, size: '2.5rem' }),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t_Components.Text,\n\t\t\t\t\t\t{ txCenter: true, clWhite: true, size: '2.5rem' },\n\t\t\t\t\t\t'Endere\\xE7o'\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t_Components.Text,\n\t\t\t\t\t\t{ txCenter: true, clWhite: true, size: '2rem' },\n\t\t\t\t\t\tthis.props.address\n\t\t\t\t\t)\n\t\t\t\t)\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn Loading;\n}(_react2.default.Component);\n\nexports.default = Loading;\n\n//# sourceURL=webpack:///./src/shared/containers/Wallet/PanelRight/Modal/Send/Loading.js?");

/***/ }),

/***/ "./src/shared/containers/Wallet/PanelRight/Modal/Send/Send.js":
/*!********************************************************************!*\
  !*** ./src/shared/containers/Wallet/PanelRight/Modal/Send/Send.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\ttransform-origin: top;\\n\\ttransform: translateY(-100%);\\n\\ttransition: all 0.3s;\\n'], ['\\n\\ttransform-origin: top;\\n\\ttransform: translateY(-100%);\\n\\ttransition: all 0.3s;\\n']),\n    _templateObject2 = _taggedTemplateLiteral(['margin: 4rem 0 0 0;'], ['margin: 4rem 0 0 0;']);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(/*! react-dom */ \"react-dom\");\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _qrcodeGenerator = __webpack_require__(/*! qrcode-generator */ \"qrcode-generator\");\n\nvar _qrcodeGenerator2 = _interopRequireDefault(_qrcodeGenerator);\n\nvar _inputRadio = __webpack_require__(/*! Components/forms/input-radio */ \"./src/shared/components/forms/input-radio/index.js\");\n\nvar _inputText = __webpack_require__(/*! Components/forms/input-text */ \"./src/shared/components/forms/input-text/index.js\");\n\nvar _index = __webpack_require__(/*! Components/index */ \"./src/shared/components/index.js\");\n\nvar _Hr = __webpack_require__(/*! ../Hr */ \"./src/shared/containers/Wallet/PanelRight/Modal/Hr.js\");\n\nvar _Hr2 = _interopRequireDefault(_Hr);\n\nvar _css = __webpack_require__(/*! ./css */ \"./src/shared/containers/Wallet/PanelRight/Modal/Send/css/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n// import Instascan   from 'instascan';\n\n\n//PRIVATE COMPONENTS\n\n//CUSTOM CSS\n\n\nvar CssWrapper = (0, _styledComponents.css)(_templateObject);\n\nvar Send = function (_React$Component) {\n\t_inherits(Send, _React$Component);\n\n\tfunction Send(props) {\n\t\t_classCallCheck(this, Send);\n\n\t\tvar _this = _possibleConstructorReturn(this, (Send.__proto__ || Object.getPrototypeOf(Send)).call(this, props));\n\n\t\t_initialiseProps.call(_this);\n\n\t\t_this.ref = {};\n\t\t_this.ref.wrapperQr = _react2.default.createRef();\n\t\t_this.ref.radioCoinAmount = _react2.default.createRef();\n\t\t_this.ref.coinAmount = _react2.default.createRef();\n\t\t_this.ref.address = _react2.default.createRef();\n\t\t_this.ref.brlAmount = _react2.default.createRef();\n\t\t_this.ref.usdAmount = _react2.default.createRef();\n\t\t_this.ref.coinAmount = _react2.default.createRef();\n\t\t_this.ref.sendButton = _react2.default.createRef();\n\t\t_this.ref.wrapper = _react2.default.createRef();\n\t\t//quantity types: real, dollar, coin\n\t\t_this.state = {\n\t\t\tstateButtonSend: 'Enviar'\n\t\t};\n\t\treturn _this;\n\t}\n\n\t_createClass(Send, [{\n\t\tkey: 'componentDidMount',\n\t\tvalue: function componentDidMount() {\n\t\t\tvar _this2 = this;\n\n\t\t\tthis.wrapperQr = _reactDom2.default.findDOMNode(this.ref.wrapperQr.current);\n\t\t\tthis.radioCoinAmount = _reactDom2.default.findDOMNode(this.ref.radioCoinAmount.current);\n\t\t\tthis.coinAmount = _reactDom2.default.findDOMNode(this.ref.coinAmount.current);\n\t\t\tthis.address = _reactDom2.default.findDOMNode(this.ref.address.current);\n\t\t\tthis.brlAmount = _reactDom2.default.findDOMNode(this.ref.brlAmount.current);\n\t\t\tthis.usdAmount = _reactDom2.default.findDOMNode(this.ref.usdAmount.current);\n\t\t\tthis.coinAmount = _reactDom2.default.findDOMNode(this.ref.coinAmount.current);\n\t\t\tthis.sendButton = _reactDom2.default.findDOMNode(this.ref.sendButton.current);\n\t\t\tthis.wrapper = _reactDom2.default.findDOMNode(this.ref.wrapper.current);\n\n\t\t\tthis.makeQrCode();\n\t\t\tthis.arrangeAmountType();\n\t\t\tsetTimeout(function () {\n\t\t\t\t_this2.animThisComponentIn();\n\t\t\t}, 500);\n\n\t\t\t//__________________________________-\n\t\t\t// let scanner = new Instascan.Scanner(document.querySelector('.scan'));\n\t\t\t// scanner.addListener('scan', (content) => {\n\t\t\t// \tconsole.log(content);\n\t\t\t// });\n\t\t\t// Instascan.Camera.getCameras().then((cameras) => {\n\t\t\t// \tconsole.log(cameras, \"CAMERAS\");\n\t\t\t// \tif (cameras.length > 0)\n\t\t\t// \t\tscanner.start(cameras[0]);\n\t\t\t// \telse\n\t\t\t// \t\tconsole.log(`%c Cameras arent found`, 'background: red; color: white;');\n\t\t\t// }).catch((err) => {\n\t\t\t// \tconsole.log(`%c ${err}`, 'background: red; color: white;');\n\t\t\t// });\n\t\t}\n\t\t// toggleStateButtonSend = (text, disabled) => {\n\t\t// \tif (disabled)\n\t\t// \t\tthis.sendButton.style.pointerEvents = 'none';\n\t\t// \telse\n\t\t// \t\tthis.sendButton.style.pointerEvents = '';\n\t\t// \tthis.setState({stateButtonSend: text});\n\t\t// }\n\n\t}, {\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\treturn _react2.default.createElement(\n\t\t\t\t_index.Row,\n\t\t\t\t{ css: CssWrapper, ref: this.ref.wrapper },\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t_index.Col,\n\t\t\t\t\t{ s: 9, m: 9, l: 9 },\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t_index.Row,\n\t\t\t\t\t\t{ css: _css.FirstRowCss },\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t_index.Col,\n\t\t\t\t\t\t\t{ offset: 's3', s: 6, m: 6, l: 6 },\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\t_inputRadio.WrapRadio,\n\t\t\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t\t\t_react2.default.createElement(_inputRadio.InputRadio, {\n\t\t\t\t\t\t\t\t\t\tname: 'amount-type',\n\t\t\t\t\t\t\t\t\t\tonChange: this.arrangeAmountType,\n\t\t\t\t\t\t\t\t\t\tvalue: 'coin',\n\t\t\t\t\t\t\t\t\t\tunique: 'true'\n\t\t\t\t\t\t\t\t\t}),\n\t\t\t\t\t\t\t\t\t_react2.default.createElement(_inputRadio.RadioCheckmark, null),\n\t\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\t\t_inputRadio.LabelRadio,\n\t\t\t\t\t\t\t\t\t\t{ clWhite: true },\n\t\t\t\t\t\t\t\t\t\t'Quantidade em BTC'\n\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t),\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t_index.Col,\n\t\t\t\t\t\t\t{ s: 12, m: 6, l: 6 },\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t_index.Row,\n\t\t\t\t\t\t\t\t{ defaultAlign: 'right' },\n\t\t\t\t\t\t\t\t_react2.default.createElement(_inputText.InputText, {\n\t\t\t\t\t\t\t\t\thuge: true,\n\t\t\t\t\t\t\t\t\tphRight: true,\n\t\t\t\t\t\t\t\t\tphWeightLight: true,\n\t\t\t\t\t\t\t\t\twhiteTheme: true,\n\t\t\t\t\t\t\t\t\ttxRight: true,\n\t\t\t\t\t\t\t\t\tnoBorder: true,\n\t\t\t\t\t\t\t\t\tref: this.ref.coinAmount,\n\t\t\t\t\t\t\t\t\tonKeyUp: this.handleOnAmountChange,\n\t\t\t\t\t\t\t\t\t'data-amount-type': 'coin',\n\t\t\t\t\t\t\t\t\tclassName: 'input-amount coin',\n\t\t\t\t\t\t\t\t\tplaceholder: '0.00000000' })\n\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t_index.Row,\n\t\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\t_inputRadio.WrapRadio,\n\t\t\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t\t\t_react2.default.createElement(_inputRadio.InputRadio, {\n\t\t\t\t\t\t\t\t\t\ttype: 'radio',\n\t\t\t\t\t\t\t\t\t\tvalue: 25,\n\t\t\t\t\t\t\t\t\t\tname: 'percent',\n\t\t\t\t\t\t\t\t\t\tunique: 'true',\n\t\t\t\t\t\t\t\t\t\tonClick: this.handleOnPercentChange\n\t\t\t\t\t\t\t\t\t}),\n\t\t\t\t\t\t\t\t\t_react2.default.createElement(_inputRadio.RadioCheckmark, null),\n\t\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\t\t_inputRadio.LabelRadio,\n\t\t\t\t\t\t\t\t\t\t{ clWhite: true },\n\t\t\t\t\t\t\t\t\t\t'25%'\n\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\t_inputRadio.WrapRadio,\n\t\t\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t\t\t_react2.default.createElement(_inputRadio.InputRadio, {\n\t\t\t\t\t\t\t\t\t\ttype: 'radio',\n\t\t\t\t\t\t\t\t\t\tvalue: 50,\n\t\t\t\t\t\t\t\t\t\tname: 'percent',\n\t\t\t\t\t\t\t\t\t\tunique: 'true',\n\t\t\t\t\t\t\t\t\t\tonClick: this.handleOnPercentChange\n\t\t\t\t\t\t\t\t\t}),\n\t\t\t\t\t\t\t\t\t_react2.default.createElement(_inputRadio.RadioCheckmark, null),\n\t\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\t\t_inputRadio.LabelRadio,\n\t\t\t\t\t\t\t\t\t\t{ clWhite: true },\n\t\t\t\t\t\t\t\t\t\t'50%'\n\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\t_inputRadio.WrapRadio,\n\t\t\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t\t\t_react2.default.createElement(_inputRadio.InputRadio, {\n\t\t\t\t\t\t\t\t\t\ttype: 'radio',\n\t\t\t\t\t\t\t\t\t\tvalue: 75,\n\t\t\t\t\t\t\t\t\t\tname: 'percent',\n\t\t\t\t\t\t\t\t\t\tunique: 'true',\n\t\t\t\t\t\t\t\t\t\tonClick: this.handleOnPercentChange\n\t\t\t\t\t\t\t\t\t}),\n\t\t\t\t\t\t\t\t\t_react2.default.createElement(_inputRadio.RadioCheckmark, null),\n\t\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\t\t_inputRadio.LabelRadio,\n\t\t\t\t\t\t\t\t\t\t{ clWhite: true },\n\t\t\t\t\t\t\t\t\t\t'75%'\n\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\t_inputRadio.WrapRadio,\n\t\t\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t\t\t_react2.default.createElement(_inputRadio.InputRadio, {\n\t\t\t\t\t\t\t\t\t\ttype: 'radio',\n\t\t\t\t\t\t\t\t\t\tvalue: 100,\n\t\t\t\t\t\t\t\t\t\tname: 'percent',\n\t\t\t\t\t\t\t\t\t\tunique: 'true',\n\t\t\t\t\t\t\t\t\t\tonClick: this.handleOnPercentChange\n\t\t\t\t\t\t\t\t\t}),\n\t\t\t\t\t\t\t\t\t_react2.default.createElement(_inputRadio.RadioCheckmark, null),\n\t\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\t\t_inputRadio.LabelRadio,\n\t\t\t\t\t\t\t\t\t\t{ clWhite: true },\n\t\t\t\t\t\t\t\t\t\t'100%'\n\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t)\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(_Hr2.default, null),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t_index.Row,\n\t\t\t\t\t\t{ style: { padding: '3rem 0 3rem 0' } },\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t_index.Col,\n\t\t\t\t\t\t\t{ s: 6, m: 6, l: 6 },\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t_inputRadio.WrapRadio,\n\t\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t\t_react2.default.createElement(_inputRadio.InputRadio, {\n\t\t\t\t\t\t\t\t\tname: 'amount-type',\n\t\t\t\t\t\t\t\t\tonChange: this.arrangeAmountType,\n\t\t\t\t\t\t\t\t\tvalue: 'brl',\n\t\t\t\t\t\t\t\t\tunique: 'true'\n\t\t\t\t\t\t\t\t}),\n\t\t\t\t\t\t\t\t_react2.default.createElement(_inputRadio.RadioCheckmark, null),\n\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\t_inputRadio.LabelRadio,\n\t\t\t\t\t\t\t\t\t{ clWhite: true },\n\t\t\t\t\t\t\t\t\t'Quantidade em real'\n\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t_inputRadio.WrapRadio,\n\t\t\t\t\t\t\t\t{ css: (0, _styledComponents.css)(_templateObject2) },\n\t\t\t\t\t\t\t\t_react2.default.createElement(_inputRadio.InputRadio, {\n\t\t\t\t\t\t\t\t\tname: 'amount-type',\n\t\t\t\t\t\t\t\t\tonChange: this.arrangeAmountType,\n\t\t\t\t\t\t\t\t\tvalue: 'usd',\n\t\t\t\t\t\t\t\t\tunique: 'true'\n\t\t\t\t\t\t\t\t}),\n\t\t\t\t\t\t\t\t_react2.default.createElement(_inputRadio.RadioCheckmark, null),\n\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\t_inputRadio.LabelRadio,\n\t\t\t\t\t\t\t\t\t{ clWhite: true },\n\t\t\t\t\t\t\t\t\t'Quantidade em d\\xF3lar'\n\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t),\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t_index.Col,\n\t\t\t\t\t\t\t{ s: 6, m: 6, l: 6 },\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t_index.Row,\n\t\t\t\t\t\t\t\t{ defaultAlign: 'right' },\n\t\t\t\t\t\t\t\t_react2.default.createElement(_inputText.InputText, {\n\t\t\t\t\t\t\t\t\thuge: true,\n\t\t\t\t\t\t\t\t\tphRight: true,\n\t\t\t\t\t\t\t\t\tphWeightLight: true,\n\t\t\t\t\t\t\t\t\twhiteTheme: true,\n\t\t\t\t\t\t\t\t\ttxRight: true,\n\t\t\t\t\t\t\t\t\tnoBorder: true,\n\t\t\t\t\t\t\t\t\ttype: 'text',\n\t\t\t\t\t\t\t\t\tref: this.ref.brlAmount,\n\t\t\t\t\t\t\t\t\tonKeyUp: this.handleOnAmountChange,\n\t\t\t\t\t\t\t\t\tclassName: 'input-amount brl',\n\t\t\t\t\t\t\t\t\t'data-amount-type': 'brl',\n\t\t\t\t\t\t\t\t\tplaceholder: 'BRL 0.00' })\n\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t_index.Row,\n\t\t\t\t\t\t\t\t{ defaultAlign: 'right' },\n\t\t\t\t\t\t\t\t_react2.default.createElement(_inputText.InputText, {\n\t\t\t\t\t\t\t\t\thuge: true,\n\t\t\t\t\t\t\t\t\tphRight: true,\n\t\t\t\t\t\t\t\t\tphWeightLight: true,\n\t\t\t\t\t\t\t\t\twhiteTheme: true,\n\t\t\t\t\t\t\t\t\ttxRight: true,\n\t\t\t\t\t\t\t\t\tnoBorder: true,\n\t\t\t\t\t\t\t\t\ttype: 'text',\n\t\t\t\t\t\t\t\t\tref: this.ref.usdAmount,\n\t\t\t\t\t\t\t\t\tonChange: this.handleOnAmountChange,\n\t\t\t\t\t\t\t\t\tclassName: 'input-amount usd',\n\t\t\t\t\t\t\t\t\t'data-amount-type': 'usd',\n\t\t\t\t\t\t\t\t\tplaceholder: 'USD 0.00' })\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t)\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(_Hr2.default, null),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t_index.Row,\n\t\t\t\t\t\t{ css: _css.ThirdRowCss },\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t_index.Col,\n\t\t\t\t\t\t\t{ s: 12, m: 12, l: 12 },\n\t\t\t\t\t\t\t_react2.default.createElement(_inputText.InputText, {\n\t\t\t\t\t\t\t\tnormal: true,\n\t\t\t\t\t\t\t\twhiteTheme: true,\n\t\t\t\t\t\t\t\ttype: 'text',\n\t\t\t\t\t\t\t\tref: this.ref.address,\n\t\t\t\t\t\t\t\tplaceholder: 'Endereço' })\n\t\t\t\t\t\t)\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(_Hr2.default, null),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t_index.Row,\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\t_react2.default.createElement(_index.Col, null)\n\t\t\t\t\t)\n\t\t\t\t),\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t_index.Col,\n\t\t\t\t\t{\n\t\t\t\t\t\tdefaultAlign: 'center',\n\t\t\t\t\t\ts: 3, m: 3, l: 3 },\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t_index.Row,\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t_index.Button,\n\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\tcss: _css.SendButtonCss,\n\t\t\t\t\t\t\t\tblockCenter: true,\n\t\t\t\t\t\t\t\tclWhite: true,\n\t\t\t\t\t\t\t\tbgNormalYellow: true,\n\t\t\t\t\t\t\t\tonClick: this.handleSend,\n\t\t\t\t\t\t\t\tinnerRef: this.ref.sendButton },\n\t\t\t\t\t\t\t'Enviar'\n\t\t\t\t\t\t)\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t_index.Row,\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t_index.Button,\n\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\tinnerRef: this.ref.wrapperQr,\n\t\t\t\t\t\t\t\tblockCenter: true,\n\t\t\t\t\t\t\t\tclWhite: true,\n\t\t\t\t\t\t\t\tbgWhite: true },\n\t\t\t\t\t\t\t'QR Code'\n\t\t\t\t\t\t)\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement('div', { className: 'scan', style: { width: '100px', height: '100px' } })\n\t\t\t\t)\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn Send;\n}(_react2.default.Component);\n\nvar _initialiseProps = function _initialiseProps() {\n\tvar _this3 = this;\n\n\tthis.toggleModal = function (event) {};\n\n\tthis.makeQrCode = function () {\n\t\tvar qr = (0, _qrcodeGenerator2.default)(4, 'L');\n\t\tqr.addData('Marcelo Rafael');\n\t\tqr.make();\n\t\tvar img = qr.createSvgTag();\n\t\t_this3.wrapperQr.innerHTML = img;\n\t\tvar imgEl = _this3.wrapperQr.children[0];\n\t\timgEl.style.width = '90%';\n\t\timgEl.style.height = 'auto';\n\t};\n\n\tthis.arrangeAmountType = function () {\n\t\tvar radios = document.getElementsByName('amount-type');\n\t\tArray.from(radios).map(function (radio) {\n\t\t\tif (radio.checked) {\n\t\t\t\tvar inputCOIN = document.querySelector('.input-amount.coin');\n\t\t\t\tvar inputBRL = document.querySelector('.input-amount.brl');\n\t\t\t\tvar inputUSD = document.querySelector('.input-amount.usd');\n\t\t\t\tif (radio.value === 'coin') {\n\t\t\t\t\tinputCOIN.removeAttribute('disabled');\n\t\t\t\t\tinputBRL.setAttribute('disabled', true);\n\t\t\t\t\tinputUSD.setAttribute('disabled', true);\n\t\t\t\t} else if (radio.value === 'brl') {\n\t\t\t\t\tinputBRL.removeAttribute('disabled');\n\t\t\t\t\tinputUSD.setAttribute('disabled', true);\n\t\t\t\t\tinputCOIN.setAttribute('disabled', true);\n\t\t\t\t} else if (radio.value === 'usd') {\n\t\t\t\t\tinputUSD.removeAttribute('disabled');\n\t\t\t\t\tinputBRL.setAttribute('disabled', true);\n\t\t\t\t\tinputCOIN.setAttribute('disabled', true);\n\t\t\t\t}\n\t\t\t}\n\t\t});\n\t\tconsole.log('----------------------------');\n\t};\n\n\tthis.handleOnPercentChange = function (event) {\n\t\tvar element = event.currentTarget;\n\t\tvar name = element.getAttribute('name');\n\t\tvar value = element.value;\n\t\tvar amount = parseFloat(_this3.props.balance.total_confirmed);\n\t\tvar result = amount * (parseInt(value) / 100);\n\t\t_this3.coinAmount.value = result;\n\t\t_this3.handleOnAmountChange();\n\t};\n\n\tthis.handleOnAmountChange = function (event) {\n\t\tvar element = void 0;\n\t\tif (!event) {\n\t\t\telement = _this3.coinAmount;\n\t\t} else {\n\t\t\telement = event.currentTarget;\n\t\t}\n\t\tvar type = element.getAttribute('data-amount-type');\n\t\tvar value = element.value;\n\t\tvar coinPrice = _this3.props.coinPrice;\n\n\t\tvar usdResult = void 0;\n\t\tvar coinResult = void 0;\n\t\tvar brlResult = void 0;\n\t\tvar BRLToCOIN = function BRLToCOIN(_ref) {\n\t\t\tvar amount = _ref.amount,\n\t\t\t    price = _ref.price;\n\n\t\t\treturn amount / price;\n\t\t};\n\t\tvar BRLToUSD = function BRLToUSD(_ref2) {\n\t\t\tvar amount = _ref2.amount,\n\t\t\t    price = _ref2.price;\n\n\t\t\treturn amount / price;\n\t\t};\n\t\tvar COINToUSD = function COINToUSD(_ref3) {\n\t\t\tvar amount = _ref3.amount,\n\t\t\t    price = _ref3.price;\n\n\t\t\treturn amount * price;\n\t\t};\n\t\tvar COINToBRL = function COINToBRL(_ref4) {\n\t\t\tvar amount = _ref4.amount,\n\t\t\t    price = _ref4.price;\n\n\t\t\treturn amount * price;\n\t\t};\n\t\tvar USDToBRL = function USDToBRL(_ref5) {\n\t\t\tvar amount = _ref5.amount,\n\t\t\t    price = _ref5.price;\n\n\t\t\treturn amount * price;\n\t\t};\n\t\tvar USDToCOIN = function USDToCOIN(_ref6) {\n\t\t\tvar amount = _ref6.amount,\n\t\t\t    price = _ref6.price;\n\n\t\t\treturn amount / price;\n\t\t};\n\t\tif (type === 'brl') {\n\t\t\tusdResult = BRLToUSD({ amount: parseFloat(value), price: 3.3 });\n\t\t\tcoinResult = BRLToCOIN({ amount: parseFloat(value), price: coinPrice.brl });\n\n\t\t\tif (!usdResult) {\n\t\t\t\tusdResult = 0;\n\t\t\t}\n\t\t\tif (!coinResult) {\n\t\t\t\tcoinResult = 0;\n\t\t\t}\n\n\t\t\t_this3.usdAmount.value = usdResult.toFixed(2);\n\t\t\t_this3.coinAmount.value = coinResult.toFixed(8);\n\t\t} else if (type === 'coin') {\n\t\t\tusdResult = COINToUSD({ amount: parseFloat(value), price: coinPrice.usd });\n\t\t\tbrlResult = COINToBRL({ amount: parseFloat(value), price: coinPrice.brl });\n\n\t\t\tif (!usdResult) {\n\t\t\t\tusdResult = 0;\n\t\t\t}\n\t\t\tif (!brlResult) {\n\t\t\t\tbrlResult = 0;\n\t\t\t}\n\n\t\t\t_this3.brlAmount.value = brlResult.toFixed(2);\n\t\t\t_this3.usdAmount.value = usdResult.toFixed(2);\n\t\t} else if (type === 'usd') {\n\t\t\tbrlResult = USDToBRL({ amount: parseFloat(value), price: 3.3 });\n\t\t\tcoinResult = USDToCOIN({ amount: parseFloat(value), price: coinPrice.usd });\n\n\t\t\tif (!brlResult) {\n\t\t\t\tbrlResult = 0;\n\t\t\t}\n\t\t\tif (!coinResult) {\n\t\t\t\tcoinResult = 0;\n\t\t\t}\n\n\t\t\t_this3.brlAmount.value = brlResult.toFixed(2);\n\t\t\t_this3.coinAmount.value = coinResult.toFixed(8);\n\t\t}\n\t};\n\n\tthis.animThisComponentIn = function () {\n\t\t_this3.wrapper.style.transform = 'translateY(0px)';\n\t};\n\n\tthis.animThisComponentOut = function () {\n\t\t_this3.wrapper.style.transform = 'translateY(-100%)';\n\t};\n\n\tthis.handleSend = function () {\n\t\t// this.toggleStateButtonSend('Carregando...', true);\n\t\tvar coinAmount = _this3.coinAmount.value;\n\t\tvar address = _this3.address.value;\n\t\tif (!coinAmount || !address) return;\n\n\t\tvar props = _extends({}, _this3.props, {\n\t\t\tcoinAmount: coinAmount,\n\t\t\taddress: address\n\t\t\t// console.log(props, \"handleSend PROPS VARIABLE\");\n\t\t});setTimeout(function () {\n\t\t\t_this3.props.nextStep(props);\n\t\t}, 500);\n\t\t_this3.animThisComponentOut();\n\t};\n};\n\nexports.default = Send;\n/*\nconst mapStateToProps = (state) => {\n\treturn {\n\t\twallet: state.wallet\n\t}\n}\nconst mapDispatchToProps = (dispatch) => {\n\treturn {\n\n\t}\n}\nexport default connect(mapStateToProps, mapDispatchToProps)(ModalSend);\n*/\n\n//# sourceURL=webpack:///./src/shared/containers/Wallet/PanelRight/Modal/Send/Send.js?");

/***/ }),

/***/ "./src/shared/containers/Wallet/PanelRight/Modal/Send/css/index.js":
/*!*************************************************************************!*\
  !*** ./src/shared/containers/Wallet/PanelRight/Modal/Send/css/index.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.ThirdRowCss = exports.FirstRowCss = exports.SendButtonCss = undefined;\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\tmargin: 0 auto 20px auto;\\n'], ['\\n\\tmargin: 0 auto 20px auto;\\n']),\n    _templateObject2 = _taggedTemplateLiteral(['\\n\\tmargin-top: 3rem;\\n\\tmargin-bottom: 3rem;\\n'], ['\\n\\tmargin-top: 3rem;\\n\\tmargin-bottom: 3rem;\\n']),\n    _templateObject3 = _taggedTemplateLiteral(['\\n\\tpadding: 25px 0 25px 0;\\n'], ['\\n\\tpadding: 25px 0 25px 0;\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar SendButtonCss = exports.SendButtonCss = (0, _styledComponents.css)(_templateObject);\nvar FirstRowCss = exports.FirstRowCss = (0, _styledComponents.css)(_templateObject2);\nvar ThirdRowCss = exports.ThirdRowCss = (0, _styledComponents.css)(_templateObject3);\n\n//# sourceURL=webpack:///./src/shared/containers/Wallet/PanelRight/Modal/Send/css/index.js?");

/***/ }),

/***/ "./src/shared/containers/Wallet/PanelRight/Modal/Send/index.js":
/*!*********************************************************************!*\
  !*** ./src/shared/containers/Wallet/PanelRight/Modal/Send/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _Send = __webpack_require__(/*! ./Send */ \"./src/shared/containers/Wallet/PanelRight/Modal/Send/Send.js\");\n\nvar _Send2 = _interopRequireDefault(_Send);\n\nvar _Loading = __webpack_require__(/*! ./Loading */ \"./src/shared/containers/Wallet/PanelRight/Modal/Send/Loading.js\");\n\nvar _Loading2 = _interopRequireDefault(_Loading);\n\nvar _Final = __webpack_require__(/*! ./Final */ \"./src/shared/containers/Wallet/PanelRight/Modal/Send/Final.js\");\n\nvar _Final2 = _interopRequireDefault(_Final);\n\nvar _Background = __webpack_require__(/*! ../Background */ \"./src/shared/containers/Wallet/PanelRight/Modal/Background.js\");\n\nvar _Background2 = _interopRequireDefault(_Background);\n\nvar _Close = __webpack_require__(/*! ../Close */ \"./src/shared/containers/Wallet/PanelRight/Modal/Close.js\");\n\nvar _Close2 = _interopRequireDefault(_Close);\n\nvar _Content = __webpack_require__(/*! ../Content */ \"./src/shared/containers/Wallet/PanelRight/Modal/Content.js\");\n\nvar _Content2 = _interopRequireDefault(_Content);\n\nvar _Foot = __webpack_require__(/*! ../Foot */ \"./src/shared/containers/Wallet/PanelRight/Modal/Foot.js\");\n\nvar _Foot2 = _interopRequireDefault(_Foot);\n\nvar _Head = __webpack_require__(/*! ../Head */ \"./src/shared/containers/Wallet/PanelRight/Modal/Head.js\");\n\nvar _Head2 = _interopRequireDefault(_Head);\n\nvar _IconCoin = __webpack_require__(/*! ../IconCoin */ \"./src/shared/containers/Wallet/PanelRight/Modal/IconCoin.js\");\n\nvar _IconCoin2 = _interopRequireDefault(_IconCoin);\n\nvar _StyledModal = __webpack_require__(/*! ../StyledModal */ \"./src/shared/containers/Wallet/PanelRight/Modal/StyledModal.js\");\n\nvar _StyledModal2 = _interopRequireDefault(_StyledModal);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n//COMPONENTS\n\n//PRIVATE COMPONENTS\n\n\nvar Modal = function (_React$Component) {\n\t_inherits(Modal, _React$Component);\n\n\tfunction Modal(props) {\n\t\t_classCallCheck(this, Modal);\n\n\t\tvar _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));\n\n\t\t_initialiseProps.call(_this);\n\n\t\t_this.state = {\n\t\t\tcurrStep: 0,\n\t\t\tgeneralProps: props\n\t\t};\n\t\treturn _this;\n\t}\n\n\t_createClass(Modal, [{\n\t\tkey: 'componentDidMount',\n\t\tvalue: function componentDidMount() {\n\t\t\tvar steps = [{ name: 'Step 1', component: _Send2.default }, { name: 'Step 2', component: _Loading2.default }, { name: 'Step 3', component: _Final2.default }];\n\t\t\tthis.setState({\n\t\t\t\tsteps: steps\n\t\t\t});\n\t\t}\n\t}, {\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\tvar _this2 = this;\n\n\t\t\tif (!this.state.steps) return null;\n\n\t\t\tvar Component = this.state.steps[this.state.currStep].component;\n\t\t\treturn _react2.default.createElement(\n\t\t\t\t_Background2.default,\n\t\t\t\tnull,\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t_StyledModal2.default,\n\t\t\t\t\t{ className: 'js-modal-send' },\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t_Close2.default,\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\t'X'\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t_Head2.default,\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\t_react2.default.createElement(_IconCoin2.default, { src: '/img/bitcoin.svg' })\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t_Content2.default,\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\t_react2.default.createElement(Component, _extends({ nextStep: function nextStep(props) {\n\t\t\t\t\t\t\t\treturn _this2.nextStep(props);\n\t\t\t\t\t\t\t} }, this.state.generalProps))\n\t\t\t\t\t)\n\t\t\t\t)\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn Modal;\n}(_react2.default.Component);\n\nvar _initialiseProps = function _initialiseProps() {\n\tvar _this3 = this;\n\n\tthis.prevStep = function () {};\n\n\tthis.nextStep = function (props) {\n\t\t_this3.setState({\n\t\t\tcurrStep: _this3.state.currStep + 1,\n\t\t\tgeneralProps: props\n\t\t}, function () {\n\t\t\tconsole.log(_this3.state, \"nextStep STATE\");\n\t\t});\n\t};\n};\n\nexports.default = Modal;\n\n//# sourceURL=webpack:///./src/shared/containers/Wallet/PanelRight/Modal/Send/index.js?");

/***/ }),

/***/ "./src/shared/containers/Wallet/PanelRight/Modal/StyledModal.js":
/*!**********************************************************************!*\
  !*** ./src/shared/containers/Wallet/PanelRight/Modal/StyledModal.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\twidth: 100%;\\n\\theight: calc(100% - 75px);\\n\\tmin-width: 320px;\\n\\tmin-height: 480px;\\n\\tposition: relative;\\n\\tbackground: ', ';\\n\\tborder-radius: 10px;\\n\\tpadding: 3rem;\\n\\t@media (min-width: 601px) {\\n\\t\\twidth: 70%;\\n\\t\\theight: 70%;\\n\\t\\tmargin-top: 75px;\\n\\t}\\n'], ['\\n\\twidth: 100%;\\n\\theight: calc(100% - 75px);\\n\\tmin-width: 320px;\\n\\tmin-height: 480px;\\n\\tposition: relative;\\n\\tbackground: ', ';\\n\\tborder-radius: 10px;\\n\\tpadding: 3rem;\\n\\t@media (min-width: 601px) {\\n\\t\\twidth: 70%;\\n\\t\\theight: 70%;\\n\\t\\tmargin-top: 75px;\\n\\t}\\n']);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar StyledModal = _styledComponents2.default.div(_templateObject, _styleVariables2.default.normalLilac);\n\nexports.default = StyledModal;\n\n//# sourceURL=webpack:///./src/shared/containers/Wallet/PanelRight/Modal/StyledModal.js?");

/***/ }),

/***/ "./src/shared/containers/Wallet/PanelRight/index.js":
/*!**********************************************************!*\
  !*** ./src/shared/containers/Wallet/PanelRight/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\t', '\\n\\tfont-weight: bold;\\n\\tdisplay: inline-block;\\n'], ['\\n\\t', '\\n\\tfont-weight: bold;\\n\\tdisplay: inline-block;\\n']),\n    _templateObject2 = _taggedTemplateLiteral(['\\n\\tposition: relative;\\n\\tbackground: ', ';\\n\\twidth: 100%;\\n\\theight: 100%;\\n\\toverflow-x: auto;\\n'], ['\\n\\tposition: relative;\\n\\tbackground: ', ';\\n\\twidth: 100%;\\n\\theight: 100%;\\n\\toverflow-x: auto;\\n']);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _functions = __webpack_require__(/*! Utils/functions */ \"./src/shared/utils/functions.js\");\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _Wallet = __webpack_require__(/*! Classes/Wallet */ \"./src/shared/classes/Wallet.js\");\n\nvar _actions = __webpack_require__(/*! Redux/actions */ \"./src/shared/redux/actions/index.js\");\n\nvar _TextBase = __webpack_require__(/*! Components/TextBase */ \"./src/shared/components/TextBase.js\");\n\nvar _Text = __webpack_require__(/*! Components/Text */ \"./src/shared/components/Text.js\");\n\nvar _H = __webpack_require__(/*! Components/H1 */ \"./src/shared/components/H1.js\");\n\nvar _index = __webpack_require__(/*! Components/index */ \"./src/shared/components/index.js\");\n\nvar _Histories = __webpack_require__(/*! ./Histories */ \"./src/shared/containers/Wallet/PanelRight/Histories.js\");\n\nvar _Histories2 = _interopRequireDefault(_Histories);\n\nvar _CoinControl = __webpack_require__(/*! ./CoinControl */ \"./src/shared/containers/Wallet/PanelRight/CoinControl.js\");\n\nvar _CoinControl2 = _interopRequireDefault(_CoinControl);\n\nvar _CoinStatus = __webpack_require__(/*! ./CoinStatus */ \"./src/shared/containers/Wallet/PanelRight/CoinStatus.js\");\n\nvar _CoinStatus2 = _interopRequireDefault(_CoinStatus);\n\nvar _Default = __webpack_require__(/*! ./Default */ \"./src/shared/containers/Wallet/PanelRight/Default.js\");\n\nvar _Default2 = _interopRequireDefault(_Default);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n//REDUX\n\n//COMPONENTS\n\n//PRIVATE COMPONENTS\n\n\nvar TextBold = _Text.Text.extend(_templateObject, _TextBase.TextBase);\n\nvar StyledPanelRight = _styledComponents2.default.div(_templateObject2, _styleVariables2.default.normalLilac);\n\nvar PanelRight = function (_React$Component) {\n\t_inherits(PanelRight, _React$Component);\n\n\tfunction PanelRight(props) {\n\t\tvar _this2 = this;\n\n\t\t_classCallCheck(this, PanelRight);\n\n\t\tvar _this = _possibleConstructorReturn(this, (PanelRight.__proto__ || Object.getPrototypeOf(PanelRight)).call(this, props));\n\n\t\t_this.handleToggleHistory = function (event) {\n\t\t\tvar historyEl = event.currentTarget.parentElement;\n\t\t\tvar historyContentEl = historyEl.querySelector(':nth-child(2)');\n\t\t\ttoggleScaleY({\n\t\t\t\telement: historyContentEl,\n\t\t\t\tvisible: '1',\n\t\t\t\thidden: '0'\n\t\t\t});\n\t\t};\n\n\t\t_this.componentDidMount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n\t\t\treturn regeneratorRuntime.wrap(function _callee$(_context) {\n\t\t\t\twhile (1) {\n\t\t\t\t\tswitch (_context.prev = _context.next) {\n\t\t\t\t\t\tcase 0:\n\t\t\t\t\t\tcase 'end':\n\t\t\t\t\t\t\treturn _context.stop();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}, _callee, _this2);\n\t\t}));\n\n\t\t_this._shouldRender = function () {\n\t\t\tvar isPanelRightVisible = _this.props.component_wallet.isPanelRightVisible;\n\n\t\t\tif (!isPanelRightVisible) return false;\n\t\t\treturn true;\n\t\t};\n\n\t\treturn _this;\n\t}\n\n\t_createClass(PanelRight, [{\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\tif (!this._shouldRender()) return null;\n\n\t\t\treturn _react2.default.createElement(\n\t\t\t\tStyledPanelRight,\n\t\t\t\tnull,\n\t\t\t\t_react2.default.createElement(_CoinStatus2.default, null),\n\t\t\t\t_react2.default.createElement(_CoinControl2.default, null),\n\t\t\t\t_react2.default.createElement(_Histories2.default, null)\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn PanelRight;\n}(_react2.default.Component);\n\nvar mapStateToProps = function mapStateToProps(state) {\n\treturn {\n\t\tcomponent_wallet: state.component.wallet\n\t};\n};\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n\treturn {};\n};\nexports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PanelRight);\n\n//# sourceURL=webpack:///./src/shared/containers/Wallet/PanelRight/index.js?");

/***/ }),

/***/ "./src/shared/containers/Wallet/index.js":
/*!***********************************************!*\
  !*** ./src/shared/containers/Wallet/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\twidth: 100%;\\n\\theight: 100%;\\n\\tdisplay: flex;\\n'], ['\\n\\twidth: 100%;\\n\\theight: 100%;\\n\\tdisplay: flex;\\n']);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(/*! react-dom */ \"react-dom\");\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"styled-components\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _styleVariables = __webpack_require__(/*! Shared/style-variables */ \"./src/shared/style-variables.js\");\n\nvar _styleVariables2 = _interopRequireDefault(_styleVariables);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _Cookie = __webpack_require__(/*! Classes/Cookie */ \"./src/shared/classes/Cookie.js\");\n\nvar _Cookie2 = _interopRequireDefault(_Cookie);\n\nvar _Wallet = __webpack_require__(/*! Classes/Wallet */ \"./src/shared/classes/Wallet.js\");\n\nvar _User = __webpack_require__(/*! Classes/User */ \"./src/shared/classes/User.js\");\n\nvar _User2 = _interopRequireDefault(_User);\n\nvar _constants = __webpack_require__(/*! Config/constants */ \"./src/shared/config/constants.js\");\n\nvar _functions = __webpack_require__(/*! Utils/functions */ \"./src/shared/utils/functions.js\");\n\nvar _actions = __webpack_require__(/*! Redux/actions */ \"./src/shared/redux/actions/index.js\");\n\nvar _TextBase = __webpack_require__(/*! Components/TextBase */ \"./src/shared/components/TextBase.js\");\n\nvar _Text = __webpack_require__(/*! Components/Text */ \"./src/shared/components/Text.js\");\n\nvar _Loading = __webpack_require__(/*! Components/Loading */ \"./src/shared/components/Loading.js\");\n\nvar _index = __webpack_require__(/*! ./PanelLeft/index */ \"./src/shared/containers/Wallet/PanelLeft/index.js\");\n\nvar _index2 = _interopRequireDefault(_index);\n\nvar _index3 = __webpack_require__(/*! ./PanelRight/index */ \"./src/shared/containers/Wallet/PanelRight/index.js\");\n\nvar _index4 = _interopRequireDefault(_index3);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n//REDUX\n\n\n//COMPONENTS\n\n//PRIVATE COMPONENTS\n\n\n//______INDEX\nvar Panels = _styledComponents2.default.div(_templateObject);\n\nvar Wallet = function (_React$Component) {\n\t_inherits(Wallet, _React$Component);\n\n\tfunction Wallet(props) {\n\t\tvar _this2 = this;\n\n\t\t_classCallCheck(this, Wallet);\n\n\t\tvar _this = _possibleConstructorReturn(this, (Wallet.__proto__ || Object.getPrototypeOf(Wallet)).call(this, props));\n\n\t\t_this.componentDidMount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n\t\t\tvar Cookies, User, user, cookie, wallet, balance;\n\t\t\treturn regeneratorRuntime.wrap(function _callee$(_context) {\n\t\t\t\twhile (1) {\n\t\t\t\t\tswitch (_context.prev = _context.next) {\n\t\t\t\t\t\tcase 0:\n\t\t\t\t\t\t\tCookies = new _Cookie2.default();\n\t\t\t\t\t\t\tUser = new _User2.default();\n\t\t\t\t\t\t\tuser = void 0;\n\t\t\t\t\t\t\tcookie = Cookies.get('user');\n\t\t\t\t\t\t\t_context.prev = 4;\n\n\t\t\t\t\t\t\tif (cookie) {\n\t\t\t\t\t\t\t\t_context.next = 7;\n\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\tthrow (0, _functions.errorPattern)('WALLET ERROR', 500, 'WALELT ERROR');\n\n\t\t\t\t\t\tcase 7:\n\t\t\t\t\t\t\tuser = JSON.parse(cookie.user.toString());\n\t\t\t\t\t\t\t_context.next = 21;\n\t\t\t\t\t\t\tbreak;\n\n\t\t\t\t\t\tcase 10:\n\t\t\t\t\t\t\t_context.prev = 10;\n\t\t\t\t\t\t\t_context.t0 = _context['catch'](4);\n\t\t\t\t\t\t\t_context.prev = 12;\n\t\t\t\t\t\t\t_context.next = 15;\n\t\t\t\t\t\t\treturn User.login();\n\n\t\t\t\t\t\tcase 15:\n\t\t\t\t\t\t\tuser = _context.sent;\n\t\t\t\t\t\t\t_context.next = 21;\n\t\t\t\t\t\t\tbreak;\n\n\t\t\t\t\t\tcase 18:\n\t\t\t\t\t\t\t_context.prev = 18;\n\t\t\t\t\t\t\t_context.t1 = _context['catch'](12);\n\t\t\t\t\t\t\tthrow (0, _functions.errorPattern)('An error ocurred on trying to do the login', 500, 'CONTAINERS_WALLET_ERROR', _context.t1);\n\n\t\t\t\t\t\tcase 21:\n\t\t\t\t\t\t\tif (user) {\n\t\t\t\t\t\t\t\t_context.next = 23;\n\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\treturn _context.abrupt('return');\n\n\t\t\t\t\t\tcase 23:\n\t\t\t\t\t\t\twallet = new _Wallet.WalletClass();\n\t\t\t\t\t\t\t_context.next = 26;\n\t\t\t\t\t\t\treturn wallet.getBalance(user);\n\n\t\t\t\t\t\tcase 26:\n\t\t\t\t\t\t\tbalance = _context.sent;\n\n\t\t\t\t\t\t\t// let coinsPrice = await wallet.getCoinsPrice();\n\n\t\t\t\t\t\t\t_this.props.setCurrenciesPrice();\n\t\t\t\t\t\t\t_this.props.setCryptoPrice();\n\t\t\t\t\t\t\tif (_constants.ENV !== 'development') {\n\t\t\t\t\t\t\t\t_this.props.setBalance(balance);\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\tcase 30:\n\t\t\t\t\t\tcase 'end':\n\t\t\t\t\t\t\treturn _context.stop();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}, _callee, _this2, [[4, 10], [12, 18]]);\n\t\t}));\n\n\t\t_this.state = {\n\t\t\tbalance: undefined,\n\t\t\tmyCoins: undefined,\n\t\t\tcoinsPrice: undefined\n\t\t};\n\t\treturn _this;\n\t}\n\n\t_createClass(Wallet, [{\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\treturn _react2.default.createElement(\n\t\t\t\tPanels,\n\t\t\t\tnull,\n\t\t\t\t_react2.default.createElement(_index2.default, null),\n\t\t\t\t_react2.default.createElement(_index4.default, null)\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn Wallet;\n}(_react2.default.Component);\n\nvar mapStateToProps = function mapStateToProps(state) {\n\treturn {\n\t\twallet: state.wallet\n\t};\n};\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n\treturn {\n\t\tsetBalance: function setBalance(data) {\n\t\t\tdispatch((0, _actions.setBalance)(data));\n\t\t},\n\t\tsetCryptoPrice: function setCryptoPrice(data) {\n\t\t\tdispatch((0, _actions.setCryptoPrice)(data));\n\t\t},\n\t\tsetCurrenciesPrice: function setCurrenciesPrice(data) {\n\t\t\tdispatch((0, _actions.setCurrenciesPrice)(data));\n\t\t},\n\t\ttogglePanelLeft: function togglePanelLeft() {\n\t\t\tdispatch((0, _actions.togglePanelLeft)());\n\t\t}\n\t};\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Wallet);\n\n//# sourceURL=webpack:///./src/shared/containers/Wallet/index.js?");

/***/ }),

/***/ "./src/shared/redux/actions/balance.js":
/*!*********************************************!*\
  !*** ./src/shared/redux/actions/balance.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nvar setBalance = exports.setBalance = function setBalance(balance) {\n\treturn {\n\t\ttype: 'WALLET_SET_BALANCE',\n\t\tpayload: balance\n\t};\n};\n\n//# sourceURL=webpack:///./src/shared/redux/actions/balance.js?");

/***/ }),

/***/ "./src/shared/redux/actions/component.js":
/*!***********************************************!*\
  !*** ./src/shared/redux/actions/component.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.setTxHistory = exports.openPanelRight = undefined;\n\nvar _Wallet = __webpack_require__(/*! Classes/Wallet */ \"./src/shared/classes/Wallet.js\");\n\nvar Wallet = new _Wallet.WalletClass();\nvar openPanelRight = exports.openPanelRight = function openPanelRight() {\n\treturn {\n\t\ttype: 'WALLET_OPEN_PANELRIGHT',\n\t\tpayload: {}\n\t};\n};\nvar setTxHistory = exports.setTxHistory = function setTxHistory(data) {\n\tconsole.warn('OLD ADDRESS', data.address);\n\tdata.address = 'moNjrdaiwked7d8jYoNxpCTZC4CyheckQH';\n\tconsole.warn('NEW ADDRESS', data.address);\n\n\treturn {\n\t\ttype: 'WALLET_SET_COIN_HISTORY',\n\t\tpayload: Wallet.getTxHistory({ network: data.network, address: data.address })\n\t};\n};\n// export const setCurrentNetwork = () => {\n// \treturn {\n// \t\ttype: 'WALLET_SET_CURRENTNETWORK',\n// \t\tpayload: {}\n// \t}\n// }\n\n//# sourceURL=webpack:///./src/shared/redux/actions/component.js?");

/***/ }),

/***/ "./src/shared/redux/actions/cryptocurrencies.js":
/*!******************************************************!*\
  !*** ./src/shared/redux/actions/cryptocurrencies.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.setCryptoPrice = undefined;\n\nvar _Wallet = __webpack_require__(/*! Classes/Wallet */ \"./src/shared/classes/Wallet.js\");\n\nvar Wallet = new _Wallet.WalletClass();\n\nvar setCryptoPrice = exports.setCryptoPrice = function setCryptoPrice(price) {\n\tvar toSymbol = 'USD,EUR,BRL';\n\n\tif (!price) {\n\t\treturn {\n\t\t\ttype: 'CRYTPO_SET_PRICE',\n\t\t\tpayload: Wallet.getCoinsPrice({\n\t\t\t\tBTC: { fromSymbol: 'BTC', toSymbol: toSymbol },\n\t\t\t\tETH: { fromSymbol: 'ETH', toSymbol: toSymbol },\n\t\t\t\tDASH: { fromSymbol: 'DASH', toSymbol: toSymbol },\n\t\t\t\tLTC: { fromSymbol: 'LTC', toSymbol: toSymbol }\n\t\t\t})\n\t\t};\n\t}\n\treturn {\n\t\ttype: 'CRYTPO_SET_PRICE_FULFILLED',\n\t\tpayload: price\n\t};\n};\n\n//# sourceURL=webpack:///./src/shared/redux/actions/cryptocurrencies.js?");

/***/ }),

/***/ "./src/shared/redux/actions/currencies.js":
/*!************************************************!*\
  !*** ./src/shared/redux/actions/currencies.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.autoSetCurrenciesPrice = exports.setCurrenciesPrice = undefined;\n\nvar _Wallet = __webpack_require__(/*! Classes/Wallet */ \"./src/shared/classes/Wallet.js\");\n\nvar Wallet = new _Wallet.WalletClass();\n\nvar setCurrenciesPrice = exports.setCurrenciesPrice = function setCurrenciesPrice(price) {\n\tif (!price) {\n\t\treturn {\n\t\t\ttype: 'CURRENCIES_SET_PRICE',\n\t\t\tpayload: Wallet.getCoinsPrice({\n\t\t\t\tUSD: { fromSymbol: 'USD', toSymbol: 'BRL,EUR' },\n\t\t\t\tEUR: { fromSymbol: 'EUR', toSymbol: 'BRL,USD' },\n\t\t\t\tBRL: { fromSymbol: 'BRL', toSymbol: 'EUR,USD' }\n\t\t\t})\n\t\t};\n\t}\n\treturn {\n\t\ttype: 'CURRENCIES_SET_PRICE_FULFILLED',\n\t\tpayload: price\n\t};\n};\n\nvar autoSetCurrenciesPrice = exports.autoSetCurrenciesPrice = function autoSetCurrenciesPrice() {};\n\n//# sourceURL=webpack:///./src/shared/redux/actions/currencies.js?");

/***/ }),

/***/ "./src/shared/redux/actions/index.js":
/*!*******************************************!*\
  !*** ./src/shared/redux/actions/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.openPanelRight = exports.setCurrenciesPrice = exports.setCryptoPrice = exports.setTxHistory = exports.togglePanelLeft = exports.setBalance = exports.userCreate = exports.userLogin = exports.userReset = undefined;\n\nvar _user = __webpack_require__(/*! ./user */ \"./src/shared/redux/actions/user.js\");\n\nvar _wallet = __webpack_require__(/*! ./wallet */ \"./src/shared/redux/actions/wallet.js\");\n\nvar _balance = __webpack_require__(/*! ./balance */ \"./src/shared/redux/actions/balance.js\");\n\nvar _cryptocurrencies = __webpack_require__(/*! ./cryptocurrencies */ \"./src/shared/redux/actions/cryptocurrencies.js\");\n\nvar _component = __webpack_require__(/*! ./component */ \"./src/shared/redux/actions/component.js\");\n\nvar _currencies = __webpack_require__(/*! ./currencies */ \"./src/shared/redux/actions/currencies.js\");\n\nexports.userReset = _user.userReset;\nexports.userLogin = _user.userLogin;\nexports.userCreate = _user.userCreate;\nexports.setBalance = _balance.setBalance;\nexports.togglePanelLeft = _wallet.togglePanelLeft;\nexports.setTxHistory = _component.setTxHistory;\nexports.setCryptoPrice = _cryptocurrencies.setCryptoPrice;\nexports.setCurrenciesPrice = _currencies.setCurrenciesPrice;\nexports.openPanelRight = _component.openPanelRight;\n\n//# sourceURL=webpack:///./src/shared/redux/actions/index.js?");

/***/ }),

/***/ "./src/shared/redux/actions/user.js":
/*!******************************************!*\
  !*** ./src/shared/redux/actions/user.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.userCreate = exports.userLogin = exports.userReset = undefined;\n\nvar _lunesLib = __webpack_require__(/*! lunes-lib */ \"lunes-lib\");\n\nvar _User = __webpack_require__(/*! Classes/User */ \"./src/shared/classes/User.js\");\n\nvar _User2 = _interopRequireDefault(_User);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar userReset = exports.userReset = function userReset(email) {\n\treturn {\n\t\ttype: \"USER_RESET\",\n\t\tpayload: _lunesLib.users.resetPassword({\n\t\t\temail: email\n\t\t})\n\t};\n};\n\nvar userLogin = exports.userLogin = function userLogin(data) {\n\tvar email = data.email;\n\tvar password = data.password;\n\treturn {\n\t\ttype: \"USER_LOGIN\",\n\t\tpayload: new _User2.default().login({ email: email, password: password })\n\t};\n};\n\nvar userCreate = exports.userCreate = function userCreate(data) {\n\treturn {\n\t\ttype: 'USER_CREATE',\n\t\tpayload: _lunesLib.users.create({\n\t\t\temail: data.email,\n\t\t\tpassword: data.password,\n\t\t\tfullname: data.fullname\n\t\t})\n\t};\n};\n\n//# sourceURL=webpack:///./src/shared/redux/actions/user.js?");

/***/ }),

/***/ "./src/shared/redux/actions/wallet.js":
/*!********************************************!*\
  !*** ./src/shared/redux/actions/wallet.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.togglePanelLeft = undefined;\n\nvar _Wallet = __webpack_require__(/*! Classes/Wallet */ \"./src/shared/classes/Wallet.js\");\n\nvar Wallet = new _Wallet.WalletClass();\n\nvar togglePanelLeft = exports.togglePanelLeft = function togglePanelLeft() {\n\treturn {\n\t\ttype: 'WALLET_TOGGLE_PANEL_LEFT',\n\t\tpayload: status\n\t};\n};\n\n//# sourceURL=webpack:///./src/shared/redux/actions/wallet.js?");

/***/ }),

/***/ "./src/shared/redux/reducers/balanceReducer.js":
/*!*****************************************************!*\
  !*** ./src/shared/redux/reducers/balanceReducer.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nvar initialState = {\n\tBTC: {\n\t\ttotal_confirmed: 2.9,\n\t\ttotal_unconfirmed: 1,\n\t\ttotal_amount: 3.9,\n\t\timg: 'btc.svg'\n\t},\n\tETH: {\n\t\ttotal_confirmed: 1.2,\n\t\ttotal_unconfirmed: 1,\n\t\ttotal_amount: 2.2,\n\t\timg: 'eth.svg'\n\t},\n\tLNS: {\n\t\ttotal_confirmed: 100,\n\t\ttotal_unconfirmed: 0,\n\t\ttotal_amount: 100,\n\t\timg: 'lns.svg'\n\t},\n\tLTC: {\n\t\ttotal_confirmed: 100,\n\t\ttotal_unconfirmed: 0,\n\t\ttotal_amount: 100,\n\t\timg: 'ltc.svg'\n\t},\n\tDASH: {\n\t\ttotal_confirmed: 100,\n\t\ttotal_unconfirmed: 0,\n\t\ttotal_amount: 100,\n\t\timg: 'dash.svg'\n\t},\n\tNANO: {\n\t\ttotal_confirmed: 100,\n\t\ttotal_unconfirmed: 0,\n\t\ttotal_amount: 100,\n\t\timg: 'nano.svg'\n\t}\n};\nvar balanceReducer = function balanceReducer() {\n\tvar state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n\tvar action = arguments[1];\n\n\tif (action.type === 'WALLET_SET_BALANCE') {\n\t\tstate = action.payload;\n\t}\n\treturn state;\n};\n\nexports.default = balanceReducer;\n\n//# sourceURL=webpack:///./src/shared/redux/reducers/balanceReducer.js?");

/***/ }),

/***/ "./src/shared/redux/reducers/componentReducer.js":
/*!*******************************************************!*\
  !*** ./src/shared/redux/reducers/componentReducer.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar initialState = {\n\twallet: {\n\t\t'//': 'Deve vir dinamicamente, conforme o usuário clica na moeda, veja a action: getTxHistory()',\n\t\tcurrentNetwork: '',\n\t\tcurrentTxHistory: [\n\t\t\t// {\n\t\t\t// \ttype: 'RECEIVED',\n\t\t\t// \totherParams: {},\n\t\t\t// \ttxid: '.......',\n\t\t\t// \tdate: 1517446725,\n\t\t\t// \tblockHeight: 1261725,\n\t\t\t// \tnativeAmount: 200000000,\n\t\t\t// \tnetworkFee: 100000\n\t\t\t// }\n\t\t],\n\t\tisPanelRightVisible: false\n\t}\n};\nvar componentReducer = function componentReducer() {\n\tvar state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n\tvar action = arguments[1];\n\n\tswitch (action.type) {\n\t\tcase 'WALLET_OPEN_PANELRIGHT':\n\t\t\tstate = _extends({}, state, {\n\t\t\t\twallet: _extends({}, state.wallet, {\n\t\t\t\t\tisPanelRightVisible: true\n\t\t\t\t})\n\t\t\t});\n\t\t\treturn state;\n\t\t\tbreak;\n\t\tcase 'WALLET_SET_COIN_HISTORY_FULFILLED':\n\t\t\t// action.payload = [\n\t\t\t// \t{\n\t\t\t// \t\tvalue: 1.003,\n\t\t\t// \t\ttype: 'RECEIVED' || 'SPENT',\n\t\t\t// \t\ttime: [timestamp],\n\t\t\t// \t\t...all bitcoin transaction infomation\n\t\t\t// \t}\n\t\t\t// ]\n\t\t\tstate = {\n\t\t\t\twallet: _extends({}, state.wallet, {\n\t\t\t\t\tcurrentTxHistory: action.payload\n\t\t\t\t})\n\t\t\t};\n\t\tdefault:\n\t\t\treturn state;\n\t\t\tbreak;\n\t}\n\treturn state;\n};\n\nexports.default = componentReducer;\n\n//# sourceURL=webpack:///./src/shared/redux/reducers/componentReducer.js?");

/***/ }),

/***/ "./src/shared/redux/reducers/configReducer.js":
/*!****************************************************!*\
  !*** ./src/shared/redux/reducers/configReducer.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nvar initialState = {\n\tdefault: 'BTC',\n\tprice: {\n\t\tBTC: { USD: 10000, BRL: 30000, EUR: 8000 },\n\t\tETH: { USD: 400, BRL: 1200, EUR: 380 },\n\t\tLNS: { USD: 2, BRL: 6, EUR: 1.8 }\n\t}\n};\nvar configReducer = function configReducer() {\n\tvar state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n\tvar action = arguments[1];\n\n\n\treturn state;\n};\n\nexports.default = configReducer;\n\n//# sourceURL=webpack:///./src/shared/redux/reducers/configReducer.js?");

/***/ }),

/***/ "./src/shared/redux/reducers/cryptocurrenciesReducer.js":
/*!**************************************************************!*\
  !*** ./src/shared/redux/reducers/cryptocurrenciesReducer.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar initialState = {\n\tdefault: 'BTC',\n\tprice: {\n\t\tBTC: { USD: 10000, BRL: 30000, EUR: 8000 },\n\t\tETH: { USD: 400, BRL: 1200, EUR: 380 },\n\t\tLNS: { USD: 2, BRL: 6, EUR: 1.8 }\n\t}\n};\nvar cryptocurrenciesReducer = function cryptocurrenciesReducer() {\n\tvar state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n\tvar action = arguments[1];\n\n\tswitch (action.type) {\n\t\tcase 'CRYTPO_SET_PRICE_FULFILLED':\n\t\t\treturn _extends({}, state, {\n\t\t\t\tprice: action.payload\n\t\t\t});\n\t\t\tbreak;\n\t}\n\treturn state;\n};\n\nexports.default = cryptocurrenciesReducer;\n\n//# sourceURL=webpack:///./src/shared/redux/reducers/cryptocurrenciesReducer.js?");

/***/ }),

/***/ "./src/shared/redux/reducers/currenciesReducer.js":
/*!********************************************************!*\
  !*** ./src/shared/redux/reducers/currenciesReducer.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar initialState = {\n\tdefault: 'BRL',\n\tprice: {\n\t\tBRL: { USD: 0.3, EUR: 0.2 },\n\t\tUSD: { BRL: 3, EUR: 1.2 },\n\t\tEUR: { USD: 0.8, BRL: 4 }\n\t}\n};\nvar currenciesReducer = function currenciesReducer() {\n\tvar state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n\tvar action = arguments[1];\n\n\tswitch (action.type) {\n\t\tcase 'CURRENCIES_SET_PRICE_FULFILLED':\n\t\t\tstate = _extends({}, state, {\n\t\t\t\tprice: action.payload\n\t\t\t});\n\t\t\tbreak;\n\t}\n\treturn state;\n};\n\nexports.default = currenciesReducer;\n\n//# sourceURL=webpack:///./src/shared/redux/reducers/currenciesReducer.js?");

/***/ }),

/***/ "./src/shared/redux/reducers/index.js":
/*!********************************************!*\
  !*** ./src/shared/redux/reducers/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.walletReducer = exports.userReducer = exports.currenciesReducer = exports.cryptocurrenciesReducer = exports.configReducer = exports.componentReducer = exports.balanceReducer = undefined;\n\nvar _balanceReducer = __webpack_require__(/*! ./balanceReducer */ \"./src/shared/redux/reducers/balanceReducer.js\");\n\nvar _balanceReducer2 = _interopRequireDefault(_balanceReducer);\n\nvar _componentReducer = __webpack_require__(/*! ./componentReducer */ \"./src/shared/redux/reducers/componentReducer.js\");\n\nvar _componentReducer2 = _interopRequireDefault(_componentReducer);\n\nvar _configReducer = __webpack_require__(/*! ./configReducer */ \"./src/shared/redux/reducers/configReducer.js\");\n\nvar _configReducer2 = _interopRequireDefault(_configReducer);\n\nvar _cryptocurrenciesReducer = __webpack_require__(/*! ./cryptocurrenciesReducer */ \"./src/shared/redux/reducers/cryptocurrenciesReducer.js\");\n\nvar _cryptocurrenciesReducer2 = _interopRequireDefault(_cryptocurrenciesReducer);\n\nvar _currenciesReducer = __webpack_require__(/*! ./currenciesReducer */ \"./src/shared/redux/reducers/currenciesReducer.js\");\n\nvar _currenciesReducer2 = _interopRequireDefault(_currenciesReducer);\n\nvar _userReducer = __webpack_require__(/*! ./userReducer */ \"./src/shared/redux/reducers/userReducer.js\");\n\nvar _userReducer2 = _interopRequireDefault(_userReducer);\n\nvar _walletReducer = __webpack_require__(/*! ./walletReducer */ \"./src/shared/redux/reducers/walletReducer.js\");\n\nvar _walletReducer2 = _interopRequireDefault(_walletReducer);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.balanceReducer = _balanceReducer2.default;\nexports.componentReducer = _componentReducer2.default;\nexports.configReducer = _configReducer2.default;\nexports.cryptocurrenciesReducer = _cryptocurrenciesReducer2.default;\nexports.currenciesReducer = _currenciesReducer2.default;\nexports.userReducer = _userReducer2.default;\nexports.walletReducer = _walletReducer2.default;\n\n//# sourceURL=webpack:///./src/shared/redux/reducers/index.js?");

/***/ }),

/***/ "./src/shared/redux/reducers/userReducer.js":
/*!**************************************************!*\
  !*** ./src/shared/redux/reducers/userReducer.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nvar initialState = {\n\tstatus: 'initial',\n\tlogged: false\n};\nvar userReducer = function userReducer() {\n\tvar state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n\tvar action = arguments[1];\n\n\tif (action.type === 'USER_LOGIN_PENDING') {\n\t\treturn {\n\t\t\tstatus: 'pending',\n\t\t\tlogged: false\n\t\t};\n\t} else if (action.type === 'USER_LOGIN_FULFILLED') {\n\t\t// EX: action.payload {\n\t\t// \tdata: {_id:'id',accessToken:'accTok', ...}\n\t\t// }\n\t\treturn {\n\t\t\tstatus: 'fulfilled',\n\t\t\tdata: action.payload,\n\t\t\tlogged: true\n\t\t};\n\t} else if (action.type === 'USER_LOGIN_REJECTED') {\n\t\treturn {\n\t\t\tstatus: 'rejected',\n\t\t\terror: action.payload,\n\t\t\tlogged: false\n\t\t};\n\t} else if (action.type === 'USER_CREATE_PENDING') {\n\t\treturn {\n\t\t\tstatus: 'pending',\n\t\t\tlogged: false\n\t\t};\n\t} else if (action.type === 'USER_CREATE_FULFILLED') {\n\t\treturn {\n\t\t\tstatus: 'fulfilled',\n\t\t\tdata: action.payload,\n\t\t\tlogged: true\n\t\t};\n\t} else if (action.type === 'USER_CREATE_REJECTED') {\n\t\treturn {\n\t\t\tstatus: 'rejected',\n\t\t\tlogged: false\n\t\t};\n\t} else if (action.type === 'USER_RESET_PENDING') {\n\t\treturn {\n\t\t\tstatus: 'pending'\n\t\t};\n\t} else if (action.type === 'USER_RESET_FULFILLED') {\n\t\treturn {\n\t\t\tstatus: 'fulfilled',\n\t\t\tresult: action.payload\n\t\t};\n\t} else if (action.type === 'USER_RESET_REJECTED') {\n\t\treturn {\n\t\t\tstatus: 'rejected'\n\t\t};\n\t}\n\treturn state;\n};\n\nexports.default = userReducer;\n\n//# sourceURL=webpack:///./src/shared/redux/reducers/userReducer.js?");

/***/ }),

/***/ "./src/shared/redux/reducers/walletReducer.js":
/*!****************************************************!*\
  !*** ./src/shared/redux/reducers/walletReducer.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\n// if (action.type === 'WALLET_OPEN_PANELRIGHT') {\n// \t\t//action.payload: { \n// \t\t// \tcoinPrice: \n// \t\t// \t\t{\n// \t\t// \t\t\tUSD: 1, \n// \t\t// \t\t\tBRL: 2\n// \t\t// \t\t}, \n// \t\t// \tcoinName: String() \n// \t\t//}\n// \t\treturn {\n// \t\t\t...state,\n// \t\t\tpanelRight: {\n// \t\t\t\t...state.panelRight,\n// \t\t\t\t...action.payload,\n// \t\t\t\tstatus: 'open'\n// \t\t\t}\n// \t\t}\n// \t} else \nvar initialState = {\n\tpanelRight: {\n\t\tstatus: 'closed'\n\t},\n\tpanelLeft: {\n\t\tstatus: 'open'\n\t}\n};\n\nvar walletReducer = function walletReducer() {\n\tvar state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n\tvar action = arguments[1];\n\n\tif (action.type === 'WALLET_SET_BALANCE') {\n\t\t// EX: action.payload: { \n\t\t// \tbalance, \n\t\t// \tcoinsPrice \n\t\t// }\n\t\treturn _extends({}, state, {\n\t\t\tpanelLeft: _extends({}, state.panelLeft, action.payload)\n\t\t});\n\t} else if (action.type === 'WALLET_TOGGLE_PANEL_LEFT') {\n\t\t// EX: action.payload = 'closed' || 'open'\n\t\tvar status = state.panelLeft.status === 'open' ? 'closed' : 'open';\n\t\treturn _extends({}, state, {\n\t\t\tpanelLeft: _extends({}, state.panelLeft, {\n\t\t\t\tstatus: status\n\t\t\t})\n\t\t});\n\t}\n\treturn state;\n};\n\nexports.default = walletReducer;\n\n//# sourceURL=webpack:///./src/shared/redux/reducers/walletReducer.js?");

/***/ }),

/***/ "./src/shared/redux/stores/index.js":
/*!******************************************!*\
  !*** ./src/shared/redux/stores/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.store = undefined;\n\nvar _userReducer = __webpack_require__(/*! ./../reducers/userReducer.js */ \"./src/shared/redux/reducers/userReducer.js\");\n\nvar _userReducer2 = _interopRequireDefault(_userReducer);\n\nvar _walletReducer = __webpack_require__(/*! ./../reducers/walletReducer.js */ \"./src/shared/redux/reducers/walletReducer.js\");\n\nvar _walletReducer2 = _interopRequireDefault(_walletReducer);\n\nvar _redux = __webpack_require__(/*! redux */ \"redux\");\n\nvar _reduxLogger = __webpack_require__(/*! redux-logger */ \"redux-logger\");\n\nvar _reduxPromiseMiddleware = __webpack_require__(/*! redux-promise-middleware */ \"redux-promise-middleware\");\n\nvar _reduxPromiseMiddleware2 = _interopRequireDefault(_reduxPromiseMiddleware);\n\nvar _reduxThunk = __webpack_require__(/*! redux-thunk */ \"redux-thunk\");\n\nvar _reduxThunk2 = _interopRequireDefault(_reduxThunk);\n\nvar _initialState = __webpack_require__(/*! ./initialState */ \"./src/shared/redux/stores/initialState.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// combineReducers({\n// \t\tuser: userReducer,\n// \t\twallet: walletReducer\n// \t})\nvar store = (0, _redux.createStore)((0, _redux.combineReducers)(_initialState.initialState), {}, (0, _redux.applyMiddleware)((0, _reduxLogger.createLogger)(), _reduxThunk2.default, (0, _reduxPromiseMiddleware2.default)()));\n\nexports.store = store;\n\n//# sourceURL=webpack:///./src/shared/redux/stores/index.js?");

/***/ }),

/***/ "./src/shared/redux/stores/initialState.js":
/*!*************************************************!*\
  !*** ./src/shared/redux/stores/initialState.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.initialState = undefined;\n\nvar _reducers = __webpack_require__(/*! Redux/reducers */ \"./src/shared/redux/reducers/index.js\");\n\nvar initialState = exports.initialState = {\n\tuser: _reducers.userReducer,\n\twallet: _reducers.walletReducer,\n\tconfig: _reducers.configReducer,\n\tcurrencies: _reducers.currenciesReducer,\n\tcryptocurrencies: _reducers.cryptocurrenciesReducer,\n\tbalance: _reducers.balanceReducer,\n\tcomponent: _reducers.componentReducer\n}; // import userReducer       from \"Redux/reducers/userReducer.js\";\n// import walletReducer     from \"Redux/reducers/walletReducer.js\";\n// import balanceReducer    from \"Redux/reducers/balanceReducer.js\";\n// import currenciesReducer from \"Redux/reducers/currenciesReducer.js\";\n// import configReducer     from \"Redux/reducers/configReducer.js\";\n// import cryptocurrenciesReducer from \"Redux/reducers/cryptocurrenciesReducer.js\";\n// import walletReducer     from \"Redux/reducers/componentReducer.js\";\n\n//# sourceURL=webpack:///./src/shared/redux/stores/initialState.js?");

/***/ }),

/***/ "./src/shared/style-variables.js":
/*!***************************************!*\
  !*** ./src/shared/style-variables.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _functions = __webpack_require__(/*! Utils/functions */ \"./src/shared/utils/functions.js\");\n\n//media: {\n// \tmobile: 'min-width: 0px',     #small\n// \tmobile2: 'min-width: 470px',  #small\n// \ttablet: 'min-width: 590px',   #small\n// \ttablet2: 'min-width: 790px',  #medium\n// \tlaptop: 'min-width: 1014px'   #medium\n// \tdesktop: 'min-width: 1356px', #medium \n// \tdesktop2: 'min-width: 1590px',#large \n// \tfullhd: 'min-width: 1970px'   #large\n// }\n\nmodule.exports = {\n\trgba: _functions.hexToRgba,\n\tdarkLilac: '#3B1878',\n\tnormalLilac: '#4B2C82',\n\tnormalLilac2: '#3F1C7B',\n\tnormalLilac3: '#432678',\n\tlightLilac: '#725C98',\n\tnormalGreen: '#4CD566',\n\tnormalRed: '#FF1C38',\n\tnormalYellow: '#F5A623',\n\tmarginTopSmall: '10px',\n\tmarginTopNormal: '15px',\n\tmarginTopRegular: '20px',\n\tmarginTopBig: '30px',\n\tmarginTopHuge: '50px',\n\tmedia: {\n\t\tmobile: 'min-width: 310px',\n\t\tmobile2: 'min-width: 470px',\n\t\ttablet: 'min-width: 590px',\n\t\ttablet2: 'min-width: 790px',\n\t\tlaptop: 'min-width: 1014px',\n\t\tdesktop: 'min-width: 1356px',\n\t\tdesktop2: 'min-width: 1590px',\n\t\tfullhd: 'min-width: 1970px'\n\t}\n};\n\n//# sourceURL=webpack:///./src/shared/style-variables.js?");

/***/ }),

/***/ "./src/shared/utils/functions.js":
/*!***************************************!*\
  !*** ./src/shared/utils/functions.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nvar errorPattern = function errorPattern(message, code, text, log) {\n\treturn { message: message, code: code, text: text, log: log };\n};\nvar timestampDiff = function timestampDiff(_ref) {\n\tvar _ref$first = _ref.first,\n\t    first = _ref$first === undefined ? undefined : _ref$first,\n\t    _ref$second = _ref.second,\n\t    second = _ref$second === undefined ? undefined : _ref$second;\n\n\tif (!first) throw errorPattern('timestampDiff error on \\'first\\' parameter, got ' + first, 500, 'TIMESTAMP_DIFF_ERROR');\n\tvar old = new Date('04/30/2018').getTime();\n\tvar now = second || Date.now();\n\tvar timeDiff = Math.abs(now - old);\n\tvar hoursDiff = Math.floor(timeDiff / (1000 * 3600));\n\t// let daysDiff  = Math.ceil(timeDiff / (1000 * 3600 * 24));\n\treturn hoursDiff;\n};\nvar hexToRgba = function hexToRgba(hex, alpha) {\n\tvar r = parseInt(hex.slice(1, 3), 16),\n\t    g = parseInt(hex.slice(3, 5), 16),\n\t    b = parseInt(hex.slice(5, 7), 16);\n\tif (alpha) {\n\t\treturn 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';\n\t} else {\n\t\treturn 'rgba(' + r + ', ' + g + ', ' + b + ')';\n\t}\n};\nvar timer = function timer(time) {\n\treturn new Promise(function (resolve) {\n\t\tsetTimeout(resolve, time);\n\t});\n};\nexports.errorPattern = errorPattern;\nexports.timestampDiff = timestampDiff;\nexports.hexToRgba = hexToRgba;\nexports.timer = timer;\n\n//# sourceURL=webpack:///./src/shared/utils/functions.js?");

/***/ }),

/***/ "./src/shared/utils/ui.js":
/*!********************************!*\
  !*** ./src/shared/utils/ui.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nvar toggleTranslateX = exports.toggleTranslateX = function toggleTranslateX(_ref) {\n\tvar element = _ref.element,\n\t    from = _ref.from,\n\t    to = _ref.to;\n\n\tvar state = element.getAttribute('state');\n\tif (state === 'visible') {\n\t\telement.style.transform = 'translateX(-100%)';\n\t\telement.style.maxWidth = '0px';\n\t\telement.setAttribute('state', 'hidden');\n\t\tvisibilityAllChildren({ element: element, value: 'hidden' });\n\t} else {\n\t\telement.style.transform = 'translateX(0px)';\n\t\telement.style.maxWidth = '1000px';\n\t\telement.setAttribute('state', 'visible');\n\t\tvisibilityAllChildren({ element: element, value: 'visible' });\n\t}\n};\nvar toggleWidth = exports.toggleWidth = function toggleWidth(_ref2) {\n\tvar element = _ref2.element,\n\t    visible = _ref2.visible,\n\t    hidden = _ref2.hidden;\n\n\tvar state = element.getAttribute('state');\n\tif (state === 'visible') {\n\t\telement.style.width = hidden;\n\t\telement.style.minWidth = '0';\n\t\telement.style.maxWidth = '0px';\n\t\telement.style.maxWidth = '280px';\n\t\telement.setAttribute('state', 'hidden');\n\t\tvisibilityAllChildren({ element: element, value: 'hidden' });\n\t} else {\n\t\telement.style.width = visible;\n\t\telement.style.minWidth = '130px';\n\t\telement.style.maxWidth = '280px';\n\t\telement.setAttribute('state', 'visible');\n\t\tsetTimeout(function () {\n\t\t\tvisibilityAllChildren({ element: element, value: 'visible' });\n\t\t}, 300);\n\t}\n};\nvar toggleScaleX = exports.toggleScaleX = function toggleScaleX(_ref3) {\n\tvar element = _ref3.element,\n\t    visible = _ref3.visible,\n\t    hidden = _ref3.hidden;\n\n\tvar state = element.getAttribute('state');\n\tif (state === 'visible') {\n\t\telement.style.transform = 'scaleX(' + hidden + ')';\n\t\telement.style.opacity = '0';\n\t\telement.style.maxWidth = '280px';\n\t\telement.setAttribute('state', 'hidden');\n\t} else {\n\t\telement.style.transform = 'scaleX(' + visible + ')';\n\t\telement.style.opacity = '1';\n\t\telement.setAttribute('state', 'visible');\n\t}\n};\nvar toggleScaleY = exports.toggleScaleY = function toggleScaleY(_ref4) {\n\tvar element = _ref4.element,\n\t    visible = _ref4.visible,\n\t    hidden = _ref4.hidden;\n\n\tvar state = element.getAttribute('state');\n\tif (state === 'visible') {\n\t\telement.style.transform = 'scaleY(' + hidden + ')';\n\t\telement.setAttribute('state', 'hidden');\n\t} else {\n\t\telement.style.transform = 'scaleY(' + visible + ')';\n\t\telement.setAttribute('state', 'visible');\n\t}\n};\nvar visibilityAllChildren = exports.visibilityAllChildren = function visibilityAllChildren(_ref5) {\n\tvar element = _ref5.element,\n\t    value = _ref5.value;\n\n\tvar children = element.children;\n\tArray.from(children).map(function (child) {\n\t\tchild.style.visibility = value;\n\t});\n};\n\n//# sourceURL=webpack:///./src/shared/utils/ui.js?");

/***/ }),

/***/ 0:
/*!**************************************************!*\
  !*** multi babel-polyfill ./src/server/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! babel-polyfill */\"babel-polyfill\");\nmodule.exports = __webpack_require__(/*! /home/user/Dev/web/lunes/wallet-web/src/server/index.js */\"./src/server/index.js\");\n\n\n//# sourceURL=webpack:///multi_babel-polyfill_./src/server/index.js?");

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

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

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

/***/ "nuka-carousel":
/*!********************************!*\
  !*** external "nuka-carousel" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"nuka-carousel\");\n\n//# sourceURL=webpack:///external_%22nuka-carousel%22?");

/***/ }),

/***/ "qrcode-generator":
/*!***********************************!*\
  !*** external "qrcode-generator" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"qrcode-generator\");\n\n//# sourceURL=webpack:///external_%22qrcode-generator%22?");

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

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-redux\");\n\n//# sourceURL=webpack:///external_%22react-redux%22?");

/***/ }),

/***/ "react-router":
/*!*******************************!*\
  !*** external "react-router" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router\");\n\n//# sourceURL=webpack:///external_%22react-router%22?");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-dom\");\n\n//# sourceURL=webpack:///external_%22react-router-dom%22?");

/***/ }),

/***/ "recharts":
/*!***************************!*\
  !*** external "recharts" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"recharts\");\n\n//# sourceURL=webpack:///external_%22recharts%22?");

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

/***/ }),

/***/ "validator":
/*!****************************!*\
  !*** external "validator" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"validator\");\n\n//# sourceURL=webpack:///external_%22validator%22?");

/***/ })

/******/ });