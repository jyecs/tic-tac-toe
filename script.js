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
    let value = "";

    const playToken = (player) => {
        if (value === "") {value = player};
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

    const getActivePlayer = () => activePlayer;

    return { playRound, getGameBoard: board.getGameBoard, getActivePlayer };
}

function ScreenController() {
    const game = TicTacToe();
    const playerTurnDiv = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");

    const updateScreen = () => {
        boardDiv.replaceChildren();

        const board = game.getGameBoard();
        const activePlayer = game.getActivePlayer();

        playerTurnDiv.textContent = `${activePlayer.name}'s turn`;

        board.forEach( (row, rowIndex) => {
            row.forEach( (cell, colIndex) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.textContent = cell.getValue();

                cellButton.dataset.column = colIndex;
                cellButton.dataset.row = rowIndex;
                cellButton.addEventListener("click", clickHandlerBoard);
                boardDiv.appendChild(cellButton);
            });
        });

        function clickHandlerBoard(e)  {
            const selectedColumn = e.target.dataset.column;
            const selectedRow = e.target.dataset.row;
            e.stopPropagation();

            if (!selectedColumn) return;

            game.playRound(selectedRow, selectedColumn);
            updateScreen();
        }
    }
    updateScreen();

}

ScreenController();