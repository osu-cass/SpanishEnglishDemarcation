/* Creates passage with separated Spanish & English text blocks
 * @param {object} contents - children of a jQuery objects
 * @param {boolean} option - determines if the current content is an answer option
 */
function parseLangs(contents, option) {
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





/* Grabs column elements and sorts them
 * @param {object} colType - jQuery object of the passage or questions column
 * @param {boolean} option - determines if the current content is an answer option
 */
function sortContent(colType, option) {
    const col = $(colType);
    const colElems = col.children();
    const newColElems = parseLangs(colElems, option);
    $(col).append(newColElems);
}





/* Sorts column elements based on what kind of content is on the page */

// Sort passage content if passage exists //
const passage = $('.thePassage .padding');
if ($(passage).length !== 0) {                                  // sort passage content if passage exists
    sortContent(passage);
} else {                                                        // setup bigTable table
    const table = $('.bigTable').addClass('center');
}

// Sort questions content //
const stemContainer = $('.stemContainer');
if ($(stemContainer)) {
    sortContent(stemContainer);
}





/* Creates questions column and the tables it contains to organize content */

// Reformat questions if passage column doesn't exist //
if (!$('.thePassage').html()) {
    $('.theQuestions').css('width', '95%');               // change theQuestions element width
    $('.theQuestions table').css('width', '100%');
}

// Add answer choices in both languages if they exist //
const choices = $('.optionContent');
if (choices) {
    choices.addClass('number');

    // Apply classes to table headers by language //
    const headerLangDivider = $('.tableItem .languagedivider');
    if (headerLangDivider) {
        const spanishContent = headerLangDivider.prevAll();
        $.each(spanishContent, (idx, val) => {
            if ($(val).text() !== String.fromCharCode(160)) {
                $(val).addClass('spanish-answer');
            }
            else{
                $(val).remove();
            }
        });

        const englishContent = headerLangDivider.nextAll();
        $.each(englishContent, (idx, val) => {
            if ($(val).text() !== String.fromCharCode(160)) {
                $(val).addClass('english-answer');
            }
            else{
                $(val).remove();
            }
        });
    }

    // Apply classes to table cells by language //
    const cellLangDivider = $('.table-item tbody tr td .languagedivider');
    if (cellLangDivider) {
        cellLangDivider.prev().addClass('spanish-answer');     // add spanish-answer class to all Spanish answer cell contents
        cellLangDivider.next().addClass('english-answer');     // add english-answer class to all English answer cell contents
    }
}

// Add .optionContent options in both languages //
const genLangDivider = $('.optionContent .languagedivider');
if (genLangDivider) {
    genLangDivider.prev().addClass('spanish-answer');        // add spanish-answer class to all Spanish answer content
    genLangDivider.next().addClass('english-answer');        // add english-answer class to all English answer content
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





/* Creates container to hold item # and hamburger icon */

const numContainer = $('<div class="num-container"></div>');
const questionNumber = $('.questionNumber');
if (questionNumber) {
    $(numContainer).append(questionNumber);     // adds item # to container
}

var questions = $('.theQuestions');
$(questions).prepend(numContainer);              // add container to questions


const hamburgerIcon = $('<div class="hamburger-icon"></div>');
$(numContainer).append(hamburgerIcon);          // creates div for hamburger icon, adds div to container

$(questions).prepend(numContainer);              // add container to questions






/* Creates container for legend */

const spanishLegend = $('<div></div>')
    .addClass('spanish-legend')
    .text('Español');

const englishLegend = $('<div></div>')
    .addClass('english-legend')
    .text('English');

const legendContainer = $('<div></div>')
    .addClass('legend-container')
    .append(spanishLegend)
    .append(englishLegend);

$(legendContainer).insertAfter(numContainer);





/* Eliminate extra spacing in titles */
if ($('.spanish h2 p[lang="es-mx"]')) {
    $('.spanish h2 p[lang="es-mx"]').remove();
}




$('.itemToolsBreak').remove();


var img=$('.thePassage img');
if ($(img[0]).width()>300){
    img.addClass("img");
}



/* Realign answer content to line up with radio button if answer is not just mathematical expressions */
const answerOptions = $('.optionContent');
$.each(answerOptions, (idx, val) => {                           // check each answer option to find out if the content needs to be realigned
    if ($(val).children().length > 1) {                             // if there is more than one paragraph within the answer option (a.k.a. not a mathematical expression)
        $(val).css('margin', '-5px 5px 0');                             // change margin to line content up to radio button
    }
});
