var data;
var id;
var maxId = 50;
var dataAll = '';
var type;
var datalist;
var str;
var strAll;

$('.btnSave').click(function(){

  datalist = {
    name: $("#inputName").val(),
    type: $('#inputType').val()
  }

  if(datalist.name == '') {
    alert('名前を入力してください');
  } else if(datalist.type == '') {
    alert('タイプを入力してください');
  } else {
    id = prompt('1～50のIDでデータを管理します\nIDを入力して下さい');
    datalist = JSON.stringify(datalist);
    localStorage.setItem('key' + id , datalist);
  }
});

$('.btnRead').click(function(){
  id = $('#inputId').val();
  if(id == ''){
    alert('読みだすデータのIDを選択して下さい');
  }
  datalist = JSON.parse(localStorage.getItem('key' + id) );
  $("#text2").text('名前:' +  datalist.name + '  タイプ:' +  datalist.type);
});

$('.btnRemove').click(function(){
  id = $('#inputId').val();
  if(id == ''){
    alert('削除するデータのIDを選択して下さい');
  }
  localStorage.removeItem('key' + id);
  data = localStorage.getItem('key' + id) ;
  $("#text2").text(data);
});

$('.btnReadAll').click(function(){
  strAll = '';
  for(var i= 1; i <= maxId ; i++){
    id = i;
    datalist = JSON.parse(localStorage.getItem('key' + id) );

    if(datalist == null){
      datalist = '';
    } else {
    str = 'ID' + i + ': ' +  datalist.name +
     '「' + datalist.type + '」' + ' , ';
    strAll = strAll + str;
    }
  }
  $("#text3").text(strAll);
});

$('.btnClear').click(function(){
  var isYes = confirm('全てのデータを削除してよろしいですか？');
  if(isYes){
  localStorage.clear();
  }
});
