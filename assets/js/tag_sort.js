$(document).ready(function() {
  $('div.sidebar div.tags ul').html(
    $('div.sidebar div.tags ul li').sort(function(a, b) {
      var count_a = $(a).find('a span.label-info > span.tag_count');
      var count_b = $(b).find('a span.label-info > span.tag_count');
      var result = parseInt(count_b.text()) - parseInt(count_a.text());
      return result;
    })
  );
});
