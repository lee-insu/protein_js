window.addEventListener('load', function() {


    let MOVEING_PX = 6,
        AUTO_TIME = 7000,
        slide = document.getElementById('slide'),
        bar = document.createElement('ul'),
        slideList = slide.getElementsByClassName('slide-list'),
        slideCard = slideList[0].getElementsByTagName('li'),
        prevBtn = slide.getElementsByClassName('prev-banner'),
        nextBtn = slide.getElementsByClassName('next-banner'),
        playBtn = slide.getElementsByClassName('play'),
        stopBtn = slide.getElementsByClassName('stop'),
        playSet  = null,
        before = 0,
        after = 0,
        moveIng = false ;

        for(let i = 0; i < slideCard.length; i++) {
            bar.innerHTML += '<li></li>';
          };

         bar.classList.add('bar');
         bar.children[0].classList.add('on');
         slide.append(bar); 

         for(let j = 0; j <bar.children.length; j++) {
            barClick(j);
          };

        playSet = setInterval(playCard,AUTO_TIME);
        playBtn[0].style.display = 'none';
        
        function playCard() {
            if(!moveIng) {
              after ++;
              if(after >= slideCard.length) {
                after = 0;
              };
              move(after,before, 'next');
              before = after;
            };
          };

        function nextBtnSlide(event) {
          if(!moveIng) {
            after ++;
            if(after >= slideCard.length) {
                after = 0;
            };
            move(after,before,'next');
            before = after;
            console.log(after);
          };
        };
        
        function prevBtnSlide(event) {
            if(!moveIng) {
              after --;
              if(after < 0) {
                after = slideCard.length -1;
              };
              move(after,before);
              before = after;
              
            };
          };
    
        function playBtnSlide(event) {
            playBtn[0].style.display = 'none';
            stopBtn[0].style.display = 'block';
            playSet = setInterval(playCard,AUTO_TIME);
        };

        function stopBtnSlide(event) {
          playBtn[0].style.display = 'block';
          stopBtn[0].style.display = 'none';
          clearInterval(playSet);
        };

        function barClick(event) {
            bar.children[event].addEventListener('click',function(){
              if(!moveIng) {
                after = event;
                if(after > before) {
                    move(after, before, 'next');
                }else if(after < before) {
                    move(after, before);
                };
                before = after;
              }
            });
          }

        nextBtn[0].addEventListener('click',nextBtnSlide);
        prevBtn[0].addEventListener('click',prevBtnSlide);
        playBtn[0].addEventListener('click',playBtnSlide);
        stopBtn[0].addEventListener('click',stopBtnSlide);

        function move(after,before, type) {
            let nextX = type === 'next' ? slide.offsetWidth : slide.offsetWidth * -1,
                prevX = 0,
                set = null;
                set = setInterval(moveEvent);
    
                function moveEvent() {
                  moveIng =true;
                  if(type === 'next') {
                    nextX -= MOVEING_PX;
                    slideCard[after].style.left = Number(nextX) + 'px';
                    if(nextX <= 0) {
                      clearInterval(set);
                      nextX = slide.offsetWidth;
                      moveIng = false;
                    };
                    prevX -= MOVEING_PX;
                  }else{
                    nextX += MOVEING_PX;
                    slideCard[after].style.left = Number(nextX) + 'px';
                    if(nextX >= 0) {
                      clearInterval(set);
                      nextX = slide.offsetWidth * -1;
                      moveIng = false;
                    };
                    prevX += MOVEING_PX;
                  };
                  slideCard[before].style.left = Number(prevX) + 'px';
    
                };
                bar.children[before].classList.remove('on');
                bar.children[after].classList.add('on');
    
          };











});