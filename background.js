
/*
 * Exporter for Trello
 *
 * Author: Tim van Bergenhenegouwen, Zomnium
 * Website: zomnium.com
 */


// Generator, called by context menu
function generateCSV(info, tab) {

	// Debug: print input
	console.log("item " + info.menuItemId + " was clicked");
	console.log("info: " + JSON.stringify(info));
	console.log("tab: " + JSON.stringify(tab));

	// Get JSON and process returned data
	getJSON({ 'url': info.linkUrl }, processChecklists);
}


// Get JSON file
function getJSON(options, callback) {

	// Create HTTP request
	var xhttp = new XMLHttpRequest();

	// Set values
	options.url = options.url || null;
	options.data = options.data || null;
	options.type = options.type || 'json';
	callback = callback || function () {};

	// Debug: print options
	console.log("getJSON options: " + JSON.stringify(options));

	// Make request
	xhttp.open('GET', options.url, true);
	xhttp.send(null);
	xhttp.onreadystatechange = function() {
		if (xhttp.status == 200 && xhttp.readyState == 4) {

			// Successful request, trigger callback
			callback(xhttp.responseText);
		}
	}
}


// Process checklist data from JSON to CSV
function processChecklists(data) {

	// Parse string to JSON and get checklists
	data = JSON.parse(data);
	data = data.checklists;

	// Set data type, charset and give fill in field titles
	var csv = "data:text/csv;charset=utf-8,\n";
	csv += "name,status\n\n";

	// Loop through checklists
	data.forEach(function(checklist, index) {
		csv += checklist.name + ",\n";

		// Loop through checklist items
		checklist.checkItems.forEach(function(item) {
			csv += item.name + ",";
			csv += item.state + "\n";
		});

		// Add a line of whitespace
		csv += "\n";
	});

	// Encode and push result into a new window (functions as download)
	var file = encodeURI(csv);
	window.open(file);
}


// Create content menu item in Chrome.
var context = "link";
var title = "Generate CSV checklist";
var id = chrome.contextMenus.create({"title": title, "contexts":[context], "onclick": generateCSV});
console.log("'" + context + "' item:" + id);
