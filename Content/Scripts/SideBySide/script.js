function separateSpanishEnglish(contents, option) {
    var spanish = [];
    var english = [];
    for (let i = 0; i < contents.length; i++) {
        if (contents[i].lang === 'es-mx') {
            spanish.push(contents[i]);
        } else {
            english.push(contents[i]);
        }
    }
    var spanishBlock = $('<div></div>');
    for (let index = 0; index < spanish.length; index++) {
        $(spanishBlock).append(spanish[index]);
    }
    if (option === undefined) {
        spanishBlock.addClass("spanish");
    } else {
        spanishBlock.addClass("spanish-answer");
    }

    var englishBlock = $('<div></div>');
    for (let index = 0; index < english.length; index++) {
        englishBlock.append(english[index]);
    }
    if (option === undefined) {
        englishBlock.addClass("english");
    } else {
        englishBlock.addClass("english-answer");
    }

    var newPassage = $('<div></div>');
    newPassage.append(spanishBlock);
    newPassage.append(englishBlock);
    $(newPassage).addClass("bigTable");

    return newPassage;
}

function rearrange(name, option) {
    var parent = $(name);
    var children = parent.children();
    var newChildren = separateSpanishEnglish(children, option);
    $(parent).append(newChildren);
}

passageName = '.thePassage .padding';
questionName = '.stemContainer';
choiceName = '.optionContent';

if (($(passageName)).length !== 0) {
    //rearrange(passageName);
} else {
    var table = $('.bigTable');
    table.addClass("center");
    var questions = $('.theQuestions');
    if (table.parent().attr('id')  === 'Item_3635') {
        questions.css("width", '97%');
    } else {
        questions.css('width', '100%');
    }
}

if ($(questionName) != null) {
    rearrange(questionName);
}

var choices = $(choiceName);
if (choices !== null) {
    choices.addClass("number");
}

var options = $(".optionContent .languagedivider");
if (options) {
    options.prev().addClass("spanish-answer");
    options.next().addClass("english-answer");
}

var answerContainer = $('.answerContainer .tableItem');
if (answerContainer !== null) {
    var goal = $('.answerContainer');
    var width = $(goal).width();
    $(answerContainer).css("width", width);
}

$(".stemContainer .spanish").css("width", "45%");
$(".stemContainer .english").css("width", "45%");

// Container to hold item # and hamburger icon
var numContainer = $('<div class="num-container"></div>');
var questionNumber = $('.questionNumber');
if (questionNumber) {
    $(numContainer).append(questionNumber);     // adds item # to container
}

var hamburgerIcon = $('<div class="hamburger-icon"></div>');
$(numContainer).append(hamburgerIcon);          // creates div for hamburger icon, adds div to container

var questions = $('.theQuestions');
$(questions).prepend(numContainer);              // add container to questions