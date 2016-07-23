
function CustomGetDcard() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var parser = new DOMParser();
            console.dir(parser.parseFromString(xhttp.responseText, "text/html"));
            root = parser.parseFromString(xhttp.responseText, "text/html").getElementById("root");
            dcard_photo.src = root.getElementsByTagName("img")[0].src;
            temp_Nodes = root.getElementsByTagName("div");
            i = 0;
            while (i < temp_Nodes.length && temp_Nodes[i].className.search("DcardPage_gender_") < 0) {
                i++;
            }
            if (i === temp_Nodes.length) {
                alert("載入失敗!!");
            } else if (temp_Nodes[i].className.search("DcardPage_gender_") >= 0) {
                dcardpage_gender.children[1].innerText = temp_Nodes[i].innerText.substr(0, 1);
                dcardpage_school.children[1].innerText = temp_Nodes[i + 1].innerText;
                while (i < temp_Nodes.length) {
                    if (temp_Nodes[i].className.search("DcardPage_profile_") >= 0) {
                        dcard_table.children[0].innerHTML += "<tr class='DcardPage_profile'><th>" +
                            temp_Nodes[i].childNodes[0].innerText + "</th><td>" +
                            temp_Nodes[i].childNodes[1].innerHTML + "</td></tr>";
                    }
                    i++;
                }
            }
            temp_Nodes = root.getElementsByTagName("button");
            i = 0;
            while (i < temp_Nodes.length && temp_Nodes[i].className.search("Button_primary_") < 0) {
                i++;
            }
            if (i === temp_Nodes.length) {
                alert("載入失敗!!");
            } else if (temp_Nodes[i].className.search("Button_primary_") >= 0) {
                dcard_button.innerText = temp_Nodes[i].innerText;
                dcard_button.disabled = temp_Nodes[1].disabled;
            }
        }
    };
    xhttp.open("GET", "https://www.dcard.tw/dcard", true);
    xhttp.send();
}
document.addEventListener('DOMContentLoaded', function() {
    CustomGetDcard();
});