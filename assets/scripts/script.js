var top_images = $(".top-images");
var bottom_images = $(".bottom-images");
var fowardBtn = $("#foward-btn");
var backwardBtn = $("#backward-btn");

$(window).on("load", () => {
    $(top_images).scrollLeft($(top_images).prop("scrollWidth"));
    $(bottom_images).scrollLeft($(bottom_images).prop("scrollWidth"));
});
$(window).on("resize", () => {
    $(top_images).scrollLeft($(top_images).prop("scrollWidth"));
    $(bottom_images).scrollLeft($(bottom_images).prop("scrollWidth"));
});

function forward() {
    // top row
    // if div scroll width is greater than div width buttons will work
    // otherwise there is no need for scrolling since entire content is visible
    if ($(top_images).prop("scrollWidth") > $(top_images).outerWidth(true)) {
        var first_top = $(".top-images .image").first();
        $(top_images).scrollLeft($(top_images).prop("scrollWidth") - $(first_top).outerWidth(true));
        $(first_top).clone().appendTo(top_images);
        top_images.animate({
            scrollLeft: $(top_images).scrollLeft() + $(".top-images .image").last().outerWidth(true)
        }, {
            duration: 500,
            start: () => {
                disableButtons(true);
            },
            complete: () => {
                disableButtons(false);
                $(first_top).remove();
            }
        });
    }
    // bottom row
    if ($(bottom_images).prop("scrollWidth") > $(bottom_images).outerWidth(true)) {
        var first_bottom = $(".bottom-images .image").first();
        $(bottom_images).scrollLeft($(bottom_images).prop("scrollWidth") - $(first_bottom).outerWidth(true));
        $(first_bottom).clone().appendTo(bottom_images);
        bottom_images.animate({
            scrollLeft: $(bottom_images).scrollLeft() + $(".bottom-images .image").last().outerWidth(true)
        }, {
            duration: 500,
            start: () => {
                disableButtons(true);
            },
            complete: () => {
                disableButtons(false);
                $(first_bottom).remove();
            }
        });
    }
}

function backward() {
    // top row
    if ($(top_images).prop("scrollWidth") > $(top_images).outerWidth(true)) {
        var last_top = $(".top-images .image").last();
        $(last_top).clone().prependTo(top_images);
        $(top_images).scrollLeft($(top_images).prop("scrollWidth"));
        top_images.animate({
            scrollLeft: $(top_images).scrollLeft() - $(".top-images .image").last().outerWidth(true)
        }, {
            duration: 500,
            start: () => {
                disableButtons(true);
            },
            complete: () => {
                $(last_top).remove();
                disableButtons(false);
            }
        });
    }
    // bottom row
    if ($(bottom_images).prop("scrollWidth") > $(bottom_images).outerWidth(true)) {
        var last_bottom = $(".bottom-images  .image").last();
        $(last_bottom).clone().prependTo(bottom_images);
        $(bottom_images).scrollLeft($(bottom_images).prop("scrollWidth"));
        bottom_images.animate({
            scrollLeft: $(bottom_images).scrollLeft() - $(".bottom-images .image").last().outerWidth(true)
        }, {
            duration: 500,
            start: () => {
                disableButtons(true);
            },
            complete: () => {
                $(last_bottom).remove();
                disableButtons(false);
            }
        });
    }
}

// disabling both buttons in order to prevent scroll snapping when spamming opposite button
function disableButtons(bool) {
    $(fowardBtn).prop('disabled', bool);
    $(backwardBtn).prop('disabled', bool);
}