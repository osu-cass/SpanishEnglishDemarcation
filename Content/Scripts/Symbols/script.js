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
function sortColumns() {
    // Sort passage content if passage exists //
    const passage = $('.thePassage .padding');
    if ($(passage).length !== 0) {                                  // sort passage content if passage exists
        sortContent(passage);
    } else {                                                        // setup bigTable table
        const table = $('.bigTable').addClass('center');
    }

    // Sort questions content //
    const questions = $('.stemContainer');
    if ($(questions)) {
        sortContent(questions);
    }
}



/* Creates questions column and the tables it contains to organize content */
function createQuestions() {
    // Reformat questions if passage column doesn't exist //
    if (!$('.thePassage').html()) {
        $('.theQuestions').css('width', '100%');               // change theQuestions element width
        $('.theQuestions table').css('width', '100%');
    }

    // Add answer choices in both languages if they exist //
    const choices = $('.optionContent');
    if (choices) {
        choices.addClass('number');

        // Apply classes to table headers by language //
        const headerLangDivider = $('.table-item thead tr th .languagedivider');
        if (headerLangDivider) {
            const spanishContent = headerLangDivider.prevAll();
            $.each(spanishContent, (idx, val) => {
                if ($(val).text() !== '&nbsp;') {
                    $(val).addClass('spanish-answer');
                }
            });

            const englishContent = headerLangDivider.nextAll();
            $.each(englishContent, (idx, val) => {
                if ($(val).text() !== '&nbsp;') {
                    $(val).addClass('english-answer');
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
}



// /*Change width of answer container element */
// var answerContainer = $('.answerContainer .tableItem');
// if (answerContainer !== null) {
//     var goal = $('.answerContainer');
//     var width = $(goal).width();
//     $(answerContainer).css("width", width);
// }



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



/* Creates container for legend */
function createLegendContainer() {
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

    const numContainer = $('.num-container');
    $(legendContainer).insertAfter(numContainer);
}



sortColumns();
createQuestions();
fixTableFont();
wrapNumHamburger();
createLegendContainer();

/* Eliminate extra spacing in titles */
if ($('.spanish h2 p[lang="es-mx"]')) {
    $('.spanish h2 p[lang="es-mx"]').remove();
}