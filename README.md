
Exporter for Trello
===================

Export your content from Trello to a CSV or Excel XLSX file with this Google Chrome extension. You can package it yourself in development mode or install it the easy way from the [Chrome web store](https://chrome.google.com/webstore/detail/trello-csv-converter/aailfmcmlniknbllmbbkipnfphiejmja).

All processing is done within your Chrome browser, no information will be send to third-party servers, so your data will be safe :)

This plugin supports the comma-separated CSV format, but also Excel's XLSX. So you can easily download your boards, lists, cards and checklists in a readable format.


How to use
-------

After [installing the extension](https://chrome.google.com/webstore/detail/trello-csv-converter/aailfmcmlniknbllmbbkipnfphiejmja), go to Trello, login and follow these steps:

1. Open a board or card
2. Click on `Export JSON`, hidden under `More...`
3. Right click on this button
4. You'll see `Exporter for Trello` in this menu
5. Choose between `Generate CSV file` and `Generate Excel file`

After processing your CSV will be shown as download, have fun!


Technical background
-------

This Google Chrome extension is written in JavaScript and does all processing within the browser itself. It downloads the requested data from the Trello JSON API, then it will be processed to an readable Array format. After that it will be converted to a CSV or XLSX format. The CSV format is quite simple and therefore custom implemented. For XLSX the following vendor libraries are being used:

- [FileSaver.js](https://github.com/eligrey/FileSaver.js) *for generating a Blob file*.
- [js-xlsx](https://github.com/SheetJS/js-xlsx) *creates the XLSX (Excel) file structure*.


---

This extension is a personal initiative and in no way affiliated with Trello.
