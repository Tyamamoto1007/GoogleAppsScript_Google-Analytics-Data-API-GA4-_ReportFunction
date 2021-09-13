//Google Analytics4(GA4)のプロパティIDを設定する(*********部分を置換)
let propertyId = "*********";

//GA4 APIのgetMetadataを実行する関数
function getGa4Metadata() {
  //アクティブなスプレッドシートからMetadataの出力結果を格納するシートを作成する
  let mySheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Metadata");
  //getMetadataのAPIリクエストを行うGETのURLを定義(数字がGA4のプロパティID)
  let apiURL = 'https://analyticsdata.googleapis.com/v1beta/properties/' + propertyId + '/metadata';
  //HTTPSのGET時のオプションパラメータを設定する。APIの認証のため、headersの情報も必須
  let options = {
    'myamethod'  : 'GET',
    'muteHttpExceptions' : true,
    'headers' : {"Authorization" : "Bearer " + ScriptApp.getOAuthToken()},
    'contentType' : 'application/json'
  };
  //APIリクエストを実行し、出力されたJSONデータを変換する
  let response = UrlFetchApp.fetch(apiURL,options);
  let json = JSON.parse(response); 
  //ディメンションのメタデータを格納する変数を定義
  let dimensionsData = [];
  //スプレッドシートにメタデータを格納できるように、forループの処理で二次元配列に格納する
  for(i=0;i<json['dimensions'].length;i++){
    dimensionsData[i] = [json['dimensions'][i]['apiName'],json['dimensions'][i]['uiName'],json['dimensions'][i]['description']];
  }
  //指標のメタデータを格納する変数を定義
  let metricsData = [];
  //ディメンション同様に指標もスプレッドシートに格納できるように、forループの処理で二次元配列に格納する
  for(i=0;i<json['metrics'].length;i++){
    metricsData[i] = [json['metrics'][i]['apiName'],json['metrics'][i]['uiName'],json['metrics'][i]['description']];
  }
  //ディメンションと指標をスプレッドシートのシートに出力
  mySheet.getRange(2,1, dimensionsData.length,dimensionsData[0].length).setValues(dimensionsData);
  mySheet.getRange(2,6, metricsData.length,metricsData[0].length).setValues(metricsData);
}

//GA4 APIのrunReportを実行する関数
function getGa4RunReport() {
  //アクティブなスプレッドシートからrunReportの出力結果を格納するシートを読み込み
  let mySheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Report");
  //runReportのAPIリクエストを行うPOSTのURLを定義(数字がGA4のプロパティID)
  let apiURL = 'https://analyticsdata.googleapis.com/v1beta/properties/' + propertyId + ':runReport';
  //POSTする際に必要となるディメンションやメトリクス、データ期間を設定
  let setDimension = [{'name': 'pageTitle'},{'name': 'browser'}];
  let setMetrics = {'name': 'screenPageViews'};
  let setDateRange = {'startDate': '2021-04-01','endDate': '2021-04-05'};
  //APIリクエスト時にセットするペイロード値を設定する
  let payload = {
    'dimensions' : setDimension,
    'metrics': setMetrics,
    'dateRanges': setDateRange 
  };
  //HTTPSのPOST時のオプションパラメータを設定する。APIの認証のため、headersの情報も必須
  let options = {
    'payload' : JSON.stringify(payload),
    'myamethod'  : 'POST',
    'muteHttpExceptions' : true,
    'headers' : {"Authorization" : "Bearer " + ScriptApp.getOAuthToken()},
    'contentType' : 'application/json'
  };
  //APIリクエストを行った結果のJSONデータを変換する
  let response = UrlFetchApp.fetch(apiURL,options);
  let json = JSON.parse(response); 
  //スプレッドシートにレポートデータを格納できるように、forループの処理で二次元配列に格納する
  let ga4Data = [];
  for(let i=0;i<json["rows"].length;i++){
    ga4Data[i] = [json["rows"][i]["dimensionValues"][0]["value"],json["rows"][i]["dimensionValues"][1]["value"],json["rows"][i]["metricValues"][0]["value"]];
  }
  //スプレッドシートにrunReportの実行結果を格納
  mySheet.getRange(2, 1, ga4Data.length, ga4Data[0].length).setValues(ga4Data);
}

//GA4 APIのrunRealtimeReportを実行する関数
function getGa4RunRealTimeReport() {
  //アクティブなスプレッドシートからrunRealtimeReportの出力結果を格納するシートを読み込み
  let mySheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("RealTimeReport");
  //runRealtimeReportのAPIリクエストを行うPOSTのURLを定義(数字がGA4のプロパティID)
  let apiURL = 'https://analyticsdata.googleapis.com/v1beta/properties/' + propertyId + ':runRealtimeReport';
  //POSTする際に必要となるディメンションやメトリクスを設定
  //今回はデバイスごとのリアルタイムデータ数値を出力
  let setDimensions = {'name': 'deviceCategory'};
  let setMetrics = {'name': 'screenPageViews'};
  //APIリクエスト時にセットするペイロード値を設定する
  let payload = {
    'dimensions': setDimensions,
    'metrics': setMetrics
  };
  //HTTPSのPOST時のオプションパラメータを設定する
  let options = {
    'payload' : JSON.stringify(payload),
    'myamethod'  : 'POST',
    'muteHttpExceptions' : true,
    'headers' : {"Authorization" : "Bearer " + ScriptApp.getOAuthToken()},
    'contentType' : 'application/json'
  };
  //APIリクエストを行った結果のJSONデータを変換する
  let response = UrlFetchApp.fetch(apiURL,options);
  let json = JSON.parse(response);
  //スプレッドシートにレポートデータを格納できるように、forループの処理で二次元配列に格納する
  let ga4Data = [];
  for(let i=0;i<json["rows"].length;i++){
    ga4Data[i] = [json["rows"][i]["dimensionValues"][0]["value"],json["rows"][i]["metricValues"][0]["value"]];
  }
  //スプレッドシートにrunReportの実行結果を格納
  mySheet.getRange(2, 1, ga4Data.length, ga4Data[0].length).setValues(ga4Data);
}


//GA4 APIのrunPivotReportを実行する関数
function getGa4RunPivotReport() {
  //アクティブなスプレッドシートからrunPivotReportの出力結果を格納するシートを読み込み
  let mySheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("PivotReport");
  //runRealtimeReportのAPIリクエストを行うPOSTのURLを定義(数字がGA4のプロパティID)
  let apiURL = 'https://analyticsdata.googleapis.com/v1beta/properties/' + propertyId + ':runPivotReport';
  //POSTする際に必要となるディメンションやメトリクス、データ期間を設定
  let setDimension = [{'name': 'browser'},{'name':'operatingSystem'}];
  let setMetrics = {'name': 'screenPageViews'};
  let setDateRange = {"startDate": "2021-04-01","endDate": "2021-04-01"};
  let setPivot = {'fieldNames': ['operatingSystem', 'browser'],'limit': '10000'};
  //APIリクエスト時にセットするペイロード値を設定する
  let payload = {
    'dimensions' : setDimension,
    'metrics': setMetrics,
    'dateRanges': setDateRange,
    'pivots': setPivot
  };
  //HTTPSのPOST時のオプションパラメータを設定する
  let options = {
    'payload' : JSON.stringify(payload),
    'myamethod'  : 'POST',
    'muteHttpExceptions' : true,
    'headers' : {"Authorization" : "Bearer " + ScriptApp.getOAuthToken()},
    'contentType' : 'application/json'
  };
  //APIリクエストを行った結果のJSONデータを変換する
  let response = UrlFetchApp.fetch(apiURL,options);
  let json = JSON.parse(response); 
  //スプレッドシートにレポートデータを格納できるように、forループの処理で二次元配列に格納する
  let ga4Data = [];
  for(let i=0; i<json["rows"].length;i++){
    ga4Data[i] = [json["rows"][i]["dimensionValues"][0]["value"],json["rows"][i]["dimensionValues"][1]["value"],json["rows"][i]["metricValues"][0]["value"]];
  }
  mySheet.getRange(2, 1, ga4Data.length, ga4Data[0].length).setValues(ga4Data);
}
