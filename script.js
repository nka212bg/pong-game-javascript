
        let canvas;
        let c;
        const frameRate = 24;
        // BALL /////////////////
        let ballX = 5;
        let ballY = 5;
        let ballSpeedX = -10;
        let ballSpeedY = 1;
        // PLAYERS //////////////////
        let player1Width = 100;
        let player2Width = 100;

        let player1Y = 200;
        let player2Y = 200;

        let player1Tickness = 10;
        let player2Tickness = 10;

        let scorePlayer1 = 0;
        let scorePlayer2 = 0;

        const winScore = 30;




        function calcMouse(e) {
            let rect = canvas.getBoundingClientRect();
            let root = document.documentElement;
            let mouseX = e.clientX - rect.left - root.scrollLeft;
            let mouseY = e.clientY - rect.top - root.scrollTop;
            return {
                x: mouseX,
                y: mouseY
            }
        }

        window.onload = () => {
            canvas = document.getElementById('gameCanvas');
            c = canvas.getContext('2d');
            setInterval((() => { moveEverithing(); drawEverithing(); }), frameRate);//frameDraw

            canvas.addEventListener('mousemove', (e) => {
                let mousePos = calcMouse(e);
                player1Y = mousePos.y - player1Width / 2;
            });
        }

        function drawNet() {
            for (let i = 0; i < canvas.height; i += 50) {
                template(canvas.width/2, i, 1, 40, 'grey'); //net
            }
            template(canvas.width/2-20, canvas.height/2-20, 40, 40, 'grey'); //center
            template(canvas.width/2-19, canvas.height/2-19, 38, 38, 'black'); //center
        }


        function computerMovement() {
            if (player2Y + player2Width / 2 < ballY - 20) {
                player2Y += 5;
            } else if (player2Y + player2Width / 2 > ballY + 20) {
                player2Y -= 5;
            }

        }

        function moveEverithing() {
            computerMovement();

            ballX += ballSpeedX;
            ballY += ballSpeedY;

            if (ballX < 0) { // horizontal colisions player side
                if (ballY > player1Y && ballY < player1Y + player1Width) {
                    new Audio('click.mp3').play();
                    ballSpeedX = -ballSpeedX;
                    let deltaY = ballY - (player1Y + player1Width / 2);
                    ballSpeedX -= -1;
                    ballSpeedY = deltaY * 0.2;

                } else {
                    new Audio('click.mp3').play();
                    scorePlayer2++;
                    ballSpeedX = -10;
                    ballReset();
                }
            }

            if (ballX > canvas.width) { // horizontal colisions computer side
                if (ballY > player2Y && ballY < player2Y + player2Width) {
                    new Audio('click.mp3').play();
                    ballSpeedX = -ballSpeedX;
                    let deltaY = ballY - (player2Y + player2Width / 2);
                    ballSpeedY = deltaY * 0.2;
                } else {
                    new Audio('click.mp3').play();
                    scorePlayer1++;
                    ballSpeedX = -10;
                    ballReset();
                }
            }

            if (ballY < 0) { // verticavl colisions
                new Audio('click.mp3').play();
                ballSpeedY = -ballSpeedY;
            }
            if (ballY > canvas.height) {
                new Audio('click.mp3').play();
                ballSpeedY = -ballSpeedY;
            }

        }

        function drawEverithing() {

            template(0, 0, canvas.width, canvas.height, 'black'); //canvas
            drawNet(); // draw net
            template(ballX, ballY, 10, 10, 'white'); //ball
            c.fillText(scorePlayer1, 30, 30);// score player1
            c.fillText(scorePlayer2, canvas.width - 30, 30);// score player1
            template(0, player1Y, player1Tickness, player1Width, 'green'); //player1
            template(canvas.width - player2Tickness, player2Y, player2Tickness, player2Width, 'white'); //player2
            
        }

        function template(leftX, topY, width, height, color) {
            c.fillStyle = color;
            c.fillRect(leftX, topY, width, height);

        }

        function ballReset() {
            if (scorePlayer1 >= winScore) {
                winner('Player 1');
            } else if (scorePlayer2 >= winScore) {
                winner('Player 2');
            }

            ballSpeedX = 10;
            ballSpeedY = 1;
            ballX = canvas.width / 2;
            ballY = canvas.height / 2;

        }

        function winner(winner) {
            scorePlayer1 = 0;
            scorePlayer2 = 0;
            alert(winner + ' Won!');

        }

