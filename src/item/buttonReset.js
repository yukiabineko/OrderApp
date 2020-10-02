export const pageButtonColorSet = ()=>{

  /*全てのページネーションボタン読み込み*/
  document.querySelectorAll('.pageBtn').forEach((btn)=>{　
    if(btn.id === 'bt1'){      /*最初の要素のみ青色*/
      btn.style.background = "#4689FF";
      btn.style.color ="#FFF";
    }
    else{                      /*それ以外は白*/
      btn.style.background = "#FFF";
      btn.style.color ="#000";
    }
  })
}