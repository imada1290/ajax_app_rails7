const buildHTML = (XHR) => {
  const item = XHR.response.post; //レスポンスの中から投稿されたメモの情報を抽出
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};

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
    XHR.onload = () => {
      if (XHR.status != 200) { //リクエストの受信に失敗した場合
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      };
      const list = document.getElementById("list"); //新しいメモを挿入するための要素を取得
      const formText = document.getElementById("content"); //フォームの値を取得
      // console.log(formText.value); //.valueはフォームの投稿内容を取得するため
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
      formText.value = ""; //フォームの値をリセット
    };
  });
 };
 
 window.addEventListener('turbo:load', post);