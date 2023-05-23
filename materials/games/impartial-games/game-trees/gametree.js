
document.getElementById("myForm").addEventListener("submit", function(event){
    event.preventDefault();
    
    var a = document.getElementById("numA").value;
    var b = document.getElementById("numB").value;
    var n = document.getElementById("numN").value;
    
    var output = document.getElementById("output");
    output.innerHTML = "";
    
    var data = buildTree(n, a, b);
    
  function colorNode(node) {
    if (!node.children) {
      return "IndianRed";
    }
    for (var i = 0; i < node.children.length; i++) {
      if (colorNode(node.children[i]) === "IndianRed") {
        return "DarkSeaGreen";
      }
    }
    return "IndianRed";
  }
    var svg = d3.select("#output").append("svg")
      .attr("width", 610)
      .attr("height", 900)
      .attr("preserveAspectRatio","xMidYMid meet")
      .attr("viewBox","0 0 610 900")
      .append("g")
      .attr("transform", "translate(40,0)");
    
    var tree = d3.tree().size([900, 560]);
    var root = d3.hierarchy(data);
    update(root);
  
    function update(source) {
      var i = 0; // Initialize counter
      var duration = 750; // Define transition duration
      
      var nodes = tree(root).descendants();
      var links = nodes.slice(1);
  
      // Node update
      var node = svg.selectAll('g.node')
        .data(nodes, function(d) {return d.id || (d.id = ++i); });
        
      var nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr("transform", function(d) {
          return "translate(" + source.y0 + "," + source.x0 + ")";
      })
      .on('click', click);
  
      // Add Circle for the nodes
      nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', 1e-6)
        .style("fill", function(d) {
            return d._children ? "lightsteelblue" : "#fff";
        });
  
      // Add labels for the nodes
      nodeEnter.append('text')
        .attr("dy", ".35em")
        .attr("x", function(d) {
            return d.children || d._children ? -13 : 13;
        })
        .attr("text-anchor", function(d) {
            return d.children || d._children ? "end" : "start";
        })
        .text(function(d) { return d.data.name; });
  
      // UPDATE
      var nodeUpdate = nodeEnter.merge(node);
  
      // Transition to the proper position for the node
      nodeUpdate.transition()
        .duration(duration)
        .attr("transform", function(d) { 
            return "translate(" + d.y + "," + d.x + ")";
         });
  
      // Update the node attributes and style
      nodeUpdate.select('circle.node')
        .attr('r', 5)
        .style("fill", function(d) {
          return colorNode(d);
        })
        .style("stroke", "steelblue")
        .style("stroke-width", 2)
        .attr('cursor', 'pointer');
  
      // Remove any exiting nodes
      var nodeExit = node.exit().transition()
          .duration(duration)
          .attr("transform", function(d) {
              return "translate(" + source.y + "," + source.x + ")";
          })
          .remove();
  
      // On exit reduce the node circles size to 0
      nodeExit.select('circle')
        .attr('r', 1e-6);
  
      // On exit reduce the opacity of text labels
      nodeExit.select('text')
        .style('fill-opacity', 1e-6);
  
      // Update the links...
      var link = svg.selectAll('path.link')
          .data(links, function(d) { return d.id; });
  
      // Enter any new links at the parent's previous position.
      var linkEnter = link.enter().insert('path', "g")
          .attr("class", "link")
          .attr('d', function(d){
            var o = {x: source.x0, y: source.y0}
            return diagonal(o, o)
          });
  
      // UPDATE
      var linkUpdate = linkEnter.merge(link);
  
      // Transition back to the parent element position
      linkUpdate.transition()
          .duration(duration)
          .attr('d', function(d){ return diagonal(d, d.parent) });
  
      // Remove any exiting links
      var linkExit = link.exit().transition()
          .duration(duration)
          .attr('d', function(d) {
            var o = {x: source.x, y: source.y}
            return diagonal(o, o)
          })
          .remove();
  
      // Store the old positions for transition.
      nodes.forEach(function(d){
        d.x0 = d.x;
        d.y0 = d.y;
      });
  
      // Creates a curved (diagonal) path from parent to the child nodes
      function diagonal(s, d) {
  
        path = `M ${s.y} ${s.x}
                C ${(s.y + d.y) / 2} ${s.x},
                  ${(s.y + d.y) / 2} ${d.x},
                  ${d.y} ${d.x}`
  
        return path
      }
  
      // Toggle children on click.
      function click(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
          } else {
            d.children = d._children;
            d._children = null;
          }
        update(d);
      }
    }
  });
  
  function buildTree(n, a, b) {
    n = Number(n);
    a = Number(a);
    b = Number(b);
  
    var nodes = [];
    for (var i = n; i >= 0; i--) {
      nodes[i] = { value: i, children: [] };
    }
    for (var i = n; i > 0; i--) {
      var children = [i - 1, i - a, i - b].filter(x => x >= 0);
      for (var j = 0; j < children.length; j++) {
        nodes[i].children.push(nodes[children[j]]);
      }
    }
  
    return convertToD3Hierarchy(nodes[n]);
  
    function convertToD3Hierarchy(node) {
      return {
        name: node.value,
        children: node.children.map(convertToD3Hierarchy)
      };
    }
  
  }
  