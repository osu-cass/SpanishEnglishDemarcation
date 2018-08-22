function fixTableFont() {
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
}

fixTableFont();