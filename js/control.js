function tshowDiv(id) {
    // If your value is `Select`, then hide your element
    // console.log(id);
    if (sw == 'off') {
        document.getElementById(id).style.display = "none";
    }
    else {
        document.getElementById(id).style.display = "block";
    }
}

var ID_arr = ['Info_tabs', 'SWUpgrade', 'Cust_tabs', 'VehicleTest', 'TestRecode', 'Print', 'SWUpgradeMsgBox'];
function showDiv(idname) {
    for (i = 0; i < ID_arr.length; i++) {
        var value = ID_arr[i];
        if (idname == value) {
            document.getElementById(value).style.display = "block";
        }
        else {
            document.getElementById(value).style.display = "none";
        }
    }
}


//拉條輸入框事件
$(document).ready(function () {
    $("[type=number]").on('keyup', function () {
        var newv = $(this).val();
        //console.log(newv);
        var id = $(this).attr("id");
        if (!$.isNumeric(newv)) {
            // console.log('eeeee');
            $(this).val(0);
            newv = 0;
        }
        $('#' + id + '_Slider').val(newv);
    });
});
//拉條事件
$(document).ready(function () {
    $("[type=range]").on('change mousemove', function () {
        var newv = $(this).val();
        var Name = $(this).attr("name");
        // console.log(Name);
        $(this).next().text(newv);
        $('#' + Name).val(newv);
    });
});



function Delay(millisecondi) {
    var now = new Date();
    var exitTime = now.getTime() + millisecondi;

    while (true) {
        now = new Date();

        if (now.getTime() > exitTime) return;
    }
}


function Wait(millisecondi) {
    var now = new Date();
    var exitTime = now.getTime() + millisecondi;
    var refreshIntervalId = setInterval(function () {
        todo();
    }, 100);

    var todo = function () {
        now = new Date();
        // console.log(now.getTime() + ':' + exitTime);
        if (now.getTime() > exitTime) {
            // console.log(now);
            clearInterval(refreshIntervalId);
            $('#TestDisplay').html('Testing-100%');
            chekcw = true;
        }
    };
}



function VTD_P1_OK() {
    DLbtnChk.close()
    DLbtnChk.DLinit('LCD Segment Scan Correct?');
    DLbtnChk.open()
    DLbtnChk.btnOKAction(VTD_P2_OK);
    DLbtnChk.btnNGAction(VTD_P2_NG);
    DLbtnChk.btnDisable()
    setTimeout(function () {
        DLbtnChk.btbEnable()
    }, 2000);
    $('#TestDisplay').html('Testing');
    ManuallySendCmd('{"VehicleTest":"Display_Part2"}');
}
function VTD_P1_NG() {
    $('#TestDisplay').html('Fail');
    ManuallySendCmd('{"VehicleTest":"Display_Part1_NG"}');
    DLbtnChk.close()
}
function VTD_P2_OK() {
    DLbtnChk.close()
    DLbtn.DLinit('<table class="table table-striped"><tr><td>Down</td><td id="tid0">Please Press</td></tr><tr><td>Up</td><td id="tid1">Please Press</td></tr><tr><td>Light</td><td id="tid2">Please Press</td></tr><tr><td>Info</td><td id="tid3">Please Press</td></tr></table>');
    DLbtn.open()
    DLbtn.btnAction(VTD_P3_OK);
    DLbtn.btnDisable();
    DLbtn.btnLabel('OK(45)');
    ManuallySendCmd('{"VehicleTest":"Display_Part3"}');

}
function VTD_P3_OK() {
    DLbtn.close()
}
function Display_Part3Check(param) {
    var jsonObj = JSON.parse(param);
    var i = jsonObj.VTD_Button
    if (typeof i != 'undefined') {
        $('#tid' + i).html('Detected');
    }
    if (typeof jsonObj.VTD_Timer != 'undefined') {
        var countdown = 45 - jsonObj.VTD_Timer
        DLbtn.btnLabel('OK(' + countdown + ')')
    }

    var res = jsonObj.VTD_Result
    if (res === 'Pass' || res === 'Fail') {
        DLbtn.btbEnable();
        DLbtn.btnLabel('OK')
        myTimer = setInterval(AutoSend, 2000)
        $('#TestDisplay').html(res);
    }


}
function VTD_P2_NG() {
    $('#TestDisplay').html('Fail');
    ManuallySendCmd('{"VehicleTest":"Display_Part2_NG"}');
    DLbtnChk.close()
}
function TestDisplay() {
    DLbtnChk.DLinit('LCD Panel All ON/OFF Correct?');
    DLbtnChk.open()
    DLbtnChk.btnOKAction(VTD_P1_OK);
    DLbtnChk.btnNGAction(VTD_P1_NG);
    DLbtnChk.btnDisable()
    setTimeout(function () {
        DLbtnChk.btbEnable()
    }, 2000);
    $('#TestDisplay').html('Testing');
    ManuallySendCmd('{"VehicleTest":"Display_Part1"}');
}

function TestDisplay1End(param) {
    DLbtnChk.close()
    var jsonObj = JSON.parse(param);
    $('#TestDisplay').html(jsonObj.VTD_LCD_PNL_On);
}
function TestDisplay2End(param) {
    DLbtnChk.close()
    var jsonObj = JSON.parse(param);
    $('#TestDisplay').html(jsonObj.VTD_LCD_PNL_Off);
}
function TestDisplay2() {
    ManuallySendCmd('{"VehicleTest":"Display2"}');
}

function TestDisplay3() {
    ManuallySendCmd('{"VehicleTest":"Display"}');
}
function TestLight(param) {
    if (typeof param != 'undefined') {
        // $("#test2").attr("disabled", true);
        TLCount = 0;
        DLmsg.DLinit('Test Light start');
        DLmsg.open();
        $('#TestLight').html('testing');
    }
    ManuallySendCmd('{"VehicleTest":"Light"}');
}


function TestDriver() {
    DLmsg.DLinit('Test Driver');
    DLmsg.open()
    $('#TestDriver').html('Testing');
    ManuallySendCmd('{"VehicleTest":"Driver"}');

}
function TestDriverEnd(param) {
    DLmsg.close()
    var jsonObj = JSON.parse(param);
    $('#TestDriver').html(jsonObj.VehicleTestDriver);
}
function TestCadenceSensor() {
    DLbtn.DLinit('VehicleTest TestCadenceSensor');
    DLbtn.open();
    DLbtn.btnDisable();
    DLbtn.btnAction(btnClose);
    DLbtn.btnLabel('OK(30)');
    $('#TestCadenceSensor').html('Testing');
    ManuallySendCmd('{"VehicleTest":"CadenceSensor"}');

}
function CadenceSensorCheck(param) {
    var jsonObj = JSON.parse(param);
    if (typeof jsonObj.RPM != 'undefined') {
        DLbtn.setMsg('Please Roll the Crank ! RPM :' + jsonObj.RPM);
        var countdown = 30 - jsonObj.Count
        DLbtn.btnLabel('OK(' + countdown + ')')
    }

    if (jsonObj.TestMaxRPM === 'Pass' || jsonObj.TestMaxRPM === 'Fail') {
        myTimer = setInterval(AutoSend, 2000);
        DLbtn.btbEnable();
        $('#TestCadenceSensor').html(jsonObj.TestMaxRPM);
        DLbtn.btnLabel('OK')
    }


}
function btnClose() {
    DLbtn.close();
}

function TestSpeedSensor() {

    DLmsg.DLinit('VehicleTest TestSpeedSensor');
    DLmsg.open()
    $('#TestSpeedSensor').html('Testing');
    ManuallySendCmd('{"VehicleTest":"SpeedSensor"}');

}
function TestSpeedSensorEnd(param) {
    DLmsg.close()
    var jsonObj = JSON.parse(param);
    $('#TestSpeedSensor').html(jsonObj.VehicleTestSpeedSensor);
}
function TestMotor() {
    DLmsg.DLinit('VehicleTest Motor');
    DLmsg.open()
    $('#TestMotor').html('Testing');
    ManuallySendCmd('{"VehicleTest":"Motor"}');

}
function TestMotorEnd(param) {
    DLmsg.close()
    var jsonObj = JSON.parse(param);
    $('#TestMotor').html(jsonObj.VehicleTestMotor);
}
function TestBattery() {
    DLmsg.DLinit('VehicleTest Battery');
    DLmsg.open()
    $('#TestBattery').html('Testing');
    ManuallySendCmd('{"VehicleTest":"Battery"}');
}
function TestBatteryEnd(param) {
    DLmsg.close()
    var jsonObj = JSON.parse(param);
    $('#TestBattery').html(jsonObj.VehicleTestBattery);
}
function PREFERENCE_Mode(param) {

    var arr = ['CITY', 'MCLIMBING', 'TREKKING']

    for (i = 0; i < arr.length; i++) {
        var S = 'Images/Preference_' + arr[i] + '_S.png'
        var I = 'Images/Preference_' + arr[i] + '_I.png'
        if (param === arr[i]) {
            if ($('#Preference' + param).attr('src') === S) {
                $('#Preference' + param).attr('src', I);
            }
            else {
                $('#Preference' + param).attr('src', S);
            }
        } else {
            $('#Preference' + arr[i]).attr('src', I);
        }
    }

}
function CustomizeData() {

    var jdata = {
        'm_BikeID': $('input[id=USER_BIKE_ID]').val(),
        "m_DealerName": $('input[id=DELR_NAME]').val(),
        "m_DealerTel": $('input[id=DELR_TEL_NUM]').val(),
        "m_cb_Disable_IsChecked": $('#PNL_MAN_DIST_SW').is(":checked"),
        "m_LastMaintenanceODO": parseFloat($('input[id=PNL_LMAN_DIST]').val()),
        "m_MaintenanceODO": parseFloat($('input[id=PNL_MAN_DIST]').val()),
        "m_AutoSleepTime": parseFloat($('input[id=PNL_ASLP_TIME]').val()),
        "m_WheelDiameter": parseFloat($('input[id=MISC_WEL_DIAM]').val()),
    }
    var jstr = JSON.stringify(jdata)

    var jstrcmd = '{"WriteCustomize" : ' + jstr + '}'

    // console.log(aa)
    // console.log(jjj)
    return jstrcmd;
}
function CustomizeApply() {
    var jstr = CustomizeData();
    // console.log(jstr);
    ManuallySendCmd(jstr);

    DLmsg.setMsg('Write please wait');
    DLmsg.open();
}
function jsondata(params) {
    var jdata = {
        'data1': "1234",
        "data2": 5678,
        "data3": params
    }
    jdata.data1 = "1122"
    return JSON.stringify(jdata);
    //length
}
function PDFFile(params) {

    var el = ' <object id="printObj" class="col-sm-9" height="950" data="test.pdf" type="application/pdf">'
    if (params !== 'Print') {
        el = ' <object id="printObj" class="col-sm-9" height="950" data="ErrorCodeInstruction/' + params + '" type="application/pdf">'
    }
    $('#Print').html(el)
    showDiv('Print');
}

function setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + 18000);//exDays * 24 * 60 * 60 * 1000
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function PrintSet(params) {
    var v1 = $('#PRD_LMOD_DATE').val();
    console.log(v1)
    setCookie("value1", v1)
    window.open('print.html', '_blank')
}
function PrintLoad() {
    var v1 = getCookie("value1");
    console.log(v1)
    $('#id1').html(v1);
}

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month_s = months[a.getMonth()];
    var month = a.getMonth() + 1;
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec;
    return time;
}
var fw_str = '';
function Upgrade_FW(param) {
    fw_str = param;

    var valeur = 0;

    $('[id=bar_' + fw_str + '_FW]').hide();
    $('#btn_' + fw_str + '_FW').attr("disabled", true);
    $('[id=bar_' + fw_str + '_FW]').css('width', valeur + '%').attr('aria-valuenow', valeur);
    var fwcmd = ''
    if (fw_str === 'Console') {
        fwcmd = '{"UpgradeFW":"Display;http://goericym.github.io/fw/Hippo_Console_20160606_APP.txt;002"}'
    } else if (fw_str === 'LCD_Display') {
        fwcmd = '{"UpgradeFW":"Panel;http://goericym.github.io/fw/Hippo_Display_20160427_APP.txt;002"}'
    } else if (fw_str === 'Driver') {
        fwcmd = '{"UpgradeFW":"Driver;http://goericym.github.io/fw/Hippo_Driver_20160607_ETH_1607_APP.txt;002"}'
    }
    console.log(fwcmd)
    setTimeout(function () {
        $('[id=bar_' + fw_str + '_FW]').show();
        // ManuallySendProgressBar('{"DownloadFW":"http://goericym.github.io/Display_20160426.txt;Display_FW.txt"}');
        ManuallySendProgressBar(fwcmd);
    }, 300);

}
function UpgradeFWCheck(param) {
    var jsonObj = JSON.parse(param);
    console.log(jsonObj);

    var valeur = jsonObj.UpgradeFW;
    console.log('v:' + valeur)

    $('[id=bar_' + fw_str + '_FW]').css('width', valeur + '%').attr('aria-valuenow', valeur);
    $('[id=bar_Upgrade]').css('width', valeur + '%').attr('aria-valuenow', valeur);
    if (param === '{"UpgradeFW":"Finish"}') {
        //一問多答結束
        myTimer = setInterval(AutoSend, 2000)
        $('#btn_' + fw_str + '_FW').attr("disabled", false);
        DLbtn.btbEnable();
        fw_str = '';
    }
}
function UpgradeMsg() {


    var MsgHtml = $('#SWUpgradeMsgBox').html()
    var Msg = $('<div></div>').append(MsgHtml)

    console.log(Msg);
    DLbtn.DLinit('init');
    DLbtn.setMsg(Msg);
    DLbtn.btnOnHide(bar_Upgrade_Show(0));
    DLbtn.open();
    DLbtn.btnAction(btnClose);

    DLbtn.btnDisable();



}

function bar_Upgrade_Show(param) {
    var valeur = param;
    console.log(param);
    $('[id=bar_Upgrade]').hide()
    $('[id=bar_Upgrade]').css('width', valeur + '%').attr('aria-valuenow', valeur);
    setTimeout(function () {
        $('[id=bar_Upgrade]').show()
        $('[id=bar_Upgrade]').css('width', valeur + '%').attr('aria-valuenow', valeur);
    }, 500);

}

function DoInfo() {
    DLmsg.DLinit('');
    DLmsg.setMsg('Get information please wait');
    DLmsg.open();
    ManuallySendCmd('{"Read":"Display"}');

}

function DoTestRecode() {
    DLmsg.DLinit('');
    DLmsg.setMsg('Get TestHistory please wait');
    DLmsg.open();
    ManuallySendCmd('{"TestHistory":"None"}');
}

function DoCust() {
    var isReadDisplay = getCookie('ckIsReadDP');
    if (isReadDisplay !== 'True') {
        DLmsg.DLinit('');
        DLmsg.setMsg('Get Customization please wait');
        DLmsg.open();
        ManuallySendCmd('{"Read":"Display"}');
    }

}

function DoPNL_MAN_DIST() {
    var isSelected = $('#PNL_MAN_DIST_SW').is(":checked");
    $('#PNL_MAN_DIST_Slider').attr("disabled", isSelected)
    $('#PNL_MAN_DIST').attr("disabled", isSelected)

}
function TestBT() {
    DLmsg.DLinit('');
    DLmsg.setMsg('test bt');
    DLmsg.open();
    $('#TestBT').html('Testing');
    ManuallySendCmd('{"VehicleTest":"BT"}');
}
function TestBTEnd(param) {
    DLmsg.close()
    var jsonObj = JSON.parse(param);
    $('#TestBT').html(jsonObj.VehicleTestBT);
}
// $('#TRTestBT').after('<tr></tr>').hide();


function testbtn() {
    // ManuallySendCmd('{"GetFWVer":""}');
    // ManuallySendCmd('{"UpgradeFW":"Display;Display_20160426.txt;566"}');
    //$get 可以改成其他網頁路徑API(只要是吐出json 格式就好)
    // $.get("../../fwver.txt", function (data) {
    //     var jsonObj = JSON.parse(data);
    //     console.log(jsonObj)
    //     alert(jsonObj.ConsoleVer);
    // });
    var MsgHtml = $('#SWUpgradeMsgBox').html()
    var Msg = $('<div></div>').append(MsgHtml)


    DLbtn.DLinit('init');
    DLbtn.setMsg(Msg);
    DLbtn.btnOnShow(bar_Upgrade_Show(0));
    DLbtn.btnOnHide(bar_Upgrade_Show(0));
    DLbtn.open();
    DLbtn.btnAction(btnClose);



}

function testbtn1() {
    var MsgHtml = $('#SWUpgradeMsgBox').html()
    var Msg = $('<div></div>').append(MsgHtml)


    DLbtn.DLinit('init');
    DLbtn.setMsg(Msg);
    DLbtn.btnOnShow(bar_Upgrade_Show(50));
    DLbtn.btnOnHide(bar_Upgrade_Show(0));
    DLbtn.open();
    DLbtn.btnAction(btnClose);

}

function DoCheckFW() {
    //1.先去抓clinet的版本
    ManuallySendCmd('{"GetFWVer":""}');
}
function DoCheckFWPart1(param) {
    var client_jsonObj = JSON.parse(param);
    //$get 可以改成其他網頁路徑API(只要是吐出json 格式就好)
    $.get("../../fwver.txt", function (data) {
        var server_jsonObj = JSON.parse(data);
        console.log(server_jsonObj.ConsoleVer);
        console.log(client_jsonObj.ConsoleVer);
        var s1 = server_jsonObj.ConsoleVer
        var c1 = client_jsonObj.ConsoleVer
        if (s1 > c1) {
            // alert('gggg')
            $('#id_Console_FW').show();
        }


    });

}
// $('#id_Console_FW').hide();
// $('#id_Display_FW').hide();
// $('#id_Driver_FW').hide();