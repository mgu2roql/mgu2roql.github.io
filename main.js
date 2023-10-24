function getQueryString(name) {
	const url_string = window.location.href;
	const url = new URL(url_string);
	return url.searchParams.get(name);
}

function showMarkdown() {
	// 创建XMLHttpRequest对象
	var xmlhttp;
	if (window.XMLHttpRequest){
		// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlhttp = new XMLHttpRequest();
	}
	else{
		// IE6, IE5 浏览器执行代码
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	// 得到服务器响应后，对得到的Markdown文档进行解析
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			// 这里调用了marked框架中的marked函数实现Markdown2HTML的解析
			document.getElementById("content").innerHTML = marked.parse(xmlhttp.responseText);
			MathJax.typeset();
		}
		else if (xmlhttp.status == 404){
			document.getElementById("content").innerHTML = marked.parse("# 404 Not Found\n**The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.**");
		}
	}
	str = getQueryString("id");
	if (str == null){
		str = "index.md";
	}
	else{
		if (!str.endsWith(".md")){
			str = str + ".md"
		}
	}
	console.log(str);
	// 向服务器发送请求，获取你需要的Markdown文档
	xmlhttp.open("GET", "https://0mwk9w8e.s3.us-east-005.backblazeb2.com/"+str, true);
	xmlhttp.send();
}
