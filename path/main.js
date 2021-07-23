window.addEventListener('DOMContentLoaded', () => {

  // DOM要素を取得
  const skillEls = document.querySelectorAll('.bar');

  // カウントアップの設定
  const animationDuration = 2000;
  const frameDuration = 1000 / 60;
  const totalFrames = Math.round(animationDuration / frameDuration);
  const easeOut = t => t * (2 - t);
  const animateCountUp = el => {
    let frame = 0;
    const countTo = parseInt(el.innerHTML, 10);
    const counter = setInterval( () => {
      frame++;
      const progress = easeOut(frame / totalFrames);
      const currentCount = Math.round(countTo * progress);

      if (parseInt(el.innerHTML, 10) !== currentCount) {
        el.innerHTML = currentCount;
      }

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);
  };

  // Intersection observerに渡すコールバック関数
  const cb = function(entries, observer) {
    entries.forEach((entry) => {
      if(entry.isIntersecting) {
        const proficiencyVal = entry.target.dataset.proficiency;
        const skillBar = entry.target.querySelector('.bar');
        const percentage = entry.target.querySelector('.bar-percentage');
        const countup = entry.target.querySelector('.countup');

        skillBar.style.width = proficiencyVal + '%';
        percentage.style.opacity = 1;
        countup.textContent = proficiencyVal;
        animateCountUp(countup);

        observer.unobserve(entry.target);
      }
    });
  };

  // Intersection observerに渡すオプション
  const options = {
    rootMargin: "-50px 0px"
  };

  // IntersectionObserver初期化
  const io = new IntersectionObserver(cb, options);
  io.POLL_INTERVAL = 100; // Polyfillの設定
  skillEls.forEach(el => {
    io.observe(el);
  });

});

jQuery(function(){
    var appear = false;
    var pagetop = $('#gototop');
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100){ //if scroll 100px down
            if (appear == false) {
                appear = true;
                pagetop.stop().animate({ //at 50px from above
                    'bottom': '50px' //appear in 0.3 sec
                }, 300)
            }
        } else {
            if (appear) {
                appear = false;
                pagetop.stop().animate({
                    'bottom': '-50px'
                }, 300)
            }
        }
    });
    pagetop.click(function(){
        $('body, html').animate({scrollTop: 0}, 500);
        return false;
    });
});