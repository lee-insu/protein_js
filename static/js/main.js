function transformPrev(event) {
    const slidePrev = event.target.parentElement;
    const slideNext = slidePrev.nextElementSibling;

    const proteinList = slidePrev.previousElementSibling.children[1];
    let activeLi = proteinList.getAttribute('data-position');
    

    if(Number(activeLi) < 0) {
        activeLi = Number(activeLi) + 355;
        slideNext.addEventListener('click',transformNext);
        slideNext.classList.add('next-hover');

        
        if(Number(activeLi) ===0) {
            slidePrev.classList.remove('prev-hover');
            slidePrev.removeEventListener('click',transformPrev);
        }
    } 
    

    proteinList.style.transition = 'transform 1s'
    proteinList.style.transform = 'translateX('+ Number(activeLi) +'px)';
    proteinList.setAttribute('data-position',activeLi);
}

function transformNext(event) {

    //event로 받은 next,prev 버튼 
    //event는 div 태그가 아닌 i 태그로 넘겨서 계속 오류가 났었음 
    const slideNext = event.target.parentElement;
    const slidePrev = slideNext.previousElementSibling;
    
    //ul tag
    const proteinList = slideNext.previousElementSibling.previousElementSibling.children[1];
    let activeLi = proteinList.getAttribute('data-position');
    const liList = proteinList.getElementsByTagName('li');

    if(proteinList.clientWidth < (liList.length * 355 + Number(activeLi))) {
        activeLi = Number(activeLi) - 355;
        slidePrev.classList.add('prev-hover');
        
        if(proteinList.clientWidth > (liList.length * 355 + Number(activeLi))) {
            slideNext.removeEventListener('click',transformNext);
            slideNext.classList.remove('next-hover');
            
        }
        
        slidePrev.addEventListener('click',transformPrev);
    }

    proteinList.style.transition = 'transform 1s'
    proteinList.style.transform = 'translateX('+ Number(activeLi) +'px)';
    proteinList.setAttribute('data-position',activeLi);

}




//li < 5 일 때 prev,next 제거, li >= 5 일 때 transformNext로 next 활성화 

const slideNextList = document.getElementsByClassName('next');

for (let i = 0; i < slideNextList.length; i++) {

    // ul 태그 
    let proteinList = slideNextList[i].previousElementSibling.previousElementSibling.children[1];
    let liList = proteinList.getElementsByTagName('li');
    //ul 너비보다 크다면 next를 활성화, prev는 비활성화
    //여기서 tansformNext로 event를 넘김
    if(proteinList.clientWidth < (liList.length * 355)) {
        slideNextList[i].addEventListener('click',transformNext);
        
        
    } else {
        //ul 너비보다 작다면 방향표를 삭제
        const removeArrow = slideNextList[i].parentElement;
        removeArrow.removeChild(slideNextList[i].previousElementSibling);
        removeArrow.removeChild(slideNextList[i]);
    }
}

