class window.Logbook
  options:
    name: "logbook"
    initMessage: ""
    maxSize: 5000
    passThrough: true

  constructor: (options = {}) ->
    return unless @supports_html5_storage()

    for key, value of options
      @options[key] = value
  
    @window_onerror_orig = window.onerror

    if window.console && @options.passThrough
      @console_orig = window.console
      @console_log_orig = window.console.log
      @console_error_orig = window.console.error

    window.console ||= {}
    window.console.log = @console_log
    window.console.error = @console_error
    window.onerror = @window_onerror

    @log "\ninitialized", @options.initMessage
    
  logbook: =>
    localStorage[@options.name]

  save_logbook: (value) =>
    localStorage[@options.name] = @truncate_to_size(value)

  log: (action, params...) =>
    @write action + " @ " + new Date() + ": " + params.join(", ") + "\n"

  write: (line) =>
    @save_logbook(@logbook() + line)

  console_log: (params...) =>
    @log "console.log", params...
    @console_log_orig.apply(@console_orig, params) if @console_log_orig

  console_error: (params...) =>
    @log "console.error", params...
    @console_error_orig.apply(@console_orig, params) if @console_error_orig

  window_onerror: (message, url, line) =>
    @log "exception", "#{url} (#{line}): #{message}"
    @window_onerror_orig?(message, url, line)

  truncate_to_size: (value) =>
    lines = value.split "/n"

    while value.length > @options.maxSize
      lines.shift()
      value = lines.join "/n"

    value

  supports_html5_storage: ->
    try
      window.localStorage != null
    catch e
      false
