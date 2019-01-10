var helpers={};

// TODO: session secret
helpers.sessionSecret=function () {
  return config[process.env.NODE_ENV].secret
}

helpers.isValid=function(str) {
  var matchingOpeningBracket, ch
  var stack = []

  var openingBrackets = ['[', '{', '(']
  var closingBrackets = [']', '}', ')']

  for (var i = 0; i < str.length; i++) {
    ch = str[i]
    if (closingBrackets.indexOf(ch) > -1) {
      matchingOpeningBracket = openingBrackets[closingBrackets.indexOf(ch)]
      var index=closingBrackets.indexOf(ch)
      if (stack.length == 0 || (stack.pop() != matchingOpeningBracket)) {
        return false
      }
    } else {
      stack.push(ch)
    }
  }
  return (stack.length == 0)
};

// TODO: stack
function Stack() {
  this.dataStore = [];
  this.top = 0;
  this.push = push;
  this.pop = pop;
  this.peek = peek;
  this.length = length;
  this.clear = clear;
  this.finalData=finalData;
}

function push(element) {
  this.dataStore[this.top++] = element;
}

function pop() {
  return this.dataStore[--this.top];
}

function peek() {
  return this.dataStore[this.top-1];
}
function length() {
  return this.top;
}

function clear() {
  this.top = 0;
}
function finalData(value,data) {
  var index = data.indexOf(value);
  if (index > -1) {
    data.splice(index, 1);
    return this.dataStore=data
  }
}

var data = [{'o':'[','c':']'}, {'o':'{','c':'}'}, {'o':'(','c':')'}]
function isOpen(ch){
  for (var i = 0; i < data.length; i++) {
    if(data[i].o==ch){
      return true;
    }
  }
}

function matches(open,close){
  for (var i = 0; i < data.length; i++) {
    if(data[i].o==open){
      if (data[i].c==close) {
        return data[i].c==close;
      }
    }
  }
  return false;
}

helpers.isValidUsingStack=function(expr) {
  var s= new Stack();
  var x;
  for (var i=0; i<expr.length; i++)
  {
    if (isOpen(expr[i])) {
      s.push(expr[i])
    }
    else {
      var pop=s.pop();
      if (!matches(pop,expr[i])) {
        return {'success':false,'expr':s.dataStore};
      }
    }
  }
  return s;
}

helpers.isValidUsingStack1=function(expr) {
  var s= new Stack();
  var x;
  for (var i=0; i<expr.length; i++)
  {
    if (expr[i]=='('||expr[i]=='{'||expr[i]=='[')
    {
      s.push(expr[i]);
    }
    switch (expr[i]){
      case '(':
      s.pop();
      s.finalData(')',s.dataStore);
      break;
      case '{':
      s.pop();
      s.finalData('}',s.dataStore);
      break;
      case '[':
      s.pop();
      s.finalData(']',s.dataStore);
      break;
    }
  }
  return s;
}


module.exports=helpers;
