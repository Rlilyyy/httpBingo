;(function() {
	function HttpBingo() {
		this.successCallbackFun = "";
		this.errorCallbackFun = "";
		this.URL = "";
		this.type = "GET";
		this.async = true;
		this.data = "";
	}

	HttpBingo.prototype = {
		constructor: HttpBingo,
		
		init: function() {
			return new HttpBingo();
		},

		// 设置GET或POST对url进行连接
		setTarget: function(type, url) {

			if(!url) {

				throw new Error("Your url is null");

				return null;

			} else {

				this.URL = url;

			}

			if(!type) {

				this.type = "GET";

			} else {

				this.type = type;

			}

			return this;

		},

		// 设置异步
		setAsync: function(isAsync) {

			isAsync == true?

				this.async = true :

				this.async = false;

			return this;

		},

		// 设置传输的数据
		setData: function(data) {

			this.data = data;

			return this;

		},

		// 设置成功回调函数
		success: function(callbackFun) {

			if(!callbackFun) {

				this.successCallbackFun = "";

			} else {

				this.successCallbackFun = callbackFun;

			}

			return this;

		},

		// 设置出错回调函数
		error: function(callbackFun) {

			if(!callbackFun) {

				this.errorCallbackFun = "";

			} else {

				this.errorCallbackFun = callbackFun;

			}

			return this;

		},

		// 连接状态码改变时的处理
		onStateChange: function() {

			if(this.readyState == 4) {

				var result = this.responseText;

				this.that.successCallbackFun(result);

			}

		},

		// 开始连接
		start: function() {

			var xmlHttp = null;

			if (window.XMLHttpRequest) {
				// code for IE7, Firefox, Opera, etc.
				xmlHttp=new XMLHttpRequest();
			} else if (window.ActiveXObject) {
				// code for IE6, IE5
				xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
			}

			if (xmlHttp != null) {

				xmlHttp.open(this.type, this.URL, this.async);
				xmlHttp.send(this.data);
				xmlHttp.that = this;
				xmlHttp.onreadystatechange = this.onStateChange;

			} else {
				throw new Error("Your browser does not support XMLHTTP.");
			}
		}
	}

	window.$ = new HttpBingo();

})();