var now = true;

//Init your data
var nowTitle = "Spending by Department or Agency (projected 2018, in billions of USD)";
var nowLink = "http://federal-budget.insidegov.com/l/121/2018-Estimate#spending&s=47xnQz&st=r1RXUD";
var nowData = [["Agriculture", 132],
               ["Commerce", 9.56],
               ["Defense", 491],
               ["Education", 65.5],
               ["Energy", 26.1],
               ["Health & Human Services", 1001],
               ["Homeland Security", 38.1],
               ["Housing & Urban Development", 34.7],
               ["Interior", 13.2],
               ["Justice", 31.1],
               ["Labor", 46.6],
               ["State", 23.2],
               ["Transportation", 81.2],
               ["Treasury", 627],
               ["Veterans Affairs", 154],
               ["Environmental Protection Agency", 6.79],
               ["General Services Administration", 0.926],
               ["International Assistance Programs", 25.4],
               ["NASA", 16.5],
               ["Social Security", 938],
               ["Other", 179],
               ["Allowances", 17.5]];

var oldTitle = "Spending by Department or Agency (1968, in billions of USD)";
var oldLink = "http://federal-budget.insidegov.com/l/70/1968#spending&s=47xnQz&st=JPO1go";
var oldData = [["Agriculture", 36.7],
               ["Commerce", 2.88],
               ["Defense", 397],
               ["Education", 20.1],
               ["Energy", 12.2],
               ["Health & Human Services", 64.6],
               ["Homeland Security", 4.81],
               ["Housing & Urban Development", 18.4],
               ["Interior", 4.81],
               ["Justice", 1.77],
               ["Labor", 20.7],
               ["State", 3.19],
               ["Transportation", 27.4],
               ["Treasury", 70.6],
               ["Veterans Affairs", 34.7],
               ["Environmental Protection Agency", 1.23],
               ["General Services Administration", 2.38],
               ["International Assistance Programs", 13.9],
               ["NASA", 23.3],
               ["Social Security", 118],
               ["Other", 54.5]];


var draw = function(spendData) {

  //Select your chart.
  var chart = d3.select(".chart");

  var link = d3.select("#link").select("a");
  link.attr("href", now ? nowLink : oldLink);

  var title = d3.select("#title");
  console.log(title.html());
  title.text(now ? nowTitle : oldTitle);

  //Prepare for data join.
  var bar = chart.selectAll(".data");

  //Join your data.
  var barUpdate = bar.data(spendData);

  //Instantiate new elements by appending to the “enter selection.”
  var divEnter = barUpdate.enter().append("div").attr("class", "container");
  var labelEnter = divEnter.append("div").attr("class", "label");
  var barEnter = divEnter.append("div").attr("class", "data");

  //5s transition:
  barEnter.transition().duration(2000).style("width", function(d) {
    return d[1] * 1.5 + "px";
  });

  //Label each bar.
  barEnter.attr("value", function(d) { return d[1]; });
  labelEnter.text(function(d) { return d[0]; });
  barEnter.text("i");

  barEnter.on('mouseover', function(d) {
    var bar = d3.select(this);
    bar.text(bar.attr("value"))
    bar.style("color", "black");
    bar.style("font-size", "18px");
    var prev = d3.select(this.previousSibling);
    prev.style("font-size", "18px");
  });

  barEnter.on('mouseleave', function(d) {
    var bar = d3.select(this);
    bar.text("i");
    bar.style("color", "steelblue");
    bar.style("font-size", "12px");
    var prev = d3.select(this.previousSibling);
    prev.style("font-size", "12px");
  });

}

var nextButton = d3.select("#next");
nextButton.on('click', function() {
  d3.selectAll(".container").remove();
  now = !now;
  if (now)
    draw(nowData);
  else
    draw(oldData);
});

draw(nowData);
