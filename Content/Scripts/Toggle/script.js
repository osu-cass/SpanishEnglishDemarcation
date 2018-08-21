function Separate_Spanish_English(contents, option) {
    var Spanish = [];
    var English = [];
    var arr=Indentify_Title();
    if(arr!=false){
        Spanish.push(arr[0]);
        English.push(arr[1]);
        $(".thePassage h2").remove();
    }
    for (let i = 0; i < contents.length; i++) {
        if (contents[i].lang == 'es-mx') {
            if(!$(contents[i]).is("h2"))
                Spanish.push(contents[i]);
        }
        else {
            if(!$(contents[i]).is("h2"))
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

function Add_Button(){
    var Buttons=$("<div></div>");
    var Button0=$("<button></button>");
    var Button1=$("<button></button>");
    var Button2=$("<button></button>");
    Button1.addClass("button");
    Button2.addClass("button");
    Button0.addClass("button_click");
    Button1.html("English");
    Button2.html("Español");
    Button0.html("Both");
    $(Button0).click(Switch);
    $(Button1).click(Switch);
    $(Button2).click(Switch);
    Buttons.append(Button0);
    Buttons.append(Button1);
    Buttons.append(Button2);
    Buttons.addClass("buttons");
    var Question_Number=$(".notes");
    $(Buttons).insertBefore(Question_Number);

}
function Switch(){
    var old=$(".button_click");
    if($(old).html()==$(this).html()){
        return;
    }
    $(old).removeClass("button_click");
    $(old).addClass("button");
    $(this).addClass("button_click");
    $(this).removeClass("button");
    if($(this).html()=="Both")
    {
        $(".English").show();
        $(".English_Answer").show();
        $(".Spanish").show();
        $(".Spanish_Answer").show();
    }
    if($(this).html()=="English")
    {
        $(".English").show();
        $(".English_Answer").show();
        $(".Spanish").hide();
        $(".Spanish_Answer").hide();
    }
    if($(this).html()=="Español")
    {
        $(".Spanish").show();
        $(".Spanish_Answer").show();
        $(".English").hide();
        $(".English_Answer").hide();
    }
}

function Indentify_Title(){
    var divider =$("h2 .languagedivider");
    if(divider.length==1){
        $("<div></div>").insertBefore(divider);
        $(".thePassage h2 p").remove();
        var html=$(".thePassage h2").html();
        var Spanish="";
        var English="";
        let i = 0;
        for (i; i < html.length; i++) {
            if(html[i]!='<'){
                Spanish=Spanish+html[i];
            }            
            else{
                break;
            }
        }
        while(i<html.length){
            if(html[i]=='>'){
                i++;
                while(html[i]!='<' && i<html.length){
                    var L=English.length-1;
                    if(English[L]==' ' && html[i]==' '){
                        ;
                    }
                    else{
                        English=English+html[i];
                    }
                    i++;
                }
            }
            else{
                i++;
            }
        }
        English=English.trim();
        Spanish=Spanish.trim();
        English=$("<h2></h2>").append(English);
        Spanish=$("<h2></h2>").append(Spanish);
        var arr=[];
        arr.push(Spanish);
        arr.push(English);
        return arr;
    }
    return false;
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
    Questions.css("width",'80%');
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


var Question_Number=$(".questionNumber");
var ham=$('<div class="hamburger"></div');
$(ham).insertAfter(Question_Number);
// var stem=$(".stemContainer");
// var w=stem.width();
// console.log(ham);
// $(ham).css("left",w-20);




$(".languagedivider").remove();
Add_Button();
$(".button").click(Switch);