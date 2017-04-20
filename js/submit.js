+ function ($) {
  'use strict';
  var request;
  var alerts = ""
  var nameAlert = '<li class="error error-name" style="display: list-item;">Enter your name (min 3 characters)</li>'
  var emailAlert = '<li class="error error-email" style="display: list-item;">Enter your e-mail</li>'
  var submitedFileUrl;

  function buildAlert($form) {
    var alert = '<div role="alert" class="alert alert-danger special-alert error js-error" style="display: block;">'
    alert += '<button type="button" data-dismiss="alert" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>'
    alert += '<ulf class="padding-left-xs">'
    alert += alerts
    alert += '</ul>'
    alert += '</div>'
    $(".js-alert-container").append(alert);
  }

  function validate($form) {
    var valid = true;
    var emailValid;
    var name = $form.find(".js-name");
    var email = $form.find(".js-email");
    var error = $form.find(".js-error");
    alerts = '';

    name.removeClass("error-input");
    email.removeClass("error-input");
    $(".error").remove();

    if (name.val().length < 3) {
      name.addClass("error-input");
      alerts += nameAlert
      valid = false;
    }
    if (!email.val()) {
      email.addClass("error-input");
      alerts += emailAlert
      valid = false;
    }
    if (!valid) {
      error.show();
      buildAlert($form);
    }
    return valid;
  };

  $(window).on('load', function () {
    localStorage.setItem('pitch', '');

    $(".js-overlay-close").click(function (event) {
      event.preventDefault();
      $(".js-overlay").hide();
      $(".js-apply-form").show();
    });

    $(".js-submit-form").submit(function (event) {

      event.preventDefault();
      if (request) {
        request.abort();
      }
      
      var $form = $(this);

      if (!validate($form)) {
        return false;
      }

      var pitch = localStorage.getItem('pitch')
      
      if(!pitch) {
        var decision = confirm("Are you sure you want to apply without pitchdeck?");
        if(!decision){
          return false;
        }
      }
      
      var $inputs = $form.find("input, button");
      var serializedData = $form.serialize();

      serializedData += '&referrer=' + localStorage.getItem('referrer') + '&pitch=' + pitch;

      $inputs.prop("disabled", true);
      $form.find(".js-fail").hide();
      $form.find(".js-success").hide();

      request = $.ajax({
        url: $form.attr("action"),
        type: "post",
        data: serializedData
      });

      request.done(function (response, textStatus, jqXHR) {
        $form.find(".js-contact-number").text(response)
        $form.find(".js-success").show();
        $inputs.val("");
        ga('send', 'event', 'Application', 'Applied', 'Form');
      });

      request.fail(function (jqXHR, textStatus, errorThrown) {
        $(".js-overlay").show();
        $form.find(".js-fail").show();
      });

      request.always(function () {
        $inputs.prop("disabled", false);
        $form.find(".js-apply-form").hide();
      });
    });
  })

}(jQuery);


$(function () {
  'use strict';
  // Change this to the location of your server-side upload handler:
  var url = window.location.hostname === 'blueimp.github.io' ?
    '//jquery-file-upload.appspot.com/' : 'php/';
  $('#fileupload').fileupload({
      url: url,
      dataType: 'json',
      done: function (e, data) {
        $.each(data.result.files, function (index, file) {
          $('#files').children().remove();
          $('<p/>').text(file.name).appendTo('#files');
          localStorage.setItem('pitch', file.url);
        });
        $(".js-submit").prop("disabled", false).text("Apply");
      },
      progressall: function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#progress .progress-bar').css(
          'width',
          progress + '%'
        );
      }
    }).on('fileuploadadd', function (e, data) {
      $.each(data.files, function (index, file) {
          $('#files').children().remove();
          $('<p/>').text(file.name).appendTo('#files');
      });
      $(".js-submit").prop("disabled", true).text("Uploading pitchdeck...");
    }).prop('disabled', !$.support.fileInput)
      .parent().addClass($.support.fileInput ? undefined : 'disabled');
});