
var BASE_INFO = {
    "FemaleCrusader": {
        "attack": [0, 
            38, 40, 42, 43, 44, 46, 48, 49, 51, 52, 
            53, 55, 57, 58, 60, 61, 62, 64, 66, 68, 
            69, 70, 72, 74, 75, 77, 78, 79, 81, 83, 
            84, 86, 87, 88, 90, 92, 93, 95, 96, 98],
        "attribute_coeff":1/665,
        "attribute_offset":4350,
        "gain_coeff":1/26395,
        "gain_offset":3500,
        "cp_coeff":1.08
    },
    "Muse": {
        "attack": [0, 
            40, 42, 44, 46, 47, 49, 51, 52, 54, 55, 
            56, 58, 60, 61, 63, 64, 65, 67, 70, 72, 
            73, 74, 76, 78, 80, 82, 83, 84, 86, 88, 
            89, 92, 93, 94, 96, 98, 99, 101, 102, 104],
        "attribute_coeff":1/665,
        "attribute_offset":4350,
        "gain_coeff":1/26395,
        "gain_offset":3500,
        "cp_coeff":1.08
    },
    "Enchantress": {
        "attack": [0, 
            34, 35, 37, 38, 39, 41, 42, 43, 45, 46, 
            47, 49, 50, 51, 53, 54, 55, 57, 58, 60, 
            61, 62, 64, 65, 66, 68, 69, 70, 72, 73, 
            74, 76, 77, 78, 80, 81, 82, 84, 85, 87],
        "attribute_coeff":1/665,
        "attribute_offset":4350,
        "gain_coeff":1/26395,
        "gain_offset":3500,
        "cp_coeff":1.08
    },
    "MaleCrusader": {
        "attack": [0, 
            43, 44, 46, 48, 49, 51, 53, 54, 56, 58, 
            59, 61, 63, 64, 66, 68, 69, 71, 73, 75, 
            76, 78, 80, 81, 83, 85, 86, 88, 90, 91, 
            93, 95, 96, 98, 100, 101, 103, 105, 106],
        "attribute_coeff":1/620,
        "attribute_offset":4345,
        "gain_coeff":1/28012,
        "gain_offset":3498,
        "cp_coeff":1.008
    },
};

// 奶妈和奶爸 的buff基础三攻和力智需要修正
function fix_buff_base(e,coeff){
    e *= coeff;
    return Math.round(e);
}

BASE_INFO.FemaleCrusader.attack.forEach((e,i)=>{
    BASE_INFO.FemaleCrusader.attack[i] = fix_buff_base(e,1.02);
});
BASE_INFO.MaleCrusader.attack.forEach((e,i)=>{
    BASE_INFO.MaleCrusader.attack[i] = fix_buff_base(e,1.02);
});


function calc_character(character,data) {
    const base_info = BASE_INFO[character];
    var attack_buff1 = (base_info.attack[data.buff_lv]+data.fixed_attack);
    attack_buff1 *= (data.attribute*base_info.attribute_coeff+1);
    attack_buff1 *= (1+data.percentage_attack/100);

    var attack_buff2 = base_info.attack[data.buff_lv];
    attack_buff2 *= ((data.attribute+base_info.attribute_offset)*base_info.attribute_coeff+1);
    attack_buff2 *= (data.total_gain+base_info.gain_offset)*base_info.gain_coeff;

    var attack_buff = attack_buff1+attack_buff2;
    if (data.is_cp_weapon) {
        attack_buff *= base_info.cp_coeff;
    }
    return attack_buff;
}
function calc() {
    const data = {
        attribute : parseInt(document.getElementById("attribute").value) | 0,
        buff_lv : parseInt(document.getElementById("buff_lv").value) | 0,
        fixed_gain : parseInt(document.getElementById("fixed_gain").value) | 0,
        percentage_gain : parseFloat(document.getElementById("percentage_gain").value) | 0,
        fixed_attack : parseInt(document.getElementById("fixed_attack").value) | 0,
        percentage_attack : parseFloat(document.getElementById("percentage_attack").value) | 0,
        is_cp_weapon : document.getElementById("is_cp_weapon").checked,
        total_gain : 0
    };
    data.total_gain = data.fixed_gain*(1+data.percentage_gain/100);
    
    [
        "FemaleCrusader","Muse","Enchantress","MaleCrusader"
    ].forEach(element => {
        var attack_buff = calc_character(element,data);
        document.getElementById(element).value = attack_buff.toFixed(2);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const attribute_input = document.getElementById("attribute");
    const buff_lv_input = document.getElementById("buff_lv");
    const fixed_gain_input = document.getElementById("fixed_gain");
    const percentage_gain_input = document.getElementById("percentage_gain");
    const fixed_attack_input = document.getElementById("fixed_attack");
    const percentage_attack_input = document.getElementById("percentage_attack");
    const is_cp_weapon_checkbox = document.getElementById("is_cp_weapon");

    [
        attribute_input, buff_lv_input,
        fixed_gain_input, percentage_gain_input,
        fixed_attack_input, percentage_attack_input,
        is_cp_weapon_checkbox
    ].forEach(element => {
        element.addEventListener("input", calc);
    });
    calc();
});
