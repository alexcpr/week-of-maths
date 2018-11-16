const data = {
    '1': {
        'question': 'Combien font <code>2\xB2</code>',
        'answer': '4'
    },
    '2': {
        'question': 'Combien font <code>3\xB2</code>',
        'answer': '9'
    }
}

const $ = selector => document.querySelector(selector)

function fadeIn({
    style
}) {
    style.display = '';
    let last = +new Date;
    const tick = () => {
        style.opacity = +style.opacity + (new Date - last) / 400;
        last = +new Date;
        if (+style.opacity < 1) {
            window.requestAnimationFrame && requestAnimationFrame(tick) || setTimeout(tick, 16)
        }
    };
    tick()
}

function fadeOut({
    style
}) {
    style.opacity = 1;
    (function fade() {
        if ((style.opacity -= .1) < 0) {
            style.display = 'none'
        } else {
            requestAnimationFrame(fade)
        }
    })()
};

const min = 1
const max = 2

$('#questionid').value = Math.floor(Math.random() * (max - min + 1) + min)

$('#normal').innerHTML = `Question n°${$('#questionid').value}`
$('#question').innerHTML = data[$('#questionid').value]['question']

$('#newquestion').addEventListener('click', _ => {
    $('#questionid').value = Math.floor(Math.random() * (max - min + 1) + min)
    $('#normal').innerHTML = `Question n°${$('#questionid').value}`
    $('#question').innerHTML = data[$('#questionid').value]['question']
    $('#answer').value = ''
})

$('#submit').addEventListener('click', _ => {
    const alert = $('#alert')
    let answer = $('#answer')
    alert.innerHTML = ''
    alert.style.opacity = 0
    if (answer.value === data[$('#questionid').value]['answer']) {
        fadeIn(alert)
        answer.value = ''
        alert.innerHTML = `<p class="alert alert-success"><strong>Bien joué !</strong> Vous avez trouvé la bonne réponse.</p>`
        alert.style.opacity = ''
        setTimeout(() => {
            fadeOut(alert)
        }, 1500)
    } else {
        fadeIn(alert)
        answer.value = ''
        alert.innerHTML = `<p class="alert alert-error"><strong>Oh mince !</strong> Votre réponse à la question est incorrecte.</p>`
        alert.style.opacity = ''
        setTimeout(() => {
            fadeOut(alert)
        }, 1500)
    }
})