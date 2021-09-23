/**
 * Dependency regression.js 
 */

const fixed_sc = 10;

/**
 * Find Object in Json
 * @param {Json} currentJson 
 * @param {String} wanted Attribute name
 * @param {String} onKey Attribute key
 * @returns
 */
function findIdJson(currentJson, wanted, onKey) {
    let wantedKey = '';
    let keys = Object.keys(currentJson);
    for (let i = 0; i < keys.length; i++) {
        if (currentJson[keys[i]][onKey] == wanted) return keys[i];
    }
    return wantedKey;
}

/**
 * Use regression function
 * @param {Array} coord [{x: 0,y: 0}, {x: 0,y: 0}]
 * @returns 
 */
 function getPoly(coord) {
    let poly = regression.polynomial(coord, { order: 3, precision: fixed_sc });
    return poly.equation;
}

/**
 * polynomial pollination
 * @param {Array} coord [{x: 0,y: 0}, {x: 0,y: 0}]
 * @param {Number} x_first 
 * @param {Number} x_last 
 * @param {Number} step
 * @returns 
 */
function getPolyLissage(coord, x_first, x_last, step) {
    let all_x = [];
    for (let i = x_first; i <= x_last; i += step) {
        all_x.push(i);
    }

    let currentPoly = getPoly(coord);
    let currentCoord = getPoly_coord(currentPoly, all_x);
    
    return currentCoord;
}

/**
 * Get all coord of a poly for wanted X
 * @param {Array} poly 
 * @param {Array} all_x 
 * @param {Boolean} reverse Reverse order of coords
 * @returns {Array}
 */
function getPoly_coord(poly, all_x, reverse = false) {
    let all_y = [];
    let poly_length = poly.length
    for (let i = 0; i < all_x.length; i++) {
        let x = all_x[i];
        let y = 0;
        for (let j = 0; j < poly_length; j++) {
            y += poly[j] * Math.pow(x, poly_length - 1 - j);
        }
        all_y.push({ x: x, y: y })
    }
    if (reverse) {
        return all_y.reverse();
    } else return all_y;
}


function convert_h_s(value, unit = 'l/s') {
    let current;
    if (debit_unit.value == 'l/s') {
        current = (value * 3.6).toFixed(fixed_nor);
    } else {
        current = value;
    }

    return parseFloat(current);
}

/**
 * 
 * @param {Object} a 
 * @param {Object} b 
 * @param {Array} t 
 * @returns {Boolean}
 */
function swap(a, b) {
    try {
        return (a.ecart_q < b.ecart_q);
    } catch (error) {
        return true;
    }
}

function order_asc(t) {
    for (var i = 1; i < t.length; i++) {
        var temp = t[i];
        var j = i - 1;
        while (swap(temp, t[j]) && j >= 0) {
            t[j + 1] = t[j]
            j--;
        };
        t[j + 1] = temp;

    }
    return t;
}

/**
 * 
 * @param {Array} current_tab 
 * @param {Number} upto 
 * @returns 
 */
function findLowest_nth(current_tab, upto) {
    let ordered_tab = order_asc(current_tab).slice(0, upto);
    return ordered_tab;
}

/**
 * Round Float number
 * @param {Number} value 
 * @param {Number} precision 
 * @returns {Number}
 */
function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

/**
 * Find derive of a polynome
 * @param {Array} poly 
 * @returns {Array}
 */
function getderive(poly) {
    let derive = [];
    let maxPuiss = poly.length - 1;
    for (let i = 0; i < maxPuiss; i++) {
        derive.push(poly[i] * (maxPuiss - i));
    }
    return derive
}

/**
 * Find descriminant poly 2 deg
 * @param {Array} poly 
 * @param {Boolean} isabs 
 * @returns {Number}
 */
function getdelta(poly, isabs) {
    if (isabs) return Math.abs(Math.pow(poly[1], 2) - (4 * poly[0] * poly[2]));
    else return Math.pow(poly[1], 2) - (4 * poly[0] * poly[2]);
}

/**
 * Find solution for poly 2 deg
 * @param {Array} poly 
 * @returns {Number}
 */
function getSolution(poly) {
    let derive = getderive(poly);
    let delta = getdelta(derive, true);
    let sol_1 = (-derive[1] + Math.sqrt(delta)) / (2 * derive[0]);
    let sol_2 = (-derive[1] - Math.sqrt(delta)) / (2 * derive[0]);

    if (delta > 0) {
        return sol_2;
    } else if (delta < 0) {
        return sol_1;
    } else {
        return NaN;
    }
}

/**
 * Sort Array of coord
 * @param {Array} tab 
 * @returns {Array}
 */
function sort_coord(tab) {
    for (var i = 0; i < tab.length; i++) {
        //stocker l'index de l'élément minimum
        var min = i;
        for (var j = i + 1; j < tab.length; j++) {
            if (tab[j].x < tab[min].x) {
                // mettre à jour l'index de l'élément minimum
                min = j;
            }
        }
        var tmp = tab[i];
        tab[i] = tab[min];
        tab[min] = tmp;
    }
    return tab;
};
