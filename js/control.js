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

var ID_arr = ['Info_tabs', 'SWUpgrade', 'Cust_tabs', 'VehicleTest', 'TestRecode', 'Print'];
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



function TestDisplay() {
    $('#TestDisplay').html('Testing-40%');

    ManuallySendCmd('{"VehicleTest":"Display"}');

    var TD1 = new DialogClass();
    TD1.html = 'LCD Panel All ON/OFF Corrnet?';
    TD1.title = 'Display Test (1/3)';
    TD1.start(TestDisplay2, '#TestDisplay', 'Testing-60%');


}
function TestDisplay2() {
    ManuallySend();
    var TD2 = new DialogClass();
    TD2.html = 'LCD Segment Scan Corrnet?';
    TD2.title = 'Display Test (2/3)';
    TD2.start(TestDisplay3, '#TestDisplay', 'Testing-80%');


}
function TestDisplay3() {
    ManuallySend();
    // html = '<button id="btn-test" class="btn btn-success">Revert button status right now.</button></div>';
    html = '<span id="btn-test">Revert button status right now.</span></div>';
    var TD3 = new DialogEspeciallyClass();
    TD3.html = '<span id="btn-test">Revert button status right now.</span></div>';
    TD3.title = 'Display Test (3/3)';

    chekcw = false;
    //Wait(1000);//test do something
    TD3.start();

}
function TestLight(param) {
    if (typeof param != 'undefined') {
        // $("#test2").attr("disabled", true);
        TLCount = 0;
        DLmsg.setMsg('Test Light start');
        DLmsg.open();
        $('#TestLight').html('testing');
    }
    ManuallySendCmd('{"VehicleTest":"Light"}');
}


function showStatus_fun(param1, param2) {
    // console.log('call')
    // console.log(param1[tc])
    $(param2).html(param1[2])
    // if (tc > 3) {
    return true
    // } else {
    //     return false
    // }
}
function TestDriver() {
    DLmsg.setMsg('Test Driver');
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
    DLmsg.setMsg('VehicleTest TestCadenceSensor');
    DLmsg.open()
    $('#TestCadenceSensor').html('Testing');
    ManuallySendCmd('{"VehicleTest":"CadenceSensor"}');

}
function CadenceSensorCheck(param) {
    var jsonObj = JSON.parse(param);
    if (typeof jsonObj.RPM != 'undefined') {
        DLmsg.setMsg('Please Roll the Crank ! RPM :' + jsonObj.RPM + ', Count : ' + jsonObj.Count + '<button id="wsiBtn" type="button" onclick="wsiclose()">OK</button>');
        $('#wsiBtn').hide();
    }

    if (jsonObj.TestMaxRPM === 'Pass') {
        myTimer = setInterval(AutoSend, 2000);
        $('#wsiBtn').show();
    }
    if (jsonObj.TestMaxRPM === 'Fail') {
        myTimer = setInterval(AutoSend, 2000);
        DLmsg.close();
    }

}
function wsiclose() {
    DLmsg.close();
}
function TestSpeedSensor() {
    DLmsg.setMsg('VehicleTest TestSpeedSensor');
    DLmsg.open()
    $('#TestSpeedSensor').html('Testing');
    ManuallySendCmd('{"VehicleTest":"SpeedSensor"}');

}
function TestSpeedSensorEnd(param) {
    DLmsg.close()
    var jsonObj = JSON.parse(param);
    $('#TestMotor').html(jsonObj.VehicleTestSpeedSensor);
}
function TestMotor() {
    DLmsg.setMsg('VehicleTest Motor');
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
    DLmsg.setMsg('VehicleTest Battery');
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
function UpgradeFW() {
    // v = '{"DownloadFW":"None"}'
    var valeur = 0;
    $('#bar1').hide();
    $('#GFW').attr("disabled", true);
    setTimeout(function () {
        $('#bar1').css('width', valeur + '%').attr('aria-valuenow', valeur);
    }, 0);

    setTimeout(function () {
        $('#bar1').show();
        ManuallySendProgressBar('{"DownloadFW":"http://127.0.0.1:9001/1MBfile;filename"}');
    }, 100);




}

function DoInfo() {
    DLmsg.setMsg('Get information please wait');
    DLmsg.open();
    ManuallySendCmd('{"Read":"Display"}');

}

function DoTestRecode() {
    DLmsg.setMsg('Get TestHistory please wait');
    DLmsg.open();
    ManuallySendCmd('{"TestHistory":"None"}');
}

function DoCust() {
    var isReadDisplay = getCookie('ckIsReadDP');
    if (isReadDisplay !== 'True') {
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
    var n = new Date();
    DLmsg.setMsg(n);
    DLmsg.open();
    setTimeout(function () { DLmsg.close(); }, 2000);
}

function testbtn1() {
    var n = new Date();
    DLbtn.setMsg(n);
    DLbtn.open();
    DLbtn.btnAction(bttt)
}