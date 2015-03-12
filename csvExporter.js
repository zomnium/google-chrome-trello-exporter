
/**
 * CSV Exporter
 */

var csvExporter = function ()
{
    'use strict';

    // Set data type and charset
    var metadata = "data:text/csv;charset=utf-8,\n";

    /**
     * Exporter
     */

    function createFile(data)
    {
        // Process data, encode as URI and push result into a new window
        // This functions as a download
        return window.open( encodeURI( metadata + arrayToCSV(data) ) );
    }

    /**
     * Process data
     */

    function arrayToCSV(data)
    {
        // Loop through checklists
        data.forEach(function (checklist, index) {
            csv += checklist.name + ",\n";

            // Loop through checklist items
            checklist.checkItems.forEach(function (item) {
                csv += item.name + ",";
                csv += item.state + "\n";
            });

            // Add a line of whitespace
            csv += "\n";
        });

        // Return data in CSV format
        return csv;
    }

    /**
     * Return public objects
     */

    return {
        download: createFile
    }
}
