//Calculator rounds to the nearest integer on division
$(function(){
  //Expression is parsed based on space character
  function getExpressionParts(expression){
    return expression.split(" ");
  }

  function isExpressionComplete(expression){
    var arr = getExpressionParts(expression);
    if(arr.length > 2 && !isNaN(Number.parseInt(arr[2]))){
      return true;
    }
    return false;
  }

  function expressionHasOperator(expression){
    let arr = getExpressionParts(expression);

    if(arr.length < 2){
      return false;
    }

    let regexp = /[-+x÷=]/;
    var match = regexp.exec(expression);
    return (match === null) ? false : true;

  }

  function getAnswer(expression){
    let arr = getExpressionParts(expression);

    let operand1 = arr[0];
    let operator = arr[1];
    let operand2 = arr[2];

    return doCalculation(Number.parseInt(operand1), operator, Number.parseInt(operand2));
  }


  function doCalculation(operand1, operator, operand2){

    if(Number.isNaN(operand1) || Number.isNaN(operand2))
      return "Error";

    switch (operator) {
      case "+":
        return operand1 + operand2;
      case "-":
        return operand1 - operand2;
      case "x":
        return operand1 * operand2;
      case "÷":
        if(operand2 === 0){
          return "Error";
        }
        else{
          return Math.round(operand1 / operand2);
        }
        break;
      default:
        return "Error";
    }
    if(operator === "/" && operand2 === 0){
      return "Error";
    }
  }

  $('span').click(function(){
    let expression = $('#screen').text();

    //clear clicked
    if($(this).attr('Id') === 'clear'){
      $('#screen').html("");
      return;
    }

    //check for negative number entry
    if($(this).text()==='-'){
      //first entry is '-' means first operand will be negative
      if(expression.length === 0){
        expression = $(this).text();
      }

      //we have 2 operands and an operator = calculate the total so far
      else if (isExpressionComplete(expression)){
        expression = getAnswer(expression) + " " + $(this).text() + " ";
      }

      //an operator followed by '-' means 2nd operand is negative
      else if(expressionHasOperator(expression)){
        expression = expression + $(this).text();
      }

      // '-' is the operator
      else{
        expression = expression + " " + $(this).text() + " ";
      }
    }
    else{

      //Operator clicked
      if($(this).attr('class') === 'operator'){
        if (isExpressionComplete(expression)){
          expression = getAnswer(expression);
        }
        if($(this).attr('Id') !== 'equals'){
          expression = expression + " " + $(this).text() + " ";
        }
      }

      //Number Clicked
      else{
        expression = expression + $(this).text();
      }
    }
    $('#screen').html(expression);
  });
});
