function GetStickers() {	
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var inputText = JSON.parse(this.responseText);
			var array = inputText.id.split(',');
			var prices = inputText.price.split(',');
			var extension = "x.jpg";
			var elem = new Array();
			var imgSource = "";
			
			var stickers = document.getElementsByClassName("sticker");
			var price_containers = document.getElementsByClassName("Price");
			var hrefs = document.getElementsByClassName("Choose");
			
			for (var i = 0; i < stickers.length; i++) {
				if (i < array.length) {
					array[i] = array[i].concat(extension);
					elem[i] = document.createElement("img");
					imgSource = "images/";
					imgSource = imgSource.concat(array[i]);
					elem[i].src = imgSource;
					elem[i].height = 123;
					elem[i].width = 200;
					price_containers[i].innerHTML = prices[i];
					hrefs[i].setAttribute("onclick", "AddToCart(this.dataset.id, this.dataset.price);");
					hrefs[i].dataset.price = prices[i];
					hrefs[i].dataset.id = array[i]; 
					stickers[i].appendChild(elem[i]);
				} else {
					stickers[i].parentNode.style.display = "none";
				}
			}
		}
	};
	http.open("GET", "mysql.php", true);
	http.send();	
}

function AddToCart(id, price) {
	var temp = document.cookie.split(';');
	var doesInclude = false;
	for (var i = 0; i < temp.length; i++) {
		if (temp[i].includes(id)) {
			doesInclude = true;
			alert("This product is already in the shopping cart");
		}
	}
	if (!doesInclude) {
		document.cookie = id + "=" + price;
		alert("Product has been added to the shopping cart");
		location.reload();
	}
}

function RemoveFromCart(id) {
	document.cookie = id + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	alert("Product has been removed from the cart");
	location.reload();
}

function ShowCart() {
	alert(document.cookie);
}

function ClearCart() {
	var temp = document.cookie.split(';');
	var id = "";
	for (var i = 0; i < temp.length; i++) {
		if (temp[i].includes("jpg")) {
			id = temp[i].substring(0, temp[i].indexOf('='));
			document.cookie = id + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';	
		}
	}
	alert("The shopping cart has been cleared");
	window.location.reload();
}

function CountCart() {
	var temp = document.cookie.split(';');
	var count = 0;

	for (var i = 0; i < temp.length; i++) {
		if (temp[i].includes("jpg")) {
			count++;
		}
	}
	var elem = document.getElementById("Count");
	elem.innerHTML = count;
}