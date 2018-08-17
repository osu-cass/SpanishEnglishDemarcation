function separateSpanishEnglish(contents, option) {
    var spanish = [];
    var english = [];
    var arr = identifyTitle();
    if(arr != false) {
        spanish.push(arr[0]);
        english.push(arr[1]);
        $(".thePassage h2").remove();
    }
    for (let i = 0; i < contents.length; i++) {
        if (contents[i].lang == 'es-mx') {
            if(!$(contents[i]).is("h2"))
                spanish.push(contents[i]);
        } else if (!$(contents[i]).is("h2")) {
            english.push(contents[i]);
        }
    }

    var spanishBlock = $('<div></div>');
    for (let index = 0; index < spanish.length; index++) {
        $(spanishBlock).append(spanish[index]);
    }
    if (option) {
        spanishBlock.addClass("spanish-answer");
    } else {
        spanishBlock.addClass("spanish");
    }

    var englishBlock = $('<div></div>');
    for (let index = 0; index < english.length; index++) {
        englishBlock.append(english[index]);
    }
    if (option) {
        englishBlock.addClass("english-answer");
    } else {
        englishBlock.addClass("english");
    }

    var newPassage = $('<div></div>');
    newPassage.append(spanishBlock);
    newPassage.append(englishBlock);

    return newPassage;
}

function rearrange(name, option) {
    var parent = $(name);
    var children = parent.children();
    var newChildren = separateSpanishEnglish(children, option);
    $(parent).append(newChildren);
}

function addButton() {
    var buttons=$("<div></div>");
    var button1=$("<button></button>");
    var button2=$("<button></button>");
    button1.addClass("button_click");
    button2.addClass("button");
    button1.html("English");
    button2.html("Español");
    buttons.append(button1);
    buttons.append(button2);
    buttons.addClass("buttons");
    var questionNumber=$(".questionNumber");
    $(buttons).insertBefore(questionNumber);
}

function switchLang() {
    var click = $(".button_click");
    var unclick = $(".button");
    click.removeClass("button_click");
    click.addClass("button");
    unclick.removeClass("button");
    unclick.addClass("button_click");
    $(".button").click(switchLang);
    $(".button_click").unbind();
    var html = $(".button_click").html();
    if (html === "English") {
        $(".spanish").hide();
        $(".spanish-answer").hide();
        $(".english").show();
        $(".english-answer").show();
    } else {
        $(".spanish").show();
        $(".spanish-answer").show();
        $(".english").hide();
        $(".english-answer").hide();
    }
}

function identifyTitle() {
    var divider = $("h2 .languagedivider");
    if (divider.length === 1) {
        $("<div></div>").insertBefore(divider);
        $(".thePassage h2 p").remove();
        var html = $(".thePassage h2").html();
        var spanish = '';
        var english = '';
        let i = 0;
        for (i; i < html.length; i++) {
            if(html[i]!='<'){
                spanish += html[i];
            } else {
                break;
            }
        }

        while (i < html.length) {
            if (html[i] === '>') {
                i++;
                while (html[i] !== '<' && i < html.length) {
                    var len = english.length - 1;
                    if (english[len] === ' ' && html[i] === ' ') {
                        ;
                    } else {
                        english += html[i];
                    }
                    i++;
                }
            } else {
                i++;
            }
        }
        english = english.trim();
        spanish = spanish.trim();
        english = $("<h2></h2>").append(english);
        spanish = $("<h2></h2>").append(spanish);

        var arr = [];
        arr.push(spanish);
        arr.push(english);

        return arr;
    }

    return false;
}

passageName = '.thePassage .padding';
questionName = '.stemContainer';
choiceName = '.optionContent';

if (($(passageName)).length != 0) {
    rearrange(passageName);
} else {
    var table = $('.bigTable');
    table.addClass("center");
    var questions = $('.theQuestions');
    questions.css("width", '80%');
}

if ($(questionName) !== null) {
    rearrange(questionName);
}

var choices = $(choiceName);
if (choices !== null) {
    choices.addClass("Number");
    var td = $(".tableItem tbody tr td .languagedivider");
    if (td) {
        td.prev().addClass("spanish-answer");
        td.next().addClass("english-answer");
    }
}

var options = $(".optionContent .languagedivider");
if (options) {
    options.prev().addClass("spanish-answer");
    options.next().addClass("english-answer");
}

var th = $(".tableItem thead tr th .languagedivider");
if (th) {
    var pre = th.prevAll();
    var next = th.nextAll();
    for (let i = 0; i < pre.length; i++) {
        var html = $(pre[i]).html();
        if (html !== "&nbsp;") {
          $(pre[i]).addClass('spanish-answer');
        }
    }
    for (let i = 0; i < next.length; i++) {
        var html = $(next[i]).html();
        if (html !== "&nbsp;") {
            $(next[i]).addClass('english-answer');
        }
    }
}

var answerContainer = $('.answerContainer .tableItem');
if (answerContainer !== null) {
    var goal = $('.answerContainer');
    var width = $(goal).width();
    $(answerContainer).css("width", width);
}

addButton();

$(".spanish").hide();
$(".spanish-answer").hide();


$(".button").click(switchLang);
$(".languagedivider").remove();