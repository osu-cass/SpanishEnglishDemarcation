const BOTH_BUTTON_TEXT = "Ambos\nBoth";
const ENGLISH_BUTTON_TEXT = "English";
const SPANISH_BUTTON_TEXT = "Español";

//query string constants
const ENGLISH = "EN";
const SPANISH = "SP";
const BOTH = "BOTH";

function separateSpanishEnglish(contents, option) {
  // Initialize Spanish & English text arrays //
  const spanish = [];
  const english = [];

  // Sort content into arrays //
  $.each(contents, (idx, val) => {
    if (val.lang === "es-mx") {
      spanish.push(val);
    } else {
      english.push(val);
    }
  });

  // Create div element for Spanish text array //
  const spanishBlock = $("<div></div>");
  $.each(spanish, (idx, val) => {
    spanishBlock.append(val);
  });

  if (option) {
    spanishBlock.addClass("spanish-answer");
  } else {
    spanishBlock.addClass("spanish");
  }

  // Create div element for English text array //
  const englishBlock = $("<div></div>");
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

function rearrange(colType, option) {
  const col = $(colType);
  const children = col.children();
  const newChildren = separateSpanishEnglish(children, option);
  $(col).append(newChildren);
}

function addButton() {
  const spanishButton = $("<button></button>")
    .addClass("button")
    .addClass(SPANISH)
    .text(SPANISH_BUTTON_TEXT)
    .click(onLangClicked)
    .attr("id", "spanish-button");

  const englishButton = $("<button></button>")
    .addClass("button_click")
    .addClass(ENGLISH)
    .text(ENGLISH_BUTTON_TEXT)
    .click(onLangClicked)
    .attr("id", "english-button");

  const bothButton = $("<button></button>")
    .addClass("button")
    .addClass(BOTH)
    .text(BOTH_BUTTON_TEXT)
    .click(onLangClicked)
    .attr("id", "both-button");

  const buttons = $("<div></div>")
    .addClass("buttons")
    .append(spanishButton)
    .append(englishButton)
    .append(bothButton);

  const notesButton = $(".notes");
  $(buttons).insertBefore(notesButton);
}

function onLangClicked() {
  let currSelect = $(".button_click");
  //if the current language is the same as the one we just clicked don't do any thing.
  if ($(currSelect).html() === $(this).html()) {
    return;
  }

  changeLang($(this));
}

function changeLang(toSelect) {
  const selected = $(".button_click");

  $(selected)
    .removeClass("button_click")
    .addClass("button");
  $(toSelect)
    .addClass("button_click")
    .removeClass("button");

  switchLang($(toSelect).text());
}

let currLang = $(".button_click").text();
function switchLang(lang) {
  if (lang === BOTH_BUTTON_TEXT) {
    $(".english").show();
    $(".english-answer").show();
    $(".english").addClass("line");
    $(".english-answer").addClass("line");
    $(".spanish").show();
    $(".spanish-answer").show();
    
    //show the spanish graphic if both is selected.
    $("#graphic-en").addClass("hidden");
    $("#graphic-sp").removeClass("hidden");
    setPreviousLinkSearch(`?lang=${BOTH}`);
    setNextLinkSearch(`?lang=${BOTH}`);
  } else if (lang === ENGLISH_BUTTON_TEXT) {
    $(".english").show();
    $(".english-answer").show();
    $(".english").removeClass("line");
    $(".english-answer").removeClass("line");
    $(".spanish").hide();
    $(".spanish-answer").hide();

    //Show english graphic if english is selected.
    $("#graphic-sp").addClass("hidden");
    $("#graphic-en").removeClass("hidden");
    setPreviousLinkSearch(`?lang=${ENGLISH}`);
    setNextLinkSearch(`?lang=${ENGLISH}`);
  } else if (lang === SPANISH_BUTTON_TEXT) {
    $(".spanish").show();
    $(".spanish-answer").show();
    $(".english").removeClass("line");
    $(".english-answer").removeClass("line");
    $(".english").hide();
    $(".english-answer").hide();

    //show spanish graphic if spanish is selected.
    $("#graphic-en").addClass("hidden");
    $("#graphic-sp").removeClass("hidden");
    setPreviousLinkSearch(`?lang=${SPANISH}`);
    setNextLinkSearch(`?lang=${SPANISH}`);
  }
}

function setContent() {
  let search = window.location.search;
  if (!search) {
    window.location.search = `?lang=${SPANISH}`;
    search = window.location.search;
  } else {
    //add search string to next item
    let split;
    if (search) {
      split = search.split("=");
    }
    let lang;
    if (split && split.length > 1) {
      lang = split[1];
    }
    if (lang) {
      if (lang === SPANISH) {
        changeLang($(`.${SPANISH}`));
      } else if (lang === BOTH) {
        changeLang($(`.${BOTH}`));
      }
    }
  }
}

$(document).ready(onload());
//sets the next and previous links based on current query string.
function onload() {
  const search = window.location.search;
  if (search) {
    setPreviousLinkSearch(search);
    setNextLinkSearch(search);
  }
}

function setNextLinkSearch(search) {
  let nextLink = $("#next-item").attr("href");
  if (nextLink) {
    nextLink = nextLink.split("?")[0];
    $("#next-item").attr("href", `${nextLink}${search}`);
  }
}

function setPreviousLinkSearch(search) {
  let previousLink = $("#previous-item").attr("href");
  if (previousLink) {
    previousLink = previousLink.split("?")[0];
    $("#previous-item").attr("href", `${previousLink}${search}`);
  }
}

const passageName = ".thePassage .padding";
const questionName = ".stemContainer";
const choiceName = ".optionContent";

if ($(passageName).length !== 0) {
  rearrange(passageName);
} else {
  const table = $(".bigTable");
  table.addClass("center");

  const questions = $(".theQuestions");
  questions.css("width", "80%");
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
    if (preHtml !== "&nbsp;") {
      $(val).addClass("spanish-answer");
    }
  });

  $.each(next, (idx, val) => {
    const nextHtml = $(val).html();
    if (nextHtml !== "&nbsp;") {
      $(val).addClass("english-answer");
    }
  });
}

const answerContainer = $(".answerContainer .tableItem");
if (answerContainer) {
  const goal = $(".answerContainer");
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
$('.buttons button:contains("English")').addClass("english-button");
$('.buttons button:contains("Both")').addClass("both-button");

/* ----- The following code adds hamburger icons to all columns and aligns the icon in the Questions column with the item number ----- */

/* Container to hold item # and hamburger icon */
const numContainer = $('<div class="num-container"></div>');
const questionNumber = $(".questionNumber");
if (questionNumber) {
  $(numContainer).append(questionNumber); // adds item # to container
}

const hamburgerIcon = $('<div class="hamburger"></div>');
$(numContainer).append(hamburgerIcon); // creates div for hamburger icon, adds div to container

const questions = $(".theQuestions");
$(questions).prepend(numContainer); // add container to questions

/* Eliminate extra spacing in titles */
if ($('.spanish h2 p[lang="es-mx"]')) {
  $('.spanish h2 p[lang="es-mx"]').remove();
}

/* Change top padding to better align content */
const selectedButton = $(".button_click");
if ($(selectedButton).text() !== "Both") {
  $(".english").css("padding-top", "15px");
  $(".spanish").css("padding-top", "15px");
}

/* Remove itemToolsBreak element if it exists to fix spacing */
$(".itemToolsBreak").remove();

/* Resize questions column based on if there is a passage column or not */
const passage = $(".thePassage").html();
if (!passage) {
  $(".theQuestions")
    .removeAttr("style")
    .css("width", "80%")
    .css("margin-left", "auto");
}

/* Align radio buttons with answer content */
const answers = $(".optionContainer")
  .css("display", "flex")
  .css("align-items", "baseline");
const answerContent = $(answers).find("p");
$.each(answerContent, (idx, val) => {
  $(answerContent).css("margin-top", "-29px");
  const answerImgs = $(val).children();
  if ($(answerImgs).is("img")) {
    $(answerImgs).css("margin-top", "-5px");
  }
});

/* ----- The following code reformats tables that appear in the Questions column ----- */

/* Remove align attribute from bigTable table element */
$(".bigTable td").attr("align", "");

/* Change inline font in tables to a larger serif font */
const answerHeadings1 = $('table[class="tableItem"] thead tr th p');
$.each(answerHeadings1, (idx, val) => {
  $(val)
    .css("font-family", "")
    .css("font-family", "'Times New Roman', Times, serif !important")
    .css("font-size", "")
    .css("font-size", "18px");
});
const answerHeadings2 = $('table[class="newtable"] thead tr th p');
$.each(answerHeadings2, (idx, val) => {
  $(val)
    .css("font-family", "")
    .css("font-family", "'Times New Roman', Times, serif !important")
    .css("font-size", "")
    .css("font-size", "18px");
});

const answerBodyParagraphs1 = $('table[class="tableItem"] tbody tr td p');
$.each(answerBodyParagraphs1, (idx, val) => {
  $(val)
    .css("font-family", "")
    .css("font-size", "")
    .addClass("table-text");
});
const answerBodyParagraphs2 = $('table[class="newtable"] tbody tr td p');
$.each(answerBodyParagraphs2, (idx, val) => {
  $(val)
    .css("font-family", "")
    .css("font-size", "")
    .addClass("table-text");
});

/* Change vertical alignment of input fields to middle */
const inputBoxContainer = $('table[class="tableItem"] tbody tr td');
$.each(inputBoxContainer, (idx, val) => {
  $(val).css("vertical-align", "middle");
});

/* Fix spacing for wide table titles */
const wideTableTitles = $(
  'table[class="tableItem"] thead tr th[colspan="3"] p'
);
$.each(wideTableTitles, (idx, val) => {
  if ($(val).html() === "&nbsp;") {
    $(val).remove();
  }
});

var img = $(".thePassage img");
if ($(img[0]).width() > 300) {
  img.addClass("img");
}

setContent();

const radioButton = $(".option");
if (radioButton) {
  radioButton.css("width", "25px").css("height", "25px");
  $.each(radioButton, (idx, val) => {
    let label = $("<label></label>");
    let char = $("<span></span>");
    char.text($(val).attr("value"));
    char
      .css("width", "20px")
      .css("height", "20px")
      .css("font-size", "15px")
      .css("position", "absolute")
      .css("margin-left", "-20px");
    const prev = $(val).prev();
    label.append(val);
    label.append(char);
    label.insertAfter(prev);
  });
}



/* Handles loading of titles in correct locations based on what languages load onto the page and are changed to by the user */

const buttons = $('.buttons').children();
const spanishTitle = $('.thePassage h2[lang="es-mx"]');
let englishTitle = $('.thePassage h2')[1];

function loadTitles() {
  currLang = $('.button_click');
  if ($(currLang).hasClass(BOTH)) {
    $(spanishTitle).remove();                                                           // remove both titles from page
    $(englishTitle).remove();
    $('.thePassage .spanish').prepend(englishTitle).prepend(spanishTitle);              // place titles at top of passage column
    $('.thePassage h2 p').remove();                                                     // remove empty paragraph in heading
  } else {
    $(englishTitle).remove();                                                           // remove English title from top of page in case it's moved up there
    $('.thePassage .english').prepend(englishTitle);                                    // place English title at top of .english
    const headingParas = $('.thePassage h2').find('p');
    if ($(headingParas).length === 0) {                                                 // replace empty paragraph if removed
      $(englishTitle).append('<p>&nbsp;</p>')
    }
  }
}

// Event handler for when page loads with various language settings //
$(document).ready(() => {
  loadTitles();
});

// Event handler for when user changes to and from both languages
$(buttons).click(() => {
  loadTitles();
});
