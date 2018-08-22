/* Creates passage with separated Spanish & English text blocks */
function separateSpanishEnglish(contents, option) {
    // Initialize Spanish & English text arrays //
    var spanish = [];
    var english = [];
    for (let i = 0; i < contents.length; i++) {
        if (contents[i].lang === 'es-mx') {
            spanish.push(contents[i]);
        } else {
            english.push(contents[i]);
        }
    }

    // Create div element for Spanish text array //
    var spanishBlock = $('<div></div>');
    for (let index = 0; index < spanish.length; index++) {
        $(spanishBlock).append(spanish[index]);
    }
    if (option === undefined) {
        spanishBlock.addClass("spanish");
    } else {
        spanishBlock.addClass("spanish-answer");
    }

    // Create div element for English text array //
    var englishBlock = $('<div></div>');
    for (let index = 0; index < english.length; index++) {
        englishBlock.append(english[index]);
    }
    if (option === undefined) {
        englishBlock.addClass("english");
    } else {
        englishBlock.addClass("english-answer");
    }

    // Create div element to hold Spanish & English text blocks //
    var newPassage = $('<div></div>');
    newPassage.append(spanishBlock);
    newPassage.append(englishBlock);

    return newPassage;
}

/* Takes children elements of a parent element & reorganizes the text */
function rearrange(name, option) {
    var parent = $(name);
    var children = parent.children();
    var newChildren = separateSpanishEnglish(children, option);
    $(parent).append(newChildren);
}

/* Vars for class setups */
passageName = '.thePassage .padding';
questionName = '.stemContainer';
choiceName = '.optionContent';

if (($(passageName)).length !== 0) {        // rearrange passage if it exists
    rearrange(passageName);
} else {                                    // create table for questions if no passage exists
    var table = $('.bigTable');
    table.addClass("center");
    var questions = $('.theQuestions');
    $(questions).css("width","80%");
}

/* Rearrange questions based on lang */
if ($(questionName) !== null) {
    rearrange(questionName);
}

/* Add answer choices in both langs */
var choices = $(choiceName);
if (choices !== null) {
    choices.addClass("number");
    var td = $(".table-item tbody tr td .languagedivider");
    if (td) {
        td.prev().addClass("spanish-answer");
        td.next().addClass("english-answer");
    }
}

/* Add .optionContent options in both langs */
var options = $(".optionContent .languagedivider");
if (options) {
    options.prev().addClass("spanish-answer");
    options.next().addClass("english-answer");
}

/* Add table items in both langs */
var th = $(".tableItem .languagedivider");
if (th) {
    var pre = th.prevAll();
    var next = th.nextAll();
    for (let i = 0; i < pre.length; i++) {
        var html = ($(pre[i]).html());
        if(html !== "&nbsp;") {
            $(pre[i]).addClass('spanish-answer');
        }
    }
    for (let i = 0; i < next.length; i++) {
        var html = ($(next[i]).html());
        if (html !== "&nbsp;") {
            $(next[i]).addClass('english-answer');
        }
    }
}

/*Change width of answer container element */
var answerContainer = $('.answerContainer .tableItem');
if (answerContainer !== null) {
    var goal = $('.answerContainer');
    var width = $(goal).width();
    $(answerContainer).css("width", width);
}

/* Changes inline font in tables to a larger serif font */
function fixTableFont() {
    const answerHeadings1 = $('table[class="tableItem"] thead tr th p');
    $.each(answerHeadings1, (idx, val) => {
        $(val).css('font-family', '')
            .css('font-family', '\'Times New Roman\', Times, serif !important')
            .css('font-size', '')
            .css('font-size', '18px');
    });
    const answerHeadings2 = $('table[class="newtable"] thead tr th p');
    $.each(answerHeadings2, (idx, val) => {
        $(val).css('font-family', '')
            .css('font-family', '\'Times New Roman\', Times, serif !important')
            .css('font-size', '')
            .css('font-size', '18px');
    });

    const answerBodyParagraphs1 = $('table[class="tableItem"] tbody tr td p');
    $.each(answerBodyParagraphs1, (idx, val) => {
        $(val).css('font-family', '')
            .css('font-size', '')
            .addClass('table-text');
    });
    const answerBodyParagraphs2 = $('table[class="newtable"] tbody tr td p');
    $.each(answerBodyParagraphs2, (idx, val) => {
        $(val).css('font-family', '')
            .css('font-size', '')
            .addClass('table-text');
    });
}

/* Creates container to hold item # and hamburger icon */
function wrapNumHamburger() {
    const numContainer = $('<div class="num-container"></div>');
    const questionNumber = $('.questionNumber');
    if (questionNumber) {
        $(numContainer).append(questionNumber);     // adds item # to container
    }

    const hamburgerIcon = $('<div class="hamburger-icon"></div>');
    $(numContainer).append(hamburgerIcon);          // creates div for hamburger icon, adds div to container

    const questions = $('.theQuestions');
    $(questions).prepend(numContainer);              // add container to questions
}

var questions = $('.theQuestions');
$(questions).prepend(numContainer);              // add container to questions

var img=$('.thePassage img');
var imgwidth=img[0].width;
var EnglishDiv=$(".english");
var SpanishDiv=$(".spanish");
var SpanishFirst=$(SpanishDiv[0]);
var EnglishFirst=$(EnglishDiv[0]);
var Spanishwidth=$(SpanishFirst).width();
if (imgwidth>300){
    img.addClass("img");
}
fixTableFont();
wrapNumHamburger();
