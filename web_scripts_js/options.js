function Option(in_val) {
    read_mode = in_val;
    chapter_resume();
    foption = foption.substring(0,27) + read_mode
    if(lsTest()) {localStorage.setItem("jbsb_v11_foption",foption);};
};

function change_option() {
    set_option();
    chapter_resume();
};

function hide_disp_tbl() {
    document.getElementById("disp_tbl").style.display = 'none';
};

function hide_results() {
    document.getElementById("srch_results").style.display = 'none';
};



