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
var th = $(".table-item thead tr th .languagedivider");
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
const answerContainer = $('.answerContainer .tableItem');
if (answerContainer !== null) {
    const goal = $('.answerContainer');
    const width = $(goal).width();
    $(answerContainer).css("width", width);
}



/* Change height of empty paragraphs in wide table headings to improve spacing */
const wideTableHeadings = $('.answerContainer .tableItem thead tr th[colspan="3"] p');
$.each(wideTableHeadings, (idx, val) => {
    if ($(val).html() === '&nbsp;') {
        $(val).css('height', '0');
    }
});



/* Container to hold item # and hamburger icon */
var numContainer = $('<div class="num-container"></div>');
var questionNumber = $('.questionNumber');
if (questionNumber) {
    $(numContainer).append(questionNumber);     // adds item # to container
}

var hamburgerIcon = $('<div class="hamburger-icon"></div>');
$(numContainer).append(hamburgerIcon);          // creates div for hamburger icon, adds div to container

var questions = $('.theQuestions');
$(questions).prepend(numContainer);              // add container to questions


var img=$('.thePassage img');
if ($(img[0]).width()>300){
    img.addClass("img");
}



/* Change inline font in tables to a larger serif font */

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



/* Eliminate extra spacing in titles */
if ($('.spanish h2 p[lang="es-mx"]')) {
    $('.spanish h2 p[lang="es-mx"]').remove();
}



/* Align single-line answers to radio buttons */
const answerContent = $('.optionContent');
$.each(answerContent, (idx, val) => {
    if ($(val).children().length) {
        $(val).find('p').css('margin-top', '15px');
    }
});

const radioButton=$(".option");
if(radioButton){
    radioButton.css("width","25px").css("height","25px");
    $.each(radioButton,(idx,val)=>{
        let label=$("<label></label>");
        let char=$("<span></span>");
        char.text($(val).attr('value'));
        char.css("width","20px").css("height","20px").css("font-size","15px").css("position","absolute").css("margin-left","-20px");
        const prev=$(val).prev();
        label.append(val);
        label.append(char);
        label.insertAfter(prev);
    });
}

/* Grab English heading in passage column and move to top */
const spanishTitle = $('.thePassage h2[lang="es-mx"]');
$('.thePassage .english h2')
    .remove()
    .insertAfter(spanishTitle)
    .css('height', '25px');
    