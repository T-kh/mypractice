'use strict';

{

  const selecters = document.querySelectorAll('.container li a');
  const contents = document.querySelectorAll('.container section');

  selecters.forEach(select => {
    select.addEventListener('click', () => {

      selecters.forEach(item => {
        item.classList.remove('current');
      });
      select.classList.add('current');

      contents.forEach(content => {
        content.classList.remove('current');
      });
      document.getElementById(select.dataset.id).classList.add('current');

    });
  });
}

//カルーセル
{
  const next = document.getElementById('next');
  const prev = document.getElementById('prev');
  const ul = document.querySelector('.slideul');
  const slides = ul.children;
  let currentIndex = 0;
  const dots = [];

  function updateButtons () {
    prev.classList.remove('hidden');
    next.classList.remove('hidden');

    if(currentIndex === 0) {
      prev.classList.add('hidden');
    }
    if(currentIndex === slides.length - 1) {
      next.classList.add('hidden');
    }
  }

  function moveInfo () {
    const width = slides[0].getBoundingClientRect().width;
    ul.style.transform = `translateX(${-1 * width * currentIndex}px)`;

  }

  function createButtons () {
    for(let i = 0; i < slides.length; i++) {
      const button = document.createElement('button');

      button.addEventListener('click', () => {
        currentIndex = i;
        updateButtons();
        moveInfo();
        buttonsMove();
      });

      document.querySelector('nav').appendChild(button);
      dots.push(button);
      dots[0].classList.add('active');
    }
  }

  function buttonsMove () {
    dots.forEach(button => {
      button.classList.remove('active');
    });
   dots[currentIndex].classList.add('active');
  }

  //動作実行ゾーン

  updateButtons();
  createButtons();

  
  next.addEventListener('click', () => {
    currentIndex++;
    updateButtons();
    moveInfo ();
    buttonsMove();
  });
  prev.addEventListener('click', () => {
    currentIndex--;
    updateButtons();
    moveInfo ();
    buttonsMove();
  });

  window.addEventListener('click', () => {
    moveInfo();
  });

}

{
  function createRow (col) {
    const source = [];
    for(let i = 0; i < 15; i++) {
      source[i] = i + 1 + 10 * col;
    }

    const row = [];
    for(let i = 0; i < 5; i++) {
       row[i] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
    }

    return row;
  }

  function createColumns (row) {
    const columns = [];
    for(let i = 0; i < 5; i++) {
     columns[i] = createRow(i);
    }
    columns[2][2] = 'FREE!';
    return columns;
  }

  // ビンゴをテキストに表示させる。tableのtbodyに動的にtrとtdを生成する。
  function createBingo (columns) {
   for(let row = 0; row < 5; row++) {
     const tr = document.createElement('tr');
     for(let col = 0; col < 5; col++) {
       const td = document.createElement('td');
       td.textContent = columns[col][row];
       tr.appendChild(td);
     }
     document.querySelector('tbody').appendChild(tr);
   }
  }

  const row = createRow();
  const columns = createColumns(row);
  createBingo(columns);

}