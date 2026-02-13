document.getElementById("save").onclick = () => {
    const questionInput = document.getElementById("q");
    const optionInputs = document.querySelectorAll(".opt");
    const correctSelect = document.getElementById("correct");

    const questionText = questionInput.value.trim();
    const optionsArray = Array.from(optionInputs).map(input => input.value.trim());
    const correctIndex = parseInt(correctSelect.value);

    if (!questionText || optionsArray.some(text => text === "")) {
        alert("Please fill in the question and all four options!");
        return;
    }

    const currentSavedData = JSON.parse(localStorage.getItem("quiz")) || [];

    const newEntry = {
        q: questionText,
        a: optionsArray,
        c: correctIndex
    };

    currentSavedData.push(newEntry);
    localStorage.setItem("quiz", JSON.stringify(currentSavedData));

    alert("Question added to your Custom Quiz!");

    questionInput.value = "";
    optionInputs.forEach(input => input.value = "");
    correctSelect.selectedIndex = 0;
};