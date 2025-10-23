function Option(in_val) {
    read_mode = in_val;
    chapter_resume();
    foption = foption.substring(0,26) + read_mode
    if(lsTest()) {localStorage.setItem("jbsb_v11_foption",foption);};
};

function notesfn() {
    switch (read_mode) {
    case 1:
        if  (var_opt1_nte.checked) {var_opt1_nte.checked = false;} else {var_opt1_nte.checked = true;};
        break;
    case 2:
        if  (var_opt2_nte.checked) {var_opt2_nte.checked = false;} else {var_opt2_nte.checked = true;};
        break;
    case 3:
        if  (var_opt3_nte.checked) {var_opt3_nte.checked = false;} else {var_opt3_nte.checked = true;};
        break;
    default:
        read_mode = 1
        if  (var_opt1_nte.checked) {var_opt1_nte.checked = false;} else {var_opt1_nte.checked = true;};
    };
    change_option();
};

function change_option() {
    set_option();
    chapter_resume();
};

function option_display() {
    document.getElementById("select_option").style.display = 'block';
    window.location.href = ("#Top");
};

function hide_select_option() {
    document.getElementById("select_option").style.display = 'none';
};

function hide_disp_tbl() {
    document.getElementById("disp_tbl").style.display = 'none';
};

function hide_results() {
    document.getElementById("srch_results").style.display = 'none';
};

function set_option() {
    var foption_var_opt1_web = "_";
    var foption_var_opt1_kjv = "_";
    var foption_var_opt1_bsb = "_";
    var foption_var_opt1_ylt = "_";
    var foption_var_opt1_lxx = "_";
    var foption_var_opt1_nte = "_";

    var foption_var_opt2_web = "_";
    var foption_var_opt2_kjv = "_";
    var foption_var_opt2_bsb = "_";
    var foption_var_opt2_ylt = "_";
    var foption_var_opt2_lxx = "_";
    var foption_var_opt2_nte = "_";

    var foption_var_opt3_web = "_";
    var foption_var_opt3_kjv = "_";
    var foption_var_opt3_bsb = "_";
    var foption_var_opt3_ylt = "_";
    var foption_var_opt3_lxx = "_";
    var foption_var_opt3_nte = "_";

    if  (var_opt1_web.checked) {foption_var_opt1_web = "w";};
    if  (var_opt1_kjv.checked) {foption_var_opt1_kjv = "k";};
    if  (var_opt1_bsb.checked) {foption_var_opt1_bsb = "b";};
    if  (var_opt1_ylt.checked) {foption_var_opt1_ylt = "y";};
    if  (var_opt1_lxx.checked) {foption_var_opt1_lxx = "l";};
    if  (var_opt1_nte.checked) {foption_var_opt1_nte = "n";};

    if  (var_opt2_web.checked) {foption_var_opt2_web = "w";};
    if  (var_opt2_kjv.checked) {foption_var_opt2_kjv = "k";};
    if  (var_opt2_bsb.checked) {foption_var_opt2_bsb = "b";};
    if  (var_opt2_ylt.checked) {foption_var_opt2_ylt = "y";};
    if  (var_opt2_lxx.checked) {foption_var_opt2_lxx = "l";};
    if  (var_opt2_nte.checked) {foption_var_opt2_nte = "n";};

    if  (var_opt3_web.checked) {foption_var_opt3_web = "w";};
    if  (var_opt3_kjv.checked) {foption_var_opt3_kjv = "k";};
    if  (var_opt3_bsb.checked) {foption_var_opt3_bsb = "b";};
    if  (var_opt3_ylt.checked) {foption_var_opt3_ylt = "y";};
    if  (var_opt3_lxx.checked) {foption_var_opt3_lxx = "l";};
    if  (var_opt3_nte.checked) {foption_var_opt3_nte = "n";};

    newoption1  = foption_var_opt1_web + foption_var_opt1_kjv + foption_var_opt1_bsb + foption_var_opt1_ylt + foption_var_opt1_lxx
    newoption2  = foption_var_opt2_web + foption_var_opt2_kjv + foption_var_opt2_bsb + foption_var_opt2_ylt + foption_var_opt2_lxx
    newoption3  = foption_var_opt3_web + foption_var_opt3_kjv + foption_var_opt3_bsb + foption_var_opt3_ylt + foption_var_opt3_lxx

    if  (newoption1 == "_____") {
        var_opt1_bsb.checked = true;
        newoption1  = "b____";
    };
    if  (newoption2 == "_____") {
        var_opt2_bsb.checked = true;
        var_opt2_ylt.checked = true;
        newoption2  = "by___";
    };
    if  (newoption3 == "_____") {
        var_opt3_bsb.checked = true;
        var_opt3_web.checked = true;
        var_opt3_kjv.checked = true;
        var_opt3_ylt.checked = true;
        var_opt3_lxx.checked = true;
        foption_var_opt3_nte = "n"
        var_opt3_nte.checked = true;
        newoption3  = "bwkyl";
    };

    newoption =  newoption1 + foption_var_opt1_nte + "123x";
    newoption += newoption2 + foption_var_opt2_nte + "123x";
    newoption += newoption3 + foption_var_opt3_nte + "123x";

    foption = newoption + read_mode
    //alert("foption:" + foption)

    if(lsTest()) {localStorage.setItem("jbsb_v11_foption",foption);};
    document.getElementById("select_option").style.display = 'none';
};


