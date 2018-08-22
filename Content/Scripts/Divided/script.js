/* Creates passage with separated Spanish & English text blocks
 * @param {object} contents - children of a jQuery objects
 * @param {boolean} option - determines if the current content is an answer option
 */
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
    const newPassage = $('<div></div>')
        .append(spanishBlock)
        .append(englishBlock);

    return newPassage;
}

/* Takes children elements of a parent element & reorganizes the text
 * @param {string} colType - class/classes of current column (passage or questions)
 * @param {boolean} option - determines if the current content is an answer option
 */
function rearrange(colType, option) {
    const col = $(colType);
    const children = col.children();
    const newChildren = separateSpanishEnglish(children, option);
    $(col).append(newChildren);
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
const choices = $(choiceName);
if (choices) {
    choices.addClass("number");
    const td = $(".table-item tbody tr td .languagedivider");
    if (td) {
        td.prev().addClass("spanish-answer");
        td.next().addClass("english-answer");
    }
}

/* Add .optionContent options in both langs */
const options = $(".optionContent .languagedivider");
if (options) {
    options.prev().addClass("spanish-answer");
    options.next().addClass("english-answer");
}

/* Add table items in both langs */
const th = $(".table-item thead tr th .languagedivider");
if (th) {
    const pre = th.prevAll();
    const next = th.nextAll();

    $.each(pre, (idx, val) => {
        const preHtml = $(val).html();
        if (html !== '&nbsp;') {
            $(val).addClass('spanish-answer');
        }
    });

    $.each(next, (idx, val) => {
        const nextHtml = $(val).html();
        if (nextHtml !== '&nbsp;') {
            $(val).addClass('english-answer');
        }
    });
}

/* Change width of answer container element */
const answerContainer = $('.answerContainer .tableItem');
if (answerContainer) {
    const goal = $('.answerContainer');
    const width = $(goal).width();
    $(answerContainer).css("width", width);
}

/* Container to hold item # and hamburger icon */
const numContainer = $('<div class="num-container"></div>');
const questionNumber = $('.questionNumber');
if (questionNumber) {
    $(numContainer).append(questionNumber);     // adds item # to container
}

const hamburgerIcon = $('<div class="hamburger-icon"></div>');
$(numContainer).append(hamburgerIcon);          // creates div for hamburger icon, adds div to container

$(questions).prepend(numContainer);              // add container to questions



/* Eliminate extra spacing in titles */
if ($('.spanish h2 p[lang="es-mx"]')) {
    $('.spanish h2 p[lang="es-mx"]').remove();
}

/* Resize questions column based on if there is a passage column or not */
const passage = $('.thePassage').html();
if (!passage) {
    $('.theQuestions')
        .removeAttr('style')
        .css('width', '80%');
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

fixTableFont();



/* Change vertical alignment of input fields to middle */
const inputBoxContainer = $('table[class="tableItem"] tbody tr td');
$.each(inputBoxContainer, (idx, val) => {
    $(val).css('vertical-align', 'middle');
});

/* Fix spacing for wide table titles */
const wideTableTitles = $('table[class="tableItem"] thead tr th[colspan="3"] p');
$.each(wideTableTitles, (idx, val) => {
    console.log($(val).html());
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



/* Align radio buttons with answer content */
const answers = $('.optionContainer').css('display', 'flex').css('align-items', 'center');



/* Increase spacing between question content and numContainer line */
$('table[class="structure layout8vertical"]').css('margin-top', '15px');

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