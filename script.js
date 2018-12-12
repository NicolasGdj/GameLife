var COLONNES = 100;
var LINES = 60;

var playstate = true;
var it = 0;

var matrix = [];

var container = document.getElementById("container");
for(var y = 0; y < LINES; y++){
    var line = document.createElement("div");
    line.className="line";
    container.appendChild(line);

    var array = [];
    matrix.push(array);

    for(var x = 0; x < COLONNES; x++){
        var checkbox = document.createElement("input");
        checkbox.type="checkbox";
        line.appendChild(checkbox);
        array.push(checkbox);
    }
}

var saved;

function save(){
    saved = [];
    for(var y = 0; y < matrix.length; y++){
        var line = [];
        for(var x = 0; x < matrix[y].length; x++){
            line.push(matrix[y][x].checked);
        }
        saved.push(line);
    }
    console.log("save");
}

function restore(){
    for(var y = 0; y < matrix.length; y++){
        for(var x = 0; x < matrix[y].length; x++){
            matrix[y][x].checked = saved[y][x];
        }
    }
    console.log("restore");
    it= 0;
}

function random(){
    for(var y = 0; y < matrix.length; y++){
        for(var x = 0; x < matrix[y].length; x++){
            matrix[y][x].checked = (Math.floor(Math.random()*100)%15 == 0 ? true : false);
        }
    }
    it=0;
}

function update(){
    if(!playstate) return;

    it++;
    document.getElementById("iteration").innerHTML=it;

    var lines = [];
    for(var y = 0; y < matrix.length; y++){
        var line = [];
        for(var x = 0; x < matrix[y].length; x++){
            line.push(getAlly(x,y));
        }
        lines.push(line);
    }

    for(var y = 0; y < matrix.length; y++){
        for(var x = 0; x < matrix[y].length; x++){
            var e = matrix[y][x];
            var ally = lines[y][x];
            if(!e.checked){ //Morte
                if(ally == 3)
                    e.checked=true;
            }else{//Vivante
                if(ally < 2 || ally > 3)
                    e.checked = false;
            }
        }
    }
}

function getAlly(X, Y){
    var ally = 0;
    for(var x = -1; x <=1; x++){
        for(var y = -1; y <=1; y++){
            if(x!=0 || y!=0){
                if(matrix[Y+x] != null){
                    var e = matrix[Y+x][X+y];
                    if(e != null && e.checked){
                        ally++;
                    }
                }
            }
        }
    }
    return ally;
}

switchState();
function switchState(){
    playstate = !playstate;
    document.getElementById("start").innerHTML = (playstate ? "Arrêter la simulation" : "Lancer la simulation")
    if(playstate)
        save();
    else if(it != 0)
        restore();

}


setInterval(update, 100);
