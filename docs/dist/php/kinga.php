<?php
  $errors = array();

	// Check if phone has been entered
	if (!isset($_POST['email'])) {
		$errors['email'] = 'Please enter your email';
	}	
  // Check if phone has been entered
	if (!isset($_POST['name'])) {
		$errors['name'] = 'Please enter your name';
	}

	$errorOutput = '';

	if(!empty($errors)){

		$errorOutput  .= '<ul>';

		foreach ($errors as $key => $value) {
			$errorOutput .= '<li>'.$value.'</li>';
		}

		$errorOutput .= '</ul>';
		$errorOutput .= '</div>';

		echo $errorOutput;
		die();
	}



	$name = $_POST['name'];
	$email = $_POST['email'];
	$desc = $_POST['desc'];
  $pitch = $_POST['pitch'];
	$from = 'info@ad-ventures.pl';
	$to = 'info@ad-ventures.pl, greg@ad-ventures.pl, kinga@ad-ventures.pl, kinga.waclawik@gmail.com, banas.grzegorz@gmail.com';
	$subject = "KRK Road to Success - aplikacja";
	
	$body = "Name: $name \nEmail: $email \nDesc: $desc \nPitch: $pitch";


	//send the email
	$result = '';
	if (mail ($to, $subject, $body)) {
		$result .= '<div class="alert alert-success alert-dismissible" role="alert">';
 		$result .= '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
		$result .= 'Thank You! I will be in touch';
		$result .= '</div>';

		echo $result;
		die();
	}

	$result = '';
	$result .= '<div class="alert alert-danger alert-dismissible" role="alert">';
	$result .= '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
	$result .= 'Something bad happend during sending this message. Please try again later';
	$result .= '</div>';

	echo $result;
	