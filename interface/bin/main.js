// Generated by Haxe 4.0.5
(function ($global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
Lambda.__name__ = true;
Lambda.array = function(it) {
	var a = [];
	var i = $getIterator(it);
	while(i.hasNext()) {
		var i1 = i.next();
		a.push(i1);
	}
	return a;
};
var Game = function() {
};
Game.__name__ = true;
Game.prototype = {
	start: function(client,username) {
		$("#lobby").hide();
		client.emit("ask",{ });
		var q;
		client.on("question",function(data) {
			$("#question")[0].innerHTML = decodeURIComponent(data.results[0].question);
			$("#game-board").show();
			q = decodeURIComponent(data.results[0].correct_answer);
		});
		client.on("results",function(data1) {
			$("#winner-append")[0].innerHTML = "";
			var _g = 0;
			var _g1 = Reflect.fields(data1.points).length;
			while(_g < _g1) {
				var x = _g++;
				$("#winner-append").append("<h3>" + data1.points[x].username + " - " + data1.points[x].point + "</h3><br>");
			}
			$("#winner").show();
		});
		client.on("game-over",function(data2) {
			var sortedArray = data2.sort(function(a,b) {
				return parseFloat(b["points"]) - parseFloat(a["points"]);
			});
			console.log("src/Main.hx:28:",sortedArray);
			$("#winner").hide();
			var tmp = "<b>" + sortedArray[0].username + " wins with " + sortedArray[0].points;
			$("#final-winner")[0].innerHTML = tmp + "<b>";
			$("#game-over").show();
		});
		client.on("answer-data",function(data3) {
			$("#game-board").hide();
			$("#answers-append")[0].innerHTML = "";
			$("#answers-append").append("<button type=\"button\" class=\"btn btn-block btn-radius btn-info\" id=\"answer-c\">" + q + "</button>");
			var _g2 = 0;
			var _g11 = Reflect.fields(data3.answers).length;
			while(_g2 < _g11) {
				var x1 = _g2++;
				console.log("src/Main.hx:38:",data3.answers[x1]);
				$("#answers-append").append("<button type=\"button\" class=\"btn btn-block btn-radius btn-info\" id=\"answer-w\">" + data3.answers[x1].answer + "</button>");
			}
			$("#answer-c").on("click",null,function(event) {
				console.log("src/Main.hx:42:","click");
				$("#answer-board").hide();
				client.emit("point",{ point : 1, username : username});
			});
			$("#answer-w").on("click",null,function(event1) {
				$("#answer-board").hide();
				client.emit("point",{ point : 0, username : username});
			});
			$("#answers-append").randomize();
			$("#answer-board").show();
		});
		$("#answer-button").on("click",null,function(event2) {
			var answer = $("#answer").val();
			$("#game-board").hide();
			client.emit("answer",{ user : username, answer : answer});
		});
	}
};
var Join = function() {
};
Join.__name__ = true;
Join.prototype = {
	join: function(username,client,code) {
		console.log("src/Main.hx:78:","username: " + username);
		client.emit("join",{ user : username, code : code});
		client.on("joined",function(data) {
			console.log("src/Main.hx:81:",data);
			$("#choose").hide();
			$("#lobby").show();
			$("#players")[0].innerHTML = "";
			var _g = 0;
			var _g1 = Reflect.fields(data.players).length;
			while(_g < _g1) {
				var x = _g++;
				$("#players").append("<h3>" + data.players[x].username + "</h3>");
			}
			$("#start-game").on("click",null,function(event) {
				var newGame = new Game();
				newGame.start(client,username);
			});
		});
	}
};
var Main = function() { };
Main.__name__ = true;
Main.main = function() {
	$(function() {
		var joinGame = new Join();
		var username;
		$("#join").on("click",null,function(event) {
			username = $("#username").val();
			var tmp = "Welcome " + username;
			$("#welcome-user")[0].innerHTML = tmp + "!";
			$("#choose").show();
			$("#login").hide();
		});
		$("#join-game").on("click",null,function(event1) {
			var cl = (typeof io == 'undefined' ? require('socket.io-client') : io)("/");
			var code = $("#code").val();
			joinGame.join(username,cl,code);
		});
	});
};
var Move = $hxEnums["Move"] = { __ename__ : true, __constructs__ : ["Rock","Paper","Scissors"]
	,Rock: {_hx_index:0,__enum__:"Move",toString:$estr}
	,Paper: {_hx_index:1,__enum__:"Move",toString:$estr}
	,Scissors: {_hx_index:2,__enum__:"Move",toString:$estr}
};
Move.__empty_constructs__ = [Move.Rock,Move.Paper,Move.Scissors];
var Result = $hxEnums["Result"] = { __ename__ : true, __constructs__ : ["Winner","Draw"]
	,Winner: ($_=function(player) { return {_hx_index:0,player:player,__enum__:"Result",toString:$estr}; },$_.__params__ = ["player"],$_)
	,Draw: {_hx_index:1,__enum__:"Result",toString:$estr}
};
Result.__empty_constructs__ = [Result.Draw];
Math.__name__ = true;
var Random = function() { };
Random.__name__ = true;
Random.bool = function() {
	return Math.random() < 0.5;
};
Random.int = function(from,to) {
	return from + Math.floor((to - from + 1) * Math.random());
};
Random.float = function(from,to) {
	return from + (to - from) * Math.random();
};
Random.string = function(length,charactersToUse) {
	if(charactersToUse == null) {
		charactersToUse = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	}
	var str = "";
	var _g = 0;
	var _g1 = length;
	while(_g < _g1) {
		var i = _g++;
		str += charactersToUse.charAt(Math.floor((charactersToUse.length - 1 + 1) * Math.random()));
	}
	return str;
};
Random.date = function(earliest,latest) {
	var from = earliest.getTime();
	return new Date(from + (latest.getTime() - from) * Math.random());
};
Random.fromArray = function(arr) {
	if(arr != null && arr.length > 0) {
		return arr[Math.floor((arr.length - 1 + 1) * Math.random())];
	} else {
		return null;
	}
};
Random.shuffle = function(arr) {
	if(arr != null) {
		var _g = 0;
		var _g1 = arr.length;
		while(_g < _g1) {
			var i = _g++;
			var j = Math.floor((arr.length - 1 + 1) * Math.random());
			var a = arr[i];
			var b = arr[j];
			arr[i] = b;
			arr[j] = a;
		}
	}
	return arr;
};
Random.fromIterable = function(it) {
	if(it != null) {
		var arr = Lambda.array(it);
		if(arr != null && arr.length > 0) {
			return arr[Math.floor((arr.length - 1 + 1) * Math.random())];
		} else {
			return null;
		}
	} else {
		return null;
	}
};
Random.enumConstructor = function(e) {
	if(e != null) {
		var arr = e.__empty_constructs__.slice();
		if(arr != null && arr.length > 0) {
			return arr[Math.floor((arr.length - 1 + 1) * Math.random())];
		} else {
			return null;
		}
	} else {
		return null;
	}
};
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
			a.push(f);
		}
		}
	}
	return a;
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	if(Error.captureStackTrace) {
		Error.captureStackTrace(this,js__$Boot_HaxeError);
	}
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var n = e.__constructs__[o._hx_index];
			var con = e[n];
			if(con.__params__) {
				s = s + "\t";
				return n + "(" + ((function($this) {
					var $r;
					var _g = [];
					{
						var _g1 = 0;
						var _g2 = con.__params__;
						while(true) {
							if(!(_g1 < _g2.length)) {
								break;
							}
							var p = _g2[_g1];
							_g1 = _g1 + 1;
							_g.push(js_Boot.__string_rec(o[p],s));
						}
					}
					$r = _g;
					return $r;
				}(this))).join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g3 = 0;
			var _g11 = o.length;
			while(_g3 < _g11) {
				var i = _g3++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e1 ) {
			var e2 = ((e1) instanceof js__$Boot_HaxeError) ? e1.val : e1;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str1 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str1.length != 2) {
			str1 += ", \n";
		}
		str1 += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str1 += "\n" + s + "}";
		return str1;
	case "string":
		return o;
	default:
		return String(o);
	}
};
var js_jquery_JqEltsIterator = function(j) {
	this.i = 0;
	this.j = j;
};
js_jquery_JqEltsIterator.__name__ = true;
js_jquery_JqEltsIterator.prototype = {
	hasNext: function() {
		return this.i < this.j.length;
	}
	,next: function() {
		return $(this.j[this.i++]);
	}
};
var js_jquery_JqIterator = function(j) {
	this.i = 0;
	this.j = j;
};
js_jquery_JqIterator.__name__ = true;
js_jquery_JqIterator.prototype = {
	hasNext: function() {
		return this.i < this.j.length;
	}
	,next: function() {
		return this.j[this.i++];
	}
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
function $getIterator(o) { if( o instanceof Array ) return HxOverrides.iter(o); else return o.iterator(); }
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
String.__name__ = true;
Array.__name__ = true;
Date.__name__ = "Date";
Object.defineProperty(js__$Boot_HaxeError.prototype,"message",{ get : function() {
	return String(this.val);
}});
js_Boot.__toStr = ({ }).toString;
var typeofJQuery = typeof($);
if(typeofJQuery != "undefined" && $.fn != null) {
	$.fn.elements = function() {
		return new js_jquery_JqEltsIterator(this);
	};
}
var typeofJQuery = typeof($);
if(typeofJQuery != "undefined" && $.fn != null) {
	$.fn.iterator = function() {
		return new js_jquery_JqIterator(this);
	};
}
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
