var photos = [
	{ src: 'http://i.ytimg.com/vi/_djfIygx0lo/maxresdefault.jpg' },
	{ src: 'http://i.ytimg.com/vi/2AVqxPAs094/maxresdefault.jpg' },
	{ src: 'http://i.ytimg.com/vi/_dcojg8MFPo/maxresdefault.jpg' }
];

function View (tagName, obj) {
	this.element = $(document.createElement(tagName));
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
	this.element.attr('id', 'gallery'); //
	var largeView = new LargeView ('div', photos[0]);
	largeView.render();
	this.element.append(largeView.element) //
	this.data.forEach(function (photo) {
		var thumbnailView = new ThumbnailView ('div', photo);
		thumbnailView.render();
		_this.element.append(thumbnailView.element); //
	});
};

function ThumbnailView () {
	View.apply(this, arguments);

}

ThumbnailView.prototype = Object.create(View.prototype);

ThumbnailView.prototype.render = function () {
	var _this = this;
	this.element.css('background-image', 'url(' + this.data.src + ')')
		.addClass('thumbnail'); //
	this.bindEvents();
};

ThumbnailView.prototype.bindEvents = function () {
	var _this = this;
	var photoTarget = this.element;
	photoTarget.on('click', function () {
		var largeView = $('div.large')
			.css('background-image', 'url(' + _this.data.src + ')'); //
	})
};

function LargeView () {
	View.apply(this, arguments);
}

LargeView.prototype = Object.create(View.prototype);

LargeView.prototype.render = function () {
	var _this = this;
	this.element.css('background-image', 'url(' + this.data.src + ')')
		.addClass('large'); //
	this.bindEvents();
};

LargeView.prototype.bindEvents = function () {
	var _this = this;
	this.element.on('click', function () {
		_this.element.toggleClass('full'); //	
	});
};

var galleryView = new GalleryView('div', photos);
galleryView.render();

$('body').append(galleryView.element);








