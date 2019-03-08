class Viewport{
	constructor(element_id){
		this.element = document.getElementById(element_id);
		this.canvas = document.createElement("canvas");
		this.canvas.width=500;
		this.canvas.height=500;
		this.element.appendChild(this.canvas);
		this.ctx = this.canvas.getContext('2d');
	}

	getContext(){
		return this.canvas.getContext("2d");
	}

	addPoint(P){
		var ui = new ViewportPoint(P, this);
		return ui;
	}
}

class ViewportPoint{
	constructor(P, viewport){
		this.changeHandlers=[];
		this.P = P;
		this.viewport = viewport;
		this.element = document.createElement("Button");
        this.element.className = 'cp';
        this.element.style.left = parseInt(this.P['x']) + 'px';
        this.element.style.top = parseInt(this.P['y']) + 'px';
        viewport.element.appendChild(this.element);

        var self = this;
        this.element.onmousedown = function(e){
            var O = self.viewport.element.getClientRects()[0];
            
            document.onmousemove = function drag(e) {
                self.P['x'] = e.pageX-O.x;
                self.P['y'] = e.pageY-O.y;
                self.element.style.left = self.P['x']+"px";
                self.element.style.top = self.P['y']+"px";

                for(var handler of self.changeHandlers){
                	handler();
                }
            };
            
            document.onmouseup = function () {
                self.element.focus();
                document.onmousemove = document.onmouseup = null;
            }
        };
	}

	onChange(f){
		this.changeHandlers.push(f);
	}


}