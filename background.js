
/*
 * Exporter for Trello
 * Download your Trello data in Excel or CSV format.
 *
 * Author: Tim van Bergenhenegouwen, Zomnium.
 * Website: zomnium.com
 */

(function (window, document) {

    // Register Data Processor
    var data = new dataProcessor();

    /**
     * Get Settings
     * Returns Chrome Extension settings, or defaults when not set
     */

    function getSettings(callback)
    {
        // Get settings from Chrome storage
        chrome.storage.sync.get({
            checklist_status: 'status',
            checklist_status_checked: 'done',
            checklist_status_unchecked: 'in progress'
        }, callback);
    }

    /**
     * Generate File
     */

    function generateOutput(callback)
    {
        // Get the extension settings
        getSettings(function (settings)
        {
            // Retreive and process Trello data
            data.get(settings, function (data)
            {
                // Execute callback
                callback(data);
            });
        });
    }

    /**
     * Generate CSV
     * Exports data to a CSV file, called by context menu
     */

    function generateCSV(info, tab)
    {
        // Debug: print input
        // console.log("item " + info.menuItemId + " was clicked");
        // console.log("info: " + JSON.stringify(info));
        // console.log("tab: " + JSON.stringify(tab));

        // Generate file data
        generateOutput(function (data)
        {
            // Register file creator
            var csv = new csvExporter();

            // Create download
            csv.download(data);
        });
    }

    /**
     * Generate Excel
     * Exports data to an Excel file, called by context menu
     */

    function generateExcel(info, tab)
    {
        // Debug: print input
        // console.log("item " + info.menuItemId + " was clicked");
        // console.log("info: " + JSON.stringify(info));
        // console.log("tab: " + JSON.stringify(tab));

        // Generate file data
        generateOutput(function (data)
        {
            // Register file creator
            var excel = new excelExporter();

            // Create download
            excel.download(data);
        });

        getJSON({ 'url': info.linkUrl }, function (data)
        {
            // Parse string to JSON and get checklists
            data = JSON.parse(data);
            data = data.checklists;

            var output = new Array();
            output.push(['name', 'status'], [null]);

            // Loop through checklists
            data.forEach(function (checklist, index) {
                output.push([checklist.name, null]);

                // Loop through checklist items
                checklist.checkItems.forEach(function (item) {
                    output.push([item.name, item.state]);
                });

                // Add a line of whitespace
                output.push([null]);
            });

            /* original data */
            // var data = [[1,2,3],[true, false, null, "sheetjs"],["foo","bar",new Date("2014-02-19T14:30Z"), "0.3"], ["baz", null, "qux"]],
            console.log(output);
            var data = output,
                ws_name = "SheetJS",
                wb = new Workbook(),
                ws = sheet_from_array_of_arrays(data);
             
            /* add worksheet to workbook */
            wb.SheetNames.push(ws_name);
            wb.Sheets[ws_name] = ws;
            var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});

            // Create file
            saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), "test.xlsx");
        });
    }

    /**
     * Bootstrap
     * Create content menu item in Chrome
     */

    var context = "link",
        csvLink = chrome.contextMenus.create({"title": 'Generate CSV file', "contexts":[context], "onclick": generateCSV}),
        excelLink = chrome.contextMenus.create({"title": 'Generate Excel file', "contexts":[context], "onclick": generateExcel});

}(this, document));
