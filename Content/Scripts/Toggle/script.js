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

function rearrange(colType, option) {
    const col = $(colType);
    const children = col.children();
    const newChildren = separateSpanishEnglish(children, option);
    $(col).append(newChildren);
}

function addButton() {        
    const englishButton = $("<button></button>")
        .addClass('button_click')
        .text('English')
        .click(switchLang);

    const spanishButton = $("<button></button>")
        .addClass('button')
        .text('Español')
        .click(switchLang);
    
    const bothButton = $("<button></button>")
        .addClass('button')
        .text('Both')
        .click(switchLang);
        
    const buttons = $("<div></div>")
        .addClass('buttons')
        .append(englishButton)
        .append(spanishButton)
        .append(bothButton);

    const notesButton = $('.notes');
    $(buttons).insertBefore(notesButton);
}

function switchLang() {
    const currSelect = $(".button_click");

    if ($(currSelect).html() === $(this).html()) {
        return;
    }

    $(currSelect).removeClass("button_click").addClass("button");
    $(this).addClass("button_click").removeClass("button");

    if ($(this).html() === "Both") {
        $(".english").show();
        $(".english-answer").show();

        $(".spanish").show();
        $(".spanish-answer").show();
    } else if ($(this).html() === "English") {
        $(".english").show();
        $(".english-answer").show();

        $(".spanish").hide();
        $(".spanish-answer").hide();
    } else if ($(this).html() === "Español") {
        $(".spanish").show();
        $(".spanish-answer").show();

        $(".english").hide();
        $(".english-answer").hide();
    }
}

function identifyTitle() {
    const langDivider = $('h2 .languagedivider');
    if (langDivider.length === 1) {
        $('.thePassage h2 p').remove();
        const passage = $('.thePassage h2').contents();
        console.table(passage);

        const titles = [];   
        let wasEmpty = true;
        let idx;

        if (passage.length > 3) {
            for (let content of passage) {
                if (content.textContent.trim() || content.textContent === '&nbsp;') {
                    if (!wasEmpty) {
                        console.log(titles[idx]);
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

const passageName = '.thePassage .padding';
const questionName = '.stemContainer';
const choiceName = '.optionContent';

if (($(passageName)).length !== 0) {
    rearrange(passageName);
} else {
    const table = $('.bigTable');
    table.addClass("center");

    const questions = $('.theQuestions');
    questions.css("width", '80%');
}

if (questionName) {
    rearrange(questionName);
}

const choices = $(choiceName);
if (choices) {
    choices.addClass("number");
    const td = $(".tableItem tbody tr td .languagedivider");
    if (td) {
        td.prev().addClass("spanish-answer");
        td.next().addClass("english-answer");
    }
}

const options = $(".optionContent .languagedivider");
if (options) {
    options.prev().addClass("spanish-answer");
    options.next().addClass("english-answer");
}

const th = $(".tableItem thead tr th .languagedivider");
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

const answerContainer = $('.answerContainer .tableItem');
if (answerContainer) {
    const goal = $('.answerContainer');
    const width = $(goal).width();
    $(answerContainer).css("width", width);
}



/* Hide Spanish content */
$(".spanish").hide();
$(".spanish-answer").hide();

$(".languagedivider").remove();
addButton();
$(".button").click(switchLang);



/* ----- The following code adds formatting to the toggle buttons ----- */

/* Apply border properties to unselected toggle buttons */
$('.buttons button:contains("English")').addClass('english-button');
$('.buttons button:contains("Both")').addClass('both-button');



/* ----- The following code adds hamburger icons to all columns and aligns the icon in the Questions column with the item number ----- */

/* Container to hold item # and hamburger icon */
const numContainer = $('<div class="num-container"></div>');
const questionNumber = $('.questionNumber');
if (questionNumber) {
    $(numContainer).append(questionNumber);     // adds item # to container
}

const hamburgerIcon = $('<div class="hamburger"></div>');
$(numContainer).append(hamburgerIcon);          // creates div for hamburger icon, adds div to container

const questions = $('.theQuestions');
$(questions).prepend(numContainer);              // add container to questions



/* Eliminate extra spacing in titles */
if ($('.spanish h2 p[lang="es-mx"]')) {
    $('.spanish h2 p[lang="es-mx"]').remove();
}

/* Change top padding to better align content */
const selectedButton = $('.button_click');
if ($(selectedButton).text() !== 'Both') {
    $('.english').css('padding-top', '15px');
    $('.spanish').css('padding-top', '15px');
}

/* Remove itemToolsBreak element if it exists to fix spacing */
$('.itemToolsBreak').remove();



/* Resize questions column based on if there is a passage column or not */
const passage = $('.thePassage').html();
if (!passage) {
    $('.theQuestions')
        .removeAttr('style')
        .css('width', '100%');
}



/* Align radio buttons with answer content */
const answers = $('.optionContainer').css('display', 'flex').css('align-items', 'center');
const answerContent = $(answers).find('p');
$.each(answerContent, (idx, val) => {
    $(answerContent).css('margin-top', '-29px');
});




/* ----- The following code reformats tables that appear in the Questions column ----- */

/* Remove align attribute from bigTable table element */
$('.bigTable td').attr('align', '');



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
