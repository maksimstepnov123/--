const testWindow = document.querySelector(".test-window")
let pressedKeyKeycode;

let label = document.querySelector(".label")

const cantSeeButton = document.querySelector(".test-window__cant-see")

function waitingKeypress() {
    return new Promise((resolve) => {
        document.addEventListener('keydown', onKeyHandler);
        cantSeeButton.addEventListener("click", onKeyHandler);
        function onKeyHandler(e) {
            console.log(e)
            if ((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode === 32 || e.type == "click") {
                if (e.type == "click") {
                    pressedKeyKeycode = "32"
                }
                else {
                    pressedKeyKeycode = e.keyCode;
                }
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
        keyCode: 50,
        blindnesstype: "deiteranopia",
        url: "images/d2.jpg"
    },
    {
        keyCode: 53,
        blindnesstype: "deiteranopia",
        url: "images/d5.jpg"
    },
    {
        keyCode: 51,
        blindnesstype: "protanopia",
        url: "images/p3.png"
    },
    {
        keyCode: 53,
        blindnesstype: "protanopia",
        url: "images/p5.png"
    },
    {
        keyCode: 56,
        blindnesstype: "protanopia",
        url: "images/p8.png"
    },
    {
        keyCode: 32,
        blindnesstype: "protanopia",
        url: "images/pnothing.png"
    },
    // {
    //     keyCode: 51,
    //     blindnesstype: "deiteranopia",
    //     text: "Дейтеранопия 3"
    // },
    // {
    //     keyCode: 55,
    //     blindnesstype: "tritanopia",
    //     text: "Тританопия 7"
    // },
]

function shuffle(array) {
    const newArr = array.sort(() => Math.random() - 0.5);
    return newArr
}


async function startTest(arr) {

    for (const i of arr) {
        const image = document.createElement("img")
        image.src = i.url
        console.log(i.url, image.src)
        image.classList.add("testImage")
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
    }
    label.innerHTML = "Результаты"
    cantSeeButton.remove()
    const rightOf = document.createElement("h3")
    rightOf.innerHTML = `Правильно ${6 - protanopiaScore - deiteranopiaScore} из 6`
    testWindow.append(rightOf)
    if (protanopiaScore != 0 && protanopiaScore > deiteranopiaScore) {
        const protanRes = document.createElement("p")
        protanRes.innerHTML = `Возможно у вас протанопия — отсутствие восприятия красного цвета.`
        testWindow.append(protanRes)
    }
    else if (deiteranopiaScore != 0 && deiteranopiaScore > protanopiaScore) {
        const protanRes = document.createElement("p")
        protanRes.innerHTML = `Возможно у вас дейтеранопия — пониженая чувствительность к зелёному цвету.`
        testWindow.append(protanRes)
    }
    else if (deiteranopiaScore != 0 && protanopiaScore != 0) {
        const protanRes = document.createElement("p")
        protanRes.innerHTML = `Возможно у вас протанопия — отсутствие восприятия красного цвета, или другой, более редкий вид дальтонизма. Советуем пройти консультацию со специолистом.`
        testWindow.append(protanRes)
    }
    else {
        const protanRes = document.createElement("p")
        protanRes.innerHTML = `У вас нормальное цветовое восприятие.`
        testWindow.append(protanRes)
    }

}
startTest(shuffle(blindnessImages))


