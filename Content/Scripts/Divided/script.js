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

Passage_Name = '.thePassage .padding';
Question_Name = '.stemContainer';
Choice_Name = '.optionContent';
if (($(Passage_Name)).length != 0) {
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
var th = $(".tableItem thead tr th .languagedivider");
if (th) {
    var pre=th.prevAll();
    var next=th.nextAll();
    for (let i = 0; i < pre.length; i++) {
        var html=($(pre[i]).html());
        if(html!="&nbsp;"){
          $(pre[i]).addClass('Spanish_Answer');
        }
    }
    for (let i = 0; i < next.length; i++) {
        var html=($(next[i]).html());
        if(html!="&nbsp;"){
            $(next[i]).addClass('English_Answer');
        }
    }
}

var Answer_Cotainer = $('.answerContainer .tableItem');
if (Answer_Cotainer != null) {
    var goal = $('.answerContainer');
    var width = $(goal).width();
    $(Answer_Cotainer).css("width",width);
}

