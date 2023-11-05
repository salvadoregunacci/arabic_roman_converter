// =========================
// Variables
// =========================

const $aN = document.querySelector('#arab_num');
const $rN = document.querySelector('#rom_num');

const ROM_NUMS = {
  "I": 1,
  "IV": 4,
  "V": 5,
  "IX": 9,
  "X": 10,
  "L": 50,
  "XC": 90,
  "C": 100,
  "D": 500,
  "CM": 900,
  "M": 1000,
}

// =========================
// Events
// =========================

$aN?.addEventListener("input", _calcArabToRom);
$rN?.addEventListener("input", _calcRomToArab);

// =========================
// Functions
// =========================


// Арабские - Римские
function _calcArabToRom(e) {
  const $el = e.target;
  const _val = $el?.value;

  if (!$el) return;

  $el.value = _val.replace(/[^\d]/g, "");
}


// Римские - Арабские
function _calcRomToArab(e) {
  const $el = e.target;
  $el.value = $el?.value.toUpperCase();
  let _val = $el?.value;

  if (!$el) return;

  const _reverseRomNums = reverseObj(ROM_NUMS);

  const _keys = Object.keys(ROM_NUMS);
  const _values = Object.values(ROM_NUMS);

  // for (let _i = 0; _i < _keys.length; _i++) {
  //   _val = _val.replace(new RegExp(_keys[_i], "g"), _values[_i] + " ");
  // }

  _val = _val.replace(new RegExp(_reverseRomNums["900"], "g"), ROM_NUMS.CM + " ");
  _val = _val.replace(new RegExp(_reverseRomNums["90"], "g"), ROM_NUMS.XC + " ");
  _val = _val.replace(new RegExp(_reverseRomNums["9"], "g"), ROM_NUMS.IX + " ");
  _val = _val.replace(new RegExp(_reverseRomNums["4"], "g"), ROM_NUMS.IV + " ");
  _val = _val.replace(new RegExp(_reverseRomNums["1000"], "g"), ROM_NUMS.M + " ");
  _val = _val.replace(new RegExp(_reverseRomNums["500"], "g"), ROM_NUMS.D + " ");
  _val = _val.replace(new RegExp(_reverseRomNums["100"], "g"), ROM_NUMS.C + " ");
  _val = _val.replace(new RegExp(_reverseRomNums["50"], "g"), ROM_NUMS.L + " ");
  _val = _val.replace(new RegExp(_reverseRomNums["10"], "g"), ROM_NUMS.X + " ");
  _val = _val.replace(new RegExp(_reverseRomNums["5"], "g"), ROM_NUMS.V + " ");
  _val = _val.replace(new RegExp(_reverseRomNums["1"], "g"), ROM_NUMS.I + " ");

  _val = _val.trim();
  _val = _val.split(" ");

  _val = _val.map(_el => parseInt(_el));
  _val = _val.reduce((_sum, _el) => {
    return _sum += _el;
  }, 0);

  $aN.value = _val ? _val : "";
}


function reverseObj(_obj) {
  const _reverse = {};

  for (const _key in _obj) {
    if (Object.hasOwnProperty.call(_obj, _key)) {
      const _el = _obj[_key];

      _reverse[_el] = _key;
    }
  }

  return _reverse;
}