// Generated by CoffeeScript 1.6.3
(function() {
  var PipeBase, PipeClient, PipeServer,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.PipeBaseClass = PipeBase = (function() {
    function PipeBase(name) {
      this.name = name;
      this.rpcMap = {};
    }

    PipeBase.prototype.registerRPC = function(name, fn) {
      return this.rpcMap[name] = fn;
    };

    PipeBase.prototype.fireRPC = function(name, args) {
      var rpc;
      rpc = {
        name: name,
        args: args
      };
      return this.post(rpc);
    };

    PipeBase.prototype.onRPC = function(msg) {
      var _base, _name;
      if (msg.name != null) {
        return typeof (_base = this.rpcMap)[_name = msg.name] === "function" ? _base[_name](msg.args) : void 0;
      }
    };

    PipeBase.prototype.dispatch = function(msg) {
      var error;
      console.log("Msg on pipe " + this.name + ":");
      console.log(msg);
      try {
        return this.onRPC(msg);
      } catch (_error) {
        error = _error;
        return console.error(error);
      }
    };

    PipeBase.prototype.post = function(msg) {
      var _ref;
      return (_ref = this.port) != null ? _ref.postMessage(msg) : void 0;
    };

    return PipeBase;

  })();

  window.PipeClientClass = PipeClient = (function(_super) {
    __extends(PipeClient, _super);

    function PipeClient(name) {
      var _this = this;
      PipeClient.__super__.constructor.call(this, name);
      console.log("Init Pipe Client " + this.name);
      this.port = chrome.runtime.connect({
        name: this.name
      });
      this.port.onMessage.addListener(function(msg) {
        return _this.dispatch(msg);
      });
    }

    return PipeClient;

  })(PipeBase);

  window.PipeServerClass = PipeServer = (function(_super) {
    __extends(PipeServer, _super);

    function PipeServer(name) {
      var _this = this;
      PipeServer.__super__.constructor.call(this, name);
      chrome.runtime.onConnect.addListener(function(port) {
        console.log("Init Pipe Server " + _this.name);
        if (port.name === _this.name) {
          console.log("Conected pipe: " + _this.name);
          console.log(port.sender);
          _this.port = port;
          return _this.port.onMessage.addListener(function(msg) {
            return _this.dispatch(msg);
          });
        }
      });
    }

    return PipeServer;

  })(PipeBase);

}).call(this);

/*
//@ sourceMappingURL=Pipe.map
*/
