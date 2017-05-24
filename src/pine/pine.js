!function(e, a) {
    for (var i in a) e[i] = a[i];
}(exports, function(modules) {
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            exports: {},
            id: moduleId,
            loaded: !1
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.loaded = !0;
        return module.exports;
    }
    var installedModules = {};
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.p = "";
    return __webpack_require__(0);
}(function(modules) {
    for (var i in modules) if (Object.prototype.hasOwnProperty.call(modules, i)) switch (typeof modules[i]) {
      case "function":
        break;

      case "object":
        modules[i] = function(_m) {
            var args = _m.slice(1), fn = modules[_m[0]];
            return function(a, b, c) {
                fn.apply(this, [ a, b, c ].concat(args));
            };
        }(modules[i]);
        break;

      default:
        modules[i] = modules[modules[i]];
    }
    return modules;
}([ function(module, exports, __webpack_require__) {
    var Pinejs, PinejsSessionStore, Promise, app, bodyParser, compression, cookieParser, express, expressSession, initialised, methodOverride, multer, passport, passportPinejs, path, root, sbvrUtils, serveStatic;
    Pinejs = __webpack_require__(1);
    Promise = __webpack_require__(2);
    sbvrUtils = __webpack_require__(24);
    passportPinejs = __webpack_require__(149);
    PinejsSessionStore = __webpack_require__(144);
    express = __webpack_require__(150);
    app = express();
    switch (app.get("env")) {
      case "production":
        console.log = function() {};
        break;

      case "development":
        Promise.longStackTraces();
    }
    initialised = Pinejs.init(app).then(function(configLoader) {
        return Promise.all([ configLoader.loadConfig(passportPinejs.config), configLoader.loadConfig(PinejsSessionStore.config) ]);
    }).then(function() {
        if (!("undefined" != typeof process && null !== process ? process.env.DISABLE_DEFAULT_AUTH : void 0)) {
            app.post("/login", passportPinejs.login(function(err, user, req, res, next) {
                if (err) {
                    console.error("Error logging in", err, err.stack);
                    return res.sendStatus(500);
                }
                return user === !1 ? req.xhr === !0 ? res.sendStatus(401) : res.redirect("/login.html") : req.xhr === !0 ? res.sendStatus(200) : res.redirect("/");
            }));
            return app.get("/logout", passportPinejs.logout, function(req, res, next) {
                return res.redirect("/");
            });
        }
    }).then(function() {
        return app.listen(process.env.PORT || 1337, function() {
            return console.info("Server started");
        });
    }).catch(function(err) {
        console.error("Error initialising server", err, err.stack);
        return process.exit();
    });
    module.exports = {
        initialised: initialised,
        app: app,
        sbvrUtils: sbvrUtils
    };
}, function(module, exports, __webpack_require__) {
    var PinejsSessionStore, Promise, configLoader, databaseOptions, databaseURL, db, dbModule, fs, init, migrator, sbvrUtils;
    Promise = __webpack_require__(2);
    dbModule = __webpack_require__(3);
    sbvrUtils = __webpack_require__(24);
    configLoader = __webpack_require__(140);
    migrator = __webpack_require__(44);
    PinejsSessionStore = __webpack_require__(144);
    if (null != dbModule.websql) databaseOptions = {
        engine: "websql",
        params: "rulemotion"
    }; else {
        databaseURL = function() {
            if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
            if (null != dbModule.postgres) return "postgres://postgres:.@localhost:5432/postgres";
            if (null != dbModule.mysql) return "mysql://mysql:.@localhost:3306";
            throw new Error("No supported database options available");
        }();
        databaseOptions = {
            engine: databaseURL.slice(0, databaseURL.indexOf(":")),
            params: databaseURL
        };
    }
    db = dbModule.connect(databaseOptions);
    init = function(app, config) {
        return sbvrUtils.setup(app, db).then(function() {
            configLoader = configLoader.setup(app);
            return configLoader.loadConfig(migrator.config).return(configLoader);
        }).tap(function(configLoader) {
            var promises, sbvrServer, transactions;
            promises = [];
            sbvrServer = __webpack_require__(146);
            promises.push(configLoader.loadConfig(sbvrServer.config));
            transactions = __webpack_require__(147);
            promises.push(configLoader.loadConfig(transactions.config).then(function() {
                return transactions.addModelHooks("data");
            }));
            return Promise.all(promises);
        }).catch(function(err) {
            console.error("Error initialising server", err, err.stack);
            return process.exit();
        });
    };
    module.exports = {
        init: init,
        sbvrUtils: sbvrUtils,
        SessionStore: PinejsSessionStore
    };
}, function(module, exports) {
    module.exports = require("bluebird");
}, function(module, exports, __webpack_require__) {
    var ConnectionParameters, ConstraintError, DEFAULT_VALUE, DatabaseError, ForeignKeyConstraintError, NotADatabaseError, Promise, Tx, TypedError, UniqueConstraintError, _, alwaysExport, atomicExecuteSql, bindDefaultValues, createTransaction, mysql, pg, sqlBinds, extend = function(child, parent) {
        function ctor() {
            this.constructor = child;
        }
        for (var key in parent) hasProp.call(parent, key) && (child[key] = parent[key]);
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }, hasProp = {}.hasOwnProperty, slice = [].slice;
    _ = __webpack_require__(4);
    Promise = __webpack_require__(2);
    sqlBinds = __webpack_require__(5);
    TypedError = __webpack_require__(6);
    DatabaseError = function(superClass) {
        function DatabaseError(message) {
            null != (null != message ? message.code : void 0) && (this.code = message.code);
            "SQLError" === (null != message ? message.constructor.name : void 0) && (message = message.message);
            DatabaseError.__super__.constructor.call(this, message);
        }
        extend(DatabaseError, superClass);
        return DatabaseError;
    }(TypedError);
    ConstraintError = function(superClass) {
        function ConstraintError() {
            return ConstraintError.__super__.constructor.apply(this, arguments);
        }
        extend(ConstraintError, superClass);
        return ConstraintError;
    }(DatabaseError);
    UniqueConstraintError = function(superClass) {
        function UniqueConstraintError() {
            return UniqueConstraintError.__super__.constructor.apply(this, arguments);
        }
        extend(UniqueConstraintError, superClass);
        return UniqueConstraintError;
    }(ConstraintError);
    ForeignKeyConstraintError = function(superClass) {
        function ForeignKeyConstraintError() {
            return ForeignKeyConstraintError.__super__.constructor.apply(this, arguments);
        }
        extend(ForeignKeyConstraintError, superClass);
        return ForeignKeyConstraintError;
    }(ConstraintError);
    NotADatabaseError = function(err) {
        return !(err instanceof DatabaseError);
    };
    DEFAULT_VALUE = {};
    bindDefaultValues = function(sql, bindings) {
        var bindNo;
        if (!_.some(bindings, function(binding) {
            return binding === DEFAULT_VALUE;
        })) return sql;
        bindNo = 0;
        return sqlBinds(sql, function() {
            if (bindings[bindNo] === DEFAULT_VALUE) {
                bindings.splice(bindNo, 1);
                return "DEFAULT";
            }
            bindNo++;
            return "?";
        });
    };
    alwaysExport = {
        DEFAULT_VALUE: DEFAULT_VALUE,
        DatabaseError: DatabaseError,
        ConstraintError: ConstraintError,
        UniqueConstraintError: UniqueConstraintError,
        ForeignKeyConstraintError: ForeignKeyConstraintError
    };
    atomicExecuteSql = function(sql, bindings, callback) {
        return this.transaction().then(function(tx) {
            var result;
            result = tx.executeSql(sql, bindings);
            return result.finally(function() {
                return result.isRejected() ? tx.rollback() : tx.end();
            });
        }).nodeify(callback);
    };
    Tx = function() {
        function Tx(stackTraceErr, executeSql, rollback, end) {
            var automaticClose, closeTransaction, pendingExecutes;
            automaticClose = function(_this) {
                return function() {
                    console.error("Transaction still open after " + timeoutMS + "ms without an execute call.", stackTraceErr.stack);
                    return _this.rollback();
                };
            }(this);
            pendingExecutes = function() {
                var automaticCloseTimeout, pending;
                automaticCloseTimeout = setTimeout(automaticClose, timeoutMS);
                pending = 0;
                return {
                    increment: function() {
                        if (pending !== !1) {
                            pending++;
                            return clearTimeout(automaticCloseTimeout);
                        }
                    },
                    decrement: function() {
                        if (pending !== !1) {
                            pending--;
                            if (0 === pending) return automaticCloseTimeout = setTimeout(automaticClose, timeoutMS);
                            if (pending < 0) {
                                console.error("Pending transactions is less than 0, wtf?");
                                return pending = 0;
                            }
                        }
                    },
                    cancel: function() {
                        pending = !1;
                        return clearTimeout(automaticCloseTimeout);
                    }
                };
            }();
            this.executeSql = function() {
                var args, bindings, callback, sql;
                sql = arguments[0], bindings = arguments[1], callback = arguments[2], args = 4 <= arguments.length ? slice.call(arguments, 3) : [];
                null == bindings && (bindings = []);
                pendingExecutes.increment();
                sql = bindDefaultValues(sql, bindings);
                return executeSql.apply(null, [ sql, bindings ].concat(slice.call(args))).finally(pendingExecutes.decrement).catch(NotADatabaseError, function(err) {
                    throw new DatabaseError(err);
                }).nodeify(callback);
            };
            this.rollback = function(callback) {
                var promise;
                promise = rollback();
                closeTransaction("Transaction has been rolled back.");
                return promise.nodeify(callback);
            };
            this.end = function(callback) {
                var promise;
                promise = end();
                closeTransaction("Transaction has been ended.");
                return promise.nodeify(callback);
            };
            closeTransaction = function(_this) {
                return function(message) {
                    var rejectionValue;
                    pendingExecutes.cancel();
                    rejectionValue = new Error(message);
                    _this.executeSql = function(sql, bindings, callback) {
                        return Promise.rejected(rejectionValue).nodeify(callback);
                    };
                    return _this.rollback = _this.end = function(callback) {
                        return Promise.rejected(rejectionValue).nodeify(callback);
                    };
                };
            }(this);
        }
        var timeoutMS;
        if (process.env.TRANSACTION_TIMEOUT_MS) {
            timeoutMS = parseInt(process.env.TRANSACTION_TIMEOUT_MS);
            if (_.isNaN(timeoutMS) || timeoutMS <= 0) throw new Error("Invalid valid for TRANSACTION_TIMEOUT_MS: " + process.env.TRANSACTION_TIMEOUT_MS);
        } else timeoutMS = 1e4;
        return Tx;
    }();
    createTransaction = function(createFunc) {
        return function(callback) {
            var promise, stackTraceErr;
            stackTraceErr = new Error();
            promise = new Promise(function(resolve, reject) {
                return createFunc(resolve, reject, stackTraceErr);
            });
            null != callback && promise.tap(callback).catch(function(err) {
                return console.error(err, callback);
            });
            return promise;
        };
    };
    try {
        pg = __webpack_require__(7);
        ConnectionParameters = __webpack_require__(8);
    } catch (error) {}
    null != pg && (exports.postgres = function(connectString) {
        var PG_FOREIGN_KEY_VIOLATION, PG_UNIQUE_VIOLATION, PostgresTx, config, createResult, pool;
        PG_UNIQUE_VIOLATION = "23505";
        PG_FOREIGN_KEY_VIOLATION = "23503";
        config = new ConnectionParameters(connectString);
        config.Promise = Promise;
        config.max = pg.defaults.poolSize;
        config.idleTimeoutMillis = pg.defaults.poolIdleTimeout;
        config.log = pg.defaults.poolLog;
        pool = new pg.Pool(config);
        createResult = function(arg) {
            var ref, rowCount, rows;
            rowCount = arg.rowCount, rows = arg.rows;
            return {
                rows: {
                    length: (null != rows ? rows.length : void 0) || 0,
                    item: function(i) {
                        return rows[i];
                    },
                    forEach: function(iterator, thisArg) {
                        return rows.forEach(iterator, thisArg);
                    },
                    map: function(iterator, thisArg) {
                        return rows.map(iterator, thisArg);
                    }
                },
                rowsAffected: rowCount,
                insertId: (null != (ref = rows[0]) ? ref.id : void 0) || null
            };
        };
        PostgresTx = function(superClass) {
            function PostgresTx(_db, _close, _stackTraceErr) {
                var end, executeSql, rollback;
                executeSql = function(sql, bindings, addReturning) {
                    var bindNo;
                    null == addReturning && (addReturning = !1);
                    bindings = bindings.slice(0);
                    addReturning && /^\s*INSERT\s+INTO/i.test(sql) && (sql = sql.replace(/;?$/, ' RETURNING "' + addReturning + '";'));
                    if (_.includes(sql, "?")) {
                        bindNo = 0;
                        sql = sqlBinds(sql, function() {
                            var bindString, binding, initialBindNo;
                            if (Array.isArray(bindings[bindNo])) {
                                initialBindNo = bindNo;
                                bindString = function() {
                                    var j, len, ref, results;
                                    ref = bindings[initialBindNo];
                                    results = [];
                                    for (j = 0, len = ref.length; j < len; j++) {
                                        binding = ref[j];
                                        results.push("$" + ++bindNo);
                                    }
                                    return results;
                                }().join(",");
                                Array.prototype.splice.apply(bindings, [ initialBindNo, 1 ].concat(bindings[initialBindNo]));
                                return bindString;
                            }
                            if (bindings[bindNo] === DEFAULT_VALUE) {
                                bindings.splice(bindNo, 1);
                                return "DEFAULT";
                            }
                            return "$" + ++bindNo;
                        });
                    }
                    return Promise.fromCallback(function(callback) {
                        return _db.query({
                            text: sql,
                            values: bindings
                        }, callback);
                    }).catch({
                        code: PG_UNIQUE_VIOLATION
                    }, function(err) {
                        throw new UniqueConstraintError(err);
                    }).catch({
                        code: PG_FOREIGN_KEY_VIOLATION
                    }, function(err) {
                        throw new ForeignKeyConstraintError(err);
                    }).then(createResult);
                };
                rollback = function(_this) {
                    return function() {
                        var promise;
                        promise = _this.executeSql("ROLLBACK;");
                        _close();
                        return promise;
                    };
                }(this);
                end = function(_this) {
                    return function() {
                        var promise;
                        promise = _this.executeSql("COMMIT;");
                        _close();
                        return promise;
                    };
                }(this);
                PostgresTx.__super__.constructor.call(this, _stackTraceErr, executeSql, rollback, end);
            }
            extend(PostgresTx, superClass);
            PostgresTx.prototype.tableList = function(extraWhereClause, callback) {
                null == extraWhereClause && (extraWhereClause = "");
                if (null == callback && _.isFunction(extraWhereClause)) {
                    callback = extraWhereClause;
                    extraWhereClause = "";
                }
                "" !== extraWhereClause && (extraWhereClause = "WHERE " + extraWhereClause);
                return this.executeSql("SELECT * FROM (SELECT tablename as name FROM pg_tables WHERE schemaname = 'public') t " + extraWhereClause + ";", [], callback);
            };
            PostgresTx.prototype.dropTable = function(tableName, ifExists, callback) {
                null == ifExists && (ifExists = !0);
                return this.executeSql("DROP TABLE " + (ifExists === !0 ? "IF EXISTS " : "") + '"' + tableName + '" CASCADE;', [], callback);
            };
            return PostgresTx;
        }(Tx);
        return _.extend({
            engine: "postgres",
            executeSql: atomicExecuteSql,
            transaction: createTransaction(function(resolve, reject, stackTraceErr) {
                return pool.connect(function(err, client, done) {
                    var tx;
                    if (err) {
                        console.error("Error connecting", err, err.stack);
                        process.exit();
                    }
                    tx = new PostgresTx(client, done, stackTraceErr);
                    null != process.env.PG_SCHEMA && tx.executeSql('SET search_path TO "' + process.env.PG_SCHEMA + '"');
                    tx.executeSql("START TRANSACTION;");
                    return resolve(tx);
                });
            })
        }, alwaysExport);
    });
    try {
        mysql = __webpack_require__(23);
    } catch (error) {}
    null != mysql && (exports.mysql = function(options) {
        var MYSQL_FOREIGN_KEY_VIOLATION, MYSQL_UNIQUE_VIOLATION, MySqlTx, _pool, createResult;
        MYSQL_UNIQUE_VIOLATION = "ER_DUP_ENTRY";
        MYSQL_FOREIGN_KEY_VIOLATION = "ER_ROW_IS_REFERENCED";
        _pool = mysql.createPool(options);
        _pool.on("connection", function(_db) {
            return _db.query("SET sql_mode='ANSI_QUOTES';");
        });
        createResult = function(rows) {
            return {
                rows: {
                    length: (null != rows ? rows.length : void 0) || 0,
                    item: function(i) {
                        return rows[i];
                    },
                    forEach: function(iterator, thisArg) {
                        return rows.forEach(iterator, thisArg);
                    },
                    map: function(iterator, thisArg) {
                        return rows.map(iterator, thisArg);
                    }
                },
                rowsAffected: rows.affectedRows,
                insertId: rows.insertId || null
            };
        };
        MySqlTx = function(superClass) {
            function MySqlTx(_db, _close, _stackTraceErr) {
                var end, executeSql, rollback;
                executeSql = function(sql, bindings) {
                    return Promise.fromCallback(function(callback) {
                        return _db.query(sql, bindings, callback);
                    }).catch({
                        code: MYSQL_UNIQUE_VIOLATION
                    }, function(err) {
                        throw new UniqueConstraintError(err);
                    }).catch({
                        code: MYSQL_FOREIGN_KEY_VIOLATION
                    }, function(err) {
                        throw new ForeignKeyConstraintError(err);
                    }).then(createResult);
                };
                rollback = function(_this) {
                    return function() {
                        var promise;
                        promise = _this.executeSql("ROLLBACK;");
                        _close();
                        return promise;
                    };
                }(this);
                end = function(_this) {
                    return function() {
                        var promise;
                        promise = _this.executeSql("COMMIT;");
                        _close();
                        return promise;
                    };
                }(this);
                MySqlTx.__super__.constructor.call(this, _stackTraceErr, executeSql, rollback, end);
            }
            extend(MySqlTx, superClass);
            MySqlTx.prototype.tableList = function(extraWhereClause, callback) {
                null == extraWhereClause && (extraWhereClause = "");
                if (null == callback && _.isFunction(extraWhereClause)) {
                    callback = extraWhereClause;
                    extraWhereClause = "";
                }
                "" !== extraWhereClause && (extraWhereClause = " WHERE " + extraWhereClause);
                return this.executeSql("SELECT name FROM (SELECT table_name as name FROM information_schema.tables WHERE table_schema = ?) t" + extraWhereClause + ";", [ options.database ], callback);
            };
            MySqlTx.prototype.dropTable = function(tableName, ifExists, callback) {
                null == ifExists && (ifExists = !0);
                return this.executeSql("DROP TABLE " + (ifExists === !0 ? "IF EXISTS " : "") + '"' + tableName + '";', [], callback);
            };
            return MySqlTx;
        }(Tx);
        return _.extend({
            engine: "mysql",
            executeSql: atomicExecuteSql,
            transaction: createTransaction(function(resolve, reject, stackTraceErr) {
                return _pool.getConnection(function(err, _db) {
                    var _close, tx;
                    if (err) {
                        console.error("Error connecting", err, err.stack);
                        process.exit();
                    }
                    _close = function() {
                        return _db.release();
                    };
                    tx = new MySqlTx(_db, _close, stackTraceErr);
                    tx.executeSql("START TRANSACTION;");
                    return resolve(tx);
                });
            })
        }, alwaysExport);
    });
    "undefined" != typeof openDatabase && null !== openDatabase && (exports.websql = function(databaseName) {
        var WEBSQL_CONSTRAINT_ERR, WebSqlTx, _db, createResult, getInsertId;
        WEBSQL_CONSTRAINT_ERR = 6;
        _db = openDatabase(databaseName, "1.0", "rulemotion", 2097152);
        getInsertId = function(result) {
            try {
                return result.insertId;
            } catch (error) {}
        };
        createResult = function(result) {
            return {
                rows: {
                    length: result.rows.length,
                    item: function(i) {
                        return _.clone(result.rows.item(i));
                    },
                    forEach: function() {
                        var args;
                        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
                        this.map.apply(this, args);
                    },
                    map: function(iterator, thisArg) {
                        var i, j, ref, results;
                        results = [];
                        for (i = j = 0, ref = result.rows.length; j < ref; i = j += 1) results.push(iterator.call(thisArg, this.item(i), i, result.rows));
                        return results;
                    }
                },
                rowsAffected: result.rowsAffected,
                insertId: getInsertId(result)
            };
        };
        WebSqlTx = function(superClass) {
            function WebSqlTx(_tx, _stackTraceErr) {
                var asyncRecurse, end, executeSql, queue, rollback, running;
                running = !0;
                queue = [];
                asyncRecurse = function() {
                    for (var args; args = queue.pop(); ) {
                        console.debug("Running", args[0]);
                        _tx.executeSql.apply(_tx, args);
                    }
                    if (running === !0) {
                        console.debug("Looping");
                        return _tx.executeSql("SELECT 0", [], asyncRecurse);
                    }
                };
                asyncRecurse();
                executeSql = function(sql, bindings) {
                    return new Promise(function(resolve, reject) {
                        var errorCallback, successCallback;
                        sql = bindDefaultValues(sql, bindings);
                        successCallback = function(_tx, _results) {
                            return resolve(_results);
                        };
                        errorCallback = function(_tx, err) {
                            return reject(err);
                        };
                        return queue.push([ sql, bindings, successCallback, errorCallback ]);
                    }).catch({
                        code: WEBSQL_CONSTRAINT_ERR
                    }, function() {
                        throw new ConstraintError("Constraint failed.");
                    }).then(createResult);
                };
                rollback = function() {
                    return new Promise(function(resolve) {
                        var errorCallback, successCallback;
                        successCallback = function() {
                            resolve();
                            throw new Error("Rollback");
                        };
                        errorCallback = function() {
                            resolve();
                            return !0;
                        };
                        queue = [ [ "RUN A FAILING STATEMENT TO ROLLBACK", [], successCallback, errorCallback ] ];
                        return running = !1;
                    });
                };
                end = function() {
                    running = !1;
                    return Promise.fulfilled();
                };
                WebSqlTx.__super__.constructor.call(this, _stackTraceErr, executeSql, rollback, end);
            }
            extend(WebSqlTx, superClass);
            WebSqlTx.prototype.tableList = function(extraWhereClause, callback) {
                null == extraWhereClause && (extraWhereClause = "");
                if (null == callback && _.isFunction(extraWhereClause)) {
                    callback = extraWhereClause;
                    extraWhereClause = "";
                }
                "" !== extraWhereClause && (extraWhereClause = " AND " + extraWhereClause);
                return this.executeSql("SELECT name, sql FROM sqlite_master WHERE type='table' AND name NOT IN ('__WebKitDatabaseInfoTable__', 'sqlite_sequence')" + extraWhereClause + ";", [], callback);
            };
            WebSqlTx.prototype.dropTable = function(tableName, ifExists, callback) {
                null == ifExists && (ifExists = !0);
                return this.executeSql("DROP TABLE " + (ifExists === !0 ? "IF EXISTS " : "") + '"' + tableName + '";', [], callback);
            };
            return WebSqlTx;
        }(Tx);
        return _.extend({
            engine: "websql",
            executeSql: atomicExecuteSql,
            transaction: createTransaction(function(resolve, reject, stackTraceErr) {
                return _db.transaction(function(_tx) {
                    return resolve(new WebSqlTx(_tx, stackTraceErr));
                });
            })
        }, alwaysExport);
    });
    exports.connect = function(databaseOptions) {
        if (null == exports[databaseOptions.engine] || "connect" === databaseOptions.engine) throw new Error("Unsupported database engine: " + databaseOptions.engine);
        return exports[databaseOptions.engine](databaseOptions.params);
    };
}, function(module, exports) {
    module.exports = require("lodash");
}, function(module, exports) {
    module.exports = function(sql, nextBindFn) {
        var c, i, length, newSql, ref, startQuote;
        newSql = "";
        startQuote = !1;
        i = 0;
        length = sql.length;
        for (;i < length; ) {
            c = sql[i];
            i++;
            if (startQuote !== !1) {
                if ("\\" === c || c === startQuote && sql[i] === startQuote) {
                    newSql += c;
                    c = null != (ref = sql[i]) ? ref : "";
                    i++;
                } else c === startQuote && (startQuote = !1);
                newSql += c;
            } else if ("'" === c || '"' === c) {
                startQuote = c;
                newSql += c;
            } else newSql += "?" === c ? nextBindFn() : c;
        }
        return newSql;
    };
}, function(module, exports) {
    module.exports = require("typed-error");
}, function(module, exports) {
    module.exports = require("pg");
}, function(module, exports, __webpack_require__) {
    var url = __webpack_require__(9), dns = __webpack_require__(10), defaults = __webpack_require__(11), val = function(key, config, envVar) {
        void 0 === envVar ? envVar = process.env["PG" + key.toUpperCase()] : envVar === !1 || (envVar = process.env[envVar]);
        return config[key] || envVar || defaults[key];
    }, parse = __webpack_require__(22).parse, useSsl = function() {
        switch (process.env.PGSSLMODE) {
          case "disable":
            return !1;

          case "prefer":
          case "require":
          case "verify-ca":
          case "verify-full":
            return !0;
        }
        return defaults.ssl;
    }, ConnectionParameters = function(config) {
        config = "string" == typeof config ? parse(config) : config || {};
        config.connectionString && (config = parse(config.connectionString));
        this.user = val("user", config);
        this.database = val("database", config);
        this.port = parseInt(val("port", config), 10);
        this.host = val("host", config);
        this.password = val("password", config);
        this.binary = val("binary", config);
        this.ssl = "undefined" == typeof config.ssl ? useSsl() : config.ssl;
        this.client_encoding = val("client_encoding", config);
        this.isDomainSocket = !(this.host || "").indexOf("/");
        this.application_name = val("application_name", config, "PGAPPNAME");
        this.fallback_application_name = val("fallback_application_name", config, !1);
    }, add = function(params, config, paramName) {
        var value = config[paramName];
        value && params.push(paramName + "='" + value + "'");
    };
    ConnectionParameters.prototype.getLibpqConnectionString = function(cb) {
        var params = [];
        add(params, this, "user");
        add(params, this, "password");
        add(params, this, "port");
        add(params, this, "application_name");
        add(params, this, "fallback_application_name");
        this.database && params.push("dbname='" + this.database + "'");
        this.host && params.push("host=" + this.host);
        if (this.isDomainSocket) return cb(null, params.join(" "));
        this.client_encoding && params.push("client_encoding='" + this.client_encoding + "'");
        dns.lookup(this.host, function(err, address) {
            if (err) return cb(err, null);
            params.push("hostaddr=" + address);
            return cb(null, params.join(" "));
        });
    };
    module.exports = ConnectionParameters;
}, function(module, exports) {
    module.exports = require("url");
}, function(module, exports) {
    module.exports = require("dns");
}, function(module, exports, __webpack_require__) {
    var defaults = module.exports = {
        host: "localhost",
        user: "win32" === process.platform ? process.env.USERNAME : process.env.USER,
        database: "win32" === process.platform ? process.env.USERNAME : process.env.USER,
        password: null,
        connectionString: void 0,
        port: 5432,
        rows: 0,
        binary: !1,
        poolSize: 10,
        poolIdleTimeout: 3e4,
        reapIntervalMillis: 1e3,
        returnToHead: !1,
        poolLog: !1,
        client_encoding: "",
        ssl: !1,
        application_name: void 0,
        fallback_application_name: void 0,
        parseInputDatesAsUTC: !1
    }, pgTypes = __webpack_require__(12), parseBigInteger = pgTypes.getTypeParser(20, "text"), parseBigIntegerArray = pgTypes.getTypeParser(1016, "text");
    module.exports.__defineSetter__("parseInt8", function(val) {
        pgTypes.setTypeParser(20, "text", val ? pgTypes.getTypeParser(23, "text") : parseBigInteger);
        pgTypes.setTypeParser(1016, "text", val ? pgTypes.getTypeParser(1007, "text") : parseBigIntegerArray);
    });
}, function(module, exports, __webpack_require__) {
    function noParse(val) {
        return String(val);
    }
    function getTypeParser(oid, format) {
        format = format || "text";
        return typeParsers[format] ? typeParsers[format][oid] || noParse : noParse;
    }
    function setTypeParser(oid, format, parseFn) {
        if ("function" == typeof format) {
            parseFn = format;
            format = "text";
        }
        typeParsers[format][oid] = parseFn;
    }
    var textParsers = __webpack_require__(13), binaryParsers = __webpack_require__(21), arrayParser = __webpack_require__(16);
    exports.getTypeParser = getTypeParser;
    exports.setTypeParser = setTypeParser;
    exports.arrayParser = arrayParser;
    var typeParsers = {
        text: {},
        binary: {}
    };
    textParsers.init(function(oid, converter) {
        typeParsers.text[oid] = converter;
    });
    binaryParsers.init(function(oid, converter) {
        typeParsers.binary[oid] = converter;
    });
}, function(module, exports, __webpack_require__) {
    function allowNull(fn) {
        return function nullAllowed(value) {
            return null === value ? value : fn(value);
        };
    }
    function parseBool(value) {
        return null === value ? value : "t" === value;
    }
    function parseBoolArray(value) {
        return value ? array.parse(value, parseBool) : null;
    }
    function parseIntegerArray(value) {
        return value ? array.parse(value, allowNull(ap.partialRight(parseInt, 10))) : null;
    }
    function parseBigIntegerArray(value) {
        return value ? array.parse(value, allowNull(function(entry) {
            return parseBigInteger(entry).trim();
        })) : null;
    }
    var array = __webpack_require__(14), ap = __webpack_require__(15), arrayParser = __webpack_require__(16), parseDate = __webpack_require__(17), parseInterval = __webpack_require__(18), parseByteA = __webpack_require__(20), parseFloatArray = function(value) {
        if (!value) return null;
        var p = arrayParser.create(value, function(entry) {
            null !== entry && (entry = parseFloat(entry));
            return entry;
        });
        return p.parse();
    }, parseStringArray = function(value) {
        if (!value) return null;
        var p = arrayParser.create(value);
        return p.parse();
    }, parseDateArray = function(value) {
        if (!value) return null;
        var p = arrayParser.create(value, function(entry) {
            null !== entry && (entry = parseDate(entry));
            return entry;
        });
        return p.parse();
    }, parseByteAArray = function(value) {
        var arr = parseStringArray(value);
        return arr ? arr.map(function(element) {
            return parseByteA(element);
        }) : arr;
    }, parseInteger = function(value) {
        return parseInt(value, 10);
    }, parseBigInteger = function(value) {
        var valStr = String(value);
        return /^\d+$/.test(valStr) ? valStr : value;
    }, parseJsonArray = function(value) {
        var arr = parseStringArray(value);
        return arr ? arr.map(function(el) {
            return JSON.parse(el);
        }) : arr;
    }, parsePoint = function(value) {
        if ("(" !== value[0]) return null;
        value = value.substring(1, value.length - 1).split(",");
        return {
            x: parseFloat(value[0]),
            y: parseFloat(value[1])
        };
    }, parseCircle = function(value) {
        if ("<" !== value[0] && "(" !== value[1]) return null;
        for (var point = "(", radius = "", pointParsed = !1, i = 2; i < value.length - 1; i++) {
            pointParsed || (point += value[i]);
            ")" !== value[i] ? pointParsed && "," !== value[i] && (radius += value[i]) : pointParsed = !0;
        }
        var result = parsePoint(point);
        result.radius = parseFloat(radius);
        return result;
    }, init = function(register) {
        register(20, parseBigInteger);
        register(21, parseInteger);
        register(23, parseInteger);
        register(26, parseInteger);
        register(700, parseFloat);
        register(701, parseFloat);
        register(16, parseBool);
        register(1082, parseDate);
        register(1114, parseDate);
        register(1184, parseDate);
        register(600, parsePoint);
        register(718, parseCircle);
        register(1e3, parseBoolArray);
        register(1001, parseByteAArray);
        register(1005, parseIntegerArray);
        register(1007, parseIntegerArray);
        register(1028, parseIntegerArray);
        register(1016, parseBigIntegerArray);
        register(1021, parseFloatArray);
        register(1022, parseFloatArray);
        register(1231, parseFloatArray);
        register(1014, parseStringArray);
        register(1015, parseStringArray);
        register(1008, parseStringArray);
        register(1009, parseStringArray);
        register(1115, parseDateArray);
        register(1182, parseDateArray);
        register(1185, parseDateArray);
        register(1186, parseInterval);
        register(17, parseByteA);
        register(114, JSON.parse.bind(JSON));
        register(3802, JSON.parse.bind(JSON));
        register(199, parseJsonArray);
        register(3807, parseJsonArray);
        register(2951, parseStringArray);
        register(791, parseStringArray);
        register(1183, parseStringArray);
    };
    module.exports = {
        init: init
    };
}, function(module, exports) {
    "use strict";
    function ArrayParser(source, transform) {
        this.source = source;
        this.transform = transform || identity;
        this.position = 0;
        this.entries = [];
        this.recorded = [];
        this.dimension = 0;
    }
    function identity(value) {
        return value;
    }
    exports.parse = function(source, transform) {
        return new ArrayParser(source, transform).parse();
    };
    ArrayParser.prototype.isEof = function() {
        return this.position >= this.source.length;
    };
    ArrayParser.prototype.nextCharacter = function() {
        var character = this.source[this.position++];
        return "\\" === character ? {
            value: this.source[this.position++],
            escaped: !0
        } : {
            value: character,
            escaped: !1
        };
    };
    ArrayParser.prototype.record = function(character) {
        this.recorded.push(character);
    };
    ArrayParser.prototype.newEntry = function(includeEmpty) {
        var entry;
        if (this.recorded.length > 0 || includeEmpty) {
            entry = this.recorded.join("");
            "NULL" !== entry || includeEmpty || (entry = null);
            null !== entry && (entry = this.transform(entry));
            this.entries.push(entry);
            this.recorded = [];
        }
    };
    ArrayParser.prototype.parse = function(nested) {
        for (var character, parser, quote; !this.isEof(); ) {
            character = this.nextCharacter();
            if ("{" !== character.value || quote) if ("}" !== character.value || quote) if ('"' !== character.value || character.escaped) "," !== character.value || quote ? this.record(character.value) : this.newEntry(); else {
                quote && this.newEntry(!0);
                quote = !quote;
            } else {
                this.dimension--;
                if (!this.dimension) {
                    this.newEntry();
                    if (nested) return this.entries;
                }
            } else {
                this.dimension++;
                if (this.dimension > 1) {
                    parser = new ArrayParser(this.source.substr(this.position - 1), this.transform);
                    this.entries.push(parser.parse(!0));
                    this.position += parser.position - 2;
                }
            }
        }
        if (0 !== this.dimension) throw new Error("array dimension not balanced");
        return this.entries;
    };
}, function(module, exports) {
    function ap(args, fn) {
        return function() {
            var rest = [].slice.call(arguments), first = args.slice();
            first.push.apply(first, rest);
            return fn.apply(this, first);
        };
    }
    function pa(args, fn) {
        return function() {
            var rest = [].slice.call(arguments);
            rest.push.apply(rest, args);
            return fn.apply(this, rest);
        };
    }
    function apa(left, right, fn) {
        return function() {
            return fn.apply(this, left.concat.apply(left, arguments).concat(right));
        };
    }
    function partial(fn) {
        var args = [].slice.call(arguments, 1);
        return ap(args, fn);
    }
    function partialRight(fn) {
        var args = [].slice.call(arguments, 1);
        return pa(args, fn);
    }
    function curry(fn) {
        return partial(partial, fn);
    }
    exports = module.exports = ap;
    exports.pa = pa;
    exports.apa = apa;
    exports.partial = partial;
    exports.partialRight = partialRight;
    exports.curry = curry;
    exports.curryRight = function curryRight(fn) {
        return partial(partialRight, fn);
    };
}, function(module, exports, __webpack_require__) {
    var array = __webpack_require__(14);
    module.exports = {
        create: function(source, transform) {
            return {
                parse: function() {
                    return array.parse(source, transform);
                }
            };
        }
    };
}, function(module, exports) {
    "use strict";
    function getDate(isoDate) {
        var matches = DATE.exec(isoDate), year = parseInt(matches[1], 10), month = parseInt(matches[2], 10) - 1, day = matches[3], date = new Date(year, month, day);
        date.setFullYear(year);
        return date;
    }
    function timeZoneOffset(isoDate) {
        var zone = TIME_ZONE.exec(isoDate.split(" ")[1]);
        if (zone) {
            var type = zone[1];
            if ("Z" === type) return 0;
            var sign = "-" === type ? -1 : 1, offset = 3600 * parseInt(zone[2], 10) + 60 * parseInt(zone[3] || 0, 10) + parseInt(zone[4] || 0, 10);
            return offset * sign * 1e3;
        }
    }
    var DATE_TIME = /(\d{1,})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})(\.\d{1,})?/, DATE = /^(\d{1,})-(\d{2})-(\d{2})$/, TIME_ZONE = /([Z+-])(\d{2})?:?(\d{2})?:?(\d{2})?/, BC = /BC$/, INFINITY = /^-?infinity$/;
    module.exports = function parseDate(isoDate) {
        if (INFINITY.test(isoDate)) return Number(isoDate.replace("i", "I"));
        var matches = DATE_TIME.exec(isoDate);
        if (!matches) return DATE.test(isoDate) ? getDate(isoDate) : null;
        var isBC = BC.test(isoDate), year = parseInt(matches[1], 10), isFirstCentury = year > 0 && year < 100;
        year = (isBC ? "-" : "") + year;
        var month = parseInt(matches[2], 10) - 1, day = matches[3], hour = parseInt(matches[4], 10), minute = parseInt(matches[5], 10), second = parseInt(matches[6], 10), ms = matches[7];
        ms = ms ? 1e3 * parseFloat(ms) : 0;
        var date, offset = timeZoneOffset(isoDate);
        if (null != offset) {
            var utc = Date.UTC(year, month, day, hour, minute, second, ms);
            date = new Date(utc - offset);
        } else date = new Date(year, month, day, hour, minute, second, ms);
        isFirstCentury && date.setUTCFullYear(year);
        return date;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    function PostgresInterval(raw) {
        if (!(this instanceof PostgresInterval)) return new PostgresInterval(raw);
        extend(this, parse(raw));
    }
    function parse(interval) {
        if (!interval) return {};
        var matches = INTERVAL.exec(interval), isNegative = "-" === matches[8];
        return Object.keys(positions).reduce(function(parsed, property) {
            var position = positions[property], value = matches[position];
            if (!value) return parsed;
            value = parseInt(value, 10);
            if (!value) return parsed;
            isNegative && ~negatives.indexOf(property) && (value *= -1);
            parsed[property] = value;
            return parsed;
        }, {});
    }
    var extend = __webpack_require__(19);
    module.exports = PostgresInterval;
    var properties = [ "seconds", "minutes", "hours", "days", "months", "years" ];
    PostgresInterval.prototype.toPostgres = function() {
        var filtered = properties.filter(this.hasOwnProperty, this);
        return 0 === filtered.length ? "0" : filtered.map(function(property) {
            return this[property] + " " + property;
        }, this).join(" ");
    };
    var NUMBER = "([+-]?\\d+)", YEAR = NUMBER + "\\s+years?", MONTH = NUMBER + "\\s+mons?", DAY = NUMBER + "\\s+days?", TIME = "([+-])?([\\d]*):(\\d\\d):(\\d\\d):?(\\d\\d\\d)?", INTERVAL = new RegExp([ YEAR, MONTH, DAY, TIME ].map(function(regexString) {
        return "(" + regexString + ")?";
    }).join("\\s*")), positions = {
        years: 2,
        months: 4,
        days: 6,
        hours: 9,
        minutes: 10,
        seconds: 11,
        milliseconds: 12
    }, negatives = [ "hours", "minutes", "seconds" ];
}, function(module, exports) {
    function extend(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) hasOwnProperty.call(source, key) && (target[key] = source[key]);
        }
        return target;
    }
    module.exports = extend;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
}, function(module, exports) {
    "use strict";
    module.exports = function parseBytea(input) {
        if (/^\\x/.test(input)) return new Buffer(input.substr(2), "hex");
        for (var output = "", i = 0; i < input.length; ) if ("\\" !== input[i]) {
            output += input[i];
            ++i;
        } else if (/[0-7]{3}/.test(input.substr(i + 1, 3))) {
            output += String.fromCharCode(parseInt(input.substr(i + 1, 3), 8));
            i += 4;
        } else {
            for (var backslashes = 1; i + backslashes < input.length && "\\" === input[i + backslashes]; ) backslashes++;
            for (var k = 0; k < Math.floor(backslashes / 2); ++k) output += "\\";
            i += 2 * Math.floor(backslashes / 2);
        }
        return new Buffer(output, "binary");
    };
}, function(module, exports) {
    var parseBits = function(data, bits, offset, invert, callback) {
        offset = offset || 0;
        invert = invert || !1;
        callback = callback || function(lastValue, newValue, bits) {
            return lastValue * Math.pow(2, bits) + newValue;
        };
        var offsetBytes = offset >> 3, inv = function(value) {
            return invert ? 255 & ~value : value;
        }, mask = 255, firstBits = 8 - offset % 8;
        if (bits < firstBits) {
            mask = 255 << 8 - bits & 255;
            firstBits = bits;
        }
        offset && (mask >>= offset % 8);
        var result = 0;
        offset % 8 + bits >= 8 && (result = callback(0, inv(data[offsetBytes]) & mask, firstBits));
        for (var bytes = bits + offset >> 3, i = offsetBytes + 1; i < bytes; i++) result = callback(result, inv(data[i]), 8);
        var lastBits = (bits + offset) % 8;
        lastBits > 0 && (result = callback(result, inv(data[bytes]) >> 8 - lastBits, lastBits));
        return result;
    }, parseFloatFromBits = function(data, precisionBits, exponentBits) {
        var bias = Math.pow(2, exponentBits - 1) - 1, sign = parseBits(data, 1), exponent = parseBits(data, exponentBits, 1);
        if (0 === exponent) return 0;
        var precisionBitsCounter = 1, parsePrecisionBits = function(lastValue, newValue, bits) {
            0 === lastValue && (lastValue = 1);
            for (var i = 1; i <= bits; i++) {
                precisionBitsCounter /= 2;
                (newValue & 1 << bits - i) > 0 && (lastValue += precisionBitsCounter);
            }
            return lastValue;
        }, mantissa = parseBits(data, precisionBits, exponentBits + 1, !1, parsePrecisionBits);
        return exponent == Math.pow(2, exponentBits + 1) - 1 ? 0 === mantissa ? 0 === sign ? 1 / 0 : -(1 / 0) : NaN : (0 === sign ? 1 : -1) * Math.pow(2, exponent - bias) * mantissa;
    }, parseInt16 = function(value) {
        return 1 == parseBits(value, 1) ? -1 * (parseBits(value, 15, 1, !0) + 1) : parseBits(value, 15, 1);
    }, parseInt32 = function(value) {
        return 1 == parseBits(value, 1) ? -1 * (parseBits(value, 31, 1, !0) + 1) : parseBits(value, 31, 1);
    }, parseFloat32 = function(value) {
        return parseFloatFromBits(value, 23, 8);
    }, parseFloat64 = function(value) {
        return parseFloatFromBits(value, 52, 11);
    }, parseNumeric = function(value) {
        var sign = parseBits(value, 16, 32);
        if (49152 == sign) return NaN;
        for (var weight = Math.pow(1e4, parseBits(value, 16, 16)), result = 0, digits = [], ndigits = parseBits(value, 16), i = 0; i < ndigits; i++) {
            result += parseBits(value, 16, 64 + 16 * i) * weight;
            weight /= 1e4;
        }
        var scale = Math.pow(10, parseBits(value, 16, 48));
        return (0 === sign ? 1 : -1) * Math.round(result * scale) / scale;
    }, parseDate = function(isUTC, value) {
        var sign = parseBits(value, 1), rawValue = parseBits(value, 63, 1), result = new Date((0 === sign ? 1 : -1) * rawValue / 1e3 + 9466848e5);
        isUTC || result.setTime(result.getTime() + 6e4 * result.getTimezoneOffset());
        result.usec = rawValue % 1e3;
        result.getMicroSeconds = function() {
            return this.usec;
        };
        result.setMicroSeconds = function(value) {
            this.usec = value;
        };
        result.getUTCMicroSeconds = function() {
            return this.usec;
        };
        return result;
    }, parseArray = function(value) {
        for (var dim = parseBits(value, 32), flags = parseBits(value, 32, 32), elementType = parseBits(value, 32, 64), offset = 96, dims = [], i = 0; i < dim; i++) {
            dims[i] = parseBits(value, 32, offset);
            offset += 32;
            offset += 32;
        }
        var parseElement = function(elementType) {
            var length = parseBits(value, 32, offset);
            offset += 32;
            if (4294967295 == length) return null;
            var result;
            if (23 == elementType || 20 == elementType) {
                result = parseBits(value, 8 * length, offset);
                offset += 8 * length;
                return result;
            }
            if (25 == elementType) {
                result = value.toString(this.encoding, offset >> 3, (offset += length << 3) >> 3);
                return result;
            }
            console.log("ERROR: ElementType not implemented: " + elementType);
        }, parse = function(dimension, elementType) {
            var array = [], i;
            if (dimension.length > 1) {
                var count = dimension.shift();
                for (i = 0; i < count; i++) array[i] = parse(dimension, elementType);
                dimension.unshift(count);
            } else for (i = 0; i < dimension[0]; i++) array[i] = parseElement(elementType);
            return array;
        };
        return parse(dims, elementType);
    }, parseText = function(value) {
        return value.toString("utf8");
    }, parseBool = function(value) {
        return null === value ? null : parseBits(value, 8) > 0;
    }, init = function(register) {
        register(21, parseInt16);
        register(23, parseInt32);
        register(26, parseInt32);
        register(1700, parseNumeric);
        register(700, parseFloat32);
        register(701, parseFloat64);
        register(16, parseBool);
        register(1114, parseDate.bind(null, !1));
        register(1184, parseDate.bind(null, !0));
        register(1e3, parseArray);
        register(1007, parseArray);
        register(1016, parseArray);
        register(1008, parseArray);
        register(1009, parseArray);
        register(25, parseText);
    };
    module.exports = {
        init: init
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    function parse(str) {
        var config;
        if ("/" === str.charAt(0)) {
            config = str.split(" ");
            return {
                host: config[0],
                database: config[1]
            };
        }
        / |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(str) && (str = encodeURI(str).replace(/\%25(\d\d)/g, "%$1"));
        var result = url.parse(str, !0);
        config = {};
        result.query.application_name && (config.application_name = result.query.application_name);
        result.query.fallback_application_name && (config.fallback_application_name = result.query.fallback_application_name);
        config.port = result.port;
        if ("socket:" == result.protocol) {
            config.host = decodeURI(result.pathname);
            config.database = result.query.db;
            config.client_encoding = result.query.encoding;
            return config;
        }
        config.host = result.hostname;
        var pathname = result.pathname;
        pathname && "/" === pathname.charAt(0) && (pathname = result.pathname.slice(1) || null);
        config.database = pathname && decodeURI(pathname);
        var auth = (result.auth || ":").split(":");
        config.user = auth[0];
        config.password = auth.splice(1).join(":");
        var ssl = result.query.ssl;
        "true" !== ssl && "1" !== ssl || (config.ssl = !0);
        return config;
    }
    var url = __webpack_require__(9);
    module.exports = {
        parse: parse
    };
}, function(module, exports) {
    module.exports = require("mysql");
}, function(module, exports, __webpack_require__) {
    var AbstractSQL2CLF, AbstractSQLCompiler, LF2AbstractSQL, LF2AbstractSQLTranslator, ODataMetadataGenerator, PinejsClient, PinejsClientCore, Promise, SBVRParser, SbvrValidationError, SqlCompilationError, TypedError, UnsupportedMethodError, _, api, apiHooks, checkForExpansion, cleanupModel, clientModels, db, devModel, executeModel, executeModels, executeStandardModels, fetchProcessing, getAndCheckBindValues, getHooks, handleODataRequest, memoize, memoizedCompileRule, migrator, odataMetadata, odataResourceURI, permissions, prettifyConstraintError, processOData, resolveOdataBind, respondDelete, respondGet, respondOptions, respondPost, respondPut, runDelete, runGet, runHook, runPost, runPut, runQuery, runTransaction, runURI, sbvrTypes, seModels, sqlModels, uriParser, validateModel, extend = function(child, parent) {
        function ctor() {
            this.constructor = child;
        }
        for (var key in parent) hasProp.call(parent, key) && (child[key] = parent[key]);
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }, hasProp = {}.hasOwnProperty;
    _ = __webpack_require__(4);
    Promise = __webpack_require__(2);
    TypedError = __webpack_require__(6);
    LF2AbstractSQL = __webpack_require__(25);
    AbstractSQLCompiler = __webpack_require__(33);
    PinejsClientCore = __webpack_require__(39);
    sbvrTypes = __webpack_require__(36);
    SBVRParser = __webpack_require__(40);
    migrator = __webpack_require__(44);
    AbstractSQL2CLF = __webpack_require__(137);
    ODataMetadataGenerator = __webpack_require__(138);
    devModel = __webpack_require__(139);
    permissions = __webpack_require__(46);
    uriParser = __webpack_require__(50);
    memoize = __webpack_require__(115);
    memoizedCompileRule = memoize(function(abstractSqlQuery) {
        return AbstractSQLCompiler.compileRule(abstractSqlQuery);
    }, {
        primitive: !0
    });
    db = null;
    exports.sbvrTypes = sbvrTypes;
    fetchProcessing = _.mapValues(sbvrTypes, function(arg) {
        var fetchProcessing;
        fetchProcessing = arg.fetchProcessing;
        if (null != fetchProcessing) return Promise.promisify(fetchProcessing);
    });
    LF2AbstractSQLTranslator = LF2AbstractSQL.createTranslator(sbvrTypes);
    seModels = {};
    sqlModels = {};
    clientModels = {};
    odataMetadata = {};
    apiHooks = {
        all: {},
        GET: {},
        PUT: {},
        POST: {},
        PATCH: {},
        DELETE: {},
        OPTIONS: {}
    };
    apiHooks.MERGE = apiHooks.PATCH;
    UnsupportedMethodError = function(superClass) {
        function UnsupportedMethodError() {
            return UnsupportedMethodError.__super__.constructor.apply(this, arguments);
        }
        extend(UnsupportedMethodError, superClass);
        return UnsupportedMethodError;
    }(TypedError);
    SqlCompilationError = function(superClass) {
        function SqlCompilationError() {
            return SqlCompilationError.__super__.constructor.apply(this, arguments);
        }
        extend(SqlCompilationError, superClass);
        return SqlCompilationError;
    }(TypedError);
    SbvrValidationError = function(superClass) {
        function SbvrValidationError() {
            return SbvrValidationError.__super__.constructor.apply(this, arguments);
        }
        extend(SbvrValidationError, superClass);
        return SbvrValidationError;
    }(TypedError);
    prettifyConstraintError = function(err, tableName) {
        var matches;
        if (err instanceof db.ConstraintError) {
            if (err instanceof db.UniqueConstraintError) {
                switch (db.engine) {
                  case "mysql":
                    matches = /ER_DUP_ENTRY: Duplicate entry '.*?[^\\]' for key '(.*?[^\\])'/.exec(err);
                    break;

                  case "postgres":
                    matches = new RegExp('"' + tableName + '_(.*?)_key"').exec(err);
                    if (null == matches) throw new db.UniqueConstraintError("Unique key constraint violated");
                }
                throw new db.UniqueConstraintError('"' + matches[1] + '" must be unique'.replace(/-/g, "__") + ".");
            }
            if (err instanceof db.ForeignKeyConstraintError) {
                switch (db.engine) {
                  case "mysql":
                    matches = /ER_ROW_IS_REFERENCED_: Cannot delete or update a parent row: a foreign key constraint fails \(".*?"\.(".*?").*/.exec(err);
                    break;

                  case "postgres":
                    matches = new RegExp('"' + tableName + '" violates foreign key constraint ".*?" on table "(.*?)"').exec(err);
                    null == matches && (matches = new RegExp('"' + tableName + '" violates foreign key constraint "' + tableName + '_(.*?)_fkey"').exec(err));
                    if (null == matches) throw new db.ForeignKeyConstraintError("Foreign key constraint violated");
                }
                throw new db.ForeignKeyConstraintError("Data is referenced by " + matches[1].replace(/\ /g, "_").replace(/-/g, "__") + ".");
            }
            throw err;
        }
    };
    exports.resolveOdataBind = resolveOdataBind = function(odataBinds, value) {
        var dataType, ref;
        _.isObject(value) && null != value.bind && (ref = odataBinds[value.bind], dataType = ref[0], 
        value = ref[1]);
        return value;
    };
    getAndCheckBindValues = function(vocab, odataBinds, bindings, values) {
        var mappings, sqlModelTables;
        mappings = clientModels[vocab].resourceToSQLMappings;
        sqlModelTables = sqlModels[vocab].tables;
        return Promise.map(bindings, function(binding) {
            var dataType, field, fieldName, mappedFieldName, mappedTableName, ref, ref1, ref2, referencedName, tableName, value;
            if ("Bind" === binding[0]) if (_.isArray(binding[1])) {
                ref = binding[1], tableName = ref[0], fieldName = ref[1];
                referencedName = tableName + "." + fieldName;
                value = values[referencedName];
                void 0 === value && (value = values[fieldName]);
                value = resolveOdataBind(odataBinds, value);
                ref1 = mappings[tableName][fieldName], mappedTableName = ref1[0], mappedFieldName = ref1[1];
                field = _.find(sqlModelTables[mappedTableName].fields, {
                    fieldName: mappedFieldName
                });
            } else {
                if (!_.isInteger(binding[1])) throw new Error("Unknown binding: " + binding);
                if (binding[1] >= odataBinds.length) {
                    console.error("Invalid binding number '" + binding[1] + "' for binds: ", odataBinds);
                    throw new Error("Invalid binding");
                }
                ref2 = odataBinds[binding[1]], dataType = ref2[0], value = ref2[1];
                field = {
                    dataType: dataType
                };
            } else {
                dataType = binding[0], value = binding[1];
                field = {
                    dataType: dataType
                };
            }
            return void 0 === value ? db.DEFAULT_VALUE : AbstractSQLCompiler.dataTypeValidate(value, field).catch(function(e) {
                e.message = '"' + fieldName + '" ' + e.message;
                throw e;
            });
        });
    };
    exports.validateModel = validateModel = function(tx, modelName) {
        return Promise.map(sqlModels[modelName].rules, function(rule) {
            return tx.executeSql(rule.sql, rule.bindings).then(function(result) {
                var ref;
                if ((ref = result.rows.item(0).result) === !1 || 0 === ref || "0" === ref) throw new SbvrValidationError(rule.structuredEnglish);
            });
        });
    };
    exports.executeModel = executeModel = function(tx, model, callback) {
        return executeModels(tx, [ model ], callback);
    };
    exports.executeModels = executeModels = function(tx, models, callback) {
        return Promise.map(models, function(model) {
            var seModel, vocab;
            seModel = model.modelText;
            vocab = model.apiRoot;
            return migrator.run(tx, model).then(function() {
                var abstractSqlModel, clientModel, e, lfModel, metadata, sqlModel;
                try {
                    lfModel = SBVRParser.matchAll(seModel, "Process");
                } catch (error) {
                    e = error;
                    console.error("Error parsing model", vocab, e, e.stack);
                    throw new Error([ "Error parsing model", e ]);
                }
                try {
                    abstractSqlModel = LF2AbstractSQLTranslator(lfModel, "Process");
                    sqlModel = AbstractSQLCompiler.compileSchema(abstractSqlModel);
                    clientModel = AbstractSQL2CLF(sqlModel);
                    metadata = ODataMetadataGenerator(vocab, sqlModel);
                } catch (error) {
                    e = error;
                    console.error("Error compiling model", vocab, e, e.stack);
                    throw new Error([ "Error compiling model", e ]);
                }
                return Promise.reduce(sqlModel.createSchema, function(arr, createStatement) {
                    return tx.executeSql(createStatement).catch(function() {});
                }, []).then(function() {
                    seModels[vocab] = seModel;
                    sqlModels[vocab] = sqlModel;
                    clientModels[vocab] = clientModel;
                    odataMetadata[vocab] = metadata;
                    uriParser.addClientModel(vocab, clientModel);
                    return validateModel(tx, vocab);
                }).then(function() {
                    var key, ref, ref1, ref2, ref3, value;
                    api[vocab] = new PinejsClient("/" + vocab + "/");
                    api[vocab].logger = {};
                    for (key in console) {
                        value = console[key];
                        _.isFunction(value) ? null == (ref = null != (ref1 = null != (ref2 = model.logging) ? ref2[key] : void 0) ? ref1 : null != (ref3 = model.logging) ? ref3.default : void 0) || ref ? api[vocab].logger[key] = _.bind(value, console, vocab + ":") : api[vocab].logger[key] = function() {} : api[vocab].logger[key] = value;
                    }
                    return {
                        vocab: vocab,
                        se: seModel,
                        lf: lfModel,
                        abstractsql: abstractSqlModel,
                        sql: sqlModel,
                        client: clientModel
                    };
                });
            });
        }).map(function(model) {
            var updateModel;
            updateModel = function(modelType, modelText) {
                return api.dev.get({
                    resource: "model",
                    passthrough: {
                        tx: tx,
                        req: permissions.rootRead
                    },
                    options: {
                        select: "id",
                        filter: {
                            vocabulary: model.vocab,
                            model_type: modelType
                        }
                    }
                }).then(function(result) {
                    var body, id, method, ref, uri;
                    method = "POST";
                    uri = "/dev/model";
                    body = {
                        vocabulary: model.vocab,
                        model_value: modelText,
                        model_type: modelType
                    };
                    id = null != (ref = result[0]) ? ref.id : void 0;
                    if (null != id) {
                        uri += "(" + id + ")";
                        method = "PATCH";
                        body.id = id;
                    }
                    return runURI(method, uri, body, tx, permissions.root);
                });
            };
            return Promise.all([ updateModel("se", model.se), updateModel("lf", model.lf), updateModel("abstractsql", model.abstractsql), updateModel("sql", model.sql), updateModel("client", model.client) ]);
        }).catch(function(err) {
            Promise.map(models, function(model) {
                return cleanupModel(model.apiRoot);
            });
            throw err;
        }).nodeify(callback);
    };
    cleanupModel = function(vocab) {
        delete seModels[vocab];
        delete sqlModels[vocab];
        delete clientModels[vocab];
        delete odataMetadata[vocab];
        uriParser.deleteClientModel(vocab);
        return delete api[vocab];
    };
    getHooks = function() {
        var getMethodHooks, getResourceHooks, getVocabHooks, mergeHooks;
        mergeHooks = function(a, b) {
            return _.mergeWith({}, a, b, function(a, b) {
                if (_.isArray(a)) return a.concat(b);
            });
        };
        getResourceHooks = function(vocabHooks, request) {
            return null == vocabHooks ? {} : null == request.resourceName ? vocabHooks.all : mergeHooks(vocabHooks[request.resourceName], vocabHooks.all);
        };
        getVocabHooks = function(methodHooks, request) {
            return null == methodHooks ? {} : mergeHooks(getResourceHooks(methodHooks[request.vocabulary], request), getResourceHooks(methodHooks.all, request));
        };
        return getMethodHooks = function(request) {
            return mergeHooks(getVocabHooks(apiHooks[request.method], request), getVocabHooks(apiHooks.all, request));
        };
    }();
    runHook = function(hookName, args) {
        var hooks;
        Object.defineProperty(args, "api", {
            get: _.once(function() {
                return api[args.request.vocabulary].clone({
                    passthrough: _.pick(args, "req", "tx")
                });
            })
        });
        hooks = args.req.hooks[hookName] || [];
        return Promise.map(hooks, function(hook) {
            return hook(args);
        });
    };
    exports.deleteModel = function(vocabulary, callback) {
        return db.transaction().then(function(tx) {
            var dropStatements, ref;
            dropStatements = _.map(null != (ref = sqlModels[vocabulary]) ? ref.dropSchema : void 0, function(dropStatement) {
                return tx.executeSql(dropStatement);
            });
            return Promise.all(dropStatements.concat([ api.dev.delete({
                resource: "model",
                passthrough: {
                    tx: tx,
                    req: permissions.root
                },
                options: {
                    filter: {
                        vocabulary: vocabulary
                    }
                }
            }) ])).then(function() {
                tx.end();
                return cleanupModel(vocabulary);
            }).catch(function(err) {
                tx.rollback();
                throw err;
            });
        }).nodeify(callback);
    };
    exports.getID = function(vocab, request) {
        var comparison, idField, j, k, len, len1, ref, ref1, whereClause;
        idField = sqlModels[vocab].tables[request.resourceName].idField;
        ref = request.abstractSqlQuery;
        for (j = 0, len = ref.length; j < len; j++) {
            whereClause = ref[j];
            if ("Where" === whereClause[0]) {
                ref1 = whereClause.slice(1);
                for (k = 0, len1 = ref1.length; k < len1; k++) {
                    comparison = ref1[k];
                    if ("Equals" === comparison[0]) {
                        if (comparison[1][2] === idField) return comparison[2][1];
                        if (comparison[2][2] === idField) return comparison[1][1];
                    }
                }
            }
        }
        return 0;
    };
    checkForExpansion = function() {
        var rowsObjectHack;
        rowsObjectHack = function(i) {
            return this[i];
        };
        return Promise.method(function(vocab, clientModel, fieldName, instance) {
            var field;
            try {
                field = JSON.parse(instance[fieldName]);
            } catch (error) {
                field = instance[fieldName];
            }
            if (_.isArray(field)) {
                field.item = rowsObjectHack;
                return processOData(vocab, clientModel, fieldName, field).then(function(expandedField) {
                    instance[fieldName] = expandedField;
                });
            }
            null != field && (instance[fieldName] = {
                __deferred: {
                    uri: "/" + vocab + "/" + fieldName + "(" + field + ")"
                },
                __id: field
            });
        });
    }();
    odataResourceURI = function(vocab, resourceName, id) {
        id = _.isString(id) ? "'" + encodeURIComponent(id) + "'" : id;
        return "/" + vocab + "/" + resourceName + "(" + id + ")";
    };
    processOData = function() {
        var getFetchProcessingFields, getLocalFields;
        getLocalFields = function(resourceModel) {
            var dataType, fieldName, j, len, ref, ref1;
            if (null == resourceModel.localFields) {
                resourceModel.localFields = {};
                ref = resourceModel.fields;
                for (j = 0, len = ref.length; j < len; j++) {
                    ref1 = ref[j], fieldName = ref1.fieldName, dataType = ref1.dataType;
                    "ForeignKey" !== dataType && (resourceModel.localFields[fieldName.replace(/\ /g, "_")] = !0);
                }
            }
            return resourceModel.localFields;
        };
        getFetchProcessingFields = function(resourceModel) {
            return null != resourceModel.fetchProcessingFields ? resourceModel.fetchProcessingFields : resourceModel.fetchProcessingFields = _(resourceModel.fields).filter(function(arg) {
                var dataType;
                dataType = arg.dataType;
                return null != fetchProcessing[dataType];
            }).map(function(arg) {
                var dataType, fieldName;
                fieldName = arg.fieldName, dataType = arg.dataType;
                return [ fieldName.replace(/\ /g, "_"), fetchProcessing[dataType] ];
            }).fromPairs().value();
        };
        return function(vocab, clientModel, resourceName, rows) {
            var count, expandableFields, fetchProcessingFields, instances, instancesPromise, localFields, processedFields, resourceModel;
            if (0 === rows.length) return Promise.fulfilled([]);
            if (1 === rows.length && null != rows.item(0).$count) {
                count = parseInt(rows.item(0).$count, 10);
                return Promise.fulfilled(count);
            }
            resourceModel = clientModel[resourceName];
            instances = rows.map(function(instance) {
                instance.__metadata = {
                    uri: odataResourceURI(vocab, resourceModel.resourceName, +instance[resourceModel.idField]),
                    type: ""
                };
                return instance;
            });
            instancesPromise = Promise.fulfilled();
            localFields = getLocalFields(resourceModel);
            expandableFields = _.filter(_.keys(instances[0]), function(fieldName) {
                return "__" !== fieldName.slice(0, 2) && !localFields.hasOwnProperty(fieldName);
            });
            expandableFields.length > 0 && (instancesPromise = Promise.map(instances, function(instance) {
                return Promise.map(expandableFields, function(fieldName) {
                    return checkForExpansion(vocab, clientModel, fieldName, instance);
                });
            }));
            fetchProcessingFields = getFetchProcessingFields(resourceModel);
            processedFields = _.filter(_.keys(instances[0]), function(fieldName) {
                return "__" !== fieldName.slice(0, 2) && fetchProcessingFields.hasOwnProperty(fieldName);
            });
            processedFields.length > 0 && (instancesPromise = instancesPromise.then(function() {
                return Promise.map(instances, function(instance) {
                    return Promise.map(processedFields, function(resourceName) {
                        return fetchProcessingFields[resourceName](instance[resourceName]).then(function(result) {
                            instance[resourceName] = result;
                        });
                    });
                });
            }));
            return instancesPromise.then(function() {
                return instances;
            });
        };
    }();
    exports.runRule = function() {
        var LF2AbstractSQLPrepHack, translator;
        LF2AbstractSQLPrepHack = LF2AbstractSQL.LF2AbstractSQLPrep._extend({
            CardinalityOptimisation: function() {
                return this._pred(!1);
            }
        });
        translator = LF2AbstractSQL.LF2AbstractSQL.createInstance();
        translator.addTypes(sbvrTypes);
        return function(vocab, rule, callback) {
            return Promise.try(function() {
                var abstractSqlModel, e, fetchingViolators, formulationType, lfModel, logger, resourceName, ruleAbs, ruleBody, ruleLF, ruleSQL, seModel, slfModel, wantNonViolators;
                seModel = seModels[vocab];
                logger = api[vocab].logger;
                try {
                    lfModel = SBVRParser.matchAll(seModel + "\nRule: " + rule, "Process");
                } catch (error) {
                    e = error;
                    logger.error("Error parsing rule", rule, e, e.stack);
                    throw new Error([ "Error parsing rule", rule, e ]);
                }
                ruleLF = lfModel[lfModel.length - 1];
                lfModel = lfModel.slice(0, -1);
                try {
                    slfModel = LF2AbstractSQL.LF2AbstractSQLPrep.match(lfModel, "Process");
                    slfModel.push(ruleLF);
                    slfModel = LF2AbstractSQLPrepHack.match(slfModel, "Process");
                    translator.reset();
                    abstractSqlModel = translator.match(slfModel, "Process");
                } catch (error) {
                    e = error;
                    logger.error("Error compiling rule", rule, e, e.stack);
                    throw new Error([ "Error compiling rule", rule, e ]);
                }
                formulationType = ruleLF[1][0];
                resourceName = "LogicalNegation" === ruleLF[1][1][0] ? ruleLF[1][1][1][1][2][1] : ruleLF[1][1][1][2][1];
                fetchingViolators = !1;
                ruleAbs = abstractSqlModel.rules.slice(-1)[0];
                ruleBody = _.find(ruleAbs, {
                    0: "Body"
                });
                if ("Not" === ruleBody[1][0] && "Exists" === ruleBody[1][1][0] && "SelectQuery" === ruleBody[1][1][1][0]) {
                    ruleBody[1] = ruleBody[1][1][1];
                    fetchingViolators = !0;
                } else {
                    if ("Exists" !== ruleBody[1][0] || "SelectQuery" !== ruleBody[1][1][0]) throw new Error("Unsupported rule formulation");
                    ruleBody[1] = ruleBody[1][1];
                }
                wantNonViolators = "PossibilityFormulation" === formulationType || "PermissibilityFormulation" === formulationType;
                wantNonViolators === fetchingViolators && (ruleBody[1] = _.map(ruleBody[1], function(queryPart) {
                    if ("Where" !== queryPart[0]) return queryPart;
                    if (queryPart.length > 2) throw new Error("Unsupported rule formulation");
                    return [ "Where", [ "Not", queryPart[1] ] ];
                }));
                ruleBody[1] = _.map(ruleBody[1], function(queryPart) {
                    return "Select" !== queryPart[0] ? queryPart : [ "Select", "*" ];
                });
                ruleSQL = AbstractSQLCompiler.compileRule(ruleBody);
                return db.executeSql(ruleSQL.query, ruleSQL.bindings).then(function(result) {
                    var clientModel, filter, ids;
                    resourceName = resourceName.replace(/\ /g, "_").replace(/-/g, "__");
                    clientModel = clientModels[vocab].resources[resourceName];
                    ids = result.rows.map(function(row) {
                        return row[clientModel.idField];
                    });
                    ids = _.uniq(ids);
                    ids = _.map(ids, function(id) {
                        return clientModel.idField + " eq " + id;
                    });
                    filter = ids.length > 0 ? ids.join(" or ") : "0 eq 1";
                    return runURI("GET", "/" + vocab + "/" + clientModel.resourceName + "?$filter=" + filter, null, null, permissions.rootRead).then(function(result) {
                        result.__formulationType = formulationType;
                        result.__resourceName = resourceName;
                        return result;
                    });
                });
            }).nodeify(callback);
        };
    }();
    exports.PinejsClient = PinejsClient = function(superClass) {
        function PinejsClient() {
            return PinejsClient.__super__.constructor.apply(this, arguments);
        }
        extend(PinejsClient, superClass);
        PinejsClient.prototype._request = function(arg) {
            var body, method, req, tx, url;
            method = arg.method, url = arg.url, body = arg.body, tx = arg.tx, req = arg.req;
            return runURI(method, url, body, tx, req);
        };
        return PinejsClient;
    }(PinejsClientCore(_, Promise));
    exports.api = api = {};
    exports.runURI = runURI = function(method, uri, body, tx, req, callback) {
        var apiKey, message, user;
        null == body && (body = {});
        if (null != callback && !_.isFunction(callback)) {
            message = "Called runURI with a non-function callback?!";
            console.trace(message);
            return Promise.rejected(message);
        }
        if (_.isObject(req)) {
            user = req.user;
            apiKey = req.apiKey;
        } else {
            null != req && console.warn("Non-object req passed to runURI?", req, new Error().stack);
            user = {
                permissions: []
            };
        }
        req = {
            user: user,
            apiKey: apiKey,
            method: method,
            url: uri,
            body: body,
            params: {},
            query: {},
            tx: tx
        };
        return new Promise(function(resolve, reject) {
            var next, res;
            res = {
                statusCode: 200,
                status: function(statusCode1) {
                    this.statusCode = statusCode1;
                    return this;
                },
                sendStatus: function(statusCode) {
                    return statusCode >= 400 ? reject(statusCode) : resolve();
                },
                send: function(statusCode) {
                    null == statusCode && (statusCode = this.statusCode);
                    return this.sendStatus(statusCode);
                },
                json: function(data, statusCode) {
                    null == statusCode && (statusCode = this.statusCode);
                    return statusCode >= 400 ? reject(data) : resolve(data);
                },
                set: function() {},
                type: function() {}
            };
            next = function(route) {
                console.warn("Next called on a runURI?!", method, uri, route);
                return res.sendStatus(500);
            };
            return handleODataRequest(req, res, next);
        }).nodeify(callback);
    };
    exports.handleODataRequest = handleODataRequest = function(req, res, next) {
        var apiRoot, url;
        url = req.url.split("/");
        apiRoot = url[1];
        if (null == apiRoot || null == clientModels[apiRoot]) return next("route");
        api[apiRoot].logger.log("Parsing", req.method, req.url);
        req.hooks = getHooks({
            method: req.method,
            vocabulary: apiRoot
        });
        return runHook("PREPARSE", {
            req: req,
            tx: req.tx
        }).then(function() {
            return uriParser.parseODataURI(req);
        }).then(function(requests) {
            return Promise.map(requests, function(request) {
                req.hooks = getHooks(request);
                return runHook("POSTPARSE", {
                    req: req,
                    request: request,
                    tx: req.tx
                }).return(request).then(uriParser.translateUri).then(function(request) {
                    var err;
                    if (null != request.abstractSqlQuery) try {
                        request.sqlQuery = memoizedCompileRule(request.abstractSqlQuery);
                    } catch (error) {
                        err = error;
                        api[apiRoot].logger.error("Failed to compile abstract sql: ", request.abstractSqlQuery, err, err.stack);
                        throw new SqlCompilationError(err);
                    }
                    return request;
                });
            });
        }).then(function(requests) {
            var logger, request;
            request = requests[0];
            logger = api[request.vocabulary].logger;
            res.set("Cache-Control", "no-cache");
            logger.log("Running", req.method, req.url);
            return runTransaction(req, request, function(tx) {
                return runHook("PRERUN", {
                    req: req,
                    request: request,
                    tx: tx
                }).then(function() {
                    switch (req.method) {
                      case "GET":
                        return runGet(req, res, request, tx);

                      case "POST":
                        return runPost(req, res, request, tx);

                      case "PUT":
                      case "PATCH":
                      case "MERGE":
                        return runPut(req, res, request, tx);

                      case "DELETE":
                        return runDelete(req, res, request, tx);
                    }
                });
            }).then(function(result) {
                switch (req.method) {
                  case "GET":
                    return respondGet(req, res, request, result);

                  case "POST":
                    return respondPost(req, res, request, result);

                  case "PUT":
                  case "PATCH":
                  case "MERGE":
                    return respondPut(req, res, request, result);

                  case "DELETE":
                    return respondDelete(req, res, request, result);

                  case "OPTIONS":
                    return respondOptions(req, res, request, result);

                  default:
                    throw new UnsupportedMethodError();
                }
            }).catch(db.DatabaseError, function(err) {
                prettifyConstraintError(err, request.resourceName);
                logger.error(err, err.stack);
                return res.sendStatus(500);
            }).catch(EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError, function(err) {
                logger.error(err, err.stack);
                return res.sendStatus(500);
            });
        }).catch(SbvrValidationError, function(err) {
            return res.status(400).send(err.message);
        }).catch(uriParser.BadRequestError, function() {
            return res.sendStatus(400);
        }).catch(permissions.PermissionError, function(err) {
            return res.sendStatus(401);
        }).catch(SqlCompilationError, uriParser.TranslationError, uriParser.ParsingError, permissions.PermissionParsingError, function(err) {
            return res.sendStatus(500);
        }).catch(UnsupportedMethodError, function(err) {
            return res.sendStatus(405);
        }).catch(function(err) {
            err instanceof Error && (err = err.message);
            return res.status(404).json(err);
        });
    };
    runTransaction = function(req, request, callback) {
        var runCallback;
        runCallback = function(tx) {
            return callback(tx).tap(function(result) {
                return runHook("POSTRUN", {
                    req: req,
                    request: request,
                    result: result,
                    tx: tx
                });
            });
        };
        return null != req.tx ? runCallback(req.tx) : db.transaction().then(function(tx) {
            return runCallback(tx).tap(function() {
                return tx.end();
            }).catch(function(err) {
                tx.rollback();
                throw err;
            });
        });
    };
    runQuery = function(tx, request, queryIndex, addReturning) {
        var odataBinds, sqlQuery, values, vocabulary;
        values = request.values, odataBinds = request.odataBinds, sqlQuery = request.sqlQuery, 
        vocabulary = request.vocabulary;
        null != queryIndex && (sqlQuery = sqlQuery[queryIndex]);
        return getAndCheckBindValues(vocabulary, odataBinds, sqlQuery.bindings, values).then(function(values) {
            api[vocabulary].logger.log(sqlQuery.query, values);
            sqlQuery.values = values;
            return tx.executeSql(sqlQuery.query, values, null, addReturning);
        });
    };
    runGet = function(req, res, request, tx) {
        if (null != request.sqlQuery) return runQuery(tx, request);
    };
    respondGet = function(req, res, request, result) {
        var clientModel, data, vocab;
        vocab = request.vocabulary;
        if (null != request.sqlQuery) {
            clientModel = clientModels[vocab].resources;
            return processOData(vocab, clientModel, request.resourceName, result.rows).then(function(d) {
                return runHook("PRERESPOND", {
                    req: req,
                    res: res,
                    request: request,
                    result: result,
                    data: d,
                    tx: req.tx
                }).then(function() {
                    return res.json({
                        d: d
                    });
                });
            });
        }
        if ("$metadata" === request.resourceName) {
            res.type("xml");
            res.send(odataMetadata[vocab]);
        } else {
            clientModel = clientModels[vocab];
            data = "$serviceroot" === request.resourceName ? {
                __model: clientModel.resources
            } : {
                __model: clientModel.resources[request.resourceName]
            };
            res.json(data);
        }
        return Promise.resolve();
    };
    runPost = function(req, res, request, tx) {
        var idField, vocab;
        vocab = request.vocabulary;
        idField = clientModels[vocab].resources[request.resourceName].idField;
        return runQuery(tx, request, null, idField).then(function(sqlResult) {
            return validateModel(tx, vocab).then(function() {
                return "UpdateQuery" === request.abstractSqlQuery[0] ? request.sqlQuery.values[0] : sqlResult.insertId;
            });
        });
    };
    respondPost = function(req, res, request, result) {
        var id, location, vocab;
        vocab = request.vocabulary;
        id = result;
        location = odataResourceURI(vocab, request.resourceName, id);
        api[vocab].logger.log("Insert ID: ", request.resourceName, id);
        return runURI("GET", location, null, req.tx, req).catch(function() {
            return {
                d: [ {
                    id: id
                } ]
            };
        }).then(function(result) {
            return runHook("PRERESPOND", {
                req: req,
                res: res,
                request: request,
                result: result,
                tx: req.tx
            }).then(function() {
                res.set("Location", location);
                return res.status(201).json(result.d[0]);
            });
        });
    };
    runPut = function(req, res, request, tx) {
        var vocab;
        vocab = request.vocabulary;
        return Promise.try(function() {
            return _.isArray(request.sqlQuery) ? runQuery(tx, request, 1).then(function(result) {
                if (0 === result.rowsAffected) return runQuery(tx, request, 0);
            }) : runQuery(tx, request);
        }).then(function() {
            return validateModel(tx, vocab);
        });
    };
    respondPut = respondDelete = respondOptions = function(req, res, request) {
        return runHook("PRERESPOND", {
            req: req,
            res: res,
            request: request,
            tx: req.tx
        }).then(function() {
            return res.sendStatus(200);
        });
    };
    runDelete = function(req, res, request, tx) {
        var vocab;
        vocab = request.vocabulary;
        return runQuery(tx, request).then(function() {
            return validateModel(tx, vocab);
        });
    };
    exports.executeStandardModels = executeStandardModels = function(tx, callback) {
        return executeModel(tx, {
            apiRoot: "dev",
            modelText: devModel,
            logging: {
                log: !1
            }
        }).then(function() {
            return executeModels(tx, permissions.config.models);
        }).then(function() {
            return console.info("Sucessfully executed standard models.");
        }).catch(function(err) {
            console.error("Failed to execute standard models.", err, err.stack);
            throw err;
        }).nodeify(callback);
    };
    exports.addHook = function(method, apiRoot, resourceName, callbacks) {
        var apiRootHooks, callback, callbackType, methodHooks, resourceHooks, results;
        methodHooks = apiHooks[method];
        if (null == methodHooks) throw new Error("Unsupported method: " + method);
        if ("all" !== apiRoot && null == clientModels[apiRoot]) throw new Error("Unknown api root: " + apiRoot);
        if ("all" !== resourceName && null == clientModels[apiRoot].resources[resourceName]) throw new Error("Unknown resource for api root: " + resourceName + ", " + apiRoot);
        for (callbackType in callbacks) {
            callback = callbacks[callbackType];
            if ("PREPARSE" !== callbackType && "POSTPARSE" !== callbackType && "PRERUN" !== callbackType && "POSTRUN" !== callbackType && "PRERESPOND" !== callbackType) throw new Error("Unknown callback type: " + callbackType);
        }
        apiRootHooks = null != methodHooks[apiRoot] ? methodHooks[apiRoot] : methodHooks[apiRoot] = {};
        resourceHooks = null != apiRootHooks[resourceName] ? apiRootHooks[resourceName] : apiRootHooks[resourceName] = {};
        results = [];
        for (callbackType in callbacks) {
            callback = callbacks[callbackType];
            null == resourceHooks[callbackType] && (resourceHooks[callbackType] = []);
            results.push(resourceHooks[callbackType].push(callback));
        }
        return results;
    };
    exports.setup = function(app, _db, callback) {
        exports.db = db = _db;
        AbstractSQLCompiler = AbstractSQLCompiler[db.engine];
        return db.transaction().then(function(tx) {
            return executeStandardModels(tx).then(function() {
                permissions.setup(app, exports);
                _.extend(exports, permissions);
                return tx.end();
            }).catch(function(err) {
                tx.rollback();
                console.error("Could not execute standard models", err, err.stack);
                return process.exit();
            });
        }).then(function() {
            return db.executeSql('CREATE UNIQUE INDEX "uniq_model_model_type_vocab" ON "model" ("vocabulary", "model type");').catch(function() {});
        }).nodeify(callback);
    };
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !function(root, factory) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(26), __webpack_require__(32) ], 
        __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof __WEBPACK_AMD_DEFINE_FACTORY__ ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, 
        void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }(this, function(LF2AbstractSQLPrep, LF2AbstractSQL) {
        LF2AbstractSQLPrep = LF2AbstractSQLPrep.LF2AbstractSQLPrep;
        LF2AbstractSQL = LF2AbstractSQL.LF2AbstractSQL;
        return {
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
    });
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !function(root, factory) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__, exports, __webpack_require__(28), __webpack_require__(31), __webpack_require__(27), __webpack_require__(4) ], 
        __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof __WEBPACK_AMD_DEFINE_FACTORY__ ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, 
        void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }(this, function(require, exports, OMeta) {
        var SBVRCompilerLibs = __webpack_require__(31).SBVRCompilerLibs, LFOptimiser = __webpack_require__(27).LFOptimiser, _ = __webpack_require__(4), LF2AbstractSQLPrep = exports.LF2AbstractSQLPrep = LFOptimiser._extend({
            AttrConceptType: function(termName) {
                var $elf = this, _fromIdx = this.input.idx, conceptType;
                conceptType = LFOptimiser._superApplyWithArgs(this, "AttrConceptType", termName);
                this._opt(function() {
                    this._pred(this.primitives[termName] === !1 && this.primitives[conceptType] !== !1);
                    this.primitives[conceptType] = !1;
                    return this._apply("SetHelped");
                });
                return conceptType;
            },
            AttrDatabaseAttribute: function(termOrFactType) {
                var $elf = this, _fromIdx = this.input.idx, attrVal, newAttrVal;
                attrVal = this.anything();
                newAttrVal = "Term" == termOrFactType[0] && (!this.attributes.hasOwnProperty(termOrFactType[3]) || this.attributes[termOrFactType[3]] === !0) || "FactType" == termOrFactType[0] && 4 == termOrFactType.length && (!this.attributes.hasOwnProperty(termOrFactType[3]) || this.attributes[termOrFactType[3]] === !0) && this.primitives.hasOwnProperty(termOrFactType[3]) && this.primitives[termOrFactType[3]] !== !1;
                this.attributes[termOrFactType] = newAttrVal;
                this._opt(function() {
                    this._pred(newAttrVal != attrVal);
                    return this._apply("SetHelped");
                });
                return newAttrVal;
            },
            AttrDatabasePrimitive: function(termOrFactType) {
                var $elf = this, _fromIdx = this.input.idx, attrVal, newAttrVal;
                attrVal = this.anything();
                newAttrVal = attrVal;
                this._opt(function() {
                    this._pred(this.primitives.hasOwnProperty(termOrFactType));
                    newAttrVal = this.primitives[termOrFactType];
                    this._pred(newAttrVal != attrVal);
                    return this._apply("SetHelped");
                });
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
                xs = this._many(function() {
                    return this._apply("trans");
                });
                this._apply("SetHelped");
                return [ "LogicalNegation", [ "ExistentialQuantification", v, [ "LogicalNegation" ].concat(xs) ] ];
            },
            AtMostNQuantification: function() {
                var $elf = this, _fromIdx = this.input.idx, maxCard, v, xs;
                maxCard = this._applyWithArgs("token", "MaximumCardinality");
                v = this._applyWithArgs("token", "Variable");
                xs = this._many(function() {
                    return this._apply("trans");
                });
                this._apply("SetHelped");
                maxCard[1][1]++;
                return [ "LogicalNegation", [ "AtLeastNQuantification", [ "MinimumCardinality", maxCard[1] ], v ].concat(xs) ];
            },
            CardinalityOptimisation2: function(v1) {
                var $elf = this, _fromIdx = this.input.idx, actualFactType, atomicForm, card, factType, required, v2;
                this._pred(3 == v1.length);
                required = this._or(function() {
                    this._form(function() {
                        this._applyWithArgs("exactly", "ExactQuantification");
                        card = this._applyWithArgs("token", "Cardinality");
                        this._pred(1 == card[1][1]);
                        v2 = this._applyWithArgs("token", "Variable");
                        return atomicForm = this._applyWithArgs("token", "AtomicFormulation");
                    });
                    return !0;
                }, function() {
                    this._form(function() {
                        this._applyWithArgs("exactly", "AtMostNQuantification");
                        card = this._applyWithArgs("token", "MaximumCardinality");
                        this._pred(1 == card[1][1]);
                        v2 = this._applyWithArgs("token", "Variable");
                        return atomicForm = this._applyWithArgs("token", "AtomicFormulation");
                    });
                    return !1;
                });
                this._apply("end");
                this._pred(3 == v2.length);
                factType = atomicForm[1];
                this._pred(!this.termForms[factType]);
                this._pred(4 == atomicForm.length && 4 == factType.length);
                actualFactType = this._applyWithArgs("UnmappedFactType", factType.slice(1));
                actualFactType = [ "FactType" ].concat(actualFactType);
                this._or(function() {
                    this._pred(this.IdentifiersEqual(v1[2], actualFactType[1]) && this.IdentifiersEqual(v2[2], actualFactType[3]));
                    return this.foreignKeys[actualFactType] = required;
                }, function() {
                    this._pred(this.IdentifiersEqual(v1[2], actualFactType[3]) && this.IdentifiersEqual(v2[2], actualFactType[1]));
                    return this.uniqueKeys[actualFactType] = required;
                });
                return this._apply("SetHelped");
            },
            CardinalityOptimisation: function() {
                var $elf = this, _fromIdx = this.input.idx, v1;
                return this._form(function() {
                    switch (this.anything()) {
                      case "LogicalNegation":
                        return this._form(function() {
                            this._applyWithArgs("exactly", "ExistentialQuantification");
                            v1 = this._applyWithArgs("token", "Variable");
                            return this._form(function() {
                                this._applyWithArgs("exactly", "LogicalNegation");
                                return this._applyWithArgs("CardinalityOptimisation2", v1);
                            });
                        });

                      case "UniversalQuantification":
                        v1 = this._applyWithArgs("token", "Variable");
                        return this._applyWithArgs("CardinalityOptimisation2", v1);

                      default:
                        throw this._fail();
                    }
                });
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
                return this._or(function() {
                    this._form(function() {
                        switch (this.anything()) {
                          case "NecessityFormulation":
                            return this._apply("NecessityOptimisation");

                          case "ObligationFormulation":
                            return this._apply("ObligationOptimisation");

                          default:
                            throw this._fail();
                        }
                    });
                    this._applyWithArgs("token", "StructuredEnglish");
                    return null;
                }, function() {
                    return LFOptimiser._superApplyWithArgs(this, "Rule");
                });
            }
        });
        LF2AbstractSQLPrep.initialize = function() {
            _.assign(this, SBVRCompilerLibs);
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
                    attrs.splice(1, 0, [ "DatabaseTableName", termOrFactType[1].replace(new RegExp(" ", "g"), "_") ]);
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
                        for (var tableName = actualFactType[1][1].replace(new RegExp(" ", "g"), "_"), i = 2; i < actualFactType.length; i++) tableName += "-" + actualFactType[i][1].replace(new RegExp(" ", "g"), "_");
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
                        this.primitives.hasOwnProperty(actualFactType[1]) && this.primitives[actualFactType[1]] === !1 || this.SetHelped();
                        this.primitives[actualFactType[1]] = !1;
                    } else if (actualFactType.length > 4) for (var i = 1; i < actualFactType.length; i += 2) {
                        this.attributes.hasOwnProperty(actualFactType[i]) && this.attributes[actualFactType[i]] === !1 || this.SetHelped();
                        this.attributes[actualFactType[i]] = !1;
                    }
                }
            }
            termOrFactType.push(attrs);
        };
    });
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !function(root, factory) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__, exports, __webpack_require__(28), __webpack_require__(29) ], 
        __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof __WEBPACK_AMD_DEFINE_FACTORY__ ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, 
        void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }(this, function(require, exports, OMeta) {
        var LFValidator = __webpack_require__(29).LFValidator, LFOptimiser = exports.LFOptimiser = LFValidator._extend({
            Helped: function() {
                var $elf = this, _fromIdx = this.input.idx;
                this._pred(this.helped === !0);
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
                this._many(function() {
                    this._applyWithArgs("Helped", "disableMemoisation");
                    return this._or(function() {
                        return x = this._applyWithArgs("trans", x);
                    }, function() {
                        console.error("Failed to reprocess?!");
                        return this._pred(!1);
                    });
                });
                return x;
            },
            AtLeastNQuantification: function() {
                var $elf = this, _fromIdx = this.input.idx, i, v, xs;
                return this._or(function() {
                    i = this._applyWithArgs("token", "MinimumCardinality");
                    this._pred(1 == i[1][1]);
                    v = this._applyWithArgs("token", "Variable");
                    xs = this._many(function() {
                        return this._apply("trans");
                    });
                    this._apply("SetHelped");
                    return [ "ExistentialQuantification", v ].concat(xs);
                }, function() {
                    return LFValidator._superApplyWithArgs(this, "AtLeastNQuantification");
                });
            },
            NumericalRangeQuantification: function() {
                var $elf = this, _fromIdx = this.input.idx, i, j, v, xs;
                return this._or(function() {
                    i = this._applyWithArgs("token", "MinimumCardinality");
                    j = this._applyWithArgs("token", "MaximumCardinality");
                    this._pred(i[1][1] == j[1][1]);
                    v = this._applyWithArgs("token", "Variable");
                    xs = this._many(function() {
                        return this._apply("trans");
                    });
                    this._apply("SetHelped");
                    return [ "ExactQuantification", [ "Cardinality", i[1] ], v ].concat(xs);
                }, function() {
                    return LFValidator._superApplyWithArgs(this, "NumericalRangeQuantification");
                });
            },
            LogicalNegation: function() {
                var $elf = this, _fromIdx = this.input.idx, xs;
                return this._or(function() {
                    this._form(function() {
                        this._applyWithArgs("exactly", "LogicalNegation");
                        return xs = this._apply("trans");
                    });
                    this._apply("SetHelped");
                    return xs;
                }, function() {
                    return LFValidator._superApplyWithArgs(this, "LogicalNegation");
                });
            }
        });
        LFOptimiser.initialize = function() {
            LFValidator.initialize.call(this);
            this._didSomething = !1;
        };
    });
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_RESULT__;
    !function(root, factory) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
            return root.OMeta = factory();
        }.call(exports, __webpack_require__, exports, module), void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }(this, function() {
        "use strict";
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
                return o === !0 ? "Btrue" : "Bfalse";

              case "string":
                return "S" + o;

              case "number":
                return "N" + o;

              default:
                o.hasOwnProperty("_id_") || (o._id_ = getTag.id++);
                return "R" + o._id_;
            }
        }
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
        function OMInputStreamEnd(lst, idx) {
            this.memo = {};
            this.lst = lst;
            this.idx = idx;
        }
        function ListOMInputStream(lst, idx) {
            this.memo = {};
            this.lst = lst;
            this.idx = idx;
            this.hd = lst[idx];
        }
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
        var fail = function fail() {
            return fail.error;
        };
        fail.error = new SyntaxError("match failed");
        fail.error._extend = function(child) {
            return objectThatDelegatesTo(this, child);
        };
        getTag.id = 0;
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
        OMInputStreamEnd.prototype = objectThatDelegatesTo(OMInputStream.prototype);
        OMInputStreamEnd.prototype.head = throwFail;
        OMInputStreamEnd.prototype.tail = throwFail;
        ListOMInputStream.prototype = objectThatDelegatesTo(OMInputStream.prototype);
        ListOMInputStream.prototype.head = function() {
            return this.hd;
        };
        ListOMInputStream.prototype.tail = function() {
            return this.tl || (this.tl = makeListOMInputStream(this.lst, this.idx + 1));
        };
        var OMeta;
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
                        if (rulesToTrack.indexOf(rule) !== -1 && startInput !== endInput) {
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
                    if (failer === !0) for (var self = this, sentinel = this.input, lookupFunc = function() {
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
                        newInput = this.input[getTag(v)];
                        if (!newInput) {
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
                var self = this, origInput = this.input, origAddBranch = this._addBranch, origAddToken = this._addToken;
                return always(function() {
                    return lookup(function() {
                        x.call(self);
                    }, throwFail, function() {
                        self.input = origInput;
                        return !0;
                    });
                }, function() {
                    self._addBranch = origAddBranch;
                    self._addToken = origAddToken;
                });
            },
            _lookahead: function(x) {
                var origInput = this.input, r = x.call(this);
                this.input = origInput;
                return r;
            },
            _or: function() {
                for (var self = this, origInput = this.input, ref = {}, result = ref, lookupFunc = function() {
                    self.input = origInput;
                    result = arg.call(self);
                }, idx = 0; idx < arguments.length; idx++) {
                    var arg = arguments[idx];
                    lookup(lookupFunc);
                    if (result !== ref) return result;
                }
                throw fail();
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
                lookup(function() {
                    ans = x.call(self);
                }, noop, function() {
                    self.input = origInput;
                });
                return ans;
            },
            _many: function(x, y) {
                for (var self = this, origInput, ans = void 0 !== y ? [ y ] : [], resetAndReturnTrue = function() {
                    self.input = origInput;
                    return !0;
                }, lookupFunc = function() {
                    ans.push(x.call(self));
                }; ;) {
                    origInput = this.input;
                    var result = lookup(lookupFunc, returnFalse, resetAndReturnTrue);
                    if (result) break;
                }
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
                                ans[idx / 2] = args[idx + 1].call(this);
                                args[idx] = "0";
                                break;

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
                this._pred(r === !0);
                return r;
            },
            false: function() {
                var r = this.anything();
                this._pred(r === !1);
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
                return this._many(function() {
                    return this._apply("space");
                });
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
                return this._or(function() {
                    return this._apply("letter");
                }, function() {
                    return this._apply("digit");
                });
            },
            firstAndRest: function(first, rest) {
                return this._many(function() {
                    return this._apply(rest);
                }, this._apply(first));
            },
            seq: function(xs) {
                for (var idx = 0; idx < xs.length; idx++) this._applyWithArgs("exactly", xs[idx]);
                return xs;
            },
            notLast: function(rule) {
                var r = this._apply(rule);
                this._lookahead(function() {
                    return this._apply(rule);
                });
                return r;
            },
            listOf: function(rule, delim) {
                return this._or(function() {
                    var r = this._apply(rule);
                    return this._many(function() {
                        this._applyWithArgs("token", delim);
                        return this._apply(rule);
                    }, r);
                }, function() {
                    return [];
                });
            },
            token: function(cs) {
                this._apply("spaces");
                return this._applyWithArgs("seq", cs);
            },
            fromTo: function(x, y) {
                return this._consumedBy(function() {
                    this._applyWithArgs("seq", x);
                    this._many(function() {
                        this._not(function() {
                            this._applyWithArgs("seq", y);
                        });
                        this._apply("char");
                    });
                    this._applyWithArgs("seq", y);
                });
            },
            hexDigit: function() {
                var v, c;
                c = this._apply("char");
                v = "0123456789abcdef".indexOf(c.toLowerCase());
                if (v === -1) throw this._fail();
                return v;
            },
            escapedChar: function() {
                var s, c;
                this._applyWithArgs("exactly", "\\");
                c = this.anything();
                switch (c) {
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
                    s = this._consumedBy(function() {
                        this._apply("hexDigit");
                        this._apply("hexDigit");
                        this._apply("hexDigit");
                        this._apply("hexDigit");
                    });
                    return String.fromCharCode(parseInt(s, 16));

                  case "x":
                    s = this._consumedBy(function() {
                        this._apply("hexDigit");
                        this._apply("hexDigit");
                    });
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
                var m = this.createInstance();
                return m.matchAll(listyObj, rule, args, matchFailed);
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
                    return lookup(function() {
                        return 1 === realArgs.length ? m._apply.call(m, realArgs[0]) : m._applyWithArgs.apply(m, realArgs);
                    }, function(value) {
                        return value;
                    }, function(err) {
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
                    });
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
                                    var secondaryDivergencePoint;
                                    do {
                                        for (var memo = input.memo, memoTokens = input.tokens, ruleNames = Object.keys(memo), i = 0; i < ruleNames.length; i++) {
                                            var ruleName = ruleNames[i];
                                            "boolean" == typeof memo[ruleName] || sideEffectingRules.indexOf(ruleName) !== -1 || memo[ruleName].nextInput.idx >= divergencePoint ? delete memo[ruleName] : input.idx > secondaryDivergencePoint && !OMeta.hasOwnProperty(ruleName) && (secondaryDivergencePoint = input.idx);
                                        }
                                        if (null != memoTokens) for (var duplicateTokens = {}, i = memoTokens.length - 1; i >= 0; i--) memoTokens[i][0] >= divergencePoint || duplicateTokens[memoTokens[i][1]] ? memoTokens.splice(i, 1) : duplicateTokens[memoTokens[i][1]] = !0;
                                        input.lst = listyObj;
                                    } while (input.idx < divergencePoint && (input = input.tail()));
                                    return secondaryDivergencePoint;
                                };
                                divergencePoint = cleanInput(divergencePoint);
                                if (divergencePoint > 0) {
                                    cleanInput(divergencePoint);
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
    });
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !function(root, factory) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__, exports, __webpack_require__(28), __webpack_require__(30) ], 
        __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof __WEBPACK_AMD_DEFINE_FACTORY__ ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, 
        void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }(this, function(require, exports, OMeta) {
        var SBVRLibs = __webpack_require__(30).SBVRLibs, LFValidator = exports.LFValidator = SBVRLibs._extend({
            trans: function() {
                var $elf = this, _fromIdx = this.input.idx, a, t;
                this._form(function() {
                    t = this.anything();
                    return a = this._applyWithArgs("apply", t);
                });
                return a;
            },
            token: function(x) {
                var $elf = this, _fromIdx = this.input.idx, a, t;
                this._form(function() {
                    t = this.anything();
                    this._pred(t == x);
                    return a = this._applyWithArgs("apply", x);
                });
                return a;
            },
            letters: function() {
                var $elf = this, _fromIdx = this.input.idx, l;
                l = this._many1(function() {
                    return this._apply("letter");
                });
                this._many(function() {
                    return this._apply("space");
                });
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
                this._many(function() {
                    x = this._or(function() {
                        return this._applyWithArgs("token", "Vocabulary");
                    }, function() {
                        return this._applyWithArgs("token", "Term");
                    }, function() {
                        return this._applyWithArgs("token", "Name");
                    }, function() {
                        return this._applyWithArgs("token", "FactType");
                    }, function() {
                        return this._applyWithArgs("token", "Rule");
                    });
                    return this._opt(function() {
                        this._pred(null != x);
                        return xs.push(x);
                    });
                });
                return [ "Model" ].concat(xs);
            },
            FactType: function() {
                var $elf = this, _fromIdx = this.input.idx, attrs, factType, identifier, verb;
                factType = [];
                this._many(function() {
                    identifier = this._or(function() {
                        return this._applyWithArgs("token", "Term");
                    }, function() {
                        return this._applyWithArgs("token", "Name");
                    });
                    verb = this._applyWithArgs("token", "Verb");
                    return factType = factType.concat([ identifier, verb ]);
                });
                this._opt(function() {
                    identifier = this._or(function() {
                        return this._applyWithArgs("token", "Term");
                    }, function() {
                        return this._applyWithArgs("token", "Name");
                    });
                    return factType.push(identifier);
                });
                this._opt(function() {
                    return this._lookahead(function() {
                        attrs = this.anything();
                        return this._applyWithArgs("AddFactType", factType, factType);
                    });
                });
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
                return this._or(function() {
                    data = this._or(function() {
                        return this._applyWithArgs("token", "Number");
                    }, function() {
                        return this._apply("Value");
                    });
                    return [ "Term", term, vocab, data ];
                }, function() {
                    return this._applyWithArgs("addAttributes", [ "Term", term, vocab ]);
                });
            },
            Name: function() {
                var $elf = this, _fromIdx = this.input.idx, name, vocab;
                name = this.anything();
                vocab = this.anything();
                return this._applyWithArgs("addAttributes", [ "Name", name, vocab ]);
            },
            Verb: function() {
                var $elf = this, _fromIdx = this.input.idx, negated, v;
                v = this.anything();
                negated = this._or(function() {
                    return this._apply("true");
                }, function() {
                    return this._apply("false");
                });
                return [ "Verb", v, negated ];
            },
            Disjunction: function() {
                var $elf = this, _fromIdx = this.input.idx, xs;
                xs = this._many(function() {
                    return this._apply("trans");
                });
                return [ "Disjunction" ].concat(xs);
            },
            Conjunction: function() {
                var $elf = this, _fromIdx = this.input.idx, xs;
                xs = this._many(function() {
                    return this._apply("trans");
                });
                return [ "Conjunction" ].concat(xs);
            },
            Rule: function() {
                var $elf = this, _fromIdx = this.input.idx, t, x;
                x = this._or(function() {
                    return this._applyWithArgs("token", "ObligationFormulation");
                }, function() {
                    return this._applyWithArgs("token", "NecessityFormulation");
                }, function() {
                    return this._applyWithArgs("token", "PossibilityFormulation");
                }, function() {
                    return this._applyWithArgs("token", "PermissibilityFormulation");
                });
                t = this._applyWithArgs("token", "StructuredEnglish");
                return [ "Rule", x, t ];
            },
            addAttributes: function(termOrFactType) {
                var $elf = this, _fromIdx = this.input.idx, attrName, attrVal, attrs, attrsFound;
                this._or(function() {
                    return this._apply("end");
                }, function() {
                    attrsFound = {};
                    attrs = [ "Attributes" ];
                    this._form(function() {
                        this._applyWithArgs("exactly", "Attributes");
                        this._many(function() {
                            return this._form(function() {
                                attrName = this.anything();
                                attrVal = this._applyWithArgs("ApplyFirstExisting", [ "Attr" + attrName, "DefaultAttr" ], [ termOrFactType ]);
                                return this._opt(function() {
                                    this._pred(null != attrVal);
                                    attrsFound[attrName] = attrVal;
                                    return attrs.push([ attrName, attrVal ]);
                                });
                            });
                        });
                        return this._apply("end");
                    });
                    return this._applyWithArgs("defaultAttributes", termOrFactType, attrsFound, attrs);
                });
                return termOrFactType;
            },
            DefaultAttr: function(tableID) {
                var $elf = this, _fromIdx = this.input.idx;
                return this.anything();
            },
            AttrConceptType: function(termOrFactType) {
                var $elf = this, _fromIdx = this.input.idx, conceptType, term, vocab;
                term = this._form(function() {
                    this._applyWithArgs("exactly", "Term");
                    conceptType = this.anything();
                    return vocab = this.anything();
                });
                this.vocabularies[this.currentVocabulary].ConceptTypes[termOrFactType] = term;
                return term;
            },
            AttrDefinition: function(termOrFactType) {
                var $elf = this, _fromIdx = this.input.idx, values;
                return this._or(function() {
                    return this._form(function() {
                        this._applyWithArgs("exactly", "Enum");
                        return values = this._many1(function() {
                            return this.anything();
                        });
                    });
                }, function() {
                    return this._apply("trans");
                });
            },
            AttrNecessity: function(termOrFactType) {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._applyWithArgs("token", "Rule");
                }, function() {
                    return this._apply("DefaultAttr");
                });
            },
            AttrSynonymousForm: function(factType) {
                var $elf = this, _fromIdx = this.input.idx, synForm;
                synForm = this.anything();
                this._applyWithArgs("AddFactType", synForm, factType.slice(1));
                return synForm;
            },
            StructuredEnglish: function() {
                var $elf = this, _fromIdx = this.input.idx, a;
                a = this.anything();
                return [ "StructuredEnglish", a ];
            },
            ObligationFormulation: function() {
                var $elf = this, _fromIdx = this.input.idx, xs;
                xs = this._many(function() {
                    return this._apply("trans");
                });
                return [ "ObligationFormulation" ].concat(xs);
            },
            NecessityFormulation: function() {
                var $elf = this, _fromIdx = this.input.idx, xs;
                xs = this._many(function() {
                    return this._apply("trans");
                });
                return [ "NecessityFormulation" ].concat(xs);
            },
            PossibilityFormulation: function() {
                var $elf = this, _fromIdx = this.input.idx, xs;
                xs = this._many(function() {
                    return this._apply("trans");
                });
                return [ "PossibilityFormulation" ].concat(xs);
            },
            PermissibilityFormulation: function() {
                var $elf = this, _fromIdx = this.input.idx, xs;
                xs = this._many(function() {
                    return this._apply("trans");
                });
                return [ "PermissibilityFormulation" ].concat(xs);
            },
            LogicalNegation: function() {
                var $elf = this, _fromIdx = this.input.idx, xs;
                xs = this._apply("trans");
                return [ "LogicalNegation" ].concat([ xs ]);
            },
            quant: function() {
                var $elf = this, _fromIdx = this.input.idx, x;
                return this._or(function() {
                    return this._applyWithArgs("token", "Disjunction");
                }, function() {
                    return this._applyWithArgs("token", "Conjunction");
                }, function() {
                    return this._applyWithArgs("token", "UniversalQuantification");
                }, function() {
                    return this._applyWithArgs("token", "ExistentialQuantification");
                }, function() {
                    return this._applyWithArgs("token", "ExactQuantification");
                }, function() {
                    return this._applyWithArgs("token", "AtMostNQuantification");
                }, function() {
                    return this._applyWithArgs("token", "AtLeastNQuantification");
                }, function() {
                    return this._applyWithArgs("token", "NumericalRangeQuantification");
                }, function() {
                    this._form(function() {
                        this._applyWithArgs("exactly", "LogicalNegation");
                        return x = this._apply("quant");
                    });
                    return [ "LogicalNegation", x ];
                });
            },
            UniversalQuantification: function() {
                var $elf = this, _fromIdx = this.input.idx, v, xs;
                v = this._applyWithArgs("token", "Variable");
                xs = this._many(function() {
                    return this._apply("trans");
                });
                return [ "UniversalQuantification", v ].concat(xs);
            },
            ExistentialQuantification: function() {
                var $elf = this, _fromIdx = this.input.idx, v, xs;
                v = this._applyWithArgs("token", "Variable");
                xs = this._many(function() {
                    return this._apply("trans");
                });
                return [ "ExistentialQuantification", v ].concat(xs);
            },
            ExactQuantification: function() {
                var $elf = this, _fromIdx = this.input.idx, i, v, xs;
                i = this._applyWithArgs("token", "Cardinality");
                v = this._applyWithArgs("token", "Variable");
                xs = this._many(function() {
                    return this._apply("trans");
                });
                return [ "ExactQuantification", i, v ].concat(xs);
            },
            AtMostNQuantification: function() {
                var $elf = this, _fromIdx = this.input.idx, a, v, xs;
                a = this._applyWithArgs("token", "MaximumCardinality");
                v = this._applyWithArgs("token", "Variable");
                xs = this._many(function() {
                    return this._apply("trans");
                });
                return [ "AtMostNQuantification", a, v ].concat(xs);
            },
            AtLeastNQuantification: function() {
                var $elf = this, _fromIdx = this.input.idx, i, v, xs;
                i = this._applyWithArgs("token", "MinimumCardinality");
                v = this._applyWithArgs("token", "Variable");
                xs = this._many(function() {
                    return this._apply("trans");
                });
                return [ "AtLeastNQuantification", i, v ].concat(xs);
            },
            NumericalRangeQuantification: function() {
                var $elf = this, _fromIdx = this.input.idx, a, i, v, xs;
                i = this._applyWithArgs("token", "MinimumCardinality");
                a = this._applyWithArgs("token", "MaximumCardinality");
                v = this._applyWithArgs("token", "Variable");
                xs = this._many(function() {
                    return this._apply("trans");
                });
                return [ "NumericalRangeQuantification", i, a, v ].concat(xs);
            },
            Cardinality: function() {
                var $elf = this, _fromIdx = this.input.idx, n;
                n = this._applyWithArgs("token", "Number");
                return [ "Cardinality", n ];
            },
            MinimumCardinality: function() {
                var $elf = this, _fromIdx = this.input.idx, n;
                n = this._applyWithArgs("token", "Number");
                return [ "MinimumCardinality", n ];
            },
            MaximumCardinality: function() {
                var $elf = this, _fromIdx = this.input.idx, n;
                n = this._applyWithArgs("token", "Number");
                return [ "MaximumCardinality", n ];
            },
            Variable: function() {
                var $elf = this, _fromIdx = this.input.idx, num, term, w;
                num = this._applyWithArgs("token", "Number");
                term = this._applyWithArgs("token", "Term");
                w = this._many(function() {
                    return this._or(function() {
                        return this._applyWithArgs("token", "AtomicFormulation");
                    }, function() {
                        return this._apply("quant");
                    });
                });
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
                text = this.anything();
                return [ "Text", text ];
            },
            Value: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._applyWithArgs("token", "Real");
                }, function() {
                    return this._applyWithArgs("token", "Integer");
                }, function() {
                    return this._applyWithArgs("token", "Text");
                });
            },
            RoleBinding: function() {
                var $elf = this, _fromIdx = this.input.idx, bindIdentifier, identifier;
                identifier = this._or(function() {
                    return this._applyWithArgs("token", "Term");
                }, function() {
                    return this._applyWithArgs("token", "Name");
                });
                bindIdentifier = this._or(function() {
                    return this._apply("number");
                }, function() {
                    return this._apply("Value");
                });
                return [ "RoleBinding", identifier, bindIdentifier ];
            },
            AtomicFormulation: function() {
                var $elf = this, _fromIdx = this.input.idx, b, f;
                f = this._applyWithArgs("token", "FactType");
                b = this._many(function() {
                    return this._applyWithArgs("token", "RoleBinding");
                });
                return [ "AtomicFormulation", f ].concat(b);
            }
        });
        LFValidator.initialize = function() {
            SBVRLibs.initialize.call(this);
        };
        LFValidator.defaultAttributes = function(termOrVerb, attrsFound, attrs) {
            termOrVerb.push(attrs);
        };
    });
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !function(root, factory) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__, exports, __webpack_require__(28), __webpack_require__(4) ], 
        __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof __WEBPACK_AMD_DEFINE_FACTORY__ ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, 
        void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }(this, function(require, exports, OMeta) {
        var _ = __webpack_require__(4), SBVRLibs = exports.SBVRLibs = OMeta._extend({});
        SBVRLibs.initialize = function() {
            this.currentVocabulary = "";
            this.vocabularies = {};
            this.factTypes = {};
        };
        SBVRLibs.ApplyFirstExisting = function(rules, ruleArgs) {
            null == ruleArgs && (ruleArgs = []);
            for (var i = 0; i < rules.length; i++) if (null != this[rules[i]]) return ruleArgs.length > 0 ? this._applyWithArgs.apply(this, [ rules[i] ].concat(ruleArgs)) : this._apply(rules[i], ruleArgs);
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
            return _.map(factType, 1).join(" ");
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
            if (3 === factType.length && ("has" === factType[1][1] || "is of" === factType[1][1])) {
                mappedFactType = _.clone(mappedFactType);
                mappedFactType[0] = mappedFactType[0].slice(0, 3).concat(2);
                mappedFactType[2] = mappedFactType[2].slice(0, 3).concat(0);
                "has" === factType[1][1] ? this._traverseFactType([ factType[2], [ "Verb", "is of", factType[1][2] ], factType[0] ], mappedFactType) : "is of" === factType[1][1] && this._traverseFactType([ factType[2], [ "Verb", "has", factType[1][2] ], factType[0] ], mappedFactType);
            }
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
                if (currentLevel.hasOwnProperty(currentFactTypePart) || create && (currentLevel[currentFactTypePart] = {})) {
                    finalLevel = traverseRecurse(remainingFactType[0], remainingFactType.slice(1), currentLevel[currentFactTypePart]);
                    finalLevel !== !1 && _.assign(finalLevels, finalLevel);
                }
                if (!create && ("Term" === currentFactTypePart[0] || "Name" === currentFactTypePart[0])) for (;(currentFactTypePart = $elf.FollowConceptType(currentFactTypePart)) !== !1; ) if (currentLevel.hasOwnProperty(currentFactTypePart)) {
                    finalLevel = traverseRecurse(remainingFactType[0], remainingFactType.slice(1), currentLevel[currentFactTypePart]);
                    finalLevel !== !1 && _.assign(finalLevels, finalLevel);
                }
                return _.isEmpty(finalLevels) !== !0 && finalLevels;
            };
            return traverseRecurse(factType[0], factType.slice(1), this.factTypes);
        };
    });
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !function(root, factory) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__, exports, __webpack_require__(28), __webpack_require__(30), __webpack_require__(4) ], 
        __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof __WEBPACK_AMD_DEFINE_FACTORY__ ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, 
        void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }(this, function(require, exports, OMeta) {
        var SBVRLibs = __webpack_require__(30).SBVRLibs, _ = __webpack_require__(4), SBVRCompilerLibs = exports.SBVRCompilerLibs = SBVRLibs._extend({});
        SBVRCompilerLibs.initialize = function() {
            SBVRLibs.initialize.call(this);
        };
        SBVRCompilerLibs.TYPE_VOCAB = "Type";
        SBVRCompilerLibs.IsPrimitive = function(term) {
            return term[2] == this.TYPE_VOCAB ? term[1] : (term = this.FollowConceptType(term)) !== !1 && term[2] == this.TYPE_VOCAB && term[1];
        };
        SBVRCompilerLibs.IsChild = function(child, parent) {
            do if (this.IdentifiersEqual(child, parent)) return !0; while ((child = this.FollowConceptType(child)) !== !1);
            return !1;
        };
        SBVRCompilerLibs.MappedFactType = function(factType) {
            var traverseInfo = this._traverseFactType(factType), mappedFactType = [];
            if (traverseInfo === !1 || !traverseInfo.hasOwnProperty("__valid")) return !1;
            for (var i = 0; i < traverseInfo.__valid.length; i++) mappedFactType[i] = traverseInfo.__valid[i].slice();
            mappedFactType[1][2] = factType[1][2];
            return mappedFactType;
        };
        SBVRCompilerLibs.UnmappedFactType = function(factType) {
            var mappedFactType = this.MappedFactType(factType);
            if (mappedFactType === !1) return !1;
            for (var i = 0; i < mappedFactType.length; i++) mappedFactType[i] = mappedFactType[i].slice(0, 3);
            return mappedFactType;
        };
        SBVRCompilerLibs.GetResourceName = function(termOrFactType) {
            var i = 0, resource = [];
            if (_.isString(termOrFactType)) return termOrFactType.replace(new RegExp(" ", "g"), "_");
            for (void 0; i < termOrFactType.length; i++) resource.push(termOrFactType[i][1].replace(new RegExp(" ", "g"), "_"));
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
            return fieldID !== !1 && table.fields[fieldID];
        };
        SBVRCompilerLibs.GetTableFieldID = function(table, fieldName) {
            for (var tableFields = table.fields, i = 0; i < tableFields.length; i++) if (tableFields[i].fieldName == fieldName) return i;
            return !1;
        };
    });
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !function(root, factory) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__, exports, __webpack_require__(28), __webpack_require__(31), __webpack_require__(4) ], 
        __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof __WEBPACK_AMD_DEFINE_FACTORY__ ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, 
        void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }(this, function(require, exports, OMeta) {
        var SBVRCompilerLibs = __webpack_require__(31).SBVRCompilerLibs, _ = __webpack_require__(4), LF2AbstractSQL = exports.LF2AbstractSQL = SBVRCompilerLibs._extend({
            Number: function() {
                var $elf = this, _fromIdx = this.input.idx, num;
                this._form(function() {
                    this._applyWithArgs("exactly", "Number");
                    num = this._apply("number");
                    return this._pred(!isNaN(num));
                });
                return num;
            },
            Real: function() {
                var $elf = this, _fromIdx = this.input.idx, num;
                this._form(function() {
                    this._applyWithArgs("exactly", "Real");
                    num = this._apply("number");
                    return this._pred(!isNaN(num));
                });
                return [ "Real", num ];
            },
            Integer: function() {
                var $elf = this, _fromIdx = this.input.idx, num;
                this._form(function() {
                    this._applyWithArgs("exactly", "Integer");
                    num = this._apply("number");
                    return this._pred(!isNaN(num));
                });
                return [ "Integer", num ];
            },
            Text: function() {
                var $elf = this, _fromIdx = this.input.idx, text;
                this._form(function() {
                    this._applyWithArgs("exactly", "Text");
                    return text = this.anything();
                });
                return [ "Text", text ];
            },
            Value: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._apply("Real");
                }, function() {
                    return this._apply("Integer");
                }, function() {
                    return this._apply("Text");
                });
            },
            Identifier: function() {
                var $elf = this, _fromIdx = this.input.idx, name, num, type, vocab;
                num = "";
                this._form(function() {
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
                    return this._opt(function() {
                        return this._or(function() {
                            return num = this._apply("Number");
                        }, function() {
                            return this._apply("Value");
                        });
                    });
                });
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
                this._or(function() {
                    return this._pred(!this.tables.hasOwnProperty(resourceName));
                }, function() {
                    console.error("We already have an identifier with a name of: " + identifierName);
                    return this._pred(!1);
                });
                this.identifiers[identifierName] = identifierName;
                this.tables[resourceName] = this.CreateTable();
                return identifierName;
            },
            Attributes: function(termOrFactType) {
                var $elf = this, _fromIdx = this.input.idx, attributeName, attributeValue;
                return this._or(function() {
                    return this._apply("end");
                }, function() {
                    return this._form(function() {
                        this._applyWithArgs("exactly", "Attributes");
                        return this._many(function() {
                            return this._form(function() {
                                attributeName = this.anything();
                                return attributeValue = this._applyWithArgs("ApplyFirstExisting", [ "Attr" + attributeName, "DefaultAttr" ], [ termOrFactType ]);
                            });
                        });
                    });
                });
            },
            DefaultAttr: function(termOrFactType) {
                var $elf = this, _fromIdx = this.input.idx, anything;
                return anything = this.anything();
            },
            AttrConceptType: function(termOrFactType) {
                var $elf = this, _fromIdx = this.input.idx, conceptTable, conceptType, dataType, fieldID, identifierTable, primitive, references, term, vocab;
                term = this._form(function() {
                    this._applyWithArgs("exactly", "Term");
                    conceptType = this.anything();
                    return vocab = this.anything();
                });
                (function() {
                    this.termForms[termOrFactType] && (termOrFactType = this.termForms[termOrFactType]);
                }).call(this);
                this.vocabularies[termOrFactType[2]].ConceptTypes[termOrFactType] = term;
                primitive = this._applyWithArgs("IsPrimitive", term);
                conceptTable = this._applyWithArgs("GetTable", conceptType);
                identifierTable = this._applyWithArgs("GetTable", termOrFactType[1]);
                this._or(function() {
                    this._pred(primitive !== !1 && conceptType === primitive);
                    dataType = primitive;
                    this._opt(function() {
                        this._pred(identifierTable.hasOwnProperty("referenceScheme"));
                        fieldID = this._applyWithArgs("GetTableFieldID", identifierTable, identifierTable.referenceScheme);
                        this._pred(fieldID !== !1);
                        return identifierTable.fields.splice(fieldID, 1);
                    });
                    return identifierTable.referenceScheme = conceptType;
                }, function() {
                    dataType = "ConceptType";
                    return references = {
                        tableName: conceptTable.name,
                        fieldName: conceptTable.idField
                    };
                });
                return this._applyWithArgs("AddTableField", identifierTable, conceptType, dataType, !0, null, references);
            },
            AttrDatabaseIDField: function(termOrFactType) {
                var $elf = this, _fromIdx = this.input.idx, fieldID, idField, table, tableID;
                idField = this.anything();
                tableID = this._applyWithArgs("GetTableID", termOrFactType);
                table = this._applyWithArgs("GetTable", tableID);
                return this._or(function() {
                    return this._pred(_.isString(table));
                }, function() {
                    fieldID = this._applyWithArgs("AddTableField", table, idField, "Serial", !0, "PRIMARY KEY");
                    this._opt(function() {
                        this._pred(fieldID !== !1);
                        return table.fields[fieldID].index = "PRIMARY KEY";
                    });
                    return table.idField = idField;
                });
            },
            AttrReferenceScheme: function(termOrFactType) {
                var $elf = this, _fromIdx = this.input.idx, fieldID, referenceScheme, table, tableID;
                referenceScheme = this.anything();
                referenceScheme = this._or(function() {
                    this._pred(_.isArray(referenceScheme));
                    return referenceScheme[1];
                }, function() {
                    return referenceScheme;
                });
                tableID = this._applyWithArgs("GetTableID", termOrFactType);
                table = this._applyWithArgs("GetTable", tableID);
                return this._or(function() {
                    return this._pred(_.isString(table));
                }, function() {
                    this._opt(function() {
                        this._pred(table.hasOwnProperty("referenceScheme"));
                        fieldID = this._applyWithArgs("GetTableFieldID", table, table.referenceScheme);
                        this._pred(fieldID !== !1);
                        return table.fields[fieldID].fieldName = referenceScheme;
                    });
                    return table.referenceScheme = referenceScheme;
                });
            },
            AttrDatabaseTableName: function(termOrFactType) {
                var $elf = this, _fromIdx = this.input.idx, table, tableID, tableName;
                tableName = this.anything();
                tableID = this._applyWithArgs("GetTableID", termOrFactType);
                table = this._applyWithArgs("GetTable", tableID);
                return this._or(function() {
                    return this._pred(_.isString(table));
                }, function() {
                    return table.name = tableName;
                });
            },
            AttrDatabasePrimitive: function(termOrFactType) {
                var $elf = this, _fromIdx = this.input.idx, attrVal, tableID;
                attrVal = this.anything();
                tableID = this._applyWithArgs("GetTableID", termOrFactType);
                return this.GetTable(tableID).primitive = attrVal;
            },
            AttrDatabaseAttribute: function(factType) {
                var $elf = this, _fromIdx = this.input.idx, attrVal, attributeName, attributeTable, baseTable, fieldID;
                attrVal = this.anything();
                return this._opt(function() {
                    this._pred(attrVal);
                    this.attributes[factType] = attrVal;
                    this.tables[this.GetResourceName(factType)] = "Attribute";
                    baseTable = this._applyWithArgs("GetTable", factType[0][1]);
                    attributeName = factType[2][1];
                    attributeTable = this._applyWithArgs("GetTable", attributeName);
                    fieldID = this._applyWithArgs("GetTableFieldID", baseTable, attributeName);
                    return baseTable.fields[fieldID].dataType = attributeTable.primitive;
                });
            },
            AttrForeignKey: function(factType) {
                var $elf = this, _fromIdx = this.input.idx, baseTable, fieldID, fkName, fkTable, required;
                required = this.anything();
                baseTable = this._applyWithArgs("GetTable", factType[0][1]);
                fkName = factType[2][1];
                fkTable = this._applyWithArgs("GetTable", fkName);
                this._opt(function() {
                    this._pred(baseTable.idField == fkName);
                    fieldID = this._applyWithArgs("GetTableFieldID", baseTable, fkName);
                    this._pred(fieldID !== !1);
                    return baseTable.fields.splice(fieldID, 1);
                });
                fieldID = this._applyWithArgs("AddTableField", baseTable, fkName, "ForeignKey", required, null, {
                    tableName: fkTable.name,
                    fieldName: fkTable.idField
                });
                this._opt(function() {
                    this._pred(fieldID);
                    return baseTable.fields[fieldID].required = required;
                });
                return this.tables[this.GetResourceName(factType)] = "ForeignKey";
            },
            AttrUnique: function(factType) {
                var $elf = this, _fromIdx = this.input.idx, baseTable, fieldID, required, uniqueField;
                required = this.anything();
                baseTable = this._applyWithArgs("GetTable", factType);
                this._opt(function() {
                    this._pred("Attribute" === baseTable || "ForeignKey" === baseTable);
                    return baseTable = this._applyWithArgs("GetTable", factType[0][1]);
                });
                uniqueField = factType[2][1];
                fieldID = this._applyWithArgs("GetTableFieldID", baseTable, uniqueField);
                this._pred(fieldID !== !1);
                return baseTable.fields[fieldID].index = "UNIQUE";
            },
            AttrSynonymousForm: function(factType) {
                var $elf = this, _fromIdx = this.input.idx, synForm;
                synForm = this.anything();
                return this._applyWithArgs("AddFactType", synForm, factType);
            },
            AttrTermForm: function(factType) {
                var $elf = this, _fromIdx = this.input.idx, term;
                term = this.anything();
                return function() {
                    this.termForms[factType] = term;
                    this.identifiers[term[1]] = factType;
                    this.tables[this.GetResourceName(term[1])] = this.GetTable(factType);
                    for (var i = 0; i < factType.length; i++) if ("Term" === factType[i][0]) {
                        var extraFactType = [ term, [ "Verb", "has", !1 ], factType[i] ];
                        this.AddFactType(extraFactType, extraFactType);
                        this.tables[this.GetResourceName(extraFactType)] = this.GetTable(factType[i][1]).primitive ? "Attribute" : "ForeignKey";
                    }
                }.call(this);
            },
            AttrNecessity: function(tableID) {
                var $elf = this, _fromIdx = this.input.idx;
                return this._apply("Rule");
            },
            FactType: function() {
                var $elf = this, _fromIdx = this.input.idx, attributes, factType, factTypePart, fieldName, fkTable, identifier, identifierTable, linkTable, negated, resourceName, uniqueFields, verb;
                this._lookahead(function() {
                    return factType = this._many1(function() {
                        factTypePart = this.anything();
                        this._lookahead(function() {
                            return attributes = this.anything();
                        });
                        return factTypePart;
                    });
                });
                this._applyWithArgs("AddFactType", factType, factType);
                this._or(function() {
                    this._pred(this.IsPrimitive(factType[0]));
                    return this._many1(function() {
                        factTypePart = this.anything();
                        return this._lookahead(function() {
                            return attributes = this.anything();
                        });
                    });
                }, function() {
                    resourceName = this._applyWithArgs("GetResourceName", factType);
                    return this._or(function() {
                        this._pred(2 == factType.length);
                        this._many1(function() {
                            factTypePart = this.anything();
                            return this._lookahead(function() {
                                return attributes = this.anything();
                            });
                        });
                        identifierTable = this._applyWithArgs("GetTable", factType[0][1]);
                        this._applyWithArgs("AddTableField", identifierTable, factType[1][1], "Boolean", !0);
                        return this.tables[resourceName] = "BooleanAttribute";
                    }, function() {
                        linkTable = this.tables[resourceName] = this.CreateTable();
                        uniqueFields = [];
                        this._many1(function() {
                            return this._or(function() {
                                identifier = this._apply("Identifier");
                                fieldName = identifier.name + identifier.num;
                                uniqueFields.push(fieldName);
                                fkTable = this._applyWithArgs("GetTable", identifier.name);
                                return this._or(function() {
                                    this._pred(fkTable.primitive);
                                    return this._applyWithArgs("AddTableField", linkTable, fieldName, fkTable.primitive, !0);
                                }, function() {
                                    return this._applyWithArgs("AddTableField", linkTable, fieldName, "ForeignKey", !0, null, {
                                        tableName: fkTable.name,
                                        fieldName: fkTable.idField
                                    });
                                });
                            }, function() {
                                return this._form(function() {
                                    this._applyWithArgs("exactly", "Verb");
                                    verb = this.anything();
                                    return negated = this.anything();
                                });
                            });
                        });
                        return linkTable.indexes.push({
                            type: "UNIQUE",
                            fields: uniqueFields
                        });
                    });
                });
                return factType;
            },
            Cardinality: function() {
                var $elf = this, _fromIdx = this.input.idx, cardinality;
                this._form(function() {
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
                });
                return cardinality;
            },
            Variable: function() {
                var $elf = this, _fromIdx = this.input.idx, bind, identifier, num, query, selectBody, varNum, whereBody, whereBody2;
                this._form(function() {
                    this._applyWithArgs("exactly", "Variable");
                    num = this._apply("Number");
                    identifier = this._apply("Identifier");
                    query = this._or(function() {
                        bind = this.bindAttributes[num];
                        this._pred(bind);
                        selectBody = _.clone(bind.binding);
                        return [ "SelectQuery", [ "Select", [ selectBody ] ] ];
                    }, function() {
                        varNum = "." + num;
                        query = [ "SelectQuery", [ "Select", [] ], [ "From", [ this.GetTable(identifier.name).name, identifier.name + varNum ] ] ];
                        this._applyWithArgs("CreateConceptTypesResolver", query, identifier, varNum);
                        return query;
                    });
                    return this._opt(function() {
                        whereBody = this._apply("RulePart");
                        return this._opt(function() {
                            this._pred(query);
                            return this._applyWithArgs("AddWhereClause", query, whereBody);
                        });
                    });
                });
                this._opt(function() {
                    whereBody2 = this._apply("RulePart");
                    return this._applyWithArgs("AddWhereClause", query, whereBody2);
                });
                return this._or(function() {
                    this._pred(!_.some(query, {
                        0: "From"
                    }));
                    this._opt(function() {
                        whereBody = _.find(query, {
                            0: "Where"
                        });
                        this._pred(whereBody);
                        return selectBody.whereBody = whereBody[1];
                    });
                    return selectBody;
                }, function() {
                    return query;
                });
            },
            RoleBindings: function(actualFactType) {
                var $elf = this, _fromIdx = this.input.idx, binds;
                binds = [];
                (function() {
                    for (var i = 0; i < actualFactType.length; i += 2) {
                        var j = _.findIndex(actualFactType, {
                            3: i
                        });
                        binds[j / 2] = this.RoleBinding(actualFactType[j][1]);
                    }
                }).call(this);
                this._apply("end");
                return binds;
            },
            RoleBinding: function(baseTermName) {
                var $elf = this, _fromIdx = this.input.idx, baseBind, binding, conceptTypeResolver, data, identifier, number;
                this._form(function() {
                    this._applyWithArgs("exactly", "RoleBinding");
                    identifier = this._apply("Identifier");
                    return this._or(function() {
                        return number = this._apply("number");
                    }, function() {
                        return data = this._apply("Value");
                    });
                });
                baseBind = this.bindAttributes[number];
                binding = this._or(function() {
                    this._pred(data);
                    return data;
                }, function() {
                    this._pred(baseBind);
                    return baseBind.binding;
                }, function() {
                    conceptTypeResolver = this.conceptTypeResolvers[identifier.name + "." + number];
                    this._or(function() {
                        return this._pred(!conceptTypeResolver);
                    }, function() {
                        return conceptTypeResolver(baseTermName);
                    });
                    return [ "ReferencedField", baseTermName + "." + number, identifier.name ];
                });
                return {
                    identifier: identifier,
                    number: number,
                    data: data,
                    binding: binding
                };
            },
            NativeProperty: function(actualFactType) {
                var $elf = this, _fromIdx = this.input.idx, binds, primitive, property, verb;
                this._pred(this.IsPrimitive(actualFactType[0]));
                this._pred(this.IsPrimitive(actualFactType[2]));
                binds = this._applyWithArgs("RoleBindings", actualFactType);
                this._pred(2 == binds.length);
                primitive = actualFactType[0][1];
                verb = actualFactType[1][1];
                property = actualFactType[2][1];
                this._pred(this.sbvrTypes[primitive] && this.sbvrTypes[primitive].nativeProperties && this.sbvrTypes[primitive].nativeProperties[verb] && this.sbvrTypes[primitive].nativeProperties[verb][property]);
                return [ "Equals", [ "Boolean", !0 ], [ "Boolean", !0 ] ];
            },
            NativeFactType: function(actualFactType) {
                var $elf = this, _fromIdx = this.input.idx, binds, primitive, secondPrimitive, verb;
                this._pred(3 == actualFactType.length);
                this._pred(this.IsPrimitive(actualFactType[0]));
                this._pred(this.IsPrimitive(actualFactType[2]));
                return this._or(function() {
                    binds = this._applyWithArgs("RoleBindings", actualFactType);
                    this._pred(2 == binds.length);
                    primitive = actualFactType[0][1];
                    verb = actualFactType[1][1];
                    secondPrimitive = actualFactType[2][1];
                    this._pred(this.sbvrTypes[primitive] && this.sbvrTypes[primitive].nativeFactTypes && this.sbvrTypes[primitive].nativeFactTypes[secondPrimitive] && this.sbvrTypes[primitive].nativeFactTypes[secondPrimitive][verb]);
                    return this.sbvrTypes[primitive].nativeFactTypes[secondPrimitive][verb](binds[0].binding, binds[1].binding);
                }, function() {
                    return this._applyWithArgs("foreign", ___NativeFactTypeMatchingFailed___, "die");
                });
            },
            LinkTableAlias: function() {
                var $elf = this, _fromIdx = this.input.idx, bindNumbers, binding, factType, identifierName, identifierType, mapping, partAlias, verb, vocab;
                this._form(function() {
                    return bindNumbers = this._many1(function() {
                        binding = this.anything();
                        return binding.number;
                    });
                });
                this._form(function() {
                    return factType = this._many(function() {
                        this._form(function() {
                            return partAlias = this._or(function() {
                                switch (this.anything()) {
                                  case "Verb":
                                    verb = this.anything();
                                    this.anything();
                                    return verb;

                                  default:
                                    throw this._fail();
                                }
                            }, function() {
                                identifierType = this.anything();
                                identifierName = this.anything();
                                vocab = this.anything();
                                mapping = this._opt(function() {
                                    return this.anything();
                                });
                                return identifierName + "." + bindNumbers.shift();
                            });
                        });
                        return partAlias;
                    });
                });
                return factType.join("-");
            },
            LinkTable: function(actualFactType) {
                var $elf = this, _fromIdx = this.input.idx, binds, query, tableAlias;
                binds = this._applyWithArgs("RoleBindings", actualFactType);
                tableAlias = this._applyWithArgs("LinkTableAlias", binds, actualFactType);
                query = [ "SelectQuery", [ "Select", [] ], [ "From", [ this.GetTable(actualFactType).name, tableAlias ] ] ];
                _.each(binds, function(bind, i) {
                    var baseIdentifierName = actualFactType[2 * i][1], table = $elf.GetTable(baseIdentifierName);
                    table.primitive || $elf.AddWhereClause(query, [ "Equals", [ "ReferencedField", tableAlias, baseIdentifierName ], [ "ReferencedField", bind.binding[1], table.idField ] ]);
                });
                return [ "Exists", query ];
            },
            ForeignKey: function(actualFactType) {
                var $elf = this, _fromIdx = this.input.idx, baseToIdentifier, bindFrom, bindTo, binds, tableTo;
                this._pred("ForeignKey" == this.GetTable(actualFactType));
                this._or(function() {
                    binds = this._applyWithArgs("RoleBindings", actualFactType);
                    this._pred(2 == binds.length);
                    bindFrom = binds[0];
                    bindTo = binds[1];
                    baseToIdentifier = actualFactType[2];
                    return tableTo = this._applyWithArgs("GetTable", baseToIdentifier[1]);
                }, function() {
                    return this._applyWithArgs("foreign", ___ForeignKeyMatchingFailed___, "die");
                });
                return [ "Equals", [ "ReferencedField", bindFrom.binding[1], baseToIdentifier[1] ], [ "ReferencedField", bindTo.binding[1], tableTo.idField ] ];
            },
            BooleanAttribute: function(actualFactType) {
                var $elf = this, _fromIdx = this.input.idx, attributeName, binds, negated;
                this._pred("BooleanAttribute" == this.GetTable(actualFactType));
                this._or(function() {
                    binds = this._applyWithArgs("RoleBindings", actualFactType);
                    this._pred(1 == binds.length);
                    attributeName = actualFactType[1][1];
                    return negated = actualFactType[1][2];
                }, function() {
                    console.error(this.input);
                    return this._applyWithArgs("foreign", ___BooleanAttributeMatchingFailed___, "die");
                });
                return [ "Equals", [ "ReferencedField", binds[0].binding[1], attributeName ], [ "Boolean", !negated ] ];
            },
            Attribute: function(actualFactType) {
                var $elf = this, _fromIdx = this.input.idx, bind, bindAttr, bindReal, binds;
                this._pred("Attribute" == this.GetTable(actualFactType));
                this._or(function() {
                    binds = this._applyWithArgs("RoleBindings", actualFactType);
                    this._pred(2 == binds.length);
                    bindReal = binds[0];
                    return bindAttr = binds[1];
                }, function() {
                    return this._applyWithArgs("foreign", ___AttributeMatchingFailed___, "die");
                });
                return this._or(function() {
                    bind = this.bindAttributes[bindAttr.number];
                    bindAttr.binding = [ "ReferencedField", bindReal.binding[1], bind.binding[2] ];
                    this._pred(!_.isEqual(bindAttr.binding, bind.binding));
                    return [ "Equals", bindAttr.binding, bind.binding ];
                }, function() {
                    return [ "Equals", [ "Boolean", !0 ], [ "Boolean", !0 ] ];
                });
            },
            AtomicFormulation: function() {
                var $elf = this, _fromIdx = this.input.idx, actualFactType, factType, whereClause;
                this._form(function() {
                    this._applyWithArgs("exactly", "AtomicFormulation");
                    this._form(function() {
                        this._applyWithArgs("exactly", "FactType");
                        return factType = this._many1(function() {
                            return this.anything();
                        });
                    });
                    actualFactType = this._applyWithArgs("MappedFactType", factType);
                    return whereClause = this._or(function() {
                        return this._applyWithArgs("NativeProperty", actualFactType);
                    }, function() {
                        return this._applyWithArgs("NativeFactType", actualFactType);
                    }, function() {
                        return this._applyWithArgs("ForeignKey", actualFactType);
                    }, function() {
                        return this._applyWithArgs("BooleanAttribute", actualFactType);
                    }, function() {
                        return this._applyWithArgs("Attribute", actualFactType);
                    }, function() {
                        return this._applyWithArgs("LinkTable", actualFactType);
                    });
                });
                return whereClause;
            },
            AtLeast: function() {
                var $elf = this, _fromIdx = this.input.idx, minCard, variable, where;
                this._form(function() {
                    this._applyWithArgs("exactly", "AtLeastNQuantification");
                    minCard = this._apply("Cardinality");
                    return variable = this._apply("Variable");
                });
                where = this._or(function() {
                    this._pred(0 == minCard);
                    return [ "Boolean", !0 ];
                }, function() {
                    this._pred("SelectQuery" == variable[0] && 0 == variable[1][1].length);
                    variable[1][1].push([ "Count", "*" ]);
                    return [ "GreaterThanOrEqual", variable, [ "Number", minCard ] ];
                }, function() {
                    this._pred(minCard > 1);
                    return [ "Boolean", !1 ];
                }, function() {
                    return [ "Exists", variable ];
                });
                return this._or(function() {
                    this._pred(variable.whereBody);
                    return [ "And", variable.whereBody, where ];
                }, function() {
                    return where;
                });
            },
            Exactly: function() {
                var $elf = this, _fromIdx = this.input.idx, card, exists, variable, where;
                this._form(function() {
                    this._applyWithArgs("exactly", "ExactQuantification");
                    card = this._apply("Cardinality");
                    return variable = this._apply("Variable");
                });
                where = this._or(function() {
                    this._pred("SelectQuery" == variable[0] && 0 == variable[1][1].length);
                    variable[1][1].push([ "Count", "*" ]);
                    return [ "Equals", variable, [ "Number", card ] ];
                }, function() {
                    exists = [ "Exists", variable ];
                    return this._or(function() {
                        this._pred(0 == card);
                        return [ "Not", exists ];
                    }, function() {
                        this._pred(1 == card);
                        return exists;
                    }, function() {
                        return [ "Boolean", !1 ];
                    });
                });
                return this._or(function() {
                    this._pred(variable.whereBody);
                    return [ "And", variable.whereBody, where ];
                }, function() {
                    return where;
                });
            },
            Range: function() {
                var $elf = this, _fromIdx = this.input.idx, exists, maxCard, minCard, variable, where;
                this._form(function() {
                    this._applyWithArgs("exactly", "NumericalRangeQuantification");
                    minCard = this._apply("Cardinality");
                    maxCard = this._apply("Cardinality");
                    return variable = this._apply("Variable");
                });
                where = this._or(function() {
                    this._pred("SelectQuery" == variable[0] && 0 == variable[1][1].length);
                    variable[1][1].push([ "Count", "*" ]);
                    return [ "Between", variable, [ "Number", minCard ], [ "Number", maxCard ] ];
                }, function() {
                    exists = [ "Exists", variable ];
                    return this._or(function() {
                        this._pred(0 == minCard);
                        return this._or(function() {
                            this._pred(0 == maxCard);
                            return [ "Not", exists ];
                        }, function() {
                            return [ "Boolean", !0 ];
                        });
                    }, function() {
                        this._pred(1 == minCard);
                        return exists;
                    }, function() {
                        return [ "Boolean", !1 ];
                    });
                });
                return this._or(function() {
                    this._pred(variable.whereBody);
                    return [ "And", variable.whereBody, where ];
                }, function() {
                    return where;
                });
            },
            Disjunction: function() {
                var $elf = this, _fromIdx = this.input.idx, first, rest;
                this._form(function() {
                    this._applyWithArgs("exactly", "Disjunction");
                    first = this._apply("RulePart");
                    return rest = this._many1(function() {
                        return this._apply("RulePart");
                    });
                });
                return [ "Or", first ].concat(rest);
            },
            Conjunction: function() {
                var $elf = this, _fromIdx = this.input.idx, first, rest;
                this._form(function() {
                    this._applyWithArgs("exactly", "Conjunction");
                    first = this._apply("RulePart");
                    return rest = this._many1(function() {
                        return this._apply("RulePart");
                    });
                });
                return [ "And", first ].concat(rest);
            },
            Exists: function() {
                var $elf = this, _fromIdx = this.input.idx, variable, where;
                this._form(function() {
                    this._applyWithArgs("exactly", "ExistentialQuantification");
                    return variable = this._apply("Variable");
                });
                where = [ "Exists", variable ];
                return this._or(function() {
                    this._pred(variable.whereBody);
                    return [ "And", variable.whereBody, where ];
                }, function() {
                    return where;
                });
            },
            Negation: function() {
                var $elf = this, _fromIdx = this.input.idx, whereBody;
                this._form(function() {
                    this._applyWithArgs("exactly", "LogicalNegation");
                    return whereBody = this._apply("RulePart");
                });
                return [ "Not", whereBody ];
            },
            RulePart: function() {
                var $elf = this, _fromIdx = this.input.idx, x;
                return this._or(function() {
                    return this._apply("AtomicFormulation");
                }, function() {
                    return this._apply("AtLeast");
                }, function() {
                    return this._apply("Exactly");
                }, function() {
                    return this._apply("Exists");
                }, function() {
                    return this._apply("Negation");
                }, function() {
                    return this._apply("Range");
                }, function() {
                    return this._apply("Disjunction");
                }, function() {
                    return this._apply("Conjunction");
                }, function() {
                    x = this.anything();
                    console.error("Hit unhandled operation:", x);
                    return this._pred(!1);
                });
            },
            RuleBody: function() {
                var $elf = this, _fromIdx = this.input.idx, rule;
                this._form(function() {
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
                });
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
                this._lookahead(function() {
                    return this._applyWithArgs("ProcessAtomicFormulationsRecurse", 0, "ProcessAtomicFormulationsAttributes");
                });
                this._lookahead(function() {
                    return this._applyWithArgs("ProcessAtomicFormulationsRecurse", 0, "ProcessAtomicFormulationsNonPrimitive");
                });
                return this._lookahead(function() {
                    return this._applyWithArgs("ProcessAtomicFormulationsRecurse", 0, "ProcessAtomicFormulationsNativeProperties");
                });
            },
            ProcessAtomicFormulationsRecurse: function(depth, rule) {
                var $elf = this, _fromIdx = this.input.idx, actualFactType, factType, unmappedFactType;
                return this._many(function() {
                    return this._or(function() {
                        this._pred(_.isArray(this.input.hd));
                        return this._form(function() {
                            return this._or(function() {
                                switch (this.anything()) {
                                  case "AtomicFormulation":
                                    this._form(function() {
                                        this._applyWithArgs("exactly", "FactType");
                                        return factType = this._many1(function() {
                                            return this.anything();
                                        });
                                    });
                                    unmappedFactType = this._applyWithArgs("UnmappedFactType", factType);
                                    actualFactType = this._applyWithArgs("MappedFactType", factType);
                                    return this._applyWithArgs(rule, depth, unmappedFactType, actualFactType);

                                  default:
                                    throw this._fail();
                                }
                            }, function() {
                                return this._applyWithArgs("ProcessAtomicFormulationsRecurse", depth + 1, rule);
                            });
                        });
                    }, function() {
                        return this.anything();
                    });
                });
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
                var $elf = this, _fromIdx = this.input.idx, attrBinding, baseBinding, binds, tableAlias;
                binds = this._applyWithArgs("RoleBindings", actualFactType);
                return this._or(function() {
                    this._pred(this.attributes.hasOwnProperty(unmappedFactType) && this.attributes[unmappedFactType]);
                    baseBinding = _.find(binds, function(bind) {
                        return !$elf.IsPrimitive($elf.ReconstructIdentifier(bind.identifier));
                    });
                    attrBinding = _.find(binds, function(bind) {
                        return $elf.IsPrimitive($elf.ReconstructIdentifier(bind.identifier)) && (null == $elf.bindAttributeDepth[bind.number] || $elf.bindAttributeDepth[bind.number] > depth);
                    });
                    return function() {
                        this.bindAttributeDepth[attrBinding.number] = depth;
                        return this.bindAttributes[attrBinding.number] = {
                            binding: [ "ReferencedField", baseBinding.binding[1], attrBinding.identifier.name ]
                        };
                    }.call(this);
                }, function() {
                    this._pred(_.some(binds, function(bind) {
                        return !$elf.IsPrimitive($elf.ReconstructIdentifier(bind.identifier));
                    }));
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
                });
            },
            ProcessAtomicFormulationsNativeProperties: function(depth, unmappedFactType, actualFactType) {
                var $elf = this, _fromIdx = this.input.idx, binding, binds, primitive, property, verb;
                binds = this._applyWithArgs("RoleBindings", actualFactType);
                this._pred(_.every(binds, function(bind) {
                    return $elf.IsPrimitive($elf.ReconstructIdentifier(bind.identifier));
                }));
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
                return this._form(function() {
                    this._applyWithArgs("exactly", "Rule");
                    this._lookahead(function() {
                        return this._apply("ProcessAtomicFormulations");
                    });
                    ruleBody = this._or(function() {
                        this._pred(this.nonPrimitiveExists);
                        return this._apply("RuleBody");
                    }, function() {
                        return this.anything();
                    });
                    this._form(function() {
                        this._applyWithArgs("exactly", "StructuredEnglish");
                        return ruleText = this.anything();
                    });
                    return this._opt(function() {
                        this._pred(this.nonPrimitiveExists);
                        return this.rules.push([ "Rule", [ "Body", ruleBody ], [ "StructuredEnglish", ruleText ] ]);
                    });
                });
            },
            Process: function() {
                var $elf = this, _fromIdx = this.input.idx, attributes, factType, identifierName, tables, type, vocab;
                this._form(function() {
                    this._applyWithArgs("exactly", "Model");
                    return this._many1(function() {
                        return this._or(function() {
                            return this._form(function() {
                                return this._or(function() {
                                    switch (this.anything()) {
                                      case "Vocabulary":
                                        vocab = this.anything();
                                        return attributes = this.anything();

                                      default:
                                        throw this._fail();
                                    }
                                }, function() {
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
                                }, function() {
                                    switch (this.anything()) {
                                      case "FactType":
                                        factType = this._apply("FactType");
                                        return this._applyWithArgs("Attributes", factType);

                                      default:
                                        throw this._fail();
                                    }
                                });
                            });
                        }, function() {
                            return this._apply("Rule");
                        });
                    });
                });
                tables = {};
                return {
                    tables: this.tables,
                    rules: this.rules
                };
            },
            CreateTable: function() {
                var $elf = this, _fromIdx = this.input.idx, table;
                table = {
                    fields: [],
                    primitive: !1,
                    name: null,
                    indexes: [],
                    idField: null
                };
                this._applyWithArgs("AddTableField", table, "created at", "Date Time", !0, null, null, "CURRENT_TIMESTAMP");
                return table;
            }
        });
        LF2AbstractSQL.AddTableField = function(table, fieldName, dataType, required, index, references, defaultValue) {
            void 0 === references && (references = null);
            void 0 === index && (index = null);
            void 0 === defaultValue && (defaultValue = null);
            var fieldID = this.GetTableFieldID(table, fieldName);
            fieldID === !1 && table.fields.push({
                dataType: dataType,
                fieldName: fieldName,
                required: required,
                index: index,
                references: references,
                defaultValue: defaultValue
            });
            return fieldID;
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
            conceptTypeResolutions = [ identifier.name ];
            this.conceptTypeResolvers[parentAlias] = function(untilConcept) {
                var conceptTable, conceptAlias;
                parentAlias = _.last(conceptTypeResolutions);
                if (parentAlias !== !0 && !_.includes(conceptTypeResolutions, untilConcept)) {
                    for (;(concept = this.FollowConceptType(concept)) !== !1; ) {
                        conceptAlias = concept[1] + varNum;
                        conceptTable = this.GetTable(concept[1]);
                        if (conceptTable.primitive !== !1) break;
                        query.push([ "From", [ conceptTable.name, conceptAlias ] ]);
                        this.AddWhereClause(query, [ "Equals", [ "ReferencedField", parentAlias, concept[1] ], [ "ReferencedField", conceptAlias, conceptTable.idField ] ]);
                        parentAlias = conceptAlias;
                        conceptTypeResolutions.push(parentAlias);
                        if (null != untilConcept && !this.IdentifiersEqual(concept, untilConcept)) break;
                    }
                    concept === !1 && conceptTypeResolutions.push(!0);
                }
            }.bind(this);
        };
        LF2AbstractSQL.initialize = function() {
            this.reset();
            this.sbvrTypes = {};
            this.termForms = {};
        };
        LF2AbstractSQL.reset = function() {
            SBVRCompilerLibs.initialize.call(this);
            this.tables = {};
            this.identifiers = {};
            this.rules = [];
            this.attributes = {};
            this.bindAttributes = [];
            this.bindAttributeDepth = [];
            this.ResetRuleState();
        };
        LF2AbstractSQL.ResetRuleState = function() {
            this.conceptTypeResolvers = {};
        };
        LF2AbstractSQL.addTypes = function(types) {
            _.assign(this.sbvrTypes, types);
        };
    });
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    (function() {
        var hasProp = {}.hasOwnProperty;
        !function(root, factory) {
            return !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(34), __webpack_require__(35), __webpack_require__(36), __webpack_require__(4), __webpack_require__(2) ], 
            __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof __WEBPACK_AMD_DEFINE_FACTORY__ ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, 
            void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        }(this, function(arg, arg1, sbvrTypes, _, Promise) {
            var AbstractSQLOptimiser, AbstractSQLRules2SQL, compileRule, compileSchema, dataTypeGen, dataTypeValidate, validateTypes;
            AbstractSQLOptimiser = arg.AbstractSQLOptimiser;
            AbstractSQLRules2SQL = arg1.AbstractSQLRules2SQL;
            validateTypes = _.mapValues(sbvrTypes, function(arg2) {
                var validate;
                validate = arg2.validate;
                if (null != validate) return Promise.promisify(validate);
            });
            dataTypeValidate = function(value, field, callback) {
                var dataType, required;
                dataType = field.dataType, required = field.required;
                return null === value ? required ? Promise.rejected("cannot be null") : Promise.fulfilled(null) : null != validateTypes[dataType] ? validateTypes[dataType](value, required) : Promise.rejected("is an unsupported type: " + dataType);
            };
            dataTypeGen = function(engine, dataType, necessity, index, defaultValue) {
                var dbType, ref, ref1;
                null == index && (index = "");
                necessity = necessity ? " NOT NULL" : " NULL";
                defaultValue = defaultValue ? " DEFAULT " + defaultValue : void 0;
                "" !== index && (index = " " + index);
                dbType = null != (ref = sbvrTypes[dataType]) && null != (ref1 = ref.types) ? ref1[engine] : void 0;
                if (null != dbType) {
                    if (_.isFunction(dbType)) return dbType(necessity, index);
                    null == defaultValue && (defaultValue = "");
                    return dbType + defaultValue + necessity + index;
                }
                throw new Error("Unknown data type '" + dataType + "' for engine: " + engine);
            };
            compileRule = function() {
                var compiler, optimiser;
                optimiser = AbstractSQLOptimiser.createInstance();
                compiler = AbstractSQLRules2SQL.createInstance();
                return function(abstractSQL, engine) {
                    abstractSQL = optimiser.match(abstractSQL, "Process");
                    compiler.engine = engine;
                    return compiler.match(abstractSQL, "Process");
                };
            }();
            compileSchema = function(sqlModel, engine, ifNotExists) {
                var createSQL, createSchemaStatements, dataType, defaultValue, dependency, depends, dropSQL, dropSchemaStatements, e, error, fieldName, foreignKey, foreignKeys, hasDependants, i, index, j, k, l, len, len1, len2, len3, len4, len5, m, n, ref, ref1, ref2, ref3, ref4, ref5, references, required, resourceName, rule, ruleBody, ruleSE, ruleSQL, ruleStatements, schemaDependencyMap, schemaInfo, table, tableName, tableNames, unsolvedDependency;
                ifNotExists = ifNotExists ? "IF NOT EXISTS " : "";
                hasDependants = {};
                schemaDependencyMap = {};
                ref = sqlModel.tables;
                for (resourceName in ref) if (hasProp.call(ref, resourceName)) {
                    table = ref[resourceName];
                    if (!_.isString(table)) {
                        foreignKeys = [];
                        depends = [];
                        dropSQL = 'DROP TABLE "' + table.name + '";';
                        createSQL = "CREATE TABLE " + ifNotExists + '"' + table.name + '" (\n\t';
                        ref1 = table.fields;
                        for (i = 0, len = ref1.length; i < len; i++) {
                            ref2 = ref1[i], dataType = ref2.dataType, fieldName = ref2.fieldName, required = ref2.required, 
                            index = ref2.index, references = ref2.references, defaultValue = ref2.defaultValue;
                            createSQL += '"' + fieldName + '" ' + dataTypeGen(engine, dataType, required, index, defaultValue) + "\n,\t";
                            if ("ForeignKey" === dataType || "ConceptType" === dataType) {
                                foreignKeys.push({
                                    fieldName: fieldName,
                                    references: references
                                });
                                depends.push(references.tableName);
                                hasDependants[references.tableName] = !0;
                            }
                        }
                        for (j = 0, len1 = foreignKeys.length; j < len1; j++) {
                            foreignKey = foreignKeys[j];
                            createSQL += 'FOREIGN KEY ("' + foreignKey.fieldName + '") REFERENCES "' + foreignKey.references.tableName + '" ("' + foreignKey.references.fieldName + '")\n,\t';
                        }
                        ref3 = table.indexes;
                        for (k = 0, len2 = ref3.length; k < len2; k++) {
                            index = ref3[k];
                            createSQL += index.type + '("' + index.fields.join('", "') + '")\n,\t';
                        }
                        createSQL = createSQL.slice(0, -2) + ");";
                        schemaDependencyMap[table.name] = {
                            resourceName: resourceName,
                            primitive: table.primitive,
                            createSQL: createSQL,
                            dropSQL: dropSQL,
                            depends: depends
                        };
                    }
                }
                createSchemaStatements = [];
                dropSchemaStatements = [];
                tableNames = [];
                for (;tableNames.length !== (tableNames = Object.keys(schemaDependencyMap)).length && tableNames.length > 0; ) for (l = 0, 
                len3 = tableNames.length; l < len3; l++) {
                    tableName = tableNames[l];
                    schemaInfo = schemaDependencyMap[tableName];
                    unsolvedDependency = !1;
                    ref4 = schemaInfo.depends;
                    for (m = 0, len4 = ref4.length; m < len4; m++) {
                        dependency = ref4[m];
                        if (dependency !== schemaInfo.resourceName && schemaDependencyMap.hasOwnProperty(dependency)) {
                            unsolvedDependency = !0;
                            break;
                        }
                    }
                    if (unsolvedDependency === !1) {
                        if (sqlModel.tables[schemaInfo.resourceName].exists = schemaInfo.primitive === !1 || null != hasDependants[tableName]) {
                            schemaInfo.primitive !== !1 && console.warn("We're adding a primitive table??", schemaInfo.resourceName);
                            createSchemaStatements.push(schemaInfo.createSQL);
                            dropSchemaStatements.push(schemaInfo.dropSQL);
                        }
                        delete schemaDependencyMap[tableName];
                    }
                }
                if (schemaDependencyMap.length > 0) {
                    console.error("Failed to resolve all schema dependencies", schemaDependencyMap);
                    throw new Error("Failed to resolve all schema dependencies");
                }
                dropSchemaStatements = dropSchemaStatements.reverse();
                ruleStatements = [];
                try {
                    ref5 = sqlModel.rules;
                    for (n = 0, len5 = ref5.length; n < len5; n++) {
                        rule = ref5[n];
                        ruleBody = _.find(rule, {
                            0: "Body"
                        })[1];
                        ruleSE = _.find(rule, {
                            0: "StructuredEnglish"
                        })[1];
                        ruleSQL = compileRule(ruleBody, engine);
                        ruleStatements.push({
                            structuredEnglish: ruleSE,
                            sql: ruleSQL
                        });
                    }
                } catch (error) {
                    e = error;
                    console.error("Failed to compile the rule", JSON.stringify(rule, null, "\t"));
                    console.error(e, e.stack);
                    throw e;
                }
                return {
                    tables: sqlModel.tables,
                    createSchema: createSchemaStatements,
                    dropSchema: dropSchemaStatements,
                    rules: ruleStatements
                };
            };
            return module.exports = _.mapValues({
                postgres: !0,
                mysql: !0,
                websql: !1
            }, function(ifNotExists, engine) {
                return {
                    compileSchema: _.partial(compileSchema, _, engine, ifNotExists),
                    compileRule: _.partial(compileRule, _, engine),
                    dataTypeValidate: dataTypeValidate
                };
            });
        });
    }).call(this);
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !function(root, factory) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__, exports, __webpack_require__(28), __webpack_require__(4) ], 
        __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof __WEBPACK_AMD_DEFINE_FACTORY__ ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, 
        void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }(this, function(require, exports, OMeta) {
        var _ = __webpack_require__(4), AbstractSQLValidator = OMeta._extend({
            Query: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._apply("SelectQuery");
            },
            SelectQuery: function() {
                var $elf = this, _fromIdx = this.input.idx, from, groupBy, limit, offset, orderBy, query, queryPart, select, where;
                this._form(function() {
                    this._applyWithArgs("exactly", "SelectQuery");
                    query = [ "SelectQuery" ];
                    this._many1(function() {
                        queryPart = this._or(function() {
                            this._pred(null == select);
                            return select = this._apply("Select");
                        }, function() {
                            return from = this._apply("Table");
                        }, function() {
                            return this._apply("Join");
                        }, function() {
                            this._pred(null == where);
                            return where = this._apply("Where");
                        }, function() {
                            this._pred(null == groupBy);
                            return groupBy = this._apply("GroupBy");
                        }, function() {
                            this._pred(null == orderBy);
                            return orderBy = this._apply("OrderBy");
                        }, function() {
                            this._pred(null == limit);
                            return limit = this._apply("Limit");
                        }, function() {
                            this._pred(null == offset);
                            return offset = this._apply("Offset");
                        });
                        return query = query.concat(queryPart);
                    });
                    return this._pred(null != select);
                });
                return query;
            },
            DeleteQuery: function() {
                var $elf = this, _fromIdx = this.input.idx, query, queryPart, table, where;
                this._form(function() {
                    this._applyWithArgs("exactly", "DeleteQuery");
                    query = [ "DeleteQuery" ];
                    this._many(function() {
                        queryPart = this._or(function() {
                            return table = this._apply("Table");
                        }, function() {
                            this._pred(null == where);
                            return where = this._apply("Where");
                        });
                        return query = query.concat(queryPart);
                    });
                    return this._pred(null != table);
                });
                return query;
            },
            UpsertQuery: function() {
                var $elf = this, _fromIdx = this.input.idx, insert, update;
                this._form(function() {
                    this._applyWithArgs("exactly", "UpsertQuery");
                    insert = this._apply("InsertQuery");
                    return update = this._apply("UpdateQuery");
                });
                return [ "UpsertQuery", insert, update ];
            },
            InsertQuery: function() {
                var $elf = this, _fromIdx = this.input.idx, body;
                this._form(function() {
                    this._applyWithArgs("exactly", "InsertQuery");
                    return body = this._apply("InsertBody");
                });
                return [ "InsertQuery" ].concat(body);
            },
            UpdateQuery: function() {
                var $elf = this, _fromIdx = this.input.idx, body;
                this._form(function() {
                    this._applyWithArgs("exactly", "UpdateQuery");
                    return body = this._apply("UpdateBody");
                });
                return [ "UpdateQuery" ].concat(body);
            },
            InsertBody: function() {
                var $elf = this, _fromIdx = this.input.idx, body, fields, table, values;
                body = [];
                this._many1(function() {
                    return this._or(function() {
                        return this._apply("Where");
                    }, function() {
                        table = this._apply("Table");
                        return body = body.concat(table);
                    }, function() {
                        return fields = this._apply("Fields");
                    }, function() {
                        return values = this._apply("Values");
                    });
                });
                this._pred(null != fields);
                this._pred(null != values);
                this._pred(null != table);
                body = body.concat(fields, values);
                return body;
            },
            UpdateBody: function() {
                var $elf = this, _fromIdx = this.input.idx, body, fields, table, values, where;
                body = [];
                this._many1(function() {
                    return this._or(function() {
                        table = this._apply("Table");
                        return body = body.concat(table);
                    }, function() {
                        return fields = this._apply("Fields");
                    }, function() {
                        return values = this._apply("Values");
                    }, function() {
                        this._pred(null == where);
                        return where = this._apply("Where");
                    });
                });
                this._pred(null != fields && fields[0].length > 0);
                this._pred(null != values && values[0].length > 0);
                this._pred(null != table);
                body = body.concat(fields, values);
                this._opt(function() {
                    this._pred(where);
                    return body = body.concat(where);
                });
                return body;
            },
            Fields: function() {
                var $elf = this, _fromIdx = this.input.idx, fields;
                this._form(function() {
                    this._applyWithArgs("exactly", "Fields");
                    return this._form(function() {
                        return fields = this._many(function() {
                            return this.anything();
                        });
                    });
                });
                return [ [ "Fields", fields ] ];
            },
            Values: function() {
                var $elf = this, _fromIdx = this.input.idx, values;
                this._form(function() {
                    this._applyWithArgs("exactly", "Values");
                    return this._or(function() {
                        return values = this._apply("SelectQuery");
                    }, function() {
                        return this._form(function() {
                            return values = this._many(function() {
                                return this._or(function() {
                                    switch (this.anything()) {
                                      case "?":
                                        return "?";

                                      default:
                                        throw this._fail();
                                    }
                                }, function() {
                                    return this._apply("true");
                                }, function() {
                                    return this._apply("false");
                                }, function() {
                                    return this._apply("Null");
                                }, function() {
                                    return this._apply("Bind");
                                }, function() {
                                    return this._apply("Default");
                                }, function() {
                                    return this.anything();
                                });
                            });
                        });
                    });
                });
                return [ [ "Values", values ] ];
            },
            Default: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("exactly", "Default");
            },
            Select: function() {
                var $elf = this, _fromIdx = this.input.idx, as, field, fields, table;
                this._form(function() {
                    this._applyWithArgs("exactly", "Select");
                    return this._form(function() {
                        return fields = this._many(function() {
                            return this._or(function() {
                                this._form(function() {
                                    field = this._apply("SelectField");
                                    return as = this.anything();
                                });
                                return [ field, as ];
                            }, function() {
                                return this._apply("SelectField");
                            }, function() {
                                return this._form(function() {
                                    table = this.anything();
                                    return this._applyWithArgs("exactly", "*");
                                });
                            }, function() {
                                switch (this.anything()) {
                                  case "*":
                                    return "*";

                                  default:
                                    throw this._fail();
                                }
                            });
                        });
                    });
                });
                return [ [ "Select", fields ] ];
            },
            SelectField: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._apply("Count");
                }, function() {
                    return this._apply("AnyValue");
                }, function() {
                    return this._apply("Null");
                });
            },
            Count: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._form(function() {
                    this._applyWithArgs("exactly", "Count");
                    return this._applyWithArgs("exactly", "*");
                });
            },
            Table: function() {
                var $elf = this, _fromIdx = this.input.idx, as, from, table;
                this._form(function() {
                    this._applyWithArgs("exactly", "From");
                    return from = this._or(function() {
                        this._not(function() {
                            return this._apply("string");
                        });
                        this._form(function() {
                            table = this._or(function() {
                                return this._apply("SelectQuery");
                            }, function() {
                                return this.anything();
                            });
                            return as = this.anything();
                        });
                        return [ table, as ];
                    }, function() {
                        return this._apply("SelectQuery");
                    }, function() {
                        return this.anything();
                    });
                });
                return [ [ "From", from ] ];
            },
            Join: function() {
                var $elf = this, _fromIdx = this.input.idx, boolStatement, table;
                this._form(function() {
                    this._applyWithArgs("exactly", "Join");
                    this._form(function() {
                        this._applyWithArgs("exactly", "With");
                        return table = this.anything();
                    });
                    return this._form(function() {
                        this._applyWithArgs("exactly", "On");
                        return boolStatement = this._apply("BooleanValue");
                    });
                });
                return [ [ "Join", [ "With", table ], [ "On", boolStatement ] ] ];
            },
            Where: function() {
                var $elf = this, _fromIdx = this.input.idx, boolStatement;
                this._form(function() {
                    this._applyWithArgs("exactly", "Where");
                    return boolStatement = this._apply("BooleanValue");
                });
                return [ [ "Where", boolStatement ] ];
            },
            GroupBy: function() {
                var $elf = this, _fromIdx = this.input.idx, values;
                this._form(function() {
                    this._applyWithArgs("exactly", "GroupBy");
                    return this._form(function() {
                        return values = this._many1(function() {
                            return this._apply("AnyValue");
                        });
                    });
                });
                return [ [ "GroupBy", values ] ];
            },
            OrderBy: function() {
                var $elf = this, _fromIdx = this.input.idx, field, order, orders;
                this._form(function() {
                    this._applyWithArgs("exactly", "OrderBy");
                    return orders = this._many1(function() {
                        this._form(function() {
                            order = function() {
                                switch (this.anything()) {
                                  case "ASC":
                                    return "ASC";

                                  case "DESC":
                                    return "DESC";

                                  default:
                                    throw this._fail();
                                }
                            }.call(this);
                            return field = this._apply("Field");
                        });
                        return [ order, field ];
                    });
                });
                return [ [ "OrderBy" ].concat(orders) ];
            },
            Limit: function() {
                var $elf = this, _fromIdx = this.input.idx, num;
                this._form(function() {
                    this._applyWithArgs("exactly", "Limit");
                    return num = this._apply("NumericValue");
                });
                return [ [ "Limit", num ] ];
            },
            Offset: function() {
                var $elf = this, _fromIdx = this.input.idx, num;
                this._form(function() {
                    this._applyWithArgs("exactly", "Offset");
                    return num = this._apply("NumericValue");
                });
                return [ [ "Offset", num ] ];
            },
            AnyValue: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._apply("UnknownValue");
                }, function() {
                    return this._apply("TextValue");
                }, function() {
                    return this._apply("NumericValue");
                }, function() {
                    return this._apply("BooleanValue");
                }, function() {
                    return this._apply("DateValue");
                }, function() {
                    return this._apply("JSONValue");
                }, function() {
                    return this._apply("DurationValue");
                });
            },
            UnknownValue: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._apply("Field");
                }, function() {
                    return this._apply("Bind");
                }, function() {
                    return this._apply("Null");
                }, function() {
                    return this._apply("Cast");
                }, function() {
                    return this._apply("SelectQuery");
                });
            },
            Field: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._apply("ReferencedField");
                }, function() {
                    return this._apply("UnreferencedField");
                });
            },
            UnreferencedField: function() {
                var $elf = this, _fromIdx = this.input.idx, field;
                return this._form(function() {
                    this._applyWithArgs("exactly", "Field");
                    return field = this.anything();
                });
            },
            ReferencedField: function() {
                var $elf = this, _fromIdx = this.input.idx, field, table;
                return this._form(function() {
                    this._applyWithArgs("exactly", "ReferencedField");
                    table = this.anything();
                    return field = this.anything();
                });
            },
            Bind: function() {
                var $elf = this, _fromIdx = this.input.idx, field, tableName;
                return this._form(function() {
                    this._applyWithArgs("exactly", "Bind");
                    return this._or(function() {
                        return this._apply("number");
                    }, function() {
                        tableName = this.anything();
                        return field = this.anything();
                    });
                });
            },
            Null: function() {
                var $elf = this, _fromIdx = this.input.idx, next;
                next = this.anything();
                this._pred(null === next || "Null" === next);
                return null;
            },
            Cast: function() {
                var $elf = this, _fromIdx = this.input.idx, as, v;
                this._form(function() {
                    this._applyWithArgs("exactly", "Cast");
                    v = this._apply("AnyValue");
                    return as = this.anything();
                });
                return [ "Cast", v, as ];
            },
            TextValue: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._apply("UnknownValue");
                }, function() {
                    return this._apply("Text");
                }, function() {
                    return this._apply("Concat");
                }, function() {
                    return this._apply("Lower");
                }, function() {
                    return this._apply("Upper");
                }, function() {
                    return this._apply("Trim");
                }, function() {
                    return this._apply("Replace");
                }, function() {
                    return this._apply("Substring");
                }, function() {
                    return this._apply("Right");
                });
            },
            Text: function() {
                var $elf = this, _fromIdx = this.input.idx, text;
                return this._form(function() {
                    (function() {
                        switch (this.anything()) {
                          case "Text":
                            return "Text";

                          case "Value":
                            return "Value";

                          default:
                            throw this._fail();
                        }
                    }).call(this);
                    return text = this.anything();
                });
            },
            Concat: function() {
                var $elf = this, _fromIdx = this.input.idx, firstString, otherStrings;
                this._form(function() {
                    (function() {
                        switch (this.anything()) {
                          case "Concat":
                            return "Concat";

                          case "Concatenate":
                            return "Concatenate";

                          default:
                            throw this._fail();
                        }
                    }).call(this);
                    firstString = this._apply("TextValue");
                    return otherStrings = this._many1(function() {
                        return this._apply("TextValue");
                    });
                });
                return [ "Concatenate", firstString ].concat(otherStrings);
            },
            Lower: function() {
                var $elf = this, _fromIdx = this.input.idx, string;
                this._form(function() {
                    (function() {
                        switch (this.anything()) {
                          case "Lower":
                            return "Lower";

                          case "ToLower":
                            return "ToLower";

                          case "Tolower":
                            return "Tolower";

                          default:
                            throw this._fail();
                        }
                    }).call(this);
                    return string = this._apply("TextValue");
                });
                return [ "Lower", string ];
            },
            Upper: function() {
                var $elf = this, _fromIdx = this.input.idx, string;
                this._form(function() {
                    (function() {
                        switch (this.anything()) {
                          case "ToUpper":
                            return "ToUpper";

                          case "Toupper":
                            return "Toupper";

                          case "Upper":
                            return "Upper";

                          default:
                            throw this._fail();
                        }
                    }).call(this);
                    return string = this._apply("TextValue");
                });
                return [ "Upper", string ];
            },
            Trim: function() {
                var $elf = this, _fromIdx = this.input.idx, str;
                this._form(function() {
                    this._applyWithArgs("exactly", "Trim");
                    return str = this._apply("TextValue");
                });
                return [ "Trim", str ];
            },
            Replace: function() {
                var $elf = this, _fromIdx = this.input.idx, find, replacement, string;
                this._form(function() {
                    this._applyWithArgs("exactly", "Replace");
                    string = this._apply("TextValue");
                    find = this._apply("TextValue");
                    return replacement = this._apply("TextValue");
                });
                return [ "Replace", string, find, replacement ];
            },
            Substring: function() {
                var $elf = this, _fromIdx = this.input.idx, args, string;
                this._form(function() {
                    this._applyWithArgs("exactly", "Substring");
                    string = this._apply("TextValue");
                    return args = this._many1(function() {
                        return this._apply("NumericValue");
                    });
                });
                return [ "Substring", string ].concat(args);
            },
            Right: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, n, string;
                this._form(function() {
                    this._applyWithArgs("exactly", "Right");
                    string = this._apply("TextValue");
                    return n = this._apply("NumericValue");
                });
                return [ "Right", string, n ];
            },
            NumericValue: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._apply("UnknownValue");
                }, function() {
                    return this._apply("Number");
                }, function() {
                    return this._apply("MathOp");
                }, function() {
                    return this._apply("BitwiseAnd");
                }, function() {
                    return this._apply("BitwiseShiftRight");
                }, function() {
                    return this._apply("CharacterLength");
                }, function() {
                    return this._apply("IndexOf");
                }, function() {
                    return this._apply("StrPos");
                }, function() {
                    return this._apply("Year");
                }, function() {
                    return this._apply("Month");
                }, function() {
                    return this._apply("Day");
                }, function() {
                    return this._apply("Hour");
                }, function() {
                    return this._apply("Minute");
                }, function() {
                    return this._apply("Second");
                }, function() {
                    return this._apply("FractionalSeconds");
                }, function() {
                    return this._apply("TotalSeconds");
                }, function() {
                    return this._apply("Round");
                }, function() {
                    return this._apply("Floor");
                }, function() {
                    return this._apply("Ceiling");
                });
            },
            Number: function() {
                var $elf = this, _fromIdx = this.input.idx, number;
                return this._form(function() {
                    (function() {
                        switch (this.anything()) {
                          case "Integer":
                            return "Integer";

                          case "Number":
                            return "Number";

                          case "Real":
                            return "Real";

                          default:
                            throw this._fail();
                        }
                    }).call(this);
                    return number = this.anything();
                });
            },
            MathOp: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._apply("Add");
                }, function() {
                    return this._apply("Subtract");
                }, function() {
                    return this._apply("Multiply");
                }, function() {
                    return this._apply("Divide");
                });
            },
            Add: function() {
                var $elf = this, _fromIdx = this.input.idx, lhs, rhs;
                this._form(function() {
                    this._applyWithArgs("exactly", "Add");
                    lhs = this._apply("NumericValue");
                    return rhs = this._apply("NumericValue");
                });
                return [ "Add", lhs, rhs ];
            },
            Subtract: function() {
                var $elf = this, _fromIdx = this.input.idx, lhs, rhs;
                this._form(function() {
                    this._applyWithArgs("exactly", "Subtract");
                    lhs = this._apply("NumericValue");
                    return rhs = this._apply("NumericValue");
                });
                return [ "Subtract", lhs, rhs ];
            },
            Multiply: function() {
                var $elf = this, _fromIdx = this.input.idx, lhs, rhs;
                this._form(function() {
                    this._applyWithArgs("exactly", "Multiply");
                    lhs = this._apply("NumericValue");
                    return rhs = this._apply("NumericValue");
                });
                return [ "Multiply", lhs, rhs ];
            },
            Divide: function() {
                var $elf = this, _fromIdx = this.input.idx, lhs, rhs;
                this._form(function() {
                    this._applyWithArgs("exactly", "Divide");
                    lhs = this._apply("NumericValue");
                    return rhs = this._apply("NumericValue");
                });
                return [ "Divide", lhs, rhs ];
            },
            BitwiseAnd: function() {
                var $elf = this, _fromIdx = this.input.idx, mask, operand;
                this._form(function() {
                    this._applyWithArgs("exactly", "BitwiseAnd");
                    operand = this._apply("NumericValue");
                    return mask = this._apply("NumericValue");
                });
                return [ "BitwiseAnd", operand, mask ];
            },
            BitwiseShiftRight: function() {
                var $elf = this, _fromIdx = this.input.idx, operand, shift;
                this._form(function() {
                    this._applyWithArgs("exactly", "BitwiseShiftRight");
                    operand = this._apply("NumericValue");
                    return shift = this._apply("NumericValue");
                });
                return [ "BitwiseShiftRight", operand, shift ];
            },
            CharacterLength: function() {
                var $elf = this, _fromIdx = this.input.idx, text;
                this._form(function() {
                    this._applyWithArgs("exactly", "CharacterLength");
                    return text = this._apply("TextValue");
                });
                return [ "CharacterLength", text ];
            },
            IndexOf: function() {
                var $elf = this, _fromIdx = this.input.idx, haystack, needle;
                this._form(function() {
                    (function() {
                        switch (this.anything()) {
                          case "IndexOf":
                            return "IndexOf";

                          case "Indexof":
                            return "Indexof";

                          default:
                            throw this._fail();
                        }
                    }).call(this);
                    haystack = this._apply("TextValue");
                    return needle = this._apply("TextValue");
                });
                this._apply("SetHelped");
                return [ "Subtract", [ "StrPos", haystack, needle ], [ "Number", 1 ] ];
            },
            StrPos: function() {
                var $elf = this, _fromIdx = this.input.idx, haystack, needle;
                this._form(function() {
                    (function() {
                        switch (this.anything()) {
                          case "InStr":
                            return "InStr";

                          case "StrPos":
                            return "StrPos";

                          default:
                            throw this._fail();
                        }
                    }).call(this);
                    haystack = this._apply("TextValue");
                    return needle = this._apply("TextValue");
                });
                return [ "StrPos", haystack, needle ];
            },
            Year: function() {
                var $elf = this, _fromIdx = this.input.idx, date;
                this._form(function() {
                    this._applyWithArgs("exactly", "Year");
                    return date = this._apply("DateValue");
                });
                return [ "Year", date ];
            },
            Month: function() {
                var $elf = this, _fromIdx = this.input.idx, date;
                this._form(function() {
                    this._applyWithArgs("exactly", "Month");
                    return date = this._apply("DateValue");
                });
                return [ "Month", date ];
            },
            Day: function() {
                var $elf = this, _fromIdx = this.input.idx, date;
                this._form(function() {
                    this._applyWithArgs("exactly", "Day");
                    return date = this._apply("DateValue");
                });
                return [ "Day", date ];
            },
            Hour: function() {
                var $elf = this, _fromIdx = this.input.idx, date;
                this._form(function() {
                    this._applyWithArgs("exactly", "Hour");
                    return date = this._apply("DateValue");
                });
                return [ "Hour", date ];
            },
            Minute: function() {
                var $elf = this, _fromIdx = this.input.idx, date;
                this._form(function() {
                    this._applyWithArgs("exactly", "Minute");
                    return date = this._apply("DateValue");
                });
                return [ "Minute", date ];
            },
            Second: function() {
                var $elf = this, _fromIdx = this.input.idx, date;
                this._form(function() {
                    this._applyWithArgs("exactly", "Second");
                    return date = this._apply("DateValue");
                });
                return [ "Second", date ];
            },
            FractionalSeconds: function() {
                var $elf = this, _fromIdx = this.input.idx, date;
                this._form(function() {
                    this._applyWithArgs("exactly", "Fractionalseconds");
                    return date = this._apply("DateValue");
                });
                return [ "Fractionalseconds", date ];
            },
            TotalSeconds: function() {
                var $elf = this, _fromIdx = this.input.idx, duration;
                this._form(function() {
                    this._applyWithArgs("exactly", "Totalseconds");
                    return duration = this._apply("DurationValue");
                });
                return [ "Totalseconds", duration ];
            },
            Round: function() {
                var $elf = this, _fromIdx = this.input.idx, num;
                this._form(function() {
                    this._applyWithArgs("exactly", "Round");
                    return num = this._apply("NumericValue");
                });
                return [ "Round", num ];
            },
            Floor: function() {
                var $elf = this, _fromIdx = this.input.idx, num;
                this._form(function() {
                    this._applyWithArgs("exactly", "Floor");
                    return num = this._apply("NumericValue");
                });
                return [ "Floor", num ];
            },
            Ceiling: function() {
                var $elf = this, _fromIdx = this.input.idx, num;
                this._form(function() {
                    this._applyWithArgs("exactly", "Ceiling");
                    return num = this._apply("NumericValue");
                });
                return [ "Ceiling", num ];
            },
            BooleanValue: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._apply("UnknownValue");
                }, function() {
                    return this._apply("Boolean");
                }, function() {
                    return this._apply("And");
                }, function() {
                    return this._apply("Not");
                }, function() {
                    return this._apply("Or");
                }, function() {
                    return this._apply("Exists");
                }, function() {
                    return this._apply("NotExists");
                }, function() {
                    return this._apply("Comparison");
                }, function() {
                    return this._apply("Between");
                }, function() {
                    return this._apply("In");
                }, function() {
                    return this._apply("NotIn");
                });
            },
            Boolean: function() {
                var $elf = this, _fromIdx = this.input.idx, bool;
                this._form(function() {
                    this._applyWithArgs("exactly", "Boolean");
                    return bool = this._or(function() {
                        return this._apply("true");
                    }, function() {
                        return this._apply("false");
                    });
                });
                return [ "Boolean", bool ];
            },
            Not: function() {
                var $elf = this, _fromIdx = this.input.idx, bool;
                this._form(function() {
                    this._applyWithArgs("exactly", "Not");
                    return bool = this._apply("BooleanValue");
                });
                return [ "Not", bool ];
            },
            And: function() {
                var $elf = this, _fromIdx = this.input.idx, firstBool, otherBools;
                this._form(function() {
                    this._applyWithArgs("exactly", "And");
                    firstBool = this._apply("BooleanValue");
                    return otherBools = this._many1(function() {
                        return this._apply("BooleanValue");
                    });
                });
                return [ "And", firstBool ].concat(otherBools);
            },
            Or: function() {
                var $elf = this, _fromIdx = this.input.idx, firstBool, otherBools;
                this._form(function() {
                    this._applyWithArgs("exactly", "Or");
                    firstBool = this._apply("BooleanValue");
                    return otherBools = this._many1(function() {
                        return this._apply("BooleanValue");
                    });
                });
                return [ "Or", firstBool ].concat(otherBools);
            },
            NotExists: function() {
                var $elf = this, _fromIdx = this.input.idx, exists;
                this._form(function() {
                    this._applyWithArgs("exactly", "NotExists");
                    return exists = this._apply("AnyValue");
                });
                return [ "NotExists", exists ];
            },
            Exists: function() {
                var $elf = this, _fromIdx = this.input.idx, exists;
                this._form(function() {
                    this._applyWithArgs("exactly", "Exists");
                    return exists = this._apply("AnyValue");
                });
                return [ "Exists", exists ];
            },
            Comparison: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._apply("Equals");
                }, function() {
                    return this._apply("GreaterThan");
                }, function() {
                    return this._apply("GreaterThanOrEqual");
                }, function() {
                    return this._apply("LessThan");
                }, function() {
                    return this._apply("LessThanOrEqual");
                }, function() {
                    return this._apply("NotEquals");
                }, function() {
                    return this._apply("Like");
                });
            },
            Equals: function() {
                var $elf = this, _fromIdx = this.input.idx, comp1, comp2;
                this._form(function() {
                    this._applyWithArgs("exactly", "Equals");
                    comp1 = this._apply("AnyValue");
                    return comp2 = this._apply("AnyValue");
                });
                return [ "Equals", comp1, comp2 ];
            },
            GreaterThan: function() {
                var $elf = this, _fromIdx = this.input.idx, comp1, comp2;
                this._form(function() {
                    this._applyWithArgs("exactly", "GreaterThan");
                    comp1 = this._apply("AnyValue");
                    return comp2 = this._apply("AnyValue");
                });
                return [ "GreaterThan", comp1, comp2 ];
            },
            GreaterThanOrEqual: function() {
                var $elf = this, _fromIdx = this.input.idx, comp1, comp2;
                this._form(function() {
                    this._applyWithArgs("exactly", "GreaterThanOrEqual");
                    comp1 = this._apply("AnyValue");
                    return comp2 = this._apply("AnyValue");
                });
                return [ "GreaterThanOrEqual", comp1, comp2 ];
            },
            LessThan: function() {
                var $elf = this, _fromIdx = this.input.idx, comp1, comp2;
                this._form(function() {
                    this._applyWithArgs("exactly", "LessThan");
                    comp1 = this._apply("AnyValue");
                    return comp2 = this._apply("AnyValue");
                });
                return [ "LessThan", comp1, comp2 ];
            },
            LessThanOrEqual: function() {
                var $elf = this, _fromIdx = this.input.idx, comp1, comp2;
                this._form(function() {
                    this._applyWithArgs("exactly", "LessThanOrEqual");
                    comp1 = this._apply("AnyValue");
                    return comp2 = this._apply("AnyValue");
                });
                return [ "LessThanOrEqual", comp1, comp2 ];
            },
            NotEquals: function() {
                var $elf = this, _fromIdx = this.input.idx, comp1, comp2;
                this._form(function() {
                    this._applyWithArgs("exactly", "NotEquals");
                    comp1 = this._apply("AnyValue");
                    return comp2 = this._apply("AnyValue");
                });
                return [ "NotEquals", comp1, comp2 ];
            },
            Like: function() {
                var $elf = this, _fromIdx = this.input.idx, comp1, comp2;
                this._form(function() {
                    this._applyWithArgs("exactly", "Like");
                    comp1 = this._apply("AnyValue");
                    return comp2 = this._apply("AnyValue");
                });
                return [ "Like", comp1, comp2 ];
            },
            Between: function() {
                var $elf = this, _fromIdx = this.input.idx, comp1, comp2, comp3;
                this._form(function() {
                    this._applyWithArgs("exactly", "Between");
                    comp1 = this._apply("AnyValue");
                    comp2 = this._apply("AnyValue");
                    return comp3 = this._apply("AnyValue");
                });
                return [ "Between", comp1, comp2, comp3 ];
            },
            In: function() {
                var $elf = this, _fromIdx = this.input.idx, field, vals;
                this._form(function() {
                    this._applyWithArgs("exactly", "In");
                    field = this._apply("Field");
                    return vals = this._many1(function() {
                        return this._apply("AnyValue");
                    });
                });
                return [ "In", field ].concat(vals);
            },
            NotIn: function() {
                var $elf = this, _fromIdx = this.input.idx, field, vals;
                this._form(function() {
                    this._applyWithArgs("exactly", "NotIn");
                    field = this._apply("Field");
                    return vals = this._many1(function() {
                        return this._apply("AnyValue");
                    });
                });
                return [ "NotIn", field ].concat(vals);
            },
            DateValue: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._apply("UnknownValue");
                }, function() {
                    return this._apply("Date");
                }, function() {
                    return this._apply("ToDate");
                }, function() {
                    return this._apply("ToTime");
                }, function() {
                    return this._apply("Now");
                });
            },
            Date: function() {
                var $elf = this, _fromIdx = this.input.idx, date;
                this._form(function() {
                    this._applyWithArgs("exactly", "Date");
                    return date = this.anything();
                });
                this._pred(_.isDate(date));
                return [ "Date", date ];
            },
            ToDate: function() {
                var $elf = this, _fromIdx = this.input.idx, date;
                this._form(function() {
                    this._applyWithArgs("exactly", "ToDate");
                    return date = this._apply("DateValue");
                });
                return [ "ToDate", date ];
            },
            ToTime: function() {
                var $elf = this, _fromIdx = this.input.idx, date;
                this._form(function() {
                    this._applyWithArgs("exactly", "ToTime");
                    return date = this._apply("DateValue");
                });
                return [ "ToTime", date ];
            },
            Now: function() {
                var $elf = this, _fromIdx = this.input.idx;
                this._form(function() {
                    return this._applyWithArgs("exactly", "Now");
                });
                return [ "Now" ];
            },
            JSONValue: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._apply("UnknownValue");
                }, function() {
                    return this._apply("AggregateJSON");
                });
            },
            AggregateJSON: function() {
                var $elf = this, _fromIdx = this.input.idx, field;
                this._form(function() {
                    this._applyWithArgs("exactly", "AggregateJSON");
                    return field = this.anything();
                });
                return [ "AggregateJSON", field ];
            },
            DurationValue: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._apply("UnknownValue");
                }, function() {
                    return this._apply("Duration");
                });
            },
            Duration: function() {
                var $elf = this, _fromIdx = this.input.idx, duration;
                this._form(function() {
                    this._applyWithArgs("exactly", "Duration");
                    return duration = this.anything();
                });
                this._pred(_.isObject(duration));
                duration = _(duration).pick("negative", "day", "hour", "minute", "second").omitBy(_.isNil).pickBy(function(value, key) {
                    return "negative" === key ? _.isBoolean(value) : _.isNumber(value);
                }).value();
                this._pred(!_(duration).omit("negative").isEmpty());
                return [ "Duration", duration ];
            }
        }), AbstractSQLOptimiser = exports.AbstractSQLOptimiser = AbstractSQLValidator._extend({
            FieldNotEquals: function() {
                var $elf = this, _fromIdx = this.input.idx, comp1, comp2;
                this._form(function() {
                    this._applyWithArgs("exactly", "NotEquals");
                    return this._or(function() {
                        comp1 = this._apply("Field");
                        return comp2 = this._apply("AnyValue");
                    }, function() {
                        comp2 = this._apply("AnyValue");
                        return comp1 = this._apply("Field");
                    });
                });
                return [ "NotEquals", comp1, comp2 ];
            },
            FieldEquals: function() {
                var $elf = this, _fromIdx = this.input.idx, comp1, comp2;
                this._form(function() {
                    this._applyWithArgs("exactly", "Equals");
                    return this._or(function() {
                        comp1 = this._apply("Field");
                        return comp2 = this._apply("AnyValue");
                    }, function() {
                        comp2 = this._apply("AnyValue");
                        return comp1 = this._apply("Field");
                    });
                });
                return [ "Equals", comp1, comp2 ];
            },
            Or: function() {
                var $elf = this, _fromIdx = this.input.idx, bool, conditions, firstBool, inStatement, inVals, or, otherBools, secondBool;
                return this._or(function() {
                    this._form(function() {
                        this._applyWithArgs("exactly", "Or");
                        firstBool = this._apply("FieldEquals");
                        inVals = this._many1(function() {
                            secondBool = this._apply("FieldEquals");
                            this._pred(_.isEqual(firstBool[1], secondBool[1]));
                            return secondBool[2];
                        });
                        return otherBools = this._many(function() {
                            return this._apply("BooleanValue");
                        });
                    });
                    this._apply("SetHelped");
                    inStatement = [ "In", firstBool[1], firstBool[2] ].concat(inVals);
                    return this._or(function() {
                        this._pred(otherBools.length > 0);
                        return [ "Or", inStatement ].concat(otherBools);
                    }, function() {
                        return inStatement;
                    });
                }, function() {
                    this._form(function() {
                        this._applyWithArgs("exactly", "Or");
                        conditions = [];
                        return this._many1(function() {
                            return this._or(function() {
                                or = this._apply("Or");
                                conditions = conditions.concat(or.slice(1));
                                return this._apply("SetHelped");
                            }, function() {
                                bool = this._apply("BooleanValue");
                                return conditions.push(bool);
                            });
                        });
                    });
                    return [ "Or" ].concat(conditions);
                }, function() {
                    return AbstractSQLValidator._superApplyWithArgs(this, "Or");
                });
            },
            And: function() {
                var $elf = this, _fromIdx = this.input.idx, and, bool, conditions, firstBool, inStatement, inVals, otherBools, secondBool;
                return this._or(function() {
                    this._form(function() {
                        this._applyWithArgs("exactly", "And");
                        firstBool = this._apply("FieldNotEquals");
                        inVals = this._many1(function() {
                            secondBool = this._apply("FieldNotEquals");
                            this._pred(_.isEqual(firstBool[1], secondBool[1]));
                            return secondBool[2];
                        });
                        return otherBools = this._many(function() {
                            return this._apply("BooleanValue");
                        });
                    });
                    this._apply("SetHelped");
                    inStatement = [ "NotIn", firstBool[1], firstBool[2] ].concat(inVals);
                    return this._or(function() {
                        this._pred(otherBools.length > 0);
                        return [ "Or", inStatement ].concat(otherBools);
                    }, function() {
                        return inStatement;
                    });
                }, function() {
                    this._form(function() {
                        this._applyWithArgs("exactly", "And");
                        conditions = [];
                        return this._many1(function() {
                            return this._or(function() {
                                and = this._apply("And");
                                conditions = conditions.concat(and.slice(1));
                                return this._apply("SetHelped");
                            }, function() {
                                bool = this._apply("BooleanValue");
                                return conditions.push(bool);
                            });
                        });
                    });
                    return [ "And" ].concat(conditions);
                }, function() {
                    return AbstractSQLValidator._superApplyWithArgs(this, "And");
                });
            },
            Not: function() {
                var $elf = this, _fromIdx = this.input.idx, boolStatement, replace;
                return this._or(function() {
                    this._form(function() {
                        this._applyWithArgs("exactly", "Not");
                        return this._or(function() {
                            return this._form(function() {
                                this._applyWithArgs("exactly", "Not");
                                return boolStatement = this._apply("BooleanValue");
                            });
                        }, function() {
                            replace = this._or(function() {
                                boolStatement = this._apply("Equals");
                                return "NotEquals";
                            }, function() {
                                boolStatement = this._apply("NotEquals");
                                return "Equals";
                            }, function() {
                                boolStatement = this._apply("In");
                                return "NotIn";
                            }, function() {
                                boolStatement = this._apply("NotIn");
                                return "In";
                            }, function() {
                                boolStatement = this._apply("Exists");
                                return "NotExists";
                            }, function() {
                                boolStatement = this._apply("NotExists");
                                return "Exists";
                            });
                            return boolStatement[0] = replace;
                        });
                    });
                    this._apply("SetHelped");
                    return boolStatement;
                }, function() {
                    return AbstractSQLValidator._superApplyWithArgs(this, "Not");
                });
            },
            NotEquals: function() {
                var $elf = this, _fromIdx = this.input.idx, value;
                return this._or(function() {
                    this._form(function() {
                        this._applyWithArgs("exactly", "NotEquals");
                        return this._or(function() {
                            this._apply("Null");
                            return value = this._apply("AnyValue");
                        }, function() {
                            value = this._apply("AnyValue");
                            return this._apply("Null");
                        });
                    });
                    this._apply("SetHelped");
                    return [ "Exists", value ];
                }, function() {
                    return AbstractSQLValidator._superApplyWithArgs(this, "NotEquals");
                });
            },
            Equals: function() {
                var $elf = this, _fromIdx = this.input.idx, value;
                return this._or(function() {
                    this._form(function() {
                        this._applyWithArgs("exactly", "Equals");
                        return this._or(function() {
                            this._apply("Null");
                            return value = this._apply("AnyValue");
                        }, function() {
                            value = this._apply("AnyValue");
                            return this._apply("Null");
                        });
                    });
                    this._apply("SetHelped");
                    return [ "Not", [ "Exists", value ] ];
                }, function() {
                    return AbstractSQLValidator._superApplyWithArgs(this, "Equals");
                });
            },
            BooleanValue: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._apply("Contains");
                }, function() {
                    return this._apply("StartsWith");
                }, function() {
                    return this._apply("EndsWith");
                }, function() {
                    return AbstractSQLValidator._superApplyWithArgs(this, "BooleanValue");
                });
            },
            Contains: function() {
                var $elf = this, _fromIdx = this.input.idx, haystack, needle;
                this._form(function() {
                    switch (this.anything()) {
                      case "Contains":
                        haystack = this._apply("TextValue");
                        return needle = this._apply("TextValue");

                      case "Substringof":
                        needle = this._apply("TextValue");
                        return haystack = this._apply("TextValue");

                      default:
                        throw this._fail();
                    }
                });
                this._apply("SetHelped");
                return [ "GreaterThan", [ "StrPos", haystack, needle ], [ "Number", 0 ] ];
            },
            StartsWith: function() {
                var $elf = this, _fromIdx = this.input.idx, haystack, needle;
                this._form(function() {
                    this._applyWithArgs("exactly", "Startswith");
                    haystack = this._apply("TextValue");
                    return needle = this._apply("TextValue");
                });
                this._apply("SetHelped");
                return [ "Equals", [ "StrPos", haystack, needle ], [ "Number", 1 ] ];
            },
            EndsWith: function() {
                var $elf = this, _fromIdx = this.input.idx, haystack, needle;
                this._form(function() {
                    this._applyWithArgs("exactly", "Endswith");
                    haystack = this._apply("TextValue");
                    return needle = this._apply("TextValue");
                });
                this._apply("SetHelped");
                return [ "Equals", [ "Right", haystack, [ "CharacterLength", needle ] ], needle ];
            },
            Helped: function(disableMemoisationHack) {
                var $elf = this, _fromIdx = this.input.idx;
                this._pred(this.helped === !0);
                return this.helped = !1;
            },
            SetHelped: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this.helped = !0;
            },
            Process: function() {
                var $elf = this, _fromIdx = this.input.idx, query;
                query = this.anything();
                query = this._or(function() {
                    return this._applyWithArgs("AnyValue", query);
                }, function() {
                    return this._applyWithArgs("SelectQuery", query);
                }, function() {
                    return this._applyWithArgs("InsertQuery", query);
                }, function() {
                    return this._applyWithArgs("UpdateQuery", query);
                }, function() {
                    return this._applyWithArgs("DeleteQuery", query);
                }, function() {
                    return this._applyWithArgs("UpsertQuery", query);
                });
                this._many(function() {
                    this._applyWithArgs("Helped", "disableMemoisation");
                    return query = this._or(function() {
                        return this._applyWithArgs("AnyValue", query);
                    }, function() {
                        return this._applyWithArgs("SelectQuery", query);
                    }, function() {
                        return this._applyWithArgs("InsertQuery", query);
                    }, function() {
                        return this._applyWithArgs("UpdateQuery", query);
                    }, function() {
                        return this._applyWithArgs("DeleteQuery", query);
                    }, function() {
                        return this._applyWithArgs("UpsertQuery", query);
                    });
                });
                return query;
            }
        });
        AbstractSQLOptimiser.initialize = function() {
            this.helped = !1;
        };
    });
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !function(root, factory) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__, exports, __webpack_require__(28), __webpack_require__(36), __webpack_require__(4) ], 
        __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof __WEBPACK_AMD_DEFINE_FACTORY__ ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, 
        void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }(this, function(require, exports, OMeta) {
        var sbvrTypes = __webpack_require__(36), _ = __webpack_require__(4), comparisons = {
            Equals: " = ",
            GreaterThan: " > ",
            GreaterThanOrEqual: " >= ",
            LessThan: " < ",
            LessThanOrEqual: " <= ",
            NotEquals: " != ",
            Like: " LIKE "
        }, fractionalSecondsFormat = function(date) {
            return this.Totalseconds(date) + " - " + this.Second(date);
        }, websqlBasicDateFormat = function(format) {
            return function(date) {
                return "STRFTIME('" + format + "', " + date + ")";
            };
        }, websqlDateFormats = {
            Year: websqlBasicDateFormat("%Y"),
            Month: websqlBasicDateFormat("%m"),
            Day: websqlBasicDateFormat("%d"),
            Hour: websqlBasicDateFormat("%H"),
            Minute: websqlBasicDateFormat("%M"),
            Second: websqlBasicDateFormat("%S"),
            Fractionalseconds: fractionalSecondsFormat,
            Totalseconds: websqlBasicDateFormat("%f")
        }, basicDateFormat = function(part) {
            return function(date) {
                return "EXTRACT('" + part + "' FROM " + date + ")";
            };
        }, dateFormats = {
            Year: basicDateFormat("YEAR"),
            Month: basicDateFormat("MONTH"),
            Day: basicDateFormat("DAY"),
            Hour: basicDateFormat("HOUR"),
            Minute: basicDateFormat("MINUTE"),
            Second: function(date) {
                return "FLOOR(" + dateFormats.Totalseconds(date) + ")";
            },
            Fractionalseconds: fractionalSecondsFormat,
            Totalseconds: basicDateFormat("SECOND")
        }, AbstractSQLRules2SQL = exports.AbstractSQLRules2SQL = OMeta._extend({
            NestedIndent: function(indent) {
                var $elf = this, _fromIdx = this.input.idx;
                return indent + "\t";
            },
            SelectQuery: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, fields, from, groupBy, limit, nestedIndent, offset, orderBy, table, tables, where;
                nestedIndent = this._applyWithArgs("NestedIndent", indent);
                tables = [];
                where = "";
                groupBy = "";
                orderBy = "";
                limit = "";
                offset = "";
                this._form(function() {
                    this._applyWithArgs("exactly", "SelectQuery");
                    return this._many(function() {
                        return this._form(function() {
                            return this._or(function() {
                                return fields = this._applyWithArgs("Select", indent);
                            }, function() {
                                table = this._applyWithArgs("Table", indent);
                                return tables.push(table);
                            }, function() {
                                where = this._applyWithArgs("Where", indent);
                                return where = indent + where;
                            }, function() {
                                groupBy = this._applyWithArgs("GroupBy", indent);
                                return groupBy = indent + groupBy;
                            }, function() {
                                orderBy = this._applyWithArgs("OrderBy", indent);
                                return orderBy = indent + orderBy;
                            }, function() {
                                limit = this._applyWithArgs("Limit", indent);
                                return limit = indent + limit;
                            }, function() {
                                offset = this._applyWithArgs("Offset", indent);
                                return offset = indent + offset;
                            });
                        });
                    });
                });
                from = this._or(function() {
                    this._pred(tables.length);
                    return indent + "FROM " + tables.join("," + nestedIndent);
                }, function() {
                    return "";
                });
                return "SELECT " + fields.join(", ") + from + where + groupBy + orderBy + limit + offset;
            },
            DeleteQuery: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, table, tables, where;
                tables = [];
                where = "";
                this._form(function() {
                    this._applyWithArgs("exactly", "DeleteQuery");
                    return this._many(function() {
                        return this._form(function() {
                            return this._or(function() {
                                table = this._applyWithArgs("Table", indent);
                                return tables.push(table);
                            }, function() {
                                where = this._applyWithArgs("Where", indent);
                                return where = indent + where;
                            });
                        });
                    });
                });
                return "DELETE FROM " + tables.join(", ") + where;
            },
            UpsertQuery: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, insert, update;
                this._form(function() {
                    this._applyWithArgs("exactly", "UpsertQuery");
                    insert = this._applyWithArgs("InsertQuery", indent);
                    insert = {
                        query: insert,
                        bindings: this.fieldOrderings
                    };
                    this.fieldOrderings = [];
                    update = this._applyWithArgs("UpdateQuery", indent);
                    return update = {
                        query: update,
                        bindings: this.fieldOrderings
                    };
                });
                return [ insert, update ];
            },
            InsertQuery: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, insert;
                this._form(function() {
                    this._applyWithArgs("exactly", "InsertQuery");
                    return insert = this._applyWithArgs("InsertBody", indent);
                });
                return insert;
            },
            UpdateQuery: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, update;
                this._form(function() {
                    this._applyWithArgs("exactly", "UpdateQuery");
                    return update = this._applyWithArgs("UpdateBody", indent);
                });
                return update;
            },
            InsertBody: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, fields, table, tables, values;
                tables = [];
                this._many(function() {
                    return this._form(function() {
                        return this._or(function() {
                            return fields = this._apply("Fields");
                        }, function() {
                            return values = this._applyWithArgs("Values", indent);
                        }, function() {
                            table = this._applyWithArgs("Table", indent);
                            return tables.push(table);
                        });
                    });
                });
                return this._or(function() {
                    this._pred(fields.length > 0);
                    this._opt(function() {
                        this._pred(_.isArray(values));
                        return values = "VALUES (" + values.join(", ") + ")";
                    });
                    return "INSERT INTO " + tables.join(", ") + " (" + fields.join(", ") + ")" + indent + values;
                }, function() {
                    return "INSERT INTO " + tables.join(", ") + " DEFAULT VALUES";
                });
            },
            UpdateBody: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, fields, nestedIndent, sets, table, tables, values, where;
                tables = [];
                where = "";
                this._many(function() {
                    return this._form(function() {
                        return this._or(function() {
                            fields = this._apply("Fields");
                            return this._pred(fields.length > 0);
                        }, function() {
                            values = this._apply("Values");
                            return this._pred(values.length > 0);
                        }, function() {
                            table = this._applyWithArgs("Table", indent);
                            return tables.push(table);
                        }, function() {
                            where = this._applyWithArgs("Where", indent);
                            return where = indent + where;
                        });
                    });
                });
                sets = [];
                (function() {
                    for (var i = 0; i < fields.length; i++) sets[i] = fields[i] + " = " + values[i];
                }).call(this);
                nestedIndent = this._applyWithArgs("NestedIndent", indent);
                return "UPDATE " + tables.join(", ") + indent + "SET " + sets.join("," + nestedIndent) + where;
            },
            Fields: function() {
                var $elf = this, _fromIdx = this.input.idx, field, fields;
                this._applyWithArgs("exactly", "Fields");
                fields = [];
                this._form(function() {
                    return fields = this._many(function() {
                        field = this.anything();
                        return '"' + field + '"';
                    });
                });
                return fields;
            },
            Values: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, values;
                this._applyWithArgs("exactly", "Values");
                this._or(function() {
                    return values = this._applyWithArgs("SelectQuery", indent);
                }, function() {
                    return this._form(function() {
                        return values = this._many(function() {
                            return this._or(function() {
                                switch (this.anything()) {
                                  case "?":
                                    return "?";

                                  default:
                                    throw this._fail();
                                }
                            }, function() {
                                this._apply("true");
                                return 1;
                            }, function() {
                                this._apply("false");
                                return 0;
                            }, function() {
                                return this._apply("Null");
                            }, function() {
                                return this._apply("Bind");
                            }, function() {
                                return this._apply("Default");
                            }, function() {
                                return this._apply("Text");
                            }, function() {
                                return this._apply("Number");
                            });
                        });
                    });
                });
                return values;
            },
            Default: function() {
                var $elf = this, _fromIdx = this.input.idx;
                this._applyWithArgs("exactly", "Default");
                return "DEFAULT";
            },
            Select: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, as, field, fields, table, value;
                this._applyWithArgs("exactly", "Select");
                this._form(function() {
                    return this._or(function() {
                        this._apply("end");
                        return fields = [ "1" ];
                    }, function() {
                        return fields = this._many(function() {
                            return this._or(function() {
                                this._form(function() {
                                    return field = this._or(function() {
                                        field = this._applyWithArgs("SelectField", indent);
                                        as = this.anything();
                                        return field + ' AS "' + as + '"';
                                    }, function() {
                                        switch (this.anything()) {
                                          case "Count":
                                            this._applyWithArgs("exactly", "*");
                                            return "COUNT(*)";

                                          default:
                                            throw this._fail();
                                        }
                                    }, function() {
                                        table = this.anything();
                                        this._applyWithArgs("exactly", "*");
                                        return '"' + table + '".*';
                                    }, function() {
                                        value = this._applyWithArgs("AnyValue", indent);
                                        as = this.anything();
                                        return value + ' AS "' + as + '"';
                                    });
                                });
                                return field;
                            }, function() {
                                return this._applyWithArgs("AnyValue", indent);
                            }, function() {
                                switch (this.anything()) {
                                  case "*":
                                    return "*";

                                  default:
                                    throw this._fail();
                                }
                            }, function() {
                                return this._apply("Null");
                            });
                        });
                    });
                });
                return fields;
            },
            SelectField: function(indent) {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._apply("Count");
                }, function() {
                    return this._applyWithArgs("AnyValue", indent);
                }, function() {
                    return this._apply("Null");
                });
            },
            Count: function() {
                var $elf = this, _fromIdx = this.input.idx;
                this._form(function() {
                    this._applyWithArgs("exactly", "Count");
                    return this._applyWithArgs("exactly", "*");
                });
                return "COUNT(*)";
            },
            Table: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, alias, from, nestedindent, query, table;
                this._applyWithArgs("exactly", "From");
                nestedindent = this._applyWithArgs("NestedIndent", indent);
                return this._or(function() {
                    this._not(function() {
                        return this._apply("string");
                    });
                    this._form(function() {
                        from = this._or(function() {
                            query = this._applyWithArgs("SelectQuery", nestedindent);
                            return "(" + nestedindent + query + indent + ")";
                        }, function() {
                            table = this.anything();
                            return '"' + table + '"';
                        });
                        return alias = this.anything();
                    });
                    return from + ' AS "' + alias + '"';
                }, function() {
                    query = this._applyWithArgs("SelectQuery", nestedindent);
                    return "(" + nestedindent + query + indent + ")";
                }, function() {
                    table = this.anything();
                    return '"' + table + '"';
                });
            },
            Where: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, ruleBody;
                this._applyWithArgs("exactly", "Where");
                ruleBody = this._applyWithArgs("BooleanValue", indent);
                return "WHERE " + ruleBody;
            },
            GroupBy: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, values;
                this._applyWithArgs("exactly", "GroupBy");
                this._form(function() {
                    return values = this._many1(function() {
                        return this._applyWithArgs("AnyValue", indent);
                    });
                });
                return "GROUP BY " + values.join(", ");
            },
            OrderBy: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, field, nestedIndent, order, orders;
                this._applyWithArgs("exactly", "OrderBy");
                orders = this._many1(function() {
                    this._form(function() {
                        order = function() {
                            switch (this.anything()) {
                              case "ASC":
                                return "ASC";

                              case "DESC":
                                return "DESC";

                              default:
                                throw this._fail();
                            }
                        }.call(this);
                        return field = this._apply("Field");
                    });
                    return field + " " + order;
                });
                nestedIndent = this._applyWithArgs("NestedIndent", indent);
                return "ORDER BY " + orders.join("," + nestedIndent);
            },
            Limit: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, num;
                this._applyWithArgs("exactly", "Limit");
                num = this._applyWithArgs("NumericValue", indent);
                return "LIMIT " + num;
            },
            Offset: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, num;
                this._applyWithArgs("exactly", "Offset");
                num = this._applyWithArgs("NumericValue", indent);
                return "OFFSET " + num;
            },
            AnyValue: function(indent) {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._applyWithArgs("UnknownValue", indent);
                }, function() {
                    return this._applyWithArgs("TextValue", indent);
                }, function() {
                    return this._applyWithArgs("NumericValue", indent);
                }, function() {
                    return this._applyWithArgs("BooleanValue", indent);
                }, function() {
                    return this._applyWithArgs("DateValue", indent);
                }, function() {
                    return this._applyWithArgs("JSONValue", indent);
                }, function() {
                    return this._applyWithArgs("DurationValue", indent);
                });
            },
            UnknownValue: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, nestedIndent, query;
                return this._or(function() {
                    return this._apply("Field");
                }, function() {
                    return this._apply("Bind");
                }, function() {
                    return this._apply("Null");
                }, function() {
                    return this._applyWithArgs("Cast", indent);
                }, function() {
                    nestedIndent = this._applyWithArgs("NestedIndent", indent);
                    query = this._applyWithArgs("SelectQuery", nestedIndent);
                    return "(" + nestedIndent + query + indent + ")";
                });
            },
            Field: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._apply("ReferencedField");
                }, function() {
                    return this._apply("UnreferencedField");
                });
            },
            UnreferencedField: function() {
                var $elf = this, _fromIdx = this.input.idx, field;
                this._form(function() {
                    this._applyWithArgs("exactly", "Field");
                    return field = this.anything();
                });
                return '"' + field + '"';
            },
            ReferencedField: function() {
                var $elf = this, _fromIdx = this.input.idx, field, table;
                this._form(function() {
                    this._applyWithArgs("exactly", "ReferencedField");
                    table = this.anything();
                    return field = this.anything();
                });
                return '"' + table + '"."' + field + '"';
            },
            Bind: function() {
                var $elf = this, _fromIdx = this.input.idx, bind, field, tableName;
                this._form(function() {
                    this._applyWithArgs("exactly", "Bind");
                    return bind = this._or(function() {
                        return this._apply("number");
                    }, function() {
                        tableName = this.anything();
                        field = this.anything();
                        return [ tableName, field ];
                    });
                });
                this.fieldOrderings.push([ "Bind", bind ]);
                return "?";
            },
            Null: function() {
                var $elf = this, _fromIdx = this.input.idx, next;
                next = this.anything();
                this._pred(null === next);
                return "NULL";
            },
            Cast: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, type, v;
                this._form(function() {
                    this._applyWithArgs("exactly", "Cast");
                    v = this._applyWithArgs("AnyValue", indent);
                    return type = this._apply("DataType");
                });
                return "CAST(" + v + " AS " + type + ")";
            },
            DataType: function() {
                var $elf = this, _fromIdx = this.input.idx, dbType, typeName;
                typeName = this.anything();
                this._pred(sbvrTypes[typeName]);
                this._pred(sbvrTypes[typeName].types[this.engine]);
                dbType = sbvrTypes[typeName].types[this.engine];
                return this._or(function() {
                    this._pred(_.isFunction(dbType) || "SERIAL" === dbType.toUpperCase());
                    return "INTEGER";
                }, function() {
                    return dbType;
                });
            },
            TextValue: function(indent) {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._applyWithArgs("UnknownValue", indent);
                }, function() {
                    return this._apply("Text");
                }, function() {
                    return this._applyWithArgs("Concat", indent);
                }, function() {
                    return this._applyWithArgs("Lower", indent);
                }, function() {
                    return this._applyWithArgs("Upper", indent);
                }, function() {
                    return this._applyWithArgs("Trim", indent);
                }, function() {
                    return this._applyWithArgs("Replace", indent);
                }, function() {
                    return this._applyWithArgs("Substring", indent);
                }, function() {
                    return this._applyWithArgs("Right", indent);
                });
            },
            Text: function() {
                var $elf = this, _fromIdx = this.input.idx, text;
                this._form(function() {
                    (function() {
                        switch (this.anything()) {
                          case "Text":
                            return "Text";

                          case "Value":
                            return "Value";

                          default:
                            throw this._fail();
                        }
                    }).call(this);
                    return text = this.anything();
                });
                this.fieldOrderings.push([ "Text", text ]);
                return "?";
            },
            Concat: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, comparators;
                this._form(function() {
                    (function() {
                        switch (this.anything()) {
                          case "Concat":
                            return "Concat";

                          case "Concatenate":
                            return "Concatenate";

                          default:
                            throw this._fail();
                        }
                    }).call(this);
                    return comparators = this._many1(function() {
                        return this._applyWithArgs("TextValue", indent);
                    });
                });
                return this._or(function() {
                    this._pred("mysql" == this.engine);
                    return "CONCAT(" + comparators.join(", ") + ")";
                }, function() {
                    return "(" + comparators.join(" || ") + ")";
                });
            },
            Lower: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, string;
                this._form(function() {
                    this._applyWithArgs("exactly", "Lower");
                    return string = this._applyWithArgs("TextValue", indent);
                });
                return "LOWER(" + string + ")";
            },
            Upper: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, string;
                this._form(function() {
                    this._applyWithArgs("exactly", "Upper");
                    return string = this._applyWithArgs("TextValue", indent);
                });
                return "UPPER(" + string + ")";
            },
            Trim: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, string;
                this._form(function() {
                    this._applyWithArgs("exactly", "Trim");
                    return string = this._applyWithArgs("TextValue", indent);
                });
                return "TRIM(" + string + ")";
            },
            Replace: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, find, replacement, string;
                this._form(function() {
                    this._applyWithArgs("exactly", "Replace");
                    string = this._applyWithArgs("TextValue", indent);
                    find = this._applyWithArgs("TextValue", indent);
                    return replacement = this._applyWithArgs("TextValue", indent);
                });
                return "REPLACE(" + string + ", " + find + ", " + replacement + ")";
            },
            Substring: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, args, string;
                this._form(function() {
                    this._applyWithArgs("exactly", "Substring");
                    string = this._apply("TextValue");
                    return args = this._many1(function() {
                        return this._apply("NumericValue");
                    });
                });
                return "SUBSTRING(" + [ string ].concat(args).join(", ") + ")";
            },
            Right: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, n, string;
                this._form(function() {
                    this._applyWithArgs("exactly", "Right");
                    string = this._apply("TextValue");
                    return n = this._apply("NumericValue");
                });
                return this._or(function() {
                    this._pred("websql" == this.engine);
                    return "SUBSTRING(" + string + ", -" + n + ")";
                }, function() {
                    return "RIGHT(" + string + ", " + n + ")";
                });
            },
            NumericValue: function(indent) {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._applyWithArgs("UnknownValue", indent);
                }, function() {
                    return this._apply("Number");
                }, function() {
                    return this._applyWithArgs("MathOp", indent);
                }, function() {
                    return this._applyWithArgs("BitwiseAnd", indent);
                }, function() {
                    return this._applyWithArgs("BitwiseShiftRight", indent);
                }, function() {
                    return this._applyWithArgs("CharacterLength", indent);
                }, function() {
                    return this._applyWithArgs("StrPos", indent);
                }, function() {
                    return this._applyWithArgs("ExtractNumericDatePart", indent);
                }, function() {
                    return this._applyWithArgs("TotalSeconds", indent);
                }, function() {
                    return this._applyWithArgs("Round", indent);
                }, function() {
                    return this._applyWithArgs("Floor", indent);
                }, function() {
                    return this._applyWithArgs("Ceiling", indent);
                });
            },
            Number: function() {
                var $elf = this, _fromIdx = this.input.idx, number;
                this._form(function() {
                    (function() {
                        switch (this.anything()) {
                          case "Integer":
                            return "Integer";

                          case "Number":
                            return "Number";

                          case "Real":
                            return "Real";

                          default:
                            throw this._fail();
                        }
                    }).call(this);
                    return number = this._apply("number");
                });
                return number;
            },
            MathOp: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, lhs, op, rhs;
                this._form(function() {
                    op = function() {
                        switch (this.anything()) {
                          case "Add":
                            return "+";

                          case "Divide":
                            return "/";

                          case "Multiply":
                            return "*";

                          case "Subtract":
                            return "-";

                          default:
                            throw this._fail();
                        }
                    }.call(this);
                    lhs = this._applyWithArgs("NumericValue", indent);
                    return rhs = this._applyWithArgs("NumericValue", indent);
                });
                return [ lhs, op, rhs ].join(" ");
            },
            BitwiseAnd: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, mask, operand;
                this._form(function() {
                    this._applyWithArgs("exactly", "BitwiseAnd");
                    operand = this._applyWithArgs("NumericValue", indent);
                    return mask = this._applyWithArgs("NumericValue", indent);
                });
                return "(" + operand + " & " + mask + ")";
            },
            BitwiseShiftRight: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, operand, shift;
                this._form(function() {
                    this._applyWithArgs("exactly", "BitwiseShiftRight");
                    operand = this._applyWithArgs("NumericValue", indent);
                    return shift = this._applyWithArgs("NumericValue", indent);
                });
                return "(" + operand + " >> " + shift + ")";
            },
            CharacterLength: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, text;
                this._form(function() {
                    this._applyWithArgs("exactly", "CharacterLength");
                    return text = this._applyWithArgs("TextValue", indent);
                });
                return this._or(function() {
                    this._pred("mysql" == this.engine);
                    return "CHAR_LENGTH(" + text + ")";
                }, function() {
                    return "LENGTH(" + text + ")";
                });
            },
            StrPos: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, haystack, needle;
                this._form(function() {
                    this._applyWithArgs("exactly", "StrPos");
                    haystack = this._apply("TextValue");
                    return needle = this._apply("TextValue");
                });
                return this._or(function() {
                    this._pred("postgres" == this.engine);
                    return "STRPOS(" + haystack + ", " + needle + ")";
                }, function() {
                    return "INSTR(" + haystack + ", " + needle + ")";
                });
            },
            ExtractNumericDatePart: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, date, part;
                this._form(function() {
                    part = function() {
                        switch (this.anything()) {
                          case "Day":
                            return "Day";

                          case "Fractionalseconds":
                            return "Fractionalseconds";

                          case "Hour":
                            return "Hour";

                          case "Minute":
                            return "Minute";

                          case "Month":
                            return "Month";

                          case "Second":
                            return "Second";

                          case "Year":
                            return "Year";

                          default:
                            throw this._fail();
                        }
                    }.call(this);
                    return date = this._apply("DateValue");
                });
                return this._or(function() {
                    this._pred("websql" == this.engine);
                    return websqlDateFormats[part](date);
                }, function() {
                    return dateFormats[part](date);
                });
            },
            TotalSeconds: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, duration;
                this._form(function() {
                    this._applyWithArgs("exactly", "Totalseconds");
                    return duration = this._applyWithArgs("DurationValue", indent);
                });
                return this._or(function() {
                    this._pred("postgres" == this.engine);
                    return "EXTRACT(EPOCH FROM " + duration + ")";
                }, function() {
                    this._pred("mysql" == this.engine);
                    return "(TIMESTAMPDIFF(MICROSECOND, FROM_UNIXTIME(0), FROM_UNIXTIME(0) + " + duration + ") / 1000000)";
                }, function() {
                    return function() {
                        throw new Error("TotalSeconds not supported on: " + this.engine);
                    }.call(this);
                });
            },
            Round: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, num;
                this._form(function() {
                    this._applyWithArgs("exactly", "Round");
                    return num = this._apply("NumericValue");
                });
                return "ROUND(" + num + ")";
            },
            Floor: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, num;
                this._form(function() {
                    this._applyWithArgs("exactly", "Floor");
                    return num = this._apply("NumericValue");
                });
                return "FLOOR(" + num + ")";
            },
            Ceiling: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, num;
                this._form(function() {
                    this._applyWithArgs("exactly", "Ceiling");
                    return num = this._apply("NumericValue");
                });
                return "CEILING(" + num + ")";
            },
            BooleanValue: function(indent) {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._applyWithArgs("UnknownValue", indent);
                }, function() {
                    return this._apply("Boolean");
                }, function() {
                    return this._applyWithArgs("And", indent);
                }, function() {
                    return this._applyWithArgs("Not", indent);
                }, function() {
                    return this._applyWithArgs("Or", indent);
                }, function() {
                    return this._applyWithArgs("Exists", indent);
                }, function() {
                    return this._applyWithArgs("NotExists", indent);
                }, function() {
                    return this._applyWithArgs("Comparison", indent);
                }, function() {
                    return this._applyWithArgs("Between", indent);
                }, function() {
                    return this._applyWithArgs("In", indent);
                }, function() {
                    return this._applyWithArgs("NotIn", indent);
                });
            },
            Boolean: function() {
                var $elf = this, _fromIdx = this.input.idx, bool;
                this._form(function() {
                    this._applyWithArgs("exactly", "Boolean");
                    return bool = this._or(function() {
                        this._apply("true");
                        return 1;
                    }, function() {
                        this._apply("false");
                        return 0;
                    });
                });
                return bool;
            },
            Not: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, bool, nestedIndent;
                this._form(function() {
                    this._applyWithArgs("exactly", "Not");
                    nestedIndent = this._applyWithArgs("NestedIndent", indent);
                    return bool = this._applyWithArgs("BooleanValue", nestedIndent);
                });
                return "NOT (" + nestedIndent + bool + indent + ")";
            },
            And: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, bools;
                this._form(function() {
                    this._applyWithArgs("exactly", "And");
                    return bools = this._many(function() {
                        return this._applyWithArgs("BooleanValue", indent);
                    });
                });
                return bools.join(indent + "AND ");
            },
            Or: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, bools;
                this._form(function() {
                    this._applyWithArgs("exactly", "Or");
                    return bools = this._many(function() {
                        return this._applyWithArgs("BooleanValue", indent);
                    });
                });
                return "(" + bools.join(indent + "OR ") + ")";
            },
            Exists: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, comparator, exists, nestedIndent, ruleBody;
                this._form(function() {
                    this._applyWithArgs("exactly", "Exists");
                    return exists = this._or(function() {
                        nestedIndent = this._applyWithArgs("NestedIndent", indent);
                        ruleBody = this._applyWithArgs("SelectQuery", nestedIndent);
                        return "EXISTS (" + nestedIndent + ruleBody + indent + ")";
                    }, function() {
                        comparator = this._applyWithArgs("AnyValue", indent);
                        return comparator + " IS NOT NULL";
                    });
                });
                return exists;
            },
            NotExists: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, comparator, exists, nestedIndent, ruleBody;
                this._form(function() {
                    this._applyWithArgs("exactly", "NotExists");
                    return exists = this._or(function() {
                        nestedIndent = this._applyWithArgs("NestedIndent", indent);
                        ruleBody = this._applyWithArgs("SelectQuery", nestedIndent);
                        return "NOT EXISTS (" + nestedIndent + ruleBody + indent + ")";
                    }, function() {
                        comparator = this._applyWithArgs("AnyValue", indent);
                        return comparator + " IS NULL";
                    });
                });
                return exists;
            },
            Comparison: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, a, b, comparison;
                this._form(function() {
                    comparison = function() {
                        switch (this.anything()) {
                          case "Equals":
                            return "Equals";

                          case "GreaterThan":
                            return "GreaterThan";

                          case "GreaterThanOrEqual":
                            return "GreaterThanOrEqual";

                          case "LessThan":
                            return "LessThan";

                          case "LessThanOrEqual":
                            return "LessThanOrEqual";

                          case "Like":
                            return "Like";

                          case "NotEquals":
                            return "NotEquals";

                          default:
                            throw this._fail();
                        }
                    }.call(this);
                    a = this._applyWithArgs("AnyValue", indent);
                    return b = this._applyWithArgs("AnyValue", indent);
                });
                return a + comparisons[comparison] + b;
            },
            Between: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, a, b, val;
                this._form(function() {
                    this._applyWithArgs("exactly", "Between");
                    val = this._applyWithArgs("AnyValue", indent);
                    a = this._applyWithArgs("AnyValue", indent);
                    return b = this._applyWithArgs("AnyValue", indent);
                });
                return val + " BETWEEN " + a + " AND " + b;
            },
            In: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, field, vals;
                this._form(function() {
                    this._applyWithArgs("exactly", "In");
                    field = this._apply("Field");
                    return vals = this._many1(function() {
                        return this._applyWithArgs("AnyValue", indent);
                    });
                });
                return field + " IN (" + vals.join(", ") + ")";
            },
            NotIn: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, field, vals;
                this._form(function() {
                    this._applyWithArgs("exactly", "NotIn");
                    field = this._apply("Field");
                    return vals = this._many1(function() {
                        return this._applyWithArgs("AnyValue", indent);
                    });
                });
                return field + " NOT IN (" + vals.join(", ") + ")";
            },
            DateValue: function(indent) {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._applyWithArgs("UnknownValue", indent);
                }, function() {
                    return this._applyWithArgs("Date", indent);
                }, function() {
                    return this._applyWithArgs("ToDate", indent);
                }, function() {
                    return this._applyWithArgs("ToTime", indent);
                }, function() {
                    return this._applyWithArgs("Now", indent);
                });
            },
            Date: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, date;
                this._form(function() {
                    this._applyWithArgs("exactly", "Date");
                    return date = this.anything();
                });
                this.fieldOrderings.push([ "Date", date ]);
                return "?";
            },
            ToDate: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, date;
                this._form(function() {
                    this._applyWithArgs("exactly", "ToDate");
                    return date = this._apply("DateValue");
                });
                return "DATE(" + date + ")";
            },
            ToTime: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, date;
                this._form(function() {
                    this._applyWithArgs("exactly", "ToTime");
                    return date = this._apply("DateValue");
                });
                return this._or(function() {
                    this._pred("postgres" == this.engine);
                    return "CAST(" + date + " AS TIME)";
                }, function() {
                    return "TIME(" + date + ")";
                });
            },
            Now: function(indent) {
                var $elf = this, _fromIdx = this.input.idx;
                this._form(function() {
                    return this._applyWithArgs("exactly", "Now");
                });
                return "CURRENT_TIMESTAMP";
            },
            JSONValue: function(indent) {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._applyWithArgs("UnknownValue", indent);
                }, function() {
                    return this._applyWithArgs("AggregateJSON", indent);
                });
            },
            AggregateJSON: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, field, table;
                this._form(function() {
                    this._applyWithArgs("exactly", "AggregateJSON");
                    return this._form(function() {
                        table = this.anything();
                        return field = this._or(function() {
                            switch (this.anything()) {
                              case "*":
                                return "*";

                              default:
                                throw this._fail();
                            }
                        }, function() {
                            field = this.anything();
                            return '"' + field + '"';
                        });
                    });
                });
                field = '"' + table + '".' + field;
                return this._or(function() {
                    this._pred("postgres" == this.engine);
                    return "coalesce(array_to_json(array_agg(" + field + ")), '[]')";
                }, function() {
                    return function() {
                        throw new Error("AggregateJSON not supported on: " + this.engine);
                    }.call(this);
                });
            },
            DurationValue: function(indent) {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._applyWithArgs("UnknownValue", indent);
                }, function() {
                    return this._applyWithArgs("Duration", indent);
                });
            },
            Duration: function(indent) {
                var $elf = this, _fromIdx = this.input.idx, duration;
                this._form(function() {
                    this._applyWithArgs("exactly", "Duration");
                    return duration = this.anything();
                });
                this._pred(_.isObject(duration));
                duration = _(duration).pick("negative", "day", "hour", "minute", "second").omitBy(_.isNil).value();
                this._pred(!_(duration).omit("negative").isEmpty());
                return this._or(function() {
                    this._pred("websql" == this.engine);
                    return function() {
                        throw new Error("Durations not supported on: " + this.engine);
                    }.call(this);
                }, function() {
                    return "INTERVAL '" + (duration.negative ? "-" : "") + (duration.day || "0") + " " + (duration.negative ? "-" : "") + (duration.hour || "0") + ":" + (duration.minute || "0") + ":" + Number(duration.second).toLocaleString("en", {
                        minimumFractionDigits: 1
                    }) + "'" + ("mysql" == this.engine ? " DAY_MICROSECOND" : "");
                });
            },
            Process: function() {
                var $elf = this, _fromIdx = this.input.idx, query, value;
                return this._or(function() {
                    this.fieldOrderings = [];
                    query = this._or(function() {
                        return this._applyWithArgs("SelectQuery", "\n");
                    }, function() {
                        return this._applyWithArgs("InsertQuery", "\n");
                    }, function() {
                        return this._applyWithArgs("UpdateQuery", "\n");
                    }, function() {
                        return this._applyWithArgs("DeleteQuery", "\n");
                    });
                    return {
                        query: query,
                        bindings: this.fieldOrderings
                    };
                }, function() {
                    return this._applyWithArgs("UpsertQuery", "\n");
                }, function() {
                    value = this._applyWithArgs("AnyValue", "\n");
                    return "SELECT " + value + ' AS "result";';
                });
            }
        });
    });
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    (function() {
        var hasProp = {}.hasOwnProperty;
        !function(root, factory) {
            return !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(4), __webpack_require__(2) ], 
            __WEBPACK_AMD_DEFINE_RESULT__ = function(_, Promise) {
                return root.SBVRTypes = factory(_, Promise);
            }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        }(this, function(_, Promise) {
            var TypeUtils;
            TypeUtils = function() {
                var equality;
                equality = function(from, to) {
                    return [ "Equals", from, to ];
                };
                return {
                    nativeFactTypeTemplates: {
                        equality: {
                            "is equal to": equality,
                            equals: equality
                        },
                        comparison: {
                            "is greater than": function(from, to) {
                                return [ "GreaterThan", from, to ];
                            },
                            "is greater than or equal to": function(from, to) {
                                return [ "GreaterThanOrEqual", from, to ];
                            },
                            "is less than": function(from, to) {
                                return [ "LessThan", from, to ];
                            },
                            "is less than or equal to": function(from, to) {
                                return [ "LessThanOrEqual", from, to ];
                            },
                            "is equal to": equality,
                            equals: equality
                        }
                    },
                    validate: {
                        integer: function(value, required, callback) {
                            var processedValue;
                            processedValue = parseInt(value, 10);
                            return _.isNaN(processedValue) ? callback("is not a number: " + value) : callback(null, processedValue);
                        },
                        text: function(length) {
                            return function(value, required, callback) {
                                return _.isString(value) ? null != length && value.length > length ? callback("longer than " + length + " characters (" + value.length + ")") : callback(null, value) : callback("is not a string: " + value);
                            };
                        },
                        date: function(value, required, callback) {
                            var processedValue;
                            processedValue = Number(value);
                            _.isNaN(processedValue) && (processedValue = value);
                            processedValue = new Date(processedValue);
                            return _.isNaN(processedValue.getTime()) ? callback("is not a valid date: " + value) : callback(null, processedValue);
                        }
                    }
                };
            }();
            return {
                Boolean: function() {
                    var typeFunc;
                    typeFunc = function(necessity, index, defaultValue) {
                        null == defaultValue && (defaultValue = " DEFAULT 0");
                        return "INTEGER" + defaultValue + necessity + index;
                    };
                    return {
                        types: {
                            postgres: typeFunc,
                            mysql: typeFunc,
                            websql: typeFunc,
                            odata: {
                                name: "Edm.Boolean"
                            }
                        },
                        fetchProcessing: function(data, callback) {
                            return callback(null, 1 === data);
                        },
                        validate: function(originalValue, required, callback) {
                            var value;
                            value = Number(originalValue);
                            return _.isNaN(value) || 0 !== value && 1 !== value ? callback("is not a boolean: " + JSON.stringify(originalValue) + " (" + typeof originalValue + ")") : callback(null, value);
                        }
                    };
                }(),
                Color: {
                    types: {
                        postgres: "INTEGER",
                        mysql: "INTEGER",
                        websql: "INTEGER",
                        odata: {
                            name: "Self.Color",
                            complexType: '<ComplexType Name="Color">\n\t <Property Name="r" Nullable="false" Type="Edm.Int8"/><Property Name="g" Nullable="false" Type="Edm.Int8"/><Property Name="b" Nullable="false" Type="Edm.Int8"/><Property Name="a" Nullable="false" Type="Edm.Int8"/></ComplexType>'
                        }
                    },
                    nativeProperties: {
                        has: {
                            "Red Component": function(from) {
                                return [ "BitwiseAnd", [ "BitwiseShiftRight", from, 16 ], 255 ];
                            },
                            "Green Component": function(from) {
                                return [ "BitwiseAnd", [ "BitwiseShiftRight", from, 8 ], 255 ];
                            },
                            "Blue Component": function(from) {
                                return [ "BitwiseShiftRight", from, 255 ];
                            },
                            "Alpha Component": function(from) {
                                return [ "BitwiseAnd", [ "BitwiseShiftRight", from, 24 ], 255 ];
                            }
                        }
                    },
                    fetchProcessing: function(data, callback) {
                        return callback(null, {
                            r: data >> 16 & 255,
                            g: data >> 8 & 255,
                            b: 255 & data,
                            a: data >> 24 & 255
                        });
                    },
                    validate: function(value, required, callback) {
                        var component, componentValue, processedValue;
                        if (_.isObject(value)) {
                            processedValue = 0;
                            for (component in value) if (hasProp.call(value, component)) {
                                componentValue = value[component];
                                if (_.isNaN(componentValue) || componentValue > 255) {
                                    callback("has invalid component value of " + componentValue + " for component " + component);
                                    return;
                                }
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
                                    callback("has an unknown component: " + component);
                                    return;
                                }
                            }
                        } else {
                            processedValue = parseInt(value, 10);
                            if (_.isNaN(processedValue)) {
                                callback("is neither an integer or color object: " + value);
                                return;
                            }
                        }
                        return callback(null, processedValue);
                    }
                },
                ConceptType: {
                    types: {
                        postgres: "INTEGER",
                        mysql: "INTEGER",
                        websql: "INTEGER",
                        odata: {
                            name: "Edm.Int64"
                        }
                    },
                    nativeFactTypes: {
                        Integer: TypeUtils.nativeFactTypeTemplates.comparison,
                        Real: TypeUtils.nativeFactTypeTemplates.comparison
                    },
                    validate: TypeUtils.validate.integer
                },
                "Date Time": {
                    types: {
                        postgres: "TIMESTAMP",
                        mysql: "TIMESTAMP",
                        websql: "INTEGER",
                        odata: {
                            name: "Edm.DateTime"
                        }
                    },
                    fetchProcessing: function(data, callback) {
                        null != data && (data = new Date(data));
                        return callback(null, data);
                    },
                    validate: TypeUtils.validate.date
                },
                Date: {
                    types: {
                        postgres: "DATE",
                        mysql: "DATE",
                        websql: "INTEGER",
                        odata: {
                            name: "Edm.DateTime"
                        }
                    },
                    fetchProcessing: function(data, callback) {
                        null != data && (data = new Date(data));
                        return callback(null, data);
                    },
                    validate: TypeUtils.validate.date
                },
                File: {
                    types: {
                        postgres: "BYTEA",
                        mysql: "BLOB",
                        websql: "BLOB",
                        odata: {
                            name: "Edm.String"
                        }
                    },
                    validate: function(value, required, callback) {
                        var e, error;
                        if (Buffer.isBuffer(value)) return callback(null, value);
                        if (_.isString(value)) {
                            try {
                                value = new Buffer(value, "hex");
                            } catch (error) {
                                e = error;
                                callback("could not be converted to binary: " + e.message);
                                return;
                            }
                            return callback(null, value);
                        }
                        return callback("could not be converted to binary: " + typeof value);
                    }
                },
                ForeignKey: {
                    types: {
                        postgres: "INTEGER",
                        mysql: "INTEGER",
                        websql: "INTEGER",
                        odata: {
                            name: "Edm.Int64"
                        }
                    },
                    nativeFactTypes: {
                        Integer: TypeUtils.nativeFactTypeTemplates.comparison,
                        Real: TypeUtils.nativeFactTypeTemplates.comparison
                    },
                    validate: TypeUtils.validate.integer
                },
                Hashed: function() {
                    var bcrypt, error;
                    try {
                        bcrypt = __webpack_require__(37);
                    } catch (error) {
                        bcrypt = __webpack_require__(38);
                    }
                    bcrypt = Promise.promisifyAll(bcrypt);
                    return {
                        types: {
                            postgres: "CHAR(60)",
                            mysql: "CHAR(60)",
                            websql: "CHAR(60)",
                            odata: {
                                name: "Edm.String"
                            }
                        },
                        validate: function(value, required, callback) {
                            return _.isString(value) ? bcrypt.genSaltAsync().then(function(salt) {
                                return bcrypt.hashAsync(value, salt);
                            }).asCallback(callback) : callback("is not a string");
                        },
                        compare: _.bind(bcrypt.compareAsync, bcrypt)
                    };
                }(),
                Integer: {
                    types: {
                        postgres: "INTEGER",
                        mysql: "INTEGER",
                        websql: "INTEGER",
                        odata: {
                            name: "Edm.Int64"
                        }
                    },
                    nativeFactTypes: {
                        Integer: TypeUtils.nativeFactTypeTemplates.comparison,
                        Real: TypeUtils.nativeFactTypeTemplates.comparison
                    },
                    validate: TypeUtils.validate.integer
                },
                Interval: {
                    types: {
                        postgres: "INTERVAL",
                        mysql: "INTEGER",
                        websql: "INTEGER",
                        odata: {
                            name: "Edm.Int64"
                        }
                    },
                    validate: TypeUtils.validate.integer
                },
                JSON: {
                    types: {
                        postgres: "TEXT",
                        mysql: "TEXT",
                        websql: "TEXT",
                        odata: {
                            name: "Edm.String"
                        }
                    },
                    fetchProcessing: function(data, callback) {
                        var e, error;
                        try {
                            return callback(null, JSON.parse(data));
                        } catch (error) {
                            e = error;
                            return callback(e);
                        }
                    },
                    validate: function(value, required, callback) {
                        var e, error;
                        try {
                            return callback(null, JSON.stringify(value));
                        } catch (error) {
                            e = error;
                            console.error(e);
                            return callback("cannot be turned into JSON: " + value);
                        }
                    }
                },
                Real: {
                    types: {
                        postgres: "REAL",
                        mysql: "REAL",
                        websql: "REAL",
                        odata: {
                            name: "Edm.Double"
                        }
                    },
                    nativeFactTypes: {
                        Integer: TypeUtils.nativeFactTypeTemplates.comparison,
                        Real: TypeUtils.nativeFactTypeTemplates.comparison
                    },
                    validate: function(value, required, callback) {
                        var processedValue;
                        processedValue = parseFloat(value);
                        return _.isNaN(processedValue) ? callback("is not a number: " + value) : callback(null, processedValue);
                    }
                },
                Serial: {
                    types: {
                        postgres: "SERIAL",
                        mysql: function(necessity, index, defaultValue) {
                            null == defaultValue && (defaultValue = "");
                            return "INTEGER" + defaultValue + necessity + index + " AUTO_INCREMENT";
                        },
                        websql: function(necessity, index, defaultValue) {
                            null == defaultValue && (defaultValue = "");
                            return "INTEGER" + defaultValue + necessity + index + " AUTOINCREMENT";
                        },
                        odata: {
                            name: "Edm.Int64"
                        }
                    },
                    validate: TypeUtils.validate.integer
                },
                "Short Text": {
                    types: {
                        postgres: "VARCHAR(255)",
                        mysql: "VARCHAR(255)",
                        websql: "VARCHAR(255)",
                        odata: {
                            name: "Edm.String"
                        }
                    },
                    validate: TypeUtils.validate.text(255)
                },
                Text: {
                    types: {
                        postgres: "TEXT",
                        mysql: "TEXT",
                        websql: "TEXT",
                        odata: {
                            name: "Edm.String"
                        }
                    },
                    nativeProperties: {
                        has: {
                            Length: function(from) {
                                return [ "CharacterLength", from ];
                            }
                        }
                    },
                    nativeFactTypes: {
                        Text: TypeUtils.nativeFactTypeTemplates.equality
                    },
                    validate: TypeUtils.validate.text()
                },
                Time: {
                    types: {
                        postgres: "TIME",
                        mysql: "TIME",
                        websql: "TEXT",
                        odata: {
                            name: "Edm.DateTime"
                        }
                    },
                    fetchProcessing: function(data, callback) {
                        null != data && (data = new Date("Thu, 01 Jan 1970 " + data));
                        return callback(null, data);
                    },
                    validate: function(value, required, callback) {
                        return TypeUtils.validate.date(value, required, function(err, value) {
                            if (!err) return callback(null, value.toLocaleTimeString());
                            callback(err);
                        });
                    }
                }
            };
        });
    }).call(this);
}, function(module, exports) {
    module.exports = require("bcrypt");
}, function(module, exports) {
    module.exports = require("bcryptjs");
}, function(module, exports) {
    module.exports = require("pinejs-client/core");
}, function(module, exports, __webpack_require__) {
    var SBVRParser, Types;
    SBVRParser = __webpack_require__(41).SBVRParser;
    Types = __webpack_require__(43);
    module.exports = SBVRParser._extend({
        initialize: function() {
            SBVRParser.initialize.call(this);
            this.AddCustomAttribute("Database ID Field:");
            this.AddCustomAttribute("Database Table Name:");
            this.AddBuiltInVocab(Types);
            return this;
        }
    });
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !function(root, factory) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__, exports, __webpack_require__(28), __webpack_require__(30), __webpack_require__(4), __webpack_require__(42) ], 
        __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof __WEBPACK_AMD_DEFINE_FACTORY__ ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, 
        void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }(this, function(require, exports, OMeta) {
        var SBVRLibs = __webpack_require__(30).SBVRLibs, _ = __webpack_require__(4);
        __webpack_require__(42);
        var SBVRParser = exports.SBVRParser = SBVRLibs._extend({
            EOL: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return function() {
                    switch (this.anything()) {
                      case "\n":
                        return "\n";

                      case "\r":
                        return this._opt(function() {
                            return this._applyWithArgs("exactly", "\n");
                        });

                      default:
                        throw this._fail();
                    }
                }.call(this);
            },
            EOLSpaces: function() {
                var $elf = this, _fromIdx = this.input.idx, eol;
                eol = !1;
                this._many(function() {
                    return this._or(function() {
                        this._apply("EOL");
                        return eol = !0;
                    }, function() {
                        return this._apply("space");
                    });
                });
                return this._pred(eol);
            },
            IdentifierKey: function(identifier) {
                var $elf = this, _fromIdx = this.input.idx, index;
                index = this._or(function() {
                    this._pred(_.isArray(identifier[3]));
                    this._pred("Number" == identifier[3][0]);
                    return identifier[3][1];
                }, function() {
                    return "";
                });
                return identifier[1] + "|" + identifier[2] + "|" + index;
            },
            Bind: function(identifier, bindings) {
                var $elf = this, _fromIdx = this.input.idx, binding, identifierKey, varNumber;
                identifierKey = this._applyWithArgs("IdentifierKey", identifier);
                varNumber = this.ruleVars[identifierKey];
                this._pred(null != varNumber);
                binding = [ "RoleBinding", identifier, varNumber ];
                this._opt(function() {
                    this._pred(bindings);
                    return bindings.push(binding);
                });
                return binding;
            },
            spaces: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._many(function() {
                    this._not(function() {
                        return this._apply("EOL");
                    });
                    return this._apply("space");
                });
            },
            Number: function() {
                var $elf = this, _fromIdx = this.input.idx, n;
                return this._or(function() {
                    this._apply("spaces");
                    n = this._consumedBy(function() {
                        return this._many1(function() {
                            return this._apply("digit");
                        });
                    });
                    return [ "Number", parseInt(n, 10) ];
                }, function() {
                    this._applyWithArgs("token", "one");
                    return [ "Number", 1 ];
                });
            },
            Real: function() {
                var $elf = this, _fromIdx = this.input.idx, n;
                this._apply("spaces");
                n = this._consumedBy(function() {
                    this._many1(function() {
                        return this._apply("digit");
                    });
                    this._applyWithArgs("exactly", ".");
                    return this._many1(function() {
                        return this._apply("digit");
                    });
                });
                return [ "Real", Number(n) ];
            },
            Integer: function() {
                var $elf = this, _fromIdx = this.input.idx, n;
                this._apply("spaces");
                n = this._consumedBy(function() {
                    return this._many1(function() {
                        return this._apply("digit");
                    });
                });
                return [ "Integer", Number(n) ];
            },
            Text: function() {
                var $elf = this, _fromIdx = this.input.idx, text;
                this._apply("spaces");
                this._applyWithArgs("exactly", '"');
                text = this._consumedBy(function() {
                    return this._many1(function() {
                        return this._or(function() {
                            switch (this.anything()) {
                              case "\\":
                                return this._applyWithArgs("exactly", '"');

                              default:
                                throw this._fail();
                            }
                        }, function() {
                            this._not(function() {
                                return this._applyWithArgs("exactly", '"');
                            });
                            return this.anything();
                        });
                    });
                });
                this._applyWithArgs("exactly", '"');
                return [ "Text", text ];
            },
            Value: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._apply("Real");
                }, function() {
                    return this._apply("Integer");
                }, function() {
                    return this._apply("Text");
                });
            },
            toSBVREOL: function() {
                var $elf = this, _fromIdx = this.input.idx;
                this._apply("spaces");
                return this._consumedBy(function() {
                    return this._many(function() {
                        this._apply("spaces");
                        return this._or(function() {
                            return this._apply("InformalIdentifier");
                        }, function() {
                            switch (this.anything()) {
                              case "'":
                                this._apply("InformalIdentifier");
                                return this._applyWithArgs("exactly", "'");

                              default:
                                throw this._fail();
                            }
                        }, function() {
                            return this._many1(function() {
                                this._not(function() {
                                    return this._apply("space");
                                });
                                return this.anything();
                            });
                        });
                    });
                });
            },
            toEOL: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._consumedBy(function() {
                    return this._many(function() {
                        this._not(function() {
                            return this._apply("EOL");
                        });
                        return this.anything();
                    });
                });
            },
            token: function(x) {
                var $elf = this, _fromIdx = this.input.idx, s;
                this._apply("spaces");
                s = this._applyWithArgs("seq", x);
                this._lookahead(function() {
                    return this._or(function() {
                        return this._apply("space");
                    }, function() {
                        return this._apply("end");
                    });
                });
                return s;
            },
            AddIdentifier: function(identifierType, baseSynonym) {
                var $elf = this, _fromIdx = this.input.idx, identifier, startInput;
                startInput = this.input;
                identifier = this._many1(function() {
                    return this._apply("IdentifierPart");
                });
                identifier = identifier.join(" ");
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
                this._opt(function() {
                    return this._not(function() {
                        return term = this._consumedBy(function() {
                            return this._opt(function() {
                                return this._applyWithArgs("Term", factTypeSoFar);
                            });
                        });
                    });
                });
                this._opt(function() {
                    return this._not(function() {
                        return name = this._consumedBy(function() {
                            return this._opt(function() {
                                return this._applyWithArgs("Name", factTypeSoFar);
                            });
                        });
                    });
                });
                return this._or(function() {
                    this._pred(term || name);
                    return this._or(function() {
                        this._pred(term.length > name.length);
                        return this._applyWithArgs("Term", factTypeSoFar);
                    }, function() {
                        return this._applyWithArgs("Name", factTypeSoFar);
                    });
                }, function() {
                    this._pred(!noAutoComplete);
                    return this._or(function() {
                        return this._applyWithArgs("Term", factTypeSoFar);
                    }, function() {
                        return this._applyWithArgs("Name", factTypeSoFar);
                    });
                });
            },
            Vocabulary: function() {
                var $elf = this, _fromIdx = this.input.idx, vocabulary;
                vocabulary = this._apply("FindVocabulary");
                return [ "Vocabulary", vocabulary ];
            },
            Name: function(factTypeSoFar) {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("FindIdentifier", "Name", factTypeSoFar);
            },
            Term: function(factTypeSoFar) {
                var $elf = this, _fromIdx = this.input.idx, n, term;
                term = this._applyWithArgs("FindIdentifier", "Term", factTypeSoFar);
                this._opt(function() {
                    n = this._consumedBy(function() {
                        return this._many1(function() {
                            return this._apply("digit");
                        });
                    });
                    return term.push([ "Number", Number(n) ]);
                });
                return term;
            },
            FindIdentifier: function(identifierType, factTypeSoFar) {
                var $elf = this, _fromIdx = this.input.idx, identifier, quote;
                this._apply("spaces");
                quote = this._opt(function() {
                    return this._applyWithArgs("exactly", "'");
                });
                identifier = this._applyWithArgs("FindIdentifierNest", identifierType, factTypeSoFar);
                this._or(function() {
                    return this._pred(!quote);
                }, function() {
                    return this._applyWithArgs("seq", quote);
                });
                return identifier;
            },
            FindIdentifierNest: function(identifierType, factTypeSoFar, identifierSoFar) {
                var $elf = this, _fromIdx = this.input.idx, identifierSoFar, part, vocabulary;
                part = this._apply("IdentifierPart");
                identifierSoFar = this._or(function() {
                    this._pred(identifierSoFar);
                    return identifierSoFar + " " + part;
                }, function() {
                    return part;
                });
                this._pred(identifierSoFar.length <= this.longestIdentifier[identifierType]);
                return this._or(function() {
                    return this._applyWithArgs("FindIdentifierNest", identifierType, factTypeSoFar, identifierSoFar);
                }, function() {
                    vocabulary = this._or(function() {
                        return this._applyWithArgs("FindVocabulary", identifierSoFar);
                    }, function() {
                        return this.currentVocabulary;
                    });
                    return this._applyWithArgs("IsFactTypeIdentifier", [ identifierType, identifierSoFar, vocabulary ], factTypeSoFar);
                });
            },
            FindVocabulary: function(identifier) {
                var $elf = this, _fromIdx = this.input.idx, bracket, vocabulary;
                this._apply("spaces");
                bracket = this._opt(function() {
                    return this._applyWithArgs("exactly", "(");
                });
                vocabulary = this._apply("FindVocabularyNest");
                this._pred(!identifier || this.vocabularies[vocabulary].IdentifierChildren.hasOwnProperty(identifier));
                this._or(function() {
                    return this._pred(!bracket);
                }, function() {
                    switch (this.anything()) {
                      case ")":
                        return ")";

                      default:
                        throw this._fail();
                    }
                });
                return vocabulary;
            },
            FindVocabularyNest: function(vocabularySoFar) {
                var $elf = this, _fromIdx = this.input.idx, part, vocabularySoFar;
                part = this._apply("IdentifierPart");
                vocabularySoFar = this._or(function() {
                    this._pred(vocabularySoFar);
                    return vocabularySoFar + " " + part;
                }, function() {
                    return part;
                });
                this._pred(vocabularySoFar.length <= this.longestIdentifier.Vocabulary);
                return this._or(function() {
                    return this._applyWithArgs("FindVocabularyNest", vocabularySoFar);
                }, function() {
                    this._pred(this.vocabularies.hasOwnProperty(vocabularySoFar));
                    return vocabularySoFar;
                });
            },
            IdentifierPart: function() {
                var $elf = this, _fromIdx = this.input.idx;
                this._apply("spaces");
                return this._consumedBy(function() {
                    return this._many1(function() {
                        return this._or(function() {
                            return this._apply("letter");
                        }, function() {
                            switch (this.anything()) {
                              case "-":
                                return "-";

                              default:
                                throw this._fail();
                            }
                        });
                    });
                });
            },
            addVerb: function() {
                var $elf = this, _fromIdx = this.input.idx;
                this._apply("ClearSuggestions");
                return this._applyWithArgs("Verb", !0);
            },
            Verb: function(factTypeSoFar) {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("FindVerb", factTypeSoFar);
            },
            FindVerb: function(factTypeSoFar, verbSoFar, negated) {
                var $elf = this, _fromIdx = this.input.idx, negated, part, verb, verbSoFar;
                this._opt(function() {
                    this._pred(factTypeSoFar && !verbSoFar);
                    this._or(function() {
                        return this._applyWithArgs("Keyword", "isn't");
                    }, function() {
                        return this._applyWithArgs("Keyword", "aren't");
                    });
                    verbSoFar = "is";
                    return negated = !0;
                });
                part = this._apply("VerbPart");
                verbSoFar = this._or(function() {
                    this._pred(verbSoFar);
                    return verbSoFar + " " + part;
                }, function() {
                    return this._verbForm(part);
                });
                this._opt(function() {
                    this._pred(factTypeSoFar && "is" === verbSoFar);
                    this._apply("spaces");
                    this._applyWithArgs("Keyword", "not");
                    return negated = !0;
                });
                return this._or(function() {
                    return this._applyWithArgs("FindVerb", factTypeSoFar, verbSoFar, negated);
                }, function() {
                    this._or(function() {
                        return this._pred(factTypeSoFar === !0);
                    }, function() {
                        return this._applyWithArgs("IsVerb", factTypeSoFar, verbSoFar);
                    });
                    verb = [ "Verb", verbSoFar ];
                    this._or(function() {
                        this._pred(negated);
                        return verb.push(!0);
                    }, function() {
                        return verb.push(!1);
                    });
                    return verb;
                });
            },
            VerbPart: function() {
                var $elf = this, _fromIdx = this.input.idx;
                this._apply("spaces");
                this._not(function() {
                    return this._apply("Identifier");
                });
                return this._apply("IdentifierPart");
            },
            JoiningQuantifier: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("matchForAll", "Keyword", [ "and", "at", "most" ]);
            },
            Quantifier: function() {
                var $elf = this, _fromIdx = this.input.idx, m, n;
                return this._or(function() {
                    this._applyWithArgs("Keyword", "each");
                    return [ "UniversalQuantification" ];
                }, function() {
                    this._applyWithArgs("matchForAny", "Keyword", [ "a", "an", "some" ]);
                    return [ "ExistentialQuantification" ];
                }, function() {
                    this._applyWithArgs("matchForAll", "Keyword", [ "at", "most" ]);
                    n = this._apply("Number");
                    return [ "AtMostNQuantification", [ "MaximumCardinality", n ] ];
                }, function() {
                    this._applyWithArgs("matchForAll", "Keyword", [ "at", "least" ]);
                    n = this._apply("Number");
                    return this._or(function() {
                        this._apply("JoiningQuantifier");
                        m = this._apply("Number");
                        return [ "NumericalRangeQuantification", [ "MinimumCardinality", n ], [ "MaximumCardinality", m ] ];
                    }, function() {
                        return [ "AtLeastNQuantification", [ "MinimumCardinality", n ] ];
                    });
                }, function() {
                    this._applyWithArgs("matchForAll", "Keyword", [ "more", "than" ]);
                    n = this._apply("Number");
                    ++n[1];
                    return [ "AtLeastNQuantification", [ "MinimumCardinality", n ] ];
                }, function() {
                    this._applyWithArgs("Keyword", "exactly");
                    n = this._apply("Number");
                    return [ "ExactQuantification", [ "Cardinality", n ] ];
                }, function() {
                    this._applyWithArgs("Keyword", "no");
                    return [ "ExactQuantification", [ "Cardinality", [ "Number", 0 ] ] ];
                });
            },
            Keyword: function(word, noToken) {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    this._pred(noToken === !0);
                    return this._applyWithArgs("seq", word);
                }, function() {
                    this._pred(noToken !== !0);
                    return this._applyWithArgs("token", word);
                });
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
                varNumber = this._or(function() {
                    this._pred("|" !== identifierKey.slice(-1));
                    this._pred(this.ruleVars[identifierKey]);
                    return this.ruleVars[identifierKey];
                }, function() {
                    return this.ruleVars[identifierKey] = this.ruleVarsCount++;
                });
                return [ "Variable", [ "Number", varNumber ], identifier ];
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
                var $elf = this, _fromIdx = this.input.idx;
                this._apply("addThat");
                return this._or(function() {
                    return this._applyWithArgs("Junction", "VerbContinuation", [ [ identifier ], [ bind ] ]);
                }, function() {
                    return this._applyWithArgs("Junction", "RuleBody", [ [], [], identifier, bind ]);
                });
            },
            TermEntity: function(factType, bindings) {
                var $elf = this, _fromIdx = this.input.idx, bind, term, thatLF, varLF;
                term = this._applyWithArgs("Term", factType);
                varLF = this._applyWithArgs("CreateVar", term);
                bind = this._applyWithArgs("Bind", term, bindings);
                this._opt(function() {
                    thatLF = this._applyWithArgs("ClosedProjection", term, bind);
                    varLF.push(thatLF);
                    return this._opt(function() {
                        this._pred(factType);
                        return this._applyWithArgs("addComma", !1);
                    });
                });
                return {
                    term: term,
                    lf: varLF
                };
            },
            RuleBody: function(factType, bindings, parentIdentifier, parentBind) {
                var $elf = this, _fromIdx = this.input.idx, bind, data, identifier, lf, quant, termEntity;
                this._or(function() {
                    quant = this._apply("Quantifier");
                    termEntity = this._applyWithArgs("TermEntity", factType, bindings);
                    return factType.push(termEntity.term);
                }, function() {
                    this._apply("addThe");
                    identifier = this._applyWithArgs("Identifier", factType);
                    this._or(function() {
                        return this._applyWithArgs("Bind", identifier, bindings);
                    }, function() {
                        this._applyWithArgs("EmbedVar", identifier, identifier);
                        return this._applyWithArgs("Bind", identifier, bindings);
                    });
                    return factType.push(identifier);
                }, function() {
                    data = this._apply("Value");
                    identifier = this._applyWithArgs("IsFactTypeIdentifier", [ "Term", data[0], "Type" ], factType);
                    identifier.push(data);
                    this._applyWithArgs("EmbedVar", identifier, data);
                    bind = this._applyWithArgs("Bind", identifier, bindings);
                    bind[2] = data;
                    return factType.push(identifier);
                });
                lf = this._or(function() {
                    return this._applyWithArgs("Junction", "VerbContinuation", [ factType, bindings, parentIdentifier, parentBind ]);
                }, function() {
                    return this._applyWithArgs("IsAtomicFormulation", factType, bindings);
                });
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
                return this._or(function() {
                    return this._applyWithArgs("Junction", "RuleBody", [ factType, bindings ]);
                }, function() {
                    return this._applyWithArgs("IsAtomicFormulation", factType, bindings);
                });
            },
            Modifier: function() {
                var $elf = this, _fromIdx = this.input.idx, r;
                this._applyWithArgs("token", "It");
                this._applyWithArgs("token", "is");
                r = this._or(function() {
                    this._applyWithArgs("token", "obligatory");
                    return [ "ObligationFormulation" ];
                }, function() {
                    this._applyWithArgs("token", "necessary");
                    return [ "NecessityFormulation" ];
                }, function() {
                    this._or(function() {
                        return this._applyWithArgs("token", "prohibited");
                    }, function() {
                        return this._applyWithArgs("token", "forbidden");
                    });
                    return [ "ObligationFormulation", [ "LogicalNegation" ] ];
                }, function() {
                    this._or(function() {
                        return this._applyWithArgs("token", "impossible");
                    }, function() {
                        this._applyWithArgs("token", "not");
                        return this._applyWithArgs("token", "possible");
                    });
                    return [ "NecessityFormulation", [ "LogicalNegation" ] ];
                }, function() {
                    this._applyWithArgs("token", "possible");
                    return [ "PossibilityFormulation" ];
                }, function() {
                    this._applyWithArgs("token", "permitted");
                    return [ "PermissibilityFormulation" ];
                });
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
                return this._or(function() {
                    return this._apply("Disjunction");
                }, function() {
                    return this._apply("Conjunction");
                });
            },
            SerialCommaCheck: function() {
                var $elf = this, _fromIdx = this.input.idx;
                this._applyWithArgs("exactly", ",");
                return this._or(function() {
                    return this._applyWithArgs("token", "and");
                }, function() {
                    return this._applyWithArgs("token", "or");
                });
            },
            UpcomingCommaJunction: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._lookahead(function() {
                    return this._or(function() {
                        this._many(function() {
                            this._not(function() {
                                return this._apply("EOL");
                            });
                            this._not(function() {
                                return this._apply("SerialCommaCheck");
                            });
                            return this.anything();
                        });
                        this._apply("SerialCommaCheck");
                        return !0;
                    }, function() {
                        return !1;
                    });
                });
            },
            SimpleJunction: function(ruleName, args) {
                var $elf = this, _fromIdx = this.input.idx, junctioned, result, type;
                result = this._applyWithArgs.apply(this, [ ruleName ].concat(_.cloneDeep(args)));
                return this._or(function() {
                    type = this._apply("JunctionType");
                    junctioned = this._applyWithArgs("SimpleJunction", ruleName, args);
                    return [ type, result, junctioned ];
                }, function() {
                    return result;
                });
            },
            Junction: function(ruleName, args) {
                var $elf = this, _fromIdx = this.input.idx, commaSeparated, junctioned, result, type, upcoming;
                upcoming = this._apply("UpcomingCommaJunction");
                this._applyWithArgs("DisableCommas", upcoming || this.disableCommas);
                result = this._opt(function() {
                    result = this._applyWithArgs("SimpleJunction", ruleName, args);
                    return this._or(function() {
                        this._pred(upcoming);
                        commaSeparated = this._many(function() {
                            this._applyWithArgs("addComma", !0);
                            return this._applyWithArgs("SimpleJunction", ruleName, args);
                        });
                        this._applyWithArgs("addComma", !0);
                        type = this._apply("JunctionType");
                        junctioned = this._applyWithArgs("Junction", ruleName, args, !0);
                        return [ type, result ].concat(commaSeparated).concat([ junctioned ]);
                    }, function() {
                        return result;
                    });
                });
                upcoming = this._apply("UpcomingCommaJunction");
                this._applyWithArgs("DisableCommas", upcoming);
                this._pred(result);
                return result;
            },
            StartRule: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._applyWithArgs("token", "R:");
                }, function() {
                    return this._applyWithArgs("token", "Rule:");
                });
            },
            NewRule: function() {
                var $elf = this, _fromIdx = this.input.idx, mod, ruleLF, ruleText;
                this._apply("StartRule");
                this._apply("spaces");
                ruleText = this._lookahead(function() {
                    return this._apply("toEOL");
                });
                this.ruleVars = {};
                this.ruleVarsCount = 0;
                mod = this._apply("Modifier");
                ruleLF = this._applyWithArgs("Junction", "RuleBody", [ [], [] ]);
                this._apply("EOLTerminator");
                mod = _.cloneDeep(mod);
                2 === mod.length ? mod[1][1] = ruleLF : mod[1] = ruleLF;
                return [ "Rule", mod, [ "StructuredEnglish", ruleText ] ];
            },
            StartFactType: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._applyWithArgs("token", "F:");
                }, function() {
                    return this._applyWithArgs("token", "Fact type:");
                });
            },
            NewFactType: function() {
                var $elf = this, _fromIdx = this.input.idx, factType, identifier, v;
                this._apply("StartFactType");
                factType = [];
                this._many1(function() {
                    identifier = this._apply("Identifier");
                    v = this._apply("addVerb");
                    return factType.push(identifier, v);
                });
                this._opt(function() {
                    identifier = this._apply("Identifier");
                    return factType.push(identifier);
                });
                return function() {
                    $elf.AddFactType(factType, factType);
                    return [ "FactType" ].concat(factType).concat([ [ "Attributes" ] ]);
                };
            },
            StartVocabulary: function() {
                var $elf = this, _fromIdx = this.input.idx;
                this._applyWithArgs("token", "Vocabulary:");
                return "Vocabulary";
            },
            StartTerm: function() {
                var $elf = this, _fromIdx = this.input.idx;
                this._or(function() {
                    return this._applyWithArgs("token", "T:");
                }, function() {
                    return this._applyWithArgs("token", "Term:");
                });
                return "Term";
            },
            StartName: function() {
                var $elf = this, _fromIdx = this.input.idx;
                this._or(function() {
                    return this._applyWithArgs("token", "N:");
                }, function() {
                    return this._applyWithArgs("token", "Name:");
                });
                return "Name";
            },
            NewIdentifier: function() {
                var $elf = this, _fromIdx = this.input.idx, func, identifierType;
                identifierType = this._or(function() {
                    return this._apply("StartVocabulary");
                }, function() {
                    return this._apply("StartTerm");
                }, function() {
                    return this._apply("StartName");
                });
                this._apply("ClearSuggestions");
                func = this._applyWithArgs("AddIdentifier", identifierType);
                return function() {
                    return func().concat([ [ "Attributes" ] ]);
                };
            },
            NewAttribute: function() {
                var $elf = this, _fromIdx = this.input.idx, attrName, attrValOrFunc, currentLine;
                currentLine = _.last(this.lines);
                attrName = this._applyWithArgs("AllowedAttrs", currentLine[0]);
                attrName = attrName.replace(/ /g, "");
                this._apply("spaces");
                attrValOrFunc = this._applyWithArgs("ApplyFirstExisting", [ "Attr" + attrName, "DefaultAttr" ]);
                return function() {
                    var lastLine = $elf.lines.pop(), attrVal = _.isFunction(attrValOrFunc) ? attrValOrFunc(lastLine) : attrValOrFunc;
                    _.last(lastLine).push([ attrName, attrVal ]);
                    return lastLine;
                };
            },
            AllowedAttrs: function(termOrFactType) {
                var $elf = this, _fromIdx = this.input.idx, attrName;
                attrName = this._applyWithArgs("matchForAny", "seq", this.branches.AllowedAttrs.call(this, termOrFactType));
                return attrName.replace(":", "");
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
                return this._or(function() {
                    this._opt(function() {
                        return this._apply("addThe");
                    });
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
                }, function() {
                    value = this._apply("Value");
                    values = this._many(function() {
                        this._apply("addComma");
                        return this._apply("Value");
                    });
                    this._or(function() {
                        return moreValues = this._many1(function() {
                            this._opt(function() {
                                return this._apply("addComma");
                            });
                            this._apply("Disjunction");
                            return this._apply("Value");
                        });
                    }, function() {
                        return this._pred(0 === values.length);
                    });
                    return [ "Enum", value ].concat(values, moreValues);
                });
            },
            AttrGuidanceType: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("matchForAny", "seq", this.branches.AttrGuidanceType);
            },
            AttrNecessity: function() {
                var $elf = this, _fromIdx = this.input.idx, lf, ruleText;
                return this._or(function() {
                    ruleText = this._lookahead(function() {
                        return this._apply("toEOL");
                    });
                    this.ruleVars = {};
                    this.ruleVarsCount = 0;
                    lf = this._applyWithArgs("RuleBody", [], []);
                    this._apply("EOLTerminator");
                    return [ "Rule", [ "NecessityFormulation", lf ], [ "StructuredEnglish", "It is necessary that " + ruleText ] ];
                }, function() {
                    return this._apply("toSBVREOL");
                });
            },
            AttrReferenceScheme: function() {
                var $elf = this, _fromIdx = this.input.idx, t;
                return this._or(function() {
                    t = this._apply("Term");
                    this._apply("EOLTerminator");
                    return t;
                }, function() {
                    return this._apply("toSBVREOL");
                });
            },
            AttrSynonym: function() {
                var $elf = this, _fromIdx = this.input.idx, currentLine;
                currentLine = _.last(this.lines);
                return this._applyWithArgs("AddIdentifier", currentLine[0], currentLine[1]);
            },
            AttrSynonymousForm: function() {
                var $elf = this, _fromIdx = this.input.idx, factType, identifier, v;
                factType = [];
                this._many1(function() {
                    identifier = this._apply("Identifier");
                    v = this._apply("addVerb");
                    return factType.push(identifier, v);
                });
                this._opt(function() {
                    identifier = this._apply("Identifier");
                    return factType.push(identifier);
                });
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
                this._opt(function() {
                    return this._apply("Terminator");
                });
                this._apply("spaces");
                return this._lookahead(function() {
                    return this._or(function() {
                        return this._apply("EOL");
                    }, function() {
                        return this._apply("end");
                    });
                });
            },
            Terminator: function() {
                var $elf = this, _fromIdx = this.input.idx;
                this._apply("spaces");
                return this._applyWithArgs("Keyword", ".", !0);
            },
            space: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return SBVRLibs._superApplyWithArgs(this, "space");
                }, function() {
                    return this._apply("NewComment");
                });
            },
            Line: function() {
                var $elf = this, _fromIdx = this.input.idx, func, l;
                this._apply("spaces");
                l = this._or(function() {
                    func = this._or(function() {
                        return this._apply("NewIdentifier");
                    }, function() {
                        return this._apply("NewFactType");
                    }, function() {
                        return this._apply("NewAttribute");
                    });
                    return func();
                }, function() {
                    return this._apply("NewRule");
                });
                this._apply("ClearSuggestions");
                this.lines.push(l);
                return l;
            },
            Process: function() {
                var $elf = this, _fromIdx = this.input.idx;
                this._opt(function() {
                    return this._apply("EOLSpaces");
                });
                this._opt(function() {
                    return this._apply("Line");
                });
                this._many(function() {
                    this._apply("EOLSpaces");
                    return this._apply("Line");
                });
                this._many(function() {
                    return this._apply("space");
                });
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
            this._pred(identifiers.indexOf(baseIdentifier[1]) !== -1);
            return baseIdentifier;
        };
        SBVRParser.IsVerb = function(factTypeSoFar, verb) {
            verb = [ "Verb", verb ];
            var currentLevel = this._traverseFactType(factTypeSoFar);
            this._pred(currentLevel !== !1);
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
            return currentLevel !== !1 && currentLevel.__valid;
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
                return _.keys(identifiers);
            }
            var factTypePart, currentLevel = this._traverseFactType(factTypeSoFar), factTypeParts = {}, followChildrenChain = function(vocabulary, identifier) {
                vocabulary = vocabularies[vocabulary];
                var identifiers = vocabulary[identifierType];
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
            return _.keys(factTypeParts);
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
                    return _.keys(this.vocabularies);
                },
                Term: function(factTypeSoFar, vocabulary) {
                    return getValidFactTypeParts.call(this, vocabulary, "Term", factTypeSoFar);
                },
                Name: function(factTypeSoFar, vocabulary) {
                    return getValidFactTypeParts.call(this, vocabulary, "Name", factTypeSoFar);
                },
                Verb: function(factTypeSoFar, vocabulary) {
                    return factTypeSoFar === !0 ? [] : getValidFactTypeParts.call(this, vocabulary, "Verb", factTypeSoFar);
                },
                AllowedAttrs: function(termOrFactType) {
                    return this.allowedAttrLists.hasOwnProperty(termOrFactType) ? this.allowedAttrLists[termOrFactType] : null == termOrFactType ? this.allowedAttrLists.Term.concat(this.allowedAttrLists.Name, this.allowedAttrLists.FactType) : [];
                },
                AttrGuidanceType: [ "operative business rule", "structural business rule", "advice of permission", "advice of possibility", "advice of optionality", "advice of contingency" ],
                Modifier: [ "It is obligatory that", "It is necessary that", "It is prohibited that", "It is forbidden that", "It is impossible that", "It is not possible that", "It is possible that", "It is permitted that" ],
                Quantifier: [ "each", "a", "an", "some", "at most", "at least", "more than", "exactly", "no" ],
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
                    $elf.input = origInput;
                    result = $elf._applyWithArgs.call($elf, rule, arr[idx]);
                } catch (e) {
                    if (!(e instanceof SyntaxError)) throw e;
                } finally {}
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
    });
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
            if (skip.indexOf(str.toLowerCase()) === -1) for (var x = 0, l = rules.length; x < l; x++) if (rules[x][0].test(str)) return str.replace(rules[x][0], rules[x][1]);
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
    String.prototype.pluralize || !function() {
        var memo = {};
        String.prototype.pluralize = function(plural) {
            if (plural) return plural;
            var thisString = this.toString();
            memo.hasOwnProperty(thisString) || (memo[thisString] = InflectionJS.apply_rules(this.toString(), this._plural_rules, this._uncountable_words));
            return memo[thisString];
        };
    }();
    String.prototype.singularize || !function() {
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
            for (var str_arr = str_path[i].split("_"), initX = lowFirstLetter && i + 1 === str_path.length ? 1 : 0, x = initX; x < str_arr.length; x++) str_arr[x] = str_arr[x].charAt(0).toUpperCase() + str_arr[x].substring(1);
            str_path[i] = str_arr.join("");
        }
        str = str_path.join("::");
        return str;
    });
    String.prototype.underscore || (String.prototype.underscore = function() {
        for (var str = this, str_path = str.split("::"), i = 0; i < str_path.length; i++) {
            str_path[i] = str_path[i].replace(InflectionJS.uppercase, "_$1");
            str_path[i] = str_path[i].replace(InflectionJS.underbar_prefix, "");
        }
        str = str_path.join("/").toLowerCase();
        return str;
    });
    String.prototype.humanize || (String.prototype.humanize = function(lowFirstLetter) {
        var str = this.toLowerCase();
        str = str.replace(InflectionJS.id_suffix, "");
        str = str.replace(InflectionJS.underbar, " ");
        lowFirstLetter || (str = str.capitalize());
        return str;
    });
    String.prototype.capitalize || (String.prototype.capitalize = function() {
        var str = this.toLowerCase();
        str = str.substring(0, 1).toUpperCase() + str.substring(1);
        return str;
    });
    String.prototype.dasherize || (String.prototype.dasherize = function() {
        var str = this;
        str = str.replace(InflectionJS.space_or_underbar, "-");
        return str;
    });
    String.prototype.titleize || (String.prototype.titleize = function() {
        var str = this.toLowerCase();
        str = str.replace(InflectionJS.underbar, " ");
        for (var str_arr = str.split(" "), x = 0; x < str_arr.length; x++) {
            for (var d = str_arr[x].split("-"), i = 0; i < d.length; i++) this._non_titlecased_words.indexOf(d[i].toLowerCase()) < 0 && (d[i] = d[i].capitalize());
            str_arr[x] = d.join("-");
        }
        str = str_arr.join(" ");
        str = str.substring(0, 1).toUpperCase() + str.substring(1);
        return str;
    });
    String.prototype.demodulize || (String.prototype.demodulize = function() {
        var str = this, str_arr = str.split("::");
        str = str_arr[str_arr.length - 1];
        return str;
    });
    String.prototype.tableize || (String.prototype.tableize = function() {
        var str = this;
        str = str.underscore().pluralize();
        return str;
    });
    String.prototype.classify || (String.prototype.classify = function() {
        var str = this;
        str = str.camelize().singularize();
        return str;
    });
    String.prototype.foreign_key || (String.prototype.foreign_key = function(dropIdUbar) {
        var str = this;
        str = str.demodulize().underscore() + (dropIdUbar ? "" : "_") + "id";
        return str;
    });
    String.prototype.ordinalize || (String.prototype.ordinalize = function() {
        for (var str = this, str_arr = str.split(" "), x = 0; x < str_arr.length; x++) {
            var i = parseInt(str_arr[x], 10);
            if (NaN === i) {
                var ltd = str_arr[x].substring(str_arr[x].length - 2), ld = str_arr[x].substring(str_arr[x].length - 1), suf = "th";
                "11" != ltd && "12" != ltd && "13" != ltd && ("1" === ld ? suf = "st" : "2" === ld ? suf = "nd" : "3" === ld && (suf = "rd"));
                str_arr[x] += suf;
            }
        }
        str = str_arr.join(" ");
        return str;
    });
}, function(module, exports) {
    module.exports = "Vocabulary: Type\nTerm:       Integer\nTerm:       Real\nTerm:       Text\nTerm:       Date\nTerm:       Date Time\nTerm:       Time\nTerm:       Interval\nTerm:       File\n\nTerm:       Serial\n\tConcept Type: Integer\n\tNote: An auto-incrementing 'Integer'.\nTerm:       JSON\n\tConcept Type: Text\n\tNote: A 'Text' type that will only allow valid JSON.\nTerm:       Hashed\n\tConcept Type: Text\n\tNote: A 'Text' type that will automatically be converted to a hash.\n\nTerm:       Length\n\tConcept Type: Integer\n\nFact type:  Text has Length\n\tNote: Length in characters\n\tNecessity: Each Text has exactly one Length\n\nFact type:  Integer1 is less than Integer2\n\tSynonymous Form: Integer2 is greater than Integer1\nFact type: Integer1 is less than or equal to Integer2\n\tSynonymous Form: Integer2 is greater than or equal to Integer1\nFact type:  Integer1 is equal to Integer2\n\tSynonymous Form: Integer2 is equal to Integer1\n\tSynonymous Form: Integer1 equals Integer2\n\tSynonymous Form: Integer2 equals Integer1\n\nFact type:  Real1 is less than Real2\n\tSynonymous Form: Real2 is greater than Real1\nFact type: Real1 is less than or equal to Real2\n\tSynonymous Form: Real2 is greater than or equal to Real1\nFact type:  Real1 is equal to Real2\n\tSynonymous Form: Real2 is equal to Real1\n\tSynonymous Form: Real1 equals Real2\n\tSynonymous Form: Real2 equals Real1\n\n\nFact type:  Real is less than Integer\n\tSynonymous Form: Integer is greater than Real\nFact type:  Integer is less than Real\n\tSynonymous Form: Real is greater than Integer\n\nFact type: Real is less than or equal to Integer\n\tSynonymous Form: Integer is greater than or equal to Real\nFact type: Integer is less than or equal to Real\n\tSynonymous Form: Real is greater than or equal to Integer\n\nFact type:  Integer is equal to Real\n\tSynonymous Form: Real is equal to Integer\n\tSynonymous Form: Real equals Integer\n\tSynonymous Form: Integer equals Real\n\n\nFact type:  Text1 is equal to Text2\n\tSynonymous Form: Text2 is equal to Text1\n\tSynonymous Form: Text1 equals Text2\n\tSynonymous Form: Text2 equals Text1\n\nTerm:       Short Text\n\tConcept Type: Text\n\t--Necessity: each Short Text has a Length that is less than or equal to 255.\n\nTerm:       Red Component\n\tConcept Type: Integer\nTerm:       Green Component\n\tConcept Type: Integer\nTerm:       Blue Component\n\tConcept Type: Integer\nTerm:       Alpha Component\n\tConcept Type: Integer\nTerm:       Color\n\tConcept Type: Integer\nFact type:  Color has Red Component\n\tNecessity: Each Color has exactly one Red Component\nFact type:  Color has Green Component\n\tNecessity: Each Color has exactly one Green Component\nFact type:  Color has Blue Component\n\tNecessity: Each Color has exactly one Blue Component\nFact type:  Color has Alpha Component\n\tNecessity: Each Color has exactly one Alpha Component";
}, function(module, exports, __webpack_require__) {
    var MigrationError, Promise, TypedError, _, modelText, permissions, extend = function(child, parent) {
        function ctor() {
            this.constructor = child;
        }
        for (var key in parent) hasProp.call(parent, key) && (child[key] = parent[key]);
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }, hasProp = {}.hasOwnProperty, slice = [].slice;
    _ = __webpack_require__(4);
    Promise = __webpack_require__(2);
    TypedError = __webpack_require__(6);
    modelText = __webpack_require__(45);
    permissions = __webpack_require__(46);
    exports.MigrationError = MigrationError = function(superClass) {
        function MigrationError() {
            return MigrationError.__super__.constructor.apply(this, arguments);
        }
        extend(MigrationError, superClass);
        return MigrationError;
    }(TypedError);
    exports.run = function(tx, model) {
        var modelName;
        if (!_.some(model.migrations)) return Promise.fulfilled();
        modelName = model.apiRoot;
        return this.checkModelAlreadyExists(tx, modelName).then(function(_this) {
            return function(exists) {
                if (!exists) {
                    _this.logger.info("First time model has executed, skipping migrations");
                    return _this.setExecutedMigrations(tx, modelName, _.keys(model.migrations));
                }
                return _this.getExecutedMigrations(tx, modelName).then(function(executedMigrations) {
                    var pendingMigrations;
                    pendingMigrations = _this.filterAndSortPendingMigrations(model.migrations, executedMigrations);
                    if (_.some(pendingMigrations)) return _this.executeMigrations(tx, pendingMigrations).then(function(newlyExecutedMigrations) {
                        return _this.setExecutedMigrations(tx, modelName, slice.call(executedMigrations).concat(slice.call(newlyExecutedMigrations)));
                    });
                });
            };
        }(this));
    };
    exports.checkModelAlreadyExists = function(tx, modelName) {
        return this.sbvrUtils.api.dev.get({
            resource: "model",
            passthrough: {
                tx: tx,
                req: permissions.rootRead
            },
            options: {
                select: [ "vocabulary" ],
                top: "1",
                filter: {
                    vocabulary: modelName
                }
            }
        }).then(function(results) {
            return _.some(results);
        });
    };
    exports.getExecutedMigrations = function(tx, modelName) {
        return this.migrationsApi.get({
            resource: "migration",
            id: modelName,
            passthrough: {
                tx: tx,
                req: permissions.rootRead
            },
            options: {
                select: [ "executed_migrations" ]
            }
        }).then(function(data) {
            return (null != data ? data.executed_migrations : void 0) || [];
        });
    };
    exports.setExecutedMigrations = function(tx, modelName, executedMigrations) {
        return this.migrationsApi.put({
            resource: "migration",
            id: modelName,
            passthrough: {
                tx: tx,
                req: permissions.root
            },
            body: {
                model_name: modelName,
                executed_migrations: executedMigrations
            }
        });
    };
    exports.filterAndSortPendingMigrations = function(migrations, executedMigrations) {
        return _(migrations).omit(executedMigrations).toPairs().sortBy(_.head).value();
    };
    exports.executeMigrations = function(tx, migrations) {
        null == migrations && (migrations = []);
        return Promise.map(migrations, this.executeMigration.bind(this, tx), {
            concurrency: 1
        }).catch(function(_this) {
            return function(err) {
                _this.logger.error("Error while executing migrations, rolled back");
                throw new MigrationError(err);
            };
        }(this)).return(_.map(migrations, _.head));
    };
    exports.executeMigration = function(tx, arg) {
        var key, migration;
        key = arg[0], migration = arg[1];
        this.logger.info("Running migration " + JSON.stringify(key));
        switch (typeof migration) {
          case "function":
            return migration(tx, this.sbvrUtils);

          case "string":
            return tx.executeSql(migration);
        }
    };
    exports.config = {
        models: [ {
            modelName: "migrations",
            apiRoot: "migrations",
            modelText: modelText,
            customServerCode: exports
        } ]
    };
    exports.setup = function(app, sbvrUtils, db, callback) {
        this.sbvrUtils = sbvrUtils;
        this.migrationsApi = this.sbvrUtils.api.migrations;
        this.logger = this.migrationsApi.logger;
        return callback();
    };
}, function(module, exports) {
    module.exports = "Vocabulary: migrations\n\nTerm:       model name\n\tConcept Type: Short Text (Type)\nTerm:       executed migrations\n\tConcept Type: JSON (Type)\n\nTerm:       migration\n\tReference Scheme:   model name\n\tDatabase ID Field:  model name\nFact Type:  migration has model name\n\tNecessity: each migration has exactly one model name\nFact Type:  migration has executed migrations\n\tNecessity: each migration has exactly one executed migrations\n";
}, function(module, exports, __webpack_require__) {
    var BluebirdLRU, ODataParser, PermissionError, PermissionParsingError, Promise, TypedError, _, collapsePermissionFilters, env, memoize, metadataEndpoints, methodPermissions, nestedCheck, parsePermissions, rootRead, userModel, extend = function(child, parent) {
        function ctor() {
            this.constructor = child;
        }
        for (var key in parent) hasProp.call(parent, key) && (child[key] = parent[key]);
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }, hasProp = {}.hasOwnProperty, slice = [].slice, indexOf = [].indexOf || function(item) {
        for (var i = 0, l = this.length; i < l; i++) if (i in this && this[i] === item) return i;
        return -1;
    };
    _ = __webpack_require__(4);
    Promise = __webpack_require__(2);
    BluebirdLRU = __webpack_require__(47);
    env = __webpack_require__(48);
    userModel = __webpack_require__(49);
    metadataEndpoints = __webpack_require__(50).metadataEndpoints;
    ODataParser = __webpack_require__(51).ODataParser;
    memoize = __webpack_require__(115);
    TypedError = __webpack_require__(6);
    exports.PermissionError = PermissionError = function(superClass) {
        function PermissionError() {
            return PermissionError.__super__.constructor.apply(this, arguments);
        }
        extend(PermissionError, superClass);
        return PermissionError;
    }(TypedError);
    exports.PermissionParsingError = PermissionParsingError = function(superClass) {
        function PermissionParsingError() {
            return PermissionParsingError.__super__.constructor.apply(this, arguments);
        }
        extend(PermissionParsingError, superClass);
        return PermissionParsingError;
    }(TypedError);
    exports.root = {
        user: {
            permissions: [ "resource.all" ]
        }
    };
    exports.rootRead = rootRead = {
        user: {
            permissions: [ "resource.get" ]
        }
    };
    methodPermissions = {
        GET: {
            or: [ "get", "read" ]
        },
        PUT: {
            or: [ "set", {
                and: [ "create", "update" ]
            } ]
        },
        POST: {
            or: [ "set", "create" ]
        },
        PATCH: {
            or: [ "set", "update" ]
        },
        MERGE: {
            or: [ "set", "update" ]
        },
        DELETE: "delete"
    };
    parsePermissions = function() {
        var _parsePermissions, odataParser;
        odataParser = ODataParser.createInstance();
        _parsePermissions = memoize(function(filter, bindsLength) {
            var tree;
            odataParser.binds = new Array(bindsLength);
            tree = odataParser.matchAll([ "FilterByExpression", filter ], "ProcessRule");
            return {
                tree: tree,
                extraBinds: odataParser.binds.slice(bindsLength)
            };
        }, {
            primitive: !0
        });
        return function(filter, odataBinds) {
            var extraBinds, ref, tree;
            ref = _parsePermissions(filter, odataBinds.length), tree = ref.tree, extraBinds = ref.extraBinds;
            odataBinds.push.apply(odataBinds, extraBinds);
            return tree;
        };
    }();
    exports.nestedCheck = nestedCheck = function(check, stringCallback) {
        var checkType, checkTypes, i, j, len, len1, ref, result, results, subcheck;
        if (_.isString(check)) return stringCallback(check);
        if (_.isBoolean(check)) return check;
        if (_.isArray(check)) {
            results = [];
            for (i = 0, len = check.length; i < len; i++) {
                subcheck = check[i];
                result = nestedCheck(subcheck, stringCallback);
                if (result === !1) return !1;
                result !== !0 && (results = results.concat(result));
            }
            return 1 === results.length ? results[0] : !(results.length > 1) || _.uniq(results);
        }
        if (!_.isObject(check)) throw new Error("Cannot parse required checks: " + check);
        checkTypes = _.keys(check);
        if (checkTypes.length > 1) throw new Error("More than one check type: " + checkTypes);
        checkType = checkTypes[0];
        switch (checkType.toUpperCase()) {
          case "AND":
            return nestedCheck(check[checkType], stringCallback);

          case "OR":
            results = [];
            ref = check[checkType];
            for (j = 0, len1 = ref.length; j < len1; j++) {
                subcheck = ref[j];
                result = nestedCheck(subcheck, stringCallback);
                if (result === !0) return !0;
                result !== !1 && (results = results.concat(result));
            }
            return 1 === results.length ? results[0] : results.length > 1 && _.uniq(results);

          default:
            throw new Error("Cannot parse required checking logic: " + checkType);
        }
    };
    collapsePermissionFilters = function(v) {
        return _.isArray(v) ? collapsePermissionFilters({
            or: v
        }) : _.isObject(v) ? v.hasOwnProperty("filter") ? v.filter : _(v).toPairs().flattenDeep().map(collapsePermissionFilters).value() : v;
    };
    exports.config = {
        models: [ {
            apiRoot: "Auth",
            modelText: userModel,
            customServerCode: exports
        } ]
    };
    exports.setup = function(app, sbvrUtils) {
        var addPermissions, apiKeyMiddleware, checkApiKey, checkPermissions, customApiKeyMiddleware, customAuthorizationMiddleware, getApiKeyPermissions, getPermissions, getUserPermissions;
        sbvrUtils.addHook("all", "all", "all", {
            PREPARSE: function(arg) {
                var req;
                req = arg.req;
                return apiKeyMiddleware(req);
            },
            POSTPARSE: function(arg) {
                var req, request;
                req = arg.req, request = arg.request;
                return addPermissions(req, request);
            }
        });
        sbvrUtils.addHook("POST", "Auth", "user", {
            POSTPARSE: function(arg) {
                var api, request;
                request = arg.request, api = arg.api;
                return api.post({
                    resource: "actor"
                }).then(function(result) {
                    return request.values.actor = result.id;
                });
            }
        });
        sbvrUtils.addHook("DELETE", "Auth", "user", {
            POSTRUN: function(arg) {
                var api, request;
                request = arg.request, api = arg.api;
                return api.delete({
                    resource: "actor",
                    id: request.values.actor
                });
            }
        });
        exports.checkPassword = function(username, password, callback) {
            var authApi;
            authApi = sbvrUtils.api.Auth;
            return authApi.get({
                resource: "user",
                passthrough: {
                    req: rootRead
                },
                options: {
                    select: [ "id", "actor", "password" ],
                    filter: {
                        username: username
                    }
                }
            }).then(function(result) {
                var actorId, hash, userId;
                if (0 === result.length) throw new Error("User not found");
                hash = result[0].password;
                userId = result[0].id;
                actorId = result[0].actor;
                return sbvrUtils.sbvrTypes.Hashed.compare(password, hash).then(function(res) {
                    if (!res) throw new Error("Passwords do not match");
                    return getUserPermissions(userId).then(function(permissions) {
                        return {
                            id: userId,
                            actor: actorId,
                            username: username,
                            permissions: permissions
                        };
                    });
                });
            }).nodeify(callback);
        };
        getPermissions = function(permsFilter, callback) {
            var authApi;
            authApi = sbvrUtils.api.Auth;
            return authApi.get({
                resource: "permission",
                passthrough: {
                    req: rootRead
                },
                options: {
                    select: "name",
                    filter: permsFilter
                }
            }).map(function(permission) {
                return permission.name;
            }).catch(function(err) {
                authApi.logger.error("Error loading permissions", err, err.stack);
                throw err;
            }).nodeify(callback);
        };
        exports.getUserPermissions = getUserPermissions = function(userId, callback) {
            var permsFilter;
            _.isString(userId) && (userId = _.parseInt(userId));
            if (!_.isFinite(userId)) return Promise.rejected(new Error("User ID has to be numeric, got: " + typeof userId));
            permsFilter = {
                $or: {
                    user__has__permission: {
                        $any: {
                            $alias: "uhp",
                            $expr: {
                                uhp: {
                                    user: userId
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
                    role__has__permission: {
                        $any: {
                            $alias: "rhp",
                            $expr: {
                                rhp: {
                                    role: {
                                        $any: {
                                            $alias: "r",
                                            $expr: {
                                                r: {
                                                    user__has__role: {
                                                        $any: {
                                                            $alias: "uhr",
                                                            $expr: {
                                                                uhr: {
                                                                    user: userId
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
            };
            return getPermissions(permsFilter, callback);
        };
        exports.getApiKeyPermissions = getApiKeyPermissions = function() {
            var cache;
            cache = new BluebirdLRU({
                max: env.apiKeys.permissionsCache.max,
                maxAge: env.apiKeys.permissionsCache.maxAge,
                fetchFn: function(apiKey) {
                    var permsFilter;
                    permsFilter = {
                        $or: {
                            api_key__has__permission: {
                                $any: {
                                    $alias: "khp",
                                    $expr: {
                                        khp: {
                                            api_key: {
                                                $any: {
                                                    $alias: "k",
                                                    $expr: {
                                                        k: {
                                                            key: apiKey
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            role__has__permission: {
                                $any: {
                                    $alias: "rhp",
                                    $expr: {
                                        rhp: {
                                            role: {
                                                $any: {
                                                    $alias: "r",
                                                    $expr: {
                                                        r: {
                                                            api_key__has__role: {
                                                                $any: {
                                                                    $alias: "khr",
                                                                    $expr: {
                                                                        khr: {
                                                                            api_key: {
                                                                                $any: {
                                                                                    $alias: "k",
                                                                                    $expr: {
                                                                                        k: {
                                                                                            key: apiKey
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
                    };
                    return getPermissions(permsFilter);
                }
            });
            return function(apiKey, callback) {
                var promise;
                promise = _.isString(apiKey) ? cache.get(apiKey) : Promise.rejected(new Error("API key has to be a string, got: " + typeof apiKey));
                return promise.nodeify(callback);
            };
        }();
        checkApiKey = function(req, apiKey) {
            return Promise.try(function() {
                if (null != apiKey && null == req.apiKey) return getApiKeyPermissions(apiKey).catch(function(err) {
                    console.warn("Error with API key:", err);
                    return [];
                }).then(function(permissions) {
                    return req.apiKey = {
                        key: apiKey,
                        permissions: permissions
                    };
                });
            });
        };
        exports.customAuthorizationMiddleware = customAuthorizationMiddleware = function(expectedScheme) {
            null == expectedScheme && (expectedScheme = "Bearer");
            expectedScheme = expectedScheme.toLowerCase();
            return function(req, res, next) {
                return Promise.try(function() {
                    var apiKey, auth, parts, scheme;
                    auth = req.header("Authorization");
                    if (auth) {
                        parts = auth.split(" ");
                        if (2 === parts.length) {
                            scheme = parts[0], apiKey = parts[1];
                            if (scheme.toLowerCase() === expectedScheme) return checkApiKey(req, apiKey);
                        }
                    }
                }).then(function() {
                    "function" == typeof next && next();
                });
            };
        };
        exports.authorizationMiddleware = customAuthorizationMiddleware();
        exports.customApiKeyMiddleware = customApiKeyMiddleware = function(paramName) {
            null == paramName && (paramName = "apikey");
            return function(req, res, next) {
                var apiKey, ref, ref1;
                apiKey = null != (ref = null != (ref1 = req.params[paramName]) ? ref1 : req.body[paramName]) ? ref : req.query[paramName];
                return checkApiKey(req, apiKey).then(function() {
                    "function" == typeof next && next();
                });
            };
        };
        exports.apiKeyMiddleware = apiKeyMiddleware = customApiKeyMiddleware();
        exports.checkPermissions = checkPermissions = function() {
            var _getGuestPermissions;
            _getGuestPermissions = function() {
                var _guestPermissions;
                _guestPermissions = null;
                return function(callback) {
                    (null == _guestPermissions || _guestPermissions.isRejected()) && (_guestPermissions = sbvrUtils.api.Auth.get({
                        resource: "user",
                        passthrough: {
                            req: rootRead
                        },
                        options: {
                            select: "id",
                            filter: {
                                username: "guest"
                            }
                        }
                    }).then(function(result) {
                        if (0 === result.length) throw new Error("No guest permissions");
                        return getUserPermissions(result[0].id);
                    }));
                    return _guestPermissions.nodeify(callback);
                };
            }();
            return function() {
                var _checkPermissions, actionList, actorID, apiKeyActorID, args, authApi, callback, callbackArg, ref, ref1, req, resourceName, vocabulary;
                args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
                callbackArg = Math.max(3, Math.min(6, args.length - 1));
                if (_.isFunction(args[callbackArg])) {
                    callback = args[callbackArg];
                    args[callbackArg] = null;
                }
                req = args[0], actionList = args[1], resourceName = args[2], vocabulary = args[3];
                authApi = sbvrUtils.api.Auth;
                _checkPermissions = function(permissions, actorID) {
                    var checkObject;
                    if (null == actorID) throw new Error("Actor ID cannot be null for _checkPermissions.");
                    checkObject = {
                        or: [ "all", actionList ]
                    };
                    return nestedCheck(checkObject, function(permissionCheck) {
                        var conditionalPermissions, resourcePermission, vocabularyPermission, vocabularyResourcePermission;
                        resourcePermission = "resource." + permissionCheck;
                        if (_.includes(permissions, resourcePermission)) return !0;
                        if (null != vocabulary) {
                            vocabularyPermission = vocabulary + "." + permissionCheck;
                            if (_.includes(permissions, vocabularyPermission)) return !0;
                            if (null != resourceName) {
                                vocabularyResourcePermission = vocabulary + "." + resourceName + "." + permissionCheck;
                                if (_.includes(permissions, vocabularyResourcePermission)) return !0;
                            }
                        }
                        conditionalPermissions = _.map(permissions, function(permissionName) {
                            var condition, i, len, permission, ref;
                            ref = [ resourcePermission, vocabularyPermission, vocabularyResourcePermission ];
                            for (i = 0, len = ref.length; i < len; i++) {
                                permission = ref[i];
                                if (null != permission) {
                                    permission += "?";
                                    if (permissionName.slice(0, permission.length) === permission) {
                                        condition = permissionName.slice(permission.length);
                                        return _.isArray(actorID) ? _.map(actorID, function(id) {
                                            return condition.replace(/\$ACTOR\.ID/g, id);
                                        }) : condition.replace(/\$ACTOR\.ID/g, actorID);
                                    }
                                }
                            }
                            return !1;
                        });
                        conditionalPermissions = _.filter(conditionalPermissions);
                        return 1 === conditionalPermissions.length ? conditionalPermissions[0] : conditionalPermissions.length > 1 && {
                            or: conditionalPermissions
                        };
                    });
                };
                actorID = null != (ref = null != (ref1 = req.user) ? ref1.actor : void 0) ? ref : 0;
                apiKeyActorID = !1;
                return Promise.try(function() {
                    return null != req.user && _checkPermissions(req.user.permissions, actorID);
                }).catch(function(err) {
                    authApi.logger.error("Error checking user permissions", req.user, err, err.stack);
                    return !1;
                }).then(function(allowed) {
                    var apiKeyPermissions, ref2;
                    apiKeyPermissions = null != (ref2 = req.apiKey) ? ref2.permissions : void 0;
                    return allowed === !0 || null == apiKeyPermissions || 0 === apiKeyPermissions.length ? allowed : authApi.get({
                        resource: "api_key",
                        passthrough: {
                            req: rootRead
                        },
                        options: {
                            select: "actor",
                            filter: {
                                key: req.apiKey.key
                            }
                        }
                    }).then(function(apiKeys) {
                        if (0 === apiKeys.length) throw new Error("API key is not linked to a actor?!");
                        apiKeyActorID = apiKeys[0].actor.__id;
                        return _checkPermissions(apiKeyPermissions, apiKeyActorID);
                    }).catch(function(err) {
                        return authApi.logger.error("Error checking api key permissions", req.apiKey.key, err, err.stack);
                    }).then(function(apiKeyAllowed) {
                        return apiKeyAllowed === !0 || {
                            or: [ allowed, apiKeyAllowed ]
                        };
                    });
                }).then(function(allowed) {
                    return allowed === !0 ? allowed : _getGuestPermissions().then(function(permissions) {
                        var actorIDs;
                        actorIDs = apiKeyActorID !== !1 ? [ actorID, apiKeyActorID ] : actorID;
                        return _checkPermissions(permissions, actorIDs);
                    }).catch(function(err) {
                        authApi.logger.error("Error checking guest permissions", err, err.stack);
                        return !1;
                    }).then(function(guestAllowed) {
                        return {
                            or: [ allowed, guestAllowed ]
                        };
                    });
                }).then(function(permissions) {
                    return nestedCheck(permissions, _.identity);
                }).nodeify(callback);
            };
        }();
        exports.checkPermissionsMiddleware = function(action) {
            return function(req, res, next) {
                return checkPermissions(req, action).then(function(allowed) {
                    switch (allowed) {
                      case !1:
                        return res.sendStatus(401);

                      case !0:
                        return next();

                      default:
                        throw new Error("checkPermissionsMiddleware returned a conditional permission");
                    }
                }).catch(function(err) {
                    sbvrUtils.api.Auth.logger.error("Error checking permissions", err, err.stack);
                    return res.sendStatus(503);
                });
            };
        };
        return addPermissions = function() {
            var _addPermissions;
            _addPermissions = function(req, permissionType, vocabulary, resourceName, odataQuery, odataBinds) {
                return checkPermissions(req, permissionType, resourceName, vocabulary).then(function(conditionalPerms) {
                    var permissionFilters, ref, ref1;
                    if (conditionalPerms === !1) throw new PermissionError();
                    if (conditionalPerms !== !0) {
                        permissionFilters = nestedCheck(conditionalPerms, function(permissionCheck) {
                            var e;
                            try {
                                permissionCheck = parsePermissions(permissionCheck, odataBinds);
                                return {
                                    filter: permissionCheck
                                };
                            } catch (error) {
                                e = error;
                                console.warn("Failed to parse conditional permissions: ", permissionCheck);
                                throw new PermissionParsingError(e);
                            }
                        });
                        if (permissionFilters === !1) throw new PermissionError();
                        if (permissionFilters !== !0) {
                            permissionFilters = collapsePermissionFilters(permissionFilters);
                            null == odataQuery.options && (odataQuery.options = {});
                            null != odataQuery.options.$filter ? odataQuery.options.$filter = [ "and", odataQuery.options.$filter, permissionFilters ] : odataQuery.options.$filter = permissionFilters;
                        }
                    }
                    if (null != (null != (ref = odataQuery.options) && null != (ref1 = ref.$expand) ? ref1.properties : void 0)) return Promise.map(odataQuery.options.$expand.properties, function(expand) {
                        return _addPermissions(req, methodPermissions.GET, vocabulary, expand.name, expand, odataBinds);
                    });
                });
            };
            return function(req, arg) {
                var custom, isMetadataEndpoint, method, odataBinds, odataQuery, permissionType, resourceName, values, vocabulary;
                method = arg.method, vocabulary = arg.vocabulary, resourceName = arg.resourceName, 
                odataQuery = arg.odataQuery, odataBinds = arg.odataBinds, values = arg.values, custom = arg.custom;
                method = method.toUpperCase();
                isMetadataEndpoint = indexOf.call(metadataEndpoints, resourceName) >= 0 || "OPTIONS" === method;
                permissionType = isMetadataEndpoint ? "model" : null != methodPermissions[method] ? methodPermissions[method] : (console.warn("Unknown method for permissions type check: ", method), 
                "all");
                return _addPermissions(req, permissionType, vocabulary, odataQuery.resource, odataQuery, odataBinds);
            };
        }();
    };
}, function(module, exports) {
    module.exports = require("bluebird-lru-cache");
}, function(module, exports) {
    exports.apiKeys = {
        permissionsCache: {
            max: 500,
            maxAge: 3e5
        }
    };
}, function(module, exports) {
    module.exports = "Vocabulary: Auth\n\nTerm:       username\n\tConcept Type: Short Text (Type)\nTerm:       password\n\tConcept Type: Hashed (Type)\nTerm:       name\n\tConcept Type: Short Text (Type)\nTerm:       key\n\tConcept Type: Short Text (Type)\nTerm:       expiry date\n\tConcept Type: Date Time (Type)\n\nTerm:       permission\n\tReference Scheme: name\nFact type:  permission has name\n\tNecessity: Each permission has exactly one name.\n\tNecessity: Each name is of exactly one permission.\n\nTerm:       role\n\tReference Scheme: name\nFact type:  role has name\n\tNecessity: Each role has exactly one name.\n\tNecessity: Each name is of exactly one role.\nFact type:  role has permission\n\nTerm:       actor\n\nTerm:       user\n\tReference Scheme: username\n\tConcept Type: actor\nFact type:  user has username\n\tNecessity: Each user has exactly one username.\n\tNecessity: Each username is of exactly one user.\nFact type:  user has password\n\tNecessity: Each user has exactly one password.\nFact type:  user has role\n\tNote: A 'user' will inherit all the 'permissions' that the 'role' has.\n\tTerm Form: user role\n\tFact type: user role has expiry date\n\t\tNecessity: Each user role has at most one expiry date.\nFact type:  user has permission\n\tTerm Form: user permission\n\tFact type: user permission has expiry date\n\t\tNecessity: Each user permission has at most one expiry date.\n\nTerm:       api key\n\tReference Scheme: key\nFact type:  api key has key\n\tNecessity: each api key has exactly one key\n\tNecessity: each key is of exactly one api key\nFact type:  api key has role\n\tNote: An 'api key' will inherit all the 'permissions' that the 'role' has.\nFact type:  api key has permission\nFact type:  api key is of actor\n\tNecessity: each api key is of exactly one actor\n";
}, function(module, exports, __webpack_require__) {
    var BadRequestError, OData2AbstractSQL, ODataParser, ParsingError, Promise, TranslationError, TypedError, _, memoize, memoizedOdata2AbstractSQL, metadataEndpoints, notParsingError, odata2AbstractSQL, odataParser, extend = function(child, parent) {
        function ctor() {
            this.constructor = child;
        }
        for (var key in parent) hasProp.call(parent, key) && (child[key] = parent[key]);
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }, hasProp = {}.hasOwnProperty, indexOf = [].indexOf || function(item) {
        for (var i = 0, l = this.length; i < l; i++) if (i in this && this[i] === item) return i;
        return -1;
    };
    Promise = __webpack_require__(2);
    TypedError = __webpack_require__(6);
    ODataParser = __webpack_require__(51).ODataParser;
    OData2AbstractSQL = __webpack_require__(52).OData2AbstractSQL;
    memoize = __webpack_require__(115);
    _ = __webpack_require__(4);
    exports.TranslationError = TranslationError = function(superClass) {
        function TranslationError() {
            return TranslationError.__super__.constructor.apply(this, arguments);
        }
        extend(TranslationError, superClass);
        return TranslationError;
    }(TypedError);
    exports.ParsingError = ParsingError = function(superClass) {
        function ParsingError() {
            return ParsingError.__super__.constructor.apply(this, arguments);
        }
        extend(ParsingError, superClass);
        return ParsingError;
    }(TypedError);
    exports.BadRequestError = BadRequestError = function(superClass) {
        function BadRequestError() {
            return BadRequestError.__super__.constructor.apply(this, arguments);
        }
        extend(BadRequestError, superClass);
        return BadRequestError;
    }(TypedError);
    odataParser = ODataParser.createInstance();
    odata2AbstractSQL = {};
    memoizedOdata2AbstractSQL = function() {
        var _memoizedOdata2AbstractSQL;
        _memoizedOdata2AbstractSQL = memoize(function(vocabulary, odataQuery, method, bodyKeys) {
            var e;
            try {
                return odata2AbstractSQL[vocabulary].match(odataQuery, "Process", [ method, bodyKeys ]);
            } catch (error) {
                e = error;
                console.error("Failed to translate url: ", JSON.stringify(odataQuery, null, "\t"), method, e, e.stack);
                throw new TranslationError("Failed to translate url");
            }
        }, {
            normalizer: JSON.stringify
        });
        return function(vocabulary, odataQuery, method, body) {
            var extraBodyVars, ref, tree;
            ref = _memoizedOdata2AbstractSQL(vocabulary, odataQuery, method, _.keys(body).sort()), 
            tree = ref.tree, extraBodyVars = ref.extraBodyVars;
            _.assign(body, extraBodyVars);
            return tree;
        };
    }();
    exports.metadataEndpoints = metadataEndpoints = [ "$metadata", "$serviceroot" ];
    notParsingError = function(e) {
        return !(e instanceof ParsingError);
    };
    exports.parseODataURI = function(req) {
        return Promise.try(function() {
            var apiRoot, body, method, odata, url;
            method = req.method, url = req.url, body = req.body;
            url = url.split("/");
            apiRoot = url[1];
            if (null == apiRoot || null == odata2AbstractSQL[apiRoot]) throw new ParsingError("No such api root: '" + apiRoot + "'");
            url = "/" + url.slice(2).join("/");
            odata = odataParser.matchAll(url, "Process");
            return [ {
                method: method,
                vocabulary: apiRoot,
                resourceName: odata.tree.resource,
                odataBinds: odata.binds,
                odataQuery: odata.tree,
                values: body,
                custom: {}
            } ];
        }).catch(SyntaxError, function() {
            throw new BadRequestError("Malformed url: '" + url + "'");
        }).catch(notParsingError, function(e) {
            console.error("Failed to parse url: ", method, url, e, e.stack);
            throw new ParsingError("Failed to parse url: '" + url + "'");
        });
    };
    exports.translateUri = function(arg) {
        var abstractSqlQuery, custom, isMetadataEndpoint, method, odataBinds, odataQuery, resourceName, values, vocabulary;
        method = arg.method, vocabulary = arg.vocabulary, resourceName = arg.resourceName, 
        odataBinds = arg.odataBinds, odataQuery = arg.odataQuery, values = arg.values, custom = arg.custom;
        isMetadataEndpoint = indexOf.call(metadataEndpoints, resourceName) >= 0 || "OPTIONS" === method;
        if (!isMetadataEndpoint) {
            abstractSqlQuery = memoizedOdata2AbstractSQL(vocabulary, odataQuery, method, values);
            return {
                method: method,
                vocabulary: vocabulary,
                resourceName: resourceName,
                odataBinds: odataBinds,
                odataQuery: odataQuery,
                abstractSqlQuery: abstractSqlQuery,
                values: values,
                custom: custom
            };
        }
        return {
            method: method,
            vocabulary: vocabulary,
            resourceName: resourceName,
            custom: custom
        };
    };
    exports.addClientModel = function(vocab, clientModel) {
        odata2AbstractSQL[vocab] = OData2AbstractSQL.createInstance();
        return odata2AbstractSQL[vocab].setClientModel(clientModel);
    };
    exports.deleteClientModel = function(vocab, clientModel) {
        return delete odata2AbstractSQL[vocab];
    };
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !function(root, factory) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__, exports, __webpack_require__(28) ], 
        __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof __WEBPACK_AMD_DEFINE_FACTORY__ ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, 
        void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }(this, function(require, exports, OMeta) {
        var ODataParser = exports.ODataParser = OMeta._extend({
            Process: function() {
                var $elf = this, _fromIdx = this.input.idx, tree;
                this.reset();
                tree = this._apply("OData");
                return {
                    tree: tree,
                    binds: this.binds
                };
            },
            ProcessRule: function() {
                var $elf = this, _fromIdx = this.input.idx, result, rule;
                rule = this.anything();
                this._form(function() {
                    return result = this._applyWithArgs("apply", rule);
                });
                this._apply("end");
                return result;
            },
            OData: function() {
                var $elf = this, _fromIdx = this.input.idx, model;
                return this._or(function() {
                    model = this._apply("PathSegment");
                    this._apply("end");
                    return model;
                }, function() {
                    switch (this.anything()) {
                      case "/":
                        return this._or(function() {
                            switch (this.anything()) {
                              case "$":
                                this._applyWithArgs("exactly", "m");
                                this._applyWithArgs("exactly", "e");
                                this._applyWithArgs("exactly", "t");
                                this._applyWithArgs("exactly", "a");
                                this._applyWithArgs("exactly", "d");
                                this._applyWithArgs("exactly", "a");
                                this._applyWithArgs("exactly", "t");
                                this._applyWithArgs("exactly", "a");
                                return {
                                    resource: "$metadata"
                                };

                              default:
                                throw this._fail();
                            }
                        }, function() {
                            this._apply("end");
                            return {
                                resource: "$serviceroot"
                            };
                        });

                      default:
                        throw this._fail();
                    }
                });
            },
            QueryOptions: function() {
                var $elf = this, _fromIdx = this.input.idx, options;
                this._applyWithArgs("exactly", "?");
                options = this._applyWithArgs("listOf", "QueryOption", "&");
                return this._applyWithArgs("ParseOptionsObject", options);
            },
            QueryOption: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._apply("SortOption");
                }, function() {
                    return this._apply("TopOption");
                }, function() {
                    return this._apply("SkipOption");
                }, function() {
                    return this._apply("ExpandOption");
                }, function() {
                    return this._apply("InlineCountOption");
                }, function() {
                    return this._apply("CountOption");
                }, function() {
                    return this._apply("FilterByOption");
                }, function() {
                    return this._apply("FormatOption");
                }, function() {
                    return this._apply("SelectOption");
                }, function() {
                    return this._apply("OperationParam");
                });
            },
            OperationParam: function() {
                var $elf = this, _fromIdx = this.input.idx, name, value;
                name = this._apply("Text");
                this._applyWithArgs("exactly", "=");
                value = this._apply("Text");
                return {
                    name: name,
                    value: value
                };
            },
            SortOption: function() {
                var $elf = this, _fromIdx = this.input.idx, properties;
                this._applyWithArgs("RecognisedOption", "$orderby=");
                properties = this._applyWithArgs("listOf", "SortProperty", ",");
                return {
                    name: "$orderby",
                    value: {
                        properties: properties
                    }
                };
            },
            SortProperty: function() {
                var $elf = this, _fromIdx = this.input.idx, order, property;
                property = this._apply("PropertyPath");
                this._apply("spaces");
                order = this._or(function() {
                    switch (this.anything()) {
                      case "a":
                        this._applyWithArgs("exactly", "s");
                        this._applyWithArgs("exactly", "c");
                        return "asc";

                      case "d":
                        this._applyWithArgs("exactly", "e");
                        this._applyWithArgs("exactly", "s");
                        this._applyWithArgs("exactly", "c");
                        return "desc";

                      default:
                        throw this._fail();
                    }
                }, function() {
                    return "desc";
                });
                property.order = order;
                return property;
            },
            TopOption: function() {
                var $elf = this, _fromIdx = this.input.idx, value;
                this._applyWithArgs("RecognisedOption", "$top=");
                value = this._apply("UnsignedInteger");
                return {
                    name: "$top",
                    value: value
                };
            },
            SkipOption: function() {
                var $elf = this, _fromIdx = this.input.idx, value;
                this._applyWithArgs("RecognisedOption", "$skip=");
                value = this._apply("UnsignedInteger");
                return {
                    name: "$skip",
                    value: value
                };
            },
            InlineCountOption: function() {
                var $elf = this, _fromIdx = this.input.idx, value;
                this._applyWithArgs("RecognisedOption", "$inlinecount=");
                value = this._or(function() {
                    switch (this.anything()) {
                      case "a":
                        this._applyWithArgs("exactly", "l");
                        this._applyWithArgs("exactly", "l");
                        this._applyWithArgs("exactly", "p");
                        this._applyWithArgs("exactly", "a");
                        this._applyWithArgs("exactly", "g");
                        this._applyWithArgs("exactly", "e");
                        this._applyWithArgs("exactly", "s");
                        return "allpages";

                      case "n":
                        this._applyWithArgs("exactly", "o");
                        this._applyWithArgs("exactly", "n");
                        this._applyWithArgs("exactly", "e");
                        return "none";

                      default:
                        throw this._fail();
                    }
                }, function() {
                    this._apply("Text");
                    return "";
                });
                return {
                    name: "$inlinecount",
                    value: value
                };
            },
            CountOption: function() {
                var $elf = this, _fromIdx = this.input.idx, value;
                this._applyWithArgs("RecognisedOption", "$count=");
                value = this._apply("Boolean");
                return {
                    name: "$count",
                    value: value
                };
            },
            ExpandOption: function() {
                var $elf = this, _fromIdx = this.input.idx, properties;
                this._applyWithArgs("RecognisedOption", "$expand=");
                properties = this._apply("ExpandPropertyPathList");
                return {
                    name: "$expand",
                    value: {
                        properties: properties
                    }
                };
            },
            SelectOption: function() {
                var $elf = this, _fromIdx = this.input.idx, properties, value;
                this._applyWithArgs("RecognisedOption", "$select=");
                value = this._or(function() {
                    switch (this.anything()) {
                      case "*":
                        return "*";

                      default:
                        throw this._fail();
                    }
                }, function() {
                    properties = this._apply("PropertyPathList");
                    return {
                        properties: properties
                    };
                });
                return {
                    name: "$select",
                    value: value
                };
            },
            FilterByOption: function() {
                var $elf = this, _fromIdx = this.input.idx, expr;
                this._applyWithArgs("RecognisedOption", "$filter=");
                expr = this._apply("FilterByExpression");
                return {
                    name: "$filter",
                    value: expr
                };
            },
            FormatOption: function() {
                var $elf = this, _fromIdx = this.input.idx, type;
                this._applyWithArgs("RecognisedOption", "$format=");
                type = this._apply("ContentType");
                return {
                    name: "$format",
                    value: type
                };
            },
            RecognisedOption: function(name) {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("seq", name);
            },
            FilterByExpression: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._apply("FilterAndExpression");
            },
            FilterAndExpression: function() {
                var $elf = this, _fromIdx = this.input.idx, lhs, op, rhs;
                return this._or(function() {
                    lhs = this._apply("FilterAndExpression");
                    op = this._apply("FilterAndOperand");
                    rhs = this._apply("FilterLogicalExpression");
                    return this._or(function() {
                        this._pred(op == lhs[0]);
                        return [ op ].concat(lhs.slice(1), [ rhs ]);
                    }, function() {
                        return [ op, lhs, rhs ];
                    });
                }, function() {
                    return this._apply("FilterLogicalExpression");
                });
            },
            FilterLogicalExpression: function() {
                var $elf = this, _fromIdx = this.input.idx, lhs, op, rhs;
                return this._or(function() {
                    lhs = this._apply("FilterLogicalExpression");
                    op = this._apply("FilterByOperand");
                    rhs = this._apply("FilterSubExpression");
                    return [ op, lhs, rhs ];
                }, function() {
                    return this._apply("FilterSubExpression");
                });
            },
            FilterSubExpression: function() {
                var $elf = this, _fromIdx = this.input.idx, lhs, op, rhs;
                return this._or(function() {
                    lhs = this._apply("FilterSubExpression");
                    this._apply("spaces");
                    op = this._applyWithArgs("FilterRecognisedMathOperand", "sub");
                    this._apply("spaces");
                    rhs = this._apply("FilterAddExpression");
                    return [ op, lhs, rhs ];
                }, function() {
                    return this._apply("FilterAddExpression");
                });
            },
            FilterAddExpression: function() {
                var $elf = this, _fromIdx = this.input.idx, lhs, op, rhs;
                return this._or(function() {
                    lhs = this._apply("FilterAddExpression");
                    this._apply("spaces");
                    op = this._applyWithArgs("FilterRecognisedMathOperand", "add");
                    this._apply("spaces");
                    rhs = this._apply("FilterModExpression");
                    return [ op, lhs, rhs ];
                }, function() {
                    return this._apply("FilterModExpression");
                });
            },
            FilterModExpression: function() {
                var $elf = this, _fromIdx = this.input.idx, lhs, op, rhs;
                return this._or(function() {
                    lhs = this._apply("FilterModExpression");
                    this._apply("spaces");
                    op = this._applyWithArgs("FilterRecognisedMathOperand", "mod");
                    this._apply("spaces");
                    rhs = this._apply("FilterDivExpression");
                    return [ op, lhs, rhs ];
                }, function() {
                    return this._apply("FilterDivExpression");
                });
            },
            FilterDivExpression: function() {
                var $elf = this, _fromIdx = this.input.idx, lhs, op, rhs;
                return this._or(function() {
                    lhs = this._apply("FilterDivExpression");
                    this._apply("spaces");
                    op = this._applyWithArgs("FilterRecognisedMathOperand", "div");
                    this._apply("spaces");
                    rhs = this._apply("FilterMulExpression");
                    return [ op, lhs, rhs ];
                }, function() {
                    return this._apply("FilterMulExpression");
                });
            },
            FilterMulExpression: function() {
                var $elf = this, _fromIdx = this.input.idx, lhs, op, rhs;
                return this._or(function() {
                    lhs = this._apply("FilterMulExpression");
                    this._apply("spaces");
                    op = this._applyWithArgs("FilterRecognisedMathOperand", "mul");
                    this._apply("spaces");
                    rhs = this._apply("FilterByValue");
                    return [ op, lhs, rhs ];
                }, function() {
                    return this._apply("FilterByValue");
                });
            },
            FilterByValue: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._apply("FilterMethodCallExpression");
                }, function() {
                    return this._apply("FilterNegateExpression");
                }, function() {
                    return this._apply("NumberBind");
                }, function() {
                    return this._apply("Null");
                }, function() {
                    return this._apply("BooleanBind");
                }, function() {
                    return this._apply("QuotedTextBind");
                }, function() {
                    return this._apply("DateBind");
                }, function() {
                    return this._apply("Duration");
                }, function() {
                    return this._apply("LambdaPropertyPath");
                }, function() {
                    return this._apply("PropertyPath");
                }, function() {
                    return this._apply("GroupedPrecedenceExpression");
                });
            },
            GroupedPrecedenceExpression: function() {
                var $elf = this, _fromIdx = this.input.idx, expr;
                this._applyWithArgs("exactly", "(");
                this._apply("spaces");
                expr = this._apply("FilterByExpression");
                this._apply("spaces");
                this._applyWithArgs("exactly", ")");
                return expr;
            },
            FilterRecognisedMathOperand: function(name) {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("seq", name);
            },
            FilterAndOperand: function() {
                var $elf = this, _fromIdx = this.input.idx, op;
                this._apply("spaces");
                op = function() {
                    switch (this.anything()) {
                      case "a":
                        this._applyWithArgs("exactly", "n");
                        this._applyWithArgs("exactly", "d");
                        return "and";

                      case "o":
                        this._applyWithArgs("exactly", "r");
                        return "or";

                      default:
                        throw this._fail();
                    }
                }.call(this);
                this._apply("spaces");
                return op;
            },
            FilterByOperand: function() {
                var $elf = this, _fromIdx = this.input.idx, op;
                this._apply("spaces");
                op = function() {
                    switch (this.anything()) {
                      case "e":
                        this._applyWithArgs("exactly", "q");
                        return "eq";

                      case "g":
                        switch (this.anything()) {
                          case "e":
                            return "ge";

                          case "t":
                            return "gt";

                          default:
                            throw this._fail();
                        }

                      case "l":
                        switch (this.anything()) {
                          case "e":
                            return "le";

                          case "t":
                            return "lt";

                          default:
                            throw this._fail();
                        }

                      case "n":
                        this._applyWithArgs("exactly", "e");
                        return "ne";

                      default:
                        throw this._fail();
                    }
                }.call(this);
                this._apply("spaces");
                return op;
            },
            FilterNegateExpression: function() {
                var $elf = this, _fromIdx = this.input.idx, expr, value;
                this._apply("spaces");
                this._applyWithArgs("exactly", "n");
                this._applyWithArgs("exactly", "o");
                this._applyWithArgs("exactly", "t");
                this._apply("spaces");
                value = this._or(function() {
                    return this._apply("FilterByValue");
                }, function() {
                    switch (this.anything()) {
                      case "(":
                        this._apply("spaces");
                        expr = this._apply("FilterByExpression");
                        this._apply("spaces");
                        this._applyWithArgs("exactly", ")");
                        return expr;

                      default:
                        throw this._fail();
                    }
                });
                return [ "not", value ];
            },
            FilterMethodCallExpression: function() {
                var $elf = this, _fromIdx = this.input.idx, method;
                method = this._or(function() {
                    return this._apply("ContainsMethodCall");
                }, function() {
                    return this._apply("EndsWithMethodCall");
                }, function() {
                    return this._apply("StartsWithMethodCall");
                }, function() {
                    return this._apply("LengthMethodCall");
                }, function() {
                    return this._apply("IndexOfMethodCall");
                }, function() {
                    return this._apply("SubstringMethodCall");
                }, function() {
                    return this._apply("ToLowerMethodCall");
                }, function() {
                    return this._apply("ToUpperMethodCall");
                }, function() {
                    return this._apply("TrimMethodCall");
                }, function() {
                    return this._apply("ConcatMethodCall");
                }, function() {
                    return this._apply("YearMethodCall");
                }, function() {
                    return this._apply("MonthMethodCall");
                }, function() {
                    return this._apply("DayMethodCall");
                }, function() {
                    return this._apply("HourMethodCall");
                }, function() {
                    return this._apply("MinuteMethodCall");
                }, function() {
                    return this._apply("SecondMethodCall");
                }, function() {
                    return this._apply("FractionalSecondsMethodCall");
                }, function() {
                    return this._apply("DateMethodCall");
                }, function() {
                    return this._apply("TimeMethodCall");
                }, function() {
                    return this._apply("TotalOffsetMinutesMethodCall");
                }, function() {
                    return this._apply("NowMethodCall");
                }, function() {
                    return this._apply("MaxDateTimeMethodCall");
                }, function() {
                    return this._apply("MinDateTimeMethodCall");
                }, function() {
                    return this._apply("TotalSecondsMethodCall");
                }, function() {
                    return this._apply("RoundMethodCall");
                }, function() {
                    return this._apply("FloorMethodCall");
                }, function() {
                    return this._apply("CeilingMethodCall");
                }, function() {
                    return this._apply("IsOfMethodCall");
                }, function() {
                    return this._apply("CastMethodCall");
                }, function() {
                    return this._apply("SubstringOfMethodCall");
                }, function() {
                    return this._apply("ReplaceMethodCall");
                });
                return [ "call", method ];
            },
            ContainsMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("MethodCall", "contains", 2);
            },
            EndsWithMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("MethodCall", "endswith", 2);
            },
            StartsWithMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("MethodCall", "startswith", 2);
            },
            LengthMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("MethodCall", "length", 1);
            },
            IndexOfMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("MethodCall", "indexof", 2);
            },
            SubstringMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._applyWithArgs("MethodCall", "substring", 2);
                }, function() {
                    return this._applyWithArgs("MethodCall", "substring", 3);
                });
            },
            ToLowerMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("MethodCall", "tolower", 1);
            },
            ToUpperMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("MethodCall", "toupper", 1);
            },
            TrimMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("MethodCall", "trim", 1);
            },
            ConcatMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("MethodCall", "concat", 2);
            },
            YearMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("MethodCall", "year", 1);
            },
            MonthMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("MethodCall", "month", 1);
            },
            DayMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("MethodCall", "day", 1);
            },
            HourMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("MethodCall", "hour", 1);
            },
            MinuteMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("MethodCall", "minute", 1);
            },
            SecondMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("MethodCall", "second", 1);
            },
            FractionalSecondsMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("MethodCall", "fractionalseconds", 1);
            },
            DateMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("MethodCall", "date", 1);
            },
            TimeMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("MethodCall", "time", 1);
            },
            TotalOffsetMinutesMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("MethodCall", "totaloffsetminutes", 1);
            },
            NowMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("MethodCall", "now", 0);
            },
            MaxDateTimeMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("MethodCall", "maxdatetime", 0);
            },
            MinDateTimeMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("MethodCall", "mindatetime", 0);
            },
            TotalSecondsMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("MethodCall", "totalseconds", 1);
            },
            RoundMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("MethodCall", "round", 1);
            },
            FloorMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("MethodCall", "floor", 1);
            },
            CeilingMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("MethodCall", "ceiling", 1);
            },
            IsOfMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._applyWithArgs("MethodCall", "isof", 1);
                }, function() {
                    return this._applyWithArgs("MethodCall", "isof", 2);
                });
            },
            CastMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._applyWithArgs("MethodCall", "cast", 1);
                }, function() {
                    return this._applyWithArgs("MethodCall", "cast", 2);
                });
            },
            SubstringOfMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("MethodCall", "substringof", 2);
            },
            ReplaceMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("MethodCall", "replace", 3);
            },
            MethodCall: function(name, arity) {
                var $elf = this, _fromIdx = this.input.idx, args;
                this._applyWithArgs("seq", name);
                this._applyWithArgs("exactly", "(");
                this._apply("spaces");
                args = this._applyWithArgs("numberOf", "FilterByExpression", arity, ",");
                this._apply("spaces");
                this._applyWithArgs("exactly", ")");
                return {
                    args: args,
                    method: name
                };
            },
            LambdaMethodCall: function() {
                var $elf = this, _fromIdx = this.input.idx, expression, identifier, name;
                name = function() {
                    switch (this.anything()) {
                      case "a":
                        switch (this.anything()) {
                          case "l":
                            this._applyWithArgs("exactly", "l");
                            return "all";

                          case "n":
                            this._applyWithArgs("exactly", "y");
                            return "any";

                          default:
                            throw this._fail();
                        }

                      default:
                        throw this._fail();
                    }
                }.call(this);
                this._applyWithArgs("exactly", "(");
                this._apply("spaces");
                identifier = this._apply("ResourceName");
                this._applyWithArgs("exactly", ":");
                expression = this._apply("FilterByExpression");
                this._apply("spaces");
                this._applyWithArgs("exactly", ")");
                return {
                    expression: expression,
                    identifier: identifier,
                    method: name
                };
            },
            PropertyPathList: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("listOf", "PropertyPath", ",");
            },
            PropertyPath: function() {
                var $elf = this, _fromIdx = this.input.idx, next, resource;
                resource = this._apply("ResourceName");
                this._opt(function() {
                    this._applyWithArgs("exactly", "/");
                    return next = this._apply("PropertyPath");
                });
                return {
                    name: resource,
                    property: next
                };
            },
            ExpandPropertyPathList: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._applyWithArgs("listOf", "ExpandPropertyPath", ",");
            },
            ExpandPropertyPath: function() {
                var $elf = this, _fromIdx = this.input.idx, count, next, options, optionsObj, resource;
                resource = this._apply("ResourceName");
                count = this._opt(function() {
                    this._applyWithArgs("exactly", "/");
                    this._applyWithArgs("exactly", "$");
                    this._applyWithArgs("exactly", "c");
                    this._applyWithArgs("exactly", "o");
                    this._applyWithArgs("exactly", "u");
                    this._applyWithArgs("exactly", "n");
                    this._applyWithArgs("exactly", "t");
                    return !0;
                });
                this._opt(function() {
                    this._applyWithArgs("exactly", "(");
                    options = this._applyWithArgs("listOf", "ExpandPathOption", "&");
                    optionsObj = this._applyWithArgs("ParseOptionsObject", options);
                    return this._applyWithArgs("exactly", ")");
                });
                this._opt(function() {
                    this._applyWithArgs("exactly", "/");
                    return next = this._apply("PropertyPath");
                });
                return {
                    name: resource,
                    property: next,
                    count: count,
                    options: optionsObj
                };
            },
            ExpandPathOption: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._apply("SortOption");
                }, function() {
                    return this._apply("TopOption");
                }, function() {
                    return this._apply("SkipOption");
                }, function() {
                    return this._apply("ExpandOption");
                }, function() {
                    return this._apply("InlineCountOption");
                }, function() {
                    return this._apply("CountOption");
                }, function() {
                    return this._apply("FilterByOption");
                }, function() {
                    return this._apply("FormatOption");
                }, function() {
                    return this._apply("SelectOption");
                }, function() {
                    return this._apply("OperationParam");
                });
            },
            LambdaPropertyPath: function() {
                var $elf = this, _fromIdx = this.input.idx, lambda, next, resource;
                resource = this._apply("ResourceName");
                this._applyWithArgs("exactly", "/");
                return this._or(function() {
                    next = this._apply("LambdaPropertyPath");
                    return {
                        name: resource,
                        property: next
                    };
                }, function() {
                    lambda = this._apply("LambdaMethodCall");
                    return {
                        name: resource,
                        lambda: lambda
                    };
                });
            },
            Key: function() {
                var $elf = this, _fromIdx = this.input.idx, key;
                this._applyWithArgs("exactly", "(");
                key = this._or(function() {
                    return this._apply("NumberBind");
                }, function() {
                    return this._apply("QuotedTextBind");
                });
                this._applyWithArgs("exactly", ")");
                return key;
            },
            PathSegment: function() {
                var $elf = this, _fromIdx = this.input.idx, count, key, link, next, options, resource;
                this._applyWithArgs("exactly", "/");
                resource = this._apply("ResourceName");
                this._opt(function() {
                    return this._or(function() {
                        key = this._apply("Key");
                        return this._opt(function() {
                            return this._or(function() {
                                switch (this.anything()) {
                                  case "/":
                                    this._applyWithArgs("exactly", "$");
                                    this._applyWithArgs("exactly", "l");
                                    this._applyWithArgs("exactly", "i");
                                    this._applyWithArgs("exactly", "n");
                                    this._applyWithArgs("exactly", "k");
                                    this._applyWithArgs("exactly", "s");
                                    return link = this._apply("SubPathSegment");

                                  default:
                                    throw this._fail();
                                }
                            }, function() {
                                return next = this._apply("SubPathSegment");
                            });
                        });
                    }, function() {
                        return count = this._opt(function() {
                            this._applyWithArgs("exactly", "/");
                            this._applyWithArgs("exactly", "$");
                            this._applyWithArgs("exactly", "c");
                            this._applyWithArgs("exactly", "o");
                            this._applyWithArgs("exactly", "u");
                            this._applyWithArgs("exactly", "n");
                            this._applyWithArgs("exactly", "t");
                            return !0;
                        });
                    });
                });
                options = this._opt(function() {
                    return this._apply("QueryOptions");
                });
                return {
                    resource: resource,
                    key: key,
                    link: link,
                    property: next,
                    count: count,
                    options: options
                };
            },
            SubPathSegment: function() {
                var $elf = this, _fromIdx = this.input.idx, count, key, link, next, options, resource;
                this._applyWithArgs("exactly", "/");
                resource = this._apply("ResourceName");
                key = this._opt(function() {
                    return this._apply("Key");
                });
                this._opt(function() {
                    return this._or(function() {
                        switch (this.anything()) {
                          case "/":
                            this._applyWithArgs("exactly", "$");
                            this._applyWithArgs("exactly", "l");
                            this._applyWithArgs("exactly", "i");
                            this._applyWithArgs("exactly", "n");
                            this._applyWithArgs("exactly", "k");
                            this._applyWithArgs("exactly", "s");
                            return link = this._apply("SubPathSegment");

                          default:
                            throw this._fail();
                        }
                    }, function() {
                        return next = this._apply("SubPathSegment");
                    });
                });
                count = this._opt(function() {
                    this._applyWithArgs("exactly", "/");
                    this._applyWithArgs("exactly", "$");
                    this._applyWithArgs("exactly", "c");
                    this._applyWithArgs("exactly", "o");
                    this._applyWithArgs("exactly", "u");
                    this._applyWithArgs("exactly", "n");
                    this._applyWithArgs("exactly", "t");
                    return !0;
                });
                options = this._opt(function() {
                    return this._apply("QueryOptions");
                });
                return {
                    resource: resource,
                    key: key,
                    link: link,
                    property: next,
                    count: count,
                    options: options
                };
            },
            ContentType: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._consumedBy(function() {
                    this._many1(function() {
                        return this._apply("letter");
                    });
                    this._applyWithArgs("exactly", "/");
                    this._many1(function() {
                        return this._apply("letter");
                    });
                    return this._opt(function() {
                        this._applyWithArgs("exactly", "+");
                        return this._many1(function() {
                            return this._apply("letter");
                        });
                    });
                });
            },
            ResourceName: function() {
                var $elf = this, _fromIdx = this.input.idx, resourceName;
                resourceName = this._consumedBy(function() {
                    return this._many1(function() {
                        this._not(function() {
                            return this._or(function() {
                                return this._apply("ReservedUriComponent");
                            }, function() {
                                return this._apply("space");
                            });
                        });
                        return this.anything();
                    });
                });
                return decodeURIComponent(resourceName);
            },
            Number: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._apply("Decimal");
                }, function() {
                    return this._apply("Integer");
                });
            },
            Decimal: function() {
                var $elf = this, _fromIdx = this.input.idx, d, sign;
                sign = this._apply("Sign");
                d = this._consumedBy(function() {
                    this._many1(function() {
                        return this._apply("digit");
                    });
                    this._applyWithArgs("exactly", ".");
                    return this._many1(function() {
                        return this._apply("digit");
                    });
                });
                return Number(sign + d);
            },
            Integer: function() {
                var $elf = this, _fromIdx = this.input.idx, d, sign;
                sign = this._apply("Sign");
                d = this._consumedBy(function() {
                    return this._many1(function() {
                        return this._apply("digit");
                    });
                });
                return parseInt(sign + d, 10);
            },
            UnsignedInteger: function() {
                var $elf = this, _fromIdx = this.input.idx, d;
                d = this._consumedBy(function() {
                    return this._many1(function() {
                        return this._apply("digit");
                    });
                });
                return parseInt(d, 10);
            },
            Null: function() {
                var $elf = this, _fromIdx = this.input.idx;
                this._applyWithArgs("exactly", "n");
                this._applyWithArgs("exactly", "u");
                this._applyWithArgs("exactly", "l");
                this._applyWithArgs("exactly", "l");
                return null;
            },
            Boolean: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._apply("True");
                }, function() {
                    return this._apply("False");
                });
            },
            True: function() {
                var $elf = this, _fromIdx = this.input.idx;
                this._applyWithArgs("exactly", "t");
                this._applyWithArgs("exactly", "r");
                this._applyWithArgs("exactly", "u");
                this._applyWithArgs("exactly", "e");
                return !0;
            },
            False: function() {
                var $elf = this, _fromIdx = this.input.idx;
                this._applyWithArgs("exactly", "f");
                this._applyWithArgs("exactly", "a");
                this._applyWithArgs("exactly", "l");
                this._applyWithArgs("exactly", "s");
                this._applyWithArgs("exactly", "e");
                return !1;
            },
            Duration: function() {
                var $elf = this, _fromIdx = this.input.idx, day, hour, minute, second, sign, timeExists;
                this._applyWithArgs("exactly", "d");
                this._applyWithArgs("exactly", "u");
                this._applyWithArgs("exactly", "r");
                this._applyWithArgs("exactly", "a");
                this._applyWithArgs("exactly", "t");
                this._applyWithArgs("exactly", "i");
                this._applyWithArgs("exactly", "o");
                this._applyWithArgs("exactly", "n");
                this._apply("Apostrophe");
                sign = this._apply("Sign");
                this._applyWithArgs("exactly", "P");
                day = this._opt(function() {
                    return this._applyWithArgs("DurationInteger", "D");
                });
                timeExists = this._opt(function() {
                    this._applyWithArgs("exactly", "T");
                    hour = this._opt(function() {
                        return this._applyWithArgs("DurationInteger", "H");
                    });
                    minute = this._opt(function() {
                        return this._applyWithArgs("DurationInteger", "M");
                    });
                    second = this._opt(function() {
                        return this._applyWithArgs("DurationNumber", "S");
                    });
                    return this._pred(hour || minute || second);
                });
                this._pred(day || timeExists);
                this._apply("Apostrophe");
                return {
                    negative: "-" == sign,
                    day: day,
                    hour: hour,
                    minute: minute,
                    second: second
                };
            },
            DurationInteger: function(letter) {
                var $elf = this, _fromIdx = this.input.idx, n;
                n = this._apply("UnsignedInteger");
                this._applyWithArgs("exactly", letter);
                return n;
            },
            DurationNumber: function(letter) {
                var $elf = this, _fromIdx = this.input.idx, d;
                return this._or(function() {
                    return this._applyWithArgs("DurationInteger", letter);
                }, function() {
                    d = this._consumedBy(function() {
                        this._many1(function() {
                            return this._apply("digit");
                        });
                        this._applyWithArgs("exactly", ".");
                        return this._many1(function() {
                            return this._apply("digit");
                        });
                    });
                    this._applyWithArgs("exactly", letter);
                    return Number(d);
                });
            },
            ReservedUriComponent: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._apply("GenDelim");
                }, function() {
                    return this._apply("SubDelim");
                });
            },
            GenDelim: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return function() {
                    switch (this.anything()) {
                      case "#":
                        return "#";

                      case "/":
                        return "/";

                      case ":":
                        return ":";

                      case "?":
                        return "?";

                      case "@":
                        return "@";

                      case "[":
                        return "[";

                      case "]":
                        return "]";

                      default:
                        throw this._fail();
                    }
                }.call(this);
            },
            SubDelim: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    switch (this.anything()) {
                      case "!":
                        return "!";

                      case "$":
                        return "$";

                      case "*":
                        return "*";

                      default:
                        throw this._fail();
                    }
                }, function() {
                    return this._apply("Apostrophe");
                }, function() {
                    switch (this.anything()) {
                      case "&":
                        return "&";

                      case "(":
                        return "(";

                      case ")":
                        return ")";

                      case "+":
                        return "+";

                      case ",":
                        return ",";

                      case ";":
                        return ";";

                      case "=":
                        return "=";

                      default:
                        throw this._fail();
                    }
                });
            },
            Text: function() {
                var $elf = this, _fromIdx = this.input.idx, text;
                text = this._consumedBy(function() {
                    return this._many(function() {
                        this._not(function() {
                            return this._apply("ReservedUriComponent");
                        });
                        return this.anything();
                    });
                });
                return decodeURIComponent(text);
            },
            Sign: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    switch (this.anything()) {
                      case "%":
                        this._applyWithArgs("exactly", "2");
                        this._applyWithArgs("exactly", "B");
                        return "+";

                      case "+":
                        return "+";

                      case "-":
                        return "-";

                      default:
                        throw this._fail();
                    }
                }, function() {
                    return "";
                });
            },
            Apostrophe: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return function() {
                    switch (this.anything()) {
                      case "%":
                        this._applyWithArgs("exactly", "2");
                        this._applyWithArgs("exactly", "7");
                        return "'";

                      case "'":
                        return "'";

                      default:
                        throw this._fail();
                    }
                }.call(this);
            },
            QuotedText: function() {
                var $elf = this, _fromIdx = this.input.idx, text;
                this._apply("Apostrophe");
                text = this._many(function() {
                    return this._or(function() {
                        this._apply("Apostrophe");
                        return this._apply("Apostrophe");
                    }, function() {
                        this._not(function() {
                            return this._apply("Apostrophe");
                        });
                        return this.anything();
                    });
                });
                this._apply("Apostrophe");
                return decodeURIComponent(text.join(""));
            },
            space: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return OMeta._superApplyWithArgs(this, "space");
                }, function() {
                    switch (this.anything()) {
                      case "%":
                        this._applyWithArgs("exactly", "2");
                        this._applyWithArgs("exactly", "0");
                        return " ";

                      default:
                        throw this._fail();
                    }
                });
            },
            Bind: function(type, value) {
                var $elf = this, _fromIdx = this.input.idx;
                this.binds.push([ type, value ]);
                return {
                    bind: this.binds.length - 1
                };
            },
            NumberBind: function() {
                var $elf = this, _fromIdx = this.input.idx, n;
                n = this._apply("Number");
                return this._applyWithArgs("Bind", "Real", n);
            },
            DateBind: function() {
                var $elf = this, _fromIdx = this.input.idx, date, type;
                type = function() {
                    switch (this.anything()) {
                      case "d":
                        switch (this.anything()) {
                          case "a":
                            switch (this.anything()) {
                              case "t":
                                switch (this.anything()) {
                                  case "e":
                                    return this._or(function() {
                                        switch (this.anything()) {
                                          case "t":
                                            this._applyWithArgs("exactly", "i");
                                            this._applyWithArgs("exactly", "m");
                                            this._applyWithArgs("exactly", "e");
                                            return "Date Time";

                                          default:
                                            throw this._fail();
                                        }
                                    }, function() {
                                        "date";
                                        return "Date";
                                    });

                                  default:
                                    throw this._fail();
                                }

                              default:
                                throw this._fail();
                            }

                          default:
                            throw this._fail();
                        }

                      default:
                        throw this._fail();
                    }
                }.call(this);
                date = this._apply("QuotedText");
                date = Date.parse(date);
                this._pred(!isNaN(date));
                return this._applyWithArgs("Bind", type, date);
            },
            BooleanBind: function() {
                var $elf = this, _fromIdx = this.input.idx, b;
                b = this._apply("Boolean");
                return this._applyWithArgs("Bind", "Boolean", b);
            },
            QuotedTextBind: function() {
                var $elf = this, _fromIdx = this.input.idx, t;
                t = this._apply("QuotedText");
                return this._applyWithArgs("Bind", "Text", t);
            }
        });
        ODataParser.initialize = ODataParser.reset = function() {
            this.binds = [];
        };
        ODataParser.ParseOptionsObject = function(options) {
            var optionsObj = {};
            for (var i in options) optionsObj[options[i].name] = options[i].value;
            return optionsObj;
        };
        ODataParser.numberOf = function(rule, count, separator) {
            if (0 === count) return [];
            for (var ret = [], i = 1; count > i; i++) {
                ret.push(this._apply(rule));
                this._apply("spaces");
                this._applyWithArgs("exactly", separator);
                this._apply("spaces");
            }
            ret.push(this._apply(rule));
            return ret;
        };
        ODataParser._enableTokens = function() {
            OMeta._enableTokens.call(this, [ "Text", "ResourceName", "Number", "RecognisedOption", "FilterAndOperand", "FilterByOperand", "FilterRecognisedMathOperand" ]);
        };
    });
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !function(root, factory) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__, exports, __webpack_require__(28), __webpack_require__(4), __webpack_require__(53) ], 
        __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof __WEBPACK_AMD_DEFINE_FACTORY__ ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, 
        void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }(this, function(require, exports, OMeta) {
        var _ = __webpack_require__(4), memoize = __webpack_require__(53), Query = function() {
            _.extend(this, {
                select: [],
                from: [],
                where: [],
                extras: []
            });
        };
        Query.prototype.merge = function(otherQuery) {
            this.select = this.select.concat(otherQuery.select);
            this.from = this.from.concat(otherQuery.from);
            this.where = this.where.concat(otherQuery.where);
            this.extras = this.extras.concat(otherQuery.extras);
        };
        Query.prototype.fromResource = function(resource) {
            resource.tableName !== resource.tableAlias ? this.from.push([ resource.tableName, resource.tableAlias ]) : this.from.push(resource.tableName);
        };
        Query.prototype.compile = function(queryType) {
            var compiled = [ queryType ], where = this.where;
            "SelectQuery" === queryType && compiled.push([ "Select", this.select ]);
            _.each(this.from, function(tableName) {
                compiled.push([ "From", tableName ]);
            });
            if (where.length > 0) {
                where.length > 1 && (where = [ [ "And" ].concat(where) ]);
                compiled.push([ "Where" ].concat(where));
            }
            return compiled.concat(this.extras);
        };
        var OData2AbstractSQL = exports.OData2AbstractSQL = OMeta._extend({
            Process: function(method, bodyKeys) {
                var $elf = this, _fromIdx = this.input.idx, insertQuery, path, query, queryType, tree;
                path = this.anything();
                this._apply("end");
                tree = this._or(function() {
                    this._pred(_.isEmpty(path));
                    return [ "$serviceroot" ];
                }, function() {
                    this._pred(_.includes([ "$metadata", "$serviceroot" ], path.resource));
                    return [ path.resource ];
                }, function() {
                    this.reset();
                    query = this._applyWithArgs("PathSegment", method, bodyKeys, path);
                    return this._or(function() {
                        this._pred("PUT" == method);
                        this.reset();
                        insertQuery = this._applyWithArgs("PathSegment", "PUT-INSERT", bodyKeys, path);
                        return [ "UpsertQuery", insertQuery.compile("InsertQuery"), query.compile("UpdateQuery") ];
                    }, function() {
                        queryType = this._or(function() {
                            this._pred("GET" == method);
                            return "SelectQuery";
                        }, function() {
                            this._pred("PATCH" == method || "MERGE" == method);
                            return "UpdateQuery";
                        }, function() {
                            this._pred("POST" == method);
                            return "InsertQuery";
                        }, function() {
                            this._pred("DELETE" == method);
                            return "DeleteQuery";
                        });
                        return query.compile(queryType);
                    });
                });
                return {
                    tree: tree,
                    extraBodyVars: this.extraBodyVars
                };
            },
            PathSegment: function(method, bodyKeys, path) {
                var $elf = this, _fromIdx = this.input.idx, aliasedField, bindVars, childQuery, linkResource, navigationWhere, propertyResource, query, referencedField, referencedIdField, resource, resourceMapping, subQuery, valuesIndex;
                this._pred(path.resource);
                resource = this._applyWithArgs("Resource", path.resource, this.defaultResource);
                this.defaultResource = resource;
                query = new Query();
                query.fromResource(resource);
                referencedIdField = [ "ReferencedField", resource.tableAlias, resource.idField ];
                this._applyWithArgs("PathKey", path, query, resource, referencedIdField, bodyKeys);
                this._or(function() {
                    return this._pred(!path.options);
                }, function() {
                    return this._pred(!path.options.$expand);
                }, function() {
                    return this._applyWithArgs("Expands", resource, query, path.options.$expand.properties);
                });
                this._or(function() {
                    this._pred(path.property);
                    childQuery = this._applyWithArgs("PathSegment", method, bodyKeys, path.property);
                    query.merge(childQuery);
                    this._or(function() {
                        return this._pred(path.property.resource);
                    }, function() {
                        return function() {
                            throw new Error("PathSegment has a property without a resource?");
                        }.call(this);
                    });
                    propertyResource = this._applyWithArgs("Resource", path.property.resource, resource);
                    navigationWhere = this._applyWithArgs("NavigateResources", resource, propertyResource);
                    return query.where.push(navigationWhere);
                }, function() {
                    this._pred(path.link);
                    this._or(function() {
                        return this._pred(path.link.resource);
                    }, function() {
                        return function() {
                            throw new Error("PathSegment has a link without a resource?");
                        }.call(this);
                    });
                    linkResource = this._applyWithArgs("Resource", path.link.resource, resource);
                    aliasedField = this._or(function() {
                        this._applyWithArgs("FieldContainedIn", linkResource.resourceName, resource);
                        referencedField = this._applyWithArgs("ReferencedField", resource, linkResource.resourceName);
                        return [ referencedField, linkResource.resourceName ];
                    }, function() {
                        this._applyWithArgs("FieldContainedIn", resource.resourceName, linkResource);
                        referencedField = this._applyWithArgs("ReferencedField", linkResource, resource.resourceName);
                        return [ referencedField, resource.resourceName ];
                    }, function() {
                        return function() {
                            throw new Error("Cannot navigate links");
                        }.call(this);
                    });
                    this._applyWithArgs("PathKey", path.link, query, linkResource, referencedField, bodyKeys);
                    return query.select.push(aliasedField);
                }, function() {
                    this._pred("PUT" == method || "PUT-INSERT" == method || "POST" == method || "PATCH" == method || "MERGE" == method);
                    resourceMapping = this._applyWithArgs("ResourceMapping", resource);
                    bindVars = this._applyWithArgs("BindVars", method, bodyKeys, resource.resourceName, _.toPairs(resourceMapping));
                    query.extras.push([ "Fields", _.map(bindVars, 0) ]);
                    return query.extras.push([ "Values", _.map(bindVars, 1) ]);
                }, function() {
                    return this._applyWithArgs("AddCountField", path, query, resource);
                }, function() {
                    return this._applyWithArgs("AddSelectFields", path, query, resource);
                });
                this._or(function() {
                    return this._pred(!path.options);
                }, function() {
                    this._or(function() {
                        return this._pred(!path.options.$filter);
                    }, function() {
                        this._pred("POST" == method || "PUT-INSERT" == method);
                        subQuery = this._applyWithArgs("InsertFilter", path.options.$filter, resource, bindVars);
                        valuesIndex = _.findIndex(query.extras, {
                            0: "Values"
                        });
                        return query.extras[valuesIndex] = [ "Values", subQuery.compile("SelectQuery") ];
                    }, function() {
                        this._pred("PUT" == method || "PATCH" == method || "MERGE" == method || "DELETE" == method);
                        subQuery = this._applyWithArgs("UpdateFilter", path.options.$filter, resource, referencedIdField);
                        return query.where.push([ "In", referencedIdField, subQuery.compile("SelectQuery") ]);
                    }, function() {
                        return this._applyWithArgs("SelectFilter", path.options.$filter, query, resource);
                    });
                    return this._applyWithArgs("AddExtraQueryOptions", resource, path, query);
                });
                return query;
            },
            PathKey: function(path, query, resource, referencedField, bodyKeys) {
                var $elf = this, _fromIdx = this.input.idx, key, qualifiedIDField;
                return this._or(function() {
                    return this._pred(null == path.key);
                }, function() {
                    qualifiedIDField = resource.resourceName + "." + resource.idField;
                    this._opt(function() {
                        this._pred(!_.includes(bodyKeys, qualifiedIDField) && !_.includes(bodyKeys, resource.idField));
                        bodyKeys.push(qualifiedIDField);
                        return this.extraBodyVars[qualifiedIDField] = path.key;
                    });
                    key = this._or(function() {
                        return this._applyWithArgs("Bind", path.key);
                    }, function() {
                        return this._applyWithArgs("Number", path.key);
                    }, function() {
                        return this._applyWithArgs("Text", path.key);
                    });
                    return query.where.push([ "Equals", referencedField, key ]);
                });
            },
            Bind: function() {
                var $elf = this, _fromIdx = this.input.idx, bind;
                bind = this.anything();
                this._pred(null != bind);
                this._pred(null != bind.bind);
                return [ "Bind", bind.bind ];
            },
            SelectFilter: function(filter, query, resource) {
                var $elf = this, _fromIdx = this.input.idx, filter;
                this._applyWithArgs("AddExtraFroms", filter, query, resource);
                filter = this._applyWithArgs("Boolean", filter);
                return query.where.push(filter);
            },
            InsertFilter: function(filter, resource, bindVars) {
                var $elf = this, _fromIdx = this.input.idx, query, where;
                query = new Query();
                this._applyWithArgs("AddExtraFroms", filter, query, resource);
                where = this._applyWithArgs("Boolean", filter);
                (function() {
                    query.select = _.map(bindVars, function(bindVar) {
                        return [ "ReferencedField", resource.tableAlias, bindVar[0] ];
                    });
                    query.from.push([ [ "SelectQuery", [ "Select", _.map($elf.clientModel.resources[resource.resourceName].fields, function(field) {
                        var cast, alias = field.fieldName, bindVar = _.find(bindVars, {
                            0: alias
                        });
                        cast = bindVar ? [ "Cast", bindVar[1], field.dataType ] : "Null";
                        return [ cast, alias ];
                    }) ] ], resource.tableAlias ]);
                    return query.where.push(where);
                }).call(this);
                return query;
            },
            UpdateFilter: function(filter, resource, referencedIdField) {
                var $elf = this, _fromIdx = this.input.idx, query, where;
                query = new Query();
                this._applyWithArgs("AddExtraFroms", filter, query, resource);
                where = this._applyWithArgs("Boolean", filter);
                (function() {
                    query.select.push(referencedIdField);
                    query.fromResource(resource);
                    return query.where.push(where);
                }).call(this);
                return query;
            },
            OrderBy: function(orderby, query, resource) {
                var $elf = this, _fromIdx = this.input.idx, orderby;
                this._applyWithArgs("AddExtraFroms", orderby.properties, query, resource);
                orderby = this._applyWithArgs("OrderByProperties", orderby.properties);
                return query.extras.push([ "OrderBy" ].concat(orderby));
            },
            OrderByProperties: function() {
                var $elf = this, _fromIdx = this.input.idx, field, orderby, ordering;
                this._form(function() {
                    return orderby = this._many1(function() {
                        ordering = this.anything();
                        field = this._applyWithArgs("ReferencedProperty", ordering);
                        return [ ordering.order.toUpperCase(), field ];
                    });
                });
                return orderby;
            },
            BindVars: function(method, bodyKeys, resourceName) {
                var $elf = this, _fromIdx = this.input.idx, fieldName, fields, mappedFieldName, mappedTableName;
                this._form(function() {
                    return fields = this._many(function() {
                        return this._or(function() {
                            this._form(function() {
                                this._applyWithArgs("exactly", "_name");
                                return this.anything();
                            });
                            return null;
                        }, function() {
                            this._form(function() {
                                fieldName = this.anything();
                                return this._form(function() {
                                    mappedTableName = this.anything();
                                    return mappedFieldName = this.anything();
                                });
                            });
                            return this._or(function() {
                                this._pred(!_.includes(bodyKeys, fieldName) && !_.includes(bodyKeys, resourceName + "." + fieldName));
                                return this._or(function() {
                                    this._pred("PUT" === method);
                                    return [ mappedFieldName, "Default" ];
                                }, function() {
                                    return null;
                                });
                            }, function() {
                                return [ mappedFieldName, [ "Bind", resourceName, fieldName ] ];
                            });
                        });
                    });
                });
                return _.compact(fields);
            },
            ResolveResourceAlias: function(aliasName) {
                var $elf = this, _fromIdx = this.input.idx;
                this._pred(this.resourceAliases[aliasName]);
                return this.resourceAliases[aliasName];
            },
            Resource: function(resourceName, parentResource) {
                var $elf = this, _fromIdx = this.input.idx, resource, resourceMapping, tableAlias;
                return this._or(function() {
                    return this._applyWithArgs("ResolveResourceAlias", resourceName);
                }, function() {
                    resource = this.clientModel.resources[resourceName];
                    this._pred(resource);
                    resource = _.clone(resource);
                    this._or(function() {
                        return this._pred(resource.tableName);
                    }, function() {
                        resourceMapping = this._applyWithArgs("ResourceMapping", resource);
                        return resource.tableName = resourceMapping._name;
                    });
                    tableAlias = this._or(function() {
                        this._pred(parentResource);
                        return parentResource.tableAlias + "." + resource.tableName;
                    }, function() {
                        return resource.tableName;
                    });
                    resource.tableAlias = this.checkAlias(tableAlias);
                    return resource;
                }, function() {
                    return function() {
                        throw new Error("Unknown resource: " + resourceName);
                    }.call(this);
                });
            },
            FieldContainedIn: function(fieldName, resource) {
                var $elf = this, _fromIdx = this.input.idx, mappedField, mapping;
                mapping = this._applyWithArgs("ResourceMapping", resource);
                mappedField = mapping[fieldName];
                this._pred(mappedField);
                this._pred(mappedField[0] == resource.tableAlias);
                return this._pred(_.some(resource.fields, {
                    fieldName: mappedField[1]
                }));
            },
            ResourceMapping: function(resource) {
                var $elf = this, _fromIdx = this.input.idx, resourceMapping;
                return this._or(function() {
                    this._pred(this.clientModel.resourceToSQLMappings[resource.resourceName]);
                    resourceMapping = this.clientModel.resourceToSQLMappings[resource.resourceName];
                    this._opt(function() {
                        this._pred(resource.tableAlias);
                        this._pred(resource.tableAlias != resourceMapping._name);
                        return resourceMapping = _.mapValues(resourceMapping, function(mapping) {
                            return _.isArray(mapping) ? [ resource.tableAlias, mapping[1] ] : resource.tableAlias;
                        });
                    });
                    return resourceMapping;
                }, function() {
                    return function() {
                        throw new Error("Unknown resource: " + resource.resourceName);
                    }.call(this);
                });
            },
            AddCountField: function(path, query, resource) {
                var $elf = this, _fromIdx = this.input.idx;
                this._pred(path.count);
                return query.select.push([ [ "Count", "*" ], "$count" ]);
            },
            AddSelectFields: function(path, query, resource) {
                var $elf = this, _fromIdx = this.input.idx, fields, resourceMapping;
                fields = this._or(function() {
                    this._pred(path.options);
                    this._pred(path.options.$select);
                    this._applyWithArgs("AddExtraFroms", path.options.$select.properties, query, resource);
                    fields = this._applyWithArgs("Properties", path.options.$select.properties);
                    return _(fields).reject(function(field) {
                        return _.some(query.select, function(existingField) {
                            return _.last(existingField) == field.name;
                        });
                    }).map(function(field) {
                        return $elf.AliasSelectField(field.resource, field.name);
                    }).value();
                }, function() {
                    resourceMapping = this._applyWithArgs("ResourceMapping", resource);
                    return _(resourceMapping).keys().reject(function(fieldName) {
                        return "_name" === fieldName || _.some(query.select, function(existingField) {
                            return _.last(existingField) == fieldName;
                        });
                    }).map(_.bind(this.AliasSelectField, this, resource)).value();
                });
                return query.select = query.select.concat(fields);
            },
            AliasSelectField: function(resource, fieldName) {
                var $elf = this, _fromIdx = this.input.idx, referencedField;
                referencedField = this._applyWithArgs("ReferencedField", resource, fieldName);
                return this._or(function() {
                    this._pred(referencedField[2] === fieldName);
                    return referencedField;
                }, function() {
                    return [ referencedField, fieldName ];
                });
            },
            ReferencedField: function(resource, resourceField) {
                var $elf = this, _fromIdx = this.input.idx, mapping;
                mapping = this._applyWithArgs("ResourceMapping", resource);
                return this._or(function() {
                    this._pred(mapping[resourceField]);
                    return [ "ReferencedField" ].concat(mapping[resourceField]);
                }, function() {
                    console.error("Unknown mapping: ", mapping, resource.resourceName, resourceField);
                    return function() {
                        throw new Error("Unknown mapping: " + resource.resourceName + " : " + resourceField);
                    }.call(this);
                });
            },
            Boolean: function() {
                var $elf = this, _fromIdx = this.input.idx, bool, op1, op2, operation;
                return this._or(function() {
                    return this._apply("True");
                }, function() {
                    return this._apply("False");
                }, function() {
                    this._form(function() {
                        return bool = this._or(function() {
                            operation = function() {
                                switch (this.anything()) {
                                  case "eq":
                                    return "Equals";

                                  case "ge":
                                    return "GreaterThanOrEqual";

                                  case "gt":
                                    return "GreaterThan";

                                  case "le":
                                    return "LessThanOrEqual";

                                  case "lt":
                                    return "LessThan";

                                  case "ne":
                                    return "NotEquals";

                                  default:
                                    throw this._fail();
                                }
                            }.call(this);
                            op1 = this._apply("Operand");
                            op2 = this._apply("Operand");
                            return [ operation, op1, op2 ];
                        }, function() {
                            operation = function() {
                                switch (this.anything()) {
                                  case "and":
                                    return "And";

                                  case "or":
                                    return "Or";

                                  default:
                                    throw this._fail();
                                }
                            }.call(this);
                            op1 = this._apply("Boolean");
                            op2 = this._many1(function() {
                                return this._apply("Boolean");
                            });
                            return [ operation, op1 ].concat(op2);
                        });
                    });
                    return bool;
                }, function() {
                    this._form(function() {
                        this._applyWithArgs("exactly", "not");
                        return bool = this._apply("Boolean");
                    });
                    return [ "Not", bool ];
                }, function() {
                    return this._apply("ReferencedProperty");
                }, function() {
                    return this._apply("BooleanFunction");
                });
            },
            True: function() {
                var $elf = this, _fromIdx = this.input.idx;
                this._apply("true");
                return [ "Boolean", !0 ];
            },
            False: function() {
                var $elf = this, _fromIdx = this.input.idx;
                this._apply("false");
                return [ "Boolean", !1 ];
            },
            BooleanFunction: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._applyWithArgs("Function", "contains");
                }, function() {
                    return this._applyWithArgs("Function", "endswith");
                }, function() {
                    return this._applyWithArgs("Function", "startswith");
                }, function() {
                    return this._applyWithArgs("Function", "isof");
                }, function() {
                    return this._applyWithArgs("Function", "substringof");
                });
            },
            NumberFunction: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._applyWithArgs("AliasedFunction", "length", "CharacterLength");
                }, function() {
                    return this._applyWithArgs("Function", "indexof");
                }, function() {
                    return this._applyWithArgs("Function", "year");
                }, function() {
                    return this._applyWithArgs("Function", "month");
                }, function() {
                    return this._applyWithArgs("Function", "day");
                }, function() {
                    return this._applyWithArgs("Function", "day");
                }, function() {
                    return this._applyWithArgs("Function", "hour");
                }, function() {
                    return this._applyWithArgs("Function", "minute");
                }, function() {
                    return this._applyWithArgs("Function", "second");
                }, function() {
                    return this._applyWithArgs("Function", "fractionalseconds");
                }, function() {
                    return this._applyWithArgs("Function", "totaloffsetminutes");
                }, function() {
                    return this._applyWithArgs("Function", "totalseconds");
                }, function() {
                    return this._applyWithArgs("Function", "round");
                }, function() {
                    return this._applyWithArgs("Function", "floor");
                }, function() {
                    return this._applyWithArgs("Function", "ceiling");
                });
            },
            TextFunction: function() {
                var $elf = this, _fromIdx = this.input.idx, fn;
                return this._or(function() {
                    fn = this._applyWithArgs("Function", "substring");
                    fn[2] = [ "Add", fn[2], [ "Number", 1 ] ];
                    return fn;
                }, function() {
                    return this._applyWithArgs("Function", "tolower");
                }, function() {
                    return this._applyWithArgs("Function", "toupper");
                }, function() {
                    return this._applyWithArgs("Function", "trim");
                }, function() {
                    return this._applyWithArgs("Function", "concat");
                }, function() {
                    return this._applyWithArgs("AliasedFunction", "date", "ToDate");
                }, function() {
                    return this._applyWithArgs("AliasedFunction", "time", "ToTime");
                }, function() {
                    return this._applyWithArgs("Function", "replace");
                });
            },
            DateFunction: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._applyWithArgs("Function", "now");
                }, function() {
                    return this._applyWithArgs("Function", "maxdatetime");
                }, function() {
                    return this._applyWithArgs("Function", "mindatetime");
                });
            },
            AliasedFunction: function(odataName, sqlName) {
                var $elf = this, _fromIdx = this.input.idx, fn;
                fn = this._applyWithArgs("Function", odataName);
                return [ sqlName ].concat(fn.slice(1));
            },
            Function: function(name) {
                var $elf = this, _fromIdx = this.input.idx, args, properties;
                this._form(function() {
                    this._applyWithArgs("exactly", "call");
                    properties = this.anything();
                    this._pred(properties.method == name);
                    return args = this._applyWithArgs("Arguments", properties.args);
                });
                return [ _.capitalize(name) ].concat(args);
            },
            Arguments: function() {
                var $elf = this, _fromIdx = this.input.idx, args;
                this._form(function() {
                    return args = this._many(function() {
                        return this._apply("Operand");
                    });
                });
                return args;
            },
            Operand: function() {
                var $elf = this, _fromIdx = this.input.idx;
                return this._or(function() {
                    return this._apply("Bind");
                }, function() {
                    return this._apply("Null");
                }, function() {
                    return this._apply("Boolean");
                }, function() {
                    return this._apply("Number");
                }, function() {
                    return this._apply("Text");
                }, function() {
                    return this._apply("Date");
                }, function() {
                    return this._apply("Duration");
                }, function() {
                    return this._apply("Math");
                });
            },
            Math: function() {
                var $elf = this, _fromIdx = this.input.idx, op1, op2, operation;
                this._form(function() {
                    operation = function() {
                        switch (this.anything()) {
                          case "add":
                            return "Add";

                          case "div":
                            return "Divide";

                          case "mul":
                            return "Multiply";

                          case "sub":
                            return "Subtract";

                          default:
                            throw this._fail();
                        }
                    }.call(this);
                    op1 = this._apply("Operand");
                    return op2 = this._apply("Operand");
                });
                return [ operation, op1, op2 ];
            },
            Lambda: function(resource, lambda) {
                var $elf = this, _fromIdx = this.input.idx, defaultResource, filter, query, resourceAliases, result;
                resourceAliases = this.resourceAliases;
                defaultResource = this.defaultResource;
                (function() {
                    this.resourceAliases = _.clone(this.resourceAliases);
                    return this.resourceAliases[lambda.identifier] = resource;
                }).call(this);
                this._or(function() {
                    query = new Query();
                    this._applyWithArgs("AddNavigation", query, this.defaultResource, resource);
                    this.defaultResource = resource;
                    this._applyWithArgs("AddExtraFroms", lambda.expression, query, resource);
                    filter = this._applyWithArgs("Boolean", lambda.expression);
                    query.where.push(filter);
                    query = query.compile("SelectQuery");
                    result = this._or(function() {
                        this._pred("any" == lambda.method);
                        return [ "Exists", query ];
                    }, function() {
                        this._pred("all" == lambda.method);
                        return [ "Not", [ "Exists", _.map(query, function(queryPart) {
                            return "Where" == queryPart[0] ? [ queryPart[0], [ "Not", queryPart[1] ] ] : queryPart;
                        }) ] ];
                    });
                    this.resourceAliases = resourceAliases;
                    return this.defaultResource = defaultResource;
                }, function() {
                    this.resourceAliases = resourceAliases;
                    this.defaultResource = defaultResource;
                    return this._pred(!1);
                });
                return result;
            },
            Properties: function() {
                var $elf = this, _fromIdx = this.input.idx, props;
                this._form(function() {
                    return props = this._many(function() {
                        return this._apply("Property");
                    });
                });
                return props;
            },
            ReferencedProperty: function() {
                var $elf = this, _fromIdx = this.input.idx, prop;
                prop = this._apply("Property");
                return this._or(function() {
                    this._pred(_.isArray(prop));
                    return prop;
                }, function() {
                    return this._applyWithArgs("ReferencedField", prop.resource, prop.name);
                });
            },
            Property: function() {
                var $elf = this, _fromIdx = this.input.idx, defaultResource, prop, propResource, resource, result;
                prop = this.anything();
                this._pred(prop.name);
                return this._or(function() {
                    this._pred(prop.property);
                    defaultResource = this.defaultResource;
                    return this._or(function() {
                        propResource = function() {
                            try {
                                return $elf.Resource(prop.name, this.defaultResource);
                            } catch (e) {} finally {}
                        }.call(this);
                        this._pred(propResource);
                        this.defaultResource = propResource;
                        result = this._applyWithArgs("Property", prop.property);
                        this.defaultResource = defaultResource;
                        return result;
                    }, function() {
                        this.defaultResource = defaultResource;
                        return this._applyWithArgs("Property", prop.property);
                    });
                }, function() {
                    this._pred(!prop.property);
                    this._pred(prop.lambda);
                    resource = this._applyWithArgs("Resource", prop.name, this.defaultResource);
                    return this._applyWithArgs("Lambda", resource, prop.lambda);
                }, function() {
                    this._pred(!prop.property);
                    this._pred(!prop.lambda);
                    return {
                        resource: this.defaultResource,
                        name: prop.name
                    };
                });
            },
            Number: function() {
                var $elf = this, _fromIdx = this.input.idx, num;
                return this._or(function() {
                    num = this._apply("number");
                    return [ "Number", num ];
                }, function() {
                    return this._apply("NumberFunction");
                });
            },
            Null: function() {
                var $elf = this, _fromIdx = this.input.idx, x;
                x = this.anything();
                this._pred(null === x);
                return "Null";
            },
            Text: function() {
                var $elf = this, _fromIdx = this.input.idx, text;
                return this._or(function() {
                    text = this._apply("string");
                    return [ "Text", text ];
                }, function() {
                    return this._apply("TextFunction");
                });
            },
            Date: function() {
                var $elf = this, _fromIdx = this.input.idx, date;
                return this._or(function() {
                    date = this.anything();
                    this._pred(_.isDate(date));
                    return [ "Date", date ];
                }, function() {
                    return this._apply("DateFunction");
                });
            },
            Duration: function() {
                var $elf = this, _fromIdx = this.input.idx, duration;
                duration = this.anything();
                this._pred(_.isObject(duration));
                duration = _(duration).pick("negative", "day", "hour", "minute", "second").omitBy(_.isNil).value();
                this._pred(!_(duration).omit("negative").isEmpty());
                return [ "Duration", duration ];
            },
            Expands: function(resource, query) {
                var $elf = this, _fromIdx = this.input.idx, defaultResource, expand, expandQuery, expandResource, navigationWhere, nestedExpandQuery;
                defaultResource = this.defaultResource;
                return this._form(function() {
                    return this._many1(function() {
                        expand = this.anything();
                        expandResource = this._applyWithArgs("Resource", expand.name, defaultResource);
                        this.defaultResource = expandResource;
                        nestedExpandQuery = new Query();
                        this._or(function() {
                            return this._pred(!expand.property);
                        }, function() {
                            return this._applyWithArgs("Expands", expandResource, nestedExpandQuery, [ expand.property ]);
                        });
                        this._or(function() {
                            return this._pred(!expand.options);
                        }, function() {
                            return this._pred(!expand.options.$expand);
                        }, function() {
                            return this._applyWithArgs("Expands", expandResource, nestedExpandQuery, expand.options.$expand.properties);
                        });
                        nestedExpandQuery.fromResource(expandResource);
                        this._or(function() {
                            return this._applyWithArgs("AddCountField", expand, nestedExpandQuery, expandResource);
                        }, function() {
                            return this._applyWithArgs("AddSelectFields", expand, nestedExpandQuery, expandResource);
                        });
                        this._or(function() {
                            return this._pred(!expand.options);
                        }, function() {
                            this._or(function() {
                                return this._pred(!expand.options.$filter);
                            }, function() {
                                return this._applyWithArgs("SelectFilter", expand.options.$filter, nestedExpandQuery, expandResource);
                            });
                            return this._applyWithArgs("AddExtraQueryOptions", expandResource, expand, nestedExpandQuery);
                        });
                        this.defaultResource = defaultResource;
                        navigationWhere = this._applyWithArgs("NavigateResources", resource, expandResource);
                        nestedExpandQuery.where.push(navigationWhere);
                        expandQuery = new Query();
                        expandQuery.select.push([ [ "AggregateJSON", [ expandResource.tableAlias, "*" ] ], expandResource.resourceName ]);
                        expandQuery.from.push([ nestedExpandQuery.compile("SelectQuery"), expandResource.tableAlias ]);
                        return query.select.push([ expandQuery.compile("SelectQuery"), expandResource.resourceName ]);
                    });
                });
            },
            AddExtraQueryOptions: function(resource, path, query) {
                var $elf = this, _fromIdx = this.input.idx, limit, offset;
                return this._or(function() {
                    return this._pred(path.count);
                }, function() {
                    this._or(function() {
                        return this._pred(!path.options.$orderby);
                    }, function() {
                        return this._applyWithArgs("OrderBy", path.options.$orderby, query, resource);
                    });
                    this._or(function() {
                        return this._pred(!path.options.$top);
                    }, function() {
                        limit = this._applyWithArgs("Number", path.options.$top);
                        return query.extras.push([ "Limit", limit ]);
                    });
                    return this._or(function() {
                        return this._pred(!path.options.$skip);
                    }, function() {
                        offset = this._applyWithArgs("Number", path.options.$skip);
                        return query.extras.push([ "Offset", offset ]);
                    });
                });
            },
            NavigateResources: function(resource1, resource2) {
                var $elf = this, _fromIdx = this.input.idx, fkField;
                return this._or(function() {
                    this._applyWithArgs("FieldContainedIn", resource1.resourceName, resource2);
                    fkField = this._applyWithArgs("ReferencedField", resource2, resource1.resourceName);
                    return [ "Equals", [ "ReferencedField", resource1.tableAlias, resource1.idField ], fkField ];
                }, function() {
                    this._applyWithArgs("FieldContainedIn", resource2.resourceName, resource1);
                    fkField = this._applyWithArgs("ReferencedField", resource1, resource2.resourceName);
                    return [ "Equals", [ "ReferencedField", resource2.tableAlias, resource2.idField ], fkField ];
                }, function() {
                    return function() {
                        throw new Error("Cannot navigate resources " + resource1.tableName + " and " + resource2.tableName);
                    }.call(this);
                });
            },
            AddExtraFroms: function(searchPoint, query, resource) {
                var $elf = this, _fromIdx = this.input.idx, extraFroms;
                extraFroms = this._applyWithArgs("ExtraFroms", searchPoint);
                return _.each(extraFroms, function(extraResource) {
                    var currentResource = resource;
                    _.isArray(extraResource) ? _.each(extraResource, function(extraResource) {
                        $elf.AddNavigation(query, currentResource, extraResource);
                        currentResource = extraResource;
                    }) : $elf.AddNavigation(query, currentResource, extraResource);
                });
            },
            ExtraFroms: function() {
                var $elf = this, _fromIdx = this.input.idx, extraFroms, froms, nextProp, parentResource, prop;
                froms = [];
                this._or(function() {
                    this._pred(_.isArray(this.input.hd));
                    return this._form(function() {
                        return this._many(function() {
                            extraFroms = this._apply("ExtraFroms");
                            return froms = froms.concat(extraFroms);
                        });
                    });
                }, function() {
                    nextProp = this.anything();
                    parentResource = this.defaultResource;
                    extraFroms = this._many1(function() {
                        prop = nextProp;
                        this._pred(prop);
                        this._pred(prop.name);
                        this._pred(prop.property);
                        this._pred(prop.property.name);
                        nextProp = prop.property;
                        return parentResource = this._applyWithArgs("Resource", prop.name, parentResource);
                    });
                    return this._or(function() {
                        this._pred(1 == extraFroms.length);
                        return froms.push(extraFroms[0]);
                    }, function() {
                        return froms.push(extraFroms);
                    });
                }, function() {
                    return this.anything();
                });
                return froms;
            },
            AddNavigation: function(query, resource, extraResource) {
                var $elf = this, _fromIdx = this.input.idx, nagivationWhere;
                return this._opt(function() {
                    this._pred(!_.some(query.from, function(from) {
                        return from === extraResource.tableAlias || _.isArray(from) && from[1] === extraResource.tableAlias;
                    }));
                    nagivationWhere = this._applyWithArgs("NavigateResources", resource, extraResource);
                    query.fromResource(extraResource);
                    return query.where.push(nagivationWhere);
                });
            }
        });
        OData2AbstractSQL.initialize = function() {
            this.reset();
        };
        OData2AbstractSQL.reset = function() {
            this.resourceAliases = {};
            this.defaultResource = null;
            this.extraBodyVars = {};
        };
        OData2AbstractSQL.checkAlias = _.identity;
        var generateShortAliases = function(clientModel) {
            var trie = {}, resourceNames = _.map(clientModel.resources, "resourceName");
            _(resourceNames).reject(function(part) {
                return _.includes(part, "__");
            }).invokeMap("toLowerCase").sort().each(function(resourceName) {
                var node = trie;
                _.each(resourceName, function(c, i) {
                    if (node.$suffix) {
                        node[node.$suffix[0]] = {
                            $suffix: node.$suffix.slice(1)
                        };
                        delete node.$suffix;
                    }
                    if (!node[c]) {
                        node[c] = {
                            $suffix: resourceName.slice(i + 1)
                        };
                        return !1;
                    }
                    node = node[c];
                });
            });
            var shortAliases = {}, traverseNodes = function(str, node) {
                _.each(node, function(value, key) {
                    if ("$suffix" === key) {
                        var lowerCaseResourceName = str + value, origResourceName = _.find(resourceNames, function(resourceName) {
                            return resourceName.toLowerCase() === lowerCaseResourceName;
                        });
                        shortAliases[origResourceName] = origResourceName.slice(0, str.length);
                    } else traverseNodes(str + key, value);
                });
            };
            traverseNodes("", trie);
            _(resourceNames).invokeMap("split", "__").filter(function(resource) {
                return resource.length > 1;
            }).each(function(factType) {
                shortAliases[factType.join("__")] = _.map(factType, function(part) {
                    return shortAliases[part] ? shortAliases[part] : part;
                }).join("__");
            });
            return shortAliases;
        };
        OData2AbstractSQL.setClientModel = function(clientModel) {
            this.clientModel = clientModel;
            var shortAliases = generateShortAliases(clientModel);
            this.checkAlias = memoize(function(alias) {
                var aliasLength = alias.length;
                return aliasLength < 64 ? alias : _(alias).split(".").map(function(part) {
                    if (aliasLength < 64) return part;
                    aliasLength -= part.length;
                    var shortPart = shortAliases[part];
                    if (shortPart) {
                        aliasLength += shortPart.length;
                        return shortPart;
                    }
                    aliasLength += 1;
                    return part[0];
                }).join(".");
            });
        };
    });
}, function(module, exports, __webpack_require__) {
    "use strict";
    var normalizeOpts = __webpack_require__(54), resolveLength = __webpack_require__(55), plain = __webpack_require__(61);
    module.exports = function(fn) {
        var options = normalizeOpts(arguments[1]), length;
        if (!options.normalizer) {
            length = options.length = resolveLength(options.length, fn.length, options.async);
            0 !== length && (options.primitive ? length === !1 ? options.normalizer = __webpack_require__(100) : length > 1 && (options.normalizer = __webpack_require__(101)(length)) : length === !1 ? options.normalizer = __webpack_require__(102)() : 1 === length ? options.normalizer = __webpack_require__(104)() : options.normalizer = __webpack_require__(105)(length));
        }
        options.async && __webpack_require__(106);
        options.dispose && __webpack_require__(108);
        options.maxAge && __webpack_require__(109);
        options.max && __webpack_require__(112);
        options.refCounter && __webpack_require__(114);
        return plain(fn, options);
    };
}, function(module, exports) {
    "use strict";
    var forEach = Array.prototype.forEach, create = Object.create, process = function(src, obj) {
        var key;
        for (key in src) obj[key] = src[key];
    };
    module.exports = function(options) {
        var result = create(null);
        forEach.call(arguments, function(options) {
            null != options && process(Object(options), result);
        });
        return result;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var toPosInt = __webpack_require__(56);
    module.exports = function(optsLength, fnLength, isAsync) {
        var length;
        if (isNaN(optsLength)) {
            length = fnLength;
            return length >= 0 ? isAsync && length ? length - 1 : length : 1;
        }
        return optsLength !== !1 && toPosInt(optsLength);
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var toInteger = __webpack_require__(57), max = Math.max;
    module.exports = function(value) {
        return max(0, toInteger(value));
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var sign = __webpack_require__(58), abs = Math.abs, floor = Math.floor;
    module.exports = function(value) {
        if (isNaN(value)) return 0;
        value = Number(value);
        return 0 !== value && isFinite(value) ? sign(value) * floor(abs(value)) : value;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = __webpack_require__(59)() ? Math.sign : __webpack_require__(60);
}, function(module, exports) {
    "use strict";
    module.exports = function() {
        var sign = Math.sign;
        return "function" == typeof sign && (1 === sign(10) && sign(-20) === -1);
    };
}, function(module, exports) {
    "use strict";
    module.exports = function(value) {
        value = Number(value);
        return isNaN(value) || 0 === value ? value : value > 0 ? 1 : -1;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var callable = __webpack_require__(62), forEach = __webpack_require__(63), extensions = __webpack_require__(66), configure = __webpack_require__(67), resolveLength = __webpack_require__(55), hasOwnProperty = Object.prototype.hasOwnProperty;
    module.exports = function self(fn) {
        var options, length, conf;
        callable(fn);
        options = Object(arguments[1]);
        if (hasOwnProperty.call(fn, "__memoized__") && !options.force) return fn;
        length = resolveLength(options.length, fn.length, options.async && extensions.async);
        conf = configure(fn, length, options);
        forEach(extensions, function(fn, name) {
            options[name] && fn(options[name], conf, options);
        });
        self.__profiler__ && self.__profiler__(conf);
        conf.updateEnv();
        return conf.memoized;
    };
}, function(module, exports) {
    "use strict";
    module.exports = function(fn) {
        if ("function" != typeof fn) throw new TypeError(fn + " is not a function");
        return fn;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = __webpack_require__(64)("forEach");
}, function(module, exports, __webpack_require__) {
    "use strict";
    var callable = __webpack_require__(62), value = __webpack_require__(65), bind = Function.prototype.bind, call = Function.prototype.call, keys = Object.keys, propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
    module.exports = function(method, defVal) {
        return function(obj, cb) {
            var list, thisArg = arguments[2], compareFn = arguments[3];
            obj = Object(value(obj));
            callable(cb);
            list = keys(obj);
            compareFn && list.sort("function" == typeof compareFn ? bind.call(compareFn, obj) : void 0);
            "function" != typeof method && (method = list[method]);
            return call.call(method, list, function(key, index) {
                return propertyIsEnumerable.call(obj, key) ? call.call(cb, thisArg, obj[key], key, obj, index) : defVal;
            });
        };
    };
}, function(module, exports) {
    "use strict";
    module.exports = function(value) {
        if (null == value) throw new TypeError("Cannot use null or undefined");
        return value;
    };
}, function(module, exports) {
    "use strict";
}, function(module, exports, __webpack_require__) {
    "use strict";
    var customError = __webpack_require__(68), defineLength = __webpack_require__(75), d = __webpack_require__(77), ee = __webpack_require__(82).methods, resolveResolve = __webpack_require__(84), resolveNormalize = __webpack_require__(99), apply = Function.prototype.apply, call = Function.prototype.call, create = Object.create, hasOwnProperty = Object.prototype.hasOwnProperty, defineProperties = Object.defineProperties, on = ee.on, emit = ee.emit;
    module.exports = function(original, length, options) {
        var cache = create(null), conf, memLength, get, set, del, clear, extDel, normalizer, getListeners, setListeners, deleteListeners, memoized, resolve;
        memLength = length !== !1 ? length : isNaN(original.length) ? 1 : original.length;
        if (options.normalizer) {
            normalizer = resolveNormalize(options.normalizer);
            get = normalizer.get;
            set = normalizer.set;
            del = normalizer.delete;
            clear = normalizer.clear;
        }
        null != options.resolvers && (resolve = resolveResolve(options.resolvers));
        memoized = get ? defineLength(function(arg) {
            var id, result, args = arguments;
            resolve && (args = resolve(args));
            id = get(args);
            if (null !== id && hasOwnProperty.call(cache, id)) {
                getListeners && conf.emit("get", id, args, this);
                return cache[id];
            }
            result = 1 === args.length ? call.call(original, this, args[0]) : apply.call(original, this, args);
            if (null === id) {
                id = get(args);
                if (null !== id) throw customError("Circular invocation", "CIRCULAR_INVOCATION");
                id = set(args);
            } else if (hasOwnProperty.call(cache, id)) throw customError("Circular invocation", "CIRCULAR_INVOCATION");
            cache[id] = result;
            setListeners && conf.emit("set", id);
            return result;
        }, memLength) : 0 === length ? function() {
            var result;
            if (hasOwnProperty.call(cache, "data")) {
                getListeners && conf.emit("get", "data", arguments, this);
                return cache.data;
            }
            result = arguments.length ? apply.call(original, this, arguments) : call.call(original, this);
            if (hasOwnProperty.call(cache, "data")) throw customError("Circular invocation", "CIRCULAR_INVOCATION");
            cache.data = result;
            setListeners && conf.emit("set", "data");
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
            setListeners && conf.emit("set", id);
            return result;
        };
        conf = {
            original: original,
            memoized: memoized,
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
        extDel = get ? defineLength(function(arg) {
            var id, args = arguments;
            resolve && (args = resolve(args));
            id = get(args);
            null !== id && conf.delete(id);
        }, memLength) : 0 === length ? function() {
            return conf.delete("data");
        } : function(arg) {
            resolve && (arg = resolve(arguments)[0]);
            return conf.delete(arg);
        };
        defineProperties(memoized, {
            __memoized__: d(!0),
            delete: d(extDel),
            clear: d(conf.clear)
        });
        return conf;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var assign = __webpack_require__(69), captureStackTrace = Error.captureStackTrace;
    exports = module.exports = function(message) {
        var err = new Error(message), code = arguments[1], ext = arguments[2];
        if (null == ext && code && "object" == typeof code) {
            ext = code;
            code = null;
        }
        null != ext && assign(err, ext);
        null != code && (err.code = String(code));
        captureStackTrace && captureStackTrace(err, exports);
        return err;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = __webpack_require__(70)() ? Object.assign : __webpack_require__(71);
}, function(module, exports) {
    "use strict";
    module.exports = function() {
        var assign = Object.assign, obj;
        if ("function" != typeof assign) return !1;
        obj = {
            foo: "raz"
        };
        assign(obj, {
            bar: "dwa"
        }, {
            trzy: "trzy"
        });
        return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var keys = __webpack_require__(72), value = __webpack_require__(65), max = Math.max;
    module.exports = function(dest, src) {
        var error, i, l = max(arguments.length, 2), assign;
        dest = Object(value(dest));
        assign = function(key) {
            try {
                dest[key] = src[key];
            } catch (e) {
                error || (error = e);
            }
        };
        for (i = 1; i < l; ++i) {
            src = arguments[i];
            keys(src).forEach(assign);
        }
        if (void 0 !== error) throw error;
        return dest;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = __webpack_require__(73)() ? Object.keys : __webpack_require__(74);
}, function(module, exports) {
    "use strict";
    module.exports = function() {
        try {
            Object.keys("primitive");
            return !0;
        } catch (e) {
            return !1;
        }
    };
}, function(module, exports) {
    "use strict";
    var keys = Object.keys;
    module.exports = function(object) {
        return keys(null == object ? object : Object(object));
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var toPosInt = __webpack_require__(56), test = function(a, b) {}, desc, defineProperty, generate, mixin;
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
        mixin = __webpack_require__(76);
        generate = function() {
            var cache = [];
            return function(l) {
                var args, i = 0;
                if (cache[l]) return cache[l];
                args = [];
                for (;l--; ) args.push("a" + (++i).toString(36));
                return new Function("fn", "return function (" + args.join(", ") + ") { return fn.apply(this, arguments); };");
            };
        }();
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
    var value = __webpack_require__(65), defineProperty = Object.defineProperty, getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor, getOwnPropertyNames = Object.getOwnPropertyNames, getOwnPropertySymbols = Object.getOwnPropertySymbols;
    module.exports = function(target, source) {
        var error, sourceObject = Object(value(source));
        target = Object(value(target));
        getOwnPropertyNames(sourceObject).forEach(function(name) {
            try {
                defineProperty(target, name, getOwnPropertyDescriptor(source, name));
            } catch (e) {
                error = e;
            }
        });
        "function" == typeof getOwnPropertySymbols && getOwnPropertySymbols(sourceObject).forEach(function(symbol) {
            try {
                defineProperty(target, symbol, getOwnPropertyDescriptor(source, symbol));
            } catch (e) {
                error = e;
            }
        });
        if (void 0 !== error) throw error;
        return target;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var assign = __webpack_require__(69), normalizeOpts = __webpack_require__(54), isCallable = __webpack_require__(78), contains = __webpack_require__(79), d;
    d = module.exports = function(dscr, value) {
        var c, e, w, options, desc;
        if (arguments.length < 2 || "string" != typeof dscr) {
            options = value;
            value = dscr;
            dscr = null;
        } else options = arguments[2];
        if (null == dscr) {
            c = w = !0;
            e = !1;
        } else {
            c = contains.call(dscr, "c");
            e = contains.call(dscr, "e");
            w = contains.call(dscr, "w");
        }
        desc = {
            value: value,
            configurable: c,
            enumerable: e,
            writable: w
        };
        return options ? assign(normalizeOpts(options), desc) : desc;
    };
    d.gs = function(dscr, get, set) {
        var c, e, options, desc;
        if ("string" != typeof dscr) {
            options = set;
            set = get;
            get = dscr;
            dscr = null;
        } else options = arguments[3];
        if (null == get) get = void 0; else if (isCallable(get)) {
            if (null == set) set = void 0; else if (!isCallable(set)) {
                options = set;
                set = void 0;
            }
        } else {
            options = get;
            get = set = void 0;
        }
        if (null == dscr) {
            c = !0;
            e = !1;
        } else {
            c = contains.call(dscr, "c");
            e = contains.call(dscr, "e");
        }
        desc = {
            get: get,
            set: set,
            configurable: c,
            enumerable: e
        };
        return options ? assign(normalizeOpts(options), desc) : desc;
    };
}, function(module, exports) {
    "use strict";
    module.exports = function(obj) {
        return "function" == typeof obj;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = __webpack_require__(80)() ? String.prototype.contains : __webpack_require__(81);
}, function(module, exports) {
    "use strict";
    var str = "razdwatrzy";
    module.exports = function() {
        return "function" == typeof str.contains && (str.contains("dwa") === !0 && str.contains("foo") === !1);
    };
}, function(module, exports) {
    "use strict";
    var indexOf = String.prototype.indexOf;
    module.exports = function(searchString) {
        return indexOf.call(this, searchString, arguments[1]) > -1;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var d = __webpack_require__(83), callable = __webpack_require__(62), apply = Function.prototype.apply, call = Function.prototype.call, create = Object.create, defineProperty = Object.defineProperty, defineProperties = Object.defineProperties, hasOwnProperty = Object.prototype.hasOwnProperty, descriptor = {
        configurable: !0,
        enumerable: !1,
        writable: !0
    }, on, once, off, emit, methods, descriptors, base;
    on = function(type, listener) {
        var data;
        callable(listener);
        if (hasOwnProperty.call(this, "__ee__")) data = this.__ee__; else {
            data = descriptor.value = create(null);
            defineProperty(this, "__ee__", descriptor);
            descriptor.value = null;
        }
        data[type] ? "object" == typeof data[type] ? data[type].push(listener) : data[type] = [ data[type], listener ] : data[type] = listener;
        return this;
    };
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
    off = function(type, listener) {
        var data, listeners, candidate, i;
        callable(listener);
        if (!hasOwnProperty.call(this, "__ee__")) return this;
        data = this.__ee__;
        if (!data[type]) return this;
        listeners = data[type];
        if ("object" == typeof listeners) for (i = 0; candidate = listeners[i]; ++i) candidate !== listener && candidate.__eeOnceListener__ !== listener || (2 === listeners.length ? data[type] = listeners[i ? 0 : 1] : listeners.splice(i, 1)); else listeners !== listener && listeners.__eeOnceListener__ !== listener || delete data[type];
        return this;
    };
    emit = function(type) {
        var i, l, listener, listeners, args;
        if (hasOwnProperty.call(this, "__ee__")) {
            listeners = this.__ee__[type];
            if (listeners) if ("object" == typeof listeners) {
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
    methods = {
        on: on,
        once: once,
        off: off,
        emit: emit
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
}, 77, function(module, exports, __webpack_require__) {
    "use strict";
    var toArray = __webpack_require__(85), callable = __webpack_require__(62), slice = Array.prototype.slice, resolveArgs;
    resolveArgs = function(args) {
        return this.map(function(r, i) {
            return r ? r(args[i]) : args[i];
        }).concat(slice.call(args, this.length));
    };
    module.exports = function(resolvers) {
        resolvers = toArray(resolvers);
        resolvers.forEach(function(r) {
            null != r && callable(r);
        });
        return resolveArgs.bind(resolvers);
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var from = __webpack_require__(86), isArray = Array.isArray;
    module.exports = function(arrayLike) {
        return isArray(arrayLike) ? arrayLike : from(arrayLike);
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = __webpack_require__(87)() ? Array.from : __webpack_require__(88);
}, function(module, exports) {
    "use strict";
    module.exports = function() {
        var from = Array.from, arr, result;
        if ("function" != typeof from) return !1;
        arr = [ "raz", "dwa" ];
        result = from(arr);
        return Boolean(result && result !== arr && "dwa" === result[1]);
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var iteratorSymbol = __webpack_require__(89).iterator, isArguments = __webpack_require__(95), isFunction = __webpack_require__(96), toPosInt = __webpack_require__(56), callable = __webpack_require__(62), validValue = __webpack_require__(65), isString = __webpack_require__(98), isArray = Array.isArray, call = Function.prototype.call, desc = {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        value: null
    }, defineProperty = Object.defineProperty;
    module.exports = function(arrayLike) {
        var mapFn = arguments[1], thisArg = arguments[2], Constructor, i, j, arr, l, code, iterator, result, getIterator, value;
        arrayLike = Object(validValue(arrayLike));
        null != mapFn && callable(mapFn);
        if (this && this !== Array && isFunction(this)) Constructor = this; else {
            if (!mapFn) {
                if (isArguments(arrayLike)) {
                    l = arrayLike.length;
                    if (1 !== l) return Array.apply(null, arrayLike);
                    arr = new Array(1);
                    arr[0] = arrayLike[0];
                    return arr;
                }
                if (isArray(arrayLike)) {
                    arr = new Array(l = arrayLike.length);
                    for (i = 0; i < l; ++i) arr[i] = arrayLike[i];
                    return arr;
                }
            }
            arr = [];
        }
        if (!isArray(arrayLike)) if (void 0 !== (getIterator = arrayLike[iteratorSymbol])) {
            iterator = callable(getIterator).call(arrayLike);
            Constructor && (arr = new Constructor());
            result = iterator.next();
            i = 0;
            for (;!result.done; ) {
                value = mapFn ? call.call(mapFn, thisArg, result.value, i) : result.value;
                if (Constructor) {
                    desc.value = value;
                    defineProperty(arr, i, desc);
                } else arr[i] = value;
                result = iterator.next();
                ++i;
            }
            l = i;
        } else if (isString(arrayLike)) {
            l = arrayLike.length;
            Constructor && (arr = new Constructor());
            for (i = 0, j = 0; i < l; ++i) {
                value = arrayLike[i];
                if (i + 1 < l) {
                    code = value.charCodeAt(0);
                    code >= 55296 && code <= 56319 && (value += arrayLike[++i]);
                }
                value = mapFn ? call.call(mapFn, thisArg, value, j) : value;
                if (Constructor) {
                    desc.value = value;
                    defineProperty(arr, j, desc);
                } else arr[j] = value;
                ++j;
            }
            l = j;
        }
        if (void 0 === l) {
            l = toPosInt(arrayLike.length);
            Constructor && (arr = new Constructor(l));
            for (i = 0; i < l; ++i) {
                value = mapFn ? call.call(mapFn, thisArg, arrayLike[i], i) : arrayLike[i];
                if (Constructor) {
                    desc.value = value;
                    defineProperty(arr, i, desc);
                } else arr[i] = value;
            }
        }
        if (Constructor) {
            desc.value = null;
            arr.length = l;
        }
        return arr;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = __webpack_require__(90)() ? Symbol : __webpack_require__(91);
}, function(module, exports) {
    "use strict";
    var validTypes = {
        object: !0,
        symbol: !0
    };
    module.exports = function() {
        var symbol;
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
    var d = __webpack_require__(92), validateSymbol = __webpack_require__(93), create = Object.create, defineProperties = Object.defineProperties, defineProperty = Object.defineProperty, objPrototype = Object.prototype, NativeSymbol, SymbolPolyfill, HiddenSymbol, globalSymbols = create(null), isNativeSafe;
    if ("function" == typeof Symbol) {
        NativeSymbol = Symbol;
        try {
            String(NativeSymbol());
            isNativeSafe = !0;
        } catch (ignore) {}
    }
    var generateName = function() {
        var created = create(null);
        return function(desc) {
            for (var postfix = 0, name, ie11BugWorkaround; created[desc + (postfix || "")]; ) ++postfix;
            desc += postfix || "";
            created[desc] = !0;
            name = "@@" + desc;
            defineProperty(objPrototype, name, d.gs(null, function(value) {
                if (!ie11BugWorkaround) {
                    ie11BugWorkaround = !0;
                    defineProperty(this, name, d(value));
                    ie11BugWorkaround = !1;
                }
            }));
            return name;
        };
    }();
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
    defineProperties(SymbolPolyfill, {
        for: d(function(key) {
            return globalSymbols[key] ? globalSymbols[key] : globalSymbols[key] = SymbolPolyfill(String(key));
        }),
        keyFor: d(function(s) {
            var key;
            validateSymbol(s);
            for (key in globalSymbols) if (globalSymbols[key] === s) return key;
        }),
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
    defineProperties(HiddenSymbol.prototype, {
        constructor: d(SymbolPolyfill),
        toString: d("", function() {
            return this.__name__;
        })
    });
    defineProperties(SymbolPolyfill.prototype, {
        toString: d(function() {
            return "Symbol (" + validateSymbol(this).__description__ + ")";
        }),
        valueOf: d(function() {
            return validateSymbol(this);
        })
    });
    defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d("", function() {
        var symbol = validateSymbol(this);
        return "symbol" == typeof symbol ? symbol : symbol.toString();
    }));
    defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d("c", "Symbol"));
    defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag, d("c", SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));
    defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive, d("c", SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));
}, 77, function(module, exports, __webpack_require__) {
    "use strict";
    var isSymbol = __webpack_require__(94);
    module.exports = function(value) {
        if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
        return value;
    };
}, function(module, exports) {
    "use strict";
    module.exports = function(x) {
        return !!x && ("symbol" == typeof x || !!x.constructor && ("Symbol" === x.constructor.name && "Symbol" === x[x.constructor.toStringTag]));
    };
}, function(module, exports) {
    "use strict";
    var toString = Object.prototype.toString, id = toString.call(function() {
        return arguments;
    }());
    module.exports = function(x) {
        return toString.call(x) === id;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var toString = Object.prototype.toString, id = toString.call(__webpack_require__(97));
    module.exports = function(f) {
        return "function" == typeof f && toString.call(f) === id;
    };
}, function(module, exports) {
    "use strict";
    module.exports = function() {};
}, function(module, exports) {
    "use strict";
    var toString = Object.prototype.toString, id = toString.call("");
    module.exports = function(x) {
        return "string" == typeof x || x && "object" == typeof x && (x instanceof String || toString.call(x) === id) || !1;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var callable = __webpack_require__(62);
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
            normalizer.delete = callable(userNormalizer.delete);
            normalizer.clear = callable(userNormalizer.clear);
            return normalizer;
        }
        normalizer.set = normalizer.get;
        return normalizer;
    };
}, function(module, exports) {
    "use strict";
    module.exports = function(args) {
        var id, i, length = args.length;
        if (!length) return "\x02";
        id = String(args[i = 0]);
        for (;--length; ) id += "\x01" + args[++i];
        return id;
    };
}, function(module, exports) {
    "use strict";
    module.exports = function(length) {
        return length ? function(args) {
            for (var id = String(args[0]), i = 0, l = length; --l; ) id += "\x01" + args[++i];
            return id;
        } : function() {
            return "";
        };
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var indexOf = __webpack_require__(103), create = Object.create;
    module.exports = function() {
        var lastId = 0, map = [], cache = create(null);
        return {
            get: function(args) {
                var index = 0, set = map, i, length = args.length;
                if (0 === length) return set[length] || null;
                if (set = set[length]) {
                    for (;index < length - 1; ) {
                        i = indexOf.call(set[0], args[index]);
                        if (i === -1) return null;
                        set = set[1][i];
                        ++index;
                    }
                    i = indexOf.call(set[0], args[index]);
                    return i === -1 ? null : set[1][i] || null;
                }
                return null;
            },
            set: function(args) {
                var index = 0, set = map, i, length = args.length;
                if (0 === length) set[length] = ++lastId; else {
                    set[length] || (set[length] = [ [], [] ]);
                    set = set[length];
                    for (;index < length - 1; ) {
                        i = indexOf.call(set[0], args[index]);
                        if (i === -1) {
                            i = set[0].push(args[index]) - 1;
                            set[1].push([ [], [] ]);
                        }
                        set = set[1][i];
                        ++index;
                    }
                    i = indexOf.call(set[0], args[index]);
                    i === -1 && (i = set[0].push(args[index]) - 1);
                    set[1][i] = ++lastId;
                }
                cache[lastId] = args;
                return lastId;
            },
            delete: function(id) {
                var index = 0, set = map, i, args = cache[id], length = args.length, path = [];
                if (0 === length) delete set[length]; else if (set = set[length]) {
                    for (;index < length - 1; ) {
                        i = indexOf.call(set[0], args[index]);
                        if (i === -1) return;
                        path.push(set, i);
                        set = set[1][i];
                        ++index;
                    }
                    i = indexOf.call(set[0], args[index]);
                    if (i === -1) return;
                    id = set[1][i];
                    set[0].splice(i, 1);
                    set[1].splice(i, 1);
                    for (;!set[0].length && path.length; ) {
                        i = path.pop();
                        set = path.pop();
                        set[0].splice(i, 1);
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
    var toPosInt = __webpack_require__(56), value = __webpack_require__(65), indexOf = Array.prototype.indexOf, hasOwnProperty = Object.prototype.hasOwnProperty, abs = Math.abs, floor = Math.floor;
    module.exports = function(searchElement) {
        var i, l, fromIndex, val;
        if (searchElement === searchElement) return indexOf.apply(this, arguments);
        l = toPosInt(value(this).length);
        fromIndex = arguments[1];
        fromIndex = isNaN(fromIndex) ? 0 : fromIndex >= 0 ? floor(fromIndex) : toPosInt(this.length) - floor(abs(fromIndex));
        for (i = fromIndex; i < l; ++i) if (hasOwnProperty.call(this, i)) {
            val = this[i];
            if (val !== val) return i;
        }
        return -1;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var indexOf = __webpack_require__(103);
    module.exports = function() {
        var lastId = 0, argsMap = [], cache = [];
        return {
            get: function(args) {
                var index = indexOf.call(argsMap, args[0]);
                return index === -1 ? null : cache[index];
            },
            set: function(args) {
                argsMap.push(args[0]);
                cache.push(++lastId);
                return lastId;
            },
            delete: function(id) {
                var index = indexOf.call(cache, id);
                if (index !== -1) {
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
    var indexOf = __webpack_require__(103), create = Object.create;
    module.exports = function(length) {
        var lastId = 0, map = [ [], [] ], cache = create(null);
        return {
            get: function(args) {
                for (var index = 0, set = map, i; index < length - 1; ) {
                    i = indexOf.call(set[0], args[index]);
                    if (i === -1) return null;
                    set = set[1][i];
                    ++index;
                }
                i = indexOf.call(set[0], args[index]);
                return i === -1 ? null : set[1][i] || null;
            },
            set: function(args) {
                for (var index = 0, set = map, i; index < length - 1; ) {
                    i = indexOf.call(set[0], args[index]);
                    if (i === -1) {
                        i = set[0].push(args[index]) - 1;
                        set[1].push([ [], [] ]);
                    }
                    set = set[1][i];
                    ++index;
                }
                i = indexOf.call(set[0], args[index]);
                i === -1 && (i = set[0].push(args[index]) - 1);
                set[1][i] = ++lastId;
                cache[lastId] = args;
                return lastId;
            },
            delete: function(id) {
                for (var index = 0, set = map, i, path = [], args = cache[id]; index < length - 1; ) {
                    i = indexOf.call(set[0], args[index]);
                    if (i === -1) return;
                    path.push(set, i);
                    set = set[1][i];
                    ++index;
                }
                i = indexOf.call(set[0], args[index]);
                if (i !== -1) {
                    id = set[1][i];
                    set[0].splice(i, 1);
                    set[1].splice(i, 1);
                    for (;!set[0].length && path.length; ) {
                        i = path.pop();
                        set = path.pop();
                        set[0].splice(i, 1);
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
    var aFrom = __webpack_require__(86), mixin = __webpack_require__(76), defineLength = __webpack_require__(75), nextTick = __webpack_require__(107), slice = Array.prototype.slice, apply = Function.prototype.apply, create = Object.create, hasOwnProperty = Object.prototype.hasOwnProperty;
    __webpack_require__(66).async = function(tbi, conf) {
        var waiting = create(null), cache = create(null), base = conf.memoized, original = conf.original, currentCallback, currentContext, currentArgs;
        conf.memoized = defineLength(function(arg) {
            var args = arguments, last = args[args.length - 1];
            if ("function" == typeof last) {
                currentCallback = last;
                args = slice.call(args, 0, -1);
            }
            return base.apply(currentContext = this, currentArgs = args);
        }, base);
        try {
            mixin(conf.memoized, base);
        } catch (ignore) {}
        conf.on("get", function(id) {
            var cb, context, args;
            if (currentCallback) if (waiting[id]) {
                "function" == typeof waiting[id] ? waiting[id] = [ waiting[id], currentCallback ] : waiting[id].push(currentCallback);
                currentCallback = null;
            } else {
                cb = currentCallback;
                context = currentContext;
                args = currentArgs;
                currentCallback = currentContext = currentArgs = null;
                nextTick(function() {
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
                });
            }
        });
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
                        "function" == typeof cb ? result = apply.call(cb, this, args) : cb.forEach(function(cb) {
                            result = apply.call(cb, this, args);
                        }, this);
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
        conf.on("set", function(id) {
            if (currentCallback) {
                waiting[id] ? "function" == typeof waiting[id] ? waiting[id] = [ waiting[id], currentCallback.cb ] : waiting[id].push(currentCallback.cb) : waiting[id] = currentCallback.cb;
                delete currentCallback.cb;
                currentCallback.id = id;
                currentCallback = null;
            } else conf.delete(id);
        });
        conf.on("delete", function(id) {
            var result;
            if (!hasOwnProperty.call(waiting, id) && cache[id]) {
                result = cache[id];
                delete cache[id];
                conf.emit("deleteasync", id, result);
            }
        });
        conf.on("clear", function() {
            var oldCache = cache;
            cache = create(null);
            conf.emit("clearasync", oldCache);
        });
    };
}, function(module, exports) {
    "use strict";
    var callable, byObserver;
    callable = function(fn) {
        if ("function" != typeof fn) throw new TypeError(fn + " is not a function");
        return fn;
    };
    byObserver = function(Observer) {
        var node = document.createTextNode(""), queue, i = 0;
        new Observer(function() {
            var data;
            if (queue) {
                data = queue;
                queue = null;
                "function" != typeof data ? data.forEach(function(fn) {
                    fn();
                }) : data();
            }
        }).observe(node, {
            characterData: !0
        });
        return function(fn) {
            callable(fn);
            if (queue) "function" == typeof queue ? queue = [ queue, fn ] : queue.push(fn); else {
                queue = fn;
                node.data = i = ++i % 2;
            }
        };
    };
    module.exports = function() {
        if ("undefined" != typeof process && process && "function" == typeof process.nextTick) return process.nextTick;
        if ("object" == typeof document && document) {
            if ("function" == typeof MutationObserver) return byObserver(MutationObserver);
            if ("function" == typeof WebKitMutationObserver) return byObserver(WebKitMutationObserver);
        }
        return "function" == typeof setImmediate ? function(cb) {
            setImmediate(callable(cb));
        } : "function" == typeof setTimeout ? function(cb) {
            setTimeout(callable(cb), 0);
        } : null;
    }();
}, function(module, exports, __webpack_require__) {
    "use strict";
    var callable = __webpack_require__(62), forEach = __webpack_require__(63), extensions = __webpack_require__(66), slice = Array.prototype.slice, apply = Function.prototype.apply;
    extensions.dispose = function(dispose, conf, options) {
        var del;
        callable(dispose);
        if (options.async && extensions.async) {
            conf.on("deleteasync", del = function(id, result) {
                apply.call(dispose, null, slice.call(result.args, 1));
            });
            conf.on("clearasync", function(cache) {
                forEach(cache, function(result, id) {
                    del(id, result);
                });
            });
        } else {
            conf.on("delete", del = function(id, result) {
                dispose(result);
            });
            conf.on("clear", function(cache) {
                forEach(cache, function(result, id) {
                    del(id, result);
                });
            });
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var aFrom = __webpack_require__(86), noop = __webpack_require__(97), forEach = __webpack_require__(63), timeout = __webpack_require__(110), extensions = __webpack_require__(66), max = Math.max, min = Math.min, create = Object.create;
    extensions.maxAge = function(maxAge, conf, options) {
        var timeouts, postfix, preFetchAge, preFetchTimeouts;
        maxAge = timeout(maxAge);
        if (maxAge) {
            timeouts = create(null);
            postfix = options.async && extensions.async ? "async" : "";
            conf.on("set" + postfix, function(id) {
                timeouts[id] = setTimeout(function() {
                    conf.delete(id);
                }, maxAge);
                if (preFetchTimeouts) {
                    preFetchTimeouts[id] && clearTimeout(preFetchTimeouts[id]);
                    preFetchTimeouts[id] = setTimeout(function() {
                        delete preFetchTimeouts[id];
                    }, preFetchAge);
                }
            });
            conf.on("delete" + postfix, function(id) {
                clearTimeout(timeouts[id]);
                delete timeouts[id];
                if (preFetchTimeouts) {
                    clearTimeout(preFetchTimeouts[id]);
                    delete preFetchTimeouts[id];
                }
            });
            if (options.preFetch) {
                preFetchAge = options.preFetch === !0 || isNaN(options.preFetch) ? .333 : max(min(Number(options.preFetch), 1), 0);
                if (preFetchAge) {
                    preFetchTimeouts = {};
                    preFetchAge = (1 - preFetchAge) * maxAge;
                    conf.on("get" + postfix, function(id, args, context) {
                        preFetchTimeouts[id] || (preFetchTimeouts[id] = setTimeout(function() {
                            delete preFetchTimeouts[id];
                            conf.delete(id);
                            if (options.async) {
                                args = aFrom(args);
                                args.push(noop);
                            }
                            conf.memoized.apply(context, args);
                        }, 0));
                    });
                }
            }
            conf.on("clear" + postfix, function() {
                forEach(timeouts, function(id) {
                    clearTimeout(id);
                });
                timeouts = {};
                if (preFetchTimeouts) {
                    forEach(preFetchTimeouts, function(id) {
                        clearTimeout(id);
                    });
                    preFetchTimeouts = {};
                }
            });
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var toPosInt = __webpack_require__(56), maxTimeout = __webpack_require__(111);
    module.exports = function(value) {
        value = toPosInt(value);
        if (value > maxTimeout) throw new TypeError(value + " exceeds maximum possible timeout");
        return value;
    };
}, function(module, exports) {
    "use strict";
    module.exports = 2147483647;
}, function(module, exports, __webpack_require__) {
    "use strict";
    var toPosInteger = __webpack_require__(56), lruQueue = __webpack_require__(113), extensions = __webpack_require__(66);
    extensions.max = function(max, conf, options) {
        var postfix, queue, hit;
        max = toPosInteger(max);
        if (max) {
            queue = lruQueue(max);
            postfix = options.async && extensions.async ? "async" : "";
            conf.on("set" + postfix, hit = function(id) {
                id = queue.hit(id);
                void 0 !== id && conf.delete(id);
            });
            conf.on("get" + postfix, hit);
            conf.on("delete" + postfix, queue.delete);
            conf.on("clear" + postfix, queue.clear);
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var toPosInt = __webpack_require__(56), create = Object.create, hasOwnProperty = Object.prototype.hasOwnProperty;
    module.exports = function(limit) {
        var size = 0, base = 1, queue = create(null), map = create(null), index = 0, del;
        limit = toPosInt(limit);
        return {
            hit: function(id) {
                var oldIndex = map[id], nuIndex = ++index;
                queue[nuIndex] = id;
                map[id] = nuIndex;
                if (!oldIndex) {
                    ++size;
                    if (size <= limit) return;
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
    var d = __webpack_require__(77), extensions = __webpack_require__(66), create = Object.create, defineProperties = Object.defineProperties;
    extensions.refCounter = function(ignore, conf, options) {
        var cache, postfix;
        cache = create(null);
        postfix = options.async && extensions.async ? "async" : "";
        conf.on("set" + postfix, function(id, length) {
            cache[id] = length || 1;
        });
        conf.on("get" + postfix, function(id) {
            ++cache[id];
        });
        conf.on("delete" + postfix, function(id) {
            delete cache[id];
        });
        conf.on("clear" + postfix, function() {
            cache = {};
        });
        defineProperties(conf.memoized, {
            deleteRef: d(function() {
                var id = conf.get(arguments);
                if (null === id) return null;
                if (!cache[id]) return null;
                if (!--cache[id]) {
                    conf.delete(id);
                    return !0;
                }
                return !1;
            }),
            getRefCount: d(function() {
                var id = conf.get(arguments);
                return null === id ? 0 : cache[id] ? cache[id] : 0;
            })
        });
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var normalizeOpts = __webpack_require__(54), resolveLength = __webpack_require__(116), plain = __webpack_require__(117);
    module.exports = function(fn) {
        var options = normalizeOpts(arguments[1]), length;
        if (!options.normalizer) {
            length = options.length = resolveLength(options.length, fn.length, options.async);
            0 !== length && (options.primitive ? length === !1 ? options.normalizer = __webpack_require__(123) : length > 1 && (options.normalizer = __webpack_require__(124)(length)) : length === !1 ? options.normalizer = __webpack_require__(125)() : 1 === length ? options.normalizer = __webpack_require__(126)() : options.normalizer = __webpack_require__(127)(length));
        }
        options.async && __webpack_require__(128);
        options.promise && __webpack_require__(131);
        options.dispose && __webpack_require__(133);
        options.maxAge && __webpack_require__(134);
        options.max && __webpack_require__(135);
        options.refCounter && __webpack_require__(136);
        return plain(fn, options);
    };
}, 55, function(module, exports, __webpack_require__) {
    "use strict";
    var callable = __webpack_require__(62), forEach = __webpack_require__(63), extensions = __webpack_require__(118), configure = __webpack_require__(119), resolveLength = __webpack_require__(116), hasOwnProperty = Object.prototype.hasOwnProperty;
    module.exports = function self(fn) {
        var options, length, conf;
        callable(fn);
        options = Object(arguments[1]);
        if (options.async && options.promise) throw new Error("Options 'async' and 'promise' cannot be used together");
        if (hasOwnProperty.call(fn, "__memoized__") && !options.force) return fn;
        length = resolveLength(options.length, fn.length, options.async && extensions.async);
        conf = configure(fn, length, options);
        forEach(extensions, function(fn, name) {
            options[name] && fn(options[name], conf, options);
        });
        self.__profiler__ && self.__profiler__(conf);
        conf.updateEnv();
        return conf.memoized;
    };
}, 66, function(module, exports, __webpack_require__) {
    "use strict";
    var customError = __webpack_require__(68), defineLength = __webpack_require__(75), d = __webpack_require__(120), ee = __webpack_require__(82).methods, resolveResolve = __webpack_require__(121), resolveNormalize = __webpack_require__(122), apply = Function.prototype.apply, call = Function.prototype.call, create = Object.create, hasOwnProperty = Object.prototype.hasOwnProperty, defineProperties = Object.defineProperties, on = ee.on, emit = ee.emit;
    module.exports = function(original, length, options) {
        var cache = create(null), conf, memLength, get, set, del, clear, extDel, extGet, extHas, normalizer, getListeners, setListeners, deleteListeners, memoized, resolve;
        memLength = length !== !1 ? length : isNaN(original.length) ? 1 : original.length;
        if (options.normalizer) {
            normalizer = resolveNormalize(options.normalizer);
            get = normalizer.get;
            set = normalizer.set;
            del = normalizer.delete;
            clear = normalizer.clear;
        }
        null != options.resolvers && (resolve = resolveResolve(options.resolvers));
        memoized = get ? defineLength(function(arg) {
            var id, result, args = arguments;
            resolve && (args = resolve(args));
            id = get(args);
            if (null !== id && hasOwnProperty.call(cache, id)) {
                getListeners && conf.emit("get", id, args, this);
                return cache[id];
            }
            result = 1 === args.length ? call.call(original, this, args[0]) : apply.call(original, this, args);
            if (null === id) {
                id = get(args);
                if (null !== id) throw customError("Circular invocation", "CIRCULAR_INVOCATION");
                id = set(args);
            } else if (hasOwnProperty.call(cache, id)) throw customError("Circular invocation", "CIRCULAR_INVOCATION");
            cache[id] = result;
            setListeners && conf.emit("set", id, null, result);
            return result;
        }, memLength) : 0 === length ? function() {
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
        extDel = get ? defineLength(function(arg) {
            var id, args = arguments;
            resolve && (args = resolve(args));
            id = get(args);
            null !== id && conf.delete(id);
        }, memLength) : 0 === length ? function() {
            return conf.delete("data");
        } : function(arg) {
            resolve && (arg = resolve(arguments)[0]);
            return conf.delete(arg);
        };
        extGet = defineLength(function() {
            var id, args = arguments;
            resolve && (args = resolve(args));
            id = get(args);
            return cache[id];
        });
        extHas = defineLength(function() {
            var id, args = arguments;
            resolve && (args = resolve(args));
            id = get(args);
            return null !== id && conf.has(id);
        });
        defineProperties(memoized, {
            __memoized__: d(!0),
            delete: d(extDel),
            clear: d(conf.clear),
            _get: d(extGet),
            _has: d(extHas)
        });
        return conf;
    };
}, 77, 84, function(module, exports, __webpack_require__) {
    "use strict";
    var callable = __webpack_require__(62);
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
}, 100, 101, 102, 104, 105, function(module, exports, __webpack_require__) {
    "use strict";
    var aFrom = __webpack_require__(86), objectMap = __webpack_require__(129), mixin = __webpack_require__(76), defineLength = __webpack_require__(75), nextTick = __webpack_require__(130), slice = Array.prototype.slice, apply = Function.prototype.apply, create = Object.create, hasOwnProperty = Object.prototype.hasOwnProperty;
    __webpack_require__(118).async = function(tbi, conf) {
        var waiting = create(null), cache = create(null), base = conf.memoized, original = conf.original, currentCallback, currentContext, currentArgs;
        conf.memoized = defineLength(function(arg) {
            var args = arguments, last = args[args.length - 1];
            if ("function" == typeof last) {
                currentCallback = last;
                args = slice.call(args, 0, -1);
            }
            return base.apply(currentContext = this, currentArgs = args);
        }, base);
        try {
            mixin(conf.memoized, base);
        } catch (ignore) {}
        conf.on("get", function(id) {
            var cb, context, args;
            if (currentCallback) if (waiting[id]) {
                "function" == typeof waiting[id] ? waiting[id] = [ waiting[id], currentCallback ] : waiting[id].push(currentCallback);
                currentCallback = null;
            } else {
                cb = currentCallback;
                context = currentContext;
                args = currentArgs;
                currentCallback = currentContext = currentArgs = null;
                nextTick(function() {
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
                });
            }
        });
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
                        "function" == typeof cb ? result = apply.call(cb, this, args) : cb.forEach(function(cb) {
                            result = apply.call(cb, this, args);
                        }, this);
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
        conf.on("set", function(id) {
            if (currentCallback) {
                waiting[id] ? "function" == typeof waiting[id] ? waiting[id] = [ waiting[id], currentCallback.cb ] : waiting[id].push(currentCallback.cb) : waiting[id] = currentCallback.cb;
                delete currentCallback.cb;
                currentCallback.id = id;
                currentCallback = null;
            } else conf.delete(id);
        });
        conf.on("delete", function(id) {
            var result;
            if (!hasOwnProperty.call(waiting, id) && cache[id]) {
                result = cache[id];
                delete cache[id];
                conf.emit("deleteasync", id, slice.call(result.args, 1));
            }
        });
        conf.on("clear", function() {
            var oldCache = cache;
            cache = create(null);
            conf.emit("clearasync", objectMap(oldCache, function(data) {
                return slice.call(data.args, 1);
            }));
        });
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var callable = __webpack_require__(62), forEach = __webpack_require__(63), call = Function.prototype.call;
    module.exports = function(obj, cb) {
        var o = {}, thisArg = arguments[2];
        callable(cb);
        forEach(obj, function(value, key, obj, index) {
            o[key] = call.call(cb, thisArg, value, key, obj, index);
        });
        return o;
    };
}, function(module, exports) {
    "use strict";
    var callable, byObserver;
    callable = function(fn) {
        if ("function" != typeof fn) throw new TypeError(fn + " is not a function");
        return fn;
    };
    byObserver = function(Observer) {
        var node = document.createTextNode(""), queue, currentQueue, i = 0;
        new Observer(function() {
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
        }).observe(node, {
            characterData: !0
        });
        return function(fn) {
            callable(fn);
            if (queue) "function" == typeof queue ? queue = [ queue, fn ] : queue.push(fn); else {
                queue = fn;
                node.data = i = ++i % 2;
            }
        };
    };
    module.exports = function() {
        if ("object" == typeof process && process && "function" == typeof process.nextTick) return process.nextTick;
        if ("object" == typeof document && document) {
            if ("function" == typeof MutationObserver) return byObserver(MutationObserver);
            if ("function" == typeof WebKitMutationObserver) return byObserver(WebKitMutationObserver);
        }
        return "function" == typeof setImmediate ? function(cb) {
            setImmediate(callable(cb));
        } : "function" == typeof setTimeout || "object" == typeof setTimeout ? function(cb) {
            setTimeout(callable(cb), 0);
        } : null;
    }();
}, function(module, exports, __webpack_require__) {
    "use strict";
    var objectMap = __webpack_require__(129), isPromise = __webpack_require__(132), nextTick = __webpack_require__(130), create = Object.create, hasOwnProperty = Object.prototype.hasOwnProperty;
    __webpack_require__(118).promise = function(mode, conf) {
        var waiting = create(null), cache = create(null), promises = create(null);
        conf.on("set", function(id, ignore, promise) {
            var isFailed = !1;
            if (isPromise(promise)) {
                waiting[id] = 1;
                promises[id] = promise;
                var onSuccess = function(result) {
                    var count = waiting[id];
                    if (isFailed) throw new Error("Memoizee error: Promise resolved with both failure and success, this can be result of unordered done & finally resolution.\nInstead of `promise: true` consider configuring memoization via `promise: 'then'` or `promise: 'done'");
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
                };
                if ("then" !== mode && "function" == typeof promise.done) if ("done" !== mode && "function" == typeof promise.finally) {
                    promise.done(onSuccess);
                    promise.finally(onFailure);
                } else promise.done(onSuccess, onFailure); else promise.then(function(result) {
                    nextTick(onSuccess.bind(this, result));
                }, function() {
                    nextTick(onFailure);
                });
            } else {
                cache[id] = promise;
                conf.emit("setasync", id, 1);
            }
        });
        conf.on("get", function(id, args, context) {
            var promise;
            if (waiting[id]) ++waiting[id]; else {
                promise = promises[id];
                var emit = function() {
                    conf.emit("getasync", id, args, context);
                };
                isPromise(promise) ? "function" == typeof promise.done ? promise.done(emit) : promise.then(function() {
                    nextTick(emit);
                }) : emit();
            }
        });
        conf.on("delete", function(id) {
            delete promises[id];
            if (waiting[id]) delete waiting[id]; else if (hasOwnProperty.call(cache, id)) {
                var result = cache[id];
                delete cache[id];
                conf.emit("deleteasync", id, [ result ]);
            }
        });
        conf.on("clear", function() {
            var oldCache = cache;
            cache = create(null);
            waiting = create(null);
            promises = create(null);
            conf.emit("clearasync", objectMap(oldCache, function(data) {
                return [ data ];
            }));
        });
    };
}, function(module, exports) {
    function isPromise(obj) {
        return !!obj && ("object" == typeof obj || "function" == typeof obj) && "function" == typeof obj.then;
    }
    module.exports = isPromise;
}, function(module, exports, __webpack_require__) {
    "use strict";
    var callable = __webpack_require__(62), forEach = __webpack_require__(63), extensions = __webpack_require__(118), apply = Function.prototype.apply;
    extensions.dispose = function(dispose, conf, options) {
        var del;
        callable(dispose);
        if (options.async && extensions.async || options.promise && extensions.promise) {
            conf.on("deleteasync", del = function(id, resultArray) {
                apply.call(dispose, null, resultArray);
            });
            conf.on("clearasync", function(cache) {
                forEach(cache, function(result, id) {
                    del(id, result);
                });
            });
        } else {
            conf.on("delete", del = function(id, result) {
                dispose(result);
            });
            conf.on("clear", function(cache) {
                forEach(cache, function(result, id) {
                    del(id, result);
                });
            });
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var aFrom = __webpack_require__(86), forEach = __webpack_require__(63), nextTick = __webpack_require__(130), isPromise = __webpack_require__(132), timeout = __webpack_require__(110), extensions = __webpack_require__(118), noop = Function.prototype, max = Math.max, min = Math.min, create = Object.create;
    extensions.maxAge = function(maxAge, conf, options) {
        var timeouts, postfix, preFetchAge, preFetchTimeouts;
        maxAge = timeout(maxAge);
        if (maxAge) {
            timeouts = create(null);
            postfix = options.async && extensions.async || options.promise && extensions.promise ? "async" : "";
            conf.on("set" + postfix, function(id) {
                timeouts[id] = setTimeout(function() {
                    conf.delete(id);
                }, maxAge);
                if (preFetchTimeouts) {
                    preFetchTimeouts[id] && "nextTick" !== preFetchTimeouts[id] && clearTimeout(preFetchTimeouts[id]);
                    preFetchTimeouts[id] = setTimeout(function() {
                        delete preFetchTimeouts[id];
                    }, preFetchAge);
                }
            });
            conf.on("delete" + postfix, function(id) {
                clearTimeout(timeouts[id]);
                delete timeouts[id];
                if (preFetchTimeouts) {
                    "nextTick" !== preFetchTimeouts[id] && clearTimeout(preFetchTimeouts[id]);
                    delete preFetchTimeouts[id];
                }
            });
            if (options.preFetch) {
                preFetchAge = options.preFetch === !0 || isNaN(options.preFetch) ? .333 : max(min(Number(options.preFetch), 1), 0);
                if (preFetchAge) {
                    preFetchTimeouts = {};
                    preFetchAge = (1 - preFetchAge) * maxAge;
                    conf.on("get" + postfix, function(id, args, context) {
                        if (!preFetchTimeouts[id]) {
                            preFetchTimeouts[id] = "nextTick";
                            nextTick(function() {
                                var result;
                                if ("nextTick" === preFetchTimeouts[id]) {
                                    delete preFetchTimeouts[id];
                                    conf.delete(id);
                                    if (options.async) {
                                        args = aFrom(args);
                                        args.push(noop);
                                    }
                                    result = conf.memoized.apply(context, args);
                                    options.promise && isPromise(result) && ("function" == typeof result.done ? result.done(noop, noop) : result.then(noop, noop));
                                }
                            });
                        }
                    });
                }
            }
            conf.on("clear" + postfix, function() {
                forEach(timeouts, function(id) {
                    clearTimeout(id);
                });
                timeouts = {};
                if (preFetchTimeouts) {
                    forEach(preFetchTimeouts, function(id) {
                        "nextTick" !== id && clearTimeout(id);
                    });
                    preFetchTimeouts = {};
                }
            });
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var toPosInteger = __webpack_require__(56), lruQueue = __webpack_require__(113), extensions = __webpack_require__(118);
    extensions.max = function(max, conf, options) {
        var postfix, queue, hit;
        max = toPosInteger(max);
        if (max) {
            queue = lruQueue(max);
            postfix = options.async && extensions.async || options.promise && extensions.promise ? "async" : "";
            conf.on("set" + postfix, hit = function(id) {
                id = queue.hit(id);
                void 0 !== id && conf.delete(id);
            });
            conf.on("get" + postfix, hit);
            conf.on("delete" + postfix, queue.delete);
            conf.on("clear" + postfix, queue.clear);
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var d = __webpack_require__(120), extensions = __webpack_require__(118), create = Object.create, defineProperties = Object.defineProperties;
    extensions.refCounter = function(ignore, conf, options) {
        var cache, postfix;
        cache = create(null);
        postfix = options.async && extensions.async || options.promise && extensions.promise ? "async" : "";
        conf.on("set" + postfix, function(id, length) {
            cache[id] = length || 1;
        });
        conf.on("get" + postfix, function(id) {
            ++cache[id];
        });
        conf.on("delete" + postfix, function(id) {
            delete cache[id];
        });
        conf.on("clear" + postfix, function() {
            cache = {};
        });
        defineProperties(conf.memoized, {
            deleteRef: d(function() {
                var id = conf.get(arguments);
                if (null === id) return null;
                if (!cache[id]) return null;
                if (!--cache[id]) {
                    conf.delete(id);
                    return !0;
                }
                return !1;
            }),
            getRefCount: d(function() {
                var id = conf.get(arguments);
                return null === id ? 0 : cache[id] ? cache[id] : 0;
            })
        });
    };
}, function(module, exports, __webpack_require__) {
    (function() {
        var _, getField;
        _ = __webpack_require__(4);
        getField = function(table, fieldName) {
            var i, len, tableField, tableFields;
            fieldName = fieldName.replace(/_/g, " ");
            tableFields = table.fields;
            for (i = 0, len = tableFields.length; i < len; i++) {
                tableField = tableFields[i];
                if (tableField.fieldName === fieldName) return tableField;
            }
            console.error("Cannot find field", table, fieldName);
            throw new Error("Cannot find field: " + table.name + " : " + fieldName);
        };
        module.exports = function(sqlModel) {
            var addMapping, fieldName, i, idPart, idParts, len, part, ref, resourceField, resourceName, resourceToSQLMappings, resources, sqlFieldName, sqlTable, sqlTableName, table, tables;
            tables = sqlModel.tables;
            resources = {};
            resourceToSQLMappings = {};
            addMapping = function(resourceName, resourceField, sqlTableName, sqlFieldName) {
                return resourceToSQLMappings[resourceName][resourceField] = [ sqlTableName, sqlFieldName ];
            };
            for (resourceName in tables) {
                table = tables[resourceName];
                if (table.exists !== !1) {
                    idParts = resourceName.split("-");
                    resourceName = function() {
                        var i, len, results;
                        results = [];
                        for (i = 0, len = idParts.length; i < len; i++) {
                            idPart = idParts[i];
                            results.push(idPart.split(/[ -]/).join("_"));
                        }
                        return results;
                    }().join("__");
                    resourceToSQLMappings[resourceName] = {};
                    if (_.isString(table)) {
                        sqlTable = tables[idParts[0]];
                        resourceToSQLMappings[resourceName]._name = sqlTable.name;
                        sqlFieldName = sqlTable.idField;
                        resourceField = sqlTableName = sqlTable.name;
                        addMapping(resourceName, resourceField, sqlTableName, sqlFieldName);
                        resources[resourceName] = {
                            resourceName: resourceName,
                            modelName: function() {
                                var i, len, results;
                                results = [];
                                for (i = 0, len = idParts.length; i < len; i++) {
                                    part = idParts[i];
                                    results.push(part.replace(/_/g, " "));
                                }
                                return results;
                            }().join(" "),
                            topLevel: 1 === idParts.length,
                            fields: [ {
                                dataType: "ForeignKey",
                                fieldName: resourceField,
                                required: !0,
                                index: null,
                                references: {
                                    tableName: sqlTableName,
                                    fieldName: sqlFieldName
                                }
                            } ],
                            idField: resourceField,
                            referenceScheme: resourceField,
                            actions: [ "view", "add", "delete" ]
                        };
                        switch (table) {
                          case "Attribute":
                          case "ForeignKey":
                            resourceField = sqlFieldName = idParts[2].replace(/_/g, " ");
                            sqlTableName = sqlTable.name;
                            addMapping(resourceName, resourceField, sqlTableName, sqlFieldName);
                            resources[resourceName].fields.push(getField(sqlTable, sqlFieldName));
                            resources[resourceName].referenceScheme = resourceField;
                            break;

                          case "BooleanAttribute":
                            resourceField = sqlFieldName = idParts[1].replace(/_/g, " ");
                            sqlTableName = sqlTable.name;
                            addMapping(resourceName, resourceField, sqlTableName, sqlFieldName);
                            resources[resourceName].fields.push(getField(sqlTable, sqlFieldName));
                            resources[resourceName].referenceScheme = resourceField;
                            break;

                          default:
                            throw new Error("Unrecognised table type");
                        }
                    } else {
                        resourceToSQLMappings[resourceName]._name = table.name;
                        resources[resourceName] = {
                            resourceName: resourceName,
                            modelName: function() {
                                var i, len, results;
                                results = [];
                                for (i = 0, len = idParts.length; i < len; i++) {
                                    part = idParts[i];
                                    results.push(part.replace(/_/g, " "));
                                }
                                return results;
                            }().join(" "),
                            topLevel: 1 === idParts.length,
                            fields: table.fields,
                            idField: table.idField,
                            actions: [ "view", "add", "edit", "delete" ]
                        };
                        null != table.referenceScheme && (resources[resourceName].referenceScheme = table.referenceScheme);
                        ref = table.fields;
                        for (i = 0, len = ref.length; i < len; i++) {
                            fieldName = ref[i].fieldName;
                            addMapping(resourceName, fieldName.replace(/\ /g, "_"), table.name, fieldName);
                        }
                    }
                }
            }
            return {
                resources: resources,
                resourceToSQLMappings: resourceToSQLMappings
            };
        };
    }).call(this);
}, function(module, exports, __webpack_require__) {
    var _, forEachUniqueTable, getResourceName, sbvrTypes;
    _ = __webpack_require__(4);
    sbvrTypes = __webpack_require__(36);
    getResourceName = function(resourceName) {
        var idPart, idParts;
        idParts = resourceName.split("-");
        return function() {
            var j, len, results;
            results = [];
            for (j = 0, len = idParts.length; j < len; j++) {
                idPart = idParts[j];
                results.push(idPart.split(/[ -]/).join("_"));
            }
            return results;
        }().join("__");
    };
    forEachUniqueTable = function(model, callback) {
        var key, results, table, usedTableNames;
        usedTableNames = {};
        results = [];
        for (key in model) {
            table = model[key];
            if (!(_.isString(model[key]) || table.primitive || usedTableNames[table.name])) {
                usedTableNames[table.name] = !0;
                results.push(callback(key, table));
            }
        }
        return results;
    };
    module.exports = function(vocabulary, sqlModel) {
        var associations, cardinality, complexType, complexTypes, ends, model, name, resolveDataType, resourceName, typeName;
        complexTypes = {};
        resolveDataType = function(fieldType) {
            if (null != sbvrTypes[fieldType]) {
                null != sbvrTypes[fieldType].types.odata.complexType && (complexTypes[fieldType] = sbvrTypes[fieldType].types.odata.complexType);
                return sbvrTypes[fieldType].types.odata.name;
            }
            console.error("Could not resolve type", fieldType);
            throw new Error("Could not resolve type" + fieldType);
        };
        model = sqlModel.tables;
        associations = [];
        forEachUniqueTable(model, function(key, arg) {
            var dataType, fields, i, j, len, ref, referencedResource, references, required, resourceName, results;
            resourceName = arg.name, fields = arg.fields;
            resourceName = getResourceName(resourceName);
            results = [];
            for (i = j = 0, len = fields.length; j < len; i = ++j) {
                ref = fields[i], dataType = ref.dataType, required = ref.required, references = ref.references;
                if ("ForeignKey" === dataType) {
                    referencedResource = references.tableName;
                    referencedResource = getResourceName(referencedResource);
                    results.push(associations.push({
                        name: resourceName + referencedResource,
                        ends: [ {
                            resourceName: resourceName,
                            cardinality: required ? "1" : "0..1"
                        }, {
                            resourceName: referencedResource,
                            cardinality: "*"
                        } ]
                    }));
                }
            }
            return results;
        });
        return '<?xml version="1.0" encoding="iso-8859-1" standalone="yes"?>\n<edmx:Edmx Version="1.0" xmlns:edmx="http://schemas.microsoft.com/ado/2007/06/edmx">\n\t<edmx:DataServices xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" m:DataServiceVersion="2.0">\n\t\t<Schema Namespace="' + vocabulary + '"\n\t\t\txmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices"\n\t\t\txmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata"\n\t\t\txmlns="http://schemas.microsoft.com/ado/2008/09/edm">\n' + forEachUniqueTable(model, function(key, arg) {
            var dataType, fieldName, fields, idField, referencedResource, references, required, resourceName;
            idField = arg.idField, resourceName = arg.name, fields = arg.fields;
            resourceName = getResourceName(resourceName);
            return '<EntityType Name="' + resourceName + '">\n\t<Key>\n\t\t<PropertyRef Name="' + idField + '" />\n\t</Key>\n' + function() {
                var j, len, ref, results;
                results = [];
                for (j = 0, len = fields.length; j < len; j++) {
                    ref = fields[j], dataType = ref.dataType, fieldName = ref.fieldName, required = ref.required;
                    if ("ForeignKey" !== dataType) {
                        dataType = resolveDataType(dataType);
                        fieldName = getResourceName(fieldName);
                        results.push('<Property Name="' + fieldName + '" Type="' + dataType + '" Nullable="' + !required + '" />');
                    }
                }
                return results;
            }().join("\n") + "\n" + function() {
                var j, len, ref, results;
                results = [];
                for (j = 0, len = fields.length; j < len; j++) {
                    ref = fields[j], dataType = ref.dataType, fieldName = ref.fieldName, references = ref.references;
                    if ("ForeignKey" === dataType) {
                        referencedResource = references.tableName;
                        fieldName = getResourceName(fieldName);
                        referencedResource = getResourceName(referencedResource);
                        results.push('<NavigationProperty Name="' + fieldName + '" Relationship="' + vocabulary + "." + (resourceName + referencedResource) + '" FromRole="' + resourceName + '" ToRole="' + referencedResource + '" />');
                    }
                }
                return results;
            }().join("\n") + "\n</EntityType>";
        }).join("\n\n") + function() {
            var j, len, ref, results;
            results = [];
            for (j = 0, len = associations.length; j < len; j++) {
                ref = associations[j], name = ref.name, ends = ref.ends;
                name = getResourceName(name);
                results.push('<Association Name="' + name + '">\n\t' + function() {
                    var k, len1, ref1, results1;
                    results1 = [];
                    for (k = 0, len1 = ends.length; k < len1; k++) {
                        ref1 = ends[k], resourceName = ref1.resourceName, cardinality = ref1.cardinality;
                        results1.push('<End Role="' + resourceName + '" Type="' + vocabulary + "." + resourceName + '" Multiplicity="' + cardinality + '" />');
                    }
                    return results1;
                }().join("\n\t") + "\n</Association>");
            }
            return results;
        }().join("\n") + ('<EntityContainer Name="' + vocabulary + 'Service" m:IsDefaultEntityContainer="true">\n') + forEachUniqueTable(model, function(key, arg) {
            var resourceName;
            resourceName = arg.name;
            resourceName = getResourceName(resourceName);
            return '<EntitySet Name="' + resourceName + '" EntityType="' + vocabulary + "." + resourceName + '" />';
        }).join("\n") + "\n" + function() {
            var j, len, ref, results;
            results = [];
            for (j = 0, len = associations.length; j < len; j++) {
                ref = associations[j], name = ref.name, ends = ref.ends;
                name = getResourceName(name);
                results.push('<AssociationSet Name="' + name + '" Association="' + vocabulary + "." + name + '">\n\t' + function() {
                    var k, len1, ref1, results1;
                    results1 = [];
                    for (k = 0, len1 = ends.length; k < len1; k++) {
                        ref1 = ends[k], resourceName = ref1.resourceName, cardinality = ref1.cardinality;
                        results1.push('<End Role="' + resourceName + '" EntitySet="' + vocabulary + "." + resourceName + '" />');
                    }
                    return results1;
                }().join("\n\t") + "</AssociationSet>");
            }
            return results;
        }().join("\n") + "</EntityContainer>" + function() {
            var results;
            results = [];
            for (typeName in complexTypes) {
                complexType = complexTypes[typeName];
                results.push(complexType);
            }
            return results;
        }().join("\n") + "\t\t</Schema>\n\t</edmx:DataServices>\n</edmx:Edmx>";
    };
}, function(module, exports) {
    module.exports = "Vocabulary: dev\n\nTerm:       model value\n\tConcept Type: JSON (Type)\nTerm:       model\n\tReference Scheme: model value\nTerm:       vocabulary\n\tConcept Type: Short Text (Type)\nTerm:       model type\n\tConcept Type: Short Text (Type)\n\nFact Type: model is of vocabulary\n\tNecessity: Each model is of exactly one vocabulary\nFact Type: model has model type\n\tNecessity: Each model has exactly one model type\nFact Type: model has model value\n\tNecessity: Each model has exactly one model value\n";
}, function(module, exports, __webpack_require__) {
    var Promise, _, fs, permissions, sbvrUtils;
    _ = __webpack_require__(4);
    Promise = __webpack_require__(2);
    sbvrUtils = __webpack_require__(24);
    permissions = __webpack_require__(46);
    fs = Promise.promisifyAll(__webpack_require__(141));
    exports.setup = function(app) {
        var loadApplicationConfig, loadConfig, loadJSON;
        loadConfig = function(data) {
            return sbvrUtils.db.transaction().then(function(tx) {
                return Promise.map(data.models, function(model) {
                    if (null != model.modelText) return sbvrUtils.executeModel(tx, model).then(function() {
                        return console.info("Sucessfully executed " + model.modelName + " model.");
                    }).catch(function(err) {
                        throw new Error([ "Failed to execute " + model.modelName + " model from " + model.modelFile, err, err.stack ]);
                    });
                }).then(function() {
                    var authApiTx, i, len, ref, user;
                    authApiTx = sbvrUtils.api.Auth.clone({
                        passthrough: {
                            tx: tx,
                            req: permissions.root
                        }
                    });
                    if (null != data.users) {
                        permissions = {};
                        ref = data.users;
                        for (i = 0, len = ref.length; i < len; i++) {
                            user = ref[i];
                            null != user.permissions && _.each(user.permissions, function(permissionName) {
                                return null != permissions[permissionName] ? permissions[permissionName] : permissions[permissionName] = authApiTx.get({
                                    resource: "permission",
                                    options: {
                                        select: "id",
                                        filter: {
                                            name: permissionName
                                        }
                                    }
                                }).then(function(result) {
                                    return 0 === result.length ? authApiTx.post({
                                        resource: "permission",
                                        body: {
                                            name: permissionName
                                        }
                                    }).get("id") : result[0].id;
                                }).catch(function(e) {
                                    e.message = 'Could not create or find permission "' + permissionName + '": ' + e.message;
                                    throw e;
                                });
                            });
                        }
                        return Promise.map(data.users, function(user) {
                            return authApiTx.get({
                                resource: "user",
                                options: {
                                    select: "id",
                                    filter: {
                                        username: user.username
                                    }
                                }
                            }).then(function(result) {
                                return 0 === result.length ? authApiTx.post({
                                    resource: "user",
                                    body: {
                                        username: user.username,
                                        password: user.password
                                    }
                                }).get("id") : result[0].id;
                            }).then(function(userID) {
                                if (null != user.permissions) return Promise.map(user.permissions, function(permissionName) {
                                    return permissions[permissionName].then(function(permissionID) {
                                        return authApiTx.get({
                                            resource: "user__has__permission",
                                            options: {
                                                select: "id",
                                                filter: {
                                                    user: userID,
                                                    permission: permissionID
                                                }
                                            }
                                        }).then(function(result) {
                                            if (0 === result.length) return authApiTx.post({
                                                resource: "user__has__permission",
                                                body: {
                                                    user: userID,
                                                    permission: permissionID
                                                }
                                            });
                                        });
                                    });
                                });
                            }).catch(function(e) {
                                e.message = 'Could not create or find user "' + user.username + '": ' + e.message;
                                throw e;
                            });
                        });
                    }
                }).catch(function(err) {
                    tx.rollback();
                    throw err;
                }).then(function() {
                    tx.end();
                    return Promise.map(data.models, function(model) {
                        var apiRoute, customCode, e;
                        if (null != model.modelText) {
                            apiRoute = "/" + model.apiRoot + "/*";
                            app.options(apiRoute, function(req, res) {
                                return res.sendStatus(200);
                            });
                            app.all(apiRoute, sbvrUtils.handleODataRequest);
                        }
                        if (null != model.customServerCode) {
                            if (_.isObject(model.customServerCode)) customCode = model.customServerCode; else try {
                                customCode = nodeRequire(model.customServerCode);
                            } catch (error) {
                                e = error;
                                e.message = "Error loading custom server code: " + e.message;
                                throw e;
                            }
                            if (!_.isFunction(customCode.setup)) return;
                            try {
                                return new Promise(function(resolve, reject) {
                                    var promise;
                                    promise = customCode.setup(app, sbvrUtils, sbvrUtils.db, function(err) {
                                        return err ? reject(err) : resolve();
                                    });
                                    if (Promise.is(promise)) return resolve(promise);
                                });
                            } catch (error) {
                                e = error;
                                e.message = "Error running custom server code: " + e.message;
                                throw e;
                            }
                        }
                    });
                });
            });
        };
        loadJSON = function(path) {
            var json;
            console.info("Loading JSON:", path);
            json = fs.readFileSync(path, "utf8");
            return JSON.parse(json);
        };
        loadApplicationConfig = function(config) {
            var path, root;
            try {
                __webpack_require__(142);
            } catch (error) {}
            path = __webpack_require__(143);
            console.info("Loading application config");
            switch (typeof config) {
              case "undefined":
                root = process.argv[2] || __dirname;
                config = loadJSON(path.join(root, "config.json"));
                break;

              case "string":
                root = path.dirname(config);
                config = loadJSON(config);
                break;

              case "object":
                root = process.cwd();
            }
            return Promise.map(config.models, function(model) {
                return fs.readFileAsync(path.join(root, model.modelFile), "utf8").then(function(modelText) {
                    model.modelText = modelText;
                    if (null != model.customServerCode) return model.customServerCode = root + "/" + model.customServerCode;
                }).then(function() {
                    var migrationsPath;
                    model.migrations || (model.migrations = {});
                    if (model.migrationsPath) {
                        migrationsPath = path.join(root, model.migrationsPath);
                        delete model.migrationsPath;
                        return fs.readdirAsync(migrationsPath).map(function(filename) {
                            var filePath, fn, migrationKey;
                            filePath = path.join(migrationsPath, filename);
                            migrationKey = filename.split("-")[0];
                            switch (path.extname(filename)) {
                              case ".coffee":
                              case ".js":
                                fn = nodeRequire(filePath);
                                return model.migrations[migrationKey] = fn;

                              case ".sql":
                                return fs.readFileAsync(filePath).then(function(sqlBuffer) {
                                    return model.migrations[migrationKey] = sqlBuffer.toString();
                                });

                              default:
                                return console.error("Unrecognised migration file extension, skipping: " + path.extname(filename));
                            }
                        });
                    }
                });
            }).then(function() {
                return loadConfig(config);
            }).catch(function(err) {
                console.error("Error loading application config", err, err.stack);
                return process.exit();
            });
        };
        return {
            loadConfig: loadConfig,
            loadApplicationConfig: loadApplicationConfig
        };
    };
}, function(module, exports) {
    module.exports = require("fs");
}, function(module, exports) {
    module.exports = require("coffee-script/register");
}, function(module, exports) {
    module.exports = require("path");
}, function(module, exports, __webpack_require__) {
    var PinejsSessionStore, _, expressSession, permissions, sessionAPI, sessionModel, extend = function(child, parent) {
        function ctor() {
            this.constructor = child;
        }
        for (var key in parent) hasProp.call(parent, key) && (child[key] = parent[key]);
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }, hasProp = {}.hasOwnProperty;
    _ = __webpack_require__(4);
    expressSession = __webpack_require__(145);
    permissions = __webpack_require__(46);
    sessionAPI = null;
    sessionModel = "Vocabulary: session\n\nTerm:       session id\n\tConcept Type: Short Text (Type)\nTerm:       data\n\tConcept Type: JSON (Type)\nTerm:       expiry time\n\tConcept type: Date Time (Type)\n\nTerm:       session\n\tDatabase ID Field: session id\n\tReference Scheme: session id\n\nFact type:  session has data\n\tNecessity: Each session has exactly 1 data\nFact type:  session has session id\n\tNecessity: Each session has exactly 1 session id\n\tNecessity: Each session id is of exactly 1 session\nFact type:  session has expiry time\n\tNecessity: Each session has at most 1 expiry time";
    PinejsSessionStore = function(superClass) {
        function PinejsSessionStore() {}
        extend(PinejsSessionStore, superClass);
        PinejsSessionStore.prototype.get = function(sid, callback) {
            return sessionAPI.get({
                resource: "session",
                id: sid,
                passthrough: {
                    req: permissions.rootRead
                },
                options: {
                    select: "data"
                }
            }).then(function(session) {
                return null != session ? session.data : void 0;
            }).nodeify(callback);
        };
        PinejsSessionStore.prototype.set = function(sid, data, callback) {
            var body, ref, ref1;
            body = {
                session_id: sid,
                data: data,
                expiry_time: null != (ref = null != data && null != (ref1 = data.cookie) ? ref1.expires : void 0) ? ref : null
            };
            return sessionAPI.put({
                resource: "session",
                id: sid,
                passthrough: {
                    req: permissions.root
                },
                body: body
            }).nodeify(callback);
        };
        PinejsSessionStore.prototype.destroy = function(sid, callback) {
            return sessionAPI.delete({
                resource: "session",
                id: sid,
                passthrough: {
                    req: permissions.root
                }
            }).nodeify(callback);
        };
        PinejsSessionStore.prototype.all = function(callback) {
            return sessionAPI.get({
                resource: "session",
                passthrough: {
                    req: permissions.root
                },
                options: {
                    select: "session_id",
                    filter: {
                        expiry_time: {
                            $ge: Date.now()
                        }
                    }
                }
            }).then(function(sessions) {
                return _.map(sessions, "session_id");
            }).nodeify(callback);
        };
        PinejsSessionStore.prototype.clear = function(callback) {
            return sessionAPI.delete({
                resource: "session",
                passthrough: {
                    req: permissions.root
                }
            }).nodeify(callback);
        };
        PinejsSessionStore.prototype.length = function(callback) {
            return sessionAPI.get({
                resource: "session",
                passthrough: {
                    req: permissions.rootRead
                },
                options: {
                    select: "session_id",
                    filter: {
                        expiry_time: {
                            $ge: Date.now()
                        }
                    }
                }
            }).then(function(sessions) {
                return sessions.length;
            }).nodeify(callback);
        };
        return PinejsSessionStore;
    }(expressSession.Store);
    PinejsSessionStore.config = {
        models: [ {
            modelName: "session",
            modelText: sessionModel,
            apiRoot: "session",
            logging: {
                default: !1,
                error: !0
            },
            customServerCode: PinejsSessionStore
        } ]
    };
    PinejsSessionStore.setup = function(app, sbvrUtils, db, callback) {
        sessionAPI = sbvrUtils.api.session;
        return callback();
    };
    module.exports = PinejsSessionStore;
}, function(module, exports) {
    module.exports = require("express-session");
}, function(module, exports, __webpack_require__) {
    var Promise, isServerOnAir, permissions, serverIsOnAir, uiModel, hasProp = {}.hasOwnProperty;
    Promise = __webpack_require__(2);
    permissions = __webpack_require__(46);
    uiModel = "Vocabulary: ui\n\nTerm:       text\n\tConcept type: Text (Type)\nTerm:       name\n\tConcept type: Short Text (Type)\nTerm:       textarea\n\t--Database id Field: name\n\tReference Scheme: text\nFact type:  textarea is disabled\nFact type:  textarea has name\n\tNecessity: Each textarea has exactly 1 name\n\tNecessity: Each name is of exactly 1 textarea\nFact type:  textarea has text\n\tNecessity: Each textarea has exactly 1 text";
    isServerOnAir = function() {
        var promise, resolve;
        resolve = null;
        promise = new Promise(function(_resolve) {
            return resolve = _resolve;
        });
        return function(value) {
            if (null != value) if (promise.isPending()) {
                resolve(value);
                resolve = null;
            } else promise = Promise.fulfilled(value);
            return promise;
        };
    }();
    serverIsOnAir = function(req, res, next) {
        return isServerOnAir().then(function(onAir) {
            return onAir ? next() : next("route");
        });
    };
    exports.config = {
        models: [ {
            modelName: "ui",
            modelText: uiModel,
            apiRoot: "ui",
            customServerCode: exports
        } ]
    };
    exports.setup = function(app, sbvrUtils, db) {
        var devApi, setupModels, uiApi;
        uiApi = sbvrUtils.api.ui;
        devApi = sbvrUtils.api.dev;
        setupModels = function(tx) {
            var uiApiTx;
            uiApiTx = uiApi.clone({
                passthrough: {
                    tx: tx,
                    req: permissions.root
                }
            });
            return uiApiTx.get({
                resource: "textarea",
                options: {
                    select: "id",
                    filter: {
                        name: "model_area"
                    }
                }
            }).then(function(result) {
                if (0 === result.length) return uiApiTx.post({
                    resource: "textarea",
                    body: {
                        name: "model_area",
                        text: " "
                    }
                });
            }).then(function() {
                return devApi.get({
                    resource: "model",
                    passthrough: {
                        tx: tx,
                        req: permissions.rootRead
                    },
                    options: {
                        select: [ "vocabulary", "model_value" ],
                        filter: {
                            model_type: "se",
                            vocabulary: "data"
                        }
                    }
                });
            }).then(function(result) {
                var instance;
                if (0 === result.length) throw new Error("No SE data model found");
                instance = result[0];
                return sbvrUtils.executeModel(tx, {
                    apiRoot: instance.vocabulary,
                    modelText: instance.model_value
                });
            }).then(function() {
                return isServerOnAir(!0);
            }).catch(function(err) {
                return isServerOnAir(!1);
            });
        };
        app.get("/onAir", function(req, res, next) {
            return isServerOnAir().then(function(onAir) {
                return res.json(onAir);
            });
        });
        app.post("/update", permissions.checkPermissionsMiddleware("all"), serverIsOnAir, function(req, res, next) {
            return res.sendStatus(404);
        });
        app.post("/execute", permissions.checkPermissionsMiddleware("all"), function(req, res, next) {
            return uiApi.get({
                resource: "textarea",
                passthrough: {
                    req: permissions.rootRead
                },
                options: {
                    select: "text",
                    filter: {
                        name: "model_area"
                    }
                }
            }).then(function(result) {
                var modelText;
                if (0 === result.length) throw new Error("Could not find the model to execute");
                modelText = result[0].text;
                return db.transaction().then(function(tx) {
                    return sbvrUtils.executeModel(tx, {
                        apiRoot: "data",
                        modelText: modelText
                    }).then(function() {
                        return uiApi.patch({
                            resource: "textarea",
                            passthrough: {
                                tx: tx,
                                req: permissions.root
                            },
                            options: {
                                filter: {
                                    name: "model_area"
                                }
                            },
                            body: {
                                is_disabled: !0
                            }
                        });
                    }).then(function() {
                        return tx.end();
                    }).catch(function(err) {
                        tx.rollback();
                        throw err;
                    });
                });
            }).then(function() {
                isServerOnAir(!0);
                return res.sendStatus(200);
            }).catch(function(err) {
                isServerOnAir(!1);
                return res.status(404).json(err);
            });
        });
        app.post("/validate", permissions.checkPermissionsMiddleware("get"), function(req, res, next) {
            return sbvrUtils.runRule("data", req.body.rule).then(function(results) {
                return res.json(results);
            }).catch(function(err) {
                console.log("Error validating", err);
                return res.sendStatus(404);
            });
        });
        app.delete("/cleardb", permissions.checkPermissionsMiddleware("delete"), function(req, res, next) {
            return db.transaction(function(tx) {
                return tx.tableList().then(function(result) {
                    return Promise.all(result.rows.map(function(table) {
                        return tx.dropTable(table.name);
                    }));
                }).then(function() {
                    return sbvrUtils.executeStandardModels(tx);
                }).then(function() {
                    console.warn("DEL /cleardb is very destructive and should really be followed by a full restart/reload.");
                    return sbvrUtils.executeModels(tx, exports.config.models);
                }).then(function() {
                    return setupModels(tx);
                }).then(function() {
                    tx.end();
                    return res.sendStatus(200);
                }).catch(function(err) {
                    console.error("Error clearing db", err, err.stack);
                    tx.rollback();
                    return res.sendStatus(503);
                });
            });
        });
        app.put("/importdb", permissions.checkPermissionsMiddleware("set"), function(req, res, next) {
            var queries;
            queries = req.body.split(";");
            return db.transaction(function(tx) {
                return Promise.reduce(queries, function(result, query) {
                    query = query.trim();
                    if (query.length > 0) return tx.executeSql(query).catch(function(err) {
                        throw [ query, err ];
                    });
                }, null).then(function() {
                    tx.end();
                    return res.sendStatus(200);
                }).catch(function(err) {
                    console.error("Error importing db", err, err.stack);
                    tx.rollback();
                    return res.sendStatus(404);
                });
            });
        });
        app.get("/exportdb", permissions.checkPermissionsMiddleware("get"), function(req, res, next) {
            return db.transaction(function(tx) {
                return tx.tableList("name NOT LIKE '%_buk'").then(function(result) {
                    var exported;
                    exported = "";
                    return Promise.all(result.rows.map(function(table) {
                        var tableName;
                        tableName = table.name;
                        exported += 'DROP TABLE IF EXISTS "' + tableName + '";\n';
                        exported += table.sql + ";\n";
                        return tx.executeSql('SELECT * FROM "' + tableName + '";').then(function(result) {
                            var insQuery;
                            insQuery = "";
                            result.rows.forEach(function(currRow) {
                                var notFirst, propName, valQuery;
                                notFirst = !1;
                                insQuery += 'INSERT INTO "' + tableName + '" (';
                                valQuery = "";
                                for (propName in currRow) if (hasProp.call(currRow, propName)) {
                                    if (notFirst) {
                                        insQuery += ",";
                                        valQuery += ",";
                                    } else notFirst = !0;
                                    insQuery += '"' + propName + '"';
                                    valQuery += "'" + currRow[propName] + "'";
                                }
                                return insQuery += ") values (" + valQuery + ");\n";
                            });
                            return exported += insQuery;
                        });
                    })).then(function() {
                        tx.end();
                        return res.json(exported);
                    });
                }).catch(function(err) {
                    console.error("Error exporting db", err, err.stack);
                    tx.rollback();
                    return res.sendStatus(503);
                });
            });
        });
        app.post("/backupdb", permissions.checkPermissionsMiddleware("all"), serverIsOnAir, function(req, res, next) {
            return db.transaction(function(tx) {
                return tx.tableList("name NOT LIKE '%_buk'").then(function(result) {
                    return Promise.all(result.rows.map(function(currRow) {
                        var tableName;
                        tableName = currRow.name;
                        return tx.dropTable(tableName + "_buk", !0).then(function() {
                            return tx.executeSql('ALTER TABLE "' + tableName + '" RENAME TO "' + tableName + '_buk";');
                        });
                    }));
                }).then(function() {
                    tx.end();
                    return res.sendStatus(200);
                }).catch(function(err) {
                    tx.rollback();
                    console.error("Error backing up db", err, err.stack);
                    return res.sendStatus(404);
                });
            });
        });
        app.post("/restoredb", permissions.checkPermissionsMiddleware("all"), serverIsOnAir, function(req, res, next) {
            return db.transaction(function(tx) {
                return tx.tableList("name LIKE '%_buk'").then(function(result) {
                    return Promise.all(result.rows.map(function(currRow) {
                        var tableName;
                        tableName = currRow.name;
                        return tx.dropTable(tableName.slice(0, -4), !0).then(function() {
                            return tx.executeSql('ALTER TABLE "' + tableName + '" RENAME TO "' + tableName.slice(0, -4) + '";');
                        });
                    }));
                }).then(function() {
                    tx.end();
                    return res.sendStatus(200);
                }).catch(function(err) {
                    tx.rollback();
                    console.error("Error restoring db", err, err.stack);
                    return res.sendStatus(404);
                });
            });
        });
        app.all("/data/*", serverIsOnAir, sbvrUtils.handleODataRequest);
        app.get("/Auth/*", serverIsOnAir, sbvrUtils.handleODataRequest);
        app.merge("/ui/*", sbvrUtils.handleODataRequest);
        app.patch("/ui/*", sbvrUtils.handleODataRequest);
        app.delete("/", serverIsOnAir, function(req, res, next) {
            return Promise.all([ uiApi.patch({
                resource: "textarea",
                passthrough: {
                    req: permissions.root
                },
                options: {
                    filter: {
                        name: "model_area"
                    }
                },
                body: {
                    text: "",
                    name: "model_area",
                    is_disabled: !1
                }
            }), sbvrUtils.deleteModel("data") ]).then(function() {
                isServerOnAir(!1);
                return res.sendStatus(200);
            });
        });
        return db.transaction().then(function(tx) {
            return setupModels(tx).then(function() {
                return tx.end();
            }).catch(function(err) {
                tx.rollback();
                throw err;
            });
        });
    };
}, function(module, exports, __webpack_require__) {
    var Promise, _, transactionModel;
    _ = __webpack_require__(4);
    Promise = __webpack_require__(2);
    transactionModel = __webpack_require__(148);
    exports.config = {
        models: [ {
            apiRoot: "transaction",
            modelText: transactionModel,
            customServerCode: exports
        } ]
    };
    exports.setup = function(app, sbvrUtils) {
        return exports.addModelHooks = function(modelName) {
            var endTransaction;
            sbvrUtils.addHook("PUT", modelName, "all", function(arg) {
                var id, logger, request, tx, vocab;
                tx = arg.tx, request = arg.request;
                vocab = request.vocabulary;
                logger = sbvrUtils.api[vocab].logger;
                id = sbvrUtils.getID(vocab, request);
                return tx.executeSql('SELECT NOT EXISTS(\n\tSELECT 1\n\tFROM "resource" r\n\tJOIN "resource-is_under-lock" AS rl ON rl."resource" = r."id"\n\tWHERE r."resource type" = ?\n\tAND r."resource id" = ?\n) AS result;', [ request.resourceName, id ]).catch(function(err) {
                    logger.error("Unable to check resource locks", err, err.stack);
                    throw new Error("Unable to check resource locks");
                }).then(function(result) {
                    var ref;
                    if ((ref = result.rows.item(0).result) === !1 || 0 === ref || "0" === ref) throw new Error("The resource is locked and cannot be edited");
                });
            });
            endTransaction = function(transactionID) {
                return sbvrUtils.db.transaction().then(function(tx) {
                    var getFieldsObject, getLockedRow, placeholders;
                    placeholders = {};
                    getLockedRow = function(lockID) {
                        return tx.executeSql('SELECT "resource"."resource id" AS "resource_id"\nFROM "resource",\n\t"resource-is_under-lock"\nWHERE "resource"."id" = "resource-is_under-lock"."resource"\nAND "resource-is_under-lock"."lock" = ?;', [ lockID ]);
                    };
                    getFieldsObject = function(conditionalResourceID, clientModel) {
                        return tx.executeSql('SELECT "conditional_field"."field name" AS "field_name", "conditional_field"."field value" AS "field_value"\nFROM "conditional_field"\nWHERE "conditional_field"."conditional resource" = ?;', [ conditionalResourceID ]).then(function(fields) {
                            var fieldsObject;
                            fieldsObject = {};
                            return Promise.all(fields.rows.map(function(field) {
                                var fieldName, fieldValue, modelField;
                                fieldName = field.field_name.replace(clientModel.resourceName + ".", "");
                                fieldValue = field.field_value;
                                modelField = _.find(clientModel.fields, {
                                    fieldName: fieldName
                                });
                                if ("ForeignKey" === modelField.dataType && _.isNaN(Number(fieldValue))) {
                                    if (placeholders.hasOwnProperty(fieldValue)) return placeholders[fieldValue].promise.then(function(resolvedID) {
                                        return fieldsObject[fieldName] = resolvedID;
                                    }).catch(function() {
                                        throw new Error("Placeholder failed" + fieldValue);
                                    });
                                    throw new Error("Cannot resolve placeholder" + fieldValue);
                                }
                                return fieldsObject[fieldName] = fieldValue;
                            })).then(function() {
                                return fieldsObject;
                            });
                        });
                    };
                    return tx.executeSql('SELECT "conditional_resource"."id", "conditional_resource"."lock", "conditional_resource"."resource type" AS "resource_type", "conditional_resource"."conditional type" AS "conditional_type", "conditional_resource"."placeholder"\nFROM "conditional_resource"\nWHERE "conditional_resource"."transaction" = ?;', [ transactionID ]).then(function(conditionalResources) {
                        conditionalResources.rows.forEach(function(conditionalResource) {
                            var placeholder;
                            placeholder = conditionalResource.placeholder;
                            if (null != placeholder && placeholder.length > 0) {
                                placeholders[placeholder] = {};
                                return placeholders[placeholder].promise = new Promise(function(resolve, reject) {
                                    placeholders[placeholder].resolve = resolve;
                                    return placeholders[placeholder].reject = reject;
                                });
                            }
                        });
                        return Promise.all(conditionalResources.rows.map(function(conditionalResource) {
                            var clientModel, doCleanup, lockID, passthrough, placeholder, url;
                            placeholder = conditionalResource.placeholder;
                            lockID = conditionalResource.lock;
                            doCleanup = function() {
                                return Promise.all([ tx.executeSql('DELETE FROM "conditional_field" WHERE "conditional resource" = ?;', [ conditionalResource.id ]), tx.executeSql('DELETE FROM "conditional_resource" WHERE "lock" = ?;', [ lockID ]), tx.executeSql('DELETE FROM "resource-is_under-lock" WHERE "lock" = ?;', [ lockID ]), tx.executeSql('DELETE FROM "lock" WHERE "id" = ?;', [ lockID ]) ]);
                            };
                            passthrough = {
                                tx: tx
                            };
                            clientModel = clientModels[modelName].resources[conditionalResource.resource_type];
                            url = modelName + "/" + conditionalResource.resource_type;
                            switch (conditionalResource.conditional_type) {
                              case "DELETE":
                                return getLockedRow(lockID).then(function(lockedRow) {
                                    lockedRow = lockedRow.rows.item(0);
                                    url = url + "?$filter=" + clientModel.idField + " eq " + lockedRow.resource_id;
                                    return sbvrUtils.PinejsClient.prototype.delete({
                                        url: url,
                                        passthrough: passthrough
                                    });
                                }).then(doCleanup);

                              case "EDIT":
                                return getLockedRow(lockID).then(function(lockedRow) {
                                    lockedRow = lockedRow.rows.item(0);
                                    return getFieldsObject(conditionalResource.id, clientModel).then(function(body) {
                                        body[clientModel.idField] = lockedRow.resource_id;
                                        return sbvrUtils.PinejsClient.prototype.put({
                                            url: url,
                                            body: body,
                                            passthrough: passthrough
                                        });
                                    });
                                }).then(doCleanup);

                              case "ADD":
                                return getFieldsObject(conditionalResource.id, clientModel).then(function(body) {
                                    return sbvrUtils.PinejsClient.prototype.post({
                                        url: url,
                                        body: body,
                                        passthrough: passthrough
                                    });
                                }).then(function(result) {
                                    return placeholders[placeholder].resolve(result.id);
                                }).then(doCleanup).catch(function(err) {
                                    placeholders[placeholder].reject(err);
                                    throw err;
                                });
                            }
                        }));
                    }).then(function(err) {
                        return tx.executeSql('DELETE FROM "transaction" WHERE "id" = ?;', [ transactionID ]);
                    }).then(function(result) {
                        return sbvrUtils.validateModel(tx, modelName);
                    }).catch(function(err) {
                        tx.rollback();
                        throw err;
                    }).then(function() {
                        return tx.end();
                    });
                });
            };
            app.post("/transaction/execute", function(req, res, next) {
                var id;
                id = Number(req.body.id);
                return _.isNaN(id) ? res.sendStatus(404) : endTransaction(id).then(function() {
                    return res.sendStatus(200);
                }).catch(function(err) {
                    console.error("Error ending transaction", err, err.stack);
                    return res.status(404).json(err);
                });
            });
            app.get("/transaction", function(req, res, next) {
                return res.json({
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
            });
            return app.all("/transaction/*", sbvrUtils.handleODataRequest);
        };
    };
}, function(module, exports) {
    module.exports = 'Vocabulary: transaction\n\nTerm:       resource id\n\tConcept type: Text (Type)\nTerm:       resource type\n\tConcept type: Text (Type)\nTerm:       field name\n\tConcept type: Text (Type)\nTerm:       field value\n\tConcept type: Text (Type)\nTerm:       placeholder\n\tConcept type: Short Text (Type)\n\nTerm:       resource\n\tReference Scheme: resource id\nFact type: resource has resource id\n\tNecessity: Each resource has exactly 1 resource id.\nFact type: resource has resource type\n\tNecessity: Each resource has exactly 1 resource type.\n\nTerm:       transaction\n\nTerm:       lock\nFact type:  lock is exclusive\nFact type:  lock belongs to transaction\n\tNecessity: Each lock belongs to exactly 1 transaction.\nFact type:  resource is under lock\n\tSynonymous Form: lock is on resource\nRule:       It is obligatory that each resource that is under a lock that is exclusive, is under at most 1 lock.\n\nTerm:       conditional type\n\tConcept Type: Short Text (Type)\n\tDefinition: "ADD", "EDIT" or "DELETE"\n\nTerm:       conditional resource\nFact type:  conditional resource belongs to transaction\n\tNecessity: Each conditional resource belongs to exactly 1 transaction.\nFact type:  conditional resource has lock\n\tNecessity: Each conditional resource has at most 1 lock.\nFact type:  conditional resource has resource type\n\tNecessity: Each conditional resource has exactly 1 resource type.\nFact type:  conditional resource has conditional type\n\tNecessity: Each conditional resource has exactly 1 conditional type.\nFact type:  conditional resource has placeholder\n\tNecessity: Each conditional resource has at most 1 placeholder.\n--Rule:       It is obligatory that each conditional resource that has a placeholder, has a conditional type that is of "ADD".\n\nTerm:       conditional field\n\tReference Scheme: field name\nFact type:  conditional field has field name\n\tNecessity: Each conditional field has exactly 1 field name.\nFact type:  conditional field has field value\n\tNecessity: Each conditional field has at most 1 field value.\nFact type:  conditional field is of conditional resource\n\tNecessity: Each conditional field is of exactly 1 conditional resource.\n\n--Rule:       It is obligatory that each conditional resource that has a conditional type that is of "EDIT" or "DELETE", has a lock that is exclusive\nRule:       It is obligatory that each conditional resource that has a lock, has a resource type that is of a resource that the lock is on.\nRule:       It is obligatory that each conditional resource that has a lock, belongs to a transaction that the lock belongs to.\n';
}, function(module, exports, __webpack_require__) {
    var Promise, permissions;
    Promise = __webpack_require__(2);
    permissions = __webpack_require__(46);
    exports.config = {
        models: [ {
            customServerCode: exports
        } ]
    };
    exports.setup = function(app, sbvrUtils) {
        var LocalStrategy, checkPassword, login, logout, passport;
        exports.checkPassword = checkPassword = function(username, password, done) {
            return permissions.checkPassword(username, password).catch(function() {
                return !1;
            }).then(function(user) {
                return done(null, user);
            });
        };
        !function() {
            var _user;
            _user = !1;
            app.use(function(req, res, next) {
                _user !== !1 && (req.user = _user);
                return next();
            });
            login = function(fn) {
                return function(req, res, next) {
                    return checkPassword(req.body.username, req.body.password, function(err, user) {
                        user && (_user = user);
                        return fn(err, user, req, res, next);
                    });
                };
            };
            return logout = function(req, res, next) {
                req.user = null;
                _user = !1;
                return next();
            };
        }();
        exports.login = login;
        exports.logout = logout;
        return Promise.resolve();
    };
}, function(module, exports) {
    module.exports = require("express");
} ])));
//# sourceMappingURL=pine.js.map