
(function (window, document) {

    'use strict';

    // Save button
    var saveButton = document.querySelector('.js-save');

    /**
     * Save Options
     */

    function saveOptions(event)
    {
        // Prevent default
        event.preventDefault();

        // Get form data
        var data = getFormData();

        // Save data in Chrome storage and notification
        chrome.storage.sync.set( data, saveButtonSaved );
    }

    /**
     * Restore Options
     */

    function restoreOptions()
    {
        console.log('restoreOptions');
        chrome.storage.sync.get({
            checklist_status: 'status',
            checklist_status_checked: 'done',
            checklist_status_unchecked: 'in progress'
        }, setFormData);
    }

    /**
     * Get Form Data
     */

    function getFormData()
    {
        // Create empty object
        var data = {};

        // Get input fields
        var inputs = document.querySelectorAll('input');

        // Loop through fields
        Array.prototype.forEach.call(inputs, function (element, i)
        {
            // Save id and value into the data object
            data[element.getAttribute('id')] = element.value;
        });

        // Return collected data
        return data;
    }

    /**
     * Set Form Data
     */

    function setFormData(data)
    {
        // Loop through data
        for (var key in data)
        {
            // Get element and set stored value
            document.querySelector('#'+key).value = data[key];
        }
    }

    /**
     * Save Button Saved
     */

    function saveButtonSaved()
    {
        // Notify storage success
        saveButton.innerHTML = 'Saved!';
        saveButton.classList.add('-saved');

        // Restore defaults after timeout
        setTimeout(function(){
            saveButton.innerHTML = 'Save';
            saveButton.classList.remove('-saved');
        }, 1000);
    }

    /**
     * Event Listeners
     */

    document.addEventListener('DOMContentLoaded', restoreOptions);
    saveButton.addEventListener('click', saveOptions);

}(this, document));
