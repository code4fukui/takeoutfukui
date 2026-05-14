# TAKEOUT FUKUI

【お家ご飯】福井県内のテイクアウト＆デリバリー情報まとめ【#頑張ろう福井グルメ】

福井県内の飲食店のテイクアウトおよびデリバリー情報を集約・表示するWebアプリケーションです。データは公開されているデータソースから自動的に更新されます。

![Takeout Fukui Screenshot](https://code4fukui.github.io/takeoutfukui/img/takeoutfukui.png)

## ライブデモとソース
- **ライブサイト:** https://code4fukui.github.io/takeoutfukui/
- **元のデータソース記事:** [Dearふくい](https://dearfukui.jp/gourmet/12951)

## 動作の仕組み
このプロジェクトは、Node.jsスクリプトを使用して静的フロントエンドアプリケーションのデータ更新を自動化しています。
1. 自動更新スクリプト (`node/autoupdate.js`) が10分間隔で実行されます。
2. `node/makedata.js` を介して、公開されているGoogleスプレッドシートから最新の飲食店データを取得します。
3. データに変更があった場合、スクリプトはデータを処理し、新しいデータを `data/takeoutfukui.csv` と `data/takeoutfukui.json` に書き込みます。
4. 最後に、`node/git.js` を使用して、更新されたデータファイルをこのGitHubリポジトリに自動的に追加、コミット、プッシュします。
5. 静的なシングルページアプリケーションである `index.html` ページが、更新されたデータファイルを取得し、インタラクティブなマップ上にリストを表示します。

## 主な機能
- **自動データ更新:** 飲食店のリストは、10分ごとにGoogleスプレッドシートから自動的に同期されます。
- **インタラクティブマップ:** [Leaflet.js](https://leafletjs.com/) を使用して、クリック可能なアイコンですべての飲食店の場所を表示します。
- **検索と絞り込み:** 飲食店名やキーワードでの検索、および「テイクアウト」や「デリバリー」での絞り込みが可能です。
- **静的サイト:** フレームワークを使用しないHTML、CSS、JavaScriptで構築された、シンプルで高速、かつデプロイが容易なフロントエンドです。
- **自動Gitコミット:** Node.jsスクリプトが、データ更新時のリポジトリへのコミットとプッシュを処理します。

## ローカルでの実行方法

### 前提条件
- [Node.js](https://nodejs.org/)

### セットアップと使用方法
1. リポジトリをクローンします:
    ```bash
    git clone https://github.com/code4fukui/takeoutfukui.git
    cd takeoutfukui
    ```
2. 更新スクリプト用の依存関係をインストールします:
    ```bash
    cd node
    npm install
    ```
3. 1回限りのデータ更新を実行するには:
    ```bash
    node makedata.js
    ```
4. 継続的な自動更新プロセスを開始するには:
    ```bash
    node autoupdate.js
    ```
5. Webアプリケーションを表示するには、Webブラウザで `index.html` を開きます。

## データソース
- **メインのデータソース（Googleスプレッドシート）:** 飲食店のメインリストは、この[公開CSVエンドポイント](https://docs.google.com/spreadsheets/d/e/2PACX-1vQEGkBA1BaApE2rOd3fajQILfgi9lWpRC4_q3W_By35ogeWh8fuK2C4VoUYN3Y_Vw001O0-6J4E3zg9/pub?gid=0&single=true&output=csv)から取得されます。
- **サブのデータソース:** 追加のデータが `data/takeout-sabae-map.csv` からマージされます。
- **処理済みデータ:** アプリケーションのフロントエンドは、`data/takeoutfukui.json` と `data/takeout-sabae-map.csv` を利用します。

## 派生プロジェクトとコントリビューション

### 派生プロジェクト
- **TakeOut Ishikawa:** https://alohayos.github.io/takeout-navi/

### コントリビューションの方法
コントリビューションは大歓迎です！要望、提案、バグ報告などは、GitHubのIssueから提出してください。
- **コントリビューションはこちら:** https://github.com/code4fukui/takeoutfukui/issues

## ライセンス
ISC License
