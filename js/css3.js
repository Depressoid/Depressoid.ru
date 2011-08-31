(function(){
	window.utils =  {
		markLastChild: function(container, element){
			var elements = container.getElementsByTagName(element);
			var lastElement = elements[elements.length - 1];
			lastElement.className += ' last-child';
		},
		
		addContentBefore: function(container, content){
			container.insertAdjacentHTML('afterBegin', content);
		},
		
		addContentAfter: function(container, content){
			container.insertAdjacentHTML('beforeEnd', content);
		}
	};
	
	var content = document.getElementById('content');
	var article = content.getElementsByTagName('article')[0];
	
	utils.markLastChild(article, 'p');
	utils.addContentBefore(content, '<div class="before"></div>');
	utils.addContentAfter(content, '<div class="after"></div>');
})();