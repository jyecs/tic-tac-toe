function GameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getGameBoard = () => board;

    const playMove = (row,col,player) => {
        board[row][col].playToken(player);
    };

    return { getGameBoard, playMove };
}

function Cell() {
    let value = 0;

    const playToken = (player) => {
        value = player;
    };

    const getValue = () => value;

    return { playToken, getValue };
}

function TicTacToe(playerOneName = "Player One", playerTwoName = "Player Two") {
    let board = GameBoard();
    const players = [
        {
            name: playerOneName,
            token: "O"
        },
        {
            name: playerTwoName,
            token: "X"
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    
    const playRound = (row, col) => {
        board.playMove(row, col, activePlayer.token)
        switchPlayerTurn();
    };

    return { playRound, getGameBoard: board.getGameBoard };
}
