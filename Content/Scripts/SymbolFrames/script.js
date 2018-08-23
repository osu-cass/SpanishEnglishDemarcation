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
const passageName = '.thePassage .padding';
const questionName = '.stemContainer';
const choiceName = '.optionContent';

if (($(passageName)).length !== 0) {        // rearrange passage if it exists
    rearrange(passageName);
} else {                                    // create table for questions if no passage exists
    const table = $('.bigTable').addClass('center');
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
        if (preHtml !== '&nbsp;') {
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

// var img=$('.thePassage img');
// var imgwidth=img[0].width;
// var EnglishDiv=$(".english");
// var SpanishDiv=$(".spanish");
// var SpanishFirst=$(SpanishDiv[0]);
// var EnglishFirst=$(EnglishDiv[0]);
// var Spanishwidth=$(SpanishFirst).width();
// if (Spanishwidth<imgwidth){
//     $(EnglishDiv[0]).css("width",imgwidth+30);
//     $(SpanishDiv[0]).css("width",imgwidth+30);
//     $(EnglishDiv[0]).css("margin-left",20);
//     $(SpanishDiv[0]).css("margin-left",20);
//     $(EnglishDiv[0]).css("margin-right",30);
//     $(SpanishDiv[0]).css("margin-right",30);
// }



/* Create container to hold Spanish symbols & frame titles */

// const spanishFrameTitle = $('<p></p>')
//     .addClass('spanish-title')
//     .text('  ESPAÑOL');

// const spanishTitleContainer = $('<div></div>')
//     .addClass('passage-frames')
//     .append(spanishFrameTitle);

// const spanishPassage = $('.thePassage .spanish').prepend(spanishTitleContainer);



/* Create container to hold English symbols & frame titles */

// const englishFrameTitle = $('<p></p>')
//     .addClass('english-title')
//     .text('  ENGLISH');

// const englishTitleContainer = $('<div></div>')
//     .addClass('passage-frames')
//     .append(englishFrameTitle);

// const englishPassage = $('.thePassage .english').prepend(englishTitleContainer);

/* Align radio buttons with answer content */
const answers = $('.optionContainer').css('display', 'flex').css('align-items', 'center');



/* Increase spacing between question content and numContainer line */
const table = $('table[class="structure layout8vertical"]').css('margin-top', '15px');