# TAKEOUT FUKUI

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

【お家ご飯】福井県内のテイクアウト＆デリバリー情報まとめ【#頑張ろう福井グルメ】

A web application that aggregates and displays takeout and delivery information for restaurants in Fukui Prefecture, Japan. The data is automatically updated from a public data source.


![Takeout Fukui Screenshot](https://code4fukui.github.io/takeoutfukui/img/takeoutfukui.png)


## Live Demo & Source
- **Live Site:** https://code4fukui.github.io/takeoutfukui/
- **Original Data Source Article:** [Dearふくい](https://dearfukui.jp/gourmet/12951)

## How It Works
This project uses a Node.js script to automate data updates for a static front-end application.
1.  An automated script (`node/autoupdate.js`) runs on a 10-minute interval.
2.  It fetches the latest restaurant data from a public Google Sheet via `node/makedata.js`.
3.  If the data has changed, the script processes it and writes the new data to `data/takeoutfukui.csv` and `data/takeoutfukui.json`.
4.  Finally, it uses `node/git.js` to automatically add, commit, and push the updated data files to this GitHub repository.
5.  The `index.html` page, a static single-page application, fetches the updated data files to display the listings on an interactive map.

## Features
- **Automated Data Updates:** Restaurant list is automatically synced from a Google Sheet every 10 minutes.
- **Interactive Map:** Uses [Leaflet.js](https://leafletjs.com/) to display all restaurant locations with clickable icons.
- **Search & Filter:** Users can search for restaurants by name or keyword and filter by "Takeout" or "Delivery".
- **Static Site:** Simple, fast, and easy to deploy front-end built with vanilla HTML, CSS, and JavaScript.
- **Automated Git Commits:** A Node.js script handles committing and pushing data updates to the repository.

## Running Locally

### Prerequisites
- [Node.js](https://nodejs.org/)

### Setup & Usage
1.  Clone the repository:
    ```bash
    git clone https://github.com/code4fukui/takeoutfukui.git
    cd takeoutfukui
    ```
2.  Install dependencies for the update scripts:
    ```bash
    cd node
    npm install
    ```
3.  To perform a one-time data update:
    ```bash
    node makedata.js
    ```
4.  To start the continuous auto-update process:
    ```bash
    node autoupdate.js
    ```
5.  To view the web application, open `index.html` in your web browser.

## Data Sources
- **Primary Data Source (Google Sheet):** The main list of restaurants is pulled from this [public CSV endpoint](https://docs.google.com/spreadsheets/d/e/2PACX-1vQEGkBA1BaApE2rOd3fajQILfgi9lWpRC4_q3W_By35ogeWh8fuK2C4VoUYN3Y_Vw001O0-6J4E3zg9/pub?gid=0&single=true&output=csv).
- **Secondary Data Source:** Additional data is merged from `data/takeout-sabae-map.csv`.
- **Processed Data:** The application front-end consumes `data/takeoutfukui.json` and `data/takeout-sabae-map.csv`.

## Spinoffs & Contributing

### Spinoff Projects
- **TakeOut Ishikawa:** https://alohayos.github.io/takeout-navi/

### How to Contribute
We welcome contributions! Please submit any requests, suggestions, or bug reports via GitHub Issues.
- **Contribute here:** https://github.com/code4fukui/takeoutfukui/issues

## License
ISC License