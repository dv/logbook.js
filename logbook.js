var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __slice = [].slice;

window.Logbook = (function() {
  Logbook.prototype.options = {
    name: "logbook",
    initMessage: "",
    maxSize: 5000,
    passThrough: true
  };

  function Logbook(options) {
    var key, value;
    if (options == null) {
      options = {};
    }
    this.truncate_to_size = __bind(this.truncate_to_size, this);
    this.window_onerror = __bind(this.window_onerror, this);
    this.console_error = __bind(this.console_error, this);
    this.console_log = __bind(this.console_log, this);
    this.write = __bind(this.write, this);
    this.log = __bind(this.log, this);
    this.save_logbook = __bind(this.save_logbook, this);
    this.logbook = __bind(this.logbook, this);
    if (!this.supports_html5_storage()) {
      return;
    }
    for (key in options) {
      value = options[key];
      this.options[key] = value;
    }
    this.window_onerror_orig = window.onerror;
    if (window.console && this.options.passThrough) {
      this.console_orig = window.console;
      this.console_log_orig = window.console.log;
      this.console_error_orig = window.console.error;
    }
    window.console || (window.console = {});
    window.console.log = this.console_log;
    window.console.error = this.console_error;
    window.onerror = this.window_onerror;
    this.log("\ninitialized", this.options.initMessage);
  }

  Logbook.prototype.logbook = function() {
    return localStorage[this.options.name];
  };

  Logbook.prototype.save_logbook = function(value) {
    return localStorage[this.options.name] = this.truncate_to_size(value);
  };

  Logbook.prototype.log = function() {
    var action, params;
    action = arguments[0], params = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return this.write(action + " @ " + new Date() + ": " + params.join(", ") + "\n");
  };

  Logbook.prototype.write = function(line) {
    return this.save_logbook(this.logbook() + line);
  };

  Logbook.prototype.console_log = function() {
    var params;
    params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    this.log.apply(this, ["console.log"].concat(__slice.call(params)));
    if (this.console_log_orig) {
      return this.console_log_orig.apply(this.console_orig, params);
    }
  };

  Logbook.prototype.console_error = function() {
    var params;
    params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    this.log.apply(this, ["console.error"].concat(__slice.call(params)));
    if (this.console_error_orig) {
      return this.console_error_orig.apply(this.console_orig, params);
    }
  };

  Logbook.prototype.window_onerror = function(message, url, line) {
    this.log("exception", "" + url + " (" + line + "): " + message);
    return typeof this.window_onerror_orig === "function" ? this.window_onerror_orig(message, url, line) : void 0;
  };

  Logbook.prototype.truncate_to_size = function(value) {
    var lines;
    lines = value.split("/n");
    while (value.length > this.options.maxSize) {
      lines.shift();
      value = lines.join("/n");
    }
    return value;
  };

  Logbook.prototype.supports_html5_storage = function() {
    var e;
    try {
      return window.localStorage !== null;
    } catch (_error) {
      e = _error;
      return false;
    }
  };

  return Logbook;

})();
