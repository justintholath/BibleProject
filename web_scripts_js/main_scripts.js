function chapter_resume() {
	var tempString = var_coordinates;
	if  (tempString != null && tempString.length == 6) {
	    var x_b_no = parseInt(tempString.substring(0,2))
		var x_c_no = parseInt(tempString.substring(3,6));
		chapter_open(x_b_no, x_c_no);
    }
    else {
       chapter_open(1, 1);
    };
};


function book_open(x_b_no){
    chapter_open(x_b_no, 0)
}

function chapter_open(x_b_no, x_c_no) {
    var maxchap = chapter_max(x_b_no);
    var disp_tbl_flag = 0
    if (x_c_no == 0 && maxchap > 1) {
        disp_tbl_flag = 1
    };
    if  (x_c_no > maxchap) {x_c_no = maxchap};
    if  (x_c_no == 0) {x_c_no = 1}
    var maxverse = verse_max(x_b_no, x_c_no);
    build_hdr(x_b_no, x_c_no, maxchap, maxverse);
    fetch_chapter(x_b_no, x_c_no, maxverse);
    // fetch_chapter sets the flags which are used in the trailer. So, the order here is important
    build_tlr(x_b_no, x_c_no, maxchap, maxverse);
    if (disp_tbl_flag == 1) {
        chapter_tbl(x_b_no,maxchap)
    };
    var_coordinates = (100 + x_b_no).toString().substring(1,3) + "+" + (1000 + x_c_no).toString().substring(1,4)
	if(lsTest()) {localStorage.setItem("jbsb_v11_coordinates",var_coordinates);};
}

function build_hdr(book_no, chap_no, maxchap, maxverse) {
	var book_name = fetch_name(book_no);
    var x = '<table><tr>';
    x += ' <td class="c20" onclick="AllBooks(' + book_no + ')">' + book_name + '</td>';
    x += ' <td class="c20" onclick="chapter_tbl(' + book_no + ',' + maxchap + ')">' + chap_no + '</td>';
    x += ' <td class="c20" onclick="option_display()">Settings</td>';
    x += ' <td class="c20" onclick="Introductionfn()">Home</td>';
    x += ' <td class="c20" onclick="disp_bible_help()">Help</td>';
    x += '</tr></table>';
    document.getElementById("hdr_tbl").innerHTML = x;
	if(lsTest()) {localStorage.setItem("jbsb_v11_header_table",x);};
};

function build_tlr(book_no, chap_no, maxchap, maxverse) {
	var nextchap = chap_no + 1;
	var prevchap = chap_no - 1;
	var y = '<table><tr>';
    switch (read_mode) {
    case 1:
        y += ' <td class="c20" onclick="Option(' + '2' + ')">Mode 2</td>';
        y += ' <td class="c20" onclick="Option(' + '3' + ')">Mode 3</td>';
        if (var_opt1_nte.checked) {
            y += ' <td class="g20" onclick="notesfn()">Notes</td>';
        } else {
            y += ' <td class="c20" onclick="notesfn()">Notes</td>';
        };
        break;
    case 2:
        y += ' <td class="c20" onclick="Option(' + '1' + ')">Mode 1</td>';
        y += ' <td class="c20" onclick="Option(' + '3' + ')">Mode 3</td>';
        if (var_opt2_nte.checked) {
            y += ' <td class="g20" onclick="notesfn()">Notes</td>';
        } else {
            y += ' <td class="c20" onclick="notesfn()">Notes</td>';
        };
        break;
    case 3:
        y += ' <td class="c20" onclick="Option(' + '1' + ')">Mode 1</td>';
        y += ' <td class="c20" onclick="Option(' + '2' + ')">Mode 2</td>';
        if (var_opt3_nte.checked) {
            y += ' <td class="g20" onclick="notesfn()">Notes</td>';
        } else {
            y += ' <td class="c20" onclick="notesfn()">Notes</td>';
        };
        break;
    default:
        read_mode = 1;
        y += ' <td class="c20" onclick="Option(' + '2' + ')">Mode 2</td>';
        y += ' <td class="c20" onclick="Option(' + '3' + ')">Mode 3</td>';
        if (var_opt1_nte.checked) {
            y += ' <td class="g20" onclick="notesfn()">Notes</td>';
        } else {
            y += ' <td class="c20" onclick="notesfn()">Notes</td>';
        };
        break;
    };
    if (chap_no == 1) {
		y += ' <td class="v20"></td>';
	}
	else {
        y += ' <td class="c20" onclick="chapter_open(' + book_no + ',' + prevchap + ')">Prev</td>';
    };
    if  (chap_no == maxchap) {
        y += ' <td class="v20"></td>';
    }
    else {
        y += ' <td class="c20" onclick="chapter_open(' + book_no + ',' + nextchap + ')">Next</td>';
    };
    y += '</tr></table>';
    document.getElementById("btm_tbl").innerHTML = y;
	if(lsTest()) {localStorage.setItem("jbsb_v11_bottom_table",y);};
};

function fetch_chapter(x_b_no, x_c_no, maxverse) {
    var kjvyes = 0; 
    var webyes = 0; 
    var bsbyes = 0; 
    var yltyes = 0; 
    var lxxyes = 0; 
    var nteyes = 0;
    var mycount = 0;
    var tempstr = ""
    switch (read_mode) {
    case 1:
        if (var_opt1_bsb.checked) {bsbyes = 1; mycount +=1};
        if (var_opt1_web.checked) {webyes = 1; mycount +=1};
        if (var_opt1_kjv.checked) {kjvyes = 1; mycount +=1};
        if (var_opt1_ylt.checked) {yltyes = 1; mycount +=1};
        if (var_opt1_lxx.checked) {lxxyes = 1; mycount +=1};
        if (var_opt1_nte.checked) {nteyes = 1};
        if (mycount < 1){bsbyes = 1; mycount =1; set_option();}
        break;
    case 2:
        if (var_opt2_bsb.checked) {bsbyes = 1; mycount +=1};
        if (var_opt2_web.checked) {webyes = 1; mycount +=1};
        if (var_opt2_kjv.checked) {kjvyes = 1; mycount +=1};
        if (var_opt2_ylt.checked) {yltyes = 1; mycount +=1};
        if (var_opt2_lxx.checked) {lxxyes = 1; mycount +=1};
        if (var_opt2_nte.checked) {nteyes = 1};
        if (mycount < 1){bsbyes = 1;yltyes = 1; mycount = 2; set_option();}
        break;
    case 3:
        if (var_opt3_bsb.checked) {bsbyes = 1; mycount +=1};
        if (var_opt3_web.checked) {webyes = 1; mycount +=1};
        if (var_opt3_kjv.checked) {kjvyes = 1; mycount +=1};
        if (var_opt3_ylt.checked) {yltyes = 1; mycount +=1};
        if (var_opt3_lxx.checked) {lxxyes = 1; mycount +=1};
        if (var_opt3_nte.checked) {nteyes = 1};
        if (mycount < 1){bsbyes = 1; webyes = 1; kjvyes = 1; yltyes = 1; lxxyes = 1; nteyes = 1; mycount = 5; set_option();}
        break;
    default:
        bsbyes = 1;
        mycount = 1;
        set_option();
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
    hide_select_option();
    hide_results()
    window.location.href = ("#Top");
	if(lsTest()) {localStorage.setItem("jbsb_v11_body_text",x);};
};

function displaytext2(bno, cno, vno, maxverse) {
	var prevno = vno - 1;
	var nextno = vno + 1;
    var web_pfx = '<font style="color:Black">[WEB] '
    var kjv_pfx = '<font style="color:DarkGreen">[KJV] '
    var bsb_pfx = '<font style="color:LightCoral">[BSB] '
    var ylt_pfx = '<font style="color:SaddleBrown">[YLT] '
    var lxx_pfx = '<font style="color:olive">[LXX] '
    var rvwCtitle = book_short(bno) + (1000 + cno).toString().substring(1)
    var rvwVtitle = rvwCtitle + (1000 + vno).toString().substring(1)
    rvwVtitle += " " + (1000 + cno).toString().substring(1)
    rvwVtitle += (1000 + vno).toString().substring(1)
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
		x += ' <td class="c25"></td>';
	}
	else {
        x += ' <td class="c25" onclick="displaytext2(' + bno + ',' + cno + ',' + prevno + ',' + maxverse + ')">Prev</td>';
    };
    if  (vno == maxverse) {
        x += ' <td class="c25">End</td>';
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
    var last_col = maxchap % 10;
    var row_loop = (maxchap - last_col) / 10;
    var x = '<br><br><table>';
    x += '<th style="color:blue;"  colspan="10"><b>' + fetch_name(book_no) + ' - Chapters</b></th>'
    var i, j, k;
    for (i=0; i< row_loop; i++) {
        x += '<tr>';
        for (j=1; j<= 10; j++) {
            k = i * 10 + j;
            x += ' <td class="c10" onclick="chapter_open(' + book_no + ',' + k + ')">' + k + '</td>';
        }
        x += '</tr>';
    }
    if (last_col > 0) {
        x += '<tr>';
        for (j=1; j<= 10; j++) {
            if (j<= last_col) {
                k = row_loop * 10 + j;
                chapter_key = book_no * 1000 + k;
                x += ' <td class="c10" onclick="chapter_open(' + book_no + ',' + k + ')">' + k + '</td>';
            }
            else {
                x += ' <td class="w10"></td>';
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
    var last_col = maxverse % 10;
    var row_loop = (maxverse - last_col) / 10;
    var x = '<br><br><table><th style="color:blue;" colspan="10"> Choose verse</th>';
    var i, j, k;
    for (i=0; i< row_loop; i++) {
        x += '<tr>';
        for (j=1; j<= 10; j++) {
            k = i * 10 + j;
            x += ' <td class="o10" onclick="goto_verse(' + k + ')">' + k + '</td>';
        }
        x += '</tr>';
    }
    if (last_col > 0) {
        x += '<tr>';
        for (j=1; j<= last_col; j++) {
            k = row_loop * 10 + j;
            x += ' <td class="o10" onclick="goto_verse(' + k + ')">' + k + '</td>';
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
      x += booklist_nt()
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


