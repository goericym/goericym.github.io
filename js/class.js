 
function DialogMsg() {
    var dialog;
    var isOpen = false;
    this.dlinit = function (param) {
        dialog = new BootstrapDialog({
            type: BootstrapDialog.TYPE_SUCCESS,
            closable: false,
            closeByBackdrop: false,
            closeByKeyboard: false,
            title: 'Message',
            message: param
        }
        );
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
    this.setMsg = function (param) {
        dialog.setMessage(param);
    }


}
function DialogBtn() {
    var dialog;
    var isOpen = false;
    this.dlinit = function (param) {
        dialog = new BootstrapDialog({
            type: BootstrapDialog.TYPE_SUCCESS,
            closable: false,
            closeByBackdrop: false,
            closeByKeyboard: false,
            title: 'Message',
            message: param,
            buttons: [{
                id: 'btnOk',
                label: 'OK'
            }]
        }
        );
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
    this.setMsg = function (param) {
        dialog.setMessage(param);
    }

    this.btnDisable = function (param) {
        var btn = dialog.getButton('btnOk');
        btn.disable();
        btn.spin();
    }
    this.btbEnable = function (param) {
        var btn = dialog.getButton('btnOk');
        btn.enable();
        btn.stopSpin();
    }
    this.btnLabel = function (param) {
        $('#btnOk').html(param);
    }
    this.btnAction = function (callback_fun) {
        var btn = dialog.getButton('btnOk');
        btn.unbind();//把事件清除
        btn.click(function () {
            (callback_fun && typeof (callback_fun) === "function") && callback_fun();
        });
    }

}

