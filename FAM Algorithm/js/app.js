/***** FAM-Algorithm *****/
//グローバル変数
var year;
var month;
var day;
var id;
var famType;
var yearGregorian;
var monthGregorian;
var dayGregorian;
var sumGregorian;
const maxId = 300;
var datalist;
var prevDatalist;
var str;
var strAll;
var isYes;
//loopTimer関数,roulette関数
var count = 0;
const countMax = 12;
//FAMコンパスの画像セット
var album = [
  {src: 'images/init_fam.png', msg: 'FAMタイプ: 分析結果'},
  {src: 'images/compass/F1.png', msg: 'FAMタイプ: F1'},
  {src: 'images/compass/F2.png', msg: 'FAMタイプ: F2'},
  {src: 'images/compass/F3.png', msg: 'FAMタイプ: F3'},
  {src: 'images/compass/F4.png', msg: 'FAMタイプ: F4'},
  {src: 'images/compass/A5.png', msg: 'FAMタイプ: A5'},
  {src: 'images/compass/A6.png', msg: 'FAMタイプ: A6'},
  {src: 'images/compass/A7.png', msg: 'FAMタイプ: A7'},
  {src: 'images/compass/A8.png', msg: 'FAMタイプ: A8'},
  {src: 'images/compass/M9.png', msg: 'FAMタイプ: M9'},
  {src: 'images/compass/M10.png', msg: 'FAMタイプ: M10'},
  {src: 'images/compass/M11.png', msg: 'FAMタイプ: M11'},
  {src: 'images/compass/M12.png', msg: 'FAMタイプ: M12'}
]
//FAMコンパスの要素追加
var imgCompass = document.createElement('img');
var msgCompass = document.createElement('p');
var flameCompass = document.querySelector('#compass');
//FAMコンパスの初期表示
imgCompass.setAttribute('src', album[0].src);
imgCompass.setAttribute('alt', album[0].msg);
msgCompass.innerText = imgCompass.alt;
flameCompass.insertBefore(imgCompass, null);
flameCompass.insertBefore(msgCompass, null);

//入力フォームの表示
inputBirthday();
inputType();
inputId();

//入力フォーム表示用の関数
function inputBirthday(){
  var time = new Date();
  var thisYear = time.getFullYear();
  for (var i = thisYear; i >= 1; i--) {
    $('#year').append('<option value="' + i + '">' + i + '</option>');
  }
  for (var i = 1; i <= 12; i++) {
    $('#month').append('<option value="' + i + '">' + i + '</option>');
  }
  for (var i = 1; i <= 31; i++) {
    $('#day').append('<option value="' + i + '">' + i + '</option>');
  }
}
function inputType(){
  for (var i = 1; i <= 12; i++) {
    $('.inputType').append('<option value="' + i + '">' + i + '</option>');
  }
}
function inputId(){
  for (var i = 1; i <= maxId; i++) {
    $('.inputId').append('<option value="' + i + '">' + i + '</option>');
  }
}

/***** index.html Top*****/
//ボタン表示切り替えフラグ
var flagResult = false;
var flagCeleb = false;
var flagLegend = false;
var flagSave = false;
/*** Analys ***/
$('#btnAnalys').click(function(){
  $('#articleAnalys').show();
  initAnalys();
  $('#areaBtnVarious').fadeIn();
  $('#btnLogAdd').fadeIn();

  year = parseInt( $('#year').val() );
  month = parseInt( $('#month').val() );
  day = parseInt( $('#day').val() );
  famType = getfamType(year, month, day);
  $('#titleType').text('FAMタイプ: ' + famType + ' の解説');

  if (year == 0 || month == 0 || day == 0) {
        alert('生年月日を選択してください');
        $('#articleAnalys').hide();
        return false;
    // else if (famType == undefined) の条件では,1年1月4日(Julian)を除外できない
  } else if (sumGregorian <= 0) {
        alert('ユリウス暦:1年1月5日(グレゴリオ暦:1年1月1日)\n'
        + 'よりも過去の生年月日はタイプを判定できません');
        $('#articleAnalys').hide();
        return false;
  } else {
      //ルーレット関数の実行(150msループ)
      loopTimer(countMax, 70, function(loopNum){
          roulette();
      });
  }
  if (sumGregorian >= 577736){
      $('#txtJulian').hide();
      $('#txtGregorian').text('グレゴリオ暦: ' + year + '年'+ month + '月' + day
      + '日 生まれの人物を分析');
  } else {
      $('#txtJulian').show();
      $('#txtJulian').text('ユリウス暦: ' + year + '年'+ month + '月' + day
      + '日 をグレゴリオ暦に変換');
      $('#txtGregorian').text('グレゴリオ暦: ' + yearGregorian + '年' + monthGregorian + '月'
        + dayGregorian + '日 生まれの人物を分析');
  }
});

/*** Result ***/
$('#btnResult').click(function() {
  flagResult = !flagResult;
  if(flagResult == true) {
    $('#sectionResult').show();
    $('#titleResult').text('タイプ: ' + famType + ' の性格分析');
    $('#tableResult').remove();
    $('#sectionResult').append('<table id="tableResult"></table>');
    var obj = getPersonality(famType);
    $('#tableResult').append('<tr><th>グループ</th><td colspan="3">' + obj.group + '</td></tr>');
    $('#tableResult').append('<tr><th>主観/客観</th><td colspan="3">' + obj.view + '</td></tr>');
    $('#tableResult').append('<tr><th>優先順位</th><td class="priority">' + obj.lank[1] + '</td><td class="priority">' + obj.lank[2] + '</td><td>' + obj.lank[3] + '</td></tr>');
    $('#tableResult').append('<tr><th>個性1</th><td colspan="3">' + obj.chara1 + '</td></tr>');
    $('#tableResult').append('<tr><th>個性2</th><td colspan="3">' + obj.chara2 + '</td></tr>');
    $('#tableResult').append('<tr><th>個性3</th><td colspan="3">' + obj.chara3 + '</td></tr>');
    $('#tableResult').append('<tr><th>才能</th><td colspan="3">' + obj.ability + '</td></tr>');
    $('#tableResult').append('<tr><th>傾向</th><td colspan="3">' + obj.tendency + '</td></tr>');
    $('#txtGroup').text(obj.group);
    $('#txtCharacter').text(obj.character);
    $('#txtStrength').text(obj.strength);
    $('#txtWeakness').text(obj.weakness);
    $('#txtMsg').text(obj.msg);
  }
  if(flagResult == false) {
    $('#sectionResult').hide();
  }
});

/*** Celeb ***/
$('#btnCeleb').click(function() {
  flagCeleb = !flagCeleb;
  if(flagCeleb == true) {
    $('#sectionCeleb').show();
    $('#titleCeleb').text('タイプ: ' + famType + ' の著名人');
    $('#tableCeleb').remove();
    $('#sectionCeleb').append('<table id="tableCeleb"></table>');
    var obj = getCelebrity(famType);
    var array = obj.name;
    $('#tableCeleb').append('<tr><th class="tableJob">' + 'Job'
      + '</th><th class="tableName">' + 'Name'
      + '</th><th class="tableBirth">' + 'Birthday' + '</th></tr>');
    for (var i = 1; i < array.length; i++){
      var birthday = obj.year[i] + '年' + obj.month[i]
        + '月' + obj.day[i] +'日';
      $('#tableCeleb').append('<tr><td>' + obj.job[i] + '</td><td>' + obj.name[i]
        + '</td><td>' + birthday + '</td></tr>');
    }
  }
  if(flagCeleb == false) {
    $('#sectionCeleb').hide();
  }
});

/*** Legend ***/
$('#btnLegend').click(function() {
  flagLegend = !flagLegend;
  if(flagLegend == true) {
    $('#sectionLegend').show();
    $('#titleLegend').text('タイプ: ' + famType + ' の偉人');
    $('#tableLegend').remove();
    $('#sectionLegend').append('<table id="tableLegend"></table>');
      var obj = getLegend(famType);
      var array = obj.name;
      $('#tableLegend').append('<tr><th class="tableJob">' + 'Job'
        + '</th><th class="tableName">' + 'Name'
        + '</th><th class="tableBirth">' + 'Birthday' + '</th></tr>');
      for (var i = 1; i < array.length; i++) {
        var birthday = obj.year[i] + '年' + obj.month[i]
          + '月' + obj.day[i] +'日';
        $('#tableLegend').append('<tr><td>' + obj.job[i] + '</td><td>' + obj.name[i]
          + '</td><td>' + birthday + '</td></tr>');
      }
  }
  if(flagLegend == false) {
    $('#sectionLegend').hide();
  }
});

/*** Save ***/
$('#iconSave').click(function(event){
    flagSave = !flagSave;
    if(flagSave == true) {
      $('#sectionSave').show();
    }
    if(flagSave == false) {
      $('#sectionSave').hide();
      document.formName.reset();
      $('#sectionSaveNotify').hide();
    }
});

/*** Save > btnSave ***/
$('#btnSave').click(function(){
    var name = $(".inputName").val();
    if (name == '') {
      alert('名前を入力してください');
      return false;
    }
    var birthday = year + '年 ' + month + '月' + day +'日';
    var datalist = {
      name: name,
      year: year,
      month: month,
      day: day,
      type: famType
    }
    //データの長さ＋１の方法では,削除したIDを補充できない
    // var id = localStorage.length + 1;
    var id = 1;
    var prevDatalist = JSON.parse(localStorage.getItem('key' + id) );
    while(prevDatalist != null) {
      id = id + 1;
      prevDatalist = JSON.parse(localStorage.getItem('key' + id) );
    }
    datalist = JSON.stringify(datalist);
    localStorage.setItem('key' + id , datalist);
    $('#sectionSaveNotify').show();
    $('#txtSaveId').text('・ID: ' + id);
    $('#txtSaveName').text('・NAME: ' + name);
    $('#txtSaveBirth').text('・Birthday: ' + birthday);
    $('#txtSaveType').text('・Type: ' + famType);
    $('#txtSave').text('以上のデータを「 My Log 」に追加しました');
});

/*** Save > btnReset ***/
$('#btnReset').click(function(){
  document.formName.reset();
  $('#sectionSaveNotify').hide();
});
/***** index.html Bottom *****/


/***** dictionary.html Top *****/
var flagDiagram = false;
/*** Diagram ***/
$('#imgDictionary').click(function(){
  flagDiagram = !flagDiagram;
  if (flagDiagram == true) {
    $('#sectionDiagram').show();
  }
  else if (flagDiagram == false) {
    $('#sectionDiagram').hide();
  }
});

$('#btnInterpret').click(function(){
  $('#articleInterpret').show();
  initAnalys();
  //ボタン表示切り替えのフラグ
  var flagResult = false;
  var flagCeleb = false;
  var flagLegend = false;
  $('#areaBtnVarious').fadeIn();
  var typeNum = $('.inputType').val();
  if (typeNum >= 1 && typeNum <= 4){
    famType = 'F' + $('.inputType').val();
  } else if (typeNum >= 5 && typeNum <= 8){
    famType = 'A' + $('.inputType').val();
  } else{
    famType = 'M' + $('.inputType').val();
  }

  $('#titleType').text('FAMタイプ: ' + famType +  ' の解説');

  $('#btnDicResult').click(function() {
    flagResult = !flagResult;
    if(flagResult == true) {
      $('#sectionResult').show();
      $('#titleResult').text('タイプ: ' + famType + ' の性格分析');
      $('#tableResult').remove();
      $('#sectionResult').append('<table id="tableResult"></table>');
      var obj = getPersonality(famType);
      $('#tableResult').append('<tr><th>グループ</th><td colspan="3">' + obj.group + '</td></tr>');
      $('#tableResult').append('<tr><th>主観/客観</th><td colspan="3">' + obj.view + '</td></tr>');
      $('#tableResult').append('<tr><th>優先順位</th><td class="priority">' + obj.lank[1] + '</td><td class="priority">' + obj.lank[2] + '</td><td>' + obj.lank[3] + '</td></tr>');
      $('#tableResult').append('<tr><th>個性１</th><td colspan="3">' + obj.chara1 + '</td></tr>');
      $('#tableResult').append('<tr><th>個性２</th><td colspan="3">' + obj.chara2 + '</td></tr>');
      $('#tableResult').append('<tr><th>個性３</th><td colspan="3">' + obj.chara3 + '</td></tr>');
      $('#tableResult').append('<tr><th>才能</th><td colspan="3">' + obj.ability + '</td></tr>');
      $('#tableResult').append('<tr><th>傾向</th><td colspan="3">' + obj.tendency + '</td></tr>');
    }
    if(flagResult == false) {
      $('#sectionResult').hide();
    }
  });

  $('#btnDicCeleb').click(function() {
    flagCeleb = !flagCeleb;
    if(flagCeleb == true) {
      $('#sectionCeleb').show();
      $('#titleCeleb').text('タイプ: ' + famType + ' の著名人');
      $('#tableCeleb').remove();
      $('#sectionCeleb').append('<table id="tableCeleb"></table>');
      var obj = getCelebrity(famType);
      var array = obj.name;
      $('#tableCeleb').append('<tr><th class="tableJob">' + 'Job'
        + '</th><th class="tableName">' + 'Name'
        + '</th><th class="tableBirth">' + 'Birthday' + '</th></tr>');
      for (var i = 1; i < array.length; i++){
        var birthday = obj.year[i] + '年' + obj.month[i]
          + '月' + obj.day[i] +'日';
        $('#tableCeleb').append('<tr><td>' + obj.job[i] + '</td><td>' + obj.name[i]
          + '</td><td>' + birthday + '</td></tr>');
      }
    }
    if(flagCeleb == false) {
      $('#sectionCeleb').hide();
    }
  });

  $('#btnDicLegend').click(function() {
    flagLegend = !flagLegend;
    if(flagLegend == true) {
      $('#sectionLegend').show();
      $('#titleLegend').text('タイプ: ' + famType + ' の偉人');
      $('#tableLegend').remove();
      $('#sectionLegend').append('<table id="tableLegend"></table>');
        var obj = getLegend(famType);
        var array = obj.name;
        $('#tableLegend').append('<tr><th class="tableJob">' + 'Job'
          + '</th><th class="tableName">' + 'Name'
          + '</th><th class="tableBirth">' + 'Birthday' + '</th></tr>');
        for (var i = 1; i < array.length; i++) {
          var birthday = obj.year[i] + '年' + obj.month[i]
            + '月' + obj.day[i] +'日';
          $('#tableLegend').append('<tr><td>' + obj.job[i] + '</td><td>' + obj.name[i]
            + '</td><td>' + birthday + '</td></tr>');
        }
    }
    if(flagLegend == false) {
      $('#sectionLegend').hide();
    }
  });
});
/***** Dictionary.html Bottom *****/


/***** Log.html Top *****/
//ボタン表示切り替えフラグ
var flagLogList = false;
var flagLogAdd = false;
var flagLogEdit = false;
/*** Log List ***/
$('#btnLogList').click(function(){
    flagLogList = !flagLogList;
    if (flagLogList) {
      $('#sectionLogList').show();
      if(localStorage.length == 0) {
        $("#txtLogList").text('表示するログデータがありません');
        return false;
      }
      $('#tableLogList').remove();
      $('#sectionLogList').append('<table id="tableLogList"></table>');
      var array = [];
      for(var i = 0; i < localStorage.length ; i++) {
        var key = localStorage.key(i);
        var keyNum = key.replace(/[^0-9]/g, '');
        keyNum = parseInt(keyNum);
        array.push(keyNum);
      }
      console.log(array);
      array.sort((a, b) => {
        if (a > b) {
          return 1;
        }
        if (a < b) {
          return -1;
        }
      });
      console.log(array);
      for(var j = 0; j < array.length; j++) {
        keyNum = array[j];
        key = 'key' + keyNum;
        var obj = JSON.parse(localStorage.getItem(key) );
        var birthday = obj.year + '年' + obj.month + '月' + obj.day +'日';
        $('#tableLogList').append('<tr><td>' + keyNum + '</td><td>' + obj.name
          + '</td><td>' + birthday + '</td><td>' + obj.type + '</td></tr>');
      }
      $('#tableLogList').prepend('<tr><th class="tableId">' + 'ID'
        + '</th><th class="tableName">' + 'Name'
        + '</th><th class="tableBirth">' + 'Birthday'
        + '</th><th class="tableType">' + 'Type' + '</th></tr>');
    } else {
      $('#sectionLogList').hide();
      $('#txtLogList').empty();
      $('#tableLogList').remove();
    }
});

/*** Log Add+ ***/
$('#btnLogAdd').click(function(){
    flagLogAdd = !flagLogAdd;
    if (flagLogAdd) {
      $('#sectionLogAdd').show();
    } else {
      document.formName.reset();
      document.formBirthday.reset();
      $('#sectionLogAdd').hide();
      $('#sectionAddNotify').hide();
    }
});

/*** Log Add+ > Save Log ***/
$('#btnLogSave').click(function(){
    var name = $(".inputName").val();
    year = parseInt( $('#year').val() );
    month = parseInt( $('#month').val() );
    day = parseInt( $('#day').val() );
    famType = getfamType(year, month, day);
    if (name == '') {
      alert('名前を入力してください');
      return false;
    } else if (year == 0 || month == 0 || day == 0) {
        alert('生年月日を選択してください');
        return false;
    } else if (sumGregorian <= 0) {
        alert('ユリウス暦:1年1月5日(グレゴリオ暦:1年1月1日)\n'
        + 'よりも過去の生年月日はタイプを判定できません');
        return false;
    }
    var birthday = year + '年' + month + '月' + day +'日';
    var datalist = {
      name: name,
      year: year,
      month: month,
      day: day,
      type: famType
    }
    //データの長さ＋１の方法では,削除したIDを補充できない
    // var id = localStorage.length + 1;
    var id = 1;
    var prevDatalist = JSON.parse(localStorage.getItem('key' + id) );
    while(prevDatalist != null) {
      id = id + 1;
      prevDatalist = JSON.parse(localStorage.getItem('key' + id) );
    }
    datalist = JSON.stringify(datalist);
    localStorage.setItem('key' + id , datalist);

    $('#sectionAddNotify').show();
    $('#txtAddId').text('・ID: ' + id);
    $('#txtAddName').text('・Name: ' + name);
    if (sumGregorian >= 577736) {
      $('#txtAddBirth').text('・Birthday: ' + birthday + ' (グレゴリオ暦)');
    } else {
      $('#txtAddBirth').text('・Birthday: ' + birthday + ' (ユリウス暦)');
    }
    $('#txtAddType').text('・Type: ' + famType);
    $('#txtAdd').text('以上のデータを「 My Log 」に追加しました');
  });

  /*** Log Add+ > Reset Form ***/
  $('#btnLogReset').click(function(){
    document.formName.reset();
    document.formBirthday.reset();
    $('#sectionAddNotify').hide();
  });

/*** Log Edit ***/
$('#btnLogEdit').click(function(){
    flagLogEdit = !flagLogEdit;
    if (flagLogEdit) {
      $('#sectionLogEdit').show();
    } else {
    $('#sectionLogEdit').hide();
    $('#sectionEditNotify').hide();
    $('#txtEdit').hide();
    }
});

$('#imgSearch').click(function(){
  var id = $('.inputId').val();
  if(id == 0){
    alert('検索するログのIDを選択して下さい');
    return false;
  }
  var datalist = JSON.parse(localStorage.getItem('key' + id) );
  if(datalist == null) {
    $('#sectionEditNotify').hide();
    $('#txtEdit').show();
    $("#txtEdit").text('< 選択された ID: ' + id + ' は未登録です >');
    return false;
  } else {
    var birthday = datalist.year + '年' + datalist.month + '月' + datalist.day +'日';
    var name = datalist.name;
    var type = datalist.type;
      $('#sectionEditNotify').show();
      $('#areaSearch').show();
      $('#areaRemove').hide();
      $('#txtEdit').hide();
      $('#titleEditNotify').text('検索されたログデータ');
      $('#txtSearchId').text('・ID: ' + id);
      $('#txtSearchName').text('・Name: ' + name);
      $('#txtSearchBirth').text('・Birthday: ' + birthday);
      $('#txtSearchType').text('・Type: ' + type);
  }
});

$('#btnLogRemove').click(function(){
  var id = $('.inputId').val();
  if (id == 0) {
    alert('削除するログのIDを選択して下さい');
    return false;
  }
  datalist = JSON.parse(localStorage.getItem('key' + id) );
  if(datalist == null) {
    $('#sectionEditNotify').hide();
    $('#txtEdit').show();
    $("#txtEdit").text('< 選択された ID: ' + id + ' は未登録です >');
    return false;
  } else {
    var birthday = datalist.year + '年' + datalist.month + '月' + datalist.day +'日';
    var name = datalist.name;
    var type = datalist.type;
    isYes = confirm('「 ID:' + id + '  Name:' +  name
      + '  Type:' +  type + ' 」のログを削除しますか？');
    if (isYes) {
      localStorage.removeItem('key' + id);
      $('#sectionEditNotify').show();
      $('#areaSearch').hide();
      $('#areaRemove').show();
      $('#txtEdit').show();
      $('#titleEditNotify').text('削除されたログデータ');
      $('#txtRemoveId').text('・ID: ' + id);
      $('#txtRemoveName').text('・Name: ' + name);
      $('#txtRemoveBirth').text('・Birthday: ' + birthday);
      $('#txtRemoveType').text('・Type: ' + type);
      $('#txtEdit').text('以上のデータを「 My Log 」から削除しました');
    } else {
      $('#sectionEditNotify').hide();
    }
  }
});

$('#btnLogClear').click(function(){
  isYes = confirm('全てのログを削除してよろしいですか？');
  if (isYes) {
    localStorage.clear();
    $('#sectionEditNotify').hide();
    $('#txtEdit').show();
    $('#txtEdit').text('< 全てのログデータを削除しました >');
  } else {
    $('#sectionEditNotify').hide();
    $('#txtEdit').hide();
  }
});
/***** Log.htmal Bottom *****/


/*** ページのリセット ***/
function initAnalys(){
  $('#sectionResult').hide();
  $('#sectionCeleb').hide();
  $('#sectionLegend').hide();
  $('#areaBtnVarious').fadeOut();
  $('#sectionSave').hide();
  return 0;
}

/*** ページの再読み込み ***/
$('#btnReload').click(function(){
  location.reload();
});

/*** FAM アルゴリズム ***/
function getfamType(year, month, day){
  if(month == 1 || month == 2){
    year = year - 1;
    month = month + 12;
  }
  //フェアフィールドの公式より、西暦1年1月1日からの経過日数を算出
  sumGregorian = (365 * year) + Math.floor(year / 4) - Math.floor(year / 100)
    + Math.floor(year / 400) + Math.floor( (306 * (month+1) ) / 10) + day - 428;
  console.log('経過日数:' + sumGregorian + '日');
  //グレゴリオ暦の始まりを1582年10月15日(総日数:577736日)とした
  if (sumGregorian >= 577736) {
    id = sumGregorian % 60;
  } else {
    julianConversion(year, month, day);
  }
  console.log('ID:' + id);
  return reference(id);
}

/*** ユリウス暦 => グレゴリオ暦 ***/
function julianConversion(){
  var mjd = Math.floor(365.25 * year) + Math.floor(30.59 * (month - 2) )
   + day - 678914;
  var n1 = mjd + 678881;
  var n2 = Math.floor( ( ( 4 * (n1 + 1) ) / 146097) + 1 );
  var a = 4 * n1 + 3 + 4 * ( Math.floor( (3 / 4) * n2 ) );
  var b = 5 * Math.floor((a % 1461) / 4) + 2;

  yearGregorian = Math.floor(a / 1461);
  monthGregorian = Math.floor(b / 153) + 3;
  dayGregorian = Math.floor((b % 153) / 5) + 1;

  sumGregorian = (365 * yearGregorian) + Math.floor(yearGregorian/4)
   - Math.floor(yearGregorian/100) + Math.floor(yearGregorian/400)
   + Math.floor( (306*(monthGregorian + 1)) / 10) + dayGregorian - 428;
  console.log('経過日数:' + sumGregorian + '日');
  id = sumGregorian % 60;

  if(monthGregorian == 13 || monthGregorian == 14){
    yearGregorian = yearGregorian + 1;
    monthGregorian = monthGregorian - 12;
  }
  console.log('修正ユリウス日:' + mjd);
  return id;
}

/*** ルーレット ***/
function roulette(){
  count = ++count;
  // console.log(count);
  imgCompass.setAttribute('src', album[count].src);
  imgCompass.setAttribute('alt', album[count].msg);
  //ルーレット中は、txtCompassを非表示
  msgCompass.innerText = '';
  flameCompass.insertBefore(imgCompass, null);
  flameCompass.insertBefore(msgCompass, null);
  if(count == countMax){
    //famTypeから数字のみ取得しfamNumへ格納
    var famNum = famType.replace(/[^0-9]/g, '');
    imgCompass.setAttribute('src', album[famNum].src);
    imgCompass.setAttribute('alt', album[famNum].msg);
    msgCompass.innerText = imgCompass.alt;
    flameCompass.insertBefore(imgCompass, null);
    flameCompass.insertBefore(msgCompass, null);
    count = 0;
  }
}

/*** Delay Timer ***/
function loopTimer(loopLimit, interval, mainFunc) {
  var loopNum = 0;
  var loopFunc = function() {
    var loopOut = mainFunc(loopNum);
    if(loopOut === false) {
      // breakするとき:loopTimer内でfalseを返す
      return;
    }
    loopNum = ++loopNum;
    if (loopNum < loopLimit) {
      setTimeout(loopFunc, interval);
    }
  }
  loopFunc();
}

function getPersonality(famType){
  switch(famType){
    case 'F1':
      var group = '感情派 (F)';
      var view = '主観型 (奇数)';
      var priority = [null, '1. 感情', ' 2. 思考', '3. 行動'];
      var character1 = '想像力が豊か';
      var character2 = '独自のこだわりを持つ';
      var character3 = '正義感が強い';
      var ability = 'シュミレーション能力に優れる';
      var tendency = '人見知りな反面, <br>信頼のおける人には素直に振る舞う';
      var objAnalys = {
        group: group,
        view: view,
        lank: priority,
        chara1: character1,
        chara2: character2,
        chara3: character3,
        ability: ability,
        tendency: tendency
      }
      return objAnalys;
    case 'F2':
      var group = '感情派 (F)';
      var view = '客観型 (偶数)';
      var priority = [null, '1. 感情', ' 2. 思考', '3. 行動'];
      var character1 = '協調性が高く, 気配り上手';
      var character2 = '柔軟な対応力';
      var character3 = '現実的な視点と, 優れた観察眼を持つ';
      var ability = '数字に強く, 記憶力に長ける';
      var tendency = '人間関係を最も重要視する';
      var objAnalys = {
        group: group,
        view: view,
        lank: priority,
        chara1: character1,
        chara2: character2,
        chara3: character3,
        ability: ability,
        tendency: tendency
      }
      return objAnalys;
    case 'F3':
      var group = '感情派 (F)';
      var view = '主観型 (奇数)';
      var priority = [null, '1. 感情', ' 2. 行動', '3. 思考'];
      var character1 = '人懐っこい性格で, 親しみやすい';
      var character2 = 'ポジティブに可能性を追求する';
      var character3 = '好奇心旺盛で, チャレンジ精神がある';
      var ability = '自由な発想があり, 企画力に長ける';
      var tendency = '直観的に行動し, 臨機応変に対応する';
      var objAnalys = {
        group: group,
        view: view,
        lank: priority,
        chara1: character1,
        chara2: character2,
        chara3: character3,
        ability: ability,
        tendency: tendency
      }
      return objAnalys;
    case 'F4':
      var group = '感情派 (F)';
      var view = '客観型 (偶数)';
      var priority = [null, '1. 感情', ' 2. 行動', '3. 思考'];
      var character1 = '誠実な性格で, 人に対して平等';
      var character2 = '物腰が柔らかく, 人当たりが良い';
      var character3 = '大器晩成なタイプで, 経験を重要視する';
      var ability = '堅実に, 根気強く努力できる';
      var tendency = '意思決定において優柔不断だが, <br>決断したときのこだわりは強い';
      var objAnalys = {
        group: group,
        view: view,
        lank: priority,
        chara1: character1,
        chara2: character2,
        chara3: character3,
        ability: ability,
        tendency: tendency
      }
      return objAnalys;
    case 'A5':
      var group = '行動派 (A)';
      var view = '主観型 (奇数)';
      var priority = [null, '1. 行動', ' 2. 感情', '3. 思考'];
      var character1 = '正義感が強く, 正直な性格';
      var character2 = '合理的で, 要領がいい';
      var character3 = '自我が強く, 人に流されない';
      var ability = 'バイタリティに溢れ, 俊敏な行動力がある';
      var tendency = '強気の裏に, 繊細な一面を持つ';
      var objAnalys = {
        group: group,
        view: view,
        lank: priority,
        chara1: character1,
        chara2: character2,
        chara3: character3,
        ability: ability,
        tendency: tendency
      }
      return objAnalys;
    case 'A6':
      var group = '行動派 (A)';
      var view = '客観型 (偶数)';
      var priority = [null, '1. 行動', ' 2. 感情', '3. 思考'];
      var character1 = '感受性が豊かで, 表現力に長ける';
      var character2 = '気さくで, ユーモアに富む';
      var character3 = '臨機応変で, アドリブに強い';
      var ability = '身体的なバランス感覚や, 音感に優れる';
      var tendency = '意思決定は慎重で堅実な反面, <br>腹が決まれば大胆な行動力を発揮する';
      var objAnalys = {
        group: group,
        view: view,
        lank: priority,
        chara1: character1,
        chara2: character2,
        chara3: character3,
        ability: ability,
        tendency: tendency
      }
      return objAnalys;
    case 'A7':
      var group = '行動派 (A)';
      var view = '主観型 (奇数)';
      var priority = [null, '1. 行動', ' 2. 思考', '3. 感情'];
      var character1 = '飾り気がなく, 素直な性格';
      var character2 = '合理主義で, 経験や知識が判断基準';
      var character3 = '向上心が高く, ひたむきな努力を重ねる';
      var ability = '職人気質があり, 吸収力と工夫力に長ける';
      var tendency = '社会や周りに対して依存心がなく, <br>自立心が旺盛';
      var objAnalys = {
        group: group,
        view: view,
        lank: priority,
        chara1: character1,
        chara2: character2,
        chara3: character3,
        ability: ability,
        tendency: tendency
      }
      return objAnalys;
    case 'A8':
      var group = '行動派 (A)';
      var view = '客観型 (偶数)';
      var priority = [null, '1. 行動', ' 2. 思考', '3. 感情'];
      var character1 = '負けず嫌いで, 粘り強い';
      var character2 = '気さくで親しみやすい';
      var character3 = '効率重視の頑張り屋';
      var ability = '臨機応変な判断力と行動力がある';
      var tendency = '計画的な行動が苦手な反面, <br>目の前のことに対する集中力に優れる';
      var objAnalys = {
        group: group,
        view: view,
        lank: priority,
        chara1: character1,
        chara2: character2,
        chara3: character3,
        ability: ability,
        tendency: tendency
      }
      return objAnalys;
    case 'M9':
      var group = '思考派 (M)';
      var view = '主観型 (奇数)';
      var priority = [null, '1. 思考', ' 2. 行動', '3. 感情'];
      var character1 = '独自のスタンスを貫く';
      var character2 = '一人の時間を大切にする';
      var character3 = '多面的な洞察力がある';
      var ability = '論理的思考に強い';
      var tendency = '人に合わせることが苦手な反面, <br>周りに流されず自分らしさを発揮する';
      var objAnalys = {
        group: group,
        view: view,
        lank: priority,
        chara1: character1,
        chara2: character2,
        chara3: character3,
        ability: ability,
        tendency: tendency
      }
      return objAnalys;
    case 'M10':
      var group = '思考派 (M)';
      var view = '客観型 (偶数)';
      var priority = [null, '1. 思考', ' 2. 行動', '3. 感情'];
      var character1 = '几帳面で, 堅実な性格';
      var character2 = '礼儀正しく, 善良さや公平さを尊重';
      var character3 = '知的好奇心が旺盛';
      var ability = '指導力と分析力に優れる';
      var tendency = '計画性が高く継続力のある反面, <br>環境の変化に慎重';
      var objAnalys = {
        group: group,
        view: view,
        lank: priority,
        chara1: character1,
        chara2: character2,
        chara3: character3,
        ability: ability,
        tendency: tendency
      }
      return objAnalys;
    case 'M11':
      var group = '思考派 (M)';
      var view = '主観型 (奇数)';
      var priority = [null, '1. 思考', ' 2. 感情', '3. 行動'];
      var character1 = '表裏がなく, 開放的な性格';
      var character2 = '社交的で, 初対面でも気さくに接する';
      var character3 = 'マイペースで, 自分の信念を貫く';
      var ability = '感覚的把握力に優れ, <br>物事を要領よく会得できる';
      var tendency = '全体を把握してから, じっくりと行動する';
      var objAnalys = {
        group: group,
        view: view,
        lank: priority,
        chara1: character1,
        chara2: character2,
        chara3: character3,
        ability: ability,
        tendency: tendency
      }
      return objAnalys;
    case 'M12':
      var group = '思考派 (M)';
      var view = '客観型 (偶数)';
      var priority = [null, '1. 思考', ' 2. 感情', '3. 行動'];
      var character1 = '自由奔放で, 型にはまらない性格';
      var character2 = 'あっさりとした態度の内に, <br>情に厚いところがある';
      var character3 = '気分屋で, 短期的な集中力が高い';
      var ability = '直観が鋭く, 感性的な閃きに長ける';
      var tendency = '合理的な思考と優れた感性を併せ持つため, 自己矛盾を覚えやすい';
      var objAnalys = {
        group: group,
        view: view,
        lank: priority,
        chara1: character1,
        chara2: character2,
        chara3: character3,
        ability: ability,
        tendency: tendency
      }
      return objAnalys;
  }
}

function getCelebrity(famType) {
  switch(famType) {
    case 'F1':
      var job = [null, '俳優', '俳優', '歌手', '首相', '日向坂', '俳優', '歌手', 'テニス'];
      var name = [null, '佐藤 健', '本田 翼', 'YUI', '安倍 晋三', '加藤 史帆', '岡田 准一', '安室 奈美恵', '松岡 修造'];
      var year = [null, 1989, 1992, 1987, 1954, 1998, 1980, 1977, 1967];
      var month = [null, 3, 6, 3, 9, 2, 11, 9, 11];
      var day = [null, 21, 27, 26, 21, 2, 18, 20, 6];
      var obj = {
        job: job,
        name: name,
        year: year,
        month: month,
        day: day
      }
      return obj;
    case 'F2':
      var job = [null, '俳優', '乃木坂', '乃木坂', '俳優', '俳優', '俳優', '芸人', '歌手'];
      var name = [null, '橋本 環奈', '齋藤 飛鳥', '深川 麻衣', '小松 奈々', '小栗 旬', '長澤 まさみ', '西野 亮廣', 'ジャスティン・ビーバー'];
      var year = [null, 1999, 1998, 1991, 1996, 1982, 1987, 1980, 1994];
      var month = [null, 2, 8, 3, 2, 12, 6, 7, 3];
      var day = [null, 3, 10, 29, 16, 26, 3, 3, 1];
      var obj = {
        job: job,
        name: name,
        year: year,
        month: month,
        day: day
      }
      return obj;
    case 'F3':
      var job = [null, '俳優', '俳優', '乃木坂', '乃木坂', '欅坂', '日向坂', '芸人', '芸人', '芸人', '歌手', '漫画家'];
      var name = [null, '綾瀬 はるか', '岡田 将生', '白石 麻衣', '大園 桃子', '平手 友梨奈', '高本 彩花', '中田 敦彦', '有田 哲平', '春日 俊彰', 'テイラー・スウィフト', '尾田 栄一郎'];
      var year = [null, 1985, 1989, 1992, 1999, 2001, 1998, 1982, 1971, 1979, 1989, 1975];
      var month = [null, 3, 8, 8, 9, 6, 11, 9, 2, 2, 12, 1];
      var day = [null, 24, 15, 20, 13, 25, 2, 27, 3, 9, 13, 1];
      var obj = {
        job: job,
        name: name,
        year: year,
        month: month,
        day: day
      }
      return obj;
    case 'F4':
      var job = [null, '俳優', '日向坂', '日向坂', '芸人', 'サッカー', 'テニス', '小説家'];
      var name = [null, '有村 架純', '影山 優佳', '齋藤 京子', '小藪 千富', 'リオネル・メッシ', 'ノバク・ジョコビッチ', '伊坂 幸太郎'];
      var year = [null, 1993, 2001, 1997, 1973, 1987, 1987, 1971];
      var month = [null, 2, 5, 9, 9, 6, 5, 5];
      var day = [null, 13, 8, 5, 11, 24, 22, 25];
      var obj = {
        job: job,
        name: name,
        year: year,
        month: month,
        day: day
      }
      return obj;
    case 'A5':
      var job = [null, '乃木坂', '乃木坂', '乃木坂', '欅坂', '日向坂', '日向坂', '日向坂', '俳優', '芸人', '俳優', 'メンタリスト', 'SMAP', 'YouTuber'];
      var name = [null, '生田 絵梨花', '西野 七瀬', '岩本 蓮花', '菅井 友香', '井口 眞緒', '宮田 愛萌', '高瀬 愛菜', '松坂 桃李', '千原ジュニア', '瑛太', 'DaiGo', '草彅 剛', 'HIKAKIN'];
      var year = [null, 1997, 1994, 2004, 1995, 1995, 1998, 1998, 1988, 1974, 1982, 1986, 1974, 1989];
      var month = [null, 1, 5, 2, 11, 11, 4, 9, 10, 3, 12, 11, 7, 4];
      var day = [null, 22, 25, 2, 29, 10, 28, 20, 17, 30, 13, 22, 9, 21];
      var obj = {
        job: job,
        name: name,
        year: year,
        month: month,
        day: day
      }
      return obj;
    case 'A6':
      var job = [null, '百獣の王', '俳優', '俳優', '歌手', '歌手', '俳優', '嵐', 'SMAP', '歌手', '日向坂', '日向坂', '乃木坂', '乃木坂'];
      var name = [null, '武井 壮', '阿部 寛', '菅田 将暉', 'あいみょん', '米津 玄師', '石原 さとみ', '櫻井 翔', '木村 拓哉', 'Taka', '東村 芽衣', '潮 紗理菜', '山下 美月', '秋元 真夏'];
      var year = [null, 1973, 1964, 1993, 1995, 1991, 1986, 1982, 1972, 1988, 1998, 1997, 1999, 1993];
      var month = [null, 5, 6, 2, 3, 3, 12, 1, 11, 4, 8, 12, 7, 8];
      var day = [null, 6, 22, 21, 6, 10, 24, 25, 13, 17, 23, 26, 26, 20];
      var obj = {
        job: job,
        name: name,
        year: year,
        month: month,
        day: day
      }
      return obj;
    case 'A7':
      var job = [null, 'SMAP', '俳優', '嵐', '日向坂', '日向坂', '乃木坂', '欅坂', '政治家', 'サッカー'];
      var name = [null, '中居 正広', '山田 孝之', '相葉 雅紀', '金村 美玖', '富田 鈴花', '生駒 里奈', '渡邉 理佐', '橋本 徹', 'C. ロナウド'];
      var year = [null, 1972, 1983, 1982, 2002, 2001, 1995, 1998, 1969, 1985];
      var month = [null, 8, 10, 12, 9, 1, 12, 7, 6, 2];
      var day = [null, 18, 20, 24, 10, 18, 29, 27, 29, 5];
      var obj = {
        job: job,
        name: name,
        year: year,
        month: month,
        day: day
      }
      return obj;
    case 'A8':
      var job = [null, '嵐', '俳優', '俳優', '俳優', '日向坂', '日向坂', '日向坂', '日向坂', '乃木坂', '芸人', '芸人', '芸人', 'SMAP', '政治家'];
      var name = [null, '大野 智', '新垣 結衣', '綾野 剛', '山下 智久', '小坂 奈緒', '佐々木 美玲', '松田 好花', '丹生 明里', '久保 史緒里', '内村 光良', 'ビートたけし', '有吉 弘之', '稲垣 吾郎', '麻生 太郎'];
      var year = [null, 1980, 1988, 1982, 1985, 2002, 1999, 1999, 2001, 2001, 1964, 1947, 1974, 1973, 1940];
      var month = [null, 11, 6, 1, 4, 9, 12, 4, 2, 7, 7, 1, 5, 12, 9];
      var day = [null, 26, 11, 26, 9, 7, 17, 27, 15, 14, 22, 18, 31, 8, 20];
      var obj = {
        job: job,
        name: name,
        year: year,
        month: month,
        day: day
      }
      return obj;
    case 'M9':
      var job = [null, '嵐', '日向坂', '日向坂', '日向坂', '乃木坂', '俳優', '芸人', 'サッカー', '俳優', 'SMAP', '俳優'];
      var name = [null, '二宮 和也', '濱岸 ひより', '河田 陽菜', '柿崎 芽実', '遠藤 さくら', '広瀬 すず', '上田 晋也', '本田 圭介', '山本 舞香', '香取 慎吾', 'ロバート・ダウニー・Jr'];
      var year = [null, 1983, 2002, 2001, 2001, 2001, 1998, 1970, 1986, 1997, 1977, 1965];
      var month = [null, 6, 9, 7, 12, 10, 6, 5, 6, 10, 1, 4];
      var day = [null, 17, 28, 23, 2, 3, 19, 7, 13, 13, 31, 4];
      var obj = {
        job: job,
        name: name,
        year: year,
        month: month,
        day: day
      }
      return obj;
    case 'M10':
      var job = [null, '歌手', '日向坂', '欅坂', '芸人', '芸人', '俳優', '実業家', '政治家'];
      var name = [null, '野田 洋次郎', '上村 ひなの', '長濱 ねる', '松本 人志', '浜田 雅功', '向井 理', '孫 正義', '小泉 純一郎'];
      var year = [null, 1985, 2004, 1998, 1963, 1963, 1982, 1957, 1942];
      var month = [null, 7, 4, 9, 9, 5, 2, 8, 1];
      var day = [null, 5, 12, 4, 8, 11, 7, 11, 8];
      var obj = {
        job: job,
        name: name,
        year: year,
        month: month,
        day: day
      }
      return obj;
    case 'M11':
      var job = [null, '俳優', '芸人', '芸人', '歌手', '乃木坂', '日向坂', '日向坂', 'テニス', '歌手', '歌手', '歌手', 'テニス'];
      var name = [null, '大泉 洋', '明石家さんま', 'タモリ', '星野 源', '与田 祐希', '佐々木 久美', '渡邉 美穂', '錦織 圭', '福山 雅治', '斉藤 和義', 'エド・シーラン', 'ロジャー・フェデラー'];
      var year = [null, 1973, 1955, 1945, 1981, 2000, 1996, 2000, 1989, 1969, 1966, 1991, 1981];
      var month = [null, 4, 7, 8, 1, 5, 1, 2, 12, 2, 6, 2, 8];
      var day = [null, 3, 1, 22, 28, 5, 22, 24, 29, 6, 22, 17, 8];
      var obj = {
        job: job,
        name: name,
        year: year,
        month: month,
        day: day
      }
      return obj;
    case 'M12':
      var job = [null, '野球', '嵐', '乃木坂', '乃木坂', '乃木坂', '芸人'];
      var name = [null, 'イチロー', '松本 潤', '星野 みなみ', '堀 未央奈', '若林 正恭'];
      var year = [null, 1973, 1983, 1998, 1996, 1978];
      var month = [null, 10, 8, 2, 10, 9];
      var day = [null, 22, 30, 6, 15, 20];
      var obj = {
        job: job,
        name: name,
        year: year,
        month: month,
        day: day
      }
      return obj;
  }
}

function getLegend(famType) {
  switch(famType) {
    case 'F1':
      var job = [null,  '実業家', '将軍', '執権', '作家'];
      var name = [null, '渋沢 栄一', '源 頼朝', '北条 時宗', '平塚らいてう'];
      var year = [null, 1840, 1147, 1251, 1886];
      var month = [null, 3, 5, 6, 2];
      var day = [null, 16, 9, 5, 10];
      var obj = {
        job: job,
        name: name,
        year: year,
        month: month,
        day: day
      }
      return obj;
    case 'F2':
      var job = [null, '指導者', '志士', '武将', '発明家', '画家'];
      var name = [null, '吉田 松陰', '高杉 晋作', '黒田 官兵衛', 'トーマス・エジソン', 'パブロ・ピカソ'];
      var year = [null, 1830, 1839, 1546, 1847, 1881];
      var month = [null, 9, 9, 12, 2, 10];
      var day = [null, 20, 27, 22, 11, 25];
      var obj = {
        job: job,
        name: name,
        year: year,
        month: month,
        day: day
      }
      return obj;
    case 'F3':
      var job = [null, '実業家', '武将', '政治家', '作家', '芸術家'];
      var name = [null, 'スティーブ・ジョブズ', '豊臣 秀吉', '伊藤 博文', '与謝野 晶子', 'レオナルド・ダ・ウィンチ'];
      var year = [null, 1955, 1537, 1841, 1878, 1452];
      var month = [null, 2, 3, 10, 12, 4];
      var day = [null, 24, 17, 16, 7, 15];
      var obj = {
        job: job,
        name: name,
        year: year,
        month: month,
        day: day
      }
      return obj;
    case 'F4':
      var job =[null, '武将'];
      var name = [null, '上杉 謙信'];
      var year = [null, 1530];
      var month = [null, 2];
      var day = [null, 18];
      var obj = {
        job: job,
        name: name,
        year: year,
        month: month,
        day: day
      }
      return obj;
    case 'A5':
      var job = [null, '武将'];
      var name = [null, '武田 信玄'];
      var year = [null, 1521];
      var month = [null, 12];
      var day = [null, 1];
      var obj = {
        job: job,
        name: name,
        year: year,
        month: month,
        day: day
      }
      return obj;
    case 'A6':
      var job = [null, '教育者', '学者', '画家', '画家', '芸術家'];
      var name = [null, '福沢 諭吉', 'アルベルト・アインシュタイン', 'フィンセント・ファン・ゴッホ', 'ポール・ゴーギャン', 'ミケランジェロ'];
      var year = [null, 1835, 1879, 1853, 1848, 1475];
      var month = [null, 1, 3, 3, 6, 3];
      var day = [null, 10, 14, 30, 7, 6];
      var obj = {
        job: job,
        name: name,
        year: year,
        month: month,
        day: day
      }
      return obj;
    case 'A7':
      var job = [null, '志士', '将軍', '幕臣', '新選組', '医師', '学者', '革命家'];
      var name = [null, '坂本 竜馬', '徳川 家康', '勝 海舟', '近藤 勇', '野口 英世', 'アイザック・ニュートン', 'ナポレオン・ボナパルト'];
      var year = [null, 1836, 1543, 1823, 1834, 1876, 1643, 1769];
      var month = [null, 1, 1, 3, 11, 11, 1, 8];
      var day = [null, 3, 31, 12, 9, 9, 4, 15];
      var obj = {
        job: job,
        name: name,
        year: year,
        month: month,
        day: day
      }
      return obj;
    case 'A8':
      var job = [null, '武士', '作家', '発明家', '指導者', '武将'];
      var name = [null, '西郷 隆盛', '樋口 一葉', 'グラハム・ベル', 'マハトマ・ガンディー', '織田 信長'];
      var year = [null, 1828, 1872, 1847, 1869, 1534];
      var month = [null, 1, 5, 3, 10, 6];
      var day = [null, 23, 2, 3, 2, 23];
      var obj = {
        job: job,
        name: name,
        year: year,
        month: month,
        day: day
      }
      return obj;
    case 'M9':
      var job = [null, '武将', '発明家', '福祉活動家'];
      var name = [null, '平 清盛', 'アルフレッド・ノーベル', 'ヘレン・ケラー'];
      var year = [null, 1118, 1833, 1880];
      var month = [null, 2, 10, 6];
      var day = [null, 10, 21, 27];
      var obj = {
        job: job,
        name: name,
        year: year,
        month: month,
        day: day
      }
      return obj;
    case 'M10':
      var job = [null, '摂政'];
      var name = [null, '聖徳 太子'];
      var year = [null, 574];
      var month = [null, 2];
      var day = [null, 7];
      var obj = {
        job: job,
        name: name,
        year: year,
        month: month,
        day: day
      }
      return obj;
    case 'M11':
      var job = [null, '実業家', '新選組', '学者', '学者'];
      var name = [null, 'ウォルト・ディズニー', '土方 歳三', 'ガリレオ・ガリレイ', 'コペルニクス'];
      var year = [null, 1901, 1835, 1564, 1910, 1473];
      var month = [null, 12, 5, 2, 8, 2];
      var day = [null, 5, 31, 15, 26, 19];
      var obj = {
        job: job,
        name: name,
        year: year,
        month: month,
        day: day
      }
      return obj;
    case 'M12':
      var job = [null, '武将', '革命家', '学者'];
      var name = [null, '伊達 政宗', 'チェ・ゲバラ', 'ジャン・アンリ・ファーブル'];
      var year = [null, 1567, 1928, 1823];
      var month = [null, 9, 6, 12];
      var day = [null, 5, 14, 21];
      var obj = {
        job: job,
        name: name,
        year: year,
        month: month,
        day: day
      }
      return obj;
  }
}

function reference(id){
  switch(id){
    case 2:
    case 17:
    case 23:
    case 56:
      return 'F1';
    case 5:
    case 8:
    case 11:
    case 14:
    case 20:
    case 59:
      return 'F2';
    case 29:
    case 35:
    case 38:
    case 41:
    case 44:
    case 50:
      return 'F3';
    case 26:
    case 32:
    case 47:
    case 53:
      return 'F4';
    case 27:
    case 33:
    case 46:
    case 52:
      return 'A5';
    case 1:
    case 18:
    case 24:
    case 30:
    case 49:
    case 55:
      return 'A6';
    case 3:
    case 16:
    case 22:
    case 57:
      return 'A7';
    case 0:
    case 19:
    case 25:
    case 31:
    case 48:
    case 54:
      return 'A8';
    case 4:
    case 9:
    case 10:
    case 15:
    case 21:
    case 58:
      return 'M9';
    case 36:
    case 37:
    case 42:
    case 43:
      return 'M10';
    case 28:
    case 34:
    case 39:
    case 40:
    case 45:
    case 51:
      return 'M11';
    case 6:
    case 7:
    case 12:
    case 13:
      return 'M12';
  }
}
