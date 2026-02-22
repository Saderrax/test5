const select = document.getElementById("brainrotSelect");
const levelInput = document.getElementById("levelInput");
const resultSpan = document.getElementById("result");
const lvlMultSpan = document.getElementById("lvlMult");
const mutMultSpan = document.getElementById("mutMult");
const formulaText = document.getElementById("formulaText");

for (const name in brainrots) {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    select.appendChild(option);
}

function calculate() {
    const selectedName = select.value;
    let level = parseInt(levelInput.value) || 1;

    if (!selectedName || !brainrots[selectedName]) return;

    const baseValue = brainrots[selectedName].base;
    let levelMult = 1 + (0.33 * (level - 1));
    
    let mutationMult = 1;
    document.querySelectorAll(".mutation-check").forEach(box => {
        if (box.checked) mutationMult *= parseFloat(box.value);
    });

    const finalResult = baseValue * levelMult * mutationMult;

    resultSpan.textContent = "$" + Math.round(finalResult).toLocaleString('en-US');
    lvlMultSpan.textContent = levelMult.toFixed(2) + "x";
    mutMultSpan.textContent = mutationMult.toFixed(1) + "x";
    formulaText.textContent = `(${baseValue} × ${levelMult.toFixed(2)} × ${mutationMult.toFixed(1)})`;
}

function resetAll() {
    levelInput.value = 1;
    document.querySelectorAll(".mutation-check").forEach(b => b.checked = false);
    calculate();
}

function copyResult() {
    const val = resultSpan.textContent;
    navigator.clipboard.writeText(val);
    alert("Copied to clipboard!");
}

calculate();
