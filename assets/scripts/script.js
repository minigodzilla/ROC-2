//----------------------------------------------------------------------------//
// Register Form                                                              //
//----------------------------------------------------------------------------//

$(function()
{

	$('.dv-form-toggle-option').on('click', function() {

		var $parent = $(this).parent();
		var $input = $parent.find('.dv-form-toggle-input');
		var $value = $(this).attr('data-value');

		$input.attr('value', $value);

	})


	////////////////////////////////////////////////////////////////////////////////

	var $form              = $('#dv-register-form');
	var $inputs            = $form.find ('.form-control, select');
	var $checkboxes        = $form.find ('.form-check-input');
	var $email             = $form.find ('.form-control[name=Email]');
	var $postal            = $form.find ('.form-control[name=PostalCode]');
	var $button            = $form.find ('.dv-btn-submit');
	var errorState         = false;

	////////////////////////////////////////////////////////////////////////////////

	function isEmail(email) {

		var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

		if(!regex.test(email))
		{
			return false;
		}

		else
		{
			return true;
		}
	}

	function isPostal(postal) {

		var regex = /([ABCEGHJKLMNPRSTVXY]\d)([ABCEGHJKLMNPRSTVWXYZ]\d){2}/i;

		if(!regex.test(postal))
		{
			return false;
		}

		else
		{
			return true;
		}
	}

	$inputs.blur (function()
	{
		if (!$(this).val())
		{
			$(this).removeClass ('is-valid').addClass ('is-invalid');
		}

		else
		{
			$(this).removeClass ('is-invalid').addClass ('is-valid');
		}
	});

	$email.blur (function()
	{
		if (!isEmail ($(this).val()))
		{
			$(this).removeClass ('is-valid').addClass ('is-invalid');
		}

		else
		{
			$(this).removeClass ('is-invalid').addClass ('is-valid');
		}

	});

	$postal.blur (function()
	{
		if (!isPostal ($(this).val()))
		{
			$(this).removeClass ('is-valid').addClass ('is-invalid');
		}

		else
		{
			$(this).removeClass ('is-invalid').addClass ('is-valid');
		}

	});

	$form.submit (function(e)
	{
		// prevent default submit behaviour
		e.preventDefault();

		// reset error state
		errorState = false;

		// check for empty fields
		$inputs.each (function()
		{
			if (!$(this).val())
			{
				$(this).removeClass ('is-valid').addClass ('is-invalid');
				errorState = true;
			}

			else
			{
				$(this).removeClass ('is-invalid').addClass ('is-valid');
			}
		});

		// check whether email is valid
		if (!isEmail ($email.val()))
		{
			$email.removeClass ('is-valid').addClass ('is-invalid');
			errorState = true;
		}

		else
		{
			$email.removeClass ('is-invalid').addClass ('is-valid');
		}

		// check whether postal code is valid
		if (!isPostal ($postal.val()))
		{
			$postal.removeClass ('is-valid').addClass ('is-invalid');
			errorState = true;
		}

		else
		{
			$email.removeClass ('is-invalid').addClass ('is-valid');
		}

		// check for checked checkboxes
		$checkboxes.each (function()
		{
			if ($(this).prop("checked") == false)
			{
				$(this).removeClass ('is-valid').addClass ('is-invalid');
				errorState = true;
			}

			else
			{
				$(this).removeClass ('is-invalid').addClass ('is-valid');
			}
		});

		// if form has errors
		if (errorState)
			return false;

		// now we do ajax
		// get form
		var form = $('#dv-register-form')[0];

		// create an FormData object 
		var data = new FormData(form);

		// prevent duplicate submissions
		$form.find('.dv-btn-submit').prop('disabled', true);

		// do a barrel roll

		$.ajax({
			type: "POST",
			enctype: 'multipart/form-data',
			url: "/register.php",
			data: data,
			processData: false,
			contentType: false,
			cache: false,
			timeout: 800000,
			success: function (data) {

				$form.addClass('dv-success');

			},
			error: function (e) {

				console.log("ERROR : ", e);

				$form.addClass('dv-error');

			}
		});

	});

});


//----------------------------------------------------------------------------//
// Footer Mailing List Form                                                   //
//----------------------------------------------------------------------------//

$(function()
{

	////////////////////////////////////////////////////////////////////////////////

	var $form              = $('#dv-footer-form');
	var $email             = $form.find ('.form-control[name=Email]');
	var $checkbox          = $form.find ('.form-check-input[name=consent]');
	var $button            = $form.find ('.dv-btn-submit');
	var errorState         = false;

	////////////////////////////////////////////////////////////////////////////////

	function isEmail(email) {

		var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

		if(!regex.test(email))
		{
			return false;
		}

		else
		{
			return true;
		}
	}

	$form.submit (function(e)
	{
		// prevent default submit behaviour
		e.preventDefault();

		// reset error state
		errorState = false;

		// check whether email is valid
		if (!isEmail ($email.val()))
		{
			$email.removeClass ('is-valid').addClass ('is-invalid');
			errorState = true;
		}

		else
		{
			$email.removeClass ('is-invalid').addClass ('is-valid');
		}

		// check whether consent checkbox is checked
		if ($checkbox.prop('checked')!=true)
		{
			$checkbox.removeClass ('is-valid').addClass ('is-invalid');
			errorState = true;
		}
		else
		{
			$checkbox.removeClass ('is-invalid');
		}

		// if form has errors
		if (errorState)
			return false;

		// now we do ajax
		// get form
		var form = $('#dv-footer-form')[0];

		// create an FormData object 
		var data = new FormData(form);

		// prevent duplicate submissions
		$form.find('.dv-btn-submit').prop('disabled', true);

		// do a barrel roll
		$.ajax({
			type: "POST",
			enctype: 'multipart/form-data',
			url: "/register.php",
			data: data,
			processData: false,
			contentType: false,
			cache: false,
			timeout: 800000,
			success: function (data) {

				$form.addClass('dv-success');

			},
			error: function (e) {

				console.log("ERROR : ", e);

				$form.addClass('dv-error');

			}
		});

	});

});

//----------------------------------------------------------------------------//
// ScrollMagic Animation                                                      //
//----------------------------------------------------------------------------//

$(function()
{

	// Create an instance of the Scroll Magic Controller
	let controller = new ScrollMagic.Controller();

	$('.dv-animated-section').each(function () {

		var $this = $(this);

		new ScrollMagic.Scene
		({
			triggerElement: this, triggerHook: 0.65, reverse: false
		})
		.setClassToggle(this, 'dv-animated')
		.addTo(controller);
	});

});