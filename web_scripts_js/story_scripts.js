function story_open(lvl, sect_no, chap_no) {
	if (sect_no > section_max(lvl)) {alert("invalid section")
	};
    if (chap_no > section_chapter_max(lvl, sect_no)) {alert("invalid chapter")
	};
    story_hdr(lvl, sect_no, chap_no);
    story_text(lvl, sect_no, chap_no);

    if (lvl == 2) {
        where_am_i = "t"
        topic_section = sect_no
        topic_chapter = chap_no
    } else {
        where_am_i = "s"
        story_section = sect_no
        story_chapter = chap_no
    };
    set_co_ordinates()
};

function story_hdr(lvl, sect_no, chap_no) {
    var trlr_class = 'class="c25"'
    if (lvl == 2) {trlr_class = 'class="t25"';};
	var nextchap = chap_no + 1;
    var nextsect = sect_no;
	var prevchap = chap_no - 1;
    var prevsect = sect_no;
	if  (prevchap <= 0 && prevsect > 1) {
        prevsect -= 1
        prevchap = section_chapter_max(lvl, prevsect)
    };
	if  (nextchap > section_chapter_max(lvl, sect_no)) {
        if (sect_no >= section_max(lvl)) {
            nextchap = 999
        } else {
            nextchap = 1
            nextsect += 1
        };
    };

	var y = '<table><tr>';
    y += ' <td ' + trlr_class + ' onclick="story_books(' + lvl + ',' + sect_no + ',' + sect_no + ',' + chap_no + ')">List</td>';
    y += ' <td ' + trlr_class + 'onclick="display_story_menu()">Settings</td>';
    if (sect_no == 1 && chap_no == 1) {
		y += ' <td class="v25"></td>';
	}
	else {
        y += ' <td ' + trlr_class + ' onclick="story_open(' + lvl + ',' + prevsect + ',' + prevchap + ')">Prev</td>';
    };
    if  (nextchap == 999) {
        y += ' <td class="v25"></td>';
    }
    else {
        y += ' <td ' + trlr_class + ' onclick="story_open(' + lvl + ',' + nextsect + ',' + nextchap + ')">Next</td>';
    };
    y += '</tr></table>';
    document.getElementById("hdr_tbl").innerHTML = y;
};

function display_story_menu() {
    var x = '<table><tr>';
    x += '<td class="c25" onclick="Navigate(1)">Home</td>';
    x += '<td class="c25" onclick="Navigate(3)">Bible</td>'
    x += '<td class="c25" onclick="Navigate(4)">Help</td>';
    x += '<td class="c25" onclick="ClosePop()">Close</td>';
    x += '</tr></table>';
    x += '<br> Choose the version <br><br> '
    x += '<table><tr>';
    x += ' <td class="c25" onclick="Read_story(' + "'b'" + ')">BSB</td>';
    x += ' <td class="c25" onclick="Read_story(' + "'w'" + ')">WEB</td>';
    x += ' <td class="c25" onclick="Read_story(' + "'k'" + ')">KJV</td>';
    x += ' <td class="c25" onclick="Read_story(' + "'y'" + ')">YLT</td>';
    x += '</tr></table>';
    x += '<br>'
    /*    alert(x); */
    txt_modal.innerHTML = x;
    modal.style.display = "block";
};

function Read_story(in_val) {
    story_version = in_val
    ClosePop()
    full_resume()
};

async function story_text(lvl, sect_no, chap_no) {
    var vlist = chapter_verses(lvl, sect_no, chap_no)
    var verselist = ""
    var m = 0
    var x = '<br><h2 style="text-align: center;">' + sect_no + ". " + section_header(lvl, sect_no) + "</h2>";
    x += "<h3>" + chap_no + ". " + section_chapter(lvl, sect_no, chap_no) + "</h3>";
    var prevchap = "";
    var currchap = "";

    kjvyes = 0;
    webyes = 0;
    yltyes = 0;
    let sumV = "bsb";
    bsbyes = 1;
    if  (story_version == "w") {sumV = "web"; bsbyes = 0; webyes = 1;};
    if  (story_version == "k") {sumV = "kjv"; bsbyes = 0; kjvyes = 1;};
    if  (story_version == "y") {sumV = "ylt"; bsbyes = 0; yltyes = 1;};

    verse_str = vlist
    verselist = verse_str.split("|");
    m = verselist.length;
    x += "<p>"
    for (i=0; i< m; i++) {
        currchap = verselist[i].substring(0,5)
        if (currchap !== prevchap) {
            x += '<h4>' + chapter_xpnd(currchap) + "</h4>";
            prevchap = currchap;
        };
        if  (verselist[i].length == 8) {
            jbk = parseInt(verselist[i].substring(0,2))
            jcp = parseInt(verselist[i].substring(2,5))
            jve = parseInt(verselist[i].substring(5,8))
            x += '<font style="color:blue; cursor: pointer;">['
            x += verse_number_click(jbk, jcp, jve) + "] </font>"
            await pop_chap(sumV, jbk, jcp)
            if (webyes == 1) {
                x += web_chap[jve - 1].substring(8);
            } else if (bsbyes == 1) {
                x += bsb_chap[jve - 1].substring(8);
            } else if (kjvyes == 1) {
                x += kjv_chap[jve - 1].substring(8);
            } else if (yltyes == 1) {
                x += ylt_chap[jve - 1].substring(8);
            } else {
                x += web_chap[jve - 1].substring(8);
            };
            x += '<br><br>';
            continue;
        };
        if  (verselist[i].length > 8 && verselist[i].length <= 11) {
            jbk = parseInt(verselist[i].substring(0,2))
            jcp = parseInt(verselist[i].substring(2,5))
            jve = parseInt(verselist[i].substring(5,8))
            kve = parseInt(verselist[i].substring(8))
            await pop_chap(sumV, jbk, jcp)
            for (vi = jve; vi <= kve; vi++) {
                x += '<font style="color:blue; cursor: pointer;">['
                x += verse_number_click(jbk, jcp, vi) + "] </font>"
                if (webyes == 1) {
                    x += web_chap[vi - 1].substring(8);
                } else if (bsbyes == 1) {
                    x += bsb_chap[vi - 1].substring(8);
                } else if (kjvyes == 1) {
                    x += kjv_chap[vi - 1].substring(8);
                } else if (yltyes == 1) {
                    x += ylt_chap[vi - 1].substring(8);
                } else {
                    x += web_chap[vi - 1].substring(8);
                };
            };
            x += '<br><br>';
            continue;
        };
    };
	x += "<br><br><br><br><br></p>"

    document.getElementById("disp_txt").innerHTML = x;
    hide_disp_tbl();
    hide_results()
    window.scrollTo(0, 0)
};


function story_books(lvl, curr_sect, sect_no, chap_no) {
    var tble_class = 'class="c50"'
    if (lvl == 2) {tble_class = 'class="t50"';};
    var m = section_max(lvl)
    var i = 0;
    var x = '<br><br><table><tr><td class="a50"><b>Sections</b></td><td class="g50" onclick="hide_disp_tbl()">Close Table</td></tr>';
    for (i=1; i< sect_no; i++) {
        x += '<tr>';
        x += ' <td ' + tble_class + ' id="s' + i 
        x += '" onclick="story_books(' + lvl + ',' + curr_sect + ',' + i + ',' + chap_no + ')">' 
        x += section_header(lvl, i) + '</td>';
        x += ' <td class="w50"></td>';
        x += '</tr>';
    };
	x += '<tr>';
    x += ' <td class="v50"><b>' + section_header(lvl, sect_no) + '</b></td>';
	x += ' <td class="v50"><b> Chapters</b></td>';
	x += '</tr>';
    var chapmax = section_chapter_max(lvl, sect_no);
    var j = 1;
    for (i=sect_no + 1; i<= m; i++) {
        x += '<tr>';
        x += ' <td class="c50" onclick="story_books(' + lvl + ',' + curr_sect + ',' + i + ',' + chap_no + ')">' 
        x += section_header(lvl, i) + '</td>';
		if (j <= chapmax) {
            if  (j == chap_no && sect_no == curr_sect) {
                x += ' <td class="g50"';
            }
            else {
                x += ' <td class="o50"';
            };
			x += ' onclick="story_open(' + lvl + ',' + sect_no + ',' + j +')">' 
            x += j.toString() + ' - ' + section_chapter(lvl, sect_no, j) + '</td>';
		} else {
			x += ' <td class="w50"></td>';
		};
        x += '</tr>';
		j++
    };
    while (j <= chapmax) {
        x += '<tr>';
        x += ' <td class="w50"></td>';
	    if  (j == chap_no && sect_no == curr_sect) {
            x += ' <td class="g50"';
        }
        else {
            x += ' <td class="o50"';
        };
		x += ' onclick="story_open(' + lvl + ',' + sect_no + ',' + j +')">' 
        x += j.toString() + ' - ' + section_chapter(lvl, sect_no, j) + '</td>';
        x += '</tr>';
		j++;
    };
    x += '</table>'
    document.getElementById("disp_tbl").innerHTML = x;
    document.getElementById("disp_tbl").style.display = 'block';
    window.location.href = ("#Top");
};


function chapter_xpnd(instr) {
    var x_bk = parseInt(instr.substring(0,2))
    var x_ch = parseInt(instr.substring(2,5))

    return fetch_name(x_bk) + " " +  x_ch;
};

function verse_number_xpnd(instr) {
    var x_bk = parseInt(instr.substring(0,2))
    var x_ch = parseInt(instr.substring(2,5))
    var x_ve = parseInt(instr.substring(5,8))
    var maxverse = verse_max(x_bk, x_ch)
    var tmpstr = fetch_name(x_bk) + " "
    tmpstr += x_ch + ":" + x_ve

    var clickstr = '<span onclick="displaytext2('
    clickstr += x_bk + ',' + x_ch + ',' + x_ve + ',' + maxverse + ')"'
    clickstr += '><u>' + tmpstr + '</u></span>'
        
    return clickstr;
}

function verse_number_click(x_bk, x_ch, x_ve) {
    var maxverse = verse_max(x_bk, x_ch)

    var clickstr = '<span onclick="displaytext2('
    clickstr += x_bk + ',' + x_ch + ',' + x_ve + ',' + maxverse + ')"'
    clickstr += '><u>' + x_ve + '</u></span>'
        
    return clickstr;
}

