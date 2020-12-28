const content = [
  {
    question: "Have you ever been alone on your Birthday?",
    answer:
      "No one to celebrate it with. People forgot your Birthday. They don't have a reason to remember or they need social media tools to remember.",
  },
  {
    question: "Why do you remember someone's Birthday?",
    answer: `Because you are supposed to.
      Because you love them.
      Because you want them to remember your's.
      Because they were born on the same day as you.`,
  },
];

function type(target, txt, speed = 100) {
  return new Promise((resolve, reject) => {
    var i = 0;
    function typeWriter() {
      if (i < txt.length) {
        target.innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      } else {
        resolve();
      }
    }
    typeWriter();
  });
}

// type(document.getElementById("question"), content[0].question, 50);

let fadeSpeed = 500;

$(".screen").fadeOut(fadeSpeed);
$("#screen1").fadeIn(fadeSpeed);

(async () => {
  for (let c of content) {
    await type(document.querySelector(".question"), c.question, 100);
    await type(document.querySelector(".answer"), c.answer, 50);
    document.querySelector(".question").innerHTML = "";
    document.querySelector(".answer").innerHTML = "";
  }
  $("#screen1").fadeOut(fadeSpeed);
  $("#screen4").fadeIn(fadeSpeed);
})();

// NEXT
$("#stepNext1").click(function () {
  $("#screen1").fadeOut(fadeSpeed);
  $("#screen4").fadeIn(fadeSpeed);
});

$("#stepNext2").click(function () {
  $("#screen2").fadeOut(fadeSpeed);
  $("#screen3").fadeIn(fadeSpeed);
});

$("#stepNext3").click(function () {
  $("#screen3").fadeOut(fadeSpeed);
  $("#screen4").fadeIn(fadeSpeed);
});
// \ NEXT

// PREV
$("#stepPrev2").click(function () {
  $("#screen2").fadeOut(fadeSpeed);
  $("#screen1").fadeIn(fadeSpeed);
});

$("#stepPrev3").click(function () {
  $("#screen3").fadeOut(fadeSpeed);
  $("#screen2").fadeIn(fadeSpeed);
});

$("#stepPrev4").click(function () {
  location.reload();
});
// \PREV
