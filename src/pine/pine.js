!function(e, a) {
    for (var i in a) e[i] = a[i];
}(exports, function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = !0;
        return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            enumerable: !0,
            get: getter
        });
    };
    __webpack_require__.r = function(exports) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        });
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
    };
    __webpack_require__.t = function(value, mode) {
        1 & mode && (value = __webpack_require__(value));
        if (8 & mode) return value;
        if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
        var ns = Object.create(null);
        __webpack_require__.r(ns);
        Object.defineProperty(ns, "default", {
            enumerable: !0,
            value: value
        });
        if (2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
            return value[key];
        }.bind(null, key));
        return ns;
    };
    __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function getDefault() {
            return module.default;
        } : function getModuleExports() {
            return module;
        };
        __webpack_require__.d(getter, "a", getter);
        return getter;
    };
    __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    __webpack_require__.p = "";
    return __webpack_require__(__webpack_require__.s = 75);
}([ function(module, exports) {
    module.exports = require("lodash");
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.validate = exports.nativeFactTypeTemplates = void 0;
    const equality = (from, to) => [ "Equals", from, to ], checkRequired = validateFn => {
        async function runCheck(value, required) {
            if (null == value) {
                if (required) throw new Error("cannot be null");
                return null;
            }
            return validateFn(value);
        }
        return runCheck;
    };
    exports.nativeFactTypeTemplates = {
        equality: {
            "is equal to": equality,
            equals: equality
        },
        comparison: {
            "is greater than": (from, to) => [ "GreaterThan", from, to ],
            "is greater than or equal to": (from, to) => [ "GreaterThanOrEqual", from, to ],
            "is less than": (from, to) => [ "LessThan", from, to ],
            "is less than or equal to": (from, to) => [ "LessThanOrEqual", from, to ],
            "is equal to": equality,
            equals: equality
        }
    };
    exports.validate = {
        checkRequired: checkRequired,
        integer: checkRequired((value => {
            const processedValue = parseInt(value, 10);
            if (Number.isNaN(processedValue)) throw new Error("is not a number: " + value);
            return processedValue;
        })),
        text: length => checkRequired((value => {
            if ("string" != typeof value) throw new Error("is not a string: " + value);
            if (null != length && value.length > length) throw new Error("longer than " + length + " characters (" + value.length + ")");
            return value;
        })),
        date: checkRequired((value => {
            let processedValue = Number(value);
            Number.isNaN(processedValue) && (processedValue = value);
            const processedDate = new Date(processedValue);
            if (Number.isNaN(processedDate.getTime())) throw new Error("is not a valid date: " + value);
            return processedDate;
        }))
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = function(fn) {
        if ("function" != typeof fn) throw new TypeError(fn + " is not a function");
        return fn;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var isValue = __webpack_require__(18), isPlainFunction = __webpack_require__(54), assign = __webpack_require__(26), normalizeOpts = __webpack_require__(24), contains = __webpack_require__(55), d;
    (module.exports = function(dscr, value) {
        var c, e, w, options, desc;
        if (arguments.length < 2 || "string" != typeof dscr) {
            options = value;
            value = dscr;
            dscr = null;
        } else options = arguments[2];
        if (isValue(dscr)) {
            c = contains.call(dscr, "c");
            e = contains.call(dscr, "e");
            w = contains.call(dscr, "w");
        } else {
            c = w = !0;
            e = !1;
        }
        desc = {
            value: value,
            configurable: c,
            enumerable: e,
            writable: w
        };
        return options ? assign(normalizeOpts(options), desc) : desc;
    }).gs = function(dscr, get, set) {
        var c, e, options, desc;
        if ("string" != typeof dscr) {
            options = set;
            set = get;
            get = dscr;
            dscr = null;
        } else options = arguments[3];
        if (isValue(get)) if (isPlainFunction(get)) if (isValue(set)) {
            if (!isPlainFunction(set)) {
                options = set;
                set = void 0;
            }
        } else set = void 0; else {
            options = get;
            get = set = void 0;
        } else get = void 0;
        if (isValue(dscr)) {
            c = contains.call(dscr, "c");
            e = contains.call(dscr, "e");
        } else {
            c = !0;
            e = !1;
        }
        desc = {
            get: get,
            set: set,
            configurable: c,
            enumerable: e
        };
        return options ? assign(normalizeOpts(options), desc) : desc;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var isValue = __webpack_require__(6);
    module.exports = function(value) {
        if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
        return value;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.setup = exports.executeStandardModels = exports.handleODataRequest = exports.getAffectedIds = exports.getAbstractSqlModel = exports.runURI = exports.api = exports.PinejsClient = exports.runRule = exports.getID = exports.deleteModel = exports.executeModels = exports.executeModel = exports.generateModels = exports.generateSqlModel = exports.generateAbstractSqlModel = exports.generateLfModel = exports.validateModel = exports.resolveNavigationResource = exports.resolveSynonym = exports.resolveOdataBind = exports.sbvrTypes = exports.db = exports.addSideEffectHook = exports.addPureHook = void 0;
    const Bluebird = __webpack_require__(21), _ = __webpack_require__(0), cached_compile_1 = __webpack_require__(84), AbstractSQLCompiler = __webpack_require__(23), package_json_1 = __webpack_require__(116), LF2AbstractSQL = __webpack_require__(117), odata_to_abstract_sql_1 = __webpack_require__(16), sbvrTypes = __webpack_require__(13);
    exports.sbvrTypes = sbvrTypes;
    const deepFreeze = __webpack_require__(44), pinejs_client_core_1 = __webpack_require__(177), extended_sbvr_parser_1 = __webpack_require__(62), migrator = __webpack_require__(64), odata_metadata_generator_1 = __webpack_require__(182), devModel = __webpack_require__(184), permissions = __webpack_require__(19), errors_1 = __webpack_require__(20), uriParser = __webpack_require__(67), hooks_1 = __webpack_require__(31);
    var hooks_2 = __webpack_require__(31);
    Object.defineProperty(exports, "addPureHook", {
        enumerable: !0,
        get: function() {
            return hooks_2.addPureHook;
        }
    });
    Object.defineProperty(exports, "addSideEffectHook", {
        enumerable: !0,
        get: function() {
            return hooks_2.addSideEffectHook;
        }
    });
    const memoizeWeak = __webpack_require__(32), controlFlow = __webpack_require__(66);
    exports.db = void 0;
    const package_json_2 = __webpack_require__(207), package_json_3 = __webpack_require__(208), abstract_sql_1 = __webpack_require__(74);
    var abstract_sql_2 = __webpack_require__(74);
    Object.defineProperty(exports, "resolveOdataBind", {
        enumerable: !0,
        get: function() {
            return abstract_sql_2.resolveOdataBind;
        }
    });
    const odataResponse = __webpack_require__(209), module_1 = __webpack_require__(33), LF2AbstractSQLTranslator = LF2AbstractSQL.createTranslator(sbvrTypes), LF2AbstractSQLTranslatorVersion = `${package_json_2.version}+${package_json_3.version}`, models = {}, memoizedResolvedSynonym = memoizeWeak(((abstractSqlModel, resourceName) => {
        const sqlName = odata_to_abstract_sql_1.odataNameToSqlName(resourceName);
        return _(sqlName).split("-").map((namePart => {
            const synonym = abstractSqlModel.synonyms[namePart];
            return null != synonym ? synonym : namePart;
        })).join("-");
    }), {
        primitive: !0
    }), resolveSynonym = request => {
        const abstractSqlModel = exports.getAbstractSqlModel(request);
        return memoizedResolvedSynonym(abstractSqlModel, request.resourceName);
    };
    exports.resolveSynonym = resolveSynonym;
    const memoizedResolveNavigationResource = memoizeWeak(((abstractSqlModel, resourceName, navigationName) => {
        const navigation = _(odata_to_abstract_sql_1.odataNameToSqlName(navigationName)).split("-").flatMap((namePart => memoizedResolvedSynonym(abstractSqlModel, namePart).split("-"))).concat("$").value(), resolvedResourceName = memoizedResolvedSynonym(abstractSqlModel, resourceName), mapping = _.get(abstractSqlModel.relationships[resolvedResourceName], navigation);
        if (null == mapping) throw new Error(`Cannot navigate from '${resourceName}' to '${navigationName}'`);
        if (mapping.length < 2) throw new Error(`'${resourceName}' to '${navigationName}' is a field not a navigation`);
        return odata_to_abstract_sql_1.sqlNameToODataName(abstractSqlModel.tables[mapping[1][0]].name);
    }), {
        primitive: !0
    }), resolveNavigationResource = (request, navigationName) => {
        const abstractSqlModel = exports.getAbstractSqlModel(request);
        return memoizedResolveNavigationResource(abstractSqlModel, request.resourceName, navigationName);
    };
    exports.resolveNavigationResource = resolveNavigationResource;
    const prettifyConstraintError = (err, request) => {
        if (err instanceof exports.db.ConstraintError) {
            let matches = null;
            if (err instanceof exports.db.UniqueConstraintError) {
                switch (exports.db.engine) {
                  case "mysql":
                    matches = /ER_DUP_ENTRY: Duplicate entry '.*?[^\\]' for key '(.*?[^\\])'/.exec(err.message);
                    break;

                  case "postgres":
                    const resourceName = exports.resolveSynonym(request), abstractSqlModel = exports.getAbstractSqlModel(request);
                    matches = new RegExp('"' + abstractSqlModel.tables[resourceName].name + '_(.*?)_key"').exec(err.message);
                }
                if (null == matches) throw new exports.db.UniqueConstraintError("Unique key constraint violated");
                const columns = matches[1].split("_");
                throw new exports.db.UniqueConstraintError('"' + columns.map(odata_to_abstract_sql_1.sqlNameToODataName).join('" and "') + '" must be unique.');
            }
            if (err instanceof exports.db.ForeignKeyConstraintError) {
                switch (exports.db.engine) {
                  case "mysql":
                    matches = /ER_ROW_IS_REFERENCED_: Cannot delete or update a parent row: a foreign key constraint fails \(".*?"\.(".*?").*/.exec(err.message);
                    break;

                  case "postgres":
                    const resourceName = exports.resolveSynonym(request), abstractSqlModel = undefined, tableName = exports.getAbstractSqlModel(request).tables[resourceName].name;
                    matches = new RegExp('"' + tableName + '" violates foreign key constraint ".*?" on table "(.*?)"').exec(err.message);
                    null == matches && (matches = new RegExp('"' + tableName + '" violates foreign key constraint "' + tableName + '_(.*?)_fkey"').exec(err.message));
                }
                if (null == matches) throw new exports.db.ForeignKeyConstraintError("Foreign key constraint violated");
                throw new exports.db.ForeignKeyConstraintError("Data is referenced by " + odata_to_abstract_sql_1.sqlNameToODataName(matches[1]) + ".");
            }
            if (err instanceof exports.db.CheckConstraintError) {
                const resourceName = exports.resolveSynonym(request), abstractSqlModel = undefined, table = exports.getAbstractSqlModel(request).tables[resourceName];
                if (table.checks) switch (exports.db.engine) {
                  case "postgres":
                    matches = new RegExp('new row for relation "' + table.name + '" violates check constraint "(.*?)"').exec(err.message);
                }
                if (null != matches) {
                    const checkName = matches[1], check = table.checks.find((c => c.name === checkName));
                    if (null != (null == check ? void 0 : check.description)) throw new errors_1.BadRequestError(check.description);
                }
                throw new errors_1.BadRequestError("Check constraint violated");
            }
            err.message = "Constraint failed";
            throw err;
        }
    }, validateModel = async (tx, modelName, request) => {
        await Promise.all(models[modelName].sql.rules.map((async rule => {
            if (!abstract_sql_1.isRuleAffected(rule, request)) return;
            const values = await abstract_sql_1.getAndCheckBindValues({
                vocabulary: modelName,
                odataBinds: [],
                values: {},
                engine: exports.db.engine
            }, rule.bindings), result = undefined, v = (await tx.executeSql(rule.sql, values)).rows[0].result;
            if (!1 === v || 0 === v || "0" === v) throw new errors_1.SbvrValidationError(rule.structuredEnglish);
        })));
    };
    exports.validateModel = validateModel;
    const generateLfModel = seModel => cached_compile_1.cachedCompile("lfModel", extended_sbvr_parser_1.ExtendedSBVRParser.version, seModel, (() => extended_sbvr_parser_1.ExtendedSBVRParser.matchAll(seModel, "Process")));
    exports.generateLfModel = generateLfModel;
    const generateAbstractSqlModel = lfModel => cached_compile_1.cachedCompile("abstractSqlModel", LF2AbstractSQLTranslatorVersion, lfModel, (() => LF2AbstractSQLTranslator(lfModel, "Process")));
    exports.generateAbstractSqlModel = generateAbstractSqlModel;
    const generateSqlModel = (abstractSql, targetDatabaseEngine) => cached_compile_1.cachedCompile("sqlModel", package_json_1.version + "+" + targetDatabaseEngine, abstractSql, (() => AbstractSQLCompiler[targetDatabaseEngine].compileSchema(abstractSql)));
    exports.generateSqlModel = generateSqlModel;
    const generateModels = (model, targetDatabaseEngine) => {
        const {apiRoot: vocab, modelText: se} = model;
        let {abstractSql: maybeAbstractSql} = model, lf;
        if (se) {
            try {
                lf = exports.generateLfModel(se);
            } catch (e) {
                console.error(`Error parsing model '${vocab}':`, e);
                throw new Error(`Error parsing model '${vocab}': ` + e);
            }
            try {
                maybeAbstractSql = exports.generateAbstractSqlModel(lf);
            } catch (e) {
                console.error(`Error translating model '${vocab}':`, e);
                throw new Error(`Error translating model '${vocab}': ` + e);
            }
        }
        const abstractSql = maybeAbstractSql, odataMetadata = cached_compile_1.cachedCompile("metadata", odata_metadata_generator_1.generateODataMetadata.version, {
            vocab: vocab,
            abstractSqlModel: abstractSql
        }, (() => odata_metadata_generator_1.generateODataMetadata(vocab, abstractSql)));
        let sql;
        try {
            sql = exports.generateSqlModel(abstractSql, targetDatabaseEngine);
        } catch (e) {
            console.error(`Error compiling model '${vocab}':`, e);
            throw new Error(`Error compiling model '${vocab}': ` + e);
        }
        return {
            vocab: vocab,
            se: se,
            lf: lf,
            abstractSql: abstractSql,
            sql: sql,
            odataMetadata: odataMetadata
        };
    };
    exports.generateModels = generateModels;
    const executeModel = (tx, model) => exports.executeModels(tx, [ model ]);
    exports.executeModel = executeModel;
    const executeModels = async (tx, execModels) => {
        try {
            const compiledModels = await Promise.all(execModels.map((async model => {
                var _a, _b, _c, _d;
                const {apiRoot: apiRoot} = model;
                await migrator.run(tx, model);
                const compiledModel = exports.generateModels(model, exports.db.engine);
                for (const createStatement of compiledModel.sql.createSchema) {
                    const promise = tx.executeSql(createStatement);
                    "websql" === exports.db.engine && promise.catch((err => {
                        console.warn("Ignoring errors in the create table statements for websql as it doesn't support CREATE IF NOT EXISTS", err);
                    }));
                    await promise;
                }
                await migrator.postRun(tx, model);
                odataResponse.prepareModel(compiledModel.abstractSql);
                deepFreeze(compiledModel.abstractSql);
                models[apiRoot] = compiledModel;
                await exports.validateModel(tx, apiRoot);
                exports.api[apiRoot] = new PinejsClient("/" + apiRoot + "/");
                exports.api[apiRoot].logger = {
                    ...console
                };
                if (null != model.logging) {
                    const defaultSetting = null === (_b = null === (_a = model.logging) || void 0 === _a ? void 0 : _a.default) || void 0 === _b || _b;
                    for (const k of Object.keys(model.logging)) {
                        const key = k;
                        "function" != typeof exports.api[apiRoot].logger[key] || (null !== (_d = null === (_c = model.logging) || void 0 === _c ? void 0 : _c[key]) && void 0 !== _d ? _d : defaultSetting) || (exports.api[apiRoot].logger[key] = _.noop);
                    }
                }
                return compiledModel;
            })));
            await Promise.all(compiledModels.map((async model => {
                const updateModel = async modelType => {
                    var _a;
                    if (null == model[modelType]) return await exports.api.dev.delete({
                        resource: "model",
                        passthrough: {
                            tx: tx,
                            req: permissions.root
                        },
                        options: {
                            $filter: {
                                is_of__vocabulary: model.vocab,
                                model_type: modelType
                            }
                        }
                    });
                    const result = await exports.api.dev.get({
                        resource: "model",
                        passthrough: {
                            tx: tx,
                            req: permissions.rootRead
                        },
                        options: {
                            $select: "id",
                            $filter: {
                                is_of__vocabulary: model.vocab,
                                model_type: modelType
                            }
                        }
                    });
                    let method = "POST", uri = "/dev/model";
                    const body = {
                        is_of__vocabulary: model.vocab,
                        model_value: model[modelType],
                        model_type: modelType
                    }, id = null === (_a = null == result ? void 0 : result[0]) || void 0 === _a ? void 0 : _a.id;
                    if (null != id) {
                        uri += "(" + id + ")";
                        method = "PATCH";
                        body.id = id;
                    } else uri += "?returnResource=false";
                    return await exports.runURI(method, uri, body, tx, permissions.root);
                };
                await Promise.all([ "se", "lf", "abstractSql", "sql", "odataMetadata" ].map(updateModel));
            })));
        } catch (err) {
            await Promise.all(execModels.map((async ({apiRoot: apiRoot}) => {
                await cleanupModel(apiRoot);
            })));
            throw err;
        }
    };
    exports.executeModels = executeModels;
    const cleanupModel = vocab => {
        delete models[vocab];
        delete exports.api[vocab];
    }, deleteModel = async vocabulary => {
        await exports.db.transaction((async tx => {
            const dropStatements = models[vocabulary].sql.dropSchema.map((dropStatement => tx.executeSql(dropStatement)));
            await Promise.all(dropStatements.concat([ exports.api.dev.delete({
                resource: "model",
                passthrough: {
                    tx: tx,
                    req: permissions.root
                },
                options: {
                    $filter: {
                        is_of__vocabulary: vocabulary
                    }
                }
            }) ]));
        }));
        await cleanupModel(vocabulary);
    };
    exports.deleteModel = deleteModel;
    const isWhereNode = x => "Where" === x[0], isEqualsNode = x => "Equals" === x[0], getID = (vocab, request) => {
        if (null == request.abstractSqlQuery) throw new Error("Can only get the id if an abstractSqlQuery is provided");
        const {idField: idField} = models[vocab].abstractSql.tables[request.resourceName];
        for (const whereClause of request.abstractSqlQuery) if (isWhereNode(whereClause)) for (const comparison of whereClause.slice(1)) if (isEqualsNode(comparison)) {
            if (comparison[1][2] === idField) return comparison[2][1];
            if (comparison[2][2] === idField) return comparison[1][1];
        }
        return 0;
    };
    exports.getID = getID;
    exports.runRule = (() => {
        const LF2AbstractSQLPrepHack = LF2AbstractSQL.LF2AbstractSQLPrep._extend({
            CardinalityOptimisation() {
                this._pred(!1);
            }
        }), translator = LF2AbstractSQL.LF2AbstractSQL.createInstance();
        translator.addTypes(sbvrTypes);
        return async (vocab, rule) => {
            const seModel = models[vocab].se, {logger: logger} = exports.api[vocab];
            let lfModel, slfModel, abstractSqlModel;
            try {
                lfModel = extended_sbvr_parser_1.ExtendedSBVRParser.matchAll(seModel + "\nRule: " + rule, "Process");
            } catch (e) {
                logger.error("Error parsing rule", rule, e);
                throw new Error(`Error parsing rule'${rule}': ${e}`);
            }
            const ruleLF = lfModel.pop();
            try {
                slfModel = LF2AbstractSQL.LF2AbstractSQLPrep.match(lfModel, "Process");
                slfModel.push(ruleLF);
                slfModel = LF2AbstractSQLPrepHack.match(slfModel, "Process");
                translator.reset();
                abstractSqlModel = translator.match(slfModel, "Process");
            } catch (e) {
                logger.error("Error compiling rule", rule, e);
                throw new Error(`Error compiling rule '${rule}': ${e}`);
            }
            const formulationType = ruleLF[1][0];
            let resourceName;
            resourceName = "LogicalNegation" === ruleLF[1][1][0] ? ruleLF[1][1][1][1][2][1] : ruleLF[1][1][1][2][1];
            let fetchingViolators = !1;
            const ruleAbs = _.last(abstractSqlModel.rules);
            if (null == ruleAbs) throw new Error("Unable to generate rule");
            const ruleBody = ruleAbs.find((node => "Body" === node[0]));
            if ("Not" === ruleBody[1][0] && "Exists" === ruleBody[1][1][0] && "SelectQuery" === ruleBody[1][1][1][0]) {
                ruleBody[1] = ruleBody[1][1][1];
                fetchingViolators = !0;
            } else {
                if ("Exists" !== ruleBody[1][0] || "SelectQuery" !== ruleBody[1][1][0]) throw new Error("Unsupported rule formulation");
                ruleBody[1] = ruleBody[1][1];
            }
            const wantNonViolators = undefined;
            formulationType in [ "PossibilityFormulation", "PermissibilityFormulation" ] === fetchingViolators && (ruleBody[1] = ruleBody[1].map((queryPart => {
                if ("Where" !== queryPart[0]) return queryPart;
                if (queryPart.length > 2) throw new Error("Unsupported rule formulation");
                return [ "Where", [ "Not", queryPart[1] ] ];
            })));
            ruleBody[1] = ruleBody[1].map((queryPart => "Select" !== queryPart[0] ? queryPart : [ "Select", "*" ]));
            const compiledRule = AbstractSQLCompiler[exports.db.engine].compileRule(ruleBody);
            if (Array.isArray(compiledRule)) throw new Error("Unexpected query generated");
            const values = await abstract_sql_1.getAndCheckBindValues({
                vocabulary: vocab,
                odataBinds: [],
                values: {},
                engine: exports.db.engine
            }, compiledRule.bindings), result = await exports.db.executeSql(compiledRule.query, values), table = models[vocab].abstractSql.tables[resourceName], odataIdField = odata_to_abstract_sql_1.sqlNameToODataName(table.idField);
            let ids = result.rows.map((row => row[table.idField])), filter;
            ids = _.uniq(ids);
            ids = ids.map((id => odataIdField + " eq " + id));
            filter = ids.length > 0 ? ids.join(" or ") : "0 eq 1";
            const odataResult = await exports.runURI("GET", "/" + vocab + "/" + odata_to_abstract_sql_1.sqlNameToODataName(table.resourceName) + "?$filter=" + filter, void 0, void 0, permissions.rootRead);
            odataResult.__formulationType = formulationType;
            odataResult.__resourceName = resourceName;
            return odataResult;
        };
    })();
    class PinejsClient extends pinejs_client_core_1.PinejsClientCore {
        async _request({method: method, url: url, body: body, tx: tx, req: req, custom: custom}) {
            return await exports.runURI(method, url, body, tx, req, custom);
        }
    }
    exports.PinejsClient = PinejsClient;
    exports.api = {};
    const runURI = async (method, uri, body = {}, tx, req, custom) => {
        const [, apiRoot] = uri.split("/", 2);
        if (null == apiRoot || null == models[apiRoot]) throw new errors_1.InternalRequestError;
        let user, apiKey;
        if (null != req && _.isObject(req)) {
            user = req.user;
            apiKey = req.apiKey;
        } else {
            null != req && console.warn("Non-object req passed to runURI?", req, (new Error).stack);
            user = {
                id: 0,
                actor: 0,
                permissions: []
            };
        }
        _.forEach(body, ((v, k) => {
            void 0 === v && delete body[k];
        }));
        const emulatedReq = {
            on: _.noop,
            custom: custom,
            user: user,
            apiKey: apiKey,
            method: method,
            url: uri,
            body: body,
            params: {},
            query: {},
            tx: tx
        }, {promise: promise} = runODataRequest(emulatedReq, apiRoot), [response] = await promise;
        if (_.isError(response)) throw response;
        const {body: responseBody, status: status} = response;
        if (null != status && status >= 400) {
            const ErrorClass = errors_1.statusCodeToError[status];
            if (null != ErrorClass) throw new ErrorClass(void 0, responseBody);
            throw new errors_1.HttpError(status, void 0, responseBody);
        }
        return responseBody;
    };
    exports.runURI = runURI;
    const getAbstractSqlModel = request => {
        var _a;
        return null !== (_a = request.abstractSqlModel) && void 0 !== _a ? _a : request.abstractSqlModel = models[request.vocabulary].abstractSql;
    };
    exports.getAbstractSqlModel = getAbstractSqlModel;
    const getIdField = request => exports.getAbstractSqlModel(request).tables[exports.resolveSynonym(request)].idField, getAffectedIds = async args => {
        const {request: request} = args;
        if (request.affectedIds) return request.affectedIds;
        if (null != request.pendingAffectedIds) return request.pendingAffectedIds;
        request.pendingAffectedIds = $getAffectedIds(args);
        request.affectedIds = await request.pendingAffectedIds;
        delete request.pendingAffectedIds;
        return request.affectedIds;
    };
    exports.getAffectedIds = getAffectedIds;
    const $getAffectedIds = async ({req: req, request: request, tx: tx}) => {
        var _a, _b;
        if ("GET" === request.method) throw new Error("Cannot call `getAffectedIds` with a GET request");
        (request = await uriParser.parseOData({
            method: request.method,
            url: `/${request.vocabulary}${request.url}`
        })).engine = exports.db.engine;
        const abstractSqlModel = exports.getAbstractSqlModel(request), resourceName = exports.resolveSynonym(request), resourceTable = abstractSqlModel.tables[resourceName];
        if (null == resourceTable) throw new Error("Unknown resource: " + request.resourceName);
        const {idField: idField} = resourceTable;
        null !== (_a = (_b = request.odataQuery).options) && void 0 !== _a || (_b.options = {});
        request.odataQuery.options.$select = {
            properties: [ {
                name: idField
            } ]
        };
        delete request.odataQuery.options.$expand;
        await permissions.addPermissions(req, request);
        request.method = "GET";
        request = uriParser.translateUri(request);
        request = abstract_sql_1.compileRequest(request);
        let result;
        result = null != tx ? await runQuery(tx, request) : await runTransaction(req, (newTx => runQuery(newTx, request)));
        return result.rows.map((row => row[idField]));
    }, runODataRequest = (req, vocabulary) => {
        module_1.env.DEBUG && exports.api[vocabulary].logger.log("Parsing", req.method, req.url);
        const reqHooks = hooks_1.getHooks({
            method: req.method,
            vocabulary: vocabulary
        }), transactions = [], tryCancelRequest = () => {
            transactions.forEach((async tx => {
                if (!tx.isClosed()) try {
                    await tx.rollback();
                } catch (_a) {}
            }));
            transactions.length = 0;
            hooks_1.rollbackRequestHooks(reqHooks);
        };
        req.on("close", tryCancelRequest);
        if (null != req.tx) {
            transactions.push(req.tx);
            req.tx.on("rollback", tryCancelRequest);
        }
        const mapSeries = controlFlow.getMappingFn(req.headers);
        return {
            tryCancelRequest: tryCancelRequest,
            promise: (async () => {
                await hooks_1.runHooks("PREPARSE", reqHooks, {
                    req: req,
                    tx: req.tx
                });
                let requests;
                if (null != req.batch && req.batch.length > 0) requests = req.batch; else {
                    const {method: method, url: url, body: body} = req;
                    requests = [ {
                        method: method,
                        url: url,
                        data: body
                    } ];
                }
                const prepareRequest = async $request => {
                    $request.engine = exports.db.engine;
                    $request.hooks = hooks_1.getHooks($request);
                    try {
                        await hooks_1.runHooks("POSTPARSE", $request.hooks, {
                            req: req,
                            request: $request,
                            tx: req.tx
                        });
                        const translatedRequest = await uriParser.translateUri($request);
                        return await abstract_sql_1.compileRequest(translatedRequest);
                    } catch (err) {
                        hooks_1.rollbackRequestHooks(reqHooks);
                        hooks_1.rollbackRequestHooks($request.hooks);
                        throw err;
                    }
                }, results = undefined, responses = (await mapSeries(requests, (async requestPart => {
                    let request = await uriParser.parseOData(requestPart);
                    request = Array.isArray(request) ? await Bluebird.mapSeries(request, prepareRequest) : await prepareRequest(request);
                    return await runTransaction(req, (async tx => {
                        transactions.push(tx);
                        tx.on("rollback", (() => {
                            hooks_1.rollbackRequestHooks(reqHooks);
                            Array.isArray(request) ? request.forEach((({hooks: hooks}) => {
                                hooks_1.rollbackRequestHooks(hooks);
                            })) : hooks_1.rollbackRequestHooks(request.hooks);
                        }));
                        if (Array.isArray(request)) {
                            const changeSetResults = await Bluebird.reduce(request, runChangeSet(req, tx), new Map);
                            return Array.from(changeSetResults.values());
                        }
                        return await runRequest(req, tx, request);
                    }));
                }))).map((result => {
                    if (_.isError(result)) return convertToHttpError(result);
                    if (!Array.isArray(result) && null == result.body && null == result.status) {
                        console.error("No status or body set", req.url, responses);
                        return new errors_1.InternalRequestError;
                    }
                    return result;
                }));
                return responses;
            })()
        };
    }, handleODataRequest = async (req, res, next) => {
        const [, apiRoot] = req.url.split("/", 2);
        if (null == apiRoot || null == models[apiRoot]) return next("route");
        try {
            const {tryCancelRequest: tryCancelRequest, promise: promise} = runODataRequest(req, apiRoot);
            res.on("close", tryCancelRequest);
            const responses = await promise;
            res.set("Cache-Control", "no-cache");
            if (null == req.batch || 0 === req.batch.length) {
                let [response] = responses;
                _.isError(response) && (response = {
                    status: response.status,
                    body: response.getResponseBody()
                });
                const {body: body, headers: headers, status: status} = response;
                status && res.status(status);
                _.forEach(headers, ((headerValue, headerName) => {
                    res.set(headerName, headerValue);
                }));
                if (body) {
                    null != status && res.status(status);
                    res.json(body);
                } else res.sendStatus(status);
            } else res.status(200).sendMulti(responses.map((response => _.isError(response) ? {
                status: response.status,
                body: response.getResponseBody()
            } : response)));
        } catch (e) {
            console.error("An error occurred while constructing the response", e);
            res.sendStatus(500);
        }
    };
    exports.handleODataRequest = handleODataRequest;
    const convertToHttpError = err => {
        if (err instanceof errors_1.HttpError) return err;
        if (err instanceof errors_1.SbvrValidationError) return new errors_1.BadRequestError(err);
        if (err instanceof errors_1.PermissionError) return new errors_1.UnauthorizedError(err);
        if (err instanceof exports.db.ConstraintError) return new errors_1.ConflictError(err);
        if (err instanceof errors_1.SqlCompilationError || err instanceof errors_1.TranslationError || err instanceof errors_1.ParsingError || err instanceof errors_1.PermissionParsingError || err instanceof exports.db.DatabaseError) return new errors_1.InternalRequestError;
        console.error("Unexpected response error type", err);
        return new errors_1.NotFoundError(err);
    }, runRequest = async (req, tx, request) => {
        const {logger: logger} = exports.api[request.vocabulary];
        module_1.env.DEBUG && logger.log("Running", req.method, req.url);
        let result;
        try {
            try {
                await hooks_1.runHooks("PRERUN", request.hooks, {
                    req: req,
                    request: request,
                    tx: tx
                });
                switch (request.method) {
                  case "GET":
                    result = await runGet(req, request, tx);
                    break;

                  case "POST":
                    result = await runPost(req, request, tx);
                    break;

                  case "PUT":
                  case "PATCH":
                  case "MERGE":
                    result = await runPut(req, request, tx);
                    break;

                  case "DELETE":
                    result = await runDelete(req, request, tx);
                }
            } catch (err) {
                if (err instanceof exports.db.DatabaseError) {
                    prettifyConstraintError(err, request);
                    logger.error(err);
                    err.message = "Database error";
                    throw err;
                }
                if (err instanceof uriParser.SyntaxError || err instanceof EvalError || err instanceof RangeError || err instanceof ReferenceError || err instanceof SyntaxError || err instanceof TypeError || err instanceof URIError) {
                    logger.error(err);
                    throw new errors_1.InternalRequestError;
                }
                throw err;
            }
            await hooks_1.runHooks("POSTRUN", request.hooks, {
                req: req,
                request: request,
                result: result,
                tx: tx
            });
        } catch (err) {
            await hooks_1.runHooks("POSTRUN-ERROR", request.hooks, {
                req: req,
                request: request,
                tx: tx,
                error: err
            });
            throw err;
        }
        return await prepareResponse(req, request, result, tx);
    }, runChangeSet = (req, tx) => async (changeSetResults, request) => {
        var _a;
        request = updateBinds(changeSetResults, request);
        const result = await runRequest(req, tx, request);
        if (null == request.id) throw new Error("No request id");
        null !== (_a = result.headers) && void 0 !== _a || (result.headers = {});
        result.headers["Content-Id"] = request.id;
        changeSetResults.set(request.id, result);
        return changeSetResults;
    }, updateBinds = (changeSetResults, request) => {
        request._defer && (request.odataBinds = request.odataBinds.map((([tag, id]) => {
            if ("ContentReference" === tag) {
                const ref = changeSetResults.get(id);
                if (null == (null == ref ? void 0 : ref.body) || "string" == typeof ref.body || void 0 === ref.body.id) throw new errors_1.BadRequestError("Reference to a non existing resource in Changeset");
                return uriParser.parseId(ref.body.id);
            }
            return [ tag, id ];
        })));
        return request;
    }, prepareResponse = async (req, request, result, tx) => {
        switch (request.method) {
          case "GET":
            return await respondGet(req, request, result, tx);

          case "POST":
            return await respondPost(req, request, result, tx);

          case "PUT":
          case "PATCH":
          case "MERGE":
            return await respondPut(req, request, result, tx);

          case "DELETE":
            return await respondDelete(req, request, result, tx);

          case "OPTIONS":
            return await respondOptions(req, request, result, tx);

          default:
            throw new errors_1.MethodNotAllowedError;
        }
    }, runTransaction = async (req, callback) => null != req.tx ? await callback(req.tx) : await exports.db.transaction(callback), runQuery = async (tx, request, queryIndex, returningIdField) => {
        const {vocabulary: vocabulary} = request;
        let {sqlQuery: sqlQuery} = request;
        if (null == sqlQuery) throw new errors_1.InternalRequestError("No SQL query available to run");
        if (null == request.engine) throw new errors_1.InternalRequestError("No database engine specified");
        if (Array.isArray(sqlQuery)) {
            if (null == queryIndex) throw new errors_1.InternalRequestError("Received a query index to run but the query is not an array");
            sqlQuery = sqlQuery[queryIndex];
        }
        const {query: query, bindings: bindings} = sqlQuery, values = await abstract_sql_1.getAndCheckBindValues(request, bindings);
        module_1.env.DEBUG && exports.api[vocabulary].logger.log(query, values);
        const sqlResult = await tx.executeSql(query, values, returningIdField);
        returningIdField && (request.affectedIds = sqlResult.rows.map((row => row[returningIdField])));
        return sqlResult;
    }, runGet = async (_req, request, tx) => {
        if (null != request.sqlQuery) return await runQuery(tx, request);
    }, respondGet = async (req, request, result, tx) => {
        var _a;
        const vocab = request.vocabulary;
        if (null != request.sqlQuery) {
            const format = null === (_a = request.odataQuery.options) || void 0 === _a ? void 0 : _a.$format, metadata = null != format && "object" == typeof format ? format.metadata : void 0, d = await odataResponse.process(vocab, exports.getAbstractSqlModel(request), request.resourceName, result.rows, {
                includeMetadata: "full" === metadata
            });
            await hooks_1.runHooks("PRERESPOND", request.hooks, {
                req: req,
                request: request,
                result: result,
                data: d,
                tx: tx
            });
            return {
                body: {
                    d: d
                },
                headers: {
                    contentType: "application/json"
                }
            };
        }
        return "$metadata" === request.resourceName ? {
            body: models[vocab].odataMetadata,
            headers: {
                contentType: "xml"
            }
        } : {
            status: 404
        };
    }, runPost = async (_req, request, tx) => {
        const {rowsAffected: rowsAffected, insertId: insertId} = await runQuery(tx, request, void 0, getIdField(request));
        if (0 === rowsAffected) throw new errors_1.PermissionError;
        await exports.validateModel(tx, request.vocabulary, request);
        return insertId;
    }, respondPost = async (req, request, id, tx) => {
        var _a, _b;
        const vocab = request.vocabulary, location = odataResponse.resourceURI(vocab, request.resourceName, id);
        module_1.env.DEBUG && exports.api[vocab].logger.log("Insert ID: ", request.resourceName, id);
        let result = {
            d: [ {
                id: id
            } ]
        };
        if (null != location && ![ "0", "false" ].includes(null === (_b = null === (_a = null == request ? void 0 : request.odataQuery) || void 0 === _a ? void 0 : _a.options) || void 0 === _b ? void 0 : _b.returnResource)) try {
            result = await exports.runURI("GET", location, void 0, tx, req);
        } catch (_c) {}
        await hooks_1.runHooks("PRERESPOND", request.hooks, {
            req: req,
            request: request,
            result: result,
            tx: tx
        });
        return {
            status: 201,
            body: result.d[0],
            headers: {
                contentType: "application/json",
                Location: location
            }
        };
    }, runPut = async (_req, request, tx) => {
        const idField = getIdField(request);
        let rowsAffected;
        if (Array.isArray(request.sqlQuery)) {
            ({rowsAffected: rowsAffected} = await runQuery(tx, request, 1, idField));
            0 === rowsAffected && ({rowsAffected: rowsAffected} = await runQuery(tx, request, 0, idField));
        } else ({rowsAffected: rowsAffected} = await runQuery(tx, request, void 0, idField));
        rowsAffected > 0 && await exports.validateModel(tx, request.vocabulary, request);
    }, respondPut = async (req, request, result, tx) => {
        await hooks_1.runHooks("PRERESPOND", request.hooks, {
            req: req,
            request: request,
            result: result,
            tx: tx
        });
        return {
            status: 200,
            headers: {}
        };
    }, respondDelete = respondPut, respondOptions = respondPut, runDelete = async (_req, request, tx) => {
        const {rowsAffected: rowsAffected} = await runQuery(tx, request, void 0, getIdField(request));
        rowsAffected > 0 && await exports.validateModel(tx, request.vocabulary, request);
    }, executeStandardModels = async tx => {
        try {
            await exports.executeModel(tx, {
                apiRoot: "dev",
                modelText: devModel,
                logging: {
                    log: !1
                },
                migrations: {
                    "11.0.0-modified-at": '\n\t\t\t\t\tALTER TABLE "model"\n\t\t\t\t\tADD COLUMN IF NOT EXISTS "modified at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;\n\t\t\t\t'
                }
            });
            await exports.executeModels(tx, permissions.config.models);
            console.info("Successfully executed standard models.");
        } catch (err) {
            console.error("Failed to execute standard models.", err);
            throw err;
        }
    };
    exports.executeStandardModels = executeStandardModels;
    const setup = async (_app, $db) => {
        exports.db = exports.db = $db;
        try {
            await exports.db.transaction((async tx => {
                await exports.executeStandardModels(tx);
                await permissions.setup();
            }));
        } catch (err) {
            console.error("Could not execute standard models", err);
            process.exit(1);
        }
        try {
            await exports.db.executeSql('CREATE UNIQUE INDEX "uniq_model_model_type_vocab" ON "model" ("is of-vocabulary", "model type");');
        } catch (_a) {}
    };
    exports.setup = setup;
}, function(module, exports, __webpack_require__) {
    "use strict";
    var _undefined = __webpack_require__(122)();
    module.exports = function(val) {
        return val !== _undefined && null !== val;
    };
}, function(module, exports, __webpack_require__) {}, function(module, exports, __webpack_require__) {
    var buffer = __webpack_require__(107), Buffer = buffer.Buffer;
    function copyProps(src, dst) {
        for (var key in src) dst[key] = src[key];
    }
    if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) module.exports = buffer; else {
        copyProps(buffer, exports);
        exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
        return Buffer(arg, encodingOrOffset, length);
    }
    copyProps(Buffer, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
        if ("number" == typeof arg) throw new TypeError("Argument must not be a number");
        return Buffer(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
        if ("number" != typeof size) throw new TypeError("Argument must be a number");
        var buf = Buffer(size);
        void 0 !== fill ? "string" == typeof encoding ? buf.fill(fill, encoding) : buf.fill(fill) : buf.fill(0);
        return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
        if ("number" != typeof size) throw new TypeError("Argument must be a number");
        return Buffer(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
        if ("number" != typeof size) throw new TypeError("Argument must be a number");
        return buffer.SlowBuffer(size);
    };
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_RESULT__, root, factory;
    root = this, factory = function() {
        "use strict";
        var fail = function fail() {
            return fail.error;
        }, OMeta;
        (fail.error = new SyntaxError("match failed"))._extend = function(child) {
            return objectThatDelegatesTo(this, child);
        };
        function objectThatDelegatesTo(obj, props) {
            var clone = Object.create(obj || {});
            for (var key in props) props.hasOwnProperty(key) && (clone[key] = props[key]);
            return clone;
        }
        function isSequenceable(o) {
            return "string" == typeof o || Array.isArray(o);
        }
        function getTag(o) {
            if (null == o) return "null";
            switch (typeof o) {
              case "boolean":
                return !0 === o ? "Btrue" : "Bfalse";

              case "string":
                return "S" + o;

              case "number":
                return "N" + o;

              default:
                o.hasOwnProperty("_id_") || (o._id_ = getTag.id++);
                return "R" + o._id_;
            }
        }
        getTag.id = 0;
        function isImmutable(o) {
            return null == o || "boolean" == typeof o || "number" == typeof o || "string" == typeof o;
        }
        function lookup(fn, success, fallback) {
            var value;
            try {
                value = fn();
            } catch (e) {
                if (!(e instanceof SyntaxError)) throw e;
                return fallback && fallback(e);
            }
            return success && success(value);
        }
        function always(fn, after) {
            try {
                return fn();
            } finally {
                after();
            }
        }
        function identity(ans) {
            return ans;
        }
        function returnTrue() {
            return !0;
        }
        function returnFalse() {
            return !1;
        }
        function throwFail() {
            throw fail();
        }
        function noop() {}
        function OMInputStream(hd, tl) {
            this.memo = {};
            this.lst = tl.lst;
            this.idx = tl.idx;
            this.hd = hd;
            this.tl = tl;
        }
        OMInputStream.prototype.head = function() {
            return this.hd;
        };
        OMInputStream.prototype.tail = function() {
            return this.tl;
        };
        OMInputStream.prototype.type = function() {
            return this.lst.constructor;
        };
        OMInputStream.prototype.upTo = function(that) {
            for (var r = [], curr = this; curr !== that; ) {
                r.push(curr.head());
                curr = curr.tail();
            }
            return this.type() === String ? r.join("") : r;
        };
        function OMInputStreamEnd(lst, idx) {
            this.memo = {};
            this.lst = lst;
            this.idx = idx;
        }
        OMInputStreamEnd.prototype = objectThatDelegatesTo(OMInputStream.prototype);
        OMInputStreamEnd.prototype.head = throwFail;
        OMInputStreamEnd.prototype.tail = throwFail;
        function ListOMInputStream(lst, idx) {
            this.memo = {};
            this.lst = lst;
            this.idx = idx;
            this.hd = lst[idx];
        }
        ListOMInputStream.prototype = objectThatDelegatesTo(OMInputStream.prototype);
        ListOMInputStream.prototype.head = function() {
            return this.hd;
        };
        ListOMInputStream.prototype.tail = function() {
            return this.tl || (this.tl = makeListOMInputStream(this.lst, this.idx + 1));
        };
        function makeListOMInputStream(lst, idx) {
            return idx < lst.length ? new ListOMInputStream(lst, idx) : new OMInputStreamEnd(lst, idx);
        }
        function makeOMInputStreamProxy(target) {
            return {
                memo: {},
                target: target,
                idx: target.idx,
                tl: void 0,
                type: function() {
                    return String;
                },
                upTo: OMInputStream.prototype.upTo,
                head: function() {
                    return target.head();
                },
                tail: function() {
                    return this.tl || (this.tl = makeOMInputStreamProxy(target.tail()));
                }
            };
        }
        return OMeta = {
            _extend: function(child) {
                return objectThatDelegatesTo(this, child);
            },
            _fail: fail,
            _enableTokens: function(rulesToTrack) {
                if (null != rulesToTrack) {
                    this._enableTokens = function() {
                        throw "Can only enable tokens once";
                    };
                    this._tokensEnabled = returnTrue;
                    this._addToken = function(startInput, endInput, rule, ruleArgs) {
                        if (-1 !== rulesToTrack.indexOf(rule) && startInput !== endInput) {
                            for (;startInput.hasOwnProperty("target"); ) startInput = startInput.target;
                            for (;endInput.hasOwnProperty("target"); ) endInput = endInput.target;
                            startInput.hasOwnProperty("tokens") || (startInput.tokens = []);
                            startInput.tokens.push([ endInput.idx, rule, ruleArgs ]);
                        }
                    };
                }
            },
            _addToken: noop,
            _tokensEnabled: returnFalse,
            _enableBranchTracking: function(rulesToTrack) {
                var branches = [];
                this._enableBranchTracking = function() {
                    throw "Can only enable tokens once";
                };
                this._addBranch = function(rule, ruleArgs) {
                    if (rulesToTrack.hasOwnProperty(rule)) {
                        var idx = this.input.idx;
                        void 0 === branches[idx] && (branches[idx] = {});
                        branches[idx][rule] = ruleArgs;
                    }
                };
                this._getBranches = function() {
                    return branches;
                };
                this._not = function(x) {
                    var self = this, origInput = this.input, origAddBranch = this._addBranch, origAddToken = this._addToken;
                    return always((function() {
                        return lookup((function() {
                            x.call(self);
                        }), throwFail, (function() {
                            self.input = origInput;
                            return !0;
                        }));
                    }), (function() {
                        self._addBranch = origAddBranch;
                        self._addToken = origAddToken;
                    }));
                };
            },
            _addBranch: noop,
            _getBranches: noop,
            _apply: function(rule) {
                var memo = this.input.memo, memoRec = memo[rule], origInput = this.input;
                this._addBranch(rule, []);
                if (void 0 === memoRec) {
                    memo[rule] = !1;
                    memoRec = {
                        ans: this[rule](),
                        nextInput: this.input
                    };
                    var failer = memo[rule];
                    memo[rule] = memoRec;
                    if (!0 === failer) for (var self = this, sentinel = this.input, lookupFunc = function() {
                        self.input = origInput;
                        var ans = self[rule]();
                        if (self.input === sentinel) throw fail();
                        memoRec.ans = ans;
                        memoRec.nextInput = self.input;
                    }; lookup(lookupFunc, returnTrue, returnFalse); ) ;
                } else if ("boolean" == typeof memoRec) {
                    memo[rule] = !0;
                    throw fail();
                }
                this.input = memoRec.nextInput;
                this._addToken(origInput, this.input, rule, []);
                return memoRec.ans;
            },
            _superApply: function(recv, rule) {
                var origInput = recv.input;
                this._addBranch(rule, []);
                var ans = this[rule].call(recv);
                this._addToken(origInput, recv.input, rule, []);
                return ans;
            },
            _applyWithArgs: function(rule) {
                for (var origInput = this.input, ruleFn = this[rule], ruleFnArity = ruleFn.length, ruleArgs = new Array(Math.min(arguments.length - 1, ruleFnArity)), i = 0; i < ruleArgs.length; ++i) ruleArgs[i] = arguments[i + 1];
                for (var idx = arguments.length - 1; idx > ruleFnArity; idx--) this._prependInput(arguments[idx]);
                this._addBranch(rule, ruleArgs);
                var ans = 0 === ruleFnArity ? ruleFn.call(this) : ruleFn.apply(this, ruleArgs);
                this._addToken(origInput, this.input, rule, ruleArgs);
                return ans;
            },
            _superApplyWithArgs: function(recv, rule) {
                for (var origInput = recv.input, ruleFn = this[rule], ruleFnArity = ruleFn.length, ruleArgs = new Array(Math.min(arguments.length - 2, ruleFnArity)), i = 0; i < ruleArgs.length; ++i) ruleArgs[i] = arguments[i + 2];
                for (var idx = arguments.length - 1; idx > ruleFnArity + 1; idx--) recv._prependInput(arguments[idx]);
                this._addBranch(rule, ruleArgs);
                var ans = 0 === ruleFnArity ? ruleFn.call(recv) : ruleFn.apply(recv, ruleArgs);
                this._addToken(origInput, recv.input, rule, ruleArgs);
                return ans;
            },
            _prependInput: function(v) {
                this.input = new OMInputStream(v, this.input);
            },
            _disablePrependingInput: function() {
                this._applyWithArgs = function(rule) {
                    for (var origInput = this.input, ruleArgs = new Array(arguments.length - 1), i = 0; i < ruleArgs.length; ++i) ruleArgs[i] = arguments[i + 1];
                    this._addBranch(rule, ruleArgs);
                    var ans = this[rule].apply(this, ruleArgs);
                    this._addToken(origInput, this.input, rule, ruleArgs);
                    return ans;
                };
                this._superApplyWithArgs = function(recv, rule) {
                    for (var origInput = recv.input, ruleArgs = new Array(arguments.length - 2), i = 0; i < ruleArgs.length; ++i) ruleArgs[i] = arguments[i + 2];
                    this._addBranch(rule, ruleArgs);
                    var ans = this[rule].apply(recv, ruleArgs);
                    this._addToken(origInput, recv.input, rule, ruleArgs);
                    return ans;
                };
            },
            memoizeParameterizedRules: function() {
                this._prependInput = function(v) {
                    var newInput;
                    if (isImmutable(v)) {
                        if (!(newInput = this.input[getTag(v)])) {
                            newInput = new OMInputStream(v, this.input);
                            this.input[getTag(v)] = newInput;
                        }
                    } else newInput = new OMInputStream(v, this.input);
                    this.input = newInput;
                };
                this._applyWithArgs = function(rule) {
                    for (var origInput = this.input, ruleFn = this[rule], ruleFnArity = ruleFn.length, ruleArgs = new Array(Math.min(arguments.length - 1, ruleFnArity)), i = 0; i < ruleArgs.length; ++i) ruleArgs[i] = arguments[i + 1];
                    for (var idx = arguments.length - 1; idx > ruleFnArity; idx--) this._prependInput(arguments[idx]);
                    this._addBranch(rule, ruleArgs);
                    var ans = 0 === ruleFnArity ? ruleFn.call(this) : ruleFn.apply(this, ruleArgs);
                    this._addToken(origInput, this.input, rule, ruleArgs);
                    return ans;
                };
            },
            _pred: function(b) {
                if (b) return !0;
                throw fail();
            },
            _not: function(x) {
                var self = this, origInput = this.input;
                return lookup((function() {
                    x.call(self);
                }), throwFail, (function() {
                    self.input = origInput;
                    return !0;
                }));
            },
            _lookahead: function(x) {
                var origInput = this.input, r = x.call(this);
                this.input = origInput;
                return r;
            },
            _or: function() {
                for (var self = this, origInput = this.input, argIdx = -1, args = new Array(arguments.length), lookupFunc = function() {
                    self.input = origInput;
                    return args[argIdx].call(self);
                }, next = function() {
                    if (++argIdx >= args.length) throw fail();
                    return lookup(lookupFunc, identity, next);
                }, i = 0; i < args.length; ++i) args[i] = arguments[i];
                return next();
            },
            _xor: function(ruleName) {
                for (var self = this, origInput = this.input, idx = 1, newInput, ans, arg, lookupFunc = function() {
                    self.input = origInput;
                    ans = arg.call(self);
                    if (newInput) throw 'more than one choice matched by "exclusive-OR" in ' + ruleName;
                    newInput = self.input;
                }; idx < arguments.length; ) {
                    arg = arguments[idx];
                    lookup(lookupFunc);
                    idx++;
                }
                if (newInput) {
                    this.input = newInput;
                    return ans;
                }
                throw fail();
            },
            disableXORs: function() {
                this._xor = function() {
                    for (var self = this, origInput = this.input, ref = {}, result = ref, lookupFunc = function() {
                        self.input = origInput;
                        result = arg.call(self);
                    }, idx = 1; idx < arguments.length; idx++) {
                        var arg = arguments[idx];
                        lookup(lookupFunc);
                        if (result !== ref) return result;
                    }
                    throw fail();
                };
            },
            _opt: function(x) {
                var self = this, origInput = this.input, ans;
                lookup((function() {
                    ans = x.call(self);
                }), noop, (function() {
                    self.input = origInput;
                }));
                return ans;
            },
            _many: function(x, y) {
                for (var self = this, origInput, ans = void 0 !== y ? [ y ] : [], resetAndReturnFalse = function() {
                    self.input = origInput;
                    return !1;
                }, lookupFunc = function() {
                    origInput = self.input;
                    ans.push(x.call(self));
                }; lookup(lookupFunc, returnTrue, resetAndReturnFalse); ) ;
                return ans;
            },
            _many1: function(x) {
                return this._many(x, x.call(this));
            },
            _form: function(x) {
                var v = this.anything(), origInput = this.input;
                this._pred(isSequenceable(v));
                this.input = makeListOMInputStream(v, 0);
                x.call(this);
                this._apply("end");
                this.input = origInput;
                return v;
            },
            _consumedBy: function(x) {
                var origInput = this.input;
                x.call(this);
                return origInput.upTo(this.input);
            },
            _idxConsumedBy: function(x) {
                var origInput = this.input;
                x.call(this);
                return {
                    fromIdx: origInput.idx,
                    toIdx: this.input.idx
                };
            },
            _interleave: function() {
                for (var currInput = this.input, ans = [], idx, args = new Array(arguments.length), i = 0; i < args.length; ++i) args[i] = arguments[i];
                for (idx = 0; idx < args.length; idx += 2) ans[idx / 2] = "*" === args[idx] || "+" === args[idx] ? [] : void 0;
                for (;;) {
                    var allDone = !0;
                    idx = 0;
                    for (;idx < args.length; ) {
                        if ("0" !== args[idx]) try {
                            this.input = currInput;
                            switch (args[idx]) {
                              case "*":
                                ans[idx / 2].push(args[idx + 1].call(this));
                                break;

                              case "+":
                                ans[idx / 2].push(args[idx + 1].call(this));
                                args[idx] = "*";
                                break;

                              case "?":
                              case "1":
                                ans[idx / 2] = args[idx + 1].call(this);
                                args[idx] = "0";
                                break;

                              default:
                                throw "invalid mode '" + args[idx] + "' in OMeta._interleave";
                            }
                            currInput = this.input;
                            break;
                        } catch (f) {
                            if (!(f instanceof SyntaxError)) throw f;
                            allDone = allDone && ("*" === args[idx] || "?" === args[idx]);
                        }
                        idx += 2;
                    }
                    if (idx === args.length) {
                        if (allDone) return ans;
                        throw fail();
                    }
                }
            },
            _currIdx: function() {
                return this.input.idx;
            },
            anything: function() {
                var r = this.input.head();
                this.input = this.input.tail();
                return r;
            },
            lowerCaseAnything: function() {
                return this.anything().toLowerCase();
            },
            end: function() {
                return this._not(this.anything);
            },
            pos: function() {
                return this.input.idx;
            },
            empty: returnTrue,
            apply: function(r) {
                return this._apply(r);
            },
            foreign: function(grammar, ruleName) {
                var ans, grammarInstance = grammar._extend({
                    input: makeOMInputStreamProxy(this.input)
                });
                this._tokensEnabled() && grammarInstance._enableTokens();
                ans = grammarInstance._apply(ruleName);
                this.input = grammarInstance.input.target;
                return ans;
            },
            exactly: function(wanted) {
                this._pred(wanted === this.anything());
                return wanted;
            },
            true: function() {
                var r = this.anything();
                this._pred(!0 === r);
                return r;
            },
            false: function() {
                var r = this.anything();
                this._pred(!1 === r);
                return r;
            },
            undefined: function() {
                var r = this.anything();
                this._pred(void 0 === r);
                return r;
            },
            number: function() {
                var r = this.anything();
                this._pred("number" == typeof r);
                return r;
            },
            string: function() {
                var r = this.anything();
                this._pred("string" == typeof r);
                return r;
            },
            char: function() {
                var r = this.anything();
                this._pred("string" == typeof r && 1 === r.length);
                return r;
            },
            space: function() {
                var r = this._apply("char");
                this._pred(r.charCodeAt(0) <= 32);
                return r;
            },
            spaces: function() {
                return this._many((function() {
                    return this._apply("space");
                }));
            },
            digit: function() {
                var r = this._apply("char");
                this._pred(r >= "0" && r <= "9");
                return r;
            },
            lower: function() {
                var r = this._apply("char");
                this._pred(r >= "a" && r <= "z");
                return r;
            },
            upper: function() {
                var r = this._apply("char");
                this._pred(r >= "A" && r <= "Z");
                return r;
            },
            letter: function() {
                var r = this._apply("char");
                this._pred(r >= "a" && r <= "z" || r >= "A" && r <= "Z");
                return r;
            },
            letterOrDigit: function() {
                return this._or((function() {
                    return this._apply("letter");
                }), (function() {
                    return this._apply("digit");
                }));
            },
            firstAndRest: function(first, rest) {
                return this._many((function() {
                    return this._apply(rest);
                }), this._apply(first));
            },
            seq: function(xs) {
                for (var idx = 0; idx < xs.length; idx++) this._applyWithArgs("exactly", xs[idx]);
                return xs;
            },
            notLast: function(rule) {
                var r = this._apply(rule);
                this._lookahead((function() {
                    return this._apply(rule);
                }));
                return r;
            },
            listOf: function(rule, delim) {
                return this._or((function() {
                    var r = this._apply(rule);
                    return this._many((function() {
                        this._applyWithArgs("token", delim);
                        return this._apply(rule);
                    }), r);
                }), (function() {
                    return [];
                }));
            },
            token: function(cs) {
                this._apply("spaces");
                return this._applyWithArgs("seq", cs);
            },
            fromTo: function(x, y) {
                return this._consumedBy((function() {
                    this._applyWithArgs("seq", x);
                    this._many((function() {
                        this._not((function() {
                            this._applyWithArgs("seq", y);
                        }));
                        this._apply("char");
                    }));
                    this._applyWithArgs("seq", y);
                }));
            },
            hexDigit: function() {
                var v, c;
                c = this._apply("char");
                if (-1 === (v = "0123456789abcdef".indexOf(c.toLowerCase()))) throw this._fail();
                return v;
            },
            escapedChar: function() {
                var s, c;
                this._applyWithArgs("exactly", "\\");
                switch (c = this.anything()) {
                  case "'":
                    return "'";

                  case '"':
                    return '"';

                  case "\\":
                    return "\\";

                  case "b":
                    return "\b";

                  case "f":
                    return "\f";

                  case "n":
                    return "\n";

                  case "r":
                    return "\r";

                  case "t":
                    return "\t";

                  case "v":
                    return "\v";

                  case "u":
                    s = this._consumedBy((function() {
                        this._apply("hexDigit");
                        this._apply("hexDigit");
                        this._apply("hexDigit");
                        this._apply("hexDigit");
                    }));
                    return String.fromCharCode(parseInt(s, 16));

                  case "x":
                    s = this._consumedBy((function() {
                        this._apply("hexDigit");
                        this._apply("hexDigit");
                    }));
                    return String.fromCharCode(parseInt(s, 16));

                  default:
                    return c;
                }
            },
            initialize: noop,
            match: function(obj, rule, args, matchFailed) {
                return this.matchAll([ obj ], rule, args, matchFailed);
            },
            matchAll: function(listyObj, rule, args, matchFailed) {
                var m;
                return this.createInstance().matchAll(listyObj, rule, args, matchFailed);
            },
            createInstance: function() {
                var m = objectThatDelegatesTo(this);
                m.setInput = function(listyObj) {
                    return this.inputHead = this.input = makeListOMInputStream(listyObj, 0);
                };
                m.matchAll = function(listyObj, rule, args, matchFailed) {
                    null == args && (args = []);
                    for (var realArgs = [ rule ], idx = 0; idx < args.length; idx++) realArgs.push(args[idx]);
                    this.setInput(listyObj);
                    return lookup((function() {
                        return 1 === realArgs.length ? m._apply.call(m, realArgs[0]) : m._applyWithArgs.apply(m, realArgs);
                    }), (function(value) {
                        return value;
                    }), (function(err) {
                        err.OMeta = {};
                        var input = m.input;
                        if (void 0 !== input.idx) {
                            for (;void 0 !== input.tl && void 0 !== input.tl.idx; ) input = input.tl;
                            err.OMeta.idx = input.idx - 1;
                            if ("string" == typeof input.lst) {
                                var source = input.lst, i = 0, char, start;
                                err.OMeta.line = 1;
                                err.OMeta.col = 0;
                                for (;i < err.OMeta.idx; i++) {
                                    char = source.charAt(i);
                                    err.OMeta.col++;
                                    if ("\n" === char) {
                                        err.OMeta.line++;
                                        err.OMeta.col = 0;
                                    }
                                }
                            }
                        }
                        if ("function" == typeof matchFailed) return matchFailed(m, err);
                        throw err;
                    }));
                };
                m.match = function(obj, aRule, args, matchFailed) {
                    return this.matchAll([ obj ], aRule, args, matchFailed);
                };
                m.enableReusingMemoizations = function(sideEffectingRules) {
                    sideEffectingRules = sideEffectingRules || [];
                    this.setInput = function(listyObj) {
                        var input = this.inputHead;
                        if (input && "string" == typeof input.lst && "string" == typeof listyObj) {
                            for (var previousText = input.lst, divergencePoint = 0, l = Math.min(listyObj.length, previousText.length); divergencePoint < l && listyObj.charAt(divergencePoint) === previousText.charAt(divergencePoint); divergencePoint++) ;
                            divergencePoint--;
                            for (;/\s/.test(listyObj.charAt(divergencePoint)); ) divergencePoint--;
                            if (divergencePoint > 0) {
                                var cleanInput = function(divergencePoint) {
                                    var secondaryDivergencePoint = 0;
                                    do {
                                        for (var memo = input.memo, memoTokens = input.tokens, ruleNames = Object.keys(memo), i = 0; i < ruleNames.length; i++) {
                                            var ruleName = ruleNames[i];
                                            "boolean" == typeof memo[ruleName] || -1 !== sideEffectingRules.indexOf(ruleName) || memo[ruleName].nextInput.idx >= divergencePoint ? delete memo[ruleName] : input.idx > secondaryDivergencePoint && !OMeta.hasOwnProperty(ruleName) && (secondaryDivergencePoint = input.idx);
                                        }
                                        if (null != memoTokens) for (var duplicateTokens = {}, i = memoTokens.length - 1; i >= 0; i--) memoTokens[i][0] >= divergencePoint || duplicateTokens[memoTokens[i][1]] ? memoTokens.splice(i, 1) : duplicateTokens[memoTokens[i][1]] = !0;
                                        input.lst = listyObj;
                                    } while (input.idx < divergencePoint && (input = input.tail()));
                                    return secondaryDivergencePoint;
                                }, secondaryDivergencePoint = cleanInput(divergencePoint);
                                if (secondaryDivergencePoint > 0) {
                                    secondaryDivergencePoint < divergencePoint && cleanInput(secondaryDivergencePoint);
                                    delete input.tl;
                                    return this.input = this.inputHead;
                                }
                            }
                        }
                        return this.input = this.inputHead = makeListOMInputStream(listyObj, 0);
                    };
                };
                m.initialize();
                return m;
            }
        };
    }, void 0 !== (__WEBPACK_AMD_DEFINE_RESULT__ = function() {
        return root.OMeta = factory();
    }.call(exports, __webpack_require__, exports, module)) && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
}, function(module, exports, __webpack_require__) {
    "use strict";
    var toInteger = __webpack_require__(123), max = Math.max;
    module.exports = function(value) {
        return max(0, toInteger(value));
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = __webpack_require__(143)() ? __webpack_require__(28).Symbol : __webpack_require__(146);
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.migrator = exports.db = exports.cache = exports.DEBUG = void 0;
    exports.DEBUG = !0;
    exports.cache = {
        permissionsLookup: {
            max: 5e3
        },
        parsePermissions: {
            max: 1e5
        },
        parseOData: {
            max: 1e5
        },
        odataToAbstractSql: {
            max: 1e4
        },
        abstractSqlCompiler: {
            max: 1e4
        }
    };
    let timeoutMS;
    if (process.env.TRANSACTION_TIMEOUT_MS) {
        timeoutMS = parseInt(process.env.TRANSACTION_TIMEOUT_MS, 10);
        if (Number.isNaN(timeoutMS) || timeoutMS <= 0) throw new Error(`Invalid valid for TRANSACTION_TIMEOUT_MS: ${process.env.TRANSACTION_TIMEOUT_MS}`);
    } else timeoutMS = 1e4;
    exports.db = {
        poolSize: 50,
        idleTimeoutMillis: 3e4,
        statementTimeout: void 0,
        queryTimeout: void 0,
        connectionTimeoutMillis: 3e4,
        keepAlive: !0,
        rollbackTimeout: 3e4,
        timeoutMS: timeoutMS
    };
    exports.migrator = {
        lockTimeout: 3e5,
        lockFailDelay: 2e4
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    const BigInteger = __webpack_require__(85), Boolean = __webpack_require__(86), CaseInsensitiveText = __webpack_require__(87), Color = __webpack_require__(88), ConceptType = __webpack_require__(89), Date = __webpack_require__(90), DateTime = __webpack_require__(91), File = __webpack_require__(92), ForeignKey = __webpack_require__(93), Hashed = __webpack_require__(94), Integer = __webpack_require__(97), Interval = __webpack_require__(98), JSON = __webpack_require__(99), Real = __webpack_require__(100), Serial = __webpack_require__(101), SHA = __webpack_require__(102), ShortText = __webpack_require__(111), Text = __webpack_require__(112), Time = __webpack_require__(113);
    module.exports = {
        "Big Integer": BigInteger,
        Boolean: Boolean,
        "Case Insensitive Text": CaseInsensitiveText,
        Color: Color,
        ConceptType: ConceptType,
        "Date Time": DateTime,
        Date: Date,
        File: File,
        ForeignKey: ForeignKey,
        Hashed: Hashed,
        Integer: Integer,
        Interval: Interval,
        JSON: JSON,
        Real: Real,
        Serial: Serial,
        SHA: SHA,
        "Short Text": ShortText,
        Text: Text,
        Time: Time
    };
}, function(module, exports, __webpack_require__) {
    try {
        var util = __webpack_require__(105);
        if ("function" != typeof util.inherits) throw "";
        module.exports = util.inherits;
    } catch (e) {
        module.exports = __webpack_require__(106);
    }
}, function(module, exports, __webpack_require__) {
    var Buffer = __webpack_require__(8).Buffer;
    function Hash(blockSize, finalSize) {
        this._block = Buffer.alloc(blockSize);
        this._finalSize = finalSize;
        this._blockSize = blockSize;
        this._len = 0;
    }
    Hash.prototype.update = function(data, enc) {
        if ("string" == typeof data) {
            enc = enc || "utf8";
            data = Buffer.from(data, enc);
        }
        for (var block = this._block, blockSize = this._blockSize, length = data.length, accum = this._len, offset = 0; offset < length; ) {
            for (var assigned = accum % blockSize, remainder = Math.min(length - offset, blockSize - assigned), i = 0; i < remainder; i++) block[assigned + i] = data[offset + i];
            offset += remainder;
            (accum += remainder) % blockSize == 0 && this._update(block);
        }
        this._len += length;
        return this;
    };
    Hash.prototype.digest = function(enc) {
        var rem = this._len % this._blockSize;
        this._block[rem] = 128;
        this._block.fill(0, rem + 1);
        if (rem >= this._finalSize) {
            this._update(this._block);
            this._block.fill(0);
        }
        var bits = 8 * this._len;
        if (bits <= 4294967295) this._block.writeUInt32BE(bits, this._blockSize - 4); else {
            var lowBits = (4294967295 & bits) >>> 0, highBits = (bits - lowBits) / 4294967296;
            this._block.writeUInt32BE(highBits, this._blockSize - 8);
            this._block.writeUInt32BE(lowBits, this._blockSize - 4);
        }
        this._update(this._block);
        var hash = this._hash();
        return enc ? hash.toString(enc) : hash;
    };
    Hash.prototype._update = function() {
        throw new Error("_update must be implemented by subclass");
    };
    module.exports = Hash;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.OData2AbstractSQL = exports.isBindReference = exports.rewriteBinds = exports.odataNameToSqlName = exports.sqlNameToODataName = void 0;
    const _ = __webpack_require__(0), memoize = __webpack_require__(17), randomstring = __webpack_require__(61), convertToModernDefinition = definition => "abstractSql" in definition ? definition : {
        binds: definition.extraBinds,
        abstractSql: definition.abstractSqlQuery
    }, comparison = {
        eq: "IsNotDistinctFrom",
        ne: "IsDistinctFrom",
        gt: "GreaterThan",
        ge: "GreaterThanOrEqual",
        lt: "LessThan",
        le: "LessThanOrEqual"
    }, operations = {
        add: "Add",
        sub: "Subtract",
        mul: "Multiply",
        div: "Divide"
    }, rewriteComputed = (computed, tableName, tableAlias) => {
        const rewrittenComputed = _.cloneDeep(computed);
        modifyAbstractSql("ReferencedField", rewrittenComputed, (referencedField => {
            referencedField[1] === tableName && (referencedField[1] = tableAlias);
        }));
        return rewrittenComputed;
    }, containsQueryOption = opts => {
        if (null == opts) return !1;
        for (const key in opts) if ("$" === key[0]) return !0;
        return !1;
    };
    class Query {
        constructor() {
            this.select = [];
            this.from = [];
            this.where = [];
            this.extras = [];
        }
        merge(otherQuery) {
            this.select = this.select.concat(otherQuery.select);
            this.from = this.from.concat(otherQuery.from);
            this.where = this.where.concat(otherQuery.where);
            this.extras = this.extras.concat(otherQuery.extras);
        }
        fromResource(odataToAbstractSql, resource, args = odataToAbstractSql, bypassDefinition) {
            if (!0 !== bypassDefinition && resource.definition) {
                const definition = odataToAbstractSql.rewriteDefinition(resource.definition, args.extraBindVars, args.bindVarsLength);
                this.from.push([ "Alias", definition.abstractSql, resource.tableAlias ]);
            } else resource.name !== resource.tableAlias ? this.from.push([ "Alias", [ "Table", resource.name ], resource.tableAlias ]) : this.from.push([ "Table", resource.name ]);
        }
        compile(queryType) {
            const compiled = [];
            let where = this.where;
            "SelectQuery" === queryType && compiled.push([ "Select", this.select ]);
            this.from.forEach((tableName => {
                compiled.push([ "From", tableName ]);
            }));
            if (where.length > 0) {
                where.length > 1 && (where = [ [ "And", ...where ] ]);
                compiled.push([ "Where", ...where ]);
            }
            return [ queryType, ...compiled, ...this.extras ];
        }
    }
    exports.sqlNameToODataName = memoize((sqlName => sqlName.replace(/-/g, "__").replace(/ /g, "_")), {
        primitive: !0
    });
    exports.odataNameToSqlName = memoize((odataName => odataName.replace(/__/g, "-").replace(/_/g, " ")), {
        primitive: !0
    });
    const modifyAbstractSql = (match, abstractSql, fn) => {
        Array.isArray(abstractSql) && (abstractSql[0] === match ? fn(abstractSql) : abstractSql.forEach((abstractSqlComponent => {
            modifyAbstractSql(match, abstractSqlComponent, fn);
        })));
    }, rewriteBinds = (definition, existingBinds, inc = 0) => {
        const {binds: binds} = definition;
        if (null != binds && 0 !== binds.length) {
            inc += existingBinds.length;
            modifyAbstractSql("Bind", definition.abstractSql, (bind => {
                "number" == typeof bind[1] && (bind[1] += inc);
            }));
            existingBinds.push(...binds);
        }
    };
    exports.rewriteBinds = rewriteBinds;
    const isBindReference = maybeBind => null != maybeBind && "bind" in maybeBind && ("string" == typeof maybeBind.bind || "number" == typeof maybeBind.bind);
    exports.isBindReference = isBindReference;
    const addBodyKey = (resourceName, fieldName, bind, bodyKeys, extraBodyVars) => {
        const qualifiedIDField = resourceName + "." + fieldName;
        if (!bodyKeys.includes(qualifiedIDField) && !bodyKeys.includes(fieldName)) {
            bodyKeys.push(qualifiedIDField);
            extraBodyVars[qualifiedIDField] = bind;
        }
    };
    class OData2AbstractSQL {
        constructor(clientModel, methods = {}) {
            this.clientModel = clientModel;
            this.methods = methods;
            this.extraBodyVars = {};
            this.extraBindVars = [];
            this.resourceAliases = {};
            this.bindVarsLength = 0;
            const MAX_ALIAS_LENGTH = 63, RANDOM_ALIAS_LENGTH = 12, shortAliases = generateShortAliases(clientModel);
            this.checkAlias = memoize((alias => {
                let aliasLength = alias.length;
                if (aliasLength <= 63) return alias;
                alias = _(alias).split(".").map((part => {
                    if (aliasLength <= 63) return part;
                    aliasLength -= part.length;
                    const shortAlias = _(part).split("-").map((part2 => {
                        part2 = _(part2).split(" ").map((part3 => {
                            const shortPart2 = shortAliases[part3];
                            return shortPart2 || part3;
                        })).join(" ");
                        const shortPart = shortAliases[part2];
                        return shortPart || part2;
                    })).join("-");
                    aliasLength += shortAlias.length;
                    return shortAlias;
                })).join(".");
                if (aliasLength <= 63) return alias;
                const randStr = randomstring.generate(12) + "$";
                return randStr + alias.slice(randStr.length + alias.length - 63);
            }));
        }
        match(path, method, bodyKeys, bindVarsLength, methods) {
            const savedMethods = this.methods;
            try {
                null != methods && (this.methods = methods);
                this.reset();
                this.bindVarsLength = bindVarsLength;
                let tree;
                if (_.isEmpty(path)) tree = [ "$serviceroot" ]; else if ([ "$metadata", "$serviceroot" ].includes(path.resource)) tree = [ path.resource ]; else {
                    const query = this.PathSegment(method, bodyKeys, path);
                    switch (method) {
                      case "PUT":
                        this.putReset();
                        const insertQuery = undefined;
                        tree = [ "UpsertQuery", this.PathSegment("PUT-INSERT", bodyKeys, path).compile("InsertQuery"), query.compile("UpdateQuery") ];
                        break;

                      case "GET":
                        tree = query.compile("SelectQuery");
                        break;

                      case "PATCH":
                      case "MERGE":
                        tree = query.compile("UpdateQuery");
                        break;

                      case "POST":
                        tree = query.compile("InsertQuery");
                        break;

                      case "DELETE":
                        tree = query.compile("DeleteQuery");
                        break;

                      default:
                        throw new SyntaxError(`Unknown method "${method}"`);
                    }
                }
                return {
                    tree: tree,
                    extraBodyVars: this.extraBodyVars,
                    extraBindVars: this.extraBindVars
                };
            } finally {
                this.methods = savedMethods;
            }
        }
        PathSegment(method, bodyKeys, path) {
            var _a;
            if (!path.resource) throw new SyntaxError("Path segment must contain a resource");
            const hasQueryOpts = containsQueryOption(path.options), resource = this.Resource(path.resource, this.defaultResource);
            this.defaultResource = resource;
            const query = new Query, bypassDefinition = "GET" !== method;
            query.fromResource(this, resource, this, bypassDefinition);
            const referencedIdField = [ "ReferencedField", resource.tableAlias, resource.idField ], pathKeyWhere = this.PathKey(method, path, resource, bodyKeys);
            let addPathKey = !0, bindVars;
            hasQueryOpts && (null === (_a = path.options) || void 0 === _a ? void 0 : _a.$expand) && this.Expands(resource, query, path.options.$expand.properties);
            if (path.property) {
                const childQuery = this.PathSegment(method, bodyKeys, path.property);
                query.merge(childQuery);
                if (!path.property.resource) throw new SyntaxError("PathSegment has a property without a resource?");
                const navigation = this.NavigateResources(resource, path.property.resource);
                query.where.push(navigation.where);
            } else if (path.link) {
                if (!path.link.resource) throw new SyntaxError("PathSegment has a link without a resource?");
                const linkResource = this.Resource(path.link.resource, resource);
                let aliasedField, referencedField;
                if (this.FieldContainedIn(linkResource.resourceName, resource)) {
                    referencedField = this.ReferencedField(resource, linkResource.resourceName);
                    aliasedField = [ "Alias", referencedField, linkResource.resourceName ];
                } else {
                    if (!this.FieldContainedIn(resource.resourceName, linkResource)) throw new Error("Cannot navigate links");
                    referencedField = this.ReferencedField(linkResource, resource.resourceName);
                    aliasedField = [ "Alias", referencedField, resource.resourceName ];
                }
                if (null != path.link.key) {
                    if (!exports.isBindReference(path.link.key)) throw new SyntaxError("Cannot use named keys with $links");
                    query.where.push([ comparison.eq, referencedField, this.Bind(path.link.key) ]);
                }
                query.select.push(aliasedField);
            } else if ("PUT" === method || "PUT-INSERT" === method || "POST" === method || "PATCH" === method || "MERGE" === method) {
                const resourceMapping = this.ResourceMapping(resource);
                bindVars = this.BindVars(method, bodyKeys, resource.resourceName, Object.entries(resourceMapping));
                query.extras.push([ "Fields", bindVars.map((b => b[0])) ]);
                if (!hasQueryOpts && !resource.definition && null == pathKeyWhere || "POST" !== method && "PUT-INSERT" !== method) query.extras.push([ "Values", bindVars.map((b => b[1])) ]); else {
                    const subQuery = new Query;
                    subQuery.select = bindVars.map((bindVar => [ "ReferencedField", resource.tableAlias, bindVar[0] ]));
                    const bindVarSelectQuery = [ "SelectQuery", [ "Select", resource.fields.map((field => {
                        const alias = field.fieldName, bindVar = null == bindVars ? void 0 : bindVars.find((v => v[0] === alias)), value = undefined;
                        return [ "Alias", [ "Cast", bindVar ? bindVar[1] : "Null", field.dataType ], alias ];
                    })) ] ], unionResource = {
                        ...resource
                    };
                    if (null != unionResource.definition && _.isObject(unionResource.definition)) {
                        unionResource.definition = {
                            ...convertToModernDefinition(unionResource.definition)
                        };
                        if ("SelectQuery" !== unionResource.definition.abstractSql[0]) throw new Error("Only select query definitions supported for inserts");
                        const isTable = part => "Table" === part[0] && part[1] === unionResource.name;
                        if (isTable(unionResource.definition.abstractSql)) unionResource.definition.abstractSql = bindVarSelectQuery; else {
                            let found = !1;
                            unionResource.definition.abstractSql = unionResource.definition.abstractSql.map((part => {
                                if ("From" === part[0]) {
                                    if (isTable(part[1])) {
                                        found = !0;
                                        return [ "From", [ "Alias", bindVarSelectQuery, unionResource.name ] ];
                                    }
                                    if ("Alias" === part[1][0] && isTable(part[1][1])) {
                                        found = !0;
                                        return [ "From", [ "Alias", bindVarSelectQuery, part[1][2] ] ];
                                    }
                                }
                                return part;
                            }));
                            if (!found) throw new Error("Could not replace table entry in definition for insert");
                        }
                    } else unionResource.definition = {
                        binds: [],
                        abstractSql: bindVarSelectQuery
                    };
                    hasQueryOpts && this.AddQueryOptions(resource, path, subQuery);
                    subQuery.fromResource(this, unionResource);
                    addPathKey = !1;
                    null != pathKeyWhere && subQuery.where.push(pathKeyWhere);
                    query.extras.push([ "Values", subQuery.compile("SelectQuery") ]);
                }
            } else path.count ? this.AddCountField(path, query) : this.AddSelectFields(path, query, resource);
            addPathKey && null != pathKeyWhere && query.where.push(pathKeyWhere);
            if (!hasQueryOpts && !resource.definition || "PUT" !== method && "PATCH" !== method && "MERGE" !== method && "DELETE" !== method) hasQueryOpts && "GET" === method && this.AddQueryOptions(resource, path, query); else {
                const subQuery = new Query;
                subQuery.select.push(referencedIdField);
                subQuery.fromResource(this, resource);
                hasQueryOpts && this.AddQueryOptions(resource, path, subQuery);
                query.where.push([ "In", referencedIdField, subQuery.compile("SelectQuery") ]);
            }
            return query;
        }
        PathKey(method, path, resource, bodyKeys) {
            const {key: key} = path;
            if (null != key) {
                if ("PUT" === method || "PUT-INSERT" === method || "POST" === method) if (exports.isBindReference(key)) addBodyKey(resource.resourceName, resource.idField, key, bodyKeys, this.extraBodyVars); else for (const [fieldName, bind] of Object.entries(key)) addBodyKey(resource.resourceName, fieldName, bind, bodyKeys, this.extraBodyVars);
                if (exports.isBindReference(key)) {
                    const bind = this.Bind(key), referencedField = [ "ReferencedField", resource.tableAlias, resource.idField ];
                    return [ comparison.eq, referencedField, bind ];
                }
                const fieldNames = Object.keys(key), sqlFieldNames = fieldNames.map(exports.odataNameToSqlName).sort(), fields = sqlFieldNames.map((fieldName => {
                    const resourceField = resource.fields.find((f => f.fieldName === fieldName));
                    if (null == resourceField) throw new SyntaxError("Specified non-existent field for path key");
                    return resourceField;
                }));
                if ((1 !== fields.length || "UNIQUE" !== fields[0].index && "PRIMARY KEY" !== fields[0].index) && !resource.indexes.some((index => ("UNIQUE" === index.type || "PRIMARY KEY" === index.type) && sqlFieldNames.length === index.fields.length && _.isEqual(index.fields.slice().sort(), sqlFieldNames)))) throw new SyntaxError("Specified fields for path key that are not directly unique");
                const namedKeys = fieldNames.map((fieldName => {
                    const bind = this.Bind(key[fieldName]), referencedField = this.ReferencedField(resource, fieldName);
                    return [ comparison.eq, referencedField, bind ];
                }));
                return 1 === namedKeys.length ? namedKeys[0] : [ "And", ...namedKeys ];
            }
        }
        Bind(bind, optional = !1) {
            if (exports.isBindReference(bind)) return [ "Bind", bind.bind ];
            if (!optional) throw new SyntaxError("Could not match bind reference");
        }
        SelectFilter(filter, query, resource) {
            this.AddExtraFroms(query, resource, filter);
            const where = this.BooleanMatch(filter);
            query.where.push(where);
        }
        OrderBy(orderby, query, resource) {
            this.AddExtraFroms(query, resource, orderby.properties);
            query.extras.push([ "OrderBy", ...this.OrderByProperties(orderby.properties) ]);
        }
        OrderByProperties(orderings) {
            return orderings.map((ordering => {
                const field = this.ReferencedProperty(ordering);
                return [ ordering.order.toUpperCase(), field ];
            }));
        }
        BindVars(method, bodyKeys, resourceName, match) {
            const fields = match.map((field => {
                const [fieldName, [, mappedFieldName]] = field;
                return bodyKeys.includes(fieldName) || bodyKeys.includes(resourceName + "." + fieldName) ? [ mappedFieldName, [ "Bind", resourceName, fieldName ] ] : "PUT" === method ? [ mappedFieldName, "Default" ] : void 0;
            }));
            return _.compact(fields);
        }
        Resource(resourceName, parentResource) {
            const resourceAlias = this.resourceAliases[resourceName];
            if (resourceAlias) return resourceAlias;
            let resource, tableAlias;
            if (parentResource) {
                const relationshipMapping = this.ResolveRelationship(parentResource, resourceName);
                resource = this.clientModel.tables[relationshipMapping[1][0]];
            } else {
                let sqlName = exports.odataNameToSqlName(resourceName);
                sqlName = this.Synonym(sqlName);
                resource = this.clientModel.tables[sqlName];
            }
            if (!resource) throw new SyntaxError("Could not match resource");
            if (parentResource) {
                let resourceAlias2;
                if (resourceName.includes("__") && !resource.name.includes("-")) {
                    const verb = undefined;
                    resourceAlias2 = exports.odataNameToSqlName(resourceName).split("-")[0] + "-" + resource.name;
                } else resourceAlias2 = resource.name;
                tableAlias = parentResource.tableAlias + "." + resourceAlias2;
            } else tableAlias = resource.name;
            return {
                ...resource,
                tableAlias: this.checkAlias(tableAlias)
            };
        }
        FieldContainedIn(fieldName, resource) {
            try {
                this.ResolveRelationship(resource, fieldName);
                return !0;
            } catch (e) {
                if (e instanceof SyntaxError) return !1;
                throw e;
            }
        }
        ResourceMapping(resource) {
            const tableAlias = resource.tableAlias ? resource.tableAlias : resource.name, resourceMappings = {};
            for (const {fieldName: fieldName} of resource.fields) resourceMappings[exports.sqlNameToODataName(fieldName)] = [ tableAlias, fieldName ];
            return resourceMappings;
        }
        ResolveRelationship(resource, relationship) {
            let resourceName;
            resourceName = "object" == typeof resource ? resource.resourceName : this.resourceAliases[resource] ? this.resourceAliases[resource].resourceName : resource;
            resourceName = this.Synonym(resourceName);
            const resourceRelations = this.clientModel.relationships[resourceName];
            if (!resourceRelations) throw new SyntaxError(`Could not resolve relationship for '${resourceName}'`);
            const relationshipPath = _(relationship).split("__").map(exports.odataNameToSqlName).flatMap((sqlName => this.Synonym(sqlName).split("-"))).value(), relationshipMapping = _.get(resourceRelations, relationshipPath);
            if (!relationshipMapping || !relationshipMapping.$) throw new SyntaxError(`Could not resolve relationship mapping from '${resourceName}' to '${relationshipPath}'`);
            return relationshipMapping.$;
        }
        AddCountField(path, query) {
            path.count && query.select.push([ "Alias", [ "Count", "*" ], "$count" ]);
        }
        AddSelectFields(path, query, resource) {
            let odataFieldNames;
            if (path.options && path.options.$select && path.options.$select.properties) {
                this.AddExtraFroms(query, resource, path.options.$select.properties);
                odataFieldNames = path.options.$select.properties.map((prop => {
                    const field = this.Property(prop), sqlName = exports.odataNameToSqlName(field.name), resourceField = field.resource.fields.find((({fieldName: fieldName}) => fieldName === sqlName));
                    return [ field.resource, field.name, null == resourceField ? void 0 : resourceField.computed ];
                }));
            } else odataFieldNames = resource.fields.map((field => [ resource, exports.sqlNameToODataName(field.fieldName), field.computed ]));
            const fields = _.differenceWith(odataFieldNames, query.select, ((a, b) => a[1] === _.last(b))).map((args => this.AliasSelectField(...args)));
            query.select = query.select.concat(fields);
        }
        AliasSelectField(resource, fieldName, computed, alias = fieldName) {
            if (computed) {
                null != resource.tableAlias && resource.tableAlias !== resource.name && (computed = rewriteComputed(computed, resource.name, resource.tableAlias));
                return [ "Alias", computed, alias ];
            }
            const referencedField = this.ReferencedField(resource, fieldName);
            return referencedField[2] === alias ? referencedField : [ "Alias", referencedField, alias ];
        }
        ReferencedField(resource, resourceField) {
            const mapping = this.ResourceMapping(resource);
            if (mapping[resourceField]) return [ "ReferencedField", mapping[resourceField][0], mapping[resourceField][1] ];
            {
                const relationshipMapping = this.ResolveRelationship(resource, resourceField), tableAlias = resource.tableAlias ? resource.tableAlias : resource.name;
                if (relationshipMapping.length > 1 && relationshipMapping[0] === resource.idField) throw new SyntaxError('Attempted to directly fetch a virtual field: "' + resourceField + '"');
                return [ "ReferencedField", tableAlias, relationshipMapping[0] ];
            }
        }
        BooleanMatch(match, optional = !1) {
            switch (match) {
              case !0:
              case !1:
                return [ "Boolean", match ];

              default:
                if (Array.isArray(match)) {
                    const [type, ...rest] = match;
                    switch (type) {
                      case "eq":
                      case "ne":
                      case "gt":
                      case "ge":
                      case "lt":
                      case "le":
                        const op1 = this.Operand(rest[0]), op2 = this.Operand(rest[1]);
                        return [ comparison[type], op1, op2 ];

                      case "and":
                      case "or":
                        return [ _.capitalize(type), ...rest.map((v => this.BooleanMatch(v))) ];

                      case "not":
                        const bool = undefined;
                        return [ "Not", this.BooleanMatch(rest[0]) ];

                      case "in":
                        return [ "In", this.Operand(rest[0]), ...rest[1].map((v => this.Operand(v))) ];

                      case "call":
                        const {method: method} = match[1];
                        switch (method) {
                          case "contains":
                          case "endswith":
                          case "startswith":
                          case "isof":
                          case "substringof":
                            return this.FunctionMatch(method, match);

                          default:
                            if (optional) return;
                            throw new SyntaxError(`${method} is not a boolean function`);
                        }

                      default:
                        if (optional) return;
                        throw new SyntaxError(`Boolean does not support ${type}`);
                    }
                } else try {
                    return this.ReferencedProperty(match);
                } catch (e) {
                    if (optional) return;
                    throw e;
                }
            }
        }
        AliasedFunction(odataName, sqlName, match) {
            const fn = undefined;
            return [ sqlName, ...this.FunctionMatch(odataName, match).slice(1) ];
        }
        FunctionMatch(name, match) {
            if (!Array.isArray(match) || "call" !== match[0]) throw new SyntaxError("Not a function call");
            const properties = match[1];
            if (properties.method !== name) throw new SyntaxError("Unexpected function name");
            const args = properties.args.map((v => this.Operand(v)));
            return [ _.capitalize(name), ...args ];
        }
        Operand(match) {
            for (const matcher of [ this.Bind, this.NullMatch, this.BooleanMatch, this.NumberMatch, this.TextMatch, this.DateMatch, this.DurationMatch, this.Math ]) {
                const result = matcher.call(this, match, !0);
                if (result) return result;
            }
            throw new SyntaxError("Could not match operand");
        }
        Math(match) {
            const [type, ...rest] = match;
            switch (type) {
              case "add":
              case "sub":
              case "mul":
              case "div":
                return [ operations[type], this.Operand(rest[0]), this.Operand(rest[1]) ];

              default:
                return;
            }
        }
        Lambda(resourceName, lambda) {
            const resourceAliases = this.resourceAliases, defaultResource = this.defaultResource;
            try {
                const query = new Query, resource = this.AddNavigation(query, this.defaultResource, resourceName);
                this.resourceAliases = {
                    ...this.resourceAliases
                };
                this.resourceAliases[lambda.identifier] = resource;
                this.defaultResource = resource;
                this.AddExtraFroms(query, resource, lambda.expression);
                const filter = this.BooleanMatch(lambda.expression);
                if ("any" === lambda.method) {
                    query.where.push(filter);
                    return [ "Exists", query.compile("SelectQuery") ];
                }
                if ("all" === lambda.method) {
                    query.where.push([ "Not", filter ]);
                    return [ "Not", [ "Exists", query.compile("SelectQuery") ] ];
                }
                throw new SyntaxError(`Lambda method does not support ${lambda.method}`);
            } finally {
                this.resourceAliases = resourceAliases;
                this.defaultResource = defaultResource;
            }
        }
        ReferencedProperty(match) {
            const prop = this.Property(match);
            return Array.isArray(prop) ? prop : this.ReferencedField(prop.resource, prop.name);
        }
        Method(prop) {
            if (!prop.method) throw new SyntaxError("Method is missing method entry");
            if ("call" !== prop.method[0]) throw new SyntaxError(`Invalid value for method invocation: ${prop.method[0]}`);
            if ("object" != typeof prop.method[1]) throw new SyntaxError(`Invalid value for method invocation: ${prop.method[1]} should be an object`);
            const {method: method} = prop.method[1];
            if (!this.methods.hasOwnProperty(method)) throw new SyntaxError(`Method ${method} is unknown`);
            return this.methods[method].call(this, prop);
        }
        Property(prop) {
            if (!prop.name) throw new SyntaxError("Property is missing name");
            if (!prop.property) {
                if (prop.method) return this.Method(prop);
                if (prop.lambda) return this.Lambda(prop.name, prop.lambda);
                if (prop.count) {
                    const query = new Query;
                    query.select.push([ "Count", "*" ]);
                    this.AddNavigation(query, this.defaultResource, prop.name);
                    return query.compile("SelectQuery");
                }
                return {
                    resource: this.defaultResource,
                    name: prop.name
                };
            }
            {
                const defaultResource = this.defaultResource;
                let propResource;
                try {
                    propResource = this.Resource(prop.name, this.defaultResource);
                } catch (_a) {}
                if (!propResource) return this.Property(prop.property);
                try {
                    this.defaultResource = propResource;
                    return this.Property(prop.property);
                } finally {
                    this.defaultResource = defaultResource;
                }
            }
        }
        NumberMatch(match, optional = !1) {
            if ("number" == typeof match) return [ "Number", match ];
            if (!Array.isArray(match) || "call" !== match[0]) {
                if (optional) return;
                throw new SyntaxError("Failed to match a Number entry");
            }
            {
                const {method: method} = match[1];
                switch (method) {
                  case "indexof":
                  case "year":
                  case "month":
                  case "day":
                  case "day":
                  case "hour":
                  case "minute":
                  case "second":
                  case "fractionalseconds":
                  case "totaloffsetminutes":
                  case "totalseconds":
                  case "round":
                  case "floor":
                  case "ceiling":
                    return this.FunctionMatch(method, match);

                  case "length":
                    return this.AliasedFunction("length", "CharacterLength", match);

                  default:
                    if (optional) return;
                    throw new SyntaxError(`${method} is not a number function`);
                }
            }
        }
        NullMatch(match, _optional) {
            if (null === match) return [ "Null" ];
        }
        TextMatch(match, optional = !1) {
            if ("string" == typeof match) return [ "Text", match ];
            if (!Array.isArray(match) || "call" !== match[0]) {
                if (optional) return;
                throw new SyntaxError("Failed to match a Text entry");
            }
            {
                const {method: method} = match[1];
                switch (method) {
                  case "tolower":
                  case "toupper":
                  case "trim":
                  case "concat":
                  case "replace":
                    return this.FunctionMatch(method, match);

                  case "date":
                    return this.AliasedFunction("date", "ToDate", match);

                  case "time":
                    return this.AliasedFunction("time", "ToTime", match);

                  case "substring":
                    const fn = this.FunctionMatch(method, match);
                    fn[2] = [ "Add", fn[2], [ "Number", 1 ] ];
                    return fn;

                  default:
                    if (optional) return;
                    throw new SyntaxError(`${method} is not a number function`);
                }
            }
        }
        DateMatch(match, optional = !1) {
            if (_.isDate(match)) return [ "Date", match ];
            if (!Array.isArray(match) || "call" !== match[0]) {
                if (optional) return;
                throw new SyntaxError("Failed to match a Date entry");
            }
            {
                const {method: method} = match[1];
                switch (method) {
                  case "now":
                  case "maxdatetime":
                  case "mindatetime":
                    return this.FunctionMatch(method, match);

                  default:
                    if (optional) return;
                    throw new SyntaxError(`${method} is not a date function`);
                }
            }
        }
        DurationMatch(match) {
            if (!_.isObject(match)) return;
            const duration = _(match).pick("negative", "day", "hour", "minute", "second").omitBy(_.isNil).value();
            return _(duration).omit("negative").isEmpty() ? void 0 : [ "Duration", duration ];
        }
        Expands(resource, query, expands) {
            const defaultResource = this.defaultResource;
            for (const expand of expands) {
                const navigation = this.NavigateResources(resource, expand.name), expandResource = navigation.resource;
                this.defaultResource = expandResource;
                const nestedExpandQuery = new Query;
                expand.property && this.Expands(expandResource, nestedExpandQuery, [ expand.property ]);
                expand.options && expand.options.$expand && this.Expands(expandResource, nestedExpandQuery, expand.options.$expand.properties);
                nestedExpandQuery.fromResource(this, expandResource);
                expand.count ? this.AddCountField(expand, nestedExpandQuery) : this.AddSelectFields(expand, nestedExpandQuery, expandResource);
                this.AddQueryOptions(expandResource, expand, nestedExpandQuery);
                this.defaultResource = defaultResource;
                nestedExpandQuery.where.push(navigation.where);
                const expandQuery = new Query;
                expandQuery.select.push([ "Alias", [ "AggregateJSON", [ expandResource.tableAlias, "*" ] ], expand.name ]);
                expandQuery.from.push([ "Alias", nestedExpandQuery.compile("SelectQuery"), expandResource.tableAlias ]);
                query.select.push([ "Alias", expandQuery.compile("SelectQuery"), expand.name ]);
            }
        }
        AddQueryOptions(resource, path, query) {
            if (path.options) {
                path.options.$filter && this.SelectFilter(path.options.$filter, query, resource);
                if (!path.count) {
                    path.options.$orderby && this.OrderBy(path.options.$orderby, query, resource);
                    if (path.options.$top) {
                        const limit = this.NumberMatch(path.options.$top);
                        query.extras.push([ "Limit", limit ]);
                    }
                    if (path.options.$skip) {
                        const offset = this.NumberMatch(path.options.$skip);
                        query.extras.push([ "Offset", offset ]);
                    }
                }
            }
        }
        NavigateResources(resource, navigation) {
            const relationshipMapping = this.ResolveRelationship(resource, navigation), linkedResource = this.Resource(navigation, resource), tableAlias = resource.tableAlias ? resource.tableAlias : resource.name, linkedTableAlias = linkedResource.tableAlias ? linkedResource.tableAlias : linkedResource.name;
            return {
                resource: linkedResource,
                where: [ "Equals", [ "ReferencedField", tableAlias, relationshipMapping[0] ], [ "ReferencedField", linkedTableAlias, relationshipMapping[1][1] ] ]
            };
        }
        AddExtraFroms(query, parentResource, match) {
            try {
                if (Array.isArray(match)) match.forEach((v => this.AddExtraFroms(query, parentResource, v))); else {
                    let nextProp = match, prop;
                    for (;(prop = nextProp) && prop.name && prop.property && prop.property.name; ) {
                        nextProp = prop.property;
                        const resourceAlias = this.resourceAliases[prop.name];
                        parentResource = resourceAlias || this.AddNavigation(query, parentResource, prop.name);
                    }
                    nextProp && nextProp.args && this.AddExtraFroms(query, parentResource, prop.args);
                }
            } catch (_a) {}
        }
        AddNavigation(query, resource, extraResource) {
            const navigation = this.NavigateResources(resource, extraResource);
            if (query.from.some((from => "Table" === from[0] && from[1] === navigation.resource.tableAlias || "Alias" === from[0] && from[2] === navigation.resource.tableAlias))) throw new SyntaxError(`Could not navigate resources '${resource.name}' and '${extraResource}'`);
            query.fromResource(this, navigation.resource);
            query.where.push(navigation.where);
            return navigation.resource;
        }
        reset() {
            this.putReset();
            this.extraBodyVars = {};
            this.extraBindVars = [];
        }
        putReset() {
            this.resourceAliases = {};
            this.defaultResource = void 0;
        }
        Synonym(sqlName) {
            return _(sqlName).split("-").map((namePart => {
                const synonym = this.clientModel.synonyms[namePart];
                return synonym || namePart;
            })).join("-");
        }
        rewriteDefinition(definition, extraBindVars, bindVarsLength) {
            const rewrittenDefinition = _.cloneDeep(convertToModernDefinition(definition));
            exports.rewriteBinds(rewrittenDefinition, extraBindVars, bindVarsLength);
            modifyAbstractSql("Resource", rewrittenDefinition.abstractSql, (resource => {
                const resourceName = resource[1], referencedResource = this.clientModel.tables[resourceName];
                if (!referencedResource) throw new Error(`Could not resolve resource ${resourceName}`);
                if (referencedResource.definition) {
                    const subDefinition = this.rewriteDefinition(referencedResource.definition, extraBindVars, bindVarsLength);
                    resource.splice(0, resource.length, ...subDefinition.abstractSql);
                } else if (referencedResource.fields.some((field => null != field.computed))) {
                    const computedFieldQuery = new Query;
                    computedFieldQuery.select = referencedResource.fields.map((field => this.AliasSelectField(referencedResource, exports.sqlNameToODataName(field.fieldName), field.computed, field.fieldName)));
                    computedFieldQuery.fromResource(this, {
                        ...referencedResource,
                        tableAlias: referencedResource.name
                    });
                    resource.splice(0, resource.length, ...computedFieldQuery.compile("SelectQuery"));
                } else resource.splice(0, resource.length, "Table", referencedResource.name);
            }));
            return rewrittenDefinition;
        }
    }
    exports.OData2AbstractSQL = OData2AbstractSQL;
    const addAliases = (shortAliases, origAliasParts) => {
        const trie = {}, buildTrie = aliasPart => {
            let node = trie;
            for (let i = 0; i < aliasPart.length; i++) {
                if (node.$suffix) {
                    node[node.$suffix[0]] = {
                        $suffix: node.$suffix.slice(1)
                    };
                    delete node.$suffix;
                }
                const c = aliasPart[i];
                if (!node[c]) {
                    node[c] = {
                        $suffix: aliasPart.slice(i + 1)
                    };
                    return;
                }
                node = node[c];
            }
        }, traverseNodes = (str, node) => {
            if (node.$suffix) {
                const index = lowerCaseAliasParts.indexOf(str + node.$suffix), origAliasPart = origAliasParts[index];
                shortAliases[origAliasPart] = origAliasPart.slice(0, str.length);
            } else _.forEach(node, ((value, key) => {
                traverseNodes(str + key, value);
            }));
        }, lowerCaseAliasParts = origAliasParts.map((origAliasPart => origAliasPart.toLowerCase()));
        lowerCaseAliasParts.slice().sort().forEach(buildTrie);
        traverseNodes("", trie);
    }, getRelationships = (relationships, nestedRelationships = []) => {
        const relationshipKeys = Object.keys(relationships);
        for (const key of relationshipKeys) if ("$" !== key) {
            nestedRelationships.push(key);
            getRelationships(relationships[key], nestedRelationships);
        }
        return nestedRelationships;
    }, generateShortAliases = clientModel => {
        const shortAliases = {}, aliasParts = _(getRelationships(clientModel.relationships)).union(Object.keys(clientModel.synonyms)).reject((key => "$" === key)).value();
        let origAliasParts = _(aliasParts).flatMap((aliasPart => aliasPart.split(/-| /))).uniq().value();
        addAliases(shortAliases, origAliasParts);
        origAliasParts = _(aliasParts).flatMap((aliasPart => aliasPart.split("-"))).filter((aliasPart => aliasPart.includes(" "))).map((aliasPart => aliasPart.split(" ").map((part => shortAliases[part])).join(" "))).uniq().value();
        addAliases(shortAliases, origAliasParts);
        origAliasParts = _(aliasParts).filter((aliasPart => aliasPart.includes("-"))).map((aliasPart => aliasPart.split("-").map((part => shortAliases[part])).join("-"))).uniq().value();
        addAliases(shortAliases, origAliasParts);
        return shortAliases;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var normalizeOpts = __webpack_require__(24), resolveLength = __webpack_require__(38), plain = __webpack_require__(127);
    module.exports = function(fn) {
        var options = normalizeOpts(arguments[1]), length;
        options.normalizer || 0 !== (length = options.length = resolveLength(options.length, fn.length, options.async)) && (options.primitive ? !1 === length ? options.normalizer = __webpack_require__(152) : length > 1 && (options.normalizer = __webpack_require__(153)(length)) : options.normalizer = !1 === length ? __webpack_require__(154)() : 1 === length ? __webpack_require__(158)() : __webpack_require__(159)(length));
        options.async && __webpack_require__(160);
        options.promise && __webpack_require__(161);
        options.dispose && __webpack_require__(167);
        options.maxAge && __webpack_require__(168);
        options.max && __webpack_require__(171);
        options.refCounter && __webpack_require__(173);
        return plain(fn, options);
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var _undefined = void 0;
    module.exports = function(value) {
        return null != value;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.setup = exports.config = exports.addPermissions = exports.checkPermissionsMiddleware = exports.checkPermissions = exports.apiKeyMiddleware = exports.customApiKeyMiddleware = exports.authorizationMiddleware = exports.customAuthorizationMiddleware = exports.getApiKeyPermissions = exports.getUserPermissions = exports.checkPassword = exports.nestedCheck = exports.rootRead = exports.root = exports.PermissionParsingError = exports.PermissionError = void 0;
    const odata_to_abstract_sql_1 = __webpack_require__(16), ODataParser = __webpack_require__(65), _ = __webpack_require__(0), memoize = __webpack_require__(17), randomstring = __webpack_require__(61), env = __webpack_require__(12), sbvrUtils = __webpack_require__(5), hooks_1 = __webpack_require__(31), errors_1 = __webpack_require__(20);
    Object.defineProperty(exports, "PermissionError", {
        enumerable: !0,
        get: function() {
            return errors_1.PermissionError;
        }
    });
    Object.defineProperty(exports, "PermissionParsingError", {
        enumerable: !0,
        get: function() {
            return errors_1.PermissionParsingError;
        }
    });
    const uri_parser_1 = __webpack_require__(67), memoizeWeak = __webpack_require__(32), userModel = __webpack_require__(206), DEFAULT_ACTOR_BIND = "@__ACTOR_ID", DEFAULT_ACTOR_BIND_REGEX = new RegExp(_.escapeRegExp("@__ACTOR_ID"), "g");
    exports.root = {
        user: {
            id: 0,
            actor: 0,
            permissions: [ "resource.all" ]
        }
    };
    exports.rootRead = {
        user: {
            id: 0,
            actor: 0,
            permissions: [ "resource.read" ]
        }
    };
    const methodPermissions = {
        GET: "read",
        PUT: {
            and: [ "create", "update" ]
        },
        POST: "create",
        PATCH: "update",
        MERGE: "update",
        DELETE: "delete"
    }, $parsePermissions = memoize((filter => {
        const {tree: tree, binds: binds} = ODataParser.parse(filter, {
            startRule: "ProcessRule",
            rule: "FilterByExpression"
        });
        return {
            tree: tree,
            extraBinds: binds
        };
    }), {
        primitive: !0,
        max: env.cache.parsePermissions.max
    }), rewriteBinds = ({tree: tree, extraBinds: extraBinds}, odataBinds) => {
        const bindsLength = odataBinds.length;
        odataBinds.push(...extraBinds);
        return _.cloneDeepWith(tree, (value => {
            if (null != value) {
                const bind = value.bind;
                if (Number.isInteger(bind)) return {
                    bind: value.bind + bindsLength
                };
            }
        }));
    }, parsePermissions = (filter, odataBinds) => {
        const odata = $parsePermissions(filter);
        return rewriteBinds(odata, odataBinds);
    }, isAnd = x => _.isObject(x) && "and" in x, isOr = x => "object" == typeof x && "or" in x;
    function nestedCheck(check, stringCallback) {
        if ("string" == typeof check) return stringCallback(check);
        if ("boolean" == typeof check) return check;
        if (Array.isArray(check)) {
            let results = [];
            for (const subcheck of check) {
                const result = nestedCheck(subcheck, stringCallback);
                if ("boolean" == typeof result) {
                    if (!1 === result) return !1;
                } else isAnd(result) ? results = results.concat(result.and) : results.push(result);
            }
            return 1 === results.length ? results[0] : !(results.length > 1) || {
                and: _.uniq(results)
            };
        }
        if ("object" == typeof check) {
            const checkTypes = Object.keys(check);
            if (checkTypes.length > 1) throw new Error("More than one check type: " + checkTypes);
            const checkType = checkTypes[0];
            switch (checkType.toUpperCase()) {
              case "AND":
                const and = undefined;
                return nestedCheck(check[checkType], stringCallback);

              case "OR":
                const or = check[checkType];
                let results = [];
                for (const subcheck of or) {
                    const result = nestedCheck(subcheck, stringCallback);
                    if ("boolean" == typeof result) {
                        if (!0 === result) return !0;
                    } else isOr(result) ? results = results.concat(result.or) : results.push(result);
                }
                return 1 === results.length ? results[0] : results.length > 1 && {
                    or: _.uniq(results)
                };

              default:
                throw new Error("Cannot parse required checking logic: " + checkType);
            }
        }
        throw new Error("Cannot parse required checks: " + check);
    }
    exports.nestedCheck = nestedCheck;
    const collapsePermissionFilters = v => {
        if (Array.isArray(v)) return collapsePermissionFilters({
            or: v
        });
        if ("object" == typeof v) {
            if ("filter" in v) return v.filter;
            if ("and" in v) return [ "and", ...v.and.map(collapsePermissionFilters) ];
            if ("or" in v) return [ "or", ...v.or.map(collapsePermissionFilters) ];
            throw new Error("Permission filter objects must have `filter` or `and` or `or` keys");
        }
        return v;
    }, namespaceRelationships = (relationships, alias) => {
        _.forEach(relationships, ((relationship, key) => {
            if ("$" === key) return;
            let mapping = relationship.$;
            if (null != mapping && 2 === mapping.length) {
                mapping = _.cloneDeep(mapping);
                mapping[1][0] = `${mapping[1][0]}$${alias}`;
                relationships[`${key}$${alias}`] = {
                    $: mapping
                };
            }
            namespaceRelationships(relationship, alias);
        }));
    }, getPermissionsLookup = memoize((permissions => {
        const permissionsLookup = {};
        for (const permission of permissions) {
            const [target, condition] = permission.split("?");
            if (null == condition) permissionsLookup[target] = !0; else if (!0 !== permissionsLookup[target]) {
                null == permissionsLookup[target] && (permissionsLookup[target] = []);
                permissionsLookup[target].push(condition);
            }
        }
        return permissionsLookup;
    }), {
        primitive: !0,
        max: env.cache.permissionsLookup.max
    }), $checkPermissions = (permissionsLookup, actionList, vocabulary, resourceName) => {
        const checkObject = undefined;
        return nestedCheck({
            or: [ "all", actionList ]
        }, (permissionCheck => {
            const resourcePermission = permissionsLookup["resource." + permissionCheck];
            let vocabularyPermission, vocabularyResourcePermission;
            if (!0 === resourcePermission) return !0;
            if (null != vocabulary) {
                const maybeVocabularyPermission = permissionsLookup[vocabulary + "." + permissionCheck];
                if (!0 === maybeVocabularyPermission) return !0;
                vocabularyPermission = maybeVocabularyPermission;
                if (null != resourceName) {
                    const maybeVocabularyResourcePermission = permissionsLookup[vocabulary + "." + resourceName + "." + permissionCheck];
                    if (!0 === maybeVocabularyResourcePermission) return !0;
                    vocabularyResourcePermission = maybeVocabularyResourcePermission;
                }
            }
            const conditionalPermissions = _.union(resourcePermission, vocabularyPermission, vocabularyResourcePermission);
            return 1 === conditionalPermissions.length ? conditionalPermissions[0] : conditionalPermissions.length > 1 && {
                or: conditionalPermissions
            };
        }));
    }, convertToLambda = (filter, identifier) => {
        const replaceObject = object => {
            if ("string" != typeof object) {
                Array.isArray(object) && object.forEach((element => {
                    replaceObject(element);
                }));
                if (object.hasOwnProperty("name")) {
                    object.property = {
                        ...object
                    };
                    object.name = identifier;
                    delete object.lambda;
                }
            }
        };
        replaceObject(filter);
    }, rewriteSubPermissionBindings = (filter, counter) => {
        const rewrite = object => {
            if (null != object) {
                "number" == typeof object.bind && (object.bind = counter + object.bind);
                (Array.isArray(object) || _.isObject(object)) && _.forEach(object, (v => {
                    rewrite(v);
                }));
            }
        };
        rewrite(filter);
    }, buildODataPermission = (permissionsLookup, actionList, vocabulary, resourceName, odata) => {
        const conditionalPerms = $checkPermissions(permissionsLookup, actionList, vocabulary, resourceName);
        if (!1 === conditionalPerms) throw constrainedPermissionError;
        if (!0 === conditionalPerms) return !1;
        const permissionFilters = nestedCheck(conditionalPerms, (permissionCheck => {
            try {
                return {
                    filter: parsePermissions(permissionCheck, odata.binds)
                };
            } catch (e) {
                console.warn("Failed to parse conditional permissions: ", permissionCheck);
                throw new errors_1.PermissionParsingError(e);
            }
        })), collapsedPermissionFilters = undefined;
        return collapsePermissionFilters(permissionFilters);
    }, constrainedPermissionError = new errors_1.PermissionError, generateConstrainedAbstractSql = (permissionsLookup, actionList, vocabulary, resourceName) => {
        const abstractSQLModel = sbvrUtils.getAbstractSqlModel({
            vocabulary: vocabulary
        }), odata = uri_parser_1.memoizedParseOdata(`/${resourceName}`), collapsedPermissionFilters = buildODataPermission(permissionsLookup, actionList, vocabulary, resourceName, odata);
        _.set(odata, [ "tree", "options", "$filter" ], collapsedPermissionFilters);
        const lambdaAlias = randomstring.generate(20);
        let inc = 0;
        const canAccessTrace = [ resourceName ], canAccessFunction = function(property) {
            delete property.method;
            if (!this.defaultResource) throw new Error("No resource selected in AST.");
            const targetResource = this.NavigateResources(this.defaultResource, property.name), targetResourceName = odata_to_abstract_sql_1.sqlNameToODataName(targetResource.resource.name);
            if (canAccessTrace.includes(targetResourceName)) throw new errors_1.PermissionError(`Permissions for ${resourceName} form a circle by the following path: ${canAccessTrace.join(" -> ")} -> ${targetResourceName}`);
            const parentOdata = uri_parser_1.memoizedParseOdata(`/${targetResourceName}`), collapsedParentPermissionFilters = buildODataPermission(permissionsLookup, actionList, vocabulary, targetResourceName, parentOdata);
            if (!1 === collapsedParentPermissionFilters) throw constrainedPermissionError;
            const lambdaId = `${lambdaAlias}+${inc}`;
            inc += 1;
            rewriteSubPermissionBindings(collapsedParentPermissionFilters, this.bindVarsLength + this.extraBindVars.length);
            convertToLambda(collapsedParentPermissionFilters, lambdaId);
            property.lambda = {
                method: "any",
                identifier: lambdaId,
                expression: collapsedParentPermissionFilters
            };
            this.extraBindVars.push(...parentOdata.binds);
            canAccessTrace.push(targetResourceName);
            try {
                return this.Property(property);
            } finally {
                canAccessTrace.pop();
            }
        }, {tree: tree, extraBindVars: extraBindVars} = uri_parser_1.memoizedGetOData2AbstractSQL(abstractSQLModel).match(odata.tree, "GET", [], odata.binds.length, {
            canAccess: canAccessFunction
        });
        odata.binds.push(...extraBindVars);
        const odataBinds = odata.binds, abstractSqlQuery = [ ...tree ], selectIndex = abstractSqlQuery.findIndex((v => "Select" === v[0])), select = abstractSqlQuery[selectIndex] = [ ...abstractSqlQuery[selectIndex] ];
        select[1] = select[1].map((selectField => {
            if ("Alias" === selectField[0]) {
                const maybeField = selectField[1], fieldType = maybeField[0];
                return "ReferencedField" === fieldType || "Field" === fieldType ? maybeField : [ "Alias", maybeField, odata_to_abstract_sql_1.odataNameToSqlName(selectField[2]) ];
            }
            return 2 === selectField.length && Array.isArray(selectField[0]) ? selectField[0] : selectField;
        }));
        return {
            extraBinds: odataBinds,
            abstractSqlQuery: abstractSqlQuery
        };
    }, onceGetter = (obj, propName, fn) => {
        let nullableFn = fn, thrownErr;
        Object.defineProperty(obj, propName, {
            enumerable: !0,
            configurable: !0,
            get() {
                if (null != thrownErr) throw thrownErr;
                try {
                    const result = nullableFn();
                    delete this[propName];
                    return this[propName] = result;
                } catch (e) {
                    thrownErr = e;
                    throw thrownErr;
                } finally {
                    nullableFn = void 0;
                }
            }
        });
    }, deepFreezeExceptDefinition = obj => {
        Object.freeze(obj);
        Object.getOwnPropertyNames(obj).forEach((prop => {
            "definition" !== prop && obj.hasOwnProperty(prop) && null !== obj[prop] && ![ "object", "function" ].includes(typeof obj[prop]) && deepFreezeExceptDefinition(obj);
        }));
    }, createBypassDefinition = definition => _.cloneDeepWith(definition, (abstractSql => {
        if (Array.isArray(abstractSql) && "Resource" === abstractSql[0] && !abstractSql[1].endsWith("$bypass")) return [ "Resource", `${abstractSql[1]}$bypass` ];
    })), getAlias = name => {
        if (name.endsWith("$bypass")) return "bypass";
        const [, permissionsJSON] = name.split("permissions");
        return permissionsJSON ? `permissions${permissionsJSON}` : void 0;
    }, rewriteRelationship = memoizeWeak(((value, name, abstractSqlModel, permissionsLookup, vocabulary, odata2AbstractSQL) => {
        let escapedName = odata_to_abstract_sql_1.sqlNameToODataName(name);
        abstractSqlModel.tables[name] && (escapedName = odata_to_abstract_sql_1.sqlNameToODataName(abstractSqlModel.tables[name].name));
        const rewrite = object => {
            var _a, _b;
            if ("$" in object && Array.isArray(object.$)) {
                const mapping = object.$;
                if (2 === mapping.length && Array.isArray(mapping[1]) && 2 === mapping[1].length && "string" == typeof mapping[1][0]) {
                    const possibleTargetResourceName = mapping[1][0];
                    if (possibleTargetResourceName.endsWith("$bypass")) return;
                    const targetResourceEscaped = odata_to_abstract_sql_1.sqlNameToODataName(null !== (_b = null === (_a = abstractSqlModel.tables[possibleTargetResourceName]) || void 0 === _a ? void 0 : _a.name) && void 0 !== _b ? _b : possibleTargetResourceName);
                    if (targetResourceEscaped.includes("$")) return;
                    let foundCanAccessLink = !1;
                    try {
                        const odata = uri_parser_1.memoizedParseOdata(`/${targetResourceEscaped}`), collapsedPermissionFilters = buildODataPermission(permissionsLookup, methodPermissions.GET, vocabulary, targetResourceEscaped, odata);
                        _.set(odata, [ "tree", "options", "$filter" ], collapsedPermissionFilters);
                        const canAccessFunction = function(property) {
                            delete property.method;
                            if (!this.defaultResource) throw new Error("No resource selected in AST.");
                            const targetResourceAST = this.NavigateResources(this.defaultResource, property.name), targetResourceName = odata_to_abstract_sql_1.sqlNameToODataName(targetResourceAST.resource.name), currentResourceName = undefined;
                            odata_to_abstract_sql_1.sqlNameToODataName(this.defaultResource.name) === targetResourceEscaped && targetResourceName === escapedName && (foundCanAccessLink = !0);
                            return [ "Equals", [ "Boolean", !0 ], [ "Boolean", !0 ] ];
                        };
                        try {
                            odata2AbstractSQL.match(odata.tree, "GET", [], odata.binds.length, {
                                canAccess: canAccessFunction
                            });
                        } catch (e) {
                            throw new ODataParser.SyntaxError(e);
                        }
                        foundCanAccessLink && (mapping[1][0] = `${possibleTargetResourceName}$bypass`);
                    } catch (e) {
                        if (e === constrainedPermissionError) return;
                        if (e instanceof ODataParser.SyntaxError) return;
                        throw e;
                    }
                }
            }
            (Array.isArray(object) || _.isObject(object)) && _.forEach(object, (v => {
                "string" != typeof v && rewrite(v);
            }));
        };
        rewrite(value);
    })), rewriteRelationships = (abstractSqlModel, relationships, permissionsLookup, vocabulary) => {
        const originalAbstractSQLModel = sbvrUtils.getAbstractSqlModel({
            vocabulary: vocabulary
        }), odata2AbstractSQL = uri_parser_1.memoizedGetOData2AbstractSQL(originalAbstractSQLModel), newRelationships = _.cloneDeep(relationships);
        _.forOwn(newRelationships, ((value, name) => rewriteRelationship(value, name, abstractSqlModel, permissionsLookup, vocabulary, odata2AbstractSQL)));
        return newRelationships;
    }, stringifiedGetPermissions = JSON.stringify(methodPermissions.GET), getBoundConstrainedMemoizer = memoizeWeak((abstractSqlModel => memoizeWeak(((permissionsLookup, vocabulary) => {
        const constrainedAbstractSqlModel = _.cloneDeep(abstractSqlModel), origSynonyms = Object.keys(constrainedAbstractSqlModel.synonyms);
        constrainedAbstractSqlModel.synonyms = new Proxy(constrainedAbstractSqlModel.synonyms, {
            get: (synonyms, permissionSynonym) => {
                if (synonyms[permissionSynonym]) return synonyms[permissionSynonym];
                const alias = getAlias(permissionSynonym);
                if (alias) {
                    origSynonyms.forEach(((canonicalForm, synonym) => {
                        synonyms[`${synonym}$${alias}`] = `${canonicalForm}$${alias}`;
                    }));
                    return synonyms[permissionSynonym];
                }
            }
        });
        const origRelationships = Object.keys(constrainedAbstractSqlModel.relationships);
        _.forEach(constrainedAbstractSqlModel.tables, ((table, resourceName) => {
            const bypassResourceName = `${resourceName}$bypass`;
            constrainedAbstractSqlModel.tables[bypassResourceName] = {
                ...table
            };
            constrainedAbstractSqlModel.tables[bypassResourceName].resourceName = bypassResourceName;
            table.definition ? constrainedAbstractSqlModel.tables[bypassResourceName].definition = createBypassDefinition(table.definition) : onceGetter(table, "definition", (() => constrainedAbstractSqlModel.tables[`${resourceName}$permissions${stringifiedGetPermissions}`].definition));
        }));
        constrainedAbstractSqlModel.tables = new Proxy(constrainedAbstractSqlModel.tables, {
            get: (tables, permissionResourceName) => {
                if (tables[permissionResourceName]) return tables[permissionResourceName];
                const [resourceName, permissionsJSON] = permissionResourceName.split("$permissions");
                if (!permissionsJSON) return;
                const permissions = JSON.parse(permissionsJSON), table = tables[`${resourceName}$bypass`], permissionsTable = tables[permissionResourceName] = {
                    ...table
                };
                permissionsTable.resourceName = permissionResourceName;
                onceGetter(permissionsTable, "definition", (() => generateConstrainedAbstractSql(permissionsLookup, permissions, vocabulary, odata_to_abstract_sql_1.sqlNameToODataName(permissionsTable.name))));
                return permissionsTable;
            }
        });
        constrainedAbstractSqlModel.relationships = rewriteRelationships(constrainedAbstractSqlModel, constrainedAbstractSqlModel.relationships, permissionsLookup, vocabulary);
        constrainedAbstractSqlModel.relationships = new Proxy(constrainedAbstractSqlModel.relationships, {
            get: (relationships, permissionResourceName) => {
                if (relationships[permissionResourceName]) return relationships[permissionResourceName];
                const alias = getAlias(permissionResourceName);
                if (alias) {
                    for (const relationship of origRelationships) {
                        relationships[`${relationship}$${alias}`] = relationships[relationship];
                        namespaceRelationships(relationships[relationship], alias);
                    }
                    return relationships[permissionResourceName];
                }
            }
        });
        deepFreezeExceptDefinition(constrainedAbstractSqlModel);
        return constrainedAbstractSqlModel;
    }), {
        primitive: !0
    }))), memoizedGetConstrainedModel = (abstractSqlModel, permissionsLookup, vocabulary) => getBoundConstrainedMemoizer(abstractSqlModel)(permissionsLookup, vocabulary), getCheckPasswordQuery = _.once((() => sbvrUtils.api.Auth.prepare({
        resource: "user",
        passthrough: {
            req: exports.rootRead
        },
        id: {
            username: {
                "@": "username"
            }
        },
        options: {
            $select: [ "id", "actor", "password" ]
        }
    }))), checkPassword = async (username, password) => {
        const user = await getCheckPasswordQuery()({
            username: username
        });
        if (null == user) throw new Error("User not found");
        const hash = user.password, userId = user.id, actorId = user.actor, res = undefined;
        if (!await sbvrUtils.sbvrTypes.Hashed.compare(password, hash)) throw new Error("Passwords do not match");
        const permissions = undefined;
        return {
            id: userId,
            actor: actorId,
            username: username,
            permissions: await exports.getUserPermissions(userId)
        };
    };
    exports.checkPassword = checkPassword;
    const getUserPermissionsQuery = _.once((() => sbvrUtils.api.Auth.prepare({
        resource: "permission",
        passthrough: {
            req: exports.rootRead
        },
        options: {
            $select: "name",
            $filter: {
                $or: {
                    is_of__user: {
                        $any: {
                            $alias: "uhp",
                            $expr: {
                                uhp: {
                                    user: {
                                        "@": "userId"
                                    }
                                },
                                $or: [ {
                                    uhp: {
                                        expiry_date: null
                                    }
                                }, {
                                    uhp: {
                                        expiry_date: {
                                            $gt: {
                                                $now: null
                                            }
                                        }
                                    }
                                } ]
                            }
                        }
                    },
                    is_of__role: {
                        $any: {
                            $alias: "rhp",
                            $expr: {
                                rhp: {
                                    role: {
                                        $any: {
                                            $alias: "r",
                                            $expr: {
                                                r: {
                                                    is_of__user: {
                                                        $any: {
                                                            $alias: "uhr",
                                                            $expr: {
                                                                uhr: {
                                                                    user: {
                                                                        "@": "userId"
                                                                    }
                                                                },
                                                                $or: [ {
                                                                    uhr: {
                                                                        expiry_date: null
                                                                    }
                                                                }, {
                                                                    uhr: {
                                                                        expiry_date: {
                                                                            $gt: {
                                                                                $now: null
                                                                            }
                                                                        }
                                                                    }
                                                                } ]
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            $orderby: {
                name: "asc"
            }
        }
    }))), getUserPermissions = async userId => {
        "string" == typeof userId && (userId = parseInt(userId, 10));
        if (!Number.isFinite(userId)) throw new Error("User ID has to be numeric, got: " + typeof userId);
        try {
            const permissions = undefined;
            return (await getUserPermissionsQuery()({
                userId: userId
            })).map((permission => permission.name));
        } catch (err) {
            sbvrUtils.api.Auth.logger.error("Error loading user permissions", err);
            throw err;
        }
    };
    exports.getUserPermissions = getUserPermissions;
    const getApiKeyPermissionsQuery = _.once((() => sbvrUtils.api.Auth.prepare({
        resource: "permission",
        passthrough: {
            req: exports.rootRead
        },
        options: {
            $select: "name",
            $filter: {
                $or: {
                    is_of__api_key: {
                        $any: {
                            $alias: "khp",
                            $expr: {
                                khp: {
                                    api_key: {
                                        $any: {
                                            $alias: "k",
                                            $expr: {
                                                k: {
                                                    key: {
                                                        "@": "apiKey"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    is_of__role: {
                        $any: {
                            $alias: "rhp",
                            $expr: {
                                rhp: {
                                    role: {
                                        $any: {
                                            $alias: "r",
                                            $expr: {
                                                r: {
                                                    is_of__api_key: {
                                                        $any: {
                                                            $alias: "khr",
                                                            $expr: {
                                                                khr: {
                                                                    api_key: {
                                                                        $any: {
                                                                            $alias: "k",
                                                                            $expr: {
                                                                                k: {
                                                                                    key: {
                                                                                        "@": "apiKey"
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            $orderby: {
                name: "asc"
            }
        }
    }))), getApiKeyPermissions = async apiKey => {
        if ("string" != typeof apiKey) throw new Error("API key has to be a string, got: " + typeof apiKey);
        try {
            const permissions = undefined;
            return (await getApiKeyPermissionsQuery()({
                apiKey: apiKey
            })).map((permission => permission.name));
        } catch (err) {
            sbvrUtils.api.Auth.logger.error("Error loading api key permissions", err);
            throw err;
        }
    };
    exports.getApiKeyPermissions = getApiKeyPermissions;
    const getApiKeyActorIdQuery = _.once((() => sbvrUtils.api.Auth.prepare({
        resource: "api_key",
        passthrough: {
            req: exports.rootRead
        },
        id: {
            key: {
                "@": "apiKey"
            }
        },
        options: {
            $select: "is_of__actor"
        }
    }))), apiActorPermissionError = new errors_1.PermissionError, getApiKeyActorId = async apiKey => {
        const apiKeyResult = await getApiKeyActorIdQuery()({
            apiKey: apiKey
        });
        if (null == apiKeyResult) throw apiActorPermissionError;
        const apiKeyActorID = apiKeyResult.is_of__actor.__id;
        if (null == apiKeyActorID) throw new Error("API key is not linked to a actor?!");
        return apiKeyActorID;
    }, checkApiKey = async (req, apiKey) => {
        if (null == apiKey || null != req.apiKey) return;
        let permissions, actor;
        try {
            permissions = await exports.getApiKeyPermissions(apiKey);
        } catch (err) {
            console.warn("Error with API key:", err);
            permissions = [];
        }
        permissions.length > 0 && (actor = await getApiKeyActorId(apiKey));
        req.apiKey = {
            key: apiKey,
            permissions: permissions
        };
        null != actor && (req.apiKey.actor = actor);
    }, customAuthorizationMiddleware = (expectedScheme = "Bearer") => {
        expectedScheme = expectedScheme.toLowerCase();
        return async (req, _res, next) => {
            try {
                const auth = req.header("Authorization");
                if (!auth) return;
                const parts = auth.split(" ");
                if (2 !== parts.length) return;
                const [scheme, apiKey] = parts;
                if (scheme.toLowerCase() !== expectedScheme) return;
                await checkApiKey(req, apiKey);
            } finally {
                null == next || next();
            }
        };
    };
    exports.customAuthorizationMiddleware = customAuthorizationMiddleware;
    exports.authorizationMiddleware = exports.customAuthorizationMiddleware();
    const customApiKeyMiddleware = (paramName = "apikey") => {
        null == paramName && (paramName = "apikey");
        return async (req, _res, next) => {
            try {
                const apiKey = null != req.params[paramName] ? req.params[paramName] : null != req.body[paramName] ? req.body[paramName] : req.query[paramName];
                await checkApiKey(req, apiKey);
            } finally {
                null == next || next();
            }
        };
    };
    exports.customApiKeyMiddleware = customApiKeyMiddleware;
    exports.apiKeyMiddleware = exports.customApiKeyMiddleware();
    const checkPermissions = async (req, actionList, resourceName, vocabulary) => {
        const permissionsLookup = await getReqPermissions(req);
        return $checkPermissions(permissionsLookup, actionList, vocabulary, resourceName);
    };
    exports.checkPermissions = checkPermissions;
    const checkPermissionsMiddleware = action => async (req, res, next) => {
        try {
            const allowed = undefined;
            switch (await exports.checkPermissions(req, action)) {
              case !1:
                res.sendStatus(401);
                return;

              case !0:
                next();
                return;

              default:
                throw new Error("checkPermissionsMiddleware returned a conditional permission");
            }
        } catch (err) {
            sbvrUtils.api.Auth.logger.error("Error checking permissions", err, err.stack);
            res.sendStatus(503);
        }
    };
    exports.checkPermissionsMiddleware = checkPermissionsMiddleware;
    const getGuestPermissions = memoize((async () => {
        const result = await sbvrUtils.api.Auth.get({
            resource: "user",
            passthrough: {
                req: exports.rootRead
            },
            id: {
                username: "guest"
            },
            options: {
                $select: "id"
            }
        });
        if (null == result) throw new Error("No guest user");
        return _.uniq(await exports.getUserPermissions(result.id));
    }), {
        promise: !0
    }), getReqPermissions = async (req, odataBinds = []) => {
        const [guestPermissions] = await Promise.all([ getGuestPermissions(), (async () => {
            if (null != req.apiKey && null == req.apiKey.actor && null != req.apiKey.permissions && req.apiKey.permissions.length > 0) {
                const actorId = await getApiKeyActorId(req.apiKey.key);
                req.apiKey.actor = actorId;
            }
        })() ]);
        if (guestPermissions.some((p => DEFAULT_ACTOR_BIND_REGEX.test(p)))) throw new Error("Guest permissions cannot reference actors");
        let permissions = guestPermissions, actorIndex = 0;
        const addActorPermissions = (actorId, actorPermissions) => {
            let actorBind = "@__ACTOR_ID";
            if (actorIndex > 0) {
                actorBind += actorIndex;
                actorPermissions = actorPermissions.map((actorPermission => actorPermission.replace(DEFAULT_ACTOR_BIND_REGEX, actorBind)));
            }
            odataBinds[actorBind] = [ "Real", actorId ];
            actorIndex++;
            permissions = permissions.concat(actorPermissions);
        };
        null != req.user && null != req.user.permissions ? addActorPermissions(req.user.actor, req.user.permissions) : null != req.apiKey && null != req.apiKey.permissions && addActorPermissions(req.apiKey.actor, req.apiKey.permissions);
        permissions = _.uniq(permissions);
        return getPermissionsLookup(permissions);
    }, addPermissions = async (req, request) => {
        var _a, _b, _c, _d;
        const {vocabulary: vocabulary, resourceName: resourceName, odataQuery: odataQuery, odataBinds: odataBinds} = request;
        let {method: method} = request, abstractSqlModel = sbvrUtils.getAbstractSqlModel(request);
        method = method.toUpperCase();
        const isMetadataEndpoint = uri_parser_1.metadataEndpoints.includes(resourceName) || "OPTIONS" === method;
        let permissionType;
        if (null != request.permissionType) permissionType = request.permissionType; else if (isMetadataEndpoint) permissionType = "model"; else {
            const methodPermission = methodPermissions[method];
            if (null != methodPermission) permissionType = methodPermission; else {
                console.warn("Unknown method for permissions type check: ", method);
                permissionType = "all";
            }
        }
        let permissions = null !== (_b = null === (_a = req.user) || void 0 === _a ? void 0 : _a.permissions) && void 0 !== _b ? _b : [];
        permissions = permissions.concat(null !== (_d = null === (_c = req.apiKey) || void 0 === _c ? void 0 : _c.permissions) && void 0 !== _d ? _d : []);
        if (permissions.length > 0 && !0 === $checkPermissions(getPermissionsLookup(permissions), permissionType, vocabulary)) return;
        const permissionsLookup = await getReqPermissions(req, odataBinds);
        request.abstractSqlModel = abstractSqlModel = memoizedGetConstrainedModel(abstractSqlModel, permissionsLookup, vocabulary);
        if (!_.isEqual(permissionType, methodPermissions.GET)) {
            const sqlName = sbvrUtils.resolveSynonym(request);
            odataQuery.resource = `${sqlName}$permissions${JSON.stringify(permissionType)}`;
        }
    };
    exports.addPermissions = addPermissions;
    exports.config = {
        models: [ {
            apiRoot: "Auth",
            modelText: userModel,
            customServerCode: exports,
            migrations: {
                "11.0.0-modified-at": '\n\t\t\t\t\tALTER TABLE "actor"\n\t\t\t\t\tADD COLUMN IF NOT EXISTS "modified at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;\n\n\t\t\t\t\tALTER TABLE "api key"\n\t\t\t\t\tADD COLUMN IF NOT EXISTS "modified at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;\n\t\t\t\t\tALTER TABLE "api key-has-permission"\n\t\t\t\t\tADD COLUMN IF NOT EXISTS "modified at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;\n\t\t\t\t\tALTER TABLE "api key-has-role"\n\t\t\t\t\tADD COLUMN IF NOT EXISTS "modified at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;\n\n\t\t\t\t\tALTER TABLE "permission"\n\t\t\t\t\tADD COLUMN IF NOT EXISTS "modified at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;\n\n\t\t\t\t\tALTER TABLE "role"\n\t\t\t\t\tADD COLUMN IF NOT EXISTS "modified at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;\n\n\t\t\t\t\tALTER TABLE "user"\n\t\t\t\t\tADD COLUMN IF NOT EXISTS "modified at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;\n\t\t\t\t\tALTER TABLE "user-has-role"\n\t\t\t\t\tADD COLUMN IF NOT EXISTS "modified at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;\n\t\t\t\t\tALTER TABLE "user-has-permission"\n\t\t\t\t\tADD COLUMN IF NOT EXISTS "modified at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;\n\t\t\t\t',
                "11.0.1-modified-at": '\n\t\t\t\t\tALTER TABLE "role-has-permission"\n\t\t\t\t\tADD COLUMN IF NOT EXISTS "modified at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;\n\t\t\t\t'
            }
        } ]
    };
    const setup = () => {
        hooks_1.addHook("all", "all", "all", {
            sideEffects: !1,
            readOnlyTx: !0,
            PREPARSE: ({req: req}) => exports.apiKeyMiddleware(req),
            POSTPARSE: async ({req: req, request: request}) => {
                if (null == request.abstractSqlQuery) {
                    if ("POST" === request.method && null != request.odataQuery.property && "canAccess" === request.odataQuery.property.resource) {
                        if (null == request.odataQuery.key) throw new errors_1.BadRequestError;
                        const {action: action, method: method} = request.values;
                        if (null == method == (null == action)) throw new errors_1.BadRequestError;
                        if (null != method) {
                            const permissions = methodPermissions[method];
                            if (null == permissions) throw new errors_1.BadRequestError;
                            request.permissionType = permissions;
                        } else request.permissionType = action;
                        const abstractSqlModel = sbvrUtils.getAbstractSqlModel(request);
                        request.resourceName = request.resourceName.slice(0, -"#canAccess".length);
                        const resourceName = sbvrUtils.resolveSynonym(request), resourceTable = abstractSqlModel.tables[resourceName];
                        if (null == resourceTable) throw new Error("Unknown resource: " + request.resourceName);
                        const idField = resourceTable.idField;
                        request.odataQuery.options = {
                            $select: {
                                properties: [ {
                                    name: idField
                                } ]
                            },
                            $top: 1
                        };
                        request.odataQuery.resource = request.resourceName;
                        delete request.odataQuery.property;
                        request.method = "GET";
                        request.custom.isAction = "canAccess";
                    }
                    await exports.addPermissions(req, request);
                }
            },
            PRERESPOND: ({request: request, data: data}) => {
                if ("canAccess" === request.custom.isAction && _.isEmpty(data)) throw new errors_1.PermissionError;
            }
        });
        hooks_1.addPureHook("POST", "Auth", "user", {
            POSTPARSE: async ({request: request, api: api}) => {
                const result = await api.post({
                    resource: "actor",
                    options: {
                        returnResource: !1
                    }
                });
                request.values.actor = result.id;
            }
        });
        hooks_1.addPureHook("DELETE", "Auth", "user", {
            POSTRUN: ({request: request, api: api}) => api.delete({
                resource: "actor",
                id: request.values.actor
            })
        });
    };
    exports.setup = setup;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.statusCodeToError = exports.NetworkAuthenticationRequiredError = exports.NotExtendedError = exports.LoopDetectedError = exports.InsufficientStorageError = exports.VariantAlsoNegotiatesError = exports.HTTPVersionNotSupportedError = exports.GatewayTimeoutError = exports.ServiceUnavailableError = exports.BadGatewayError = exports.NotImplementedError = exports.InternalRequestError = exports.UnavailableForLegalReasonsError = exports.RequestHeaderFieldsTooLargeError = exports.TooManyRequestsError = exports.PreconditionRequiredError = exports.UpgradeRequiredError = exports.FailedDependencyError = exports.LockedError = exports.UnprocessableEntityError = exports.MisdirectedRequestError = exports.ExpectationFailedError = exports.RequestedRangeNotSatisfiableError = exports.UnsupportedMediaTypeError = exports.URITooLongError = exports.PayloadTooLargeError = exports.PreconditionFailedError = exports.LengthRequiredError = exports.GoneError = exports.ConflictError = exports.RequestTimeoutError = exports.ProxyAuthenticationRequiredError = exports.NotAcceptableError = exports.MethodNotAllowedError = exports.NotFoundError = exports.ForbiddenError = exports.PaymentRequired = exports.UnauthorizedError = exports.BadRequestError = exports.HttpError = exports.ParsingError = exports.TranslationError = exports.SbvrValidationError = exports.SqlCompilationError = exports.PermissionParsingError = exports.PermissionError = void 0;
    const typed_error_1 = __webpack_require__(34);
    class PermissionError extends typed_error_1.TypedError {}
    exports.PermissionError = PermissionError;
    class PermissionParsingError extends typed_error_1.TypedError {}
    exports.PermissionParsingError = PermissionParsingError;
    class SqlCompilationError extends typed_error_1.TypedError {}
    exports.SqlCompilationError = SqlCompilationError;
    class SbvrValidationError extends typed_error_1.TypedError {}
    exports.SbvrValidationError = SbvrValidationError;
    class TranslationError extends typed_error_1.TypedError {}
    exports.TranslationError = TranslationError;
    class ParsingError extends typed_error_1.TypedError {}
    exports.ParsingError = ParsingError;
    class HttpError extends typed_error_1.TypedError {
        constructor(status, error = "", body) {
            super(error);
            this.status = status;
            this.body = body;
        }
        getResponseBody() {
            return void 0 !== this.body ? this.body : this.message;
        }
    }
    exports.HttpError = HttpError;
    class BadRequestError extends HttpError {
        constructor(error, body) {
            super(400, error, body);
        }
    }
    exports.BadRequestError = BadRequestError;
    class UnauthorizedError extends HttpError {
        constructor(error, body) {
            super(401, error, body);
        }
    }
    exports.UnauthorizedError = UnauthorizedError;
    class PaymentRequired extends HttpError {
        constructor(error, body) {
            super(402, error, body);
        }
    }
    exports.PaymentRequired = PaymentRequired;
    class ForbiddenError extends HttpError {
        constructor(error, body) {
            super(403, error, body);
        }
    }
    exports.ForbiddenError = ForbiddenError;
    class NotFoundError extends HttpError {
        constructor(error, body) {
            super(404, error, body);
        }
    }
    exports.NotFoundError = NotFoundError;
    class MethodNotAllowedError extends HttpError {
        constructor(error, body) {
            super(405, error, body);
        }
    }
    exports.MethodNotAllowedError = MethodNotAllowedError;
    class NotAcceptableError extends HttpError {
        constructor(error, body) {
            super(406, error, body);
        }
    }
    exports.NotAcceptableError = NotAcceptableError;
    class ProxyAuthenticationRequiredError extends HttpError {
        constructor(error, body) {
            super(407, error, body);
        }
    }
    exports.ProxyAuthenticationRequiredError = ProxyAuthenticationRequiredError;
    class RequestTimeoutError extends HttpError {
        constructor(error, body) {
            super(408, error, body);
        }
    }
    exports.RequestTimeoutError = RequestTimeoutError;
    class ConflictError extends HttpError {
        constructor(error, body) {
            super(409, error, body);
        }
    }
    exports.ConflictError = ConflictError;
    class GoneError extends HttpError {
        constructor(error, body) {
            super(410, error, body);
        }
    }
    exports.GoneError = GoneError;
    class LengthRequiredError extends HttpError {
        constructor(error, body) {
            super(411, error, body);
        }
    }
    exports.LengthRequiredError = LengthRequiredError;
    class PreconditionFailedError extends HttpError {
        constructor(error, body) {
            super(412, error, body);
        }
    }
    exports.PreconditionFailedError = PreconditionFailedError;
    class PayloadTooLargeError extends HttpError {
        constructor(error, body) {
            super(413, error, body);
        }
    }
    exports.PayloadTooLargeError = PayloadTooLargeError;
    class URITooLongError extends HttpError {
        constructor(error, body) {
            super(414, error, body);
        }
    }
    exports.URITooLongError = URITooLongError;
    class UnsupportedMediaTypeError extends HttpError {
        constructor(error, body) {
            super(415, error, body);
        }
    }
    exports.UnsupportedMediaTypeError = UnsupportedMediaTypeError;
    class RequestedRangeNotSatisfiableError extends HttpError {
        constructor(error, body) {
            super(416, error, body);
        }
    }
    exports.RequestedRangeNotSatisfiableError = RequestedRangeNotSatisfiableError;
    class ExpectationFailedError extends HttpError {
        constructor(error, body) {
            super(417, error, body);
        }
    }
    exports.ExpectationFailedError = ExpectationFailedError;
    class MisdirectedRequestError extends HttpError {
        constructor(error, body) {
            super(421, error, body);
        }
    }
    exports.MisdirectedRequestError = MisdirectedRequestError;
    class UnprocessableEntityError extends HttpError {
        constructor(error, body) {
            super(422, error, body);
        }
    }
    exports.UnprocessableEntityError = UnprocessableEntityError;
    class LockedError extends HttpError {
        constructor(error, body) {
            super(423, error, body);
        }
    }
    exports.LockedError = LockedError;
    class FailedDependencyError extends HttpError {
        constructor(error, body) {
            super(424, error, body);
        }
    }
    exports.FailedDependencyError = FailedDependencyError;
    class UpgradeRequiredError extends HttpError {
        constructor(error, body) {
            super(426, error, body);
        }
    }
    exports.UpgradeRequiredError = UpgradeRequiredError;
    class PreconditionRequiredError extends HttpError {
        constructor(error, body) {
            super(428, error, body);
        }
    }
    exports.PreconditionRequiredError = PreconditionRequiredError;
    class TooManyRequestsError extends HttpError {
        constructor(error, body) {
            super(429, error, body);
        }
    }
    exports.TooManyRequestsError = TooManyRequestsError;
    class RequestHeaderFieldsTooLargeError extends HttpError {
        constructor(error, body) {
            super(431, error, body);
        }
    }
    exports.RequestHeaderFieldsTooLargeError = RequestHeaderFieldsTooLargeError;
    class UnavailableForLegalReasonsError extends HttpError {
        constructor(error, body) {
            super(451, error, body);
        }
    }
    exports.UnavailableForLegalReasonsError = UnavailableForLegalReasonsError;
    class InternalRequestError extends HttpError {
        constructor(error, body) {
            super(500, error, body);
        }
    }
    exports.InternalRequestError = InternalRequestError;
    class NotImplementedError extends HttpError {
        constructor(error, body) {
            super(501, error, body);
        }
    }
    exports.NotImplementedError = NotImplementedError;
    class BadGatewayError extends HttpError {
        constructor(error, body) {
            super(502, error, body);
        }
    }
    exports.BadGatewayError = BadGatewayError;
    class ServiceUnavailableError extends HttpError {
        constructor(error, body) {
            super(503, error, body);
        }
    }
    exports.ServiceUnavailableError = ServiceUnavailableError;
    class GatewayTimeoutError extends HttpError {
        constructor(error, body) {
            super(504, error, body);
        }
    }
    exports.GatewayTimeoutError = GatewayTimeoutError;
    class HTTPVersionNotSupportedError extends HttpError {
        constructor(error, body) {
            super(505, error, body);
        }
    }
    exports.HTTPVersionNotSupportedError = HTTPVersionNotSupportedError;
    class VariantAlsoNegotiatesError extends HttpError {
        constructor(error, body) {
            super(506, error, body);
        }
    }
    exports.VariantAlsoNegotiatesError = VariantAlsoNegotiatesError;
    class InsufficientStorageError extends HttpError {
        constructor(error, body) {
            super(507, error, body);
        }
    }
    exports.InsufficientStorageError = InsufficientStorageError;
    class LoopDetectedError extends HttpError {
        constructor(error, body) {
            super(508, error, body);
        }
    }
    exports.LoopDetectedError = LoopDetectedError;
    class NotExtendedError extends HttpError {
        constructor(error, body) {
            super(510, error, body);
        }
    }
    exports.NotExtendedError = NotExtendedError;
    class NetworkAuthenticationRequiredError extends HttpError {
        constructor(error, body) {
            super(511, error, body);
        }
    }
    exports.NetworkAuthenticationRequiredError = NetworkAuthenticationRequiredError;
    exports.statusCodeToError = {
        400: BadRequestError,
        401: UnauthorizedError,
        402: PaymentRequired,
        403: ForbiddenError,
        404: NotFoundError,
        405: MethodNotAllowedError,
        406: NotAcceptableError,
        407: ProxyAuthenticationRequiredError,
        408: RequestTimeoutError,
        409: ConflictError,
        410: GoneError,
        411: LengthRequiredError,
        412: PreconditionFailedError,
        413: PayloadTooLargeError,
        414: URITooLongError,
        415: UnsupportedMediaTypeError,
        416: RequestedRangeNotSatisfiableError,
        417: ExpectationFailedError,
        421: MisdirectedRequestError,
        422: UnprocessableEntityError,
        423: LockedError,
        424: FailedDependencyError,
        426: UpgradeRequiredError,
        428: PreconditionRequiredError,
        429: TooManyRequestsError,
        431: RequestHeaderFieldsTooLargeError,
        451: UnavailableForLegalReasonsError,
        500: InternalRequestError,
        501: NotImplementedError,
        502: BadGatewayError,
        503: ServiceUnavailableError,
        504: GatewayTimeoutError,
        505: HTTPVersionNotSupportedError,
        506: VariantAlsoNegotiatesError,
        507: InsufficientStorageError,
        508: LoopDetectedError,
        510: NotExtendedError,
        511: NetworkAuthenticationRequiredError
    };
}, function(module, exports) {
    module.exports = require("bluebird");
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = __webpack_require__(141)() ? Array.from : __webpack_require__(142);
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.websql = exports.mysql = exports.postgres = exports.compileRule = exports.isResourceNode = exports.isTableNode = exports.isFromNode = exports.Engines = void 0;
    var Engines;
    !function(Engines) {
        Engines.postgres = "postgres";
        Engines.mysql = "mysql";
        Engines.websql = "websql";
    }(Engines = exports.Engines || (exports.Engines = {}));
    const AbstractSQLOptimiser_1 = __webpack_require__(36), AbstractSQLRules2SQL_1 = __webpack_require__(47), sbvrTypes = __webpack_require__(13), _ = __webpack_require__(0), AbstractSQLSchemaOptimiser_1 = __webpack_require__(114), referenced_fields_1 = __webpack_require__(115), validateTypes = _.mapValues(sbvrTypes, (({validate: validate}) => validate)), dataTypeValidate = async (value, field) => {
        const {dataType: dataType, required: required} = field, validateFn = validateTypes[dataType];
        return null != validateFn ? validateFn(value, required) : new Error("is an unsupported type: " + dataType);
    }, dataTypeGen = (engine, {dataType: dataType, required: required, index: index, defaultValue: defaultValue, checks: checks}) => {
        var _a, _b;
        let requiredStr;
        requiredStr = required ? " NOT NULL" : " NULL";
        defaultValue = null != defaultValue ? ` DEFAULT ${defaultValue}` : "";
        let checksString = "";
        null != checks && (checksString = checks.map((check => ` CHECK (${compileRule(check, engine, !0)})`)).join(""));
        null == index ? index = "" : "" !== index && (index = " " + index);
        const dbType = null === (_b = null === (_a = null == sbvrTypes ? void 0 : sbvrTypes[dataType]) || void 0 === _a ? void 0 : _a.types) || void 0 === _b ? void 0 : _b[engine];
        if (null != dbType) return "function" == typeof dbType ? dbType(requiredStr, index) : dbType + defaultValue + requiredStr + checksString + index;
        throw new Error(`Unknown data type '${dataType}' for engine: ${engine}`);
    }, isFromNode = n => "From" === n[0];
    exports.isFromNode = isFromNode;
    const isTableNode = n => "Table" === n[0];
    exports.isTableNode = isTableNode;
    const isResourceNode = n => "Resource" === n[0];
    exports.isResourceNode = isResourceNode;
    const containsNode = (n, checkNodeTypeFn) => {
        if (checkNodeTypeFn(n)) return !0;
        for (const p of n) if (Array.isArray(p) && containsNode(p, checkNodeTypeFn)) return !0;
        return !1;
    };
    function compileRule(abstractSQL, engine, noBinds = !1) {
        abstractSQL = AbstractSQLOptimiser_1.AbstractSQLOptimiser(abstractSQL, noBinds);
        return AbstractSQLRules2SQL_1.AbstractSQLRules2SQL(abstractSQL, engine, noBinds);
    }
    exports.compileRule = compileRule;
    const compileSchema = (abstractSqlModel, engine, ifNotExists) => {
        let ifNotExistsStr = "", orReplaceStr = "";
        if (ifNotExists) {
            ifNotExistsStr = "IF NOT EXISTS ";
            orReplaceStr = "OR REPLACE ";
        }
        const createSchemaStatements = [], alterSchemaStatements = [];
        let dropSchemaStatements = [];
        const fns = {};
        if (abstractSqlModel.functions) for (const fnName of Object.keys(abstractSqlModel.functions)) {
            const fnDefinition = abstractSqlModel.functions[fnName];
            if ("postgres" !== engine) throw new Error("Functions are only supported on postgres currently");
            if ("plpgsql" !== fnDefinition.language) throw new Error("Only plpgsql functions currently supported");
            if ("trigger" !== fnDefinition.type) throw new Error("Only trigger functions currently supported");
            fns[fnName] = !0;
            createSchemaStatements.push(`DO $$\nBEGIN\n\tPERFORM '"${fnName}"()'::regprocedure;\nEXCEPTION WHEN undefined_function THEN\n\tCREATE FUNCTION "${fnName}"()\n\tRETURNS TRIGGER AS $fn$\n\tBEGIN\n\t\t${fnDefinition.body}\n\tEND;\n\t$fn$ LANGUAGE ${fnDefinition.language};\nEND;\n$$;`);
            dropSchemaStatements.push(`DROP FUNCTION "${fnName}"();`);
        }
        const hasDependants = {}, schemaDependencyMap = {};
        Object.keys(abstractSqlModel.tables).forEach((resourceName => {
            const table = abstractSqlModel.tables[resourceName];
            if ("string" == typeof table) return;
            const {definition: definition} = table;
            if (null != definition) {
                if (null != definition.binds && definition.binds.length > 0) return;
                let definitionAbstractSql = definition.abstractSql;
                if (containsNode(definitionAbstractSql, exports.isResourceNode)) return;
                exports.isTableNode(definitionAbstractSql) && (definitionAbstractSql = [ "SelectQuery", [ "Select", [ [ "Field", "*" ] ] ], [ "From", definitionAbstractSql ] ]);
                schemaDependencyMap[table.resourceName] = {
                    resourceName: resourceName,
                    primitive: table.primitive,
                    createSQL: [ `CREATE ${orReplaceStr}VIEW "${table.name}" AS (\n${compileRule(definitionAbstractSql, engine, !0).replace(/^/gm, "\t")}\n);` ],
                    dropSQL: [ `DROP VIEW "${table.name}";` ],
                    depends: []
                };
                return;
            }
            const foreignKeys = [], depends = [], createSqlElements = [];
            for (const field of table.fields) {
                const {fieldName: fieldName, references: references, dataType: dataType, computed: computed} = field;
                if (!computed) {
                    createSqlElements.push('"' + fieldName + '" ' + dataTypeGen(engine, field));
                    if ([ "ForeignKey", "ConceptType" ].includes(dataType) && null != references) {
                        const referencedTable = abstractSqlModel.tables[references.resourceName], fkDefinition = `FOREIGN KEY ("${fieldName}") REFERENCES "${referencedTable.name}" ("${references.fieldName}")`, schemaInfo = schemaDependencyMap[references.resourceName];
                        if (schemaInfo && schemaInfo.depends.includes(table.resourceName)) {
                            if ("postgres" !== engine) throw new Error("Circular dependencies are only supported on postgres currently");
                            alterSchemaStatements.push(`DO $$\nBEGIN\n\tIF NOT EXISTS (\n\t\tSELECT 1\n\t\tFROM information_schema.table_constraints tc\n\t\tJOIN information_schema.key_column_usage kcu USING (constraint_catalog, constraint_schema, constraint_name)\n\t\tJOIN information_schema.constraint_column_usage ccu USING (constraint_catalog, constraint_schema, constraint_name)\n\t\tWHERE constraint_type = 'FOREIGN KEY'\n\t\t\tAND tc.table_schema = CURRENT_SCHEMA()\n\t\t\tAND tc.table_name = '${table.name}'\n\t\t\tAND kcu.column_name = '${fieldName}'\n\t\t\tAND ccu.table_schema = CURRENT_SCHEMA()\n\t\t\tAND ccu.table_name = '${referencedTable.name}'\n\t\t\tAND ccu.column_name = '${references.fieldName}'\n\t) THEN\n\t\tALTER TABLE "${table.name}"\n\t\tADD CONSTRAINT "${table.name}_${fieldName}_fkey"\n\t\t${fkDefinition};\n\tEND IF;\nEND;\n$$;`);
                        } else {
                            foreignKeys.push(fkDefinition);
                            depends.push(references.resourceName);
                            hasDependants[references.resourceName] = !0;
                        }
                    }
                }
            }
            createSqlElements.push(...foreignKeys);
            for (const index of table.indexes) createSqlElements.push(index.type + '("' + index.fields.join('", "') + '")');
            if (table.checks) for (const check of table.checks) {
                const comment = check.description ? `-- ${check.description.split(/\r?\n/).join("\n-- ")}\n` : "", constraintName = check.name ? `CONSTRAINT "${check.name}" ` : "", sql = compileRule(check.abstractSql, engine, !0);
                createSqlElements.push(`${comment}${constraintName}CHECK (${sql})`);
            }
            const createTriggers = [], dropTriggers = [];
            if (table.triggers) for (const trigger of table.triggers) {
                if (!fns[trigger.fnName]) throw new Error(`No such function '${trigger.fnName}' declared`);
                const triggerName = `${table.name}_${trigger.fnName}`.slice(0, 63);
                createTriggers.push(`DO\n$$\nBEGIN\nIF NOT EXISTS(\n\tSELECT 1\n\tFROM "information_schema"."triggers"\n\tWHERE "event_object_table" = '${table.name}'\n\tAND "trigger_name" = '${triggerName}'\n) THEN\n\tCREATE TRIGGER "${triggerName}"\n\t${trigger.when} ${trigger.operation} ON "${table.name}"\n\tFOR EACH ${trigger.level}\n\tEXECUTE PROCEDURE "${trigger.fnName}"();\nEND IF;\nEND;\n$$`);
                dropTriggers.push(`DROP TRIGGER "${triggerName}";`);
            }
            schemaDependencyMap[table.resourceName] = {
                resourceName: resourceName,
                primitive: table.primitive,
                createSQL: [ `CREATE TABLE ${ifNotExistsStr}"${table.name}" (\n\t${createSqlElements.join("\n,\t")}\n);`, ...createTriggers ],
                dropSQL: [ ...dropTriggers, `DROP TABLE "${table.name}";` ],
                depends: depends
            };
        }));
        let resourceNames = [];
        for (;resourceNames.length !== (resourceNames = Object.keys(schemaDependencyMap)).length && resourceNames.length > 0; ) for (const resourceName of resourceNames) {
            const schemaInfo = schemaDependencyMap[resourceName];
            let unsolvedDependency = !1;
            for (const dependency of schemaInfo.depends) if (dependency !== resourceName && schemaDependencyMap.hasOwnProperty(dependency)) {
                unsolvedDependency = !0;
                break;
            }
            if (!1 === unsolvedDependency) {
                if (!1 === schemaInfo.primitive || null != hasDependants[resourceName]) {
                    !1 !== schemaInfo.primitive && console.warn("We're adding a primitive table??", schemaInfo.resourceName);
                    createSchemaStatements.push(...schemaInfo.createSQL);
                    dropSchemaStatements.push(...schemaInfo.dropSQL);
                }
                delete schemaDependencyMap[resourceName];
            }
        }
        if (Object.keys(schemaDependencyMap).length > 0) {
            console.error("Failed to resolve all schema dependencies", schemaDependencyMap);
            throw new Error("Failed to resolve all schema dependencies");
        }
        createSchemaStatements.push(...alterSchemaStatements);
        dropSchemaStatements = dropSchemaStatements.reverse();
        const ruleStatements = abstractSqlModel.rules.map((rule => {
            const ruleBodyNode = rule.find((r => "Body" === r[0]));
            if (null == ruleBodyNode || "string" == typeof ruleBodyNode) throw new Error("Invalid rule");
            const ruleBody = ruleBodyNode[1];
            if ("string" == typeof ruleBody) throw new Error("Invalid rule");
            const ruleSENode = rule.find((r => "StructuredEnglish" === r[0]));
            if (null == ruleSENode) throw new Error("Invalid structured English");
            const ruleSE = ruleSENode[1];
            if ("string" != typeof ruleSE) throw new Error("Invalid structured English");
            const {query: ruleSQL, bindings: ruleBindings} = compileRule(ruleBody, engine);
            let referencedFields, ruleReferencedFields;
            try {
                referencedFields = referenced_fields_1.getReferencedFields(ruleBody);
            } catch (e) {
                console.warn("Error fetching referenced fields", e);
            }
            try {
                ruleReferencedFields = referenced_fields_1.getRuleReferencedFields(ruleBody);
            } catch (e) {
                console.warn("Error fetching rule referenced fields", e);
            }
            return {
                structuredEnglish: ruleSE,
                sql: ruleSQL,
                bindings: ruleBindings,
                referencedFields: referencedFields,
                ruleReferencedFields: ruleReferencedFields
            };
        }));
        return {
            synonyms: abstractSqlModel.synonyms,
            relationships: abstractSqlModel.relationships,
            tables: abstractSqlModel.tables,
            createSchema: createSchemaStatements,
            dropSchema: dropSchemaStatements,
            rules: ruleStatements
        };
    }, generateExport = (engine, ifNotExists) => ({
        optimizeSchema: AbstractSQLSchemaOptimiser_1.optimizeSchema,
        compileSchema: abstractSqlModel => compileSchema(abstractSqlModel, engine, ifNotExists),
        compileRule: abstractSQL => compileRule(abstractSQL, engine, !1),
        dataTypeValidate: dataTypeValidate,
        getReferencedFields: referenced_fields_1.getReferencedFields,
        getRuleReferencedFields: referenced_fields_1.getRuleReferencedFields,
        getModifiedFields: referenced_fields_1.getModifiedFields
    });
    exports.postgres = generateExport("postgres", !0);
    exports.mysql = generateExport("mysql", !0);
    exports.websql = generateExport("websql", !1);
}, function(module, exports, __webpack_require__) {
    "use strict";
    var isValue = __webpack_require__(6), forEach = Array.prototype.forEach, create = Object.create, process = function(src, obj) {
        var key;
        for (key in src) obj[key] = src[key];
    };
    module.exports = function(opts1) {
        var result = create(null);
        forEach.call(arguments, (function(options) {
            isValue(options) && process(Object(options), result);
        }));
        return result;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = __webpack_require__(128)("forEach");
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = __webpack_require__(130)() ? Object.assign : __webpack_require__(131);
}, function(module, exports, __webpack_require__) {
    "use strict";
    var toPosInt = __webpack_require__(10), test = function(arg1, arg2) {
        return arg2;
    }, desc, defineProperty, generate, mixin, cache;
    try {
        Object.defineProperty(test, "length", {
            configurable: !0,
            writable: !1,
            enumerable: !1,
            value: 1
        });
    } catch (ignore) {}
    if (1 === test.length) {
        desc = {
            configurable: !0,
            writable: !1,
            enumerable: !1
        };
        defineProperty = Object.defineProperty;
        module.exports = function(fn, length) {
            length = toPosInt(length);
            if (fn.length === length) return fn;
            desc.value = length;
            return defineProperty(fn, "length", desc);
        };
    } else {
        mixin = __webpack_require__(53);
        generate = (cache = [], function(length) {
            var args, i = 0;
            if (cache[length]) return cache[length];
            args = [];
            for (;length--; ) args.push("a" + (++i).toString(36));
            return new Function("fn", "return function (" + args.join(", ") + ") { return fn.apply(this, arguments); };");
        });
        module.exports = function(src, length) {
            var target;
            length = toPosInt(length);
            if (src.length === length) return src;
            target = generate(length)(src);
            try {
                mixin(target, src);
            } catch (ignore) {}
            return target;
        };
    }
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = __webpack_require__(144)() ? globalThis : __webpack_require__(145);
}, function(module, exports, __webpack_require__) {
    "use strict";
    var objToString = Object.prototype.toString, id = objToString.call(function() {
        return arguments;
    }());
    module.exports = function(value) {
        return objToString.call(value) === id;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var objToString = Object.prototype.toString, id = objToString.call("");
    module.exports = function(value) {
        return "string" == typeof value || value && "object" == typeof value && (value instanceof String || objToString.call(value) === id) || !1;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.runHooks = exports.addPureHook = exports.addSideEffectHook = exports.addHook = exports.getHooks = exports.rollbackRequestHooks = void 0;
    const Bluebird = __webpack_require__(21), _ = __webpack_require__(0), control_flow_1 = __webpack_require__(66), memoize = __webpack_require__(17), sbvr_utils_1 = __webpack_require__(5), hookNames = [ "PREPARSE", "POSTPARSE", "PRERUN", "POSTRUN", "PRERESPOND", "POSTRUN-ERROR" ], isValidHook = x => hookNames.includes(x);
    class Hook {
        constructor(hook) {
            this.hookFn = hook.hookFn;
            this.readOnlyTx = hook.readOnlyTx;
        }
        async run(...args) {
            await this.hookFn(...args);
        }
    }
    class SideEffectHook extends Hook {
        constructor() {
            super(...arguments);
            this.rollbackFns = [];
            this.rolledBack = !1;
        }
        registerRollback(fn) {
            this.rolledBack ? Bluebird.try(fn) : this.rollbackFns.push(fn);
        }
        async rollback() {
            if (!this.rolledBack) {
                this.rolledBack = !0;
                await control_flow_1.settleMapSeries(this.rollbackFns, (fn => fn()));
            }
        }
    }
    const rollbackRequestHooks = hooks => {
        null != hooks && control_flow_1.settleMapSeries(_(hooks).flatMap().compact().value(), (async hook => {
            hook instanceof SideEffectHook && await hook.rollback();
        }));
    };
    exports.rollbackRequestHooks = rollbackRequestHooks;
    const instantiateHooks = hooks => _.mapValues(hooks, (typeHooks => typeHooks.map((hook => hook.sideEffects ? new SideEffectHook(hook) : new Hook(hook))))), mergeHooks = (a, b) => _.mergeWith({}, a, b, ((x, y) => {
        if (Array.isArray(x)) return x.concat(y);
    })), getResourceHooks = (vocabHooks, resourceName) => null == vocabHooks ? {} : null == resourceName ? vocabHooks.all : mergeHooks(vocabHooks[resourceName], vocabHooks.all), getVocabHooks = (methodHooks, vocabulary, resourceName) => null == methodHooks ? {} : mergeHooks(getResourceHooks(methodHooks[vocabulary], resourceName), getResourceHooks(methodHooks.all, resourceName)), getMethodHooks = memoize(((method, vocabulary, resourceName) => mergeHooks(getVocabHooks(apiHooks[method], vocabulary, resourceName), getVocabHooks(apiHooks.all, vocabulary, resourceName))), {
        primitive: !0
    }), getHooks = request => {
        let {resourceName: resourceName} = request;
        null != resourceName && (resourceName = sbvr_utils_1.resolveSynonym(request));
        return instantiateHooks(getMethodHooks(request.method, request.vocabulary, resourceName));
    };
    exports.getHooks = getHooks;
    exports.getHooks.clear = () => getMethodHooks.clear();
    const apiHooks = {
        all: {},
        GET: {},
        PUT: {},
        POST: {},
        PATCH: {},
        MERGE: {},
        DELETE: {},
        OPTIONS: {}
    };
    apiHooks.MERGE = apiHooks.PATCH;
    const addHook = (method, vocabulary, resourceName, hooks) => {
        var _a, _b, _c;
        const methodHooks = apiHooks[method];
        if (null == methodHooks) throw new Error("Unsupported method: " + method);
        if ("all" === vocabulary) {
            if ("all" !== resourceName) throw new Error(`When specifying a hook on all apis then you must also specify all resources, got: '${resourceName}'`);
        } else {
            let abstractSqlModel;
            try {
                abstractSqlModel = sbvr_utils_1.getAbstractSqlModel({
                    vocabulary: vocabulary
                });
            } catch (_d) {
                throw new Error("Unknown api root: " + vocabulary);
            }
            if ("all" !== resourceName) {
                const origResourceName = resourceName;
                resourceName = sbvr_utils_1.resolveSynonym({
                    vocabulary: vocabulary,
                    resourceName: resourceName
                });
                if (null == abstractSqlModel.tables[resourceName]) throw new Error("Unknown resource for api root: " + origResourceName + ", " + vocabulary);
            }
        }
        null !== (_a = methodHooks[vocabulary]) && void 0 !== _a || (methodHooks[vocabulary] = {});
        const apiRootHooks = methodHooks[vocabulary];
        null !== (_b = apiRootHooks[resourceName]) && void 0 !== _b || (apiRootHooks[resourceName] = {});
        const resourceHooks = apiRootHooks[resourceName];
        if ("sideEffects" in hooks && "readOnlyTx" in hooks) {
            const {sideEffects: sideEffects, readOnlyTx: readOnlyTx} = hooks, blueprintedHooks = {};
            for (const hookName of hookNames) {
                const hookFn = hooks[hookName];
                null != hookFn && (blueprintedHooks[hookName] = {
                    hookFn: hookFn,
                    sideEffects: sideEffects,
                    readOnlyTx: readOnlyTx
                });
            }
            hooks = blueprintedHooks;
        }
        for (const hookType of Object.keys(hooks)) {
            if (!isValidHook(hookType)) throw new Error("Unknown callback type: " + hookType);
            const hook = hooks[hookType];
            null !== (_c = resourceHooks[hookType]) && void 0 !== _c || (resourceHooks[hookType] = []);
            null != hook && resourceHooks[hookType].push(hook);
        }
        exports.getHooks.clear();
    };
    exports.addHook = addHook;
    const addSideEffectHook = (method, apiRoot, resourceName, hooks) => {
        exports.addHook(method, apiRoot, resourceName, {
            ...hooks,
            sideEffects: !0,
            readOnlyTx: !1
        });
    };
    exports.addSideEffectHook = addSideEffectHook;
    const addPureHook = (method, apiRoot, resourceName, hooks) => {
        exports.addHook(method, apiRoot, resourceName, {
            ...hooks,
            sideEffects: !1,
            readOnlyTx: !1
        });
    };
    exports.addPureHook = addPureHook;
    const defineApi = args => {
        const {request: request, req: req, tx: tx} = args, {vocabulary: vocabulary} = request;
        Object.defineProperty(args, "api", {
            get: _.once((() => sbvr_utils_1.api[vocabulary].clone({
                passthrough: {
                    req: req,
                    tx: tx
                }
            })))
        });
    }, runHooks = async (hookName, hooksList, args) => {
        if (null == hooksList) return;
        const hooks = hooksList[hookName];
        if (null == hooks || 0 === hooks.length) return;
        let readOnlyArgs;
        readOnlyArgs = null != args.tx ? {
            ...args,
            tx: args.tx.asReadOnly()
        } : args;
        if (null != args.request) {
            defineApi(args);
            args !== readOnlyArgs && defineApi(readOnlyArgs);
        }
        await Promise.all(hooks.map((async hook => {
            hook.readOnlyTx ? await hook.run(readOnlyArgs) : await hook.run(args);
        })));
    };
    exports.runHooks = runHooks;
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = __webpack_require__(185)(__webpack_require__(17));
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.init = exports.hooks = exports.types = exports.env = exports.errors = exports.permissions = exports.sbvrUtils = exports.PinejsSessionStore = exports.dbModule = void 0;
    __webpack_require__(76);
    const dbModule = __webpack_require__(46), configLoader = __webpack_require__(82), migrator = __webpack_require__(64), sbvrUtils = __webpack_require__(5);
    exports.dbModule = __webpack_require__(46);
    var pinejs_session_store_1 = __webpack_require__(211);
    Object.defineProperty(exports, "PinejsSessionStore", {
        enumerable: !0,
        get: function() {
            return pinejs_session_store_1.PinejsSessionStore;
        }
    });
    exports.sbvrUtils = __webpack_require__(5);
    exports.permissions = __webpack_require__(19);
    exports.errors = __webpack_require__(20);
    exports.env = __webpack_require__(12);
    exports.types = __webpack_require__(213);
    exports.hooks = __webpack_require__(31);
    let envDatabaseOptions;
    if (null != dbModule.engines.websql) envDatabaseOptions = {
        engine: "websql",
        params: "rulemotion"
    }; else {
        let databaseURL;
        if (process.env.DATABASE_URL) databaseURL = process.env.DATABASE_URL; else if (null != dbModule.engines.postgres) databaseURL = "postgres://postgres:.@localhost:5432/postgres"; else {
            if (null != dbModule.engines.mysql) throw new Error("No supported database options available");
            databaseURL = "mysql://mysql:.@localhost:3306";
        }
        envDatabaseOptions = {
            engine: databaseURL.slice(0, databaseURL.indexOf(":")),
            params: databaseURL
        };
    }
    const init = async (app, config, databaseOptions = envDatabaseOptions) => {
        try {
            const db = dbModule.connect(databaseOptions);
            await sbvrUtils.setup(app, db);
            const cfgLoader = await configLoader.setup(app);
            await cfgLoader.loadConfig(migrator.config);
            const promises = [];
            {
                const sbvrServer = await Promise.resolve().then((() => __webpack_require__(214))), transactions = __webpack_require__(215);
                promises.push(cfgLoader.loadConfig(sbvrServer.config));
                promises.push(cfgLoader.loadConfig(transactions.config).then((() => transactions.addModelHooks("data"))));
            }
            0;
            await Promise.all(promises);
            return cfgLoader;
        } catch (err) {
            console.error("Error initialising server", err, err.stack);
            process.exit(1);
        }
    };
    exports.init = init;
}, function(module, exports) {
    module.exports = require("typed-error");
}, function(module, exports) {
    module.exports = require("fs");
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.AbstractSQLOptimiser = void 0;
    const _ = __webpack_require__(0), AbstractSQLRules2SQL = __webpack_require__(47), {isAbstractSqlQuery: isAbstractSqlQuery, getAbstractSqlQuery: getAbstractSqlQuery, checkArgs: checkArgs, checkMinArgs: checkMinArgs, isNotNullable: isNotNullable} = AbstractSQLRules2SQL, escapeForLike = str => [ "Replace", [ "Replace", [ "Replace", str, [ "EmbeddedText", "\\" ], [ "EmbeddedText", "\\\\" ] ], [ "EmbeddedText", "_" ], [ "EmbeddedText", "\\_" ] ], [ "EmbeddedText", "%" ], [ "EmbeddedText", "\\%" ] ];
    let helped = !1, noBinds = !1;
    const Helper = fn => (...args) => {
        const result = fn(...args);
        !1 !== result && (helped = !0);
        return result;
    }, isEmptySelectQuery = query => {
        const [type, ...rest] = query;
        switch (type) {
          case "SelectQuery":
            for (const arg of rest) if ("Where" === arg[0]) {
                const maybeBool = arg[1];
                if ("Boolean" === maybeBool[0] && !1 === maybeBool[1]) return !0;
            }
        }
        return !1;
    }, rewriteMatch = (name, matchers, rewriteFn) => args => {
        checkArgs(name, args, matchers.length);
        return rewriteFn(args.map(((arg, index) => matchers[index](arg))));
    }, matchArgs = (name, ...matchers) => rewriteMatch(name, matchers, (args => [ name, ...args ])), tryMatches = (...matchers) => args => {
        let err;
        for (const matcher of matchers) try {
            const result = matcher(args);
            if (!1 !== result) return result;
        } catch (e) {
            err = e;
        }
        throw err;
    }, AnyValue = args => {
        const [type, ...rest] = args;
        if ("Case" === type) return typeRules[type](rest);
        for (const matcher of [ isJSONValue, isDateValue, isTextValue, isNumericValue, isBooleanValue, isDurationValue ]) if (matcher(type)) return typeRules[type](rest);
        return UnknownValue(args);
    }, UnknownValue = args => {
        if (null === args || "Null" === args) {
            helped = !0;
            args = [ "Null" ];
        }
        const [type, ...rest] = args;
        switch (type) {
          case "Null":
          case "Field":
          case "ReferencedField":
          case "Bind":
          case "Cast":
          case "Coalesce":
            return typeRules[type](rest);

          case "SelectQuery":
          case "UnionQuery":
            return typeRules[type](rest);

          default:
            throw new Error(`Invalid "UnknownValue" type: ${type}`);
        }
    }, MatchValue = matcher => args => {
        const [type, ...rest] = args;
        return matcher(type) ? typeRules[type](rest) : UnknownValue(args);
    }, isTextValue = type => "Concat" === type || "Tolower" === type || "ToLower" === type || "Toupper" === type || "ToUpper" === type || AbstractSQLRules2SQL.isTextValue(type), TextValue = MatchValue(isTextValue), isNumericValue = type => "IndexOf" === type || "Indexof" === type || AbstractSQLRules2SQL.isNumericValue(type), NumericValue = MatchValue(isNumericValue), isBooleanValue = type => "Contains" === type || "Substringof" === type || "Startswith" === type || "Endswith" === type || AbstractSQLRules2SQL.isBooleanValue(type), BooleanValue = MatchValue(isBooleanValue), {isDateValue: isDateValue} = AbstractSQLRules2SQL, DateValue = MatchValue(isDateValue), {isJSONValue: isJSONValue} = AbstractSQLRules2SQL, {isDurationValue: isDurationValue} = AbstractSQLRules2SQL, DurationValue = MatchValue(isDurationValue), {isFieldValue: isFieldValue} = AbstractSQLRules2SQL, Field = args => {
        const [type, ...rest] = args;
        if (isFieldValue(type)) return typeRules[type](rest);
        throw new SyntaxError(`Invalid field type: ${type}`);
    }, AnyNotNullValue = args => null != args && "Null" !== args && "Null" !== args[0], FieldOp = type => args => !1 !== AnyNotNullValue(args[0]) && !1 !== AnyNotNullValue(args[1]) && (isFieldValue(args[0][0]) ? [ type, args[0], args[1] ] : !!isFieldValue(args[1][0]) && [ type, args[1], args[0] ]), FieldEquals = FieldOp("Equals"), FieldNotEquals = FieldOp("NotEquals"), Comparison = comparison => matchArgs(comparison, AnyValue, AnyValue), NumberMatch = type => matchArgs(type, (arg => {
        if ("number" != typeof arg) throw new SyntaxError(`${type} expected number but got ${typeof arg}`);
        return arg;
    })), mathOps_Add = "+", mathOps_Subtract = "-", mathOps_Multiply = "*", mathOps_Divide = "/", MathOp = type => matchArgs(type, NumericValue, NumericValue), ExtractNumericDatePart = type => matchArgs(type, DateValue), Concatenate = args => {
        checkMinArgs("Concatenate", args, 1);
        return [ "Concatenate", ...args.map((arg => {
            if (!isAbstractSqlQuery(arg)) throw new SyntaxError("Expected AbstractSqlQuery array but got " + typeof arg);
            return TextValue(arg);
        })) ];
    }, Text = matchArgs("Text", _.identity), Value = arg => {
        switch (arg) {
          case !0:
          case !1:
          case "Default":
            return arg;

          default:
            const [type, ...rest] = arg;
            switch (type) {
              case "Null":
              case "Bind":
              case "Value":
              case "Text":
              case "Number":
              case "Real":
              case "Integer":
                return typeRules[type](rest);

              default:
                throw new SyntaxError(`Invalid type for Value ${type}`);
            }
        }
    }, FromMatch = args => {
        if ("string" == typeof args) return [ "Table", args ];
        const [type, ...rest] = args;
        switch (type) {
          case "SelectQuery":
          case "UnionQuery":
            return typeRules[type](rest);

          case "Table":
            checkArgs("Table", rest, 1);
            return [ "Table", rest[0] ];

          default:
            throw new SyntaxError(`From does not support ${type}`);
        }
    }, MaybeAlias = (args, matchFn) => {
        if (2 === args.length && "Table" !== args[0] && "Count" !== args[0] && "Field" !== args[0] && "string" == typeof args[1]) {
            helped = !0;
            return [ "Alias", matchFn(args[0]), args[1] ];
        }
        const [type, ...rest] = args;
        switch (type) {
          case "Alias":
            checkArgs("Alias", rest, 2);
            return [ "Alias", matchFn(getAbstractSqlQuery(rest, 0)), rest[1] ];

          default:
            return matchFn(args);
        }
    }, Lower = matchArgs("Lower", TextValue), Upper = matchArgs("Upper", TextValue), JoinMatch = joinType => args => {
        if (1 !== args.length && 2 !== args.length) throw new SyntaxError(`"${joinType}" requires 1/2 arg(s)`);
        const from = MaybeAlias(getAbstractSqlQuery(args, 0), FromMatch);
        if (1 === args.length) return [ joinType, from ];
        const [type, ...rest] = getAbstractSqlQuery(args, 1);
        switch (type) {
          case "On":
            checkArgs("On", rest, 1);
            const ruleBody = BooleanValue(getAbstractSqlQuery(rest, 0));
            return [ joinType, from, [ "On", ruleBody ] ];

          default:
            throw new SyntaxError(`'${joinType}' clause does not support '${type}' clause`);
        }
    }, typeRules = {
        UnionQuery: args => {
            checkMinArgs("UnionQuery", args, 2);
            return [ "UnionQuery", ...args.map((arg => {
                if (!isAbstractSqlQuery(arg)) throw new SyntaxError("Expected AbstractSqlQuery array but got " + typeof arg);
                const [type, ...rest] = arg;
                switch (type) {
                  case "SelectQuery":
                  case "UnionQuery":
                    return typeRules[type](rest);

                  default:
                    throw new SyntaxError(`UnionQuery does not support ${type}`);
                }
            })) ];
        },
        SelectQuery: args => {
            const tables = [];
            let select = [];
            const groups = {
                Where: [],
                GroupBy: [],
                OrderBy: [],
                Limit: [],
                Offset: []
            };
            for (const arg of args) {
                if (!isAbstractSqlQuery(arg)) throw new SyntaxError("`SelectQuery` args must all be arrays");
                const [type, ...rest] = arg;
                switch (type) {
                  case "Select":
                    if (0 !== select.length) throw new SyntaxError(`'SelectQuery' can only accept one '${type}'`);
                    select = [ typeRules[type](rest) ];
                    break;

                  case "From":
                  case "Join":
                  case "LeftJoin":
                  case "RightJoin":
                  case "FullJoin":
                  case "CrossJoin":
                    tables.push(typeRules[type](rest));
                    break;

                  case "Where":
                  case "GroupBy":
                  case "OrderBy":
                  case "Limit":
                  case "Offset":
                    if (0 !== groups[type].length) throw new SyntaxError(`'SelectQuery' can only accept one '${type}'`);
                    groups[type] = [ typeRules[type](rest) ];
                    break;

                  default:
                    throw new SyntaxError(`'SelectQuery' does not support '${type}'`);
                }
            }
            return [ "SelectQuery", ...select, ...tables, ...groups.Where, ...groups.GroupBy, ...groups.OrderBy, ...groups.Limit, ...groups.Offset ];
        },
        Select: args => {
            checkArgs("Select", args, 1);
            return [ "Select", getAbstractSqlQuery(args, 0).map((arg => {
                if (!isAbstractSqlQuery(arg)) throw new SyntaxError("Expected AbstractSqlQuery array but got " + typeof arg);
                return MaybeAlias(arg, AnyValue);
            })) ];
        },
        From: args => {
            checkArgs("From", args, 1);
            return [ "From", MaybeAlias(args[0], FromMatch) ];
        },
        Join: JoinMatch("Join"),
        LeftJoin: JoinMatch("LeftJoin"),
        RightJoin: JoinMatch("RightJoin"),
        FullJoin: JoinMatch("FullJoin"),
        CrossJoin: args => {
            checkArgs("CrossJoin", args, 1);
            const from = undefined;
            return [ "CrossJoin", MaybeAlias(getAbstractSqlQuery(args, 0), FromMatch) ];
        },
        Where: matchArgs("Where", BooleanValue),
        GroupBy: args => {
            checkArgs("GroupBy", args, 1);
            const groups = getAbstractSqlQuery(args, 0);
            checkMinArgs("GroupBy groups", groups, 1);
            return [ "GroupBy", groups.map(AnyValue) ];
        },
        OrderBy: args => {
            checkMinArgs("OrderBy", args, 1);
            return [ "OrderBy", ...args.map((arg => {
                checkMinArgs("OrderBy ordering", arg, 2);
                const order = arg[0];
                if ("ASC" !== order && "DESC" !== order) throw new SyntaxError('Can only order by "ASC" or "DESC"');
                const field = undefined;
                return [ order, Field(getAbstractSqlQuery(arg, 1)) ];
            })) ];
        },
        Limit: matchArgs("Limit", NumericValue),
        Offset: matchArgs("Offset", NumericValue),
        Count: args => {
            checkArgs("Count", args, 1);
            if ("*" !== args[0]) throw new SyntaxError('"Count" only supports "*"');
            return [ "Count", args[0] ];
        },
        Average: matchArgs("Average", NumericValue),
        Sum: matchArgs("Sum", NumericValue),
        Field: matchArgs("Field", _.identity),
        ReferencedField: matchArgs("ReferencedField", _.identity, _.identity),
        Cast: matchArgs("Cast", AnyValue, _.identity),
        Number: NumberMatch("Number"),
        Real: NumberMatch("Real"),
        Integer: NumberMatch("Integer"),
        Boolean: matchArgs("Boolean", _.identity),
        EmbeddedText: matchArgs("EmbeddedText", _.identity),
        Null: matchArgs("Null"),
        Now: matchArgs("Now"),
        AggregateJSON: matchArgs("AggregateJSON", _.identity),
        Equals: tryMatches(Helper((args => {
            checkArgs("Equals", args, 2);
            let valueIndex;
            if ("Null" === args[0][0]) valueIndex = 1; else {
                if ("Null" !== args[1][0]) return !1;
                valueIndex = 0;
            }
            return [ "NotExists", getAbstractSqlQuery(args, valueIndex) ];
        })), Comparison("Equals")),
        NotEquals: tryMatches(Helper((args => {
            checkArgs("NotEquals", args, 2);
            let valueIndex;
            if ("Null" === args[0][0]) valueIndex = 1; else {
                if ("Null" !== args[1][0]) return !1;
                valueIndex = 0;
            }
            return [ "Exists", getAbstractSqlQuery(args, valueIndex) ];
        })), Comparison("NotEquals")),
        GreaterThan: Comparison("GreaterThan"),
        GreaterThanOrEqual: Comparison("GreaterThanOrEqual"),
        LessThan: Comparison("LessThan"),
        LessThanOrEqual: Comparison("LessThanOrEqual"),
        Like: Comparison("Like"),
        IsNotDistinctFrom: tryMatches(Helper((args => {
            checkArgs("IsNotDistinctFrom", args, 2);
            let valueIndex;
            if ("Null" === args[0][0]) valueIndex = 1; else {
                if ("Null" !== args[1][0]) return !1;
                valueIndex = 0;
            }
            return [ "NotExists", getAbstractSqlQuery(args, valueIndex) ];
        })), Helper((args => {
            checkArgs("IsDistinctFrom", args, 2);
            return !(!isNotNullable(getAbstractSqlQuery(args, 0)) || !isNotNullable(getAbstractSqlQuery(args, 1))) && [ "Equals", ...args ];
        })), matchArgs("IsNotDistinctFrom", AnyValue, AnyValue)),
        IsDistinctFrom: tryMatches(Helper((args => {
            checkArgs("IsDistinctFrom", args, 2);
            let valueIndex;
            if ("Null" === args[0][0]) valueIndex = 1; else {
                if ("Null" !== args[1][0]) return !1;
                valueIndex = 0;
            }
            return [ "Exists", getAbstractSqlQuery(args, valueIndex) ];
        })), Helper((args => {
            checkArgs("IsDistinctFrom", args, 2);
            return !(!isNotNullable(getAbstractSqlQuery(args, 0)) || !isNotNullable(getAbstractSqlQuery(args, 1))) && [ "NotEquals", ...args ];
        })), matchArgs("IsDistinctFrom", AnyValue, AnyValue)),
        Add: MathOp("Add"),
        Subtract: MathOp("Subtract"),
        Multiply: MathOp("Multiply"),
        Divide: MathOp("Divide"),
        Year: ExtractNumericDatePart("Year"),
        Month: ExtractNumericDatePart("Month"),
        Day: ExtractNumericDatePart("Day"),
        Hour: ExtractNumericDatePart("Hour"),
        Minute: ExtractNumericDatePart("Minute"),
        Second: ExtractNumericDatePart("Second"),
        Fractionalseconds: ExtractNumericDatePart("Fractionalseconds"),
        Totalseconds: matchArgs("Totalseconds", DurationValue),
        Concat: Concatenate,
        Concatenate: Concatenate,
        Replace: matchArgs("Replace", TextValue, TextValue, TextValue),
        CharacterLength: matchArgs("CharacterLength", TextValue),
        StrPos: matchArgs("StrPos", TextValue, TextValue),
        Substring: args => {
            checkMinArgs("Substring", args, 2);
            const str = undefined, nums = undefined;
            return [ "Substring", TextValue(getAbstractSqlQuery(args, 0)), ...args.slice(1).map((arg => {
                if (!isAbstractSqlQuery(arg)) throw new SyntaxError("Expected AbstractSqlQuery array but got " + typeof arg);
                return NumericValue(arg);
            })) ];
        },
        Right: matchArgs("Right", TextValue, NumericValue),
        Tolower: Lower,
        ToLower: Lower,
        Lower: Lower,
        Toupper: Upper,
        ToUpper: Upper,
        Upper: Upper,
        Trim: matchArgs("Trim", TextValue),
        Round: matchArgs("Round", NumericValue),
        Floor: matchArgs("Floor", NumericValue),
        Ceiling: matchArgs("Ceiling", NumericValue),
        ToDate: matchArgs("ToDate", DateValue),
        ToTime: matchArgs("ToTime", DateValue),
        Coalesce: args => {
            checkMinArgs("Coalesce", args, 2);
            return [ "Coalesce", ...args.map(AnyValue) ];
        },
        Case: args => {
            checkMinArgs("Case", args, 1);
            return [ "Case", ...args.map(((arg, index) => {
                if (!isAbstractSqlQuery(arg)) throw new SyntaxError("Expected AbstractSqlQuery array but got " + typeof arg);
                const [type, ...rest] = arg;
                switch (type) {
                  case "When":
                    checkArgs("When", rest, 2);
                    const matches = undefined, resultValue = undefined;
                    return [ "When", BooleanValue(getAbstractSqlQuery(rest, 0)), AnyValue(getAbstractSqlQuery(rest, 1)) ];

                  case "Else":
                    if (index !== args.length - 1) throw new SyntaxError("Else must be the last element of a Case");
                    checkArgs("Else", rest, 1);
                    return [ "Else", AnyValue(getAbstractSqlQuery(rest, 0)) ];

                  default:
                    throw new SyntaxError("Case can only contain When/Else");
                }
            })) ];
        },
        And: tryMatches(Helper((args => 1 === args.length && getAbstractSqlQuery(args, 0))), Helper((args => {
            checkMinArgs("And", args, 2);
            let maybeHelped = !1;
            const conditions = _.flatMap(args, (arg => {
                if (!isAbstractSqlQuery(arg)) throw new SyntaxError("Expected AbstractSqlQuery array but got " + typeof arg);
                if ("And" === arg[0]) {
                    maybeHelped = !0;
                    return arg.slice(1);
                }
                return [ arg ];
            }));
            return !!maybeHelped && [ "And", ...conditions ];
        })), Helper((args => {
            checkMinArgs("And", args, 2);
            let maybeHelped = !1, containsFalse = !1;
            const conditions = args.filter((arg => {
                if ("Boolean" === arg[0]) {
                    if (!0 === arg[1]) {
                        maybeHelped = !0;
                        return !1;
                    }
                    !1 === arg[1] && (containsFalse = !0);
                }
                return !0;
            }));
            return containsFalse ? [ "Boolean", !1 ] : !!maybeHelped && [ "And", ...conditions ];
        })), Helper((args => {
            checkMinArgs("And", args, 2);
            const fieldBuckets = {}, others = [];
            let maybeHelped = !1;
            args.map((arg => {
                if (!isAbstractSqlQuery(arg)) throw new SyntaxError("Expected AbstractSqlQuery array but got " + typeof arg);
                if ("NotEquals" === arg[0]) {
                    const fieldBool = FieldNotEquals(arg.slice(1));
                    if (!1 !== fieldBool) {
                        const fieldRef = fieldBool[1];
                        if (null == fieldBuckets[fieldRef]) fieldBuckets[fieldRef] = [ fieldBool ]; else {
                            maybeHelped = !0;
                            fieldBuckets[fieldRef].push(fieldBool);
                        }
                        return;
                    }
                } else if ("NotIn" === arg[0]) {
                    const fieldRef = arg[1];
                    if (null == fieldBuckets[fieldRef]) fieldBuckets[fieldRef] = [ arg ]; else {
                        maybeHelped = !0;
                        fieldBuckets[fieldRef].push(arg);
                    }
                    return;
                }
                others.push(arg);
            }));
            if (!maybeHelped) return !1;
            const fields = undefined;
            return [ "And", ...Object.keys(fieldBuckets).map((fieldRef => {
                const fieldBucket = fieldBuckets[fieldRef];
                return 1 === fieldBucket.length ? fieldBucket[0] : [ "NotIn", fieldBucket[0][1], ..._.flatMap(fieldBucket, (field => field.slice(2))) ];
            })), ...others ];
        })), (args => {
            checkMinArgs("And", args, 2);
            return [ "And", ...args.map((arg => {
                if (!isAbstractSqlQuery(arg)) throw new SyntaxError("Expected AbstractSqlQuery array but got " + typeof arg);
                return BooleanValue(arg);
            })) ];
        })),
        Or: tryMatches(Helper((args => 1 === args.length && getAbstractSqlQuery(args, 0))), Helper((args => {
            checkMinArgs("Or", args, 2);
            let maybeHelped = !1;
            const conditions = _.flatMap(args, (arg => {
                if (!isAbstractSqlQuery(arg)) throw new SyntaxError("Expected AbstractSqlQuery array but got " + typeof arg);
                if ("Or" === arg[0]) {
                    maybeHelped = !0;
                    return arg.slice(1);
                }
                return [ arg ];
            }));
            return !!maybeHelped && [ "Or", ...conditions ];
        })), Helper((args => {
            checkMinArgs("Or", args, 2);
            let maybeHelped = !1, containsTrue = !1;
            const conditions = args.filter((arg => {
                if ("Boolean" === arg[0]) {
                    if (!1 === arg[1]) {
                        maybeHelped = !0;
                        return !1;
                    }
                    !0 === arg[1] && (containsTrue = !0);
                }
                return !0;
            }));
            return containsTrue ? [ "Boolean", !0 ] : !!maybeHelped && [ "Or", ...conditions ];
        })), Helper((args => {
            checkMinArgs("Or", args, 2);
            const fieldBuckets = {}, others = [];
            let maybeHelped = !1;
            args.map((arg => {
                if (!isAbstractSqlQuery(arg)) throw new SyntaxError("Expected AbstractSqlQuery array but got " + typeof arg);
                if ("Equals" === arg[0]) {
                    const fieldBool = FieldEquals(arg.slice(1));
                    if (!1 !== fieldBool) {
                        const fieldRef = fieldBool[1];
                        if (null == fieldBuckets[fieldRef]) fieldBuckets[fieldRef] = [ fieldBool ]; else {
                            maybeHelped = !0;
                            fieldBuckets[fieldRef].push(fieldBool);
                        }
                        return;
                    }
                } else if ("In" === arg[0]) {
                    const fieldRef = arg[1];
                    if (null == fieldBuckets[fieldRef]) fieldBuckets[fieldRef] = [ arg ]; else {
                        maybeHelped = !0;
                        fieldBuckets[fieldRef].push(arg);
                    }
                    return;
                }
                others.push(arg);
            }));
            if (!maybeHelped) return !1;
            const fields = undefined;
            return [ "Or", ...Object.keys(fieldBuckets).map((fieldRef => {
                const fieldBucket = fieldBuckets[fieldRef];
                return 1 === fieldBucket.length ? fieldBucket[0] : [ "In", fieldBucket[0][1], ..._.flatMap(fieldBucket, (field => field.slice(2))) ];
            })), ...others ];
        })), (args => {
            checkMinArgs("Or", args, 2);
            return [ "Or", ...args.map((arg => {
                if (!isAbstractSqlQuery(arg)) throw new SyntaxError("Expected AbstractSqlQuery array but got " + typeof arg);
                return BooleanValue(arg);
            })) ];
        })),
        Bind: args => {
            if (noBinds) throw new SyntaxError("Cannot use a bind whilst they are disabled");
            if (1 !== args.length && 2 !== args.length) throw new SyntaxError('"Bind" requires 1/2 arg(s)');
            return [ "Bind", ...args ];
        },
        Text: Text,
        Value: Text,
        Date: matchArgs("Date", _.identity),
        Duration: args => {
            checkArgs("Duration", args, 1);
            let duration = args[0];
            if (null == duration || "object" != typeof duration) throw new SyntaxError("Duration must be an object, got " + typeof duration);
            duration = _(duration).pick("negative", "day", "hour", "minute", "second").omitBy(_.isNil).value();
            if (_(duration).omit("negative").isEmpty()) throw new SyntaxError("Invalid duration");
            return [ "Duration", duration ];
        },
        Exists: tryMatches(Helper((args => {
            checkArgs("Exists", args, 1);
            const arg = getAbstractSqlQuery(args, 0);
            return !!isNotNullable(arg) && [ "Boolean", !0 ];
        })), Helper((args => {
            checkArgs("Exists", args, 1);
            const arg = getAbstractSqlQuery(args, 0);
            return !!isEmptySelectQuery(arg) && [ "Boolean", !1 ];
        })), (args => {
            checkArgs("Exists", args, 1);
            const arg = getAbstractSqlQuery(args, 0), [type, ...rest] = arg;
            switch (type) {
              case "SelectQuery":
              case "UnionQuery":
                return [ "Exists", typeRules[type](rest) ];

              default:
                return [ "Exists", AnyValue(arg) ];
            }
        })),
        NotExists: tryMatches(Helper((args => {
            checkArgs("Exists", args, 1);
            const arg = getAbstractSqlQuery(args, 0);
            return !!isNotNullable(arg) && [ "Boolean", !1 ];
        })), Helper((args => {
            checkArgs("Exists", args, 1);
            const arg = getAbstractSqlQuery(args, 0);
            return !!isEmptySelectQuery(arg) && [ "Boolean", !0 ];
        })), (args => {
            checkArgs("NotExists", args, 1);
            const arg = getAbstractSqlQuery(args, 0), [type, ...rest] = arg;
            switch (type) {
              case "SelectQuery":
              case "UnionQuery":
                return [ "NotExists", typeRules[type](rest) ];

              default:
                return [ "NotExists", AnyValue(arg) ];
            }
        })),
        Not: tryMatches(Helper((args => {
            checkArgs("Not", args, 1);
            const [type, ...rest] = getAbstractSqlQuery(args, 0);
            switch (type) {
              case "Not":
                return BooleanValue(rest[0]);

              case "Equals":
                return typeRules.NotEquals(rest);

              case "NotEquals":
                return typeRules.Equals(rest);

              case "In":
                return typeRules.NotIn(rest);

              case "NotIn":
                return typeRules.In(rest);

              case "Exists":
                return typeRules.NotExists(rest);

              case "NotExists":
                return typeRules.Exists(rest);

              default:
                return !1;
            }
        })), matchArgs("Not", BooleanValue)),
        In: args => {
            checkMinArgs("In", args, 2);
            const field = undefined, vals = undefined;
            return [ "In", Field(getAbstractSqlQuery(args, 0)), ...args.slice(1).map((arg => {
                if (!isAbstractSqlQuery(arg)) throw new SyntaxError("Expected AbstractSqlQuery array but got " + typeof arg);
                return AnyValue(arg);
            })) ];
        },
        NotIn: args => {
            checkMinArgs("NotIn", args, 2);
            const field = undefined, vals = undefined;
            return [ "NotIn", Field(getAbstractSqlQuery(args, 0)), ...args.slice(1).map((arg => {
                if (!isAbstractSqlQuery(arg)) throw new SyntaxError("Expected AbstractSqlQuery array but got " + typeof arg);
                return AnyValue(arg);
            })) ];
        },
        InsertQuery: args => {
            const tables = [];
            let fields = [], values = [];
            const where = [];
            for (const arg of args) {
                if (!isAbstractSqlQuery(arg)) throw new SyntaxError("`InsertQuery` args must all be arrays");
                const [type, ...rest] = arg;
                switch (type) {
                  case "Fields":
                    if (0 !== fields.length) throw new SyntaxError(`'InsertQuery' can only accept one '${type}'`);
                    checkMinArgs("Update fields", rest, 1);
                    fields = [ arg ];
                    break;

                  case "Values":
                    if (0 !== values.length) throw new SyntaxError(`'InsertQuery' can only accept one '${type}'`);
                    const valuesArray = getAbstractSqlQuery(rest, 0);
                    if (valuesArray.length > 0) {
                        const [valuesType, ...valuesRest] = valuesArray;
                        switch (valuesType) {
                          case "SelectQuery":
                          case "UnionQuery":
                            values = [ [ "Values", typeRules[valuesType](valuesRest) ] ];
                            break;

                          default:
                            values = [ [ "Values", valuesArray.map(Value) ] ];
                        }
                    }
                    break;

                  case "From":
                    tables.push(typeRules[type](rest));
                    break;

                  case "Where":
                    break;

                  default:
                    throw new SyntaxError(`'InsertQuery' does not support '${type}'`);
                }
            }
            if (0 === tables.length) throw new SyntaxError("'InsertQuery' must have a From component");
            if (0 === fields.length) throw new SyntaxError("'InsertQuery' requires a Fields component");
            if (0 === values.length && 0 !== fields[0][1].length) throw new SyntaxError("'InsertQuery' requires Values component to be present if Fields are provided ");
            if (0 !== fields.length && 0 !== values.length && ![ "SelectQuery", "UnionQuery" ].includes(values[0][0]) && fields[0].length !== values[0].length) throw new SyntaxError("'InsertQuery' requires Fields and Values components to have the same length or use a query for Values");
            return [ "InsertQuery", ...tables, ...fields, ...values, ...where ];
        },
        UpdateQuery: args => {
            const tables = [];
            let fields = [], values = [], where = [];
            for (const arg of args) {
                if (!isAbstractSqlQuery(arg)) throw new SyntaxError("`UpdateQuery` args must all be arrays");
                const [type, ...rest] = arg;
                switch (type) {
                  case "Fields":
                    if (0 !== fields.length) throw new SyntaxError(`'UpdateQuery' can only accept one '${type}'`);
                    checkMinArgs("Update fields", rest, 1);
                    fields = [ arg ];
                    break;

                  case "Values":
                    if (0 !== values.length) throw new SyntaxError(`'UpdateQuery' can only accept one '${type}'`);
                    checkArgs("Update values", rest, 1);
                    const valuesArray = getAbstractSqlQuery(rest, 0);
                    checkMinArgs("Update values array", valuesArray, 1);
                    values = [ [ "Values", valuesArray.map(Value) ] ];
                    break;

                  case "From":
                    tables.push(typeRules[type](rest));
                    break;

                  case "Where":
                    if (0 !== where.length) throw new SyntaxError(`'UpdateQuery' can only accept one '${type}'`);
                    where = [ typeRules[type](rest) ];
                    break;

                  default:
                    throw new SyntaxError(`'UpdateQuery' does not support '${type}'`);
                }
            }
            if (0 === tables.length) throw new SyntaxError("'UpdateQuery' must have a From component");
            if (0 === fields.length) throw new SyntaxError("'UpdateQuery' requires a Fields component");
            if (0 === values.length) throw new SyntaxError("'UpdateQuery' requires a Values component");
            return [ "UpdateQuery", ...tables, ...fields, ...values, ...where ];
        },
        DeleteQuery: args => {
            const tables = [];
            let where = [];
            for (const arg of args) {
                if (!isAbstractSqlQuery(arg)) throw new SyntaxError("`DeleteQuery` args must all be arrays");
                const [type, ...rest] = arg;
                switch (type) {
                  case "From":
                    tables.push(typeRules[type](rest));
                    break;

                  case "Where":
                    if (0 !== where.length) throw new SyntaxError(`'DeleteQuery' can only accept one '${type}'`);
                    where = [ typeRules[type](rest) ];
                    break;

                  default:
                    throw new SyntaxError(`'DeleteQuery' does not support '${type}'`);
                }
            }
            if (0 === tables.length) throw new SyntaxError("'DeleteQuery' must have a From component");
            return [ "DeleteQuery", ...tables, ...where ];
        },
        Contains: rewriteMatch("Contains", [ TextValue, TextValue ], Helper((([haystack, needle]) => [ "Like", haystack, [ "Concatenate", [ "EmbeddedText", "%" ], escapeForLike(needle), [ "EmbeddedText", "%" ] ] ]))),
        Substringof: rewriteMatch("Substringof", [ TextValue, TextValue ], Helper((([needle, haystack]) => [ "Like", haystack, [ "Concatenate", [ "EmbeddedText", "%" ], escapeForLike(needle), [ "EmbeddedText", "%" ] ] ]))),
        Startswith: rewriteMatch("Startswith", [ TextValue, TextValue ], Helper((([haystack, needle]) => [ "Like", haystack, [ "Concatenate", escapeForLike(needle), [ "EmbeddedText", "%" ] ] ]))),
        Endswith: rewriteMatch("Endswith", [ TextValue, TextValue ], Helper((([haystack, needle]) => [ "Like", haystack, [ "Concatenate", [ "EmbeddedText", "%" ], escapeForLike(needle) ] ]))),
        IndexOf: rewriteMatch("IndexOf", [ TextValue, TextValue ], Helper((([haystack, needle]) => [ "Subtract", [ "StrPos", haystack, needle ], [ "Number", 1 ] ]))),
        Indexof: rewriteMatch("Indexof", [ TextValue, TextValue ], Helper((([haystack, needle]) => [ "Subtract", [ "StrPos", haystack, needle ], [ "Number", 1 ] ])))
    }, AbstractSQLOptimiser = (abstractSQL, $noBinds = !1) => {
        noBinds = $noBinds;
        do {
            helped = !1;
            const [type, ...rest] = abstractSQL;
            switch (type) {
              case "SelectQuery":
              case "UnionQuery":
              case "InsertQuery":
              case "UpdateQuery":
              case "DeleteQuery":
                abstractSQL = typeRules[type](rest);
                break;

              case "UpsertQuery":
                checkArgs("UpsertQuery", rest, 2);
                const insertQuery = getAbstractSqlQuery(rest, 0), updateQuery = getAbstractSqlQuery(rest, 1);
                if ("InsertQuery" !== insertQuery[0] || "UpdateQuery" !== updateQuery[0]) throw new SyntaxError("UpsertQuery must have [InsertQuery, UpdateQuery] provided");
                abstractSQL = [ "UpsertQuery", typeRules.InsertQuery(insertQuery.slice(1)), typeRules.UpdateQuery(updateQuery.slice(1)) ];
                break;

              default:
                abstractSQL = AnyValue(abstractSQL);
            }
        } while (helped);
        return abstractSQL;
    };
    exports.AbstractSQLOptimiser = AbstractSQLOptimiser;
}, function(module, exports, __webpack_require__) {
    var OMeta = __webpack_require__(9), _ = __webpack_require__(0), SBVRLibs = exports.SBVRLibs = OMeta._extend({});
    SBVRLibs.initialize = function() {
        this.currentVocabulary = "";
        this.vocabularies = {};
        this.factTypes = {};
    };
    SBVRLibs.ApplyFirstExisting = function(rules, ruleArgs) {
        null == ruleArgs && (ruleArgs = []);
        for (var i = 0; i < rules.length; i++) if (null != this[rules[i]]) return ruleArgs.length > 0 ? this._applyWithArgs.apply(this, [ rules[i] ].concat(ruleArgs)) : this._apply(rules[i]);
    };
    SBVRLibs.IdentifiersEqual = function(a, b) {
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
    };
    SBVRLibs.FollowConceptType = function(identifier) {
        var conceptTypes = this.vocabularies[identifier[2]].ConceptTypes;
        identifier = identifier.slice(0, 3);
        return !!conceptTypes.hasOwnProperty(identifier) && conceptTypes[identifier];
    };
    SBVRLibs.AddVocabulary = function(vocabulary, baseSynonym) {
        this.currentVocabulary = baseSynonym;
        this.vocabularies.hasOwnProperty(baseSynonym) || (this.vocabularies[baseSynonym] = {
            Term: {},
            Name: {},
            IdentifierChildren: {},
            ConceptTypes: {}
        });
        this.vocabularies.hasOwnProperty(vocabulary) || (this.vocabularies[vocabulary] = this.vocabularies[baseSynonym]);
    };
    var formatFactType = function(factType) {
        return factType.map((function(v) {
            return v[1];
        })).join(" ");
    };
    SBVRLibs.AddFactType = function(factType, realFactType) {
        for (var mappedFactType = [], matchingFactTypes = _.isEqual(factType, realFactType), i = 0; i < realFactType.length; i++) {
            var realFactTypePart = realFactType[i];
            mappedFactType[i] = realFactTypePart.slice(0, 3);
            if ("Verb" !== realFactTypePart[0]) if (matchingFactTypes) mappedFactType[i][3] = i; else {
                for (var mappingFound = !1, j = 0; j < factType.length; j++) {
                    var factTypePart = factType[j];
                    if ("Verb" !== factTypePart[0] && this.IdentifiersEqual(realFactTypePart, factTypePart) && realFactTypePart.length === factTypePart.length && (realFactTypePart.length < 4 || realFactTypePart[3][1] === factTypePart[3][1])) {
                        if (mappingFound) throw new Error('Ambiguous use of fact type "' + formatFactType(factType) + '", please add explicit numbering');
                        mappingFound = !0;
                        mappedFactType[i][3] = j;
                    }
                }
                if (!mappingFound) throw new Error('Unable to map identifiers for "' + formatFactType(factType) + '", please add explicit numbering');
            }
        }
        this._traverseFactType(factType, mappedFactType);
    };
    SBVRLibs._traverseFactType = function(factType, create) {
        var $elf = this, traverseRecurse = function(currentFactTypePart, remainingFactType, currentLevel) {
            if (null == currentFactTypePart) {
                create && (currentLevel.__valid = create);
                return currentLevel;
            }
            var finalLevel, finalLevels = {};
            switch (currentFactTypePart[0]) {
              case "Verb":
                currentFactTypePart = currentFactTypePart.slice(0, 2);
                break;

              default:
                currentFactTypePart = currentFactTypePart.slice(0, 3);
            }
            (currentLevel.hasOwnProperty(currentFactTypePart) || create && (currentLevel[currentFactTypePart] = {})) && !1 !== (finalLevel = traverseRecurse(remainingFactType[0], remainingFactType.slice(1), currentLevel[currentFactTypePart])) && Object.assign(finalLevels, finalLevel);
            if (!create && ("Term" === currentFactTypePart[0] || "Name" === currentFactTypePart[0])) for (;!1 !== (currentFactTypePart = $elf.FollowConceptType(currentFactTypePart)); ) currentLevel.hasOwnProperty(currentFactTypePart) && !1 !== (finalLevel = traverseRecurse(remainingFactType[0], remainingFactType.slice(1), currentLevel[currentFactTypePart])) && Object.assign(finalLevels, finalLevel);
            return !0 !== _.isEmpty(finalLevels) && finalLevels;
        };
        return traverseRecurse(factType[0], factType.slice(1), this.factTypes);
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var toPosInt = __webpack_require__(10);
    module.exports = function(optsLength, fnLength, isAsync) {
        var length;
        return isNaN(optsLength) ? (length = fnLength) >= 0 ? isAsync && length ? length - 1 : length : 1 : !1 !== optsLength && toPosInt(optsLength);
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var isValue = __webpack_require__(6), map = {
        function: !0,
        object: !0
    };
    module.exports = function(value) {
        return isValue(value) && map[typeof value] || !1;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var isValue = __webpack_require__(18), possibleTypes = {
        object: !0,
        function: !0,
        undefined: !0
    };
    module.exports = function(value) {
        return !!isValue(value) && hasOwnProperty.call(possibleTypes, typeof value);
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var numberIsNaN = __webpack_require__(155), toPosInt = __webpack_require__(10), value = __webpack_require__(4), indexOf = Array.prototype.indexOf, objHasOwnProperty = Object.prototype.hasOwnProperty, abs = Math.abs, floor = Math.floor;
    module.exports = function(searchElement) {
        var i, length, fromIndex, val;
        if (!numberIsNaN(searchElement)) return indexOf.apply(this, arguments);
        length = toPosInt(value(this).length);
        fromIndex = arguments[1];
        for (i = fromIndex = isNaN(fromIndex) ? 0 : fromIndex >= 0 ? floor(fromIndex) : toPosInt(this.length) - floor(abs(fromIndex)); i < length; ++i) if (objHasOwnProperty.call(this, i)) {
            val = this[i];
            if (numberIsNaN(val)) return i;
        }
        return -1;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var callable = __webpack_require__(2), forEach = __webpack_require__(25), call = Function.prototype.call;
    module.exports = function(obj, cb) {
        var result = {}, thisArg = arguments[2];
        callable(cb);
        forEach(obj, (function(value, key, targetObj, index) {
            result[key] = call.call(cb, thisArg, value, key, targetObj, index);
        }));
        return result;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var ensureCallable = function(fn) {
        if ("function" != typeof fn) throw new TypeError(fn + " is not a function");
        return fn;
    }, byObserver = function(Observer) {
        var node = document.createTextNode(""), queue, currentQueue, i = 0;
        new Observer((function() {
            var callback;
            if (queue) currentQueue && (queue = currentQueue.concat(queue)); else {
                if (!currentQueue) return;
                queue = currentQueue;
            }
            currentQueue = queue;
            queue = null;
            if ("function" != typeof currentQueue) {
                node.data = i = ++i % 2;
                for (;currentQueue; ) {
                    callback = currentQueue.shift();
                    currentQueue.length || (currentQueue = null);
                    callback();
                }
            } else {
                callback = currentQueue;
                currentQueue = null;
                callback();
            }
        })).observe(node, {
            characterData: !0
        });
        return function(fn) {
            ensureCallable(fn);
            if (queue) "function" == typeof queue ? queue = [ queue, fn ] : queue.push(fn); else {
                queue = fn;
                node.data = i = ++i % 2;
            }
        };
    };
    module.exports = function() {
        if ("object" == typeof process && process && "function" == typeof process.nextTick) return process.nextTick;
        if ("function" == typeof queueMicrotask) return function(cb) {
            queueMicrotask(ensureCallable(cb));
        };
        if ("object" == typeof document && document) {
            if ("function" == typeof MutationObserver) return byObserver(MutationObserver);
            if ("function" == typeof WebKitMutationObserver) return byObserver(WebKitMutationObserver);
        }
        return "function" == typeof setImmediate ? function(cb) {
            setImmediate(ensureCallable(cb));
        } : "function" == typeof setTimeout || "object" == typeof setTimeout ? function(cb) {
            setTimeout(ensureCallable(cb), 0);
        } : null;
    }();
}, function(module, exports) {
    module.exports = function deepFreeze(o) {
        Object.freeze(o);
        Object.getOwnPropertyNames(o).forEach((function(prop) {
            !o.hasOwnProperty(prop) || null === o[prop] || "object" != typeof o[prop] && "function" != typeof o[prop] || Object.isFrozen(o[prop]) || deepFreeze(o[prop]);
        }));
        return o;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = __webpack_require__(69)() ? Object.setPrototypeOf : __webpack_require__(70);
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.connect = exports.Tx = exports.engines = exports.ReadOnlyViolationError = exports.TransactionClosedError = exports.CheckConstraintError = exports.ForeignKeyConstraintError = exports.UniqueConstraintError = exports.ConstraintError = exports.DatabaseError = exports.metrics = void 0;
    const Bluebird = __webpack_require__(21), EventEmitter = __webpack_require__(77), _ = __webpack_require__(0), typed_error_1 = __webpack_require__(34), env = __webpack_require__(12);
    exports.metrics = new EventEmitter;
    const isSqlError = value => null != value && null != value.constructor && "SQLError" === value.constructor.name;
    class DatabaseError extends typed_error_1.TypedError {
        constructor(message) {
            isSqlError(message) ? super(message.message) : super(message);
            null != message && "string" != typeof message && null != message.code && (this.code = message.code);
        }
    }
    exports.DatabaseError = DatabaseError;
    class ConstraintError extends DatabaseError {}
    exports.ConstraintError = ConstraintError;
    class UniqueConstraintError extends ConstraintError {}
    exports.UniqueConstraintError = UniqueConstraintError;
    class ForeignKeyConstraintError extends ConstraintError {}
    exports.ForeignKeyConstraintError = ForeignKeyConstraintError;
    class CheckConstraintError extends ConstraintError {}
    exports.CheckConstraintError = CheckConstraintError;
    class TransactionClosedError extends DatabaseError {}
    exports.TransactionClosedError = TransactionClosedError;
    class ReadOnlyViolationError extends DatabaseError {}
    exports.ReadOnlyViolationError = ReadOnlyViolationError;
    const wrapDatabaseError = err => {
        exports.metrics.emit("db_error", err);
        return err instanceof DatabaseError ? err : new DatabaseError(err);
    }, alwaysExport = {
        DatabaseError: DatabaseError,
        ConstraintError: ConstraintError,
        UniqueConstraintError: UniqueConstraintError,
        ForeignKeyConstraintError: ForeignKeyConstraintError,
        CheckConstraintError: CheckConstraintError,
        TransactionClosedError: TransactionClosedError,
        ReadOnlyViolationError: ReadOnlyViolationError
    };
    exports.engines = {};
    const atomicExecuteSql = async function(sql, bindings) {
        return await this.transaction((async tx => await tx.executeSql(sql, bindings)));
    }, asyncTryFn = fn => {
        Promise.resolve().then(fn);
    }, getRejectedFunctions = env.DEBUG ? message => {
        const rejectionValue = new TransactionClosedError(message), rejectFn = async () => {
            throw rejectionValue;
        };
        return {
            executeSql: rejectFn,
            rollback: rejectFn
        };
    } : message => {
        const rejectFn = async () => {
            throw new TransactionClosedError(message);
        };
        return {
            executeSql: rejectFn,
            rollback: rejectFn
        };
    }, onEnd = (name, fn) => {
        "end" === name && asyncTryFn(fn);
    }, onRollback = (name, fn) => {
        "rollback" === name && asyncTryFn(fn);
    };
    class AutomaticClose {
        constructor(tx, stackTraceErr) {
            this.stackTraceErr = stackTraceErr;
            this.pending = 0;
            this.automaticClose = () => {
                console.error(`Transaction still open after ${env.db.timeoutMS}ms without an execute call.`);
                this.stackTraceErr && console.error(this.stackTraceErr.stack);
                tx.rollback();
            };
            this.automaticCloseTimeout = setTimeout(this.automaticClose, env.db.timeoutMS);
        }
        incrementPending() {
            if (!1 !== this.pending) {
                this.pending++;
                clearTimeout(this.automaticCloseTimeout);
            }
        }
        decrementPending() {
            if (!1 !== this.pending) {
                this.pending--;
                if (0 === this.pending) this.automaticCloseTimeout = setTimeout(this.automaticClose, env.db.timeoutMS); else if (this.pending < 0) {
                    console.error("Pending transactions is less than 0, wtf?");
                    this.pending = 0;
                }
            }
        }
        cancelPending() {
            this.pending = !1;
            clearTimeout(this.automaticCloseTimeout);
        }
    }
    class Tx {
        constructor(readOnly, stackTraceErr) {
            this.readOnly = readOnly;
            this.closed = !1;
            this.listeners = {
                end: [],
                rollback: []
            };
            this.automaticClose = stackTraceErr instanceof AutomaticClose ? stackTraceErr : new AutomaticClose(this, stackTraceErr);
        }
        closeTransaction(message) {
            this.automaticClose.cancelPending();
            const {executeSql: executeSql, rollback: rollback} = getRejectedFunctions(message);
            this.executeSql = executeSql;
            this.rollback = this.end = rollback;
            this.closed = !0;
        }
        isClosed() {
            return this.closed;
        }
        asReadOnly() {
            return this.readOnly ? this : this.clone(!0);
        }
        isReadOnly() {
            return this.readOnly;
        }
        async executeSql(sql, bindings = [], ...args) {
            if (this.readOnly && !/^\s*SELECT\s(?:[^;]|;\s*SELECT\s)*$/.test(sql)) throw new ReadOnlyViolationError(`Attempted to run a non-SELECT statement in a read-only tx: ${sql}`);
            return await this.$executeSql(sql, bindings, ...args);
        }
        async $executeSql(sql, bindings = [], ...args) {
            this.automaticClose.incrementPending();
            const t0 = Date.now();
            try {
                return await this._executeSql(sql, bindings, ...args);
            } catch (err) {
                throw wrapDatabaseError(err);
            } finally {
                this.automaticClose.decrementPending();
                const queryTime = Date.now() - t0;
                exports.metrics.emit("db_query_time", {
                    queryTime: queryTime,
                    queryType: sql.split(" ", 1)[0]
                });
            }
        }
        async rollback() {
            try {
                const promise = this._rollback();
                this.closeTransaction("Transaction has been rolled back.");
                await promise;
            } finally {
                this.listeners.rollback.forEach(asyncTryFn);
                this.on = onRollback;
                this.clearListeners();
            }
        }
        async end() {
            const promise = this._commit();
            this.closeTransaction("Transaction has been ended.");
            await promise;
            this.listeners.end.forEach(asyncTryFn);
            this.on = onEnd;
            this.clearListeners();
        }
        on(name, fn) {
            this.listeners[name].push(fn);
        }
        clearListeners() {
            this.listeners.end.length = 0;
            this.listeners.rollback.length = 0;
        }
        async dropTable(tableName, ifExists = !0) {
            if ("string" != typeof tableName) throw new TypeError('"tableName" must be a string');
            if (tableName.includes('"')) throw new TypeError('"tableName" cannot include double quotes');
            if (this.readOnly) throw new ReadOnlyViolationError("Cannot drop tables in a read-only transaction");
            const ifExistsStr = !0 === ifExists ? " IF EXISTS" : "";
            return await this.$executeSql(`DROP TABLE${ifExistsStr} "${tableName}";`);
        }
    }
    exports.Tx = Tx;
    const getStackTraceErr = env.DEBUG ? () => new Error : _.noop, createTransaction = createFunc => async fn => {
        const stackTraceErr = getStackTraceErr();
        let tx;
        try {
            tx = await createFunc(stackTraceErr);
        } catch (err) {
            throw wrapDatabaseError(err);
        }
        if (!fn) return tx;
        try {
            const result = await fn(tx);
            await tx.end();
            return result;
        } catch (err) {
            try {
                await tx.rollback();
            } catch (_a) {}
            throw err;
        }
    };
    let maybePg, maybeMysql;
    try {
        maybePg = __webpack_require__(78);
    } catch (e) {}
    if (null != maybePg) {
        const pg = maybePg;
        exports.engines.postgres = connectString => {
            const PG_UNIQUE_VIOLATION = "23505", PG_FOREIGN_KEY_VIOLATION = "23503", PG_CHECK_CONSTRAINT_VIOLATION = "23514";
            let config;
            if ("string" == typeof connectString) {
                const pgConnectionString = undefined;
                config = __webpack_require__(79).parse(connectString);
            } else config = connectString;
            config.max = env.db.poolSize;
            config.idleTimeoutMillis = env.db.idleTimeoutMillis;
            config.statement_timeout = env.db.statementTimeout;
            config.query_timeout = env.db.queryTimeout;
            config.connectionTimeoutMillis = env.db.connectionTimeoutMillis;
            config.keepAlive = env.db.keepAlive;
            const pool = new pg.Pool(config), {PG_SCHEMA: PG_SCHEMA} = process.env;
            if (null != PG_SCHEMA) {
                pool.on("connect", (client => {
                    client.query({
                        text: `SET search_path TO "${PG_SCHEMA}"`
                    });
                }));
                pool.on("error", (err => {
                    console.error("Pool error:", err.message);
                }));
            }
            const createResult = ({rowCount: rowCount, rows: rows}) => {
                var _a;
                return {
                    rows: rows,
                    rowsAffected: rowCount,
                    insertId: null === (_a = null == rows ? void 0 : rows[0]) || void 0 === _a ? void 0 : _a.id
                };
            };
            class PostgresTx extends Tx {
                constructor(db, readOnly, stackTraceErr) {
                    super(readOnly, stackTraceErr);
                    this.db = db;
                }
                clone(readOnly = this.readOnly) {
                    return new PostgresTx(this.db, readOnly, this.automaticClose);
                }
                async _executeSql(sql, bindings, addReturning = !1) {
                    addReturning && /^\s*(?:INSERT\s+INTO|UPDATE|DELETE)/i.test(sql) && (sql = sql.replace(/;?$/, ' RETURNING "' + addReturning + '";'));
                    let result;
                    try {
                        result = await this.db.query({
                            text: sql,
                            values: bindings
                        });
                    } catch (err) {
                        if ("23505" === err.code) throw new UniqueConstraintError(err);
                        if ("23503" === err.code) throw new ForeignKeyConstraintError(err);
                        if ("23514" === err.code) throw new CheckConstraintError(err);
                        throw err;
                    }
                    return createResult(result);
                }
                async _rollback() {
                    try {
                        const queryQueue = this.db.queryQueue;
                        if (queryQueue.length > 0) {
                            const err = new DatabaseError("Rolling back transaction");
                            queryQueue.forEach((query => {
                                process.nextTick((() => {
                                    query.handleError(err, this.db.connection);
                                }));
                            }));
                            queryQueue.length = 0;
                        }
                        await Bluebird.resolve(this.$executeSql("ROLLBACK;")).timeout(env.db.rollbackTimeout, "Rolling back transaction timed out");
                        this.db.release();
                    } catch (err) {
                        err = wrapDatabaseError(err);
                        this.db.release(err);
                        throw err;
                    }
                }
                async _commit() {
                    try {
                        await this.$executeSql("COMMIT;");
                        this.db.release();
                    } catch (err) {
                        this.db.release(err);
                        throw err;
                    }
                }
                async tableList(extraWhereClause = "") {
                    "" !== extraWhereClause && (extraWhereClause = "WHERE " + extraWhereClause);
                    return await this.executeSql(`\n\t\t\t\t\tSELECT *\n\t\t\t\t\tFROM (\n\t\t\t\t\t\tSELECT tablename as name\n\t\t\t\t\t\tFROM pg_tables\n\t\t\t\t\t\tWHERE schemaname = 'public'\n\t\t\t\t\t) t ${extraWhereClause};\n\t\t\t\t`);
                }
            }
            return {
                engine: "postgres",
                executeSql: atomicExecuteSql,
                transaction: createTransaction((async stackTraceErr => {
                    const client = await pool.connect(), tx = new PostgresTx(client, !1, stackTraceErr);
                    tx.executeSql("START TRANSACTION;");
                    return tx;
                })),
                readTransaction: createTransaction((async stackTraceErr => {
                    const client = await pool.connect(), tx = new PostgresTx(client, !1, stackTraceErr);
                    tx.executeSql("START TRANSACTION READ ONLY;");
                    return tx.asReadOnly();
                })),
                ...alwaysExport
            };
        };
    }
    try {
        maybeMysql = __webpack_require__(81);
    } catch (e) {}
    if (null != maybeMysql) {
        const mysql = maybeMysql;
        exports.engines.mysql = options => {
            const MYSQL_UNIQUE_VIOLATION = "ER_DUP_ENTRY", MYSQL_FOREIGN_KEY_VIOLATION = "ER_ROW_IS_REFERENCED", MYSQL_CHECK_CONSTRAINT_VIOLATION = "ER_CHECK_CONSTRAINT_VIOLATED", pool = mysql.createPool(options);
            pool.on("connection", (db => {
                db.query("SET sql_mode='ANSI_QUOTES';");
            }));
            const getConnectionAsync = Bluebird.promisify(pool.getConnection, {
                context: pool
            }), createResult = rows => ({
                rows: rows,
                rowsAffected: rows.affectedRows,
                insertId: rows.insertId
            });
            class MySqlTx extends Tx {
                constructor(db, close, readOnly, stackTraceErr) {
                    super(readOnly, stackTraceErr);
                    this.db = db;
                    this.close = close;
                }
                clone(readOnly = this.readOnly) {
                    return new MySqlTx(this.db, this.close, readOnly, this.automaticClose);
                }
                async _executeSql(sql, bindings) {
                    let result;
                    try {
                        result = await Bluebird.fromCallback((callback => {
                            this.db.query(sql, bindings, callback);
                        }));
                    } catch (err) {
                        if ("ER_DUP_ENTRY" === err.code) throw new UniqueConstraintError(err);
                        if ("ER_ROW_IS_REFERENCED" === err.code) throw new ForeignKeyConstraintError(err);
                        if ("ER_CHECK_CONSTRAINT_VIOLATED" === err.code) throw new CheckConstraintError(err);
                        throw err;
                    }
                    return createResult(result);
                }
                async _rollback() {
                    const promise = this.$executeSql("ROLLBACK;");
                    this.close();
                    await promise;
                }
                async _commit() {
                    const promise = this.$executeSql("COMMIT;");
                    this.close();
                    await promise;
                }
                async tableList(extraWhereClause = "") {
                    "" !== extraWhereClause && (extraWhereClause = " WHERE " + extraWhereClause);
                    return await this.executeSql(`\n\t\t\t\t\tSELECT name\n\t\t\t\t\tFROM (\n\t\t\t\t\t\tSELECT table_name AS name\n\t\t\t\t\t\tFROM information_schema.tables\n\t\t\t\t\t\tWHERE table_schema = ?\n\t\t\t\t\t) t ${extraWhereClause};\n\t\t\t\t`, [ options.database ]);
                }
            }
            return {
                engine: "mysql",
                executeSql: atomicExecuteSql,
                transaction: createTransaction((async stackTraceErr => {
                    const client = await getConnectionAsync(), close = () => client.release(), tx = new MySqlTx(client, close, !1, stackTraceErr);
                    tx.executeSql("START TRANSACTION;");
                    return tx;
                })),
                readTransaction: createTransaction((async stackTraceErr => {
                    const client = await getConnectionAsync(), close = () => client.release(), tx = new MySqlTx(client, close, !1, stackTraceErr);
                    tx.executeSql("START TRANSACTION READ ONLY;");
                    return tx.asReadOnly();
                })),
                ...alwaysExport
            };
        };
    }
    "undefined" != typeof window && null != window.openDatabase && (exports.engines.websql = databaseName => {
        const WEBSQL_CONSTRAINT_ERR = 6, db = window.openDatabase(databaseName, "1.0", "rulemotion", 2097152), getInsertId = result => {
            try {
                return result.insertId;
            } catch (e) {}
        }, createResult = result => {
            const {length: length} = result.rows, rows = Array(length);
            for (let i = 0; i < length; i++) rows[i] = result.rows.item(i);
            return {
                rows: rows,
                rowsAffected: result.rowsAffected,
                insertId: getInsertId(result)
            };
        };
        class WebSqlTx extends Tx {
            constructor(tx, readOnly, stackTraceErr) {
                super(readOnly, stackTraceErr);
                this.tx = tx;
            }
            clone(readOnly = this.readOnly) {
                return new WebSqlTx(this.tx, readOnly, this.automaticClose);
            }
            async _executeSql(sql, bindings) {
                let result;
                try {
                    result = await this.tx.executeSql(sql, bindings);
                } catch (err) {
                    if (6 === err.code) throw new ConstraintError("Constraint failed.");
                    throw err;
                }
                return createResult(result);
            }
            async _rollback() {
                return await this.tx.rollback();
            }
            async _commit() {
                this.tx.commit();
            }
            async tableList(extraWhereClause = "") {
                "" !== extraWhereClause && (extraWhereClause = " AND " + extraWhereClause);
                return await this.executeSql(`\n\t\t\t\t\tSELECT name, sql\n\t\t\t\t\tFROM sqlite_master\n\t\t\t\t\tWHERE type='table'\n\t\t\t\t\tAND name NOT IN (\n\t\t\t\t\t\t'__WebKitDatabaseInfoTable__',\n\t\t\t\t\t\t'sqlite_sequence'\n\t\t\t\t\t)\n\t\t\t\t\t${extraWhereClause};\n\t\t\t\t`);
            }
        }
        class WebSqlWrapper {
            constructor(tx) {
                this.tx = tx;
                this.running = !0;
                this.queue = [];
                this.asyncRecurse = () => {
                    let args;
                    for (;args = this.queue.pop(); ) {
                        console.debug("Running", args[0]);
                        this.tx.executeSql(args[0], args[1], args[2], args[3]);
                    }
                    if (this.running) {
                        console.debug("Looping");
                        this.tx.executeSql("SELECT 0", [], this.asyncRecurse);
                    }
                };
                this.asyncRecurse();
            }
            async executeSql(sql, bindings) {
                return await new Promise(((resolve, reject) => {
                    const successCallback = (_tx, results) => {
                        resolve(results);
                    }, errorCallback = (_tx, err) => {
                        reject(err);
                        return !1;
                    };
                    this.queue.push([ sql, bindings, successCallback, errorCallback ]);
                }));
            }
            async rollback() {
                return await new Promise((resolve => {
                    const successCallback = () => {
                        resolve();
                        throw new Error("Rollback");
                    }, errorCallback = () => {
                        resolve();
                        return !0;
                    };
                    this.queue = [ [ "RUN A FAILING STATEMENT TO ROLLBACK", [], successCallback, errorCallback ] ];
                    this.running = !1;
                }));
            }
            commit() {
                this.running = !1;
            }
        }
        return {
            engine: "websql",
            executeSql: atomicExecuteSql,
            transaction: createTransaction((stackTraceErr => new Promise((resolve => {
                db.transaction((tx => {
                    resolve(new WebSqlTx(new WebSqlWrapper(tx), !1, stackTraceErr));
                }));
            })))),
            readTransaction: createTransaction((stackTraceErr => new Promise((resolve => {
                db.transaction((tx => {
                    resolve(new WebSqlTx(new WebSqlWrapper(tx), !0, stackTraceErr));
                }));
            })))),
            ...alwaysExport
        };
    });
    const connect = databaseOptions => {
        if (null == exports.engines[databaseOptions.engine]) throw new Error("Unsupported database engine: " + databaseOptions.engine);
        return exports.engines[databaseOptions.engine](databaseOptions.params);
    };
    exports.connect = connect;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.AbstractSQLRules2SQL = exports.checkMinArgs = exports.checkArgs = exports.getAbstractSqlQuery = exports.isAbstractSqlQuery = exports.isNotNullable = exports.isFieldValue = exports.isDurationValue = exports.isJSONValue = exports.isDateValue = exports.isBooleanValue = exports.isNumericValue = exports.isTextValue = exports.comparisons = void 0;
    const _ = __webpack_require__(0), sbvrTypes = __webpack_require__(13);
    let fieldOrderings = [], fieldOrderingsLookup = {}, engine = "postgres", noBinds = !1;
    exports.comparisons = {
        Equals: " = ",
        GreaterThan: " > ",
        GreaterThanOrEqual: " >= ",
        LessThan: " < ",
        LessThanOrEqual: " <= ",
        NotEquals: " != ",
        Like: " LIKE "
    };
    const NestedIndent = indent => indent + "\t", escapeField = field => "*" === field ? "*" : `"${field}"`, AnyValue = (args, indent) => {
        const [type, ...rest] = args;
        if ("Case" === type) return typeRules[type](rest, indent);
        for (const matcher of [ exports.isJSONValue, exports.isDateValue, exports.isTextValue, exports.isNumericValue, exports.isBooleanValue, exports.isDurationValue ]) if (matcher(type)) return typeRules[type](rest, indent);
        return UnknownValue(args, indent);
    }, UnknownValue = (args, indent) => {
        const [type, ...rest] = args;
        switch (type) {
          case "Null":
          case "Field":
          case "ReferencedField":
          case "Bind":
          case "Cast":
          case "Coalesce":
            return typeRules[type](rest, indent);

          case "SelectQuery":
          case "UnionQuery":
            const nestedIndent = NestedIndent(indent), query = undefined;
            return "(" + nestedIndent + typeRules[type](rest, nestedIndent) + indent + ")";

          default:
            throw new Error(`Invalid "UnknownValue" type: ${type}`);
        }
    }, MatchValue = matcher => (args, indent) => {
        const [type, ...rest] = args;
        return matcher(type) ? typeRules[type](rest, indent) : UnknownValue(args, indent);
    }, isTextValue = type => "Value" === type || "Text" === type || "EmbeddedText" === type || "Concatenate" === type || "Lower" === type || "Upper" === type || "Trim" === type || "Replace" === type || "Substring" === type || "Right" === type;
    exports.isTextValue = isTextValue;
    const TextValue = MatchValue(exports.isTextValue), isNumericValue = type => "Number" === type || "Real" === type || "Integer" === type || "Add" === type || "Subtract" === type || "Multiply" === type || "Divide" === type || "BitwiseAnd" === type || "BitwiseShiftRight" === type || "CharacterLength" === type || "StrPos" === type || "Year" === type || "Month" === type || "Day" === type || "Hour" === type || "Minute" === type || "Second" === type || "Fractionalseconds" === type || "Totalseconds" === type || "Round" === type || "Floor" === type || "Ceiling" === type || "Count" === type || "Average" === type || "Sum" === type;
    exports.isNumericValue = isNumericValue;
    const NumericValue = MatchValue(exports.isNumericValue), isBooleanValue = type => "Boolean" === type || "Not" === type || "And" === type || "Or" === type || "Exists" === type || "NotExists" === type || "Between" === type || "In" === type || "NotIn" === type || "Equals" === type || "GreaterThan" === type || "GreaterThanOrEqual" === type || "LessThan" === type || "LessThanOrEqual" === type || "NotEquals" === type || "Like" === type || "IsNotDistinctFrom" === type || "IsDistinctFrom" === type;
    exports.isBooleanValue = isBooleanValue;
    const BooleanValue = MatchValue(exports.isBooleanValue), isDateValue = type => "Date" === type || "ToDate" === type || "ToTime" === type || "Now" === type;
    exports.isDateValue = isDateValue;
    const DateValue = MatchValue(exports.isDateValue), isJSONValue = type => "AggregateJSON" === type;
    exports.isJSONValue = isJSONValue;
    const isDurationValue = type => "Duration" === type;
    exports.isDurationValue = isDurationValue;
    const DurationValue = MatchValue(exports.isDurationValue), isFieldValue = type => "Field" === type || "ReferencedField" === type;
    exports.isFieldValue = isFieldValue;
    const Field = (args, indent) => {
        const [type, ...rest] = args;
        if (exports.isFieldValue(type)) return typeRules[type](rest, indent);
        throw new SyntaxError(`Invalid field type: ${type}`);
    }, isNotNullable = node => {
        switch (node[0]) {
          case "EmbeddedText":
          case "Boolean":
          case "Bind":
          case "Value":
          case "Text":
          case "Date":
          case "Number":
          case "Real":
          case "Integer":
          case "IsDistinctFrom":
          case "IsNotDistinctFrom":
          case "Exists":
          case "NotExists":
            return !0;

          case "Coalesce":
            return node.slice(1).some((n => exports.isNotNullable(n)));

          case "Not":
            return exports.isNotNullable(node[1]);
        }
        return !1;
    };
    exports.isNotNullable = isNotNullable;
    const isNotDistinctFrom = (args, indent) => {
        const a = exports.getAbstractSqlQuery(args, 0), b = exports.getAbstractSqlQuery(args, 1), aSql = AnyValue(a, indent), bSql = AnyValue(b, indent);
        if ("postgres" === engine) {
            const aIsNotNullable = exports.isNotNullable(a), bIsNotNullable = exports.isNotNullable(b);
            if (aIsNotNullable && bIsNotNullable) return `${aSql} = ${bSql}`;
            const isNotNullChecks = [];
            aIsNotNullable || isNotNullChecks.push(`(${aSql}) IS NOT NULL`);
            bIsNotNullable || isNotNullChecks.push(`(${bSql}) IS NOT NULL`);
            const orBothNull = aIsNotNullable || bIsNotNullable ? "" : ` OR (${aSql}) IS NULL AND (${bSql}) IS NULL`;
            return `${isNotNullChecks.join(" AND ")} AND (${aSql}) = (${bSql})${orBothNull}`;
        }
        if ("mysql" === engine) return aSql + " <=> " + bSql;
        if ("websql" === engine) return aSql + " IS " + bSql;
        throw new SyntaxError("IsDistinctFrom/IsNotDistinctFrom not supported on: " + engine);
    }, isAbstractSqlQuery = x => Array.isArray(x);
    exports.isAbstractSqlQuery = isAbstractSqlQuery;
    const getAbstractSqlQuery = (args, index) => {
        const abstractSqlQuery = args[index];
        if (!exports.isAbstractSqlQuery(abstractSqlQuery)) throw new SyntaxError("Expected AbstractSqlQuery array but got " + typeof abstractSqlQuery);
        return abstractSqlQuery;
    };
    exports.getAbstractSqlQuery = getAbstractSqlQuery;
    const Comparison = comparison => (args, indent) => {
        exports.checkArgs(comparison, args, 2);
        const a = AnyValue(exports.getAbstractSqlQuery(args, 0), indent), b = AnyValue(exports.getAbstractSqlQuery(args, 1), indent);
        return a + exports.comparisons[comparison] + b;
    }, NumberMatch = type => args => {
        exports.checkArgs(type, args, 1);
        const n = args[0];
        if ("number" != typeof n) throw new SyntaxError(`${type} expected number but got ${typeof n}`);
        return `${n}`;
    }, JoinMatch = joinType => {
        let sqlJoinType;
        switch (joinType) {
          case "Join":
            sqlJoinType = "JOIN ";
            break;

          case "LeftJoin":
            sqlJoinType = "LEFT JOIN ";
            break;

          case "RightJoin":
            sqlJoinType = "RIGHT JOIN ";
            break;

          case "FullJoin":
            sqlJoinType = "FULL JOIN ";
            break;

          case "CrossJoin":
            sqlJoinType = "CROSS JOIN ";
            break;

          default:
            throw new Error(`Unknown join type: '${joinType}'`);
        }
        return (args, indent) => {
            if (1 !== args.length && 2 !== args.length) throw new SyntaxError(`"${joinType}" requires 1/2 arg(s)`);
            const from = MaybeAlias(exports.getAbstractSqlQuery(args, 0), indent, FromMatch);
            if (1 === args.length) return sqlJoinType + from;
            const [type, ...rest] = exports.getAbstractSqlQuery(args, 1);
            switch (type) {
              case "On":
                exports.checkArgs("On", rest, 1);
                const ruleBody = BooleanValue(exports.getAbstractSqlQuery(rest, 0), NestedIndent(indent));
                return sqlJoinType + from + " ON " + ruleBody;

              default:
                throw new SyntaxError(`'${joinType}' clause does not support '${type}' clause`);
            }
        };
    }, mathOps = {
        Add: "+",
        Subtract: "-",
        Multiply: "*",
        Divide: "/"
    }, MathOp = type => (args, indent) => {
        exports.checkArgs(type, args, 2);
        const a = NumericValue(exports.getAbstractSqlQuery(args, 0), indent), b = NumericValue(exports.getAbstractSqlQuery(args, 1), indent);
        return `${a} ${mathOps[type]} ${b}`;
    }, fractionalSecondsFormat = function(date) {
        return this.Totalseconds(date) + " - " + this.Second(date);
    }, websqlBasicDateFormat = format => date => `STRFTIME('${format}', ${date})`, websqlDateFormats = {
        Year: websqlBasicDateFormat("%Y"),
        Month: websqlBasicDateFormat("%m"),
        Day: websqlBasicDateFormat("%d"),
        Hour: websqlBasicDateFormat("%H"),
        Minute: websqlBasicDateFormat("%M"),
        Second: websqlBasicDateFormat("%S"),
        Fractionalseconds: fractionalSecondsFormat,
        Totalseconds: websqlBasicDateFormat("%f")
    }, basicDateFormat = function(part) {
        return date => `EXTRACT('${part}' FROM ${date})`;
    }, dateFormats = {
        Year: basicDateFormat("YEAR"),
        Month: basicDateFormat("MONTH"),
        Day: basicDateFormat("DAY"),
        Hour: basicDateFormat("HOUR"),
        Minute: basicDateFormat("MINUTE"),
        Second: date => `FLOOR(${dateFormats.Totalseconds(date)})`,
        Fractionalseconds: fractionalSecondsFormat,
        Totalseconds: basicDateFormat("SECOND")
    }, ExtractNumericDatePart = type => (args, indent) => {
        exports.checkArgs(type, args, 1);
        const date = DateValue(exports.getAbstractSqlQuery(args, 0), indent);
        return "websql" === engine ? websqlDateFormats[type](date) : dateFormats[type](date);
    }, Text = args => {
        exports.checkArgs("Text", args, 1);
        return noBinds ? `'${args[0]}'` : AddBind([ "Text", args[0] ]);
    }, checkArgs = (matchName, args, num) => {
        if (args.length !== num) throw new SyntaxError(`"${matchName}" requires ${num} arg(s)`);
    };
    exports.checkArgs = checkArgs;
    const checkMinArgs = (matchName, args, num) => {
        if (args.length < num) throw new SyntaxError(`"${matchName}" requires at least ${num} arg(s)`);
    };
    exports.checkMinArgs = checkMinArgs;
    const Value = (arg, indent) => {
        switch (arg) {
          case !0:
            return "1";

          case !1:
            return "0";

          case "Default":
            return "DEFAULT";

          default:
            const [type, ...rest] = arg;
            switch (type) {
              case "Null":
              case "Bind":
              case "Value":
              case "Text":
              case "Number":
              case "Real":
              case "Integer":
                return typeRules[type](rest, indent);

              default:
                throw new SyntaxError(`Invalid type for Value ${type}`);
            }
        }
    }, SelectMatch = (args, indent) => {
        const [type, ...rest] = args;
        switch (type) {
          case "Count":
            return typeRules[type](rest, indent);

          default:
            return AnyValue(args, indent);
        }
    }, FromMatch = (args, indent) => {
        const [type, ...rest] = args;
        switch (type) {
          case "SelectQuery":
          case "UnionQuery":
            const nestedindent = NestedIndent(indent), query = undefined;
            return "(" + nestedindent + typeRules[type](rest, nestedindent) + indent + ")";

          case "Table":
            exports.checkArgs("Table", rest, 1);
            const [table] = rest;
            if ("string" != typeof table) throw new SyntaxError("`Table` table must be a string");
            return escapeField(table);

          default:
            throw new SyntaxError(`From does not support ${type}`);
        }
    }, MaybeAlias = (args, indent, matchFn) => {
        const [type, ...rest] = args;
        switch (type) {
          case "Alias":
            exports.checkArgs("Alias", rest, 2);
            const field = undefined;
            return `${matchFn(exports.getAbstractSqlQuery(rest, 0), indent)} AS "${rest[1]}"`;

          default:
            return matchFn(args, indent);
        }
    }, AddBind = bind => {
        if (noBinds) throw new SyntaxError("Cannot use a bind whilst they are disabled");
        if ("postgres" === engine) {
            if ("Bind" === bind[0]) {
                const key = JSON.stringify(bind[1]), existingBindIndex = fieldOrderingsLookup[key];
                if (null != existingBindIndex) return "$" + existingBindIndex;
                const nextID = fieldOrderings.push(bind);
                fieldOrderingsLookup[key] = nextID;
                return "$" + nextID;
            }
            return "$" + fieldOrderings.push(bind);
        }
        fieldOrderings.push(bind);
        return "?";
    }, typeRules = {
        UnionQuery: (args, indent) => {
            exports.checkMinArgs("UnionQuery", args, 2);
            return args.map((arg => {
                if (!exports.isAbstractSqlQuery(arg)) throw new SyntaxError("Expected AbstractSqlQuery array but got " + typeof arg);
                const [type, ...rest] = arg;
                switch (type) {
                  case "SelectQuery":
                  case "UnionQuery":
                    return typeRules[type](rest, indent);

                  default:
                    throw new SyntaxError(`UnionQuery does not support ${type}`);
                }
            })).join(indent + "UNION" + indent);
        },
        SelectQuery: (args, indent) => {
            const tables = [], joins = [];
            let select = "";
            const groups = {
                Where: "",
                GroupBy: "",
                OrderBy: "",
                Limit: "",
                Offset: ""
            };
            for (const arg of args) {
                if (!exports.isAbstractSqlQuery(arg)) throw new SyntaxError("`SelectQuery` args must all be arrays");
                const [type, ...rest] = arg;
                switch (type) {
                  case "Select":
                    if ("" !== select) throw new SyntaxError(`'SelectQuery' can only accept one '${type}'`);
                    select = typeRules[type](rest, indent);
                    break;

                  case "From":
                    tables.push(typeRules[type](rest, indent));
                    break;

                  case "Join":
                  case "LeftJoin":
                  case "RightJoin":
                  case "FullJoin":
                  case "CrossJoin":
                    joins.push(typeRules[type](rest, indent));
                    break;

                  case "Where":
                  case "GroupBy":
                  case "OrderBy":
                  case "Limit":
                  case "Offset":
                    if ("" !== groups[type]) throw new SyntaxError(`'SelectQuery' can only accept one '${type}'`);
                    groups[type] = indent + typeRules[type](rest, indent);
                    break;

                  default:
                    throw new SyntaxError(`'SelectQuery' does not support '${type}'`);
                }
            }
            if (0 === tables.length && joins.length > 0) throw new SyntaxError("Must have at least one From node in order to use Join nodes");
            const from = undefined, joinStr = undefined;
            return "SELECT " + select + (tables.length > 0 ? indent + "FROM " + tables.join("," + NestedIndent(indent)) : "") + (joins.length > 0 ? indent + joins.join(indent) : "") + groups.Where + groups.GroupBy + groups.OrderBy + groups.Limit + groups.Offset;
        },
        Select: (args, indent) => {
            exports.checkArgs("Select", args, 1);
            return 0 === (args = exports.getAbstractSqlQuery(args, 0)).length ? "1" : args.map((arg => {
                if (!exports.isAbstractSqlQuery(arg)) throw new SyntaxError("Expected AbstractSqlQuery array but got " + typeof arg);
                return MaybeAlias(arg, indent, SelectMatch);
            })).join(", ");
        },
        From: (args, indent) => {
            exports.checkArgs("From", args, 1);
            return MaybeAlias(exports.getAbstractSqlQuery(args, 0), indent, FromMatch);
        },
        Join: JoinMatch("Join"),
        LeftJoin: JoinMatch("LeftJoin"),
        RightJoin: JoinMatch("RightJoin"),
        FullJoin: JoinMatch("FullJoin"),
        CrossJoin: (args, indent) => {
            exports.checkArgs("CrossJoin", args, 1);
            const from = undefined;
            return `CROSS JOIN ${MaybeAlias(exports.getAbstractSqlQuery(args, 0), indent, FromMatch)}`;
        },
        Where: (args, indent) => {
            exports.checkArgs("Where", args, 1);
            const boolNode = exports.getAbstractSqlQuery(args, 0);
            if ("Boolean" === boolNode[0]) return "WHERE " + (boolNode[1] ? "true" : "false");
            const ruleBody = undefined;
            return "WHERE " + BooleanValue(boolNode, indent);
        },
        GroupBy: (args, indent) => {
            exports.checkMinArgs("GroupBy", args, 1);
            const groups = exports.getAbstractSqlQuery(args, 0);
            exports.checkMinArgs("GroupBy groups", groups, 1);
            return "GROUP BY " + groups.map((arg => AnyValue(arg, indent))).join(", ");
        },
        OrderBy: (args, indent) => {
            exports.checkMinArgs("OrderBy", args, 1);
            return "ORDER BY " + args.map((arg => {
                exports.checkMinArgs("OrderBy ordering", arg, 2);
                const order = arg[0];
                if ("ASC" !== order && "DESC" !== order) throw new SyntaxError('Can only order by "ASC" or "DESC"');
                const field = undefined;
                return `${Field(exports.getAbstractSqlQuery(arg, 1), indent)} ${order}`;
            })).join("," + NestedIndent(indent));
        },
        Limit: (args, indent) => {
            exports.checkArgs("Limit", args, 1);
            const num = undefined;
            return `LIMIT ${NumericValue(exports.getAbstractSqlQuery(args, 0), indent)}`;
        },
        Offset: (args, indent) => {
            exports.checkArgs("Offset", args, 1);
            const num = undefined;
            return `OFFSET ${NumericValue(exports.getAbstractSqlQuery(args, 0), indent)}`;
        },
        Count: args => {
            exports.checkArgs("Count", args, 1);
            if ("*" !== args[0]) throw new SyntaxError('"Count" only supports "*"');
            return "COUNT(*)";
        },
        Average: (args, indent) => {
            exports.checkArgs("Average", args, 1);
            const num = undefined;
            return `AVG(${NumericValue(exports.getAbstractSqlQuery(args, 0), indent)})`;
        },
        Sum: (args, indent) => {
            exports.checkArgs("Sum", args, 1);
            const num = undefined;
            return `SUM(${NumericValue(exports.getAbstractSqlQuery(args, 0), indent)})`;
        },
        Field: args => {
            exports.checkArgs("Field", args, 1);
            const [field] = args;
            if ("string" != typeof field) throw new SyntaxError("`Field` field must be a string");
            return escapeField(field);
        },
        ReferencedField: args => {
            exports.checkArgs("ReferencedField", args, 2);
            const [table, field] = args;
            if ("string" != typeof table) throw new SyntaxError("`ReferencedField` table must be a string");
            if ("string" != typeof field) throw new SyntaxError("`ReferencedField` field must be a string");
            return `"${table}".${escapeField(field)}`;
        },
        Cast: (args, indent) => {
            exports.checkArgs("Cast", args, 2);
            const value = AnyValue(exports.getAbstractSqlQuery(args, 0), indent), typeName = args[1];
            if (!sbvrTypes[typeName] || !sbvrTypes[typeName].types[engine]) throw new SyntaxError(`Invalid cast type: ${typeName}`);
            let type;
            const dbType = sbvrTypes[typeName].types[engine];
            type = "function" == typeof dbType ? dbType.castType : "SERIAL" === dbType.toUpperCase() ? "INTEGER" : dbType;
            return `CAST(${value} AS ${type})`;
        },
        Number: NumberMatch("Number"),
        Real: NumberMatch("Real"),
        Integer: NumberMatch("Integer"),
        Boolean: args => {
            exports.checkArgs("Boolean", args, 1);
            const b = args[0];
            if ("boolean" != typeof b) throw new SyntaxError("Boolean expected boolean but got " + typeof b);
            return b ? "1" : "0";
        },
        EmbeddedText: args => {
            exports.checkArgs("EmbeddedText", args, 1);
            return `'${args[0]}'`;
        },
        Null: args => {
            exports.checkArgs("Null", args, 0);
            return "NULL";
        },
        Now: args => {
            exports.checkArgs("Now", args, 0);
            return "CURRENT_TIMESTAMP";
        },
        AggregateJSON: args => {
            exports.checkArgs("AggregateJSON", args, 1);
            args = exports.getAbstractSqlQuery(args, 0);
            exports.checkArgs("AggregateJSON's argument", args, 2);
            if ("postgres" !== engine) throw new SyntaxError("AggregateJSON not supported on: " + engine);
            const [table, field] = args;
            if ("string" != typeof table) throw new SyntaxError("`AggregateJSON` table must be a string");
            if ("string" != typeof field) throw new SyntaxError("`AggregateJSON` field must be a string");
            return `coalesce(array_to_json(array_agg("${table}".${escapeField(field)})), '[]')`;
        },
        Equals: Comparison("Equals"),
        GreaterThan: Comparison("GreaterThan"),
        GreaterThanOrEqual: Comparison("GreaterThanOrEqual"),
        LessThan: Comparison("LessThan"),
        LessThanOrEqual: Comparison("LessThanOrEqual"),
        NotEquals: Comparison("NotEquals"),
        Like: Comparison("Like"),
        IsNotDistinctFrom: (args, indent) => {
            exports.checkArgs("IsNotDistinctFrom", args, 2);
            return isNotDistinctFrom(args, indent);
        },
        IsDistinctFrom: (args, indent) => {
            exports.checkArgs("IsDistinctFrom", args, 2);
            return "NOT(" + isNotDistinctFrom(args, indent) + ")";
        },
        Add: MathOp("Add"),
        Subtract: MathOp("Subtract"),
        Multiply: MathOp("Multiply"),
        Divide: MathOp("Divide"),
        Year: ExtractNumericDatePart("Year"),
        Month: ExtractNumericDatePart("Month"),
        Day: ExtractNumericDatePart("Day"),
        Hour: ExtractNumericDatePart("Hour"),
        Minute: ExtractNumericDatePart("Minute"),
        Second: ExtractNumericDatePart("Second"),
        Fractionalseconds: ExtractNumericDatePart("Fractionalseconds"),
        Totalseconds: (args, indent) => {
            exports.checkArgs("Totalseconds", args, 1);
            const duration = DurationValue(exports.getAbstractSqlQuery(args, 0), indent);
            if ("postgres" === engine) return `EXTRACT(EPOCH FROM ${duration})`;
            if ("mysql" === engine) return `(TIMESTAMPDIFF(MICROSECOND, FROM_UNIXTIME(0), FROM_UNIXTIME(0) + ${duration}) / 1000000)`;
            throw new SyntaxError("TotalSeconds not supported on: " + engine);
        },
        Concatenate: (args, indent) => {
            exports.checkMinArgs("Concatenate", args, 1);
            const comparators = args.map((arg => {
                if (!exports.isAbstractSqlQuery(arg)) throw new SyntaxError("Expected AbstractSqlQuery array but got " + typeof arg);
                return TextValue(arg, indent);
            }));
            return "mysql" === engine ? "CONCAT(" + comparators.join(", ") + ")" : "(" + comparators.join(" || ") + ")";
        },
        Replace: (args, indent) => {
            exports.checkArgs("Replace", args, 3);
            const str = undefined, find = undefined, replacement = undefined;
            return `REPLACE(${TextValue(exports.getAbstractSqlQuery(args, 0), indent)}, ${TextValue(exports.getAbstractSqlQuery(args, 1), indent)}, ${TextValue(exports.getAbstractSqlQuery(args, 2), indent)})`;
        },
        CharacterLength: (args, indent) => {
            exports.checkArgs("CharacterLength", args, 1);
            const text = TextValue(exports.getAbstractSqlQuery(args, 0), indent);
            return "mysql" === engine ? `CHAR_LENGTH(${text})` : `LENGTH(${text})`;
        },
        StrPos: (args, indent) => {
            exports.checkArgs("StrPos", args, 2);
            const haystack = TextValue(exports.getAbstractSqlQuery(args, 0), indent), needle = TextValue(exports.getAbstractSqlQuery(args, 1), indent);
            return "postgres" === engine ? `STRPOS(${haystack}, ${needle})` : `INSTR(${haystack}, ${needle})`;
        },
        Substring: (args, indent) => {
            exports.checkMinArgs("Substring", args, 2);
            const str = undefined, nums = undefined;
            return `SUBSTRING(${[ TextValue(exports.getAbstractSqlQuery(args, 0), indent), ...args.slice(1).map((arg => {
                if (!exports.isAbstractSqlQuery(arg)) throw new SyntaxError("Expected AbstractSqlQuery array but got " + typeof arg);
                return NumericValue(arg, indent);
            })) ].join(", ")})`;
        },
        Right: (args, indent) => {
            exports.checkArgs("Right", args, 2);
            const str = TextValue(exports.getAbstractSqlQuery(args, 0), indent), n = NumericValue(exports.getAbstractSqlQuery(args, 0), indent);
            return "websql" === engine ? `SUBSTRING(${str}, -${n})` : `RIGHT(${str}, ${n})`;
        },
        Lower: (args, indent) => {
            exports.checkArgs("Lower", args, 1);
            const str = undefined;
            return `LOWER(${TextValue(exports.getAbstractSqlQuery(args, 0), indent)})`;
        },
        Upper: (args, indent) => {
            exports.checkArgs("Upper", args, 1);
            const str = undefined;
            return `UPPER(${TextValue(exports.getAbstractSqlQuery(args, 0), indent)})`;
        },
        Trim: (args, indent) => {
            exports.checkArgs("Trim", args, 1);
            const str = undefined;
            return `TRIM(${TextValue(exports.getAbstractSqlQuery(args, 0), indent)})`;
        },
        Round: (args, indent) => {
            exports.checkArgs("Round", args, 1);
            const num = undefined;
            return `ROUND(${NumericValue(exports.getAbstractSqlQuery(args, 0), indent)})`;
        },
        Floor: (args, indent) => {
            exports.checkArgs("Floor", args, 1);
            const num = undefined;
            return `FLOOR(${NumericValue(exports.getAbstractSqlQuery(args, 0), indent)})`;
        },
        Ceiling: (args, indent) => {
            exports.checkArgs("Ceiling", args, 1);
            const num = undefined;
            return `CEILING(${NumericValue(exports.getAbstractSqlQuery(args, 0), indent)})`;
        },
        ToDate: (args, indent) => {
            exports.checkArgs("ToDate", args, 1);
            const date = undefined;
            return `DATE(${DateValue(exports.getAbstractSqlQuery(args, 0), indent)})`;
        },
        ToTime: (args, indent) => {
            exports.checkArgs("ToTime", args, 1);
            const date = DateValue(exports.getAbstractSqlQuery(args, 0), indent);
            return "postgres" === engine ? `CAST(${date} AS TIME)` : `TIME(${date})`;
        },
        Coalesce: (args, indent) => {
            exports.checkMinArgs("Coalesce", args, 2);
            const comparators = undefined;
            return "COALESCE(" + args.map((arg => {
                if (!exports.isAbstractSqlQuery(arg)) throw new SyntaxError("Expected AbstractSqlQuery array but got " + typeof arg);
                return AnyValue(arg, indent);
            })).join(", ") + ")";
        },
        Case: (args, indent) => {
            exports.checkMinArgs("Case", args, 1);
            const nestedIndent = NestedIndent(indent), clauses = args.map(((arg, index) => {
                if (!exports.isAbstractSqlQuery(arg)) throw new SyntaxError("Expected AbstractSqlQuery array but got " + typeof arg);
                const [type, ...rest] = arg;
                switch (type) {
                  case "When":
                    exports.checkArgs("When", rest, 2);
                    const matches = undefined, resultValue = undefined;
                    return "WHEN " + BooleanValue(exports.getAbstractSqlQuery(rest, 0), NestedIndent(nestedIndent)) + " THEN " + AnyValue(exports.getAbstractSqlQuery(rest, 1), nestedIndent);

                  case "Else":
                    if (index !== args.length - 1) throw new SyntaxError("Else must be the last element of a Case");
                    exports.checkArgs("Else", rest, 1);
                    return "ELSE " + AnyValue(exports.getAbstractSqlQuery(rest, 0), nestedIndent);

                  default:
                    throw new SyntaxError("Case can only contain When/Else");
                }
            })).join(nestedIndent);
            return "CASE" + nestedIndent + clauses + indent + "END";
        },
        And: (args, indent) => {
            exports.checkMinArgs("And", args, 2);
            return args.map((arg => {
                if (!exports.isAbstractSqlQuery(arg)) throw new SyntaxError("Expected AbstractSqlQuery array but got " + typeof arg);
                return BooleanValue(arg, indent);
            })).join(indent + "AND ");
        },
        Or: (args, indent) => {
            exports.checkMinArgs("Or", args, 2);
            return "(" + args.map((arg => {
                if (!exports.isAbstractSqlQuery(arg)) throw new SyntaxError("Expected AbstractSqlQuery array but got " + typeof arg);
                return BooleanValue(arg, indent);
            })).join(indent + "OR ") + ")";
        },
        Bind: args => {
            let bind;
            if (2 === args.length) bind = args; else {
                if (1 !== args.length) throw new SyntaxError('"Bind" requires 1/2 arg(s)');
                bind = args[0];
            }
            return AddBind([ "Bind", bind ]);
        },
        Text: Text,
        Value: Text,
        Date: args => {
            exports.checkArgs("Date", args, 1);
            return AddBind([ "Date", args[0] ]);
        },
        Duration: args => {
            exports.checkArgs("Duration", args, 1);
            if ("websql" === engine) throw new SyntaxError("Durations not supported on: " + engine);
            let duration = args[0];
            if (null == duration || "object" != typeof duration) throw new SyntaxError("Duration must be an object, got " + typeof duration);
            duration = _(duration).pick("negative", "day", "hour", "minute", "second").omitBy(_.isNil).value();
            if (_(duration).omit("negative").isEmpty()) throw new SyntaxError("Invalid duration");
            return "INTERVAL '" + (duration.negative ? "-" : "") + (duration.day || "0") + " " + (duration.negative ? "-" : "") + (duration.hour || "0") + ":" + (duration.minute || "0") + ":" + Number(duration.second).toLocaleString("en", {
                minimumFractionDigits: 1
            }) + "'" + ("mysql" === engine ? " DAY_MICROSECOND" : "");
        },
        Exists: (args, indent) => {
            exports.checkArgs("Exists", args, 1);
            const arg = exports.getAbstractSqlQuery(args, 0), [type, ...rest] = arg;
            switch (type) {
              case "SelectQuery":
              case "UnionQuery":
                const nestedIndent = NestedIndent(indent), query = undefined;
                return "EXISTS (" + nestedIndent + typeRules[type](rest, nestedIndent) + indent + ")";

              default:
                return AnyValue(arg, indent) + " IS NOT NULL";
            }
        },
        NotExists: (args, indent) => {
            exports.checkArgs("NotExists", args, 1);
            const arg = exports.getAbstractSqlQuery(args, 0), [type, ...rest] = arg;
            switch (type) {
              case "SelectQuery":
              case "UnionQuery":
                const nestedIndent = NestedIndent(indent), query = undefined;
                return "NOT EXISTS (" + nestedIndent + typeRules[type](rest, nestedIndent) + indent + ")";

              default:
                return AnyValue(arg, indent) + " IS NULL";
            }
        },
        Not: (args, indent) => {
            exports.checkArgs("Not", args, 1);
            const nestedIndent = NestedIndent(indent), bool = undefined;
            return "NOT (" + nestedIndent + BooleanValue(exports.getAbstractSqlQuery(args, 0), nestedIndent) + indent + ")";
        },
        In: (args, indent) => {
            exports.checkMinArgs("In", args, 2);
            const field = undefined, vals = undefined;
            return Field(exports.getAbstractSqlQuery(args, 0), indent) + " IN (" + args.slice(1).map((arg => {
                if (!exports.isAbstractSqlQuery(arg)) throw new SyntaxError("Expected AbstractSqlQuery array but got " + typeof arg);
                return AnyValue(arg, indent);
            })).join(", ") + ")";
        },
        NotIn: (args, indent) => {
            exports.checkMinArgs("NotIn", args, 2);
            const field = undefined, vals = undefined;
            return Field(exports.getAbstractSqlQuery(args, 0), indent) + " NOT IN (" + args.slice(1).map((arg => {
                if (!exports.isAbstractSqlQuery(arg)) throw new SyntaxError("Expected AbstractSqlQuery array but got " + typeof arg);
                return AnyValue(arg, indent);
            })).join(", ") + ")";
        },
        InsertQuery: (args, indent) => {
            const tables = [];
            let fields = [], values = [];
            for (const arg of args) {
                if (!exports.isAbstractSqlQuery(arg)) throw new SyntaxError("`InsertQuery` args must all be arrays");
                const [type, ...rest] = arg;
                switch (type) {
                  case "Fields":
                    if (0 !== fields.length) throw new SyntaxError(`'InsertQuery' can only accept one '${type}'`);
                    exports.checkMinArgs("Update fields", rest, 1);
                    fields = exports.getAbstractSqlQuery(rest, 0).map(escapeField);
                    break;

                  case "Values":
                    if (0 !== values.length) throw new SyntaxError(`'InsertQuery' can only accept one '${type}'`);
                    const valuesArray = exports.getAbstractSqlQuery(rest, 0);
                    if (valuesArray.length > 0) {
                        const [valuesType, ...valuesRest] = valuesArray;
                        switch (valuesType) {
                          case "SelectQuery":
                          case "UnionQuery":
                            values = typeRules[valuesType](valuesRest, indent);
                            break;

                          default:
                            values = valuesArray.map((v => Value(v, indent)));
                        }
                    }
                    break;

                  case "From":
                    tables.push(typeRules[type](rest, indent));
                    break;

                  default:
                    throw new SyntaxError(`'InsertQuery' does not support '${type}'`);
                }
            }
            if ("string" != typeof values && fields.length !== values.length) throw new SyntaxError("Fields and Values must have the same length or use a query");
            if (fields.length > 0) {
                Array.isArray(values) && (values = "VALUES (" + values.join(", ") + ")");
                return "INSERT INTO " + tables.join(", ") + " (" + fields.join(", ") + ")" + indent + values;
            }
            return "INSERT INTO " + tables.join(", ") + " DEFAULT VALUES";
        },
        UpdateQuery: (args, indent) => {
            const tables = [];
            let fields = [], values = [], where = "";
            for (const arg of args) {
                if (!exports.isAbstractSqlQuery(arg)) throw new SyntaxError("`UpdateQuery` args must all be arrays");
                const [type, ...rest] = arg;
                switch (type) {
                  case "Fields":
                    if (0 !== fields.length) throw new SyntaxError(`'UpdateQuery' can only accept one '${type}'`);
                    exports.checkMinArgs("Update fields", rest, 1);
                    fields = exports.getAbstractSqlQuery(rest, 0).map(escapeField);
                    break;

                  case "Values":
                    if (0 !== values.length) throw new SyntaxError(`'UpdateQuery' can only accept one '${type}'`);
                    exports.checkArgs("Update values", rest, 1);
                    const valuesArray = exports.getAbstractSqlQuery(rest, 0);
                    exports.checkMinArgs("Update values array", valuesArray, 1);
                    values = valuesArray.map((v => Value(v, indent)));
                    break;

                  case "From":
                    tables.push(typeRules[type](rest, indent));
                    break;

                  case "Where":
                    if ("" !== where) throw new SyntaxError(`'UpdateQuery' can only accept one '${type}'`);
                    where = indent + typeRules[type](rest, indent);
                    break;

                  default:
                    throw new SyntaxError(`'UpdateQuery' does not support '${type}'`);
                }
            }
            if (fields.length !== values.length) throw new SyntaxError("Fields and Values must have the same length");
            const sets = fields.map(((field, i) => field + " = " + values[i]));
            return "UPDATE " + tables.join(", ") + indent + "SET " + sets.join("," + NestedIndent(indent)) + where;
        },
        DeleteQuery: (args, indent) => {
            const tables = [];
            let where = "";
            for (const arg of args) {
                if (!exports.isAbstractSqlQuery(arg)) throw new SyntaxError("`DeleteQuery` args must all be arrays");
                const [type, ...rest] = arg;
                switch (type) {
                  case "From":
                    tables.push(typeRules[type](rest, indent));
                    break;

                  case "Where":
                    if ("" !== where) throw new SyntaxError(`'DeleteQuery' can only accept one '${type}'`);
                    where = indent + typeRules[type](rest, indent);
                    break;

                  default:
                    throw new SyntaxError(`'DeleteQuery' does not support '${type}'`);
                }
            }
            return "DELETE FROM " + tables.join(", ") + where;
        }
    }, toSqlResult = query => noBinds ? query : {
        query: query,
        bindings: fieldOrderings
    };
    function AbstractSQLRules2SQL(abstractSQL, $engine, $noBinds = !1) {
        engine = $engine;
        noBinds = $noBinds;
        fieldOrderings = [];
        fieldOrderingsLookup = {};
        const indent = "\n", [type, ...rest] = abstractSQL;
        switch (type) {
          case "SelectQuery":
          case "UnionQuery":
          case "InsertQuery":
          case "UpdateQuery":
          case "DeleteQuery":
            const query = typeRules[type](rest, "\n");
            return toSqlResult(query);

          case "UpsertQuery":
            exports.checkArgs("UpsertQuery", rest, 2);
            const insertQuery = exports.getAbstractSqlQuery(rest, 0), updateQuery = exports.getAbstractSqlQuery(rest, 1);
            if ("InsertQuery" !== insertQuery[0] || "UpdateQuery" !== updateQuery[0]) throw new SyntaxError("UpsertQuery must have [InsertQuery, UpdateQuery] provided");
            const insertSql = typeRules.InsertQuery(insertQuery.slice(1), "\n"), insert = toSqlResult(insertSql);
            fieldOrderings = [];
            fieldOrderingsLookup = {};
            const updateSql = typeRules.UpdateQuery(updateQuery.slice(1), "\n"), update = undefined;
            return [ insert, toSqlResult(updateSql) ];

          default:
            const value = AnyValue(abstractSQL, "\n");
            return noBinds ? value : {
                query: `SELECT ${value} AS "result";`,
                bindings: fieldOrderings
            };
        }
    }
    exports.AbstractSQLRules2SQL = AbstractSQLRules2SQL;
}, function(module, exports) {
    module.exports = require("crypto");
}, function(module, exports, __webpack_require__) {
    var inherits = __webpack_require__(14), Hash = __webpack_require__(15), Buffer = __webpack_require__(8).Buffer, K = [ 1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298 ], W = new Array(64);
    function Sha256() {
        this.init();
        this._w = W;
        Hash.call(this, 64, 56);
    }
    inherits(Sha256, Hash);
    Sha256.prototype.init = function() {
        this._a = 1779033703;
        this._b = 3144134277;
        this._c = 1013904242;
        this._d = 2773480762;
        this._e = 1359893119;
        this._f = 2600822924;
        this._g = 528734635;
        this._h = 1541459225;
        return this;
    };
    function ch(x, y, z) {
        return z ^ x & (y ^ z);
    }
    function maj(x, y, z) {
        return x & y | z & (x | y);
    }
    function sigma0(x) {
        return (x >>> 2 | x << 30) ^ (x >>> 13 | x << 19) ^ (x >>> 22 | x << 10);
    }
    function sigma1(x) {
        return (x >>> 6 | x << 26) ^ (x >>> 11 | x << 21) ^ (x >>> 25 | x << 7);
    }
    function gamma0(x) {
        return (x >>> 7 | x << 25) ^ (x >>> 18 | x << 14) ^ x >>> 3;
    }
    function gamma1(x) {
        return (x >>> 17 | x << 15) ^ (x >>> 19 | x << 13) ^ x >>> 10;
    }
    Sha256.prototype._update = function(M) {
        for (var W = this._w, a = 0 | this._a, b = 0 | this._b, c = 0 | this._c, d = 0 | this._d, e = 0 | this._e, f = 0 | this._f, g = 0 | this._g, h = 0 | this._h, i = 0; i < 16; ++i) W[i] = M.readInt32BE(4 * i);
        for (;i < 64; ++i) W[i] = gamma1(W[i - 2]) + W[i - 7] + gamma0(W[i - 15]) + W[i - 16] | 0;
        for (var j = 0; j < 64; ++j) {
            var T1 = h + sigma1(e) + ch(e, f, g) + K[j] + W[j] | 0, T2 = sigma0(a) + maj(a, b, c) | 0;
            h = g;
            g = f;
            f = e;
            e = d + T1 | 0;
            d = c;
            c = b;
            b = a;
            a = T1 + T2 | 0;
        }
        this._a = a + this._a | 0;
        this._b = b + this._b | 0;
        this._c = c + this._c | 0;
        this._d = d + this._d | 0;
        this._e = e + this._e | 0;
        this._f = f + this._f | 0;
        this._g = g + this._g | 0;
        this._h = h + this._h | 0;
    };
    Sha256.prototype._hash = function() {
        var H = Buffer.allocUnsafe(32);
        H.writeInt32BE(this._a, 0);
        H.writeInt32BE(this._b, 4);
        H.writeInt32BE(this._c, 8);
        H.writeInt32BE(this._d, 12);
        H.writeInt32BE(this._e, 16);
        H.writeInt32BE(this._f, 20);
        H.writeInt32BE(this._g, 24);
        H.writeInt32BE(this._h, 28);
        return H;
    };
    module.exports = Sha256;
}, function(module, exports, __webpack_require__) {
    var inherits = __webpack_require__(14), Hash = __webpack_require__(15), Buffer = __webpack_require__(8).Buffer, K = [ 1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591 ], W = new Array(160);
    function Sha512() {
        this.init();
        this._w = W;
        Hash.call(this, 128, 112);
    }
    inherits(Sha512, Hash);
    Sha512.prototype.init = function() {
        this._ah = 1779033703;
        this._bh = 3144134277;
        this._ch = 1013904242;
        this._dh = 2773480762;
        this._eh = 1359893119;
        this._fh = 2600822924;
        this._gh = 528734635;
        this._hh = 1541459225;
        this._al = 4089235720;
        this._bl = 2227873595;
        this._cl = 4271175723;
        this._dl = 1595750129;
        this._el = 2917565137;
        this._fl = 725511199;
        this._gl = 4215389547;
        this._hl = 327033209;
        return this;
    };
    function Ch(x, y, z) {
        return z ^ x & (y ^ z);
    }
    function maj(x, y, z) {
        return x & y | z & (x | y);
    }
    function sigma0(x, xl) {
        return (x >>> 28 | xl << 4) ^ (xl >>> 2 | x << 30) ^ (xl >>> 7 | x << 25);
    }
    function sigma1(x, xl) {
        return (x >>> 14 | xl << 18) ^ (x >>> 18 | xl << 14) ^ (xl >>> 9 | x << 23);
    }
    function Gamma0(x, xl) {
        return (x >>> 1 | xl << 31) ^ (x >>> 8 | xl << 24) ^ x >>> 7;
    }
    function Gamma0l(x, xl) {
        return (x >>> 1 | xl << 31) ^ (x >>> 8 | xl << 24) ^ (x >>> 7 | xl << 25);
    }
    function Gamma1(x, xl) {
        return (x >>> 19 | xl << 13) ^ (xl >>> 29 | x << 3) ^ x >>> 6;
    }
    function Gamma1l(x, xl) {
        return (x >>> 19 | xl << 13) ^ (xl >>> 29 | x << 3) ^ (x >>> 6 | xl << 26);
    }
    function getCarry(a, b) {
        return a >>> 0 < b >>> 0 ? 1 : 0;
    }
    Sha512.prototype._update = function(M) {
        for (var W = this._w, ah = 0 | this._ah, bh = 0 | this._bh, ch = 0 | this._ch, dh = 0 | this._dh, eh = 0 | this._eh, fh = 0 | this._fh, gh = 0 | this._gh, hh = 0 | this._hh, al = 0 | this._al, bl = 0 | this._bl, cl = 0 | this._cl, dl = 0 | this._dl, el = 0 | this._el, fl = 0 | this._fl, gl = 0 | this._gl, hl = 0 | this._hl, i = 0; i < 32; i += 2) {
            W[i] = M.readInt32BE(4 * i);
            W[i + 1] = M.readInt32BE(4 * i + 4);
        }
        for (;i < 160; i += 2) {
            var xh = W[i - 30], xl = W[i - 30 + 1], gamma0 = Gamma0(xh, xl), gamma0l = Gamma0l(xl, xh), gamma1 = Gamma1(xh = W[i - 4], xl = W[i - 4 + 1]), gamma1l = Gamma1l(xl, xh), Wi7h = W[i - 14], Wi7l = W[i - 14 + 1], Wi16h = W[i - 32], Wi16l = W[i - 32 + 1], Wil = gamma0l + Wi7l | 0, Wih = gamma0 + Wi7h + getCarry(Wil, gamma0l) | 0;
            Wih = (Wih = Wih + gamma1 + getCarry(Wil = Wil + gamma1l | 0, gamma1l) | 0) + Wi16h + getCarry(Wil = Wil + Wi16l | 0, Wi16l) | 0;
            W[i] = Wih;
            W[i + 1] = Wil;
        }
        for (var j = 0; j < 160; j += 2) {
            Wih = W[j];
            Wil = W[j + 1];
            var majh = maj(ah, bh, ch), majl = maj(al, bl, cl), sigma0h = sigma0(ah, al), sigma0l = sigma0(al, ah), sigma1h = sigma1(eh, el), sigma1l = sigma1(el, eh), Kih = K[j], Kil = K[j + 1], chh = Ch(eh, fh, gh), chl = Ch(el, fl, gl), t1l = hl + sigma1l | 0, t1h = hh + sigma1h + getCarry(t1l, hl) | 0;
            t1h = (t1h = (t1h = t1h + chh + getCarry(t1l = t1l + chl | 0, chl) | 0) + Kih + getCarry(t1l = t1l + Kil | 0, Kil) | 0) + Wih + getCarry(t1l = t1l + Wil | 0, Wil) | 0;
            var t2l = sigma0l + majl | 0, t2h = sigma0h + majh + getCarry(t2l, sigma0l) | 0;
            hh = gh;
            hl = gl;
            gh = fh;
            gl = fl;
            fh = eh;
            fl = el;
            eh = dh + t1h + getCarry(el = dl + t1l | 0, dl) | 0;
            dh = ch;
            dl = cl;
            ch = bh;
            cl = bl;
            bh = ah;
            bl = al;
            ah = t1h + t2h + getCarry(al = t1l + t2l | 0, t1l) | 0;
        }
        this._al = this._al + al | 0;
        this._bl = this._bl + bl | 0;
        this._cl = this._cl + cl | 0;
        this._dl = this._dl + dl | 0;
        this._el = this._el + el | 0;
        this._fl = this._fl + fl | 0;
        this._gl = this._gl + gl | 0;
        this._hl = this._hl + hl | 0;
        this._ah = this._ah + ah + getCarry(this._al, al) | 0;
        this._bh = this._bh + bh + getCarry(this._bl, bl) | 0;
        this._ch = this._ch + ch + getCarry(this._cl, cl) | 0;
        this._dh = this._dh + dh + getCarry(this._dl, dl) | 0;
        this._eh = this._eh + eh + getCarry(this._el, el) | 0;
        this._fh = this._fh + fh + getCarry(this._fl, fl) | 0;
        this._gh = this._gh + gh + getCarry(this._gl, gl) | 0;
        this._hh = this._hh + hh + getCarry(this._hl, hl) | 0;
    };
    Sha512.prototype._hash = function() {
        var H = Buffer.allocUnsafe(64);
        function writeInt64BE(h, l, offset) {
            H.writeInt32BE(h, offset);
            H.writeInt32BE(l, offset + 4);
        }
        writeInt64BE(this._ah, this._al, 0);
        writeInt64BE(this._bh, this._bl, 8);
        writeInt64BE(this._ch, this._cl, 16);
        writeInt64BE(this._dh, this._dl, 24);
        writeInt64BE(this._eh, this._el, 32);
        writeInt64BE(this._fh, this._fl, 40);
        writeInt64BE(this._gh, this._gl, 48);
        writeInt64BE(this._hh, this._hl, 56);
        return H;
    };
    module.exports = Sha512;
}, function(module, exports, __webpack_require__) {
    var OMeta = __webpack_require__(9), SBVRLibs = __webpack_require__(37).SBVRLibs, SBVRCompilerLibs = exports.SBVRCompilerLibs = SBVRLibs._extend({
        ResolveSynonym: function(name) {
            var $elf = this, _fromIdx = this.input.idx;
            return this._or((function() {
                this._pred(this.synonyms[name]);
                return this.synonyms[name];
            }), (function() {
                return name;
            }));
        }
    });
    SBVRCompilerLibs.initialize = function() {
        SBVRLibs.initialize.call(this);
        this.synonyms = {};
    };
    SBVRCompilerLibs.TYPE_VOCAB = "Type";
    SBVRCompilerLibs.IsPrimitive = function(term) {
        return (term[2] == this.TYPE_VOCAB || !1 !== (term = this.FollowConceptType(term)) && term[2] == this.TYPE_VOCAB) && term[1];
    };
    SBVRCompilerLibs.IsChild = function(child, parent) {
        do {
            if (this.IdentifiersEqual(child, parent)) return !0;
        } while (!1 !== (child = this.FollowConceptType(child)));
        return !1;
    };
    SBVRCompilerLibs.MappedFactType = function(factType) {
        var traverseInfo = this._traverseFactType(factType), mappedFactType = [];
        if (!1 === traverseInfo || !traverseInfo.hasOwnProperty("__valid")) return !1;
        for (var i = 0; i < traverseInfo.__valid.length; i++) mappedFactType[i] = traverseInfo.__valid[i].slice();
        mappedFactType[1][2] = factType[1][2];
        return mappedFactType;
    };
    SBVRCompilerLibs.UnmappedFactType = function(factType) {
        var mappedFactType = this.MappedFactType(factType);
        if (!1 === mappedFactType) return !1;
        for (var i = 0; i < mappedFactType.length; i++) mappedFactType[i] = mappedFactType[i].slice(0, 3);
        return mappedFactType;
    };
    SBVRCompilerLibs.GetResourceName = function(termOrFactType) {
        var i = 0, resource = [];
        if ("string" == typeof termOrFactType) return this.ResolveSynonym(termOrFactType);
        for (;i < termOrFactType.length; i++) resource.push(this.ResolveSynonym(termOrFactType[i][1]));
        return resource.join("-");
    };
    SBVRCompilerLibs.GetTable = function(termNameOrFactType) {
        return this.tables[this.GetResourceName(termNameOrFactType)];
    };
    SBVRCompilerLibs.GetTableID = function(termOrFactType) {
        switch (termOrFactType[0]) {
          case "Term":
          case "Name":
            return termOrFactType[1];

          default:
            return termOrFactType;
        }
    };
    SBVRCompilerLibs.GetTableField = function(table, fieldName) {
        var fieldID = this.GetTableFieldID(table, fieldName);
        return !1 !== fieldID && table.fields[fieldID];
    };
    SBVRCompilerLibs.GetTableFieldID = function(table, fieldName) {
        for (var tableFields = table.fields, i = 0; i < tableFields.length; i++) if (tableFields[i].fieldName == fieldName) return i;
        return !1;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var assign = __webpack_require__(26), isObject = __webpack_require__(39), isValue = __webpack_require__(6), captureStackTrace = Error.captureStackTrace;
    module.exports = function(message) {
        var err = new Error(message), code = arguments[1], ext = arguments[2];
        if (!isValue(ext) && isObject(code)) {
            ext = code;
            code = null;
        }
        isValue(ext) && assign(err, ext);
        isValue(code) && (err.code = code);
        captureStackTrace && captureStackTrace(err, module.exports);
        return err;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var value = __webpack_require__(4), defineProperty = Object.defineProperty, getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor, getOwnPropertyNames = Object.getOwnPropertyNames, getOwnPropertySymbols = Object.getOwnPropertySymbols;
    module.exports = function(target, source) {
        var error, sourceObject = Object(value(source));
        target = Object(value(target));
        getOwnPropertyNames(sourceObject).forEach((function(name) {
            try {
                defineProperty(target, name, getOwnPropertyDescriptor(source, name));
            } catch (e) {
                error = e;
            }
        }));
        "function" == typeof getOwnPropertySymbols && getOwnPropertySymbols(sourceObject).forEach((function(symbol) {
            try {
                defineProperty(target, symbol, getOwnPropertyDescriptor(source, symbol));
            } catch (e) {
                error = e;
            }
        }));
        if (void 0 !== error) throw error;
        return target;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var isFunction = __webpack_require__(135), classRe = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;
    module.exports = function(value) {
        return !!isFunction(value) && !classRe.test(functionToString.call(value));
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = __webpack_require__(137)() ? String.prototype.contains : __webpack_require__(138);
}, function(module, exports, __webpack_require__) {
    "use strict";
    var toArray = __webpack_require__(140), isValue = __webpack_require__(6), callable = __webpack_require__(2), slice = Array.prototype.slice, resolveArgs;
    resolveArgs = function(args) {
        return this.map((function(resolve, i) {
            return resolve ? resolve(args[i]) : args[i];
        })).concat(slice.call(args, this.length));
    };
    module.exports = function(resolvers) {
        (resolvers = toArray(resolvers)).forEach((function(resolve) {
            isValue(resolve) && callable(resolve);
        }));
        return resolveArgs.bind(resolvers);
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var isSymbol = __webpack_require__(147);
    module.exports = function(value) {
        if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
        return value;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var callable = __webpack_require__(2);
    module.exports = function(userNormalizer) {
        var normalizer;
        if ("function" == typeof userNormalizer) return {
            set: userNormalizer,
            get: userNormalizer
        };
        normalizer = {
            get: callable(userNormalizer.get)
        };
        if (void 0 !== userNormalizer.set) {
            normalizer.set = callable(userNormalizer.set);
            userNormalizer.delete && (normalizer.delete = callable(userNormalizer.delete));
            userNormalizer.clear && (normalizer.clear = callable(userNormalizer.clear));
            return normalizer;
        }
        normalizer.set = normalizer.get;
        return normalizer;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = function(obj) {
        return "function" == typeof obj;
    };
}, function(module, exports) {
    module.exports = isPromise;
    module.exports.default = isPromise;
    function isPromise(obj) {
        return !!obj && ("object" == typeof obj || "function" == typeof obj) && "function" == typeof obj.then;
    }
}, function(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(174);
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.ExtendedSBVRParser = void 0;
    const sbvr_parser_1 = __webpack_require__(178), Types = __webpack_require__(180), package_json_1 = __webpack_require__(63), package_json_2 = __webpack_require__(63);
    exports.ExtendedSBVRParser = sbvr_parser_1.SBVRParser._extend({
        initialize() {
            sbvr_parser_1.SBVRParser.initialize.call(this);
            this.AddCustomAttribute("Database ID Field:");
            this.AddCustomAttribute("Database Table Name:");
            this.AddBuiltInVocab(Types);
            return this;
        },
        version: package_json_1.version + "+" + package_json_2.version
    });
}, function(module) {
    module.exports = JSON.parse('{"_from":"@balena/sbvr-parser@1.2.2","_id":"@balena/sbvr-parser@1.2.2","_inBundle":false,"_integrity":"sha512-fWCOelfu9BNQqRsrhoZ4UyA4jS4pA1xigG1qVcTAqTvI4Q+auO+bCH4wMw/tgQ3WKY3/7oTg92h2+MfYly8U7A==","_location":"/@balena/sbvr-parser","_phantomChildren":{},"_requested":{"type":"version","registry":true,"raw":"@balena/sbvr-parser@1.2.2","name":"@balena/sbvr-parser","escapedName":"@balena%2fsbvr-parser","scope":"@balena","rawSpec":"1.2.2","saveSpec":null,"fetchSpec":"1.2.2"},"_requiredBy":["#USER","/","/@balena/lf-to-abstract-sql"],"_resolved":"https://registry.npmjs.org/@balena/sbvr-parser/-/sbvr-parser-1.2.2.tgz","_shasum":"dda7f38600a639b1b4cb512c39f463f3c0042bfd","_spec":"@balena/sbvr-parser@1.2.2","_where":"C:\\\\Users\\\\pjgaz\\\\Documents\\\\Development\\\\pinejs\\\\pinejs","author":"","bugs":{"url":"https://github.com/balena-io-modules/sbvr-parser/issues"},"bundleDependencies":false,"dependencies":{"lodash":"^4.17.20","ometa-js":"^1.5.4"},"deprecated":false,"description":"SBVR to LF parser.","devDependencies":{"@balena/lint":"^5.4.1","@balena/sbvr-types":"^3.4.0","chai":"^4.3.0","mocha":"^8.2.1","require-npm4-to-publish":"^1.0.0"},"homepage":"https://github.com/balena-io-modules/sbvr-parser#readme","license":"BSD","main":"sbvr-parser.js","mocha":{"reporter":"spec","recursive":true,"bail":true,"timeout":5000,"_":"test"},"name":"@balena/sbvr-parser","repository":{"type":"git","url":"git+https://github.com/balena-io-modules/sbvr-parser.git"},"scripts":{"lint":"balena-lint -e js --typescript test/","lint-fix":"balena-lint -e js --typescript --fix test/","posttest":"npm run lint","prepare":"ometajs2js --commonjs --input sbvr-parser.ometajs --output sbvr-parser.js && ometajs2js --commonjs --input sbvr-libs.ometajs --output sbvr-libs.js && ometajs2js --commonjs --input lf-optimiser.ometajs --output lf-optimiser.js && ometajs2js --commonjs --input lf-validator.ometajs --output lf-validator.js","prepublish":"require-npm4-to-publish","pretest":"npm run prepare","test":"mocha"},"version":"1.2.2"}');
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.config = exports.run = exports.postRun = exports.MigrationError = void 0;
    const Bluebird = __webpack_require__(21), _ = __webpack_require__(0), typed_error_1 = __webpack_require__(34), env_1 = __webpack_require__(12), sbvrUtils = __webpack_require__(5), modelText = __webpack_require__(181);
    class MigrationError extends typed_error_1.TypedError {}
    exports.MigrationError = MigrationError;
    const binds = (strings, ...bindNums) => strings.map(((str, i) => {
        if (i === bindNums.length) return str;
        if (i + 1 !== bindNums[i]) throw new SyntaxError("Migration sql binds must be sequential");
        return "postgres" === sbvrUtils.db.engine ? str + `$${bindNums[i]}` : str + "?";
    })).join(""), postRun = async (tx, model) => {
        var _a, _b;
        const {initSql: initSql} = model;
        if (null == initSql) return;
        const modelName = model.apiRoot, exists = undefined;
        if (!await checkModelAlreadyExists(tx, modelName)) {
            (null !== (_b = null === (_a = sbvrUtils.api.migrations) || void 0 === _a ? void 0 : _a.logger.info) && void 0 !== _b ? _b : console.info)("First time executing, running init script");
            await Bluebird.using(lockMigrations(tx, modelName), (async () => {
                await tx.executeSql(initSql);
            }));
        }
    };
    exports.postRun = postRun;
    const run = async (tx, model) => {
        var _a, _b;
        const {migrations: migrations} = model;
        if (null == migrations || _.isEmpty(migrations)) return;
        const modelName = model.apiRoot, exists = undefined;
        if (!await checkModelAlreadyExists(tx, modelName)) {
            (null !== (_b = null === (_a = sbvrUtils.api.migrations) || void 0 === _a ? void 0 : _a.logger.info) && void 0 !== _b ? _b : console.info)("First time model has executed, skipping migrations");
            return await setExecutedMigrations(tx, modelName, Object.keys(migrations));
        }
        await Bluebird.using(lockMigrations(tx, modelName), (async () => {
            const executedMigrations = await getExecutedMigrations(tx, modelName), pendingMigrations = filterAndSortPendingMigrations(migrations, executedMigrations);
            if (0 === pendingMigrations.length) return;
            const newlyExecutedMigrations = await executeMigrations(tx, pendingMigrations);
            await setExecutedMigrations(tx, modelName, [ ...executedMigrations, ...newlyExecutedMigrations ]);
        }));
    };
    exports.run = run;
    const checkModelAlreadyExists = async (tx, modelName) => {
        const result = undefined;
        if (0 === (await tx.tableList("name = 'migration'")).rows.length) return !1;
        const {rows: rows} = await tx.executeSql(binds`
SELECT 1
FROM "model"
WHERE "model"."is of-vocabulary" = ${1}
LIMIT 1`, [ modelName ]);
        return rows.length > 0;
    }, getExecutedMigrations = async (tx, modelName) => {
        const {rows: rows} = await tx.executeSql(binds`
SELECT "migration"."executed migrations" AS "executed_migrations"
FROM "migration"
WHERE "migration"."model name" = ${1}`, [ modelName ]), data = rows[0];
        return null == data ? [] : JSON.parse(data.executed_migrations);
    }, setExecutedMigrations = async (tx, modelName, executedMigrations) => {
        const stringifiedMigrations = JSON.stringify(executedMigrations), result = undefined;
        if (0 === (await tx.tableList("name = 'migration'")).rows.length) return;
        const {rowsAffected: rowsAffected} = await tx.executeSql(binds`
UPDATE "migration"
SET "model name" = ${1},
"executed migrations" = ${2}
WHERE "migration"."model name" = ${3}`, [ modelName, stringifiedMigrations, modelName ]);
        0 === rowsAffected && tx.executeSql(binds`
INSERT INTO "migration" ("model name", "executed migrations")
VALUES (${1}, ${2})`, [ modelName, stringifiedMigrations ]);
    }, filterAndSortPendingMigrations = (migrations, executedMigrations) => _(migrations).omit(executedMigrations).toPairs().sortBy((([migrationKey]) => migrationKey)).value(), lockMigrations = (tx, modelName) => Bluebird.try((async () => {
        try {
            await tx.executeSql(binds`
DELETE FROM "migration lock"
WHERE "model name" = ${1}
AND "created at" < ${2}`, [ modelName, new Date(Date.now() - env_1.migrator.lockTimeout) ]);
            await tx.executeSql(binds`
INSERT INTO "migration lock" ("model name")
VALUES (${1})`, [ modelName ]);
        } catch (err) {
            await Bluebird.delay(env_1.migrator.lockFailDelay);
            throw err;
        }
    })).disposer((async () => {
        try {
            await tx.executeSql(binds`
DELETE FROM "migration lock"
WHERE "model name" = ${1}`, [ modelName ]);
        } catch (_a) {}
    })), executeMigrations = async (tx, migrations = []) => {
        var _a, _b;
        try {
            for (const migration of migrations) await executeMigration(tx, migration);
        } catch (err) {
            (null !== (_b = null === (_a = sbvrUtils.api.migrations) || void 0 === _a ? void 0 : _a.logger.error) && void 0 !== _b ? _b : console.error)("Error while executing migrations, rolled back");
            throw new MigrationError(err);
        }
        return migrations.map((([migrationKey]) => migrationKey));
    }, executeMigration = async (tx, [key, migration]) => {
        var _a, _b;
        (null !== (_b = null === (_a = sbvrUtils.api.migrations) || void 0 === _a ? void 0 : _a.logger.info) && void 0 !== _b ? _b : console.info)(`Running migration ${JSON.stringify(key)}`);
        if ("function" == typeof migration) await migration(tx, sbvrUtils); else {
            if ("string" != typeof migration) throw new MigrationError("Invalid migration type: " + typeof migration);
            await tx.executeSql(migration);
        }
    };
    exports.config = {
        models: [ {
            modelName: "migrations",
            apiRoot: "migrations",
            modelText: modelText,
            migrations: {
                "11.0.0-modified-at": '\n\t\t\t\t\tALTER TABLE "migration"\n\t\t\t\t\tADD COLUMN IF NOT EXISTS "modified at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;\n\t\t\t\t',
                "11.0.1-modified-at": '\n\t\t\t\t\tALTER TABLE "migration lock"\n\t\t\t\t\tADD COLUMN IF NOT EXISTS "modified at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;\n\t\t\t\t'
            }
        } ]
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    function peg$subclass(child, parent) {
        function C() {
            this.constructor = child;
        }
        C.prototype = parent.prototype;
        child.prototype = new C;
    }
    function peg$SyntaxError(message, expected, found, location) {
        this.message = message;
        this.expected = expected;
        this.found = found;
        this.location = location;
        this.name = "SyntaxError";
        "function" == typeof Error.captureStackTrace && Error.captureStackTrace(this, peg$SyntaxError);
    }
    peg$subclass(peg$SyntaxError, Error);
    peg$SyntaxError.buildMessage = function(expected, found, location) {
        var DESCRIBE_EXPECTATION_FNS = {
            literal: function(expectation) {
                return '"' + literalEscape(expectation.text) + '"';
            },
            class: function(expectation) {
                var escapedParts = expectation.parts.map((function(part) {
                    return Array.isArray(part) ? classEscape(part[0]) + "-" + classEscape(part[1]) : classEscape(part);
                }));
                return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
            },
            any: function() {
                return "any character";
            },
            end: function() {
                return "end of input";
            },
            other: function(expectation) {
                return expectation.description;
            },
            not: function(expectation) {
                return "not " + describeExpectation(expectation.expected);
            }
        };
        function hex(ch) {
            return ch.charCodeAt(0).toString(16).toUpperCase();
        }
        function literalEscape(s) {
            return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (function(ch) {
                return "\\x0" + hex(ch);
            })).replace(/[\x10-\x1F\x7F-\x9F]/g, (function(ch) {
                return "\\x" + hex(ch);
            }));
        }
        function classEscape(s) {
            return s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (function(ch) {
                return "\\x0" + hex(ch);
            })).replace(/[\x10-\x1F\x7F-\x9F]/g, (function(ch) {
                return "\\x" + hex(ch);
            }));
        }
        function describeExpectation(expectation) {
            return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
        }
        function describeExpected(expected) {
            var descriptions = expected.map(describeExpectation), i, j;
            descriptions.sort();
            if (descriptions.length > 0) {
                for (i = 1, j = 1; i < descriptions.length; i++) if (descriptions[i - 1] !== descriptions[i]) {
                    descriptions[j] = descriptions[i];
                    j++;
                }
                descriptions.length = j;
            }
            switch (descriptions.length) {
              case 1:
                return descriptions[0];

              case 2:
                return descriptions[0] + " or " + descriptions[1];

              default:
                return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
            }
        }
        function describeFound(found) {
            return found ? '"' + literalEscape(found) + '"' : "end of input";
        }
        return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
    };
    function peg$parse(input, options) {
        options = void 0 !== options ? options : {};
        var peg$FAILED = {}, peg$startRuleFunctions = {
            Process: peg$parseProcess,
            ProcessRule: peg$parseProcessRule
        }, peg$startRuleFunction = peg$parseProcess, peg$c0 = "/$metadata", peg$c1 = "/", peg$c2 = "&", peg$c3 = "$", peg$c4 = "%24", peg$c5 = "@", peg$c6 = "=", peg$c7 = "orderby=", peg$c8 = ",", peg$c9 = "asc", peg$c10 = "desc", peg$c11 = "top=", peg$c12 = "skip=", peg$c13 = "inlinecount=", peg$c14 = "allpages", peg$c15 = "none", peg$c16 = "count=", peg$c17 = "expand=", peg$c18 = "select=", peg$c19 = "*", peg$c20 = "filter=", peg$c21 = "+", peg$c22 = "json", peg$c23 = "atom", peg$c24 = "xml", peg$c25 = "format=", peg$c26 = ";", peg$c27 = "odata.", peg$c28 = "metadata=", peg$c29 = "minimal", peg$c30 = "full", peg$c31 = "in", peg$c32 = "(", peg$c33 = ")", peg$c34 = "eq", peg$c35 = "ne", peg$c36 = "gt", peg$c37 = "ge", peg$c38 = "lt", peg$c39 = "le", peg$c40 = "and", peg$c41 = "or", peg$c42 = "sub", peg$c43 = "add", peg$c44 = "mod", peg$c45 = "div", peg$c46 = "mul", peg$c47 = "not", peg$c48 = "cast", peg$c49 = "ceiling", peg$c50 = "concat", peg$c51 = "contains", peg$c52 = "date", peg$c53 = "day", peg$c54 = "endswith", peg$c55 = "floor", peg$c56 = "fractionalseconds", peg$c57 = "hour", peg$c58 = "indexof", peg$c59 = "isof", peg$c60 = "length", peg$c61 = "maxdatetime", peg$c62 = "mindatetime", peg$c63 = "minute", peg$c64 = "month", peg$c65 = "now", peg$c66 = "replace", peg$c67 = "round", peg$c68 = "second", peg$c69 = "startswith", peg$c70 = "substringof", peg$c71 = "substring", peg$c72 = "time", peg$c73 = "tolower", peg$c74 = "totaloffsetminutes", peg$c75 = "totalseconds", peg$c76 = "toupper", peg$c77 = "trim", peg$c78 = "year", peg$c79 = "any", peg$c80 = "all", peg$c81 = ":", peg$c82 = "/$count", peg$c83 = "/$links", peg$c84 = "?", peg$c85 = ".", peg$c86 = "null", peg$c87 = "true", peg$c88 = "false", peg$c89 = "duration", peg$c90 = "P", peg$c91 = "D", peg$c92 = "T", peg$c93 = "H", peg$c94 = "M", peg$c95 = "S", peg$c96 = "%2B", peg$c97 = "-", peg$c98 = "'", peg$c99 = "%27", peg$c100 = "datetime", peg$c101 = " ", peg$c102 = "%20", peg$r0 = /^[a-z]/i, peg$r1 = /^[&;]/, peg$r2 = /^[^:\/?#[\]@!$*&()+,;= %]/, peg$r3 = /^[0-9]/, peg$r4 = /^[^:\/?#[\]@!$*&()+,;=]/, peg$e0 = peg$literalExpectation("/$metadata", !1), peg$e1 = peg$literalExpectation("/", !1), peg$e2 = peg$literalExpectation("&", !1), peg$e3 = peg$otherExpectation("$ query options"), peg$e4 = peg$literalExpectation("@", !1), peg$e5 = peg$literalExpectation("=", !1), peg$e6 = peg$literalExpectation("orderby=", !1), peg$e7 = peg$literalExpectation(",", !1), peg$e8 = peg$literalExpectation("asc", !1), peg$e9 = peg$literalExpectation("desc", !1), peg$e10 = peg$literalExpectation("top=", !1), peg$e11 = peg$literalExpectation("skip=", !1), peg$e12 = peg$literalExpectation("inlinecount=", !1), peg$e13 = peg$literalExpectation("allpages", !1), peg$e14 = peg$literalExpectation("none", !1), peg$e15 = peg$literalExpectation("count=", !1), peg$e16 = peg$literalExpectation("expand=", !1), peg$e17 = peg$literalExpectation("select=", !1), peg$e18 = peg$literalExpectation("*", !1), peg$e19 = peg$literalExpectation("filter=", !1), peg$e20 = peg$classExpectation([ [ "a", "z" ] ], !1, !0), peg$e21 = peg$literalExpectation("+", !1), peg$e22 = peg$literalExpectation("json", !1), peg$e23 = peg$literalExpectation("atom", !1), peg$e24 = peg$literalExpectation("xml", !1), peg$e25 = peg$literalExpectation("format=", !1), peg$e26 = peg$literalExpectation(";", !1), peg$e27 = peg$literalExpectation("odata.", !1), peg$e28 = peg$literalExpectation("metadata=", !1), peg$e29 = peg$literalExpectation("minimal", !1), peg$e30 = peg$literalExpectation("full", !1), peg$e31 = peg$literalExpectation("in", !1), peg$e32 = peg$literalExpectation("(", !1), peg$e33 = peg$literalExpectation(")", !1), peg$e34 = peg$literalExpectation("eq", !1), peg$e35 = peg$literalExpectation("ne", !1), peg$e36 = peg$literalExpectation("gt", !1), peg$e37 = peg$literalExpectation("ge", !1), peg$e38 = peg$literalExpectation("lt", !1), peg$e39 = peg$literalExpectation("le", !1), peg$e40 = peg$literalExpectation("and", !1), peg$e41 = peg$literalExpectation("or", !1), peg$e42 = peg$literalExpectation("sub", !1), peg$e43 = peg$literalExpectation("add", !1), peg$e44 = peg$literalExpectation("mod", !1), peg$e45 = peg$literalExpectation("div", !1), peg$e46 = peg$literalExpectation("mul", !1), peg$e47 = peg$literalExpectation("not", !1), peg$e48 = peg$literalExpectation("cast", !1), peg$e49 = peg$literalExpectation("ceiling", !1), peg$e50 = peg$literalExpectation("concat", !1), peg$e51 = peg$literalExpectation("contains", !1), peg$e52 = peg$literalExpectation("date", !1), peg$e53 = peg$literalExpectation("day", !1), peg$e54 = peg$literalExpectation("endswith", !1), peg$e55 = peg$literalExpectation("floor", !1), peg$e56 = peg$literalExpectation("fractionalseconds", !1), peg$e57 = peg$literalExpectation("hour", !1), peg$e58 = peg$literalExpectation("indexof", !1), peg$e59 = peg$literalExpectation("isof", !1), peg$e60 = peg$literalExpectation("length", !1), peg$e61 = peg$literalExpectation("maxdatetime", !1), peg$e62 = peg$literalExpectation("mindatetime", !1), peg$e63 = peg$literalExpectation("minute", !1), peg$e64 = peg$literalExpectation("month", !1), peg$e65 = peg$literalExpectation("now", !1), peg$e66 = peg$literalExpectation("replace", !1), peg$e67 = peg$literalExpectation("round", !1), peg$e68 = peg$literalExpectation("second", !1), peg$e69 = peg$literalExpectation("startswith", !1), peg$e70 = peg$literalExpectation("substringof", !1), peg$e71 = peg$literalExpectation("substring", !1), peg$e72 = peg$literalExpectation("time", !1), peg$e73 = peg$literalExpectation("tolower", !1), peg$e74 = peg$literalExpectation("totaloffsetminutes", !1), peg$e75 = peg$literalExpectation("totalseconds", !1), peg$e76 = peg$literalExpectation("toupper", !1), peg$e77 = peg$literalExpectation("trim", !1), peg$e78 = peg$literalExpectation("year", !1), peg$e79 = peg$literalExpectation("any", !1), peg$e80 = peg$literalExpectation("all", !1), peg$e81 = peg$literalExpectation(":", !1), peg$e82 = peg$literalExpectation("/$count", !1), peg$e83 = peg$classExpectation([ "&", ";" ], !1, !1), peg$e84 = peg$literalExpectation("/$links", !1), peg$e85 = peg$literalExpectation("?", !1), peg$e86 = peg$classExpectation([ ":", "/", "?", "#", "[", "]", "@", "!", "$", "*", "&", "(", ")", "+", ",", ";", "=", " ", "%" ], !0, !1), peg$e87 = peg$classExpectation([ [ "0", "9" ] ], !1, !1), peg$e88 = peg$literalExpectation(".", !1), peg$e89 = peg$literalExpectation("null", !1), peg$e90 = peg$literalExpectation("true", !1), peg$e91 = peg$literalExpectation("false", !1), peg$e92 = peg$literalExpectation("duration", !1), peg$e93 = peg$literalExpectation("P", !1), peg$e94 = peg$literalExpectation("D", !1), peg$e95 = peg$literalExpectation("T", !1), peg$e96 = peg$literalExpectation("H", !1), peg$e97 = peg$literalExpectation("M", !1), peg$e98 = peg$literalExpectation("S", !1), peg$e99 = peg$classExpectation([ ":", "/", "?", "#", "[", "]", "@", "!", "$", "*", "&", "(", ")", "+", ",", ";", "=" ], !0, !1), peg$e100 = peg$literalExpectation("%2B", !1), peg$e101 = peg$literalExpectation("-", !1), peg$e102 = peg$literalExpectation("'", !1), peg$e103 = peg$literalExpectation("%27", !1), peg$e104 = peg$anyExpectation(), peg$e105 = peg$literalExpectation("datetime", !1), peg$e106 = peg$literalExpectation("$", !1), peg$e107 = peg$literalExpectation(" ", !1), peg$e108 = peg$literalExpectation("%20", !1), peg$f0 = function() {
            reset();
            return !0;
        }, peg$f1 = function(tree) {
            return {
                tree: tree,
                binds: binds
            };
        }, peg$f2 = function() {
            reset();
            var tree = eval(`peg$parse${options.rule}()`);
            return {
                tree: tree,
                binds: binds
            };
        }, peg$f3 = function(model) {
            return model;
        }, peg$f4 = function() {
            return {
                resource: "$metadata"
            };
        }, peg$f5 = function() {
            return {
                resource: "$serviceroot"
            };
        }, peg$f6 = function(option, options) {
            return CollapseObjectArray([ option, ...options ]);
        }, peg$f7 = function(name, n) {
            return [ "Real", n ];
        }, peg$f8 = function(name, b) {
            return [ "Boolean", b ];
        }, peg$f9 = function(name, s) {
            return [ "Text", s ];
        }, peg$f10 = function(name, value) {
            return !binds["@" + name];
        }, peg$f11 = function(name, value) {
            binds["@" + name] = value;
            return {
                name: "@" + name,
                value: value
            };
        }, peg$f12 = function(name, value) {
            return {
                name: name,
                value: value
            };
        }, peg$f13 = function(property, properties) {
            return {
                name: "$orderby",
                value: {
                    properties: [ property, ...properties ]
                }
            };
        }, peg$f14 = function(property) {
            return "desc";
        }, peg$f15 = function(property, order) {
            property.order = order;
            return property;
        }, peg$f16 = function(value) {
            return {
                name: "$top",
                value: value
            };
        }, peg$f17 = function(value) {
            return {
                name: "$skip",
                value: value
            };
        }, peg$f18 = function() {
            return "";
        }, peg$f19 = function(value) {
            return {
                name: "$inlinecount",
                value: value
            };
        }, peg$f20 = function(value) {
            return {
                name: "$count",
                value: value
            };
        }, peg$f21 = function(properties) {
            return {
                name: "$expand",
                value: {
                    properties: properties
                }
            };
        }, peg$f22 = function(properties) {
            return {
                properties: properties
            };
        }, peg$f23 = function(value) {
            return {
                name: "$select",
                value: value
            };
        }, peg$f24 = function(expr) {
            return {
                name: "$filter",
                value: expr
            };
        }, peg$f25 = function(type, metadata) {
            return {
                name: "$format",
                value: {
                    type: type,
                    metadata: metadata
                }
            };
        }, peg$f26 = function(type) {
            return {
                name: "$format",
                value: type
            };
        }, peg$f27 = function() {
            precedence = 0;
        }, peg$f28 = function() {
            return precedence;
        }, peg$f29 = function(minPrecedence, x) {
            return [ x ];
        }, peg$f30 = function(minPrecedence, lhs, op) {
            return (precedence = operatorPrecedence[op] + 1) > minPrecedence;
        }, peg$f31 = function(minPrecedence, lhs, op, rhs) {
            Array.isArray(lhs[0]) && op === lhs[0][0] ? lhs[0].push(rhs) : lhs[0] = [ op, lhs[0], rhs ];
        }, peg$f32 = function(minPrecedence, lhs, op, rhs) {
            lhs[0] = [ op, lhs[0], rhs ];
        }, peg$f33 = function(minPrecedence, lhs) {
            return lhs[0];
        }, peg$f34 = function(minPrecedence) {
            return minPrecedence > 0;
        }, peg$f35 = function(minPrecedence) {
            precedence = 0;
            return peg$parseFilterByExpressionLoop();
        }, peg$f36 = function(first, rest) {
            return [ first, ...rest ];
        }, peg$f37 = function(methodName, first, rest) {
            return [ first, ...rest ];
        }, peg$f38 = function(methodName) {
            return [];
        }, peg$f39 = function(methodName, args) {
            return args.length === methods[methodName] || Array.isArray(methods[methodName]) && methods[methodName].includes(args.length);
        }, peg$f40 = function(methodName, args) {
            return [ "call", {
                args: args,
                method: methodName
            } ];
        }, peg$f41 = function(name, identifier, expression) {
            return {
                expression: expression,
                identifier: identifier,
                method: name
            };
        }, peg$f42 = function(path, paths) {
            return [ path, ...paths ];
        }, peg$f43 = function(resource, property) {
            return !0;
        }, peg$f44 = function(resource, property, count) {
            return {
                name: resource,
                property: property,
                count: count
            };
        }, peg$f45 = function(resource) {
            return !0;
        }, peg$f46 = function(resource, count, option, options) {
            return CollapseObjectArray([ option, ...options ]);
        }, peg$f47 = function(resource, count) {
            return {};
        }, peg$f48 = function(resource, count, optionsObj, next) {
            return {
                name: resource,
                property: next,
                count: count,
                options: optionsObj
            };
        }, peg$f49 = function(resource, next) {
            return {
                name: resource,
                property: next
            };
        }, peg$f50 = function(resource, lambda) {
            return {
                name: resource,
                lambda: lambda
            };
        }, peg$f51 = function(resource, method) {
            return {
                name: resource,
                method: method
            };
        }, peg$f52 = function(keyBind, keyBinds) {
            return CollapseObjectArray([ keyBind, ...keyBinds ]);
        }, peg$f53 = function(name, value) {
            return {
                name: name,
                value: value
            };
        }, peg$f54 = function(resource) {
            return {
                resource: resource
            };
        }, peg$f55 = function(result, key) {
            result.key = key;
        }, peg$f56 = function(result, link) {
            result.link = link;
        }, peg$f57 = function(result, property) {
            result.property = property;
        }, peg$f58 = function(result) {
            result.count = !0;
        }, peg$f59 = function(result) {
            return result;
        }, peg$f60 = function(result, options) {
            result.options = options;
        }, peg$f61 = function(resourceName) {
            return decodeURIComponent(resourceName);
        }, peg$f62 = function(sign, d) {
            return Number(sign + d);
        }, peg$f63 = function(d) {
            return parseInt(d, 10);
        }, peg$f64 = function() {
            return null;
        }, peg$f65 = function() {
            return !0;
        }, peg$f66 = function() {
            return !1;
        }, peg$f67 = function(sign, day, hour, minute, second) {
            return hour || minute || second;
        }, peg$f68 = function(sign, day, hour, minute, second) {
            return {
                hour: hour || void 0,
                minute: minute || void 0,
                second: second || void 0
            };
        }, peg$f69 = function(sign, day, time) {
            return day || time;
        }, peg$f70 = function(sign, day, time) {
            return {
                negative: "-" === sign,
                day: day || void 0,
                hour: time ? time.hour : void 0,
                minute: time ? time.minute : void 0,
                second: time ? time.second : void 0
            };
        }, peg$f71 = function(d) {
            return Number(d);
        }, peg$f72 = function(text) {
            return decodeURIComponent(text);
        }, peg$f73 = function() {
            return "+";
        }, peg$f74 = function() {
            return "'";
        }, peg$f75 = function(text) {
            return decodeURIComponent(text.join(""));
        }, peg$f76 = function(param) {
            return {
                bind: "@" + param
            };
        }, peg$f77 = function(n) {
            return Bind("Real", n);
        }, peg$f78 = function() {
            return "Date Time";
        }, peg$f79 = function() {
            return "Date";
        }, peg$f80 = function(type, date) {
            return Date.parse(date);
        }, peg$f81 = function(type, date) {
            return isNaN(date);
        }, peg$f82 = function(type, date) {
            return [ type, date ];
        }, peg$f83 = function(d) {
            return Bind(d[0], d[1]);
        }, peg$f84 = function(b) {
            return Bind("Boolean", b);
        }, peg$f85 = function(resource) {
            var bind = Bind("ContentReference", resource);
            return {
                resource: bind,
                key: bind
            };
        }, peg$f86 = function(t) {
            return Bind("Text", t);
        }, peg$currPos = 0, peg$savedPos = 0, peg$posDetailsCache = [ {
            line: 1,
            column: 1
        } ], peg$expected = [], peg$silentFails = 0, peg$resultsCache = {}, peg$result;
        if ("startRule" in options) {
            if (!(options.startRule in peg$startRuleFunctions)) throw new Error("Can't start parsing from rule \"" + options.startRule + '".');
            peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
        }
        function peg$literalExpectation(text, ignoreCase) {
            return {
                type: "literal",
                text: text,
                ignoreCase: ignoreCase
            };
        }
        function peg$classExpectation(parts, inverted, ignoreCase) {
            return {
                type: "class",
                parts: parts,
                inverted: inverted,
                ignoreCase: ignoreCase
            };
        }
        function peg$anyExpectation() {
            return {
                type: "any"
            };
        }
        function peg$endExpectation() {
            return {
                type: "end"
            };
        }
        function peg$otherExpectation(description) {
            return {
                type: "other",
                description: description
            };
        }
        function peg$computePosDetails(pos) {
            var details = peg$posDetailsCache[pos], p;
            if (details) return details;
            p = pos - 1;
            for (;!peg$posDetailsCache[p]; ) p--;
            details = {
                line: (details = peg$posDetailsCache[p]).line,
                column: details.column
            };
            for (;p < pos; ) {
                if (10 === input.charCodeAt(p)) {
                    details.line++;
                    details.column = 1;
                } else details.column++;
                p++;
            }
            peg$posDetailsCache[pos] = details;
            return details;
        }
        function peg$computeLocation(startPos, endPos) {
            var loc = {}, startPosDetails = peg$computePosDetails(startPos);
            loc.start = {
                offset: startPos,
                line: startPosDetails.line,
                column: startPosDetails.column
            };
            var endPosDetails = peg$computePosDetails(endPos);
            loc.end = {
                offset: endPos,
                line: endPosDetails.line,
                column: endPosDetails.column
            };
            return loc;
        }
        function peg$begin() {
            peg$expected.push({
                pos: peg$currPos,
                variants: []
            });
        }
        function peg$expect(expected) {
            var top = peg$expected[peg$expected.length - 1];
            if (!(peg$currPos < top.pos)) {
                if (peg$currPos > top.pos) {
                    top.pos = peg$currPos;
                    top.variants = [];
                }
                top.variants.push(expected);
            }
        }
        function peg$end(invert) {
            var expected = peg$expected.pop(), top = peg$expected[peg$expected.length - 1], variants = expected.variants;
            if (top.pos === expected.pos) {
                invert && (variants = variants.map((function(e) {
                    return "not" === e.type ? e.expected : {
                        type: "not",
                        expected: e
                    };
                })));
                Array.prototype.push.apply(top.variants, variants);
            }
        }
        function peg$buildSimpleError(message, location) {
            return new peg$SyntaxError(message, null, null, location);
        }
        function peg$buildStructuredError(expected, found, location) {
            return new peg$SyntaxError(peg$SyntaxError.buildMessage(expected, found, location), expected, found, location);
        }
        function peg$buildError() {
            var expected = peg$expected[0], failPos = expected.pos;
            return peg$buildStructuredError(expected.variants, failPos < input.length ? input.charAt(failPos) : null, failPos < input.length ? peg$computeLocation(failPos, failPos + 1) : peg$computeLocation(failPos, failPos));
        }
        function peg$parseProcess() {
            var s0, s1, s2, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 0, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            peg$savedPos = peg$currPos;
            if ((s1 = (s1 = peg$f0()) ? void 0 : peg$FAILED) !== peg$FAILED) if ((s2 = peg$parseOData()) !== peg$FAILED) {
                peg$savedPos = s0;
                s0 = peg$f1(s2);
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseProcessRule() {
            var s0, s1, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 1, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s1 = "";
            peg$savedPos = s0 = peg$currPos;
            s0 = s1 = peg$f2();
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseOData() {
            var s0, s1, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 2, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            if ((s1 = peg$parsePathSegment()) !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$f3(s1);
            }
            if ((s0 = s1) === peg$FAILED) {
                s0 = peg$currPos;
                rule$expects(peg$e0);
                if (input.substr(peg$currPos, 10) === peg$c0) {
                    s1 = peg$c0;
                    peg$currPos += 10;
                } else s1 = peg$FAILED;
                if (s1 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$f4();
                }
                if ((s0 = s1) === peg$FAILED) {
                    s0 = peg$currPos;
                    rule$expects(peg$e1);
                    if (47 === input.charCodeAt(peg$currPos)) {
                        s1 = peg$c1;
                        peg$currPos++;
                    } else s1 = peg$FAILED;
                    if (s1 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$f5();
                    }
                    s0 = s1;
                }
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseQueryOptions() {
            var s0, s1, s2, s3, s4, s5, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 3, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            if ((s1 = peg$parseQueryOption()) !== peg$FAILED) {
                s2 = [];
                s3 = peg$currPos;
                rule$expects(peg$e2);
                if (38 === input.charCodeAt(peg$currPos)) {
                    s4 = peg$c2;
                    peg$currPos++;
                } else s4 = peg$FAILED;
                if (s4 !== peg$FAILED) if ((s5 = peg$parseQueryOption()) !== peg$FAILED) s3 = s5; else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                for (;s3 !== peg$FAILED; ) {
                    s2.push(s3);
                    s3 = peg$currPos;
                    rule$expects(peg$e2);
                    if (38 === input.charCodeAt(peg$currPos)) {
                        s4 = peg$c2;
                        peg$currPos++;
                    } else s4 = peg$FAILED;
                    if (s4 !== peg$FAILED) if ((s5 = peg$parseQueryOption()) !== peg$FAILED) s3 = s5; else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                peg$savedPos = s0;
                s0 = peg$f6(s1, s2);
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseQueryOption() {
            var s0, s1, s2, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 4, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            if ((s1 = peg$parseDollar()) !== peg$FAILED) {
                (s2 = peg$parseSelectOption()) === peg$FAILED && (s2 = peg$parseFilterByOption()) === peg$FAILED && (s2 = peg$parseExpandOption()) === peg$FAILED && (s2 = peg$parseSortOption()) === peg$FAILED && (s2 = peg$parseTopOption()) === peg$FAILED && (s2 = peg$parseSkipOption()) === peg$FAILED && (s2 = peg$parseCountOption()) === peg$FAILED && (s2 = peg$parseInlineCountOption()) === peg$FAILED && (s2 = peg$parseFormatOption());
                if (s2 !== peg$FAILED) s0 = s2; else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            s0 === peg$FAILED && (s0 = peg$parseOperationParam()) === peg$FAILED && (s0 = peg$parseParameterAliasOption());
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseDollar() {
            var s0, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 5, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            rule$expects(peg$e3);
            peg$silentFails++;
            if (36 === input.charCodeAt(peg$currPos)) {
                s0 = peg$c3;
                peg$currPos++;
            } else s0 = peg$FAILED;
            if (s0 === peg$FAILED) if (input.substr(peg$currPos, 3) === peg$c4) {
                s0 = peg$c4;
                peg$currPos += 3;
            } else s0 = peg$FAILED;
            peg$silentFails--;
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseParameterAliasOption() {
            var s0, s1, s2, s3, s4, s5, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 6, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            rule$expects(peg$e4);
            if (64 === input.charCodeAt(peg$currPos)) {
                s1 = peg$c5;
                peg$currPos++;
            } else s1 = peg$FAILED;
            if (s1 !== peg$FAILED) {
                s2 = peg$parseText();
                rule$expects(peg$e5);
                if (61 === input.charCodeAt(peg$currPos)) {
                    s3 = peg$c6;
                    peg$currPos++;
                } else s3 = peg$FAILED;
                if (s3 !== peg$FAILED) {
                    s4 = peg$currPos;
                    if ((s5 = peg$parseNumber()) !== peg$FAILED) {
                        peg$savedPos = s4;
                        s5 = peg$f7(s2, s5);
                    }
                    if ((s4 = s5) === peg$FAILED) {
                        s4 = peg$currPos;
                        if ((s5 = peg$parseBoolean()) !== peg$FAILED) {
                            peg$savedPos = s4;
                            s5 = peg$f8(s2, s5);
                        }
                        if ((s4 = s5) === peg$FAILED) {
                            s4 = peg$currPos;
                            if ((s5 = peg$parseQuotedText()) !== peg$FAILED) {
                                peg$savedPos = s4;
                                s5 = peg$f9(s2, s5);
                            }
                            (s4 = s5) === peg$FAILED && (s4 = peg$parseDate());
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        peg$savedPos = peg$currPos;
                        if ((s5 = (s5 = peg$f10(s2, s4)) ? void 0 : peg$FAILED) !== peg$FAILED) {
                            peg$savedPos = s0;
                            s0 = peg$f11(s2, s4);
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseOperationParam() {
            var s0, s1, s2, s3, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 7, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            s1 = peg$parseText();
            rule$expects(peg$e5);
            if (61 === input.charCodeAt(peg$currPos)) {
                s2 = peg$c6;
                peg$currPos++;
            } else s2 = peg$FAILED;
            if (s2 !== peg$FAILED) {
                s3 = peg$parseText();
                peg$savedPos = s0;
                s0 = peg$f12(s1, s3);
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseSortOption() {
            var s0, s1, s2, s3, s4, s5, s6, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 8, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            rule$expects(peg$e6);
            if (input.substr(peg$currPos, 8) === peg$c7) {
                s1 = peg$c7;
                peg$currPos += 8;
            } else s1 = peg$FAILED;
            if (s1 !== peg$FAILED) if ((s2 = peg$parseSortProperty()) !== peg$FAILED) {
                s3 = [];
                s4 = peg$currPos;
                rule$expects(peg$e7);
                if (44 === input.charCodeAt(peg$currPos)) {
                    s5 = peg$c8;
                    peg$currPos++;
                } else s5 = peg$FAILED;
                if (s5 !== peg$FAILED) if ((s6 = peg$parseSortProperty()) !== peg$FAILED) s4 = s6; else {
                    peg$currPos = s4;
                    s4 = peg$FAILED;
                } else {
                    peg$currPos = s4;
                    s4 = peg$FAILED;
                }
                for (;s4 !== peg$FAILED; ) {
                    s3.push(s4);
                    s4 = peg$currPos;
                    rule$expects(peg$e7);
                    if (44 === input.charCodeAt(peg$currPos)) {
                        s5 = peg$c8;
                        peg$currPos++;
                    } else s5 = peg$FAILED;
                    if (s5 !== peg$FAILED) if ((s6 = peg$parseSortProperty()) !== peg$FAILED) s4 = s6; else {
                        peg$currPos = s4;
                        s4 = peg$FAILED;
                    } else {
                        peg$currPos = s4;
                        s4 = peg$FAILED;
                    }
                }
                peg$savedPos = s0;
                s0 = peg$f13(s2, s3);
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseSortProperty() {
            var s0, s1, s2, s3, s4, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 9, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            if ((s1 = peg$parsePropertyPath()) !== peg$FAILED) {
                s2 = peg$parsespaces();
                rule$expects(peg$e8);
                if (input.substr(peg$currPos, 3) === peg$c9) {
                    s3 = peg$c9;
                    peg$currPos += 3;
                } else s3 = peg$FAILED;
                if (s3 === peg$FAILED) {
                    rule$expects(peg$e9);
                    if (input.substr(peg$currPos, 4) === peg$c10) {
                        s3 = peg$c10;
                        peg$currPos += 4;
                    } else s3 = peg$FAILED;
                    if (s3 === peg$FAILED) {
                        s4 = "";
                        peg$savedPos = s3 = peg$currPos;
                        s3 = s4 = peg$f14(s1);
                    }
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s0 = peg$f15(s1, s3);
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseTopOption() {
            var s0, s1, s2, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 10, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            rule$expects(peg$e10);
            if (input.substr(peg$currPos, 4) === peg$c11) {
                s1 = peg$c11;
                peg$currPos += 4;
            } else s1 = peg$FAILED;
            if (s1 !== peg$FAILED) if ((s2 = peg$parseUnsignedInteger()) !== peg$FAILED) {
                peg$savedPos = s0;
                s0 = peg$f16(s2);
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseSkipOption() {
            var s0, s1, s2, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 11, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            rule$expects(peg$e11);
            if (input.substr(peg$currPos, 5) === peg$c12) {
                s1 = peg$c12;
                peg$currPos += 5;
            } else s1 = peg$FAILED;
            if (s1 !== peg$FAILED) if ((s2 = peg$parseUnsignedInteger()) !== peg$FAILED) {
                peg$savedPos = s0;
                s0 = peg$f17(s2);
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseInlineCountOption() {
            var s0, s1, s2, s3, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 12, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            rule$expects(peg$e12);
            if (input.substr(peg$currPos, 12) === peg$c13) {
                s1 = peg$c13;
                peg$currPos += 12;
            } else s1 = peg$FAILED;
            if (s1 !== peg$FAILED) {
                rule$expects(peg$e13);
                if (input.substr(peg$currPos, 8) === peg$c14) {
                    s2 = peg$c14;
                    peg$currPos += 8;
                } else s2 = peg$FAILED;
                if (s2 === peg$FAILED) {
                    rule$expects(peg$e14);
                    if (input.substr(peg$currPos, 4) === peg$c15) {
                        s2 = peg$c15;
                        peg$currPos += 4;
                    } else s2 = peg$FAILED;
                    if (s2 === peg$FAILED) {
                        s2 = peg$currPos;
                        s3 = peg$parseText();
                        peg$savedPos = s2;
                        s2 = s3 = peg$f18();
                    }
                }
                if (s2 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s0 = peg$f19(s2);
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseCountOption() {
            var s0, s1, s2, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 13, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            rule$expects(peg$e15);
            if (input.substr(peg$currPos, 6) === peg$c16) {
                s1 = peg$c16;
                peg$currPos += 6;
            } else s1 = peg$FAILED;
            if (s1 !== peg$FAILED) if ((s2 = peg$parseBoolean()) !== peg$FAILED) {
                peg$savedPos = s0;
                s0 = peg$f20(s2);
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseExpandOption() {
            var s0, s1, s2, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 14, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            rule$expects(peg$e16);
            if (input.substr(peg$currPos, 7) === peg$c17) {
                s1 = peg$c17;
                peg$currPos += 7;
            } else s1 = peg$FAILED;
            if (s1 !== peg$FAILED) if ((s2 = peg$parseExpandPropertyPathList()) !== peg$FAILED) {
                peg$savedPos = s0;
                s0 = peg$f21(s2);
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseSelectOption() {
            var s0, s1, s2, s3, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 15, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            rule$expects(peg$e17);
            if (input.substr(peg$currPos, 7) === peg$c18) {
                s1 = peg$c18;
                peg$currPos += 7;
            } else s1 = peg$FAILED;
            if (s1 !== peg$FAILED) {
                rule$expects(peg$e18);
                if (42 === input.charCodeAt(peg$currPos)) {
                    s2 = peg$c19;
                    peg$currPos++;
                } else s2 = peg$FAILED;
                if (s2 === peg$FAILED) {
                    s2 = peg$currPos;
                    if ((s3 = peg$parsePropertyPathList()) !== peg$FAILED) {
                        peg$savedPos = s2;
                        s3 = peg$f22(s3);
                    }
                    s2 = s3;
                }
                if (s2 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s0 = peg$f23(s2);
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseFilterByOption() {
            var s0, s1, s2, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 16, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            rule$expects(peg$e19);
            if (input.substr(peg$currPos, 7) === peg$c20) {
                s1 = peg$c20;
                peg$currPos += 7;
            } else s1 = peg$FAILED;
            if (s1 !== peg$FAILED) if ((s2 = peg$parseFilterByExpression()) !== peg$FAILED) {
                peg$savedPos = s0;
                s0 = peg$f24(s2);
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseContentType() {
            var s0, s1, s2, s3, s4, s5, s6, s7, s8, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 17, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            s1 = peg$currPos;
            s2 = [];
            rule$expects(peg$e20);
            if (peg$r0.test(input.charAt(peg$currPos))) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
            } else s3 = peg$FAILED;
            if (s3 !== peg$FAILED) for (;s3 !== peg$FAILED; ) {
                s2.push(s3);
                rule$expects(peg$e20);
                if (peg$r0.test(input.charAt(peg$currPos))) {
                    s3 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else s3 = peg$FAILED;
            } else s2 = peg$FAILED;
            if (s2 !== peg$FAILED) {
                rule$expects(peg$e1);
                if (47 === input.charCodeAt(peg$currPos)) {
                    s3 = peg$c1;
                    peg$currPos++;
                } else s3 = peg$FAILED;
                if (s3 !== peg$FAILED) {
                    s4 = [];
                    rule$expects(peg$e20);
                    if (peg$r0.test(input.charAt(peg$currPos))) {
                        s5 = input.charAt(peg$currPos);
                        peg$currPos++;
                    } else s5 = peg$FAILED;
                    if (s5 !== peg$FAILED) for (;s5 !== peg$FAILED; ) {
                        s4.push(s5);
                        rule$expects(peg$e20);
                        if (peg$r0.test(input.charAt(peg$currPos))) {
                            s5 = input.charAt(peg$currPos);
                            peg$currPos++;
                        } else s5 = peg$FAILED;
                    } else s4 = peg$FAILED;
                    if (s4 !== peg$FAILED) {
                        s5 = peg$currPos;
                        rule$expects(peg$e21);
                        if (43 === input.charCodeAt(peg$currPos)) {
                            s6 = peg$c21;
                            peg$currPos++;
                        } else s6 = peg$FAILED;
                        if (s6 !== peg$FAILED) {
                            s7 = [];
                            rule$expects(peg$e20);
                            if (peg$r0.test(input.charAt(peg$currPos))) {
                                s8 = input.charAt(peg$currPos);
                                peg$currPos++;
                            } else s8 = peg$FAILED;
                            if (s8 !== peg$FAILED) for (;s8 !== peg$FAILED; ) {
                                s7.push(s8);
                                rule$expects(peg$e20);
                                if (peg$r0.test(input.charAt(peg$currPos))) {
                                    s8 = input.charAt(peg$currPos);
                                    peg$currPos++;
                                } else s8 = peg$FAILED;
                            } else s7 = peg$FAILED;
                            if (s7 !== peg$FAILED) s5 = s6 = [ s6, s7 ]; else {
                                peg$currPos = s5;
                                s5 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                        s5 === peg$FAILED && (s5 = null);
                        s1 = s2 = [ s2, s3, s4, s5 ];
                    } else {
                        peg$currPos = s1;
                        s1 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
            if (s1 === peg$FAILED) {
                rule$expects(peg$e22);
                if (input.substr(peg$currPos, 4) === peg$c22) {
                    s1 = peg$c22;
                    peg$currPos += 4;
                } else s1 = peg$FAILED;
                if (s1 === peg$FAILED) {
                    rule$expects(peg$e23);
                    if (input.substr(peg$currPos, 4) === peg$c23) {
                        s1 = peg$c23;
                        peg$currPos += 4;
                    } else s1 = peg$FAILED;
                    if (s1 === peg$FAILED) {
                        rule$expects(peg$e24);
                        if (input.substr(peg$currPos, 3) === peg$c24) {
                            s1 = peg$c24;
                            peg$currPos += 3;
                        } else s1 = peg$FAILED;
                    }
                }
            }
            s0 = s1 !== peg$FAILED ? input.substring(s0, peg$currPos) : s1;
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseFormatOption() {
            var s0, s1, s2, s3, s4, s5, s6, s7, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 18, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            rule$expects(peg$e25);
            if (input.substr(peg$currPos, 7) === peg$c25) {
                s1 = peg$c25;
                peg$currPos += 7;
            } else s1 = peg$FAILED;
            if (s1 !== peg$FAILED) if ((s2 = peg$parseContentType()) !== peg$FAILED) {
                s3 = peg$currPos;
                rule$expects(peg$e26);
                if (59 === input.charCodeAt(peg$currPos)) {
                    s4 = peg$c26;
                    peg$currPos++;
                } else s4 = peg$FAILED;
                if (s4 !== peg$FAILED) {
                    rule$expects(peg$e27);
                    if (input.substr(peg$currPos, 6) === peg$c27) {
                        s5 = peg$c27;
                        peg$currPos += 6;
                    } else s5 = peg$FAILED;
                    s5 === peg$FAILED && (s5 = null);
                    rule$expects(peg$e28);
                    if (input.substr(peg$currPos, 9) === peg$c28) {
                        s6 = peg$c28;
                        peg$currPos += 9;
                    } else s6 = peg$FAILED;
                    if (s6 !== peg$FAILED) {
                        rule$expects(peg$e14);
                        if (input.substr(peg$currPos, 4) === peg$c15) {
                            s7 = peg$c15;
                            peg$currPos += 4;
                        } else s7 = peg$FAILED;
                        if (s7 === peg$FAILED) {
                            rule$expects(peg$e29);
                            if (input.substr(peg$currPos, 7) === peg$c29) {
                                s7 = peg$c29;
                                peg$currPos += 7;
                            } else s7 = peg$FAILED;
                            if (s7 === peg$FAILED) {
                                rule$expects(peg$e30);
                                if (input.substr(peg$currPos, 4) === peg$c30) {
                                    s7 = peg$c30;
                                    peg$currPos += 4;
                                } else s7 = peg$FAILED;
                            }
                        }
                        if (s7 !== peg$FAILED) {
                            peg$savedPos = s3;
                            s3 = peg$f25(s2, s7);
                        } else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                if (s3 === peg$FAILED) {
                    s4 = "";
                    peg$savedPos = s3 = peg$currPos;
                    s3 = s4 = peg$f26(s2);
                }
                if (s3 !== peg$FAILED) s0 = s3; else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseFilterByExpression() {
            var s0, s1, s2, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 19, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            s2 = "";
            peg$savedPos = s1 = peg$currPos;
            s1 = s2 = peg$f27();
            if ((s2 = peg$parseFilterByExpressionLoop()) !== peg$FAILED) s0 = s2; else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseFilterByExpressionLoop() {
            var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 20, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            s2 = "";
            peg$savedPos = s1 = peg$currPos;
            s1 = s2 = peg$f28();
            s2 = peg$currPos;
            s3 = peg$currPos;
            if ((s4 = peg$parseFilterByValue()) !== peg$FAILED) {
                peg$savedPos = s3;
                s4 = peg$f29(s1, s4);
            }
            if ((s3 = s4) !== peg$FAILED) {
                s4 = [];
                s5 = peg$currPos;
                if ((s6 = peg$parseFilterByOperand()) !== peg$FAILED) {
                    peg$savedPos = peg$currPos;
                    if ((s7 = (s7 = peg$f30(s1, s3, s6)) ? void 0 : peg$FAILED) !== peg$FAILED) if ((s8 = peg$parseFilterByExpressionLoop()) !== peg$FAILED) {
                        peg$savedPos = s5;
                        s5 = peg$f31(s1, s3, s6, s8);
                    } else {
                        peg$currPos = s5;
                        s5 = peg$FAILED;
                    } else {
                        peg$currPos = s5;
                        s5 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                }
                if (s5 === peg$FAILED) {
                    s5 = peg$currPos;
                    s6 = peg$parsespaces();
                    rule$expects(peg$e31);
                    if (input.substr(peg$currPos, 2) === peg$c31) {
                        s7 = peg$c31;
                        peg$currPos += 2;
                    } else s7 = peg$FAILED;
                    if (s7 !== peg$FAILED) {
                        s8 = peg$parsespaces();
                        if ((s9 = peg$parseGroupedPrimitive()) !== peg$FAILED) {
                            peg$savedPos = s5;
                            s5 = peg$f32(s1, s3, s7, s9);
                        } else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s5;
                        s5 = peg$FAILED;
                    }
                }
                for (;s5 !== peg$FAILED; ) {
                    s4.push(s5);
                    s5 = peg$currPos;
                    if ((s6 = peg$parseFilterByOperand()) !== peg$FAILED) {
                        peg$savedPos = peg$currPos;
                        if ((s7 = (s7 = peg$f30(s1, s3, s6)) ? void 0 : peg$FAILED) !== peg$FAILED) if ((s8 = peg$parseFilterByExpressionLoop()) !== peg$FAILED) {
                            peg$savedPos = s5;
                            s5 = peg$f31(s1, s3, s6, s8);
                        } else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        } else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s5;
                        s5 = peg$FAILED;
                    }
                    if (s5 === peg$FAILED) {
                        s5 = peg$currPos;
                        s6 = peg$parsespaces();
                        rule$expects(peg$e31);
                        if (input.substr(peg$currPos, 2) === peg$c31) {
                            s7 = peg$c31;
                            peg$currPos += 2;
                        } else s7 = peg$FAILED;
                        if (s7 !== peg$FAILED) {
                            s8 = peg$parsespaces();
                            if ((s9 = peg$parseGroupedPrimitive()) !== peg$FAILED) {
                                peg$savedPos = s5;
                                s5 = peg$f32(s1, s3, s7, s9);
                            } else {
                                peg$currPos = s5;
                                s5 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                    }
                }
                peg$savedPos = s2;
                s2 = peg$f33(s1, s3);
            } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
            if (s2 === peg$FAILED) {
                s2 = peg$currPos;
                peg$savedPos = peg$currPos;
                if ((s3 = (s3 = peg$f34(s1)) ? void 0 : peg$FAILED) !== peg$FAILED) {
                    peg$savedPos = s2;
                    s3 = peg$f35(s1);
                }
                s2 = s3;
            }
            if (s2 !== peg$FAILED) s0 = s2; else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseFilterByValue() {
            var s0, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 21, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            (s0 = peg$parseGroupedPrecedenceExpression()) === peg$FAILED && (s0 = peg$parseFilterMethodCallExpression()) === peg$FAILED && (s0 = peg$parseFilterNegateExpression()) === peg$FAILED && (s0 = peg$parseParameterAlias()) === peg$FAILED && (s0 = peg$parsePrimitive());
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parsePrimitive() {
            var s0, s1, s2, s3, s4, s5, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 22, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            rule$expects(peg$e32);
            if (40 === input.charCodeAt(peg$currPos)) {
                s1 = peg$c32;
                peg$currPos++;
            } else s1 = peg$FAILED;
            if (s1 !== peg$FAILED) {
                s2 = peg$parsespaces();
                if ((s3 = peg$parsePrimitive()) !== peg$FAILED) {
                    s4 = peg$parsespaces();
                    rule$expects(peg$e33);
                    if (41 === input.charCodeAt(peg$currPos)) {
                        s5 = peg$c33;
                        peg$currPos++;
                    } else s5 = peg$FAILED;
                    if (s5 !== peg$FAILED) s0 = s3; else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            s0 === peg$FAILED && (s0 = peg$parseQuotedTextBind()) === peg$FAILED && (s0 = peg$parseNumberBind()) === peg$FAILED && (s0 = peg$parseBooleanBind()) === peg$FAILED && (s0 = peg$parseNull()) === peg$FAILED && (s0 = peg$parseDateBind()) === peg$FAILED && (s0 = peg$parseDuration()) === peg$FAILED && (s0 = peg$parseLambdaPropertyPath()) === peg$FAILED && (s0 = peg$parsePropertyPath());
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseGroupedPrecedenceExpression() {
            var s0, s1, s2, s3, s4, s5, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 23, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            rule$expects(peg$e32);
            if (40 === input.charCodeAt(peg$currPos)) {
                s1 = peg$c32;
                peg$currPos++;
            } else s1 = peg$FAILED;
            if (s1 !== peg$FAILED) {
                s2 = peg$parsespaces();
                if ((s3 = peg$parseFilterByExpression()) !== peg$FAILED) {
                    s4 = peg$parsespaces();
                    rule$expects(peg$e33);
                    if (41 === input.charCodeAt(peg$currPos)) {
                        s5 = peg$c33;
                        peg$currPos++;
                    } else s5 = peg$FAILED;
                    if (s5 !== peg$FAILED) s0 = s3; else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseFilterByOperand() {
            var s0, s1, s2, s3, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 24, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            s1 = peg$parsespaces();
            rule$expects(peg$e34);
            if (input.substr(peg$currPos, 2) === peg$c34) {
                s2 = peg$c34;
                peg$currPos += 2;
            } else s2 = peg$FAILED;
            if (s2 === peg$FAILED) {
                rule$expects(peg$e35);
                if (input.substr(peg$currPos, 2) === peg$c35) {
                    s2 = peg$c35;
                    peg$currPos += 2;
                } else s2 = peg$FAILED;
                if (s2 === peg$FAILED) {
                    rule$expects(peg$e36);
                    if (input.substr(peg$currPos, 2) === peg$c36) {
                        s2 = peg$c36;
                        peg$currPos += 2;
                    } else s2 = peg$FAILED;
                    if (s2 === peg$FAILED) {
                        rule$expects(peg$e37);
                        if (input.substr(peg$currPos, 2) === peg$c37) {
                            s2 = peg$c37;
                            peg$currPos += 2;
                        } else s2 = peg$FAILED;
                        if (s2 === peg$FAILED) {
                            rule$expects(peg$e38);
                            if (input.substr(peg$currPos, 2) === peg$c38) {
                                s2 = peg$c38;
                                peg$currPos += 2;
                            } else s2 = peg$FAILED;
                            if (s2 === peg$FAILED) {
                                rule$expects(peg$e39);
                                if (input.substr(peg$currPos, 2) === peg$c39) {
                                    s2 = peg$c39;
                                    peg$currPos += 2;
                                } else s2 = peg$FAILED;
                                if (s2 === peg$FAILED) {
                                    rule$expects(peg$e40);
                                    if (input.substr(peg$currPos, 3) === peg$c40) {
                                        s2 = peg$c40;
                                        peg$currPos += 3;
                                    } else s2 = peg$FAILED;
                                    if (s2 === peg$FAILED) {
                                        rule$expects(peg$e41);
                                        if (input.substr(peg$currPos, 2) === peg$c41) {
                                            s2 = peg$c41;
                                            peg$currPos += 2;
                                        } else s2 = peg$FAILED;
                                        if (s2 === peg$FAILED) {
                                            rule$expects(peg$e42);
                                            if (input.substr(peg$currPos, 3) === peg$c42) {
                                                s2 = peg$c42;
                                                peg$currPos += 3;
                                            } else s2 = peg$FAILED;
                                            if (s2 === peg$FAILED) {
                                                rule$expects(peg$e43);
                                                if (input.substr(peg$currPos, 3) === peg$c43) {
                                                    s2 = peg$c43;
                                                    peg$currPos += 3;
                                                } else s2 = peg$FAILED;
                                                if (s2 === peg$FAILED) {
                                                    rule$expects(peg$e44);
                                                    if (input.substr(peg$currPos, 3) === peg$c44) {
                                                        s2 = peg$c44;
                                                        peg$currPos += 3;
                                                    } else s2 = peg$FAILED;
                                                    if (s2 === peg$FAILED) {
                                                        rule$expects(peg$e45);
                                                        if (input.substr(peg$currPos, 3) === peg$c45) {
                                                            s2 = peg$c45;
                                                            peg$currPos += 3;
                                                        } else s2 = peg$FAILED;
                                                        if (s2 === peg$FAILED) {
                                                            rule$expects(peg$e46);
                                                            if (input.substr(peg$currPos, 3) === peg$c46) {
                                                                s2 = peg$c46;
                                                                peg$currPos += 3;
                                                            } else s2 = peg$FAILED;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parsespaces();
                s0 = s2;
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseFilterNegateExpression() {
            var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 25, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            s1 = peg$parsespaces();
            rule$expects(peg$e47);
            if (input.substr(peg$currPos, 3) === peg$c47) {
                s2 = peg$c47;
                peg$currPos += 3;
            } else s2 = peg$FAILED;
            if (s2 !== peg$FAILED) {
                s3 = peg$parsespaces();
                if ((s4 = peg$parseFilterByValue()) === peg$FAILED) {
                    s4 = peg$currPos;
                    rule$expects(peg$e32);
                    if (40 === input.charCodeAt(peg$currPos)) {
                        s5 = peg$c32;
                        peg$currPos++;
                    } else s5 = peg$FAILED;
                    if (s5 !== peg$FAILED) {
                        s6 = peg$parsespaces();
                        if ((s7 = peg$parseFilterByExpression()) !== peg$FAILED) {
                            s8 = peg$parsespaces();
                            rule$expects(peg$e33);
                            if (41 === input.charCodeAt(peg$currPos)) {
                                s9 = peg$c33;
                                peg$currPos++;
                            } else s9 = peg$FAILED;
                            if (s9 !== peg$FAILED) s4 = s7; else {
                                peg$currPos = s4;
                                s4 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s4;
                            s4 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s4;
                        s4 = peg$FAILED;
                    }
                }
                if (s4 !== peg$FAILED) s0 = [ s2, s4 ]; else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseGroupedPrimitive() {
            var s0, s1, s2, s3, s4, s5, s6, s7, s8, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 26, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            rule$expects(peg$e32);
            if (40 === input.charCodeAt(peg$currPos)) {
                s1 = peg$c32;
                peg$currPos++;
            } else s1 = peg$FAILED;
            if (s1 !== peg$FAILED) {
                s2 = peg$parsespaces();
                if ((s3 = peg$parsePrimitive()) !== peg$FAILED) {
                    s4 = [];
                    s5 = peg$currPos;
                    rule$expects(peg$e7);
                    if (44 === input.charCodeAt(peg$currPos)) {
                        s6 = peg$c8;
                        peg$currPos++;
                    } else s6 = peg$FAILED;
                    if (s6 !== peg$FAILED) {
                        s7 = peg$parsespaces();
                        if ((s8 = peg$parsePrimitive()) !== peg$FAILED) s5 = s8; else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s5;
                        s5 = peg$FAILED;
                    }
                    for (;s5 !== peg$FAILED; ) {
                        s4.push(s5);
                        s5 = peg$currPos;
                        rule$expects(peg$e7);
                        if (44 === input.charCodeAt(peg$currPos)) {
                            s6 = peg$c8;
                            peg$currPos++;
                        } else s6 = peg$FAILED;
                        if (s6 !== peg$FAILED) {
                            s7 = peg$parsespaces();
                            if ((s8 = peg$parsePrimitive()) !== peg$FAILED) s5 = s8; else {
                                peg$currPos = s5;
                                s5 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                    }
                    rule$expects(peg$e33);
                    if (41 === input.charCodeAt(peg$currPos)) {
                        s5 = peg$c33;
                        peg$currPos++;
                    } else s5 = peg$FAILED;
                    if (s5 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s0 = peg$f36(s3, s4);
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseFilterMethodCallExpression() {
            var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 27, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            rule$expects(peg$e48);
            if (input.substr(peg$currPos, 4) === peg$c48) {
                s1 = peg$c48;
                peg$currPos += 4;
            } else s1 = peg$FAILED;
            if (s1 === peg$FAILED) {
                rule$expects(peg$e49);
                if (input.substr(peg$currPos, 7) === peg$c49) {
                    s1 = peg$c49;
                    peg$currPos += 7;
                } else s1 = peg$FAILED;
                if (s1 === peg$FAILED) {
                    rule$expects(peg$e50);
                    if (input.substr(peg$currPos, 6) === peg$c50) {
                        s1 = peg$c50;
                        peg$currPos += 6;
                    } else s1 = peg$FAILED;
                    if (s1 === peg$FAILED) {
                        rule$expects(peg$e51);
                        if (input.substr(peg$currPos, 8) === peg$c51) {
                            s1 = peg$c51;
                            peg$currPos += 8;
                        } else s1 = peg$FAILED;
                        if (s1 === peg$FAILED) {
                            rule$expects(peg$e52);
                            if (input.substr(peg$currPos, 4) === peg$c52) {
                                s1 = peg$c52;
                                peg$currPos += 4;
                            } else s1 = peg$FAILED;
                            if (s1 === peg$FAILED) {
                                rule$expects(peg$e53);
                                if (input.substr(peg$currPos, 3) === peg$c53) {
                                    s1 = peg$c53;
                                    peg$currPos += 3;
                                } else s1 = peg$FAILED;
                                if (s1 === peg$FAILED) {
                                    rule$expects(peg$e54);
                                    if (input.substr(peg$currPos, 8) === peg$c54) {
                                        s1 = peg$c54;
                                        peg$currPos += 8;
                                    } else s1 = peg$FAILED;
                                    if (s1 === peg$FAILED) {
                                        rule$expects(peg$e55);
                                        if (input.substr(peg$currPos, 5) === peg$c55) {
                                            s1 = peg$c55;
                                            peg$currPos += 5;
                                        } else s1 = peg$FAILED;
                                        if (s1 === peg$FAILED) {
                                            rule$expects(peg$e56);
                                            if (input.substr(peg$currPos, 17) === peg$c56) {
                                                s1 = peg$c56;
                                                peg$currPos += 17;
                                            } else s1 = peg$FAILED;
                                            if (s1 === peg$FAILED) {
                                                rule$expects(peg$e57);
                                                if (input.substr(peg$currPos, 4) === peg$c57) {
                                                    s1 = peg$c57;
                                                    peg$currPos += 4;
                                                } else s1 = peg$FAILED;
                                                if (s1 === peg$FAILED) {
                                                    rule$expects(peg$e58);
                                                    if (input.substr(peg$currPos, 7) === peg$c58) {
                                                        s1 = peg$c58;
                                                        peg$currPos += 7;
                                                    } else s1 = peg$FAILED;
                                                    if (s1 === peg$FAILED) {
                                                        rule$expects(peg$e59);
                                                        if (input.substr(peg$currPos, 4) === peg$c59) {
                                                            s1 = peg$c59;
                                                            peg$currPos += 4;
                                                        } else s1 = peg$FAILED;
                                                        if (s1 === peg$FAILED) {
                                                            rule$expects(peg$e60);
                                                            if (input.substr(peg$currPos, 6) === peg$c60) {
                                                                s1 = peg$c60;
                                                                peg$currPos += 6;
                                                            } else s1 = peg$FAILED;
                                                            if (s1 === peg$FAILED) {
                                                                rule$expects(peg$e61);
                                                                if (input.substr(peg$currPos, 11) === peg$c61) {
                                                                    s1 = peg$c61;
                                                                    peg$currPos += 11;
                                                                } else s1 = peg$FAILED;
                                                                if (s1 === peg$FAILED) {
                                                                    rule$expects(peg$e62);
                                                                    if (input.substr(peg$currPos, 11) === peg$c62) {
                                                                        s1 = peg$c62;
                                                                        peg$currPos += 11;
                                                                    } else s1 = peg$FAILED;
                                                                    if (s1 === peg$FAILED) {
                                                                        rule$expects(peg$e63);
                                                                        if (input.substr(peg$currPos, 6) === peg$c63) {
                                                                            s1 = peg$c63;
                                                                            peg$currPos += 6;
                                                                        } else s1 = peg$FAILED;
                                                                        if (s1 === peg$FAILED) {
                                                                            rule$expects(peg$e64);
                                                                            if (input.substr(peg$currPos, 5) === peg$c64) {
                                                                                s1 = peg$c64;
                                                                                peg$currPos += 5;
                                                                            } else s1 = peg$FAILED;
                                                                            if (s1 === peg$FAILED) {
                                                                                rule$expects(peg$e65);
                                                                                if (input.substr(peg$currPos, 3) === peg$c65) {
                                                                                    s1 = peg$c65;
                                                                                    peg$currPos += 3;
                                                                                } else s1 = peg$FAILED;
                                                                                if (s1 === peg$FAILED) {
                                                                                    rule$expects(peg$e66);
                                                                                    if (input.substr(peg$currPos, 7) === peg$c66) {
                                                                                        s1 = peg$c66;
                                                                                        peg$currPos += 7;
                                                                                    } else s1 = peg$FAILED;
                                                                                    if (s1 === peg$FAILED) {
                                                                                        rule$expects(peg$e67);
                                                                                        if (input.substr(peg$currPos, 5) === peg$c67) {
                                                                                            s1 = peg$c67;
                                                                                            peg$currPos += 5;
                                                                                        } else s1 = peg$FAILED;
                                                                                        if (s1 === peg$FAILED) {
                                                                                            rule$expects(peg$e68);
                                                                                            if (input.substr(peg$currPos, 6) === peg$c68) {
                                                                                                s1 = peg$c68;
                                                                                                peg$currPos += 6;
                                                                                            } else s1 = peg$FAILED;
                                                                                            if (s1 === peg$FAILED) {
                                                                                                rule$expects(peg$e69);
                                                                                                if (input.substr(peg$currPos, 10) === peg$c69) {
                                                                                                    s1 = peg$c69;
                                                                                                    peg$currPos += 10;
                                                                                                } else s1 = peg$FAILED;
                                                                                                if (s1 === peg$FAILED) {
                                                                                                    rule$expects(peg$e70);
                                                                                                    if (input.substr(peg$currPos, 11) === peg$c70) {
                                                                                                        s1 = peg$c70;
                                                                                                        peg$currPos += 11;
                                                                                                    } else s1 = peg$FAILED;
                                                                                                    if (s1 === peg$FAILED) {
                                                                                                        rule$expects(peg$e71);
                                                                                                        if (input.substr(peg$currPos, 9) === peg$c71) {
                                                                                                            s1 = peg$c71;
                                                                                                            peg$currPos += 9;
                                                                                                        } else s1 = peg$FAILED;
                                                                                                        if (s1 === peg$FAILED) {
                                                                                                            rule$expects(peg$e72);
                                                                                                            if (input.substr(peg$currPos, 4) === peg$c72) {
                                                                                                                s1 = peg$c72;
                                                                                                                peg$currPos += 4;
                                                                                                            } else s1 = peg$FAILED;
                                                                                                            if (s1 === peg$FAILED) {
                                                                                                                rule$expects(peg$e73);
                                                                                                                if (input.substr(peg$currPos, 7) === peg$c73) {
                                                                                                                    s1 = peg$c73;
                                                                                                                    peg$currPos += 7;
                                                                                                                } else s1 = peg$FAILED;
                                                                                                                if (s1 === peg$FAILED) {
                                                                                                                    rule$expects(peg$e74);
                                                                                                                    if (input.substr(peg$currPos, 18) === peg$c74) {
                                                                                                                        s1 = peg$c74;
                                                                                                                        peg$currPos += 18;
                                                                                                                    } else s1 = peg$FAILED;
                                                                                                                    if (s1 === peg$FAILED) {
                                                                                                                        rule$expects(peg$e75);
                                                                                                                        if (input.substr(peg$currPos, 12) === peg$c75) {
                                                                                                                            s1 = peg$c75;
                                                                                                                            peg$currPos += 12;
                                                                                                                        } else s1 = peg$FAILED;
                                                                                                                        if (s1 === peg$FAILED) {
                                                                                                                            rule$expects(peg$e76);
                                                                                                                            if (input.substr(peg$currPos, 7) === peg$c76) {
                                                                                                                                s1 = peg$c76;
                                                                                                                                peg$currPos += 7;
                                                                                                                            } else s1 = peg$FAILED;
                                                                                                                            if (s1 === peg$FAILED) {
                                                                                                                                rule$expects(peg$e77);
                                                                                                                                if (input.substr(peg$currPos, 4) === peg$c77) {
                                                                                                                                    s1 = peg$c77;
                                                                                                                                    peg$currPos += 4;
                                                                                                                                } else s1 = peg$FAILED;
                                                                                                                                if (s1 === peg$FAILED) {
                                                                                                                                    rule$expects(peg$e78);
                                                                                                                                    if (input.substr(peg$currPos, 4) === peg$c78) {
                                                                                                                                        s1 = peg$c78;
                                                                                                                                        peg$currPos += 4;
                                                                                                                                    } else s1 = peg$FAILED;
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (s1 !== peg$FAILED) {
                rule$expects(peg$e32);
                if (40 === input.charCodeAt(peg$currPos)) {
                    s2 = peg$c32;
                    peg$currPos++;
                } else s2 = peg$FAILED;
                if (s2 !== peg$FAILED) {
                    s3 = peg$parsespaces();
                    s4 = peg$currPos;
                    if ((s5 = peg$parseFilterByExpression()) !== peg$FAILED) {
                        s6 = [];
                        s7 = peg$currPos;
                        s8 = peg$parsespaces();
                        rule$expects(peg$e7);
                        if (44 === input.charCodeAt(peg$currPos)) {
                            s9 = peg$c8;
                            peg$currPos++;
                        } else s9 = peg$FAILED;
                        if (s9 !== peg$FAILED) {
                            s10 = peg$parsespaces();
                            if ((s11 = peg$parseFilterByExpression()) !== peg$FAILED) s7 = s11; else {
                                peg$currPos = s7;
                                s7 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s7;
                            s7 = peg$FAILED;
                        }
                        for (;s7 !== peg$FAILED; ) {
                            s6.push(s7);
                            s7 = peg$currPos;
                            s8 = peg$parsespaces();
                            rule$expects(peg$e7);
                            if (44 === input.charCodeAt(peg$currPos)) {
                                s9 = peg$c8;
                                peg$currPos++;
                            } else s9 = peg$FAILED;
                            if (s9 !== peg$FAILED) {
                                s10 = peg$parsespaces();
                                if ((s11 = peg$parseFilterByExpression()) !== peg$FAILED) s7 = s11; else {
                                    peg$currPos = s7;
                                    s7 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s7;
                                s7 = peg$FAILED;
                            }
                        }
                        s7 = peg$parsespaces();
                        peg$savedPos = s4;
                        s4 = peg$f37(s1, s5, s6);
                    } else {
                        peg$currPos = s4;
                        s4 = peg$FAILED;
                    }
                    if (s4 === peg$FAILED) {
                        s5 = "";
                        peg$savedPos = s4 = peg$currPos;
                        s4 = s5 = peg$f38(s1);
                    }
                    if (s4 !== peg$FAILED) {
                        peg$savedPos = peg$currPos;
                        if ((s5 = (s5 = peg$f39(s1, s4)) ? void 0 : peg$FAILED) !== peg$FAILED) {
                            rule$expects(peg$e33);
                            if (41 === input.charCodeAt(peg$currPos)) {
                                s6 = peg$c33;
                                peg$currPos++;
                            } else s6 = peg$FAILED;
                            if (s6 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s0 = peg$f40(s1, s4);
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseLambdaMethodCall() {
            var s0, s1, s2, s3, s4, s5, s6, s7, s8, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 28, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            rule$expects(peg$e79);
            if (input.substr(peg$currPos, 3) === peg$c79) {
                s1 = peg$c79;
                peg$currPos += 3;
            } else s1 = peg$FAILED;
            if (s1 === peg$FAILED) {
                rule$expects(peg$e80);
                if (input.substr(peg$currPos, 3) === peg$c80) {
                    s1 = peg$c80;
                    peg$currPos += 3;
                } else s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                rule$expects(peg$e32);
                if (40 === input.charCodeAt(peg$currPos)) {
                    s2 = peg$c32;
                    peg$currPos++;
                } else s2 = peg$FAILED;
                if (s2 !== peg$FAILED) {
                    s3 = peg$parsespaces();
                    if ((s4 = peg$parseResourceName()) !== peg$FAILED) {
                        rule$expects(peg$e81);
                        if (58 === input.charCodeAt(peg$currPos)) {
                            s5 = peg$c81;
                            peg$currPos++;
                        } else s5 = peg$FAILED;
                        if (s5 !== peg$FAILED) if ((s6 = peg$parseFilterByExpression()) !== peg$FAILED) {
                            s7 = peg$parsespaces();
                            rule$expects(peg$e33);
                            if (41 === input.charCodeAt(peg$currPos)) {
                                s8 = peg$c33;
                                peg$currPos++;
                            } else s8 = peg$FAILED;
                            if (s8 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s0 = peg$f41(s1, s4, s6);
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseResourceMethodCall() {
            var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 29, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            if ((s1 = peg$parseResourceName()) !== peg$FAILED) {
                rule$expects(peg$e32);
                if (40 === input.charCodeAt(peg$currPos)) {
                    s2 = peg$c32;
                    peg$currPos++;
                } else s2 = peg$FAILED;
                if (s2 !== peg$FAILED) {
                    s3 = peg$parsespaces();
                    s4 = peg$currPos;
                    if ((s5 = peg$parseFilterByExpression()) !== peg$FAILED) {
                        s6 = [];
                        s7 = peg$currPos;
                        s8 = peg$parsespaces();
                        rule$expects(peg$e7);
                        if (44 === input.charCodeAt(peg$currPos)) {
                            s9 = peg$c8;
                            peg$currPos++;
                        } else s9 = peg$FAILED;
                        if (s9 !== peg$FAILED) {
                            s10 = peg$parsespaces();
                            if ((s11 = peg$parseFilterByExpression()) !== peg$FAILED) s7 = s11; else {
                                peg$currPos = s7;
                                s7 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s7;
                            s7 = peg$FAILED;
                        }
                        for (;s7 !== peg$FAILED; ) {
                            s6.push(s7);
                            s7 = peg$currPos;
                            s8 = peg$parsespaces();
                            rule$expects(peg$e7);
                            if (44 === input.charCodeAt(peg$currPos)) {
                                s9 = peg$c8;
                                peg$currPos++;
                            } else s9 = peg$FAILED;
                            if (s9 !== peg$FAILED) {
                                s10 = peg$parsespaces();
                                if ((s11 = peg$parseFilterByExpression()) !== peg$FAILED) s7 = s11; else {
                                    peg$currPos = s7;
                                    s7 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s7;
                                s7 = peg$FAILED;
                            }
                        }
                        s7 = peg$parsespaces();
                        peg$savedPos = s4;
                        s4 = peg$f37(s1, s5, s6);
                    } else {
                        peg$currPos = s4;
                        s4 = peg$FAILED;
                    }
                    if (s4 === peg$FAILED) {
                        s5 = "";
                        peg$savedPos = s4 = peg$currPos;
                        s4 = s5 = peg$f38(s1);
                    }
                    if (s4 !== peg$FAILED) {
                        rule$expects(peg$e33);
                        if (41 === input.charCodeAt(peg$currPos)) {
                            s5 = peg$c33;
                            peg$currPos++;
                        } else s5 = peg$FAILED;
                        if (s5 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s0 = peg$f40(s1, s4);
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parsePropertyPathList() {
            var s0, s1, s2, s3, s4, s5, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 30, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            if ((s1 = peg$parsePropertyPath()) !== peg$FAILED) {
                s2 = [];
                s3 = peg$currPos;
                rule$expects(peg$e7);
                if (44 === input.charCodeAt(peg$currPos)) {
                    s4 = peg$c8;
                    peg$currPos++;
                } else s4 = peg$FAILED;
                if (s4 !== peg$FAILED) if ((s5 = peg$parsePropertyPath()) !== peg$FAILED) s3 = s5; else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                for (;s3 !== peg$FAILED; ) {
                    s2.push(s3);
                    s3 = peg$currPos;
                    rule$expects(peg$e7);
                    if (44 === input.charCodeAt(peg$currPos)) {
                        s4 = peg$c8;
                        peg$currPos++;
                    } else s4 = peg$FAILED;
                    if (s4 !== peg$FAILED) if ((s5 = peg$parsePropertyPath()) !== peg$FAILED) s3 = s5; else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                peg$savedPos = s0;
                s0 = peg$f42(s1, s2);
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parsePropertyPath() {
            var s0, s1, s2, s3, s4, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 31, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            if ((s1 = peg$parseResourceName()) !== peg$FAILED) {
                s2 = peg$currPos;
                rule$expects(peg$e1);
                if (47 === input.charCodeAt(peg$currPos)) {
                    s3 = peg$c1;
                    peg$currPos++;
                } else s3 = peg$FAILED;
                if (s3 !== peg$FAILED) if ((s4 = peg$parsePropertyPath()) !== peg$FAILED) s2 = s4; else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                } else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
                s2 === peg$FAILED && (s2 = null);
                s3 = peg$currPos;
                rule$expects(peg$e82);
                if (input.substr(peg$currPos, 7) === peg$c82) {
                    s4 = peg$c82;
                    peg$currPos += 7;
                } else s4 = peg$FAILED;
                if (s4 !== peg$FAILED) {
                    peg$savedPos = s3;
                    s4 = peg$f43(s1, s2);
                }
                (s3 = s4) === peg$FAILED && (s3 = null);
                peg$savedPos = s0;
                s0 = peg$f44(s1, s2, s3);
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseExpandPropertyPathList() {
            var s0, s1, s2, s3, s4, s5, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 32, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            if ((s1 = peg$parseExpandPropertyPath()) !== peg$FAILED) {
                s2 = [];
                s3 = peg$currPos;
                rule$expects(peg$e7);
                if (44 === input.charCodeAt(peg$currPos)) {
                    s4 = peg$c8;
                    peg$currPos++;
                } else s4 = peg$FAILED;
                if (s4 !== peg$FAILED) if ((s5 = peg$parseExpandPropertyPath()) !== peg$FAILED) s3 = s5; else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                for (;s3 !== peg$FAILED; ) {
                    s2.push(s3);
                    s3 = peg$currPos;
                    rule$expects(peg$e7);
                    if (44 === input.charCodeAt(peg$currPos)) {
                        s4 = peg$c8;
                        peg$currPos++;
                    } else s4 = peg$FAILED;
                    if (s4 !== peg$FAILED) if ((s5 = peg$parseExpandPropertyPath()) !== peg$FAILED) s3 = s5; else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                peg$savedPos = s0;
                s0 = peg$f42(s1, s2);
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseExpandPropertyPath() {
            var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 33, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            if ((s1 = peg$parseResourceName()) !== peg$FAILED) {
                s2 = peg$currPos;
                rule$expects(peg$e82);
                if (input.substr(peg$currPos, 7) === peg$c82) {
                    s3 = peg$c82;
                    peg$currPos += 7;
                } else s3 = peg$FAILED;
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s2;
                    s3 = peg$f45(s1);
                }
                (s2 = s3) === peg$FAILED && (s2 = null);
                s3 = peg$currPos;
                rule$expects(peg$e32);
                if (40 === input.charCodeAt(peg$currPos)) {
                    s4 = peg$c32;
                    peg$currPos++;
                } else s4 = peg$FAILED;
                if (s4 !== peg$FAILED) {
                    s5 = peg$currPos;
                    if ((s6 = peg$parseQueryOption()) !== peg$FAILED) {
                        s7 = [];
                        s8 = peg$currPos;
                        rule$expects(peg$e83);
                        if (peg$r1.test(input.charAt(peg$currPos))) {
                            s9 = input.charAt(peg$currPos);
                            peg$currPos++;
                        } else s9 = peg$FAILED;
                        if (s9 !== peg$FAILED) if ((s10 = peg$parseQueryOption()) !== peg$FAILED) s8 = s10; else {
                            peg$currPos = s8;
                            s8 = peg$FAILED;
                        } else {
                            peg$currPos = s8;
                            s8 = peg$FAILED;
                        }
                        for (;s8 !== peg$FAILED; ) {
                            s7.push(s8);
                            s8 = peg$currPos;
                            rule$expects(peg$e83);
                            if (peg$r1.test(input.charAt(peg$currPos))) {
                                s9 = input.charAt(peg$currPos);
                                peg$currPos++;
                            } else s9 = peg$FAILED;
                            if (s9 !== peg$FAILED) if ((s10 = peg$parseQueryOption()) !== peg$FAILED) s8 = s10; else {
                                peg$currPos = s8;
                                s8 = peg$FAILED;
                            } else {
                                peg$currPos = s8;
                                s8 = peg$FAILED;
                            }
                        }
                        peg$savedPos = s5;
                        s5 = peg$f46(s1, s2, s6, s7);
                    } else {
                        peg$currPos = s5;
                        s5 = peg$FAILED;
                    }
                    if (s5 === peg$FAILED) {
                        s6 = "";
                        peg$savedPos = s5 = peg$currPos;
                        s5 = s6 = peg$f47(s1, s2);
                    }
                    if (s5 !== peg$FAILED) {
                        rule$expects(peg$e33);
                        if (41 === input.charCodeAt(peg$currPos)) {
                            s6 = peg$c33;
                            peg$currPos++;
                        } else s6 = peg$FAILED;
                        if (s6 !== peg$FAILED) s3 = s5; else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                s3 === peg$FAILED && (s3 = null);
                s4 = peg$currPos;
                rule$expects(peg$e1);
                if (47 === input.charCodeAt(peg$currPos)) {
                    s5 = peg$c1;
                    peg$currPos++;
                } else s5 = peg$FAILED;
                if (s5 !== peg$FAILED) if ((s6 = peg$parsePropertyPath()) !== peg$FAILED) s4 = s6; else {
                    peg$currPos = s4;
                    s4 = peg$FAILED;
                } else {
                    peg$currPos = s4;
                    s4 = peg$FAILED;
                }
                s4 === peg$FAILED && (s4 = null);
                peg$savedPos = s0;
                s0 = peg$f48(s1, s2, s3, s4);
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseLambdaPropertyPath() {
            var s0, s1, s2, s3, s4, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 34, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            if ((s1 = peg$parseResourceName()) !== peg$FAILED) {
                rule$expects(peg$e1);
                if (47 === input.charCodeAt(peg$currPos)) {
                    s2 = peg$c1;
                    peg$currPos++;
                } else s2 = peg$FAILED;
                if (s2 !== peg$FAILED) {
                    s3 = peg$currPos;
                    if ((s4 = peg$parseLambdaPropertyPath()) !== peg$FAILED) {
                        peg$savedPos = s3;
                        s4 = peg$f49(s1, s4);
                    }
                    if ((s3 = s4) === peg$FAILED) {
                        s3 = peg$currPos;
                        if ((s4 = peg$parseLambdaMethodCall()) !== peg$FAILED) {
                            peg$savedPos = s3;
                            s4 = peg$f50(s1, s4);
                        }
                        if ((s3 = s4) === peg$FAILED) {
                            s3 = peg$currPos;
                            if ((s4 = peg$parseResourceMethodCall()) !== peg$FAILED) {
                                peg$savedPos = s3;
                                s4 = peg$f51(s1, s4);
                            }
                            s3 = s4;
                        }
                    }
                    if (s3 !== peg$FAILED) s0 = s3; else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseKey() {
            var s0, s1, s2, s3, s4, s5, s6, s7, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 35, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            rule$expects(peg$e32);
            if (40 === input.charCodeAt(peg$currPos)) {
                s1 = peg$c32;
                peg$currPos++;
            } else s1 = peg$FAILED;
            if (s1 !== peg$FAILED) {
                if ((s2 = peg$parseKeyBind()) === peg$FAILED) {
                    s2 = peg$currPos;
                    if ((s3 = peg$parseNamedKeyBind()) !== peg$FAILED) {
                        s4 = [];
                        s5 = peg$currPos;
                        rule$expects(peg$e7);
                        if (44 === input.charCodeAt(peg$currPos)) {
                            s6 = peg$c8;
                            peg$currPos++;
                        } else s6 = peg$FAILED;
                        if (s6 !== peg$FAILED) if ((s7 = peg$parseNamedKeyBind()) !== peg$FAILED) s5 = s7; else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        } else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                        for (;s5 !== peg$FAILED; ) {
                            s4.push(s5);
                            s5 = peg$currPos;
                            rule$expects(peg$e7);
                            if (44 === input.charCodeAt(peg$currPos)) {
                                s6 = peg$c8;
                                peg$currPos++;
                            } else s6 = peg$FAILED;
                            if (s6 !== peg$FAILED) if ((s7 = peg$parseNamedKeyBind()) !== peg$FAILED) s5 = s7; else {
                                peg$currPos = s5;
                                s5 = peg$FAILED;
                            } else {
                                peg$currPos = s5;
                                s5 = peg$FAILED;
                            }
                        }
                        peg$savedPos = s2;
                        s2 = peg$f52(s3, s4);
                    } else {
                        peg$currPos = s2;
                        s2 = peg$FAILED;
                    }
                }
                if (s2 !== peg$FAILED) {
                    rule$expects(peg$e33);
                    if (41 === input.charCodeAt(peg$currPos)) {
                        s3 = peg$c33;
                        peg$currPos++;
                    } else s3 = peg$FAILED;
                    if (s3 !== peg$FAILED) s0 = s2; else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseNamedKeyBind() {
            var s0, s1, s2, s3, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 36, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            if ((s1 = peg$parseResourceName()) !== peg$FAILED) {
                rule$expects(peg$e5);
                if (61 === input.charCodeAt(peg$currPos)) {
                    s2 = peg$c6;
                    peg$currPos++;
                } else s2 = peg$FAILED;
                if (s2 !== peg$FAILED) if ((s3 = peg$parseKeyBind()) !== peg$FAILED) {
                    peg$savedPos = s0;
                    s0 = peg$f53(s1, s3);
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseKeyBind() {
            var s0, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 37, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            (s0 = peg$parseNumberBind()) === peg$FAILED && (s0 = peg$parseQuotedTextBind()) === peg$FAILED && (s0 = peg$parseParameterAlias());
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseLinks() {
            var s0, s1, s2, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 38, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            rule$expects(peg$e84);
            if (input.substr(peg$currPos, 7) === peg$c83) {
                s1 = peg$c83;
                peg$currPos += 7;
            } else s1 = peg$FAILED;
            if (s1 !== peg$FAILED) if ((s2 = peg$parseSubPathSegment()) !== peg$FAILED) s0 = s2; else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parsePathSegment() {
            var s0, s1, s2, s3, s4, s5, s6, s7, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 39, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            s1 = peg$currPos;
            rule$expects(peg$e1);
            if (47 === input.charCodeAt(peg$currPos)) {
                s2 = peg$c1;
                peg$currPos++;
            } else s2 = peg$FAILED;
            if (s2 !== peg$FAILED) {
                s3 = peg$currPos;
                if ((s4 = peg$parseResourceName()) !== peg$FAILED) {
                    peg$savedPos = s3;
                    s4 = peg$f54(s4);
                }
                if ((s3 = s4) !== peg$FAILED) {
                    s4 = peg$currPos;
                    s5 = peg$currPos;
                    if ((s6 = peg$parseKey()) !== peg$FAILED) {
                        peg$savedPos = s5;
                        s6 = peg$f55(s3, s6);
                    }
                    if ((s5 = s6) !== peg$FAILED) {
                        s6 = peg$currPos;
                        if ((s7 = peg$parseLinks()) !== peg$FAILED) {
                            peg$savedPos = s6;
                            s7 = peg$f56(s3, s7);
                        }
                        if ((s6 = s7) === peg$FAILED) {
                            s6 = peg$currPos;
                            if ((s7 = peg$parseSubPathSegment()) !== peg$FAILED) {
                                peg$savedPos = s6;
                                s7 = peg$f57(s3, s7);
                            }
                            s6 = s7;
                        }
                        s6 === peg$FAILED && (s6 = null);
                        s4 = s5 = [ s5, s6 ];
                    } else {
                        peg$currPos = s4;
                        s4 = peg$FAILED;
                    }
                    if (s4 === peg$FAILED) {
                        s4 = peg$currPos;
                        rule$expects(peg$e82);
                        if (input.substr(peg$currPos, 7) === peg$c82) {
                            s5 = peg$c82;
                            peg$currPos += 7;
                        } else s5 = peg$FAILED;
                        if (s5 !== peg$FAILED) {
                            peg$savedPos = s4;
                            s5 = peg$f58(s3);
                        }
                        s4 = s5;
                    }
                    s4 === peg$FAILED && (s4 = null);
                    peg$savedPos = s1;
                    s1 = peg$f59(s3);
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
            if (s1 === peg$FAILED) {
                s1 = peg$currPos;
                if ((s2 = peg$parseContentReference()) !== peg$FAILED) {
                    s3 = peg$currPos;
                    if ((s4 = peg$parseLinks()) !== peg$FAILED) {
                        peg$savedPos = s3;
                        s4 = peg$f56(s2, s4);
                    }
                    if ((s3 = s4) === peg$FAILED) {
                        s3 = peg$currPos;
                        if ((s4 = peg$parseSubPathSegment()) !== peg$FAILED) {
                            peg$savedPos = s3;
                            s4 = peg$f57(s2, s4);
                        }
                        s3 = s4;
                    }
                    s3 === peg$FAILED && (s3 = null);
                    peg$savedPos = s1;
                    s1 = peg$f59(s2);
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            }
            if (s1 !== peg$FAILED) {
                s2 = peg$currPos;
                rule$expects(peg$e85);
                if (63 === input.charCodeAt(peg$currPos)) {
                    s3 = peg$c84;
                    peg$currPos++;
                } else s3 = peg$FAILED;
                if (s3 !== peg$FAILED) {
                    s4 = peg$currPos;
                    if ((s5 = peg$parseQueryOptions()) !== peg$FAILED) {
                        peg$savedPos = s4;
                        s5 = peg$f60(s1, s5);
                    }
                    (s4 = s5) === peg$FAILED && (s4 = null);
                    s2 = s3 = [ s3, s4 ];
                } else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
                s2 === peg$FAILED && (s2 = null);
                peg$savedPos = s0;
                s0 = peg$f59(s1);
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseSubPathSegment() {
            var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 40, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            rule$expects(peg$e1);
            if (47 === input.charCodeAt(peg$currPos)) {
                s1 = peg$c1;
                peg$currPos++;
            } else s1 = peg$FAILED;
            if (s1 !== peg$FAILED) {
                s2 = peg$currPos;
                if ((s3 = peg$parseResourceName()) !== peg$FAILED) {
                    peg$savedPos = s2;
                    s3 = peg$f54(s3);
                }
                if ((s2 = s3) !== peg$FAILED) {
                    s3 = peg$currPos;
                    if ((s4 = peg$parseKey()) !== peg$FAILED) {
                        peg$savedPos = s3;
                        s4 = peg$f55(s2, s4);
                    }
                    (s3 = s4) === peg$FAILED && (s3 = null);
                    s4 = peg$currPos;
                    rule$expects(peg$e84);
                    if (input.substr(peg$currPos, 7) === peg$c83) {
                        s5 = peg$c83;
                        peg$currPos += 7;
                    } else s5 = peg$FAILED;
                    if (s5 !== peg$FAILED) if ((s6 = peg$parseSubPathSegment()) !== peg$FAILED) {
                        peg$savedPos = s4;
                        s4 = peg$f56(s2, s6);
                    } else {
                        peg$currPos = s4;
                        s4 = peg$FAILED;
                    } else {
                        peg$currPos = s4;
                        s4 = peg$FAILED;
                    }
                    if (s4 === peg$FAILED) {
                        s4 = peg$currPos;
                        if ((s5 = peg$parseSubPathSegment()) !== peg$FAILED) {
                            peg$savedPos = s4;
                            s5 = peg$f57(s2, s5);
                        }
                        s4 = s5;
                    }
                    s4 === peg$FAILED && (s4 = null);
                    s5 = peg$currPos;
                    rule$expects(peg$e82);
                    if (input.substr(peg$currPos, 7) === peg$c82) {
                        s6 = peg$c82;
                        peg$currPos += 7;
                    } else s6 = peg$FAILED;
                    if (s6 !== peg$FAILED) {
                        peg$savedPos = s5;
                        s6 = peg$f58(s2);
                    }
                    (s5 = s6) === peg$FAILED && (s5 = null);
                    s6 = peg$currPos;
                    rule$expects(peg$e85);
                    if (63 === input.charCodeAt(peg$currPos)) {
                        s7 = peg$c84;
                        peg$currPos++;
                    } else s7 = peg$FAILED;
                    if (s7 !== peg$FAILED) {
                        s8 = peg$currPos;
                        if ((s9 = peg$parseQueryOptions()) !== peg$FAILED) {
                            peg$savedPos = s8;
                            s9 = peg$f60(s2, s9);
                        }
                        (s8 = s9) === peg$FAILED && (s8 = null);
                        s6 = s7 = [ s7, s8 ];
                    } else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                    }
                    s6 === peg$FAILED && (s6 = null);
                    peg$savedPos = s0;
                    s0 = peg$f59(s2);
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseResourceName() {
            var s0, s1, s2, s3, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 41, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            s1 = peg$currPos;
            s2 = [];
            rule$expects(peg$e86);
            if (peg$r2.test(input.charAt(peg$currPos))) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
            } else s3 = peg$FAILED;
            if (s3 !== peg$FAILED) for (;s3 !== peg$FAILED; ) {
                s2.push(s3);
                rule$expects(peg$e86);
                if (peg$r2.test(input.charAt(peg$currPos))) {
                    s3 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else s3 = peg$FAILED;
            } else s2 = peg$FAILED;
            if ((s1 = s2 !== peg$FAILED ? input.substring(s1, peg$currPos) : s2) !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$f61(s1);
            }
            s0 = s1;
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseNumber() {
            var s0, s1, s2, s3, s4, s5, s6, s7, s8, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 42, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            if ((s1 = peg$parseSign()) !== peg$FAILED) {
                s2 = peg$currPos;
                s3 = peg$currPos;
                s4 = [];
                rule$expects(peg$e87);
                if (peg$r3.test(input.charAt(peg$currPos))) {
                    s5 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else s5 = peg$FAILED;
                if (s5 !== peg$FAILED) for (;s5 !== peg$FAILED; ) {
                    s4.push(s5);
                    rule$expects(peg$e87);
                    if (peg$r3.test(input.charAt(peg$currPos))) {
                        s5 = input.charAt(peg$currPos);
                        peg$currPos++;
                    } else s5 = peg$FAILED;
                } else s4 = peg$FAILED;
                if (s4 !== peg$FAILED) {
                    s5 = peg$currPos;
                    rule$expects(peg$e88);
                    if (46 === input.charCodeAt(peg$currPos)) {
                        s6 = peg$c85;
                        peg$currPos++;
                    } else s6 = peg$FAILED;
                    if (s6 !== peg$FAILED) {
                        s7 = [];
                        rule$expects(peg$e87);
                        if (peg$r3.test(input.charAt(peg$currPos))) {
                            s8 = input.charAt(peg$currPos);
                            peg$currPos++;
                        } else s8 = peg$FAILED;
                        if (s8 !== peg$FAILED) for (;s8 !== peg$FAILED; ) {
                            s7.push(s8);
                            rule$expects(peg$e87);
                            if (peg$r3.test(input.charAt(peg$currPos))) {
                                s8 = input.charAt(peg$currPos);
                                peg$currPos++;
                            } else s8 = peg$FAILED;
                        } else s7 = peg$FAILED;
                        if (s7 !== peg$FAILED) s5 = s6 = [ s6, s7 ]; else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s5;
                        s5 = peg$FAILED;
                    }
                    s5 === peg$FAILED && (s5 = null);
                    s3 = s4 = [ s4, s5 ];
                } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                if ((s2 = s3 !== peg$FAILED ? input.substring(s2, peg$currPos) : s3) !== peg$FAILED) {
                    peg$savedPos = s0;
                    s0 = peg$f62(s1, s2);
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseUnsignedInteger() {
            var s0, s1, s2, s3, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 43, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            s1 = peg$currPos;
            s2 = [];
            rule$expects(peg$e87);
            if (peg$r3.test(input.charAt(peg$currPos))) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
            } else s3 = peg$FAILED;
            if (s3 !== peg$FAILED) for (;s3 !== peg$FAILED; ) {
                s2.push(s3);
                rule$expects(peg$e87);
                if (peg$r3.test(input.charAt(peg$currPos))) {
                    s3 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else s3 = peg$FAILED;
            } else s2 = peg$FAILED;
            if ((s1 = s2 !== peg$FAILED ? input.substring(s1, peg$currPos) : s2) !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$f63(s1);
            }
            s0 = s1;
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseNull() {
            var s0, s1, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 44, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            rule$expects(peg$e89);
            if (input.substr(peg$currPos, 4) === peg$c86) {
                s1 = peg$c86;
                peg$currPos += 4;
            } else s1 = peg$FAILED;
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$f64();
            }
            s0 = s1;
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseBoolean() {
            var s0, s1, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 45, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            rule$expects(peg$e90);
            if (input.substr(peg$currPos, 4) === peg$c87) {
                s1 = peg$c87;
                peg$currPos += 4;
            } else s1 = peg$FAILED;
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$f65();
            }
            if ((s0 = s1) === peg$FAILED) {
                s0 = peg$currPos;
                rule$expects(peg$e91);
                if (input.substr(peg$currPos, 5) === peg$c88) {
                    s1 = peg$c88;
                    peg$currPos += 5;
                } else s1 = peg$FAILED;
                if (s1 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$f66();
                }
                s0 = s1;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseDuration() {
            var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 46, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            rule$expects(peg$e92);
            if (input.substr(peg$currPos, 8) === peg$c89) {
                s1 = peg$c89;
                peg$currPos += 8;
            } else s1 = peg$FAILED;
            if (s1 !== peg$FAILED) if ((s2 = peg$parseApostrophe()) !== peg$FAILED) if ((s3 = peg$parseSign()) !== peg$FAILED) {
                rule$expects(peg$e93);
                if (80 === input.charCodeAt(peg$currPos)) {
                    s4 = peg$c90;
                    peg$currPos++;
                } else s4 = peg$FAILED;
                if (s4 !== peg$FAILED) {
                    s5 = peg$currPos;
                    if ((s6 = peg$parseUnsignedInteger()) !== peg$FAILED) {
                        rule$expects(peg$e94);
                        if (68 === input.charCodeAt(peg$currPos)) {
                            s7 = peg$c91;
                            peg$currPos++;
                        } else s7 = peg$FAILED;
                        if (s7 !== peg$FAILED) s5 = s6; else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s5;
                        s5 = peg$FAILED;
                    }
                    s5 === peg$FAILED && (s5 = null);
                    s6 = peg$currPos;
                    rule$expects(peg$e95);
                    if (84 === input.charCodeAt(peg$currPos)) {
                        s7 = peg$c92;
                        peg$currPos++;
                    } else s7 = peg$FAILED;
                    if (s7 !== peg$FAILED) {
                        s8 = peg$currPos;
                        if ((s9 = peg$parseUnsignedInteger()) !== peg$FAILED) {
                            rule$expects(peg$e96);
                            if (72 === input.charCodeAt(peg$currPos)) {
                                s10 = peg$c93;
                                peg$currPos++;
                            } else s10 = peg$FAILED;
                            if (s10 !== peg$FAILED) s8 = s9; else {
                                peg$currPos = s8;
                                s8 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s8;
                            s8 = peg$FAILED;
                        }
                        s8 === peg$FAILED && (s8 = null);
                        s9 = peg$currPos;
                        if ((s10 = peg$parseUnsignedInteger()) !== peg$FAILED) {
                            rule$expects(peg$e97);
                            if (77 === input.charCodeAt(peg$currPos)) {
                                s11 = peg$c94;
                                peg$currPos++;
                            } else s11 = peg$FAILED;
                            if (s11 !== peg$FAILED) s9 = s10; else {
                                peg$currPos = s9;
                                s9 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s9;
                            s9 = peg$FAILED;
                        }
                        s9 === peg$FAILED && (s9 = null);
                        s10 = peg$currPos;
                        if ((s11 = peg$parseDurationNumber()) !== peg$FAILED) {
                            rule$expects(peg$e98);
                            if (83 === input.charCodeAt(peg$currPos)) {
                                s12 = peg$c95;
                                peg$currPos++;
                            } else s12 = peg$FAILED;
                            if (s12 !== peg$FAILED) s10 = s11; else {
                                peg$currPos = s10;
                                s10 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s10;
                            s10 = peg$FAILED;
                        }
                        s10 === peg$FAILED && (s10 = null);
                        peg$savedPos = peg$currPos;
                        if ((s11 = (s11 = peg$f67(s3, s5, s8, s9, s10)) ? void 0 : peg$FAILED) !== peg$FAILED) {
                            peg$savedPos = s6;
                            s6 = peg$f68(s3, s5, s8, s9, s10);
                        } else {
                            peg$currPos = s6;
                            s6 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                    }
                    s6 === peg$FAILED && (s6 = null);
                    peg$savedPos = peg$currPos;
                    if ((s7 = (s7 = peg$f69(s3, s5, s6)) ? void 0 : peg$FAILED) !== peg$FAILED) if ((s8 = peg$parseApostrophe()) !== peg$FAILED) {
                        peg$savedPos = s0;
                        s0 = peg$f70(s3, s5, s6);
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseDurationNumber() {
            var s0, s1, s2, s3, s4, s5, s6, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 47, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            s1 = peg$currPos;
            s2 = peg$currPos;
            s3 = [];
            rule$expects(peg$e87);
            if (peg$r3.test(input.charAt(peg$currPos))) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
            } else s4 = peg$FAILED;
            if (s4 !== peg$FAILED) for (;s4 !== peg$FAILED; ) {
                s3.push(s4);
                rule$expects(peg$e87);
                if (peg$r3.test(input.charAt(peg$currPos))) {
                    s4 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else s4 = peg$FAILED;
            } else s3 = peg$FAILED;
            if (s3 !== peg$FAILED) {
                rule$expects(peg$e88);
                if (46 === input.charCodeAt(peg$currPos)) {
                    s4 = peg$c85;
                    peg$currPos++;
                } else s4 = peg$FAILED;
                if (s4 !== peg$FAILED) {
                    s5 = [];
                    rule$expects(peg$e87);
                    if (peg$r3.test(input.charAt(peg$currPos))) {
                        s6 = input.charAt(peg$currPos);
                        peg$currPos++;
                    } else s6 = peg$FAILED;
                    if (s6 !== peg$FAILED) for (;s6 !== peg$FAILED; ) {
                        s5.push(s6);
                        rule$expects(peg$e87);
                        if (peg$r3.test(input.charAt(peg$currPos))) {
                            s6 = input.charAt(peg$currPos);
                            peg$currPos++;
                        } else s6 = peg$FAILED;
                    } else s5 = peg$FAILED;
                    if (s5 !== peg$FAILED) s2 = s3 = [ s3, s4, s5 ]; else {
                        peg$currPos = s2;
                        s2 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
            if ((s1 = s2 !== peg$FAILED ? input.substring(s1, peg$currPos) : s2) !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$f71(s1);
            }
            (s0 = s1) === peg$FAILED && (s0 = peg$parseUnsignedInteger());
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseText() {
            var s0, s1, s2, s3, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 48, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            s1 = peg$currPos;
            s2 = [];
            rule$expects(peg$e99);
            if (peg$r4.test(input.charAt(peg$currPos))) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
            } else s3 = peg$FAILED;
            for (;s3 !== peg$FAILED; ) {
                s2.push(s3);
                rule$expects(peg$e99);
                if (peg$r4.test(input.charAt(peg$currPos))) {
                    s3 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else s3 = peg$FAILED;
            }
            s1 = input.substring(s1, peg$currPos);
            peg$savedPos = s0;
            s0 = s1 = peg$f72(s1);
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseSign() {
            var s0, s1, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 49, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            rule$expects(peg$e21);
            if (43 === input.charCodeAt(peg$currPos)) {
                s0 = peg$c21;
                peg$currPos++;
            } else s0 = peg$FAILED;
            if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                rule$expects(peg$e100);
                if (input.substr(peg$currPos, 3) === peg$c96) {
                    s1 = peg$c96;
                    peg$currPos += 3;
                } else s1 = peg$FAILED;
                if (s1 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$f73();
                }
                if ((s0 = s1) === peg$FAILED) {
                    rule$expects(peg$e101);
                    if (45 === input.charCodeAt(peg$currPos)) {
                        s0 = peg$c97;
                        peg$currPos++;
                    } else s0 = peg$FAILED;
                    s0 === peg$FAILED && (s0 = "");
                }
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseApostrophe() {
            var s0, s1, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 50, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            rule$expects(peg$e102);
            if (39 === input.charCodeAt(peg$currPos)) {
                s0 = peg$c98;
                peg$currPos++;
            } else s0 = peg$FAILED;
            if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                rule$expects(peg$e103);
                if (input.substr(peg$currPos, 3) === peg$c99) {
                    s1 = peg$c99;
                    peg$currPos += 3;
                } else s1 = peg$FAILED;
                if (s1 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$f74();
                }
                s0 = s1;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseQuotedText() {
            var s0, s1, s2, s3, s4, s5, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 51, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            if ((s1 = peg$parseApostrophe()) !== peg$FAILED) {
                s2 = [];
                s3 = peg$currPos;
                if ((s4 = peg$parseApostrophe()) !== peg$FAILED) if ((s5 = peg$parseApostrophe()) !== peg$FAILED) s3 = s5; else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                if (s3 === peg$FAILED) {
                    s3 = peg$currPos;
                    s4 = peg$currPos;
                    peg$begin();
                    s5 = peg$parseApostrophe();
                    peg$end(!0);
                    if (s5 === peg$FAILED) s4 = void 0; else {
                        peg$currPos = s4;
                        s4 = peg$FAILED;
                    }
                    if (s4 !== peg$FAILED) {
                        rule$expects(peg$e104);
                        if (input.length > peg$currPos) {
                            s5 = input.charAt(peg$currPos);
                            peg$currPos++;
                        } else s5 = peg$FAILED;
                        if (s5 !== peg$FAILED) s3 = s5; else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                for (;s3 !== peg$FAILED; ) {
                    s2.push(s3);
                    s3 = peg$currPos;
                    if ((s4 = peg$parseApostrophe()) !== peg$FAILED) if ((s5 = peg$parseApostrophe()) !== peg$FAILED) s3 = s5; else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                    if (s3 === peg$FAILED) {
                        s3 = peg$currPos;
                        s4 = peg$currPos;
                        peg$begin();
                        s5 = peg$parseApostrophe();
                        peg$end(!0);
                        if (s5 === peg$FAILED) s4 = void 0; else {
                            peg$currPos = s4;
                            s4 = peg$FAILED;
                        }
                        if (s4 !== peg$FAILED) {
                            rule$expects(peg$e104);
                            if (input.length > peg$currPos) {
                                s5 = input.charAt(peg$currPos);
                                peg$currPos++;
                            } else s5 = peg$FAILED;
                            if (s5 !== peg$FAILED) s3 = s5; else {
                                peg$currPos = s3;
                                s3 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    }
                }
                if ((s3 = peg$parseApostrophe()) !== peg$FAILED) {
                    peg$savedPos = s0;
                    s0 = peg$f75(s2);
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseParameterAlias() {
            var s0, s1, s2, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 52, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            rule$expects(peg$e4);
            if (64 === input.charCodeAt(peg$currPos)) {
                s1 = peg$c5;
                peg$currPos++;
            } else s1 = peg$FAILED;
            if (s1 !== peg$FAILED) if ((s2 = peg$parseResourceName()) !== peg$FAILED) {
                peg$savedPos = s0;
                s0 = peg$f76(s2);
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseNumberBind() {
            var s0, s1, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 53, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            if ((s1 = peg$parseNumber()) !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$f77(s1);
            }
            s0 = s1;
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseDate() {
            var s0, s1, s2, s3, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 54, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            s1 = peg$currPos;
            rule$expects(peg$e105);
            if (input.substr(peg$currPos, 8) === peg$c100) {
                s2 = peg$c100;
                peg$currPos += 8;
            } else s2 = peg$FAILED;
            if (s2 !== peg$FAILED) {
                peg$savedPos = s1;
                s2 = peg$f78();
            }
            if ((s1 = s2) === peg$FAILED) {
                s1 = peg$currPos;
                rule$expects(peg$e52);
                if (input.substr(peg$currPos, 4) === peg$c52) {
                    s2 = peg$c52;
                    peg$currPos += 4;
                } else s2 = peg$FAILED;
                if (s2 !== peg$FAILED) {
                    peg$savedPos = s1;
                    s2 = peg$f79();
                }
                s1 = s2;
            }
            if (s1 !== peg$FAILED) {
                s2 = peg$currPos;
                if ((s3 = peg$parseQuotedText()) !== peg$FAILED) {
                    peg$savedPos = s2;
                    s3 = peg$f80(s1, s3);
                }
                if ((s2 = s3) !== peg$FAILED) {
                    peg$savedPos = peg$currPos;
                    if ((s3 = (s3 = peg$f81(s1, s2)) ? peg$FAILED : void 0) !== peg$FAILED) {
                        peg$savedPos = s0;
                        s0 = peg$f82(s1, s2);
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseDateBind() {
            var s0, s1, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 55, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            if ((s1 = peg$parseDate()) !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$f83(s1);
            }
            s0 = s1;
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseBooleanBind() {
            var s0, s1, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 56, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            if ((s1 = peg$parseBoolean()) !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$f84(s1);
            }
            s0 = s1;
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseContentReference() {
            var s0, s1, s2, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 57, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            rule$expects(peg$e106);
            if (36 === input.charCodeAt(peg$currPos)) {
                s1 = peg$c3;
                peg$currPos++;
            } else s1 = peg$FAILED;
            if (s1 !== peg$FAILED) if ((s2 = peg$parseResourceName()) !== peg$FAILED) {
                peg$savedPos = s0;
                s0 = peg$f85(s2);
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parseQuotedTextBind() {
            var s0, s1, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 58, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = peg$currPos;
            if ((s1 = peg$parseQuotedText()) !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$f86(s1);
            }
            s0 = s1;
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        function peg$parsespaces() {
            var s0, s1, rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
            }, key = 60 * peg$currPos + 59, cached = peg$resultsCache[key], rule$expectations = [];
            rule$expects = function(expected) {
                0 === peg$silentFails && peg$expect(expected);
                rule$expectations.push(expected);
            };
            if (cached) {
                peg$currPos = cached.nextPos;
                rule$expectations = cached.expectations;
                0 === peg$silentFails && rule$expectations.forEach(peg$expect);
                return cached.result;
            }
            s0 = [];
            rule$expects(peg$e107);
            if (32 === input.charCodeAt(peg$currPos)) {
                s1 = peg$c101;
                peg$currPos++;
            } else s1 = peg$FAILED;
            if (s1 === peg$FAILED) {
                rule$expects(peg$e108);
                if (input.substr(peg$currPos, 3) === peg$c102) {
                    s1 = peg$c102;
                    peg$currPos += 3;
                } else s1 = peg$FAILED;
                if (s1 === peg$FAILED) {
                    rule$expects(peg$e21);
                    if (43 === input.charCodeAt(peg$currPos)) {
                        s1 = peg$c21;
                        peg$currPos++;
                    } else s1 = peg$FAILED;
                }
            }
            for (;s1 !== peg$FAILED; ) {
                s0.push(s1);
                rule$expects(peg$e107);
                if (32 === input.charCodeAt(peg$currPos)) {
                    s1 = peg$c101;
                    peg$currPos++;
                } else s1 = peg$FAILED;
                if (s1 === peg$FAILED) {
                    rule$expects(peg$e108);
                    if (input.substr(peg$currPos, 3) === peg$c102) {
                        s1 = peg$c102;
                        peg$currPos += 3;
                    } else s1 = peg$FAILED;
                    if (s1 === peg$FAILED) {
                        rule$expects(peg$e21);
                        if (43 === input.charCodeAt(peg$currPos)) {
                            s1 = peg$c21;
                            peg$currPos++;
                        } else s1 = peg$FAILED;
                    }
                }
            }
            peg$resultsCache[key] = {
                nextPos: peg$currPos,
                result: s0,
                expectations: rule$expectations
            };
            return s0;
        }
        var methods = {
            cast: [ 1, 2 ],
            ceiling: 1,
            concat: 2,
            contains: 2,
            date: 1,
            day: 1,
            endswith: 2,
            floor: 1,
            fractionalseconds: 1,
            hour: 1,
            indexof: 2,
            isof: [ 1, 2 ],
            length: 1,
            maxdatetime: 0,
            mindatetime: 0,
            minute: 1,
            month: 1,
            now: 0,
            replace: 3,
            round: 1,
            second: 1,
            startswith: 2,
            substringof: 2,
            substring: [ 2, 3 ],
            time: 1,
            tolower: 1,
            totaloffsetminutes: 1,
            totalseconds: 1,
            toupper: 1,
            trim: 1,
            year: 1
        }, operatorPrecedence = {
            or: 0,
            and: 0,
            eq: 1,
            ne: 1,
            gt: 1,
            ge: 1,
            lt: 1,
            le: 1,
            sub: 2,
            add: 3,
            mod: 4,
            div: 5,
            mul: 6
        }, binds = [], precedence = 0;
        function reset() {
            binds = [];
            precedence = 0;
        }
        function CollapseObjectArray(options) {
            var optionsObj = {};
            for (var i in options) optionsObj[options[i].name] = options[i].value;
            return optionsObj;
        }
        function Bind(type, value) {
            binds.push([ type, value ]);
            return {
                bind: binds.length - 1
            };
        }
        peg$begin();
        peg$result = peg$startRuleFunction();
        if (peg$result !== peg$FAILED && peg$currPos === input.length) return peg$result;
        peg$result !== peg$FAILED && peg$currPos < input.length && peg$expect(peg$endExpectation());
        throw peg$buildError();
    }
    module.exports = {
        SyntaxError: peg$SyntaxError,
        parse: peg$parse
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.getMappingFn = exports.settleMapSeries = void 0;
    const _ = __webpack_require__(0), settleMapSeries = async (a, fn) => {
        const results = [];
        for (const p of a) try {
            const result = await fn(p);
            results.push(result);
        } catch (err) {
            results.push(ensureError(err));
        }
        return results;
    };
    exports.settleMapSeries = settleMapSeries;
    const ensureError = err => err instanceof Error || _.isError(err) ? err : new Error(err), mapTill = async (a, fn) => {
        const results = [];
        for (const p of a) try {
            const result = await fn(p);
            results.push(result);
        } catch (err) {
            results.push(ensureError(err));
            break;
        }
        return results;
    }, getMappingFn = headers => null != headers && "odata.continue-on-error" === headers.prefer ? exports.settleMapSeries : mapTill;
    exports.getMappingFn = getMappingFn;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.translateUri = exports.parseOData = exports.metadataEndpoints = exports.memoizedGetOData2AbstractSQL = exports.memoizedParseOdata = exports.parseId = exports.TranslationError = exports.ParsingError = exports.BadRequestError = exports.SyntaxError = void 0;
    const ODataParser = __webpack_require__(65), Bluebird = __webpack_require__(21);
    exports.SyntaxError = ODataParser.SyntaxError;
    const odata_to_abstract_sql_1 = __webpack_require__(16), _ = __webpack_require__(0), memoize = __webpack_require__(17), memoizeWeak = __webpack_require__(32);
    var errors_1 = __webpack_require__(20);
    Object.defineProperty(exports, "BadRequestError", {
        enumerable: !0,
        get: function() {
            return errors_1.BadRequestError;
        }
    });
    Object.defineProperty(exports, "ParsingError", {
        enumerable: !0,
        get: function() {
            return errors_1.ParsingError;
        }
    });
    Object.defineProperty(exports, "TranslationError", {
        enumerable: !0,
        get: function() {
            return errors_1.TranslationError;
        }
    });
    const deepFreeze = __webpack_require__(44), env = __webpack_require__(12), errors_2 = __webpack_require__(20), sbvrUtils = __webpack_require__(5), parseId = b => {
        const {tree: tree, binds: binds} = ODataParser.parse(String(b), {
            startRule: "ProcessRule",
            rule: "KeyBind"
        });
        return binds[tree.bind];
    };
    exports.parseId = parseId;
    exports.memoizedParseOdata = (() => {
        const parseOdata = url => {
            const odata = ODataParser.parse(url);
            null != odata.tree.property && "canAccess" === odata.tree.property.resource && (odata.tree.resource = odata.tree.resource + "#" + odata.tree.property.resource);
            return odata;
        }, _memoizedParseOdata = memoize(parseOdata, {
            primitive: !0,
            max: env.cache.parseOData.max
        });
        return url => {
            var _a, _b;
            const queryParamsIndex = url.indexOf("?");
            if (-1 !== queryParamsIndex) {
                if (/[?&(]@/.test(url)) {
                    const parameterAliases = new URLSearchParams, queryParams = new URLSearchParams(url.slice(queryParamsIndex));
                    Array.from(queryParams.entries()).forEach((([key, value]) => {
                        if (key.startsWith("@")) {
                            parameterAliases.append(key, value);
                            queryParams.delete(key);
                        }
                    }));
                    const parameterAliasesString = parameterAliases.toString();
                    if ("" !== parameterAliasesString) {
                        const parsed = _.cloneDeep(_memoizedParseOdata(url.slice(0, queryParamsIndex) + "?" + decodeURIComponent(queryParams.toString()))), parsedParams = ODataParser.parse(decodeURIComponent(parameterAliasesString), {
                            startRule: "ProcessRule",
                            rule: "QueryOptions"
                        });
                        null !== (_a = (_b = parsed.tree).options) && void 0 !== _a || (_b.options = {});
                        for (const key of Object.keys(parsedParams.tree)) {
                            parsed.tree.options[key] = parsedParams.tree[key];
                            parsed.binds[key] = parsedParams.binds[key];
                        }
                        return parsed;
                    }
                }
                return parseOdata(url);
            }
            return url.includes("(") ? parseOdata(url) : _.cloneDeep(_memoizedParseOdata(url));
        };
    })();
    exports.memoizedGetOData2AbstractSQL = memoizeWeak((abstractSqlModel => new odata_to_abstract_sql_1.OData2AbstractSQL(abstractSqlModel)));
    const memoizedOdata2AbstractSQL = (() => {
        const $memoizedOdata2AbstractSQL = memoizeWeak(((abstractSqlModel, odataQuery, method, bodyKeys, existingBindVarsLength) => {
            try {
                const odata2AbstractSQL = undefined, abstractSql = exports.memoizedGetOData2AbstractSQL(abstractSqlModel).match(odataQuery, method, bodyKeys, existingBindVarsLength);
                deepFreeze(abstractSql);
                return abstractSql;
            } catch (e) {
                if (e instanceof errors_2.PermissionError) throw e;
                console.error("Failed to translate url: ", JSON.stringify(odataQuery, null, "\t"), method, e);
                throw new errors_2.TranslationError("Failed to translate url");
            }
        }), {
            normalizer: (_abstractSqlModel, [odataQuery, method, bodyKeys, existingBindVarsLength]) => JSON.stringify(odataQuery) + method + bodyKeys + existingBindVarsLength,
            max: env.cache.odataToAbstractSql.max
        });
        return request => {
            const {method: method, odataBinds: odataBinds, values: values} = request;
            let {odataQuery: odataQuery} = request;
            const abstractSqlModel = sbvrUtils.getAbstractSqlModel(request), sortedBody = Object.keys(values).sort();
            odataQuery.options && (odataQuery = {
                ...odataQuery,
                options: _.pick(odataQuery.options, "$select", "$filter", "$expand", "$orderby", "$top", "$skip", "$count", "$inlinecount", "$format")
            });
            const {tree: tree, extraBodyVars: extraBodyVars, extraBindVars: extraBindVars} = $memoizedOdata2AbstractSQL(abstractSqlModel, odataQuery, method, sortedBody, odataBinds.length);
            Object.assign(values, extraBodyVars);
            odataBinds.push(...extraBindVars);
            return tree;
        };
    })();
    exports.metadataEndpoints = [ "$metadata", "$serviceroot" ];
    async function parseOData(b) {
        var _a;
        try {
            if (b._isChangeSet && null != b.changeSet) {
                const sortedCS = _.sortBy(b.changeSet, (el => "/" !== el.url[0])), csReferences = await Bluebird.reduce(sortedCS, parseODataChangeset, new Map);
                return Array.from(csReferences.values());
            }
            {
                const {url: url, apiRoot: apiRoot} = splitApiRoot(b.url), odata = exports.memoizedParseOdata(url);
                return {
                    method: b.method,
                    url: url,
                    vocabulary: apiRoot,
                    resourceName: odata.tree.resource,
                    odataBinds: odata.binds,
                    odataQuery: odata.tree,
                    values: null !== (_a = b.data) && void 0 !== _a ? _a : {},
                    custom: {},
                    _defer: !1
                };
            }
        } catch (err) {
            if (err instanceof ODataParser.SyntaxError) throw new errors_2.BadRequestError(`Malformed url: '${b.url}'`);
            if (!(err instanceof errors_2.BadRequestError || err instanceof errors_2.ParsingError)) {
                console.error("Failed to parse url: ", b.method, b.url, err);
                throw new errors_2.ParsingError(`Failed to parse url: '${b.url}'`);
            }
            throw err;
        }
    }
    exports.parseOData = parseOData;
    const parseODataChangeset = (csReferences, b) => {
        var _a;
        const contentId = mustExtractHeader(b, "content-id");
        if (csReferences.has(contentId)) throw new errors_2.BadRequestError("Content-Id must be unique inside a changeset");
        let defer, odata, apiRoot, url;
        if ("/" === b.url[0]) {
            ({url: url, apiRoot: apiRoot} = splitApiRoot(b.url));
            odata = exports.memoizedParseOdata(url);
            defer = !1;
        } else {
            url = b.url;
            odata = exports.memoizedParseOdata(url);
            const {bind: bind} = odata.tree.resource, [, id] = odata.binds[bind], ref = csReferences.get(id);
            if (void 0 === ref) throw new errors_2.BadRequestError("Content-Id refers to a non existent resource");
            apiRoot = ref.vocabulary;
            odata.tree.resource = ref.resourceName;
            defer = !0;
        }
        const parseResult = {
            method: b.method,
            url: url,
            vocabulary: apiRoot,
            resourceName: odata.tree.resource,
            odataBinds: odata.binds,
            odataQuery: odata.tree,
            values: null !== (_a = b.data) && void 0 !== _a ? _a : {},
            custom: {},
            id: contentId,
            _defer: defer
        };
        csReferences.set(contentId, parseResult);
        return csReferences;
    }, splitApiRoot = url => {
        const urlParts = url.split("/"), apiRoot = urlParts[1];
        if (null == apiRoot) throw new errors_2.ParsingError(`No such api root: ${apiRoot}`);
        return {
            url: url = "/" + urlParts.slice(2).join("/"),
            apiRoot: apiRoot
        };
    }, mustExtractHeader = (body, header) => {
        var _a, _b;
        const h = null === (_b = null === (_a = body.headers) || void 0 === _a ? void 0 : _a[header]) || void 0 === _b ? void 0 : _b[0];
        if (_.isEmpty(h)) throw new errors_2.BadRequestError(`${header} must be specified`);
        return h;
    }, translateUri = request => {
        if (null != request.abstractSqlQuery) return request;
        const isMetadataEndpoint = undefined;
        if (!(exports.metadataEndpoints.includes(request.resourceName) || "OPTIONS" === request.method)) {
            const abstractSqlQuery = memoizedOdata2AbstractSQL(request);
            (request = {
                ...request
            }).abstractSqlQuery = abstractSqlQuery;
            return request;
        }
        return request;
    };
    exports.translateUri = translateUri;
}, function(module, exports, __webpack_require__) {
    "use strict";
    var aFrom = __webpack_require__(22), assign = __webpack_require__(26), value = __webpack_require__(4);
    module.exports = function(obj) {
        var copy = Object(value(obj)), propertyNames = arguments[1], options = Object(arguments[2]);
        if (copy !== obj && !propertyNames) return copy;
        var result = {};
        propertyNames ? aFrom(propertyNames, (function(propertyName) {
            (options.ensure || propertyName in obj) && (result[propertyName] = obj[propertyName]);
        })) : assign(result, obj);
        return result;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var create = Object.create, getPrototypeOf = Object.getPrototypeOf, plainObject = {};
    module.exports = function() {
        var setPrototypeOf = Object.setPrototypeOf, customCreate = arguments[0] || create;
        return "function" == typeof setPrototypeOf && getPrototypeOf(setPrototypeOf(customCreate(null), plainObject)) === plainObject;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var isObject = __webpack_require__(39), value = __webpack_require__(4), objIsPrototypeOf = Object.prototype.isPrototypeOf, defineProperty = Object.defineProperty, nullDesc = {
        configurable: !0,
        enumerable: !1,
        writable: !0,
        value: void 0
    }, validate;
    validate = function(obj, prototype) {
        value(obj);
        if (null === prototype || isObject(prototype)) return obj;
        throw new TypeError("Prototype must be null or an object");
    };
    module.exports = function(status) {
        var fn, set;
        if (!status) return null;
        if (2 === status.level) if (status.set) {
            set = status.set;
            fn = function(obj, prototype) {
                set.call(validate(obj, prototype), prototype);
                return obj;
            };
        } else fn = function(obj, prototype) {
            validate(obj, prototype).__proto__ = prototype;
            return obj;
        }; else fn = function self(obj, prototype) {
            var isNullBase;
            validate(obj, prototype);
            (isNullBase = objIsPrototypeOf.call(self.nullPolyfill, obj)) && delete self.nullPolyfill.__proto__;
            null === prototype && (prototype = self.nullPolyfill);
            obj.__proto__ = prototype;
            isNullBase && defineProperty(self.nullPolyfill, "__proto__", nullDesc);
            return obj;
        };
        return Object.defineProperty(fn, "level", {
            configurable: !1,
            enumerable: !1,
            writable: !1,
            value: status.level
        });
    }(function() {
        var tmpObj1 = Object.create(null), tmpObj2 = {}, set, desc = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__");
        if (desc) {
            try {
                (set = desc.set).call(tmpObj1, tmpObj2);
            } catch (ignore) {}
            if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return {
                set: set,
                level: 2
            };
        }
        tmpObj1.__proto__ = tmpObj2;
        if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return {
            level: 2
        };
        (tmpObj1 = {}).__proto__ = tmpObj2;
        return Object.getPrototypeOf(tmpObj1) === tmpObj2 && {
            level: 1
        };
    }());
    __webpack_require__(190);
}, function(module, exports, __webpack_require__) {
    "use strict";
    var isArguments = __webpack_require__(29), isString = __webpack_require__(30), ArrayIterator = __webpack_require__(193), StringIterator = __webpack_require__(201), iterable = __webpack_require__(202), iteratorSymbol = __webpack_require__(11).iterator;
    module.exports = function(obj) {
        return "function" == typeof iterable(obj)[iteratorSymbol] ? obj[iteratorSymbol]() : isArguments(obj) ? new ArrayIterator(obj) : isString(obj) ? new StringIterator(obj) : new ArrayIterator(obj);
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var clear = __webpack_require__(194), assign = __webpack_require__(26), callable = __webpack_require__(2), value = __webpack_require__(4), d = __webpack_require__(3), autoBind = __webpack_require__(195), Symbol = __webpack_require__(11), defineProperty = Object.defineProperty, defineProperties = Object.defineProperties, Iterator;
    module.exports = Iterator = function(list, context) {
        if (!(this instanceof Iterator)) throw new TypeError("Constructor requires 'new'");
        defineProperties(this, {
            __list__: d("w", value(list)),
            __context__: d("w", context),
            __nextIndex__: d("w", 0)
        });
        if (context) {
            callable(context.on);
            context.on("_add", this._onAdd);
            context.on("_delete", this._onDelete);
            context.on("_clear", this._onClear);
        }
    };
    delete Iterator.prototype.constructor;
    defineProperties(Iterator.prototype, assign({
        _next: d((function() {
            var i;
            if (this.__list__) {
                if (this.__redo__ && void 0 !== (i = this.__redo__.shift())) return i;
                if (this.__nextIndex__ < this.__list__.length) return this.__nextIndex__++;
                this._unBind();
            }
        })),
        next: d((function() {
            return this._createResult(this._next());
        })),
        _createResult: d((function(i) {
            return void 0 === i ? {
                done: !0,
                value: void 0
            } : {
                done: !1,
                value: this._resolve(i)
            };
        })),
        _resolve: d((function(i) {
            return this.__list__[i];
        })),
        _unBind: d((function() {
            this.__list__ = null;
            delete this.__redo__;
            if (this.__context__) {
                this.__context__.off("_add", this._onAdd);
                this.__context__.off("_delete", this._onDelete);
                this.__context__.off("_clear", this._onClear);
                this.__context__ = null;
            }
        })),
        toString: d((function() {
            return "[object " + (this[Symbol.toStringTag] || "Object") + "]";
        }))
    }, autoBind({
        _onAdd: d((function(index) {
            if (!(index >= this.__nextIndex__)) {
                ++this.__nextIndex__;
                if (this.__redo__) {
                    this.__redo__.forEach((function(redo, i) {
                        redo >= index && (this.__redo__[i] = ++redo);
                    }), this);
                    this.__redo__.push(index);
                } else defineProperty(this, "__redo__", d("c", [ index ]));
            }
        })),
        _onDelete: d((function(index) {
            var i;
            if (!(index >= this.__nextIndex__)) {
                --this.__nextIndex__;
                if (this.__redo__) {
                    -1 !== (i = this.__redo__.indexOf(index)) && this.__redo__.splice(i, 1);
                    this.__redo__.forEach((function(redo, j) {
                        redo > index && (this.__redo__[j] = --redo);
                    }), this);
                }
            }
        })),
        _onClear: d((function() {
            this.__redo__ && clear.call(this.__redo__);
            this.__nextIndex__ = 0;
        }))
    })));
    defineProperty(Iterator.prototype, Symbol.iterator, d((function() {
        return this;
    })));
}, function(module, exports, __webpack_require__) {
    "use strict";
    var isValue = __webpack_require__(18), isObject = __webpack_require__(40), stringCoerce = __webpack_require__(197), toShortString = __webpack_require__(198), resolveMessage = function(message, value) {
        return message.replace("%v", toShortString(value));
    };
    module.exports = function(value, defaultMessage, inputOptions) {
        if (!isObject(inputOptions)) throw new TypeError(resolveMessage(defaultMessage, value));
        if (!isValue(value)) {
            if ("default" in inputOptions) return inputOptions.default;
            if (inputOptions.isOptional) return null;
        }
        var errorMessage = stringCoerce(inputOptions.errorMessage);
        isValue(errorMessage) || (errorMessage = defaultMessage);
        throw new TypeError(resolveMessage(errorMessage, value));
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.isRuleAffected = exports.getAndCheckBindValues = exports.resolveOdataBind = exports.compileRequest = void 0;
    const _ = __webpack_require__(0), AbstractSQLCompiler = __webpack_require__(23), odata_to_abstract_sql_1 = __webpack_require__(16), deepFreeze = __webpack_require__(44), memoize = __webpack_require__(17), memoizeWeak = __webpack_require__(32), env = __webpack_require__(12), errors_1 = __webpack_require__(20), sbvrUtils = __webpack_require__(5), getMemoizedCompileRule = memoize((engine => memoizeWeak((abstractSqlQuery => {
        const sqlQuery = AbstractSQLCompiler[engine].compileRule(abstractSqlQuery), modifiedFields = AbstractSQLCompiler[engine].getModifiedFields(abstractSqlQuery);
        null != modifiedFields && deepFreeze(modifiedFields);
        return {
            sqlQuery: sqlQuery,
            modifiedFields: modifiedFields
        };
    }), {
        max: env.cache.abstractSqlCompiler.max
    })), {
        primitive: !0
    }), compileRequest = request => {
        if (null != request.abstractSqlQuery) {
            const {engine: engine} = request;
            if (null == engine) throw new errors_1.SqlCompilationError("No database engine specified");
            try {
                const {sqlQuery: sqlQuery, modifiedFields: modifiedFields} = getMemoizedCompileRule(engine)(request.abstractSqlQuery);
                request.sqlQuery = sqlQuery;
                request.modifiedFields = modifiedFields;
            } catch (err) {
                sbvrUtils.api[request.vocabulary].logger.error("Failed to compile abstract sql: ", request.abstractSqlQuery, err);
                throw new errors_1.SqlCompilationError(err);
            }
        }
        return request;
    };
    exports.compileRequest = compileRequest;
    const resolveOdataBind = (odataBinds, value) => {
        null != value && "object" == typeof value && odata_to_abstract_sql_1.isBindReference(value) && ([, value] = odataBinds[value.bind]);
        return value;
    };
    exports.resolveOdataBind = resolveOdataBind;
    const getAndCheckBindValues = async (request, bindings) => {
        const {odataBinds: odataBinds, values: values, engine: engine} = request, sqlModelTables = sbvrUtils.getAbstractSqlModel(request).tables;
        return await Promise.all(bindings.map((async binding => {
            let fieldName = "", field, value;
            if ("Bind" === binding[0]) {
                const bindValue = binding[1];
                if (Array.isArray(bindValue)) {
                    let tableName;
                    [tableName, fieldName] = bindValue;
                    const referencedName = undefined;
                    value = values[tableName + "." + fieldName];
                    void 0 === value && (value = values[fieldName]);
                    value = exports.resolveOdataBind(odataBinds, value);
                    const sqlTableName = odata_to_abstract_sql_1.odataNameToSqlName(tableName), sqlFieldName = odata_to_abstract_sql_1.odataNameToSqlName(fieldName), maybeField = sqlModelTables[sqlTableName].fields.find((f => f.fieldName === sqlFieldName));
                    if (null == maybeField) throw new Error(`Could not find field '${fieldName}'`);
                    field = maybeField;
                } else if (Number.isInteger(bindValue)) {
                    if (bindValue >= odataBinds.length) {
                        console.error(`Invalid binding number '${bindValue}' for binds: `, odataBinds);
                        throw new Error("Invalid binding");
                    }
                    let dataType;
                    [dataType, value] = odataBinds[bindValue];
                    field = {
                        dataType: dataType
                    };
                } else {
                    if ("string" != typeof bindValue) throw new Error(`Unknown binding: ${binding}`);
                    {
                        if (!odataBinds.hasOwnProperty(bindValue)) {
                            console.error(`Invalid binding '${bindValue}' for binds: `, odataBinds);
                            throw new Error("Invalid binding");
                        }
                        let dataType;
                        [dataType, value] = odataBinds[bindValue];
                        field = {
                            dataType: dataType
                        };
                    }
                }
            } else {
                let dataType;
                [dataType, value] = binding;
                field = {
                    dataType: dataType
                };
            }
            if (void 0 === value) throw new Error(`Bind value cannot be undefined: ${binding}`);
            try {
                return await AbstractSQLCompiler[engine].dataTypeValidate(value, field);
            } catch (err) {
                throw new errors_1.BadRequestError(`"${fieldName}" ${err.message}`);
            }
        })));
    };
    exports.getAndCheckBindValues = getAndCheckBindValues;
    const checkModifiedFields = (ruleReferencedFields, modifiedFields) => {
        const refs = ruleReferencedFields[modifiedFields.table];
        return null != refs && (0 !== refs[modifiedFields.action].length && (null == modifiedFields.fields || _.intersection(refs[modifiedFields.action], modifiedFields.fields).length > 0));
    }, isRuleAffected = (rule, request) => {
        if (null == (null == request ? void 0 : request.abstractSqlQuery)) return !1;
        if (null == rule.ruleReferencedFields) return !0;
        const {modifiedFields: modifiedFields} = request;
        if (null == modifiedFields) {
            console.warn(`Could not determine the modified table/fields info for '${request.method}' to ${request.vocabulary}`, request.abstractSqlQuery);
            return !0;
        }
        return Array.isArray(modifiedFields) ? modifiedFields.some(_.partial(checkModifiedFields, rule.ruleReferencedFields)) : checkModifiedFields(rule.ruleReferencedFields, modifiedFields);
    };
    exports.isRuleAffected = isRuleAffected;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.initialised = exports.ExtendedSBVRParser = exports.PinejsSessionStore = exports.sbvrUtils = void 0;
    const Pinejs = __webpack_require__(33);
    var module_1 = __webpack_require__(33);
    Object.defineProperty(exports, "sbvrUtils", {
        enumerable: !0,
        get: function() {
            return module_1.sbvrUtils;
        }
    });
    Object.defineProperty(exports, "PinejsSessionStore", {
        enumerable: !0,
        get: function() {
            return module_1.PinejsSessionStore;
        }
    });
    var extended_sbvr_parser_1 = __webpack_require__(62);
    Object.defineProperty(exports, "ExtendedSBVRParser", {
        enumerable: !0,
        get: function() {
            return extended_sbvr_parser_1.ExtendedSBVRParser;
        }
    });
    const passportPinejs = __webpack_require__(217), express = undefined, app = __webpack_require__(218)();
    switch (app.get("env")) {
      case "production":
        console.log = () => {};
    }
    0;
    exports.initialised = Pinejs.init(app).then((async configLoader => {
        await Promise.all([ configLoader.loadConfig(passportPinejs.config), configLoader.loadConfig(Pinejs.PinejsSessionStore.config) ]);
        if ("undefined" == typeof process || null == process || !process.env.DISABLE_DEFAULT_AUTH) {
            app.post("/login", passportPinejs.login(((err, user, req, res) => {
                if (err) {
                    console.error("Error logging in", err, err.stack);
                    res.sendStatus(500);
                } else !1 === user ? !0 === req.xhr ? res.sendStatus(401) : res.redirect("/login.html") : !0 === req.xhr ? res.sendStatus(200) : res.redirect("/");
            })));
            app.get("/logout", passportPinejs.logout, ((_req, res) => {
                res.redirect("/");
            }));
        }
        app.listen(process.env.PORT || 1337, (() => {
            console.info("Server started");
        }));
    })).catch((err => {
        console.error("Error initialising server", err, err.stack);
        process.exit(1);
    }));
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    0;
}, function(module, exports, __webpack_require__) {
    "use strict";
    var has = Object.prototype.hasOwnProperty, prefix = "~";
    function Events() {}
    if (Object.create) {
        Events.prototype = Object.create(null);
        (new Events).__proto__ || (prefix = !1);
    }
    function EE(fn, context, once) {
        this.fn = fn;
        this.context = context;
        this.once = once || !1;
    }
    function addListener(emitter, event, fn, context, once) {
        if ("function" != typeof fn) throw new TypeError("The listener must be a function");
        var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
        emitter._events[evt] ? emitter._events[evt].fn ? emitter._events[evt] = [ emitter._events[evt], listener ] : emitter._events[evt].push(listener) : (emitter._events[evt] = listener, 
        emitter._eventsCount++);
        return emitter;
    }
    function clearEvent(emitter, evt) {
        0 == --emitter._eventsCount ? emitter._events = new Events : delete emitter._events[evt];
    }
    function EventEmitter() {
        this._events = new Events;
        this._eventsCount = 0;
    }
    EventEmitter.prototype.eventNames = function eventNames() {
        var names = [], events, name;
        if (0 === this._eventsCount) return names;
        for (name in events = this._events) has.call(events, name) && names.push(prefix ? name.slice(1) : name);
        return Object.getOwnPropertySymbols ? names.concat(Object.getOwnPropertySymbols(events)) : names;
    };
    EventEmitter.prototype.listeners = function listeners(event) {
        var evt = prefix ? prefix + event : event, handlers = this._events[evt];
        if (!handlers) return [];
        if (handlers.fn) return [ handlers.fn ];
        for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) ee[i] = handlers[i].fn;
        return ee;
    };
    EventEmitter.prototype.listenerCount = function listenerCount(event) {
        var evt = prefix ? prefix + event : event, listeners = this._events[evt];
        return listeners ? listeners.fn ? 1 : listeners.length : 0;
    };
    EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt]) return !1;
        var listeners = this._events[evt], len = arguments.length, args, i;
        if (listeners.fn) {
            listeners.once && this.removeListener(event, listeners.fn, void 0, !0);
            switch (len) {
              case 1:
                return listeners.fn.call(listeners.context), !0;

              case 2:
                return listeners.fn.call(listeners.context, a1), !0;

              case 3:
                return listeners.fn.call(listeners.context, a1, a2), !0;

              case 4:
                return listeners.fn.call(listeners.context, a1, a2, a3), !0;

              case 5:
                return listeners.fn.call(listeners.context, a1, a2, a3, a4), !0;

              case 6:
                return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), !0;
            }
            for (i = 1, args = new Array(len - 1); i < len; i++) args[i - 1] = arguments[i];
            listeners.fn.apply(listeners.context, args);
        } else {
            var length = listeners.length, j;
            for (i = 0; i < length; i++) {
                listeners[i].once && this.removeListener(event, listeners[i].fn, void 0, !0);
                switch (len) {
                  case 1:
                    listeners[i].fn.call(listeners[i].context);
                    break;

                  case 2:
                    listeners[i].fn.call(listeners[i].context, a1);
                    break;

                  case 3:
                    listeners[i].fn.call(listeners[i].context, a1, a2);
                    break;

                  case 4:
                    listeners[i].fn.call(listeners[i].context, a1, a2, a3);
                    break;

                  default:
                    if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) args[j - 1] = arguments[j];
                    listeners[i].fn.apply(listeners[i].context, args);
                }
            }
        }
        return !0;
    };
    EventEmitter.prototype.on = function on(event, fn, context) {
        return addListener(this, event, fn, context, !1);
    };
    EventEmitter.prototype.once = function once(event, fn, context) {
        return addListener(this, event, fn, context, !0);
    };
    EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt]) return this;
        if (!fn) {
            clearEvent(this, evt);
            return this;
        }
        var listeners = this._events[evt];
        if (listeners.fn) listeners.fn !== fn || once && !listeners.once || context && listeners.context !== context || clearEvent(this, evt); else {
            for (var i = 0, events = [], length = listeners.length; i < length; i++) (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) && events.push(listeners[i]);
            events.length ? this._events[evt] = 1 === events.length ? events[0] : events : clearEvent(this, evt);
        }
        return this;
    };
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
        var evt;
        if (event) {
            evt = prefix ? prefix + event : event;
            this._events[evt] && clearEvent(this, evt);
        } else {
            this._events = new Events;
            this._eventsCount = 0;
        }
        return this;
    };
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.addListener = EventEmitter.prototype.on;
    EventEmitter.prefixed = prefix;
    EventEmitter.EventEmitter = EventEmitter;
    module.exports = EventEmitter;
}, function(module, exports) {
    module.exports = require("pg");
}, function(module, exports, __webpack_require__) {
    "use strict";
    var url = __webpack_require__(80), fs = __webpack_require__(35);
    function parse(str) {
        if ("/" === str.charAt(0)) {
            var config;
            return {
                host: (config = str.split(" "))[0],
                database: config[1]
            };
        }
        var result = url.parse(/ |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(str) ? encodeURI(str).replace(/\%25(\d\d)/g, "%$1") : str, !0), config = result.query;
        for (var k in config) Array.isArray(config[k]) && (config[k] = config[k][config[k].length - 1]);
        var auth = (result.auth || ":").split(":");
        config.user = auth[0];
        config.password = auth.splice(1).join(":");
        config.port = result.port;
        if ("socket:" == result.protocol) {
            config.host = decodeURI(result.pathname);
            config.database = result.query.db;
            config.client_encoding = result.query.encoding;
            return config;
        }
        config.host || (config.host = result.hostname);
        var pathname = result.pathname;
        if (!config.host && pathname && /^%2f/i.test(pathname)) {
            var pathnameSplit = pathname.split("/");
            config.host = decodeURIComponent(pathnameSplit[0]);
            pathname = pathnameSplit.splice(1).join("/");
        }
        pathname && "/" === pathname.charAt(0) && (pathname = pathname.slice(1) || null);
        config.database = pathname && decodeURI(pathname);
        "true" !== config.ssl && "1" !== config.ssl || (config.ssl = !0);
        "0" === config.ssl && (config.ssl = !1);
        (config.sslcert || config.sslkey || config.sslrootcert || config.sslmode) && (config.ssl = {});
        config.sslcert && (config.ssl.cert = fs.readFileSync(config.sslcert).toString());
        config.sslkey && (config.ssl.key = fs.readFileSync(config.sslkey).toString());
        config.sslrootcert && (config.ssl.ca = fs.readFileSync(config.sslrootcert).toString());
        switch (config.sslmode) {
          case "disable":
            config.ssl = !1;
            break;

          case "prefer":
          case "require":
          case "verify-ca":
          case "verify-full":
            break;

          case "no-verify":
            config.ssl.rejectUnauthorized = !1;
        }
        return config;
    }
    module.exports = parse;
    parse.parse = parse;
}, function(module, exports) {
    module.exports = require("url");
}, function(module, exports) {
    module.exports = require("mysql");
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.setup = void 0;
    const fs = __webpack_require__(35), _ = __webpack_require__(0), path = __webpack_require__(83), sbvrUtils = __webpack_require__(5), permissions = __webpack_require__(19), getOrCreate = async (authApiTx, resource, uniqueFields, extraFields) => {
        const result = await authApiTx.get({
            resource: resource,
            id: uniqueFields,
            options: {
                $select: "id"
            }
        });
        if (null != result) return result.id;
        const {id: id} = await authApiTx.post({
            resource: resource,
            body: {
                ...uniqueFields,
                ...extraFields
            },
            options: {
                returnResource: !1
            }
        });
        return id;
    }, getOrCreatePermission = async (authApiTx, permissionName) => {
        try {
            return await getOrCreate(authApiTx, "permission", {
                name: permissionName
            });
        } catch (e) {
            e.message = `Could not create or find permission "${permissionName}": ${e.message}`;
            throw e;
        }
    }, setup = app => {
        const loadConfig = data => sbvrUtils.db.transaction((async tx => {
            const authApiTx = sbvrUtils.api.Auth.clone({
                passthrough: {
                    tx: tx,
                    req: permissions.root
                }
            }), {users: users} = data;
            if (null != users) {
                const permissionsCache = {};
                users.forEach((user => {
                    null != user.permissions && user.permissions.forEach((permissionName => {
                        null == permissionsCache[permissionName] && (permissionsCache[permissionName] = getOrCreatePermission(authApiTx, permissionName));
                    }));
                }));
                await Promise.all(users.map((async user => {
                    try {
                        const userID = await getOrCreate(authApiTx, "user", {
                            username: user.username
                        }, {
                            password: user.password
                        });
                        null != user.permissions && await Promise.all(user.permissions.map((async permissionName => {
                            const permissionID = await permissionsCache[permissionName];
                            await getOrCreate(authApiTx, "user__has__permission", {
                                user: userID,
                                permission: permissionID
                            });
                        })));
                    } catch (e) {
                        e.message = `Could not create or find user "${user.username}": ${e.message}`;
                        throw e;
                    }
                })));
            }
            await Promise.all(data.models.map((async model => {
                if ((null != model.abstractSql || null != model.modelText) && null != model.apiRoot) try {
                    await sbvrUtils.executeModel(tx, model);
                    const apiRoute = `/${model.apiRoot}/*`;
                    app.options(apiRoute, ((_req, res) => res.sendStatus(200)));
                    app.all(apiRoute, sbvrUtils.handleODataRequest);
                    console.info("Successfully executed " + model.modelName + " model.");
                } catch (err) {
                    const message = `Failed to execute ${model.modelName} model from ${model.modelFile}`;
                    if (_.isError(err)) {
                        err.message = message;
                        throw err;
                    }
                    throw new Error(message);
                }
                if (null != model.customServerCode) {
                    let customCode;
                    if ("string" == typeof model.customServerCode) try {
                        customCode = nodeRequire(model.customServerCode).setup;
                    } catch (e) {
                        e.message = `Error loading custom server code: '${e.message}'`;
                        throw e;
                    } else {
                        if (!_.isObject(model.customServerCode)) throw new Error(`Invalid type for customServerCode '${typeof model.customServerCode}'`);
                        customCode = model.customServerCode.setup;
                    }
                    if ("function" != typeof customCode) return;
                    await customCode(app, sbvrUtils, sbvrUtils.db);
                }
            })));
        })), loadConfigFile = async configPath => {
            console.info("Loading config:", configPath);
            return await Promise.resolve().then((() => __webpack_require__(210)(configPath)));
        }, loadApplicationConfig = async config => {
            try {
                console.info("Loading application config");
                let root, configObj;
                if (null == config) {
                    root = path.resolve(process.argv[2]) || __dirname;
                    configObj = await loadConfigFile(path.join(root, "config.json"));
                } else if ("string" == typeof config) {
                    root = path.dirname(config);
                    configObj = await loadConfigFile(config);
                } else {
                    if (!_.isObject(config)) throw new Error(`Invalid type for config '${typeof config}'`);
                    root = process.cwd();
                    configObj = config;
                }
                const resolvePath = s => path.isAbsolute(s) ? s : path.join(root, s);
                await Promise.all(configObj.models.map((async model => {
                    var _a;
                    null != model.modelFile && (model.modelText = await fs.promises.readFile(resolvePath(model.modelFile), "utf8"));
                    "string" == typeof model.customServerCode && (model.customServerCode = resolvePath(model.customServerCode));
                    null !== (_a = model.migrations) && void 0 !== _a || (model.migrations = {});
                    const {migrations: migrations} = model;
                    if (model.migrationsPath) {
                        const migrationsPath = resolvePath(model.migrationsPath), fileNames = await fs.promises.readdir(migrationsPath);
                        await Promise.all(fileNames.map((async filename => {
                            const filePath = path.join(migrationsPath, filename), [migrationKey] = filename.split("-", 1);
                            switch (path.extname(filename)) {
                              case ".coffee":
                              case ".ts":
                              case ".js":
                                migrations[migrationKey] = nodeRequire(filePath);
                                break;

                              case ".sql":
                                migrations[migrationKey] = await fs.promises.readFile(filePath, "utf8");
                                break;

                              default:
                                console.error(`Unrecognised migration file extension, skipping: ${path.extname(filename)}`);
                            }
                        })));
                    }
                    if (model.initSqlPath) {
                        const initSqlPath = resolvePath(model.initSqlPath);
                        model.initSql = await fs.promises.readFile(initSqlPath, "utf8");
                    }
                })));
                await loadConfig(configObj);
            } catch (err) {
                console.error("Error loading application config", err, err.stack);
                process.exit(1);
            }
        };
        return {
            loadConfig: loadConfig,
            loadApplicationConfig: loadApplicationConfig
        };
    };
    exports.setup = setup;
}, function(module, exports) {
    module.exports = require("path");
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.cachedCompile = void 0;
    const _ = __webpack_require__(0), cacheFile = process.env.PINEJS_CACHE_FILE || ".pinejs-cache.json";
    let cache = null, fs;
    try {
        fs = __webpack_require__(35);
    } catch (e) {}
    const SAVE_DEBOUNCE_TIME = 5e3, saveCache = _.debounce((() => {
        null != fs && fs.writeFile(cacheFile, JSON.stringify(cache), "utf8", (err => {
            err && console.warn("Error saving pinejs cache:", err);
        }));
    }), 5e3), clearCache = _.debounce((() => {
        cache = null;
    }), 1e4), cachedCompile = (name, version, src, fn) => {
        if (null == cache) {
            if (null != fs) try {
                cache = JSON.parse(fs.readFileSync(cacheFile, "utf8"));
            } catch (e) {}
            null != cache || (cache = {});
        }
        const key = [ name, version, JSON.stringify(src) ];
        let result = _.get(cache, key);
        if (null == result) {
            result = fn();
            _.set(cache, key, result);
            saveCache();
        }
        clearCache();
        return _.cloneDeep(result);
    };
    exports.cachedCompile = cachedCompile;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.validate = exports.nativeFactTypes = exports.types = void 0;
    const TypeUtils = __webpack_require__(1);
    exports.types = {
        postgres: "BIGINT",
        mysql: "BIGINT",
        websql: "BIGINT",
        odata: {
            name: "Edm.Int64"
        }
    };
    exports.nativeFactTypes = {
        Integer: TypeUtils.nativeFactTypeTemplates.comparison,
        Real: TypeUtils.nativeFactTypeTemplates.comparison
    };
    exports.validate = TypeUtils.validate.integer;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.validate = exports.fetchProcessing = exports.types = void 0;
    const TypeUtils = __webpack_require__(1), typeFunc = (necessity, index, defaultValue = " DEFAULT 0") => "INTEGER" + defaultValue + necessity + index;
    typeFunc.castType = "INTEGER";
    exports.types = {
        postgres: typeFunc,
        mysql: typeFunc,
        websql: typeFunc,
        odata: {
            name: "Edm.Boolean"
        }
    };
    const fetchProcessing = data => 1 === data;
    exports.fetchProcessing = fetchProcessing;
    exports.validate = TypeUtils.validate.checkRequired((originalValue => {
        const value = Number(originalValue);
        if (Number.isNaN(value) || ![ 0, 1 ].includes(value)) throw new Error(`is not a boolean: ${JSON.stringify(originalValue)} (${typeof originalValue})`);
        return value;
    }));
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.validate = exports.types = void 0;
    const TypeUtils = __webpack_require__(1);
    exports.types = {
        postgres: "CITEXT",
        mysql: "TEXT COLLATE utf8_unicode_ci",
        websql: "TEXT COLLATE NOCASE",
        odata: {
            name: "Edm.String"
        }
    };
    exports.validate = TypeUtils.validate.text();
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.validate = exports.fetchProcessing = exports.nativeProperties = exports.types = void 0;
    const TypeUtils = __webpack_require__(1);
    exports.types = {
        postgres: "INTEGER",
        mysql: "INTEGER",
        websql: "INTEGER",
        odata: {
            name: "Self.Color",
            complexType: '<ComplexType Name="Color">\n\t<Property Name="r" Nullable="false" Type="Edm.Int8"/>\t<Property Name="g" Nullable="false" Type="Edm.Int8"/>\t<Property Name="b" Nullable="false" Type="Edm.Int8"/>\t<Property Name="a" Nullable="false" Type="Edm.Int8"/></ComplexType>'
        }
    };
    exports.nativeProperties = {
        has: {
            "Red Component": from => [ "BitwiseAnd", [ "BitwiseShiftRight", from, 16 ], 255 ],
            "Green Component": from => [ "BitwiseAnd", [ "BitwiseShiftRight", from, 8 ], 255 ],
            "Blue Component": from => [ "BitwiseShiftRight", from, 255 ],
            "Alpha Component": from => [ "BitwiseAnd", [ "BitwiseShiftRight", from, 24 ], 255 ]
        }
    };
    const fetchProcessing = data => ({
        r: data >> 16 & 255,
        g: data >> 8 & 255,
        b: 255 & data,
        a: data >> 24 & 255
    });
    exports.fetchProcessing = fetchProcessing;
    exports.validate = TypeUtils.validate.checkRequired((value => {
        let processedValue;
        if ("object" != typeof value) {
            processedValue = parseInt(value, 10);
            if (Number.isNaN(processedValue)) throw new Error("is neither an integer or color object: " + value);
        } else {
            processedValue = 0;
            Object.keys(value).forEach((component => {
                const componentValue = value[component];
                if (Number.isNaN(componentValue) || componentValue > 255) throw new Error("has invalid component value of " + componentValue + " for component " + component);
                switch (component.toLowerCase()) {
                  case "r":
                  case "red":
                    processedValue |= componentValue << 16;
                    break;

                  case "g":
                  case "green":
                    processedValue |= componentValue << 8;
                    break;

                  case "b":
                  case "blue":
                    processedValue |= componentValue;
                    break;

                  case "a":
                  case "alpha":
                    processedValue |= componentValue << 24;
                    break;

                  default:
                    throw new Error("has an unknown component: " + component);
                }
            }));
        }
        return processedValue;
    }));
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.validate = exports.nativeFactTypes = exports.types = void 0;
    const TypeUtils = __webpack_require__(1);
    exports.types = {
        postgres: "INTEGER",
        mysql: "INTEGER",
        websql: "INTEGER",
        odata: {
            name: "Edm.Int64"
        }
    };
    exports.nativeFactTypes = {
        Integer: TypeUtils.nativeFactTypeTemplates.comparison,
        Real: TypeUtils.nativeFactTypeTemplates.comparison
    };
    exports.validate = TypeUtils.validate.integer;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.validate = exports.nativeFactTypes = exports.fetchProcessing = exports.types = void 0;
    const TypeUtils = __webpack_require__(1);
    exports.types = {
        postgres: "DATE",
        mysql: "DATE",
        websql: "INTEGER",
        odata: {
            name: "Edm.DateTime"
        }
    };
    const fetchProcessing = data => null != data ? new Date(data) : data;
    exports.fetchProcessing = fetchProcessing;
    exports.nativeFactTypes = {
        Date: {
            ...TypeUtils.nativeFactTypeTemplates.equality,
            "is before": (from, to) => [ "LessThan", from, to ],
            "is after": (from, to) => [ "GreaterThan", from, to ]
        }
    };
    exports.validate = TypeUtils.validate.date;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.validate = exports.nativeNames = exports.nativeFactTypes = exports.fetchProcessing = exports.types = void 0;
    const TypeUtils = __webpack_require__(1);
    exports.types = {
        postgres: "TIMESTAMP",
        mysql: "TIMESTAMP",
        websql: "INTEGER",
        odata: {
            name: "Edm.DateTime"
        }
    };
    const fetchProcessing = data => null != data ? new Date(data) : data;
    exports.fetchProcessing = fetchProcessing;
    exports.nativeFactTypes = {
        "Date Time": {
            ...TypeUtils.nativeFactTypeTemplates.equality,
            "is before": (from, to) => [ "LessThan", from, to ],
            "is after": (from, to) => [ "GreaterThan", from, to ]
        }
    };
    exports.nativeNames = {
        "Current Time": [ "Now" ]
    };
    exports.validate = TypeUtils.validate.date;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.validate = exports.types = void 0;
    const TypeUtils = __webpack_require__(1);
    exports.types = {
        postgres: "BYTEA",
        mysql: "BLOB",
        websql: "BLOB",
        odata: {
            name: "Edm.String"
        }
    };
    exports.validate = TypeUtils.validate.checkRequired((value => {
        if (Buffer.isBuffer(value)) return value;
        if ("string" != typeof value) throw new Error("could not be converted to binary: " + typeof value);
        if (value.length % 2 != 0) throw new Error("could not be converted to binary: hex string must have an even length");
        if (!/^[a-fA-F0-9]*$/.test(value)) throw new Error("could not be converted to binary: hex string must contain only hex characters");
        try {
            return new Buffer(value, "hex");
        } catch (e) {
            throw new Error(`could not be converted to binary: ${e.message}`);
        }
    }));
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.validate = exports.nativeFactTypes = exports.types = void 0;
    const TypeUtils = __webpack_require__(1);
    exports.types = {
        postgres: "INTEGER",
        mysql: "INTEGER",
        websql: "INTEGER",
        odata: {
            name: "Edm.Int64"
        }
    };
    exports.nativeFactTypes = {
        Integer: TypeUtils.nativeFactTypeTemplates.comparison,
        Real: TypeUtils.nativeFactTypeTemplates.comparison
    };
    exports.validate = TypeUtils.validate.integer;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.compare = exports.validate = exports.types = void 0;
    const TypeUtils = __webpack_require__(1);
    let bcrypt;
    try {
        bcrypt = __webpack_require__(95);
    } catch (_a) {
        bcrypt = __webpack_require__(96);
    }
    exports.types = {
        postgres: "CHAR(60)",
        mysql: "CHAR(60)",
        websql: "CHAR(60)",
        odata: {
            name: "Edm.String"
        }
    };
    exports.validate = TypeUtils.validate.checkRequired((async value => {
        if ("string" != typeof value) throw new Error("is not a string");
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(value, salt);
    }));
    exports.compare = bcrypt.compare.bind(bcrypt);
}, function(module, exports) {
    module.exports = require("bcrypt");
}, function(module, exports) {
    module.exports = require("bcryptjs");
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.validate = exports.nativeFactTypes = exports.types = void 0;
    const TypeUtils = __webpack_require__(1);
    exports.types = {
        postgres: "INTEGER",
        mysql: "INTEGER",
        websql: "INTEGER",
        odata: {
            name: "Edm.Int32"
        }
    };
    exports.nativeFactTypes = {
        Integer: TypeUtils.nativeFactTypeTemplates.comparison,
        Real: TypeUtils.nativeFactTypeTemplates.comparison
    };
    exports.validate = TypeUtils.validate.integer;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.validate = exports.types = void 0;
    const TypeUtils = __webpack_require__(1);
    exports.types = {
        postgres: "INTERVAL",
        mysql: "INTEGER",
        websql: "INTEGER",
        odata: {
            name: "Edm.Int64"
        }
    };
    exports.validate = TypeUtils.validate.integer;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.validate = exports.fetchProcessing = exports.types = void 0;
    const TypeUtils = __webpack_require__(1);
    exports.types = {
        postgres: "TEXT",
        mysql: "TEXT",
        websql: "TEXT",
        odata: {
            name: "Edm.String"
        }
    };
    const fetchProcessing = data => JSON.parse(data);
    exports.fetchProcessing = fetchProcessing;
    exports.validate = TypeUtils.validate.checkRequired((value => {
        try {
            return JSON.stringify(value);
        } catch (_a) {
            throw new Error("cannot be turned into JSON: " + value);
        }
    }));
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.validate = exports.nativeFactTypes = exports.types = void 0;
    const TypeUtils = __webpack_require__(1);
    exports.types = {
        postgres: "REAL",
        mysql: "REAL",
        websql: "REAL",
        odata: {
            name: "Edm.Double"
        }
    };
    exports.nativeFactTypes = {
        Integer: TypeUtils.nativeFactTypeTemplates.comparison,
        Real: TypeUtils.nativeFactTypeTemplates.comparison
    };
    exports.validate = TypeUtils.validate.checkRequired((value => {
        const processedValue = parseFloat(value);
        if (Number.isNaN(processedValue)) throw new Error("is not a number: " + value);
        return processedValue;
    }));
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.validate = exports.types = void 0;
    const TypeUtils = __webpack_require__(1), mysqlType = (necessity, index, defaultValue = "") => "INTEGER" + defaultValue + necessity + index + " AUTO_INCREMENT";
    mysqlType.castType = "INTEGER";
    const websqlType = (necessity, index, defaultValue = "") => "INTEGER" + defaultValue + necessity + index + " AUTOINCREMENT";
    websqlType.castType = "INTEGER";
    exports.types = {
        postgres: "SERIAL",
        mysql: mysqlType,
        websql: websqlType,
        odata: {
            name: "Edm.Int64"
        }
    };
    exports.validate = TypeUtils.validate.integer;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.compare = exports.validate = exports.validateSync = exports.types = void 0;
    const TypeUtils = __webpack_require__(1);
    let sha256;
    try {
        const crypto = __webpack_require__(48);
        sha256 = value => {
            const hash = crypto.createHash("sha256");
            hash.update(value);
            return `$sha256$${hash.digest("base64")}`;
        };
    } catch (_a) {
        const shajs = __webpack_require__(103);
        sha256 = value => {
            const hash = shajs("sha256");
            hash.update(value);
            return `$sha256$${hash.digest("base64")}`;
        };
    }
    exports.types = {
        postgres: "CHAR(54)",
        mysql: "CHAR(54)",
        websql: "CHAR(54)",
        odata: {
            name: "Edm.String"
        }
    };
    exports.validateSync = sha256;
    exports.validate = TypeUtils.validate.checkRequired((value => {
        if ("string" != typeof value) throw new Error("is not a string");
        return sha256(value);
    }));
    const compare = async (value, result) => sha256(value) === result;
    exports.compare = compare;
}, function(module, exports, __webpack_require__) {
    var exports;
    (exports = module.exports = function SHA(algorithm) {
        algorithm = algorithm.toLowerCase();
        var Algorithm = exports[algorithm];
        if (!Algorithm) throw new Error(algorithm + " is not supported (we accept pull requests)");
        return new Algorithm;
    }).sha = __webpack_require__(104);
    exports.sha1 = __webpack_require__(108);
    exports.sha224 = __webpack_require__(109);
    exports.sha256 = __webpack_require__(49);
    exports.sha384 = __webpack_require__(110);
    exports.sha512 = __webpack_require__(50);
}, function(module, exports, __webpack_require__) {
    var inherits = __webpack_require__(14), Hash = __webpack_require__(15), Buffer = __webpack_require__(8).Buffer, K = [ 1518500249, 1859775393, -1894007588, -899497514 ], W = new Array(80);
    function Sha() {
        this.init();
        this._w = W;
        Hash.call(this, 64, 56);
    }
    inherits(Sha, Hash);
    Sha.prototype.init = function() {
        this._a = 1732584193;
        this._b = 4023233417;
        this._c = 2562383102;
        this._d = 271733878;
        this._e = 3285377520;
        return this;
    };
    function rotl5(num) {
        return num << 5 | num >>> 27;
    }
    function rotl30(num) {
        return num << 30 | num >>> 2;
    }
    function ft(s, b, c, d) {
        return 0 === s ? b & c | ~b & d : 2 === s ? b & c | b & d | c & d : b ^ c ^ d;
    }
    Sha.prototype._update = function(M) {
        for (var W = this._w, a = 0 | this._a, b = 0 | this._b, c = 0 | this._c, d = 0 | this._d, e = 0 | this._e, i = 0; i < 16; ++i) W[i] = M.readInt32BE(4 * i);
        for (;i < 80; ++i) W[i] = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
        for (var j = 0; j < 80; ++j) {
            var s = ~~(j / 20), t = rotl5(a) + ft(s, b, c, d) + e + W[j] + K[s] | 0;
            e = d;
            d = c;
            c = rotl30(b);
            b = a;
            a = t;
        }
        this._a = a + this._a | 0;
        this._b = b + this._b | 0;
        this._c = c + this._c | 0;
        this._d = d + this._d | 0;
        this._e = e + this._e | 0;
    };
    Sha.prototype._hash = function() {
        var H = Buffer.allocUnsafe(20);
        H.writeInt32BE(0 | this._a, 0);
        H.writeInt32BE(0 | this._b, 4);
        H.writeInt32BE(0 | this._c, 8);
        H.writeInt32BE(0 | this._d, 12);
        H.writeInt32BE(0 | this._e, 16);
        return H;
    };
    module.exports = Sha;
}, function(module, exports) {
    module.exports = require("util");
}, function(module, exports) {
    "function" == typeof Object.create ? module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
                constructor: {
                    value: ctor,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            });
        }
    } : module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {};
            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor;
            ctor.prototype.constructor = ctor;
        }
    };
}, function(module, exports) {
    module.exports = require("buffer");
}, function(module, exports, __webpack_require__) {
    var inherits = __webpack_require__(14), Hash = __webpack_require__(15), Buffer = __webpack_require__(8).Buffer, K = [ 1518500249, 1859775393, -1894007588, -899497514 ], W = new Array(80);
    function Sha1() {
        this.init();
        this._w = W;
        Hash.call(this, 64, 56);
    }
    inherits(Sha1, Hash);
    Sha1.prototype.init = function() {
        this._a = 1732584193;
        this._b = 4023233417;
        this._c = 2562383102;
        this._d = 271733878;
        this._e = 3285377520;
        return this;
    };
    function rotl1(num) {
        return num << 1 | num >>> 31;
    }
    function rotl5(num) {
        return num << 5 | num >>> 27;
    }
    function rotl30(num) {
        return num << 30 | num >>> 2;
    }
    function ft(s, b, c, d) {
        return 0 === s ? b & c | ~b & d : 2 === s ? b & c | b & d | c & d : b ^ c ^ d;
    }
    Sha1.prototype._update = function(M) {
        for (var W = this._w, a = 0 | this._a, b = 0 | this._b, c = 0 | this._c, d = 0 | this._d, e = 0 | this._e, i = 0; i < 16; ++i) W[i] = M.readInt32BE(4 * i);
        for (;i < 80; ++i) W[i] = rotl1(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16]);
        for (var j = 0; j < 80; ++j) {
            var s = ~~(j / 20), t = rotl5(a) + ft(s, b, c, d) + e + W[j] + K[s] | 0;
            e = d;
            d = c;
            c = rotl30(b);
            b = a;
            a = t;
        }
        this._a = a + this._a | 0;
        this._b = b + this._b | 0;
        this._c = c + this._c | 0;
        this._d = d + this._d | 0;
        this._e = e + this._e | 0;
    };
    Sha1.prototype._hash = function() {
        var H = Buffer.allocUnsafe(20);
        H.writeInt32BE(0 | this._a, 0);
        H.writeInt32BE(0 | this._b, 4);
        H.writeInt32BE(0 | this._c, 8);
        H.writeInt32BE(0 | this._d, 12);
        H.writeInt32BE(0 | this._e, 16);
        return H;
    };
    module.exports = Sha1;
}, function(module, exports, __webpack_require__) {
    var inherits = __webpack_require__(14), Sha256 = __webpack_require__(49), Hash = __webpack_require__(15), Buffer = __webpack_require__(8).Buffer, W = new Array(64);
    function Sha224() {
        this.init();
        this._w = W;
        Hash.call(this, 64, 56);
    }
    inherits(Sha224, Sha256);
    Sha224.prototype.init = function() {
        this._a = 3238371032;
        this._b = 914150663;
        this._c = 812702999;
        this._d = 4144912697;
        this._e = 4290775857;
        this._f = 1750603025;
        this._g = 1694076839;
        this._h = 3204075428;
        return this;
    };
    Sha224.prototype._hash = function() {
        var H = Buffer.allocUnsafe(28);
        H.writeInt32BE(this._a, 0);
        H.writeInt32BE(this._b, 4);
        H.writeInt32BE(this._c, 8);
        H.writeInt32BE(this._d, 12);
        H.writeInt32BE(this._e, 16);
        H.writeInt32BE(this._f, 20);
        H.writeInt32BE(this._g, 24);
        return H;
    };
    module.exports = Sha224;
}, function(module, exports, __webpack_require__) {
    var inherits = __webpack_require__(14), SHA512 = __webpack_require__(50), Hash = __webpack_require__(15), Buffer = __webpack_require__(8).Buffer, W = new Array(160);
    function Sha384() {
        this.init();
        this._w = W;
        Hash.call(this, 128, 112);
    }
    inherits(Sha384, SHA512);
    Sha384.prototype.init = function() {
        this._ah = 3418070365;
        this._bh = 1654270250;
        this._ch = 2438529370;
        this._dh = 355462360;
        this._eh = 1731405415;
        this._fh = 2394180231;
        this._gh = 3675008525;
        this._hh = 1203062813;
        this._al = 3238371032;
        this._bl = 914150663;
        this._cl = 812702999;
        this._dl = 4144912697;
        this._el = 4290775857;
        this._fl = 1750603025;
        this._gl = 1694076839;
        this._hl = 3204075428;
        return this;
    };
    Sha384.prototype._hash = function() {
        var H = Buffer.allocUnsafe(48);
        function writeInt64BE(h, l, offset) {
            H.writeInt32BE(h, offset);
            H.writeInt32BE(l, offset + 4);
        }
        writeInt64BE(this._ah, this._al, 0);
        writeInt64BE(this._bh, this._bl, 8);
        writeInt64BE(this._ch, this._cl, 16);
        writeInt64BE(this._dh, this._dl, 24);
        writeInt64BE(this._eh, this._el, 32);
        writeInt64BE(this._fh, this._fl, 40);
        return H;
    };
    module.exports = Sha384;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.validate = exports.types = void 0;
    const TypeUtils = __webpack_require__(1);
    exports.types = {
        postgres: "VARCHAR(255)",
        mysql: "VARCHAR(255)",
        websql: "VARCHAR(255)",
        odata: {
            name: "Edm.String"
        }
    };
    exports.validate = TypeUtils.validate.text(255);
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.validate = exports.nativeFactTypes = exports.nativeProperties = exports.types = void 0;
    const TypeUtils = __webpack_require__(1);
    exports.types = {
        postgres: "TEXT",
        mysql: "TEXT",
        websql: "TEXT",
        odata: {
            name: "Edm.String"
        }
    };
    exports.nativeProperties = {
        has: {
            Length: from => [ "CharacterLength", from ]
        }
    };
    exports.nativeFactTypes = {
        Text: {
            ...TypeUtils.nativeFactTypeTemplates.equality,
            "starts with": (from, to) => [ "Startswith", from, to ],
            "ends with": (from, to) => [ "Endswith", from, to ],
            contains: (from, to) => [ "Contains", from, to ],
            "is contained in": (from, to) => [ "Contains", to, from ]
        }
    };
    exports.validate = TypeUtils.validate.text();
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.validate = exports.fetchProcessing = exports.types = void 0;
    const TypeUtils = __webpack_require__(1);
    exports.types = {
        postgres: "TIME",
        mysql: "TIME",
        websql: "INTEGER",
        odata: {
            name: "Edm.DateTime"
        }
    };
    const fetchProcessing = data => null != data ? new Date("Thu, 01 Jan 1970 " + data) : data;
    exports.fetchProcessing = fetchProcessing;
    const validate = async (value, required) => {
        const date = await TypeUtils.validate.date(value, required);
        return null == date ? date : date.toLocaleTimeString();
    };
    exports.validate = validate;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.optimizeSchema = exports.Engines = void 0;
    var Engines;
    !function(Engines) {
        Engines.postgres = "postgres";
        Engines.mysql = "mysql";
        Engines.websql = "websql";
    }(Engines = exports.Engines || (exports.Engines = {}));
    const AbstractSQLOptimiser_1 = __webpack_require__(36), sbvrTypes = __webpack_require__(13), _ = __webpack_require__(0), AbstractSQLCompiler_1 = __webpack_require__(23), countFroms = n => {
        let count = 0;
        n.forEach((p => {
            Array.isArray(p) && (AbstractSQLCompiler_1.isFromNode(p) ? count++ : count += countFroms(p));
        }));
        return count;
    }, optimizeSchema = abstractSqlModel => {
        abstractSqlModel.rules = abstractSqlModel.rules.map((rule => {
            var _a;
            const ruleBodyNode = rule.find((r => "Body" === r[0]));
            if (null == ruleBodyNode || "string" == typeof ruleBodyNode) throw new Error("Invalid rule");
            let ruleBody = ruleBodyNode[1];
            if ("string" == typeof ruleBody) throw new Error("Invalid rule");
            const ruleSENode = rule.find((r => "StructuredEnglish" === r[0]));
            if (null == ruleSENode) throw new Error("Invalid structured English");
            const ruleSE = ruleSENode[1];
            if ("string" != typeof ruleSE) throw new Error("Invalid structured English");
            ruleBodyNode[1] = ruleBody = AbstractSQLOptimiser_1.AbstractSQLOptimiser(ruleBody, !0);
            const count = undefined;
            if (1 === countFroms(ruleBody) && "NotExists" === ruleBody[0] && "SelectQuery" === ruleBody[1][0]) {
                const selectQueryNodes = ruleBody[1].slice(1);
                if (selectQueryNodes.every((n => [ "Select", "From", "Where" ].includes(n[0])))) {
                    let fromNode = selectQueryNodes.find(AbstractSQLCompiler_1.isFromNode)[1];
                    "Alias" === fromNode[0] && (fromNode = fromNode[1]);
                    if ("Table" === fromNode[0]) {
                        const whereNodes = selectQueryNodes.filter((n => "Where" === n[0]));
                        let whereNode;
                        whereNode = whereNodes.length > 1 ? [ "And", ...whereNodes.map((n => n[1])) ] : whereNodes[0][1];
                        whereNode = [ "Not", whereNode ];
                        const convertReferencedFieldsToFields = n => {
                            n.forEach(((p, i) => {
                                Array.isArray(p) && ("ReferencedField" === p[0] ? n[i] = [ "Field", p[2] ] : convertReferencedFieldsToFields(p));
                            }));
                        };
                        convertReferencedFieldsToFields(whereNode);
                        const tableName = fromNode[1], sha = sbvrTypes.SHA.validateSync(`${tableName}$${JSON.stringify(ruleBody)}`).replace(/^\$sha256\$/, ""), table = _.find(abstractSqlModel.tables, (t => t.name === tableName));
                        if (table) {
                            null !== (_a = table.checks) && void 0 !== _a || (table.checks = []);
                            table.checks.push({
                                description: ruleSE,
                                name: `${tableName.slice(0, 30)}$${sha}`.slice(0, 63),
                                abstractSql: whereNode
                            });
                            return;
                        }
                    }
                }
            }
            return rule;
        })).filter((v => null != v));
        return abstractSqlModel;
    };
    exports.optimizeSchema = optimizeSchema;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.getModifiedFields = exports.getRuleReferencedFields = exports.getReferencedFields = void 0;
    const _ = __webpack_require__(0), AbstractSQLCompiler_1 = __webpack_require__(23), AbstractSQLOptimiser_1 = __webpack_require__(36), getScope = (rulePart, scope) => {
        scope = {
            ...scope
        };
        const fromNodes = undefined;
        rulePart.filter(AbstractSQLCompiler_1.isFromNode).forEach((node => {
            const nested = node[1];
            if ("Alias" === nested[0]) {
                const [, from, alias] = nested;
                if ("string" != typeof alias) throw new Error("Cannot handle non-string aliases");
                switch (from[0]) {
                  case "Table":
                    scope[alias] = from[1];
                    break;

                  case "SelectQuery":
                    scope[alias] = "";
                    break;

                  default:
                    throw new Error(`Cannot handle aliased ${from[0]} nodes`);
                }
            } else {
                if ("Table" !== nested[0]) throw Error(`Unsupported FromNode for scoping: ${nested[0]}`);
                scope[nested[1]] = nested[1];
            }
        }));
        return scope;
    }, $getReferencedFields = (referencedFields, rulePart, scope = {}) => {
        if (Array.isArray(rulePart)) switch (rulePart[0]) {
          case "SelectQuery":
            scope = getScope(rulePart, scope);
            rulePart.forEach((node => {
                $getReferencedFields(referencedFields, node, scope);
            }));
            break;

          case "ReferencedField":
            let tableName = rulePart[1];
            const fieldName = rulePart[2];
            if ("string" != typeof tableName || "string" != typeof fieldName) throw new Error(`Invalid ReferencedField: ${rulePart}`);
            tableName = scope[tableName];
            if ("" !== tableName) {
                null == referencedFields[tableName] && (referencedFields[tableName] = []);
                referencedFields[tableName].push(fieldName);
            }
            return;

          case "Field":
            throw new Error("Cannot find queried fields for unreferenced fields");

          default:
            rulePart.forEach((node => {
                $getReferencedFields(referencedFields, node, scope);
            }));
        }
    }, getReferencedFields = ruleBody => {
        ruleBody = AbstractSQLOptimiser_1.AbstractSQLOptimiser(ruleBody);
        const referencedFields = {};
        $getReferencedFields(referencedFields, ruleBody);
        return _.mapValues(referencedFields, _.uniq);
    };
    exports.getReferencedFields = getReferencedFields;
    const dealiasTableNode = n => AbstractSQLCompiler_1.isTableNode(n) ? n : "Alias" === n[0] && AbstractSQLCompiler_1.isTableNode(n[1]) ? n[1] : void 0, getRuleReferencedFields = ruleBody => {
        ruleBody = AbstractSQLOptimiser_1.AbstractSQLOptimiser(ruleBody);
        let referencedFields = {};
        const deletable = new Set;
        if ("NotExists" === ruleBody[0]) {
            const s = ruleBody[1];
            "SelectQuery" === s[0] && s.forEach((m => {
                if (!AbstractSQLCompiler_1.isFromNode(m)) return;
                const table = dealiasTableNode(m[1]);
                null != table && deletable.add(table[1]);
            }));
        }
        $getReferencedFields(referencedFields, ruleBody);
        referencedFields = _.mapValues(referencedFields, _.uniq);
        const refFields = {};
        for (const f of Object.keys(referencedFields)) {
            refFields[f] = {
                create: referencedFields[f],
                update: referencedFields[f],
                delete: referencedFields[f]
            };
            if (deletable.has(f)) {
                const countFroms = n => {
                    let count = 0;
                    n.forEach((p => {
                        var _a;
                        Array.isArray(p) && (AbstractSQLCompiler_1.isFromNode(p) && (null === (_a = dealiasTableNode(p[1])) || void 0 === _a ? void 0 : _a[1]) === f ? count++ : count += countFroms(p));
                    }));
                    return count;
                };
                1 === countFroms(ruleBody) && (refFields[f].delete = []);
            }
        }
        return refFields;
    };
    exports.getRuleReferencedFields = getRuleReferencedFields;
    const checkQuery = query => {
        const queryType = query[0];
        if (![ "InsertQuery", "UpdateQuery", "DeleteQuery" ].includes(queryType)) return;
        const froms = query.filter(AbstractSQLCompiler_1.isFromNode);
        if (1 !== froms.length) return;
        const table = froms[0][1];
        let tableName;
        if ("Table" === table[0]) tableName = table[1]; else {
            if ("string" != typeof table) return;
            tableName = table;
        }
        if ("InsertQuery" === queryType) return {
            table: tableName,
            action: "create"
        };
        if ("DeleteQuery" === queryType) return {
            table: tableName,
            action: "delete"
        };
        const fields = undefined;
        return {
            table: tableName,
            action: "update",
            fields: _(query).filter((v => null != v && "Fields" === v[0])).flatMap((v => v[1])).value()
        };
    }, getModifiedFields = abstractSqlQuery => Array.isArray(abstractSqlQuery[0]) ? abstractSqlQuery.map(checkQuery) : checkQuery(abstractSqlQuery);
    exports.getModifiedFields = getModifiedFields;
}, function(module) {
    module.exports = JSON.parse('{"_from":"@balena/abstract-sql-compiler@7.10.1","_id":"@balena/abstract-sql-compiler@7.10.1","_inBundle":false,"_integrity":"sha512-DbjntMafMU4gyApmpdt9KHJglkRLR8YFaZT4rRdMICV79wxtwj9uli3mK2uP3+GVEROZOVaTtBPTkwS4SEJhVQ==","_location":"/@balena/abstract-sql-compiler","_phantomChildren":{},"_requested":{"type":"version","registry":true,"raw":"@balena/abstract-sql-compiler@7.10.1","name":"@balena/abstract-sql-compiler","escapedName":"@balena%2fabstract-sql-compiler","scope":"@balena","rawSpec":"7.10.1","saveSpec":null,"fetchSpec":"7.10.1"},"_requiredBy":["#USER","/"],"_resolved":"https://registry.npmjs.org/@balena/abstract-sql-compiler/-/abstract-sql-compiler-7.10.1.tgz","_shasum":"d93e6320b98ec2424300322222bf523dc548c07f","_spec":"@balena/abstract-sql-compiler@7.10.1","_where":"C:\\\\Users\\\\pjgaz\\\\Documents\\\\Development\\\\pinejs\\\\pinejs","author":"","bugs":{"url":"https://github.com/balena-io-modules/abstract-sql-compiler/issues"},"bundleDependencies":false,"dependencies":{"@balena/sbvr-types":"^3.1.3","@types/lodash":"^4.14.168","@types/node":"^10.17.51","lodash":"^4.17.20"},"deprecated":false,"description":"A translator for abstract sql into sql.","devDependencies":{"@balena/lf-to-abstract-sql":"^4.1.1","@balena/lint":"^5.4.0","@balena/odata-parser":"^2.2.2","@balena/sbvr-parser":"^1.1.1","@resin/odata-to-abstract-sql":"^3.3.0","@types/chai":"^4.2.14","@types/common-tags":"^1.8.0","@types/mocha":"^8.2.0","chai":"^4.2.0","common-tags":"^1.8.0","husky":"^4.3.8","lint-staged":"^10.5.3","mocha":"^8.2.1","require-npm4-to-publish":"^1.0.0","ts-node":"^9.1.1","typescript":"^4.1.3"},"homepage":"https://github.com/balena-io-modules/abstract-sql-compiler#readme","husky":{"hooks":{"pre-commit":"lint-staged"}},"lint-staged":{"*.js":["balena-lint --typescript --fix"],"*.ts":["balena-lint --typescript --fix"]},"main":"out/AbstractSQLCompiler.js","mocha":{"reporter":"spec","recursive":true,"require":"ts-node/register/transpile-only","bail":true,"_":["test/**/*.ts","test/**/*.js"]},"name":"@balena/abstract-sql-compiler","repository":{"type":"git","url":"git+https://github.com/balena-io-modules/abstract-sql-compiler.git"},"scripts":{"lint":"balena-lint --typescript --fix -e js -e ts src/ test/ && tsc --noEmit && tsc --noEmit --project tsconfig.js.json","posttest":"npm run lint","prepare":"tsc --project ./tsconfig.build.json","prepublish":"require-npm4-to-publish","pretest":"npm run prepare","test":"mocha"},"types":"out/AbstractSQLCompiler.d.ts","version":"7.10.1"}');
}, function(module, exports, __webpack_require__) {
    const {LF2AbstractSQLPrep: LF2AbstractSQLPrep} = __webpack_require__(118), {LF2AbstractSQL: LF2AbstractSQL} = __webpack_require__(121);
    module.exports = {
        LF2AbstractSQLPrep: LF2AbstractSQLPrep,
        LF2AbstractSQL: LF2AbstractSQL,
        translate: function(lf, types) {
            lf = LF2AbstractSQLPrep.match(lf, "Process");
            var translator = LF2AbstractSQL.createInstance();
            translator.addTypes(types);
            return translator.match(lf, "Process");
        },
        createTranslator: function(types) {
            var translator = LF2AbstractSQL.createInstance();
            translator.addTypes(types);
            return function(lf) {
                lf = LF2AbstractSQLPrep.match(lf, "Process");
                translator.reset();
                return translator.match(lf, "Process");
            };
        }
    };
}, function(module, exports, __webpack_require__) {
    var OMeta = __webpack_require__(9), SBVRCompilerLibs = __webpack_require__(51).SBVRCompilerLibs, LFOptimiser = __webpack_require__(119).LFOptimiser, LF2AbstractSQLPrep = exports.LF2AbstractSQLPrep = LFOptimiser._extend({
        AttrConceptType: function(termName) {
            var $elf = this, _fromIdx = this.input.idx, conceptType;
            conceptType = LFOptimiser._superApplyWithArgs(this, "AttrConceptType", termName);
            this._opt((function() {
                this._pred(!1 === this.primitives[termName] && !1 !== this.primitives[conceptType]);
                this.primitives[conceptType] = !1;
                return this._apply("SetHelped");
            }));
            return conceptType;
        },
        AttrDatabaseAttribute: function(termOrFactType) {
            var $elf = this, _fromIdx = this.input.idx, attrVal, newAttrVal;
            attrVal = this.anything();
            newAttrVal = "Term" == termOrFactType[0] && (!this.attributes.hasOwnProperty(termOrFactType[3]) || !0 === this.attributes[termOrFactType[3]]) || "FactType" == termOrFactType[0] && 4 == termOrFactType.length && (!this.attributes.hasOwnProperty(termOrFactType[3]) || !0 === this.attributes[termOrFactType[3]]) && this.primitives.hasOwnProperty(termOrFactType[3]) && !1 !== this.primitives[termOrFactType[3]];
            this.attributes[termOrFactType] = newAttrVal;
            this._opt((function() {
                this._pred(newAttrVal != attrVal);
                return this._apply("SetHelped");
            }));
            return newAttrVal;
        },
        AttrDatabasePrimitive: function(termOrFactType) {
            var $elf = this, _fromIdx = this.input.idx, attrVal, newAttrVal;
            attrVal = this.anything();
            newAttrVal = attrVal;
            this._opt((function() {
                this._pred(this.primitives.hasOwnProperty(termOrFactType));
                newAttrVal = this.primitives[termOrFactType];
                this._pred(newAttrVal != attrVal);
                return this._apply("SetHelped");
            }));
            this.primitives[termOrFactType] = newAttrVal;
            return newAttrVal;
        },
        AttrTermForm: function(factType) {
            var $elf = this, _fromIdx = this.input.idx;
            this.termForms[factType] = !0;
            return this.anything();
        },
        UniversalQuantification: function() {
            var $elf = this, _fromIdx = this.input.idx, v, xs;
            v = this._applyWithArgs("token", "Variable");
            xs = this._many((function() {
                return this._apply("trans");
            }));
            this._apply("SetHelped");
            return [ "LogicalNegation", [ "ExistentialQuantification", v, [ "LogicalNegation" ].concat(xs) ] ];
        },
        AtMostNQuantification: function() {
            var $elf = this, _fromIdx = this.input.idx, maxCard, v, xs;
            maxCard = this._applyWithArgs("token", "MaximumCardinality");
            v = this._applyWithArgs("token", "Variable");
            xs = this._many((function() {
                return this._apply("trans");
            }));
            this._apply("SetHelped");
            maxCard[1][1]++;
            return [ "LogicalNegation", [ "AtLeastNQuantification", [ "MinimumCardinality", maxCard[1] ], v ].concat(xs) ];
        },
        CardinalityOptimisation2: function(v1) {
            var $elf = this, _fromIdx = this.input.idx, actualFactType, atomicForm, card, factType, required, v2;
            this._pred(3 == v1.length);
            required = this._or((function() {
                this._form((function() {
                    this._applyWithArgs("exactly", "ExactQuantification");
                    card = this._applyWithArgs("token", "Cardinality");
                    this._pred(1 == card[1][1]);
                    v2 = this._applyWithArgs("token", "Variable");
                    return atomicForm = this._applyWithArgs("token", "AtomicFormulation");
                }));
                return !0;
            }), (function() {
                this._form((function() {
                    this._applyWithArgs("exactly", "AtMostNQuantification");
                    card = this._applyWithArgs("token", "MaximumCardinality");
                    this._pred(1 == card[1][1]);
                    v2 = this._applyWithArgs("token", "Variable");
                    return atomicForm = this._applyWithArgs("token", "AtomicFormulation");
                }));
                return !1;
            }));
            this._apply("end");
            this._pred(3 == v2.length);
            factType = atomicForm[1];
            this._pred(!this.termForms[factType]);
            this._pred(4 == atomicForm.length && 4 == factType.length);
            actualFactType = this._applyWithArgs("UnmappedFactType", factType.slice(1));
            actualFactType = [ "FactType" ].concat(actualFactType);
            this._or((function() {
                this._pred(this.IdentifiersEqual(v1[2], actualFactType[1]) && this.IdentifiersEqual(v2[2], actualFactType[3]));
                return this.foreignKeys[actualFactType] = required;
            }), (function() {
                this._pred(this.IdentifiersEqual(v1[2], actualFactType[3]) && this.IdentifiersEqual(v2[2], actualFactType[1]));
                return this.uniqueKeys[actualFactType] = required;
            }));
            return this._apply("SetHelped");
        },
        CardinalityOptimisation: function() {
            var $elf = this, _fromIdx = this.input.idx, v1;
            return this._form((function() {
                switch (this.anything()) {
                  case "LogicalNegation":
                    return this._form((function() {
                        this._applyWithArgs("exactly", "ExistentialQuantification");
                        v1 = this._applyWithArgs("token", "Variable");
                        return this._form((function() {
                            this._applyWithArgs("exactly", "LogicalNegation");
                            return this._applyWithArgs("CardinalityOptimisation2", v1);
                        }));
                    }));

                  case "UniversalQuantification":
                    v1 = this._applyWithArgs("token", "Variable");
                    return this._applyWithArgs("CardinalityOptimisation2", v1);

                  default:
                    throw this._fail();
                }
            }));
        },
        NecessityOptimisation: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._apply("CardinalityOptimisation");
        },
        ObligationOptimisation: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._apply("CardinalityOptimisation");
        },
        Rule: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._or((function() {
                this._form((function() {
                    switch (this.anything()) {
                      case "NecessityFormulation":
                        return this._apply("NecessityOptimisation");

                      case "ObligationFormulation":
                        return this._apply("ObligationOptimisation");

                      default:
                        throw this._fail();
                    }
                }));
                this._applyWithArgs("token", "StructuredEnglish");
                return null;
            }), (function() {
                return LFOptimiser._superApply(this, "Rule");
            }));
        }
    });
    LF2AbstractSQLPrep.initialize = function() {
        Object.assign(this, SBVRCompilerLibs);
        SBVRCompilerLibs.initialize.call(this);
        LFOptimiser.initialize.call(this);
        this.foreignKeys = {};
        this.uniqueKeys = {};
        this.primitives = {};
        this.attributes = {};
        this.termForms = {};
    };
    LF2AbstractSQLPrep.defaultAttributes = function(termOrFactType, attrsFound, attrs) {
        switch (termOrFactType[0]) {
          case "Name":
          case "Term":
            if (!this.IsPrimitive(termOrFactType) && !attrsFound.hasOwnProperty("DatabaseIDField")) {
                attrs.splice(1, 0, [ "DatabaseIDField", "id" ]);
                this.SetHelped();
            }
            if (!attrsFound.hasOwnProperty("ReferenceScheme")) {
                attrs.splice(1, 0, [ "ReferenceScheme", "id" ]);
                this.SetHelped();
            }
            if (!attrsFound.hasOwnProperty("DatabaseTableName")) {
                var tableName = this.GetResourceName(termOrFactType[1]);
                attrs.splice(1, 0, [ "DatabaseTableName", tableName ]);
                this.SetHelped();
            }
            if (!attrsFound.hasOwnProperty("DatabasePrimitive")) {
                this.primitives.hasOwnProperty(termOrFactType) || (this.primitives[termOrFactType] = this.IsPrimitive(termOrFactType));
                attrs.splice(1, 0, [ "DatabasePrimitive", this.primitives[termOrFactType] ]);
                this.SetHelped();
            }
            break;

          case "FactType":
            var actualFactType = this.UnmappedFactType(termOrFactType.slice(1));
            actualFactType = [ "FactType" ].concat(actualFactType);
            if (!this.IsPrimitive(actualFactType[1])) {
                if (!attrsFound.hasOwnProperty("DatabaseIDField")) {
                    attrs.splice(1, 0, [ "DatabaseIDField", "id" ]);
                    this.SetHelped();
                }
                if (!attrsFound.hasOwnProperty("DatabaseTableName")) {
                    var tableName = this.GetResourceName(actualFactType.slice(1));
                    attrs.splice(1, 0, [ "DatabaseTableName", tableName ]);
                    this.SetHelped();
                }
                if (this.uniqueKeys.hasOwnProperty(actualFactType)) if (attrsFound.hasOwnProperty("Unique")) {
                    if (attrsFound.Unique != this.uniqueKeys[actualFactType]) {
                        console.error(attrsFound.Unique, this.uniqueKeys[actualFactType]);
                        ___MISMATCHED_UNIQUE_KEY___.die();
                    }
                } else {
                    attrs.splice(1, 0, [ "Unique", this.uniqueKeys[actualFactType] ]);
                    this.SetHelped();
                }
                if (this.foreignKeys.hasOwnProperty(actualFactType)) {
                    if (!attrsFound.hasOwnProperty("DatabaseAttribute")) {
                        attrs.splice(1, 0, [ "DatabaseAttribute", !1 ]);
                        this.SetHelped();
                    }
                    if (attrsFound.hasOwnProperty("ForeignKey")) {
                        if (attrsFound.ForeignKey != this.foreignKeys[actualFactType]) {
                            console.error(attrsFound.ForeignKey, this.foreignKeys[actualFactType]);
                            ___MISMATCHED_FOREIGN_KEY___.die();
                        }
                    } else {
                        attrs.splice(1, 0, [ "ForeignKey", this.foreignKeys[actualFactType] ]);
                        this.SetHelped();
                    }
                }
                if (3 == actualFactType.length) {
                    this.primitives.hasOwnProperty(actualFactType[1]) && !1 === this.primitives[actualFactType[1]] || this.SetHelped();
                    this.primitives[actualFactType[1]] = !1;
                } else if (actualFactType.length > 4) for (var i = 1; i < actualFactType.length; i += 2) {
                    this.attributes.hasOwnProperty(actualFactType[i]) && !1 === this.attributes[actualFactType[i]] || this.SetHelped();
                    this.attributes[actualFactType[i]] = !1;
                }
            }
        }
        termOrFactType.push(attrs);
    };
}, function(module, exports, __webpack_require__) {
    var OMeta = __webpack_require__(9), LFValidator = __webpack_require__(120).LFValidator, LFOptimiser;
    (exports.LFOptimiser = LFValidator._extend({
        Helped: function() {
            var $elf = this, _fromIdx = this.input.idx;
            this._pred(!0 === this.helped);
            return this.helped = !1;
        },
        SetHelped: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this.helped = !0;
        },
        Process: function() {
            var $elf = this, _fromIdx = this.input.idx, x;
            x = this.anything();
            x = this._applyWithArgs("trans", x);
            this._many((function() {
                this._applyWithArgs("Helped", "disableMemoisation");
                return this._or((function() {
                    return x = this._applyWithArgs("trans", x);
                }), (function() {
                    console.error("Failed to reprocess?!");
                    return this._pred(!1);
                }));
            }));
            return x;
        },
        AtLeastNQuantification: function() {
            var $elf = this, _fromIdx = this.input.idx, i, v, xs;
            return this._or((function() {
                i = this._applyWithArgs("token", "MinimumCardinality");
                this._pred(1 == i[1][1]);
                v = this._applyWithArgs("token", "Variable");
                xs = this._many((function() {
                    return this._apply("trans");
                }));
                this._apply("SetHelped");
                return [ "ExistentialQuantification", v ].concat(xs);
            }), (function() {
                return LFValidator._superApply(this, "AtLeastNQuantification");
            }));
        },
        NumericalRangeQuantification: function() {
            var $elf = this, _fromIdx = this.input.idx, i, j, v, xs;
            return this._or((function() {
                i = this._applyWithArgs("token", "MinimumCardinality");
                j = this._applyWithArgs("token", "MaximumCardinality");
                this._pred(i[1][1] == j[1][1]);
                v = this._applyWithArgs("token", "Variable");
                xs = this._many((function() {
                    return this._apply("trans");
                }));
                this._apply("SetHelped");
                return [ "ExactQuantification", [ "Cardinality", i[1] ], v ].concat(xs);
            }), (function() {
                return LFValidator._superApply(this, "NumericalRangeQuantification");
            }));
        },
        LogicalNegation: function() {
            var $elf = this, _fromIdx = this.input.idx, xs;
            return this._or((function() {
                this._form((function() {
                    this._applyWithArgs("exactly", "LogicalNegation");
                    return xs = this._apply("trans");
                }));
                this._apply("SetHelped");
                return xs;
            }), (function() {
                return LFValidator._superApply(this, "LogicalNegation");
            }));
        },
        ExactQuantification: function() {
            var $elf = this, _fromIdx = this.input.idx, i, v, xs;
            return this._or((function() {
                i = this._applyWithArgs("token", "Cardinality");
                v = this._applyWithArgs("token", "Variable");
                xs = this._many((function() {
                    return this._apply("trans");
                }));
                this._pred(0 === i[1][1]);
                this._apply("SetHelped");
                return [ "LogicalNegation", [ "ExistentialQuantification", v ].concat(xs) ];
            }), (function() {
                return LFValidator._superApply(this, "ExactQuantification");
            }));
        }
    })).initialize = function() {
        LFValidator.initialize.call(this);
        this._didSomething = !1;
    };
}, function(module, exports, __webpack_require__) {
    var OMeta = __webpack_require__(9), SBVRLibs = __webpack_require__(37).SBVRLibs, LFValidator = exports.LFValidator = SBVRLibs._extend({
        trans: function() {
            var $elf = this, _fromIdx = this.input.idx, a, t;
            this._form((function() {
                t = this.anything();
                return a = this._applyWithArgs("apply", t);
            }));
            return a;
        },
        token: function(x) {
            var $elf = this, _fromIdx = this.input.idx, a, t;
            this._form((function() {
                t = this.anything();
                this._pred(t == x);
                return a = this._applyWithArgs("apply", x);
            }));
            return a;
        },
        letters: function() {
            var $elf = this, _fromIdx = this.input.idx, l;
            l = this._many1((function() {
                return this._apply("letter");
            }));
            this._many((function() {
                return this._apply("space");
            }));
            return l.join("");
        },
        Number: function() {
            var $elf = this, _fromIdx = this.input.idx, n;
            n = this._apply("number");
            this._pred(!isNaN(n));
            return [ "Number", parseInt(n, 10) ];
        },
        Model: function() {
            var $elf = this, _fromIdx = this.input.idx, x, xs;
            xs = [];
            this._many((function() {
                x = this._or((function() {
                    return this._applyWithArgs("token", "Vocabulary");
                }), (function() {
                    return this._applyWithArgs("token", "Term");
                }), (function() {
                    return this._applyWithArgs("token", "Name");
                }), (function() {
                    return this._applyWithArgs("token", "FactType");
                }), (function() {
                    return this._applyWithArgs("token", "Rule");
                }));
                return this._opt((function() {
                    this._pred(null != x);
                    return xs.push(x);
                }));
            }));
            return [ "Model" ].concat(xs);
        },
        FactType: function() {
            var $elf = this, _fromIdx = this.input.idx, attrs, factType, identifier, verb;
            factType = [];
            this._many((function() {
                identifier = this._or((function() {
                    return this._applyWithArgs("token", "Term");
                }), (function() {
                    return this._applyWithArgs("token", "Name");
                }));
                verb = this._applyWithArgs("token", "Verb");
                return factType = factType.concat([ identifier, verb ]);
            }));
            this._opt((function() {
                identifier = this._or((function() {
                    return this._applyWithArgs("token", "Term");
                }), (function() {
                    return this._applyWithArgs("token", "Name");
                }));
                return factType.push(identifier);
            }));
            this._opt((function() {
                return this._lookahead((function() {
                    attrs = this.anything();
                    return this._applyWithArgs("AddFactType", factType, factType);
                }));
            }));
            return this._applyWithArgs("addAttributes", [ "FactType" ].concat(factType));
        },
        Vocabulary: function() {
            var $elf = this, _fromIdx = this.input.idx, vocab;
            vocab = this.anything();
            this._applyWithArgs("AddVocabulary", vocab, vocab);
            return this._applyWithArgs("addAttributes", [ "Vocabulary", vocab ]);
        },
        Term: function() {
            var $elf = this, _fromIdx = this.input.idx, data, term, vocab;
            term = this.anything();
            vocab = this.anything();
            return this._or((function() {
                data = this._or((function() {
                    return this._applyWithArgs("token", "Number");
                }), (function() {
                    return this._apply("Value");
                }));
                return [ "Term", term, vocab, data ];
            }), (function() {
                return this._applyWithArgs("addAttributes", [ "Term", term, vocab ]);
            }));
        },
        Name: function() {
            var $elf = this, _fromIdx = this.input.idx, name, vocab;
            name = this.anything();
            vocab = this.anything();
            return this._applyWithArgs("addAttributes", [ "Name", name, vocab ]);
        },
        Verb: function() {
            var $elf = this, _fromIdx = this.input.idx, negated, v;
            return [ "Verb", v = this.anything(), negated = this._or((function() {
                return this._apply("true");
            }), (function() {
                return this._apply("false");
            })) ];
        },
        Disjunction: function() {
            var $elf = this, _fromIdx = this.input.idx, xs;
            xs = this._many((function() {
                return this._apply("trans");
            }));
            return [ "Disjunction" ].concat(xs);
        },
        Conjunction: function() {
            var $elf = this, _fromIdx = this.input.idx, xs;
            xs = this._many((function() {
                return this._apply("trans");
            }));
            return [ "Conjunction" ].concat(xs);
        },
        Rule: function() {
            var $elf = this, _fromIdx = this.input.idx, t, x;
            return [ "Rule", x = this._or((function() {
                return this._applyWithArgs("token", "ObligationFormulation");
            }), (function() {
                return this._applyWithArgs("token", "NecessityFormulation");
            }), (function() {
                return this._applyWithArgs("token", "PossibilityFormulation");
            }), (function() {
                return this._applyWithArgs("token", "PermissibilityFormulation");
            })), t = this._applyWithArgs("token", "StructuredEnglish") ];
        },
        addAttributes: function(termOrFactType) {
            var $elf = this, _fromIdx = this.input.idx, attrName, attrVal, attrs, attrsFound;
            this._or((function() {
                return this._apply("end");
            }), (function() {
                attrsFound = {};
                attrs = [ "Attributes" ];
                this._form((function() {
                    this._applyWithArgs("exactly", "Attributes");
                    this._many((function() {
                        return this._form((function() {
                            attrName = this.anything();
                            attrVal = this._applyWithArgs("ApplyFirstExisting", [ "Attr" + attrName, "DefaultAttr" ], [ termOrFactType ]);
                            return this._opt((function() {
                                this._pred(null != attrVal);
                                attrsFound[attrName] = attrVal;
                                return attrs.push([ attrName, attrVal ]);
                            }));
                        }));
                    }));
                    return this._apply("end");
                }));
                return this._applyWithArgs("defaultAttributes", termOrFactType, attrsFound, attrs);
            }));
            return termOrFactType;
        },
        DefaultAttr: function(tableID) {
            var $elf = this, _fromIdx = this.input.idx;
            return this.anything();
        },
        AttrConceptType: function(termOrFactType) {
            var $elf = this, _fromIdx = this.input.idx, conceptType, term, vocab;
            term = this._form((function() {
                this._applyWithArgs("exactly", "Term");
                conceptType = this.anything();
                return vocab = this.anything();
            }));
            this.vocabularies[this.currentVocabulary].ConceptTypes[termOrFactType] = term;
            return term;
        },
        AttrDefinition: function(termOrFactType) {
            var $elf = this, _fromIdx = this.input.idx, values;
            return this._or((function() {
                return this._form((function() {
                    this._applyWithArgs("exactly", "Enum");
                    return values = this._many1((function() {
                        return this.anything();
                    }));
                }));
            }), (function() {
                return this._apply("trans");
            }));
        },
        AttrNecessity: function(termOrFactType) {
            var $elf = this, _fromIdx = this.input.idx;
            return this._or((function() {
                return this._applyWithArgs("token", "Rule");
            }), (function() {
                return this._apply("DefaultAttr");
            }));
        },
        AttrSynonymousForm: function(factType) {
            var $elf = this, _fromIdx = this.input.idx, synForm;
            synForm = this.anything();
            this._applyWithArgs("AddFactType", synForm, factType.slice(1));
            return synForm;
        },
        StructuredEnglish: function() {
            var $elf = this, _fromIdx = this.input.idx, a;
            return [ "StructuredEnglish", a = this.anything() ];
        },
        ObligationFormulation: function() {
            var $elf = this, _fromIdx = this.input.idx, xs;
            xs = this._many((function() {
                return this._apply("trans");
            }));
            return [ "ObligationFormulation" ].concat(xs);
        },
        NecessityFormulation: function() {
            var $elf = this, _fromIdx = this.input.idx, xs;
            xs = this._many((function() {
                return this._apply("trans");
            }));
            return [ "NecessityFormulation" ].concat(xs);
        },
        PossibilityFormulation: function() {
            var $elf = this, _fromIdx = this.input.idx, xs;
            xs = this._many((function() {
                return this._apply("trans");
            }));
            return [ "PossibilityFormulation" ].concat(xs);
        },
        PermissibilityFormulation: function() {
            var $elf = this, _fromIdx = this.input.idx, xs;
            xs = this._many((function() {
                return this._apply("trans");
            }));
            return [ "PermissibilityFormulation" ].concat(xs);
        },
        LogicalNegation: function() {
            var $elf = this, _fromIdx = this.input.idx, xs;
            xs = this._apply("trans");
            return [ "LogicalNegation" ].concat([ xs ]);
        },
        quant: function() {
            var $elf = this, _fromIdx = this.input.idx, x;
            return this._or((function() {
                return this._applyWithArgs("token", "Disjunction");
            }), (function() {
                return this._applyWithArgs("token", "Conjunction");
            }), (function() {
                return this._applyWithArgs("token", "UniversalQuantification");
            }), (function() {
                return this._applyWithArgs("token", "ExistentialQuantification");
            }), (function() {
                return this._applyWithArgs("token", "ExactQuantification");
            }), (function() {
                return this._applyWithArgs("token", "AtMostNQuantification");
            }), (function() {
                return this._applyWithArgs("token", "AtLeastNQuantification");
            }), (function() {
                return this._applyWithArgs("token", "NumericalRangeQuantification");
            }), (function() {
                this._form((function() {
                    this._applyWithArgs("exactly", "LogicalNegation");
                    return x = this._apply("quant");
                }));
                return [ "LogicalNegation", x ];
            }));
        },
        UniversalQuantification: function() {
            var $elf = this, _fromIdx = this.input.idx, v, xs;
            v = this._applyWithArgs("token", "Variable");
            xs = this._many((function() {
                return this._apply("trans");
            }));
            return [ "UniversalQuantification", v ].concat(xs);
        },
        ExistentialQuantification: function() {
            var $elf = this, _fromIdx = this.input.idx, v, xs;
            v = this._applyWithArgs("token", "Variable");
            xs = this._many((function() {
                return this._apply("trans");
            }));
            return [ "ExistentialQuantification", v ].concat(xs);
        },
        ExactQuantification: function() {
            var $elf = this, _fromIdx = this.input.idx, i, v, xs;
            i = this._applyWithArgs("token", "Cardinality");
            v = this._applyWithArgs("token", "Variable");
            xs = this._many((function() {
                return this._apply("trans");
            }));
            return [ "ExactQuantification", i, v ].concat(xs);
        },
        AtMostNQuantification: function() {
            var $elf = this, _fromIdx = this.input.idx, a, v, xs;
            a = this._applyWithArgs("token", "MaximumCardinality");
            v = this._applyWithArgs("token", "Variable");
            xs = this._many((function() {
                return this._apply("trans");
            }));
            return [ "AtMostNQuantification", a, v ].concat(xs);
        },
        AtLeastNQuantification: function() {
            var $elf = this, _fromIdx = this.input.idx, i, v, xs;
            i = this._applyWithArgs("token", "MinimumCardinality");
            v = this._applyWithArgs("token", "Variable");
            xs = this._many((function() {
                return this._apply("trans");
            }));
            return [ "AtLeastNQuantification", i, v ].concat(xs);
        },
        NumericalRangeQuantification: function() {
            var $elf = this, _fromIdx = this.input.idx, a, i, v, xs;
            i = this._applyWithArgs("token", "MinimumCardinality");
            a = this._applyWithArgs("token", "MaximumCardinality");
            v = this._applyWithArgs("token", "Variable");
            xs = this._many((function() {
                return this._apply("trans");
            }));
            return [ "NumericalRangeQuantification", i, a, v ].concat(xs);
        },
        Cardinality: function() {
            var $elf = this, _fromIdx = this.input.idx, n;
            return [ "Cardinality", n = this._applyWithArgs("token", "Number") ];
        },
        MinimumCardinality: function() {
            var $elf = this, _fromIdx = this.input.idx, n;
            return [ "MinimumCardinality", n = this._applyWithArgs("token", "Number") ];
        },
        MaximumCardinality: function() {
            var $elf = this, _fromIdx = this.input.idx, n;
            return [ "MaximumCardinality", n = this._applyWithArgs("token", "Number") ];
        },
        Variable: function() {
            var $elf = this, _fromIdx = this.input.idx, num, term, w;
            num = this._applyWithArgs("token", "Number");
            term = this._applyWithArgs("token", "Term");
            w = this._many((function() {
                return this._or((function() {
                    return this._applyWithArgs("token", "AtomicFormulation");
                }), (function() {
                    return this._apply("quant");
                }));
            }));
            return [ "Variable", num, term ].concat(w);
        },
        Real: function() {
            var $elf = this, _fromIdx = this.input.idx, num;
            num = this._apply("number");
            this._pred(!isNaN(num));
            return [ "Real", num ];
        },
        Integer: function() {
            var $elf = this, _fromIdx = this.input.idx, num;
            num = this._apply("number");
            this._pred(!isNaN(num));
            return [ "Integer", num ];
        },
        Text: function() {
            var $elf = this, _fromIdx = this.input.idx, text;
            return [ "Text", text = this.anything() ];
        },
        Value: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._or((function() {
                return this._applyWithArgs("token", "Real");
            }), (function() {
                return this._applyWithArgs("token", "Integer");
            }), (function() {
                return this._applyWithArgs("token", "Text");
            }));
        },
        RoleBinding: function() {
            var $elf = this, _fromIdx = this.input.idx, bindIdentifier, identifier;
            return [ "RoleBinding", identifier = this._or((function() {
                return this._applyWithArgs("token", "Term");
            }), (function() {
                return this._applyWithArgs("token", "Name");
            })), bindIdentifier = this._or((function() {
                return this._apply("number");
            }), (function() {
                return this._apply("Value");
            }), (function() {
                return this._applyWithArgs("token", "Name");
            })) ];
        },
        AtomicFormulation: function() {
            var $elf = this, _fromIdx = this.input.idx, b, f;
            f = this._applyWithArgs("token", "FactType");
            b = this._many((function() {
                return this._applyWithArgs("token", "RoleBinding");
            }));
            return [ "AtomicFormulation", f ].concat(b);
        }
    });
    LFValidator.initialize = function() {
        SBVRLibs.initialize.call(this);
    };
    LFValidator.defaultAttributes = function(termOrVerb, attrsFound, attrs) {
        termOrVerb.push(attrs);
    };
}, function(module, exports, __webpack_require__) {
    var OMeta = __webpack_require__(9), SBVRCompilerLibs = __webpack_require__(51).SBVRCompilerLibs, _ = __webpack_require__(0), updateModifiedAt = {
        type: "trigger",
        body: 'NEW."modified at" = NOW();\nRETURN NEW;',
        language: "plpgsql"
    }, LINK_RESOLVE_QUEUED = !0, LINK_RESOLVE_DONE = !1, LF2AbstractSQL = exports.LF2AbstractSQL = SBVRCompilerLibs._extend({
        Number: function() {
            var $elf = this, _fromIdx = this.input.idx, num;
            this._form((function() {
                this._applyWithArgs("exactly", "Number");
                num = this._apply("number");
                return this._pred(!isNaN(num));
            }));
            return num;
        },
        Real: function() {
            var $elf = this, _fromIdx = this.input.idx, num;
            this._form((function() {
                this._applyWithArgs("exactly", "Real");
                num = this._apply("number");
                return this._pred(!isNaN(num));
            }));
            return [ "Real", num ];
        },
        Integer: function() {
            var $elf = this, _fromIdx = this.input.idx, num;
            this._form((function() {
                this._applyWithArgs("exactly", "Integer");
                num = this._apply("number");
                return this._pred(!isNaN(num));
            }));
            return [ "Integer", num ];
        },
        Text: function() {
            var $elf = this, _fromIdx = this.input.idx, text;
            this._form((function() {
                this._applyWithArgs("exactly", "Text");
                return text = this.anything();
            }));
            return [ "Text", text ];
        },
        Value: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._or((function() {
                return this._apply("Real");
            }), (function() {
                return this._apply("Integer");
            }), (function() {
                return this._apply("Text");
            }));
        },
        Identifier: function() {
            var $elf = this, _fromIdx = this.input.idx, name, num, type, vocab;
            this._form((function() {
                type = function() {
                    switch (this.anything()) {
                      case "Name":
                        return "Name";

                      case "Term":
                        return "Term";

                      default:
                        throw this._fail();
                    }
                }.call(this);
                name = this.anything();
                vocab = this.anything();
                return this._opt((function() {
                    return this._or((function() {
                        return num = this._apply("Number");
                    }), (function() {
                        return this._apply("Value");
                    }));
                }));
            }));
            return {
                type: type,
                name: name,
                num: num,
                vocab: vocab
            };
        },
        IdentifierName: function() {
            var $elf = this, _fromIdx = this.input.idx, identifierName, resourceName;
            identifierName = this.anything();
            resourceName = this._applyWithArgs("GetResourceName", identifierName);
            this._or((function() {
                return this._pred(!this.tables.hasOwnProperty(resourceName));
            }), (function() {
                console.error("We already have an identifier with a name of: " + identifierName);
                return this._pred(!1);
            }));
            this._applyWithArgs("CreateTable", resourceName, identifierName);
            return identifierName;
        },
        Attributes: function(termOrFactType) {
            var $elf = this, _fromIdx = this.input.idx, attrOrder, attributeName, attributeVals, attributes;
            return this._or((function() {
                return this._apply("end");
            }), (function() {
                this._form((function() {
                    this._applyWithArgs("exactly", "Attributes");
                    attributes = {};
                    return this._many((function() {
                        this._form((function() {
                            attributeName = this.anything();
                            return attributeVals = this._many((function() {
                                return this.anything();
                            }));
                        }));
                        return attributes[attributeName] = attributeVals;
                    }));
                }));
                attrOrder = [ "DatabaseTableName", "DatabaseIDField", "DatabasePrimitive", "TermForm", "ConceptType", "SynonymousForm", "Synonym", "ReferenceScheme", "ForeignKey", "Attribute", "Unique" ];
                return function() {
                    attrOrder.forEach((function(attributeName) {
                        attributes.hasOwnProperty(attributeName) && $elf._applyWithArgs.apply($elf, [ "Attr" + attributeName, termOrFactType ].concat(attributes[attributeName]));
                    }));
                    return _(attributes).omit(attrOrder).each((function(attributeVals, attributeName) {
                        $elf._applyWithArgs.apply($elf, [ "ApplyFirstExisting", [ "Attr" + attributeName, "DefaultAttr" ], [ termOrFactType ].concat(attributeVals) ]);
                    }));
                }.call(this);
            }));
        },
        DefaultAttr: function(termOrFactType) {
            var $elf = this, _fromIdx = this.input.idx;
            return this.anything();
        },
        AttrConceptType: function(termOrFactType) {
            var $elf = this, _fromIdx = this.input.idx, conceptTable, conceptTerm, conceptType, dataType, fieldID, identifierTable, primitive, references, vocab;
            conceptTerm = this._form((function() {
                this._applyWithArgs("exactly", "Term");
                conceptType = this.anything();
                return vocab = this.anything();
            }));
            (function() {
                this.termForms[termOrFactType] && (termOrFactType = this.termForms[termOrFactType]);
            }).call(this);
            this.vocabularies[termOrFactType[2]].ConceptTypes[termOrFactType] = conceptTerm;
            primitive = this._applyWithArgs("IsPrimitive", conceptTerm);
            conceptTable = this._applyWithArgs("GetTable", conceptType);
            identifierTable = this._applyWithArgs("GetTable", termOrFactType[1]);
            this._or((function() {
                this._pred(!1 !== primitive && conceptType === primitive);
                dataType = primitive;
                this._opt((function() {
                    this._pred(identifierTable.hasOwnProperty("referenceScheme"));
                    fieldID = this._applyWithArgs("GetTableFieldID", identifierTable, identifierTable.referenceScheme);
                    this._pred(!1 !== fieldID);
                    return identifierTable.fields.splice(fieldID, 1);
                }));
                return identifierTable.referenceScheme = conceptType;
            }), (function() {
                dataType = "ConceptType";
                return references = this._applyWithArgs("GetReference", conceptTable);
            }));
            this._applyWithArgs("AddTableField", identifierTable, conceptType, dataType, !0, null, references);
            return this._applyWithArgs("AddRelationship", identifierTable, [ [ "Verb", "has" ], conceptTerm ], conceptType, references);
        },
        AttrDatabaseIDField: function(termOrFactType) {
            var $elf = this, _fromIdx = this.input.idx, fieldID, idField, table, tableID;
            idField = this.anything();
            tableID = this._applyWithArgs("GetTableID", termOrFactType);
            table = this._applyWithArgs("GetTable", tableID);
            return this._or((function() {
                return this._pred("string" == typeof table);
            }), (function() {
                fieldID = this._applyWithArgs("AddTableField", table, idField, "Serial", !0, "PRIMARY KEY");
                this._opt((function() {
                    this._pred(!1 !== fieldID);
                    return table.fields[fieldID].index = "PRIMARY KEY";
                }));
                return table.idField = idField;
            }));
        },
        AttrReferenceScheme: function(termOrFactType) {
            var $elf = this, _fromIdx = this.input.idx, fieldID, referenceScheme, table, tableID;
            referenceScheme = this.anything();
            referenceScheme = this._or((function() {
                this._pred(Array.isArray(referenceScheme));
                return referenceScheme[1];
            }), (function() {
                return referenceScheme;
            }));
            tableID = this._applyWithArgs("GetTableID", termOrFactType);
            table = this._applyWithArgs("GetTable", tableID);
            return this._or((function() {
                return this._pred("string" == typeof table);
            }), (function() {
                this._opt((function() {
                    this._pred(table.hasOwnProperty("referenceScheme"));
                    fieldID = this._applyWithArgs("GetTableFieldID", table, table.referenceScheme);
                    this._pred(!1 !== fieldID);
                    return table.fields[fieldID].fieldName = referenceScheme;
                }));
                return table.referenceScheme = referenceScheme;
            }));
        },
        AttrDatabaseTableName: function(termOrFactType) {
            var $elf = this, _fromIdx = this.input.idx, baseTable, fieldName, linkResourceName, references, table, tableID, tableName;
            tableName = this.anything();
            tableID = this._applyWithArgs("GetTableID", termOrFactType);
            table = this._applyWithArgs("GetTable", tableID);
            this._or((function() {
                return this._pred("string" == typeof table);
            }), (function() {
                return table.name = tableName;
            }));
            return this._opt((function() {
                this._pred(Array.isArray(termOrFactType[0]) && termOrFactType.length > 2);
                linkResourceName = this._applyWithArgs("GetResourceName", termOrFactType);
                baseTable = this._applyWithArgs("GetTable", termOrFactType[0][1]);
                fieldName = this._applyWithArgs("FactTypeFieldName", [ [ "Term", linkResourceName ], [ "Verb", "has" ], termOrFactType[0] ]);
                references = this._applyWithArgs("GetReference", table, fieldName);
                this._applyWithArgs("AddRelationship", baseTable, termOrFactType.slice(1), baseTable.idField, references, !0);
                return this._applyWithArgs("AddRelationship", baseTable, termOrFactType, baseTable.idField, references, !0);
            }));
        },
        AttrDatabasePrimitive: function(termOrFactType) {
            var $elf = this, _fromIdx = this.input.idx, attrVal, tableID;
            attrVal = this.anything();
            tableID = this._applyWithArgs("GetTableID", termOrFactType);
            return this.GetTable(tableID).primitive = attrVal;
        },
        AttrDatabaseAttribute: function(factType) {
            var $elf = this, _fromIdx = this.input.idx, attrVal, attributeTable, baseTable, fieldID, fieldName, linkResourceName;
            attrVal = this.anything();
            return this._opt((function() {
                this._pred(attrVal);
                this.attributes[factType] = attrVal;
                linkResourceName = this._applyWithArgs("GetResourceName", factType);
                delete this.relationships[linkResourceName];
                this.tables[linkResourceName] = "Attribute";
                baseTable = this._applyWithArgs("GetTable", factType[0][1]);
                fieldName = this._applyWithArgs("FactTypeFieldName", factType);
                attributeTable = this._applyWithArgs("GetTable", factType[2][1]);
                fieldID = this._applyWithArgs("GetTableFieldID", baseTable, fieldName);
                baseTable.fields[fieldID].dataType = attributeTable.primitive;
                this._applyWithArgs("AddRelationship", baseTable, factType, fieldName);
                return this._applyWithArgs("AddRelationship", baseTable, factType.slice(1), fieldName);
            }));
        },
        AttrForeignKey: function(factType) {
            var $elf = this, _fromIdx = this.input.idx, baseTable, factTypeResourceName, fieldID, fkName, fkTable, foreignTerm, index, linkResourceName, references, required;
            required = this.anything();
            baseTable = this._applyWithArgs("GetTable", factType[0][1]);
            foreignTerm = factType[2][1];
            fkName = this._applyWithArgs("FactTypeFieldName", factType);
            fkTable = this._applyWithArgs("GetTable", foreignTerm);
            this._opt((function() {
                this._pred(baseTable.idField == fkName);
                fieldID = this._applyWithArgs("GetTableFieldID", baseTable, fkName);
                this._pred(!1 !== fieldID);
                index = baseTable.fields[fieldID].index;
                return baseTable.fields.splice(fieldID, 1);
            }));
            references = this._applyWithArgs("GetReference", fkTable);
            fieldID = this._applyWithArgs("AddTableField", baseTable, fkName, "ForeignKey", required, index, references);
            this._applyWithArgs("AddRelationship", baseTable, factType.slice(1), fkName, references);
            factTypeResourceName = this._applyWithArgs("GetResourceName", factType);
            _.forEach($elf.synonymousForms[factTypeResourceName], (function(synForm) {
                if (0 === $elf.MappedFactType(synForm)[0][3]) $elf.AddRelationship(baseTable, synForm.slice(1), fkName, references); else {
                    var synResourceName = $elf.GetResourceName(synForm[0][1]), reverseReferences = $elf.GetReference(baseTable, fkName);
                    $elf.AddRelationship(synResourceName, synForm.slice(1), references.fieldName, reverseReferences);
                }
            }));
            this._opt((function() {
                this._pred(fieldID);
                return baseTable.fields[fieldID].required = required;
            }));
            linkResourceName = this._applyWithArgs("GetResourceName", factType);
            delete this.relationships[linkResourceName];
            return this.tables[linkResourceName] = "ForeignKey";
        },
        AttrUnique: function(factType) {
            var $elf = this, _fromIdx = this.input.idx, baseTable, fieldID, required, uniqueField;
            required = this.anything();
            baseTable = this._applyWithArgs("GetTable", factType);
            this._opt((function() {
                this._pred("Attribute" === baseTable || "ForeignKey" === baseTable);
                return baseTable = this._applyWithArgs("GetTable", factType[0][1]);
            }));
            uniqueField = this._applyWithArgs("FactTypeFieldName", factType);
            fieldID = this._applyWithArgs("GetTableFieldID", baseTable, uniqueField);
            this._pred(!1 !== fieldID);
            return baseTable.fields[fieldID].index = "UNIQUE";
        },
        AttrSynonym: function(term) {
            var $elf = this, _fromIdx = this.input.idx, synonym;
            synonym = this.anything();
            return this.synonyms[synonym[1]] = term[1];
        },
        AttrSynonymousForm: function(factType) {
            var $elf = this, _fromIdx = this.input.idx, fieldName, fkTable, fromTable, linkRef, linkTable, references, resourceName, synForm;
            synForm = this.anything();
            this._applyWithArgs("AddFactType", synForm, factType);
            return this._or((function() {
                return this._pred(this.IsPrimitive(factType[0]) || this.IsPrimitive(synForm[0]));
            }), (function() {
                resourceName = this._applyWithArgs("GetResourceName", factType);
                (function() {
                    null == this.synonymousForms[resourceName] && (this.synonymousForms[resourceName] = []);
                    return this.synonymousForms[resourceName].push(synForm);
                }).call(this);
                fieldName = this._applyWithArgs("FactTypeFieldName", factType);
                return this._or((function() {
                    this._pred(2 == factType.length);
                    resourceName = this._applyWithArgs("GetResourceName", factType[0][1]);
                    return this._applyWithArgs("AddRelationship", resourceName, synForm.slice(1), fieldName);
                }), (function() {
                    fkTable = this._applyWithArgs("GetTable", synForm[2][1]);
                    references = this._opt((function() {
                        this._pred(!fkTable.primitive);
                        return this._applyWithArgs("GetReference", fkTable);
                    }));
                    this._applyWithArgs("AddRelationship", resourceName, synForm.slice(1), synForm[2][1], references);
                    return this._opt((function() {
                        this._pred(references);
                        linkTable = this._applyWithArgs("GetTable", factType);
                        fromTable = this._applyWithArgs("GetTable", synForm[0][1]);
                        linkRef = this._applyWithArgs("GetReference", linkTable, fieldName);
                        return this._applyWithArgs("AddRelationship", fromTable, synForm.slice(1), references.fieldName, linkRef);
                    }));
                }));
            }));
        },
        AttrTermForm: function(factType) {
            var $elf = this, _fromIdx = this.input.idx, linkResourceName, linkTable, termForm;
            termForm = this.anything();
            linkResourceName = this._applyWithArgs("GetResourceName", factType);
            linkTable = this._applyWithArgs("GetTable", factType);
            return function() {
                var linkVerb;
                this.termForms[factType] = termForm;
                this.synonyms[termForm[1]] = linkResourceName;
                for (var i = 0; i < factType.length; i++) if ("Term" === factType[i][0]) {
                    var hasFactType = [ termForm, [ "Verb", "has", !1 ], factType[i] ], extraFactType = [ termForm, linkVerb || [ "Verb", "has" ], factType[i] ];
                    this.AddFactType(hasFactType, extraFactType);
                    linkVerb && "has" !== linkVerb[1] && this.AddFactType(extraFactType, extraFactType);
                    var termTable = this.GetTable(factType[i][1]);
                    if (termTable.primitive) this.tables[this.GetResourceName(extraFactType)] = "Attribute"; else {
                        this.tables[this.GetResourceName(extraFactType)] = "ForeignKey";
                        var fieldName = this.FactTypeFieldName(extraFactType), references = this.GetReference(linkTable, fieldName);
                        this.AddRelationship(termTable, [ [ "Verb", "has" ], termForm ], termTable.idField, references);
                    }
                } else "Verb" === factType[i][0] && (linkVerb = factType[i]);
            }.call(this);
        },
        AttrNecessity: function(tableID) {
            var $elf = this, _fromIdx = this.input.idx;
            return this._apply("Rule");
        },
        AttrDefinition: function(factType) {
            var $elf = this, _fromIdx = this.input.idx, baseTable, checks, fieldID, uniqueField, values;
            return this._or((function() {
                this._form((function() {
                    this._applyWithArgs("exactly", "Enum");
                    return values = this._many1((function() {
                        return this._apply("Value");
                    }));
                }));
                baseTable = this._applyWithArgs("GetTable", factType);
                this._opt((function() {
                    this._pred("Attribute" === baseTable || "ForeignKey" === baseTable);
                    return baseTable = this._applyWithArgs("GetTable", factType[0][1]);
                }));
                this._pred(baseTable);
                uniqueField = this._applyWithArgs("FactTypeFieldName", factType);
                fieldID = this._applyWithArgs("GetTableFieldID", baseTable, uniqueField);
                this._pred(!1 !== fieldID);
                return (checks = baseTable.fields[fieldID].checks = baseTable.fields[fieldID].checks || []).push([ "In", [ "Field", baseTable.fields[fieldID].fieldName ] ].concat(values));
            }), (function() {
                return this.anything();
            }));
        },
        FactType: function() {
            var $elf = this, _fromIdx = this.input.idx, attributes, factType, factTypePart, fieldID, fieldName, fkTable, identifier, identifierTable, linkHasFactType, linkTable, linkVerb, linkVerbFactType, negated, references, resourceName, uniqueFields, verb;
            this._lookahead((function() {
                return factType = this._many1((function() {
                    factTypePart = this.anything();
                    this._lookahead((function() {
                        return attributes = this.anything();
                    }));
                    return factTypePart;
                }));
            }));
            this._applyWithArgs("AddFactType", factType, factType);
            this._or((function() {
                this._pred(this.IsPrimitive(factType[0]));
                return this._many1((function() {
                    factTypePart = this.anything();
                    return this._lookahead((function() {
                        return attributes = this.anything();
                    }));
                }));
            }), (function() {
                resourceName = this._applyWithArgs("GetResourceName", factType);
                return this._or((function() {
                    this._pred(2 == factType.length);
                    this._many1((function() {
                        factTypePart = this.anything();
                        return this._lookahead((function() {
                            return attributes = this.anything();
                        }));
                    }));
                    identifierTable = this._applyWithArgs("GetTable", factType[0][1]);
                    fieldName = this._applyWithArgs("FactTypeFieldName", factType);
                    this._applyWithArgs("AddTableField", identifierTable, fieldName, "Boolean", !0);
                    delete this.relationships[resourceName];
                    this.tables[resourceName] = "BooleanAttribute";
                    return this._applyWithArgs("AddRelationship", identifierTable, factType.slice(1), fieldName);
                }), (function() {
                    linkTable = this._applyWithArgs("CreateTable", resourceName, _(factType).map(1).join(" "));
                    uniqueFields = [];
                    this._many1((function() {
                        return this._or((function() {
                            identifier = this._apply("Identifier");
                            linkHasFactType = [ [ "Term", resourceName ], [ "Verb", "has" ], [ "Term", identifier.name ] ];
                            linkVerbFactType = [ [ "Term", resourceName ], linkVerb, [ "Term", identifier.name ] ];
                            fieldName = this._or((function() {
                                this._pred(linkVerb);
                                return this._applyWithArgs("FactTypeFieldName", linkVerbFactType);
                            }), (function() {
                                return this._applyWithArgs("FactTypeFieldName", linkHasFactType);
                            }));
                            uniqueFields.push(fieldName);
                            fkTable = this._applyWithArgs("GetTable", identifier.name);
                            references = this._or((function() {
                                this._pred(fkTable.primitive);
                                this._applyWithArgs("AddTableField", linkTable, fieldName, fkTable.primitive, !0);
                                return null;
                            }), (function() {
                                references = this._applyWithArgs("GetReference", fkTable);
                                fieldID = this._applyWithArgs("AddTableField", linkTable, fieldName, "ForeignKey", !0, null, references);
                                return references;
                            }));
                            this._applyWithArgs("AddRelationship", resourceName, linkHasFactType.slice(2), fieldName, references);
                            return this._opt((function() {
                                this._pred(linkVerb);
                                return this._applyWithArgs("AddRelationship", resourceName, linkVerbFactType.slice(1), fieldName, references);
                            }));
                        }), (function() {
                            this._form((function() {
                                this._applyWithArgs("exactly", "Verb");
                                verb = this.anything();
                                return negated = this.anything();
                            }));
                            return linkVerb = [ "Verb", verb ];
                        }));
                    }));
                    return linkTable.indexes.push({
                        type: "UNIQUE",
                        fields: uniqueFields
                    });
                }));
            }));
            return factType;
        },
        Cardinality: function() {
            var $elf = this, _fromIdx = this.input.idx, cardinality;
            this._form((function() {
                (function() {
                    switch (this.anything()) {
                      case "Cardinality":
                        return "Cardinality";

                      case "MaximumCardinality":
                        return "MaximumCardinality";

                      case "MinimumCardinality":
                        return "MinimumCardinality";

                      default:
                        throw this._fail();
                    }
                }).call(this);
                return cardinality = this._apply("Number");
            }));
            return cardinality;
        },
        Variable: function() {
            var $elf = this, _fromIdx = this.input.idx, bind, checkConceptTypeResolver, identifier, num, query, selectBody, varNum, whereBody;
            this._form((function() {
                this._applyWithArgs("exactly", "Variable");
                num = this._apply("Number");
                identifier = this._apply("Identifier");
                query = this._or((function() {
                    bind = this.bindAttributes[num];
                    this._pred(bind);
                    return [ "SelectQuery", [ "Select", [ selectBody = _.clone(bind.binding) ] ] ];
                }), (function() {
                    varNum = "." + num;
                    query = [ "SelectQuery", [ "Select", [] ] ];
                    checkConceptTypeResolver = this._applyWithArgs("CreateConceptTypesResolver", query, identifier, varNum);
                    return query;
                }));
                return this._opt((function() {
                    checkConceptTypeResolver && checkConceptTypeResolver();
                    whereBody = this._apply("RulePart");
                    return this._applyWithArgs("AddWhereClause", query, whereBody);
                }));
            }));
            this._opt((function() {
                checkConceptTypeResolver && checkConceptTypeResolver();
                whereBody = this._apply("RulePart");
                return this._applyWithArgs("AddWhereClause", query, whereBody);
            }));
            return this._or((function() {
                this._pred(selectBody && !query.some((function(p) {
                    return "From" === p[0];
                })));
                this._opt((function() {
                    whereBody = query.find((function(part) {
                        return "Where" === part[0];
                    }));
                    this._pred(whereBody);
                    return selectBody.whereBody = whereBody[1];
                }));
                return selectBody;
            }), (function() {
                return query;
            }));
        },
        RoleBindings: function(actualFactType) {
            var $elf = this, _fromIdx = this.input.idx, binds;
            binds = [];
            (function() {
                for (var i = 0; i < actualFactType.length; i += 2) {
                    var j = actualFactType.findIndex((function(p) {
                        return p[3] === i;
                    }));
                    binds[j / 2] = this.RoleBinding(actualFactType[j][1]);
                }
            }).call(this);
            this._apply("end");
            return binds;
        },
        RoleBinding: function(baseTermName) {
            var $elf = this, _fromIdx = this.input.idx, baseBind, binding, conceptTypeResolver, data, identifier, number;
            this._form((function() {
                this._applyWithArgs("exactly", "RoleBinding");
                identifier = this._apply("Identifier");
                return this._or((function() {
                    return number = this._apply("number");
                }), (function() {
                    return data = this._apply("Value");
                }), (function() {
                    return this._applyWithArgs("NativeNameBinding", baseTermName);
                }));
            }));
            baseBind = this.bindAttributes[number];
            binding = this._or((function() {
                this._pred(data);
                return data;
            }), (function() {
                this._pred(baseBind);
                return baseBind.binding;
            }), (function() {
                conceptTypeResolver = this.conceptTypeResolvers[identifier.name + "." + number];
                return [ "ReferencedField", baseTermName + "." + number, identifier.name ];
            }));
            return {
                identifier: identifier,
                number: number,
                data: data,
                binding: binding,
                used: function() {
                    conceptTypeResolver && conceptTypeResolver(baseTermName);
                }
            };
        },
        NativeNameBinding: function(baseTermName) {
            var $elf = this, _fromIdx = this.input.idx, name;
            name = this._apply("Identifier");
            this._pred("Name" === name.type);
            this._pred(this.IsPrimitive(this.ReconstructIdentifier(name)));
            this._pred(this.sbvrTypes[baseTermName] && this.sbvrTypes[baseTermName].nativeNames && this.sbvrTypes[baseTermName].nativeNames[name.name]);
            return this.sbvrTypes[baseTermName].nativeNames[name.name];
        },
        NativeProperty: function(actualFactType) {
            var $elf = this, _fromIdx = this.input.idx, binds, negated, operator, primitive, property, verb;
            this._pred(this.IsPrimitive(actualFactType[0]));
            this._pred(this.IsPrimitive(actualFactType[2]));
            binds = this._applyWithArgs("RoleBindings", actualFactType);
            negated = actualFactType[1][2];
            operator = this._or((function() {
                this._pred(negated);
                return "NotEquals";
            }), (function() {
                return "Equals";
            }));
            this._pred(2 == binds.length);
            primitive = actualFactType[0][1];
            verb = actualFactType[1][1];
            property = actualFactType[2][1];
            this._pred(this.sbvrTypes[primitive] && this.sbvrTypes[primitive].nativeProperties && this.sbvrTypes[primitive].nativeProperties[verb] && this.sbvrTypes[primitive].nativeProperties[verb][property]);
            return [ operator, [ "Boolean", !0 ], [ "Boolean", !0 ] ];
        },
        NativeFactType: function(actualFactType) {
            var $elf = this, _fromIdx = this.input.idx, binds, comparison, negated, primitive, secondPrimitive, verb;
            this._pred(3 == actualFactType.length);
            this._pred(this.IsPrimitive(actualFactType[0]));
            this._pred(this.IsPrimitive(actualFactType[2]));
            return this._or((function() {
                binds = this._applyWithArgs("RoleBindings", actualFactType);
                this._pred(2 == binds.length);
                primitive = actualFactType[0][1];
                verb = actualFactType[1][1];
                secondPrimitive = actualFactType[2][1];
                this._pred(this.sbvrTypes[primitive] && this.sbvrTypes[primitive].nativeFactTypes && this.sbvrTypes[primitive].nativeFactTypes[secondPrimitive] && this.sbvrTypes[primitive].nativeFactTypes[secondPrimitive][verb]);
                comparison = this.sbvrTypes[primitive].nativeFactTypes[secondPrimitive][verb](binds[0].binding, binds[1].binding);
                negated = actualFactType[1][2];
                return this._or((function() {
                    this._pred(negated);
                    return [ "Not", comparison ];
                }), (function() {
                    return comparison;
                }));
            }), (function() {
                return this._applyWithArgs("foreign", ___NativeFactTypeMatchingFailed___, "die");
            }));
        },
        LinkTableAlias: function() {
            var $elf = this, _fromIdx = this.input.idx, bindNumbers, binding, factType, identifierName, identifierType, mapping, partAlias, verb, vocab;
            this._form((function() {
                return bindNumbers = this._many1((function() {
                    return (binding = this.anything()).number;
                }));
            }));
            this._form((function() {
                return factType = this._many((function() {
                    this._form((function() {
                        return partAlias = this._or((function() {
                            switch (this.anything()) {
                              case "Verb":
                                verb = this.anything();
                                this.anything();
                                return verb;

                              default:
                                throw this._fail();
                            }
                        }), (function() {
                            identifierType = this.anything();
                            identifierName = this.anything();
                            vocab = this.anything();
                            mapping = this._opt((function() {
                                return this.anything();
                            }));
                            return identifierName + "." + bindNumbers.shift();
                        }));
                    }));
                    return partAlias;
                }));
            }));
            return factType.join("-");
        },
        LinkTable: function(actualFactType) {
            var $elf = this, _fromIdx = this.input.idx, binds, linkTable, query, tableAlias;
            binds = this._applyWithArgs("RoleBindings", actualFactType);
            tableAlias = this._applyWithArgs("LinkTableAlias", binds, actualFactType);
            linkTable = this._applyWithArgs("GetTable", actualFactType);
            query = [ "SelectQuery", [ "Select", [] ], [ "From", [ linkTable.name, tableAlias ] ] ];
            binds.forEach((function(bind, i) {
                var baseIdentifierName = actualFactType[2 * i][1];
                if (!$elf.GetTable(baseIdentifierName).primitive) {
                    var relationships = $elf.relationships[linkTable.resourceName];
                    $elf.ResolveSynonym(baseIdentifierName).split("-").forEach((function(partName) {
                        relationships = relationships[partName];
                    }));
                    var relationshipMapping = relationships.$;
                    $elf.CreateLinkTableResolver(query, tableAlias, bind, relationshipMapping);
                }
            }));
            return [ "Exists", query ];
        },
        ForeignKey: function(actualFactType) {
            var $elf = this, _fromIdx = this.input.idx, bindFrom, bindTo, binds, fieldName, tableTo;
            this._pred("ForeignKey" == this.GetTable(actualFactType));
            this._or((function() {
                binds = this._applyWithArgs("RoleBindings", actualFactType);
                this._pred(2 == binds.length);
                bindFrom = binds[0];
                bindTo = binds[1];
                fieldName = this._applyWithArgs("FactTypeFieldName", actualFactType);
                return tableTo = this._applyWithArgs("GetTable", actualFactType[2][1]);
            }), (function() {
                return this._applyWithArgs("foreign", ___ForeignKeyMatchingFailed___, "die");
            }));
            (function() {
                bindFrom.used();
                return bindTo.used();
            }).call(this);
            return [ "Equals", [ "ReferencedField", bindFrom.binding[1], fieldName ], [ "ReferencedField", bindTo.binding[1], tableTo.idField ] ];
        },
        BooleanAttribute: function(actualFactType) {
            var $elf = this, _fromIdx = this.input.idx, attributeName, binds, negated;
            this._pred("BooleanAttribute" == this.GetTable(actualFactType));
            this._or((function() {
                binds = this._applyWithArgs("RoleBindings", actualFactType);
                this._pred(1 == binds.length);
                attributeName = this._applyWithArgs("FactTypeFieldName", actualFactType);
                return negated = actualFactType[1][2];
            }), (function() {
                console.error(this.input);
                return this._applyWithArgs("foreign", ___BooleanAttributeMatchingFailed___, "die");
            }));
            binds[0].used();
            return [ "Equals", [ "ReferencedField", binds[0].binding[1], attributeName ], [ "Boolean", !negated ] ];
        },
        Attribute: function(actualFactType) {
            var $elf = this, _fromIdx = this.input.idx, bind, bindAttr, bindReal, binds, negated, operator;
            this._pred("Attribute" == this.GetTable(actualFactType));
            this._or((function() {
                binds = this._applyWithArgs("RoleBindings", actualFactType);
                this._pred(2 == binds.length);
                bindReal = binds[0];
                return bindAttr = binds[1];
            }), (function() {
                return this._applyWithArgs("foreign", ___AttributeMatchingFailed___, "die");
            }));
            negated = actualFactType[1][2];
            operator = this._or((function() {
                this._pred(negated);
                return "NotEquals";
            }), (function() {
                return "Equals";
            }));
            return this._or((function() {
                bind = this.bindAttributes[bindAttr.number];
                (function() {
                    bindReal.used();
                    return bindAttr.binding = [ "ReferencedField", bindReal.binding[1], bind.binding[2] ];
                }).call(this);
                this._pred(!_.isEqual(bindAttr.binding, bind.binding));
                return [ operator, bindAttr.binding, bind.binding ];
            }), (function() {
                return [ operator, [ "Boolean", !0 ], [ "Boolean", !0 ] ];
            }));
        },
        AtomicFormulation: function() {
            var $elf = this, _fromIdx = this.input.idx, actualFactType, factType, whereClause;
            this._form((function() {
                this._applyWithArgs("exactly", "AtomicFormulation");
                this._form((function() {
                    this._applyWithArgs("exactly", "FactType");
                    return factType = this._many1((function() {
                        return this.anything();
                    }));
                }));
                actualFactType = this._applyWithArgs("MappedFactType", factType);
                return whereClause = this._or((function() {
                    return this._applyWithArgs("NativeProperty", actualFactType);
                }), (function() {
                    return this._applyWithArgs("NativeFactType", actualFactType);
                }), (function() {
                    return this._applyWithArgs("ForeignKey", actualFactType);
                }), (function() {
                    return this._applyWithArgs("BooleanAttribute", actualFactType);
                }), (function() {
                    return this._applyWithArgs("Attribute", actualFactType);
                }), (function() {
                    return this._applyWithArgs("LinkTable", actualFactType);
                }));
            }));
            return whereClause;
        },
        AtLeast: function() {
            var $elf = this, _fromIdx = this.input.idx, minCard, variable, where;
            this._form((function() {
                this._applyWithArgs("exactly", "AtLeastNQuantification");
                minCard = this._apply("Cardinality");
                return variable = this._apply("Variable");
            }));
            where = this._or((function() {
                this._pred(0 == minCard);
                return [ "Boolean", !0 ];
            }), (function() {
                this._pred("SelectQuery" == variable[0] && 0 == variable[1][1].length);
                variable[1][1].push([ "Count", "*" ]);
                return [ "GreaterThanOrEqual", variable, [ "Number", minCard ] ];
            }), (function() {
                this._pred(minCard > 1);
                return [ "Boolean", !1 ];
            }), (function() {
                return [ "Exists", variable ];
            }));
            return this._or((function() {
                this._pred(variable.whereBody);
                return [ "And", variable.whereBody, where ];
            }), (function() {
                return where;
            }));
        },
        Exactly: function() {
            var $elf = this, _fromIdx = this.input.idx, card, exists, variable, where;
            this._form((function() {
                this._applyWithArgs("exactly", "ExactQuantification");
                card = this._apply("Cardinality");
                return variable = this._apply("Variable");
            }));
            where = this._or((function() {
                this._pred("SelectQuery" == variable[0] && 0 == variable[1][1].length);
                variable[1][1].push([ "Count", "*" ]);
                return [ "Equals", variable, [ "Number", card ] ];
            }), (function() {
                exists = [ "Exists", variable ];
                return this._or((function() {
                    this._pred(0 == card);
                    return [ "Not", exists ];
                }), (function() {
                    this._pred(1 == card);
                    return exists;
                }), (function() {
                    return [ "Boolean", !1 ];
                }));
            }));
            return this._or((function() {
                this._pred(variable.whereBody);
                return [ "And", variable.whereBody, where ];
            }), (function() {
                return where;
            }));
        },
        Range: function() {
            var $elf = this, _fromIdx = this.input.idx, exists, maxCard, minCard, variable, where;
            this._form((function() {
                this._applyWithArgs("exactly", "NumericalRangeQuantification");
                minCard = this._apply("Cardinality");
                maxCard = this._apply("Cardinality");
                return variable = this._apply("Variable");
            }));
            where = this._or((function() {
                this._pred("SelectQuery" == variable[0] && 0 == variable[1][1].length);
                variable[1][1].push([ "Count", "*" ]);
                return [ "Between", variable, [ "Number", minCard ], [ "Number", maxCard ] ];
            }), (function() {
                exists = [ "Exists", variable ];
                return this._or((function() {
                    this._pred(0 == minCard);
                    return this._or((function() {
                        this._pred(0 == maxCard);
                        return [ "Not", exists ];
                    }), (function() {
                        return [ "Boolean", !0 ];
                    }));
                }), (function() {
                    this._pred(1 == minCard);
                    return exists;
                }), (function() {
                    return [ "Boolean", !1 ];
                }));
            }));
            return this._or((function() {
                this._pred(variable.whereBody);
                return [ "And", variable.whereBody, where ];
            }), (function() {
                return where;
            }));
        },
        Disjunction: function() {
            var $elf = this, _fromIdx = this.input.idx, first, rest;
            this._form((function() {
                this._applyWithArgs("exactly", "Disjunction");
                first = this._apply("RulePart");
                return rest = this._many1((function() {
                    return this._apply("RulePart");
                }));
            }));
            return [ "Or", first ].concat(rest);
        },
        Conjunction: function() {
            var $elf = this, _fromIdx = this.input.idx, first, rest;
            this._form((function() {
                this._applyWithArgs("exactly", "Conjunction");
                first = this._apply("RulePart");
                return rest = this._many1((function() {
                    return this._apply("RulePart");
                }));
            }));
            return [ "And", first ].concat(rest);
        },
        Exists: function() {
            var $elf = this, _fromIdx = this.input.idx, variable, where;
            this._form((function() {
                this._applyWithArgs("exactly", "ExistentialQuantification");
                return variable = this._apply("Variable");
            }));
            where = [ "Exists", variable ];
            return this._or((function() {
                this._pred(variable.whereBody);
                return [ "And", variable.whereBody, where ];
            }), (function() {
                return where;
            }));
        },
        Negation: function() {
            var $elf = this, _fromIdx = this.input.idx, whereBody;
            this._form((function() {
                this._applyWithArgs("exactly", "LogicalNegation");
                return whereBody = this._apply("RulePart");
            }));
            return [ "Not", whereBody ];
        },
        RulePart: function() {
            var $elf = this, _fromIdx = this.input.idx, x;
            return this._or((function() {
                return this._apply("AtomicFormulation");
            }), (function() {
                return this._apply("AtLeast");
            }), (function() {
                return this._apply("Exactly");
            }), (function() {
                return this._apply("Exists");
            }), (function() {
                return this._apply("Negation");
            }), (function() {
                return this._apply("Range");
            }), (function() {
                return this._apply("Disjunction");
            }), (function() {
                return this._apply("Conjunction");
            }), (function() {
                x = this.anything();
                console.error("Hit unhandled operation:", x);
                return this._pred(!1);
            }));
        },
        RuleBody: function() {
            var $elf = this, _fromIdx = this.input.idx, rule;
            this._form((function() {
                (function() {
                    switch (this.anything()) {
                      case "NecessityFormulation":
                        return "NecessityFormulation";

                      case "ObligationFormulation":
                        return "ObligationFormulation";

                      case "PermissibilityFormulation":
                        return "PermissibilityFormulation";

                      case "PossibilityFormulation":
                        return "PossibilityFormulation";

                      default:
                        throw this._fail();
                    }
                }).call(this);
                return rule = this._apply("RulePart");
            }));
            return rule;
        },
        ReconstructIdentifier: function(bindIdentifier) {
            var $elf = this, _fromIdx = this.input.idx;
            return [ bindIdentifier.type, bindIdentifier.name, bindIdentifier.vocab ];
        },
        ProcessAtomicFormulations: function() {
            var $elf = this, _fromIdx = this.input.idx;
            this.bindAttributes = [];
            this.bindAttributeDepth = [];
            this.nonPrimitiveExists = !1;
            this._lookahead((function() {
                return this._applyWithArgs("ProcessAtomicFormulationsRecurse", 0, "ProcessAtomicFormulationsAttributes");
            }));
            this._lookahead((function() {
                return this._applyWithArgs("ProcessAtomicFormulationsRecurse", 0, "ProcessAtomicFormulationsNonPrimitive");
            }));
            return this._lookahead((function() {
                return this._applyWithArgs("ProcessAtomicFormulationsRecurse", 0, "ProcessAtomicFormulationsNativeProperties");
            }));
        },
        ProcessAtomicFormulationsRecurse: function(depth, rule) {
            var $elf = this, _fromIdx = this.input.idx, actualFactType, factType, unmappedFactType;
            return this._many((function() {
                return this._or((function() {
                    this._pred(Array.isArray(this.input.hd));
                    return this._form((function() {
                        return this._or((function() {
                            switch (this.anything()) {
                              case "AtomicFormulation":
                                this._form((function() {
                                    this._applyWithArgs("exactly", "FactType");
                                    return factType = this._many1((function() {
                                        return this.anything();
                                    }));
                                }));
                                unmappedFactType = this._applyWithArgs("UnmappedFactType", factType);
                                actualFactType = this._applyWithArgs("MappedFactType", factType);
                                return this._applyWithArgs(rule, depth, unmappedFactType, actualFactType);

                              default:
                                throw this._fail();
                            }
                        }), (function() {
                            return this._applyWithArgs("ProcessAtomicFormulationsRecurse", depth + 1, rule);
                        }));
                    }));
                }), (function() {
                    return this.anything();
                }));
            }));
        },
        ProcessAtomicFormulationsNonPrimitive: function(depth, unmappedFactType, actualFactType) {
            var $elf = this, _fromIdx = this.input.idx, binds;
            binds = this._applyWithArgs("RoleBindings", actualFactType);
            return function() {
                for (var i = 0; i < binds.length; i++) if (!this.IsPrimitive(this.ReconstructIdentifier(binds[i].identifier))) {
                    this.nonPrimitiveExists = !0;
                    break;
                }
            }.call(this);
        },
        ProcessAtomicFormulationsAttributes: function(depth, unmappedFactType, actualFactType) {
            var $elf = this, _fromIdx = this.input.idx, attrBinding, attrFieldName, baseAttrFactType, baseBinding, binds, tableAlias;
            binds = this._applyWithArgs("RoleBindings", actualFactType);
            return this._or((function() {
                this._pred(this.attributes.hasOwnProperty(unmappedFactType) && this.attributes[unmappedFactType]);
                baseBinding = binds.find((function(bind) {
                    return !$elf.IsPrimitive($elf.ReconstructIdentifier(bind.identifier));
                }));
                attrBinding = binds.find((function(bind) {
                    return $elf.IsPrimitive($elf.ReconstructIdentifier(bind.identifier)) && (null == $elf.bindAttributeDepth[bind.number] || $elf.bindAttributeDepth[bind.number] > depth);
                }));
                (baseAttrFactType = _.cloneDeep(unmappedFactType))[2][1] = attrBinding.identifier.name;
                attrFieldName = this._applyWithArgs("FactTypeFieldName", baseAttrFactType);
                return function() {
                    this.bindAttributeDepth[attrBinding.number] = depth;
                    return this.bindAttributes[attrBinding.number] = {
                        binding: [ "ReferencedField", baseBinding.binding[1], attrFieldName ]
                    };
                }.call(this);
            }), (function() {
                this._pred(binds.some((function(bind) {
                    return !$elf.IsPrimitive($elf.ReconstructIdentifier(bind.identifier));
                })));
                tableAlias = this._applyWithArgs("LinkTableAlias", binds, actualFactType);
                return function() {
                    for (var i = 0; i < actualFactType.length; i += 2) {
                        var table = this.GetTable(actualFactType[i][1]), bindNumber = binds[i / 2].number;
                        if (table && table.primitive && (null == this.bindAttributeDepth[bindNumber] || this.bindAttributeDepth[bindNumber] > depth)) {
                            this.bindAttributeDepth[bindNumber] = depth;
                            this.bindAttributes[bindNumber] = {
                                binding: [ "ReferencedField", tableAlias, actualFactType[i][1] ]
                            };
                        }
                    }
                }.call(this);
            }));
        },
        ProcessAtomicFormulationsNativeProperties: function(depth, unmappedFactType, actualFactType) {
            var $elf = this, _fromIdx = this.input.idx, binding, binds, primitive, property, verb;
            binds = this._applyWithArgs("RoleBindings", actualFactType);
            this._pred(binds.every((function(bind) {
                return $elf.IsPrimitive($elf.ReconstructIdentifier(bind.identifier));
            })));
            this._pred(2 == binds.length);
            primitive = actualFactType[0][1];
            verb = actualFactType[1][1];
            property = actualFactType[2][1];
            this._pred(this.sbvrTypes[primitive] && this.sbvrTypes[primitive].nativeProperties && this.sbvrTypes[primitive].nativeProperties[verb] && this.sbvrTypes[primitive].nativeProperties[verb][property]);
            binding = this.sbvrTypes[primitive].nativeProperties[verb][property](binds[0].binding, binds[1].binding);
            return function() {
                this.bindAttributeDepth[binds[1].number] = depth;
                return this.bindAttributes[binds[1].number] = {
                    binding: binding
                };
            }.call(this);
        },
        Rule: function() {
            var $elf = this, _fromIdx = this.input.idx, ruleBody, ruleText;
            this._apply("ResetRuleState");
            return this._form((function() {
                this._applyWithArgs("exactly", "Rule");
                this._lookahead((function() {
                    return this._apply("ProcessAtomicFormulations");
                }));
                ruleBody = this._or((function() {
                    this._pred(this.nonPrimitiveExists);
                    return this._apply("RuleBody");
                }), (function() {
                    return this.anything();
                }));
                this._form((function() {
                    this._applyWithArgs("exactly", "StructuredEnglish");
                    return ruleText = this.anything();
                }));
                return this._opt((function() {
                    this._pred(this.nonPrimitiveExists);
                    return this.rules.push([ "Rule", [ "Body", ruleBody ], [ "StructuredEnglish", ruleText ] ]);
                }));
            }));
        },
        Process: function() {
            var $elf = this, _fromIdx = this.input.idx, attributes, factType, hasDependants, identifierName, type, vocab;
            this._form((function() {
                this._applyWithArgs("exactly", "Model");
                return this._many1((function() {
                    return this._or((function() {
                        return this._form((function() {
                            return this._or((function() {
                                switch (this.anything()) {
                                  case "Vocabulary":
                                    vocab = this.anything();
                                    return attributes = this.anything();

                                  default:
                                    throw this._fail();
                                }
                            }), (function() {
                                type = function() {
                                    switch (this.anything()) {
                                      case "Name":
                                        return "Name";

                                      case "Term":
                                        return "Term";

                                      default:
                                        throw this._fail();
                                    }
                                }.call(this);
                                identifierName = this._apply("IdentifierName");
                                vocab = this.anything();
                                this._applyWithArgs("AddVocabulary", vocab);
                                return this._applyWithArgs("Attributes", [ type, identifierName, vocab ]);
                            }), (function() {
                                switch (this.anything()) {
                                  case "FactType":
                                    factType = this._apply("FactType");
                                    return this._applyWithArgs("Attributes", factType);

                                  default:
                                    throw this._fail();
                                }
                            }));
                        }));
                    }), (function() {
                        return this._apply("Rule");
                    }));
                }));
            }));
            hasDependants = {};
            _.forEach(this.tables, (function(table) {
                _.forEach(table.fields, (function(field) {
                    "ForeignKey" !== field.dataType && "ConceptType" !== field.dataType || (hasDependants[field.references.resourceName] = !0);
                }));
            }));
            return {
                tables: _.omitBy(this.tables, (function(table, resourceName) {
                    return "string" == typeof table || table.primitive && !hasDependants[resourceName];
                })),
                functions: {
                    trigger_update_modified_at: updateModifiedAt
                },
                relationships: this.relationships,
                rules: this.rules,
                synonyms: this.synonyms
            };
        },
        GetReference: function(table, field) {
            var $elf = this, _fromIdx = this.input.idx;
            return {
                resourceName: table.resourceName,
                fieldName: field || table.idField
            };
        }
    });
    LF2AbstractSQL.CreateTable = function(resourceName, modelName) {
        var table = {
            fields: [],
            primitive: !1,
            name: null,
            indexes: [],
            idField: null,
            resourceName: resourceName,
            modelName: modelName,
            triggers: []
        };
        this.AddTableField(table, "created at", "Date Time", !0, null, null, "CURRENT_TIMESTAMP");
        this.AddTableField(table, "modified at", "Date Time", !0, null, null, "CURRENT_TIMESTAMP");
        this.AddTableTrigger(table, "BEFORE", "UPDATE", "ROW", "trigger_update_modified_at");
        return this.tables[resourceName] = table;
    };
    LF2AbstractSQL.AddTableTrigger = function(table, when, operation, level, fnName) {
        table.triggers.push({
            when: when,
            operation: operation,
            level: level,
            fnName: fnName
        });
    };
    LF2AbstractSQL.AddTableField = function(table, fieldName, dataType, required, index, references, defaultValue) {
        var fieldID = this.GetTableFieldID(table, fieldName);
        if (!1 === fieldID) {
            var f = {
                dataType: dataType,
                fieldName: fieldName,
                required: required
            };
            null != references && (f.references = references);
            null != index && (f.index = index);
            null != defaultValue && (f.defaultValue = defaultValue);
            table.fields.push(f);
        }
        return fieldID;
    };
    LF2AbstractSQL.AddRelationship = function(resourceName, factType, fieldName, references, forceHas) {
        var $elf = this;
        if (!0 !== forceHas && "has" === factType[0][1]) {
            var strippedFactType = _.clone(factType);
            strippedFactType.shift();
            this.AddRelationship(resourceName, strippedFactType, fieldName, references);
        }
        _.isObject(resourceName) && (resourceName = resourceName.resourceName);
        null == this.relationships[resourceName] && (this.relationships[resourceName] = {});
        var relationships = this.relationships[resourceName];
        _(factType).flatMap((function(factTypePart) {
            return $elf.ResolveSynonym(factTypePart[1]).split("-");
        })).each((function(partName) {
            null == relationships[partName] && (relationships[partName] = {});
            relationships = relationships[partName];
        }));
        var relationReference = [ fieldName ];
        null != references && relationReference.push([ references.resourceName, references.fieldName ]);
        relationships.$ = relationReference;
    };
    LF2AbstractSQL.FactTypeFieldName = function(factType) {
        if (factType.length > 3) throw new Error("Multiple term fact types are unsupported");
        return 2 === factType.length ? factType[1][1] : "has" === factType[1][1] ? factType[2][1] : factType[1][1] + "-" + factType[2][1];
    };
    LF2AbstractSQL.AddWhereClause = function(query, whereBody) {
        if (!_.isEqual(whereBody, [ "Equals", [ "Boolean", !0 ], [ "Boolean", !0 ] ])) if ("Exists" != whereBody[0] || "SelectQuery" != whereBody[1][0] && "InsertQuery" != whereBody[1][0] && "UpdateQuery" != whereBody[1][0] && "UpsertQuery" != whereBody[1][0]) {
            for (var i = 1; i < query.length; i++) if ("Where" == query[i][0]) {
                query[i][1] = [ "And", query[i][1], whereBody ];
                return;
            }
            query.push([ "Where", whereBody ]);
        } else {
            whereBody = whereBody[1].slice(1);
            for (var i = 0; i < whereBody.length; i++) "From" == whereBody[i][0] && query.push(whereBody[i]);
            for (var i = 0; i < whereBody.length; i++) "Where" == whereBody[i][0] && this.AddWhereClause(query, whereBody[i][1]);
        }
    };
    LF2AbstractSQL.CreateConceptTypesResolver = function(query, identifier, varNum) {
        var parentAlias = identifier.name + varNum, concept = this.ReconstructIdentifier(identifier), conceptTypeResolutions, $elf = this;
        if (this.conceptTypeResolvers[parentAlias]) throw new Error('Concept type resolver already added for "' + parentAlias + '"!');
        conceptTypeResolutions = [];
        var conceptTypeResolver = function(untilConcept) {
            var conceptTable, conceptAlias;
            if (0 === conceptTypeResolutions.length) {
                conceptTypeResolutions.push(identifier.name);
                query.push([ "From", [ this.GetTable(identifier.name).name, parentAlias ] ]);
                this.ResolveLinkTable(parentAlias);
            }
            if (!0 !== (parentAlias = _.last(conceptTypeResolutions)) && !conceptTypeResolutions.includes(untilConcept)) {
                for (;!1 !== (concept = this.FollowConceptType(concept)); ) {
                    conceptAlias = concept[1] + varNum;
                    if (!1 !== (conceptTable = this.GetTable(concept[1])).primitive) break;
                    query.push([ "From", [ conceptTable.name, conceptAlias ] ]);
                    this.AddWhereClause(query, [ "Equals", [ "ReferencedField", parentAlias, concept[1] ], [ "ReferencedField", conceptAlias, conceptTable.idField ] ]);
                    this.ResolveLinkTable(parentAlias);
                    parentAlias = conceptAlias;
                    conceptTypeResolutions.push(parentAlias);
                    if (null != untilConcept && !this.IdentifiersEqual(concept, untilConcept)) break;
                }
                !1 === concept && conceptTypeResolutions.push(!0);
            }
        }.bind(this);
        this.conceptTypeResolvers[parentAlias] = conceptTypeResolver;
        return function() {
            var next = $elf.input.head();
            next && "AtomicFormulation" !== next[0] && conceptTypeResolver(identifier.name);
        };
    };
    LF2AbstractSQL.ResolveLinkTable = function(tableAlias) {
        false !== this.linkTableResolvers[tableAlias] && ("function" == typeof this.linkTableResolvers[tableAlias] ? this.linkTableResolvers[tableAlias]() : this.linkTableResolvers[tableAlias] = true);
    };
    LF2AbstractSQL.CreateLinkTableResolver = function(query, linkTableAlias, bind, relationshipMapping) {
        var parentAlias = bind.identifier.name + "." + bind.number, $elf = this, linkTableResolver = function() {
            $elf.linkTableResolvers[parentAlias] = false;
            bind.used();
            $elf.AddWhereClause(query, [ "Equals", [ "ReferencedField", linkTableAlias, relationshipMapping[0] ], [ "ReferencedField", bind.binding[1], relationshipMapping[1][1] ] ]);
        };
        if (true === this.linkTableResolvers[parentAlias] || false === this.linkTableResolvers[parentAlias] || null != bind.identifier.num) linkTableResolver(); else if ("function" == typeof this.linkTableResolvers[parentAlias]) {
            var existingLinkTableResolver = this.linkTableResolvers[parentAlias];
            this.linkTableResolvers[parentAlias] = function() {
                existingLinkTableResolver();
                linkTableResolver();
            };
        } else this.linkTableResolvers[parentAlias] = linkTableResolver;
    };
    LF2AbstractSQL.initialize = function() {
        this.reset();
        this.sbvrTypes = {};
        this.termForms = {};
    };
    LF2AbstractSQL.reset = function() {
        SBVRCompilerLibs.initialize.call(this);
        this.tables = {};
        this.relationships = {};
        this.synonymousForms = {};
        this.rules = [];
        this.attributes = {};
        this.bindAttributes = [];
        this.bindAttributeDepth = [];
        this.ResetRuleState();
    };
    LF2AbstractSQL.ResetRuleState = function() {
        this.conceptTypeResolvers = {};
        this.linkTableResolvers = {};
    };
    LF2AbstractSQL.addTypes = function(types) {
        Object.assign(this.sbvrTypes, types);
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = function() {};
}, function(module, exports, __webpack_require__) {
    "use strict";
    var sign = __webpack_require__(124), abs = Math.abs, floor = Math.floor;
    module.exports = function(value) {
        return isNaN(value) ? 0 : 0 !== (value = Number(value)) && isFinite(value) ? sign(value) * floor(abs(value)) : value;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = __webpack_require__(125)() ? Math.sign : __webpack_require__(126);
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = function() {
        var sign = Math.sign;
        return "function" == typeof sign && (1 === sign(10) && -1 === sign(-20));
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = function(value) {
        value = Number(value);
        return isNaN(value) || 0 === value ? value : value > 0 ? 1 : -1;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var callable = __webpack_require__(2), forEach = __webpack_require__(25), extensions = __webpack_require__(7), configure = __webpack_require__(129), resolveLength = __webpack_require__(38);
    module.exports = function self(fn) {
        var options, length, conf;
        callable(fn);
        if ((options = Object(arguments[1])).async && options.promise) throw new Error("Options 'async' and 'promise' cannot be used together");
        if (hasOwnProperty.call(fn, "__memoized__") && !options.force) return fn;
        length = resolveLength(options.length, fn.length, options.async && extensions.async);
        conf = configure(fn, length, options);
        forEach(extensions, (function(extFn, name) {
            options[name] && extFn(options[name], conf, options);
        }));
        self.__profiler__ && self.__profiler__(conf);
        conf.updateEnv();
        return conf.memoized;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var callable = __webpack_require__(2), value = __webpack_require__(4), bind = Function.prototype.bind, call = Function.prototype.call, keys = Object.keys, objPropertyIsEnumerable = Object.prototype.propertyIsEnumerable;
    module.exports = function(method, defVal) {
        return function(obj, cb) {
            var list, thisArg = arguments[2], compareFn = arguments[3];
            obj = Object(value(obj));
            callable(cb);
            list = keys(obj);
            compareFn && list.sort("function" == typeof compareFn ? bind.call(compareFn, obj) : void 0);
            "function" != typeof method && (method = list[method]);
            return call.call(method, list, (function(key, index) {
                return objPropertyIsEnumerable.call(obj, key) ? call.call(cb, thisArg, obj[key], key, obj, index) : defVal;
            }));
        };
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var customError = __webpack_require__(52), defineLength = __webpack_require__(27), d = __webpack_require__(3), ee = __webpack_require__(139).methods, resolveResolve = __webpack_require__(56), resolveNormalize = __webpack_require__(58), apply = Function.prototype.apply, call = Function.prototype.call, create = Object.create, defineProperties = Object.defineProperties, on = ee.on, emit = ee.emit;
    module.exports = function(original, length, options) {
        var cache = create(null), conf, memLength, get, set, del, clear, extDel, extGet, extHas, normalizer, getListeners, setListeners, deleteListeners, memoized, resolve;
        memLength = !1 !== length ? length : isNaN(original.length) ? 1 : original.length;
        if (options.normalizer) {
            normalizer = resolveNormalize(options.normalizer);
            get = normalizer.get;
            set = normalizer.set;
            del = normalizer.delete;
            clear = normalizer.clear;
        }
        null != options.resolvers && (resolve = resolveResolve(options.resolvers));
        memoized = get ? defineLength((function(arg) {
            var id, result, args = arguments;
            resolve && (args = resolve(args));
            if (null !== (id = get(args)) && hasOwnProperty.call(cache, id)) {
                getListeners && conf.emit("get", id, args, this);
                return cache[id];
            }
            result = 1 === args.length ? call.call(original, this, args[0]) : apply.call(original, this, args);
            if (null === id) {
                if (null !== (id = get(args))) throw customError("Circular invocation", "CIRCULAR_INVOCATION");
                id = set(args);
            } else if (hasOwnProperty.call(cache, id)) throw customError("Circular invocation", "CIRCULAR_INVOCATION");
            cache[id] = result;
            setListeners && conf.emit("set", id, null, result);
            return result;
        }), memLength) : 0 === length ? function() {
            var result;
            if (hasOwnProperty.call(cache, "data")) {
                getListeners && conf.emit("get", "data", arguments, this);
                return cache.data;
            }
            result = arguments.length ? apply.call(original, this, arguments) : call.call(original, this);
            if (hasOwnProperty.call(cache, "data")) throw customError("Circular invocation", "CIRCULAR_INVOCATION");
            cache.data = result;
            setListeners && conf.emit("set", "data", null, result);
            return result;
        } : function(arg) {
            var result, args = arguments, id;
            resolve && (args = resolve(arguments));
            id = String(args[0]);
            if (hasOwnProperty.call(cache, id)) {
                getListeners && conf.emit("get", id, args, this);
                return cache[id];
            }
            result = 1 === args.length ? call.call(original, this, args[0]) : apply.call(original, this, args);
            if (hasOwnProperty.call(cache, id)) throw customError("Circular invocation", "CIRCULAR_INVOCATION");
            cache[id] = result;
            setListeners && conf.emit("set", id, null, result);
            return result;
        };
        conf = {
            original: original,
            memoized: memoized,
            profileName: options.profileName,
            get: function(args) {
                resolve && (args = resolve(args));
                return get ? get(args) : String(args[0]);
            },
            has: function(id) {
                return hasOwnProperty.call(cache, id);
            },
            delete: function(id) {
                var result;
                if (hasOwnProperty.call(cache, id)) {
                    del && del(id);
                    result = cache[id];
                    delete cache[id];
                    deleteListeners && conf.emit("delete", id, result);
                }
            },
            clear: function() {
                var oldCache = cache;
                clear && clear();
                cache = create(null);
                conf.emit("clear", oldCache);
            },
            on: function(type, listener) {
                "get" === type ? getListeners = !0 : "set" === type ? setListeners = !0 : "delete" === type && (deleteListeners = !0);
                return on.call(this, type, listener);
            },
            emit: emit,
            updateEnv: function() {
                original = conf.original;
            }
        };
        extDel = get ? defineLength((function(arg) {
            var id, args = arguments;
            resolve && (args = resolve(args));
            null !== (id = get(args)) && conf.delete(id);
        }), memLength) : 0 === length ? function() {
            return conf.delete("data");
        } : function(arg) {
            resolve && (arg = resolve(arguments)[0]);
            return conf.delete(arg);
        };
        extGet = defineLength((function() {
            var id, args = arguments;
            if (0 === length) return cache.data;
            resolve && (args = resolve(args));
            id = get ? get(args) : String(args[0]);
            return cache[id];
        }));
        extHas = defineLength((function() {
            var id, args = arguments;
            if (0 === length) return conf.has("data");
            resolve && (args = resolve(args));
            return null !== (id = get ? get(args) : String(args[0])) && conf.has(id);
        }));
        defineProperties(memoized, {
            __memoized__: d(!0),
            delete: d(extDel),
            clear: d(conf.clear),
            _get: d(extGet),
            _has: d(extHas)
        });
        return conf;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = function() {
        var assign = Object.assign, obj;
        if ("function" != typeof assign) return !1;
        assign(obj = {
            foo: "raz"
        }, {
            bar: "dwa"
        }, {
            trzy: "trzy"
        });
        return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var keys = __webpack_require__(132), value = __webpack_require__(4), max = Math.max;
    module.exports = function(dest, src) {
        var error, i, length = max(arguments.length, 2), assign;
        dest = Object(value(dest));
        assign = function(key) {
            try {
                dest[key] = src[key];
            } catch (e) {
                error || (error = e);
            }
        };
        for (i = 1; i < length; ++i) keys(src = arguments[i]).forEach(assign);
        if (void 0 !== error) throw error;
        return dest;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = __webpack_require__(133)() ? Object.keys : __webpack_require__(134);
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = function() {
        try {
            Object.keys("primitive");
            return !0;
        } catch (e) {
            return !1;
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var isValue = __webpack_require__(6), keys = Object.keys;
    module.exports = function(object) {
        return keys(isValue(object) ? Object(object) : object);
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var isPrototype = __webpack_require__(136);
    module.exports = function(value) {
        if ("function" != typeof value) return !1;
        if (!hasOwnProperty.call(value, "length")) return !1;
        try {
            if ("number" != typeof value.length) return !1;
            if ("function" != typeof value.call) return !1;
            if ("function" != typeof value.apply) return !1;
        } catch (error) {
            return !1;
        }
        return !isPrototype(value);
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var isObject = __webpack_require__(40);
    module.exports = function(value) {
        if (!isObject(value)) return !1;
        try {
            return !!value.constructor && value.constructor.prototype === value;
        } catch (error) {
            return !1;
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var str = "razdwatrzy";
    module.exports = function() {
        return "function" == typeof str.contains && (!0 === str.contains("dwa") && !1 === str.contains("foo"));
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var indexOf = String.prototype.indexOf;
    module.exports = function(searchString) {
        return indexOf.call(this, searchString, arguments[1]) > -1;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var d = __webpack_require__(3), callable = __webpack_require__(2), apply = Function.prototype.apply, call = Function.prototype.call, create = Object.create, defineProperty = Object.defineProperty, defineProperties = Object.defineProperties, hasOwnProperty = Object.prototype.hasOwnProperty, descriptor = {
        configurable: !0,
        enumerable: !1,
        writable: !0
    }, on, once, off, emit, methods, descriptors, base;
    once = function(type, listener) {
        var once, self;
        callable(listener);
        self = this;
        on.call(this, type, once = function() {
            off.call(self, type, once);
            apply.call(listener, this, arguments);
        });
        once.__eeOnceListener__ = listener;
        return this;
    };
    methods = {
        on: on = function(type, listener) {
            var data;
            callable(listener);
            if (hasOwnProperty.call(this, "__ee__")) data = this.__ee__; else {
                data = descriptor.value = create(null);
                defineProperty(this, "__ee__", descriptor);
                descriptor.value = null;
            }
            data[type] ? "object" == typeof data[type] ? data[type].push(listener) : data[type] = [ data[type], listener ] : data[type] = listener;
            return this;
        },
        once: once,
        off: off = function(type, listener) {
            var data, listeners, candidate, i;
            callable(listener);
            if (!hasOwnProperty.call(this, "__ee__")) return this;
            if (!(data = this.__ee__)[type]) return this;
            if ("object" == typeof (listeners = data[type])) for (i = 0; candidate = listeners[i]; ++i) candidate !== listener && candidate.__eeOnceListener__ !== listener || (2 === listeners.length ? data[type] = listeners[i ? 0 : 1] : listeners.splice(i, 1)); else listeners !== listener && listeners.__eeOnceListener__ !== listener || delete data[type];
            return this;
        },
        emit: emit = function(type) {
            var i, l, listener, listeners, args;
            if (hasOwnProperty.call(this, "__ee__") && (listeners = this.__ee__[type])) if ("object" == typeof listeners) {
                l = arguments.length;
                args = new Array(l - 1);
                for (i = 1; i < l; ++i) args[i - 1] = arguments[i];
                listeners = listeners.slice();
                for (i = 0; listener = listeners[i]; ++i) apply.call(listener, this, args);
            } else switch (arguments.length) {
              case 1:
                call.call(listeners, this);
                break;

              case 2:
                call.call(listeners, this, arguments[1]);
                break;

              case 3:
                call.call(listeners, this, arguments[1], arguments[2]);
                break;

              default:
                l = arguments.length;
                args = new Array(l - 1);
                for (i = 1; i < l; ++i) args[i - 1] = arguments[i];
                apply.call(listeners, this, args);
            }
        }
    };
    descriptors = {
        on: d(on),
        once: d(once),
        off: d(off),
        emit: d(emit)
    };
    base = defineProperties({}, descriptors);
    module.exports = exports = function(o) {
        return null == o ? create(base) : defineProperties(Object(o), descriptors);
    };
    exports.methods = methods;
}, function(module, exports, __webpack_require__) {
    "use strict";
    var from = __webpack_require__(22), isArray = Array.isArray;
    module.exports = function(arrayLike) {
        return isArray(arrayLike) ? arrayLike : from(arrayLike);
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = function() {
        var from = Array.from, arr, result;
        if ("function" != typeof from) return !1;
        result = from(arr = [ "raz", "dwa" ]);
        return Boolean(result && result !== arr && "dwa" === result[1]);
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var iteratorSymbol = __webpack_require__(11).iterator, isArguments = __webpack_require__(29), isFunction = __webpack_require__(151), toPosInt = __webpack_require__(10), callable = __webpack_require__(2), validValue = __webpack_require__(4), isValue = __webpack_require__(6), isString = __webpack_require__(30), isArray = Array.isArray, call = Function.prototype.call, desc = {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        value: null
    }, defineProperty = Object.defineProperty;
    module.exports = function(arrayLike) {
        var mapFn = arguments[1], thisArg = arguments[2], Context, i, j, arr, length, code, iterator, result, getIterator, value;
        arrayLike = Object(validValue(arrayLike));
        isValue(mapFn) && callable(mapFn);
        if (this && this !== Array && isFunction(this)) Context = this; else {
            if (!mapFn) {
                if (isArguments(arrayLike)) {
                    if (1 !== (length = arrayLike.length)) return Array.apply(null, arrayLike);
                    (arr = new Array(1))[0] = arrayLike[0];
                    return arr;
                }
                if (isArray(arrayLike)) {
                    arr = new Array(length = arrayLike.length);
                    for (i = 0; i < length; ++i) arr[i] = arrayLike[i];
                    return arr;
                }
            }
            arr = [];
        }
        if (!isArray(arrayLike)) if (void 0 !== (getIterator = arrayLike[iteratorSymbol])) {
            iterator = callable(getIterator).call(arrayLike);
            Context && (arr = new Context);
            result = iterator.next();
            i = 0;
            for (;!result.done; ) {
                value = mapFn ? call.call(mapFn, thisArg, result.value, i) : result.value;
                if (Context) {
                    desc.value = value;
                    defineProperty(arr, i, desc);
                } else arr[i] = value;
                result = iterator.next();
                ++i;
            }
            length = i;
        } else if (isString(arrayLike)) {
            length = arrayLike.length;
            Context && (arr = new Context);
            for (i = 0, j = 0; i < length; ++i) {
                value = arrayLike[i];
                i + 1 < length && (code = value.charCodeAt(0)) >= 55296 && code <= 56319 && (value += arrayLike[++i]);
                value = mapFn ? call.call(mapFn, thisArg, value, j) : value;
                if (Context) {
                    desc.value = value;
                    defineProperty(arr, j, desc);
                } else arr[j] = value;
                ++j;
            }
            length = j;
        }
        if (void 0 === length) {
            length = toPosInt(arrayLike.length);
            Context && (arr = new Context(length));
            for (i = 0; i < length; ++i) {
                value = mapFn ? call.call(mapFn, thisArg, arrayLike[i], i) : arrayLike[i];
                if (Context) {
                    desc.value = value;
                    defineProperty(arr, i, desc);
                } else arr[i] = value;
            }
        }
        if (Context) {
            desc.value = null;
            arr.length = length;
        }
        return arr;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var global = __webpack_require__(28), validTypes = {
        object: !0,
        symbol: !0
    };
    module.exports = function() {
        var Symbol = global.Symbol, symbol;
        if ("function" != typeof Symbol) return !1;
        symbol = Symbol("test symbol");
        try {
            String(symbol);
        } catch (e) {
            return !1;
        }
        return !!validTypes[typeof Symbol.iterator] && (!!validTypes[typeof Symbol.toPrimitive] && !!validTypes[typeof Symbol.toStringTag]);
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = function() {
        return "object" == typeof globalThis && (!!globalThis && globalThis.Array === Array);
    };
}, function(module, exports) {
    var naiveFallback = function() {
        if ("object" == typeof self && self) return self;
        if ("object" == typeof window && window) return window;
        throw new Error("Unable to resolve global `this`");
    };
    module.exports = function() {
        if (this) return this;
        try {
            Object.defineProperty(Object.prototype, "__global__", {
                get: function() {
                    return this;
                },
                configurable: !0
            });
        } catch (error) {
            return naiveFallback();
        }
        try {
            return __global__ || naiveFallback();
        } finally {
            delete Object.prototype.__global__;
        }
    }();
}, function(module, exports, __webpack_require__) {
    "use strict";
    var d = __webpack_require__(3), validateSymbol = __webpack_require__(57), NativeSymbol = __webpack_require__(28).Symbol, generateName = __webpack_require__(148), setupStandardSymbols = __webpack_require__(149), setupSymbolRegistry = __webpack_require__(150), create = Object.create, defineProperties = Object.defineProperties, defineProperty = Object.defineProperty, SymbolPolyfill, HiddenSymbol, isNativeSafe;
    if ("function" == typeof NativeSymbol) try {
        String(NativeSymbol());
        isNativeSafe = !0;
    } catch (ignore) {} else NativeSymbol = null;
    HiddenSymbol = function Symbol(description) {
        if (this instanceof HiddenSymbol) throw new TypeError("Symbol is not a constructor");
        return SymbolPolyfill(description);
    };
    module.exports = SymbolPolyfill = function Symbol(description) {
        var symbol;
        if (this instanceof Symbol) throw new TypeError("Symbol is not a constructor");
        if (isNativeSafe) return NativeSymbol(description);
        symbol = create(HiddenSymbol.prototype);
        description = void 0 === description ? "" : String(description);
        return defineProperties(symbol, {
            __description__: d("", description),
            __name__: d("", generateName(description))
        });
    };
    setupStandardSymbols(SymbolPolyfill);
    setupSymbolRegistry(SymbolPolyfill);
    defineProperties(HiddenSymbol.prototype, {
        constructor: d(SymbolPolyfill),
        toString: d("", (function() {
            return this.__name__;
        }))
    });
    defineProperties(SymbolPolyfill.prototype, {
        toString: d((function() {
            return "Symbol (" + validateSymbol(this).__description__ + ")";
        })),
        valueOf: d((function() {
            return validateSymbol(this);
        }))
    });
    defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d("", (function() {
        var symbol = validateSymbol(this);
        return "symbol" == typeof symbol ? symbol : symbol.toString();
    })));
    defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d("c", "Symbol"));
    defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag, d("c", SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));
    defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive, d("c", SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = function(value) {
        return !!value && ("symbol" == typeof value || !!value.constructor && ("Symbol" === value.constructor.name && "Symbol" === value[value.constructor.toStringTag]));
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var d = __webpack_require__(3), create = Object.create, defineProperty = Object.defineProperty, objPrototype = Object.prototype, created = create(null);
    module.exports = function(desc) {
        for (var postfix = 0, name, ie11BugWorkaround; created[desc + (postfix || "")]; ) ++postfix;
        created[desc += postfix || ""] = !0;
        defineProperty(objPrototype, name = "@@" + desc, d.gs(null, (function(value) {
            if (!ie11BugWorkaround) {
                ie11BugWorkaround = !0;
                defineProperty(this, name, d(value));
                ie11BugWorkaround = !1;
            }
        })));
        return name;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var d = __webpack_require__(3), NativeSymbol = __webpack_require__(28).Symbol;
    module.exports = function(SymbolPolyfill) {
        return Object.defineProperties(SymbolPolyfill, {
            hasInstance: d("", NativeSymbol && NativeSymbol.hasInstance || SymbolPolyfill("hasInstance")),
            isConcatSpreadable: d("", NativeSymbol && NativeSymbol.isConcatSpreadable || SymbolPolyfill("isConcatSpreadable")),
            iterator: d("", NativeSymbol && NativeSymbol.iterator || SymbolPolyfill("iterator")),
            match: d("", NativeSymbol && NativeSymbol.match || SymbolPolyfill("match")),
            replace: d("", NativeSymbol && NativeSymbol.replace || SymbolPolyfill("replace")),
            search: d("", NativeSymbol && NativeSymbol.search || SymbolPolyfill("search")),
            species: d("", NativeSymbol && NativeSymbol.species || SymbolPolyfill("species")),
            split: d("", NativeSymbol && NativeSymbol.split || SymbolPolyfill("split")),
            toPrimitive: d("", NativeSymbol && NativeSymbol.toPrimitive || SymbolPolyfill("toPrimitive")),
            toStringTag: d("", NativeSymbol && NativeSymbol.toStringTag || SymbolPolyfill("toStringTag")),
            unscopables: d("", NativeSymbol && NativeSymbol.unscopables || SymbolPolyfill("unscopables"))
        });
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var d = __webpack_require__(3), validateSymbol = __webpack_require__(57), registry = Object.create(null);
    module.exports = function(SymbolPolyfill) {
        return Object.defineProperties(SymbolPolyfill, {
            for: d((function(key) {
                return registry[key] ? registry[key] : registry[key] = SymbolPolyfill(String(key));
            })),
            keyFor: d((function(symbol) {
                var key;
                validateSymbol(symbol);
                for (key in registry) if (registry[key] === symbol) return key;
            }))
        });
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var objToString = Object.prototype.toString, isFunctionStringTag = RegExp.prototype.test.bind(/^[object [A-Za-z0-9]*Function]$/);
    module.exports = function(value) {
        return "function" == typeof value && isFunctionStringTag(objToString.call(value));
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = function(args) {
        var id, i, length = args.length;
        if (!length) return "\x02";
        id = String(args[i = 0]);
        for (;--length; ) id += "\x01" + args[++i];
        return id;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = function(length) {
        return length ? function(args) {
            for (var id = String(args[0]), i = 0, currentLength = length; --currentLength; ) id += "\x01" + args[++i];
            return id;
        } : function() {
            return "";
        };
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var indexOf = __webpack_require__(41), create = Object.create;
    module.exports = function() {
        var lastId = 0, map = [], cache = create(null);
        return {
            get: function(args) {
                var index = 0, set = map, i, length = args.length;
                if (0 === length) return set[length] || null;
                if (set = set[length]) {
                    for (;index < length - 1; ) {
                        if (-1 === (i = indexOf.call(set[0], args[index]))) return null;
                        set = set[1][i];
                        ++index;
                    }
                    return -1 === (i = indexOf.call(set[0], args[index])) ? null : set[1][i] || null;
                }
                return null;
            },
            set: function(args) {
                var index = 0, set = map, i, length = args.length;
                if (0 === length) set[length] = ++lastId; else {
                    set[length] || (set[length] = [ [], [] ]);
                    set = set[length];
                    for (;index < length - 1; ) {
                        if (-1 === (i = indexOf.call(set[0], args[index]))) {
                            i = set[0].push(args[index]) - 1;
                            set[1].push([ [], [] ]);
                        }
                        set = set[1][i];
                        ++index;
                    }
                    -1 === (i = indexOf.call(set[0], args[index])) && (i = set[0].push(args[index]) - 1);
                    set[1][i] = ++lastId;
                }
                cache[lastId] = args;
                return lastId;
            },
            delete: function(id) {
                var index = 0, set = map, i, args = cache[id], length = args.length, path = [];
                if (0 === length) delete set[length]; else if (set = set[length]) {
                    for (;index < length - 1; ) {
                        if (-1 === (i = indexOf.call(set[0], args[index]))) return;
                        path.push(set, i);
                        set = set[1][i];
                        ++index;
                    }
                    if (-1 === (i = indexOf.call(set[0], args[index]))) return;
                    id = set[1][i];
                    set[0].splice(i, 1);
                    set[1].splice(i, 1);
                    for (;!set[0].length && path.length; ) {
                        i = path.pop();
                        (set = path.pop())[0].splice(i, 1);
                        set[1].splice(i, 1);
                    }
                }
                delete cache[id];
            },
            clear: function() {
                map = [];
                cache = create(null);
            }
        };
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = __webpack_require__(156)() ? Number.isNaN : __webpack_require__(157);
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = function() {
        var numberIsNaN = Number.isNaN;
        return "function" == typeof numberIsNaN && (!numberIsNaN({}) && numberIsNaN(NaN) && !numberIsNaN(34));
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = function(value) {
        return value != value;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var indexOf = __webpack_require__(41);
    module.exports = function() {
        var lastId = 0, argsMap = [], cache = [];
        return {
            get: function(args) {
                var index = indexOf.call(argsMap, args[0]);
                return -1 === index ? null : cache[index];
            },
            set: function(args) {
                argsMap.push(args[0]);
                cache.push(++lastId);
                return lastId;
            },
            delete: function(id) {
                var index = indexOf.call(cache, id);
                if (-1 !== index) {
                    argsMap.splice(index, 1);
                    cache.splice(index, 1);
                }
            },
            clear: function() {
                argsMap = [];
                cache = [];
            }
        };
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var indexOf = __webpack_require__(41), create = Object.create;
    module.exports = function(length) {
        var lastId = 0, map = [ [], [] ], cache = create(null);
        return {
            get: function(args) {
                for (var index = 0, set = map, i; index < length - 1; ) {
                    if (-1 === (i = indexOf.call(set[0], args[index]))) return null;
                    set = set[1][i];
                    ++index;
                }
                return -1 === (i = indexOf.call(set[0], args[index])) ? null : set[1][i] || null;
            },
            set: function(args) {
                for (var index = 0, set = map, i; index < length - 1; ) {
                    if (-1 === (i = indexOf.call(set[0], args[index]))) {
                        i = set[0].push(args[index]) - 1;
                        set[1].push([ [], [] ]);
                    }
                    set = set[1][i];
                    ++index;
                }
                -1 === (i = indexOf.call(set[0], args[index])) && (i = set[0].push(args[index]) - 1);
                set[1][i] = ++lastId;
                cache[lastId] = args;
                return lastId;
            },
            delete: function(id) {
                for (var index = 0, set = map, i, path = [], args = cache[id]; index < length - 1; ) {
                    if (-1 === (i = indexOf.call(set[0], args[index]))) return;
                    path.push(set, i);
                    set = set[1][i];
                    ++index;
                }
                if (-1 !== (i = indexOf.call(set[0], args[index]))) {
                    id = set[1][i];
                    set[0].splice(i, 1);
                    set[1].splice(i, 1);
                    for (;!set[0].length && path.length; ) {
                        i = path.pop();
                        (set = path.pop())[0].splice(i, 1);
                        set[1].splice(i, 1);
                    }
                    delete cache[id];
                }
            },
            clear: function() {
                map = [ [], [] ];
                cache = create(null);
            }
        };
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var aFrom = __webpack_require__(22), objectMap = __webpack_require__(42), mixin = __webpack_require__(53), defineLength = __webpack_require__(27), nextTick = __webpack_require__(43), slice = Array.prototype.slice, apply = Function.prototype.apply, create = Object.create;
    __webpack_require__(7).async = function(tbi, conf) {
        var waiting = create(null), cache = create(null), base = conf.memoized, original = conf.original, currentCallback, currentContext, currentArgs;
        conf.memoized = defineLength((function(arg) {
            var args = arguments, last = args[args.length - 1];
            if ("function" == typeof last) {
                currentCallback = last;
                args = slice.call(args, 0, -1);
            }
            return base.apply(currentContext = this, currentArgs = args);
        }), base);
        try {
            mixin(conf.memoized, base);
        } catch (ignore) {}
        conf.on("get", (function(id) {
            var cb, context, args;
            if (currentCallback) if (waiting[id]) {
                "function" == typeof waiting[id] ? waiting[id] = [ waiting[id], currentCallback ] : waiting[id].push(currentCallback);
                currentCallback = null;
            } else {
                cb = currentCallback;
                context = currentContext;
                args = currentArgs;
                currentCallback = currentContext = currentArgs = null;
                nextTick((function() {
                    var data;
                    if (hasOwnProperty.call(cache, id)) {
                        data = cache[id];
                        conf.emit("getasync", id, args, context);
                        apply.call(cb, data.context, data.args);
                    } else {
                        currentCallback = cb;
                        currentContext = context;
                        currentArgs = args;
                        base.apply(context, args);
                    }
                }));
            }
        }));
        conf.original = function() {
            var args, cb, origCb, result;
            if (!currentCallback) return apply.call(original, this, arguments);
            args = aFrom(arguments);
            cb = function self(err) {
                var cb, args, id = self.id;
                if (null != id) {
                    delete self.id;
                    cb = waiting[id];
                    delete waiting[id];
                    if (cb) {
                        args = aFrom(arguments);
                        if (conf.has(id)) if (err) conf.delete(id); else {
                            cache[id] = {
                                context: this,
                                args: args
                            };
                            conf.emit("setasync", id, "function" == typeof cb ? 1 : cb.length);
                        }
                        "function" == typeof cb ? result = apply.call(cb, this, args) : cb.forEach((function(cb) {
                            result = apply.call(cb, this, args);
                        }), this);
                        return result;
                    }
                } else nextTick(apply.bind(self, this, arguments));
            };
            origCb = currentCallback;
            currentCallback = currentContext = currentArgs = null;
            args.push(cb);
            result = apply.call(original, this, args);
            cb.cb = origCb;
            currentCallback = cb;
            return result;
        };
        conf.on("set", (function(id) {
            if (currentCallback) {
                waiting[id] ? "function" == typeof waiting[id] ? waiting[id] = [ waiting[id], currentCallback.cb ] : waiting[id].push(currentCallback.cb) : waiting[id] = currentCallback.cb;
                delete currentCallback.cb;
                currentCallback.id = id;
                currentCallback = null;
            } else conf.delete(id);
        }));
        conf.on("delete", (function(id) {
            var result;
            if (!hasOwnProperty.call(waiting, id) && cache[id]) {
                result = cache[id];
                delete cache[id];
                conf.emit("deleteasync", id, slice.call(result.args, 1));
            }
        }));
        conf.on("clear", (function() {
            var oldCache = cache;
            cache = create(null);
            conf.emit("clearasync", objectMap(oldCache, (function(data) {
                return slice.call(data.args, 1);
            })));
        }));
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var objectMap = __webpack_require__(42), primitiveSet = __webpack_require__(162), ensureString = __webpack_require__(163), toShortString = __webpack_require__(165), isPromise = __webpack_require__(60), nextTick = __webpack_require__(43), create = Object.create, supportedModes = primitiveSet("then", "then:finally", "done", "done:finally");
    __webpack_require__(7).promise = function(mode, conf) {
        var waiting = create(null), cache = create(null), promises = create(null);
        if (!0 === mode) mode = null; else {
            mode = ensureString(mode);
            if (!supportedModes[mode]) throw new TypeError("'" + toShortString(mode) + "' is not valid promise mode");
        }
        conf.on("set", (function(id, ignore, promise) {
            var isFailed = !1;
            if (isPromise(promise)) {
                waiting[id] = 1;
                promises[id] = promise;
                var onSuccess = function(result) {
                    var count = waiting[id];
                    if (isFailed) throw new Error("Memoizee error: Detected unordered then|done & finally resolution, which in turn makes proper detection of success/failure impossible (when in 'done:finally' mode)\nConsider to rely on 'then' or 'done' mode instead.");
                    if (count) {
                        delete waiting[id];
                        cache[id] = result;
                        conf.emit("setasync", id, count);
                    }
                }, onFailure = function() {
                    isFailed = !0;
                    if (waiting[id]) {
                        delete waiting[id];
                        delete promises[id];
                        conf.delete(id);
                    }
                }, resolvedMode = mode;
                resolvedMode || (resolvedMode = "then");
                if ("then" === resolvedMode) {
                    var nextTickFailure = function() {
                        nextTick(onFailure);
                    };
                    "function" == typeof (promise = promise.then((function(result) {
                        nextTick(onSuccess.bind(this, result));
                    }), nextTickFailure)).finally && promise.finally(nextTickFailure);
                } else if ("done" === resolvedMode) {
                    if ("function" != typeof promise.done) throw new Error("Memoizee error: Retrieved promise does not implement 'done' in 'done' mode");
                    promise.done(onSuccess, onFailure);
                } else if ("done:finally" === resolvedMode) {
                    if ("function" != typeof promise.done) throw new Error("Memoizee error: Retrieved promise does not implement 'done' in 'done:finally' mode");
                    if ("function" != typeof promise.finally) throw new Error("Memoizee error: Retrieved promise does not implement 'finally' in 'done:finally' mode");
                    promise.done(onSuccess);
                    promise.finally(onFailure);
                }
            } else {
                cache[id] = promise;
                conf.emit("setasync", id, 1);
            }
        }));
        conf.on("get", (function(id, args, context) {
            var promise;
            if (waiting[id]) ++waiting[id]; else {
                promise = promises[id];
                var emit = function() {
                    conf.emit("getasync", id, args, context);
                };
                isPromise(promise) ? "function" == typeof promise.done ? promise.done(emit) : promise.then((function() {
                    nextTick(emit);
                })) : emit();
            }
        }));
        conf.on("delete", (function(id) {
            delete promises[id];
            if (waiting[id]) delete waiting[id]; else if (hasOwnProperty.call(cache, id)) {
                var result = cache[id];
                delete cache[id];
                conf.emit("deleteasync", id, [ result ]);
            }
        }));
        conf.on("clear", (function() {
            var oldCache = cache;
            cache = create(null);
            waiting = create(null);
            promises = create(null);
            conf.emit("clearasync", objectMap(oldCache, (function(data) {
                return [ data ];
            })));
        }));
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var forEach = Array.prototype.forEach, create = Object.create;
    module.exports = function(arg) {
        var set = create(null);
        forEach.call(arguments, (function(name) {
            set[name] = !0;
        }));
        return set;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var ensureValue = __webpack_require__(4), stringifiable = __webpack_require__(164);
    module.exports = function(value) {
        return stringifiable(ensureValue(value));
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var isCallable = __webpack_require__(59);
    module.exports = function(stringifiable) {
        try {
            return stringifiable && isCallable(stringifiable.toString) ? stringifiable.toString() : String(stringifiable);
        } catch (e) {
            throw new TypeError("Passed argument cannot be stringifed");
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var safeToString = __webpack_require__(166), reNewLine = /[\n\r\u2028\u2029]/g;
    module.exports = function(value) {
        var string = safeToString(value);
        string.length > 100 && (string = string.slice(0, 99) + "\u2026");
        return string = string.replace(reNewLine, (function(char) {
            return JSON.stringify(char).slice(1, -1);
        }));
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var isCallable = __webpack_require__(59);
    module.exports = function(value) {
        try {
            return value && isCallable(value.toString) ? value.toString() : String(value);
        } catch (e) {
            return "<Non-coercible to string value>";
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var callable = __webpack_require__(2), forEach = __webpack_require__(25), extensions = __webpack_require__(7), apply = Function.prototype.apply;
    extensions.dispose = function(dispose, conf, options) {
        var del;
        callable(dispose);
        if (options.async && extensions.async || options.promise && extensions.promise) {
            conf.on("deleteasync", del = function(id, resultArray) {
                apply.call(dispose, null, resultArray);
            });
            conf.on("clearasync", (function(cache) {
                forEach(cache, (function(result, id) {
                    del(id, result);
                }));
            }));
        } else {
            conf.on("delete", del = function(id, result) {
                dispose(result);
            });
            conf.on("clear", (function(cache) {
                forEach(cache, (function(result, id) {
                    del(id, result);
                }));
            }));
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var aFrom = __webpack_require__(22), forEach = __webpack_require__(25), nextTick = __webpack_require__(43), isPromise = __webpack_require__(60), timeout = __webpack_require__(169), extensions = __webpack_require__(7), noop = Function.prototype, max = Math.max, min = Math.min, create = Object.create;
    extensions.maxAge = function(maxAge, conf, options) {
        var timeouts, postfix, preFetchAge, preFetchTimeouts;
        if (maxAge = timeout(maxAge)) {
            timeouts = create(null);
            postfix = options.async && extensions.async || options.promise && extensions.promise ? "async" : "";
            conf.on("set" + postfix, (function(id) {
                timeouts[id] = setTimeout((function() {
                    conf.delete(id);
                }), maxAge);
                "function" == typeof timeouts[id].unref && timeouts[id].unref();
                if (preFetchTimeouts) {
                    preFetchTimeouts[id] && "nextTick" !== preFetchTimeouts[id] && clearTimeout(preFetchTimeouts[id]);
                    preFetchTimeouts[id] = setTimeout((function() {
                        delete preFetchTimeouts[id];
                    }), preFetchAge);
                    "function" == typeof preFetchTimeouts[id].unref && preFetchTimeouts[id].unref();
                }
            }));
            conf.on("delete" + postfix, (function(id) {
                clearTimeout(timeouts[id]);
                delete timeouts[id];
                if (preFetchTimeouts) {
                    "nextTick" !== preFetchTimeouts[id] && clearTimeout(preFetchTimeouts[id]);
                    delete preFetchTimeouts[id];
                }
            }));
            if (options.preFetch && (preFetchAge = !0 === options.preFetch || isNaN(options.preFetch) ? .333 : max(min(Number(options.preFetch), 1), 0))) {
                preFetchTimeouts = {};
                preFetchAge = (1 - preFetchAge) * maxAge;
                conf.on("get" + postfix, (function(id, args, context) {
                    if (!preFetchTimeouts[id]) {
                        preFetchTimeouts[id] = "nextTick";
                        nextTick((function() {
                            var result;
                            if ("nextTick" === preFetchTimeouts[id]) {
                                delete preFetchTimeouts[id];
                                conf.delete(id);
                                options.async && (args = aFrom(args)).push(noop);
                                result = conf.memoized.apply(context, args);
                                options.promise && isPromise(result) && ("function" == typeof result.done ? result.done(noop, noop) : result.then(noop, noop));
                            }
                        }));
                    }
                }));
            }
            conf.on("clear" + postfix, (function() {
                forEach(timeouts, (function(id) {
                    clearTimeout(id);
                }));
                timeouts = {};
                if (preFetchTimeouts) {
                    forEach(preFetchTimeouts, (function(id) {
                        "nextTick" !== id && clearTimeout(id);
                    }));
                    preFetchTimeouts = {};
                }
            }));
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var toPosInt = __webpack_require__(10), maxTimeout = __webpack_require__(170);
    module.exports = function(value) {
        if ((value = toPosInt(value)) > maxTimeout) throw new TypeError(value + " exceeds maximum possible timeout");
        return value;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = 2147483647;
}, function(module, exports, __webpack_require__) {
    "use strict";
    var toPosInteger = __webpack_require__(10), lruQueue = __webpack_require__(172), extensions = __webpack_require__(7);
    extensions.max = function(max, conf, options) {
        var postfix, queue, hit;
        if (max = toPosInteger(max)) {
            queue = lruQueue(max);
            postfix = options.async && extensions.async || options.promise && extensions.promise ? "async" : "";
            conf.on("set" + postfix, hit = function(id) {
                void 0 !== (id = queue.hit(id)) && conf.delete(id);
            });
            conf.on("get" + postfix, hit);
            conf.on("delete" + postfix, queue.delete);
            conf.on("clear" + postfix, queue.clear);
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var toPosInt = __webpack_require__(10), create = Object.create, hasOwnProperty = Object.prototype.hasOwnProperty;
    module.exports = function(limit) {
        var size = 0, base = 1, queue = create(null), map = create(null), index = 0, del;
        limit = toPosInt(limit);
        return {
            hit: function(id) {
                var oldIndex = map[id], nuIndex = ++index;
                queue[nuIndex] = id;
                map[id] = nuIndex;
                if (!oldIndex) {
                    if (++size <= limit) return;
                    id = queue[base];
                    del(id);
                    return id;
                }
                delete queue[oldIndex];
                if (base === oldIndex) for (;!hasOwnProperty.call(queue, ++base); ) continue;
            },
            delete: del = function(id) {
                var oldIndex = map[id];
                if (oldIndex) {
                    delete queue[oldIndex];
                    delete map[id];
                    --size;
                    if (base === oldIndex) if (size) for (;!hasOwnProperty.call(queue, ++base); ) continue; else {
                        index = 0;
                        base = 1;
                    }
                }
            },
            clear: function() {
                size = 0;
                base = 1;
                queue = create(null);
                map = create(null);
                index = 0;
            }
        };
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var d = __webpack_require__(3), extensions = __webpack_require__(7), create = Object.create, defineProperties = Object.defineProperties;
    extensions.refCounter = function(ignore, conf, options) {
        var cache, postfix;
        cache = create(null);
        postfix = options.async && extensions.async || options.promise && extensions.promise ? "async" : "";
        conf.on("set" + postfix, (function(id, length) {
            cache[id] = length || 1;
        }));
        conf.on("get" + postfix, (function(id) {
            ++cache[id];
        }));
        conf.on("delete" + postfix, (function(id) {
            delete cache[id];
        }));
        conf.on("clear" + postfix, (function() {
            cache = {};
        }));
        defineProperties(conf.memoized, {
            deleteRef: d((function() {
                var id = conf.get(arguments);
                if (null === id) return null;
                if (!cache[id]) return null;
                if (!--cache[id]) {
                    conf.delete(id);
                    return !0;
                }
                return !1;
            })),
            getRefCount: d((function() {
                var id = conf.get(arguments);
                return null === id ? 0 : cache[id] ? cache[id] : 0;
            }))
        });
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var crypto = __webpack_require__(48), Charset = __webpack_require__(175);
    function safeRandomBytes(length) {
        for (;;) try {
            return crypto.randomBytes(length);
        } catch (e) {
            continue;
        }
    }
    exports.generate = function(options) {
        var charset = new Charset, length, chars, capitalization, string = "";
        if ("object" == typeof options) {
            length = options.length || 32;
            options.charset ? charset.setType(options.charset) : charset.setType("alphanumeric");
            options.capitalization && charset.setcapitalization(options.capitalization);
            options.readable && charset.removeUnreadable();
            charset.removeDuplicates();
        } else if ("number" == typeof options) {
            length = options;
            charset.setType("alphanumeric");
        } else {
            length = 32;
            charset.setType("alphanumeric");
        }
        for (var charsLen = charset.chars.length, maxByte = 256 - 256 % charsLen; length > 0; ) for (var buf = safeRandomBytes(Math.ceil(256 * length / maxByte)), i = 0; i < buf.length && length > 0; i++) {
            var randomByte = buf.readUInt8(i);
            if (randomByte < maxByte) {
                string += charset.chars.charAt(randomByte % charsLen);
                length--;
            }
        }
        return string;
    };
}, function(module, exports, __webpack_require__) {
    var arrayUniq = __webpack_require__(176);
    function Charset() {
        this.chars = "";
    }
    Charset.prototype.setType = function(type) {
        var chars, numbers = "0123456789", charsLower = "abcdefghijklmnopqrstuvwxyz", charsUpper = charsLower.toUpperCase(), hexChars = "abcdef";
        chars = "alphanumeric" === type ? numbers + charsLower + charsUpper : "numeric" === type ? numbers : "alphabetic" === type ? charsLower + charsUpper : "hex" === type ? numbers + "abcdef" : type;
        this.chars = chars;
    };
    Charset.prototype.removeUnreadable = function() {
        var unreadableChars = /[0OIl]/g;
        this.chars = this.chars.replace(unreadableChars, "");
    };
    Charset.prototype.setcapitalization = function(capitalization) {
        "uppercase" === capitalization ? this.chars = this.chars.toUpperCase() : "lowercase" === capitalization && (this.chars = this.chars.toLowerCase());
    };
    Charset.prototype.removeDuplicates = function() {
        var charMap = this.chars.split("");
        charMap = arrayUniq(charMap);
        this.chars = charMap.join("");
    };
    module.exports = exports = Charset;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function uniqNoSet(arr) {
        for (var ret = [], i = 0; i < arr.length; i++) -1 === ret.indexOf(arr[i]) && ret.push(arr[i]);
        return ret;
    }
    function uniqSet(arr) {
        var seen = new Set;
        return arr.filter((function(el) {
            if (!seen.has(el)) {
                seen.add(el);
                return !0;
            }
        }));
    }
    function uniqSetWithForEach(arr) {
        var ret = [];
        new Set(arr).forEach((function(el) {
            ret.push(el);
        }));
        return ret;
    }
    function doesForEachActuallyWork() {
        var ret = !1;
        new Set([ !0 ]).forEach((function(el) {
            ret = el;
        }));
        return !0 === ret;
    }
    "Set" in global ? "function" == typeof Set.prototype.forEach && doesForEachActuallyWork() ? module.exports = uniqSetWithForEach : module.exports = uniqSet : module.exports = uniqNoSet;
}, function(module, exports) {
    module.exports = require("pinejs-client-core");
}, function(module, exports, __webpack_require__) {
    var OMeta = __webpack_require__(9), SBVRLibs = __webpack_require__(37).SBVRLibs, _ = __webpack_require__(0);
    __webpack_require__(179);
    var SBVRParser = exports.SBVRParser = SBVRLibs._extend({
        EOL: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return function() {
                switch (this.anything()) {
                  case "\n":
                    return "\n";

                  case "\r":
                    return this._opt((function() {
                        return this._applyWithArgs("exactly", "\n");
                    }));

                  default:
                    throw this._fail();
                }
            }.call(this);
        },
        EOLSpaces: function() {
            var $elf = this, _fromIdx = this.input.idx, eol;
            eol = !1;
            this._many((function() {
                return this._or((function() {
                    this._apply("EOL");
                    return eol = !0;
                }), (function() {
                    return this._apply("space");
                }));
            }));
            return this._pred(eol);
        },
        IdentifierKey: function(identifier) {
            var $elf = this, _fromIdx = this.input.idx, index;
            index = this._or((function() {
                this._pred(Array.isArray(identifier[3]));
                this._pred("Number" == identifier[3][0]);
                return identifier[3][1];
            }), (function() {
                return "";
            }));
            return identifier[1] + "|" + identifier[2] + "|" + index;
        },
        Bind: function(identifier, bindings) {
            var $elf = this, _fromIdx = this.input.idx, binding, identifierKey, varNumber;
            identifierKey = this._applyWithArgs("IdentifierKey", identifier);
            varNumber = this.ruleVars[identifierKey];
            this._pred(null != varNumber);
            binding = [ "RoleBinding", identifier, varNumber ];
            this._opt((function() {
                this._pred(bindings);
                return bindings.push(binding);
            }));
            return binding;
        },
        spaces: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._many((function() {
                this._not((function() {
                    return this._apply("EOL");
                }));
                return this._apply("space");
            }));
        },
        Number: function() {
            var $elf = this, _fromIdx = this.input.idx, n;
            return this._or((function() {
                this._apply("spaces");
                n = this._consumedBy((function() {
                    return this._many1((function() {
                        return this._apply("digit");
                    }));
                }));
                return [ "Number", parseInt(n, 10) ];
            }), (function() {
                this._applyWithArgs("token", "one");
                return [ "Number", 1 ];
            }));
        },
        Real: function() {
            var $elf = this, _fromIdx = this.input.idx, n;
            this._apply("spaces");
            n = this._consumedBy((function() {
                this._opt((function() {
                    return this._applyWithArgs("exactly", "-");
                }));
                this._many1((function() {
                    return this._apply("digit");
                }));
                this._applyWithArgs("exactly", ".");
                return this._many1((function() {
                    return this._apply("digit");
                }));
            }));
            return [ "Real", Number(n) ];
        },
        Integer: function() {
            var $elf = this, _fromIdx = this.input.idx, n;
            this._apply("spaces");
            n = this._consumedBy((function() {
                this._opt((function() {
                    return this._applyWithArgs("exactly", "-");
                }));
                return this._many1((function() {
                    return this._apply("digit");
                }));
            }));
            return [ "Integer", Number(n) ];
        },
        Text: function() {
            var $elf = this, _fromIdx = this.input.idx, text;
            this._apply("spaces");
            this._applyWithArgs("exactly", '"');
            text = this._consumedBy((function() {
                return this._many1((function() {
                    return this._or((function() {
                        switch (this.anything()) {
                          case "\\":
                            return this._applyWithArgs("exactly", '"');

                          default:
                            throw this._fail();
                        }
                    }), (function() {
                        this._not((function() {
                            return this._applyWithArgs("exactly", '"');
                        }));
                        return this.anything();
                    }));
                }));
            }));
            this._applyWithArgs("exactly", '"');
            return [ "Text", text ];
        },
        Value: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._or((function() {
                return this._apply("Real");
            }), (function() {
                return this._apply("Integer");
            }), (function() {
                return this._apply("Text");
            }));
        },
        toSBVREOL: function() {
            var $elf = this, _fromIdx = this.input.idx;
            this._apply("spaces");
            return this._consumedBy((function() {
                return this._many((function() {
                    this._apply("spaces");
                    return this._or((function() {
                        return this._apply("InformalIdentifier");
                    }), (function() {
                        switch (this.anything()) {
                          case "'":
                            this._apply("InformalIdentifier");
                            return this._applyWithArgs("exactly", "'");

                          default:
                            throw this._fail();
                        }
                    }), (function() {
                        return this._many1((function() {
                            this._not((function() {
                                return this._apply("space");
                            }));
                            return this.anything();
                        }));
                    }));
                }));
            }));
        },
        toEOL: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._consumedBy((function() {
                return this._many((function() {
                    this._not((function() {
                        return this._apply("EOL");
                    }));
                    return this.anything();
                }));
            }));
        },
        token: function(x) {
            var $elf = this, _fromIdx = this.input.idx, s;
            this._apply("spaces");
            s = this._applyWithArgs("seq", x);
            this._lookahead((function() {
                return this._or((function() {
                    return this._apply("space");
                }), (function() {
                    return this._apply("end");
                }));
            }));
            return s;
        },
        AddIdentifier: function(identifierType, baseSynonym) {
            var $elf = this, _fromIdx = this.input.idx, identifier, startInput;
            startInput = this.input;
            identifier = (identifier = this._many1((function() {
                return this._apply("IdentifierPart");
            }))).join(" ");
            this._addToken(startInput, this.input, identifierType, []);
            return function() {
                return $elf._AddIdentifier(identifierType, identifier, baseSynonym);
            };
        },
        InformalIdentifier: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._applyWithArgs("Identifier", void 0, !0);
        },
        Identifier: function(factTypeSoFar, noAutoComplete) {
            var $elf = this, _fromIdx = this.input.idx, name, term;
            this._opt((function() {
                return this._not((function() {
                    return term = this._consumedBy((function() {
                        return this._opt((function() {
                            return this._applyWithArgs("Term", factTypeSoFar);
                        }));
                    }));
                }));
            }));
            this._opt((function() {
                return this._not((function() {
                    return name = this._consumedBy((function() {
                        return this._opt((function() {
                            return this._applyWithArgs("Name", factTypeSoFar);
                        }));
                    }));
                }));
            }));
            return this._or((function() {
                this._pred(term || name);
                return this._or((function() {
                    this._pred(term.length > name.length);
                    return this._applyWithArgs("Term", factTypeSoFar);
                }), (function() {
                    return this._applyWithArgs("Name", factTypeSoFar);
                }));
            }), (function() {
                this._pred(!noAutoComplete && void 0 !== this._getBranches());
                return this._or((function() {
                    return this._applyWithArgs("Term", factTypeSoFar);
                }), (function() {
                    return this._applyWithArgs("Name", factTypeSoFar);
                }));
            }));
        },
        Vocabulary: function() {
            var $elf = this, _fromIdx = this.input.idx, vocabulary;
            return [ "Vocabulary", vocabulary = this._apply("FindVocabulary") ];
        },
        Name: function(factTypeSoFar) {
            var $elf = this, _fromIdx = this.input.idx;
            return this._applyWithArgs("FindIdentifier", "Name", factTypeSoFar);
        },
        Term: function(factTypeSoFar) {
            var $elf = this, _fromIdx = this.input.idx, n, term;
            term = this._applyWithArgs("FindIdentifier", "Term", factTypeSoFar);
            this._opt((function() {
                n = this._consumedBy((function() {
                    return this._many1((function() {
                        return this._apply("digit");
                    }));
                }));
                return term.push([ "Number", Number(n) ]);
            }));
            return term;
        },
        FindIdentifier: function(identifierType, factTypeSoFar) {
            var $elf = this, _fromIdx = this.input.idx, identifier, quote;
            this._apply("spaces");
            quote = this._opt((function() {
                return this._applyWithArgs("exactly", "'");
            }));
            identifier = this._applyWithArgs("FindIdentifierNest", identifierType, factTypeSoFar);
            this._or((function() {
                return this._pred(!quote);
            }), (function() {
                switch (this.anything()) {
                  case "'":
                    return "'";

                  default:
                    throw this._fail();
                }
            }));
            return identifier;
        },
        FindIdentifierNest: function(identifierType, factTypeSoFar, identifierSoFar) {
            var $elf = this, _fromIdx = this.input.idx, identifierSoFar, part, vocabulary;
            part = this._apply("IdentifierPart");
            identifierSoFar = this._or((function() {
                this._pred(identifierSoFar);
                return identifierSoFar + " " + part;
            }), (function() {
                return part;
            }));
            this._pred(identifierSoFar.length <= this.longestIdentifier[identifierType]);
            return this._or((function() {
                return this._applyWithArgs("FindIdentifierNest", identifierType, factTypeSoFar, identifierSoFar);
            }), (function() {
                vocabulary = this._or((function() {
                    return this._applyWithArgs("FindVocabulary", identifierSoFar);
                }), (function() {
                    return this.currentVocabulary;
                }));
                return this._applyWithArgs("IsFactTypeIdentifier", [ identifierType, identifierSoFar, vocabulary ], factTypeSoFar);
            }));
        },
        FindVocabulary: function(identifier) {
            var $elf = this, _fromIdx = this.input.idx, bracket, vocabulary;
            this._apply("spaces");
            bracket = this._opt((function() {
                return this._applyWithArgs("exactly", "(");
            }));
            vocabulary = this._apply("FindVocabularyNest");
            this._pred(!identifier || this.vocabularies[vocabulary].IdentifierChildren.hasOwnProperty(identifier));
            this._or((function() {
                return this._pred(!bracket);
            }), (function() {
                switch (this.anything()) {
                  case ")":
                    return ")";

                  default:
                    throw this._fail();
                }
            }));
            return vocabulary;
        },
        FindVocabularyNest: function(vocabularySoFar) {
            var $elf = this, _fromIdx = this.input.idx, part, vocabularySoFar;
            part = this._apply("IdentifierPart");
            vocabularySoFar = this._or((function() {
                this._pred(vocabularySoFar);
                return vocabularySoFar + " " + part;
            }), (function() {
                return part;
            }));
            this._pred(vocabularySoFar.length <= this.longestIdentifier.Vocabulary);
            return this._or((function() {
                return this._applyWithArgs("FindVocabularyNest", vocabularySoFar);
            }), (function() {
                this._pred(this.vocabularies.hasOwnProperty(vocabularySoFar));
                return vocabularySoFar;
            }));
        },
        IdentifierPart: function() {
            var $elf = this, _fromIdx = this.input.idx, r;
            this._apply("spaces");
            return this._consumedBy((function() {
                return this._many1((function() {
                    r = this.anything();
                    return this._pred(r >= "a" && r <= "z" || r >= "A" && r <= "Z" || "-" === r);
                }));
            }));
        },
        addVerb: function() {
            var $elf = this, _fromIdx = this.input.idx;
            this._apply("ClearSuggestions");
            return this._applyWithArgs("Verb", !0);
        },
        Verb: function(factTypeSoFar) {
            var $elf = this, _fromIdx = this.input.idx, bracket, verb;
            this._apply("spaces");
            bracket = this._opt((function() {
                return this._applyWithArgs("exactly", "[");
            }));
            verb = this._applyWithArgs("FindVerb", factTypeSoFar, bracket);
            this._or((function() {
                return this._pred(!bracket);
            }), (function() {
                this._apply("spaces");
                return this._applyWithArgs("exactly", "]");
            }));
            return verb;
        },
        FindVerb: function(factTypeSoFar, bracketed, verbSoFar, negated) {
            var $elf = this, _fromIdx = this.input.idx, negated, part, verb, verbSoFar;
            this._opt((function() {
                this._pred(factTypeSoFar && !verbSoFar);
                this._or((function() {
                    return this._applyWithArgs("Keyword", "isn't");
                }), (function() {
                    return this._applyWithArgs("Keyword", "aren't");
                }));
                verbSoFar = "is";
                return negated = !0;
            }));
            this._apply("spaces");
            this._or((function() {
                return this._pred(bracketed);
            }), (function() {
                return this._not((function() {
                    return this._apply("Identifier");
                }));
            }));
            part = this._apply("IdentifierPart");
            verbSoFar = this._or((function() {
                this._pred(verbSoFar);
                return verbSoFar + " " + part;
            }), (function() {
                return this._verbForm(part);
            }));
            this._opt((function() {
                this._pred(factTypeSoFar && "is" === verbSoFar);
                this._apply("spaces");
                this._applyWithArgs("Keyword", "not");
                return negated = !0;
            }));
            return this._or((function() {
                return this._applyWithArgs("FindVerb", factTypeSoFar, bracketed, verbSoFar, negated);
            }), (function() {
                this._or((function() {
                    return this._pred(!0 === factTypeSoFar);
                }), (function() {
                    return this._applyWithArgs("IsVerb", factTypeSoFar, verbSoFar);
                }));
                return verb = [ "Verb", verbSoFar, !0 === negated ];
            }));
        },
        JoiningQuantifier: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._applyWithArgs("matchForAll", "Keyword", [ "and", "at", "most" ]);
        },
        Quantifier: function() {
            var $elf = this, _fromIdx = this.input.idx, m, n;
            return this._or((function() {
                this._applyWithArgs("matchForAny", "Keyword", [ "each", "a given" ]);
                return [ "UniversalQuantification" ];
            }), (function() {
                this._applyWithArgs("matchForAny", "Keyword", [ "a", "an", "some" ]);
                return [ "ExistentialQuantification" ];
            }), (function() {
                this._applyWithArgs("matchForAll", "Keyword", [ "at", "most" ]);
                return [ "AtMostNQuantification", [ "MaximumCardinality", n = this._apply("Number") ] ];
            }), (function() {
                this._applyWithArgs("matchForAll", "Keyword", [ "at", "least" ]);
                n = this._apply("Number");
                return this._or((function() {
                    this._apply("JoiningQuantifier");
                    m = this._apply("Number");
                    return [ "NumericalRangeQuantification", [ "MinimumCardinality", n ], [ "MaximumCardinality", m ] ];
                }), (function() {
                    return [ "AtLeastNQuantification", [ "MinimumCardinality", n ] ];
                }));
            }), (function() {
                this._applyWithArgs("matchForAll", "Keyword", [ "more", "than" ]);
                ++(n = this._apply("Number"))[1];
                return [ "AtLeastNQuantification", [ "MinimumCardinality", n ] ];
            }), (function() {
                this._applyWithArgs("Keyword", "exactly");
                return [ "ExactQuantification", [ "Cardinality", n = this._apply("Number") ] ];
            }), (function() {
                this._applyWithArgs("Keyword", "no");
                return [ "ExactQuantification", [ "Cardinality", [ "Number", 0 ] ] ];
            }));
        },
        Keyword: function(word, noToken) {
            var $elf = this, _fromIdx = this.input.idx;
            return this._or((function() {
                this._pred(!0 === noToken);
                return this._applyWithArgs("seq", word);
            }), (function() {
                this._pred(!0 !== noToken);
                return this._applyWithArgs("token", word);
            }));
        },
        addThat: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._applyWithArgs("Keyword", "that");
        },
        addThe: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._applyWithArgs("Keyword", "the");
        },
        DisableCommas: function(bool) {
            var $elf = this, _fromIdx = this.input.idx;
            return this.disableCommas = bool;
        },
        addComma: function(force) {
            var $elf = this, _fromIdx = this.input.idx;
            this._pred(force || !this.disableCommas);
            return this._applyWithArgs("Keyword", ",");
        },
        CreateVar: function(identifier) {
            var $elf = this, _fromIdx = this.input.idx, identifierKey, varNumber;
            identifierKey = this._applyWithArgs("IdentifierKey", identifier);
            return [ "Variable", [ "Number", varNumber = this._or((function() {
                this._pred("|" !== identifierKey.slice(-1));
                this._pred(this.ruleVars[identifierKey]);
                return this.ruleVars[identifierKey];
            }), (function() {
                return this.ruleVars[identifierKey] = this.ruleVarsCount++;
            })) ], identifier ];
        },
        EmbedVar: function(identifier, data) {
            var $elf = this, _fromIdx = this.input.idx, identifierKey;
            identifierKey = this._applyWithArgs("IdentifierKey", identifier);
            return this.ruleVars[identifierKey] = data;
        },
        IsAtomicFormulation: function(factType, bindings) {
            var $elf = this, _fromIdx = this.input.idx, realFactType;
            realFactType = this._applyWithArgs("IsFactType", factType);
            this._pred(realFactType);
            return [ "AtomicFormulation" ].concat([ [ "FactType" ].concat(factType) ], bindings);
        },
        ClosedProjection: function(identifier, bind) {
            var $elf = this, _fromIdx = this.input.idx, bindings, factType, verb;
            return this._or((function() {
                this._apply("addThat");
                return this._or((function() {
                    return this._applyWithArgs("Junction", "VerbContinuation", [ [ identifier ], [ bind ] ]);
                }), (function() {
                    return this._applyWithArgs("Junction", "RuleBody", [ [], [], identifier, bind ]);
                }));
            }), (function() {
                this._applyWithArgs("Keyword", "of");
                factType = [ identifier ];
                verb = "is of";
                this._applyWithArgs("IsVerb", factType, verb);
                factType.push([ "Verb", verb, !1 ]);
                bindings = [ bind ];
                return this._or((function() {
                    return this._applyWithArgs("Junction", "RuleBody", [ factType, bindings ]);
                }), (function() {
                    return this._applyWithArgs("IsAtomicFormulation", factType, bindings);
                }));
            }));
        },
        TermEntity: function(factType, bindings) {
            var $elf = this, _fromIdx = this.input.idx, bind, term, thatLF, varLF;
            term = this._applyWithArgs("Term", factType);
            varLF = this._applyWithArgs("CreateVar", term);
            bind = this._applyWithArgs("Bind", term, bindings);
            this._opt((function() {
                thatLF = this._applyWithArgs("ClosedProjection", term, bind);
                varLF.push(thatLF);
                return this._opt((function() {
                    this._pred(factType);
                    return this._applyWithArgs("addComma", !1);
                }));
            }));
            return {
                term: term,
                lf: varLF
            };
        },
        RuleBody: function(factType, bindings, parentIdentifier, parentBind) {
            var $elf = this, _fromIdx = this.input.idx, bind, data, identifier, lf, quant, termEntity;
            this._or((function() {
                quant = this._apply("Quantifier");
                termEntity = this._applyWithArgs("TermEntity", factType, bindings);
                return factType.push(termEntity.term);
            }), (function() {
                this._apply("addThe");
                identifier = this._applyWithArgs("Identifier", factType);
                this._or((function() {
                    return this._applyWithArgs("Bind", identifier, bindings);
                }), (function() {
                    this._applyWithArgs("EmbedVar", identifier, identifier);
                    return this._applyWithArgs("Bind", identifier, bindings);
                }));
                return factType.push(identifier);
            }), (function() {
                data = this._apply("Value");
                (identifier = this._applyWithArgs("IsFactTypeIdentifier", [ "Term", data[0], "Type" ], factType)).push(data);
                this._applyWithArgs("EmbedVar", identifier, data);
                (bind = this._applyWithArgs("Bind", identifier, bindings))[2] = data;
                return factType.push(identifier);
            }));
            lf = this._or((function() {
                return this._applyWithArgs("Junction", "VerbContinuation", [ factType, bindings, parentIdentifier, parentBind ]);
            }), (function() {
                return this._applyWithArgs("IsAtomicFormulation", factType, bindings);
            }));
            return null == quant ? lf : quant.concat([ termEntity.lf, lf ]);
        },
        VerbContinuation: function(factType, bindings, parentIdentifier, parentBind) {
            var $elf = this, _fromIdx = this.input.idx, v;
            v = this._applyWithArgs("Verb", factType);
            factType.push(v);
            (function() {
                if (null != parentIdentifier) {
                    factType.push(parentIdentifier);
                    bindings.push(parentBind);
                }
            }).call(this);
            return this._or((function() {
                return this._applyWithArgs("Junction", "RuleBody", [ factType, bindings ]);
            }), (function() {
                return this._applyWithArgs("IsAtomicFormulation", factType, bindings);
            }));
        },
        Modifier: function() {
            var $elf = this, _fromIdx = this.input.idx, r;
            this._applyWithArgs("token", "It");
            this._applyWithArgs("token", "is");
            r = this._or((function() {
                this._applyWithArgs("token", "obligatory");
                return [ "ObligationFormulation" ];
            }), (function() {
                this._applyWithArgs("token", "necessary");
                return [ "NecessityFormulation" ];
            }), (function() {
                this._or((function() {
                    return this._applyWithArgs("token", "prohibited");
                }), (function() {
                    return this._applyWithArgs("token", "forbidden");
                }));
                return [ "ObligationFormulation", [ "LogicalNegation" ] ];
            }), (function() {
                this._or((function() {
                    return this._applyWithArgs("token", "impossible");
                }), (function() {
                    this._applyWithArgs("token", "not");
                    return this._applyWithArgs("token", "possible");
                }));
                return [ "NecessityFormulation", [ "LogicalNegation" ] ];
            }), (function() {
                this._applyWithArgs("token", "possible");
                return [ "PossibilityFormulation" ];
            }), (function() {
                this._applyWithArgs("token", "permitted");
                return [ "PermissibilityFormulation" ];
            }));
            this._applyWithArgs("token", "that");
            return r;
        },
        Disjunction: function() {
            var $elf = this, _fromIdx = this.input.idx;
            this._applyWithArgs("Keyword", "or");
            return "Disjunction";
        },
        Conjunction: function() {
            var $elf = this, _fromIdx = this.input.idx;
            this._applyWithArgs("Keyword", "and");
            return "Conjunction";
        },
        JunctionType: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._or((function() {
                return this._apply("Disjunction");
            }), (function() {
                return this._apply("Conjunction");
            }));
        },
        SerialCommaCheck: function() {
            var $elf = this, _fromIdx = this.input.idx;
            this._applyWithArgs("exactly", ",");
            return this._or((function() {
                return this._applyWithArgs("token", "and");
            }), (function() {
                return this._applyWithArgs("token", "or");
            }));
        },
        UpcomingCommaJunction: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._lookahead((function() {
                return this._or((function() {
                    this._many((function() {
                        this._not((function() {
                            return this._apply("EOL");
                        }));
                        this._not((function() {
                            return this._apply("SerialCommaCheck");
                        }));
                        return this.anything();
                    }));
                    this._apply("SerialCommaCheck");
                    return !0;
                }), (function() {
                    return !1;
                }));
            }));
        },
        SimpleJunction: function(ruleName, args) {
            var $elf = this, _fromIdx = this.input.idx, junctioned, result, type;
            result = this._applyWithArgs.apply(this, [ ruleName ].concat(_.cloneDeep(args)));
            return this._or((function() {
                type = this._apply("JunctionType");
                junctioned = this._applyWithArgs("SimpleJunction", ruleName, args);
                return [ type, result, junctioned ];
            }), (function() {
                return result;
            }));
        },
        Junction: function(ruleName, args) {
            var $elf = this, _fromIdx = this.input.idx, commaSeparated, junctioned, result, type, upcoming;
            upcoming = this._apply("UpcomingCommaJunction");
            this._applyWithArgs("DisableCommas", upcoming || this.disableCommas);
            result = this._opt((function() {
                result = this._applyWithArgs("SimpleJunction", ruleName, args);
                return this._or((function() {
                    this._pred(upcoming);
                    commaSeparated = this._many((function() {
                        this._applyWithArgs("addComma", !0);
                        return this._applyWithArgs("SimpleJunction", ruleName, args);
                    }));
                    this._applyWithArgs("addComma", !0);
                    type = this._apply("JunctionType");
                    junctioned = this._applyWithArgs("Junction", ruleName, args, !0);
                    return [ type, result ].concat(commaSeparated).concat([ junctioned ]);
                }), (function() {
                    return result;
                }));
            }));
            upcoming = this._apply("UpcomingCommaJunction");
            this._applyWithArgs("DisableCommas", upcoming);
            this._pred(result);
            return result;
        },
        StartRule: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return function() {
                switch (this.anything()) {
                  case "R":
                    switch (this.anything()) {
                      case ":":
                        return "R:";

                      case "u":
                        this._applyWithArgs("exactly", "l");
                        this._applyWithArgs("exactly", "e");
                        this._applyWithArgs("exactly", ":");
                        return "Rule:";

                      default:
                        throw this._fail();
                    }

                  default:
                    throw this._fail();
                }
            }.call(this);
        },
        NewRule: function() {
            var $elf = this, _fromIdx = this.input.idx, mod, ruleLF, ruleText;
            this._apply("StartRule");
            this._apply("spaces");
            ruleText = this._lookahead((function() {
                return this._apply("toEOL");
            }));
            this.ruleVars = {};
            this.ruleVarsCount = 0;
            mod = this._apply("Modifier");
            ruleLF = this._applyWithArgs("Junction", "RuleBody", [ [], [] ]);
            this._apply("EOLTerminator");
            2 === (mod = _.cloneDeep(mod)).length ? mod[1][1] = ruleLF : mod[1] = ruleLF;
            return [ "Rule", mod, [ "StructuredEnglish", ruleText ] ];
        },
        StartFactType: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return function() {
                switch (this.anything()) {
                  case "F":
                    switch (this.anything()) {
                      case ":":
                        return "F:";

                      case "a":
                        this._applyWithArgs("exactly", "c");
                        this._applyWithArgs("exactly", "t");
                        this._applyWithArgs("exactly", " ");
                        this._applyWithArgs("exactly", "t");
                        this._applyWithArgs("exactly", "y");
                        this._applyWithArgs("exactly", "p");
                        this._applyWithArgs("exactly", "e");
                        this._applyWithArgs("exactly", ":");
                        return "Fact type:";

                      default:
                        throw this._fail();
                    }

                  default:
                    throw this._fail();
                }
            }.call(this);
        },
        NewFactType: function() {
            var $elf = this, _fromIdx = this.input.idx, factType, identifier, v;
            this._apply("StartFactType");
            factType = [];
            this._many1((function() {
                identifier = this._apply("Identifier");
                v = this._apply("addVerb");
                return factType.push(identifier, v);
            }));
            this._opt((function() {
                identifier = this._apply("Identifier");
                return factType.push(identifier);
            }));
            return function() {
                $elf.AddFactType(factType, factType);
                var attributes = [ "Attributes" ];
                if (3 === factType.length && ("has" === factType[1][1] || "is of" === factType[1][1])) {
                    synFactType = _.cloneDeep(factType);
                    synFactType.reverse();
                    "has" === synFactType[1][1] ? synFactType[1][1] = "is of" : synFactType[1][1] = "has";
                    $elf.AddFactType(synFactType, factType);
                    attributes.push([ "SynonymousForm", synFactType ]);
                }
                return [ "FactType" ].concat(factType).concat([ attributes ]);
            };
        },
        StartVocabulary: function() {
            var $elf = this, _fromIdx = this.input.idx;
            this._applyWithArgs("exactly", "V");
            this._applyWithArgs("exactly", "o");
            this._applyWithArgs("exactly", "c");
            this._applyWithArgs("exactly", "a");
            this._applyWithArgs("exactly", "b");
            this._applyWithArgs("exactly", "u");
            this._applyWithArgs("exactly", "l");
            this._applyWithArgs("exactly", "a");
            this._applyWithArgs("exactly", "r");
            this._applyWithArgs("exactly", "y");
            this._applyWithArgs("exactly", ":");
            return "Vocabulary";
        },
        StartTerm: function() {
            var $elf = this, _fromIdx = this.input.idx;
            (function() {
                switch (this.anything()) {
                  case "T":
                    switch (this.anything()) {
                      case ":":
                        return "T:";

                      case "e":
                        this._applyWithArgs("exactly", "r");
                        this._applyWithArgs("exactly", "m");
                        this._applyWithArgs("exactly", ":");
                        return "Term:";

                      default:
                        throw this._fail();
                    }

                  default:
                    throw this._fail();
                }
            }).call(this);
            return "Term";
        },
        StartName: function() {
            var $elf = this, _fromIdx = this.input.idx;
            (function() {
                switch (this.anything()) {
                  case "N":
                    switch (this.anything()) {
                      case ":":
                        return "N:";

                      case "a":
                        this._applyWithArgs("exactly", "m");
                        this._applyWithArgs("exactly", "e");
                        this._applyWithArgs("exactly", ":");
                        return "Name:";

                      default:
                        throw this._fail();
                    }

                  default:
                    throw this._fail();
                }
            }).call(this);
            return "Name";
        },
        NewIdentifier: function() {
            var $elf = this, _fromIdx = this.input.idx, func, identifierType;
            identifierType = this._or((function() {
                return this._apply("StartVocabulary");
            }), (function() {
                return this._apply("StartTerm");
            }), (function() {
                return this._apply("StartName");
            }));
            this._apply("ClearSuggestions");
            func = this._applyWithArgs("AddIdentifier", identifierType);
            return function() {
                return func().concat([ [ "Attributes" ] ]);
            };
        },
        NewAttribute: function() {
            var $elf = this, _fromIdx = this.input.idx, attrName, attrValOrFunc, currentLine;
            currentLine = _.last(this.lines);
            attrName = (attrName = this._applyWithArgs("AllowedAttrs", currentLine[0])).replace(/ /g, "");
            this._apply("spaces");
            attrValOrFunc = this._applyWithArgs("ApplyFirstExisting", [ "Attr" + attrName, "DefaultAttr" ]);
            return function() {
                var lastLine = $elf.lines.pop(), attrVal = "function" == typeof attrValOrFunc ? attrValOrFunc(lastLine) : attrValOrFunc;
                _.last(lastLine).push([ attrName, attrVal ]);
                return lastLine;
            };
        },
        AllowedAttrs: function(termOrFactType) {
            var $elf = this, _fromIdx = this.input.idx, attrName;
            return (attrName = this._applyWithArgs("matchForAny", "seq", this.branches.AllowedAttrs.call(this, termOrFactType))).replace(":", "");
        },
        DefaultAttr: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._apply("toSBVREOL");
        },
        AttrConceptType: function() {
            var $elf = this, _fromIdx = this.input.idx, term;
            term = this._apply("Term");
            return function(currentLine) {
                var identifier;
                if ("FactType" === currentLine[0]) {
                    var attributes = _.last(currentLine), termForm = _.find(attributes, [ 0, "TermForm" ]);
                    if (!termForm) throw new Error("Cannot have a concept type for a fact type that does not have a term-form.");
                    identifier = termForm[1];
                } else identifier = currentLine.slice(0, 3);
                var identifierName = identifier[1], identifierVocab = identifier[2];
                if ($elf.vocabularies[identifierVocab].ConceptTypes.hasOwnProperty(identifier)) throw new Error("Two concept type attributes");
                if ("FactType" !== identifier[0]) {
                    if ($elf.IdentifiersEqual(identifier, term)) throw new Error("A term cannot have itself as its concept type");
                    var termName = term[1], termVocab = term[2];
                    $elf.vocabularies[identifierVocab].ConceptTypes[identifier] = term;
                    $elf.vocabularies[termVocab].IdentifierChildren[termName].push(identifier.slice(1));
                }
                return term;
            };
        },
        AttrDefinition: function() {
            var $elf = this, _fromIdx = this.input.idx, moreValues, termEntity, value, values;
            return this._or((function() {
                this._opt((function() {
                    return this._apply("addThe");
                }));
                this.ruleVars = {};
                this.ruleVarsCount = 0;
                termEntity = this._apply("TermEntity");
                this._apply("EOLTerminator");
                return function(currentLine) {
                    if ("FactType" !== currentLine[0]) {
                        $elf.vocabularies[currentLine[2]].ConceptTypes[currentLine.slice(0, 3)] = termEntity.term;
                        $elf.vocabularies[currentLine[2]].IdentifierChildren[termEntity.term[1]].push([ currentLine[1], currentLine[2] ]);
                    }
                    return termEntity.lf;
                };
            }), (function() {
                value = this._apply("Value");
                values = this._many((function() {
                    this._apply("addComma");
                    return this._apply("Value");
                }));
                this._or((function() {
                    return moreValues = this._many1((function() {
                        this._opt((function() {
                            return this._apply("addComma");
                        }));
                        this._apply("Disjunction");
                        return this._apply("Value");
                    }));
                }), (function() {
                    return this._pred(0 === values.length);
                }));
                return [ "Enum", value ].concat(values, moreValues);
            }));
        },
        AttrGuidanceType: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._applyWithArgs("matchForAny", "seq", this.branches.AttrGuidanceType);
        },
        AttrNecessity: function() {
            var $elf = this, _fromIdx = this.input.idx, lf, ruleText;
            return this._or((function() {
                ruleText = this._lookahead((function() {
                    return this._apply("toEOL");
                }));
                this.ruleVars = {};
                this.ruleVarsCount = 0;
                lf = this._applyWithArgs("RuleBody", [], []);
                this._apply("EOLTerminator");
                return [ "Rule", [ "NecessityFormulation", lf ], [ "StructuredEnglish", "It is necessary that " + ruleText ] ];
            }), (function() {
                return this._apply("toSBVREOL");
            }));
        },
        AttrReferenceScheme: function() {
            var $elf = this, _fromIdx = this.input.idx, t;
            return this._or((function() {
                t = this._apply("Term");
                this._apply("EOLTerminator");
                return t;
            }), (function() {
                return this._apply("toSBVREOL");
            }));
        },
        AttrSynonym: function() {
            var $elf = this, _fromIdx = this.input.idx, currentLine;
            currentLine = _.last(this.lines);
            return this._applyWithArgs("AddIdentifier", currentLine[0], currentLine[1]);
        },
        AttrSynonymousForm: function() {
            var $elf = this, _fromIdx = this.input.idx, factType, identifier, v;
            factType = [];
            this._many1((function() {
                identifier = this._apply("Identifier");
                v = this._apply("addVerb");
                return factType.push(identifier, v);
            }));
            this._opt((function() {
                identifier = this._apply("Identifier");
                return factType.push(identifier);
            }));
            return function(currentLine) {
                $elf.AddFactType(factType, currentLine.slice(1, -1));
                return factType;
            };
        },
        AttrTermForm: function() {
            var $elf = this, _fromIdx = this.input.idx, func;
            func = this._applyWithArgs("AddIdentifier", "Term");
            return function(currentLine) {
                for (var term = func(), i = 0; i < currentLine.length; i++) if ("Term" === currentLine[i][0]) {
                    var factType = [ term, [ "Verb", "has", !1 ], currentLine[i] ];
                    $elf.AddFactType(factType, factType);
                }
                return term;
            };
        },
        StartComment: function() {
            var $elf = this, _fromIdx = this.input.idx;
            this._applyWithArgs("exactly", "-");
            this._applyWithArgs("exactly", "-");
            return "--";
        },
        NewComment: function() {
            var $elf = this, _fromIdx = this.input.idx;
            this._apply("StartComment");
            return this._apply("toEOL");
        },
        EOLTerminator: function() {
            var $elf = this, _fromIdx = this.input.idx;
            this._opt((function() {
                return this._apply("Terminator");
            }));
            this._apply("spaces");
            return this._lookahead((function() {
                return this._or((function() {
                    return this._apply("EOL");
                }), (function() {
                    return this._apply("end");
                }));
            }));
        },
        Terminator: function() {
            var $elf = this, _fromIdx = this.input.idx;
            this._apply("spaces");
            return this._applyWithArgs("Keyword", ".", !0);
        },
        space: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._or((function() {
                return SBVRLibs._superApply(this, "space");
            }), (function() {
                return this._apply("NewComment");
            }));
        },
        Line: function() {
            var $elf = this, _fromIdx = this.input.idx, func, l;
            this._apply("spaces");
            l = this._or((function() {
                return (func = this._or((function() {
                    return this._apply("NewIdentifier");
                }), (function() {
                    return this._apply("NewFactType");
                }), (function() {
                    return this._apply("NewAttribute");
                })))();
            }), (function() {
                return this._apply("NewRule");
            }));
            this._apply("ClearSuggestions");
            this.lines.push(l);
            return l;
        },
        Process: function() {
            var $elf = this, _fromIdx = this.input.idx;
            this._opt((function() {
                return this._apply("EOLSpaces");
            }));
            this._opt((function() {
                return this._apply("Line");
            }));
            this._many((function() {
                this._apply("EOLSpaces");
                return this._apply("Line");
            }));
            this._many((function() {
                return this._apply("space");
            }));
            this._apply("end");
            return this.lines;
        }
    });
    SBVRParser.ClearSuggestions = function() {};
    SBVRParser.initialize = function() {
        this.builtInVocab = "";
        this.builtInVocabInputHead = "";
        this.allowedAttrLists = _.cloneDeep(defaultAllowedAttrLists);
        this.reset();
    };
    SBVRParser._enableTokens = function() {
        SBVRLibs._enableTokens.call(this, [ "StartVocabulary", "StartTerm", "StartName", "StartFactType", "StartRule", "NewComment", "Vocabulary", "Term", "Name", "Modifier", "Verb", "Keyword", "AllowedAttrs", "AttrGuidanceType", "Number", "Value" ]);
    };
    SBVRParser._sideEffectingRules = [ "Process", "Line" ];
    SBVRParser._AddIdentifier = function(identifierType, identifier, baseSynonym) {
        null == baseSynonym && (baseSynonym = identifier);
        if ("Vocabulary" === identifierType) this.AddVocabulary(identifier, baseSynonym); else {
            var vocabulary = this.vocabularies[this.currentVocabulary];
            vocabulary.IdentifierChildren.hasOwnProperty(identifier) && this._pred(!1);
            baseSynonym === identifier ? vocabulary.IdentifierChildren[baseSynonym] = [] : vocabulary.IdentifierChildren[identifier] = vocabulary.IdentifierChildren[baseSynonym];
            vocabulary[identifierType][identifier] = baseSynonym;
        }
        this.longestIdentifier[identifierType] = Math.max(identifier.length, identifier.pluralize().length, this.longestIdentifier[identifierType]);
        return "Vocabulary" === identifierType ? [ identifierType, identifier ] : [ identifierType, identifier, this.currentVocabulary ];
    };
    SBVRParser.BaseSynonym = function(identifier) {
        var identifierType = identifier[0], identifierName = identifier[1], vocabulary = identifier[2], identifiers = this.vocabularies[vocabulary][identifierType];
        if (identifiers.hasOwnProperty(identifierName)) identifierName = identifiers[identifierName]; else {
            identifierName = identifierName.singularize();
            this._pred(identifiers.hasOwnProperty(identifierName));
            identifierName = identifiers[identifierName];
        }
        return [ identifierType, identifierName, vocabulary ];
    };
    SBVRParser.IsFactTypeIdentifier = function(identifier, factTypeSoFar) {
        var identifierType = identifier[0], vocabulary = identifier[2], baseIdentifier = this.BaseSynonym(identifier), identifiers = this.branches[identifierType].call(this, factTypeSoFar, vocabulary);
        this._pred(-1 !== identifiers.indexOf(baseIdentifier[1]));
        return baseIdentifier;
    };
    SBVRParser.IsVerb = function(factTypeSoFar, verb) {
        verb = [ "Verb", verb ];
        var currentLevel = this._traverseFactType(factTypeSoFar);
        this._pred(!1 !== currentLevel);
        if (!currentLevel.hasOwnProperty(verb)) {
            this._pred(currentLevel.hasOwnProperty("__valid"));
            return this.IsVerb([], verb);
        }
    };
    SBVRParser._verbForm = function(verb) {
        return "are" === verb ? "is" : "have" === verb ? "has" : "are " === verb.slice(0, 4) ? "is " + verb.slice(4) : verb;
    };
    SBVRParser.IsFactType = function(factType) {
        var currentLevel = this._traverseFactType(factType);
        return !1 !== currentLevel && currentLevel.__valid;
    };
    var removeRegex = new RegExp("^(?:" + [ [ "Term", "" ].toString(), [ "Name", "" ].toString(), [ "Verb", "" ].toString() ].join("|") + ")(.*?)(?:,(.*))?$"), defaultAllowedAttrLists = [ "Concept Type:", "Definition:", "Definition (Informal):", "Description:", "Dictionary Basis:", "Example:", "General Concept:", "Namespace URI:", "Necessity:", "Note:", "Possibility:", "Reference Scheme:", "See:", "Source:", "Subject Field:" ];
    defaultAllowedAttrLists = {
        Term: [ "Synonym:" ].concat(defaultAllowedAttrLists),
        Name: [ "Synonym:" ].concat(defaultAllowedAttrLists),
        FactType: [ "Synonymous Form:", "Term Form:" ].concat(defaultAllowedAttrLists),
        Rule: [ "Rule Name:", "Guidance Type:", "Source:", "Synonymous Statement:", "Note:", "Example:", "Enforcement Level:" ]
    };
    var getValidFactTypeParts = function getValidFactTypeParts(vocabulary, identifierType, factTypeSoFar) {
        var vocabularies = this.vocabularies;
        if (null == factTypeSoFar || 0 === factTypeSoFar.length) {
            var identifiers;
            identifiers = null == vocabulary ? vocabularies[this.currentVocabulary][identifierType] : vocabularies[vocabulary][identifierType];
            return Object.keys(identifiers);
        }
        var factTypePart, currentLevel = this._traverseFactType(factTypeSoFar), factTypeParts = {}, followChildrenChain = function(vocabulary, identifier) {
            var identifiers = (vocabulary = vocabularies[vocabulary])[identifierType];
            identifiers.hasOwnProperty(identifier) && (factTypeParts[identifiers[identifier]] = !0);
            for (var i = 0; i < vocabulary.IdentifierChildren[identifier].length; i++) {
                var child = vocabulary.IdentifierChildren[identifier][i];
                followChildrenChain(child[1], child[0]);
            }
        };
        for (factTypePart in currentLevel) if (currentLevel.hasOwnProperty(factTypePart)) {
            var matches = removeRegex.exec(factTypePart), factTypePartVocabulary;
            if (null != matches) {
                factTypePart = matches[1];
                if (matches[2]) {
                    factTypePartVocabulary = matches[2];
                    followChildrenChain(factTypePartVocabulary, factTypePart);
                } else factTypeParts[factTypePart] = !0;
            }
        }
        return Object.keys(factTypeParts);
    };
    SBVRParser.reset = function() {
        SBVRLibs.initialize.call(this);
        this.branches = {
            ClearSuggestions: [],
            StartVocabulary: [ "Vocabulary:" ],
            StartTerm: [ "Term:      " ],
            StartName: [ "Name:      " ],
            StartFactType: [ "Fact type: " ],
            StartRule: [ "Rule:      " ],
            Vocabulary: function(factTypeSoFar) {
                return Object.keys(this.vocabularies);
            },
            Term: function(factTypeSoFar, vocabulary) {
                return getValidFactTypeParts.call(this, vocabulary, "Term", factTypeSoFar);
            },
            Name: function(factTypeSoFar, vocabulary) {
                return getValidFactTypeParts.call(this, vocabulary, "Name", factTypeSoFar);
            },
            Verb: function(factTypeSoFar, vocabulary) {
                return !0 === factTypeSoFar ? [] : getValidFactTypeParts.call(this, vocabulary, "Verb", factTypeSoFar);
            },
            AllowedAttrs: function(termOrFactType) {
                return this.allowedAttrLists.hasOwnProperty(termOrFactType) ? this.allowedAttrLists[termOrFactType] : null == termOrFactType ? this.allowedAttrLists.Term.concat(this.allowedAttrLists.Name, this.allowedAttrLists.FactType) : [];
            },
            AttrGuidanceType: [ "operative business rule", "structural business rule", "advice of permission", "advice of possibility", "advice of optionality", "advice of contingency" ],
            Modifier: [ "It is obligatory that", "It is necessary that", "It is prohibited that", "It is forbidden that", "It is impossible that", "It is not possible that", "It is possible that", "It is permitted that" ],
            Quantifier: [ "each", "a", "a given", "an", "some", "at most", "at least", "more than", "exactly", "no" ],
            JoiningQuantifier: [ "and at most" ],
            Number: [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "one" ],
            addThat: [ "that", "that the" ],
            addThe: [ "the" ],
            addComma: [ "," ],
            Disjunction: [ "or" ],
            Conjunction: [ "and" ],
            Terminator: [ "." ]
        };
        this.longestIdentifier = {
            Vocabulary: 0,
            Term: 0,
            Name: 0
        };
        this.ruleVars = {};
        this.ruleVarsCount = 0;
        this.lines = [ "Model" ];
        this.disableCommas = !1;
        var origInputHead = this.inputHead;
        if ("" !== this.builtInVocab) {
            this.inputHead = this.builtInVocabInputHead;
            this.matchAll(this.builtInVocab, "Process");
            this.builtInVocabInputHead = this.inputHead;
        }
        this.inputHead = null;
        this.inputHead = null;
        this.matchAll("Vocabulary: Default", "Process");
        this.inputHead = origInputHead;
    };
    SBVRParser.AddBuiltInVocab = function(vocabulary) {
        try {
            var origInputHead = this.inputHead;
            vocabulary += "\n";
            this.matchAll(vocabulary, "Process");
            this.inputHead = origInputHead;
            this.builtInVocab += vocabulary;
        } catch (e) {
            throw e;
        } finally {
            this.reset();
        }
    };
    SBVRParser.AddCustomAttribute = function(attributeName, attachedTo) {
        if (null == attachedTo) for (attachedTo in this.allowedAttrLists) this.allowedAttrLists.hasOwnProperty(attachedTo) && this.allowedAttrLists[attachedTo].push(attributeName); else {
            if (!this.allowedAttrLists.hasOwnProperty(attachedTo)) throw new Error("Unknown attachment");
            this.allowedAttrLists[attachedTo].push(attributeName);
        }
    };
    SBVRParser.matchForAny = function(rule, arr) {
        for (var $elf = this, origInput = this.input, ref = {}, result = ref, idx = 0; idx < arr.length; idx++) {
            try {
                this.input = origInput;
                result = this._applyWithArgs.call(this, rule, arr[idx]);
            } catch (e) {
                if (!(e instanceof SyntaxError)) throw e;
            }
            if (result !== ref) return result;
        }
        throw this._fail();
    };
    SBVRParser.matchForAll = function(rule, arr) {
        for (var idx = 0; idx < arr.length; idx++) this._applyWithArgs.call(this, rule, arr[idx]);
    };
    SBVRParser.exactly = function(wanted) {
        if (wanted.toLowerCase() === this._apply("lowerCaseAnything")) return wanted;
        throw this._fail();
    };
    SBVRParser._disablePrependingInput();
}, function(module, exports) {
    "undefined" == typeof window || window.InflectionJS || (window.InflectionJS = null);
    InflectionJS = {
        uncountable_words: [ "equipment", "information", "rice", "money", "species", "series", "fish", "sheep", "moose", "deer", "news" ],
        plural_rules: [ [ new RegExp("(m)an$", "gi"), "$1en" ], [ new RegExp("(pe)rson$", "gi"), "$1ople" ], [ new RegExp("(child)$", "gi"), "$1ren" ], [ new RegExp("^(ox)$", "gi"), "$1en" ], [ new RegExp("(ax|test)is$", "gi"), "$1es" ], [ new RegExp("(octop|vir)us$", "gi"), "$1i" ], [ new RegExp("(alias|status)$", "gi"), "$1es" ], [ new RegExp("(bu)s$", "gi"), "$1ses" ], [ new RegExp("(buffal|tomat|potat)o$", "gi"), "$1oes" ], [ new RegExp("([ti])um$", "gi"), "$1a" ], [ new RegExp("sis$", "gi"), "ses" ], [ new RegExp("(?:([^f])fe|([lr])f)$", "gi"), "$1$2ves" ], [ new RegExp("(hive)$", "gi"), "$1s" ], [ new RegExp("([^aeiouy]|qu)y$", "gi"), "$1ies" ], [ new RegExp("(x|ch|ss|sh)$", "gi"), "$1es" ], [ new RegExp("(matr|vert|ind)ix|ex$", "gi"), "$1ices" ], [ new RegExp("([m|l])ouse$", "gi"), "$1ice" ], [ new RegExp("(quiz)$", "gi"), "$1zes" ], [ new RegExp("s$", "gi"), "s" ], [ new RegExp("$", "gi"), "s" ] ],
        singular_rules: [ [ new RegExp("(m)en$", "gi"), "$1an" ], [ new RegExp("(pe)ople$", "gi"), "$1rson" ], [ new RegExp("(child)ren$", "gi"), "$1" ], [ new RegExp("([ti])a$", "gi"), "$1um" ], [ new RegExp("((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$", "gi"), "$1$2sis" ], [ new RegExp("(hive)s$", "gi"), "$1" ], [ new RegExp("(tive)s$", "gi"), "$1" ], [ new RegExp("(curve)s$", "gi"), "$1" ], [ new RegExp("([lr])ves$", "gi"), "$1f" ], [ new RegExp("([^fo])ves$", "gi"), "$1fe" ], [ new RegExp("([^aeiouy]|qu)ies$", "gi"), "$1y" ], [ new RegExp("(s)eries$", "gi"), "$1eries" ], [ new RegExp("(m)ovies$", "gi"), "$1ovie" ], [ new RegExp("(x|ch|ss|sh)es$", "gi"), "$1" ], [ new RegExp("([m|l])ice$", "gi"), "$1ouse" ], [ new RegExp("(bus)es$", "gi"), "$1" ], [ new RegExp("(o)es$", "gi"), "$1" ], [ new RegExp("(shoe)s$", "gi"), "$1" ], [ new RegExp("(cris|ax|test)es$", "gi"), "$1is" ], [ new RegExp("(octop|vir)i$", "gi"), "$1us" ], [ new RegExp("(alias|status)es$", "gi"), "$1" ], [ new RegExp("^(ox)en", "gi"), "$1" ], [ new RegExp("(vert|ind)ices$", "gi"), "$1ex" ], [ new RegExp("(matr)ices$", "gi"), "$1ix" ], [ new RegExp("(quiz)zes$", "gi"), "$1" ], [ new RegExp("s$", "gi"), "" ] ],
        non_titlecased_words: [ "and", "or", "nor", "a", "an", "the", "so", "but", "to", "of", "at", "by", "from", "into", "on", "onto", "off", "out", "in", "over", "with", "for" ],
        id_suffix: new RegExp("(_ids|_id)$", "g"),
        underbar: new RegExp("_", "g"),
        space_or_underbar: new RegExp("[ _]", "g"),
        uppercase: new RegExp("([A-Z])", "g"),
        underbar_prefix: new RegExp("^_"),
        apply_rules: function(str, rules, skip) {
            if (-1 === skip.indexOf(str.toLowerCase())) for (var x = 0, l = rules.length; x < l; x++) if (rules[x][0].test(str)) return str.replace(rules[x][0], rules[x][1]);
            return str;
        }
    };
    Array.prototype.indexOf || (Array.prototype.indexOf = function(item, fromIndex, compareFunc) {
        fromIndex || (fromIndex = -1);
        for (var index = -1, i = fromIndex; i < this.length; i++) if (this[i] === item || compareFunc && compareFunc(this[i], item)) {
            index = i;
            break;
        }
        return index;
    });
    String.prototype._uncountable_words || (String.prototype._uncountable_words = InflectionJS.uncountable_words);
    String.prototype._plural_rules || (String.prototype._plural_rules = InflectionJS.plural_rules);
    String.prototype._singular_rules || (String.prototype._singular_rules = InflectionJS.singular_rules);
    String.prototype._non_titlecased_words || (String.prototype._non_titlecased_words = InflectionJS.non_titlecased_words);
    String.prototype.pluralize || (memo = {}, String.prototype.pluralize = function(plural) {
        if (plural) return plural;
        var thisString = this.toString();
        memo.hasOwnProperty(thisString) || (memo[thisString] = InflectionJS.apply_rules(this.toString(), this._plural_rules, this._uncountable_words));
        return memo[thisString];
    });
    var memo;
    String.prototype.singularize || function() {
        var memo = {};
        String.prototype.singularize = function(singular) {
            if (singular) return singular;
            var thisString = this.toString();
            memo.hasOwnProperty(thisString) || (memo[thisString] = InflectionJS.apply_rules(thisString, this._singular_rules, this._uncountable_words));
            return memo[thisString];
        };
    }();
    String.prototype.camelize || (String.prototype.camelize = function(lowFirstLetter) {
        for (var str = this.toLowerCase(), str_path = str.split("/"), i = 0; i < str_path.length; i++) {
            for (var str_arr = str_path[i].split("_"), initX, x = lowFirstLetter && i + 1 === str_path.length ? 1 : 0; x < str_arr.length; x++) str_arr[x] = str_arr[x].charAt(0).toUpperCase() + str_arr[x].substring(1);
            str_path[i] = str_arr.join("");
        }
        return str = str_path.join("::");
    });
    String.prototype.underscore || (String.prototype.underscore = function() {
        for (var str = this, str_path = str.split("::"), i = 0; i < str_path.length; i++) {
            str_path[i] = str_path[i].replace(InflectionJS.uppercase, "_$1");
            str_path[i] = str_path[i].replace(InflectionJS.underbar_prefix, "");
        }
        return str = str_path.join("/").toLowerCase();
    });
    String.prototype.humanize || (String.prototype.humanize = function(lowFirstLetter) {
        var str = this.toLowerCase();
        str = (str = str.replace(InflectionJS.id_suffix, "")).replace(InflectionJS.underbar, " ");
        lowFirstLetter || (str = str.capitalize());
        return str;
    });
    String.prototype.capitalize || (String.prototype.capitalize = function() {
        var str = this.toLowerCase();
        return str = str.substring(0, 1).toUpperCase() + str.substring(1);
    });
    String.prototype.dasherize || (String.prototype.dasherize = function() {
        var str = this;
        return str = str.replace(InflectionJS.space_or_underbar, "-");
    });
    String.prototype.titleize || (String.prototype.titleize = function() {
        for (var str = this.toLowerCase(), str_arr = (str = str.replace(InflectionJS.underbar, " ")).split(" "), x = 0; x < str_arr.length; x++) {
            for (var d = str_arr[x].split("-"), i = 0; i < d.length; i++) this._non_titlecased_words.indexOf(d[i].toLowerCase()) < 0 && (d[i] = d[i].capitalize());
            str_arr[x] = d.join("-");
        }
        return str = (str = str_arr.join(" ")).substring(0, 1).toUpperCase() + str.substring(1);
    });
    String.prototype.demodulize || (String.prototype.demodulize = function() {
        var str = this, str_arr = str.split("::");
        return str = str_arr[str_arr.length - 1];
    });
    String.prototype.tableize || (String.prototype.tableize = function() {
        var str = this;
        return str = str.underscore().pluralize();
    });
    String.prototype.classify || (String.prototype.classify = function() {
        var str = this;
        return str = str.camelize().singularize();
    });
    String.prototype.foreign_key || (String.prototype.foreign_key = function(dropIdUbar) {
        var str = this;
        return str = str.demodulize().underscore() + (dropIdUbar ? "" : "_") + "id";
    });
    String.prototype.ordinalize || (String.prototype.ordinalize = function() {
        for (var str = this, str_arr = str.split(" "), x = 0; x < str_arr.length; x++) {
            var i;
            if (NaN === parseInt(str_arr[x], 10)) {
                var ltd = str_arr[x].substring(str_arr[x].length - 2), ld = str_arr[x].substring(str_arr[x].length - 1), suf = "th";
                "11" != ltd && "12" != ltd && "13" != ltd && ("1" === ld ? suf = "st" : "2" === ld ? suf = "nd" : "3" === ld && (suf = "rd"));
                str_arr[x] += suf;
            }
        }
        return str = str_arr.join(" ");
    });
}, function(module, exports) {
    module.exports = "Vocabulary: Type\nTerm:       Integer\nTerm:       Real\nTerm:       Text\nTerm:       Date\nTerm:       Date Time\nTerm:       Time\nTerm:       Interval\nTerm:       File\n\nTerm:       Big Integer\n\tConcept type: Integer\n\nTerm:       Serial\n\tConcept Type: Integer\n\tNote: An auto-incrementing 'Integer'.\nTerm:       Case Insensitive Text\n\tConcept Type: Text\n\tNote: A 'Text' type that is compared case insensitively.\nTerm:       JSON\n\tConcept Type: Text\n\tNote: A 'Text' type that will only allow valid JSON.\nTerm:       Hashed\n\tConcept Type: Text\n\tNote: A 'Text' type that will automatically be converted to a hash.\nTerm:       SHA\n\tConcept Type: Text\n\tNote: A 'Text' type that will automatically be converted to a sha256 hash.\n\nTerm:       Length\n\tConcept Type: Integer\n\nName:       Current Time\n\tConcept Type: Date Time\n\nFact type:  Text has Length\n\tNote: Length in characters\n\tNecessity: Each Text has exactly one Length\n\nFact type:  Integer1 is less than Integer2\n\tSynonymous Form: Integer2 is greater than Integer1\nFact type: Integer1 is less than or equal to Integer2\n\tSynonymous Form: Integer2 is greater than or equal to Integer1\nFact type:  Integer1 is equal to Integer2\n\tSynonymous Form: Integer2 is equal to Integer1\n\tSynonymous Form: Integer1 equals Integer2\n\tSynonymous Form: Integer2 equals Integer1\n\nFact type:  Real1 is less than Real2\n\tSynonymous Form: Real2 is greater than Real1\nFact type: Real1 is less than or equal to Real2\n\tSynonymous Form: Real2 is greater than or equal to Real1\nFact type:  Real1 is equal to Real2\n\tSynonymous Form: Real2 is equal to Real1\n\tSynonymous Form: Real1 equals Real2\n\tSynonymous Form: Real2 equals Real1\n\nFact type:  Date1 is before Date2\n\tSynonymous Form: Date2 is after Date1\nFact type:  Date1 is equal to Date2\n\tSynonymous Form: Date2 is equal to Date1\n\tSynonymous Form: Date1 equals Date2\n\tSynonymous Form: Date2 equals Date1\n\nFact type:  Date Time1 is before Date Time2\n\tSynonymous Form: Date Time2 is after Date Time1\nFact type:  Date Time1 is equal to Date Time2\n\tSynonymous Form: Date Time2 is equal to Date Time1\n\tSynonymous Form: Date Time1 equals Date Time2\n\tSynonymous Form: Date Time2 equals Date Time1\n\n\nFact type:  Real is less than Integer\n\tSynonymous Form: Integer is greater than Real\nFact type:  Integer is less than Real\n\tSynonymous Form: Real is greater than Integer\n\nFact type: Real is less than or equal to Integer\n\tSynonymous Form: Integer is greater than or equal to Real\nFact type: Integer is less than or equal to Real\n\tSynonymous Form: Real is greater than or equal to Integer\n\nFact type:  Integer is equal to Real\n\tSynonymous Form: Real is equal to Integer\n\tSynonymous Form: Real equals Integer\n\tSynonymous Form: Integer equals Real\n\n\nFact type:  Text1 is equal to Text2\n\tSynonymous Form: Text2 is equal to Text1\n\tSynonymous Form: Text1 equals Text2\n\tSynonymous Form: Text2 equals Text1\n\nFact type:  Text1 starts with Text2\n\nFact type:  Text1 ends with Text2\n\nFact type:  Text1 contains Text2\n\tSynonymous Form: Text2 is contained in Text1\n\nTerm:       Short Text\n\tConcept Type: Text\n\t--Necessity: each Short Text has a Length that is less than or equal to 255.\n\nTerm:       Red Component\n\tConcept Type: Integer\nTerm:       Green Component\n\tConcept Type: Integer\nTerm:       Blue Component\n\tConcept Type: Integer\nTerm:       Alpha Component\n\tConcept Type: Integer\nTerm:       Color\n\tConcept Type: Integer\nFact type:  Color has Red Component\n\tNecessity: Each Color has exactly one Red Component\nFact type:  Color has Green Component\n\tNecessity: Each Color has exactly one Green Component\nFact type:  Color has Blue Component\n\tNecessity: Each Color has exactly one Blue Component\nFact type:  Color has Alpha Component\n\tNecessity: Each Color has exactly one Alpha Component";
}, function(module, exports) {
    module.exports = "Vocabulary: migrations\r\n\r\nTerm: model name\r\n\tConcept Type: Short Text (Type)\r\nTerm: executed migrations\r\n\tConcept Type: JSON (Type)\r\nTerm: lock time\r\n\tConcept Type: Date Time (Type)\r\n\r\nTerm: migration\r\n\tReference Scheme: model name\r\n\tDatabase ID Field: model name\r\nFact Type: migration has model name\r\n\tNecessity: each migration has exactly one model name\r\nFact Type: migration has executed migrations\r\n\tNecessity: each migration has exactly one executed migrations\r\n\r\nTerm: migration lock\r\n\tReference Scheme: model name\r\n\tDatabase ID Field: model name\r\n\r\nFact Type: migration lock has model name\r\n\tNecessity: each migration lock has exactly one model name\r\n";
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.generateODataMetadata = void 0;
    const sbvrTypes = __webpack_require__(13), {version: version} = __webpack_require__(183), getResourceName = resourceName => resourceName.split("-").map((namePart => namePart.split(" ").join("_"))).join("__"), forEachUniqueTable = (model, callback) => {
        const usedTableNames = {}, result = [];
        for (const key in model) if (model.hasOwnProperty(key)) {
            const table = model[key];
            if ("string" != typeof table && !table.primitive && !usedTableNames[table.name]) {
                usedTableNames[table.name] = !0;
                result.push(callback(key, table));
            }
        }
        return result;
    }, generateODataMetadata = (vocabulary, abstractSqlModel) => {
        const complexTypes = {}, resolveDataType = fieldType => {
            if (null == sbvrTypes[fieldType]) {
                console.error("Could not resolve type", fieldType);
                throw new Error("Could not resolve type" + fieldType);
            }
            const {complexType: complexType} = sbvrTypes[fieldType].types.odata;
            null != complexType && (complexTypes[fieldType] = complexType);
            return sbvrTypes[fieldType].types.odata.name;
        }, model = abstractSqlModel.tables, associations = [];
        forEachUniqueTable(model, ((_key, {name: resourceName, fields: fields}) => {
            resourceName = getResourceName(resourceName);
            for (const {dataType: dataType, required: required, references: references} of fields) if ("ForeignKey" === dataType && null != references) {
                const {resourceName: referencedResource} = references;
                associations.push({
                    name: resourceName + referencedResource,
                    ends: [ {
                        resourceName: resourceName,
                        cardinality: required ? "1" : "0..1"
                    }, {
                        resourceName: referencedResource,
                        cardinality: "*"
                    } ]
                });
            }
        }));
        return `\n\t\t<?xml version="1.0" encoding="iso-8859-1" standalone="yes"?>\n\t\t<edmx:Edmx Version="1.0" xmlns:edmx="http://schemas.microsoft.com/ado/2007/06/edmx">\n\t\t\t<edmx:DataServices xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" m:DataServiceVersion="2.0">\n\t\t\t\t<Schema Namespace="${vocabulary}"\n\t\t\t\t\txmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices"\n\t\t\t\t\txmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata"\n\t\t\t\t\txmlns="http://schemas.microsoft.com/ado/2008/09/edm">\n\n\t\t\t\t` + forEachUniqueTable(model, ((_key, {idField: idField, name: resourceName, fields: fields}) => `\n\t\t\t\t\t<EntityType Name="${resourceName = getResourceName(resourceName)}">\n\t\t\t\t\t\t<Key>\n\t\t\t\t\t\t\t<PropertyRef Name="${idField}" />\n\t\t\t\t\t\t</Key>\n\n\t\t\t\t\t\t` + fields.filter((({dataType: dataType}) => "ForeignKey" !== dataType)).map((({dataType: dataType, fieldName: fieldName, required: required}) => {
            dataType = resolveDataType(dataType);
            return `<Property Name="${fieldName = getResourceName(fieldName)}" Type="${dataType}" Nullable="${!required}" />`;
        })).join("\n") + "\n" + fields.filter((({dataType: dataType, references: references}) => "ForeignKey" === dataType && null != references)).map((({fieldName: fieldName, references: references}) => {
            const {resourceName: referencedResource} = references;
            return `<NavigationProperty Name="${fieldName = getResourceName(fieldName)}" Relationship="${vocabulary}.${resourceName + referencedResource}" FromRole="${resourceName}" ToRole="${referencedResource}" />`;
        })).join("\n") + "\n\n\t\t\t\t\t</EntityType>")).join("\n\n") + associations.map((({name: name, ends: ends}) => `<Association Name="${name = getResourceName(name)}">\n\t` + ends.map((({resourceName: resourceName, cardinality: cardinality}) => `<End Role="${resourceName}" Type="${vocabulary}.${resourceName}" Multiplicity="${cardinality}" />`)).join("\n\t") + "\n</Association>")).join("\n") + `\n\t\t\t\t\t<EntityContainer Name="${vocabulary}Service" m:IsDefaultEntityContainer="true">\n\n\t\t\t\t\t` + forEachUniqueTable(model, ((_key, {name: resourceName}) => `<EntitySet Name="${resourceName = getResourceName(resourceName)}" EntityType="${vocabulary}.${resourceName}" />`)).join("\n") + "\n" + associations.map((({name: name, ends: ends}) => `<AssociationSet Name="${name = getResourceName(name)}" Association="${vocabulary}.${name}">\n\t` + ends.map((({resourceName: resourceName}) => `<End Role="${resourceName}" EntitySet="${vocabulary}.${resourceName}" />`)).join("\n\t") + "\n\t\t\t\t\t\t\t\t</AssociationSet>")).join("\n") + "\n\t\t\t\t\t</EntityContainer>" + Object.values(complexTypes).join("\n") + "\n\t\t\t\t</Schema>\n\t\t\t</edmx:DataServices>\n\t\t</edmx:Edmx>";
    };
    exports.generateODataMetadata = generateODataMetadata;
    exports.generateODataMetadata.version = version;
}, function(module) {
    module.exports = JSON.parse('{"name":"@balena/pinejs","version":"14.18.0","main":"out/server-glue/module","repository":"git@github.com:balena-io/pinejs.git","license":"Apache-2.0","bin":{"abstract-sql-compiler":"./bin/abstract-sql-compiler.js","odata-compiler":"./bin/odata-compiler.js","sbvr-compiler":"./bin/sbvr-compiler.js"},"scripts":{"prepublish":"require-npm4-to-publish","prepublishOnly":"npm run lint","prepare":"npm run build","build":"grunt build","webpack-browser":"grunt browser","webpack-module":"grunt module","webpack-server":"grunt server","webpack-build":"npm run webpack-browser && npm run webpack-module && npm run webpack-server","lint":"balena-lint -e js -e ts --typescript src build typings Gruntfile.ts && npx tsc --project tsconfig.dev.json --noEmit","test":"npm run lint && npm run build && npm run webpack-build","prettify":"balena-lint -e js -e ts --typescript --fix src build typings Gruntfile.ts"},"dependencies":{"@balena/abstract-sql-compiler":"^7.10.1","@balena/abstract-sql-to-typescript":"^1.1.1","@balena/lf-to-abstract-sql":"^4.2.0","@balena/odata-parser":"^2.2.2","@balena/odata-to-abstract-sql":"^5.4.1","@balena/sbvr-parser":"^1.2.2","@balena/sbvr-types":"^3.4.0","@types/bluebird":"^3.5.33","@types/body-parser":"^1.19.0","@types/compression":"^1.7.0","@types/cookie-parser":"^1.4.2","@types/deep-freeze":"^0.1.2","@types/express":"^4.17.11","@types/express-session":"^1.17.3","@types/lodash":"^4.14.168","@types/memoizee":"^0.4.5","@types/method-override":"0.0.31","@types/multer":"^1.4.5","@types/mysql":"^2.15.17","@types/node":"^12.19.16","@types/passport":"^0.4.7","@types/passport-local":"1.0.33","@types/passport-strategy":"^0.2.35","@types/pg":"^7.14.9","@types/randomstring":"^1.1.6","@types/websql":"0.0.27","bluebird":"^3.7.2","commander":"^7.0.0","deep-freeze":"0.0.1","eventemitter3":"^4.0.7","express-session":"^1.17.1","lodash":"^4.17.20","memoizee":"^0.4.15","pinejs-client-core":"^6.9.3","randomstring":"^1.1.5","typed-error":"^3.2.1"},"devDependencies":{"@balena/lint":"^5.4.1","@types/grunt":"^0.4.24","@types/terser-webpack-plugin":"^4.2.0","@types/webpack":"^4.41.26","grunt":"^1.3.0","grunt-check-dependencies":"^1.0.0","grunt-cli":"^1.3.2","grunt-contrib-clean":"^2.0.0","grunt-contrib-concat":"^1.0.1","grunt-contrib-copy":"^1.0.0","grunt-contrib-rename":"^0.2.0","grunt-gitinfo":"^0.1.9","grunt-text-replace":"^0.4.0","grunt-ts":"^6.0.0-beta.22","grunt-webpack":"^4.0.2","husky":"^4.3.8","lint-staged":"^10.5.4","load-grunt-tasks":"^5.1.0","raw-loader":"^4.0.2","require-npm4-to-publish":"^1.0.0","terser-webpack-plugin":"^4.2.3","ts-loader":"^8.0.16","ts-node":"^9.1.1","typescript":"^4.1.3","webpack":"^4.46.0","webpack-dev-server":"^3.11.2"},"optionalDependencies":{"bcrypt":"^5.0.0","body-parser":"^1.19.0","compression":"^1.7.4","cookie-parser":"^1.4.5","express":"^4.17.1","method-override":"^3.0.0","multer":"^1.4.2","mysql":"^2.18.1","passport":"^0.3.2","passport-local":"^1.0.0","pg":"^8.5.1","pg-connection-string":"^2.4.0","serve-static":"^1.14.1"},"engines":{"node":">=10.0.0","npm":">=6.0.0"},"husky":{"hooks":{"pre-commit":"lint-staged"}},"lint-staged":{"*.js":["balena-lint --typescript --fix"],"*.ts":["balena-lint --typescript --fix"]}}');
}, function(module, exports) {
    module.exports = "Vocabulary: dev\r\n\r\nTerm:       model value\r\n\tConcept Type: JSON (Type)\r\nTerm:       model\r\n\tReference Scheme: model value\r\nTerm:       vocabulary\r\n\tConcept Type: Short Text (Type)\r\nTerm:       model type\r\n\tConcept Type: Short Text (Type)\r\n\r\nFact Type: model is of vocabulary\r\n\tNecessity: Each model is of exactly one vocabulary\r\nFact Type: model has model type\r\n\tNecessity: Each model has exactly one model type\r\nFact Type: model has model value\r\n\tNecessity: Each model has exactly one model value\r\n";
}, function(module, exports, __webpack_require__) {
    "use strict";
    var customError = __webpack_require__(52), defineLength = __webpack_require__(27), partial = __webpack_require__(186), copy = __webpack_require__(68), normalizeOpts = __webpack_require__(24), callable = __webpack_require__(2), d = __webpack_require__(3), WeakMap = __webpack_require__(187), resolveLength = __webpack_require__(38), extensions = __webpack_require__(7), resolveResolve = __webpack_require__(56), resolveNormalize = __webpack_require__(58), slice = Array.prototype.slice, defineProperties = Object.defineProperties;
    module.exports = function(memoize) {
        return function(fn) {
            var map, length, options = normalizeOpts(arguments[1]), memoized, resolve, normalizer;
            callable(fn);
            if (hasOwnProperty.call(fn, "__memoized__") && !options.force) return fn;
            length = resolveLength(options.length, fn.length, options.async && extensions.async);
            options.length = length ? length - 1 : 0;
            map = new WeakMap;
            options.resolvers && (resolve = resolveResolve(options.resolvers));
            options.normalizer && (normalizer = resolveNormalize(options.normalizer));
            if (!(1 !== length || normalizer || options.async || options.dispose || options.maxAge || options.max || options.refCounter)) return defineProperties((function(obj) {
                var result, args = arguments;
                resolve && (args = resolve(args));
                obj = args[0];
                if (map.has(obj)) return map.get(obj);
                result = fn.apply(this, args);
                if (map.has(obj)) throw customError("Circular invocation", "CIRCULAR_INVOCATION");
                map.set(obj, result);
                return result;
            }), {
                __memoized__: d(!0),
                delete: d((function(obj) {
                    resolve && (obj = resolve(arguments)[0]);
                    return map.delete(obj);
                }))
            });
            memoized = defineProperties(defineLength((function(obj) {
                var memoizer, args = arguments;
                resolve && (obj = (args = resolve(args))[0]);
                if (!(memoizer = map.get(obj))) {
                    if (normalizer) {
                        (options = copy(options)).normalizer = copy(normalizer);
                        options.normalizer.get = partial.call(options.normalizer.get, obj);
                        options.normalizer.set = partial.call(options.normalizer.set, obj);
                        options.normalizer.delete && (options.normalizer.delete = partial.call(options.normalizer.delete, obj));
                    }
                    map.set(obj, memoizer = memoize(partial.call(fn, obj), options));
                }
                return memoizer.apply(this, slice.call(args, 1));
            }), length), {
                __memoized__: d(!0),
                delete: d(defineLength((function(obj) {
                    var memoizer, args = arguments;
                    resolve && (obj = (args = resolve(args))[0]);
                    (memoizer = map.get(obj)) && memoizer.delete.apply(this, slice.call(args, 1));
                }), length))
            });
            if (!options.refCounter) return memoized;
            defineProperties(memoized, {
                deleteRef: d(defineLength((function(obj) {
                    var memoizer, args = arguments;
                    resolve && (obj = (args = resolve(args))[0]);
                    return (memoizer = map.get(obj)) ? memoizer.deleteRef.apply(this, slice.call(args, 1)) : null;
                }), length)),
                getRefCount: d(defineLength((function(obj) {
                    var memoizer, args = arguments;
                    resolve && (obj = (args = resolve(args))[0]);
                    return (memoizer = map.get(obj)) ? memoizer.getRefCount.apply(this, slice.call(args, 1)) : 0;
                }), length))
            });
            return memoized;
        };
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var callable = __webpack_require__(2), aFrom = __webpack_require__(22), defineLength = __webpack_require__(27), apply = Function.prototype.apply;
    module.exports = function() {
        var fn = callable(this), args = aFrom(arguments);
        return defineLength((function() {
            return apply.call(fn, this, args.concat(aFrom(arguments)));
        }), fn.length - args.length);
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = __webpack_require__(188)() ? WeakMap : __webpack_require__(189);
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = function() {
        var weakMap, obj;
        if ("function" != typeof WeakMap) return !1;
        try {
            weakMap = new WeakMap([ [ obj = {}, "one" ], [ {}, "two" ], [ {}, "three" ] ]);
        } catch (e) {
            return !1;
        }
        return "[object WeakMap]" === String(weakMap) && ("function" == typeof weakMap.set && (weakMap.set({}, 1) === weakMap && ("function" == typeof weakMap.delete && ("function" == typeof weakMap.has && "one" === weakMap.get(obj)))));
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var isValue = __webpack_require__(6), setPrototypeOf = __webpack_require__(45), object = __webpack_require__(191), ensureValue = __webpack_require__(4), randomUniq = __webpack_require__(192), d = __webpack_require__(3), getIterator = __webpack_require__(71), forOf = __webpack_require__(204), toStringTagSymbol = __webpack_require__(11).toStringTag, isNative = __webpack_require__(205), isArray = Array.isArray, defineProperty = Object.defineProperty, objHasOwnProperty = Object.prototype.hasOwnProperty, getPrototypeOf = Object.getPrototypeOf, WeakMapPoly;
    module.exports = WeakMapPoly = function() {
        var iterable = arguments[0], self;
        if (!(this instanceof WeakMapPoly)) throw new TypeError("Constructor requires 'new'");
        self = isNative && setPrototypeOf && WeakMap !== WeakMapPoly ? setPrototypeOf(new WeakMap, getPrototypeOf(this)) : this;
        isValue(iterable) && (isArray(iterable) || (iterable = getIterator(iterable)));
        defineProperty(self, "__weakMapData__", d("c", "$weakMap$" + randomUniq()));
        if (!iterable) return self;
        forOf(iterable, (function(val) {
            ensureValue(val);
            self.set(val[0], val[1]);
        }));
        return self;
    };
    if (isNative) {
        setPrototypeOf && setPrototypeOf(WeakMapPoly, WeakMap);
        WeakMapPoly.prototype = Object.create(WeakMap.prototype, {
            constructor: d(WeakMapPoly)
        });
    }
    Object.defineProperties(WeakMapPoly.prototype, {
        delete: d((function(key) {
            if (objHasOwnProperty.call(object(key), this.__weakMapData__)) {
                delete key[this.__weakMapData__];
                return !0;
            }
            return !1;
        })),
        get: d((function(key) {
            if (objHasOwnProperty.call(object(key), this.__weakMapData__)) return key[this.__weakMapData__];
        })),
        has: d((function(key) {
            return objHasOwnProperty.call(object(key), this.__weakMapData__);
        })),
        set: d((function(key, value) {
            defineProperty(object(key), this.__weakMapData__, d("c", value));
            return this;
        })),
        toString: d((function() {
            return "[object WeakMap]";
        }))
    });
    defineProperty(WeakMapPoly.prototype, toStringTagSymbol, d("c", "WeakMap"));
}, function(module, exports, __webpack_require__) {
    "use strict";
    var create = Object.create, shim;
    __webpack_require__(69)() || (shim = __webpack_require__(70));
    module.exports = function() {
        var nullObject, polyProps, desc;
        if (!shim) return create;
        if (1 !== shim.level) return create;
        nullObject = {};
        polyProps = {};
        desc = {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: void 0
        };
        Object.getOwnPropertyNames(Object.prototype).forEach((function(name) {
            polyProps[name] = "__proto__" !== name ? desc : {
                configurable: !0,
                enumerable: !1,
                writable: !0,
                value: void 0
            };
        }));
        Object.defineProperties(nullObject, polyProps);
        Object.defineProperty(shim, "nullPolyfill", {
            configurable: !1,
            enumerable: !1,
            writable: !1,
            value: nullObject
        });
        return function(prototype, props) {
            return create(null === prototype ? nullObject : prototype, props);
        };
    }();
}, function(module, exports, __webpack_require__) {
    "use strict";
    var isObject = __webpack_require__(39);
    module.exports = function(value) {
        if (!isObject(value)) throw new TypeError(value + " is not an Object");
        return value;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var generated = Object.create(null), random = Math.random;
    module.exports = function() {
        var str;
        do {
            str = random().toString(36).slice(2);
        } while (generated[str]);
        return str;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var setPrototypeOf = __webpack_require__(45), contains = __webpack_require__(55), d = __webpack_require__(3), Symbol = __webpack_require__(11), Iterator = __webpack_require__(72), defineProperty = Object.defineProperty, ArrayIterator;
    ArrayIterator = module.exports = function(arr, kind) {
        if (!(this instanceof ArrayIterator)) throw new TypeError("Constructor requires 'new'");
        Iterator.call(this, arr);
        kind = kind ? contains.call(kind, "key+value") ? "key+value" : contains.call(kind, "key") ? "key" : "value" : "value";
        defineProperty(this, "__kind__", d("", kind));
    };
    setPrototypeOf && setPrototypeOf(ArrayIterator, Iterator);
    delete ArrayIterator.prototype.constructor;
    ArrayIterator.prototype = Object.create(Iterator.prototype, {
        _resolve: d((function(i) {
            return "value" === this.__kind__ ? this.__list__[i] : "key+value" === this.__kind__ ? [ i, this.__list__[i] ] : i;
        }))
    });
    defineProperty(ArrayIterator.prototype, Symbol.toStringTag, d("c", "Array Iterator"));
}, function(module, exports, __webpack_require__) {
    "use strict";
    var value = __webpack_require__(4);
    module.exports = function() {
        value(this).length = 0;
        return this;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var isValue = __webpack_require__(18), ensureValue = __webpack_require__(196), ensurePlainFunction = __webpack_require__(200), copy = __webpack_require__(68), normalizeOptions = __webpack_require__(24), map = __webpack_require__(42), bind = Function.prototype.bind, defineProperty = Object.defineProperty, hasOwnProperty = Object.prototype.hasOwnProperty, define;
    define = function(name, desc, options) {
        var value = ensureValue(desc) && ensurePlainFunction(desc.value), dgs;
        delete (dgs = copy(desc)).writable;
        delete dgs.value;
        dgs.get = function() {
            if (!options.overwriteDefinition && hasOwnProperty.call(this, name)) return value;
            desc.value = bind.call(value, options.resolveContext ? options.resolveContext(this) : this);
            defineProperty(this, name, desc);
            return this[name];
        };
        return dgs;
    };
    module.exports = function(props) {
        var options = normalizeOptions(arguments[1]);
        isValue(options.resolveContext) && ensurePlainFunction(options.resolveContext);
        return map(props, (function(desc, name) {
            return define(name, desc, options);
        }));
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var resolveException = __webpack_require__(73), is = __webpack_require__(18);
    module.exports = function(value) {
        return is(value) ? value : resolveException(value, "Cannot use %v", arguments[1]);
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var isValue = __webpack_require__(18), isObject = __webpack_require__(40), objectToString = Object.prototype.toString;
    module.exports = function(value) {
        if (!isValue(value)) return null;
        if (isObject(value)) {
            var valueToString = value.toString;
            if ("function" != typeof valueToString) return null;
            if (valueToString === objectToString) return null;
        }
        try {
            return "" + value;
        } catch (error) {
            return null;
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var safeToString = __webpack_require__(199), reNewLine = /[\n\r\u2028\u2029]/g;
    module.exports = function(value) {
        var string = safeToString(value);
        if (null === string) return "<Non-coercible to string value>";
        string.length > 100 && (string = string.slice(0, 99) + "\u2026");
        return string = string.replace(reNewLine, (function(char) {
            switch (char) {
              case "\n":
                return "\\n";

              case "\r":
                return "\\r";

              case "\u2028":
                return "\\u2028";

              case "\u2029":
                return "\\u2029";

              default:
                throw new Error("Unexpected character");
            }
        }));
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = function(value) {
        try {
            return value.toString();
        } catch (error) {
            try {
                return String(value);
            } catch (error2) {
                return null;
            }
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var resolveException = __webpack_require__(73), is = __webpack_require__(54);
    module.exports = function(value) {
        return is(value) ? value : resolveException(value, "%v is not a plain function", arguments[1]);
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var setPrototypeOf = __webpack_require__(45), d = __webpack_require__(3), Symbol = __webpack_require__(11), Iterator = __webpack_require__(72), defineProperty = Object.defineProperty, StringIterator;
    StringIterator = module.exports = function(str) {
        if (!(this instanceof StringIterator)) throw new TypeError("Constructor requires 'new'");
        str = String(str);
        Iterator.call(this, str);
        defineProperty(this, "__length__", d("", str.length));
    };
    setPrototypeOf && setPrototypeOf(StringIterator, Iterator);
    delete StringIterator.prototype.constructor;
    StringIterator.prototype = Object.create(Iterator.prototype, {
        _next: d((function() {
            if (this.__list__) {
                if (this.__nextIndex__ < this.__length__) return this.__nextIndex__++;
                this._unBind();
            }
        })),
        _resolve: d((function(i) {
            var char = this.__list__[i], code;
            return this.__nextIndex__ === this.__length__ ? char : (code = char.charCodeAt(0)) >= 55296 && code <= 56319 ? char + this.__list__[this.__nextIndex__++] : char;
        }))
    });
    defineProperty(StringIterator.prototype, Symbol.toStringTag, d("c", "String Iterator"));
}, function(module, exports, __webpack_require__) {
    "use strict";
    var isIterable = __webpack_require__(203);
    module.exports = function(value) {
        if (!isIterable(value)) throw new TypeError(value + " is not iterable");
        return value;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var isArguments = __webpack_require__(29), isValue = __webpack_require__(6), isString = __webpack_require__(30), iteratorSymbol = __webpack_require__(11).iterator, isArray = Array.isArray;
    module.exports = function(value) {
        return !!isValue(value) && (!!isArray(value) || (!!isString(value) || (!!isArguments(value) || "function" == typeof value[iteratorSymbol])));
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var isArguments = __webpack_require__(29), callable = __webpack_require__(2), isString = __webpack_require__(30), get = __webpack_require__(71), isArray = Array.isArray, call = Function.prototype.call, some = Array.prototype.some;
    module.exports = function(iterable, cb) {
        var mode, thisArg = arguments[2], result, doBreak, broken, i, length, char, code;
        isArray(iterable) || isArguments(iterable) ? mode = "array" : isString(iterable) ? mode = "string" : iterable = get(iterable);
        callable(cb);
        doBreak = function() {
            broken = !0;
        };
        if ("array" !== mode) if ("string" !== mode) {
            result = iterable.next();
            for (;!result.done; ) {
                call.call(cb, thisArg, result.value, doBreak);
                if (broken) return;
                result = iterable.next();
            }
        } else {
            length = iterable.length;
            for (i = 0; i < length; ++i) {
                char = iterable[i];
                i + 1 < length && (code = char.charCodeAt(0)) >= 55296 && code <= 56319 && (char += iterable[++i]);
                call.call(cb, thisArg, char, doBreak);
                if (broken) break;
            }
        } else some.call(iterable, (function(value) {
            call.call(cb, thisArg, value, doBreak);
            return broken;
        }));
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = "function" == typeof WeakMap && "[object WeakMap]" === Object.prototype.toString.call(new WeakMap);
}, function(module, exports) {
    module.exports = "Vocabulary: Auth\r\n\r\nTerm:       username\r\n\tConcept Type: Short Text (Type)\r\nTerm:       password\r\n\tConcept Type: Hashed (Type)\r\nTerm:       name\r\n\tConcept Type: Text (Type)\r\nTerm:       key\r\n\tConcept Type: Short Text (Type)\r\nTerm:       expiry date\r\n\tConcept Type: Date Time (Type)\r\nTerm:       description\r\n\tConcept Type: Text (Type)\r\n\r\nTerm:       permission\r\n\tReference Scheme: name\r\nFact type:  permission has name\r\n\tNecessity: Each permission has exactly one name.\r\n\tNecessity: Each name is of exactly one permission.\r\n\r\nTerm:       role\r\n\tReference Scheme: name\r\nFact type:  role has name\r\n\tNecessity: Each role has exactly one name.\r\n\tNecessity: Each name is of exactly one role.\r\nFact type:  role has permission\r\n\r\nTerm:       actor\r\n\r\nTerm:       user\r\n\tReference Scheme: username\r\n\tConcept Type: actor\r\nFact type:  user has username\r\n\tNecessity: Each user has exactly one username.\r\n\tNecessity: Each username is of exactly one user.\r\nFact type:  user has password\r\n\tNecessity: Each user has exactly one password.\r\nFact type:  user has role\r\n\tNote: A 'user' will inherit all the 'permissions' that the 'role' has.\r\n\tTerm Form: user role\r\n\tFact type: user role has expiry date\r\n\t\tNecessity: Each user role has at most one expiry date.\r\nFact type:  user has permission\r\n\tTerm Form: user permission\r\n\tFact type: user permission has expiry date\r\n\t\tNecessity: Each user permission has at most one expiry date.\r\n\r\nTerm:       api key\r\n\tReference Scheme: key\r\nFact type:  api key has key\r\n\tNecessity: each api key has exactly one key\r\n\tNecessity: each key is of exactly one api key\r\nFact type:  api key has role\r\n\tNote: An 'api key' will inherit all the 'permissions' that the 'role' has.\r\nFact type:  api key has permission\r\nFact type:  api key is of actor\r\n\tNecessity: each api key is of exactly one actor\r\nFact type:  api key has name\r\n\tNecessity: Each api key has at most one name.\r\nFact type:  api key has description\r\n\tNecessity: Each api key has at most one description.\r\n";
}, function(module) {
    module.exports = JSON.parse('{"_from":"@balena/lf-to-abstract-sql@4.2.0","_id":"@balena/lf-to-abstract-sql@4.2.0","_inBundle":false,"_integrity":"sha512-0MHl3Af3d9uX2LWXYATEFLHOVLLtU23w4G2jl09vEplgTXCZKnp7L6aPSs/iBNbxZBfg2V9gExmzo21bRc/T6g==","_location":"/@balena/lf-to-abstract-sql","_phantomChildren":{},"_requested":{"type":"version","registry":true,"raw":"@balena/lf-to-abstract-sql@4.2.0","name":"@balena/lf-to-abstract-sql","escapedName":"@balena%2flf-to-abstract-sql","scope":"@balena","rawSpec":"4.2.0","saveSpec":null,"fetchSpec":"4.2.0"},"_requiredBy":["#USER","/"],"_resolved":"https://registry.npmjs.org/@balena/lf-to-abstract-sql/-/lf-to-abstract-sql-4.2.0.tgz","_shasum":"e77990d4a5ca8c2a0e2f49dfc9a91de6f8af38a6","_spec":"@balena/lf-to-abstract-sql@4.2.0","_where":"C:\\\\Users\\\\pjgaz\\\\Documents\\\\Development\\\\pinejs\\\\pinejs","author":"","bugs":{"url":"https://github.com/balena-io-modules/lf-to-abstract-sql/issues"},"bundleDependencies":false,"dependencies":{"@balena/sbvr-parser":"^1.2.0","lodash":"^4.17.20","ometa-js":"^1.5.3"},"deprecated":false,"description":"LF to Abstract SQL translator.","devDependencies":{"@balena/lint":"^5.4.0","@balena/sbvr-types":"^3.2.0","chai":"^4.3.0","mocha":"^8.2.1","require-npm4-to-publish":"^1.0.0"},"homepage":"https://github.com/balena-io-modules/lf-to-abstract-sql#readme","license":"BSD","main":"index.js","mocha":{"reporter":"spec","recursive":true,"bail":true,"timeout":5000,"_":"test/**/*.js"},"name":"@balena/lf-to-abstract-sql","repository":{"type":"git","url":"git+https://github.com/balena-io-modules/lf-to-abstract-sql.git"},"scripts":{"lint":"balena-lint --typescript -e js test index.js","lint-fix":"balena-lint --typescript --fix -e js test index.js","posttest":"npm run lint","prepare":"ometajs2js --commonjs --input lf-to-abstract-sql.ometajs --output lf-to-abstract-sql.js && ometajs2js --commonjs --input lf-to-abstract-sql-prep.ometajs --output lf-to-abstract-sql-prep.js && ometajs2js --commonjs --input sbvr-compiler-libs.ometajs --output sbvr-compiler-libs.js","prepublish":"require-npm4-to-publish","pretest":"npm run prepare","test":"mocha"},"version":"4.2.0"}');
}, function(module) {
    module.exports = JSON.parse('{"_from":"@balena/sbvr-types@3.4.0","_id":"@balena/sbvr-types@3.4.0","_inBundle":false,"_integrity":"sha512-aQrHeh6MsO/1uPbyBOdb1e2kRdFROpcqnZAk/c69v1vOxQraYNEW8KGdz1bbFpxyYv5A2HsBdTOsutij74C5QA==","_location":"/@balena/sbvr-types","_phantomChildren":{},"_requested":{"type":"version","registry":true,"raw":"@balena/sbvr-types@3.4.0","name":"@balena/sbvr-types","escapedName":"@balena%2fsbvr-types","scope":"@balena","rawSpec":"3.4.0","saveSpec":null,"fetchSpec":"3.4.0"},"_requiredBy":["#USER","/","/@balena/abstract-sql-compiler","/@balena/abstract-sql-to-typescript/@balena/abstract-sql-compiler","/@balena/odata-to-abstract-sql/@balena/abstract-sql-compiler"],"_resolved":"https://registry.npmjs.org/@balena/sbvr-types/-/sbvr-types-3.4.0.tgz","_shasum":"69efb10a680c3044e729771f72fd2a6aa6a407b7","_spec":"@balena/sbvr-types@3.4.0","_where":"C:\\\\Users\\\\pjgaz\\\\Documents\\\\Development\\\\pinejs\\\\pinejs","author":"","bugs":{"url":"https://github.com/balena-io-modules/sbvr-types/issues"},"bundleDependencies":false,"dependencies":{"@types/bcrypt":"^3.0.0","@types/sha.js":"^2.4.0","bcrypt":"^5.0.0","bcryptjs":"^2.4.3","sha.js":"^2.4.11"},"deprecated":false,"description":"SBVR type definitions.","devDependencies":{"@balena/lint":"^5.4.1","@types/lodash":"^4.14.168","bluebird":"^3.7.2","chai":"^4.3.0","chai-as-promised":"^7.1.1","chai-datetime":"^1.7.0","coffeescript":"^2.5.1","husky":"^4.3.8","lint-staged":"^10.5.4","lodash":"^4.17.20","mocha":"^8.2.1","require-npm4-to-publish":"^1.0.0","typescript":"^4.1.3"},"homepage":"https://github.com/balena-io-modules/sbvr-types#readme","husky":{"hooks":{"pre-commit":"lint-staged"}},"license":"BSD","lint-staged":{"*.ts":["balena-lint --typescript --fix"],"*.coffee":["balena-lint"]},"main":"out","mocha":{"reporter":"spec","recursive":true,"require":"coffeescript/register","_":"test/**/*.coffee"},"name":"@balena/sbvr-types","optionalDependencies":{"bcrypt":"^5.0.0","bcryptjs":"^2.4.3","sha.js":"^2.4.11"},"repository":{"type":"git","url":"git+https://github.com/balena-io-modules/sbvr-types.git"},"scripts":{"lint":"balena-lint test && balena-lint --typescript src","prepare":"tsc","prepublish":"require-npm4-to-publish","pretest":"npm run lint && npm run prepare","prettify":"balena-lint --typescript --fix src","test":"mocha"},"version":"3.4.0"}');
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.prepareModel = exports.process = exports.resourceURI = void 0;
    const odata_to_abstract_sql_1 = __webpack_require__(16), sbvrTypes = __webpack_require__(13), _ = __webpack_require__(0), sbvr_utils_1 = __webpack_require__(5), checkForExpansion = async (vocab, abstractSqlModel, parentResourceName, fieldName, row, opts) => {
        let field = row[fieldName];
        if (null != field) {
            if ("string" == typeof field) try {
                field = JSON.parse(field);
            } catch (_e) {}
            if (Array.isArray(field)) {
                const mappingResourceName = sbvr_utils_1.resolveNavigationResource({
                    abstractSqlModel: abstractSqlModel,
                    vocabulary: vocab,
                    resourceName: parentResourceName
                }, fieldName), expandedField = await exports.process(vocab, abstractSqlModel, mappingResourceName, field, opts);
                row[fieldName] = expandedField;
            } else {
                const mappingResourceName = sbvr_utils_1.resolveNavigationResource({
                    abstractSqlModel: abstractSqlModel,
                    vocabulary: vocab,
                    resourceName: parentResourceName
                }, fieldName);
                row[fieldName] = {
                    __id: field
                };
                opts.includeMetadata && (row[fieldName].__deferred = {
                    uri: exports.resourceURI(vocab, mappingResourceName, field)
                });
            }
        }
    }, resourceURI = (vocab, resourceName, id) => {
        if (null != id) {
            "string" == typeof id && (id = "'" + encodeURIComponent(id) + "'");
            return `/${vocab}/${resourceName}(@id)?@id=${id}`;
        }
    };
    exports.resourceURI = resourceURI;
    const getLocalFields = table => {
        if (null == table.localFields) {
            table.localFields = {};
            for (const {fieldName: fieldName, dataType: dataType} of table.fields) if ("ForeignKey" !== dataType) {
                const odataName = odata_to_abstract_sql_1.sqlNameToODataName(fieldName);
                table.localFields[odataName] = !0;
            }
        }
        return table.localFields;
    }, getFetchProcessingFields = table => {
        var _a;
        return null !== (_a = table.fetchProcessingFields) && void 0 !== _a ? _a : table.fetchProcessingFields = _(table.fields).filter((({dataType: dataType}) => null != sbvrTypes[dataType] && null != sbvrTypes[dataType].fetchProcessing)).map((({fieldName: fieldName, dataType: dataType}) => {
            const odataName = undefined;
            return [ odata_to_abstract_sql_1.sqlNameToODataName(fieldName), sbvrTypes[dataType].fetchProcessing ];
        })).fromPairs().value();
    }, process = async (vocab, abstractSqlModel, resourceName, rows, {includeMetadata: includeMetadata}) => {
        if (0 === rows.length) return [];
        if (1 === rows.length && null != rows[0].$count) {
            const count = undefined;
            return parseInt(rows[0].$count, 10);
        }
        const sqlResourceName = sbvr_utils_1.resolveSynonym({
            abstractSqlModel: abstractSqlModel,
            vocabulary: vocab,
            resourceName: resourceName
        }), table = abstractSqlModel.tables[sqlResourceName], fieldNames = Object.keys(rows[0]), fetchProcessingFields = getFetchProcessingFields(table), processedFields = fieldNames.filter((fieldName => fetchProcessingFields.hasOwnProperty(fieldName))), localFields = getLocalFields(table), expandableFields = fieldNames.filter((fieldName => !localFields.hasOwnProperty(fieldName))), odataIdField = odata_to_abstract_sql_1.sqlNameToODataName(table.idField);
        rows.forEach((row => {
            processedFields.forEach((fieldName => {
                row[fieldName] = fetchProcessingFields[fieldName](row[fieldName]);
            }));
            includeMetadata && (row.__metadata = {
                uri: exports.resourceURI(vocab, resourceName, row[odataIdField])
            });
        }));
        expandableFields.length > 0 && await Promise.all(rows.map((async row => {
            await Promise.all(expandableFields.map((async fieldName => {
                await checkForExpansion(vocab, abstractSqlModel, sqlResourceName, fieldName, row, {
                    includeMetadata: includeMetadata
                });
            })));
        })));
        return rows;
    };
    exports.process = process;
    const prepareModel = abstractSqlModel => {
        _.forEach(abstractSqlModel.tables, (table => {
            getLocalFields(table);
            getFetchProcessingFields(table);
        }));
    };
    exports.prepareModel = prepareModel;
}, function(module, exports) {
    function webpackEmptyContext(req) {
        var e = new Error("Cannot find module '" + req + "'");
        e.code = "MODULE_NOT_FOUND";
        throw e;
    }
    webpackEmptyContext.keys = function() {
        return [];
    };
    webpackEmptyContext.resolve = webpackEmptyContext;
    module.exports = webpackEmptyContext;
    webpackEmptyContext.id = 210;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.PinejsSessionStore = exports.Store = void 0;
    const express_session_1 = __webpack_require__(212);
    Object.defineProperty(exports, "Store", {
        enumerable: !0,
        get: function() {
            return express_session_1.Store;
        }
    });
    const permissions = __webpack_require__(19), sbvr_utils_1 = __webpack_require__(5), sessionModel = "\n\tVocabulary: session\n\n\tTerm:       session id\n\t\tConcept Type: Short Text (Type)\n\tTerm:       data\n\t\tConcept Type: JSON (Type)\n\tTerm:       expiry time\n\t\tConcept type: Date Time (Type)\n\n\tTerm:       session\n\t\tDatabase ID Field: session id\n\t\tReference Scheme: session id\n\n\tFact type:  session has data\n\t\tNecessity: Each session has exactly 1 data\n\tFact type:  session has session id\n\t\tNecessity: Each session has exactly 1 session id\n\t\tNecessity: Each session id is of exactly 1 session\n\tFact type:  session has expiry time\n\t\tNecessity: Each session has at most 1 expiry time\n", asCallback = async (callback, promise) => {
        let err, result;
        try {
            result = await promise;
        } catch ($err) {
            err = $err;
        }
        try {
            null == callback || callback(err, result);
        } catch (_a) {}
    };
    class PinejsSessionStore extends express_session_1.Store {
        constructor() {
            super(...arguments);
            this.get = (sid, callback) => {
                asCallback(callback, sbvr_utils_1.api.session.get({
                    resource: "session",
                    id: sid,
                    passthrough: {
                        req: permissions.rootRead
                    },
                    options: {
                        $select: "data"
                    }
                }).then((session => {
                    if (null != session) return session.data;
                })));
            };
            this.set = (sid, data, callback) => {
                var _a, _b;
                const body = {
                    session_id: sid,
                    data: data,
                    expiry_time: null !== (_b = null === (_a = null == data ? void 0 : data.cookie) || void 0 === _a ? void 0 : _a.expires) && void 0 !== _b ? _b : null
                };
                asCallback(callback, sbvr_utils_1.api.session.put({
                    resource: "session",
                    id: sid,
                    passthrough: {
                        req: permissions.root
                    },
                    body: body
                }));
            };
            this.destroy = (sid, callback) => {
                asCallback(callback, sbvr_utils_1.api.session.delete({
                    resource: "session",
                    id: sid,
                    passthrough: {
                        req: permissions.root
                    }
                }));
            };
            this.all = callback => {
                asCallback(callback, sbvr_utils_1.api.session.get({
                    resource: "session",
                    passthrough: {
                        req: permissions.root
                    },
                    options: {
                        $select: "session_id",
                        $filter: {
                            expiry_time: {
                                $ge: Date.now()
                            }
                        }
                    }
                }).then((sessions => sessions.map((s => s.session_id)))));
            };
            this.clear = callback => {
                asCallback(callback, sbvr_utils_1.api.session.delete({
                    resource: "session",
                    passthrough: {
                        req: permissions.root
                    }
                }));
            };
            this.length = callback => {
                asCallback(callback, sbvr_utils_1.api.session.get({
                    resource: "session/",
                    passthrough: {
                        req: permissions.rootRead
                    },
                    options: {
                        $count: {
                            $select: "session_id",
                            $filter: {
                                expiry_time: {
                                    $ge: Date.now()
                                }
                            }
                        }
                    }
                }));
            };
        }
    }
    exports.PinejsSessionStore = PinejsSessionStore;
    PinejsSessionStore.config = {
        models: [ {
            modelName: "session",
            modelText: sessionModel,
            apiRoot: "session",
            logging: {
                default: !1,
                error: !0
            },
            migrations: {
                "11.0.0-modified-at": '\n\t\t\t\t\t\tALTER TABLE "session"\n\t\t\t\t\t\tADD COLUMN IF NOT EXISTS "modified at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;\n\t\t\t\t\t'
            }
        } ]
    };
}, function(module, exports) {
    module.exports = require("express-session");
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.setup = exports.config = void 0;
    const permissions = __webpack_require__(19), uiModel = "Vocabulary: ui\n\nTerm:       text\n\tConcept type: Text (Type)\nTerm:       name\n\tConcept type: Short Text (Type)\nTerm:       textarea\n\t--Database id Field: name\n\tReference Scheme: text\nFact type:  textarea is disabled\nFact type:  textarea has name\n\tNecessity: Each textarea has exactly 1 name\n\tNecessity: Each name is of exactly 1 textarea\nFact type:  textarea has text\n\tNecessity: Each textarea has exactly 1 text", isServerOnAir = (() => {
        let resolve, promise = new Promise(($resolve => {
            resolve = $resolve;
        }));
        return value => {
            if (null != value) if (null != resolve) {
                resolve(value);
                resolve = void 0;
            } else promise = Promise.resolve(value);
            return promise;
        };
    })(), serverIsOnAir = async (_req, _res, next) => {
        const onAir = undefined;
        await isServerOnAir() ? next() : next("route");
    };
    exports.config = {
        models: [ {
            modelName: "ui",
            modelText: uiModel,
            apiRoot: "ui",
            customServerCode: {
                setup: setup
            },
            migrations: {
                "11.0.0-modified-at": 'ALTER TABLE "textarea"\nADD COLUMN IF NOT EXISTS "modified at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;'
            }
        } ]
    };
    async function setup(app, sbvrUtils, db) {
        const uiApi = sbvrUtils.api.ui, devApi = sbvrUtils.api.dev, setupModels = async tx => {
            try {
                const uiApiTx = uiApi.clone({
                    passthrough: {
                        tx: tx,
                        req: permissions.root
                    }
                });
                await uiApiTx.get({
                    resource: "textarea",
                    id: {
                        name: "model_area"
                    },
                    options: {
                        $select: "id"
                    }
                }).then((async result => {
                    if (null == result) return await uiApiTx.post({
                        resource: "textarea",
                        body: {
                            name: "model_area",
                            text: " "
                        }
                    });
                }));
                await devApi.get({
                    resource: "model",
                    passthrough: {
                        tx: tx,
                        req: permissions.rootRead
                    },
                    options: {
                        $select: [ "is_of__vocabulary", "model_value" ],
                        $filter: {
                            model_type: "se",
                            is_of__vocabulary: "data"
                        }
                    }
                }).then((async result => {
                    if (0 === result.length) throw new Error("No SE data model found");
                    const instance = result[0];
                    await sbvrUtils.executeModel(tx, {
                        apiRoot: instance.is_of__vocabulary,
                        modelText: instance.model_value
                    });
                }));
                await isServerOnAir(!0);
            } catch (_a) {
                await isServerOnAir(!1);
            }
        };
        app.get("/onAir", (async (_req, res) => {
            const onAir = await isServerOnAir();
            res.json(onAir);
        }));
        app.post("/update", permissions.checkPermissionsMiddleware("all"), serverIsOnAir, ((_req, res) => {
            res.sendStatus(404);
        }));
        app.post("/execute", permissions.checkPermissionsMiddleware("all"), (async (_req, res) => {
            try {
                await uiApi.get({
                    resource: "textarea",
                    passthrough: {
                        req: permissions.rootRead
                    },
                    id: {
                        name: "model_area"
                    },
                    options: {
                        $select: "text"
                    }
                }).then((async result => {
                    if (null == result) throw new Error("Could not find the model to execute");
                    const modelText = result.text;
                    await db.transaction((async tx => {
                        await sbvrUtils.executeModel(tx, {
                            apiRoot: "data",
                            modelText: modelText
                        });
                        await uiApi.patch({
                            resource: "textarea",
                            passthrough: {
                                tx: tx,
                                req: permissions.root
                            },
                            id: {
                                name: "model_area"
                            },
                            body: {
                                is_disabled: !0
                            }
                        });
                    }));
                }));
                await isServerOnAir(!0);
                res.sendStatus(200);
            } catch (err) {
                await isServerOnAir(!1);
                res.status(404).json(err);
            }
        }));
        app.post("/validate", permissions.checkPermissionsMiddleware("read"), (async (req, res) => {
            try {
                const results = await sbvrUtils.runRule("data", req.body.rule);
                res.json(results);
            } catch (err) {
                console.log("Error validating", err);
                res.sendStatus(404);
            }
        }));
        app.delete("/cleardb", permissions.checkPermissionsMiddleware("delete"), (async (_req, res) => {
            try {
                await db.transaction((async tx => {
                    const result = await tx.tableList();
                    await Promise.all(result.rows.map((table => tx.dropTable(table.name))));
                    await sbvrUtils.executeStandardModels(tx);
                    console.warn("DEL /cleardb is very destructive and should really be followed by a full restart/reload.");
                    await sbvrUtils.executeModels(tx, exports.config.models);
                    await setupModels(tx);
                }));
                res.sendStatus(200);
            } catch (err) {
                console.error("Error clearing db", err, err.stack);
                res.sendStatus(503);
            }
        }));
        app.put("/importdb", permissions.checkPermissionsMiddleware({
            and: [ "create", "update", "delete" ]
        }), (async (req, res) => {
            try {
                const queries = req.body.split(";");
                await db.transaction((async tx => {
                    for (let query of queries) {
                        query = query.trim();
                        if (query.length > 0) try {
                            await tx.executeSql(query);
                        } catch (err) {
                            throw [ query, err ];
                        }
                    }
                }));
                res.sendStatus(200);
            } catch (err) {
                console.error("Error importing db", err, err.stack);
                res.sendStatus(404);
            }
        }));
        app.get("/exportdb", permissions.checkPermissionsMiddleware("read"), (async (_req, res) => {
            try {
                let exported = "";
                await db.transaction((async tx => {
                    const tables = await tx.tableList("name NOT LIKE '%_buk'");
                    await Promise.all(tables.rows.map((async table => {
                        const tableName = table.name;
                        exported += 'DROP TABLE IF EXISTS "' + tableName + '";\n';
                        exported += table.sql + ";\n";
                        const result = await tx.executeSql('SELECT * FROM "' + tableName + '";');
                        let insQuery = "";
                        result.rows.forEach((currRow => {
                            let notFirst = !1;
                            insQuery += 'INSERT INTO "' + tableName + '" (';
                            let valQuery = "";
                            for (let propName of Object.keys(currRow)) {
                                if (notFirst) {
                                    insQuery += ",";
                                    valQuery += ",";
                                } else notFirst = !0;
                                insQuery += '"' + propName + '"';
                                valQuery += "'" + currRow[propName] + "'";
                            }
                            insQuery += ") values (" + valQuery + ");\n";
                        }));
                        exported += insQuery;
                    })));
                }));
                res.json(exported);
            } catch (err) {
                console.error("Error exporting db", err, err.stack);
                res.sendStatus(503);
            }
        }));
        app.post("/backupdb", permissions.checkPermissionsMiddleware("all"), serverIsOnAir, (async (_req, res) => {
            try {
                await db.transaction((async tx => {
                    const result = await tx.tableList("name NOT LIKE '%_buk'");
                    await Promise.all(result.rows.map((async currRow => {
                        const tableName = currRow.name;
                        await tx.dropTable(tableName + "_buk", !0);
                        await tx.executeSql('ALTER TABLE "' + tableName + '" RENAME TO "' + tableName + '_buk";');
                    })));
                }));
                res.sendStatus(200);
            } catch (err) {
                console.error("Error backing up db", err, err.stack);
                res.sendStatus(404);
            }
        }));
        app.post("/restoredb", permissions.checkPermissionsMiddleware("all"), serverIsOnAir, (async (_req, res) => {
            try {
                await db.transaction((async tx => {
                    const result = await tx.tableList("name LIKE '%_buk'");
                    await Promise.all(result.rows.map((async currRow => {
                        const tableName = currRow.name;
                        await tx.dropTable(tableName.slice(0, -4), !0);
                        await tx.executeSql('ALTER TABLE "' + tableName + '" RENAME TO "' + tableName.slice(0, -4) + '";');
                    })));
                }));
                res.sendStatus(200);
            } catch (err) {
                console.error("Error restoring db", err, err.stack);
                res.sendStatus(404);
            }
        }));
        app.all("/data/*", serverIsOnAir, sbvrUtils.handleODataRequest);
        app.get("/Auth/*", serverIsOnAir, sbvrUtils.handleODataRequest);
        app.merge("/ui/*", sbvrUtils.handleODataRequest);
        app.patch("/ui/*", sbvrUtils.handleODataRequest);
        app.delete("/", serverIsOnAir, (async (_req, res) => {
            await Promise.all([ uiApi.patch({
                resource: "textarea",
                passthrough: {
                    req: permissions.root
                },
                id: {
                    name: "model_area"
                },
                body: {
                    text: "",
                    is_disabled: !1
                }
            }), sbvrUtils.deleteModel("data") ]);
            await isServerOnAir(!1);
            res.sendStatus(200);
        }));
        await db.transaction(setupModels);
    }
    exports.setup = setup;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.setup = exports.addModelHooks = exports.config = void 0;
    const odata_to_abstract_sql_1 = __webpack_require__(16), transactionModel = __webpack_require__(216);
    exports.config = {
        models: [ {
            apiRoot: "transaction",
            modelText: transactionModel,
            customServerCode: {
                setup: setup
            },
            migrations: {
                "11.0.0-modified-at": 'ALTER TABLE "conditional field"\nADD COLUMN IF NOT EXISTS "modified at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;\nALTER TABLE "conditional resource"\nADD COLUMN IF NOT EXISTS "modified at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;\nALTER TABLE "lock"\nADD COLUMN IF NOT EXISTS "modified at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;\nALTER TABLE "resource"\nADD COLUMN IF NOT EXISTS "modified at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;\nALTER TABLE "resource-is under-lock"\nADD COLUMN IF NOT EXISTS "modified at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;\nALTER TABLE "transaction"\nADD COLUMN IF NOT EXISTS "modified at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;'
            }
        } ]
    };
    function setup(app, sbvrUtils) {
        exports.addModelHooks = modelName => {
            sbvrUtils.addPureHook("PUT", modelName, "all", {
                async PRERUN({tx: tx, request: request}) {
                    const vocab = request.vocabulary, {logger: logger} = sbvrUtils.api[vocab], id = sbvrUtils.getID(vocab, request);
                    let result;
                    try {
                        result = await tx.executeSql('SELECT NOT EXISTS(\n\tSELECT 1\n\tFROM "resource" r\n\tJOIN "resource-is under-lock" AS rl ON rl."resource" = r."id"\n\tWHERE r."resource type" = ?\n\tAND r."resource id" = ?\n) AS result;', [ request.resourceName, id ]);
                    } catch (err) {
                        logger.error("Unable to check resource locks", err, err.stack);
                        throw new Error("Unable to check resource locks");
                    }
                    if ([ !1, 0, "0" ].includes(result.rows[0].result)) throw new Error("The resource is locked and cannot be edited");
                }
            });
            const endTransaction = transactionID => sbvrUtils.db.transaction((async tx => {
                const placeholders = {}, getLockedRow = lockID => tx.executeSql('SELECT "resource"."resource id" AS "resource_id"\nFROM "resource",\n"resource-is under-lock"\nWHERE "resource"."id" = "resource-is under-lock"."resource"\nAND "resource-is under-lock"."lock" = ?;', [ lockID ]), getFieldsObject = async (conditionalResourceID, clientModel) => {
                    const fields = await tx.executeSql('SELECT "conditional field"."field name" AS "field_name", "conditional field"."field value" AS "field_value"\nFROM "conditional field"\nWHERE "conditional field"."conditional resource" = ?;', [ conditionalResourceID ]), fieldsObject = {};
                    await Promise.all(fields.rows.map((async field => {
                        const fieldName = field.field_name.replace(clientModel.resourceName + ".", ""), fieldValue = field.field_value, modelField = clientModel.fields.find((f => f.fieldName === fieldName));
                        if (null == modelField) throw new Error(`Invalid field: ${fieldName}`);
                        if ("ForeignKey" === modelField.dataType && Number.isNaN(Number(fieldValue))) {
                            if (!placeholders.hasOwnProperty(fieldValue)) throw new Error("Cannot resolve placeholder" + fieldValue);
                            try {
                                const resolvedID = await placeholders[fieldValue].promise;
                                fieldsObject[fieldName] = resolvedID;
                            } catch (_a) {
                                throw new Error("Placeholder failed" + fieldValue);
                            }
                        } else fieldsObject[fieldName] = fieldValue;
                    })));
                    return fieldsObject;
                }, conditionalResources = await tx.executeSql('SELECT "conditional resource"."id", "conditional resource"."lock", "conditional resource"."resource type" AS "resource_type",\n"conditional resource"."conditional type" AS "conditional_type", "conditional resource"."placeholder"\nFROM "conditional resource"\nWHERE "conditional resource"."transaction" = ?;', [ transactionID ]);
                conditionalResources.rows.forEach((conditionalResource => {
                    const {placeholder: placeholder} = conditionalResource;
                    if (null != placeholder && placeholder.length > 0) {
                        let resolve, reject;
                        const promise = new Promise((($resolve, $reject) => {
                            resolve = $resolve;
                            reject = $reject;
                        }));
                        placeholders[placeholder] = {
                            promise: promise,
                            resolve: resolve,
                            reject: reject
                        };
                    }
                }));
                await Promise.all(conditionalResources.rows.map((async conditionalResource => {
                    const {placeholder: placeholder} = conditionalResource, lockID = conditionalResource.lock, doCleanup = () => Promise.all([ tx.executeSql('DELETE FROM "conditional field" WHERE "conditional resource" = ?;', [ conditionalResource.id ]), tx.executeSql('DELETE FROM "conditional resource" WHERE "lock" = ?;', [ lockID ]), tx.executeSql('DELETE FROM "resource-is under-lock" WHERE "lock" = ?;', [ lockID ]), tx.executeSql('DELETE FROM "lock" WHERE "id" = ?;', [ lockID ]) ]), passthrough = {
                        tx: tx
                    }, clientModel = sbvrUtils.getAbstractSqlModel({
                        vocabulary: modelName
                    }).tables[odata_to_abstract_sql_1.odataNameToSqlName(conditionalResource.resource_type)];
                    let url = modelName + "/" + conditionalResource.resource_type;
                    switch (conditionalResource.conditional_type) {
                      case "DELETE":
                        {
                            const lockedResult = undefined, lockedRow = (await getLockedRow(lockID)).rows[0];
                            url = url + "?$filter=" + clientModel.idField + " eq " + lockedRow.resource_id;
                            await sbvrUtils.PinejsClient.prototype.delete({
                                url: url,
                                passthrough: passthrough
                            });
                            await doCleanup();
                            return;
                        }

                      case "EDIT":
                        {
                            const lockedResult = undefined, lockedRow = (await getLockedRow(lockID)).rows[0], body = await getFieldsObject(conditionalResource.id, clientModel);
                            body[clientModel.idField] = lockedRow.resource_id;
                            await sbvrUtils.PinejsClient.prototype.put({
                                url: url,
                                body: body,
                                passthrough: passthrough
                            });
                            await doCleanup();
                            return;
                        }

                      case "ADD":
                        try {
                            const body = await getFieldsObject(conditionalResource.id, clientModel), result = await sbvrUtils.PinejsClient.prototype.post({
                                url: url,
                                body: body,
                                passthrough: passthrough
                            });
                            placeholders[placeholder].resolve(result[clientModel.idField]);
                            await doCleanup();
                        } catch (err) {
                            placeholders[placeholder].reject(err);
                            throw err;
                        }
                        return;
                    }
                })));
                await tx.executeSql('DELETE FROM "transaction" WHERE "id" = ?;', [ transactionID ]);
                await sbvrUtils.validateModel(tx, modelName);
            }));
            app.post("/transaction/execute", (async (req, res) => {
                const id = Number(req.body.id);
                if (Number.isNaN(id)) res.sendStatus(404); else try {
                    await endTransaction(id);
                    res.sendStatus(200);
                } catch (err) {
                    console.error("Error ending transaction", err, err.stack);
                    res.status(404).json(err);
                }
            }));
            app.get("/transaction", ((_req, res) => {
                res.json({
                    transactionURI: "/transaction/transaction",
                    conditionalResourceURI: "/transaction/conditional_resource",
                    conditionalFieldURI: "/transaction/conditional_field",
                    lockURI: "/transaction/lock",
                    transactionLockURI: "/transaction/lock__belongs_to__transaction",
                    resourceURI: "/transaction/resource",
                    lockResourceURI: "/transaction/resource__is_under__lock",
                    exclusiveLockURI: "/transaction/lock__is_exclusive",
                    commitTransactionURI: "/transaction/execute"
                });
            }));
            app.all("/transaction/*", sbvrUtils.handleODataRequest);
        };
    }
    exports.setup = setup;
}, function(module, exports) {
    module.exports = 'Vocabulary: transaction\r\n\r\nTerm:       resource id\r\n\tConcept type: Text (Type)\r\nTerm:       resource type\r\n\tConcept type: Text (Type)\r\nTerm:       field name\r\n\tConcept type: Text (Type)\r\nTerm:       field value\r\n\tConcept type: Text (Type)\r\nTerm:       placeholder\r\n\tConcept type: Short Text (Type)\r\n\r\nTerm:       resource\r\n\tReference Scheme: resource id\r\nFact type: resource has resource id\r\n\tNecessity: Each resource has exactly 1 resource id.\r\nFact type: resource has resource type\r\n\tNecessity: Each resource has exactly 1 resource type.\r\n\r\nTerm:       transaction\r\n\r\nTerm:       lock\r\nFact type:  lock is exclusive\r\nFact type:  lock belongs to transaction\r\n\tNecessity: Each lock belongs to exactly 1 transaction.\r\nFact type:  resource is under lock\r\n\tSynonymous Form: lock is on resource\r\nRule:       It is obligatory that each resource that is under a lock that is exclusive, is under at most 1 lock.\r\n\r\nTerm:       conditional type\r\n\tConcept Type: Short Text (Type)\r\n\tDefinition: "ADD", "EDIT" or "DELETE"\r\n\r\nTerm:       conditional resource\r\nFact type:  conditional resource belongs to transaction\r\n\tNecessity: Each conditional resource belongs to exactly 1 transaction.\r\nFact type:  conditional resource has lock\r\n\tNecessity: Each conditional resource has at most 1 lock.\r\nFact type:  conditional resource has resource type\r\n\tNecessity: Each conditional resource has exactly 1 resource type.\r\nFact type:  conditional resource has conditional type\r\n\tNecessity: Each conditional resource has exactly 1 conditional type.\r\nFact type:  conditional resource has placeholder\r\n\tNecessity: Each conditional resource has at most 1 placeholder.\r\n--Rule:       It is obligatory that each conditional resource that has a placeholder, has a conditional type that is of "ADD".\r\n\r\nTerm:       conditional field\r\n\tReference Scheme: field name\r\nFact type:  conditional field has field name\r\n\tNecessity: Each conditional field has exactly 1 field name.\r\nFact type:  conditional field has field value\r\n\tNecessity: Each conditional field has at most 1 field value.\r\nFact type:  conditional field is of conditional resource\r\n\tNecessity: Each conditional field is of exactly 1 conditional resource.\r\n\r\n--Rule:       It is obligatory that each conditional resource that has a conditional type that is of "EDIT" or "DELETE", has a lock that is exclusive\r\nRule:       It is obligatory that each conditional resource that has a lock, has a resource type that is of a resource that the lock is on.\r\nRule:       It is obligatory that each conditional resource that has a lock, belongs to a transaction that the lock belongs to.\r\n';
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.config = exports.checkPassword = exports.logout = exports.login = void 0;
    const permissions = __webpack_require__(19), checkPassword = async (username, password, done) => {
        try {
            const result = undefined;
            done(void 0, await permissions.checkPassword(username, password));
        } catch (_a) {
            done(void 0, !1);
        }
    };
    exports.checkPassword = checkPassword;
    const setup = async app => {
        {
            let loggedIn = !1, loggedInUser = null;
            app.use(((req, _res, next) => {
                !1 === loggedIn && (req.user = loggedInUser);
                next();
            }));
            exports.login = fn => (req, res, next) => exports.checkPassword(req.body.username, req.body.password, ((err, user) => {
                if (user) {
                    loggedIn = !0;
                    loggedInUser = user;
                }
                fn(err, user, req, res, next);
            }));
            exports.logout = (req, _res, next) => {
                req.user = null;
                loggedIn = !1;
                loggedInUser = null;
                next();
            };
        }
    };
    exports.config = {
        models: [ {
            customServerCode: {
                setup: setup
            }
        } ]
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    const _ = __webpack_require__(0), w = "undefined" != typeof window && null !== window ? window : {};
    w.GLOBAL_PERMISSIONS = [ "resource.all" ];
    const app = function() {
        let ready;
        const enabled = new Promise((resolve => {
            ready = resolve;
        })), appVars = {
            env: "development"
        }, handlers = {
            USE: [],
            POST: [],
            PUT: [],
            DELETE: [],
            GET: [],
            PATCH: [],
            MERGE: [],
            OPTIONS: []
        }, addHandler = function(handlerName, match, ...middleware) {
            let paramName;
            const newMatch = (match = match.toLowerCase()).replace(/[\/\*]*$/, "");
            if (newMatch !== match) {
                match = newMatch;
                paramName = "*";
            } else {
                const paramMatch = /:(.*)$/.exec(match);
                paramName = null == paramMatch ? void 0 : paramMatch[1];
            }
            handlers[handlerName].push({
                match: match,
                paramName: paramName,
                middleware: _.flattenDeep(middleware)
            });
        }, process = async function(method, uri, headers, body) {
            null != body || (body = "");
            if (!handlers[method]) throw [ 404, null, null ];
            const req = {
                user: {
                    permissions: w.GLOBAL_PERMISSIONS
                },
                method: method,
                body: body,
                headers: headers,
                url: uri,
                params: {},
                query: {},
                login(_user, callback) {
                    callback();
                }
            };
            console.log(method, uri, body);
            "/" === uri.slice(-1) && (uri = uri.slice(0, uri.length - 1));
            uri = uri.toLowerCase();
            return await new Promise((function(resolve, reject) {
                const res = {
                    statusCode: 200,
                    status(statusCode) {
                        this.statusCode = statusCode;
                        return this;
                    },
                    json(obj) {
                        obj = JSON.parse(JSON.stringify(obj));
                        this.statusCode >= 400 ? reject([ this.statusCode, obj, null ]) : resolve([ this.statusCode, obj, null ]);
                    },
                    send(data) {
                        data = _.cloneDeep(data);
                        this.statusCode >= 400 ? reject([ this.statusCode, data, null ]) : resolve([ this.statusCode, data, null ]);
                    },
                    sendStatus(statusCode) {
                        null != statusCode || (statusCode = this.statusCode);
                        statusCode >= 400 ? reject([ statusCode, null, null ]) : resolve([ statusCode, null, null ]);
                    },
                    redirect() {
                        reject([ 307 ]);
                    },
                    set() {},
                    type() {}
                }, methodHandlers = handlers.USE.concat(handlers[method]);
                let i = -1, j = -1;
                const next = function(route) {
                    j++;
                    "route" === route || j >= methodHandlers[i].middleware.length ? checkMethodHandlers() : methodHandlers[i].middleware[j](req, res, next);
                }, checkMethodHandlers = () => {
                    i++;
                    if (i < methodHandlers.length) if (uri.slice(0, methodHandlers[i].match.length) === methodHandlers[i].match) {
                        j = -1;
                        req.params = {};
                        if (null != methodHandlers[i].paramName) {
                            req.params[methodHandlers[i].paramName] = uri.slice(methodHandlers[i].match.length);
                            next();
                        } else uri.length !== methodHandlers[i].match.length ? checkMethodHandlers() : next();
                    } else checkMethodHandlers(); else res.sendStatus(404);
                };
                checkMethodHandlers();
            }));
        };
        return {
            use: _.partial(addHandler, "USE", "/*"),
            get(name) {
                const callback = undefined;
                if ("function" != typeof arguments[arguments.length - 1]) return appVars[name];
                addHandler("GET", ...arguments);
            },
            post: _.partial(addHandler, "POST"),
            put: _.partial(addHandler, "PUT"),
            delete: _.partial(addHandler, "DELETE"),
            patch: _.partial(addHandler, "PATCH"),
            merge: _.partial(addHandler, "MERGE"),
            options: _.partial(addHandler, "OPTIONS"),
            all(...args) {
                this.post(...args);
                this.get(...args);
                this.put(...args);
                this.delete(...args);
            },
            process: (...args) => enabled.then((() => process(...args))),
            listen() {
                const callback = arguments[arguments.length - 1];
                ready();
                if ("function" == typeof callback) return enabled.then(callback);
            },
            set(name, value) {
                appVars[name] = value;
            }
        };
    }(), express = () => app;
    module.exports = express;
} ]));
//# sourceMappingURL=pine.js.map