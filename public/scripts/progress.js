var update = function () {

  var updateLogEl = document.querySelector('.update-demo .update-log');
  var progressLogEl = document.querySelector('.update-demo .progress-log');

  /*DEMO*/
  var updates = 0;

  anime({
    targets: '.update-demo .el',
    translateX: 270,
    delay: 1000,
    direction: 'alternate',
    loop: 3,
    easing: 'easeInOutCirc',
    update: function (anim) {
      updates++;
      progressLogEl.value = 'progress : ' + Math.round(anim.progress) + '%';
      updateLogEl.value = 'updates : ' + updates;
    }
  });
  /*DEMO*/

}

update();