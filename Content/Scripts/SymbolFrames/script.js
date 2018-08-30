/* Creates passage with separated Spanish & English text blocks
 * @param {object} contents - children of a jQuery objects
 * @param {boolean} option - determines if the current content is an answer option
 */
function identifyTitle() {
    const langDivider = $('h2 .languagedivider');
    if (langDivider.length === 1) {
        $('.thePassage h2 p').remove();
        const passage = $('.thePassage h2').contents();

        const titles = [];   
        let wasEmpty = true;
        let idx;

        if (passage.length > 3) {
            for (let content of passage) {
                if (content.textContent.trim() || content.textContent === '&nbsp;') {
                    if (!wasEmpty) {
                        titles[idx] += content.textContent;
                    } else {
                        wasEmpty = false;
                        titles.push(content.textContent);
                        idx = titles.indexOf(content.textContent);
                    }
                } else {
                    wasEmpty = true;
                }
            }
        } else {
            for (let content of passage) {
                if (content.textContent.trim()) {
                    titles.push(content.textContent);
                }
            }
        }

        console.table(titles);
        return titles.map(val => (`<h2>${val}</h2>`));
    }

    return false;
}
function separateSpanishEnglish(contents, option) {
    const spanish = [];
    const english = [];

    const titles = identifyTitle();
    if(titles) {
        spanish.push(titles[0]);
        english.push(titles[1]);
        $(".thePassage h2").remove();
    }

    $.each(contents, (idx, val) => {
        if (val.lang === 'es-mx' && !($(val).is('h2'))) {
            spanish.push(val);
        } else if (!($(val).is('h2'))) {
            english.push(val);
        }
    });

    const spanishBlock = $('<div></div>');
    $.each(spanish, (idx, val) => {
        $(spanishBlock).append(val);
    });

    if (option) {
        $(spanishBlock).addClass("spanish-answer");
    } else {
        $(spanishBlock).addClass("spanish");
    }

    const englishBlock = $('<div></div>');
    
    $.each(english, (idx, val) => {
        $(englishBlock).append(val);
    });

    if (option) {
        $(englishBlock).addClass("english-answer");
    } else {
        $(englishBlock).addClass("english");
    }

    const newPassage = $('<div></div>');
    newPassage.append(spanishBlock).append(englishBlock);

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

var img=$('.thePassage img');
if ($(img[0]).width()>300){
    img.addClass("img");
}

if (!$('.thePassage').html()) {
    $('.theQuestions').css('width', '80%');               // change theQuestions element width
    $('.theQuestions table').css('width', '80%');
}

/* Creates frame title div elem
 * @param {string} lang - language of title
 */
function createFrameTitle(lang) {
    // Create paragraph element to contain title and symbol //
    let frameTitle;
    if (lang === 'spanish') {
        frameTitle = $('<p class="spanish-title">  ESPAÑOL</p>');
    } else {
        frameTitle = $('<p class="english-title">  ENGLISH</p>');
    }

    // Create div element to contain paragraph //
    const titleContainer = $('<div class="frames"></div>').append(frameTitle);

    return titleContainer;
}


/* Create containers to hold Spanish symbols & frame titles */

const passageSpanishTitle = createFrameTitle('spanish');
$('.thePassage .spanish').prepend(passageSpanishTitle);

const questionsSpanishTitle = createFrameTitle('spanish');
$('.theQuestions .spanish').prepend(questionsSpanishTitle);



/* Create containers to hold English symbols & frame titles */

const passageEnglishTitle = createFrameTitle('english');
$('.thePassage .english').prepend(passageEnglishTitle);

const questionsEnglishTitle = createFrameTitle('english');
$('.theQuestions .english').prepend(questionsEnglishTitle);



/* Align radio buttons with answer content */
$('.optionContainer').css('display', 'flex').css('align-items', 'baseline');



/* Increase spacing between question content and numContainer line */
$('table[class="structure layout8vertical"]').css('margin-top', '15px');



/* Hide empty paragraphs in wide table heading to improve spacing */
const wideTableHeadings = $('.tableItem thead tr th[colspan="3"] p');
$.each(wideTableHeadings, (idx, val) => {
    if ($(val).html() === '&nbsp;') {
        $(val).css('height', '0');
    }
});



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