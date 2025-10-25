function chapter_resume() {
	var tempString = var_coordinates;
	if  (tempString != null && tempString.length == 6) {
	    var x_b_no = parseInt(tempString.substring(0,2))
		var x_c_no = parseInt(tempString.substring(3,6));
		chapter_open(x_b_no, x_c_no, 0);
    }
    else {
       chapter_open(1, 1, 0);
    };
};


function book_open(x_b_no){
    chapter_open(x_b_no, 0, 1)
}

function chapter_open(x_b_no, x_c_no, v_mode) {
    var maxchap = chapter_max(x_b_no);
    var disp_tbl_flag = 0
    if (x_c_no == 0 && maxchap > 1) {
        disp_tbl_flag = 1
    };
    if  (x_c_no > maxchap) {x_c_no = maxchap};
    if  (x_c_no == 0) {x_c_no = 1}
    build_hdr(x_b_no, x_c_no, maxchap);
    fetch_chapter(x_b_no, x_c_no, v_mode);
    if (disp_tbl_flag == 1) {
        chapter_tbl(x_b_no,maxchap)
    };
    var_coordinates = (100 + x_b_no).toString().substring(1,3) + ":" + (1000 + x_c_no).toString().substring(1,4)
	if(lsTest()) {localStorage.setItem("jbsb_v11_coordinates",var_coordinates);};
}

function build_hdr(book_no, chap_no, maxchap) {
	var book_name = fetch_name(book_no);
    var x = '<table><tr>';
    x += ' <td class="c20" onclick="AllBooks(' + book_no + ')">' + book_name + '</td>';
    x += ' <td class="c20" onclick="chapter_tbl(' + book_no + ',' + maxchap + ')">' + chap_no + '</td>';
    x += ' <td class="c20" onclick="display_menu(' + book_no + ',' + chap_no + ',' + maxchap + ')">More</td>';
	var nextchap = chap_no + 1;
	var prevchap = chap_no - 1;
    if (chap_no == 1) {
		x += ' <td class="v20"></td>';
	}
	else {
        x += ' <td class="c20" onclick="chapter_open(' + book_no + ',' + prevchap + ',0)">Prev</td>';
    };
    if  (chap_no == maxchap) {
        x += ' <td class="v20"></td>';
    }
    else {
        x += ' <td class="c20" onclick="chapter_open(' + book_no + ',' + nextchap + ',0)">Next</td>';
    };
    //x += ' <td class="c20" onclick="Introductionfn()">Home</td>';
    //x += ' <td class="c20" onclick="option_display()">Settings</td>';
    //x += ' <td class="c20" onclick="disp_bible_help()">Help</td>';
    x += '</tr></table>';
    document.getElementById("hdr_tbl").innerHTML = x;
	if(lsTest()) {localStorage.setItem("jbsb_v11_header_table",x);};
};

function display_menu(book_no, chap_no, maxchap) {
	var x = '<table><tr>';
    x += '<td class="c20" onclick="Navigate(1)">Home</td>';
    x += '<td class="c20" onclick="Navigate(2)">' + story_names(1) + '</td>'
    x += '<td class="c20" onclick="Navigate(3)">' + story_names(2) + '</td>'
    x += '<td class="c20" onclick="Navigate(4)">Help</td>';
    x += '<td class="c20" onclick="ClosePop()">Close</td>';
    x += '</tr></table>';
    x += '<br>'
	x += '<table><tr>';
    x += ' <td class="c20" onclick="Read(' + "'b'" + ')">BSB</td>';
    x += ' <td class="c20" onclick="Read(' + "'w'" + ')">WEB</td>';
    x += ' <td class="c20" onclick="Read(' + "'k'" + ')">KJV</td>';
    x += ' <td class="c20" onclick="Read(' + "'y'" + ')">YLT</td>';
    x += ' <td class="c20" onclick="ReadAll()">All</td>';
    x += '</tr></table>';
    x += '<br>'
    x += '<table><tr>'
    x += '<td class="w14">BSB <input id="opt1_bsb" type="checkbox" class="jchk"></td>'
    x += '<td class="w14">WEB <input id="opt1_web" type="checkbox" class="jchk"></td>'
    x += '<td class="w14">KJV <input id="opt1_kjv" type="checkbox" class="jchk"></td>'
    x += '<td class="w14">YLT <input id="opt1_ylt" type="checkbox" class="jchk"></td>'
    x += '<td class="w14">LXX <input id="opt1_lxx" type="checkbox" class="jchk"></td>'
    x += '<td class="w14">Notes <input id="opt1_nte" type="checkbox" class="jchk"></td>'
    x += '<td class="c14" onclick="set_option()">Apply</td>';
    x += '</tr></table>';
/*    alert(x); */
    txt_modal.innerHTML = x;

    var var_opt1_bsb = document.getElementById("opt1_bsb");
    var var_opt1_web = document.getElementById("opt1_web");
    var var_opt1_kjv = document.getElementById("opt1_kjv");
    var var_opt1_ylt = document.getElementById("opt1_ylt");
    var var_opt1_lxx = document.getElementById("opt1_lxx");
    var var_opt1_nte = document.getElementById("opt1_nte");
    if (foption[1] == "b") {var_opt1_bsb.checked = true}
    if (foption[2] == "w") {var_opt1_web.checked = true}
    if (foption[3] == "k") {var_opt1_kjv.checked = true}
    if (foption[4] == "y") {var_opt1_ylt.checked = true}
    if (foption[5] == "l") {var_opt1_lxx.checked = true}
    if (foption[6] == "n") {var_opt1_nte.checked = true}

    modal.style.display = "block";
};

function Navigate(in_val) {
    switch(in_val) {
    case 1:
        Introductionfn()
        ClosePop()
        break;
    case 2:
        story_resume(1)
        ClosePop()
        break;
    case 3:
        story_resume(2)
        ClosePop()
        break;
    case 4:
        disp_bible_help()
        ClosePop()
        break;
    };
}

function Read(in_val) {
    foption[0] = in_val;
    foption[7] = "1";
    chapter_resume();
    ClosePop()
    newoption =  foption[0] + ":" + foption[1] + ':' + foption[2] + ':' + foption[3] + ':' + foption[4] + ':' + foption[5] + ":" + foption[6] + ":" + foption[7];
    if(lsTest()) {localStorage.setItem("jbsb_v11_foption",newoption);};
};

function ReadAll() {
    foption[7] = "3";
    chapter_resume();
    ClosePop()
    newoption =  foption[0] + ":" + foption[1] + ':' + foption[2] + ':' + foption[3] + ':' + foption[4] + ':' + foption[5] + ":" + foption[6] + ":" + foption[7];
    if(lsTest()) {localStorage.setItem("jbsb_v11_foption",newoption);};
};

function set_option() {
    foption[1] = "_";
    foption[2] = "_";
    foption[3] = "_";
    foption[4] = "_";
    foption[5] = "_";
    foption[6] = "_";
    foption[7] = '2';

    var var_opt1_bsb = document.getElementById("opt1_bsb");
    var var_opt1_web = document.getElementById("opt1_web");
    var var_opt1_kjv = document.getElementById("opt1_kjv");
    var var_opt1_ylt = document.getElementById("opt1_ylt");
    var var_opt1_lxx = document.getElementById("opt1_lxx");
    var var_opt1_nte = document.getElementById("opt1_nte");

    if  (var_opt1_bsb.checked) {foption[1] = "b";};
    if  (var_opt1_web.checked) {foption[2] = "w";};
    if  (var_opt1_kjv.checked) {foption[3] = "k";};
    if  (var_opt1_ylt.checked) {foption[4] = "y";};
    if  (var_opt1_lxx.checked) {foption[5] = "l";};
    if  (var_opt1_nte.checked) {foption[6] = "n";};

    newoption1  = foption[1] + ':' + foption[2] + ':' + foption[3] + ':' + foption[4] + ':' + foption[5]

    if  (newoption1 == "_:_:_:_:_") {
        foption[1] = 'b';
        foption[4] = 'y';
        newoption1  = "b:_:_:y:_";
    };

    newoption =  foption[0] + ":" + newoption1 + ":" + foption[6] + ":" + foption[7];
    ClosePop()
    if(lsTest()) {localStorage.setItem("jbsb_v11_foption",newoption);};
    chapter_resume();
};


function fetch_chapter(x_b_no, x_c_no, v_mode) {
    var maxverse = verse_max(x_b_no, x_c_no);
    var kjvyes = 0; 
    var webyes = 0; 
    var bsbyes = 0; 
    var yltyes = 0; 
    var lxxyes = 0; 
    var nteyes = 0;
    var mycount = 0;
    var tempstr = ""
    //alert(var_read_version)
    switch (foption[7]) {
    case "1":
        mycount = 1
        switch (foption[0]) {
        case 'b':
            bsbyes = 1;
            break;
        case 'w':
            webyes = 1;
            break;
        case 'k':
            kjvyes = 1;
            break;
        case 'y':
            yltyes = 1;
            break;
        default:
            bsbyes = 1;
            break;
        };
        break;
    case "2":
        if (foption[1] == "b") {bsbyes = 1; mycount +=1};
        if (foption[2] == "w") {webyes = 1; mycount +=1};
        if (foption[3] == "k") {kjvyes = 1; mycount +=1};
        if (foption[4] == "y") {yltyes = 1; mycount +=1};
        if (foption[5] == "l") {lxxyes = 1; mycount +=1};
        if (foption[6] == "n") {nteyes = 1};
        if (mycount < 1){bsbyes = 1; yltyes = 1; mycount =2;}
        break;
    case "3":
        mycount = 5
        bsbyes = 1; webyes = 1; kjvyes = 1; yltyes = 1; lxxyes = 1; nteyes = 1;
        break;
    default:
        mycount = 1
        bsbyes = 1;
    };
    //alert("my count " + mycount + " bsb-" + bsbyes + " web-" + webyes + " kjv-" + kjvyes + " ylt-" + yltyes + " lxx-" + lxxyes)
    if (mycount == 1) {
        if (bsbyes == 1) {tempstr = "Version: BSB "}
        if (webyes == 1) {tempstr = "Version: WEB "}
        if (kjvyes == 1) {tempstr = "Version: KJV "}
        if (yltyes == 1) {tempstr = "Version: YLT "}
        if (lxxyes == 1) {tempstr = "Version: LXX "}
        var Verse_pfx = "<u><b> "; 
        var Verse_sfx = "</b></u>";
        var bsb_pfx = '<font style="color:Black"> '
        var web_pfx = '<font style="color:DarkGreen"> '
        var kjv_pfx = '<font style="color:LightCoral"> '
        var ylt_pfx = '<font style="color:SaddleBrown"> '
        var lxx_pfx = '<font style="color:olive"> '
        var notes_pfx = '<font style="color:red">Notes: '
        var xref_pfx = '<font style="color:purple">Xref: '
        var sfx = '</font><br>'
    } else {
        var Verse_pfx = "<h5><u>Verse "; 
        var Verse_sfx = "</u></h5>";
        var bsb_pfx = '<font style="color:Black">[BSB] '
        var web_pfx = '<font style="color:DarkGreen">[WEB] '
        var kjv_pfx = '<font style="color:LightCoral">[KJV] '
        var ylt_pfx = '<font style="color:SaddleBrown">[YLT] '
        var lxx_pfx = '<font style="color:olive">[LXX] '
        var notes_pfx = '<font style="color:red">Notes: '
        var xref_pfx = '<font style="color:purple">Xref: '
        var sfx = '</font><br>'
    };
    var x = '<p><h4>' + tempstr + fetch_name(x_b_no) + " " + x_c_no + '</h4>'
    if (chap_titles(x_b_no, x_c_no).length > 0) {
        x += chap_titles(x_b_no, x_c_no) + '<br><br>';
    };

    var i;
    var kjm_kjv = [];

    for (i=1; i<= maxverse; i++) {
        clickstr = ' onclick="displaytext2('
        clickstr += x_b_no + ',' + x_c_no + ',' + i + ',' + maxverse + ')"'
        clickid  = '<a id="V' + i + '"></a>'
        x += clickid + '<span style="color:blue;cursor: pointer;"' + clickstr + '>' + Verse_pfx + i + Verse_sfx + '</span>'
        if  (bsbyes == 1) {
            x += bsb_pfx + bsb_fetch(x_b_no, x_c_no, i) + sfx;
        };
        if  (webyes == 1) {
            x += web_pfx + web_fetch(x_b_no, x_c_no, i) + sfx;
        };
        if  (kjvyes == 1) {
            x += kjv_pfx + kjv_fetch(x_b_no, x_c_no, i) + sfx;
        };
        if  (yltyes == 1) {
            x += ylt_pfx + ylt_fetch(x_b_no, x_c_no, i) + sfx;
        };
        if  (lxxyes == 1) {
            if  (x_b_no <= 39) {
                x += lxx_pfx + lxx_fetch(x_b_no, x_c_no, i) + sfx;
            };
        };
        if  (nteyes > 0) {
            note1 = kjm_notes(x_b_no, x_c_no, i)
            notex = kjm_xref(x_b_no, x_c_no, i)
            if (note1.length > 0) {
                x += notes_pfx + note1 + sfx;
            };
            notex_len = notex.length
            if (notex_len > 0) {
                x += xref_pfx;
                notex_loop = notex_len / 8;
                for (notex_i = 0; notex_i < notex_loop; notex_i++) {
                    notex_element = notex.substring(0,8)
                    notex = notex.substring(8)
                    notes_book = parseInt(notex_element.substring(0,2),10)
                    notex_cno = parseInt(notex_element.substring(2,5),10)
                    notex_vno = parseInt(notex_element.substring(5),10)
                    notes_verse_max = verse_max(notes_book, notex_cno)
                    x += '<span style="color: blue; cursor: pointer;" onclick="displaytext2(' 
                    x += notes_book + ',' + notex_cno + ',' + notex_vno + ',' + notes_verse_max + ')">'
                    x += book_short(notes_book) + notex_element.substring(2) + '</span> '
                };
                x += sfx;
            };
        };
    };
    x += "<br><br><br><br><br></p>"
    document.getElementById("disp_txt").innerHTML = x;
    hide_disp_tbl();
    hide_results()
    window.location.href = ("#Top");
	if(lsTest()) {localStorage.setItem("jbsb_v11_body_text",x);};
    if (v_mode == 1 && mycount * maxverse > 30) {verse_tbl(maxverse)};
};

function displaytext2(bno, cno, vno, maxverse) {
	var prevno = vno - 1;
	var nextno = vno + 1;
    var web_pfx = '<font style="color:Black">[WEB] '
    var kjv_pfx = '<font style="color:DarkGreen">[KJV] '
    var bsb_pfx = '<font style="color:LightCoral">[BSB] '
    var ylt_pfx = '<font style="color:SaddleBrown">[YLT] '
    var lxx_pfx = '<font style="color:olive">[LXX] '
    var rvwCtitle = fetch_name(bno) + " " + (1000 + cno).toString().substring(1)
    var rvwVtitle = rvwCtitle + ":" + (1000 + vno).toString().substring(1)
    var x = '<p>' + rvwVtitle + '<br><br>';
    x += web_pfx + web_fetch(bno, cno, vno) + '</font><br>';
    x += kjv_pfx + kjv_fetch(bno, cno, vno) + '</font><br>';
    x += bsb_pfx + bsb_fetch(bno, cno, vno) + '</font><br>';
    x += ylt_pfx + ylt_fetch(bno, cno, vno) + '</font><br>';
    if  (bno <= 39) {
         x += lxx_pfx + lxx_fetch(bno, cno, vno) + '</font><br>';
    };
    x += '<br>'
	x += '<table><tr>';
    x += ' <td class="c25" onclick="ClosePop()">Close</td>';
    if (vno == 1) {
		x += ' <td class="v25"></td>';
	}
	else {
        x += ' <td class="c25" onclick="displaytext2(' + bno + ',' + cno + ',' + prevno + ',' + maxverse + ')">Prev</td>';
    };
    if  (vno == maxverse) {
        x += ' <td class="v25"></td>';
    }
    else {
        x += ' <td class="c25" onclick="displaytext2(' + bno + ',' + cno + ',' + nextno + ',' + maxverse + ')">Next</td>';
    };
    x += '</tr></table>';
    x += '</p>';
/*    alert(x); */
    txt_modal.innerHTML = x;
    modal.style.display = "block";
};

function ClosePop() {
	modal.style.display = "none";
};

function chapter_tbl(book_no, maxchap) {
    var nbr_cols = 10
    var disp_class_no = "10"
    if (book_no == 27) {nbr_cols = 7; disp_class_no = "14"}
    var last_col = maxchap % nbr_cols;
    var row_loop = (maxchap - last_col) / nbr_cols;
    var x = '<br><br><table>';
    x += '<th style="color:blue;"  colspan="' + nbr_cols + '"><b>' + fetch_name(book_no) + ' - Chapters</b></th>'
    var i, j, k;
    for (i=0; i< row_loop; i++) {
        x += '<tr>';
        for (j=1; j<= nbr_cols; j++) {
            k = i * nbr_cols + j;
            x += ' <td class="c' + disp_class_no + '" onclick="chapter_open(' + book_no + ',' + k + ',1)">' + k + '</td>';
        }
        x += '</tr>';
    }
    if (last_col > 0) {
        x += '<tr>';
        for (j=1; j<= nbr_cols; j++) {
            if (j<= last_col) {
                k = row_loop * nbr_cols + j;
                chapter_key = book_no * 1000 + k;
                x += ' <td class="c' + disp_class_no + '" onclick="chapter_open(' + book_no + ',' + k + ',1)">' + k + '</td>';
            }
            else {
                x += ' <td class="w' + disp_class_no + '"></td>';
            };
        }
        x += '</tr>';
    }
    x += '<tr>';
    x += '<td class="w80" colspan="8"></td>';
    x += '<td class="g20" onclick="hide_disp_tbl()" colspan="2" ><b>Close Table</b></td>'
    x += '</tr>';
    x += '</table>'
    document.getElementById("disp_tbl").innerHTML = x;
    document.getElementById("disp_tbl").style.display = 'block';
    window.location.href = ("#Top");
}

function verse_tbl(maxverse) {
    var last_col = maxverse % 7;
    var row_loop = (maxverse - last_col) / 7;
    var x = '<br><br><table><th style="color:blue;" colspan="14"> Choose verse</th>';
    var i, j, k;
    for (i=0; i< row_loop; i++) {
        x += '<tr>';
        for (j=1; j<= 7; j++) {
            k = i * 7 + j;
            x += ' <td class="o14" onclick="goto_verse(' + k + ')">' + k + '</td>';
        }
        x += '</tr>';
    }
    if (last_col > 0) {
        x += '<tr>';
        for (j=1; j<= last_col; j++) {
            k = row_loop * 7 + j;
            x += ' <td class="o14" onclick="goto_verse(' + k + ')">' + k + '</td>';
        }
        x += '</tr>';
    }
    x += '<tr>';
    x += '<td class="w80" colspan="8"></td>';
    x += '<td class="g20" onclick="hide_disp_tbl()" colspan="2" ><b>Close Table</b></td>'
    x += '</tr>';
    x += '</table>'
    document.getElementById("disp_tbl").innerHTML = x;
    document.getElementById("disp_tbl").style.display = 'block';
    window.location.href = ("#Top");
}

function goto_verse(v_no) {
    verseloc = "#V" + v_no
    document.getElementById("disp_tbl").style.display = 'none';
    document.getElementById("srch_results").style.display = 'none';
    window.location.href = (verseloc);
};

function AllBooks(book_no) {
    var x = '<br><br>'
    if (book_no < 39) {
        x += '<table><tr>'
        x += ' <td class="o50">Old</td>'
        x += ' <td class="c50" onclick="AllBooks(40)">New</td>'
        x += '</tr></table><br>'
        x += booklist_law()
        x += booklist_history()
        x += booklist_wisdom()
        x += booklist_lxxmajor()
        x += booklist_minor()
    } else {
        x += '<table><tr>'
        x += ' <td class="c50" onclick="AllBooks(1)">Old</td>'
        x += ' <td class="o50">New</td>'
        x += '</tr></table><br>'
        if (window.innerWidth <= 768) {
           x += shortlist_nt()
        } else {
           x += booklist_nt()
        };
    };
    x += '<table><tr>';
    x += '<td class="w80" colspan="4"></td>';
    x += '<td class="g20" onclick="hide_disp_tbl()"><b>Cancel</b></td>'
    x += '</tr>';
    x += '</table>'
    document.getElementById("disp_tbl").innerHTML = x;
    document.getElementById("disp_tbl").style.display = 'block';
    window.location.href = ("#Top");
};

function booklist_law() {
    var x = '<table><tr>'
    x += ' <td class="c20" onclick="book_open(1)">Genesis</td>'
    x += ' <td class="c20" onclick="book_open(2)">Exodus</td>'
    x += ' <td class="c20" onclick="book_open(3)">Leviticus</td>'
    x += ' <td class="c20" onclick="book_open(4)">Numbers</td>'
    x += ' <td class="c20" onclick="book_open(5)">Deuteronomy</td>'
    x += '</tr></table><br>'
    return x;
};

function booklist_history() {
    var x = '<table><tr>'
    x += ' <td class="c20" onclick="book_open(6)">Joshua</td>'
    x += ' <td class="c20" onclick="book_open(7)">Judges</td>'
    x += ' <td class="c20" onclick="book_open(31)">Ruth</td>'
    x += ' <td class="c20" onclick="book_open(8)">1 Samuel</td>'
    x += ' <td class="c20" onclick="book_open(9)">2 Samuel</td>'
    x += '</tr>'
    x += '<tr>'
    x += ' <td class="c20" onclick="book_open(10)">1 Kings</td>'
    x += ' <td class="c20" onclick="book_open(11)">2 Kings</td>'
    x += ' <td class="c20" onclick="book_open(38)">1 Chronicles</td>'
    x += ' <td class="c20" onclick="book_open(39)">2 Chronicles</td>'
    x += '</tr>'
    x += '<tr>'
    x += ' <td class="c20" onclick="book_open(36)">Ezra</td>'
    x += ' <td class="c20" onclick="book_open(37)">Nehemiah</td>'
    x += ' <td class="c20" onclick="book_open(34)">Esther</td>'
    x += '</tr></table><br>'
    return x;
};

function booklist_wisdom() {
    var x = '<table><tr>'
    x += ' <td class="c20" onclick="book_open(29)">Job</td>'
    x += ' <td class="c20" onclick="book_open(27)">Psalms</td>'
    x += ' <td class="c20" onclick="book_open(28)">Proverbs</td>'
    x += ' <td class="c20" onclick="book_open(33)">Ecclesiastes</td>'
    x += ' <td class="c20" onclick="book_open(30)">SongofSongs</td>'
    x += '</tr></table><br>'
    return x;
};

function booklist_lxxmajor() {
    var x = '<table><tr>'
    x += ' <td class="c20" onclick="book_open(12)">Isaiah</td>'
    x += ' <td class="c20" onclick="book_open(13)">Jeremiah</td>'
    x += ' <td class="c20" onclick="book_open(14)">Ezekiel</td>'
    x += ' <td class="c20" onclick="book_open(32)">Lamentations</td>'
    x += ' <td class="c20" onclick="book_open(35)">Daniel</td>'
    x += '</tr></table><br>'
    return x;
};

function booklist_minor() {
    var x = '<table><tr>'
    x += ' <td class="c20" onclick="book_open(15)">Hosea</td>'
    x += ' <td class="c20" onclick="book_open(16)">Joel</td>'
    x += ' <td class="c20" onclick="book_open(17)">Amos</td>'
    x += ' <td class="c20" onclick="book_open(18)">Obadiah</td>'
    x += ' <td class="c20" onclick="book_open(19)">Jonah</td>'
    x += '</tr>'
    x += '<tr>'
    x += ' <td class="c20" onclick="book_open(20)">Micah</td>'
    x += ' <td class="c20" onclick="book_open(21)">Nahum</td>'
    x += ' <td class="c20" onclick="book_open(22)">Habakkuk</td>'
    x += ' <td class="c20" onclick="book_open(23)">Zephaniah</td>'
    x += ' <td class="c20" onclick="book_open(24)">Haggai</td>'
    x += '</tr>'
    x += '<tr>'
    x += ' <td class="c20" onclick="book_open(25)">Zechariah</td>'
    x += ' <td class="c20" onclick="book_open(26)">Malachi</td>'
    x += '</tr></table><br>'
    return x;
};

function booklist_nt() {
    var x = '<table><tr>'
    x += ' <td class="c20" onclick="book_open(40)">Matthew</td>'
    x += ' <td class="c20" onclick="book_open(41)">Mark</td>'
    x += ' <td class="c20" onclick="book_open(42)">Luke</td>'
    x += ' <td class="c20" onclick="book_open(43)">John</td>'
    x += ' <td class="c20" onclick="book_open(44)">Acts</td>'
    x += '</tr></table><br>'
    x += '<table><tr>'
    x += ' <td class="c20" onclick="book_open(45)">Romans</td>'
    x += ' <td class="c20" onclick="book_open(46)">1 Corinthians</td>'
    x += ' <td class="c20" onclick="book_open(47)">2 Corinthians</td>'
    x += ' <td class="c20" onclick="book_open(48)">Galatians</td>'
    x += ' <td class="c20" onclick="book_open(49)">Ephesians</td>'
    x += '</tr>'
    x += '<tr>'
    x += ' <td class="c20" onclick="book_open(50)">Philippians</td>'
    x += ' <td class="c20" onclick="book_open(51)">Colossians</td>'
    x += ' <td class="c20" onclick="book_open(52)">1 Thessalonians</td>'
    x += ' <td class="c20" onclick="book_open(53)">2 Thessalonians</td>'
    x += '</tr>'
    x += '<tr>'
    x += ' <td class="c20" onclick="book_open(54)">1 Timothy</td>'
    x += ' <td class="c20" onclick="book_open(55)">2 Timothy</td>'
    x += ' <td class="c20" onclick="book_open(56)">Titus</td>'
    x += ' <td class="c20" onclick="book_open(57)">Philemon</td>'
    x += ' <td class="c20" onclick="book_open(58)">Hebrews</td>'
    x += '</tr></table><br>'
    x += '<table><tr>'
    x += ' <td class="c20" onclick="book_open(59)">James</td>'
    x += ' <td class="c20" onclick="book_open(60)">1 Peter</td>'
    x += ' <td class="c20" onclick="book_open(61)">2 Peter</td>'
    x += '</tr>'
    x += '<tr>'
    x += ' <td class="c20" onclick="book_open(62)">1 John</td>'
    x += ' <td class="c20" onclick="book_open(63)">2 John</td>'
    x += ' <td class="c20" onclick="book_open(64)">3 John</td>'
    x += ' <td class="c20" onclick="book_open(65)">Jude</td>'
    x += ' <td class="c20" onclick="book_open(66)">Revelation</td>'
    x += '</tr></table><br>'
    return x;
};

function shortlist_nt() {
    var x = '<table><tr>'
    x += ' <td class="c20" onclick="book_open(40)">Mat</td>'
    x += ' <td class="c20" onclick="book_open(41)">Mar</td>'
    x += ' <td class="c20" onclick="book_open(42)">Luk</td>'
    x += ' <td class="c20" onclick="book_open(43)">Joh</td>'
    x += ' <td class="c20" onclick="book_open(44)">Act</td>'
    x += '</tr></table><br>'
    x += '<table><tr>'
    x += ' <td class="c20" onclick="book_open(45)">Rom</td>'
    x += ' <td class="c20" onclick="book_open(46)">1Co</td>'
    x += ' <td class="c20" onclick="book_open(47)">2Co</td>'
    x += ' <td class="c20" onclick="book_open(48)">Gal</td>'
    x += ' <td class="c20" onclick="book_open(49)">Eph</td>'
    x += '</tr>'
    x += '<tr>'
    x += ' <td class="c20" onclick="book_open(50)">Php</td>'
    x += ' <td class="c20" onclick="book_open(51)">Col</td>'
    x += ' <td class="c20" onclick="book_open(52)">1Th</td>'
    x += ' <td class="c20" onclick="book_open(53)">2Th</td>'
    x += '</tr>'
    x += '<tr>'
    x += ' <td class="c20" onclick="book_open(54)">1Ti</td>'
    x += ' <td class="c20" onclick="book_open(55)">2Ti</td>'
    x += ' <td class="c20" onclick="book_open(56)">Tit</td>'
    x += ' <td class="c20" onclick="book_open(57)">Phm</td>'
    x += ' <td class="c20" onclick="book_open(58)">Heb</td>'
    x += '</tr></table><br>'
    x += '<table><tr>'
    x += ' <td class="c20" onclick="book_open(59)">Jam</td>'
    x += ' <td class="c20" onclick="book_open(60)">1Pe</td>'
    x += ' <td class="c20" onclick="book_open(61)">2Pe</td>'
    x += '</tr>'
    x += '<tr>'
    x += ' <td class="c20" onclick="book_open(62)">1Jo</td>'
    x += ' <td class="c20" onclick="book_open(63)">2Jo</td>'
    x += ' <td class="c20" onclick="book_open(64)">3Jo</td>'
    x += ' <td class="c20" onclick="book_open(65)">Jud</td>'
    x += ' <td class="c20" onclick="book_open(66)">Rev</td>'
    x += '</tr></table><br>'
    return x;
};
function hide_disp_tbl() {
    document.getElementById("disp_tbl").style.display = 'none';
};

function hide_results() {
    document.getElementById("srch_results").style.display = 'none';
};



