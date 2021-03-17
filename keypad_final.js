
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9','0'];
const letters = ['o_o', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz', '-',];
const timeThresholdInMiliSeconds = 3000;
const longPressThreshold = 1000;

let isLongPress = false;
let text = "";
let counter = 0;
let lastButtonPressedAt = new Date();
let lastPressedButton;
let timeOutReference;

function start() {
    let div_content = "";
    for (i = 0; i < numbers.length; i++) {
        let element = "number" + i;
        div_content = div_content + '<div class="letter" onclick="processButtonPress(' + i + ')" id="' + element + '">' + numbers[i] + '<br>' + letters[i] + '</div>';
        if ((i + 1) % 3 === 0) div_content = div_content + '<div style="clear:both;"></div>';
        console.log(element)
    }
    document.getElementById("key_cont").innerHTML = div_content;

    for (let i = 0; i < numbers.length; i++) {
        let element = "number" + i;
        document.getElementById(element).addEventListener('mousedown', () => {
            timeOutReference = setTimeout(() => {
                console.log(`triggered for ${element}`, lastPressedButton, i);
                if (i === lastPressedButton) {
                    text += numbers[+element[6]]
                    isLongPress = true;
                }
            }, longPressThreshold);
        });
        document.getElementById(element).addEventListener('mouseup', () => {
            console.log(`cleared for ${element}`);
            isLongPress = false;
         clearTimeout(timeOutReference);
        });
    }
}

function processButtonPress(pressedButton) {
    if (isLongPress) { return; }
    const currentTime = Date.now();
    let buttonChanged = false;
    if ((currentTime - lastButtonPressedAt > timeThresholdInMiliSeconds) || (lastPressedButton !== pressedButton)) {
        resetLastPressedButtonAndFrequency();
        lastButtonPressedAt = Date.now();
        lastPressedButton = pressedButton;
        buttonChanged = true;
    }
    const characterToAdd = getCharacterByPressedButtonAndFrequencyOfPressing(pressedButton, counter++);
    if (buttonChanged) {
        text += characterToAdd;
    } else {
        text = text.toString().replace(/.$/, characterToAdd);
    }
    document.getElementById("screen").value = text;

    function resetLastPressedButtonAndFrequency() {
        document.getElementById("screen").value = text;
        counter = 0;
    }

    function getCharacterByPressedButtonAndFrequencyOfPressing(buttonPressed, numberOfTimesButtonPressed) {
        console.log(buttonPressed, numberOfTimesButtonPressed);
        if (!isPressedButtonIsSpecialCase(buttonPressed)) {
            const indexOfCharacter = (numberOfTimesButtonPressed%3);
            const lettersCorrespondingToButtonPressed = letters[buttonPressed];
            return lettersCorrespondingToButtonPressed[indexOfCharacter];
        }
        const indexOfCharacter = (numberOfTimesButtonPressed%4);
        const lettersCorrespondingToButtonPressed = letters[buttonPressed];
        return lettersCorrespondingToButtonPressed[indexOfCharacter];
    }

    function isPressedButtonIsSpecialCase(buttonPressed) {
        return buttonPressed === 6 || buttonPressed === 8;
    }
}
