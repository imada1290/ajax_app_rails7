function post (){
  //リクエストを送信する処理
  const form = document.getElementById("form"); //id:formの投稿ボタンの要素を取得
  form.addEventListener("submit",(e) => { //投稿するというイベントを検知する、そのため第１引数はsubmit、eはイベント発生時の情報を持ったオブジェクト
    e.preventDefault(); //「投稿ボタンをクリックした」というイベントを無効化する
    const formData = new FormData(form); //フォームの入力を取得するオブジェクトを生成
    const XHR = new XMLHttpRequest(); //Ajaxを用いて非同期通信するためのオブジェクト
    XHR.open("POST", "/posts", true); //リクエストの内容を初期化
    XHR.responseType = "json"; //JSON形式でレスポンスを送るという指定
    XHR.send(formData); //リクエストを送信
  });
 };
 
 window.addEventListener('turbo:load', post);