function story_resume(lvl) {
    var in_lvl = lvl
    var story_loc = ["01","01","01","01"];
    var story_sec = 1
    var story_chap = 1
    if  (var_story != null && var_story.length == 12) {
        if (in_lvl == 0) {
            in_lvl = parseInt(var_story.substring(0,1),10);
        };
        story_loc = var_story.substring(1).split(":");
    };

    switch (in_lvl) {
    case 1:
        story_sec = parseInt(story_loc[0],10)
        story_chap = parseInt(story_loc[1],10)
        break;
    case 2:
        story_sec = parseInt(story_loc[2],10)
        story_chap = parseInt(story_loc[3],10)
        break;
    default:
        in_lvl = 1;
    };
    story_open(in_lvl, story_sec, story_chap);
};


function story_open(lvl, sect_no, chap_no) {
	if (sect_no > section_max(lvl)) {alert("invalid section")
	};
    if (chap_no > section_chapter_max(lvl, sect_no)) {alert("invalid chapter")
	};
    story_hdr(lvl, sect_no, chap_no);
    story_tlr(lvl, sect_no, chap_no);
    story_text(lvl, sect_no, chap_no);

    var story_loc = ["01","01","01","01"];
    if  (var_story != null && var_story.length == 12) {
        story_loc = var_story.substring(1).split(":");
    };

    switch (lvl) {
    case 1:
        story_loc[0] = (100 + sect_no).toString().substring(1)
        story_loc[1] = (100 + chap_no).toString().substring(1)
        break;
    case 2:
        story_loc[2] = (100 + sect_no).toString().substring(1)
        story_loc[3] = (100 + chap_no).toString().substring(1)
        break;
    };

    var_story = lvl.toString() + story_loc[0] + ":" + story_loc[1] + ":" + story_loc[2] + ":" + story_loc[3];
	if(lsTest()) {localStorage.setItem("jbsb_v11_story_coordinates",var_story);};
};

function story_hdr(lvl, sect_no, chap_no) {
    var x = '<table><tr><td class="c100" ';
    x += 'onclick="story_books(';
    x += lvl + ',' + sect_no + ',' + sect_no + ',' + chap_no + ')">';
    x += '<b><font style="color:Red"> ' + sect_no + ". " + section_header(lvl, sect_no) + ' </font></b>';
    x += '&emsp; <i>' + chap_no + '. ' + section_chapter(lvl, sect_no, chap_no) + ' </i>';
    x += "&emsp; (" + story_names(lvl) + ")"
    x += '</td></tr></table>';
    document.getElementById("hdr_tbl").innerHTML = x;
	if(lsTest()) {localStorage.setItem("jbsb_v11_header_table",x);};
};

function story_tlr(lvl, sect_no, chap_no) {
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
    y += ' <td class="c20" onclick="chapter_resume()">Go to Bible</td>';
    y += ' <td class="c20" onclick="story_skipped(' + lvl + ',' + sect_no + ',' + chap_no + ')">Skipped</td>';
    if  (lvl == 1) {
        y += ' <td class="c20" onclick="story_resume(2)">' + story_names(2) + '</td>';
    }
    else {
        y += ' <td class="c20" onclick="story_resume(1)">' + story_names(1) + '</td>';
    };
    if (sect_no == 1 && chap_no == 1) {
		y += ' <td class="c20"></td>';
	}
	else {
        y += ' <td class="c20" onclick="story_open(' + lvl + ',' + prevsect + ',' + prevchap + ')">Prev</td>';
    };
    if  (nextchap == 999) {
        y += ' <td class="c20">End</td>';
    }
    else {
        y += ' <td class="c20" onclick="story_open(' + lvl + ',' + nextsect + ',' + nextchap + ')">Next</td>';
    };
    y += '</tr></table>';
    document.getElementById("btm_tbl").innerHTML = y;
	if(lsTest()) {localStorage.setItem("jbsb_v11_bottom_table",y);};
};

function story_text(lvl, sect_no, chap_no) {
    var vlist = chapter_verses(lvl, sect_no, chap_no)
    var vlen = vlist.length
    var verselist = ""
    var m = 0
    var x = "<br>";
    var prevchap = "";
    var currchap = "";
    for (h=0; h < vlen; h++) {
        verse_str = vlist[h]
        verselist = verse_str.split("|");
        x += '<h4>' + verselist[0] + '</h4>';
        m = verselist.length;
        x += "<p>"
        for (i=1; i< m; i++) {
            currchap = verselist[i].substring(0,5)
            if (currchap !== prevchap) {
                x += '<font style="color:blue">['
                x += chapter_xpnd(currchap) + "] </font><br><br>";
                prevchap = currchap;
            };
            if  (verselist[i].length == 8) {
                jbk = parseInt(verselist[i].substring(0,2))
                jcp = parseInt(verselist[i].substring(2,5))
                jve = parseInt(verselist[i].substring(5,8))
                x += '<font style="color:blue">['
                x += verse_number_click(jbk, jcp, jve) + "] </font>"
                x += web_fetch(jbk,jcp,jve);
                x += '<br><br>';
                continue;
            };
            if  (verselist[i].length > 8 && verselist[i].length <= 11) {
                jbk = parseInt(verselist[i].substring(0,2))
                jcp = parseInt(verselist[i].substring(2,5))
                jve = parseInt(verselist[i].substring(5,8))
                kve = parseInt(verselist[i].substring(8))
                for (vi = jve; vi <= kve; vi++) {
                    x += '<font style="color:blue">['
                    x += verse_number_click(jbk, jcp, vi) + "] </font>"
                    x += web_fetch(jbk,jcp,vi) + ' ';
                };
			    x += '<br><br>';
                continue;
            };
        };
    };
	x += "<br><br><br><br><br></p>"

    document.getElementById("disp_txt").innerHTML = x;
    hide_disp_tbl();
    hide_select_option();
    hide_results()
	if(lsTest()) {localStorage.setItem("jbsb_v11_body_text",x);};
};

function story_skipped(lvl, sect_no, chap_no) {
    var books_1 = []
    var v_skipped = 0
    for (b_i = 0; b_i < 67; b_i++) {
        /* book nbr, prev chap & verse, first chap & verse, last chap & verse , next chap & verse, verse list array*/
        books_1.push([0,"000000","999999","000000","999999",[]])
    };
    var vlist = chapter_verses(lvl, sect_no, chap_no)
    var vlen = vlist.length
    var verselist = ""
    var m = 0
    for (h=0; h < vlen; h++) {
        verse_str = vlist[h]
        verselist = verse_str.split("|");
        m = verselist.length;
        for (i=1; i< m; i++) {
            if  (verselist[i].length == 8) {
                jbk = parseInt(verselist[i].substring(0,2),10)
                books_1[jbk][0] = 1
                curr_vrse = verselist[i].substring(2,8)
                if (curr_vrse < books_1[jbk][2]) {
                    books_1[jbk][2] = curr_vrse
                };
                if (curr_vrse > books_1[jbk][3]) {
                    books_1[jbk][3] = curr_vrse
                };
                books_1[jbk][5].push(curr_vrse)
                continue;
            };
            if  (verselist[i].length > 8 && verselist[i].length <= 11) {
                jbk = parseInt(verselist[i].substring(0,2),10)
                jcp = parseInt(verselist[i].substring(2,5),10)
                jve = parseInt(verselist[i].substring(5,8),10)
                kve = parseInt(verselist[i].substring(8),10)

                books_1[jbk][0] = 1
                curr_vrse = verselist[i].substring(2,8)
                if (curr_vrse < books_1[jbk][2]) {
                    books_1[jbk][2] = curr_vrse
                };
                for (vi = jve; vi <= kve; vi++) {
                    curr_vrse = verselist[i].substring(2,5) + (1000 + vi).toString().substring(1)
                    books_1[jbk][5].push(curr_vrse)
                };
                curr_vrse = verselist[i].substring(2,5) + (1000 + kve).toString().substring(1)
                if (curr_vrse > books_1[jbk][3]) {
                    books_1[jbk][3] = curr_vrse
                };
                continue;
            };
        };
    };
    for (s_i = 1; s_i <= section_max(lvl); s_i++) {
        for (c_i = 1; c_i <= section_chapter_max(lvl, s_i); c_i++) {
            vlist = chapter_verses(lvl, s_i, c_i);
            vlen = vlist.length
            verselist = ""
            m = 0
            for (h=0; h < vlen; h++) {
                verse_str = vlist[h]
                verselist = verse_str.split("|");
                m = verselist.length;
                for (i=1; i< m; i++) {
                    if  (verselist[i].length == 8) {
                        jbk = parseInt(verselist[i].substring(0,2),10)
                        if (books_1[jbk][0] == 1) {
                            curr_vrse = verselist[i].substring(2,8)
                            if (curr_vrse > books_1[jbk][1] && curr_vrse < books_1[jbk][2]) {
                                books_1[jbk][1] = curr_vrse
                            };
                            if (curr_vrse > books_1[jbk][3] && curr_vrse < books_1[jbk][4]) {
                                books_1[jbk][4] = curr_vrse
                            };
                        };
                        continue;
                    };
                    if  (verselist[i].length > 8 && verselist[i].length <= 11) {
                        jbk = parseInt(verselist[i].substring(0,2),10)
                        jcp = parseInt(verselist[i].substring(2,5),10)
                        jve = parseInt(verselist[i].substring(5,8),10)
                        kve = parseInt(verselist[i].substring(8),10)
                        if (books_1[jbk][0] == 1) {
                            curr_vrse = verselist[i].substring(2,8)
                            if (curr_vrse > books_1[jbk][3] && curr_vrse < books_1[jbk][4]) {
                                books_1[jbk][4] = curr_vrse
                            };
                            curr_vrse = verselist[i].substring(2,5) + (1000 + kve).toString().substring(1)
                            if (curr_vrse > books_1[jbk][1] && curr_vrse < books_1[jbk][2]) {
                                books_1[jbk][1] = curr_vrse
                            };
                        };
                        continue;
                    };
                };
            };
        };
    };
    var x = "";
    for (b_i = 1; b_i < 67; b_i++) {
        if (books_1[b_i][0] == 1) {
            c_from = parseInt(books_1[b_i][1].substring(0,3),10)
            c_to = parseInt(books_1[b_i][2].substring(0,3),10)
            for (c_i = c_from + 1; c_i < c_to; c_i++) {
                x += '<br><br><font style="color:red">['
                x += chapter_xpnd((100 + b_i).toString().substring(1) + (1000 + c_i).toString().substring(1)) 
                x += "] </font><br><br>";
                v_skipped = 1;
            };
            x += '<br><br><font style="color:blue">['
            x += chapter_xpnd((100 + b_i).toString().substring(1) + (1000 + c_to).toString().substring(1)) 
            x += "] </font><br><br>";
            if (c_from == c_to) {
                v_from = parseInt(books_1[b_i][1].substring(3,6),10) + 1
            } else {
                v_from = 1
            };
            v_to = parseInt(books_1[b_i][2].substring(3,6),10);
            for (v_i = v_from; v_i < v_to; v_i++) {
                x += '<font style="color:red">['
                x += verse_number_click(b_i, c_to, v_i) + "] </font>"
                x += web_fetch(b_i, c_to, v_i) + '<br>';
                v_skipped = 1;
            };
            books_1[b_i][5].sort();
            bv_len = books_1[b_i][5].length
            for (bv_i = 0; bv_i < bv_len - 1; bv_i++) {
                c_from = parseInt(books_1[b_i][5][bv_i].substring(0,3),10)
                v_from = parseInt(books_1[b_i][5][bv_i].substring(3),10)
                c_to = parseInt(books_1[b_i][5][bv_i + 1].substring(0,3),10)
                v_to = parseInt(books_1[b_i][5][bv_i + 1].substring(3),10)
                x += '<font style="color:blue">['
                x += verse_number_click(b_i, c_from, v_from) + "] </font>"
                x += web_fetch(b_i, c_from, v_from) + '<br>';
                if (c_from !== c_to) {
                    v_to = verse_max(b_i, c_from)
                };
                for (vv_i = v_from + 1; vv_i < v_to; vv_i++) {
                    x += '<font style="color:red">['
                    x += verse_number_click(b_i, c_from, vv_i) + "] </font>"
                    x += web_fetch(b_i, c_from, vv_i) + '<br>';
                    v_skipped = 1;
                };
                if (c_from !== c_to) {
                    for (cc_i = c_from + 1; cc_i < c_to; cc_i++) {
                        x += '<br><br><font style="color:red">['
                        x += chapter_xpnd((100 + b_i).toString().substring(1) + (1000 + cc_i).toString().substring(1)) 
                        x += "] </font><br><br>";
                        v_skipped = 1;
                    };
                    x += '<br><br><font style="color:blue">['
                    x += chapter_xpnd((100 + b_i).toString().substring(1) + (1000 + c_to).toString().substring(1)) 
                    x += "] </font><br><br>";
                    v_to = parseInt(books_1[b_i][5][bv_i + 1].substring(3),10)
                    for (vv_i = 1; vv_i < v_to; vv_i++) {
                        x += '<font style="color:red">['
                        x += verse_number_click(b_i, c_to, vv_i) + "] </font>"
                        x += web_fetch(b_i, c_to, vv_i) + '<br>';
                        v_skipped = 1;
                    };
                };
            };
            bv_i = bv_len - 1
            c_to = parseInt(books_1[b_i][5][bv_i].substring(0,3),10)
            v_to = parseInt(books_1[b_i][5][bv_i].substring(3),10)
            x += '<font style="color:blue">['
            x += verse_number_click(b_i, c_to, v_to) + "] </font>"
            x += web_fetch(b_i, c_to, v_to) + '<br>';
            v_from = v_to + 1
            v_to = verse_max(b_i, c_to)
            for (v_i = v_from; v_i < v_to; v_i++) {
                x += '<font style="color:red">['
                x += verse_number_click(b_i, c_to, v_i) + "] </font>"
                x += web_fetch(b_i, c_to, v_i) + '<br>';
                v_skipped = 1;
            };
        };
    };
    x += '<br><br><br><br>'
    if (v_skipped == 0) {
        x = "<br><br><br><br> Nothing Skipped <br><br><br><br>"
    };
    document.getElementById("disp_txt").innerHTML = x;
    /* Amend the bottom table */
	var y = '<table><tr>';
    y += ' <td class="c50" onclick="chapter_resume()">Go to Bible</td>';
    y += ' <td class="c50" onclick="story_open(' + lvl + ',' + sect_no + ',' + chap_no + ')">Back to Story</td>';
    y += '</tr></table>';
    document.getElementById("btm_tbl").innerHTML = y;
};


function story_books(lvl, curr_sect, sect_no, chap_no) {
    var m = section_max(lvl)
    var i = 0;
    var x = '<br><br><table><tr><td class="a50" onclick="hide_disp_tbl()"><b>Sections</b></td><td class="w50"></td></tr>';
    for (i=1; i< sect_no; i++) {
        x += '<tr>';
        x += ' <td class="c50" id="s' + i 
        x += '" onclick="story_books(' + lvl + ',' + curr_sect + ',' + i + ',' + chap_no + ')">' 
        x += section_header(lvl, i) + '</td>';
        x += ' <td class="w50"></td>';
        x += '</tr>';
    };
	x += '<tr>';
    x += ' <td class="g50" id="s' + sect_no 
    x += '" onclick="story_books(' + lvl + ',' + curr_sect + ',' + sect_no + ',' + chap_no + ')">' 
    x += section_header(lvl, sect_no) + '</td>';
	x += ' <td class="a50" onclick="section_books(' + lvl + ',' + curr_sect + ',' + sect_no + ',' + chap_no + ')">'
    x += '<b>' + section_header(lvl, sect_no) + ' - Chapters</b></td>';
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
};


function section_books(lvl, curr_sect, sect_no, chap_no) {
	var m = section_max(lvl)
    var x = '<br><br><table><tr><td class="a50" onclick="hide_disp_tbl()"><b>Sections</b></td><td class="w50"></td>';
    for (i=1; i< sect_no; i++) {
        x += '<tr>';
        x += ' <td class="c50" onclick="story_books(' + lvl + ',' + curr_sect + ',' + i + ',' + chap_no + ')">' 
        x += section_header(lvl, i) + '</td>';
        x += ' <td class="w50"></td>';
        x += '</tr>';
    };
	x += '<tr>';
    x += ' <td class="g50" onclick="story_books(' + lvl + ',' + curr_sect + ',' + sect_no + ',' + chap_no + ')">' 
    x += section_header(lvl, sect_no) + '</td>';
	x += ' <td class="w50"></td>';
	x += '</tr>';
    for (i=sect_no + 1; i<= m; i++) {
        x += '<tr>';
        x += ' <td class="c50" onclick="story_books(' + lvl + ',' + curr_sect + ',' + i + ',' + chap_no + ')">' 
        x += section_header(lvl, i) + '</td>';
		x += ' <td class="w50"></td>';
		x += '</tr>';
    };
    x += '</table>'
    document.getElementById("disp_tbl").innerHTML = x;
    document.getElementById("disp_tbl").style.display = 'block';
};


function chapter_xpnd(instr) {
    var x_bk = parseInt(instr.substring(0,2))
    var x_ch = parseInt(instr.substring(2,5))
    var tmpstr = fetch_name(x_bk) + " " +  x_ch;

    var clickstr = '<span onclick="chapter_open(' + x_bk + ',' + x_ch + ')">';
    clickstr += '<u>' + tmpstr + '</u></span>'
        
    return clickstr;
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

