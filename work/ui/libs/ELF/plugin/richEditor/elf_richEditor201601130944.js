//Elf.controls.richEditor = function (editorStyle,userToken) {
Elf.controls.richEditor = function (rArgs) {
    var editorStyle = rArgs["editorStyle"];
    var token = rArgs["token"];
    var service = rArgs["service"];
    var bucketName = rArgs["bucketName"];
    var basePath = rArgs["basePath"];

    var editor = Elf.controls({
        name: "div",
        className: "elf_richEditor_editor " + editorStyle
    });

    editor.blankText = "<p><br></p>";

    editor.ignoreNextHistory = false;

    editor.toolbar = Elf.createChild(editor, {
        name: "hDiv",
        className: "parallelStart perpendicularCenter elf_richEditor_toolbar"
    });

    //revoke and redo
    editor.toolbar.btnRevoke = Elf.createChild(editor.toolbar, {
        name: "button",
        className: "elf_richEditor_toolButton toolButton_revoke elf_richEditor_toolButton_disable"
    });
    editor.toolbar.btnRevoke.title = "撤销";
    Elf.xEvents.onXClick(editor.toolbar.btnRevoke, function () {
        editor.revoke();
    });

    editor.toolbar.btnRedo = Elf.createChild(editor.toolbar, {
        name: "button",
        className: "elf_richEditor_toolButton toolButton_redo elf_richEditor_toolButton_disable"
    });
    editor.toolbar.btnRedo.title = "重做";
    Elf.xEvents.onXClick(editor.toolbar.btnRedo, function () {
        editor.redo();
    });

    editor.revokeAndRedoStatus = function () {
        if (editor.currentHistory) {
            if (editor.currentHistory.prev) {
                editor.enableRevoke();
            }
            else {
                editor.disableRevoke();
            }

            if (editor.currentHistory.next) {
                editor.enableRedo();
            }
            else {
                editor.disableRedo();
            }
        }
        else {
            editor.disableRevoke();
            editor.disableRedo();
        }
    };
    editor.enableRevoke = function () {
        Elf.effects.removeClass(editor.toolbar.btnRevoke, "elf_richEditor_toolButton_disable");
        Elf.effects.appendClass(editor.toolbar.btnRevoke, "elf_richEditor_toolButton_enable");

        editor.toolbar.btnRevoke.enabled = true;
    };
    editor.disableRevoke = function () {
        Elf.effects.removeClass(editor.toolbar.btnRevoke, "elf_richEditor_toolButton_enable");
        Elf.effects.appendClass(editor.toolbar.btnRevoke, "elf_richEditor_toolButton_disable");
        //editor.toolbar.btnRevoke.removeEventListener("xClick");
        editor.toolbar.btnRevoke.enabled = false;
    };
    editor.revoke = function () {
        if (editor.toolbar.btnRevoke.enabled) {
            editor.ignoreNextHistory = true;

            editor.editArea.innerHTML = editor.currentHistory.prev.value;
            editor.currentHistory = editor.currentHistory.prev;
            editor.revokeAndRedoStatus();
        }
    };
    editor.enableRedo = function () {
        Elf.effects.removeClass(editor.toolbar.btnRedo, "elf_richEditor_toolButton_disable");
        Elf.effects.appendClass(editor.toolbar.btnRedo, "elf_richEditor_toolButton_enable");

        editor.toolbar.btnRedo.enabled = true;
    };
    editor.disableRedo = function () {
        Elf.effects.removeClass(editor.toolbar.btnRedo, "elf_richEditor_toolButton_enable");
        Elf.effects.appendClass(editor.toolbar.btnRedo, "elf_richEditor_toolButton_disable");
        //editor.toolbar.btnRedo.removeEventListener("xClick");
        editor.toolbar.btnRedo.enabled = false;
    };
    editor.redo = function () {
        if (editor.toolbar.btnRedo.enabled) {
            editor.ignoreNextHistory = true;

            editor.editArea.innerHTML = editor.currentHistory.next.value;
            editor.currentHistory = editor.currentHistory.next;
            editor.revokeAndRedoStatus();
        }
    };

    // highlight or normal button
    editor.highlightButton = function (btn) {
        Elf.effects.appendClass(btn, "elf_richEditor_toolButton_highlight");
    };
    editor.normalButton = function (btn) {
        Elf.effects.removeClass(btn, "elf_richEditor_toolButton_highlight");
    };

    //bold , italic , underline
    editor.isBold = false;
    editor.toolbar.btnBold = Elf.createChild(editor.toolbar, {
        name: "button",
        className: "elf_richEditor_toolButton toolButton_bold elf_richEditor_toolButton_enable"
    });
    editor.toolbar.btnBold.title = "加粗";


    editor.highlightBold = function () {
        editor.highlightButton(editor.toolbar.btnBold);
        //Elf.effects.appendClass(editor.toolbar.btnBold,"elf_richEditor_toolButton_highlight");
        editor.isBold = true;
    };
    editor.normalBold = function () {
        editor.normalButton(editor.toolbar.btnBold);
        //Elf.effects.removeClass(editor.toolbar.btnBold,"elf_richEditor_toolButton_highlight");
        editor.isBold = false;
    };
    Elf.xEvents.onXClick(editor.toolbar.btnBold, function () {
        if (editor.isBold) {
            editor.normalBold();
        }
        else {
            editor.highlightBold();
        }
        editor.editArea.ownerDocument.execCommand("bold");
    });

    editor.isItalic = false;
    editor.toolbar.btnItalic = Elf.createChild(editor.toolbar, {
        name: "button",
        className: "elf_richEditor_toolButton toolButton_italic elf_richEditor_toolButton_enable"
    });
    editor.toolbar.btnItalic.title = "斜体";
    editor.highlightItalic = function () {
        editor.highlightButton(editor.toolbar.btnItalic);
        //Elf.effects.appendClass(editor.toolbar.btnItalic,"elf_richEditor_toolButton_highlight");
        editor.isItalic = true;
    };
    editor.normalItalic = function () {
        editor.normalButton(editor.toolbar.btnItalic);
        //Elf.effects.removeClass(editor.toolbar.btnItalic,"elf_richEditor_toolButton_highlight");
        editor.isItalic = false;
    };
    Elf.xEvents.onXClick(editor.toolbar.btnItalic, function () {
        if (editor.isItalic) {
            editor.normalItalic();
        }
        else {
            editor.highlightItalic();
        }

        document.execCommand("italic");
    });

    editor.isUnderline = false;
    editor.toolbar.btnUnderline = Elf.createChild(editor.toolbar, {
        name: "button",
        className: "elf_richEditor_toolButton toolButton_underline elf_richEditor_toolButton_enable"
    });
    editor.toolbar.btnUnderline.title = "下划线";
    editor.highlightUnderline = function () {
        editor.highlightButton(editor.toolbar.btnUnderline);
        //Elf.effects.appendClass(editor.toolbar.btnUnderline,"elf_richEditor_toolButton_highlight");
        editor.isUnderline = true;
    };
    editor.normalUnderline = function () {
        editor.normalButton(editor.toolbar.btnUnderline);
        //Elf.effects.removeClass(editor.toolbar.btnUnderline,"elf_richEditor_toolButton_highlight");
        editor.isUnderline = false;
    };
    Elf.xEvents.onXClick(editor.toolbar.btnUnderline, function () {
        if (editor.isUnderline) {
            editor.normalUnderline();
        }
        else {
            editor.highlightUnderline();
        }

        document.execCommand("underline");
    });
    //sup sub
    editor.isSup=false;
    editor.toolbar.btnSup = Elf.createChild(editor.toolbar, {
        name: "button",
        className: "elf_richEditor_toolButton toolButton_sup elf_richEditor_toolButton_enable"
    });
    editor.toolbar.btnSup.title = "上标";
    editor.highlightSuperScript = function () {
        editor.highlightButton(editor.toolbar.btnSup);
        editor.isSup = true;
    };
    editor.normalSuperScript = function () {
        editor.normalButton(editor.toolbar.btnSup);
        editor.isSup = false;
    };
    Elf.xEvents.onXClick(editor.toolbar.btnSup, function () {
        if (editor.isSup) {
            editor.normalSuperScript();
        }
        else {
            editor.highlightSuperScript();
        }
        document.execCommand("superScript");
    });
    editor.isSub=false;
    editor.toolbar.btnSub = Elf.createChild(editor.toolbar, {
        name: "button",
        className: "elf_richEditor_toolButton toolButton_sub elf_richEditor_toolButton_enable"
    });
    editor.toolbar.btnSub.title = "下标";
    editor.highlightSubScript = function () {
        editor.highlightButton(editor.toolbar.btnSub);
        editor.isSubScript = true;
    };
    editor.normalSubScript = function () {
        editor.normalButton(editor.toolbar.btnSub);
        editor.isSubScript = false;
    };
    Elf.xEvents.onXClick(editor.toolbar.btnSub, function () {
        if (editor.isSubScript) {
            editor.normalSubScript();
        }
        else {
            editor.highlightSubScript();
        }
        document.execCommand("subScript");
    });
    //end sup sub
    //fore color and background color
    if (Elf.terminalInfo.IsIE) {// ie color picker
        editor.toolbar.colorDlg = Elf.createChild(editor.toolbar, {
            name: "object",
            className: "toolButton_colorDropIEDlg"
        });
        editor.toolbar.colorDlg.setAttribute("classid", "clsid:3050f819-98b5-11cf-bb82-00aa00bdce0b");
        editor.toolbar.colorDlg.getColor = function () {
            var sColor = editor.toolbar.colorDlg.ChooseColorDlg();
            var color = sColor.toString(16);
            while (color.length < 6) color = "0" + color;
            color = "#" + color;
            return color;
        };
    }

    editor.toolbar.btnForeColor = Elf.createChild(editor.toolbar, {
        name: "div",
        className: "elf_richEditor_toolComboButton elf_richEditor_toolButton_enable"
    });
    editor.changeForeColor = function () {
        document.execCommand("foreColor", false, editor.toolbar.btnForeColor.btnDrop.value);
    };
    editor.toolbar.btnForeColor.title = "字体颜色";
    editor.toolbar.btnForeColor.btnDo = Elf.createChild(editor.toolbar.btnForeColor, {
        name: "button",
        className: "elf_richEditor_toolButton toolButton_foreColor"
    });
    if (Elf.terminalInfo.IsIE) {
        editor.toolbar.btnForeColor.btnDrop = Elf.createChild(editor.toolbar.btnForeColor, {
            name: "button",
            className: "toolButton_colorDropIE"
        });
        Elf.xEvents.onXClick(editor.toolbar.btnForeColor.btnDrop, function () {
            var color = editor.toolbar.colorDlg.getColor();
            editor.toolbar.btnForeColor.btnDrop.style.cssText += ";background-color:" + color;
            editor.toolbar.btnForeColor.btnDrop.value = color;
            editor.changeForeColor();
        });
    }
    else {
        editor.toolbar.btnForeColor.btnDrop = Elf.createChild(editor.toolbar.btnForeColor, {
            name: "color",
            className: "toolButton_colorDrop"
        });
        editor.toolbar.btnForeColor.addEventListener("change", function () {
            editor.changeForeColor();
        });
    }
    Elf.xEvents.onXClick(editor.toolbar.btnForeColor.btnDo, function () {
        //document.execCommand("foreColor",false,editor.toolbar.btnForeColor.btnDrop.value);
        editor.changeForeColor();
    });

    editor.toolbar.btnBackColor = Elf.createChild(editor.toolbar, {
        name: "div",
        className: "elf_richEditor_toolComboButton elf_richEditor_toolButton_enable"
    });
    editor.changeBackColor = function () {
        document.execCommand("backColor", false, editor.toolbar.btnBackColor.btnDrop.value);
    };
    editor.toolbar.btnBackColor.title = "背景色";
    editor.toolbar.btnBackColor.btnDo = Elf.createChild(editor.toolbar.btnBackColor, {
        name: "button",
        className: "elf_richEditor_toolButton toolButton_backColor"
    });
    if (Elf.terminalInfo.IsIE) {
        editor.toolbar.btnBackColor.btnDrop = Elf.createChild(editor.toolbar.btnBackColor, {
            name: "button",
            className: "toolButton_colorDropIE"
        });
        Elf.xEvents.onXClick(editor.toolbar.btnBackColor.btnDrop, function () {
            var color = editor.toolbar.colorDlg.getColor();
            editor.toolbar.btnBackColor.btnDrop.style.cssText += ";background-color:" + color;
            editor.toolbar.btnBackColor.btnDrop.value = color;
            editor.changeBackColor();
        });
    }
    else {
        editor.toolbar.btnBackColor.btnDrop = Elf.createChild(editor.toolbar.btnBackColor, {
            name: "color",
            className: "toolButton_colorDrop"
        });
        editor.toolbar.btnBackColor.addEventListener("change", function () {
            editor.changeBackColor();
        });
    }
    Elf.xEvents.onXClick(editor.toolbar.btnBackColor.btnDo, function () {
        //document.execCommand("backColor",false,editor.toolbar.btnBackColor.btnDrop.value);
        editor.changeBackColor();
    });

    //font name and size
    var fontNames = [
        {
            code: "arial",
            name: "arial"
        },
        {
            code: "宋体",
            name: "宋体"
        },
        {
            code: "微软雅黑",
            name: "微软雅黑"
        },
        {
            code: "楷体",
            name: "楷体"
        }
    ];
    editor.toolbar.comboFontName = Elf.controls.comboBox("", "", "", "toolButton_fontName", fontNames, function (selectedData) {
        //alert(selectedData);
        //console.log(selectedData.name);
        document.execCommand("fontName", false, selectedData.name);
    });
    editor.toolbar.appendChild(editor.toolbar.comboFontName);
    var fontSizes = [
        {
            code: "1",
            name: "10px"
        },
        {
            code: "2",
            name: "12px"
        },
        {
            code: "3",
            name: "16px"
        },
        {
            code: "4",
            name: "18px"
        },
        {
            code: "5",
            name: "24px"
        },
        {
            code: "6",
            name: "32px"
        },
        {
            code: "7",
            name: "48px"
        }
    ];
    editor.toolbar.comboFontSize = Elf.controls.comboBox("", "", "", "toolButton_fontName", fontSizes, function (selectedData) {
        //console.log(selectedData.code);
        document.execCommand("fontSize", false, selectedData.code);
    });
    editor.toolbar.appendChild(editor.toolbar.comboFontSize);
    //alignment
    editor.alignmentButtons = [];

    editor.toolbar.btnLeftAlignment = Elf.createChild(editor.toolbar, {
        name: "button",
        className: "elf_richEditor_toolButton toolButton_leftAlignment elf_richEditor_toolButton_enable"
    });
    editor.toolbar.btnLeftAlignment.title = "局左对齐";
    editor.toolbar.btnLeftAlignment.alignmentType = "justifyLeft";
    editor.alignmentButtons.push(editor.toolbar.btnLeftAlignment);

    editor.toolbar.btnCenterAlignment = Elf.createChild(editor.toolbar, {
        name: "button",
        className: "elf_richEditor_toolButton toolButton_centerAlignment elf_richEditor_toolButton_enable"
    });
    editor.toolbar.btnCenterAlignment.title = "局中对齐";
    editor.toolbar.btnCenterAlignment.alignmentType = "justifyCenter";
    editor.alignmentButtons.push(editor.toolbar.btnCenterAlignment);

    editor.toolbar.btnRightAlignment = Elf.createChild(editor.toolbar, {
        name: "button",
        className: "elf_richEditor_toolButton toolButton_rightAlignment elf_richEditor_toolButton_enable"
    });
    editor.toolbar.btnRightAlignment.title = "局右对齐";
    editor.toolbar.btnRightAlignment.alignmentType = "justifyRight";
    editor.alignmentButtons.push(editor.toolbar.btnRightAlignment);

    editor.toolbar.btnFullAlignment = Elf.createChild(editor.toolbar, {
        name: "button",
        className: "elf_richEditor_toolButton toolButton_fullAlignment elf_richEditor_toolButton_enable"
    });
    editor.toolbar.btnFullAlignment.title = "两端对齐";
    editor.toolbar.btnFullAlignment.alignmentType = "justifyFull";
    editor.alignmentButtons.push(editor.toolbar.btnFullAlignment);

    editor.highlightAlignmentButton = function (alignmentType) {
        Elf.algorithm.iterateValues({
            collection: editor.alignmentButtons,
            handler: function (item) {
                if (item.alignmentType == alignmentType) {
                    editor.highlightButton(item);
                }
                else {
                    editor.normalButton(item);
                }
            }
        });
    };
    Elf.algorithm.iterateValues({
        collection: editor.alignmentButtons,
        handler: function (item) {
            Elf.xEvents.onXClick(item, function () {
                editor.highlightAlignmentButton(this.alignmentType);
                //console.log(this.alignmentType);
                document.execCommand(this.alignmentType, false, false);
            });
        }
    });
    //pic and video
    editor.toolbar.uploadImgBgObj = Elf.controls({
        name: "div",
        className: "elf_richEditor_uploadImg"
    });
    editor.toolbar.uploadImg = Elf.controls.cloudUploader({
        service: service,
        bucketName: bucketName,
        basePath: basePath,
        token: token,
        uploaderStyle: "elf_richEditor_toolButton_enable",
        backgroundObj: editor.toolbar.uploadImgBgObj,
        acceptType: "image/jpeg,image/png,image/gif",
        acceptTypeStr: "仅支持 jpg,png,gif 类型的图片",
        sizeLimit: 1048576 * 20, //20M
        sizeLimitStr: "不允许上传超过 20M 的图片！",
        onComplete: function (data) {
            //console.log(data);
            editor.editArea.focus();
            //document.execCommand("insertImage",true,data.url);
            var selection = document.getSelection();
            if (selection) {
                var selectionRange = selection.getRangeAt(0);
                selectionRange.deleteContents();
                var img = Elf.controls({
                    name: "img",
                    initProps: {
                        src: data.url
                    }
                });
                //console.log(img);
                selectionRange.insertNode(img);
            }
        }
    });
    editor.toolbar.uploadImg.title = "上传图片";
    editor.toolbar.appendChild(editor.toolbar.uploadImg);

    editor.toolbar.uploadVideoBgObj = Elf.controls({
        name: "div",
        className: "elf_richEditor_uploadVideo"
    });
    editor.toolbar.uploadVideo = Elf.controls.cloudUploader({
        service: service,
        bucketName: bucketName,
        basePath: basePath,
        token: token,
        uploaderStyle: "elf_richEditor_toolButton_enable",
        backgroundObj: editor.toolbar.uploadVideoBgObj,
        acceptType: "video/mp4",
        acceptTypeStr: "仅支持 mp4 格式的视频",
        sizeLimit: 1048576 * 500, //500M
        sizeLimitStr: "不允许上传超过 500M 的视频！",
        onComplete: function (data) {
            //console.log(data);
            //var videoUrl='<video height="360px" src="'+data.url+'" controls="controls"></video>';
            //console.log(videoUrl);
            editor.editArea.focus();
            //document.execCommand("insertHTML",true,videoUrl);
            var selection = document.getSelection();
            if (selection) {
                var selectionRange = selection.getRangeAt(0);
                selectionRange.deleteContents();
                var videoWrapper = Elf.controls({
                    name: "div"
                });
                var video = Elf.createChild(videoWrapper, {
                    name: "video",
                    initProps: {
                        src: data.url,
                        controls: "controls"
                    }
                });
                //console.log(video);
                video.setAttribute("height", "240px");
                selectionRange.insertNode(videoWrapper);
            }
        }
    });
    editor.toolbar.uploadVideo.title = "上传视频";
    editor.toolbar.appendChild(editor.toolbar.uploadVideo);

    //edit area
    editor.editArea = Elf.createChild(editor, {
        name: "div",
        className: "elf_richEditor_editArea",
        initProps: {
            innerHTML: editor.blankText
        }
    });
    editor.editArea.setAttribute("contenteditable", "true");
    //editor.editArea.setAttribute("autofocus","autofocus");
    //editor.editArea.innerHTML="<p><br></p>";

    editor.currentHistory = {
        value: editor.editArea.innerHTML
    };
    editor.editArea.onContentChange = function () { 
        if(editor.contentChangedEvent){
            editor.contentChangedEvent();
        }
        if (editor.ignoreNextHistory) {
            editor.ignoreNextHistory = false;
            return;
        }
        var history = {
            value: editor.editArea.innerHTML
        };
        history.prev = editor.currentHistory;
        if (editor.currentHistory) {
            editor.currentHistory.next = history;
        }
        editor.currentHistory = history;
        //console.log(editor.currentHistory);
        editor.revokeAndRedoStatus();
    };
    var observer = new MutationObserver(editor.editArea.onContentChange);
    var options = {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true
    };
    observer.observe(editor.editArea, options);
    editor.checkToolbarStatus = function () {
        var isSelectionBold = editor.editArea.ownerDocument.queryCommandState("bold");
        if (isSelectionBold) {
            editor.highlightBold();
        }else {
            editor.normalBold();
        }
        var isSuperScript=editor.editArea.ownerDocument.queryCommandState("superScript");
        if (isSuperScript) {
            editor.highlightSuperScript();
        }else {
            editor.normalSuperScript();
        }
        var isSubScript=editor.editArea.ownerDocument.queryCommandState("subscript");
        if (isSubScript) {
            editor.highlightSubScript();
        }else {
            editor.normalSubScript();
        }
        var isSelectionItalic = editor.editArea.ownerDocument.queryCommandState("italic");
        if (isSelectionItalic) {
            editor.highlightItalic();
        }else {
            editor.normalItalic();
        }

        var isSelectionUnderline = document.queryCommandState("underline");
        //console.log(isSelectionUnderline);
        if (isSelectionUnderline) {
            editor.highlightUnderline();
        }
        else {
            editor.normalUnderline();
        }

        var selectionFontName = document.queryCommandValue("fontName");
        if (selectionFontName) {
            var firstFontName = selectionFontName.split(",")[0];
            editor.toolbar.comboFontName.setValue(firstFontName);
        }
        else {
            editor.toolbar.comboFontName.setValue(-1);
        }

        var selectionFontSize = document.queryCommandValue("fontSize");
        if (selectionFontSize) {
            editor.toolbar.comboFontSize.setValue(selectionFontSize);
        }
        else {
            editor.toolbar.comboFontSize.setValue(-1);
        }

        var alignmentType = document.queryCommandState("justifyLeft");
        if (alignmentType) {
            editor.highlightAlignmentButton("justifyLeft");
        }
        alignmentType = document.queryCommandState("justifyCenter");
        if (alignmentType) {
            editor.highlightAlignmentButton("justifyCenter");
        }
        alignmentType = document.queryCommandState("justifyRight");
        if (alignmentType) {
            editor.highlightAlignmentButton("justifyRight");
        }
        alignmentType = document.queryCommandState("justifyFull");
        if (alignmentType) {
            editor.highlightAlignmentButton("justifyFull");
        }
    };

    editor.editArea.addEventListener('mouseup', function () {
        editor.checkToolbarStatus();
    });
    editor.editArea.addEventListener('keyup', function () {
        editor.checkToolbarStatus();
    }); 
    editor.getValue = function () {
        return editor.editArea.innerHTML;
    };
    editor.setValue = function (v) {
        editor.editArea.innerHTML = v;
    };

    editor.isBlank = function () {
        //console.log(editor.editArea.innerHTML);
        //console.log(editor.blankText);
        //console.log(editor.editArea.innerHTML==editor.blankText);
        return editor.editArea.innerHTML == editor.blankText;
    };
    //文本框输入内容发生改变
    editor.listenContentChanged = function (changeEvent) {
        editor.contentChangedEvent = changeEvent;
    };
    editor.getEditArea = function () {
        return editor.editArea;
    };

    editor.getText = function () {
        return Elf.algorithm.StripHTML(editor.editArea.innerHTML);
    };
    return editor;
};