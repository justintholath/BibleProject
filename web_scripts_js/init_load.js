function Introductionfn() {
	localStorage.removeItem("jbsb_v11_header_table");
	localStorage.removeItem("jbsb_v11_bottom_table");
	localStorage.removeItem("jbsb_v11_body_text");
	localStorage.removeItem("jbsb_v11_coordinates");
	localStorage.removeItem("jbsb_v11_foption");
    var x = '<table><tr>';
    x += ' <td class="c50" onclick="story_resume(0)">Go to Story</td>';
    x += ' <td class="c50" onclick="chapter_resume()">Go to Bible</td>';
    x += '</tr></table>';
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
return '<h1>Introduction</h1><p>This application provides two features<br></p><h2>Feature 1</h2><p>Read the word of God as a story but in original verses. This skips through the difficult passages, which are difficult to understand for a first time reader.</p><table><tr><td class="c50" onclick="story_resume(1)">Concise Version</td><td class="c50" onclick="story_resume(2)">Detailed Version</td></tr></table><h2>Feature 2</h2><p>This allows you to read KJV in Modern English. This is not a new version. This a layer applied on top of KJV to make it readable. In the option tab you can tick the KJM with delta option to see the exact changes made.</p><p>In addition, use the options tab to use a few good parallel bibles available in public domain. My belief is that the word of God should not be copyrighted or commercially used</p><table><tr><td class="w50"></td><td class="c50" onclick="chapter_resume()">Go to Bible</td></tr></table>';
};
function help_bible() {
return "<h1>Help</h1><h2>Navigation</h2><h3>Go to a different book</h3><p>The cell on the top left corner of the header table displays the current book in the bible that you are reading. Click this cell to choose a different book to read. This will display a table of books. The order is dependent on your option settings. Clicking  a new book will automatically take you to the first chapter. It will also open the chapter table if you would like to go to another chapter. If not, you can click Close Table</p><h3>Go to a different chapter in the same book</h3><p>The second cell from the top left corner of the header table displays the chapter number you are reading. Click this cell to choose a different chapter to read.</p><h3>Scroll down to a different verse</h3><p>The third cell from the top left corner of the header table displays the number of verses in the current chapter. Click this cell to scroll down to a different verse.</p>";
};

