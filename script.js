"use strict";

//ファイルに使用できない記号を置換する
function filename_replace(target_string) {
  let string = target_string
  //ウィンドウズのファイル名で使用できない記号
  let marks = ["\\", '/', ':', '*', '?', "<", ">", '|'];

  //全部置き換えて消す
  marks.forEach(function (element) {
    string = string.replace(element, 'ぬ')
  });
  return string
}


//フォルダ生成ボタンを押したときの処理
function Generator() {

  let zip = new JSZip() ///「jszip.min.js」の機能→保存したいファイル作る
  let foldername = filename_replace(folder_name.value) //呼び出しと同時にやばい記号置換

  let weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  let weekdays_jp = ['1_月曜日', '2_火曜日', '3_水曜日', '4_木曜日', '5_金曜日', '6_土曜日']

  //月～土曜日でループ
  weekdays.forEach(function (element, index) {

    //1時間目～8時間目でループ
    for (let n_st = 1; n_st <= 8; n_st++) {
      let now_weekday = weekdays_jp[index] //現在の曜日(日本語)

      let now_lesson_id = `${element}_${n_st}st` //現在の時間の授業のid
      let now_lesson_row = window[now_lesson_id].value //現在の時間の授業の名称
      let now_lesson = filename_replace(now_lesson_row) //やばい記号を置換する
      //重要：window[変数名]で、html側のidを書くのと同義になる
      //console.log(window[now_lesson_id].value)

      if (now_lesson == "") {
        //授業名に何も記載されない＝空白の時は何もしない
      } else {
        let now_pass = `${now_weekday}/${n_st}_${now_lesson}`
        console.log(now_pass)
        //各科目用のメモを作成する
        zip.file(`${now_pass}/${now_lesson}_メモ.txt`, `これは${now_lesson}のメモです`)

        //各回分のメモを作成する(使わない可能性高いがフォルダ作るために)
        for (let n_time = 1; n_time <= lessons_num.value; n_time++) {
          zip.file(`${now_pass}/${now_lesson}_${n_time}回目/${now_lesson}の${n_time}回目メモ.txt`, `これは${now_lesson}の${n_time}回目メモです`)
        }
      }

      //ファイルパスを取得()

      //zip.file(`${ weekdays_jp } / ${ i }_${ window[now_lesson_id].value }`,)
    }
  });

  //ブラウザで保存する処理(DEFLATEなので一応圧縮しておく)
  zip.generateAsync({ type: "blob", compression: 'DEFLATE' })
    .then(function (content) {
      saveAs(content, `${foldername}.zip`);
    });

}

