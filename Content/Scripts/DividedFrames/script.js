function separateSpanishEnglish(contents, option) {
    // Initialize Spanish & English text arrays //
    const spanish = [];
    const english = [];

    // Sort content into arrays //
    $.each(contents, (idx, val) => {
        if (val.lang === 'es-mx') {
            spanish.push(val);
        } else {
            english.push(val);
        }
    });

    // Create div element for Spanish text array //
    const spanishBlock = $('<div></div>');
    $.each(spanish, (idx, val) => {
        spanishBlock.append(val);
    });

    if (option) {
        spanishBlock.addClass("spanish-answer");
    } else {
        spanishBlock.addClass("spanish");
    }

    // Create div element for English text array //
    const englishBlock = $('<div></div>');
    $.each(english, (idx, val) => {
        englishBlock.append(val);
    });

    if (option) {
        englishBlock.addClass("english-answer");
    } else {
        englishBlock.addClass("english");
    }

    // Create div element to hold Spanish & English text blocks //
    const newPassage = $('<div class="english-spanish"></div>')
        .append(spanishBlock)
        .append(englishBlock);

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
}else {                                    // create table for questions if no passage exists
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



/* Fix spacing for wide table titles */
const wideTableTitles = $('table[class="tableItem"] thead tr th[colspan="3"] p');
$.each(wideTableTitles, (idx, val) => {
    if ($(val).html() === '&nbsp;') {
        $(val).remove();
    }
});



/* Add dividing lines to table titles */
const englishTableTitle = $('table[class="tableItem"] thead tr th[colspan="3"] p:last-child')
    .css('margin-left', '')
    .css('margin-right', '')
    .addClass('table-dividing-line');

/* Add dividing lines to relevant table cells */
const englishColText = $('table[class="tableItem"] tbody tr td:first-child p:last-child');                                 // for 1st column lines
$.each(englishColText, (idx, val) => {
    $(val).addClass('table-dividing-line');
});
const englishRowText1 = $('table[class="tableItem"] tbody tr:first-child td p:last-child');                               // for heading rows in tables with separate titles
$.each(englishRowText1, (idx, val) => {
    if (!$(val).children().is('input')) {                                                                                 // only add line if the contents are not input fields
        $(val).addClass('table-dividing-line');
    }
});
const headingRow = $('table[class="tableItem"] thead tr th');                                                             // for heading rows in tables without titles
$.each(headingRow, (idx, val) => {
    if ($(val).find('p').length > 1) {                                                                                    // add line if there is > 1 paragraph in thead th elem
        $(val).find('p:last-child').addClass('table-dividing-line');
    }
});

/* Change dividing line for final Item 2803 table cell */
const englishTableFootnote = $('table[class="tableItem"] tbody tr:last-child td:last-child');
if ($(englishTableFootnote).attr('colspan') > 1) {
    $(englishTableFootnote).find('p:last-child')
        .removeClass('table-dividing-lines')
        .css('margin', '0')
        .css('width', '40%')
        .css('border-top', '2px solid black');
}



/* Changes inline font in tables to a larger serif font */
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