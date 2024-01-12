//Project by Zakkary Loveall(W09956088) and Miles Hays(W10102472)
//Sources:
//https://www.w3schools.com/jsref/jsref_tostring_number.asp
//https://www.geeksforgeeks.org/memoization-1d-2d-and-3d/
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity

var dynamic = [];

function indexer(graph, start) {
  var subset = [];
  for (var i = 0; i < graph.length; i++) {
    //Don't need to account for distance from start to itself
    if (graph[i] != start) {
      subset.push(graph[i]);
    }
  }
  return subset;
}

function tsp_hk(distance_matrix) {
  //Reset memoization array for better testing
  dynamic = [];
  var index  = [];
  var min = Infinity;

  //Turns distance matrix into list of cities
  for (var i = 0; i < distance_matrix.length; i++) {
    index.push(i);
  }

  //Checks the distance from each city as the starting locations
  for (var i = 0; i < distance_matrix.length; i++) {
    var distance = heldkarp(index, i, distance_matrix);
    if (distance < min) {
      min = distance;
    }
  }
  if (min == Infinity) {
    return 0;
  } else {
    return min;
  }
}

function heldkarp(cities, start, graph) {
  var subset = indexer(cities, start);
  var min = Infinity;
  var temp = cities.toString();
  //Keeps track of where the start in in the memoization
  temp += "&" + start;

  //Checks for empty lists
  if (cities.length < 2)
    return 0;
  else if (cities.length == 2) {
    //Returns the distance to the last city to check since it's the base case
    return graph[start][subset[0]];
  } else {
    //Dynamic part of algorithm
    if (dynamic[temp] != undefined) {
      return dynamic[temp];
    }
    for (var i = 0; i < subset.length; i++) {
      //Finds actual distance between start and other nodes
      var distance = heldkarp(subset, subset[i], graph) + graph[start][subset[i]];
      if (distance < min) {
        min = distance;
      }
    }
    //Saves min distance between the start and subset
    dynamic[temp] = min;
    return min;
  }
}

exports.tsp_hk = tsp_hk; //for runner