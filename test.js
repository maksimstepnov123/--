const testWindow = document.querySelector(".test-window")
let pressedKeyKeycode;
function waitingKeypress() {
    return new Promise((resolve) => {
        document.addEventListener('keydown', onKeyHandler);
        function onKeyHandler(e) {
            if ((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode === 32) {
                pressedKeyKeycode = e.keyCode;
                document.removeEventListener('keydown', onKeyHandler);
                resolve();
            }
        }
    });
}


let protanopiaScore = 0;
let deiteranopiaScore = 0;
let tritanopiaScore = 0;

const blindnessImages = [
    {
        keyCode: 52,
        blindnesstype: "protanopia",
        text: "протанопия 4"
    },
    {
        keyCode: 51,
        blindnesstype: "deiteranopia",
        text: "Дейтеранопия 3"
    },
    {
        keyCode: 55,
        blindnesstype: "tritanopia",
        text: "Тританопия 7"
    },
]

function shuffle(array) {
    const newArr = array.sort(() => Math.random() - 0.5);
    return newArr
}


async function startTest(arr) {

    for (const i of arr) {
        const image = document.createElement("span")
        image.innerHTML = i.text
        console.log(image)
        testWindow.append(image)
        await waitingKeypress(i.keyCode)

        if (i.blindnesstype == "protanopia") {
            if (pressedKeyKeycode == i.keyCode) {
                console.log(pressedKeyKeycode, i.keyCode)
                image.classList.add("hidden")
                pressedKeyKeycode = 0;
            }
            else {
                image.classList.add("hidden")
                protanopiaScore += 1;
                pressedKeyKeycode = 0;
            }

        }

        if (i.blindnesstype == "deiteranopia") {
            if (pressedKeyKeycode == i.keyCode) {
                console.log(pressedKeyKeycode, i.keyCode)
                image.classList.add("hidden")
                pressedKeyKeycode = 0;
            }
            else {
                image.classList.add("hidden")
                deiteranopiaScore += 1;
                pressedKeyKeycode = 0;
            }

        }

        if (i.blindnesstype == "tritanopia") {
            if (pressedKeyKeycode == i.keyCode) {
                console.log(pressedKeyKeycode, i.keyCode)
                image.classList.add("hidden")
                pressedKeyKeycode = 0;
            }
            else {
                image.classList.add("hidden")
                tritanopiaScore += 1;
                pressedKeyKeycode = 0;
            }

        }
    }
    alert(`protanopiaScore = ${protanopiaScore}\ndeiteranopiaScore = ${deiteranopiaScore}\ntritanopiaScore = ${tritanopiaScore}`)
}
startTest(shuffle(blindnessImages))