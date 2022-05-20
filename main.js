window.onscroll = function () {scrollFunction()};

function scrollFunction(){
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-50px";
    }
}

window.addEventListener('DOMContentLoaded', () => {

  // DOM要素を取得
  const skillEls = document.querySelectorAll('.skill');

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
        const skillBar = entry.target.querySelector('.skill-bar');
        const percentage = entry.target.querySelector('.skill-percentage');
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

$(document).ready(function(){
    $("#gototop").hide();
    $(window).on("scroll", function(){
        if ($(this).scrollTop() > 100){
            $("#gototop").fadeIn("fast");
        } else {
            $("#gototop").fadeOut("fast");
        }
    });
    $("#gototop").click(function(){
        $('body,html').animate({
            scrollTop: 0
        }, 400);
        return false;
    })
})