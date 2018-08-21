/* Creates passage with separated Spanish & English text blocks
 * @param {object} contents - children of a jQuery objects
 * @param {???} option - determines if the current content is an answer option?
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
 * @param {???} option - determines if the current content is an answer option?
 */
function rearrange(colType, option) {
    const col = $(colType);
    const children = col.children();
    const newChildren = separateSpanishEnglish(children, option);
    $(col).append(newChildren);
}

/* Vars for class setups */
const passageName = '.thePassage .padding';
const questionName = '.stemContainer';
const choiceName = '.optionContent';

if (($(passageName)).length !== 0) {        // rearrange passage if it exists
    rearrange(passageName);
} else {                                    // create table for questions if no passage exists
    const table = $('.bigTable').addClass('center');
    const questions = $('.theQuestions').css('width', '80%');
}

/* Rearrange questions based on lang */
if ($(questionName)) {
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

const questions = $('.theQuestions');
$(questions).prepend(numContainer);              // add container to questions

/* Eliminate extra spacing in titles */
if ($('.spanish h2 p[lang="es-mx"]')) {
    $('.spanish h2 p[lang="es-mx"]').remove();
}

/* Resize questions column based on if there is a passage column or not */
const passage = $('.thePassage').html();
if (!passage) {
    console.log('No passage');
    $('.theQuestions')
        .removeAttr('style')
        .css('width', '100%');
}

/* Change inline font in tables to a larger serif font */
const answerHeadings = $('table[class="tableItem"] thead tr th p');
$.each(answerHeadings, (idx, val) => {
    $(val).css('font-family', '')
        .css('font-family', '\'Times New Roman\', Times, serif !important')
        .css('font-size', '')
        .css('font-size', '18px');
});

const answerBodyParagraphs = $('table[class="tableItem"] tbody tr td p');
$.each(answerBodyParagraphs, (idx, val) => {
    $(val).css('font-family', '')
        .css('font-size', '')
        .addClass('table-text');
});

/* Change vertical alignment of input fields to middle */
const inputBoxContainer = $('table[class="tableItem"] tbody tr td');
$.each(inputBoxContainer, (idx, val) => {
    $(val).css('vertical-align', 'middle');
});

/* Add dividing lines to table cells */
const englishTableTitle = $('table[class="tableItem"] thead tr th p:nth-child(3)').addClass('table-dividing-line');         // title line
const englishColText = $('table[class="tableItem"] tbody tr td:first-child p:last-child');                                 // 1st column lines
$.each(englishColText, (idx, val) => {
    $(val).addClass('table-dividing-line');
});
const englishRowText = $('table[class="tableItem"] tbody tr:first-child td p:last-child');
$.each(englishRowText, (idx, val) => {
    if (!$(val).children().is('input')) {
        $(val).addClass('table-dividing-line');
    }
});

/* Change dividing line for final Item 2803 table cell */
const englishTableFootnote = $('table[class="tableItem"] tbody tr:last-child td:last-child');
console.log($(englishTableFootnote).attr('colspan'));
if ($(englishTableFootnote).attr('colspan') > 1) {
    $(englishTableFootnote).find('p:last-child').removeClass('table-dividing-line');
}