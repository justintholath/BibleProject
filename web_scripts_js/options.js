function readMode() {
    read_mode = "r";
    chapter_resume();
    foption = foption.substring(0,9) + read_mode
    if(lsTest()) {localStorage.setItem("jbsb_v11_foption",foption);};
};

function compareMode() {
    read_mode = "c";
    chapter_resume();
    foption = foption.substring(0,9) + read_mode
    if(lsTest()) {localStorage.setItem("jbsb_v11_foption",foption);};
};

function selectMode() {
    read_mode = "s";
    chapter_resume();
    foption = foption.substring(0,9) + read_mode
    if(lsTest()) {localStorage.setItem("jbsb_v11_foption",foption);};
};

function allShow() {
    read_mode = "a";
    chapter_resume();
    foption = foption.substring(0,9) + read_mode
    if(lsTest()) {localStorage.setItem("jbsb_v11_foption",foption);};
};

function notesfn() {
    if  (var_opt_nte.checked) {
        var_opt_nte.checked = false;
        foption = foption.substring(0,5) + "_" + foption.substring(6)
    } 
    else {
        var_opt_nte.checked = true;
        foption = foption.substring(0,5) + "n" + foption.substring(6)
    };
    chapter_resume();
    if(lsTest()) {localStorage.setItem("jbsb_v11_foption",foption);};
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



function change_option() {
    var foption_var_opt_web = "_";
    var foption_var_opt_kjv = "_";
    var foption_var_opt_bsb = "_";
    var foption_var_opt_ylt = "_";
    var foption_var_opt_lxx = "_";
    var foption_var_opt_nte = "_";

    if  (var_opt_web.checked) {foption_var_opt_web = "w";};
    if  (var_opt_kjv.checked) {foption_var_opt_kjv = "k";};
    if  (var_opt_bsb.checked) {foption_var_opt_bsb = "b";};
    if  (var_opt_ylt.checked) {foption_var_opt_ylt = "y";};
    if  (var_opt_lxx.checked) {foption_var_opt_lxx = "l";};
    if  (var_opt_nte.checked) {foption_var_opt_nte = "n";};
    newoption  = foption_var_opt_web + foption_var_opt_kjv + foption_var_opt_bsb 
    newoption += foption_var_opt_ylt + foption_var_opt_lxx + foption_var_opt_nte;

    var foption_var_par_kjv = "_";
    var foption_var_par_web = "_";
    var foption_var_par_ylt = "_";

    if  (var_par_kjv.checked) {foption_var_par_kjv = "k";};
    if  (var_par_web.checked) {foption_var_par_web = "w";};
    if  (var_par_ylt.checked) {foption_var_par_ylt = "y";};
    newpar  = foption_var_par_kjv + foption_var_par_web + foption_var_par_ylt; 

    if  (newoption == "______") {
        var_opt_web.checked = true;
        newoption  = "b_____";
    };
    if  (newpar == "___") {
        var_par_ylt.checked = true;
        newpar  = "__y";
    };

    read_mode = "s";
    foption = newoption + newpar + read_mode

    if(lsTest()) {localStorage.setItem("jbsb_v11_foption",foption);};
    document.getElementById("select_option").style.display = 'none';
    //alert(foption);

    chapter_resume();
};

