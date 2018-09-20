//
// scrollable.js
// by Ekin Ceylan

var tId;
var iId = -1;
var newPos = [[1,2]];
var flag = true;

(function () {
    var scrollableContainers = document.getElementsByClassName('scrollable');

    for (var i = 0; i < scrollableContainers.length; i++) {
        var scrollableContainer = scrollableContainers[i];
        var scrollCar = document.createElement('div');
        scrollCar.setAttribute('id', 'scroll-car-' + i);
        scrollCar.setAttribute('class', 'scroll-car scroll-car-hide');
        scrollableContainer.appendChild(scrollCar);
        newPos[i] = scrollableContainer.scrollTop;
        scrollRows(scrollableContainer, 0);
    }
})();

// $('.scrollable').on("mousewheel DOMMouseScroll", function (event) {
//     scrollRows(this, 46 * event.detail);
// });

let scrll = document.getElementsByClassName('scrollable');

for (let index = 0; index < scrll.length; index++) {
    const element = scrll[index];
    element.addEventListener('mousewheel', function(event){
        scrollRows(this, 1 * event.deltaY);
    })
    element.addEventListener('DOMMouseScroll', function(event){
        scrollRows(this, 46 * event.detail);
    })
}

function scrollRows(scrollableContainer, delta) {

    if(!flag && iId != -1){
        return;
    }

    var scrollCar = scrollableContainer.getElementsByClassName('scroll-car')[0];
    var index = getScrollCarIndex(scrollCar);

    var htContainer = scrollableContainer.clientHeight; // Kab�n uzunlu�u
    var htScrBar = htContainer;                         // teker b�lmesinin uzunlu�u
    var scrollHtContainer = scrollableContainer.scrollHeight;  // i�eri�in uzunlu�u
    var scrollRange = scrollHtContainer - htContainer;  // tekerlenebilecek uzunluk

    if (scrollHtContainer - htContainer <= 0) {         // i�erik kaptan b�y�k de�ilse geri d�n
        return;
    }

    scrollCar.classList.remove('scroll-car-hide');      // arabay� g�ster
    scrollCar.style.height = htContainer * htScrBar / scrollHtContainer + 'px';  // araban�n y�ksekli�ini ayarla.

    delta = isNaN(delta) ? 0 : delta;
    newPos[index, 0] = Math.min(Math.max(newPos[index, 0] + delta, 0), scrollRange);
    //newPos[index, 1] = Math.min(Math.max(newPos[index, 1] + delta, -scrollRange), 2 * scrollRange);
    newPos[index, 1] = newPos[index, 1] + delta;

    scrollAnimation(scrollCar, htScrBar / scrollHtContainer);
}

function scrollAnimation(scrollCar, scrollBarRatio) {

    var index = getScrollCarIndex(scrollCar);
    var scrollableContainer = scrollCar.parentElement;
    var delta = newPos[index, 1] - scrollableContainer.scrollTop;
    var diff = newPos[index, 0] - scrollableContainer.scrollTop > 0 ? 1 : -1;
    
    clearInterval(iId);
    flag = false;

    iId = setInterval(function () {

        var newPositon = scrollableContainer.scrollTop + (delta / 20) + diff;
        scrollableContainer.scrollTop = diff * Math.min(diff * newPos[index, 0], diff * newPositon);
        scrollCar.style.top = scrollableContainer.scrollTop * (1 + scrollBarRatio) + 'px';

        if (scrollableContainer.scrollTop == newPos[index, 0]) {
            clearInterval(iId);
            scrollCar.classList.add('scroll-car-hide');
            newPos[index, 1] = newPos[index, 0];
        }

        flag = true;

    }, 10);
}

function getScrollCarIndex(scrollCar) {
    var id = scrollCar.id;
    return parseInt(id.substr(id.lastIndexOf('-') + 1));
}