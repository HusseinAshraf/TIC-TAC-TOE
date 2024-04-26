window.addEventListener('DOMContentLoaded'  , ()=>{
     const box = Array.from(document.querySelectorAll('.box'));
     const playerDisplay = document.querySelector('.display-player');
     const resetButton =document.querySelector('#reset');
    const announcer =document.querySelector('.announcer');

    let board =['','','','','','','','',''];
    let currentPlayer = 'X' ;
    let isGameActive = true ;

    const PLAYERX_WIN = 'PLAYERX_WIN'
    const PLAYERO_WIN = 'PLAYERO_WIN'
    let TIE = 'TIE';

    const winningConditions =[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation(){
        let roundWon = false ;
        for (let i = 0; i <= 7; i++) {
            const winCondition =winningConditions[i];
            const a = board[winCondition[0]] ;
            const b = board[winCondition[1]] ;
            const c = board[winCondition[2]] ;

            if (a == '' || b == '' || c == '') {
                continue
            }

            if (a === b && b === c) {
                roundWon = true;
                break;
            }

            
        }

        if (roundWon) {
            announce(currentPlayer=== 'X' ? PLAYERX_WIN : PLAYERO_WIN );
            isGameActive = false ;
            return;
        }

        if (!board.includes('')) {
            announce(TIE);
        }
    }

    const announce = (type)=>{
        switch (type) {
            case PLAYERO_WIN:
                 announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WIN:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
            break;
            case TIE :
                announcer.innerHTML ="Tie"
        }
        announcer.classList.remove('hide');
    };
     
    const isValidAction = (box)=>{
        if(box.innerText=== 'X' || box.innerText=== 'O'){
            return false ;
        }
        return true ;

    };

    const updateBoard = (index)=>{
             board[index] = currentPlayer ;
    
    };

    const changePlayer = ()=>{
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    };

    const userAction = (box , index) =>{
        if (isValidAction(box) && isGameActive) {
            box.innerText =currentPlayer;
            box.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    };

    const resetBoard = () =>{
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true ;
        announcer.classList.add('hide');
        if (currentPlayer=== 'O') {
            changePlayer();
        }

        box.forEach(box => {
            box.innerText = '';
            box.classList.remove('playerX');
            box.classList.remove('playerO');
        });
    }


    box.forEach((box , index)=>{
        box.addEventListener('click' , ()=> userAction(box , index))
    })
    
    resetButton.addEventListener('click' , resetBoard);
})