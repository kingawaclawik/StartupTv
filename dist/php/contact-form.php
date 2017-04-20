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
		$result = $email;

		echo $result;
		die();
	}
	$result = '';
	echo $result;	
