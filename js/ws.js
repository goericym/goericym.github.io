//JQuery
//The hash (#) specifies to select elements by their ID's 
//The dot (.) specifies to select elements by their classname
window.addEventListener("load", init, false);//載入時會呼叫init的function
// Globa變數都放在這
var AutoSendFlag = 0;
var ManuallySendFlag = 0;
var wsi;
var GlobalTLResult = 0;
var reloadCount = 0;
var chekcw = false;
var bkeepConn = true;//一問一答
var inputtext = '';
var myTimer;
function wsiMsg(param) {
  setTimeout(function () { $('#wsimsg').html(param); }, 300);
}
function init() {
  wsi = new waitWSinit();
  wsi.dlinit('<div id="wsimsg"> <div>');
  wsi.open();
  // setTimeout(function () { wsiMsg('haha'); }, 2000);

  //step1 :先做browser檢查
  WebSocketCheck(WSCheckPass, WSCheckFail)
}

function WSCheckPass() {
  //step2 :開啟WS
  doConnect();

  // LoopOpenWS();
  // myTimerOpenWS = setInterval(LoopOpenWS, 3000);
  // //0.5秒後起動,2秒送一次資料
  // setTimeout(function () {
  //   myTimer = setInterval(AutoSend, 2000)
  // }, 500);
}

function WSCheckFail() {

  wsiMsg('Your browser does not support ws');

}
function loopbefore() {
  reloadCount++;
  // console.log(reloadCount)
  if (reloadCount > 1) {
    doDisconnect();
    doConnect();
  }
  // if (reloadCount > 2) {
  //   wsi.open();
  // }
  if (reloadCount > 10) {
    location.reload();
    reloadCount = 0
  }
  console.log('autosend:ManuallySendFlag=' + ManuallySendFlag + ':AutoSendFlag=' + AutoSendFlag + ':bkeepConn=' + bkeepConn)
}

function CheckVersion(param, callback_pass, callback_fail) {

  if (param === true) {
    (callback_pass && typeof (callback_pass) === "function") && callback_pass();
  } else {
    (callback_fail && typeof (callback_fail) === "function") && callback_fail();
  }
}
function CV_pass() {
  //step4 :檢查檢查client狀態狀態
  inputtext = '{"CheckComStatus":""}';
  doSend(inputtext);
}
function CV_fail() {
  wsiMsg('Your Version too old ! please download last version <A HREF="#">Click to Downoad</A>');

}

function CheckComStatus(param, callback_pass, callback_fail) {


  if (param === true) {
    (callback_pass && typeof (callback_pass) === "function") && callback_pass();
  } else {
    (callback_fail && typeof (callback_fail) === "function") && callback_fail();
  }
}
function CCS_pass() {
  wsi.close();
  //step5 :持續連線
  myTimer = setInterval(AutoSend, 2000)
}
function CCS_fail() {

  wsiMsg('Your dongle 沒有接好 ! please check connected');

  //回到step4
  CV_pass();

}



function AutoSend() {

  loopbefore();

  if (bkeepConn) {
    if (AutoSendFlag == 0 && ManuallySendFlag == 0) {
      AutoSendFlag = 1;
    }

    inputtext = '{"KeepConn":"None"}';
    doSend(inputtext);
  } else {
    reloadCount = 0;
  }
}
function ManuallySend() {
  ManuallySendFlag = 1;
  inputtext = '{"Read":"None"}';
  doSend(inputtext);
}
function ManuallySendCmd(params) {
  ManuallySendFlag = 1;
  inputtext = params;
  doSend(inputtext);
}
function ManuallySendProgressBar(params) {
  ManuallySendFlag = 1;
  bkeepConn = false//一問多答開始
  inputtext = params;
  doSend(inputtext);
}
function doConnect() {
  try {
    var n = new Date().toLocaleString();
    console.log(n)
    wsiMsg('Please Waiting... <a hef="#">download</a> <a hef="#">FAQ</a>>');
    url = "ws://localhost:58000/";
    websocket = new WebSocket(url);
    websocket.onopen = function (evt) { WSOpen(evt) };
    websocket.onclose = function (evt) { WSClose(evt) };
    websocket.onmessage = function (evt) { WSMessage(evt) };
    websocket.onerror = function (evt) { WSError(evt) };
  } catch (error) {
    console.log(error);
    var n = new Date().toLocaleString();
    console.log(n)
    setTimeout(doConnect, 1000);
  }

}

function WSOpen(evt) {


  console.log('connected')
  var a = new Date().toLocaleString();
  console.log(a)
  wsiMsg('check client 版本!');
  //step3 :檢查版本
  inputtext = '{"CheckVersion":""}';
  doSend(inputtext);

  // myTimer = setInterval(LoopCV, 2000)
}

function WSClose(evt) {
  console.log('disconnected')
  doConnect();
  // writeToScreen("disconnected\n");
  // clearInterval(myTimerOpenWS);
  // clearInterval(myTimer);
  // myTimerOpenWS = setInterval(LoopOpenWS, 3000);
}

function doCheckVer(param) {
  var cvstatus = false;
  var jsonObj = JSON.parse(param);
  console.log(jsonObj.CheckVersion)
  if (jsonObj.CheckVersion === 0.1) {
    cvstatus = true;
  }
  CheckVersion(cvstatus, CV_pass, CV_fail);
}
function doCheckStatus(param) {
  var CCStatus = false;
  var jsonObj = JSON.parse(param);
  console.log(jsonObj.CheckComStatus)
  if (jsonObj.CheckComStatus === 'Pass') {
    CCStatus = true;
  }
  CheckComStatus(CCStatus, CCS_pass, CCS_fail);
  bkeepConn = true;
}
function WSMessage(evt) {
  reloadCount = 0;

  if (inputtext.startsWith('{"CheckVersion":"')) {
    doCheckVer(evt.data);
    return;
  }

  if (inputtext.startsWith('{"CheckComStatus":"')) {
    doCheckStatus(evt.data);
    return;
  }

  console.log(evt.data)
  // callname(evt.data)
  // allopen();
  if (AutoSendFlag == 0 && ManuallySendFlag == 1) {
    ManuallySendFlag = 0;
  }

  AutoSendFlag = 0;
  // console.log('WSMessage:ManuallySendFlag=' + ManuallySendFlag + ':AutoSendFlag=' + AutoSendFlag)
  //  $('#btn-test').html('balabala');

  if (inputtext == '{"OnlyRead":"Display"}') {
    JsonParser_Display(evt.data)
  }
  if (inputtext === '{"ProgressBar":"None"}') {
    // console.log(evt.data)
    if (evt.data === '{"ProgressBar":"Finish"}') {
      bkeepConn = true//一問多答結束
    }
  }
  if (evt.data === '{"WriteCustomize":"Finish"}') {
    wsi.close();
  }
  if (inputtext === '{"TestHistory":"None"}') {
    JsonParser_TestHistory(evt.data)
  }
  // writeToScreen("response: " + evt.data + '\n');
  if (inputtext.startsWith('{"DownloadFW":"')) {
    var jsonObj = JSON.parse(evt.data);
    console.log(jsonObj);

    var valeur = jsonObj.DownloadFWProgressBar;
    $('#bar1').css('width', valeur + '%').attr('aria-valuenow', valeur);
    if (evt.data === '{"DownloadFWProgressBar":"Finish"}') {
      bkeepConn = true//一問多答結束
      $('#GFW').attr("disabled", false);
    }
  }

}

function WSError(evt) {
  // writeToScreen('error: ' + evt.data + '\n');

  websocket.close();

  // document.myform.connectButton.disabled = false;
  // document.myform.disconnectButton.disabled = true;

}

function doSend(message) {

  // writeToScreen("sent: " + message + '\n');
  console.log("sent: " + message + '\n');
  try {
    websocket.send(message);
  } catch (error) {
    console.log('doSend Error : ' + error)
  }

}




function doDisconnect() {
		websocket.close();
}

function WebSocketCheck(callback_pass, callback_fail) {
  wsiMsg('Check browser support ws');
  if ("WebSocket" in window) {
    (callback_pass && typeof (callback_pass) === "function") && callback_pass();
  }
  else {
    (callback_fail && typeof (callback_fail) === "function") && callback_fail();
  }
}

function allclose() {
  var inputs = document.getElementsByTagName("INPUT");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].disabled = true;
  }
}
function allopen() {
  var inputs = document.getElementsByTagName("INPUT");
  for (var i = 0; i < inputs.length; i++) {

    inputs[i].disabled = false;

  }
}
function JsonParser_TestHistory(params) {
  var jsonObj = JSON.parse(params);
  //  console.log(jsonObj)
  Mapping(jsonObj);
}
function JsonParser_Display(params) {
  var jsonObj = JSON.parse(params);
  // console.log(jsonObj);
  // console.log(jsonObj[0]);
  // console.log(jsonObj[1].ERR_REC_MISC);
  // console.log(jsonObj[1].PNL_MAN_DIST);
  // console.log(jsonObj[1].PRD_LMOD_DATE);
  // console.log(timeConverter(jsonObj[1].PRD_LMOD_DATE));
  Mapping(jsonObj[1]);

}
function Mapping(params) {
  var sKey, sValue;
  for (sKey in params) {
    sValue = params[sKey];
    // console.log("name : " + sKey + " : value : " + sValue) ;
    try {
      // document.getElementById(sKey).innerHTML=sValue;
      // var id='#'+sKey;//只有第一個抓到的ID
      var id = '[id=' + sKey + ']';//所有ID都會被更新
      if (sKey === 'PRD_LMOD_DATE') {
        sValue = timeConverter(sValue)
      }
      $(id).html(sValue);
      $(id).val(sValue);//set input value
      var sname = 'input[name=' + sKey + ']';
      $(sname).val(sValue);
      //a href
      //$(id).attr('href','../../'+ sValue)
      if (inputtext === '{"TestHistory":"None"}') {
        $(id).attr('onclick', "PDFFile('" + sValue + "')");
      }


    } catch (error) {

      console.log(sKey + ' ' + error);

    }

  }
}