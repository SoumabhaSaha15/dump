(function main(){
  const DIVS = [...document.querySelectorAll('body div#root main div')];
  let index = 1;
  DIVS.forEach((item,ind)=>{
    window.setInterval(()=>{
      if(index>10){
        index=1;
        item.style.backgroundImage = `url('./assets/${item.id}/pics (${index}).jpg')`;
      }else{
        item.style.backgroundImage = `url('./assets/${item.id}/pics (${index}).jpg')`;
        index++;
      }
    },1000*(ind+1));
  });
})();