# GoogleAppsScript_Google-Analytics-Data-API-GA4-_ReportFunction
グーグルアナリティクス4(GA4)のAPI「Google Analytics Data API」に用意されているgetMetadata、runReport、runRealtimeReport、runPivotReportを実行するGoogle Apps Script(GAS)のサンプルコードです。
(Description about Google Apps Script(GAS) code using Google Analytics Data API(GA4).)

# 使い方(Usage)
前提条件：Google Cloud Platrom(GCP)の利用登録(registration for GCP)

1.Google Analytics Data API (GA4)有効化(enable Google Analytics Data AP)
2.GASのプロジェクトとGCPのプロジェクトを紐付け(Link GCP project to GAS project)
3.マニュフェストファイルの修正 (Modify appsscript.json)

以上3点を実行し、GAS_GA4_API.gsの2行目のpropertyIdに取得したいGA4のプロパティIDを設定すれば、利用可能です。
(Set your GA4 property ID in line 2)

詳細な使い方は以下の記事でスクショ等で交えて解説しています。
[GA4(グーグルアナリティクス4)のAPI使い方解説！GASのサンプルコード紹介] (https://auto-worker.com/blog/?p=3250)

# 用意している関数(Method list)
Google Analytics Data APIで実行できる4種類のAPIリクエストを関数化しています。

1.getGa4Metadata()
→getMetadataを実行する関数です。特にパラメータの指定等ありません。

2.getGa4RunReport()
→runReportを実行する関数です。ディメンションやメトリクス、データ期間を設定します。

3.getGa4RunRealTimeReport()
→runRealtimeReportを実行する関数です。ディメンションやメトリクスを設定します。

4.getGa4RunPivotReport()
→runPivotReportを実行する関数です。ディメンションやメトリクス、データ期間を設定します。


# 作成者(Author)
Tyamamoto1007

Twitter:[@gas_seo](https://twitter.com/gas_seo)

https://auto-worker.com/blog
