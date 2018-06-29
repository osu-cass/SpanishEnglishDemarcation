function Separate_Spanish_English(contents, option) {
    var Spanish = [];
    var English = [];
    for (let i = 0; i < contents.length; i++) {
        if (contents[i].lang == 'es-mx') {
            Spanish.push(contents[i]);
        }
        else {
            English.push(contents[i]);
        }
    }
    var Spanish_Block = $('<div></div>');
    for (let index = 0; index < Spanish.length; index++) {
        $(Spanish_Block).append(Spanish[index]);
    }
    if (option == undefined) {
        Spanish_Block.addClass("Spanish");
    }
    else {
        Spanish_Block.addClass("Spanish_Answer");
    }

    var English_Block = $('<div></div>');
    for (let index = 0; index < English.length; index++) {
        English_Block.append(English[index]);
    }
    if (option == undefined) {
        English_Block.addClass("English");
    }
    else {
        English_Block.addClass("English_Answer");
    }

    var New_Passage = $('<div></div>');
    New_Passage.append(Spanish_Block);
    New_Passage.append(English_Block);
    return New_Passage;

}

function Rearrange(name, option) {
    var Parent = $(name);
    var Children = Parent.children();
    var New_Children = Separate_Spanish_English(Children, option);
    $(Parent).append(New_Children);
}

function Rearrange_Parent(Parent, option) {
    var Children = Parent.children();
    var New_Children = Separate_Spanish_English(Children, option);
    $(Parent).append(New_Children);
}

function Answer_Head(arr){
    for (let i = 0; i < arr.length; i++) {
        var Children=arr[i].children;
        var L=Children.length;
        if(L>=3){
            var English_icon=document.createElement("i");
            English_icon.className="fas fa-star";
            English_icon.classList.add("Icon");
            arr[i].insertBefore(English_icon,Children[0]);
            var Spanish_icon=document.createElement("i");
            Spanish_icon.className="fas fa-square";
            Spanish_icon.classList.add("Icon");
            var index=Math.floor(L/2)+1;
            arr[i].insertBefore(Spanish_icon,Children[index]);
        }
    }
}

function Check_Number(Html_Content) {
    for (let i = 0; i < Html_Content.length; i++) {
        if ((Html_Content[i] < 'z' && Html_Content[i] > 'a') || (Html_Content[i] < 'Z' && Html_Content[i] > 'A')) {
            return false;
        }
    }
    return true;
}
function Check_Img(Child) {
    var nodes = Child.childNodes;
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeName == 'IMG') {
            return true;
        }
    }
    return false;
}
Passage_Name = '.thePassage .padding';
Question_Name = '.stemContainer';
Choice_Name = '.optionContent';
if (document.querySelector(Passage_Name) != null) {
    Rearrange(Passage_Name);
}
else {
    var Table = $('.bigTable');
    Table.addClass("center");
    var Questions = $('.theQuestions');
    Questions.css("width",'100%');
}
if ($(Question_Name) != null) {
    Rearrange(Question_Name);
}
var choices = $(Choice_Name);
if (choices != null) {
    choices.addClass("Number");
    var td = $(".tableItem tbody tr td .languagedivider");
    if (td) {
        td.prev().addClass("Spanish_Answer");
        td.next().addClass("English_Answer");
    }
}
var options=$(".optionContent .languagedivider");
if(options){
    options.prev().addClass("Spanish_Answer");
    options.next().addClass("English_Answer");
}
var check=$(".Number");
//     var check = false;
//     if (choices[0] != null) {
//         var Children = choices[0].children;
//         var Html_Content = Children[0].innerHTML;
//         var check = Check_Number(Html_Content) || Check_Img(Children[0]);
//     }

//     if (check) {
//         for (let i = 0; i < choices.length; i++) {
//             choices[i].classList.add('Number');
//         }
//     }
//     else {
//         for (let i = 0; i < choices.length; i++) {
//             Rearrange('#' + choices[i].id);
//         }
//     }
// }
var th = $(".tableItem thead tr th .languagedivider");
if (th) {
    var pre=th.prevAll();
    var L=pre.length-1;
    var next=th.next();
    var first=$(pre[L]);
    while(next.html()=="&nbsp")
    {
        next=next.next();
    }
    first.addClass("Spanish_Answer");
    next.addClass("English_Answer");
}


var Answer_Cotainer = $('.answerContainer .tableItem');
if (Answer_Cotainer != null) {
    var goal = $('.answerContainer');
    var width = $(goal).width();
    $(Answer_Cotainer).css("width",width);
}


