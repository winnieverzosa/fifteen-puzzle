/**
 *
 * Fifteen Puzzle Project
 *
 * This project is a game called Fifteen Puzzle.
 * The goal of the fifteen puzzle is to un-jumble its fifteen squares by repeatedly making moves that slide squares
 * into the empty space. How quickly can you solve it?
 * Enjoy!
 *
 * Created by Winnie C. Verzosa
 * Website: http://winnieverzosa.com
 * Portfolio: http://winnieverzosa.com/resume
 * LinkedIn: https://www.linkedin.com/in/winnieverzosa
 * GitHub: https://github.com/winnieverzosa
 *
 **/

var emptyx = "300px";
var emptyy = "300px";

$(document).ready(function() {


    var init = (function() {
        var divs = $('#puzzlearea div');

        // initialize each piece
        for (var i = 0; i < divs.length; i++) {
            var div = divs[i];

            // calculate x and y for this piece
            var x = ((i % 4) * 100);
            var y = (Math.floor(i / 4) * 100);

            // set basic style and background
            div.className = "puzzlepiece";
            div.style.left = x + 'px';
            div.style.top = y + 'px';
            div.style.backgroundImage = 'url("background.jpg")';
            div.style.backgroundPosition = -x + 'px ' + (-y) + 'px';
            div.style.width = '99px';
            div.style.height = '99px';

            // store x and y for later
            div.x = x;
            div.y = y;
        }
    })();

    $('#shufflebutton').click(function() {
        var replace = $('<div>');

        var puzzleList = $('#puzzlearea div');


        while(puzzleList.size()>0){
            var temp1 = getRandomPuzzle();
            var temp2 = getRandomPuzzle();

            if(temp2!=null){

                var left = temp1.style.left;
                var top = temp1.style.top;

                temp1.style.left = temp2.style.left;
                temp1.style.top = temp2.style.top;

                temp2.style.left = left;
                temp2.style.top = top;

                replace.append(temp1);
                replace.append(temp2);
            }else
            {
                replace.append(temp1);
            }


        }


        $('#puzzlearea').html(replace.html());     // update our container div with the
        // new, randomized divs


        function getRandomPuzzle(){

            var size = puzzleList.size();
            var rand = Math.floor(Math.random() * size);
            var temp = puzzleList.get(rand); // grab a random div from our set
            puzzleList.splice(rand,1); // remove our selected div from the main set
            return temp;
        }

        $(".puzzlepiece").click(function() {
            var tempx = $(this).css("left");
            var tempy = $(this).css("top");

            if(checkSquare(parseInt(tempx), parseInt(tempy))){
                $(this).css("left", emptyx);
                $(this).css("top", emptyy);
                emptyx = tempx;
                emptyy = tempy;
            }
        });

        $(".puzzlepiece").hover(function() {
            var tempx = $(this).css("left");
            var tempy = $(this).css("top");
            if(checkSquare(parseInt(tempx), parseInt(tempy))){
                $(".puzzlepiece").addClass("movablepiece");
            }
            else{
                $(".puzzlepiece").removeClass("movablepiece");
            }
        });
    });

});

function checkSquare(x, y){

    if ( (x+100 == parseInt(emptyx) && y == parseInt(emptyy)) || (x-100 == parseInt(emptyx) && y == parseInt(emptyy)) ){
        return true;
    }
    else if( (x == parseInt(emptyx) && y+100 == parseInt(emptyy)) || (x == parseInt(emptyx) && y-100 == parseInt(emptyy)) ){
        return true;
    }
    else{
        return false;
    }
}