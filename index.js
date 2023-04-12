const boardElement = document.getElementById('gameBoard')
const playerElement = document.getElementById('player')
const resultElement = document.getElementById('result')

const gameBoard = (() => {
     const board = ["","","","","","","","",""]

     const getBoard = () => {
        return board;
     }

     const getField = (index) => {
        return board[index];
      };

     const updateBoard = (index,symbol) => {
        board[index] = symbol;
     }

     const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
          }
     }
     return {getBoard,updateBoard,getField,resetBoard}
})();

const Player = (playerSymbol) => {
    this.playerSymbol = playerSymbol;
    const getSymbol = () => {
        return playerSymbol;
    }

    return { getSymbol };
}

const playerMove = (index) => {
    gameController.playRound(index)
    renderGameBoard();
}


const gameController = (() => {
    const player1 = Player("O")
    const player2 = Player("X")
    let round = 1;
    let isOver = false;
    const playRound = (index) => {
        if(isOver == true) return;
        gameBoard.updateBoard(index, getCurrentPlayerSign());
        if (checkWinner(index)) {
          displayController.setResultMessage(getCurrentPlayerSign() + ' has won the game!');
          isOver = true;
          return;
        }
        if (round === 9) {
          displayController.setResultMessage("Draw");
          isOver = true;
          return;
        }
        round++;
        displayCurrentPlayer();
      };


      const displayCurrentPlayer = () =>{
        displayController.setCurrentPlayer(
            `Player ${getCurrentPlayerSign()}'s turn`
          );
      }

      //alternate between players
      const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? player1.getSymbol() : player2.getSymbol();
      };  

      const checkWinner = (index) => {
        //provide all winning combinations
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];

        //.filter to filter winConditions on current Player move
        //.some to loop through each combination
        //.every to check each value in a winning combination to match the current player symbol
        return  winConditions
        .filter((combination) => combination.includes(index))
        .some((possibleCombination) =>
          possibleCombination.every(
            (index) => gameBoard.getField(index) === getCurrentPlayerSign()
          )
        );
      }

      const resetGame = () => {
        gameBoard.resetBoard();
        isOver = false;
        round = 1;
        displayCurrentPlayer();
      }

    return { playRound,displayCurrentPlayer,resetGame }  
})();

const displayController = (() => {
    const setResultMessage = (message) => {
        resultElement.innerHTML = message
    }

    const setCurrentPlayer = (message) => {
        playerElement.innerHTML = message
    }
    return { setResultMessage, setCurrentPlayer }
})();


/*render board*/

function renderGameBoard() {
    {
        //console.log(gameBoard.getBoard())
        let boardHtml = ''
        boardHtml = gameBoard.getBoard().map((symbol,i) => {
            return `<div class="box" data-index="${i}" onClick="playerMove(${i})">${symbol}</div>`
        })
        boardElement.innerHTML = boardHtml.join('')
    }
}

function resetBoard() {
    gameController.resetGame()
    renderGameBoard();
    displayController.setResultMessage("")
}

renderGameBoard();
gameController.displayCurrentPlayer()