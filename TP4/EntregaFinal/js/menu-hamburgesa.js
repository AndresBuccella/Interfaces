let mh = document.querySelector("#menu");
let selectMenu = false;

mh.addEventListener("click", anim);

function anim() {
    mhDivList=mh.querySelectorAll("div");
    selectMenu = !selectMenu;
    if (selectMenu) {
        mhDivList[0].style.transform = "rotate(45deg) translate(7px, 9px)";
        mhDivList[3].style.transform = "rotate(45deg) translate(7px, 9px)";
        mhDivList[1].style.width = "0px";
        mhDivList[1].style.opacity = "0";
        mhDivList[2].style.transform = "rotate(-45deg) translate(8px, -10px)";
    } else {
        mhDivList[0].style.transform = "";
        mhDivList[3].style.transform = "";
        mhDivList[1].style.width = "34px";
        mhDivList[1].style.opacity = "1";
        mhDivList[2].style.transform = "";
    }
}
