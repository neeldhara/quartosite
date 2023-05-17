$(function() {
    const tape = $("#tape");
    const storage = $("#storage");
    const sizes = [50, 75, 100, 125];
    const colors = ['DodgerBlue', 'MediumSeaGreen', 'Tomato', 'SlateBlue'];
  
    // Create pieces
    let totalWidth = 0;
    while(totalWidth < 420) {
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      if(totalWidth + size <= 420) {
        totalWidth += size;
        const piece = $(`<div class="piece" style="width: ${size}px;">${size}</div>`);
        piece.css("background-color", colors[sizes.indexOf(size)]);
        storage.append(piece);
      }
      else{
        const finalsize = 420-totalWidth;
        totalWidth += finalsize;
        const piece = $(`<div class="piece" style="width: ${finalsize}px;">${finalsize}</div>`);
        piece.css("background-color", 'IndianRed');
        storage.append(piece);
      }
    }
  
    // Make pieces draggable

    $(".piece").draggable({
        revert: "invalid",
        helper: "clone",
        appendTo: "body",
        start: function(e, ui) {
            $(this).data("originalParent", $(this).parent());
            $(this).fadeTo('fast', 0.5);
        },
        stop: function(e, ui) {
            $(this).fadeTo(0, 1);
            updateSum();
        }
    });
    
    $(".piece").on('dblclick', function() {
        let piece = $(this);
        if(piece.parent().attr("id") === "tape") {
            $("#storage").append(piece);
            updateSum();
        }
        else if(piece.parent().attr("id") === "storage") {
            $("#tape").append(piece);
            updateSum();
        }
    });
        
    // Make tape and storage droppable
    tape.droppable({
      accept: ".piece",
      drop: function(event, ui) {
        ui.draggable.css("position", "static");
        $(this).append(ui.draggable);
      }
    });
  
    storage.droppable({
      accept: ".piece",
      drop: function(event, ui) {
        ui.draggable.css("position", "static");
        $(this).append(ui.draggable);
      }
    });
  
    function updateSum() {
        let piecesOnTape = $("#tape").children();
        let sum = 0;
        let target = parseFloat($("#target").text().split(": ")[1]).toFixed(2);
        for (let i = 0; i < piecesOnTape.length; i++) {
            sum += $(piecesOnTape[i]).width() * (piecesOnTape.length - i);
        }
        let average = (sum / piecesOnTape.length).toFixed(2);    
        $("#sumDisplay").text(`Average: ${average}`);
    
        if (piecesOnTape.length === $(".piece").length) {
            if (average === target) {
                $("#message").text("Mission Accomplished!");
            } else {
                $("#message").text("Nice try, but you can do better!");
            }
        } else {
            $("#message").text("Keep going until all pieces are on the tape...");
        }
    }
    

    function updateTarget() {
        let pieces = $(".piece").toArray();
        pieces.sort((a, b) => $(a).width() - $(b).width());
        
        let targetSum = 0;
        for (let i = 0; i < pieces.length; i++) {
            targetSum += $(pieces[i]).width() * (pieces.length - i);
        }
        
        $("#target").text("Target: " + (targetSum/(pieces.length)).toFixed(2));
    }

    updateTarget();
    

const regions = Array.from(document.querySelectorAll('.region'));
const dividers = Array.from(document.querySelectorAll('.divider'));
const costElement = document.getElementById('cost');
const optimalCostElement = document.getElementById('optimal-cost');
let currentDivider = null;

dividers.forEach(divider => {
    divider.addEventListener('mousedown', () => {
        currentDivider = divider;
    });
});

window.addEventListener('mouseup', () => {
    currentDivider = null;
});

window.addEventListener('mousemove', (e) => {
    if (currentDivider) {
        const prevRegion = currentDivider.previousElementSibling;
        const nextRegion = currentDivider.nextElementSibling;

        const totalWidth = prevRegion.offsetWidth + nextRegion.offsetWidth;
        const prevRegionWidth = e.clientX - prevRegion.getBoundingClientRect().left;
        const nextRegionWidth = totalWidth - prevRegionWidth;

        if (prevRegionWidth > 42 && nextRegionWidth > 42) {
            prevRegion.style.width = `${prevRegionWidth}px`;
            nextRegion.style.width = `${nextRegionWidth}px`;

            prevRegion.innerText = Math.round(prevRegionWidth);
            nextRegion.innerText = Math.round(nextRegionWidth);
        }

        updateCost();
    }
});

function updateCost() {
    const widths = regions.map(region => parseInt(region.innerText));
    const cost = (widths[0]*4 + widths[1]*3 + widths[2]*2 + widths[3]*1) / 4;
    costElement.innerText = `Cost: ${Math.round(cost)}`;

    const sortedWidths = [...widths].sort((a, b) => a - b);
    const optimalCost = (sortedWidths[0]*4 + sortedWidths[1]*3 + sortedWidths[2]*2 + sortedWidths[3]*1) / 4;
    optimalCostElement.innerText = `Optimal Cost: ${Math.round(optimalCost)}`;
}

function updateBackgroundColor() {
    const maxRegionWidth = Math.max(...regions.map(region => parseInt(region.innerText)));
    regions.forEach(region => {
        const regionWidth = parseInt(region.innerText);
        const opacity = regionWidth / maxRegionWidth;
        region.style.backgroundColor = `rgba(60,179,113,${opacity})`; // RGBa value for MediumSeaGreen
    });
}

regions.forEach(region => {
    region.addEventListener('DOMSubtreeModified', updateBackgroundColor);
});
updateBackgroundColor();

});
  