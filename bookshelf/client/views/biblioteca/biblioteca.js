/*****************************************************************************/
/* Biblioteca: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Biblioteca.events({
    /*
     * Example:
     *  'click .selector': function (e, tmpl) {
     *
     *  }
     */
     'click .product': function(){
         // body...
     }
});

Template.Biblioteca.helpers({
    /*
     * Example:
     *  items: function () {
     *    return Items.find();
     *  }
     */
});

/*****************************************************************************/
/* Biblioteca: Lifecycle Hooks */
/*****************************************************************************/
Template.Biblioteca.created = function() {




  
};

Template.Biblioteca.rendered = function() {

    if (!this.rendered) {
        //define custom parameters
        $.bookshelfSlider('#bookshelf_slider', {
            'item_width': '95%', //responsive design > resize window to see working
            'item_height': 320,
            'products_box_margin_left': 30,
            'product_title_textcolor': '#ffffff',
            'product_title_bgcolor': '#c33b4e',
            'product_margin': 20,
            'product_show_title': true,
            'show_title_in_popup': true,
            'show_selected_title': true,
            'show_icons': true,
            'buttons_margin': 15,
            'buttons_align': 'center', // left, center, right
            'slide_duration': 800,
            'slide_easing': 'easeOutQuart',
            'arrow_duration': 800,
            'arrow_easing': 'easeInOutQuart',
            'video_width_height': [500, 290],
            'iframe_width_height': [500, 330]
        });

        this.rendered = true;
    }

};

Template.Biblioteca.destroyed = function() {};