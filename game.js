var BOpened = "";
var IOpened = "";
var Counter = 0;
var ImgFound = 0;

var Source = "#boxcard";

var ImgSource = [

  "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQUtStFa_o2jjrXsBF6zBszCamglwnKgKwm4awztrgiKQ96mr9E",
  "https://secure.gravatar.com/avatar/3e3e469369e5fa4838363dfa732e48c2?d=https%3A%2F%2Fi.vimeocdn.com%2Fportrait%2Fdefault-yellow_60x60.png&s=60",
  "http://a5.mzstatic.com/us/r30/Purple/v4/ed/d5/6d/edd56d7c-c705-9383-a2b5-ea12218c566d/AppIcon60x60_2x.png",
  "http://a1.mzstatic.com/us/r30/Purple/v4/d7/a2/89/d7a289e3-33cc-1148-2148-232c71f7cfb9/AppIcon60x60_2x.png",
  "https://www.integer-research.com/wp-content/uploads/2014/07/red-cross-small-60x60.jpg",
   "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQUtStFa_o2jjrXsBF6zBszCamglwnKgKwm4awztrgiKQ96mr9E",
  "https://secure.gravatar.com/avatar/3e3e469369e5fa4838363dfa732e48c2?d=https%3A%2F%2Fi.vimeocdn.com%2Fportrait%2Fdefault-yellow_60x60.png&s=60",
  "http://a5.mzstatic.com/us/r30/Purple/v4/ed/d5/6d/edd56d7c-c705-9383-a2b5-ea12218c566d/AppIcon60x60_2x.png",
  "http://a1.mzstatic.com/us/r30/Purple/v4/d7/a2/89/d7a289e3-33cc-1148-2148-232c71f7cfb9/AppIcon60x60_2x.png",
  "https://www.integer-research.com/wp-content/uploads/2014/07/red-cross-small-60x60.jpg"

  
];

function RandomFunction(MaxValue, MinValue) {
		return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
	}
	
function ShuffleImages() {
	var ImgAll = $(Source).children();
	var ImgThis = $(Source + " div:first-child");
	var ImgArr = new Array();

	for (var i = 0; i < ImgAll.length; i++) {
		ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
		ImgThis = ImgThis.next();
	}
	
		ImgThis = $(Source + " div:first-child");
	
	for (var z = 0; z < ImgAll.length; z++) {
	var RandomNumber = RandomFunction(0, ImgArr.length - 1);

		$("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
		ImgArr.splice(RandomNumber, 1);
		ImgThis = ImgThis.next();
	}
}

function ResetGame() {
	ShuffleImages();
	$(Source + " div img").hide();
	$(Source + " div").css("visibility", "visible");
	Counter = 0;
	$("#success").remove();
	$("#counter").html("" + Counter);
	BOpened = "";
	IOpened = "";
	IFound = 0;
	return false;
}

function OpenCard() {
	var id = $(this).attr("id");

	if ($("#" + id + " img").is(":hidden")) {
		$(Source + " div").unbind("click", OpenCard);
	
		$("#" + id + " img").slideDown('fast');

		if (IOpened == "") {
			BOpened = id;
			IOpened = $("#" + id + " img").attr("src");
			setTimeout(function() {
				$(Source + " div").bind("click", OpenCard)
			}, 300);
		} else {
			CurrentOpened = $("#" + id + " img").attr("src");
			if (IOpened != CurrentOpened) {
				setTimeout(function() {
					$("#" + id + " img").slideUp('fast');
					$("#" + BOpened + " img").slideUp('fast');
					BOpened = "";
					IOpened = "";
				}, 400);
			} else {
				$("#" + id + " img").parent().css("visibility", "hidden");
				$("#" + BOpened + " img").parent().css("visibility", "hidden");
				IFound++;
				BOpened = "";
				IOpened = "";
			}
			setTimeout(function() {
				$(Source + " div").bind("click", OpenCard)
			}, 400);
		}
		Counter++;
		$("#counter").html("" + Counter);

		if (IFound == ImgSource.length) {
			$("#counter").prepend('<span id="success">You Found All Pictues With </span>');
		}
	}
}

$(function() {

for (var y = 1; y < 2 ; y++) {
	$.each(ImgSource, function(i, val) {
		$(Source).append("<div id=card" + y + i + "><img src=" + val + " />");
	});
}
	$(Source + " div").click(OpenCard);
	ShuffleImages();
});