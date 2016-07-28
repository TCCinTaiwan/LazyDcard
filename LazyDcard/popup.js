// function CustomGetDcard(event) {
//     // https://www.dcard.tw/_api/dcard
//     var parser = new DOMParser();
//     console.dir(event);
//     dcard_document = parser.parseFromString(event.currentTarget.responseText, "text/html");
//     // console.dir(parser.parseFromString(event.currentTarget.responseText, "text/html"));
//     var root = parser.parseFromString(event.currentTarget.responseText, "text/html").getElementById("root");

//     dcard_photo.src = root.getElementsByTagName("img")[0].src;
//     // DcardPage_avatarPhoto_2Uv1e

//     temp_Nodes = root.getElementsByTagName("div");
//     var i = 0;
//     while (i < temp_Nodes.length && temp_Nodes[i].className.search("DcardPage_gender_") < 0) {
//         i++;
//     }
//     if (i === temp_Nodes.length) {
//         alert("載入失敗!!");
//     } else if (temp_Nodes[i].className.search("DcardPage_gender_") >= 0) {
//         dcardpage_gender.children[1].innerText = temp_Nodes[i].innerText.substr(0, 1);
//         // DcardPage_gender_2Ye5v

//         dcardpage_school.children[1].innerText = temp_Nodes[i + 1].innerText;

//         while (i < temp_Nodes.length) {
//             if (temp_Nodes[i].className.search("DcardPage_profile_") >= 0) {
//                 dcard_table.children[0].innerHTML += "<tr class='DcardPage_profile'><th>" +
//                     temp_Nodes[i].childNodes[0].innerText + "</th><td>" +
//                     temp_Nodes[i].childNodes[1].innerHTML + "</td></tr>";
//             }
//             i++;
//         }
//     }

//     // DcardPage_sendInvitation_9iNFT
//     temp_Nodes = root.getElementsByTagName("button");
//     i = 0;
//     while (i < temp_Nodes.length && temp_Nodes[i].className.search("Button_primary_") < 0) {
//         i++;
//     }
//     if (i === temp_Nodes.length) {
//         alert("載入失敗!!");
//     } else if (temp_Nodes[i].className.search("Button_primary_") >= 0) {
//         dcard_button.innerText = temp_Nodes[i].innerText;
//         dcard_button.disabled = temp_Nodes[1].disabled;
//     }
// }
function loadJSON(file, callback) { // 載入Json檔
    var xmlHttpRequest = new XMLHttpRequest();
    if(xmlHttpRequest.overrideMimeType) xmlHttpRequest.overrideMimeType("application/json");
    xmlHttpRequest.open("GET", file, true);
    xmlHttpRequest.onreadystatechange = function () {
        if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == "200") {
            callback(xmlHttpRequest.responseText);
        }
    };
    xmlHttpRequest.send(null);
}
// function CustomDcardRequest() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function (event) {
//         if (xhttp.readyState == 4 && xhttp.status == 200) {
//             CustomGetDcard(event);
//         }
//     }
//     xhttp.onerror = function (event) {
//         window.close();
//     }
//     xhttp.open("GET", "https://www.dcard.tw/dcard", true);
//     xhttp.send();
// }
// function CustomSendDcard() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function (event) {
//         if (xhttp.readyState == 4 && xhttp.status == 200) {
//             console.dir(xhttp);
//         }
//     }
//     xhttp.open("POST", "https://www.dcard.tw/_api/dcard/accept", true);
//     // xhttp.withCredentials = false;
//     // xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
//     // xhttp.setRequestHeader('X-Alt-Referer', 'http://www.dcard.tw/dcard');

//     xhttp.setRequestHeader('Accept', 'application/json' );
//     xhttp.setRequestHeader('Content-Type', 'application/json' );
//     var data = '{"firstMessage":"你好歐"}';
//     xhttp.send(data);
//     //https://www.dcard.tw/_api/dcard/accept
// }
document.addEventListener('DOMContentLoaded', function() {
    // CustomDcardRequest();
    loadJSON("https://www.dcard.tw/_api/dcard", function(response) {
        dcardInfo = JSON.parse(response);
        console.dir(dcardInfo);
        dcard_photo.src = dcardInfo.dcard.avatar;
        dcardpage_gender.children[1].innerText = dcardInfo.dcard.gender === "M" ? "男" : "女";
        dcardpage_school.children[1].innerText = dcardInfo.dcard.school;
        var __ = {
            bloodType: "血型",
            club: "社團",
            department: "系所",
            exchange: "可交換的才藝",
            gender: "性別",
            grade: "年級",
            lecture: "???",
            lovedCountry: "喜歡的國家",
            school: "健行科大",
            talent: "興趣",
            trouble: "最近的困擾",
            wantToTry: "想嘗試",
            workExperience: "工作經歷"
        }
        for(var index in dcardInfo.dcard) {
            if (["avatar" ,"gender" ,"school"].indexOf(index) < 0 && dcardInfo.dcard[index] !== "") {
                dcard_table.children[0].innerHTML += "<tr class='DcardPage_profile'><th>" +
                    __[index] + "</th><td>" +
                    dcardInfo.dcard[index] + "</td></tr>";
            }
        }
        if (dcardInfo.accept) {
            if (dcardInfo.bothAccept) {
                dcard_button.innerText = "已成為好友";
            } else {
                dcard_button.innerText = "已送出邀請";
            }
        } else {
            dcard_button.innerText = "送出邀請";
        }
    });
    dcard_button.onclick = function() {
        frame.src = "https://www.dcard.tw/dcard";
        frame.hidden = false;
    }
});