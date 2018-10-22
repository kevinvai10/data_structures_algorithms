/**
 * Created by kevin on 10/13/18.
 */
function HtmlElement(){
    this.click = function(){
        console.log("clicked");
    }
}

HtmlElement.prototype.focus = function(){
    console.log("is focused");
};

function HtmlSelectElement(items = []){
    this.items = items;

    this.removeItem = function(item){
        delete this.items[item];
    };

    this.addItem = function(item){
        this.items.push(item);
    };
}

//Base htmlSelectElement
HtmlSelectElement.prototype = new HtmlElement();
HtmlSelectElement.prototype.constructor = HtmlElement;
