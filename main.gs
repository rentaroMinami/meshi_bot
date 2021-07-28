function execute() {
  notifySlack(generateMeshiMessage())
}

function notifySlack(message) {
  // 投稿内容を設定
  // username(通知者の名前)
  // icon_emoji(アイコン)
  // text (送信するメッセージ)
  let payloadJson = {
    "username" : "メシbotくん",
    "icon_emoji" : ":eat_it:",
    "text" : message
  }  

  // 上の送信内容を設定  
  let payload = JSON.stringify(payloadJson)

  // リクエストのオプションを設定
  let options =
  {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : payload
  };

  // Slackに通知する。 ※postUrlはソースコード公開の都合上別ファイル
  UrlFetchApp.fetch(postUrl, options);
}

function pickRandomArrayElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function generateMeshiMessage() {
  // 読み込むスプレッドシートを指定
  const sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1MMTvlxQHTrdlSEp_bWSXU6-WHmTP52YLlwmnD80-DeU/edit#gid=0").getSheetByName("メシ")
  // シートからすべての行を配列に格納
  let meshiList = sheet.getRange(2,2, sheet.getLastRow() - 1, sheet.getLastColumn() - 1).getValues()
  // ランダムに1行分を抽出
  let pickedMeshi = pickRandomArrayElement(meshiList);

  // メシ情報メッセージ作成
  let genre = pickedMeshi[0]
  let name = pickedMeshi[1]
  let url_text  = pickedMeshi[2] ? `<${pickedMeshi[2]}|Webサイト>` : `Webサイトなし`
  let mapUrl_text = pickedMeshi[3] ? `<${pickedMeshi[3]}|GoogleMap>` : `GoogleMapなし`
  let comment = pickedMeshi[4]
  let message = `*${name}* \n【ジャンル】 ${genre}\n 【コメント】 ${comment} \n${url_text}／${mapUrl_text}`


  return message       
}
