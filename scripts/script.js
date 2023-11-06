// =========================
// Variables
// =========================

const $aN = document.querySelector('#arab_num');
const $rN = document.querySelector('#rom_num');
const $alert = document.querySelector('.info-alert');
const $resetBtn = document.querySelector('#reset-btn');

const ROM_NUMS = {
  "CM": 900,
  "XC": 90,
  "IX": 9,
  "IV": 4,
  "M": 1000,
  "D": 500,
  "C": 100,
  "L": 50,
  "X": 10,
  "V": 5,
  "I": 1,
}

// =========================
// Events
// =========================

$aN?.addEventListener("input", _calcArabToRom);
$rN?.addEventListener("input", _calcRomToArab);
$resetBtn?.addEventListener("click", () => _hideAlert());

// =========================
// Functions
// =========================


// Arab-Roman
function _calcArabToRom(e) {
  const $el = e.target;
  const _val = $el?.value;

  if (!$el) return;

  $el.value = _val.replace(/[^\d]/g, "");
}


// Roman-Arab
function _calcRomToArab(e) {
  const $el = e.target;

  if (!$el) return;
  $el.value = $el?.value.toUpperCase();

  if (/[А-яІіЇїЁёЄє]/g.test($el.value)) {
    _showAlert("* Только латинcкие символы (A-Z)");
  } else {
    _hideAlert();
  }

  $el.value = $el.value.replace(/[^IVXLCDM]/gm, "");
  $el.value = _correctValue($el.value);

  let _val = $el.value;
  let _isInvalid = false;
  const _invalidPatterns = [
    /C[DMC]{2,}/g,
    /DM/g,
    /IX./g,
    /I[^IV]/g,
    /L[DMC]/g,
    /V[XLCDM]/g,
    /X[DM]/g,
    /[IXC]{4,}/g,
    /[VLD]{2,}/g,
    /IV./g,
    /IC/g,
    /VI[^I]./g,
  ];

  _invalidPatterns.forEach(_pattern => {
    if (_val.match(_pattern)) {
      _isInvalid = true;
      $aN.value = NaN;
      return;
    }
  });

  if (_isInvalid) {
    return;
  }

  const _keys = Object.keys(ROM_NUMS);
  const _values = Object.values(ROM_NUMS);

  for (let _i = 0; _i < _keys.length; _i++) {
    _val = _val.replace(new RegExp(_keys[_i], "g"), _values[_i] + " ");
  }

  _val = _val.trim();
  _val = _val.split(" ");
  _val = _val.map(_el => parseInt(_el));
  _val = _val.reduce((_sum, _el) => _sum += _el, 0);

  $aN.value = _val ? _val : "";
}


function _showAlert(_text) {
  if (!$alert || $alert.classList.contains("d-flex")) return;

  $alert.textContent = _text;
  $alert.classList.remove("d-none");
  $alert.classList.add("d-flex");
}

function _hideAlert() {
  if (!$alert) return;

  $alert?.classList.remove("d-flex");
  $alert?.classList.add("d-none");
}


function _correctValue(_val) {
  let _sourceVal = _val;

  const _rules = {
    "IIII": "IV",
    "VV": "X",
    "XXXXX": "L",
    "LL": "C",
    "CCCCC": "D",
    "DD": "M",
  }

  const _k = Object.keys(_rules);
  const _v = Object.values(_rules);

  for (let _i = 0; _i < _k.length; _i++) {
    _sourceVal = _sourceVal.replace(new RegExp(_k[_i], "g"), _v[_i]);
  }

  return _sourceVal;
}