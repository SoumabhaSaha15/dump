(function main(){
  const rootTheme = document.querySelector(':root');
  const toggler = document.querySelector('body div#root main section.right div.mode div.toggler');
  const toggleReplacer = document.querySelector('body div#root main section.right div.mode div.toggle-replacer');
  const base = document.querySelector('head base');
  const link = document.querySelector('head link[rel="stylesheet"]');
  const imgs = document.querySelectorAll('img');
  const change_image = () => {
    imgs.forEach(item=>{
      item.setAttribute('src',item.getAttribute('src'));
    });
  }
  toggler.onclick=(e)=>{
    if(e.currentTarget.style.transform == 'translateX(100%)'){
      base.setAttribute('href','./assets/darktheme/');
      link.setAttribute('href','style.css');
      e.currentTarget.style.transform = 'translateX(0%)';
      e.currentTarget.style.backgroundImage = `url('moon.png')`
      toggleReplacer.style.transform = 'translateX(100%)';
      toggleReplacer.style.backgroundImage = `url('sun.png')`
      rootTheme.style.setProperty('--backgroundColor', '#191919');
      rootTheme.style.setProperty('--foregroundColor', 'black');
      rootTheme.style.setProperty('--textColor', 'white');
      change_image();
    }else{
      base.setAttribute('href','./assets/lighttheme/');
      link.setAttribute('href','style.css');
      e.currentTarget.style.transform = 'translateX(100%)';
      toggleReplacer.style.transform = 'translateX(0%)';
      toggleReplacer.style.backgroundImage = `url('moon.png')`
      e.currentTarget.style.backgroundImage = `url('sun.png')`
      rootTheme.style.setProperty('--backgroundColor', '#afafaf');
      rootTheme.style.setProperty('--foregroundColor', '#ffffff');
      rootTheme.style.setProperty('--textColor', 'black');
      change_image();
    }
  }

})();