var photos = [
	{ src: 'http://i.ytimg.com/vi/_djfIygx0lo/maxresdefault.jpg' },
	{ src: 'http://i.ytimg.com/vi/2AVqxPAs094/maxresdefault.jpg' },
	{ src: 'http://i.ytimg.com/vi/_dcojg8MFPo/maxresdefault.jpg' }
];

function View (tagName, obj) {
	this.element = document.createElement(tagName);
	this.data = obj || null;
}

View.prototype.render = function () {};
View.prototype.bindEvents = function () {};

function GalleryView () {
	View.apply(this, arguments);
}

GalleryView.prototype = Object.create(View.prototype);

GalleryView.prototype.render = function () {
	var _this = this;
	this.element.id = 'gallery';
	var largeView = new LargeView ('div', photos[0]);
	largeView.render();
	this.element.appendChild(largeView.element)
	this.data.forEach(function (photo) {
		var thumbnailView = new ThumbnailView ('div', photo);
		thumbnailView.render();
		_this.element.appendChild(thumbnailView.element);
	});
};

function ThumbnailView () {
	View.apply(this, arguments);

}

ThumbnailView.prototype = Object.create(View.prototype);

ThumbnailView.prototype.render = function () {
	var _this = this;
	this.element.style.backgroundImage = 'url(' + this.data.src + ')';
	this.element.style.backgroundSize = 'cover';
	this.element.classList.add('thumbnail');
	this.bindEvents();
};

ThumbnailView.prototype.bindEvents = function () {
	var _this = this;
	var photoTarget = this.element;
	photoTarget.addEventListener('click', function () {
		var largeView = document.querySelector('div.large'); 
		largeView.style.backgroundImage = 'url(' + _this.data.src + ')';
	})
};

function LargeView () {
	View.apply(this, arguments);
}

LargeView.prototype = Object.create(View.prototype);

LargeView.prototype.render = function () {
	var _this = this;
	this.element.style.backgroundImage = 'url(' + this.data.src + ')';
	this.element.classList.add('large');
	this.bindEvents();
};

LargeView.prototype.bindEvents = function () {
	var _this = this;
	this.element.addEventListener('click', function () {
		_this.element.classList.toggle('full');	
	});
};

var galleryView = new GalleryView('div', photos);
galleryView.render();

document.body.appendChild(galleryView.element);








