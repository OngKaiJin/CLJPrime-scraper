# CLJPrime-scraper
Scraping files in the website of CLJPrime.
> Tested on https://exec-cljprime-com.eu1.proxy.openathens.net.
## Usage
### Get documents
Log in to the site.

In console, run [getdocs.js](getdocs.js) to get documents' information from a search result. The implementation will resubmit search when the number of seach result has changed while going through pages, such as interruption by another user under a shared account. See [sample](examples/getdocs%2007-04-2025.json).
### Get PDFs
In console, run [getpdfs.js](getpdfs.js) to get PDF as it runs through and reads from each PDF's page. See [sample](examples/getpdfs%2009-04-2025.json).

In console, run [validifypdfs.js](validifypdfs.js) to mark if the PDF do not exist as it runs through and reads from each document. See [sample](examples/validifypdfs%2012-04-2025.json).

In console, run [listplain.js](listplain.js) to filter so leaving a plain list of documents and PDFs. Then, save result in a file e.g. ```command.txt```.
### Download PDFs
Log in to account, and copy ```oamps``` manually from inspect's network tab.

Launch terminal at desired folder path.

In terminal, run the below to download PDFs (replace the value of ```oamps```).
```command

```
If the credential expired while downloading, run the below to continue download PDFs from a specific point (replace the values of ```skip``` and ```oamps```). For ```skip```, skip simply by the number of succesfully downloaded files or accurately by the line number of the last successfully downloaded file in ```command.txt```. The download will overwrite the previous files that were downloaded as error page.
```command

```
> [!Note]
> Optional. The below saves log for each download, and uses two times and more of size. It can be safely removed if not needed.
> ```command
> 
> ```
