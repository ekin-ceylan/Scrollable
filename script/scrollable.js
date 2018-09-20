
var scrollCarList = {
    cars:  [],
    findCar: function(){
        
    }
};

var carClass = {
    show: 'scroll-car',
    hide: 'scroll-car-hide'
};

function scrollCar(scrollableContainer){
    this.Id = scrollCarList.length;

    this.Self;

    this.Parent = scrollableContainer;
    this.ParentHeight = scrollableContainer.clientHeight;
    this.Range = scrollableContainer.scrollHeight;
    this.ScrollBarHeight = scrollableContainer.clientHeight;


    this.loopFlag = true;
    this.newLimitedPos = 0;
    this.newPos = scrollableContainer.scrollTop;
    this.intervalId = -1;
    this.direction = 0;


    this.ReCalcRange = function (){
        this.ParentHeight = this.Parent.clientHeight;
        this.Range = this.Parent.scrollHeight;
        this.ScrollBarHeight = this.Parent.clientHeight;
    };

    this.Scroll = function (){

    }

    this.Show = function(){
        this.Self.classList.remove(carClass.hide);
    }

    this.Hide = function(){
        this.Self.classList.add(carClass.hide);
    }


}
