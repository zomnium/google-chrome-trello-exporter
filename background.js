
function generateCSV(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
  getJSON({ 'url': info.linkUrl }, function(data) { processData(data); });
}

function getJSON(options, callback) {
	var xhttp = new XMLHttpRequest();
	options.url = options.url || null;
	options.data = options.data || null;
	options.type = options.type || 'json';
	callback = callback || function () {};
	console.log("getJSON options: " + JSON.stringify(options));

	xhttp.open('GET', options.url, true);
	xhttp.send(null);
	xhttp.onreadystatechange = function() {
		if (xhttp.status == 200 && xhttp.readyState == 4) {
			callback(xhttp.responseText);
		}
	}
}

function processData(data) {
	data = JSON.parse(data);
	data = data.checklists;

	var csv = "data:text/csv;charset=utf-8,\n";
	csv += "name,status\n\n";

	data.forEach(function(checklist, index) {
		csv += checklist.name + ",\n";

		checklist.checkItems.forEach(function(item) {
			csv += item.name + ",";
			csv += item.state + "\n";
		});

		csv += "\n";
	});

	var file = encodeURI(csv);
	window.open(file);
}

var context = "link";
var title = "Generate CSV checklist";
var id = chrome.contextMenus.create({"title": title, "contexts":[context], "onclick": generateCSV});
console.log("'" + context + "' item:" + id);