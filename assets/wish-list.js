(function($) {  

  $(document).ready(function() {
      initWishlist();
      initProductWishlist();
      initRemoveWishlist();
  }); 

  function initWishlist() {
    $('.engoj_add_to_wishlist').click(function(e) {
      e.preventDefault();
      var form = $(this).parent();  
      var productItem = $(this).parents('.product-container');
     
      $.ajax({
        type: 'POST',
        url: '/contact',
        data: form.serialize(),
        beforeSend: function() {
          form.html('<a class="wish loader" href="/pages/wish-list" title="Adding..." ><i><svg xml:space="preserve" style="enable-background:new 0 0 50 50;margin-top: 13px;" viewBox="0 0 24 30" height="20px" width="21px" y="0px" x="0px" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" id="Layer_1" version="1.1"><rect opacity="0.2" fill="#fff" height="8" width="3" y="10" x="0"><animate repeatCount="indefinite" dur="0.6s" begin="0s" values="0.2; 1; .2" attributeType="XML" attributeName="opacity"/><animate repeatCount="indefinite" dur="0.6s" begin="0s" values="10; 20; 10" attributeType="XML" attributeName="height"/><animate repeatCount="indefinite" dur="0.6s" begin="0s" values="10; 5; 10" attributeType="XML" attributeName="y"/></rect><rect opacity="0.2" fill="#fff" height="8" width="3" y="10" x="8">      <animate repeatCount="indefinite" dur="0.6s" begin="0.15s" values="0.2; 1; .2" attributeType="XML" attributeName="opacity"/><animate repeatCount="indefinite" dur="0.6s" begin="0.15s" values="10; 20; 10" attributeType="XML" attributeName="height"/><animate repeatCount="indefinite" dur="0.6s" begin="0.15s" values="10; 5; 10" attributeType="XML" attributeName="y"/></rect><rect opacity="0.2" fill="#fff" height="8" width="3" y="10" x="16"><animate repeatCount="indefinite" dur="0.6s" begin="0.3s" values="0.2; 1; .2" attributeType="XML" attributeName="opacity"/><animate repeatCount="indefinite" dur="0.6s" begin="0.3s" values="10; 20; 10" attributeType="XML" attributeName="height"/><animate repeatCount="indefinite" dur="0.6s" begin="0.3s" values="10; 5; 10" attributeType="XML" attributeName="y"/></rect></svg></i></a>');
        },
        success: function(data) { 
          form.html('<a class="wish" href="/pages/wish-list" title="Go to Wishlist" ><i class="icon icon-check"></i></a>');
        },
        error: function(xhr, text) { 
          form.html('<a class="wish" href="/pages/wish-list" title="Go to Wishlist" ><i class="icon icon-check"></i></a>');   
          $('.error-message').text($.parseJSON(xhr.responseText).description);
          showPopup('.error-popup');
        }
      });
    });

  }window.initWishlist=initWishlist;


  function initProductWishlist() {
    $('.engoj_add_to_wishlist_pd').click(function(e) {
      e.preventDefault();
     
      var form = $(this).parent().parent().parent();
      var productItem = $(this).parents('.engoj_addwl_success');
      
      $.ajax({
        type: 'POST',
        url: '/contact', 
        data: form.serialize(),
        beforeSend: function() {
          showPopup('.loading'); 
        },
        success: function(data) {
          hidePopup('.loading');  
          productItem.html('<a class="link-ver1 wish" href="/pages/wish-list" title="Go to Wishlist" ><i class="fa fa-check"></i></a>'); 
        },
        error: function(xhr, text) {
          hidePopup('.loading');    
          $('.error-message').text($.parseJSON(xhr.responseText).description);
          showPopup('.error-popup');  
        }
      });

    }); 
  };

  /* Remove Wishlist */
  function initRemoveWishlist() {
    $('.btn-remove-wishlist').click(function(e) {
      e.preventDefault();
      var row = $(this).parents('tr');
      var tagID = row.find('.tag-id').val();
      var form = jQuery('#remove-wishlist-form');
      form.find("input[name='contact[tags]']").val('x' + tagID);
      $.ajax({
        type: 'POST',
        url: '/contact',
        data: form.serialize(),
        beforeSend: function() {
          showPopup('.loading'); 

        },
        success: function(data) {
          row.fadeOut(1000);
          hidePopup('.loading');  
        },
        error: function(xhr, text) {
          $('.error-message').text($.parseJSON(xhr.responseText).description);
          showPopup('.error-popup');
        }
      });
    });
  };


})(jQuery);