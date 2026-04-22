
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
    build_hdr(x_b_no, x_c_no, maxchap);
    fetch_chapter(x_b_no, x_c_no);
    if (disp_tbl_flag == 1) {
        chapter_tbl(x_b_no,maxchap)
    }
    else {
        hide_disp_tbl();
    };
    where_am_i = "b"
    bible_book = x_b_no
    bible_chapter = x_c_no
    set_co_ordinates()
}

function build_hdr(book_no, chap_no, maxchap) {
	var book_name = fetch_name(book_no);
    var x = '<table><tr>';
    x += ' <td class="c20" onclick="AllBooks(' + book_no + ')">' + book_name + '</td>';
    x += ' <td class="c20" onclick="chapter_tbl(' + book_no + ',' + maxchap + ')">' + chap_no + '</td>';
    x += ' <td class="c20" onclick="display_menu(1)">Settings</td>';
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
};

function display_menu(Type) {
	var x = '<table><tr>';
    x += '<td class="c25" onclick="Navigate(1)">Home</td>';
    if (Type == 1) {
        x += '<td class="c25" onclick="Navigate(2)">' + story_names(1) + '</td>'
    }
    else {
        x += '<td class="c25" onclick="Navigate(3)">Bible</td>'
    };
    x += '<td class="c25" onclick="Navigate(4)">Help</td>';
    x += '<td class="c25" onclick="ClosePop()">Close</td>';
    x += '</tr></table>';
    x += '<br>'
	x += '<table><tr>';
    x += ' <td class="c25" onclick="Read(' + "'b'" +  ')">BSB</td>';
    x += ' <td class="c25" onclick="Read(' + "'w'" + ')">WEB</td>';
    x += ' <td class="c25" onclick="Read(' + "'k'" + ')">KJV</td>';
    x += ' <td class="c25" onclick="Read(' + "'y'" + ')">YLT</td>';
    x += '</tr></table>';
    x += '<br>'
    if (Type == 1) {
        x += '<table><tr>'
        x += '<td class="w14">WEB <input id="opt1_web" type="checkbox" class="jchk"></td>'
        x += '<td class="w14">BSB <input id="opt1_bsb" type="checkbox" class="jchk"></td>'
        x += '<td class="w14">KJV <input id="opt1_kjv" type="checkbox" class="jchk"></td>'
        x += '<td class="w14">YLT <input id="opt1_ylt" type="checkbox" class="jchk"></td>'
        x += '<td class="w14">LXX <input id="opt1_lxx" type="checkbox" class="jchk"></td>'
        x += '<td class="w14">Notes <input id="opt1_nte" type="checkbox" class="jchk"></td>'
        x += '</tr></table>';
        x += '<br>'
        x += '<table><tr>'
        x += '<td class="o50" onclick="verse_tbl()">Select Verse</td>';
        x += '<td class="c50" onclick="set_option()">Parallel Bible</td>';
        x += '</tr></table>';
    };
/*    alert(x); */
    txt_modal.innerHTML = x;

    if (Type == 1) {
        var var_opt1_bsb = document.getElementById("opt1_bsb");
        var var_opt1_web = document.getElementById("opt1_web");
        var var_opt1_kjv = document.getElementById("opt1_kjv");
        var var_opt1_ylt = document.getElementById("opt1_ylt");
        var var_opt1_lxx = document.getElementById("opt1_lxx");
        var var_opt1_nte = document.getElementById("opt1_nte");
        if (parallel_read.includes("w")) {var_opt1_web.checked = true}
        if (parallel_read.includes("b")) {var_opt1_bsb.checked = true}
        if (parallel_read.includes("k")) {var_opt1_kjv.checked = true}
        if (parallel_read.includes("y")) {var_opt1_ylt.checked = true}
        if (parallel_read.includes("l")) {var_opt1_lxx.checked = true}
        if (parallel_read.includes("n")) {var_opt1_nte.checked = true}
    };
    modal.style.display = "block";
};

function Navigate(in_val) {
    switch(in_val) {
    case 1:
        ClosePop()
        Introductionfn()
        break;
    case 2:
        where_am_i = "s"
        ClosePop()
        full_resume()
        break;
    case 3:
        where_am_i = "b"
        ClosePop()
        full_resume()
        break;
    case 4:
        ClosePop()
        disp_bible_help()
        break;
    case 5:
        where_am_i = "t"
        ClosePop()
        full_resume()
        break;
    };
}

function Read(in_val) {
    bible_version = in_val
    parallel_read = parallel_read.replace("d","")
    ClosePop()
    full_resume()
};

function set_option() {
    var var_opt1_bsb = document.getElementById("opt1_bsb");
    var var_opt1_web = document.getElementById("opt1_web");
    var var_opt1_kjv = document.getElementById("opt1_kjv");
    var var_opt1_ylt = document.getElementById("opt1_ylt");
    var var_opt1_lxx = document.getElementById("opt1_lxx");
    var var_opt1_nte = document.getElementById("opt1_nte");

    parallel_read = "d"
    if  (var_opt1_web.checked) {parallel_read += "w";};
    if  (var_opt1_bsb.checked) {parallel_read += "b";};
    if  (var_opt1_kjv.checked) {parallel_read += "k";};
    if  (var_opt1_ylt.checked) {parallel_read += "y";};
    if  (var_opt1_lxx.checked) {parallel_read += "l";};
    if  (var_opt1_nte.checked) {parallel_read += "n";};
    if  (parallel_read == "d") {parallel_read = bible_version}

    ClosePop()
    full_resume();
};


async function fetch_chapter(x_b_no, x_c_no) {
    var web_pfx = '<font style="color:Black">'
    var bsb_pfx = '<font style="color:DarkGreen">'
    var kjv_pfx = '<font style="color:Teal">'
    var ylt_pfx = '<font style="color:SaddleBrown">'
    var lxx_pfx = '<font style="color:olive">'
    var notes_pfx = '<font style="color:red">Notes:'
    var xref_pfx = '<font style="color:purple">Xref:'
    var Verse_pfx = "<u>";
    var Verse_sfx = "</u>";
    var sfx = '</font><br>'
    var maxverse = verse_max(x_b_no, x_c_no);
    var kjvyes = 0; 
    var webyes = 0; 
    var bsbyes = 0; 
    var yltyes = 0; 
    var lxxyes = 0; 
    var nteyes = 0;
    var mycount = 0;
    var tempstr = ""
    if (parallel_read.includes("d")) {
        if (parallel_read.includes("b")) {bsbyes = 1; mycount +=1};
        if (parallel_read.includes("w")) {webyes = 1; mycount +=1};
        if (parallel_read.includes("k")) {kjvyes = 1; mycount +=1};
        if (parallel_read.includes("y")) {yltyes = 1; mycount +=1};
        if (parallel_read.includes("l")) {lxxyes = 1; mycount +=1};
        if (parallel_read.includes("n")) {nteyes = 1};
    }
    else {
        mycount = 1
        switch (bible_version) {
        case 'w':
            webyes = 1;
            break;
        case 'b':
            bsbyes = 1;
            bsb_pfx = web_pfx
            break;
        case 'k':
            kjvyes = 1;
            kjv_pfx = web_pfx
            break;
        case 'y':
            yltyes = 1;
            ylt_pfx = web_pfx
            break;
        default:
            webyes = 1;
            break;
        };
    };
    if (mycount == 1) {
        if (bsbyes == 1) {tempstr = "Berean Standard Bible "}
        if (webyes == 1) {tempstr = "World English Bible"}
        if (kjvyes == 1) {tempstr = "King James Version"}
        if (yltyes == 1) {tempstr = "Young's Literal Translation"}
        if (lxxyes == 1) {tempstr = "Septuagint"}
    } else {
        Verse_pfx += "Verse "; 
        Verse_sfx += "<br>";
        bsb_pfx += '[BSB] '
        web_pfx += '[WEB] '
        kjv_pfx += '[KJV] '
        ylt_pfx += '[YLT] '
        lxx_pfx += '[LXX] '
    };
    var x = '<p><h2 style="text-align:center;">' + tempstr + '</h2>'

    let web_chap = []; let bsb_chap = []; let kjv_chap = []; let ylt_chap = []; let lxx_chap = []; let xrf_chap = []; let nte_chap = [];

    // 1. Create an array of promises (don't use 'await' yet)
    let promises = [];

    // We push the function calls into the array so they all start immediately
    if (webyes == 1) promises.push(chap_fetch("web", x_b_no, x_c_no).then(data => web_chap = data));
    if (bsbyes == 1) promises.push(chap_fetch("bsb", x_b_no, x_c_no).then(data => bsb_chap = data));
    if (kjvyes == 1) promises.push(chap_fetch("kjv", x_b_no, x_c_no).then(data => kjv_chap = data));
    if (yltyes == 1) promises.push(chap_fetch("ylt", x_b_no, x_c_no).then(data => ylt_chap = data));
    if (lxxyes == 1 && x_b_no <= 39) promises.push(chap_fetch("lxx", x_b_no, x_c_no).then(data => lxx_chap = data));

    if (nteyes == 1) {
        promises.push(chap_fetch("nte", x_b_no, x_c_no).then(data => nte_chap = data));
        promises.push(chap_fetch("xrf", x_b_no, x_c_no).then(data => xrf_chap = data));
    }

    // 2. Now wait for ALL of them to finish at once
    await Promise.all(promises);


    var i;
    for (i = 1; i<= maxverse; i++) {
        clickstr = ' onclick="displaytext2(' + x_b_no + ',' + x_c_no + ',' + i + ')"'
        /*if (i == 1) {alert(clickstr)};*/
        clickid  = '<a id="V' + i + '"></a>'
        x += clickid + '<span style="color:blue;cursor: pointer;"' + clickstr + '>' + Verse_pfx + i + Verse_sfx + '</span>'
        if  (webyes == 1) { x += web_pfx + ' ' + web_chap[i-1].substring(8) + sfx;};
        if  (bsbyes == 1) { x += bsb_pfx + ' ' + bsb_chap[i-1].substring(8) + sfx;};
        if  (kjvyes == 1) { x += kjv_pfx + ' ' + kjv_chap[i-1].substring(8) + sfx;};
        if  (yltyes == 1) { x += ylt_pfx + ' ' + ylt_chap[i-1].substring(8) + sfx;};
        if  (lxxyes == 1 && x_b_no <= 39) { x += lxx_pfx + ' ' + lxx_chap[i-1].substring(8) + sfx;};
        if  (nteyes > 0) {
            note1 = nte_chap[i-1].substring(8)
            notex = xrf_chap[i-1].substring(8)
            if (note1.length > 0) {
                x += notes_pfx + ' ' + note1 + sfx;
            };
            notex_len = notex.length
            if (notex_len > 0) {
                x += xref_pfx + ' ';
                x_elem = notex.split("|")
                for (let name of x_elem) {
                    notex_bname = name.substring(0,3)
                    notex_cno = parseInt(name.substring(3,6),10)
                    notex_vno = parseInt(name.substring(6),10)
                    x += '<span style="color: blue; cursor: pointer;" onclick="displaytext2(' 
                    x += book_no_fetch(notex_bname) + ',' + notex_cno + ',' + notex_vno + ')">'
                    x += notex_bname + name.substring(3) + '</span> '
                };
                x += sfx;
            };
        };
    };
    x += "<br><br><br><br><br></p>"
    document.getElementById("disp_txt").innerHTML = x;
    hide_results()
    window.location.href = ("#Top");
};

async function displaytext2(bno, cno, vno) {
    var bsb_pfx = '<font style="color:Black">[BSB] '
    var web_pfx = '<font style="color:DarkGreen">[WEB] '
    var kjv_pfx = '<font style="color:Teal">[KJV] '
    var ylt_pfx = '<font style="color:SaddleBrown">[YLT] '
    var lxx_pfx = '<font style="color:olive">[LXX] '
    var xref_pfx = '<font style="color:purple">Xref:'
    var notes_pfx = '<font style="color:red">Notes:'
    var sfx = '</font><br>'

    let web_chap = []; let bsb_chap = []; let kjv_chap = []; let ylt_chap = []; let lxx_chap = []; let xrf_chap = []; let nte_chap = [];

    web_chap = await chap_fetch("web", bno, cno);
    bsb_chap = await chap_fetch("bsb", bno, cno);
    kjv_chap = await chap_fetch("kjv", bno, cno);
    ylt_chap = await chap_fetch("ylt", bno, cno);
    if  (bno <= 39) {lxx_chap = await chap_fetch("lxx", bno, cno);};
    nte_chap = await chap_fetch("nte", bno, cno);
    xrf_chap = await chap_fetch("xrf", bno, cno);

    var x = '<table><tr>';
    x += ' <td class="c25" onclick="ClosePop()">Close</td>';
    x += ' <td class="v25"></td>';
    x += ' <td class="v25"></td>';
    x += '</tr></table>';
    x += '<p> Verse ' + vno + '<br><br>';
    x += web_pfx + ' ' + web_chap[vno - 1].substring(8) + sfx;
    x += bsb_pfx + ' ' + bsb_chap[vno - 1].substring(8) + sfx;
    x += kjv_pfx + ' ' + kjv_chap[vno - 1].substring(8) + sfx;
    x += ylt_pfx + ' ' + ylt_chap[vno - 1].substring(8) + sfx;
    if  (bno <= 39) {x += lxx_pfx + ' ' + lxx_chap[vno - 1].substring(8) + sfx;};

    note1 = nte_chap[vno-1].substring(8)
    notex = xrf_chap[vno-1].substring(8)
    if (note1.length > 0) {
        x += notes_pfx + ' ' + note1 + sfx;
    };
    notex_len = notex.length
    if (notex_len > 0) {
        x += xref_pfx + ' ';
        x_elem = notex.split("|")
        for (let name of x_elem) {
            x += name + " ";
        };
        x += sfx;
    };
    x += '</p><br><br><br><br>';
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
    if (book_no == 27 && (window.innerWidth <= 768)) {nbr_cols = 7; disp_class_no = "14"}
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
    x += '</table>'
    x += '<table><tr>';
    x += '<td class="w80"></td>';
    x += '<td class="g20" onclick="hide_disp_tbl()"><b>Close Table</b></td>'
    x += '</tr>';
    x += '</table>'
    document.getElementById("disp_tbl").innerHTML = x;
    document.getElementById("disp_tbl").style.display = 'block';
    window.location.href = ("#Top");
}

function verse_tbl() {
    var x_b_no = 1;
    var x_c_no = 1;
    var maxverse = 1;
    var tempString = var_coordinates;
    if  (tempString != null && tempString.length == 6) {
        x_b_no = parseInt(tempString.substring(0,2))
        x_c_no = parseInt(tempString.substring(3,6));
    };
    maxverse = verse_max(x_b_no, x_c_no);

    var nbr_cols = 10
    var disp_class_no = "10"
    if (maxverse > 99 && (window.innerWidth <= 768)) {nbr_cols = 7; disp_class_no = "14"}

    var last_col = maxverse % nbr_cols;
    var row_loop = (maxverse - last_col) / nbr_cols;
    var x = '<br><br><table><th style="color:blue;" colspan="' + nbr_cols + '"> Choose verse</th>';
    var i, j, k;
    for (i=0; i< row_loop; i++) {
        x += '<tr>';
        for (j=1; j<= nbr_cols; j++) {
            k = i * nbr_cols + j;
            x += ' <td class="o' + disp_class_no + '" onclick="goto_verse(' + k + ')">' + k + '</td>';
        }
        x += '</tr>';
    }
    if (last_col > 0) {
        x += '<tr>';
        for (j=1; j<= last_col; j++) {
            k = row_loop * nbr_cols + j;
            x += ' <td class="o' + disp_class_no + '" onclick="goto_verse(' + k + ')">' + k + '</td>';
        }
        x += '</tr>';
    }
    x += '</table>'
    x += '<table><tr>';
    x += '<td class="w80"></td>';
    x += '<td class="g20" onclick="hide_disp_tbl()"><b>Close Table</b></td>'
    x += '</tr>';
    x += '</table>'
    document.getElementById("disp_tbl").innerHTML = x;
    document.getElementById("disp_tbl").style.display = 'block';
    window.location.href = ("#Top");
    ClosePop()
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
        if (window.innerWidth <= 768) {
            x += shortlist_ot()
        } else {
            x += fulllist_ot()
        };
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
    document.getElementById("disp_tbl").innerHTML = x;
    document.getElementById("disp_tbl").style.display = 'block';
    window.location.href = ("#Top");
};

function fulllist_ot() {
    var x = '<table><tr>'
    x += ' <td class="c20" onclick="book_open(1)">Genesis</td>'
    x += ' <td class="c20" onclick="book_open(2)">Exodus</td>'
    x += ' <td class="c20" onclick="book_open(3)">Leviticus</td>'
    x += ' <td class="c20" onclick="book_open(4)">Numbers</td>'
    x += ' <td class="c20" onclick="book_open(5)">Deuteronomy</td>'
    x += '</tr>'
    x += '<tr>'
    x += ' <td class="c20" onclick="book_open(6)">Joshua</td>'
    x += ' <td class="c20" onclick="book_open(7)">Judges</td>'
    x += ' <td class="c20" onclick="book_open(31)">Ruth</td>'
    x += ' <td class="c20" onclick="book_open(8)">1 Samuel</td>'
    x += ' <td class="c20" onclick="book_open(9)">2 Samuel</td>'
    x += '</tr>'
    x += '<tr>'
    x += ' <td class="c20" onclick="book_open(10)">1 Kings</td>'
    x += ' <td class="c20" onclick="book_open(11)">2 Kings</td>'
    x += '</tr>'
    x += '<tr>'
    x += ' <td class="c20" onclick="book_open(38)">1 Chronicles</td>'
    x += ' <td class="c20" onclick="book_open(39)">2 Chronicles</td>'
    x += ' <td class="c20" onclick="book_open(36)">Ezra</td>'
    x += ' <td class="c20" onclick="book_open(37)">Nehemiah</td>'
    x += ' <td class="c20" onclick="book_open(34)">Esther</td>'
    x += '</tr>'
    x += '<tr>'
    x += ' <td class="c20" onclick="book_open(29)">Job</td>'
    x += ' <td class="c20" onclick="book_open(27)">Psalms</td>'
    x += ' <td class="c20" onclick="book_open(28)">Proverbs</td>'
    x += ' <td class="c20" onclick="book_open(33)">Ecclesiastes</td>'
    x += ' <td class="c20" onclick="book_open(30)">SongofSongs</td>'
    x += '</tr>'
    x += '<tr>'
    x += ' <td class="c20" onclick="book_open(12)">Isaiah</td>'
    x += ' <td class="c20" onclick="book_open(13)">Jeremiah</td>'
    x += ' <td class="c20" onclick="book_open(14)">Ezekiel</td>'
    x += ' <td class="c20" onclick="book_open(32)">Lamentations</td>'
    x += ' <td class="c20" onclick="book_open(35)">Daniel</td>'
    x += '</tr>'
    x += '<tr>'
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
    x += '<td class="w20"></td>';
    x += '<td class="g40" colspan="4" onclick="hide_disp_tbl()"><b>Close</b></td>'
    x += '</tr>';
    x += '</table>'
    return x;
};

function shortlist_ot() {
    var x = '<table><tr>'
    x += ' <td class="c20" onclick="book_open(1)">Gen</td>'
    x += ' <td class="c20" onclick="book_open(2)">Exo</td>'
    x += ' <td class="c20" onclick="book_open(3)">Lev</td>'
    x += ' <td class="c20" onclick="book_open(4)">Num</td>'
    x += ' <td class="c20" onclick="book_open(5)">Deu</td>'
    x += '</tr>'
    x += '<tr>'
    x += ' <td class="c20" onclick="book_open(6)">Jos</td>'
    x += ' <td class="c20" onclick="book_open(7)">Jdg</td>'
    x += ' <td class="c20" onclick="book_open(31)">Rut</td>'
    x += ' <td class="c20" onclick="book_open(8)">1Sa</td>'
    x += ' <td class="c20" onclick="book_open(9)">2Sa</td>'
    x += '</tr>'
    x += '<tr>'
    x += ' <td class="c20" onclick="book_open(10)">1Ki</td>'
    x += ' <td class="c20" onclick="book_open(11)">2Ki</td>'
    x += '</tr>'
    x += '<tr>'
    x += ' <td class="c20" onclick="book_open(38)">1Ch</td>'
    x += ' <td class="c20" onclick="book_open(39)">2Ch</td>'
    x += ' <td class="c20" onclick="book_open(36)">Ezr</td>'
    x += ' <td class="c20" onclick="book_open(37)">Neh</td>'
    x += ' <td class="c20" onclick="book_open(34)">Est</td>'
    x += '</tr>'
    x += '<tr>'
    x += ' <td class="c20" onclick="book_open(29)">Job</td>'
    x += ' <td class="c20" onclick="book_open(27)">Psa</td>'
    x += ' <td class="c20" onclick="book_open(28)">Pro</td>'
    x += ' <td class="c20" onclick="book_open(33)">Ecc</td>'
    x += ' <td class="c20" onclick="book_open(30)">Son</td>'
    x += '</tr>'
    x += '<tr>'
    x += ' <td class="c20" onclick="book_open(12)">Isa</td>'
    x += ' <td class="c20" onclick="book_open(13)">Jer</td>'
    x += ' <td class="c20" onclick="book_open(14)">Eze</td>'
    x += ' <td class="c20" onclick="book_open(32)">Lam</td>'
    x += ' <td class="c20" onclick="book_open(35)">Dan</td>'
    x += '</tr>'
    x += '<tr>'
    x += ' <td class="c20" onclick="book_open(15)">Hos</td>'
    x += ' <td class="c20" onclick="book_open(16)">Joe</td>'
    x += ' <td class="c20" onclick="book_open(17)">Amo</td>'
    x += ' <td class="c20" onclick="book_open(18)">Oba</td>'
    x += ' <td class="c20" onclick="book_open(19)">Jon</td>'
    x += '</tr>'
    x += '<tr>'
    x += ' <td class="c20" onclick="book_open(20)">Mic</td>'
    x += ' <td class="c20" onclick="book_open(21)">Nah</td>'
    x += ' <td class="c20" onclick="book_open(22)">Hab</td>'
    x += ' <td class="c20" onclick="book_open(23)">Zep</td>'
    x += ' <td class="c20" onclick="book_open(24)">Hag</td>'
    x += '</tr>'
    x += '<tr>'
    x += ' <td class="c20" onclick="book_open(25)">Zec</td>'
    x += ' <td class="c20" onclick="book_open(26)">Mal</td>'
    x += '<td class="w20"></td>';
    x += '<td class="g40" colspan="4" onclick="hide_disp_tbl()"><b>Close</b></td>'
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
    x += ' <td class="c20" onclick="book_open(62)">1 John</td>'
    x += ' <td class="c20" onclick="book_open(63)">2 John</td>'
    x += '</tr>'
    x += '<tr>'
    x += ' <td class="c20" onclick="book_open(64)">3 John</td>'
    x += ' <td class="c20" onclick="book_open(65)">Jude</td>'
    x += ' <td class="c20" onclick="book_open(66)">Revelation</td>'
    x += '<td class="g40" colspan="4" onclick="hide_disp_tbl()"><b>Close</b></td>'
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
    x += ' <td class="c20" onclick="book_open(62)">1Jo</td>'
    x += ' <td class="c20" onclick="book_open(63)">2Jo</td>'
    x += '</tr>'
    x += '<tr>'
    x += ' <td class="c20" onclick="book_open(64)">3Jo</td>'
    x += ' <td class="c20" onclick="book_open(65)">Jud</td>'
    x += ' <td class="c20" onclick="book_open(66)">Rev</td>'
    x += '<td class="g40" colspan="4" onclick="hide_disp_tbl()"><b>Close</b></td>'
    x += '</tr></table><br>'
    return x;
};
function hide_disp_tbl() {
    document.getElementById("disp_tbl").style.display = 'none';
};

function hide_results() {
    document.getElementById("srch_results").style.display = 'none';
};



