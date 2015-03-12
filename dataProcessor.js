
/**
 * Data Processor
 */

var dataProcessor = function ()
{
    'use strict';

    /** 
     * Get Data
     * Retreice data from API and process it
     */

    function getData(settings, callback)
    {
        // Get JSON and process returned data
        getJSON({ 'url': info.linkUrl }, function (data)
        {
            // Parse JSON data
            data = JSON.parse(data);

        });
    }

    /**
     * Get JSON
     * Gets the JSON file
     */

    function getJSON(options, callback)
    {
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
        xhttp.onreadystatechange = function()
        {
            // Successful request
            if (xhttp.status == 200 && xhttp.readyState == 4)
            {
                // Trigger callback
                callback(xhttp.responseText);
            }
        }
    }

    /**
     * Filter
     * Returns partials from arrays
     */

    function filter(data, key, value)
    {
        return data.filter(function (item)
        {
            return item[key] === value;
        });
    }

    /** 
     * Lists
     * Process lists data fromt JSON to an array
     */

    function lists(data, settings, filter)
    {
        return new Promise(function (resolve, reject)
        {
            // Process
            resolve(data);
            reject(data);
        });
    }

    /** 
     * Cards
     * Process cards data fromt JSON to an array
     */

    function cards(data, settings, filter)
    {
        return new Promise(function (resolve, reject)
        {
            // Process
            resolve(data);
            reject(data);
        });
    }

    /**
     * Checklists
     * Process checklist data from JSON to an array
     */

    function checklists(data, settings, filter)
    {
        // Get checklists
        data = data.checklists;

        // Create array's
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
    }

    function checklistsOld(data)
    {
        // Parse string to JSON and get checklists
        data = JSON.parse(data);
        data = data.checklists;

        // Set data type, charset and give fill in field titles
        var csv = "data:text/csv;charset=utf-8,\n";
        csv += "name,status\n\n";

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

        // Encode and push result into a new window (functions as download)
        var file = encodeURI(csv);
        window.open(file);
    }

    /**
     * Return public objects
     */

    return {
        get: getData
    }
}
