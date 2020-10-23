//pdf在线调整
function importOnclick() {
    //页面调用时url编码示例：
    // var paramJsonBase64 = encodeUrlParam({
    //     fileUrl: "http://127.0.0.1:5500/demo.xlsx",
    //     fileName: "demo.xlsx"
    // });
    // console.log(paramJsonBase64);
    //页面调用示例：
    //http://127.0.0.1:5500/index.html?eyJmaWxlVXJsIjoiaHR0cDovLzEyNy4wLjAuMTo1NTAwL2RlbW8ueGxzeCIsImZpbGVOYW1lIjoiZGVtby54bHN4In0=
    var settings = getData();
    console.log(settings);
    alert(JSON.stringify(settings));
}

//获取第一个sheet中的数据
function getData(){
    var len = luckysheet.getLuckysheetfile()[0].data.length;
    var settings = [];
    for(var i=1;i<len;i++){
        settings.push({
            groupNumber:luckysheet.getCellValue(i,0,0,{type:'m',order:0}),
            groupName:luckysheet.getCellValue(i,1,0,{type:'m',order:0}),
            number:luckysheet.getCellValue(i,2,0,{type:'m',order:0}),
            name:luckysheet.getCellValue(i,3,0,{type:'m',order:0}),
            value:luckysheet.getCellValue(i,4,0,{type:'m',order:0}),
            unit:luckysheet.getCellValue(i,5,0,{type:'m',order:0})
        });
    }
    return settings;
}

function encodeUrlParam(param) {//参数转urlBase64
    var paramJson = JSON.stringify(param);
    var paramJsonBase64 = Base64.encode(paramJson);
    return paramJsonBase64;
}

function decodeUrlParam(paramJsonBase64) {//urlBase64转参数
    var paramJson = Base64.decode(paramJsonBase64);
    var param = JSON.parse(paramJson);
    return param;
}

window.onload = function () {
    var fileUrl = "http://127.0.0.1:5500/demo.xlsx";//示例excel
    var fileName = "demo.xlsx"
    var idx = window.location.href.indexOf("?");
    if(idx>-1){
        var paramJsonBase64 = window.location.href.substr(idx+1);
        var param = decodeUrlParam(paramJsonBase64);
        fileUrl = param.fileUrl;
        fileName = param.fileName;
    }
    if (fileUrl && fileName) {
        luckyExcel.transformExcelToLuckyByUrl(fileUrl, fileName, function (exportJson, luckysheetfile) {
            if (exportJson.sheets == null || exportJson.sheets.length == 0) {
                alert("无法读取excel文件的内容，当前仅支持xlsx文件!");
                return;
            }
            window.luckysheet.create({
                container: 'luckysheet',
                showinfobar: false,
                data: exportJson.sheets,
                title: exportJson.info.name,
                userInfo: exportJson.info.name.creator
            });
        });
    }
}