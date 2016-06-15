function DialogEspeciallyClass() {
    // html = '<button id="btn-test" class="btn btn-success">Revert button status right now.</button></div>';
    this.html = '';
    this.title = '';
    this.start = function () {
        BootstrapDialog.show(
            {
                title: this.title,
                closable: false,
                message: this.html,
                onshow: function (dialog) {
                    dialog.getButton('button-s').disable();
                },
                onshown: function (dialogRef) {//啟動中會做的事

                    //this.funRes = dofun(funparam1);

                    CheckBGWFin(3000);//timeout時間,等3秒

                    function CheckBGWFin(ms) {
                        var now = new Date();
                        var exitTime = now.getTime() + ms;
                        var IntervalId = setInterval(function () {
                            todo();
                        }, 500);

                        var todo = function () {
                            now = new Date();
                            // console.log(now.getTime() + ':' + exitTime);
                            if (now.getTime() > exitTime) {
                                // console.log(now);
                                dialogRef.getButton('button-s').enable();
                                clearInterval(IntervalId);
                            }
                            // console.log(chekcw);
                            if (chekcw) {
                                // $('#button-s').html('ssss');
                                dialogRef.getButton('button-s').enable();
                                clearInterval(IntervalId);
                            }
                        };
                    }

                },
                buttons: [
                    {
                        id: 'button-f',
                        label: 'Fail',
                        action: function (dialogRef) {
                            $('#TestDisplay').html('Fail');
                            dialogRef.close();
                        }
                    }, {
                        id: 'button-s',
                        label: 'Success',
                        cssClass: 'btn-primary',
                        action: function (dialogRef) {
                            this.funRes = true;
                            $('#TestDisplay').html('Success');
                            dialogRef.close();
                        }
                    }]
            })
    }

}
function callclass() {
    var aaa = new BtnClass();
    chekcw = false;
    aaa.start(Wait, 2000);

    // bbb = Wait(2000, aaa.funRes);
    // console.log(bbb);
}
function DialogClass() {
    this.html = '';
    this.title = '';
    this.start = function (callback_fun, div_id, div_msg) {

        BootstrapDialog.confirm(
            {
                title: this.title,
                btnCancelLabel: 'Fail', // <-- Default value is 'Cancel',
                btnOKLabel: 'Success', // <-- Default value is 'OK',
                btnCancelClass: 'btn-warning',
                btnOKClass: 'btn-success',
                message: this.html,
                callback: function (result) {
                    if (result) {
                        $(div_id).html(div_msg);
                        (callback_fun && typeof (callback_fun) === "function") && callback_fun();
                    } else {
                        // $('#TestDisplay').html('Fail');
                        $(div_id).html('Fail');
                    }
                }
            })
    }

}
var DialogClass1 = {
    title: '',
    html: '',
    did: '',
    divtext: '',
    start: function (next_Fun) {

        BootstrapDialog.confirm(
            {
                title: this.title,
                btnCancelLabel: 'Fail', // <-- Default value is 'Cancel',
                btnOKLabel: 'Success', // <-- Default value is 'OK',
                btnCancelClass: 'btn-warning',
                btnOKClass: 'btn-success',
                message: this.html,
                callback: function (result) {
                    if (result) {
                        // $('#TestDisplay').html('Testing-80%');
                        //TestDisplay3();

                        // $(this.did).html(this.divtext);
                        caa.did = '#TestDisplay';
                        caa.a();
                        //document.getElementById(this.div_id).innerHTML = this.divtext
                        next_Fun();
                    } else {
                        $('#TestDisplay').html('Fail');
                    }
                }
            })
    }

};
var caa = {
    did: '',
    dtext: '',
    a: function () {
        $(this.did).html(this.dtext);
    }

}
// caa.did = '#TestDisplay';
// caa.dtext = 'TestDisplay';
// caa.a();
function waitWSinit() {
    var dialog;
    var isOpen = false;
    this.dlinit = function (param) {
        dialog = new BootstrapDialog({
            type: BootstrapDialog.TYPE_SUCCESS,
            closable: false,
            title: 'Wait Connect',
            message: param
        });
    };
    this.open = function () {
        // console.log(isOpen);
        if (isOpen === false) {
            isOpen = true;
            dialog.open();
        }
    }
    this.close = function () {
        // console.log(isOpen);
        if (isOpen === true) {
            isOpen = false;
            // setTimeout(function () { dialog.close(); }, 500);
            dialog.close();
        }

    }

}

// var aa = new testc();
// aa.bbb();

function WaitTest() {
    this.ms = 5000;//要等幾秒(millisecond)

    var now = new Date();
    var exitTime = now.getTime() + this.ms;
    this.start = function (test_fun, parma1, divid) {//第1個參數是fucntion名稱,第2個參數是要代入的參數
        var IntervalId = setInterval(function () {
            todo();
        }, 100);
        var todo = function () {
            // console.log('wt-p1:'+parma1)
            //  console.log('wt-p2:'+divid)
            now = new Date();
            // console.log(now.getTime() + ':' + exitTime);
            if ((test_fun && typeof (test_fun) === "function")) {//檢查是不是fun
                if (test_fun(parma1, divid)) {//檢查fun的回傳
                    clearInterval(IntervalId);//停止timer
                }
            }

            if (now.getTime() > exitTime) {//timeout
                // console.log(now);
                clearInterval(IntervalId);

            }
        }

    }
}



function Timer(callback, delay) {
    var timerId, start, remaining = delay;

    this.pause = function () {
        window.clearTimeout(timerId);
        remaining -= new Date() - start;
    };

    this.resume = function () {
        start = new Date();
        window.clearTimeout(timerId);
        timerId = window.setTimeout(callback, remaining);
    };

    this.resume();
}