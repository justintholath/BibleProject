function Introductionfn() {
	//localStorage.removeItem("jbsb_v11_header_table");
	//localStorage.removeItem("jbsb_v11_bottom_table");
	//localStorage.removeItem("jbsb_v11_body_text");
	//localStorage.removeItem("jbsb_v11_coordinates");
	//localStorage.removeItem("jbsb_v11_foption");
    var x = '<table><tr>';
    x += '<td class="c25" onclick="chapter_resume()">1. Bible</td>'
    x += '<td class="c25" onclick="story_resume(1)">2. ' + story_names(1) + '</td>'
    x += '<td class="c25" onclick="story_resume(2)">3. ' + story_names(2) + '</td>'
    x += '<td class="c25" onclick="option_display()">Settings</td>'
    x += '</tr></table>'
    document.getElementById("hdr_tbl").innerHTML = x;
    document.getElementById("btm_tbl").innerHTML = "";
    document.getElementById("disp_tbl").style.display = 'none';
    document.getElementById("select_option").style.display = 'none';
    document.getElementById("disp_txt").innerHTML = intro_text();
};

function disp_bible_help() {
    hide_select_option();
    var x = '<br><br><table><tr>';
    x += '<td class="wl80"></td>';
    x += '<td class="g20" onclick="hide_results()"><b>Close Help</b></td>'
    x += '</tr></table>'
    x += help_bible();
    x += '<table><tr>';
    x += '<td class="w80"></td>';
    x += '<td class="g20" onclick="hide_results()"><b>Close Help</b></td>'
    x += '</tr></table>'
    
    document.getElementById("srch_results").innerHTML = x;
    document.getElementById("srch_results").style.display = 'block';
    window.location.href = ("#Top");
};

function intro_text() {
var x = '<h2>Introduction</h2><p>This application provides three features</p>'
x += '<h3>1. Parallel Bible</h3><p>Choose between various non copyrighted Bible versions. On the Bible page, go to settings to choose the versions</p>'
x += '<b>BSB</b> - The Berean Standard Bible (BSB) is a balance between literal accuracy (word-for-word) and readability (thought-for-thought). It uses Masoretic Text for the Old Testament and the Nestle-Aland/UBS critical text for the New Testament <br>'
x += "<b>WEB</b> - The World English Bible (WEB) is an update and revision of the American Standard Version (ASV) of 1901. The main goal was to take the ASV's literal translation style and modernize its archaic language. Old Testament: Based on the Masoretic Text (Biblia Hebraica Stuttgartensia). New Testament: Primarily based on the Greek Majority Text, though the editors consulted critical texts <br>"
x += '<b>KJV</b> - The King James Version. Old Testament: Primarily used the Masoretic Text (Hebrew). New Testament: Primarily used the Textus Receptus (Received Text) series of Greek manuscripts<br>'
x += "<b>YLT</b> - Young's Literal Translation (YLT) is a distinctive English translation of the Bible renowned for its rigorous and uncompromising commitment to literal word-for-word rendering of the original Hebrew, Aramaic, and Greek texts. Robert Young (1822–1888). Young aimed to reproduce the original language's structure, syntax, and word choice as precisely as possible, even if it resulted in awkward or unidiomatic English.<br>"
x += "<b>LXX</b> - The Septuagint (LXX) is an ancient Greek translation of the Hebrew Bible (the Old Testament). The vast majority of the Old Testament quotations found in the New Testament (by Jesus, Paul, and other writers) are taken directly from the LXX, even where the LXX version differs from the Hebrew text. LXX has only Old Testament"

x += '<h3>2. ' + story_names(1) + '</h3><p>Work in Progress. Read the Bible as a story but in original verses. '
x += 'This skips through the difficult passages, which are difficult to understand for a first time reader</p>'

x += '<h3>3. ' + story_names(2) + '</h3><p>Work in Progress. These are <br>'
x += '&emsp;&bull; Miscellaneous topics<br>'
x += '&emsp;&bull; Bible verses to read during various situations</p>'

return x;
};

function help_bible() {
return "<h1>Help</h1><h2>Navigation</h2><h3>Go to a different book</h3><p>The cell on the top left corner of the header table displays the current book in the bible that you are reading. Click this cell to choose a different book to read. This will display a table of books. Clicking  a new book will automatically take you to the first chapter. It will also open the chapter table if you would like to go to another chapter. If not, you can click Close Table</p><h3>Go to a different chapter in the same book</h3><p>The second cell from the top left corner of the header table displays the chapter number you are reading. Click this cell to choose a different chapter to read.</p>";
};

